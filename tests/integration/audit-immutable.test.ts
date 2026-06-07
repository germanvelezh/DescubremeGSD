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
import {
  ZERO_HASH,
  chainHash,
  formatPgTimestamp,
} from "@/lib/audit/chain-hash";

const DATABASE_URL = process.env.DATABASE_URL;

// pg is a transitive dep of drizzle-kit. We import lazily inside the test
// so the module never loads when DATABASE_URL is absent (keeps the unit
// run free of optional native bindings).
type PgClient = {
  query: (sql: string, params?: unknown[]) => Promise<{ rows: Array<Record<string, unknown>> }>;
  end: () => Promise<void>;
};

let client: PgClient | null = null;

async function getClient(): Promise<PgClient | null> {
  if (!DATABASE_URL) return null;
  if (client) return client;
  // dynamic import — only resolves when DATABASE_URL is set
  const { Client } = await import("pg").catch(() => ({ Client: null as never }));
  if (!Client) return null;
  const c = new Client({ connectionString: DATABASE_URL });
  await c.connect();
  client = c as unknown as PgClient;
  return client;
}

afterAll(async () => {
  if (client) await client.end();
});

describe("audit_log triggers (migration 004)", () => {
  test.skipIf(!DATABASE_URL)(
    "Test 3 — UPDATE on audit_log raises 'audit_log is append-only'",
    async () => {
      const c = await getClient();
      if (!c) return;

      const actor = "33333333-3333-3333-3333-333333333333";
      await c.query(
        `insert into public.audit_log (actor_id, actor_role, action, entity_type, entity_id)
         values ($1, 'system', 'test_update_blocked', 'test', 'e-update')`,
        [actor],
      );

      await expect(
        c.query(
          `update public.audit_log set action = 'tampered' where action = 'test_update_blocked'`,
        ),
      ).rejects.toThrow(/audit_log is append-only/);
    },
  );

  test.skipIf(!DATABASE_URL)(
    "Test 4 — DELETE on audit_log raises 'audit_log is append-only'",
    async () => {
      const c = await getClient();
      if (!c) return;

      await c.query(
        `insert into public.audit_log (actor_id, actor_role, action, entity_type, entity_id)
         values (null, 'system', 'test_delete_blocked', 'test', 'e-delete')`,
      );

      await expect(
        c.query(
          `delete from public.audit_log where action = 'test_delete_blocked'`,
        ),
      ).rejects.toThrow(/audit_log is append-only/);
    },
  );

  test.skipIf(!DATABASE_URL)(
    "Test 5 — 3 INSERTs chain: this_hash[i] = sha256(this_hash[i-1] || row_i)",
    async () => {
      const c = await getClient();
      if (!c) return;

      // Use a unique entity_type to scope the read back from the chain.
      const tag = `chain-${Date.now()}`;

      const inserted = [];
      for (let i = 0; i < 3; i++) {
        const { rows } = await c.query(
          `insert into public.audit_log
             (actor_id, actor_role, action, entity_type, entity_id)
           values
             (null, 'system', 'chain_test', $1, $2)
           returning id,
                     actor_id,
                     action,
                     entity_type,
                     entity_id,
                     occurred_at::text as occurred_at_text,
                     encode(prev_hash, 'hex') as prev_hex,
                     encode(this_hash, 'hex') as this_hex`,
          [tag, `entity-${i}`],
        );
        inserted.push(rows[0]);
      }

      // Each row's prev_hash must equal the previous row's this_hash.
      for (let i = 1; i < inserted.length; i++) {
        expect(inserted[i].prev_hex).toBe(inserted[i - 1].this_hex);
      }

      // The TS mirror must reproduce each this_hash exactly. We re-derive
      // using the values Postgres returned (actor null, occurred_at::text,
      // etc.) so the comparison isolates the algorithm.
      let prev: Uint8Array | null = null;
      for (const row of inserted) {
        const expected = chainHash(prev ?? ZERO_HASH, {
          actor_id: (row.actor_id as string | null) ?? null,
          action: row.action as string,
          entity_type: row.entity_type as string,
          entity_id: row.entity_id as string,
          occurred_at: row.occurred_at_text as string,
        });
        expect(row.this_hex).toBe(Buffer.from(expected).toString("hex"));
        prev = expected;
      }

      // Silence unused-import in skip path
      void formatPgTimestamp;
    },
  );
});
