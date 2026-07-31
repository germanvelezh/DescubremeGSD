/**
 * D-10 — el seed del BFI-2-60 y la llave de proyeccion, contra la base real
 * (Plan 03-04 Task 1).
 *
 * POR QUE ES UN TEST DE INTEGRACION.
 *
 * Lo que este archivo protege no vive en ninguna funcion: vive en el DATO. Si
 * `item_code` queda sin poblar en los 60 items, la proyeccion Free->Paid
 * devuelve los 60 y **el reuso desaparece en silencio** — sin error, sin log,
 * solo un usuario que paga y vuelve a responder 30 preguntas que ya respondio.
 * Ninguna funcion pura enrojece por eso: la funcion pura seguiria siendo
 * correcta. Solo la base puede desmentirlo.
 *
 * LA ASERCION QUE HACE VERIFICABLE A D-10 es la de la INTERSECCION: el conjunto
 * de `item_code` del BFI-2-S tiene que estar CONTENIDO en el del BFI-2-60 y
 * cruzarlos tiene que dar exactamente 30. Contar 60 items no basta —un seed con
 * los 60 `item_code` en NULL, o numerados en otro espacio, pasaria ese conteo.
 *
 * LA SEGUNDA FAMILIA DE ASERCIONES es sobre la CLAVE INVERSA, y existe porque
 * el pack §4 lo dice sin rodeos: "un error en la tabla de inversiones destruye
 * la interpretabilidad factorial de forma irrecuperable". Un `reverse_key` mal
 * transcrito produce un puntaje silenciosamente equivocado que ninguna prueba
 * tecnica detecta. Aca los ordinales inversos se RECALCULAN desde las filas de
 * `item` sembradas y se diffean contra el JSON de `scoring_rule`, de modo que un
 * desliz en CUALQUIERA de los dos archivos enrojece.
 *
 * Anchors:
 *   - db/seeds/instruments/BFI-2-60/{items,scoring-rule}.sql.
 *   - db/seeds/instruments/BFI-2-S/items.sql (la otra mitad de la llave).
 *   - implementation_packs/BFI-2-60_..._Consolidado.md §1.3, §4.
 *   - tests/integration/block-size-data.test.ts (plantilla de gating + sql).
 */
// @vitest-environment node
import { afterAll, describe, expect, it } from "vitest";

const HAS_STACK = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const itIfStack = it.skipIf(!HAS_STACK);

const PAID_FORM = "BFI-2-60";
const FREE_FORM = "BFI-2-S";
const PAID_ITEM_COUNT = 60;
const SHARED_ITEM_COUNT = 30;
const BFI_DOMAINS = ["EXT", "AGR", "CON", "NEG", "OPN"];

/**
 * UNICA divergencia de enunciado tolerada entre las dos formas para un mismo
 * `item_code`, y esta declarada, no descubierta aqui: el seed del BFI-2-S mapea
 * su item 6 a 'BFI-2-60-21' (codigo CORRECTO segun el pack del BFI-2-S §1.1,
 * cuyo item 6 en ingles es "Is dominant, acts as a leader") pero le puso el
 * texto es de BFI-2 #6 ("Con una personalidad asertiva"). El BFI-2-60 siembra
 * los dos enunciados correctos. No se toca el BFI-2-S: cambiar el texto de un
 * item VIVO es decision de contenido de Cowork/German, no de este plan.
 * [GAP-BFI2S-STEM-ITEM-6]
 *
 * Se afirma como conjunto EXACTO a proposito: si aparece una divergencia NUEVA
 * el test enrojece, y si alguien ARREGLA esta el test tambien enrojece — que es
 * lo que obliga a borrar la excepcion en vez de dejarla envejecer.
 */
const KNOWN_STEM_DIVERGENCE = ["BFI-2-60-21"];

type Sql = ReturnType<typeof import("postgres").default>;
let sql: Sql | null = null;

async function getSql(): Promise<Sql> {
  if (sql) return sql;
  const { default: postgres } = await import("postgres");
  sql = postgres(process.env.DATABASE_URL as string, { max: 2 });
  return sql;
}

afterAll(async () => {
  if (sql) await sql.end();
});

interface ItemRow {
  sequence_number: number;
  item_code: string | null;
  dimension: string | null;
  reverse_key: boolean;
  stem: string;
}

