/**
 * POST /api/score — Plan 01-08 Task 10 (Wave 5).
 *
 * Thin HTTP wrapper around the scoring pipeline. Inputs:
 *   - body: { session_id: uuid }  (strict Zod, NO user_id — COMPL-17).
 *   - cookie / JWT: same trust model as /api/respond (anonymous cookie
 *     match OR Bearer JWT matching session.user_id).
 *
 * The scoring pipeline (load responses, quality, ethics, score per rule,
 * ipsative bands, persist computed_score + report_snapshot, mark session
 * completed, audit) lives in `lib/scoring/score-session.ts` so the
 * magic-link callback can run the SAME pipeline after claiming the session
 * post-signup (the report snapshot only persists once the session has a
 * user_id) — see [GAP-REPORT-SCORING-NOT-TRIGGERED]. This handler keeps
 * only the parts that are HTTP-specific: body parsing + the trust check.
 *
 * Anchors:
 *   - 01-PATTERNS.md row 2 LOCKED (runtime='nodejs').
 *   - lib/scoring/score-session.ts (the pipeline).
 *   - PLAN 01-08 §<implementation> app/api/score/route.ts.
 */
import { NextResponse } from "next/server";
import { z } from "zod";

import { scoreSession } from "@/lib/scoring/score-session";
import { readAnonymousCookie } from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

// COMPL-17: strict — no extra keys (no user_id from client).
const ScoreBodySchema = z.object({ session_id: z.string().uuid() }).strict();

interface SessionTrustRow {
  user_id: string | null;
  anonymous_session_id: string | null;
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

  // 2. Load session (trust fields only).
  const { data: sessionData, error: sessErr } = await supabase
    .from("assessment_session")
    .select("user_id, anonymous_session_id")
    .eq("id", session_id)
    .maybeSingle();
  if (sessErr || !sessionData) {
    return NextResponse.json({ error: "session_not_found" }, { status: 404 });
  }
  const session = sessionData as SessionTrustRow;

  // 3. Trust check (same shape as /api/respond): anonymous cookie match OR
  //    authenticated Bearer JWT matching session.user_id.
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

  // 4. Run the scoring pipeline (lib/scoring/score-session.ts).
  const result = await scoreSession(supabase, session_id);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, ...(result.meta ?? {}) },
      { status: result.status },
    );
  }

  return NextResponse.json({
    ok: true,
    sessionId: session_id,
    redirect: `/reporte/${session_id}`,
  });
}
