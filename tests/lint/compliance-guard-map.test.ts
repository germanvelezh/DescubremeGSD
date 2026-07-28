/**
 * CI lint gate 17 (ADR-039, paso 2) — mapeo criterio de compliance -> guard real.
 *
 * Condicion que puso Cowork al autorizar el borrado de un test de compliance:
 * *"registrar el mapeo criterio -> guard real, para que quien busque COMPL-17
 * manana lea 'cubierto por [estos tests]' y no 'desaparecido'"* — que es
 * exactamente la ambiguedad D3.3.
 *
 * Por que es un gate y no un parrafo en un documento: la leccion de QUAL-08.
 * Alla, la unica constancia de un control era un **comentario**, y el comentario
 * no verifica nada ni se entera cuando el guard que nombra desaparece. Un mapeo
 * escrito en prosa tiene el mismo defecto. Aca cada guard declarado se resuelve
 * contra el archivo real: si alguien renombra o borra el test que este registro
 * cita como cobertura, **el registro se cae solo**.
 *
 * Un `status: "gap"` es tan valido como un `"covered"` — y es el punto. El
 * registro tiene que poder decir "este criterio NO tiene guard", porque
 * declarar la ausencia es lo que la hace auditable. Lo que no se permite es el
 * silencio: `covered` sin guards falla, y `gap` sin flag de BACKLOG tambien.
 *
 * `Alcance:` este registro NO pretende mapear los 9 criterios de la auditoria.
 * Cubre los criterios cuyo test hueco se **borro** (la condicion de Cowork) mas
 * la superficie que ese borrado dejo al descubierto. Transcribir aqui toda la
 * tabla de evidencia de ADR-039 seria codificar en CI una interpretacion de
 * afirmaciones matizadas ("cobertura parcial", "debil"), que no se reducen a
 * "el archivo existe y contiene el titulo".
 *
 * Anchors:
 *   - estado/DECISIONS_LOG.md ADR-039 (exclusion COMPL-17 + su condicion).
 *   - tests/lint/no-hollow-tests.test.ts (gate 16, la otra mitad del arreglo).
 */
import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

type Entry = {
  code: string;
  /** Superficie concreta. Un criterio puede vivir en varias, con cobertura distinta. */
  surface: string;
  status: "covered" | "gap";
  /** "archivo > titulo exacto del test". Se resuelve contra el archivo real. */
  guards: string[];
  /** Flag de BACKLOG. Obligatorio cuando status === "gap". */
  flag?: string;
  note: string;
};

const REGISTRY: Entry[] = [
  {
    code: "COMPL-17",
    surface: "POST /api/respond",
    status: "covered",
    guards: [
      "tests/unit/api/respond-multiscale.test.ts > Test 6: body con user_id extra -> 400 (.strict() intacto)",
      "tests/unit/api/respond-multiscale.test.ts > Test 4: usuario logueado autorizado por cookie SSR getUser(); userId distinto -> 403",
    ],
    note: "El hueco de tests/integration/respond.test.ts ('Test 5: body containing user_id is rejected 400') se borro en el paso 2 de ADR-039. Estos dos guards ejercitan el handler real (importan @/app/api/respond/route) y cubren la misma ruta y la misma amenaza.",
  },
  {
    code: "COMPL-17",
    surface: "POST /api/feedback",
    status: "gap",
    guards: [],
    flag: "[GAP-COMPL17-FEEDBACK-IDOR-SIN-GUARD]",
    note: "SIN GUARD REAL. La mitigacion IDOR esta implementada (app/api/feedback/route.ts:96-120, 404 al no-dueño) y no la testea nadie: los 5 bloques de tests/integration/feedback-ownership.test.ts son huecos (expect(true).toBe(true)) y quedan declarados en el allowlist del gate 16 hasta que el paso 3 los degrade a it.todo. Los guards de /api/respond NO cubren esta superficie: respond-multiscale.test.ts:138 importa @/app/api/respond/route y ninguna otra. Verificado ademas que 'feedback' no aparece en ninguna forma en tests/e2e/.",
  },
];

describe("gate 17 — todo criterio de compliance registrado apunta a un guard que existe", () => {
  it("cada guard declarado se resuelve contra el archivo real", () => {
    const rotos: string[] = [];

    for (const entry of REGISTRY.filter((e) => e.status === "covered")) {
      for (const guard of entry.guards) {
        const [file, title] = guard.split(" > ");
        if (!existsSync(file)) {
          rotos.push(`${entry.code} (${entry.surface}): no existe ${file}`);
          continue;
        }
        if (!readFileSync(file, "utf8").includes(title)) {
          rotos.push(
            `${entry.code} (${entry.surface}): ${file} ya no contiene el test "${title}"`,
          );
        }
      }
    }

    expect(
      rotos,
      `El registro cita guards que ya no existen. Si el test se renombro, actualiza REGISTRY. Si se borro, el criterio se quedo sin cobertura y hay que cambiar su status a "gap" con su flag de BACKLOG:\n${rotos.join("\n")}`,
    ).toEqual([]);
  });

  it("ninguna entrada guarda silencio: covered exige guards, gap exige flag", () => {
    const mudas = REGISTRY.filter(
      (e) =>
        (e.status === "covered" && e.guards.length === 0) ||
        (e.status === "gap" && (e.guards.length > 0 || !e.flag)),
    ).map((e) => `${e.code} (${e.surface}) [${e.status}]`);

    expect(
      mudas,
      `Una entrada "covered" sin guards afirma una cobertura que no nombra, y una "gap" sin flag esconde la deuda. Las dos formas son el defecto que ADR-039 documenta:\n${mudas.join("\n")}`,
    ).toEqual([]);
  });
});
