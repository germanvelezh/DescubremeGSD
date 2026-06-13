/**
 * MRAT transform tests — D-E1.3, QUAL-05 (Plan 02-03, Wave 2).
 *
 * Conceptual oracle: the R package `persval` (CRAN) implements canonical
 * within-person centering for the Schwartz values family (pack §3.0.4 note).
 * We replicate its arithmetic here as plain fixtures — NOT as a dependency.
 *
 * NOTE (FOUND-05): this file lives under `lib/scoring`, which the
 * no-hardcoded-instruments lint scans. Value/HOV codes below are GENERIC
 * placeholders (v1..v4, H_A..H_B), never an instrument-code literal, so the
 * gate stays green. Real codes are seed content (Plan 02-10/02-13).
 */
import { describe, expect, test } from "vitest";

import {
  bandFromMrat,
  computeMratScores,
  type MratScore,
} from "@/lib/scoring/mrat";

const EPS = 1e-9;

// valueMap: value code -> item keys it averages.
// hovMap: HOV code -> value codes it rolls up (MEAN, not sum).
const VALUE_MAP: Record<string, string[]> = {
  v1: ["i1", "i2"],
  v2: ["i3", "i4"],
  v3: ["i5", "i6"],
  v4: ["i7", "i8"],
};
const HOV_MAP: Record<string, string[]> = {
  H_A: ["v1", "v2"],
  H_B: ["v3", "v4"],
};

function findScore(scores: MratScore[], code: string): MratScore {
  const hit = scores.find((s) => s.code === code);
  if (!hit) throw new Error(`missing score for ${code}`);
  return hit;
}

describe("computeMratScores — MRAT centering (D-E1.3)", () => {
  test("[QUAL-05] all-equal answers (any constant k) -> every value and HOV centered ~= 0", () => {
    for (const k of [1, 3, 5, 6]) {
      const raw = Object.values(VALUE_MAP)
        .flat()
        .map((itemKey) => ({ itemKey, rawValue: k }));

      const result = computeMratScores(raw, VALUE_MAP, HOV_MAP);

      expect(result.mrat).toBeCloseTo(k, 9);
      for (const v of result.values) {
        expect(Math.abs(v.centered)).toBeLessThan(EPS);
      }
      for (const h of result.higherOrder) {
        expect(Math.abs(h.centered)).toBeLessThan(EPS);
      }
    }
  });

  test("MRAT = mean of the FULL item vector, never mean of facet/value means", () => {
    // UNBALANCED on purpose: value v1 gets 3 items, the rest get 1 each, and
    // we override VALUE_MAP locally so per-value means diverge from the item
    // mean. If MRAT were mean(valueMeans) it would equal a different number;
    // we assert it equals mean(items).
    const valueMap: Record<string, string[]> = {
      v1: ["a1", "a2", "a3"], // mean = (10+10+10)/3 = 10
      v2: ["b1"], //              mean = 2
      v3: ["c1"], //              mean = 2
    };
    const hovMap: Record<string, string[]> = { H_A: ["v1", "v2", "v3"] };
    const raw = [
      { itemKey: "a1", rawValue: 10 },
      { itemKey: "a2", rawValue: 10 },
      { itemKey: "a3", rawValue: 10 },
      { itemKey: "b1", rawValue: 2 },
      { itemKey: "c1", rawValue: 2 },
    ];

    const result = computeMratScores(raw, valueMap, hovMap);

    // mean(items) = (10+10+10+2+2)/5 = 6.8
    expect(result.mrat).toBeCloseTo(6.8, 9);
    // mean(valueMeans) = (10+2+2)/3 = 4.6667 — MRAT must NOT equal this.
    expect(Math.abs(result.mrat - 14 / 3)).toBeGreaterThan(0.5);

    // centered_v1 = 10 - 6.8 = 3.2 ; centered_v2 = centered_v3 = 2 - 6.8 = -4.8
    expect(findScore(result.values, "v1").centered).toBeCloseTo(3.2, 9);
    expect(findScore(result.values, "v2").centered).toBeCloseTo(-4.8, 9);
    expect(findScore(result.values, "v3").centered).toBeCloseTo(-4.8, 9);
  });

  test("HOV rollup uses MEAN (not sum) of the centered values it aggregates", () => {
    // Balanced 2 items/value so sum-of-centered ~= 0 holds globally.
    const raw = [
      { itemKey: "i1", rawValue: 6 }, // v1 -> mean 6
      { itemKey: "i2", rawValue: 6 },
      { itemKey: "i3", rawValue: 4 }, // v2 -> mean 4
      { itemKey: "i4", rawValue: 4 },
      { itemKey: "i5", rawValue: 2 }, // v3 -> mean 2
      { itemKey: "i6", rawValue: 2 },
      { itemKey: "i7", rawValue: 4 }, // v4 -> mean 4
      { itemKey: "i8", rawValue: 4 },
    ];
    // MRAT = mean(all 8) = (6+6+4+4+2+2+4+4)/8 = 4
    const result = computeMratScores(raw, VALUE_MAP, HOV_MAP);
    expect(result.mrat).toBeCloseTo(4, 9);

    // centered: v1=+2, v2=0, v3=-2, v4=0
    // H_A = mean(centered v1, v2) = mean(2, 0) = 1  (sum would be 2)
    // H_B = mean(centered v3, v4) = mean(-2, 0) = -1 (sum would be -2)
    expect(findScore(result.higherOrder, "H_A").centered).toBeCloseTo(1, 9);
    expect(findScore(result.higherOrder, "H_B").centered).toBeCloseTo(-1, 9);
  });

  test("non-degenerate spike: spiked value centers positive, others negative, centered values sum ~= 0 (balanced)", () => {
    const raw = [
      { itemKey: "i1", rawValue: 6 }, // v1 spike
      { itemKey: "i2", rawValue: 6 },
      { itemKey: "i3", rawValue: 1 },
      { itemKey: "i4", rawValue: 1 },
      { itemKey: "i5", rawValue: 1 },
      { itemKey: "i6", rawValue: 1 },
      { itemKey: "i7", rawValue: 1 },
      { itemKey: "i8", rawValue: 1 },
    ];
    const result = computeMratScores(raw, VALUE_MAP, HOV_MAP);

    expect(findScore(result.values, "v1").centered).toBeGreaterThan(0);
    expect(findScore(result.values, "v2").centered).toBeLessThan(0);
    expect(findScore(result.values, "v3").centered).toBeLessThan(0);
    expect(findScore(result.values, "v4").centered).toBeLessThan(0);

    const sumCentered = result.values.reduce((acc, v) => acc + v.centered, 0);
    expect(Math.abs(sumCentered)).toBeLessThan(EPS);
  });
});

describe("bandFromMrat — within-person band (NOT a population baremo)", () => {
  test("positive centered -> ALTO, near-zero -> MEDIO, negative -> BAJO", () => {
    expect(bandFromMrat(2.5)).toBe("ALTO");
    expect(bandFromMrat(0)).toBe("MEDIO");
    expect(bandFromMrat(-2.5)).toBe("BAJO");
  });

  test("all-equal (centered 0) -> MEDIO for every HOV (QUAL-05 visual posture)", () => {
    const raw = Object.values(VALUE_MAP)
      .flat()
      .map((itemKey) => ({ itemKey, rawValue: 5 }));
    const result = computeMratScores(raw, VALUE_MAP, HOV_MAP);
    for (const h of result.higherOrder) {
      expect(bandFromMrat(h.centered)).toBe("MEDIO");
    }
  });
});
