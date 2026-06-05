# BACKLOG — DescubreMe (priorizado)

**Owner:** German Velez Hurtado.
**Ultima actualizacion:** 2026-06-05 (Cowork).
**Prioridad:** P0 (bloquea ahora) · P1 (prerequisito de una fase cercana) · P2 (necesario, no inminente) · P3 (deseable / futuro).
**Owner del item:** Cowork (research/producto) · CC (Claude Code, implementacion) · Adaptacion (proceso ITC con humanos) · German (decision/negociacion).

> Consolida las "carries" dispersas en los documentos. Si descubres un gap nuevo, anadelo aqui con su flag `[GAP-...]`. Fuente de verdad de pendientes del proyecto.

---

## P0 — Bloquea ahora

- (vacio) Ningun item bloquea el arranque de GSD.

---

## P1 — Prerequisito de una fase cercana

| Flag | Pendiente | Producto/Fase | Owner | Nota |
|---|---|---|---|---|
| `[GAP-PVQ21-ITEMS-ES-CO]` | Extraer/verificar los 21 items de PVQ-21 en es-CO desde fuente validada (ESS espanol / Castro Solano y Nader 2006) + decidir variante de genero | Free / Fase 2 | Cowork + Adaptacion | No inventar; NoDerivatives sobre adaptacion |
| `[GAP-PVQ21-ANCHORS-ES-CO]` | Verificar las 6 anclas verbales es-CO de PVQ-21 verbatim | Free / Fase 2 | Cowork | Analogo a RESPONSE_ANCHORS_es-CO |
| `[GAP-IKIGAI9-ITEMS-ES-CO]` | Adaptacion formal es-CO de los 9 items de Ikigai-9 (ITC 2017: traduccion doble, retrotraduccion, panel, piloto cognitivo) + permiso de autores | Ikigai / Fase 5 | Adaptacion + German | No existe validacion es; items EN publicos (Fido 2020) |
| `[GAP-IKIGAI9-ANCHORS-ES-CO]` | Anclas es-CO (escala 5 puntos) de Ikigai-9 | Ikigai / Fase 5 | Cowork + Adaptacion | Verbatim de fuente |

---

## P2 — Necesario, no inminente

| Flag | Pendiente | Producto/Fase | Owner | Nota |
|---|---|---|---|---|
| `[GAP-IKIGAI9-CFA-LOCAL]` | Confirmar dimensionalidad de Ikigai-9 (3 factores vs. unifactorial) en muestra es-CO; mientras tanto reportar puntaje global | Ikigai / Fase 5 | Cowork + CC | UK=1 factor, Japon/Alemania=3 |
| `[GAP-PACK-PGI]` | Implementation pack de PGI (Personal Growth Initiative) si se usa standalone en B2B | B2B / Fase 4 | Cowork | Hoy PGI entra combinado en lentes |
| `[GAP-PACK-PVQRR]` | Revisar textos §5.A HOV del pack PVQ-RR tras reasignacion FAC -> Conservacion (ver `PVQ-RR_HOV_PARTITION_VALIDATION_v1.0.md`) | Paid/B2B / Fase 3-4 | Cowork | Alcance probablemente menor |
| Sub-specs por producto | Specs detalladas Free/Paid/B2B/Ikigai si se requieren (gran parte ya en PRD + UX spec) | Fases 2-5 | Cowork | Crear bajo demanda |
| Spec de experiencia B2B + dashboard | Experiencia del dashboard agregado anonimo (rol admin) | B2B / Fase 4 | Cowork | UX_EXPERIENCE_SPEC §14 lo deja como lineamiento |
| Textos finales por test | Hooks validados, frases reveladoras (capa 2), narrativa del integrador es-CO | Fases 2-3 | Cowork | Se redactan junto a cada pack |
| Piloto cognitivo es-CO | N=6-8 para instrumentos/anclas nuevos (PVQ-21, Ikigai-9) antes de go-live | Fases 2,5 | Adaptacion | Estandar del proyecto |

---

## P2/P3 — Fase 7 (Legal & Licencias) — diferido por diseno

| Pendiente | Instrumentos | Owner | Nota |
|---|---|---|---|
| Cierre de licencia comercial | BFI-2 (Soto-John), VIA-IS-P (VIA Institute), PVQ-RR/PVQ-21 (Schwartz), WDQ-40 (cadena APA/autores/editor), Ikigai-9 (Imai et al.) | German + Cowork (pitch) | Cada uno con plan-B abierto listo |
| Confirmar uso comercial de los abiertos | PERMA, SWLS, Ryff, PANAS, MLQ, WAMI, CMWS, UWES-9, BPNSFS, FSS-9, MEMS, CFI-R, PGI | Cowork | Uso academico amplio; confirmar comercial |
| Revision legal Ley 1581 | Toda la plataforma (firmada antes de GA Free) | German + asesor legal | Privacidad-by-design ya continua desde fase 1 |
| Presupuesto de licencias | Cash flow | German | Costos por titular |

---

## Riesgos abiertos (seguimiento)

| ID | Riesgo | Estado |
|---|---|---|
| R-01 | Licencia de valores (todas las formas Schwartz requieren permiso; plan-B debil) | Vivo; gestionar en fase 7 |
| R-03 | Ikigai-9 sin adaptacion es-CO validada | Dossier+pack listos; adaptacion pendiente (P1) |
| R-04 | Experiencia "magia" no se logra (efecto Barnum) | Mitigar con piloto temprano + integrador |
| R-05 | Riesgo cultural Ikigai (Venn != ikigai japones) | Disclaimer especificado en dossier/pack Ikigai-9 |

---

## Hecho recientemente (para contexto)

- 2026-06-05: reinicio v2.0 (docs funcionales, UX spec, arquitectura). Carpetas sin prefijo numerico. PVQ-21 y Ikigai-9 (dossier+pack). Ver `estado/STATUS.md`.

`Nota:` cuando exista `estado/CHANGELOG.md` y `DECISIONS_LOG.md`, el historico detallado y los ADR migran alli; este bloque queda solo como puntero corto.
