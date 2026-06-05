# ROADMAP — DescubreMe MVP v1.5

**Producto:** DescubreMe — plataforma web de autoconocimiento profundo para adultos LATAM.
**Version del roadmap:** 1.0
**Fecha de redaccion:** 2026-05-13
**Owner:** German Velez Hurtado.
**Audiencia primaria:** German (owner), Claude Code (implementacion), Cowork (research/PM/UX).
**Horizonte:** 12 meses calendario (2026-05-18 a 2027-05-16).
**Documento padre:** `02_producto/PRD_MAESTRO.md` v1.0.

**ADRs que gobiernan este roadmap:**
- DD-38 sprint length = 2 semanas.
- DD-39 capacidad 15-25 h/semana variable por sprint.
- DD-40 gates hibridos (duros para legal/compliance/seguridad/psicometria, blandos para UX/microcopy).
- DD-41 comunicacion = STATUS + Sprint Review escrito al cierre.
- DD-42 estructura 26 sprints S0-S25.

---

## 1. Resumen ejecutivo

DescubreMe ejecuta 26 sprints quincenales (S0-S25) entre 2026-05-18 y 2027-05-16 para entregar 4 productos: B2C Free, B2C Paid USD 19, B2B-A y Ikigai Premium. Tres milestones de migracion psicometrica (M1 BFI-2 en S8, M2 VIA-IS-P en S10, M3 WDQ-40 en S12) y cuatro gates de release publico (Free Public Gate S8, Paid Public Gate S14, B2B-A Pilot Gate S18, Ikigai Premium Gate S23). Capacidad 15-25 h/semana repartida variable entre Cowork (research/spec), Claude Code (implementacion) y German (decisiones/comercial). Cuatro streams paralelos corren fuera del flujo de sprints: licencias (4 negociaciones bloqueantes), legal/compliance Ley 1581, comercial B2B-A, research (enriquecer dossiers + implementation packs pendientes). Bloqueadores criticos: licencia Soto-John BFI-2 (R-01), VIA Institute VIA-IS-P (R-02), 4 permisos WDQ-40 (R-03), Triple i UWES (R-04), asesor legal Ley 1581 (R-05). Plan B documentado para cada licencia.

---

## 2. Supuestos y restricciones

### 2.1 Supuestos operativos

| Supuesto | Valor | Si falla |
|---|---|---|
| Capacidad German | 15-25 h/semana sostenido | Si baja a <10 h/sem por 2 sprints, replanear scope o extender calendario |
| Sprint length | 2 semanas exactas | DD-38; reversible con ADR si carry-over sostenido |
| Inicio Sprint 0 | Lunes 2026-05-18 | Confirmado |
| Cierre roadmap | Domingo 2027-05-16 | 52 semanas exactas |
| Claude Code disponible | Si, instalado y operativo | Bloqueador critico para foundation |
| Cowork disponible | Si, sesiones agendadas regulares | Bloqueador critico para spec/research |
| Cero hard deadlines externos | Confirmado por owner | Si aparece deadline externo, ADR nuevo |

### 2.2 Restricciones tecnicas heredadas de PRDs y arquitectura

- Una sola app Next.js multi-producto con renderers por tier (DD-01).
- Supabase como DB + auth + RLS multi-tenant (DD-05).
- Region hosting: **EE.UU. us-east-1 (Virginia)** — decidido DD-43.
- computed_score materializado al cierre de sesion (DD-04).
- Versioning de items por duplicacion (DD-06).
- Auth magic link default + Google SSO opcional B2B (DD-32).
- Stripe como procesador one-time payment B2C.

### 2.3 Restricciones eticas heredadas del PRD_MAESTRO

- No clinico, no diagnostico, no deterministico (jamas).
- No usar resultados para decisiones de seleccion/promocion/despido (B2B no negociable).
- Cero copy manipulador, urgencia artificial, exageracion predictiva.
- Disclaimer cultural Venn != ikigai japones (Ikigai Premium no negociable).
- n≥5 enforcement en views B2B (cero data individual al empleador).

### 2.4 Dependencias externas que pueden retrasar el calendario

| Dependencia | Tipo | ETA tentativa | Mitigacion |
|---|---|---|---|
| Licencia BFI-2 Soto-John | Externo no controlado | Q3 2026 | Plan B: HEXACO-60 (cambia arquitectura reportes a 6 factores) |
| Licencia VIA Institute (VIA-IS-P 96) | Externo no controlado | Q3 2026 | Plan B: mantener IPIP-VIA-R (24 fortalezas, menor validez) |
| Permisos WDQ-40 (APA + Bayona + COP Madrid + Elsevier Espana) | Externo no controlado | Q3 2026 | Plan B: Karasek 14 propio (menor calidad) o no incluir M3 en B2B-A v1.5 |
| Licencia UWES Triple i Human Capital | Externo no controlado | Q3 2026 | Plan B: omitir UWES; usar engagement aproximado via PERMA |
| Asesor legal Ley 1581 contratado | Owner | Pre-S1 | Sin asesor no lanza Free a publico (Gate 2 Compliance duro) |
| Region hosting Supabase | **DECIDIDO DD-43: EE.UU. us-east-1 (Virginia)** | Pre-S0 (cerrado) | German crea project en us-east-1 jueves 2026-05-14 |
| Razon social Colombia + factura electronica | Owner + contador | Pre-S9 | Sin esto, Stripe Colombia limitado |

---

## 3. Calendario base — vista 26 sprints

| Sprint | Fechas | Goal en 1 linea | Milestone / Release Gate activo |
|---|---|---|---|
| S0 | 2026-05-18 → 05-31 | Setup tecnico: Next.js + Supabase + RLS basico + CI/CD + auth magic link | — |
| S1 | 2026-06-01 → 06-14 | Schema completo + Consent & Compliance v0 + Storage Layer + Quality Validator v0 | — |
| S2 | 2026-06-15 → 06-28 | Scoring Engine v0 + primer plugin O*NET IP SF + Item Bank model | — |
| S3 | 2026-06-29 → 07-12 | Report Builder con layers Base + Free + UX Questionnaire Engine | — |
| S4 | 2026-07-13 → 07-26 | Plugin-izar 6 tests stack v2.0 (Flourishing, PVQ-RR, Ryff PWB, FSS-9, MLQ, WAMI) | — |
| S5 | 2026-07-27 → 08-09 | Plugin-izar W-BNS + CAAS + Distress Detector v0 + microcopy es-CO basica | — |
| S6 | 2026-08-10 → 08-23 | Free Beta interno + onboarding magic link + 2 emails educativos + PERMA-Profiler plugin | — |
| S7 | 2026-08-24 → 09-06 | **M1 BFI-2** plugin (cuando licencia firmada) + lógica de versioning + plan retest | M1 en progreso |
| S8 | 2026-09-07 → 09-20 | **M1 cierre** + Free Public Release Gate + lanzamiento publico Free | **M1 cierre + Free Public Release Gate** |
| S9 | 2026-09-21 → 10-04 | Layers reporte Paid + Stripe integration + checkout + facturas + refund flow | — |
| S10 | 2026-10-05 → 10-18 | **M2 VIA-IS-P** plugin + License Audit Log + PANAS + MEMS + BPNSFS plugins | **M2 cierre** |
| S11 | 2026-10-19 → 11-01 | Plugins CFI-R + WOLF + SWLS + bloques tematicos Paid (los 9) + dashboard progreso usuario | — |
| S12 | 2026-11-02 → 11-15 | **M3 WDQ-40** plugin + reporte Paid completo + mapeo O*NET ocupaciones + reflexiones | **M3 cierre** |
| S13 | 2026-11-16 → 11-29 | Paid Beta cerrado con 10-20 usuarios + microcopy refinada + recomendaciones | — |
| S14 | 2026-11-30 → 12-13 | **Paid Public Release Gate** + lanzamiento publico Paid + 3 upgrades premium (BFI-2 60, IPIP-NEO-120, HEXACO-60) | **Paid Public Release Gate** |
| S15 | 2026-12-14 → 12-27 | B2B-A foundation: tabla organization + organization_admin + RLS multi-tenant + tests RLS en CI | — |
| S16 | 2026-12-28 → 2027-01-10 | Plugin UWES + Admin Panel basico (setup org + equipos + empleados via CSV) | — |
| S17 | 2027-01-11 → 01-24 | Dashboard agregado B2B: medias por equipo + distribuciones + n≥5 view + exportes | — |
| S18 | 2027-01-25 → 02-07 | **B2B-A Pilot Release Gate** + pen test multi-tenant + onboarding asistido + primer piloto cliente ancla | **B2B-A Pilot Release Gate** |
| S19 | 2027-02-08 → 02-21 | Ikigai foundation: plugin Ikigai-9 + spec algoritmo mapper (Cowork) | — |
| S20 | 2027-02-22 → 03-07 | Implementacion algoritmo mapper integrador (4 bloques + score ikigai-fit) + disclaimers culturales | — |
| S21 | 2027-03-08 → 03-21 | UI Venn interactivo SVG + reflexiones guiadas + PDF estatico worker async | — |
| S22 | 2027-03-22 → 04-04 | Ikigai Beta cerrado + validacion alpha N>=200 + microcopy Venn + FAQ cultural | — |
| S23 | 2027-04-05 → 04-18 | **Ikigai Premium Release Gate** + lanzamiento publico + cross-sell desde reporte Paid | **Ikigai Premium Release Gate** |
| S24 | 2027-04-19 → 05-02 | Scale-up comercial B2B (cliente ancla 2-3) + analytics maduros + retrospectiva trimestral | — |
| S25 | 2027-05-03 → 05-16 | Cierre 12 meses + retrospectiva anual + Roadmap v2.0 + plan post-v1.5 | — |

---

## 4. Milestones M1, M2, M3

### 4.1 M1 — Migracion Mini-IPIP → BFI-2-S 30 (Free) y BFI-2 60 (upgrade Paid)

**Sprint cierre:** S8 (2026-09-20).

