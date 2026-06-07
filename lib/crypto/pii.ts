/**
 * Application-side PII envelope encryption (Plan 01-07 Task 1).
 *
 * Implements AES-256-GCM over the field plaintext, with the per-record
 * Data Encryption Key (DEK) wrapped by the AWS KMS Key Encryption Key
 * (KEK). The `EncryptedField` shape is the persisted form (JSONB column
 * in `public.user`, `name_*` and `date_of_birth_*` per migration 007 +
 * schema/user.ts).
 *
 * AAD (Additional Authenticated Data) is bound at encrypt time and
 * MUST match at decrypt time. The convention is `user_id:${userId}`:
 * binding the ciphertext to its owning user prevents blob swapping
 * (someone moves user A's encrypted DOB into user B's row — the GCM
 * tag verification fails because the AAD mismatches). T-01-07-AAD
 * in the threat register names this invariant.
 *
 * Module switch:
 *  - `AWS_ROLE_ARN` set → load `./kms` (prod AWS KMS via Vercel OIDC).
 *  - `AWS_ROLE_ARN` unset, `DEV_PII_SECRET` set → load `./kms.local`
 *    (XOR mock; D4.4 dev-local).
 *  - Neither set → throw at first encrypt call.
 *
 * The switch is exposed via `selectKmsModule()` so the unit test in
 * `tests/unit/crypto/pii.test.ts` can verify the branching logic
 * without paying the dynamic-import cost (vitest module cache makes
 * dynamic-import based env tests brittle).
 *
 * Anchors:
 *  - 01-RESEARCH.md §3 "Encryption domain — AES-256-GCM envelope + AWS KMS"
 *    lines 866-925 (verbatim implementation).
 *  - 01-CONTEXT.md D4.2 (fields cifrados app-side fase 1).
 *  - 01-PATTERNS.md §1.8 (PII encryption pattern).
 *  - SKELETON.md "Encryption + PII".
 */
import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

export type EncryptedField = {
  v: 1;
  /** KEK alias version. Stable across encrypts under the same KEK alias. */
  kid: string;
  /** Encrypted Data Key (base64). */
  edk: string;
  /** Init vector for AES-GCM (base64, 12 bytes). */
  iv: string;
  /** Ciphertext (base64). */
  ct: string;
  /** GCM auth tag (base64, 16 bytes). */
  tag: string;
};

/**
 * Returns which KMS backend the switch resolves to right now.
 * Used by the unit test to verify env-driven branching without
 * loading both modules.
 */
export function selectKmsModule(): "prod" | "local" {
  return process.env.AWS_ROLE_ARN ? "prod" : "local";
}

/**
 * Lazily resolve the KMS module per the env switch. Returns the same
 * shape both for prod and local: `{ generateDataKey, decryptDataKey }`.
 * Cached at module scope to avoid repeated dynamic imports.
 */
let kmsModule: {
  generateDataKey: () => Promise<{
    plaintext: Uint8Array;
    ciphertext: Uint8Array;
  }>;
  decryptDataKey: (ct: Uint8Array) => Promise<Uint8Array>;
} | null = null;
let kmsModuleSelected: "prod" | "local" | null = null;

async function getKmsModule() {
  const selected = selectKmsModule();
  if (kmsModule && kmsModuleSelected === selected) {
    return kmsModule;
  }
  if (selected === "prod") {
    kmsModule = await import("./kms");
  } else {
    kmsModule = await import("./kms.local");
  }
  kmsModuleSelected = selected;
  return kmsModule;
}

/**
 * Encrypts `plaintext` with a freshly minted DEK and binds the resulting
 * ciphertext to `aad`. The DEK ciphertext + IV + GCM tag are returned
 * inside an `EncryptedField` for persistence.
 *
 * @param plaintext UTF-8 string to encrypt (typically a name or ISO date).
 * @param aad       Additional Authenticated Data. MUST be `user_id:${userId}`
 *                  per project convention. Mismatched AAD at decrypt time
 *                  throws (anti blob-swapping).
 */
export async function encryptPII(
  plaintext: string,
  aad: string,
): Promise<EncryptedField> {
  const kms = await getKmsModule();
  const { plaintext: dek, ciphertext: edk } = await kms.generateDataKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", Buffer.from(dek), iv);
  cipher.setAAD(Buffer.from(aad));
  const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    v: 1,
    kid: "pii-v1",
    edk: Buffer.from(edk).toString("base64"),
    iv: iv.toString("base64"),
    ct: ct.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
  };
}

/**
 * Decrypts `enc` and verifies that the AAD at decrypt time matches the
 * AAD that was bound at encrypt time. Throws if mismatched (the GCM
 * auth-tag verification fails).
 *
 * @param enc Persisted EncryptedField record.
 * @param aad AAD presented for verification; MUST equal the encrypt-time
 *            AAD or this throws.
 */
export async function decryptPII(
  enc: EncryptedField,
  aad: string,
): Promise<string> {
  const kms = await getKmsModule();
  const dek = await kms.decryptDataKey(Buffer.from(enc.edk, "base64"));
  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(dek),
    Buffer.from(enc.iv, "base64"),
  );
  decipher.setAAD(Buffer.from(aad));
  decipher.setAuthTag(Buffer.from(enc.tag, "base64"));
  const out = Buffer.concat([
    decipher.update(Buffer.from(enc.ct, "base64")),
    decipher.final(),
  ]);
  return out.toString("utf8");
}
