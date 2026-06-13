-- PERMA-Profiler 23 items es-CO seed — DescubreMe Phase 2 Wave 4 (Plan 02-11).
--
-- Inserts the 23 PERMA-Profiler items in the NATIVE Butler & Kern (2016, Tabla
-- 5) presentation order (sequence_number 1..23). The order is NOT by dimension:
-- the 23 items are interleaved across 8 visual blocks to reduce halo effects
-- (pack §1.3 "El plugin debe respetar este orden literal"). Do NOT reorder.
--
-- 15 PERMA items (3 per dimension: P/E/R/M/A) + 8 fillers (N1-N3 negative
-- emotion, H1-H3 health, Lon loneliness single-item, hap global happiness
-- single-item). NO reverse items (pack §4: PERMA uses only positively-worded
-- items; N/H/Lon are reported as their own dimensions, N/Lon inverted in the
-- band convention — NOT recoded into the positive dimensions).
--
-- `dimension` carries the dimension code (P/E/R/M/A/N/H/Lon/hap). The scorer
-- (lib/scoring/score-session.ts step 6) synthesizes each item's scoring code as
-- <dimension><ordinal-within-dimension> by ranking the items of a dimension by
-- sequence_number. The scoring-rule formula (scoring-rule.sql) and the
-- distress_thresholds keys (instrument-version.sql) use the SAME positional
-- codes. Verified positional map (ordinal = rank within dim by seq):
--   P:  P1(seq3)  P2(seq13) P3(seq22)
--   E:  E1(seq2)  E2(seq10) E3(seq17)
--   R:  R1(seq8)  R2(seq19) R3(seq21)
--   M:  M1(seq7)  M2(seq9)  M3(seq20)
--   A:  A1(seq1)  A2(seq5)  A3(seq15)
--   N:  N1(seq4 anxious) N2(seq14 angry) N3(seq16 sad)  -- matches pack N1/N3 threshold labels
--   H:  H1(seq6)  H2(seq12) H3(seq18)
--   Lon: Lon1(seq11)   hap: hap1(seq23)  -- single-item dims -> ordinal 1
--
-- Response scale: 0-10 numeric-endpoints. Each item has its own endpoint
-- anchor_min / anchor_max (pack §1.3 "Anclajes" column): most items
-- never/always (0/10), the M/R "to what extent" items not at all/completely,
-- and the H1/H3 health items terrible/excellent. These per-block es-CO endpoint
-- labels are carried in the CTE VALUES below so the seed is the faithful source
-- of truth for the UI (UI-SPEC §6.9 renders anchor_min/anchor_max from the seed,
-- NOT hardcoded by instrument code — FOUND-05).
--
-- [GAP-ITEM-ANCHOR-COLUMNS] RESOLVED (02-13): migration 015 added
-- `item.anchor_min text` + `item.anchor_max text` (nullable). This seed now
-- PERSISTS the per-block 0-10 endpoint labels as DATA so the numeric-endpoints
-- UI bridge (lib/questionnaire/response-scales.ts, UI-SPEC §6.9) can render them
-- from the item row instead of an instrument-code literal (FOUND-05). Only the
-- numeric-endpoints instrument (PERMA) populates them; labeled-rows/hexagon
-- instruments leave them NULL.
--
-- Wording: official es Tarragona/Kern v2 translation (peggykern.org), base for
-- es-CO. Tuteo cordial colombiano (pack §2.2 decision: convert "usted" -> "tu");
-- E3 + A3 + M2 + hap + H3 adopt the documented es-CO reformulations (pack §2.2 /
-- Chaves et al. 2023). Lexical adjustments are anticipated; final wording awaits
-- the Colombia cognitive pilot (pack §8) — flagged but does not block this seed.
--
-- Anchors:
--   - implementation_packs/PERMA-Profiler_..._Consolidado.md §1.3 (23 items EN +
--     es + endpoint anchors + dims + scoring), §2.2 (es-CO lexical mods).
--   - 02-UI-SPEC.md §6.9 (numeric-endpoints, per-block anchors from seed).
--   - 02-CONTEXT.md D-A.5 (item order), UX-05 (360px fit).
--   - db/seeds/instruments/{BFI-2-S,TwIVI}/items.sql (idempotent CTE pattern).

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'PERMA-Profiler'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
  LIMIT 1
),
-- seq | dim | label | es-CO stem | anchor_min | anchor_max
-- anchor_min / anchor_max are the per-block 0-10 endpoint labels (pack §1.3),
-- now persisted to item.anchor_min/anchor_max (migration 015) so the UI bridge
-- reads them as DATA (UI-SPEC §6.9, FOUND-05).
items(seq, dim, label, stem, anchor_min, anchor_max) AS (
  VALUES
    ( 1, 'A',   'A1',  '¿Qué parte del tiempo sientes que estás avanzando hacia el logro de tus metas?',                 'nunca',      'siempre'),
    ( 2, 'E',   'E1',  '¿Con qué frecuencia te concentras profundamente en lo que estás haciendo?',                       'nunca',      'siempre'),
    ( 3, 'P',   'P1',  'En general, ¿con qué frecuencia te sientes alegre?',                                              'nunca',      'siempre'),
    ( 4, 'N',   'N1',  'En general, ¿qué tan seguido te sientes ansioso/a?',                                              'nunca',      'siempre'),
    ( 5, 'A',   'A2',  '¿Con qué frecuencia alcanzas metas importantes que te has propuesto?',                            'nunca',      'siempre'),
    ( 6, 'H',   'H1',  'En general, ¿cómo dirías que es tu salud?',                                                       'pésima',     'excelente'),
    ( 7, 'M',   'M1',  'En general, ¿en qué medida llevas una vida con propósito y significado?',                         'para nada',  'completamente'),
    ( 8, 'R',   'R1',  '¿En qué medida recibes ayuda y apoyo de otras personas cuando lo necesitas?',                     'para nada',  'completamente'),
    ( 9, 'M',   'M2',  'En general, ¿en qué medida sientes que lo que haces vale la pena?',                               'para nada',  'completamente'),
    (10, 'E',   'E2',  'En general, ¿en qué medida te sientes entusiasmado/a e interesado/a en las cosas?',               'para nada',  'completamente'),
    (11, 'Lon', 'Lon', '¿Qué tan solo/a te sientes en tu vida diaria?',                                                  'para nada',  'completamente'),
    (12, 'H',   'H2',  '¿Qué tan satisfecho/a estás con tu salud física actual?',                                         'para nada',  'completamente'),
    (13, 'P',   'P2',  'En general, ¿con qué frecuencia te sientes positivo/a?',                                          'nunca',      'siempre'),
    (14, 'N',   'N2',  'En general, ¿qué tan seguido te sientes enojado/a?',                                              'nunca',      'siempre'),
    (15, 'A',   'A3',  '¿Con qué frecuencia logras sacar adelante tus responsabilidades del día a día?',                  'nunca',      'siempre'),
    (16, 'N',   'N3',  'En general, ¿qué tan seguido te sientes triste?',                                                'nunca',      'siempre'),
    (17, 'E',   'E3',  '¿Con qué frecuencia se te pasa el tiempo muy rápido cuando haces algo que disfrutas?',            'nunca',      'siempre'),
    (18, 'H',   'H3',  'Comparado/a con otras personas de tu misma edad, ¿cómo es tu salud?',                            'pésima',     'excelente'),
    (19, 'R',   'R2',  '¿Hasta qué punto te has sentido amado/a?',                                                        'para nada',  'completamente'),
    (20, 'M',   'M3',  'En general, ¿hasta qué punto sientes que sigues una dirección con sentido en tu vida?',           'para nada',  'completamente'),
    (21, 'R',   'R3',  '¿Qué tan satisfecho/a estás con tus relaciones personales?',                                      'para nada',  'completamente'),
    (22, 'P',   'P3',  'En general, ¿cuán satisfecho/a te sientes?',                                                      'para nada',  'completamente'),
    (23, 'hap', 'hap', 'Considerando todo en conjunto, ¿qué tan feliz dirías que eres?',                                  'para nada',  'completamente')
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key, anchor_min, anchor_max)
SELECT v.version_id, items.seq, items.stem, items.dim, false, items.anchor_min, items.anchor_max
FROM v
CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1
  FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;
