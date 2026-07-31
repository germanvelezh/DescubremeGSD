/**
 * La composicion de las filas del paywall (Plan 03-05 Task 1 y Task 2).
 *
 * `composePaidStack` es PURA: recibe filas ya leidas y el historial del usuario,
 * y devuelve lo que la pantalla renderiza. No consulta base, no conoce ningun
 * codigo de instrumento y no asume la constante 113.
 *
 * Lo que estos tests protegen, en una frase: **nunca un precio pegado a una
 * aritmetica que omite instrumentos**. Con cero filas, o con una fila cuyo
 * conteo de items no esta sembrado, el resultado NO es renderizable — es el
 * unico punto de la fase donde una degradacion silenciosa llegaria a alguien
 * que paga.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 1 <behavior>, must_haves Paywall/empty, Paywall/error.
 *   - 03-UI-SPEC.md §1 (estado de stack incompleto), §2 (los tres estados).
 */
import { describe, expect, test } from "vitest";

import { estimateMinutes } from "@/lib/paid/estimate";
import {
  PAID_CORE_LAYER,
  type PaidStackSourceRow,
  composePaidStack,
} from "@/lib/paid/stack";

/** Historial vacio: quien nunca respondio nada (estado frio). */
const COLD = {
  completedVersionIds: new Set<string>(),
  answeredItemCodes: new Set<string>(),
};

function coreRow(
  versionId: string,
  instrumentCode: string,
  itemCount: number,
  itemCodes: (string | null)[] = Array.from({ length: itemCount }, () => null),
): PaidStackSourceRow {
  return {
    versionId,
    instrumentCode,
    itemCount,
    layer: PAID_CORE_LAYER,
    itemCodes,
  };
}

describe("composePaidStack — falla ruidosa antes que lista corta", () => {
  test("sin filas, el resultado NO es renderizable", () => {
    const result = composePaidStack([], COLD);
    expect(result.available).toBe(false);
    // Y no trae filas ni total que un llamador distraido pueda pintar.
    expect(result).not.toHaveProperty("rows");
    expect(result).not.toHaveProperty("totalItems");
  });

  test("una fila core sin conteo de items sembrado tampoco es renderizable", () => {
    // Es el caso peligroso: la lista se veria "casi bien" y el total estaria
    // corto en silencio. `item_count` es nullable en el catalogo, asi que este
    // estado es alcanzable con un seed a medias, no hipotetico.
    const rows: PaidStackSourceRow[] = [
      coreRow("v1", "A", 60),
      { ...coreRow("v2", "B", 1), itemCount: null },
    ];
    const result = composePaidStack(rows, COLD);
    expect(result.available).toBe(false);
    if (result.available) throw new Error("unreachable");
    expect(result.reason).toBe("incomplete");
  });

  test("un conteo de cero se trata igual que uno ausente", () => {
    const rows = [coreRow("v1", "A", 60), { ...coreRow("v2", "B", 1), itemCount: 0 }];
    const result = composePaidStack(rows, COLD);
    expect(result.available).toBe(false);
  });

  test("solo filas de add-on, sin ninguna core, tampoco es renderizable", () => {
    // Un stack cuyo nucleo desaparecio pero cuyos add-ons quedaron sembrados
    // produciria un paywall que cobra por los extras y omite el producto.
    const rows: PaidStackSourceRow[] = [
      { ...coreRow("v1", "A", 24), layer: "addon" },
    ];
    expect(composePaidStack(rows, COLD).available).toBe(false);
  });
});

describe("composePaidStack — la aritmetica cuadra siempre", () => {
  const rows = [coreRow("v1", "A", 60), coreRow("v2", "B", 60), coreRow("v3", "C", 23)];

  test("la suma de los items de las filas es EXACTAMENTE el total", () => {
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    const sum = result.rows.reduce((acc, r) => acc + r.itemCount, 0);
    expect(sum).toBe(result.totalItems);
    expect(result.totalItems).toBe(143);
  });

  test("en frio, el restante es igual al total y el reuso es cero", () => {
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    expect(result.reusedItems).toBe(0);
    expect(result.remainingItems).toBe(result.totalItems);
    expect(result.reuseState).toBe("cold");
  });

  test("los minutos del total son la suma de los minutos que muestran las filas", () => {
    // Si el total se estimara sobre el gran total en vez de sumar las filas,
    // la pantalla mostraria menos minutos que la suma de lo que ella misma
    // acaba de listar. Un usuario que sume las filas encontraria la diferencia.
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    const sumOfRowMinutes = result.rows.reduce((acc, r) => acc + r.minutes, 0);
    expect(result.remainingMinutes).toBe(sumOfRowMinutes);
  });

  test("los minutos de cada fila salen de la misma funcion de estimacion", () => {
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    for (const row of result.rows) {
      expect(row.minutes).toBe(estimateMinutes(row.itemCount));
    }
  });

  test("las filas conservan el orden en que llegan (que es el orden del dato)", () => {
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    expect(result.rows.map((r) => r.versionId)).toEqual(["v1", "v2", "v3"]);
  });

  test("ninguna fila expone el codigo crudo del instrumento como etiqueta", () => {
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    for (const row of result.rows) {
      expect(row.label).not.toBe(row.instrumentCode);
      expect(row.label.length).toBeGreaterThan(0);
    }
  });
});

