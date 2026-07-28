/**
 * CI gate QUAL-08 / T-01-08-02 — `baremo_fallback_event` no vincula PII.
 *
 * Por que existe este archivo: la mitigacion T-01-08-02 (Information
 * Disclosure) es *el esquema mismo* — la tabla de telemetria de fallback de
 * baremos no debe poder atribuirse a una persona. Hasta ADR-039, la unica
 * mencion en todo el repo a ese control era un **comentario dentro de un test
 * hueco** (`tests/integration/baremo-telemetry.test.ts:35`, cuerpo =
 * `expect(hasDb).toBe(true)`). El test documentaba literalmente el chequeo que
 * no hacia, y borrarlo por redundante habria dejado la mitigacion con cero
 * vigilantes.
 *
 * Deliberadamente MAS ESTRICTO que la letra de ADR-039, y conviene que el
 * revisor lo vea: el ADR pide asertar la ausencia de `user_id`. Una blocklist
 * de nombres no *pinnea* nada — una migracion futura que agregue `session_id`,
 * `subject_id` o `ip_address` pasaria limpia. La intencion declarada del ADR es
 * "pinnear contra una migracion futura que reintroduzca PII", y eso exige fijar
 * el set completo de columnas: cualquier columna nueva rompe el gate y obliga a
 * releer T-01-08-02 antes de seguir. La asercion nominal de `user_id` se
 * conserva aparte para que el mensaje de falla nombre la amenaza.
 *
 * No necesita DB: `getTableConfig` lee la definicion Drizzle, no el catalogo de
 * Postgres. La correspondencia esquema-Drizzle <-> tabla-real la cubre la
 * migracion 008 y el gate COMPL-15.
 *
 * Anchors:
 *   - estado/DECISIONS_LOG.md ADR-039 (exclusion QUAL-08).
 *   - db/schema/baremo-fallback-event.ts (contrato + rationale).
 *   - supabase/migrations/008_baremo_fallback_event.sql (contrato SQL).
 *   - 01-PLAN-01-08.md threat T-01-08-02.
 */
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, test } from "vitest";

import * as schema from "@/db/schema";

// Las 5 columnas verificadas en prod al firmar ADR-039. Orden alfabetico para
// que el diff de una columna nueva sea legible.
const EXPECTED_COLUMNS = [
  "baremo_used",
  "country_requested",
  "id",
  "instrument_version_id",
  "occurred_at",
];

const columnNames = () =>
  getTableConfig(schema.baremoFallbackEvent).columns.map((c) => c.name);

describe("QUAL-08 / T-01-08-02: baremo_fallback_event no vincula PII", () => {
  test("no tiene columna user_id (la mitigacion que el test hueco solo comentaba)", () => {
    const names = new Set(columnNames());
    expect(
      names.has("user_id"),
      "baremo_fallback_event tiene user_id: rompe T-01-08-02 (la telemetria de fallback pasa a ser atribuible a una persona)",
    ).toBe(false);
  });

  test("el set de columnas esta pinneado: una columna nueva exige revisar T-01-08-02", () => {
    expect(
      columnNames().sort(),
      "cambio el set de columnas de baremo_fallback_event. Si la columna nueva puede vincular a una persona (session_id, subject_id, ip, user_agent...), T-01-08-02 la prohibe. Si no, agregala a EXPECTED_COLUMNS.",
    ).toEqual(EXPECTED_COLUMNS);
  });
});
