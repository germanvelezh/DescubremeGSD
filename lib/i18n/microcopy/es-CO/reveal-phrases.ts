/**
 * Reveal phrases (es-CO) — frases reveladoras del mini-resultado por
 * dimension x banda (Ola 2.3). Fuente unica del composer (reveal-composer.ts).
 *
 * Verbatim de MICROCOPY_ES-CO_SIGNOFF_v1.1 §9 (57 claves firmadas §8) +
 * labels es-CO de dimension (cierra [GAP-DIMENSION-LABELS-ES-CO]).
 *
 * Este archivo vive bajo lib/i18n/microcopy → EXCLUIDO del gate FOUND-05
 * (no-hardcoded-instruments): aqui SI pueden aparecer codigos de instrumento y
 * dimension, porque es DATA/microcopy, no logica. reveal-composer.ts (lib/report,
 * ESCANEADO) permanece 100% generico y lee todo lo especifico de aqui via
 * REVEAL_FAMILIES.
 *
 * REVEAL_FAMILIES = registro de familias reveladoras. Cada familia declara su
 * visual_type + los dimCodes que la identifican (desempate de 'bars' entre
 * BFI/PERMA por overlap de dimCodes) + su regla + las piezas de copy + los
 * umbrales/mapeos que la regla generica consume. Umbrales ausentes en el pack:
 * defaults documentados (decision German 2026-07-08 "Defaults + flags"),
 * flags [GAP-ONET-PEAK-GAP-THRESHOLD] / [GAP-TWIVI-ADJACENCY-THRESHOLD] /
 * [GAP-PERMA-OVERALL-THRESHOLD] / [GAP-PERMA-BALANCED-THRESHOLD]; se afinan en
 * deploy-smoke. PERMA lowOverall=5.0 esta anclado a Kern "Languishing" (el mismo
 * corte que el seed usa en distress_thresholds.moderate PERMA_total < 5.0).
 *
 * Regla anti-alucinacion (CLAUDE.md §6): las frases son plantillas
 * deterministicas (no LLM en runtime); el lint de frases prohibidas del repo
 * (tests/lint/prohibited-phrases) aplica a este contenido igual que al seed
 * RIASEC (MICROCOPY §9.6 nota 3).
 *
 * Anchors:
 *  - auditoria-ux-ui/MICROCOPY_ES-CO_SIGNOFF_v1.0.md §9.1-§9.6 (57 claves),
 *    §9.5 (lineas fijas MEASURE/WHY), §4.4 (leyenda de bandas).
 *  - estado/HANDOFF_PR-C_GATE_y_diseno_composer_v1.0.md §2, §3, §6.
 *  - db/seeds/instruments/TwIVI/instrument-version.sql (hov_map).
 *  - db/seeds/instruments/PERMA-Profiler/instrument-version.sql (Kern 5.0).
 */

export type RevealVisualType = "hexagon" | "bars" | "circumplex";

/** Nombre abstracto de la regla de composicion (nunca un codigo de instrumento). */
export type RevealRule = "salience" | "peakOrPair" | "dominantOrPair" | "driver";

/** Metadata por dimension para la regla de saliencia (BFI). */
export interface RevealDimMeta {
  /** Sufijo de clave de fragmento (E/O/C/A/N). */
  key: string;
  /** Etiqueta cotidiana es-CO (cierra [GAP-DIMENSION-LABELS-ES-CO]). */
  label: string;
  /**
   * true cuando el score de la dimension mide lo INVERSO de la etiqueta. NEG
   * puntua "emocionalidad negativa" pero la etiqueta es "Calma" (su inverso):
   * banda ALTO de NEG => fragmento de Calma BAJA. Verificado contra
   * db/seeds/instruments/BFI-2-S/{items,scoring-rule}.sql.
   */
  invertBand?: boolean;
}

/** Par adyacente de HOV en el circumplejo (TwIVI). */
export interface RevealAdjacency {
  /** Los dos codigos HOV del par (orden irrelevante — match por conjunto). */
  hovs: [string, string];
  /** Clave de frase del par en `phrases`. */
  key: string;
}

