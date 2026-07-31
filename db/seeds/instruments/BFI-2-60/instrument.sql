-- BFI-2-60 instrument seed — DescubreMe Fase 3 Wave 3 (Plan 03-04).
--
-- Inserts the instrument row for the Big Five Inventory-2 FULL form (60 items,
-- 5 domains x 12 items, 15 facets x 4 items). It is the FIRST Paid-exclusive
-- instrument in the catalog: it lives in product_stack 'paid' and NOT in
-- 'free', which is what finally makes the positive half of the /test/* guard
-- (Plan 03-01) verifiable. Idempotent via `ON CONFLICT (code) DO NOTHING`.
--
-- Sensitivity 'high' — SAME reason as BFI-2-S: the Negative Emotionality domain
-- carries distress signal (Anxiety/Depression facet items, pack §7.2), so the
-- consent guard (lib/consent/guard.ts::assertConsentActive) blocks its first
-- item without consent_sensitive_data=true, and RLS 003 enforces the same at
-- the row level. The 60-item form carries FOUR items per those facets instead
-- of two, so the signal is stronger, never weaker.
--
-- ethical_flags: the object shape consumed by decoupleEthicalFlags(raw) — three
-- INDEPENDENT booleans (NOT the legacy ['emotional_distress'] array). All three
-- true, mirroring BFI-2-S: NFR-27 pre-test modal, NFR-28 contention route, and
-- the distress detector (thresholds seeded on instrument_version).
--
-- Anchors:
--   - implementation_packs/BFI-2-60_..._Consolidado.md §0, §1, §7.2.
--   - db/seeds/instruments/BFI-2-S/instrument.sql (literal template).
--   - 03-04-PLAN.md Task 1.

BEGIN;

INSERT INTO public.instrument (code, name, construct, sensitivity, ethical_flags)
VALUES (
  'BFI-2-60',
  'Big Five Inventory-2 (forma completa)',
  'Personalidad Big Five (5 dominios, 15 facetas)',
  'high',
  '{"pretest_modal": true, "contention_route": true, "distress_detector": true}'::jsonb
)
ON CONFLICT (code) DO NOTHING;

COMMIT;
