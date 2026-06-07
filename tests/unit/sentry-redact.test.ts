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
});
