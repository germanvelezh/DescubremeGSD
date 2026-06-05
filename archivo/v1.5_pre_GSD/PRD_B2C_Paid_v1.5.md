# PRD — B2C Paid USD 19 (v1.5)

**Producto:** DescubreMe — Tier B2C Paid USD 19.
**Version del PRD:** 1.0
**Fecha:** 2026-05-13
**Owner:** German Velez Hurtado.
**Estado:** Borrador para revision del owner.
**Audiencia primaria:** Claude Code (implementacion) + German (owner) + Cowork (UX Writer para microcopy).
**Documento padre:** `02_producto/PRD_MAESTRO.md` (v1.0).

**Documentos relacionados:**

- PRD del producto anterior en el funnel: `02_producto/PRD_B2C_Free_v1.5.md`.
- Glosario, NFRs, mapa de instrumentos, etica/compliance, riesgos: `02_producto/anexos/A1-A5`.
- Arquitectura: `00_arquitectura/_ARQUITECTURA_TESTS_REUTILIZABLES.md`.
- Stack por producto: `00_arquitectura/_STACK_POR_PRODUCTO.md` (seccion B2C Paid).
- Matriz maestra: `00_arquitectura/_MATRIZ_MAESTRA.md`.
- Dossiers de los 18 instrumentos: ver §7 con rutas individuales.
- Implementation packs: pendientes (solo BFI-2-S listo al 2026-05-13).

---

## 1. Resumen ejecutivo

B2C Paid USD 19 es el tier transaccional de DescubreMe. Entrega un perfil profundo en 95-130 minutos distribuidos en 4-6 sesiones, con 18 instrumentos core + 3 upgrades premium opcionales (BFI-2 60, IPIP-NEO-120, HEXACO-60). El reporte cubre personalidad facetada, valores, intereses + mapeo a ocupaciones O*NET, fortalezas del caracter, sentido, bienestar, necesidades psicologicas, flow y adaptabilidad de carrera. Modelo comercial: USD 19 one-time, refund 30 dias sin preguntas, equivalente COP/MXN por geolocalizacion. Paid es independiente de Free (cualquiera puede comprarlo directo). Bloqueadores criticos: 4 licencias pendientes (BFI-2, VIA-IS-P, PANAS, PERMA), asesor legal Ley 1581, completion rate (~95-130 min es la fatiga critica del producto).

---

## 2. Problema y oportunidad

### 2.1 Problema del usuario

El adulto LATAM que ya hizo el Free (o que llego directo decidido a profundizar) enfrenta:

- **Coaching o consultoria 1:1**: USD 80-300 por sesion. Inviable para "perfil profundo".
- **Plataformas globales premium** (BetterUp, MyersBriggs.com): USD 100-500, sin contextualizacion LATAM, en ingles.
- **Tests sueltos online**: aislados, sin integracion, validez psicometrica dudosa.

Paid responde: "USD 19 por un perfil profundo integrado, riguroso, en tu idioma, con 18 instrumentos validados que cubren personalidad, valores, intereses, fortalezas, sentido, bienestar, flow y carrera. Con refund 30 dias si no te aporta."

### 2.2 Por que importa para el funnel comercial

Paid es **el unico tier con revenue directo B2C en v1.5**. Free es captacion. B2B-A es revenue B2B. Ikigai Premium es add-on sobre Paid (no producto autonomo). Sin Paid funcionando, el modelo B2C no es viable.

### 2.3 Por que ahora

PRD_MAESTRO objetivo Q3-Q4 2026 (Sprints 4-6) para Paid. Debe estar listo cuando cierren las negociaciones de licencia VIA-IS-P (M2) y PANAS.

---

## 3. Usuarios y JTBD especificos Paid

### 3.1 P1-Paid — Adulto que convirtio desde Free

- Hizo Free, le gusto, quiere mas detalle.
- 28-38 anos, profesional con 5-10 anos de experiencia.
- Confia en la rigurosidad del producto porque vio el Free.
- Conversion en 14-30 dias post-Free (DD-23).

### 3.2 P2-Paid — Adulto que llega directo a Paid

- No paso por Free. Llega via referido, busqueda especifica ("perfil profundo psicologico"), o por contenido editorial de DescubreMe.
- Mas escepticismo inicial pero mas decidido (si compra, esta convencido).
- 38-55 anos, alta capacidad de pago, busca rigor.

### 3.3 P3-Paid — Usuario empleado de cliente B2B-A

- Recibe Paid como parte del paquete B2B-A. Llega via su empleador.
- Confianza en privacidad es factor critico (su empleador no ve sus datos individuales).
- Cubierto en mas detalle en `PRD_B2B-A_v1.5.md`.

### 3.4 JTBD principal Paid

> "Cuando estoy comprometido con entenderme a fondo antes de tomar una decision importante de carrera, relacion o proyecto, quiero un perfil profundo integrado y riguroso, con 18 instrumentos validados y mapeo a ocupaciones, en mi idioma, a precio asequible, para tomar decisiones informadas."

### 3.5 Anti-personas (NO son target Paid)

- Profesionales clinicos buscando bateria diagnostica.
- Reclutadores buscando filtro de candidatos.
- Curiosos sin intencion de invertir 95-130 min.
- Usuarios menores de 18.

---

## 4. Alcance funcional v1.5

### 4.1 Que entra v1.5