**Que entrega:**
- Plugin BFI-2-S 30 operativo en Free.
- Plugin BFI-2 60 operativo como upgrade premium en Paid (visible cuando Paid lance en S14).
- Lógica de versioning NFR-35: sesiones historicas Mini-IPIP preservadas.
- Plan de retest opt-in para usuarios Mini-IPIP existentes (no aplica en v1.5 inicial, queda como capability).
- License Audit Log activo para BFI-2 (export CSV mensual a Soto-John).

**Bloqueadores criticos (gates duros DD-40 Clase A):**
- [ ] Licencia BFI-2 Soto-John firmada (R-01).
- [ ] alpha BFI-2-S ≥0.70 por escala en muestra LATAM n≥200.
- [ ] Scoring rules auditadas vs publicacion original Soto & John (2017).
- [ ] Baremo Mexico (Toledo-Fernandez 2022) cargado como default LATAM con fallback INTL.
- [ ] Test de versioning pasa (M1 no rompe sesiones Mini-IPIP historicas — N/A en v1.5 inicial pero la lógica debe estar lista).
- [ ] NFR-27 activo en faceta Depresion del Neuroticismo.
- [ ] NFR-28 con umbral configurado.

**Plan B (DD-09 referencia):** si R-01 no se cierra para fin de S7, evaluar:
- (B1) Diferir M1 a S10 y arrancar Free con HEXACO-60 como ancla de personalidad. Cambia arquitectura de reportes Big Five → 6 factores.
- (B2) Lanzar Free SIN ancla de personalidad (solo Flourishing + O*NET + PERMA = 3 instrumentos). Reduce valor percibido pero permite avanzar.
- (B3) Diferir Free Public Release Gate a S10 con M1 cerrado correctamente.

**Owner:** German (negociacion licencia) + Claude Code (implementacion) + Cowork (validacion psicometrica).

---

### 4.2 M2 — Core Strengths 18 → VIA-IS-P 96 (Paid)

**Sprint cierre:** S10 (2026-10-18).

**Que entrega:**
- Plugin VIA-IS-P 96 operativo en bloque 4 del Paid (Fortalezas del caracter).
- 24 fortalezas con top 5 firma en reporte Paid.
- License Audit Log para VIA Institute.

**Bloqueadores criticos:**
- [ ] Licencia VIA Institute firmada para uso comercial (R-02).
- [ ] alpha por escala ≥0.70 en muestra LATAM.
- [ ] Scoring rules auditadas vs VIA-IS-P documentation.
- [ ] Baremo LATAM cargado o fallback INTL con disclaimer.

**Plan B (DD-10 referencia):** si R-02 no se cierra para fin de S9, evaluar:
- (B1) Mantener IPIP-VIA-R (Core Strengths 18) como ancla de fortalezas en Paid. Reduce de 24 fortalezas a 6 dominios. Menor moat psicometrico pero permite lanzar Paid.
- (B2) Diferir Paid Public Release Gate hasta cerrar M2.

**Owner:** German (negociacion) + Claude Code (implementacion) + Cowork (validacion).

---

### 4.3 M3 — Karasek 14 propio → WDQ-40 Bayona (B2B-A)

**Sprint cierre:** S12 (2026-11-15).

**Que entrega:**
- Plugin WDQ-40 Bayona operativo en B2B-A (modulo trabajo).
- 21 facetas de diseno del trabajo en 4 grupos.
- License Audit Log para los 4 titulares.

**Bloqueadores criticos:**
- [ ] Permiso APA (Morgeson & Humphrey 2006) firmado.
- [ ] Permiso autores originales firmado.
- [ ] Permiso COP Madrid (adaptacion espanola) firmado.
- [ ] Permiso Elsevier Espana (publicacion) firmado.
- [ ] alpha por escala ≥0.70.
- [ ] Scoring rules auditadas.

**Plan B (DD-11 referencia):** si 1 o mas de los 4 permisos no se cierran para fin de S11, evaluar:
- (B1) Lanzar B2B-A Pilot SIN modulo WDQ-40 (Karasek 14 propio como interim). Menor calidad psicometrica, comunicar como "v1.5 release".
- (B2) Diferir B2B-A Pilot Release Gate a S20-S22 con WDQ-40 cerrado.
- (B3) Buscar alternativa: Job Demands-Resources adapted (Bakker & Demerouti). Requiere nueva ronda de research.

**Owner:** German (4 negociaciones) + Cowork (apoyo legal en pitches) + Claude Code (implementacion).

---

## 5. Release Gates por producto

Cada release publico de un producto requiere cumplir su gate especifico. Aplica DD-40 (clase A duro + clase B blando + excepciones via ADR).

### 5.1 Free Public Release Gate — S8 cierre

**Clase A — Gates duros (binarios, ADR de excepcion permitida):**

| # | Criterio | Owner | Estado tentativo S8 |
|---|---|---|---|
| F1 | Asesor legal Ley 1581 contratado | German | Bloqueador critico R-05 |
| F2 | Politica de privacidad publica firmada por asesor | Asesor + German | Pendiente |
| F3 | Consent template Free producto v1.0 firmado | Asesor + Cowork UX | Pendiente |
| F4 | Consent template marketing v1.0 firmado | Asesor + Cowork UX | Pendiente |
| F5 | Licencia BFI-2 Soto-John firmada | German | Bloqueador critico R-01 |
| F6 | Licencia PERMA UPenn / Wellbeing Lab firmada | German | Pendiente |
| F7 | Atribucion BFI-2 + PERMA + Flourishing + O*NET en footer | Claude Code | Pendiente |
| F8 | Cifrado en reposo AES-256 verificado | Claude Code | Pendiente |
| F9 | TLS 1.3+ obligatorio | Claude Code | Pendiente |
| F10 | NFR-27 activo en BFI-2 y PERMA (pre+post disclaimer) | Claude Code + Cowork | Pendiente |
| F11 | NFR-28 ruta de contencion con lineas Colombia | Claude Code + Cowork | Pendiente |
| F12 | Derecho de eliminacion ≤2 clicks funcional | Claude Code | Pendiente |
| F13 | alpha ≥0.70 en muestra real n≥200 para BFI-2-S, Flourishing, O*NET IP SF, PERMA | Cowork (validacion) | Pendiente piloto |
| F14 | Baremos cargados (CO o MX o INTL fallback) | Cowork | Pendiente |
| F15 | Quality Validator activo con umbrales configurados | Claude Code + Cowork | Pendiente |
| F16 | RNBD ante Superintendencia si aplica por volumen | Asesor + German | Pendiente decision |
| F17 | License Audit Log activo + export CSV mensual a titulares | Claude Code | Pendiente |
| F18 | Beta interno con 5-10 usuarios sin errores criticos | German | S6-S7 |

**Clase B — Gates blandos (check-in cualitativo):**

- Microcopy onboarding refinada en es-CO.
- Reporte Free con narrativa cordial en es-CO sin tono motivacional.
- Email educativo dia 2-3 y dia 10-14 redactados y validados eticamente.
- Layout reporte responsive mobile-first.
- Boton compartir resultado (decision diferida OQ-1).

### 5.2 Paid Public Release Gate — S14 cierre

**Clase A — Gates duros (suma a los del Free + especificos Paid):**

| # | Criterio | Owner |
|---|---|---|
| P1 | Todos los gates duros Free (F1-F18) siguen verdes | Todos |
| P2 | Licencia VIA Institute firmada (R-02) | German |
| P3 | Licencia PANAS via APA CCC firmada | German |
| P4 | 14 instrumentos adicionales del Paid plug-izados con alpha ≥0.70 | Cowork + Claude Code |
| P5 | Stripe operativo + checkout funcional + factura electronica | Claude Code + German |
| P6 | Refund flow funcional + ventana 30 dias verificada | Claude Code |
| P7 | Razon social Colombia + IVA + factura electronica decididos con contador | German |
| P8 | License Audit Log activo para VIA + PANAS + MEMS + PERMA + BPNSFS + BFI-2 (todos los bloqueantes) | Claude Code |
| P9 | NFR-28 ampliado: triggers para PANAS (NA alto + PA bajo), BPNSFS (frustracion ≥4), MEMS (mattering bajo), faceta Depresion BFI-2 | Claude Code + Cowork |
| P10 | Mapeo O*NET ocupaciones algoritmo validado por Cowork rol Investigador | Cowork |
| P11 | Beta cerrado con 10-20 usuarios reales sin errores criticos | German + Cowork |

**Clase B — Gates blandos:**

- Microcopy bandas y narrativa por faceta refinada (15 facetas BFI-2 × 3 textos low/med/high).
- Recomendaciones (seccion N reporte) validadas eticamente sin determinismo vocacional.
- Cross-sell Ikigai en seccion P (puede quedar en blanco si Ikigai no esta listo).
- 3 upgrades premium UX en checkout post-reporte.

### 5.3 B2B-A Pilot Release Gate — S18 cierre

**Clase A — Gates duros:**

| # | Criterio | Owner |
|---|---|---|
| B1 | Todos los gates duros Paid (P1-P11) siguen verdes | Todos |
| B2 | Permisos WDQ-40 (4 titulares) firmados | German |
| B3 | Licencia UWES Triple i firmada | German |
| B4 | RLS multi-tenant testeado en CI: cross-org queries devuelven empty set | Claude Code |
| B5 | RLS bloquea acceso individual del Admin a item_response (test automatizado) | Claude Code |
| B6 | View agregada bloquea n<5 (test automatizado) | Claude Code |
| B7 | Penetration test multi-tenant aprobado | German (contratar terceros) |
| B8 | DPA B2B template firmado por asesor legal con clausula no-uso individual | Asesor + German |
| B9 | Acuerdo de Servicio B2B template firmado por asesor legal | Asesor + German |
| B10 | Cliente ancla 1 firmo contrato + DPA + pago up-front | German |
| B11 | Empleados del cliente ancla 1 onboarded sin incidentes | Admin cliente + German |
| B12 | Audit log inmutable verificado | Claude Code |
| B13 | Tool de e-signature decidida y configurada (DD-44 reabierto: HelloSign / DocuSign / PandaDoc segun pipeline real S13-S14) | German |

