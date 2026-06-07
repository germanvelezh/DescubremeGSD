/**
 * Microcopy es-CO — Survey de feedback post-reporte (D3.4).
 *
 * Placeholder por Claude Code. Cowork override pre-deploy via
 * [GAP-MICROCOPY-FASE1].
 *
 * Reglas: tono UX-02 (sin urgencia), pregunta abierta + opcional, sin
 * gamificacion.
 */

export const survey = {
  MC_SURVEY_PROMPT: "Que te parecio tu reporte?",
  MC_SURVEY_STARS_HELPER: "Marca de 1 a 5 estrellas.",
  MC_SURVEY_TEXTFIELD_HINT: "Contanos en una o dos frases (opcional)",
  MC_SURVEY_SUBMIT: "Enviar",
  MC_SURVEY_THANKS: "Gracias por tu feedback.",
  MC_SURVEY_STAR_LABEL_1: "1 estrella",
  MC_SURVEY_STAR_LABEL_2: "2 estrellas",
  MC_SURVEY_STAR_LABEL_3: "3 estrellas",
  MC_SURVEY_STAR_LABEL_4: "4 estrellas",
  MC_SURVEY_STAR_LABEL_5: "5 estrellas",
} as const;

export type SurveyMicrocopyKey = keyof typeof survey;
