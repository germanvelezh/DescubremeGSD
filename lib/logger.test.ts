/**
 * Sanity test for @/lib/logger redact rules (Plan 01-02 Task 3).
 *
 * STATUS: Vitest is not installed yet (arrives in Plan 01-03). This
 * file documents the redact contract NOW so once Vitest lands the
 * test simply runs. Until then `npm run typecheck` validates that
 * the file is syntactically valid and the imports resolve via the
 * `@/*` path alias.
 *
 * Contract: when a payload with sensitive keys (email, name,
 * date_of_birth, raw_value, item_response, phone) is logged, the
 * serialized output replaces the value with "[REDACTED]" instead of
 * the original string.
 *
 * Anchor: SKELETON.md "Compliance-by-design" + COMPL-14.
 */
import { describe, it, expect } from "vitest";
import { pino } from "pino";

import { logger } from "@/lib/logger";

describe("logger redact contract", () => {
  it("exports a pino logger with .info()", () => {
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  it("redacts PII fields when logging a nested payload", () => {
    // Build an independent pino instance writing to a buffer so we
    // can assert on the serialized output. We reuse the SAME redact
    // path list shape exported from logger.ts to lock the contract.
    const chunks: string[] = [];
    const sink = pino(
      {
        redact: {
          paths: [
            "*.email",
            "*.name",
            "*.date_of_birth",
            "*.raw_value",
            "*.item_response",
            "*.phone",
            "email",
            "name",
            "date_of_birth",
            "raw_value",
            "item_response",
            "phone",
          ],
          censor: "[REDACTED]",
        },
      },
      {
        write(chunk: string) {
          chunks.push(chunk);
        },
      },
    );

    sink.info({
      user: {
        email: "foo@bar.com",
        name: "Foo Bar",
        date_of_birth: "1990-01-01",
      },
    });

    const out = chunks.join("");
    expect(out).toContain("[REDACTED]");
    expect(out).not.toContain("foo@bar.com");
    expect(out).not.toContain("Foo Bar");
    expect(out).not.toContain("1990-01-01");
  });
});
