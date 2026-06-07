/**
 * Server Actions — /me/data (Plan 01-10 Task 2).
 *
 * `updateProfileAction(prev, formData)` applies the same whitelist contract
 * as PATCH /api/me/data: {name?, country_code?} only. Anti-fraud DOB +
 * psychometric integrity + auth-flow email are enforced server-side
 * before any DB write.
 *
 * Auth flow: Server Actions cannot pass a Bearer header, so this action
 * uses the SSR Supabase client (`getSupabaseServerClient`) which is
 * cookie-bound and resolves `auth.uid()`. If unauthenticated -> redirect
 * to `/signup`.
 *
 * Audit: same writeAudit call as the Route Handler path; this action and
 * the Route Handler are two surfaces of the same conceptual operation
 * (one cookie-bound for in-app form submit, one Bearer for programmatic
 * /api consumers).
 *
 * Anchors:
 *  - 01-PATTERNS.md row 2 (Server Action vs Route Handler).
 *  - 01-UI-SPEC.md §7.7.
 *  - lib/i18n/microcopy/es-CO/account.ts.
 */
"use server";

import { redirect } from "next/navigation";

import { writeAudit } from "@/lib/audit/writer";
import { encryptPII } from "@/lib/crypto/pii";
import { account } from "@/lib/i18n/microcopy/es-CO/account";
import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

export interface UpdateProfileResult {
  ok: boolean;
  message: string;
}

export async function updateProfileAction(
  _prev: UpdateProfileResult | null,
  formData: FormData,
): Promise<UpdateProfileResult> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const country = (formData.get("country_code") as string | null)?.trim() ?? "";

  // Re-validate against the whitelist (defense in depth over PATCH schema).
  // The form CANNOT submit dob / email / item_responses; HTML form fields
  // are bound to the allowed inputs only.
  const update: Record<string, unknown> = {};
  const admin = getSupabaseAdminClient();

  try {
    if (name.length > 0 && name.length <= 120) {
      const enc = await encryptPII(name, `user_id:${user.id}`);
      // mig 011 (Plan 01-12): persist the full EncryptedField envelope
      // verbatim. ADR-009 §9.4 closes [BUG-PII-STORAGE-PLAN-07].
      update.name_encrypted = enc;
    }
    if (/^[A-Z]{2,3}$/.test(country)) {
      update.country_code = country;
    }

    if (Object.keys(update).length === 0) {
      return { ok: true, message: account.MC_ACCOUNT_SAVED };
    }

    const { error } = await (admin.from("user") as AnyBuilder)
      .update(update)
      .eq("id", user.id);
    if (error) {
      logger.error(
        { code: error.code, message: error.message },
        "updateProfileAction_failed",
      );
      return { ok: false, message: account.MC_ACCOUNT_SAVE_ERROR };
    }

    await writeAudit(admin, {
      actor_id: user.id,
      actor_role: "authenticated",
      action: "user_data_patch",
      entity_type: "user",
      entity_id: user.id,
      meta: { fields: Object.keys(update) },
    });

    return { ok: true, message: account.MC_ACCOUNT_SAVED };
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "updateProfileAction_exception",
    );
    return { ok: false, message: account.MC_ACCOUNT_SAVE_ERROR };
  }
}
