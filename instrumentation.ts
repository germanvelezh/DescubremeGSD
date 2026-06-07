/**
 * Next.js instrumentation hook — Plan 01-11 (Wave 7).
 *
 * Carga la inicializacion de Sentry segun el runtime de Next.js.
 * Convencion Next.js 16: `instrumentation.ts` en root + funcion `register()`
 * invocada una vez por proceso al arranque (server, edge, o cliente
 * via instrumentation-client cuando aplique).
 *
 * Anchors:
 *  - 01-11-PLAN.md tasks/Task 1 step 2.
 *  - SKELETON.md "Compliance-by-design" — Sentry beforeSend redact ACTIVO en runtime.
 *  - lib/sentry-config.ts (Plan 01-09 — sentryBeforeSend hook).
 */

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
