import { revalidatePath } from "next/cache";
import {
  BlogEditorConflictError,
  BlogEditorValidationError,
  BLOG_DONJAK_SLUG,
  readBlogDonjakEditor,
  saveBlogDonjakEditor,
} from "@/lib/blog-admin";
import { hasValidAdminSession, isSameOriginRequest } from "@/lib/open-andrade/admin-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasValidAdminSession(request)) {
    return Response.json(
      { error: "Acesse a área administrativa para continuar." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    return Response.json(await readBlogDonjakEditor(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    console.error("[blog-admin] Falha ao carregar o editor Kibon Donjak.");
    return Response.json(
      { error: "Não foi possível carregar o editor. Confira a configuração do banco e tente novamente." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function PUT(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Solicitação inválida." }, { status: 403 });
  }
  if (!hasValidAdminSession(request)) {
    return Response.json(
      { error: "Sua sessão expirou. Acesse a área administrativa novamente." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Os dados enviados estão inválidos." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("state" in body) ||
    !("revision" in body) ||
    typeof body.revision !== "number" ||
    !Number.isInteger(body.revision) ||
    body.revision < 1
  ) {
    return Response.json({ error: "Informe o conteúdo e a versão carregada para salvar." }, { status: 400 });
  }

  try {
    const record = await saveBlogDonjakEditor(body.state, body.revision);
    revalidatePath(`/blog/${BLOG_DONJAK_SLUG}`);
    return Response.json(record, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof BlogEditorConflictError) {
      return Response.json({ error: error.message }, { status: 409, headers: { "Cache-Control": "no-store" } });
    }
    if (error instanceof BlogEditorValidationError) {
      return Response.json({ error: error.message }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }
    console.error("[blog-admin] Falha ao salvar o editor Kibon Donjak.");
    return Response.json(
      { error: "Não foi possível salvar as alterações. Tente novamente." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
