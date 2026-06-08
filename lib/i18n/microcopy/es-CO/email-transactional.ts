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
    "Tu reporte de intereses ya está listo. Podés verlo cuando quieras desde el botón de abajo: queda guardado y siempre va a estar acá cuando vuelvas.",
  MC_EMAIL_WELCOME_CTA: "Ver mi reporte",
  MC_EMAIL_WELCOME_SIGNOFF: "Hasta pronto,\nEl equipo de DescubreMe",
  MC_EMAIL_WELCOME_FOOTER:
    "Este es un correo transaccional: lo enviamos una sola vez porque completaste tu test. No hay seguimiento ni recordatorios automáticos.",
} as const;

export type EmailTransactionalMicrocopyKey = keyof typeof emailTransactional;
