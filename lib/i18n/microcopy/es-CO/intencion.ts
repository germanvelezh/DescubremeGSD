/**
 * Intent "taste" microcopy (es-CO) — DescubreMe, Ola 1.3 (HANDOFF_UI §3).
 *
 * The intent is captured BEFORE signup with no server persistence (ADR-029 /
 * Ley 1581): the chosen `slug` travels as a query param to /signup, is written to
 * the auth user_metadata at signup, and is recalled post-auth on the map (1.6),
 * the transition (Ola 2) and the teaser (Ola 3).
 *
 * Each option carries three strings for three voices:
 *  - `title` / `desc`  — the option card, in the user's own first person.
 *  - `recall`          — shown back to the user in second person on the map /
 *                        transition ("Para lo que buscas — {recall} — …").
 *
 * Anchors:
 * - MICROCOPY_ES-CO_SIGNOFF_v1.1 §2 (Intención).
 * - auditoria-ux-ui/prototipo-rediseno-free-v2.html (pantalla "2 · Intención").
 */
export const INTENT_OPTIONS = [
  {
    slug: "general",
    title: "Autoconocimiento general",
    desc: "Quiero una mirada completa de cómo funciono.",
    recall: "una mirada completa de cómo funcionas",
  },
  {
    slug: "carrera",
    title: "Decisiones de carrera",
    desc: "Quiero claridad para decidir mi rumbo.",
    recall: "claridad para decidir tu rumbo",
  },
  {
    slug: "bienestar",
    title: "Mi bienestar",
    desc: "Quiero entender cómo estoy hoy.",
    recall: "entender cómo estás hoy",
  },
] as const;

export type IntentSlug = (typeof INTENT_OPTIONS)[number]["slug"];

export const DEFAULT_INTENT: IntentSlug = "general";

/** Resolve an untrusted slug (query param / metadata) to a known option, or null. */
export function resolveIntent(slug: string | null | undefined) {
  return INTENT_OPTIONS.find((o) => o.slug === slug) ?? null;
}

export const intencion = {
  MC_INTENT_TAG: "Sin cuenta y sin guardar datos todavía",
  MC_INTENT_QUESTION: "¿Qué quieres entender de ti?",
  MC_INTENT_SUB:
    "Con esto ordenamos tu recorrido y lo retomamos al final. Puedes cambiarlo cuando quieras.",
  MC_INTENT_CTA: "Continuar",
} as const;

export type IntencionMicrocopyKey = keyof typeof intencion;
