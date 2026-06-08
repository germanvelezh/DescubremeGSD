/**
 * Microcopy es-CO — Waitlist opt-in post-reporte (D3.4, FREE-X).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Opt-in publico, tono calmo sin urgencia.
 *
 * Pin E2E (no acentuar / no cambiar):
 *   "Avisame cuando este listo" -> /Avisame cuando este listo/i (NO "Avísame...esté").
 */

export const waitlist = {
  MC_WAITLIST_PROMPT:
    "Pronto vas a poder explorar otras dimensiones: personalidad, valores y sentido.",
  MC_WAITLIST_CHECKBOX: "Avisame cuando este listo",
  MC_WAITLIST_CONFIRMATION: "Listo, te avisamos.",
  MC_WAITLIST_ERROR:
    "No pudimos sumarte a la lista. Intentá de nuevo en un momento.",
} as const;

export type WaitlistMicrocopyKey = keyof typeof waitlist;