**Clase B — Gates blandos:**

- Admin Panel UX refinado por feedback del cliente ancla.
- Microcopy de comunicacion empleado refinada.
- Template propuesta comercial B2B redactado (Cowork + German).
- Alertas configurables del dashboard refinadas con feedback cliente.

### 5.4 Ikigai Premium Release Gate — S23 cierre

**Clase A — Gates duros:**

| # | Criterio | Owner |
|---|---|---|
| I1 | Todos los gates duros Paid (P1-P11) siguen verdes | Todos |
| I2 | Validacion alpha Ikigai-9 N≥200 muestra DescubreMe urbana | Cowork |
| I3 | Implementation pack Ikigai-9 v1.0 completo (items + scoring + baremos + validacion Vinaccia 2025) | Cowork |
| I4 | Spec del algoritmo mapper firmado por Cowork rol Investigador en `04_implementation_packs/Ikigai_Mapper_v1.0.md` | Cowork |
| I5 | Pesos del score ikigai-fit justificados psicometricamente y versionados (`scoring_engine_version`) | Cowork |
| I6 | Disclaimer cultural canonico es-CO + es-MX + en redactado por Cowork UX Writer y validado | Cowork |
| I7 | Disclaimer visible en UI Venn + reporte + FAQ + marketing | Cowork + Claude Code |
| I8 | PDF estatico worker async ≤30s replica disclaimer | Claude Code |
| I9 | Validacion uso comercial Ikigai-9 con Imai et al. confirmada | German + Cowork |
| I10 | FAQ con pregunta canonica "el Venn es ikigai japones?" publicado | Cowork UX |
| I11 | Stripe add-on USD 29 funcional + integrado con Paid existente | Claude Code |
| I12 | Beta cerrado con 10-20 usuarios sin errores criticos | German + Cowork |
| I13 | Training del equipo en respuesta a criticas culturales | German + Cowork |

**Clase B — Gates blandos:**

- Microcopy Venn (narrativa por bloque).
- 3-5 reflexiones guiadas por patron de scores.
- Cross-sell desde reporte Paid (CTA seccion P).
- 1-2 emails educativos en 14-30 dias post-Paid.

---

## 6. Streams paralelos (no son sprints, son tracks continuos)

Estos streams corren en paralelo a los sprints y consumen capacidad de German y Cowork **sin agregarse a un sprint especifico**. Cada uno tiene su propia cadencia.

### 6.1 Stream Licencias

**Cadencia:** continuo desde S0. Owner: German + Cowork (apoyo en pitches).

| Negociacion | Estado inicio S0 | Objetivo cierre | Sprint que la necesita |
|---|---|---|---|
| BFI-2 Soto-John | No iniciada | S7 inicio (pre-M1) | S7-S8 (M1) |
| VIA Institute (VIA-IS-P 96) | No iniciada | S9 inicio (pre-M2) | S9-S10 (M2) |
| WDQ-40 (4 permisos: APA + Bayona + COP Madrid + Elsevier) | No iniciada | S11 inicio (pre-M3) | S11-S12 (M3) |
| UWES Triple i Human Capital | No iniciada | S15 inicio (pre-B2B) | S15-S16 |
| PERMA UPenn / Wellbeing Lab | No iniciada | S6 inicio (pre-Free Gate) | S8 (Free Public) |
| PANAS via APA CCC | No iniciada | S9 inicio | S10 (Paid plugins) |

**Carga estimada total Stream Licencias:** ~40-60 h de German distribuidas en S0-S16 (~2-4 h/sprint en sprints activos de negociacion).

**Output recurrente:** archivos en `05_licencias/<CODIGO>_<titular>_negociacion.md` con cronologia + acuerdos.

**Riesgo critico:** si 2 o mas licencias fallan, ROADMAP requiere replan mayor con activacion de planes B.

### 6.2 Stream Legal / Compliance Ley 1581

**Cadencia:** intensivo S0-S2, mantenimiento despues. Owner: German + asesor legal externo + Cowork (input UX).

| Entregable | Sprint objetivo | Owner |
|---|---|---|
| Contratar asesor legal Ley 1581 | Pre-S1 | German |
| Region hosting Supabase | Pre-S0 (cerrado DD-43: EE.UU. us-east-1) | German |
| E-signature v1.5 pre-B2B | DD-44 (cerrado): Apple Preview nativo gratis | German |
| Politica de privacidad publica | S1-S2 | Asesor + German |
| Terminos de servicio | S1-S2 | Asesor + German |
| Consent templates Free (producto + marketing) | S1-S2 | Asesor + Cowork UX |
| Texto NFR-27 pre + post (BFI-2, PERMA, PANAS, BPNSFS, MEMS) | S1-S5 | Cowork UX + Investigador |
| Texto NFR-28 ruta de contencion con lineas Colombia | S2 | Cowork UX + Investigador |
| Razon social Colombia + IVA + factura electronica | Pre-S9 | German + contador |
| RNBD ante Superintendencia (si aplica) | Pre-S8 (Free Gate) | Asesor + German |
| DPA B2B template | S14-S15 | Asesor + German |
| Acuerdo de Servicio B2B template | S14-S15 | Asesor + German |

**Carga estimada total:** ~30-50 h de German + asesor en S0-S2, ~5-10 h/sprint en sprints relevantes (S8, S14, S18, S23).

### 6.3 Stream Comercial B2B

**Cadencia:** prep S10-S14, activo S15+. Owner: German + Cowork Estratega.

| Actividad | Sprint objetivo | Owner |
|---|---|---|
| Identificar 5-10 prospectos B2B-A LATAM (Colombia + Mexico) | S10-S12 | German |
| Redactar template propuesta comercial B2B v1.0 | S13-S14 | Cowork Estratega + German |
| Discovery calls iniciales (3-5 prospectos) | S15-S16 | German |
| Propuestas formales (2-3) | S16-S17 | German + Cowork |
| Cierre cliente ancla 1 (contrato + DPA + pago) | S17-S18 | German + asesor legal |
| Onboarding asistido cliente ancla 1 | S18 | German + Admin cliente |
| Primer dashboard review cliente ancla 1 | S19-S20 | German + Admin |
| Cierre cliente ancla 2-3 | S20-S24 | German |

**Carga estimada total:** ~5-15 h/sprint de German en S10+ (variable segun pipeline).

### 6.4 Stream Research (enriquecer dossiers + implementation packs)

**Cadencia:** continuo. Owner: Cowork rol Investigador psicometrico.

| Entregable | Sprint objetivo | Owner |
|---|---|---|
| Implementation pack Flourishing v1.0 | S2 | Cowork |
| Seed items O*NET IP SF (dominio publico, sin pack formal) | S2 | Cowork |
| Implementation pack PVQ-RR v1.0 | S3 | Cowork |
| Implementation pack Ryff PWB corta v1.0 | S3 | Cowork |
| Implementation pack FSS-9 v1.0 | S4 | Cowork |
| Implementation pack MLQ v1.0 | S4 | Cowork |
| Implementation pack WAMI v1.0 | S4 | Cowork |
| Implementation pack W-BNS v1.0 | S5 | Cowork |
| Implementation pack CAAS v1.0 | S5 | Cowork |
| Implementation pack PERMA-Profiler v1.0 | S6 | Cowork |
| Implementation pack PANAS estado v1.0 | S9 | Cowork |
| Implementation pack BPNSFS v1.0 | S9 | Cowork |
| Implementation pack MEMS v1.0 | S10 | Cowork |
| Implementation pack VIA-IS-P 96 v1.0 | S10 | Cowork |
| Implementation pack CFI-R 28 v1.0 | S10 | Cowork |
| Implementation pack WOLF v1.0 | S10 | Cowork |
| Implementation pack SWLS v1.0 | S10 | Cowork |
| Enriquecer dossier IPIP-NEO-120 (scoring detallado + baremos LATAM + Cupani 2014) | S13 (pre-S14 Paid Gate, upgrades) | Cowork |
| Implementation pack BFI-2 60 v1.0 (upgrade) | S13 | Cowork |
| Implementation pack HEXACO-60 v1.0 (upgrade) | S13 | Cowork |
| Implementation pack UWES v1.0 | S15 | Cowork |
| Implementation pack WDQ-40 Bayona v1.0 | S11-S12 | Cowork |
| Implementation pack Ikigai-9 v1.0 | S19 | Cowork |
| Spec algoritmo Ikigai_Mapper_v1.0 | S19-S20 | Cowork |
| Validar umbrales B2B-A dashboard (burnout, engagement, desconexion) | S15-S17 | Cowork rol Investigador |

**Carga estimada total:** ~8-15 h/sprint de Cowork. Es el stream que mas capacidad Cowork consume.

---

## 7. Detalle por sprint (S0-S25)

Cada sprint sigue formato uniforme: Goal · Reparto capacidad · Epicas activas · Dependencias · DoD · Riesgos.

### S0 — Setup tecnico (2026-05-18 → 05-31)

**Goal:** Repo Next.js + Supabase + auth magic link + CI/CD funcional. Primera linea verde en CI.

**Reparto capacidad declarado:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 16h | Setup repo, Supabase project, schema inicial (`user`, `consent_log`), auth magic link, CI GitHub Actions, Vitest + Playwright, Superpowers en `.claude/` |
| Cowork | 6h | Sprint planning S0 + Sprint review S0 + ADR region hosting Supabase + microcopy magic link es-CO + spec consentimiento v0 |
| German | 5h | Decisión región hosting + crear Supabase project + agendar asesor legal + iniciar 4 pitches licencia |
| **Total** | **27h** | Tu tiempo presencial ≈ 17h en 2 semanas (8.5 h/semana) |

**Epicas activas:** EP-FREE-01 Infra base · EP-FREE-02 Auth.

**Dependencias bloqueantes:** Region hosting decidida (German); asesor legal en proceso.

**DoD-codigo:** CI verde + auth magic link funcional + 0 vulnerabilidades criticas en `npm audit` + tests basicos pasan.
**DoD-research:** ADR region hosting publicado + microcopy magic link en es-CO firmada.
**DoD-comercial:** 1+ pitch de licencia enviado (no requiere respuesta).

