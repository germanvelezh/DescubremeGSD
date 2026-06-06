// Narrative templates seeded by RIASEC code (D3.2 GAP Cowork).
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const narrativeTemplate = pgTable("narrative_template", {
  id: uuid("id").primaryKey().defaultRandom(),
  version: text("version").notNull().default("1.0"),
  riasecCode: text("riasec_code").notNull(),
  lang: text("lang").notNull().default("es-CO"),
  // slot check ('top_3_phrase','dimensional_high','dimensional_low')
  slot: text("slot").notNull(),
  templateText: text("template_text").notNull(),
});
