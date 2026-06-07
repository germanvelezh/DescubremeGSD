/**
 * Unit tests for `lib/audit/writer.ts`.
 *
 * Three behaviors covered (PLAN.md Task 2 <behavior>):
 *  1. writer inserts into `audit_log` with the expected payload shape;
 *     prev_hash / this_hash / id / occurred_at are NOT supplied (trigger
 *     fills them).
 *  2. writer calls logger.info with stable identifiers ONLY — never with
 *     `meta` (T-01-05-04 information disclosure mitigation).
 *  3. writer throws on insert error and emits a redacted error log.
 *
 * Logger is mocked via `vi.mock('@/lib/logger', ...)` so the production
 * pino instance (disabled in NODE_ENV=test) does not interfere with spies.
 */
import { beforeEach, describe, expect, test, vi } from "vitest";

// vi.mock is hoisted to top-of-file; use vi.hoisted so the spy object
// is constructed before the mock factory runs.
const logSpy = vi.hoisted(() => ({
  info: vi.fn(),
  error: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: logSpy,
}));

// Import AFTER vi.mock so writer.ts picks up the mocked logger module.
import { writeAudit } from "@/lib/audit/writer";

/**
 * Local Supabase client mock — the global `createMockSupabaseClient` chain
 * returns the client itself from `.insert()` (chainable). The Supabase JS
 * client `.insert()` is actually a thenable PostgrestFilterBuilder that
 * resolves `{ data, error }` directly. We model that thenable shape here
 * so writer.ts can `await supabase.from(...).insert(...)` like in prod.
 */
function makeSupabase(result: { data: unknown; error: unknown }) {
  const insert = vi.fn(() => Promise.resolve(result));
  const from = vi.fn(() => ({ insert }));
  return { from, insert };
}

beforeEach(() => {
  logSpy.info.mockClear();
  logSpy.error.mockClear();
});

describe("writeAudit", () => {
  test("Test 1 — inserts audit_log row with expected payload (no id/prev_hash/this_hash)", async () => {
    const supabase = makeSupabase({ data: null, error: null });

    await writeAudit(supabase as unknown as Parameters<typeof writeAudit>[0], {
      actor_id: "44444444-4444-4444-4444-444444444444",
      actor_role: "authenticated",
      action: "consent_granted",
      entity_type: "consent",
      entity_id: "55555555-5555-5555-5555-555555555555",
      meta: { request_id: "req-abc", ip_truncated: "203.0.113.0/24" },
    });

    expect(supabase.from).toHaveBeenCalledWith("audit_log");
    expect(supabase.insert).toHaveBeenCalledTimes(1);

    const inserted = supabase.insert.mock.calls[0]?.[0];
    expect(inserted).toMatchObject({
      actor_id: "44444444-4444-4444-4444-444444444444",
      actor_role: "authenticated",
      action: "consent_granted",
      entity_type: "consent",
      entity_id: "55555555-5555-5555-5555-555555555555",
      meta: { request_id: "req-abc", ip_truncated: "203.0.113.0/24" },
    });

    // CRITICAL: writer must never set hash columns — the trigger owns them.
    expect(inserted).not.toHaveProperty("prev_hash");
    expect(inserted).not.toHaveProperty("this_hash");
    expect(inserted).not.toHaveProperty("id");
    expect(inserted).not.toHaveProperty("occurred_at");
  });

  test("Test 2 — logger.info receives ids+action only, NEVER meta (T-01-05-04)", async () => {
    const supabase = makeSupabase({ data: null, error: null });

    const sensitiveMeta = {
      // If this leaks to logs, COMPL-14 is broken. Test guards against that.
      email: "leak@example.com",
      raw_value: 5,
      free_text: "user reflection that must not be logged",
      request_id: "req-xyz",
    };

    await writeAudit(supabase as unknown as Parameters<typeof writeAudit>[0], {
      actor_id: "66666666-6666-6666-6666-666666666666",
      actor_role: "authenticated",
      action: "pdf_export",
      entity_type: "report_snapshot",
      entity_id: "77777777-7777-7777-7777-777777777777",
      meta: sensitiveMeta,
    });

    expect(logSpy.info).toHaveBeenCalledTimes(1);
    const logPayload = logSpy.info.mock.calls[0]?.[0] as Record<string, unknown>;
    const logMessage = logSpy.info.mock.calls[0]?.[1];

    expect(logMessage).toBe("audit");
    expect(logPayload).toMatchObject({
      actor_id: "66666666-6666-6666-6666-666666666666",
      actor_role: "authenticated",
      action: "pdf_export",
      entity_type: "report_snapshot",
      entity_id: "77777777-7777-7777-7777-777777777777",
    });

    // The whole point of T-01-05-04: meta MUST NOT appear in the log.
    expect(logPayload).not.toHaveProperty("meta");
    expect(logPayload).not.toHaveProperty("email");
    expect(logPayload).not.toHaveProperty("raw_value");
    expect(logPayload).not.toHaveProperty("free_text");
  });

  test("Test 3 — throws on insert error and logs redacted failure", async () => {
    const supabase = makeSupabase({
      data: null,
      error: { code: "23505", message: "duplicate key value" },
    });

    await expect(
      writeAudit(supabase as unknown as Parameters<typeof writeAudit>[0], {
        actor_id: null,
        actor_role: "system",
        action: "system_check",
        entity_type: "system",
        entity_id: "boot",
        meta: { secret: "should-not-leak" },
      }),
    ).rejects.toThrow(/audit write failed/);

    expect(logSpy.error).toHaveBeenCalledTimes(1);
    const errPayload = logSpy.error.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(errPayload).toMatchObject({
      action: "system_check",
      entity_type: "system",
      code: "23505",
    });
    // Failure log MUST NOT carry the meta payload either.
    expect(errPayload).not.toHaveProperty("meta");
    expect(errPayload).not.toHaveProperty("secret");
  });
});
