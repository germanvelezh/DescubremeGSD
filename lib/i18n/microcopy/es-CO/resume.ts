/**
 * Resume screen microcopy (es-CO) — Phase 1 Wave 3 (Plan 01-06).
 *
 * Placeholders per UI-SPEC §7.3 "Pause/resume entry". Cowork redacta
 * el texto final via `[GAP-MICROCOPY-FASE1]`.
 *
 * TODO(cowork): microcopy final pendiente — placeholder funcional.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.3 lines 555-568.
 * - 01-CONTEXT.md D2.8.
 */
export const resume = {
  MC_RESUME_GREETING: "Hola de nuevo.",
  MC_RESUME_PROGRESS: (completed: number, total: number) =>
    `Ya completaste ${completed} de ${total}.`,
  MC_RESUME_CTA: "Continuar",
  MC_RESUME_RESTART_LINK: "Empezar de nuevo",
} as const;
