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
-- in the `bfi60` comment per row below (e.g. BFI-2-S #1 "quiet" = BFI-2-60 #16).
-- The schema has NO `item_code` column today, so the 60-identity cannot be
-- stored as data yet. [GAP-ITEM-CODE-COLUMN]: a later plan (Phase 3 projection
-- engine / a 02-wave schema migration) must add `item.item_code` and back-fill
-- it from these comments to make the Free->Paid projection key-based. Until
-- then the 60-identity lives in these comments + the dossier mapping (dossier
-- 01_BFI-2 §2.2). This is the same "seed the faithful representation now, flag
-- the schema dependency" posture as the narrative_template dimension_band gap.
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
items(seq, dim, rev, stem) AS (
  VALUES
    -- seq | dim | reverse | es-CO stem                                  (BFI-2-S# / facet / bfi60#)
    ( 1, 'EXT', true,  'Que tiende a estar callado/a'),                 -- #1  Sociability(R)      bfi60 16
    ( 2, 'AGR', false, 'Compasivo/a, con un gran corazon'),             -- #2  Compassion(D)       bfi60 2
    ( 3, 'CON', true,  'Que tiende a ser desordenado/a'),               -- #3  Organization(R)     bfi60 3
    ( 4, 'NEG', false, 'Que se preocupa mucho'),                        -- #4  Anxiety(D)          bfi60 34
    ( 5, 'OPN', false, 'Fascinado/a por el arte, la musica o la literatura'), -- #5 AesthSens(D)   bfi60 20
    ( 6, 'EXT', false, 'Con una personalidad asertiva'),               -- #6  Assertiveness(D)    bfi60 21
    ( 7, 'AGR', true,  'Que a veces es grosero/a con los demas'),       -- #7  Respectfulness(R)   bfi60 37
    ( 8, 'CON', true,  'A quien le cuesta empezar las tareas'),         -- #8  Productiveness(R)   bfi60 23
    ( 9, 'NEG', false, 'Que tiende a sentirse deprimido/a, melancolico/a'), -- #9 Depression(D)    bfi60 54
    (10, 'OPN', true,  'Con poco interes por ideas abstractas'),        -- #10 IntelCuriosity(R)  bfi60 55
    (11, 'EXT', false, 'Lleno/a de energia'),                          -- #11 EnergyLevel(D)     bfi60 41
    (12, 'AGR', false, 'Que piensa bien de los demas'),                -- #12 Trust(D)           bfi60 57
    (13, 'CON', false, 'Confiable, alguien con quien siempre se puede contar'), -- #13 Respons(D) bfi60 43
    (14, 'NEG', true,  'Emocionalmente estable, que no se altera con facilidad'), -- #14 EmoVol(R) bfi60 29
    (15, 'OPN', false, 'Original, que aporta ideas nuevas'),            -- #15 CreativeImag(D)    bfi60 60
    (16, 'EXT', false, 'Abierto/a, sociable'),                         -- #16 Sociability(D)     bfi60 1
    (17, 'AGR', true,  'Que puede ser frio/a e insensible'),            -- #17 Compassion(R)      bfi60 47
    (18, 'CON', false, 'Que mantiene todo limpio y ordenado'),          -- #18 Organization(D)    bfi60 33
    (19, 'NEG', true,  'Relajado/a, que gestiona bien el estres'),      -- #19 Anxiety(R)         bfi60 4
    (20, 'OPN', true,  'Con pocos intereses artisticos'),              -- #20 AesthSens(R)       bfi60 5
    (21, 'EXT', true,  'Que prefiere que otros asuman la responsabilidad'), -- #21 Assertive(R)   bfi60 51
    (22, 'AGR', false, 'Respetuoso/a, que trata a los demas con respeto'), -- #22 Respect(D)      bfi60 7
    (23, 'CON', false, 'Tenaz, que trabaja hasta terminar la tarea'),   -- #23 Productiveness(D)  bfi60 53
    (24, 'NEG', true,  'Que se siente seguro/a, comodo/a consigo mismo/a'), -- #24 Depression(R)  bfi60 24
    (25, 'OPN', false, 'Complejo/a, de pensamientos profundos'),        -- #25 IntelCuriosity(D)  bfi60 40
    (26, 'EXT', true,  'Menos activo/a que otras personas'),            -- #26 EnergyLevel(R)     bfi60 26
    (27, 'AGR', true,  'Que tiende a buscar los defectos de los demas'), -- #27 Trust(R)          bfi60 12
    (28, 'CON', true,  'Que puede ser algo descuidado/a'),              -- #28 Responsibility(R)  bfi60 28
    (29, 'NEG', false, 'Temperamental, que se altera con facilidad'),   -- #29 EmoVolatility(D)   bfi60 59
    (30, 'OPN', true,  'Con poca creatividad')                         -- #30 CreativeImag(R)    bfi60 30
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key)
SELECT v.version_id, items.seq, items.stem, items.dim, items.rev
FROM v
CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1
  FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;
