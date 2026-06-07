-- 011_pii_storage_full_envelope.sql — PII storage migrated to jsonb envelope.
--
-- ## Purpose
--
-- Plan 01-04 + 01-07 persisted PII envelope encryption as four bytea
-- columns per encrypted field:
--   user.name_ciphertext            bytea  (== EncryptedField.ct)
--   user.name_dek_ciphertext        bytea  (== EncryptedField.edk)
--   user.date_of_birth_ciphertext   bytea
--   user.date_of_birth_dek_ciphertext bytea
--
-- This shape is insufficient: `EncryptedField` (lib/crypto/pii.ts) is
-- `{v, kid, edk, iv, ct, tag}`. The IV, GCM auth tag, key id, and
-- envelope version are NOT persisted, so `decryptPII` cannot recompose
-- the ciphertext. Plan 01-10 Task 1 discovered this when
-- `GET /api/me/data` was forced to degrade DOB+name to `null` with a
-- `logger.warn` ([BUG-PII-STORAGE-PLAN-07]).
--
-- This migration:
--   1. Adds two `jsonb` columns that store the EncryptedField envelope
--      verbatim: `name_encrypted`, `date_of_birth_encrypted`.
--   2. Wipes any legacy values (safe: no production users exist yet;
--      the legacy bytea blobs are not recoverable into a complete
--      EncryptedField anyway — they lack iv/tag/kid/v).
--   3. Drops the four legacy bytea columns.
--
-- ## Threat note (T-01-12-03 accept)
--
-- The wipe is destructive. Pre-prod is safe because there are zero
-- real users. If this migration is applied AGAINST a database with
-- real users, PII is lost. The Phase 2 deploy procedure MUST include
-- a manual pre-flight check (count users) and ABORT the prod push if
-- count > 0 without an explicit re-encrypt plan. This check is not
-- automatable inside the SQL itself (the migration tool runs us
-- regardless), so it lives in the deploy runbook + ADR-009 §9.4.
--
-- ## ADR-009 §9.4
--
-- Closes [BUG-PII-STORAGE-PLAN-07] (P1 in BACKLOG since 2026-06-07).
--
-- Anchors:
--   - estado/DECISIONS_LOG.md ADR-009 §9.4.
--   - 01-PLAN-01-12.md threat_model T-01-12-03, T-01-12-06.
--   - lib/crypto/pii.ts EncryptedField shape (driver del schema).
--   - 01-CONTEXT.md D4.2.

-- 1. Add new jsonb columns persisting the EncryptedField envelope.
alter table public.user
  add column if not exists name_encrypted jsonb,
  add column if not exists date_of_birth_encrypted jsonb;

-- 2. Wipe any value in the new columns (idempotent; only matters when
--    a re-run lands on populated rows from a partial earlier attempt).
update public.user
   set name_encrypted = null,
       date_of_birth_encrypted = null
 where name_encrypted is not null
    or date_of_birth_encrypted is not null;

-- 3. Drop the four legacy bytea columns (insufficient envelope shape).
alter table public.user
  drop column if exists name_ciphertext,
  drop column if exists name_dek_ciphertext,
  drop column if exists date_of_birth_ciphertext,
  drop column if exists date_of_birth_dek_ciphertext;

comment on column public.user.name_encrypted is
  'EncryptedField jsonb {v, kid, edk, iv, ct, tag} per lib/crypto/pii.ts. '
  'AAD pattern user_id:<id>. Cierra [BUG-PII-STORAGE-PLAN-07]. '
  'ADR-009 §9.4.';

comment on column public.user.date_of_birth_encrypted is
  'EncryptedField jsonb {v, kid, edk, iv, ct, tag} per lib/crypto/pii.ts. '
  'AAD pattern user_id:<id>. Cierra [BUG-PII-STORAGE-PLAN-07]. '
  'ADR-009 §9.4.';