**Riesgos S0:** decisión región se atrasa → bloquea schema. Mitigacion: decidir antes del lunes 18.

---

### S1 — Schema + Compliance v0 + Quality v0 (2026-06-01 → 06-14)

**Goal:** Schema SQL completo con instrument, instrument_version, item, item_translation, cultural_adaptation, assessment_session, item_response, computed_score, scoring_rule, baremo, facet, domain, license, usage_log. Consent layer v0. Quality Validator v0.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 18h | Schema completo + RLS basico + Consent v0 + Quality Validator v0 + tests |
| Cowork | 8h | Politica privacidad + ToS draft (con asesor) + spec Quality Validator + consent template Free |
| German | 6h | Reunión asesor legal Ley 1581 (semana 1) + revisión + 2 pitches licencia |
| **Total** | **32h** | ≈18-20h presencial |

**Epicas activas:** EP-FREE-01 Infra + EP-FREE-03 Modelo datos + EP-FREE-04 Compliance v0.

**Dependencias:** Asesor legal contratado.

**DoD-codigo:** Schema migrations en CI · RLS policies basicas · Tests de schema pasan.
**DoD-research:** Consent template Free firmado por asesor · Politica privacidad draft.
**DoD-comercial:** Asesor legal contratado y con NDA firmado.

**Riesgos:** asesor no disponible → atrasa S2 compliance. Mitigacion: contactar 2-3 asesores en S0.

---

### S2 — Scoring Engine v0 + primer plugin O*NET (2026-06-15 → 06-28)

**Goal:** Motor de scoring que lee scoring_rules y produce computed_score materializado. Plugin O*NET IP SF cargado como seed (dominio publico, sin licencia). Primer test end-to-end completo.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 20h | Scoring Engine v0 + recodificacion inversos + materializacion + plugin O*NET IP SF + Quality Validator integrado |
| Cowork | 10h | Implementation pack Flourishing v1.0 + seed items O*NET IP SF + textos interpretacion bandas O*NET en es-CO |
| German | 5h | Validar plugin O*NET + 2 pitches licencia + decision tool e-signature |
| **Total** | **35h** | ≈19-21h presencial |

**Epicas activas:** EP-FREE-05 Scoring Engine + EP-FREE-06 Plugin Architecture + EP-FREE-07 Plugin O*NET IP SF.

**DoD-codigo:** Plugin O*NET funcional · End-to-end test pasa · Materialized scores correctos vs publicacion.
**DoD-research:** Pack Flourishing v1.0 publicado · O*NET items en es-CO validados.

---

### S3 — Report Builder + UX Questionnaire Engine (2026-06-29 → 07-12)

**Goal:** Report Builder con layers (Base + Free). Questionnaire UX Engine que renderiza items Likert con navegacion y captura tiempos. Flow basico de un test end-to-end usable.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Report Builder + UX Questionnaire Engine + render mobile-first + item-to-item ≤150ms |
| Cowork | 10h | Pack PVQ-RR + Pack Ryff PWB corta + textos interpretacion bandas O*NET reporte + microcopy transiciones |
| German | 4h | 2 pitches licencia + revisión UX + decision Stripe vs alternativa |
| **Total** | **36h** | ≈20-22h presencial |

**Epicas activas:** EP-FREE-08 Report Builder + EP-FREE-09 Questionnaire UX.

**DoD-codigo:** Reporte Free para O*NET visible end-to-end · UX Questionnaire pasa Lighthouse mobile · WCAG AA verificado.
**DoD-research:** 2 packs publicados.

---

### S4 — Plugins stack v2.0 (Flourishing + PVQ-RR + Ryff + FSS-9 + MLQ + WAMI) (2026-07-13 → 07-26)

**Goal:** 6 plugins cargados y testeados. Reportes Free renderizan para cada uno con bandas en es-CO.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 24h | 6 plugins cargados (items, scoring, baremos, textos) + tests por plugin |
| Cowork | 12h | Pack FSS-9 + Pack MLQ + Pack WAMI + textos interpretacion bandas (6 instrumentos × 3 textos por escala) |
| German | 3h | 2 pitches licencia + revisión sampling pre-validacion |
| **Total** | **39h** | ≈20-22h presencial |

**Epicas activas:** EP-FREE-10 Plugin Loading stack v2.0.

**DoD-codigo:** 6 plugins con tests end-to-end pasando · Reportes Free demo internos.
**DoD-research:** 3 packs nuevos publicados.

---

### S5 — Plugins W-BNS + CAAS + Distress Detector v0 + microcopy es-CO (2026-07-27 → 08-09)

**Goal:** 2 plugins adicionales. Distress Detector v0 funcional con umbrales para PERMA + PANAS + BPNSFS (preparatorio). Microcopy es-CO de transiciones y errores.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Plugins W-BNS + CAAS + Distress Detector v0 + integracion en reporte |
| Cowork | 12h | Pack W-BNS + Pack CAAS + microcopy es-CO (transiciones, errores, magic link, save & resume) + texto NFR-28 ruta contencion |
| German | 4h | Negociacion BFI-2 (preparar pitch detallado) + revisión Distress Detector |
| **Total** | **38h** | ≈20-22h presencial |

**Epicas activas:** EP-FREE-11 Distress Detector + EP-FREE-12 Microcopy es-CO.

**DoD-codigo:** Distress Detector dispara con datos sinteticos · Lineas Colombia verificadas vigentes · Microcopy integrada.
**DoD-research:** 2 packs + microcopy es-CO firmada.

---

### S6 — Free Beta interno + PERMA + onboarding + 2 emails educativos (2026-08-10 → 08-23)

**Goal:** Plugin PERMA-Profiler cargado. Onboarding completo del Free. 2 emails educativos redactados y schedulables. Beta interno con 5-10 usuarios.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 20h | Plugin PERMA + Onboarding flow + Save & resume + Email scheduling + Quality flags en reporte |
| Cowork | 12h | Pack PERMA-Profiler + 2 emails educativos redactados (dia 2-3 + dia 10-14) + onboarding microcopy + revisión integrada del Free |
| German | 6h | Reclutar 5-10 beta testers + 2 pitches licencia + revisión emails |
| **Total** | **38h** | ≈22-24h presencial |

**Epicas activas:** EP-FREE-13 Onboarding + EP-FREE-14 Emails educativos + EP-FREE-15 Beta interno.

**DoD-codigo:** Free flow end-to-end funcional · Beta cierra con feedback consolidado.
**DoD-research:** Emails educativos firmados eticamente · Pack PERMA publicado.

---

### S7 — M1 BFI-2 plugin + versioning (2026-08-24 → 09-06)

**Goal:** Plugin BFI-2-S 30 cargado (condicional a licencia firmada). Lógica de versioning NFR-35. Plan de retest opt-in lista para activarse si se aplicara M1 sobre usuarios historicos.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Plugin BFI-2-S 30 + lógica versioning instrument_version + tests retrocompat + integracion en reporte Free |
| Cowork | 10h | Validar items BFI-2-S es-CO (Gallardo-Pujol base + revision panel Colombia) + textos interpretacion 5 dominios |
| German | 6h | Cerrar negociacion Soto-John (R-01) + sign-off licencia + 1 pitch VIA |
| **Total** | **38h** | ≈22 h presencial |

**Epicas activas:** EP-M1-01 BFI-2 plugin + EP-M1-02 Versioning + EP-FREE-16 Integrar BFI-2 en Free.

**Dependencias bloqueantes:** **Licencia BFI-2 firmada al final de S7**. Si no se cierra: activar Plan B (HEXACO-60 o lanzar Free sin ancla).

**DoD-codigo:** BFI-2-S funcional con NFR-27 + NFR-28 · Versioning tests pasan · License Audit Log activo.
**DoD-research:** Items BFI-2-S es-CO firmados · Baremo Mexico cargado como default LATAM.

**Riesgos:** licencia no cierra → activar Plan B. Mitigacion: pitch enviado en S0, follow-up regular hasta S7.

---

### S8 — M1 cierre + Free Public Release Gate (2026-09-07 → 09-20)

**Goal:** **M1 cerrado. Free Public Release Gate aprobado. Lanzamiento publico Free**.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 18h | Hardening pre-launch + monitoring + alertas operativas NFR-O3 + dashboard funnel |
| Cowork | 12h | Validacion psicometrica final BFI-2-S + reporte de gate compliance + revisar checklist Free Gate completo + Sprint Review S0-S8 retrospectiva trimestral |
| German | 8h | Sign-off Free Gate + comunicacion lanzamiento + 1-2 pitches licencia (VIA + PANAS) |
| **Total** | **38h** | ≈22-24h presencial |

**Epicas activas:** EP-FREE-17 Hardening + EP-FREE-18 Launch.

**DoD-codigo:** Free en produccion · 0 errores criticos en monitoring 72h post-launch · Funnel analytics activo.
**DoD-research:** Reporte de Free Gate archivado en `06_compliance/` · Sprint Review S0-S8 publicado.
**DoD-comercial:** Anuncio publico Free en redes propias.

**Hito:** **M1 CIERRE** + **FREE PUBLIC RELEASE GATE APROBADO**.

---

### S9 — Layers reporte Paid + Stripe (2026-09-21 → 10-04)

**Goal:** Report Builder extendido con layer Paid (facetas, comparativos, recomendaciones). Stripe integrado con checkout one-time USD 19. Facturas + refund flow.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Report Builder layer Paid + Stripe checkout + webhook + factura electronica integration + refund flow |
| Cowork | 10h | Pack PANAS + Pack BPNSFS + microcopy facetas BFI-2-S (15 facetas × 3 textos) + revision Stripe etico |
| German | 6h | Decision razon social Colombia + IVA + factura electronica + cerrar PANAS APA + 1 pitch VIA |
| **Total** | **38h** | ≈22 h presencial |

**Epicas activas:** EP-PAID-01 Report Builder Paid + EP-PAID-02 Stripe + EP-PAID-03 Refund.

