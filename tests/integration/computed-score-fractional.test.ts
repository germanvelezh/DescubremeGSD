/**
 * Integration test — `computed_score.raw` tiene que aceptar medias fraccionarias.
 *
 * POR QUE EXISTE ESTE TEST.
 *
 * `computed_score.raw` nacio `integer not null` (mig 002, 2026-06-06), cuando el
 * unico tipo de formula seedeado era `sum`. El 2026-06-12 entraron los dos
 * primeros instrumentos `mean` — TwIVI (10 reglas, pares de items) y
 * PERMA-Profiler (9 reglas, tercias) — y `meanFormula` NO redondea
 * (`lib/scoring/formulas/mean.ts:20`, `total / item_codes.length`). Desde ese dia
 * cada media que no cae entera revienta el INSERT con Postgres `22P02`
 * (invalid_text_representation).
 *
 * EL DEFECTO NO ERA "NO ESCRIBE": ERA "ESCRIBE A MEDIAS, EN SILENCIO".
 *
 * El error se traga a proposito en `score-session.ts:395` — decision correcta,
 * porque el `report_snapshot` sigue siendo serializable y el usuario igual tiene
 * que recibir su reporte. La consecuencia es que la perdida depende de lo que el
 * usuario respondio: `sum` (BFI-2-S, O*NET-IP-SF) siempre da entero y nunca
 * falla; `mean` falla solo cuando la suma no es divisible. En prod se midio
 * exactamente eso — 4 usuarios con PERMA 9/9 completo conviviendo con 2 cuentas
 * a las que les faltaban 15 filas entre PERMA y TwIVI.
 *
 * POR QUE UN TEST DE DB Y NO UNO UNITARIO.
 *
 * El desajuste vive entre el float de JS y el tipo de la columna. Ningun test
 * en proceso lo ve: el interpreter devuelve `4.5` correctamente y el schema
 * declara `integer` correctamente. Solo el round-trip contra Postgres los
 * confronta.
 *
 * POR QUE AFIRMA IGUALDAD EXACTA Y NO "no tiro error".
 *
 * Afirmar solo que el INSERT entra dejaria pasar un fix por redondeo
 * (`Math.round` antes del insert), que hace verde el test y le entrega al titular
 * un valor que el motor nunca calculo. La igualdad con `4.5` cierra las dos
 * puertas: la que rompe y la que falsifica.
 *
 * El otro lector de la tabla es el export ARCO (`app/api/me/data/route.ts:139`,
 * COMPL-05, art. 15 Ley 1581): un array `computed_scores` poblado pero
 * incompleto, sin nada en la respuesta que declare cuanto falta.
 *
 * Anchors:
 *   - ADR-042 (integer -> numeric).
 *   - mig 018_computed_score_raw_numeric.sql.
 *   - lib/scoring/formulas/mean.ts, lib/scoring/score-session.ts:380-397.
 */
// @vitest-environment node
import { afterAll, describe, expect, it } from "vitest";

const HAS_STACK = Boolean(process.env.DATABASE_URL);
const itIfStack = it.skipIf(!HAS_STACK);

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

afterAll(async () => {
  if (sql) await sql.end({ timeout: 5 });
});

describe("computed_score.raw acepta medias fraccionarias", () => {
  // Centinela de no-vacuidad: si el stack cambia y ya no queda ninguna regla
  // `mean` seedeada, el test de abajo pasaria sin afirmar nada del dominio.
  itIfStack("el stack seedea reglas `mean` (si no, el test de abajo es vacuo)", async () => {
    const s = await getSql();
    const [{ n }] = await s<{ n: string }[]>`
      select count(*)::text as n
      from public.scoring_rule
      where formula->>'type' = 'mean'
    `;
    expect(Number(n)).toBeGreaterThan(0);
  });

  itIfStack("una media de .5 persiste con el decimal intacto", async () => {
    const s = await getSql();

    // Una regla `mean` real del seed — no una sintetica: el FK y el
    // `scoring_version` salen del mismo dato que usa produccion.
    const [rule] = await s<{ id: string; scoring_version: string }[]>`
      select id, scoring_version
      from public.scoring_rule
      where formula->>'type' = 'mean'
      limit 1
    `;
    expect(rule).toBeDefined();

    const userId = crypto.randomUUID();
    await s`
      insert into public."user" (id, email)
      values (${userId}, ${`fractional-${userId}@test.local`})
    `;

    try {
      // 4.5 es la media literal de un par TwIVI (4,5) — la forma exacta que
      // producia 22P02 en produccion.
      await s`
        insert into public.computed_score (user_id, scoring_rule_id, raw, scoring_version)
        values (${userId}, ${rule.id}, ${4.5}, ${rule.scoring_version})
      `;

      const [row] = await s<{ raw: string }[]>`
        select raw::text as raw
        from public.computed_score
        where user_id = ${userId}
      `;

      // Igualdad exacta: descarta tanto el 22P02 como un fix por redondeo.
      expect(Number(row.raw)).toBe(4.5);
    } finally {
      // El cascade de `public.user` se lleva la fila de computed_score (D1.5).
      await s`delete from public."user" where id = ${userId}`;
    }
  });
});
