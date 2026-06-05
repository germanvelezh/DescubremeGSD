# PRD_MAESTRO — DescubreMe (v1.5)

**Producto:** DescubreMe — plataforma web de autoconocimiento profundo para adultos LATAM.
**Owner:** German Velez Hurtado (germanvelezh@gmail.com).
**Version del PRD:** 1.0
**Fecha:** 2026-05-13
**Estado:** Borrador para revision del owner.
**Horizonte:** 12 meses (2026-05 a 2027-05).
**Productos cubiertos:** B2C Free MVP1, B2C Paid USD 19, B2B-A, Ikigai Premium.
**Audiencia primaria:** Claude Code (implementacion) y German (owner).

**Documentos relacionados:**

- Arquitectura: `00_arquitectura/_ARQUITECTURA_TESTS_REUTILIZABLES.md`
- Matriz de instrumentos: `00_arquitectura/_MATRIZ_MAESTRA.md`
- Stack por producto: `00_arquitectura/_STACK_POR_PRODUCTO.md`
- Anexos del PRD: `02_producto/anexos/A1-A5` (Glosario, NFRs, Mapa de instrumentos, Etica/Compliance, Riesgos).
- Sub-PRDs por producto: `02_producto/PRD_B2C_Free_v1.5.md`, `PRD_B2C_Paid_v1.5.md`, `PRD_B2B-A_v1.5.md`, `PRD_Ikigai_Premium_v1.5.md` (pendientes).
- Memoria viva: `01_estado/STATUS.md`, `BACKLOG.md`, `CHANGELOG.md`, `DECISIONS_LOG.md`.

---

## 1. Resumen ejecutivo

DescubreMe es una plataforma web de autoconocimiento profundo para adultos LATAM, que integra alrededor de 25 instrumentos psicometricos validados y mapas ocupacionales O*NET en un motor unificado de perfilado. Cubre valores, intereses, motivacion, personalidad, fortalezas, skills, diseno del trabajo, sentido y ajuste persona-trabajo. No es clinico ni diagnostico. Es educativo, orientador y de desarrollo. El MVP v1.5 cubre cuatro productos sobre una sola plataforma: un Free de adquisicion, un Paid transaccional de perfil profundo, un B2B con dashboard agregado anonimo y un mapper integrador Ikigai. Las restricciones no negociables son cuatro licencias bloqueantes pendientes, compliance Ley 1581 Colombia y rigor psicometrico minimo por escala (alpha/omega) antes de mostrar resultados al usuario.

---

## 2. Vision y proposito

### 2.1 Problema que resuelve

El adulto LATAM que busca entender quien es y como se ajusta al mundo del trabajo tiene tres caminos hoy y los tres fallan en distinto eje:

| Camino actual | Falla |
|---|---|
| Tests gratuitos en linea (16Personalities, Truity, autotests de revistas) | Carecen de validez psicometrica documentada, no traducen a decisiones de carrera, refuerzan estereotipos (MBTI, eneagrama) |
| Coaching de carrera / orientacion vocacional 1:1 | Costo alto (USD 80-300 por sesion), variabilidad enorme por terapeuta, no escalable |
| Plataformas premium globales (BetterUp, MyersBriggs.com, Strong) | Pricing inviable LATAM, en ingles, sin contextualizacion cultural, instrumentos no validados localmente |

### 2.2 Diferenciacion DescubreMe

- **Rigor psicometrico transparente:** todo instrumento del stack v1.5 declara version, validez, baremos y limitaciones al usuario, no como detalle tecnico sino como parte del producto.
- **Adaptacion cultural es-CO / es-MX:** el contenido nace en espanol Colombia como default; LATAM no es traduccion de ingles.
- **Integracion entre instrumentos:** un solo perfil consolida personalidad, valores, intereses, fortalezas, sentido y diseno del trabajo. La competencia vende silos.
- **Mapeo a ocupaciones via O*NET, no determinismo:** sugerencias de exploracion, no veredictos de "tu carrera ideal es X".
- **No clinico, no seleccion:** lineas claras sobre lo que el producto NO hace.

### 2.3 Proposicion de valor por audiencia

