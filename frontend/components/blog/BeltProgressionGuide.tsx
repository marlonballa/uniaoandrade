import type { BeltColor, BeltLevel } from "@/lib/blog";

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

function BeltMarker({ color }: { color: BeltColor }) {
  return (
    <span className={`belt-guide-belt belt-guide-belt--${color}`}>
      <span className="belt-guide-belt__main" />
      <span className="belt-guide-belt__tip" />
    </span>
  );
}

function BeltMarkers({ level }: { level: BeltLevel }) {
  if (level.pairedBeltColor) {
    return (
      <span aria-hidden="true" className="belt-guide-belt-pair">
        <BeltMarker color={level.beltColor} />
        <BeltMarker color={level.pairedBeltColor} />
      </span>
    );
  }

  return (
    <span aria-hidden="true">
      <BeltMarker color={level.beltColor} />
    </span>
  );
}

function levelLabel(level: BeltLevel) {
  return level.pairedName
    ? `${level.name} e ${level.pairedName}`
    : `Faixa ${level.name}`;
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
            <BeltMarkers level={level} />
            <span>{level.pairedName ? levelLabel(level) : level.name}</span>
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
                  <BeltMarkers level={level} />
                  <div>
                    {level.grade && (
                      <p className="belt-guide-level__grade">{level.grade}</p>
                    )}
                    <h3 className="belt-guide-level__title" id={levelTitleId}>
                      {levelLabel(level)}
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
                aria-label={`${itemLabel} para ${levelLabel(level)}`}
              >
                {level.sequences.map((sequence, index) => (
                  <li key={`${level.slug}-${index}`}>{renderSequence(sequence)}</li>
                ))}
              </ol>

              {level.tutorialVideos && level.tutorialVideos.length > 0 && (
                <section
                  aria-labelledby={`${levelId}-videos-title`}
                  className="belt-guide-videos"
                >
                  <div className="belt-guide-videos__heading">
                    <h4 id={`${levelId}-videos-title`}>Vídeos das técnicas</h4>
                    <span>
                      {level.tutorialVideos.length}{" "}
                      {level.tutorialVideos.length === 1 ? "vídeo" : "vídeos"}
                    </span>
                  </div>
                  <div className="belt-guide-videos__grid">
                    {level.tutorialVideos.map((video) => (
                      <article className="belt-guide-video" key={video.videoId}>
                        <div className="belt-guide-video__player">
                          <iframe
                            allow="encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                            title={`Vídeo de ${video.title} — ${levelLabel(level)}`}
                          />
                        </div>
                        <div className="belt-guide-video__content">
                          <h5>{video.title}</h5>
                          <p>Movimentos associados:</p>
                          <ul>
                            {video.movements.map((movement) => (
                              <li key={movement}>{movement}</li>
                            ))}
                          </ul>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.videoId}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Assistir no YouTube
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
