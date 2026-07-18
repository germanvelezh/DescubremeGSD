// @vitest-environment jsdom
/**
 * TransitionScreen — mini-result interstitial (Plan 02.1-04 + fix B).
 *
 * Decision B (owner 2026-07-01): the mini-result NO LONGER links to the full
 * persistent report mid-funnel. That link ("Ver reporte completo") stranded the
 * user on a terminal report with no way back to the funnel AND leaked Paid-depth
 * (hexagon + bands + ficha) that the Free close recut is designed to hide,
 * pre-empting the close reveal. The full report stays reachable at the close
 * (recut) and in "Mis datos". The transition keeps its job: glance + continue.
 *
 * This test locks that contract: given a fresh result, the screen renders the
 * reveal phrase + next-test hook + CTA, and renders NO report link.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { TransitionScreen } from "@/app/(b2c)/test/[code]/_components/TransitionScreen";
import type { ContentionLine } from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import { REVEAL_BAND_LEGEND } from "@/lib/i18n/microcopy/es-CO/reveal-phrases";
import { nfr28 } from "@/lib/i18n/microcopy/es-CO/nfr28";

// useRouter is called at mount; mock to a noop push.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// next/link → passthrough anchor so a (pre-fix) link would render as a real
// <a> with its text, making the "no link" assertion deterministic in jsdom.
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

describe("TransitionScreen mini-result", () => {
  test("renders reveal phrase + hook + CTA but NO full-report link", () => {
    render(
      <TransitionScreen
        nextHref="/test/PERMA"
        hook="Lo que sigue: qué te sostiene"
        result={{
          // hexagon WITHOUT scores/top3 → visual degrades to null (keeps the
          // test light, no visual deps); the link path is independent of it.
          visualType: "hexagon",
          revealPhrase: "Lo que más te mueve es abrir camino",
        }}
      />,
    );

    // Kept: glanceable takeaway + next hook + continue CTA.
    expect(
      screen.getByText("Lo que más te mueve es abrir camino"),
    ).toBeDefined();
    expect(screen.getByText("Lo que sigue: qué te sostiene")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();

    // Removed: no link to the full report from the transition (Decision B).
    expect(screen.queryByText("Ver reporte completo")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  test("renders the 3-part template (measure / phrase / why) + band legend + recap + intent recall (Ola 2 PR-C)", () => {
    render(
      <TransitionScreen
        nextHref="/test/ONET-IP-SF"
        hook="Vamos a mapear qué te energiza"
        result={{
          visualType: "bars",
          revealPhrase:
            "Recargas energía en lo tranquilo y te mueves por la curiosidad.",
          measure: "Tu nivel en cinco grandes rasgos de personalidad.",
          why: "En tu perfil integrado, esto se cruza con qué actividades te atraen.",
          showContention: false,
        }}
        recap="Tu personalidad, en un primer trazo."
        progressDone={1}
        progressTotal={4}
        intentRecall="Sigues buscando una mirada completa de cómo funcionas. Vas por buen camino."
      />,
    );

    expect(
      screen.getByText("Tu nivel en cinco grandes rasgos de personalidad."),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Recargas energía en lo tranquilo y te mueves por la curiosidad.",
      ),
    ).toBeDefined();
    expect(
      screen.getByText(
        "En tu perfil integrado, esto se cruza con qué actividades te atraen.",
      ),
    ).toBeDefined();
    expect(screen.getByText(REVEAL_BAND_LEGEND)).toBeDefined();
    expect(screen.getByText("Tu personalidad, en un primer trazo.")).toBeDefined();
    // Dots progress announced for screen readers ("Vas 1 de 4.").
    expect(screen.getByText("Vas 1 de 4.")).toBeDefined();
    expect(
      screen.getByText(
        "Sigues buscando una mirada completa de cómo funcionas. Vas por buen camino.",
      ),
    ).toBeDefined();
  });

  test("sensitive close: contention footer link always renders; prominent banner only when the server marks showContention", () => {
    const lines: ContentionLine[] = [
      { name: "Línea 106", phone: "106", description: "Apoyo emocional, Bogotá" },
    ];
    render(
      <TransitionScreen
        nextHref="/test/PERMA-PROFILER"
        hook="Lo que sigue"
        result={{
          visualType: "bars",
          revealPhrase: "Sientes con intensidad lo que pasa a tu alrededor.",
          showContention: true,
          contentionLines: lines,
        }}
      />,
    );

    // Discreet footer link is always present for a sensitive test.
    expect(screen.getByText(nfr28.MC_NFR28_FOOTER_LINK)).toBeDefined();
    // Prominent banner heading shows only because showContention=true (server).
    expect(screen.getByText(nfr28.MC_NFR28_BANNER_HEADING)).toBeDefined();
    // The CO line renders as a tel: anchor from PASSED data (never hardcoded).
    const telLink = screen.getByRole("link", { name: /106/ });
    expect(telLink.getAttribute("href")).toBe("tel:106");
  });

  test("NFR-28 regression: the contention banner and its ancestors carry no animation class (never delayed by the reveal choreography)", () => {
    const lines: ContentionLine[] = [
      { name: "Línea 106", phone: "106", description: "Apoyo emocional, Bogotá" },
    ];
    render(
      <TransitionScreen
        nextHref="/test/PERMA-PROFILER"
        hook="Lo que sigue"
        result={{
          visualType: "bars",
          revealPhrase: "Sientes con intensidad lo que pasa a tu alrededor.",
          tone: "sensitive",
          showContention: true,
          contentionLines: lines,
        }}
      />,
    );

    // Walk from the banner heading up to the root: no node in the chain may
    // carry an entrance animation (motion-2 choreography must never gate it).
    let node: HTMLElement | null = screen.getByText(
      nfr28.MC_NFR28_BANNER_HEADING,
    );
    while (node) {
      expect(node.className.includes("animate-")).toBe(false);
      node = node.parentElement;
    }
  });

  test("degrades to hook + CTA when there is no result (compose failed) without crashing", () => {
    render(
      <TransitionScreen
        nextHref="/test/ONET-IP-SF"
        hook="Vamos a mapear qué te energiza"
        recap="Tu personalidad, en un primer trazo."
        progressDone={1}
        progressTotal={4}
      />,
    );

    expect(screen.getByText("Vamos a mapear qué te energiza")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
    // No mini-result → no band legend rendered.
    expect(screen.queryByText(REVEAL_BAND_LEGEND)).toBeNull();
    // Recap + dots still render (they do not depend on the report).
    expect(screen.getByText("Tu personalidad, en un primer trazo.")).toBeDefined();
    expect(screen.getByText("Vas 1 de 4.")).toBeDefined();
  });
});
