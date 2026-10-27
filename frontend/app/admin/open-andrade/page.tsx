import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import AdminDashboard from "@/components/open-andrade/AdminDashboard";

export const metadata: Metadata = {
  title: "Controle de inscrições do Open Andrade",
  robots: { index: false, follow: false },
};

export default function OpenAndradeAdminPage() {
  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-white/10 bg-navy-deep px-6 py-5 sm:px-10 lg:px-18">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="União Andrade, início">
            <Logo className="h-9 w-9" />
            <span className="font-brand text-base tracking-wide text-paper">UNIÃO ANDRADE</span>
          </Link>
          <Link
            href="/open-andrade"
            className="font-sans text-sm font-medium text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-paper"
          >
            Ver inscrição
          </Link>
        </div>
      </header>

      <section className="px-6 py-10 sm:px-10 sm:py-14 lg:px-18">
        <div className="mx-auto max-w-[1120px]">
          <h1 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            Controle de inscrições
          </h1>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted sm:text-base">
            Open Andrade de Taekwondo
          </p>
          <AdminDashboard />
        </div>
      </section>
    </main>
  );
}
