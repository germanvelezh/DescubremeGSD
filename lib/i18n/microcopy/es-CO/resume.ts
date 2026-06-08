/**
 * Resume screen microcopy (es-CO) — DescubreMe.
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * D2.8: retorno calmo, profesional. Sin culpa por haber pausado.
 *
 * Pin E2E (no acentuar / no cambiar):
 *   "Hola de nuevo" -> /Hola de nuevo/i ; "Continuar" -> /^Continuar$/i.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.3.
 * - 01-CONTEXT.md D2.8.
 */
export const resume = {
  MC_RESUME_GREETING: "Hola de nuevo.",
  MC_RESUME_PROGRESS: (completed: number, total: number) =>
    `Retomamos donde lo dejaste: ya completaste ${completed} de ${total}.`,
  MC_RESUME_CTA: "Continuar",
  MC_RESUME_RESTART_LINK: "Empezar de nuevo",
} as const;
