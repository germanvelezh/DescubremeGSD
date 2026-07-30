/**
 * /paid/gracias — retorno desde el Checkout de Stripe (Plan 03-01, Fase 3).
 *
 * **RAMIFICA SOBRE `resolveEntitlement`, NUNCA SOBRE EL HECHO DE HABER LLEGADO
 * AQUI.** La URL de exito de Stripe es adivinable: cualquiera puede escribirla
 * en la barra de direcciones. La unica prueba de pago es una fila de
 * `entitlement`, concedida por el webhook con firma verificada (T-03-01-04).
 *
 * Y ESTA PAGINA NUNCA REDIRIGE A `/paid`. El webhook puede tardar unos segundos
 * en llegar, asi que hay una ventana real en la que el usuario ya pago y el
 * `entitlement` todavia no existe. Mandarlo al paywall en ese momento le estaria
 * diciendo "no pagaste" justo despues de que pago — el peor error posible en
 * esta pantalla. Sin `entitlement` se muestra el estado de confirmacion en
 * curso, con una accion explicita para volver a mirar.
 *
 * El reintento automatico y la rama de "esta tardando demasiado" son el plan
 * 03-05.
 *
 * Anchors:
 *   - 03-01-PLAN.md Task 3 step 13, must_haves (/paid/gracias nunca rebota).
 *   - Threat register T-03-01-04 (Spoofing de la URL de retorno).
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { PaperShell } from "@/components/PaperShell";
import { resolveEntitlement } from "@/lib/entitlement/resolve";
import {
  MC_PAID_CONFIRMING_BODY,
  MC_PAID_CONFIRMING_RETRY,
  MC_PAID_CONFIRMING_TITLE,
  MC_PAID_START_CTA,
  MC_PAID_SUCCESS_TITLE,
} from "@/lib/i18n/microcopy/es-CO/paid";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// El acceso se lee en cada visita: es un estado que cambia por un webhook
// externo, asi que una version cacheada mostraria "confirmando" para siempre.
export const dynamic = "force-dynamic";

export default async function PaidThanksPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Sin sesion no hay a quien confirmarle nada. Va a /signup, NO a /paid.
  if (!user) redirect("/signup?next=/paid/gracias");

  // Cliente user-scoped: la lectura pasa por `own_entitlement_select`.
  const entitlement = await resolveEntitlement(supabase, user.id);

  if (!entitlement.active) {
    // Estado de confirmacion en curso. NO es un error y NO es un rebote.
    return (
      <PaperShell width="medium" tag="Perfil profundo">
        <section
          className="flex flex-1 flex-col gap-4"
          data-testid="paid-confirming"
        >
          <h1 className="font-display text-3xl leading-tight text-text-primary">
            {MC_PAID_CONFIRMING_TITLE}
          </h1>
          <p className="max-w-prose text-base text-text-primary">
            {MC_PAID_CONFIRMING_BODY}
          </p>
          {/* Recarga explicita: el usuario decide cuando volver a mirar. */}
          <Link
            href="/paid/gracias"
            prefetch={false}
            className="inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-md border border-text-secondary px-5 py-3 font-semibold text-text-primary focus-visible:ring-2 focus-visible:ring-accent"
          >
            {MC_PAID_CONFIRMING_RETRY}
          </Link>
        </section>
      </PaperShell>
    );
  }

  return (
    <PaperShell width="medium" tag="Perfil profundo">
      <section className="flex flex-1 flex-col gap-4" data-testid="paid-granted">
        <h1 className="font-display text-3xl leading-tight text-text-primary">
          {MC_PAID_SUCCESS_TITLE}
        </h1>
        {/* El enlace al primer instrumento del stack Paid lo resuelve el plan
            03-05 con `loadPaidStack`; aca lleva al mapa, que ya sabe enrutar. */}
        <Link
          href="/mapa"
          className="inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-md bg-accent px-5 py-3 font-semibold text-secondary focus-visible:ring-2 focus-visible:ring-accent"
        >
          {MC_PAID_START_CTA}
        </Link>
      </section>
    </PaperShell>
  );
}
