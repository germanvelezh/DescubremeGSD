# COWORK_PROMPTS_FASE1.md — Cowork delivery checkpoint Phase 1

**Owner:** German Velez Hurtado.
**Fecha:** 2026-06-08.
**Origen:** afinado por Claude Code sobre STATUS.md §7.1-§7.4 contra el código real (schemas Drizzle, lint regex, migrations LOCKED, microcopy placeholders, draft consent v1.0.0).
**Estado:** 4 prompts listos para envío a Cowork. **Revisar antes de mandar.**

---

## 0. Contexto compartido (incluir al inicio de cada prompt Cowork)

> **Proyecto:** DescubreMe MVP — plataforma web de autoconocimiento profundo para adultos LATAM. No es clínico, no es diagnóstico. Educativo, orientador, de desarrollo.
>
> **Producto fase 1:** B2C Free con instrumento O*NET IP-SF (Interest Profiler Short Form) — 60 items RIASEC + reporte autoconocimiento + opt-in waitlist.
>
> **Idioma:** español Colombia (es-CO) neutral, tuteo cordial profesional. Evitar regionalismos muy locales (debe leerse natural en MX/AR/CL). Sin "vosotros", "ordenador", "móvil", "coger".
>
> **Anti-determinismo (no negociable):** el reporte presenta áreas como _"gente con tu perfil suele encontrar engagement en X"_, jamás como _"tu carrera ideal es X"_. El instrumento es una mirada, no una sentencia.
>
> **Anti-AI-words (no negociable):** no usar `delve`, `tapestry`, `unlock`, `empower`, `seamlessly`, `robust` (como muletilla), `game-changer`, `synergy`, `paradigm`, `leverage` (como verbo), `holistic`, ni sus equivalentes en español. Lista completa con regex en `lib/lint/prohibited-phrases.ts`.
>
> **CI bloqueante:** todo entregable user-facing pasa por `tests/lint/prohibited-phrases.test.ts` (regex sobre `lib/i18n/microcopy/es-CO/`, `db/seeds/narrative-templates/`, `db/seeds/occupations/`). Un solo match bloquea el merge.

---

## Prompt 1 — `[GAP-MICROCOPY-FASE1]` (microcopy es-CO)

**Tipo de entrega:** TypeScript files (override valores de keys existentes, NO renombrar keys).
**Volumen:** 14 archivos en `lib/i18n/microcopy/es-CO/`. Total ~80-100 keys MC_*.
**Bloquea:** deploy fase 1 (placeholders sirven E2E, no producto).

### Prompt para Cowork (copy-paste):

