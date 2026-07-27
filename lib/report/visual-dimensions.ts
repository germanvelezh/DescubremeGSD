/**
 * visual-dimensions — proyeccion del ReportPayload al contrato VisualProps.
 *
 * Motor GENERICO: cero literales de instrumento/dimension (FOUND-05 — este
 * archivo vive bajo lib/report, ESCANEADO). Todo lo especifico (hov_map, orden
 * de ejes, etiquetas es-CO) se lee de REVEAL_FAMILIES en
 * lib/i18n/microcopy/es-CO/reveal-phrases (EXCLUIDO de FOUND-05).
 *
 * POR QUE EXISTE: el assembler proyectaba `scores_by_dim` 1:1 a
 * `visualDimensions`, lo que rompia el contrato del circumplejo de tres formas
 * (verificado en prod 2026-07-23, corrida A1):
 *   1. CANTIDAD — mandaba los 10 valores Schwartz a un visual de 4 sectores;
 *      ValueCircle hace `SECTOR_ANGLES[i % 4]`, asi que 10 etiquetas se apilaban
 *      en 4 posiciones (AC+PO+TR arriba, BE+SD+UN a la derecha, ...).
 *   2. CENTRADO — mandaba medias crudas (escala 1-6, siempre positivas) a un
 *      visual cuyo centro es el MRAT de la persona y cuyos radios son valores
 *      CENTRADOS que pueden ser negativos. Por eso se veia como estrella: todos
 *      los radios largos y positivos.
 *   3. ETIQUETAS — `label: dim` mostraba codigos psicometricos crudos al usuario
 *      ("NEG", "Lon", "hap"). NEG es justo el codigo que el seed documenta como
 *      NO user-facing (etiqueta correcta: "Sensibilidad emocional", D-D.4).
 *
 * Anchors:
 *  - app/(b2c)/reporte/[sessionId]/_components/ValueCircle.tsx (contrato: 4
 *    sectores cardinales, dos ejes bipolares, radio = valor centrado).
 *  - lib/report/reveal-composer.ts (rawHovScores — reconstruccion compartida).
 *  - lib/scoring/score-session.ts paso 11 (unica fuente de banda; ADR-036).
 *  - 02-UI-SPEC.md §6.0 (VisualProps), §6.2 (contrato circumplex).
 */
import type { IpsativeBand } from "@/lib/scoring/ipsative";
import { logger } from "@/lib/logger";
import type { RevealFamily } from "@/lib/i18n/microcopy/es-CO/reveal-phrases";

import { flipBand, rawHovScores } from "./reveal-composer";

export interface ProjectedDimension {
  code: string;
  label: string;
  value: number;
  band: IpsativeBand;
}

/**
 * Proyecta las dimensiones de un visual 'bars' 1:1, reemplazando el codigo por
 * la etiqueta es-CO de la familia cuando existe.
 *
 * Degrada al codigo crudo si la familia no tiene etiqueta para esa dimension
 * ([GAP-PERMA-DIM-LABELS-ES-CO]: PERMA no tiene etiquetas firmadas para N/H/
 * Lon/hap ni para P/E/R/M/A como rotulo corto — `driverLabels` son fragmentos de
 * frase ("el disfrute cotidiano"), no rotulos de barra).
 *
 * BANDA INVERTIDA: `dimToKey` no es un diccionario de traduccion sino de
 * REENCUADRE — `invertBand` marca las dimensiones cuya etiqueta firmada es el
 * INVERSO del constructo que puntuan. Poner esa etiqueta junto a la banda cruda
 * afirma lo contrario de lo que la persona respondio, y la banda es la senal
 * primaria no-cromatica del visual (BarsWithBands: texto + <desc> a11y + tabla
 * sr-only). Se voltea con el mismo `flipBand` del composer, que ya lo hace para
 * elegir el fragmento de frase (decision German 2026-07-23).
 */
export function projectBarsDimensions(
  family: RevealFamily | null,
  dims: string[],
  scoresByDim: Record<string, number>,
  bandsByDim: Record<string, IpsativeBand>,
): ProjectedDimension[] {
  const dimToKey = family?.dimToKey ?? {};
  return dims.map((dim) => {
    const meta = dimToKey[dim];
    const band = bandsByDim[dim] ?? "MEDIO";
    return {
      code: dim,
      label: meta?.label ?? dim,
      value: scoresByDim[dim] ?? 0,
      band: meta?.invertBand ? flipBand(band) : band,
    };
  });
}

