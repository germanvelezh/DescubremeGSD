# _MANIFEST.md — Proyecto DescubreMe (MVP)

**Producto:** DescubreMe — plataforma web de autoconocimiento profundo para adultos LATAM.
**Owner:** German Velez Hurtado (germanvelezh@gmail.com)
**Fecha de creacion:** 2026-05-13
**Version del manifest:** 1.0
**Estado del proyecto:** Pre-Sprint 0 — bootstrap del knowledge base

---

## Como usar este manifest

Este archivo define que documentos cargar al iniciar cualquier conversacion (Cowork o Claude Code).
La estructura se basa en **tiers** segun la convencion del CLAUDE.md global del usuario.

- **Tier 1** — SIEMPRE cargar al inicio de cualquier conversacion.
- **Tier 2** — Cargar solo cuando la tarea toque ese dominio.
- **Tier 3** — Ignorar salvo solicitud explicita del usuario.

Si la conversacion arranca sin claridad sobre el dominio, cargar Tier 1 y preguntar.

---

## Tier 1 — Cargar SIEMPRE

| Archivo | Por que |
|---|---|
| `README.md` | Estado del proyecto + como navegar la carpeta |
| `CLAUDE.md` | Instrucciones operativas del proyecto (protocolo inicio/cierre, roles, safety) |
| `00_arquitectura/_ARQUITECTURA_TESTS_REUTILIZABLES.md` | Modelo de datos, motor de tests, contratos entre modulos |
| `00_arquitectura/_MATRIZ_MAESTRA.md` | Decisiones agregadas sobre instrumentos del stack v1.5 |
| `00_arquitectura/_STACK_POR_PRODUCTO.md` | Que tests van en cada producto (Free, Paid, B2B, Ikigai) |
| `01_estado/STATUS.md` | Donde estamos hoy (sprint, WIP, bloqueado, proxima sesion) |
| `01_estado/BACKLOG.md` | Que falta, priorizado P0/P1/P2/P3 |

## Tier 2 — Cargar segun dominio de la tarea

| Si la tarea toca... | Cargar |
|---|---|
| Un test especifico (ej. BFI-2, VIA-IS-P, WDQ-40) | `03_dossiers/<test>_Consolidado.md` + `04_implementation_packs/<test>_*.md` |
| Producto B2C Free, Paid, B2B-A o Ikigai Premium | Sub-PRD correspondiente en `02_producto/` (cuando exista) |
| Licencias o negociaciones con titulares | `05_licencias/*` |
| Compliance Ley 1581, NFR-27, NFR-28, consentimiento | `06_compliance/*` |
| Decisiones tomadas previamente | `01_estado/DECISIONS_LOG.md` |
| Historia del proyecto sprint-a-sprint | `01_estado/CHANGELOG.md` |
| Roadmap a 12 meses | `02_producto/ROADMAP.md` (cuando exista) |

## Tier 3 — Ignorar salvo solicitud explicita

- `99_archivo/*` — material historico, investigaciones descartadas (K-1, Ikigai-Ryff), conversaciones de referencia, dossiers de instrumentos no incluidos en el stack v1.5

---

## Reglas de actualizacion (quien actualiza que)

| Archivo | Cowork | Claude Code |
|---|:---:|:---:|
| `00_arquitectura/*` | Si (cambios mayores) | No (es input) |
| `02_producto/PRD_*.md` | Si (PM owns) | No |
| `02_producto/ROADMAP.md` | Si (PM owns) | Aporta estimaciones |
| `01_estado/STATUS.md` | A veces | **Si** (cada sesion de implementacion) |
| `01_estado/BACKLOG.md` | Si (priorizacion) | Si (anade items tecnicos descubiertos) |
| `01_estado/CHANGELOG.md` | Raramente | **Si** (al cierre de cada sprint) |
| `01_estado/DECISIONS_LOG.md` | Si (decisiones producto/research) | Si (decisiones tecnicas) |
| `03_dossiers/*` | Si (research output) | No |
| `04_implementation_packs/*` | Si (research output) | No |
| `05_licencias/*` | Si | No |
| `06_compliance/*` | Si | No |

---

## Convencion de nombres

| Tipo | Convencion | Ejemplo |
|---|---|---|
| Dossier de test | `NN_<CODIGO>_Consolidado.md` | `01_BFI-2_Consolidado.md` |
| Implementation pack | `<CODIGO>_Implementation_Acquisition_Pack_v<X.Y>.md` | `BFI-2-S_Implementation_Acquisition_Pack_v1.0.md` |
| PRD producto | `PRD_<PRODUCTO>_v<X.Y>.md` | `PRD_B2C_Free_v1.5.md` |
| Decision doc | `DD-NN_<titulo_corto>.md` (dentro de DECISIONS_LOG o como archivo separado si supera 1 pagina) | `DD-04_materializar_computed_score.md` |
| Negociacion licencia | `<CODIGO>_<titular>_negociacion.md` | `BFI-2_Soto-John_negociacion.md` |

---

## Actualizar este manifest cuando...

1. Se anade un archivo nuevo a Tier 1 o Tier 2 (debe quedar registrado aqui).
2. Se mueve un archivo entre tiers.
3. Cambia el owner del proyecto.
4. Se agrega una subcarpeta nueva al proyecto.

Cualquier cambio al manifest debe quedar registrado en `01_estado/CHANGELOG.md`.

---

*Fin del manifest. Version 1.0 — 2026-05-13.*
