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

// ---------------------------------------------------------------------------
// Scale-shape resolver — Plan 02-07 Task 3.
//
// The runner page must NOT name instruments (FOUND-05) nor hardcode anchors. It
// loads the instrument metadata and asks this resolver for the scale shape. The
// shape carries everything ItemForm needs: variant + (anchors | numeric points
// with per-item endpoint anchors).
//
// This file is the ONE place allowed to bridge an instrument code to its anchor
// set — `response-scales.ts` is excluded from the FOUND-05 lint precisely
// because anchors are scale data that live separately from the logic that
// references them. The bridge is intentionally minimal: only O*NET is seeded +
// live today. BFI-2-S / values (TwIVI) / PERMA resolve to a `pending` shape and
// stay DORMANT until 02-13 seeds their items + anchors (and, ideally, a
// `response_scale_code` column so this bridge can be dropped). We deliberately do
// NOT key anchors by likert range: BFI-2-S is also 1-5 but uses agreement
// anchors, not O*NET's preference anchors — keying by range would silently
// mis-anchor a later slice.
// ---------------------------------------------------------------------------

export type ScaleVariant = "labeled-rows" | "numeric-endpoints";

export interface ResolvedScale {
  variant: ScaleVariant;
  /** Labeled-rows anchors (empty when not yet seeded). */
  anchors: readonly LikertAnchor[];
  /** Numeric-endpoints button count (0 for labeled-rows). */
  points: number;
  /** Per-item endpoint anchors for numeric-endpoints (empty until seeded). */
  anchorMin: string;
  anchorMax: string;
  /** False when the instrument's items/anchors are not yet seeded (dormant). */
  ready: boolean;
}

const PENDING_SCALE: ResolvedScale = {
  variant: "labeled-rows",
  anchors: [],
  points: 0,
  anchorMin: "",
  anchorMax: "",
  ready: false,
};

/**
 * Canonical 5-point BFI-2-S es-CO AGREEMENT anchors (NOT O*NET's preference
 * anchors). Source: RESPONSE_ANCHORS_es-CO_v1.0.md §BFI-2-S, confirmed verbatim
 * against the official es form (Gallardo-Pujol et al., 2022 / OSF kp572).
 * Order: highest agreement first (value=5) -> lowest (value=1), matching the
 * O*NET ordering convention and the top-to-bottom mobile read.
 */
const BFI_LIKERT_ANCHORS_ES_CO: readonly LikertAnchor[] = [
  { value: 5, label: "Muy de acuerdo" },
  { value: 4, label: "Algo de acuerdo" },
  { value: 3, label: "Neutral, sin opinión" },
  { value: 2, label: "Algo en desacuerdo" },
  { value: 1, label: "Muy en desacuerdo" },
] as const;

/**
 * TwIVI 6-point PLACEHOLDER anchors ([GAP-TWIVI-ITEMS-ANCHORS-ES-CO]). The final
 * es-CO labels are Cowork-owned; these clearly-labeled placeholders make the
 * 6-point labeled-rows MACHINERY testable end-to-end. Swapping them for the real
 * labels is a data change, not a code change. Order: value=6 -> value=1.
 */
const TWIVI_PLACEHOLDER_ANCHORS_ES_CO: readonly LikertAnchor[] = [
  { value: 6, label: "[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto 6 (placeholder)" },
  { value: 5, label: "[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto 5 (placeholder)" },
  { value: 4, label: "[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto 4 (placeholder)" },
  { value: 3, label: "[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto 3 (placeholder)" },
  { value: 2, label: "[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto 2 (placeholder)" },
  { value: 1, label: "[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto 1 (placeholder)" },
] as const;

/**
 * Resolves the scale shape for an instrument by its code. Four instruments are
 * LIVE today: O*NET (5-pt preference), BFI-2-S (5-pt agreement), TwIVI (6-pt
 * placeholder labeled-rows), PERMA-Profiler (0-10 numeric-endpoints). Any other
 * code is dormant (`ready=false`) and the runner shows an unavailable state
 * (never an empty frozen radiogroup).
 *
 * The code is uppercased here, so every comparison is against the EXACT
 * uppercased seed code (casing was the 02-18 trap — a mismatch silently returns
 * PENDING_SCALE and the freeze persists).
 *
 * PERMA's per-item endpoint anchors (anchorMin/anchorMax vary by block) are NOT
 * resolved here — they are per-item, read from the item row (anchor_min/anchor_max,
 * migration 015) by the runner. The resolver leaves them EMPTY for PERMA.
 */
export function resolveScaleForInstrument(code: string): ResolvedScale {
  const upper = code.toUpperCase();
  if (upper === "ONET-IP-SF") {
    return {
      variant: "labeled-rows",
      anchors: ONET_LIKERT_ANCHORS_ES_CO,
      points: 0,
      anchorMin: "",
      anchorMax: "",
      ready: true,
    };
  }
  if (upper === "BFI-2-S") {
    return {
      variant: "labeled-rows",
      anchors: BFI_LIKERT_ANCHORS_ES_CO,
      points: 0,
      anchorMin: "",
      anchorMax: "",
      ready: true,
    };
  }
  if (upper === "TWIVI") {
    return {
      variant: "labeled-rows",
      anchors: TWIVI_PLACEHOLDER_ANCHORS_ES_CO,
      points: 0,
      anchorMin: "",
      anchorMax: "",
      ready: true,
    };
  }
  if (upper === "PERMA-PROFILER") {
    return {
      variant: "numeric-endpoints",
      anchors: [],
      points: 11,
      // Per-item endpoints come from the item row (anchor_min/anchor_max), NOT
      // from here — they vary by block (pack §1.3). Resolver-level stays empty.
      anchorMin: "",
      anchorMax: "",
      ready: true,
    };
  }
  return PENDING_SCALE;
}
