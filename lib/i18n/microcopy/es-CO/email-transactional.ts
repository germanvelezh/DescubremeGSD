/**
 * Microcopy es-CO — Email transaccional "tu reporte esta listo" (D3.7).
 *
 * Phase 1 ships placeholder copy redactado por Claude Code. Cowork delivers
 * the final es-CO neutral version pre-deploy via [GAP-MICROCOPY-FASE1].
 *
 * Reglas D3.7:
 *  - Un solo email tras completion. NO recordatorios automaticos.
 *  - Plain HTML + 1 boton CTA. NO tracking pixel, NO imagenes.
 *  - Tono: calmo, profesional, sin urgencia (UX-02).
 */

export const emailTransactional = {
  MC_EMAIL_WELCOME_FROM_NAME: "DescubreMe",
  MC_EMAIL_WELCOME_SUBJECT: "Tu reporte de intereses esta listo",
  MC_EMAIL_WELCOME_GREETING: "Hola,",
  MC_EMAIL_WELCOME_BODY:
    "Tu reporte de intereses esta listo. Podes verlo cuando quieras desde este link. Siempre esta aqui cuando vuelvas.",
  MC_EMAIL_WELCOME_CTA: "Ver mi reporte",
  MC_EMAIL_WELCOME_SIGNOFF: "Hasta pronto,\nEl equipo de DescubreMe",
  MC_EMAIL_WELCOME_FOOTER:
    "Este email es transaccional. Lo enviamos una sola vez porque completaste tu test. No hay seguimiento ni recordatorios.",
} as const;

export type EmailTransactionalMicrocopyKey = keyof typeof emailTransactional;
