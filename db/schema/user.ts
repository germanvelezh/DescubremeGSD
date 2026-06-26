// User entity (PII envelope encryption D4.2, multi-tenant forward).
//
// Migration 011 (Plan 01-12) replaced the four legacy bytea PII columns
// (`{name,date_of_birth}_{ciphertext,dek_ciphertext}`) with two `jsonb`
// columns that persist the full `EncryptedField` envelope verbatim:
// `{v, kid, edk, iv, ct, tag}` per lib/crypto/pii.ts. This closes
// [BUG-PII-STORAGE-PLAN-07] (ADR-009 §9.4) — `decryptPII` can now
// recompose values end-to-end (GET /api/me/data no longer degrades
// DOB/name to null).
import { boolean, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import type { EncryptedField } from "@/lib/crypto/pii";

export const user = pgTable("user", {
  // matches auth.users.id (Supabase Auth)
  id: uuid("id").primaryKey(),
  email: text("email").notNull().unique(),
  // sha256 deterministic search hash for post-encryption lookups
  emailLookupHash: text("email_lookup_hash"),
  // envelope encryption per D4.2 + ADR-009 §9.4 — full EncryptedField
  // shape persisted as jsonb (replaces 4 columnas bytea legacy).
  nameEncrypted: jsonb("name_encrypted").$type<EncryptedField | null>(),
  dateOfBirthEncrypted: jsonb("date_of_birth_encrypted").$type<EncryptedField | null>(),
  countryCode: text("country_code").notNull().default("CO"),
  // Level-of-preparation inputs for the O*NET Job Zone filter (migration 016,
  // ADR-027). Standard Ley 1581 data, plaintext like country_code (NOT
  // special-category). Allowed values validated by Zod at capture. NOTE: this is
  // the user's SCHOOLING — distinct from occupation.education_level (Job Zone).
  educationLevel: text("education_level"),
  careerStage: text("career_stage"),
  lang: text("lang").notNull().default("es-CO"),
  deleted: boolean("deleted").notNull().default(false),
  // Phase 4 tenancy — null in Phase 1, FK added via ALTER TABLE in migration 006
  organizationId: uuid("organization_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
