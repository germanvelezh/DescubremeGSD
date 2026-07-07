/**
 * Map ("Tu recorrido") microcopy (es-CO) — DescubreMe, Ola 1.6 (HANDOFF_UI §3).
 *
 * Shown once, post-consent, before the first test (fresh signups only — the
 * callback skips it on resume). Recalls the intent captured at /intencion (1.3)
 * and previews the 4-stop journey. The recall line is composed as
 * `${PREFIX} ${intent.recall} ${SUFFIX}` (intent phrase from intencion.ts).
 *
 * MAPA_STOPS is presentational (the 4 test names/times in fixed order) — display
 * copy, NOT instrument-code logic; the CTA target is resolved data-driven from
 * product_stack via resolveNextFreeTest.
 *
 * Anchors:
 * - MICROCOPY_ES-CO_SIGNOFF_v1.1 §2 (Mapa).
 * - auditoria-ux-ui/prototipo-rediseno-free-v2.html (pantalla "4 · Mapa de 4").
 */
export const MAPA_STOPS = [
  { title: "Personalidad", desc: "Cómo piensas, sientes y te relacionas.", time: "~4 min" },
  { title: "Intereses", desc: "Qué actividades te energizan y cuáles te drenan.", time: "~6 min" },
  { title: "Valores", desc: "Lo que más te importa, en palabras.", time: "~3 min" },
  { title: "Bienestar", desc: "Una foto honesta de cómo estás hoy.", time: "~3 min" },
] as const;

export const mapa = {
  MC_MAPA_TAG: "Tu recorrido",
  MC_MAPA_HEADING: "Cuatro paradas, 12-18 minutos",
  MC_MAPA_SUB: "Puedes hacerlo de una o en dos ratos; guardamos tu avance.",
  MC_MAPA_CTA: "Empezar por personalidad",
  MC_MAPA_RECALL_PREFIX: "Para lo que buscas —",
  MC_MAPA_RECALL_SUFFIX: "— empezamos por aquí.",
} as const;

export type MapaMicrocopyKey = keyof typeof mapa;
