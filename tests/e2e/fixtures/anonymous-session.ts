/**
 * Playwright anonymous-session fixture — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * `createAnonSession(page, instrumentCode)` sets a deterministic
 * `anonymous_session_id` cookie so tests can drive the "test-first"
 * flow (ADR-007) without going through landing -> click "Empezar".
 *
 * The cookie name + lifetime mirror what `lib/session/anonymous.ts`
 * will write when it lands (Wave 1+). Real session creation runs
 * `nanoid(21)` server-side; the fixture uses a stable string per call
 * so individual specs can assert on the value.
 *
 * Stored value example: "anon_ONET-IP-SF_t1729123456789" — encodes the
 * instrument code so server-side claim flows (FOUND-08) can match the
 * fixture in integration tests.
 */
import type { Page } from "@playwright/test";

const ANON_COOKIE_NAME = "anonymous_session_id";
const COOKIE_MAX_AGE_DAYS = 7;

export async function createAnonSession(
  page: Page,
  instrumentCode = "ONET-IP-SF",
): Promise<string> {
  const sessionId = `anon_${instrumentCode}_t${Date.now()}`;
  const url = new URL(page.url() || "http://localhost:3000");

  await page.context().addCookies([
    {
      name: ANON_COOKIE_NAME,
      value: sessionId,
      domain: url.hostname,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires:
        Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60,
    },
  ]);

  return sessionId;
}
