/**
 * CI lint gate COMPL-16 — every CREATE POLICY enforces `auth.uid()` + `to authenticated`.
 *
 * Scans `supabase/migrations/*.sql` and `db/migrations/*.sql` for
 * `CREATE POLICY` statements. For every own-data policy verifies:
 *
 *   - `(select auth.uid()) is not null`  — defense-in-depth against
 *     unauthenticated bypass via stale JWT (RLS performance pattern).
 *   - `to authenticated`                  — explicit role pinning so a
 *     misconfigured `anon` role can't trip the policy.
 *
 * Catalog public-read policies are exempt from those two checks: they
 * intentionally serve both `anon` and `authenticated`, with `USING (true)`.
 * The exemption is detected structurally (policy body contains `to anon`
 * AND `using (true)`), not by name allowlist — so any new public-read
 * catalog table that follows the same shape is auto-recognized.
 *
 * Per RESEARCH §RLS: jsonb operators inside policies must be wrapped
 * with `(select auth.jwt())` for plan caching. This gate does NOT enforce
 * that; a separate `rls-jsonb-wrap.test.ts` can land later. Phase 1
 * scope here is the surface MOST critical to Pitfall 2.2/2.3.
 *
 * Comments (`-- ...`) are stripped before matching so policy-explaining
 * docstrings don't false-positive or false-negative.
 *
 * Additional plan-locked assertions (Plan 01-04 Task 2):
 *
 *   - migration 003 has the COMPL-03 consent gate in own_item_response_insert
 *     (cross-joins consent.consent_sensitive_data + instrument.sensitivity);
 *   - migration 002 schedules the pg_cron cleanup job for anonymous sessions;
 *   - migration 006 enables RLS on organization/membership/entitlement WITHOUT
 *     adding any CREATE POLICY for them (default DENY until Phase 4).
 *
 * Skip semantics: when no migration directories exist (pre-Plan-01-04), the
 * test passes vacuously. From Wave 1 onward this gate is live.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";

const PROJECT_ROOT = join(__dirname, "..", "..");

const MIGRATION_DIRS = ["supabase/migrations", "db/migrations"];

interface PolicyViolation {
  file: string;
  policyName: string;
  missing: string[];
}

/**
 * Strip SQL line comments. Block comments not handled (project convention
 * uses `--` per SKELETON.md `db/migrations`).
 */
function stripComments(sql: string): string {
  return sql
    .split("\n")
    .map((line) => {
      const idx = line.indexOf("--");
      return idx >= 0 ? line.slice(0, idx) : line;
    })
    .join("\n");
}

/**
 * Extract each `CREATE POLICY ... ;` block. Naive but sufficient: policies
 * cannot legally contain a semicolon outside a string literal in their body,
 * and the migrations in this codebase do not use SQL strings inside
 * USING/WITH CHECK clauses.
 */
function extractPolicies(
  sql: string,
): Array<{ name: string; body: string }> {
  const policies: Array<{ name: string; body: string }> = [];
  const cleaned = stripComments(sql);
  const re =
    /create\s+policy\s+(?:"([^"]+)"|([a-z0-9_]+))[\s\S]*?;/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cleaned)) !== null) {
    const name = (m[1] ?? m[2] ?? "<unnamed>") as string;
    policies.push({ name, body: m[0] });
  }
  return policies;
}

function readMigration(name: string): string | null {
  for (const dir of MIGRATION_DIRS) {
    const fullPath = join(PROJECT_ROOT, dir, name);
    if (existsSync(fullPath)) return readFileSync(fullPath, "utf8");
  }
  return null;
}

