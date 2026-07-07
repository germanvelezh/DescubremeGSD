-- TwIVI instrument + instrument_version seed — DescubreMe Phase 2 Wave 4 (Plan 02-10).
--
-- The values instrument. D-GATE.1 RESOLVED (2026-06-12, German sign-off):
-- the Free values form is TwIVI (Twenty-Item Values Inventory; Sandy, Gosling,
-- Schwartz & Koelkebeck 2017) — NOT PVQ-RR, NOT PVQ-21. TwIVI measures the 10
-- classic Schwartz basic values (20 items, 6-pt Likert) and rolls up to the
-- same 4 HOV the Free report shows (D-GATE.1). License is "anyone, any purpose,
-- no permission" (pack §6.6 / Gosling UT-Austin site) → zero Phase-7 blocker.
--
-- Form-agnostic by design (locked-decision #1): TwIVI↔PVQ-RR is a SEED SWAP,
-- not a code change. The engine treats the form as metadata (item_count N from
-- the seed; centering_strategy='mrat'; visual_type='circumplex'). The 10→4 HOV
-- partition is SEED content (value_map + hov_map below), never hardcoded in
-- lib/scoring/score-session.ts (FOUND-05).
--
-- visual_type='circumplex' (D-C.1/D-C.2): the report renders the 4-HOV value
-- circle (ValueCircle), not bars/hexagon. The VISUAL_REGISTRY resolves the
-- component off this DATA value (02-08), never off an instrument-code literal.
--
-- centering_strategy='mrat' (D-E1.3, QUAL-05): values use within-person MRAT
-- centering (raw − MRAT, NO SD division), NOT ipsative_z, NOT raw sum. MUST be
-- set AT INSERT TIME — migration 014 adds the column with DEFAULT 'none' but
-- only back-fills the O*NET row; an explicit value here is the source of truth
-- (a fresh `supabase db reset` runs 014 before this seed). The mrat dispatch in
-- score-session.ts (02-03) reads value_map/hov_map below; see WIRING note.
--
-- sensitivity='high' + ethical_flags (D-A.2, ADR-023 ethics reconciliation —
-- DECOUPLED, three INDEPENDENT booleans consumed by decoupleEthicalFlags):
--   - pretest_modal=false   → NO NFR-27 pre-test modal (values is high by
--                             CONVICTIONS — Ley 1581 Art.5 — NOT emotional
--                             distress; no modal, no detector).
--   - contention_route=true → KEEPS the always-on discreet contention footer
--                             link + post-test disclaimer (§8 mitigation: the
--                             content can evoke difficult memories around
--                             religion/family/power; do NOT silently drop the
--                             route). No detector needed.
--   - distress_detector=false → NO NFR-28 distress detector (decoupled from the
--                             contention route; the route is footer-only here).
-- This is NOT the legacy ['emotional_distress'] array — it is the object shape
-- the 02-06 reader expects. sensitivity='high' still auto-enforces RLS 003 +
-- assertConsentActive on the first item (convictions data, Ley 1581 Art.5).
--
-- value_map + hov_map (the MRAT partition, seeded as DATA inside
-- psychometric_status — the only jsonb column score-session.ts selects, mirror
-- of how BFI-2-S stashed distress_thresholds):
--   - value_map: basic-value code → the synthesized item keys that average into
--     it. score-session.ts (step 6) synthesizes each item's key as
--     <dimension><ordinal-within-dimension-by-sequence>; here `dimension` IS the
--     basic-value code, 2 items each → keys SD1/SD2, ST1/ST2, ... (see items.sql).
--   - hov_map: HOV code → the basic-value codes it rolls up (mean, not sum). The
--     10 classic Schwartz basic values → 4 HOV per the canonical Schwartz
--     structure (pack §3.0.5 primary placement; Hedonism HE is a frontier value
--     placed in Apertura al cambio, matching the pack's 19-refined primary
--     placement). Non-overlapping partition (each basic value in exactly one HOV).
--       Apertura al cambio  (OCH): SD, ST, HE
--       Autopromoción       (SEN): AC, PO
--       Conservación        (CSV): SE, CO, TR
--       Autotrascendencia   (STR): BE, UN
--   HOV codes are GLOBALLY UNIQUE across instruments on purpose:
--   narrative_template has NO per-instrument discriminator (keyed only by
--   version+lang+slot+dimension+band), so Conservación uses 'CSV' — NOT 'CON' —
--   to avoid colliding with BFI-2-S's Conscientiousness domain code 'CON'
--   (a shared 'CON' would cross-clobber on the 02-13 reset DELETE and return the
--   wrong text from the dimband loader). Cross-checked vs BFI (EXT/AGR/CON/NEG/OPN)
--   and PERMA (P/E/R/M/A/N/H/Lon/hap): OCH/SEN/CSV/STR collide with neither.
--
-- WIRING note [GAP-MRAT-METADATA-READ]: score-session.ts:403-404 (02-03) still
-- reads valueMap/hovMap as empty `{}` literals (no scoring_metadata column
-- existed at 02-03), so the LIVE mrat dispatch stays DORMANT despite this seed.
-- 02-10 seeds the partition as DATA (here) + proves the math via the unit fixture
-- (tests/unit/scoring/twivi-mrat-fixture.test.ts, feeding computeMratScores
-- directly). Replacing the `{}` literals with a read of
-- psychometric_status.value_map/hov_map is owned by a downstream plan (02-13
-- reset/wire or a follow-up), and is independent of [GAP-TWIVI-ITEMS-ANCHORS-ES-CO].
-- Logged to deferred-items.md + flagged in 02-10-SUMMARY Known Stubs.
--
-- DEPLOY BLOCKER (not a plan blocker): [GAP-TWIVI-ITEMS-ANCHORS-ES-CO] P1
-- (Owner Cowork) — no pack carries the 20 TwIVI item stems / 6-pt anchors / the
-- 10-basic→4-HOV es-CO assignment confirmed. items.sql seeds clearly-marked
-- PLACEHOLDER stems so the machinery + structure exist; the FUNCTIONAL values
-- test + its E2E wait on Cowork delivery (block the values-test deploy, not this
-- plan). The pack §5.A 4-HOV interpretation texts DO apply (TwIVI rolls to the
-- same 4 HOV) — seeded in db/seeds/narrative-templates/TwIVI/seed.sql.
--
-- scale_variant / sequence_order: the base instrument_version table has NO such
-- columns (only visual_type + centering_strategy from migration 014); the 6-pt
-- asymmetric labeled-rows presentation + sequence_order=3 live as metadata in
-- psychometric_status (scale_variant, scale_points, sequence_order) until a
-- schema migration adds dedicated columns. Same posture as BFI-2-S.
--
-- Anchors:
--   - implementation_packs/PVQ-RR_..._Consolidado.md §3.0.5 (HOV partition),
--     §5.A (4-HOV es-CO texts), §6.6 (TwIVI plan-B, license, 10 basic values).
--   - 02-RESEARCH.md § "MRAT Transform" (HOV partition), § "D-GATE.1 Resolution".
--   - 02-CONTEXT.md D-GATE.1, D-A.2 (ADR-023 decoupled ethics), D-E1.3, D-E2.1.
--   - 02-03-SUMMARY.md (centering dispatch seam, dormant {} maps).
--   - supabase/migrations/014_visual_type_centering_integrator_rule.sql.
--   - db/seeds/instruments/BFI-2-S/{instrument,instrument-version}.sql (pattern).

BEGIN;

-- Instrument row (idempotent via ON CONFLICT (code)).
INSERT INTO public.instrument (code, name, construct, sensitivity, ethical_flags)
VALUES (
  'TwIVI',
  'Twenty-Item Values Inventory',
  'Valores personales (10 valores básicos de Schwartz → 4 valores de orden superior)',
  'high',
  '{"pretest_modal": false, "contention_route": true, "distress_detector": false}'::jsonb
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
  20,
  1,
  6,
  'circumplex',
  'mrat',
  jsonb_build_object(
    'source', 'TwIVI / Sandy, Gosling, Schwartz & Koelkebeck 2017',
    'latam_status', 'pending',
    'scale_variant', 'labeled-rows',
    'scale_points', 6,
    'sequence_order', 3,
    'what_it_measures',
      'Muestra qué valores pesan más para ti: apertura al cambio, '
      || 'autopromoción, conservación y autotrascendencia. Es un espejo de tus '
      || 'prioridades relativas, no una comparación con otras personas ni una '
      || 'etiqueta fija.',
    'limits',
      'Mide prioridades RELATIVAS dentro de tu propio perfil (cada valor frente '
      || 'a tu promedio personal), no puntajes absolutos ni comparables entre '
      || 'personas. Es un autorreporte breve (20 preguntas): da una mirada '
      || 'general por familia de valores, no un perfil fino por valor.',
    -- value_map: basic-value code → synthesized item keys (<value><ordinal>).
    'value_map', jsonb_build_object(
      'SD', jsonb_build_array('SD1', 'SD2'),
      'ST', jsonb_build_array('ST1', 'ST2'),
      'HE', jsonb_build_array('HE1', 'HE2'),
      'AC', jsonb_build_array('AC1', 'AC2'),
      'PO', jsonb_build_array('PO1', 'PO2'),
      'SE', jsonb_build_array('SE1', 'SE2'),
      'CO', jsonb_build_array('CO1', 'CO2'),
      'TR', jsonb_build_array('TR1', 'TR2'),
      'BE', jsonb_build_array('BE1', 'BE2'),
      'UN', jsonb_build_array('UN1', 'UN2')
    ),
    -- hov_map: HOV code → basic-value codes (mean rollup). 10 basic → 4 HOV.
    'hov_map', jsonb_build_object(
      'OCH', jsonb_build_array('SD', 'ST', 'HE'),
      'SEN', jsonb_build_array('AC', 'PO'),
      'CSV', jsonb_build_array('SE', 'CO', 'TR'),
      'STR', jsonb_build_array('BE', 'UN')
    )
  ),
  'PVQ-RR'
FROM public.instrument i
WHERE i.code = 'TwIVI'
  AND NOT EXISTS (
    SELECT 1
    FROM public.instrument_version v
    WHERE v.instrument_id = i.id
      AND v.version = '1.0'
      AND v.lang = 'es-CO'
  );

COMMIT;
