/**
 * Sentry server SDK init — Plan 01-11 (Wave 7).
 *
 * Inicializa el SDK del runtime Node (route handlers, server components,
 * server actions). Mismo `beforeSend` hook que el cliente — la superficie
 * de redact es identica (COMPL-14).
 *
 * El DSN del server vive en `SENTRY_DSN` (NO `NEXT_PUBLIC_*`) para que
 * no se filtre al bundle del cliente. Cuando esta vacio, `Sentry.init` es
 * no-op (mismo comportamiento que el cliente).
 *
 * Anchors:
 *  - 01-11-PLAN.md tasks/Task 1 step 4.
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
