import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Jornada from "@/components/Jornada";
import { EXPERIMENTAL_CLASS_URL } from "@/lib/contact";
import { getRoute } from "@/lib/routes";

const route = getRoute("/defesa-pessoal-catanduva");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function DefesaPessoalPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              DEFESA PESSOAL EM CATANDUVA
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Defesa Pessoal em Catanduva
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Defesa pessoal real em Catanduva através do Taekwondo Kukkiwon
              Old School: técnicas aplicáveis e progressão gradual.
            </p>
            <div className="mt-1">
              <a
                href={EXPERIMENTAL_CLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)] transition-transform hover:-translate-y-0.5"
              >
                Venha sentir a defesa pessoal na prática
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              DEFESA PESSOAL REAL, NÃO COREOGRAFIA
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Técnicas aplicáveis de verdade
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              Técnicas de luta e defesa pessoal aplicáveis de verdade, para o
              dia a dia. É um dos pilares do treino na União Andrade, ao lado
              da técnica e da tradição.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              COMO A DEFESA PESSOAL É TRABALHADA
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Técnica, torções e derrubadas
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              O treino trabalha defesa pessoal e torções, derrubadas e
              técnicas de combate, sempre construídos sobre a base de socos e
              chutes trabalhada desde o primeiro dia.{" "}
              <Link href="/taekwondo-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça o método completo →
              </Link>
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              É PERIGOSO? EXISTE RISCO DE LESÃO?
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Progressão gradual e supervisão constante
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Como em qualquer arte marcial, existe contato, por isso o treino
              segue progressão gradual, com equipamentos de proteção e
              supervisão constante do Mestre e da equipe de instrutores.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              SERVE PARA QUALQUER IDADE?
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Turmas para crianças, adolescentes e adultos
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Sim. A defesa pessoal faz parte do treino em todas as fases, no
              ritmo de cada aluno.{" "}
              <Link href="/taekwondo-infantil-catanduva" className="font-semibold text-red hover:text-red-deep">
                Taekwondo Infantil
              </Link>
              {" · "}
              <Link href="/taekwondo-adulto-catanduva" className="font-semibold text-red hover:text-red-deep">
                Taekwondo Adulto
              </Link>
            </p>
          </div>
        </section>

        <Jornada
          eyebrow="TÉCNICAS PARA O DIA A DIA"
          heading="Venha sentir como funciona a defesa pessoal na prática"
        />
      </main>
      <Footer />
    </>
  );
}