export interface RevealFamily {
  /** Id interno legible (nunca se muestra al usuario). */
  id: string;
  visualType: RevealVisualType;
  /** dimCodes identificadores — desempatan 'bars' por overlap con scoresByDim. */
  dimCodes: string[];
  rule: RevealRule;
  /** Todas las piezas de copy de la regla, keyed por clave local de regla. */
  phrases: Record<string, string>;
  /** §9.5 "Que medimos". */
  measure: string;
  /** §9.5 "Por que te importa". */
  why: string;
  /**
   * §4.3 — recap fijo de UNA linea del test recien terminado (registro breve del
   * mini-resultado, decision German 2026-07-08: el mini-resultado usa la frase
   * compuesta, el recap de la transicion usa esta linea fija — sin duplicar).
   * Ausente en el ultimo test del journey (no hay transicion tras el).
   */
  recap?: string;

  // -- salience (bars/BFI) --
  dimToKey?: Record<string, RevealDimMeta>;
  /** Coda de cierre para exactamente 1 extrema. */
  coda?: string;
  /** Fallback cuando 0 extremas (todo banda media). */
  fallback?: string;

  // -- peakOrPair (hexagon/O*NET) --
  /** Orden canonico para ordenar el par (R<I<A<S<E<C). */
  canonicalOrder?: string[];

  // -- dominantOrPair (circumplex/TwIVI) --
  /** HOV code -> value codes que promedia (reconstruye HOV desde value means). */
  hovMap?: Record<string, string[]>;
  /** HOV code -> sufijo de clave de frase HOV_*. */
  hovToKey?: Record<string, string>;
  /** Pares adyacentes validos del circumplejo. */
  adjacency?: RevealAdjacency[];

  // -- driver (bars/PERMA) --
  /** Dimensiones sobre las que se calcula el driver (subset de scoresByDim). */
  driverDims?: string[];
  /** driver code -> {driver_label} para la variante LOW_OVERALL. */
  driverLabels?: Record<string, string>;

  /** Umbrales de la regla (defaults documentados; [GAP-*-THRESHOLD]). */
  thresholds?: Record<string, number>;
}

/** §4.4 — leyenda de bandas del mini-resultado (comun a todos los visuales). */
export const REVEAL_BAND_LEGEND =
  "La banda es tu rango probable, no un punto exacto.";

// ---------------------------------------------------------------------------
// BFI-2-S — saliencia (bars). §9.1
// ---------------------------------------------------------------------------
const BFI_FAMILY: RevealFamily = {
  id: "bfi",
  visualType: "bars",
  dimCodes: ["EXT", "AGR", "CON", "NEG", "OPN"],
  rule: "salience",
  measure: "Tu nivel en cinco grandes rasgos de personalidad.",
  why: "En tu perfil integrado, esto se cruza con qué actividades te atraen y con cómo sostienes tu bienestar.",
  recap: "Tu personalidad, en un primer trazo.",
  dimToKey: {
    EXT: { key: "E", label: "Energía social" },
    OPN: { key: "O", label: "Curiosidad" },
    CON: { key: "C", label: "Organización" },
    AGR: { key: "A", label: "Cooperación" },
    NEG: { key: "N", label: "Calma", invertBand: true },
  },
  coda: "Y eso ordena más de tu día a día de lo que parece.",
  fallback:
    "Tu perfil no vive en los extremos: te mueves según lo que la situación pide. Eso también es un rasgo, y de los útiles.",
  phrases: {
    E_ALTA: "la gente te carga las pilas",
    E_BAJA: "recargas energía en lo tranquilo",
    O_ALTA: "te mueves por la curiosidad",
    O_BAJA: "prefieres lo probado a lo experimental",
    C_ALTA: "el orden te da impulso, no te frena",
    C_BAJA: "te acomodas mejor en lo flexible que en lo estructurado",
    A_ALTA: "te importa que la gente a tu alrededor esté bien",
    A_BAJA: "defiendes tu punto aunque incomode",
    N_ALTA: "mantienes el pulso estable aunque el entorno se agite",
    N_BAJA: "sientes con intensidad lo que pasa a tu alrededor",
  },
};