describe("composePaidStack — el reuso se DERIVA, no se asume", () => {
  // Dos mecanismos distintos de reuso, y los dos tienen que contarse:
  //   1. la MISMA version ya completada (el caso O*NET/PERMA de D-11);
  //   2. `item_code` compartidos entre dos formas (el caso BFI de D-10).
  const rows = [
    // 60 items, de los cuales 30 comparten codigo con una forma corta.
    coreRow(
      "bfi60",
      "BFI-LARGO",
      60,
      Array.from({ length: 60 }, (_, i) => `K-${i + 1}`),
    ),
    coreRow("onet", "INTERESES", 60),
    coreRow("perma", "BIENESTAR", 23),
  ];

  test("una version ya completada cuenta como fila cubierta ENTERA", () => {
    const result = composePaidStack(rows, {
      completedVersionIds: new Set(["onet"]),
      answeredItemCodes: new Set<string>(),
    });
    if (!result.available) throw new Error("expected an available stack");
    const onet = result.rows.find((r) => r.versionId === "onet");
    expect(onet?.reusedCount).toBe(60);
    expect(onet?.remainingCount).toBe(0);
    expect(onet?.fullyReused).toBe(true);
    expect(result.reusedItems).toBe(60);
    expect(result.remainingItems).toBe(143 - 60);
  });

  test("los `item_code` compartidos cubren una fila PARCIALMENTE", () => {
    const answered = new Set(
      Array.from({ length: 30 }, (_, i) => `K-${i + 1}`),
    );
    const result = composePaidStack(rows, {
      completedVersionIds: new Set(["bfi-corto"]),
      answeredItemCodes: answered,
    });
    if (!result.available) throw new Error("expected an available stack");
    const bfi = result.rows.find((r) => r.versionId === "bfi60");
    expect(bfi?.reusedCount).toBe(30);
    expect(bfi?.remainingCount).toBe(30);
    expect(bfi?.fullyReused).toBe(false);
    expect(result.reuseState).toBe("partial");
  });

  test("el numero NO es la constante 113: cambia con el historial del usuario", () => {
    // Dos usuarios con historial distinto sobre el MISMO stack.
    const answeredTen = new Set(Array.from({ length: 10 }, (_, i) => `K-${i + 1}`));
    const a = composePaidStack(rows, {
      completedVersionIds: new Set(["bfi-corto"]),
      answeredItemCodes: answeredTen,
    });
    const b = composePaidStack(rows, {
      completedVersionIds: new Set(["bfi-corto", "onet", "perma"]),
      answeredItemCodes: new Set(Array.from({ length: 30 }, (_, i) => `K-${i + 1}`)),
    });
    if (!a.available || !b.available) throw new Error("expected available stacks");
    expect(a.reusedItems).toBe(10);
    expect(b.reusedItems).toBe(30 + 60 + 23);
    expect(b.reusedItems).not.toBe(a.reusedItems);
  });

  test("el restante es SIEMPRE el total menos el reutilizado", () => {
    for (const history of [
      COLD,
      { completedVersionIds: new Set(["onet"]), answeredItemCodes: new Set<string>() },
      {
        completedVersionIds: new Set(["onet", "perma"]),
        answeredItemCodes: new Set(["K-1", "K-2", "K-3"]),
      },
    ]) {
      const result = composePaidStack(rows, history);
      if (!result.available) throw new Error("expected an available stack");
      expect(result.remainingItems).toBe(result.totalItems - result.reusedItems);
      // Y el restante del aviso coincide con la suma de los restantes por fila.
      expect(result.remainingItems).toBe(
        result.rows.reduce((acc, r) => acc + r.remainingCount, 0),
      );
    }
  });

  test("con todas las filas cubiertas el estado es completo y el restante es cero", () => {
    const result = composePaidStack(rows, {
      completedVersionIds: new Set(["bfi60", "onet", "perma"]),
      answeredItemCodes: new Set<string>(),
    });
    if (!result.available) throw new Error("expected an available stack");
    expect(result.reuseState).toBe("complete");
    expect(result.remainingItems).toBe(0);
  });

  test("un codigo respondido que el stack no contiene no infla el reuso", () => {
    const result = composePaidStack(rows, {
      completedVersionIds: new Set(["otro"]),
      answeredItemCodes: new Set(["CODIGO-DE-OTRO-INSTRUMENTO"]),
    });
    if (!result.available) throw new Error("expected an available stack");
    expect(result.reusedItems).toBe(0);
    expect(result.reuseState).toBe("cold");
  });

  test("el reuso de una fila nunca supera su propio conteo de items", () => {
    // Defensa contra un `item_codes` mas largo que `item_count` (dato a medias):
    // sin la cota, el restante de la fila seria negativo y el total mentiria.
    const oversized = [
      coreRow(
        "x",
        "X",
        5,
        Array.from({ length: 40 }, (_, i) => `K-${i + 1}`),
      ),
    ];
    const result = composePaidStack(oversized, {
      completedVersionIds: new Set<string>(),
      answeredItemCodes: new Set(Array.from({ length: 40 }, (_, i) => `K-${i + 1}`)),
    });
    if (!result.available) throw new Error("expected an available stack");
    expect(result.rows[0]?.reusedCount).toBe(5);
    expect(result.rows[0]?.remainingCount).toBe(0);
  });
});

