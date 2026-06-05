# ADDENDUM Tabla 14 — Percentile Ranks RIASEC, IP-SF (Rounds et al., 2010)

**Cierra gap:** §3 (marker "[sin fuente verificada]" en fila "Desarrollo (EE. UU., 1999)" de la tabla maestra) y §9.6 (plan de resolución de la Tabla 14) del pack `O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md`.
**Fuente primaria:** Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET® Interest Profiler Short Form psychometric characteristics: Summary* (p. 39, Table 14). National Center for O*NET Development. https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf
**Fecha extracción:** 2026-05-16.
**Rol:** Investigador psicométrico senior.
**Versión:** 1.0.
**Estado:** datos verificados desde el PDF; decisión de método de conversión a escala 0-40 pendiente (ver §E y DD-57).

---

## Resumen ejecutivo

- Tabla 14 extraída literalmente del PDF (p. 39). **Estructura real:** percentil acumulado por score crudo (0-10) × dimensión × género (12 columnas). NO es la matriz p10/p25/p50/p75/p90/p95/p99 que el pack §9.6 supuso.
- Se derivan: percentiles cumulativos **combinados** (sin género, alineado con §9.5 del pack); percentiles fijos p10/p25/p50/p75/p90/p95/p99 por interpolación lineal; M y SD pooled por dimensión.
- **Caveat crítico que afecta DD-57:** la Tabla 14 está en escala **paper-and-pencil 0-10** (3-point: like/dislike/unsure). DescubreMe usa la versión computerizada **5-point 0-40**. Rounds 2010 NO publica percentiles en escala 0-40. El mapeo entre escalas requiere una de tres opciones (§E), cada una con trade-offs psicométricos.
- JSON `jsonb` listo para Migration 011 entregado en escala 0-10 (lo único verificado). Mapeo a 0-40 queda parametrizado en CC según la opción que DD-57 formalice.

---

## §A — Tabla 14 literal del PDF (verbatim, p. 39)

*Percentile Ranks of RIASEC Scale Scores for the Interest Profiler Short Form by Gender.*
*Nota Rounds 2010: M = Males (N = 437), F = Females (N = 624). R = Realistic, I = Investigative, A = Artistic, S = Social, E = Enterprising, C = Conventional. Scores 0-10 corresponden a la versión paper-and-pencil 3-point (suma de respuestas "like").*

| Score | R-M | R-F | I-M | I-F | A-M | A-F | S-M | S-F | E-M | E-F | C-M | C-F |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 100 | 100 | 96 | 99 | 99 | 99 | 98 | 97 | 98 | 97 | 97 | 94 |
| 9 | 96 | 99 | 89 | 94 | 94 | 92 | 94 | 87 | 93 | 90 | 91 | 83 |
| 8 | 87 | 97 | 81 | 88 | 85 | 83 | 88 | 73 | 84 | 82 | 85 | 74 |
| 7 | 75 | 94 | 73 | 80 | 77 | 75 | 79 | 59 | 75 | 74 | 78 | 65 |
| 6 | 65 | 90 | 65 | 71 | 67 | 66 | 70 | 46 | 67 | 64 | 72 | 58 |
| 5 | 54 | 85 | 57 | 63 | 57 | 56 | 61 | 36 | 58 | 55 | 64 | 50 |
| 4 | 44 | 78 | 48 | 56 | 47 | 45 | 51 | 28 | 49 | 45 | 56 | 43 |
| 3 | 35 | 68 | 37 | 48 | 34 | 35 | 39 | 18 | 39 | 34 | 48 | 34 |
| 2 | 25 | 55 | 25 | 38 | 20 | 25 | 26 | 10 | 27 | 25 | 38 | 25 |
| 1 | 14 | 34 | 13 | 22 | 10 | 13 | 12 | 4 | 14 | 15 | 26 | 15 |
| 0 | 4 | 11 | 4 | 6 | 3 | 4 | 2 | 1 | 4 | 5 | 10 | 5 |
| **M** | **4.53** | **2.38** | **4.64** | **3.86** | **4.57** | **4.58** | **4.31** | **5.91** | **4.43** | **4.65** | **3.86** | **5.04** |
| **SD** | **2.81** | **2.28** | **3.07** | **2.99** | **2.76** | **2.91** | **2.77** | **2.69** | **2.96** | **3.06** | **3.23** | **3.34** |

