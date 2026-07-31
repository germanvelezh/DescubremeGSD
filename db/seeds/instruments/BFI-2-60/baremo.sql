-- BFI-2-60 baremo seed (MX reference) — DescubreMe Fase 3 Wave 3 (Plan 03-04).
--
-- Same posture as the BFI-2-S baremo, and for the same reason: this row is a
-- REFERENCE, NOT a percentile table the product exposes. Pack §3.2 is explicit
-- ("no calcular percentiles internos hasta tener N >= 1.000 usuarios
-- colombianos") and pack §3.1 records that neither the MX nor the ES study
-- publishes percentiles in verifiable open text. So DescubreMe ships BANDS
-- (BAJO <= p16 / MEDIO p17-83 / ALTO >= p84) and `latam_status='pending'` on
-- instrument_version keeps the QUAL-02 gate
-- (lib/baremo/selector.shouldShowPercentile) SUPPRESSING percentiles.
--
-- population='MX' (Toledo-Fernandez et al., 2022) per pack §3.2: the largest
-- published LATAM sample using the SAME Spanish translation this seed
-- transcribes. The ES alternative (Gallardo-Pujol, OSF kp572) is recorded as
-- the documented fallback, and is what instrument-version.sql cites for the
-- domain alphas — those two sources answer DIFFERENT questions (reliability vs
-- reference population) and neither substitutes for the other.
--
-- NOT seeded: the ES parametric M/SD matrix of pack §3.1.bis. It is a
-- `[Aporte Gemini]` transcription that the pack itself marks "a verificar
-- contra el PDF original de Hogrefe antes de cualquier uso operativo". Seeding
-- unverified means and SDs would turn a flagged number into a silent product
-- claim. Left out on purpose; recorded here so the omission is legible.
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, population).
--
-- Anchors:
--   - implementation_packs/BFI-2-60_..._Consolidado.md §3.1, §3.1.bis, §3.2, §3.3.
--   - db/seeds/instruments/BFI-2-S/baremo.sql (literal template).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'BFI-2-60'
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
    'note', 'Bandas provisionales basadas en muestra mexicana; pendiente baremo colombiano. El estudio MX publica sus estadisticos como imagen embebida, no como texto verificable, asi que no se transcribe ninguna cifra: se usa para bandas, no para tabla de percentiles.',
    'alternative_reference', 'Gallardo-Pujol et al. (2022) ES, OSF kp572 (CC-BY 4.0)'
  )
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.baremo b
  WHERE b.instrument_version_id = v.version_id AND b.population = 'MX'
);

COMMIT;
