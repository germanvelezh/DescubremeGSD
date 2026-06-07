/**
 * POST /api/score — Plan 01-08 Task 10 (Wave 5).
 *
 * End-to-end scoring endpoint. Called when the user completes the 60th
 * item of the assessment and clicks "Ver mi resultado". Inputs:
 *   - body: { session_id: uuid }  (strict Zod, NO user_id — COMPL-17).
 *   - cookie / JWT: same trust model as /api/respond (anonymous cookie
 *     match OR Bearer JWT matching session.user_id).
 *
 * Pipeline:
 *   1. Validate body. Resolve session + verify completed (progress >= item_count).
 *   2. Trust check (cookie OR JWT).
 *   3. Load item_response rows for the session, join with item.dimension +
 *      sequence_number to build per-dim Map<itemCode, raw_value>.
 *   4. validateQuality(responses, session) — Phase 1 emits 'flag' / 'warn'
 *      (no 'block'); 'block' would short-circuit (Phase 2+).
 *   5. evaluateInstrumentEthics — if requires_disclaimer + user authenticated,
 *      record distress_event 'disclaimer_shown' (NFR-28 trail; D3.12 UI Phase 2).
 *   6. For each scoring_rule of the instrument_version:
 *        - parse formula via ScoringFormulaSchema (Zod strict).
 *        - score(formula, responses).
 *        - selectBaremo + shouldShowPercentile to compute display flag.
 *        - INSERT computed_score (one per dim).
 *   7. computeIpsativeBands across all dim scores.
 *   8. INSERT report_snapshot with html_payload jsonb (scores + bands +
 *      ethics + quality + display flags).
 *   9. writeAudit 'report_generated'.
 *   10. Return { ok: true, sessionId, redirect: '/reporte/<sessionId>' }.
 *
 * Anchors:
 *   - 01-PATTERNS.md row 2 LOCKED (runtime='nodejs').
 *   - 01-RESEARCH.md §"Scoring engine domain" + "Architectural Map".
 *   - PLAN 01-08 §<implementation> app/api/score/route.ts.
 */
import { NextResponse } from "next/server";
import { z } from "zod";

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
import { computeIpsativeBands } from "@/lib/scoring/ipsative";
import { score } from "@/lib/scoring/interpreter";
import { ScoringFormulaSchema } from "@/lib/scoring/types";
import { validateQuality } from "@/lib/quality/validator";
import { readAnonymousCookie } from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

// COMPL-17: strict — no extra keys (no user_id from client).
const ScoreBodySchema = z
  .object({ session_id: z.string().uuid() })
  .strict();

// biome-ignore lint/suspicious/noExplicitAny: Drizzle types still generated in Plan 01-12.
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

