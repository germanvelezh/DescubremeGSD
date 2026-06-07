/**
 * Unit tests — ipsative bands (DD-57 v3.0 Opcion C).
 *
 * `computeIpsativeBands(scoresByDim)` produce bandas BAJO/MEDIO/ALTO por
 * dimension intra-perfil:
 *   - z = (raw_dim - M_intra) / SD_intra
 *   - z <= -1.0 → BAJO
 *   - -1.0 < z < 1.0 → MEDIO
 *   - z >= 1.0 → ALTO
 *
 * Reemplaza percentil contra norma poblacional cuando: (a) baremo no
 * existe para el pais, (b) alpha < 0.70 (QUAL-02), (c) Phase 1 Free.
 *
 * Anchors:
 *   - implementation_packs/O-NET-IP-SF_v1.0_Consolidado_ADDENDUM_Tabla14.md §F (Opcion C).
 *   - 01-RESEARCH.md linea 996.
 *   - 01-CONTEXT.md D3.8 (display Alto/Medio/Bajo cuando QUAL-02 gate).
 */
import { describe, expect, test } from "vitest";

import { computeIpsativeBands } from "@/lib/scoring/ipsative";

describe("DD-57 v3.0 Opcion C: ipsative bands", () => {
  test("RIASEC fixture {R:32, I:28, A:24, S:18, E:14, C:10} → R ALTO, C BAJO", () => {
    // M_intra = (32+28+24+18+14+10)/6 = 126/6 = 21
    // Squared deviations: (11)^2, (7)^2, (3)^2, (-3)^2, (-7)^2, (-11)^2
    //                   = 121 + 49 + 9 + 9 + 49 + 121 = 358
    // Population variance = 358/6 ≈ 59.667 ; SD ≈ 7.724
    // z_R = 11/7.724 ≈ +1.424 → ALTO
    // z_I = 7/7.724 ≈ +0.906 → MEDIO
    // z_A = 3/7.724 ≈ +0.388 → MEDIO
    // z_S = -3/7.724 ≈ -0.388 → MEDIO
    // z_E = -7/7.724 ≈ -0.906 → MEDIO
    // z_C = -11/7.724 ≈ -1.424 → BAJO
    const bands = computeIpsativeBands({
      R: 32,
      I: 28,
      A: 24,
      S: 18,
      E: 14,
      C: 10,
    });
    expect(bands.R).toBe("ALTO");
    expect(bands.I).toBe("MEDIO");
    expect(bands.A).toBe("MEDIO");
    expect(bands.S).toBe("MEDIO");
    expect(bands.E).toBe("MEDIO");
    expect(bands.C).toBe("BAJO");
  });

  test("flat profile (all equal) → all MEDIO (SD=0 degenerate case)", () => {
    const bands = computeIpsativeBands({
      R: 20,
      I: 20,
      A: 20,
      S: 20,
      E: 20,
      C: 20,
    });
    expect(bands.R).toBe("MEDIO");
    expect(bands.I).toBe("MEDIO");
    expect(bands.A).toBe("MEDIO");
    expect(bands.S).toBe("MEDIO");
    expect(bands.E).toBe("MEDIO");
    expect(bands.C).toBe("MEDIO");
  });

  test("extreme dispersion: highest dim z>=1 → ALTO; lowest z<=-1 → BAJO", () => {
    const bands = computeIpsativeBands({
      R: 50,
      I: 10,
      A: 10,
      S: 10,
      E: 10,
      C: 10,
    });
    expect(bands.R).toBe("ALTO");
    expect(bands.I).toBe("BAJO");
  });

  test("works with arbitrary dim keys (D1/D2 for MOCK-PREF-12)", () => {
    const bands = computeIpsativeBands({ D1: 30, D2: 10 });
    expect(bands.D1).toBe("ALTO");
    expect(bands.D2).toBe("BAJO");
  });
});
