/**
 * /consent — Legal consent text page (Plan 01-07 Task 3).
 *
 * Server Component that reads the current consent markdown shipped at
 * `lib/consent/text/<version>.md` and renders it as semantic HTML. The
 * markdown is structured prose (no MDX features needed) so a minimal
 * paragraph splitter suffices for Phase 1 — a real markdown renderer
 * (rehype/remark) lands in Plan 01-12 if needed.
 *
 * Deviation Rule 1: plan referenced "MDX o markdown-to-html" but the
 * MDX/markdown renderer is not in package.json. Substituting a
 * paragraph-and-heading splitter that handles the same structured
 * prose. Bullet items beginning with `-` or `*` are rendered as <li>.
 *
 * Anchors:
 *  - 01-UI-SPEC.md (consent page reference).
 *  - 01-CONTEXT.md D1.3, D1.8 (es-CO only Phase 1).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { CURRENT_CONSENT_VERSIONS } from "@/lib/consent/versions";

function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i]!.trimEnd();
    if (!line) {
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      nodes.push(
        <h1
          key={key++}
          className="mt-6 text-3xl font-semibold text-text-primary"
        >
          {line.slice(2)}
        </h1>,
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={key++}
          className="mt-6 text-xl font-semibold text-text-primary"
        >
          {line.slice(3)}
        </h2>,
      );
      i++;
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i]!.startsWith("- ") || lines[i]!.startsWith("* ") || lines[i]!.startsWith("  "))
      ) {
        const l = lines[i]!.trimStart();
        if (l.startsWith("- ") || l.startsWith("* ")) items.push(l.slice(2));
        i++;
      }
      nodes.push(
        <ul key={key++} className="mt-2 list-disc pl-6 text-base text-text-primary">
          {items.map((it) => (
            <li key={it}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    // Paragraph: consume contiguous non-blank, non-prefix lines.
    const paragraph: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i]!.trim() !== "" &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.startsWith("- ") &&
      !lines[i]!.startsWith("* ")
    ) {
      paragraph.push(lines[i]!.trimEnd());
      i++;
    }
    nodes.push(
      <p key={key++} className="mt-2 text-base text-text-primary leading-relaxed">
        {renderInline(paragraph.join(" "))}
      </p>,
    );
  }
  return nodes;
}

/** Tiny inline renderer: **bold** → <strong>. Other inline markdown is rendered as-is. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, idx) =>
    p.startsWith("**") && p.endsWith("**") ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: stable order from split
      <strong key={idx}>{p.slice(2, -2)}</strong>
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: stable order from split
      <span key={idx}>{p}</span>
    ),
  );
}

export default function ConsentLegalPage() {
  const version = CURRENT_CONSENT_VERSIONS.free;
  const filePath = join(process.cwd(), "lib", "consent", "text", `${version}.md`);
  const md = readFileSync(filePath, "utf8");
  const rendered = renderMarkdown(md);

  // Ola 1.5: paper container reskin (`.dm-paper`). The legal markdown itself is
  // untouched (lib/consent/text/<version>.md) — only the frame changes.
  return (
    <main className="dm-paper flex min-h-[100dvh] w-full justify-center">
      <div className="w-full max-w-3xl px-6 py-10">
        <a
          href="/signup"
          className="text-sm text-text-secondary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Volver
        </a>
        <article>{rendered}</article>
        <p className="mt-8 text-xs text-text-secondary">
          Version {version}. Esta es una version preliminar pendiente de
          revision por Cowork (
          <code>[GAP-CONSENT-TEXT-V0.1]</code>) y por asesoria legal externa en Phase 7.
        </p>
      </div>
    </main>
  );
}
