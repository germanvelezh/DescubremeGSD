/**
 * Landing page microcopy (es-CO) — DescubreMe.
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Tono: invitacion clara, sin urgencia, sin promesas (UX-02).
 *
 * Pin E2E (no acentuar / no cambiar): "Empezar gratis" -> /Empezar gratis/i.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.1, §8.4.
 * - CLAUDE.md §13 (tuteo cordial es-CO).
 */
export const landing = {
  MC_LANDING_HEADLINE: "Conocé a fondo cómo funcionás, sin etiquetas.",
  MC_LANDING_SUBHEAD:
    "Empezá con un primer mapa de tus intereses y de las actividades que te mueven.",
  MC_LANDING_CTA_PRIMARY: "Empezar gratis",
  MC_LANDING_HONEST_LINE:
    "Toma 10-12 minutos. No necesitás crear cuenta para empezar.",
} as const;

export type LandingMicrocopyKey = keyof typeof landing;
