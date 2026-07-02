-- TwIVI 20 items es-CO seed — NEUTRAL gender variant (real stems).
--
-- 20 TwIVI items: 10 classic Schwartz basic values × 2 items each, 6-pt Likert
-- (1-6, asymmetric labeled-rows — no neutral center; the anchors are rendered by
-- lib/questionnaire/response-scales.ts, the ONE code↔anchors bridge, FOUND-05).
--
-- CONTENT: real es-CO stems, NEUTRAL in gender. Extracted verbatim from the
-- official TwIVI (Sandy, Gosling, Schwartz & Koelkebeck, 2017; Gosling Lab,
-- UT-Austin) and adapted es-CO; the neutral variant is DERIVED from the M/F sets
-- in estado/TwIVI_items_es-CO_SEED_v1.0.sql (meaning unchanged). Wording is a
-- CANDIDATE for cognitive pilot (ITC 2017), not firm-approved.
--   Neutralization (Cowork, ADR-030 addendum): "para él/ella" → "para esta persona";
--   adjectives → noun phrases where needed (seq 5 curioso/a → tener curiosidad;
--   seq 9 el/la líder → ser quien lidera; seq 15 creativo/a → ideas creativas).
--   Closes [GAP-TWIVI-ITEMS-ANCHORS-ES-CO] (content). The él/ella branching is
--   DEFERRED to [GAP-TWIVI-GENDER-SCHEMA] (needs gender capture + Ley 1581); the
--   M/F sets stay in the v1.0 seed as that phase's input.
--
-- `dimension` carries the basic-value CODE (SD/ST/HE/AC/PO/SE/CO/TR/BE/UN). The
-- scorer (lib/scoring/score-session.ts) synthesizes each item's scoring key as
-- <dimension><ordinal-within-dimension> by sorting that value's items by
-- sequence_number → CO1/CO2, TR1/TR2, ... The value_map/hov_map in
-- instrument-version.sql use the SAME <value><ordinal> keys.
--
-- Codes are TwIVI-NATIVE basic-value codes, NOT PVQ-RR refined-value codes
-- (D-E2.1: values has NO Free→Paid code reuse — the Paid PVQ-RR re-administers).
--
-- reverse_key = FALSE for all 20: TwIVI is direct-keyed (MRAT centering handles
-- within-person scale-use, no reverse items).
--
-- ORDER: OFFICIAL TwIVI coding-key order 1:CO..20:SE (the two items of a value are
-- 10 apart — acquiescence control). Reordering vs the old placeholder seed is
-- scoring-NEUTRAL (keys are synthesized per value+ordinal, not by absolute seq).
--   1,11 CO | 2,12 TR | 3,13 BE | 4,14 UN | 5,15 SD | 6,16 ST | 7,17 HE
--   8,18 AC | 9,19 PO | 10,20 SE
--
-- IDEMPOTENT for FRESH DBs (NOT EXISTS on version+seq). NOTE: to reseed a DB that
-- already holds the old placeholder rows (e.g. prod), DELETE the TwIVI items first
-- — NOT EXISTS will otherwise skip the existing seqs and keep the placeholders.

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