describe("composePaidStack — D-11: la fila que NO se reutiliza lo dice", () => {
  const rows = [
    coreRow(
      "bfi60",
      "PERSONALIDAD",
      60,
      Array.from({ length: 60 }, (_, i) => `K-${i + 1}`),
    ),
    // Sin ningun `item_code`: no hay llave de proyeccion posible. Es la forma
    // en DATO de "otro instrumento mide lo mismo, y no se reutiliza".
    coreRow("pvq", "VALORES", 57),
  ];

  test("un usuario con historial ve la nota en la fila sin reuso posible", () => {
    const result = composePaidStack(rows, {
      completedVersionIds: new Set(["bfi-corto"]),
      answeredItemCodes: new Set(Array.from({ length: 30 }, (_, i) => `K-${i + 1}`)),
    });
    if (!result.available) throw new Error("expected an available stack");
    const valores = result.rows.find((r) => r.versionId === "pvq");
    expect(valores?.noReuseNote).toBe(true);
    // Y muestra su conteo COMPLETO: nada de insinuar que ya esta hecho.
    expect(valores?.itemCount).toBe(57);
    expect(valores?.reusedCount).toBe(0);
    expect(valores?.fullyReused).toBe(false);
  });

  test("en frio la nota NO aparece: no hay reuso que malinterpretar", () => {
    const result = composePaidStack(rows, COLD);
    if (!result.available) throw new Error("expected an available stack");
    expect(result.rows.every((r) => r.noReuseNote === false)).toBe(true);
  });

  test("una fila con reuso real nunca lleva la nota", () => {
    const result = composePaidStack(rows, {
      completedVersionIds: new Set(["bfi-corto"]),
      answeredItemCodes: new Set(Array.from({ length: 30 }, (_, i) => `K-${i + 1}`)),
    });
    if (!result.available) throw new Error("expected an available stack");
    expect(result.rows.find((r) => r.versionId === "bfi60")?.noReuseNote).toBe(false);
  });
});

describe("composePaidStack — add-ons: apagados, aparte y fuera de la aritmetica", () => {
  const core = [coreRow("v1", "A", 60)];

  test("sin filas de add-on sembradas, la lista de add-ons viene vacia", () => {
    // No se inventa ninguno. El paywall crece con el dato.
    const result = composePaidStack(core, COLD);
    if (!result.available) throw new Error("expected an available stack");
    expect(result.addOns).toEqual([]);
  });

  test("un add-on con conteo de items es seleccionable y trae su costo", () => {
    const result = composePaidStack(
      [...core, { ...coreRow("a1", "EXTRA", 24), layer: "addon" }],
      COLD,
    );
    if (!result.available) throw new Error("expected an available stack");
    expect(result.addOns).toHaveLength(1);
    expect(result.addOns[0]?.selectable).toBe(true);
    expect(result.addOns[0]?.itemCount).toBe(24);
    expect(result.addOns[0]?.minutes).toBe(estimateMinutes(24));
  });

  test("un add-on SIN conteo de items queda deshabilitado, no rompe la pantalla", () => {
    // Es la diferencia deliberada con una fila core: un add-on sin dato se
    // declara y se apaga; una fila core sin dato invalida el paywall entero.
    const result = composePaidStack(
      [...core, { ...coreRow("a2", "SIN-PACK", 1), itemCount: null, layer: "addon" }],
      COLD,
    );
    if (!result.available) throw new Error("expected an available stack");
    expect(result.available).toBe(true);
    expect(result.addOns[0]?.selectable).toBe(false);
    expect(result.addOns[0]?.itemCount).toBeNull();
    expect(result.addOns[0]?.minutes).toBeNull();
  });

  test("ningun add-on entra en el total del stack core", () => {
    const withAddOns = composePaidStack(
      [
        ...core,
        { ...coreRow("a1", "EXTRA", 24), layer: "addon" },
        { ...coreRow("a2", "SIN-PACK", 1), itemCount: null, layer: "addon" },
      ],
      COLD,
    );
    const withoutAddOns = composePaidStack(core, COLD);
    if (!withAddOns.available || !withoutAddOns.available) {
      throw new Error("expected available stacks");
    }
    expect(withAddOns.totalItems).toBe(withoutAddOns.totalItems);
    expect(withAddOns.remainingMinutes).toBe(withoutAddOns.remainingMinutes);
    expect(withAddOns.rows).toHaveLength(1);
  });
});
