/**
 * Unit tests QUAL-03 — BFI-2-S canonical scoring fixture (reverse-keyed).
 *
 * Pins the BFI-2-S `sum-per-domain` contract (5 domains × 6 items, 3 reverse
 * per domain, 15 reverse total) with deterministic input -> expected output.
 * The distinctive QUAL-03 property here (vs O*NET, which has NO reverse items)
 * is the REVERSE RECODE: items in `reverse_keyed` get applyReverse(raw,1,5) =
 * (5+1)-raw applied before summing (QUAL-04). A known response vector with
 * reverse items must score to the post-recode domain sum.
 *
 * The formulas + reverse_keyed lists mirror VERBATIM the seeded scoring rules
 * (db/seeds/instruments/BFI-2-S/scoring-rule.sql), which use the positional
 * <domain><ordinal> code scheme the scorer synthesizes. Any interpreter change
 * that produces a different sum for these inputs is a psychometric regression.
 *
 * Anchors:
 *   - db/seeds/instruments/BFI-2-S/scoring-rule.sql (the seeded formulas).
 *   - implementation_packs/BFI-2-S_..._Consolidado.md §1.1 (domains), §4 (reverse key).
 *   - lib/scoring/formulas/sum.ts (applyReverse on reverse_keyed before sum).
 *   - tests/unit/scoring/onet-fixture.test.ts (fixture pattern).
 */
import { describe, expect, test } from "vitest";

import { applyReverse } from "@/lib/scoring/apply-reverse";
import { score } from "@/lib/scoring/interpreter";
import type { SumFormula } from "@/lib/scoring/types";

const SCALE: [number, number] = [1, 5];

/** Seeded BFI-2-S domain formulas — verbatim mirror of scoring-rule.sql. */
const FORMULAS: Record<string, SumFormula> = {
  EXT: {
    type: "sum",
    item_codes: ["EXT1", "EXT2", "EXT3", "EXT4", "EXT5", "EXT6"],
    reverse_keyed: ["EXT1", "EXT5", "EXT6"],
    scale: SCALE,
  },
  AGR: {
    type: "sum",
    item_codes: ["AGR1", "AGR2", "AGR3", "AGR4", "AGR5", "AGR6"],
    reverse_keyed: ["AGR2", "AGR4", "AGR6"],
    scale: SCALE,
  },
  CON: {
    type: "sum",
    item_codes: ["CON1", "CON2", "CON3", "CON4", "CON5", "CON6"],
    reverse_keyed: ["CON1", "CON2", "CON6"],
    scale: SCALE,
  },
  NEG: {
    type: "sum",
    item_codes: ["NEG1", "NEG2", "NEG3", "NEG4", "NEG5", "NEG6"],
    reverse_keyed: ["NEG3", "NEG4", "NEG5"],
    scale: SCALE,
  },
  OPN: {
    type: "sum",
    item_codes: ["OPN1", "OPN2", "OPN3", "OPN4", "OPN5", "OPN6"],
    reverse_keyed: ["OPN2", "OPN4", "OPN6"],
    scale: SCALE,
  },
};

/** Build a responses Map for one domain from an ordered raw-value vector. */
function domainResponses(domain: string, raws: number[]): Map<string, number> {
  return new Map(FORMULAS[domain].item_codes.map((c, i) => [c, raws[i]]));
}

describe("QUAL-03: BFI-2-S canonical fixture (sum-per-domain + reverse recode)", () => {
  test("all-15 reverse items balance: every domain all-3 sums to 18 (midpoint invariant)", () => {
    // raw=3 is the reverse fixed point: applyReverse(3,1,5)=3, so direct and
    // reverse items both contribute 3 -> 6 items × 3 = 18.
    for (const domain of Object.keys(FORMULAS)) {
      expect(score(FORMULAS[domain], domainResponses(domain, [3, 3, 3, 3, 3, 3]))).toBe(18);
    }
  });

  test("NEG (Sensibilidad emocional): [NEG1=4,NEG2=5,NEG3=2,NEG4=1,NEG5=3,NEG6=4] -> 25", () => {
    // direct: NEG1=4, NEG2=5, NEG6=4. reverse: NEG3=2->4, NEG4=1->5, NEG5=3->3.
    // sum = 4 + 5 + 4 + (4 + 5 + 3) = 25.
    const expected =
      4 + 5 + 4 + applyReverse(2, 1, 5) + applyReverse(1, 1, 5) + applyReverse(3, 1, 5);
    expect(expected).toBe(25);
    expect(score(FORMULAS.NEG, domainResponses("NEG", [4, 5, 2, 1, 3, 4]))).toBe(25);
  });

  test("EXT: reverse items recoded — [EXT1=1,EXT2=5,EXT3=5,EXT4=5,EXT5=1,EXT6=1] -> 30 (max extraversion)", () => {
    // High extraversion: direct items high (5), reverse items low (1->5).
    // EXT1=1->5, EXT2=5, EXT3=5, EXT4=5, EXT5=1->5, EXT6=1->5 = 30 (domain max).
    expect(score(FORMULAS.EXT, domainResponses("EXT", [1, 5, 5, 5, 1, 1]))).toBe(30);
  });

  test("AGR: all-reverse-low/direct-low -> 6 (domain min, all recoded to 1)", () => {
    // direct AGR1,AGR3,AGR5 = 1; reverse AGR2,AGR4,AGR6 = 5 -> recoded to 1.
    expect(score(FORMULAS.AGR, domainResponses("AGR", [1, 5, 1, 5, 1, 5]))).toBe(6);
  });

  test("CON: mixed [CON1=2,CON2=4,CON3=3,CON4=5,CON5=4,CON6=1] -> 19", () => {
    // reverse CON1=2->4, CON2=4->2, CON6=1->5. direct CON3=3,CON4=5,CON5=4.
    // sum = 4 + 2 + 3 + 5 + 4 + 5 = 23.
    const expected =
      applyReverse(2, 1, 5) + applyReverse(4, 1, 5) + 3 + 5 + 4 + applyReverse(1, 1, 5);
    expect(expected).toBe(23);
    expect(score(FORMULAS.CON, domainResponses("CON", [2, 4, 3, 5, 4, 1]))).toBe(23);
  });

  test("OPN: all-5 raw -> direct 5 + reverse 5->1 = 18 (mixed by design)", () => {
    // direct OPN1,OPN3,OPN5 = 5; reverse OPN2,OPN4,OPN6 = 5 -> 1.
    expect(score(FORMULAS.OPN, domainResponses("OPN", [5, 5, 5, 5, 5, 5]))).toBe(18);
  });

  test("each domain has exactly 6 items and 3 reverse-keyed (15 reverse total)", () => {
    let reverseTotal = 0;
    for (const f of Object.values(FORMULAS)) {
      expect(f.item_codes).toHaveLength(6);
      expect(f.reverse_keyed).toHaveLength(3);
      expect(new Set(f.reverse_keyed).size).toBe(3);
      // reverse codes are a subset of item_codes
      for (const r of f.reverse_keyed) expect(f.item_codes).toContain(r);
      reverseTotal += f.reverse_keyed.length;
    }
    expect(reverseTotal).toBe(15);
  });

  test("missing response surfaces deterministic error (no silent zero-fill)", () => {
    const partial = new Map(
      FORMULAS.NEG.item_codes.slice(0, 5).map((c, i) => [c, [4, 5, 2, 1, 3][i]]),
    );
    expect(() => score(FORMULAS.NEG, partial)).toThrow(/missing response.*NEG6/i);
  });
});