**Interpretación de cada celda:** P(score ≤ X | género, dimensión). Ejemplo: para un hombre con score 5 en Realistic, el percentil es 54 → 54% de hombres puntúan 5 o menos en R.

---

## §B — Combined (sin estratificación por género)

*Alineado con §9.5 del pack: DescubreMe NO estratifica por género para no reforzar estereotipos. Se computan ranks combined ponderando por N_M=437 y N_F=624 sobre N=1061.*

### Tabla B.1 — Percentiles cumulativos combinados por score crudo (escala 0-10)

| Score | R | I | A | S | E | C |
|---|---|---|---|---|---|---|
| 10 | 100.00 | 97.76 | 99.00 | 97.41 | 97.41 | 95.24 |
| 9 | 97.76 | 91.94 | 92.82 | 89.88 | 91.24 | 86.29 |
| 8 | 92.88 | 85.12 | 83.82 | 79.18 | 82.82 | 78.53 |
| 7 | 86.17 | 77.12 | 75.82 | 67.24 | 74.41 | 70.35 |
| 6 | 79.70 | 68.53 | 66.41 | 55.88 | 65.24 | 63.76 |
| 5 | 72.23 | 60.53 | 56.41 | 46.29 | 56.23 | 55.77 |
| 4 | 64.00 | 52.71 | 45.82 | 37.47 | 46.65 | 48.35 |
| 3 | 54.41 | 43.47 | 34.59 | 26.65 | 36.06 | 39.77 |
| 2 | 42.64 | 32.65 | 22.94 | 16.59 | 25.82 | 30.35 |
| 1 | 25.76 | 18.29 | 11.76 | 7.29 | 14.59 | 19.53 |
| 0 | 8.12 | 5.18 | 3.59 | 1.41 | 4.59 | 7.06 |

*Cálculo: rank_combined(X) = (437·rank_M(X) + 624·rank_F(X)) / 1061.*

### Tabla B.2 — M y SD combinados (escala 0-10)

*Fórmula pooled: sum(x²)_total = (n_M−1)·SD_M² + n_M·M_M² + (n_F−1)·SD_F² + n_F·M_F². Var_combined (poblacional) = sum(x²)/N − M_combined². SD = √Var.*

| Dim | M_combined | SD_combined |
|---|---|---|
| R | 3.27 | 2.72 |
| I | 4.18 | 3.05 |
| A | 4.58 | 2.84 |
| S | 5.25 | 2.83 |
| E | 4.56 | 3.02 |
| C | 4.55 | 3.35 |

---

## §C — Percentiles fijos derivados (interpolación lineal, escala 0-10)

*Método: inversión de la función cumulativa combinada (Tabla B.1) por interpolación lineal entre scores discretos adyacentes. Donde el percentil objetivo excede el rank máximo alcanzable (porque la escala 0-10 tiene techo y la cola superior de la distribución colapsa en score 10), se reporta "ceiling" e indicar el score 10 como aproximación con caveat.*

| Dim | p10 | p25 | p50 | p75 | p90 | p95 | p99 |
|---|---|---|---|---|---|---|---|
| R | 0.1 | 1.0 | 2.6 | 5.4 | 7.6 | 8.4 | 9.6 |
| I | 0.4 | 1.5 | 3.7 | 6.8 | 8.7 | 9.5 | **10 (ceiling)** |
| A | 0.8 | 2.2 | 4.4 | 6.9 | 8.7 | 9.4 | 10 |
| S | 1.3 | 2.8 | 5.4 | 7.6 | 9.0 | 9.7 | **10 (ceiling)** |
| E | 0.5 | 1.9 | 4.3 | 7.1 | 8.9 | 9.6 | **10 (ceiling)** |
| C | 0.2 | 1.5 | 4.2 | 7.6 | 9.4 | **10 (ceiling)** | **10 (ceiling)** |

**Nota técnica sobre "ceiling":** En las dimensiones I, S, E el rank combined en score 10 es 97.41-97.76 (<99), por lo que p99 cae estructuralmente en score 10 sin posibilidad de interpolar. En C, el rank en score 10 es 95.24, por lo que ya p95 colapsa al techo. Esto es **artefacto de la escala 10-item paper-and-pencil**, no un dato sobre la distribución de intereses. Refuerza la inadecuación de usar Tabla 14 como baremo de granularidad fina.

