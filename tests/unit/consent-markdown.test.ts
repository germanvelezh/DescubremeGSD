/**
 * Unit tests — integridad del render del documento de consentimiento.
 *
 * Regresion: el parser anterior consumia las lineas de continuacion
 * indentadas de un bullet sin emitirlas, y 7 lineas del documento de
 * autorizacion nunca llegaban a pantalla. Dos de ellas cambiaban el
 * sentido de lo que el usuario aceptaba:
 *
 *   - `fines de seleccion, contratacion o evaluacion individual.` — la
 *     mitad de la promesa anti-seleccion, que en pantalla quedaba cortada
 *     en "...ni terceros con".
 *   - `(www.sic.gov.co)` — la ruta de queja ante la Superintendencia de
 *     Industria y Comercio quedaba sin destino.
 *
 * El test 1 es el que importa: compara **cada linea no vacia del .md
 * fuente** contra el texto parseado. Cualquier gramatica futura que el
 * parser no cubra falla aca antes de que un usuario vea texto faltante.
 *
 * Anchors:
 *  - lib/consent/markdown.ts
 *  - app/(public)/consent/page.tsx
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

import { parseConsentMarkdown } from "@/lib/consent/markdown";
import { CURRENT_CONSENT_VERSIONS } from "@/lib/consent/versions";

const version = CURRENT_CONSENT_VERSIONS.free;
const source = readFileSync(
  join(process.cwd(), "lib", "consent", "text", `${version}.md`),
  "utf8",
);
const blocks = parseConsentMarkdown(source);

/** Texto plano de todos los bloques, en orden de documento. */
const renderedText = blocks
  .map((b) => ("items" in b ? b.items.join(" ") : b.text))
  .join(" ");

/** Quita marcadores de markdown y normaliza espacios para comparar. */
function normalize(text: string): string {
  return text
    .replace(/^#{1,6}\s+/, "")
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^\s*\d+\.\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Las lineas del .md fuente que la comparacion examina de verdad: las no
 * vacias despues de `normalize`. Se materializa aparte para poder contarla
 * DESPUES de los filtros — afirma que el test comparo contra algo, no que
 * se leyeron bytes del disco.
 */
const comparedLines = source
  .split("\n")
  .map(normalize)
  .filter((line) => line.length > 0);

/**
 * Piso de no-vacuidad del Test 1 (`[GAP-TESTS-VACUIDAD-CONJUNTO-VACIO]`,
 * ADR-040 mecanismo 4). `expect(missing).toEqual([])` es una asercion
 * correcta sobre un insumo que puede quedar vacio: si el .md se trunca, no
 * falta ninguna linea de las que quedaron y el gate aprueba en silencio.
 *
 * `Verificado por inyeccion, no por lectura:` truncando el .md a 15 de sus
 * 134 lineas fisicas, este Test 1 queda VERDE y enrojecen los otros 3 del
 * archivo. O sea el archivo no es ciego al truncamiento — pero el guardia
 * del P0 de #40 si lo es, y depender de los vecinos no es cobertura propia.
 *
 * Por que un piso y no `toBeGreaterThan(0)`: el vector es truncamiento
 * PARCIAL, y un .md de una sola linea pasa un `> 0`. El piso es el conteo
 * real de hoy — 103 lineas comparadas, el mismo 103/103 que se verifico en
 * prod al cerrar #40. Una edicion legitima que acorte el documento obliga a
 * bumpear `CURRENT_CONSENT_VERSIONS`, asi que este numero llega a revision
 * junto con ella.
 */
const COMPARED_LINES_FLOOR = 103;

describe("consent markdown: integridad del render", () => {
  test("ninguna linea del documento fuente se pierde", () => {
    const haystack = normalize(renderedText);

    // No-vacuidad primero: sin esto, un fuente truncado hace pasar el gate.
    expect(comparedLines.length).toBeGreaterThanOrEqual(COMPARED_LINES_FLOOR);

    const missing = comparedLines.filter((line) => !haystack.includes(line));

    expect(missing).toEqual([]);
  });

  test("las 7 lineas que el parser anterior descartaba estan presentes", () => {
    const haystack = normalize(renderedText);
    const regressions = [
      "fines de selección, contratación o evaluación individual.",
      "personalizar tu experiencia.",
      "preferencias).",
      "del numeral 5).",
      "y cuándo.",
      "esenciales de esta autorización.",
      "(www.sic.gov.co).",
    ];

    for (const fragment of regressions) {
      expect(haystack).toContain(normalize(fragment));
    }
  });

  test("la promesa anti-seleccion queda completa en un solo item", () => {
    const items = blocks.flatMap((b) => ("items" in b ? b.items : []));
    const antiSelection = items.find((it) => it.includes("empleadores"));

    expect(antiSelection).toBeDefined();
    expect(antiSelection).toContain(
      "fines de selección, contratación o evaluación individual",
    );
  });

  test("los 6 subprocesadores se parsean como lista numerada, no como un parrafo", () => {
    const ordered = blocks.filter((b) => b.kind === "ol");

    expect(ordered).toHaveLength(1);
    expect(ordered[0]!.kind === "ol" && ordered[0]!.items).toHaveLength(6);
  });
});
