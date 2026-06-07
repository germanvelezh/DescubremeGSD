/**
 * Test screen microcopy (es-CO) — Phase 1 Wave 3 (Plan 01-06).
 *
 * Placeholders per UI-SPEC §7.3. Cowork redacta el texto final via
 * `[GAP-MICROCOPY-FASE1]`.
 *
 * TODO(cowork): microcopy final pendiente — placeholder funcional.
 *
 * Anchors:
 * - 01-UI-SPEC.md §6.4, §6.5, §7.3.
 */
export const test = {
  MC_TEST_PROGRESS_LABEL: (current: number, total: number) =>
    `Paso ${current} de ${total}`,
  MC_TEST_QUESTION_LABEL: (current: number, total: number) =>
    `Pregunta ${current} de ${total}`,
  MC_TEST_AUTOSAVE_CHIP: "Te guardamos cada respuesta",
  MC_TEST_AUTOSAVE_RETRY: "Reintentando...",
  MC_TEST_EXIT_LINK: "Salir y continuar despues",
  MC_TEST_NEXT_CTA: "Siguiente",
  MC_TEST_PREV_CTA: "Anterior",
  MC_TEST_PROGRESSBAR_ARIA: (current: number, total: number) =>
    `Paso ${current} de ${total}`,
  MC_TEST_RADIOGROUP_ARIA_LABEL: "Indica cuanto te gustaria hacer esta actividad",
  // ARIA label para el landmark NFR-28 (vacio en Phase 1, Phase 2 activa).
  MC_TEST_CONTENTION_LANDMARK_ARIA: "Recursos de ayuda",
} as const;