- 18 instrumentos core (ver §7 detalle por bloque).
- 3 upgrades premium opcionales (BFI-2 60, IPIP-NEO-120, HEXACO-60) ofrecidos despues del reporte completo (DD-28).
- Distribucion en 9 bloques tematicos secuenciales con descansos sugeridos (DD-27).
- Checkout Stripe one-time USD 19. Equivalente COP / MXN por geolocalizacion.
- Refund de 30 dias sin preguntas (DD-29).
- Reporte completo con layers Base + Free + Paid (facetas, comparativos, mapeo O*NET, recomendaciones).
- Save & resume entre sesiones y entre bloques.
- Cross-sell de Ikigai Premium al final del reporte Paid (cuando Ikigai este disponible Q1 2027).
- Derecho de eliminacion accesible en ≤2 clicks.
- Re-toma de instrumentos individuales despues de 90 dias (test-retest valido).
- Idioma default es-CO. Disponible es-MX y en como secundarios.
- Paid es independiente de Free (DD-26): cualquiera puede comprar Paid directo.

### 4.2 Que NO entra v1.5 (out-of-scope explicito)

- Coaching 1:1 dentro del producto.
- Marketplace de coaches o profesionales.
- Integracion con calendario, agenda, recordatorios proactivos.
- Compartir resultado completo en redes (decision diferida — ver §17).
- Version mobile nativa (web responsive solamente).
- Pago recurrente (subscripcion anual). Paid es one-time. Si se necesita revisita, el usuario re-toma instrumentos individualmente.
- Pago de B2B individuales (B2B se atiende via PRD_B2B-A_v1.5).
- API publica de scores para terceros.
- Acceso a datos para investigacion academica (requiere acuerdo separado).
- Idiomas fuera de es-CO / es-MX / en.

### 4.3 Out-of-scope heredado del maestro

Todas las exclusiones del PRD_MAESTRO §8 aplican.

---

## 5. Modelo comercial

### 5.1 Pricing

| Mercado | Precio one-time | Notas |
|---|---|---|
| LATAM general | USD 19 | Default |
| Colombia (COP) | TBD via FX al lanzamiento (rango orientativo COP 75K-85K) | Equivalente con FX promediado |
| Mexico (MXN) | TBD via FX al lanzamiento (rango orientativo MXN 380-420) | Equivalente con FX promediado |
| Resto LATAM | USD 19 default | Geolocalizacion via IP |

**Decision pendiente OQ-1:** validar willingness-to-pay en Colombia con muestra pequena en Sprint 6 (riesgo R-10). Tres niveles a testear: USD 14, USD 19, USD 24.

### 5.2 Upgrades premium

Ofrecidos **despues** del reporte Paid completo (DD-28). Pricing rango orientativo (pricing research requerido):

| Upgrade | Precio orientativo | Tiempo extra | Razon de compra |
|---|---|---|---|
| BFI-2 60 | USD 9-14 | +5 min adicionales | Maxima fidelidad sobre el mismo modelo Big Five (15 facetas con alpha mas alto que BFI-2-S 30) |
| IPIP-NEO-120 | USD 9-14 | +25-30 min | Granularidad maxima en Big Five (30 facetas vs 15), dominio publico |
| HEXACO-60 | USD 12-18 | +12-15 min | Modelo alternativo con Honestidad-Humildad |
| Bundle "Personalidad completa" | USD 25-35 | +42-50 min | Los 3 upgrades juntos. Decision pendiente OQ-2. |

### 5.3 Refund

- Ventana: 30 dias post-compra sin preguntas (DD-29).
- Canal: email a soporte + ruta self-service en el perfil.
- Tiempo de procesamiento: ≤7 dias habiles.
- Refund NO elimina automaticamente los datos del usuario. El usuario conserva acceso a su reporte hasta que ejerza derecho de eliminacion explicitamente. Si quiere borrar, debe pedirlo aparte.
- Si el usuario compro upgrades y pide refund del Paid base, el upgrade tambien se refunde proporcionalmente. Bundles igual.
- Si el usuario ya tomo todos los instrumentos del Paid antes del refund, el refund se procesa igual (DD-29 dice "sin preguntas").
- Si la tasa de refund sostenida >10% en un mes, alerta operativa para investigar causa.

### 5.4 Facturacion y procesador de pagos

- Procesador v1.5: Stripe. Implementacion en Sprint 5-6.
- Moneda de cobro: USD por defecto. COP/MXN segun geolocalizacion.
- Facturas electronicas: pendiente decision (depende de razon social en Colombia — OQ-3).
- IVA: pendiente decision con asesor legal y contable.

### 5.5 Promociones eticas permitidas

Alineado con A4 §1.6:

- Descuento de lanzamiento por tiempo razonable (ej. -25% primer mes post-lanzamiento) **con razon explicita**, no countdown artificial.
- Descuento por referido (el referente recibe credito o descuento si su referido compra).
- Descuento institucional para estudiantes y profesionales en formacion (requiere validacion .edu).
- NO permitido: "ultima oportunidad", "solo X cupos", urgencia artificial, descuento con countdown vencido cada visita.

---

## 6. Flujo de usuario end-to-end

### 6.1 Entrada al Paid

Tres puntos de entrada:

1. **Desde reporte Free + CTA**: usuario completa Free, ve reporte, clic en CTA Paid → checkout.
2. **Desde email educativo Free**: usuario recibe email dia 2-3 o dia 10-14, clic → checkout.
3. **Directo (P2-Paid)**: usuario llega via marketing, content, referido → landing Paid → checkout sin Free.

### 6.2 Flujo del usuario que llega directo (P2-Paid)

