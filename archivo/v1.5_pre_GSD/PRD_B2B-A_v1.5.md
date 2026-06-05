# PRD — B2B-A v1.5

**Producto:** DescubreMe — Tier B2B-A (empresarial con dashboard agregado anonimo).
**Version del PRD:** 1.0
**Fecha:** 2026-05-13
**Owner:** German Velez Hurtado.
**Estado:** Borrador para revision del owner.
**Audiencia primaria:** Claude Code (implementacion multi-tenant) + German (owner) + Cowork (UX writer + contratos comerciales) + asesor legal (DPA).
**Documento padre:** `02_producto/PRD_MAESTRO.md` (v1.0).

**Documentos relacionados:**

- PRD_B2C_Paid_v1.5.md (B2B-A hereda todo el stack Paid).
- Anexos del PRD: A1 Glosario, A2 NFRs, A3 Mapa de instrumentos §2.4, A4 Etica y Compliance, A5 Riesgos.
- Arquitectura: `00_arquitectura/_ARQUITECTURA_TESTS_REUTILIZABLES.md` §1.3 (multi-producto), §3.3 (renderers), §5.3 (flujo B2B), §8.3 (consent_log multi-producto).
- Stack: `00_arquitectura/_STACK_POR_PRODUCTO.md` seccion B2B-A.

---

## 1. Resumen ejecutivo

B2B-A es el tier empresarial de DescubreMe. La empresa cliente contrata anualmente a USD 8-15 por empleado/mes (rango orientativo) con minimo 50 empleados, pago up-front. Cada empleado recibe el perfil Paid completo (18 instrumentos) + 5 modulos de trabajo adicionales (WDQ-40, UWES, BPNSFS, WOLF, SWLS). El empleador recibe un dashboard agregado anonimo con medias por equipo (n≥5), distribuciones, tendencias trimestrales, alertas e ideas de exploracion sobre 3 areas de riesgo organizacional (burnout, engagement, desconexion). **Cero data individual identificable jamas al empleador**, bajo guardrails tecnicos y contractuales (DPA). Estrategia de venta sales-led con discovery call. Bloqueadores criticos: licencias WDQ-40 (M3, 4 titulares) y UWES (Triple i), tests de RLS multi-tenant en CI, contratos B2B revisados por asesor legal.

---

## 2. Problema y oportunidad B2B-A LATAM

### 2.1 Problema del cliente empresa

Empresas medianas LATAM (50-500 empleados) con area de gente/cultura activa enfrentan:

| Camino actual | Falla |
|---|---|
| Encuestas de clima anuales (Great Place to Work, Cornerstone) | Caras (USD 5-15K por aplicacion), agregadas a nivel toda la empresa, sin granularidad por equipo, sin instrumentos psicometricos validados |
| Consultoras (Mercer, Korn Ferry, BCG) | Tickets de USD 50-200K, no escalable, una vez al ano |
| Plataformas globales (Culture Amp, Lattice, 15Five) | Pricing inviable LATAM, ingles, sin instrumentos psicometricos profundos |
| Encuestas internas en SurveyMonkey | Cero rigor psicometrico, items inventados, riesgo de sesgo |

B2B-A responde: USD 8-15 por empleado/mes con 23 instrumentos validados, dashboard agregado anonimo, granular por equipo, tendencia trimestral, guardrails eticos para no usar en decisiones individuales. Es el unico tier comparable a USD 100-500/seat de Culture Amp pero adaptado a LATAM.

### 2.2 Por que importa para el modelo de negocio

B2B-A es **el unico tier con revenue B2B** y el de mayor ticket por contrato. Una empresa de 100 empleados @ USD 10/seat/mes = USD 12K/ano. Con 3-8 clientes ancla en v1.5, revenue anual B2B-A pone a DescubreMe en USD 36K-100K solo del B2B. Hacer crecer esto a Q4 2027 con un par de docenas de clientes es el camino a self-sustainability.

### 2.3 Por que ahora

PRD_MAESTRO objetivo Q4 2026 (Sprints 7-8). Requiere que Paid este maduro (Sprints 4-6) + licencias WDQ-40 y UWES negociadas + RLS multi-tenant testeado.

---

## 3. Stakeholders, usuarios y JTBD

B2B-A tiene **tres tipos de usuarios distintos** que deben modelarse en producto:

### 3.1 Comprador / Sponsor (Buyer)

- VP de Gente, Director de Cultura, COO o CEO de empresa mediana LATAM.
- Compra el producto. Firma el contrato. Toma la decision economica.
- **No usa el producto a diario.** Revisa resultados trimestralmente o cuando hay un disparador (rotacion alta, encuesta de clima negativa, fusion).
- Sensibilidad a precio: media-alta. USD 8-15/seat/mes es competitivo pero no trivial.
- Sensibilidad a privacidad: media-alta. Necesita garantia de que el producto NO se usa para decisiones individuales (esto puede generar conflicto interno si HR lo pidiera).

### 3.2 Administrador del cliente (Admin)

- Gerente o director de Gente, People Ops, HR Business Partner.
- Configura la cuenta del cliente: carga empleados, define equipos, asigna admin secundario, revisa adopcion.
- **Es usuario semanal.** Especialmente durante onboarding inicial y al cierre de cada trimestre.
- Recibe el dashboard agregado.
- Necesita: rapidez de onboarding, claridad del dashboard, exportes para presentar a comite, soporte rapido.

### 3.3 Empleado (End user)

- Cualquier rol en la empresa cliente.
- Recibe invitacion via email del Admin. Toma los 23 instrumentos en 120-160 min distribuidos.
- **Su confianza en la privacidad es el factor critico de adopcion.** Si percibe riesgo de que la empresa vea sus datos individuales, no participa o responde para "quedar bien" (aquiescencia).
- Tambien recibe su perfil Paid individual completo (acceso al reporte que ve un usuario Paid normal).

### 3.4 JTBD por stakeholder

| Stakeholder | JTBD principal |
|---|---|
| Comprador | "Cuando lidero una organizacion con problemas de cultura, retencion o engagement, quiero un diagnostico riguroso a nivel agregado y por equipo, para tomar decisiones de inversion en cultura con datos reales y no anecdota." |
| Admin | "Cuando coordino el lanzamiento del producto a mi empresa, quiero un onboarding rapido para mis empleados y un dashboard claro y trimestral, para reportar a comite sin trabajo manual." |
| Empleado | "Cuando mi empresa me invita a un proceso de autoconocimiento, quiero certeza absoluta de que mis datos individuales no afectan mi evaluacion de desempeno, para participar honestamente y aprovechar el beneficio personal." |

