import Image from "next/image";
import { getTopInstagramPosts } from "@/lib/instagram";
import { INSTAGRAM_URL } from "@/lib/contact";

function truncate(text: string, max: number) {
  const clean = text.trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  );
}

export default async function InstagramFeed() {
  const posts = await getTopInstagramPosts(5);

  // Sem INSTAGRAM_USER_ID / INSTAGRAM_ACCESS_TOKEN configurados (ou se a
  // busca falhar), a seção simplesmente não aparece — nunca quebra a
  // página nem mostra um estado de erro pro visitante.
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-navy-deep px-6 py-24 sm:px-10 lg:px-18 lg:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="flex items-center gap-2 font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          <InstagramIcon />
          @UNIAOANDRADE
        </span>
        <h2 className="max-w-[720px] font-display text-4xl text-paper sm:text-5xl">
          Os posts que mais bombam no Instagram
        </h2>
        <p className="max-w-[560px] font-sans text-base leading-relaxed text-white/70">
          Os posts com mais engajamento do @uniaoandrade, atualizados a cada
          15 dias.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1440px] grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={post.imageUrl}
              alt={truncate(post.caption, 90) || "Post do Instagram da União Andrade"}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent p-5">
              <p className="font-sans text-sm leading-snug text-paper opacity-0 transition-opacity group-hover:opacity-100">
                {truncate(post.caption, 90)}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-paper px-8 py-4 font-sans text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-0.5"
        >
          Seguir @uniaoandrade
        </a>
      </div>
    </section>
  );
}
