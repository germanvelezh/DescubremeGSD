// @vitest-environment jsdom
/**
 * ItemForm scaleVariant tests (Plan 02-07 Task 2, UI-SPEC §6.9).
 *
 * The Phase-1 ItemForm hardcoded a 5-row labeled layout. The Free journey needs
 * three data-driven scale shapes from one component:
 *   - labeled-rows with a prop-driven row count (BFI 5, values 6) — verbatim anchors.
 *   - numeric-endpoints (PERMA 0-10): 11 numeric buttons in a row + per-item
 *     endpoint anchors from the seed + aria-valuetext (fits 360px).
 * Answering auto-advances on tap (no Next button on mobile) — inherited from
 * Phase 1, must not regress.
 *
 * The component must contain NO hardcoded anchor strings (anchors are data) and
 * NO instrument-code literals (FOUND-05).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.9 (scaleVariant table + numeric-endpoints layout).
 *  - 02-CONTEXT.md D-F1.1, D-F1.2; UX-05 (360px touch target).
 *  - 02-07-PLAN.md Task 2 (behavior + acceptance).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

// next/navigation useRouter needs the app-router context, absent in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
}));

import { ItemForm } from "@/app/(b2c)/test/[code]/_components/ItemForm";

const PROJECT_ROOT = join(__dirname, "..", "..", "..");
const ITEMFORM_SRC = join(
  PROJECT_ROOT,
  "app",
  "(b2c)",
  "test",
  "[code]",
  "_components",
  "ItemForm.tsx",
);

const SIX_ANCHORS = [
  { value: 6, label: "Muy parecido a mí" },
  { value: 5, label: "Parecido a mí" },
  { value: 4, label: "Algo parecido a mí" },
  { value: 3, label: "Poco parecido a mí" },
  { value: 2, label: "No muy parecido a mí" },
  { value: 1, label: "Para nada como yo" },
];

const FIVE_ANCHORS = [
  { value: 5, label: "Muy de acuerdo" },
  { value: 4, label: "De acuerdo" },
  { value: 3, label: "Ni de acuerdo ni en desacuerdo" },
  { value: 2, label: "En desacuerdo" },
  { value: 1, label: "Muy en desacuerdo" },
];

const baseProps = {
  item: { id: "item-1", sequenceNumber: 1, stem: "Soy alguien que..." },
  sessionId: "sess-1",
  total: 20,
  ariaLabel: "Indica tu respuesta",
  autosaveChipLabel: "Te guardamos cada respuesta",
  retryChipLabel: "Reintentando...",
  exitLinkLabel: "Salir",
  nextCtaLabel: "Siguiente",
};

beforeEach(() => {
  // jsdom has no fetch; auto-advance calls /api/respond — stub it.
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, status: 200 }) as Response),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ItemForm labeled-rows — prop-driven row count (Task 2)", () => {
  test("renders exactly 6 rows when given 6 anchors", () => {
    render(
      <ItemForm {...baseProps} scaleVariant="labeled-rows" anchors={SIX_ANCHORS} />,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(6);
    expect(screen.getByText("Para nada como yo")).toBeTruthy();
  });

  test("renders exactly 5 rows when given 5 anchors (no hardcoded count)", () => {
    render(
      <ItemForm {...baseProps} scaleVariant="labeled-rows" anchors={FIVE_ANCHORS} />,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  test("auto-advances on answer tap (fires /api/respond)", () => {
    const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
    render(
      <ItemForm {...baseProps} scaleVariant="labeled-rows" anchors={FIVE_ANCHORS} />,
    );
    fireEvent.click(screen.getByText("De acuerdo"));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/respond",
      expect.objectContaining({ method: "POST" }),
    );
  });
});

describe("ItemForm numeric-endpoints — PERMA 0-10 (Task 2)", () => {
  const numericProps = {
    ...baseProps,
    scaleVariant: "numeric-endpoints" as const,
    points: 11,
    anchorMin: "Nunca",
    anchorMax: "Siempre",
    anchors: [],
  };

  test("renders exactly 11 numeric buttons", () => {
    render(<ItemForm {...numericProps} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(11);
  });

  test("shows the per-item endpoint anchors from props (not hardcoded)", () => {
    render(<ItemForm {...numericProps} anchorMin="Terrible" anchorMax="Excelente" />);
    expect(screen.getByText("Terrible")).toBeTruthy();
    expect(screen.getByText("Excelente")).toBeTruthy();
  });

  test("each numeric button has an aria-valuetext referencing the endpoints", () => {
    render(<ItemForm {...numericProps} />);
    const radios = screen.getAllByRole("radio");
    const vt = radios[0].getAttribute("aria-valuetext");
    expect(vt).toBeTruthy();
    expect(vt).toContain("Nunca");
    expect(vt).toContain("Siempre");
  });

  test("auto-advances on numeric tap", () => {
    const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
    render(<ItemForm {...numericProps} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[7]);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/respond",
      expect.objectContaining({ method: "POST" }),
    );
  });
});

describe("ItemForm purity (Task 2 acceptance)", () => {
  test("source contains no hardcoded anchor strings or instrument codes", () => {
    const src = readFileSync(ITEMFORM_SRC, "utf8");
    // Scan only NON-comment lines (same convention as the FOUND-05 lint gate:
    // doc comments legitimately name instruments). No instrument-code literals
    // in executable code — the test/_components dir is not covered by the lint.
    const codeLines = src
      .split("\n")
      .filter((l) => {
        const t = l.trim();
        return !t.startsWith("//") && !t.startsWith("*") && !t.startsWith("/*");
      })
      .join("\n");
    expect(/\b(BFI-?2-?S?|PERMA|PVQ-?(?:21|RR)|TwIVI|ONET)\b/.test(codeLines)).toBe(
      false,
    );
    // No verbatim anchor prose baked into the component (anchors are props).
    expect(codeLines.includes("Muy de acuerdo")).toBe(false);
    expect(codeLines.includes("Para nada como yo")).toBe(false);
  });
});
