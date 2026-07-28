/**
 * Integration tests for migration 004 audit triggers.
 *
 * Requires a live Postgres reachable via `process.env.DATABASE_URL` with
 * migrations 001-004 applied. Skips gracefully when DATABASE_URL is unset
 * so unit-only CI runs (and contributors without a local DB) stay green.
 *
 * Tests assert three things the trigger pair guarantees:
 *   3. UPDATE on audit_log raises 'audit_log is append-only'.
 *   4. DELETE on audit_log raises the same exception.
 *   5. Three consecutive INSERTs chain: this_hash[i] = sha256(this_hash[i-1] || row_i).
 *
 * NOTE: The REVOKE on update/delete/truncate is the first line of defense.
 * In test runs we connect as a role with full privileges (e.g. postgres
 * superuser) so the BEFORE UPDATE/DELETE trigger is what gets exercised.
 * In production the REVOKE blocks the statement before it ever reaches
 * the trigger. Both layers are tested: REVOKE via `tests/lint/...` static
 * grep, trigger via this file.
 */
import { afterAll, describe, expect, test } from "vitest";
import { chainHash } from "@/lib/audit/chain-hash";

const DATABASE_URL = process.env.DATABASE_URL;

// El driver es `postgres` (postgres.js), dependencia declarada del repo.
//
// HISTORIA, porque explica por que estos 3 tests nunca corrieron: este archivo
// importaba `pg` describiendolo como "transitive dep of drizzle-kit". **`pg` no
// esta instalado.** El import iba envuelto en
// `.catch(() => ({ Client: null }))` y cada test abria con `if (!c) return;`,
// asi que la resolucion fallaba en silencio y los 3 salian **verdes sin tocar
// ninguna DB** — verificado apuntando DATABASE_URL a un host inexistente.
//
// De ahi las dos reglas que este archivo ahora respeta:
//   1. El import va SIN `.catch()`. Tragarse un fallo de resolucion es como se
//      fabrica un pase vacuo.
//   2. No hay `if (!c) return;`. La compuerta es `skipIf(!DATABASE_URL)`, que
//      declara el test **skipped**; un retorno temprano lo declara **passed**.
//      La diferencia entre "ausente" y "presente" es justo lo que ADR-039
//      documenta.
//
// El import sigue siendo lazy para que una corrida unit-only no pague el driver.
type Sql = ReturnType<typeof import("postgres").default>;

let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(DATABASE_URL as string, { max: 1 });
  return sql;
}

afterAll(async () => {
  if (sql) {
    await sql.end();
    sql = null;
  }
});

describe("audit_log triggers (migration 004)", () => {
  test.skipIf(!DATABASE_URL)(
    "Test 3 — UPDATE on audit_log raises 'audit_log is append-only'",
    async () => {
      const s = await getSql();

      const actor = "33333333-3333-3333-3333-333333333333";
      await s`insert into public.audit_log (actor_id, actor_role, action, entity_type, entity_id)
              values (${actor}, 'system', 'test_update_blocked', 'test', 'e-update')`;

      await expect(
        s`update public.audit_log set action = 'tampered' where action = 'test_update_blocked'`,
      ).rejects.toThrow(/audit_log is append-only/);
    },
  );

  test.skipIf(!DATABASE_URL)(
    "Test 4 — DELETE on audit_log raises 'audit_log is append-only'",
    async () => {
      const s = await getSql();

      await s`insert into public.audit_log (actor_id, actor_role, action, entity_type, entity_id)
              values (null, 'system', 'test_delete_blocked', 'test', 'e-delete')`;

      await expect(
        s`delete from public.audit_log where action = 'test_delete_blocked'`,
      ).rejects.toThrow(/audit_log is append-only/);
    },
  );

  test.skipIf(!DATABASE_URL)(
    "Test 5 — 3 INSERTs chain: this_hash[i] = sha256(this_hash[i-1] || row_i)",
    async () => {
      const s = await getSql();

      // Use a unique entity_type to scope the read back from the chain.
      const tag = `chain-${Date.now()}`;

      const inserted: Array<Record<string, unknown>> = [];
      for (let i = 0; i < 3; i++) {
        const rows = await s`
          insert into public.audit_log
            (actor_id, actor_role, action, entity_type, entity_id)
          values
            (null, 'system', 'chain_test', ${tag}, ${`entity-${i}`})
          returning id,
                    actor_id,
                    action,
                    entity_type,
                    entity_id,
                    occurred_at::text as occurred_at_text,
                    encode(prev_hash, 'hex') as prev_hex,
                    encode(this_hash, 'hex') as this_hex`;
        inserted.push(rows[0]);
      }

      // Each row's prev_hash must equal the previous row's this_hash.
      for (let i = 1; i < inserted.length; i++) {
        expect(inserted[i].prev_hex).toBe(inserted[i - 1].this_hex);
      }

      // The TS mirror must reproduce each this_hash exactly. We re-derive
      // using the values Postgres returned (actor null, occurred_at::text,
      // etc.) so the comparison isolates the algorithm.
      //
      // EL ESPEJO SE SIEMBRA CON EL prev_hash REAL, NO CON ZERO_HASH.
      //
      // El trigger encadena contra la ULTIMA fila de `audit_log`
      // (`order by id desc limit 1`, e `id` es bigint, o sea cronologico), no
      // contra cero. Sembrar con `ZERO_HASH` solo seria correcto en una tabla
      // vacia, y para cuando corre este test los Tests 3 y 4 ya insertaron sus
      // filas — verificado: el `prev_hash` de la primera fila de la cadena NO
      // es cero.
      //
      // Ese era el defecto, y sobrevivio porque la asercion de encadenamiento
      // de arriba recorre i = 1, 2 y **nunca mira la fila 0**, que es
      // exactamente la que cargaba la suposicion falsa. Sembrando con el
      // prev_hash que el trigger uso, el test ademas deja de depender del
      // orden de ejecucion dentro del archivo.
      let prev: Uint8Array = Buffer.from(inserted[0].prev_hex as string, "hex");
      for (const row of inserted) {
        const expected = chainHash(prev, {
          actor_id: (row.actor_id as string | null) ?? null,
          action: row.action as string,
          entity_type: row.entity_type as string,
          entity_id: row.entity_id as string,
          occurred_at: row.occurred_at_text as string,
        });
        expect(row.this_hex).toBe(Buffer.from(expected).toString("hex"));
        prev = expected;
      }
    },
  );
});
