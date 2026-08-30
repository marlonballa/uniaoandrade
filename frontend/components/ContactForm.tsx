"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
      mensagem: (form.elements.namedItem("mensagem") as HTMLTextAreaElement).value,
      // honeypot field — real users never fill this in
      empresa: (form.elements.namedItem("empresa") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? "Não foi possível enviar sua mensagem.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Não foi possível enviar sua mensagem.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-white/15 bg-white/5 p-6 font-sans text-sm text-white/85"
      >
        Mensagem enviada! Em breve alguém da União Andrade responde por
        e-mail ou WhatsApp.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nome" className="font-sans text-xs font-medium text-white/70">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-sans text-sm text-paper placeholder:text-white/40 focus-visible:border-red"
            placeholder="Seu nome"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="telefone" className="font-sans text-xs font-medium text-white/70">
            Telefone / WhatsApp
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            required
            autoComplete="tel"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-sans text-sm text-paper placeholder:text-white/40 focus-visible:border-red"
            placeholder="(17) 90000-0000"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensagem" className="font-sans text-xs font-medium text-white/70">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={3}
          required
          className="resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-sans text-sm text-paper placeholder:text-white/40 focus-visible:border-red"
          placeholder="Quero agendar uma aula experimental para..."
        />
      </div>

      {/* honeypot: hidden from real visitors, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="empresa">Empresa</label>
        <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p role="alert" className="font-sans text-sm text-red">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 self-start rounded-xl bg-red px-7 py-3.5 font-sans text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
