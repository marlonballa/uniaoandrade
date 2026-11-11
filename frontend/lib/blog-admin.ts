import "server-only";

import { getPostBySlug, type BeltLevel, type BeltTutorialVideo } from "@/lib/blog";
import { getSql } from "@/lib/open-andrade/database";

export const BLOG_DONJAK_SLUG = "kibon-donjak-faixas-coloridas";

export type ArchivedDonjakMovement = {
  id: string;
  levelSlug: string;
  originalIndex: number;
  name: string;
  videos: Array<Pick<BeltTutorialVideo, "title" | "videoId">>;
  archivedAt: string;
};

export type BlogDonjakEditorState = {
  levels: BeltLevel[];
  archive: ArchivedDonjakMovement[];
};

export type BlogDonjakEditorRecord = {
  state: BlogDonjakEditorState;
  revision: number;
  updatedAt: string;
};

export class BlogEditorConflictError extends Error {
  constructor() {
    super("O conteúdo foi alterado em outra sessão. Recarregue o editor antes de salvar.");
    this.name = "BlogEditorConflictError";
  }
}

export class BlogEditorValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogEditorValidationError";
  }
}

let schemaReady: Promise<void> | undefined;

function ensureEditorTable() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS public.blog_donjak_editor_state (
          slug text PRIMARY KEY CHECK (slug = 'kibon-donjak-faixas-coloridas'),
          state jsonb NOT NULL,
          revision integer NOT NULL DEFAULT 1 CHECK (revision > 0),
          updated_at timestamptz NOT NULL DEFAULT now(),
          CHECK (jsonb_typeof(state) = 'object')
        )
      `;
    })().catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }

  return schemaReady;
}

function getBaseLevels() {
  const post = getPostBySlug(BLOG_DONJAK_SLUG);
  if (!post || post.donjakLevels.length === 0) {
    throw new Error("A publicação Kibon Donjak não foi encontrada.");
  }
  return post.donjakLevels;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getArray(value: unknown, label: string, maximum: number) {
  if (!Array.isArray(value) || value.length > maximum) {
    throw new BlogEditorValidationError(`A lista ${label} é inválida ou excede o limite permitido.`);
  }
  return value as unknown[];
}

function getText(value: unknown, label: string, maximum = 180) {
  if (typeof value !== "string") throw new BlogEditorValidationError(`Informe ${label}.`);
  const text = value.trim();
  if (!text || text.length > maximum) throw new BlogEditorValidationError(`${label} deve ter até ${maximum} caracteres.`);
  return text;
}

function getVideoId(value: unknown) {
  const videoId = getText(value, "um ID de vídeo válido", 11);
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new BlogEditorValidationError("Um dos vídeos associados tem um ID do YouTube inválido.");
  }
  return videoId;
}

function normalizeState(value: unknown): BlogDonjakEditorState {
  if (!isRecord(value)) throw new BlogEditorValidationError("Os dados do editor estão em um formato inválido.");

  const baseLevels = getBaseLevels();
  const submittedLevels = getArray(value.levels, "de graduações", baseLevels.length);
  if (submittedLevels.length !== baseLevels.length) {
    throw new BlogEditorValidationError("As graduações desta publicação não podem ser removidas.");
  }

  const submittedBySlug = new Map<string, Record<string, unknown>>();
  for (const item of submittedLevels) {
    if (!isRecord(item) || typeof item.slug !== "string" || submittedBySlug.has(item.slug)) {
      throw new BlogEditorValidationError("Há uma graduação repetida ou inválida.");
    }
    submittedBySlug.set(item.slug, item);
  }

  const levels = baseLevels.map((baseLevel) => {
    const submitted = submittedBySlug.get(baseLevel.slug);
    if (!submitted) throw new BlogEditorValidationError(`A graduação ${baseLevel.name} está faltando.`);

    const sequences = getArray(submitted.sequences, `de movimentos da faixa ${baseLevel.name}`, 100)
      .map((sequence, index) => getText(sequence, `o movimento ${index + 1}`));
    const normalizedNames = sequences.map((sequence) => sequence.toLocaleLowerCase("pt-BR"));
    if (new Set(normalizedNames).size !== normalizedNames.length) {
      throw new BlogEditorValidationError(`Há movimentos repetidos na faixa ${baseLevel.name}.`);
    }

    const tutorialVideos = getArray(
      submitted.tutorialVideos ?? [],
      `de vídeos da faixa ${baseLevel.name}`,
      100,
    ).map((rawVideo) => {
      if (!isRecord(rawVideo)) throw new BlogEditorValidationError("Um vídeo associado está em formato inválido.");
      const title = getText(rawVideo.title, "o título do vídeo", 120);
      const videoId = getVideoId(rawVideo.videoId);
      const movements = getArray(rawVideo.movements, `de movimentos do vídeo ${title}`, 100)
        .map((movement) => getText(movement, "um movimento associado"));
      if (movements.length === 0 || movements.some((movement) => !sequences.includes(movement))) {
        throw new BlogEditorValidationError(`O vídeo “${title}” precisa estar associado a um movimento ativo da faixa ${baseLevel.name}.`);
      }
      return { title, videoId, movements: [...new Set(movements)] };
    });
    if (new Set(tutorialVideos.map((video) => video.videoId)).size !== tutorialVideos.length) {
      throw new BlogEditorValidationError(`Há um vídeo repetido na faixa ${baseLevel.name}.`);
    }

    return { ...baseLevel, sequences, tutorialVideos };
  });

  const levelSlugs = new Set(baseLevels.map((level) => level.slug));
  const rawArchive = getArray(value.archive, "do arquivo", 1000);
  const archivedIds = new Set<string>();
  const archive = rawArchive.map((rawItem) => {
    if (!isRecord(rawItem)) throw new BlogEditorValidationError("Uma técnica arquivada está em formato inválido.");

    const id = getText(rawItem.id, "o identificador do item arquivado", 36);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      throw new BlogEditorValidationError("Um item do Arquivo tem um identificador inválido.");
    }
    if (archivedIds.has(id)) throw new BlogEditorValidationError("Há itens repetidos no Arquivo.");
    archivedIds.add(id);

    const levelSlug = getText(rawItem.levelSlug, "a graduação do item arquivado", 80);
    if (!levelSlugs.has(levelSlug)) throw new BlogEditorValidationError("Uma técnica arquivada pertence a uma graduação desconhecida.");
    if (!Number.isInteger(rawItem.originalIndex) || Number(rawItem.originalIndex) < 0 || Number(rawItem.originalIndex) > 100) {
      throw new BlogEditorValidationError("A posição original de uma técnica arquivada é inválida.");
    }
    if (typeof rawItem.archivedAt !== "string" || !Number.isFinite(Date.parse(rawItem.archivedAt))) {
      throw new BlogEditorValidationError("A data de arquivamento de uma técnica é inválida.");
    }

    const videos = getArray(rawItem.videos ?? [], "de vídeos arquivados", 100).map((rawVideo) => {
      if (!isRecord(rawVideo)) throw new BlogEditorValidationError("Um vídeo arquivado está em formato inválido.");
      return { title: getText(rawVideo.title, "o título do vídeo", 120), videoId: getVideoId(rawVideo.videoId) };
    });

    return {
      id,
      levelSlug,
      originalIndex: Number(rawItem.originalIndex),
      name: getText(rawItem.name, "o nome da técnica arquivada"),
      videos,
      archivedAt: new Date(rawItem.archivedAt).toISOString(),
    };
  });

  return { levels, archive };
}

function parseStoredState(value: unknown) {
  const parsed = typeof value === "string" ? JSON.parse(value) as unknown : value;
  return normalizeState(parsed);
}

function defaultState(): BlogDonjakEditorState {
  return { levels: getBaseLevels(), archive: [] };
}

export async function readBlogDonjakEditor(): Promise<BlogDonjakEditorRecord> {
  await ensureEditorTable();
  const sql = getSql();
  const initialState = defaultState();
  await sql`
    INSERT INTO public.blog_donjak_editor_state (slug, state)
    VALUES (${BLOG_DONJAK_SLUG}, ${JSON.stringify(initialState)}::jsonb)
    ON CONFLICT (slug) DO NOTHING
  `;

  const rows = await sql`
    SELECT state, revision, updated_at AS "updatedAt"
    FROM public.blog_donjak_editor_state
    WHERE slug = ${BLOG_DONJAK_SLUG}
    LIMIT 1
  `;
  const row = rows[0];
  if (!row) throw new Error("O conteúdo do editor não foi encontrado.");

  return {
    state: parseStoredState(row.state),
    revision: Number(row.revision),
    updatedAt: new Date(row.updatedAt as string | Date).toISOString(),
  };
}

export async function saveBlogDonjakEditor(value: unknown, expectedRevision: number) {
  const state = normalizeState(value);
  await ensureEditorTable();
  const sql = getSql();
  const rows = await sql`
    UPDATE public.blog_donjak_editor_state
    SET state = ${JSON.stringify(state)}::jsonb,
        revision = revision + 1,
        updated_at = now()
    WHERE slug = ${BLOG_DONJAK_SLUG} AND revision = ${expectedRevision}
    RETURNING revision, updated_at AS "updatedAt"
  `;
  const row = rows[0];
  if (!row) throw new BlogEditorConflictError();

  return {
    state,
    revision: Number(row.revision),
    updatedAt: new Date(row.updatedAt as string | Date).toISOString(),
  } satisfies BlogDonjakEditorRecord;
}

export async function getPublishedDonjakLevels() {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT state
      FROM public.blog_donjak_editor_state
      WHERE slug = ${BLOG_DONJAK_SLUG}
      LIMIT 1
    `;
    if (!rows[0]) return null;
    return parseStoredState(rows[0].state).levels;
  } catch {
    return null;
  }
}
