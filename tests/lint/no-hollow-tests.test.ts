/**
 * CI lint gate 16 (ADR-039) — ningun test nuevo puede reportar `passed` sin
 * afirmar nada.
 *
 * El defecto que vigila: un bloque de test cuyo cuerpo es un plan en
 * comentarios mas una asercion que no puede fallar
 * (`expect(hasDb).toBe(true)` dentro de `it.skipIf(!hasDb)`, o
 * `expect(true).toBe(true)`). Es un escalon peor que un `skip`: un skip **se
 * declara ausente** y por eso es auditable; una tautologia **se declara
 * presente** e infla el conteo verde. Al agregarle DB al CI, 29 pasaron de
 * `skipped` a `passed` sin que cambiara una sola verificacion.
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
 * Huecos conocidos, pendientes de remediar. **VACIO desde el paso 3 de ADR-039**
 * — y tiene que seguir asi.
 *
 * Historia, porque explica por que el gate existe: al firmar ADR-039 habia
 * **31** bloques que corrian sin afirmar nada. 29 reportaban `passed` e inflaban
 * la cifra de verdes; los otros 2 usaban la compuerta invertida
 * (`skipIf(HAS_DB)`, corren solo SIN base de datos) y solo enganaban en local.
 * El paso 2 borro el de COMPL-17 (su guard real quedo registrado en
 * `compliance-guard-map.test.ts`) y el paso 3 degrado los 30 restantes a
 * `it.todo`, que no afirma cobertura: la declara pendiente.
 *
 * `Si tenes que agregar una entrada aca, parate a pensar.` La salida honesta y
 * barata para un test que todavia no podes escribir es `it.todo(...)`, que el
 * gate no cuenta como hueco. Esta lista existe solo para deuda que ya estaba
 * cuando el gate entro.
 */
const KNOWN_HOLLOW = new Set<string>([]);

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
