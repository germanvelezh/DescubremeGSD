/**
 * Playwright real-auth fixture — DescubreMe Phase 2 Wave 6 (Plan 02-13).
 *
 * Unlike the Phase-1 mock fixture (fixtures/auth.ts, which drops a fake
 * `sb-mock-auth-token` that the real @supabase/ssr server client does NOT
 * recognize), this fixture mints a REAL Supabase session against the LOCAL
 * seeded stack and injects it in the exact cookie shape @supabase/ssr reads.
 *
 * How it works (verified empirically in 02-13):
 *   1. service-role admin.generateLink({type:'magiclink'}) -> hashed_token.
 *   2. anon client verifyOtp({token_hash, type:'email'}) -> real access +
 *      refresh tokens (a genuine session, no email round-trip).
 *   3. Inject the session as cookie `sb-<ref>-auth-token` = 'base64-' +
 *      base64(JSON(session)). For the local stack URL http://127.0.0.1:54321
 *      the @supabase/ssr storage ref is '127', so the cookie name is
 *      `sb-127-auth-token` (server route returns 200 with it, 307->/signup
 *      without — confirmed in 02-13).
 *
 * GUARD: this fixture ONLY runs against a LOCAL Supabase URL (127.0.0.1 /
 * localhost). It refuses any other host so a misconfigured env can never mint
 * sessions or write rows against a remote/prod project (Ley 1581 sensitive
 * data; CLAUDE.md §15). Requires E2E_LOCAL=1 + the local SERVICE_ROLE key.
 *
 * Consent is written separately (writeConsent) because the consent row is what
 * gate (a) of free-critical-gates asserts is ABSENT-blocks / PRESENT-allows.
 *
 * Anchors:
 *   - lib/supabase/server.ts (@supabase/ssr cookie bridge the cookie targets).
 *   - app/auth/callback/route.ts (the real signup/consent write path).
 *   - tests/e2e/fixtures/auth.ts (the mock fixture this supersedes for SSR).
 */
import type { BrowserContext } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const LOCAL_HOSTS = ["127.0.0.1", "localhost"];

function requireLocalEnv(): {
  url: string;
  anon: string;
  service: string;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const host = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  })();
  if (!LOCAL_HOSTS.includes(host)) {
    throw new Error(
      `real-auth fixture refused: NEXT_PUBLIC_SUPABASE_URL host '${host}' is not local. ` +
        "This fixture writes real rows and MUST never run against a remote/prod project.",
    );
  }
  if (!anon || !service) {
    throw new Error(
      "real-auth fixture requires NEXT_PUBLIC_SUPABASE_ANON_KEY + SUPABASE_SERVICE_ROLE_KEY (local stack).",
    );
  }
  return { url, anon, service };
}

/** True when the local-DB real-auth path is wired (env present + local host). */
export function hasLocalAuth(): boolean {
  try {
    requireLocalEnv();
    return process.env.E2E_LOCAL === "1";
  } catch {
    return false;
  }
}

/** The @supabase/ssr cookie name for the configured local URL (ref before first dot). */
function cookieName(url: string): string {
  const host = new URL(url).hostname; // 127.0.0.1
  const ref = host.split(".")[0]; // 127
  return `sb-${ref}-auth-token`;
}

export interface MintedUser {
  userId: string;
  email: string;
}

/**
 * Mints a real session for a fresh user and injects the @supabase/ssr cookie
 * into the Playwright context, so subsequent navigations are authenticated
 * server-side. Returns the userId + email for follow-up writes (consent,
 * session claim).
 */
export async function loginAsNewUser(
  context: BrowserContext,
  emailOverride?: string,
): Promise<MintedUser> {
  const { url, anon, service } = requireLocalEnv();
  const admin = createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const email = emailOverride ?? `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

  const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (linkErr || !link.properties?.hashed_token) {
    throw new Error(`generateLink failed: ${linkErr?.message ?? "no token"}`);
  }

  const anonClient = createClient(url, anon, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: verified, error: verifyErr } = await anonClient.auth.verifyOtp({
    token_hash: link.properties.hashed_token,
    type: "email",
  });
  if (verifyErr || !verified.session || !verified.user) {
    throw new Error(`verifyOtp failed: ${verifyErr?.message ?? "no session"}`);
  }

  const s = verified.session;
  const sessionPayload = {
    access_token: s.access_token,
    refresh_token: s.refresh_token,
    expires_at: s.expires_at,
    expires_in: s.expires_in,
    token_type: s.token_type,
    user: s.user,
  };
  const value = `base64-${Buffer.from(JSON.stringify(sessionPayload)).toString("base64")}`;

  await context.addCookies([
    {
      name: cookieName(url),
      value,
      domain: "localhost",
      path: "/",
      httpOnly: false,
      sameSite: "Lax",
    },
  ]);

  // Mirror the callback's public.user upsert so RLS-scoped reads resolve the row.
  await (admin.from("user") as unknown as {
    upsert: (
      v: Record<string, unknown>,
      o: Record<string, unknown>,
    ) => Promise<{ error: { message: string } | null }>;
  }).upsert(
    { id: verified.user.id, email, country_code: "CO" },
    { onConflict: "id" },
  );

  return { userId: verified.user.id, email };
}

/**
 * Writes the product='free' consent row (general + sensitive) for a user, the
 * way the auth callback does. Pass sensitive=false to grant ONLY general consent
 * (gate (a): a sensitive instrument must stay blocked).
 */
export async function writeConsent(
  userId: string,
  opts: { sensitive: boolean } = { sensitive: true },
): Promise<void> {
  const { url, service } = requireLocalEnv();
  const admin = createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  await (admin.from("consent") as unknown as {
    insert: (
      v: Record<string, unknown>,
    ) => Promise<{ error: { code?: string; message: string } | null }>;
  }).insert({
    user_id: userId,
    product_code: "free",
    consent_version: "1.0.0",
    text_sha256_hash: "e2e-test-hash",
    consent_general: true,
    consent_sensitive_data: opts.sensitive,
    locale: "es-CO",
  });
}
