import Logo from "./Logo";
import ContactForm from "./ContactForm";
import { INSTAGRAM_URL, WHATSAPP_NUMBER, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

export default function Footer() {
  return (
    <footer id="contato" className="bg-navy-deep px-6 py-20 sm:px-10 lg:px-18 lg:pb-9 lg:pt-24">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 lg:flex-row lg:justify-between">
        <div className="flex max-w-[380px] flex-col gap-5">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="font-brand text-base tracking-wide text-paper">UNIÃO ANDRADE</span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-white/65">
            Taekwondo Kukkiwon Old School — arte marcial, luta e defesa
            pessoal em Catanduva há mais de 20 anos.
          </p>

          <dl className="flex flex-col gap-1.5 font-sans text-sm text-white/80">
            <div>
              <dt className="sr-only">Endereço</dt>
              <dd>R. Minas Gerais, 454 — Centro, Catanduva</dd>
            </div>
            <div>
              <dt className="sr-only">Horário</dt>
              <dd>Segunda a sábado — veja os horários por turma</dd>
            </div>
          </dl>

          <div className="mt-1 flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="União Andrade no Instagram"
              className="text-white/75 transition-colors hover:text-red"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
            </a>
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp União Andrade, ${WHATSAPP_NUMBER}`}
              className="text-white/75 transition-colors hover:text-red"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20l1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
              </svg>
            </a>
          </div>

          <nav aria-label="Links do site" className="mt-2 flex flex-col gap-2 font-sans text-sm text-white/70">
            <a href="#metodologia" className="w-fit hover:text-paper">Metodologia</a>
            <a href="#programas" className="w-fit hover:text-paper">Programas de Treino</a>
            <a href="#historias" className="w-fit hover:text-paper">Histórias</a>
            <a href="#faq" className="w-fit hover:text-paper">FAQ</a>
          </nav>
        </div>

        <div className="flex-1 lg:max-w-[480px]">
          <h2 className="font-display text-xl text-paper">Fale com a gente</h2>
          <p className="mt-2 font-sans text-sm text-white/65">
            Prefere e-mail? Preencha o formulário. Prefere resposta na hora?
            Chame no WhatsApp.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-2 border-t border-white/10 pt-6 font-sans text-xs text-white/45 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} União Andrade Taekwondo Marcial. Todos os direitos reservados.</span>
        <span>Catanduva — SP</span>
      </div>
    </footer>
  );
}
