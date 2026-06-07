/**
 * Sentry `beforeSend` redact hook — COMPL-14 (Plan 01-09, Wave 6).
 *
 * Standalone pure function. NOT wired to a Sentry SDK runtime in Phase 1
 * (the SDK lands when `instrumentation.ts` ships in a later wave). Exporting
 * it as a pure transform lets us unit-test the redact contract without the
 * SDK and pass the exact same function into `Sentry.init({ beforeSend })`
 * the day the SDK lands.
 *
 * Redacts BEFORE the event leaves the process. Must stay in lockstep with
 * `lib/logger.ts` REDACT_PATHS — the surface is identical regardless of
 * where logs end up (pino stdout or Sentry HTTP). When you add a new
 * sensitive field to one, add it to the other in the same commit.
 *
 * Anchors:
 *  - 01-RESEARCH.md lineas 1402-1416 (pino redact + Sentry beforeSend).
 *  - SKELETON.md "Compliance-by-design" (Sentry beforeSend redact).
 *  - 01-PATTERNS.md §1.11.
 *  - PLAN.md threat T-01-09-02 + acceptance "minimo 5 paths PII".
 */

export const REDACTED_VALUE = "[REDACTED]";

/**
 * Minimal structural shape of a Sentry event. We avoid importing the SDK
 * `Event` type so this module has zero runtime dependency on `@sentry/*`.
 * When the SDK lands, the same function signature matches `BeforeSendCallback`
 * structurally.
 */
interface MinimalSentryUser {
  email?: unknown;
  name?: unknown;
  id?: unknown;
  ip_address?: unknown;
}

interface MinimalSentryRequest {
  cookies?: Record<string, string> | unknown;
  url?: unknown;
  headers?: Record<string, string> | unknown;
  data?: unknown;
}

export interface MinimalSentryEvent {
  user?: MinimalSentryUser;
  extra?: Record<string, unknown>;
  request?: MinimalSentryRequest;
  // Other Sentry fields preserved as-is.
  [key: string]: unknown;
}

/**
 * Paths inside `event.extra` whose values must be redacted. Mirrors
 * `lib/logger.ts` REDACT_PATHS but limited to the keys that realistically
 * appear in Sentry extras for this codebase.
 */
const EXTRA_REDACT_KEYS = [
  "item_response",
  "date_of_birth",
  "raw_value",
  "email",
  "name",
  "phone",
] as const;

/**
 * Cookie names dropped from `event.request.cookies` because they expose
 * journey context (which anonymous session, which item) even though they
 * are not PII per se. Anonymous session ids are nanoid 30 — not personally
 * identifying, but correlated with the user's data once they sign up.
 */
const COOKIE_DROP_NAMES = ["anonymous_session_id"] as const;

/**
 * Request header names that carry credentials or session material and must
 * be redacted before Sentry receives them. Matched case-insensitively
 * (HTTP header names are case-insensitive; Sentry preserves whatever the
 * SDK captured, so we redact whichever casing arrives).
 *
 * Specifically:
 *   - `authorization` — Bearer tokens (Supabase JWTs contain user.id,
 *     org_ids, role; leaking gives session-level access until expiry).
 *   - `cookie` — the entire serialized cookie jar, including `sb-*` auth
 *     cookies. Sentry's @sentry/nextjs captures this as the raw header
 *     string, so the COOKIE_DROP_NAMES filter above only covers the
 *     parsed `request.cookies` object.
 *   - `x-api-key` — generic API key headers we may forward to upstreams
 *     (Resend, Upstash, Supabase service-role).
 *   - `proxy-authorization` — same threat profile as `authorization`.
 */
const HEADER_REDACT_PATTERN = /^(authorization|cookie|x-api-key|proxy-authorization)$/i;

/**
 * Query-string parameter names that carry auth material. The auth callback
 * (`/auth/callback`) receives `?code=<otp>` from Supabase magic-link
 * exchange — if Sentry captures the request URL during a callback error,
 * the OTP leaks. Same threat profile for the other names.
 *
 * Matching is case-sensitive: URLs are case-sensitive in the spec and
 * we control the producers (Supabase docs lowercase these).
 */
const URL_QUERY_REDACT_KEYS = [
  "token",
  "access_token",
  "refresh_token",
  "code",
  "key",
  "api_key",
] as const;

