import Image from "next/image";

const PROGRAMAS = [
  {
    nome: "Kids e Iniciantes",
    foto: "/alunos/turma-kids-esteira.jpg",
    fotoAlt: "Turma Kids da União Andrade com equipamentos de sparring no tatame",
    fotoPosicao: "50% 22%",
    texto:
      "Coordenação, disciplina e diversão para os primeiros passos no Taekwondo, no ritmo de cada criança.",
    horario: "Segunda, terça, quarta e quinta, 18h",
    local: "Catanduva",
  },
  {
    nome: "Adolescentes, Adultos e Graduados",
    foto: "/alunos/turma-adolescentes-adultos-02.jpg",
    fotoAlt: "Turma de adolescentes e adultos da União Andrade no dojang",
    fotoPosicao: "50% 12%",
    texto:
      "Técnica, luta e defesa pessoal de verdade, com dois horários por semana para quem quer evoluir mais rápido.",
    horario: "Segunda e quarta, 18h30 ou 19h30",
    local: "Catanduva",
  },
  {
    nome: "Turma Mista",
    foto: "/alunos/turma-mista-catigua.jpg",
    fotoAlt: "Turma Mista da União Andrade na unidade de Catiguá",
    fotoPosicao: "50% 20%",
    texto:
      "Aula aberta a todas as idades e graduações, aos sábados, na unidade de Catiguá.",
    horario: "Sábado, 9h30 às 11h",
    local: "Catiguá",
  },
];

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" className="shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export default function Programas() {
  return (
    <section id="programas" className="px-6 py-24 sm:px-10 lg:px-18 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          PROGRAMAS DE TREINO
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          Turmas para cada fase da jornada
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px]">
        <div className="scroll-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {PROGRAMAS.map((programa) => (
            <div
              key={programa.nome}
              className="w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line sm:w-auto sm:max-w-none sm:shrink"
            >
              <div className="relative flex h-72 items-center justify-center bg-gradient-to-br from-[oklch(0.90_0.02_264)] to-[oklch(0.82_0.03_264)] px-4 text-center font-sans text-xs tracking-wide text-muted">
                {programa.foto ? (
                  <Image
                    src={programa.foto}
                    alt={programa.fotoAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: programa.fotoPosicao }}
                  />
                ) : (
                  "FOTO: TURMA MISTA (CATIGUÁ)"
                )}
              </div>
              <div className="flex flex-col gap-3.5 p-8">
                <h3 className="font-display text-xl text-ink">{programa.nome}</h3>
                <p className="font-sans text-[15px] leading-relaxed text-muted">{programa.texto}</p>
                <div className="mt-1 flex items-center gap-2.5 border-t border-line pt-4">
                  <ClockIcon />
                  <span className="font-sans text-sm font-medium text-ink">{programa.horario}</span>
                </div>
                <span className="font-sans text-xs text-muted">{programa.local}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
