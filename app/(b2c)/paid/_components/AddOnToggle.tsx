"use client";

/**
 * AddOnToggle — un add-on opcional, APAGADO por defecto (Plan 03-05 Task 2).
 *
 * ENVUELVE EL PRIMITIVO DE CASILLA EXISTENTE, no lo reimplementa: `Checkbox` ya
 * resuelve el area tactil de 44px, la etiqueta asociada y el anillo de foco, y
 * un segundo control con las mismas responsabilidades seria una segunda cosa
 * que mantener sincronizada con WCAG.
 *
 * TRES ESTADOS, y el tercero es el que importa:
 *   - apagado (**el default; nunca pre-marcado** — pre-marcar un add-on es un
 *     patron de presion explicitamente prohibido);
 *   - encendido;
 *   - **no disponible**: deshabilitado, con su nota honesta asociada por
 *     `aria-describedby` y **fuera de la aritmetica**. Que este fuera no depende
 *     de esta pantalla: `resolvePaidTotals` ignora los no seleccionables, asi
 *     que ni un id colado a mano lo mete en el total.
 *
 * El estado no viaja solo por color: el costo en items y minutos es texto, y el
 * no-disponible lleva su nota escrita.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 2 pasos 4 y 6.
 *   - 03-UI-SPEC.md §4 (tabla de add-ons), §Accessibility (toggles de add-on).
 *   - components/ui/Checkbox.tsx (el primitivo).
 */
import { Checkbox } from "@/components/ui/Checkbox";
import {
  MC_PAID_ADDON_COST,
  MC_PAID_ADDON_UNAVAILABLE,
} from "@/lib/i18n/microcopy/es-CO/paid";
import type { PaidAddOnRow } from "@/lib/paid/stack-model";

export function AddOnToggle({
  addOn,
  checked,
  onChange,
}: {
  addOn: PaidAddOnRow;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  const id = `paid-addon-${addOn.versionId}`;

  // Declarado pero sin material para responderlo. Se muestra —no se esconde—
  // porque esconderlo convertiria una ausencia conocida en una sorpresa futura.
  if (!addOn.selectable) {
    return (
      <div
        data-testid="paid-addon"
        data-selectable="false"
        className="flex items-start gap-2 rounded-md border border-border-default bg-secondary p-4 py-2 opacity-70"
      >
        <input
          id={id}
          type="checkbox"
          checked={false}
          disabled
          readOnly
          aria-describedby={`${id}-note`}
          className="mt-1 h-5 w-5 rounded border border-border-default bg-secondary"
          style={{ minWidth: 20, minHeight: 20 }}
        />
        <div className="flex flex-1 flex-col">
          <label htmlFor={id} className="text-sm text-text-primary leading-snug">
            {addOn.label}
          </label>
          <p id={`${id}-note`} className="mt-1 max-w-prose text-xs text-text-secondary">
            {MC_PAID_ADDON_UNAVAILABLE}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="paid-addon"
      data-selectable="true"
      data-addon-items={addOn.itemCount ?? 0}
      className={`rounded-md border bg-secondary px-4 ${
        checked ? "border-accent" : "border-border-default"
      }`}
    >
      <Checkbox
        id={id}
        name={id}
        label={addOn.label}
        helperText={MC_PAID_ADDON_COST(addOn.itemCount ?? 0, addOn.minutes ?? 0)}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}
