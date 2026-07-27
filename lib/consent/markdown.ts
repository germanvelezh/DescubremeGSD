/**
 * Parser del markdown de consentimiento (`lib/consent/text/<version>.md`).
 *
 * Vive fuera de la pagina para poder testear que el render no pierde
 * contenido. El parser anterior consumia las lineas de continuacion
 * indentadas de un bullet (`i++`) sin emitirlas nunca, y 7 lineas del
 * documento de autorizacion no llegaban a pantalla — entre ellas la mitad
 * de la promesa anti-seleccion (`fines de seleccion, contratacion o
 * evaluacion individual.`) y la URL de queja ante la SIC.
 *
 * Es un parser minimo a proposito: cubre exactamente la gramatica que usa
 * el documento (h1, h2, parrafo, lista con guion, lista numerada, `**bold**`
 * y code span), no markdown general. Si el documento crece en gramatica,
 * el test de integridad falla antes que el usuario vea texto faltante.
 */

export type ConsentBlock =
  | { kind: "h1" | "h2" | "p"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

const BULLET = /^[-*] /;
const ORDERED = /^\d+\. /;

/** Linea indentada que continua el item anterior (no abre uno nuevo). */
function isContinuation(raw: string): boolean {
  if (!/^\s+\S/.test(raw)) return false;
  const trimmed = raw.trimStart();
  return !BULLET.test(trimmed) && !ORDERED.test(trimmed);
}

function collectList(
  lines: string[],
  start: number,
  kind: "ul" | "ol",
): { block: ConsentBlock; next: number } {
  const marker = kind === "ul" ? BULLET : ORDERED;
  const items: string[] = [];
  let i = start;

  while (i < lines.length) {
    const raw = lines[i]!;
    if (!raw.trim()) break;
    const trimmed = raw.trim();

    if (marker.test(trimmed)) {
      items.push(trimmed.replace(marker, ""));
    } else if (isContinuation(raw) && items.length > 0) {
      items[items.length - 1] += ` ${trimmed}`;
    } else {
      break;
    }
    i++;
  }

  return { block: { kind, items }, next: i };
}

export function parseConsentMarkdown(md: string): ConsentBlock[] {
  const lines = md.split("\n");
  const blocks: ConsentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!.trimEnd();
    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ kind: "h2", text: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push({ kind: "h1", text: line.slice(2) });
      i++;
      continue;
    }

    if (BULLET.test(line) || ORDERED.test(line)) {
      const { block, next } = collectList(
        lines,
        i,
        BULLET.test(line) ? "ul" : "ol",
      );
      blocks.push(block);
      i = next;
      continue;
    }

    const paragraph: string[] = [line];
    i++;
    while (i < lines.length) {
      const raw = lines[i]!;
      if (!raw.trim()) break;
      const trimmed = raw.trimStart();
      if (
        trimmed.startsWith("#") ||
        BULLET.test(trimmed) ||
        ORDERED.test(trimmed)
      ) {
        break;
      }
      paragraph.push(raw.trim());
      i++;
    }
    blocks.push({ kind: "p", text: paragraph.join(" ") });
  }

  return blocks;
}
