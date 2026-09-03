import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Jornada from "@/components/Jornada";
import { ELEMENTOS } from "@/components/Metodologia";
import { EXPERIMENTAL_CLASS_URL } from "@/lib/contact";
import { getRoute } from "@/lib/routes";

const route = getRoute("/academia-de-lutas-catanduva");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function AcademiaDeLutasPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              ACADEMIA DE LUTAS EM CATANDUVA
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Academia de Lutas em Catanduva
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Procurando uma academia de lutas em Catanduva? Somos
              especializados em Taekwondo: luta, defesa pessoal e tradição
              desde 2001.
            </p>
            <div className="mt-1">
              <a
                href={EXPERIMENTAL_CLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)] transition-transform hover:-translate-y-0.5"
              >
                Venha sentir na prática
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              SOMOS ESPECIALIZADOS EM TAEKWONDO
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Uma modalidade, com profundidade de verdade
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              A União Andrade é especializada em Taekwondo Kukkiwon Old
              School. Não trabalhamos boxe, judô, muay thai ou jiu-jitsu: o
              nosso foco é uma arte marcial completa, ensinada com
              profundidade técnica e tradição, desde 2001 em Catanduva.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              POR QUE O TAEKWONDO É UMA LUTA COMPLETA
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Luta, defesa pessoal e arte marcial, no mesmo treino
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              O treino combina socos, chutes, defesa pessoal, torções,
              derrubadas e técnicas de combate, sempre construído sobre a base
              técnica da linha Kukkiwon.{" "}
              <Link href="/taekwondo-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça o método completo →
              </Link>
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              TAEKWONDO X OUTRAS LUTAS
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Qual escolher?
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Cada arte marcial tem sua própria tradição e foco. Na União
              Andrade, o Taekwondo é trabalhado como arte marcial completa,
              com ênfase em técnica, filosofia e disciplina.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                O QUE VOCÊ VAI TREINAR AQUI
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Base técnica completa
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ELEMENTOS.map((item) => (
                <div key={item.label} className="rounded-xl border border-line bg-paper px-4 py-4 text-center">
                  <span className="font-sans text-sm text-ink">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-center">
              <Link href="/taekwondo-catanduva" className="font-sans text-sm font-semibold text-red hover:text-red-deep">
                Ver metodologia completa →
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-4 text-center">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              TURMAS E HORÁRIOS
            </span>
            <p className="font-sans text-base leading-relaxed text-muted">
              Kids e Iniciantes, Adolescentes, Adultos e Graduados, e Turma
              Mista em Catiguá.{" "}
              <Link href="/contato" className="font-semibold text-red hover:text-red-deep">
                Ver todos os horários →
              </Link>
            </p>
          </div>
        </section>

        <Jornada
          eyebrow="VENHA CONHECER DE PERTO"
          heading="Sinta a diferença de treinar arte marcial de verdade"
          paragraph="Uma aula experimental gratuita, sem compromisso, para você decidir com calma."
        />
      </main>
      <Footer />
    </>
  );
}
