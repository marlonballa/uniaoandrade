import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Metodologia from "@/components/Metodologia";
import Equipe from "@/components/Equipe";
import Programas from "@/components/Programas";
import Cidades from "@/components/Cidades";
import Faq from "@/components/Faq";
import Jornada from "@/components/Jornada";
import { EXPERIMENTAL_CLASS_URL, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/contact";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { getRoute } from "@/lib/routes";

const route = getRoute("/taekwondo-catanduva");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

const PERGUNTAS_TAEKWONDO = FAQ_ITEMS.filter((item) =>
  [
    "Taekwondo é uma luta forte? Serve para defesa pessoal?",
    "O Taekwondo tem soco, ou é só chute?",
    "Dá para aprender Taekwondo sozinho, sem ir a uma academia?",
    "O Taekwondo tem risco de lesão?",
    "Qual a diferença da União Andrade para outras academias?",
    "Quanto tempo leva para virar faixa-preta?",
    "Quais são as faixas do Taekwondo? Qual é a mais alta?",
    "Qual a diferença entre Taekwondo e Jiu-Jitsu ou Muay Thai?",
    "Qual a diferença entre Taekwondo e Karatê?",
    "O que significa Taekwondo?",
    "Qual é o nome da roupa usada no Taekwondo?",
    "Como se chama quem pratica Taekwondo?",
    "Quais são os princípios do Taekwondo?",
    "Taekwondo muda o corpo? Como fica o corpo de quem treina?",
    "Quais são os golpes principais do Taekwondo?",
    "Quais os benefícios do Taekwondo?",
    "Qual é a melhor arte marcial para iniciantes?",
    "Posso colocar meu filho de 3 anos no Taekwondo?",
  ].includes(item.q),
);

export default function TaekwondoCatanduvaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              TAEKWONDO EM CATANDUVA
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Taekwondo em Catanduva
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Aulas de Taekwondo Kukkiwon Old School, com Mestre Evandro
              Andrade (4º Dan). Método, turmas, horários e aula experimental
              gratuita.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-5">
              <a
                href={EXPERIMENTAL_CLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)] transition-transform hover:-translate-y-0.5"
              >
                Agende sua aula experimental
              </a>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/40 pb-0.5 font-sans text-sm font-medium text-paper transition-colors hover:border-red hover:text-red"
              >
                Fale no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pt-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              O QUE É TREINAR AQUI
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Arte marcial de verdade, não coreografia esportiva
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              O treino de Taekwondo na União Andrade não se resume a chutes
              esportivos ou movimentos coreografados. É luta, defesa pessoal e
              arte marcial completa, trabalhada como tradição, com técnica e
              disciplina.
            </p>
          </div>
        </section>

        <Metodologia />

        <section className="bg-surface px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              POOMSAE, KYORUGI E FUNDAMENTOS
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Formas, combate e base técnica
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              O treino combina Poomsae (formas, sequências de movimentos que
              preservam a tradição técnica) e técnicas de combate, sempre
              construídos sobre a base de socos, chutes, defesa pessoal e
              torções trabalhada desde o primeiro dia.
            </p>
          </div>
        </section>

        <section className="px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                PARA QUEM É
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Tem lugar para você, no seu tempo
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-paper p-8">
                <h3 className="font-display text-lg text-ink">Crianças e adolescentes</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Sem idade única de entrada, cada criança no seu próprio
                  ritmo.{" "}
                  <Link href="/taekwondo-infantil-catanduva" className="font-semibold text-red hover:text-red-deep">
                    Taekwondo Infantil →
                  </Link>
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-8">
                <h3 className="font-display text-lg text-ink">Adultos e graduados</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Nunca é tarde para começar, sem comparação com ninguém.{" "}
                  <Link href="/taekwondo-adulto-catanduva" className="font-semibold text-red hover:text-red-deep">
                    Taekwondo Adulto →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              COMO FUNCIONA UMA AULA
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

        <section className="px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              SISTEMA DE FAIXAS E GRADUAÇÃO
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Cada graduação é conquistada
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              É um processo gradual, e cada graduação reflete a evolução
              técnica real do aluno. A evolução passa por faixas coloridas até
              chegar à faixa-preta, seguindo os critérios da linha Kukkiwon
              Old School que a União Andrade preserva há mais de 20 anos. Ao
              longo desse tempo, já formamos dezenas de faixas-pretas.
            </p>
          </div>
        </section>

        <Equipe moreLink={{ href: "/equipe", label: "Conheça a equipe completa →" }} />
        <Programas />
        <Cidades />

        <Faq
          items={PERGUNTAS_TAEKWONDO}
          eyebrow="PERGUNTAS SOBRE TAEKWONDO EM CATANDUVA"
          heading="Tire suas dúvidas"
          columns={2}
          sectionId="perguntas-taekwondo"
        />

        <Jornada />
      </main>
      <Footer />
    </>
  );
}
