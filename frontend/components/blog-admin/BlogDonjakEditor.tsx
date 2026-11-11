"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import type {
  ArchivedDonjakMovement,
  BlogDonjakEditorRecord,
  BlogDonjakEditorState,
} from "@/lib/blog-admin";
import type { BeltLevel, BeltTutorialVideo } from "@/lib/blog";

const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy-deep px-5 py-3 font-sans text-sm font-semibold text-paper transition-colors hover:bg-navy-light disabled:cursor-wait disabled:opacity-60";
const buttonSecondary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2 font-sans text-sm font-semibold text-ink transition-colors hover:border-navy-light disabled:cursor-wait disabled:opacity-60";
const inputClass =
  "min-h-11 w-full rounded-xl border border-line bg-white px-3 py-2.5 font-sans text-sm text-ink outline-none transition focus:border-navy-light focus:ring-2 focus:ring-navy-light/15";

type EditorPage = "editor" | "archive";

function responseError(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
    return data.error;
  }
  return fallback;
}

function readVideoId(value: string) {
  const input = value.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host !== "youtube.com" && host !== "m.youtube.com" && host !== "youtube-nocookie.com") {
      return null;
    }
    const segments = url.pathname.split("/").filter(Boolean);
    const id = url.searchParams.get("v") ??
      (segments[0] === "embed" || segments[0] === "shorts" || segments[0] === "live" ? segments[1] : null);
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function cloneState(state: BlogDonjakEditorState): BlogDonjakEditorState {
  return structuredClone(state);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function videoThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

function videoHref(videoId: string) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

function joinMovementToVideo(videos: BeltTutorialVideo[], video: BeltTutorialVideo) {
  const existing = videos.find((item) => item.videoId === video.videoId);
  if (existing) {
    return videos.map((item) => item.videoId === video.videoId
      ? { ...item, movements: [...new Set([...item.movements, ...video.movements])] }
      : item);
  }
  return [...videos, video];
}

export default function BlogDonjakEditor() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [configurationError, setConfigurationError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [record, setRecord] = useState<BlogDonjakEditorRecord | null>(null);
  const [draft, setDraft] = useState<BlogDonjakEditorState | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState("");
  const [page, setPage] = useState<EditorPage>("editor");
  const [activeLevelSlug, setActiveLevelSlug] = useState("");
  const [activeMovementIndex, setActiveMovementIndex] = useState(0);
  const [newMovementName, setNewMovementName] = useState("");
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ArchivedDonjakMovement | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);

  const activeLevel = useMemo(
    () => draft?.levels.find((level) => level.slug === activeLevelSlug) ?? draft?.levels[0] ?? null,
    [activeLevelSlug, draft],
  );
  const selectedMovement = activeLevel?.sequences[activeMovementIndex] ?? "";
  const isDirty = Boolean(draft && JSON.stringify(draft) !== savedSnapshot);
  const totalMovements = draft?.levels.reduce((count, level) => count + level.sequences.length, 0) ?? 0;

  const loadEditor = useCallback(async () => {
    setError("");
    setNotice("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/blog/donjak", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(responseError(data, "Não foi possível carregar o editor."));
        if (response.status === 401) setAuthenticated(false);
        return false;
      }

      const nextRecord = data as BlogDonjakEditorRecord;
      const nextState = cloneState(nextRecord.state);
      setRecord(nextRecord);
      setDraft(nextState);
      setSavedSnapshot(JSON.stringify(nextState));
      setActiveLevelSlug((current) => current || nextState.levels[0]?.slug || "");
      setActiveMovementIndex(0);
      setPage("editor");
      return true;
    } catch {
      setError("Não foi possível carregar o editor. Confira sua conexão e tente novamente.");
      return false;
    } finally {
      setIsLoading(false);
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
          setConfigurationError(responseError(data, "A área administrativa está indisponível no momento."));
          return;
        }
        if (data.authenticated) {
          setAuthenticated(true);
          await loadEditor();
        }
      } catch {
        if (active) setConfigurationError("Não foi possível acessar a área administrativa agora.");
      } finally {
        if (active) setCheckingSession(false);
      }
    }
    void checkSession();
    return () => { active = false; };
  }, [loadEditor]);

  useEffect(() => {
    const dialog = deleteDialogRef.current;
    if (pendingDelete && dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, [pendingDelete]);

  function updateActiveLevel(transform: (level: BeltLevel) => BeltLevel) {
    if (!activeLevel) return;
    setDraft((current) => current
      ? {
          ...current,
          levels: current.levels.map((level) => level.slug === activeLevel.slug ? transform(level) : level),
        }
      : current);
  }

  function selectLevel(level: BeltLevel) {
    setActiveLevelSlug(level.slug);
    setActiveMovementIndex(0);
    setError("");
  }

  function renameMovement(index: number, value: string) {
    if (!activeLevel) return;
    const oldName = activeLevel.sequences[index];
    const nextName = value.slice(0, 180);
    updateActiveLevel((level) => ({
      ...level,
      sequences: level.sequences.map((name, position) => position === index ? nextName : name),
      tutorialVideos: (level.tutorialVideos ?? []).map((video) => ({
        ...video,
        movements: video.movements.map((name) => name === oldName ? nextName : name),
      })),
    }));
  }

  function moveMovement(index: number, direction: -1 | 1) {
    if (!activeLevel) return;
    const destination = index + direction;
    if (destination < 0 || destination >= activeLevel.sequences.length) return;
    updateActiveLevel((level) => {
      const sequences = [...level.sequences];
      [sequences[index], sequences[destination]] = [sequences[destination], sequences[index]];
      return { ...level, sequences };
    });
    setActiveMovementIndex(destination);
  }

  function addMovement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeLevel) return;
    const name = newMovementName.trim();
    if (!name) return;
    if (activeLevel.sequences.some((item) => item.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"))) {
      setError("Esse movimento já está cadastrado nesta faixa.");
      return;
    }
    updateActiveLevel((level) => ({ ...level, sequences: [...level.sequences, name] }));
    setActiveMovementIndex(activeLevel.sequences.length);
    setNewMovementName("");
    setError("");
    setNotice("Movimento adicionado. Salve para publicar a alteração.");
  }

  function archiveMovement(index: number) {
    if (!draft || !activeLevel) return;
    const name = activeLevel.sequences[index];
    const relatedVideos = (activeLevel.tutorialVideos ?? [])
      .filter((video) => video.movements.includes(name))
      .map(({ title, videoId }) => ({ title, videoId }));
    const archived: ArchivedDonjakMovement = {
      id: crypto.randomUUID(),
      levelSlug: activeLevel.slug,
      originalIndex: index,
      name,
      videos: relatedVideos,
      archivedAt: new Date().toISOString(),
    };
    updateActiveLevel((level) => ({
      ...level,
      sequences: level.sequences.filter((_, position) => position !== index),
      tutorialVideos: (level.tutorialVideos ?? [])
        .map((video) => ({ ...video, movements: video.movements.filter((movement) => movement !== name) }))
        .filter((video) => video.movements.length > 0),
    }));
    setDraft((current) => current ? { ...current, archive: [archived, ...current.archive] } : current);
    setActiveMovementIndex(Math.max(0, Math.min(index, activeLevel.sequences.length - 2)));
    setError("");
    setNotice("Técnica movida para o Arquivo. Salve para confirmar a alteração.");
  }

  function restoreMovement(item: ArchivedDonjakMovement) {
    if (!draft) return;
    const target = draft.levels.find((level) => level.slug === item.levelSlug);
    if (!target) {
      setError("Não encontrei a graduação original desta técnica.");
      return;
    }
    if (target.sequences.some((name) => name.toLocaleLowerCase("pt-BR") === item.name.toLocaleLowerCase("pt-BR"))) {
      setError(`Já existe um movimento chamado “${item.name}” nessa faixa. Renomeie-o antes de restaurar.`);
      return;
    }
    const destination = Math.min(item.originalIndex, target.sequences.length);
    setDraft((current) => current ? {
      ...current,
      levels: current.levels.map((level) => {
        if (level.slug !== item.levelSlug) return level;
        const sequences = [...level.sequences];
        sequences.splice(destination, 0, item.name);
        const restoredVideos = item.videos.map((video) => ({ ...video, movements: [item.name] }));
        let tutorialVideos = level.tutorialVideos ?? [];
        for (const video of restoredVideos) tutorialVideos = joinMovementToVideo(tutorialVideos, video);
        return { ...level, sequences, tutorialVideos };
      }),
      archive: current.archive.filter((entry) => entry.id !== item.id),
    } : current);
    setPage("editor");
    setActiveLevelSlug(item.levelSlug);
    setActiveMovementIndex(destination);
    setError("");
    setNotice("Técnica restaurada. Salve para confirmar a alteração.");
  }

  function permanentlyDelete(item: ArchivedDonjakMovement) {
    setDraft((current) => current
      ? { ...current, archive: current.archive.filter((entry) => entry.id !== item.id) }
      : current);
    setPendingDelete(null);
    setError("");
    setNotice("Técnica removida definitivamente do Arquivo. Salve para confirmar.");
  }

  function cancelPermanentDelete() {
    setPendingDelete(null);
  }

  function addVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeLevel || !selectedMovement) return;
    const videoId = readVideoId(newVideoUrl);
    const title = newVideoTitle.trim();
    if (!title) {
      setVideoError("Informe um título para o vídeo.");
      return;
    }
    if (!videoId) {
      setVideoError("Cole um link válido do YouTube ou o ID do vídeo.");
      return;
    }
    updateActiveLevel((level) => ({
      ...level,
      tutorialVideos: joinMovementToVideo(level.tutorialVideos ?? [], {
        title,
        videoId,
        movements: [selectedMovement],
      }),
    }));
    setShowVideoForm(false);
    setNewVideoTitle("");
    setNewVideoUrl("");
    setVideoError("");
    setNotice("Vídeo associado ao movimento. Salve para publicar a alteração.");
  }

  function unlinkVideo(videoId: string) {
    if (!selectedMovement) return;
    updateActiveLevel((level) => ({
      ...level,
      tutorialVideos: (level.tutorialVideos ?? [])
        .map((video) => video.videoId === videoId
          ? { ...video, movements: video.movements.filter((name) => name !== selectedMovement) }
          : video)
        .filter((video) => video.movements.length > 0),
    }));
    setNotice("Vídeo desvinculado deste movimento. Salve para confirmar a alteração.");
  }

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
        setError(responseError(data, "Não foi possível acessar a área administrativa."));
        return;
      }
      setPassword("");
      setAuthenticated(true);
      await loadEditor();
    } catch {
      setError("Não foi possível acessar a área administrativa. Tente novamente.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function saveChanges() {
    if (!draft || !record || !isDirty) return;
    setIsSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/blog/donjak", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: draft, revision: record.revision }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(responseError(data, "Não foi possível salvar as alterações."));
        if (response.status === 401) setAuthenticated(false);
        return;
      }
      const nextRecord = data as BlogDonjakEditorRecord;
      const nextState = cloneState(nextRecord.state);
      setRecord(nextRecord);
      setDraft(nextState);
      setSavedSnapshot(JSON.stringify(nextState));
      setNotice("Alterações salvas e publicadas no artigo.");
    } catch {
      setError("Não foi possível salvar as alterações. Confira sua conexão e tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    try {
      const response = await fetch("/api/admin/open-andrade/session", { method: "DELETE" });
      if (!response.ok) {
        setError("Não foi possível encerrar a sessão. Tente novamente.");
        return;
      }
      setAuthenticated(false);
      setRecord(null);
      setDraft(null);
      setPassword("");
      setSavedSnapshot("");
    } catch {
      setError("Não foi possível encerrar a sessão. Confira sua conexão e tente novamente.");
    }
  }

  const selectedVideos = (activeLevel?.tutorialVideos ?? [])
    .filter((video) => video.movements.includes(selectedMovement));

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-ink">
      <header className="border-b border-white/10 bg-navy-deep px-5 py-4 text-paper sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-3" aria-label="Área administrativa">
            <Logo className="h-9 w-9" />
            <span>
              <span className="block font-brand text-sm tracking-wide">UNIÃO ANDRADE</span>
              <span className="block font-sans text-[9px] tracking-[0.2em] text-red">EDITOR DO BLOG</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs font-medium text-white/75 sm:text-sm">
            <Link href="/admin" className="hover:text-paper">Painel inicial</Link>
            <Link href="/admin/open-andrade" className="hover:text-paper">Inscrições</Link>
            <Link href="/blog/kibon-donjak-faixas-coloridas" target="_blank" className="hover:text-paper">Ver artigo ↗</Link>
            {authenticated ? <button type="button" onClick={() => void logout()} className="hover:text-paper">Sair</button> : null}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12">
        {checkingSession ? (
          <div className="mx-auto max-w-[520px] animate-pulse py-10">
            <div className="h-5 w-56 rounded bg-line/70" />
            <div className="mt-5 h-12 rounded-xl bg-line/50" />
          </div>
        ) : configurationError ? (
          <p role="alert" className="mx-auto max-w-[640px] rounded-2xl border border-red/25 bg-white p-6 font-sans text-sm leading-relaxed text-red-deep">
            {configurationError}
          </p>
        ) : !authenticated ? (
          <section className="mx-auto max-w-[480px] rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-red">Acesso da equipe</p>
            <h1 className="mt-3 font-display text-2xl text-ink">Editor do Kibon Donjak</h1>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">Use a mesma senha da área administrativa da União Andrade.</p>
            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
              <label htmlFor="blog-admin-password" className="font-sans text-sm font-semibold text-ink">Senha do painel</label>
              <input
                id="blog-admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className={inputClass}
              />
              {error ? <p role="alert" className="font-sans text-sm leading-relaxed text-red-deep">{error}</p> : null}
              <button type="submit" disabled={isLoggingIn || !password} className={buttonPrimary}>
                {isLoggingIn ? "Acessando…" : "Acessar editor"}
              </button>
            </form>
          </section>
        ) : isLoading || !draft || !record ? (
          <div className="mx-auto max-w-[620px] animate-pulse py-10">
            <div className="h-6 w-72 rounded bg-line/70" />
            <div className="mt-5 h-40 rounded-2xl bg-line/50" />
          </div>
        ) : (
          <>
            <div className="mb-7 flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.17em] text-red">Publicações / Kibon Donjak</p>
                <h1 className="mt-2 max-w-[900px] font-display text-2xl leading-tight text-ink sm:text-3xl">
                  Kibon Donjak por faixa: sequência completa de movimentos
                </h1>
                <p className="mt-2 font-sans text-sm text-muted">
                  {totalMovements} movimentos ativos · {draft.archive.length} no Arquivo · Última gravação {formatDate(record.updatedAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold ${isDirty ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"}`}>
                  {isDirty ? "Alterações pendentes" : "Tudo salvo"}
                </span>
                <button type="button" onClick={() => void saveChanges()} disabled={!isDirty || isSaving} className={buttonPrimary}>
                  {isSaving ? "Salvando…" : "Salvar e publicar"}
                </button>
              </div>
            </div>

            {error ? (
              <div role="alert" className="mb-5 flex flex-col gap-3 rounded-xl border border-red/25 bg-white px-4 py-3 font-sans text-sm text-red-deep sm:flex-row sm:items-center sm:justify-between">
                <span>{error}</span>
                {error.includes("outra sessão") ? <button type="button" onClick={() => void loadEditor()} className="font-semibold underline">Recarregar conteúdo</button> : null}
              </div>
            ) : null}
            {notice ? <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-white px-4 py-3 font-sans text-sm text-emerald-900">{notice}</p> : null}

            <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="rounded-2xl border border-line bg-white p-3 shadow-sm">
                <p className="px-3 pb-2 pt-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Painel</p>
                <button
                  type="button"
                  onClick={() => setPage("editor")}
                  aria-current={page === "editor" ? "page" : undefined}
                  className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left font-sans text-sm font-semibold transition ${page === "editor" ? "bg-navy-deep text-paper" : "text-ink hover:bg-surface"}`}
                >
                  <span>Publicações</span><span className="text-xs opacity-70">1</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setPage("archive"); setError(""); }}
                  aria-current={page === "archive" ? "page" : undefined}
                  className={`mt-1 flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left font-sans text-sm font-semibold transition ${page === "archive" ? "bg-navy-deep text-paper" : "text-ink hover:bg-surface"}`}
                >
                  <span>Arquivo</span><span className={`rounded-full px-2 py-0.5 text-xs ${page === "archive" ? "bg-white/15" : "bg-surface text-muted"}`}>{draft.archive.length}</span>
                </button>
                <div className="mt-4 rounded-xl bg-surface p-3 font-sans text-xs leading-relaxed text-muted">
                  Itens arquivados podem ser restaurados ou excluídos definitivamente.
                </div>
              </aside>

              {page === "editor" ? (
                <section className="min-w-0 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="font-display text-xl text-ink sm:text-2xl">Editar movimentos</h2>
                      <p className="mt-1 font-sans text-sm text-muted">Escolha a faixa e associe os vídeos às técnicas correspondentes.</p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Graduações">
                    {draft.levels.map((level) => (
                      <button
                        key={level.slug}
                        type="button"
                        onClick={() => selectLevel(level)}
                        aria-pressed={activeLevel?.slug === level.slug}
                        className={`shrink-0 rounded-xl border px-3 py-2 text-left transition ${activeLevel?.slug === level.slug ? "border-navy-deep bg-navy-deep text-paper" : "border-line bg-white text-ink hover:border-navy-light"}`}
                      >
                        <span className="block font-sans text-xs font-semibold">{level.name}</span>
                        <span className={`mt-1 block font-sans text-[10px] ${activeLevel?.slug === level.slug ? "text-white/65" : "text-muted"}`}>{level.sequences.length} movimentos</span>
                      </button>
                    ))}
                  </div>

                  {activeLevel ? (
                    <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(290px,0.65fr)]">
                      <section className="min-w-0 overflow-hidden rounded-2xl border border-line">
                        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-[#fafbfc] px-4 py-4">
                          <div>
                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{activeLevel.grade ?? "Graduação"}</p>
                            <h3 className="mt-0.5 font-display text-lg text-ink">Faixa {activeLevel.name}</h3>
                            {activeLevel.form ? <p className="mt-1 font-sans text-xs text-muted">{activeLevel.form}{activeLevel.formNote ? ` · ${activeLevel.formNote}` : ""}</p> : null}
                          </div>
                          <span className="rounded-full bg-surface px-3 py-1.5 font-sans text-xs font-semibold text-muted">
                            {activeLevel.sequences.length} {activeLevel.sequences.length === 1 ? "movimento" : "movimentos"}
                          </span>
                        </header>

                        <div className="divide-y divide-line">
                          {activeLevel.sequences.map((movement, index) => {
                            const videoCount = (activeLevel.tutorialVideos ?? []).filter((video) => video.movements.includes(movement)).length;
                            return (
                              <div
                                key={`${activeLevel.slug}-${index}`}
                                onClick={() => setActiveMovementIndex(index)}
                                className={`grid min-w-0 grid-cols-[30px_minmax(0,1fr)] gap-x-2 gap-y-2 px-3 py-3 transition sm:grid-cols-[30px_minmax(0,1fr)_auto] sm:items-center ${activeMovementIndex === index ? "bg-[#fff8f7]" : "bg-white hover:bg-[#fafbfc]"}`}
                              >
                                <span className="pt-2 font-sans text-[10px] font-bold tabular-nums text-red">{String(index + 1).padStart(2, "0")}</span>
                                <input
                                  aria-label={`Nome da técnica ${index + 1}`}
                                  value={movement}
                                  maxLength={180}
                                  onFocus={() => setActiveMovementIndex(index)}
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={(event) => renameMovement(index, event.target.value)}
                                  className="min-h-10 min-w-0 rounded-lg border border-transparent bg-transparent px-2 font-sans text-sm text-ink outline-none transition hover:border-line focus:border-navy-light focus:bg-white"
                                />
                                <div className="col-start-2 flex flex-wrap items-center justify-between gap-2 sm:col-start-auto sm:justify-end">
                                  <span className={`rounded-full px-2.5 py-1 font-sans text-[10px] font-semibold ${videoCount ? "bg-blue-50 text-blue-900" : "bg-surface text-muted"}`}>
                                    {videoCount ? `${videoCount} ${videoCount === 1 ? "vídeo" : "vídeos"}` : "Sem vídeo"}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button type="button" onClick={(event) => { event.stopPropagation(); moveMovement(index, -1); }} disabled={index === 0} aria-label={`Mover ${movement} para cima`} className="grid size-9 place-items-center rounded-lg border border-line text-muted hover:bg-surface disabled:opacity-35">↑</button>
                                    <button type="button" onClick={(event) => { event.stopPropagation(); moveMovement(index, 1); }} disabled={index === activeLevel.sequences.length - 1} aria-label={`Mover ${movement} para baixo`} className="grid size-9 place-items-center rounded-lg border border-line text-muted hover:bg-surface disabled:opacity-35">↓</button>
                                    <button type="button" onClick={(event) => { event.stopPropagation(); archiveMovement(index); }} aria-label={`Mover ${movement} para o Arquivo`} className="grid size-9 place-items-center rounded-lg border border-red/20 text-red-deep hover:bg-red/5">↘</button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {activeLevel.sequences.length === 0 ? <p className="px-4 py-8 text-center font-sans text-sm text-muted">Esta faixa ainda não tem movimentos ativos.</p> : null}
                        </div>

                        <form onSubmit={addMovement} className="flex flex-col gap-2 border-t border-line bg-[#fafbfc] p-3 sm:flex-row">
                          <input
                            value={newMovementName}
                            onChange={(event) => setNewMovementName(event.target.value)}
                            maxLength={180}
                            aria-label="Nome do novo movimento"
                            placeholder="Nome do novo movimento"
                            className={`${inputClass} min-h-10 flex-1 bg-white`}
                          />
                          <button type="submit" disabled={!newMovementName.trim()} className={buttonSecondary}>+ Adicionar movimento</button>
                        </form>
                      </section>

                      <section className="min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-red">Vídeos da técnica</p>
                            <h3 className="mt-1 font-display text-lg leading-snug text-ink">{selectedMovement || "Selecione um movimento"}</h3>
                            <p className="mt-1 font-sans text-xs text-muted">Vídeos relacionados a este movimento</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 font-sans text-[10px] font-semibold text-muted">{selectedVideos.length}</span>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                          {selectedVideos.map((video) => (
                            <article key={video.videoId} className="overflow-hidden rounded-xl border border-line">
                              <a href={videoHref(video.videoId)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir vídeo ${video.title} no YouTube`} className="group relative block aspect-video bg-navy-deep">
                                <Image
                                  src={videoThumbnail(video.videoId)}
                                  alt={`Miniatura: ${video.title}`}
                                  fill
                                  sizes="(max-width: 1279px) 90vw, 35vw"
                                  unoptimized
                                  className="object-cover transition group-hover:opacity-80"
                                />
                                <span className="absolute inset-0 grid place-items-center"><span className="grid size-11 place-items-center rounded-full bg-navy-deep/90 text-xl text-paper">▶</span></span>
                              </a>
                              <div className="p-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <a href={videoHref(video.videoId)} target="_blank" rel="noopener noreferrer" className="break-words font-sans text-sm font-semibold text-ink hover:text-red-deep">{video.title}</a>
                                    <p className="mt-1 break-all font-sans text-[10px] text-muted">YouTube · {video.videoId}</p>
                                  </div>
                                  <button type="button" onClick={() => unlinkVideo(video.videoId)} className="shrink-0 rounded-lg px-2 py-1 font-sans text-[11px] font-semibold text-red-deep hover:bg-red/5">Desvincular</button>
                                </div>
                                {video.movements.length > 1 ? <p className="mt-2 border-t border-line pt-2 font-sans text-[10px] leading-relaxed text-muted">Também associado a: {video.movements.filter((name) => name !== selectedMovement).join(", ")}</p> : null}
                              </div>
                            </article>
                          ))}
                          {selectedVideos.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-line bg-[#fafbfc] px-4 py-6 text-center font-sans text-xs leading-relaxed text-muted">Nenhum vídeo associado a este movimento ainda.</p>
                          ) : null}
                        </div>

                        {!showVideoForm ? (
                          <button type="button" onClick={() => { setShowVideoForm(true); setVideoError(""); }} disabled={!selectedMovement} className={`${buttonSecondary} mt-4 w-full border-dashed`}>
                            + Associar vídeo do YouTube
                          </button>
                        ) : (
                          <form onSubmit={addVideo} className="mt-4 rounded-xl border border-line bg-[#fafbfc] p-3">
                            <h4 className="font-sans text-sm font-semibold text-ink">Novo vídeo</h4>
                            <label htmlFor="video-title" className="mt-3 block font-sans text-xs font-semibold text-muted">Título</label>
                            <input id="video-title" value={newVideoTitle} onChange={(event) => setNewVideoTitle(event.target.value)} maxLength={120} required className={`${inputClass} mt-1 min-h-10 bg-white`} placeholder="Ex.: Ap Tchagui" />
                            <label htmlFor="video-url" className="mt-3 block font-sans text-xs font-semibold text-muted">Link do YouTube ou ID</label>
                            <input id="video-url" value={newVideoUrl} onChange={(event) => setNewVideoUrl(event.target.value)} required className={`${inputClass} mt-1 min-h-10 bg-white`} placeholder="https://youtu.be/..." />
                            <p className="mt-2 font-sans text-[10px] leading-relaxed text-muted">Será associado a “{selectedMovement}”. Se o vídeo já estiver nesta faixa, ele também será vinculado a este movimento.</p>
                            {videoError ? <p role="alert" className="mt-2 font-sans text-xs text-red-deep">{videoError}</p> : null}
                            <div className="mt-3 flex flex-wrap justify-end gap-2">
                              <button type="button" onClick={() => { setShowVideoForm(false); setVideoError(""); }} className={buttonSecondary}>Cancelar</button>
                              <button type="submit" className={buttonPrimary}>Associar vídeo</button>
                            </div>
                          </form>
                        )}
                      </section>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-sans text-xs leading-relaxed text-muted">A ordem e os vídeos aparecem no artigo assim que você salvar e publicar.</p>
                    <button type="button" onClick={() => void saveChanges()} disabled={!isDirty || isSaving} className={buttonPrimary}>
                      {isSaving ? "Salvando…" : "Salvar e publicar"}
                    </button>
                  </div>
                </section>
              ) : (
                <section className="min-w-0 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-red">Publicações / Kibon Donjak</p>
                      <h2 className="mt-1 font-display text-xl text-ink sm:text-2xl">Arquivo de técnicas</h2>
                      <p className="mt-1 max-w-[620px] font-sans text-sm leading-relaxed text-muted">As técnicas removidas ficam guardadas aqui. Você pode restaurá-las com seus vídeos ou excluí-las definitivamente.</p>
                    </div>
                    <button type="button" onClick={() => setPage("editor")} className={buttonSecondary}>Voltar ao editor</button>
                  </div>

                  {draft.archive.length === 0 ? (
                    <div className="py-12 text-center">
                      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-surface text-2xl text-muted">□</span>
                      <h3 className="mt-4 font-sans text-base font-semibold text-ink">O Arquivo está vazio</h3>
                      <p className="mt-1 font-sans text-sm text-muted">Quando uma técnica for removida do artigo, ela aparecerá aqui.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-line">
                      {draft.archive.map((item) => {
                        const levelName = draft.levels.find((level) => level.slug === item.levelSlug)?.name ?? item.levelSlug;
                        return (
                          <li key={item.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-red">Faixa {levelName}</p>
                              <h3 className="mt-1 break-words font-sans text-base font-semibold text-ink">{item.name}</h3>
                              <p className="mt-1 font-sans text-xs text-muted">Arquivada em {formatDate(item.archivedAt)} · {item.videos.length} {item.videos.length === 1 ? "vídeo preservado" : "vídeos preservados"}</p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-2">
                              <button type="button" onClick={() => restoreMovement(item)} className={buttonSecondary}>Restaurar</button>
                              <button type="button" onClick={() => setPendingDelete(item)} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red/30 px-4 py-2 font-sans text-sm font-semibold text-red-deep transition hover:bg-red/5">Excluir definitivamente</button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {isDirty ? (
                    <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-sans text-xs text-muted">As alterações feitas no Arquivo ainda não foram gravadas.</p>
                      <button type="button" onClick={() => void saveChanges()} disabled={isSaving} className={buttonPrimary}>{isSaving ? "Salvando…" : "Salvar alterações"}</button>
                    </div>
                  ) : null}
                </section>
              )}
            </div>
          </>
        )}
      </main>

      {pendingDelete ? (
        <dialog
          ref={deleteDialogRef}
          aria-labelledby="delete-technique-title"
          aria-describedby="delete-technique-description"
          onCancel={(event) => { event.preventDefault(); cancelPermanentDelete(); }}
          onClick={(event) => { if (event.target === event.currentTarget) cancelPermanentDelete(); }}
          className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-navy-deep/65"
        >
          <div className="p-6">
            <span className="grid size-10 place-items-center rounded-xl border border-red/20 bg-red/5 text-lg text-red-deep">!</span>
            <h2 id="delete-technique-title" className="mt-4 font-display text-xl text-ink">Excluir técnica definitivamente?</h2>
            <p id="delete-technique-description" className="mt-2 font-sans text-sm leading-relaxed text-muted">Esta ação remove a técnica do Arquivo e não poderá ser desfeita.</p>
            <strong className="mt-4 block break-words rounded-xl border border-line bg-surface px-3 py-3 font-sans text-sm text-ink">{pendingDelete.name}</strong>
          </div>
          <div className="flex justify-end gap-2 border-t border-line bg-[#fafbfc] px-6 py-4">
            <button type="button" onClick={cancelPermanentDelete} className={buttonSecondary}>Cancelar</button>
            <button type="button" onClick={() => permanentlyDelete(pendingDelete)} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-red-deep px-4 py-2 font-sans text-sm font-semibold text-paper hover:bg-red">Excluir definitivamente</button>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
