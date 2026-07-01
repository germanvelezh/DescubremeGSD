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
});
