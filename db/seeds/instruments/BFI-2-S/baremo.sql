-- BFI-2-S baremo seed (MX reference) — DescubreMe Phase 2 Wave 4 (Plan 02-09).
--
-- Inserts the best published LATAM reference: Toledo-Fernandez, Perez-Matus &
-- Villalobos-Gallegos (2022), MX sample (D-E1.2). population='MX'.
--
-- This is a REFERENCE, NOT a percentile table the product exposes: the MX study
-- reports CFA + domain alphas but NOT BFI-2-S 30 percentile norms (pack §3).
-- DescubreMe ships with bands (BAJO <= p16 / MEDIO p17-83 / ALTO >= p84,
-- pack §3.1) and latam_status='pending' on instrument_version, so the QUAL-02
-- gate (lib/baremo/selector.shouldShowPercentile) SUPPRESSES percentiles and
-- shows bands until a Colombian sample is accumulated (D-E1.1). The band cut
-- convention is recorded in reference_data for the band-mapping consumer.
--
-- [GAP-BAREMO-SRC-FREE-INSTRUMENTS] (D-E1.2): Cowork confirms the final baremo
-- reference per instrument. MX Toledo-Fernandez is the seeded best-published
-- reference now; ES Gallardo-Pujol (OSF kp572) is the documented alternative.
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, population).
--
-- Anchors:
--   - implementation_packs/BFI-2-S_..._Consolidado.md §3 (baremos), §3.1 (band cuts).
--   - 02-CONTEXT.md D-E1.1 (bands posture), D-E1.2 (source per instrument).
--   - db/seeds/instruments/ONET-IP-SF/baremo-intl.sql (reference_data pattern).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'BFI-2-S'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.baremo (instrument_version_id, population, type, reference_data)
SELECT v.version_id, 'MX', 'percentil',
  jsonb_build_object(
    'source', 'Toledo-Fernandez, Perez-Matus & Villalobos-Gallegos (2022). Suma Psicologica 29(2):119-128. DOI 10.14349/sumapsi.2022.v29.n2.4',
    'sample', 'MX N=2025 (ola 1)',
    'latam_status', 'pending',
    'reports_percentiles', false,
    'band_convention', jsonb_build_object(
      'BAJO', '<= p16',
      'MEDIO', 'p17-p83',
      'ALTO', '>= p84'
    ),
    'note', 'Bandas provisionales basadas en muestra mexicana; pendiente baremo colombiano (D-E1.1). El estudio MX no publica percentiles del BFI-2-S 30; se usa para bandas, no para tabla de percentiles.',
    'alternative_reference', 'Gallardo-Pujol et al. (2022) ES, OSF kp572 (CC-BY 4.0)'
  )
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.baremo b
  WHERE b.instrument_version_id = v.version_id AND b.population = 'MX'
);

COMMIT;
