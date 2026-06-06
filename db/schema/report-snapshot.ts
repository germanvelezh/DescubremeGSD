// Report snapshot — persisted html_payload at-time-of-completion (D3.6).
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { assessmentSession } from "./assessment-session";
import { instrumentVersion } from "./instrument-version";
import { user } from "./user";

export const reportSnapshot = pgTable("report_snapshot", {
  id: uuid("id").primaryKey().defaultRandom(),
  // D1.5 cascade — report deleted with user
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => assessmentSession.id),
  instrumentVersionId: uuid("instrument_version_id")
    .notNull()
    .references(() => instrumentVersion.id),
  narrativeVersion: text("narrative_version").notNull(),
  occupationSetVersion: text("occupation_set_version").notNull(),
  htmlPayload: jsonb("html_payload").notNull(),
  renderedAt: timestamp("rendered_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  // Phase 4 tenancy — null in Phase 1, FK added via ALTER TABLE in migration 006
  organizationId: uuid("organization_id"),
});
