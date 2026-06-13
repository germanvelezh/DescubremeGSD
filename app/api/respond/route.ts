/**
 * POST /api/respond — Plan 01-06 Task 3, reescrito en gap-closure 02-15.
 *
 * Records an `item_response` row for an in-flight assessment session.
 * Body schema (Zod):
 *   - `item_id`     uuid (required)
 *   - `raw_value`   int (required) — el RANGO ya NO se fija en el schema:
 *     es instrument-agnostic en parse time. Se valida post-meta contra
 *     `likert_min`/`likert_max` del instrumento (PERMA 0-10, TwIVI 1-6,
 *     O*NET 1-5). Ver 02-15 paso 1/5.
 *   - `session_id`  uuid (required)
 *
 * COMPL-17 invariant (LOCKED): the body MUST NOT contain `user_id`. The
 * route uses `.strict()` so any extra key is rejected 400. The `user_id`
 * of the upsert derives from the session row, never from the client.
 *
 * Trust model:
 *   - Anonymous (`session.user_id == null`): cookie `anonymous_session_id`
 *     must equal the session row's `anonymous_session_id`. service-role
 *     client performs the UPSERT because RLS cannot scope on a
 *     non-`auth.uid()` identifier (D-A.1 path anonimo O*NET).
 *   - Authenticated (`session.user_id != null`): primary path is the
 *     cookie @supabase/ssr session — `getSupabaseServerClient().auth
 *     .getUser()` resolves the signed-in user; authorized iff
 *     `user.id === session.user_id`. The bearer-JWT path is kept as a
 *     forward-compat fallback (Phase 1 tests) but the runner is cookie-based.
 *
 * Consent gate (gate critico (a) D-E3.2, COMPL-03): for the authenticated
 * path AND `sensitivity === 'high'`, `assertConsentActive` runs at the
 * write boundary BEFORE the upsert — defensa en profundidad sobre RLS. It
 * throws a `Response` (403/412) which is re-thrown verbatim as the HTTP
 * response.
 *
 * Anchors:
 * - 01-UI-SPEC.md §6.4 (auto-save behavior).
 * - 01-PATTERNS.md row 2 LOCKED: Route Handler runtime=nodejs.
 * - SKELETON.md "Compliance-by-design" (COMPL-17).
 * - 02-15-PLAN.md (multi-escala + cookie SSR + consent gate).
 * - threat_model T-02-15-01..04.
 */
import { NextResponse } from "next/server";
import { z } from "zod";

import { assertConsentActive } from "@/lib/consent/guard";
import { logger } from "@/lib/logger";
import {
  ANONYMOUS_COOKIE_NAME,
  advanceProgress,
  getInstrumentVersionMeta,
  readAnonymousCookie,
} from "@/lib/session/anonymous";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

// COMPL-17: `.strict()` rejects any extra key, including `user_id`.
// raw_value se valida como entero; el RANGO es data-driven post-meta
// (likert_min/max), NO un 1..5 hardcodeado en el schema estatico (02-15).
const RespondBodySchema = z
  .object({
    item_id: z.string().uuid(),
    raw_value: z.number().int(),
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
    // D-A.1 path anonimo O*NET — cookie match (intacto).
    const cookieVal = await readAnonymousCookie();
    if (cookieVal && cookieVal === session.anonymous_session_id) {
      isAuthorized = true;
    }
  } else {
    // Primary path: cookie @supabase/ssr session (the 4-test runner).
    try {
      const ssr = await getSupabaseServerClient();
      const {
        data: { user },
      } = await ssr.auth.getUser();
      if (user?.id === session.user_id) isAuthorized = true;
    } catch {
      isAuthorized = false;
    }
    // Forward-compat fallback: bearer-JWT path (Phase 1 tests). Not the
    // runner path; kept so existing JWT-shaped callers still authorize.
    if (!isAuthorized) {
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
  }
  if (!isAuthorized) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // -- Instrument metadata: scale bounds + sensitivity (single query) -----
  const meta = await getInstrumentVersionMeta(session.instrument_version_id);
  if (!meta) {
    logger.error(
      { action: "respond_meta_missing", session_id },
      "instrument_version metadata not found",
    );
    return NextResponse.json({ error: "instrument_meta_not_found" }, {
      status: 500,
    });
  }

  // -- Data-driven scale bound (replaces the hardcoded Zod .min(1).max(5)) -
  // Default 1..5 documentado = regresion O*NET cuando likert_min/max es null.
  const min = meta.likertMin ?? 1;
  const max = meta.likertMax ?? 5;
  if (raw_value < min || raw_value > max) {
    return NextResponse.json(
      { error: "raw_value_out_of_range" },
      { status: 400 },
    );
  }

  // -- Consent gate (gate critico (a) D-E3.2, COMPL-03) -------------------
  // Solo en el path autenticado y cuando el instrumento es sensible. Enforcea
  // el consent sensible en el BOUNDARY de escritura, no solo en RLS. El
  // Response lanzado por assertConsentActive se devuelve verbatim — se captura
  // ANTES del try del upsert para no caer en el catch generico de 500.
  if (session.user_id != null && meta.sensitivity === "high") {
    try {
      await assertConsentActive(
        // biome-ignore lint/suspicious/noExplicitAny: service-role client, types pending 01-12
        supabase as any,
        session.user_id,
        "free", // D-A.3 consent unico por producto
        "high",
      );
    } catch (consentErr) {
      if (consentErr instanceof Response) return consentErr;
      throw consentErr;
    }
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

  // -- UPSERT item_response + advance progress ----------------------------
  // Upsert on (session_id, item_id) so re-answering a Likert item updates
  // the existing row instead of inserting a duplicate (migration 012). Plain
  // INSERTs accumulated duplicates that broke the magic-link signup claim
  // (the partial unique index `(user_id, item_id)` was violated once the
  // session was claimed). Last answer wins. The `user_id` comes from the
  // session row, never the body (COMPL-17).
  try {
    const upsertPayload = {
      user_id: session.user_id,
      session_id,
      item_id,
      raw_value,
    };
    const { error: insertErr } = await (
      supabase.from("item_response") as AnyBuilder
    ).upsert(upsertPayload, { onConflict: "session_id,item_id" });
    if (insertErr) {
      logger.error(
        { action: "respond_upsert_error", session_id, item_id },
        "item_response upsert failed",
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
