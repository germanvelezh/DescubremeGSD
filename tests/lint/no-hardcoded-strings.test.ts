/**
 * CI lint gate UI-SPEC §8.4 — no hardcoded user-facing strings in JSX.
 *
 * Implementa el "microcopy stability contract" (UI-SPEC §8.4 + §10
 * source-of-truth hierarchy): toda cadena user-facing en JSX debe venir
 * de un import del registry `lib/i18n/microcopy/es-CO/*.ts` con prefijo
 * `MC_*`. Asi Cowork (data-only PR) puede cambiar texto sin tocar
 * componentes — el contrato estable entre Cowork (texto) y CC (codigo).
 *
 * Aproximacion: regex line-based. AST cubriria mas casos pero anade
 * dependencia + complejidad; el surface real en Phase 1 son ~30 archivos
 * .tsx y la mayoria sigue el patron de inmediato.
 *
 * Que detectamos (heuristica conservadora — falso negativo > falso positivo):
 *  - `aria-label="<prosa>"` con texto que parece espanol (mayuscula inicial,
 *    >=2 palabras, contiene espacios o tildes).
 *  - `aria-describedby` con prosa (mismo criterio).
 *  - `placeholder="<prosa>"` (>=2 palabras espanol).
 *  - `title="<prosa>"` (>=2 palabras espanol).
 *  - `alt="<prosa>"` (>=2 palabras espanol).
 *
 * Que NO detectamos (limitacion deliberada):
 *  - Strings en `{">texto literal<"}` (JSX text nodes) — son detectables
 *    pero generan demasiados falsos positivos en SVG/className/tipos. La
 *    convencion del proyecto ya canaliza estos via `{MC.MC_*}` y el code
 *    review humano los caza.
 *  - Atributos tecnicos (`role`, `id`, `className`, `data-*`, `href`,
 *    `name`, `type`, `autoComplete`, `inputMode`).
 *  - Strings en archivos `_components/HexagonoRiasecFull.tsx` que son
 *    letras RIASEC (R, I, A, S, E, C) — match por longitud (1-2 chars).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §8.4 microcopy stability contract.
 *  - 01-UI-SPEC.md §10 source-of-truth hierarchy.
 *  - 01-11-PLAN.md Task 1 step 9.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";

const PROJECT_ROOT = join(__dirname, "..", "..");

const SCAN_DIRS = ["components/ui", "app"];

const EXCLUDE_SEGMENTS = [
  "node_modules",
  ".next",
  "__tests__",
  "tests",
];

/**
 * Atributos user-facing cuyo string literal exige venir de MC_*.
 * Match estructural: `<attr>="<value>"`. Permite escape de comilla simple
 * dentro del valor.
 */
const USER_FACING_ATTRS = [
  "aria-label",
  "aria-describedby",
  "placeholder",
  "title",
  "alt",
] as const;

/**
 * Heuristica "este string es prosa user-facing en espanol":
 *  - >= 2 palabras (>= 1 espacio).
 *  - contiene al menos una letra (no es solo ID/numero/clase).
 *  - no es un ID DOM (no termina con guion bajo + numero, no contiene solo
 *    alfanumericos sin espacios).
 *  - no es una URL ni clase CSS.
 *
 * Implementacion: contiene >=1 espacio Y contiene letras latinas
 * (incl. tildes y enie) Y NO empieza con `/` (path) Y NO empieza con `#`
 * (anchor) Y NO contiene `://` (url) Y NO empieza con `{` (expression
 * accidentalmente capturada por la regex — no deberia, pero safety).
 */
function looksLikeUserFacingProse(value: string): boolean {
  if (!/\s/.test(value)) return false;
  if (!/[a-záéíóúñüA-ZÁÉÍÓÚÑÜ]/.test(value)) return false;
  if (value.startsWith("/")) return false;
  if (value.startsWith("#")) return false;
  if (value.startsWith("{")) return false;
  if (value.includes("://")) return false;
  // Strings de 1 palabra+modificador (e.g. "true" + space corrupcion). 2 palabras+.
  const words = value.trim().split(/\s+/).filter((w) => w.length > 0);
  if (words.length < 2) return false;
  return true;
}

interface Violation {
  file: string;
  line: number;
  attr: string;
  value: string;
}

function walk(dir: string, violations: Violation[]): void {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    const rel = relative(PROJECT_ROOT, fullPath);
    if (EXCLUDE_SEGMENTS.some((seg) => rel.split("/").includes(seg))) continue;

    if (entry.isDirectory()) {
      walk(fullPath, violations);
      continue;
    }

    if (!entry.name.endsWith(".tsx")) continue;

    const content = readFileSync(fullPath, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      // Skip pure comment lines.
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) {
        return;
      }
      for (const attr of USER_FACING_ATTRS) {
        // Match `<attr>="value"` with escaped quotes allowed. We avoid
        // matching `<attr>={...}` (expression) — that's the canonical
        // MC.* import pattern and is what we WANT.
        const re = new RegExp(`\\b${attr}="([^"]+)"`, "g");
        let m: RegExpExecArray | null;
        re.lastIndex = 0;
        while ((m = re.exec(line)) !== null) {
          const value = m[1] ?? "";
          if (looksLikeUserFacingProse(value)) {
            violations.push({
              file: rel,
              line: i + 1,
              attr,
              value,
            });
          }
        }
      }
    });
  }
}

describe("UI-SPEC §8.4: no hardcoded user-facing strings in JSX attrs", () => {
  test("components/ui + app contain no literal user-facing strings outside MC.* imports", () => {
    const violations: Violation[] = [];
    for (const dir of SCAN_DIRS) {
      walk(join(PROJECT_ROOT, dir), violations);
    }

    if (violations.length > 0) {
      const formatted = violations
        .map(
          (v) =>
            `  ${v.file}:${v.line}: ${v.attr}="${v.value}"\n    -> mover a lib/i18n/microcopy/es-CO/*.ts con clave MC_*`,
        )
        .join("\n");
      throw new Error(
        `Hardcoded user-facing strings found (UI-SPEC §8.4 stability contract).\n${formatted}`,
      );
    }

    expect(violations).toEqual([]);
  });
});
