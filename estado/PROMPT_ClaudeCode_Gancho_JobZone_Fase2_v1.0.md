# Prompt para Claude Code — Gancho + Job Zone (Fase 2) v1.0

**Producto:** DescubreMe (MVP). **Owner:** German Velez Hurtado. **Fecha:** 2026-06-25.
**Cómo usar:** entrega a Claude Code los 3 packs + este prompt. El prompt es la instrucción; los packs son el contenido (no se inventa nada). La decisión ya quedó registrada por Cowork como **ADR-027** en `estado/DECISIONS_LOG.md`; Claude Code no la duplica.

**Bundle que acompaña este prompt:**
- `estado/ANALISIS_Gancho_y_ONET_Fase2_v1.0.md` — análisis y decisión.
- `implementation_packs/JobZones_es-CO_Pack_v1.0.md` — zonas, mapeo, filtro.
- `implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md` — textos es-CO.
- `implementation_packs/Ocupaciones_O-NET_Extension_es-CO_Pack_v1.0.md` — extensión P1 (verificar).

`Decisiones del owner (cerradas, ver ADR-027):` GANCHO = personalidad (BFI-2-S) primero. MODO JOB ZONE = híbrido (inferir + ajustar).

---

## Prompt (pegar en Claude Code)

```text
ROL Y PROTOCOLO
Trabajas en el repo del MVP DescubreMe (Next.js + Supabase, GSD). Declara rol [Arquitecto/Data scientist].
Respeta el CLAUDE.md del proyecto. NO gestiones licencias (van a fase 7). NO inventes contenido:
todos los textos, zonas, mapeos y ocupaciones vienen de los packs Cowork. Tú cargas y cableas.

LEE PRIMERO
- estado/ANALISIS_Gancho_y_ONET_Fase2_v1.0.md
- estado/DECISIONS_LOG.md -> ADR-027 (la decisión ya está registrada; no la dupliques)
- implementation_packs/JobZones_es-CO_Pack_v1.0.md
- implementation_packs/Onboarding_Nivel_Microcopy_es-CO_Pack_v1.0.md
- implementation_packs/Ocupaciones_O-NET_Extension_es-CO_Pack_v1.0.md
- Código: lib/report/occupation-selector.ts, db/schema/occupation.ts,
  db/seeds/occupations/LATAM/seed.sql, db/seeds/product-stack/free/seed.sql,
  app/(auth)/signup/actions.ts, db/schema/user.ts, lib/riasec/top3.ts.

DECISIONES DEL OWNER (cerradas, ADR-027)
- GANCHO: BFI-2-S primero (Opción A).
- MODO JOB ZONE: HÍBRIDO (inferir desde educación/experiencia + permitir ajuste del usuario).

OBJETIVO
Que la recomendación de ocupaciones filtre por intereses (RIASEC) Y por nivel de preparación
(Job Zone), donde la zona se infiere del nivel educativo/experiencia del usuario y este puede ajustarla.
Y mover el gancho del Free a personalidad.

TAREAS

1) MODELO DE DATOS (migración SQL versionada + tipos)
   - Perfil de usuario: agrega education_level (enum: secundaria|tecnico_tecnologo|pregrado|posgrado)
     y career_stage (enum: sin_experiencia|junior|semi_senior|senior). Dato personal estándar
     (Ley 1581) con consentimiento; aplica el patrón de cifrado del repo SOLO si ya se usa en campos
     análogos. NO marcar como categoría sensible.
   - En el cómputo del reporte O*NET: persiste target_job_zone (texto: '1-2'|'3'|'4'|'5') y
     explore_intent (enum: current|study_more).

2) LIB JOB ZONE (nuevo: lib/onet/job-zone.ts) — implementa EXACTO el pack JobZones §3-§5
   - inferBaseZone(education_level): secundaria->'1-2', tecnico_tecnologo->'3', pregrado->'4', posgrado->'5'.
   - targetZones(baseZone, career_stage, openToStudyMore): incluye baseZone; si career_stage=='senior'
     OR openToStudyMore, agrega oneAbove(baseZone) (tope '5'). Dedupe.
   - normalizeZone(raw): '1'|'2'->'1-2'; '3'|'4'|'5' igual; null->null.

3) ONBOARDING / CAPTURA (usa microcopy VERBATIM del pack de microcopy §2-§4)
   - Pantalla con las 2 preguntas (nivel educativo, experiencia) ANTES del resultado de O*NET.
   - Modo híbrido: muestra el nivel inferido en lenguaje cotidiano (NO el término "Job Zone") y el
     control de ajuste (current | study_more) con los textos del pack §3.
   - Snippet de consentimiento del pack §4. Microcopy es-CO, tuteo, sin emojis.

4) SELECTOR (reescribe lib/report/occupation-selector.ts) — reglas del pack JobZones §5
   - Filtra por (a) RIASEC: riasec_code contiene >=1 letra del top-3, Y (b) normalizeZone(education_level)
     en targetZones(...). Ordena por congruencia de interés (nº de letras coincidentes; desempata por
     posición de la 1ª coincidencia; zona base antes que zona+1). limit=7.
   - Deja de ignorar countryCode (al menos no romper; priorizar país si hay marca disponible).
   - Fallbacks del pack §5.1 (ampliar a ±1 zona si <3 resultados; estado vacío del pack de microcopy §5.1).

5) GANCHO (db/seeds/product-stack/free/seed.sql)
   - Cambia product_stack.order: BFI-2-S order=1, ONET-IP-SF order=2 (TwIVI=3, PERMA=4 igual).
   - Reposiciona la revelación ocupacional dentro del teaser integrado, ya filtrada por Job Zone.
   - Aplica los hooks del pack de microcopy §1 (verbatim) a cada test.

6) REVELACIÓN OCUPACIONAL (usa pack de microcopy §5, verbatim)
   - Título, bajada/disclaimer no determinista, micro-tag de coincidencia por letras (NO "match %"),
     CTA al perfil integrado. Estados vacío/cargando del §5.1.

7) DATASET (P1 — ya verificado, listo para cargar)
   - Las 96 filas v1.0 ya soportan el filtro. La extensión está VERIFICADA contra O*NET OnLine
     (2026-06-25) en db/seeds/occupations/LATAM/seed_ext_v1.1.sql (29 filas, idempotente
     ON CONFLICT). Cárgala después de seed.sql v1.0 y sube occupation_set_version a '1.1'.

8) NO TOCAR
   - NO cambies el instrumento de valores: TwIVI ya está decidido en ADR-023 (el PRD §8 aún cita
     PVQ-21, pero la decisión vigente es TwIVI). No es un gap abierto.

GUARDRAILES (no negociables)
- NUNCA filtrar/rankear ocupaciones por sexo/género ni edad. Educación y experiencia SOLO vía Job Zone.
- Copy de exploración, no determinista (principio 6 del PRD): "podrían resonar contigo", nunca
  "tu carrera ideal es X" ni porcentajes de match.
- Gate 1 (scoring/datos auditados) y Gate 2 (consentimiento de los campos nuevos, cifrado, audit log).

TESTS
- inferBaseZone y targetZones (incluye: posgrado+senior NO incluye '1-2'/'3' como base; pregrado+
  semi_senior con study_more incluye '4' y '5').
- selector: un usuario posgrado/senior no recibe ocupaciones '1-2' en el resultado principal; los
  fallbacks evitan lista vacía.
- no-hardcoded-instruments.test.ts sigue verde (el orden del gancho es data, no código).

ENTREGABLES
- Migración + lib/onet/job-zone.ts + selector reescrito + paso de onboarding + cambios de seed (orden).
- Tests anteriores.
- Actualiza estado/STATUS.md. La decisión ya está en ADR-027 (estado/DECISIONS_LOG.md): no la dupliques.
- Confirma con el owner ANTES de hacer commit.
```

---

*Fin del prompt v1.0. Sustituye al prompt embebido en el análisis. Entregar junto con los 3 packs. La decisión está registrada por Cowork como ADR-027 en `estado/DECISIONS_LOG.md`.*
