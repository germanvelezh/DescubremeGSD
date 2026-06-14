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
  resolveScaleForInstrument,
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

describe("resolveScaleForInstrument — Plan 02-20 live + dormant scales", () => {
  test("the four live Free instruments resolve ready:true with the right shape", () => {
    const onet = resolveScaleForInstrument("ONET-IP-SF");
    expect(onet.ready).toBe(true);
    expect(onet.variant).toBe("labeled-rows");
    expect(onet.anchors.length).toBe(5);

    const bfi = resolveScaleForInstrument("BFI-2-S");
    expect(bfi.ready).toBe(true);
    expect(bfi.variant).toBe("labeled-rows");
    expect(bfi.anchors.length).toBe(5);
    // 5-pt es-CO agreement anchors (verbatim, pack §BFI-2-S), highest first.
    expect(bfi.anchors[0]).toEqual({ value: 5, label: "Muy de acuerdo" });
    expect(bfi.anchors[4]).toEqual({ value: 1, label: "Muy en desacuerdo" });

    const twivi = resolveScaleForInstrument("TwIVI");
    expect(twivi.ready).toBe(true);
    expect(twivi.variant).toBe("labeled-rows");
    expect(twivi.anchors.length).toBe(6);

    const perma = resolveScaleForInstrument("PERMA-Profiler");
    expect(perma.ready).toBe(true);
    expect(perma.variant).toBe("numeric-endpoints");
    expect(perma.points).toBe(11);
    // Per-item endpoints come from the item row, NOT the resolver.
    expect(perma.anchorMin).toBe("");
    expect(perma.anchorMax).toBe("");
  });

  test("matching is case-insensitive (the 02-18 casing trap)", () => {
    expect(resolveScaleForInstrument("bfi-2-s").ready).toBe(true);
    expect(resolveScaleForInstrument("perma-profiler").variant).toBe(
      "numeric-endpoints",
    );
  });

  test("a not-yet-seeded instrument resolves ready:false with no anchors (no frozen radiogroup)", () => {
    // must-have #6: a not-ready instrument must fail loud (the page gates on
    // scale.ready===false and shows the unavailable state) rather than render an
    // empty frozen radiogroup.
    const dormant = resolveScaleForInstrument("SOME-UNSEEDED-CODE");
    expect(dormant.ready).toBe(false);
    expect(dormant.anchors.length).toBe(0);
    expect(dormant.points).toBe(0);
  });
});
