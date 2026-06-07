/**
 * Scoring interpreter — FOUND-04 plugin-as-data dispatch (Plan 01-08, Wave 5).
 *
 * Dispatcha por `formula.type` sobre los primitives de `lib/scoring/formulas/`.
 * NO contiene strings literales con codigos de instrumento — el lint gate
 * `tests/lint/no-hardcoded-instruments.test.ts` lo enforza (FOUND-05).
 *
 * Para un nuevo instrumento (BFI-2-S, PVQ-RR, etc.), el unico cambio es:
 *   1. Anadir un seed `db/seeds/instruments/<CODE>/scoring-rule.sql`.
 *   2. Llamar `score(formula, responses)` desde el route handler.
 *
 * Si el `formula.type` no es soportado, Zod parse falla — NO eval, NO
 * Function() (T-01-08-01 Tampering mitigation).
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 955-973 (verbatim).
 *   - 01-PATTERNS.md §1.10 LOCKED.
 */
import { meanFormula } from "@/lib/scoring/formulas/mean";
import { sumFormula } from "@/lib/scoring/formulas/sum";
import {
  ScoringFormulaSchema,
  type ScoringFormula,
} from "@/lib/scoring/types";

export { ScoringFormulaSchema };
export type { ScoringFormula };

/**
 * Compute a single scalar score for a (formula, responses) pair.
 *
 * @param formula  Parsed `ScoringFormula` (consume `ScoringFormulaSchema.parse`
 *                 if input came from a DB jsonb to enforce shape).
 * @param responses Map of item_code -> raw_value.
 * @returns scalar score (sum or mean depending on formula.type).
 */
export function score(
  formula: ScoringFormula,
  responses: Map<string, number>,
): number {
  switch (formula.type) {
    case "sum":
      return sumFormula(formula, responses);
    case "mean":
      return meanFormula(formula, responses);
  }
}
