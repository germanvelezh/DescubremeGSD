// @vitest-environment jsdom
/**
 * Render + a11y + plugin-purity tests for the instrument-agnostic report
 * visuals and progress/quality primitives (Plan 02-05).
 *
 * Enforces, in lieu of the lint gates (which do NOT scan the reporte/test
 * _components dirs):
 *  - The acceptance criterion "NO instrument-code literals" (FOUND-05) for
 *    BarsWithBands / ValueCircle — read the source files and grep.
 *  - Band label is the primary non-color signal (text present).
 *  - role="img" + sr-only table a11y scaffold (HexagonoRiasecFull pattern).
 *  - DoubleLevelProgress binds aria attributes to props (intraTotal never
 *    hardcoded) and ValueCircle handles MRAT-centered (negative) + all-equal.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.0 (VisualProps), §6.1 (BarsWithBands), §6.2 (ValueCircle),
 *    §6.5 (DoubleLevelProgress), §6.8 (QualityFlagNote).
 *  - 02-CONTEXT.md D-C.1, D-C.2, D-E1.3, D-F4.1, D-F2.1.
 *  - 02-05-PLAN.md acceptance criteria.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { report } from "@/lib/i18n/microcopy/es-CO/report";

import { BarsWithBands } from "@/app/(b2c)/reporte/[sessionId]/_components/BarsWithBands";
import { ValueCircle } from "@/app/(b2c)/reporte/[sessionId]/_components/ValueCircle";
import {
  VISUAL_REGISTRY,
  type VisualType,
} from "@/app/(b2c)/reporte/[sessionId]/_components/visual-registry";
import { HexagonoRiasecFull } from "@/app/(b2c)/reporte/[sessionId]/_components/HexagonoRiasecFull";
import { QualityFlagNote } from "@/app/(b2c)/reporte/[sessionId]/_components/QualityFlagNote";
import { DoubleLevelProgress } from "@/app/(b2c)/test/[code]/_components/DoubleLevelProgress";

const PROJECT_ROOT = join(__dirname, "..", "..", "..");
const COMPONENT_DIR = join(
  PROJECT_ROOT,
  "app",
  "(b2c)",
  "reporte",
  "[sessionId]",
  "_components",
);

// Instrument-code / hardcoded-dimension literals that must NOT appear in the
// instrument-agnostic visuals (FOUND-05, acceptance criterion).
const INSTRUMENT_LITERAL = /\b(BFI-?2-?S?|PERMA|PVQ-?(?:21|RR)|ONET|O\*NET|TwIVI)\b/;

describe("visual-registry (Plan 02-05 Task 1)", () => {
  test("VISUAL_REGISTRY is keyed by the enum, not by instrument code", () => {
    const keys = Object.keys(VISUAL_REGISTRY).sort();
    expect(keys).toEqual(["bars", "circumplex", "hexagon"]);
  });

  test("registry resolves each enum to its component", () => {
    expect(VISUAL_REGISTRY.hexagon).toBe(HexagonoRiasecFull);
    expect(VISUAL_REGISTRY.bars).toBe(BarsWithBands);
    expect(VISUAL_REGISTRY.circumplex).toBe(ValueCircle);
  });

  test("VisualType union has exactly the three enum values (compile-time pin)", () => {
    const all: VisualType[] = ["hexagon", "bars", "circumplex"];
    expect(all).toHaveLength(3);
  });

  test("BarsWithBands + ValueCircle source contain NO instrument-code literals", () => {
    for (const file of ["BarsWithBands.tsx", "ValueCircle.tsx"]) {
      const src = readFileSync(join(COMPONENT_DIR, file), "utf8");
      // Strip comment lines so anchors/JSDoc referencing instruments don't trip.
      const code = src
        .split("\n")
        .filter((l) => {
          const t = l.trim();
          return !t.startsWith("*") && !t.startsWith("//") && !t.startsWith("/*");
        })
        .join("\n");
      expect(code).not.toMatch(INSTRUMENT_LITERAL);
    }
  });
});

describe("BarsWithBands (Plan 02-05 Task 1)", () => {
  test("renders dimension label, band label, role=img and sr-only table", () => {
    render(
      <BarsWithBands
        dimensions={[
          {
            code: "X",
            label: "Sensibilidad emocional",
            value: 3,
            band: "MEDIO",
            max: 5,
          },
        ]}
        reducedMotion={false}
      />,
    );

    // Label appears in the visible bar AND the sr-only table (a11y scaffold).
    expect(screen.getAllByText("Sensibilidad emocional").length).toBeGreaterThanOrEqual(2);
    // Band label is the primary non-color signal.
    expect(screen.getAllByText("Medio").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("img")).toBeInTheDocument();

    const table = document.querySelector("table.sr-only");
    expect(table).not.toBeNull();
    expect(within(table as HTMLElement).getByText("Sensibilidad emocional")).toBeInTheDocument();
  });

  test("renders the baremo note", () => {
    render(
      <BarsWithBands
        dimensions={[{ code: "X", label: "Dim", value: 1, band: "BAJO", max: 5 }]}
        reducedMotion
      />,
    );
    expect(screen.getByText(report.MC_REPORT_BAREMO_NOTE)).toBeInTheDocument();
  });
});

describe("ValueCircle (Plan 02-05 Task 1)", () => {
  test("title is the within-person framing and renders role=img + sr-only table", () => {
    render(
      <ValueCircle
        dimensions={[
          { code: "ST", label: "Autotrascendencia", value: 1.5, band: "ALTO" },
          { code: "SE", label: "Autopromoción", value: -1.2, band: "BAJO" },
          { code: "OC", label: "Apertura al cambio", value: 0.4, band: "MEDIO" },
          { code: "CO", label: "Conservación", value: -0.7, band: "BAJO" },
        ]}
        reducedMotion={false}
      />,
    );

    // Title appears as the visible heading AND the SVG <title> (a11y).
    expect(
      screen.getAllByText(report.MC_VALUECIRCLE_TITLE).length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(document.querySelector("table.sr-only")).not.toBeNull();
    expect(screen.getByText(report.MC_VALUECIRCLE_RELATIVE_NOTE)).toBeInTheDocument();
  });

  test("negative (MRAT-centered) sector renders without a destructive/red treatment", () => {
    const { container } = render(
      <ValueCircle
        dimensions={[
          { code: "ST", label: "Autotrascendencia", value: 2, band: "ALTO" },
          { code: "SE", label: "Autopromoción", value: -2, band: "BAJO" },
          { code: "OC", label: "Apertura al cambio", value: 1, band: "MEDIO" },
          { code: "CO", label: "Conservación", value: -1, band: "BAJO" },
        ]}
        reducedMotion
      />,
    );
    // No element uses the destructive token (no red/negative-as-bad).
    expect(container.querySelector('[class*="destructive"]')).toBeNull();
    expect(container.querySelector('[class*="fill-destructive"]')).toBeNull();
  });

  test("all-equal input (4 dims value=0) draws 4 equal sectors with no winner", () => {
    const { container } = render(
      <ValueCircle
        dimensions={[
          { code: "ST", label: "Autotrascendencia", value: 0, band: "MEDIO" },
          { code: "SE", label: "Autopromoción", value: 0, band: "MEDIO" },
          { code: "OC", label: "Apertura al cambio", value: 0, band: "MEDIO" },
          { code: "CO", label: "Conservación", value: 0, band: "MEDIO" },
        ]}
        reducedMotion
      />,
    );
    // 4 sectors rendered (one path/polygon per HOV).
    const sectors = container.querySelectorAll("[data-sector]");
    expect(sectors).toHaveLength(4);
    // No sector is flagged as the winner when all values are equal.
    expect(container.querySelector('[data-sector][data-winner="true"]')).toBeNull();
  });
});

describe("DoubleLevelProgress (Plan 02-05 Task 2)", () => {
  test("renders global line + intra progressbar bound to props (intraTotal=30)", () => {
    render(
      <DoubleLevelProgress
        globalCurrent={2}
        globalTotal={4}
        intraCurrent={12}
        intraTotal={30}
        instrumentLabel="Personalidad"
      />,
    );

    expect(screen.getByText("Test 2 de 4 · Personalidad")).toBeInTheDocument();
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "12");
    expect(bar).toHaveAttribute("aria-valuemax", "30");
    expect(screen.getByText("Paso 12 de 30")).toBeInTheDocument();
  });

  test("intraTotal is never assumed — passing 20 renders 'de 20'", () => {
    render(
      <DoubleLevelProgress
        globalCurrent={1}
        globalTotal={4}
        intraCurrent={5}
        intraTotal={20}
        instrumentLabel="Valores"
      />,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemax", "20");
    expect(screen.getByText("Paso 5 de 20")).toBeInTheDocument();
  });
});

describe("QualityFlagNote (Plan 02-05 Task 2)", () => {
  test("renders the soft note copy, no destructive styling", () => {
    const { container } = render(<QualityFlagNote />);
    expect(screen.getByText(report.MC_QUALITY_FLAG_NOTE)).toBeInTheDocument();
    expect(container.querySelector('[class*="destructive"]')).toBeNull();
  });
});
