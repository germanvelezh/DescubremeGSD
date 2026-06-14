# Auditoría UX/UI — DescubreMe MVP

**Fecha:** 2026-06-14
**Autor:** Claude Code — [Rol: UX Researcher / UX Writer + Arquitecto de experiencia]
**Alcance auditado:** capa de experiencia visual del flujo B2C Free (landing, onboarding, loop de test, reporte, teaser integrado) + sistema de design tokens.
**Worktree:** `recursing-varahamihira-edf075` (aislado, en paralelo a `main`).
**Nota de método:** tu `CLAUDE.md` y `UX_EXPERIENCE_SPEC.md` §11.2 referencian `ui-ux-pro-max-skill` como sistema de diseño. Esa skill no está instalada en esta sesión; usé `frontend-design` (skill oficial de Claude Code) como equivalente. Sus principios coinciden con la intención de tu spec. Si querés que use la otra, instalala y reconstruyo sobre ella.

---

## 0. Resumen ejecutivo

`Hecho:` el problema no es que la app esté mal construida. Está bien construida y le falta, por completo, la capa de experiencia que el propio proyecto declaró como **diferenciador #1** ("experiencia clase mundial como requisito de primer orden", CLAUDE.md §2.4).

`Hecho:` las cinco pantallas del flujo Free son estructuralmente idénticas — una columna `max-w-3xl` centrada, un `h1` de 30px, párrafos apilados y un botón azul. No hay jerarquía dramática, ni tipografía con carácter, ni color con intención, ni composición, ni momentos. Es minimalismo por defecto, no por diseño.

`Opinión profesional:` tu instinto es correcto. Tal como está, la app no transmite ni rigor memorable ni delight; transmite "prototipo". La buena noticia: como los huesos (arquitectura, accesibilidad, ética, datos) son sólidos, el arreglo es **aditivo, no un rewrite**. Se cambia la piel y los momentos, no el motor.

Este documento entrega: el diagnóstico, y **tres direcciones de diseño** mockeadas como landings reales (ver los `.html` en esta carpeta) para que elijas viendo, no leyendo.

---

## 1. El reframe: qué está bien (no tocar) vs. qué falta

### Lo que es un activo y se conserva

| Área | Estado | Evidencia |
|---|---|---|
| Arquitectura de componentes | Sólida | Data-driven por metadata; visual registry por enum; cero instrumentos hardcodeados (`visual-registry.ts`, FOUND-05) |
| Accesibilidad | Real, no decorativa | `radiogroup` + `aria-live` + targets ≥44px + `prefers-reduced-motion` global (`globals.css`, `ItemForm.tsx`) |
| Ética / compliance | Bien integrada | NFR-27 (modal pre-test), NFR-28 (ruta de contención), sin dark patterns |
| i18n / microcopy | Limpia y separada | `lib/i18n/microcopy/es-CO/*` desacoplado de los componentes |
| Voz es-CO | Cuidada | Sin urgencia, sin clínico, sin exclamaciones |

`Inferencia:` este es el resultado de un desarrollo disciplinado guiado por GSD. Es la base sobre la que se construye la experiencia, no algo a reemplazar.

### Lo que falta (la capa de experiencia, diferenciador #1)

`Hecho, por dimensión de diseño:`

- **Tipografía sin carácter.** Solo Inter (`layout.tsx`). La propia skill de diseño nombra a Inter como aesthetic genérica de IA. No hay display face. Los `h1` van a 30px (`text-3xl`) — pequeños para un hero. Cero personalidad tipográfica.
- **Paleta tímida y genérica.** Off-white `#FAFAF7` + azul `#2E5BFF` + texto casi-negro (`globals.css`). Esa tripleta es la paleta por defecto de mil prototipos. El "10%" de acento (el azul) es color de stock, sin intención.
- **Composición inexistente.** Las 5 pantallas son la misma caja centrada. Cero asimetría, cero capas, cero ritmo, cero grid, cero jerarquía espacial.
- **Motion definido pero no usado.** Hay tokens (`--ease-emphasized`, `--duration-slow`) que casi no aparecen. El único movimiento real en todo el producto es un `fadeIn` en el teaser.
- **Sin atmósfera.** Fondos planos. Sin textura, profundidad ni momento visual en ninguna pantalla.
- **La data-viz, tu activo más diferenciable, está en nivel funcional.** `Inferencia (no leí cada componente a fondo):` el hexágono RIASEC, las barras y el circumplejo existen y funcionan, pero la spec dice que el visual del integrador "merece el mayor cuidado visual" (§11.2) — y se ven utilitarios, no hermosos.

