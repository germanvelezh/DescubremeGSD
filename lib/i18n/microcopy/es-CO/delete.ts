/**
 * Microcopy es-CO — /me/delete + MODAL.DELETE.CONFIRM + delete success.
 *
 * Maps to UI-SPEC §7.8 + §6.10 (Plan 01-10 Task 2).
 *
 * Placeholder text shipped by Claude Code. Cowork delivers the final
 * es-CO neutral copy pre-deploy via `[GAP-MICROCOPY-FASE1]`.
 *
 * Tono: directo, sin urgencia, sin manipulacion. CLAUDE.md §8 prohibits
 * exaggerating predictive value; this destructive flow stays factual.
 *
 * TODO(cowork): override every value with the final es-CO neutral copy.
 */

export const deleteCopy = {
  // UI-SPEC §7.8 Step 1 — /me/delete
  MC_DELETE_BACK: "Volver a tu cuenta",
  MC_DELETE_HEADING: "Borrar mi cuenta",
  MC_DELETE_BODY_INTRO: "Esto borra:",
  MC_DELETE_BODY_ITEMS: [
    "Tus 60 respuestas",
    "Tu reporte",
    "Tu sesion",
    "Tu consentimiento",
  ] as readonly string[],
  MC_DELETE_BODY_ANONYMIZED:
    "Anonimizamos (no borramos) los registros legales requeridos por Ley 1581 (audit log, usage log).",
  MC_DELETE_BODY_IRREVERSIBLE: "No se puede deshacer.",
  MC_DELETE_PRIMARY_CTA: "Borrar mi cuenta",
  MC_DELETE_GHOST_CTA: "Cancelar",

  // UI-SPEC §6.10 — MODAL.DELETE.CONFIRM
  MC_DELETE_CONFIRM_HEADING:
    "Esto borra tus respuestas, tu reporte y tu cuenta. No se puede deshacer.",
  MC_DELETE_CONFIRM_BODY_INTRO: "Lo que se borra:",
  MC_DELETE_CONFIRM_BODY_LIST: [
    "Tus respuestas (item_response)",
    "Tu puntuacion (computed_score)",
    "Tu reporte (report_snapshot)",
    "Tu consentimiento (consent)",
    "Tu sesion (assessment_session)",
  ] as readonly string[],
  MC_DELETE_CONFIRM_BODY_NOTE:
    "Tu registro en logs queda anonimizado por requerimiento legal (Ley 1581).",
  MC_DELETE_CONFIRM_CANCEL: "Cancelar",
  MC_DELETE_CONFIRM_DESTRUCTIVE_CTA: "Borrar mi cuenta",

  // UI-SPEC §7.8 Step 3 — success page
  MC_DELETE_SUCCESS_HEADING: "Tu cuenta esta borrada.",
  MC_DELETE_SUCCESS_BODY:
    "Gracias por haber probado DescubreMe. Si cambias de opinion, podes empezar de nuevo cuando quieras.",
  MC_DELETE_SUCCESS_CTA: "Volver al inicio",

  // Error state on delete server action
  MC_DELETE_ERROR:
    "No pudimos completar el borrado. Intenta de nuevo en un momento.",
} as const;
