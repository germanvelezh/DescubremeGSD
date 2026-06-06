/**
 * Centralized pino logger.
 *
 * Anchors:
 * - 01-PATTERNS.md §1.11 (Logger & error handling).
 * - SKELETON.md "Compliance-by-design" (Sentry beforeSend + pino
 *   redact must share the same field list).
 * - COMPL-14 (no PII in logs).
 *
 * Decision rationale (PATTERNS.md §4 competing convention table):
 * - JSON output is uniform across dev and prod (not pino-pretty).
 *   `grep`-friendly logs in local dev mirror what Vercel + Sentry
 *   ingest in production. One mental model, no surprise differences
 *   on `console`.
 *
 * Anti-Pitfall 1.5 (PII in logs): any log payload whose key matches a
 * `redact.paths` entry is replaced with `[REDACTED]` before serialization.
 *
 * Sentry beforeSend (Plan 01-10) will mirror this exact path list so
 * the redaction surface is identical regardless of where logs end up.
 */
import { pino, type Logger } from "pino";

/**
 * Field names whose values MUST NOT leak to logs.
 *
 * Adding a new sensitive field: append it here AND in the Sentry
 * beforeSend config (Plan 01-10). They must stay in lockstep.
 *
 * `*.field` matches `field` at any depth in the log object — e.g.
 * `logger.info({ user: { email: 'x' } })` redacts `user.email`.
 */
const REDACT_PATHS = [
  "*.email",
  "*.name",
  "*.date_of_birth",
  "*.raw_value",
  "*.item_response",
  "*.phone",
  // Defense-in-depth: cover top-level keys too. pino path syntax is
  // literal — `email` matches only the top-level `email` key.
  "email",
  "name",
  "date_of_birth",
  "raw_value",
  "item_response",
  "phone",
] as const;

export const logger: Logger = pino({
  // Disable in test runs so Vitest doesn't spam stdout. Plan 01-03
  // installs Vitest; this flag will quiet logger noise then.
  enabled: process.env.NODE_ENV !== "test",
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: [...REDACT_PATHS],
    censor: "[REDACTED]",
  },
  // Stable timestamp format for grepping. ISO 8601 reads cleanly in
  // Vercel + Sentry. pino default is `Date.now()` which is unfriendly.
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    // Identify the service in multi-source aggregations. Override
    // per-process with PINO_BASE_SERVICE if needed.
    service: process.env.PINO_BASE_SERVICE ?? "descubreme",
  },
});
