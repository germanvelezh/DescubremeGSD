-- BFI-2-S dimension×band narrative seed — DescubreMe Phase 2 Wave 4 (Plan 02-09).
--
-- Inserts 15 dimension×band narrative rows (5 domains × 3 bands) for the Free
-- BFI-2-S report (Layer 2/3). slot='dimension_band'; dimension = the scoring
-- DOMAIN code (EXT/AGR/CON/NEG/OPN, matching scoring-rule.sql + the bands the
-- assembler keys on, lib/report/assembler.ts L382-385); band ∈ {BAJO,MEDIO,ALTO}.
-- template_text = the official es-CO domain-level interpretation (pack §5,
-- "tú" cordial colombiano, ≤80 palabras, descriptivo no determinista).
--
-- D-D.4 (HARD GATE — non-clinical reframe): the Negative Emotionality domain
-- (code NEG) is presented as "Sensibilidad emocional" (variabilidad afectiva
-- normal, NOT a clinical label). The pack §5 Dominio-4 texts already use this
-- framing; they carry no bare clinical labels (the COMPL-18 02-02 lint blocks
-- such terms). Facet-level texts (which DO use the facet-granularity clinical
-- vocabulary the lint forbids) are DEFERRED to Paid (Phase 3), NOT seeded here.
--
-- Facet-level dimension×band rows are out of scope (Free shows domain level;
-- dossier §3.3: BFI-2-S facets need n>=400 for reliable individual inference).
--
-- SCHEMA DEPENDENCY [GAP-NARRATIVE-DIMBAND-SCHEMA]: lib/report/narrative-loader.ts
-- queries narrative_template by (slot='dimension_band', dimension, band), but the
-- base table (migration 002) has riasec_code NOT NULL, NO dimension/band columns,
-- and a slot CHECK that excludes 'dimension_band'. NO migration adds them yet
-- (the 02-04 dimband loader path was tested against a MOCKED Supabase client, so
-- the gap was never caught). This seed targets the INTENDED schema and will FAIL
-- on `supabase db reset` (02-13 Task 2) until a migration: (1) makes riasec_code
-- nullable, (2) adds `dimension text` + `band text`, (3) extends the slot CHECK
-- to include 'dimension_band'. This blocks 02-13's BLOCKING db reset for ALL
-- bars/circumplex instruments (BFI-2-S, TwIVI 02-10, PERMA 02-11). Logged to
-- deferred-items.md; flagged prominently in 02-09-SUMMARY. Same "seed the faithful
-- representation now, flag the schema dependency" posture as items.sql item_code.
--
-- IDEMPOTENT: DELETE of (version 1.0, lang es-CO, slot 'dimension_band',
-- dimension ∈ BFI domain codes) before INSERT (mirrors the RIASEC seed's
-- delete-then-insert; scoped so it never touches RIASEC rows).
--
-- Anchors:
--   - implementation_packs/BFI-2-S_..._Consolidado.md §5 (domain-level es-CO texts).
--   - 02-CONTEXT.md D-C.4 (narrative dimension×band), D-D.4 (Sensibilidad emocional).
--   - lib/report/narrative-loader.ts (dimension_band query path).
--   - db/seeds/narrative-templates/RIASEC/seed.sql (delete-then-insert pattern).

BEGIN;

DELETE FROM public.narrative_template
WHERE version = '1.0'
  AND lang = 'es-CO'
  AND slot = 'dimension_band'
  AND dimension IN ('EXT', 'AGR', 'CON', 'NEG', 'OPN');

INSERT INTO public.narrative_template (version, lang, slot, dimension, band, template_text)
VALUES
-- ===================== Extraversión (EXT) =====================
  ('1.0', 'es-CO', 'dimension_band', 'EXT', 'BAJO', 'Tiendes a disfrutar la calma y los momentos a solas, y en grupos prefieres escuchar antes que tomar la palabra. Es probable que recargues energía en espacios tranquilos, como leyendo o caminando sin compañía. Esto sugiere que valoras la profundidad sobre la cantidad de interacciones. ¿En qué situaciones sientes que estar solo te ayuda a pensar mejor?'),
  ('1.0', 'es-CO', 'dimension_band', 'EXT', 'MEDIO', 'Combinas momentos de socialización con espacios de retiro según el contexto. A veces tomas la iniciativa en una conversación y otras prefieres observar. Esto sugiere flexibilidad social: puedes adaptarte a reuniones grandes o a charlas íntimas. Piensa en qué entornos te sientes más cómodo.'),
  ('1.0', 'es-CO', 'dimension_band', 'EXT', 'ALTO', 'Tiendes a buscar la compañía de otros y a expresar tus ideas con seguridad. Es común que te sientas con energía después de eventos sociales y que asumas roles visibles en grupos. Esto sugiere que la interacción te estimula. ¿Qué tipo de espacios sociales te dan mayor satisfacción?'),
