-- =====================================================================
-- TwIVI — 20 items es-CO (REALES) — Handoff Cowork -> Claude Code
-- Cierra el lado CONTENIDO de [GAP-TWIVI-ITEMS-ANCHORS-ES-CO].
-- Destino: db/seeds/instruments/TwIVI/items.sql (reemplaza los placeholders).
-- Pack de referencia: implementation_packs/TwIVI_Implementation_Acquisition_Pack_v1.0.md
-- Fecha: 2026-07-01. Owner contenido: Cowork. Owner aplicacion/seed: Claude Code.
-- =====================================================================
--
-- PROVENIENCIA (anti-invencion): los 20 portraits se EXTRAJERON verbatim del
-- instrumento oficial TwIVI (Sandy, Gosling, Schwartz & Koelkebeck, 2017; sitio
-- Gosling, UT-Austin) y se tradujeron a es-CO (Colombia), registro neutro, sin
-- rioplatense ni peninsularismos. Traduccion forward (ITC 2017) = CANDIDATA a
-- piloto cognitivo (back-translation + panel + N=6-8) antes del go-live cuanti.
--
-- LICENCIA: uso libre explicito ("anyone can use it for any purpose, no need to
-- ask permission"). Por eso los items traducidos SI pueden vivir en el seed
-- (a diferencia de PVQ, CC BY-NC-ND). Sin bloqueo de fase 7.
--
-- ORDEN: OFICIAL TwIVI 1..20 (coding key verbatim). Reemplaza el orden del
-- placeholder. Coding key -> dimension:
--   1,11 Conformidad (CO) | 2,12 Tradicion (TR) | 3,13 Benevolencia (BE)
--   4,14 Universalismo (UN) | 5,15 Autodireccion (SD) | 6,16 Estimulacion (ST)
--   7,17 Hedonismo (HE) | 8,18 Logro (AC) | 9,19 Poder (PO) | 10,20 Seguridad (SE)
-- Los 2 items de un valor quedan a 10 posiciones (control de aquiescencia).
-- El scorer sintetiza <dim><ordinal-por-sequence>: CO1(seq1)/CO2(seq11), etc.
-- -> coincide con value_map/scoring_rule ya sembrados. NO tocar instrument-version.sql
-- ni scoring-rule.sql (son por codigo de valor, independientes del orden).
--
-- reverse_key = FALSE para los 20 (TwIVI direct-keyed; el MRAT maneja el estilo
-- de uso de escala; sin reverse).
--
-- GENERO (decision German 2026-07-01): RAMIFICADO el/ella. Abajo van AMBOS sets
-- (masculino stem_m, femenino stem_f). La tabla `item` (db/schema/item.ts) hoy
-- tiene UN solo `stem` + uniqueIndex(instrument_version_id, sequence_number), asi
-- que sembrar dos variantes exige una decision de schema [GAP-TWIVI-GENDER-SCHEMA]:
--   A) Sustitucion en render (sin migracion): 1 stem con token de pronombre.
--   B) Columna `gender_variant` ('M'/'F'/'N') + uniqueIndex(version,seq,gender_variant): 40 filas. (Recomendada para "ramificado".)
--   C) Columna `stem_f` adicional.
-- Ver pack §4. Este archivo trae los textos M y F como fuente de verdad para
-- cualquiera de las 3 rutas. Considerar variante neutra 'N' para no-binario.
--
-- =====================================================================
-- FUENTE DE VERDAD DEL CONTENIDO: 20 items (seq, dimension, stem_m, stem_f)
-- =====================================================================
-- (Bloque de datos; las estrategias de INSERT estan mas abajo.)
--
-- seq | dim | stem_m / stem_f
-- ---------------------------------------------------------------------
--  1  CO  M: Cree que siempre debe mostrar respeto a sus padres y a las personas mayores. Para el es importante ser obediente.
--         F: Cree que siempre debe mostrar respeto a sus padres y a las personas mayores. Para ella es importante ser obediente.
--  2  TR  M: Las creencias religiosas son importantes para el. Se esfuerza por cumplir lo que su religion le exige.
--         F: Las creencias religiosas son importantes para ella. Se esfuerza por cumplir lo que su religion le exige.
--  3  BE  M: Para el es muy importante ayudar a la gente que lo rodea. Quiere velar por su bienestar.
--         F: Para ella es muy importante ayudar a la gente que la rodea. Quiere velar por su bienestar.
--  4  UN  M/F: Piensa que es importante que todas las personas del mundo reciban un trato igualitario. Cree que todos deberian tener las mismas oportunidades en la vida.
--  5  SD  M: Piensa que es importante interesarse por las cosas. Le gusta ser curioso y tratar de entender todo tipo de temas.
--         F: Piensa que es importante interesarse por las cosas. Le gusta ser curiosa y tratar de entender todo tipo de temas.
--  6  ST  M/F: Le gusta correr riesgos. Siempre esta en busca de aventuras.
--  7  HE  M: Busca cada oportunidad que puede para divertirse. Para el es importante hacer cosas que le den placer.
--         F: Busca cada oportunidad que puede para divertirse. Para ella es importante hacer cosas que le den placer.
--  8  AC  M: Salir adelante en la vida es importante para el. Se esfuerza por hacer las cosas mejor que los demas.
--         F: Salir adelante en la vida es importante para ella. Se esfuerza por hacer las cosas mejor que los demas.
--  9  PO  M: Siempre quiere ser quien toma las decisiones. Le gusta ser el lider.
--         F: Siempre quiere ser quien toma las decisiones. Le gusta ser la lider.
-- 10  SE  M: Para el es importante que las cosas esten organizadas y limpias. Realmente no le gusta el desorden.
--         F: Para ella es importante que las cosas esten organizadas y limpias. Realmente no le gusta el desorden.
-- 11  CO  M: Para el es importante comportarse siempre de forma correcta. Quiere evitar hacer cualquier cosa que la gente considere incorrecta.
--         F: Para ella es importante comportarse siempre de forma correcta. Quiere evitar hacer cualquier cosa que la gente considere incorrecta.
-- 12  TR  M: Piensa que lo mejor es hacer las cosas de manera tradicional. Para el es importante mantener las costumbres que ha aprendido.
--         F: Piensa que lo mejor es hacer las cosas de manera tradicional. Para ella es importante mantener las costumbres que ha aprendido.
-- 13  BE  M: Para el es importante responder a las necesidades de los demas. Trata de apoyar a las personas que conoce.
--         F: Para ella es importante responder a las necesidades de los demas. Trata de apoyar a las personas que conoce.
-- 14  UN  M: Cree que todas las personas del mundo deberian vivir en armonia. Para el es importante promover la paz entre todos los grupos del mundo.
--         F: Cree que todas las personas del mundo deberian vivir en armonia. Para ella es importante promover la paz entre todos los grupos del mundo.
-- 15  SD  M: Tener ideas nuevas y ser creativo es importante para el. Le gusta hacer las cosas a su manera.
--         F: Tener ideas nuevas y ser creativa es importante para ella. Le gusta hacer las cosas a su manera.
-- 16  ST  M/F: Piensa que es importante hacer muchas cosas distintas en la vida. Siempre busca cosas nuevas para probar.
-- 17  HE  M: Quiere disfrutar la vida al maximo. Pasarla bien es muy importante para el.
--         F: Quiere disfrutar la vida al maximo. Pasarla bien es muy importante para ella.
-- 18  AC  M: Tener mucho exito es importante para el. Le gusta impresionar a los demas.
--         F: Tener mucho exito es importante para ella. Le gusta impresionar a los demas.
-- 19  PO  M: Para el es importante estar al mando y decirles a los demas que hacer. Quiere que la gente haga lo que el dice.
--         F: Para ella es importante estar al mando y decirles a los demas que hacer. Quiere que la gente haga lo que ella dice.
-- 20  SE  M: Tener un gobierno estable es importante para el. Le preocupa que se proteja el orden social.
--         F: Tener un gobierno estable es importante para ella. Le preocupa que se proteja el orden social.
-- ---------------------------------------------------------------------
-- (Los acentos van completos en las estrategias de INSERT de abajo.)