```
[Landing Paid] -> [Registro: email + consent producto + consent marketing opt-in]
        v
[Magic link recibido en email]
        v
[Click en magic link -> autenticado]
        v
[Onboarding Paid corto: que recibe, cuanto dura, modelo de 9 bloques, refund 30 dias]
        v
[Checkout Stripe]
        v
[Post-pago: confirmacion + email recibo + onboarding al primer bloque]
        v
[Bloque 1: Personalidad - BFI-2-S 30]
        v
... 9 bloques en orden ...
        v
[Quality validator corre por instrumento + global]
        v
[Generacion de reporte Paid completo]
        v
[Reporte Paid]
        v
[Cross-sell Ikigai (si disponible) + 3 upgrades premium]
        v
[Email cierre: tu reporte esta listo + opcion sobre upgrades]
```

### 6.3 Flujo del usuario que venia de Free

Mismo flujo pero los 4 instrumentos del Free (BFI-2-S, Flourishing, O*NET IP SF, PERMA) NO se vuelven a tomar. El sistema reutiliza las respuestas existentes y los marca como "completados" en el dashboard Paid.

### 6.4 Distribucion en 4-6 sesiones (sugerida, no obligatoria)

| Sesion sugerida | Bloques | Tiempo | Notas |
|---|---|---|---|
| 1 | Bloques 1-2 (Personalidad + Valores) | ~20 min | Bloque mas pesado al inicio cuando el usuario tiene energia |
| 2 | Bloques 3-4 (Intereses + Fortalezas) | ~25 min | Engaging, cambio de registro |
| 3 | Bloques 5-6 (Sentido + Bienestar) | ~25 min | Items sensibles, NFR-27/28 activo |
| 4 | Bloques 7-8 (Necesidades + Flow) | ~15 min | Bloques cortos |
| 5 | Bloque 9 (Adaptabilidad de carrera) | ~15 min | Cierre |
| Reporte | — | 15-20 min de lectura | Aparece al completar bloque 9 |

El usuario puede consolidar en 4 sesiones (algunos hacen bloques 7-8-9 juntos) o estirar a 6 (1 bloque por sesion).

### 6.5 Dashboard del progreso

- Vista principal: 9 bloques con barra de progreso por bloque.
- Cada bloque desbloqueado por el bloque anterior (orden secuencial obligatorio en v1.5; OQ-4 considera flexibilizarlo).
- Tiempo estimado restante visible.
- Boton "Reanudar" siempre presente.
- Ultimo punto guardado visible.

### 6.6 Save & resume

- Persistencia por item (mismo modelo que Free, DD-21 escalado a Paid).
- Sesion en progreso expira a los 60 dias de inactividad (mas que Free porque el compromiso es mayor).
- Email recordatorio dia 14 y dia 45 si no hay actividad.

### 6.7 Manejo de errores y casos borde

| Caso | Comportamiento |
|---|---|
| Pago falla | Mensaje claro + opcion de re-intentar + ruta a soporte. NO empezar instrumentos hasta confirmacion de pago. |
| Pago exitoso pero falla magic link | Re-enviar magic link automatico + soporte. |
| Usuario pide refund tras completar 70% del flujo | Refund se procesa igual (DD-29). Acceso al reporte se mantiene hasta que ejerza eliminacion. |
| Usuario tomo Free y compra Paid | Reutiliza respuestas Free, marca bloques relevantes como "completados". |
| Usuario activa NFR-28 en un bloque | Disclaimer + opcion de pausar o continuar. No bloquea el bloque ni el reporte. |
| Tiempo total >5 h en un solo instrumento | Quality validator marca tiempo atipico. Reporte tiene disclaimer en ese score. |

---

## 7. Los 18 instrumentos core (9 bloques tematicos)

Orden secuencial obligatorio en v1.5 (OQ-4: posibilidad de flexibilizar en v1.6).

### Bloque 1 — Personalidad (1 instrumento, ~3-5 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| BFI-2-S 30 | 30 | 3-5 min | Si (faceta Depresion) | Soto-John (R-01) | `03_dossiers/01_BFI-2_Consolidado.md` |

Si el usuario tomo Free, no se vuelve a tomar.

### Bloque 2 — Valores (1 instrumento, ~12-15 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| PVQ-RR | 57 | 12-15 min | No | CC BY-NC-ND (revisar uso comercial) | `03_dossiers/27_PVQ-RR_Consolidado.md` |

### Bloque 3 — Intereses (1 instrumento, ~3-5 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| O*NET IP SF | 60 | 3-5 min | No | Dominio publico | `03_dossiers/25_O-NET-IP-SF_Consolidado.md` |

Si el usuario tomo Free, no se vuelve a tomar.

### Bloque 4 — Fortalezas del caracter (1 instrumento, ~18-22 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| VIA-IS-P 96 | 96 | 18-22 min | No | VIA Institute (R-02, M2) | `03_dossiers/02_VIA-IS-P_Consolidado.md` |

Bloque mas largo en tiempo. Coloca en sesion 2 para mantener engagement.

### Bloque 5 — Sentido y proposito (3 instrumentos, ~10-14 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| MLQ | 10 | 3-4 min | No (revisar) | Steger autor (libre academico) | Heredado v2.0 |
| MEMS | ~15 | 4-6 min | Si (items de mattering bajo) | Routledge + autores (ambigua) | `03_dossiers/12_MEMS_Consolidado.md` |
| WAMI | 10 | 3-4 min | No | Steger autor (libre academico) | Heredado v2.0 |

