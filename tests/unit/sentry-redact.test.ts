/**
 * Unit tests COMPL-14 — Sentry `beforeSend` redact hook.
 *
 * `sentryBeforeSend(event, hint)` is the verbatim pre-upload PII filter
 * that mirrors `lib/logger.ts` REDACT_PATHS. The hook is wired in Plan
 * 01-10/11 to the Sentry init config (`Sentry.init({ beforeSend })`).
 * Phase 1 ships it as a standalone pure function so it can be unit-tested
 * without the Sentry SDK runtime — when the SDK lands, the same exported
 * function is passed verbatim into `Sentry.init`.
 *
 * Paths covered (verbatim T-01-09-02 + SKELETON.md "compliance-by-design"):
 *   - `event.user.email`
 *   - `event.user.name`
 *   - `event.extra.item_response`
 *   - `event.extra.date_of_birth`
 *   - `event.extra.raw_value`
 *   - `event.request.cookies.anonymous_session_id` (filtered, not redacted —
 *     anonymous session ids are not PII but they leak journey context;
 *     drop the key entirely)
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1402-1416 (pino redact + Sentry beforeSend).
 *   - 01-PATTERNS.md §1.11.
 *   - PLAN.md threat T-01-09-02 + acceptance criteria "minimo 5 paths PII".
 */
import { describe, expect, test } from "vitest";

import { sentryBeforeSend, REDACTED_VALUE } from "@/lib/sentry-config";

interface SentryUser {
  email?: string;
  name?: string;
  id?: string;
}

interface SentryEvent {
  user?: SentryUser;
  extra?: Record<string, unknown>;
  request?: {
    cookies?: Record<string, string>;
    url?: string;
    headers?: Record<string, string>;
    data?: unknown;
  };
}