---

## §D — JSON jsonb listo para Migration 011 (CC)

**Schema asumido (verificar con CC contra el modelo real de baremo en `baremo_normativo` o similar):**

```jsonb
{
  "instrument": "O-NET-IP-SF",
  "instrument_version": "Rounds_2010_developmental_US",
  "scale": "paper_and_pencil_0_to_10",
  "sample": {
    "n": 1061,
    "country": "US",
    "year_data_collection": 1999,
    "year_publication": 2010,
    "stratified_by_gender": false,
    "notes": "Combined male (437) and female (624) per pack §9.5; no gender stratification for DescubreMe."
  },
  "dimensions": {
    "R": {
      "M": 3.27,
      "SD": 2.72,
      "percentiles_fixed": {"p10": 0.1, "p25": 1.0, "p50": 2.6, "p75": 5.4, "p90": 7.6, "p95": 8.4, "p99": 9.6},
      "cumulative_table": {"0": 8.12, "1": 25.76, "2": 42.64, "3": 54.41, "4": 64.00, "5": 72.23, "6": 79.70, "7": 86.17, "8": 92.88, "9": 97.76, "10": 100.00}
    },
    "I": {
      "M": 4.18,
      "SD": 3.05,
      "percentiles_fixed": {"p10": 0.4, "p25": 1.5, "p50": 3.7, "p75": 6.8, "p90": 8.7, "p95": 9.5, "p99": 10.0},
      "p99_ceiling": true,
      "cumulative_table": {"0": 5.18, "1": 18.29, "2": 32.65, "3": 43.47, "4": 52.71, "5": 60.53, "6": 68.53, "7": 77.12, "8": 85.12, "9": 91.94, "10": 97.76}
    },
    "A": {
      "M": 4.58,
      "SD": 2.84,
      "percentiles_fixed": {"p10": 0.8, "p25": 2.2, "p50": 4.4, "p75": 6.9, "p90": 8.7, "p95": 9.4, "p99": 10.0},
      "cumulative_table": {"0": 3.59, "1": 11.76, "2": 22.94, "3": 34.59, "4": 45.82, "5": 56.41, "6": 66.41, "7": 75.82, "8": 83.82, "9": 92.82, "10": 99.00}
    },
    "S": {
      "M": 5.25,
      "SD": 2.83,
      "percentiles_fixed": {"p10": 1.3, "p25": 2.8, "p50": 5.4, "p75": 7.6, "p90": 9.0, "p95": 9.7, "p99": 10.0},
      "p99_ceiling": true,
      "cumulative_table": {"0": 1.41, "1": 7.29, "2": 16.59, "3": 26.65, "4": 37.47, "5": 46.29, "6": 55.88, "7": 67.24, "8": 79.18, "9": 89.88, "10": 97.41}
    },
    "E": {
      "M": 4.56,
      "SD": 3.02,
      "percentiles_fixed": {"p10": 0.5, "p25": 1.9, "p50": 4.3, "p75": 7.1, "p90": 8.9, "p95": 9.6, "p99": 10.0},
      "p99_ceiling": true,
      "cumulative_table": {"0": 4.59, "1": 14.59, "2": 25.82, "3": 36.06, "4": 46.65, "5": 56.23, "6": 65.24, "7": 74.41, "8": 82.82, "9": 91.24, "10": 97.41}
    },
    "C": {
      "M": 4.55,
      "SD": 3.35,
      "percentiles_fixed": {"p10": 0.2, "p25": 1.5, "p50": 4.2, "p75": 7.6, "p90": 9.4, "p95": 10.0, "p99": 10.0},
      "p95_ceiling": true,
      "p99_ceiling": true,
      "cumulative_table": {"0": 7.06, "1": 19.53, "2": 30.35, "3": 39.77, "4": 48.35, "5": 55.77, "6": 63.76, "7": 70.35, "8": 78.53, "9": 86.29, "10": 95.24}
    }
  },
  "source": "Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). O*NET Interest Profiler Short Form psychometric characteristics: Summary, p. 39, Table 14. https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf",
  "extraction_date": "2026-05-16",
  "extraction_method": "PDF verbatim + combined-sex pooled + linear interpolation for fixed percentiles",
  "caveats": [
    "Escala paper-and-pencil 0-10. NO equivalente directo a la escala computerizada 0-40 que usa DescubreMe.",
    "Ceiling effect en p95 (C) y p99 (I, S, E, C): la escala 10-item satura antes del extremo superior.",
    "Muestra US 1999, demograficamente heterogenea pero no representativa de Colombia/LATAM. Usar como provisional hasta acumular N>=500 perfiles CO (ver §G)."
  ]
}
```

