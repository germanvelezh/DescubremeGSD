/**
 * Decoupled ethical_flags + generic distress threshold eval (Plan 02-06 Task 1).
 *
 * RESEARCH Open Question O-4: the single `emotional_distress` switch conflates
 * "pre-test modal" (NFR-27) and "contention route" (NFR-28). CONTEXT D-A.2 +
 * locked-decision #3 require THREE independent behaviors so the VALUES (TwIVI)
 * instrument can keep the contention footer WITHOUT a modal or detector.
 *
 * This suite exercises the pure, data-driven cores:
 *  - `decoupleEthicalFlags(raw)` → { pretestModal, contentionRoute, distressDetector }
 *    reads three booleans off the object-shape jsonb; maps the legacy
 *    `['emotional_distress']` array to all-true; defaults missing keys false.
 *  - `evaluateDistressThreshold(scoreMap, thresholds)` → { showContention, severity }
 *    branches on DATA (op/value clauses), never on instrument code. Verbatim
 *    BFI / PERMA thresholds (02-RESEARCH.md §"Concrete NFR-28 thresholds") are
 *    encoded as fixtures here, NOT inside lib/ethics (FOUND-05).
 *
 * Anchors:
 *  - 02-RESEARCH.md §"Concrete NFR-28 thresholds (verbatim)".
 *  - 02-CONTEXT.md D-A.2 ([RESUELTO] values = no modal, keep footer), D-D.1/2/3.
 *  - 02-06-PLAN.md Task 1 <behavior> + <acceptance_criteria>.
 */
import { describe, expect, test } from "vitest";

import { decoupleEthicalFlags } from "@/lib/ethics/middleware";
import {
  evaluateDistressThreshold,
  type DistressThresholdSpec,
} from "@/lib/ethics/distress";

describe("decoupleEthicalFlags (O-4 decoupling)", () => {
  test("all three booleans true → all behaviors enabled", () => {
    const out = decoupleEthicalFlags({
      pretest_modal: true,
      contention_route: true,
      distress_detector: true,
    });
    expect(out).toEqual({
      pretestModal: true,
      contentionRoute: true,
      distressDetector: true,
    });
  });

  test("VALUES (TwIVI) shape → no modal, keep contention route, no detector", () => {
    const out = decoupleEthicalFlags({
      pretest_modal: false,
      contention_route: true,
      distress_detector: false,
    });
    expect(out.pretestModal).toBe(false);
    expect(out.contentionRoute).toBe(true);
    expect(out.distressDetector).toBe(false);
  });

  test("no flags (O*NET, empty array) → all false", () => {
    expect(decoupleEthicalFlags([])).toEqual({
      pretestModal: false,
      contentionRoute: false,
      distressDetector: false,
    });
    expect(decoupleEthicalFlags(null)).toEqual({
      pretestModal: false,
      contentionRoute: false,
      distressDetector: false,
    });
  });

  test("legacy ['emotional_distress'] array → backward-compat all true", () => {
    expect(decoupleEthicalFlags(["emotional_distress"])).toEqual({
      pretestModal: true,
      contentionRoute: true,
      distressDetector: true,
    });
  });

  test("legacy object {emotional_distress:true} → all true", () => {
    expect(decoupleEthicalFlags({ emotional_distress: true })).toEqual({
      pretestModal: true,
      contentionRoute: true,
      distressDetector: true,
    });
  });

  test("partial object defaults missing keys to false", () => {
    expect(decoupleEthicalFlags({ contention_route: true })).toEqual({
      pretestModal: false,
      contentionRoute: true,
      distressDetector: false,
    });
  });
});

// Verbatim thresholds (fixtures only — never inside lib/ethics, FOUND-05).
// BFI-2-S TRIGGERS_NFR28_REDESIGN §4 — strong only, disjunctive, facet means:
//   N2 (Depresión) >= 4.0 OR N1 (Ansiedad) >= 4.0.
const BFI_THRESHOLDS: DistressThresholdSpec = {
  strong: [
    { key: "N2", op: "gte", value: 4.0 },
    { key: "N1", op: "gte", value: 4.0 },
  ],
};

// PERMA TRIGGERS_MODERATE_VALIDATION — strong (item-level) + moderate (score):
//   strong: N1>=8 OR N3>=8 OR Lon>=8 OR hap<=2 OR (N3>=7 AND Lon>=7)
//   moderate: PERMA_total < 5.0 OR N_mean > 6.5
const PERMA_THRESHOLDS: DistressThresholdSpec = {
  strong: [
    { key: "N1", op: "gte", value: 8 },
    { key: "N3", op: "gte", value: 8 },
    { key: "Lon", op: "gte", value: 8 },
    { key: "hap", op: "lte", value: 2 },
    // conjunctive sub-clause: N3>=7 AND Lon>=7
    { all: [
      { key: "N3", op: "gte", value: 7 },
      { key: "Lon", op: "gte", value: 7 },
    ] },
  ],
  moderate: [
    { key: "PERMA_total", op: "lte", value: 5.0, exclusive: true },
    { key: "N_mean", op: "gte", value: 6.5, exclusive: true },
  ],
};

describe("evaluateDistressThreshold (data-driven, no instrument branch)", () => {
  test("BFI: N2 facet mean 4.2 crosses strong → showContention", () => {
    const out = evaluateDistressThreshold(
      { N2: 4.2, N1: 2.1 },
      BFI_THRESHOLDS,
    );
    expect(out.showContention).toBe(true);
    expect(out.severity).toBe("strong");
  });

  test("BFI: both facets below 4.0 → no contention", () => {
    const out = evaluateDistressThreshold(
      { N2: 3.5, N1: 3.9 },
      BFI_THRESHOLDS,
    );
    expect(out.showContention).toBe(false);
    expect(out.severity).toBeNull();
  });

  test("PERMA: conjunctive N3>=7 AND Lon>=7 crosses strong", () => {
    const out = evaluateDistressThreshold(
      { N3: 7.5, Lon: 7.2 },
      PERMA_THRESHOLDS,
    );
    expect(out.showContention).toBe(true);
    expect(out.severity).toBe("strong");
  });

  test("PERMA: N3>=7 alone (Lon below) does NOT cross strong", () => {
    const out = evaluateDistressThreshold(
      { N3: 7.5, Lon: 4.0 },
      PERMA_THRESHOLDS,
    );
    expect(out.showContention).toBe(false);
  });

  test("PERMA: PERMA_total 4.2 crosses moderate (exclusive < 5.0)", () => {
    const out = evaluateDistressThreshold(
      { PERMA_total: 4.2, N_mean: 5.0 },
      PERMA_THRESHOLDS,
    );
    expect(out.showContention).toBe(true);
    expect(out.severity).toBe("moderate");
  });

  test("PERMA: strong takes precedence over moderate in severity", () => {
    const out = evaluateDistressThreshold(
      { N1: 9, PERMA_total: 4.0 },
      PERMA_THRESHOLDS,
    );
    expect(out.showContention).toBe(true);
    expect(out.severity).toBe("strong");
  });

  test("empty spec → never shows contention", () => {
    const out = evaluateDistressThreshold({ N1: 99 }, {});
    expect(out.showContention).toBe(false);
    expect(out.severity).toBeNull();
  });
});