**DoD-codigo:** Stripe checkout funcional · Factura electronica generada · Refund flow probado con sandbox.
**DoD-research:** Pack PANAS + Pack BPNSFS publicados · Microcopy facetas firmada.

---

### S10 — M2 VIA-IS-P + License Audit Log + plugins emocionales (2026-10-05 → 10-18)

**Goal:** **M2 cerrado.** Plugin VIA-IS-P 96. License Audit Log para todos los bloqueantes. Plugins MEMS + CFI-R + WOLF + SWLS.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 24h | Plugin VIA-IS-P 96 + License Audit Log + plugins MEMS + CFI-R + WOLF + SWLS + integracion en bloques Paid |
| Cowork | 14h | Pack MEMS + Pack VIA-IS-P + Pack CFI-R + Pack WOLF + Pack SWLS + microcopy 24 fortalezas VIA |
| German | 6h | Cerrar VIA Institute + iniciar 4 pitches WDQ-40 + 1 pitch UWES |
| **Total** | **44h** | ≈24-26h presencial |

**Epicas activas:** EP-M2-01 VIA-IS-P plugin + EP-PAID-04 Plugins emocionales + EP-PAID-05 License Audit.

**Dependencias bloqueantes:** **Licencia VIA firmada al final de S10**. Si no se cierra: activar Plan B (IPIP-VIA-R).

**DoD-codigo:** 5 plugins funcionales con tests · License Audit export CSV mensual.
**DoD-research:** 5 packs publicados · 24 fortalezas VIA microcopy.

**Hito:** **M2 CIERRE.**

---

### S11 — Bloques tematicos Paid + dashboard progreso usuario (2026-10-19 → 11-01)

**Goal:** 9 bloques tematicos secuenciales operativos. Dashboard progreso del usuario Paid (DD-27). Save & resume entre sesiones. Cross-sell upgrades preparado.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | 9 bloques + Dashboard progreso + Save & resume entre bloques + transiciones cortas con NFR-27 |
| Cowork | 10h | Pack WDQ-40 Bayona v1.0 (foundation, pre-M3) + microcopy 9 bloques + transiciones + textos sintesis cross-bloque |
| German | 4h | 4 follow-ups WDQ-40 + revision UX Paid |
| **Total** | **36h** | ≈20 h presencial |

**Epicas activas:** EP-PAID-06 Bloques tematicos + EP-PAID-07 Dashboard progreso.

**DoD-codigo:** 9 bloques desbloqueables en orden · Save & resume entre sesiones · Dashboard responsive.
**DoD-research:** Pack WDQ-40 foundation + microcopy 9 bloques firmada.

---

### S12 — M3 WDQ-40 + reporte Paid completo + mapeo O*NET ocupaciones (2026-11-02 → 11-15)

**Goal:** **M3 cerrado.** Plugin WDQ-40 Bayona. Reporte Paid completo con 18 instrumentos + mapeo O*NET ocupaciones algoritmo + reflexiones + recomendaciones.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 24h | Plugin WDQ-40 (B2B-A foundation) + Reporte Paid seccion F mapeo ocupaciones + algoritmo afinidad + recomendaciones + reflexiones |
| Cowork | 14h | Cerrar 4 permisos WDQ-40 (pitch detallado con German) + microcopy recomendaciones + revision etica + textos seccion F |
| German | 8h | Cerrar 4 permisos WDQ-40 + revision algoritmo O*NET + Sprint Review S9-S12 trimestral |
| **Total** | **46h** | ≈26h presencial (sprint pico de carga) |

**Epicas activas:** EP-M3-01 WDQ-40 plugin + EP-PAID-08 Mapeo O*NET + EP-PAID-09 Recomendaciones + reflexiones.

**Dependencias bloqueantes:** **4 permisos WDQ-40 firmados al final de S12** (al menos 3 de 4 con plan B documentado para el faltante).

**DoD-codigo:** WDQ-40 funcional + Reporte Paid completo end-to-end · Algoritmo mapeo O*NET genera 5-10 ocupaciones con afinidad documentada.
**DoD-research:** 4 permisos firmados · Algoritmo mapper firmado por Cowork rol Investigador.

**Hito:** **M3 CIERRE.**

---

### S13 — Paid Beta cerrado + microcopy refinada + upgrades preparados (2026-11-16 → 11-29)

**Goal:** Beta cerrado con 10-20 usuarios reales completando Paid completo. Microcopy refinada con feedback. 3 upgrades premium (BFI-2 60, IPIP-NEO-120, HEXACO-60) preparados para lanzamiento.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 18h | Plugin BFI-2 60 + Plugin IPIP-NEO-120 + Plugin HEXACO-60 + Stripe checkout upgrades + cross-sell post-reporte |
| Cowork | 14h | Enriquecer dossier IPIP-NEO-120 + Pack BFI-2 60 + Pack IPIP-NEO-120 + Pack HEXACO-60 + microcopy upgrades + revision beta feedback |
| German | 8h | Reclutar 10-20 beta testers + revision beta + iniciar pricing research COP/MXN |
| **Total** | **40h** | ≈22-24h presencial |

**Epicas activas:** EP-PAID-10 Beta cerrado + EP-PAID-11 Upgrades premium.

**DoD-codigo:** 3 upgrades funcionales · Beta cierra con feedback consolidado.
**DoD-research:** Dossier IPIP-NEO-120 enriquecido · 3 packs upgrades publicados.

---

### S14 — Paid Public Release Gate (2026-11-30 → 12-13)

**Goal:** **Paid Public Release Gate aprobado. Lanzamiento publico Paid USD 19**.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 18h | Hardening pre-launch Paid + monitoring + alertas + dashboards de revenue |
| Cowork | 12h | Validacion psicometrica final 18 instrumentos + reporte de Paid Gate + revisar checklist Paid Gate completo |
| German | 10h | Sign-off Paid Gate + comunicacion lanzamiento + iniciar pipeline B2B + 1 pitch UWES Triple i |
| **Total** | **40h** | ≈24h presencial |

**Epicas activas:** EP-PAID-12 Hardening + EP-PAID-13 Launch.

**DoD-codigo:** Paid en produccion · 0 errores criticos 72h post-launch · Stripe en produccion con facturas legales.
**DoD-research:** Reporte Paid Gate archivado · Sprint Review trimestral S9-S14.
**DoD-comercial:** Anuncio publico Paid · Pipeline B2B iniciado con 5-10 prospectos identificados.

**Hito:** **PAID PUBLIC RELEASE GATE APROBADO.**

---

### S15 — B2B foundation: organization + RLS multi-tenant (2026-12-14 → 12-27)

**Goal:** Schema multi-tenant. Tabla organization + organization_admin + team + user_team. RLS policies criticas. Tests RLS automatizados en CI que bloquean PRs.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Schema multi-tenant + RLS policies + tests RLS bloqueantes en CI + organization_id en todas las tablas relevantes |
| Cowork | 10h | Pack UWES + revisar logica RLS desde rol Investigador (umbrales B2B) + spec Admin Panel funcional |
| German | 8h | Cerrar UWES Triple i + iniciar discovery calls B2B (3-5 prospectos) |
| **Total** | **40h** | ≈22-24h presencial |

**Epicas activas:** EP-B2B-01 Multi-tenancy + EP-B2B-02 RLS tests + EP-B2B-03 UWES plugin.

**Dependencias bloqueantes:** Licencia UWES firmada al final de S15. Plan B: omitir UWES en B2B-A v1.5.

**DoD-codigo:** Tests RLS bloquean PRs · Cross-org queries empty set verificado · Schema multi-tenant migrado.
**DoD-research:** Pack UWES + spec Admin Panel.

---

### S16 — Plugin UWES + Admin Panel basico (2026-12-28 → 2027-01-10)

**Goal:** Plugin UWES en Paid + B2B-A. Admin Panel basico: setup organizacion + crear equipos + cargar empleados por CSV + enviar invitaciones magic link.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 24h | Plugin UWES + Admin Panel UI + CSV upload + magic link batch + dashboard adopcion (% completion por empleado) |
| Cowork | 10h | Microcopy Admin Panel + template propuesta comercial B2B v1.0 + texto comunicacion empleado |
| German | 8h | Discovery calls B2B (2-3) + 1ra propuesta formal + revision Admin Panel |
| **Total** | **42h** | ≈22-24h presencial |

**Epicas activas:** EP-B2B-04 Admin Panel + EP-B2B-05 Onboarding empleados + EP-B2B-06 UWES integrado.

**DoD-codigo:** Admin Panel funcional · CSV upload con validacion · Magic link batch tested.
**DoD-research:** Template propuesta B2B firmado por Cowork Estratega.

---

### S17 — Dashboard B2B agregado + alertas + ideas exploracion (2027-01-11 → 01-24)

**Goal:** Dashboard agregado del Admin: medias por equipo, distribuciones, view con n≥5 enforcement, alertas configurables, ideas de exploracion automatizadas, exportes PDF + CSV.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Dashboard agregado UI + view SQL con n≥5 + alertas configurables + ideas exploracion + exportes |
| Cowork | 12h | Validar umbrales psicometricos B2B (burnout, engagement, desconexion) + microcopy dashboard + spec ideas exploracion eticas |
| German | 8h | Cierre 1ra propuesta B2B + sign-off umbrales + iniciar gestion contrato + DPA con asesor legal |
| **Total** | **42h** | ≈24h presencial |

**Epicas activas:** EP-B2B-07 Dashboard agregado + EP-B2B-08 Guardrails eticos.

**DoD-codigo:** Dashboard funcional · n≥5 enforcement verificado en tests · Exportes PDF + CSV.
**DoD-research:** Umbrales B2B firmados por Cowork Investigador.

---

### S18 — B2B-A Pilot Release Gate + pen test + primer cliente ancla (2027-01-25 → 02-07)

**Goal:** **B2B-A Pilot Release Gate aprobado.** Pen test multi-tenant pasado. Cliente ancla 1 firmado + onboarded + empleados invitados.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 18h | Hardening B2B + monitoring multi-tenant + audit log inmutable + resolver findings pen test |
| Cowork | 12h | Reporte B2B Gate compliance + revisar DPA con asesor + Sprint Review trimestral S15-S18 |
| German | 12h | Contratar pen test (semana 1) + cierre cliente ancla 1 (contrato + DPA + pago up-front) + onboarding asistido |
| **Total** | **42h** | ≈26h presencial (sprint pico) |

