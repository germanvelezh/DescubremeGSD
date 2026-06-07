/**
 * usage_log — minimal placeholder for Phase 6 analytics.
 *
 * Anchors:
 * - 01-CONTEXT.md D1.5 — on user delete: ANONYMIZE (user_id → null), NOT
 *   cascade. Usage signals survive account deletion for aggregate metrics.
 * - SKELETON.md "Audit" section (usage_log is sibling of audit_log; usage
 *   tracks product engagement, audit tracks compliance events).
 *
 * Phase 1 scope: schema-forward only. No write path, no runtime usage.
 * Phase 6 (POLISH) wires `lib/usage/writer.ts` for product analytics.
 */
import { sql } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usageLog = pgTable("usage_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  // D1.5 anonymize: ON DELETE SET NULL is encoded in the SQL migration,
  // not via Drizzle references() — keeps the schema barrel free of an
  // implicit FK reorder dependency.
  user_id: uuid("user_id"),
  event_type: text("event_type").notNull(),
  meta: jsonb("meta"),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});
