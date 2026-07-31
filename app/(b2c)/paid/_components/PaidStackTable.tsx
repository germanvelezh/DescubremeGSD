/**
 * PaidStackTable — las filas del stack del Paid (Plan 03-05 Task 1).
 *
 * Recibe filas YA COMPUESTAS por `lib/paid/stack.ts`. No consulta nada, no
 * conoce ningun codigo de instrumento y no decide que se muestra: solo lo pinta.
 * Toda la aritmetica (items, minutos, reuso) llega resuelta desde una sola
 * fuente, que es lo que impide que la tabla y el total se contradigan.
 *
 * `Sin directiva "use client" propia, y es deliberado:` es un componente
 * presentacional puro. La pagina lo renderiza en servidor, y el panel de compra
 * —que si es cliente, porque los toggles de add-on recalculan en vivo— lo puede
 * usar tal cual. Ponerle "use client" lo ataria al cliente sin necesidad;
 * ponerle "server-only" lo haria inutilizable desde el panel.
 *
 * MARCA DE "YA RESPONDIDO" = PUNTO DE ACENTO **MAS TEXTO**, nunca solo el punto.
 * La informacion de que una fila ya esta cubierta no puede viajar solo por color
 * (WCAG 1.4.1) — y ademas el punto solo seria indescifrable sin contexto.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 paso 4, Task 2 pasos 2-3.
 *   - 03-UI-SPEC.md §Component Inventory (PaidStackTable), §Color (accent
 *     reservado #6: marca de "ya respondido", un punto de 6px, no un fondo).
 */
import type { PaidStackRow } from "@/lib/paid/stack-model";
import {
  MC_PAID_REUSE_VALUES_NOTE,
  MC_PAID_STACK_ROW_ARIA,
  MC_PAID_STACK_ROW_PARTIAL,
  MC_PAID_STACK_ROW_REUSED,
} from "@/lib/i18n/microcopy/es-CO/paid";

export function PaidStackTable({ rows }: { rows: readonly PaidStackRow[] }) {
  return (
    <ul className="flex flex-col gap-2" data-testid="paid-stack-table">
      {rows.map((row) => (
        <li
          key={row.versionId}
          data-testid="paid-stack-row"
          data-items={row.itemCount}
          data-reused={row.reusedCount}
          className="flex flex-col gap-1 rounded-md border border-border-default bg-secondary p-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span
              className="text-base font-semibold text-text-primary"
              aria-label={MC_PAID_STACK_ROW_ARIA(
                row.label,
                row.itemCount,
                row.minutes,
              )}
            >
              {row.label}
            </span>
            {/* Cifras tabulares: las columnas de numeros no bailan al comparar
                filas. `aria-hidden` porque el nombre accesible de arriba ya las
                dice en prosa — leerlas dos veces es ruido, no accesibilidad. */}
            <span
              aria-hidden="true"
              className="text-sm tabular-nums text-text-secondary"
            >
              {row.itemCount} · {row.minutes} min
            </span>
          </div>

          {/* Estado de cobertura. Punto de acento + TEXTO, nunca solo el punto. */}
          {row.fullyReused ? (
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {MC_PAID_STACK_ROW_REUSED}
            </span>
          ) : row.reusedCount > 0 ? (
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {MC_PAID_STACK_ROW_PARTIAL(row.reusedCount, row.itemCount)}
            </span>
          ) : null}

          {/* D-11. Esta fila no tiene reuso posible y el usuario tiene
              historial: sin la nota podria inferir un ahorro inexistente y
              descubrir el volumen real DESPUES de pagar. */}
          {row.noReuseNote ? (
            <p
              data-testid="paid-stack-row-no-reuse"
              className="max-w-prose text-sm text-text-secondary"
            >
              {MC_PAID_REUSE_VALUES_NOTE}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
