"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { BlogVideoStory } from "@/lib/blog";

type VideoStoriesProps = {
  stories: BlogVideoStory[];
};

export default function VideoStories({ stories }: VideoStoriesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeStory = activeIndex === null ? null : stories[activeIndex];
  const activeClip = activeStory?.clips[activeClipIndex] ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex === null && dialog.open) {
      dialog.close();
    } else if (activeIndex !== null && !dialog.open) {
      dialog.showModal();
    }
  }, [activeIndex]);

  useEffect(() => {
    setProgress(0);
    if (activeIndex === null || !activeClip) return;

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [activeIndex, activeClipIndex, activeClip]);

  if (stories.length === 0) return null;

  function openStory(index: number) {
    setProgress(0);
    setActiveClipIndex(0);
    setActiveIndex(index);
  }

  function closeStory() {
    setActiveIndex(null);
    setActiveClipIndex(0);
    setProgress(0);
  }

  function goToPreviousStory() {
    if (activeIndex === null) return;
    if (activeClipIndex > 0) {
      setActiveClipIndex(activeClipIndex - 1);
      return;
    }
    if (activeIndex === 0) {
      if (videoRef.current) videoRef.current.currentTime = 0;
      return;
    }
    setActiveIndex(activeIndex - 1);
    setActiveClipIndex(stories[activeIndex - 1].clips.length - 1);
  }

  function goToNextStory() {
    if (activeIndex === null) return;
    if (activeStory && activeClipIndex < activeStory.clips.length - 1) {
      setActiveClipIndex(activeClipIndex + 1);
      return;
    }
    if (activeIndex === stories.length - 1) {
      closeStory();
      return;
    }
    setActiveIndex(activeIndex + 1);
    setActiveClipIndex(0);
  }

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-navy-deep/55 p-5 backdrop-blur-sm sm:p-6" aria-labelledby="festival-stories-heading">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[440px]">
          <h2 id="festival-stories-heading" className="font-display text-xl text-paper sm:text-2xl">
            Stories do festival
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-white/70">
            Toque em uma bolinha para assistir aos clipes agrupados por movimento.
          </p>
        </div>

        <div className="mt-5 flex gap-4 overflow-x-auto pb-1 sm:gap-5">
          {stories.map((story, index) => (
            <button
              key={story.title}
              type="button"
              onClick={() => openStory(index)}
              aria-label={`Assistir story: ${story.title}, ${story.clips.length} ${story.clips.length === 1 ? "vídeo" : "vídeos"}`}
              className="group flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-xl p-1 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
            >
              <span className="relative block size-[76px] rounded-full border-[3px] border-red p-[3px] motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.06]">
                <span className="relative block size-full overflow-hidden rounded-full bg-navy-deep">
                  <Image
                    src={story.clips[0].poster}
                    alt=""
                    fill
                    sizes="84px"
                    className="object-cover"
                  />
                </span>
                <span className="absolute bottom-0 right-0 grid size-7 place-items-center rounded-full border-2 border-surface bg-navy-deep text-paper">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="ml-0.5 size-3.5 fill-current"
                  >
                    <path d="M5.5 3.8a.8.8 0 0 1 1.2-.7l9.2 5.8a1.3 1.3 0 0 1 0 2.2l-9.2 5.8a.8.8 0 0 1-1.2-.7z" />
                  </svg>
                </span>
              </span>
              <span className="font-sans text-xs font-semibold leading-tight text-paper">
                {story.title}
              </span>
              <span className="font-sans text-[10px] leading-none text-white/55">
                {story.clips.length} {story.clips.length === 1 ? "vídeo" : "vídeos"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={activeStory ? `Story: ${activeStory.title}` : "Stories do festival"}
        onClose={closeStory}
        onCancel={(event) => {
          event.preventDefault();
          closeStory();
        }}
        className="m-auto max-h-[90dvh] w-[min(92vw,420px)] max-w-[92vw] overflow-hidden rounded-[24px] border border-white/10 bg-navy-deep p-0 text-paper shadow-[0_24px_80px_oklch(0.05_0.02_264/0.5)] backdrop:bg-navy-deep/90"
      >
        {activeStory && activeClip && activeIndex !== null && (
          <div className="relative aspect-[9/16] max-h-[90dvh] w-full overflow-hidden bg-navy-deep">
            <video
              key={`${activeIndex}-${activeClipIndex}-${activeClip.video}`}
              ref={videoRef}
              src={activeClip.video}
              poster={activeClip.poster}
              controls
              autoPlay
              muted
              playsInline
              preload="none"
              onTimeUpdate={(event) => {
                const { currentTime, duration } = event.currentTarget;
                setProgress(duration ? (currentTime / duration) * 100 : 0);
              }}
              onEnded={goToNextStory}
              className="absolute inset-0 size-full bg-black object-contain"
            >
              Seu navegador não conseguiu reproduzir este vídeo.
            </video>

            <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex gap-1">
              {activeStory.clips.map((clip, index) => {
                const segmentProgress =
                  activeClipIndex > index
                    ? 100
                    : activeClipIndex === index
                      ? progress
                      : 0;

                return (
                  <span
                    key={clip.video}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-white/50"
                  >
                    <span
                      className="block h-full rounded-full bg-paper transition-[width] duration-150"
                      style={{ width: `${segmentProgress}%` }}
                    />
                  </span>
                );
              })}
            </div>

            <div className="absolute inset-x-4 top-7 z-10 flex items-start justify-between gap-4">
              <div className="rounded-lg bg-navy-deep/80 px-3 py-2">
                <h3 className="font-display text-sm leading-snug text-paper">
                  {activeStory.title}
                </h3>
                <p className="mt-1 max-w-[270px] font-sans text-xs leading-relaxed text-white/85">
                  {activeStory.description}
                </p>
                <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
                  Vídeo {activeClipIndex + 1} de {activeStory.clips.length}
                </p>
              </div>
              <button
                type="button"
                onClick={closeStory}
                aria-label="Fechar stories"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-deep/85 text-paper transition-colors hover:bg-navy"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={goToPreviousStory}
              disabled={activeIndex === 0 && activeClipIndex === 0}
              aria-label="Vídeo anterior"
              className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-navy-deep/65 text-paper transition-opacity disabled:opacity-35"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="m15 18-6-6 6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNextStory}
              aria-label={
                activeStory.clips.length - 1 === activeClipIndex && activeIndex === stories.length - 1
                  ? "Fechar stories"
                  : "Próximo vídeo"
              }
              className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-navy-deep/65 text-paper"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="m9 18 6-6-6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
