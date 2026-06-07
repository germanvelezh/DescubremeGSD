/**
 * mean formula — pure scoring primitive.
 *
 * Average of raw_values across item_codes. Delegates the sum + reverse
 * handling to sumFormula and divides by `item_codes.length`. Reserved
 * primarily for Phase 2 PERMA Profiler (mean-of-3 per dominio) and any
 * future instrument that publishes mean instead of total.
 *
 * Anchors:
 *   - 01-RESEARCH.md linea 970-971.
 */
import { sumFormula } from "@/lib/scoring/formulas/sum";
import type { MeanFormula } from "@/lib/scoring/types";

export function meanFormula(
  formula: MeanFormula,
  responses: Map<string, number>,
): number {
  const total = sumFormula({ ...formula, type: "sum" }, responses);
  return total / formula.item_codes.length;
}
