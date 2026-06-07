-- contention_resources seed CO — DescubreMe Phase 1 Wave 5 (Plan 01-08).
--
-- Verbatim D1.7 (01-CONTEXT.md + 01-RESEARCH.md lineas 1315-1323). Seis
-- recursos oficiales Colombia 2026, verificados al 2026-06-05.
--
-- IDEMPOTENT: NOT EXISTS sobre (country_code, type, name) — re-ejecutable.
--
-- COMPL-11: `last_verified_at` se chequea contra umbral 90 dias en
-- lib/ethics/contention.ts::getContentionResources. Phase 6 POLISH-06
-- formaliza verificacion mensual con alerta UI a Cowork/German.
--
-- [GAP-CONTENTION-VERIFY-2026]: la fecha 2026-06-05 viene de la decision
-- D1.7 documentada al iniciar el proyecto. Cowork debe confirmar pre-merge
-- a produccion que los 6 numeros siguen siendo correctos. El loader emite
-- warning a logger.warn cuando la fecha tiene >90d.
--
-- Anchors:
--   - 01-RESEARCH.md lineas 1315-1323 (verbatim).
--   - 01-CONTEXT.md D1.7.
--   - 01-PATTERNS.md §2.5.
--   - lib/ethics/contention.ts (loader + freshness check).

BEGIN;

INSERT INTO public.contention_resources
  (country_code, type, name, phone, description_es_co, hours, last_verified_at)
SELECT
  'CO', 'crisis_line', 'Linea 106', '106',
  'Linea de salud mental Bogota, 24/7', '24/7',
  '2026-06-05T00:00:00Z'::timestamptz
WHERE NOT EXISTS (
  SELECT 1 FROM public.contention_resources
  WHERE country_code = 'CO' AND type = 'crisis_line' AND name = 'Linea 106'
);

INSERT INTO public.contention_resources
  (country_code, type, name, phone, description_es_co, hours, last_verified_at)
SELECT
  'CO', 'crisis_line', 'Linea de la Vida', '018000018596',
  'Prevencion del suicidio nacional', '24/7',
  '2026-06-05T00:00:00Z'::timestamptz
WHERE NOT EXISTS (
  SELECT 1 FROM public.contention_resources
  WHERE country_code = 'CO' AND type = 'crisis_line' AND name = 'Linea de la Vida'
);

INSERT INTO public.contention_resources
  (country_code, type, name, phone, description_es_co, hours, last_verified_at)
SELECT
  'CO', 'emergency', 'Linea 123', '123',
  'Emergencias nacional', '24/7',
  '2026-06-05T00:00:00Z'::timestamptz
WHERE NOT EXISTS (
  SELECT 1 FROM public.contention_resources
  WHERE country_code = 'CO' AND type = 'emergency' AND name = 'Linea 123'
);

INSERT INTO public.contention_resources
  (country_code, type, name, phone, description_es_co, hours, last_verified_at)
SELECT
  'CO', 'gender_violence', 'Linea 155', '155',
  'Orientacion a mujeres victimas de violencia', '24/7',
  '2026-06-05T00:00:00Z'::timestamptz
WHERE NOT EXISTS (
  SELECT 1 FROM public.contention_resources
  WHERE country_code = 'CO' AND type = 'gender_violence' AND name = 'Linea 155'
);

INSERT INTO public.contention_resources
  (country_code, type, name, phone, description_es_co, hours, last_verified_at)
SELECT
  'CO', 'mental_health', 'Profamilia', '01 8000 110 900',
  'Salud sexual y reproductiva, salud mental', 'L-V 8am-6pm',
  '2026-06-05T00:00:00Z'::timestamptz
WHERE NOT EXISTS (
  SELECT 1 FROM public.contention_resources
  WHERE country_code = 'CO' AND type = 'mental_health' AND name = 'Profamilia'
);

INSERT INTO public.contention_resources
  (country_code, type, name, phone, description_es_co, hours, last_verified_at)
SELECT
  'CO', 'mental_health', 'Asociacion Colombiana de Psiquiatria', '+57 1 256 1148',
  'Directorio profesional', 'L-V 9am-5pm',
  '2026-06-05T00:00:00Z'::timestamptz
WHERE NOT EXISTS (
  SELECT 1 FROM public.contention_resources
  WHERE country_code = 'CO' AND type = 'mental_health' AND name = 'Asociacion Colombiana de Psiquiatria'
);

COMMIT;
