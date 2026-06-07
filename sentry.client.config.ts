/**
 * Sentry browser SDK init — Plan 01-11 (Wave 7).
 *
 * Inicializa el SDK del cliente con el `beforeSend` redact hook definido en
 * `lib/sentry-config.ts` (Plan 01-09). El hook elimina PII antes de que el
 * evento salga del navegador (COMPL-14).
 *
 * DSN del cliente vive en `NEXT_PUBLIC_SENTRY_DSN`. Cuando esta vacio (dev
 * local sin Sentry provisionado), `Sentry.init` se vuelve no-op silencioso
 * — comportamiento deseado en Phase 1, el provisioning del DSN real es
 * tarea de deploy en Phase 7.
 *
 * Anchors:
 *  - 01-11-PLAN.md tasks/Task 1 step 3.
 *  - lib/sentry-config.ts::sentryBeforeSend.
 *  - SKELETON.md "Compliance-by-design".
 */
import * as Sentry from "@sentry/nextjs";

import { sentryBeforeSend } from "./lib/sentry-config";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // `sentryBeforeSend` usa una forma estructural minima (MinimalSentryEvent)
  // para evitar una dependencia de runtime sobre `@sentry/*` types. El SDK
  // espera `ErrorEvent`; ambas comparten la subform de campos que tocamos
  // (user, extra, request). El cast es seguro: el hook solo lee/escribe
  // campos opcionales y devuelve la misma instancia mutada.
  // biome-ignore lint/suspicious/noExplicitAny: SDK shape adaptor.
  beforeSend: sentryBeforeSend as any,
  tracesSampleRate: 0.1,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
});
