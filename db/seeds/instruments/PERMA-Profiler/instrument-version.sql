-- PERMA-Profiler instrument + instrument_version seed — DescubreMe Phase 2
-- Wave 4 (Plan 02-11). The wellbeing instrument (FREE-05) — the 4th and final
-- Free test, and the only one on the 0-10 numeric-endpoints scale.
--
-- visual_type='bars' (D-C.2): the report renders dimension bars (P/E/R/M/A +
-- N/H/Lon/hap), not a hexagon/circumplex. The VISUAL_REGISTRY resolves the bars
-- component off this DATA value (02-08), never off an instrument-code literal
-- (FOUND-05) — same DATA-driven dispatch as BFI-2-S.
--
-- centering_strategy='none' (D-E1.3): PERMA subscales are raw 0-10 dimension
-- means (mean of the 3 block items), NO ipsative z-score, NO MRAT. MUST be set
-- AT INSERT TIME — migration 014 adds the column with DEFAULT 'none' but only
-- back-fills the O*NET row; a fresh `supabase db reset` runs 014 before this
-- seed, so the explicit value here is the source of truth (DEFAULT also yields
-- 'none', set explicitly to make the psychometric intent legible).
--
-- likert_min/max = 0/10 (NOT 1-5 like BFI, NOT 1-6 like TwIVI): the PERMA
-- response scale is 0-10 with per-block numeric-endpoint anchors (pack §1.3).
-- The scoring `scale` (scoring-rule.sql) is [0,10] to match. No reverse items
-- (pack §4: PERMA uses only positively-worded items; N/H/Lon are fillers, not
-- recoded — they are reported as their own dimensions, N/Lon inverted in the
-- band convention, see baremo.sql).
--
-- sensitivity='high' + ethical_flags (D-A.2, ADR-023 ethics reconciliation —
-- DECOUPLED object, three INDEPENDENT booleans consumed by
-- decoupleEthicalFlags). PERMA is the canonical case where ALL THREE are true:
--   - pretest_modal=true     → NFR-27 pre-test modal fires on transition into
--                              PERMA (emotional-state content: N/Lon/hap probe
--                              sadness, anxiety, loneliness, global happiness).
--   - contention_route=true  → always-on discreet contention footer + post-test
--                              disclaimer (pack §7.3/§7.5).
--   - distress_detector=true → NFR-28 distress detector active; the banner fires
--                              on the seeded distress_thresholds below.
-- This is the OBJECT shape the 02-06 reader expects (NOT the legacy
-- ['emotional_distress'] array). sensitivity='high' also auto-enforces RLS 003 +
-- assertConsentActive on the first item (emotional-state data, Ley 1581).
--
-- distress_thresholds (NFR-28, PERMA verbatim — pack §7.2 + TRIGGERS_MODERATE
-- VALIDATION v1.0): seeded as DATA inside psychometric_status (the only jsonb
-- the readers select; mirror of how BFI-2-S/TwIVI stash their metadata).
-- Consumed by the generic server-side eval (lib/ethics/distress.ts /
-- lib/distress/detector.ts::evaluatePerma) — no instrument-code branch
-- (FOUND-05). Two levels:
--   strong (item-level, pack §7.2): ANY of —
--     N1 (anxious, seq 4)  raw >= 8
--     N3 (sad,     seq 16) raw >= 8
--     Lon1 (lonely, seq 11) raw >= 8
--     hap1 (global happiness, seq 23) raw <= 2
--     combo: N3 >= 7 AND Lon1 >= 7 (double signal)
--   moderate (score-level, TRIGGERS_MODERATE VALIDATION v1.0, band-anchored,
--     DD-86 sign-off): ANY of —
--     PERMA_total < 5.0  (Kern "Languishing" lower bound, ~percentil 11)
--     N_mean      > 6.5  (Kern inverted "Languishing", ~percentil 84)
-- The keys use the POSITIONAL <dimension><ordinal> scheme score-session.ts
-- synthesizes (ordinal = rank within dimension by sequence_number): N items in
-- sequence (anxious seq4, angry seq14, sad seq16) -> N1/N2/N3 (matches pack
-- labels); single-item dims -> Lon1, hap1. PERMA_total / N_mean are aggregate
-- score keys the score-level eval computes.
--
-- scale_variant='numeric-endpoints' + scale_points=11 + sequence_order=4 live
-- as metadata in psychometric_status: the base instrument_version table has NO
-- such columns (only visual_type + centering_strategy from migration 014). Same
-- posture as TwIVI (scale_variant 'labeled-rows', sequence_order 3). The 0-10
-- numeric-endpoints presentation renders per-block anchor_min/anchor_max from
-- items.sql (UI-SPEC §6.9, fits 360px — UX-05).
--
-- psychometric_status also carries the published alphas (Butler & Kern 2016
-- combined samples 4-11, pack §3) + latam_status='pending' (D-E1.2 ->
-- shouldShowPercentile suppresses percentiles, bands only) + ficha-tecnica
-- (what_it_measures / limits, FREE-11) in soft es-CO (bienestar hoy, no clinico).
--
-- Anchors:
--   - implementation_packs/PERMA-Profiler_..._Consolidado.md §1.3 (23 items,
--     0-10, scoring rules), §3 (alphas, Kern bands), §7.2 (NFR-28 strong).
--   - implementation_packs/PERMA-Profiler_TRIGGERS_MODERATE_VALIDATION_v1.0.md
--     §1.3/§3 (moderate thresholds verbatim, band-anchored).
--   - 02-CONTEXT.md D-A.2 (ADR-023 decoupled ethics), D-C.2 (visual_type),
--     D-D.1/D-D.2 (NFR-27/28), D-E1.2 (baremo), D-E1.3 (centering).
--   - 02-UI-SPEC.md §6.9 (numeric-endpoints, anchors per block from seed).
--   - supabase/migrations/014_visual_type_centering_integrator_rule.sql.
--   - db/seeds/instruments/{BFI-2-S,TwIVI}/instrument-version.sql (pattern).
--
-- plan_b_ref: Flourishing Scale (Diener et al. 2010, CC-BY equivalent) is the
-- open-license plan-B (pack §6.6 Plan B-1).

