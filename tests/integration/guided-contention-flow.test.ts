/**
 * Condicion sistemica #3 de ADR-039 — el test DEL FLUJO GUIADO para la
 * contencion NFR-28, que es el ultimo item que mantiene ese ADR abierto.
 *
 * POR QUE ESTE ARCHIVO EXISTE, y por que las tres capas que ya habia NO
 * alcanzaban. Antes de esto, la contencion guiada tenia cobertura en:
 *
 *   1. `shouldSurfaceContention` — el gate PURO, con unit tests. Prueba la
 *      decision sobre dos booleanos que le pasan por parametro.
 *   2. `tests/integration/perma-care-screen.test.tsx` — RENDERIZA el
 *      componente con props (`render(<PermaCareScreen .../>)`).
 *   3. `tests/e2e/free-critical-gates.spec.ts:169` — afirma el
 *      `ContentionBanner`.
 *
 * Las tres siguen verdes si alguien borra las 9 lineas que cablean la
 * pantalla en `done/page.tsx` (:176-184). Eso es exactamente el "banner
 * aislado" que ADR-039 excluye al pedir "un test DEL FLUJO GUIADO": lo que
 * hay que afirmar no es que la pantalla sepa renderizarse, es que **el flujo
 * guiado la surfacea en el choke point `allComplete`**.
 *
 * Es NFR-28, o sea seguridad: PERMA es el ULTIMO test del Free (orden
 * sembrado BFI -> ONET -> TwIVI -> PERMA), asi que cae en `allComplete` y NO
 * en la transicion `nextCode` que surfacea contencion para los anteriores.
 * Un usuario de bienestar bajo terminaria el Free sin ver nunca la ruta de
 * cuidado. Sin este test, un refactor del routing guiado puede reintroducir
 * ese agujero sin que CI se entere.
 *
 * FRONTERA DEL MOCK — se simula QUIEN LLAMA, nunca lo que el control
 * consulta (misma decision que `feedback-ownership.test.ts`). Se mockea solo
 * la identidad (`next/headers` + `getSupabaseServerClient`), que es lo unico
 * que no existe sin un request HTTP. El cliente admin va REAL contra el
 * stack: la mitigacion ES la cadena de queries (sesion completada -> snapshot
 * -> `composeReport` -> gate -> seed de lineas CO), asi que mockearla
 * probaria el `if` y no el control.
 *
 * Anchors:
 *  - estado/DECISIONS_LOG.md ADR-039 (condicion sistemica #3) y ADR-033.
 *  - app/(b2c)/test/[code]/done/page.tsx:176-184 (el choke point).
 *  - lib/free/guided-contention.ts (el orquestador).
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

const RUN = crypto.randomUUID().slice(0, 8);
const EMAIL = `adr039-c3-${RUN}@test.local`;
let userId = "";
/** id de la sesion de PERMA — la que lleva la decision de distress. */
let permaSessionId = "";

// -- Identidad mockeada (lo unico que no existe sin request) -----------------
vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: () => undefined })),
}));
vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(async () => ({
    auth: {
      getUser: vi.fn(async () => ({
        data: { user: { id: userId, email: EMAIL } },
        error: null,
      })),
    },
  })),
}));

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;
async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

async function getAuthAdmin() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

/**
 * Payload de snapshot con la decision de distress del SERVIDOR. El reporte
 * RENDERIZA esta decision y nunca recomputa un umbral (T-02-08-02), asi que
 * el fixture son dos banderas y NO un vector de respuestas.
 *
 * `requiresContentionRoute` sale de `ethics.decoupled.contentionRoute`
 * (assembler.ts:571) y `showContention` de `distress` (assembler.ts:286).
 */
