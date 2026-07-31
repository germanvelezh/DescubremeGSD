-- BFI-2-60 60 items es-CO seed — DescubreMe Fase 3 Wave 3 (Plan 03-04).
--
-- Inserts the 60 BFI-2 items in the native Soto-John (2017b) presentation order
-- (sequence_number 1..60). Native order is deliberately spaced so items of the
-- same facet are never adjacent (acquiescence control) — do NOT reorder and do
-- NOT randomize (pack §1.3 "Restriccion de orden de presentacion").
--
-- STEMS: official es translation (Gallardo-Pujol et al., 2022; PDF Colby /
-- OSF kp572, CC-BY 4.0), transcribed from pack §1.1. They are TRANSCRIBED, not
-- authored. Colombia lexical adjustments applied: only the ones already carried
-- by the live BFI-2-S seed for the SHARED items (#3 "desordenado/a",
-- #43 "Confiable, alguien con quien...", #57 "los demas", #59 "se altera con
-- facilidad"), so a shared item reads identically in both forms.
-- Pack §2.2 flags #48 ("hecho un lio") as PILOT PRIORITY with a candidate
-- es-CO rewording. It is seeded with the BASE ES text on purpose: §2.2's own
-- rule is "modificar SOLO los items que el piloto cognitivo senale", no pilot
-- has run, and item wording is Cowork's call (CLAUDE.md §6). Flagged as
-- [GAP-BFI260-ITEM-48-PILOTO-ES-CO].
--
-- `dimension` carries the 3-letter DOMAIN code (EXT/AGR/CON/NEG/OPN). The
-- scorer (lib/scoring/score-session.ts step 6) synthesizes each item's scoring
-- code as <dimension><ordinal-within-dimension> by sorting the items of a
-- dimension by sequence_number. Domain = ((seq - 1) mod 5), so each domain owns
-- 12 items at seq d, d+5, ... d+55 and the ordinals run 1..12 in that order.
-- scoring-rule.sql consumes exactly those synthesized codes.
--
-- `reverse_key` = TRUE for exactly the 30 reverse items of pack §4 (perfect
-- 30/30 balance): #3,4,5,8,9,11,12,16,17,22,23,24,25,26,28,29,30,31,36,37,42,
-- 44,45,47,48,49,50,51,55,58. Pack §4's own warning applies: "un error en la
-- tabla de inversiones destruye la interpretabilidad factorial de forma
-- irrecuperable" — hence the integration test recomputes the reverse ordinals
-- FROM THESE ROWS and compares them against the scoring_rule JSON, so a slip in
-- either file turns red instead of producing a quietly wrong score.
--
-- `item_code` = 'BFI-2-60-NN' where NN is this item's own sequence number. This
-- is the canonical 60-form identity and THE ONLY KEY of the D-10 Free->Paid
-- projection. The other half of that key was seeded in Phase 2: BFI-2-S carries
-- item_code already, numbered in THIS space (its item 1 "callado" is
-- 'BFI-2-60-16'). The two sets therefore intersect in exactly the 30 items the
-- BFI-2-S is made of. WITHOUT this column populated the projection would return
-- all 60 and the reuse would vanish IN SILENCE — no error, just a user
-- re-answering 30 questions. tests/integration/seeds/bfi-2-60.test.ts asserts
-- the intersection size so that failure mode is red, not green.
--
-- item_code has NO unique index (migration 015 adds it plain nullable), so the
-- same 'BFI-2-60-NN' string legitimately appears on two rows: one in BFI-2-S,
-- one here. That is identity, not a constraint violation.
--
-- ---------------------------------------------------------------------------
-- DISCREPANCIA HEREDADA, DECLARADA Y **NO** CORREGIDA AQUI: item #21.
-- ---------------------------------------------------------------------------
-- The live BFI-2-S seed maps its item 6 to 'BFI-2-60-21' but gives it the es
-- text of BFI-2 #6 ("Con una personalidad asertiva"). Per BFI-2-S pack §1.1
-- (line 78) the BFI-2-S item 6 is EN "Is dominant, acts as a leader", i.e.
-- BFI-2 #21 — so the CODE is right and the STEM is a Phase-2 transcription
-- slip. This seed writes the pack-correct stems on BOTH sides (#6 "Con una
-- personalidad asertiva", #21 "Dominante, que actua como lider"); it does NOT
-- touch BFI-2-S, because changing the wording of a LIVE production item is a
-- psychometric/content decision that belongs to Cowork and German, not to this
-- plan (CLAUDE.md §6/§14). Consequence, stated plainly: for a projected user
-- the value they gave to "personalidad asertiva" is carried onto #21
-- ("dominante/lider") and they are then asked #6 with wording they already
-- saw. Both are Assertiveness-Direct so the domain sum is unaffected, but the
-- item-level provenance is wrong. Flagged as [GAP-BFI2S-STEM-ITEM-6] and
-- asserted as the ONE tolerated stem divergence in the integration test, so a
-- SECOND divergence — or a fix of this one — turns the suite red.
--
-- Anchors:
--   - implementation_packs/BFI-2-60_..._Consolidado.md §1.1 (60 stems EN + ES), §1.3, §2.2, §4.
--   - implementation_packs/BFI-2-S_..._Consolidado.md §1.1 (BFI-2-S 30 items EN + facets/keys).
--   - implementation_packs/RESPONSE_ANCHORS_es-CO_v1.0.md §BFI-2-S (the same 5-pt agreement anchors).
--   - db/seeds/instruments/BFI-2-S/items.sql (idempotent pattern + the other half of the key).
--
-- Anchors (5-pt, NOT stored here): the labeled-rows anchors are rendered by
-- ItemForm via lib/questionnaire/response-scales.ts — the ONE bridge from an
-- instrument code to its anchor set (FOUND-05-excluded on purpose). BFI-2-60
-- reuses the BFI agreement anchors verbatim; wired in that file by this plan.

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'BFI-2-60'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
  LIMIT 1
),
items(seq, dim, rev, stem) AS (
  VALUES
    -- seq | dim | reverse | es-CO stem                                            -- facet (D/R) · [S] = shared with BFI-2-S
    ( 1, 'EXT', false, 'Abierto/a, sociable'),                                     -- Sociabilidad(D)      [S]
    ( 2, 'AGR', false, 'Compasivo/a, con un gran corazón'),                        -- Compasion(D)         [S]
    ( 3, 'CON', true,  'Que tiende a ser desordenado/a'),                          -- Organizacion(R)      [S] es-CO
    ( 4, 'NEG', true,  'Relajado/a, que gestiona bien el estrés'),                 -- Ansiedad(R)          [S] NFR-28
    ( 5, 'OPN', true,  'Con pocos intereses artísticos'),                          -- SensEstetica(R)      [S]
    ( 6, 'EXT', false, 'Con una personalidad asertiva'),                           -- Asertividad(D)
    ( 7, 'AGR', false, 'Respetuoso/a, que trata a los demás con respeto'),         -- Respeto(D)           [S]
    ( 8, 'CON', true,  'Que tiende a ser perezoso/a'),                             -- Productividad(R)
    ( 9, 'NEG', true,  'Que se mantiene optimista después de sufrir un contratiempo'), -- Depresion(R)      NFR-28
    (10, 'OPN', false, 'Que siente curiosidad por gran variedad de cosas'),        -- CuriosidadIntel(D)
    (11, 'EXT', true,  'Que raramente se siente emocionado/a o entusiasmado/a'),   -- NivelEnergia(R)
    (12, 'AGR', true,  'Que tiende a buscar los defectos de los demás'),           -- Confianza(R)         [S]
    (13, 'CON', false, 'Formal, constante'),                                       -- Responsabilidad(D)
    (14, 'NEG', false, 'Variable, con notables cambios de humor'),                 -- VolatilidadEmo(D)
    (15, 'OPN', false, 'Ingenioso/a, que busca formas inteligentes de hacer las cosas'), -- ImagCreativa(D)
    (16, 'EXT', true,  'Que tiende a estar callado/a'),                            -- Sociabilidad(R)      [S]
    (17, 'AGR', true,  'Que siente poca compasión hacia los demás'),               -- Compasion(R)
    (18, 'CON', false, 'Metódico/a, a quien le gusta mantenerlo todo en orden'),   -- Organizacion(D)
    (19, 'NEG', false, 'Que puede ponerse tenso/a'),                               -- Ansiedad(D)          NFR-28
    (20, 'OPN', false, 'Fascinado/a por el arte, la música o la literatura'),      -- SensEstetica(D)      [S]
    (21, 'EXT', false, 'Dominante, que actúa como líder'),                         -- Asertividad(D)       [S] ver nota #21
    (22, 'AGR', true,  'Que empieza discusiones con los demás'),                   -- Respeto(R)
    (23, 'CON', true,  'A quien le cuesta empezar las tareas'),                    -- Productividad(R)     [S]
    (24, 'NEG', true,  'Que se siente seguro/a, cómodo/a consigo mismo/a'),        -- Depresion(R)         [S] NFR-28
    (25, 'OPN', true,  'Que evita conversaciones intelectuales y filosóficas'),    -- CuriosidadIntel(R)
    (26, 'EXT', true,  'Menos activo/a que otras personas'),                       -- NivelEnergia(R)      [S]
    (27, 'AGR', false, 'Comprensivo/a con los demás'),                             -- Confianza(D)
    (28, 'CON', true,  'Que puede ser algo descuidado/a'),                         -- Responsabilidad(R)   [S]
    (29, 'NEG', true,  'Emocionalmente estable, que no se altera con facilidad'),  -- VolatilidadEmo(R)    [S]
    (30, 'OPN', true,  'Con poca creatividad'),                                    -- ImagCreativa(R)      [S]
    (31, 'EXT', true,  'A veces tímido/a, introvertido/a'),                        -- Sociabilidad(R)
    (32, 'AGR', false, 'Servicial y generoso/a con los demás'),                    -- Compasion(D)
    (33, 'CON', false, 'Que mantiene todo limpio y ordenado'),                     -- Organizacion(D)      [S]
    (34, 'NEG', false, 'Que se preocupa mucho'),                                   -- Ansiedad(D)          [S] NFR-28
    (35, 'OPN', false, 'Que valora el arte y la belleza'),                         -- SensEstetica(D)
    (36, 'EXT', true,  'A quien le es difícil influir en los demás'),              -- Asertividad(R)
    (37, 'AGR', true,  'Que a veces es grosero/a con los demás'),                  -- Respeto(R)           [S]
    (38, 'CON', false, 'Eficiente, que consigue que las cosas se hagan'),          -- Productividad(D)
    (39, 'NEG', false, 'Que a menudo se siente triste'),                           -- Depresion(D)         NFR-28
    (40, 'OPN', false, 'Complejo/a, de pensamientos profundos'),                   -- CuriosidadIntel(D)   [S]
    (41, 'EXT', false, 'Lleno/a de energía'),                                      -- NivelEnergia(D)      [S]
    (42, 'AGR', true,  'Que desconfía de las intenciones de los demás'),           -- Confianza(R)
    (43, 'CON', false, 'Confiable, alguien con quien siempre se puede contar'),    -- Responsabilidad(D)   [S] es-CO
    (44, 'NEG', true,  'Que controla sus emociones'),                              -- VolatilidadEmo(R)
    (45, 'OPN', true,  'Que tiene dificultad para imaginarse las cosas'),          -- ImagCreativa(R)
    (46, 'EXT', false, 'Hablador/a'),                                              -- Sociabilidad(D)
    (47, 'AGR', true,  'Que puede ser frío/a e insensible'),                       -- Compasion(R)         [S]
    (48, 'CON', true,  'Que lo deja todo hecho un lío, que no limpia'),            -- Organizacion(R)      pilot §2.2
    (49, 'NEG', true,  'Que raramente se siente ansioso/a o miedoso/a'),           -- Ansiedad(R)          NFR-28
    (50, 'OPN', true,  'Que considera que la poesía y el teatro son aburridos'),   -- SensEstetica(R)
    (51, 'EXT', true,  'Que prefiere que otros asuman la responsabilidad'),        -- Asertividad(R)       [S]
    (52, 'AGR', false, 'Educado/a, cortés con los demás'),                         -- Respeto(D)
    (53, 'CON', false, 'Tenaz, que trabaja hasta terminar la tarea'),              -- Productividad(D)     [S]
    (54, 'NEG', false, 'Que tiende a sentirse deprimido/a, melancólico/a'),        -- Depresion(D)         [S] NFR-28
    (55, 'OPN', true,  'Con poco interés por ideas abstractas'),                   -- CuriosidadIntel(R)   [S]
    (56, 'EXT', false, 'Que muestra mucho entusiasmo'),                            -- NivelEnergia(D)
    (57, 'AGR', false, 'Que piensa bien de los demás'),                            -- Confianza(D)         [S] es-CO
    (58, 'CON', true,  'Que a veces se comporta de manera irresponsable'),         -- Responsabilidad(R)
    (59, 'NEG', false, 'Temperamental, que se altera con facilidad'),              -- VolatilidadEmo(D)    [S] es-CO
    (60, 'OPN', false, 'Original, que aporta ideas nuevas')                        -- ImagCreativa(D)      [S]
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key, item_code)
SELECT
  v.version_id,
  items.seq,
  items.stem,
  items.dim,
  items.rev,
  -- La identidad canonica ES el numero de secuencia en el espacio del 60.
  'BFI-2-60-' || items.seq::text
FROM v
CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1
  FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;
