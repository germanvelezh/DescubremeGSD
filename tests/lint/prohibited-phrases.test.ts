/**
 * CI lint gate COMPL-18 + UX-01 + UX-02 — prohibited phrases regex sweep.
 *
 * Scans user-facing microcopy / narrative templates / consent text for
 * patterns defined in `lib/lint/prohibited-phrases.ts`. Fails PR when any
 * match is found. Implements:
 *
 *   - COMPL-18 — Frases prohibidas regex bloquea PR.
 *   - UX-01    — Microcopy es-CO sin "vosotros"/"ordenador"/"coger".
 *   - UX-02    — Tono sin urgencia + glosario activo.
 *
 * Scan surface (per UI-SPEC §8.2 + RESEARCH lineas 1398):
 *   - `lib/i18n/microcopy/**` (Phase 1 microcopy files, TS literals)
 *   - `db/seeds/narrative-templates/**` (RIASEC narrative SQL VALUES)
 *   - `lib/consent/text/**` (consent body markdown)
 *
 * Phase 1 reality: these directories may not yet exist (microcopy lands
 * piecemeal across Waves 2-5; narrative templates are Cowork deliverable).
 * The test passes vacuously when no source files match — that's the
 * intended Wave 0 behavior. Wave 2+ tasks populate the directories and
 * this gate starts catching violations.
 *
 * Markdown skip rule: lines starting with `#` (headings) are exempt so
 * that documentation headings like "## Ansiedad" do not trip the
 * anti-clinico regex when used inside a "no es clinico" body (the body
 * itself is sanitized by the regex; headings are structural).
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";

import { PROHIBITED_PATTERNS } from "@/lib/lint/prohibited-phrases";

const PROJECT_ROOT = join(__dirname, "..", "..");

const SCAN_DIRS = [
  "lib/i18n/microcopy",
  "db/seeds/narrative-templates",
  "lib/consent/text",
];

const ALLOWED_EXTENSIONS = [".ts", ".tsx", ".sql", ".md"];

const EXCLUDE_SEGMENTS = ["node_modules", ".next", "db/seeds/mocks"];

interface Violation {
  file: string;
  line: number;
  text: string;
  reason: string;
  pattern: string;
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

    if (!ALLOWED_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) continue;

    const content = readFileSync(fullPath, "utf8");
    const isMarkdown = entry.name.endsWith(".md");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      // Skip markdown headings (structural, not user-facing copy).
      if (isMarkdown && /^\s*#/.test(line)) return;
      for (const pattern of PROHIBITED_PATTERNS) {
        if (pattern.regex.test(line)) {
          violations.push({
            file: rel,
            line: i + 1,
            text: line.trim(),
            reason: pattern.reason,
            pattern: pattern.regex.source,
          });
        }
      }
    });
  }
}

describe("COMPL-18 + UX-01 + UX-02: prohibited phrases", () => {
  test("microcopy / narratives / consent text contain zero prohibited matches", () => {
    const violations: Violation[] = [];
    for (const dir of SCAN_DIRS) {
      walk(join(PROJECT_ROOT, dir), violations);
    }

    if (violations.length > 0) {
      const formatted = violations
        .map(
          (v) =>
            `  ${v.file}:${v.line}: ${v.text}\n    -> ${v.reason}\n    pattern: ${v.pattern}`,
        )
        .join("\n");
      throw new Error(
        `Prohibited phrases found. See lib/lint/prohibited-phrases.ts.\n${formatted}`,
      );
    }

    expect(violations).toEqual([]);
  });

  test("PROHIBITED_PATTERNS has at least 10 entries covering UI-SPEC §8.2 categories", () => {
    expect(PROHIBITED_PATTERNS.length).toBeGreaterThanOrEqual(10);
  });
});