function snapshotPayload(showContention: boolean) {
  return {
    // Los tres primeros NO son opcionales en `SnapshotPayload`: `composeReport`
    // hace `Object.keys(payload.scores_by_dim)` (assembler.ts:400) y sin ellos
    // lanza, el orquestador captura y devuelve NONE. Un fixture incompleto se
    // leeria entonces como "la pantalla no se surfacea", que es un diagnostico
    // falso — por eso existe el centinela de fixture del primer test.
    scores_by_dim: {
      P: 3.1, E: 3.0, R: 2.8, M: 3.2, A: 3.0, N: 7.1, Lon: 6.8, hap: 3.0, H: 3.4,
    },
    bands_by_dim: {
      P: "BAJO", E: "BAJO", R: "BAJO", M: "MEDIO", A: "BAJO",
      N: "ALTO", Lon: "ALTO", hap: "BAJO", H: "MEDIO",
    },
    display_by_dim: {},
    ethics: {
      requires_disclaimer: true,
      requires_contention_route: true,
      flags: ["emotional_distress"],
      decoupled: {
        pretestModal: true,
        contentionRoute: true,
        distressDetector: true,
      },
    },
    distress: {
      showContention,
      severity: showContention ? "moderate" : null,
    },
  };
}

/**
 * Reescribe la decision del servidor sobre la MISMA sesion sembrada.
 *
 * `s.json(...)` y NO `JSON.stringify(...)`: en una columna `jsonb`, el driver
 * guarda un string de JS como **escalar string** (`jsonb_typeof` -> `string`),
 * no como objeto. Entonces `payload.scores_by_dim` queda `undefined`,
 * `composeReport` lanza en `Object.keys` (assembler.ts:400), el orquestador
 * captura y devuelve NONE — y el sintoma es "el flujo redirige", identico a
 * tener el cableado roto. Costo real: la primera version de este archivo
 * enterraba el defecto en el UPDATE y hacia pasar el test de delta **por el
 * motivo equivocado** (redirigia por payload corrupto, no por la decision).
 */
async function setShowContention(value: boolean): Promise<void> {
  const s = await getSql();
  await s`update public.report_snapshot
          set html_payload = ${s.json(snapshotPayload(value) as never)}
          where session_id = ${permaSessionId}`;
}

/**
 * Invoca la pagina del choke point tal como la corre el runtime guiado.
 * Devuelve `{ redirected, element }`: `redirect()` de Next lanza un error con
 * `digest` que empieza en `NEXT_REDIRECT`, asi que redirigir y renderizar son
 * dos resultados DISTINGUIBLES — que es lo que permite afirmar por delta.
 */
async function runDonePage(): Promise<{
  redirected: boolean;
  redirectTo: string | null;
  // biome-ignore lint/suspicious/noExplicitAny: JSX element bajo test
  element: any;
}> {
  const { default: TestDonePage } = await import(
    "@/app/(b2c)/test/[code]/done/page"
  );
  try {
    const element = await TestDonePage({
      params: Promise.resolve({ code: "perma-profiler" }),
    });
    return { redirected: false, redirectTo: null, element };
  } catch (err) {
    const digest = (err as { digest?: string }).digest ?? "";
    if (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT")) {
      return { redirected: true, redirectTo: digest, element: null };
    }
    throw err;
  }
}

beforeAll(async () => {
  if (!HAS_STACK) return;
  const s = await getSql();
  const admin = await getAuthAdmin();

  const { data: created, error: authErr } = await admin.auth.admin.createUser({
    email: EMAIL,
    email_confirm: true,
  });
  if (authErr || !created?.user) {
    throw new Error(
      `auth.admin.createUser fallo: ${authErr?.message ?? "sin user"}`,
    );
  }
  userId = created.user.id;

  await s`insert into public.user ${s([
    { id: userId, email: EMAIL, country_code: "CO" },
  ])}`;

  // Las 4 versiones del stack Free, LEIDAS DEL SEED y no inventadas: si los
  // seeds no corrieron, esto falla ruidosamente (entorno roto) en vez de
  // producir un verde vacuo.
  const stack = await s`
    select ps."order", i.code, iv.id as instrument_version_id
    from product_stack ps
    join instrument_version iv on iv.id = ps.instrument_version_id
    join instrument i on i.id = iv.instrument_id
    where ps.product_code = 'free'
    order by ps."order"`;
  if (stack.length !== 4) {
    throw new Error(
      `El stack Free deberia tener 4 instrumentos y tiene ${stack.length}. Corre \`supabase db reset\`.`,
    );
  }

  // Las 4 sesiones se siembran YA en 'completed' a proposito: `allComplete`
  // exige las 4, y ademas `scoreCompletedSessionIfNeeded` filtra por
  // `.neq("status","completed")` (score-on-done.ts:74), asi que con todo
  // cerrado el scoring NO corre y el snapshot sembrado sobrevive intacto.
  for (const row of stack) {
    const sessionId = crypto.randomUUID();
    await s`insert into public.assessment_session ${s([
      {
        id: sessionId,
        user_id: userId,
        instrument_version_id: row.instrument_version_id as string,
        status: "completed",
      },
    ])}`;
    // PERMA es el ultimo del orden sembrado: es el que cae en `allComplete` y
    // el unico con umbral de distress activo hoy.
    if (Number(row.order) === 4) {
      permaSessionId = sessionId;
      await s`insert into public.report_snapshot ${s([
        {
          user_id: userId,
          session_id: sessionId,
          instrument_version_id: row.instrument_version_id as string,
          narrative_version: `n-${RUN}`,
          occupation_set_version: `o-${RUN}`,
          html_payload: s.json(snapshotPayload(true) as never),
        },
      ])}`;
    }
  }
  if (!permaSessionId) {
    throw new Error("No se sembro la sesion del ultimo instrumento del stack.");
  }
});

