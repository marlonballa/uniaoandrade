"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
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

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
