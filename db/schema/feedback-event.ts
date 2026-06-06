// Feedback event — 1-5 stars + optional free text (D3.4 POLISH-02 input).
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { reportSnapshot } from "./report-snapshot";
import { user } from "./user";

export const feedbackEvent = pgTable("feedback_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  // D1.5 cascade — feedback deleted with user
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
  reportSnapshotId: uuid("report_snapshot_id").references(() => reportSnapshot.id),
  // stars check (>=1 AND <=5) enforced at SQL migration level
  stars: integer("stars").notNull(),
  textFree: text("text_free"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