-- ===================== Cordialidad (AGR) =====================
  ('1.0', 'es-CO', 'dimension_band', 'AGR', 'BAJO', 'Tiendes a ser directo y a poner tus criterios sobre la mesa sin rodeos. A veces priorizas la franqueza antes que la armonía del grupo. Esto sugiere independencia de juicio. ¿En qué relaciones notas que esa franqueza ayuda y en cuáles podría matizarse?'),
  ('1.0', 'es-CO', 'dimension_band', 'AGR', 'MEDIO', 'Buscas un equilibrio entre cooperar y defender tu posición. Puedes ceder cuando ves valor en el otro y mantenerte firme cuando algo te importa.'),
  ('1.0', 'es-CO', 'dimension_band', 'AGR', 'ALTO', 'Tiendes a confiar en las intenciones de los demás y a buscar el entendimiento antes que el conflicto. Esto sugiere una orientación cooperativa. ¿Cómo cuidas que esa apertura no te exponga en exceso?'),
-- ===================== Responsabilidad (CON) =====================
  ('1.0', 'es-CO', 'dimension_band', 'CON', 'BAJO', 'Tiendes a un estilo más espontáneo y flexible, con menos apego a planes detallados. Esto puede ser una fortaleza creativa. ¿Qué pequeñas rutinas te ayudarían cuando una meta importa mucho?'),
  ('1.0', 'es-CO', 'dimension_band', 'CON', 'MEDIO', 'Combinas planificación y adaptabilidad. Cumples con lo importante sin volverte rígido.'),
  ('1.0', 'es-CO', 'dimension_band', 'CON', 'ALTO', 'Tiendes a planificar, cumplir plazos y mantener orden en tus tareas. Esto sugiere autodisciplina. ¿Cómo equilibras esa exigencia con el descanso?'),
-- ===================== Sensibilidad emocional (NEG) — D-D.4 reframe =====================
  ('1.0', 'es-CO', 'dimension_band', 'NEG', 'BAJO', 'Tiendes a mantenerte estable frente a presiones y a recuperar tu equilibrio rápido tras un contratiempo. Esto sugiere alta tolerancia al estrés cotidiano. ¿Cómo notas cuándo sí necesitas parar?'),
  ('1.0', 'es-CO', 'dimension_band', 'NEG', 'MEDIO', 'Tu estado de ánimo se mueve con los eventos, dentro de un rango manejable. Sabes identificar qué te afecta y buscar apoyo cuando hace falta.'),
  ('1.0', 'es-CO', 'dimension_band', 'NEG', 'ALTO', 'Tiendes a percibir con intensidad las tensiones del día a día y a tomarte tiempo para procesar lo que sientes. Esto sugiere alta sensibilidad emocional. Conversar con personas de confianza o con un profesional puede ser de ayuda.'),
-- ===================== Apertura mental (OPN) =====================
  ('1.0', 'es-CO', 'dimension_band', 'OPN', 'BAJO', 'Prefieres lo conocido y lo práctico antes que lo experimental. Esto sugiere un estilo concreto. ¿Qué experiencia nueva te gustaría probar este año?'),
  ('1.0', 'es-CO', 'dimension_band', 'OPN', 'MEDIO', 'Combinas rutinas y curiosidad: exploras cuando algo te interesa de verdad.'),
  ('1.0', 'es-CO', 'dimension_band', 'OPN', 'ALTO', 'Disfrutas ideas nuevas, arte y pensamiento abstracto. Esto sugiere alta curiosidad. ¿En qué áreas quieres profundizar tu exploración?');

COMMIT;