describe("COMPL-14: sentryBeforeSend redact hook", () => {
  test("redacts event.user.email", () => {
    const event: SentryEvent = { user: { email: "user@example.com", id: "u1" } };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.user?.email).toBe(REDACTED_VALUE);
    expect(out.user?.id).toBe("u1"); // user id preserved (no PII)
  });

  test("redacts event.user.name", () => {
    const event: SentryEvent = { user: { name: "Maria Camila", id: "u1" } };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.user?.name).toBe(REDACTED_VALUE);
  });

  test("redacts event.extra.item_response", () => {
    const event: SentryEvent = {
      extra: { item_response: { item_id: "abc", raw_value: 4 } },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.extra?.item_response).toBe(REDACTED_VALUE);
  });

  test("redacts event.extra.date_of_birth", () => {
    const event: SentryEvent = {
      extra: { date_of_birth: "1990-05-12" },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.extra?.date_of_birth).toBe(REDACTED_VALUE);
  });

  test("redacts event.extra.raw_value", () => {
    const event: SentryEvent = {
      extra: { raw_value: 5 },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.extra?.raw_value).toBe(REDACTED_VALUE);
  });

  test("filters event.request.cookies.anonymous_session_id (key removed)", () => {
    const event: SentryEvent = {
      request: {
        cookies: {
          anonymous_session_id: "abc123nanoid30charsxxxxxxxxxx",
          locale: "es-CO",
        },
      },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.cookies?.anonymous_session_id).toBeUndefined();
    expect(out.request?.cookies?.locale).toBe("es-CO"); // non-PII cookie preserved
  });

  test("returns null is forbidden (would silence the event) — always returns event", () => {
    const event: SentryEvent = { user: { email: "x@y.z" } };
    const out = sentryBeforeSend(event, {});
    expect(out).not.toBeNull();
  });

  test("noop on empty event", () => {
    const event = {};
    const out = sentryBeforeSend(event as SentryEvent, {}) as SentryEvent;
    expect(out).toEqual({});
  });

  test("does not mutate the input event (returns a new object)", () => {
    const event: SentryEvent = { user: { email: "x@y.z", id: "u1" } };
    const before = JSON.parse(JSON.stringify(event));
    sentryBeforeSend(event, {});
    expect(event).toEqual(before);
  });

  test("redacts Authorization header (Bearer JWT) — case-insensitive", () => {
    const event: SentryEvent = {
      request: {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIs...",
          "content-type": "application/json",
        },
      },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.headers?.Authorization).toBe(REDACTED_VALUE);
    expect(out.request?.headers?.["content-type"]).toBe("application/json");
  });

  test("redacts lowercase authorization header", () => {
    const event: SentryEvent = {
      request: { headers: { authorization: "Bearer abc.def.ghi" } },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.headers?.authorization).toBe(REDACTED_VALUE);
  });

  test("redacts Cookie header (full raw cookie string)", () => {
    const event: SentryEvent = {
      request: {
        headers: {
          cookie: "sb-access-token=xxx; sb-refresh-token=yyy; locale=es-CO",
        },
      },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.headers?.cookie).toBe(REDACTED_VALUE);
  });

  test("redacts x-api-key header", () => {
    const event: SentryEvent = {
      request: { headers: { "x-api-key": "re_abcdefghij" } },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.headers?.["x-api-key"]).toBe(REDACTED_VALUE);
  });

  test("redacts proxy-authorization header", () => {
    const event: SentryEvent = {
      request: { headers: { "proxy-authorization": "Basic dXNlcjpwYXNz" } },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.headers?.["proxy-authorization"]).toBe(REDACTED_VALUE);
  });

  test("preserves non-credential headers (user-agent, accept-language)", () => {
    const event: SentryEvent = {
      request: {
        headers: {
          "user-agent": "Mozilla/5.0 ...",
          "accept-language": "es-CO,es;q=0.9",
        },
      },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.headers?.["user-agent"]).toBe("Mozilla/5.0 ...");
    expect(out.request?.headers?.["accept-language"]).toBe("es-CO,es;q=0.9");
  });

  test("strips magic-link `code` from auth callback URL (relative)", () => {
    const event: SentryEvent = {
      request: { url: "/auth/callback?code=abc123secret&next=/reporte" },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.url).toContain(`code=${encodeURIComponent(REDACTED_VALUE)}`);
    expect(out.request?.url).not.toContain("abc123secret");
    expect(out.request?.url).toContain("next=%2Freporte");
  });

  test("strips access_token and refresh_token from URL (absolute)", () => {
    const event: SentryEvent = {
      request: {
        url: "https://descubreme.co/api?access_token=AA&refresh_token=BB&keep=ok",
      },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.url).not.toContain("AA");
    expect(out.request?.url).not.toContain("BB");
    expect(out.request?.url).toContain("keep=ok");
  });

  test("strips generic api_key and key from URL", () => {
    const event: SentryEvent = {
      request: { url: "/x?api_key=KKK&key=LLL&q=hola" },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.url).not.toContain("KKK");
    expect(out.request?.url).not.toContain("LLL");
    expect(out.request?.url).toContain("q=hola");
  });

  test("preserves clean URLs without auth params", () => {
    const event: SentryEvent = {
      request: { url: "/reporte/abc-123?lang=es-CO" },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.url).toBe("/reporte/abc-123?lang=es-CO");
  });

  test("returns REDACTED for unparseable URL rather than leaking it", () => {
    // Malformed IPv6-style host fails new URL() with TypeError.
    const event: SentryEvent = { request: { url: "http://[invalid::host/path" } };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.url).toBe(REDACTED_VALUE);
  });

  test("drops request.data wholesale (body may contain PII / OTP / item_response)", () => {
    const event: SentryEvent = {
      request: {
        data: {
          email: "user@example.com",
          itemCode: "ONET-IP-SF-01",
          raw_value: 5,
        },
      },
    };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.data).toBe(REDACTED_VALUE);
  });

  test("does not invent request.data when source has none", () => {
    const event: SentryEvent = { request: { url: "/" } };
    const out = sentryBeforeSend(event, {}) as SentryEvent;
    expect(out.request?.data).toBeUndefined();
  });
});
