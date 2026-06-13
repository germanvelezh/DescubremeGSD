-- PERMA-Profiler dimension×band narrative seed — DescubreMe Phase 2 Wave 4
-- (Plan 02-11).
--
-- Inserts 27 dimension×band narrative rows (9 dimensions × 3 bands) for the Free
-- PERMA report (Layer 2/3). slot='dimension_band'; dimension = the scoring
-- dimension code (P/E/R/M/A/N/H/Lon/hap, matching scoring-rule.sql + the bands
-- the loader keys on); band ∈ {BAJO,MEDIO,ALTO}. template_text = the official
-- es-CO interpretation (pack §5, "tú" cordial colombiano, ≤80 palabras,
-- descriptivo no determinista).
--
-- D-D.4 (HARD GATE — soft non-clinical language): the negative-emotion (N) and
-- loneliness (Lon) ALTO texts are the CARE messages. They are framed
-- descriptively, route to the Colombian help lines (Línea 106 / Línea 192
-- opción 4), and carry NO clinical labels. Verbatim §5 used the bare clinical
-- noun in N-ALTO, H-BAJO and Lon-ALTO; the COMPL-18 / 02-02 clinical lint
-- (tests/lint/prohibited-phrases.ts) flags that bare noun with no negation
-- lookbehind, so those clauses are rephrased to the equivalent non-clinical
-- wording ("no es una evaluación clínica" / "no es una medida médica") — same
-- precedent as the BFI-2-S NEG-ALTO seed, which softened it to "no significa
-- que algo esté mal". This is an IMPLEMENTATION rephrase of pack §5 (provenance:
-- pack content, lint-conformance only), NOT new research. The meaning, the
-- help-line routing and the ≤80-word soft tone are preserved.
--
-- N INVERSION (semantics): high raw N = band ALTO = "mucha emoción negativa"
-- (the care text). The baremo band_convention encodes the inverted cuts so the
-- loader resolves ALTO for a high-raw N; this seed supplies the text the loader
-- then serves. Lon is single-item, same inverted convention.
--
-- H (salud física percibida): scored as its own dimension and rendered as a bar,
-- so its narrative IS seeded here (the plan's Task-2 dimension list omitted H;
-- seeding it avoids a missing-text stub on a bar the report shows). H is NOT a
-- medical indicator — the texts say so explicitly (soft, non-clinical).
--
-- SCHEMA DEPENDENCY [GAP-NARRATIVE-DIMBAND-SCHEMA]: the base narrative_template
-- table (migration 002) has riasec_code NOT NULL, NO dimension/band columns, and
-- a slot CHECK that excludes 'dimension_band'. This seed targets the INTENDED
-- schema (dimension text + band text + extended slot CHECK) and will FAIL on a
-- fresh `supabase db reset` until the 02-13 pre-seed migration adds them — the
-- SAME blocker the BFI-2-S (02-09) and TwIVI (02-10) dimband seeds carry. Logged
-- to deferred-items.md; flagged in 02-11-SUMMARY.
--
-- IDEMPOTENT: DELETE of (version 1.0, lang es-CO, slot 'dimension_band',
-- dimension ∈ PERMA dimension codes) before INSERT (mirrors the BFI/RIASEC
-- delete-then-insert; scoped so it never touches BFI/TwIVI/RIASEC rows — PERMA
-- codes P/E/R/M/A/N/H/Lon/hap collide with none of them).
--
-- Anchors:
--   - implementation_packs/PERMA-Profiler_..._Consolidado.md §5 (es-CO texts).
--   - 02-CONTEXT.md D-C.4 (narrative dimension×band), D-D.4 (soft language).
--   - 02-UI-SPEC.md §8.2 (bandas descriptivas, no juicio sobre el bienestar).
--   - lib/report/narrative-loader.ts (dimension_band query path).
--   - db/seeds/narrative-templates/BFI-2-S/seed.sql (delete-then-insert pattern).

BEGIN;

DELETE FROM public.narrative_template
WHERE version = '1.0'
  AND lang = 'es-CO'
  AND slot = 'dimension_band'
  AND dimension IN ('P', 'E', 'R', 'M', 'A', 'N', 'H', 'Lon', 'hap');

INSERT INTO public.narrative_template (version, lang, slot, dimension, band, template_text)
VALUES
-- ===================== Emociones positivas (P) =====================
  ('1.0', 'es-CO', 'dimension_band', 'P', 'BAJO', 'Por estos días, las emociones cálidas como la alegría o la calma no aparecen tan seguido en tu vida cotidiana. Esto puede pasar en temporadas de mucha exigencia, cambios o cansancio. Si te interesa, podrías observar qué pequeñas situaciones te conectaron con algo de calma esta semana, así sea por un momento.'),
  ('1.0', 'es-CO', 'dimension_band', 'P', 'MEDIO', 'Las emociones positivas aparecen en tu vida de forma intermitente. A veces te sientes contento o tranquilo, otras veces el día se siente más plano. Te invitamos a notar qué actividades, personas o lugares suelen acompañar tus mejores momentos.'),
  ('1.0', 'es-CO', 'dimension_band', 'P', 'ALTO', 'Tiendes a experimentar alegría, contentamiento y emociones cálidas con frecuencia. Eso no significa que nunca sientas momentos bajos, sino que tu línea base afectiva es más bien luminosa. Podrías reflexionar qué hábitos cotidianos están sosteniendo ese estado para cuidarlos.'),
