/**
 * Microcopy es-CO — Waitlist opt-in post-reporte (D3.4, FREE-X).
 *
 * Placeholder por Claude Code. Cowork override pre-deploy via
 * [GAP-MICROCOPY-FASE1].
 *
 * Reglas: opt-in publico, tono calmo sin urgencia.
 */

export const waitlist = {
  MC_WAITLIST_PROMPT:
    "Pronto vas a poder explorar otras dimensiones (personalidad, valores, sentido).",
  MC_WAITLIST_CHECKBOX: "Avisame cuando este listo",
  MC_WAITLIST_CONFIRMATION: "Listo, te avisamos.",
  MC_WAITLIST_ERROR: "No pudimos guardarte. Intenta de nuevo en un momento.",
} as const;

export type WaitlistMicrocopyKey = keyof typeof waitlist;
