const STATS = [
  { value: "+20", label: "ANOS DE TRADIÇÃO EM CATANDUVA" },
  { value: "Dezenas", label: "DE FAIXAS-PRETAS FORMADAS" },
  { value: "5", label: "PROFESSORES (MESTRE E KYOSANIM)" },
];

export default function Estatisticas() {
  return (
    <section className="bg-navy-deep px-6 py-16 sm:px-10 lg:px-18">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-10 divide-y divide-white/15 sm:flex-row sm:gap-0 sm:divide-x sm:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 px-14 py-4 text-center first:pt-0 sm:py-0">
            <span className="font-display text-4xl font-bold tabular-nums text-paper">
              {stat.value}
            </span>
            <span className="font-sans text-xs font-semibold tracking-[0.1em] text-white/60">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
