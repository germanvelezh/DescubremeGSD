/**
 * Cliente de Stripe — singleton de servidor (Plan 03-01, Fase 3).
 *
 * PARA QUE SE USA: crear Checkout Sessions (`/api/checkout`) y verificar la
 * firma de los webhooks (`/api/stripe/webhook`).
 *
 * PARA QUE NO SE USA: nada del lado del cliente. `import "server-only"` hace
 * que importarlo desde un Client Component rompa el build de Next — defensa en
 * profundidad junto al chequeo de la variable de entorno. `STRIPE_SECRET_KEY`
 * es una clave secreta: si llega al bundle del navegador, cualquiera puede
 * emitir cobros y leer datos de pago de todos los clientes.
 *
 * FORMA: copiada de `lib/supabase/service-role.ts` — `server-only`, cache a
 * nivel de modulo, y fallo ruidoso que NOMBRA la variable faltante. Lo que NO
 * se copia de ahi es la semantica de RLS: el cliente de Stripe no tiene nada
 * que ver con RLS.
 *
 * POR QUE SE FIJA `apiVersion`: sin pin, actualizar el SDK cambia la version
 * de la API de Stripe bajo los pies y campos que el codigo lee pueden cambiar
 * de forma sin que nada avise. El tipo `LatestApiVersion` del SDK es un
 * literal, asi que cuando el paquete suba de version esta linea va a fallar en
 * `npm run typecheck` — que es exactamente la senal ruidosa que se busca, en
 * vez de un cambio de comportamiento en produccion.
 *
 * Anchors:
 *   - 03-01-PLAN.md Task 3 step 5.
 *   - lib/supabase/service-role.ts (la forma del singleton).
 *   - Threat register T-03-01-01 (firma del webhook), T-03-01-SC (paquete).
 */
import "server-only";
import Stripe from "stripe";

/**
 * Version de la API de Stripe fijada explicitamente. Coincide con la que trae
 * `stripe@22.3.2`. Al subir el SDK: actualizar aca a proposito, tras leer el
 * changelog — no dejar que cambie sola.
 */
export const STRIPE_API_VERSION = "2026-06-24.dahlia";

let cachedClient: Stripe | null = null;

/**
 * Devuelve el cliente de Stripe, creandolo una sola vez por proceso.
 *
 * Falla ruidosamente cuando falta `STRIPE_SECRET_KEY`. Es deliberado que NO
 * haya fallback ni valor por defecto: un placeholder en una ruta que cobra
 * significa o bien un cobro contra la cuenta equivocada, o bien un fallo
 * silencioso justo donde hay dinero de por medio. Mejor romper de una.
 */
export function getStripeClient(): Stripe {
  if (cachedClient) return cachedClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY missing — the Stripe client is unavailable. Set it before serving /api/checkout or /api/stripe/webhook.",
    );
  }

  cachedClient = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
  return cachedClient;
}

/**
 * Lee el secreto de firma del webhook. Separado del cliente porque el webhook
 * lo necesita ANTES de confiar en nada del cuerpo de la peticion.
 */
export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error(
      "STRIPE_WEBHOOK_SECRET missing — webhook signatures cannot be verified.",
    );
  }
  return secret;
}

/**
 * Lee los identificadores de Price. Se leen aca (borde del servidor) y se
 * inyectan a `resolvePrice`, que se mantiene pura.
 */
export function getStripePriceIds(): { usd: string; cop: string } {
  const usd = process.env.STRIPE_PRICE_ID_USD;
  const cop = process.env.STRIPE_PRICE_ID_COP;
  if (!usd || !cop) {
    throw new Error(
      "STRIPE_PRICE_ID_USD / STRIPE_PRICE_ID_COP missing — the Paid price cannot be resolved.",
    );
  }
  return { usd, cop };
}
