/**
 * Unit tests QUAL-01 — psychometric_status helper.
 *
 * `psychometricStatusFromInstrumentVersion(iv)` parses the
 * `instrument_version.psychometric_status` jsonb column into a typed
 * shape the report assembler uses to (a) decide percentile gating and
 * (b) populate the ficha tecnica.
 *
 * The jsonb shape (verbatim from db/seeds/instruments/ONET-IP-SF):
 *   { alpha_by_dimension: { R: 0.81, I: 0.82, ... }, source: 'INTL_Rounds_2010', latam_status: 'pending' }
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.8 + D3.10.
 *   - PLAN.md §<behavior> Test 5.
 */
import { describe, expect, test } from "vitest";

import { psychometricStatusFromInstrumentVersion } from "@/lib/report/assembler";

describe("QUAL-01: psychometricStatusFromInstrumentVersion", () => {
  test("parses canonical shape with all fields", () => {
    const result = psychometricStatusFromInstrumentVersion({
      psychometric_status: {
        alpha_by_dimension: { R: 0.81, I: 0.82, A: 0.84, S: 0.83, E: 0.78, C: 0.79 },
        source: "INTL_Rounds_2010",
        latam_status: "pending",
      },
    });
    expect(result.alpha_by_dimension).toEqual({
      R: 0.81,
      I: 0.82,
      A: 0.84,
      S: 0.83,
      E: 0.78,
      C: 0.79,
    });
    expect(result.source).toBe("INTL_Rounds_2010");
    expect(result.latam_status).toBe("pending");
  });

  test("defaults to pending + empty alpha when psychometric_status is null", () => {
    const result = psychometricStatusFromInstrumentVersion({
      psychometric_status: null,
    });
    expect(result.alpha_by_dimension).toEqual({});
    expect(result.latam_status).toBe("pending");
    expect(result.source).toBeNull();
  });

  test("treats unknown latam_status as pending (conservative gate)", () => {
    const result = psychometricStatusFromInstrumentVersion({
      psychometric_status: { latam_status: "weird_value" },
    });
    expect(result.latam_status).toBe("pending");
  });

  test("computes avg_alpha across dimensions", () => {
    const result = psychometricStatusFromInstrumentVersion({
      psychometric_status: {
        alpha_by_dimension: { R: 0.8, I: 0.9 },
      },
    });
    expect(result.avg_alpha).toBeCloseTo(0.85, 5);
  });

  test("avg_alpha is null when no dimensions present", () => {
    const result = psychometricStatusFromInstrumentVersion({
      psychometric_status: { alpha_by_dimension: {} },
    });
    expect(result.avg_alpha).toBeNull();
  });
});
