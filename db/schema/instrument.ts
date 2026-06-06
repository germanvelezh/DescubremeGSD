// Plugin catalog: instrument metadata (FOUND-02).
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const instrument = pgTable("instrument", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  construct: text("construct"),
  // sensitivity check ('low','normal','high') enforced at SQL migration level
  sensitivity: text("sensitivity").notNull().default("normal"),
  ethicalFlags: jsonb("ethical_flags").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
