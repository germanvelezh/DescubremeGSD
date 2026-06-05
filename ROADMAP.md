# ROADMAP — DescubreMe (v2.0)

**Producto:** DescubreMe.
**Owner:** German Velez Hurtado.
**Version:** 2.0
**Fecha:** 2026-06-05
**Fuente de verdad de producto:** `PRD_MAESTRO.md` v2.0.
**Reemplaza:** ROADMAP v1.0 (archivado en `archivo/v1.5_pre_GSD/`).

---

## 0. Principio rector del roadmap

Tres reglas gobiernan la secuencia, en este orden de prioridad:

1. **Cada fase entrega valor usable.** No hay fases de "infraestructura invisible": cada fase termina con algo que un usuario o un cliente puede ver y usar. La fundacion se justifica entregando, al cerrar, un test completo end-to-end con experiencia "magia".
2. **El desarrollo no depende de licencias.** Se construye con el mejor instrumento por constructo, asumido usable, con plan-B abierto listo. La revision legal formal, el cierre de licencias y la aprobacion de costos se concentran en la **fase final (7)**. Durante las fases 1-6 no se gestiona ni se discute licencia: se construye.
3. **Calidad psicometrica y privacidad-by-design son continuas.** No son una fase: se construyen desde la fase 1 como calidad de ingenieria (Gate 1 y Gate 2 del PRD). Lo que se difiere a la fase 7 es la capa legal/contractual (Gate 3), no las salvaguardas tecnicas.

`Aclaracion importante:` "legal al ultimo sprint" no significa lanzar sin licencias ni sin revision legal. Significa que esa capa se secuencia al final, con un plan-B ya listo por diseno, de modo que ninguna fase de producto se bloquee esperando una firma.

---

## 1. Mapeo a GSD

Este roadmap es la entrada de producto. GSD (en Claude Code) lo traduce a su propio ciclo:

| Paso GSD | Que produce | Relacion con este roadmap |
|---|---|---|
| `/gsd-new-project` | PROJECT.md, REQUIREMENTS.md, ROADMAP.md (GSD), STATE.md | Se siembra con `PRD_MAESTRO.md` + este documento |
| `/gsd-discuss-phase N` | CONTEXT.md de la fase | Captura decisiones de la fase antes de planear |
| `/gsd-plan-phase N` | Planes por fase | Usa dossiers/packs como input de research |
| `/gsd-execute-phase N` | Codigo en olas paralelas | Entrega el valor de la fase |
| `/gsd-verify-work N` | Aceptacion manual | Valida contra los criterios de salida de la fase |
| `/gsd-ship N` | PR de la fase | Cierra la fase |
| `/gsd-complete-milestone` | Archivo + tag | Cierra el producto/milestone |

`Inferencia:` cada fase de este roadmap corresponde aproximadamente a un milestone o a un grupo de fases GSD. El owner y Claude Code afinan la granularidad real en `/gsd-discuss-phase`.

---

## 2. Vista de fases

| Fase | Nombre | Valor que entrega | Productos | Dependencias |
|---|---|---|---|---|
| 1 | Fundacion + primer test "magia" | Motor de instrumentos plugin + auth + 1 test E2E con experiencia completa | Base para todo | Ninguna |
| 2 | B2C Free | 4 tests + perfil integrado teaser; primer lanzamiento real | Free | Fase 1 |
| 3 | B2C Paid | Stack profundo + Motor de Perfil Integrador | Paid | Fase 2 |
| 4 | B2B-A | Lentes configurables + dashboard agregado anonimo | B2B | Fase 3 (reusa stack) |
| 5 | Ikigai Premium | Mapper integrador + disclaimer cultural | Ikigai | Fase 3 + pack Ikigai-9 |
| 6 | Experiencia clase mundial | Pulido transversal, UX research, accesibilidad | Todos | Fases 2-5 |
| 7 | Legal & Licencias | Revision Ley 1581, cierre de licencias, costos, swaps | Todos (gate GA) | Todas |

---

## 3. Detalle por fase

### Fase 1 — Fundacion + primer test "magia"

- **Objetivo:** dejar el motor que hace que anadir un test sea metadata, y demostrarlo con un test completo de punta a punta que ya se sienta clase mundial.
- **Scope in:** modelo de datos de instrumentos (`instrument`, `instrument_version`, `item`, `scoring_rule`, `baremo`, `item_response`, `computed_score`); motor de scoring; auth con magic link; consentimiento granular (Gate 2 base); NFR-27/28 base; cifrado en reposo/transito; audit log; un instrumento E2E (sugerido: **O*NET IP-SF**, por ser dominio publico y visualmente atractivo) con hook, flujo de respuesta fluido y resultado "magia".
- **Scope out:** los demas instrumentos, reportes integradores, pagos, multi-tenant.
- **Instrumentos:** O*NET IP-SF (sin riesgo de licencia, ideal para no introducir dependencias legales en la fundacion).
- **Valor al cerrar:** un usuario puede registrarse, hacer un test y recibir un resultado claro y atractivo. El motor queda listo para cargar el resto como metadata.
- **Criterios de salida:** test E2E pasa Gate 1 (scoring auditado) y Gate 2 (consentimiento, cifrado, NFR); experiencia validada contra principios de UX; anadir un segundo instrumento no requiere cambio de codigo del motor.

