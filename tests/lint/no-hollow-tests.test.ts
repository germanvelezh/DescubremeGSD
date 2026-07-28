/**
 * CI lint gate 16 (ADR-039) — ningun test nuevo puede reportar `passed` sin
 * afirmar nada.
 *
 * El defecto que vigila: un bloque de test cuyo cuerpo es un plan en
 * comentarios mas una asercion que no puede fallar
 * (`expect(hasDb).toBe(true)` dentro de `it.skipIf(!hasDb)`, o
 * `expect(true).toBe(true)`). Es un escalon peor que un `skip`: un skip **se
 * declara ausente** y por eso es auditable; una tautologia **se declara
 * presente** e infla el conteo verde. Al agregarle DB al CI, 29 de estos
 * pasaron de `skipped` a `passed` sin que cambiara una sola verificacion.
 *
 * ALCANCE — leer antes de interpretar un verde de este gate:
 *
 *   SI cubre  · bloques sin ningun `expect()`
 *             · bloques donde TODOS los `expect()` son no-sustantivos
 *
 *   NO cubre  · el pase vacuo por retorno temprano
 *               (`if (!client) return;` con aserciones reales despues, p.ej.
 *               `tests/integration/audit-immutable.test.ts` y
 *               `tests/lint/rls-enabled.test.ts:30`). Esos cuerpos SI tienen
 *               `expect()` reales en el camino feliz, asi que un conteo de
 *               aserciones no los ve. Es otro genero de defecto y necesita
 *               otro detector. **Un verde aca no dice "no hay pases vacuos".**
 *             · `tests/e2e/**` (los corre Playwright, no vitest).
 *
 * SEMANTICA de las variantes de declaracion, que es lo que hace reproducible
 * el numero:
 *   - `it.todo(...)` / `it.skip(...)` -> FUERA de alcance: son ausencia
 *     declarada, no afirman cobertura. Degradar un hueco a `it.todo` es
 *     justamente el remedio (ADR-039, cierre provisional opcion B).
 *   - `it.skipIf(cond)(...)` / `runIf` / `each` -> DENTRO: corren cuando la
 *     condicion no los saltea, y ese es el vector de la tautologia. Incluye la
 *     forma invocada de inmediato `test.skipIf(!DATABASE_URL)("t", cb)`, cuyo
 *     callee es otra CallExpression.
 *   - `const itIfDb = it.skipIf(!hasDb)` -> se resuelve el alias local; la
 *     DEFINICION del alias no es un bloque de test (exigir titulo literal +
 *     callback la descarta).
 *
 * El ALLOWLIST de abajo es TEMPORAL y tiene que llegar a cero. Sigue el mismo
 * patron que `tests/lint/audit-modification-callers.test.ts`: la lista es el
 * artefacto auditable, y tocarla obliga a una decision explicita. Ratchet en
 * las dos direcciones — un hueco nuevo fuera de la lista falla, y una entrada
 * que ya dejo de ser hueco tambien falla, para que la lista no se fosilice.
 *
 * Anchors:
 *   - estado/DECISIONS_LOG.md ADR-039 (condicion sistemica 1: meta-lint gate 16).
 *   - [GAP-TESTS-INTEGRACION-HUECOS] P1.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import ts from "typescript";
import { describe, expect, it } from "vitest";

// Mismos globs que vitest.config.ts (include menos exclude). Se listan por git
// y no por un glob propio para no medir una poblacion distinta a la que corre.
const GLOBS = [
  "tests/**/*.test.ts",
  "tests/**/*.test.tsx",
  "lib/**/*.test.ts",
  "lib/**/*.test.tsx",
];

const TEST_ROOTS = new Set(["it", "test"]);

/** Argumento de `expect()` que no puede fallar. */
const LITERAL =
  /^(true|false|null|undefined|-?\d+(\.\d+)?|"[^"]*"|'[^']*'|`[^`]*`|\[\]|\{\})$/;

type Hollow = { key: string; file: string; line: number };

