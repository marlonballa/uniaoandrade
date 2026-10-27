"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

type Registration = {
  id: string;
  responsibleName: string;
  studentName: string;
  kyorugui: boolean;
  poomsae: boolean;
  amountCents: number;
  paymentStatus: "pending" | "paid";
  createdAt: string;
  paidAt: string | null;
};

type RegistrationSummary = {
  registrations: Registration[];
  counts: { total: number; pending: number; paid: number };
};

type Filter = "all" | "pending" | "paid";

const buttonClassName =
  "min-h-11 rounded-xl bg-navy-deep px-5 py-3 font-sans text-sm font-semibold text-paper transition-colors hover:bg-navy-light disabled:cursor-wait disabled:bg-navy-light/70";

function responseError(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
    return data.error;
  }
  return fallback;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function modalityNames(registration: Registration) {
  return [registration.kyorugui ? "Kyorugui" : null, registration.poomsae ? "Poomsae" : null]
    .filter(Boolean)
    .join(" e ");
}

export default function AdminDashboard() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [configurationError, setConfigurationError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);
  const [isLoadingRows, setIsLoadingRows] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState("");

  const loadRegistrations = useCallback(async (refresh = false) => {
    setError("");
    if (refresh) setIsRefreshing(true);
    else setIsLoadingRows(true);

    try {
      const response = await fetch("/api/admin/open-andrade/registrations", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(responseError(data, "Não foi possível carregar as inscrições."));
        if (response.status === 401) setAuthenticated(false);
        return;
      }

      setSummary(data as RegistrationSummary);
    } catch {
      setError("Não foi possível carregar as inscrições. Confira sua conexão e tente novamente.");
    } finally {
      setIsLoadingRows(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/admin/open-andrade/session", { cache: "no-store" });
        const data = await response.json();

        if (!active) return;
        if (!response.ok) {
          setConfigurationError(responseError(data, "O painel está indisponível no momento."));
          return;
        }

        if (data.authenticated) {
          setAuthenticated(true);
          await loadRegistrations();
        }
      } catch {
        if (active) setConfigurationError("Não foi possível acessar o painel agora.");
      } finally {
        if (active) setCheckingSession(false);
      }
    }

    void checkSession();
    return () => {
      active = false;
    };
  }, [loadRegistrations]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/admin/open-andrade/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(responseError(data, "Não foi possível acessar o painel."));
        return;
      }

      setPassword("");
      setAuthenticated(true);
      await loadRegistrations();
    } catch {
      setError("Não foi possível acessar o painel. Tente novamente.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function markAsPaid(id: string) {
    setError("");
    setUpdatingId(id);

    try {
      const response = await fetch(`/api/admin/open-andrade/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "paid" }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(responseError(data, "Não foi possível atualizar o pagamento."));
        if (response.status === 401) setAuthenticated(false);
        return;
      }

      await loadRegistrations(true);
    } catch {
      setError("Não foi possível atualizar o pagamento. Tente novamente.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function logout() {
    setError("");

    try {
      const response = await fetch("/api/admin/open-andrade/session", { method: "DELETE" });
      if (!response.ok) {
        setError("Não foi possível encerrar a sessão. Tente novamente.");
        return;
      }

      setAuthenticated(false);
      setSummary(null);
      setPassword("");
    } catch {
      setError("Não foi possível encerrar a sessão. Confira sua conexão e tente novamente.");
    }
  }

  const filteredRegistrations = useMemo(() => {
    const registrations = summary?.registrations ?? [];
    if (filter === "all") return registrations;
    return registrations.filter((registration) => registration.paymentStatus === filter);
  }, [filter, summary]);

  if (checkingSession) {
    return (
      <div className="mt-8 max-w-[520px] animate-pulse border-y border-line py-7">
        <div className="h-5 w-52 rounded bg-line/70" />
        <div className="mt-5 h-12 rounded-xl bg-line/50" />
      </div>
    );
  }

  if (configurationError) {
    return (
      <p role="alert" className="mt-8 max-w-[620px] border-y border-line py-5 font-sans text-sm leading-relaxed text-red-deep">
        {configurationError}
      </p>
    );
  }

  if (!authenticated) {
    return (
      <form
        onSubmit={handleLogin}
        className="mt-8 flex max-w-[460px] flex-col gap-5 border-y border-line py-7"
      >
        <div>
          <label htmlFor="admin-password" className="font-sans text-sm font-semibold text-ink">
            Senha do painel
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3.5 font-sans text-base text-ink shadow-sm focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
          />
        </div>
        {error ? (
          <p role="alert" className="font-sans text-sm leading-relaxed text-red-deep">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={isLoggingIn} className={buttonClassName}>
          {isLoggingIn ? "Acessando…" : "Acessar inscrições"}
        </button>
      </form>
    );
  }

  if (!summary && (isLoadingRows || isRefreshing)) {
    return (
      <div className="mt-8 animate-pulse divide-y divide-line border-y border-line" aria-label="Carregando inscrições">
        {[0, 1, 2].map((item) => (
          <div key={item} className="py-5">
            <div className="h-4 w-52 rounded bg-line/70" />
            <div className="mt-3 h-3 w-72 max-w-full rounded bg-line/50" />
          </div>
        ))}
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="mt-8 max-w-[620px] border-y border-line py-7">
        <p role="alert" className="font-sans text-sm leading-relaxed text-red-deep">
          {error || "Não foi possível carregar as inscrições."}
        </p>
        <button
          type="button"
          onClick={() => void loadRegistrations(true)}
          disabled={isRefreshing}
          className={`${buttonClassName} mt-5`}
        >
          {isRefreshing ? "Atualizando…" : "Tentar novamente"}
        </button>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-3 gap-5 sm:gap-8">
          <div>
            <p className="font-sans text-xs text-muted">Inscritos</p>
            <p className="mt-1 font-display text-xl tabular-nums text-ink">
              {summary?.counts.total ?? 0}
            </p>
          </div>
          <div>
            <p className="font-sans text-xs text-muted">Pendentes</p>
            <p className="mt-1 font-display text-xl tabular-nums text-ink">
              {summary?.counts.pending ?? 0}
            </p>
          </div>
          <div>
            <p className="font-sans text-xs text-muted">Pagos</p>
            <p className="mt-1 font-display text-xl tabular-nums text-ink">
              {summary?.counts.paid ?? 0}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void loadRegistrations(true)}
            disabled={isRefreshing}
            className="min-h-10 rounded-xl border border-line px-4 py-2 font-sans text-sm font-semibold text-ink transition-colors hover:border-navy-light disabled:cursor-wait disabled:opacity-60"
          >
            {isRefreshing ? "Atualizando…" : "Atualizar lista"}
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="min-h-10 rounded-xl px-3 py-2 font-sans text-sm font-semibold text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-5" aria-label="Filtrar inscrições">
        {([
          ["all", "Todas"],
          ["pending", "Pendentes"],
          ["paid", "Pagas"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`min-h-10 rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors ${
              filter === value
                ? "bg-navy-deep text-paper"
                : "border border-line bg-paper text-muted hover:border-navy-light hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="mb-5 rounded-xl border border-red/30 bg-red/5 px-4 py-3 font-sans text-sm text-red-deep">
          {error}
        </p>
      ) : null}

      {isLoadingRows ? (
        <div className="divide-y divide-line border-y border-line" aria-label="Carregando inscrições">
          {[0, 1, 2].map((item) => (
            <div key={item} className="animate-pulse py-5">
              <div className="h-4 w-52 rounded bg-line/70" />
              <div className="mt-3 h-3 w-72 max-w-full rounded bg-line/50" />
            </div>
          ))}
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="border-y border-line py-10">
          <h2 className="font-sans text-base font-semibold text-ink">
            {summary?.registrations.length ? "Nenhuma inscrição neste filtro" : "Nenhuma inscrição cadastrada"}
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
            {summary?.registrations.length
              ? "Escolha outro filtro para ver as inscrições."
              : "As inscrições recebidas aparecerão aqui com o status do pagamento."}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {filteredRegistrations.map((registration) => (
            <li key={registration.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="break-words font-sans text-base font-semibold text-ink">
                  {registration.studentName}
                </h2>
                <p className="mt-1 break-words font-sans text-sm text-muted">
                  Responsável: {registration.responsibleName}
                </p>
                <p className="mt-1 font-sans text-sm text-muted">
                  {modalityNames(registration)} · {formatDate(registration.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3 sm:justify-end">
                <span
                  className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold ${
                    registration.paymentStatus === "paid"
                      ? "bg-navy-deep text-paper"
                      : "bg-paper text-ink ring-1 ring-line"
                  }`}
                >
                  {registration.paymentStatus === "paid" ? "Pago" : "Pendente"}
                </span>
                {registration.paymentStatus === "pending" ? (
                  <button
                    type="button"
                    onClick={() => void markAsPaid(registration.id)}
                    disabled={updatingId !== null}
                    className="min-h-10 rounded-xl border border-navy-deep px-4 py-2 font-sans text-sm font-semibold text-navy-deep transition-colors hover:bg-navy-deep hover:text-paper disabled:cursor-wait disabled:opacity-60"
                  >
                    {updatingId === registration.id ? "Salvando…" : "Marcar como pago"}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
