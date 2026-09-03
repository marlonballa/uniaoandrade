import { INSTAGRAM_URL } from "@/lib/contact";

function InstagramIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  );
}

export default function SigaInstagram() {
  return (
    <section className="bg-surface px-6 py-16 text-center sm:px-10 lg:px-18">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-4">
        <InstagramIcon />
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Acompanhe no Instagram</h2>
        <p className="font-sans text-base leading-relaxed text-muted">
          Bastidores do treino, graduações e novidades da União Andrade,
          tudo em @uniaoandrade.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 rounded-2xl bg-red px-8 py-4 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90"
        >
          Seguir @uniaoandrade
        </a>
      </div>
    </section>
  );
}
