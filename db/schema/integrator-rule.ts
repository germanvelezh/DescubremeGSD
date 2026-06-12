// Declarative teaser/integrator rules as data (D-B.1, FREE-13).
// Mirrors supabase/migrations/014_visual_type_centering_integrator_rule.sql.
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const integratorRule = pgTable("integrator_rule", {
  id: uuid("id").primaryKey().defaultRandom(),
  tier: text("tier").notNull(),
  conditions: jsonb("conditions").notNull(),
  templateId: text("template_id"),
  templateText: text("template_text"),
  requiresDimensions: jsonb("requires_dimensions").notNull(),
  lang: text("lang").notNull(),
  version: text("version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
