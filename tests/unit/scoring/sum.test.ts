/**
 * Unit tests — sum formula (FOUND-04).
 *
 * `score({type:'sum', item_codes, reverse_keyed, scale}, responses)` suma
 * raw_values aplicando applyReverse a items en reverse_keyed.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 933-973 (DSL + interpreter).
 *   - 01-PATTERNS.md §1.10 (plugin-as-data; sum formula primitive).
 */
import { describe, expect, test } from "vitest";

import { score } from "@/lib/scoring/interpreter";

describe("FOUND-04: sum formula", () => {
  test("plain sum (no reverse) of two items returns expected total", () => {
    const formula = {
      type: "sum" as const,
      item_codes: ["I1", "I2"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map([
      ["I1", 4],
      ["I2", 2],
    ]);
    expect(score(formula, responses)).toBe(6);
  });

  test("sum with one reverse-keyed item applies (max+min)-raw", () => {
    // applyReverse(2, 1, 5) = 4. So I1=4 + reversed I2=4 = 8.
    const formula = {
      type: "sum" as const,
      item_codes: ["I1", "I2"],
      reverse_keyed: ["I2"],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map([
      ["I1", 4],
      ["I2", 2],
    ]);
    expect(score(formula, responses)).toBe(8);
  });

  test("sum over 10 items (RIASEC dimension shape) — all 3 = 30 on 1-5 scale", () => {
    const formula = {
      type: "sum" as const,
      item_codes: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map(
      formula.item_codes.map((code) => [code, 3] as [string, number]),
    );
    expect(score(formula, responses)).toBe(30);
  });

  test("missing response throws a deterministic error (no silent zero-fill)", () => {
    const formula = {
      type: "sum" as const,
      item_codes: ["I1", "I2"],
      reverse_keyed: [],
      scale: [1, 5] as [number, number],
    };
    const responses = new Map([["I1", 4]]);
    expect(() => score(formula, responses)).toThrow(/missing response.*I2/i);
  });
});
