// Assessment session — D2.2 anonymous (7d) or authenticated.
import { integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";
import { user } from "./user";

export const assessmentSession = pgTable(
  "assessment_session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // D1.5 cascade — session deleted with user
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
    anonymousSessionId: text("anonymous_session_id"),
    instrumentVersionId: uuid("instrument_version_id")
      .notNull()
      .references(() => instrumentVersion.id),
    // status check ('open','completed','expired') enforced at SQL migration level
    status: text("status").notNull().default("open"),
    progress: integer("progress").notNull().default(0),
    startedAt: timestamp("started_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    // Phase 4 tenancy — null in Phase 1, FK added via ALTER TABLE in migration 006
    organizationId: uuid("organization_id"),
  },
  (t) => ({
    anonymousUnique: uniqueIndex("assessment_session_anonymous_idx").on(
      t.anonymousSessionId,
    ),
  }),
);
