/**
 * Vitest shared setup — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * Loaded once per test file via `vitest.config.ts` `setupFiles`. Exports
 * two helper factories used across unit + integration tests:
 *
 *   - `createMockSupabaseClient()` — chainable stub of the PostgREST
 *     query builder. NEVER touches a real DB. Tests that need a DB use
 *     `process.env.DATABASE_URL` directly and skip when absent.
 *
 *   - `createMockKmsAdapter()` — simulates AWS KMS GenerateDataKey +
 *     Decrypt with XOR against `DEV_PII_SECRET` (NEVER ship XOR to prod;
 *     this only documents the data-key handshake shape so tests of the
 *     real AES-256-GCM wrapper in Plan 01-08 inherit the same surface).
 *
 * Both helpers are pure functions with no module-level side effects:
 * importing this file in jsdom contexts costs only the `vi.clearAllMocks`
 * registration.
 */
import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Mock Supabase client
// ---------------------------------------------------------------------------

/**
 * Returns a chainable stub of the PostgREST query builder so tests can
 * assert how lib code calls Supabase without hitting a real instance.
 *
 * The stub honors the most common chain: `.from(table).select(...).eq(...).single()`.
 * Each chain method returns `this` so calls compose. Terminal methods
 * (`.single()`, `.maybeSingle()`, `.then()`) resolve a configurable
 * `{ data, error }` envelope.
 */
export interface MockSupabaseResult<T = unknown> {
  data: T | null;
  error: { message: string; code?: string } | null;
}

export interface MockSupabaseClient {
  from: ReturnType<typeof vi.fn>;
  select: ReturnType<typeof vi.fn>;
  insert: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  eq: ReturnType<typeof vi.fn>;
  in: ReturnType<typeof vi.fn>;
  // `.is(column, value)` is used by lib/consent/guard.ts to filter
  // `revoked_at IS NULL`. Added in Plan 01-07.
  is: ReturnType<typeof vi.fn>;
  single: ReturnType<typeof vi.fn>;
  maybeSingle: ReturnType<typeof vi.fn>;
  __setResult: (result: MockSupabaseResult) => void;
}

export function createMockSupabaseClient(
  initialResult: MockSupabaseResult = { data: null, error: null },
): MockSupabaseClient {
  let result: MockSupabaseResult = initialResult;

  const client: Partial<MockSupabaseClient> = {};
  const chain = () => client as MockSupabaseClient;

  client.from = vi.fn(chain);
  client.select = vi.fn(chain);
  client.insert = vi.fn(chain);
  client.update = vi.fn(chain);
  client.delete = vi.fn(chain);
  client.eq = vi.fn(chain);
  client.in = vi.fn(chain);
  client.is = vi.fn(chain);
  client.single = vi.fn(async () => result);
  client.maybeSingle = vi.fn(async () => result);
  client.__setResult = (next: MockSupabaseResult) => {
    result = next;
  };

  return client as MockSupabaseClient;
}

// ---------------------------------------------------------------------------
// Mock KMS adapter
// ---------------------------------------------------------------------------

/**
 * Returns a deterministic stand-in for `@aws-sdk/client-kms` GenerateDataKey
 * + Decrypt. Reads `process.env.DEV_PII_SECRET` (hex 64 chars). When absent,
 * falls back to `'0' * 64` so unit tests can run without env setup.
 *
 * The wrapper exposes the same shape as `lib/crypto/pii.local.ts` will
 * (Plan 01-08): `generateDataKey()` returns `{ plaintext, ciphertext }`,
 * `decryptDataKey(ciphertext)` returns `plaintext`. XOR is intentionally
 * trivial — it is NOT a security primitive. Prod uses AES-256-GCM via the
 * real KMS adapter; this mock only exists to lock the function surface.
 */
export interface MockKmsAdapter {
  generateDataKey: (
    aad: Record<string, string>,
  ) => Promise<{ plaintext: Buffer; ciphertext: Buffer }>;
  decryptDataKey: (
    ciphertext: Buffer,
    aad: Record<string, string>,
  ) => Promise<Buffer>;
}

export function createMockKmsAdapter(): MockKmsAdapter {
  const secretHex = process.env.DEV_PII_SECRET ?? "0".repeat(64);
  const secret = Buffer.from(secretHex, "hex");

  return {
    generateDataKey: vi.fn(async (_aad) => {
      const plaintext = Buffer.alloc(32, 0x42); // fixed for determinism
      const ciphertext = Buffer.from(
        plaintext.map((b, i) => b ^ (secret[i % secret.length] ?? 0)),
      );
      return { plaintext, ciphertext };
    }),
    decryptDataKey: vi.fn(async (ciphertext: Buffer, _aad: Record<string, string>) => {
      return Buffer.from(
        ciphertext.map((b: number, i: number) => b ^ (secret[i % secret.length] ?? 0)),
      );
    }),
  };
}
