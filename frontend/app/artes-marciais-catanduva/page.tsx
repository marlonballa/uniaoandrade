import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Beneficios from "@/components/Beneficios";
import Jornada from "@/components/Jornada";
import { getRoute } from "@/lib/routes";

const route = getRoute("/artes-marciais-catanduva");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function ArtesMarciaisPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              ARTES MARCIAIS EM CATANDUVA
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Artes Marciais em Catanduva
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Escola de artes marciais em Catanduva com tradição desde 2001.
              Técnica, disciplina, graduação e defesa pessoal através do
              Taekwondo Kukkiwon Old School.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              ARTE MARCIAL DE VERDADE
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Não se resume a chutes esportivos ou movimentos coreografados
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              A União Andrade é uma escola de artes marciais especializada em
              Taekwondo. É luta, defesa pessoal e arte marcial completa,
              trabalhada como tradição, com técnica e disciplina.{" "}
              <Link href="/taekwondo-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça o Taekwondo em Catanduva →
              </Link>
            </p>
          </div>
        </section>

        <Beneficios />

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                TÉCNICA, GRADUAÇÃO E COMBATE
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Currículo técnico completo
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Socos e chutes", "Defesa pessoal e torções", "Derrubadas", "Técnicas de combate", "Poomsae (formas)", "Condicionamento físico", "Steps e movimentação", "Coordenação e controle"].map((item) => (
                <div key={item} className="rounded-xl border border-line bg-paper px-4 py-4 text-center">
                  <span className="font-sans text-sm text-ink">{item}</span>
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

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              DEFESA PESSOAL ATRAVÉS DA ARTE MARCIAL
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Técnicas aplicáveis para o dia a dia
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              A defesa pessoal é um dos pilares da nossa arte marcial, ao lado
              da técnica e da tradição.{" "}
              <Link href="/defesa-pessoal-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça a defesa pessoal na União Andrade →
              </Link>
            </p>
          </div>
        </section>

        <Jornada
          eyebrow="TRADIÇÃO MARCIAL DESDE 2001"
          heading="Venha conhecer nossa arte marcial de perto"
        />
      </main>
      <Footer />
    </>
  );
}
