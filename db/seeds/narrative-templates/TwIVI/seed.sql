-- TwIVI 4-HOV dimension×band narrative seed — Phase 2 Wave 4 (Plan 02-10).
--
-- Inserts 12 dimension×band narrative rows (4 HOV × 3 bands) for the Free values
-- report (the ValueCircle / circumplex). slot='dimension_band'; dimension = the
-- HOV code (OCH/SEN/CON/STR, matching hov_map in instrument-version.sql); band ∈
-- {BAJO,MEDIO,ALTO} (the within-person band from lib/scoring/mrat.ts::bandFromMrat).
-- template_text = the official es-CO 4-HOV interpretation (pack §5.A) — these HOV
-- texts apply to TwIVI because TwIVI's 10 basic values roll up to the SAME 4 HOV
-- (D-GATE.1). This is seeding (implementation), NOT new research (CLAUDE.md §11).
--
-- D-E1.3 (RELATIVE-PRIORITY framing — HARD): the HOV scores are presented as
-- "qué pesa más para vos" — sign/magnitude of each HOV vs the person's OWN MRAT
-- (their "0"), NEVER absolute means nor inter-person comparison (no scalar
-- invariance, no HOV baremo; pack §3.0.5). The pack §5.A texts already use this
-- descriptive, non-determinist framing ("Tiendes a...", "Esto sugiere que...")
-- with reflective questions; no clinical/comparative vocabulary (passes the
-- COMPL-18 / prohibited-phrases lint).
--
-- HOV code → es-CO label (Schwartz 4 higher-order values):
--   OCH = Apertura al cambio   (Openness to Change)
--   SEN = Autopromoción        (Self-Enhancement)
--   CON = Conservación         (Conservation)
--   STR = Autotrascendencia    (Self-Transcendence)
--
-- SCHEMA DEPENDENCY [GAP-NARRATIVE-DIMBAND-SCHEMA]: same as BFI-2-S 02-09 —
-- lib/report/narrative-loader.ts queries narrative_template by (slot=
-- 'dimension_band', dimension, band), but the base table (migration 002) has
-- riasec_code NOT NULL, NO dimension/band columns, and a slot CHECK that
-- excludes 'dimension_band'. NO migration adds them yet. This seed targets the
-- INTENDED schema and will FAIL on `supabase db reset` (02-13 Task 2) until a
-- migration (1) makes riasec_code nullable, (2) adds `dimension text` + `band
-- text`, (3) extends the slot CHECK to include 'dimension_band'. That migration
-- is owned by 02-13's pre-seed step (it unblocks ALL bars/circumplex
-- instruments: BFI-2-S, TwIVI, PERMA). Logged to deferred-items.md; flagged in
-- 02-10-SUMMARY. Same "seed the faithful representation now, flag the schema
-- dependency" posture as 02-09.
--
-- IDEMPOTENT: DELETE of (version 1.0, lang es-CO, slot 'dimension_band',
-- dimension ∈ TwIVI HOV codes) before INSERT (mirrors the BFI-2-S / RIASEC
-- delete-then-insert; scoped so it never touches BFI or RIASEC rows).
--
-- Anchors:
--   - implementation_packs/PVQ-RR_..._Consolidado.md §5.A (4-HOV es-CO texts).
--   - 02-CONTEXT.md D-C.4 (narrative dimension×band), D-E1.3 (relative priorities).
--   - 02-RESEARCH.md § "MRAT Transform" (HOV partition), § "Critical de-risk".
--   - lib/report/narrative-loader.ts (dimension_band query path).
--   - db/seeds/narrative-templates/BFI-2-S/seed.sql (delete-then-insert pattern).

BEGIN;

DELETE FROM public.narrative_template
WHERE version = '1.0'
  AND lang = 'es-CO'
  AND slot = 'dimension_band'
  AND dimension IN ('OCH', 'SEN', 'CON', 'STR');

INSERT INTO public.narrative_template (version, lang, slot, dimension, band, template_text)
VALUES
-- ===================== Apertura al cambio (OCH) =====================
  ('1.0', 'es-CO', 'dimension_band', 'OCH', 'BAJO', 'Frente a tus otras prioridades, la novedad pesa menos: tiendes a sentirte más cómodo cuando las cosas son predecibles y conocidas. Por ejemplo, podrías preferir rutinas que ya conoces antes que probar algo nuevo. Esto sugiere que valoras la estabilidad como base para tu día a día. ¿En qué áreas de tu vida sí te gustaría dejar entrar un poco más de novedad?'),
  ('1.0', 'es-CO', 'dimension_band', 'OCH', 'MEDIO', 'La apertura al cambio pesa de forma pareja con tus otras prioridades: equilibras la curiosidad con la rutina. A veces te animas a explorar y a veces prefieres lo conocido. Esto sugiere que decides caso por caso. ¿Qué señales te indican cuándo te conviene moverte hacia algo nuevo?'),
  ('1.0', 'es-CO', 'dimension_band', 'OCH', 'ALTO', 'Entre tus prioridades, la apertura al cambio pesa más: tiendes a buscar lo novedoso y a cuestionar la rutina. Por ejemplo, te entusiasma proponer ideas distintas o probar caminos no recorridos. Esto sugiere que valoras la libertad de pensar y actuar a tu manera. ¿Cómo cuidas el descanso cuando esa búsqueda constante te agota?'),
