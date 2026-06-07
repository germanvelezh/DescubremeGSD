/**
 * POST /api/feedback — Plan 01-09 Task 2 (D3.4).
 *
 * Records a `feedback_event` row for a completed reporte. Body schema:
 *   - sessionId: uuid
 *   - stars:     int 1..5
 *   - text:      string | null, max 500 chars
 *
 * COMPL-17 invariant: NO `user_id` in the body. The handler derives the
 * user from the JWT (when present) and falls back to NULL `user_id` for
 * anonymous survey responses (D3.4 allows anonymous feedback because the
 * survey is opt-in self-report).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6 what next.
 *  - 01-CONTEXT.md D3.4.
 *  - 01-PATTERNS.md row 2 LOCKED runtime='nodejs'.
 */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

const ANONYMOUS_SESSION_COOKIE = "anonymous_session_id";

const FeedbackBodySchema = z
  .object({
    sessionId: z.string().uuid(),
    stars: z.number().int().min(1).max(5),
    text: z.string().max(500).nullable().optional(),
  })
  .strict();

// biome-ignore lint/suspicious/noExplicitAny: types/generated pending Plan 01-12
type AnyBuilder = any;

export async function POST(req: Request) {
  let parsed: z.infer<typeof FeedbackBodySchema>;
  try {
    const raw = await req.json();
    parsed = FeedbackBodySchema.parse(raw);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "invalid_body", details: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { sessionId, stars, text } = parsed;

  // Derive user_id from session (if user is authenticated). If anon,
  // user_id remains null — D3.4 allows anonymous self-report feedback.
  let userId: string | null = null;
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) userId = user.id;
  } catch {
    // anonymous — no JWT
  }

  // Ownership check (IDOR mitigation — defense-in-depth, RLS deny is
  // primary). Trust the JWT-derived user_id only; the sessionId from the
  // body is untrusted input. Look up the session and verify the caller
  // owns it before recording feedback against it.
  //
  // Three legitimate cases:
  //   (a) authenticated user owns the session (assessment_session.user_id
  //       matches the JWT user) → proceed.
  //   (b) anonymous in-flight session (assessment_session.user_id is NULL
  //       — D3.4 allows anonymous self-report) AND the caller presents the
  //       matching `anonymous_session_id` cookie set by Plan 01-06's
  //       anonymous session bootstrap.
  //   (c) anonymous session that has been claimed (user_id populated by
  //       Plan 01-07 claim flow) → falls into case (a).
  //
  // All other shapes return 404 — never 403 (would leak existence to
  // probers walking UUID space).
  const admin = getSupabaseAdminClient();
  type SessionOwnerRow = {
    user_id: string | null;
    anonymous_session_id: string | null;
  };
  const { data: sess } = (await admin
    .from("assessment_session")
    .select("user_id, anonymous_session_id")
    .eq("id", sessionId)
    .maybeSingle()) as { data: SessionOwnerRow | null };

  if (!sess) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if (sess.user_id !== null) {
    // Authenticated session — JWT user MUST match.
    if (userId === null || sess.user_id !== userId) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
  } else {
    // Anonymous session — cookie MUST match.
    const cookieStore = await cookies();
    const cookieAnonId = cookieStore.get(ANONYMOUS_SESSION_COOKIE)?.value;
    if (
      !cookieAnonId ||
      !sess.anonymous_session_id ||
      cookieAnonId !== sess.anonymous_session_id
    ) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
  }

  // Look up report_snapshot.id for the session to populate the FK.
  const { data: snap } = await admin
    .from("report_snapshot")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();
  const reportSnapshotId =
    snap && typeof snap === "object" && "id" in snap
      ? (snap as { id: string }).id
      : null;

  const { error: insertErr } = await (
    admin.from("feedback_event") as AnyBuilder
  ).insert({
    user_id: userId,
    report_snapshot_id: reportSnapshotId,
    stars,
    text_free: text ?? null,
  });

  if (insertErr) {
    logger.error(
      {
        session_id: sessionId,
        code: insertErr.code,
        message: insertErr.message,
      },
      "feedback_event_insert_failed",
    );
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