afterAll(async () => {
  if (!HAS_STACK) return;
  const s = await getSql();
  const admin = await getAuthAdmin();
  // `public.user` cascadea a assessment_session + report_snapshot. NO se borra
  // audit_log: su trigger es append-only y un delete tumba el archivo entero
  // (COMPL-09).
  if (userId) {
    await s`delete from public.user where id = ${userId}`;
    await admin.auth.admin.deleteUser(userId);
  }
  await s.end();
});

describe("ADR-039 condicion #3 — el flujo guiado surfacea la contencion NFR-28", () => {
  itIfStack(
    "CENTINELA DE FIXTURE: el orquestador resuelve surface=true con lineas del seed CO",
    async () => {
      // Separa "el fixture esta mal" de "el cableado esta roto". Sin esta
      // afirmacion, un snapshot mal formado haria fallar el test del choke
      // point y se leeria como que la pantalla no se surfacea.
      const { getSupabaseAdminClient } = await import(
        "@/lib/supabase/service-role"
      );
      const { resolveGuidedContention } = await import(
        "@/lib/free/guided-contention"
      );
      const care = await resolveGuidedContention(
        getSupabaseAdminClient(),
        userId,
        "PERMA-PROFILER",
      );

      expect(care.surface).toBe(true);
      // Una pantalla de cuidado sin lineas no ofrece ruta: el orquestador cae
      // a NONE si el seed CO no trae telefonos, y eso debe distinguirse.
      expect(care.lines.length).toBeGreaterThan(0);
      expect(care.lines.every((l) => Boolean(l.phone))) .toBe(true);
    },
  );

  itIfStack(
    "EL GUARDIA: con las 4 pruebas cerradas y distress del servidor, el choke point RENDERIZA la pantalla de cuidado en vez de redirigir",
    async () => {
      await setShowContention(true);
      const { redirected, element } = await runDonePage();

      // Esta es la afirmacion que ninguna de las 3 capas previas podia hacer:
      // que el FLUJO GUIADO, en `allComplete`, devuelva la pantalla.
      expect(redirected).toBe(false);
      expect(element).toBeTruthy();

      const name =
        typeof element.type === "function"
          ? (element.type.name ?? "")
          : String(element.type);
      expect(name).toBe("PermaCareScreen");
      // Las lineas llegan a la pantalla: el acuse de seguridad sin recursos no
      // sirve de nada.
      expect(element.props.lines.length).toBeGreaterThan(0);
      // Y el cierre sigue disponible — la pantalla intercala, no atrapa.
      expect(typeof element.props.continueHref).toBe("string");
      expect(element.props.continueHref.length).toBeGreaterThan(0);
    },
  );

  itIfStack(
    "DELTA DE LA MISMA ENTRADA: sin la decision de distress del servidor, el MISMO choke point redirige al cierre",
    async () => {
      // Mitad de control. Sin ella, un fixture que siempre renderiza la
      // pantalla pasaria el test de arriba sin probar que la DECISION manda:
      // hay que ver el mismo camino tomar la otra salida con la unica
      // diferencia siendo el booleano del servidor.
      await setShowContention(false);
      const { redirected, element } = await runDonePage();

      expect(redirected).toBe(true);
      expect(element).toBeNull();
    },
  );
});