export async function POST(req: Request) {
  // 1. Parse body.
  let parsed: z.infer<typeof ScoreBodySchema>;
  try {
    const raw = await req.json();
    parsed = ScoreBodySchema.parse(raw);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "invalid_body", details: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const { session_id } = parsed;

  const supabase = getSupabaseAdminClient();

  // 2. Load + verify session.
  const { data: sessionData, error: sessErr } = await supabase
    .from("assessment_session")
    .select(
      "id, user_id, anonymous_session_id, instrument_version_id, progress, started_at, completed_at",
    )
    .eq("id", session_id)
    .maybeSingle();
  if (sessErr || !sessionData) {
    return NextResponse.json({ error: "session_not_found" }, { status: 404 });
  }
  const session = sessionData as AssessmentSessionRow;

  // 3. Trust check (same shape as /api/respond).
  let isAuthorized = false;
  if (session.user_id == null) {
    const cookieVal = await readAnonymousCookie();
    if (cookieVal && cookieVal === session.anonymous_session_id) {
      isAuthorized = true;
    }
  } else {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.toLowerCase().startsWith("bearer ")) {
      try {
        const { getUserFromJWT } = await import("@/lib/tenant/jwt");
        const { userId } = await getUserFromJWT(req);
        if (userId === session.user_id) isAuthorized = true;
      } catch {
        isAuthorized = false;
      }
    }
  }
  if (!isAuthorized) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // 4. Load instrument_version + verify session completed.
  const { data: ivData, error: ivErr } = await supabase
    .from("instrument_version")
    .select("id, item_count, psychometric_status")
    .eq("id", session.instrument_version_id)
    .maybeSingle();
  if (ivErr || !ivData) {
    return NextResponse.json(
      { error: "instrument_version_not_found" },
      { status: 404 },
    );
  }
  const instrumentVersion = ivData as InstrumentVersionRow;
  if (
    instrumentVersion.item_count != null &&
    session.progress < instrumentVersion.item_count
  ) {
    return NextResponse.json(
      {
        error: "session_incomplete",
        progress: session.progress,
        item_count: instrumentVersion.item_count,
      },
      { status: 409 },
    );
  }

  try {
    // 5. Load responses joined with item to derive dimension + sequence.
    const { data: respData, error: respErr } = await supabase
      .from("item_response")
      .select("raw_value, item:item_id ( dimension, sequence_number )")
      .eq("session_id", session_id);
    if (respErr) {
      logger.error(
        { session_id, code: respErr.code },
        "score_responses_load_failed",
      );
      return NextResponse.json(
        { error: "responses_load_failed" },
        { status: 500 },
      );
    }
    const responses = (respData ?? []) as ItemResponseJoin[];
    if (responses.length === 0) {
      return NextResponse.json(
        { error: "no_responses" },
        { status: 409 },
      );
    }

    // 6. Quality check.
    const quality = validateQuality(
      responses.map((r) => ({ rawValue: r.raw_value })),
      {
        startedAt: new Date(session.started_at),
        completedAt: new Date(session.completed_at ?? new Date().toISOString()),
      },
    );
    if (quality.severity === "block") {
      return NextResponse.json(
        { error: "quality_block", signals: quality.signals },
        { status: 422 },
      );
    }

    // 7. Build per-dim response Map<itemCode, raw_value>. Item code is
    // synthesized as <dimension><sequence_within_dim>; the scoring_rule
    // formula uses the same convention (R1..R10, etc.). The within-dim
    // sequence is derived from item.sequence_number ordered ascending.
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

    // 8. Ethics seam (Phase 1 plumbing).
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
        // Audit gap is reportable but not fatal — let scoring proceed.
        logger.error(
          { session_id, message: (err as Error).message },
          "distress_event_write_skipped",
        );
      }
    }

    // 9. Load + iterate scoring rules.
    const { data: ruleData, error: ruleErr } = await supabase
      .from("scoring_rule")
      .select("id, dimension, formula, scoring_version")
      .eq("instrument_version_id", session.instrument_version_id);
    if (ruleErr) {
      logger.error(
        { session_id, code: ruleErr.code },
        "scoring_rules_load_failed",
      );
      return NextResponse.json(
        { error: "scoring_rules_load_failed" },
        { status: 500 },
      );
    }
    const rules = (ruleData ?? []) as ScoringRuleRow[];
    if (rules.length === 0) {
      return NextResponse.json(
        { error: "no_scoring_rules" },
        { status: 409 },
      );
    }

    // 10. Load user country (for baremo selector) when authenticated.
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

    // 11. Score per rule + INSERT computed_score per dim. Persist scores
    // only if user is authenticated (computed_score.user_id NOT NULL FK).
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
            session_id,
            dimension: rule.dimension,
            issue: parsedFormula.error.message,
          },
          "scoring_formula_invalid",
        );
        return NextResponse.json(
          { error: "scoring_formula_invalid", dimension: rule.dimension },
          { status: 500 },
        );
      }
      let raw: number;
      try {
        raw = score(parsedFormula.data, responseMap);
      } catch (err) {
        logger.error(
          { session_id, dimension: rule.dimension, message: (err as Error).message },
          "score_computation_failed",
        );
        return NextResponse.json(
          { error: "score_computation_failed", dimension: rule.dimension },
          { status: 500 },
        );
      }
      scoresByDim[rule.dimension] = raw;

      const baremoResult = await selectBaremo(
        supabase,
        supabase,
        session.instrument_version_id,
        countryCode,
      );

      // alpha + latamStatus from psychometric_status.alpha_by_dimension.
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
            {
              session_id,
              dimension: rule.dimension,
              code: csErr.code,
            },
            "computed_score_insert_failed",
          );
          // Continue — report_snapshot still serializable.
        }
      }
    }

    // 12. Ipsative bands across all dims.
    const bands = computeIpsativeBands(scoresByDim);

    // 13. Persist report_snapshot when authenticated.
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
        session_id,
        instrument_version_id: session.instrument_version_id,
        narrative_version: "1.0",
        occupation_set_version: "1.0",
        html_payload: reportPayload,
      });
      if (snapErr) {
        logger.error(
          { session_id, code: snapErr.code },
          "report_snapshot_insert_failed",
        );
        return NextResponse.json(
          { error: "report_snapshot_failed" },
          { status: 500 },
        );
      }

      // 14. Audit.
      try {
        await writeAudit(supabase, {
          actor_id: session.user_id,
          actor_role: "authenticated",
          action: "report_generated",
          entity_type: "report_snapshot",
          entity_id: session_id,
        });
      } catch (err) {
        logger.error(
          { session_id, message: (err as Error).message },
          "report_generated_audit_skipped",
        );
      }
    }

    return NextResponse.json({
      ok: true,
      sessionId: session_id,
      redirect: `/reporte/${session_id}`,
    });
  } catch (err) {
    logger.error(
      { session_id, message: (err as Error).message },
      "score_unhandled_error",
    );
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
