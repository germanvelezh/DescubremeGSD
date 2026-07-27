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
        dimensions={[{ code: "X", label: "Dim", value: 1, band: "BAJO" }]}
        reducedMotion
      />,
    );
    expect(screen.getByText(report.MC_BARS_BAREMO_NOTE)).toBeInTheDocument();
  });

  // La nota larga del reporte de intereses abre con "ALTO significa que ese
  // interes...", cierto ahi y falso bajo un visual de rasgos o de bienestar:
  // le decia al usuario que su nivel de Soledad era un "interes". Este visual
  // es agnostico, asi que la palabra no puede aparecer en el.
  test("la nota del visual generico NO llama 'interes' a la dimension", () => {
    const { container } = render(
      <BarsWithBands
        dimensions={[{ code: "X", label: "Dim", value: 1, band: "BAJO" }]}
        reducedMotion
      />,
    );
    expect(container.textContent).not.toMatch(/inter[eé]s/i);
    expect(screen.queryByText(report.MC_REPORT_BAREMO_NOTE)).toBeNull();
  });

  test("[ADR-034] bar width follows the BAND, not the raw value", () => {
    // BAJO carries a large value, ALTO a small one: if width tracked `value` the
    // BAJO bar would be longer. It must be shorter — width follows the band.
    const { container } = render(
      <BarsWithBands
        dimensions={[
          { code: "LO", label: "Baja", value: 30, band: "BAJO" },
          { code: "MI", label: "Media", value: 20, band: "MEDIO" },
          { code: "HI", label: "Alta", value: 6, band: "ALTO" },
        ]}
        reducedMotion
      />,
    );
    const widthPct = (el: Element) =>
      Number.parseFloat((el as HTMLElement).style.width);
    const fills = Array.from(container.querySelectorAll('[class*="bg-accent"]'));
    expect(fills).toHaveLength(3);
    const [lo, mid, hi] = fills.map(widthPct);
    // Three discrete, monotone widths — Bajo < Medio < Alto.
    expect(lo).toBeLessThan(mid);
    expect(mid).toBeLessThan(hi);
    // And none maxes to 100% (the old clamp bug: every bar hit 100%).
    expect(hi).toBeLessThan(100);
  });

  test("[ADR-034] renders the shared length note", () => {
    render(
      <BarsWithBands
        dimensions={[{ code: "X", label: "Dim", value: 1, band: "MEDIO" }]}
        reducedMotion
      />,
    );
    expect(screen.getByText(report.MC_BARS_LENGTH_NOTE)).toBeInTheDocument();
  });

  test("[ADR-034] renders the per-instrument intro when provided, omits it otherwise", () => {
    const intro = "Contexto de este instrumento.";
    const withIntro = render(
      <BarsWithBands
        dimensions={[{ code: "X", label: "Dim", value: 1, band: "MEDIO" }]}
        reducedMotion
        intro={intro}
      />,
    );
    expect(screen.getByText(intro)).toBeInTheDocument();
    withIntro.unmount();

    render(
      <BarsWithBands
        dimensions={[{ code: "X", label: "Dim", value: 1, band: "MEDIO" }]}
        reducedMotion
      />,
    );
    expect(screen.queryByText(intro)).toBeNull();
  });
});

describe("visual entrance — animateIn (motion-2)", () => {
  const DIMS = [
    { code: "X", label: "Dim A", value: 3, band: "MEDIO" as const },
    { code: "Y", label: "Dim B", value: 4, band: "ALTO" as const },
  ];

  test("BarsWithBands default (no animateIn) keeps the static fill — no entrance class", () => {
    const { container } = render(
      <BarsWithBands dimensions={DIMS} reducedMotion={false} />,
    );
    expect(container.querySelector('[class*="animate-bar-fill"]')).toBeNull();
  });

  test("BarsWithBands with animateIn staggers the fills 80ms per row", () => {
    const { container } = render(
      <BarsWithBands dimensions={DIMS} reducedMotion={false} animateIn />,
    );
    const fills = container.querySelectorAll('[class*="animate-bar-fill"]');
    expect(fills).toHaveLength(2);
    expect((fills[0] as HTMLElement).style.animationDelay).toBe("0ms");
    expect((fills[1] as HTMLElement).style.animationDelay).toBe("80ms");
  });

  test("BarsWithBands with animateIn BUT reducedMotion emits no entrance class", () => {
    const { container } = render(
      <BarsWithBands dimensions={DIMS} reducedMotion animateIn />,
    );
    expect(container.querySelector('[class*="animate-bar-fill"]')).toBeNull();
  });

  test("HexagonoRiasecFull static render has no dm-draw; animateIn draws the stroke", () => {
    const scores = { R: 30, I: 24, A: 18, S: 12, E: 20, C: 16 };
    const staticRender = render(
      <HexagonoRiasecFull scores={scores} top3={["R", "I", "E"]} />,
    );
    expect(staticRender.container.querySelector(".dm-draw")).toBeNull();
    staticRender.unmount();

    const animated = render(
      <HexagonoRiasecFull scores={scores} top3={["R", "I", "E"]} animateIn />,
    );
    expect(animated.container.querySelector(".dm-draw")).not.toBeNull();
  });
});

