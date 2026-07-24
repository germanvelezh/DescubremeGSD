/**
 * Unit tests for `lib/i18n/microcopy/es-CO/instrument-labels.ts`.
 *
 * Guards [GAP-REPORT-INTERESES-MISLABEL]: the report title, the /me/data list
 * and the FREE-14 email must name each instrument's own category — never
 * "Intereses" for all four.
 */
import { describe, expect, test } from "vitest";

import {
  INSTRUMENT_CATEGORY_LABEL_FALLBACK,
  instrumentCategoryLabel,
} from "@/lib/i18n/microcopy/es-CO/instrument-labels";

describe("instrumentCategoryLabel: per-instrument report labels", () => {
  test("maps each of the 4 Free instruments to its Cowork-signed label", () => {
    expect(instrumentCategoryLabel("BFI-2-S")).toBe("Personalidad");
    expect(instrumentCategoryLabel("ONET-IP-SF")).toBe("Intereses");
    expect(instrumentCategoryLabel("TwIVI")).toBe("Valores");
    expect(instrumentCategoryLabel("PERMA-Profiler")).toBe("Bienestar");
  });

  test("keys by exact DB casing — mixed-case codes are not upshifted", () => {
    // [GAP-INSTRUMENT-CODE-CASING]: an upper-cased lookup must NOT resolve.
    expect(instrumentCategoryLabel("TWIVI")).toBe(
      INSTRUMENT_CATEGORY_LABEL_FALLBACK,
    );
    expect(instrumentCategoryLabel("PERMA-PROFILER")).toBe(
      INSTRUMENT_CATEGORY_LABEL_FALLBACK,
    );
  });

  test("falls back for unknown code, null and undefined (never throws)", () => {
    expect(instrumentCategoryLabel("UNKNOWN")).toBe(
      INSTRUMENT_CATEGORY_LABEL_FALLBACK,
    );
    expect(instrumentCategoryLabel(null)).toBe(
      INSTRUMENT_CATEGORY_LABEL_FALLBACK,
    );
    expect(instrumentCategoryLabel(undefined)).toBe(
      INSTRUMENT_CATEGORY_LABEL_FALLBACK,
    );
  });

  test("the mislabel regression: PERMA must never read 'Intereses'", () => {
    expect(instrumentCategoryLabel("PERMA-Profiler")).not.toBe("Intereses");
    expect(instrumentCategoryLabel("BFI-2-S")).not.toBe("Intereses");
    expect(instrumentCategoryLabel("TwIVI")).not.toBe("Intereses");
  });
});
