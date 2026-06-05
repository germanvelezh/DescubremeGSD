# MATRIZ_MAESTRA — Instrumentos DescubreMe (v2.0)

**Producto:** DescubreMe.
**Autor (Cowork):** [Rol: Investigador psicometrico senior + Arquitecto]
**Version:** 2.0
**Fecha:** 2026-06-05
**Fuente de verdad de producto:** `PRD_MAESTRO.md` v2.0 §8.
**Naturaleza:** referencia consolidada. La autoridad de detalle (items exactos, scoring, baremos, licencia) es cada `implementation_packs/<CODIGO>_*.md` y `dossiers/NN_<CODIGO>_Consolidado.md`.

`Como leer esta matriz:` los conteos de items y escalas son los estandar del instrumento (Hecho psicometrico establecido). Donde el dato dependa de la version activa, la fuente autoritativa es el pack. La licencia es **preliminar** y se cierra en la fase 7 (no bloquea desarrollo); cada propietario lleva su plan-B abierto.

---

## 1. Convenciones

- **ethical_flags:** `emotional_distress` dispara NFR-27 (disclaimer pre/post) y NFR-28 (ruta de contencion). Ver `compliance/*`.
- **Licencia:** abierto = dominio publico o uso libre amplio; propietario = requiere acuerdo para uso comercial (a cerrar fase 7).
- **Producto:** F = Free, P = Paid, B = B2B-A, I = Ikigai.
- **Estado dossier/pack:** OK = existe; gap = pendiente de producir.

---

## 2. Matriz de instrumentos del stack v2.0

| Codigo | Constructo | Forma / items | Escala | Scoring (resumen) | Baremo CO/MX | Licencia (prelim.) | Plan-B abierto | Productos | ethical_flags | Dossier | Pack |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BFI-2-S | Personalidad Big Five | 30 items | 1-5 acuerdo | 5 dominios (6 items c/u), reverse keys | Pendiente | Propietario (Soto-John, uso academico amplio) | IPIP-NEO corto | F | emotional_distress | OK | OK |
| BFI-2-60 | Personalidad Big Five + 15 facetas | 60 items | 1-5 acuerdo | 5 dominios + 15 facetas | Pendiente | Propietario | IPIP-NEO-120 | P, B | emotional_distress | OK | OK |
| O*NET IP-SF | Intereses RIASEC | 60 items | gusto/agrado | 6 tipos Holland (R,I,A,S,E,C) | INTL (US) | Abierto (US DOL, dominio publico) | No requiere | F, P, B, I | — | OK | OK |
| PVQ-21 | Valores (corto, ESS) | 21 items | 6 pts semejanza | 10 valores -> 4 HOV (centrado MRAT) | N/A teaser (ipsativo) | Propietario (Schwartz, permiso comercial) | TwIVI | F | — | OK | OK |
| PVQ-RR | Valores (refinado) | 57 items | 1-6 semejanza | 19 valores Schwartz refinados | Pendiente | Propietario (Schwartz, academico amplio) | PVQ-40 | P, B | — | OK | OK |
| VIA-IS-P-96 | Fortalezas del caracter | 96 items | 1-5 | 24 fortalezas / 6 virtudes | Pendiente | Propietario (VIA Institute) | IPIP-VIA-R (Bluemke 2024) | P, B | — | OK | OK |
| PERMA-Profiler | Bienestar (PERMA) | 23 items | 0-10 (extremos rotulados) | 5 pilares + soledad/salud/emocion neg. | Pendiente (MX triangulado) | Abierto (uso academico) | — | F, P, B | emotional_distress | OK | OK |
| Ryff-PWB | Bienestar psicologico | 18/42/54 (ver pack) | 1-6 acuerdo | 6 dimensiones | Pendiente | Abierto (uso academico) | — | P | — | OK | OK |
| SWLS | Satisfaccion con la vida | 5 items | 1-7 acuerdo | puntaje unico | Pendiente | Abierto | — | P, B | — | OK | OK |
| Flourishing | Florecimiento | 8 items | 1-7 acuerdo | puntaje unico | CO (Martin-Carbonell 2021) | Abierto | — | P | emotional_distress | OK | OK |
| MLQ | Sentido en la vida | 10 items | 1-7 | Presencia + Busqueda | Pendiente | Abierto (academico) | — | P, B | — | (via sentido) | OK |
| WAMI | Sentido en el trabajo | 10 items | 1-5 | 3 subescalas | Pendiente | Abierto (academico) | — | P, B | — | (via sentido) | OK |
| MEMS | Sentido existencial multidim. | ver pack | ver pack | multidimensional | Pendiente | Abierto (academico) | — | P (opc.) | — | OK | OK |
| CMWS | Trabajo significativo (Lips-Wiersma) | ver pack | ver pack | multidimensional | Pendiente | Abierto (academico) | — | B | — | OK | OK |
| PANAS | Afecto positivo/negativo | 20 (PANAS-S ver pack) | 1-5 | PA + NA | Pendiente | Abierto | — | P, B | emotional_distress | OK | OK |
| FSS-9 | Flow disposicional | 9 items | 1-5 | puntaje de flow | Pendiente | Abierto (academico) | — | P | — | OK | OK |
| BPNSFS | Necesidades psic. (SDT) | 24 items | 1-5 | satisfaccion/frustracion x 3 necesidades | Pendiente | Abierto (academico) | — | P (opc.), B | emotional_distress | OK | OK |
| UWES-9 | Engagement laboral | 9 items | 0-6 | vigor/dedicacion/absorcion | Pendiente | Abierto (no comercial; confirmar) | — | B | — | OK | OK |
| WDQ-40 | Diseno del trabajo | 40 items | ver pack | 21 dimensiones / 4 categorias | Pendiente | Propietario (cadena APA/autores/editor) | WDQ corto / version EN | B | — | OK | OK |
| WOLF | Flow laboral (work-related flow) | 13 items | ver pack | absorcion/disfrute/motivacion intrinseca | Pendiente | Abierto (academico) | — | B | — | OK | OK |
| CFI-R | Curiosidad / flexibilidad | ver pack | ver pack | subescalas | Pendiente | Abierto (academico) | — | P (opc.), B | — | OK | OK |
| PGI | Iniciativa de crecimiento personal | ver pack | ver pack | subescalas | Pendiente | Abierto (academico) | — | B | — | OK | (via crecimiento) |
| Ikigai-9 | Ikigai (eje del mapper) | 9 items | 5 pts | 3 factores + global (intra-individuo) | N/A (intra-individuo) | Propietario (Imai et al. 2012, permiso) | MLQ+WAMI+MEMS / K-1 | I | emotional_distress | OK | OK |

