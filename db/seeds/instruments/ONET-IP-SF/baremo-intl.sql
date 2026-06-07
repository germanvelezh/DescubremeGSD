-- O*NET IP-SF baremo INTL seed — DescubreMe Phase 1 Wave 5 (Plan 01-08).
--
-- Inserta el baremo INTL (referencia US Rounds 2010 N=1061) que sirve como
-- fallback QUAL-06 cuando no hay baremo CO/MX disponible. Phase 1 Free
-- usa Opcion C ipsativa por defecto (DD-57 v3.0), NO percentil INTL —
-- el QUAL-02 percentile gate (lib/baremo/selector.shouldShowPercentile)
-- retorna false para `populationUsed='INTL'` en Phase 1.
--
-- El baremo INTL existe en DB para:
--   1. Cubrir el QUAL-06 fallback selector cuando CO + MX faltan.
--   2. Documentar el `psychometric_status.latam_status='pending'` con
--      reference_data verificable (Addendum §D fixed percentiles).
--   3. Phase 2 Paid lo expone con caveat "comparado con muestra US 1999".
--
-- IDEMPOTENT: NOT EXISTS scope sobre (instrument_version_id, population).
--
-- Anchors:
--   - implementation_packs/O-NET-IP-SF_v1.0_Consolidado_ADDENDUM_Tabla14.md §D (fixed percentiles).
--   - 01-RESEARCH.md lineas 1780-1782 (Pitfall 10).
--   - 01-PATTERNS.md §2.5.
--
-- `reference_data` shape: jsonb con `fixed_percentiles` por dim en escala
-- paper-and-pencil 0-10 (lo unico que Rounds 2010 publica). Mapeo a la
-- escala computerizada 1-5 / 0-40 queda parametrizado para DD-57 v3.0
-- Opcion B (CC formaliza en una iteracion futura). Phase 1 Free no lo
-- consume (Opcion C ipsativa). Tabla 14 verbatim en el Addendum §B-D.
--
-- [GAP-BAREMO-INTL-PCTL-EXTRACT]: percentiles fixed en escala 0-40 no
-- estan en este pack — el Addendum solo formaliza la escala 0-10 nativa.
-- Cuando DD-57 v3.0 elija Opcion B definitiva, anadir mapeo 0-40 a
-- reference_data en una iteracion v1.1 de este seed. Por ahora marcamos
-- conversion como reference_only.

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'ONET-IP-SF'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.baremo (instrument_version_id, population, type, reference_data)
SELECT v.version_id, 'INTL', 'percentil',
  jsonb_build_object(
    'source', 'Rounds 2010 Tabla 14 (Addendum extraction)',
    'sample', 'US N=1061 combined-sex',
    'scale_native', '0-10 paper-and-pencil',
    'scale_descubreme_conversion_status', 'reference_only',
    'fixed_percentiles_0_10', jsonb_build_object(
      'R', jsonb_build_object('p10', 0.1, 'p25', 1.0, 'p50', 2.6, 'p75', 5.4, 'p90', 7.6, 'p95', 8.4, 'p99', 9.6),
      'I', jsonb_build_object('p10', 0.4, 'p25', 1.5, 'p50', 3.7, 'p75', 6.8, 'p90', 8.7, 'p95', 9.5, 'p99', 10.0),
      'A', jsonb_build_object('p10', 0.8, 'p25', 2.2, 'p50', 4.4, 'p75', 6.9, 'p90', 8.7, 'p95', 9.4, 'p99', 10.0),
      'S', jsonb_build_object('p10', 1.3, 'p25', 2.8, 'p50', 5.4, 'p75', 7.6, 'p90', 9.0, 'p95', 9.7, 'p99', 10.0),
      'E', jsonb_build_object('p10', 0.5, 'p25', 1.9, 'p50', 4.3, 'p75', 7.1, 'p90', 8.9, 'p95', 9.6, 'p99', 10.0),
      'C', jsonb_build_object('p10', 0.2, 'p25', 1.5, 'p50', 4.2, 'p75', 7.6, 'p90', 9.4, 'p95', 10.0, 'p99', 10.0)
    ),
    'caveats', jsonb_build_array(
      'Ceiling effect en p95 (C) y p99 (I, S, E, C)',
      'Escala 0-10 es paper-and-pencil 3-point; conversion a 0-40 5-point pendiente DD-57'
    )
  )
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.baremo b
  WHERE b.instrument_version_id = v.version_id AND b.population = 'INTL'
);

COMMIT;
