import Image from "next/image";

const FOTOS = [
  {
    src: "/equipe/equipe-joildo-evandro-gustavo.jpg",
    alt: "Kyosanim Joildo, Mestre Evandro Andrade e Kyosanim Gustavo, faixas-pretas da União Andrade",
    posicao: "50% 25%",
    nomes: "Kyosanim Joildo, Mestre Evandro e Kyosanim Gustavo",
  },
  {
    src: "/equipe/equipe-nayara-joildo-ritinha.jpg",
    alt: "Kyosanim Nayara, Kyosanim Joildo e Kyosanim Ritinha, faixas-pretas da União Andrade",
    posicao: "50% 15%",
    nomes: "Kyosanim Nayara, Kyosanim Joildo e Kyosanim Ritinha",
  },
  {
    src: "/equipe/mestre-evandro-ritinha.jpg",
    alt: "Mestre Evandro Andrade e a Kyosanim Ritinha na União Andrade",
    posicao: "50% 15%",
    nomes: "Mestre Evandro e Kyosanim Ritinha",
  },
];

type EquipeProps = {
  moreLink?: { href: string; label: string };
};

export default function Equipe({ moreLink }: EquipeProps) {
  return (
    <section className="bg-surface px-6 py-24 sm:px-10 lg:px-18 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          QUEM ENSINA
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          Mestre Evandro Andrade e equipe de Kyosanim
        </h2>
        <p className="max-w-[560px] font-sans text-base leading-relaxed text-muted">
          Mestre Evandro Andrade (4º Dan) e os Kyosanim Joildo, Gustavo,
          Nayara e Ritinha conduzem o treino, cada aluno acompanhado por
          quem vive o Taekwondo como arte marcial todos os dias.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-3">
        {FOTOS.map((foto) => (
          <div key={foto.src} className="flex flex-col gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(min-width: 640px) 400px, 100vw"
                className="object-cover"
                style={{ objectPosition: foto.posicao }}
              />
            </div>
            <span className="text-center font-sans text-sm font-medium text-ink">
              {foto.nomes}
            </span>
          </div>
        ))}
      </div>

      {moreLink ? (
        <div className="mx-auto mt-8 max-w-[1200px] text-center">
          <a href={moreLink.href} className="font-sans text-sm font-semibold text-red hover:text-red-deep">
            {moreLink.label}
          </a>
        </div>
      ) : null}
    </section>
  );
}
