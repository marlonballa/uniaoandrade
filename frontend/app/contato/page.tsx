import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { INSTAGRAM_URL, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/contact";
import { getRoute } from "@/lib/routes";

const route = getRoute("/contato");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

const HORARIOS = [
  { turma: "Kids e Iniciantes", horario: "Seg, ter, qua e qui, 18h", local: "Catanduva" },
  { turma: "Adolescentes, Adultos e Graduados", horario: "Seg e qua, 18h30 ou 19h30", local: "Catanduva" },
  { turma: "Turma Mista", horario: "Sábado, 9h30 às 11h", local: "Catiguá" },
];

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-12 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[700px] flex-col gap-4">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              CONTATO E ENDEREÇO
            </span>
            <h1 className="font-display text-3xl leading-[1.15] text-paper sm:text-4xl">
              Fale com a União Andrade
            </h1>
            <p className="max-w-[560px] font-sans text-base leading-relaxed text-white/85">
              Endereço, telefone e horários em Catanduva. Fale pelo WhatsApp
              ou Instagram e agende sua aula experimental gratuita.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-18">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                ENDEREÇO E COMO CHEGAR
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                R. Minas Gerais, 454, 1º andar
              </h2>
              <p className="font-sans text-base text-muted">Centro, Catanduva-SP.</p>
              <div className="mt-1 flex flex-wrap items-center gap-5">
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-red px-7 py-3.5 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90"
                >
                  Chamar no WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-semibold text-red hover:text-red-deep"
                >
                  Ver no Instagram
                </a>
              </div>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-[oklch(0.90_0.02_264)] to-[oklch(0.82_0.03_264)] px-4 text-center font-sans text-xs tracking-wide text-muted">
              MAPA DO GOOGLE: PENDENTE PLACE ID
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-16 sm:px-10 lg:px-18">
          <div className="mx-auto max-w-[800px]">
            <div className="mb-8 flex flex-col gap-3">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                HORÁRIOS DAS TURMAS
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Segunda a sábado</h2>
            </div>
            <div className="flex flex-col divide-y divide-line border-t border-line">
              {HORARIOS.map((item) => (
                <div key={item.turma} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-sans text-sm font-semibold text-ink">{item.turma}</span>
                  <span className="font-sans text-sm text-muted">
                    {item.horario}, {item.local}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-18">
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-4 text-center">
            <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
              FALE PELO WHATSAPP OU INSTAGRAM
            </span>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Resposta rápida, sem formulário
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted">
              Tire suas dúvidas ou agende sua aula experimental gratuita
              direto pelo WhatsApp ou pelo Instagram.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-5">
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-red px-8 py-4 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Chamar no WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-semibold text-red hover:text-red-deep"
              >
                Ver no Instagram
              </a>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-16 sm:px-10 lg:px-18">
          <div className="mx-auto max-w-[800px]">
            <div className="mb-6 flex flex-col items-center gap-3 text-center">
              <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
                PERGUNTAS RÁPIDAS
              </span>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Antes de vir nos visitar</h2>
            </div>
            <div className="flex flex-col divide-y divide-line border-t border-line">
              <div className="py-5">
                <span className="font-sans text-base font-semibold text-ink">
                  Como funciona a aula experimental?
                </span>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  É gratuita e sem compromisso. Venha com roupa de treino
                  confortável (bermuda e camiseta, ou calça legging e
                  camiseta). O dobok só é obrigatório depois da matrícula.
                </p>
              </div>
              <div className="py-5">
                <span className="font-sans text-base font-semibold text-ink">
                  Preciso agendar antes de ir?
                </span>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Sim, chame no WhatsApp ou Instagram para combinar o melhor
                  dia e horário para sua aula experimental.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
