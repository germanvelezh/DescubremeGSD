/**
 * POST /api/stripe/webhook — concesion del acceso pagado (Plan 03-01, Fase 3).
 *
 * **ESTE HANDLER ES LA UNICA PRUEBA DE PAGO DEL SISTEMA.** Ni la URL de retorno
 * de Stripe ni nada que venga del navegador conceden acceso: solo un evento con
 * firma HMAC verificada escribe en `entitlement`.
 *
 * `runtime = "nodejs"` es obligatorio, no una preferencia: la verificacion de
 * firma necesita `crypto`/`Buffer` de Node. En Edge no funciona.
 *
 * EL CUERPO SE LEE CRUDO CON `req.text()`, nunca con `req.json()`. Los 7
 * handlers previos del repo usan `req.json()`, asi que esto es una excepcion
 * deliberada y vale la pena decir por que: la firma se calcula sobre los BYTES
 * exactos que Stripe envio. `req.json()` los parsea y descarta, y re-serializar
 * produce bytes distintos (orden de claves, espacios) — la firma dejaria de
 * validar, o peor, se validaria contra algo que no es lo que llego.
 *
 * IDEMPOTENCIA EN DOS CAPAS (D-20). Las dos hacen falta:
 *   Capa 1 — `stripe_event_processed`: el MISMO `event.id`. Stripe reintenta
 *            hasta recibir un 2xx, asi que el mismo evento llega varias veces
 *            por diseno.
 *   Capa 2 — los indices UNIQUE parciales de `entitlement` (migracion 020):
 *            eventos DISTINTOS que apuntan al mismo pago. La capa 1 no los ve.
 *
 * POR QUE INSERT + CAPTURA DE 23505 Y NO `upsert(ignoreDuplicates)`: los
 * indices de la capa 2 son PARCIALES (`WHERE ... IS NOT NULL`). Postgres solo
 * infiere un indice parcial como target de `ON CONFLICT` si se le da tambien el
 * predicado, y PostgREST no puede expresarlo (su `on_conflict` acepta columnas,
 * no predicados). Un `ON CONFLICT (payment_intent_id)` fallaria con "no unique
 * or exclusion constraint matching". El INSERT plano choca contra el indice y
 * devuelve 23505, que es exactamente la senal que hace falta.
 *
 * LOG: SOLO `event.id` y `event.type`. El cuerpo completo del evento lleva
 * email y datos de pago (T-03-01-05, anti-goal explicito del ROADMAP).
 *
 * `service_role`: este es el UNICO lugar del flujo del Paid donde aparece, y es
 * legitimo porque un webhook no tiene sesion de usuario — no hay `auth.uid()`
 * contra el cual pudiera scopear RLS. `entitlement` no tiene politica de
 * escritura (deny por defecto), asi que solo este camino concede.
 *
 * Anchors:
 *   - 03-01-PLAN.md Task 3 step 11 + must_haves D-20.
 *   - supabase/migrations/020_entitlement_idempotency.sql (los indices target).
 *   - Threat register T-03-01-01, T-03-01-05, T-03-01-06.
 */
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripeClient, getStripeWebhookSecret } from "@/lib/billing/stripe";
import { PAID_PRODUCT_CODE } from "@/lib/entitlement/resolve";
import { logger } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

/** El unico tipo de evento que concede acceso. */
const GRANTING_EVENT = "checkout.session.completed";

/** `payment_status` que representa un cobro efectivamente realizado. */
const PAID_STATUS = "paid";

