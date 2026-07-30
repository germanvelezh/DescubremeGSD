/**
 * D-20 — las dos capas de idempotencia del cobro, contra la base real
 * (Plan 03-01, Fase 3).
 *
 * El Hard Gate del ROADMAP dice que un webhook reintentado NO puede conceder un
 * segundo acceso pagado. Esto se prueba EJECUTANDO EL HANDLER de verdad, con
 * firma valida, contra Postgres — no simulando el SQL. Un test que insertara a
 * mano probaria los indices (que ya se probaron en la migracion) pero no que el
 * handler los use bien, que es donde vive el defecto interesante.
 *
 * Las dos capas son distintas y hacen falta las dos:
 *   (a) MISMO `event.id` dos veces      -> `stripe_event_processed` (capa 1).
 *   (b) event.id DISTINTOS, mismo pago  -> indices parciales (capa 2). La capa
 *       1 no los ve: sus `event.id` difieren.
 *   (c) `payment_status` != 'paid'      -> cero filas, ninguna capa involucrada.
 *
 * TRAMPA DE MEDICION (03-RESEARCH Pitfall 8): sin las variables de entorno
 * estos casos se SALTAN y la suite igual sale verde con menos tests. Un skip no
 * se lee como rojo. Por eso hay una afirmacion final que exige que el bloque
 * haya corrido de verdad cuando el stack esta presente.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves D-20 capas 1 y 2, acceptance_criteria.
 *   - supabase/migrations/020_entitlement_idempotency.sql.
 *   - tests/integration/data-rights.test.ts (patron de gating por stack).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import Stripe from "stripe";

const TEST_WEBHOOK_SECRET = "whsec_test_solo_para_esta_suite";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

const RUN = crypto.randomUUID().slice(0, 8);
let userId = "";
/** Cuenta cuantos casos con base corrieron de verdad (anti-vacuidad). */
let casesRun = 0;

function sign(payload: string): string {
  return Stripe.webhooks.generateTestHeaderString({
    payload,
    secret: TEST_WEBHOOK_SECRET,
  });
}

/** Evento `checkout.session.completed` con la forma que Stripe envia. */
function buildEvent(opts: {
  eventId: string;
  sessionId: string;
  paymentIntentId: string | null;
  paymentStatus?: string;
  clientReferenceId?: string;
}): string {
  return JSON.stringify({
    id: opts.eventId,
    type: "checkout.session.completed",
    data: {
      object: {
        id: opts.sessionId,
        payment_status: opts.paymentStatus ?? "paid",
        payment_intent: opts.paymentIntentId,
        client_reference_id: opts.clientReferenceId ?? userId,
      },
    },
  });
}

async function postWebhook(payload: string): Promise<Response> {
  const { POST } = await import("@/app/api/stripe/webhook/route");
  return POST(
    new Request("https://descubreme.test/api/stripe/webhook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "stripe-signature": sign(payload),
      },
      body: payload,
    }),
  );
}

async function countEntitlements(): Promise<number> {
  const db = await getSql();
  const rows = await db`
    select count(*)::int as n from public.entitlement where user_id = ${userId}
  `;
  return (rows[0] as { n: number }).n;
}

beforeAll(async () => {
  if (!HAS_STACK) return;
  process.env.STRIPE_SECRET_KEY = "sk_test_dummy_key_for_signature_math_only";
  process.env.STRIPE_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;

  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  // El usuario se crea por la Admin API: `entitlement.user_id` referencia
  // `public.user`, que a su vez espeja `auth.users`. Reproducir a mano las
  // columnas obligatorias de un esquema que no es nuestro es fragil.
  const { data, error } = await admin.auth.admin.createUser({
    email: `stripe-idem-${RUN}@test.local`,
    email_confirm: true,
  });
  if (error || !data.user) throw new Error(`no se pudo crear el usuario: ${error?.message}`);
  userId = data.user.id;

  const db = await getSql();
  await db`
    insert into public."user" (id, email)
    values (${userId}, ${`stripe-idem-${RUN}@test.local`})
    on conflict (id) do nothing
  `;
});

afterAll(async () => {
  if (!HAS_STACK) return;
  const db = await getSql();
  if (userId) {
    await db`delete from public.entitlement where user_id = ${userId}`;
    await db`delete from public.stripe_event_processed where event_id like ${`evt_${RUN}%`}`;
    await db`delete from public."user" where id = ${userId}`;
    const { createClient } = await import("@supabase/supabase-js");
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
    await admin.auth.admin.deleteUser(userId);
  }
  await db.end({ timeout: 5 });
});

