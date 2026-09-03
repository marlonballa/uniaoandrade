"use client";

import { useState } from "react";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq-data";

type FaqProps = {
  items?: FaqItem[];
  eyebrow?: string;
  heading?: string;
  columns?: 1 | 2;
  moreLink?: { href: string; label: string };
  sectionId?: string;
};

export default function Faq({
  items = FAQ_ITEMS,
  eyebrow = "PERGUNTAS FREQUENTES",
  heading = "O que quem pesquisa Taekwondo mais pergunta",
  columns = 2,
  moreLink,
  sectionId = "faq",
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const mid = Math.ceil(items.length / columns);
  const displayColumns = columns === 2 ? [items.slice(0, mid), items.slice(mid)] : [items];

  return (
    <section id={sectionId} className="bg-surface px-6 py-24 sm:px-10 lg:px-18 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          {eyebrow}
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div
        className={`mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-x-14 ${
          columns === 2 ? "sm:grid-cols-2" : "max-w-[800px]"
        }`}
      >
        {displayColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col divide-y divide-line"
          >
            {column.map((item, i) => {
              const index = columnIndex === 0 ? i : mid + i;
              const isOpen = openIndex === index;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${sectionId}-panel-${index}`}
                      id={`${sectionId}-trigger-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left font-sans text-[17px] font-semibold text-ink"
                    >
                      {item.q}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--red)"
                        strokeWidth="2.5"
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`${sectionId}-panel-${index}`}
                    role="region"
                    aria-labelledby={`${sectionId}-trigger-${index}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 font-sans text-[15px] leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {moreLink ? (
        <div className="mx-auto mt-8 max-w-[1200px] text-center">
          <a href={moreLink.href} className="font-sans text-sm font-semibold text-red hover:text-red-deep">
            {moreLink.label}
          </a>
        </div>
      ) : null}
    </section>
  );
}
