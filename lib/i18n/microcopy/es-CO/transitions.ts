/**
 * Microcopy es-CO — pantallas de transición del journey Free (UI-SPEC §6.6).
 *
 * La transición cierra-y-abre entre tests: resultado glanceable del test recién
 * hecho + hook de 1 línea del siguiente + CTA "Empezar". Para los sensibles
 * (BFI-2-S / PERMA) el modal NFR-27 (`nfr27.ts`, ya existe — 02-06) se monta
 * ANTES del 1er item.
 *
 * Copy v0.1 (Claude) — placeholder. Los hooks por test probablemente ya viven en
 * TEST_INTRO_MICROCOPY / pack §5; el delta de transiciones del journey es el GAP
 * [GAP-FREE-TRANSITIONS-MICROCOPY-ES-CO] (P2, Owner Cowork). Verbatim del pack
 * cuando llegue; mientras tanto este placeholder mantiene el flujo funcional.
 *
 * Convención §8.4: IDs `MC_*` plano underscore; los componentes importan por ID,
 * Cowork edita strings sin tocar componentes.
 *
 * Anchors:
 *   - 02-UI-SPEC.md §6.6 (TransitionScreen), §8.3/§8.4 (copy contract).
 *   - 02-CONTEXT.md D-A.4 (cadencia glanceable + persistente), D-F4.2 (transición).
 */
export const transitions = {
  /** CTA primario de la transición hacia el siguiente test. */
  MC_TRANSITION_CTA: "Empezar",
  /** Encabezado del bloque "resultado glanceable" del test recién terminado. */
  MC_TRANSITION_RESULT_HEADING: "Esto fue lo que vimos",
  /** Hook genérico de 1 línea del siguiente test (override por test desde pack §5). */
  MC_TRANSITION_HOOK_DEFAULT: "Sigamos con el siguiente paso.",
  /** Etiqueta "Qué medimos" del mini-resultado (§9.5). */
  MC_MINIRESULT_MEASURE_LABEL: "Qué medimos",
  /** Etiqueta "Por qué te importa" del mini-resultado (§9.5). */
  MC_MINIRESULT_WHY_LABEL: "Por qué te importa",
  /**
   * Recall de intención en la transición (§4.3). El `recall` viene de
   * resolveIntent (segunda persona, minúscula): "una mirada completa de cómo
   * funcionas" / "claridad para decidir tu rumbo" / "entender cómo estás hoy".
   */
  MC_TRANSITION_INTENT_RECALL: (recall: string) =>
    `Sigues buscando ${recall}. Vas por buen camino.`,
  /** aria-label del progreso por dots (lector de pantalla). */
  MC_TRANSITION_PROGRESS_ARIA: (done: number, total: number) =>
    `Vas ${done} de ${total}.`,
  /** Estado de abandono parcial al volver (D-A.6). */
  MC_TRANSITION_RESUME_LABEL: (completed: number, total: number) =>
    `Completaste ${completed} de ${total}.`,
  MC_TRANSITION_RESUME_CTA: "Continuar",
} as const;

export type TransitionsMicrocopyKey = keyof typeof transitions;