```
[CONTEXTO COMPARTIDO §0 va aquí]

ROL: UX Writer es-CO senior para producto de autoconocimiento adulto LATAM.

OBJETIVO: redactar microcopy final es-CO neutral para los 14 archivos de `lib/i18n/microcopy/es-CO/`. Hoy tienen placeholders funcionales (sirven al E2E pero NO son producto definitivo). Tu trabajo es overridear cada VALOR manteniendo los mismos NOMBRES de keys.

ARCHIVOS A INTERVENIR (en orden de prioridad de exposición al usuario):

Front-stage del flujo Free (alto impacto):
1. `landing.ts` — hero + CTA + honest-line. UI-SPEC §7.1. Tono: invitación clara, sin urgencia, sin promesas.
2. `before-you-start.ts` — pantalla previa al test. UI-SPEC §7.2 + CONTEXT D2.5. Tono: setup esperable, qué pasa con tus datos, autonomía.
3. `test.ts` — instrucciones, anclas, microcopy del item form. UI-SPEC §6.4 + §7.3. Tono: neutral, sin afecto.
4. `resume.ts` — pantalla de continuación si volvés a entrar en 7d. UI-SPEC §7.3.5.
5. `report-ready.ts` — pantalla de aterrizaje post-60-items con hexágono preview outline-only.
6. `signup.ts` — formulario email + DOB + país + dual consent. UI-SPEC §7.4 + COMPL-01. Verbatim D2.4 para `MC_SIGNUP_AGE_BLOCK`.
7. `consent.ts` — labels y descripciones de los checkboxes general + sensitive_data (CHECKBOXES separados, NO maestro).
8. `magic-link.ts` — pantalla "te enviamos un email" + microcopy del link.
9. `report.ts` — TÍTULO + secciones del reporte completo. **CRÍTICO:** preservar verbatim las frases ancla de CONTEXT D3.3, D3.9, D3.10, D3.11, D3.12 (NFR-27). Refrasear el resto.
10. `email-transactional.ts` — email Resend con magic link. Subject + cuerpo.
11. `survey.ts` — survey de 5 estrellas + textarea post-reporte.
12. `waitlist.ts` — checkbox opt-in waitlist + microcopy de confirmación.

Account flow (post-signup, tono operacional):
13. `account.ts` — pantalla `/me/data` con consulta + rectificación + revocación + botón eliminar.
14. `delete.ts` — modal CONFIRM + pantalla post-eliminación.

REGLAS DE REDACCIÓN (NO NEGOCIABLES — CI bloquea):

1. **Mantener los nombres de keys EXACTOS** (ej. `MC_SIGNUP_AGE_BLOCK`). Solo cambias el valor string.
2. **Tuteo cordial profesional** ("tenés", "te enviamos", "podés"). NO "tú tienes" formal. NO "vosotros". NO "ordenador". NO "coger". NO "móvil" (usar "celular").
3. **Anti-determinismo verbatim** en `report.ts`:
   - `MC_REPORT_OCCUPATIONS_HEADING` debe ser: `"Areas donde gente con tu perfil suele encontrar engagement"` (D3.3 verbatim).
   - `MC_REPORT_FICHA_LIMITS` debe contener: `"NO mide habilidades. NO predice exito laboral. NO define una carrera unica."` (D3.10 verbatim — el `(?<!NO\s)` lookbehind del regex permite "NO predice").
   - `MC_REPORT_NFR27_LONG`: largo D3.11 verbatim (lo tenés en el placeholder actual, refinalo si querés pero NO debilitar el anti-determinismo).
   - `MC_REPORT_NFR27_CHIP`: `"Este reporte no es clinico"` o variante equivalente (D3.12).
4. **Anti-AI-words y anti-clínico:** lista completa con regex en `lib/lint/prohibited-phrases.ts`. Resumen:
   - Sin: `delve`, `tapestry`, `unlock`, `empower`, `seamlessly`, `robust`, `game-changer`, `synergy`, `paradigm`, `leverage`, `holistic`, `predice` (excepto con "NO" delante), `garantizado`, `exacto al X%`.
   - Sin: `trastorno`, `patologia`, `diagnostico`, `sintoma`, `depresion`, `ansiedad clinica`.
   - Sin: `eres extrovertido/introvertido/creativo/...`, `tu personalidad real`, `tu verdadero yo`, `te define como`, `tu carrera ideal`, `tu profesion ideal`, `esta es tu carrera`, `tu Ikigai es`, `tu proposito de vida es`.
   - Sin: `solo hoy`, `ultima oportunidad`, `apurate`, `quedan X minutos`.
   - Sin: `Great question!`, `Absolutamente!`, `Por supuesto!`.
5. **Tono permitido** (UX-02 + UI-SPEC §8.3): "tendes a", "soles buscar", "esto puede sugerir", "gente con tu perfil suele". Frases que invitan reflexión, no declaran identidad. Concreto y observacional, no abstracto ni prescriptivo.
6. **Acentos:** podés usar tildes en español. El test lint NO normaliza NFKC (sería bypaseable con homoglifos cirílicos — aceptado por threat register Phase 1, no es tu problema). Pero usá español correcto.

FORMATO DE ENTREGA:

Opción A (preferida, 1 PR): editás los 14 archivos directamente y abrís PR con título `feat(microcopy): GAP-MICROCOPY-FASE1 cowork delivery v1.0`.

Opción B (si no tenés acceso al repo): entregás 14 bloques de código TypeScript en respuesta, uno por archivo, con la ruta arriba (ej. `// lib/i18n/microcopy/es-CO/signup.ts` + código completo del archivo).

VALIDACIÓN antes de marcar como listo:

```bash
# El gate que tenés que pasar localmente:
npx vitest run tests/lint/prohibited-phrases.test.ts
# Debe terminar con 0 violations.

# Bonus: verificá que los placeholders están todos sobrescritos:
grep -rn "TODO(cowork)" lib/i18n/microcopy/es-CO/
# Debe retornar 0 matches.
```

PLACEHOLDERS DE REFERENCIA: leé los archivos actuales en `lib/i18n/microcopy/es-CO/`. Te dan el SHAPE (qué key existe, en qué contexto se usa). Los valores actuales son funcionales pero genéricos — tu trabajo es darles voz de DescubreMe.

Entregable mínimo: 14 archivos con override completo, 0 keys `TODO(cowork)`, lint glossary GREEN.
```

### Notas de aceptación (Claude Code al integrar):

- `npx vitest run tests/lint/prohibited-phrases.test.ts` GREEN.
- `grep -rn "TODO(cowork)" lib/i18n/microcopy/es-CO/` → 0.
- Verificar verbatim D3.3, D3.10, D3.12 en `report.ts` (no relajación del anti-determinismo).
- `npx playwright test --list` debe seguir corriendo (estructura de keys intacta).

---

## Prompt 2 — `[GAP-CONSENT-TEXT-V0.1]` (revisión consent v1.0.0)

**Tipo de entrega:** revisión + sugerencias inline en markdown. Si hay cambios, Cowork sube a `1.0.1` (semver). Hash SHA-256 se regenera automático.
**Volumen:** 1 archivo (`lib/consent/text/1.0.0.md`, 8 secciones).
**Bloquea:** deploy fase 1 (Cowork review pre-deploy es prerequisito; revisión legal externa formal es fase 7).

### Prompt para Cowork (copy-paste):

```
[CONTEXTO COMPARTIDO §0 va aquí]

