// Distress event — NFR-28 trail (D1.5 anonymizable).
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";
import { user } from "./user";

export const distressEvent = pgTable("distress_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  // D1.5 anonymize — preserve audit shape after user delete
  userId: uuid("user_id").references(() => user.id, { onDelete: "set null" }),
  instrumentVersionId: uuid("instrument_version_id")
    .notNull()
    .references(() => instrumentVersion.id),
  thresholdTriggered: text("threshold_triggered").notNull(),
  // action_taken check ('disclaimer_shown','contention_route_shown','follow_up_dispatched')
  actionTaken: text("action_taken").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
