/**
 * CI lint gate FOUND-05 — no hardcoded instrument codes outside seed/test paths.
 *
 * Implements the plugin-as-data principle: scoring/integrator/report/api code
 * must read instrument behavior from DB rows (`scoring_rule.formula`, etc.),
 * never branch on instrument code literals. A grep over the source directories
 * surfaces any `BFI-2-S`/`ONET-IP-SF`/etc. that escaped into TypeScript.
 *
 * Approach: regex, not AST. AST would catch hidden cases (template literal
 * fragments) but adds dependency cost. The known FOUND-05 surface is plain
 * source code; regex is the pragmatic call here. RESEARCH §5 line 1000:
 * "(grep approach, NOT AST)".
 *
 * Excluded:
 *   - `db/seeds/**` — seeds DEFINE the instruments; matches expected.
 *   - `tests/**` — fixture/test code legitimately mentions codes.
 *   - `tests/fixtures/**`, `__tests__/**` — same.
 *   - Lines starting with `//` or `*` — comments documenting the test itself.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";

const PROJECT_ROOT = join(__dirname, "..", "..");

const INSTRUMENT_CODES =
  /\b(BFI-?2-?S?|VIA-?IS-?P?|ONET(-IP-SF)?|PVQ-?(21|RR)|PERMA|Ryff-?PWB|SWLS|MLQ|WAMI|PANAS|FSS-?9|BPNSFS|UWES-?9|WOLF|WDQ-?40|CFI-?R|PGI|Ikigai-?9|MEMS|CMWS|HEXACO|IPIP-?NEO)\b/i;

const SCAN_DIRS = ["lib/scoring", "lib/integrator", "lib/report", "app/api"];

const EXCLUDE_SEGMENTS = [
  "__tests__",
  "tests/fixtures",
  "db/seeds",
  "node_modules",
  ".next",
];

interface Violation {
  file: string;
  line: number;
  text: string;
}

function walk(dir: string, violations: Violation[]): void {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    const rel = relative(PROJECT_ROOT, fullPath);
    if (EXCLUDE_SEGMENTS.some((seg) => rel.includes(seg))) continue;

    if (entry.isDirectory()) {
      walk(fullPath, violations);
      continue;
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) continue;

    const content = readFileSync(fullPath, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
      if (INSTRUMENT_CODES.test(line)) {
        violations.push({ file: rel, line: i + 1, text: trimmed });
      }
    });
  }
}

describe("FOUND-05: no hardcoded instrument codes in lib/{scoring,integrator,report}, app/api", () => {
  test("scans pass with zero violations", () => {
    const violations: Violation[] = [];
    for (const dir of SCAN_DIRS) {
      walk(join(PROJECT_ROOT, dir), violations);
    }

    if (violations.length > 0) {
      const formatted = violations
        .map((v) => `  ${v.file}:${v.line}: ${v.text}`)
        .join("\n");
      throw new Error(
        `Hardcoded instrument codes found (FOUND-05). Move to db/seeds/.\n${formatted}`,
      );
    }

    expect(violations).toEqual([]);
  });
});