ROL: Estratega de negocio LATAM + Investigador psicométrico senior con foco en compliance Ley 1581 Colombia.

OBJETIVO: revisar el draft `lib/consent/text/1.0.0.md` (autorización de tratamiento de datos personales para DescubreMe v1.0.0). Confirmar cobertura legal + lenguaje accesible + claridad de la transferencia internacional.

CONTEXTO LEGAL APLICABLE:

- **Ley 1581 de 2012** (Régimen General de Protección de Datos Personales, Colombia).
  - Art. 5 — datos personales generales vs datos sensibles.
  - Art. 6 — autorización separada para datos sensibles.
  - Art. 8 — derechos del titular.
  - Art. 26 — transferencia internacional + autorización expresa.
- **Decreto 1377 de 2013** — reglamenta Ley 1581. Art. 11 sobre retención de auditoría.
- **Circular 002 de 2015 SIC** — transferencia internacional, países sin nivel adecuado.

CHECKLIST DE REVISIÓN (responder PUNTO POR PUNTO):

**A. Cobertura legal:**

- [ ] §1 (quién recolecta): identifica responsable + canal de contacto. ¿Suficiente para Ley 1581?
- [ ] §2 (para qué usamos los datos): finalidad declarada + finalidades excluidas. ¿Cubre principio de finalidad Art. 4 lit. b?
- [ ] §3 (qué datos): distingue Art. 5 generales vs sensibles. ¿Mención correcta a los 7 tipos del Art. 5 (origen racial, salud mental, vida sexual, etc.)? Nuestras respuestas a tests psicométricos: ¿efectivamente caen en "datos sensibles" Art. 5? Si hay duda, ¿qué literal del Art. 5 las cubre?
- [ ] §4 (transferencia internacional): lista los 5 subprocesadores con ubicación (us-east-1). Declara que EEUU no tiene nivel adecuado SIC. Pide autorización Art. 26. ¿Falta alguno? ¿Algún subprocesador adicional que olvidé (Sentry, por ejemplo, está en la lista de servicios pero NO en el consent — ¿hay que agregarlo?)?
- [ ] §5 (retención): activa mientras la cuenta esté activa + anonimización de auditoría (Decreto 1377 Art. 11). ¿Plazo máximo de retención post-eliminación correcto?
- [ ] §6 (derechos del titular): 8 derechos enumerados. ¿Falta alguno? ¿Plazo de respuesta 15 días hábiles es el correcto bajo Ley 1581 Art. 14?
- [ ] §7 (retiro de autorización): distingue general vs sensibles. ¿Está claro qué pasa con cada uno?
- [ ] §8 (versionado): vigencia + notificación de cambios.

**B. Lenguaje accesible es-CO:**

- [ ] Comprensible para adulto LATAM no jurista (nivel lectura ~7° grado).
- [ ] Sin frases prohibidas (lista en `lib/lint/prohibited-phrases.ts`). En particular: sin AI-words, sin determinismo, sin urgencia.
- [ ] Tono cordial profesional, no paternalista.

**C. Coherencia con el producto:**

- [ ] §2 "lo que NO hacemos" es coherente con el principio anti-determinismo del producto (anti-clínico, anti-vocacional, anti-selección B2B).
- [ ] §3 lista exactamente los datos que el código recolecta (email, DOB, country_code, respuestas, puntajes, reportes). Verificar con `db/schema/user.ts` + `db/schema/item_response.ts` + `db/schema/computed_score.ts`.
- [ ] §6 "Mis datos" matchea con `/me/data` route real.

**D. Sintaxis legal:**

- [ ] Autorización separada para sensibles (Art. 6) está implementada como CHECKBOX SEPARADO en signup (ver `app/(auth)/signup/ProfileForm.tsx`); el texto del consent referencia esa autorización explícita.

ENTREGABLE:

Opción A (recomendada): editás `lib/consent/text/1.0.0.md` con tus cambios + bumpear a `lib/consent/text/1.0.1.md` (si hubo cambios materiales) o mantener `1.0.0.md` (si solo cambios cosméticos). Actualizar `lib/consent/versions.ts` con el nuevo semver. PR con título `chore(consent): cowork review GAP-CONSENT-TEXT v0.1 -> v1.0.X`.

Opción B: sugerencias inline tipo "linea N: cambiar X por Y porque Z" en respuesta directa. Claude Code aplica los cambios.

REGLAS DE SEMVER (consent):

- MAJOR (`2.0.0`): cambia significado legal o agrega nueva categoría de datos. Requiere re-consent de todos los usuarios actuales.
- MINOR (`1.1.0`): agrega subprocesador o aclara derecho. Notificación + re-consent recomendado.
- PATCH (`1.0.1`): corrección redaccional sin cambio de alcance. Hash SHA-256 cambia → usuarios no necesitan re-consent pero el cambio queda auditable.

LO QUE NO ES TU TRABAJO:

- Revisión legal formal externa (la hace abogado en fase 7).
- Costo o pricing.
- Adaptación a otros países LATAM (esto es CO-only por ahora; cuando vayamos a MX/AR en fase 3+ generamos consent per-país).

