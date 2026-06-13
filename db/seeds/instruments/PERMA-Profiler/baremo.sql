-- PERMA-Profiler baremo seed (Kern orientative cuts) — DescubreMe Phase 2
-- Wave 4 (Plan 02-11).
--
-- Butler & Kern (2016) do NOT publish a percentile table; Kern (peggykern.org)
-- offers heuristic functioning clusters "if cuts are needed" and explicitly
-- advises against prescriptive cut points (pack §3). DescubreMe therefore ships
-- BANDS (BAJO/MEDIO/ALTO), NOT percentiles: latam_status='pending' on
-- instrument_version makes the QUAL-02 gate (shouldShowPercentile) SUPPRESS
-- percentiles until a Colombian sample is accumulated (D-E1.1/D-E1.2).
-- population='INTL' (Kern international heuristic, not a country sample).
--
-- BAND CUTS (pack §3.1, three-band mapping of Kern clusters):
--   POSITIVE dimensions (P, E, R, M, A, H, hap) — higher = better:
--     BAJO  < 5.0   |  MEDIO 5.0-7.9   |  ALTO >= 8.0
--   INVERTED dimensions (N negative emotion, Lon loneliness) — higher = MORE
--   distress, so the band semantics FLIP (pack §3.1 N column / §5 inverted
--   reporting). Here BAJO = little negative emotion/loneliness (the GOOD end),
--   ALTO = much (the care-message end):
--     N:   BAJO <= 3.0  |  MEDIO 3.1-6.5  |  ALTO > 6.5
--     Lon: BAJO <= 3.0  |  MEDIO 3.1-6.5  |  ALTO > 6.5  (single item, same band scale)
--
-- The inversion is LOAD-BEARING: the narrative loader keys on (dimension, band),
-- and the §5 N-ALTO / Lon-ALTO texts are the care messages (route to Linea 106 /
-- 192). If the band convention did not invert N/Lon, a high-raw N would resolve
-- to BAJO and silently surface the "little negative emotion" text for someone
-- reporting frequent sadness — an ethics failure on exactly the dimensions
-- where being wrong matters most. The band_convention below encodes both
-- families explicitly so the band-mapping consumer applies the right cuts per
-- dimension.
--
-- [GAP-BAREMO-SRC-FREE-INSTRUMENTS] (D-E1.2): Cowork confirms the final baremo
-- reference per instrument. Kern international heuristic is the seeded best-
-- published reference now; Chaves et al. (2023, MX N=26506) means are the
-- documented cross-validation target (pack §3.1) once the dimension M/SD are
-- verified.
--
-- IDEMPOTENT: NOT EXISTS scope on (instrument_version_id, population).
--
-- Anchors:
--   - implementation_packs/PERMA-Profiler_..._Consolidado.md §3 (Kern clusters),
--     §3.1 (three-band mapping + N inversion).
--   - 02-CONTEXT.md D-E1.1 (bands posture), D-E1.2 (source per instrument).
--   - db/seeds/instruments/BFI-2-S/baremo.sql (reference_data pattern).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'PERMA-Profiler'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
)
INSERT INTO public.baremo (instrument_version_id, population, type, reference_data)
SELECT v.version_id, 'INTL', 'percentil',
  jsonb_build_object(
    'source', 'Kern (s.f.), peggykern.org/questionnaires.html — cortes heuristicos orientativos. Butler & Kern (2016), IJW 6(3):1-48, DOI 10.5502/ijw.v6i3.526 (no publica percentiles).',
    'sample', 'Kern heuristic clusters (orientative, author advises against prescriptive cuts)',
    'latam_status', 'pending',
    'reports_percentiles', false,
    'baremo_version', 'provisional_kern_chaves_2026Q2',
    'band_convention', jsonb_build_object(
      'positive', jsonb_build_object(
        'dimensions', jsonb_build_array('P', 'E', 'R', 'M', 'A', 'H', 'hap'),
        'BAJO', '< 5.0',
        'MEDIO', '5.0-7.9',
        'ALTO', '>= 8.0'
      ),
      'inverted', jsonb_build_object(
        'dimensions', jsonb_build_array('N', 'Lon'),
        'note', 'Higher raw = more negative emotion / loneliness. BAJO is the good (low-distress) end; ALTO is the care-message end (routes to Linea 106/192).',
        'BAJO', '<= 3.0',
        'MEDIO', '3.1-6.5',
        'ALTO', '> 6.5'
      )
    ),
    'note', 'Bandas provisionales basadas en los cortes orientativos de Kern; pendiente baremo colombiano (D-E1.1). No se muestran percentiles ni comparaciones interpersonales (pack §3.1). Validacion cruzada pendiente con medias de Chaves et al. (2023).',
    'alternative_reference', 'Chaves, Ballesteros-Valdes, Madridejos & Charles-Leija (2023) MX N=26506, DOI 10.1007/s11482-022-10132-1'
  )
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM public.baremo b
  WHERE b.instrument_version_id = v.version_id AND b.population = 'INTL'
);

COMMIT;
