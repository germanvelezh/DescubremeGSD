/**
 * /paid — el paywall honesto del B2C Paid (Plan 03-05; expande el minimo de 03-01).
 *
 * D-22 EN UNA FRASE: el paywall va ANTES de empezar. El usuario ve el stack
 * completo, cuantos items le quedan de verdad, el tiempo estimado sin
 * maquillar y —si viene del Free— cuanto ya tiene hecho, TODO antes de pagar.
 *
 * ORDEN DE LECTURA FIJO, QUE ES CONTRATO Y NO SUGERENCIA (03-UI-SPEC §1):
 *   1. Que es.
 *   2. Que vas a responder (la tabla del stack, armada desde el dato).
 *   3. Aviso de reuso — DEBAJO de la tabla, nunca encima: primero el trabajo
 *      completo, despues el descuento de volumen.
 *   4. Total honesto.
 *   5. Add-ons (apagados por defecto).
 *   6. Precio.
 *   7. CTA unico que nombra el cobro.
 *   8. Pie: que pasa despues de pagar + la politica de datos.
 *
 * FALLA RUIDOSA, NUNCA LISTA CORTA. Si el stack no se puede leer completo, esta
 * pantalla **no renderiza la compra**: ni precio, ni CTA, ni tabla. Es el unico
 * punto de la fase donde una degradacion silenciosa llegaria a alguien que paga,
 * y un precio pegado a una aritmetica que omite instrumentos es una promesa de
 * volumen equivocada que el usuario descubre DESPUES de pagar.
 *
 * TODAS LAS LECTURAS CON EL CLIENTE USER-SCOPED. Nada de service_role en el
 * flujo del Paid renderizado al usuario, aunque el analogo de `/perfil-integrado`
 * use el admin: el conteo de reuso se deriva del usuario autenticado y RLS es la
 * mitad de base de datos de esa garantia (T-03-05-03).
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 paso 6, Task 2, Task 3 paso 3.
 *   - 03-UI-SPEC.md §1, §2, §3, §4, §9.
 */
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PaperShell } from "@/components/PaperShell";
import { formatPaidAmount, resolvePrice } from "@/lib/billing/prices";
import { getStripePriceIds } from "@/lib/billing/stripe";
import { GEO_COUNTRY_HEADER } from "@/lib/geo/header";
import {
  MC_PAID_AFTER_PURCHASE,
  MC_PAID_CTA_PRIMARY,
  MC_PAID_PRIVACY_LINK,
  MC_PAID_STACK_HEADING,
  MC_PAID_SUBTITLE,
  MC_PAID_TITLE,
  MC_PAID_UNAVAILABLE_BODY,
  MC_PAID_UNAVAILABLE_TITLE,
} from "@/lib/i18n/microcopy/es-CO/paid";
import {
  composePaidStack,
  loadPaidStack,
  loadPaidUserHistory,
} from "@/lib/paid/stack";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { HonestTimeEstimate } from "./_components/HonestTimeEstimate";
import { PaidStackTable } from "./_components/PaidStackTable";
import { PriceBlock } from "./_components/PriceBlock";
import { CheckoutButton } from "./_components/CheckoutButton";

// El reuso depende del historial del usuario y cambia con cada test que cierra.
// Una version cacheada le mostraria a un usuario el reuso de otro momento.
export const dynamic = "force-dynamic";

export default async function PaidPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signup?next=/paid");

  // El pais llega por el canal de PETICION gracias al arreglo del middleware
  // (D-19). Sin ese arreglo esto era siempre null y todo el mundo veia COP.
  const headerStore = await headers();
  const country = headerStore.get(GEO_COUNTRY_HEADER);

  // El stack y el historial se leen en paralelo: son independientes.
  const [sourceRows, history] = await Promise.all([
    loadPaidStack(supabase),
    loadPaidUserHistory(supabase, user.id),
  ]);

  // Error de consulta (`null`) y stack vacio se tratan IGUAL. No hay ninguna
  // rama que renderice una lista parcial: esa es la razon de ser del estado.
  const stack =
    sourceRows === null
      ? ({ available: false, reason: "empty" } as const)
      : composePaidStack(sourceRows, history);

  if (!stack.available) {
    return (
      <PaperShell width="medium" tag="Perfil profundo">
        <section
          className="flex flex-1 flex-col gap-4"
          data-testid="paid-unavailable"
        >
          <h1 className="font-display text-3xl leading-tight text-text-primary">
            {MC_PAID_UNAVAILABLE_TITLE}
          </h1>
          <p className="max-w-prose text-base text-text-primary">
            {MC_PAID_UNAVAILABLE_BODY}
          </p>
        </section>
      </PaperShell>
    );
  }

  // El precio se resuelve DESPUES del estado no-disponible a proposito: sin
  // stack no hay nada que cobrar, y `getStripePriceIds()` lanza si falta una
  // variable — no tiene sentido reventar por configuracion de cobro en una
  // pantalla que ya decidio que no va a cobrar.
  const price = resolvePrice(country, getStripePriceIds());

  return (
    <PaperShell width="wide" tag="Perfil profundo">
      <div className="flex flex-1 flex-col gap-6 pb-4">
        {/* 1. Que es. */}
        <section className="flex flex-col gap-2">
          <h1 className="font-display text-3xl leading-tight text-text-primary sm:text-4xl">
            {MC_PAID_TITLE}
          </h1>
          <p className="max-w-prose text-base text-text-secondary">
            {MC_PAID_SUBTITLE}
          </p>
        </section>

        {/* 2. Que vas a responder. Armado desde `product_stack`, nunca desde un
            arreglo en el componente (principio 1 + FOUND-05). */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-text-primary">
            {MC_PAID_STACK_HEADING}
          </h2>
          <PaidStackTable rows={stack.rows} />
        </section>

        {/* 3. Aviso de reuso + 4. Total + 5. Add-ons: plan 03-05 Task 2. */}
        <HonestTimeEstimate
          items={stack.remainingItems}
          minutes={stack.remainingMinutes}
        />

        {/* 6. Precio. */}
        <PriceBlock price={price} />

        {/* 8. Pie de compra: que pasa despues de pagar + la politica de datos.
            Va ANTES del CTA en el marcado porque el CTA es pegajoso (ver
            abajo); en pantalla el usuario lee el pie y ve el CTA fijo. */}
        <section className="flex flex-col gap-2">
          <p className="max-w-prose text-base text-text-primary">
            {MC_PAID_AFTER_PURCHASE}
          </p>
          <Link
            href="/consent"
            className="max-w-prose text-sm text-accent underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent"
          >
            {MC_PAID_PRIVACY_LINK}
          </Link>
        </section>
      </div>

      {/* 7. CTA unico, PEGAJOSO.
          Por que pegajoso y no un boton mas del flujo: el criterio de
          aceptacion pide que a 360px el CTA sea alcanzable SIN SCROLL desde la
          carga, y una tabla de stack honesta empuja cualquier boton en flujo
          muy por debajo del pliegue. Un CTA fijo lo resuelve sin tocar el orden
          de lectura y sin scroll-jacking: el usuario baja cuando quiere, y el
          boton sigue ahi.
          **Nombra el cobro**, que es lo que impide que "fijo" se convierta en
          "monto escondido" (prohibicion explicita de 03-UI-SPEC §1). */}
      <div className="sticky bottom-0 -mx-5 mt-2 border-t border-border-default bg-[var(--dm-paper)] px-5 py-3 sm:-mx-8 sm:px-8">
        <CheckoutButton label={MC_PAID_CTA_PRIMARY(formatPaidAmount(price.charged))} />
      </div>
    </PaperShell>
  );
}
