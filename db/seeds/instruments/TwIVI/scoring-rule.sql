-- TwIVI scoring_rule seed — DescubreMe Phase 2 Wave 4 (Plan 02-10).
--
-- Inserts 10 scoring_rule rows, one per Schwartz basic value (SD/ST/HE/AC/PO/
-- SE/CO/TR/BE/UN). Each formula is `mean` over the 2 items of that value, scale
-- [1,6] (TwIVI 6-pt Likert), reverse_keyed=[] (TwIVI is direct-keyed; MRAT
-- handles within-person scale-use, pack §6.6 / §4 — no reverse items).
--
-- These per-value MEAN rules produce the raw value-level scores (raw_v). The
-- MRAT CENTERING (raw_v − MRAT) + the 10→4 HOV rollup is performed by
-- lib/scoring/mrat.ts, dispatched in score-session.ts via
-- instrument_version.centering_strategy='mrat' + the seeded value_map/hov_map
-- (instrument-version.sql). The MRAT denominator is the FULL 20-item flat vector
-- (Pitfall 3: NEVER computed from these per-value means).
--
-- NO per-HOV baremo seeded (Pitfall 4 / RESEARCH § Critical de-risk): the
-- ValueCircle bands WITHIN-PERSON (sign/magnitude of each HOV's centered score
-- vs the person's own MRAT — their "0"), via lib/scoring/mrat.ts::bandFromMrat,
-- NOT via selectBaremo/shouldShowPercentile. No HOV-level baremo exists even for
-- full PVQ-RR (pack §3.0.5); D-E1.2 "seed the published baremo" does NOT apply
-- at the values HOV report level. Do NOT route the values visual through the
-- percentile-banding path used by BFI-2-S/PERMA.
--
-- item_codes use the POSITIONAL <value><ordinal> scheme score-session.ts
-- synthesizes (ordinal = rank within the value by sequence_number; see items.sql).
-- Each value has 2 items → SD1/SD2, ST1/ST2, ...
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, dimension).
--
-- Anchors:
--   - implementation_packs/PVQ-RR_..._Consolidado.md §6.6 (TwIVI direct-keyed, 6-pt),
--     §3.0 (MRAT), §3.0.5 (no HOV baremo).
--   - 02-RESEARCH.md § "MRAT Transform", § "Critical de-risk (within-person banding)".
--   - lib/scoring/types.ts (MeanFormulaSchema), lib/scoring/formulas/mean.ts, lib/scoring/mrat.ts.
--   - db/seeds/instruments/ONET-IP-SF/scoring-rule.sql (idempotent pattern).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'TwIVI'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.scoring_rule (instrument_version_id, dimension, formula, scoring_version)
SELECT v.version_id, 'SD',
  '{"type":"mean","item_codes":["SD1","SD2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'SD')
UNION ALL
SELECT v.version_id, 'ST',
  '{"type":"mean","item_codes":["ST1","ST2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'ST')
UNION ALL
SELECT v.version_id, 'HE',
  '{"type":"mean","item_codes":["HE1","HE2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'HE')
UNION ALL
SELECT v.version_id, 'AC',
  '{"type":"mean","item_codes":["AC1","AC2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'AC')
UNION ALL
SELECT v.version_id, 'PO',
  '{"type":"mean","item_codes":["PO1","PO2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'PO')
UNION ALL
SELECT v.version_id, 'SE',
  '{"type":"mean","item_codes":["SE1","SE2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'SE')
UNION ALL
SELECT v.version_id, 'CO',
  '{"type":"mean","item_codes":["CO1","CO2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'CO')
UNION ALL
SELECT v.version_id, 'TR',
  '{"type":"mean","item_codes":["TR1","TR2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'TR')
UNION ALL
SELECT v.version_id, 'BE',
  '{"type":"mean","item_codes":["BE1","BE2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'BE')
UNION ALL
SELECT v.version_id, 'UN',
  '{"type":"mean","item_codes":["UN1","UN2"],"reverse_keyed":[],"scale":[1,6]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (SELECT 1 FROM public.scoring_rule sr WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'UN');

COMMIT;
