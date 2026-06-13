/**
 * scoreSession — reusable scoring + snapshot-persistence pipeline.
 *
 * Extracted from `app/api/score/route.ts` (steps 4-14) so it can be called
 * from TWO authorized sites without an internal HTTP round-trip:
 *   1. POST /api/score  — keeps its body-parse + trust-check wrapper, then
 *      delegates the pipeline here.
 *   2. /auth/callback   — after claiming the anonymous session post-signup,
 *      generates the report snapshot so `/reporte/{id}` has something to read
 *      ([GAP-REPORT-SCORING-NOT-TRIGGERED]). The callback calls this
 *      BEST-EFFORT: a scoring failure must NEVER break the auth flow.
 *
 * This function assumes the CALLER already authorized the request (cookie
 * match or JWT for the route; freshly-claimed session for the callback). It
 * performs NO trust check of its own.
 *
 * Persistence (computed_score + report_snapshot) only happens when the
 * session is authenticated (`user_id != null`) — both tables have a
 * NOT NULL `user_id` FK. An anonymous call scores in-memory but persists
 * nothing (no snapshot is created until after signup/claim).
 *
 * Completeness ([BUG-PROGRESS-DRIFT-ON-REANSWER]): the gate is the count of
 * DISTINCT `item_response` rows (the `(session_id, item_id)` unique index
 * guarantees one row per item), NOT the `assessment_session.progress`
 * counter — that counter can drift ahead of coverage when a user re-answers
 * an item. Incomplete psychometric data is never scored.
 *
 * Plugin-as-data invariant (FOUND-04/05): no instrument code strings here.
 *
 * Anchors:
 *  - app/api/score/route.ts (the former home of steps 4-14).
 *  - 01-CONTEXT.md D3.8 (display rules), D3.12 (ethics seam).
 *  - estado/BACKLOG.md [GAP-REPORT-SCORING-NOT-TRIGGERED] + [BUG-PROGRESS-DRIFT-ON-REANSWER].
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import { writeAudit } from "@/lib/audit/writer";
import {
  selectBaremo,
  shouldShowPercentile,
  type BaremoPopulation,
  type LatamStatus,
} from "@/lib/baremo/selector";
import { recordDistressEvent } from "@/lib/ethics/distress";
import { evaluateInstrumentEthics } from "@/lib/ethics/middleware";
import { logger } from "@/lib/logger";
import { computeIpsativeBands, type IpsativeBand } from "@/lib/scoring/ipsative";
import { bandFromMrat, computeMratScores } from "@/lib/scoring/mrat";
import { score } from "@/lib/scoring/interpreter";
import { ScoringFormulaSchema } from "@/lib/scoring/types";
import { validateQuality } from "@/lib/quality/validator";

// biome-ignore lint/suspicious/noExplicitAny: Drizzle types generated in Plan 01-12.
type AnyBuilder = any;

interface AssessmentSessionRow {
  id: string;
  user_id: string | null;
  anonymous_session_id: string | null;
  instrument_version_id: string;
  progress: number;
  started_at: string;
  completed_at: string | null;
}

interface InstrumentVersionRow {
  id: string;
  item_count: number | null;
  psychometric_status: unknown;
  /**
   * Profile-level centering strategy (migration 014, D-E1.3). 'none' |
   * 'ipsative_z' | 'mrat'. Null/absent defaults to 'ipsative_z' for back-compat
   * with O*NET (which the existing score-session mock seeds without this field).
   */
  centering_strategy: string | null;
}

interface ScoringRuleRow {
  id: string;
  dimension: string;
  formula: unknown;
  scoring_version: string;
}

interface ItemResponseJoin {
  raw_value: number;
  item: {
    dimension: string | null;
    sequence_number: number;
  } | null;
}

interface UserRow {
  country_code: string | null;
}

export interface ScoreSessionSuccess {
  ok: true;
  sessionId: string;
  /** True when the report_snapshot was written (authenticated session). */
  persisted: boolean;
  scoresByDim: Record<string, number>;
  bands: Record<string, IpsativeBand>;
}