### Bloque 6 — Bienestar (3-5 instrumentos segun haya o no Free previo, ~10-15 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| PERMA-Profiler | 23 | 4-5 min | Si | UPenn + Wellbeing Lab | `03_dossiers/23_PERMA-Profiler.md` |
| SWLS | 5 | 1-2 min | No | Diener Ed. Fund | `03_dossiers/10_SWLS_Consolidado.md` |
| Ryff PWB corta | ~18 | 6-8 min | No | Ryff (libre academico) | `03_dossiers/28_Ryff-PWB_Consolidado.md` |
| Flourishing Scale | 8 | 2-3 min | No | Diener Ed. Fund | `03_dossiers/04_Flourishing_Consolidado.md` |
| PANAS (estado) | 20 | 4-6 min | Si (10 items NA) | APA via CCC (R-04 ampliado) | `03_dossiers/11_PANAS_Consolidado.md` |

Si el usuario tomo Free: PERMA y Flourishing no se vuelven a tomar. Bloque 6 efectivo: SWLS + Ryff + PANAS (~11-16 min).

### Bloque 7 — Necesidades psicologicas (2 instrumentos, ~10-14 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| BPNSFS | 24 | 5-7 min | Si (items frustracion) | CSDT | `03_dossiers/07_BPNSFS_Consolidado.md` |
| W-BNS | ~18 | 5-7 min | A revisar | CSDT | Heredado v2.0 |

### Bloque 8 — Flow (2 instrumentos, ~6-9 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| FSS-9 | 9 | 2-3 min | No | Engeser-Rheinberg | `03_dossiers/29_FSS-9_Consolidado.md` |
| WOLF | ~13 | 4-6 min | No | Bakker | `03_dossiers/09_WOLF_Consolidado.md` |

### Bloque 9 — Adaptabilidad de carrera (2 instrumentos, ~12-16 min)

| Instrumento | Items | Tiempo | NFR-27 | Licencia | Dossier |
|---|---|---|---|---|---|
| CAAS | 24 | 6-8 min | No | Savickas (libre) | Heredado v2.0 |
| CFI-R 28 | 28 | 6-8 min | No (revisar Negative Career Outlook) | Rottinghaus | `03_dossiers/14_CFI-R_Consolidado.md` |

### Resumen agregado

| Variable | Total |
|---|---|
| Bloques | 9 |
| Instrumentos core | 18 |
| Items totales | ~395-405 (varia por escala) |
| Tiempo total estimado | 95-130 min |
| Tiempo total si viene de Free | ~75-110 min (4 instrumentos reutilizados) |
| Instrumentos con NFR-27 trigger | 5-6 (BFI-2, MEMS, PERMA, PANAS, BPNSFS, posiblemente CFI-R) |

### Razon de este orden

| Posicion | Bloque | Razon de la posicion |
|---|---|---|
| 1 | Personalidad | Es el ancla cognitiva. Si el usuario viene de Free, lo reconoce y siente continuidad. |
| 2 | Valores | PVQ-RR es largo (~13 min); mejor temprano cuando hay energia. |
| 3 | Intereses | Cambio de registro tras valores. Engaging. O*NET ya conocido si vino de Free. |
| 4 | Fortalezas | Bloque mas largo (VIA-IS-P 18-22 min). Coloca en sesion 2 cuando ya el usuario regreso comprometido. |
| 5 | Sentido | Toca constructos emocionales (mattering, sentido). NFR-27 activa. Coloca a media via, ni primero ni ultimo. |
| 6 | Bienestar | Sigue la linea emocional de sentido. PERMA y PANAS son NFR-27. Cierra la mitad "emocional" del flujo. |
| 7 | Necesidades | Bloque corto, cambio de registro. |
| 8 | Flow | Mas corto aun. Bloque "ligero" tras la carga emocional. |
| 9 | Adaptabilidad de carrera | Cierre con sentido practico. Conecta con el mapeo O*NET del reporte. |

---

## 8. Los 3 upgrades premium

DD-25: los 3 upgrades viven en v1.5. DD-28: se ofrecen despues del reporte Paid completo, no antes ni durante.

### 8.1 BFI-2 60 (max fidelidad Big Five)

- **Para quien:** usuario que quiere las 15 facetas BFI-2 con maxima confiabilidad (alpha sube de ~.66-.71 en BFI-2-S a ~.76 en BFI-2 60).
- **Items:** 60 (30 adicionales sobre BFI-2-S, mismo modelo, mismas facetas).
- **Tiempo extra:** +5 min sobre BFI-2-S.
- **Licencia:** misma de BFI-2-S (Soto-John, R-01).
- **Riesgo:** depende de R-01.
- **Plan B:** ninguno (es el mismo familia que el core).

### 8.2 IPIP-NEO-120 (granularidad maxima)

- **Para quien:** usuario que quiere 30 facetas (vs 15 del BFI-2 60), dominio publico, validacion latinoamericana mediana (Cupani et al. 2014 AR, Wells Samudio 2023 PY).
- **Items:** 120.
- **Tiempo extra:** +25-30 min.
- **Licencia:** dominio publico IPIP.
- **Bloqueador:** dossier breve (145 lineas). Requiere enriquecimiento por Cowork rol Investigador antes de Sprint 11. Item en backlog (P1).
- **Plan B:** N/A (es el plan B de BFI-2 60 si R-01 falla).

### 8.3 HEXACO-60 (modelo alternativo)

