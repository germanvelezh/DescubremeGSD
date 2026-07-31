-- BFI-2-60 instrument_version seed — DescubreMe Fase 3 Wave 3 (Plan 03-04).
--
-- Inserts version 1.0 (es-CO) of the BFI-2-60. Idempotent via NOT EXISTS guard
-- scoped to (instrument_id, version, lang).
--
-- EVERY nullable-with-default column is declared AT INSERT TIME on purpose. The
-- lesson is measured, not assumed (03-02-SUMMARY): `supabase db reset` runs
-- MIGRATIONS FIRST and SEEDS AFTER, so a migration that backfills a column with
-- `UPDATE ... WHERE i.code = '<x>'` matches ZERO rows for any instrument whose
-- row is created by a seed. Migration 014's backfill of `visual_type` has been a
-- silent no-op for O*NET since Phase 2 for exactly that reason. A value that
-- must exist in a fresh reset has to be written HERE.
--
-- visual_type='bars': the BFI report renders 5 domain bars, not a hexagon. The
-- VISUAL_REGISTRY resolves the component off this DATA value (FOUND-05), never
-- off an instrument-code literal.
--
-- centering_strategy='none': BFI domains are summed raw. No ipsative z at the
-- scoring step, no MRAT. (Report-side banding uses computeIpsativeBands, which
-- is a within-person z ACROSS dimensions and is scale-invariant — a 12-item sum
-- bands exactly like the BFI-2-S 6-item sum. Nothing to configure here.)
--
-- block_size=NULL EXPLICIT: D-16 assigns block presentation to VIA only. NULL
-- means the runner renders the continuous bar. Declared rather than left to the
-- column default so the intent is legible next to the instrument it describes.
--
-- item_count=60 — the single source of truth the runner reads for N
-- (resolveTotalItems). likert 1..5 (pack §1.3, 5-point agreement scale).
--
-- psychometric_status jsonb (QUAL-01/QUAL-02): domain alphas + latam_status
-- 'pending' (so lib/baremo/selector.shouldShowPercentile SUPPRESSES percentiles
-- and shows bands) + the ficha-tecnica metadata (what_it_measures / limits) that
-- lib/report/assembler.ts reads. It ALSO carries `distress_thresholds` (NFR-28).
--
-- ALPHA SOURCE — why the SPANISH sample and not the Mexican one: BFI-2-S seeds
-- Toledo-Fernandez (2022, MX) alphas because that study publishes them for the
-- 30-item form. For the 60-item form the MX article reports alphas only as an
-- embedded IMAGE in SciELO (pack §3.1 "Nota de transparencia (anti-alucinacion)"),
-- so there is no verifiable open-text number to transcribe. The alphas below are
-- the Gallardo-Pujol (2022) ES sample AS REPORTED IN the open-access Husain et
-- al. (2025) meta-analysis (BMC Psychology 13:20, DOI 10.1186/s40359-024-02271-x,
-- subentry "Gallardo-Pujol D., 2022, Spanish, BFI-2") — the same translation this
-- seed transcribes, from a source that is actually verifiable in open text.
-- Inventing MX numbers to look consistent with BFI-2-S would be the exact
-- failure mode the pack's transparency note warns about.
--
-- distress_thresholds (NFR-28): DORMANT, same status as BFI-2-S — no consumer
-- reads psychometric_status.distress_thresholds yet, and clause B needs facet
-- scoring that does not exist. Keys use the POSITIONAL <dimension><ordinal>
-- scheme lib/scoring/score-session.ts synthesizes (ordinal = rank within the
-- domain by sequence_number), NOT the native BFI-2-60 item numbers. Mapping for
-- the two NFR-28 facets (see items.sql; NEG items sit at sequence 4,9,14,...,59
-- so ordinal = (seq - 4)/5 + 1):
--   Anxiety   (N1): #4 R -> NEG1 | #19 D -> NEG4 | #34 D -> NEG7 | #49 R -> NEG10
--   Depression(N2): #9 R -> NEG2 | #24 R -> NEG5 | #39 D -> NEG8 | #54 D -> NEG11
-- strong clause A: NEG11 raw >= 4 — the direct depressed-mood endorsement,
--   which is the SAME pack item BFI-2-S keyed as NEG2 (both are BFI-2 #54).
-- strong clause B: facet N2 mean(NEG2R, NEG5R, NEG8, NEG11) >= 4.0 OR
--                  facet N1 mean(NEG1R, NEG4, NEG7, NEG10R) >= 4.0.
-- The `R` suffix marks a code whose raw value must be RECODED before averaging,
-- the same convention the BFI-2-S seed uses. Four items per facet instead of
-- two: the 60-item form is what makes facet-level inference defensible at all
-- (dossier §3.3 — BFI-2-S facets need n >= 400).
-- No `moderate` band for v1.0 (same posture as BFI-2-S).
--
-- Anchors:
--   - implementation_packs/BFI-2-60_..._Consolidado.md §0, §1.3, §3.1, §3.2, §7.2.
--   - implementation_packs/BFI-2-S_TRIGGERS_NFR28_REDESIGN_v1.0.md §4 (threshold shape).
--   - db/seeds/instruments/BFI-2-S/instrument-version.sql (literal template).
--   - .planning/phases/03-.../03-02-SUMMARY.md (migration-vs-seed ordering).
--
-- plan_b_ref: HEXACO-60 (Lee & Ashton) is the open-license plan-B (pack §6.6).

BEGIN;

INSERT INTO public.instrument_version (
  instrument_id,
  version,
  lang,
  item_count,
  likert_min,
  likert_max,
  visual_type,
  centering_strategy,
  block_size,
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
  'bars',
  'none',
  NULL,
  jsonb_build_object(
    'alpha_by_dimension', jsonb_build_object(
      'EXT', 0.77,
      'AGR', 0.77,
      'CON', 0.86,
      'NEG', 0.88,
      'OPN', 0.84
    ),
    'source',
      'Gallardo-Pujol et al. (2022) ES N=1673; alfas de dominio via el '
      || 'meta-analisis abierto de Husain et al. (2025) BMC Psychology 13:20, '
      || 'DOI 10.1186/s40359-024-02271-x',
    'latam_status', 'pending',
    'what_it_measures',
      'Describe tu personalidad en cinco grandes rasgos y quince matices mas '
      || 'finos dentro de ellos: extraversion, cordialidad, responsabilidad, '
      || 'sensibilidad emocional y apertura mental. No es una evaluacion '
      || 'clinica: muestra tendencias de tu estilo, no etiquetas fijas.',
    'limits',
      'Bandas provisionales basadas en muestras publicadas de Espana y Mexico; '
      || 'todavia no existe un baremo colombiano. Es un autorreporte: describe '
      || 'como te ves hoy, no como seras siempre.',
    'distress_thresholds', jsonb_build_object(
      'strong', jsonb_build_object(
        'any', jsonb_build_array(
          jsonb_build_object('key', 'NEG11', 'op', 'gte', 'value', 4),
          jsonb_build_object('facet', 'N2', 'op', 'gte', 'value', 4.0,
            'mean_of', jsonb_build_array('NEG2R', 'NEG5R', 'NEG8', 'NEG11')),
          jsonb_build_object('facet', 'N1', 'op', 'gte', 'value', 4.0,
            'mean_of', jsonb_build_array('NEG1R', 'NEG4', 'NEG7', 'NEG10R'))
        )
      ),
      'source', 'BFI-2-S TRIGGERS NFR-28 v1.0 Opcion A refinada, extendida a las 4 posiciones por faceta del formato de 60',
      'wiring_status', 'dormant_pending_facet_scoring'
    )
  ),
  'HEXACO-60'
FROM public.instrument i
WHERE i.code = 'BFI-2-60'
  AND NOT EXISTS (
    SELECT 1
    FROM public.instrument_version v
    WHERE v.instrument_id = i.id
      AND v.version = '1.0'
      AND v.lang = 'es-CO'
  );

COMMIT;
