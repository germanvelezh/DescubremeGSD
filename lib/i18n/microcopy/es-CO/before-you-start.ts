/**
 * Before-you-start page microcopy (es-CO) — Phase 1 Wave 3 (Plan 01-06).
 *
 * Placeholders per UI-SPEC §7.2. Cowork redacta el texto final via
 * `[GAP-MICROCOPY-FASE1]`.
 *
 * TODO(cowork): microcopy final pendiente — placeholder funcional.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.2.
 * - 01-CONTEXT.md D2.5.
 */
export const beforeYouStart = {
  MC_BYS_HOOK:
    "Vamos a mapear que tipo de actividades te energizan y cuales te drenan.",
  MC_BYS_TIME:
    "Toma alrededor de 10-12 minutos. Podes pausar cuando quieras.",
  MC_BYS_INSTRUCTION:
    "Vas a ver 60 actividades. Para cada una, indica cuanto te gustaria hacerla. No hay respuestas correctas.",
  MC_BYS_CTA: "Empezar",
  MC_BYS_BACK_LABEL: "Atras",
} as const;

export type BysMicrocopyKey = keyof typeof beforeYouStart;
