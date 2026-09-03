const CIDADES = [
  { nome: "Catanduva", sede: true, nota: null },
  { nome: "Catiguá", sede: false, nota: "Turma Mista aos sábados" },
  { nome: "Santa Adélia", sede: false, nota: null },
  { nome: "Dois Córregos", sede: false, nota: null },
  { nome: "Fernando Prestes", sede: false, nota: null },
];

function PinIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export default function Cidades() {
  return (
    <section className="bg-surface px-6 py-20 sm:px-10 lg:px-18">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          REGIÃO ATENDIDA
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          Presente em Catanduva e região
        </h2>
        <p className="max-w-[560px] font-sans text-base leading-relaxed text-muted">
          Alunos de toda a região treinam Taekwondo, arte marcial e defesa
          pessoal com a gente, sede em Catanduva, com turma aos sábados
          também em Catiguá.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1440px] grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
        {CIDADES.map((cidade) => (
          <div
            key={cidade.nome}
            className={`flex flex-col items-center justify-center gap-1 rounded-2xl bg-paper px-4 py-3.5 text-center sm:px-6 ${
              cidade.sede ? "col-span-2 border-[1.5px] border-red sm:col-span-1" : "border border-line"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PinIcon color={cidade.sede ? "var(--red)" : "var(--muted)"} />
              <span className={`font-sans text-sm ${cidade.sede ? "font-semibold" : "font-medium"} text-ink`}>
                {cidade.nome}{" "}
                {cidade.sede ? <span className="font-medium text-red">(sede)</span> : null}
              </span>
            </div>
            {cidade.nota ? (
              <span className="font-sans text-[11px] text-muted">{cidade.nota}</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
