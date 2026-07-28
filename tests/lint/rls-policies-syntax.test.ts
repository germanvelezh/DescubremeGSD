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
 * Semantica de ausencia: si falta una de las migraciones que estas
 * aserciones nombran, el gate **FALLA** (`requireMigration`). Hasta el
 * 2026-07-28 pasaba vacuamente — una acomodacion de pre-Plan-01-04 que
 * sobrevivio a su razon y dejaba el gate verde justo cuando desaparecia lo
 * que vigila. Ver `requireMigration` abajo.
 *
 * El Test 2 tenia la MISMA semantica por otra via: barre directorios y afirma
 * sobre un acumulador de violaciones, asi que con cero directorios, cero .sql
 * o cero policies pasaba habiendo verificado nada — sin necesidad de que
 * faltara ninguna migracion nombrada. Cierra con `policiesChecked > 0`. Son
 * dos mecanismos distintos de la misma familia, tabulada en
 * `estado/DECISIONS_LOG.md` — ADR-039 y su extension.
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

/**
 * Lee una migracion que este gate DEBE poder verificar. Si falta, FALLA.
 *
 * Antes cada test abria con `if (!sql) { console.log("[skip] ..."); return; }`,
 * y eso hacia que **el gate se pusiera verde exactamente cuando desaparecia lo
 * que vigila**: renombrar o borrar la migracion no rompia nada, el archivo
 * reportaba `passed` (vitest cuenta un `return` como *passed*, no como
 * *skipped*) y el criterio se quedaba sin vigilante en silencio.
 *
 * `Por que existia:` era una acomodacion deliberada de pre-Plan-01-04, cuando
 * las migraciones todavia no estaban. El propio docstring del archivo declaraba
 * "from Wave 1 onward this gate is live" — la acomodacion **sobrevivio a su
 * razon** y quedo afirmando en prosa una vigilancia que el codigo no ejercia.
 * Es el defecto de QUAL-08 otra vez: documentacion que promete un chequeo que
 * no ocurre.
 *
 * `Verificado por inyeccion:` renombrando `003_rls_policies.sql`, este archivo
 * reportaba `4 passed`. Con el throw, se pone rojo y nombra el criterio que
 * quedaria descubierto.
 *
 * Anchors:
 *   - estado/DECISIONS_LOG.md ADR-039 (la familia del pase vacuo).
 *   - tests/lint/no-hollow-tests.test.ts (gate 16, que declara NO cubrir este
 *     genero: son cuerpos con `expect()` reales que pueden no alcanzarlos).
 */
function requireMigration(name: string, criterio: string): string {
  const sql = readMigration(name);
  if (!sql) {
    throw new Error(
      `${name} no existe en ${MIGRATION_DIRS.join(" ni ")}. Este gate no puede ` +
        `verificar ${criterio} sin esa migracion. Si el archivo se renombro, ` +
        `actualiza el nombre aca; si se borro, el criterio quedo sin vigilante ` +
        `y hay que decidir que lo cubre.`,
    );
  }
  return sql;
}

describe("COMPL-16: every CREATE POLICY enforces auth.uid() + role pinning", () => {
  test("Test 2 — policies in migrations are well-formed (catalog public-read exempt)", () => {
    const violations: PolicyViolation[] = [];
    // Cuantas policies pasaron REALMENTE por las reglas de abajo. Ver la
    // asercion de no-vacuidad al cierre del test.
    let policiesChecked = 0;

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

          policiesChecked++;
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

    // No-vacuidad. `expect(violations).toEqual([])` es una asercion
    // incondicional y CORRECTA, pero se evalua sobre un acumulador: con cero
    // directorios, cero .sql o cero policies queda vacio y el test pasa
    // habiendo verificado nada. Verificado por inyeccion: apuntando
    // MIGRATION_DIRS a directorios inexistentes, este test reportaba
    // `1 passed`.
    //
    // Es otro mecanismo de la familia del pase vacuo, y NO lo cubre el gate
    // 16 —el detector de `no-hollow-tests.test.ts`—, que busca
    // *ausencia de asercion sustantiva* — aca la asercion existe; lo vacio es
    // el INSUMO. Un contador basta para las tres fuentes de vacuidad, porque
    // las tres terminan en cero policies examinadas.
    expect(policiesChecked).toBeGreaterThan(0);
  });

  test("Test 3 — migration 003 has COMPL-03 consent gate in own_item_response_insert", () => {
    const sql = requireMigration(
      "003_rls_policies.sql",
      "el consent gate COMPL-03 en own_item_response_insert",
    );
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
    const sql = requireMigration(
      "002_user_data.sql",
      "el pg_cron cleanup de sesiones anonimas (D2.2)",
    );
    const cleaned = stripComments(sql).toLowerCase();
    expect(cleaned).toMatch(
      /cron\.schedule\s*\(\s*'cleanup-expired-anonymous-sessions'/,
    );
    // The cron body must delete only anonymous expired sessions
    expect(cleaned).toMatch(/user_id\s+is\s+null/);
    expect(cleaned).toMatch(/expires_at\s*<\s*now\(\)/);
  });

  test("Test 5 — migration 006 enables RLS on organization/membership/entitlement WITHOUT CREATE POLICY", () => {
    const sql = requireMigration(
      "006_aggregate_view_placeholder.sql",
      "el RLS de organization/membership/entitlement sin CREATE POLICY",
    );
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
