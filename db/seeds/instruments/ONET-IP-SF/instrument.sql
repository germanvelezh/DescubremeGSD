-- O*NET IP-SF instrument seed — DescubreMe Phase 1 Wave 3 (Plan 01-06).
--
-- Inserts the instrument row for the O*NET Interest Profiler Short Form.
-- Idempotent via `ON CONFLICT (code) DO NOTHING`.
--
-- Anchors:
--   - implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md §1.
--   - 01-CONTEXT.md (D2 instrument selection).
--   - db/schema/instrument.ts (column shape).
--
-- Sensitivity: 'normal' — O*NET IP-SF is a preference instrument with
-- LOW psychological risk per Pack §1. NFR-27/28 NOT triggered.

BEGIN;

INSERT INTO public.instrument (code, name, construct, sensitivity, ethical_flags)
VALUES (
  'ONET-IP-SF',
  'O*NET Interest Profiler-SF',
  'RIASEC interests',
  'normal',
  '[]'::jsonb
)
ON CONFLICT (code) DO NOTHING;

COMMIT;