async function loadItems(code: string): Promise<ItemRow[]> {
  const db = await getSql();
  return db<ItemRow[]>`
    select it.sequence_number, it.item_code, it.dimension, it.reverse_key, it.stem
    from item it
    join instrument_version iv on iv.id = it.instrument_version_id
    join instrument i on i.id = iv.instrument_id
    where i.code = ${code}
      and iv.version = '1.0'
      and iv.lang = 'es-CO'
    order by it.sequence_number
  `;
}

describe("D-10 seed: el banco de 60 items del BFI-2-60", () => {
  itIfStack("tiene exactamente 60 items", async () => {
    const items = await loadItems(PAID_FORM);
    expect(items).toHaveLength(PAID_ITEM_COUNT);
  });

  itIfStack(
    "los 60 tienen item_code no nulo y 60 valores DISTINTOS",
    async () => {
      const items = await loadItems(PAID_FORM);
      expect(items).toHaveLength(PAID_ITEM_COUNT);

      const missing = items
        .filter((it) => it.item_code == null || it.item_code.trim() === "")
        .map((it) => it.sequence_number);
      expect(
        missing,
        `item_code vacio en las secuencias ${missing.join(", ")}. Sin item_code la proyeccion D-10 devuelve los 60 y el reuso Free->Paid desaparece SIN error.`,
      ).toEqual([]);

      const distinct = new Set(items.map((it) => it.item_code));
      expect(distinct.size).toBe(PAID_ITEM_COUNT);
    },
  );

  itIfStack(
    "item_count declarado en instrument_version coincide con las filas sembradas",
    async () => {
      const db = await getSql();
      const [row] = await db<{ item_count: number | null }[]>`
        select iv.item_count
        from instrument_version iv
        join instrument i on i.id = iv.instrument_id
        where i.code = ${PAID_FORM}
      `;
      // resolveTotalItems prefiere item_count; si mintiera, el runner mostraria
      // "de N" con un N que no existe.
      expect(row?.item_count).toBe(PAID_ITEM_COUNT);
    },
  );

  itIfStack("30 items directos y 30 inversos (pack §4)", async () => {
    const items = await loadItems(PAID_FORM);
    const reverse = items.filter((it) => it.reverse_key);
    expect(reverse).toHaveLength(30);
  });

  itIfStack("12 items por dominio, 5 dominios", async () => {
    const items = await loadItems(PAID_FORM);
    const byDim = new Map<string, number>();
    for (const it of items) {
      byDim.set(it.dimension ?? "?", (byDim.get(it.dimension ?? "?") ?? 0) + 1);
    }
    expect([...byDim.keys()].sort()).toEqual([...BFI_DOMAINS].sort());
    for (const dim of BFI_DOMAINS) {
      expect(byDim.get(dim), `dominio ${dim}`).toBe(12);
    }
  });
});

describe("D-10 llave de proyeccion: BFI-2-S es subconjunto del BFI-2-60", () => {
  itIfStack(
    "la interseccion de item_code tiene EXACTAMENTE 30 elementos y el del Free esta CONTENIDO en el del Paid",
    async () => {
      const paid = await loadItems(PAID_FORM);
      const free = await loadItems(FREE_FORM);

      // Control de no-vacuidad: sin esto, dos conjuntos vacios tendrian
      // interseccion vacia y "contencion" trivialmente cierta.
      expect(paid.length).toBe(PAID_ITEM_COUNT);
      expect(free.length).toBe(SHARED_ITEM_COUNT);

      const paidCodes = new Set(paid.map((it) => it.item_code));
      const freeCodes = free.map((it) => it.item_code);

      const orphans = freeCodes.filter((c) => c == null || !paidCodes.has(c));
      expect(
        orphans,
        `codigos del BFI-2-S que NO existen en el BFI-2-60: ${orphans.join(", ")}. La contencion es la premisa entera de D-10.`,
      ).toEqual([]);

      const intersection = freeCodes.filter((c) => c != null && paidCodes.has(c));
      expect(new Set(intersection).size).toBe(SHARED_ITEM_COUNT);
    },
  );

  itIfStack(
    "los 30 codigos compartidos llevan el mismo enunciado en las dos formas, salvo la divergencia declarada",
    async () => {
      const paid = await loadItems(PAID_FORM);
      const free = await loadItems(FREE_FORM);

      const paidStemByCode = new Map(
        paid.map((it) => [it.item_code as string, it.stem]),
      );
      const divergent = free
        .filter((it) => {
          const other = paidStemByCode.get(it.item_code as string);
          return other != null && other !== it.stem;
        })
        .map((it) => it.item_code as string)
        .sort();

      expect(
        divergent,
        "Un item_code compartido con DOS enunciados distintos significa que la respuesta arrastrada por D-10 se aplica a una pregunta que el usuario no leyo. Si esta lista crece, hay un error de transcripcion nuevo; si se vacia, borra KNOWN_STEM_DIVERGENCE.",
      ).toEqual([...KNOWN_STEM_DIVERGENCE].sort());
    },
  );

  itIfStack(
    "la clave inversa coincide en los codigos compartidos",
    async () => {
      const paid = await loadItems(PAID_FORM);
      const free = await loadItems(FREE_FORM);

      const paidByCode = new Map(
        paid.map((it) => [it.item_code as string, it]),
      );
      const mismatched: string[] = [];
      for (const it of free) {
        const other = paidByCode.get(it.item_code as string);
        if (!other) continue;
        if (other.reverse_key !== it.reverse_key) {
          mismatched.push(it.item_code as string);
        }
        if (other.dimension !== it.dimension) {
          mismatched.push(`${it.item_code} (dominio)`);
        }
      }
      // Aca NO hay excepcion tolerada: arrastrar un valor a un item con la
      // clave invertida al reves es un puntaje al reves, no un matiz de texto.
      expect(mismatched).toEqual([]);
    },
  );
});