- **Para quien:** usuario que ya tiene BFI-2 (Free o Paid) y quiere ver su perfil en un modelo distinto con Honestidad-Humildad como sexto factor.
- **Items:** 60.
- **Tiempo extra:** +12-15 min.
- **Licencia:** Lee-Ashton (academico libre, comercial pagado con tarifa C$2/admin si escala).
- **Bloqueador:** ninguno bloqueante para v1.5 (academico libre cubre si la tarifa comercial es inviable).
- **Plan B:** IPIP-HEXACO (con limitaciones psicometricas).

### 8.4 Como se ofrecen al usuario

- Despues del reporte Paid completo (DD-28).
- Seccion del reporte: "Quieres profundizar mas?" con los 3 upgrades + bundle.
- Cada upgrade muestra: que anade, tiempo extra, valor incremental (ej. "BFI-2 60 sube de 5 dominios a 15 facetas detalladas con maxima fidelidad").
- Sin urgencia artificial. Disponible para compra en cualquier momento post-Paid.
- Bundle "Personalidad completa" (los 3): pricing TBD (OQ-2).

### 8.5 Reporte de upgrades

Cuando el usuario compra un upgrade, se anaden secciones al reporte Paid existente. No es un reporte nuevo separado. El usuario ve su reporte enriquecido.

---

## 9. El reporte Paid

### 9.1 Estructura general

Reporte como pagina larga con secciones colapsables + indice navegable a la izquierda en desktop, en mobile como acordeon.

| Seccion | Contenido | Layers |
|---|---|---|
| **A. Hero** | "Tu perfil Paid DescubreMe" + nombre + fecha + boton imprimir + boton compartir (TBD) | — |
| **B. Disclaimer general** | No clinico, no diagnostico, no determinismo | Base |
| **C. Resumen ejecutivo del perfil** | 5 lineas narrativas que sintetizan los 9 bloques | Base + Paid |
| **D. Bloque Personalidad** | 5 dominios Big Five + **15 facetas** del BFI-2-S con score, percentil, banda, comparativo baremo | Base + Paid (Free solo tenia 5 dominios) |
| **E. Bloque Valores** | Perfil Schwartz 19 valores refinados con grafico radial | Base + Paid |
| **F. Bloque Intereses** | RIASEC con codigo Holland top 3 + **mapeo a 5-10 ocupaciones O*NET sugeridas** con justificacion (modelo de afinidad) | Base + Paid (Free no tenia ocupaciones) |
| **G. Bloque Fortalezas** | 24 fortalezas VIA con top 5 firma + reflexion | Base + Paid |
| **H. Bloque Sentido** | MLQ (presencia / busqueda), MEMS (3 dimensiones), WAMI (3 dimensiones) | Base + Paid |
| **I. Bloque Bienestar** | PERMA, SWLS, Ryff PWB, Flourishing, PANAS (afecto positivo + negativo) con narrativa integrada | Base + Paid |
| **J. Bloque Necesidades** | BPNSFS general + W-BNS trabajo. Subescalas separadas (no agregado "Total Frustration") | Base + Paid |
| **K. Bloque Flow** | FSS-9 (flow estado general) + WOLF (flow ocupacional) | Base + Paid |
| **L. Bloque Carrera** | CAAS + CFI-R con narrativa de adaptabilidad | Base + Paid |
| **M. Sintesis integradora** | Conexiones cross-bloque (ej. "tus valores X resuenan con tu top fortaleza Y") | Paid |
| **N. Recomendaciones** | 3-5 recomendaciones personalizadas de exploracion (cursos, libros, areas) — sin determinismo | Paid |
| **O. Mitigaciones** | Si NFR-28 se activo: lineas Colombia + sugerencia profesional. Si quality_flags: nota + opcion retake. | Base |
| **P. Cross-sell Ikigai** | Cuando Ikigai este disponible (Q1 2027): "Quieres ver tu mapa Ikigai integrado?" | — |
| **Q. Upgrades premium** | Los 3 upgrades con descripcion y CTA | — |
| **R. Footer** | Atribucion completa de los 18 instrumentos + version DescubreMe + politica privacidad + eliminacion | Base |

### 9.2 Mapeo O*NET (seccion F)

Algoritmo:

1. Calcular codigo Holland top 3 del usuario via O*NET IP SF.
2. Filtrar ocupaciones O*NET con codigo Holland coincidente en al menos 2 letras del top 3.
3. Calcular afinidad ponderando: codigo Holland (peso 40%), Big Five (peso 25%, ej. ocupaciones que requieren Consciousness alto si el usuario lo tiene), valores Schwartz (peso 20%), VIA fortalezas top 5 (peso 15%).
4. Mostrar top 5-10 ocupaciones con score de afinidad + 1 frase de justificacion.
5. Cada ocupacion linkea a descripcion O*NET expandida.

**Reglas eticas:**

- Nunca decir "tu carrera ideal es X".
- Siempre framing de exploracion: "estas ocupaciones podrian resonar".
- Mostrar el rango de afinidad (no "100% match").
- Permitir al usuario marcar ocupaciones de interes para refinar (decision diferida).

### 9.3 Microcopy de bandas y narrativa

Mismas reglas que Free §7.2 escaladas a Paid:

- Por faceta y dominio: 3 textos (low / medium / high) en es-CO.
- Sin tono motivacional vacuo.
- Sin lenguaje clinico.
- Para constructos sensibles: puente a NFR-28 si umbral cruzado.
- Recomendaciones (seccion N) deben pasar revision etica antes de produccion: cero determinismo vocacional, cero exageracion del valor predictivo.

