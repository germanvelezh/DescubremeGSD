/**
 * ReuseNotice — el reuso como INFORMACION, en tres caminos (Plan 03-05 Task 2).
 *
 * TRES CAMINOS DE RENDER, NO UN `if` DE CONVENIENCIA:
 *
 *   - **Frio (0 reutilizables):** no renderiza NADA. Ni un hueco, ni un bloque
 *     vacio, ni una linea de lo que podria haber ahorrado. Quien no hizo el Free
 *     no tiene por que leer sobre un descuento que no tiene.
 *   - **Parcial (1..n-1):** el numero real reutilizado y el real restante.
 *   - **Completo (n):** el mismo aviso, con el restante que corresponda.
 *
 * NO CALCULA NADA Y NO ASUME 113. Recibe cifras ya derivadas por usuario desde
 * `composePaidStack`. La constante 113 es la aritmetica de quien completo los
 * cuatro tests del Free, y escribirla aqui le mentiria a todo el que no lo hizo.
 *
 * VA DEBAJO DE LA TABLA DEL STACK, nunca encima: primero el usuario ve el
 * trabajo completo, despues el descuento de volumen. Al reves, el descuento
 * encuadraria el trabajo antes de que el usuario supiera cuanto es.
 *
 * `Prohibido en este bloque` (rechazado explicitamente en el discuss): cualquier
 * formulacion de costo hundido. El glosario COMPL-18 vigila las formas conocidas;
 * la regla de fondo es que este aviso informa para decidir, no presiona para
 * cerrar.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 2 paso 1, must_haves Reuso/empty..long-text.
 *   - 03-UI-SPEC.md §2 (los tres estados + reglas de redaccion).
 */
import { MC_PAID_REUSE_PARTIAL } from "@/lib/i18n/microcopy/es-CO/paid";

export function ReuseNotice({
  reusedItems,
  remainingItems,
}: {
  reusedItems: number;
  remainingItems: number;
}) {
  // Estado frio: NADA en el marcado. Un bloque vacio seria un hueco visible y
  // un `aria-hidden` seria un nodo muerto para el lector de pantalla.
  if (reusedItems <= 0) return null;

  return (
    <p
      data-testid="paid-reuse-notice"
      data-reused={reusedItems}
      data-remaining={remainingItems}
      className="max-w-prose rounded-md bg-surface-tertiary p-4 text-sm tabular-nums text-text-primary"
    >
      {MC_PAID_REUSE_PARTIAL(reusedItems, remainingItems)}
    </p>
  );
}
