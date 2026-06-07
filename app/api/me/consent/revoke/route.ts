/**
 * /api/me/consent/revoke — Revocacion granular consent (Plan 01-10 Task 1).
 *
 * POST {product_code} -> UPDATE consent.revoked_at = now() for the matching
 * active consent row + audit `consent_revoked` + (downstream) blocks future
 * INSERT item_response on sensitive instruments via assertConsentActive
 * guard from Plan 01-07.
 *
 * Whitelist STRICT Zod schema:
 *  - product_code: enum 'free' | 'paid' | 'b2b' | 'ikigai'.
 *  - .strict() rejects unknown fields (including user_id — COMPL-17).
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Consent revocation" lines 1224-1248 (verbatim).
 *  - 01-PATTERNS.md §2.4.
 *  - lib/consent/guard.ts (downstream gate that enforces revocation).
 *  - COMPL-08.
 */
import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import { writeAudit } from "@/lib/audit/writer";
import { logger } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import { getUserFromJWT } from "@/lib/tenant/jwt";

export const runtime = "nodejs";

const PRODUCT_CODES = ["free", "paid", "b2b", "ikigai"] as const;

export const POST_BODY_SCHEMA = z
  .object({
    product_code: z.enum(PRODUCT_CODES),
  })
  .strict();

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

export async function POST(req: Request): Promise<Response> {
  let jwtUser;
  try {
    jwtUser = await getUserFromJWT(req);
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  const userId = jwtUser.userId;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = POST_BODY_SCHEMA.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "invalid_body",
        message: "Body must be { product_code: 'free'|'paid'|'b2b'|'ikigai' }",
      },
      { status: 400 },
    );
  }

  const productCode = parsed.data.product_code;
  const admin = getSupabaseAdminClient();
  const now = new Date().toISOString();

  const { error: upErr, count } = await (admin.from("consent") as AnyBuilder)
    .update({ revoked_at: now }, { count: "exact" })
    .eq("user_id", userId)
    .eq("product_code", productCode)
    .is("revoked_at", null);

  if (upErr) {
    logger.error(
      { code: upErr.code, message: upErr.message },
      "consent_revoke_failed",
    );
    return NextResponse.json(
      { error: "revoke_failed" },
      { status: 500 },
    );
  }

  await writeAudit(admin, {
    actor_id: userId,
    actor_role: "authenticated",
    action: "consent_revoked",
    entity_type: "consent",
    entity_id: productCode,
    meta: { product_code: productCode, rows_affected: count ?? 0 },
  });

  return NextResponse.json({ ok: true, product_code: productCode });
}
