// @vitest-environment jsdom
/**
 * PermaCareScreen — NFR-28 care interstitial for the guided Free flow
 * ([GAP-PERMA-CONTENTION-GUIDED-FLOW], ADR-033).
 *
 * The pure gate (shouldSurfaceContention) is unit-tested in
 * lib/free/contention-gate.test.ts; this render test locks the SURFACE — the part
 * whose failure means a low-wellbeing user reaches the screen but sees no route.
 * Same treatment the sibling NFR-28 surface gets in
 * transition-screen-mini-result.test.tsx: assert the banner + tel: lines render
 * and the continue CTA points where it should.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { PermaCareScreen } from "@/app/(b2c)/test/[code]/_components/PermaCareScreen";
import type { ContentionLine } from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import { nfr28 } from "@/lib/i18n/microcopy/es-CO/nfr28";

// next/link → passthrough anchor so the continue CTA renders as a real <a> with
// its href, making the destination assertion deterministic under jsdom.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("PermaCareScreen — guided-flow NFR-28 care surface", () => {
  const lines: ContentionLine[] = [
    { name: "Línea 106", phone: "106", description: "Apoyo emocional, Bogotá" },
  ];

  test("renders screen copy + the prominent contention banner + tel: lines, and the CTA points to the close", () => {
    render(
      <PermaCareScreen
        lines={lines}
        continueHref="/reporte/onet-session-123?cierre=free"
      />,
    );

    // Screen framing (Cowork copy) — title orients, body offers.
    expect(screen.getByText(nfr28.MC_PERMA_CARE_SCREEN_HEADING)).toBeDefined();
    expect(screen.getByText(nfr28.MC_PERMA_CARE_SCREEN_BODY)).toBeDefined();

    // Prominent banner is mounted (the screen only renders when the server
    // decided showContention, so ContentionBanner always shows here).
    const banner = screen.getByRole("complementary");
    expect(banner).toBeDefined();
    expect(screen.getByText(nfr28.MC_NFR28_BANNER_HEADING)).toBeDefined();

    // CO line renders as a tel: anchor from PASSED data (never hardcoded).
    const telLink = screen.getByRole("link", { name: /106/ });
    expect(telLink.getAttribute("href")).toBe("tel:106");

    // The care screen must never redirect to a dead end: the CTA continues to
    // the normal Free close.
    const cta = screen.getByRole("link", {
      name: nfr28.MC_PERMA_CARE_SCREEN_CTA,
    });
    expect(cta.getAttribute("href")).toBe(
      "/reporte/onet-session-123?cierre=free",
    );
  });

  test("routes the CTA to the teaser fallback when there is no O*NET close session", () => {
    render(<PermaCareScreen lines={lines} continueHref="/perfil-integrado" />);

    const cta = screen.getByRole("link", {
      name: nfr28.MC_PERMA_CARE_SCREEN_CTA,
    });
    expect(cta.getAttribute("href")).toBe("/perfil-integrado");
  });

  test("care surface carries no entrance animation (calm, never a delight beat on a low-wellbeing signal)", () => {
    render(<PermaCareScreen lines={lines} continueHref="/perfil-integrado" />);

    // Walk from the banner up to the root: no node may carry an entrance
    // animation (mirrors the sibling NFR-28 never-animated guard).
    let node: HTMLElement | null = screen.getByRole("complementary");
    while (node) {
      expect(node.className.includes("animate-")).toBe(false);
      node = node.parentElement;
    }
  });
});
