/**
 * CI lint gate ADR-009 §9.1 + §9.3 — single-caller defense-in-depth.
 *
 * The two SECURITY DEFINER functions
 *   - `public.anonymize_user_audit(uuid)` (migration 009)
 *   - `public.delete_user_account(uuid)`   (migration 010)
 * bypass the immutable audit_log trigger (004) and cross the
 * public/auth schema boundary respectively. They are GRANTed EXECUTE
 * only to `service_role`, but a future code change could quietly add
 * a new route handler that instantiates the service-role Supabase
 * client and invokes either RPC. The GRANT would not catch that.
 *
 * This grep gate is defense-in-depth: it asserts that the only files
 * referencing these two function names (under `lib/` or `app/`) are
 * the legitimate callers — the DELETE /api/me/data route handler
 * (Bearer / API path) AND the deleteAccountAction Server Action
 * (cookie / form-UI path) — both invoking the same atomic RPC. If
 * Phase 2 ever needs a third caller (e.g., a cron job), the lint trip
 * forces an explicit ADR + an addition to the `ALLOWED` set below.
 *
 * Heuristic: `git grep` is conservative — it matches the literal
 * function name anywhere (including inside string literals). A FP
 * is preferable to a FN here (UI-SPEC §8.4 pattern). The conservative
 * grep is exactly the point: if you mention these names anywhere in
 * `lib/` or `app/`, you should be aware why.
 *
 * Anchors:
 *  - estado/DECISIONS_LOG.md ADR-009 §9.1 + §9.3.
 *  - supabase/migrations/009_anonymize_user_audit.sql.
 *  - supabase/migrations/010_delete_user_account.sql.
 *  - 01-PLAN-01-12.md threat_model T-01-12-05.
 */
import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

const FORBIDDEN_OUTSIDE = ["lib/", "app/"];
const ALLOWED = new Set([
  // API path — Bearer-authenticated route handler.
  "app/api/me/data/route.ts",
  // UI form path — cookie-authenticated Server Action invoked from the
  // /me/delete page modal (UI-SPEC §7.8 click 2).
  "app/(account)/me/delete/actions.ts",
]);

describe("audit-modification-callers — single caller gate", () => {
  for (const fn of ["anonymize_user_audit", "delete_user_account"]) {
    it(`solo los callers ALLOWED invocan ${fn}`, () => {
      let out = "";
      try {
        out = execFileSync(
          "git",
          ["grep", "-l", "--", fn, ...FORBIDDEN_OUTSIDE],
          { encoding: "utf8" },
        ).trim();
      } catch (err) {
        // git grep exits 1 when no matches are found. Treat as empty.
        const status = (err as { status?: number }).status;
        if (status === 1) {
          out = "";
        } else {
          throw err;
        }
      }
      const callers = out ? out.split("\n") : [];
      const unexpected = callers.filter((p) => !ALLOWED.has(p));
      expect(
        unexpected,
        `${fn} called from forbidden path(s): ${unexpected.join(", ")}`,
      ).toEqual([]);
    });
  }
});
