/**
 * EntitlementGateNotice — la linea neutra de quien llego por la compuerta
 * (Plan 03-05 Task 3).
 *
 * QUE NO ES, Y ES LO IMPORTANTE. No es un mensaje de error, no es un aviso de
 * bloqueo y **no usa el estilo destructivo** que la aplicacion reserva para
 * errores. Un usuario que pidio un instrumento que todavia no tiene no hizo
 * nada malo: pidio algo que no compro. "Acceso denegado" le atribuiria una
 * falta, y el color destructivo se la subrayaria.
 *
 * Superficie calma (`surface-tertiary` + texto normal), una sola linea, y pasa
 * a lo util: el paywall completo esta justo debajo.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 3 paso 3, must_haves Guard/error y Guard/long-text.
 *   - 03-UI-SPEC.md §9 (Guard sin entitlement), §Color (destructive: solo errores).
 */
import { MC_PAID_GATE_NOTICE } from "@/lib/i18n/microcopy/es-CO/paid";

export function EntitlementGateNotice() {
  return (
    <p
      data-testid="paid-gate-notice"
      className="max-w-prose rounded-md bg-surface-tertiary p-4 text-sm text-text-primary"
    >
      {MC_PAID_GATE_NOTICE}
    </p>
  );
}
