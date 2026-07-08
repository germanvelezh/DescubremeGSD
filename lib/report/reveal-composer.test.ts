/**
 * reveal-composer tests — mini-resultado revelador (Ola 2.3).
 *
 * TDD: cada regla de composicion (§9) pineada por su salida es-CO exacta.
 * Casos obligatorios (HANDOFF §7): ejemplo firmado BFI (E baja + O alta),
 * NEG-inversion (ambos sentidos), 1 por instrumento (O*NET pico/par, TwIVI
 * dominante/par adyacente, PERMA driver/LOW_OVERALL), BFI single/coda, fallback.
 *
 * NOTA (FOUND-05): este archivo vive bajo lib/report (ESCANEADO). Los codigos
 * de dimension aqui (EXT/OPN/NEG/R/I/OCH/SEN/P/E...) son DATOS de entrada de un
 * test — el gate excluye tests via EXCLUDE_SEGMENTS y ademas ignora dimension
 * codes (solo matchea codigos de INSTRUMENTO). El instrumento nunca se nombra.
 */
import { describe, expect, test } from "vitest";

import { composeReveal } from "@/lib/report/reveal-composer";

describe("composeReveal — BFI saliencia (bars)", () => {
  test("[firmado] E baja + O alta -> frase compuesta del prototipo, E primero por saliencia", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 8, AGR: 18, CON: 18, NEG: 18, OPN: 26 },
      bandsByDim: {
        EXT: "BAJO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "MEDIO",
        OPN: "ALTO",
      },
    });

    expect(result.text).toBe(
      "Recargas energía en lo tranquilo y te mueves por la curiosidad.",
    );
    expect(result.tone).toBe("normal");
  });

  test("[NEG-inversion] NEG banda ALTO usa el fragmento de Calma BAJA (intensidad), NO el de pulso estable", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 18, AGR: 18, CON: 18, NEG: 28, OPN: 18 },
      bandsByDim: {
        EXT: "MEDIO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "ALTO",
        OPN: "MEDIO",
      },
    });

    expect(result.text).toBe(
      "Sientes con intensidad lo que pasa a tu alrededor. Y eso ordena más de tu día a día de lo que parece.",
    );
    expect(result.text).not.toContain("pulso estable");
  });

  test("[NEG-inversion inversa] NEG banda BAJO usa el fragmento de Calma ALTA (pulso estable)", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 18, AGR: 18, CON: 18, NEG: 8, OPN: 18 },
      bandsByDim: {
        EXT: "MEDIO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "BAJO",
        OPN: "MEDIO",
      },
    });

    expect(result.text).toBe(
      "Mantienes el pulso estable aunque el entorno se agite. Y eso ordena más de tu día a día de lo que parece.",
    );
  });

  test("[coda] 1 sola extrema -> Cap(frag) + coda", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 18, AGR: 18, CON: 18, NEG: 18, OPN: 27 },
      bandsByDim: {
        EXT: "MEDIO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "MEDIO",
        OPN: "ALTO",
      },
    });

    expect(result.text).toBe(
      "Te mueves por la curiosidad. Y eso ordena más de tu día a día de lo que parece.",
    );
  });

  test("[fallback] 0 extremas (todo banda media) -> fallback de equilibrio", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 18, AGR: 18, CON: 18, NEG: 18, OPN: 18 },
      bandsByDim: {
        EXT: "MEDIO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "MEDIO",
        OPN: "MEDIO",
      },
    });

    expect(result.text).toBe(
      "Tu perfil no vive en los extremos: te mueves según lo que la situación pide. Eso también es un rasgo, y de los útiles.",
    );
  });

  test("expone measure/why fijos §9.5 del instrumento correcto (desempata bars por dimCodes)", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 8, AGR: 18, CON: 18, NEG: 18, OPN: 26 },
      bandsByDim: {
        EXT: "BAJO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "MEDIO",
        OPN: "ALTO",
      },
    });

    expect(result.measure).toBe("Tu nivel en cinco grandes rasgos de personalidad.");
    expect(result.why).toContain("En tu perfil integrado");
  });
});

describe("composeReveal — O*NET pico vs par (hexagon)", () => {
  test("[pico] gap >= umbral -> frase de pico unico del top1", () => {
    const result = composeReveal({
      visualType: "hexagon",
      scoresByDim: { R: 42, I: 30, A: 28, S: 20, E: 18, C: 16 },
      bandsByDim: {},
      top3: ["R", "I", "A"],
    });

    expect(result.text).toBe(
      "Lo concreto te llama: herramientas, terreno y resultados que se pueden tocar.",
    );
  });

  test("[par] gap < umbral -> frase del par en orden canonico R<I<A<S<E<C", () => {
    const result = composeReveal({
      visualType: "hexagon",
      scoresByDim: { A: 35, S: 33, R: 20, I: 18, E: 16, C: 14 },
      bandsByDim: {},
      top3: ["A", "S", "R"],
    });

    expect(result.text).toBe("Crear y conectar con la gente son tus dos motores.");
  });
});

