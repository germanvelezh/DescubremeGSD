-- TwIVI 20 items es-CO seed (PLACEHOLDER stems) — Phase 2 Wave 4 (Plan 02-10).
--
-- 20 TwIVI items: 10 classic Schwartz basic values × 2 items each, 6-pt Likert
-- (1-6, asymmetric labeled-rows — no neutral center; the anchors are rendered by
-- lib/questionnaire/response-scales.ts, the ONE code↔anchors bridge, FOUND-05).
--
-- [GAP-TWIVI-ITEMS-ANCHORS-ES-CO] P1 (Owner Cowork) — DEPLOY BLOCKER, NOT a plan
-- blocker. No pack carries the 20 TwIVI item stems, the 6-pt es-CO Likert anchors,
-- or the confirmed item→basic-value assignment in es-CO. The stems below are
-- CLEARLY-MARKED PLACEHOLDERS (each row tagged) that let the full machinery
-- (version + value_map/hov_map + scoring_rule + narrative + MRAT fixture) exist
-- and typecheck. The FUNCTIONAL values test + its E2E are gated on Cowork
-- delivery — block the values-test DEPLOY, not this seed.
--
-- `dimension` carries the basic-value CODE (SD/ST/HE/AC/PO/SE/CO/TR/BE/UN). The
-- scorer (lib/scoring/score-session.ts step 6) synthesizes each item's scoring
-- key as <dimension><ordinal-within-dimension> by sorting that value's items by
-- sequence_number → SD1/SD2, ST1/ST2, ... The value_map/hov_map in
-- instrument-version.sql use the SAME <value><ordinal> keys.
--
-- Codes are TwIVI-NATIVE basic-value codes, NOT PVQ-RR refined-value codes
-- (D-E2.1: values has NO Free→Paid code reuse — TwIVI forfeits item-continuity
-- by design; the Paid PVQ-RR re-administers values).
--
-- reverse_key = FALSE for all 20: TwIVI is direct-keyed (pack §6.6; MRAT
-- centering handles within-person scale-use, no reverse items).
--
-- Items are interleaved so the two items of the same value are not adjacent
-- (acquiescence control, mirroring the BFI native-order spacing). PLACEHOLDER
-- order — Cowork sets the validated presentation order on delivery.
--
-- 10 basic values (Schwartz): SD Self-Direction, ST Stimulation, HE Hedonism,
-- AC Achievement, PO Power, SE Security, CO Conformity, TR Tradition,
-- BE Benevolence, UN Universalism. HOV partition in instrument-version.sql.
--
-- Anchors:
--   - implementation_packs/PVQ-RR_..._Consolidado.md §6.6 (TwIVI: 10 basic values, 6-pt).
--   - 02-CONTEXT.md D-GATE.1, D-E2.1.
--   - db/seeds/instruments/BFI-2-S/items.sql (idempotent pattern, interleaving).

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
    -- seq | value | PLACEHOLDER es-CO stem  [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]
    ( 1, 'SD', 'PLACEHOLDER — Self-Direction item 1 (pensar y actuar con autonomía). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 2, 'AC', 'PLACEHOLDER — Achievement item 1 (lograr según estándares sociales). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 3, 'SE', 'PLACEHOLDER — Security item 1 (estabilidad y seguridad personal). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 4, 'BE', 'PLACEHOLDER — Benevolence item 1 (cuidar a personas cercanas). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 5, 'ST', 'PLACEHOLDER — Stimulation item 1 (buscar novedad y desafío). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 6, 'PO', 'PLACEHOLDER — Power item 1 (control de recursos y estatus). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 7, 'CO', 'PLACEHOLDER — Conformity item 1 (cumplir normas y expectativas). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 8, 'UN', 'PLACEHOLDER — Universalism item 1 (justicia y cuidado de todos). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    ( 9, 'HE', 'PLACEHOLDER — Hedonism item 1 (placer y disfrute personal). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (10, 'TR', 'PLACEHOLDER — Tradition item 1 (respeto por costumbres heredadas). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (11, 'SD', 'PLACEHOLDER — Self-Direction item 2 (elegir metas propias). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (12, 'AC', 'PLACEHOLDER — Achievement item 2 (demostrar competencia). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (13, 'SE', 'PLACEHOLDER — Security item 2 (orden y armonía social). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (14, 'BE', 'PLACEHOLDER — Benevolence item 2 (ser leal y confiable). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (15, 'ST', 'PLACEHOLDER — Stimulation item 2 (vida variada y emocionante). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (16, 'PO', 'PLACEHOLDER — Power item 2 (autoridad e influencia). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (17, 'CO', 'PLACEHOLDER — Conformity item 2 (evitar molestar a otros). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (18, 'UN', 'PLACEHOLDER — Universalism item 2 (proteger la naturaleza). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (19, 'HE', 'PLACEHOLDER — Hedonism item 2 (aprovechar las oportunidades de placer). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]'),
    (20, 'TR', 'PLACEHOLDER — Tradition item 2 (mantener creencias religiosas o familiares). [GAP-TWIVI-ITEMS-ANCHORS-ES-CO]')
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
