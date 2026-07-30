/**
 * CI lint gate COMPL-18 + UX-01 + UX-02 — prohibited phrases regex sweep.
 *
 * Scans user-facing microcopy / narrative templates / consent text for
 * patterns defined in `lib/lint/prohibited-phrases.ts`. Fails PR when any
 * match is found. Implements:
 *
 *   - COMPL-18 — Frases prohibidas regex bloquea PR.
 *   - UX-01    — Microcopy es-CO sin "vosotros"/"ordenador"/"coger".
 *   - UX-02    — Tono sin urgencia + glosario activo.
 *
 * Scan surface (per UI-SPEC §8.2 + RESEARCH lineas 1398):
 *   - `lib/i18n/microcopy/**` (Phase 1 microcopy files, TS literals)
 *   - `db/seeds/narrative-templates/**` (RIASEC narrative SQL VALUES)
 *   - `lib/consent/text/**` (consent body markdown)
 *
 * Phase 1 reality (HISTORICO — ya no aplica): estos directorios podian no
 * existir todavia (el microcopy aterrizaba de a poco en Waves 2-5; las
 * narrative templates eran entregable de Cowork), y el test pasaba
 * VACUAMENTE cuando ningun archivo matcheaba. Eso era el comportamiento
 * buscado en Wave 0.
 *
 * Desde 2026-07-29 NO lo es: los 5 SCAN_DIRS existen y estan poblados, y el
 * test afirma `filesScanned > 0` (ADR-040, mecanismo 4). Un pase vacuo pasa
 * de comportamiento esperado a FALLA — si un SCAN_DIR se renombra, este gate
 * tiene que enrojecer en vez de aprobar en silencio.
 *
 * Markdown skip rule: lines starting with `#` (headings) are exempt so
 * that documentation headings like "## Ansiedad" do not trip the
 * anti-clinico regex when used inside a "no es clinico" body (the body
 * itself is sanitized by the regex; headings are structural).
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";

import { PROHIBITED_PATTERNS } from "@/lib/lint/prohibited-phrases";

const PROJECT_ROOT = join(__dirname, "..", "..");

// Wave 7 (Plan 01-11) — scope final: anadir db/seeds/occupations al scan.
// Las ocupaciones LATAM contienen titulos + descripciones cortas user-facing
// que el reporte muestra (RESEARCH.md §occupation-selector). El gate aplica
// igual que en narrative templates. Cuando Cowork entrega
// `[GAP-ONET-OCCUPATIONS-LATAM]` y/o `[GAP-RIASEC-NARRATIVES-ES-CO]`, este
// gate verifica anti-determinismo + frases prohibidas sobre el seed final.
// existsSync() ya gracefully skip si el directorio no contiene .sql.
// Phase 2 (Plan 02-02) — HARD GATE D-D.4 / UI-SPEC §8.2: el lint clinico debe
// grabar narrative-templates + integrator-rule + microcopy ANTES del 1er
// reporte sensible (BFI-2-S / PERMA). microcopy y narrative-templates ya estaban
// en scope; se agrega db/seeds/integrator-rule (plantillas teaser). existsSync()
// gracefully skip mientras el directorio no exista (mismo patron Phase 1).
const SCAN_DIRS = [
  "lib/i18n/microcopy",
  "db/seeds/narrative-templates",
  "db/seeds/integrator-rule",
  "db/seeds/occupations",
  "lib/consent/text",
];

const ALLOWED_EXTENSIONS = [".ts", ".tsx", ".sql", ".md"];

const EXCLUDE_SEGMENTS = ["node_modules", ".next", "db/seeds/mocks"];

interface Violation {
  file: string;
  line: number;
  text: string;
  reason: string;
  pattern: string;
}

/** Devuelve cuantos archivos se examinaron de verdad (ver no-vacuidad abajo). */
function walk(dir: string, violations: Violation[]): number {
  if (!existsSync(dir)) return 0;
  let filesScanned = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    const rel = relative(PROJECT_ROOT, fullPath);
    if (EXCLUDE_SEGMENTS.some((seg) => rel.includes(seg))) continue;

    if (entry.isDirectory()) {
      filesScanned += walk(fullPath, violations);
      continue;
    }

    if (!ALLOWED_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) continue;

    filesScanned++;
    const content = readFileSync(fullPath, "utf8");
    const isMarkdown = entry.name.endsWith(".md");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      // Skip markdown headings (structural, not user-facing copy).
      if (isMarkdown && /^\s*#/.test(line)) return;
      for (const pattern of PROHIBITED_PATTERNS) {
        if (pattern.regex.test(line)) {
          violations.push({
            file: rel,
            line: i + 1,
            text: line.trim(),
            reason: pattern.reason,
            pattern: pattern.regex.source,
          });
        }
      }
    });
  }
  return filesScanned;
}

