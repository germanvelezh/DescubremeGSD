"use client";

/**
 * PaidPurchasePanel — los pasos 4 a 7 del orden de lectura (Plan 03-05 Task 2).
 *
 * POR QUE ESTOS CUATRO PASOS VIVEN JUNTOS EN UN COMPONENTE DE CLIENTE. El total
 * (paso 4) tiene que recalcularse cuando el usuario mueve un toggle de add-on
 * (paso 5), y el CTA (paso 7) tiene que transmitir que add-ons eligio. Partirlo
 * en cuatro islas obligaria a duplicar el estado o a levantarlo a un contexto —
 * dos formas de que el total y los toggles se desincronicen.
 *
 * El precio (paso 6) llega **ya derivado en servidor**, y llega como TEXTO: el
 * identificador de Price de Stripe se queda del lado del servidor. El cliente
 * no participa en elegir moneda ni monto, y `/api/checkout` vuelve a derivar el
 * precio de todos modos (T-03-05-05).
 *
 * EL TOTAL SE ANUNCIA UNA VEZ POR CAMBIO, no una por cifra: el `role="status"`
 * envuelve la frase completa dentro de `HonestTimeEstimate`, asi que un cambio
 * de toggle produce exactamente una mutacion de region viva.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 2 pasos 4-5 y 8.
 *   - 03-UI-SPEC.md §1 (pasos 4-7), §Accessibility (Total en vivo).
 */
import { useState } from "react";

import { MC_PAID_ADDONS_HEADING } from "@/lib/i18n/microcopy/es-CO/paid";
import { type PaidStackAvailable, resolvePaidTotals } from "@/lib/paid/stack-model";

import { AddOnToggle } from "./AddOnToggle";
import { CheckoutButton } from "./CheckoutButton";
import { HonestTimeEstimate } from "./HonestTimeEstimate";
import { PriceBlock } from "./PriceBlock";

export function PaidPurchasePanel({
  stack,
  chargedLabel,
  chargedCurrency,
  referenceLabel,
  ctaLabel,
}: {
  stack: PaidStackAvailable;
  chargedLabel: string;
  chargedCurrency: string;
  referenceLabel: string;
  ctaLabel: string;
}) {
  // **Vacio en la carga inicial.** Ningun toggle pre-marcado: es una de las
  // prohibiciones explicitas de la pantalla, no una preferencia por defecto.
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  const totals = resolvePaidTotals(stack, selected);

  function toggle(versionId: string, next: boolean) {
    setSelected((prev) => {
      const draft = new Set(prev);
      if (next) draft.add(versionId);
      else draft.delete(versionId);
      return draft;
    });
  }

  return (
    <>
      {/* 4. Total honesto. */}
      <HonestTimeEstimate items={totals.items} minutes={totals.minutes} />

      {/* 5. Add-ons. Cuando el dato todavia no trae ninguno, la seccion NO
          existe: un encabezado sin nada debajo es un hueco, y inventar filas
          para llenarlo seria prometer instrumentos que no estan sembrados. El
          paywall crece con el dato. */}
      {stack.addOns.length > 0 ? (
        <section className="flex flex-col gap-2" data-testid="paid-addons">
          <h2 className="text-xl font-semibold text-text-primary">
            {MC_PAID_ADDONS_HEADING}
          </h2>
          {stack.addOns.map((addOn) => (
            <AddOnToggle
              key={addOn.versionId}
              addOn={addOn}
              checked={selected.has(addOn.versionId)}
              onChange={(next) => toggle(addOn.versionId, next)}
            />
          ))}
        </section>
      ) : null}

      {/* 6. Precio. */}
      <PriceBlock
        chargedLabel={chargedLabel}
        chargedCurrency={chargedCurrency}
        referenceLabel={referenceLabel}
      />

      {/* 7. CTA unico, PEGAJOSO.
          Por que pegajoso y no un boton mas del flujo: el criterio de
          aceptacion pide que a 360px el CTA sea alcanzable SIN SCROLL desde la
          carga, y una tabla de stack honesta empuja cualquier boton en flujo
          muy por debajo del pliegue. Fijarlo lo resuelve sin tocar el orden de
          lectura y sin scroll-jacking: el usuario baja cuando quiere y el boton
          sigue ahi. **Nombra el cobro**, que es lo que impide que "fijo" se
          convierta en "monto escondido" (prohibicion explicita del UI-SPEC §1).

          Solo viajan los add-ons elegidos: ni monto, ni moneda, ni identidad.
          El servidor los valida contra el dato y vuelve a derivar el precio
          (T-03-05-01). */}
      <div className="sticky bottom-0 -mx-5 border-t border-border-default bg-[var(--dm-paper)] px-5 py-3 sm:-mx-8 sm:px-8">
        <CheckoutButton label={ctaLabel} addOns={[...selected]} />
      </div>
    </>
  );
}
