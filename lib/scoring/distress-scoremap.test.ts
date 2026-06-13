/**
 * Unit test (Plan 02-19, RED→GREEN) — derivable distress scoreMap synthesis +
 * seeded-spec normalization, the two pure helpers score-session wires into the
 * NFR-28 banner decision.
 *
 * Closes [GAP-NFR28-DISTRESS-BANNER-UNWIRED]: score-session never evaluated the
 * seeded `distress_thresholds`; the report hardwired `showContention=false`.
 *
 * DERIVABLE-MINIMUM scope (owner decision): only keys derivable from the
 * per-dimension means score-session already computes —
 *   - `<dim>_mean` for every dim (covers `N_mean`),
 *   - single-item dims aliased from their `item_codes[0]` (covers `Lon1`, `hap1`),
 *   - seeded aggregate means (covers `PERMA_total`, mean-of-dimension-means).
 * Item-level keys (`N1`/`N3`) are NOT synthesized — deferred
 * ([GAP-NFR28-ITEM-LEVEL-TRIGGERS]); the evaluator ignores absent keys
 * (evalLeaf: actual==null -> false), so the SUBSET is correct.
 *
 * The normalizer turns the SEEDED shape (`{any:[...]}` groups, ops `lt`/`gt`)
 * into the `DistressThresholdSpec` `evaluateDistressThreshold` consumes (flat
 * `DistressClause[]`, ops `gte`/`lte` + `exclusive`). DATA-driven: branches only
 * on structure/op strings, NEVER on instrument code (FOUND-05). Synthetic codes
 * here keep `lib/scoring` (a scanned dir) FOUND-05-clean.
 *
 * Anchors:
 *  - lib/ethics/distress.ts (evaluateDistressThreshold + DistressThresholdSpec).
 *  - db/seeds/instruments/PERMA-Profiler/instrument-version.sql (seeded shape).
 *  - tests/unit/ethics/decoupled-flags.test.ts (the normalized PERMA oracle).
 */
import { describe, expect, test } from "vitest";

import { evaluateDistressThreshold } from "@/lib/ethics/distress";
import {
  normalizeDistressSpec,
  synthesizeDistressScoreMap,
} from "@/lib/scoring/distress-scoremap";

// ---------------------------------------------------------------------------
// synthesizeDistressScoreMap — derivable keys only
// ---------------------------------------------------------------------------

describe("synthesizeDistressScoreMap (derivable, data-driven, no instrument code)", () => {
  // Synthetic dims (FOUND-05): X is a 3-item dim, Y/Z are single-item dims.
  const scoresByDim = { X: 3.5, Y: 0, Z: 8 };
  const rulesByDim: Record<string, { itemCodes: string[] }> = {
    X: { itemCodes: ["X1", "X2", "X3"] },
    Y: { itemCodes: ["Y1"] },
    Z: { itemCodes: ["Zsolo"] },
  };

  test("aliases <dim>_mean for every dimension", () => {
    const map = synthesizeDistressScoreMap(scoresByDim, rulesByDim, {});
    expect(map.X_mean).toBe(3.5);
    expect(map.Y_mean).toBe(0);
    expect(map.Z_mean).toBe(8);
  });

  test("aliases single-item dims from item_codes[0] (not a built <dim>1 string)", () => {
    const map = synthesizeDistressScoreMap(scoresByDim, rulesByDim, {});
    // Y is single-item -> its item code "Y1" carries the dim mean.
    expect(map.Y1).toBe(0);
    // Z's single item code is "Zsolo", proving the alias is read from data.
    expect(map.Zsolo).toBe(8);
    // A multi-item dim does NOT get an item-level alias (deferred).
    expect(map.X1).toBeUndefined();
  });

  test("computes seeded aggregate means (mean of the listed dimension means)", () => {
    const map = synthesizeDistressScoreMap(scoresByDim, rulesByDim, {
      AGG_total: ["X", "Y", "Z"],
    });
    // mean of [3.5, 0, 8] = 11.5 / 3
    expect(map.AGG_total).toBeCloseTo(11.5 / 3, 5);
  });

  test("an aggregate over a missing dim is skipped from the average, not NaN", () => {
    const map = synthesizeDistressScoreMap(scoresByDim, rulesByDim, {
      AGG_total: ["X", "MISSING"],
    });
    expect(map.AGG_total).toBe(3.5);
  });
});

// ---------------------------------------------------------------------------
// normalizeDistressSpec — seeded shape -> evaluator spec
// ---------------------------------------------------------------------------

// VERBATIM seeded PERMA shape (db/seeds/.../instrument-version.sql) — synthetic
// in op/group structure terms; the keys mirror the seed (FOUND-05 codes are not
// instrument codes, they are positional dimension keys).
const SEEDED_PERMA = {
  strong: {
    any: [
      { key: "N1", op: "gte", value: 8 },
      { key: "N3", op: "gte", value: 8 },
      { key: "Lon1", op: "gte", value: 8 },
      { key: "hap1", op: "lte", value: 2 },
      {
        all: [
          { key: "N3", op: "gte", value: 7 },
          { key: "Lon1", op: "gte", value: 7 },
        ],
      },
    ],
  },
  moderate: {
    any: [
      { key: "PERMA_total", op: "lt", value: 5.0 },
      { key: "N_mean", op: "gt", value: 6.5 },
    ],
  },
};

