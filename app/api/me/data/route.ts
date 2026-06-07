/**
 * /api/me/data — Derechos del titular Ley 1581 (Plan 01-10 Task 1).
 *
 * GET     -> COMPL-05 derecho de consulta (export JSON with attachment header).
 * PATCH   -> COMPL-06 derecho de rectificacion (whitelist {name, country_code}).
 * DELETE  -> COMPL-07 derecho de supresion + D1.5 cascade vs anonimizar.
 *
 * Auth: every method derives user.id from `getUserFromJWT(req)` — the
 * Authorization Bearer header verified against Supabase Auth. COMPL-17
 * forbids reading user_id from request body anywhere on this endpoint.
 *
 * Audit: every method calls `writeAudit` with a stable action id. The
 * audit row is inserted via the same chain as all other events
 * (migration 004 BEFORE INSERT trigger fills prev_hash + this_hash).
 *
 * Architectural notes:
 *  - This file uses the SERVICE-ROLE Supabase client for writes. RLS on
 *    public.user/consent/item_response/etc. allows the OWNER to delete
 *    via own-data policies (migration 003), but DELETE-cascade chain +
 *    the SECURITY DEFINER RPC require predictable bypass — and the
 *    handler verifies user.id from JWT BEFORE every DB call, so the
 *    COMPL-17 invariant holds.
 *  - `import 'server-only'` blocks accidental client import.
 *  - The Edge runtime is forbidden (`runtime: 'nodejs'`) because
 *    decryptPII relies on `node:crypto` and PostgreSQL transactions
 *    via the service-role client are not Edge-compatible at the
 *    cascade scale we orchestrate here.
 *
 * PII storage (Plan 01-12 mig 011 closure):
 *  Migration 011 replaced the four legacy bytea PII columns with two
 *  jsonb columns persisting the full `EncryptedField` envelope verbatim
 *  (`{v, kid, edk, iv, ct, tag}`). GET now calls `decryptPII` end-to-end;
 *  the graceful degradation path described in earlier versions of this
 *  file is gone — `name_encrypted` / `date_of_birth_encrypted` round-trip
 *  cleanly. ADR-009 §9.4 + closes [BUG-PII-STORAGE-PLAN-07].
 *
 * DELETE atomicity (Plan 01-12 mig 010 closure):
 *  Migration 010 emitted `public.delete_user_account(uuid)` SECURITY
 *  DEFINER that executes anonymize + DELETE public.user + DELETE
 *  auth.users in a SINGLE Postgres transaction. The handler invokes it
 *  via `.rpc('delete_user_account', ...)` — no more two-phase orphan
 *  risk. ADR-009 §9.3 + closes [GAP-DELETE-ATOMIC-TX].
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Derechos del titular" lines 1250-1274.
 *  - 01-CONTEXT.md D1.5 (BORRAR vs ANONIMIZAR).
 *  - 01-PATTERNS.md §2.4.
 *  - supabase/migrations/009_anonymize_user_audit.sql (the helper).
 *  - supabase/migrations/010_delete_user_account.sql (the atomic RPC).
 *  - supabase/migrations/011_pii_storage_full_envelope.sql (jsonb shape).
 *  - estado/DECISIONS_LOG.md ADR-009 §9.3 + §9.4.
 *  - COMPL-05/06/07/10/17.
 */
import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import { writeAudit } from "@/lib/audit/writer";
import { decryptPII, encryptPII, type EncryptedField } from "@/lib/crypto/pii";
import { logger } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import { getUserFromJWT } from "@/lib/tenant/jwt";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// PATCH whitelist — STRICT Zod schema (COMPL-06 rectificacion).
// ---------------------------------------------------------------------------
// Allowed: {name?, country_code?}.
// Rejected (explicit anti-fraud / psychometric integrity / scope):
//  - date_of_birth   -> anti-fraud age verification (must contact support)
//  - email           -> must use auth flow (re-verify ownership)
//  - password        -> not an editable field on this endpoint
//  - item_responses  -> psychometric integrity (FOUND-03)
//  - computed_score  -> integrity
//  - consent_general / consent_sensitive_data -> via /me/consent/revoke only
// Zod `.strict()` makes any unknown key a validation error.
export const PATCH_BODY_SCHEMA = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    country_code: z.string().trim().regex(/^[A-Z]{2,3}$/).optional(),
  })
  .strict();

export type PatchBody = z.infer<typeof PATCH_BODY_SCHEMA>;

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

