// Item response — raw_value preserved untransformed (FOUND-03).
import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { assessmentSession } from "./assessment-session";
import { item } from "./item";
import { user } from "./user";

export const itemResponse = pgTable("item_response", {
  id: uuid("id").primaryKey().defaultRandom(),
  // null pre-claim (FOUND-08); D1.5 cascade once user_id set
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
  // D1.5 cascade — response deleted with session
  sessionId: uuid("session_id")
    .notNull()
    .references(() => assessmentSession.id, { onDelete: "cascade" }),
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id),
  rawValue: integer("raw_value").notNull(),
  respondedAt: timestamp("responded_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  // Phase 4 tenancy — null in Phase 1, FK added via ALTER TABLE in migration 006
  organizationId: uuid("organization_id"),
});

// Partial unique index `(user_id, item_id) WHERE user_id IS NOT NULL`
// declared in supabase/migrations/002_user_data.sql (drizzle-kit 0.27 does
// not emit partial unique constraints from TS-side directly for this pattern).
