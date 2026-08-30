import fs from "node:fs";
import path from "node:path";
import GaleriaLightbox from "./GaleriaLightbox";

const IMAGE_EXTENSION = /\.(jpe?g|png|webp)$/i;

function getGaleriaPhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "alunos");

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSION.test(file) && !file.startsWith("_"))
    .sort()
    .map((file) => `/alunos/${file}`);
}

export default function Galeria() {
  const photos = getGaleriaPhotos();

  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface px-6 py-24 sm:px-10 lg:px-18 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          COMUNIDADE
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          A rotina lá no dojang
        </h2>
        <p className="max-w-[560px] font-sans text-base leading-relaxed text-muted">
          Clique em uma foto para ver em tamanho grande.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-[1440px]">
        <GaleriaLightbox photos={photos} />
      </div>
    </section>
  );
}
