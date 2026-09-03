"use client";

import Image from "next/image";
import { useRef } from "react";
import { HISTORIAS, type Historia } from "@/lib/historias-data";

function QuoteMark() {
  return (
    <svg width="24" height="19" viewBox="0 0 30 24" fill="var(--red)" aria-hidden>
      <path d="M0 24V13.5C0 6 4.5 1 12 0v5.4C7.8 6.6 6 9.3 6 13.5H12V24H0Zm18 0V13.5C18 6 22.5 1 30 0v5.4c-4.2 1.2-6 3.9-6 8.1h6V24H18Z" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

type HistoriasProps = {
  items?: Historia[];
  names?: string[];
  eyebrow?: string;
  heading?: string;
};

export default function Historias({
  items,
  names,
  eyebrow = "HISTÓRIAS DE TRANSFORMAÇÃO",
  heading = "Quem treina com a gente, conta",
}: HistoriasProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const historias = items ?? (names ? HISTORIAS.filter((h) => names.includes(h.nome)) : HISTORIAS);
  const showArrows = historias.length > 2;

  function scroll(direction: "left" | "right") {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section id="historias" className="py-24 sm:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-6 text-center sm:px-10 lg:px-18">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          {eyebrow}
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div className="relative mt-14">
        <div
          ref={trackRef}
          className={`scroll-carousel flex gap-6 overflow-x-auto pb-4 sm:px-10 lg:px-18 ${
            showArrows ? "px-[calc(50%-130px)]" : "justify-center px-6"
          }`}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {historias.map((historia) => (
            <div
              key={historia.nome}
              className="relative aspect-[9/16] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-line bg-navy-deep sm:w-[300px]"
              style={{ scrollSnapAlign: "center" }}
            >
              {historia.foto ? (
                <>
                  <Image
                    src={historia.foto}
                    alt={`${historia.nome}, aluno(a) da União Andrade`}
                    fill
                    sizes="300px"
                    className="object-cover"
                    style={{ objectPosition: historia.fotoPosicao }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, oklch(0.13 0.07 264 / 0.85) 78%, oklch(0.13 0.07 264 / 0.97) 100%)",
                    }}
                  />
                </>
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 260px 260px at 50% 20%, oklch(0.55 0.19 27 / 0.18) 0%, transparent 70%), var(--navy)",
                  }}
                />
              )}

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6">
                <QuoteMark />
                <p className="font-sans text-sm italic leading-relaxed text-paper">
                  {historia.quote}
                </p>
                <div className="pt-1">
                  <div className="font-sans text-sm font-semibold text-paper">{historia.nome}</div>
                  <div className="font-sans text-xs text-white/70">{historia.fato}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showArrows ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Ver depoimento anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-red hover:text-red"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Ver próximo depoimento"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-red hover:text-red"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