-- =====================================================================
-- ESTRATEGIA B (RECOMENDADA para "ramificado") — requiere [GAP-TWIVI-GENDER-SCHEMA]
-- Precondicion de migracion: item.gender_variant text NOT NULL DEFAULT 'M'
--   + reemplazar uniqueIndex(version, seq) por uniqueIndex(version, seq, gender_variant).
-- Siembra 40 filas (20 M + 20 F). Idempotente por (version, seq, gender_variant).
-- =====================================================================
BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'TwIVI' AND iv.version = '1.0' AND iv.lang = 'es-CO'
  LIMIT 1
),
items(seq, dim, gv, stem) AS (
  VALUES
    -- ---- Masculino ----
    ( 1, 'CO', 'M', 'Cree que siempre debe mostrar respeto a sus padres y a las personas mayores. Para él es importante ser obediente.'),
    ( 2, 'TR', 'M', 'Las creencias religiosas son importantes para él. Se esfuerza por cumplir lo que su religión le exige.'),
    ( 3, 'BE', 'M', 'Para él es muy importante ayudar a la gente que lo rodea. Quiere velar por su bienestar.'),
    ( 4, 'UN', 'M', 'Piensa que es importante que todas las personas del mundo reciban un trato igualitario. Cree que todos deberían tener las mismas oportunidades en la vida.'),
    ( 5, 'SD', 'M', 'Piensa que es importante interesarse por las cosas. Le gusta ser curioso y tratar de entender todo tipo de temas.'),
    ( 6, 'ST', 'M', 'Le gusta correr riesgos. Siempre está en busca de aventuras.'),
    ( 7, 'HE', 'M', 'Busca cada oportunidad que puede para divertirse. Para él es importante hacer cosas que le den placer.'),
    ( 8, 'AC', 'M', 'Salir adelante en la vida es importante para él. Se esfuerza por hacer las cosas mejor que los demás.'),
    ( 9, 'PO', 'M', 'Siempre quiere ser quien toma las decisiones. Le gusta ser el líder.'),
    (10, 'SE', 'M', 'Para él es importante que las cosas estén organizadas y limpias. Realmente no le gusta el desorden.'),
    (11, 'CO', 'M', 'Para él es importante comportarse siempre de forma correcta. Quiere evitar hacer cualquier cosa que la gente considere incorrecta.'),
    (12, 'TR', 'M', 'Piensa que lo mejor es hacer las cosas de manera tradicional. Para él es importante mantener las costumbres que ha aprendido.'),
    (13, 'BE', 'M', 'Para él es importante responder a las necesidades de los demás. Trata de apoyar a las personas que conoce.'),
    (14, 'UN', 'M', 'Cree que todas las personas del mundo deberían vivir en armonía. Para él es importante promover la paz entre todos los grupos del mundo.'),
    (15, 'SD', 'M', 'Tener ideas nuevas y ser creativo es importante para él. Le gusta hacer las cosas a su manera.'),
    (16, 'ST', 'M', 'Piensa que es importante hacer muchas cosas distintas en la vida. Siempre busca cosas nuevas para probar.'),
    (17, 'HE', 'M', 'Quiere disfrutar la vida al máximo. Pasarla bien es muy importante para él.'),
    (18, 'AC', 'M', 'Tener mucho éxito es importante para él. Le gusta impresionar a los demás.'),
    (19, 'PO', 'M', 'Para él es importante estar al mando y decirles a los demás qué hacer. Quiere que la gente haga lo que él dice.'),
    (20, 'SE', 'M', 'Tener un gobierno estable es importante para él. Le preocupa que se proteja el orden social.'),
    -- ---- Femenino ----
    ( 1, 'CO', 'F', 'Cree que siempre debe mostrar respeto a sus padres y a las personas mayores. Para ella es importante ser obediente.'),
    ( 2, 'TR', 'F', 'Las creencias religiosas son importantes para ella. Se esfuerza por cumplir lo que su religión le exige.'),
    ( 3, 'BE', 'F', 'Para ella es muy importante ayudar a la gente que la rodea. Quiere velar por su bienestar.'),
    ( 4, 'UN', 'F', 'Piensa que es importante que todas las personas del mundo reciban un trato igualitario. Cree que todos deberían tener las mismas oportunidades en la vida.'),
    ( 5, 'SD', 'F', 'Piensa que es importante interesarse por las cosas. Le gusta ser curiosa y tratar de entender todo tipo de temas.'),
    ( 6, 'ST', 'F', 'Le gusta correr riesgos. Siempre está en busca de aventuras.'),
    ( 7, 'HE', 'F', 'Busca cada oportunidad que puede para divertirse. Para ella es importante hacer cosas que le den placer.'),
    ( 8, 'AC', 'F', 'Salir adelante en la vida es importante para ella. Se esfuerza por hacer las cosas mejor que los demás.'),
    ( 9, 'PO', 'F', 'Siempre quiere ser quien toma las decisiones. Le gusta ser la líder.'),
    (10, 'SE', 'F', 'Para ella es importante que las cosas estén organizadas y limpias. Realmente no le gusta el desorden.'),
    (11, 'CO', 'F', 'Para ella es importante comportarse siempre de forma correcta. Quiere evitar hacer cualquier cosa que la gente considere incorrecta.'),
    (12, 'TR', 'F', 'Piensa que lo mejor es hacer las cosas de manera tradicional. Para ella es importante mantener las costumbres que ha aprendido.'),
    (13, 'BE', 'F', 'Para ella es importante responder a las necesidades de los demás. Trata de apoyar a las personas que conoce.'),
    (14, 'UN', 'F', 'Cree que todas las personas del mundo deberían vivir en armonía. Para ella es importante promover la paz entre todos los grupos del mundo.'),
    (15, 'SD', 'F', 'Tener ideas nuevas y ser creativa es importante para ella. Le gusta hacer las cosas a su manera.'),
    (16, 'ST', 'F', 'Piensa que es importante hacer muchas cosas distintas en la vida. Siempre busca cosas nuevas para probar.'),
    (17, 'HE', 'F', 'Quiere disfrutar la vida al máximo. Pasarla bien es muy importante para ella.'),
    (18, 'AC', 'F', 'Tener mucho éxito es importante para ella. Le gusta impresionar a los demás.'),
    (19, 'PO', 'F', 'Para ella es importante estar al mando y decirles a los demás qué hacer. Quiere que la gente haga lo que ella dice.'),
    (20, 'SE', 'F', 'Tener un gobierno estable es importante para ella. Le preocupa que se proteja el orden social.')
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key, gender_variant)
SELECT v.version_id, items.seq, items.stem, items.dim, false, items.gv
FROM v CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1 FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
    AND it.gender_variant = items.gv
);

