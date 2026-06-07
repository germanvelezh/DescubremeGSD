# LATAM occupations — Cowork delivery target

Esta carpeta es el destino del entregable de Cowork para `[GAP-ONET-OCCUPATIONS-LATAM]`.

## Que va aqui

Catalogo de 50-100 ocupaciones LATAM-adapted con codigo O*NET + RIASEC code
+ nivel educativo. El reporte O*NET IP-SF las usa para componer la Capa 3
("Areas donde gente con tu perfil suele encontrar engagement").

## Volumen esperado

- **50-100 filas** en `occupation`. Cobertura de los 6 codigos top RIASEC
  asegurando 8-15 ocupaciones por dimension dominante.
- Mix de niveles educativos: tecnico, profesional, posgrado.

## Formato SQL esperado

```sql
INSERT INTO occupation (code_onet, name_es_co, riasec_code, education_level)
VALUES
  ('11-1011.00', 'Director general', 'ECS', '5'),
  ('15-1252.00', 'Programador', 'RIC', '4'),
  ('27-2031.00', 'Cantante', 'AES', '3'),
  -- ... 50-100 filas
ON CONFLICT (code_onet) DO NOTHING;
```

`occupation.code_onet` ya tiene unique index (`occupation_code_onet_idx`)
en el schema Drizzle, asi que ON CONFLICT es seguro.

## Curacion (no negociable)

- **Adaptacion LATAM:** nombres en es-CO neutral. Evitar traducciones literales
  raras del ingles. Cowork curador escoge la denominacion comun en CO/MX/AR/CL.
- **Sin determinismo:** la Capa 3 las presenta como "Areas donde gente con tu
  perfil suele encontrar engagement", NUNCA como "tu carrera". El nombre de la
  ocupacion en si NO puede sugerir determinismo carrera-unica (ver glossary
  en `lib/lint/prohibited-phrases.ts` para la lista regex completa).
- **Codigo RIASEC:** 3 letras ordenadas por relevancia. Fuente primaria: O*NET
  Interest Profiler crosswalk + adaptacion editorial.
- **Education level:** codigo O*NET 1-5 (1=bajo, 5=doctorado).

## Idioma

es-CO neutral. Sin regionalismos. Evitar:

- Regionalismos no-CO (UX-01) — ver glossary en `lib/lint/prohibited-phrases.ts`.
- Genero asumido: usar formas neutrales cuando sea posible
  ("Profesional en X" en vez de "Director").
- Anglicismos cuando hay forma castellanizada bien establecida.

## Versionado

- `occupation_set_version = '1.0'` referenciado en `report_snapshot`. Cambios
  no afectan reportes generados antes del swap.

## Validacion antes de merge

```bash
# CI gate — el lint glossary tambien escanea este path si se incluye en
# tests/lint/prohibited-phrases.test.ts SCAN_DIRS (verificar antes de merge).
npm run test:lint
```

## Source-of-truth

- O*NET Interest Profiler Short Form crosswalk (US 1999) — referencia base.
- `implementation_packs/O-NET-IP-SF_v1.0_*.md` — pack curado.
- Adaptacion LATAM editorial: responsabilidad de Cowork.
