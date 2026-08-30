import { DEFAULT_WHATSAPP_MESSAGE, EXPERIMENTAL_CLASS_URL, whatsappLink } from "@/lib/contact";

export default function Jornada() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-24 text-center sm:px-10 lg:px-18 lg:py-28">
      <div
        aria-hidden
        className="absolute -bottom-40 -left-36 h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.19 27 / 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[680px] flex-col items-center gap-5">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          COMECE QUANDO ESTIVER PRONTO
        </span>
        <h2 className="font-display text-3xl text-paper sm:text-4xl">
          Embarque nessa jornada conosco
        </h2>
        <p className="max-w-[600px] font-sans text-base leading-relaxed text-white/80">
          Não existe idade certa para começar — só o momento em que você
          decide. Nossa turma adulta tem gente que começou aos 30, 40 e
          depois dos 50; nossas turmas kids acompanham cada criança no seu
          próprio ritmo.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-5">
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
            Fale conosco no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
