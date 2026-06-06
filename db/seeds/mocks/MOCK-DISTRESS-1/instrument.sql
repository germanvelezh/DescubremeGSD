-- MOCK fixture — NEVER deployed to production.
-- Used by tests/integration/ethics-middleware.test.ts (COMPL-12 / COMPL-13).
--
-- Single-item instrument flagged with `ethical_flags.emotional_distress = true`
-- and `sensitivity = 'high'` so that loading + responding triggers the NFR-27
-- distress hook + the NFR-28 contention route. Exists ONLY in db/seeds/mocks/.
--
-- Schema target: instrument + instrument_version + item. No scoring rule
-- because the NFR-27/28 middleware fires BEFORE scoring is invoked
-- (PATTERNS §1.6: ethics-middleware short-circuits scoring on distress).
--
-- The CI gate in Plan 01-12 verifies db/seeds/instruments/ never contains
-- a code starting with MOCK- (T-01-03-01 mitigation).

BEGIN;

INSERT INTO instrument (code, sensitivity, ethical_flags, created_at)
VALUES (
  'MOCK-DISTRESS-1',
  'high',
  '{"emotional_distress": true}'::jsonb,
  now()
);

INSERT INTO instrument_version (instrument_code, version, item_count, likert_min, likert_max, created_at)
VALUES ('MOCK-DISTRESS-1', '1.0', 1, 1, 5, now());

INSERT INTO item (instrument_code, instrument_version, item_code, dimension, position, stem_es_co)
VALUES (
  'MOCK-DISTRESS-1',
  '1.0',
  'DISTRESS.1',
  'DISTRESS',
  1,
  'Item dummy para activar el hook de bienestar emocional NFR-27 en tests de integracion.'
);

COMMIT;
