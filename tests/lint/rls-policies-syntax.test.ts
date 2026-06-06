/**
 * CI lint gate COMPL-16 — every CREATE POLICY enforces `auth.uid()` + `to authenticated`.
 *
 * Scans `supabase/migrations/*.sql` and `db/migrations/*.sql` for
 * `CREATE POLICY` statements. For each policy, verifies that the
 * statement body contains BOTH:
 *
 *   - `(select auth.uid()) is not null`  — defense-in-depth against
 *     unauthenticated bypass via stale JWT (RLS performance pattern).
 *   - `to authenticated`                  — explicit role pinning so a
 *     misconfigured `anon` role can't trip the policy.
 *
 * Per RESEARCH §RLS: jsonb operators inside policies must be wrapped
 * with `(select auth.jwt())` for plan caching. This gate does NOT enforce
 * that; a separate `rls-jsonb-wrap.test.ts` can land later. Phase 1
 * scope here is the surface MOST critical to Pitfall 2.2/2.3.
 *
 * Comments (`-- ...`) are stripped before matching so policy-explaining
 * docstrings don't false-positive or false-negative.
 *
 * Skip semantics: when no migration directories exist (Wave 0 default,
 * pre-Plan-01-04), the test passes vacuously. Wave 1+ adds migrations
 * and this gate starts catching mis-authored policies.
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

describe("COMPL-16: every CREATE POLICY enforces auth.uid() + role pinning", () => {
  test("policies in supabase/migrations and db/migrations are well-formed", () => {
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
});
