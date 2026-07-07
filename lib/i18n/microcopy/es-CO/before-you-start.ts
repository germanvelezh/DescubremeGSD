/**
 * Before-you-start page microcopy (es-CO) — DescubreMe.
 *
 * Override final Cowork (UX Writer) — GAP-MICROCOPY-FASE1.
 * D2.5: hook 1 linea + tiempo honesto + 1 instruccion + boton. UX-02.
 *
 * Pin E2E (no acentuar / no cambiar): "Empezar" -> /^Empezar$/i.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.2.
 * - 01-CONTEXT.md D2.5.
 */
export const beforeYouStart = {
  MC_BYS_HOOK:
    "Vamos a mapear qué tipo de actividades te energizan y cuáles te drenan.",
  MC_BYS_TIME:
    "Toma alrededor de 10-12 minutos. Puedes pausar cuando quieras.",
  MC_BYS_INSTRUCTION:
    "Vas a ver 60 actividades. Para cada una, indica cuánto te gustaría hacerla. No hay respuestas correctas ni incorrectas.",
  MC_BYS_CTA: "Empezar",
  MC_BYS_BACK_LABEL: "Atrás",
} as const;

export type BysMicrocopyKey = keyof typeof beforeYouStart;
