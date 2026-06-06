// User entity (PII envelope encryption D4.2, multi-tenant forward).
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { bytea } from "./_types";

export const user = pgTable("user", {
  // matches auth.users.id (Supabase Auth)
  id: uuid("id").primaryKey(),
  email: text("email").notNull().unique(),
  // sha256 deterministic search hash for post-encryption lookups
  emailLookupHash: text("email_lookup_hash"),
  // envelope encryption per D4.2 — payload ciphertext
  nameCiphertext: bytea("name_ciphertext"),
  // envelope encryption per D4.2 — DEK ciphertext alongside payload
  nameDekCiphertext: bytea("name_dek_ciphertext"),
  dateOfBirthCiphertext: bytea("date_of_birth_ciphertext"),
  dateOfBirthDekCiphertext: bytea("date_of_birth_dek_ciphertext"),
  countryCode: text("country_code").notNull().default("CO"),
  lang: text("lang").notNull().default("es-CO"),
  deleted: boolean("deleted").notNull().default(false),
  // Phase 4 tenancy — null in Phase 1, FK added via ALTER TABLE in migration 006
  organizationId: uuid("organization_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
