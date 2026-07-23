/**
 * reveal-composer — compone la frase reveladora del mini-resultado (Ola 2.3).
 *
 * Motor GENERICO: cero literales de instrumento/dimension (FOUND-05 — este
 * archivo vive bajo lib/report, ESCANEADO). Todo lo especifico de cada
 * instrumento (dimCodes, invert NEG, hov_map, pares adyacentes, umbrales,
 * labels y copy) se lee de REVEAL_FAMILIES en
 * lib/i18n/microcopy/es-CO/reveal-phrases (EXCLUIDO de FOUND-05).
 *
 * Dispatcher: elige la familia por visual_type; desempata 'bars' (BFI vs PERMA)
 * por el overlap de dimCodes con las claves de scoresByDim (cero solape por
 * diseno). Cuatro reglas puras (§9): saliencia, pico-vs-par, dominante-vs-par
 * adyacente, driver. Nunca lanza — sin familia => texto vacio (el wire degrada
 * al hook).
 *
 * Fuente unica (MICROCOPY §9.6 nota 2): esta funcion alimenta el mini-resultado
 * (2.3) Y el recap reusable de la transicion. No duplicar generadores de frase.
 *
 * Contrato de entrada (proyeccion del ReportPayload del assembler, HANDOFF §1):
 * { visualType, scoresByDim (layer1), bandsByDim (layer2.scoresWithBands.band),
 * top3 (layer1), distress }. NUNCA visualDimensions (vacio en el path hexagon).
 * showContention es PASSTHROUGH de la decision del servidor (score-session
 * persistio report.distress) — el composer NO recomputa el umbral (T-02-08-02,
 * decision German 2026-07-08).
 *
 * Anchors:
 *  - lib/i18n/microcopy/es-CO/reveal-phrases.ts (REVEAL_FAMILIES, 57 claves §9).
 *  - lib/report/assembler.ts (ReportPayload — proyeccion de entrada).
 *  - estado/HANDOFF_PR-C_GATE_y_diseno_composer_v1.0.md §2, §3.
 */
import {
  REVEAL_FAMILIES,
  type RevealFamily,
  type RevealVisualType,
} from "@/lib/i18n/microcopy/es-CO/reveal-phrases";

export type IpsativeBand = "BAJO" | "MEDIO" | "ALTO";
export type RevealTone = "normal" | "sensitive";

export interface RevealInput {
  visualType: RevealVisualType;
  /** Puntajes crudos por dimension (layer1.scoresByDim del assembler). */
  scoresByDim: Record<string, number>;
  /** Bandas por dimension (layer2.scoresWithBands[dim].band). Solo la usa BFI. */
  bandsByDim: Record<string, IpsativeBand>;
  /** Top-3 resuelto por el assembler (solo semantico en hexagon). */
  top3?: readonly string[];
  /** Decision de contencion NFR-28 persistida por el servidor (no recomputar). */
  distress?: {
    showContention?: boolean;
    severity?: "strong" | "moderate" | null;
  };
}

export interface RevealResult {
  /** "Que dice" — frase compuesta (parte central del mini-resultado 3 partes). */
  text: string;
  tone: RevealTone;
  /** Passthrough de la decision del servidor (footer de contencion). */
  showContention: boolean;
  /** §9.5 "Que medimos" (linea fija del instrumento). */
  measure: string;
  /** §9.5 "Por que te importa" (linea fija del instrumento). */
  why: string;
  /** §4.3 recap de una linea del test recien terminado ("" si no aplica). */
  recap: string;
}

interface Composed {
  text: string;
  tone: RevealTone;
}

/** Compone la frase reveladora del mini-resultado. Nunca lanza. */
export function composeReveal(input: RevealInput): RevealResult {
  const showContention = input.distress?.showContention ?? false;
  const family = selectFamily(input.visualType, input.scoresByDim);
  if (!family) {
    return {
      text: "",
      tone: "normal",
      showContention,
      measure: "",
      why: "",
      recap: "",
    };
  }
  const composed = runRule(family, input);
  return {
    text: composed.text,
    tone: composed.tone,
    showContention,
    measure: family.measure,
    why: family.why,
    recap: family.recap ?? "",
  };
}

/**
 * Elige la familia por visual_type. Con varias candidatas (bars => BFI/PERMA)
 * desempata por el mayor overlap de dimCodes con las claves de scoresByDim.
 */
export function selectFamily(
  visualType: RevealVisualType,
  scoresByDim: Record<string, number>,
): RevealFamily | null {
  const candidates = REVEAL_FAMILIES.filter((f) => f.visualType === visualType);
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0] ?? null;

  const keys = new Set(Object.keys(scoresByDim));
  let best: RevealFamily | null = null;
  let bestOverlap = 0;
  for (const f of candidates) {
    const overlap = f.dimCodes.filter((d) => keys.has(d)).length;
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = f;
    }
  }
  return bestOverlap > 0 ? best : null;
}