| Audiencia | Valor que recibe |
|---|---|
| Adulto LATAM individual (B2C Free + Paid) | Perfil integrado, riguroso, accionable, en su idioma, a precio asequible |
| Empresa (B2B-A) | Diagnostico organizacional anonimo de personalidad, engagement y diseno del trabajo, sin tocar decisiones de seleccion |
| Usuario que busca proposito (Ikigai Premium) | Mapa visual integrador que conecta lo que hace, lo que ama, en lo que es bueno y lo que le pagan, con disclaimer cultural explicito |

---

## 3. Usuarios y casos de uso

**Supuesto explicito:** las personas descritas a continuacion son hipotesis pre-research. Deben validarse con user research cualitativo Colombia (n=15-20) en Sprint 10. El maestro las usa para anclar coherencia entre sub-PRDs; sub-PRDs deberan refinarlas con datos reales.

### 3.1 Personas

**P1 — Adulto en transicion (B2C Free / Paid).**
- 28-38 anos, profesional con 5-10 anos de experiencia, urbano LATAM (Bogota, CDMX, Medellin, Monterrey).
- Cuestionando su carrera actual, considerando estudio adicional, cambio de industria o emprendimiento.
- Busca claridad antes de tomar una decision irreversible.

**P2 — Profesional senior reflexivo (B2C Paid + Ikigai Premium).**
- 38-55 anos, directivo/senior IC.
- Decisiones de tercer acto: reorientacion, jubilacion activa, proyectos personales, sentido.
- Mas dinero disponible, mas escepticismo sobre tests "de revista".

**P3 — Empleado en empresa B2B-A (recibido como beneficio).**
- Cualquier edad, dentro de una organizacion contratante.
- Llega via su empleador, no auto-iniciativa. Necesita confianza en privacidad y no-uso para seleccion.
- Su empleador recibe el dashboard agregado anonimo.

**P4 — Buscador de proposito (Ikigai Premium).**
- 30-50 anos, ha leido sobre ikigai, lifedesign o "purpose work".
- Quiere algo mas integrado que un test individual, busca un "mapa".
- Riesgo: confunde el Venn de 4 circulos con ikigai japones. El producto debe educar, no perpetuar el error.

### 3.2 Jobs-to-be-done (JTBD) por persona

| Persona | JTBD principal |
|---|---|
| P1 | "Cuando estoy considerando cambiar de carrera, quiero entender mis fortalezas, intereses y valores con rigor, para tomar una decision informada y no impulsiva." |
| P2 | "Cuando reviso mi tercer acto, quiero un mapa integrado de quien soy hoy, para decidir donde poner mi energia en los proximos 10-15 anos." |
| P3 | "Cuando mi empleador me invita a un proceso de autoconocimiento, quiero certeza de que mis datos no afectaran mi evaluacion de desempeno, para participar honestamente." |
| P4 | "Cuando exploro proposito de vida, quiero ver como mis fortalezas, valores e intereses se conectan en una vista unica, para encontrar coherencia o nombrar tensiones." |

### 3.3 Anti-personas (NO son audiencia de DescubreMe)

- Profesionales clinicos buscando herramienta diagnostica.
- Reclutadores buscando filtrar candidatos.
- Adolescentes (menores de 18, fuera de scope v1.5).
- Investigadores academicos buscando datos para publicacion (acceso requiere acuerdo de investigacion separado, fuera de v1.5).

---

## 4. Alcance global v1.5 a 12 meses