describe("D-20 — idempotencia del webhook contra la base real", () => {
  itIfStack(
    "capa 1: procesar DOS VECES el mismo event.id deja exactamente 1 entitlement",
    async () => {
      const payload = buildEvent({
        eventId: `evt_${RUN}_capa1`,
        sessionId: `cs_${RUN}_capa1`,
        paymentIntentId: `pi_${RUN}_capa1`,
      });

      const first = await postWebhook(payload);
      const second = await postWebhook(payload);

      // Las dos respuestas son 2xx: un reintento NO es un error para Stripe.
      expect(first.status).toBe(200);
      expect(second.status).toBe(200);
      expect(await countEntitlements()).toBe(1);

      // Y el registro de dedup tiene UNA fila para ese evento.
      const db = await getSql();
      const rows = await db`
        select count(*)::int as n from public.stripe_event_processed
        where event_id = ${`evt_${RUN}_capa1`}
      `;
      expect((rows[0] as { n: number }).n).toBe(1);
      casesRun++;
    },
  );

  itIfStack(
    "capa 2: DOS event.id distintos con el mismo payment_intent dejan 1 entitlement",
    async () => {
      // Este es el caso que la capa 1 NO puede ver: los event.id difieren, asi
      // que `stripe_event_processed` deja pasar los dos. Solo el indice UNIQUE
      // parcial sobre payment_intent_id lo para.
      const paymentIntentId = `pi_${RUN}_capa2`;
      const before = await countEntitlements();

      const a = await postWebhook(
        buildEvent({
          eventId: `evt_${RUN}_capa2_a`,
          sessionId: `cs_${RUN}_capa2_a`,
          paymentIntentId,
        }),
      );
      const b = await postWebhook(
        buildEvent({
          eventId: `evt_${RUN}_capa2_b`,
          sessionId: `cs_${RUN}_capa2_b`,
          paymentIntentId,
        }),
      );

      expect(a.status).toBe(200);
      expect(b.status).toBe(200);

      const db = await getSql();
      const rows = await db`
        select count(*)::int as n from public.entitlement
        where user_id = ${userId} and payment_intent_id = ${paymentIntentId}
      `;
      expect((rows[0] as { n: number }).n).toBe(1);
      // Y solo se agrego UNO al total.
      expect(await countEntitlements()).toBe(before + 1);
      casesRun++;
    },
  );

  itIfStack(
    "capa 2 bis: sin payment_intent, el mismo checkout_session tampoco duplica",
    async () => {
      // `payment_status: 'no_payment_required'` produce sesiones sin
      // PaymentIntent. Es el hueco exacto que el UNIQUE literal de D-20 dejaba
      // abierto y que la opcion `parcial` cierra con el segundo indice.
      const sessionId = `cs_${RUN}_sin_pi`;
      const before = await countEntitlements();

      await postWebhook(
        buildEvent({
          eventId: `evt_${RUN}_sinpi_a`,
          sessionId,
          paymentIntentId: null,
        }),
      );
      await postWebhook(
        buildEvent({
          eventId: `evt_${RUN}_sinpi_b`,
          sessionId,
          paymentIntentId: null,
        }),
      );

      const db = await getSql();
      const rows = await db`
        select count(*)::int as n from public.entitlement
        where user_id = ${userId} and checkout_session_id = ${sessionId}
      `;
      expect((rows[0] as { n: number }).n).toBe(1);
      expect(await countEntitlements()).toBe(before + 1);
      casesRun++;
    },
  );

  itIfStack(
    "un evento con payment_status != 'paid' deja CERO entitlement",
    async () => {
      const before = await countEntitlements();

      const res = await postWebhook(
        buildEvent({
          eventId: `evt_${RUN}_impago`,
          sessionId: `cs_${RUN}_impago`,
          paymentIntentId: `pi_${RUN}_impago`,
          paymentStatus: "unpaid",
        }),
      );

      // 200: el evento llego bien y se acusa; simplemente no concede.
      expect(res.status).toBe(200);
      expect(await countEntitlements()).toBe(before);
      casesRun++;
    },
  );

  itIfStack(
    "una firma invalida no escribe NINGUNA fila en stripe_event_processed",
    async () => {
      const db = await getSql();
      const beforeRows = await db`
        select count(*)::int as n from public.stripe_event_processed
      `;
      const beforeCount = (beforeRows[0] as { n: number }).n;

      const payload = buildEvent({
        eventId: `evt_${RUN}_firmamala`,
        sessionId: `cs_${RUN}_firmamala`,
        paymentIntentId: `pi_${RUN}_firmamala`,
      });
      const { POST } = await import("@/app/api/stripe/webhook/route");
      const res = await POST(
        new Request("https://descubreme.test/api/stripe/webhook", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "stripe-signature": "t=1,v1=deadbeef",
          },
          body: payload,
        }),
      );

      expect(res.status).toBe(400);
      const afterRows = await db`
        select count(*)::int as n from public.stripe_event_processed
      `;
      expect((afterRows[0] as { n: number }).n).toBe(beforeCount);
      casesRun++;
    },
  );

  itIfStack(
    "el usuario NO puede insertarse su propio entitlement (RLS, T-03-01-03)",
    async () => {
      // La mitad de base de datos del guard doble. Se usa el cliente ANON con
      // el rol `authenticated`, NO service_role: una conexion service_role
      // salta RLS y la afirmacion pasaria vacuamente.
      const db = await getSql();
      let rejected = false;
      try {
        await db.begin(async (tx) => {
          await tx`select set_config('role', 'authenticated', true)`;
          await tx`select set_config('request.jwt.claims', ${JSON.stringify({ sub: userId, role: "authenticated" })}, true)`;
          await tx`
            insert into public.entitlement (user_id, product_code, status)
            values (${userId}, 'paid', 'active')
          `;
        });
      } catch {
        rejected = true;
      }
      // `entitlement` no tiene politica de escritura: deny por defecto.
      expect(rejected).toBe(true);
      casesRun++;
    },
  );

  it("anti-vacuidad: con el stack presente, los casos con base CORRIERON", () => {
    // Sin esto, olvidar las variables de entorno deja la suite verde con 6
    // tests menos y un skip no se lee como rojo (Pitfall 8 del research).
    if (!HAS_STACK) {
      expect(casesRun).toBe(0);
      return;
    }
    expect(casesRun).toBe(6);
  });
});