describe("normalizeDistressSpec (seeded shape -> DistressThresholdSpec)", () => {
  test("matches the 02-06 hand-written wellbeing oracle exactly", () => {
    const normalized = normalizeDistressSpec(SEEDED_PERMA);
    expect(normalized).toEqual({
      strong: [
        { key: "N1", op: "gte", value: 8, exclusive: false },
        { key: "N3", op: "gte", value: 8, exclusive: false },
        { key: "Lon1", op: "gte", value: 8, exclusive: false },
        { key: "hap1", op: "lte", value: 2, exclusive: false },
        {
          all: [
            { key: "N3", op: "gte", value: 7, exclusive: false },
            { key: "Lon1", op: "gte", value: 7, exclusive: false },
          ],
        },
      ],
      moderate: [
        { key: "PERMA_total", op: "lte", value: 5.0, exclusive: true },
        { key: "N_mean", op: "gte", value: 6.5, exclusive: true },
      ],
    });
  });

  test("returns null for a non-sensitive instrument (no distress_thresholds)", () => {
    expect(normalizeDistressSpec(undefined)).toBeNull();
    expect(normalizeDistressSpec(null)).toBeNull();
    expect(normalizeDistressSpec({})).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// End-to-end of the two helpers through the real evaluator (the contract proof)
// ---------------------------------------------------------------------------

describe("synthesis + normalization -> evaluateDistressThreshold (gate c contract)", () => {
  // The PERMA gate-(c) scenario: constant-LOW wellbeing (all dimension means 0).
  const constantLow = { P: 0, E: 0, R: 0, M: 0, A: 0, N: 0, H: 0, Lon: 0, hap: 0 };
  const permaRules: Record<string, { itemCodes: string[] }> = {
    P: { itemCodes: ["P1", "P2", "P3"] },
    E: { itemCodes: ["E1", "E2", "E3"] },
    R: { itemCodes: ["R1", "R2", "R3"] },
    M: { itemCodes: ["M1", "M2", "M3"] },
    A: { itemCodes: ["A1", "A2", "A3"] },
    N: { itemCodes: ["N1", "N2", "N3"] },
    H: { itemCodes: ["H1", "H2", "H3"] },
    Lon: { itemCodes: ["Lon1"] },
    hap: { itemCodes: ["hap1"] },
  };
  const aggregates = { PERMA_total: ["P", "E", "R", "M", "A", "hap"] };

  test("constant-low wellbeing crosses a DERIVABLE trigger -> showContention=true", () => {
    const map = synthesizeDistressScoreMap(constantLow, permaRules, aggregates);
    const spec = normalizeDistressSpec(SEEDED_PERMA)!;
    const out = evaluateDistressThreshold(map, spec);
    // hap1 = 0 <= 2 fires STRONG; PERMA_total = 0 < 5.0 would fire moderate too.
    expect(out.showContention).toBe(true);
    expect(out.severity).toBe("strong");
  });

  test("moderate fires ALONE when no strong trigger holds (PERMA_total path)", () => {
    // hap1 = 9 (NOT <= 2, no strong), Lon1 = 1, N low; but the aggregate
    // PERMA_total = mean(P,E,R,M,A,hap) = mean(1,1,1,1,1,9) = 2.33 < 5.0 fires
    // moderate. This is the ONLY case exercising the moderate/aggregate path end
    // to end (gate (c)'s constant-0 short-circuits on strong hap1<=2).
    const low = { P: 1, E: 1, R: 1, M: 1, A: 1, N: 1, H: 9, Lon: 1, hap: 9 };
    const map = synthesizeDistressScoreMap(low, permaRules, aggregates);
    expect(map.PERMA_total).toBeCloseTo((1 + 1 + 1 + 1 + 1 + 9) / 6, 5);
    const spec = normalizeDistressSpec(SEEDED_PERMA)!;
    const out = evaluateDistressThreshold(map, spec);
    expect(out.showContention).toBe(true);
    expect(out.severity).toBe("moderate");
  });

  test("high wellbeing does NOT cross any derivable trigger -> showContention=false", () => {
    const high = { P: 9, E: 9, R: 9, M: 9, A: 9, N: 1, H: 9, Lon: 1, hap: 9 };
    const map = synthesizeDistressScoreMap(high, permaRules, aggregates);
    const spec = normalizeDistressSpec(SEEDED_PERMA)!;
    const out = evaluateDistressThreshold(map, spec);
    expect(out.showContention).toBe(false);
    expect(out.severity).toBeNull();
  });

  test("item-level N1/N3 are NOT synthesized (deferred) -> not in the map", () => {
    const map = synthesizeDistressScoreMap(constantLow, permaRules, aggregates);
    // N is a 3-item dim; its item-level keys must be absent (deferred). The
    // evaluator ignores them (actual==null -> false).
    expect(map.N1).toBeUndefined();
    expect(map.N3).toBeUndefined();
    // But the derivable N_mean IS present.
    expect(map.N_mean).toBe(0);
  });
});
