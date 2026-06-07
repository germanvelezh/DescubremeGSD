/**
 * Server Action — deleteAccountAction (Plan 01-10 Task 2 + Plan 01-12 mig 010 closure).
 *
 * Wraps the same atomic flow as DELETE /api/me/data but:
 *  - Resolves auth via cookie (Server Component context, not Bearer).
 *  - On success: signs the user OUT (cookies cleared) and redirects to
 *    /me/delete/done.
 *  - On failure: returns an error result; the modal renders inline.
 *
 * D1.5 BORRAR vs ANONIMIZAR sequence is now executed atomically by the
 * SECURITY DEFINER RPC `public.delete_user_account(uuid)` (migration
 * 010). The RPC performs anonymize + DELETE public.user + DELETE
 * auth.users inside a SINGLE Postgres transaction — no orphan possible.
 * Closes [GAP-DELETE-ATOMIC-TX] (ADR-009 §9.3) for this UI path too.
 *
 * Single-caller lint (tests/lint/audit-modification-callers.test.ts)
 * lists THIS file alongside `app/api/me/data/route.ts` in the ALLOWED
 * set: the two paths are the only legitimate callers (one for the form
 * UI, one for the API).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.8 Step 2 -> Step 3.
 *  - app/api/me/data/route.ts DELETE handler (sibling API path).
 *  - supabase/migrations/010_delete_user_account.sql (the atomic RPC).
 *  - estado/DECISIONS_LOG.md ADR-009 §9.3.
 */
"use server";

import { redirect } from "next/navigation";

import { writeAudit } from "@/lib/audit/writer";
import { deleteCopy } from "@/lib/i18n/microcopy/es-CO/delete";
import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

export interface DeleteAccountResult {
  ok: boolean;
  message?: string;
}

export async function deleteAccountAction(): Promise<DeleteAccountResult> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  const userId = user.id;
  const admin = getSupabaseAdminClient();

  // Read email for waitlist cleanup BEFORE the atomic RPC. Waitlist has
  // no FK to user.id (keyed on plaintext email), so it lives outside
  // the cascade — clear it as part of the same supresion flow.
  let userEmail: string | null = null;
  const pre = await (admin.from("user") as AnyBuilder)
    .select("email")
    .eq("id", userId)
    .maybeSingle();
  if (pre.data) userEmail = (pre.data as { email: string }).email;

  try {
    // writeAudit BEFORE the atomic RPC so the action is logged with its
    // original actor_id. The RPC's internal anonymize step then sets
    // actor_id=null on prior rows AND appends a
    // `user_data_delete_completed` chain-continuing entry.
    await writeAudit(admin, {
      actor_id: userId,
      actor_role: "authenticated",
      action: "user_account_delete",
      entity_type: "user",
      entity_id: userId,
    });

    // Waitlist cleanup (no FK; documented deviation).
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

    // Atomic deletion: anonymize + DELETE public.user (CASCADE FK
    // borra D1.5 BORRAR tables) + DELETE auth.users — ALL in a
    // SINGLE Postgres transaction. Closes [GAP-DELETE-ATOMIC-TX].
    const { error: deleteError } = await (admin as AnyBuilder).rpc(
      "delete_user_account",
      { target_user_id: userId },
    );
    if (deleteError) {
      throw new Error(`delete_user_account: ${deleteError.message}`);
    }
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e), userId },
      "deleteAccountAction_failed",
    );
    return { ok: false, message: deleteCopy.MC_DELETE_ERROR };
  }

  // Sign out the SSR cookie session so the user is no longer authenticated.
  // auth.users was already deleted atomically inside the RPC; signOut here
  // just clears the local cookie state.
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore — cookies will be cleared by Supabase on next request anyway
  }

  redirect("/me/delete/done");
}