/**
 * Proyecta el circumplejo: reconstruye los 4 HOV desde las medias de valor y los
 * devuelve EN ORDEN DE EJE BIPOLAR.
 *
 * DOS magnitudes con roles separados:
 *  - BANDA (senal primaria no-cromatica): se LEE de `bands_by_dim`, la que el
 *    scoring persistio (ADR-036). No se recalcula aqui. Recalcularla creaba una
 *    SEGUNDA definicion de banda sobre el mismo dato: el scoring bandeaba por
 *    signo y este archivo por z, asi que la tabla sr-only del circulo y el
 *    parrafo de narrativa de la MISMA dimension se contradecian en prod
 *    (smoke #24: "Destacar → Medio" junto a "el logro personal pesa menos").
 *    El recalculo entro justificado por una premisa falsa — que `bands_by_dim`
 *    traia los 10 valores — cuando para 'mrat' el scoring siempre escribio los
 *    4 HOV. Mismo patron que `projectBarsDimensions`, que nunca recalculo.
 *  - `value` (RADIO): proporcion [0,1] de la media HOV CRUDA contra la escala
 *    fija del instrumento (`hovRadiusScale`, ADR-034). Antes era el centrado
 *    (media=0), que colapsaba a muñon toda direccion <= media y dibujaba una
 *    aguja. Ahora las 4 se dibujan con radio real; el orden se conserva (el
 *    centrado es un shift constante, asi que orden crudo = orden centrado =
 *    orden de banda: la barra mas larga siempre lleva la banda mas alta).
 */
export function projectCircumplexDimensions(
  family: RevealFamily,
  scoresByDim: Record<string, number>,
  bandsByDim: Record<string, IpsativeBand>,
): ProjectedDimension[] {
  const raw = rawHovScores(family, scoresByDim);
  const labels = family.hovLabels ?? {};
  const ordered = orderHovsOnBipolarAxes(family, raw);

  // Escala fija (piso teorico -> 0, techo teorico -> 1). Sin normalizacion por
  // perfil: diferencias pequeñas quedan pequeñas. Default 1-6 si la familia no
  // la declara (TwIVI la declara; es la unica familia circumplex).
  const { min, max } = family.hovRadiusScale ?? { min: 1, max: 6 };

  return ordered.map((hov) => ({
    code: hov,
    label: labels[hov] ?? hov,
    value: unitProportion(raw[hov] ?? min, min, max),
    band: bandsByDim[hov] ?? "MEDIO",
  }));
}

/**
 * Proporcion [0,1] de `x` dentro de [min,max] (afin de escala fija). Fuera de
 * rango se capa a [0,1]; min>=max degrada a 0 (guardas defensivas, no un caso
 * real con la escala del instrumento).
 */
function unitProportion(x: number, min: number, max: number): number {
  if (max <= min) return 0;
  return Math.max(0, Math.min(1, (x - min) / (max - min)));
}

/**
 * Ordena los HOV para que el visual los coloque sobre los DOS EJES BIPOLARES.
 *
 * ValueCircle reparte por orden de entrada en los puntos cardinales:
 *   indice 0 -> arriba · 1 -> derecha · 2 -> abajo · 3 -> izquierda
 * Asi que los opuestos teoricos deben caer en 0/2 y en 1/3. Si quedan en
 * indices adyacentes, el dibujo deja de ser un circumplejo: pone lado a lado los
 * polos que se oponen. `family.hovAxisOrder` declara ese orden.
 *
 */
function orderHovsOnBipolarAxes(
  family: RevealFamily,
  hovScores: Record<string, number>,
): string[] {
  const declared = family.hovAxisOrder;
  if (!declared?.length) {
    // Una familia circumplex SIN orden de eje declarado es una violacion de
    // invariante, no un caso a adivinar: inventar un orden dibujaria opuestos
    // como vecinos. La unica familia circumplex (TwIVI) lo declara.
    throw new Error(
      "orderHovsOnBipolarAxes: familia circumplex sin hovAxisOrder",
    );
  }

  // Capar: el visual recibe SIEMPRE los 4 declarados, en su orden de eje. Un HOV
  // que este en el hov_map pero no en el orden de eje se descarta del dibujo
  // (con aviso), no se anexa: anexar re-dispararia el bug `i % 4` con 5+ dims.
  const extra = Object.keys(hovScores).filter((hov) => !declared.includes(hov));
  if (extra.length > 0) {
    logger.warn({ extra }, "circumplex_hov_fuera_de_axis_order");
  }

  return declared;
}
