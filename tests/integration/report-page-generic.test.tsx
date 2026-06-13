// @vitest-environment jsdom
/**
 * Integration test — generic layered report page (Plan 02-08 Task 2).
 *
 * Renders the async Server Component `ReporteSessionPage` with `composeReport`
 * (and the auth/email/contention deps) mocked, so the test asserts the COMPOSED
 * DOM for the three acceptance scenarios:
 *
 *  1. bars + contentionRoute=true, distressDetector=false (VALUES shape):
 *     renders the NFR-28 footer link, NO prominent banner heading, NO NFR-27
 *     pre-test modal. (CONTEXT D-A.2 — the values report keeps the footer link
 *     with no modal.)
 *  2. bars + distressDetector=true: the page mounts the ContentionBanner in the
 *     under-header distress slot (the prominent surface). The threshold decision
 *     (`showContention`) is the SERVER's — false at render today (no per-score
 *     threshold persisted) — so the prominent heading stays dormant; the calm
 *     footer link is always present. The banner's showContention=true branch is
 *     covered by sensitive-ui.test.tsx (threat model: UI renders server decision).
 *  3. quality-flagged report renders the soft QualityFlagNote AND still renders
 *     the report (non-blocking, D-F2.1).
 *  4. Regression — hexagon report renders + occupations block (O*NET path green).
 *
 * Visual resolution is by `VISUAL_REGISTRY[visualType]` (enum) — never an
 * instrument-code branch. No instrument codes appear in this test (FOUND-05).
 *
 * Anchors:
 *  - 02-UI-SPEC.md §7.2 (layered report), §6.4 (banner), §6.8 (quality note).
 *  - 02-CONTEXT.md D-A.2 (values footer link, no modal), D-D.2, D-F2.1, D-C.3.
 *  - 02-08-PLAN.md Task 2 <acceptance_criteria>.
 */
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { composeReport } from "@/lib/report/assembler";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(async () => ({
    auth: {
      getUser: vi.fn(async () => ({
        data: { user: { id: "user-1", email: "tester@descubreme.co" } },
      })),
    },
  })),
}));

vi.mock("@/lib/supabase/service-role", () => ({
  getSupabaseAdminClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(async () => ({
            data: {
              id: "session-1",
              user_id: "user-1",
              country_code: "CO",
              email: "tester@descubreme.co",
            },
          })),
        })),
      })),
    })),
  })),
}));

vi.mock("@/lib/email/transactional", () => ({
  sendReportReadyEmail: vi.fn(async () => {}),
}));

vi.mock("@/lib/ethics/contention", () => ({
  getContentionResources: vi.fn(async () => [
    {
      id: "co-1",
      country_code: "CO",
      type: "hotline",
      name: "Línea 106",
      phone: "106",
      url: null,
      description_es_co: "Apoyo emocional, Bogotá",
      hours: "24/7",
      last_verified_at: new Date().toISOString(),
    },
  ]),
}));

vi.mock("@/lib/report/assembler", () => ({
  composeReport: vi.fn(),
}));

import ReporteSessionPage from "@/app/(b2c)/reporte/[sessionId]/page";

const mockedComposeReport = vi.mocked(composeReport);

type ReportShape = Awaited<ReturnType<typeof composeReport>>;

function baseReport(overrides: Partial<ReportShape> = {}): ReportShape {
  return {
    visualType: "bars",
    visualDimensions: [
      { code: "ST", label: "ST", value: 0.4, band: "ALTO" },
      { code: "CO", label: "CO", value: -0.2, band: "BAJO" },
    ],
    layer1: {
      scoresByDim: { ST: 0.4, CO: -0.2 },
      top3: ["ST", "CO", "ST"],
      narrativeTopPhrase: "",
    },
    layer2: {
      scoresWithBands: {
        ST: { rawScore: 0.4, band: "ALTO", showPercentile: false, baremoPopulation: null },
        CO: { rawScore: -0.2, band: "BAJO", showPercentile: false, baremoPopulation: null },
      },
      narrativeExtended: "Esto puede sugerir que priorizás ciertos valores.",
    },
    layer3: { occupations: [] },
    fichaTecnica: {
      name: "Instrumento de valores",
      version: "1.0",
      itemCount: 20,
      likertMin: 1,
      likertMax: 6,
      alphaSummary: "Confiabilidad LATAM: en validacion (alpha promedio 0.75)",
      baremoSummary: "Baremo en validacion",
      whatItMeasures: "Que mide: tus prioridades de valores.",
      limits: "NO es una evaluacion clinica. NO predice resultados individuales.",
      latamStatus: "pending",
    },
    footer: { nfr27Chip: true, requiresContentionRoute: true },
    distressDetector: false,
    qualityFlag: false,
    psychometricStatus: {
      alpha_by_dimension: {},
      avg_alpha: 0.75,
      source: null,
      latam_status: "pending",
      what_it_measures: null,
      limits: null,
    },
    ...overrides,
  } as ReportShape;
}