function runRule(family: RevealFamily, input: RevealInput): Composed {
  switch (family.rule) {
    case "salience":
      return composeSalience(family, input);
    case "peakOrPair":
      return composePeakOrPair(family, input);
    case "dominantOrPair":
      return composeDominantOrPair(family, input);
    case "driver":
      return composeDriver(family, input);
    default:
      return { text: "", tone: "normal" };
  }
}

// ---------------------------------------------------------------------------
// Reglas puras (§9)
// ---------------------------------------------------------------------------

/**
 * Saliencia (bars/BFI). §9.1: extremas = dims con banda != MEDIO, ordenadas por
 * |z-score ipsativo| desc. 2+ => "Cap(frag1) y frag2." · 1 => "Cap(frag). coda"
 * · 0 => fallback. La banda de una dim con `invertBand` se voltea antes de
 * elegir el fragmento (NEG puntua emocionalidad negativa, etiqueta = Calma).
 */
function composeSalience(family: RevealFamily, input: RevealInput): Composed {
  const dimToKey = family.dimToKey ?? {};
  const phrases = family.phrases;
  const dims = Object.keys(dimToKey);

  const raws = dims.map((d) => input.scoresByDim[d] ?? 0);
  const m = mean(raws);
  const sd = stddev(raws, m);

  const extremas = dims
    .filter((d) => (input.bandsByDim[d] ?? "MEDIO") !== "MEDIO")
    .map((d) => ({
      dim: d,
      salience: sd === 0 ? 0 : Math.abs(((input.scoresByDim[d] ?? 0) - m) / sd),
    }))
    .sort(
      (a, b) =>
        b.salience - a.salience ||
        family.dimCodes.indexOf(a.dim) - family.dimCodes.indexOf(b.dim),
    );

  if (extremas.length === 0) {
    return { text: family.fallback ?? "", tone: "normal" };
  }

  const frag = (d: string): string => {
    const meta = dimToKey[d];
    if (!meta) return "";
    const band = input.bandsByDim[d] ?? "MEDIO";
    const effective = meta.invertBand ? flipBand(band) : band;
    const suffix = effective === "ALTO" ? "ALTA" : "BAJA";
    return phrases[`${meta.key}_${suffix}`] ?? "";
  };

  const d1 = extremas[0];
  if (!d1) return { text: family.fallback ?? "", tone: "normal" };
  const d2 = extremas[1];
  if (d2) {
    return {
      text: `${cap(frag(d1.dim))} y ${frag(d2.dim)}.`,
      tone: "normal",
    };
  }
  return {
    text: `${cap(frag(d1.dim))}. ${family.coda ?? ""}`,
    tone: "normal",
  };
}

/**
 * Pico vs par (hexagon/O*NET). §9.2: gap(top1,top2) >= umbral => pico unico;
 * si no => par en orden canonico (R<I<A<S<E<C).
 */
function composePeakOrPair(family: RevealFamily, input: RevealInput): Composed {
  const top3 = input.top3 ?? [];
  const order = family.canonicalOrder ?? [];
  const phrases = family.phrases;
  const top1 = top3[0];
  const top2 = top3[1];
  if (!top1 || !top2 || top1 === "?" || top2 === "?") {
    return { text: "", tone: "normal" };
  }

  const gap = (input.scoresByDim[top1] ?? 0) - (input.scoresByDim[top2] ?? 0);
  const threshold = family.thresholds?.peakGap ?? 0;
  if (gap >= threshold) {
    return { text: phrases[`SINGLE_${top1}`] ?? "", tone: "normal" };
  }

  const pair = [top1, top2]
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .join("");
  return { text: phrases[`PAIR_${pair}`] ?? "", tone: "normal" };
}

/**
 * Dominante vs par adyacente (circumplex/TwIVI). §9.3: reconstruye el score
 * centrado de cada HOV desde las medias de valor (MRAT = media de las medias =
 * media de los 20 items, por 2 items/valor). Par si top1 y top2 son adyacentes
 * y su diferencia centrada < umbral; si no => frase del dominante.
 */
/**
 * Reconstruye el score CENTRADO por MRAT de cada HOV desde las medias de valor.
 *
 * MRAT = media de las medias de valor = media de los items (2 items por valor).
 * El centrado es lo que hace comparables las prioridades DENTRO del perfil de la
 * persona (D-E1.3): positivo = pesa mas que su propia media, negativo = menos.
 *
 * EXPORTADA a proposito: la usan el composer (que ordena por dominancia) y la
 * proyeccion del circumplejo del assembler (que ordena por eje bipolar). Tener
 * dos implementaciones de esta misma cuenta fue justamente el origen del bug del
 * ValueCircle — no duplicarla.
 */