---

## 2. Hallazgos por pantalla

| Pantalla | Archivo | Hallazgo |
|---|---|---|
| **Landing** | `app/(public)/page.tsx` | Bloque de texto centrado vertical y horizontal. "DescubreMe" es un `<p>`, no una marca. `h1` a 30px. Un botón con hover invertido (azul sólido → casi-blanco con texto azul: el CTA casi se funde con el fondo al pasar el mouse). Primera impresión = nula. |
| **Onboarding (before-you-start)** | `app/(b2c)/onboarding/.../page.tsx` | Patrón idéntico a la landing. Mismo `h1` 30px, misma columna, mismo botón. Cero sensación de "entrás a un recorrido". |
| **Loop del test** | `test/[code]/_components/ItemForm.tsx` | Accesible y correcto, pero el progreso ("X de Y") está en `sr-only` — el usuario **no ve su avance** (la spec §7 pide "progreso visible", "vas en X de Y"). Lo más prominente es el chip de auto-guardado. Sin sensación de conversación guiada; se siente formulario. |
| **Reporte (el "clímax")** | `reporte/[sessionId]/page.tsx` | Columna apilada de secciones de texto, listas con bullets `•`. **`[GAP - Cowork delivery: catalogo de ocupaciones LATAM pendiente]` se renderiza VISIBLE al usuario en producción.** El visual entra primero (bien), pero el resto es un documento, no un descubrimiento. |
| **Teaser integrado (conversión Free→Paid)** | `perfil-integrado/.../IntegratedTeaser.tsx` | El mejor de los cinco: tiene fade-in escalonado. Aun así, es texto en una columna sobre un panel `surface-tertiary`. El momento de "no me había visto así" no tiene peso visual. |

---

## 3. El gap contra tu propia visión

`Hecho:` `UX_EXPERIENCE_SPEC.md` define una experiencia ambiciosa y bien pensada — "magia" como criterio de aceptación, resultados "visual primero", el integrador como clímax con "constelación/arquetipo", motion con propósito, "datos como visual primero". La implementación actual cumple la **función** (psicometría, compliance, a11y) pero no la **experiencia** que la spec exige.

`Opinión profesional:` no es un fallo de ejecución; es trabajo que simplemente no se hizo todavía. La spec lo previó (§11.2 "handoff visual"). Este es ese handoff, pendiente.

---

## 4. Restricciones que cualquier dirección respeta (no negociables)

Heredadas de CLAUDE.md §8, UX_EXPERIENCE_SPEC §12 y la arquitectura actual:

1. **Sin manipulación:** cero urgencia, escasez, conteos regresivos, gamificación ansiosa, exclamaciones, emojis. El impacto viene de craft (tipo/color/composición/motion/dataviz), nunca de trucos de engagement.
2. **Accesibilidad WCAG AA:** contraste, foco, teclado, `prefers-reduced-motion`. Todo motion propuesto trae su guard.
3. **Voz es-CO sobria** y honestidad psicométrica (no determinismo, no predicción).
4. **No reescribir microcopy de producto:** es lane de Cowork. Los mockups usan el copy que ya existe.
5. **Respetar la cicatriz ADR-021:** el sistema de tokens Tailwind v4 (`--spacing`/`--container`) ya costó un bug de layout. Cualquier cambio de token se nombra explícitamente.

---

## 5. Tres direcciones de diseño (ver los mockups `.html`)

Cada una mueve la paleta fuera del stock, usa un display face que no es Inter, trae un momento de motion orquestado, y eleva la data-viz. Difieren en cuánto se alejan del estado actual — y por tanto en costo.

