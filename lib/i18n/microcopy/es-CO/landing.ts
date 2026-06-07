/**
 * Landing page microcopy (es-CO) — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * Placeholders per UI-SPEC §7.1. Cowork redacta el texto final via
 * `[GAP-MICROCOPY-FASE1]`; estas cadenas son funcionales para el E2E
 * pero NO son producto definitivo.
 *
 * TODO(cowork): microcopy final pendiente — placeholder funcional.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.1, §8.4.
 * - CLAUDE.md §13 (tuteo cordial es-CO).
 */
export const landing = {
  MC_LANDING_HEADLINE: "Conocete a fondo, sin etiquetas.",
  MC_LANDING_SUBHEAD:
    "Vamos a empezar con un primer mapa de tus intereses.",
  MC_LANDING_CTA_PRIMARY: "Empezar gratis",
  MC_LANDING_HONEST_LINE:
    "Toma 10-12 minutos. Sin crear cuenta para empezar.",
} as const;

export type LandingMicrocopyKey = keyof typeof landing;
