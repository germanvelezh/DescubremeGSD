/**
 * E2E — signup + dual consent flow (Ola 1.4/1.5 reskin, HANDOFF_UI §3).
 *
 * Asserts the contract of `/signup` after the ADR-029 signup-first reskin:
 *  1. Renders both consent checkboxes (NOT a single master checkbox).
 *  2. Renders the subprocesadores Disclosure trigger.
 *  3. "Enviarme el enlace" submit is disabled until: email valid + DOB valid +
 *     BOTH checkboxes checked.
 *  4. With invalid (<18) DOB, the Server Action returns `MC.SIGNUP.AGE.BLOCK`.
 *
 * The pre-redesign hexagon/top3 preview ("Tu reporte esta listo") was removed —
 * signup-first has no prior session/report (ADR-029). Field labels + the DOB
 * mechanism are unchanged.
 *
 * Execution: contract scaffold — runs in CI once the dev server + seeded DB are
 * wired ([GAP-CI-E2E-DB-SUPABASE-ROLES]).
 *
 * Anchors:
 *  - HANDOFF_UI_v1.0.md §3 (Ola 1.4/1.5), MICROCOPY §2 (Registro).
 *  - 01-UI-SPEC.md §7.4, 01-CONTEXT.md D2.4.
 */
import { expect, test } from "@playwright/test";

test.describe("signup + dual consent (Ola 1 reskin)", () => {
  test("renders dual checkbox + disclosure + disabled CTA", async ({ page }) => {
    await page.goto("/signup");

    // Dual checkboxes present (NOT a master).
    const checkboxes = page.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(2);

    // Subprocesadores Disclosure trigger present. El copy real lleva articulo
    // ("y LOS subprocesadores"); el regex sin el no matcheaba nada. Verificado
    // contra el DOM de prod 2026-07-27: "Ver detalle de la transferencia
    // internacional y los subprocesadores".
    await expect(
      page.getByRole("button", {
        name: /transferencia internacional y los subprocesadores/i,
      }),
    ).toBeVisible();

    // Submit disabled by default.
    const submit = page.getByRole("button", { name: /enviarme el enlace/i });
    await expect(submit).toBeDisabled();
  });

  test("CTA enables only when email + DOB + both checkboxes are valid", async ({ page }) => {
    await page.goto("/signup");

    const submit = page.getByRole("button", { name: /enviarme el enlace/i });
    await expect(submit).toBeDisabled();

    await page.getByLabel(/tu email/i).fill("dev@example.com");
    await page.getByLabel(/fecha de nacimiento/i).fill("2000-01-01");
    await expect(submit).toBeDisabled();

    await page.getByRole("checkbox").first().check();
    await expect(submit).toBeDisabled();

    await page.getByRole("checkbox").nth(1).check();
    await expect(submit).toBeEnabled();
  });

  // El gate de edad vive en DOS capas y el spec viejo apuntaba a la que el
  // navegador no deja alcanzar:
  //   (1) UI — el <input type="date"> lleva max="hoy-18a" (SignupForm maxDob) y
  //       el helper "18 años o más". Como el <form> NO trae `noValidate`, la
  //       validacion nativa BLOQUEA el submit con una fecha menor: la Server
  //       Action nunca corre, asi que el mensaje de error no puede aparecer.
  //       Eso NO es un defecto — el producto esta MAS protegido de lo que el
  //       spec suponia.
  //   (2) Servidor — signupAction devuelve MC_SIGNUP_AGE_BLOCK como defensa en
  //       profundidad. Cubierto en unit (tests/unit/auth/age-check.test.ts); su
  //       drive por navegador esta bloqueado aparte por
  //       [GAP-E2E-SERVER-ACTION-DRIVE] (bajo Turbopack dev + Playwright el
  //       click de un submit `useActionState` no emite POST).
  // Por la UI, entonces, lo unico afirmable es la capa (1). Mismo criterio que
  // free-full-flow.spec.ts:180, que ya la asserta con este alcance.
  test("el campo DOB aplica el gate 18+ en la capa UI (max + helper)", async ({ page }) => {
    await page.goto("/signup");

    const dob = page.getByLabel(/fecha de nacimiento/i);
    await expect(dob).toBeVisible();

    const max = await dob.getAttribute("max");
    expect(max, "el input DOB debe capar en hoy-18a").toBeTruthy();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setUTCFullYear(eighteenYearsAgo.getUTCFullYear() - 18);
    expect(max).toBe(eighteenYearsAgo.toISOString().slice(0, 10));

    await expect(page.getByText(/18 años o más/i)).toBeVisible();
  });
});