### Dirección A — "Papel y tinta" (editorial sereno)
- **Concepto:** un libro de psicología hermoso. El rigor se siente como serenidad editorial, calidez de papel premium.
- **Tipografía:** Fraunces (serif display cálido) + Hanken Grotesk (cuerpo).
- **Paleta:** crema papel + tinta cálida + acento terracota + salvia para datos. Adiós al azul de stock.
- **Momento:** el titular se revela línea por línea; el acento se subraya solo.
- **Data-viz:** líneas finas tinta sobre crema, áreas en salvia translúcido, etiquetas serif.
- **Footprint:** `globals.css` (tokens de color + 2 fuentes) + `layout.tsx` + ajuste de clases en pantallas. **Sin componentes nuevos.** Expresable en la arquitectura Tailwind v4 actual. **Costo: bajo. Riesgo: bajo.** El cheap win.

### Dirección B — "Cartografía interior" (atmosférico, constelación)
- **Concepto:** conocerte es trazar un mapa estelar. Se apoya en la metáfora de "constelación/arquetipo" que **tu propia spec** nombra como clímax del integrador (§10.2).
- **Tipografía:** Instrument Serif (display alto contraste, luminoso) + Hanken Grotesk.
- **Paleta:** nocturno índigo profundo, texto bruma, acentos oro tenue + cian estelar. (Dark sofisticado, **no** el cliché de gradiente morado.)
- **Momento:** las estrellas titilan, la constelación del hexágono RIASEC se dibuja al cargar.
- **Data-viz:** el hexágono **es** una constelación — vértices como estrellas, conexiones como líneas de luz. Aquí vive el mayor diferenciador.
- **Footprint:** tokens + fuentes + componente de fondo atmosférico + modo oscuro (cuidar contraste AA en los muchos textos legales) + re-trabajo de data-viz. **Costo: medio. Riesgo: medio** (contraste en oscuro, performance de motion).

### Dirección C — "Bloques de carácter" (editorial bold)
- **Concepto:** confianza por audacia. Tu perfil **son** números y patrones: hacelos protagonistas. Grids visibles, tipografía masiva, bloques de color plano.
- **Tipografía:** Archivo (grotesque expandido, pesado) + Hanken + JetBrains Mono para labels técnicos (refuerza lo psicométrico).
- **Paleta:** hueso + negro tinta + verde bosque dominante + coral de acento.
- **Momento:** los titulares suben por máscara; las barras crecen.
- **Data-viz:** barras como bloques arquitectónicos, números display gigantes.
- **Footprint:** tokens + fuentes + **composición nueva por pantalla** (no solo re-skin) + componentes. **Costo: alto. Riesgo: medio** (calibrar para que la audacia no lea como urgencia; "la calma comunica rigor", spec §11.1).

---

## 6. Recomendación

`Opinión profesional:`

- Si querés **el mayor impacto por el menor costo y riesgo**, y validar rápido que un cambio de piel basta para que deje de sentirse aburrida: **Dirección A**. Cabe en la arquitectura actual y se puede tener funcionando en el flujo completo pronto.
- Si querés **lo más memorable y diferenciador**, y estás dispuesto a invertir en data-viz y modo oscuro: **Dirección B**. Es la que más se apoya en lo que ya es único de tu producto (el cruce de dimensiones como constelación) y la que más probablemente genere el "wow".
- **C** es la apuesta de personalidad fuerte; quédatela si querés que el producto se vea distinto a todo "test online", aceptando más trabajo y más calibración para no perder la calma.

Camino sugerido: **elegí una dirección viendo los mockups**, la aplico primero a la **landing + onboarding** (barato, alto impacto, valida la dirección en código real), y desde ahí decidimos si seguimos al reporte y la data-viz (el verdadero clímax).

---

## 7. Próximos pasos (tras tu elección)

1. Elegís dirección (A/B/C o combinación) y alcance de la primera iteración.
2. Implemento los **design tokens** de esa dirección en `globals.css` + fuentes en `layout.tsx` (nombrando cualquier cambio que toque la zona ADR-021).
3. Rediseño **landing + onboarding** en código real, sobre la app, en este worktree.
4. Revisás en preview; iteramos.
5. Si convence, extendemos a **loop de test → reporte → teaser**, con foco especial en elevar la **data-viz** (el activo) y en hacer visible el **progreso** del test.

`Nota de alcance:` esto es la capa de experiencia. Es ortogonal a los bloqueadores técnicos de Phase 2 (`[GAP-INSTRUMENT-CODE-CASING]`, deploy a prod) que siguen su propio carril en `estado/STATUS.md`.