Entregable mínimo: checklist A-D respondido + edición (Opción A) o sugerencias (Opción B).
```

### Notas de aceptación (Claude Code al integrar):

- Si Cowork bumpea a `1.0.1`, crear `lib/consent/text/1.0.1.md` (mantener `1.0.0.md` para usuarios legacy).
- `lib/consent/versions.ts` actualizar `CURRENT_CONSENT_VERSIONS` con el nuevo semver activo.
- `getConsentTextHash()` regenera SHA-256 automático (test debe seguir GREEN).
- Si MAJOR bump: Phase 2 debe agregar migration prompt para re-consent.
- Si Cowork añade subprocesador (ej. Sentry): verificar que `§4` y los policies/legal terms internos sean coherentes con `next.config.ts` + `sentry.*.config.ts`.

---

## Prompt 3 — `[GAP-RIASEC-NARRATIVES-ES-CO]` (132 plantillas narrativas)

**Tipo de entrega:** SQL idempotente en `db/seeds/narrative-templates/RIASEC/seed.sql`.
**Volumen:** **132 rows** (120 `top_3_phrase` + 6 `dimensional_high` + 6 `dimensional_low`). [CORRECCIÓN del STATUS §7.1.3 que decía 126].
**Bloquea:** deploy fase 1 (sin esto el reporte cae a fallback genérico → mata la promesa "experiencia clase mundial").

### Prompt para Cowork (copy-paste):

```
[CONTEXTO COMPARTIDO §0 va aquí]

ROL: UX Writer es-CO + Investigador psicométrico con foco en RIASEC (Holland 1959/1997, O*NET 2019).

OBJETIVO: redactar 132 plantillas narrativas que el motor del reporte compone en runtime para describir el perfil RIASEC del usuario. Estas plantillas son la voz del producto en el momento de mayor revelación — cada una tiene que sonar reflexiva, no determinista, no genérica.

ESTRUCTURA DE LAS PLANTILLAS:

El schema `narrative_template` (ver `db/schema/narrative-template.ts`) tiene 3 valores de `slot` (DB CHECK LOCKED en migration 002):

1. `top_3_phrase` — 120 rows. Una por cada combinación ordenada de 3 letras tomadas de las 6 RIASEC (R, I, A, S, E, C). Esto es 6P3 = 120 permutaciones. El reporte usa la combinación exacta como `RIA`, `RIS`, `ARS`, etc. NO es C(6,3)=20 — es 6P3=120 porque el orden importa (primario, secundario, terciario).
2. `dimensional_high` — 6 rows. Una por letra (R, I, A, S, E, C). Texto descriptivo de qué significa cuando ESA dimensión es la MÁS ALTA del perfil del usuario.
3. `dimensional_low` — 6 rows. Una por letra. Texto descriptivo de qué significa cuando ESA dimensión es la MÁS BAJA del perfil.

REFERENCIA RIASEC (Holland):

- **R (Realistic):** preferencia por actividades concretas, manuales, técnicas, al aire libre, con herramientas o máquinas.
- **I (Investigative):** preferencia por explorar, analizar, investigar, entender cómo funcionan las cosas. Curiosidad intelectual.
- **A (Artistic):** preferencia por expresión creativa, originalidad, estética, ambientes no estructurados.
- **S (Social):** preferencia por ayudar, enseñar, acompañar, trabajar con personas, contribución directa.
- **E (Enterprising):** preferencia por liderar, persuadir, emprender, riesgo calculado, influencia.
- **C (Conventional):** preferencia por estructura, orden, precisión, sistematicidad, datos.

FORMATO SQL ESPERADO (idempotente):

```sql
-- db/seeds/narrative-templates/RIASEC/seed.sql
-- 132 plantillas: 120 top_3_phrase + 6 dimensional_high + 6 dimensional_low.

BEGIN;

-- Idempotencia: borrar versión 1.0 antes de insertar (el schema NO tiene
-- unique index — ver [GAP-RIASEC-NARRATIVES-UNIQUE-INDEX] en BACKLOG).
DELETE FROM public.narrative_template
WHERE version = '1.0' AND lang = 'es-CO';

INSERT INTO public.narrative_template (version, riasec_code, lang, slot, template_text)
VALUES
  -- ============ top_3_phrase (120 rows, 6P3=120 permutaciones) ============
  ('1.0', 'RIA', 'es-CO', 'top_3_phrase', '<texto 1-3 líneas — perfil R primario, I secundario, A terciario>'),
  ('1.0', 'RIS', 'es-CO', 'top_3_phrase', '<texto>'),
  ('1.0', 'RIE', 'es-CO', 'top_3_phrase', '<texto>'),
  ('1.0', 'RIC', 'es-CO', 'top_3_phrase', '<texto>'),
  ('1.0', 'RAI', 'es-CO', 'top_3_phrase', '<texto>'),
  -- ... 120 filas totales, todas las permutaciones ordenadas

  -- ============ dimensional_high (6 rows) ============
  ('1.0', 'R', 'es-CO', 'dimensional_high', '<descripción cuando R es la dimensión más alta>'),
  ('1.0', 'I', 'es-CO', 'dimensional_high', '<texto>'),
  ('1.0', 'A', 'es-CO', 'dimensional_high', '<texto>'),
  ('1.0', 'S', 'es-CO', 'dimensional_high', '<texto>'),
  ('1.0', 'E', 'es-CO', 'dimensional_high', '<texto>'),
  ('1.0', 'C', 'es-CO', 'dimensional_high', '<texto>'),

  -- ============ dimensional_low (6 rows) ============
  ('1.0', 'R', 'es-CO', 'dimensional_low', '<descripción cuando R es la dimensión más baja>'),
  ('1.0', 'I', 'es-CO', 'dimensional_low', '<texto>'),
  ('1.0', 'A', 'es-CO', 'dimensional_low', '<texto>'),
  ('1.0', 'S', 'es-CO', 'dimensional_low', '<texto>'),
  ('1.0', 'E', 'es-CO', 'dimensional_low', '<texto>'),
  ('1.0', 'C', 'es-CO', 'dimensional_low', '<texto>');

COMMIT;
```

