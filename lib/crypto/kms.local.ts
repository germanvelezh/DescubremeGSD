/**
 * Local dev mock for AWS KMS — used when `DEV_PII_SECRET` is set and
 * `AWS_ROLE_ARN` is unset (D4.4 dev-local path).
 *
 * Implements the same surface as `lib/crypto/kms.ts`:
 *  - `generateDataKey()` mints a fresh random DEK and XOR-wraps it with
 *    the 32-byte `DEV_PII_SECRET` (interpreted as a hex string).
 *  - `decryptDataKey(ciphertext)` reverses the XOR.
 *
 * XOR is NOT a security primitive — it documents the data-key handshake
 * shape so unit tests of the AES-256-GCM payload wrapper (`lib/crypto/pii.ts`)
 * inherit the same surface as prod. Prod KMS does real envelope wrapping
 * via AWS API; this mock just keeps the call shapes aligned.
 *
 * Verbatim pattern from 01-RESEARCH.md §Gate 4 Step 5 mock block
 * (lines 540-554) — extended with a roundtrip-safe `decryptDataKey` (the
 * RESEARCH snippet only shows generate; decrypt is the symmetric XOR).
 *
 * Anchors:
 *  - 01-RESEARCH.md §Gate 4 Step 5 (lines 540-554, verbatim mock).
 *  - 01-CONTEXT.md D4.4 (dev-local key access).
 *  - 01-PATTERNS.md §1.8 (PII encryption pattern).
 */
import "server-only";
import { randomBytes } from "node:crypto";

function getDevKek(): Buffer {
  const hex = process.env.DEV_PII_SECRET;
  if (!hex || hex.length !== 64) {
    throw new Error(
      "DEV_PII_SECRET must be set to 32 bytes (64 hex chars) for the local KMS mock",
    );
  }
  return Buffer.from(hex, "hex");
}

function xor32(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    // biome-ignore lint/style/noNonNullAssertion: lengths verified above
    out[i] = a[i]! ^ b[i % b.length]!;
  }
  return out;
}

export async function generateDataKey(): Promise<{
  plaintext: Uint8Array;
  ciphertext: Uint8Array;
}> {
  const dek = randomBytes(32);
  const kek = getDevKek();
  const ciphertext = xor32(dek, kek);
  return { plaintext: dek, ciphertext };
}

export async function decryptDataKey(
  ciphertext: Uint8Array,
): Promise<Uint8Array> {
  const kek = getDevKek();
  return xor32(ciphertext, kek);
}
