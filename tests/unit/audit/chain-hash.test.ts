/**
 * Unit tests for `lib/audit/chain-hash.ts`.
 *
 * Asserts the TS mirror produces deterministic SHA-256 output for the same
 * payload + handles the null prev_hash bootstrap (32 zero bytes) the same
 * way the SQL trigger does. Trigger ↔ TS bit-exactness is verified at the
 * integration test (audit-immutable.test.ts).
 */
import { createHash } from "node:crypto";
import { describe, expect, test } from "vitest";
import {
  ZERO_HASH,
  chainHash,
  formatPgTimestamp,
} from "@/lib/audit/chain-hash";

describe("chainHash (TS mirror of audit_log_chain_hash trigger)", () => {
  test("Test 1 — deterministic SHA-256 for known payload", () => {
    const prev = new Uint8Array(32).fill(0xab);
    const occurredAt = formatPgTimestamp(new Date(Date.UTC(2026, 5, 6, 14, 23, 45)));
    const payload = {
      actor_id: "11111111-1111-1111-1111-111111111111",
      action: "consent_granted",
      entity_type: "consent",
      entity_id: "22222222-2222-2222-2222-222222222222",
      occurred_at: occurredAt,
    };

    // Recompute by hand using the exact algorithm the trigger uses.
    const prevHex = Buffer.from(prev).toString("hex");
    const concat =
      prevHex +
      payload.actor_id +
      payload.action +
      payload.entity_type +
      payload.entity_id +
      payload.occurred_at;
    const expected = new Uint8Array(createHash("sha256").update(concat).digest());

    const actual = chainHash(prev, payload);

    expect(actual).toHaveLength(32);
    expect(Buffer.from(actual).toString("hex")).toBe(
      Buffer.from(expected).toString("hex"),
    );
  });

  test("Test 2 — null prev_hash bootstraps with 32 zero bytes", () => {
    const occurredAt = formatPgTimestamp(new Date(Date.UTC(2026, 0, 1, 0, 0, 0)));
    const payload = {
      // actor_id null + empty coalesce mirrors `coalesce(actor_id::text, '')`
      actor_id: null,
      action: "system_boot",
      entity_type: "system",
      entity_id: "boot",
      occurred_at: occurredAt,
    };

    const withNull = chainHash(null, payload);
    const withZero = chainHash(ZERO_HASH, payload);

    expect(ZERO_HASH).toEqual(new Uint8Array(32));
    expect(Buffer.from(withNull).toString("hex")).toBe(
      Buffer.from(withZero).toString("hex"),
    );

    // Sanity: ensure the zero bootstrap actually changes the hash vs. a
    // different prev — i.e. the algorithm reads prev_hash.
    const withOnes = chainHash(new Uint8Array(32).fill(0xff), payload);
    expect(Buffer.from(withNull).toString("hex")).not.toBe(
      Buffer.from(withOnes).toString("hex"),
    );
  });
});
