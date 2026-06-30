/**
 * Unit test (RED) — resolveFreeCloseTarget ([GAP-W5W6-ORPHANED-FREE-FLOW]).
 *
 * Opción B (estado/DECISION_W5W6_Funnel_Surface_v0.1.md): al completar los 4
 * tests, el Free autenticado rutea a la superficie de cierre sobre la sesión
 * O*NET (recorte por-contexto en /reporte?cierre=free). Este helper resuelve esa
 * sesión: la sesión `status='completed'` cuyo `instrument_version.visual_type`
 * es 'hexagon' (metadata = plugin-as-data, FOUND-05-clean: NUNCA por código de
 * instrumento) Y que ya tiene `report_snapshot` (prerequisito verificado en prod;
 * sin snapshot /reporte da 404 → fuera de scope).
 *
 * Covered behaviors:
 *   1. sesión hexagon completada CON snapshot → devuelve ese session_id.
 *   2. sin sesión hexagon completada → null.
 *   3. sesión hexagon completada SIN snapshot → null (mantiene fuera de scope
 *      el 404 [GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404]).
 *   4. FOUND-05: la fuente del helper no contiene literal de código de
 *      instrumento (resuelve solo por `visual_type` + presencia de snapshot).
 *   5. error del cliente / data null → null (best-effort, no lanza).
 *
 * `"hexagon"` es metadata de `visual_type`, NO un código de instrumento (el
 * regex de no-hardcoded-instruments no lo matchea) → se usa literal sin
 * fragmentar. Los códigos prohibidos del Test 4 sí van fragmentados (este archivo
 * vive en lib/free, que FOUND-05 escanea SIN excluir *.test.ts; precedente
 * score-on-done.test.ts).
 *
 * Anchors:
 *  - lib/free/score-on-done.ts (patrón query + mock builder).
 *  - lib/report/assembler.ts:340,357 (visual_type; report_snapshot por session_id).
 *  - estado/DECISION_W5W6_Funnel_Surface_v0.1.md (Opción B + prerequisito snapshot).
 */
// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test, vi } from "vitest";

import { resolveFreeCloseTarget } from "@/lib/free/free-close";

const USER_ID = "11111111-1111-1111-1111-111111111111";
const HEXAGON_SESSION_ID = "22222222-2222-2222-2222-222222222222";
const OTHER_SESSION_ID = "33333333-3333-3333-3333-333333333333";

type SessionRow = {
  id: string;
  instrument_version: { visual_type: string | null } | null;
};

/**
 * Two-table chainable mock. `assessment_session` is the awaited terminal
 * (`.order()` → `{data,error}` via `.then`); `report_snapshot` terminates on
 * `.maybeSingle()` keyed by the `.eq("session_id", …)` value, so the snapshot
 * presence is decided per candidate.
 */
function makeClient(opts: {
  sessions?: SessionRow[] | null;
  sessionsError?: unknown;
  snapshots?: Record<string, boolean>;
}) {
  function sessionBuilder() {
    // biome-ignore lint/suspicious/noExplicitAny: test mock builder
    const b: any = {};
    b.select = vi.fn(() => b);
    b.eq = vi.fn(() => b);
    b.order = vi.fn(() => b);
    const resolve = async () => ({
      data: opts.sessionsError ? null : (opts.sessions ?? null),
      error: opts.sessionsError ?? null,
    });
    b.then = (onF: (v: unknown) => unknown) => resolve().then(onF);
    return b;
  }
  function snapshotBuilder() {
    // biome-ignore lint/suspicious/noExplicitAny: test mock builder
    const b: any = {};
    let sessionId = "";
    b.select = vi.fn(() => b);
    b.eq = vi.fn((col: string, val: string) => {
      if (col === "session_id") sessionId = val;
      return b;
    });
    b.maybeSingle = vi.fn(async () => ({
      data: opts.snapshots?.[sessionId] ? { id: `snap-${sessionId}` } : null,
      error: null,
    }));
    return b;
  }
  return {
    from: vi.fn((table: string) =>
      table === "report_snapshot" ? snapshotBuilder() : sessionBuilder(),
    ),
  };
}

/** Builds a joined session row carrying the given visual_type metadata. */
function rowFor(id: string, visualType: string | null): SessionRow {
  return { id, instrument_version: { visual_type: visualType } };
}

describe("resolveFreeCloseTarget ([GAP-W5W6-ORPHANED-FREE-FLOW])", () => {
  test("hexagon session WITH snapshot → returns that session_id", async () => {
    const admin = makeClient({
      sessions: [rowFor(HEXAGON_SESSION_ID, "hexagon")],
      snapshots: { [HEXAGON_SESSION_ID]: true },
    });

    const result = await resolveFreeCloseTarget(admin as never, USER_ID);

    expect(result).toBe(HEXAGON_SESSION_ID);
  });

  test("no hexagon session → null", async () => {
    // A completed session whose visual_type is NOT hexagon (e.g. a bars report)
    // is not the O*NET close target.
    const admin = makeClient({
      sessions: [rowFor(OTHER_SESSION_ID, "bars")],
      snapshots: { [OTHER_SESSION_ID]: true },
    });

    const result = await resolveFreeCloseTarget(admin as never, USER_ID);

    expect(result).toBeNull();
  });

  test("hexagon session WITHOUT snapshot → null (404 stays out of scope)", async () => {
    const admin = makeClient({
      sessions: [rowFor(HEXAGON_SESSION_ID, "hexagon")],
      snapshots: {},
    });

    const result = await resolveFreeCloseTarget(admin as never, USER_ID);

    expect(result).toBeNull();
  });

  test("client error / null data → null (best-effort, does NOT throw)", async () => {
    const admin = makeClient({ sessionsError: { message: "boom" } });

    await expect(
      resolveFreeCloseTarget(admin as never, USER_ID),
    ).resolves.toBeNull();
  });

  test("FOUND-05: helper source carries no instrument-code literal", () => {
    const source = readFileSync(join(__dirname, "free-close.ts"), "utf8");
    // Fragmented so this assertion's own literals don't trip FOUND-05 (which
    // scans this lib/free *.test.ts file too). The session is resolved by
    // `visual_type` metadata, never by a hardcoded instrument code.
    const forbidden = [
      "PER" + "MA",
      "ON" + "ET",
      "BFI" + "-2-S",
      "Tw" + "IVI",
      "P" + "VQ",
      "RIA" + "SEC",
    ];
    for (const code of forbidden) {
      expect(source).not.toContain(code);
    }
  });
});