REGLAS DE REDACCIÓN (NO NEGOCIABLES — CI bloquea):

1. **Longitud:** cada plantilla 1-3 líneas (~150-250 caracteres). No más, no menos. El reporte renderiza en bloques cortos.
2. **Anti-determinismo verbatim:** prohibido afirmar carrera, profesión, identidad fija. Fórmulas permitidas:
   - "tendés a buscar..."
   - "solés sentirte cómodo/a en contextos donde..."
   - "esto puede sugerir afinidad con..."
   - "gente con este perfil suele encontrar engagement en..."
   - Fórmulas prohibidas: "sos X", "tu carrera ideal es", "te define", "esta es tu vocación".
3. **Anti-AI-words y anti-clínico:** lista completa con regex en `lib/lint/prohibited-phrases.ts`. Tu texto se escanea letra por letra. Match = PR rechazado.
4. **Tono observacional, no prescriptivo:** describí el patrón, no recetes la acción.
5. **`top_3_phrase`:** debe articular cómo INTERACTÚAN las 3 letras en el perfil. NO es la suma de 3 descripciones aisladas. RIA es distinto a RAI (R primario en ambos, pero el secundario cambia el tono).
6. **`dimensional_low`:** SIN tono de carencia o déficit. "Bajo R" no es "te falta lo realista" — es "tendés a buscar contextos más conceptuales / abstractos que manuales".
7. **Género neutro o doble forma:** `cómodo/a`, `creativo/a`. Evitá generizar el sujeto.
8. **es-CO neutral:** sin regionalismos colombianos muy locales (debe leerse natural en MX/AR/CL). Sí al voseo cordial profesional.

EJEMPLOS POSITIVOS (sirven de calibración, NO usar literal):

```
RIA top_3_phrase:
"Combinás afinidad por lo concreto y técnico con curiosidad por entender cómo funciona, y un toque de búsqueda estética. Solés encontrar engagement en problemas que tienen una dimensión manual o aplicada, sin perder la pregunta del 'por qué'."

R dimensional_high:
"Solés sentirte más en tu elemento cuando podés trabajar con cosas concretas — herramientas, máquinas, materiales, espacios físicos. La acción tangible es donde más fluís."

R dimensional_low:
"Tendés a preferir contextos más conceptuales o abstractos por encima de los manuales. Eso no es bueno ni malo — es información sobre dónde te sentís más a gusto."
```

ANTI-EJEMPLOS (rechazados por CI):

```
"Eres una persona realista." (anti-tipologico AF-01 — el regex `eres extrovertido/...` bloquea)
"Tu carrera ideal es ingeniería." (anti-determinismo D3.11 — el regex `tu carrera ideal` bloquea)
"Empoderate tomando esto al pie de la letra." (AI-word `empower` + tono prescriptivo)
"Te define una mirada práctica." (regex `te define como` bloquea — verbatim del lint)
```

VALIDACIÓN antes de marcar como listo:

```bash
# Lint glossary (debe terminar con 0 violations):
npx vitest run tests/lint/prohibited-phrases.test.ts

# Conteo de filas (debe ser 132):
psql <connection> -c "SELECT slot, COUNT(*) FROM narrative_template WHERE version='1.0' AND lang='es-CO' GROUP BY slot;"
# Esperado:
#       slot       | count
# -----------------+-------
#  top_3_phrase    |   120
#  dimensional_high|     6
#  dimensional_low |     6
```

ENTREGABLE:

PR con `db/seeds/narrative-templates/RIASEC/seed.sql` poblado + título `feat(narratives): GAP-RIASEC-NARRATIVES-ES-CO v1.0 cowork delivery`. CI debe pasar.

LEÉ TAMBIÉN: `db/seeds/narrative-templates/RIASEC/README.md` (acabo de afinarlo — tiene el formato completo).

