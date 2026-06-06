/**
 * Playwright auth fixture — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * `signupViaMagicLink(page, email)` simulates the full magic-link round-trip
 * WITHOUT hitting real Supabase Auth. It:
 *   1. Intercepts `POST /auth/v1/otp` (the supabase-js call) and returns
 *      a 200 OK with `{ messageId: 'mock' }` so the UI confirmation flow
 *      proceeds as if the email was sent.
 *   2. Intercepts the callback URL (`/auth/callback?code=…`) and sets a
 *      mock session cookie that the server-side @supabase/ssr helpers will
 *      treat as authenticated in the test env.
 *
 * Real magic-link flows (with email delivery + actual Supabase JWT) are
 * exercised by Wave 5 E2E specs that opt into `process.env.E2E_REAL_DB`.
 *
 * NOTE: The cookie shape here is a placeholder. When `lib/supabase/server.ts`
 * lands (Wave 1+), update `SESSION_COOKIE_NAME` to match the real `sb-*-auth-token`
 * cookie name that @supabase/ssr writes.
 */
import type { Page } from "@playwright/test";

const SESSION_COOKIE_NAME = "sb-mock-auth-token";

export async function signupViaMagicLink(
  page: Page,
  email: string,
): Promise<void> {
  // Intercept OTP request so signup form succeeds without a real Supabase call.
  await page.route("**/auth/v1/otp", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ messageId: "mock-message-id" }),
    });
  });

  // Intercept the magic-link callback to drop a mock session cookie.
  await page.route("**/auth/callback*", async (route) => {
    await route.fulfill({
      status: 302,
      headers: {
        "Set-Cookie": `${SESSION_COOKIE_NAME}=mock-session-token; Path=/; HttpOnly; SameSite=Lax`,
        Location: "/",
      },
      body: "",
    });
  });

  // Pre-seed the cookie so subsequent navigations are authenticated.
  const url = new URL(page.url() || "http://localhost:3000");
  await page.context().addCookies([
    {
      name: SESSION_COOKIE_NAME,
      value: `mock-session-${encodeURIComponent(email)}`,
      domain: url.hostname,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
}
