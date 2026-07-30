/**
 * D-15 — `block_size` como DATO: regresiones puras (Plan 03-02 Task 2).
 *
 * `resolveBlockPosition` NO cambia en este plan: ya recibia `blockSize` como
 * tercer parametro. Lo que cambia es QUIEN decide ese numero — antes el branch
 * `runnerCode === "ONET-IP-SF" && totalItems === 60 ? 12 : null` en el Server
 * Component; ahora `instrument_version.block_size`.
 *
 * Por eso este archivo afirma dos cosas distintas:
 *   1. La funcion pura sigue devolviendo exactamente lo mismo para O*NET (5x12).
 *      Si esto enrojece, la generalizacion fue una regresion.
 *   2. Con 96 items y bloques de 12 devuelve 8 bloques — el caso de VIA-IS-P-96,
 *      probado con valores SINTETICOS porque VIA no esta sembrado todavia (su
 *      verificacion sobre datos reales es el plan 03-06). El valor de esta
 *      asercion es que demuestra que la matematica ya soporta el caso sin tocar
 *      codigo: sembrar el instrumento con `block_size = 12` basta.
 *
 * Las dos aserciones que tocan la BASE —que el backfill dejo 12 en O*NET y que
 * `getInstrumentVersionMeta` transporta el dato— viven en
 * `tests/integration/block-size-data.test.ts`, NO aca: `tests/unit/**` corre sin
 * `DATABASE_URL` en un `npm run test:unit` local, y un test de base ahi se
 * SKIPEA en silencio (y un skip no se lee como rojo en este proyecto).
 *
 * Anchors:
 *   - lib/free/runner-navigation.ts (resolveBlockPosition).
 *   - supabase/migrations/019_instrument_version_block_size.sql.
 *   - 03-UI-SPEC.md §5 (VIA-IS-P-96 = 8 bloques de 12).
 */
import { describe, expect, test } from "vitest";

import { resolveBlockPosition } from "@/lib/free/runner-navigation";

/** 60 items en bloques de 12 — el comportamiento vivo de O*NET IP-SF. */
const ONET_TOTAL_ITEMS = 60;
/** 96 items en bloques de 12 — VIA-IS-P-96, valores sinteticos (03-06 lo siembra). */
const VIA_TOTAL_ITEMS = 96;
const BLOCK_SIZE = 12;

describe("D-15: la funcion pura no cambio — regresion de O*NET 5x12", () => {
  test("primer item -> bloque 1 de 5, item 1 de 12", () => {
    expect(resolveBlockPosition(1, ONET_TOTAL_ITEMS, BLOCK_SIZE)).toEqual({
      block: 1,
      totalBlocks: 5,
      itemInBlock: 1,
      blockSize: BLOCK_SIZE,
    });
  });

  test("borde de bloque: item 12 cierra el bloque 1, item 13 abre el 2", () => {
    expect(resolveBlockPosition(12, ONET_TOTAL_ITEMS, BLOCK_SIZE)).toMatchObject(
      { block: 1, itemInBlock: 12 },
    );
    expect(resolveBlockPosition(13, ONET_TOTAL_ITEMS, BLOCK_SIZE)).toMatchObject(
      { block: 2, itemInBlock: 1 },
    );
  });

  test("ultimo item -> bloque 5 de 5, item 12 de 12", () => {
    expect(resolveBlockPosition(60, ONET_TOTAL_ITEMS, BLOCK_SIZE)).toEqual({
      block: 5,
      totalBlocks: 5,
      itemInBlock: 12,
      blockSize: BLOCK_SIZE,
    });
  });
});

describe("D-15: un instrumento SIN block_size renderiza la barra continua", () => {
  test("blockSize null -> null, para cualquier N de items", () => {
    // Es el caso de BFI-2-S (30), TwIVI (20) y PERMA (23) hoy: su fila de
    // instrument_version no tiene block_size, asi que el meta trae null.
    expect(resolveBlockPosition(5, 30, null)).toBeNull();
    expect(resolveBlockPosition(1, 20, null)).toBeNull();
    expect(resolveBlockPosition(23, 23, null)).toBeNull();
  });

  test("un block_size no positivo tambien cae a la barra continua", () => {
    // Defensa en profundidad: el CHECK de la migracion 019 ya rechaza estos
    // valores en la base, asi que esto solo puede llegar por un dato corrupto.
    expect(resolveBlockPosition(5, 60, 0)).toBeNull();
    expect(resolveBlockPosition(5, 60, -12)).toBeNull();
  });
});

describe("D-15: 96 items en bloques de 12 dan 8 bloques (VIA, valores sinteticos)", () => {
  test("el total de bloques sale de la aritmetica, no de una tabla por instrumento", () => {
    expect(resolveBlockPosition(1, VIA_TOTAL_ITEMS, BLOCK_SIZE)).toEqual({
      block: 1,
      totalBlocks: 8,
      itemInBlock: 1,
      blockSize: BLOCK_SIZE,
    });
  });

  test("el item 48 cierra el bloque 4 — el punto medio de D-16", () => {
    expect(resolveBlockPosition(48, VIA_TOTAL_ITEMS, BLOCK_SIZE)).toMatchObject({
      block: 4,
      totalBlocks: 8,
      itemInBlock: 12,
    });
    expect(resolveBlockPosition(49, VIA_TOTAL_ITEMS, BLOCK_SIZE)).toMatchObject({
      block: 5,
      itemInBlock: 1,
    });
  });

  test("el ultimo item -> bloque 8 de 8", () => {
    expect(resolveBlockPosition(96, VIA_TOTAL_ITEMS, BLOCK_SIZE)).toMatchObject({
      block: 8,
      totalBlocks: 8,
      itemInBlock: 12,
    });
  });

  test("un total que no es multiplo del bloque deja un ultimo bloque corto", () => {
    // 57 items (PVQ-RR) en bloques de 12 -> 5 bloques, el ultimo de 9.
    expect(resolveBlockPosition(57, 57, BLOCK_SIZE)).toMatchObject({
      block: 5,
      totalBlocks: 5,
      itemInBlock: 9,
    });
  });
});
