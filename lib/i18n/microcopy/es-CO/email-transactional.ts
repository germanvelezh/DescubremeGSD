/**
 * Microcopy es-CO — Email transaccional "tu reporte esta listo" (D3.7).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Un solo email tras completar. Sin recordatorios. Sin tracking. 1 CTA.
 * Tono calmo, profesional, sin urgencia (UX-02).
 *
 * Pin unit test: el FROM contiene "DescubreMe"; el SUBJECT no lleva
 * "!" ni palabras de marketing (free/gratis/exclusive/claim).
 */

export const emailTransactional = {
  MC_EMAIL_WELCOME_FROM_NAME: "DescubreMe",
  MC_EMAIL_WELCOME_SUBJECT: "Tu reporte de intereses está listo",
  MC_EMAIL_WELCOME_GREETING: "Hola,",
  MC_EMAIL_WELCOME_BODY:
    "Tu reporte de intereses ya está listo. Puedes verlo cuando quieras desde el botón de abajo: queda guardado y siempre va a estar acá cuando vuelvas.",
  MC_EMAIL_WELCOME_CTA: "Ver mi reporte",
  MC_EMAIL_WELCOME_SIGNOFF: "Hasta pronto,\nEl equipo de DescubreMe",
  MC_EMAIL_WELCOME_FOOTER:
    "Este es un correo transaccional: lo enviamos una sola vez porque completaste tu test. No hay seguimiento ni recordatorios automáticos.",

  // FREE-14 — Free completion email (the 4 tests done -> integrated teaser).
  // Sober, no urgency (UX-07); links to the perfil integrado, not a single test.
  MC_EMAIL_FREE_COMPLETE_SUBJECT: "Tu perfil integrado está listo",
  MC_EMAIL_FREE_COMPLETE_GREETING: "Hola,",
  MC_EMAIL_FREE_COMPLETE_BODY:
    "Completaste los cuatro tests. Ya puedes ver tu perfil integrado: un primer cruce de tus intereses, tu personalidad, tus valores y tu bienestar. Queda guardado para cuando quieras volver.",
  MC_EMAIL_FREE_COMPLETE_CTA: "Ver mi perfil integrado",
  MC_EMAIL_FREE_COMPLETE_SIGNOFF: "Hasta pronto,\nEl equipo de DescubreMe",
  MC_EMAIL_FREE_COMPLETE_FOOTER:
    "Este es un correo transaccional: lo enviamos una sola vez porque completaste tu perfil. No hay seguimiento ni recordatorios automáticos.",
} as const;

export type EmailTransactionalMicrocopyKey = keyof typeof emailTransactional;
