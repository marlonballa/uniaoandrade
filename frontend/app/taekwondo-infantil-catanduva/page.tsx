import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Historias from "@/components/Historias";
import Jornada from "@/components/Jornada";
import { EXPERIMENTAL_CLASS_URL } from "@/lib/contact";
import { getRoute } from "@/lib/routes";

const route = getRoute("/taekwondo-infantil-catanduva");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

export default function TaekwondoInfantilPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              TAEKWONDO INFANTIL EM CATANDUVA
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Taekwondo Infantil em Catanduva
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Disciplina, coordenação e segurança, no ritmo de cada criança.
              Veja a idade ideal e agende uma aula experimental gratuita.
            </p>
            <div className="mt-1">
              <a
                href={EXPERIMENTAL_CLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)] transition-transform hover:-translate-y-0.5"
              >
                Agende a aula experimental do seu filho
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-14 lg:flex-row lg:items-center">
            <div className="relative aspect-[4/3] w-full max-w-[420px] shrink-0 overflow-hidden rounded-2xl border border-line">
              <Image
                src="/alunos/turma-kids-esteira.jpg"
                alt="Turma Kids da União Andrade com equipamentos de sparring no tatame"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                TURMA KIDS E INICIANTES
              </span>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Primeiros passos no Taekwondo
              </h2>
              <p className="font-sans text-base leading-relaxed text-muted">
                Coordenação, disciplina e diversão para os primeiros passos no
                Taekwondo, no ritmo de cada criança.
              </p>
              <div className="mt-1 flex w-fit items-center gap-2.5 rounded-xl border border-line bg-surface px-4.5 py-4">
                <span className="font-sans text-sm font-medium text-ink">
                  Segunda, terça, quarta e quinta, 18h
                </span>
                <span className="font-sans text-xs text-muted">Catanduva</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              QUAL A IDADE IDEAL PARA COMEÇAR?
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Não existe uma idade única
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Existe a fase certa para cada criança. Nossas turmas Kids
              respeitam esse processo: primeiro coordenação e disciplina de
              forma lúdica, depois técnica com mais consistência, sempre no
              ritmo de cada aluno.
            </p>
          </div>
        </section>

        <section className="px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              É PERIGOSO? MEU FILHO VAI APANHAR?
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
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                O QUE O TAEKWONDO DESENVOLVE NA CRIANÇA
              </span>
              <h2 className="max-w-[600px] font-display text-2xl text-ink sm:text-3xl">
                Disciplina e caráter, no tempo dela
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">Disciplina e autocontrole</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Rotina e limites que se refletem dentro e fora do tatame.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">Autoconfiança</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Cada graduação é uma conquista construída, não dada.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">Respeito e hierarquia</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Valores da tradição marcial, praticados a cada aula.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">
                  Taekwondo faz a criança crescer mais?
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Nenhum esporte aumenta a altura além do potencial genético
                  de cada um, isso é mito. O Taekwondo desenvolve postura,
                  coordenação e condicionamento físico.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-sans text-base font-semibold text-ink">
                  É bom para dificuldade de concentração ou TDAH?
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Muitos pais relatam que a rotina, a disciplina e as regras
                  claras do treino ajudam no dia a dia. Não é tratamento nem
                  substitui acompanhamento médico. Vale conversar com a gente
                  pra entender se o ritmo da turma combina com seu filho.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-18 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[800px] flex-col gap-4">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              SISTEMA DE FAIXAS
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Cada faixa é conquistada
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              A evolução passa por faixas coloridas até chegar à faixa-preta,
              sempre respeitando a evolução técnica de cada criança.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              COMO FUNCIONA A AULA EXPERIMENTAL
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Gratuita e sem compromisso
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Agende pelo WhatsApp, Instagram ou pelo botão do site, venha
              conhecer o dojang e seu filho treina uma aula com a turma, sem
              pagar nada. Venha com roupa de treino confortável (bermuda e
              camiseta, ou calça legging e camiseta). O dobok só é obrigatório
              depois da matrícula.
            </p>
            <a
              href={EXPERIMENTAL_CLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-2xl bg-red px-8 py-4 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Agendar aula gratuita do meu filho
            </a>
          </div>
        </section>

        <Historias
          names={["Cláudio e Enzo", "Geniel e Mylena"]}
          eyebrow="DEPOIMENTOS DE PAIS"
          heading="Quem coloca o filho aqui, conta"
        />

        <Jornada
          eyebrow="SEM PRESSA, NO RITMO DELE"
          heading="Traga seu filho para conhecer o dojang"
          paragraph="Uma aula gratuita, sem compromisso, para sentir como é treinar Taekwondo de verdade."
          footnote="Sem custo e sem compromisso, é só para conhecer a turma."
        />
      </main>
      <Footer />
    </>
  );
}