Entregable mínimo: 132 rows, lint glossary GREEN, archivo aplicable vía `psql -f db/seeds/narrative-templates/RIASEC/seed.sql`.
```

### Notas de aceptación (Claude Code al integrar):

- `psql -f db/seeds/narrative-templates/RIASEC/seed.sql` aplicable a `supabase db reset` local.
- Conteo `SELECT slot, COUNT(*) FROM narrative_template GROUP BY slot` = `{top_3_phrase: 120, dimensional_high: 6, dimensional_low: 6}`.
- `npx vitest run tests/lint/prohibited-phrases.test.ts` GREEN strict (no graceful-skip).
- Levantar `[GAP-RIASEC-NARRATIVES-UNIQUE-INDEX]` en BACKLOG si Cowork no lo cierra junto (necesita `CREATE UNIQUE INDEX ON narrative_template (version, riasec_code, lang, slot)` para soportar `ON CONFLICT DO NOTHING` puro sin el `DELETE` preliminar).

---

## Prompt 4 — `[GAP-ONET-OCCUPATIONS-LATAM]` (50-100 ocupaciones)

**Tipo de entrega:** SQL idempotente en `db/seeds/occupations/LATAM/seed.sql`.
**Volumen:** **50-100 rows** en `occupation`. Cobertura: 8-15 ocupaciones por dimensión RIASEC dominante. Mix de niveles educativos.
**Bloquea:** deploy fase 1 (sin esto las "ocupaciones sugeridas" caen a O*NET US literal → nombres torpes en es-CO).

### Prompt para Cowork (copy-paste):

```
[CONTEXTO COMPARTIDO §0 va aquí]

ROL: Investigador psicométrico + curador editorial LATAM con conocimiento del catálogo O*NET (US Department of Labor) + mercado laboral CO/MX/AR/CL.

OBJETIVO: curar entre 50 y 100 ocupaciones LATAM-adapted con código O*NET SOC + código RIASEC + nivel educativo + nombre es-CO neutral. El motor del reporte las usa para la Capa 3 ("Areas donde gente con tu perfil suele encontrar engagement"). Las muestra como ejemplos de campos donde gente con perfil similar suele moverse, NUNCA como prescripción carrera-única.

SCHEMA REAL (ver `db/schema/occupation.ts`):

```typescript
occupation: {
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_onet text NOT NULL UNIQUE,
  name_es_co text NOT NULL,
  riasec_code text NOT NULL,
  education_level text NULLABLE
}
```

CAMPOS:

1. **code_onet:** O*NET-SOC 2019 code, formato `XX-XXXX.XX` (ej. `15-1252.00` para Software Developers, `27-2031.00` para Singers, `11-1011.00` para Chief Executives). Fuente: https://www.onetcenter.org/database.html
2. **name_es_co:** nombre en español Colombia neutral. NO traducción literal del inglés — adaptación editorial al uso común LATAM.
   - "Software Developers" → "Desarrollador/a de software" (no "Desarrolladores de software" plural).
   - "Chief Executives" → "Director/a general" (no "Ejecutivos en jefe" calco).
   - "Marketing Managers" → "Gerente de mercadeo" (no "Ejecutivo de marketing").
   - Usar formas neutrales de género (`Profesional en X`, `Especialista en Y`) cuando sea posible. Si no, doble forma con barra (`Director/a`).
3. **riasec_code:** 3 letras MAYÚSCULAS ordenadas por relevancia (primario, secundario, terciario). Fuente: O*NET Interest Profiler crosswalk. NO inventar — usar el crosswalk oficial cuando exista.
   - "Software Developers" tiene crosswalk RIC (Realistic-Investigative-Conventional).
   - "Singers" tiene AES (Artistic-Enterprising-Social).
   - "Director general" típicamente ECS (Enterprising-Conventional-Social).
4. **education_level:** código O*NET Job Zone 1-5 como STRING (el schema lo guarda como text):
   - `'1'` — little or no preparation (educación básica).
   - `'2'` — some preparation (secundaria completa + entrenamiento limitado).
   - `'3'` — medium preparation (técnico/tecnólogo).
   - `'4'` — considerable preparation (profesional universitario).
   - `'5'` — extensive preparation (posgrado/doctorado/especialización extensa).
   - Source: https://www.onetonline.org/help/online/zones

DISTRIBUCIÓN ESPERADA (orientativa, no rígida):

- **Por dimensión RIASEC dominante:** mínimo 8 y máximo 15 ocupaciones cuyo PRIMER carácter sea R / I / A / S / E / C (ej. 8-15 con `riasec_code` empezando en R, idem I, etc.).
- **Por nivel educativo:** mínimo 5 ocupaciones por cada nivel 2, 3, 4, 5. Nivel 1 puede tener menos (típicamente <5 ocupaciones de Job Zone 1 entran en un reporte de autoconocimiento adulto).
- **Sin sobre-representación de tech:** evitar que 30/100 sean ocupaciones tech. Cobertura amplia: salud, educación, artes, comercio, oficios técnicos, agro, servicios.

FORMATO SQL ESPERADO (idempotente):