function findHollowBlocks(): Hollow[] {
  const files = execFileSync("git", ["ls-files", ...GLOBS], {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter((f) => f && !f.startsWith("tests/e2e/"));

  const found: Hollow[] = [];

  for (const rel of files) {
    const sf = ts.createSourceFile(
      rel,
      readFileSync(rel, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );

    // Alias locales de declaracion (`itIfDb`) y simbolos-compuerta (consts
    // derivados de process.env, que son los que vuelven tautologica la asercion).
    const testAliases = new Set(TEST_ROOTS);
    const gateSymbols = new Set<string>();
    const collect = (node: ts.Node): void => {
      if (ts.isVariableDeclaration(node) && node.initializer) {
        const init = node.initializer.getText(sf);
        if (/\b(it|test)\s*\.\s*(skipIf|runIf|each)\b/.test(init)) {
          testAliases.add(node.name.getText(sf));
        }
        if (/process\.env\./.test(init)) {
          gateSymbols.add(node.name.getText(sf));
        }
      }
      ts.forEachChild(node, collect);
    };
    collect(sf);

    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        // Desenvolver la forma invocada de inmediato: test.skipIf(c)("t", cb).
        let callee: ts.Expression = node.expression;
        if (ts.isCallExpression(callee)) callee = callee.expression;

        let base: string | null = null;
        let modifier: string | null = null;
        if (ts.isIdentifier(callee)) {
          base = callee.text;
        } else if (
          ts.isPropertyAccessExpression(callee) &&
          ts.isIdentifier(callee.expression)
        ) {
          base = callee.expression.text;
          modifier = callee.name.text;
        }

        const declaredAbsent = modifier === "todo" || modifier === "skip";
        const callback = node.arguments.find(
          (a) => ts.isArrowFunction(a) || ts.isFunctionExpression(a),
        );
        const titleArg = node.arguments[0];
        const isTestBlock =
          titleArg && ts.isStringLiteralLike(titleArg) && Boolean(callback);

        if (base && testAliases.has(base) && isTestBlock && !declaredAbsent) {
          const args: string[] = [];
          const walkBody = (n: ts.Node): void => {
            if (
              ts.isCallExpression(n) &&
              ts.isIdentifier(n.expression) &&
              n.expression.text === "expect"
            ) {
              args.push(n.arguments.map((a) => a.getText(sf)).join(", "));
            }
            ts.forEachChild(n, walkBody);
          };
          walkBody(callback as ts.Node);

          const substantive = args.filter((a) => {
            const bare = a.replace(/^typeof\s+/, "").trim();
            return !gateSymbols.has(bare) && !LITERAL.test(bare);
          });

          if (substantive.length === 0) {
            found.push({
              key: `${rel} > ${titleArg.text}`,
              file: rel,
              line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1,
            });
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }

  return found;
}

/**
 * Huecos conocidos al firmar ADR-039. TEMPORAL: la pasada de remediacion los
 * borra, reemplaza o degrada a `it.todo`, y esta lista queda vacia.
 *
 * 29 de estos reportan `passed` hoy e inflan la cifra de verdes; los 2 de
 * `anonymous-session-claim` y `consent-blocks-response` usan la compuerta
 * INVERTIDA (`skipIf(HAS_DB)`, corren solo SIN base de datos), asi que en CI
 * aparecen como los `2 skipped` y solo enganan en corridas locales.
 */
const KNOWN_HOLLOW = new Set([
  "tests/integration/anonymous-session-claim.test.ts > verified by tsc + commit hash; runtime exercised in Plan 01-12 CI",
  "tests/integration/baremo-fallback.test.ts > selects CO when available (no fallback)",
  "tests/integration/baremo-fallback.test.ts > falls back CO → MX when CO row missing",
  "tests/integration/baremo-fallback.test.ts > falls back CO → INTL when CO + MX missing",
  "tests/integration/baremo-fallback.test.ts > returns null when no baremo exists for instrument_version",
  "tests/integration/baremo-fallback.test.ts > contract documented; runtime gated on DATABASE_URL",
  "tests/integration/baremo-telemetry.test.ts > writes one row per fallback select (country_requested + baremo_used)",
  "tests/integration/baremo-telemetry.test.ts > does not write user_id (PII not leaked)",
  "tests/integration/baremo-telemetry.test.ts > skips insert when no fallback occurred (CO baremo present)",
  "tests/integration/baremo-telemetry.test.ts > contract documented; runtime gated on DATABASE_URL",
  "tests/integration/consent-blocks-response.test.ts > verified by tests/lint/rls-policies-syntax.test.ts when DATABASE_URL is unset",
  "tests/integration/consent-revoke.test.ts > Test 4b: POST {product_code: 'free'} updates revoked_at + writeAudit consent_revoked + future INSERT high-sensitivity is blocked",
  "tests/integration/consent-revoke.test.ts > integration contract documented; runtime gated on DATABASE_URL",
  "tests/integration/data-rights.test.ts > Test 1: GET with valid JWT returns user + responses + scores + consents + audit + reports",
  "tests/integration/data-rights.test.ts > Test 1b: GET without Authorization header returns 401",
  "tests/integration/data-rights.test.ts > Test 2b: PATCH name + country_code -> 200 + UPDATE applied (DB-gated)",
  "tests/integration/data-rights.test.ts > Test 3: DELETE transactional — cascade FK borra 7 tablas + anonimiza 3 tablas + auth user removed",
  "tests/integration/data-rights.test.ts > integration contract documented; runtime gated on DATABASE_URL",
  "tests/integration/ethics-middleware.test.ts > ONET-IP-SF (low-risk) returns disclaimer=false",
  "tests/integration/ethics-middleware.test.ts > MOCK-DISTRESS-1 (ethical_flags.emotional_distress=true) → disclaimer=true + contention=true",
  "tests/integration/ethics-middleware.test.ts > missing instrument_version_id throws deterministic error",
  "tests/integration/ethics-middleware.test.ts > contract documented; runtime gated on DATABASE_URL",
  "tests/integration/feedback-ownership.test.ts > authenticated user A submitting against user B's session returns 404 (IDOR blocked)",
  "tests/integration/feedback-ownership.test.ts > anonymous caller submitting against another anon's session returns 404",
  "tests/integration/feedback-ownership.test.ts > anonymous caller with matching cookie can submit feedback for own session (D3.4)",
  "tests/integration/feedback-ownership.test.ts > authenticated user can submit feedback for own session",
  "tests/integration/feedback-ownership.test.ts > non-existent sessionId returns 404 (does not leak existence)",
  "tests/integration/plugin-swap.test.ts > DB seed swap: MOCK-PREF-12 scores via DB-driven formula (DATABASE_URL gated)",
  "tests/integration/respond.test.ts > Test 4: valid body + cookie inserts item_response with raw_value + user_id=null",
  "tests/integration/respond.test.ts > Test 5: body containing user_id is rejected 400 (COMPL-17 enforced)",
  "tests/integration/respond.test.ts > integration contract documented; runtime gated on DATABASE_URL",
]);

describe("gate 16 — ningun test reporta passed sin afirmar nada (ADR-039)", () => {
  const hollow = findHollowBlocks();

  it("no hay huecos nuevos fuera del allowlist de ADR-039", () => {
    const nuevos = hollow
      .filter((h) => !KNOWN_HOLLOW.has(h.key))
      .map((h) => `  ${h.file}:${h.line} > ${h.key.split(" > ")[1]}`);

    expect(
      nuevos,
      `Test(s) sin ninguna asercion sustantiva. Un cuerpo con solo comentarios, o cuyos expect() son todos sobre una compuerta (hasDb) o un literal (true), reporta "passed" sin verificar nada.\nArreglos, en orden de preferencia: (1) escribir la asercion real; (2) si todavia no se puede, declararlo con it.todo(...), que es honesto y auditable.\n${nuevos.join("\n")}`,
    ).toEqual([]);
  });

  it("el allowlist no tiene entradas obsoletas (ratchet: solo puede encoger)", () => {
    const vivos = new Set(hollow.map((h) => h.key));
    const obsoletas = [...KNOWN_HOLLOW].filter((k) => !vivos.has(k)).sort();

    expect(
      obsoletas,
      `Estas entradas del allowlist ya no son huecos (se arreglaron, se borraron o se degradaron a it.todo). Sacalas de KNOWN_HOLLOW para que la lista siga reflejando la deuda real:\n${obsoletas.map((k) => `  ${k}`).join("\n")}`,
    ).toEqual([]);
  });
});
