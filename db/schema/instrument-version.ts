// Plugin catalog: versioned instrument (FOUND-02, semver + psychometric status).
import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { instrument } from "./instrument";

export const instrumentVersion = pgTable("instrument_version", {
  id: uuid("id").primaryKey().defaultRandom(),
  instrumentId: uuid("instrument_id")
    .notNull()
    .references(() => instrument.id),
  version: text("version").notNull(),
  lang: text("lang").notNull().default("es-CO"),
  itemCount: integer("item_count"),
  likertMin: integer("likert_min"),
  likertMax: integer("likert_max"),
  psychometricStatus: jsonb("psychometric_status"),
  planBRef: text("plan_b_ref"),
  visualType: text("visual_type"),
  centeringStrategy: text("centering_strategy"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