| Producto | Que entra v1.5 | Que NO entra v1.5 | Milestone target | Dependencia critica |
|---|---|---|---|---|
| **B2C Free MVP1** | 4 instrumentos (BFI-2-S, Flourishing, O*NET IP SF, PERMA-Profiler). Onboarding + reporte sintetico. Auth con magic link. | Mapeo O*NET completo, facetas detalladas, upgrades premium. | Q3 2026 (Sprint 3 — gate M1) | Licencia Soto-John (BFI-2). PERMA licencia. |
| **B2C Paid USD 19** | 18 instrumentos core + 3 upgrades opcionales. Reporte completo con facetas, O*NET map, NFR-28. Stripe checkout. | Plan anual, descuentos volumen, regalos. | Q3-Q4 2026 (Sprints 4-6) | Licencias VIA Institute, PANAS, MEMS, CFI-R. |
| **B2B-A** | Stack Free + Paid + 5 modulos trabajo (WDQ-40, UWES, BPNSFS, WOLF, SWLS). Dashboard agregado anonimo. Multi-tenant via RLS. | Comparativos entre empresas, integraciones HRIS (Workday, BambooHR), API para el cliente. | Q4 2026 (Sprints 7-9) | Licencias WDQ-40 (4 titulares), UWES. |
| **Ikigai Premium** | Mapper integrador con Ikigai-9 como eje. UI Venn con disclaimer cultural. Add-on al Paid. | K-1 Scale (diferido a v1.6 Q1 2028), version standalone sin Paid. | Q1 2027 (Sprints 11-12) | Stack Paid completo. |

**Gates explicitos entre productos:** Free es prerequisito de Paid. Paid es prerequisito de Ikigai. B2B-A es paralelo a Free y Paid pero requiere ambos en su stack.

---

## 5. Los 4 productos

### 5.1 B2C Free MVP1

| Dimension | Definicion |
|---|---|
| **Para quien** | P1, P2 en exploracion inicial; embudo de adquisicion para Paid |
| **Que recibe el usuario** | Perfil sintetico: 5 dominios Big Five + nivel general de florecimiento + perfil RIASEC top 3 + 5 pilares PERMA |
| **Tiempo total** | 12-18 minutos distribuibles en 1-2 sesiones |
| **Instrumentos** | BFI-2-S 30 (M1), Flourishing Scale, O*NET IP SF, PERMA-Profiler |
| **Pricing** | Gratuito. Email + consentimiento como entrada. |
| **Metrica norte** | % usuarios que completan Free + visualizan reporte (objetivo: 60% supuesto, validar) |
| **Conversion objetivo a Paid** | 5-10% en 30 dias (supuesto, requiere validacion) |
| **Out-of-scope Free** | No mostrar facetas detalladas, no O*NET completo, no comparativos historicos |
| **Sub-PRD** | `02_producto/PRD_B2C_Free_v1.5.md` (pendiente) |

### 5.2 B2C Paid USD 19

| Dimension | Definicion |
|---|---|
| **Para quien** | P1, P2 con compromiso de profundidad; usuarios que convirtieron desde Free |
| **Que recibe el usuario** | Reporte completo: facetas Big Five, 24 fortalezas VIA, valores Schwartz, sentido (MLQ + MEMS + WAMI), bienestar (Ryff + PERMA + SWLS + Flourishing), flow (FSS-9), engagement, mapeo a ocupaciones O*NET, recomendaciones personalizadas |
| **Tiempo total** | 95-130 minutos distribuidos en 4-6 sesiones |
| **Instrumentos** | 18 core (ver `_STACK_POR_PRODUCTO.md` §B2C Paid). Upgrades opcionales: BFI-2 60, IPIP-NEO-120, HEXACO-60 |
| **Pricing** | USD 19 one-time. Equivalente COP por geolocalizacion. Upgrades: TBD pricing research. |
| **Metrica norte** | % usuarios Paid que completan reporte (objetivo: 75% supuesto) + NPS del reporte (objetivo: ≥40 supuesto) |
| **Out-of-scope Paid** | Coaching 1:1, integracion con calendarios, version "para tu pareja" |
| **Sub-PRD** | `02_producto/PRD_B2C_Paid_v1.5.md` (pendiente) |

### 5.3 B2B-A (empresarial)