### 3.5 Anti-personas (NO son target B2B-A)

- Microempresas (<20 empleados): no llegan al minimo de 50 + dashboard requiere n≥5 por equipo.
- Corporativos grandes (>500 empleados): requieren SAML completo, SLA enterprise, customizacion (post-v1.5).
- Empresas con cultura punitiva o "manda y obedece": riesgo etico, el producto no se va a usar con respeto al empleado.
- Reclutadoras / staffing agencies: el producto no es para perfilar candidatos.

---

## 4. Alcance funcional v1.5

### 4.1 Que entra v1.5

- **Stack instrumentos:** 23 totales = los 4 de Free + los 14 nuevos de Paid + 5 modulos de trabajo (WDQ-40, UWES, BPNSFS extendido, WOLF, SWLS).
- **Tres tipos de cuenta:** Sponsor (Comprador), Admin, Empleado. Roles separados con permisos distintos.
- **Workspace multi-tenant** por organizacion (`organization_id`) con RLS de Supabase (DD-05).
- **Onboarding empleado:** invitacion magic link via email + Google SSO basico opcional (DD-32).
- **Equipos / departamentos:** Admin define equipos. Cada empleado asignado a uno (o varios). Minimo 5 empleados por equipo para aparecer en dashboard agregado.
- **Reporte individual del empleado:** mismo que Paid normal (18 instrumentos) + reporte de los 5 modulos de trabajo. Acceso solo del empleado.
- **Dashboard agregado del Admin:** medias por equipo, distribucion, tendencias trimestrales (a partir del Q2 desde lanzamiento), alertas configurables, ideas de exploracion (DD-33).
- **Sales-led:** landing B2B con formulario, discovery call, propuesta personalizada, firma de contrato + DPA, onboarding asistido.
- **Pricing:** USD 8-15 por empleado/mes en contrato anual obligatorio, minimo 50 empleados, pago up-front (DD-30).
- **Opt-out individual:** empleado puede negarse a participar sin consecuencia. Su data nunca entra al agregado.
- **Re-toma trimestral o anual:** empleado puede re-tomar instrumentos para tendencia personal y aporte a tendencia agregada (despues de 90 dias por test-retest).
- **Idioma:** es-CO default, es-MX y en disponibles.
- **Cross-sell Ikigai Premium** al empleado individual (cuando este disponible Q1 2027).

### 4.2 Que NO entra v1.5 (out-of-scope explicito)

- **Vistas individuales al Admin / Sponsor.** Nunca. El sistema lo niega tecnicamente.
- **Comparativos entre empresas** ("Tu empresa vs media de tu industria"). Requiere benchmark cross-cliente que no existe en v1.5.
- **Decisiones de seleccion, promocion, despido.** Bloqueado tecnicamente + clausula en contrato.
- **API publica para el cliente.** Diferido a v2.
- **Integraciones HRIS** (Workday, BambooHR, Sapling, Rippling): diferidas.
- **SAML / OIDC completo** (Okta, Azure AD, OneLogin): diferido (Google SSO basico es la unica opcion v1.5).
- **Dashboard real-time.** Las metricas se actualizan al cierre de cada periodo (mensual o trimestral, definir en §9.5).
- **Coaching o intervencion** sugerida directamente al empleado por la plataforma (cero recomendacion proactiva no solicitada).
- **Encuestas custom** del cliente (eso convertiria el producto en SurveyMonkey). v1.5 solo administra los 23 instrumentos del stack.
- **Multi-idioma dentro de la misma organizacion** (todos los empleados de un cliente en el mismo idioma; multilingue diferido).
- **Pricing por modulo** ("solo quiero engagement"). v1.5 es bundle completo unico.
- **Soporte 24/7.** v1.5 soporte horario laboral America LATAM (9-18 COT).

### 4.3 Out-of-scope heredado del maestro

Todas las exclusiones del PRD_MAESTRO §8. Reforzar especialmente: nada clinico, nada de seleccion, nada deterministico, sin instrumentos fuera del stack v1.5.

---

## 5. Modelo comercial y contractual

### 5.1 Pricing v1.5 (orientativo, requiere pricing research B2B LATAM)

| Variable | Rango orientativo |
|---|---|
| Precio por empleado / mes | USD 8-15 (depende de tamano y compromiso) |
| Minimo empleados | 50 |
| Maximo empleados v1.5 | 500 (corporativos grandes diferidos) |
| Compromiso | 12 meses anuales obligatorios |
| Modalidad pago | Up-front (un solo pago anual). Opcional pago trimestral con sobrecargo 5-10% si el cliente lo solicita. |
| Moneda | USD por defecto. COP / MXN segun cliente. |
| Descuentos | Por volumen (101-300 empleados: -10%, 301-500: -15%), por compromiso multi-anual (2 anos: -8%, 3 anos: -15%). |

**Ejemplo de calculo:**

- Cliente con 150 empleados @ USD 10/seat/mes con descuento de volumen -10% = USD 9/seat/mes x 150 = USD 1,350/mes x 12 = USD 16,200/ano.
- Pago up-front: USD 16,200 en factura del mes 0.
- Pago trimestral: USD 4,455/quarter (con sobrecargo 10% sobre USD 4,050 base).

### 5.2 Estrategia de venta (DD-31)

