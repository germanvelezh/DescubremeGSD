-- O*NET IP-SF scoring_rule seed — DescubreMe Phase 1 Wave 5 (Plan 01-08).
--
-- Inserts 6 scoring_rule rows, one per RIASEC dimension (R, I, A, S, E, C).
-- Each formula is `sum-per-dimension` over the 10 items of that dim, with
-- reverse_keyed=[] (Pack §4: O*NET IP-SF has NO reverse items because
-- it is a preference instrument with uniform semantic direction).
--
-- IDEMPOTENT: scopes via NOT EXISTS on (instrument_version_id, dimension).
-- Safe to re-run.
--
-- Anchors:
--   - implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md §3 + §4.
--   - 01-RESEARCH.md lineas 985-996 (verbatim DSL contract).
--   - 01-PATTERNS.md §2.5.
--   - lib/scoring/types.ts (ScoringFormulaSchema shape).
--
-- The item_codes use the canonical R1..R10/I1..I10/.../C1..C10 codes.
-- Items in the `item` table do NOT yet have an `item_code` column — the
-- mapping from formula.item_codes to item.id is resolved at scoring time
-- via item.dimension + item.sequence_number ordered by version. The
-- /api/score route handler builds the Map<itemCode, raw_value> from the
-- session item_response rows.

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'ONET-IP-SF'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.scoring_rule (instrument_version_id, dimension, formula, scoring_version)
SELECT v.version_id, 'R',
  '{"type":"sum","item_codes":["R1","R2","R3","R4","R5","R6","R7","R8","R9","R10"],"reverse_keyed":[],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'R'
)
UNION ALL
SELECT v.version_id, 'I',
  '{"type":"sum","item_codes":["I1","I2","I3","I4","I5","I6","I7","I8","I9","I10"],"reverse_keyed":[],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'I'
)
UNION ALL
SELECT v.version_id, 'A',
  '{"type":"sum","item_codes":["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10"],"reverse_keyed":[],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'A'
)
UNION ALL
SELECT v.version_id, 'S',
  '{"type":"sum","item_codes":["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10"],"reverse_keyed":[],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'S'
)
UNION ALL
SELECT v.version_id, 'E',
  '{"type":"sum","item_codes":["E1","E2","E3","E4","E5","E6","E7","E8","E9","E10"],"reverse_keyed":[],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'E'
)
UNION ALL
SELECT v.version_id, 'C',
  '{"type":"sum","item_codes":["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10"],"reverse_keyed":[],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'C'
);

COMMIT;