---

## §E — CAVEAT CRÍTICO: escala 0-10 (Tabla 14) vs 0-40 (DescubreMe) — tres opciones de conversión

**Problema operacional.** DescubreMe sirve la versión computerizada 5-point (0=strongly dislike, 4=strongly like → sumado por dimensión = score 0-40 por escala). Rounds 2010 publica:

| Estadístico publicado | Escala | Tabla del PDF |
|---|---|---|
| α por escala (SF) | n/a | Tabla 3 |
| M y SD por escala (proporción 0-1, N=125 estabilidad) | 0-1 | Tabla 4 |
| Percentiles acumulativos por score (paper-and-pencil) | **0-10** | **Tabla 14** ← este addendum |
| M y SD combined-sex en escala 0-1 (analizable en Tabla 10/12) | 0-1 | Tabla 10/12 |
| Percentiles en escala 0-40 | — | **NO PUBLICADO** |

**El gap fundamental:** No existe baremo US oficial publicado en escala 0-40 para IP-SF. DescubreMe necesita una decisión de método de conversión. Hay tres opciones operacionalmente viables; cada una tiene trade-off psicométrico distinto. Las presento comparativamente para que DD-57 formalice cuál adopta.

### Opción A — Mapeo por ratio simple (score/4)

**Lógica:** Convertir el score 0-40 del usuario a equivalente 0-10 dividiendo por 4. Buscar el percentil en la Tabla B.1.

| Aspecto | Valoración |
|---|---|
| Fidelidad psicométrica | **Baja-Media.** Asume que la distribución de scores 0-40 es proporcional a la de 0-10. Falsa por construcción: el 5-point captura intensidad ("strongly like" vs "like") que el 3-point colapsa. La granularidad real es distinta. |
| Sesgo | El 5-point tiende a producir scores intermedios más altos (efecto de respuestas "unsure" en 3-point que migran a "dislike/like" en 5-point). Sesga percentiles hacia arriba. |
| Resolución | Se pierde: 41 niveles (0-40) colapsan a 11 niveles (0-10). |
| Implementación | Trivial: 1 línea de código. |
| Defensible en doc al usuario | No con honestidad. Requiere asterisco. |
| **Recomendación** | **NO usar.** Es la opción que el prompt original parecía asumir, pero psicométricamente débil. |

### Opción B — Estandarización paramétrica con M y SD escala 0-40 (z-score normal)

**Lógica:** Usar M y SD de Rounds 2010 Tabla 4 (proporción 0-1) escaladas a 0-40 (multiplicar por 40). Calcular percentil del score del usuario asumiendo distribución normal:

```
M_0to40 = M_proporcion × 40
SD_0to40 = SD_proporcion × 40
z_usuario = (score_usuario - M_0to40) / SD_0to40
percentil = Φ(z_usuario)  # función acumulada normal estándar
```

**M y SD escalados (Time 1, N=125):**

| Dim | M_0to40 | SD_0to40 |
|---|---|---|
| R | 10.0 | 10.0 |
| I | 16.4 | 12.8 |
| A | 17.6 | 12.8 |
| S | 21.2 | 12.4 |
| E | 16.0 | 11.2 |
| C | 18.4 | 14.0 |

**Percentiles fijos derivados (escala 0-40, supuesto normal):**

| Dim | p10 | p25 | p50 | p75 | p90 | p95 | p99 |
|---|---|---|---|---|---|---|---|
| R | 0* | 3.3 | 10.0 | 16.7 | 22.8 | 26.5 | 33.3 |
| I | 0* | 7.8 | 16.4 | 25.0 | 32.8 | 37.5 | 40 (cap) |
| A | 1.2 | 9.0 | 17.6 | 26.2 | 34.0 | 38.7 | 40 (cap) |
| S | 5.3 | 12.8 | 21.2 | 29.6 | 37.1 | 40 (cap) | 40 (cap) |
| E | 1.6 | 8.4 | 16.0 | 23.6 | 30.4 | 34.4 | 40 (cap) |
| C | 0.4 | 8.9 | 18.4 | 27.8 | 36.3 | 40 (cap) | 40 (cap) |

