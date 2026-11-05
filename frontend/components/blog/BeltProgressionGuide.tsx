import type { BeltLevel } from "@/lib/blog";

type BeltProgressionGuideProps = {
  levels: BeltLevel[];
  idPrefix: string;
  heading: string;
  description: string;
  itemLabel: string;
  note?: { title: string; text: string };
};

function renderSequence(sequence: string) {
  return sequence.split(/(\s\+\s)/g).map((part, index) =>
    part.trim() === "+" ? (
      <span className="belt-guide-plus" key={`${index}-plus`} aria-label="combinação">
        +
      </span>
    ) : (
      part
    ),
  );
}

function itemCount(count: number, label: string) {
  return `${count} ${label}`;
}

export default function BeltProgressionGuide({
  levels,
  idPrefix,
  heading,
  description,
  itemLabel,
  note,
}: BeltProgressionGuideProps) {
  const headingId = `${idPrefix}-guide-title`;

  return (
    <section className="belt-guide" aria-labelledby={headingId}>
      <div className="belt-guide__heading">
        <h2 id={headingId}>{heading}</h2>
        <p>{description}</p>
      </div>

      <nav className="belt-guide-jump" aria-label="Navegação pelas faixas">
        {levels.map((level) => (
          <a
            className="belt-guide-jump__link"
            href={`#${idPrefix}-${level.slug}`}
            key={level.slug}
          >
            <span
              aria-hidden="true"
              className={`belt-guide-belt belt-guide-belt--${level.beltColor}`}
            >
              <span className="belt-guide-belt__main" />
              <span className="belt-guide-belt__tip" />
            </span>
            <span>{level.name}</span>
          </a>
        ))}
      </nav>

      {note && (
        <aside className="belt-guide-note" role="note">
          <strong>{note.title}</strong>
          <p>{note.text}</p>
        </aside>
      )}

      <div className="belt-guide-levels">
        {levels.map((level) => {
          const levelId = `${idPrefix}-${level.slug}`;
          const levelTitleId = `${levelId}-title`;

          return (
            <section
              aria-labelledby={levelTitleId}
              className={`belt-guide-level belt-guide-level--${level.beltColor}`}
              id={levelId}
              key={level.slug}
            >
              <header className="belt-guide-level__header">
                <div className="belt-guide-level__identity">
                  <span
                    aria-hidden="true"
                    className={`belt-guide-belt belt-guide-belt--${level.beltColor}`}
                  >
                    <span className="belt-guide-belt__main" />
                    <span className="belt-guide-belt__tip" />
                  </span>
                  <div>
                    {level.grade && (
                      <p className="belt-guide-level__grade">{level.grade}</p>
                    )}
                    <h3 className="belt-guide-level__title" id={levelTitleId}>
                      Faixa {level.name}
                    </h3>
                  </div>
                </div>
                <div className="belt-guide-level__details">
                  {level.form && (
                    <div className="belt-guide-level__form">
                      <span>{level.form}</span>
                      {level.formNote && <small>{level.formNote}</small>}
                    </div>
                  )}
                  <span className="belt-guide-level__count">
                    {itemCount(level.sequences.length, itemLabel)}
                  </span>
                </div>
              </header>

              <ol
                className="belt-guide-sequences"
                aria-label={`${itemLabel} da faixa ${level.name}`}
              >
                {level.sequences.map((sequence, index) => (
                  <li key={`${level.slug}-${index}`}>{renderSequence(sequence)}</li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </section>
  );
}
