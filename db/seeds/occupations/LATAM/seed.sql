-- db/seeds/occupations/LATAM/seed.sql
-- Catalogo de ocupaciones LATAM (es-CO) -- GAP-ONET-OCCUPATIONS-LATAM v1.0 (Cowork delivery).
--
-- 96 filas: 16 por dimension dominante RIASEC (primer caracter R / I / A / S / E / C).
--
-- Fuente (primaria): O*NET-SOC 2019 + O*NET Interest Profiler crosswalk (high-point
--   RIASEC), extraido de O*NET OnLine explore-by-interest el 2026-06-08.
--   https://www.onetonline.org/explore/interests/
-- riasec_code: high-point O*NET verbatim (1-3 letras, orden por relevancia). No inventado:
--   donde O*NET publica 1 o 2 letras se conserva tal cual; no se rellena una tercera letra.
-- education_level: O*NET Job Zone (1-5) como texto. 1=preparacion minima, 5=preparacion extensa.
-- name_es_co: adaptacion editorial al uso comun en CO/MX/AR/CL (no traduccion literal del ingles),
--   con formas neutrales de genero o doble forma con barra. Tildes es-CO aplicadas (dato user-facing).
--
-- Uso en producto: la Capa 3 del reporte muestra estas ocupaciones como EJEMPLOS de campos
--   donde gente con un perfil de intereses similar suele encontrar engagement. No son
--   prescripcion de carrera, ni asignacion, ni resultado individual. El selector
--   (lib/report/occupation-selector.ts) filtra por las 3 letras top del usuario.
--
-- occupation_set_version = '1.0' (referenciado en report_snapshot). Un swap futuro es cambio
--   de datos, no de codigo.
--
-- Idempotente: ON CONFLICT (code_onet) DO NOTHING -- usa occupation_code_onet_idx. Re-ejecutable.
-- Aplicable via: psql -f db/seeds/occupations/LATAM/seed.sql  (y supabase db reset local).

BEGIN;