// ---------------------------------------------------------------------------
// GET — derecho de consulta (COMPL-05)
// ---------------------------------------------------------------------------
export async function GET(req: Request): Promise<Response> {
  let jwtUser;
  try {
    jwtUser = await getUserFromJWT(req);
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  const userId = jwtUser.userId;
  const admin = getSupabaseAdminClient();

  // Audit the export BEFORE reading — defensive: a crash mid-export still
  // leaves a trace that the export was requested.
  try {
    await writeAudit(admin, {
      actor_id: userId,
      actor_role: "authenticated",
      action: "user_data_export",
      entity_type: "user",
      entity_id: userId,
    });
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "user_data_export_audit_failed",
    );
    return NextResponse.json({ error: "audit_failed" }, { status: 500 });
  }

  // Read user + related entities. RLS policies (migration 003) scope each
  // SELECT to own data; the service-role client bypasses RLS, so we add
  // explicit WHERE clauses keyed on userId for defense-in-depth (T-01-10-02).
  const [
    userRes,
    itemResponsesRes,
    computedScoresRes,
    consentsRes,
    auditLogsRes,
    reportSnapshotsRes,
  ] = await Promise.all([
    (admin.from("user") as AnyBuilder).select("*").eq("id", userId).maybeSingle(),
    (admin.from("item_response") as AnyBuilder)
      .select("*")
      .eq("user_id", userId),
    (admin.from("computed_score") as AnyBuilder)
      .select("*")
      .eq("user_id", userId),
    (admin.from("consent") as AnyBuilder).select("*").eq("user_id", userId),
    (admin.from("audit_log") as AnyBuilder)
      .select("*")
      .eq("actor_id", userId),
    (admin.from("report_snapshot") as AnyBuilder)
      .select("*")
      .eq("user_id", userId),
  ]);

  if (userRes.error || !userRes.data) {
    return NextResponse.json({ error: "user_not_found" }, { status: 404 });
  }

  // Decrypt PII fields — mig 011 closed [BUG-PII-STORAGE-PLAN-07].
  // `name_encrypted` and `date_of_birth_encrypted` persist the full
  // EncryptedField envelope, so decryptPII round-trips end-to-end.
  // If a row is null (signup did not write the field, or rectification
  // never set name), return null — that's a legitimate absent value,
  // not the bug case.
  const userRow = userRes.data as Record<string, unknown>;
  const aad = `user_id:${userId}`;

  let nameOut: string | null = null;
  const nameEnc = userRow.name_encrypted as EncryptedField | null;
  if (nameEnc) {
    try {
      nameOut = await decryptPII(nameEnc, aad);
    } catch (e) {
      logger.error(
        { err: e instanceof Error ? e.message : String(e) },
        "user_data_export_decrypt_name_failed",
      );
      return NextResponse.json({ error: "decrypt_failed" }, { status: 500 });
    }
  }

  let dobOut: string | null = null;
  const dobEnc = userRow.date_of_birth_encrypted as EncryptedField | null;
  if (dobEnc) {
    try {
      dobOut = await decryptPII(dobEnc, aad);
    } catch (e) {
      logger.error(
        { err: e instanceof Error ? e.message : String(e) },
        "user_data_export_decrypt_dob_failed",
      );
      return NextResponse.json({ error: "decrypt_failed" }, { status: 500 });
    }
  }

  const userOut = {
    id: userRow.id,
    email: userRow.email,
    name: nameOut,
    date_of_birth: dobOut,
    country_code: userRow.country_code,
    lang: userRow.lang,
    created_at: userRow.created_at,
  };

  const payload = {
    user: userOut,
    item_responses: itemResponsesRes.data ?? [],
    computed_scores: computedScoresRes.data ?? [],
    consents: consentsRes.data ?? [],
    audit_logs: auditLogsRes.data ?? [],
    report_snapshots: reportSnapshotsRes.data ?? [],
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="my-data.json"',
      "Cache-Control": "no-store",
    },
  });
}

