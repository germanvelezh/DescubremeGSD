# RIASEC narrative templates — Cowork delivery target

Esta carpeta es el destino del entregable de Cowork para `[GAP-RIASEC-NARRATIVES-ES-CO]`.

## Que va aqui

Plantillas narrativas en es-CO neutral que el reporte O*NET IP-SF compone
en runtime (`lib/report/narrative-loader.ts`).

## Volumen esperado

- **120 plantillas `top_3_phrase`** — una por combinacion ordenada de top-3 RIASEC
  (6 letras tomadas de 3 = 6P3 = 120). Frase reveladora 1-2 lineas para Capa 1
  del reporte (UI-SPEC §7.6).
- **6 plantillas `dimensional_high`** — una por letra R/I/A/S/E/C. Texto
  descriptivo cuando esa dimension es la mas alta del perfil.
- **6 plantillas `dimensional_low`** — una por letra R/I/A/S/E/C. Texto
  descriptivo cuando esa dimension es la mas baja del perfil.

Total: **132 rows** en `narrative_template`.

## Formato SQL esperado

```sql
INSERT INTO narrative_template (version, riasec_code, lang, slot, template_text)
VALUES
  -- top_3_phrase (120 combinaciones)
  ('1.0', 'RIA', 'es-CO', 'top_3_phrase', '<texto es-CO neutral 1-2 lineas>'),
  ('1.0', 'RAI', 'es-CO', 'top_3_phrase', '<texto>'),
  -- ... 120 filas

  -- dimensional_high (6 filas)
  ('1.0', 'R', 'es-CO', 'dimensional_high', '<descripcion cuando R es la mas alta>'),
  ('1.0', 'I', 'es-CO', 'dimensional_high', '<...>'),
  -- ... 6 filas total

  -- dimensional_low (6 filas)
  ('1.0', 'R', 'es-CO', 'dimensional_low', '<descripcion cuando R es la mas baja>'),
  ('1.0', 'I', 'es-CO', 'dimensional_low', '<...>'),
  -- ... 6 filas total
ON CONFLICT DO NOTHING;
```

## Reglas de redaccion (no negociables)

Estos textos son **user-facing**. Se ejecuta `tests/lint/prohibited-phrases.test.ts`
sobre toda esta carpeta. Cualquier match bloquea el PR. Las reglas vienen de
`lib/lint/prohibited-phrases.ts` + UI-SPEC §8.2 + CLAUDE.md §8.

Categorias prohibidas (ver `lib/lint/prohibited-phrases.ts` para la lista
literal con regex; este README intencionalmente NO lista los terminos exactos
porque el CI lint escanea recursivamente todos los `.md` en este directorio):

- **Determinismo vocacional (D3.11)** — afirmaciones sobre carrera/profesion fija.
- **Esencialismo / tipologico (AF-01)** — etiquetar al usuario como un "tipo" fijo.
- **Lexico clinico (PRD Principio 5)** — el producto es educativo, no medico.
- **Determinismo proposito (AF-20)** — afirmar el Ikigai o proposito de vida del usuario.
- **Comparativos sociales (AF-08)** — rankear al usuario contra percentiles publicos.
- **Urgencia (AF-06)** — manipulacion temporal de cualquier tipo.
- **Marketing predictivo** — claims deterministas de prediccion / garantia.
- **Anti-es-CO (UX-01)** — regionalismos no-CO; usar tuteo cordial.
- **AI-words (CLAUDE.md §2 / §9)** — vocabulario corporativo generico / muletilla.

La lista completa con regex vive en `lib/lint/prohibited-phrases.ts`. Si tu
texto necesita mencionar uno de esos terminos (ej. instrucciones a Cowork),
escribelo asi: `[GAP - mencion documental]` o agregalo al archivo de
exclusion del lint con razon documentada.

Tono permitido (UX-02 + UI-SPEC §8.3):

- "tendes a", "soles buscar", "esto puede sugerir", "gente con tu perfil suele".
- Frases que invitan reflexion en vez de declarar identidad.
- Concreto y observacional, no abstracto ni prescriptivo.

## Idioma

es-CO neutral. Tuteo cordial profesional. Evitar regionalismos colombianos
muy locales que no funcionen en MX/AR/CL.

## Versionado

- `version = '1.0'` para la entrega inicial.
- Cambios materiales = bump MAJOR (`2.0`). Cambios cosmeticos = bump MINOR
  (`1.1`). El reporte lee `narrative_version` desde `report_snapshot` —
  cambios futuros NO afectan reportes ya generados.

## Idempotencia

Usar `ON CONFLICT DO NOTHING` con un unique index `(version, riasec_code, lang, slot)`
(pendiente — ver `[GAP-RIASEC-NARRATIVES-UNIQUE-INDEX]` en BACKLOG si no existe).
Sin ese index, la idempotencia depende de que el script de carga primero haga
DELETE de `(version='1.0', lang='es-CO')` antes de INSERT.

## Validacion antes de merge

```bash
# CI gate
npm run test:lint
```

Debe pasar con cero violaciones de glossary sobre estos archivos.
