/**
 * Integration tests — POST /api/feedback ownership check (Plan 01-09 Task 2,
 * IDOR mitigation follow-up from background security review on commit 4f09666).
 *
 * Threat (now mitigated): the original handler trusted the `sessionId` from
 * the request body and inserted feedback_event with `user_id = JWT.sub`
 * without verifying that the JWT user actually owned the session. An
 * authenticated user A could submit feedback against user B's session,
 * polluting B's report metrics and creating an attribution mismatch (row
 * tagged A, linked to B's session). The follow-up commit adds an ownership
 * check that returns 404 for any non-owner caller.
 *
 * ESTADO DE LA COBERTURA — leerlo antes de confiar en este archivo.
 *
 * Lo que SI se verifica aqui: import del modulo + rechazo Zod strict de campos
 * desconocidos + 400 por body invalido. Eso NO es la mitigacion IDOR.
 *
 * `Las 5 aserciones de ownership estan declaradas con it.todo, no escritas.`
 * Hasta el paso 3 de ADR-039 eran bloques gateados por DATABASE_URL cuyo cuerpo
 * era `expect(true).toBe(true)`: con DB presente reportaban `passed` sin
 * verificar nada, y la auditoria original los clasifico como cobertura REAL por
 * eso. **El control existe en produccion** (`app/api/feedback/route.ts:96-120`,
 * 404 al no-dueño) **y este archivo es el unico de toda la suite que toca
 * `/api/feedback`** — o sea, la mitigacion no tiene hoy ningun guard.
 * Registrado en `tests/lint/compliance-guard-map.test.ts` (COMPL-17 sobre
 * `POST /api/feedback`, status "gap") y en `[GAP-COMPL17-FEEDBACK-IDOR-SIN-GUARD]`.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6 (survey).
 *  - 01-CONTEXT.md D3.4 (anonymous self-report allowed).
 *  - COMPL-17 (Zod strict input validation).
 *  - Threat: IDOR (Insecure Direct Object Reference).
 */
// @vitest-environment node
import { describe, expect, it } from "vitest";

describe("Plan 01-09 Task 2 — POST /api/feedback (IDOR mitigation)", () => {
  it("module imports without throwing (file exists + exports POST)", async () => {
    const mod = await import("@/app/api/feedback/route");
    expect(typeof mod.POST).toBe("function");
    expect(mod.runtime).toBe("nodejs");
  });

  it("rejects body with unknown fields (Zod strict — COMPL-17)", async () => {
    const mod = await import("@/app/api/feedback/route");
    const req = new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // user_id is the IDOR vector the original Zod schema already
      // rejected — verify the strict-mode wall is still up.
      body: JSON.stringify({
        sessionId: "00000000-0000-0000-0000-000000000000",
        stars: 5,
        user_id: "attacker-supplied",
      }),
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(body.error).toBe("invalid_body");
  });

  it("rejects body with stars out of range", async () => {
    const mod = await import("@/app/api/feedback/route");
    const req = new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "00000000-0000-0000-0000-000000000000",
        stars: 0,
      }),
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects body with non-uuid sessionId", async () => {
    const mod = await import("@/app/api/feedback/route");
    const req = new Request("http://test.local/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: "not-a-uuid", stars: 3 }),
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
  });

  // --- DB-gated ownership invariants (Plan 01-12 CI Postgres) ---

  // Plan 01-12 CI implements the full flow:
  //   1. Seed two assessment_session rows with user_id = userA, userB.
  //   2. Build a request with JWT for userA, body.sessionId = sessionB.id.
  //   3. Assert response status === 404 with error 'not_found'.
  //   4. Assert no feedback_event row was inserted.
  it.todo("authenticated user A submitting against user B's session returns 404 (IDOR blocked)");

  // Plan 01-12 CI implements:
  //   1. Seed two anonymous_session rows with distinct anonymous_session_id.
  //   2. Build request with cookie='anonymous_session_id=X', body.sessionId = Y.id.
  //   3. Assert response status === 404.
  it.todo("anonymous caller submitting against another anon's session returns 404");

  // Happy path for anonymous self-report.
  it.todo("anonymous caller with matching cookie can submit feedback for own session (D3.4)");

  it.todo("authenticated user can submit feedback for own session");

  // Probing UUID space must return the same 404 as ownership mismatch.
  it.todo("non-existent sessionId returns 404 (does not leak existence)");
});
