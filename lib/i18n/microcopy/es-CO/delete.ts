/**
 * Microcopy es-CO — /me/delete + MODAL.DELETE.CONFIRM + delete success.
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * Flujo destructivo: directo, factual, sin urgencia ni manipulacion.
 *
 * Pin E2E (no acentuar / no cambiar):
 *   "Borrar mi cuenta" -> /borrar mi cuenta/i ; "Cancelar" -> /cancelar/i ;
 *   "Tu cuenta esta borrada" -> /tu cuenta esta borrada/i  (NO "está").
 *
 * Anchors: 01-UI-SPEC.md §7.8 + §6.10.
 */

export const deleteCopy = {
  // UI-SPEC §7.8 Step 1 — /me/delete
  MC_DELETE_BACK: "Volver a tu cuenta",
  MC_DELETE_HEADING: "Borrar mi cuenta",
  MC_DELETE_BODY_INTRO: "Esto borra:",
  MC_DELETE_BODY_ITEMS: [
    "Tus 60 respuestas",
    "Tu reporte",
    "Tu sesión",
    "Tu consentimiento",
  ] as readonly string[],
  MC_DELETE_BODY_ANONYMIZED:
    "Anonimizamos (no borramos) los registros legales que exige la Ley 1581: el log de auditoría y el de uso.",
  MC_DELETE_BODY_IRREVERSIBLE: "No se puede deshacer.",
  MC_DELETE_PRIMARY_CTA: "Borrar mi cuenta",
  MC_DELETE_GHOST_CTA: "Cancelar",

  // UI-SPEC §6.10 — MODAL.DELETE.CONFIRM
  MC_DELETE_CONFIRM_HEADING:
    "Esto borra tus respuestas, tu reporte y tu cuenta. No se puede deshacer.",
  MC_DELETE_CONFIRM_BODY_INTRO: "Lo que se borra:",
  MC_DELETE_CONFIRM_BODY_LIST: [
    "Tus respuestas (item_response)",
    "Tu puntuación (computed_score)",
    "Tu reporte (report_snapshot)",
    "Tu consentimiento (consent)",
    "Tu sesión (assessment_session)",
  ] as readonly string[],
  MC_DELETE_CONFIRM_BODY_NOTE:
    "Tu registro en los logs queda anonimizado por requerimiento legal (Ley 1581).",
  MC_DELETE_CONFIRM_CANCEL: "Cancelar",
  MC_DELETE_CONFIRM_DESTRUCTIVE_CTA: "Borrar mi cuenta",

  // UI-SPEC §7.8 Step 3 — success page
  MC_DELETE_SUCCESS_HEADING: "Tu cuenta esta borrada.",
  MC_DELETE_SUCCESS_BODY:
    "Gracias por haber probado DescubreMe. Si cambias de opinión, puedes empezar de nuevo cuando quieras.",
  MC_DELETE_SUCCESS_CTA: "Volver al inicio",

  // Error state on delete server action
  MC_DELETE_ERROR:
    "No pudimos completar el borrado. Intenta de nuevo en un momento.",
} as const;
