import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Equipe from "@/components/Equipe";
import Historias from "@/components/Historias";
import Jornada from "@/components/Jornada";
import { getRoute } from "@/lib/routes";

const route = getRoute("/sobre");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              SOBRE A UNIÃO ANDRADE
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Sobre a União Andrade
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              A trajetória do Mestre Evandro Andrade (4º Dan) e da equipe de
              Kyosanim que ensina Taekwondo em Catanduva desde 2001.
            </p>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              +20 ANOS DE TAEKWONDO EM CATANDUVA
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Uma tradição que começou em 2001
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              Desde 2001 o Mestre Evandro Andrade ensina Taekwondo em
              Catanduva, formando dezenas de faixas-pretas ao longo de mais de
              20 anos, sempre preservando a linha técnica Kukkiwon Old School.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              MESTRE EVANDRO ANDRADE (4º DAN)
            </span>
            <h2 className="max-w-[600px] font-display text-2xl text-ink sm:text-3xl">
              Mais de 20 anos dedicados ao Taekwondo tradicional
            </h2>
            <p className="max-w-[700px] font-sans text-base leading-relaxed text-muted">
              Mestre Evandro Andrade dirige a União Andrade desde 2001,
              conduzindo o método Kukkiwon Old School: técnica, disciplina,
              filosofia e tradição marcial.
            </p>
            <div className="mt-2 flex w-fit items-center gap-2.5 rounded-xl border border-line bg-paper px-4.5 py-4">
              <span className="font-sans text-xs font-semibold tracking-[0.1em] text-red">
                FILIAÇÃO
              </span>
              <span className="font-sans text-sm text-ink">Vinculados à Liga Nacional</span>
            </div>
          </div>
        </section>

        <Equipe />

        <section className="bg-surface px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              NOSSA FILOSOFIA
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Kukkiwon Old School
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Seguimos o currículo técnico oficial do Taekwondo na linha
              Kukkiwon, com a essência marcial de quem aprendeu antes do
              esporte virar só sobre pontos. O aluno é apresentado a cada
              elemento da arte marcial: técnico, físico, mental e filosófico.{" "}
              <Link href="/taekwondo-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça o método completo →
              </Link>
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1440px] justify-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-display text-4xl font-bold tabular-nums text-ink">
                Dezenas
              </span>
              <span className="font-sans text-xs font-semibold tracking-[0.1em] text-muted">
                DE FAIXAS-PRETAS FORMADAS DESDE 2001
              </span>
            </div>
          </div>
        </section>

        <Historias
          names={["Aniely e Wendel"]}
          eyebrow="DEPOIMENTOS"
          heading="Quem treina com a gente, conta"
        />

        <Jornada
          eyebrow="CONHEÇA A UNIÃO ANDRADE DE PERTO"
          heading="Venha treinar com quem vive o Taekwondo todos os dias"
          paragraph="Não existe idade certa para começar, só o momento em que você decide."
        />
      </main>
      <Footer />
    </>
  );
}
