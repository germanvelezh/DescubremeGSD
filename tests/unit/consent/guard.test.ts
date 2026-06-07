/**
 * lib/consent/guard.ts — unit tests (Plan 01-07 Task 2).
 *
 * Verifies `assertConsentActive(userId, productCode, sensitivity)` per
 * 01-RESEARCH.md §7 "Consent guard" lines 1198-1221 (verbatim) + D1.4
 * (version-check semantics) + COMPL-03 (defensa en profundidad).
 *
 * Behavior matrix:
 *  - normal sensitivity + consent_general=true + active + current version
 *    → does not throw.
 *  - high sensitivity + consent_sensitive_data=false → throws (403).
 *  - any sensitivity + consent_version older than current → throws (412).
 *
 * The guard is a thin SELECT wrapper around `public.consent`. The Supabase
 * client is mocked via `createMockSupabaseClient` from tests/setup.ts so
 * the contract is exercised without touching a real DB.
 *
 * Anchors:
 *  - 01-RESEARCH.md §7 lines 1198-1221 (verbatim guard).
 *  - 01-CONTEXT.md D1.4 (semver re-prompt).
 *  - 01-PATTERNS.md §3.2 (consent guard).
 */
import { describe, expect, test } from "vitest";

import { assertConsentActive } from "@/lib/consent/guard";
import { createMockSupabaseClient } from "@/tests/setup";

describe("lib/consent/guard — assertConsentActive", () => {
  test("Test 1: does not throw when consent_general=true and version is current (normal sensitivity)", async () => {
    const client = createMockSupabaseClient({
      data: {
        consent_general: true,
        consent_sensitive_data: false,
        consent_version: "1.0.0",
        revoked_at: null,
      },
      error: null,
    });
    await expect(
      assertConsentActive(
        // biome-ignore lint/suspicious/noExplicitAny: mock client
        client as any,
        "user-1",
        "free",
        "normal",
      ),
    ).resolves.toBeUndefined();
  });

  test("Test 2: throws 403 for sensitivity=high when consent_sensitive_data=false", async () => {
    const client = createMockSupabaseClient({
      data: {
        consent_general: true,
        consent_sensitive_data: false,
        consent_version: "1.0.0",
        revoked_at: null,
      },
      error: null,
    });
    await expect(
      assertConsentActive(
        // biome-ignore lint/suspicious/noExplicitAny: mock client
        client as any,
        "user-2",
        "free",
        "high",
      ),
    ).rejects.toMatchObject({ status: 403 });
  });

  test("Test 3: throws 412 when consent_version is older than CURRENT_CONSENT_VERSIONS", async () => {
    const client = createMockSupabaseClient({
      data: {
        consent_general: true,
        consent_sensitive_data: true,
        consent_version: "0.9.0", // < 1.0.0 current
        revoked_at: null,
      },
      error: null,
    });
    await expect(
      assertConsentActive(
        // biome-ignore lint/suspicious/noExplicitAny: mock client
        client as any,
        "user-3",
        "free",
        "normal",
      ),
    ).rejects.toMatchObject({ status: 412 });
  });

  test("Test 4: throws 403 when no consent row exists", async () => {
    const client = createMockSupabaseClient({ data: null, error: null });
    await expect(
      assertConsentActive(
        // biome-ignore lint/suspicious/noExplicitAny: mock client
        client as any,
        "user-4",
        "free",
        "normal",
      ),
    ).rejects.toMatchObject({ status: 403 });
  });

  test("Test 5: throws 403 when consent_general is false", async () => {
    const client = createMockSupabaseClient({
      data: {
        consent_general: false,
        consent_sensitive_data: false,
        consent_version: "1.0.0",
        revoked_at: null,
      },
      error: null,
    });
    await expect(
      assertConsentActive(
        // biome-ignore lint/suspicious/noExplicitAny: mock client
        client as any,
        "user-5",
        "free",
        "normal",
      ),
    ).rejects.toMatchObject({ status: 403 });
  });
});
