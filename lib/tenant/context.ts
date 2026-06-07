/**
 * Tenant context helper — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * `getOrgContext(supabase)` reads the current JWT's `app_metadata.org_ids`
 * via Supabase Auth. Phase 1 always returns `{ orgIds: [] }` because the
 * Auth Hook injects an empty array for B2C users. Phase 4 will populate
 * from JWT app_metadata.org_ids for B2B members.
 *
 * Anchors:
 * - 01-RESEARCH.md §"2. RLS domain" — `auth.jwt() -> 'app_metadata' -> 'org_ids'`.
 * - supabase/migrations/005_jwt_auth_hook.sql.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface OrgContext {
  orgIds: string[];
}

export async function getOrgContext(
  supabase: SupabaseClient,
): Promise<OrgContext> {
  // Phase 4 will populate from JWT app_metadata.org_ids.
  // For Phase 1 we still wire the read path so callers don't need to
  // change when Phase 4 lands — the empty array short-circuits any
  // org-scoped query without changing the API.
  const { data } = await supabase.auth.getUser();
  if (!data?.user) return { orgIds: [] };
  const appMeta = (data.user.app_metadata ?? {}) as { org_ids?: unknown };
  const orgIds = Array.isArray(appMeta.org_ids)
    ? (appMeta.org_ids as unknown[]).filter(
        (id): id is string => typeof id === "string",
      )
    : [];
  return { orgIds };
}