### Upgrades opcionales de personalidad (Paid)

| Codigo | Constructo | Items | Licencia (prelim.) | Plan-B | Nota |
|---|---|---|---|---|---|
| IPIP-NEO-120 | Personalidad + 30 facetas | 120 | Abierto (dominio publico) | — | Tambien es el plan-B de BFI-2 |
| HEXACO-60 | Personalidad 6 factores (incl. Honestidad-Humildad) | 60 | Abierto (uso academico) | — | Modelo alterno; upgrade tematico |

---

## 3. Lectura por constructo (mejor test elegido + por que)

| Constructo | Elegido | Razon (resumen; evidencia en dossier) |
|---|---|---|
| Personalidad | BFI-2(-S/-60) | Estructura factorial moderna y limpia, adaptacion es validada (Gallardo-Pujol 2022), facetas en la forma 60 |
| Intereses | O*NET IP-SF | Estandar ocupacional, dominio publico, mapea directo a ocupaciones O*NET |
| Valores | PVQ-RR (corto PVQ-21 en Free) | Teoria refinada de 19 valores (Schwartz), base para ajuste y cultura |
| Fortalezas | VIA-IS-P-96 | Marco de 24 fortalezas mas usado en desarrollo; plan-B IPIP-VIA-R |
| Bienestar | PERMA + Ryff + SWLS + Flourishing | Cobertura hedonica y eudaimonica; Free usa PERMA por su lectura simple |
| Sentido | MLQ + WAMI (+ MEMS) | Vida (MLQ) + trabajo (WAMI); MEMS aporta profundidad existencial |
| Afecto | PANAS | Estandar de afecto positivo/negativo; insumo del integrador y de B2B |
| Flow | FSS-9 / WOLF | FSS-9 disposicional (B2C); WOLF para flow laboral (B2B) |
| Necesidades (SDT) | BPNSFS | Diagnostico de autonomia/competencia/relacion, clave en B2B |
| Engagement | UWES-9 | Estandar de engagement laboral |
| Diseno del trabajo | WDQ-40 | Cobertura mas completa de caracteristicas del puesto; plan-B WDQ corto |
| Crecimiento | CFI-R + PGI | Curiosidad/flexibilidad + iniciativa de crecimiento (adaptabilidad/cambio) |
| Ikigai | Ikigai-9 | Eje del mapper de proposito (gap a producir) |

`Nota de validez y limites:` toda eleccion asume equivalencia es-CO/LATAM a confirmar por baremo y, donde aplique, invarianza de medida (measurement invariance). Las cargas factoriales y la confiabilidad (alpha/omega) por escala deben cumplir Gate 1 (>=0.70) en muestra LATAM antes de mostrar resultados. Detalle por instrumento en su dossier.

---

## 4. Instrumentos fuera del stack v2.0 (referencia)

`Hecho:` estos tienen dossier/research en el repo pero NO entran al stack v2.0. Se conservan como referencia o plan-B; no se implementan salvo decision explicita.

| Codigo | Razon de exclusion |
|---|---|
| K-1 Scale | Diferido (conflacion documental); reevaluar version futura |
| Ikigai-Ryff | Descartado (fuente Arimitsu 2015 no verificable) |
| Strong Interest Inventory | Costo/licencia; O*NET cubre intereses |
| SDS (Holland) | Redundante con O*NET para intereses |
| NEO-PI-3 | Costo/licencia; BFI-2 / IPIP-NEO cubren personalidad |
| VIA-IS (general), VIA-IS-R-192 | Se usa VIA-IS-P-96; R-192 es alternativa larga |
| IPIP-NEO (general), IPIP-NEO-300 | IPIP-NEO-120 es el plan-B activo |
| PVQ-40, PVQ-57-R | Plan-B / version alterna de valores |
| DFS-2 / S-DFS-2 | Alternativa de flow; se usa FSS-9 / WOLF |

---

## 5. Changelog

| Version | Fecha | Cambios |
|---|---|---|
| 2.0 | 2026-06-05 | Matriz inicial v2.0. Stack alineado a PRD §8. Free con PVQ-21. Paid con integrador. B2B por lentes. Licencia preliminar, plan-B por instrumento. PVQ-21: dossier+pack v1.0 listos (carries abiertos: items/anclas es-CO desde fuente validada + licencia fase 7). Ikigai-9: dossier+pack v1.0 listos (carries abiertos: adaptacion es-CO de items/anclas + CFA local + licencia; prerequisito fase 5). Gap restante: PGI (pack). |

---

*Fin de MATRIZ_MAESTRA v2.0. Referencia; la autoridad de detalle es cada pack/dossier. Actualizar al anadir o intercambiar un instrumento.*
