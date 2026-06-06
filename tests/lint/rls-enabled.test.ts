/**
 * CI lint gate COMPL-15 — every public.* table has RLS enabled.
 *
 * Connects to a local Supabase Postgres via `DATABASE_URL` and queries
 * `pg_tables` joined with `pg_class` to find tables in schema `public`
 * where `relrowsecurity = false`. Expects an empty result set.
 *
 * Skip semantics: when `DATABASE_URL` is absent (CI without a DB up,
 * developer running unit tests only), the test skips with a clear
 * message instead of failing. Wave 5 CI workflow brings a Supabase
 * container up before this suite so the gate fires in the merge path.
 *
 * After Plan 01-04: migrations 001 + 002 + 003 + 006 (catalog + user_data
 * + RLS policies + Phase 4 placeholder) all `ALTER TABLE ... ENABLE ROW
 * LEVEL SECURITY` on every public table they create. Once a local DB is
 * available, this test should report zero offenders.
 *
 * Why not pg_catalog directly: `pg_tables.rowsecurity` is the view
 * column we trust per Supabase docs. The join with `pg_class.relkind`
 * filters out partitioned table parents that don't enforce RLS at the
 * parent level (Phase 1 has none, but defensive against future schema).
 */
import { describe, test, expect } from "vitest";

const SKIP_REASON =
  "tests/lint/rls-enabled.test.ts requires DATABASE_URL pointing at a local Supabase Postgres";

describe("COMPL-15: every public.* table has RLS enabled", () => {
  test("pg_tables shows no public tables with rowsecurity=false", async () => {
    if (!process.env.DATABASE_URL) {
      // Skip when no local DB is available (Wave 0 default).
      console.log(`[skip] ${SKIP_REASON}`);
      return;
    }

    // Lazy import so unit-only test runs don't pay the postgres driver cost.
    const { default: postgres } = await import("postgres");
    const sql = postgres(process.env.DATABASE_URL, { max: 1 });

    try {
      const rows = await sql<Array<{ schemaname: string; tablename: string }>>`
        SELECT t.schemaname, t.tablename
        FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        JOIN pg_namespace n ON n.oid = c.relnamespace AND n.nspname = t.schemaname
        WHERE t.schemaname = 'public'
          AND c.relkind = 'r'
          AND c.relrowsecurity = false
        ORDER BY t.tablename;
      `;

      if (rows.length > 0) {
        const offenders = rows
          .map((r) => `  ${r.schemaname}.${r.tablename}`)
          .join("\n");
        throw new Error(
          `RLS missing on the following tables (COMPL-15). Add ENABLE ROW LEVEL SECURITY in a migration.\n${offenders}`,
        );
      }

      expect(rows).toEqual([]);
    } finally {
      await sql.end();
    }
  });
});
