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
 * Cubre (a) los criterios cuyo test hueco se **borro** —la condicion de
 * Cowork— mas la superficie que ese borrado dejo al descubierto, y (b) desde el
 * paso 4 de ADR-039, los criterios cuyo hueco se **implemento** con test real.
 * Transcribir aqui toda la tabla de evidencia de ADR-039 seria codificar en CI
 * una interpretacion de afirmaciones matizadas ("cobertura parcial", "debil"),
 * que no se reducen a "el archivo existe y contiene el titulo".
 *
 * `Por que se ensancho:` el registro nacio para que un criterio borrado no
 * quedara "desaparecido". Un criterio **implementado** merece la misma
 * trazabilidad por la razon simetrica — que quien busque COMPL-08 manana lea
 * cual es su guard y no tenga que reconstruirlo. La condicion de no-silencio no
 * cambia: `covered` sigue exigiendo guards que el gate resuelve contra el
 * archivo real, asi que renombrar el test rompe el registro solo.
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
    code: "COMPL-08",
    surface: "revocacion de consentimiento bloquea escritura sensible",
    status: "covered",
    guards: [
      "tests/integration/consent-revoke.test.ts > Test 4c: COMPL-08 — el guard PASA antes de revocar y LANZA 403 despues, con los mismos argumentos",
      "tests/integration/consent-revoke.test.ts > Test 4b: POST {product_code:'free'} responde 200 y deja revoked_at NO nulo",
      "tests/integration/consent-revoke.test.ts > Test 4d: la revocacion deja rastro auditable — audit_log 'consent_revoked' con actor_id del usuario",
    ],
    note: "Paso 4 de ADR-039, criterio #1 del orden de remediacion: era el UNICO de los nueve con hueco Y cobertura CERO. El guard filtra .is('revoked_at', null) (lib/consent/guard.ts:64) pero los 5 tests de tests/unit/consent/guard.test.ts fijan revoked_at: null, y ninguno podia hacer otra cosa: el control NO es una rama de codigo sino el filtro de la query, y createMockSupabaseClient devuelve su resultado sin mirar la cadena — el .is() es un no-op contra el mock. Por eso el guard va contra PostgREST real y solo se mockea la identidad (@/lib/tenant/jwt). La asercion central (4c) es un DELTA DE LA MISMA ENTRADA: la misma llamada no lanza antes de revocar y lanza 403 despues; sin la mitad 'antes', un seed roto daria 403 igual y el test pasaria habiendo verificado nada. Se afirma el cuerpo ('Consent required') y no solo el status, porque el guard devuelve 403 por tres causas distintas y solo una es la revocacion. Verificado por falsacion con tres inyecciones que enrojecen conjuntos DISJUNTOS, una por test: quitar el .is() del guard tumba solo 4c; apuntar el UPDATE de la ruta a otro user tumba solo 4b; desactivar writeAudit tumba solo 4d.",
  },
  {
    code: "COMPL-07 / D1.5",
    surface: "DELETE /api/me/data — borrado transaccional",
    status: "covered",
    guards: [
      "tests/integration/data-rights.test.ts > Test 3b: D1.5 BORRAR — las 6 tablas de cascade quedan en cero, y waitlist tambien (por email, sin FK)",
      "tests/integration/data-rights.test.ts > Test 3c: D1.5 ANONIMIZAR — audit/usage/distress CONSERVAN la fila con el actor en null, y se agrega user_data_delete_completed",
      "tests/integration/data-rights.test.ts > Test 3d: la identidad de auth.users desaparece en la misma transaccion",
      "tests/integration/data-rights.test.ts > Test 3a: DELETE responde 200 con redirect a /me/delete/done",
    ],
    note: "Paso 4 de ADR-039, criterio #2. La cobertura previa (tests/e2e/account-delete-2-clicks.spec.ts:42) afirmaba el flujo de 2 clics y el redirect deslogueado — o sea que el BOTON funciona. El criterio es otra cosa: que los datos desaparezcan, que el rastro se conserve ANONIMIZADO en vez de borrarse, y que auth.users se vaya en la misma transaccion. Correccion de premisa leida de la DB viva: el contrato escrito decia '7 tablas por cascade' y son SEIS (pg_constraint, confdeltype='c'); la septima es waitlist, que no tiene FK y la borra el handler por email (route.ts:365-376). El centinela de la anonimizacion es entity_id, que anonymize_user_audit NO toca — sin el, una fila con actor_id null es indistinguible de cualquier otra. Verificado por falsacion con cuatro inyecciones que enrojecen conjuntos disjuntos: RPC sin 'delete from public.user' tumba solo 3b; sin anonymize_user_audit solo 3c; sin 'delete from auth.users' solo 3d; handler con otro redirect solo 3a.",
  },
  {
    code: "COMPL-05 / COMPL-06",
    surface: "GET + PATCH /api/me/data — consulta y rectificacion (ARCO)",
    status: "covered",
    guards: [
      "tests/integration/data-rights.test.ts > Test 1: COMPL-05 — el export trae las 6 areas CON las filas del usuario, no solo las claves",
      "tests/integration/data-rights.test.ts > Test 1b: GET sin Authorization devuelve 401 y NO filtra payload",
      "tests/integration/data-rights.test.ts > Test 2b: COMPL-06 — PATCH aplica el UPDATE, cifra el nombre y deja rastro",
    ],
    note: "Paso 4 de ADR-039, criterio #3, y cierra el ADR. La cobertura previa (account-delete-2-clicks.spec.ts:144-159) afirmaba toHaveAttribute('href','/api/me/data') — que el BOTON APUNTA BIEN— y RLS cubre la lectura cruzada, pero nadie afirmaba que el archivo traiga los datos: un export que devuelve las 6 claves VACIAS pasaba ese E2E y violaba el derecho de consulta. Por eso Test 1 afirma completitud (conteo por area) y no presencia de claves. Test 2b no se conforma con 'name_encrypted no es null': afirma que el texto plano NO aparece en el envelope, que es el defecto que cerro la mig 011 ([BUG-PII-STORAGE-PLAN-07]). Reusa el fixture que pago COMPL-07 — los describe corren en orden y el borrado va ultimo. Verificado por falsacion con tres inyecciones disjuntas: exportar item_responses vacio tumba solo Test 1; un PATCH que no persiste tumba solo 2b; un GET que acepta sin auth tumba solo 1b.",
  },
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
    status: "covered",
    guards: [
      "tests/integration/feedback-ownership.test.ts > authenticated user A submitting against user B's session returns 404 (IDOR blocked)",
      "tests/integration/feedback-ownership.test.ts > anonymous caller submitting against another anon's session returns 404",
      "tests/integration/feedback-ownership.test.ts > non-existent sessionId returns 404 (does not leak existence)",
      "tests/integration/feedback-ownership.test.ts > anonymous caller with matching cookie can submit feedback for own session (D3.4)",
      "tests/integration/feedback-ownership.test.ts > authenticated user can submit feedback for own session",
    ],
    note: "Cerrado: [GAP-COMPL17-FEEDBACK-IDOR-SIN-GUARD]. Los 5 bloques de ownership pasaron de it.todo (paso 3 de ADR-039) a tests reales contra el stack: siembran filas de assessment_session por postgres.js, dejan el service-role REAL (la mitigacion es leer la fila y comparar el dueño — mockear el admin client probaria el if, no el control) y mockean solo la identidad (next/headers + getSupabaseServerClient), que es lo que no existe sin servidor HTTP. Verificado por falsacion con tres inyecciones que enrojecen conjuntos disjuntos: desactivar ownership (route.ts:104-120) tumba los 2 de IDOR; hacer que la sesion inexistente se acepte (route.ts:100-102) tumba solo el de no-leak; hacer que ownership siempre rechace tumba solo los 2 caminos felices. Los ultimos dos guards cubren la direccion opuesta (D3.4: el control no debe bloquear al dueño legitimo).",
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