### 9.4 Export y acceso

- Reporte vive en `/reporte/paid/<user_id>` con auth obligatorio.
- Boton "Descargar PDF" (formato A4, sin paginas en blanco, atribucion completa en pie).
- Boton "Imprimir" para version optimizada.
- Re-acceso ilimitado mientras el usuario tenga cuenta.
- Boton "Eliminar mi reporte y datos" visible al pie.

### 9.5 Generacion del reporte

- Tiempo objetivo: ≤3 s desde completar bloque 9 hasta render.
- Calculo materializado (DD-04) al completar cada bloque, no al final.
- Si un instrumento tiene `quality_flag` activo, el bloque correspondiente muestra disclaimer y opcion de re-tomar.

---

## 10. Mecanica de cross-sell Ikigai

Cuando Ikigai Premium este disponible (Q1 2027 — Sprint 11-12):

- Seccion P del reporte: "Quieres ver tu mapa Ikigai integrado? Conecta tus 18 instrumentos en 4 bloques + Ikigai-9 como eje."
- 1 email al dia 7 post-completion Paid con explicacion del Ikigai (que es, que NO es el Venn de ikigai japones, A4 §6).
- Pricing rango orientativo: USD 29-49 add-on al Paid (TBD pricing research OQ-5).
- Cero urgencia artificial.

Mientras Ikigai no este disponible (pre Q1 2027): seccion P en blanco o con "proximamente". No mencionar fecha estimada hasta tener certeza.

---

## 11. Metricas Paid

### 11.1 Funnel comercial

| Etapa | Metrica | Objetivo v1.5 |
|---|---|---|
| Visita landing Paid | Sesiones unicas | TBD (depende de marketing) |
| Visita → email enviado | Tasa de submit | ≥30% |
| Email → checkout iniciado | Tasa de checkout | ≥40% |
| Checkout → compra completada | Conversion checkout | ≥60% |
| **Compra → primer bloque iniciado** | **Activacion Paid** | **≥85%** |
| Primer bloque iniciado → reporte completo | **Completion Paid (norte)** | **≥75%** |
| Reporte visto → upgrade comprado en 30d | Conversion a upgrade | ≥10% |
| Reporte visto → cross-sell Ikigai en 90d (cuando este disponible) | Activacion Ikigai | 15-25% |

### 11.2 Calidad

| Metrica | Objetivo |
|---|---|
| Dropoff por bloque | ≤8% por bloque (mas estricto que Free porque ya pagaron) |
| Dropoff por instrumento largo (VIA-IS-P, PVQ-RR) | ≤12% |
| % sesiones con quality_flag | ≤10% |
| Alpha minimo por escala | ≥0.70 (gate psicometrico, no negociable) |
| % NFR-28 activado | Monitorear, sin objetivo cuantitativo |
| Tasa de refund a 30 dias | ≤5% (R-Paid-1) |

### 11.3 Engagement post-completion

| Metrica | Objetivo |
|---|---|
| Re-acceso al reporte en 7 dias | ≥50% |
| Re-acceso al reporte en 30 dias | ≥30% |
| Re-acceso a 90 dias | ≥15% |
| Tasa de re-toma de un instrumento individual despues de 90 dias | TBD (supuesto 5-10%) |
| NPS reporte Paid (encuesta a 14 dias) | ≥40 |
| % usuarios que descargan PDF del reporte | ≥30% (proxy de valor percibido) |

### 11.4 Comerciales

| Metrica | Objetivo v1.5 |
|---|---|
| AOV Paid efectivo (con upgrades) | USD 22-28 (supuesto, depende de conversion upgrades) |
| AOV Paid base | USD 19 |
| Churn refund 30d | ≤5% |
| Tasa de upgrade adquirido | 10-20% de usuarios Paid en 30d |
| Revenue por usuario Paid a 90d | USD 22-32 (supuesto, depende de Ikigai cross-sell cuando este disponible) |

### 11.5 Tecnico-operativo

| Metrica | Objetivo |
|---|---|
| TTFB landing y checkout | ≤500 ms p95 |
| Item-to-item render | ≤150 ms p95 |
| Generacion de reporte | ≤3 s p95 |
| Error rate checkout | ≤0.2% |
| Tasa de fallo Stripe | ≤1% (incluye declines bancarios) |

---

## 12. NFRs aplicables especificos Paid

Subset de A2. Todos los NFRs del Free aplican (Paid hereda). Adicionalmente:

| NFR adicional Paid | Descripcion |
|---|---|
| **NFR-S Pagos** | Integracion Stripe en modo PCI-compliant. No almacenar PAN en DescubreMe. Tokens via Stripe Elements. |
| **NFR-Priv Pagos** | Datos de facturacion (nombre, direccion si aplica IVA) cifrados en reposo. Logs de transaccion para conciliacion. |
| **NFR-Auditoria Stripe** | Audit log inmutable de eventos Stripe (charge.succeeded, refunded, failed). Webhook idempotente. |
| **NFR-Performance reporte denso** | Reporte Paid es 10-15x mas grande que Free. Lazy loading de secciones colapsables. PDF generado on-demand con worker async. |
| **NFR-O Tracking comercial** | Eventos comerciales: `paid_landing_view`, `paid_checkout_started`, `paid_purchase_completed`, `paid_refund_requested`, `upgrade_purchased`, `ikigai_addon_purchased`. |
| **NFR-Compliance facturacion** | Generacion de comprobante / factura segun regulacion Colombia y Mexico (depende razon social — OQ-3). |