describe("ValueCircle (Plan 02-05 Task 1, ADR-034)", () => {
  // Tip radius of a sector polygon = distance from center (100,100) to its 3rd
  // point (points = "center baseLeft TIP baseRight"). More honest than string-
  // matching the `points` attribute.
  function tipRadius(polygon: Element): number {
    const pts = (polygon.getAttribute("points") ?? "").trim().split(/\s+/);
    const tip = pts[2] ?? "0,0";
    const [x, y] = tip.split(",").map(Number);
    return Math.hypot((x ?? 0) - 100, (y ?? 0) - 100);
  }
  function sectorRadii(container: HTMLElement): Record<string, number> {
    const out: Record<string, number> = {};
    for (const p of container.querySelectorAll("polygon[data-sector]")) {
      out[p.getAttribute("data-sector") ?? ""] = tipRadius(p);
    }
    return out;
  }
  // value is a within-scale [0,1] proportion (ADR-034), NOT the MRAT-centered
  // score. A clear dominant (OCH) with the other three lower.
  const DOMINANT = [
    { code: "OCH", label: "Explorar", value: 1.0, band: "ALTO" as const },
    { code: "STR", label: "Aportar", value: 0.4, band: "MEDIO" as const },
    { code: "CSV", label: "Conservar", value: 0.2, band: "MEDIO" as const },
    { code: "SEN", label: "Destacar", value: 0.0, band: "BAJO" as const },
  ];

  test("title is the within-person framing and renders role=img + sr-only table + notes", () => {
    render(<ValueCircle dimensions={DOMINANT} reducedMotion={false} />);

    // Title appears as the visible heading AND the SVG <title> (a11y).
    expect(
      screen.getAllByText(report.MC_VALUECIRCLE_TITLE).length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(document.querySelector("table.sr-only")).not.toBeNull();
    expect(screen.getByText(report.MC_VALUECIRCLE_RELATIVE_NOTE)).toBeInTheDocument();
    // Anti-absence note (ADR-034): a shorter sector weighs less, is not missing.
    expect(
      screen.getByText(report.MC_VALUECIRCLE_NO_ABSENCE_NOTE),
    ).toBeInTheDocument();
  });

  test("every sector renders with a calm accent fill, never a destructive/red treatment", () => {
    const { container } = render(
      <ValueCircle dimensions={DOMINANT} reducedMotion />,
    );
    expect(container.querySelector('[class*="destructive"]')).toBeNull();
    expect(container.querySelector('[class*="fill-destructive"]')).toBeNull();
    // All four sectors use the accent fill (no per-sign color branch).
    const accent = container.querySelectorAll('polygon[class*="fill-accent"]');
    expect(accent).toHaveLength(4);
  });

  test("[§2.1 never-zero] all four directions draw a real radius above the floor", () => {
    const { container } = render(
      <ValueCircle dimensions={DOMINANT} reducedMotion />,
    );
    const radii = Object.values(sectorRadii(container));
    expect(radii).toHaveLength(4);
    // Floor is MIN_TIP_RADIUS=24; the lowest (value=0) sits exactly on it.
    for (const r of radii) expect(r).toBeGreaterThanOrEqual(24);
  });

  test("[§2.2 dominant] a clear dominant draws 4 puntas with the winner the longest", () => {
    const { container } = render(
      <ValueCircle dimensions={DOMINANT} reducedMotion />,
    );
    const r = sectorRadii(container);
    // Order preserved from value; OCH (the dominant) is the longest punta.
    expect(r.OCH).toBeGreaterThan(r.STR);
    expect(r.STR).toBeGreaterThan(r.CSV);
    expect(r.CSV).toBeGreaterThan(r.SEN);
    // The winner is flagged.
    expect(
      container.querySelector('[data-sector="OCH"][data-winner="true"]'),
    ).not.toBeNull();
  });

  test("[§2.3 casi-parejo] near-equal input is NOT spiky (radii within a small band)", () => {
    const { container } = render(
      <ValueCircle
        dimensions={[
          { code: "OCH", label: "Explorar", value: 0.6, band: "MEDIO" },
          { code: "STR", label: "Aportar", value: 0.62, band: "MEDIO" },
          { code: "CSV", label: "Conservar", value: 0.58, band: "MEDIO" },
          { code: "SEN", label: "Destacar", value: 0.6, band: "MEDIO" },
        ]}
        reducedMotion
      />,
    );
    const radii = Object.values(sectorRadii(container));
    const spread = Math.max(...radii) - Math.min(...radii);
    // A 0.04 proportion spread maps to ~1.8px over a 46px range — tiny, not an
    // aguja. (A min-max-per-profile mapping would blow this up to the full range.)
    expect(spread).toBeLessThan(5);
  });

  test("[§2.5 QUAL-05] all-equal input draws 4 equal sectors with no winner", () => {
    const { container } = render(
      <ValueCircle
        dimensions={[
          { code: "OCH", label: "Explorar", value: 0.5, band: "MEDIO" },
          { code: "STR", label: "Aportar", value: 0.5, band: "MEDIO" },
          { code: "CSV", label: "Conservar", value: 0.5, band: "MEDIO" },
          { code: "SEN", label: "Destacar", value: 0.5, band: "MEDIO" },
        ]}
        reducedMotion
      />,
    );
    const sectors = container.querySelectorAll("[data-sector]");
    expect(sectors).toHaveLength(4);
    // No winner when all values are equal.
    expect(container.querySelector('[data-sector][data-winner="true"]')).toBeNull();
    // And the four radii are identical.
    const radii = Object.values(sectorRadii(container));
    expect(Math.max(...radii) - Math.min(...radii)).toBeCloseTo(0, 6);
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
    expect(screen.getByText("Vas en 12 de 30")).toBeInTheDocument();
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
    expect(screen.getByText("Vas en 5 de 20")).toBeInTheDocument();
  });
});

describe("QualityFlagNote (Plan 02-05 Task 2)", () => {
  test("renders the soft note copy, no destructive styling", () => {
    const { container } = render(<QualityFlagNote />);
    expect(screen.getByText(report.MC_QUALITY_FLAG_NOTE)).toBeInTheDocument();
    expect(container.querySelector('[class*="destructive"]')).toBeNull();
  });
});