describe("D-10 scoring: los codigos de dominio se reusan tal cual", () => {
  itIfStack(
    "las dimensiones del scoring_rule del BFI-2-60 son IDENTICAS a las del BFI-2-S",
    async () => {
      const db = await getSql();
      const rows = await db<{ code: string; dimension: string }[]>`
        select i.code, sr.dimension
        from scoring_rule sr
        join instrument_version iv on iv.id = sr.instrument_version_id
        join instrument i on i.id = iv.instrument_id
        where i.code in (${PAID_FORM}, ${FREE_FORM})
      `;
      const paidDims = rows
        .filter((r) => r.code === PAID_FORM)
        .map((r) => r.dimension)
        .sort();
      const freeDims = rows
        .filter((r) => r.code === FREE_FORM)
        .map((r) => r.dimension)
        .sort();

      expect(freeDims).toEqual([...BFI_DOMAINS].sort());
      // Diferencia vacia en las DOS direcciones. Es lo que permite heredar las
      // 15 filas de narrative_template del BFI-2-S sin sembrar ninguna nueva:
      // narrative_template no tiene discriminador por instrumento (migracion
      // 015), asi que la herencia la produce el nombre del codigo.
      expect(paidDims).toEqual(freeDims);
    },
  );

  itIfStack(
    "los inversos declarados en el scoring_rule se derivan de las filas de item sembradas",
    async () => {
      const db = await getSql();
      const items = await loadItems(PAID_FORM);
      expect(items).toHaveLength(PAID_ITEM_COUNT);

      // Recalcular el esquema POSICIONAL <dimension><ordinal> igual que lo
      // sintetiza lib/scoring/score-session.ts: ordinal = rango dentro del
      // dominio por sequence_number.
      const expectedReverse = new Map<string, string[]>();
      const expectedAll = new Map<string, string[]>();
      for (const dim of BFI_DOMAINS) {
        const ofDim = items
          .filter((it) => it.dimension === dim)
          .sort((a, b) => a.sequence_number - b.sequence_number);
        expectedAll.set(
          dim,
          ofDim.map((_, idx) => `${dim}${idx + 1}`),
        );
        expectedReverse.set(
          dim,
          ofDim
            .map((it, idx) => (it.reverse_key ? `${dim}${idx + 1}` : null))
            .filter((c): c is string => c != null),
        );
      }

      const rules = await db<{ dimension: string; formula: unknown }[]>`
        select sr.dimension, sr.formula
        from scoring_rule sr
        join instrument_version iv on iv.id = sr.instrument_version_id
        join instrument i on i.id = iv.instrument_id
        where i.code = ${PAID_FORM}
      `;
      expect(rules).toHaveLength(BFI_DOMAINS.length);

      for (const rule of rules) {
        const formula = rule.formula as {
          item_codes: string[];
          reverse_keyed: string[];
          scale: [number, number];
        };
        expect(formula.scale).toEqual([1, 5]);
        expect(
          formula.item_codes,
          `item_codes de ${rule.dimension}`,
        ).toEqual(expectedAll.get(rule.dimension));
        // ESTA es la asercion que atrapa un reverse_key mal transcrito: los
        // ordinales inversos salen de las FILAS, no de una lista copiada.
        expect(
          [...formula.reverse_keyed].sort(),
          `reverse_keyed de ${rule.dimension} no coincide con los reverse_key sembrados en item`,
        ).toEqual([...(expectedReverse.get(rule.dimension) ?? [])].sort());
        expect(formula.reverse_keyed).toHaveLength(6);
      }
    },
  );
});

