# Implementation Pack — Job Zones es-CO (nivel de preparación) v1.0

**Producto:** DescubreMe (MVP).
**Autor:** Cowork (Investigador psicométrico + Arquitecto). **Owner:** German Velez Hurtado.
**Fecha:** 2026-06-25.
**Tipo:** Pack operativo ("qué codear" de contenido). Claude Code lo carga y cablea; NO inventa contenido.
**Consume:** este pack + `db/seeds/occupations/LATAM/seed.sql` (96 ocupaciones ya existentes).
**Relacionado:** `estado/ANALISIS_Gancho_y_ONET_Fase2_v1.0.md`, `PROMPT_ClaudeCode_Gancho_JobZone_Fase2_v1.0.md`.

---

## 1. Qué es un Job Zone (es-CO)

`Hecho:` un **Job Zone** (nivel de preparación) agrupa ocupaciones similares en la cantidad de **educación, experiencia relacionada y formación en el trabajo** que requieren. O*NET clasifica cada ocupación en una zona (National Center for O*NET Development, s.f.-b). El O*NET Interest Profiler usa la zona como **segundo paso**: tras conocer los intereses RIASEC, el usuario fija un nivel de preparación y recién ahí se filtran ocupaciones (Rounds et al., s.f.).

`Dato vigente:` desde **febrero 2026** O*NET consolidó las Zonas 1 y 2 en una sola, **"Job Zone 1-2"**, y mantuvo 3, 4 y 5 (National Center for O*NET Development, s.f.-b). Este pack usa el esquema vigente: **`1-2`, `3`, `4`, `5`**.

`Uso en producto (no negociable):` la zona ajusta **qué ocupaciones se muestran como ejemplos de exploración**. No es un veredicto, no asigna carrera, no predice éxito. El copy lo refleja (ver pack de microcopy).

---

## 2. Definiciones es-CO por zona

Texto user-facing (tuteo es-CO). El `value` es el identificador interno; el `label` es lo que ve el usuario solo si se decide exponer la zona (por defecto NO se expone el término técnico; se usa lenguaje cotidiano del pack de microcopy).

| value | label es-CO | Preparación típica (es-CO) | Ejemplos (del seed actual) |
|---|---|---|---|
| `1-2` | Preparación básica | Bachillerato o menos; habilidad/experiencia mínima; de unos días a un año de entrenamiento | Jardinero/a, Trabajador/a agrícola, Vendedor/a de comercio, Recepcionista |
| `3` | Preparación media | Técnico/tecnólogo o formación vocacional, o título de nivel intermedio; 1-2 años de entrenamiento y experiencia | Electricista, Auxiliar contable, Técnico/a químico/a, Higienista oral |
| `4` | Preparación considerable | Pregrado universitario (4-5 años) y varios años de experiencia relacionada | Ingeniero/a civil, Contador/a auditor/a, Diseñador/a gráfico/a, Gerente de mercadeo |
| `5` | Preparación extensa | Posgrado (especialización/maestría/doctorado), conocimiento extenso y 5+ años de experiencia | Médico/a veterinario/a, Psicólogo/a, Abogado/a, Director/a general |

`Nota:` los ejemplos salen del dataset ya sembrado; no se inventan ocupaciones nuevas aquí.

---

## 3. Mapeo educación + experiencia → Job Zone

### 3.1 Enums de captura (es-CO)

`education_level` (nivel educativo alcanzado):

| value | label es-CO |
|---|---|
| `secundaria` | Bachillerato o menos |
| `tecnico_tecnologo` | Técnico o tecnólogo |
| `pregrado` | Pregrado universitario |
| `posgrado` | Posgrado (especialización, maestría o doctorado) |

`career_stage` (experiencia laboral relacionada):

| value | label es-CO | Referencia |
|---|---|---|
| `sin_experiencia` | Sin experiencia o estudiante | 0 años |
| `junior` | Junior | ~0-3 años |
| `semi_senior` | Intermedio | ~3-8 años |
| `senior` | Senior | 8+ años |

### 3.2 Regla de inferencia (zona base por educación)

```
inferBaseZone(education_level):
  secundaria          -> "1-2"
  tecnico_tecnologo   -> "3"
  pregrado            -> "4"
  posgrado            -> "5"
```

`Por qué la educación domina:` el Job Zone está definido principalmente por el nivel formativo requerido (National Center for O*NET Development, s.f.-b). La experiencia y la intención del usuario refinan el rango (3.3), no reemplazan la zona base.

### 3.3 Rango de resultados (cómo entra experiencia + intención)

La experiencia senior y la disposición a formarse **amplían el techo**, nunca el piso por debajo de la zona base:

