import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Jornada from "@/components/Jornada";
import VideoStories from "@/components/blog/VideoStories";
import { getAllPosts, getPostBySlug, CLUSTER_LABELS } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.content, { async: false }) as string;
  const hasMosaic = post.mosaic.length >= 6;
  const heroLayout = hasMosaic
    ? "mx-auto max-w-[1200px]"
    : `mx-auto ${
        post.coverImage
          ? "grid max-w-[1200px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] lg:gap-16"
          : "max-w-[760px]"
      }`;
  const heroVideoClip = post.videoStories
    .flatMap((story) => story.clips)
    .find((clip) => clip.video.toLowerCase().endsWith(".mp4"));

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pb-16 lg:pt-36">
          {hasMosaic && heroVideoClip && (
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={heroVideoClip.poster}
                className="festival-hero-video size-full scale-[1.04] object-cover opacity-55"
              >
                <source src={heroVideoClip.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-navy-deep/65" />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-navy-deep/65 to-navy-deep" />
            </div>
          )}
          <div className={heroLayout}>
            <div className={hasMosaic && post.videoStories.length > 0 ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.8fr)] lg:gap-12" : ""}>
              <div className={`flex flex-col gap-4 ${hasMosaic ? "max-w-[840px]" : ""}`}>
                <div className="flex flex-col items-start gap-1 font-sans text-[13px] font-medium tracking-[0.1em] text-red sm:flex-row sm:items-center sm:gap-3">
                  <span>{CLUSTER_LABELS[post.cluster]}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/60">{formatDate(post.date)}</span>
                </div>
                <h1 className="max-w-[720px] font-display text-3xl leading-[1.2] text-paper sm:text-[38px]">
                  {post.title}
                </h1>
                {(post.coverImage || hasMosaic) && (
                  <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/75 sm:text-lg">
                    {post.description}
                  </p>
                )}
              </div>
              {hasMosaic && post.videoStories.length > 0 && (
                <VideoStories stories={post.videoStories} />
              )}
            </div>
            {hasMosaic ? (
              <figure className="mt-8 sm:mt-10">
                <div className="scroll-carousel -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
                  {post.mosaic.slice(0, 6).map((image, index) => (
                    <div
                      key={image.src}
                      className={`festival-mosaic-tile group relative aspect-[9/16] w-[39vw] max-w-[190px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:w-auto sm:max-w-none ${index === 1 || index === 4 ? "sm:translate-y-2" : ""}`}
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={
                          image.zoom
                            ? "100vw"
                            : "(max-width: 639px) 31vw, (max-width: 1023px) 15vw, 16vw"
                        }
                        preload={index === 0}
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.045]"
                        style={
                          image.zoom
                            ? {
                                transform: `scale(${image.zoom})`,
                                transformOrigin: image.focus ?? "center center",
                              }
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
                <figcaption className="sr-only">
                  Registros em fotos do Festival de Taekwondo da União Andrade.
                </figcaption>
              </figure>
            ) : post.coverImage ? (
              <figure className="mx-auto w-full max-w-[370px] lg:justify-self-end">
                <Image
                  src={post.coverImage}
                  width={562}
                  height={999}
                  alt={post.coverAlt ?? post.title}
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  preload
                  className="mx-auto max-h-[580px] w-full rounded-2xl border border-white/10 object-contain shadow-[0_18px_38px_oklch(0.05_0.02_264/0.32)]"
                />
                {post.coverCaption && (
                  <figcaption className="mt-3 text-center font-sans text-xs leading-relaxed text-white/60">
                    {post.coverCaption}
                  </figcaption>
                )}
              </figure>
            ) : null}
          </div>
        </section>

        <article className="px-6 py-16 sm:px-10 lg:px-18">
          <div
            className="prose-blog mx-auto max-w-[720px] font-sans text-base leading-relaxed text-muted"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="mx-auto mt-10 max-w-[720px]">
            <Link
              href={post.relatedHref}
              className="font-sans text-sm font-semibold text-red hover:text-red-deep"
            >
              Ver {post.relatedLabel} →
            </Link>
          </div>
        </article>

        {post.videoStories.length > 0 && !hasMosaic && (
          <VideoStories stories={post.videoStories} />
        )}

        {post.gallery.length > 0 && (
          <section className="bg-surface px-6 py-16 sm:px-10 lg:px-18 lg:py-20">
            <div className="mx-auto max-w-[1200px]">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Registros do festival
              </h2>
              <div className="mt-8 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {post.gallery.map((image) => (
                  <figure key={image.src} className="mx-auto w-full max-w-[360px]">
                    <Image
                      src={image.src}
                      width={562}
                      height={999}
                      alt={image.alt}
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
                      className="w-full rounded-2xl border border-line"
                    />
                    <figcaption className="mt-3 font-sans text-sm leading-relaxed text-muted">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <Jornada />
      </main>
      <Footer />
    </>
  );
}
