/**
 * lib/crypto/pii.ts — unit tests (Plan 01-07 Task 1).
 *
 * Verifies the AES-256-GCM envelope encryption contract per 01-RESEARCH.md
 * §3 "Per-Domain Research — Encryption" lines 866-925 (verbatim pattern) +
 * §Gate 4 Step 5 (KMS interface lines 507-554).
 *
 * Threat model coverage:
 *  - T-01-07-AAD (anti blob swapping): `decryptPII` MUST throw when the
 *    AAD presented at decrypt time differs from the AAD bound at encrypt
 *    time (AES-GCM auth tag verification). Test 3 enforces this invariant.
 *
 * Test layout:
 *  - Tests 1-4 use the LOCAL (mock KMS) implementation via DEV_PII_SECRET
 *    so they run hermetically with no AWS calls.
 *  - Test 5 verifies the env-driven module switch: setting AWS_ROLE_ARN
 *    selects `./kms` (prod); setting only DEV_PII_SECRET selects
 *    `./kms.local`. The switch is exposed via `selectKmsModule()` to
 *    avoid coupling test to vitest dynamic-import cache semantics.
 *
 * Anchors:
 *  - 01-PATTERNS.md §1.8 (PII Encryption convention).
 *  - 01-CONTEXT.md D4.1-D4.4 (KMS + key access).
 *  - SKELETON.md "Encryption + PII".
 */
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const HEX_32 = "0".repeat(64); // 32 bytes of zero in hex (deterministic for test 4).

describe("lib/crypto/pii — envelope encryption", () => {
  beforeEach(() => {
    // Force local mock path: DEV_PII_SECRET set, AWS_ROLE_ARN unset.
    vi.stubEnv("AWS_ROLE_ARN", "");
    vi.stubEnv("DEV_PII_SECRET", HEX_32);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("Test 1: encryptPII returns EncryptedField with v/kid/edk/iv/ct/tag as base64 strings", async () => {
    const { encryptPII } = await import("@/lib/crypto/pii");
    const enc = await encryptPII("Juan Perez", "user_id:abc-123");

    expect(enc.v).toBe(1);
    expect(enc.kid).toBe("pii-v1");
    // base64 strings are non-empty and decode back to bytes
    expect(typeof enc.edk).toBe("string");
    expect(typeof enc.iv).toBe("string");
    expect(typeof enc.ct).toBe("string");
    expect(typeof enc.tag).toBe("string");
    // GCM IV is 12 bytes -> base64 length 16 ("AAAAAAAAAAAAAAAA")
    expect(Buffer.from(enc.iv, "base64").length).toBe(12);
    // GCM auth tag is 16 bytes
    expect(Buffer.from(enc.tag, "base64").length).toBe(16);
    // EDK is the KMS-encrypted DEK; local mock returns 32 bytes
    expect(Buffer.from(enc.edk, "base64").length).toBe(32);
  });

  test("Test 2: decryptPII roundtrips the plaintext with matching AAD", async () => {
    const { encryptPII, decryptPII } = await import("@/lib/crypto/pii");
    const enc = await encryptPII("Juan Perez", "user_id:abc-123");
    const plain = await decryptPII(enc, "user_id:abc-123");
    expect(plain).toBe("Juan Perez");
  });

  test("Test 3: decryptPII throws when AAD does not match (anti blob swapping)", async () => {
    const { encryptPII, decryptPII } = await import("@/lib/crypto/pii");
    const enc = await encryptPII("Juan", "user_id:A");
    await expect(decryptPII(enc, "user_id:B")).rejects.toThrow();
  });

  test("Test 4: mock KMS generateDataKey returns {plaintext, ciphertext} each 32 bytes", async () => {
    const { generateDataKey, decryptDataKey } = await import(
      "@/lib/crypto/kms.local"
    );
    const { plaintext, ciphertext } = await generateDataKey();
    expect(plaintext.length).toBe(32);
    expect(ciphertext.length).toBe(32);
    // Roundtrip
    const recovered = await decryptDataKey(ciphertext);
    expect(Buffer.from(recovered).equals(Buffer.from(plaintext))).toBe(true);
  });

  test("Test 5: selectKmsModule chooses prod when AWS_ROLE_ARN set, local otherwise", async () => {
    const { selectKmsModule } = await import("@/lib/crypto/pii");

    // Local mock branch
    vi.stubEnv("AWS_ROLE_ARN", "");
    vi.stubEnv("DEV_PII_SECRET", HEX_32);
    expect(selectKmsModule()).toBe("local");

    // Prod branch (we only assert the selection — we do NOT load the prod
    // module here because it pulls in @aws-sdk/client-kms which requires
    // a real provider chain).
    vi.stubEnv("AWS_ROLE_ARN", "arn:aws:iam::000000000000:role/test");
    vi.stubEnv("DEV_PII_SECRET", "");
    expect(selectKmsModule()).toBe("prod");
  });
});
