/**
 * RIASEC display names (es-CO) + interest-congruence helpers (Phase 02.1 Wave 6).
 *
 * The occupational reveal micro-tag (pack §5) names the RIASEC letters an
 * occupation shares with the user's top-3 ("Encaja con tu lado Investigativo y
 * Convencional."). The letter→name map mirrors the hexagon labels
 * (HexagonoRiasecFull.tsx) so the user sees the SAME names on their hexagon and
 * on the occupation cards two sections below.
 *
 * `[GAP-MICROTAG-RIASEC-NAME]`: the pack §5 *illustrative* example writes
 * "Investigador" for I; the app (hexagon labels + this map) uses "Investigativo".
 * Kept app-consistent on purpose; flagged for Cowork to confirm the canonical
 * es-CO label.
 *
 * R/I/A/S/E/C are RIASEC domain notation, not instrument codes (FOUND-05 clean).
 * Recomputed at render (not threaded through the selector) so the tested
 * occupation-selector return type stays unchanged.
 *
 * Anchors:
 *  - implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md §5.
 *  - app/(b2c)/reporte/[sessionId]/_components/HexagonoRiasecFull.tsx (FULL_NAMES).
 */

export type RiasecLetter = "R" | "I" | "A" | "S" | "E" | "C";

const RIASEC_LETTERS: readonly RiasecLetter[] = ["R", "I", "A", "S", "E", "C"];

export const RIASEC_NAMES_ES_CO: Record<RiasecLetter, string> = {
  R: "Realista",
  I: "Investigativo",
  A: "Artistico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

function isRiasecLetter(v: string): v is RiasecLetter {
  return (RIASEC_LETTERS as readonly string[]).includes(v);
}

/**
 * The user's top-3 RIASEC letters that appear in an occupation's `riasec_code`,
 * in top-3 PRIORITY order (not code order), deduped + uppercased. Mirrors the
 * selector's `present` set but recomputed at render. Empty when none match — the
 * caller MUST then omit the micro-tag (never render "Encaja con tu lado .").
 */
export function matchedRiasecLetters(
  top3: string[],
  riasecCode: string,
): RiasecLetter[] {
  const code = riasecCode.toUpperCase();
  const seen = new Set<RiasecLetter>();
  const out: RiasecLetter[] = [];
  for (const raw of top3) {
    const u = raw.toUpperCase();
    if (isRiasecLetter(u) && !seen.has(u) && code.includes(u)) {
      seen.add(u);
      out.push(u);
    }
  }
  return out;
}

/**
 * es-CO enumeration join: ["X"]→"X"; ["X","Y"]→"X y Y"; ["X","Y","Z"]→"X, Y y Z".
 */
export function joinWithY(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0]!;
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}