---

## 13. Compliance y consentimiento Paid

Hereda de Free toda la base de consentimiento. Adicionalmente:

### 13.1 Consentimientos especificos Paid

- **Consentimiento producto Paid v1.0**: ampliacion del consentimiento Free para cubrir los 14 instrumentos adicionales + manejo de datos de facturacion + retencion comercial.
- **Acuerdo de servicio Paid**: terminos comerciales (refund 30d, derechos de cliente, limitaciones de uso).

### 13.2 Datos sensibles adicionales en Paid

Mas instrumentos con `ethical_flags = emotional_distress`:

| Instrumento Paid (no en Free) | Constructo sensible |
|---|---|
| MEMS | Mattering bajo |
| PANAS | Negative Affect (10 items) |
| BPNSFS | Frustracion de necesidades |
| Posiblemente CFI-R | Negative Career Outlook |

Todos disparan NFR-27 + NFR-28 segun umbrales.

### 13.3 Manejo de datos de facturacion

- Stripe es el procesador. DescubreMe no almacena PAN, CVV ni numeros completos de tarjeta.
- Datos de facturacion (nombre, email, opcional direccion si aplica IVA) viven en tablas separadas con cifrado en reposo.
- Retencion fiscal: segun obligacion contable Colombia (general 5 anos, validar con asesor). NO eliminar datos fiscales aun si el usuario ejerce derecho de eliminacion del resto.

### 13.4 Reporte de licencias

5 instrumentos del Paid no estan en Free y requieren reporte mensual a titular: VIA-IS-P (VIA Institute), PANAS (APA), MEMS (Routledge/autores), BPNSFS (CSDT), WOLF (Bakker). Mas los del stack v2.0 (PVQ-RR, MLQ, WAMI, Ryff, FSS-9, CAAS) segun el acuerdo con cada titular.

---

## 14. Riesgos especificos Paid

Subset de A5 + nuevos del Paid.

| ID | Riesgo | Impacto en Paid | Mitigacion |
|---|---|---|---|
| R-01 | Licencia BFI-2 | Bloquea Paid completo (BFI-2-S es bloque 1) | Plan B HEXACO-60 como core (cambio mayor de scope) |
| R-02 | Licencia VIA-IS-P | Bloquea bloque 4 | Plan B IPIP-VIA-R dominio publico (perdida de comparabilidad) |
| R-04 (extendido) | Licencias PANAS, PERMA, MEMS, CFI-R | Cada una bloquea su bloque correspondiente | Plan B por instrumento documentado en A3 |
| R-05 | Ley 1581 sin asesor | Bloquea lanzamiento | Contratar pre-Sprint 1 |
| R-11 | Completion bajo por fatiga | **Critico para Paid** (95-130 min) | Save & resume + 9 bloques con descansos + emails recordatorio + microcopy de progreso |
| R-13 | Quality validator mal calibrado | Falsos positivos bloquean reporte | Umbrales conservadores + recalibracion Sprint 6 |
| R-15 | Consentimiento granular inadecuado | Riesgo legal | Asesor legal valida templates |
| R-16 | Fallo NFR-28 en instrumento sensible | Critico (mas instrumentos sensibles que Free) | Alertas operativas + tests del Distress Detector en CI |
| R-17 | Implementation packs cuello de botella | Bloquea Sprints 4-9 | Cowork debe entregar 13 packs (los 14 nuevos vs Free, menos los ya listos) antes de cada sprint que los necesita |
| **R-Paid-1** (NUEVO) | Refund rate >5% sostenido | Erosiona margenes + senal de problema | Monitorear semanal, segmentar por causa, ajustar onboarding o expectativas si causa es "no era lo que esperaba" |
| **R-Paid-2** (NUEVO) | Conversion Free→Paid <3% en 30d | Funnel comercial no viable | Iterar copy CTA, secuencia de emails, pricing test |
| **R-Paid-3** (NUEVO) | AOV cae si conversion upgrade <5% | Erosiona unit economics | Revisar timing/pricing de upgrades. Considerar bundle. |
| **R-Paid-4** (NUEVO) | Stripe falla o disputa de pago alta | Bloquea revenue + riesgo de chargeback | Webhook idempotente + alertas + cuenta backup processor (decision pendiente) |

---

## 15. Gates de release Paid

Paid no lanza sin estos 3 gates simultaneos cerrados.

### Gate 1 — Psicometrico

- [ ] Cada uno de los 18 instrumentos cumple alpha/omega ≥0.70 en muestra LATAM real n≥200.
- [ ] CFA con CFI≥0.90 y RMSEA≤0.08 en instrumentos multidimensionales (BFI-2-S, VIA-IS-P, PVQ-RR, Ryff PWB, BPNSFS, PERMA).
- [ ] Baremos cargados para CO y MX (o INTL como fallback con disclaimer).
- [ ] Quality validator activo con umbrales por instrumento.
- [ ] Scoring rules auditadas vs publicaciones originales.

### Gate 2 — Compliance

- [ ] Consent template Paid producto v1.0 firmado por asesor legal.
- [ ] Acuerdo de servicio Paid firmado por asesor legal.
- [ ] NFR-27 activo en 5-6 instrumentos sensibles.
- [ ] NFR-28 ruta de contencion configurada con umbrales por instrumento + lineas Colombia.
- [ ] Cifrado en reposo verificado.
- [ ] Politica fiscal y de retencion contable definida con asesor.
- [ ] Revision legal externa firmada y archivada.

