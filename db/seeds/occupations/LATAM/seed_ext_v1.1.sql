-- db/seeds/occupations/LATAM/seed_ext_v1.1.sql
-- Extension del catalogo de ocupaciones LATAM (es-CO) -- Zonas 3-5 (audiencia profesional P1/P2).
-- Complementa db/seeds/occupations/LATAM/seed.sql (96 filas v1.0). 29 filas nuevas.
--
-- Fuente (primaria): O*NET-SOC + O*NET OnLine resumen por ocupacion (campo "Interests" high-point
--   y "Job Zone"), extraido verbatim de https://www.onetonline.org/link/summary/<SOC> el 2026-06-25.
-- riasec_code: high-point O*NET verbatim (1-3 letras, orden por relevancia). No inventado:
--   donde O*NET publica 1 o 2 letras se conserva tal cual; no se rellena una tercera letra.
-- education_level: O*NET Job Zone como texto ('3'..'5'). Esta extension no incluye zonas 1-2.
--   Nota esquema feb-2026: O*NET consolido Zonas 1 y 2 en "1-2"; esta extension solo trae 3/4/5.
-- name_es_co: adaptacion editorial al uso comun en CO/MX (no traduccion literal), formas neutrales
--   de genero o doble forma con barra. Tildes es-CO aplicadas (dato user-facing).
--
-- Verificacion (Gate 1): cada riasec_code y job_zone confirmado 1:1 contra la pagina O*NET de la
--   ocupacion el 2026-06-25. Correcciones aplicadas vs. el pack candidato v1.0 (p. ej. Software
--   Developers ICR->IC; UX/UI AIR->IAC; Gerente TI ECI->CEI; Consultor de gestion ECI->CIE).
-- Excluida: 29-1248.00 (Surgeons, All Other) -- la pagina O*NET no retorno datos de interes/zona.
--
-- Uso en producto: ejemplos de campos para EXPLORAR (no prescripcion, no asignacion, no resultado
--   individual). El selector filtra por las letras top del usuario Y por Job Zone (pack JobZones).
--
-- occupation_set_version objetivo = '1.1'. Idempotente: ON CONFLICT (code_onet) DO NOTHING.
-- Aplicar DESPUES de seed.sql v1.0. Re-ejecutable. psql -f este_archivo (y supabase db reset local).

BEGIN;

INSERT INTO public.occupation (code_onet, name_es_co, riasec_code, education_level)
VALUES
  -- ===== Tecnologia y datos =====
  ('15-1252.00', 'Desarrollador/a de software', 'IC', '4'),
  ('15-1211.00', 'Analista de sistemas de información', 'IC', '4'),
  ('15-1212.00', 'Analista de seguridad informática', 'CI', '4'),
  ('15-1255.00', 'Diseñador/a de experiencia e interfaz (UX/UI)', 'IAC', '4'),
  ('15-1232.00', 'Especialista de soporte técnico (mesa de ayuda)', 'CRI', '3'),
  ('15-2031.00', 'Analista de investigación de operaciones', 'IC', '5'),
  ('11-3021.00', 'Gerente de tecnología y sistemas de información', 'CEI', '4'),

  -- ===== Negocios, gestión y personas =====
  ('13-1111.00', 'Consultor/a de gestión', 'CIE', '4'),
  ('13-1082.00', 'Especialista en gestión de proyectos', 'EC', '4'),
  ('13-1071.00', 'Especialista de talento humano', 'ECS', '4'),
  ('11-2011.00', 'Gerente de publicidad y promociones', 'ECA', '4'),
  ('11-3012.00', 'Gerente de servicios administrativos', 'ECS', '3'),

  -- ===== Salud especializada =====
  ('29-1215.00', 'Médico/a de familia', 'SI', '5'),
  ('29-1071.00', 'Profesional clínico/a asociado/a (physician assistant)', 'SIC', '5'),
  ('29-1031.00', 'Nutricionista y dietista', 'SI', '5'),
  ('29-1122.00', 'Terapeuta ocupacional', 'SI', '5'),
  ('29-1126.00', 'Terapeuta respiratorio/a', 'RSI', '3'),
  ('21-1014.00', 'Consejero/a en salud mental', 'SI', '5'),

  -- ===== Ciencia, academia y social =====
  ('25-9031.00', 'Diseñador/a instruccional (coordinador/a académico/a)', 'SEI', '5'),
  ('19-3032.00', 'Psicólogo/a organizacional', 'IEC', '5'),
  ('19-3051.00', 'Planificador/a urbano y regional', 'IEC', '5'),
  ('19-1042.00', 'Científico/a médico/a (investigación)', 'IR', '5'),
  ('19-3094.00', 'Politólogo/a', 'IA', '5'),

  -- ===== Creatividad, comunicación e ingeniería =====
  ('27-1014.00', 'Artista de efectos visuales y animación', 'AR', '4'),
  ('27-2012.00', 'Productor/a y director/a audiovisual', 'AE', '4'),
  ('27-3091.00', 'Intérprete y traductor/a', 'CAS', '4'),
  ('17-2061.00', 'Ingeniero/a de hardware de cómputo', 'RIC', '4'),
  ('17-2011.00', 'Ingeniero/a aeroespacial', 'IRC', '4'),
  ('17-2041.00', 'Ingeniero/a químico/a', 'RIC', '4')
ON CONFLICT (code_onet) DO NOTHING;

COMMIT;