/**
 * Redact known auth-bearing query params from a URL string. Accepts both
 * absolute (`https://...`) and relative (`/path?q=...`) URLs.
 *
 * Returns the sanitized URL string. If parsing fails (malformed input
 * Sentry never normalized), returns `REDACTED_VALUE` rather than the raw
 * string — a malformed URL we can't parse safely is better dropped than
 * forwarded.
 */
function sanitizeUrl(rawUrl: string): string {
  try {
    // Relative URLs need a base for URL(). Use a placeholder; we strip it
    // when serializing back. Sentry captures both absolute and relative.
    const isRelative = !/^[a-z][a-z0-9+.-]*:/i.test(rawUrl);
    const base = "http://placeholder.invalid";
    const url = isRelative ? new URL(rawUrl, base) : new URL(rawUrl);
    let mutated = false;
    for (const key of URL_QUERY_REDACT_KEYS) {
      if (url.searchParams.has(key)) {
        url.searchParams.set(key, REDACTED_VALUE);
        mutated = true;
      }
    }
    if (!mutated) return rawUrl;
    if (isRelative) {
      // Strip the placeholder origin.
      return url.pathname + url.search + url.hash;
    }
    return url.toString();
  } catch {
    return REDACTED_VALUE;
  }
}

/**
 * Redact PII from a Sentry event BEFORE upload.
 *
 * Returns a new event object — never mutates the input. Returns the event
 * (never null) so the hook never silently drops events; if we want to drop
 * something later, do it with an explicit allow/deny decision rather than
 * a null fallthrough.
 *
 * @param event   The Sentry event the SDK was about to send.
 * @param hint    The Sentry hint object (unused in Phase 1; kept for SDK
 *                signature compatibility).
 */
export function sentryBeforeSend(
  event: MinimalSentryEvent,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: kept for SDK signature parity.
  _hint: Record<string, unknown>,
): MinimalSentryEvent {
  // Shallow clone — we mutate clones, not the original tree.
  const out: MinimalSentryEvent = { ...event };

  // 1. event.user — redact email + name (preserve id for trace context).
  if (event.user && typeof event.user === "object") {
    const user: MinimalSentryUser = { ...event.user };
    if (user.email !== undefined) user.email = REDACTED_VALUE;
    if (user.name !== undefined) user.name = REDACTED_VALUE;
    out.user = user;
  }

  // 2. event.extra — redact sensitive keys.
  if (event.extra && typeof event.extra === "object") {
    const extra: Record<string, unknown> = { ...event.extra };
    for (const key of EXTRA_REDACT_KEYS) {
      if (key in extra) extra[key] = REDACTED_VALUE;
    }
    out.extra = extra;
  }

  // 3. event.request — sanitize cookies, headers, url, data.
  if (event.request && typeof event.request === "object") {
    const request: MinimalSentryRequest = { ...event.request };

    // 3a. cookies — drop journey-context cookies (parsed jar).
    if (
      request.cookies &&
      typeof request.cookies === "object" &&
      !Array.isArray(request.cookies)
    ) {
      const cookies: Record<string, string> = {
        ...(request.cookies as Record<string, string>),
      };
      for (const name of COOKIE_DROP_NAMES) {
        if (name in cookies) delete cookies[name];
      }
      request.cookies = cookies;
    }

    // 3b. headers — redact credential-bearing headers
    // (Authorization Bearer, Cookie jar string, API keys).
    if (
      request.headers &&
      typeof request.headers === "object" &&
      !Array.isArray(request.headers)
    ) {
      const headers: Record<string, string> = {
        ...(request.headers as Record<string, string>),
      };
      for (const headerName of Object.keys(headers)) {
        if (HEADER_REDACT_PATTERN.test(headerName)) {
          headers[headerName] = REDACTED_VALUE;
        }
      }
      request.headers = headers;
    }

    // 3c. url — strip auth-bearing query-string params (magic-link `code`,
    // access tokens, generic api_key/token query params).
    if (typeof request.url === "string") {
      request.url = sanitizeUrl(request.url);
    }

    // 3d. data — drop the entire request body. We cannot inspect it safely:
    // POST /api/respond carries `{itemCode, raw_value}`, /api/feedback carries
    // free-text, /api/waitlist carries email, /auth/callback OTP exchange
    // carries `code`. Cheaper and safer to drop wholesale than enumerate.
    if (request.data !== undefined) {
      request.data = REDACTED_VALUE;
    }

    out.request = request;
  }

  return out;
}
