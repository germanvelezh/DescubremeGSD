# STACK_POR_PRODUCTO — DescubreMe (v2.0)

**Producto:** DescubreMe.
**Autor (Cowork):** [Rol: Arquitecto + PM]
**Version:** 2.0
**Fecha:** 2026-06-05
**Fuente de verdad de producto:** `PRD_MAESTRO.md` v2.0 §5-§8. Detalle por instrumento: `MATRIZ_MAESTRA.md`.
**Naturaleza:** vista de composicion (que instrumentos y que capas de reporte por producto, y en que orden se administran). No es codigo.

---

## 1. Capas de reporte (componibles)

`Concepto:` el reporte de cada producto se arma con capas componibles. Un producto superior reutiliza las capas de los inferiores (principio de reutilizacion de respuestas).

| Capa | Que entrega | Free | Paid | B2B | Ikigai |
|---|---|:--:|:--:|:--:|:--:|
| Base por instrumento | Resultado individual por test (patron por capas, UX §8) | Si (4) | Si (todos) | Si (lentes activas) | Reusa |
| Perfil integrado teaser | Sintesis de 4 dimensiones + pincelada del Paid | Si | — | — | — |
| Reporte profundo por instrumento | Facetas, baremo, interpretacion | — | Si | Si (individual) | Reusa |
| Motor de Perfil Integrador | 6 salidas + constelacion (PRD §6) | — | Si | Individual del empleado | Reusa |
| Dashboard agregado anonimo | Vista por lente, n>=5 | — | — | Si (empresa) | — |
| Mapper Ikigai | Venn de 4 bloques + Ikigai-9 + disclaimer cultural | — | — | — | Si |

---

## 2. B2C Free

| Aspecto | Detalle |
|---|---|
| Instrumentos | BFI-2-S, O*NET IP-SF, PVQ-21, PERMA-Profiler |
| Capas de reporte | Base por instrumento + Perfil integrado teaser |
| Orden de administracion sugerido | O*NET IP-SF (entrada amable, sin distress) -> BFI-2-S -> PVQ-21 -> PERMA-Profiler |
| Tiempo objetivo | 12-18 min |
| NFR-27 aplica en | BFI-2-S, PERMA-Profiler (emotional_distress) |
| Gaps | PVQ-21 dossier+pack v1.0 listos; pendiente extraer items/anclas es-CO de fuente validada (`[GAP-PVQ21-ITEMS-ES-CO]`, `[GAP-PVQ21-ANCHORS-ES-CO]`) |

`Nota de orden:` empezar por O*NET (sin distress, visual, divertido) reduce friccion inicial y deja los tests con disclaimer para cuando el usuario ya esta enganchado. A validar en piloto.

---

## 3. B2C Paid

| Aspecto | Detalle |
|---|---|
| Instrumentos core | BFI-2-60, VIA-IS-P-96, PVQ-RR, O*NET IP-SF (+ mapa O*NET), MLQ, WAMI, PERMA-Profiler, Ryff-PWB, SWLS, Flourishing, PANAS, FSS-9 |
| Add-ons opcionales | MEMS, BPNSFS, CFI-R/PGI, upgrades personalidad (IPIP-NEO-120, HEXACO-60) |
| Capas de reporte | Base + Reporte profundo por instrumento + Motor de Perfil Integrador |
| Orden sugerido | Bloques por dominio en 4-6 sesiones: personalidad -> intereses/valores -> fortalezas -> sentido -> bienestar/afecto/flow -> integrador |
| Tiempo objetivo | 95-130 min distribuidos |
| NFR-27 aplica en | BFI-2-60, PERMA, Flourishing, PANAS, BPNSFS |
| Reutilizacion desde Free | BFI-2-S (subset de BFI-2-60), O*NET, PVQ (21 subset de RR), PERMA: las respuestas del Free se proyectan; no se vuelven a pedir |

`Nota de reutilizacion:` el modelo proyecta las respuestas del Free al Paid donde el item es el mismo. Donde el Paid usa una forma mas larga (BFI-2-60 vs -S, PVQ-RR vs -21), solo se piden los items adicionales. Claude Code resuelve el solapamiento de items en fase 3.

---

## 4. B2B-A

| Aspecto | Detalle |
|---|---|
| Que recibe el empleado | Su perfil Paid individual (segun lentes activas) + integrador individual |
| Que recibe la empresa | Dashboard agregado anonimo por lente (n>=5) |
| Configuracion | La empresa elige lentes (PRD §7); se activan los instrumentos derivados |

### 4.1 Mapeo lente -> instrumentos (set core)

| Lente | Instrumentos |
|---|---|
| Engagement & energia | UWES-9, WOLF, PANAS |
| Bienestar & riesgo de desgaste | PERMA, Ryff, SWLS, BPNSFS, PANAS |
| Necesidades psicologicas (SDT) | BPNSFS |
| Diseno del trabajo | WDQ-40 |
| Sentido & proposito laboral | WAMI, CMWS, MLQ |
| Cultura & alineacion de valores | PVQ-RR (agregado) |
| Fortalezas del equipo | VIA-IS-P-96 (agregado) |
| Composicion & diversidad personalidad | BFI-2-60 (agregado) |
| Desarrollo de carrera | BFI-2-60, VIA-IS-P-96, PVQ-RR, O*NET, PGI, CFI-R |
| Adaptabilidad / readiness al cambio | CFI-R, PGI |
| Ajuste persona-rol (agregado) | WDQ-40 x Personalidad/Valores/Intereses |

`Regla:` el empleado solo responde los instrumentos de las lentes activas. El dashboard nunca expone individuos (n>=5). La lente de desgaste dispara NFR-27/28 a nivel individual y se reporta solo agregado.

---

## 5. Ikigai Premium

| Aspecto | Detalle |
|---|---|
| Instrumentos | Reusa stack Paid + O*NET; anade Ikigai-9 (gap) |
| Capas de reporte | Reusa Paid + Mapper Ikigai |
| Bloques del mapper | Lo que amo (intereses/valores) · En lo que soy bueno (fortalezas/personalidad) · Lo que el mundo necesita (O*NET/sentido) · Por lo que me pagan (O*NET/ocupaciones) |
| Disclaimer cultural | Obligatorio antes y dentro del mapper (Zuzunaga/Winn vs. Hasegawa/Kamiya/Mogi) |
| Gaps | Dossier+pack Ikigai-9 v1.0 listos; prerequisito fase 5: adaptacion formal es-CO + permiso (`[GAP-IKIGAI9-ITEMS-ES-CO]`, `[GAP-IKIGAI9-ANCHORS-ES-CO]`, `[GAP-IKIGAI9-CFA-LOCAL]`) |

---

## 6. Resumen de gaps que afectan el stack

| Gap | Afecta | Fase |
|---|---|---|
| `[GAP-IKIGAI9-ITEMS-ES-CO]` (+ anclas, CFA local, licencia) | Ikigai (adaptacion es-CO; prerequisito fase 5) | 5 |
| `[GAP-PVQ21-ITEMS-ES-CO]` + `[GAP-PVQ21-ANCHORS-ES-CO]` | Free (extraer items/anclas es-CO de fuente validada) | 2 |
| PGI pack (si se usa standalone en B2B) | B2B | 4 |

---

*Fin de STACK_POR_PRODUCTO v2.0. Vista de composicion. Detalle por instrumento en `MATRIZ_MAESTRA.md`; modelo en `MODELO_DATOS_CONCEPTUAL.md`.*
