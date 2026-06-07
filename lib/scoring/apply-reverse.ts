/**
 * applyReverse — single canonical reverse-keying helper (QUAL-04).
 *
 * Reverses a Likert raw value within a known [min, max] scale:
 *   applyReverse(raw, min, max) = (max + min) - raw.
 *
 * Lockeado como helper UNICO en `lib/scoring/` (PATTERNS row 4). Plan 01-08
 * lo construye y cubre con tests; el O*NET IP-SF no tiene items inversos
 * (Pack §4) pero Phase 2 (BFI-2-S, PVQ-RR) consume este helper.
 *
 * Pitfall 9 (RESEARCH §1776-1778): NO usar el patron `5 - raw` directamente,
 * porque hardcodea Likert 1-5 y rompe con escalas 0-4 (Rounds 2010 native)
 * o 1-6 (BFI-2). El (max + min) - raw es invariante de escala.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 975-979 (verbatim contract).
 *   - 01-PATTERNS.md §1.10.
 */

export function applyReverse(raw: number, min: number, max: number): number {
  if (min >= max) {
    throw new RangeError(
      `applyReverse: invalid scale [${min}, ${max}] — min must be < max`,
    );
  }
  if (raw < min || raw > max) {
    throw new RangeError(
      `applyReverse: raw=${raw} out of range [${min}, ${max}]`,
    );
  }
  return max + min - raw;
}
