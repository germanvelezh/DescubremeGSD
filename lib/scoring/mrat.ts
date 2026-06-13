/**
 * MRAT centering transform — D-E1.3, QUAL-05 (Plan 02-03, Wave 2).
 *
 * Within-person centering for the Schwartz values family. For respondent i:
 *   MRAT_i  = (1/n) · Σ r_{i,k}   over ALL n administered items (the FULL flat
 *             item vector — NOT per-facet means, NOT HOV rollups).
 *   raw_v   = mean of the items belonging to value v.
 *   centered_v = raw_v − MRAT_i   (NO division by SD — the key divergence from
 *             `ipsative.ts`, whose Method-C z-score divides by intra-profile SD.
 *             The individual SD is substantive signal here; standardizing it
 *             would erase it. Pack §4 explicitly rejects reusing ipsative.ts.)
 *   centered_HOV = mean (NOT sum) of the centered values it aggregates.
 *
 * The report presents HOV scores as RELATIVE PRIORITIES ("qué pesa más para
 * vos"), never absolute means nor inter-person comparison (no scalar
 * invariance). The visual bands WITHIN-PERSON — sign/magnitude of each HOV's
 * centered score relative to the person's own MRAT (their "0") — NOT against a
 * population baremo (no HOV-level baremo exists; pack §3.0.5).
 *
 * QUAL-05 edge case (degenerate guard, analogous to ipsative.ts:57 `sd === 0`):
 * all rawValues == k → MRAT == k → every centered == 0. The transform is
 * form-agnostic: TwIVI (n=20) ↔ full PVQ-RR (n=57) is a seed swap, not a code
 * change (locked CONTEXT D-GATE.1 / D-E1.3).
 *
 * O-1 reconciliation: REQUIREMENTS QUAL-05 wording
 * `scoring_rule.requires_mrat_centering=true` is SATISFIED by the cleaner
 * profile-level `instrument_version.centering_strategy='mrat'`. The
 * all-equal→≈0 acceptance test maps identically either way.
 *
 * Anchors:
 *   - PVQ-RR Implementation Acquisition Pack v1.0 §3.0.1-§3.0.5, §4 (Opcion A).
 *   - 02-RESEARCH.md § "MRAT Transform"; 02-PATTERNS.md § "lib/scoring/mrat.ts".
 *   - 02-CONTEXT.md D-E1.3 (transform NUEVO, NO ipsative), D-E1.1 (bandas).
 *   - REQUIREMENTS QUAL-05 (all-equal → centered ≈ 0).
 */

export type MratBand = "BAJO" | "MEDIO" | "ALTO";

export interface MratScore {
  /** Value or HOV code (generic; real codes are seed content, FOUND-05). */
  code: string;
  /** raw_v − MRAT (value level) or mean of centered values (HOV level). */
  centered: number;
}

export interface MratResult {
  /** Mean of ALL administered raw item values (the centering origin). */
  mrat: number;
  /** Centered score per value code. */
  values: MratScore[];
  /** Centered score per higher-order value (HOV) code. */
  higherOrder: MratScore[];
}

/** Mean of a numeric array; 0 for an empty array (degenerate guard). */
function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((acc, x) => acc + x, 0) / xs.length;
}

/**
 * Compute MRAT-centered value and HOV scores from the flat item vector.
 *
 * @param rawResponses  ALL administered items as `{ itemKey, rawValue }`. The
 *                      MRAT denominator is this full vector (Pitfall 3: never
 *                      compute MRAT from facet/HOV scores).
 * @param valueMap      value code → the item keys that average into it.
 * @param hovMap        HOV code → the value codes it rolls up (mean, not sum).
 * @returns `{ mrat, values, higherOrder }`; all-equal input → every centered 0.
 */
export function computeMratScores(
  rawResponses: { itemKey: string; rawValue: number }[],
  valueMap: Record<string, string[]>,
  hovMap: Record<string, string[]>,
): MratResult {
  // MRAT = mean of the FULL administered item vector (NOT per-value means).
  const mrat = mean(rawResponses.map((r) => r.rawValue));

  const rawByKey = new Map<string, number>();
  for (const r of rawResponses) {
    rawByKey.set(r.itemKey, r.rawValue);
  }

  // value level: raw_v = mean(items of v); centered_v = raw_v − MRAT (NO /SD).
  const centeredByValue = new Map<string, number>();
  const values: MratScore[] = [];
  for (const [code, itemKeys] of Object.entries(valueMap)) {
    const itemValues = itemKeys
      .map((k) => rawByKey.get(k))
      .filter((v): v is number => v !== undefined);
    const centered = mean(itemValues) - mrat;
    centeredByValue.set(code, centered);
    values.push({ code, centered });
  }

  // HOV level: centered_HOV = MEAN (not sum) of its centered values.
  const higherOrder: MratScore[] = [];
  for (const [code, valueCodes] of Object.entries(hovMap)) {
    const memberCentered = valueCodes
      .map((vc) => centeredByValue.get(vc))
      .filter((v): v is number => v !== undefined);
    higherOrder.push({ code, centered: mean(memberCentered) });
  }

  return { mrat, values, higherOrder };
}

/**
 * Within-person band from a centered score — sign/magnitude relative to the
 * person's own MRAT (their "0"), NOT a population baremo (Pitfall 4: no HOV
 * baremo exists). Positive ⇒ priority above own average; near-zero ⇒ neutral
 * (QUAL-05 all-equal → MEDIO); negative ⇒ below own average.
 *
 * Threshold is a small float epsilon so the all-equal degenerate case lands on
 * MEDIO rather than flickering ALTO/BAJO on floating-point noise.
 */
export function bandFromMrat(centered: number, epsilon = 1e-9): MratBand {
  if (centered > epsilon) return "ALTO";
  if (centered < -epsilon) return "BAJO";
  return "MEDIO";
}
