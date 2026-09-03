import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, CLUSTER_LABELS, type BlogCluster } from "@/lib/blog";
import { getRoute } from "@/lib/routes";

const route = getRoute("/blog");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.href },
};

const CLUSTER_ORDER: BlogCluster[] = ["infantil", "adulto", "tecnico"];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-deep px-6 pb-14 pt-32 sm:px-10 lg:px-18 lg:pt-36">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] text-red">
              BLOG
            </span>
            <h1 className="font-display text-4xl leading-[1.15] text-paper sm:text-[42px]">
              Blog da União Andrade
            </h1>
            <p className="max-w-[620px] font-sans text-base leading-relaxed text-white/85 sm:text-lg">
              Perguntas reais sobre Taekwondo infantil, Taekwondo para adultos
              e a técnica do Taekwondo Kukkiwon Old School, respondidas por
              quem ensina.
            </p>
          </div>
        </section>

        {CLUSTER_ORDER.map((cluster, i) => {
          const clusterPosts = posts.filter((post) => post.cluster === cluster);
          if (clusterPosts.length === 0) return null;

          return (
            <section key={cluster} className={`px-6 py-16 sm:px-10 lg:px-18 ${i % 2 === 1 ? "bg-surface" : ""}`}>
              <div className="mx-auto max-w-[1200px]">
                <h2 className="font-display text-2xl text-ink sm:text-3xl">
                  {CLUSTER_LABELS[cluster]}
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {clusterPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-7 transition-shadow hover:shadow-[0_12px_32px_oklch(0.2_0.03_264/0.08)]"
                    >
                      <span className="font-sans text-xs text-muted">{formatDate(post.date)}</span>
                      <h3 className="font-display text-lg text-ink">{post.title}</h3>
                      <p className="font-sans text-sm leading-relaxed text-muted">{post.description}</p>
                      <span className="mt-1 font-sans text-sm font-semibold text-red">
                        Ler artigo →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