describe("composeReveal — TwIVI dominante vs par adyacente (circumplex)", () => {
  test("[dominante] un HOV domina claro (gap > umbral) -> frase HOV", () => {
    const result = composeReveal({
      visualType: "circumplex",
      scoresByDim: {
        SD: 6, ST: 6, HE: 5, // OCH alto
        AC: 2, PO: 2, // SEN
        SE: 2, CO: 2, TR: 2, // CSV
        BE: 2, UN: 2, // STR
      },
      bandsByDim: {},
    });

    expect(result.text).toBe(
      "Valoras decidir tu rumbo y probar cosas nuevas, por encima de lo seguro.",
    );
  });

  test("[par adyacente] top1 y top2 adyacentes y cercanos -> frase de par", () => {
    const result = composeReveal({
      visualType: "circumplex",
      scoresByDim: {
        SD: 6, ST: 6, HE: 5, // OCH
        AC: 6, PO: 5, // SEN (adyacente a OCH, cercano)
        SE: 2, CO: 2, TR: 2, // CSV
        BE: 2, UN: 2, // STR
      },
      bandsByDim: {},
    });

    expect(result.text).toBe(
      "Valoras la autonomía y el logro: decidir tu camino y llegar lejos en él.",
    );
  });
});

describe("composeReveal — driver + variantes bienestar (bars)", () => {
  test("[driver] overall no bajo, con driver claro -> frase del driver (argmax raw P/E/R/M/A)", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { P: 8, E: 6, R: 7, M: 6, A: 5, N: 3, H: 7, Lon: 2, hap: 8 },
      bandsByDim: {},
    });

    expect(result.text).toBe(
      "Hoy tu bienestar se apoya sobre todo en tu capacidad de disfrutar lo cotidiano.",
    );
    expect(result.tone).toBe("normal");
  });

  test("[LOW_OVERALL] media raw {P,E,R,M,A} < 5.0 -> variante sensible con driver_label; showContention = servidor", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { P: 2, E: 3, R: 4, M: 3, A: 2, N: 6, H: 4, Lon: 5, hap: 3 },
      bandsByDim: {},
      distress: { showContention: true, severity: "moderate" },
    });

    expect(result.text).toBe(
      "Hoy tu bienestar pasa por un momento más bajo, y verlo con claridad ya es información valiosa. Tu punto de apoyo más firme hoy: tus vínculos.",
    );
    expect(result.tone).toBe("sensitive");
    expect(result.showContention).toBe(true);
  });

  test("[BALANCED] sin driver claro (spread < umbral) -> variante de equilibrio", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { P: 6, E: 6, R: 7, M: 6, A: 6, N: 3, H: 7, Lon: 2, hap: 7 },
      bandsByDim: {},
    });

    expect(result.text).toBe(
      "Tu bienestar hoy se reparte parejo entre sus cinco dimensiones; ninguna carga sola con todo.",
    );
  });

  test("showContention por defecto false cuando el servidor no lo marca", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { P: 8, E: 6, R: 7, M: 6, A: 5, N: 3, H: 7, Lon: 2, hap: 8 },
      bandsByDim: {},
    });

    expect(result.showContention).toBe(false);
  });
});

describe("composeReveal — recap fijo §4.3 del test recien terminado", () => {
  test("bars/personalidad -> recap 1->2", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { EXT: 8, AGR: 18, CON: 18, NEG: 18, OPN: 26 },
      bandsByDim: {
        EXT: "BAJO",
        AGR: "MEDIO",
        CON: "MEDIO",
        NEG: "MEDIO",
        OPN: "ALTO",
      },
    });
    expect(result.recap).toBe("Tu personalidad, en un primer trazo.");
  });

  test("hexagon/intereses -> recap 2->3", () => {
    const result = composeReveal({
      visualType: "hexagon",
      scoresByDim: { R: 42, I: 30, A: 28, S: 20, E: 18, C: 16 },
      bandsByDim: {},
      top3: ["R", "I", "A"],
    });
    expect(result.recap).toBe("Tus intereses ya dibujan un patrón.");
  });

  test("circumplex/valores -> recap 3->4", () => {
    const result = composeReveal({
      visualType: "circumplex",
      scoresByDim: {
        SD: 6, ST: 6, HE: 5,
        AC: 2, PO: 2,
        SE: 2, CO: 2, TR: 2,
        BE: 2, UN: 2,
      },
      bandsByDim: {},
    });
    expect(result.recap).toBe("Lo que más te importa, ya en palabras.");
  });
});

describe("composeReveal — degradacion", () => {
  test("visualType sin familia -> texto vacio, nunca lanza", () => {
    const result = composeReveal({
      visualType: "bars",
      scoresByDim: { ZZZ: 1, YYY: 2 },
      bandsByDim: {},
    });

    expect(result.text).toBe("");
    expect(result.tone).toBe("normal");
  });
});
