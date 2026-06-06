/**
 * Smoke test page — Plan 01-02 Task 2.
 *
 * Purpose: exercise the Tailwind v4 `@theme` token surface from
 * 01-UI-SPEC §11.1 against the four primitives required by §11.2
 * (Button, Checkbox, RadioGroup, Disclosure). Resolves ADR-008.
 *
 * NOTE: This is intentionally hand-coded — not the production
 * primitive library. The `ui-ux-pro-max-skill` runs in the user's
 * Claude Code session and cannot be invoked from this sub-agent, so
 * we directly verify whether v4 utility classes resolve to
 * `var(--color-*)`, `var(--spacing-*)`, etc. Production primitives
 * arrive in a later UI wave; this file is the v4-vs-v3 evidence
 * gate, not the final UI.
 */
export default function SmokeTestPage() {
  return (
    <main className="mx-auto max-w-3xl p-lg">
      <h1 className="text-2xl font-semibold text-text-primary">
        Hola, mundo. DescubreMe.
      </h1>
      <p className="mt-md text-text-secondary">
        Smoke test de Tailwind v4 + @theme tokens (ADR-008). Cada
        primitivo de abajo debe pintar con la paleta de UI-SPEC §4 y
        el spacing de §2.
      </p>

      {/* 1. Button (primary) — token: --color-accent, --spacing-md */}
      <section className="mt-xl">
        <h2 className="text-lg font-semibold text-text-primary">
          1. Button
        </h2>
        <button
          type="button"
          className="mt-sm rounded-md bg-accent px-md py-sm font-semibold text-secondary transition-colors hover:bg-accent-muted hover:text-accent"
        >
          Empezar
        </button>
      </section>

      {/* 2. Checkbox — token: --color-border-default, --color-accent */}
      <section className="mt-xl">
        <h2 className="text-lg font-semibold text-text-primary">
          2. Checkbox
        </h2>
        <label className="mt-sm flex items-start gap-sm">
          <input
            type="checkbox"
            className="mt-1 size-5 rounded-sm border border-border-default accent-accent"
          />
          <span className="text-text-primary">Acepto</span>
        </label>
      </section>

      {/* 3. RadioGroup — 5 options, token: --spacing-sm */}
      <section className="mt-xl">
        <h2 className="text-lg font-semibold text-text-primary">
          3. RadioGroup (Likert 5pt)
        </h2>
        <fieldset className="mt-sm flex flex-col gap-sm">
          <legend className="sr-only">Smoke test radio group</legend>
          {[
            "Me gustaria mucho",
            "Me gustaria",
            "No estoy seguro",
            "No me gustaria",
            "No me gustaria nada",
          ].map((label, i) => (
            <label
              key={label}
              className="flex items-center gap-sm rounded-md border border-border-default bg-secondary p-sm"
            >
              <input
                type="radio"
                name="smoke-likert"
                value={5 - i}
                className="accent-accent"
              />
              <span className="text-text-primary">{label}</span>
            </label>
          ))}
        </fieldset>
      </section>

      {/* 4. Disclosure — token: --duration-fast */}
      <section className="mt-xl mb-2xl">
        <h2 className="text-lg font-semibold text-text-primary">
          4. Disclosure
        </h2>
        <details className="mt-sm rounded-md border border-border-default bg-surface-tertiary p-md">
          <summary className="cursor-pointer font-semibold text-text-primary">
            Ficha tecnica
          </summary>
          <p className="mt-sm text-text-secondary">
            Contenido expandible. Smoke test — el chevron y la
            transicion se aniden a `--duration-fast`/`--ease-standard`
            cuando la libreria final llegue.
          </p>
        </details>
      </section>
    </main>
  );
}
