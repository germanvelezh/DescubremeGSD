/**
 * Sentry edge SDK init — Plan 01-11 (Wave 7).
 *
 * Inicializa el SDK para el runtime edge (middleware.ts + cualquier route
 * con `runtime = 'edge'`). El edge runtime es restringido (sin algunos
 * Node APIs), por eso el SDK ofrece un build separado — Next.js lo
 * resuelve automaticamente via la exportacion condicional de
 * `@sentry/nextjs`.
 *
 * Mismo `beforeSend` hook que client/server (COMPL-14).
 *
 * Anchors:
 *  - 01-11-PLAN.md tasks/Task 1 step 5.
 *  - lib/sentry-config.ts::sentryBeforeSend.
 */
import * as Sentry from "@sentry/nextjs";

import { sentryBeforeSend } from "./lib/sentry-config";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Cast estructural — ver nota en sentry.client.config.ts.
  // biome-ignore lint/suspicious/noExplicitAny: SDK shape adaptor.
  beforeSend: sentryBeforeSend as any,
  tracesSampleRate: 0.1,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
});
