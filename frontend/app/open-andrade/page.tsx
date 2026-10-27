import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/open-andrade/RegistrationForm";
import { getRoute } from "@/lib/routes";

const route = getRoute("/open-andrade");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function OpenAndradePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-navy-deep px-6 pb-12 pt-28 sm:px-10 sm:pb-16 lg:px-18 lg:pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 1000px 780px at 78% 30%, oklch(0.30 0.09 264 / 0.55) 0%, transparent 62%)," +
                "repeating-linear-gradient(112deg, color-mix(in oklch, var(--navy-light) 24%, transparent) 0px, color-mix(in oklch, var(--navy-light) 24%, transparent) 2px, transparent 2px, transparent 46px)," +
                "linear-gradient(150deg, oklch(0.20 0.08 264) 0%, oklch(0.07 0.02 250) 78%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full mix-blend-screen sm:h-[560px] sm:w-[560px]"
            style={{ background: "radial-gradient(circle, oklch(0.55 0.19 27 / 0.18) 0%, transparent 70%)" }}
          />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div>
              <h1 className="max-w-[700px] font-display text-4xl leading-[1.12] text-paper sm:text-5xl lg:text-[3.5rem]">
                Open Andrade
                <span className="mt-2 block text-2xl leading-snug text-paper/90 sm:text-3xl">
                  de Taekwondo
                </span>
              </h1>
              <p className="mt-6 max-w-[58ch] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
                Nosso torneio interno será um encontro de aprendizado, convivência e evolução para toda a equipe. No tatame, teremos Kyorugui (lutas) e Poomsae (formas).
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex min-h-[76px] items-center gap-3 bg-red px-4 py-3 text-paper shadow-[0_8px_24px_oklch(0.05_0.02_264/0.25)]">
                  <span className="font-display text-4xl leading-none">15</span>
                  <span className="font-sans text-xs font-bold leading-tight tracking-[0.12em]">
                    NOV<br />2026
                  </span>
                </div>
                <div className="flex flex-col gap-2 border-l border-white/25 pl-4">
                  <p className="font-sans text-sm leading-snug text-white/80">
                    Chegada dos alunos <strong className="font-semibold text-paper">até às 08h</strong>
                  </p>
                  <p className="font-sans text-sm leading-snug text-white/80">
                    Início do torneio <strong className="font-semibold text-paper">às 09h</strong>
                  </p>
                </div>
              </div>
              <p className="mt-5 font-sans text-sm leading-relaxed text-white/80">
                Inscrições até <strong className="font-semibold text-paper">11 de novembro de 2026, às 23h59.</strong>
              </p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden border border-white/15 bg-navy lg:aspect-[16/11]">
              <Image
                src="/alunos/grupo-treino-medalhas.jpg"
                alt="Alunos e instrutores da União Andrade reunidos no tatame com medalhas"
                fill
                fetchPriority="high"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-center"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 sm:p-6">
                <p className="max-w-[24ch] font-sans text-sm font-semibold leading-snug text-white sm:text-base">
                  Técnica, respeito e evolução no tatame.
                </p>
                <span aria-hidden="true" className="h-1.5 w-12 shrink-0 bg-red sm:w-16" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:px-10 sm:py-16 lg:px-18">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-5 lg:pt-2">
              <h2 className="font-display text-xl leading-snug text-ink sm:text-2xl">
                Inscreva seu aluno
              </h2>
              <p className="max-w-[42ch] font-sans text-base leading-relaxed text-muted">
                Preencha os dados do responsável e do aluno, depois escolha as modalidades de participação. Use um formulário para cada aluno.
              </p>
              <div className="mt-2 flex items-baseline justify-between border-y border-line py-5 lg:max-w-[340px]">
                <span className="font-sans text-sm font-medium text-muted">Taxa de inscrição</span>
                <span className="font-display text-2xl text-ink">R$ 30,00</span>
              </div>
            </div>

            <RegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
