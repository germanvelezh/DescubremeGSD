/**
 * runner-navigation — pure resolution for the redesigned item loop (Ola 2.1).
 *
 * Two safety-critical pure functions, unit-tested BEFORE wiring into the
 * server component:
 *
 *  1. resolveDisplayItem — the "Atras" bounds check. The runner is server-driven
 *     (getNextItemForSession serves sequence = progress+1, progress = distinct
 *     answer COUNT). An out-of-bounds `?item=N` that lets the user answer an item
 *     BEYOND the frontier drifts the count past coverage and FREEZES the runner
 *     permanently (never reaches N=total, never fires /done). So a back-view is
 *     valid ONLY for an already-answered item: integer N in [1, progress].
 *     Anything else → serve the frontier (progress+1), never a stray N.
 *
 *  2. resolveBlockPosition — O*NET 5x12 block math (data-driven by code +
 *     itemCount=60). No reordering; blocks are sequential chunks of 12.
 */
import { describe, expect, test } from "vitest";

import {
  resolveBlockPosition,
  resolveClosedBlock,
  resolveDisplayItem,
  resolvePauseSuggestion,
} from "./runner-navigation";

describe("resolveDisplayItem — Atras bounds check (freeze prevention)", () => {
  test("no param → frontier (progress+1), not a back-view", () => {
    expect(resolveDisplayItem(undefined, 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("empty string → frontier", () => {
    expect(resolveDisplayItem("", 10)).toEqual({ seq: 11, isBackView: false });
  });

  test("non-numeric → frontier", () => {
    expect(resolveDisplayItem("abc", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("non-integer → frontier", () => {
    expect(resolveDisplayItem("2.5", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("zero → frontier (below 1)", () => {
    expect(resolveDisplayItem("0", 10)).toEqual({ seq: 11, isBackView: false });
  });

  test("negative → frontier", () => {
    expect(resolveDisplayItem("-3", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("valid first answered item → back-view seq 1", () => {
    expect(resolveDisplayItem("1", 10)).toEqual({ seq: 1, isBackView: true });
  });

  test("N == progress (last answered) → back-view", () => {
    expect(resolveDisplayItem("10", 10)).toEqual({
      seq: 10,
      isBackView: true,
    });
  });

  test("N == progress+1 (the frontier itself) → frontier, NOT back-view", () => {
    expect(resolveDisplayItem("11", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("N far beyond frontier (the freeze case) → frontier, never N", () => {
    // progress=10, someone hand-edits ?item=15. Serving 15 would let them
    // answer an item past the frontier and freeze the runner. Must clamp.
    expect(resolveDisplayItem("15", 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });

  test("progress=0 (nothing answered) → frontier seq 1, any back-view rejected", () => {
    expect(resolveDisplayItem("1", 0)).toEqual({ seq: 1, isBackView: false });
    expect(resolveDisplayItem(undefined, 0)).toEqual({
      seq: 1,
      isBackView: false,
    });
  });

  test("array param (searchParams repeat) → frontier", () => {
    expect(resolveDisplayItem(["3"], 10)).toEqual({
      seq: 11,
      isBackView: false,
    });
  });
});

describe("resolveBlockPosition — 5x12 block math (blockSize decided by caller)", () => {
  test("first item → block 1, item 1 of 12", () => {
    expect(resolveBlockPosition(1, 60, 12)).toEqual({
      block: 1,
      totalBlocks: 5,
      itemInBlock: 1,
      blockSize: 12,
    });
  });

  test("last item of block 1", () => {
    expect(resolveBlockPosition(12, 60, 12)).toMatchObject({
      block: 1,
      itemInBlock: 12,
    });
  });

  test("first item of block 2 (boundary)", () => {
    expect(resolveBlockPosition(13, 60, 12)).toMatchObject({
      block: 2,
      itemInBlock: 1,
    });
  });

  test("last item overall → block 5, item 12", () => {
    expect(resolveBlockPosition(60, 60, 12)).toMatchObject({
      block: 5,
      totalBlocks: 5,
      itemInBlock: 12,
    });
  });

  test("no block presentation (blockSize null) → null (continuous bar)", () => {
    expect(resolveBlockPosition(5, 30, null)).toBeNull();
    expect(resolveBlockPosition(5, 60, null)).toBeNull();
  });

  test("non-positive blockSize or empty test → null (guarded)", () => {
    expect(resolveBlockPosition(5, 60, 0)).toBeNull();
    expect(resolveBlockPosition(1, 0, 12)).toBeNull();
    expect(resolveBlockPosition(0, 60, 12)).toBeNull();
  });
});

/**
 * D-16 / D-17 (Plan 03-02) — la logica pura de CUANDO sugerir una pausa.
 *
 * Decidida por DATO y sin conocer ningun instrumento: entra el bloque que se
 * acaba de cerrar y el total de bloques. El 48 de D-16 NO aparece por ningun
 * lado — es la consecuencia aritmetica de 96 items en bloques de 12, no una
 * constante. `lib/free` esta bajo FOUND-05.
 */
describe("resolveClosedBlock — que bloque acaba de cerrar el usuario", () => {
  const at = (block: number, itemInBlock: number, totalBlocks: number) => ({
    block,
    totalBlocks,
    itemInBlock,
    blockSize: 12,
  });

  test("el item 1 de un bloque que no es el primero -> cerro el anterior", () => {
    // El runner es server-driven: responder el item 12 sirve el item 13. Estar
    // en el item 13 (bloque 2, item 1) ES haber cerrado el bloque 1.
    expect(resolveClosedBlock(at(2, 1, 5))).toBe(1);
    expect(resolveClosedBlock(at(5, 1, 8))).toBe(4);
  });

  test("en medio de un bloque no se cerro nada", () => {
    expect(resolveClosedBlock(at(2, 2, 5))).toBeNull();
    expect(resolveClosedBlock(at(1, 12, 5))).toBeNull();
  });

  test("el primer item del test no cierra ningun bloque", () => {
    expect(resolveClosedBlock(at(1, 1, 5))).toBeNull();
  });

  test("sin presentacion por bloques no hay bordes", () => {
    expect(resolveClosedBlock(null)).toBeNull();
  });
});

describe("resolvePauseSuggestion — 5 bloques (O*NET, sin punto medio exacto)", () => {
  const TOTAL = 5;

  test("cerrar un bloque intermedio sugiere pausa", () => {
    expect(resolvePauseSuggestion(1, TOTAL)).toBe("block-edge");
    expect(resolvePauseSuggestion(2, TOTAL)).toBe("block-edge");
    expect(resolvePauseSuggestion(3, TOTAL)).toBe("block-edge");
    expect(resolvePauseSuggestion(4, TOTAL)).toBe("block-edge");
  });

  test("con total IMPAR no se emite ningun punto medio", () => {
    // Inventar una "mitad" en el bloque 2 o 3 de 5 seria una afirmacion falsa
    // sobre el recorrido. El midpoint existe solo cuando hay mitad exacta.
    for (const closed of [1, 2, 3, 4]) {
      expect(resolvePauseSuggestion(closed, TOTAL)).not.toBe("midpoint");
    }
  });

  test("cerrar el ULTIMO bloque no sugiere pausa (lo cubre TransitionScreen)", () => {
    expect(resolvePauseSuggestion(5, TOTAL)).toBe("none");
  });
});

describe("resolvePauseSuggestion — 8 bloques (VIA, valores sinteticos)", () => {
  const TOTAL = 8;

  test("cerrar el bloque 4 —la mitad— da el punto medio", () => {
    expect(resolvePauseSuggestion(4, TOTAL)).toBe("midpoint");
  });

  test("los demas bordes no finales dan block-edge", () => {
    for (const closed of [1, 2, 3, 5, 6, 7]) {
      expect(resolvePauseSuggestion(closed, TOTAL)).toBe("block-edge");
    }
  });

  test("cerrar el bloque 8 (ultimo) no sugiere nada", () => {
    expect(resolvePauseSuggestion(8, TOTAL)).toBe("none");
  });
});

describe("resolvePauseSuggestion — casos degenerados: nunca sugerir de mas", () => {
  test("sin bloque cerrado (blockSize nulo, o en medio de un bloque) -> none", () => {
    expect(resolvePauseSuggestion(null, 5)).toBe("none");
    expect(resolvePauseSuggestion(null, 0)).toBe("none");
  });

  test("sin presentacion por bloques (total 0 o 1) -> none", () => {
    expect(resolvePauseSuggestion(1, 0)).toBe("none");
    expect(resolvePauseSuggestion(1, 1)).toBe("none");
  });

  test("con 2 bloques el unico borde es block-edge, no midpoint", () => {
    // 2/2 = 1 seria "la mitad", pero llamar punto medio al primer borde de dos
    // es ruido: el usuario apenas empezo. Por eso el midpoint exige total > 2.
    expect(resolvePauseSuggestion(1, 2)).toBe("block-edge");
    expect(resolvePauseSuggestion(2, 2)).toBe("none");
  });

  test("un bloque cerrado fuera de rango no inventa una sugerencia", () => {
    expect(resolvePauseSuggestion(0, 5)).toBe("none");
    expect(resolvePauseSuggestion(-1, 5)).toBe("none");
    expect(resolvePauseSuggestion(9, 8)).toBe("none");
  });
});
