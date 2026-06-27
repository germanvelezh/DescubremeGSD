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

// Wave 7 (Plan 01-11) — scope final: anadir los 8 dirs escritos en Waves 2-6
// para que el gate cubra TODO el codigo de produccion. Excluidos especificos:
//   - `lib/i18n/microcopy/**` — texto user-facing, NO codigo de instrumento.
//   - `lib/questionnaire/response-scales.ts` — anchors numericos, NO logica
//     de instrumento (el anchor "1=Para nada cierto" vive aqui, separado del
//     instrumento que lo referencia).
const SCAN_DIRS = [
  "lib/scoring",
  "lib/integrator",
  "lib/report",
  "app/api",
  "lib/baremo",
  "lib/quality",
  "lib/ethics",
  "lib/consent",
  "lib/audit",
  "lib/crypto",
  "lib/session",
  "lib/email",
  // Plan 02-07 — the Free guided-order resolver MUST stay data-driven: the
  // order comes from product_stack.order, never a hardcoded code list (T-02-07-02).
  "lib/free",
];

const EXCLUDE_SEGMENTS = [
  "__tests__",
  "tests/fixtures",
  "db/seeds",
  "node_modules",
  ".next",
  "lib/i18n/microcopy",
];

// Files individually excluded (anchors / scales NOT tied to a specific instrument).
const EXCLUDE_FILES = ["lib/questionnaire/response-scales.ts"];

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
    if (EXCLUDE_FILES.includes(rel)) continue;

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
      // Import/re-export of the O*NET DOMAIN module (lib/onet/*) is NOT a
      // hardcoded instrument code (Phase 02.1): the "onet" path segment is the
      // occupational-framework directory holding Job Zone math, not the
      // ONET-IP-SF instrument literal. The regex matches "onet" via /i; this
      // exempts only the module-path import line, never instrument-code usage.
      if (
        /^(?:import|export)\b.*\bfrom\s+["']@\/lib\/onet\/[^"']+["'];?\s*$/.test(
          trimmed,
        )
      )
        return;
      if (INSTRUMENT_CODES.test(line)) {
        violations.push({ file: rel, line: i + 1, text: trimmed });
      }
    });
  }
}

describe("FOUND-05: no hardcoded instrument codes in production code (Wave 7 full scope)", () => {
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
