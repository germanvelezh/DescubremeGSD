/**
 * Unit tests — interpreter dispatch (FOUND-04).
 *
 * El interpreter dispatchea por `formula.type` via Zod discriminated union.
 * Tipos no soportados deben fallar deterministicamente (no eval, no Function).
 * Reservados Phase 2 (`centered_mean`) y Phase 3 (`weighted_sum`).
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 933-973.
 *   - 01-PATTERNS.md §1.10 LOCKED (plugin-as-data principle).
 *   - PLAN.md threat T-01-08-01 (no codigo arbitrario).
 */
import { describe, expect, test } from "vitest";

import { score, ScoringFormulaSchema } from "@/lib/scoring/interpreter";

describe("FOUND-04: interpreter dispatch", () => {
  test("dispatches sum formula correctly", () => {
    const formula = {
      type: "sum" as const,
      item_codes: ["A", "B"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map([
      ["A", 5],
      ["B", 2],
    ]);
    expect(score(formula, responses)).toBe(7);
  });

  test("dispatches mean formula correctly", () => {
    const formula = {
      type: "mean" as const,
      item_codes: ["A", "B", "C"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map([
      ["A", 3],
      ["B", 4],
      ["C", 5],
    ]);
    expect(score(formula, responses)).toBe(4);
  });

  test("Zod schema rejects unknown formula.type", () => {
    const bad = {
      type: "eval",
      item_codes: ["A"],
      reverse_keyed: [],
      scale: [1, 5],
    };
    const result = ScoringFormulaSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  test("Zod schema accepts a valid sum formula", () => {
    const ok = {
      type: "sum",
      item_codes: ["A", "B"],
      reverse_keyed: [],
      scale: [1, 5],
    };
    const result = ScoringFormulaSchema.safeParse(ok);
    expect(result.success).toBe(true);
  });

  test("Zod schema accepts a valid mean formula", () => {
    const ok = {
      type: "mean",
      item_codes: ["A", "B"],
      reverse_keyed: [],
      scale: [1, 5],
    };
    const result = ScoringFormulaSchema.safeParse(ok);
    expect(result.success).toBe(true);
  });

  test("Zod rejects formula missing item_codes", () => {
    const bad = {
      type: "sum",
      reverse_keyed: [],
      scale: [1, 5],
    };
    expect(ScoringFormulaSchema.safeParse(bad).success).toBe(false);
  });
});
