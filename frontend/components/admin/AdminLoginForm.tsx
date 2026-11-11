"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Logo from "@/components/Logo";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/open-andrade/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Não foi possível entrar.");
      router.replace("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f4f8] px-5 py-10">
      <section className="w-full max-w-[440px] rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-9">
        <Link href="/" className="flex items-center gap-3" aria-label="União Andrade, início">
          <Logo className="h-10 w-10" />
          <span className="font-brand text-sm text-ink">UNIÃO ANDRADE</span>
        </Link>
        <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-red">Acesso da equipe</p>
        <h1 className="mt-2 font-display text-2xl text-ink">Entrar na área administrativa</h1>
        <p className="mt-2 font-sans text-sm leading-relaxed text-muted">Digite a senha da equipe. Após a validação, você será direcionado ao painel de Eventos e Publicações.</p>
        <form onSubmit={(event) => void submit(event)} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-sans text-sm font-semibold text-ink">Senha</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 font-sans text-sm text-ink outline-none focus:border-navy-light focus:ring-2 focus:ring-navy-light/15"
              required
            />
          </label>
          {error && <p role="alert" className="font-sans text-sm text-red-deep">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-navy-deep px-4 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-wait disabled:opacity-60" disabled={busy}>
            {busy ? "Validando…" : "Entrar"}
          </button>
        </form>
        <Link href="/" className="mt-5 inline-block font-sans text-sm text-muted underline underline-offset-4">Voltar ao site</Link>
      </section>
    </main>
  );
}