*\* Valor teórico negativo, clampeado a 0 (asimetría observada de la distribución → distribución NO es normal).*

| Aspecto | Valoración |
|---|---|
| Fidelidad psicométrica | **Media.** Usa M+SD reales de la versión 5-point. Pero **el supuesto de normalidad falla** especialmente en R (donde M=10, SD=10 → cola izquierda truncada en 0); también deformaciones en colas superiores donde >50% de p95/p99 alcanzan el techo de 40. |
| Sesgo | Subestima percentiles extremos. Distribución real es asimétrica (skewed) en R (baja base rate) y plana-positiva en S (alta base rate). |
| Resolución | Total (41 niveles). |
| Implementación | Media: requiere función Φ (`scipy.stats.norm.cdf` o equivalente en SQL via función matemática). |
| Defensible en doc al usuario | Sí, con caveat: "percentil estimado bajo supuesto de distribución normal en la muestra US 1999. Aproximación válida para perfiles medios; en colas extremas la estimación pierde precisión." |
| **Recomendación** | **Aceptable como provisional para v1.5 Paid.** Para v1.5 Free, preferir Opción C porque el reporte Free es más simple y no necesita percentiles numéricos. |

### Opción C — Interpretación ipsativa (intra-perfil)

**Lógica:** No usar baremo US en absoluto. Calcular la banda BAJO/MEDIO/ALTO **dentro del propio perfil del usuario** según desviación respecto a su media de las 6 dimensiones:

```
M_intra = mean(score_R, score_I, score_A, score_S, score_E, score_C)
SD_intra = stdev(score_R, score_I, score_A, score_S, score_E, score_C)
para cada dimensión D:
  z_D = (score_D - M_intra) / SD_intra
  si z_D <= -1.0  → BAJO
  si -1.0 < z_D < 1.0  → MEDIO
  si z_D >= 1.0  → ALTO
```

| Aspecto | Valoración |
|---|---|
| Fidelidad psicométrica | **Alta para narrativa interpretativa.** Es exactamente el approach que usa el propio O*NET en su motor de matching (correlación Pearson perfil-ocupación; Gregory & Lewis, 2016). Refleja la estructura RIASEC como tipo ordinal relativo, no como nivel absoluto. |
| Sesgo | Independiente de la muestra normativa. No introduce sesgo cultural US. |
| Limitación | No produce percentil numérico contra población — solo bandas relativas. Usuarios pueden pedir "¿cuán alto es mi 32 en Social?" y la respuesta es comparativa intra-perfil ("alto respecto a tus otras dimensiones"), no normativa. |
| Resolución | 3 niveles (BAJO/MEDIO/ALTO) o continuo z-score si se quiere mostrar. |
| Implementación | Trivial. |
| Defensible en doc al usuario | Total. Es el método recomendado por §3.1 del pack actual. |
| **Recomendación** | **Sí para v1.5 Free MVP1.** El reporte Free necesita afirmaciones sobre fortalezas relativas, no comparación normativa. |

### Recomendación operacional consolidada

| Producto | Método recomendado | Justificación |
|---|---|---|
| **v1.5 Free MVP1** | **Opción C (ipsativa)** | Reporte simple, sin pretensión normativa, ético, libre de sesgo US, alineado con §3.1 del pack. |
| **v1.5 Paid** | **Opción C como interpretación principal + Opción B con caveat para mostrar "percentil estimado vs muestra US 1999"** | El usuario paga; espera mayor rigor. Doble vista: interpretación intra-perfil (núcleo) + dato normativo provisional con asterisco honesto. |
| **v2.0+ (cuando N_CO ≥ 500)** | **Opción D = baremo CO empírico** (ECDF) | Reemplazar opción B con percentiles colombianos propios (ver §G). Opción C permanece como interpretación complementaria. |

**Lo que NO recomiendo en ningún producto:** Opción A (ratio simple). Pierde resolución y no agrega valor sobre la Opción B (que también es normativa pero al menos usa M+SD reales del 5-point).

---

## §F — Validez de la muestra de extracción

**Hecho — Muestra developmental Rounds 2010 (Tabla 14):**

