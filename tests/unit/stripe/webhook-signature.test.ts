/**
 * T-03-01-01 — la firma del webhook de Stripe (Plan 03-01, Fase 3).
 *
 * `/api/stripe/webhook` es una entrada de TERCERO: cualquiera en internet puede
 * emitir la peticion. Lo unico que distingue a Stripe de un atacante es la
 * firma HMAC sobre el cuerpo CRUDO. Si esa verificacion falla o se salta, un
 * POST cualquiera concede acceso pagado gratis.
 *
 * Las tres afirmaciones que importan:
 *   - firma valida    -> el evento se construye,
 *   - firma alterada  -> lanza, y el handler responde 400 (NO 500),
 *   - timestamp viejo -> lanza (replay), y el handler responde 400.
 *
 * 400 y no 500 no es cosmetico: un 5xx le dice a Stripe "error mio, reintenta",
 * asi que una firma invalida generaria reintentos indefinidos. 4xx dice "tu
 * peticion esta mal", que es la verdad.
 *
 * NINGUNA de estas pruebas toca la red ni necesita credenciales reales: la
 * firma se genera localmente con `generateTestHeaderString` contra un secreto
 * de prueba definido aca mismo. Es el mismo HMAC que usa Stripe.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves (firma invalida -> 400, sin escribir), Task 3 step 11.
 *   - Threat register T-03-01-01 (Spoofing, critical).
 */
import { beforeEach, describe, expect, test, vi } from "vitest";
import Stripe from "stripe";

/** Secreto de PRUEBA, local a este archivo. No es una credencial real. */
const TEST_WEBHOOK_SECRET = "whsec_test_solo_para_esta_suite";

/** Cuerpo minimo con la forma de un checkout.session.completed. */
function buildPayload(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    id: "evt_test_1",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_1",
        payment_status: "paid",
        payment_intent: "pi_test_1",
        client_reference_id: "11111111-1111-1111-1111-111111111111",
      },
    },
    ...overrides,
  });
}

function sign(payload: string, timestamp?: number): string {
  return Stripe.webhooks.generateTestHeaderString({
    payload,
    secret: TEST_WEBHOOK_SECRET,
    ...(timestamp === undefined ? {} : { timestamp }),
  });
}

/** Peticion como la que emitiria Stripe. */
function webhookRequest(payload: string, signature: string | null): Request {
  const headers = new Headers({ "content-type": "application/json" });
  if (signature !== null) headers.set("stripe-signature", signature);
  return new Request("https://descubreme.test/api/stripe/webhook", {
    method: "POST",
    headers,
    body: payload,
  });
}

describe("constructEvent — la verificacion criptografica en si", () => {
  const stripe = new Stripe("sk_test_dummy_key_for_signature_math_only", {
    apiVersion: "2026-06-24.dahlia",
  });

  test("una firma valida construye el evento", () => {
    const payload = buildPayload();
    const event = stripe.webhooks.constructEvent(
      payload,
      sign(payload),
      TEST_WEBHOOK_SECRET,
    );

    expect(event.id).toBe("evt_test_1");
    expect(event.type).toBe("checkout.session.completed");
  });

  test("una firma alterada lanza", () => {
    const payload = buildPayload();
    const tampered = sign(payload).replace(/v1=([0-9a-f])/, (_m, c) =>
      `v1=${c === "a" ? "b" : "a"}`,
    );

    expect(() =>
      stripe.webhooks.constructEvent(payload, tampered, TEST_WEBHOOK_SECRET),
    ).toThrow();
  });

  test("un cuerpo modificado con firma del cuerpo original lanza", () => {
    // El ataque real: interceptar un evento legitimo y cambiarle el monto o el
    // usuario, reusando su firma. La firma cubre el cuerpo, asi que no pega.
    const original = buildPayload();
    const signature = sign(original);
    const modified = original.replace("cs_test_1", "cs_test_ATACANTE");

    expect(() =>
      stripe.webhooks.constructEvent(modified, signature, TEST_WEBHOOK_SECRET),
    ).toThrow();
  });

  test("un timestamp fuera de tolerancia lanza (replay)", () => {
    const payload = buildPayload();
    const hoursAgo = Math.floor(Date.now() / 1000) - 60 * 60 * 24;

    expect(() =>
      stripe.webhooks.constructEvent(
        payload,
        sign(payload, hoursAgo),
        TEST_WEBHOOK_SECRET,
      ),
    ).toThrow();
  });

  test("el secreto equivocado lanza", () => {
    const payload = buildPayload();

    expect(() =>
      stripe.webhooks.constructEvent(payload, sign(payload), "whsec_otro"),
    ).toThrow();
  });
});

describe("POST /api/stripe/webhook — codigos de respuesta", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy_key_for_signature_math_only";
    process.env.STRIPE_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;
  });

  async function postWebhook(payload: string, signature: string | null) {
    const { POST } = await import("@/app/api/stripe/webhook/route");
    return POST(webhookRequest(payload, signature));
  }

  test("firma alterada -> 400, no 500", async () => {
    const payload = buildPayload();
    const tampered = sign(payload).replace(/v1=([0-9a-f])/, (_m, c) =>
      `v1=${c === "a" ? "b" : "a"}`,
    );

    const res = await postWebhook(payload, tampered);

    // 500 le diria a Stripe "error mio, reintenta" -> reintentos infinitos.
    expect(res.status).toBe(400);
  });

  test("firma ausente -> 400 (no se asume confianza por ausencia)", async () => {
    const res = await postWebhook(buildPayload(), null);

    expect(res.status).toBe(400);
  });

  test("timestamp fuera de tolerancia -> 400 (replay rechazado)", async () => {
    const payload = buildPayload();
    const dayAgo = Math.floor(Date.now() / 1000) - 60 * 60 * 24;

    const res = await postWebhook(payload, sign(payload, dayAgo));

    expect(res.status).toBe(400);
  });

  test("firma valida con tipo distinto de checkout.session.completed -> 200 sin efecto", async () => {
    // El endpoint solo debe estar suscrito a checkout.session.completed, pero
    // no puede confiar en la configuracion del Dashboard para su correccion.
    const payload = JSON.stringify({
      id: "evt_otro_tipo",
      type: "payment_intent.succeeded",
      data: { object: { id: "pi_x" } },
    });

    const res = await postWebhook(payload, sign(payload));

    expect(res.status).toBe(200);
  });

  test("el runtime declarado es nodejs (Buffer + crypto; nunca Edge)", async () => {
    const mod = await import("@/app/api/stripe/webhook/route");

    expect(mod.runtime).toBe("nodejs");
  });
});