```
targetZones(base_zone, career_stage, openToStudyMore):
  zones = [base_zone]
  if career_stage == "senior" OR openToStudyMore == true:
      zones += [oneAbove(base_zone)]        # techo +1, tope "5"
  return dedupe(zones)

oneAbove: "1-2" -> "3" -> "4" -> "5" -> "5"   # "5" no sube más
```

`Racional:` un perfil con técnico/tecnólogo (zona 3) y 8+ años de experiencia puede explorar de forma realista roles de zona 4; un usuario que declara estar dispuesto a formarse más ve el siguiente nivel. Es defensible y usa la experiencia que el usuario pidió considerar, sin caer en determinismo.

`Lo que NO se hace (no negociable):` sexo/género y edad **no** entran en este cálculo ni en el filtro. La edad solo serviría, en el futuro, para selección de baremos/normas, jamás para decidir qué ocupación "te queda".

---

## 4. Normalización del dataset existente (sin reescribir el seed)

El seed actual guarda `education_level` como texto `'1'..'5'`. Bajo el esquema vigente, **`'1'` y `'2'` se tratan como `'1-2'`** en tiempo de consulta. No hace falta reescribir el seed; se normaliza al filtrar.

```
normalizeZone(raw):     # raw = occupation.education_level (texto del seed)
  "1" -> "1-2"
  "2" -> "1-2"
  "3" -> "3"
  "4" -> "4"
  "5" -> "5"
  null/otro -> null     # sin zona: ver fallback en §5
```

`Opcional (P2):` una migración futura puede actualizar el seed a `'1-2'` y renombrar la columna `education_level` -> `job_zone` para evitar confusión semántica (hoy "education_level" en `occupation` significa Job Zone, no el nivel educativo del usuario). No es bloqueante; documentar el doble uso mientras tanto.

---

## 5. Reglas del filtro de ocupaciones

El selector (`lib/report/occupation-selector.ts`) debe filtrar por **intereses Y zona**:

1. **Interés (RIASEC):** la ocupación coincide si su `riasec_code` contiene al menos una de las 3 letras top del usuario (heurística actual; mantener en v1).
2. **Zona:** `normalizeZone(occupation.education_level)` está en `targetZones(...)` (§3.3).
3. **Orden:** priorizar por congruencia de interés — número de letras del top-3 presentes en `riasec_code`, y desempatar por la posición de la primera coincidencia (una ocupación cuyo primer carácter es la 1ª letra del usuario va antes). Dentro del mismo puntaje, priorizar la **zona base** sobre la zona +1.
4. **País:** si `countryCode` está disponible y el dataset llega a tener marca de país, priorizar ocupaciones del país del usuario (hoy `countryCode` es parámetro muerto; al menos dejar de ignorarlo).
5. **Límite:** 7 por defecto (D3.3).

### 5.1 Fallbacks (evitar lista vacía)

- Si tras filtrar por zona hay **menos de 3** resultados: ampliar a `targetZones ± 1` (sin bajar de `1-2` ni pasar de `5`) y reordenar.
- Si una ocupación tiene `education_level` nulo: incluirla solo en el último fallback, nunca en el resultado principal.
- Si aun así hay 0: mostrar el estado vacío del pack de microcopy (no error técnico).

### 5.2 Prueba de aceptación (debe pasar)

- Usuario con `posgrado` + `senior` (zona 5, techo 5): **no** recibe ocupaciones zona `1-2` ni `3` en el resultado principal.
- Usuario con `pregrado` + `semi_senior` que marca "abierto a formarme más": ve zona `4` y también `5`.
- Usuario con `secundaria` + `sin_experiencia`: ve zona `1-2` (y `3` solo si activa "formarme más").

---

## 6. Guardrails (no negociables)

- Nunca filtrar ni rankear por sexo/género ni edad.
- Educación y experiencia entran **solo** vía Job Zone (§3), nunca como recorte determinista.
- La lista es de **exploración**: el copy nunca dice "tu carrera ideal es X" (principio 6 del PRD). Ver pack de microcopy.
- Consentimiento (Ley 1581) para capturar `education_level` y `career_stage`: propósito declarado y revocable (pack de microcopy §4).

---

## 7. Fuentes (APA 7)

- National Center for O*NET Development. (s.f.-b). *O*NET OnLine Help: Job Zones*. O*NET OnLine. https://www.onetonline.org/help/online/zones
- Rounds, J., Su, R., Lewis, P., & Rivkin, D. (s.f.). *O*NET Interest Profiler manual*. National Center for O*NET Development. https://www.onetcenter.org/reports/IP.html

`Verificación:` confirmar el esquema de zonas vigente (consolidación 1-2) en O*NET OnLine al momento de cargar/normalizar, por si hubo ajustes posteriores a feb-2026.

---

*Fin del pack Job Zones es-CO v1.0. Contenido Cowork; carga/cableado por Claude Code.*