describe("COMPL-18 + UX-01 + UX-02: prohibited phrases", () => {
  test("microcopy / narratives / consent text contain zero prohibited matches", () => {
    const violations: Violation[] = [];
    let filesScanned = 0;
    for (const dir of SCAN_DIRS) {
      filesScanned += walk(join(PROJECT_ROOT, dir), violations);
    }

    if (violations.length > 0) {
      const formatted = violations
        .map(
          (v) =>
            `  ${v.file}:${v.line}: ${v.text}\n    -> ${v.reason}\n    pattern: ${v.pattern}`,
        )
        .join("\n");
      throw new Error(
        `Prohibited phrases found. See lib/lint/prohibited-phrases.ts.\n${formatted}`,
      );
    }

    expect(violations).toEqual([]);

    // No-vacuidad (ADR-040, mecanismo 4). `expect(violations).toEqual([])` es
    // una asercion incondicional y CORRECTA, pero se evalua sobre un
    // acumulador: `walk` hace `if (!existsSync(dir)) return`, asi que si un
    // SCAN_DIR se renombra en un refactor este gate pasa habiendo examinado
    // CERO archivos. Verificado por inyeccion: apuntando PROJECT_ROOT a una
    // ruta inexistente, este test reportaba `6 passed` en 3ms.
    //
    // NO lo cubre el gate 16 (`no-hollow-tests.test.ts`), que busca *ausencia
    // de asercion sustantiva* — aca la asercion existe; lo vacio es el INSUMO.
    // Mismo patron que `policiesChecked` en `rls-policies-syntax.test.ts`.
    //
    // OJO con el docstring de arriba ("The test passes vacuously when no
    // source files match — that's the intended Wave 0 behavior"): eso era
    // cierto en Wave 0 y dejo de serlo cuando los 5 SCAN_DIRS existen. Se
    // corrigio ahi mismo; dejarlo habria dejado escrita como intencion la
    // vacuidad que este contador prohibe.
    expect(filesScanned).toBeGreaterThan(0);
  });

  test("PROHIBITED_PATTERNS has at least 10 entries covering UI-SPEC §8.2 categories", () => {
    expect(PROHIBITED_PATTERNS.length).toBeGreaterThanOrEqual(10);
  });

  // ---- HARD GATE D-D.4 positive controls (Plan 02-02) -----------------------
  // El gate clinico debe estar VIVO antes de que existan los seeds sensibles.
  // Si estas afirmaciones fallan, el reframe "Sensibilidad emocional" no esta
  // protegido y un reporte BFI-2-S/PERMA podria shippear lexico clinico.
  function matchCount(input: string): number {
    return PROHIBITED_PATTERNS.filter((p) => p.regex.test(input)).length;
  }

  test("clinical regex DETECTS clinical labels (D-D.4 gate is live)", () => {
    expect(matchCount("tu nivel de neuroticismo es alto")).toBeGreaterThanOrEqual(1);
    expect(matchCount("tu bienestar es bajo")).toBeGreaterThanOrEqual(1);
    expect(matchCount("el resultado es depresivo")).toBeGreaterThanOrEqual(1);
    expect(matchCount("PANAS afecto negativo")).toBeGreaterThanOrEqual(1);
  });

  // ---- D3.3 re-anclado como pin semantico (ADR-037) -------------------------
  //
  // D3.3 dejo de ser un pin de igualdad exacta sobre
  // `MC_REPORT_OCCUPATIONS_HEADING` y paso a vivir en los patrones (d). Este
  // test es la razon de ser del cambio: el pin viejo se pudrio EN SILENCIO
  // porque nadie probaba que siguiera vigilando algo. Re-anclarlo sin una
  // prueba de deteccion habria reproducido el mismo defecto con otra forma.
  test("D3.3 semantic pin DETECTS deterministic occupation copy (ADR-037)", () => {
    // Las formas que el patron viejo NO cubria (solo carrera/profesion/trabajo)
    // y que aplican justo a la seccion de ocupaciones.
    expect(matchCount("tu campo ideal es la ingenieria")).toBeGreaterThanOrEqual(1);
    expect(matchCount("tu área ideal")).toBeGreaterThanOrEqual(1);
    expect(matchCount("tu sector ideal")).toBeGreaterThanOrEqual(1);
    expect(matchCount("tu vocación es la docencia")).toBeGreaterThanOrEqual(1);
    expect(matchCount("naciste para esto")).toBeGreaterThanOrEqual(1);
    // Y las que ya cubria, que no deben perderse en el cambio de regex.
    expect(matchCount("tu carrera ideal")).toBeGreaterThanOrEqual(1);
    expect(matchCount("tu profesión ideal")).toBeGreaterThanOrEqual(1);
  });

  test("D3.3 semantic pin does NOT flag the live occupations copy (ADR-037)", () => {
    // Control negativo: el encabezado vigente y el disclaimer del reveal de
    // nivel tienen que pasar. Sin esto, el test de arriba solo probaria que el
    // regex matchea algo, no que discrimina.
    expect(matchCount("Campos que podrían resonar contigo")).toBe(0);
    expect(
      matchCount("Estas son áreas donde gente con un perfil como el tuyo suele encontrar sentido"),
    ).toBe(0);
    expect(matchCount("Lo puedes cambiar después")).toBe(0);
  });

  // ---- Fase 3 (Plan 03-01): voseo rioplatense + palancas del Paid ----------
  //
  // Hard Gate del ROADMAP §Phase 3: "ningun texto sembrado viola COMPL-18 ni
  // introduce voseo rioplatense". El glosario se amplia ANTES de que exista el
  // primer texto del Paid — una vez sembrados los ~180 narrative_template y los
  // 45 textos de faceta del BFI, el gate llega tarde.
  //
  // Los casos se afirman contra CADENAS LITERALES aqui, NO plantando una
  // violacion bajo SCAN_DIRS: un archivo con voseo bajo `lib/i18n/microcopy`
  // pondria el gate genuinamente en rojo (es literalmente lo que prohibe), asi
  // que "sembrar el caso" y "pasar el gate" son incompatibles. Es la misma
  // convencion que los controles D-D.4 y D3.3 de arriba.
  test("voseo rioplatense IS flagged (CLAUDE.md §13 / Hard Gate Fase 3)", () => {
    expect(matchCount("Ya llevás 113 ítems hechos")).toBeGreaterThanOrEqual(1);
    expect(matchCount("¿Cómo te sentís con este resultado?")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Pensá en la última semana")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Podés parar cuando quieras")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Asumís riesgos con facilidad")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Mantenés la calma")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Tenés dos instrumentos pendientes")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Querés agregar algo más")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Esto es sobre vos")).toBeGreaterThanOrEqual(1);
  });

  test("la forma de TUTEO equivalente NO se marca (control negativo del voseo)", () => {
    // Sin este control el test de arriba solo probaria que el regex matchea
    // algo. El discriminante es la tilde: `llevas` es es-CO valido, `llevás` no.
    expect(matchCount("Ya llevas 113 ítems hechos")).toBe(0);
    expect(matchCount("¿Cómo te sientes con este resultado?")).toBe(0);
    expect(matchCount("Piensa en la última semana")).toBe(0);
    expect(matchCount("Puedes parar cuando quieras")).toBe(0);
    expect(matchCount("Asumes riesgos con facilidad")).toBe(0);
    expect(matchCount("Mantienes la calma")).toBe(0);
    expect(matchCount("Tienes dos instrumentos pendientes")).toBe(0);
    expect(matchCount("Quieres agregar algo más")).toBe(0);
  });

  test("palancas de urgencia y de costo hundido del paywall SON marcadas (D-22)", () => {
    // Costo hundido — rechazado explicitamente en el discuss (D-22).
    expect(matchCount("No pierdas lo que ya respondiste")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Ya invertiste 40 minutos")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Aprovecha lo que llevas hecho")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Estás a un paso de tu perfil")).toBeGreaterThanOrEqual(1);
    // Urgencia artificial (AF-06 / ADR-030 D6).
    expect(matchCount("Solo quedan 3 cupos")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Últimas horas para acceder")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Precio por tiempo limitado")).toBeGreaterThanOrEqual(1);
    expect(matchCount("12 personas viendo esta página")).toBeGreaterThanOrEqual(1);
    // Ancla de descuento falsa.
    expect(matchCount("-40% de descuento")).toBeGreaterThanOrEqual(1);
    // Tiempos deshonestos sobre un stack de ~95 min (principio 8).
    expect(matchCount("Solo te toma un rato")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Apenas 10 minutos")).toBeGreaterThanOrEqual(1);
    // Determinismo vocacional / prediccion de exito (CLAUDE.md §8).
    expect(matchCount("Deberías dedicarte a la docencia")).toBeGreaterThanOrEqual(1);
    expect(matchCount("Vas a tener éxito en ventas")).toBeGreaterThanOrEqual(1);
  });

  test("el copy honesto equivalente NO se marca (control negativo de las palancas)", () => {
    // Las cadenas v0.1 de 03-UI-SPEC.md §Copywriting Contract que este plan
    // siembra. Si alguna de estas se marcara, el glosario seria inservible:
    // bloquearia el copy que el propio contrato exige.
    expect(matchCount("Tu perfil profundo")).toBe(0);
    expect(matchCount("Puedes hacerlo en varios ratos: cada respuesta se guarda sola.")).toBe(0);
    expect(
      matchCount("Después de pagar entras directo al primer instrumento. No hay suscripción ni cobros siguientes."),
    ).toBe(0);
    expect(matchCount("Ya respondiste 113 de estos ítems en el Free.")).toBe(0);
    expect(matchCount("96 ítems en total, unos 45 minutos.")).toBe(0);
    expect(matchCount("Listo, ya lo tienes")).toBe(0);
  });

  // ---- Negation controls (must_haves: negations NOT false-flagged) ----------
  // La copy de negacion (disclaimer "no es clinico") y la ruta de contencion
  // NFR-28 deben pasar. El lookbehind variable salta "no es depresivo".
  test("negation / NFR-28 contention copy is NOT flagged by the clinical regex", () => {
    const clinicalEntry = PROHIBITED_PATTERNS.find(
      (p) => p.regex.source.includes("depresiv[oa]"),
    );
    expect(clinicalEntry).toBeDefined();
    expect(clinicalEntry!.regex.test("esto no es depresivo")).toBe(false);
    expect(clinicalEntry!.regex.test("no es ansioso")).toBe(false);
  });
});
