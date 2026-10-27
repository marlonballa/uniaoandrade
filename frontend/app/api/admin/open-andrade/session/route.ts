import {
  adminSessionCookie,
  adminSessionTtlSeconds,
  createAdminSessionToken,
  expiredAdminSessionCookie,
  hasAdminConfiguration,
  hasValidAdminSession,
  isSameOriginRequest,
  verifyAdminPassword,
} from "@/lib/open-andrade/admin-session";
import { consumeRateLimit, type RateLimitResult } from "@/lib/open-andrade/rate-limit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasAdminConfiguration()) {
    return Response.json(
      { error: "O painel administrativo ainda não foi configurado." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(
    { authenticated: hasValidAdminSession(request) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Solicitação inválida." }, { status: 403 });
  }

  if (!hasAdminConfiguration()) {
    return Response.json(
      { error: "O painel administrativo ainda não foi configurado." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let rateLimit: RateLimitResult;
  try {
    rateLimit = await consumeRateLimit(request, "admin-login", 10, 15 * 60);
  } catch {
    console.error("[open-andrade] Falha ao limitar tentativas de acesso administrativo.");
    return Response.json(
      { error: "O painel administrativo não está disponível agora." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Informe a senha do painel." }, { status: 400 });
  }

  const password =
    body && typeof body === "object" && "password" in body && typeof body.password === "string"
      ? body.password
      : "";

  if (!password || password.length > 256 || verifyAdminPassword(password) !== true) {
    return Response.json({ error: "Senha incorreta. Confira e tente novamente." }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return Response.json(
      { error: "O painel administrativo ainda não foi configurado." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(
    { authenticated: true, expiresIn: adminSessionTtlSeconds() },
    {
      headers: {
        "Cache-Control": "no-store",
        "Set-Cookie": adminSessionCookie(token),
      },
    },
  );
}

export async function DELETE(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Solicitação inválida." }, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
      "Set-Cookie": expiredAdminSessionCookie(),
    },
  });
}
