/**
 * FichaTecnica — instrument-agnostic expandable fact sheet (FREE-11, D3.10).
 *
 * Generalized in Plan 02-08 from the RIASEC-coupled Phase-1 version: every
 * bullet now renders from metadata props supplied by the assembler
 * (`composeReport().fichaTecnica`), NOT from RIASEC string literals. The same
 * component serves bars/circumplex/hexagon — adding an instrument is a seed,
 * never a .tsx change.
 *
 * `whatItMeasures` / `limits` come from `instrument_version.psychometric_status`
 * (pack §0/§3, seeded per instrument in 02-13); the assembler supplies an
 * instrument-neutral fallback when the seed is absent (no RIASEC/career framing).
 *
 * `baremoSummary` already carries the "en validacion" note when
 * `latamStatus='pending'` (D-E1.1) — the gate QUAL-02 suppresses percentiles
 * upstream, so this sheet only states the band-based reading honestly.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §7.2 (capa 3 ficha tecnica), §8.4 (MC_* scheme).
 *  - 02-CONTEXT.md D-C.3 (occupations O*NET-only), D-E1.1 (bandas), FREE-11.
 *  - 01-CONTEXT.md D3.10 (6-bullet ficha).
 */

import type { LatamStatus } from "@/lib/report/assembler";

interface FichaTecnicaProps {
  name: string;
  version: string;
  itemCount: number;
  alphaSummary: string;
  baremoSummary: string;
  /** "Este test mide X" — from instrument metadata, never a RIASEC literal. */
  whatItMeasures: string;
  /** Non-clinical limits — from instrument metadata. */
  limits: string;
  latamStatus: LatamStatus;
}

export function FichaTecnica({
  name,
  version,
  itemCount,
  alphaSummary,
  baremoSummary,
  whatItMeasures,
  limits,
}: FichaTecnicaProps) {
  return (
    <ul className="flex flex-col gap-2 text-sm text-text-secondary">
      <li>
        <span className="font-semibold text-text-primary">Nombre: </span>
        {name} v{version}
      </li>
      {itemCount > 0 ? (
        <li>
          <span className="font-semibold text-text-primary">Ítems: </span>
          {itemCount}
        </li>
      ) : null}
      <li>
        <span className="font-semibold text-text-primary">
          Calidad psicometrica:{" "}
        </span>
        {alphaSummary}
      </li>
      <li>
        <span className="font-semibold text-text-primary">Baremo: </span>
        {baremoSummary}
      </li>
      <li>
        <span className="font-semibold text-text-primary">Que mide: </span>
        {whatItMeasures}
      </li>
      <li>
        <span className="font-semibold text-text-primary">Limitaciones: </span>
        {limits}
      </li>
    </ul>
  );
}
