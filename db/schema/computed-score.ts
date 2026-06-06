// Computed score — scoring output with version trace (Gate 1 trazabilidad).
import { integer, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { baremo } from "./baremo";
import { scoringRule } from "./scoring-rule";
import { user } from "./user";

export const computedScore = pgTable("computed_score", {
  id: uuid("id").primaryKey().defaultRandom(),
  // D1.5 cascade — score deleted with user
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  scoringRuleId: uuid("scoring_rule_id")
    .notNull()
    .references(() => scoringRule.id),
  baremoId: uuid("baremo_id").references(() => baremo.id),
  raw: integer("raw").notNull(),
  normalized: numeric("normalized"),
  band: text("band"),
  scoringVersion: text("scoring_version").notNull(),
  computedAt: timestamp("computed_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  // Phase 4 tenancy — null in Phase 1, FK added via ALTER TABLE in migration 006
  organizationId: uuid("organization_id"),
});
