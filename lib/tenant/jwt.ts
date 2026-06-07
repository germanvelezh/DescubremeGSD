/**
 * Multi-tenant JWT helper — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * `getUserFromJWT(req)` extracts the authenticated user from the
 * incoming Request's Authorization header. It NEVER trusts `user_id`
 * from request body — that's the COMPL-17 invariant.
 *
 * Phase 1: B2C-only. `orgIds` is always `[]` because the Auth Hook
 * (`custom_access_token_hook`, supabase/migrations/005) injects
 * `app_metadata.org_ids = []` for all users. Phase 4 will populate
 * the array for B2B members.
 *
 * Anchors:
 * - 01-RESEARCH.md §"1. Auth domain" lines 833-852.
 * - 01-PATTERNS.md §2.3.
 * - supabase/migrations/005_jwt_auth_hook.sql.
 * - SKELETON.md "Compliance-by-design" (COMPL-17).
 *
 * Throws `Response(401)` when the header is missing or invalid; routes
 * may catch and convert to a JSON 401 envelope. Throwing a Response
 * keeps this helper isomorphic with Server Actions + Route Handlers.
 */
import "server-only";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export interface JwtUser {
  userId: string;
  orgIds: string[];
}

/**
 * Validates the Bearer token from the Authorization header against
 * Supabase Auth. Returns `{ userId, orgIds }` on success. Throws a
 * `Response(401)` on missing/invalid auth.
 */
export async function getUserFromJWT(req: Request): Promise<JwtUser> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.toLowerCase().startsWith("bearer ")) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const jwt = authHeader.slice(7).trim();
  if (jwt.length === 0) {
    throw new Response("Unauthorized", { status: 401 });
  }
  // Verify via Supabase admin (NOT trusting client claims).
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin.auth.getUser(jwt);
  if (error || !data?.user) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const appMeta = (data.user.app_metadata ?? {}) as { org_ids?: unknown };
  const orgIds = Array.isArray(appMeta.org_ids)
    ? (appMeta.org_ids as unknown[]).filter(
        (id): id is string => typeof id === "string",
      )
    : [];
  return { userId: data.user.id, orgIds };
}
