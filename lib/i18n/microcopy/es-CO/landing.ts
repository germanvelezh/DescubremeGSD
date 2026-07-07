/**
 * Landing page microcopy (es-CO) — DescubreMe.
 *
 * Ola 1 (HANDOFF_UI §3, redesign): copy from MICROCOPY_ES-CO_SIGNOFF v1.1 §2
 * (firmado 2026-07-01). Replaces the Fase-1 landing copy. The old
 * MC_LANDING_HONEST_LINE ("No necesitas crear cuenta") is retired — it was FALSE
 * under ADR-029 (signup-first funnel); §2 replaces it with the honesty chip.
 *
 * Tono: invitacion clara, sin urgencia, sin promesas (UX-02).
 *
 * Pin E2E (no acentuar / no cambiar el valor): MC_LANDING_CTA_PRIMARY = "Empezar
 * gratis" -> /Empezar gratis/i. La flecha "→" es decorativa (<span aria-hidden>).
 *
 * Anchors:
 * - MICROCOPY_ES-CO_SIGNOFF_v1.1 §2.
 * - auditoria-ux-ui/prototipo-rediseno-free-v2.html (pantalla "1 · Landing").
 * - CLAUDE.md §13 (tuteo cordial es-CO).
 */
export const landing = {
  MC_LANDING_EYEBROW: "Autoconocimiento con rigor",
  MC_LANDING_HEADLINE: "Conoce a fondo cómo funcionas, sin etiquetas.",
  MC_LANDING_SUBHEAD:
    "Un primer mapa de tu personalidad, tus intereses, lo que valoras y tu bienestar. En 12-18 minutos, en lenguaje claro.",
  MC_LANDING_CTA_PRIMARY: "Empezar gratis",
  MC_LANDING_MICRO: "Gratis. Sin tarjeta. Sin trucos.",
  MC_LANDING_HONESTY_CHIP: "Sin urgencia, sin contadores, sin letra pequeña",
  MC_LANDING_FOOTER:
    "Instrumentos validados · Resultados que reconoces como tuyos, no veredictos",
} as const;

export type LandingMicrocopyKey = keyof typeof landing;
