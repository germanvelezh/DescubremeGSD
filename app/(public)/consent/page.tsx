/**
 * /consent — Legal consent text page (Plan 01-07 Task 3).
 *
 * Server Component that reads the current consent markdown shipped at
 * `lib/consent/text/<version>.md` and renders it as semantic HTML.
 *
 * El parseo vive en `lib/consent/markdown.ts` para que sea testeable: la
 * integridad del texto renderizado contra el `.md` fuente esta cubierta por
 * `tests/unit/consent-markdown.test.ts`. Esta pagina solo mapea bloques a
 * JSX. Sigue siendo un parser minimo (no MDX/remark), acotado a la
 * gramatica que el documento usa.
 *
 * Anchors:
 *  - 01-UI-SPEC.md (consent page reference).
 *  - 01-CONTEXT.md D1.3, D1.8 (es-CO only Phase 1).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parseConsentMarkdown } from "@/lib/consent/markdown";
import { CURRENT_CONSENT_VERSIONS } from "@/lib/consent/versions";

import { BackLink } from "./_components/BackLink";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN = /^www\.[^\s/]+$/;

/**
 * Los code spans del documento no son codigo: son la direccion de contacto de
 * privacidad y la URL de queja ante la SIC. Se renderizan accionables — un
 * derecho que el usuario no puede ejercer con un texto que no se puede tocar
 * no esta realmente ofrecido.
 */
function renderCodeSpan(inner: string, key: number): React.ReactNode {
  const className = "font-mono text-[0.95em] underline";
  if (EMAIL.test(inner)) {
    return (
      <a key={key} href={`mailto:${inner}`} className={className}>
        {inner}
      </a>
    );
  }
  if (DOMAIN.test(inner)) {
    return (
      <a
        key={key}
        href={`https://${inner}`}
        rel="noreferrer"
        target="_blank"
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <code key={key} className="font-mono text-[0.95em]">
      {inner}
    </code>
  );
}

/** Inline renderer: `**bold**` → <strong>, `code` → <code> o enlace. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      // biome-ignore lint/suspicious/noArrayIndexKey: stable order from split
      return <strong key={idx}>{p.slice(2, -2)}</strong>;
    }
    if (p.length > 1 && p.startsWith("`") && p.endsWith("`")) {
      return renderCodeSpan(p.slice(1, -1), idx);
    }
    // biome-ignore lint/suspicious/noArrayIndexKey: stable order from split
    return <span key={idx}>{p}</span>;
  });
}

export default function ConsentLegalPage() {
  const version = CURRENT_CONSENT_VERSIONS.free;
  const filePath = join(process.cwd(), "lib", "consent", "text", `${version}.md`);
  const md = readFileSync(filePath, "utf8");
  const blocks = parseConsentMarkdown(md);

  // Ola 1.5: paper container reskin (`.dm-paper`). The legal markdown itself is
  // untouched (lib/consent/text/<version>.md) — only the frame changes.
  return (
    <main className="dm-paper flex min-h-[100dvh] w-full justify-center">
      <div className="w-full max-w-3xl px-6 py-10 motion-safe:animate-fade-in">
        <header className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-full border-2"
              style={{ borderColor: "var(--dm-terracotta)" }}
            />
            <span className="font-display text-xl text-text-primary">
              DescubreMe
            </span>
          </div>
          <BackLink fallbackHref="/signup" label="Volver" />
        </header>
        <article className="max-w-[68ch]">
          {blocks.map((block, idx) => {
            // biome-ignore lint/suspicious/noArrayIndexKey: stable document order
            const key = idx;
            switch (block.kind) {
              case "h1":
                return (
                  <h1
                    key={key}
                    className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-normal leading-tight text-text-primary"
                  >
                    {block.text}
                  </h1>
                );
              case "h2":
                return (
                  <h2
                    key={key}
                    className="mt-10 font-display text-2xl font-normal text-text-primary"
                  >
                    {block.text}
                  </h2>
                );
              case "ul":
                return (
                  <ul
                    key={key}
                    className="mt-2 list-disc pl-6 text-base text-text-primary"
                  >
                    {block.items.map((it) => (
                      <li key={it}>{renderInline(it)}</li>
                    ))}
                  </ul>
                );
              case "ol":
                return (
                  <ol
                    key={key}
                    className="mt-2 list-decimal pl-6 text-base text-text-primary"
                  >
                    {block.items.map((it) => (
                      <li key={it}>{renderInline(it)}</li>
                    ))}
                  </ol>
                );
              default:
                return (
                  <p
                    key={key}
                    className="mt-2 text-base text-text-primary leading-relaxed"
                  >
                    {renderInline(block.text)}
                  </p>
                );
            }
          })}
        </article>
        <p className="mt-8 text-xs text-text-secondary">
          Versión {version}. Esta es una versión preliminar, pendiente de
          revisión legal.
        </p>
      </div>
    </main>
  );
}