| Dimension | Definicion |
|---|---|
| **Para quien** | Empresas medianas LATAM (50-500 empleados) con area de gente / cultura activa |
| **Que recibe el empleado** | Mismo perfil Paid + modulos de trabajo (WDQ-40 diseno del trabajo, UWES engagement, BPNSFS, WOLF, SWLS) |
| **Que recibe la empresa** | Dashboard agregado anonimo con medias por equipo (n≥5 por celda), tendencias trimestrales, identificacion de equipos en riesgo de burnout o desconexion. NO ve individuos. |
| **Tiempo del empleado** | 120-160 minutos distribuidos |
| **Pricing rango objetivo** | USD 8-15 por empleado/mes en contrato anual (rango supuesto, requiere pricing research B2B LATAM). Minimo 50 empleados. |
| **Metrica norte** | Contratos B2B firmados (objetivo: 3 clientes ancla en Q4 2026, supuesto) + NRR ≥90% (supuesto) |
| **Out-of-scope B2B v1.5** | Decisiones de seleccion, promocion, despido. Comparativos entre empresas. API publica. Integraciones HRIS. |
| **Sub-PRD** | `02_producto/PRD_B2B-A_v1.5.md` (pendiente) |

### 5.4 Ikigai Premium

| Dimension | Definicion |
|---|---|
| **Para quien** | P2, P4 con compra Paid previa que buscan integracion de proposito |
| **Que recibe el usuario** | Mapa visual integrado de 4 bloques (lo que amo, en lo que soy bueno, lo que el mundo necesita, por lo que me pagan) + Ikigai-9 como eje + disclaimer cultural visible |
| **Instrumentos** | No anade tests nuevos. Reutiliza tests del Paid + Ikigai-9 + O*NET. |
| **Tiempo extra** | 10-15 minutos sobre el Paid (solo para Ikigai-9 + onboarding del mapper) |
| **Pricing rango objetivo** | USD 29-49 como add-on al Paid USD 19 (rango supuesto, requiere pricing research). Implica que el usuario gasta USD 48-68 total para llegar a Ikigai. |
| **Metrica norte** | % Paid que activa Ikigai en 90 dias (objetivo: 15-25% supuesto) |
| **Out-of-scope Ikigai v1.5** | Version standalone sin Paid. K-1 Scale. Coaching guiado sobre el mapa. |
| **Sub-PRD** | `02_producto/PRD_Ikigai_Premium_v1.5.md` (pendiente) |

---

## 6. Principios de diseno del producto

Estos principios anclan decisiones de diseno y son criterios de revision de cualquier feature o sub-PRD. Si una propuesta viola un principio, debe quedar documentado por que la excepcion es justificada.

| # | Principio | Consecuencia practica |
|---|---|---|
| 1 | **Metadata sobre codigo** | Los instrumentos viven como datos versionados en tablas (`instrument`, `instrument_version`, `item`, `scoring_rule`, `baremo`). Anadir un test no requiere release de codigo. |
| 2 | **No diagnostico clinico** | Ningun output del producto puede leerse como diagnostico, etiqueta clinica o recomendacion de tratamiento. Copy debe pasar revision etica. |
| 3 | **No determinismo vocacional** | El producto sugiere exploracion ("estas ocupaciones podrian resonar contigo"), no asigna ("tu carrera ideal es X"). |
| 4 | **No seleccion B2B** | El producto B2B-A no produce outputs utilizables para decisiones de contratacion, promocion o despido. Esta restriccion va en el contrato comercial. |
| 5 | **Transparencia psicometrica al usuario** | El usuario ve la version del instrumento, su confiabilidad y limitaciones. No se ocultan baremos ni se inflan resultados. |
| 6 | **Consentimiento granular y revocable** | Consentimiento separado por producto (Free, Paid, B2B, Ikigai) y revocable en ≤2 clicks. Cumple Ley 1581 Colombia. |
| 7 | **Reutilizacion de respuestas, no de tests** | Una respuesta del usuario a un instrumento se guarda una vez y se proyecta a los productos que la usan. Cero re-toma innecesaria entre tiers. |
| 8 | **Compliance por diseno, no por wrapper** | Datos sensibles se identifican en el modelo (`sensitivity`, `ethical_flags`), no en logica de aplicacion. NFR-27 y NFR-28 se disparan automaticamente. |
| 9 | **Auditabilidad de licencias** | Cada administracion de instrumento queda en `usage_log` para reportar a titulares. Cero "tests piratas". |
| 10 | **Espanol Colombia como default, no traduccion de ingles** | Microcopy, items adaptados, baremos LATAM cuando existan. Ingles disponible pero secundario. |

---

## 7. Metricas top-level (12 meses)

