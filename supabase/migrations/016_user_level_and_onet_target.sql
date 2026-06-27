-- 016_user_level_and_onet_target.sql — Phase 02.1 Wave 1 (ADR-027).
--
-- Adds the user "level of preparation" inputs that drive the O*NET occupation
-- recommendation's Job Zone filter, plus the per-report record of which zone
-- filter actually produced the shown occupations.
--
-- WHAT + WHY:
--   1. user.education_level  — the user's HIGHEST SCHOOLING (secundaria |
--      tecnico_tecnologo | pregrado | posgrado). Feeds inferBaseZone()
--      (lib/onet/job-zone.ts).
--   2. user.career_stage     — related work experience (sin_experiencia |
--      junior | semi_senior | senior). Widens the zone ceiling for senior.
--   3. report_snapshot.target_job_zone — the computed target zone text
--      ('1-2' | '3' | '4' | '5') applied when the occupations were selected.
--   4. report_snapshot.explore_intent  — the user's hybrid choice
--      (current | study_more) that fed the ceiling widening.
--
-- NAME-COLLISION WARNING (load-bearing): `occupation.education_level` (migration
-- 001) stores the OCCUPATION's Job Zone, NOT a person's schooling. This new
-- `user.education_level` is the PERSON's schooling. Different tables, different
-- meaning. normalizeZone() runs on the occupation column; inferBaseZone() on the
-- user column. A future P2 migration may rename occupation.education_level ->
-- occupation.job_zone to remove the ambiguity (pack JobZones §4).
--
-- COMPLIANCE (Ley 1581 / CLAUDE.md §8, Gate 2):
--   - These are STANDARD personal data, NOT special-category ("datos sensibles").
--     Stored PLAINTEXT, mirroring user.country_code (migration 001) — the repo
--     enveloped-encrypts only direct identifiers (name, DOB; migration 011).
--   - Captured with explicit, revocable consent + audit log at the capture step
--     (Phase 02.1 Wave 5, microcopy §4). Purpose is bounded: adjust occupation
--     examples only. Right-to-erasure already cascades via the existing user
--     delete path (the columns live on `user`).
--   - Allowed values are enforced at the application boundary (Zod), matching the
--     repo convention (country_code has no DB CHECK either). Column comments
--     document the domain.
--
-- IDEMPOTENT: ADD COLUMN IF NOT EXISTS. Additive only — existing rows get NULL
-- (no occupation recommendation degrades; the selector falls back to RIASEC-only
-- when level data is absent). Safe under `supabase db reset` and re-run.
--
-- Anchors:
--   - estado/DECISIONS_LOG.md ADR-027.
--   - implementation_packs/JobZones_es-CO_Pack_v1.0.md §3-§4.
--   - supabase/migrations/001_*.sql (user, occupation.education_level base).
--   - lib/onet/job-zone.ts; lib/report/occupation-selector.ts.

BEGIN;

ALTER TABLE public."user"
  ADD COLUMN IF NOT EXISTS education_level text,
  ADD COLUMN IF NOT EXISTS career_stage text;

COMMENT ON COLUMN public."user".education_level IS
  'User schooling (Ley 1581 standard data, plaintext): secundaria|tecnico_tecnologo|pregrado|posgrado. NOT the occupation Job Zone. Feeds inferBaseZone().';
COMMENT ON COLUMN public."user".career_stage IS
  'Related work experience (Ley 1581 standard data, plaintext): sin_experiencia|junior|semi_senior|senior. Widens the Job Zone ceiling when senior.';

ALTER TABLE public.report_snapshot
  ADD COLUMN IF NOT EXISTS target_job_zone text,
  ADD COLUMN IF NOT EXISTS explore_intent text;

COMMENT ON COLUMN public.report_snapshot.target_job_zone IS
  'Computed target Job Zone applied when selecting occupations for this report: 1-2|3|4|5 (feb-2026 consolidated scheme).';
COMMENT ON COLUMN public.report_snapshot.explore_intent IS
  'User hybrid exploration choice fed into the zone ceiling: current|study_more.';

COMMIT;