async function renderPage() {
  const ui = await ReporteSessionPage({
    params: Promise.resolve({ sessionId: "session-1" }),
  });
  return render(ui);
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("generic report page (02-08)", () => {
  test("values shape (contentionRoute=true, distressDetector=false): footer link, NO banner, NO modal", async () => {
    mockedComposeReport.mockResolvedValue(baseReport());
    await renderPage();

    // The report renders.
    expect(screen.getByRole("main")).toBeInTheDocument();
    // NFR-28 footer link present (CONTEXT D-A.2 — values keeps the link).
    expect(
      screen.getByRole("button", { name: /si querés hablar con alguien/i }),
    ).toBeInTheDocument();
    // NO prominent banner heading (showContention=false / distress dormant).
    expect(screen.queryByText(/no estás solo/i)).not.toBeInTheDocument();
    // NO NFR-27 pre-test modal on the report.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("sensitive report: contention surface lives in the FOOTER landmark (D-D.2)", async () => {
    // distressDetector=true (BFI/PERMA shape) must NOT change placement — the
    // discreet footer link is permanent in the footer for any sensitive report.
    mockedComposeReport.mockResolvedValue(
      baseReport({ distressDetector: true }),
    );
    const { container } = await renderPage();

    // The contention landmark is the footer section (#contention-resources),
    // not an under-header slot. The discreet footer link lives inside it.
    const landmark = container.querySelector("#contention-resources");
    expect(landmark).not.toBeNull();
    const linkButton = screen.getByRole("button", {
      name: /si querés hablar con alguien/i,
    });
    expect(landmark?.contains(linkButton)).toBe(true);
    // The prominent banner heading stays dormant (server showContention=false).
    expect(screen.queryByText(/no estás solo/i)).not.toBeInTheDocument();
  });

  test("quality-flagged report renders QualityFlagNote AND still renders the report", async () => {
    mockedComposeReport.mockResolvedValue(baseReport({ qualityFlag: true }));
    await renderPage();

    expect(screen.getByRole("main")).toBeInTheDocument();
    // Soft, non-blocking note (D-F2.1).
    expect(screen.getByText(/patrón muy parejo/i)).toBeInTheDocument();
    // Report content still present (the extended narrative renders).
    expect(screen.getByText(/priorizás ciertos valores/i)).toBeInTheDocument();
  });

  test("regression: hexagon report renders the occupations slot (O*NET path green)", async () => {
    mockedComposeReport.mockResolvedValue(
      baseReport({
        visualType: "hexagon",
        visualDimensions: [],
        footer: { nfr27Chip: true, requiresContentionRoute: false },
        layer1: {
          scoresByDim: { R: 10, I: 8, A: 6, S: 4, E: 2, C: 1 },
          top3: ["R", "I", "A"],
          narrativeTopPhrase: "Tu perfil combina lo realista con lo investigativo.",
        },
        layer3: { occupations: [] },
      }),
    );
    await renderPage();

    expect(screen.getByRole("main")).toBeInTheDocument();
    // Hexagon reveal phrase renders (hexagon-only Layer 1 phrase).
    expect(
      screen.getByText(/combina lo realista con lo investigativo/i),
    ).toBeInTheDocument();
    // Occupations heading is present on the hexagon path (D-C.3).
    expect(
      screen.getByText(/gente con tu perfil suele encontrar engagement/i),
    ).toBeInTheDocument();
    // No contention surface (O*NET is not a sensitive instrument).
    expect(
      screen.queryByRole("button", { name: /si querés hablar con alguien/i }),
    ).not.toBeInTheDocument();
  });
});