**Convencion:** los rangos objetivo marcados "supuesto" requieren validacion empirica antes de comprometerse. Los marcados "no negociable" son hard floors del producto.

### 7.1 Metricas de producto y research

| Metrica | Definicion | Rango objetivo | Estado |
|---|---|---|---|
| **Activacion Free** | % usuarios registrados que completan al menos un instrumento Free | ≥60% | Supuesto, validar Sprint 2 |
| **Completion Free** | % usuarios que completan los 4 instrumentos del Free | ≥40% | Supuesto |
| **Completion Paid** | % usuarios Paid que terminan los 18 instrumentos core en ≤30 dias | ≥75% | Supuesto |
| **Dropoff por instrumento** | % usuarios que abandonan dentro de un instrumento iniciado | ≤15% por instrumento | Supuesto, instrumentos largos (>15 min) requeriran segmentacion |
| **Engagement retorno** | % usuarios que vuelven al reporte 7 y 30 dias post-completion | ≥30% (7d), ≥15% (30d) | Supuesto |
| **NPS reporte Paid** | NPS a 14 dias post-completion | ≥40 | Supuesto |
| **Calidad psicometrica** | Alpha/omega ≥0.70 por escala antes de mostrar resultado al usuario | Por escala, no negociable | No negociable |
| **Consentimiento** | % flujos con consentimiento explicito firmado | 100% | No negociable (Ley 1581) |

### 7.2 Metricas comerciales top-level

| Metrica | Definicion | Rango objetivo | Estado |
|---|---|---|---|
| **Conversion Free a Paid** | % usuarios Free que compran Paid en 30 dias | 5-10% | Supuesto |
| **AOV Paid** | Precio medio efectivo de Paid (con upgrades) | USD 22-28 | Supuesto |
| **Churn refund Paid** | % compras Paid con refund a 30 dias | ≤5% | Supuesto |
| **Activacion Ikigai** | % usuarios Paid que compran Ikigai Premium en 90 dias | 15-25% | Supuesto |
| **Contratos B2B firmados** | Clientes B2B-A activos a 12 meses | 3-8 contratos | Supuesto (clientes ancla LATAM) |
| **NRR B2B** | Net Revenue Retention de contratos B2B activos | ≥90% | Supuesto |

### 7.3 Metricas fuera del PRD_MAESTRO

CAC, LTV, payback, gross margin, forecast mensual de ingresos y costos operativos viven en un business case separado o en el `ROADMAP.md`, no aqui. La razon es que requieren supuestos de mercado que aun no estan validados; meterlos en el maestro crea falsa precision.

---

## 8. Out-of-scope explicito v1.5

Lo que el producto deliberadamente NO hace en este horizonte de 12 meses. Cualquier sub-PRD que proponga algo de esta lista debe pasar por revision del owner.

| Categoria | Out-of-scope |
|---|---|
| **Clinico** | Diagnostico DSM-5/CIE-11, screening clinico de depresion/ansiedad, recomendaciones de tratamiento, intervencion terapeutica, derivacion automatica a profesional clinico (solo informativa NFR-28) |
| **Seleccion / RH** | Outputs utilizables para contratacion, promocion, despido, evaluacion de desempeno. Comparativos individuales en B2B. |
| **Determinismo** | "Tu carrera ideal es X", "tu pareja ideal", "tu emprendimiento ideal", prediccion de exito individual, ranking entre usuarios |
| **Instrumentos fuera del stack v1.5** | MBTI, eneagrama, DISC, astrologia, grafologia, numerologia, instrumentos sin validacion peer-reviewed |
| **Funcionalidades de plataforma** | App mobile nativa (iOS / Android), coaching 1:1 dentro del producto, marketplace de coaches, calendario integrado, chat con expertos |
| **Idiomas v1.5** | Cualquier idioma fuera de es-CO (default), es-MX, en (secundario). Sin portugues, sin frances. |
| **Integraciones B2B v1.5** | HRIS (Workday, BambooHR), SSO empresarial avanzado (SAML mas alla de Google Workspace), API publica al cliente, exports automaticos a sistemas externos |
| **Investigacion academica** | Acceso a datos agregados para investigacion. Requiere acuerdo de investigacion separado fuera de v1.5. |
| **Edad** | Menores de 18 anos. Adolescentes y educacion media quedan fuera de scope. |
| **Diferidos explicitos** | K-1 Scale (v1.6 Q1 2028), Ikigai-Ryff (descartado), Strong Interest Inventory, SDS Holland, PGI, NEO-PI-3 (descartados por costo o redundancia) |

