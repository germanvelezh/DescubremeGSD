# Implementation Pack — Extensión del dataset ocupacional es-CO (Zonas 3-5) v1.1 (VERIFICADO)

**Producto:** DescubreMe (MVP).
**Autor:** Cowork (Investigador). **Owner:** German Velez Hurtado.
**Fecha:** 2026-06-25.
**Tipo:** Extensión del catálogo de ocupaciones, **verificada contra O*NET OnLine**. Complementa `db/seeds/occupations/LATAM/seed.sql` (96 filas v1.0).
**Seed listo para cargar:** `db/seeds/occupations/LATAM/seed_ext_v1.1.sql` (29 filas, idempotente).

---

## ESTADO: VERIFICADO (2026-06-25)

`Hecho:` cada `riasec_code` (high-point) y `job_zone` de este pack fue confirmado 1:1 contra la página O*NET de cada ocupación (`https://www.onetonline.org/link/summary/<SOC>`), extracción verbatim el 2026-06-25, mismo método que el seed v1.0. Ya no son candidatos: son production-ready (pasan Gate 1 de trazabilidad).

`La verificación corrigió >20 códigos provisionales.` Ejemplos: Software Developers ICR->IC; UX/UI AIR->IAC; Information Security CI; Gerente TI ECI->CEI; Consultor de gestión ECI->CIE; Intérprete/traductor -> CAS; Terapeuta ocupacional -> SI. Esto confirma por qué no debían cargarse sin verificar.

`Excluida:` `29-1248.00` (Surgeons, All Other) — la página O*NET no retornó datos de interés/zona (entrada dispersa). Si se requiere "cirujano/a", mapear a una especialidad quirúrgica concreta y verificarla aparte.

`Sin colisión:` ninguno de los 29 SOC colisiona con las 96 filas v1.0 (verificado). Carga con `ON CONFLICT (code_onet) DO NOTHING`.

---

## 1. Datos verificados (29 ocupaciones)

`Convención:` `code_onet` (SOC), `name_es_co` (es-CO, listo), `riasec_code` (high-point O*NET verbatim), `job_zone` (esquema feb-2026; esta extensión solo trae 3/4/5).

### Tecnología y datos

| code_onet | name_es_co | riasec_code | job_zone |
|---|---|---|---|
| 15-1252.00 | Desarrollador/a de software | IC | 4 |
| 15-1211.00 | Analista de sistemas de información | IC | 4 |
| 15-1212.00 | Analista de seguridad informática | CI | 4 |
| 15-1255.00 | Diseñador/a de experiencia e interfaz (UX/UI) | IAC | 4 |
| 15-1232.00 | Especialista de soporte técnico (mesa de ayuda) | CRI | 3 |
| 15-2031.00 | Analista de investigación de operaciones | IC | 5 |
| 11-3021.00 | Gerente de tecnología y sistemas de información | CEI | 4 |

### Negocios, gestión y personas

| code_onet | name_es_co | riasec_code | job_zone |
|---|---|---|---|
| 13-1111.00 | Consultor/a de gestión | CIE | 4 |
| 13-1082.00 | Especialista en gestión de proyectos | EC | 4 |
| 13-1071.00 | Especialista de talento humano | ECS | 4 |
| 11-2011.00 | Gerente de publicidad y promociones | ECA | 4 |
| 11-3012.00 | Gerente de servicios administrativos | ECS | 3 |

### Salud especializada

| code_onet | name_es_co | riasec_code | job_zone |
|---|---|---|---|
| 29-1215.00 | Médico/a de familia | SI | 5 |
| 29-1071.00 | Profesional clínico/a asociado/a (physician assistant) | SIC | 5 |
| 29-1031.00 | Nutricionista y dietista | SI | 5 |
| 29-1122.00 | Terapeuta ocupacional | SI | 5 |
| 29-1126.00 | Terapeuta respiratorio/a | RSI | 3 |
| 21-1014.00 | Consejero/a en salud mental | SI | 5 |

### Ciencia, academia y social

| code_onet | name_es_co | riasec_code | job_zone |
|---|---|---|---|
| 25-9031.00 | Diseñador/a instruccional (coordinador/a académico/a) | SEI | 5 |
| 19-3032.00 | Psicólogo/a organizacional | IEC | 5 |
| 19-3051.00 | Planificador/a urbano y regional | IEC | 5 |
| 19-1042.00 | Científico/a médico/a (investigación) | IR | 5 |
| 19-3094.00 | Politólogo/a | IA | 5 |

### Creatividad, comunicación e ingeniería

| code_onet | name_es_co | riasec_code | job_zone |
|---|---|---|---|
| 27-1014.00 | Artista de efectos visuales y animación | AR | 4 |
| 27-2012.00 | Productor/a y director/a audiovisual | AE | 4 |
| 27-3091.00 | Intérprete y traductor/a | CAS | 4 |
| 17-2061.00 | Ingeniero/a de hardware de cómputo | RIC | 4 |
| 17-2011.00 | Ingeniero/a aeroespacial | IRC | 4 |
| 17-2041.00 | Ingeniero/a químico/a | RIC | 4 |

---

## 2. Carga

`Para Claude Code:` el seed ya está escrito y verificado en `db/seeds/occupations/LATAM/seed_ext_v1.1.sql`. Cárgalo después de `seed.sql` v1.0. Es idempotente (`ON CONFLICT (code_onet) DO NOTHING`). Sube el `occupation_set_version` objetivo a `'1.1'` donde se referencie en `report_snapshot`.

`Distribución por zona (de esta extensión):` Zona 3 = 3 ocupaciones; Zona 4 = 14; Zona 5 = 12. Refuerza Zonas 4-5 (audiencia profesional), que era el gap del catálogo v1.0.

---

## 3. Fuente y método

- National Center for O*NET Development. (2026). *O*NET OnLine — resúmenes por ocupación* (campos Interests high-point y Job Zone). https://www.onetonline.org/ (extracción verbatim por SOC, 2026-06-25).
- Método idéntico al seed v1.0: high-point RIASEC verbatim + Job Zone por ocupación. Donde O*NET publica 1 o 2 letras, se conserva tal cual; no se rellena una tercera letra.

`Nota de mantenimiento:` O*NET actualiza datos periódicamente. Re-verificar al refrescar el catálogo (próximo `occupation_set_version`).

---

*Fin del pack de extensión ocupacional es-CO v1.1 (verificado). Datos Cowork; carga por Claude Code.*
