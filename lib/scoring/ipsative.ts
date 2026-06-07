/**
 * Ipsative band computation — DD-57 v3.0 Opcion C (Plan 01-08, Wave 5).
 *
 * Para cada dimension del perfil del usuario:
 *   z = (raw_dim - M_intra) / SD_intra
 *
 * donde M_intra y SD_intra son la media y desviacion estandar **intra-perfil**
 * (calculadas sobre los scores del propio usuario, NO contra una norma
 * poblacional). Bandas:
 *   - z >= +1.0  → ALTO
 *   - -1.0 < z < +1.0 → MEDIO
 *   - z <= -1.0 → BAJO
 *
 * Reemplaza percentil contra baremo cuando:
 *   (a) Baremo CO/MX no existe (QUAL-06 fallback degenerado).
 *   (b) alpha < 0.70 para la poblacion (QUAL-02 gate).
 *   (c) Phase 1 Free MVP (Addendum §F "Opcion C como interpretacion principal").
 *
 * Caso degenerado: SD = 0 (perfil totalmente plano) → todas las dimensiones
 * vuelven 'MEDIO' (no hay informacion de diferenciacion).
 *
 * Anchors:
 *   - implementation_packs/O-NET-IP-SF_v1.0_Consolidado_ADDENDUM_Tabla14.md §F (Opcion C).
 *   - 01-RESEARCH.md linea 996.
 *   - 01-CONTEXT.md D3.8 (display rules).
 */

export type IpsativeBand = "BAJO" | "MEDIO" | "ALTO";

/**
 * Compute intra-profile z-score bands for each dimension.
 *
 * @param scoresByDim  Record of dimension code -> raw score (e.g.
 *                     { R: 32, I: 28, A: 24, S: 18, E: 14, C: 10 }).
 * @returns Record of dimension code -> band ('BAJO' | 'MEDIO' | 'ALTO').
 */
export function computeIpsativeBands<K extends string>(
  scoresByDim: Record<K, number>,
): Record<K, IpsativeBand> {
  const dims = Object.keys(scoresByDim) as K[];
  if (dims.length === 0) {
    return {} as Record<K, IpsativeBand>;
  }

  const values = dims.map((d) => scoresByDim[d]);
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;

  // Population variance (intra-profile, NOT sample): divisor = N, not N-1.
  // The user's 6 RIASEC scores are the WHOLE population of their profile,
  // not a sample of it (Addendum §F formula).
  const variance =
    values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length;
  const sd = Math.sqrt(variance);

  const out = {} as Record<K, IpsativeBand>;
  for (const dim of dims) {
    if (sd === 0) {
      out[dim] = "MEDIO";
      continue;
    }
    const z = (scoresByDim[dim] - mean) / sd;
    if (z >= 1.0) {
      out[dim] = "ALTO";
    } else if (z <= -1.0) {
      out[dim] = "BAJO";
    } else {
      out[dim] = "MEDIO";
    }
  }
  return out;
}
