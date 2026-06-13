// @vitest-environment jsdom
/**
 * Render + a11y tests for the sensitive-instrument UX safety primitives
 * (Plan 02-06 Task 2): DisclaimerModal (NFR-27) + ContentionBanner (NFR-28).
 *
 * Enforces the acceptance criteria:
 *  - DisclaimerModal is provably non-dismissable: Escape does NOT close, scrim
 *    click does NOT close; the only forward path is the primary action;
 *    "Ahora no" backs out. `aria-modal="true"` present, initial focus primary.
 *  - ContentionBanner is calm: `aria-live="polite"`, CO lines rendered as
 *    `tel:` anchors from PASSED data (never hardcoded), NO destructive/red
 *    class. The discreet footer link renders even when showContention=false.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.3 (DisclaimerModal), §6.4 (ContentionBanner), §9 (a11y).
 *  - 02-CONTEXT.md D-D.1, D-D.2, D-D.3, D-D.5.
 *  - 02-06-PLAN.md Task 2 <behavior> + <acceptance_criteria>.
 */
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { DisclaimerModal } from "@/app/(b2c)/reporte/[sessionId]/_components/DisclaimerModal";
import {
  ContentionBanner,
  type ContentionLine,
} from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";

const CO_LINES: ContentionLine[] = [
  { name: "Línea 106", phone: "106", description: "Apoyo emocional, Bogotá" },
  {
    name: "Línea Nacional",
    phone: "018000113113",
    description: "Salud mental, 24/7",
  },
];

describe("DisclaimerModal (NFR-27, non-dismissable)", () => {
  test("renders with aria-modal=true and the variant body copy", () => {
    render(
      <DisclaimerModal
        open
        variant="bfi"
        onContinue={() => {}}
        onBack={() => {}}
      />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText(/no es un diagnóstico/i)).toBeInTheDocument();
  });

  test("perma variant shows the well-being body copy", () => {
    render(
      <DisclaimerModal
        open
        variant="perma"
        onContinue={() => {}}
        onBack={() => {}}
      />,
    );
    expect(screen.getByText(/no es una evaluación clínica/i)).toBeInTheDocument();
  });

  test("Escape does NOT close the modal (deviation: non-dismissable)", () => {
    const onContinue = vi.fn();
    const onBack = vi.fn();
    render(
      <DisclaimerModal
        open
        variant="bfi"
        onContinue={onContinue}
        onBack={onBack}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onBack).not.toHaveBeenCalled();
    expect(onContinue).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("scrim click does NOT close the modal", () => {
    const onBack = vi.fn();
    const { container } = render(
      <DisclaimerModal open variant="bfi" onContinue={() => {}} onBack={onBack} />,
    );
    // The scrim is the fixed overlay wrapping the dialog.
    const scrim = container.querySelector(".fixed.inset-0");
    expect(scrim).not.toBeNull();
    fireEvent.click(scrim as Element);
    expect(onBack).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("primary action 'Entiendo y continúo' advances", () => {
    const onContinue = vi.fn();
    render(
      <DisclaimerModal open variant="bfi" onContinue={onContinue} onBack={() => {}} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /entiendo y continúo/i }));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  test("'Ahora no' backs out (accessible escape hatch, not a trap)", () => {
    const onBack = vi.fn();
    render(
      <DisclaimerModal open variant="bfi" onContinue={() => {}} onBack={onBack} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /ahora no/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});

describe("ContentionBanner (NFR-28, calm)", () => {
  test("prominent banner renders only when showContention=true", () => {
    const { rerender } = render(
      <ContentionBanner showContention={false} lines={CO_LINES} />,
    );
    expect(screen.queryByText(/no estás solo/i)).not.toBeInTheDocument();
    rerender(<ContentionBanner showContention lines={CO_LINES} />);
    expect(screen.getByText(/no estás solo/i)).toBeInTheDocument();
  });

  test("banner has aria-live=polite (care, not emergency)", () => {
    const { container } = render(
      <ContentionBanner showContention lines={CO_LINES} />,
    );
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    // Never assertive — it is care, not an alarm.
    expect(container.querySelector('[aria-live="assertive"]')).toBeNull();
  });

  test("renders CO lines as tel: anchors from passed data (not hardcoded)", () => {
    render(<ContentionBanner showContention lines={CO_LINES} />);
    const tel106 = screen.getByRole("link", { name: /106/i });
    expect(tel106).toHaveAttribute("href", "tel:106");
    const telNacional = screen.getByRole("link", { name: /018000113113/i });
    expect(telNacional).toHaveAttribute("href", "tel:018000113113");
  });

  test("has NO destructive/red class (calm treatment, never alarm)", () => {
    const { container } = render(
      <ContentionBanner showContention lines={CO_LINES} />,
    );
    expect(container.innerHTML).not.toMatch(/\bbg-red-\d+|\btext-red-\d+|\bborder-red-\d+|destructive/);
  });

  test("discreet footer link renders even when showContention=false", () => {
    render(<ContentionBanner showContention={false} lines={CO_LINES} />);
    expect(
      screen.getByRole("button", { name: /si querés hablar con alguien/i }),
    ).toBeInTheDocument();
  });

  test("footer link expands the CO lines on click", () => {
    render(<ContentionBanner showContention={false} lines={CO_LINES} />);
    // Lines hidden until the footer link is activated.
    expect(screen.queryByRole("link", { name: /106/i })).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /si querés hablar con alguien/i }),
    );
    const link = screen.getByRole("link", { name: /106/i });
    expect(link).toHaveAttribute("href", "tel:106");
  });
});
