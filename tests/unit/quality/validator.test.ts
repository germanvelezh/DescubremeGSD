/**
 * Unit tests QUAL-07 — quality validator (3 baseline detectors).
 *
 * Detectores Phase 1 (RESEARCH lineas 1782-1796):
 *   (a) Patron unico: stdev(rawValues) < 0.5 con N >= 5 items → severity 'flag'.
 *   (b) Tiempo atipico: mediana respuesta < 0.8s/item o > 5min/item → severity 'warn'.
 *   (c) IMC items: no aplican a O*NET IP-SF (Pack no incluye); placeholder.
 *
 * Severity ordering: ok < warn < flag < block. Phase 1 emite 'flag' / 'warn'
 * (informativo); 'block' reservado para futuros instrumentos con detector
 * mas estricto (Phase 2+ BFI-2-S y PANAS).
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1782-1796 (Pitfall 11).
 *   - 01-PATTERNS.md §2.3 (lib/quality/validator).
 *   - PLAN.md §<acceptance_criteria>.
 */
import { describe, expect, test } from "vitest";

import { validateQuality } from "@/lib/quality/validator";

describe("QUAL-07: quality validator", () => {
  test("baseline OK: varied responses + normal timing → severity 'ok'", () => {
    const responses = [
      { rawValue: 1 },
      { rawValue: 3 },
      { rawValue: 5 },
      { rawValue: 2 },
      { rawValue: 4 },
      { rawValue: 3 },
    ];
    const result = validateQuality(responses, {
      startedAt: new Date("2026-06-07T10:00:00Z"),
      completedAt: new Date("2026-06-07T10:10:00Z"), // 600s / 6 items = 100s/item
    });
    expect(result.severity).toBe("ok");
    expect(result.signals).toEqual([]);
  });

  test("patron unico: all same response with N>=5 → 'flag'", () => {
    const responses = Array.from({ length: 10 }, () => ({ rawValue: 3 }));
    const result = validateQuality(responses, {
      startedAt: new Date("2026-06-07T10:00:00Z"),
      completedAt: new Date("2026-06-07T10:10:00Z"),
    });
    expect(result.severity).toBe("flag");
    expect(result.signals).toContain("single_pattern");
  });

  test("low variance (stdev<0.5) with N>=5 → 'flag'", () => {
    // mean=3, deviations all ±0 except one item; stdev <0.5.
    const responses = [
      { rawValue: 3 },
      { rawValue: 3 },
      { rawValue: 3 },
      { rawValue: 3 },
      { rawValue: 3 },
      { rawValue: 3 },
      { rawValue: 4 },
    ];
    const result = validateQuality(responses, {
      startedAt: new Date("2026-06-07T10:00:00Z"),
      completedAt: new Date("2026-06-07T10:10:00Z"),
    });
    expect(result.severity).toBe("flag");
    expect(result.signals).toContain("single_pattern");
  });

  test("tiempo atipico (mediana < 0.8s/item) → 'warn'", () => {
    const responses = Array.from({ length: 10 }, () => ({ rawValue: 3 }));
    const result = validateQuality(responses, {
      startedAt: new Date("2026-06-07T10:00:00Z"),
      // 10 items in 5 seconds = 0.5s/item.
      completedAt: new Date("2026-06-07T10:00:05Z"),
    });
    // Single-pattern dominates (flag), but signals still include speeding.
    expect(result.signals).toContain("atypical_timing");
  });

  test("tiempo atipico (mediana > 5min/item) → 'warn'", () => {
    const responses = [
      { rawValue: 1 },
      { rawValue: 3 },
      { rawValue: 5 },
      { rawValue: 2 },
      { rawValue: 4 },
      { rawValue: 3 },
    ];
    const start = new Date("2026-06-07T10:00:00Z");
    // 6 items in 60 min = 600s/item > 300s.
    const end = new Date("2026-06-07T11:00:00Z");
    const result = validateQuality(responses, {
      startedAt: start,
      completedAt: end,
    });
    expect(result.severity).toBe("warn");
    expect(result.signals).toContain("atypical_timing");
  });

  test("N<5 responses: single-pattern detector skipped (insufficient data)", () => {
    const responses = [{ rawValue: 3 }, { rawValue: 3 }, { rawValue: 3 }];
    const result = validateQuality(responses, {
      startedAt: new Date("2026-06-07T10:00:00Z"),
      completedAt: new Date("2026-06-07T10:05:00Z"),
    });
    expect(result.signals).not.toContain("single_pattern");
  });
});
