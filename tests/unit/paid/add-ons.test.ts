/**
 * El recalculo en vivo al mover un toggle de add-on (Plan 03-05 Task 2).
 *
 * `resolvePaidTotals` es la MISMA fuente que ya produjo el total base. Existe
 * porque el total del paywall cambia en el cliente —el usuario enciende un
 * add-on y las dos cifras se mueven— y ese recalculo NO puede ser una segunda
 * aritmetica escrita en el componente: dos cuentas se desincronizan en cuanto
 * alguien afina la constante de minutos en un solo sitio.
 *
 * Lo que estos tests fijan:
 *   - encender suma EXACTAMENTE el conteo del add-on, ni uno mas;
 *   - apagar devuelve al valor previo (es reversible de verdad, no aproximado);
 *   - un add-on NO disponible no mueve nada aunque su id llegue en la seleccion;
 *   - un id desconocido tampoco: el cliente no puede inflar el total inventando
 *     identificadores.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 2 <behavior> (segundo bloque), pasos 4-6.
 *   - 03-UI-SPEC.md §4 (Add-ons), §Accessibility (Total en vivo).
 */
import { describe, expect, test } from "vitest";

import { estimateMinutes } from "@/lib/paid/estimate";
import {
  PAID_CORE_LAYER,
  type PaidStackAvailable,
  type PaidStackSourceRow,
  composePaidStack,
  resolvePaidTotals,
} from "@/lib/paid/stack";

const ADDON_LAYER = "addon";

const COLD = {
  completedVersionIds: new Set<string>(),
  answeredItemCodes: new Set<string>(),
};

function row(
  versionId: string,
  itemCount: number | null,
  layer: string,
): PaidStackSourceRow {
  return {
    versionId,
    instrumentCode: versionId.toUpperCase(),
    itemCount,
    layer,
    itemCodes: [],
  };
}

/** Un stack con una fila core y dos add-ons: uno disponible, uno sin dato. */
function buildStack(): PaidStackAvailable {
  const result = composePaidStack(
    [
      row("core-1", 60, PAID_CORE_LAYER),
      row("addon-ok", 24, ADDON_LAYER),
      row("addon-sin-pack", null, ADDON_LAYER),
    ],
    COLD,
  );
  if (!result.available) throw new Error("expected an available stack");
  return result;
}

describe("resolvePaidTotals — el total en vivo", () => {
  test("sin ninguna seleccion, el total es el del stack core", () => {
    const stack = buildStack();
    const totals = resolvePaidTotals(stack, []);
    expect(totals.items).toBe(stack.remainingItems);
    expect(totals.minutes).toBe(stack.remainingMinutes);
  });

  test("encender un add-on suma EXACTAMENTE su conteo de items", () => {
    const stack = buildStack();
    const base = resolvePaidTotals(stack, []);
    const withAddOn = resolvePaidTotals(stack, ["addon-ok"]);
    expect(withAddOn.items - base.items).toBe(24);
  });

  test("los minutos del add-on salen de la MISMA funcion de estimacion", () => {
    const stack = buildStack();
    const base = resolvePaidTotals(stack, []);
    const withAddOn = resolvePaidTotals(stack, ["addon-ok"]);
    expect(withAddOn.minutes - base.minutes).toBe(estimateMinutes(24));
  });

  test("apagarlo devuelve al valor previo, no a uno parecido", () => {
    const stack = buildStack();
    const before = resolvePaidTotals(stack, []);
    resolvePaidTotals(stack, ["addon-ok"]);
    const after = resolvePaidTotals(stack, []);
    expect(after).toEqual(before);
  });

  test("el add-on NO disponible no mueve ninguna de las dos cifras", () => {
    // Aunque su id llegue en la seleccion: es la unica forma de que "fuera de
    // la aritmetica" sea una garantia y no una promesa de la interfaz.
    const stack = buildStack();
    const base = resolvePaidTotals(stack, []);
    const withUnavailable = resolvePaidTotals(stack, ["addon-sin-pack"]);
    expect(withUnavailable).toEqual(base);
  });

  test("un id desconocido no infla el total", () => {
    const stack = buildStack();
    const base = resolvePaidTotals(stack, []);
    expect(resolvePaidTotals(stack, ["no-existe"])).toEqual(base);
  });

  test("un id repetido se cuenta UNA vez", () => {
    const stack = buildStack();
    const once = resolvePaidTotals(stack, ["addon-ok"]);
    const twice = resolvePaidTotals(stack, ["addon-ok", "addon-ok"]);
    expect(twice).toEqual(once);
  });

  test("con varios add-ons disponibles, el total es la suma de los elegidos", () => {
    const result = composePaidStack(
      [
        row("core-1", 60, PAID_CORE_LAYER),
        row("a", 24, ADDON_LAYER),
        row("b", 15, ADDON_LAYER),
      ],
      COLD,
    );
    if (!result.available) throw new Error("expected an available stack");
    const base = resolvePaidTotals(result, []);
    const both = resolvePaidTotals(result, ["a", "b"]);
    expect(both.items - base.items).toBe(24 + 15);
    expect(both.minutes - base.minutes).toBe(estimateMinutes(24) + estimateMinutes(15));
  });

  test("el reuso ya descontado sigue descontado al encender un add-on", () => {
    // El add-on se suma sobre lo que le QUEDA al usuario, no sobre el total
    // frio: si no, encender un extra reintroduciria en silencio los items que
    // el aviso de reuso acaba de decirle que ya tiene hechos.
    const warm = composePaidStack(
      [row("core-1", 60, PAID_CORE_LAYER), row("a", 24, ADDON_LAYER)],
      {
        completedVersionIds: new Set(["core-1"]),
        answeredItemCodes: new Set<string>(),
      },
    );
    if (!warm.available) throw new Error("expected an available stack");
    expect(warm.remainingItems).toBe(0);
    expect(resolvePaidTotals(warm, ["a"]).items).toBe(24);
  });
});
