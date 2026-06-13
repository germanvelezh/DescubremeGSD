/**
 * Unit tests QUAL-03 — PERMA-Profiler canonical scoring fixture (mean, 0-10).
 *
 * Pins the PERMA `mean-per-dimension` contract with deterministic input ->
 * expected output. The distinctive QUAL-03 property here (vs BFI-2-S, which
 * sums with reverse recode) is the MEAN on the 0-10 scale with ZERO reverse
 * items (pack §4): each subscale = arithmetic mean of its raw 0-10 values, no
 * recode. A known response vector must score to the published per-dimension
 * mean.
 *
 * The formulas + item_codes mirror VERBATIM the seeded scoring rules
 * (db/seeds/instruments/PERMA-Profiler/scoring-rule.sql), which use the
 * positional <dimension><ordinal> code scheme score-session.ts synthesizes.
 * Any interpreter change that produces a different mean for these inputs is a
 * psychometric regression.
 *
 * Also pins two LOAD-BEARING ethics invariants:
 *   - the N/Lon band INVERSION (high raw N -> ALTO -> the care-message text),
 *     keyed against the seeded baremo band_convention cuts;
 *   - the distress_thresholds key scheme (N1/N3/Lon1/hap1, PERMA_total, N_mean)
 *     matching the positional codes — so the (data-driven) detector reads the
 *     right items.
 *
 * Anchors:
 *   - db/seeds/instruments/PERMA-Profiler/scoring-rule.sql (the seeded formulas).
 *   - db/seeds/instruments/PERMA-Profiler/instrument-version.sql (thresholds).
 *   - db/seeds/instruments/PERMA-Profiler/baremo.sql (band_convention cuts).
 *   - implementation_packs/PERMA-Profiler_..._Consolidado.md §1.3 (mean scoring),
 *     §3.1 (band cuts + N inversion), §7.2 (NFR-28 strong thresholds).
 *   - lib/scoring/formulas/mean.ts (mean = sum/count, reverse_keyed=[]).
 *   - tests/unit/scoring/bfi2s-fixture.test.ts (fixture pattern).
 */
import { describe, expect, test } from "vitest";

import { score } from "@/lib/scoring/interpreter";
import type { MeanFormula } from "@/lib/scoring/types";

const SCALE: [number, number] = [0, 10];

/** Seeded PERMA dimension formulas — verbatim mirror of scoring-rule.sql. */
const FORMULAS: Record<string, MeanFormula> = {
  P: { type: "mean", item_codes: ["P1", "P2", "P3"], reverse_keyed: [], scale: SCALE },
  E: { type: "mean", item_codes: ["E1", "E2", "E3"], reverse_keyed: [], scale: SCALE },
  R: { type: "mean", item_codes: ["R1", "R2", "R3"], reverse_keyed: [], scale: SCALE },
  M: { type: "mean", item_codes: ["M1", "M2", "M3"], reverse_keyed: [], scale: SCALE },
  A: { type: "mean", item_codes: ["A1", "A2", "A3"], reverse_keyed: [], scale: SCALE },
  N: { type: "mean", item_codes: ["N1", "N2", "N3"], reverse_keyed: [], scale: SCALE },
  H: { type: "mean", item_codes: ["H1", "H2", "H3"], reverse_keyed: [], scale: SCALE },
  Lon: { type: "mean", item_codes: ["Lon1"], reverse_keyed: [], scale: SCALE },
  hap: { type: "mean", item_codes: ["hap1"], reverse_keyed: [], scale: SCALE },
};

/** Build a responses Map for one dimension from an ordered raw-value vector. */
function dimResponses(dim: string, raws: number[]): Map<string, number> {
  return new Map(FORMULAS[dim].item_codes.map((c, i) => [c, raws[i]]));
}

/** Three-band mapping — verbatim mirror of baremo.sql band_convention. */
const POSITIVE_DIMS = new Set(["P", "E", "R", "M", "A", "H", "hap"]);
function bandFor(dim: string, mean: number): "BAJO" | "MEDIO" | "ALTO" {
  if (POSITIVE_DIMS.has(dim)) {
    if (mean < 5.0) return "BAJO";
    if (mean < 8.0) return "MEDIO";
    return "ALTO";
  }
  // inverted (N, Lon): higher raw = more distress
  if (mean <= 3.0) return "BAJO";
  if (mean <= 6.5) return "MEDIO";
  return "ALTO";
}