```sql
-- db/seeds/occupations/LATAM/seed.sql
-- 50-100 ocupaciones LATAM-adapted con RIASEC + Job Zone.

BEGIN;

INSERT INTO public.occupation (code_onet, name_es_co, riasec_code, education_level)
VALUES
  ('15-1252.00', 'Desarrollador/a de software', 'RIC', '4'),
  ('27-2031.00', 'Cantante', 'AES', '3'),
  ('11-1011.00', 'Director/a general', 'ECS', '5'),
  ('29-1141.00', 'Profesional en enfermeria', 'SIA', '4'),
  ('25-2021.00', 'Docente de primaria', 'SAE', '4'),
  -- ... 50-100 filas
  ('51-7021.00', 'Carpintero/a', 'RCE', '2');

COMMIT;
```

`code_onet` tiene UNIQUE INDEX (`occupation_code_onet_idx`) en el schema, así que `ON CONFLICT (code_onet) DO NOTHING` es seguro. Si querés idempotencia más fuerte, usá:

```sql
INSERT INTO public.occupation (code_onet, name_es_co, riasec_code, education_level)
VALUES (...)
ON CONFLICT (code_onet) DO NOTHING;
```

REGLAS DE CURACIÓN (NO NEGOCIABLES — CI bloquea):

1. **Anti-determinismo en el nombre:** el nombre de la ocupación NO puede sugerir destino carrera-único. "Líder visionario" rechazado (subjetivo). "Director/a general" aceptado (descriptivo).
2. **Anti-AI-words y anti-clínico:** lista en `lib/lint/prohibited-phrases.ts`. Si una ocupación O*NET legítima tiene nombre que matchea (raro, pero posible — ej. "Psychiatrist" tiene "psiquiatra" que NO matchea, pero "Psychologist" → "Psicólogo/a" tampoco; cuidado con que el nombre no introduzca palabras como `terapeuta`).
3. **es-CO neutral:** sin regionalismos. Sin tuteo en los nombres (son sustantivos, no verbos).
4. **RIASEC verificado:** no inventar. Si no tenés crosswalk seguro para una ocupación, omitila — mejor 50 sólidas que 100 con etiquetado dudoso.
5. **No mezclar SOC con O*NET-SOC:** O*NET-SOC añade `.00` o `.01` al final del SOC para sub-detalles. Usar el de O*NET (la versión punto).
6. **Sin duplicados:** UNIQUE INDEX en `code_onet` previene duplicados por código, pero verificar también que no haya 2 rows con `name_es_co` idéntico apuntando a 2 códigos.

EJEMPLOS DE OCUPACIONES POR DIMENSIÓN (calibración, NO lista cerrada):

```
R primario (8-15 ocupaciones):
- 47-2031.00 Carpintero/a (RCE, JZ 2)
- 49-3023.00 Mecánico/a automotriz (RCI, JZ 3)
- 17-2199.00 Ingeniero/a especializado/a (IRC, JZ 4)
- 45-2092.00 Trabajador/a agrícola (RES, JZ 1)

I primario:
- 15-1252.00 Desarrollador/a de software (RIC, JZ 4) — primario R aquí, ejemplo
- 19-2031.00 Químico/a (IRC, JZ 4)
- 19-3033.00 Psicólogo/a clínico/a (ISA, JZ 5) [cuidado: "clínico" como adjetivo profesional es OK; no estás describiendo al usuario]
- 15-2031.00 Estadístico/a (ICR, JZ 5)

A primario:
- 27-2011.00 Actor/Actriz (AES, JZ 3)
- 27-1024.00 Diseñador/a gráfico/a (AEI, JZ 4)
- 27-2042.00 Músico (compositor/a) (AIS, JZ 4)
- 27-3043.00 Escritor/a (AIS, JZ 4)

S primario:
- 25-2021.00 Docente de primaria (SAE, JZ 4)
- 21-1023.00 Trabajador/a social (SAE, JZ 5)
- 29-1141.00 Profesional en enfermería (SIA, JZ 4)
- 21-1014.00 Consejero/a en salud mental (SIA, JZ 5)

E primario:
- 11-1011.00 Director/a general (ECS, JZ 5)
- 41-3091.00 Vendedor/a (ECS, JZ 3)
- 13-1161.00 Analista de mercadeo (ECI, JZ 4)
- 11-9111.00 Administrador/a de servicios médicos (ESC, JZ 5)

C primario:
- 43-3031.00 Contador/a (CES, JZ 4)
- 43-9061.00 Asistente administrativo/a (CES, JZ 3)
- 13-2011.00 Auditor/a financiero/a (CIE, JZ 4)
- 43-4051.00 Representante de servicio al cliente (CES, JZ 2)
```

VALIDACIÓN antes de marcar como listo:

```bash
# Lint glossary (debe terminar con 0 violations):
npx vitest run tests/lint/prohibited-phrases.test.ts

# Conteo y distribución:
psql <connection> -c "SELECT LEFT(riasec_code, 1) AS dim, COUNT(*) FROM occupation GROUP BY 1 ORDER BY 1;"
# Esperado: 6 dimensiones con >=8 cada una.

psql <connection> -c "SELECT education_level, COUNT(*) FROM occupation GROUP BY 1 ORDER BY 1;"
# Esperado: >=5 ocupaciones en cada nivel 2-5.
```

