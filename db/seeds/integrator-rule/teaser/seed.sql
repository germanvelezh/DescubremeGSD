-- integrator_rule teaser seed — DescubreMe Phase 2 Wave 5 (Plan 02-12 Task 2).
--
-- Seeds the MECHANISM for the integrated teaser (D-B.1, FREE-12/13): ~14
-- idempotent `tier='teaser'` rows that the declarative evaluator
-- (lib/integrator/teaser.ts) reads to synthesize 4-6 phrases + 1-2 "pincelada"
-- crosses from the user's 4 computed_score bands.
--
-- CONTENT: MIXED — leer con cuidado, las dos mitades NO tienen el mismo estatus.
--
--   * Las 14 filas ORIGINALES (bandas ALTO, mas un MEDIO+MEDIO) siguen siendo
--     PLACEHOLDER band-parameterizado, a la espera de copy final de Cowork.
--   * Las 12 filas de COBERTURA MEDIA/BAJA (marcadas abajo con su propio
--     encabezado) son COPY FINAL entregado por Cowork el 2026-07-29, verificado
--     en longitud (134-163 chars), estructura y registro es-CO.
--
-- Esas 12 cierran [GAP-TEASER-CROSS-TEMPLATES-ES-CO] y [GAP-TEASER-COBERTURA-BANDAS].
-- El defecto que cerraban no era "faltan frases" sino que las CONDICIONES de las
-- 14 originales cubrian casi solo ALTO: un perfil todo-MEDIO disparaba 3 frases
-- (bajo el piso de 4) y uno todo-BAJO solo 1. Ahora las 12 celdas de frase simple
-- (4 instrumentos x 3 bandas) estan completas.
--
-- TODO template_text, de las dos mitades, usa lenguaje de HIPOTESIS ("esto puede
-- sugerir", "suele", "tiende a" — NUNCA "eres", NUNCA una afirmacion determinista
-- de carrera o clinica) y pasa el lint 02-02 de anti-determinismo
-- (tests/lint/prohibited-phrases.test.ts escanea db/seeds/integrator-rule/**).
--
-- BANDA BAJA = JERARQUIA INTRA-PERSONA, NO CARENCIA. Las bandas son relativas al
-- propio perfil del usuario ("lo mas bajo de TU perfil"), no a una poblacion. El
-- copy de banda baja dice "lugar mas discreto", "menos central", "poco marcado",
-- "aun explorando" — nunca "tienes poco de esto". Cualquier fila nueva de banda
-- baja debe respetar ese encuadre.
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
      'Tu interés por explorar y crear suele ocupar un lugar importante en lo que te mueve; esto puede sugerir que disfrutas espacios con margen para indagar.',
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
      'Entre tus prioridades suele pesar la autonomía para elegir tu propio camino; esto puede sugerir que valoras decidir desde lo que sientes propio.',
      'teaser_phrase_valores_alto',
      '["TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"ALTO"}]}',
      'Tu sentido de bienestar suele apoyarse en los vínculos y en lo que te da significado; esto puede sugerir que te nutren las relaciones cercanas.',
      'teaser_phrase_bienestar_alto',
      '["PERMA-Profiler"]'
    ),
    -- MEDIO/BAJO band variants so a phrase exists for every band of every dim ----
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"ONET-IP-SF","band":"MEDIO"}]}',
      'Tus intereses se reparten de forma equilibrada entre varias áreas; esto puede sugerir que te sientes cómodo combinando distintos tipos de actividad.',
      'teaser_phrase_intereses_medio',
      '["ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"MEDIO"}]}',
      'En tu manera de ser conviven la apertura y la rutina según el momento; esto puede sugerir que te adaptas más que encasillarte en un solo estilo.',
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
      'Hoy tu bienestar parece pedir más cuidado en algunas áreas; esto puede sugerir que vale la pena darte espacios para lo que te recarga.',
      'teaser_phrase_bienestar_bajo',
      '["PERMA-Profiler"]'
    ),
    -- ---- Cross "pincelada" rules (consume >= 2 instruments -> classified cross) ----
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"ALTO"},{"code":"ONET-IP-SF","band":"ALTO"}]}',
      'Tu apertura a lo nuevo y tu interés por explorar suelen ir de la mano; esto puede sugerir que los entornos con espacio para crear te resultan especialmente afines.',
      'teaser_cross_apertura_intereses',
      '["BFI-2-S","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"ALTO"},{"code":"ONET-IP-SF","band":"ALTO"}]}',
      'La autonomía que priorizas y tu interés por explorar tienden a reforzarse; esto puede sugerir que te motivan los caminos que puedes recorrer a tu manera.',
      'teaser_cross_autonomia_intereses',
      '["TwIVI","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"ALTO"},{"code":"TwIVI","band":"ALTO"}]}',
      'Tu apertura y tu valoración de elegir libremente suelen acompañarse; esto puede sugerir que te sientes más pleno cuando hay margen para decidir.',
      'teaser_cross_apertura_valores',
      '["BFI-2-S","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"ALTO"},{"code":"TwIVI","band":"ALTO"}]}',
      'El significado que sostiene tu bienestar y lo que priorizas suelen conversar entre sí; esto puede sugerir que cuidar lo que valoras te da sentido.',
      'teaser_cross_bienestar_valores',
      '["PERMA-Profiler","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"ALTO"},{"code":"BFI-2-S","band":"ALTO"}]}',
      'Tu bienestar apoyado en vínculos y tu apertura suelen ir juntos; esto puede sugerir que las relaciones donde aprendes algo nuevo te resultan nutritivas.',
      'teaser_cross_bienestar_personalidad',
      '["PERMA-Profiler","BFI-2-S"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"ONET-IP-SF","band":"MEDIO"},{"code":"TwIVI","band":"MEDIO"}]}',
      'Tanto tus intereses como tus prioridades buscan equilibrio; esto puede sugerir que te sientes cómodo explorando sin cerrarte a una sola dirección.',
      'teaser_cross_equilibrio_intereses_valores',
      '["ONET-IP-SF","TwIVI"]'
    ),
    -- ---- Cobertura de banda MEDIA y BAJA — copy FINAL de Cowork (2026-07-29) ----
    -- Cierra [GAP-TEASER-CROSS-TEMPLATES-ES-CO] + [GAP-TEASER-COBERTURA-BANDAS].
    -- A diferencia de las 14 de arriba, este copy NO es placeholder: es el
    -- entregable de Cowork, verificado en longitud (134-163), estructura y registro.
    -- Frases simples: las 4 celdas que faltaban para completar 12 de 12
    -- (4 instrumentos x 3 bandas).
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"MEDIO"}]}',
      'Tu bienestar se ubica en un punto intermedio, con apoyos firmes y otros más variables; esto puede sugerir que hay margen para cuidar lo que te sostiene.',
      'teaser_phrase_bienestar_medio',
      '["PERMA-Profiler"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"ONET-IP-SF","band":"BAJO"}]}',
      'Tus intereses no marcan una dirección que sobresalga sobre el resto; esto puede sugerir que aún estás tanteando qué campos te atraen con más fuerza.',
      'teaser_phrase_intereses_bajo',
      '["ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"BAJO"}]}',
      'Dentro de tu manera de ser, algunos rasgos ocupan un lugar más discreto que otros; esto puede sugerir que no todos pesan igual en cómo te muestras.',
      'teaser_phrase_personalidad_bajo',
      '["BFI-2-S"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"BAJO"}]}',
      'Entre lo que valoras, algunas prioridades ocupan un lugar menos central; esto puede sugerir que orientas tus decisiones más por unas que por otras.',
      'teaser_phrase_prioridades_bajo',
      '["TwIVI"]'
    ),
    -- ---- Cruces para perfiles no-altos ----
    -- 5 x MEDIO+MEDIO (un par por cada combinacion que faltaba) y 3 x BAJO+BAJO.
    -- PERMA-Profiler queda FUERA de los cruces BAJO+BAJO por decision de contenido
    -- (Cowork): cruzar bienestar BAJO con otro BAJO compone una lectura de "todo
    -- esta bajo, incluido tu animo" que roza la alarma. El caso ya lo cubre con
    -- cuidado la frase simple teaser_phrase_bienestar_bajo, y con estos 3 pares un
    -- perfil todo-BAJO igual alcanza sus 2 cruces.
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"MEDIO"},{"code":"ONET-IP-SF","band":"MEDIO"}]}',
      'Tu manera de ser y tus intereses se mueven en un rango equilibrado; esto puede sugerir que te adaptas según lo que cada situación te pide.',
      'teaser_cross_personalidad_intereses_medio',
      '["BFI-2-S","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"MEDIO"},{"code":"TwIVI","band":"MEDIO"}]}',
      'Tu manera de ser y lo que valoras se ubican en un punto intermedio; esto puede sugerir que sueles sopesar el momento antes de inclinarte por un lado.',
      'teaser_cross_personalidad_prioridades_medio',
      '["BFI-2-S","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"MEDIO"},{"code":"ONET-IP-SF","band":"MEDIO"}]}',
      'Tus prioridades y tus intereses se mantienen en un rango medio; esto puede sugerir que aún combinas varias fuentes al orientar tu rumbo.',
      'teaser_cross_prioridades_intereses_medio',
      '["TwIVI","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"MEDIO"},{"code":"BFI-2-S","band":"MEDIO"}]}',
      'Tu bienestar y tu manera de ser se sostienen en un punto intermedio; esto puede sugerir que tienes una base estable desde la cual seguir explorándote.',
      'teaser_cross_bienestar_personalidad_medio',
      '["PERMA-Profiler","BFI-2-S"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"PERMA-Profiler","band":"MEDIO"},{"code":"TwIVI","band":"MEDIO"}]}',
      'Tu bienestar y lo que valoras se encuentran en un rango equilibrado; esto puede sugerir que tus decisiones se apoyan en un estado más bien estable.',
      'teaser_cross_bienestar_prioridades_medio',
      '["PERMA-Profiler","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"BAJO"},{"code":"ONET-IP-SF","band":"BAJO"}]}',
      'Ni tu manera de ser ni tus intereses marcan un extremo definido; esto puede sugerir que todavía se están perfilando y tomarán forma con el tiempo.',
      'teaser_cross_personalidad_intereses_bajo',
      '["BFI-2-S","ONET-IP-SF"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"BFI-2-S","band":"BAJO"},{"code":"TwIVI","band":"BAJO"}]}',
      'Tu manera de ser y lo que valoras se mantienen en tonos discretos; esto puede sugerir que te defines más por matices que por extremos.',
      'teaser_cross_personalidad_prioridades_bajo',
      '["BFI-2-S","TwIVI"]'
    ),
    (
      'teaser',
      '{"type":"all","predicates":[{"code":"TwIVI","band":"BAJO"},{"code":"ONET-IP-SF","band":"BAJO"}]}',
      'Tus intereses y tus prioridades ocupan un lugar poco marcado en tu perfil; esto puede sugerir que sigues explorando qué te atrae y qué pones primero.',
      'teaser_cross_prioridades_intereses_bajo',
      '["TwIVI","ONET-IP-SF"]'
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
