/**
 * Reveal — scroll entrance for below-the-fold sections (motion-2, HANDOFF §2).
 *
 * SSR/first paint renders children fully visible: there is NO hidden state in
 * the markup, so SEO, assistive tech, E2E asserts and no-JS users always see
 * the content. After hydration it hides the box and reveals it (rise-in) on
 * first intersection ONLY when the element is still below the viewport, motion
 * is allowed, and IntersectionObserver exists — otherwise the wrapper is inert.
 */
"use client";

import { type ReactNode, useEffect, useRef } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("opacity-0");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0");
            el.classList.add("motion-safe:animate-rise-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
