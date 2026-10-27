import { getSql } from "@/lib/open-andrade/database";
import { hasValidAdminSession, isSameOriginRequest } from "@/lib/open-andrade/admin-session";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: RouteContext<"/api/admin/open-andrade/registrations/[id]">) {
  if (!hasValidAdminSession(request)) {
    return Response.json({ error: "Acesse o painel para continuar." }, { status: 401 });
  }

  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Solicitação inválida." }, { status: 403 });
  }

  const { id } = await context.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return Response.json({ error: "Inscrição não encontrada." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Não foi possível atualizar o pagamento." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("paymentStatus" in body) || body.paymentStatus !== "paid") {
    return Response.json({ error: "Status de pagamento inválido." }, { status: 400 });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      UPDATE public.open_andrade_registrations
      SET payment_status = 'paid', paid_at = COALESCE(paid_at, now())
      WHERE id = ${id}
      RETURNING id, payment_status AS "paymentStatus", paid_at AS "paidAt"
    `;

    if (!rows[0]) {
      return Response.json({ error: "Inscrição não encontrada." }, { status: 404 });
    }

    return Response.json(rows[0], { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("[open-andrade] Falha ao atualizar pagamento no Neon.");
    return Response.json(
      { error: "Não foi possível atualizar o pagamento. Tente novamente." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
