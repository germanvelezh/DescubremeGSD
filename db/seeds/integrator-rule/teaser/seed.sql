-- integrator_rule teaser seed — DescubreMe Phase 2 Wave 5 (Plan 02-12 Task 2).
--
-- Seeds the MECHANISM for the integrated teaser (D-B.1, FREE-12/13): ~14
-- idempotent `tier='teaser'` rows that the declarative evaluator
-- (lib/integrator/teaser.ts) reads to synthesize 4-6 phrases + 1-2 "pincelada"
-- crosses from the user's 4 computed_score bands.
--
-- CONTENT IS PLACEHOLDER. The ~12-20 final es-CO cross templates are a genuine
-- Cowork content gap [GAP-TEASER-CROSS-TEMPLATES-ES-CO] (P1, Owner Cowork) —
-- no pack covers inter-instrument crosses. Every template_text below is a
-- band-parameterized PLACEHOLDER in HYPOTHESIS language ("esto puede sugerir",
-- "suele", "tiende a" — NEVER "eres", NEVER a deterministic career/clinical
-- claim). The placeholder copy passes the 02-02 clinical + anti-determinism
-- lint (tests/lint/prohibited-phrases.test.ts scans db/seeds/integrator-rule/**)
-- and renders via the evaluator's gapResult until Cowork delivers final copy.
--
-- Schema (migration 014):
--   tier, conditions(jsonb), template_id, template_text, requires_dimensions(jsonb),
--   lang, version. NO exploratory/provenance columns (Phase 3 anti-goal, D-B.1).
--
-- conditions jsonb shape (validated by TeaserConditionSchema):
--   { "type": "all"|"any", "predicates": [{ "code": <instrument>, "band": <ALTO|MEDIO|BAJO> }] }
-- requires_dimensions jsonb: array of instrument codes the rule consumes — drives
--   the D-F2.1/F2.2 quality-flag omission (a cross over a flagged score is dropped).
--
-- The 4 Free instrument codes (membership = product_stack 'free'):
--   ONET-IP-SF (intereses) | BFI-2-S (personalidad) | TwIVI (valores) | PERMA-Profiler (bienestar)
--
-- IDEMPOTENT: NOT EXISTS on (tier, template_id, lang, version). Safe to re-run.
--
-- Anchors:
--   - 02-CONTEXT.md D-B.1 (mechanism), D-B.2 (4-6 phrases + 1-2 crosses),
--     D-B.4 (band-parameterized templates), D-F2.1/F2.2 (omission).
--   - 02-RESEARCH.md § "integrator_rule Teaser" (table shape + evaluator).
--   - 02-PATTERNS.md § idempotent seed pattern (NOT EXISTS guard).
--   - supabase/migrations/014_visual_type_centering_integrator_rule.sql.

BEGIN;

INSERT INTO public.integrator_rule (tier, conditions, template_text, template_id, requires_dimensions, lang, version)
SELECT v.tier, v.conditions::jsonb, v.template_text, v.template_id, v.requires_dimensions::jsonb, 'es-CO', '1.0'
FROM (
  VALUES
    -- ---- Single-dimension synthesis phrases (one per instrument, ALTO band) ----
    -- [GAP-TEASER-CROSS-TEMPLATES-ES-CO] placeholder — hypothesis language.
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"ONET-IP-SF","band":"ALTO"}]}',
      'Tu interes por explorar y crear suele ocupar un lugar importante en lo que te mueve; esto puede sugerir que disfrutas espacios con margen para indagar.',
      'teaser_phrase_intereses_alto',
      '["ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"ALTO"}]}',
      'En tu forma de relacionarte con el mundo tiende a aparecer apertura a lo nuevo; esto puede sugerir que las ideas distintas te resultan estimulantes.',
      'teaser_phrase_personalidad_alto',
      '["BFI-2-S"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"ALTO"}]}',
      'Entre tus prioridades suele pesar la autonomia para elegir tu propio camino; esto puede sugerir que valoras decidir desde lo que sentis propio.',
      'teaser_phrase_valores_alto',
      '["TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"ALTO"}]}',
      'Tu sentido de bienestar suele apoyarse en los vinculos y en lo que te da significado; esto puede sugerir que te nutren las relaciones cercanas.',
      'teaser_phrase_bienestar_alto',
      '["PERMA-Profiler"]'
    ),
    -- MEDIO/BAJO band variants so a phrase exists for every band of every dim ----
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"ONET-IP-SF","band":"MEDIO"}]}',
      'Tus intereses se reparten de forma equilibrada entre varias areas; esto puede sugerir que te sentis comodo combinando distintos tipos de actividad.',
      'teaser_phrase_intereses_medio',
      '["ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"MEDIO"}]}',
      'En tu manera de ser conviven la apertura y la rutina segun el momento; esto puede sugerir que te adaptas mas que encasillarte en un solo estilo.',
      'teaser_phrase_personalidad_medio',
      '["BFI-2-S"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"MEDIO"}]}',
      'Tus prioridades buscan un balance entre lo propio y lo compartido; esto puede sugerir que sopesas varias cosas antes de inclinarte por una.',
      'teaser_phrase_valores_medio',
      '["TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"BAJO"}]}',
      'Hoy tu bienestar parece pedir mas cuidado en algunas areas; esto puede sugerir que vale la pena darte espacios para lo que te recarga.',
      'teaser_phrase_bienestar_bajo',
      '["PERMA-Profiler"]'
    ),
    -- ---- Cross "pincelada" rules (consume >= 2 instruments -> classified cross) ----
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"ALTO"},{"code":"ONET-IP-SF","band":"ALTO"}]}',
      'Tu apertura a lo nuevo y tu interes por explorar suelen ir de la mano; esto puede sugerir que los entornos con espacio para crear te resultan especialmente afines.',
      'teaser_cross_apertura_intereses',
      '["BFI-2-S","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"ALTO"},{"code":"ONET-IP-SF","band":"ALTO"}]}',
      'La autonomia que priorizas y tu interes por explorar tienden a reforzarse; esto puede sugerir que te motivan los caminos que podes recorrer a tu manera.',
      'teaser_cross_autonomia_intereses',
      '["TwIVI","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"ALTO"},{"code":"TwIVI","band":"ALTO"}]}',
      'Tu apertura y tu valoracion de elegir libremente suelen acompanarse; esto puede sugerir que te sentis mas pleno cuando hay margen para decidir.',
      'teaser_cross_apertura_valores',
      '["BFI-2-S","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"ALTO"},{"code":"TwIVI","band":"ALTO"}]}',
      'El significado que sostiene tu bienestar y lo que priorizas suelen conversar entre si; esto puede sugerir que cuidar lo que valoras te da sentido.',
      'teaser_cross_bienestar_valores',
      '["PERMA-Profiler","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"ALTO"},{"code":"BFI-2-S","band":"ALTO"}]}',
      'Tu bienestar apoyado en vinculos y tu apertura suelen ir juntos; esto puede sugerir que las relaciones donde aprendes algo nuevo te resultan nutritivas.',
      'teaser_cross_bienestar_personalidad',
      '["PERMA-Profiler","BFI-2-S"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"ONET-IP-SF","band":"MEDIO"},{"code":"TwIVI","band":"MEDIO"}]}',
      'Tanto tus intereses como tus prioridades buscan equilibrio; esto puede sugerir que te sentis comodo explorando sin cerrarte a una sola direccion.',
      'teaser_cross_equilibrio_intereses_valores',
      '["ONET-IP-SF","TwIVI"]'
    )
) AS v(tier, conditions, template_text, template_id, requires_dimensions)
WHERE NOT EXISTS (
  SELECT 1 FROM public.integrator_rule ir
  WHERE ir.tier = v.tier
    AND ir.template_id = v.template_id
    AND ir.lang = 'es-CO'
    AND ir.version = '1.0'
);

COMMIT;
