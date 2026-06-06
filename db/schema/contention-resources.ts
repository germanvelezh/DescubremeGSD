// NFR-28 contention routes (seeded D1.7, public catalog).
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const contentionResources = pgTable("contention_resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryCode: text("country_code").notNull(),
  // type check ('crisis_line','mental_health','gender_violence','emergency')
  type: text("type").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  url: text("url"),
  descriptionEsCo: text("description_es_co").notNull(),
  hours: text("hours"),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }).notNull(),
});
