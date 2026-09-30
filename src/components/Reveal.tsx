"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered reveal (fade + rise) usable inside Server Components.
 *
 * Content is always visible in the server-rendered HTML. After mount, only elements that
 * start below the fold are hidden and then revealed as they scroll into view, so hero
 * content (the LCP element) is never hidden and nothing disappears if JS fails to load.
 * Reduced motion is honoured in CSS (see `.reveal-pending` in globals.css).
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  id,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger index; each step adds 80ms. */
  delay?: number;
  className?: string;
  /** Anchor id (e.g. for #email-api deep links). */
  id?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // Already on screen (or above it): leave it visible, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.setProperty("--reveal-delay", `${delay * 80}ms`);
    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref as React.Ref<never>} id={id} className={className}>
      {children}
    </Tag>
  );
}
