/**
 * Consent guard — defensa en profundidad sobre el RLS gate (COMPL-03).
 *
 * `assertConsentActive(supabase, userId, productCode, sensitivity)` reads
 * the active consent row for the (user, product) pair and throws a
 * `Response` with the appropriate HTTP status code if any precondition
 * fails. Used by `/api/respond` and any Server Action that writes
 * `item_response` / `computed_score`.
 *
 * Decision matrix:
 *  - No row found → 403 (consent required).
 *  - `consent_general = false` → 403 (general consent required).
 *  - `sensitivity = 'high'` and `consent_sensitive_data = false` → 403.
 *  - `consent_version` older than current registry → 412 (version
 *    outdated, re-prompt required per D1.4).
 *
 * The function is verbatim from 01-RESEARCH.md §7 lines 1198-1221 with
 * one adaptation: the Supabase client is passed in (rather than imported
 * as a module global) so unit tests can stub it via the shared mock from
 * `tests/setup.ts`. The contract is otherwise identical.
 *
 * Threat-register coverage:
 *  - T-01-07-07 (Tampering): bypass of dual-checkbox via client manipulation
 *    is rejected here at the API boundary even if Zod schemas were stripped.
 *
 * Anchors:
 *  - 01-RESEARCH.md §7 lines 1198-1221 (verbatim).
 *  - 01-PATTERNS.md §3.2 (defensa profundidad over RLS).
 *  - 01-CONTEXT.md D1.4 (version check), D1.6 (metadata).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  CURRENT_CONSENT_VERSIONS,
  type ProductCode,
  semverLt,
} from "./versions";

export type ConsentSensitivity = "low" | "normal" | "high";

/**
 * Asserts that the user has an active, current consent row for the
 * given product. Throws a `Response` with status 403 (missing/insufficient)
 * or 412 (stale version) when the assertion fails. Returns void on success.
 *
 * The thrown `Response` is intended to be re-thrown from Route Handlers
 * as the HTTP response. Server Actions should catch and translate to
 * the action's error shape.
 */
export async function assertConsentActive(
  supabase: SupabaseClient,
  userId: string,
  productCode: ProductCode,
  sensitivity: ConsentSensitivity = "normal",
): Promise<void> {
  const { data, error } = await supabase
    .from("consent")
    .select(
      "consent_general, consent_sensitive_data, consent_version, revoked_at",
    )
    .eq("user_id", userId)
    .eq("product_code", productCode)
    .is("revoked_at", null)
    .maybeSingle();

  if (error) {
    // Treat DB error as missing consent (deny by default).
    throw new Response("Consent lookup failed", { status: 403 });
  }
  if (!data) {
    throw new Response("Consent required", { status: 403 });
  }

  const row = data as {
    consent_general: boolean;
    consent_sensitive_data: boolean;
    consent_version: string;
    revoked_at: string | null;
  };

  if (!row.consent_general) {
    throw new Response("Consent (general) required", { status: 403 });
  }
  if (sensitivity === "high" && !row.consent_sensitive_data) {
    throw new Response("Sensitive data consent required", { status: 403 });
  }
  const currentVersion = CURRENT_CONSENT_VERSIONS[productCode];
  if (semverLt(row.consent_version, currentVersion)) {
    throw new Response("Consent version outdated", { status: 412 });
  }
}
