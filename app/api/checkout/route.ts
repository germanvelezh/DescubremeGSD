/**
 * POST /api/checkout — crea la Checkout Session de Stripe (Plan 03-01, Fase 3).
 *
 * FRONTERA DE CONFIANZA: el navegador. Todo lo economico se deriva EN SERVIDOR
 * (anti-goal explicito del ROADMAP). El cuerpo se valida con un esquema zod
 * `.strict()` que NO admite monto, moneda ni identificador de usuario — y
 * `.strict()` importa: sin el, zod ignora en silencio las claves de mas, asi
 * que un `{"amount": 1}` colado pasaria desapercibido en vez de ser rechazado
 * (T-03-01-02).
 *
 * De donde sale cada cosa:
 *   - identidad -> `auth.getUser()` (JWT validado contra el servidor de auth),
 *                  NUNCA del cuerpo ni de la cookie cruda.
 *   - pais      -> cabecera `x-geo-country` que pone el middleware.
 *   - precio    -> `resolvePrice(pais, priceIds)`, puro y de servidor.
 *
 * MODO DE PAGO UNICO, sin recurrencia: el anti-goal AF-10 del ROADMAP prohibe
 * la suscripcion.
 *
 * `client_reference_id` lleva el id del usuario, y es lo que el webhook usa
 * para saber a quien conceder. Va aca porque es el unico momento del flujo en
 * que tenemos sesion autenticada: el webhook no la tiene.
 *
 * NINGUN literal de codigo de instrumento en este archivo: `app/api` esta
 * dentro de los SCAN_DIRS de FOUND-05.
 *
 * Anchors:
 *   - 03-01-PLAN.md Task 3 step 10, prohibiciones.
 *   - app/api/score/route.ts (forma del envoltorio: runtime, zod strict, 400 vs 500).
 *   - Threat register T-03-01-02 (Tampering, high).
 */
import { NextResponse } from "next/server";
import { z } from "zod";

import { getStripeClient, getStripePriceIds } from "@/lib/billing/stripe";
import { resolvePrice } from "@/lib/billing/prices";
import { PAID_PRODUCT_CODE } from "@/lib/entitlement/resolve";
import { GEO_COUNTRY_HEADER } from "@/lib/geo/header";
import { logger } from "@/lib/logger";
import { composePaidStack, loadPaidStack } from "@/lib/paid/stack";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Cuerpo permitido. Desde el plan 03-05 acepta **solo** la lista de add-ons
 * elegidos. `.strict()` rechaza cualquier clave extra — que es justamente la
 * defensa contra un cliente que intente imponer monto, moneda o identidad.
 *
 * El esquema valida la FORMA; la EXISTENCIA de cada codigo se valida contra
 * `product_stack` mas abajo. Un uuid bien formado que no corresponda a ningun
 * add-on sembrado no es un cuerpo mal formado: es una peticion por algo que no
 * existe, y se responde 400 igual (T-03-05-01).
 */
const CheckoutBodySchema = z
  .object({
    addOns: z.array(z.string().min(1).max(64)).max(16).optional(),
  })
  .strict();

export async function POST(req: Request) {
  // 1. Cuerpo. Un cuerpo ausente o vacio es valido en este plan; uno con
  //    claves de mas NO lo es.
  let raw: unknown = {};
  const bodyText = await req.text();
  if (bodyText.trim().length > 0) {
    try {
      raw = JSON.parse(bodyText);
    } catch {
      return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }
  }
  const parsed = CheckoutBodySchema.safeParse(raw);
  if (!parsed.success) {
    // 400, nunca throw: un cuerpo mal formado es culpa del cliente, no un 500.
    return NextResponse.json(
      { error: "invalid_body", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // 2. Identidad — del JWT validado, no del cuerpo.
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 3. Add-ons: validados CONTRA EL DATO, no contra una lista en codigo.
  //
  //    Solo se aceptan identificadores que existan hoy como fila de add-on del
  //    stack Paid Y tengan conteo de items sembrado. Un add-on declarado pero
  //    sin material para responderlo no es seleccionable en la pantalla, asi
  //    que tampoco puede colarse por aca: la interfaz y el servidor comparten
  //    el mismo predicado (`selectable`), no dos reglas parecidas.
  //
  //    `Nota de estado:` mientras el plan de seed de los add-ons no corra, la
  //    lista de add-ons validos esta VACIA, asi que cualquier codigo enviado
  //    responde 400. Es correcto y no es un caso degenerado: no hay add-on que
  //    comprar todavia.
  const requestedAddOns = parsed.data.addOns ?? [];
  let selectedAddOns: string[] = [];
  if (requestedAddOns.length > 0) {
    const stackRows = await loadPaidStack(supabase);
    if (stackRows === null) {
      // El stack no se pudo leer: no se crea un cobro cuyo alcance no podemos
      // afirmar. Mismo criterio que el paywall — falla ruidosa, nunca a medias.
      return NextResponse.json({ error: "stack_unavailable" }, { status: 503 });
    }
    const stack = composePaidStack(stackRows, {
      completedVersionIds: new Set<string>(),
      answeredItemCodes: new Set<string>(),
    });
    const valid = new Set(
      stack.available
        ? stack.addOns.filter((a) => a.selectable).map((a) => a.versionId)
        : [],
    );
    const unknown = requestedAddOns.filter((id) => !valid.has(id));
    if (unknown.length > 0) {
      return NextResponse.json({ error: "unknown_add_on" }, { status: 400 });
    }
    selectedAddOns = [...new Set(requestedAddOns)];
  }

  // 4. Precio derivado en servidor a partir de la geolocalizacion (D-19).
  //
  //    LOS ADD-ONS NO MUEVEN EL PRECIO. El Paid es un pago unico y los add-ons
  //    van incluidos: cambian el VOLUMEN que el usuario va a responder, no lo
  //    que se le cobra. Por eso `resolvePrice` no los recibe — si algun dia lo
  //    hiciera, el cliente pasaria a influir en el monto, que es exactamente lo
  //    que el anti-goal prohibe.
  const country = req.headers.get(GEO_COUNTRY_HEADER);
  const price = resolvePrice(country, getStripePriceIds());

  // 5. Checkout hospedado: ningun dato de tarjeta toca nuestro DOM.
  const origin = new URL(req.url).origin;
  try {
    const session = await getStripeClient().checkout.sessions.create({
      mode: "payment", // pago unico. NUNCA 'subscription' (AF-10).
      line_items: [{ price: price.charged.stripePriceId, quantity: 1 }],
      client_reference_id: user.id,
      success_url: `${origin}/paid/gracias`,
      cancel_url: `${origin}/paid/cancelado`,
      // Los add-ons quedan registrados en la sesion de Checkout para que la
      // eleccion del usuario no se pierda entre el clic y el webhook. Van como
      // lista de identificadores, sin ningun dato personal.
      metadata: {
        product_code: PAID_PRODUCT_CODE,
        add_ons: selectedAddOns.join(","),
      },
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a URL");
    }

    logger.info(
      { stripe_checkout_session_id: session.id },
      "checkout_session_created",
    );
    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Sin detalle de Stripe hacia el cliente: puede llevar informacion de
    // configuracion de la cuenta.
    logger.error(
      { err: err instanceof Error ? err.message : String(err) },
      "checkout_session_failed",
    );
    return NextResponse.json({ error: "checkout_unavailable" }, { status: 502 });
  }
}
