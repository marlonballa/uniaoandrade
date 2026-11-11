import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { hasValidAdminSession } from "@/lib/open-andrade/admin-session";

export const metadata: Metadata = {
  title: "Área administrativa | União Andrade",
  robots: { index: false, follow: false },
};

const tools = [
  {
    href: "/admin/open-andrade",
    eyebrow: "Eventos",
    title: "Eventos",
    description: "Acompanhe as inscrições e os pagamentos do Open Andrade.",
  },
  {
    href: "/admin/blog",
    eyebrow: "Publicações",
    title: "Publicações",
    description: "Edite os movimentos, vídeos e o Arquivo do Kibon Donjak.",
  },
];

export default async function AdminHomePage() {
  const cookieStore = await cookies();
  const request = new Request("http://localhost/admin", {
    headers: { cookie: cookieStore.toString() },
  });
  if (!hasValidAdminSession(request)) redirect("/admin/login");

  return (
    <main className="min-h-screen bg-[#f3f4f8] px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[1000px]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="União Andrade, início">
            <Logo className="h-10 w-10" />
            <span>
              <span className="block font-brand text-base tracking-wide text-ink">UNIÃO ANDRADE</span>
              <span className="block font-sans text-[10px] tracking-[0.2em] text-red">ÁREA DA EQUIPE</span>
            </span>
          </Link>
          <Link href="/" className="font-sans text-sm font-medium text-muted underline decoration-line underline-offset-4 hover:text-ink">
            Voltar ao site
          </Link>
        </header>

        <section className="py-10 sm:py-14">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.17em] text-red">Administração</p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">O que você quer gerenciar?</h1>
          <p className="mt-3 max-w-[620px] font-sans text-base leading-relaxed text-muted">
            Acesse os painéis de Eventos e Publicações da União Andrade.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-navy-light hover:shadow-md sm:p-7"
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-red">{tool.eyebrow}</p>
                <h2 className="mt-3 font-display text-xl text-ink group-hover:text-navy-light sm:text-2xl">{tool.title}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{tool.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-navy-deep">
                  Abrir painel <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
