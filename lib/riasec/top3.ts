/**
 * Top-3 RIASEC computation helper (Plan 01-07 Task 3).
 *
 * Used by `/test/[code]/done/page.tsx` to compute a preliminary top-3
 * teaser for the signup screen ("Tu reporte esta listo"). The full
 * scoring + normalization lands in Plan 01-08; this is a raw-sum
 * preview that mirrors `lib/scoring/formulas/sum.ts` behavior.
 *
 * Anti-pattern note: this module deliberately does NOT load instrument
 * codes from constants — `computeRiasecTop3` takes a Map of dimension ->
 * raw_value sum already computed by the caller (which reads
 * `item_response` joined to `item.dimension`). The hardcoded literal
 * letters R/I/A/S/E/C are domain notation for RIASEC, not instrument
 * codes, so they do not violate FOUND-05.
 *
 * Anchors:
 *  - 01-CONTEXT.md D3.1 (top-3 RIASEC visual).
 *  - 01-RESEARCH.md §Gate 5 (O*NET IP-SF top-3 ordering).
 */

export type Top3Letter = "R" | "I" | "A" | "S" | "E" | "C";

export const RIASEC_LETTERS: readonly Top3Letter[] = [
  "R",
  "I",
  "A",
  "S",
  "E",
  "C",
] as const;

/**
 * Returns the top-3 RIASEC dimensions ordered by raw score descending.
 * Ties are broken by canonical RIASEC order (R > I > A > S > E > C) so
 * the output is deterministic given the same input.
 *
 * Throws if the input is missing any of the six dimensions — that
 * indicates an upstream scoring bug.
 */
export function computeRiasecTop3(
  scores: Record<Top3Letter, number>,
): [Top3Letter, Top3Letter, Top3Letter] {
  const ordered = [...RIASEC_LETTERS].sort((a, b) => {
    const da = scores[a];
    const db = scores[b];
    if (db !== da) return db - da;
    return RIASEC_LETTERS.indexOf(a) - RIASEC_LETTERS.indexOf(b);
  });
  return [ordered[0]!, ordered[1]!, ordered[2]!];
}
