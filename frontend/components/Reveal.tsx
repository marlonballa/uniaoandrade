"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  variant = "text",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "text" | "media";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = window.setTimeout(() => {
      el.classList.add("is-visible");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  const base = variant === "media" ? "reveal-media" : "reveal";

  return (
    <div ref={ref} className={className ? `${base} ${className}` : base}>
      {children}
    </div>
  );
}
