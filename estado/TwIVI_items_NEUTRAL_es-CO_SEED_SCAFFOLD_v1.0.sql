-- =====================================================================
-- TwIVI — 20 items es-CO NEUTROS (variante unica) — SCAFFOLD (Cowork llena)
-- =====================================================================
-- Decision German 2026-07-01: variante neutra AHORA; ramificado el/ella DIFERIDO
--   ([GAP-TWIVI-GENDER-SCHEMA]). La app no captura genero hoy -> una sola variante.
-- Owner contenido (los 20 stems): Cowork. Owner estructura + aplicacion: Claude Code.
-- Brief: estado/BRIEF_Cowork_TwIVI_NEUTRAL_STEMS_v1.0.md (§3 superficie, §4 estrategia).
-- Destino final (CC, tras llenado + OK): db/seeds/instruments/TwIVI/items.sql
-- =====================================================================
-- COWORK: reemplazar cada <<STEM_SEQ_NN>> por el stem neutro es-CO (candidato a
-- piloto). NO tocar seq 4/6/16 (ya son neutros M==F del seed original; confirmar).
-- Acentos completos en las cadenas (es-CO). Comillas simples internas: escapar ''.
--
-- ORDEN: OFICIAL TwIVI 1:CO..20:SE (coding key). 5 columnas: sin gender_variant,
-- sin item_code (el scorer sintetiza <DIM><ordinal>; item_code queda NULL como hoy).
-- reverse_key=false para los 20 (direct-keyed; el MRAT maneja el estilo de escala).
--   1,11 CO | 2,12 TR | 3,13 BE | 4,14 UN | 5,15 SD | 6,16 ST | 7,17 HE | 8,18 AC | 9,19 PO | 10,20 SE
-- =====================================================================

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'TwIVI' AND iv.version = '1.0' AND iv.lang = 'es-CO'
  LIMIT 1
),
items(seq, dim, stem) AS (
  VALUES
    ( 1, 'CO', '<<STEM_SEQ_01>>'),
    ( 2, 'TR', '<<STEM_SEQ_02>>'),
    ( 3, 'BE', '<<STEM_SEQ_03>>'),
    ( 4, 'UN', 'Piensa que es importante que todas las personas del mundo reciban un trato igualitario. Cree que todos deberían tener las mismas oportunidades en la vida.'),
    ( 5, 'SD', '<<STEM_SEQ_05>>'),
    ( 6, 'ST', 'Le gusta correr riesgos. Siempre está en busca de aventuras.'),
    ( 7, 'HE', '<<STEM_SEQ_07>>'),
    ( 8, 'AC', '<<STEM_SEQ_08>>'),
    ( 9, 'PO', '<<STEM_SEQ_09>>'),
    (10, 'SE', '<<STEM_SEQ_10>>'),
    (11, 'CO', '<<STEM_SEQ_11>>'),
    (12, 'TR', '<<STEM_SEQ_12>>'),
    (13, 'BE', '<<STEM_SEQ_13>>'),
    (14, 'UN', '<<STEM_SEQ_14>>'),
    (15, 'SD', '<<STEM_SEQ_15>>'),
    (16, 'ST', 'Piensa que es importante hacer muchas cosas distintas en la vida. Siempre busca cosas nuevas para probar.'),
    (17, 'HE', '<<STEM_SEQ_17>>'),
    (18, 'AC', '<<STEM_SEQ_18>>'),
    (19, 'PO', '<<STEM_SEQ_19>>'),
    (20, 'SE', '<<STEM_SEQ_20>>')
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key)
SELECT v.version_id, items.seq, items.stem, items.dim, false
FROM v CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1 FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;

-- =====================================================================
-- NOTA DE APLICACION (solo Claude Code — NO parte del contenido Cowork)
-- =====================================================================
-- El INSERT de arriba es NOT-EXISTS (version, seq): idempotente en DB FRESCA
-- (`supabase db reset`). Sirve tal cual como db/seeds/instruments/TwIVI/items.sql.
--
-- PERO en PROD ya existen 20 filas placeholder en seq 1..20 (orden interleaved
-- viejo) -> el NOT-EXISTS las SALTA y NO las reemplaza. Para reemplazar en prod
-- hace falta DELETE-primero. Es mutacion destructiva de prod -> requiere:
--   (1) OK explicito de German (patron out-of-band 016/017 via Supabase MCP).
--   (2) Chequear item_response colgando de esas filas (FK); en pre-trafico deberia
--       ser 0 o solo respuestas de prueba. Query de chequeo:
--         SELECT ir.item_id, count(*) FROM public.item_response ir
--         JOIN public.item it ON it.id = ir.item_id
--         WHERE it.instrument_version_id = (SELECT version_id FROM v-cte)
--         GROUP BY ir.item_id;
--   (3) Si hay responses de prueba: borrarlas o dejar que caigan (decision German).
--
-- Bloque REPLACE-IN-PLACE para prod (descomentar SOLO al aplicar, tras OK):
-- BEGIN;
--   DELETE FROM public.item
--   WHERE instrument_version_id = (
--     SELECT iv.id FROM public.instrument_version iv
--     JOIN public.instrument i ON i.id = iv.instrument_id
--     WHERE i.code = 'TwIVI' AND iv.version = '1.0' AND iv.lang = 'es-CO' LIMIT 1);
--   -- ...luego correr el INSERT de arriba (ahora inserta las 20 filas nuevas).
-- COMMIT;
--
-- POST-APLICACION (CC): re-correr tests/unit/scoring/twivi-mrat-fixture.test.ts
-- (el reorder de secuencia es scoring-neutral) + smoke del ValueCircle con datos
-- reales en prod (confirmar que el solape de labels era artefacto de placeholders).
-- =====================================================================
