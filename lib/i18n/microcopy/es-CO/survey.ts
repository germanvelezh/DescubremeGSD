/**
 * Microcopy es-CO — Survey de feedback post-reporte (D3.4).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Tono UX-02 (sin urgencia). Pregunta abierta + texto opcional. Sin gamificacion.
 */

export const survey = {
  MC_SURVEY_PROMPT: "¿Qué te pareció tu reporte?",
  MC_SURVEY_STARS_HELPER: "Marcá de 1 a 5 estrellas.",
  MC_SURVEY_TEXTFIELD_HINT: "Contanos en una o dos frases (opcional)",
  MC_SURVEY_SUBMIT: "Enviar",
  MC_SURVEY_THANKS: "Gracias por tu comentario.",
  MC_SURVEY_STAR_LABEL_1: "1 estrella",
  MC_SURVEY_STAR_LABEL_2: "2 estrellas",
  MC_SURVEY_STAR_LABEL_3: "3 estrellas",
  MC_SURVEY_STAR_LABEL_4: "4 estrellas",
  MC_SURVEY_STAR_LABEL_5: "5 estrellas",
} as const;

export type SurveyMicrocopyKey = keyof typeof survey;
