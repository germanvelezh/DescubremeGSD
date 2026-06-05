# DescubreMe — MVP (v2.0)

Plataforma web de autoconocimiento profundo para adultos LATAM. Integra instrumentos psicometricos validados y mapas ocupacionales O*NET en un motor unificado de perfilado. No es clinico ni diagnostico: es educativo, orientador y de desarrollo.

**Owner:** German Velez Hurtado (germanvelezh@gmail.com)
**Stack tecnico:** Next.js + Supabase (PostgreSQL) + TypeScript
**Sistema de desarrollo:** Claude Code + GSD (`@opengsd/get-shit-done-redux`)
**Sistema de diseno:** `ui-ux-pro-max-skill`
**Idioma del producto:** espanol Colombia (es-CO) por defecto
**Estado:** Reinicio v2.0 sobre GSD (2026-06-05) — preparacion Cowork **completa**: documentos funcionales, `UX_EXPERIENCE_SPEC.md`, `arquitectura/`, dossiers+packs de PVQ-21 e Ikigai-9, y `estado/` (STATUS + BACKLOG) listos. Proxima accion: Claude Code corre `/gsd-new-project`. Pendiente para implementacion (no para arrancar): adaptaciones es-CO de PVQ-21 e Ikigai-9 — ver `estado/BACKLOG.md`.

---

## Que cambio en v2.0

El proyecto se reinicio alrededor de cuatro decisiones del owner. Las versiones v1.5 estan archivadas en `archivo/v1.5_pre_GSD/`.

1. **GSD como sistema de desarrollo.** El `PRD_MAESTRO.md` es la semilla unica de `/gsd-new-project`.
2. **Legal/licencias al ultimo sprint, sin bloquear el desarrollo.** Se construye con el mejor instrumento por constructo y plan-B abierto; lo legal se cierra en la fase 7.
3. **Best-test por constructo con plan-B abierto.** Instrumentos como metadata/plugin: el swap a plan-B es cambio de datos, no de codigo.
4. **Experiencia clase mundial como requisito de primer orden.** Cada test con hook; cada resultado simple y revelador; cada reporte un descubrimiento.

---

## Quick start para una sesion nueva

1. Lee `_MANIFEST.md` (estructura por tiers).
2. Lee `CLAUDE.md` (protocolo operativo).
3. Lee `PRD_MAESTRO.md` (fuente de verdad de producto, semilla GSD).
4. Lee `ROADMAP.md` (fases por valor).
5. Lee `estado/STATUS.md` y `estado/BACKLOG.md` (estado y pendientes).
6. Carga Tier 2 segun el dominio que toques.

---

## Productos del MVP

| Producto | Descripcion | Estado |
|---|---|---|
| **B2C Free** | 4 tests (BFI-2-S, O*NET IP-SF, PVQ-21, PERMA) + perfil integrado teaser (~12-18 min) | Disenado en PRD v2.0 |
| **B2C Paid USD 19** | Stack profundo + Motor de Perfil Integrador (~95-130 min) | Disenado en PRD v2.0 |
| **B2B-A** | Lentes configurables por necesidad + dashboard agregado anonimo | Disenado en PRD v2.0 |
| **Ikigai Premium** | Mapper integrador de proposito (add-on al Paid) | Requiere pack Ikigai-9 (gap) |

Stack completo por producto: `PRD_MAESTRO.md` §8.

---

## Flujo GSD (lo corre Claude Code)

```
/gsd-new-project        (semilla: PRD_MAESTRO.md + ROADMAP.md)
/gsd-discuss-phase N    (decisiones de la fase)
/gsd-plan-phase N       (research + plan, usa dossiers/packs)
/gsd-execute-phase N    (codigo en olas paralelas)
/gsd-verify-work N      (aceptacion manual)
/gsd-ship N             (PR)
/gsd-complete-milestone (cierre)
```

El repo es la fuente de verdad; los artefactos GSD (`.planning/`) son scratchpad de ejecucion. `Seguridad:` validar la legitimidad del paquete GSD antes de instalar.

---

## Fases (ROADMAP v2.0)

1. Fundacion + primer test "magia" (motor plugin + auth + 1 test E2E)
2. B2C Free (4 tests + perfil integrado teaser)
3. B2C Paid (stack profundo + Motor de Perfil Integrador)
4. B2B-A (lentes + dashboard agregado anonimo)
5. Ikigai Premium (mapper + disclaimer cultural)
6. Experiencia clase mundial (pulido, UX research, accesibilidad)
7. **Legal & Licencias** (revision Ley 1581, cierre de licencias, costos) — ultimo sprint

Cada fase entrega valor usable. Detalle en `ROADMAP.md`.

---

## Roles que esta carpeta atiende

| Quien | Que hace aqui |
|---|---|
| **Cowork (Claude desktop)** | Research psicometrico, PRDs, decisiones de producto, dossiers, UX spec, microcopy, adaptacion cultural, estrategia comercial |
| **Claude Code + GSD** | Implementacion (Next.js, Supabase, scoring, integrador, multi-tenant), tests, migraciones; mantiene STATUS/CHANGELOG/DECISIONS_LOG al cierre |
| **German (humano)** | Decisiones finales, priorizacion, validacion comercial, aprobacion de migraciones, negociaciones de licencia |

---

## Riesgos clave

1. **Riesgo de experiencia:** que los resultados se perciban genericos. Mitigacion: hooks por test, integrador como diferenciador, UX research temprano, fase 6 dedicada.
2. **Licencias (fase 7):** un instrumento propietario que no se pueda licenciar. Mitigacion: plan-B abierto listo por diseno; swap = cambio de metadata.
3. **Ley 1581 Colombia:** datos sensibles (afecto negativo, frustracion, animo) requieren NFR-27/28, cifrado, audit log, construidos desde la fase 1.
4. **Gap Ikigai-9:** no hay dossier ni pack; bloquea la fase 5 hasta producirlo.
5. **Riesgo cultural Ikigai:** el Venn de 4 circulos es de Zuzunaga/Winn, no ikigai japones (Hasegawa/Kamiya/Mogi). Disclaimer explicito obligatorio.

---

## Convenciones del proyecto

- **Espanol neutro** para documentacion interna. **Espanol Colombia** para interfaz al usuario.
- **Ingles** para terminos psicometricos sin traduccion consolidada.
- **APA 7** para citas. Si no hay fuente verificable: `[sin fuente verificada]`.
- **Decision docs** formato ADR (contexto, opciones, decision, consecuencias, reversibilidad).
- **Sin emojis** en ningun archivo del proyecto.
- Marcadores `Hecho:` / `Inferencia:` / `Opinion profesional:` para separar hechos de juicios.

---

## Documentos relacionados (fuera de esta carpeta)

- CLAUDE.md global del usuario en `/Users/germanvelez/Documents/Pruebas Proyectos Aprendizaje/Claude Context/`
- Research previo en `/Users/germanvelez/Documents/Autoconocimiento/`

---

*Ultima actualizacion: 2026-06-05.*
