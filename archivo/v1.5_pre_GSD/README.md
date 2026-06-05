# DescubreMe — MVP

Plataforma web de autoconocimiento profundo para adultos LATAM. Integra ~25 instrumentos psicometricos y mapas ocupacionales O*NET en un motor unificado de perfilado.

**Owner:** German Velez Hurtado (germanvelezh@gmail.com)
**Stack tecnico:** Next.js + Supabase (PostgreSQL) + TypeScript
**Idioma del producto:** espanol Colombia (es-CO) por defecto
**Estado:** Pre-Sprint 0 — bootstrap del knowledge base (2026-05-13)

---

## Quick start para una sesion nueva

Si abres una conversacion nueva con Cowork o Claude Code:

1. Lee `_MANIFEST.md` para entender la estructura por tiers.
2. Lee `CLAUDE.md` para el protocolo operativo del proyecto.
3. Lee `01_estado/STATUS.md` para saber donde estamos hoy.
4. Lee `01_estado/BACKLOG.md` para saber que falta.
5. Carga arquitectura (`00_arquitectura/*`) — siempre.
6. Carga Tier 2 segun el dominio que toques.

---

## Productos del MVP

| Producto | Descripcion | Estado |
|---|---|---|
| **B2C Free MVP1** | 4 instrumentos, adquisicion (~12-18 min) | PRD pendiente |
| **B2C Paid USD 19** | 18 instrumentos, perfil profundo (~95-130 min) | PRD pendiente |
| **B2B-A** | Empresarial con dashboard agregado anonimo | PRD pendiente |
| **Ikigai Premium** | Mapper integrador (Q1 2027) | PRD pendiente |

---

## Estructura de carpetas

```
MVP/
├── _MANIFEST.md                    Tier system, ownership de actualizaciones
├── CLAUDE.md                       Instrucciones operativas del proyecto
├── README.md                       (este archivo)
│
├── 00_arquitectura/                Tier 1 — siempre cargar
│   ├── _ARQUITECTURA_TESTS_REUTILIZABLES.md
│   ├── _MATRIZ_MAESTRA.md
│   └── _STACK_POR_PRODUCTO.md
│
├── 01_estado/                      Tier 1 — memoria viva del proyecto
│   ├── STATUS.md                   Donde estamos hoy (1 pagina)
│   ├── BACKLOG.md                  Que falta, priorizado
│   ├── CHANGELOG.md                Que se ha hecho, por sprint
│   └── DECISIONS_LOG.md            ADRs
│
├── 02_producto/                    Tier 1 (PRD maestro) / Tier 2 (sub-PRDs)
│   └── (PRDs y ROADMAP a crear despues)
│
├── 03_dossiers/                    Tier 2 — research consolidado por test
│   └── 01_BFI-2_Consolidado.md
│
├── 04_implementation_packs/        Tier 2 — items, scoring, baremos, licencia por test
│   └── BFI-2-S_Implementation_Acquisition_Pack_v1.0_Consolidado.md
│
├── 05_licencias/                   Tier 2 — negociaciones con titulares
│
├── 06_compliance/                  Tier 2 — Ley 1581, NFR-27, NFR-28
│
└── 99_archivo/                     Tier 3 — historico, descartados
```

---

## Roles que esta carpeta atiende

| Quien | Que hace aqui |
|---|---|
| **Cowork (Claude desktop)** | Research psicometrico, PRDs, decisiones de producto, dossiers, decision docs, microcopy, adaptacion cultural |
| **Claude Code + Superpowers** | Implementacion (Next.js, Supabase, scoring engine), tests, migraciones, actualiza STATUS/CHANGELOG/DECISIONS_LOG al cierre |
| **German (humano)** | Decisiones finales, priorizacion, validacion comercial, aprobacion de migraciones M1/M2/M3, negociaciones de licencia |

---

## Migraciones aprobadas (vista rapida)

| Codigo | De | A | Producto afectado | Estado |
|---|---|---|---|---|
| **M1** | Mini-IPIP 20 | BFI-2-S 30 / BFI-2 60 | Free + Paid | Pendiente licencia Soto-John |
| **M2** | Core Strengths 18 (IPIP-VIA-R) | VIA-IS-P 96 | Paid | Pendiente licencia VIA Institute |
| **M3** | Karasek 14 propio | WDQ-40 Bayona | B2B-A | Pendiente permisos APA + autores + COP Madrid + Elsevier Espana |

---

## Riesgos clave (no negociables)

1. **Licencias bloqueantes:** 4 negociaciones (Soto-John, VIA Institute, Bayona, Triple i) deben cerrar antes de Q3 2026 para llegar a Q1 2027.
2. **Ley 1581 Colombia:** datos sensibles (Depresion BFI-2, Negative Affect PANAS, frustracion BPNSFS) requieren NFR-27 (disclaimer), NFR-28 (ruta de contencion), cifrado en reposo, audit log.
3. **Riesgo cultural Ikigai:** la UI debe declarar explicitamente que el "diagrama de Venn de 4 circulos" es de Zuzunaga/Winn, **no** ikigai japones (Hasegawa, Kamiya, Mogi).
4. **K-1 Scale diferido a v1.6** por conflacion documental.
5. **Ikigai-Ryff descartado** (fuente Arimitsu 2015 no verificable).

---

## Convenciones del proyecto

- **Espanol neutro** para documentacion interna. **Espanol Colombia** para interfaz al usuario.
- **Ingles** permitido para terminos psicometricos sin traduccion consolidada.
- **APA 7** para citas. Si no hay fuente verificable: `[sin fuente verificada]`.
- **Decision docs** formato ADR (contexto, opciones, decision, consecuencias, reversibilidad).
- **Sin emojis** en ningun archivo del proyecto.

---

## Como contribuir

| Si vas a... | Haz esto |
|---|---|
| Anadir un test al stack | Crear dossier en `03_dossiers/` + implementation pack en `04_implementation_packs/`. Anadir a `_MATRIZ_MAESTRA.md`. Decision doc en `DECISIONS_LOG.md`. |
| Tomar decision tecnica | Anadir ADR a `01_estado/DECISIONS_LOG.md`. Actualizar `STATUS.md`. |
| Cerrar un sprint | Actualizar `CHANGELOG.md`. Refrescar `STATUS.md` con sprint nuevo. Revisar `BACKLOG.md`. |
| Negociar licencia | Crear archivo en `05_licencias/`. Actualizar estado en `BACKLOG.md`. |
| Trabajar PRD de un producto | Editar `02_producto/PRD_<producto>_v1.5.md`. PR review por owner. |

---

## Documentos relacionados (fuera de esta carpeta)

- CLAUDE.md global del usuario en `/Users/germanvelez/Documents/Pruebas Proyectos Aprendizaje/Claude Context/`
- Research previo en `/Users/germanvelez/Documents/Autoconocimiento/Investigacion_*/`

---

*Ultima actualizacion: 2026-05-13.*
