/**
 * AWS KMS client — production path for envelope encryption (Plan 01-07).
 *
 * Verbatim pattern from 01-RESEARCH.md §"Gate 4: AWS KMS + Vercel OIDC
 * federation" Step 5 (lines 507-533).
 *
 * Module shape:
 *  - `generateDataKey()` returns `{ plaintext, ciphertext }` Uint8Arrays
 *    (32 bytes each for AES_256 spec). The `plaintext` is the freshly
 *    minted Data Encryption Key (DEK) that the caller uses to encrypt
 *    one PII field; the `ciphertext` is the KMS-encrypted DEK that gets
 *    persisted alongside the field.
 *  - `decryptDataKey(ciphertext)` reverses the above: KMS decrypts the
 *    EDK back to the plaintext DEK so the field can be decrypted.
 *
 * Credentials: Vercel-AWS OIDC federation (`@vercel/oidc-aws-credentials-provider`).
 * No static AWS keys in env vars. Trust policy + IAM permission are
 * provisioned out-of-band per RESEARCH §Gate 4 Steps 1-3. KEK alias is
 * hardcoded for Phase 1 (annual auto-rotation handled by AWS KMS — D4.3).
 *
 * Env contract:
 *  - `AWS_REGION` MUST be set explicitly to the resource region (us-east-1);
 *    Vercel auto-sets this to the execution region by default and that
 *    value can drift under multi-region routing (RESEARCH §Gate 4 Step 4
 *    "WARNING CRITICO").
 *  - `AWS_ROLE_ARN` MUST point at the role with kms:Encrypt/Decrypt/
 *    GenerateDataKey on the KEK alias.
 *
 * `server-only`: this module touches AWS credentials. Importing from a
 * Client Component fails the Next.js build.
 *
 * Anchors:
 *  - 01-RESEARCH.md §Gate 4 Step 5 (lines 507-533, verbatim).
 *  - 01-CONTEXT.md D4.1 (KMS provider), D4.3 (KEK alias + rotation).
 *  - 01-PATTERNS.md §1.8 (PII encryption pattern).
 */
import "server-only";
import {
  DecryptCommand,
  GenerateDataKeyCommand,
  KMSClient,
} from "@aws-sdk/client-kms";
import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";

const AWS_REGION = process.env.AWS_REGION!;
const AWS_ROLE_ARN = process.env.AWS_ROLE_ARN!;
const KEK_ALIAS = "alias/descubreme-prod-pii-kek-v1";

export const kms = new KMSClient({
  region: AWS_REGION,
  credentials: awsCredentialsProvider({ roleArn: AWS_ROLE_ARN }),
});

export async function generateDataKey(): Promise<{
  plaintext: Uint8Array;
  ciphertext: Uint8Array;
}> {
  const out = await kms.send(
    new GenerateDataKeyCommand({
      KeyId: KEK_ALIAS,
      KeySpec: "AES_256",
    }),
  );
  if (!out.Plaintext || !out.CiphertextBlob) {
    throw new Error("KMS GenerateDataKey returned empty payload");
  }
  return { plaintext: out.Plaintext, ciphertext: out.CiphertextBlob };
}

export async function decryptDataKey(
  ciphertext: Uint8Array,
): Promise<Uint8Array> {
  const out = await kms.send(
    new DecryptCommand({ CiphertextBlob: ciphertext }),
  );
  if (!out.Plaintext) {
    throw new Error("KMS Decrypt returned empty plaintext");
  }
  return out.Plaintext;
}
