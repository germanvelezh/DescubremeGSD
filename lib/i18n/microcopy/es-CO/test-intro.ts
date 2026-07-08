/**
 * Test intro microcopy (es-CO) — hook + "antes de comenzar" por test (Ola 2.2).
 *
 * Cierra [GAP-FREE-TEST-INTRO-COPY]. Copy firmado en
 * MICROCOPY_ES-CO_SIGNOFF_v1.1 §4.1 (hooks) + §4.2 (intros factuales).
 *
 * Se muestra UNA vez, en la entrada del test (session.progress === 0), en el
 * mismo contenedor que el hook. Para los instrumentos sensibles (BFI/PERMA) el
 * bloque NFR-27 se embebe en ese contenedor reusando el copy INTACTO de
 * `nfr27.ts` + `getContentionResources` (solo cambia el contenedor, no el
 * contenido — CLAUDE.md §8, no-tocar NFR-27/28).
 *
 * `getTestIntro` resuelve por codigo de instrumento case-insensitive (el runner
 * pasa el codigo en mayusculas via `code.toUpperCase()`), null si el codigo no
 * tiene intro sembrada (degrada a "sin intro" — nunca bloquea el test).
 *
 * Anchors:
 * - MICROCOPY_ES-CO_SIGNOFF_v1.1 §4.1, §4.2.
 * - HANDOFF_UI_v1.0 §3 (Ola 2.2).
 */
export interface TestIntroCopy {
  /** Gancho emocional (§4.1) — por que este test importa. */
  hook: string;
  /** "Antes de comenzar" factual (§4.2) — que vas a hacer, sin afecto. */
  intro: string;
}

const BY_CODE: Record<string, TestIntroCopy> = {
  "BFI-2-S": {
    hook: "Cinco grandes rasgos dan forma a cómo piensas, sientes y te relacionas. Vamos a ver los tuyos.",
    intro:
      "Vas a responder qué tanto te describen algunas frases, en una escala de muy en desacuerdo a muy de acuerdo. No hay respuestas correctas: la honesta es la útil.",
  },
  "ONET-IP-SF": {
    hook: "Vamos a mapear qué tipo de actividades te energizan y cuáles te drenan.",
    intro:
      "Vas a calificar qué tanto te atraen distintas actividades de trabajo, de nada a mucho. Avanzas por bloques cortos; responde por gusto, no por lo que “deberías”.",
  },
  TWIVI: {
    hook: "Lo que más te importa guía tus decisiones, muchas veces sin que lo notes. Vamos a ponerlo en palabras.",
    intro:
      "Vas a leer descripciones cortas de personas y decir qué tanto se parecen a ti. No hay valores buenos ni malos: hay los tuyos.",
  },
  "PERMA-PROFILER": {
    hook: "Una foto honesta de cómo está tu bienestar hoy, en cinco dimensiones.",
    intro:
      "Vas a responder cómo te has sentido últimamente en cinco dimensiones de tu bienestar. Es una foto de hoy, no una etiqueta para siempre.",
  },
};

export const testIntro = {
  /** CTA para arrancar el test tras leer el hook + intro (no sensibles). */
  MC_INTRO_START_CTA: "Comenzar",
  /** aria-label del contenedor de intro (hook + "antes de comenzar"). */
  MC_INTRO_SECTION_ARIA: "Antes de comenzar",
} as const;

/**
 * Resolves the hook + intro copy for an instrument code (case-insensitive).
 * Returns null when the code has no seeded intro, so the runner degrades to
 * "no intro screen" instead of failing.
 */
export function getTestIntro(code: string): TestIntroCopy | null {
  return BY_CODE[code.toUpperCase()] ?? null;
}