### Gate 3 — Licencia

- [ ] Acuerdos firmados para: Soto-John (BFI-2), VIA Institute (VIA-IS-P), APA (PANAS), Routledge+autores (MEMS), CSDT (BPNSFS, W-BNS), Bakker (WOLF), Rottinghaus (CFI-R), UPenn+Wellbeing Lab (PERMA).
- [ ] Confirmacion uso comercial: Diener Ed. Fund (SWLS, Flourishing), Steger (MLQ, WAMI), Ryff (PWB), Engeser-Rheinberg (FSS-9), Savickas (CAAS), Schwartz (PVQ-RR).
- [ ] Atribucion completa en footer del reporte para los 18 + 3 upgrades.
- [ ] `usage_log` activo + export CSV mensual a cada titular pactado.

### Gate adicional — Comercial

- [ ] Integracion Stripe verificada en sandbox + produccion.
- [ ] Refund process funcional self-service + via soporte.
- [ ] Politica de precios COP/MXN aprobada.
- [ ] Cumplimiento facturacion (factura electronica, IVA) verificado con contador.

---

## 16. Dependencias y bloqueadores

| Dependencia | Owner | Estado | Sprint que la necesita |
|---|---|---|---|
| Implementation pack BFI-2-S | Cowork | Listo | Sprint 3 |
| Implementation packs de los 14 instrumentos nuevos Paid | Cowork | Pendiente | Sprints 2-9 segun bloque |
| Acuerdo licencia BFI-2 | German | Pendiente | Sprint 3 |
| Acuerdo licencia VIA-IS-P | German | Pendiente | Sprint 4 |
| Acuerdos PANAS, PERMA, MEMS, CFI-R, BPNSFS, WOLF | German + Cowork | Pendiente | Sprints 6-9 |
| Asesor legal Ley 1581 contratado | German | Pendiente | Pre-Sprint 1 |
| Integracion Stripe + cuenta de procesador | German + Claude Code | Pendiente | Sprint 5-6 |
| Decision sobre razon social Colombia (para facturacion) | German | Pendiente | Pre-Sprint 5 |
| Microcopy de bandas para los 18 instrumentos (3 textos por faceta) | Cowork UX Writer | Pendiente | Sprints 3-9 |
| Microcopy del reporte Paid (sintesis, recomendaciones, atribuciones) | Cowork UX Writer | Pendiente | Sprint 2-9 |
| Algoritmo de mapeo O*NET especificado | Cowork rol Investigador + Claude Code | Pendiente — spec funcional | Sprint 1-2 |
| Dossier IPIP-NEO-120 enriquecido | Cowork rol Investigador | Pendiente | Pre-Sprint 11 (para upgrade) |
| Region hosting Supabase decidida | German | Pendiente | Pre-Sprint 0 |
| Pricing research COP/MXN | German + Cowork rol Estratega | Pendiente | Sprint 6 |
| Pricing upgrades + bundle | German + Cowork | Pendiente | Pre-Sprint 11 |
| Politica fiscal/contable Colombia y Mexico | German + asesor contable | Pendiente | Pre-Sprint 5 |

---

## 17. Open questions / decisiones pendientes

| # | Pregunta | Cuando decidir | Quien decide |
|---|---|---|---|
| OQ-1 | Pricing test USD 14 / 19 / 24 en Colombia | Sprint 6 | German + Cowork rol Estratega |
| OQ-2 | Pricing del bundle "Personalidad completa" (3 upgrades) | Pre-Sprint 11 | German + Cowork |
| OQ-3 | Razon social Colombia + politica fiscal | Pre-Sprint 5 | German + contador |
| OQ-4 | Flexibilizar orden de bloques (vs secuencial obligatorio) en v1.6 | Sprint 10 con datos de dropoff por bloque | Cowork UX + PM |
| OQ-5 | Pricing Ikigai Premium add-on | Pre-Sprint 11 | German + Cowork |
| OQ-6 | Compartir reporte completo en redes (decision tambien diferida en Free) | Sprint 10 | German + Cowork PM |
| OQ-7 | Permitir al usuario "marcar ocupaciones de interes" en seccion F para refinar reporte | Sprint 11 si Ikigai entra | Cowork PM |
| OQ-8 | Backup processor de pagos (en caso de Stripe falla / disputa alta) | Sprint 8 si R-Paid-4 se materializa | German + Claude Code |
| OQ-9 | Plan de pago de B2B-A: usuarios individuales en B2B reciben Paid sin costo individual? | Pre-Sprint 7 | German + Cowork |
| OQ-10 | Politica de re-toma de instrumentos individuales (cuanto cuesta, cuantas veces) | Sprint 10 | German + Cowork |
| OQ-11 | Plan anual con re-acceso + alertas (subscripcion) en v1.6 | Q1 2028 con datos de re-toma reales | German |

---

## 18. Changelog del PRD

| Version | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-05-13 | Cowork rol PM + German | Version inicial. Decisiones DD-25 (3 upgrades en v1.5), DD-26 (Paid independiente de Free), DD-27 (9 bloques tematicos secuenciales), DD-28 (upgrades despues del reporte), DD-29 (refund 30 dias sin preguntas). |

---

*Fin del PRD_B2C_Paid_v1.5 v1.0. Documento vivo. Actualizar al cierre de cada sprint que toque Paid o cuando aparezcan datos reales que cambien decisiones de diseno. Cualquier cambio relevante debe registrarse en este changelog y en `01_estado/DECISIONS_LOG.md`.*