-- ===================== Compromiso / Engagement (E) =====================
  ('1.0', 'es-CO', 'dimension_band', 'E', 'BAJO', 'Por ahora te cuesta encontrar actividades que te enganchen profundamente o en las que se te pase el tiempo sin darte cuenta. Eso puede pasar cuando la rutina se vuelve repetitiva. ¿Hubo alguna actividad en tu pasado que solías disfrutar a fondo y que valdría la pena explorar de nuevo?'),
  ('1.0', 'es-CO', 'dimension_band', 'E', 'MEDIO', 'Hay momentos en los que te sumerges en lo que haces y otros en los que la atención se dispersa. Es un patrón común en adultos con muchas demandas en paralelo. Una posible reflexión: ¿cuáles son los espacios de tu semana donde sí te concentras y disfrutas?'),
  ('1.0', 'es-CO', 'dimension_band', 'E', 'ALTO', 'Tiendes a involucrarte de lleno en lo que haces y con frecuencia se te pasa el tiempo sin sentirlo. Esa capacidad de concentración profunda es un recurso valioso. Te puede ser útil identificar qué actividades específicas activan ese estado, para acceder a él más conscientemente.'),
-- ===================== Relaciones (R) =====================
  ('1.0', 'es-CO', 'dimension_band', 'R', 'BAJO', 'Las relaciones cercanas no se sienten tan nutritivas o disponibles en este momento de tu vida. Puede ser una etapa de transición, distancia o cambios en tu círculo. ¿Hay alguna persona con la que valdría la pena retomar contacto, o un espacio donde podrías conocer gente afín?'),
  ('1.0', 'es-CO', 'dimension_band', 'R', 'MEDIO', 'Tienes relaciones que te sostienen, aunque quizá no siempre sientes que recibes el apoyo o cercanía que quisieras. Esto es habitual en la vida adulta. Podrías preguntarte qué vínculo te gustaría profundizar y qué primer paso pequeño sería posible esta semana.'),
  ('1.0', 'es-CO', 'dimension_band', 'R', 'ALTO', 'Sientes que las personas importantes en tu vida te quieren y te respaldan, y eso se nota en cómo describes tus relaciones. Ese tejido social es uno de los factores que más sostienen el bienestar a largo plazo. Vale la pena reconocer y cuidar a quienes están ahí.'),
-- ===================== Sentido / Meaning (M) =====================
  ('1.0', 'es-CO', 'dimension_band', 'M', 'BAJO', 'En este momento te cuesta sentir que lo que haces día a día tiene una dirección clara o un sentido más grande. Esa búsqueda es parte de muchas etapas adultas y no significa que algo esté "mal". Podrías explorar qué actividades, causas o personas te conectan con algo que sí te importa.'),
  ('1.0', 'es-CO', 'dimension_band', 'M', 'MEDIO', 'Tienes una idea general de hacia dónde va tu vida y de lo que te importa, pero hay momentos en los que esa claridad se difumina. Es un terreno donde casi todos seguimos trabajando. Una pregunta útil: ¿qué cosa concreta hiciste este mes que sentiste valiosa por sí misma?'),
  ('1.0', 'es-CO', 'dimension_band', 'M', 'ALTO', 'Tiendes a sentir que tu vida tiene propósito y que lo que haces aporta a algo que te importa. Esa sensación de dirección es un recurso poderoso para sostener decisiones difíciles. Vale la pena nombrar de vez en cuando, en tus propias palabras, qué es eso que da sentido a tu día a día.'),
-- ===================== Logro / Accomplishment (A) =====================
  ('1.0', 'es-CO', 'dimension_band', 'A', 'BAJO', 'Sientes que avanzar hacia tus metas o sacar adelante tus responsabilidades te está costando más de lo que quisieras. Eso suele intensificarse en temporadas de carga alta o cuando las metas no están bien definidas. ¿Hay una meta pequeña y concreta en la que podrías ver progreso esta semana?'),
  ('1.0', 'es-CO', 'dimension_band', 'A', 'MEDIO', 'Cumples con tus responsabilidades y avanzas en lo que te propones, aunque no siempre con la fluidez que te gustaría. Es un patrón común y saludable. Te puede servir reconocer un logro reciente, por pequeño que parezca, antes de pasar a la siguiente meta.'),
  ('1.0', 'es-CO', 'dimension_band', 'A', 'ALTO', 'Tiendes a sentir que avanzas hacia tus metas y que puedes manejar lo que el día te exige. Esa sensación de eficacia personal alimenta otros ámbitos del bienestar. Una buena práctica es no perder de vista por qué esas metas te importan, no solo cumplirlas.'),