**Epicas activas:** EP-B2B-09 Pen test + EP-B2B-10 Hardening + EP-B2B-11 Cliente ancla 1.

**Dependencias bloqueantes:** Pen test aprobado · DPA firmado · Cliente ancla 1 firma contrato.

**DoD-codigo:** Pen test sin findings criticos · B2B en produccion para cliente ancla.
**DoD-research:** Reporte B2B Gate archivado · Sprint Review trimestral.
**DoD-comercial:** Cliente ancla 1 pago up-front + empleados onboarded.

**Hito:** **B2B-A PILOT RELEASE GATE APROBADO.**

---

### S19 — Ikigai foundation: Ikigai-9 plugin + spec mapper (2027-02-08 → 02-21)

**Goal:** Plugin Ikigai-9 cargado. Spec del algoritmo mapper firmado por Cowork rol Investigador. Pesos del score ikigai-fit justificados.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 18h | Plugin Ikigai-9 + integracion en Paid existente + estructura de datos para mapper |
| Cowork | 14h | Pack Ikigai-9 v1.0 + spec algoritmo Ikigai_Mapper_v1.0 + validar uso comercial con Imai et al. + disclaimer cultural canonico |
| German | 6h | Primer dashboard review cliente ancla 1 + 2da propuesta B2B + validacion uso comercial Ikigai-9 |
| **Total** | **38h** | ≈22 h presencial |

**Epicas activas:** EP-IKIGAI-01 Ikigai-9 plugin + EP-IKIGAI-02 Mapper spec.

**DoD-codigo:** Ikigai-9 plugin funcional.
**DoD-research:** Pack + spec mapper + disclaimer cultural firmados.

---

### S20 — Algoritmo mapper integrador implementado (2027-02-22 → 03-07)

**Goal:** Algoritmo mapper integrador codificado (4 bloques + score ikigai-fit). Disclaimers culturales integrados en UI + reporte + FAQ.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 22h | Algoritmo mapper en TypeScript + score ikigai-fit + integracion con computed_scores Paid + disclaimers en UI |
| Cowork | 10h | Microcopy Venn + reflexiones guiadas (3-5 por patron de scores) + FAQ cultural completa |
| German | 6h | Onboarding cliente ancla 2 + 1ra propuesta cliente ancla 3 |
| **Total** | **38h** | ≈22 h presencial |

**Epicas activas:** EP-IKIGAI-03 Mapper engine + EP-IKIGAI-04 Disclaimers + EP-IKIGAI-05 Reflexiones.

**DoD-codigo:** Mapper produce scores consistentes con spec · Disclaimers visibles · Tests de regresión del score.
**DoD-research:** Microcopy Venn + reflexiones firmadas.

---

### S21 — UI Venn interactivo + PDF estatico (2027-03-08 → 03-21)

**Goal:** UI del Venn interactivo (SVG con hover y click). PDF estatico generado por worker async ≤30s. Responsive mobile.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 24h | SVG Venn interactivo + worker PDF + responsive mobile + integracion en reporte Ikigai |
| Cowork | 8h | Validar copy del PDF + revision FAQ + 1-2 emails educativos Ikigai post-Paid |
| German | 6h | Cierre cliente ancla 2 + revision UI Venn |
| **Total** | **38h** | ≈22 h presencial |

**Epicas activas:** EP-IKIGAI-06 UI Venn + EP-IKIGAI-07 PDF estatico + EP-IKIGAI-08 Emails educativos.

**DoD-codigo:** Venn interactivo funcional desktop + mobile · PDF ≤30s · Disclaimer en PDF.
**DoD-research:** Emails Ikigai firmados.

---

### S22 — Ikigai Beta cerrado + validacion alpha N≥200 (2027-03-22 → 04-04)

**Goal:** Beta cerrado de Ikigai Premium con 10-20 usuarios reales. Validacion alpha Ikigai-9 en muestra DescubreMe N≥200 (urbana vs Vinaccia rural).

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 14h | Bug fixes beta + ajustes performance + telemetria Ikigai |
| Cowork | 16h | Analisis psicometrico N≥200 + reporte validacion alpha + comparacion vs Vinaccia rural + ajustes finales score ikigai-fit si datos lo justifican |
| German | 8h | Reclutar beta testers + revision validacion + training equipo en respuesta a criticas culturales |
| **Total** | **38h** | ≈24 h presencial |

**Epicas activas:** EP-IKIGAI-09 Beta + EP-IKIGAI-10 Validacion psicometrica.

**DoD-codigo:** Beta cierra con feedback consolidado.
**DoD-research:** Validacion alpha publicada · Reporte para Ikigai Gate.

---

### S23 — Ikigai Premium Release Gate (2027-04-05 → 04-18)

**Goal:** **Ikigai Premium Release Gate aprobado. Lanzamiento publico Ikigai Premium USD 29**.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 16h | Hardening pre-launch + monitoring + Stripe add-on USD 29 + cross-sell desde Paid |
| Cowork | 12h | Validacion final · reporte Ikigai Gate · Sprint Review trimestral S19-S23 |
| German | 10h | Sign-off Ikigai Gate + comunicacion lanzamiento + revision FAQ + responder criticas culturales |
| **Total** | **38h** | ≈24 h presencial |

**Epicas activas:** EP-IKIGAI-11 Hardening + EP-IKIGAI-12 Launch.

**DoD-codigo:** Ikigai en produccion · Stripe add-on funcional · Cross-sell activo desde Paid.
**DoD-research:** Reporte Ikigai Gate archivado · Sprint Review trimestral.

**Hito:** **IKIGAI PREMIUM RELEASE GATE APROBADO.**

---

### S24 — Scale-up comercial B2B + analytics maduros (2027-04-19 → 05-02)

**Goal:** Cliente ancla 2 y 3 en pipeline avanzado. Analytics maduros: cohort analysis Free→Paid, retencion Paid, conversion Paid→Ikigai, retencion B2B-A.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 16h | Analytics dashboards + cohort analysis + reports automatizados |
| Cowork | 10h | Roadmap v2.0 draft (input para S25) + retrospectiva trimestral + iniciar pricing research B2B post-cliente ancla |
| German | 10h | Cerrar cliente ancla 3 + analisis pipeline B2B + decisiones de scale-up |
| **Total** | **36h** | ≈22 h presencial |

**Epicas activas:** EP-COMM-01 Analytics maduros + EP-COMM-02 Pipeline B2B + EP-PLAN-01 Roadmap v2.0 draft.

**DoD-codigo:** Dashboards de analytics funcionales.
**DoD-research:** Draft Roadmap v2.0.
**DoD-comercial:** Cliente ancla 3 firmado o en final stage.

---

### S25 — Cierre 12 meses + retrospectiva anual + Roadmap v2.0 (2027-05-03 → 05-16)

**Goal:** Retrospectiva anual completa. Roadmap v2.0 firmado. Plan post-v1.5 con decisiones de Matriz 2 (validacion local), K-1 Scale, instrumentos diferidos.

**Reparto:**

| Actor | Horas | Output |
|---|---|---|
| Claude Code | 10h | Refactors menores + technical debt cleanup + documentacion tecnica final |
| Cowork | 16h | Retrospectiva anual completa + Roadmap v2.0 final + decision docs nuevos + actualizar PRD_MAESTRO si aplica |
| German | 10h | Sign-off retrospectiva + sign-off Roadmap v2.0 + planning Q3 2027 + decision Matriz 2 |
| **Total** | **36h** | ≈22 h presencial |

**Epicas activas:** EP-PLAN-02 Retrospectiva anual + EP-PLAN-03 Roadmap v2.0 final.

**DoD:** Roadmap v2.0 publicado · Retrospectiva anual archivada en `01_estado/retrospectivas/anual_2027.md` · ADRs nuevos registrados.

---

## 8. Epicas por sub-PRD (vista cruzada)

Resumen agregado. Detalle de historias de usuario, AC y tareas etiquetadas vive en `02_producto/backlog/<producto>.md`.

### 8.1 Epicas B2C Free MVP1

| ID | Epica | Sprints |
|---|---|---|
| EP-FREE-01 | Infraestructura base + Auth magic link | S0-S1 |
| EP-FREE-02 | Modelo de datos completo + RLS basico | S1 |
| EP-FREE-03 | Consent & Compliance v0 (Ley 1581) | S1-S2 |
| EP-FREE-04 | Scoring Engine + Plugin Architecture | S2 |
| EP-FREE-05 | Report Builder + Questionnaire UX Engine | S3 |
| EP-FREE-06 | Plugins stack v2.0 (Flourishing, PVQ-RR, Ryff, FSS-9, MLQ, WAMI, W-BNS, CAAS) | S2-S5 |
| EP-FREE-07 | Distress Detector v0 + microcopy es-CO | S5 |
| EP-FREE-08 | Plugin PERMA-Profiler | S6 |
| EP-FREE-09 | Onboarding + emails educativos + Beta interno | S6 |
| EP-FREE-10 | M1 BFI-2-S 30 + versioning | S7 |
| EP-FREE-11 | Free Public Release Gate + lanzamiento | S8 |

**Total Free: 11 epicas, ~25 historias de usuario, ~80 tareas etiquetadas.**

### 8.2 Epicas B2C Paid USD 19

| ID | Epica | Sprints |
|---|---|---|
| EP-PAID-01 | Report Builder layer Paid + facetas | S9 |
| EP-PAID-02 | Stripe checkout one-time USD 19 + facturas + refund | S9 |
| EP-PAID-03 | Plugins emocionales (PANAS, MEMS, BPNSFS) | S9-S10 |
| EP-PAID-04 | M2 VIA-IS-P 96 plugin + License Audit Log | S10 |
| EP-PAID-05 | Plugins ocupacionales (CFI-R, WOLF, SWLS) | S10-S11 |
| EP-PAID-06 | 9 bloques tematicos + Dashboard progreso usuario | S11 |
| EP-PAID-07 | M3 WDQ-40 + reporte Paid completo + mapeo O*NET + recomendaciones | S12 |
| EP-PAID-08 | 3 upgrades premium (BFI-2 60, IPIP-NEO-120, HEXACO-60) | S13 |
| EP-PAID-09 | Paid Beta cerrado + refinamiento | S13 |
| EP-PAID-10 | Paid Public Release Gate + lanzamiento | S14 |

