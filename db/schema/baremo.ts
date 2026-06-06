// Plugin catalog: baremos (QUAL-06 fallback CO -> MX -> INTL).
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";

export const baremo = pgTable("baremo", {
  id: uuid("id").primaryKey().defaultRandom(),
  instrumentVersionId: uuid("instrument_version_id")
    .notNull()
    .references(() => instrumentVersion.id),
  // population check ('CO','MX','INTL') enforced at SQL migration level
  population: text("population").notNull(),
  // type check ('percentil','ECDF','ipsativa') enforced at SQL migration level
  type: text("type").notNull(),
  referenceData: jsonb("reference_data"),
});