export function centeredHovScores(
  family: RevealFamily,
  scoresByDim: Record<string, number>,
): Record<string, number> {
  const hovMap = family.hovMap ?? {};
  const valueMeans = Object.values(hovMap)
    .flat()
    .map((v) => scoresByDim[v] ?? 0);
  const mrat = mean(valueMeans);

  const out: Record<string, number> = {};
  for (const [hov, members] of Object.entries(hovMap)) {
    out[hov] = mean(members.map((v) => scoresByDim[v] ?? 0)) - mrat;
  }
  return out;
}

function composeDominantOrPair(
  family: RevealFamily,
  input: RevealInput,
): Composed {
  const hovToKey = family.hovToKey ?? {};
  const adjacency = family.adjacency ?? [];
  const phrases = family.phrases;

  const centered = Object.entries(centeredHovScores(family, input.scoresByDim))
    .map(([hov, c]) => ({ hov, c }))
    .sort((a, b) => b.c - a.c);

  const top1 = centered[0];
  const top2 = centered[1];
  if (!top1) return { text: "", tone: "normal" };

  const threshold = family.thresholds?.adjacency ?? 0;
  if (top2 && Math.abs(top1.c - top2.c) < threshold) {
    const match = adjacency.find(
      (p) =>
        (p.hovs[0] === top1.hov && p.hovs[1] === top2.hov) ||
        (p.hovs[0] === top2.hov && p.hovs[1] === top1.hov),
    );
    if (match) {
      return { text: phrases[match.key] ?? "", tone: "normal" };
    }
  }
  return {
    text: phrases[`HOV_${hovToKey[top1.hov] ?? top1.hov}`] ?? "",
    tone: "normal",
  };
}

/**
 * Driver + variantes sensibles (bars/PERMA). §9.4: media raw de driverDims <
 * lowOverall => LOW_OVERALL sensible (con {driver_label}); spread (max-min) <
 * balancedSpread => equilibrio; caso general => frase del driver (argmax raw).
 * LOW_OVERALL tiene prioridad (ruta sensible). showContention lo decide el
 * servidor aparte (composeReveal lo pasa por passthrough).
 */
function composeDriver(family: RevealFamily, input: RevealInput): Composed {
  const driverDims = family.driverDims ?? [];
  const labels = family.driverLabels ?? {};
  const phrases = family.phrases;
  const scores = input.scoresByDim;
  if (driverDims.length === 0) return { text: "", tone: "normal" };

  const raws = driverDims.map((d) => scores[d] ?? 0);
  const avg = mean(raws);
  const spread = Math.max(...raws) - Math.min(...raws);

  let driver = driverDims[0] ?? "";
  let best = Number.NEGATIVE_INFINITY;
  for (const d of driverDims) {
    const v = scores[d] ?? 0;
    if (v > best) {
      best = v;
      driver = d;
    }
  }

  const lowOverall = family.thresholds?.lowOverall ?? 0;
  const balancedSpread = family.thresholds?.balancedSpread ?? 0;

  if (avg < lowOverall) {
    return {
      text: (phrases.LOW_OVERALL ?? "").replace(
        "{driver_label}",
        labels[driver] ?? "",
      ),
      tone: "sensitive",
    };
  }
  if (spread < balancedSpread) {
    return { text: phrases.BALANCED ?? "", tone: "normal" };
  }
  return { text: phrases[`DRIVER_${driver}`] ?? "", tone: "normal" };
}

// ---------------------------------------------------------------------------
// Helpers (aritmetica pura)
// ---------------------------------------------------------------------------

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function stddev(xs: number[], m: number): number {
  if (xs.length === 0) return 0;
  const variance = xs.reduce((a, x) => a + (x - m) ** 2, 0) / xs.length;
  return Math.sqrt(variance);
}

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Voltea la banda de una dimension cuya etiqueta es el INVERSO del constructo
 * que puntua (`RevealDimMeta.invertBand`).
 *
 * EXPORTADA a proposito: la usan el composer (para elegir el fragmento de
 * frase) y la proyeccion de barras del assembler (para que el rotulo y la banda
 * que el usuario lee hablen del mismo constructo). Duplicar el flip fue el
 * mismo error de forma que duplicar el MRAT — ver centeredHovScores.
 */
export function flipBand(b: IpsativeBand): IpsativeBand {
  if (b === "ALTO") return "BAJO";
  if (b === "BAJO") return "ALTO";
  return "MEDIO";
}
