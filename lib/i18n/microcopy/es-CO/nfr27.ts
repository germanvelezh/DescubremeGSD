/**
 * Microcopy es-CO — DisclaimerModal NFR-27 (UI-SPEC §6.3).
 *
 * Modal pre-test no-dismissable-sin-accion antes del 1er item del instrumento
 * sensible. "Entiendo y continuo" = accion informada (criterion 4). Aplica solo
 * a los instrumentos con `pretest_modal=true` (personalidad / bienestar). El
 * instrumento de valores (TwIVI) NO lleva modal (D-A.2 [RESUELTO]).
 *
 * Copy v0.1 (Claude) — override final pack §7 / Cowork (GAP-FREE-TRANSITIONS-MICROCOPY-ES-CO).
 * Anti-clinico (Principio 5): la negacion "no es una evaluacion clinica" es la
 * forma canonica que el lint COMPL-18 permite. El lexico clinico duro queda
 * prohibido por el lint incluso en negacion, asi que el copy se reframe con
 * "no es una evaluacion clinica" en ambas variantes.
 *
 * Anchors:
 *   - 02-UI-SPEC.md §6.3 (copy; reframe no-clinico por el lint COMPL-18).
 *   - 02-CONTEXT.md D-D.1, D-D.3, D-D.5.
 */
export const nfr27 = {
  MC_NFR27_BFI_HEADING: "Antes de seguir",
  MC_NFR27_BFI_BODY:
    "Las siguientes preguntas tocan cómo te sentís y reaccionás emocionalmente. No hay respuestas correctas y esto no es una evaluación clínica. Si en algún momento te incomoda, podés pausar cuando quieras.",
  MC_NFR27_PERMA_HEADING: "Antes de seguir",
  MC_NFR27_PERMA_BODY:
    "Las siguientes preguntas exploran cómo te sentís con tu vida en este momento. Es una mirada a tu bienestar hoy, no es una evaluación clínica. Podés pausar cuando quieras.",
  MC_NFR27_CTA_PRIMARY: "Entiendo y continúo",
  MC_NFR27_CTA_BACK: "Ahora no",
} as const;

export type Nfr27MicrocopyKey = keyof typeof nfr27;