// ---------------------------------------------------------------------------
// O*NET IP-SF — pico vs par (hexagon). §9.2
// ---------------------------------------------------------------------------
const ONET_FAMILY: RevealFamily = {
  id: "onet",
  visualType: "hexagon",
  dimCodes: ["R", "I", "A", "S", "E", "C"],
  rule: "peakOrPair",
  canonicalOrder: ["R", "I", "A", "S", "E", "C"],
  measure: "Qué tipos de actividades te atraen, en seis dimensiones.",
  why: "Sobre este mapa se eligen los entornos de trabajo que vas a explorar al final.",
  recap: "Tus intereses ya dibujan un patrón.",
  thresholds: { peakGap: 5 }, // [GAP-ONET-PEAK-GAP-THRESHOLD] default (suma cruda 10-50)
  phrases: {
    SINGLE_R:
      "Lo concreto te llama: herramientas, terreno y resultados que se pueden tocar.",
    SINGLE_I:
      "Entender cómo funcionan las cosas te energiza más que casi cualquier otra actividad.",
    SINGLE_A: "Darle forma a algo que no existía: eso es lo que más te llama.",
    SINGLE_S:
      "El trabajo con personas te energiza más que el trabajo con cosas.",
    SINGLE_E: "Arrancar cosas y convencer a otros de subirse: eso te mueve.",
    SINGLE_C: "El orden no te aburre: te da terreno firme para rendir.",
    PAIR_RI:
      "Te llama entender cómo funcionan las cosas, mejor si puedes meterles mano.",
    PAIR_RA: "Te gusta hacer con las manos, y que quede bonito además de útil.",
    PAIR_RS:
      "Ayudar en concreto, con hechos más que con discursos: eso te llama.",
    PAIR_RE: "Te gusta emprender en el terreno, donde las cosas pasan de verdad.",
    PAIR_RC:
      "Te acomodan el orden y lo tangible: procesos claros y resultados que se ven.",
    PAIR_IA:
      "Te llaman investigar y crear: entender cómo funcionan las cosas y hacer algo nuevo con eso.",
    PAIR_IS: "Te atrae entender a fondo, y ponerlo al servicio de otros.",
    PAIR_IE: "Te gusta entender el problema y también mover la solución.",
    PAIR_IC: "Te atraen los problemas que se resuelven con análisis y método.",
    PAIR_AS: "Crear y conectar con la gente son tus dos motores.",
    PAIR_AE:
      "Te atrae crear y sacar lo creado al mundo, no dejarlo en el cajón.",
    PAIR_AC: "Creas mejor con estructura: la forma y el orden no se te pelean.",
    PAIR_SE: "Te energiza la gente: acompañarla y también movilizarla.",
    PAIR_SC: "Te atrae ayudar con orden: que el cuidado también funcione bien.",
    PAIR_EC: "Te atrae dirigir con método: iniciativa sí, pero organizada.",
  },
};

