"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function GaleriaLightbox({ photos }: { photos: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Ver foto ${i + 1} em tamanho grande`}
            className="group relative aspect-square overflow-hidden rounded-xl border border-line"
          >
            <Image
              src={src}
              alt={`Foto ${i + 1} da União Andrade no dojang`}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-paper transition-colors hover:border-red hover:text-red sm:right-6 sm:top-6"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-paper transition-colors hover:border-red hover:text-red sm:left-6"
          >
            <ArrowIcon direction="left" />
          </button>

          <div
            className="relative h-[78vh] w-[88vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[openIndex]}
              alt={`Foto ${openIndex + 1} da União Andrade no dojang`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Próxima foto"
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-paper transition-colors hover:border-red hover:text-red sm:right-6"
          >
            <ArrowIcon direction="right" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-xs tracking-wide text-white/60">
            {openIndex + 1} / {photos.length}
          </div>
        </div>
      ) : null}
    </>
  );
}
