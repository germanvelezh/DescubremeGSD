-- BFI-2-S instrument seed — DescubreMe Phase 2 Wave 4 (Plan 02-09).
--
-- Inserts the instrument row for the Big Five Inventory-2 Short Form (30 items,
-- 5 domains, 15 facets). Idempotent via `ON CONFLICT (code) DO NOTHING`.
--
-- Sensitivity (D-A.2): 'high' — the Negative Emotionality domain carries
-- distress signal (Depression/Anxiety facet items), so the consent guard
-- (lib/consent/guard.ts::assertConsentActive) blocks its first item without
-- consent_sensitive_data=true, and RLS 003 enforces the same at the row level.
--
-- ethical_flags (D-A.2, decoupled per 02-06): object shape consumed by
-- decoupleEthicalFlags(raw) -> three INDEPENDENT booleans. BFI-2-S is
-- all-three-true: NFR-27 pre-test modal, NFR-28 contention route, and the
-- distress detector (thresholds seeded on instrument_version, plan 02-09).
-- This is NOT the legacy ['emotional_distress'] array — it is the object
-- shape the 02-06 reader expects (pretest_modal/contention_route/
-- distress_detector). No instrument-code literal flows into lib/ethics.
--
-- Anchors:
--   - implementation_packs/BFI-2-S_Implementation_Acquisition_Pack_v1.0_Consolidado.md §0, §1.
--   - 02-CONTEXT.md D-A.2 (sensitivity=high + emotional_distress eje), D-D.1/D-D.2.
--   - .planning/phases/02-.../02-06-SUMMARY.md (decoupleEthicalFlags object shape).
--   - db/seeds/instruments/ONET-IP-SF/instrument.sql (idempotent pattern).

BEGIN;

INSERT INTO public.instrument (code, name, construct, sensitivity, ethical_flags)
VALUES (
  'BFI-2-S',
  'Big Five Inventory-2 (forma corta)',
  'Personalidad Big Five (5 dominios, 15 facetas)',
  'high',
  '{"pretest_modal": true, "contention_route": true, "distress_detector": true}'::jsonb
)
ON CONFLICT (code) DO NOTHING;

COMMIT;