| Etapa | Que pasa | Owner | Duracion tipica |
|---|---|---|---|
| 1. Landing B2B | Cliente llena formulario (empresa, #empleados, contacto) | Marketing automatizado | 5 min |
| 2. Discovery call | German hace videocall 30 min con Comprador/Admin | German | 30 min |
| 3. Propuesta | Documento PDF con scope, pricing personalizado, timeline, ejemplos de dashboard | German + Cowork | 1-3 dias |
| 4. Q&A + ajuste | Iteracion con el cliente sobre propuesta | German | 1-2 semanas |
| 5. Contrato + DPA | Firma de contrato comercial + DPA (asesor legal valida) | German + asesor legal | 1-3 semanas |
| 6. Pago | Factura up-front, pago via transferencia o tarjeta | German + procesador | 1 semana |
| 7. Onboarding asistido | German + Admin del cliente cargan equipos y empleados | German + Admin | 1-2 semanas |
| 8. Lanzamiento empleados | Magic links salen al equipo del cliente | Admin | 1 dia |
| 9. Take-up periodo | Empleados completan los 23 instrumentos en 30-60 dias | Empleados | 30-60 dias |
| 10. Primer dashboard review | German + Admin sesion 60 min revisando hallazgos | German + Admin | 60 min |

**Tiempo total desde lead a primer dashboard review: 8-14 semanas.**

### 5.3 Refund y cancelacion B2B

| Caso | Politica |
|---|---|
| Refund pre-onboarding | Si el cliente no ha lanzado a empleados, refund 100% en 30 dias post-pago. |
| Refund post-onboarding | Sin refund automatico. Casos excepcionales (mala calidad del producto, fallo en SLA) se evaluan caso a caso con asesor legal. |
| Cancelacion anticipada | No permitida en compromiso anual. Si el cliente decide no renovar al ano, sin penalizacion (no se renueva automaticamente). |
| Pausa por reorganizacion | Si el cliente solicita pausa por reorganizacion (fusion, layoffs), evaluar extension del contrato por 3-6 meses sin costo adicional. |

### 5.4 Renovacion

- 90 dias antes del fin del contrato anual, German contacta al Admin para discutir renovacion.
- Datos del usuario (empleados activos) persisten durante todo el contrato. Si no se renueva, **periodo de 60 dias de gracia** para que cada empleado decida si quiere preservar su perfil individual (transferencia a Paid B2C personal sin costo) o eliminar todo.
- Renovacion sin cambios = formulario corto + pago. Renovacion con cambios (mas empleados, otro modulo, etc.) = nueva discovery call.

### 5.5 Modelo de propuesta comercial template

Documento estandar que Cowork prepara como template para que German lo personalice por cliente. Estructura: cliente + problema actual + propuesta DescubreMe + alcance + ejemplo de dashboard + cronograma + precio + supuestos + exclusiones + clausulas eticas. Vive en `02_producto/templates/B2B_Proposal_v1.0.md` (a crear).

---

## 6. Modelo de tenancy y aislamiento de datos

### 6.1 Arquitectura share-tenant con RLS (DD-05)

Una sola instancia de Supabase. Cada organizacion B2B es un `organization_id` en las tablas. Politicas RLS aseguran que:

- Un empleado solo ve sus propias respuestas y su propio reporte.
- Un Admin solo ve agregados de su propia organizacion (medias por equipo, n≥5).
- Un Admin nunca ve respuestas individuales identificables, ni siquiera de su propia organizacion.
- Un empleado de organizacion A nunca ve nada de organizacion B.
- Empleados que toman B2C Free / Paid directamente (sin organizacion) tienen `organization_id = null`.

### 6.2 Tablas que requieren `organization_id`

| Tabla | Por que requiere organization_id |
|---|---|
| `user` | Para asociar empleado a organizacion |
| `team` (nueva) | Equipos / departamentos de la organizacion |
| `user_team` (nueva, asociacion) | Empleado puede estar en uno o varios equipos |
| `assessment_session` | Para filtrar sesiones por organizacion |
| `item_response` | Para que RLS bloquee cross-org |
| `computed_score` | Idem |
| `profile_report` | Idem |
| `consent_log` | Empleado consent es por organizacion (caso B2B) |
| `organization` (nueva) | Tabla maestra con nombre, razon social, contacto, contrato, plan, fechas |
| `organization_admin` (nueva) | Admins de la organizacion (con `role` enum: sponsor / primary_admin / secondary_admin) |
| `usage_log` | Para reportar a titular de licencia con metadata de organizacion |
| `audit_log` | Para auditar accesos |
| `dashboard_alert` (nueva) | Alertas configuradas por organizacion |

### 6.3 Politicas RLS criticas (specs para Claude Code)

```sql
-- Empleado solo ve sus propias respuestas
CREATE POLICY "users_own_responses"
ON item_response
FOR SELECT
USING (auth.uid() = (SELECT user_id FROM assessment_session WHERE id = item_response.assessment_session_id));

-- Admin solo ve agregados de su organizacion (via view, no acceso directo a tablas)
CREATE POLICY "admin_aggregates_same_org"
ON computed_score_aggregated_view
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM organization_admin WHERE user_id = auth.uid()
  )
);

-- Admin nunca ve respuestas individuales (politica bloquea explicitamente)
CREATE POLICY "admin_cannot_see_individual_responses"
ON item_response
FOR SELECT
USING (false); -- Admin no tiene path para leer item_response, ni siquiera de su propia org

-- N>=5 enforcement a nivel de view (no aplicacion)
CREATE VIEW computed_score_aggregated_view AS
SELECT
  team_id,
  facet_id,
  AVG(raw_score) as mean,
  STDDEV(raw_score) as sd,
  COUNT(*) as n
FROM computed_score cs
JOIN user_team ut ON cs.user_id = ut.user_id
GROUP BY team_id, facet_id
HAVING COUNT(*) >= 5; -- n>=5 enforced en la view
```

### 6.4 Tests automatizados de RLS en CI (NFR critico)

Claude Code debe implementar (Sprint 7-8):

- Test que verifica que Admin de organizacion A no puede leer item_response de organizacion B.
- Test que verifica que Admin no puede leer item_response individual ni de su propia organizacion.
- Test que verifica que la view agregada bloquea n<5 (no muestra equipos chicos).
- Test que verifica que un empleado nunca lee data de otro empleado.
- Test que verifica que cross-org queries devuelven empty set.

Estos tests **bloquean PR merge** si fallan. Politica no negociable.

### 6.5 Penetration test pre-lanzamiento B2B

Antes del lanzamiento del primer cliente ancla:

- Penetration test con foco en RLS y multi-tenant boundary.
- Owner: contratacion de terceros (presupuesto USD 2K-5K).
- Sprint objetivo: Sprint 7-8.

---

## 7. Flujo del cliente empresa

### 7.1 Acceso del Comprador

- Comprador recibe link a landing B2B post-discovery call.
- Comprador firma contrato digitalmente (decision OQ-1: que tool de e-signature).
- Post-pago, Comprador recibe credenciales de Admin primario (si se designa diferente al Comprador) o magic link directo al Admin Panel.

### 7.2 Flujo del Admin: setup inicial

```
[Login Admin Panel]
     v
[Setup: nombre organizacion + logo + dominios permitidos (ej. @acme.com)]
     v
[Definir equipos: nombre, manager, descripcion]
     v
[Anadir empleados: por CSV o uno a uno]
     v
[Para cada empleado: email + nombre + equipo + rol (employee)]
     v
[Sistema valida n>=5 por equipo, marca equipos chicos como "no apareceran en dashboard"]
     v
[Configurar comunicacion inicial al empleado (template personalizable)]
     v
[Boton "Enviar invitaciones"]
     v
[Sistema envia magic links a todos los empleados]
     v
[Tracking de adopcion: % empleados que aceptaron + % que iniciaron + % completados]
```

### 7.3 Admin Panel — funcionalidades v1.5

- **Setup**: nombre, logo, dominios permitidos para SSO.
- **Equipos**: crear, editar, eliminar. Asignar manager (no es rol con permisos especiales, solo metadata).
- **Empleados**: anadir, editar email/equipo, dar de baja (sin eliminar data por defecto, opcion de eliminar bajo solicitud).
- **Comunicacion**: template de invitacion editable + emails recordatorio.
- **Adopcion**: dashboard con % empleados completados, dropoff por instrumento, tiempo promedio.
- **Dashboard agregado**: medias, distribuciones, tendencias, alertas, ideas de exploracion (§9).
- **Configurar alertas**: umbrales por equipo en areas de riesgo (con guardrails eticos).
- **Exportes**: PDF del dashboard, CSV de datos agregados (no individuales).
- **Soporte**: link a soporte DescubreMe.

### 7.4 Roles del Admin

| Rol | Permisos |
|---|---|
| `sponsor` | Comprador. Acceso completo al Admin Panel. Firma contrato. |
| `primary_admin` | Designado por Sponsor. Gestiona empleados, equipos, dashboard. No firma contrato. |
| `secondary_admin` | Lectura del dashboard agregado. No edita empleados ni equipos. Util para managers de gente que reportan al primary_admin. |

Sponsor y Primary Admin son obligatorios (al menos uno). Secondary Admins son opcionales y limitados a 5 por organizacion en v1.5.

### 7.5 Manejo de cambios organizacionales

| Evento | Comportamiento |
|---|---|
| Empleado deja la empresa | Admin marca como "alumni". Sus respuestas pasadas siguen contando en tendencia historica de su equipo. No recibe mas instrumentos. Despues de 60 dias, opcion de eliminar o transferir su perfil a Paid B2C personal sin costo. |
| Empleado cambia de equipo | Admin reasigna. Sus respuestas historicas siguen anidadas al equipo donde estaba al tomar el instrumento (no se reasignan retroactivamente). |
| Reorganizacion (fusion de equipos) | Admin crea nuevo equipo, mueve empleados. Historial preservado por equipo original. |
| Layoff masivo | Casos sensibles. Admin contacta a German para gestion personalizada. |

---

## 8. Flujo del empleado

### 8.1 Onboarding del empleado

```
[Empleado recibe email del Admin de su empresa con magic link]
     v
[Empleado clic en magic link]
     v
[Pantalla 1 — Onboarding B2B: que es esto, quien lo contrato, cuanto dura, lo que NO es]
     v
[Pantalla 2 — Disclaimer privacidad CRITICO: tu empresa NO ve tus respuestas individuales. NO se usa para decisiones de RH.]
     v
[Pantalla 3 — Consentimiento individual: doble checkbox (acepto producto / acepto que mis agregados anonimos sean parte del dashboard de mi empresa)]
     v
[Opcion: opt-out total — "Prefiero no participar"]
     v
Si acepta:
[Flujo de 23 instrumentos distribuido en sesiones tipo Paid (orden similar) + 5 modulos de trabajo al final]
     v
[Quality validator]
     v
[Reporte individual completo (mismo que Paid)]
     v
[Email "tu reporte esta listo"]
```

### 8.2 Disclaimer de privacidad (critico)

Texto canonico que Cowork UX Writer redacta con asesor legal:

> "Esta evaluacion fue contratada por [NOMBRE EMPRESA] como beneficio para empleados.
>
> - **Tu identidad NO se reporta junto con tus respuestas.** [NOMBRE EMPRESA] nunca ve tus respuestas individuales.
> - **Tu empresa recibe medias por equipo de minimo 5 personas.** Si tu equipo tiene menos de 5 personas, las metricas de tu equipo no aparecen en el dashboard.
> - **Tus datos no se usan para decisiones de contratacion, promocion, evaluacion de desempeno o despido.** El contrato con tu empresa lo prohibe explicitamente.
> - **Puedes negarte a participar.** Sin consecuencia. Tu empresa no sabe si participaste o no.
> - **Puedes eliminar tus datos en cualquier momento** desde tu perfil."

### 8.3 Consentimiento granular B2B

| Checkbox | Por que separado |
|---|---|
| Acepto el consentimiento producto DescubreMe (obligatorio) | Sin esto no se puede usar el producto |
| Acepto que mis datos formen parte del dashboard agregado anonimo de mi empresa (obligatorio para B2B) | Sin esto el empleado solo recibe su perfil personal (Paid), no aporta al dashboard |
| Acepto recibir comunicaciones de marketing de DescubreMe (opcional) | Marketing post-contrato (B2C upgrade Ikigai, contenido educativo) |

Si el empleado solo acepta el primer checkbox: recibe Paid completo individual pero NO entra al dashboard. Funcionalmente es opt-out del agregado.

### 8.4 Opt-out total

El empleado puede negarse a participar sin tomar ningun instrumento.

- Su decision NO se reporta al Admin/Sponsor.
- En el Admin Panel, el empleado aparece como "no completado" (mismo que alguien que no ha empezado). Admin no puede distinguir.
- Despues de 30 dias sin actividad, sistema marca como "inactivo" en una vista global de adopcion (sin nombre individual visible, solo conteos).

### 8.5 Reporte individual del empleado

- Identico al reporte Paid B2C (PRD_B2C_Paid_v1.5 §9).
- Adicional para B2B: una seccion extra con los 5 modulos de trabajo (WDQ-40, UWES, BPNSFS extendido, WOLF, SWLS) interpretados a nivel individual.
- **Sin comparativo con la media de tu equipo en v1.5.** Tentador, pero requiere asegurar que el empleado no infiera identidad de otros del equipo (especialmente en equipos de 5-6 personas). Diferido (OQ-2).
- El empleado puede descargar su reporte en PDF.
- El empleado conserva acceso indefinidamente, incluso despues de dejar la empresa.

### 8.6 Cross-sell Ikigai (cuando este disponible Q1 2027)

- El empleado B2B puede comprar Ikigai Premium como add-on individual sobre su perfil Paid + B2B (USD 29-49 orientativo, OQ-3).
- Compra es B2C personal, no la empresa.

---

## 9. Dashboard agregado anonimo (DD-33: amplio)

### 9.1 Principios de diseno

1. **Cero data individual identificable.** El dashboard nunca muestra nombre, email, o cualquier identificador.
2. **n≥5 por celda obligatorio.** Cualquier metrica de equipo con menos de 5 empleados completados se oculta.
3. **Cero recomendacion sobre individuos.** Recomendaciones e ideas son sobre el equipo / la organizacion.
4. **Tendencias requieren al menos 2 periodos.** No mostrar "tendencia" con un solo data point.
5. **Disclaimers eticos visibles en cada seccion** para recordar al Admin el uso permitido.

### 9.2 Secciones del dashboard v1.5

| Seccion | Contenido | Datos |
|---|---|---|
| **A. Vista general organizacion** | KPIs top de la empresa: % adopcion, scores promedio en 5 areas clave (engagement, bienestar, sentido, ajuste persona-trabajo, fortalezas) | Todos los empleados completados |
| **B. Por equipo** | Tabla de equipos con n, scores promedio en 5 areas, indicador de riesgo (verde/amarillo/rojo) | Por equipo con n≥5 |
| **C. Distribuciones** | Histogramas por dimension clave: cuantos empleados estan alto / medio / bajo en X dimension | Toda la empresa o por equipo con n≥5 |
| **D. Tendencias trimestrales** | Linea de tiempo de scores promedio por trimestre. Visible desde Q2 (necesita 2 periodos). | Todos los empleados completados |
| **E. Areas de riesgo** | 3 areas: burnout (UWES bajo + BPNSFS frustracion alta), engagement (UWES bajo aislado), desconexion (WOLF bajo + SWLS bajo). Por equipo. | Equipos con n≥5 |
| **F. Alertas configuradas** | Lista de alertas del Admin: "avisame si Equipo X cruza umbral Y". Resumen + boton de configurar nuevas. | Personalizadas |
| **G. Ideas de exploracion** | Sugerencias automaticas a nivel equipo: "Considera explorar diseno del trabajo del Equipo X (puntaje WDQ-40 bajo en autonomia)". **Sugerencias, no diagnosticos.** | Por equipo con n≥5 |
| **H. Exportes** | Boton para descargar PDF del dashboard + CSV de datos agregados | — |

### 9.3 Areas de riesgo — definicion psicometrica (Cowork rol Investigador valida)

| Area | Criterio | Umbral |
|---|---|---|
| **Burnout** | UWES total bajo + BPNSFS Frustracion total alto + (opcional) PANAS NA alto | Combinaciones especificas a definir con Investigador. Conservador inicialmente. |
| **Engagement bajo** | UWES total bajo aisladamente | Percentil ≤25 vs baremo LATAM |
| **Desconexion** | WOLF total bajo + SWLS bajo | Percentil ≤25 ambos |

Umbrales requieren validacion psicometrica antes de exposicion. Si los datos no sustentan, no se muestra el "indicador de riesgo" en rojo, solo se muestran las medias.

### 9.4 Alertas configurables (DD-33)

Admin puede crear alertas tipo:

- "Avisame si algun equipo cae bajo X percentil en engagement."
- "Avisame si la organizacion cae en burnout entre periodos."
- "Avisame cuando el % de adopcion llegue al 80%."

Restricciones:

- Alertas solo a nivel de equipo o organizacion, nunca individual.
- Alertas pueden enviarse via email al Admin o aparecer en el dashboard.
- Max 10 alertas activas por organizacion en v1.5.

### 9.5 Cadencia de actualizacion

- **Adopcion (% completion)**: actualizacion diaria.
- **Medias por equipo y distribucion**: actualizacion cada vez que un empleado completa un instrumento (en el agregado de su equipo, si n≥5).
- **Tendencias trimestrales**: cada cierre de trimestre (1 de enero, 1 de abril, 1 de julio, 1 de octubre).
- **Areas de riesgo**: re-calculo semanal.
- **Alertas**: evaluacion diaria + envio segun configuracion.

### 9.6 Ideas de exploracion (DD-33 con guardrails)

El sistema genera 3-5 "ideas de exploracion" automatizadas por trimestre, basadas en patrones del data agregado. Ejemplos:

- "Equipo X tiene WDQ-40 bajo en Autonomia (-1 SD vs media organizacion). Considera revisar el diseno del trabajo en ese equipo."
- "La organizacion bajo en Sentido (MEMS) entre Q1 y Q2. Considera revisar la comunicacion sobre proposito de la empresa."

**Reglas estrictas para ideas de exploracion:**

- **Solo a nivel de equipo o organizacion, nunca de individuos.**
- Lenguaje "considera", "podria valer la pena explorar", nunca "debes hacer X".
- Cero diagnostico, cero prediccion.
- Disclaimer al pie: "Estas ideas son sugerencias de exploracion basadas en patrones agregados. Cualquier intervencion debe disenarse con expertos en cultura organizacional."

### 9.6.1 Si la idea de exploracion no tiene sustento psicometrico (n<5, alpha bajo, etc.)

Sistema no la genera. Mejor mostrar menos ideas que ideas debiles.

---

## 10. Modulos de trabajo (los 5 que B2B-A anade al Paid)

### 10.1 Los 5 modulos

| Instrumento | Tiempo | Funcion | NFR-27 |
|---|---|---|---|
| **WDQ-40 Bayona** | ~12-15 min | Diseno del trabajo, 21 facetas en 4 grupos (autonomia, variedad, identidad, importancia) | No (revisar) |
| **UWES-17 o UWES-9** | ~4-7 min | Work engagement: vigor + dedicacion + absorcion | No |
| **BPNSFS** (en B2B reportar subescalas separadas, no agregar Total Frustration) | ~5-7 min | Necesidades SDT generales | Si (frustracion) |
| **WOLF** | ~4-6 min | Flow ocupacional especifico | No |
| **SWLS** | ~1-2 min | Satisfaccion vital | No |

**Tiempo total adicional sobre Paid:** 26-37 min.

**Tiempo total B2B-A:** Paid (95-130 min) + modulos trabajo (26-37 min) - solapamientos (BPNSFS, SWLS estan en Paid) = ~120-160 min totales.

### 10.2 Como se anaden al flujo del empleado

Despues de los 9 bloques de Paid normales, hay un bloque 10 adicional:

**Bloque 10 — Trabajo (~15-20 min sin solapamientos)**

- WDQ-40 Bayona
- UWES
- WOLF
- (SWLS, BPNSFS ya tomados en bloques previos)

Es la unica diferencia de orden vs Paid B2C puro. El empleado lo ve como "bloque adicional de tu empresa".

### 10.3 Reporte adicional sobre modulos de trabajo

En el reporte individual, una seccion adicional:

- **Diseno del trabajo** (WDQ-40): 21 facetas con score, banda, narrativa.
- **Engagement** (UWES): scores + 3 dimensiones (vigor + dedicacion + absorcion).
- **Flow ocupacional** (WOLF): score + interpretacion.
- **Sentido en el trabajo**: combinacion contextualizada de SWLS + WAMI (heredados de Paid) + WOLF.

En el dashboard agregado: estos modulos alimentan medias por equipo + areas de riesgo.

---

## 11. Privacidad y proteccion del empleado

### 11.1 Compromisos no negociables (estos definen el producto, no son opcionales)

1. **Cero datos individuales al empleador, en cualquier circunstancia.** No hay setting que lo desbloquee.
2. **n≥5 obligatorio para cualquier metrica de equipo.** No hay setting que lo baje.
3. **Empleado puede opt-out sin notificacion al empleador.**
4. **Empleado conserva acceso a su reporte individual incluso despues de dejar la empresa.**
5. **Empleado puede eliminar sus datos en cualquier momento desde el perfil (≤2 clicks).**
6. **El contrato B2B incluye clausula explicita de no-uso para decisiones individuales** (con consecuencia: rescision unilateral por DescubreMe si se detecta uso indebido).

### 11.2 Que pasa cuando el empleado deja la empresa

- Marcado como "alumni" por el Admin.
- Sus respuestas pasadas siguen en el agregado historico del equipo (ya formaban parte de tendencias trimestrales).
- Despues de 60 dias de aviso: opcion (1) eliminar todo, (2) transferir su perfil individual a Paid B2C personal sin costo, (3) no hacer nada (data persiste, sigue contando en tendencia historica).

### 11.3 Que pasa si la empresa cierra cuenta DescubreMe

- 90 dias antes del fin del contrato: aviso a Admin.
- Si no se renueva: cada empleado recibe email con opciones (1) transferir su perfil a Paid B2C personal sin costo, (2) eliminar todo.
- Si no responde en 60 dias: por defecto, opcion (1) — transferir a Paid B2C personal (acceso individual conservado, datos no agregables a nadie mas).

### 11.4 Quality flags y NFR-28 en B2B-A

- Quality flags individual (aquiescencia, patron unico, tiempo atipico) se computan **solo a nivel individuo** y se reflejan **solo en el reporte individual** del empleado.
- En el dashboard agregado, sesiones con quality_flag activo se excluyen del agregado (no contaminan medias).
- NFR-28 (ruta de contencion) se activa para el empleado individual segun umbrales. **El Admin no es notificado.**

### 11.5 Auditoria y logs

- Cada acceso al dashboard agregado por Admin queda en audit_log inmutable.
- Cada intento de query individual desde una cuenta Admin es bloqueado por RLS y queda como evento de seguridad para alerta operativa.
- Audit log se preserva 5 anos.

---

## 12. Compliance contractual + DPA (Data Processing Agreement)

### 12.1 Documentos contractuales B2B

Cada cliente B2B firma 2 documentos:

1. **Acuerdo de Servicio B2B** (Service Agreement): comercial. Define scope, pricing, refund, SLA, soporte.
2. **DPA (Data Processing Agreement)**: legal. Define como DescubreMe procesa datos de empleados.

### 12.2 Clausulas criticas del DPA

| Clausula | Que dice |
|---|---|
| **Naturaleza del dato** | Datos sensibles (salud mental indirectamente via psicometria). Tratamiento exclusivamente educativo y de desarrollo organizacional. |
| **Finalidad** | Producir dashboard agregado anonimo para el cliente. Producir reporte individual para el empleado. |
| **No-uso para decisiones individuales** | Empleador se compromete por contrato a NO usar la informacion para contratacion, promocion, evaluacion de desempeno, despido o cualquier decision sobre empleados individuales. Violacion: rescision unilateral con devolucion proporcional. |
| **Procesadores subcontratados** | Lista: Supabase (DB), Stripe (pagos), proveedor de email transaccional. Cliente acepta sub-procesadores. |
| **Region de hosting** | Definida en §6 NFR-Priv6 del A2. |
| **Notificacion de brecha** | DescubreMe notifica al cliente en ≤72 h tras descubrimiento de brecha de seguridad que afecte datos del cliente. |
| **Cooperacion en derechos del titular** | Si un empleado ejerce sus derechos (Ley 1581), DescubreMe coopera y reporta al cliente solo lo necesario (sin exponer respuestas individuales). |
| **Retencion post-contrato** | 60 dias de gracia. Despues, eliminacion o transferencia a B2C segun decision del empleado. |
| **Auditoria** | Cliente puede solicitar auditoria de DescubreMe una vez al ano con 30 dias de aviso. |
| **Limitacion de responsabilidad** | Tope estandar (12 meses de facturacion). |

### 12.3 Procesos para soportar DPA

| Proceso | Owner | Frecuencia |
|---|---|---|
| Notificacion de brecha | German + Claude Code | Reactivo |
| Reporte de auditoria a cliente | German + asesor legal | Anual o bajo solicitud |
| Cooperacion en derechos del titular | German + Claude Code | Reactivo |
| Renovacion de DPA si cambia normativa | German + asesor legal | Anual o bajo cambio |

---

## 13. Metricas B2B-A

### 13.1 Comerciales

| Metrica | Definicion | Objetivo v1.5 |
|---|---|---|
| Contratos B2B firmados | Clientes activos a 12 meses | 3-8 |
| ACV (Annual Contract Value) | Revenue anual promedio por cliente | USD 8K-25K |
| Ciclo de venta | Tiempo desde lead a contrato firmado | ≤90 dias mediana |
| Conversion lead → discovery | % leads que aceptan discovery call | ≥40% |
| Conversion discovery → contrato | % discovery calls que cierran | ≥30% |
| NRR (Net Revenue Retention) | Retencion neta a 12 meses | ≥90% |
| Refund / cancelacion pre-onboarding | % | ≤10% |

### 13.2 Adopcion en cuenta cliente

| Metrica | Objetivo v1.5 |
|---|---|
| % empleados que aceptan magic link | ≥75% en 14 dias |
| % empleados que inician al menos 1 instrumento | ≥65% en 30 dias |
| % empleados que completan los 23 | ≥50% en 60 dias |
| Tiempo medio del empleado completion total | 120-160 min (PRD_MAESTRO objetivo) |
| % empleados que ejercen derecho de eliminacion | <5% (>5% sugiere problema de confianza, alerta) |
| % equipos con n≥5 elegibles para dashboard | ≥80% al final del primer periodo |

### 13.3 Engagement del Admin

| Metrica | Objetivo v1.5 |
|---|---|
| Admin logins/mes en primeros 90 dias | ≥4 |
| Admin logins/mes post-90 dias | ≥1 (revision trimestral) |
| Admin exportes de dashboard | ≥2 por trimestre |
| Alertas configuradas por cliente | promedio 3-5 |
| NPS del Admin | ≥40 |

### 13.4 Calidad

| Metrica | Objetivo |
|---|---|
| Alpha minimo por escala en muestra B2B real | ≥0.70 |
| % sesiones con quality_flag | ≤10% |
| % equipos con n<5 (no aparecen en dashboard) | ≤20% en cliente bien onboardeado |
| Tests de RLS pasando en CI | 100% |

### 13.5 Tecnico-operativo

| Metrica | Objetivo |
|---|---|
| TTFB Admin Panel | ≤500 ms p95 |
| Generacion de dashboard agregado | ≤5 s p95 |
| Generacion de PDF dashboard | ≤30 s background job |
| Uptime SLA | 99.5% mensual v1.5 (subir a 99.9% post-v1.5) |

---

## 14. NFRs especificos B2B-A

Hereda todos los NFRs del Paid (PRD_B2C_Paid §12) mas:

| NFR adicional B2B | Descripcion |
|---|---|
| **NFR-S Multi-tenant** | RLS de Supabase obligatorio. Tests de RLS bloquean PRs. Penetration test pre-lanzamiento. |
| **NFR-S Aislamiento de datos** | Cero query cross-org en codigo de aplicacion. Solo views agregadas autorizadas. |
| **NFR-Priv n>=5** | Cualquier metrica de equipo con n<5 oculta automatically en views. No hay setting de override. |
| **NFR-Priv Disclaimer empleado** | Disclaimer de privacidad obligatorio antes de consentimiento (§8.2). |
| **NFR-Priv Cero data individual al Admin** | Admin Panel nunca expone item_response o computed_score individual. Bloqueado por RLS. |
| **NFR-S2 SSO Google basico** | Integracion Google Workspace OAuth para empresas que la pidan. Sin SAML completo en v1.5. |
| **NFR-O Adopcion tracking** | Dashboard de adopcion para Admin (solo agregados, no individuos identificables). |
| **NFR-O Audit log de Admin** | Cada accion del Admin (crear empleado, eliminar empleado, ver dashboard, configurar alerta) queda en audit_log. |
| **NFR-Performance dashboard** | Dashboard agregado con calculo eficiente via views o materialized views. ≤5 s render. |
| **NFR-Compliance DPA** | Firma digital de DPA archivada en `05_licencias/clientes_b2b/`. |
| **NFR-i18n** | El Admin Panel y los emails al empleado en es-CO, es-MX, en, segun pais del cliente. |

---

## 15. Riesgos especificos B2B-A

| ID | Riesgo | Impacto | Mitigacion |
|---|---|---|---|
| R-03 | WDQ-40 no obtiene los 4 permisos | Bloquea modulos de trabajo | Plan B: WDQ-77 ingles via APA / Karasek 14 propio (downgrade psicometrico significativo) |
| R-04 | UWES no se obtiene de Triple i | Bloquea engagement en B2B | Sin sustituto equivalente. Lanzar B2B con disclaimer "engagement no incluido" hasta cerrar licencia. |
| R-05 | Ley 1581 sin asesor | Bloquea contratos B2B (DPA no se redacta) | Critico. Contratar pre-Sprint 1. |
| R-12 | B2B-A sin clientes ancla pre-Sprint 7 | Sin demanda validada | Conversaciones desde Q3 2026 con 3-5 prospectos. Pre-venta con descuento fundador. |
| R-14 | RLS multi-tenant falla en aislamiento | Critico: data cross-org expuesta | Tests automatizados en CI + penetration test pre-lanzamiento + revision de politicas RLS por par |
| R-16 | NFR-28 falla en empleado en distress | Reputacional + posible dano | Alertas operativas si NFR-28 no se activa. Tests del Distress Detector. Critico en B2B porque empleados toman bajo "obligacion" de la empresa |
| R-17 | Implementation packs B2B-A no listos a tiempo | Bloquea Sprint 7-8 | Cowork entrega packs WDQ-40 y UWES pre-Sprint 7 |
| **R-B2B-1** (NUEVO) | Cliente B2B intenta usar dashboard para decisiones individuales | Riesgo etico + legal + reputacional | Bloqueo tecnico (RLS no permite query individual) + clausula contractual + rescision unilateral |
| **R-B2B-2** (NUEVO) | Adopcion baja por empleados (miedo a privacidad) | Cliente no ve valor | Disclaimer de privacidad fuerte + opt-out claro + comunicacion del Admin + NPS del empleado |
| **R-B2B-3** (NUEVO) | Ciclo de venta >90 dias | Atrasa revenue B2B v1.5 | Sales-led con discovery call ajustado. Tener propuesta template lista. Pricing claro. |
| **R-B2B-4** (NUEVO) | German es cuello de botella en sales (sin equipo) | No escala mas alla de 5-8 clientes en v1.5 | Limite explicito v1.5: 8 clientes ancla. Post-v1.5: contratar sales o pasar a self-service hibrido. |
| **R-B2B-5** (NUEVO) | Dashboard genera idea de exploracion sin sustento psicometrico | Cliente toma decision basada en ruido | Cowork rol Investigador valida umbrales antes de exposicion. Sistema bloquea ideas si data es ruido. |
| **R-B2B-6** (NUEVO) | Cliente B2B pide datos individuales bajo argumento legal o de auditoria | Tension entre acuerdo y peticion | Politica clara: DescubreMe no entrega datos individuales bajo ningun argumento. Si hay orden judicial, asesor legal + notificar empleados afectados. |

---

## 16. Gates de release B2B-A

Aplican los 3 gates del PRD_MAESTRO §10 mas un Gate adicional B2B.

### Gate 1 — Psicometrico

- [ ] Los 23 instrumentos cumplen alpha/omega ≥0.70 (heredado de Paid y Free).
- [ ] WDQ-40, UWES, BPNSFS, WOLF, SWLS validados en muestra B2B real n≥200.
- [ ] Areas de riesgo (burnout, engagement, desconexion) tienen umbrales con sustento psicometrico documentado.
- [ ] Ideas de exploracion del dashboard pasan revision de Cowork rol Investigador antes de exponerse.

### Gate 2 — Compliance

- [ ] Acuerdo de Servicio B2B template firmado por asesor legal.
- [ ] DPA template firmado por asesor legal.
- [ ] Disclaimer de privacidad al empleado firmado por asesor legal.
- [ ] Consentimiento granular B2B (3 checkboxes) revisado por asesor legal.
- [ ] Procesos de derechos del titular adaptados a contexto B2B (cooperacion con cliente sin exponer individuales).

### Gate 3 — Licencia

- [ ] WDQ-40: acuerdo firmado con los 4 titulares (APA + Bayona + COP Madrid + Elsevier Espana).
- [ ] UWES: acuerdo firmado con Triple i Human Capital.
- [ ] BPNSFS, WOLF: acuerdos firmados (heredados de Paid).
- [ ] Atribucion completa de los 23 instrumentos + 5 modulos trabajo en reporte individual + footer dashboard.
- [ ] usage_log + export CSV mensual a titulares pactado por contrato.

### Gate 4 — Multi-tenant (especifico B2B-A)

- [ ] Tests de RLS automatizados en CI pasando.
- [ ] Penetration test ejecutado y findings criticos resueltos.
- [ ] Audit log inmutable de accesos cross-org.
- [ ] Politica de notificacion de brecha definida.
- [ ] Plan de respuesta a incidente de seguridad documentado.

---

## 17. Dependencias y bloqueadores

| Dependencia | Owner | Estado | Sprint que la necesita |
|---|---|---|---|
| Licencia WDQ-40 (4 titulares) | German | Pendiente | Sprint 5 |
| Licencia UWES | German | Pendiente | Sprint 7-8 |
| Implementation pack WDQ-40 | Cowork | Pendiente | Sprint 5 |
| Implementation pack UWES | Cowork | Pendiente | Sprint 7-8 |
| Asesor legal Ley 1581 contratado | German | Pendiente | Pre-Sprint 1 |
| Asesor legal redacta DPA template | German + asesor | Pendiente | Pre-Sprint 7 |
| Acuerdo de Servicio B2B template | German + asesor + Cowork | Pendiente | Pre-Sprint 7 |
| Validacion psicometrica umbrales areas de riesgo | Cowork rol Investigador | Pendiente | Pre-Sprint 7 |
| 3-5 prospectos B2B identificados | German | Pendiente | Q3 2026 |
| Penetration test contratado | German | Pendiente | Pre-Sprint 7 |
| Tool de e-signature elegido | German | Pendiente | Pre-Sprint 7 (OQ-1) |
| Google SSO basico implementado | Claude Code | Pendiente | Sprint 7-8 |
| Region hosting Supabase confirmada | German | Pendiente | Pre-Sprint 0 |
| Microcopy del Admin Panel | Cowork UX Writer | Pendiente | Sprint 7-8 |
| Template de propuesta comercial B2B | German + Cowork rol Estratega | Pendiente | Pre-Sprint 7 |

---

## 18. Open questions

| # | Pregunta | Cuando decidir | Quien |
|---|---|---|---|
| OQ-1 | Tool de e-signature para contratos (DocuSign / HelloSign / PandaDoc) | Pre-Sprint 7 | German |
| OQ-2 | Comparativo individual vs media de equipo en reporte individual (riesgo de inferencia en equipos chicos) | Sprint 9-10 con datos reales | Cowork rol Investigador + PM |
| OQ-3 | Ikigai cross-sell a empleados B2B: precio diferente del B2C? | Pre-Sprint 11 | German + Cowork |
| OQ-4 | Manager dashboard (managers de equipo ven su equipo agregado): incluir v1.5 o diferir? | Sprint 10 | German + Cowork PM |
| OQ-5 | Plan de bienvenida personalizable: video del CEO embebido al onboarding del empleado | Sprint 8-9 | Cowork UX |
| OQ-6 | Integracion con Slack para notificaciones (recordatorios al empleado) | Sprint 10 | Cowork UX |
| OQ-7 | Cohorte de comparacion entre empresas (benchmark anonimo) en v1.6 | Q1 2028 | German |
| OQ-8 | API publica para data agregada del cliente en v2 | Q2 2027 | German |
| OQ-9 | Politica de revision del cliente sobre dashboard (revision en vivo con German vs solo asincrona) | Tras primer cliente | German |
| OQ-10 | Pricing test USD 8 / 10 / 12 / 15 por seat con 3 prospectos | Q3 2026 | German |
| OQ-11 | Tratamiento del 'Sponsor' tambien como empleado: si el CEO toma los tests, su data entra al agregado o queda fuera? | Pre-Sprint 7 | Asesor legal + Cowork |
| OQ-12 | Multi-org consultora: una consultora compra para varios clientes (cuenta master + sub-cuentas). v1.5 o v2? | Q1 2027 | German |

---

## 19. Changelog del PRD

| Version | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-05-13 | Cowork rol PM + Arquitecto de sistema + Estratega + German | Version inicial. Decisiones DD-30 (anual obligatorio + pago up-front + min 50 empleados), DD-31 (sales-led con discovery call), DD-32 (magic link + Google SSO basico), DD-33 (dashboard amplio con guardrails eticos). |

---

*Fin del PRD_B2B-A_v1.5 v1.0. Documento vivo. Actualizar al cierre de cada sprint que toque B2B-A o cuando aparezcan datos reales que cambien decisiones. Cualquier cambio relevante debe registrarse en este changelog y en `01_estado/DECISIONS_LOG.md`.*
