/**
 * Consent version registry + helpers (Plan 01-07 Task 2).
 *
 * `CURRENT_CONSENT_VERSIONS` lists the version of the consent text we
 * expect users to have granted for each product. The version is semver
 * (D1.4). Major bumps force a re-prompt; minor + patch do not.
 *
 * `getConsentTextHash(version)` returns the SHA-256 of the markdown
 * text we shipped for that version. The hash is persisted on the
 * `consent` row (`text_sha256_hash` column, D1.6) so we can prove at
 * any future moment what literal text the user accepted (T-01-07-04
 * repudiation defense).
 *
 * `semverLt(a, b)` is the comparator used by `assertConsentActive` to
 * detect stale consent rows that need a re-prompt.
 *
 * Anchors:
 *  - 01-CONTEXT.md D1.4 (semver re-prompt), D1.6 (hash + metadata).
 *  - 01-RESEARCH.md §7 lines 1216-1219 (semverLt used in guard).
 */
import "server-only";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ProductCode = "free" | "paid" | "b2b" | "ikigai";

/**
 * The version of consent text each product expects right now. Bumped
 * by editing this file + shipping a new `lib/consent/text/<version>.md`.
 */
export const CURRENT_CONSENT_VERSIONS: Record<ProductCode, string> = {
  free: "1.0.0",
  paid: "1.0.0",
  b2b: "1.0.0",
  ikigai: "1.0.0",
};

/**
 * Returns the SHA-256 of the consent text file shipped for `version`.
 * The file lives at `lib/consent/text/<version>.md`. Synchronous fs
 * read is fine here: the file is < 5 kB and we cache the result.
 */
const hashCache = new Map<string, string>();
export function getConsentTextHash(version: string): string {
  const cached = hashCache.get(version);
  if (cached) return cached;
  const filePath = join(process.cwd(), "lib", "consent", "text", `${version}.md`);
  const content = readFileSync(filePath, "utf8");
  const hash = createHash("sha256").update(content).digest("hex");
  hashCache.set(version, hash);
  return hash;
}

/**
 * Returns true if `a` is strictly less than `b` interpreted as semver
 * `MAJOR.MINOR.PATCH`. Numeric comparison (so `1.2.3 < 1.10.0`, not
 * lexicographic). Returns false on equality.
 *
 * Phase 1 does not handle pre-release tags (`-beta.1`); the consent
 * text registry only emits clean releases. If pre-release is later
 * needed, this helper must be extended.
 */
export function semverLt(a: string, b: string): boolean {
  const pa = a.split(".").map((n) => Number.parseInt(n, 10));
  const pb = b.split(".").map((n) => Number.parseInt(n, 10));
  for (let i = 0; i < 3; i++) {
    const ai = pa[i] ?? 0;
    const bi = pb[i] ?? 0;
    if (ai < bi) return true;
    if (ai > bi) return false;
  }
  return false;
}
