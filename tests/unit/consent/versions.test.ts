/**
 * lib/consent/versions.ts — unit tests (Plan 01-07 Task 2).
 *
 * Validates the consent version registry + helpers:
 *  - `CURRENT_CONSENT_VERSIONS[product]` returns semver strings.
 *  - `semverLt(a, b)` compares semver triples correctly.
 *  - `getConsentTextHash(version)` returns the SHA-256 of the text file
 *    that ships in `lib/consent/text/<version>.md` (D1.6 hash-of-text
 *    persisted with the consent row for repudiation defense, T-01-07-04).
 *
 * Anchors:
 *  - 01-CONTEXT.md D1.4 (semver), D1.6 (text_sha256_hash).
 *  - 01-RESEARCH.md §7 lines 1216-1219 (semverLt used by guard).
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

import {
  CURRENT_CONSENT_VERSIONS,
  getConsentTextHash,
  semverLt,
} from "@/lib/consent/versions";

const PROJECT_ROOT = join(__dirname, "..", "..", "..");

describe("lib/consent/versions", () => {
  test("CURRENT_CONSENT_VERSIONS has all four product codes", () => {
    expect(CURRENT_CONSENT_VERSIONS.free).toMatch(/^\d+\.\d+\.\d+$/);
    expect(CURRENT_CONSENT_VERSIONS.paid).toMatch(/^\d+\.\d+\.\d+$/);
    expect(CURRENT_CONSENT_VERSIONS.b2b).toMatch(/^\d+\.\d+\.\d+$/);
    expect(CURRENT_CONSENT_VERSIONS.ikigai).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test("semverLt: 0.9.0 < 1.0.0", () => {
    expect(semverLt("0.9.0", "1.0.0")).toBe(true);
    expect(semverLt("1.0.0", "0.9.0")).toBe(false);
    expect(semverLt("1.0.0", "1.0.0")).toBe(false);
  });

  test("semverLt: 1.2.3 < 1.10.0 (numeric, not lexicographic)", () => {
    expect(semverLt("1.2.3", "1.10.0")).toBe(true);
  });

  test("semverLt: 2.0.0 > 1.999.999", () => {
    expect(semverLt("1.999.999", "2.0.0")).toBe(true);
    expect(semverLt("2.0.0", "1.999.999")).toBe(false);
  });

  test("getConsentTextHash matches SHA-256 of the file on disk", () => {
    const v = CURRENT_CONSENT_VERSIONS.free;
    const filePath = join(PROJECT_ROOT, "lib", "consent", "text", `${v}.md`);
    const content = readFileSync(filePath, "utf8");
    const expected = createHash("sha256").update(content).digest("hex");
    expect(getConsentTextHash(v)).toBe(expected);
  });
});
