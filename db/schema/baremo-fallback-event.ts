// QUAL-08 telemetry: baremo fallback events (Plan 01-08, Wave 5).
//
// No `user_id` column by design (T-01-08-02 Information Disclosure
// mitigation). Service-role writes only; RLS denies anon + authenticated.
// See supabase/migrations/008_baremo_fallback_event.sql for the SQL contract.
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { instrumentVersion } from "./instrument-version";

export const baremoFallbackEvent = pgTable("baremo_fallback_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  instrumentVersionId: uuid("instrument_version_id")
    .notNull()
    .references(() => instrumentVersion.id),
  countryRequested: text("country_requested").notNull(),
  // baremo_used check ('CO','MX','INTL') enforced at SQL migration level
  baremoUsed: text("baremo_used").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
