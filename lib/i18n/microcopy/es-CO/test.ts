/**
 * Test screen microcopy (es-CO) — DescubreMe.
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Tono: neutral, sin afecto. Las anclas de respuesta viven en
 * lib/questionnaire/response-scales.ts (no aca).
 *
 * Pin E2E (no acentuar / no cambiar):
 *   "Te guardamos cada respuesta" -> /Te guardamos cada respuesta/i.
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
  MC_TEST_EXIT_LINK: "Salir y continuar después",
  MC_TEST_NEXT_CTA: "Siguiente",
  MC_TEST_PREV_CTA: "Anterior",
  MC_TEST_PROGRESSBAR_ARIA: (current: number, total: number) =>
    `Paso ${current} de ${total}`,
  // Phase 2 — progreso de doble nivel (UX-04, D-F4.1, UI-SPEC §6.5).
  MC_TEST_GLOBAL_PROGRESS_LABEL: (
    current: number,
    total: number,
    instrumentLabel: string,
  ) => `Test ${current} de ${total} · ${instrumentLabel}`,
  MC_TEST_GLOBAL_PROGRESS_ARIA: (
    current: number,
    total: number,
    instrumentLabel: string,
  ) => `Test ${current} de ${total}: ${instrumentLabel}`,
  MC_TEST_RADIOGROUP_ARIA_LABEL: "Indicá cuánto te gustaría hacer esta actividad",
  // ARIA label del landmark NFR-28 (vacio en Phase 1, Phase 2 lo activa).
  MC_TEST_CONTENTION_LANDMARK_ARIA: "Recursos de ayuda",
} as const;
