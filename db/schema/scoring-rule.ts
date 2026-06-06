// Plugin catalog: scoring rules as data (FOUND-04 DSL).
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";

export const scoringRule = pgTable("scoring_rule", {
  id: uuid("id").primaryKey().defaultRandom(),
  instrumentVersionId: uuid("instrument_version_id")
    .notNull()
    .references(() => instrumentVersion.id),
  dimension: text("dimension").notNull(),
  formula: jsonb("formula").notNull(),
  scoringVersion: text("scoring_version").notNull().default("1.0"),
});
