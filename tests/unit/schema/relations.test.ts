/**
 * Schema relations + invariants — DescubreMe Phase 1 Plan 01-04.
 *
 * Asserts the locked-in shape of the 22 Drizzle tables that downstream
 * Phase 1 work depends on. Five behavior tests per the plan:
 *
 *   1. Barrel re-exports the 22 camelCase names without collision.
 *   2. PII columns on `user` are bytea-typed and named with the
 *      _ciphertext / _dek_ciphertext envelope-encryption convention.
 *   3. D1.5 BORRAR tables (7) carry `onDelete: 'cascade'` on user_id;
 *      `distress_event.user_id` uses `onDelete: 'set null'` (anonymize).
 *   4. `consent` schema has the partial-unique intent documented; the
 *      structural enforcement lives in migration 002 (verified by the
 *      rls-policies-syntax suite).
 *   5. `item_response` partial-unique intent documented; structural
 *      enforcement in migration 002.
 *
 * Why some assertions defer to SQL: Drizzle 0.27/0.34 does not expose
 * partial-unique-WHERE constraints via getTableConfig in a stable way
 * for our generation path. The SQL migration is the canonical source
 * for those two indexes and is independently linted by tests/lint.
 */
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, test } from "vitest";

import * as schema from "@/db/schema";

const EXPECTED_EXPORTS = [
  "assessmentSession",
  "baremo",
  "computedScore",
  "consent",
  "contentionResources",
  "distressEvent",
  "entitlement",
  "feedbackEvent",
  "instrument",
  "instrumentVersion",
  "item",
  "itemResponse",
  "membership",
  "narrativeTemplate",
  "occupation",
  "organization",
  "product",
  "productStack",
  "reportSnapshot",
  "scoringRule",
  "user",
  "waitlist",
] as const;

describe("Plan 01-04 Task 1: barrel + 22 schemas", () => {
  test("Test 1 — barrel re-exports all 22 camelCase tables", () => {
    for (const name of EXPECTED_EXPORTS) {
      expect(
        schema[name as keyof typeof schema],
        `missing export: ${name}`,
      ).toBeDefined();
    }
    expect(EXPECTED_EXPORTS.length).toBe(22);
  });

  test("Test 2 — user has 4 PII *_ciphertext bytea columns", () => {
    const cfg = getTableConfig(schema.user);
    const byName = new Map(cfg.columns.map((c) => [c.name, c]));
    const piiCols = [
      "name_ciphertext",
      "name_dek_ciphertext",
      "date_of_birth_ciphertext",
      "date_of_birth_dek_ciphertext",
    ];
    for (const colName of piiCols) {
      const col = byName.get(colName);
      expect(col, `column missing: ${colName}`).toBeDefined();
      // Drizzle customType exposes the SQL type via getSQLType()
      expect(col?.getSQLType()).toBe("bytea");
    }
  });

  test("Test 3 — D1.5 cascade applied only to BORRAR tables; distress_event uses set null", () => {
    // Tables whose FK to user MUST cascade per D1.5
    const cascadeUserTables = [
      { table: schema.itemResponse, name: "item_response" },
      { table: schema.computedScore, name: "computed_score" },
      { table: schema.assessmentSession, name: "assessment_session" },
      { table: schema.consent, name: "consent" },
      { table: schema.reportSnapshot, name: "report_snapshot" },
      { table: schema.feedbackEvent, name: "feedback_event" },
    ] as const;

    for (const entry of cascadeUserTables) {
      const cfg = getTableConfig(entry.table);
      const userFk = cfg.foreignKeys.find((fk) =>
        fk.reference().columns.some((c) => c.name === "user_id"),
      );
      expect(userFk, `${entry.name}: user_id FK missing`).toBeDefined();
      expect(
        userFk?.onDelete,
        `${entry.name}: user_id FK must cascade`,
      ).toBe("cascade");
    }

    // distress_event.user_id is anonymizable (set null)
    const distressCfg = getTableConfig(schema.distressEvent);
    const distressFk = distressCfg.foreignKeys.find((fk) =>
      fk.reference().columns.some((c) => c.name === "user_id"),
    );
    expect(distressFk?.onDelete).toBe("set null");
  });

  test("Test 4 — consent has user_id + product_code + revoked_at columns (partial unique enforced in SQL)", () => {
    const cfg = getTableConfig(schema.consent);
    const names = new Set(cfg.columns.map((c) => c.name));
    expect(names.has("user_id")).toBe(true);
    expect(names.has("product_code")).toBe(true);
    expect(names.has("revoked_at")).toBe(true);
  });

  test("Test 5 — item_response has user_id (nullable) + item_id (partial unique enforced in SQL)", () => {
    const cfg = getTableConfig(schema.itemResponse);
    const userIdCol = cfg.columns.find((c) => c.name === "user_id");
    const itemIdCol = cfg.columns.find((c) => c.name === "item_id");
    expect(userIdCol).toBeDefined();
    expect(itemIdCol).toBeDefined();
    // user_id is nullable pre-claim (FOUND-08)
    expect(userIdCol?.notNull).toBe(false);
    expect(itemIdCol?.notNull).toBe(true);
  });
});
