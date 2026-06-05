# _MANIFEST.md — Proyecto DescubreMe (MVP) — v2.0

**Producto:** DescubreMe — plataforma web de autoconocimiento profundo para adultos LATAM.
**Owner:** German Velez Hurtado (germanvelezh@gmail.com)
**Version del manifest:** 2.0
**Fecha:** 2026-06-05
**Estado del proyecto:** Reinicio v2.0 sobre GSD — bootstrap de documentos funcionales.

`Reemplaza:` manifest v1.0 (2026-05-13), archivado en `archivo/v1.5_pre_GSD/`.

---

## Como usar este manifest

Define que documentos cargar al iniciar cualquier conversacion (Cowork o Claude Code), por tiers:

- **Tier 1** — SIEMPRE cargar al inicio.
- **Tier 2** — Cargar solo cuando la tarea toque ese dominio.
- **Tier 3** — Ignorar salvo solicitud explicita.

Si la conversacion arranca sin claridad sobre el dominio, cargar Tier 1 y preguntar.

---

## Tier 1 — Cargar SIEMPRE

| Archivo | Por que |
|---|---|
| `README.md` | Estado del proyecto + como navegar + flujo GSD |
| `CLAUDE.md` | Instrucciones operativas (protocolo inicio/cierre, roles, safety, GSD, legal-ultimo) |
| `PRD_MAESTRO.md` | Fuente de verdad de producto y semilla unica de GSD |
| `ROADMAP.md` | Fases por valor, legal al final |
| `arquitectura/*` | Modelo de datos conceptual, matriz de instrumentos, stack por producto |
| `estado/STATUS.md` | Donde estamos hoy (cuando exista) |
| `estado/BACKLOG.md` | Que falta, priorizado (cuando exista) |

## Tier 2 — Cargar segun dominio

| Si la tarea toca... | Cargar |
|---|---|
| Un test especifico (BFI-2, VIA-IS-P, WDQ-40, etc.) | `dossiers/<test>_Consolidado.md` + `implementation_packs/<test>_*.md` |
| Experiencia, UX, microcopy, hooks, reportes | `UX_EXPERIENCE_SPEC.md` (Free + Paid; B2B/Ikigai lineamientos) |
| Detalle de un producto (Free, Paid, B2B-A, Ikigai) | Sub-spec en `producto/` (cuando exista, tanda 2) |
| Licencias o negociaciones (fase 7) | `licencias/*` |
| Compliance Ley 1581, NFR-27, NFR-28, consentimiento | `compliance/*` |
| Decisiones tomadas previamente | `estado/DECISIONS_LOG.md` |
| Historia del proyecto fase a fase | `estado/CHANGELOG.md` |
| Artefactos de ejecucion GSD | `.planning/*` (los mantiene Claude Code, no editar a mano) |

## Tier 3 — Ignorar salvo solicitud explicita

- `archivo/*` — material historico: documentos v1.5 pre-GSD (`v1.5_pre_GSD/`), investigaciones descartadas (K-1, Ikigai-Ryff), dossiers de instrumentos fuera del stack.

---

## Reglas de actualizacion (quien actualiza que)

| Archivo | Cowork | Claude Code |
|---|:---:|:---:|
| `PRD_MAESTRO.md` | Si (PM owns) | No (es input) |
| `ROADMAP.md` | Si (PM owns) | Aporta estimaciones |
| `arquitectura/*` | Si (cambios mayores) | No (es input) |
| `producto/*`, `UX_EXPERIENCE_SPEC.md` | Si | No |
| `estado/STATUS.md` | A veces | **Si** (cada sesion de implementacion) |
| `estado/BACKLOG.md` | Si (priorizacion) | Si (items tecnicos descubiertos) |
| `estado/CHANGELOG.md` | Raramente | **Si** (al cierre de fase) |
| `estado/DECISIONS_LOG.md` | Si (producto/research) | Si (tecnicas) |
| `dossiers/*`, `implementation_packs/*` | Si (research output) | No |
| `licencias/*`, `compliance/*` | Si | No |
| `.planning/*` (GSD) | No | Si (automatico) |

---

## Convencion de nombres

| Tipo | Convencion | Ejemplo |
|---|---|---|
| Dossier de test | `NN_<CODIGO>_Consolidado.md` | `01_BFI-2_Consolidado.md` |
| Implementation pack | `<CODIGO>_Implementation_Acquisition_Pack_v<X.Y>.md` | `BFI-2-S_Implementation_Acquisition_Pack_v1.0.md` |
| Sub-spec de producto | `PRD_<PRODUCTO>_v<X.Y>.md` | `PRD_B2C_Free_v2.0.md` |
| Decision doc | `DD-NN_<titulo_corto>.md` | `DD-04_materializar_computed_score.md` |
| Negociacion licencia | `<CODIGO>_<titular>_negociacion.md` | `BFI-2_Soto-John_negociacion.md` |

---

## Estructura de carpetas (objetivo v2.0)

```
MVP Descubreme GSD/
├── _MANIFEST.md              Tier system, ownership
├── README.md                 Navegacion + estado + flujo GSD
├── CLAUDE.md                 Instrucciones operativas
├── PRD_MAESTRO.md            Fuente de verdad de producto / semilla GSD
├── ROADMAP.md                Fases por valor, legal al final
│
├── arquitectura/          Tier 1 — matriz, modelo de datos conceptual, stack por producto
├── estado/                Tier 1 — memoria viva (STATUS, BACKLOG, CHANGELOG, DECISIONS_LOG)
├── producto/              Tier 2 — sub-specs por producto (tanda 2)
├── UX_EXPERIENCE_SPEC.md     Tier 2 — spec de experiencia (Free + Paid a fondo)
├── dossiers/              Tier 2 — research consolidado por test
├── implementation_packs/  Tier 2 — items, scoring, baremos, licencia por test
├── licencias/             Tier 2 — negociaciones (fase 7)
├── compliance/            Tier 2 — Ley 1581, NFR-27/28
├── .planning/                GSD (lo maneja Claude Code)
└── archivo/               Tier 3 — historico (incluye v1.5_pre_GSD/)
```

---

## Actualizar este manifest cuando...

1. Se anade un archivo a Tier 1 o Tier 2.
2. Se mueve un archivo entre tiers.
3. Cambia el owner.
4. Se agrega una subcarpeta nueva.

Cualquier cambio al manifest se registra en `estado/CHANGELOG.md`.

---

*Fin del manifest. Version 2.0 — 2026-06-05.*
