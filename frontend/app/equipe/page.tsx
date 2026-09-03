import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Equipe from "@/components/Equipe";
import Jornada from "@/components/Jornada";
import { getRoute } from "@/lib/routes";

const route = getRoute("/equipe");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function EquipePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              EQUIPE DE INSTRUTORES
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Nossa Equipe
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Conheça o Mestre Evandro Andrade (4º Dan) e a equipe de
              Kyosanim, Joildo, Gustavo, Nayara e Ritinha, que ensina
              Taekwondo na União Andrade, em Catanduva.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              MESTRE EVANDRO ANDRADE (4º DAN)
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Mais de 20 anos dedicados ao Taekwondo tradicional
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Mestre Evandro Andrade dirige a União Andrade desde 2001,
              conduzindo o método Kukkiwon Old School: técnica, disciplina,
              filosofia e tradição marcial.{" "}
              <Link href="/sobre" className="font-semibold text-red hover:text-red-deep">
                Conheça a história completa →
              </Link>
            </p>
          </div>
        </section>

        <Equipe />

        <Jornada
          eyebrow="CONHEÇA A EQUIPE DE PERTO"
          heading="Venha treinar com quem vive o Taekwondo todos os dias"
        />
      </main>
      <Footer />
    </>
  );
}
