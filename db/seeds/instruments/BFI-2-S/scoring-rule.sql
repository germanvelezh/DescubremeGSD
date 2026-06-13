-- BFI-2-S scoring_rule seed — DescubreMe Phase 2 Wave 4 (Plan 02-09).
--
-- Inserts 5 scoring_rule rows, one per Big Five domain (EXT, AGR, CON, NEG,
-- OPN). Each formula is `sum` over the 6 items of that domain, with the 3
-- reverse-keyed items of the domain listed in `reverse_keyed` (15 reverse
-- total). The interpreter (lib/scoring/formulas/sum.ts) applies
-- applyReverse(raw, scale[0], scale[1]) = (max+min)-raw to the reverse codes
-- before summing (QUAL-04). scale=[1,5] (BFI-2-S Likert 1-5).
--
-- item_codes use the POSITIONAL <dimension><ordinal> scheme that
-- lib/scoring/score-session.ts synthesizes (ordinal = rank within the domain
-- by sequence_number). Mapping (see items.sql):
--   EXT: EXT1(seq1,R) EXT2(seq6) EXT3(seq11) EXT4(seq16) EXT5(seq21,R) EXT6(seq26,R)
--   AGR: AGR1(seq2) AGR2(seq7,R) AGR3(seq12) AGR4(seq17,R) AGR5(seq22) AGR6(seq27,R)
--   CON: CON1(seq3,R) CON2(seq8,R) CON3(seq13) CON4(seq18) CON5(seq23) CON6(seq28,R)
--   NEG: NEG1(seq4) NEG2(seq9) NEG3(seq14,R) NEG4(seq19,R) NEG5(seq24,R) NEG6(seq29)
--   OPN: OPN1(seq5) OPN2(seq10,R) OPN3(seq15) OPN4(seq20,R) OPN5(seq25) OPN6(seq30,R)
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, dimension).
--
-- NEG = "Emocionalidad negativa" psychometric domain; the USER-FACING label is
-- "Sensibilidad emocional" (D-D.4 reframe, applied in the narrative seed). The
-- domain CODE stays NEG so the distress_thresholds keys (instrument-version
-- seed) and any facet scoring resolve consistently.
--
-- Anchors:
--   - implementation_packs/BFI-2-S_..._Consolidado.md §1.1 (domain membership), §4 (reverse key).
--   - dossiers/01_BFI-2_Consolidado.md §scoring (sum of recoded items per domain).
--   - lib/scoring/types.ts (SumFormulaSchema), lib/scoring/formulas/sum.ts.
--   - db/seeds/instruments/ONET-IP-SF/scoring-rule.sql (idempotent pattern).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'BFI-2-S'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.scoring_rule (instrument_version_id, dimension, formula, scoring_version)
SELECT v.version_id, 'EXT',
  '{"type":"sum","item_codes":["EXT1","EXT2","EXT3","EXT4","EXT5","EXT6"],"reverse_keyed":["EXT1","EXT5","EXT6"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'EXT'
)
UNION ALL
SELECT v.version_id, 'AGR',
  '{"type":"sum","item_codes":["AGR1","AGR2","AGR3","AGR4","AGR5","AGR6"],"reverse_keyed":["AGR2","AGR4","AGR6"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'AGR'
)
UNION ALL
SELECT v.version_id, 'CON',
  '{"type":"sum","item_codes":["CON1","CON2","CON3","CON4","CON5","CON6"],"reverse_keyed":["CON1","CON2","CON6"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'CON'
)
UNION ALL
SELECT v.version_id, 'NEG',
  '{"type":"sum","item_codes":["NEG1","NEG2","NEG3","NEG4","NEG5","NEG6"],"reverse_keyed":["NEG3","NEG4","NEG5"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'NEG'
)
UNION ALL
SELECT v.version_id, 'OPN',
  '{"type":"sum","item_codes":["OPN1","OPN2","OPN3","OPN4","OPN5","OPN6"],"reverse_keyed":["OPN2","OPN4","OPN6"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'OPN'
);

COMMIT;
