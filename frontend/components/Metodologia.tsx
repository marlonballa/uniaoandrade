const ELEMENTOS = [
  {
    label: "Socos e chutes",
    path: "M6 4v6a6 6 0 0 0 12 0V4M9 20h6M12 16v4",
  },
  {
    label: "Defesa pessoal e torções",
    path: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
  },
  {
    label: "Derrubadas",
    path: "M4 19h16M6 15l4-8 4 6 3-4 3 6",
  },
  {
    label: "Steps e movimentação",
    path: "M12 3v3M12 18v3M4.2 12H3M21 12h-1.2M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0",
  },
  {
    label: "Técnicas de combate",
    path: "M5 12l5 5L20 7",
  },
  {
    label: "Poomsae (formas)",
    path: "M4 4h16v16H4zM8 8h8v8H8z",
  },
  {
    label: "Condicionamento físico",
    path: "M13 2 3 14h7l-1 8 10-12h-7z",
  },
  {
    label: "Coordenação e controle",
    path: "M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M4 21c0-4 4-6 8-6s8 2 8 6",
  },
];

export default function Metodologia() {
  return (
    <section
      id="metodologia"
      className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 py-24 sm:px-10 lg:flex-row lg:gap-20 lg:px-18 lg:py-28"
    >
      <div className="flex flex-1 flex-col gap-6 lg:max-w-[440px]">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          METODOLOGIA
        </span>
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          Taekwondo Kukkiwon
          <br />
          Old School
        </h2>
        <p className="font-sans text-base leading-relaxed text-muted">
          Seguimos o currículo técnico oficial do Taekwondo na linha Kukkiwon,
          com a essência marcial de quem aprendeu antes do esporte virar só
          sobre pontos. Aqui o treino de Taekwondo não se resume a chutes
          esportivos ou movimentos coreografados — é luta, defesa pessoal e
          arte marcial completa.
        </p>
        <p className="font-sans text-base leading-relaxed text-muted">
          Sob a direção do Mestre Evandro Andrade (4º Dan) e da equipe de
          Kyosanim, o aluno é apresentado a cada elemento da arte marcial —
          técnico, físico, mental e filosófico.
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3.5 sm:grid-cols-2">
        {ELEMENTOS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4.5 py-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--red)"
              strokeWidth="2"
              className="shrink-0"
            >
              <path d={item.path} />
            </svg>
            <span className="font-sans text-sm text-ink">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4.5 py-4 sm:col-span-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red)"
            strokeWidth="2"
            className="shrink-0"
          >
            <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" />
          </svg>
          <span className="font-sans text-sm text-ink">
            Disciplina, autocontrole e filosofia do Taekwondo
          </span>
        </div>
      </div>
    </section>
  );
}
