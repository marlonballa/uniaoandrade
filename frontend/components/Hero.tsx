import Image from "next/image";
import Reveal from "./Reveal";
import { EXPERIMENTAL_CLASS_URL } from "@/lib/contact";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[720px] flex-col overflow-hidden bg-navy-deep sm:min-h-[860px] lg:min-h-[920px]"
    >
      {/* abstract navy backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 1000px 780px at 78% 30%, oklch(0.30 0.09 264 / 0.55) 0%, transparent 62%)," +
            "repeating-linear-gradient(112deg, oklch(0.22 0.07 264 / 0.4) 0px, oklch(0.22 0.07 264 / 0.4) 2px, transparent 2px, transparent 46px)," +
            "linear-gradient(150deg, oklch(0.20 0.08 264) 0%, oklch(0.07 0.02 250) 78%)",
        }}
      />

      {/* soft red brand glow */}
      <div
        aria-hidden
        className="absolute -top-28 -right-24 h-[560px] w-[560px] rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.19 27 / 0.22) 0%, transparent 70%)",
        }}
      />

      {/* content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center gap-12 px-6 pt-28 pb-16 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-18 lg:pt-32">
        <Reveal>
          <div className="flex max-w-[560px] flex-col gap-6">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              TAEKWONDO MARCIAL · CATANDUVA
            </span>

            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-5xl lg:text-[46px]">
              Mais de 20 anos formando faixas-pretas em Catanduva
            </h1>

            <p className="max-w-[480px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Taekwondo para quem busca a arte marcial de verdade — luta, defesa
              pessoal, disciplina e respeito, para crianças e adultos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={EXPERIMENTAL_CLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_oklch(0.05_0.02_264/0.4)]"
              >
                Agende sua aula experimental
              </a>
              <a
                href="#metodologia"
                className="group flex items-center gap-2 border-b border-white/40 pb-0.5 font-sans text-sm font-medium text-paper transition-colors hover:border-red hover:text-red"
              >
                Conheça a escola
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="relative mx-auto aspect-[3/4] w-full max-w-[360px] shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_oklch(0.05_0.02_264/0.5)] lg:mx-0">
          <Image
            src="/mestre-evandro-esther.jpg"
            alt="Mestre Evandro Andrade com a filha Esther, faixa vermelha, na União Andrade"
            fill
            priority
            sizes="(min-width: 1024px) 360px, 80vw"
            className="object-cover"
            style={{ objectPosition: "50% 15%" }}
          />
        </div>
      </div>

      {/* bottom info strip: glassmorfismo */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 bg-navy-deep/45 px-6 py-5 text-center backdrop-blur-xl backdrop-saturate-150 sm:gap-14">
        <span className="font-sans text-xs text-white/85">
          R. Minas Gerais, 454 — Centro, Catanduva
        </span>
        <span className="hidden h-3.5 w-px bg-white/30 sm:block" />
        <span className="font-sans text-xs text-white/85">
          Turmas de segunda a sábado — veja os horários por turma
        </span>
      </div>
    </section>
  );
}
