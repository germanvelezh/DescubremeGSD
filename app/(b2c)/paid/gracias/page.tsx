/**
 * /paid/gracias — retorno desde el Checkout de Stripe (Plan 03-05; expande 03-01).
 *
 * **RAMIFICA SOBRE `resolveEntitlement`, NUNCA SOBRE EL HECHO DE HABER LLEGADO
 * AQUI.** La URL de exito de Stripe es adivinable: cualquiera puede escribirla
 * en la barra de direcciones. La unica prueba de pago es una fila de
 * `entitlement`, concedida por el webhook con firma verificada (T-03-05-02).
 *
 * Y ESTA PAGINA NUNCA REDIRIGE A `/paid`. El webhook puede tardar unos segundos,
 * asi que hay una ventana real en la que el usuario ya pago y el `entitlement`
 * todavia no existe. Mandarlo al paywall en ese momento le estaria diciendo "no
 * pagaste" justo despues de que pago — el peor error posible de esta pantalla.
 *
 * TRES RAMAS, no dos:
 *   1. **Con acceso:** titulo sereno y el enlace al PRIMER instrumento del
 *      stack, resuelto desde el dato.
 *   2. **Sin acceso, dentro de la ventana:** estado de confirmacion en curso,
 *      reintento automatico, y el boton de empezar **deshabilitado** hasta que
 *      el acceso aparezca. Deshabilitado y no ausente: el usuario ve que hay un
 *      camino y que todavia no esta abierto.
 *   3. **Sin acceso, agotado el reintento:** que hacer y a donde escribir. **No
 *      afirma que el pago fallo** — no lo sabemos.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 3 paso 1, must_haves Gracias/*.
 *   - Threat register T-03-05-02 (Spoofing de la URL de retorno).
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
import { PAID_CORE_LAYER, loadPaidStack } from "@/lib/paid/stack";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { ConfirmationPoller } from "./_components/ConfirmationPoller";

// El acceso se lee en cada visita: es un estado que cambia por un webhook
// externo, asi que una version cacheada mostraria "confirmando" para siempre.
export const dynamic = "force-dynamic";

const CTA_CLASS =
  "inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-md bg-accent px-5 py-3 font-semibold text-secondary focus-visible:ring-2 focus-visible:ring-accent";

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

          {/* El boton existe y esta DESHABILITADO: el usuario ve el camino y ve
              que todavia no esta abierto. Se habilita solo —sin que recargue a
              mano— cuando el reintento encuentra el acceso. */}
          <button
            type="button"
            disabled
            data-testid="paid-start-cta"
            className={`${CTA_CLASS} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {MC_PAID_START_CTA}
          </button>

          {/* Salida manual del automatismo. El reintento corre en el CLIENTE,
              asi que una pestana suspendida o una red intermitente lo dejan sin
              efecto sin avisar; sin este enlace ese usuario se queda mirando
              "confirmando" sin nada que hacer. */}
          <Link
            href="/paid/gracias"
            prefetch={false}
            className="text-sm text-accent underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent"
          >
            {MC_PAID_CONFIRMING_RETRY}
          </Link>

          <ConfirmationPoller />
        </section>
      </PaperShell>
    );
  }

  // Con acceso: al PRIMER instrumento del stack, resuelto desde el dato. Si el
  // stack no se puede leer, el enlace cae al mapa —que ya sabe enrutar— en vez
  // de dejar al usuario sin salida en su propia pantalla de exito.
  const sourceRows = await loadPaidStack(supabase);
  const firstCode = (sourceRows ?? []).find(
    (r) => r.layer === PAID_CORE_LAYER && r.instrumentCode !== "",
  )?.instrumentCode;
  const startHref = firstCode ? `/test/${firstCode.toLowerCase()}` : "/mapa";

  return (
    <PaperShell width="medium" tag="Perfil profundo">
      <section className="flex flex-1 flex-col gap-4" data-testid="paid-granted">
        <h1 className="font-display text-3xl leading-tight text-text-primary">
          {MC_PAID_SUCCESS_TITLE}
        </h1>
        <Link href={startHref} data-testid="paid-start-cta" className={CTA_CLASS}>
          {MC_PAID_START_CTA}
        </Link>
      </section>
    </PaperShell>
  );
}