// ---------------------------------------------------------------------------
// PATCH — derecho de rectificacion (COMPL-06)
// ---------------------------------------------------------------------------
export async function PATCH(req: Request): Promise<Response> {
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

  const parsed = PATCH_BODY_SCHEMA.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const field = first?.path?.[0] ?? "unknown";
    return NextResponse.json(
      {
        error: "field_not_editable",
        field,
        message: `Field '${String(field)}' is not editable via PATCH /me/data.`,
      },
      { status: 400 },
    );
  }

  const admin = getSupabaseAdminClient();
  const update: Record<string, unknown> = {};

  if (parsed.data.name !== undefined) {
    try {
      const enc = await encryptPII(parsed.data.name, `user_id:${userId}`);
      // mig 011: persist the full EncryptedField envelope verbatim
      // (ADR-009 §9.4).
      update.name_encrypted = enc;
    } catch (e) {
      logger.error(
        { err: e instanceof Error ? e.message : String(e) },
        "user_data_patch_encrypt_failed",
      );
      return NextResponse.json(
        { error: "encrypt_failed" },
        { status: 500 },
      );
    }
  }
  if (parsed.data.country_code !== undefined) {
    update.country_code = parsed.data.country_code;
  }

  if (Object.keys(update).length === 0) {
    // Nothing to update — treat as no-op success.
    return NextResponse.json({ ok: true, updated: 0 }, { status: 200 });
  }

  const { error: upErr } = await (admin.from("user") as AnyBuilder)
    .update(update)
    .eq("id", userId);
  if (upErr) {
    logger.error(
      { code: upErr.code, message: upErr.message },
      "user_data_patch_failed",
    );
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  await writeAudit(admin, {
    actor_id: userId,
    actor_role: "authenticated",
    action: "user_data_patch",
    entity_type: "user",
    entity_id: userId,
    meta: { fields: Object.keys(parsed.data) },
  });

  return NextResponse.json({ ok: true, updated: Object.keys(update).length });
}

// ---------------------------------------------------------------------------
// DELETE — derecho de supresion + D1.5 cascade vs anonimizar (COMPL-07)
// ---------------------------------------------------------------------------
export async function DELETE(req: Request): Promise<Response> {
  let jwtUser;
  try {
    jwtUser = await getUserFromJWT(req);
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  const userId = jwtUser.userId;
  const admin = getSupabaseAdminClient();

  // Step 0: read user.email BEFORE deletion so we can also remove the
  // optional waitlist row keyed on plaintext email (waitlist has no FK
  // to user.id; see deviation in SUMMARY).
  let userEmail: string | null = null;
  const userPre = await (admin.from("user") as AnyBuilder)
    .select("email")
    .eq("id", userId)
    .maybeSingle();
  if (userPre.error) {
    return NextResponse.json({ error: "user_lookup_failed" }, { status: 500 });
  }
  if (userPre.data) {
    userEmail = (userPre.data as { email: string }).email;
  }

  // Step 1: writeAudit BEFORE the atomic RPC so the action is logged
  // with its original actor_id. The RPC's internal anonymize step then
  // sets actor_id=null on prior rows AND appends a
  // `user_data_delete_completed` chain-continuing entry — see
  // supabase/migrations/009 + 010.
  try {
    await writeAudit(admin, {
      actor_id: userId,
      actor_role: "authenticated",
      action: "user_account_delete",
      entity_type: "user",
      entity_id: userId,
    });
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "user_account_delete_audit_failed",
    );
    return NextResponse.json({ error: "audit_failed" }, { status: 500 });
  }

  // Step 2: DELETE waitlist row by email (no FK; documented deviation).
  // Done BEFORE the atomic RPC because waitlist is keyed on plaintext
  // email, not on user.id — once auth.users is gone the email may still
  // be present on waitlist if a user re-joins later, but the original
  // signup's waitlist row should be cleared by the same supresion flow.
  // Fail-soft: a missing waitlist row is fine.
  if (userEmail) {
    const { error: wlErr } = await (admin.from("waitlist") as AnyBuilder)
      .delete()
      .eq("email", userEmail);
    if (wlErr) {
      logger.warn(
        { code: wlErr.code, message: wlErr.message },
        "waitlist_delete_failed",
      );
      // continue — non-blocking
    }
  }

  // Step 3: atomic deletion via mig 010 SECURITY DEFINER RPC.
  // Executes (a) anonymize_user_audit, (b) DELETE public.user
  // (CASCADE FK borra D1.5 BORRAR tables), (c) DELETE auth.users —
  // ALL in a SINGLE Postgres transaction. No orphan possible.
  // Closes [GAP-DELETE-ATOMIC-TX] (ADR-009 §9.3).
  // Cast to AnyBuilder because SupabaseClient generic does not know
  // about the custom `delete_user_account` function (migration 010).
  const { error: deleteError } = await (admin as AnyBuilder).rpc(
    "delete_user_account",
    { target_user_id: userId },
  );
  if (deleteError) {
    logger.error(
      { code: deleteError.code, message: deleteError.message, userId },
      "delete_user_account_rpc_failed",
    );
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  return NextResponse.json(
    { ok: true, redirect: "/me/delete/done" },
    { status: 200 },
  );
}