-- ===================== Salud física percibida (H) — no es indicador médico =====================
  ('1.0', 'es-CO', 'dimension_band', 'H', 'BAJO', 'Tu percepción de tu salud física hoy no es la que quisieras tener. Esto es una percepción subjetiva, no una medida médica, y puede reflejar cansancio, dolor, sedentarismo o malestar general. Si esta sensación es persistente, conversarlo con un profesional de la salud puede ser útil.'),
  ('1.0', 'es-CO', 'dimension_band', 'H', 'MEDIO', 'Sientes que tu salud está en un punto medio: ni excelente ni preocupante. En esa franja, los hábitos cotidianos (sueño, movimiento, alimentación, descanso) suelen marcar la diferencia. ¿Cuál de esos hábitos sientes que más se te ha descuidado últimamente?'),
  ('1.0', 'es-CO', 'dimension_band', 'H', 'ALTO', 'Te percibes en buena forma física y sientes satisfacción con tu cuerpo y tu energía cotidiana. Ese capital de salud subjetiva está vinculado con casi todas las demás dimensiones del bienestar. Cuidarlo activamente, no darlo por hecho, es probablemente la mejor inversión.'),
-- ===================== Emoción negativa (N) — reporte invertido, cuidado no etiqueta =====================
  ('1.0', 'es-CO', 'dimension_band', 'N', 'BAJO', 'En tu día a día no sientes con frecuencia tristeza, enojo o ansiedad intensa. Eso habla de una buena regulación emocional en este momento. Vale la pena recordar que sentir estas emociones de vez en cuando es parte normal de la vida humana, no algo a evitar siempre.'),
  ('1.0', 'es-CO', 'dimension_band', 'N', 'MEDIO', 'Como la mayoría de las personas adultas, experimentas tristeza, enojo o ansiedad con cierta frecuencia, sin que dominen tu vida cotidiana. Notar qué situaciones suelen disparar cada una puede ayudarte a entenderte mejor.'),
  ('1.0', 'es-CO', 'dimension_band', 'N', 'ALTO', 'Por estos días, sentimientos como tristeza, ansiedad o enojo aparecen con bastante frecuencia. Esto no es una evaluación clínica: este test no mide salud mental. Si esta intensidad lleva semanas o interfiere con tu vida cotidiana, conversarlo con un profesional puede ser un buen paso. En Colombia puedes llamar a la Línea 106 (Bogotá) o a la Línea 192 opción 4 (MinSalud).'),
-- ===================== Soledad (Lon) — reporte invertido =====================
  ('1.0', 'es-CO', 'dimension_band', 'Lon', 'BAJO', 'En tu día a día rara vez te sientes solo o sola. Mantener la calidad de tus relaciones cercanas es probablemente uno de los factores que sostienen esa sensación.'),
  ('1.0', 'es-CO', 'dimension_band', 'Lon', 'MEDIO', 'A veces te sientes acompañado y otras veces no tanto. Es un patrón muy humano, especialmente en ciudades grandes y en etapas de transición. ¿Hay un encuentro concreto, así sea breve, que podrías agendar esta semana?'),
  ('1.0', 'es-CO', 'dimension_band', 'Lon', 'ALTO', 'Estás sintiendo soledad con bastante frecuencia. Esta sensación no equivale a estar físicamente solo: se puede sentir incluso rodeado de gente. Si lleva tiempo, vale la pena explorar qué relaciones te gustaría profundizar y considerar conversarlo con alguien de confianza o con un profesional. En Colombia, la Línea 106 y la Línea 192 opción 4 están disponibles.'),
-- ===================== Felicidad global (hap) =====================
  ('1.0', 'es-CO', 'dimension_band', 'hap', 'BAJO', 'Si tuvieras que resumir cómo estás, dirías que en general la felicidad no es la palabra que mejor te describe en este momento. Esa lectura global puede pesar más que cualquier subescala. Es un buen punto de partida para preguntarte qué dimensión específica (relaciones, sentido, salud) sientes que más necesita atención.'),
  ('1.0', 'es-CO', 'dimension_band', 'hap', 'MEDIO', 'Te describes como una persona moderadamente feliz, en línea con la mayoría de adultos en evaluaciones de este tipo. Esa lectura suele moverse con el contexto vital. ¿Qué cambio sutil notarías si la felicidad subiera un escalón?'),
  ('1.0', 'es-CO', 'dimension_band', 'hap', 'ALTO', 'Cuando lo miras en conjunto, dirías que eres una persona feliz. Esa autopercepción global es uno de los factores más estables del bienestar futuro. Vale la pena reconocer qué prácticas, vínculos y decisiones la sostienen.');

COMMIT;