---

## 9. Riesgos no negociables (top 5)

Sintesis. Detalle completo de los 12+ riesgos del proyecto en `02_producto/anexos/A5_RIESGOS_CONSOLIDADOS.md`.

| ID | Riesgo | Impacto si materializa | Mitigacion |
|---|---|---|---|
| **R-01** | Licencia BFI-2 no se obtiene de Soto-John | Bloquea Free MVP1 + Paid M1 | Plan B: HEXACO-60 como upgrade premium con tematica Honestidad-Humildad (Lee-Ashton) |
| **R-02** | Licencia VIA-IS-P no se obtiene de VIA Institute | Bloquea M2 en Paid | Plan B: IPIP-VIA-R (Bluemke 2024) como version dominio publico, con perdida de comparabilidad con VIA-IS-P |
| **R-03** | Permisos WDQ-40 (4 titulares: APA, Bayona, COP Madrid, Elsevier Espana) no se cierran | Bloquea M3 en B2B-A | Plan B: WDQ-77 ingles via APA o Karasek 14 propio (downgrade psicometrico) |
| **R-04** | Compliance Ley 1581 requiere asesoria legal externa no contratada | Riesgo legal en lanzamiento + posible multa Superintendencia | Agendar revision pre-Sprint 1 con abogado especializado |
| **R-05** | Riesgo cultural Ikigai (Venn != ikigai japones) | Reputacional + criticas academicas | Disclaimer explicito en UI antes y dentro del mapper (Hasegawa/Kamiya/Mogi vs Zuzunaga/Winn) |

---

## 10. Gates de release

Antes de lanzar cualquier producto (Free, Paid, B2B-A, Ikigai), deben cerrarse simultaneamente los 3 gates. Si uno falla, no se lanza.

### Gate 1 — Psicometrico

- Alpha o omega ≥0.70 por escala en muestra LATAM real (n≥200 usuarios).
- CFA con CFI≥0.90 y RMSEA≤0.08 cuando aplique (instrumentos multidimensionales).
- Baremos cargados para CO, MX (o INTL como fallback).
- Reglas de scoring auditadas vs publicaciones originales (Cowork verifica con dossier).
- Quality validator activo (aquiescencia, patron unico, tiempo atipico) con flags configurados.

### Gate 2 — Compliance

- Consentimiento versionado activo (`consent_log`) y firmado por el usuario.
- NFR-27 (disclaimer no-clinico) activo en instrumentos con `ethical_flags=emotional_distress`.
- NFR-28 (ruta de contencion con lineas Colombia) configurado con umbrales por test.
- Cifrado en reposo (AES-256) y transito (TLS 1.3+) verificado.
- Derecho de eliminacion accesible en ≤2 clicks desde el perfil del usuario.
- Audit log inmutable de accesos a `item_response` y `computed_score`.
- Revision por abogado Ley 1581 firmada (al menos una vez antes de lanzamiento Free).

### Gate 3 — Licencia

- Acuerdo escrito con titular firmado y archivado en `05_licencias/`.
- Atribucion en reporte + ToS aceptados.
- `usage_log` configurado para reportar al titular en el formato requerido (default: CSV mensual cifrado).
- Costo de licencia presupuestado en el cash flow del producto.

**Si un instrumento del stack no pasa Gate 3, no se lanza con ese instrumento.** Se sustituye por su Plan B o se difiere el milestone.

---

## 11. Governance y decision rights

### 11.1 Quien decide que

