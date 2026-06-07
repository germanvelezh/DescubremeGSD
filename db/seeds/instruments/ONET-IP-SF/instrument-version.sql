-- O*NET IP-SF instrument_version seed — DescubreMe Phase 1 Wave 3 (Plan 01-06).
--
-- Inserts version 1.0 (es-CO) of the O*NET Interest Profiler SF. Idempotent
-- via NOT EXISTS guard scoped to (instrument_id, version, lang). The
-- `psychometric_status` jsonb stores the published Cronbach alpha values
-- from Rounds et al. (2010), Tabla 3 (N=1.061 US sample).
--
-- Anchors:
--   - implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md §3.1.
--   - 01-RESEARCH.md "Gate 5: O*NET IP-SF data format + scoring".
--   - db/schema/instrument-version.ts.
--
-- Scale: Likert 1-5 visible to the user; original Rounds 2010 is 0-4 (the
-- shift is applied at scoring time, Plan 01-08). plan_b_ref points at the
-- open-source replacement (IPIP-RIASEC) if the O*NET license review in
-- Phase 7 invalidates the current usage.

BEGIN;

INSERT INTO public.instrument_version (
  instrument_id,
  version,
  lang,
  item_count,
  likert_min,
  likert_max,
  psychometric_status,
  plan_b_ref
)
SELECT
  i.id,
  '1.0',
  'es-CO',
  60,
  1,
  5,
  jsonb_build_object(
    'alpha_by_dimension', jsonb_build_object(
      'R', 0.78,
      'I', 0.82,
      'A', 0.78,
      'S', 0.78,
      'E', 0.87,
      'C', 0.83
    ),
    'source', 'Rounds 2010 US sample N=1061',
    'latam_status', 'pending'
  ),
  'IPIP-RIASEC'
FROM public.instrument i
WHERE i.code = 'ONET-IP-SF'
  AND NOT EXISTS (
    SELECT 1
    FROM public.instrument_version v
    WHERE v.instrument_id = i.id
      AND v.version = '1.0'
      AND v.lang = 'es-CO'
  );

COMMIT;