- N = 1061.
- Datos colectados: 1999 (publicación 2010).
- Origen: cuatro estados de EE.UU. (Michigan, New York, North Carolina, Utah).
- Sitios: oficinas del Department of Labor (employment service offices), secundarias, junior colleges, escuelas técnicas, universidades, agencias gubernamentales.
- Género: 41.19% hombres (n=437), 58.81% mujeres (n=624).
- Edad: 18 o menos (9.55%), 19-22 (16.16%), 23-30 (24.29%), 31-40 (23.63%), 41-50 (17.11%), >50 (9.26%).
- Etnicidad: 58.99% blancos no hispanos, 25.12% afroamericanos, 10.18% hispanos, 2.57% nativos americanos, 1.52% asiáticos o islas Pacífico, 1.62% otros.
- Educación: <secundaria (20.55%), secundaria completa (38.53%), parcial-universidad-BA (36.73%), >16 años (4.19%).
- Empleo: desempleado (62.43%), tiempo parcial (20.49%), tiempo completo (16.98%), militar (0.09%).

**Inferencia sobre transferibilidad a Colombia 2026:**

- **Diferencias estructurales relevantes:**
  - Mercado laboral US 1999 vs Colombia 2026: diferente composición ocupacional (mayor peso de servicios formales en US; mayor informalidad en CO ~58% según DANE 2024).
  - Educación: distribución US tiene 41% con post-secundaria; Colombia 2024 ~26% (DANE GEIH).
  - Composición étnica no comparable (en US los hispanos son 10% del total; en CO son mayoría con composición étnico-racial distinta).
- **Implicación:** percentiles US son **referencia provisional**, no normativa. Bandas extremas (p<10 y p>90) particularmente sospechosas para Colombia porque reflejan socialización ocupacional EE.UU. 1999.

**Opinión profesional:** Si DescubreMe quiere comunicar al usuario "tu percentil normativo es X", debe agregar caveat explícito en el reporte: *"Percentil estimado contra una muestra estadounidense de 1999. Validez para Colombia: provisional. DescubreMe trabaja en baremos locales."*

---

## §G — Protocolo baremo Colombia + criterio de reemplazo del baremo US

**Esto refina §3.2 del pack actual.**

### G.1 — Hitos y criterios cuantitativos

| Hito | Criterio | N mínimo CO | Acción |
|---|---|---|---|
| **H0 — Lanzamiento** | — | 0 | Usar Opción C (ipsativa) por defecto. Si DD-57 elige Opción B, mostrar Opción C como interpretación principal y Opción B con caveat. |
| **H1 — Validación lexical preliminar** | Piloto cualitativo + cuantitativo | 150-300 | NO regenerar baremo. Solo validar items en es-CO. Mantener Opción B (US) si DD-57 lo eligió. |
| **H2 — Baremo CO provisional** | N≥500 perfiles completos auto-seleccionados | **500** | Generar baremo CO via ECDF (ver G.2). **Marcado provisional** (selección sesgada por early adopters). |
| **H3 — Comparación CO vs US** | Test Kolmogorov-Smirnov por dimensión, α=0.05 | 500 | Si para ≥3 de 6 dimensiones la distribución CO difiere significativamente de US → adoptar CO. Si <3 → mantener US y reconsultar en H4. |
| **H4 — Baremo CO normativo** | N≥1500, estratificado | 1500 | Reemplazar baremo provisional. Estratificar por edad (18-25, 26-40, 41+) y educación (sec, técnico, univ). **NO** por género (consistente con §9.5). |
| **H5 — Baremo estable** | Revisión anual | 1500+ por estrato | Repetir H3 anualmente. Actualizar baremo cuando drift > 0.5 SD en cualquier dimensión. |

### G.2 — Método para baremo CO empírico

**ECDF (Empirical Cumulative Distribution Function) por dimensión:**

```sql
-- Pseudocódigo SQL (para CC: implementar como materialized view actualizable mensualmente)
SELECT
  dimension_code,
  score,
  PERCENT_RANK() OVER (PARTITION BY dimension_code ORDER BY score) AS percentile_cumulative
FROM riasec_user_scores
WHERE country = 'CO'
  AND profile_completed = TRUE
  AND test_quality_flag = 'ok'  -- excluir perfiles con tiempo de respuesta sospechosamente bajo, doble-tap, etc.
;
```

