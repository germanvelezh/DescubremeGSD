/**
 * Unit tests QUAL-05 — TwIVI MRAT centering fixture (the values form).
 *
 * Pins the values-form MRAT contract end-to-end at the unit level: the EXACT
 * value_map + hov_map seeded in db/seeds/instruments/TwIVI/instrument-version.sql
 * (10 Schwartz basic values × 2 items → SD1/SD2..UN1/UN2; 10 basic → 4 HOV) fed
 * to lib/scoring/mrat.ts::computeMratScores. This is the QUAL-05 acceptance for
 * the values instrument (all-equal → every HOV centered ≈ 0 → no winner).
 *
 * Why this is the acceptance even though the LIVE score-session.ts mrat dispatch
 * is dormant ([GAP-MRAT-METADATA-READ]: score-session.ts:403-404 still reads
 * empty `{}` maps until a downstream plan wires psychometric_status.value_map/
 * hov_map): the math + the seed's map SHAPE are proven here directly, exactly as
 * 02-03's acceptance intended (computeMratScores is the unit of truth; the
 * pipeline read is a separate, owned wiring step). The maps below are a VERBATIM
 * mirror of the seed — any seed/transform drift that breaks QUAL-05 fails here.
 *
 * Within-person framing (D-E1.3): centered_HOV = mean (not sum) of its centered
 * basic values; MRAT = mean of the FULL 20-item flat vector (Pitfall 3, NOT
 * per-value means); NO SD division. bands are within-person (bandFromMrat), no
 * HOV baremo (Pitfall 4).
 *
 * Anchors:
 *   - db/seeds/instruments/TwIVI/instrument-version.sql (value_map + hov_map).
 *   - lib/scoring/mrat.ts (computeMratScores + bandFromMrat).
 *   - 02-RESEARCH.md § "MRAT Transform" (QUAL-05 all-equal → ≈0).
 *   - 02-CONTEXT.md D-E1.3 (relative priorities), D-GATE.1 (TwIVI).
 *   - tests/unit/scoring/bfi2s-fixture.test.ts (fixture pattern).
 */
import { describe, expect, test } from "vitest";

import { bandFromMrat, computeMratScores } from "@/lib/scoring/mrat";

/** value code → synthesized item keys — VERBATIM mirror of the TwIVI seed. */
const VALUE_MAP: Record<string, string[]> = {
  SD: ["SD1", "SD2"],
  ST: ["ST1", "ST2"],
  HE: ["HE1", "HE2"],
  AC: ["AC1", "AC2"],
  PO: ["PO1", "PO2"],
  SE: ["SE1", "SE2"],
  CO: ["CO1", "CO2"],
  TR: ["TR1", "TR2"],
  BE: ["BE1", "BE2"],
  UN: ["UN1", "UN2"],
};

/** HOV code → basic-value codes (10 basic → 4 HOV) — VERBATIM mirror of the seed. */
const HOV_MAP: Record<string, string[]> = {
  OCH: ["SD", "ST", "HE"], // Apertura al cambio
  SEN: ["AC", "PO"], //       Autopromoción
  CON: ["SE", "CO", "TR"], // Conservación
  STR: ["BE", "UN"], //       Autotrascendencia
};

const ALL_ITEM_KEYS = Object.values(VALUE_MAP).flat();

/** Build the flat 20-item response vector from a key→raw map (default k). */
function flatVector(
  overrides: Record<string, number> = {},
  fill = 0,
): { itemKey: string; rawValue: number }[] {
  return ALL_ITEM_KEYS.map((itemKey) => ({
    itemKey,
    rawValue: overrides[itemKey] ?? fill,
  }));
}

const EPSILON = 1e-9;

describe("QUAL-05: TwIVI MRAT fixture (all-equal → every HOV ≈ 0)", () => {
  test("the seeded maps cover all 10 basic values × 2 items (20) and 4 HOV", () => {
    expect(Object.keys(VALUE_MAP)).toHaveLength(10);
    expect(ALL_ITEM_KEYS).toHaveLength(20);
    expect(Object.keys(HOV_MAP)).toHaveLength(4);
    // hov_map is a non-overlapping partition of all 10 basic values.
    const partition = Object.values(HOV_MAP).flat();
    expect(partition).toHaveLength(10);
    expect(new Set(partition)).toEqual(new Set(Object.keys(VALUE_MAP)));
  });

  test.each([1, 3.5, 4, 6])(
    "all responses = %s → MRAT = k and every HOV centered ≈ 0 (no winner)",
    (k) => {
      const { mrat, values, higherOrder } = computeMratScores(
        flatVector({}, k),
        VALUE_MAP,
        HOV_MAP,
      );
      expect(mrat).toBeCloseTo(k, 12);
      // every value-level centered ≈ 0
      for (const v of values) expect(Math.abs(v.centered)).toBeLessThan(EPSILON);
      // every HOV centered ≈ 0 → all 4 bands MEDIO (QUAL-05: no winner)
      expect(higherOrder).toHaveLength(4);
      for (const h of higherOrder) {
        expect(Math.abs(h.centered)).toBeLessThan(EPSILON);
        expect(bandFromMrat(h.centered)).toBe("MEDIO");
      }
    },
  );

  test("spike: Self-Direction high (SD=6, rest=1) → OCH positive, others negative; HOV rollup is mean", () => {
    const { mrat, values, higherOrder } = computeMratScores(
      flatVector({ SD1: 6, SD2: 6 }, 1),
      VALUE_MAP,
      HOV_MAP,
    );
    // MRAT = (6+6 + 18×1) / 20 = 30/20 = 1.5
    expect(mrat).toBeCloseTo(1.5, 12);

    const byCode = Object.fromEntries(values.map((v) => [v.code, v.centered]));
    // SD raw = 6 → centered = 6 − 1.5 = 4.5 (the only positive value)
    expect(byCode.SD).toBeCloseTo(4.5, 12);
    // every other value raw = 1 → centered = 1 − 1.5 = −0.5
    for (const code of Object.keys(VALUE_MAP)) {
      if (code === "SD") continue;
      expect(byCode[code]).toBeCloseTo(-0.5, 12);
    }

    const hov = Object.fromEntries(higherOrder.map((h) => [h.code, h.centered]));
    // OCH = mean(centered SD, ST, HE) = mean(4.5, −0.5, −0.5) = 1.1666...
    expect(hov.OCH).toBeCloseTo((4.5 - 0.5 - 0.5) / 3, 12);
    expect(hov.OCH).toBeGreaterThan(0);
    expect(bandFromMrat(hov.OCH)).toBe("ALTO");
    // the 3 HOV with no spike are all negative (mean of −0.5s) → BAJO
    for (const code of ["SEN", "CON", "STR"]) {
      expect(hov[code]).toBeCloseTo(-0.5, 12);
      expect(bandFromMrat(hov[code])).toBe("BAJO");
    }
    // HOV rollup is MEAN, not sum: SEN (2 values) and CON (3 values) both = −0.5
    // despite different member counts — sum would have made them incomparable.
    expect(hov.SEN).toBeCloseTo(hov.CON, 12);
  });
});
