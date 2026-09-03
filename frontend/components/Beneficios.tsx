function IconDisciplina() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M4 8h16M4 8l-2 5a3 3 0 0 0 6 0zM20 8l-2 5a3 3 0 0 0 6 0zM12 7v13M8 20h8" />
    </svg>
  );
}

function IconAutoconfianca() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function IconCondicionamento() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  );
}

function IconDefesaPessoal() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

function IconRespeito() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="13" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="11" rx="1" />
      <rect x="16" y="5" width="4" height="15" rx="1" />
    </svg>
  );
}

function IconComunidade() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="9" r="3" />
      <path d="M2 20c0-3.5 3-5.5 6-5.5s6 2 6 5.5" />
      <path d="M12 20c0-3.5 2.5-5.5 5-5.5s5 2 5 5.5" />
    </svg>
  );
}

export type BeneficioItem = {
  title: string;
  text: string;
  Icon: () => React.ReactElement;
};

export const BENEFICIOS: BeneficioItem[] = [
  {
    title: "Disciplina e autocontrole",
    text: "Rotina e limites que se refletem dentro e fora do tatame.",
    Icon: IconDisciplina,
  },
  {
    title: "Autoconfiança",
    text: "Cada graduação é uma conquista construída, não dada.",
    Icon: IconAutoconfianca,
  },
  {
    title: "Condicionamento completo",
    text: "Força, flexibilidade e resistência, sem monotonia de academia.",
    Icon: IconCondicionamento,
  },
  {
    title: "Defesa pessoal real",
    text: "Técnicas de luta e defesa pessoal aplicáveis de verdade, para o dia a dia.",
    Icon: IconDefesaPessoal,
  },
  {
    title: "Respeito e hierarquia",
    text: "Valores da tradição marcial, praticados a cada aula.",
    Icon: IconRespeito,
  },
  {
    title: "Comunidade",
    text: "Evolução ao lado de quem também está no seu processo.",
    Icon: IconComunidade,
  },
];

type BeneficiosProps = {
  items?: BeneficioItem[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  moreLink?: { href: string; label: string };
};

export default function Beneficios({
  items = BENEFICIOS,
  eyebrow = "BENEFÍCIOS",
  heading = "O que o Taekwondo desenvolve de verdade",
  description = "Mais do que condicionamento físico, o treino constrói disciplina, autoconfiança e caráter, no seu tempo, sem comparação com ninguém.",
  moreLink,
}: BeneficiosProps) {
  return (
    <section className="bg-surface px-6 py-24 sm:px-10 lg:px-18 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          {eyebrow}
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-[560px] font-sans text-base leading-relaxed text-muted">
          {description}
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-3.5 rounded-2xl border border-line bg-paper p-8 transition-shadow hover:shadow-[0_12px_32px_oklch(0.2_0.03_264/0.08)]"
          >
            <item.Icon />
            <h3 className="font-sans text-[17px] font-semibold text-ink">{item.title}</h3>
            <p className="font-sans text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>

      {moreLink ? (
        <div className="mx-auto mt-4 max-w-[1440px] text-center">
          <a href={moreLink.href} className="font-sans text-sm font-semibold text-red hover:text-red-deep">
            {moreLink.label}
          </a>
        </div>
      ) : null}
    </section>
  );
}
