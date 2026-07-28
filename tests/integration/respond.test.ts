/**
 * Integration tests for POST /api/respond — Phase 1 Wave 3 (Plan 01-06).
 *
 * Covers Tasks 2/3 behavior block Test 4:
 *   - Test 4: POST with valid body + cookie -> INSERT item_response with
 *     raw_value matching body + user_id=null.
 *
 * `Test 5 (COMPL-17: user_id en el body -> 400) se borro en el paso 2 de
 * ADR-039.` Era un hueco —cuerpo = plan en comentarios mas una asercion
 * tautologica— y el control YA esta cubierto de verdad sobre esta misma ruta.
 * El mapeo criterio -> guard quedo registrado y verificado por CI en
 * `tests/lint/compliance-guard-map.test.ts`, para que quien busque COMPL-17
 * lea "cubierto por [estos tests]" y no "desaparecido".
 *
 * `Paso 3 de ADR-039:` lo que queda esta declarado con `it.todo`. Antes eran
 * bloques gateados por `DATABASE_URL` que, con DB presente, reportaban
 * `passed` sin verificar nada. `it.todo` no afirma cobertura: la declara
 * pendiente, que es lo unico honesto hasta que se escriban de verdad. El
 * contrato de comportamiento se conserva en los comentarios de cada uno.
 */
// @vitest-environment node
import { describe, it } from "vitest";

describe("POST /api/respond — integration", () => {
  // Placeholder: wired against a real DB in Plan 01-12 CI.
  // Behaviour assertion contract (executable when DATABASE_URL is set):
  //  1. Seed an instrument/version/item + an anonymous session.
  //  2. Build a NextRequest with cookie + JSON body { item_id, raw_value }.
  //  3. Invoke the route handler; assert response.status === 200.
  //  4. SELECT FROM item_response WHERE item_id = ... ; expect raw_value matches.
  //  5. SELECT user_id ; expect null.
  it.todo("Test 4: valid body + cookie inserts item_response with raw_value + user_id=null");

  it.todo("integration contract documented; runtime gated on DATABASE_URL");
});
