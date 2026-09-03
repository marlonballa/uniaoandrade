import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Jornada from "@/components/Jornada";
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

  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-4">
            <div className="flex items-center gap-3 font-sans text-[13px] font-medium tracking-[0.1em] text-red">
              <span>{CLUSTER_LABELS[post.cluster]}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">{formatDate(post.date)}</span>
            </div>
            <h1 className="font-display text-3xl leading-[1.2] text-paper sm:text-[38px]">
              {post.title}
            </h1>
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

        <Jornada />
      </main>
      <Footer />
    </>
  );
}