// ---------------------------------------------------------------------------
// TwIVI — dominante vs par adyacente (circumplex). §9.3
// hov_map verbatim de db/seeds/instruments/TwIVI/instrument-version.sql.
// ---------------------------------------------------------------------------
const TWIVI_FAMILY: RevealFamily = {
  id: "twivi",
  visualType: "circumplex",
  dimCodes: ["SD", "ST", "HE", "AC", "PO", "SE", "CO", "TR", "BE", "UN"],
  rule: "dominantOrPair",
  measure: "Lo que más pesa cuando decides, en cuatro grandes direcciones.",
  why: "En tu perfil integrado, tus valores se cruzan con tus intereses: ahí se ve si tu rumbo y tu brújula van juntos.",
  recap: "Lo que más te importa, ya en palabras.",
  hovMap: {
    OCH: ["SD", "ST", "HE"],
    SEN: ["AC", "PO"],
    CSV: ["SE", "CO", "TR"],
    STR: ["BE", "UN"],
  },
  hovToKey: {
    OCH: "APERTURA",
    SEN: "AUTOPROM",
    CSV: "CONSERV",
    STR: "AUTOTRASC",
  },
  adjacency: [
    { hovs: ["OCH", "SEN"], key: "PAIR_APER_PROM" },
    { hovs: ["OCH", "STR"], key: "PAIR_APER_TRASC" },
    { hovs: ["CSV", "SEN"], key: "PAIR_CONS_PROM" },
    { hovs: ["CSV", "STR"], key: "PAIR_CONS_TRASC" },
  ],
  thresholds: { adjacency: 0.5 }, // [GAP-TWIVI-ADJACENCY-THRESHOLD] default (centered HOV, escala 1-6)
  phrases: {
    HOV_APERTURA:
      "Valoras decidir tu rumbo y probar cosas nuevas, por encima de lo seguro.",
    HOV_AUTOTRASC:
      "El bienestar de otros y del entorno pesa fuerte en tus decisiones.",
    HOV_CONSERV:
      "Valoras la estabilidad y el terreno conocido: ahí es donde construyes.",
    HOV_AUTOPROM:
      "Lograr cosas y avanzar ocupa un lugar alto en lo que valoras.",
    PAIR_APER_PROM:
      "Valoras la autonomía y el logro: decidir tu camino y llegar lejos en él.",
    PAIR_APER_TRASC:
      "Valoras tu libertad y el cuidado de otros: independencia que no se desentiende.",
    PAIR_CONS_PROM:
      "Valoras avanzar sobre terreno firme: ambición con cimientos.",
    PAIR_CONS_TRASC:
      "Valoras cuidar: a los tuyos, las costumbres y lo que ya se ha construido.",
  },
};

// ---------------------------------------------------------------------------
// PERMA-Profiler — driver + variantes sensibles (bars). §9.4
// ---------------------------------------------------------------------------
const PERMA_FAMILY: RevealFamily = {
  id: "perma",
  visualType: "bars",
  dimCodes: ["P", "E", "R", "M", "A"],
  rule: "driver",
  driverDims: ["P", "E", "R", "M", "A"],
  driverLabels: {
    P: "el disfrute cotidiano",
    E: "lo que te absorbe",
    R: "tus vínculos",
    M: "el sentido de lo que haces",
    A: "la sensación de avanzar",
  },
  measure: "Cómo está tu bienestar hoy, en cinco dimensiones.",
  why: "Cierra tu primer mapa: muestra desde dónde estás leyendo todo lo demás.",
  // lowOverall anclado a Kern "Languishing" (seed distress_thresholds.moderate
  // PERMA_total < 5.0). balancedSpread default. [GAP-PERMA-OVERALL-THRESHOLD] +
  // [GAP-PERMA-BALANCED-THRESHOLD].
  thresholds: { lowOverall: 5.0, balancedSpread: 1.5 },
  phrases: {
    DRIVER_P:
      "Hoy tu bienestar se apoya sobre todo en tu capacidad de disfrutar lo cotidiano.",
    DRIVER_E:
      "Hoy tu bienestar se apoya en esos momentos en los que el tiempo se te pasa sin sentir.",
    DRIVER_R: "Hoy tu bienestar se apoya sobre todo en tus vínculos.",
    DRIVER_M: "Hoy tu bienestar se apoya sobre todo en el sentido de lo que haces.",
    DRIVER_A: "Hoy tu bienestar se apoya sobre todo en la sensación de avanzar.",
    LOW_OVERALL:
      "Hoy tu bienestar pasa por un momento más bajo, y verlo con claridad ya es información valiosa. Tu punto de apoyo más firme hoy: {driver_label}.",
    BALANCED:
      "Tu bienestar hoy se reparte parejo entre sus cinco dimensiones; ninguna carga sola con todo.",
    INCOMPLETE:
      "Tu foto de hoy quedó incompleta, y está bien: puedes completarla cuando quieras.",
  },
};

export const REVEAL_FAMILIES: RevealFamily[] = [
  BFI_FAMILY,
  ONET_FAMILY,
  TWIVI_FAMILY,
  PERMA_FAMILY,
];