**Total Paid: 10 epicas, ~38 historias de usuario, ~110 tareas etiquetadas.**

### 8.3 Epicas B2B-A

| ID | Epica | Sprints |
|---|---|---|
| EP-B2B-01 | Multi-tenancy: organization + organization_admin + team + RLS | S15 |
| EP-B2B-02 | Tests RLS automatizados en CI (bloquean PRs) | S15 |
| EP-B2B-03 | Plugin UWES | S15-S16 |
| EP-B2B-04 | Admin Panel basico (setup + equipos + empleados + invitaciones) | S16 |
| EP-B2B-05 | Onboarding empleados (magic link batch + Google SSO opcional) | S16 |
| EP-B2B-06 | Dashboard agregado + view n≥5 + exportes | S17 |
| EP-B2B-07 | Alertas configurables + ideas exploracion + guardrails eticos | S17 |
| EP-B2B-08 | Penetration test multi-tenant + hardening | S18 |
| EP-B2B-09 | Estrategia comercial: discovery + propuesta + contrato + DPA | S15-S18 (stream) |
| EP-B2B-10 | B2B-A Pilot Release Gate + cliente ancla 1 | S18 |

**Total B2B-A: 10 epicas, ~36 historias de usuario, ~105 tareas etiquetadas.**

### 8.4 Epicas Ikigai Premium

| ID | Epica | Sprints |
|---|---|---|
| EP-IKIGAI-01 | Plugin Ikigai-9 + integracion con Paid | S19 |
| EP-IKIGAI-02 | Spec algoritmo mapper (Cowork) | S19 |
| EP-IKIGAI-03 | Algoritmo mapper integrador implementado (4 bloques + score) | S20 |
| EP-IKIGAI-04 | Disclaimers culturales canonicos en UI + reporte + FAQ + marketing | S20 |
| EP-IKIGAI-05 | UI Venn interactivo SVG + responsive mobile | S21 |
| EP-IKIGAI-06 | PDF estatico worker async | S21 |
| EP-IKIGAI-07 | Reflexiones guiadas (3-5 por patron) | S20 |
| EP-IKIGAI-08 | Cross-sell desde Paid + emails educativos | S21 |
| EP-IKIGAI-09 | Validacion psicometrica N≥200 | S22 |
| EP-IKIGAI-10 | Ikigai Premium Release Gate + lanzamiento | S23 |

**Total Ikigai: 10 epicas, ~18 historias de usuario, ~55 tareas etiquetadas.**

---

## 9. Gates obligatorios entre fases — checklist consolidado

Aplica DD-40 (clase A dura + clase B blanda + excepciones via ADR).

### 9.1 Gates duros transversales (aplican a todos los productos antes de release publico)

| # | Gate | Cuando | Owner |
|---|---|---|---|
| GT-1 | Asesor legal Ley 1581 contratado | Pre-S1 | German |
| GT-2 | Region hosting Supabase decidida y configurada | Pre-S0 | German |
| GT-3 | Cifrado en reposo AES-256 verificado | S1 | Claude Code |
| GT-4 | TLS 1.3+ obligatorio | S0 | Claude Code |
| GT-5 | Audit log inmutable activo | S1 | Claude Code |
| GT-6 | Politica privacidad + ToS publicados | S2 | Asesor + German |
| GT-7 | Consentimiento versionado + opt-in marketing separado | S1-S2 | Asesor + Claude Code |
| GT-8 | Derecho de eliminacion ≤2 clicks funcional | S2 | Claude Code |

### 9.2 Gates de milestones M1/M2/M3 (psicometricos + licencias)

| Milestone | Gate critico (duro) | Plan B documentado |
|---|---|---|
| M1 (S8) | Licencia BFI-2 firmada + alpha ≥0.70 + scoring auditado + NFR-27/28 BFI-2 activos | HEXACO-60 o lanzar Free sin ancla personalidad |
| M2 (S10) | Licencia VIA firmada + alpha ≥0.70 + License Audit Log activo | IPIP-VIA-R como fallback |
| M3 (S12) | 4 permisos WDQ-40 firmados + alpha ≥0.70 | Karasek 14 propio (degradado) o diferir M3 |

### 9.3 Release Gates de producto (ver §5)

Cada producto tiene su gate específico documentado en §5.1-5.4.

### 9.4 Procedimiento de excepcion (DD-40 mecanica)

Si un criterio duro no se puede cumplir a tiempo:
1. Redactar ADR en `DECISIONS_LOG.md` con: (a) criterio saltado, (b) razon, (c) plan remediacion + fecha, (d) sign-off explicito de German, (e) reversibilidad.
2. Maximo 1 excepcion activa por gate.
3. La excepcion se cierra cuando el criterio se cumple (otro ADR de cierre).
4. Si el plan de remediacion vence sin cumplirse, escalada obligatoria (replan del sprint/milestone).

---

## 10. Matriz de capacidad consolidada por sprint

Resumen de horas estimadas. Permite ver carga de cada actor a lo largo del ano.

| Sprint | Claude Code (h) | Cowork (h) | German (h) | Total (h) | Pico/Normal |
|---|---|---|---|---|---|
| S0 | 16 | 6 | 5 | 27 | Normal arranque |
| S1 | 18 | 8 | 6 | 32 | Normal |
| S2 | 20 | 10 | 5 | 35 | Normal |
| S3 | 22 | 10 | 4 | 36 | Normal |
| S4 | 24 | 12 | 3 | 39 | Normal |
| S5 | 22 | 12 | 4 | 38 | Normal |
| S6 | 20 | 12 | 6 | 38 | Normal |
| S7 | 22 | 10 | 6 | 38 | Normal |
| S8 | 18 | 12 | 8 | 38 | Hito M1 |
| S9 | 22 | 10 | 6 | 38 | Normal |
| S10 | 24 | 14 | 6 | 44 | Hito M2 |
| S11 | 22 | 10 | 4 | 36 | Normal |
| S12 | 24 | 14 | 8 | 46 | **Pico M3** |
| S13 | 18 | 14 | 8 | 40 | Normal |
| S14 | 18 | 12 | 10 | 40 | Hito Paid |
| S15 | 22 | 10 | 8 | 40 | Normal |
| S16 | 24 | 10 | 8 | 42 | Normal |
| S17 | 22 | 12 | 8 | 42 | Normal |
| S18 | 18 | 12 | 12 | 42 | **Pico B2B-A** |
| S19 | 18 | 14 | 6 | 38 | Normal |
| S20 | 22 | 10 | 6 | 38 | Normal |
| S21 | 24 | 8 | 6 | 38 | Normal |
| S22 | 14 | 16 | 8 | 38 | Normal |
| S23 | 16 | 12 | 10 | 38 | Hito Ikigai |
| S24 | 16 | 10 | 10 | 36 | Normal |
| S25 | 10 | 16 | 10 | 36 | Cierre anual |
| **Total** | **524 h** | **284 h** | **181 h** | **989 h** | |
| **Promedio/sprint** | **20.2 h** | **10.9 h** | **6.9 h** | **38 h** | |

**Tu tiempo presencial promedio estimado:** 22 h/sprint = 11 h/semana, dentro del rango 15-25 h/sem declarado con holgura.

**Sprints de pico:** S12 (M3 con 4 permisos + algoritmo O*NET) y S18 (B2B Pilot Gate con pen test + cliente ancla). Reservar capacidad extra estos sprints o aceptar trade-off.

---

## 11. Modelo de comunicacion de avance (DD-41)

### 11.1 Cadencia y artefactos

| Cadencia | Artefacto | Owner | Donde vive |
|---|---|---|---|
| Cierre de cada sesion | Actualizar STATUS.md | Claude Code o Cowork | `01_estado/STATUS.md` |
| Cierre de cada sprint (sabado) | Sprint Review escrito SR-N | Cowork con German | `01_estado/sprint_reviews/SR-N.md` |
| Cierre de sprint con milestone | Actualizar CHANGELOG.md | Cowork | `01_estado/CHANGELOG.md` |
| Decision no trivial tomada | ADR en DECISIONS_LOG | Cowork o Claude Code | `01_estado/DECISIONS_LOG.md` |
| Sprint nuevo iniciado | Sprint Plan S-N | Cowork con German | `01_estado/sprints/S-N_plan.md` |
| Trabajo nuevo descubierto | Anadir a BACKLOG | Quien descubre | `01_estado/BACKLOG.md` |

### 11.2 Sprint Review template (1-2 paginas)

Estructura obligatoria:

1. Sprint N (fechas).
2. Goal del sprint vs. resultado real.
3. Entregables (lista con links a artefactos).
4. No entregado y por que (puede mapear a ADR de excepcion DD-40).
5. Aprendizajes: que funciono, que no, que cambiar.
6. Metricas:
   - Horas Cowork reales vs. estimadas.
   - Horas Claude Code reales vs. estimadas.
   - Horas German reales vs. estimadas.
   - % avance del milestone activo.
   - Riesgos materializados.
7. Decisiones tomadas (links a DECISIONS_LOG).
8. Proximo sprint: goal + 3 riesgos top.

### 11.3 Escalada selectiva (DD-41)

- **S0-S6:** solo Sprint Reviews.
- **S7+:** sumar Weekly check-in (`01_estado/weekly/YYYY-MM-DD.md`) SI se detecta drift sostenido en planeacion semanal.
- **S15+:** sumar Dashboard ejecutivo curado para Stream Comercial B2B.

### 11.4 Retrospectivas trimestrales

