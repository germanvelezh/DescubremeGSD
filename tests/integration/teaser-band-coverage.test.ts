/**
 * Integration test — el teaser tiene que rendir para perfiles MEDIOS y BAJOS,
 * no solo para los ALTOS ([GAP-TEASER-COBERTURA-BANDAS]).
 *
 * POR QUE ES UN TEST DE INTEGRACION Y NO UNO UNITARIO.
 *
 * El defecto NUNCA estuvo en el evaluador: estuvo en el SEED. `evaluateTeaser`
 * siempre hizo lo correcto — devolvia menos frases porque menos reglas
 * matcheaban. Un unit test con fixtures inventados afirmaria sobre los fixtures
 * y pasaria en verde con el seed roto, que es exactamente el agujero que dejo
 * vivo este gap durante semanas. Por eso las reglas se leen de la DB real.
 *
 * EL DEFECTO, MEDIDO ANTES DEL FIX.
 *
 * Las 14 reglas originales cubrian casi solo la banda ALTO: 8 de las 12 celdas
 * de frase simple (4 instrumentos x 3 bandas) y 5 de 6 cruces exigiendo
 * ALTO+ALTO. Contra el piso de 4 frases del evaluador:
 *
 *   perfil todo-ALTO  -> 4 frases + 2 cruces   OK
 *   perfil todo-MEDIO -> 3 frases + 1 cruce    POR DEBAJO (faltaba PERMA MEDIO)
 *   perfil todo-BAJO  -> 1 frase  + 0 cruces   MUY POR DEBAJO
 *
 * Y degradaba EN SILENCIO: el usuario veia menos contenido sin que nada fallara.
 *
 * POR QUE AFIRMA CONTRA `TEASER_PHRASE_FLOOR` Y NO CONTRA UN NUMERO.
 *
 * El piso es el contrato del evaluador (`MIN_PHRASES`). Escribir `toBe(4)` aca
 * duplicaria esa constante en un segundo lugar y volveria rojo el test ante un
 * cambio legitimo del contrato. Importar el floor hace que el test siga al
 * contrato en vez de competir con el.
 *
 * Anchors:
 *   - lib/integrator/teaser.ts (evaluateTeaser, MIN/MAX_PHRASES, MAX_CROSSES).
 *   - db/seeds/integrator-rule/teaser/seed.sql (las 26 reglas).
 *   - estado/BACKLOG.md [GAP-TEASER-COBERTURA-BANDAS].
 */
// @vitest-environment node
import { afterAll, describe, expect, it } from "vitest";

import {
  evaluateTeaser,
  TEASER_PHRASE_FLOOR,
  type TeaserRuleRow,
} from "@/lib/integrator/teaser";

const HAS_STACK = Boolean(process.env.DATABASE_URL);
const itIfStack = it.skipIf(!HAS_STACK);

const FREE_CODES = ["BFI-2-S", "ONET-IP-SF", "TwIVI", "PERMA-Profiler"] as const;
const BANDS = ["ALTO", "MEDIO", "BAJO"] as const;

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

/** Las reglas tal cual las lee `loadTeaserRules` en produccion. */
async function loadRules(): Promise<TeaserRuleRow[]> {
  const s = await getSql();
  const rows = await s<
    {
      tier: string;
      conditions: unknown;
      template_text: string | null;
      requires_dimensions: string[];
    }[]
  >`
    select tier, conditions, template_text, requires_dimensions
    from public.integrator_rule
    where tier = 'teaser' and lang = 'es-CO' and version = '1.0'
  `;
  return rows.map((r) => ({ ...r }));
}

/** Un perfil donde los 4 instrumentos caen en la misma banda. */
const uniformProfile = (band: string): Record<string, string> =>
  Object.fromEntries(FREE_CODES.map((c) => [c, band]));

afterAll(async () => {
  if (sql) await sql.end({ timeout: 5 });
});

describe("teaser — cobertura por banda ([GAP-TEASER-COBERTURA-BANDAS])", () => {
  // Centinela de no-vacuidad: sin reglas seedeadas el evaluador devuelve
  // `gapResult()` y TODAS las aserciones de abajo se volverian vacuas.
  itIfStack("el seed tiene reglas de teaser (si no, lo de abajo no afirma nada)", async () => {
    const rules = await loadRules();
    expect(rules.length).toBeGreaterThan(0);
    for (const r of rules) {
      expect(r.template_text?.trim()).toBeTruthy();
    }
  });

  // La afirmacion estructural: el defecto era una CELDA FALTANTE en el seed, y
  // esta es la forma directa de fijarlo. Falla en cuanto alguien borre una fila
  // o agregue un instrumento al Free sin su copy de banda.
  itIfStack("las 12 celdas frase-simple (4 instrumentos x 3 bandas) estan cubiertas", async () => {
    const rules = await loadRules();
    const singles = rules.filter((r) => r.requires_dimensions.length === 1);

    const covered = new Set(
      singles.map((r) => {
        const p = (r.conditions as { predicates: { code: string; band: string }[] })
          .predicates[0];
        return `${p.code}|${p.band}`;
      }),
    );

    const missing = FREE_CODES.flatMap((code) =>
      BANDS.filter((band) => !covered.has(`${code}|${band}`)).map(
        (band) => `${code}|${band}`,
      ),
    );
    expect(missing).toEqual([]);
  });

  // El corazon del gap: no basta con que las filas existan, tiene que ALCANZAR
  // el piso al pasar por el evaluador real.
  it.each(BANDS)(
    "un perfil uniforme en banda %s alcanza el piso de frases y al menos un cruce",
    async (band) => {
      if (!HAS_STACK) return;
      const rules = await loadRules();

      const result = evaluateTeaser({
        bandsByInstrument: uniformProfile(band),
        qualityFlaggedCodes: [],
        rules,
      });

      // `gap` y `locked` son los dos modos degradados; ninguno es aceptable con
      // los 4 instrumentos presentes y el seed completo.
      expect(result.kind).toBe("teaser");
      if (result.kind !== "teaser") return;

      expect(result.phrases.length).toBeGreaterThanOrEqual(TEASER_PHRASE_FLOOR);
      expect(result.crosses.length).toBeGreaterThanOrEqual(1);
    },
  );

  // Regresion del encuadre etico: la banda BAJA es intra-persona (jerarquia),
  // nunca carencia. Se afirma sobre el copy que un perfil BAJO recibe de verdad,
  // no sobre el seed entero — es el texto que el usuario lee.
  itIfStack("el copy de banda BAJA no habla de carencia", async () => {
    const rules = await loadRules();
    const result = evaluateTeaser({
      bandsByInstrument: uniformProfile("BAJO"),
      qualityFlaggedCodes: [],
      rules,
    });
    expect(result.kind).toBe("teaser");
    if (result.kind !== "teaser") return;

    const shown = [...result.phrases, ...result.crosses].join(" ").toLowerCase();
    for (const forbidden of [
      "tienes poco",
      "careces",
      "carencia",
      "deficit",
      "déficit",
      "falta de",
      "problema",
      "bajo nivel",
    ]) {
      expect(shown).not.toContain(forbidden);
    }
    // Y positivamente: todo el copy mostrado modaliza, nunca afirma.
    for (const text of [...result.phrases, ...result.crosses]) {
      expect(text).toMatch(/suele|tiende|puede sugerir|parece|aún|aun/i);
    }
  });
});
