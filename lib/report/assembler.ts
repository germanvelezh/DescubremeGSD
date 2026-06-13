/**
 * Report assembler — composes the 3-layer report payload from persisted
 * `report_snapshot.html_payload` (written by POST /api/score) plus
 * runtime-loaded narrative + occupations.
 *
 * Phase 1 Wave 6 (Plan 01-09).
 *
 * Layers (UI-SPEC §7.6, CONTEXT D3.5):
 *   - Layer 1: hexagono data, top-3, frase reveladora (1-2 lines).
 *   - Layer 2: scores + bands + extended narrative (3-4 paragraphs).
 *   - Layer 3: 5-7 occupations LATAM + ficha tecnica.
 *   - Footer: NFR-27 chip data.
 *
 * Plugin-as-data invariant (FOUND-05 scan): NO instrument code strings in
 * this file. The assembler reads `psychometric_status` jsonb + the snapshot
 * payload — both are data, not code.
 *
 * Anchors:
 *  - 01-CONTEXT.md D3.5, D3.8, D3.10.
 *  - 01-UI-SPEC.md §7.6.
 *  - 01-PATTERNS.md §2.3 row "lib/report/assembler.ts".
 *  - app/api/score/route.ts (writes the snapshot this reads).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { evaluateInstrumentEthics } from "@/lib/ethics/middleware";
import { logger } from "@/lib/logger";
import { loadNarrative } from "@/lib/report/narrative-loader";
import {
  selectOccupations,
  type Occupation,
} from "@/lib/report/occupation-selector";

// ---------------------------------------------------------------------------
// psychometric_status helper (QUAL-01)
// ---------------------------------------------------------------------------

export type LatamStatus = "pending" | "validated";

export interface PsychometricStatus {
  alpha_by_dimension: Record<string, number>;
  avg_alpha: number | null;
  source: string | null;
  latam_status: LatamStatus;
  /**
   * Per-instrument ficha-tecnica metadata (FREE-11). Seeded per instrument in
   * `psychometric_status` (pack §0/§3); null until 02-13 seeds it, so the
   * ficha falls back to an instrument-neutral string. NOT a RIASEC literal.
   */
  what_it_measures: string | null;
  limits: string | null;
}

interface InstrumentVersionLike {
  psychometric_status: unknown;
  item_count?: number | null;
  likert_min?: number | null;
  likert_max?: number | null;
}

/**
 * Parses the `instrument_version.psychometric_status` jsonb into a typed
 * shape the assembler + UI ficha tecnica use. Treats unknown latam_status
 * values as 'pending' (conservative gate — QUAL-02 prefers false negatives).
 */
export function psychometricStatusFromInstrumentVersion(
  iv: InstrumentVersionLike,
): PsychometricStatus {
  const raw = iv.psychometric_status as
    | {
        alpha_by_dimension?: Record<string, number>;
        source?: string;
        latam_status?: string;
        what_it_measures?: string;
        limits?: string;
      }
    | null
    | undefined;

  const alpha_by_dimension: Record<string, number> =
    raw?.alpha_by_dimension && typeof raw.alpha_by_dimension === "object"
      ? raw.alpha_by_dimension
      : {};

  const alphas = Object.values(alpha_by_dimension);
  const avg_alpha =
    alphas.length === 0
      ? null
      : alphas.reduce((a, b) => a + b, 0) / alphas.length;

  const source = typeof raw?.source === "string" ? raw.source : null;
  const latam_status: LatamStatus =
    raw?.latam_status === "validated" ? "validated" : "pending";
  const what_it_measures =
    typeof raw?.what_it_measures === "string" ? raw.what_it_measures : null;
  const limits = typeof raw?.limits === "string" ? raw.limits : null;

  return {
    alpha_by_dimension,
    avg_alpha,
    source,
    latam_status,
    what_it_measures,
    limits,
  };
}

// ---------------------------------------------------------------------------
// composeReport
// ---------------------------------------------------------------------------

export type IpsativeBand = "BAJO" | "MEDIO" | "ALTO";

export interface ReportLayer1 {
  scoresByDim: Record<string, number>;
  top3: [string, string, string];
  narrativeTopPhrase: string;
}

export interface ReportLayer2 {
  scoresWithBands: Record<
    string,
    {
      rawScore: number;
      band: IpsativeBand;
      showPercentile: boolean;
      baremoPopulation: string | null;
    }
  >;
  narrativeExtended: string;
}

export interface ReportLayer3 {
  occupations: Occupation[];
}

