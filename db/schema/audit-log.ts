/**
 * audit_log — append-only event ledger with SHA-256 chain hash.
 *
 * Anchors:
 * - 01-RESEARCH.md §"Audit log domain" (verbatim DDL).
 * - 01-PATTERNS.md §1.7 (Audit log + chain hash pattern).
 * - 01-CONTEXT.md D1.5 — on user delete: ANONYMIZE (not cascade). The
 *   delete-user routine nulls `actor_id` rather than removing rows.
 * - COMPL-09 (audit append-only + chain integrity).
 *
 * Write path: only via `lib/audit/writer.ts`. RLS revokes UPDATE/DELETE/
 * TRUNCATE to every role (including service_role) and a BEFORE UPDATE/DELETE
 * trigger raises an exception; defense-in-depth so direct SQL access cannot
 * tamper with the ledger.
 *
 * Phase 1 actions logged (RESEARCH §6 "Que loguear"): consent_granted,
 * consent_revoked, user_data_export, user_data_patch, user_account_delete,
 * disclaimer_acknowledged, distress_event_created, read_item_response.
 *
 * The trigger fills prev_hash + this_hash; writer.ts MUST NOT set them.
 */
import { sql } from "drizzle-orm";
import {
  bigint,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { bytea } from "./_types";

export const auditLog = pgTable("audit_log", {
  // bigint identity — append-only, monotonic id. Generated ALWAYS so even
  // service_role cannot override the sequence (paired with REVOKE UPDATE).
  id: bigint("id", { mode: "bigint" })
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  occurred_at: timestamp("occurred_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  // null for system / cron actions; actor_role discriminates.
  actor_id: uuid("actor_id"),
  // 'authenticated' | 'service_role' | 'system' — enforced by writer.ts types.
  actor_role: text("actor_role").notNull(),
  action: text("action").notNull(),
  entity_type: text("entity_type").notNull(),
  entity_id: text("entity_id").notNull(),
  // meta MUST NOT contain PII. Pino redact + writer.ts contract enforce.
  meta: jsonb("meta"),
  // prev_hash + this_hash filled by audit_log_chain_hash trigger.
  prev_hash: bytea("prev_hash"),
  this_hash: bytea("this_hash"),
});
