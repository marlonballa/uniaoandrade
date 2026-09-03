import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Beneficios from "@/components/Beneficios";
import Estatisticas from "@/components/Estatisticas";
import Cidades from "@/components/Cidades";
import Historias from "@/components/Historias";
import Galeria from "@/components/Galeria";
import SigaInstagram from "@/components/SigaInstagram";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { EXPERIMENTAL_CLASS_URL, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/contact";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { getRoute } from "@/lib/routes";

const route = getRoute("/");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

const AULA_EXPERIMENTAL = FAQ_ITEMS.find((item) => item.q === "Como funciona a aula experimental?")!;

const FAQ_HOME = FAQ_ITEMS.filter((item) =>
  [
    "Dá para começar Taekwondo depois dos 30 ou 40 anos?",
    "Qual a idade ideal para uma criança começar Taekwondo?",
    "Qual a diferença entre Taekwondo e Jiu-Jitsu ou Muay Thai?",
  ].includes(item.q),
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              MODALIDADES
            </span>
            <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
              Para cada fase da jornada
            </h2>
            <p className="max-w-[560px] font-sans text-base leading-relaxed text-muted">
              Turmas separadas por fase, mas o mesmo método tradicional para
              todo mundo.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-3">
            <Link
              href="/taekwondo-infantil-catanduva"
              className="flex flex-col gap-3.5 rounded-2xl border border-line bg-paper p-8 transition-shadow hover:shadow-[0_12px_32px_oklch(0.2_0.03_264/0.08)]"
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-red">
                KIDS E INICIANTES
              </span>
              <h3 className="font-display text-xl text-ink">Taekwondo Infantil</h3>
              <p className="font-sans text-sm leading-relaxed text-muted">
                Coordenação, disciplina e diversão no ritmo de cada criança.
              </p>
              <span className="mt-1 font-sans text-sm font-semibold text-red">
                Ver turma infantil →
              </span>
            </Link>
            <Link
              href="/taekwondo-adulto-catanduva"
              className="flex flex-col gap-3.5 rounded-2xl border border-line bg-paper p-8 transition-shadow hover:shadow-[0_12px_32px_oklch(0.2_0.03_264/0.08)]"
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-red">
                ADOLESCENTES E ADULTOS
              </span>
              <h3 className="font-display text-xl text-ink">Taekwondo Adulto</h3>
              <p className="font-sans text-sm leading-relaxed text-muted">
                Técnica, luta e defesa pessoal de verdade, sem idade limite.
              </p>
              <span className="mt-1 font-sans text-sm font-semibold text-red">
                Ver turma adulta →
              </span>
            </Link>
            <Link
              href="/taekwondo-catanduva"
              className="flex flex-col gap-3.5 rounded-2xl border border-navy-deep bg-navy-deep p-8 transition-shadow hover:shadow-[0_12px_32px_oklch(0.2_0.03_264/0.2)]"
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-red">
                MÉTODO COMPLETO
              </span>
              <h3 className="font-display text-xl text-paper">Kukkiwon Old School</h3>
              <p className="font-sans text-sm leading-relaxed text-white/70">
                Conheça a metodologia, o sistema de faixas e a equipe
                completa.
              </p>
              <span className="mt-1 font-sans text-sm font-semibold text-paper">
                Ver metodologia →
              </span>
            </Link>
          </div>
        </section>

        <section className="bg-surface pt-20 sm:pt-24">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-6 text-center sm:px-10 lg:px-18">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              POR QUE TREINAR NA UNIÃO ANDRADE
            </span>
            <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
              Tradição marcial de verdade
            </h2>
            <p className="max-w-[600px] font-sans text-base leading-relaxed text-muted">
              Seguimos o currículo técnico oficial do Taekwondo na linha
              Kukkiwon, com a essência marcial de quem aprendeu antes do
              esporte virar só sobre pontos.{" "}
              <Link href="/taekwondo-catanduva" className="font-semibold text-red hover:text-red-deep">
                Conheça nosso método →
              </Link>
            </p>
          </div>
          <div className="mt-14">
            <Estatisticas />
          </div>
        </section>

        <Beneficios />

        <section className="px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              PARA QUEM É
            </span>
            <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
              Tem espaço para você, no seu tempo
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-9">
              <h3 className="font-display text-xl text-ink">Crianças e adolescentes</h3>
              <p className="font-sans text-[15px] leading-relaxed text-muted">
                Turma Kids e Iniciantes: coordenação, disciplina e diversão
                para os primeiros passos, sem idade única de entrada.
              </p>
              <Link href="/taekwondo-infantil-catanduva" className="font-sans text-sm font-semibold text-red hover:text-red-deep">
                Taekwondo Infantil →
              </Link>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-9">
              <h3 className="font-display text-xl text-ink">Adultos e graduados</h3>
              <p className="font-sans text-[15px] leading-relaxed text-muted">
                Turma de Adolescentes, Adultos e Graduados: nossa turma tem
                gente que começou aos 30, 40 e depois dos 50.
              </p>
              <Link href="/taekwondo-adulto-catanduva" className="font-sans text-sm font-semibold text-red hover:text-red-deep">
                Taekwondo Adulto →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-4 text-center">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              COMO FUNCIONA A PRIMEIRA AULA
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Simples, gratuita e sem compromisso
            </h2>
            <p className="font-sans text-[17px] leading-relaxed text-muted">{AULA_EXPERIMENTAL.a}</p>
            <a
              href={EXPERIMENTAL_CLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-2xl bg-red px-8 py-4 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Quero agendar minha aula gratuita
            </a>
          </div>
        </section>

        <Historias />
        <Cidades />

        <section className="bg-surface px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                LOCALIZAÇÃO
              </span>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Venha treinar com a gente
              </h2>
              <div className="mt-1 flex flex-col gap-1.5">
                <span className="font-sans text-[15px] font-medium text-ink">
                  R. Minas Gerais, 454, 1º andar, Centro, Catanduva-SP
                </span>
                <span className="font-sans text-sm text-muted">
                  Segunda a sábado. Veja os horários por turma
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-5">
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-red px-7 py-3.5 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90"
                >
                  Chamar no WhatsApp
                </a>
                <Link href="/contato" className="font-sans text-sm font-semibold text-red hover:text-red-deep">
                  Ver página de contato →
                </Link>
              </div>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-[oklch(0.90_0.02_264)] to-[oklch(0.82_0.03_264)] px-4 text-center font-sans text-xs tracking-wide text-muted">
              MAPA DO GOOGLE: PENDENTE PLACE ID
            </div>
          </div>
        </section>

        <SigaInstagram />
        <Galeria />

        <Faq
          items={FAQ_HOME}
          heading="Antes de agendar sua aula"
          columns={1}
          sectionId="faq"
          moreLink={{ href: "/taekwondo-catanduva", label: "Ver todas as perguntas →" }}
        />
      </main>
      <Footer />
    </>
  );
}