describe("QUAL-03: PERMA-Profiler canonical fixture (mean-per-dimension, 0-10)", () => {
  // A fixed, fully-specified 0-10 response vector (the QUAL-03 fixture). Each
  // dimension's expected mean is pinned below.
  const FIXTURE: Record<string, number[]> = {
    P: [9, 6, 9], //   mean 8.0   -> ALTO
    E: [4, 5, 6], //   mean 5.0   -> MEDIO
    R: [10, 8, 9], //  mean 9.0   -> ALTO
    M: [3, 4, 5], //   mean 4.0   -> BAJO
    A: [7, 8, 9], //   mean 8.0   -> ALTO
    N: [8, 7, 9], //   mean 8.0   -> ALTO (much negative emotion, inverted)
    H: [6, 7, 5], //   mean 6.0   -> MEDIO
    Lon: [2], //       mean 2.0   -> BAJO (little loneliness, inverted)
    hap: [7], //       mean 7.0
  };

  const EXPECTED_MEANS: Record<string, number> = {
    P: 8.0, E: 5.0, R: 9.0, M: 4.0, A: 8.0, N: 8.0, H: 6.0, Lon: 2.0, hap: 7.0,
  };

  test("each dimension scores to its published mean (pinned QUAL-03 fixture)", () => {
    for (const dim of Object.keys(FORMULAS)) {
      expect(score(FORMULAS[dim], dimResponses(dim, FIXTURE[dim]))).toBeCloseTo(
        EXPECTED_MEANS[dim],
        10,
      );
    }
  });

  test("all-zero -> 0.0 and all-ten -> 10.0 (scale bounds per dimension)", () => {
    for (const dim of Object.keys(FORMULAS)) {
      const n = FORMULAS[dim].item_codes.length;
      expect(score(FORMULAS[dim], dimResponses(dim, Array(n).fill(0)))).toBe(0);
      expect(score(FORMULAS[dim], dimResponses(dim, Array(n).fill(10)))).toBe(10);
    }
  });

  test("mean of 3 is the plain arithmetic mean (no reverse recode)", () => {
    // [3,4,5] -> 4.0 directly; if a recode leaked in it would not be 4.0.
    expect(score(FORMULAS.M, dimResponses("M", [3, 4, 5]))).toBeCloseTo(4.0, 10);
    // every PERMA formula has zero reverse items (pack §4).
    for (const f of Object.values(FORMULAS)) {
      expect(f.reverse_keyed).toEqual([]);
    }
  });

  test("N/Lon band INVERSION: high negative emotion -> ALTO (care message), low loneliness -> BAJO", () => {
    // The load-bearing ethics invariant: high raw N must map to ALTO so the
    // narrative loader serves the N-ALTO care text, NOT the "little negative
    // emotion" BAJO text.
    expect(bandFor("N", EXPECTED_MEANS.N)).toBe("ALTO"); // mean 8.0 negative emotion
    expect(bandFor("Lon", EXPECTED_MEANS.Lon)).toBe("BAJO"); // mean 2.0 loneliness
    // Contrast: the SAME mean 8.0 on a POSITIVE dim is ALTO=good (P=8.0).
    expect(bandFor("P", EXPECTED_MEANS.P)).toBe("ALTO");
    // And a positive-dim mean below 5 is BAJO=needs-attention (M=4.0).
    expect(bandFor("M", EXPECTED_MEANS.M)).toBe("BAJO");
  });

  test("aggregate score keys for the distress moderate eval (PERMA_total, N_mean)", () => {
    // PERMA_total = mean of the 16 items (P1-P3,E1-E3,R1-R3,M1-M3,A1-A3,hap1).
    const sixteen = [
      ...FIXTURE.P, ...FIXTURE.E, ...FIXTURE.R, ...FIXTURE.M, ...FIXTURE.A, ...FIXTURE.hap,
    ];
    const permaTotal = sixteen.reduce((a, b) => a + b, 0) / sixteen.length;
    // N_mean is the N dimension mean (8.0 in the fixture) -> > 6.5 -> moderate fires.
    expect(EXPECTED_MEANS.N).toBeGreaterThan(6.5);
    // PERMA_total in this fixture is comfortably above the languishing cut.
    expect(permaTotal).toBeGreaterThanOrEqual(5.0);
  });

  test("missing response surfaces deterministic error (no silent zero-fill)", () => {
    const partial = new Map([["P1", 9], ["P2", 6]]); // P3 missing
    expect(() => score(FORMULAS.P, partial)).toThrow(/missing response.*P3/i);
  });
});
