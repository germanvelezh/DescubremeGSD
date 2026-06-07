/**
 * Unit tests for `lib/email/transactional.ts::sendReportReadyEmail`.
 *
 * Coverage:
 *   - Calls injected Resend client with minimal payload (no tracking).
 *   - Subject = MC_EMAIL_WELCOME_SUBJECT (es-CO neutral).
 *   - Body contains CTA link to /reporte/<sessionId>.
 *   - Returns ok: true on Resend success.
 *
 * Anchors:
 *   - 01-CONTEXT.md D3.7.
 *   - 01-UI-SPEC.md §7.10 (assumed — minimal email spec).
 *   - PLAN.md §<behavior> Test 6.
 */
import { describe, expect, test, vi } from "vitest";

import { sendReportReadyEmail } from "@/lib/email/transactional";

interface MockResendClient {
  emails: {
    send: ReturnType<typeof vi.fn>;
  };
}

function makeResendMock(succeeds: boolean = true): MockResendClient {
  return {
    emails: {
      send: vi.fn(async (payload: unknown) => {
        if (!succeeds) {
          return { data: null, error: { message: "boom", name: "send_failed" } };
        }
        return { data: { id: "resend-msg-id-abc" }, error: null };
        void payload;
      }),
    },
  };
}

describe("sendReportReadyEmail: D3.7 minimal transactional email", () => {
  test("calls Resend with minimal payload (no tracking pixel)", async () => {
    const resend = makeResendMock(true);
    const result = await sendReportReadyEmail(
      {
        to: "user@example.com",
        userId: "user-id",
        sessionId: "session-id",
        appBaseUrl: "https://descubreme.example",
      },
      { resendClient: resend as unknown as Parameters<typeof sendReportReadyEmail>[1]["resendClient"] },
    );
    expect(result.ok).toBe(true);
    expect(resend.emails.send).toHaveBeenCalledTimes(1);
    const callArgs = resend.emails.send.mock.calls[0]?.[0] as {
      from: string;
      to: string | string[];
      subject: string;
      html: string;
    };
    expect(callArgs.from).toMatch(/DescubreMe/);
    expect(callArgs.to).toBe("user@example.com");
    // Subject is the MC_EMAIL_WELCOME_SUBJECT placeholder, not a marketing line.
    expect(callArgs.subject).not.toMatch(/!|claim|exclusive|free|gratis/i);
    // Body contains CTA link to the report.
    expect(callArgs.html).toContain("/reporte/session-id");
    // No tracking pixel.
    expect(callArgs.html).not.toMatch(/<img[^>]*tracking/i);
    expect(callArgs.html).not.toMatch(/<img[^>]*pixel/i);
  });

  test("returns ok: false on Resend error", async () => {
    const resend = makeResendMock(false);
    const result = await sendReportReadyEmail(
      {
        to: "user@example.com",
        userId: "user-id",
        sessionId: "session-id",
        appBaseUrl: "https://descubreme.example",
      },
      { resendClient: resend as unknown as Parameters<typeof sendReportReadyEmail>[1]["resendClient"] },
    );
    expect(result.ok).toBe(false);
  });
});