INSERT INTO public.occupation (code_onet, name_es_co, riasec_code, education_level)
VALUES
  -- ===== R - Realistic (16): oficios tecnicos, mecanica, construccion, agro, ingenierias aplicadas =====
  ('47-2031.00', 'Carpintero/a', 'RC', '2'),
  ('51-4121.00', 'Soldador/a', 'RC', '2'),
  ('53-3032.00', 'Conductor/a de camión', 'RC', '2'),
  ('49-3023.00', 'Mecánico/a automotriz', 'RCI', '3'),
  ('47-2111.00', 'Electricista', 'RC', '3'),
  ('47-2152.00', 'Plomero/a', 'RC', '3'),
  ('49-3011.00', 'Mecánico/a de aviación', 'RCI', '3'),
  ('49-9041.00', 'Mecánico/a industrial', 'RCI', '3'),
  ('49-9021.00', 'Técnico/a en refrigeración y aire acondicionado', 'RC', '3'),
  ('33-2011.00', 'Bombero/a', 'R', '3'),
  ('17-3031.00', 'Técnico/a en topografía', 'RCI', '3'),
  ('17-2051.00', 'Ingeniero/a civil', 'RIC', '4'),
  ('17-2141.00', 'Ingeniero/a mecánico/a', 'RIC', '4'),
  ('17-2071.00', 'Ingeniero/a electricista', 'RIC', '4'),
  ('37-3011.00', 'Jardinero/a', 'RC', '1'),
  ('45-2092.00', 'Trabajador/a agrícola', 'RC', '1'),

  -- ===== I - Investigative (16): ciencias, salud profesional, analisis, investigacion =====
  ('29-1051.00', 'Químico/a farmacéutico/a', 'ISC', '5'),
  ('29-1131.00', 'Médico/a veterinario/a', 'IR', '5'),
  ('29-1021.00', 'Odontólogo/a', 'IRS', '5'),
  ('19-2012.00', 'Físico/a', 'IRC', '5'),
  ('19-1021.00', 'Bioquímico/a', 'IR', '5'),
  ('19-3011.00', 'Economista', 'ICE', '5'),
  ('15-2041.00', 'Estadístico/a', 'IC', '5'),
  ('15-2021.00', 'Matemático/a', 'IC', '5'),
  ('15-1221.00', 'Investigador/a en ciencias de la computación', 'IC', '5'),
  ('19-2031.00', 'Químico/a', 'IRC', '4'),
  ('19-1022.00', 'Microbiólogo/a', 'IRC', '4'),
  ('15-2051.00', 'Científico/a de datos', 'IC', '4'),
  ('17-2081.00', 'Ingeniero/a ambiental', 'IRC', '4'),
  ('19-1031.00', 'Profesional en conservación de recursos naturales', 'IRC', '4'),
  ('19-4092.00', 'Técnico/a en ciencias forenses', 'IRC', '3'),
  ('19-4031.00', 'Técnico/a químico/a', 'IRC', '3'),

  -- ===== A - Artistic (16): artes, diseno, comunicacion, contenidos =====
  ('27-1027.00', 'Diseñador/a de escenografía', 'A', '5'),
  ('27-1011.00', 'Director/a de arte', 'AE', '4'),
  ('27-3011.00', 'Locutor/a', 'AES', '4'),
  ('27-1021.00', 'Diseñador/a industrial', 'ARI', '4'),
  ('27-3041.00', 'Editor/a de textos', 'ACE', '4'),
  ('27-1024.00', 'Diseñador/a gráfico/a', 'AC', '4'),
  ('27-1025.00', 'Diseñador/a de interiores', 'AR', '4'),
  ('27-2042.00', 'Músico/a o cantante', 'AE', '4'),
  ('27-3023.00', 'Periodista', 'AIE', '4'),
  ('27-3043.00', 'Escritor/a', 'AE', '4'),
  ('27-1012.00', 'Artesano/a', 'AR', '3'),
  ('27-1013.00', 'Artista plástico/a', 'AR', '3'),
  ('27-2031.00', 'Bailarín/Bailarina', 'ARS', '3'),
  ('27-1022.00', 'Diseñador/a de modas', 'ARE', '3'),
  ('27-4031.00', 'Camarógrafo/a', 'ARC', '3'),
  ('27-2011.00', 'Actor/Actriz', 'ASE', '2'),

  -- ===== S - Social (16): educacion, salud asistencial, orientacion, servicio a personas =====
  ('21-1012.00', 'Orientador/a educativo/a y vocacional', 'SCE', '5'),
  ('19-3033.00', 'Psicólogo/a', 'SI', '5'),
  ('29-1123.00', 'Fisioterapeuta', 'SIR', '5'),
  ('29-1127.00', 'Fonoaudiólogo/a', 'SIC', '5'),
  ('25-2021.00', 'Docente de primaria', 'S', '4'),
  ('25-2031.00', 'Docente de secundaria', 'S', '4'),
  ('25-2012.00', 'Docente de preescolar', 'SA', '4'),
  ('25-2056.00', 'Docente de educación especial', 'SI', '4'),
  ('21-1021.00', 'Trabajador/a social', 'S', '4'),
  ('29-1141.00', 'Profesional en enfermería', 'SCI', '4'),
  ('27-2022.00', 'Entrenador/a deportivo/a', 'SER', '4'),
  ('21-1091.00', 'Educador/a en salud', 'SIC', '4'),
  ('21-1094.00', 'Promotor/a de salud comunitaria', 'S', '4'),
  ('29-1292.00', 'Higienista oral', 'SRI', '3'),
  ('31-1131.00', 'Auxiliar de enfermería', 'SRC', '3'),
  ('39-9011.00', 'Auxiliar de cuidado infantil', 'SA', '2'),

  -- ===== E - Enterprising (16): direccion, comercial, negocios, gestion =====
  ('11-1011.00', 'Director/a general', 'EC', '5'),
  ('23-1011.00', 'Abogado/a', 'ECI', '5'),
  ('11-1021.00', 'Gerente de operaciones', 'EC', '4'),
  ('11-2021.00', 'Gerente de mercadeo', 'EC', '4'),
  ('11-3121.00', 'Gerente de talento humano', 'ECS', '4'),
  ('11-3031.00', 'Gerente financiero/a', 'EC', '4'),
  ('11-9111.00', 'Administrador/a de servicios de salud', 'ECS', '4'),
  ('11-9013.00', 'Productor/a agropecuario/a', 'ERC', '4'),
  ('11-9081.00', 'Administrador/a de hotel', 'ECS', '4'),
  ('13-1161.00', 'Analista de investigación de mercados', 'ECI', '4'),
  ('27-3031.00', 'Especialista en relaciones públicas', 'EAS', '4'),
  ('13-2052.00', 'Asesor/a financiero/a', 'ECS', '4'),
  ('41-9031.00', 'Ingeniero/a comercial', 'EC', '4'),
  ('41-3021.00', 'Agente de seguros', 'ECS', '4'),
  ('41-2031.00', 'Vendedor/a de comercio', 'EC', '2'),
  ('41-1011.00', 'Supervisor/a de ventas', 'ECS', '2'),

  -- ===== C - Conventional (16): finanzas, contabilidad, datos, administracion, cumplimiento =====
  ('13-2011.00', 'Contador/a auditor/a', 'CEI', '4'),
  ('15-2011.00', 'Actuario/a', 'CIE', '4'),
  ('13-2031.00', 'Analista de presupuesto', 'CEI', '4'),
  ('13-1041.00', 'Analista de cumplimiento normativo', 'CE', '4'),
  ('13-1051.00', 'Estimador/a de costos', 'CE', '4'),
  ('13-2041.00', 'Analista de crédito', 'CEI', '4'),
  ('15-1242.00', 'Administrador/a de bases de datos', 'CI', '4'),
  ('13-2051.00', 'Analista financiero/a y de inversiones', 'CEI', '4'),
  ('17-2112.00', 'Ingeniero/a industrial', 'CIR', '4'),
  ('13-1081.00', 'Analista de logística', 'CEI', '4'),
  ('43-3031.00', 'Auxiliar contable', 'CE', '3'),
  ('29-2052.00', 'Auxiliar de farmacia', 'CR', '3'),
  ('29-2072.00', 'Técnico/a en información en salud', 'CI', '3'),
  ('23-2011.00', 'Asistente jurídico/a', 'CIE', '3'),
  ('43-4051.00', 'Representante de servicio al cliente', 'CES', '2'),
  ('43-4171.00', 'Recepcionista', 'CES', '2')
ON CONFLICT (code_onet) DO NOTHING;

COMMIT;
