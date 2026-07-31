-- BFI-2-60 scoring_rule seed — DescubreMe Fase 3 Wave 3 (Plan 03-04).
--
-- Inserts 5 scoring_rule rows, one per Big Five domain. The dimension codes are
-- EXACTLY the five the BFI-2-S already uses (EXT, AGR, CON, NEG, OPN) — that is
-- deliberate and load-bearing, not a coincidence of naming: `narrative_template`
-- carries NO per-instrument discriminator (migration 015 states this outright;
-- the dimension-band rows are keyed by (version, lang, dimension, band) with a
-- partial unique index on exactly that tuple). So reusing the domain codes makes
-- the 15 dimension-band narratives seeded for BFI-2-S apply to the BFI-2-60
-- report with ZERO new rows. Renaming a code here — say to EXT60 — would not
-- fail any constraint; it would silently produce a report with no narrative.
--
-- Each formula is `sum` over the 12 items of that domain, with the 6
-- reverse-keyed items of the domain listed in `reverse_keyed` (30 reverse
-- total). The interpreter (lib/scoring/formulas/sum.ts) applies
-- applyReverse(raw, scale[0], scale[1]) = (max + min) - raw to the reverse codes
-- before summing (QUAL-04). scale=[1,5] (pack §1.3).
--
-- item_codes use the POSITIONAL <dimension><ordinal> scheme that
-- lib/scoring/score-session.ts synthesizes (ordinal = rank within the domain by
-- sequence_number). Because the native order cycles the five domains, each
-- domain's items sit at seq d, d+5, ... d+55 and ordinal = (seq - d)/5 + 1.
-- Mapping (see items.sql; R = reverse per pack §4):
--   EXT: seq  1   6   11R 16R 21  26R 31R 36R 41  46  51R 56  -> EXT3,4,6,7,8,11 reverse
--   AGR: seq  2   7   12R 17R 22R 27  32  37R 42R 47R 52  57  -> AGR3,4,5,8,9,10 reverse
--   CON: seq  3R  8R  13  18  23R 28R 33  38  43  48R 53  58R -> CON1,2,5,6,10,12 reverse
--   NEG: seq  4R  9R  14  19  24R 29R 34  39  44R 49R 54  59  -> NEG1,2,5,6,9,10 reverse
--   OPN: seq  5R 10  15  20  25R 30R 35  40  45R 50R 55R 60   -> OPN1,5,6,9,10,11 reverse
-- Six reverse per domain x 5 domains = the 30 of pack §4. The integration test
-- RECOMPUTES this mapping from the seeded item rows and diffs it against the
-- JSON below, so a transcription slip in either file turns red instead of
-- producing a quietly wrong score (pack §4: "un error en la tabla de
-- inversiones destruye la interpretabilidad factorial de forma irrecuperable").
--
-- NOT seeded here: the 15 FACET-level rules. Their user-facing texts are blocked
-- (COMPL-18 vocabulary + rioplatense voseo in the source pack), so scoring a
-- facet would produce a number with nothing to say about it. Out of this plan's
-- fence by design, not an oversight.
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, dimension).
--
-- NEG = "Emocionalidad negativa" psychometric domain; the USER-FACING label is
-- "Sensibilidad emocional" (D-D.4 reframe, in the narrative seed). The domain
-- CODE stays NEG so the distress_thresholds keys (instrument-version seed) and
-- the inherited narratives resolve consistently.
--
-- Anchors:
--   - implementation_packs/BFI-2-60_..._Consolidado.md §1.3 (structure), §4 (reverse key).
--   - supabase/migrations/015_narrative_dimband_item_identity.sql (narrative_template has NO instrument discriminator).
--   - lib/scoring/types.ts (SumFormulaSchema), lib/scoring/formulas/sum.ts.
--   - db/seeds/instruments/BFI-2-S/scoring-rule.sql (literal template).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'BFI-2-60'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.scoring_rule (instrument_version_id, dimension, formula, scoring_version)
SELECT v.version_id, 'EXT',
  '{"type":"sum","item_codes":["EXT1","EXT2","EXT3","EXT4","EXT5","EXT6","EXT7","EXT8","EXT9","EXT10","EXT11","EXT12"],"reverse_keyed":["EXT3","EXT4","EXT6","EXT7","EXT8","EXT11"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'EXT'
)
UNION ALL
SELECT v.version_id, 'AGR',
  '{"type":"sum","item_codes":["AGR1","AGR2","AGR3","AGR4","AGR5","AGR6","AGR7","AGR8","AGR9","AGR10","AGR11","AGR12"],"reverse_keyed":["AGR3","AGR4","AGR5","AGR8","AGR9","AGR10"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'AGR'
)
UNION ALL
SELECT v.version_id, 'CON',
  '{"type":"sum","item_codes":["CON1","CON2","CON3","CON4","CON5","CON6","CON7","CON8","CON9","CON10","CON11","CON12"],"reverse_keyed":["CON1","CON2","CON5","CON6","CON10","CON12"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'CON'
)
UNION ALL
SELECT v.version_id, 'NEG',
  '{"type":"sum","item_codes":["NEG1","NEG2","NEG3","NEG4","NEG5","NEG6","NEG7","NEG8","NEG9","NEG10","NEG11","NEG12"],"reverse_keyed":["NEG1","NEG2","NEG5","NEG6","NEG9","NEG10"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'NEG'
)
UNION ALL
SELECT v.version_id, 'OPN',
  '{"type":"sum","item_codes":["OPN1","OPN2","OPN3","OPN4","OPN5","OPN6","OPN7","OPN8","OPN9","OPN10","OPN11","OPN12"],"reverse_keyed":["OPN1","OPN5","OPN6","OPN9","OPN10","OPN11"],"scale":[1,5]}'::jsonb,
  '1.0'
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.scoring_rule sr
  WHERE sr.instrument_version_id = v.version_id AND sr.dimension = 'OPN'
);

COMMIT;
