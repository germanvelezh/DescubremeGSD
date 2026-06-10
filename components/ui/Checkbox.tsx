/**
 * Checkbox — Consent dual-checkbox component (Plan 01-07 Task 3).
 *
 * Per UI-SPEC §6.3:
 *  - 20x20px visual box, 44x44px hit area (padding invisible).
 *  - Label REQUIRED + full text visible (NO link-as-label per COMPL-01).
 *  - Optional helper text below the label.
 *  - ARIA: <input type="checkbox" id> + <label htmlFor> + aria-describedby
 *    pointing at the helper id when present.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §6.3 (Checkbox spec).
 *  - 01-CONTEXT.md D1.2 (dual checkbox separados).
 *  - COMPL-01 (DOS checkboxes, no master).
 */
"use client";

interface CheckboxProps {
  label: string;
  helperText?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  required?: boolean;
  name: string;
  id: string;
}

export function Checkbox({
  label,
  helperText,
  checked,
  onChange,
  required,
  name,
  id,
}: CheckboxProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  return (
    <div className="flex items-start gap-2 py-2">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        aria-describedby={helperId}
        className="mt-1 h-5 w-5 cursor-pointer appearance-none rounded border border-border-default bg-secondary checked:border-accent checked:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        style={{ minWidth: 20, minHeight: 20 }}
      />
      <div className="flex flex-1 flex-col">
        <label
          htmlFor={id}
          className="cursor-pointer text-sm text-text-primary leading-snug"
        >
          {label}
        </label>
        {helperText ? (
          <p id={helperId} className="mt-1 text-xs text-text-secondary leading-snug">
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
}
