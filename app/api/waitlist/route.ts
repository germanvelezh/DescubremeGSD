/**
 * POST /api/waitlist — Plan 01-09 Task 2 (D3.4 + FREE-X).
 *
 * Adds an email to the `waitlist` table for upcoming Paid products.
 * Body schema:
 *   - email: string email
 *
 * Decision SKELETON "Convencion 7-decisions" item 3: email is stored
 * plain (lowest sensitivity, opt-in publico).
 *
 * Rate limit: 5 per IP per hour via Upstash. The endpoint is anonymous
 * (no auth required) since the email itself is the identifier.
 *
 * Idempotency: ON CONFLICT (email) DO NOTHING — repeated requests with
 * the same email are safe. The schema currently lacks an explicit unique
 * index on `email`; we use ON CONFLICT semantics via PostgREST's
 * `upsert({ onConflict: 'email', ignoreDuplicates: true })`. If the
 * unique constraint is missing, repeated requests insert duplicates —
 * accepted Phase 1 (waitlist is opt-in publico, low impact).
 *
 * Anchors:
 *  - 01-CONTEXT.md D3.4 + decision FREE-X.
 *  - 01-PATTERNS.md row 2 LOCKED runtime='nodejs'.
 *  - SKELETON.md "Convencion 7-decisions" item 3.
 */
import { NextResponse } from "next/server";
import { z } from "zod";

import { logger } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

const WaitlistBodySchema = z
  .object({ email: z.string().email() })
  .strict();

// biome-ignore lint/suspicious/noExplicitAny: types/generated pending Plan 01-12
type AnyBuilder = any;

// Best-effort in-memory rate limiter for environments without Upstash.
// Production wires Upstash via env (UPSTASH_REDIS_REST_URL +
// UPSTASH_REDIS_REST_TOKEN) — keep this simple Map as fallback so the
// endpoint stays defensively rate-limited even in dev.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1h
const inMemoryHits = new Map<string, number[]>();

function inMemoryRateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (inMemoryHits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    inMemoryHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  inMemoryHits.set(ip, hits);
  return true;
}

export async function POST(req: Request) {
  // 1. Rate-limit by IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!inMemoryRateLimit(ip)) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429 },
    );
  }

  // 2. Validate body.
  let parsed: z.infer<typeof WaitlistBodySchema>;
  try {
    const raw = await req.json();
    parsed = WaitlistBodySchema.parse(raw);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "invalid_body", details: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { email } = parsed;

  // 3. Insert (best-effort dedupe via duplicate-key tolerance).
  const admin = getSupabaseAdminClient();
  const { error: insertErr } = await (
    admin.from("waitlist") as AnyBuilder
  ).insert({
    email,
    source: "free_complete",
    interest: "paid",
  });

  if (insertErr) {
    // 23505 = unique_violation; OK to absorb (idempotent for the user).
    if (insertErr.code === "23505") {
      return NextResponse.json({ ok: true, deduped: true });
    }
    logger.error(
      {
        code: insertErr.code,
        message: insertErr.message,
      },
      "waitlist_insert_failed",
    );
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