| Dominio | Decision | Owner | Consulta |
|---|---|---|---|
| Psicometria (que instrumentos, scoring, validez) | Cowork rol Investigador psicometrico | German aprueba | — |
| Producto (que entra a un sub-PRD, prioridades) | Cowork rol PM | German aprueba | — |
| UX y microcopy | Cowork rol UX Writer | German aprueba | — |
| Tecnico (schema, infra, codigo) | Claude Code | German aprueba migraciones M1/M2/M3 | Cowork si toca psicometria |
| Comercial (pricing, GTM, contratos B2B) | German | Cowork rol Estratega | — |
| Compliance (Ley 1581, etica) | German + asesor legal externo | Cowork rol Investigador / PM | — |
| Licencias (negociaciones) | German | Cowork rol Investigador prepara pitch | — |

### 11.2 Como se documenta una decision

Toda decision no trivial va a `01_estado/DECISIONS_LOG.md` con formato ADR (contexto, opciones, decision, consecuencias, reversibilidad, referencia a documentos). Decisiones triviales (microcopy, ajuste UI menor) no requieren ADR pero deben quedar en el sub-PRD correspondiente.

### 11.3 Cadencia de revision

- **STATUS.md:** actualizar al cierre de cada sesion de trabajo.
- **BACKLOG.md:** revision semanal por owner.
- **CHANGELOG.md:** actualizar al cierre de cada sprint.
- **PRD_MAESTRO.md:** revision trimestral o al cerrar cada sub-PRD.
- **Riesgos (A5):** revision mensual.

---

## 12. Glosario corto

Solo terminos criticos para navegar este PRD. Glosario completo en `02_producto/anexos/A1_GLOSARIO.md`.

| Termino | Definicion |
|---|---|
| **Instrumento** | Test psicometrico individual (ej. BFI-2-S). Tiene versiones, items, scoring rules, baremos. |
| **Plugin** | Definicion de un instrumento como metadata en el sistema. No es codigo. |
| **Layer de reporte** | Capa de contenido del reporte por tier (Base, Free, Paid, B2B, Ikigai). Componibles. |
| **NFR-27 / NFR-28 / NFR-35** | Disclaimer no-clinico / ruta de contencion / retrocompatibilidad de versiones. Ver A2. |
| **Migracion (M1, M2, M3)** | Reemplazo de un instrumento por otro en el stack v1.5 sin romper historico. |
| **Gate** | Criterio de cierre obligatorio antes de lanzar (psicometrico, compliance, licencia). |
| **Stack v1.5** | Set de 12 core + 3 upgrades + 3 condicionales aprobados para v1.5. Ver `_MATRIZ_MAESTRA.md`. |

---

## 13. Anexos referenciados

Los 5 anexos viven en `02_producto/anexos/` y son lectura obligatoria para Claude Code segun el dominio que toque.

| Anexo | Contenido | Cuando cargar |
|---|---|---|
| **A1 — Glosario** | Terminos psicometricos, O*NET, producto, tecnico, compliance, comercial | Siempre |
| **A2 — NFRs** | Performance, seguridad, privacidad, NFR-27/28/35, accesibilidad, observabilidad, i18n, auditoria de licencia, calidad psicometrica, reproducibilidad | Toda implementacion |
| **A3 — Mapa de instrumentos** | Vista producto de los ~25 instrumentos: producto donde aplica, modulo, sprint, licencia, plan B, dossier, implementation pack | Sub-PRDs + sprints con instrumentos |
| **A4 — Etica y Compliance** | Marco etico, datos sensibles, consentimiento, Ley 1581, disclaimers, riesgo cultural Ikigai, modelo de licencias, lo que NO hace DescubreMe | Compliance + microcopy + sub-PRDs sensibles |
| **A5 — Riesgos consolidados** | 12+ riesgos categorizados con probabilidad, impacto, mitigacion, owner, fecha de revision | Revision mensual + cierre de sprint |

---

## 14. Changelog del PRD

| Version | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-05-13 | Cowork (rol PM) + German | Version inicial. Estructura hibrida modular (DD-12). Horizonte 12 meses, 4 productos (DD-13). Metricas producto + comercial top-level (DD-14). Anexos en subcarpeta dedicada (DD-15). |

---

*Fin del PRD_MAESTRO v1.0. Documento vivo. Actualizar al cierre de cada sub-PRD o trimestralmente, lo que ocurra primero. Cualquier cambio relevante debe registrarse en este changelog y en `01_estado/DECISIONS_LOG.md`.*
