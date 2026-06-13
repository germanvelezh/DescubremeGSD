-- BFI-2-S instrument_version seed — DescubreMe Phase 2 Wave 4 (Plan 02-09).
--
-- Inserts version 1.0 (es-CO) of the BFI-2-S. Idempotent via NOT EXISTS guard
-- scoped to (instrument_id, version, lang).
--
-- visual_type='bars' (D-C.2): the report renders 5 domain bars (not a hexagon).
-- The VISUAL_REGISTRY resolves the bars component off this DATA value (02-08),
-- never off an instrument-code literal (FOUND-05).
--
-- centering_strategy='none' (D-E1.3): BFI-2-S domains are summed raw (no
-- ipsative z-score, no MRAT). MUST be set AT INSERT TIME — migration 014 adds
-- the column with a NOT NULL DEFAULT 'none' but only back-fills the O*NET row;
-- a fresh `supabase db reset` runs 014 before this seed, so an explicit value
-- here is the source of truth (the DEFAULT also yields 'none', but we set it
-- explicitly to make the psychometric intent legible and reset-stable).
--
-- psychometric_status jsonb (QUAL-01/QUAL-02): carries the published domain
-- alphas + latam_status='pending' (D-E1.2 -> shouldShowPercentile suppresses
-- percentiles, bands only) + the ficha-tecnica metadata (what_it_measures /
-- limits, FREE-11) that lib/report/assembler.ts reads. Source = Toledo-Fernandez
-- et al. (2022) MX domain alphas (pack §3). It ALSO carries `distress_thresholds`
-- (NFR-28, data-driven, see below).
--
-- distress_thresholds (NFR-28, BFI verbatim — pack TRIGGERS §4 "Opcion A
-- refinada"): seeded as DATA inside psychometric_status. Consumed by
-- lib/ethics/distress.ts::evaluateDistressThreshold (no instrument-code branch,
-- FOUND-05). DORMANT until facet-level scoring exists: the 5-domain sum scoring
-- (this plan) does NOT yet compute the N1/N2 facet means that clause B needs,
-- and no consumer reads psychometric_status.distress_thresholds yet. A
-- downstream plan (02-08 report wiring / facet scoring) reads these. Keys use
-- the POSITIONAL item-code scheme the scorer synthesizes (<dimension><ordinal>,
-- see items.sql / scoring-rule.sql), NOT the BFI-2-S native item numbers:
--   - pack item 9  ("se siente deprimido") -> NEG2 (raw, direct)
--   - pack item 24 ("se siente seguro", reverse) -> NEG5
--   - pack item 4  ("se preocupa mucho") -> NEG1 (raw, direct)
--   - pack item 19 ("relajado, gestiona el estres", reverse) -> NEG4
-- strong clause A: item NEG2 raw >= 4 (direct depressed-mood endorsement).
-- strong clause B: facet N2 mean(NEG2, recoded NEG5) >= 4.0 OR
--                  facet N1 mean(NEG1, recoded NEG4) >= 4.0.
-- No `moderate` for BFI-2-S v1.0 (pack TRIGGERS §5).
--
-- Anchors:
--   - implementation_packs/BFI-2-S_..._Consolidado.md §0, §3 (alphas, baremo).
--   - implementation_packs/BFI-2-S_TRIGGERS_NFR28_REDESIGN_v1.0.md §4 (thresholds).
--   - 02-CONTEXT.md D-C.2 (visual_type), D-E1.2/D-E1.3, D-D.2.
--   - supabase/migrations/014_visual_type_centering_integrator_rule.sql.
--   - lib/report/assembler.ts (psychometric_status parser: what_it_measures/limits).
--   - db/seeds/instruments/ONET-IP-SF/instrument-version.sql (idempotent pattern).
--
-- plan_b_ref: HEXACO-60 (Lee & Ashton) is the open-license plan-B (pack §6.6).

BEGIN;

INSERT INTO public.instrument_version (
  instrument_id,
  version,
  lang,
  item_count,
  likert_min,
  likert_max,
  visual_type,
  centering_strategy,
  psychometric_status,
  plan_b_ref
)
SELECT
  i.id,
  '1.0',
  'es-CO',
  30,
  1,
  5,
  'bars',
  'none',
  jsonb_build_object(
    'alpha_by_dimension', jsonb_build_object(
      'EXT', 0.82,
      'AGR', 0.76,
      'CON', 0.77,
      'NEG', 0.79,
      'OPN', 0.73
    ),
    'source', 'Toledo-Fernandez 2022 MX sample N=2025',
    'latam_status', 'pending',
    'what_it_measures',
      'Describe tu personalidad en cinco grandes rasgos: extraversion, '
      || 'cordialidad, responsabilidad, sensibilidad emocional y apertura '
      || 'mental. No es una evaluacion clinica: muestra tendencias de tu '
      || 'estilo, no etiquetas fijas.',
    'limits',
      'Bandas provisionales basadas en muestra mexicana; pendiente baremo '
      || 'colombiano. Es un autorreporte breve (30 preguntas): da una mirada '
      || 'general por rasgo, no un perfil fino por faceta.',
    'distress_thresholds', jsonb_build_object(
      'strong', jsonb_build_object(
        'any', jsonb_build_array(
          jsonb_build_object('key', 'NEG2', 'op', 'gte', 'value', 4),
          jsonb_build_object('facet', 'N2', 'op', 'gte', 'value', 4.0,
            'mean_of', jsonb_build_array('NEG2', 'NEG5R')),
          jsonb_build_object('facet', 'N1', 'op', 'gte', 'value', 4.0,
            'mean_of', jsonb_build_array('NEG1', 'NEG4R'))
        )
      ),
      'source', 'BFI-2-S TRIGGERS NFR-28 v1.0 Opcion A refinada',
      'wiring_status', 'dormant_pending_facet_scoring'
    )
  ),
  'HEXACO-60'
FROM public.instrument i
WHERE i.code = 'BFI-2-S'
  AND NOT EXISTS (
    SELECT 1
    FROM public.instrument_version v
    WHERE v.instrument_id = i.id
      AND v.version = '1.0'
      AND v.lang = 'es-CO'
  );

COMMIT;
