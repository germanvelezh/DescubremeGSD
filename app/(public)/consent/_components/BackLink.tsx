/**
 * Volver de `/consent` a donde el usuario venia.
 *
 * `/consent` se alcanza desde cuatro sitios y solo uno es `/signup`: el
 * footer del reporte (x2) y `LevelCapture` la abren con sesion iniciada,
 * asi que el enlace fijo a `/signup` sacaba al usuario logueado a la
 * pantalla de registro. `router.back()` respeta el origen real; el
 * fallback cubre la pestana abierta directamente en esta URL.
 */
"use client";

import { useRouter } from "next/navigation";

export function BackLink({
  fallbackHref,
  label,
}: {
  fallbackHref: string;
  label: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallbackHref);
      }}
      className="text-sm text-text-secondary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {label}
    </button>
  );
}
