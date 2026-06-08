/**
 * Microcopy es-CO — Pantalla "Tu reporte esta listo" (UI-SPEC §7.4).
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Hexagono preview outline-only: insinua, no revela. Sin promesas.
 *
 * Pin E2E (no cambiar):
 *   "Ver mi reporte" -> /ver mi reporte/i ;
 *   "Tus tres dimensiones principales" -> /Tus tres dimensiones principales:/.
 */

export const reportReady = {
  MC_REPORT_READY_HEADING: "Tu reporte está listo.",
  MC_REPORT_READY_TEASER:
    "Tus tres dimensiones principales ya asoman acá. El reporte completo te muestra qué significan y cómo se conectan.",
  MC_REPORT_READY_PROMPT: "Para verlo completo, dejanos tu email.",
  MC_REPORT_READY_PRIVACY_INLINE:
    "Cifrado. Sin spam. Podés borrar tu cuenta cuando quieras.",
  MC_REPORT_READY_CTA_VIEW_REPORT: "Ver mi reporte",
  // ARIA label de la seccion preview del hexagono en el form de signup.
  MC_REPORT_READY_HEXAGON_PREVIEW_ARIA: "Vista previa del hexágono RIASEC",
} as const;