describe("D-10 stack: el BFI-2-60 es el primer instrumento EXCLUSIVO del Paid", () => {
  itIfStack("aparece en product_stack 'paid' y NO en 'free'", async () => {
    const db = await getSql();
    const rows = await db<{ product_code: string }[]>`
      select ps.product_code
      from product_stack ps
      join instrument_version iv on iv.id = ps.instrument_version_id
      join instrument i on i.id = iv.instrument_id
      where i.code = ${PAID_FORM}
    `;
    const codes = rows.map((r) => r.product_code).sort();
    // Exclusividad: es lo que hace verificable la MITAD POSITIVA del guard de
    // /test/* (criterio 5 del ROADMAP), que hasta ahora no tenia sujeto.
    expect(codes).toEqual(["paid"]);
  });

  itIfStack("el stack del Paid crece a 3 filas y sigue sin duplicados", async () => {
    const db = await getSql();
    const rows = await db<{ instrument_version_id: string; order: number }[]>`
      select ps.instrument_version_id, ps."order"
      from product_stack ps
      where ps.product_code = 'paid'
      order by ps."order"
    `;
    // 03-01 sembro 2 (O*NET order 4, PERMA order 7); este plan anade 1.
    expect(rows).toHaveLength(3);
    expect(new Set(rows.map((r) => r.instrument_version_id)).size).toBe(3);
    expect(rows.map((r) => r.order)).toEqual([1, 4, 7]);
  });

  itIfStack(
    "re-correr el seed no duplica: los INSERT llevan guarda y son idempotentes",
    async () => {
      const db = await getSql();
      const before = await db<{ n: string }[]>`
        select count(*)::text as n
        from item it
        join instrument_version iv on iv.id = it.instrument_version_id
        join instrument i on i.id = iv.instrument_id
        where i.code = ${PAID_FORM}
      `;

      // Re-ejecutar los seeds de verdad (los mismos archivos que corre el
      // reset), no una parafrasis: una copia divergiria en silencio.
      //
      // Conexion PROPIA con `max: 1`: los seeds traen BEGIN/COMMIT explicitos y
      // el driver `postgres` rechaza una transaccion explicita sobre un pool
      // (UNSAFE_TRANSACTION). Se cierra al terminar.
      const { readFileSync } = await import("node:fs");
      const { default: postgres } = await import("postgres");
      const single = postgres(process.env.DATABASE_URL as string, { max: 1 });
      try {
        for (const file of [
          "db/seeds/instruments/BFI-2-60/instrument.sql",
          "db/seeds/instruments/BFI-2-60/instrument-version.sql",
          "db/seeds/instruments/BFI-2-60/items.sql",
          "db/seeds/instruments/BFI-2-60/scoring-rule.sql",
          "db/seeds/instruments/BFI-2-60/baremo.sql",
          "db/seeds/product-stack/paid/seed.sql",
        ]) {
          await single.unsafe(readFileSync(file, "utf8"));
        }
      } finally {
        await single.end();
      }

      const after = await db<{ n: string }[]>`
        select count(*)::text as n
        from item it
        join instrument_version iv on iv.id = it.instrument_version_id
        join instrument i on i.id = iv.instrument_id
        where i.code = ${PAID_FORM}
      `;
      expect(after[0]?.n).toBe(before[0]?.n);
      expect(Number(after[0]?.n)).toBe(PAID_ITEM_COUNT);

      const stack = await db<{ n: string }[]>`
        select count(*)::text as n from product_stack where product_code = 'paid'
      `;
      expect(Number(stack[0]?.n)).toBe(3);
    },
  );
});