COMMIT;


-- =====================================================================
-- ESTRATEGIA A (SIN migracion) — fallback single-stem con token de pronombre.
-- Usa UN stem por item con el token {gp} que el render resuelve por genero
-- declarado (el/ella; y {gp_a} para adjetivos: curioso/a, creativo/a, el/la lider).
-- Requiere solo logica de sustitucion en el runner (no cambio de schema).
-- Descomentar SOLO si se elige la Opcion A; entonces NO usar la Estrategia B.
-- =====================================================================
-- BEGIN;
-- WITH v AS (
--   SELECT iv.id AS version_id FROM public.instrument_version iv
--   JOIN public.instrument i ON i.id = iv.instrument_id
--   WHERE i.code = 'TwIVI' AND iv.version = '1.0' AND iv.lang = 'es-CO' LIMIT 1
-- ),
-- items(seq, dim, stem) AS (
--   VALUES
--     ( 1, 'CO', 'Cree que siempre debe mostrar respeto a sus padres y a las personas mayores. Para {gp} es importante ser obediente.'),
--     ( 2, 'TR', 'Las creencias religiosas son importantes para {gp}. Se esfuerza por cumplir lo que su religión le exige.'),
--     ( 3, 'BE', 'Para {gp} es muy importante ayudar a la gente que {gp_lo_la} rodea. Quiere velar por su bienestar.'),
--     ( 4, 'UN', 'Piensa que es importante que todas las personas del mundo reciban un trato igualitario. Cree que todos deberían tener las mismas oportunidades en la vida.'),
--     ( 5, 'SD', 'Piensa que es importante interesarse por las cosas. Le gusta ser {gp_curioso} y tratar de entender todo tipo de temas.'),
--     ( 6, 'ST', 'Le gusta correr riesgos. Siempre está en busca de aventuras.'),
--     ( 7, 'HE', 'Busca cada oportunidad que puede para divertirse. Para {gp} es importante hacer cosas que le den placer.'),
--     ( 8, 'AC', 'Salir adelante en la vida es importante para {gp}. Se esfuerza por hacer las cosas mejor que los demás.'),
--     ( 9, 'PO', 'Siempre quiere ser quien toma las decisiones. Le gusta ser {gp_el_la} líder.'),
--     (10, 'SE', 'Para {gp} es importante que las cosas estén organizadas y limpias. Realmente no le gusta el desorden.'),
--     (11, 'CO', 'Para {gp} es importante comportarse siempre de forma correcta. Quiere evitar hacer cualquier cosa que la gente considere incorrecta.'),
--     (12, 'TR', 'Piensa que lo mejor es hacer las cosas de manera tradicional. Para {gp} es importante mantener las costumbres que ha aprendido.'),
--     (13, 'BE', 'Para {gp} es importante responder a las necesidades de los demás. Trata de apoyar a las personas que conoce.'),
--     (14, 'UN', 'Cree que todas las personas del mundo deberían vivir en armonía. Para {gp} es importante promover la paz entre todos los grupos del mundo.'),
--     (15, 'SD', 'Tener ideas nuevas y ser {gp_creativo} es importante para {gp}. Le gusta hacer las cosas a su manera.'),
--     (16, 'ST', 'Piensa que es importante hacer muchas cosas distintas en la vida. Siempre busca cosas nuevas para probar.'),
--     (17, 'HE', 'Quiere disfrutar la vida al máximo. Pasarla bien es muy importante para {gp}.'),
--     (18, 'AC', 'Tener mucho éxito es importante para {gp}. Le gusta impresionar a los demás.'),
--     (19, 'PO', 'Para {gp} es importante estar al mando y decirles a los demás qué hacer. Quiere que la gente haga lo que {gp} dice.'),
--     (20, 'SE', 'Tener un gobierno estable es importante para {gp}. Le preocupa que se proteja el orden social.')
--   -- tokens: {gp}=él|ella ; {gp_lo_la}=lo|la ; {gp_el_la}=el|la ; {gp_curioso}=curioso|curiosa ; {gp_creativo}=creativo|creativa
-- )
-- INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key)
-- SELECT v.version_id, items.seq, items.stem, items.dim, false
-- FROM v CROSS JOIN items
-- WHERE NOT EXISTS (
--   SELECT 1 FROM public.item it
--   WHERE it.instrument_version_id = v.version_id AND it.sequence_number = items.seq
-- );
-- COMMIT;
-- =====================================================================
-- FIN. Ver pack §4 (genero), §5 (anclas), §11 (handoff completo).
-- =====================================================================