Generar `percentile_table` jsonb por dimensión, mismo formato que §D pero con valores CO.

### G.3 — Criterio de "test_quality_flag = 'ok'"

Para evitar contaminar el baremo CO con perfiles de baja calidad:

- Tiempo total < P10 de la muestra → flag "speeded" → excluir.
- Varianza intra-respuesta = 0 (todos los items con la misma respuesta) → flag "straightlining" → excluir.
- Tiempo entre item N y N+1 < 800ms repetidamente → flag "rushed" → excluir.
- Usuario marcó >40% de items como "unsure" (en escala 5-point sería puntaje neutral 2 en >40% de items) → flag "ambivalent" → revisar antes de excluir.

### G.4 — Reportar baremo CO al usuario

Cuando se haya migrado a baremo CO (H2+), el reporte debe distinguir versión:

> "Tu percentil se calculó comparando con [N] perfiles de adultos en Colombia, recolectados entre [fecha_inicio] y [fecha_fin]."

Y mantener accesible (en una sección "metodología" o tooltip) el dato sobre cómo se construyó el baremo + cuándo se actualizará.

---

## §H — Acción requerida para cerrar el gap operacional

### H.1 — Decisión DD-57 a refinar/crear

DD-57 actualmente asume "baremo US provisional" pero no especifica método de conversión 0-10 → 0-40. **Necesita formalizar:**

| Decisión | Opciones | Recomendación |
|---|---|---|
| Método para v1.5 Free MVP1 | A / B / C | **C** |
| Método para v1.5 Paid | A / B / C / B+C híbrido | **B+C híbrido** |
| Caveat visible al usuario en reporte normativo | Sí / No | **Sí** (transparencia ética) |
| Trigger para regenerar baremo (H2-H5) | Como en §G | Adoptar §G |

**Acción:** German + PM cierran DD-57 con este detalle. Una vez cerrado, CC genera Migration 011 con el método elegido.

### H.2 — Output que necesita Claude Code

**Estado al 2026-05-16 — DD-57 v3.0 CERRADO:**

| Producto | Método adoptado | Implicación operacional |
|---|---|---|
| Free MVP1 (S2 + carry S3) | **Opción C (ipsativa intra-perfil)** | `computed_score.centered_score = (raw - M_intra) / SD_intra`. Engine v0 actual ya produce `raw_score` suficiente para Holland code top-3. **NO requiere Migration 011 para Free.** |
| Paid (S3+, ligado a HU-F-10 Report Builder Paid) | **B+C híbrido** | C como interpretación principal del reporte. B como dato secundario con caveat "percentil estimado vs muestra US 1999". Migration 011 sí requerida. |
| v2.0+ (cuando N_CO ≥ 500) | **Opción D (ECDF Colombia)** per §G | Reemplaza B en Paid. Sigue protocolo §G. |

**Migration 011 — diferida a S3 priority P1, dependiente de HU-F-10:**

- REPLACE `percentile_table` en los 6 baremos O-NET-IP-SF con el JSON de §D (escala 0-10 verificada).
- Helper de cómputo: **`lib/scoring/onet_normative.ts`** (TypeScript, alineado con stack DescubreMe Next.js + Supabase).
- Función principal:

  ```typescript
  /**
   * Computa el percentil normativo de un score crudo IP-SF (escala 0-40)
   * bajo el supuesto de distribución normal en la muestra US 1999 (Rounds 2010, Tabla 4 × 40).
   * Usado para Opción B (baremo US provisional) en reportes Paid.
   *
   * @param rawScore - Score del usuario en escala 0-40 por dimensión RIASEC
   * @param mean - Media poblacional en escala 0-40 (e.g., R = 10.0, S = 21.2, ver §E Opción B)
   * @param sd - SD poblacional en escala 0-40 (e.g., R = 10.0, S = 12.4)
   * @returns Percentil estimado [0-100]. Clamp en bordes si rawScore cae fuera del rango.
   */
  export function computePercentileFromBaremoNormal(
    rawScore: number,
    mean: number,
    sd: number
  ): number {
    if (sd <= 0) throw new Error("SD debe ser positivo");
    const z = (rawScore - mean) / sd;
    const phi = 0.5 * (1 + erf(z / Math.SQRT2));
    return Math.max(0, Math.min(100, phi * 100));
  }

  /**
   * Aproximación de la función error (erf) por Abramowitz & Stegun 7.1.26.
   * Precisión: |error| < 1.5e-7 para todo x real. Suficiente para uso normativo.
   * Polyfill necesario porque JavaScript/TypeScript no provee Math.erf nativo.
   */
  function erf(x: number): number {
    const sign = Math.sign(x);
    const absX = Math.abs(x);
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    return sign * y;
  }
  ```

