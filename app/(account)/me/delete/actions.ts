/**
 * Server Action — deleteAccountAction (Plan 01-10 Task 2).
 *
 * Wraps the same transactional flow as DELETE /api/me/data but:
 *  - Resolves auth via cookie (Server Component context, not Bearer).
 *  - On success: signs the user OUT (cookies cleared) and redirects to
 *    /me/delete/done.
 *  - On failure: returns an error result; the modal renders inline.
 *
 * D1.5 BORRAR vs ANONIMIZAR sequence is identical to the Route Handler
 * path. Auth.users delete is best-effort outside the DB tx.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.8 Step 2 -> Step 3.
 *  - app/api/me/data/route.ts DELETE handler (sibling).
 *  - supabase/migrations/009_anonymize_user_audit.sql (RPC).
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

  // Read email for waitlist cleanup BEFORE deletion.
  let userEmail: string | null = null;
  const pre = await (admin.from("user") as AnyBuilder)
    .select("email")
    .eq("id", userId)
    .maybeSingle();
  if (pre.data) userEmail = (pre.data as { email: string }).email;

  try {
    await writeAudit(admin, {
      actor_id: userId,
      actor_role: "authenticated",
      action: "user_account_delete",
      entity_type: "user",
      entity_id: userId,
    });

    const { error: anonErr } = await (admin as AnyBuilder).rpc(
      "anonymize_user_audit",
      { target_user_id: userId },
    );
    if (anonErr) throw new Error(`anonymize: ${anonErr.message}`);

    if (userEmail) {
      await (admin.from("waitlist") as AnyBuilder)
        .delete()
        .eq("email", userEmail);
    }

    const { error: delErr } = await (admin.from("user") as AnyBuilder)
      .delete()
      .eq("id", userId);
    if (delErr) throw new Error(`user delete: ${delErr.message}`);
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "deleteAccountAction_failed",
    );
    return { ok: false, message: deleteCopy.MC_DELETE_ERROR };
  }

  // Best-effort auth delete outside tx. Orphan accepted (Phase 6 cleanup).
  try {
    await admin.auth.admin.deleteUser(userId);
  } catch (e) {
    logger.error(
      {
        userId,
        err: e instanceof Error ? e.message : String(e),
      },
      "auth_delete_user_failed_orphan_left",
    );
  }

  // Sign out the SSR cookie session so the user is no longer authenticated.
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore — cookies will be cleared by Supabase on next request anyway
  }

  redirect("/me/delete/done");
}