ENTREGABLE:

PR con `db/seeds/occupations/LATAM/seed.sql` poblado + título `feat(occupations): GAP-ONET-OCCUPATIONS-LATAM v1.0 cowork delivery`. CI debe pasar.

LEÉ TAMBIÉN: `db/seeds/occupations/LATAM/README.md` (tiene el formato completo).

LO QUE NO ES TU TRABAJO:

- Salarios. No los incluimos en el reporte fase 1 (sería pseudo-precisión engañosa para LATAM con tanta dispersión).
- Outlook / proyección de demanda. Tampoco en fase 1.
- Adaptación cultural más allá del nombre. La Capa 3 del reporte SOLO muestra nombre + dimensión RIASEC dominante.

Entregable mínimo: 50-100 rows con cobertura RIASEC + Job Zone equilibrada, lint glossary GREEN, archivo aplicable vía `psql -f db/seeds/occupations/LATAM/seed.sql`.
```

### Notas de aceptación (Claude Code al integrar):

- `psql -f db/seeds/occupations/LATAM/seed.sql` aplicable a `supabase db reset` local.
- Conteo total entre 50 y 100.
- Distribución RIASEC: 6 dimensiones con >=8 cada una (mínimo 48 ocupaciones; el resto distribuido).
- Distribución education_level: >=5 ocupaciones por nivel 2, 3, 4, 5.
- `npx vitest run tests/lint/prohibited-phrases.test.ts` GREEN strict.
- Cruzar primer carácter del `riasec_code` con la dimensión dominante esperada antes de merge.

---

## Orden de envío sugerido a Cowork

| # | GAP | Tiempo Cowork est. | Bloqueo | Recomendado en paralelo |
|---|---|---|---|---|
| 1 | `[GAP-CONSENT-TEXT-V0.1]` | 1-2h | Bloquea deploy | Sí — revisión, no producción |
| 2 | `[GAP-MICROCOPY-FASE1]` | 4-8h | Bloquea deploy (placeholders sirven E2E) | Sí — 14 archivos editables independientemente |
| 3 | `[GAP-RIASEC-NARRATIVES-ES-CO]` | 8-16h | Bloquea deploy (sin esto reporte cae a fallback) | No — necesita atención sostenida (132 piezas) |
| 4 | `[GAP-ONET-OCCUPATIONS-LATAM]` | 4-8h | Bloquea deploy (sin esto nombres torpes en es-CO) | Sí — independiente de los otros 3 |

**Recomendación:** mandar los 4 prompts en simultáneo. Cowork prioriza por tiempo más corto primero (consent + occupations), narratives queda como bloque sostenido. Microcopy puede iterarse en paralelo con narratives porque viven en archivos distintos.

## Branch strategy sugerida

**Opción A — 4 PRs separados (recomendada):**

- `feat/cowork-consent-review`
- `feat/cowork-microcopy`
- `feat/cowork-narratives-riasec`
- `feat/cowork-occupations-latam`

Pros: revert quirúrgico si uno bloquea CI, review independiente, no se acoplan dependencias.
Contras: 4 PRs Cowork (overhead Cowork-side).

**Opción B — 1 PR combinado:**

- `feat/cowork-fase1-delivery-bundle`

Pros: 1 sola merge, atomicidad.
Contras: si lint glossary falla en uno, los 4 bloqueados.

**Decisión recomendada:** A si Cowork puede manejar 4 PRs. B si Cowork prefiere monolito (más raro). German confirma.

## Checklist final pre-envío

- [ ] German lee este doc completo.
- [ ] German revisa los 4 prompts y decide si afinar más.
- [ ] German confirma branch strategy (A o B).
- [ ] German envía los 4 prompts a Cowork (esta sesión, o pega cada uno donde corresponda).
- [ ] Cuando Cowork entregue: Claude Code (nueva sesión) integra + corre lint + reporta.
- [ ] Una vez los 4 mergeados: `npx playwright test` para ver si E2E gap-closure mejora.
- [ ] Si quedan E2E failures genuinas (radio button + AGE_BLOCK + pause-resume): abrir Plan 01-13 o llevar a Phase 2.
- [ ] `/gsd-verify-work 1` post-Cowork + post-E2E gap-closure.

## Corrección pendiente al STATUS.md

STATUS §7.1.3 dice "120 + 6 dimensionales" (total 126). El número real per schema es **132** (120 + 6 high + 6 low). Cuando German confirme este doc, Claude Code corrige STATUS.md §7.1.3 + BACKLOG `[GAP-RIASEC-NARRATIVES-ES-CO]` y commitea como ajuste cosmético.

---

*Fin del documento. Generado por Claude Code 2026-06-08. Re-generar si el schema de `narrative_template` o `occupation` cambia, o si la lista de archivos `lib/i18n/microcopy/es-CO/` cambia.*
