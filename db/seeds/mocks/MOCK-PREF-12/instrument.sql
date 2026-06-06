-- MOCK fixture — NEVER deployed to production.
-- Used by tests/integration/plugin-swap.test.ts (FOUND-06).
--
-- 12 items, 2 dimensions (D1, D2), Likert 1-5, sum formula per dimension.
-- Exists ONLY in db/seeds/mocks/. The migration that loads prod seeds
-- (Plan 01-04 / 001_seed_instruments.sql) explicitly does NOT include
-- this path. CI gate in Plan 01-12 verifies db/seeds/instruments/ never
-- contains a code starting with MOCK-.
--
-- Schema target: instrument + instrument_version + item + scoring_rule.
-- The exact column shape is defined in Plan 01-04 db/schema/. This file
-- uses the canonical column names from RESEARCH §ARCH and SKELETON.md
-- "db/schema". If schema names diverge at execute time, update both
-- this file AND the plugin-swap test in lockstep.

BEGIN;

INSERT INTO instrument (code, sensitivity, ethical_flags, created_at)
VALUES ('MOCK-PREF-12', 'normal', '[]'::jsonb, now());

INSERT INTO instrument_version (instrument_code, version, item_count, likert_min, likert_max, created_at)
VALUES ('MOCK-PREF-12', '1.0', 12, 1, 5, now());

-- D1 dimension items (6 items)
INSERT INTO item (instrument_code, instrument_version, item_code, dimension, position, stem_es_co) VALUES
  ('MOCK-PREF-12', '1.0', 'D1.1', 'D1', 1, 'Item de prueba D1 numero 1'),
  ('MOCK-PREF-12', '1.0', 'D1.2', 'D1', 2, 'Item de prueba D1 numero 2'),
  ('MOCK-PREF-12', '1.0', 'D1.3', 'D1', 3, 'Item de prueba D1 numero 3'),
  ('MOCK-PREF-12', '1.0', 'D1.4', 'D1', 4, 'Item de prueba D1 numero 4'),
  ('MOCK-PREF-12', '1.0', 'D1.5', 'D1', 5, 'Item de prueba D1 numero 5'),
  ('MOCK-PREF-12', '1.0', 'D1.6', 'D1', 6, 'Item de prueba D1 numero 6');

-- D2 dimension items (6 items)
INSERT INTO item (instrument_code, instrument_version, item_code, dimension, position, stem_es_co) VALUES
  ('MOCK-PREF-12', '1.0', 'D2.1', 'D2', 7, 'Item de prueba D2 numero 1'),
  ('MOCK-PREF-12', '1.0', 'D2.2', 'D2', 8, 'Item de prueba D2 numero 2'),
  ('MOCK-PREF-12', '1.0', 'D2.3', 'D2', 9, 'Item de prueba D2 numero 3'),
  ('MOCK-PREF-12', '1.0', 'D2.4', 'D2', 10, 'Item de prueba D2 numero 4'),
  ('MOCK-PREF-12', '1.0', 'D2.5', 'D2', 11, 'Item de prueba D2 numero 5'),
  ('MOCK-PREF-12', '1.0', 'D2.6', 'D2', 12, 'Item de prueba D2 numero 6');

-- Scoring rules: one row per dimension. Formula JSON is consumed by
-- lib/scoring/interpreter.ts (Plan 01-07). The shape MUST match the DSL
-- documented in PATTERNS §1.10 + RESEARCH §5.
INSERT INTO scoring_rule (instrument_code, instrument_version, dimension, formula) VALUES
  (
    'MOCK-PREF-12',
    '1.0',
    'D1',
    '{"type":"sum","item_codes":["D1.1","D1.2","D1.3","D1.4","D1.5","D1.6"],"reverse_keyed":[],"scale":[1,5]}'::jsonb
  ),
  (
    'MOCK-PREF-12',
    '1.0',
    'D2',
    '{"type":"sum","item_codes":["D2.1","D2.2","D2.3","D2.4","D2.5","D2.6"],"reverse_keyed":[],"scale":[1,5]}'::jsonb
  );

COMMIT;
