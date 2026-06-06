// Occupation catalog seeded LATAM (D3.3 GAP Cowork).
import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const occupation = pgTable(
  "occupation",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    codeOnet: text("code_onet").notNull(),
    nameEsCo: text("name_es_co").notNull(),
    riasecCode: text("riasec_code").notNull(),
    educationLevel: text("education_level"),
  },
  (t) => ({
    codeOnetUnique: uniqueIndex("occupation_code_onet_idx").on(t.codeOnet),
  }),
);