export interface FichaTecnica {
  name: string;
  version: string;
  itemCount: number;
  likertMin: number | null;
  likertMax: number | null;
  alphaSummary: string;
  baremoSummary: string;
  whatItMeasures: string;
  limits: string;
  latamStatus: LatamStatus;
}

export interface ReportFooter {
  /** NFR-27 chip is ALWAYS true for any psychometric instrument (D3.12). */
  nfr27Chip: boolean;
  /** D3.12 — emotional-distress instruments expose contention route in Phase 2. */
  requiresContentionRoute: boolean;
}

/**
 * One renderable dimension for the generic visuals (VisualProps in
 * `_components/visual-registry.ts`). Built here so the page stays a thin
 * renderer: `{code, label, value, band}`.
 *
 * `label` falls back to the dimension `code` until a display-name source lands
 * (`[GAP-DIMENSION-LABELS-ES-CO]` — narrative_template carries the code + the
 * band phrase, NOT a display label). Code-as-label is DATA, never an
 * instrument-code literal (FOUND-05 clean).
 */
export interface ReportVisualDimension {
  code: string;
  label: string;
  value: number;
  band: IpsativeBand;
}

export interface ReportPayload {
  /**
   * Resolves the report visual component via VISUAL_REGISTRY (02-05/02-08).
   * DATA value from instrument_version.visual_type, never instrument code.
   */
  visualType: VisualType;
  /**
   * Pre-adapted dimensions for the bars/circumplex VisualProps contract.
   * Empty on the hexagon path (the hexagon renders from layer1 scores/top3).
   */
  visualDimensions: ReportVisualDimension[];
  layer1: ReportLayer1;
  layer2: ReportLayer2;
  layer3: ReportLayer3;
  fichaTecnica: FichaTecnica;
  footer: ReportFooter;
  /**
   * Decoupled NFR-28 distress detector (02-06). Drives the ContentionBanner
   * (prominent surface) ONLY together with the server `showContention`
   * threshold decision. False for the VALUES instrument (footer link only).
   */
  distressDetector: boolean;
  /**
   * QUAL-07 / D-F2.1 — true when the persisted computed_score carries a quality
   * flag (single_pattern). Non-blocking: the report still renders; the page
   * shows the soft QualityFlagNote and the teaser omits dependent crosses.
   */
  qualityFlag: boolean;
  psychometricStatus: PsychometricStatus;
}

export interface ComposeReportInput {
  sessionId: string;
  userCountryCode: string;
}

interface SnapshotPayload {
  scores_by_dim: Record<string, number>;
  bands_by_dim: Record<string, IpsativeBand>;
  display_by_dim: Record<
    string,
    {
      rawScore: number;
      baremoPopulation: string | null;
      fallback: boolean;
      showPercentile: boolean;
    }
  >;
  ethics?: {
    requires_disclaimer: boolean;
    requires_contention_route: boolean;
    flags: string[];
    decoupled?: {
      pretestModal?: boolean;
      contentionRoute?: boolean;
      distressDetector?: boolean;
    };
  };
  /** validateQuality() result persisted by score-session: { severity, signals }. */
  quality?: {
    severity?: string;
    signals?: string[];
  };
}

interface SnapshotRow {
  id: string;
  user_id: string;
  session_id: string;
  instrument_version_id: string;
  narrative_version: string;
  occupation_set_version: string;
  html_payload: SnapshotPayload;
  rendered_at: string;
}

interface AssessmentSessionRow {
  id: string;
  user_id: string | null;
  instrument_version_id: string;
  progress: number;
}

interface InstrumentVersionRow {
  id: string;
  item_count: number | null;
  likert_min: number | null;
  likert_max: number | null;
  psychometric_status: unknown;
  version: string;
  lang: string;
  /**
   * Resolves the report visual + composition branch (D-C.2). DATA value, never
   * an instrument-code literal. Null (legacy rows) defaults to 'hexagon' — the
   * Phase-1 O*NET behavior (prod O*NET row is back-filled to 'hexagon').
   */
  visual_type: VisualType | null;
}

export type VisualType = "hexagon" | "bars" | "circumplex";

interface InstrumentRow {
  name: string;
}

