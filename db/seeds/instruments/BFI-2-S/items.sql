-- BFI-2-S 30 items es-CO seed — DescubreMe Phase 2 Wave 4 (Plan 02-09).
--
-- Inserts the 30 BFI-2-S items in the native Soto-John (2017b) presentation
-- order (sequence_number 1..30). Native order is deliberately spaced so items
-- of the same facet are not adjacent (acquiescence control) — do NOT reorder
-- (pack §1.3 / dossier §7 "no aleatorizar"). All stems are the official es
-- translation (Gallardo-Pujol et al. 2022, OSF kp572, CC-BY 4.0) with the
-- documented Colombia lexical adjustments (pack §2.2): item 3 "desordenado/a",
-- item 12 "los demas", item 13 "Confiable, alguien con quien...", item 29
-- "se altera con facilidad". Stem comun: "Soy alguien que...".
--
-- `dimension` carries the 3-letter DOMAIN code (EXT/AGR/CON/NEG/OPN). The
-- scorer (lib/scoring/score-session.ts step 6) synthesizes each item's
-- scoring code as <dimension><ordinal-within-dimension> by sorting the items
-- of a dimension by sequence_number. The scoring-rule formula uses the SAME
-- <dimension><ordinal> codes (EXT1..EXT6, AGR1..AGR6, ...). That positional
-- scheme is what scoring + the reverse_keyed list consume.
--
-- `reverse_key` = TRUE for exactly the 15 reverse items (pack §4 / Colby key):
-- BFI-2-S #1,3,7,8,10,14,17,19,20,21,24,26,27,28,30.
--
-- D-E2.1 (canonical BFI-2-60 identity, Free->Paid reuse): each BFI-2-S item IS
-- a fixed subset member of the BFI-2-60; its canonical 60-form number is given
-- in the `code` column below as 'BFI-2-60-NN' (e.g. BFI-2-S #1 "quiet" =
-- BFI-2-60 #16 -> 'BFI-2-60-16'). [GAP-ITEM-CODE-COLUMN] RESOLVED (02-13):
-- migration 015 added `item.item_code text` (nullable); this seed now persists
-- the 60-form identity as DATA so the Phase-3 Free->Paid projection can key off
-- it. Scoring is UNCHANGED — it stays positional (<dimension><ordinal>); item_code
-- is identity, not a scoring key. Provenance: dossier 01_BFI-2 §2.2 coding map.
--
-- Anchors:
--   - implementation_packs/BFI-2-S_..._Consolidado.md §1.1 (30 items EN + facets/keys), §2.2 (es-CO lexical mods).
--   - implementation_packs/BFI-2-60_..._Consolidado.md §1 (official es-CO 60-item stems).
--   - dossiers/01_BFI-2_Consolidado.md §2.2 (BFI-2-S -> BFI-2-60 coding map).
--   - implementation_packs/RESPONSE_ANCHORS_es-CO_v1.0.md §BFI-2-S (5-pt anchors).
--   - 02-CONTEXT.md D-E2.1, D-A.5.
--   - db/seeds/instruments/ONET-IP-SF/items.sql (idempotent pattern).
--
-- Anchors (5-pt, NOT stored here): the labeled-rows anchors
-- (1 Muy en desacuerdo ... 5 Muy de acuerdo) are rendered by ItemForm via
-- lib/questionnaire/response-scales.ts (the ONE bridge from instrument code to
-- anchors, FOUND-05). Wiring BFI anchors there is a 02-08/UI concern, out of
-- this seed's scope; flagged in 02-09-SUMMARY.

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'BFI-2-S'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
  LIMIT 1
),
items(seq, dim, rev, stem, code) AS (
  VALUES
    -- seq | dim | reverse | es-CO stem                                  | item_code (BFI-2-60#) -- facet
    ( 1, 'EXT', true,  'Que tiende a estar callado/a',                 'BFI-2-60-16'), -- #1  Sociability(R)
    ( 2, 'AGR', false, 'Compasivo/a, con un gran corazon',             'BFI-2-60-2'),  -- #2  Compassion(D)
    ( 3, 'CON', true,  'Que tiende a ser desordenado/a',               'BFI-2-60-3'),  -- #3  Organization(R)
    ( 4, 'NEG', false, 'Que se preocupa mucho',                        'BFI-2-60-34'), -- #4  Anxiety(D)
    ( 5, 'OPN', false, 'Fascinado/a por el arte, la musica o la literatura', 'BFI-2-60-20'), -- #5 AesthSens(D)
    ( 6, 'EXT', false, 'Con una personalidad asertiva',               'BFI-2-60-21'), -- #6  Assertiveness(D)
    ( 7, 'AGR', true,  'Que a veces es grosero/a con los demas',       'BFI-2-60-37'), -- #7  Respectfulness(R)
    ( 8, 'CON', true,  'A quien le cuesta empezar las tareas',         'BFI-2-60-23'), -- #8  Productiveness(R)
    ( 9, 'NEG', false, 'Que tiende a sentirse deprimido/a, melancolico/a', 'BFI-2-60-54'), -- #9 Depression(D)
    (10, 'OPN', true,  'Con poco interes por ideas abstractas',        'BFI-2-60-55'), -- #10 IntelCuriosity(R)
    (11, 'EXT', false, 'Lleno/a de energia',                          'BFI-2-60-41'), -- #11 EnergyLevel(D)
    (12, 'AGR', false, 'Que piensa bien de los demas',                'BFI-2-60-57'), -- #12 Trust(D)
    (13, 'CON', false, 'Confiable, alguien con quien siempre se puede contar', 'BFI-2-60-43'), -- #13 Respons(D)
    (14, 'NEG', true,  'Emocionalmente estable, que no se altera con facilidad', 'BFI-2-60-29'), -- #14 EmoVol(R)
    (15, 'OPN', false, 'Original, que aporta ideas nuevas',            'BFI-2-60-60'), -- #15 CreativeImag(D)
    (16, 'EXT', false, 'Abierto/a, sociable',                         'BFI-2-60-1'),  -- #16 Sociability(D)
    (17, 'AGR', true,  'Que puede ser frio/a e insensible',            'BFI-2-60-47'), -- #17 Compassion(R)
    (18, 'CON', false, 'Que mantiene todo limpio y ordenado',          'BFI-2-60-33'), -- #18 Organization(D)
    (19, 'NEG', true,  'Relajado/a, que gestiona bien el estres',      'BFI-2-60-4'),  -- #19 Anxiety(R)
    (20, 'OPN', true,  'Con pocos intereses artisticos',              'BFI-2-60-5'),  -- #20 AesthSens(R)
    (21, 'EXT', true,  'Que prefiere que otros asuman la responsabilidad', 'BFI-2-60-51'), -- #21 Assertive(R)
    (22, 'AGR', false, 'Respetuoso/a, que trata a los demas con respeto', 'BFI-2-60-7'), -- #22 Respect(D)
    (23, 'CON', false, 'Tenaz, que trabaja hasta terminar la tarea',   'BFI-2-60-53'), -- #23 Productiveness(D)
    (24, 'NEG', true,  'Que se siente seguro/a, comodo/a consigo mismo/a', 'BFI-2-60-24'), -- #24 Depression(R)
    (25, 'OPN', false, 'Complejo/a, de pensamientos profundos',        'BFI-2-60-40'), -- #25 IntelCuriosity(D)
    (26, 'EXT', true,  'Menos activo/a que otras personas',            'BFI-2-60-26'), -- #26 EnergyLevel(R)
    (27, 'AGR', true,  'Que tiende a buscar los defectos de los demas', 'BFI-2-60-12'), -- #27 Trust(R)
    (28, 'CON', true,  'Que puede ser algo descuidado/a',              'BFI-2-60-28'), -- #28 Responsibility(R)
    (29, 'NEG', false, 'Temperamental, que se altera con facilidad',   'BFI-2-60-59'), -- #29 EmoVolatility(D)
    (30, 'OPN', true,  'Con poca creatividad',                        'BFI-2-60-30')  -- #30 CreativeImag(R)
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key, item_code)
SELECT v.version_id, items.seq, items.stem, items.dim, items.rev, items.code
FROM v
CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1
  FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;
