-- PERMA-Profiler scoring_rule seed — DescubreMe Phase 2 Wave 4 (Plan 02-11).
--
-- Inserts 9 scoring_rule rows — one per reported dimension. Each formula is
-- `mean` over the dimension's items on the 0-10 scale, with reverse_keyed EMPTY
-- (pack §4: PERMA has zero reverse items). scale=[0,10].
--   - 5 PERMA dimensions (3 items each): P, E, R, M, A
--   - N (negative emotion, 3 items), H (health, 3 items)
--   - Lon (loneliness, 1 item), hap (global happiness, 1 item)
-- (Butler & Kern 2016, p. 16 scoring: each subscale = mean of its items, 0-10.)
--
-- item_codes use the POSITIONAL <dimension><ordinal> scheme score-session.ts
-- synthesizes (ordinal = rank within dim by sequence_number; see items.sql).
-- Single-item dims yield Lon1 / hap1.
--
-- mean formula: lib/scoring/formulas/mean.ts delegates to sumFormula then
-- divides by item_codes.length. With reverse_keyed=[] no recode happens, so the
-- result is the plain arithmetic mean of the raw 0-10 values. The QUAL-03
-- fixture (tests/unit/scoring/perma-fixture.test.ts) pins these means.
--
-- PERMA_total (mean of the 16 items P1-P3,E1-E3,R1-R3,M1-M3,A1-A3,hap1) and
-- N_mean are AGGREGATE score-level inputs the distress detector's `moderate`
-- eval computes from the per-dimension means; they are NOT separate scoring_rule
-- rows (the report renders the 9 dimensions above). The `moderate` thresholds
-- live in instrument-version.sql distress_thresholds.
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, dimension).
--
-- N = "Emocion negativa" psychometric dimension; the report frames high N as a
-- care message (NOT a clinical label, D-D.4) — see narrative seed. The dimension
-- CODE stays N so the distress_thresholds keys (N1/N3) resolve consistently.
--
-- Anchors:
--   - implementation_packs/PERMA-Profiler_..._Consolidado.md §1.3 (scoring: mean
--     per dimension, 0-10, zero reverse).
--   - lib/scoring/types.ts (MeanFormulaSchema), lib/scoring/formulas/mean.ts.
--   - db/seeds/instruments/{BFI-2-S,ONET-IP-SF}/scoring-rule.sql (idempotent).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'PERMA-Profiler'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.scoring_rule (instrument_version_id, dimension, formula, scoring_version)
SELECT v.version_id, 'P',
  '{"type":"mean","item_codes":["P1","P2","P3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'P')
UNION ALL
SELECT v.version_id, 'E',
  '{"type":"mean","item_codes":["E1","E2","E3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'E')
UNION ALL
SELECT v.version_id, 'R',
  '{"type":"mean","item_codes":["R1","R2","R3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'R')
UNION ALL
SELECT v.version_id, 'M',
  '{"type":"mean","item_codes":["M1","M2","M3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'M')
UNION ALL
SELECT v.version_id, 'A',
  '{"type":"mean","item_codes":["A1","A2","A3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'A')
UNION ALL
SELECT v.version_id, 'N',
  '{"type":"mean","item_codes":["N1","N2","N3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'N')
UNION ALL
SELECT v.version_id, 'H',
  '{"type":"mean","item_codes":["H1","H2","H3"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'H')
UNION ALL
SELECT v.version_id, 'Lon',
  '{"type":"mean","item_codes":["Lon1"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'Lon')
UNION ALL
SELECT v.version_id, 'hap',
  '{"type":"mean","item_codes":["hap1"],"reverse_keyed":[],"scale":[0,10]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'hap');

COMMIT;
