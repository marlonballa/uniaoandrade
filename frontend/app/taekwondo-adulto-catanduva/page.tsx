import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Historias from "@/components/Historias";
import Jornada from "@/components/Jornada";
import { EXPERIMENTAL_CLASS_URL } from "@/lib/contact";
import { getRoute } from "@/lib/routes";

const route = getRoute("/taekwondo-adulto-catanduva");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function TaekwondoAdultoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              TAEKWONDO ADULTO EM CATANDUVA
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Taekwondo para Adultos em Catanduva
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Sem idade limite e no seu ritmo, nunca é tarde para começar.
              Turmas de iniciantes a graduados. Aula experimental gratuita.
            </p>
            <div className="mt-1">
              <a
                href={EXPERIMENTAL_CLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)] transition-transform hover:-translate-y-0.5"
              >
                Agende sua aula experimental gratuita
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-14 lg:flex-row lg:items-center">
            <div className="relative aspect-[4/3] w-full max-w-[420px] shrink-0 overflow-hidden rounded-2xl border border-line">
              <Image
                src="/alunos/turma-adolescentes-adultos-02.jpg"
                alt="Turma de adolescentes e adultos da União Andrade no dojang"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 12%" }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                TURMA DE ADOLESCENTES, ADULTOS E GRADUADOS
              </span>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Técnica, luta e defesa pessoal de verdade
              </h2>
              <p className="font-sans text-base leading-relaxed text-muted">
                Dois horários por semana para quem quer evoluir mais rápido.
              </p>
              <div className="mt-1 flex w-fit items-center gap-2.5 rounded-xl border border-line bg-surface px-4.5 py-4">
                <span className="font-sans text-sm font-medium text-ink">
                  Segunda e quarta, 18h30 ou 19h30
                </span>
                <span className="font-sans text-xs text-muted">Catanduva</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              NUNCA É TARDE PARA COMEÇAR
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Não existe idade certa, só o momento em que você decide
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Boa parte da nossa turma adulta começou depois dos 30, 40 e até
              dos 50, sem constrangimento e sem comparação com ninguém. Aqui
              você treina no seu tempo.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                SUAS DÚVIDAS ANTES DE COMEÇAR
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                As perguntas que ninguém faz em voz alta
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">Estou velho demais?</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Dá, e é mais comum do que parece. O Sr. Manuel começou aos
                  70. Ninguém compara sua evolução com a de mais ninguém.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">
                  Não tenho flexibilidade, nunca lutei
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  O treino segue progressão gradual desde o primeiro dia.
                  Ninguém entra sabendo, todo mundo começa do zero.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">Vou treinar com crianças?</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Não. As turmas têm horários próprios. A Kids e Iniciantes
                  treina às 18h, enquanto Adolescentes, Adultos e Graduados
                  começam às 18h30 ou 19h30, sempre em turma separada.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              EMAGRECE? QUAL O GASTO CALÓRICO?
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Treino sério, toda semana, no seu ritmo
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              O treino é intenso e trabalha o corpo inteiro, então ajuda. O
              gasto calórico exato varia de pessoa pra pessoa. Emagrecimento
              vem da constância, semana após semana.
            </p>
          </div>
        </section>

        <section className="px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              DEFESA PESSOAL REAL PARA O DIA A DIA
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Técnicas aplicáveis, não coreografia
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Técnicas de luta e defesa pessoal aplicáveis de verdade, para o
              dia a dia. É um dos pilares do treino adulto, ao lado da técnica
              e do condicionamento.{" "}
              <Link href="/taekwondo-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça o método completo →
              </Link>
            </p>
          </div>
        </section>

        <Historias names={["Jorge", "Sr. Manuel"]} />

        <Jornada />
      </main>
      <Footer />
    </>
  );
}
