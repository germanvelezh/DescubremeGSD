// Waitlist — opt-in email for upcoming paid products (FREE-X new D3.4).
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  // PATTERNS §4 decision: plain text — lowest sensitivity, opt-in public
  email: text("email").notNull(),
  joinedAt: timestamp("joined_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  source: text("source").notNull().default("free_complete"),
  interest: text("interest").notNull().default("paid"),
});
