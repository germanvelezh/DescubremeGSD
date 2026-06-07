/**
 * Unit tests QUAL-03 — O*NET IP-SF canonical scoring fixture.
 *
 * Pack §3 documenta el contrato `sum por dimension` para 6 dimensiones
 * RIASEC con 10 items cada una (60 total), `reverse_keyed=[]` (Pack §4).
 * Este test PINEA el contrato con una fixture determinista: input
 * conocido (raw_values por item) -> sum esperado por dimension.
 *
 * El Pack publica `alpha` por dimension (Tabla 3) y M/SD en proporcion
 * 0-1 (Tabla 4 stability sample N=125), pero NO una fixture canonica
 * input->expected_output. Este test materializa el contrato con una
 * fixture determinista coherente con la formula `sum`.
 *
 * Cualquier cambio futuro al interpreter que produzca distintos sums
 * con estos inputs es una regresion psicometrica.
 *
 * Anchors:
 *   - implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md §3 + §4.
 *   - 01-RESEARCH.md lineas 985-996 (scoring config seed).
 *   - 01-PATTERNS.md row 2 LOCKED (plugin-as-data; fixture is the contract).
 */
import { describe, expect, test } from "vitest";

import { score } from "@/lib/scoring/interpreter";
import { computeRiasecTop3 } from "@/lib/riasec/top3";

/**
 * Helper: build a formula for a RIASEC dim with 10 items on a 1-5 Likert.
 */
function dimFormula(dim: "R" | "I" | "A" | "S" | "E" | "C") {
  return {
    type: "sum" as const,
    item_codes: Array.from({ length: 10 }, (_, i) => `${dim}${i + 1}`),
    reverse_keyed: [],
    scale: [1, 5] as [number, number],
  };
}

/**
 * Helper: deterministic responses Map for one dim with a constant raw value.
 */
function flatResponses(
  dim: "R" | "I" | "A" | "S" | "E" | "C",
  value: number,
): Map<string, number> {
  return new Map(
    Array.from({ length: 10 }, (_, i) => [`${dim}${i + 1}`, value]),
  );
}

describe("QUAL-03: O*NET IP-SF canonical fixture (Pack §3 sum-per-dim)", () => {
  test("R (Realistic): all-3 responses sum = 30 (10 items × 3)", () => {
    expect(score(dimFormula("R"), flatResponses("R", 3))).toBe(30);
  });

  test("I (Investigative): all-5 responses sum = 50 (max-out scenario)", () => {
    expect(score(dimFormula("I"), flatResponses("I", 5))).toBe(50);
  });

  test("A (Artistic): all-1 responses sum = 10 (min-out scenario)", () => {
    expect(score(dimFormula("A"), flatResponses("A", 1))).toBe(10);
  });

  test("S (Social): mixed [5,5,5,4,4,3,3,2,2,1] = 34", () => {
    const formula = dimFormula("S");
    const values = [5, 5, 5, 4, 4, 3, 3, 2, 2, 1];
    const responses = new Map(
      formula.item_codes.map((code, i) => [code, values[i] as number]),
    );
    expect(score(formula, responses)).toBe(34);
  });

  test("E (Enterprising): mixed [2,2,3,3,3,3,4,4,5,5] = 34", () => {
    const formula = dimFormula("E");
    const values = [2, 2, 3, 3, 3, 3, 4, 4, 5, 5];
    const responses = new Map(
      formula.item_codes.map((code, i) => [code, values[i] as number]),
    );
    expect(score(formula, responses)).toBe(34);
  });

  test("C (Conventional): all-2 responses sum = 20", () => {
    expect(score(dimFormula("C"), flatResponses("C", 2))).toBe(20);
  });

  test("top-3 RIASEC derivation: R=32, I=28, A=24, S=18, E=14, C=10 → [R, I, A]", () => {
    const top = computeRiasecTop3({ R: 32, I: 28, A: 24, S: 18, E: 14, C: 10 });
    expect(top).toEqual(["R", "I", "A"]);
  });

  test("missing item response surfaces deterministic error (no silent zero-fill)", () => {
    const formula = dimFormula("R");
    const partial = new Map(
      Array.from({ length: 9 }, (_, i) => [`R${i + 1}`, 3] as [string, number]),
    );
    // Missing R10 -> deterministic throw.
    expect(() => score(formula, partial)).toThrow(/missing response.*R10/i);
  });
});
