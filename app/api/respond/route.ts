/**
 * POST /api/respond — Plan 01-06 Task 3.
 *
 * Records an `item_response` row for an in-flight assessment session.
 * Body schema (Zod):
 *   - `item_id`     uuid (required)
 *   - `raw_value`   int 1..5 (required)
 *   - `session_id`  uuid (required)
 *
 * COMPL-17 invariant: the body MUST NOT contain `user_id`. The route
 * uses `passthrough: false` (strict) so any extra key is rejected 400.
 *
 * Trust model:
 *   - Anonymous: cookie `anonymous_session_id` must equal the session
 *     row's `anonymous_session_id`. service-role client performs the
 *     INSERT because RLS cannot scope on a non-`auth.uid()` identifier.
 *   - Authenticated (Phase 1+): session.user_id must equal
 *     `getUserFromJWT(req).userId`. Phase 1 has no signed-in users yet
 *     (that lands in Plan 01-07), so this branch is exercised only by
 *     forward-compatible tests.
 *
 * Anchors:
 * - 01-UI-SPEC.md §6.4 (auto-save behavior).
 * - 01-PATTERNS.md row 2 LOCKED: Route Handler runtime=nodejs.
 * - SKELETON.md "Compliance-by-design" (COMPL-17).
 * - threat_model T-01-06-02 (Zod), T-01-06-04 (COMPL-17).
 */
import { NextResponse } from "next/server";
import { z } from "zod";

import { logger } from "@/lib/logger";
import {
  ANONYMOUS_COOKIE_NAME,
  advanceProgress,
  readAnonymousCookie,
} from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

// COMPL-17: `.strict()` rejects any extra key, including `user_id`.
const RespondBodySchema = z
  .object({
    item_id: z.string().uuid(),
    raw_value: z.number().int().min(1).max(5),
    session_id: z.string().uuid(),
  })
  .strict();

// Force TS to treat the Supabase chain leniently — see lib/session/anonymous.ts.
// biome-ignore lint/suspicious/noExplicitAny: types/generated pending Plan 01-12
type AnyBuilder = any;

export async function POST(req: Request) {
  let parsed: z.infer<typeof RespondBodySchema>;
  try {
    const raw = await req.json();
    parsed = RespondBodySchema.parse(raw);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "invalid_body", details: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { item_id, raw_value, session_id } = parsed;

  const supabase = getSupabaseAdminClient();
  const { data: sessionRow, error: sessErr } = await supabase
    .from("assessment_session")
    .select("id, user_id, anonymous_session_id, instrument_version_id, progress")
    .eq("id", session_id)
    .maybeSingle();

  if (sessErr || !sessionRow) {
    return NextResponse.json({ error: "session_not_found" }, { status: 404 });
  }
  const session = sessionRow as {
    id: string;
    user_id: string | null;
    anonymous_session_id: string | null;
    instrument_version_id: string;
    progress: number;
  };

  // -- Trust check: anonymous cookie match OR authenticated user ----------
  let isAuthorized = false;
  if (session.user_id == null) {
    const cookieVal = await readAnonymousCookie();
    if (cookieVal && cookieVal === session.anonymous_session_id) {
      isAuthorized = true;
    }
  } else {
    // Authenticated branch — Phase 1 fallback shape; Plan 01-07 ships JWT path.
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

  // -- Validate item belongs to the session's instrument version ----------
  const { data: itemRow, error: itemErr } = await supabase
    .from("item")
    .select("id, instrument_version_id, sequence_number")
    .eq("id", item_id)
    .maybeSingle();
  if (itemErr || !itemRow) {
    return NextResponse.json({ error: "item_not_found" }, { status: 404 });
  }
  const item = itemRow as {
    id: string;
    instrument_version_id: string;
    sequence_number: number;
  };
  if (item.instrument_version_id !== session.instrument_version_id) {
    return NextResponse.json({ error: "item_mismatch" }, { status: 400 });
  }

  // -- INSERT item_response + advance progress (best-effort upsert shape) -
  try {
    const insertPayload = {
      user_id: session.user_id,
      session_id,
      item_id,
      raw_value,
    };
    const { error: insertErr } = await (
      supabase.from("item_response") as AnyBuilder
    ).insert(insertPayload);
    if (insertErr) {
      logger.error(
        { action: "respond_insert_error", session_id, item_id },
        "item_response insert failed",
      );
      return NextResponse.json({ error: "insert_failed" }, { status: 500 });
    }

    const nextProgress = await advanceProgress(session_id);
    return NextResponse.json({ ok: true, next_sequence: nextProgress + 1 });
  } catch (err) {
    logger.error(
      {
        action: "respond_unhandled",
        session_id,
        item_id,
        cookie: ANONYMOUS_COOKIE_NAME,
      },
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
