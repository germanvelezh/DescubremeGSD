// Consent — per-product, semver-versioned, with metadata D1.6.
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";

export const consent = pgTable("consent", {
  id: uuid("id").primaryKey().defaultRandom(),
  // D1.5 cascade — consent deleted with user
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  productCode: text("product_code").notNull(),
  consentVersion: text("consent_version").notNull(),
  textSha256Hash: text("text_sha256_hash").notNull(),
  consentGeneral: boolean("consent_general").notNull(),
  consentSensitiveData: boolean("consent_sensitive_data").notNull(),
  grantedAt: timestamp("granted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  ipTruncated: text("ip_truncated"),
  userAgent: text("user_agent"),
  locale: text("locale").notNull().default("es-CO"),
});

// Partial unique index `(user_id, product_code) WHERE revoked_at IS NULL`
// declared in supabase/migrations/002_user_data.sql.
