// @vitest-environment jsdom
/**
 * TestEntryGate tests (Ola 2.2) — the single test-intro + NFR-27 gate.
 *
 * Ola 2.2 moved the NFR-27 pre-test gate off the overlay DisclaimerModal (still
 * covered by sensitive-ui.test.tsx) onto this inline container. These tests
 * re-cover the ethical-critical invariant in CI: the item is BLOCKED until the
 * user acknowledges, and a sensitive test embeds the intact NFR-27 body.
 *
 * Anchors:
 *  - app/(b2c)/test/[code]/_components/TestEntryGate.tsx.
 *  - lib/i18n/microcopy/es-CO/nfr27.ts (content, intact) + test-intro.ts.
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

// useRouter is used for the "Ahora no" back-out; app-router context is absent in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import { TestEntryGate } from "@/app/(b2c)/test/[code]/_components/TestEntryGate";
import { nfr27 } from "@/lib/i18n/microcopy/es-CO/nfr27";
import { testIntro } from "@/lib/i18n/microcopy/es-CO/test-intro";

const HOOK = "Hook de prueba";
const INTRO = "Intro factual de prueba";

describe("TestEntryGate — single entry gate (Ola 2.2)", () => {
  test("non-sensitive: hook + intro + Comenzar; item gated until ack", () => {
    render(
      <TestEntryGate hook={HOOK} intro={INTRO} sensitive={false} variant="bfi">
        <div data-testid="item">ITEM</div>
      </TestEntryGate>,
    );
    expect(screen.getByText(HOOK)).toBeTruthy();
    expect(screen.getByText(INTRO)).toBeTruthy();
    // No NFR-27 block for a non-sensitive test.
    expect(screen.queryByText(nfr27.MC_NFR27_BFI_BODY)).toBeNull();
    // The item is blocked until the user acknowledges.
    expect(screen.queryByTestId("item")).toBeNull();

    fireEvent.click(screen.getByText(testIntro.MC_INTRO_START_CTA));
    expect(screen.getByTestId("item")).toBeTruthy();
  });

  test("sensitive (bfi): embeds the intact NFR-27 body, gates the item, ack reveals it", () => {
    render(
      <TestEntryGate hook={HOOK} intro={INTRO} sensitive variant="bfi">
        <div data-testid="item">ITEM</div>
      </TestEntryGate>,
    );
    expect(screen.getByText(nfr27.MC_NFR27_BFI_HEADING)).toBeTruthy();
    expect(screen.getByText(nfr27.MC_NFR27_BFI_BODY)).toBeTruthy();
    // The item is blocked behind "Entiendo y continúo".
    expect(screen.queryByTestId("item")).toBeNull();

    fireEvent.click(screen.getByText(nfr27.MC_NFR27_CTA_PRIMARY));
    expect(screen.getByTestId("item")).toBeTruthy();
  });

  test("sensitive (perma): uses the well-being NFR-27 body", () => {
    render(
      <TestEntryGate hook={HOOK} intro={INTRO} sensitive variant="perma">
        <div data-testid="item">ITEM</div>
      </TestEntryGate>,
    );
    expect(screen.getByText(nfr27.MC_NFR27_PERMA_BODY)).toBeTruthy();
    expect(screen.queryByTestId("item")).toBeNull();
  });
});