Cada 6 sprints (3 meses), Sprint Review extendido (~120 min) con vista trimestral:
- S8 (Q3 cierre 2026).
- S14 (Q4 cierre 2026).
- S18 (Q1 cierre 2027).
- S23 (Q2 cierre 2027).
- S25 (anual cierre).

---

## 12. Riesgos del roadmap + reversibilidad

### 12.1 Riesgos principales

Subset de A5 + riesgos especificos del roadmap.

| ID | Riesgo | Prob. | Impacto | Sprints afectados | Reversibilidad / Plan B |
|---|---|---|---|---|---|
| R-01 | Licencia BFI-2 no se obtiene | Media | Alto | S7-S8 (M1) | Plan B: HEXACO-60 (cambia arquitectura reportes a 6 factores). Decision al cierre S6. |
| R-02 | Licencia VIA-IS-P no se obtiene | Media | Alto | S10 (M2) | Plan B: IPIP-VIA-R (Core Strengths 18, menor validez). Decision al cierre S9. |
| R-03 | Permisos WDQ-40 (4 titulares) no se obtienen | Alta | Alto | S12 (M3) | Plan B: Karasek 14 propio (degradado) o diferir M3 a S20-S22. Decision al cierre S11. |
| R-04 | Licencia UWES Triple i no se obtiene | Media | Medio | S15-S16 (B2B) | Plan B: omitir UWES en B2B-A v1.5, usar engagement aproximado via PERMA. |
| R-05 | Asesor legal Ley 1581 no se contrata a tiempo | Baja | Alto | S1-S8 (Free) | Sin asesor no lanza Free. Contactar 2-3 asesores en S0. |
| R-06 | German baja capacidad <15 h/sem por mas de 2 sprints | Media | Alto | Cualquier sprint | Activar plan de reduccion de scope (mover features a P1/P2/P3). |
| R-07 | Beta interno detecta defectos criticos no anticipados | Media | Alto | S6, S13, S18, S22 | Reservar +25% capacidad en sprints post-beta para fixes. |
| R-08 | Cliente ancla B2B no firma o se retira | Alta | Medio | S17-S18 | Tener 2-3 prospectos en pipeline maduro al cierre S15. |
| R-09 | Pen test multi-tenant encuentra findings criticos | Media | Alto | S18 | +1 sprint de remediacion (B2B Pilot Gate se atrasa a S20). |
| R-10 | Pricing Paid USD 19 no valida en Colombia | Media | Medio | S13-S14 | Test A/B a USD 14 / 19 / 24 con muestra real Sprint 6+. |
| R-11 | Dropoff Free >objetivo (40% completion) | Media | Medio | S8 | Mitigaciones UX (microcopy, save & resume mejorado) sin cambiar producto core. |
| R-12 | Conversion Free→Paid <3% | Media | Medio | S14+ | Iterar copy CTA + 2 emails educativos. Decision sobre 3er email post-S20. |
| R-13 | Validacion Ikigai-9 N≥200 no alcanza alpha .70 | Baja | Alto | S22 | Posponer Ikigai Public Gate. Usar Ikigai-9 como input no expuesto. |
| R-14 | Score ikigai-fit criticado culturalmente | Alta | Medio | S23+ | Training del equipo + FAQ canonica + responder en redes con base etica. |
| R-15 | Drift de cadencia (carry-over >40% sostenido) | Media | Medio | Cualquier sprint | Re-planear con sprints de 3 semanas (ADR de cambio DD-38). |

### 12.2 Reversibilidad por hito

| Hito | Si se atrasa, que se atrasa | Mitigacion |
|---|---|---|
| M1 (S8) | Free Public Release Gate | Plan B HEXACO-60 (mantiene cronograma) |
| M2 (S10) | Paid Public Gate parcial (Paid puede lanzar sin VIA con IPIP-VIA-R) | Plan B IPIP-VIA-R |
| M3 (S12) | B2B-A Pilot Gate (WDQ-40 es ancla del B2B) | Plan B Karasek o diferir B2B-A a S20-S22 |
| Free Public Gate (S8) | Paid Beta (depende de Free maduro) | Lanzar Free privado con beta testers + iterar antes de publico |
| Paid Public Gate (S14) | B2B-A (hereda Paid) + Ikigai (depende de Paid) | Pivotar a B2C focus si Paid no madura |
| B2B-A Pilot Gate (S18) | Stream Comercial B2B | Stream B2C como salvavidas de revenue v1.5 |
| Ikigai Premium Gate (S23) | Cierre del scope 4 productos v1.5 | Lanzar v1.5 con 3 productos (Free + Paid + B2B-A); Ikigai a v1.6 |

---

## 13. Apendice: convenciones del roadmap

### 13.1 Etiquetas de tareas

Cada tarea en los backlogs detallados (`02_producto/backlog/<producto>.md`) lleva una o varias etiquetas:

| Etiqueta | Tipo de trabajo | Owner principal |
|---|---|---|
| `[FE]` | Frontend (Next.js, React, UI) | Claude Code |
| `[BE]` | Backend (Next.js API routes, Edge Functions, lógica de servidor) | Claude Code |
| `[DB]` | Base de datos (schema, migrations, RLS, views) | Claude Code |
| `[UX]` | Diseno UX + microcopy + flow | Cowork UX Writer |
| `[QA]` | Testing (unit, integration, E2E, RLS, regresión) | Claude Code |
| `[DevOps]` | CI/CD, infra, monitoring, alertas | Claude Code |
| `[Research]` | Investigacion psicometrica, dossiers, packs | Cowork rol Investigador |
| `[Legal]` | Asesor legal, ToS, politica privacidad, DPA, contrato B2B | Asesor + German |
| `[Compliance]` | Consentimiento, auditoria, RNBD, derecho eliminacion | Cowork + Claude Code |
| `[Licencias]` | Negociacion titulares de licencia | German + Cowork |
| `[Comercial]` | Discovery, propuesta, contrato B2B | German + Cowork Estratega |
| `[Pricing]` | Validacion de precio, research mercado | German + Cowork |
| `[Content]` | Redaccion de bandas, interpretaciones, recomendaciones | Cowork + Investigador |
| `[Analytics]` | Event tracking, dashboards funnel, cohort analysis | Claude Code |

### 13.2 Formato de historia de usuario

```
**HU-XX:** Como [rol], quiero [accion], para [outcome].

**AC (Criterios de Aceptacion):**
- AC1: Given [contexto], When [accion], Then [resultado].
- AC2: ...

**Tareas:**
- [FE] Descripcion tarea frontend.
- [BE] Descripcion tarea backend.
- [DB] Descripcion tarea DB.
- [UX] Descripcion tarea UX.
- [QA] Descripcion tarea testing.

**Sprint:** S-N
**Owner:** Claude Code / Cowork / German
**Epica:** EP-XXX-NN
```

### 13.3 Definition of Done por tipo de trabajo

**DoD-codigo:**
- Tests unitarios + integración pasando en CI.
- Linter sin warnings (eslint + typescript strict).
- Cobertura tests ≥70% en codigo nuevo.
- Sin `console.log` en codigo de produccion.
- Sin vulnerabilidades criticas en `npm audit`.
- WCAG AA verificado para nuevas vistas.
- Documentado en README del modulo si aplica.

**DoD-research:**
- Documento publicado en su carpeta canonica (`03_dossiers/`, `04_implementation_packs/`, `02_producto/anexos/`).
- Citas APA 7 con URL/DOI cuando aplica.
- Marcado `[sin fuente verificada]` cuando aplica.
- Limitaciones y contexto cultural notados.
- Cross-referenciado en `_MANIFEST.md` si entra a Tier 1 o 2.

**DoD-comercial:**
- Documento de propuesta personalizado por cliente (no template generico).
- Validado por Cowork rol Estratega.
- Firmado digitalmente por cliente y German.
- Archivado en `06_compliance/` (DPAs) o `02_producto/propuestas/` segun tipo.

**DoD-legal:**
- Firmado por asesor legal externo con NDA archivado.
- Version controlled en git con `effective_date`.
- Comunicado a usuarios si afecta ToS o privacidad (banner + email).
- Referenciado en `06_compliance/`.

### 13.4 RACI por rol

| Actividad | Responsable | Aprueba | Consultado | Informado |
|---|---|---|---|---|
| Implementacion codigo | Claude Code | German | Cowork (spec) | — |
| Spec funcional / PRD / Backlog | Cowork (PM) | German | Claude Code | — |
| Research psicometrica | Cowork (Investigador) | German | — | Claude Code |
| Microcopy + UX | Cowork (UX Writer) | German | — | Claude Code |
| Decisiones de producto | German | German | Cowork PM | Claude Code |
| Negociacion licencias | German | German | Cowork | — |
| Decisiones legales | Asesor legal | German | Cowork | Claude Code |
| Decisiones tecnicas (stack, DB, RLS) | Claude Code | German | Cowork | — |
| Decisiones de pricing | German | German | Cowork (research) | — |
| Comercial B2B (discovery, propuesta, contrato) | German | German | Cowork Estratega | — |

### 13.5 Convencion de nombres de archivos del roadmap

| Tipo | Convencion | Ejemplo |
|---|---|---|
| Sprint Plan | `S-N_plan.md` | `S-3_plan.md` |
| Sprint Review | `SR-N.md` | `SR-3.md` |
| Weekly check-in | `weekly/YYYY-MM-DD.md` | `weekly/2026-08-10.md` |
| Backlog por producto | `02_producto/backlog/<PRODUCTO>.md` | `02_producto/backlog/B2C_Free.md` |

---

## 14. Changelog del ROADMAP

| Version | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-05-13 | Cowork PM + German | Version inicial. Decisiones DD-38 (sprint 2 sem), DD-39 (capacidad variable), DD-40 (gates hibridos), DD-41 (Sprint Reviews), DD-42 (26 sprints S0-S25). |

---

*Fin del ROADMAP.md v1.0. Documento vivo. Actualizar al cierre de cada milestone o cada vez que un Sprint Review introduzca cambio material al plan. Cualquier cambio relevante debe registrarse en este changelog y referirse al ADR correspondiente en `01_estado/DECISIONS_LOG.md`.*
