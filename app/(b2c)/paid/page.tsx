/**
 * /paid — el paywall del B2C Paid, version minima pero REAL (Plan 03-01).
 *
 * Este plan entrega el camino de dinero completo, no una pantalla completa. Aca
 * hay titulo, el precio en la moneda que corresponde por geolocalizacion, y un
 * CTA que nombra el cobro. **La tabla del stack, el aviso de reuso y los
 * toggles de add-on son el plan 03-05.**
 *
 * D-19 — TODO LO ECONOMICO SE DERIVA EN SERVIDOR. El pais se lee de la cabecera
 * `x-geo-country` que pone el middleware; `resolvePrice` decide la moneda. El
 * cliente no envia —ni puede enviar— moneda ni monto: el POST a `/api/checkout`
 * va con cuerpo vacio y el servidor vuelve a derivar el precio ahi.
 *
 * Superficie: papel (`PaperShell`), resuelto en 03-UI-SPEC A2 — familia de
 * `/consent` e `/intencion`, y el runner al que lleva tambien es papel.
 *
 * Las lecturas van con el cliente user-scoped. Nada de service_role en el flujo
 * del Paid renderizado al usuario.
 *
 * Anchors:
 *   - 03-01-PLAN.md Task 3 step 12, must_haves D-19.
 *   - 03-UI-SPEC.md §Copywriting Contract (copy v0.1), §Accessibility (moneda
 *     por nombre, objetivo tactil >=44px).
 */
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PaperShell } from "@/components/PaperShell";
import { formatPaidAmount, resolvePrice } from "@/lib/billing/prices";
import { GEO_COUNTRY_HEADER } from "@/lib/geo/header";
import {
  MC_PAID_AFTER_PURCHASE,
  MC_PAID_CTA_PRIMARY,
  MC_PAID_PRICE_REFERENCE,
  MC_PAID_TITLE,
} from "@/lib/i18n/microcopy/es-CO/paid";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { CheckoutButton } from "./_components/CheckoutButton";

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

  // Los identificadores de Price se leen aca, en el borde del servidor, y se
  // inyectan: `resolvePrice` se mantiene pura.
  const price = resolvePrice(country, {
    usd: process.env.STRIPE_PRICE_ID_USD ?? "",
    cop: process.env.STRIPE_PRICE_ID_COP ?? "",
  });

  const chargedLabel = formatPaidAmount(price.charged);

  return (
    <PaperShell width="wide" tag="Perfil profundo">
      <section className="flex flex-1 flex-col gap-6">
        <h1 className="font-display text-3xl leading-tight text-text-primary sm:text-4xl">
          {MC_PAID_TITLE}
        </h1>

        {/* Bloque de precio: la moneda COBRADA es la primaria; la otra va como
            referencia. El nombre de la moneda esta en el texto visible, no solo
            un simbolo (03-UI-SPEC §Accessibility). */}
        <div className="flex flex-col gap-1">
          <p
            className="font-display text-4xl leading-none text-text-primary"
            data-testid="paid-charged-price"
            data-currency={price.charged.currency}
          >
            {chargedLabel}
          </p>
          <p className="text-sm text-text-secondary">
            {MC_PAID_PRICE_REFERENCE(
              price.reference.currencyName,
              new Intl.NumberFormat("es-CO").format(price.reference.amount),
            )}
          </p>
        </div>

        <p className="max-w-prose text-base text-text-primary">
          {MC_PAID_AFTER_PURCHASE}
        </p>

        {/* El CTA nombra el cobro. El monto viaja solo como ETIQUETA: el POST
            va con cuerpo vacio y el servidor vuelve a derivar el precio. */}
        <CheckoutButton label={MC_PAID_CTA_PRIMARY(chargedLabel)} />
      </section>
    </PaperShell>
  );
}
