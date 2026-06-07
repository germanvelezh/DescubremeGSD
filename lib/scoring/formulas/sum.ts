/**
 * sum formula — pure scoring primitive.
 *
 * Sums raw_values across item_codes. Items listed in reverse_keyed get
 * `(max+min)-raw` applied first (QUAL-04). Missing responses throw a
 * deterministic error — NO silent zero-fill (RESEARCH §1772-1774 pitfall 8).
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 961-973.
 *   - implementation_packs/O-NET-IP-SF §3 (sum-per-dimension).
 */
import { applyReverse } from "@/lib/scoring/apply-reverse";
import type { SumFormula } from "@/lib/scoring/types";

export function sumFormula(
  formula: SumFormula,
  responses: Map<string, number>,
): number {
  const reverseSet = new Set(formula.reverse_keyed);
  return formula.item_codes.reduce((acc, code) => {
    const raw = responses.get(code);
    if (raw === undefined) {
      throw new Error(`Missing response: ${code}`);
    }
    const value = reverseSet.has(code)
      ? applyReverse(raw, formula.scale[0], formula.scale[1])
      : raw;
    return acc + value;
  }, 0);
}