### Fase 2 — B2C Free

- **Objetivo:** el producto de adquisicion que enamora y convierte.
- **Scope in:** BFI-2-S, O*NET IP-SF, PVQ-21, PERMA-Profiler; hook por test; reportes individuales "magia"; **perfil integrado teaser** que cruza las 4 dimensiones con una pincelada explicita del Paid; flujo de registro y reanudacion.
- **Scope out:** facetas detalladas, fortalezas VIA, integrador profundo, pagos.
- **Instrumentos:** 4 (ver stack PRD §8). Plan-B abierto para BFI-2-S (IPIP corto) y PVQ-21 (PVQ ESS) ya identificado.
- **Valor al cerrar:** lanzamiento real del Free; embudo de adquisicion activo; metricas de activacion/completion empiezan a correr.
- **Criterios de salida:** completion Free medible; perfil integrado teaser entrega "wow" en pruebas con usuarios; cada escala pasa Gate 1; copy pasa revision etica.

### Fase 3 — B2C Paid

- **Objetivo:** el producto de profundidad cuyo climax es un perfil que sorprende.
- **Scope in:** stack core (BFI-2-60, VIA-IS-P-96, PVQ-RR, O*NET + mapa, MLQ + WAMI, PERMA + Ryff + SWLS, PANAS, FSS-9); add-ons opcionales (MEMS, BPNSFS, CFI-R/PGI, upgrades personalidad); reporte profundo por instrumento; **Motor de Perfil Integrador** (PRD §6); Stripe checkout; equivalente COP.
- **Scope out:** coaching, integraciones, version pareja.
- **Instrumentos:** ver stack PRD §8.2; planes-B abiertos listos (IPIP-NEO-120, IPIP-VIA-R, PVQ-40).
- **Valor al cerrar:** el usuario obtiene un perfil integrado que le revela cosas nuevas; se activa la monetizacion B2C y la conversion Free->Paid.
- **Criterios de salida:** completion Paid y NPS del reporte medibles; integrador documentado (logica de cruce, trazabilidad, etiquetado de cruces exploratorios); todas las escalas pasan Gate 1.

### Fase 4 — B2B-A

- **Objetivo:** producto empresarial de desarrollo, configurable por necesidad, sin tocar seleccion.
- **Scope in:** multi-tenant via RLS (row-level security); empleado recibe su perfil Paid individual; menu de lentes (PRD §7) con set core (Engagement, Bienestar/desgaste, Diseno del trabajo, Sentido laboral, Cultura/valores, Fortalezas del equipo, Desarrollo de carrera, Adaptabilidad); modulos de trabajo (WDQ-40, UWES-9, WOLF, BPNSFS); dashboard agregado anonimo (n>=5); tendencias trimestrales.
- **Scope out:** seleccion/promocion/despido, comparativos individuales, comparativos entre empresas, HRIS, API publica.
- **Instrumentos:** stack Paid + modulos de trabajo; plan-B para WDQ-40 listo.
- **Valor al cerrar:** una empresa ancla puede contratar y recibir un diagnostico agregado por su lente de necesidad; el empleado se lleva su autoconocimiento.
- **Criterios de salida:** dashboard nunca expone individuos (n>=5 forzado en modelo); lente "Bienestar/desgaste" dispara NFR-27/28 individual y reporta solo agregado; contrato comercial incluye clausula no-seleccion.

### Fase 5 — Ikigai Premium

- **Objetivo:** mapper integrador de proposito como add-on al Paid.
- **Pre-requisito:** dossier + implementation pack de **Ikigai-9** v1.0 ya listos (`dossiers/31`, `implementation_packs/Ikigai-9`). Falta la **adaptacion formal es-CO** (ITC 2017) + permiso de autores, porque no hay validacion en espanol (`[GAP-IKIGAI9-ITEMS-ES-CO]`). Trabajo Cowork + adaptacion previa a la fase.
- **Scope in:** Ikigai-9; mapper visual de 4 bloques reutilizando el stack Paid + O*NET; disclaimer cultural visible antes y dentro del mapper.
- **Scope out:** version standalone sin Paid, K-1 Scale, coaching guiado.
- **Valor al cerrar:** el usuario Paid puede activar Ikigai y obtener un mapa integrador con coherencias y tensiones.
- **Criterios de salida:** disclaimer cultural presente y claro (Zuzunaga/Winn vs. Hasegawa/Kamiya/Mogi); Ikigai-9 pasa Gate 1; el mapa no promete una "respuesta unica de vida".

