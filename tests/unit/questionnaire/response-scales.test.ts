/**
 * Unit tests for lib/questionnaire/response-scales.ts — Phase 1 Wave 3 (Plan 01-06).
 *
 * Covers Tasks 2 behavior Test 6:
 *   - response-scales.ts exports 5 anchors with text verbatim from UI-SPEC §6.4.
 *   - SHA-256 fingerprint stable across runs.
 *
 * Source-of-truth note: plan referenced `RESPONSE_ANCHORS_es-CO_v1.0.md` but
 * that file covers FS/BFI/PERMA, not O*NET. Canonical O*NET anchors live in
 * 01-UI-SPEC.md §6.4 lines 276-280. Test asserts those 5 strings verbatim.
 */
import { describe, expect, test } from "vitest";

import {
  ANCHORS_SHA256_FINGERPRINT,
  ONET_LIKERT_ANCHORS_ES_CO,
} from "@/lib/questionnaire/response-scales";

describe("lib/questionnaire/response-scales.ts — O*NET es-CO anchors", () => {
  test("exports exactly 5 anchors with verbatim UI-SPEC §6.4 strings", () => {
    expect(ONET_LIKERT_ANCHORS_ES_CO.length).toBe(5);
    const map = new Map<number, string>();
    for (const a of ONET_LIKERT_ANCHORS_ES_CO) map.set(a.value, a.label);
    // Verbatim from 01-UI-SPEC.md §6.4 lines 276-280.
    expect(map.get(5)).toBe("Me gustaria mucho hacerlo");
    expect(map.get(4)).toBe("Me gustaria hacerlo");
    expect(map.get(3)).toBe("No estoy seguro");
    expect(map.get(2)).toBe("No me gustaria hacerlo");
    expect(map.get(1)).toBe("No me gustaria nada hacerlo");
  });

  test("values cover 1..5 with no duplicates", () => {
    const values = ONET_LIKERT_ANCHORS_ES_CO.map((a) => a.value).sort();
    expect(values).toEqual([1, 2, 3, 4, 5]);
  });

  test("SHA-256 fingerprint is non-empty 64-char hex (stable across runs)", () => {
    expect(ANCHORS_SHA256_FINGERPRINT).toMatch(/^[a-f0-9]{64}$/);
  });

  test("anchors are ordered highest-to-lowest preference (UX-04 mobile layout)", () => {
    const values = ONET_LIKERT_ANCHORS_ES_CO.map((a) => a.value);
    expect(values).toEqual([5, 4, 3, 2, 1]);
  });
});
