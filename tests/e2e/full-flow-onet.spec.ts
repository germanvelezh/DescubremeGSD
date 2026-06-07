/**
 * E2E full-flow with signup — Plan 01-09 Task 2.
 *
 * Walking Skeleton COMPLETO: usuario anonimo → 60 items → signup + dual
 * consent + edad ≥ 18 → magic-link callback (mock) → claim sesion →
 * /reporte/[sessionId] renderiza con (a) hexagono full SVG con role=img +
 * sr-only table, (b) top-3 letras visibles, (c) frase reveladora, (d)
 * seccion ocupaciones con tono D3.3 verbatim, (e) Disclosure ficha tecnica,
 * (f) footer chip "Este reporte no es clinico", (g) survey 5-star, (h)
 * waitlist checkbox.
 *
 * Execution: requires a running dev server + seeded DB + completed
 * report_snapshot row. Plan 01-12 sets up CI Postgres + seed bootstrap;
 * until then this spec is a contract scaffold.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6.
 *  - 01-CONTEXT.md D3.1-D3.12.
 *  - PLAN 01-09 Task 2 <behavior> Test E2E.
 */
import { expect, test } from "@playwright/test";

const HAS_DB = !!process.env.DATABASE_URL;
const HAS_SEEDED_REPORT_SESSION = !!process.env.E2E_REPORT_SESSION_ID;

test.describe("Plan 01-09 — full-flow O*NET with report (Walking Skeleton)", () => {
  test.skip(
    !HAS_DB || !HAS_SEEDED_REPORT_SESSION,
    "Requires DATABASE_URL and E2E_REPORT_SESSION_ID (seeded session with report_snapshot)",
  );

  test("reporte renders Capa 1 above-fold + ficha + footer NFR-27 + survey + waitlist", async ({
    page,
  }) => {
    const sessionId = process.env.E2E_REPORT_SESSION_ID;
    await page.goto(`/reporte/${sessionId}`);

    // (a) Hexagono full SVG with role=img + sr-only table.
    const svg = page.locator('svg[role="img"]');
    await expect(svg).toBeVisible();
    await expect(page.locator("table.sr-only")).toBeAttached();

    // (b) Top-3 letras visibles above the hexagono.
    const top3Heading = page.getByLabel(/Tus tres dimensiones principales:/);
    await expect(top3Heading).toBeVisible();

    // (c) Frase reveladora (placeholder OK).
    await expect(page.getByText(/Cowork|tu perfil|preferencias/i)).toBeVisible();

    // (d) Seccion ocupaciones verbatim D3.3.
    await expect(
      page.getByRole("heading", {
        name: /Areas donde gente con tu perfil suele encontrar engagement/i,
      }),
    ).toBeVisible();

    // (e) Disclosure ficha tecnica trigger present.
    await expect(
      page.getByRole("button", { name: /ficha tecnica/i }),
    ).toBeVisible();

    // (f) Footer chip "Este reporte no es clinico" verbatim.
    await expect(
      page.getByText(/Este reporte no es clinico/i).first(),
    ).toBeVisible();
    await expect(page.locator('a[href="#nfr27-long"]')).toBeVisible();

    // (g) Survey 5-star radio group present.
    await expect(
      page.locator('fieldset[role="radiogroup"]'),
    ).toBeVisible();
    // 5 estrellas total (los inputs son radio sr-only).
    await expect(page.locator('input[type="radio"][name="stars"]')).toHaveCount(5);

    // (h) Waitlist checkbox present.
    await expect(
      page.getByLabel(/Avisame cuando este listo/i),
    ).toBeVisible();
  });

  test("ocupaciones tono is verbatim D3.3 (no 'tu carrera ideal')", async ({
    page,
  }) => {
    const sessionId = process.env.E2E_REPORT_SESSION_ID;
    await page.goto(`/reporte/${sessionId}`);
    const html = await page.content();
    // Verbatim presence of D3.3 phrase.
    expect(html).toMatch(/Areas donde gente con tu perfil suele encontrar engagement/i);
    // Anti-determinismo: must NOT contain the forbidden phrase.
    expect(html.toLowerCase()).not.toContain("tu carrera ideal");
  });
});