- Tests unitarios mínimos sugeridos (CC valida):
  - `computePercentileFromBaremoNormal(10, 10, 10)` → ≈ 50 (mediana de la distribución).
  - `computePercentileFromBaremoNormal(20, 10, 10)` → ≈ 84.13 (z=1).
  - `computePercentileFromBaremoNormal(0, 10, 10)` → ≈ 15.87 (z=-1).
  - `computePercentileFromBaremoNormal(40, 10, 10)` → ≈ 99.87 (z=3, clamp efectivo si >100).

**Tracking S2 (responsabilidad CC en Task 14):**
- Actualizar `DECISIONS_LOG.md` DD-57 v2.0 → v3.0.
- Agregar a `BACKLOG.md`: `[GAP-PACK-O-NET-IP-SF Tabla14] RESUELTO via addendum 2026-05-16 — Migration 011 P1 en S3 con HU-F-10`.
- Citar este addendum desde `S-2_tracking.md` y `SR-2.md`.

### H.3 — Patches al pack original (aplicados en este mismo cierre)

1. Marker "[sin fuente verificada]" en §3 fila "Desarrollo (EE. UU., 1999)" de la tabla maestra → "[resuelto: ver ADDENDUM Tabla14 v1.0, 2026-05-16]".
2. §9.6 "Plan de resolución" → marcar "EJECUTADO en 2026-05-16, ver ADDENDUM Tabla14 v1.0".

---

## §I — Trazabilidad

- **Fuente primaria verificada:** Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). *O*NET® Interest Profiler Short Form psychometric characteristics: Summary*. National Center for O*NET Development. Tabla 14, p. 39. https://www.onetcenter.org/dl_files/IPSF_Psychometric.pdf
- **Acceso al PDF:** 2026-05-16 (Cowork webfetch directo del Center for O*NET).
- **Hub del documento:** https://www.onetcenter.org/reports/IPSF_Psychometric.html
- **Cita complementaria (mecánica scoring 5-point):** Donnay, D. A. C., Morris, M. L., Schaubhut, N. A., & Thompson, R. C. (2005). *Strong Interest Inventory manual: Research, development, and strategies for interpretation*. Mountain View, CA: CPP.
- **Cita para el approach ipsativo:** Gregory, C., & Lewis, P. (2016). [Recuperar referencia exacta del O*NET Resource Center "What's New" / página `Interest Profiler` API documentation. Pack §3.1 ya la cita.]
- **Estándar para protocolo baremo CO:** AERA, APA, & NCME (2014). *Standards for Educational and Psychological Testing*. Capítulos 5 (validity), 6 (reliability), 12 (interpretation of tests).
- **DANE para datos comparativos Colombia:** DANE Gran Encuesta Integrada de Hogares (GEIH) 2024 (educación), Boletín de mercado laboral 2024 (informalidad). https://www.dane.gov.co

---

## Changelog del addendum

- **v1.0 — 2026-05-16 (publicación inicial):** Extracción literal Tabla 14, derivación combined-sex, percentiles fijos por interpolación, JSON jsonb, análisis 3 opciones conversión 0-10 → 0-40, protocolo baremo CO refinado.
- **v1.0 — 2026-05-16 (erratum mismo día, post-aprobación):** DD-57 v3.0 cerrado por German. §H.2 actualizada con método adoptado por producto (Free=C, Paid=B+C, v2.0=D) + spec TypeScript del helper `lib/scoring/onet_normative.ts` (corrección de stack: el proyecto es Next.js/TS, no Python como decía la versión preliminar) + polyfill `erf` Abramowitz/Stegun 7.1.26 + tests unitarios sugeridos. Migration 011 confirmada diferida a S3 priority P1, dependiente de HU-F-10.

---

*Cierre del addendum. Para preguntas metodológicas o decisión sobre método de conversión: contacto rol Investigador psicométrico senior vía Cowork.*
