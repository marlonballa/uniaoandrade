import type { DonjakLevel } from "@/lib/blog";

type DonjakGuideProps = {
  levels: DonjakLevel[];
};

function renderSequence(sequence: string) {
  return sequence.split(/(\s\+\s)/g).map((part, index) =>
    part.trim() === "+" ? (
      <span className="donjak-plus" key={`${index}-plus`} aria-label="combinação">
        +
      </span>
    ) : (
      part
    ),
  );
}

function sequenceCount(count: number) {
  return `${count} ${count === 1 ? "sequência" : "sequências"}`;
}

export default function DonjakGuide({ levels }: DonjakGuideProps) {
  return (
    <section className="donjak-guide" aria-labelledby="donjak-guide-title">
      <div className="donjak-guide__heading">
        <h2 id="donjak-guide-title">Sequências por graduação</h2>
        <p>
          Escolha uma faixa para ir direto à lista. Cada item mantém a ordem
          apresentada no material de estudo.
        </p>
      </div>

      <nav className="donjak-jump" aria-label="Navegação pelas faixas">
        {levels.map((level) => (
          <a
            className="donjak-jump__link"
            href={`#donjak-${level.slug}`}
            key={level.slug}
          >
            <span
              aria-hidden="true"
              className={`donjak-belt donjak-belt--${level.beltColor}`}
            >
              <span className="donjak-belt__main" />
              <span className="donjak-belt__tip" />
            </span>
            <span>{level.name}</span>
          </a>
        ))}
      </nav>

      <aside className="donjak-note" role="note">
        <strong>Observação técnica</strong>
        <p>
          A referência marca para conferência do instrutor a distribuição da
          Base na faixa branca e os lados Bande/Baro das combinações a partir
          da faixa azul. Siga a orientação do Mestre e dos instrutores no
          treino.
        </p>
      </aside>

      <div className="donjak-levels">
        {levels.map((level) => (
          <section
            aria-labelledby={`donjak-${level.slug}-title`}
            className={`donjak-level donjak-level--${level.beltColor}`}
            id={`donjak-${level.slug}`}
            key={level.slug}
          >
            <header className="donjak-level__header">
              <div className="donjak-level__identity">
                <span
                  aria-hidden="true"
                  className={`donjak-belt donjak-belt--${level.beltColor}`}
                >
                  <span className="donjak-belt__main" />
                  <span className="donjak-belt__tip" />
                </span>
                <div>
                  <p className="donjak-level__grade">{level.grade}</p>
                  <h3
                    className="donjak-level__title"
                    id={`donjak-${level.slug}-title`}
                  >
                    Faixa {level.name}
                  </h3>
                </div>
              </div>
              <div className="donjak-level__details">
                <div className="donjak-level__form">
                  <span>{level.form}</span>
                  {level.formNote && <small>{level.formNote}</small>}
                </div>
                <span className="donjak-level__count">
                  {sequenceCount(level.sequences.length)}
                </span>
              </div>
            </header>

            <ol className="donjak-sequences" aria-label={`Sequências da faixa ${level.name}`}>
              {level.sequences.map((sequence, index) => (
                <li key={`${level.slug}-${index}`}>{renderSequence(sequence)}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  );
}
