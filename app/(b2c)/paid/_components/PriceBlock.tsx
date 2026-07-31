/**
 * PriceBlock — el monto, sin ancla y sin grito (Plan 03-05 Task 1).
 *
 * TRES REGLAS QUE NO SON ESTETICA:
 *
 *   1. **La moneda COBRADA es la visualmente primaria**; la otra va en `caption`
 *      con la palabra "equivalente". Sin conversion decorativa: si se cobra en
 *      pesos, el dolar no se presenta como "el precio de verdad" ni al reves.
 *   2. **Nombre de moneda junto al monto, nunca solo el simbolo.** Un lector de
 *      pantalla no puede distinguir dos simbolos parecidos; el nombre si.
 *      `formatPaidAmount` lo produce, y se usa en el texto visible Y en el
 *      accesible para que no puedan divergir.
 *   3. **Sin tachado, sin "antes/ahora", sin porcentaje.** El Paid tiene UN
 *      precio: cualquier ancla seria una referencia inventada (ADR-030 D6).
 *
 * El equivalente va en el MISMO grupo, asociado con `aria-describedby`: como
 * texto suelto quedaria huerfano al navegar por saltos.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 paso 5.
 *   - 03-UI-SPEC.md §3 (Precio y moneda), §Accessibility (moneda por nombre).
 *   - lib/billing/prices.ts (de donde salen los dos montos, derivados en servidor).
 */
import { formatPaidAmount, type ResolvedPrice } from "@/lib/billing/prices";
import { MC_PAID_PRICE_REFERENCE } from "@/lib/i18n/microcopy/es-CO/paid";

export function PriceBlock({ price }: { price: ResolvedPrice }) {
  const chargedLabel = formatPaidAmount(price.charged);
  const referenceLabel = MC_PAID_PRICE_REFERENCE(
    price.reference.currencyName,
    new Intl.NumberFormat("es-CO").format(price.reference.amount),
  );

  return (
    <div
      role="group"
      aria-labelledby="paid-price-charged"
      aria-describedby="paid-price-reference"
      className="flex flex-col gap-1"
    >
      {/* Display, peso 400, cifras tabulares. El monto es informacion: no sube
          de tamano para impresionar y no se colorea con `accent`. */}
      <p
        id="paid-price-charged"
        className="font-display text-4xl leading-none tabular-nums text-text-primary"
        data-testid="paid-charged-price"
        data-currency={price.charged.currency}
      >
        {chargedLabel}
      </p>
      <p
        id="paid-price-reference"
        className="text-sm tabular-nums text-text-secondary"
        data-testid="paid-reference-price"
      >
        {referenceLabel}
      </p>
    </div>
  );
}