/** SQLSTATE de violacion de restriccion unica. */
const UNIQUE_VIOLATION = "23505";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  // 1. Cuerpo CRUDO. Antes de cualquier parseo: la firma cubre estos bytes.
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  // 2. Verificacion de firma. TODO lo que sigue depende de que esto pase.
  //    Firma ausente o invalida -> 400 y CERO escrituras. 400 y no 500: un 5xx
  //    le diria a Stripe "error mio, reintenta" y generaria reintentos
  //    indefinidos de una peticion que nunca va a ser valida.
  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("missing stripe-signature header");
    event = getStripeClient().webhooks.constructEvent(
      rawBody,
      signature,
      getStripeWebhookSecret(),
    );
  } catch {
    // Sin detalle en el log ni en la respuesta: quien manda una firma invalida
    // no necesita ayuda para acertar a la siguiente.
    logger.warn({}, "stripe_webhook_signature_rejected");
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  // A partir de aca el evento es autentico. Solo id y type al log.
  logger.info(
    { stripe_event_id: event.id, stripe_event_type: event.type },
    "stripe_webhook_received",
  );

  // 3. Solo un tipo concede. Cualquier otro se acusa con 200 y sin efecto: 200
  //    le dice a Stripe "recibido, no reintentes", que es lo correcto — el
  //    evento llego bien, simplemente no nos interesa.
  if (event.type !== GRANTING_EVENT) {
    return NextResponse.json({ received: true, handled: false });
  }

  const supabase = getSupabaseAdminClient();

  // 4. CAPA 1 — ¿ya procesamos este event.id?
  const { error: dedupError } = await supabase
    .from("stripe_event_processed")
    .insert({ event_id: event.id, event_type: event.type });

  if (dedupError) {
    if (dedupError.code === UNIQUE_VIOLATION) {
      // Reintento de Stripe. Ya concedimos (o ya decidimos no conceder).
      logger.info(
        { stripe_event_id: event.id, stripe_event_type: event.type },
        "stripe_webhook_duplicate_event",
      );
      return NextResponse.json({ received: true, duplicate: true });
    }
    // Fallo real de base: 500 SI corresponde. Aca si queremos el reintento de
    // Stripe, porque el evento es valido y no lo pudimos registrar.
    logger.error(
      { stripe_event_id: event.id, stripe_event_type: event.type },
      "stripe_webhook_dedup_write_failed",
    );
    return NextResponse.json({ error: "dedup_write_failed" }, { status: 500 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // 5. Sin cobro no hay acceso. `checkout.session.completed` NO implica pago:
  //    una sesion puede completarse con payment_status 'unpaid' (metodos
  //    asincronos) o 'no_payment_required'.
  if (session.payment_status !== PAID_STATUS) {
    logger.info(
      { stripe_event_id: event.id, stripe_event_type: event.type },
      "stripe_webhook_not_paid",
    );
    return NextResponse.json({ received: true, granted: false });
  }

  // 6. La identidad sale de `client_reference_id`, que pusimos NOSOTROS al
  //    crear la sesion desde `auth.getUser()`. Se valida la forma igual: viene
  //    de vuelta por la red.
  const userId = session.client_reference_id;
  if (!userId || !UUID_RE.test(userId)) {
    logger.error(
      { stripe_event_id: event.id, stripe_event_type: event.type },
      "stripe_webhook_missing_client_reference",
    );
    return NextResponse.json({ received: true, granted: false });
  }

  // 7. CAPA 2 — concesion. El choque contra los indices parciales de la
  //    migracion 020 se captura como 23505 y se trata como "ya concedido".
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  const { error: grantError } = await supabase.from("entitlement").insert({
    user_id: userId,
    product_code: PAID_PRODUCT_CODE,
    status: "active",
    payment_intent_id: paymentIntentId,
    checkout_session_id: session.id,
  });

  if (grantError) {
    if (grantError.code === UNIQUE_VIOLATION) {
      // Otro evento ya concedio este mismo pago. Es exito, no error.
      logger.info(
        { stripe_event_id: event.id, stripe_event_type: event.type },
        "stripe_webhook_entitlement_already_granted",
      );
      return NextResponse.json({ received: true, duplicate: true });
    }
    logger.error(
      { stripe_event_id: event.id, stripe_event_type: event.type },
      "stripe_webhook_entitlement_write_failed",
    );
    return NextResponse.json({ error: "grant_failed" }, { status: 500 });
  }

  logger.info(
    { stripe_event_id: event.id, stripe_event_type: event.type },
    "stripe_webhook_entitlement_granted",
  );
  return NextResponse.json({ received: true, granted: true });
}
