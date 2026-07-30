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
  // TODO(german): revisar con Cowork para instrumentos de 8 bloques —
  // [DELTA-MC-BLOCK-SUBTITLE-8-BLOQUES], 2026-07-30. Este texto se escribio para
  // los 5 bloques de 12 de O*NET. VIA-IS-P-96 son 96 items = 8 bloques de 12
  // (D-16, 03-UI-SPEC §5), y "cada bloque se siente rápido y completo" deja de
  // ser honesto cuando faltan 8. La redaccion es zona Cowork (CLAUDE.md §6), asi
  // que NO se reescribe aca. Bloquea el plan 03-06, que siembra VIA.
  MC_TEST_BLOCK_SUBTITLE:
    "Avanzas por bloques cortos: cada bloque se siente rápido y completo.",
  // Fase 3 (D-16/D-17, 03-UI-SPEC §6 + Copywriting Contract v0.1). La sugerencia
  // de pausa PROMUEVE el enlace de salida que ya existe en el pie; no es un
  // modal ni un interstitial, y el item siguiente sigue respondible.
  //
  // El tono es INVITACION, nunca advertencia ni ruego. Prohibido "¿seguro que
  // quieres irte?", cualquier cifra de abandono, y sobre todo cualquier
  // formulacion de perdida de progreso: seria ademas FALSA, porque cada
  // respuesta se persiste por item (`/api/respond` + advanceProgress).
  //
  // El numero que recibe `MC_TEST_PAUSE_SUGGESTION` es el del bloque que el
  // usuario acaba de CERRAR (resolveClosedBlock), no el que esta empezando.
  MC_TEST_PAUSE_SUGGESTION: (bloque: number) =>
    `Terminaste el bloque ${bloque}. Es buen momento para parar si quieres: guardamos todo.`,
  MC_TEST_PAUSE_MIDPOINT: (instrumentLabel: string) =>
    `Vas por la mitad de ${instrumentLabel}. Puedes seguir o retomarlo después.`,
  // SIN USO desde el pase de a11y: el fieldset lleva `aria-labelledby` al
  // enunciado, que gana sobre `aria-label`, asi que este texto nunca se leia —
  // y ademas es la instruccion de UN instrumento, aplicada a los cuatro. Se
  // deja la clave porque el microcopy es zona Cowork: borrarla o reescribirla
  // por instrumento es su decision.
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
