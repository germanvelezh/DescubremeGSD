-- =====================================================================
-- TwIVI — 20 items es-CO, variante NEUTRA en genero — Handoff Cowork -> Claude Code
-- Drop-in para: db/seeds/instruments/TwIVI/items.sql (reemplaza placeholders).
-- Cierra el ULTIMO pendiente de contenido del test de valores (variante activa a prod).
-- Pack de referencia: implementation_packs/TwIVI_Implementation_Acquisition_Pack_v1.0.md
-- Fecha: 2026-07-02. Owner contenido: Cowork. Owner aplicacion/seed: Claude Code.
-- =====================================================================
--
-- DECISION (German + Claude Code, 2026-07-02): servir UNA sola variante NEUTRA en
-- genero AHORA; DIFERIR el ramificado el/ella a su propia fase. Motivo: la app no
-- captura genero declarado en ningun lado (user/signup/sesion), asi que ramificar
-- exige construir la captura + su tratamiento Ley 1581 (genero ~ dato sensible
-- Art. 5) -> scope propio. La neutra desbloquea prod y es schema-limpia:
-- 1 fila por item, SIN migracion (no requiere gender_variant).
--
-- SUPERSEDE (para el prod-unblock): estado/TwIVI_items_es-CO_SEED_v1.0.sql (sets M/F).
-- Ese archivo queda como insumo de la FASE DIFERIDA (ramificado el/ella). No borrar.
--
-- PROVENIENCIA (anti-invencion): stems neutros DERIVADOS de los sets M/F ya
-- entregados (v1.0), que a su vez se extrajeron verbatim del instrumento oficial
-- TwIVI (Sandy, Gosling, Schwartz & Koelkebeck, 2017; sitio Gosling, UT-Austin).
-- Mismo significado; NO se reinterpreto ningun item.
--
-- ESTRATEGIA DE NEUTRALIZACION (A + C, valida por German):
--   A. Referente neutro: "para el/ella" -> "para esta persona" (mantiene el frame
--      de retrato; refuerza la escala "esta persona se parece a mi"). Los pronombres
--      objeto/agreements se ligan a "esta persona" (fem. gramatical, neutro en
--      referencia): p. ej. "la rodea".
--   C. Adjetivo -> frase nominal donde A no alcanza:
--        seq 5  "ser curioso/a"  -> "tener curiosidad"
--        seq 15 "ser creativo/a" -> "ideas nuevas y creativas" (nominaliza)
--        seq 9  "el/la lider"    -> "ser quien lidera"
--   Se evita la impersonalizacion pura (no cambiar lo que se pide juzgar).
--   seq 4, 6, 16 ya eran neutros (M==F): se copian tal cual.
--
-- WORDING = CANDIDATO a piloto cognitivo (ITC 2017), igual que los sets M/F. No es
-- wording aprobado en firme.
--
-- ORDEN: OFICIAL TwIVI 1..20 (coding key). dimension -> valor:
--   1,11 CO | 2,12 TR | 3,13 BE | 4,14 UN | 5,15 SD | 6,16 ST | 7,17 HE
--   8,18 AC | 9,19 PO | 10,20 SE. El scorer sintetiza <dim><ordinal-por-seq>
--   (CO1/CO2 ...) -> coincide con value_map/scoring_rule ya sembrados. NO tocar
--   instrument-version.sql ni scoring-rule.sql (son por codigo de valor).
--
-- reverse_key = FALSE para los 20 (TwIVI direct-keyed; el MRAT maneja el estilo).
--
-- IDEMPOTENTE: NOT EXISTS sobre (instrument_version_id, sequence_number). 1 fila/item.
-- =====================================================================

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'TwIVI'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
  LIMIT 1
),
items(seq, dim, stem) AS (
  VALUES
    ( 1, 'CO', 'Cree que siempre debe mostrar respeto a sus padres y a las personas mayores. Para esta persona es importante ser obediente.'),
    ( 2, 'TR', 'Las creencias religiosas son importantes para esta persona. Se esfuerza por cumplir lo que su religión le exige.'),
    ( 3, 'BE', 'Para esta persona es muy importante ayudar a la gente que la rodea. Quiere velar por su bienestar.'),
    ( 4, 'UN', 'Piensa que es importante que todas las personas del mundo reciban un trato igualitario. Cree que todos deberían tener las mismas oportunidades en la vida.'),
    ( 5, 'SD', 'Piensa que es importante interesarse por las cosas. Le gusta tener curiosidad y tratar de entender todo tipo de temas.'),
    ( 6, 'ST', 'Le gusta correr riesgos. Siempre está en busca de aventuras.'),
    ( 7, 'HE', 'Busca cada oportunidad que puede para divertirse. Para esta persona es importante hacer cosas que le den placer.'),
    ( 8, 'AC', 'Salir adelante en la vida es importante para esta persona. Se esfuerza por hacer las cosas mejor que los demás.'),
    ( 9, 'PO', 'Siempre quiere ser quien toma las decisiones. Le gusta ser quien lidera.'),
    (10, 'SE', 'Para esta persona es importante que las cosas estén organizadas y limpias. Realmente no le gusta el desorden.'),
    (11, 'CO', 'Para esta persona es importante comportarse siempre de forma correcta. Quiere evitar hacer cualquier cosa que la gente considere incorrecta.'),
    (12, 'TR', 'Piensa que lo mejor es hacer las cosas de manera tradicional. Para esta persona es importante mantener las costumbres que ha aprendido.'),
    (13, 'BE', 'Para esta persona es importante responder a las necesidades de los demás. Trata de apoyar a las personas que conoce.'),
    (14, 'UN', 'Cree que todas las personas del mundo deberían vivir en armonía. Para esta persona es importante promover la paz entre todos los grupos del mundo.'),
    (15, 'SD', 'Tener ideas nuevas y creativas es importante para esta persona. Le gusta hacer las cosas a su manera.'),
    (16, 'ST', 'Piensa que es importante hacer muchas cosas distintas en la vida. Siempre busca cosas nuevas para probar.'),
    (17, 'HE', 'Quiere disfrutar la vida al máximo. Pasarla bien es muy importante para esta persona.'),
    (18, 'AC', 'Tener mucho éxito es importante para esta persona. Le gusta impresionar a los demás.'),
    (19, 'PO', 'Para esta persona es importante estar al mando y decirles a los demás qué hacer. Quiere que la gente haga lo que dice.'),
    (20, 'SE', 'Tener un gobierno estable es importante para esta persona. Le preocupa que se proteja el orden social.')
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key)
SELECT v.version_id, items.seq, items.stem, items.dim, false
FROM v
CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1
  FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;

-- =====================================================================
-- Nota para Claude Code: los 3 stems neutros por-estrategia-C (seq 5, 9, 15) y el
-- referente "esta persona" son los unicos puntos donde la neutra se aparta
-- literalmente de los sets M/F; el resto es "para esta persona" en vez de "para
-- el/ella". Anclas (§5 del pack) y wiring MRAT/narrative siguen igual. Ver pack §4.
-- =====================================================================