describe("COMPL-16: every CREATE POLICY enforces auth.uid() + role pinning", () => {
  test("Test 2 — policies in migrations are well-formed (catalog public-read exempt)", () => {
    const violations: PolicyViolation[] = [];

    for (const dir of MIGRATION_DIRS) {
      const fullDir = join(PROJECT_ROOT, dir);
      if (!existsSync(fullDir)) continue;

      for (const entry of readdirSync(fullDir, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.endsWith(".sql")) continue;
        const filePath = join(fullDir, entry.name);
        const rel = relative(PROJECT_ROOT, filePath);
        const content = readFileSync(filePath, "utf8");

        for (const policy of extractPolicies(content)) {
          const body = policy.body.toLowerCase();

          // Public-read catalog policy: serves anon + uses USING (true).
          // Skip auth.uid() / to authenticated checks for those.
          const isPublicRead =
            /\bto\s+anon\b/.test(body) && /\busing\s*\(\s*true\s*\)/.test(body);
          if (isPublicRead) continue;

          const missing: string[] = [];

          if (!/\(\s*select\s+auth\.uid\(\)\s*\)\s+is\s+not\s+null/.test(body)) {
            missing.push("(select auth.uid()) is not null");
          }
          if (!/\bto\s+authenticated\b/.test(body)) {
            missing.push("to authenticated");
          }

          if (missing.length > 0) {
            violations.push({
              file: rel,
              policyName: policy.name,
              missing,
            });
          }
        }
      }
    }

    if (violations.length > 0) {
      const formatted = violations
        .map(
          (v) =>
            `  ${v.file} :: policy "${v.policyName}" missing: ${v.missing.join(", ")}`,
        )
        .join("\n");
      throw new Error(`RLS policy syntax violations (COMPL-16):\n${formatted}`);
    }

    expect(violations).toEqual([]);
  });

  test("Test 3 — migration 003 has COMPL-03 consent gate in own_item_response_insert", () => {
    const sql = readMigration("003_rls_policies.sql");
    if (!sql) {
      console.log("[skip] 003_rls_policies.sql not present yet");
      return;
    }
    const policies = extractPolicies(sql);
    const insertPolicy = policies.find(
      (p) => p.name === "own_item_response_insert",
    );
    expect(insertPolicy, "own_item_response_insert policy missing").toBeDefined();

    const body = (insertPolicy?.body ?? "").toLowerCase();
    // COMPL-03: must cross-reference consent.consent_sensitive_data AND instrument.sensitivity
    expect(body).toMatch(/consent_sensitive_data/);
    expect(body).toMatch(/sensitivity/);
    // Must reference the consent table and the instrument table
    expect(body).toMatch(/\bpublic\.consent\b/);
    expect(body).toMatch(/\bpublic\.instrument\b/);
  });

  test("Test 4 — migration 002 schedules pg_cron cleanup for anonymous sessions (D2.2)", () => {
    const sql = readMigration("002_user_data.sql");
    if (!sql) {
      console.log("[skip] 002_user_data.sql not present yet");
      return;
    }
    const cleaned = stripComments(sql).toLowerCase();
    expect(cleaned).toMatch(
      /cron\.schedule\s*\(\s*'cleanup-expired-anonymous-sessions'/,
    );
    // The cron body must delete only anonymous expired sessions
    expect(cleaned).toMatch(/user_id\s+is\s+null/);
    expect(cleaned).toMatch(/expires_at\s*<\s*now\(\)/);
  });

  test("Test 5 — migration 006 enables RLS on organization/membership/entitlement WITHOUT CREATE POLICY", () => {
    const sql = readMigration("006_aggregate_view_placeholder.sql");
    if (!sql) {
      console.log("[skip] 006_aggregate_view_placeholder.sql not present yet");
      return;
    }
    const cleaned = stripComments(sql).toLowerCase();

    // All three tables must enable RLS
    for (const tbl of ["organization", "membership", "entitlement"]) {
      const re = new RegExp(
        `alter\\s+table\\s+public\\.${tbl}\\s+enable\\s+row\\s+level\\s+security`,
      );
      expect(cleaned, `RLS not enabled on ${tbl}`).toMatch(re);
    }

    // No CREATE POLICY in this migration (default DENY until Phase 4)
    const policies = extractPolicies(sql);
    expect(policies).toEqual([]);
  });
});
