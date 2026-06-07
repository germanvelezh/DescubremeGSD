/**
 * Likert anchors es-CO for O*NET Interest Profiler SF — Phase 1 Wave 3 (Plan 01-06).
 *
 * 5-point preference scale, value 1 = "No me gustaria nada hacerlo",
 * value 5 = "Me gustaria mucho hacerlo". These five strings are the
 * canonical anchors rendered by `ItemForm` (UI-SPEC §6.4 lines 276-280).
 *
 * Source-of-truth note (DEVIATION from plan):
 *   The plan instruction read "verbatim de RESPONSE_ANCHORS_es-CO_v1.0.md",
 *   but that addendum covers Flourishing + BFI-2-S + PERMA-Profiler only —
 *   it does NOT define O*NET anchors. The canonical O*NET es-CO anchors
 *   for Phase 1 live in `01-UI-SPEC.md §6.4` lines 276-280, copied verbatim
 *   below. Cowork carry-over (`[GAP-ONET-ANCHORS-SOURCE]`): produce a
 *   dedicated `RESPONSE_ANCHORS_es-CO_v1.0.md` O*NET section so this
 *   constant can be regenerated from a Cowork-owned source.
 *
 * D2 decision (UI-SPEC §9.8): visual scale is 1-5 (Likert) but the
 * instrument-version table stores `likert_min=1, likert_max=5`. The
 * 0-4 mapping from the original Rounds 2010 paper is preserved in the
 * `value` field (5 = "Strongly like" = Rounds 4; 1 = "Strongly dislike"
 * = Rounds 0). Scoring engine (Plan 01-08) handles the 1->0 shift.
 *
 * SHA-256 fingerprint is computed in TS from the exact tuple of label
 * strings below. CI lint can recompute and compare to detect drift.
 *
 * Anchors:
 * - 01-UI-SPEC.md §6.4 lines 276-280, §10 (microcopy source-of-truth).
 * - 01-RESEARCH.md "5. Plugin enforcement domain".
 */
import { createHash } from "node:crypto";

export interface LikertAnchor {
  /** Numeric value persisted to `item_response.raw_value`. */
  value: number;
  /** es-CO label shown to the user (UI-SPEC §6.4 verbatim). */
  label: string;
}

/**
 * Canonical 5-point Likert anchors for O*NET IP-SF es-CO.
 *
 * Order: highest preference first (value=5) -> lowest (value=1). This
 * matches the mobile layout in UI-SPEC §7.3 lines 542-546 and the order
 * a user reads top-to-bottom.
 */
export const ONET_LIKERT_ANCHORS_ES_CO: readonly LikertAnchor[] = [
  { value: 5, label: "Me gustaria mucho hacerlo" },
  { value: 4, label: "Me gustaria hacerlo" },
  { value: 3, label: "No estoy seguro" },
  { value: 2, label: "No me gustaria hacerlo" },
  { value: 1, label: "No me gustaria nada hacerlo" },
] as const;

/**
 * SHA-256 fingerprint of the anchor labels (joined by `\n`). Computed
 * once at module load. Used by CI lint to assert the anchors have not
 * drifted from their committed values across plans.
 */
export const ANCHORS_SHA256_FINGERPRINT: string = createHash("sha256")
  .update(ONET_LIKERT_ANCHORS_ES_CO.map((a) => `${a.value}:${a.label}`).join("\n"))
  .digest("hex");
