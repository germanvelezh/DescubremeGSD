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
  MC_TEST_AUTOSAVE_CHIP: "Te guardamos cada respuesta",
  MC_TEST_AUTOSAVE_RETRY: "Reintentando...",
  MC_TEST_EXIT_LINK: "Salir y continuar después",
  MC_TEST_NEXT_CTA: "Siguiente",
  MC_TEST_PREV_CTA: "Anterior",
  // Ola 2.1 — vuelta al frontier desde una revision "Atras" (Model A).
  MC_TEST_CONTINUE_CTA: "Continuar",
  // Ola 2.1 — progreso intra-test VISIBLE (reemplaza el sr-only oculto y la
  // etiqueta "Paso/Pregunta"). Barra continua: BFI / TwIVI / PERMA.
  MC_TEST_PROGRESS_VISIBLE: (current: number, total: number) =>
    `Vas en ${current} de ${total}`,
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
  // Ola 2.1 — presentacion por bloques (SOLO O*NET IP-SF, 60 items en 5x12).
  // Bloques SECUENCIALES sin reordenar; el label cambia solo en el limite de
  // bloque, por eso su region es el unico aria-live de hito (respeta la regla
  // §6.5 "no aria-live por incremento" para la barra continua).
  // Visible label + aria-live region: contains ONLY the block number, so a
  // screen reader announces once per block boundary, never per item.
  MC_TEST_BLOCK_LABEL: (block: number, totalBlocks: number) =>
    `Bloque ${block} de ${totalBlocks}`,
  // aria-label for the intra-block progressbar (read on navigation, not announced).
  MC_TEST_BLOCK_PROGRESS_ARIA: (
    block: number,
    totalBlocks: number,
    itemInBlock: number,
    blockSize: number,
  ) => `Bloque ${block} de ${totalBlocks}, paso ${itemInBlock} de ${blockSize}`,
  MC_TEST_BLOCK_SUBTITLE:
    "Avanzas por bloques cortos: cada bloque se siente rápido y completo.",
  MC_TEST_RADIOGROUP_ARIA_LABEL: "Indica cuánto te gustaría hacer esta actividad",
  // ARIA label del landmark NFR-28 (vacio en Phase 1, Phase 2 lo activa).
  MC_TEST_CONTENTION_LANDMARK_ARIA: "Recursos de ayuda",
  // Estado "no disponible" cuando la escala de un instrumento no esta lista
  // (scale.ready===false). Generico, sin filtrar codigos ni internos (02-20
  // Gap D defensive guard, T-02-20-02). Evita el radiogroup vacio congelado.
  MC_TEST_UNAVAILABLE_TITLE: "Este test no está disponible por ahora",
  MC_TEST_UNAVAILABLE_BODY:
    "Estamos terminando de prepararlo. Vuelve a intentarlo más tarde.",
} as const;
