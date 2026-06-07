/**
 * Local-dev alias for `lib/crypto/pii.ts`.
 *
 * Used when `DEV_PII_SECRET` is set and `AWS_ROLE_ARN` is not. Re-exports
 * the same `encryptPII` / `decryptPII` / `EncryptedField` from `./pii`;
 * the underlying KMS branch is selected automatically by `selectKmsModule()`
 * in `./pii.ts`, which reads `AWS_ROLE_ARN` from `process.env`.
 *
 * This file exists per the plan's frontmatter so future callers (or
 * integration tests that explicitly want the local path) can import it
 * directly without going through the env switch.
 *
 * Anchors:
 *  - 01-PATTERNS.md §1.8.
 *  - 01-CONTEXT.md D4.4.
 */
export {
  decryptPII,
  encryptPII,
  selectKmsModule,
  type EncryptedField,
} from "./pii";
