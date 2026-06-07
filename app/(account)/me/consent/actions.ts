/**
 * Server Action — revokeConsentAction (Plan 01-10 Task 2).
 *
 * Calls the same code path as POST /api/me/consent/revoke but binds
 * via cookie session instead of Bearer header. Returns a small result
 * envelope that the consent page renders inline.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.9.
 *  - app/api/me/consent/revoke/route.ts (sibling Route Handler).
 */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAudit } from "@/lib/audit/writer";
import { account } from "@/lib/i18n/microcopy/es-CO/account";
import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

export interface RevokeConsentResult {
  ok: boolean;
  message: string;
}

const ALLOWED_PRODUCT_CODES = new Set(["free", "paid", "b2b", "ikigai"]);

export async function revokeConsentAction(
  productCode: string,
): Promise<RevokeConsentResult> {
  if (!ALLOWED_PRODUCT_CODES.has(productCode)) {
    return { ok: false, message: account.MC_CONSENT_REVOKE_ERROR };
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  const admin = getSupabaseAdminClient();
  const { error } = await (admin.from("consent") as AnyBuilder)
    .update({ revoked_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("product_code", productCode)
    .is("revoked_at", null);

  if (error) {
    logger.error(
      { code: error.code, message: error.message },
      "revokeConsentAction_failed",
    );
    return { ok: false, message: account.MC_CONSENT_REVOKE_ERROR };
  }

  try {
    await writeAudit(admin, {
      actor_id: user.id,
      actor_role: "authenticated",
      action: "consent_revoked",
      entity_type: "consent",
      entity_id: productCode,
      meta: { product_code: productCode },
    });
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "revokeConsentAction_audit_failed",
    );
    // continue — revocation already persisted
  }

  revalidatePath("/me/consent");
  revalidatePath("/me/data");
  return { ok: true, message: account.MC_CONSENT_REVOKE_SUCCESS };
}
