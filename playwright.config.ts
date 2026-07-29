/**
 * Playwright 1.48+ configuration — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * Coverage strategy:
 * - 3 projects: mobile-chromium (Pixel 5), mobile-webkit (iPhone 12),
 *   desktop-chromium (Desktop Chrome). Mobile-first per UX-05; webkit
 *   catches Safari quirks that Chromium hides.
 * - No firefox: two engines (Chromium + WebKit) cover the rendering
 *   matrix without doubling CI minutes.
 *
 * `webServer.command` corre `npm run start` (build de produccion) EN CI y
 * `npm run dev` fuera, reusando un server existente para iteracion rapida
 * local. CI tiene `retries: 2` para absorber el flake ocasional del primer
 * magic-link; local tiene 0 para que los flakes salgan a la vista.
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["**/*.spec.ts"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "line" : "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    // EN CI: build de produccion, NUNCA `next dev`.
    //
    // `next dev` (Turbopack) resuelve rutas BAJO DEMANDA, y bajo carga paralela
    // esa resolucion no es determinista: una ruta que existe puede contestar 404
    // porque todavia no esta registrada. Medido en el run `30470225209` de #75,
    // con el MISMO commit en los dos intentos:
    //
    //   intento 1 (rojo):  52 de 52 requests a `*/done` -> 404
    //   re-run   (verde):  18 de 18 requests a `*/done` -> 200
    //
    // Los 404 cubrian `/test/{code}/done` (46) Y `/me/delete/done` (6) — dos
    // arboles de rutas sin nada en comun salvo ser un `page.tsx` hijo de otra
    // ruta ya compilada. De ahi caia todo lo demas: sin `/done` no corre
    // `scoreCompletedSessionIfNeeded`, asi que no hay `report_snapshot` y
    // `/reporte/:id` da 404 (15, que es exactamente el conteo de
    // `report_snapshot_not_found` en el log del server) y el progreso lee cero
    // completados ("Te faltan 4").
    //
    // El fix NO es "esperar mas": es sacar el mecanismo. `next start` sirve un
    // manifest COMPLETO antes de aceptar trafico —el build lista
    // `/test/[code]/done` explicitamente— asi que una ruta no puede estar
    // "todavia no registrada". Verificado local: 33/33 y **0** `*/done` en 404,
    // ademas de mas rapido (51s contra ~2m en dev).
    //
    // El `npm run build` vive en un step propio de ci.yml, no aca, para que un
    // fallo de build se reporte como fallo de build y no como 33 specs rotos.
    command: process.env.CI ? "npm run start" : "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // `stdout` de Playwright default a "ignore" (verificado en
    // playwright/types/test.d.ts) y pino escribe a STDOUT. O sea: cuando una
    // ruta captura un throw y loguea la causa, ese log se DESCARTA en CI.
    //
    // Es exactamente lo que dejo a `[GAP-E2E-FLAKE-RESPOND-500-CONCURRENCIA]`
    // sin diagnosticar: el cuerpo que ve el spec es `{"error":"internal"}`
    // —generico, el catch final de app/api/respond/route.ts— mientras el
    // mensaje que SI nombra la causa sale por `logger.error` a stdout y se
    // pierde. `stderr` ya venia piped por default; el que faltaba era este.
    stdout: "pipe",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-webkit",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