export interface ScoreSessionFailure {
  ok: false;
  /** Machine code (mirrors the prior /api/score error vocabulary). */
  error: string;
  /** Suggested HTTP status for the route wrapper. */
  status: number;
  meta?: Record<string, unknown>;
}

export type ScoreSessionResult = ScoreSessionSuccess | ScoreSessionFailure;

/**
 * Scores an assessment session and, when authenticated, persists the
 * computed_score rows + report_snapshot the `/reporte` page reads. Returns
 * a discriminated result instead of throwing so both the route (maps to
 * HTTP) and the callback (best-effort, log-and-continue) can consume it.
 */
export async function scoreSession(
  supabase: SupabaseClient,
  sessionId: string,
): Promise<ScoreSessionResult> {
  // 1. Load session.
  const { data: sessionData, error: sessErr } = await supabase
    .from("assessment_session")
    .select(
      "id, user_id, anonymous_session_id, instrument_version_id, progress, started_at, completed_at",
    )
    .eq("id", sessionId)
    .maybeSingle();
  if (sessErr || !sessionData) {
    return { ok: false, error: "session_not_found", status: 404 };
  }
  const session = sessionData as AssessmentSessionRow;

  // 2. Load instrument_version.
  const { data: ivData, error: ivErr } = await supabase
    .from("instrument_version")
    .select("id, item_count, psychometric_status, centering_strategy")
    .eq("id", session.instrument_version_id)
    .maybeSingle();
  if (ivErr || !ivData) {
    return { ok: false, error: "instrument_version_not_found", status: 404 };
  }
  const instrumentVersion = ivData as InstrumentVersionRow;

  try {
    // 3. Load responses joined with item to derive dimension + sequence.
    const { data: respData, error: respErr } = await supabase
      .from("item_response")
      .select("raw_value, item:item_id ( dimension, sequence_number )")
      .eq("session_id", sessionId);
    if (respErr) {
      logger.error(
        { session_id: sessionId, code: respErr.code },
        "score_responses_load_failed",
      );
      return { ok: false, error: "responses_load_failed", status: 500 };
    }
    // PostgREST embeds `item:item_id(...)` as a nested object; the untyped
    // client infers it as an array, so cast through unknown (the same shape
    // the former /api/score route relied on via the looser admin client).
    const responses = (respData ?? []) as unknown as ItemResponseJoin[];
    if (responses.length === 0) {
      return { ok: false, error: "no_responses", status: 409 };
    }

    // 4. Completeness gate by DISTINCT response count ([BUG-PROGRESS-DRIFT-
    //    ON-REANSWER]): the `(session_id, item_id)` unique index makes
    //    responses.length the distinct-item coverage. With a 60-item bank,
    //    60 distinct responses => every dimension has its full complement,
    //    so per-dim scoring (e.g. C1..C10) never sums a missing item.
    if (
      instrumentVersion.item_count != null &&
      responses.length < instrumentVersion.item_count
    ) {
      return {
        ok: false,
        error: "session_incomplete",
        status: 409,
        meta: {
          responses: responses.length,
          item_count: instrumentVersion.item_count,
        },
      };
    }

    // 5. Quality check.
    const quality = validateQuality(
      responses.map((r) => ({ rawValue: r.raw_value })),
      {
        startedAt: new Date(session.started_at),
        completedAt: new Date(session.completed_at ?? new Date().toISOString()),
      },
    );
    if (quality.severity === "block") {
      return {
        ok: false,
        error: "quality_block",
        status: 422,
        meta: { signals: quality.signals },
      };
    }

    // 6. Build per-dim response Map<itemCode, raw_value>. Item code is
    //    synthesized as <dimension><sequence_within_dim>; the scoring_rule
    //    formula uses the same convention (R1..R10, etc.).
    const byDim = new Map<string, ItemResponseJoin[]>();
    for (const r of responses) {
      const dim = r.item?.dimension;
      if (!dim) continue;
      const arr = byDim.get(dim) ?? [];
      arr.push(r);
      byDim.set(dim, arr);
    }
    const responseMap = new Map<string, number>();
    for (const [dim, arr] of byDim) {
      arr.sort((a, b) => {
        const sa = a.item?.sequence_number ?? 0;
        const sb = b.item?.sequence_number ?? 0;
        return sa - sb;
      });
      arr.forEach((r, idx) => {
        responseMap.set(`${dim}${idx + 1}`, r.raw_value);
      });
    }

    // 7. Ethics seam (Phase 1 plumbing).
    const ethics = await evaluateInstrumentEthics(
      supabase,
      session.instrument_version_id,
    );
    if (ethics.requires_disclaimer && session.user_id != null) {
      try {
        await recordDistressEvent(supabase, {
          userId: session.user_id,
          instrumentVersionId: session.instrument_version_id,
          thresholdTriggered: "ethical_flag_present",
          actionTaken: "disclaimer_shown",
        });
      } catch (err) {
        logger.error(
          { session_id: sessionId, message: (err as Error).message },
          "distress_event_write_skipped",
        );
      }
    }

    // 8. Load + iterate scoring rules.
    const { data: ruleData, error: ruleErr } = await supabase
      .from("scoring_rule")
      .select("id, dimension, formula, scoring_version")
      .eq("instrument_version_id", session.instrument_version_id);
    if (ruleErr) {
      logger.error(
        { session_id: sessionId, code: ruleErr.code },
        "scoring_rules_load_failed",
      );
      return { ok: false, error: "scoring_rules_load_failed", status: 500 };
    }
    const rules = (ruleData ?? []) as ScoringRuleRow[];
    if (rules.length === 0) {
      return { ok: false, error: "no_scoring_rules", status: 409 };
    }

    // 9. Load user country (for baremo selector) when authenticated.
    let countryCode = "INTL";
    if (session.user_id != null) {
      const { data: userData } = await supabase
        .from("user")
        .select("country_code")
        .eq("id", session.user_id)
        .maybeSingle();
      const user = (userData as UserRow | null) ?? null;
      countryCode = user?.country_code ?? "INTL";
    }

    // 10. Score per rule + INSERT computed_score per dim (authenticated only).
    const scoresByDim: Record<string, number> = {};
    const dimDisplay: Record<
      string,
      {
        rawScore: number;
        baremoPopulation: BaremoPopulation | null;
        fallback: boolean;
        showPercentile: boolean;
      }
    > = {};

    for (const rule of rules) {
      const parsedFormula = ScoringFormulaSchema.safeParse(rule.formula);
      if (!parsedFormula.success) {
        logger.error(
          {
            session_id: sessionId,
            dimension: rule.dimension,
            issue: parsedFormula.error.message,
          },
          "scoring_formula_invalid",
        );
        return {
          ok: false,
          error: "scoring_formula_invalid",
          status: 500,
          meta: { dimension: rule.dimension },
        };
      }
      let raw: number;
      try {
        raw = score(parsedFormula.data, responseMap);
      } catch (err) {
        logger.error(
          {
            session_id: sessionId,
            dimension: rule.dimension,
            message: (err as Error).message,
          },
          "score_computation_failed",
        );
        return {
          ok: false,
          error: "score_computation_failed",
          status: 500,
          meta: { dimension: rule.dimension },
        };
      }
      scoresByDim[rule.dimension] = raw;

      const baremoResult = await selectBaremo(
        supabase,
        supabase,
        session.instrument_version_id,
        countryCode,
      );

      const psStatus = (instrumentVersion.psychometric_status as
        | {
            alpha_by_dimension?: Record<string, number>;
            latam_status?: string;
          }
        | null) ?? null;
      const alpha = psStatus?.alpha_by_dimension?.[rule.dimension] ?? 0;
      const latamStatus: LatamStatus =
        psStatus?.latam_status === "validated" ? "validated" : "pending";
      const showPercentile = baremoResult.populationUsed
        ? shouldShowPercentile({
            alpha,
            baremoPopulation: baremoResult.populationUsed,
            latamStatus,
          })
        : false;

      dimDisplay[rule.dimension] = {
        rawScore: raw,
        baremoPopulation: baremoResult.populationUsed,
        fallback: baremoResult.fallback,
        showPercentile,
      };

      if (session.user_id != null) {
        const { error: csErr } = await (
          supabase.from("computed_score") as AnyBuilder
        ).insert({
          user_id: session.user_id,
          scoring_rule_id: rule.id,
          baremo_id: baremoResult.baremo?.id ?? null,
          raw,
          scoring_version: rule.scoring_version,
        });
        if (csErr) {
          logger.error(
            { session_id: sessionId, dimension: rule.dimension, code: csErr.code },
            "computed_score_insert_failed",
          );
          // Continue — report_snapshot still serializable.
        }
      }
    }

    // 11. Centering bands — dispatched by DATA (centering_strategy), never by
    //     instrument code (FOUND-05). Null/absent defaults to the O*NET
    //     ipsative_z path so existing behavior is unchanged (regression-safe).
    //     - 'mrat' (D-E1.3, QUAL-05): within-person centering over the FLAT
    //       item vector (the step-6 responseMap, keyed itemKey -> raw_value),
    //       NOT facet scores (Pitfall 3). HOV bands are within-person, bypassing
    //       selectBaremo/shouldShowPercentile (Pitfall 4: no HOV baremo exists).
    //     valueMap/hovMap come from instrument metadata seeded in Plan 02-10/13;
    //     until then they are empty and this branch is dormant (the math itself
    //     is proven in lib/scoring/mrat.test.ts). The 10->4 partition is SEED
    //     content, never hardcoded here (FOUND-05).
    const strategy = instrumentVersion.centering_strategy ?? "ipsative_z";
    let bands: Record<string, IpsativeBand>;
    if (strategy === "mrat") {
      const flatVector = Array.from(responseMap, ([itemKey, rawValue]) => ({
        itemKey,
        rawValue,
      }));
      const valueMap: Record<string, string[]> = {};
      const hovMap: Record<string, string[]> = {};
      const mrat = computeMratScores(flatVector, valueMap, hovMap);
      bands = {};
      for (const hov of mrat.higherOrder) {
        bands[hov.code] = bandFromMrat(hov.centered);
      }
    } else {
      bands = computeIpsativeBands(scoresByDim);
    }

    // 12. Persist report_snapshot when authenticated.
    const reportPayload = {
      scores_by_dim: scoresByDim,
      bands_by_dim: bands,
      display_by_dim: dimDisplay,
      ethics,
      quality,
    };
    if (session.user_id != null) {
      const { error: snapErr } = await (
        supabase.from("report_snapshot") as AnyBuilder
      ).insert({
        user_id: session.user_id,
        session_id: sessionId,
        instrument_version_id: session.instrument_version_id,
        narrative_version: "1.0",
        occupation_set_version: "1.0",
        html_payload: reportPayload,
      });
      if (snapErr) {
        logger.error(
          { session_id: sessionId, code: snapErr.code },
          "report_snapshot_insert_failed",
        );
        return { ok: false, error: "report_snapshot_failed", status: 500 };
      }

      // 13. Ride-along ([GAP-SESSION-COMPLETE-UNWIRED]): now that the report
      //     exists, mark the session completed. Non-fatal — the report is
      //     already persisted and scoring uses the response count, not status.
      const { error: complErr } = await (
        supabase.from("assessment_session") as AnyBuilder
      )
        .update({ status: "completed", completed_at: new Date().toISOString() })
        .eq("id", sessionId);
      if (complErr) {
        logger.warn(
          { session_id: sessionId, code: complErr.code },
          "session_complete_mark_skipped",
        );
      }

      // 14. Audit.
      try {
        await writeAudit(supabase, {
          actor_id: session.user_id,
          actor_role: "authenticated",
          action: "report_generated",
          entity_type: "report_snapshot",
          entity_id: sessionId,
        });
      } catch (err) {
        logger.error(
          { session_id: sessionId, message: (err as Error).message },
          "report_generated_audit_skipped",
        );
      }
    }

    return {
      ok: true,
      sessionId,
      persisted: session.user_id != null,
      scoresByDim,
      bands,
    };
  } catch (err) {
    logger.error(
      { session_id: sessionId, message: (err as Error).message },
      "score_session_unhandled_error",
    );
    return { ok: false, error: "internal_error", status: 500 };
  }
}
