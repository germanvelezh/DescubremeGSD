/**
 * HonestTimeEstimate — el total de volumen y tiempo (Plan 03-05 Task 1).
 *
 * Paso 4 del orden de lectura. Las dos cifras llegan YA CALCULADAS por
 * `lib/paid/estimate.ts` a traves de `composePaidStack`: aca no se multiplica ni
 * se redondea nada. Si esta pantalla hiciera su propia cuenta, moverla en un
 * sitio y no en el otro seria cuestion de tiempo, y el usuario veria un total
 * que no cuadra con las filas que acaba de leer (D-13).
 *
 * ES UNA REGION VIVA (`role="status"`). El total cambia cuando el usuario
 * enciende un add-on, y ese cambio tiene que anunciarse **una vez por cambio**,
 * no una por cifra: por eso el anuncio envuelve la frase completa y no cada
 * numero suelto.
 *
 * `tabular-nums` en el bloque: todo numero que cambia en vivo lleva cifras de
 * ancho fijo para que la linea no salte al recalcular.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 paso 1, Task 2 paso 4.
 *   - 03-UI-SPEC.md §1 paso 4, §Accessibility ("Total en vivo": un solo anuncio).
 */
import {
  MC_PAID_SESSIONS_NOTE,
  MC_PAID_TOTAL,
} from "@/lib/i18n/microcopy/es-CO/paid";

export function HonestTimeEstimate({
  items,
  minutes,
}: {
  items: number;
  minutes: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p
        role="status"
        aria-live="polite"
        data-testid="paid-total"
        data-items={items}
        data-minutes={minutes}
        className="max-w-prose text-base font-semibold tabular-nums text-text-primary"
      >
        {MC_PAID_TOTAL(items, minutes)}
      </p>
      <p className="max-w-prose text-sm text-text-secondary">
        {MC_PAID_SESSIONS_NOTE}
      </p>
    </div>
  );
}