BEGIN;

-- Instrument row (idempotent via ON CONFLICT (code)). ethical_flags is the
-- DECOUPLED object shape (all three true for PERMA).
INSERT INTO public.instrument (code, name, construct, sensitivity, ethical_flags)
VALUES (
  'PERMA-Profiler',
  'PERMA-Profiler',
  'Bienestar (PERMA: emociones positivas, compromiso, relaciones, sentido, logro) + salud percibida, emocion negativa, soledad y felicidad global',
  'high',
  '{"pretest_modal": true, "contention_route": true, "distress_detector": true}'::jsonb
)
ON CONFLICT (code) DO NOTHING;

-- Version row (idempotent via NOT EXISTS on instrument_id + version + lang).
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
  23,
  0,
  10,
  'bars',
  'none',
  jsonb_build_object(
    'alpha_by_dimension', jsonb_build_object(
      'P', 0.88,
      'E', 0.72,
      'R', 0.82,
      'M', 0.90,
      'A', 0.79,
      'N', 0.71,
      'H', 0.92,
      'PERMA_total', 0.94
    ),
    'source', 'Butler & Kern (2016) combined samples 4-11, N=31966',
    'latam_status', 'pending',
    'scale_variant', 'numeric-endpoints',
    'scale_points', 11,
    'sequence_order', 4,
    'what_it_measures',
      'Te muestra un retrato de tu bienestar hoy en cinco areas: emociones '
      || 'positivas, compromiso, relaciones, sentido y logro, mas como percibes '
      || 'tu salud, tu animo y tu felicidad global. No es una evaluacion clinica '
      || 'ni un diagnostico: es una foto de como te sentias al responder.',
    'limits',
      'El bienestar cambia con el tiempo y las circunstancias; esto es una foto '
      || 'de un momento, no una prediccion. Bandas provisionales basadas en los '
      || 'cortes orientativos de Kern; pendiente baremo colombiano. Es un '
      || 'autorreporte breve (23 preguntas), no una medida medica de tu salud.',
    'distress_thresholds', jsonb_build_object(
      'strong', jsonb_build_object(
        'any', jsonb_build_array(
          jsonb_build_object('key', 'N1', 'op', 'gte', 'value', 8),
          jsonb_build_object('key', 'N3', 'op', 'gte', 'value', 8),
          jsonb_build_object('key', 'Lon1', 'op', 'gte', 'value', 8),
          jsonb_build_object('key', 'hap1', 'op', 'lte', 'value', 2),
          jsonb_build_object('all', jsonb_build_array(
            jsonb_build_object('key', 'N3', 'op', 'gte', 'value', 7),
            jsonb_build_object('key', 'Lon1', 'op', 'gte', 'value', 7)
          ))
        )
      ),
      'moderate', jsonb_build_object(
        'any', jsonb_build_array(
          jsonb_build_object('key', 'PERMA_total', 'op', 'lt', 'value', 5.0),
          jsonb_build_object('key', 'N_mean', 'op', 'gt', 'value', 6.5)
        )
      ),
      'source', 'PERMA-Profiler pack §7.2 (strong) + TRIGGERS_MODERATE VALIDATION v1.0 (moderate, band-anchored, DD-86)',
      'wiring_status', 'data_seeded_generic_eval'
    )
  ),
  'Flourishing Scale (Diener 2010)'
FROM public.instrument i
WHERE i.code = 'PERMA-Profiler'
  AND NOT EXISTS (
    SELECT 1
    FROM public.instrument_version v
    WHERE v.instrument_id = i.id
      AND v.version = '1.0'
      AND v.lang = 'es-CO'
  );

COMMIT;
