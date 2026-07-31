/**
 * /paid/cancelado — el usuario salio del Checkout sin pagar (Plan 03-05 Task 3).
 *
 * PANTALLA ESTATICA A PROPOSITO. No carga datos, no consulta la base y no
 * ejecuta ninguna operacion que pueda fallar: es el destino de alguien que
 * acaba de decidir NO comprar, y una pantalla que puede reventar en ese momento
 * seria un castigo por la decision. Por eso el UI-SPEC descarta explicitamente
 * sus estados de carga y de error — no existen.
 *
 * DICE LAS DOS COSAS QUE EL USUARIO NECESITA LEER: que **no se le cobro nada** y
 * que **no perdio nada** de lo que ya respondio (que es verdad: todo se persiste
 * por item desde la Fase 1).
 *
 * NO HAY SEGUNDA PANTALLA DE "¿SEGURO QUE QUIERES IRTE?", ni lenguaje de culpa,
 * ni de perdida, ni de reintento urgente. La ruta de vuelta existe y esta a la
 * vista; usarla o no es del usuario.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 3 paso 2, must_have Cancelado/long-text.
 *   - 03-UI-SPEC.md §Superficies fila 4, §dismissed (E5: loading/error/overflow).
 *   - app/api/checkout/route.ts (`cancel_url` apunta aca desde el plan 03-01).
 */
import Link from "next/link";

import { PaperShell } from "@/components/PaperShell";
import {
  MC_PAID_CANCELLED_BACK,
  MC_PAID_CANCELLED_BODY,
  MC_PAID_CANCELLED_TITLE,
} from "@/lib/i18n/microcopy/es-CO/paid";

export default function PaidCancelledPage() {
  return (
    <PaperShell width="medium" tag="Perfil profundo">
      <section className="flex flex-1 flex-col gap-4" data-testid="paid-cancelled">
        <h1 className="font-display text-3xl leading-tight text-text-primary">
          {MC_PAID_CANCELLED_TITLE}
        </h1>
        <p className="max-w-prose text-base text-text-primary">
          {MC_PAID_CANCELLED_BODY}
        </p>
        <Link
          href="/paid"
          className="inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-md border border-text-secondary px-5 py-3 font-semibold text-text-primary focus-visible:ring-2 focus-visible:ring-accent"
        >
          {MC_PAID_CANCELLED_BACK}
        </Link>
      </section>
    </PaperShell>
  );
}