export async function composeReport(
  supabase: SupabaseClient,
  input: ComposeReportInput,
): Promise<ReportPayload> {
  const { sessionId, userCountryCode } = input;

  // 1. Load assessment_session.
  const { data: sessionData, error: sessErr } = await supabase
    .from("assessment_session")
    .select("id, user_id, instrument_version_id, progress")
    .eq("id", sessionId)
    .maybeSingle();
  if (sessErr || !sessionData) {
    throw new Error(`session_not_found: ${sessionId}`);
  }
  const session = sessionData as AssessmentSessionRow;

  // 2. Load instrument_version.
  const { data: ivData, error: ivErr } = await supabase
    .from("instrument_version")
    .select(
      "id, item_count, likert_min, likert_max, psychometric_status, version, lang, visual_type",
    )
    .eq("id", session.instrument_version_id)
    .maybeSingle();
  if (ivErr || !ivData) {
    throw new Error(
      `instrument_version_not_found: ${session.instrument_version_id}`,
    );
  }
  const iv = ivData as InstrumentVersionRow;

  // 3. Load report_snapshot for the session.
  const { data: snapData, error: snapErr } = await supabase
    .from("report_snapshot")
    .select(
      "id, user_id, session_id, instrument_version_id, narrative_version, occupation_set_version, html_payload, rendered_at",
    )
    .eq("session_id", sessionId)
    .maybeSingle();
  if (snapErr || !snapData) {
    throw new Error(`report_snapshot_not_found: ${sessionId}`);
  }
  const snapshot = snapData as SnapshotRow;
  const payload = snapshot.html_payload;

  // 4. Derive psychometric status.
  const psychometric = psychometricStatusFromInstrumentVersion(iv);

  // 5. Resolve the visual branch from DATA (D-C.2). Null/legacy → hexagon, the
  // Phase-1 O*NET behavior (FOUND-05: branch on visual_type, NEVER on code).
  const visualType: VisualType = iv.visual_type ?? "hexagon";
  const isHexagon = visualType === "hexagon";

  const dims = Object.keys(payload.scores_by_dim);

  // 5a. Top-3 derivation is a hexagon (RIASEC) concept. It is computed for all
  // visuals (cheap, keeps the payload shape stable) but is only SEMANTICALLY
  // meaningful for the hexagon path — 02-08 must NOT render layer1.top3
  // generically for bars/circumplex (e.g. "top 3 of 4 HOV" is meaningless).
  const bandRank: Record<IpsativeBand, number> = { ALTO: 0, MEDIO: 1, BAJO: 2 };
  const sortedDims = [...dims].sort((a, b) => {
    const ba = payload.bands_by_dim[a] ?? "MEDIO";
    const bb = payload.bands_by_dim[b] ?? "MEDIO";
    const r = bandRank[ba] - bandRank[bb];
    if (r !== 0) return r;
    return (payload.scores_by_dim[b] ?? 0) - (payload.scores_by_dim[a] ?? 0);
  });
  if (isHexagon && sortedDims.length < 3) {
    logger.warn(
      { session_id: sessionId, dim_count: sortedDims.length },
      "report_top3_underflow",
    );
  }
  const top3: [string, string, string] = [
    sortedDims[0] ?? "?",
    sortedDims[1] ?? "?",
    sortedDims[2] ?? "?",
  ];
  const bottomDim = sortedDims[sortedDims.length - 1] ?? top3[2];

  // 6. Load narrative (+ occupations only on the hexagon/O*NET path, D-C.3).
  let narrative: Awaited<ReturnType<typeof loadNarrative>>;
  let occupations: Occupation[] = [];
  if (isHexagon) {
    [narrative, occupations] = await Promise.all([
      loadNarrative(supabase, {
        riasecCode: top3.join(""),
        topDimension: top3[0],
        bottomDimension: bottomDim,
        lang: "es-CO",
        version: "1.0",
      }),
      selectOccupations(supabase, {
        top3,
        limit: 7,
        countryCode: userCountryCode,
      }),
    ]);
  } else {
    // bars/circumplex: dimension×band narrative, NO occupations (D-C.3).
    narrative = await loadNarrative(supabase, {
      slot: "dimension_band",
      dimensions: dims.map((dim) => ({
        dimension: dim,
        band: payload.bands_by_dim[dim] ?? "MEDIO",
      })),
      lang: "es-CO",
      version: "1.0",
    });
  }

  // 7. Ethics decision — drives the footer contention link via the DECOUPLED
  // contentionRoute flag (02-06): values gets the footer link with no modal.
  const ethics = await evaluateInstrumentEthics(
    supabase,
    session.instrument_version_id,
  );

  // 8. Load instrument name for ficha tecnica.
  const { data: instrData } = await supabase
    .from("instrument")
    .select("name")
    .eq("id", session.instrument_version_id) // see note below
    .maybeSingle();
  // NOTE: the line above is intentionally permissive — we already have the
  // instrument id from evaluateInstrumentEthics's lookup, but reading it
  // again risks tight coupling to ethics's internal contract. If the join
  // returns null, the ficha falls back to the plan-B generic name (no
  // hardcoded instrument code).
  const instrument = (instrData as InstrumentRow | null) ?? null;

  // 9. Compose ficha tecnica.
  const alphaSummary =
    psychometric.avg_alpha !== null
      ? `Confiabilidad LATAM: ${psychometric.latam_status === "validated" ? "validada" : "en validacion"} (alpha promedio ${psychometric.avg_alpha.toFixed(2)})`
      : "Confiabilidad LATAM: en validacion (alpha no disponible)";

  const baremoUsed =
    Object.values(payload.display_by_dim)[0]?.baremoPopulation ?? null;
  const baremoSummary = baremoUsed
    ? `Baremo ${baremoUsed} (Colombia en validacion)`
    : "Baremo en validacion";

  // FREE-11: whatItMeasures/limits come from instrument metadata
  // (psychometric_status, seeded per instrument in 02-13), NOT literals. The
  // fallback is instrument-neutral (no RIASEC/career framing) for any visual.
  const fichaTecnica: FichaTecnica = {
    name: instrument?.name ?? "Instrumento de autoconocimiento",
    version: iv.version,
    itemCount: iv.item_count ?? 0,
    likertMin: iv.likert_min,
    likertMax: iv.likert_max,
    alphaSummary,
    baremoSummary,
    whatItMeasures:
      psychometric.what_it_measures ??
      "Que mide: ficha tecnica en preparacion para este instrumento.",
    limits:
      psychometric.limits ??
      "NO es una evaluacion clinica. NO predice resultados individuales.",
    latamStatus: psychometric.latam_status,
  };

  // 10. Compose layer 2 scores+bands.
  const scoresWithBands: ReportLayer2["scoresWithBands"] = {};
  for (const dim of dims) {
    const display = payload.display_by_dim[dim];
    scoresWithBands[dim] = {
      rawScore: payload.scores_by_dim[dim] ?? 0,
      band: payload.bands_by_dim[dim] ?? "MEDIO",
      showPercentile: display?.showPercentile ?? false,
      baremoPopulation: display?.baremoPopulation ?? null,
    };
  }

  // 11. Compose extended narrative (paragraphs concatenated; UI splits on \n\n).
  // Hexagon: top phrase + high/low dimensional sentences. bars/circumplex: one
  // phrase per dimension from the dimension×band map (D-C.4).
  const narrativeExtended = isHexagon
    ? [
        narrative.topPhrase,
        ...narrative.dimensionalHigh,
        ...narrative.dimensionalLow,
      ]
        .filter((s) => s.length > 0)
        .join("\n\n")
    : Object.values(narrative.byDimensionBand ?? {})
        .filter((s) => s.length > 0)
        .join("\n\n");

  // The Layer-1 frase reveladora is only meaningful on the hexagon path.
  const narrativeTopPhrase = isHexagon ? narrative.topPhrase : "";

  // 12. Footer. The permanent contention link is driven by the DECOUPLED
  // contentionRoute flag (02-06) — so the VALUES instrument keeps the footer
  // link even with no pre-test modal (CONTEXT D-A.2).
  const footer: ReportFooter = {
    nfr27Chip: true, // Always shown for any psychometric instrument.
    requiresContentionRoute: ethics.decoupled.contentionRoute,
  };

  // 13. Generic visual dimensions for the bars/circumplex VisualProps contract.
  // Empty on the hexagon path (the hexagon renders from layer1 scores/top3).
  // `label` defaults to the dimension code ([GAP-DIMENSION-LABELS-ES-CO]).
  const visualDimensions: ReportVisualDimension[] = isHexagon
    ? []
    : dims.map((dim) => ({
        code: dim,
        label: dim,
        value: payload.scores_by_dim[dim] ?? 0,
        band: payload.bands_by_dim[dim] ?? "MEDIO",
      }));

  // 14. QUAL-07 (D-F2.1) — the persisted computed_score quality flag. Soft,
  // non-blocking: drives the QualityFlagNote, the report still renders.
  const qualityFlag =
    payload.quality?.severity === "flag" ||
    (payload.quality?.signals ?? []).includes("single_pattern");

  return {
    visualType,
    visualDimensions,
    layer1: {
      scoresByDim: payload.scores_by_dim,
      top3,
      narrativeTopPhrase,
    },
    layer2: {
      scoresWithBands,
      narrativeExtended,
    },
    layer3: {
      occupations,
    },
    fichaTecnica,
    footer,
    distressDetector: ethics.decoupled.distressDetector,
    qualityFlag,
    psychometricStatus: psychometric,
  };
}
