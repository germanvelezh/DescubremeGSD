/**
 * DateField — Date-of-birth picker (Plan 01-07 Task 3).
 *
 * Per UI-SPEC §6.7:
 *  - Mobile + desktop both use the native <input type="date"> for Phase 1
 *    (the spec's "three controlled fields" desktop variant is an
 *    enhancement; native input is accessible by default and bypasses
 *    locale-formatting bugs in custom masks).
 *  - Server-side validation (D2.4) is authoritative — client-side here
 *    is feedback only; the Server Action enforces 18+.
 *  - `max` is exposed so the caller can pass `today - 18years` as a
 *    soft client hint.
 *
 * Privacy: the value is never persisted to localStorage and is never
 * pre-filled from cookies. The DOB plaintext lives only in the form
 * payload + Supabase user_metadata (1h TTL) + Server Action body — see
 * T-01-07-03 threat note.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §6.7 (DateField spec).
 *  - 01-CONTEXT.md D2.4 (server-side age check).
 */
"use client";

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (next: string) => void;
  required?: boolean;
  max?: string;
  helperText?: string;
  errorText?: string;
  name: string;
  id: string;
}

export function DateField({
  label,
  value,
  onChange,
  required,
  max,
  helperText,
  errorText,
  name,
  id,
}: DateFieldProps) {
  const helperId = helperText && !errorText ? `${id}-helper` : undefined;
  const errorId = errorText ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="date"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        max={max}
        aria-invalid={Boolean(errorText) || undefined}
        aria-describedby={errorId ?? helperId}
        className="rounded-md border border-border-default bg-secondary px-md py-sm text-base text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ minHeight: 44 }}
      />
      {errorText ? (
        <p id={errorId} className="text-sm text-destructive">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
