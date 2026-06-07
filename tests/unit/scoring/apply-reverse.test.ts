/**
 * Unit tests QUAL-04 — applyReverse helper.
 *
 * applyReverse(raw, min, max) = (max + min) - raw.
 *
 * Phase 1 establece el helper unico para reverse keying (PITFALL 9 evita
 * el bug clasico `5 - raw` que rompe escalas no-Likert-5). O*NET IP-SF no
 * tiene items inversos (Pack §4), pero el helper queda construido y
 * cubierto por tests para Phase 2 (BFI-2-S con reverse_keyed items).
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 975-979 (apply-reverse contract).
 *   - 01-PATTERNS.md row 4 LOCKED (helper unico).
 *   - implementation_packs/O-NET-IP-SF §4 (reverse=false all).
 */
import { describe, expect, test } from "vitest";

import { applyReverse } from "@/lib/scoring/apply-reverse";

describe("QUAL-04: applyReverse(raw, min, max)", () => {
  test("Likert 1-5: applyReverse(1, 1, 5) === 5", () => {
    expect(applyReverse(1, 1, 5)).toBe(5);
  });

  test("Likert 1-5: applyReverse(3, 1, 5) === 3 (midpoint invariant)", () => {
    expect(applyReverse(3, 1, 5)).toBe(3);
  });

  test("Likert 1-5: applyReverse(5, 1, 5) === 1", () => {
    expect(applyReverse(5, 1, 5)).toBe(1);
  });

  test("Likert 0-4 (Rounds 2010 native): applyReverse(0, 0, 4) === 4", () => {
    expect(applyReverse(0, 0, 4)).toBe(4);
  });

  test("Likert 0-4: applyReverse(4, 0, 4) === 0", () => {
    expect(applyReverse(4, 0, 4)).toBe(0);
  });

  test("throws when raw is below scale min", () => {
    expect(() => applyReverse(0, 1, 5)).toThrow(/out of range/i);
  });

  test("throws when raw is above scale max", () => {
    expect(() => applyReverse(6, 1, 5)).toThrow(/out of range/i);
  });

  test("throws when min >= max (invalid scale)", () => {
    expect(() => applyReverse(3, 5, 1)).toThrow(/invalid scale/i);
  });
});