### Fase 6 — Experiencia clase mundial

- **Objetivo:** elevar toda la plataforma al estandar de experiencia que define al producto.
- **Scope in:** pulido transversal con `ui-ux-pro-max-skill`; user research cualitativo Colombia (n=15-20); refinamiento de hooks, microcopy y reportes; accesibilidad (WCAG); rendimiento percibido; pruebas de delight y fluidez; iteracion sobre el integrador segun feedback real.
- **Valor al cerrar:** la experiencia deja de ser "buena" y pasa a ser memorable y diferenciadora; mejoras medibles en activacion, completion y NPS.
- **Criterios de salida:** metricas de experiencia mejoran vs. baseline; accesibilidad verificada; copy final pasa revision etica y de marca.

`Nota:` parte del pulido de experiencia es continuo desde la fase 1 (cada fase respeta los principios de UX). La fase 6 es el pulido dedicado y la validacion con usuarios reales, no el unico momento donde la experiencia importa.

### Fase 7 — Legal & Licencias (gate de GA)

- **Objetivo:** cerrar todo lo legal/contractual antes del lanzamiento general, con el producto ya construido.
- **Scope in:** revision legal externa Ley 1581 (firmada antes de GA Free); evaluacion formal de licencia por instrumento (uso comercial, adaptacion, digitalizacion, atribucion, costo); negociacion/cierre con titulares; archivo en `licencias/`; configuracion de `usage_log` por titular; decision de swap a plan-B donde una licencia no se obtenga o sea inviable en costo; presupuesto de licencias en el cash flow.
- **Valor al cerrar:** producto legalmente listo para GA; cada instrumento pasa Gate 3 o se sustituye por su plan-B sin reescribir el motor.
- **Criterios de salida:** Gate 3 cerrado por instrumento en uso; revision Ley 1581 firmada; costos aprobados por el owner.

`Por que funciona dejar esto al final:` el principio 1 del PRD (instrumento como plugin) hace que un swap a plan-B en esta fase sea un cambio de metadata, no de codigo. El riesgo de "construir sobre un instrumento que luego no se puede licenciar" se neutraliza teniendo el plan-B abierto listo desde el inicio.

---

## 4. Trabajo Cowork previo o paralelo (no implementacional)

Estas piezas las produce Cowork y alimentan las fases; no son codigo:

| Entregable Cowork | Alimenta | Estado |
|---|---|---|
| `UX_EXPERIENCE_SPEC.md` (spec profunda de experiencia) | Fases 2-6 | Tanda 2 |
| Sub-specs por producto (Free, Paid, B2B, Ikigai) si se requieren | Fases 2-5 | Tanda 2 |
| `arquitectura/` (modelo conceptual, matriz, stack por producto) | Fase 1 | Tanda 2 |
| Dossier + pack **Ikigai-9** | Fase 5 | Pendiente (gap) |
| Textos de interpretacion es-CO faltantes por instrumento | Fases 2-5 | Segun gaps de packs |
| Pitch/dossier de licencia por titular | Fase 7 | Pendiente |

---

## 5. Dependencias y riesgos de secuencia

- **Free antes que Paid antes que Ikigai:** secuencia de valor y de stack (Ikigai reutiliza Paid).
- **B2B paralelo a Paid:** reutiliza el stack; puede arrancar apenas el stack Paid este estable.
- **Pack Ikigai-9 bloquea fase 5:** debe producirse antes (Cowork).
- **Ningun bloqueo por licencia en fases 1-6:** por diseno (planes-B listos).
- **Riesgo de experiencia (R-04):** mitigado con UX research temprano y fase 6 dedicada, pero los principios de UX aplican desde la fase 1.

---

## 6. Changelog del roadmap

| Version | Fecha | Cambios |
|---|---|---|
| 2.0 | 2026-06-05 | Reescritura por valor alineada a GSD. Legal/licencias como fase final 7 sin bloquear desarrollo. Calidad psicometrica y privacidad-by-design declaradas continuas. Fase 1 entrega un test E2E "magia". Fase 6 de experiencia clase mundial dedicada. Pre-requisito Ikigai-9 explicito. |
| 1.0 | 2026-05-13 | Roadmap inicial sprint-a-sprint con gates de licencia distribuidos (archivado). |

---

*Fin del ROADMAP v2.0. Documento vivo. Se sincroniza con los artefactos GSD (STATE.md, ROADMAP.md de GSD) que mantiene Claude Code. En conflicto sobre alcance de producto, prevalece `PRD_MAESTRO.md`.*