-- ===================== Autopromoción (SEN) =====================
  ('1.0', 'es-CO', 'dimension_band', 'SEN', 'BAJO', 'Frente a tus otras prioridades, el logro personal pesa menos: tiendes a ponerlo en segundo plano. Por ejemplo, podrías rechazar algo que implique competir mucho con otros. Esto sugiere que valoras más la armonía o la colaboración. ¿Qué tipo de reconocimiento sí te resulta significativo?'),
  ('1.0', 'es-CO', 'dimension_band', 'SEN', 'MEDIO', 'La autopromoción pesa de forma pareja con tus otras prioridades: te interesa avanzar, sin que eso defina toda tu identidad. Por ejemplo, puedes celebrar un logro y al día siguiente enfocarte en tu familia. Esto sugiere que combinas ambición con otras facetas. ¿Cómo decides cuándo empujar por más y cuándo soltar?'),
  ('1.0', 'es-CO', 'dimension_band', 'SEN', 'ALTO', 'Entre tus prioridades, la autopromoción pesa más: tiendes a mover tus acciones hacia el éxito y la visibilidad. Por ejemplo, te enfocas en metas medibles y te gusta que tu esfuerzo se note. Esto sugiere que valoras demostrar competencia. ¿Qué relaciones quieres cuidar para que ese impulso no opaque otros vínculos importantes?'),
-- ===================== Conservación (CON) =====================
  ('1.0', 'es-CO', 'dimension_band', 'CON', 'BAJO', 'Frente a tus otras prioridades, el orden establecido pesa menos: tiendes a sentirte cómodo cuestionando reglas y costumbres. Por ejemplo, podrías replantear cómo se hacen las cosas en tu familia o en tu equipo. Esto sugiere que valoras la flexibilidad por encima del orden establecido. ¿Qué tradiciones sí conservas por elección propia?'),
  ('1.0', 'es-CO', 'dimension_band', 'CON', 'MEDIO', 'La conservación pesa de forma pareja con tus otras prioridades: respetas las normas cuando tienen sentido y las cuestionas cuando no. Por ejemplo, sigues procesos pero propones mejoras. Esto sugiere que ves el orden como herramienta, no como fin. ¿En qué situaciones la estabilidad te suma y en cuáles te limita?'),
  ('1.0', 'es-CO', 'dimension_band', 'CON', 'ALTO', 'Entre tus prioridades, la conservación pesa más: tiendes a valorar la estabilidad, las costumbres y el cumplimiento de normas. Por ejemplo, te genera tranquilidad mantener rituales familiares o procesos claros. Esto sugiere que ves en el orden una forma de cuidado. ¿Cómo distingues entre tradiciones que te nutren y otras que te conviene revisar?'),
-- ===================== Autotrascendencia (STR) =====================
  ('1.0', 'es-CO', 'dimension_band', 'STR', 'BAJO', 'Frente a tus otras prioridades, el bienestar colectivo pesa menos por ahora: tiendes a priorizar tus necesidades inmediatas antes que las del entorno. Por ejemplo, podrías dejar para después las causas colectivas. Esto sugiere que cuidar de ti es un foco actual. ¿Hay personas o causas que sí te mueven aunque no sea tu primer impulso?'),
  ('1.0', 'es-CO', 'dimension_band', 'STR', 'MEDIO', 'La autotrascendencia pesa de forma pareja con tus otras prioridades: cuidas de los tuyos y a veces extiendes ese cuidado más allá. Por ejemplo, ayudas en proyectos comunitarios cuando te queda espacio. Esto sugiere un balance entre lo propio y lo colectivo. ¿Qué causa te gustaría sumar si tuvieras más energía?'),
  ('1.0', 'es-CO', 'dimension_band', 'STR', 'ALTO', 'Entre tus prioridades, la autotrascendencia pesa más: tiendes a moverte por el bienestar de otros y por causas amplias. Por ejemplo, te involucras en temas ambientales, voluntariados o redes de apoyo. Esto sugiere que valoras la justicia y el cuidado de la comunidad. ¿Cómo recargas tu energía para sostener ese compromiso en el tiempo?');

COMMIT;
