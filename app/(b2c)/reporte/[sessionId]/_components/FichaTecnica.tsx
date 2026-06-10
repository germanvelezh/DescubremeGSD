/**
 * FichaTecnica — 6-bullet expandable instrument fact sheet (D3.10 verbatim).
 *
 * Rendered inside <Disclosure trigger="MC_REPORT_FICHA_TRIGGER">. Receives
 * the assembler's `fichaTecnica` shape and renders each bullet.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6 ficha tecnica.
 *  - 01-CONTEXT.md D3.10.
 */

import { report as MC } from "@/lib/i18n/microcopy/es-CO/report";

interface FichaTecnicaProps {
  name: string;
  version: string;
  itemCount: number;
  alphaSummary: string;
  baremoSummary: string;
}

export function FichaTecnica({
  name,
  version,
  itemCount,
  alphaSummary,
  baremoSummary,
}: FichaTecnicaProps) {
  return (
    <ul className="flex flex-col gap-2 text-sm text-text-secondary">
      <li>
        <span className="font-semibold text-text-primary">Nombre: </span>
        {name} v{version}
      </li>
      <li>
        <span className="font-semibold text-text-primary">Tiempo: </span>
        {itemCount > 0
          ? `${itemCount} items, alrededor de 10-12 minutos`
          : MC.MC_REPORT_FICHA_TIME}
      </li>
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
        {MC.MC_REPORT_FICHA_WHAT}
      </li>
      <li>
        <span className="font-semibold text-text-primary">Limitaciones: </span>
        {MC.MC_REPORT_FICHA_LIMITS}
      </li>
    </ul>
  );
}
