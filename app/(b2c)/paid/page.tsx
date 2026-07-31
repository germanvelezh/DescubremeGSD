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
  MC_PAID_PRICE_REFERENCE,
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

import { PaidPurchasePanel } from "./_components/PaidPurchasePanel";
import { PaidStackTable } from "./_components/PaidStackTable";
import { ReuseNotice } from "./_components/ReuseNotice";

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

  // El precio se formatea EN SERVIDOR y viaja al panel como texto. El
  // identificador de Price de Stripe se queda aca: el cliente no participa en
  // elegir moneda ni monto (T-03-05-05).
  const chargedLabel = formatPaidAmount(price.charged);
  const referenceLabel = MC_PAID_PRICE_REFERENCE(
    price.reference.currencyName,
    new Intl.NumberFormat("es-CO").format(price.reference.amount),
  );

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

        {/* 3. Aviso de reuso. DEBAJO de la tabla, nunca encima: primero el
            usuario ve el trabajo completo, despues el descuento de volumen.
            En estado frio este componente no renderiza nada. */}
        <ReuseNotice
          reusedItems={stack.reusedItems}
          remainingItems={stack.remainingItems}
        />

        {/* 4. Total + 5. Add-ons + 6. Precio + 7. CTA. Van juntos en un
            componente de cliente porque el total se recalcula al mover un
            toggle y el CTA transmite que add-ons se eligieron. */}
        <PaidPurchasePanel
          stack={stack}
          chargedLabel={chargedLabel}
          chargedCurrency={price.charged.currency}
          referenceLabel={referenceLabel}
          ctaLabel={MC_PAID_CTA_PRIMARY(chargedLabel)}
        />

        {/* 8. Pie de compra: que pasa despues de pagar + la politica de datos. */}
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
    </PaperShell>
  );
}
