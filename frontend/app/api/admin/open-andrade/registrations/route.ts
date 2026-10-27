import { getSql } from "@/lib/open-andrade/database";
import { hasValidAdminSession } from "@/lib/open-andrade/admin-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasValidAdminSession(request)) {
    return Response.json({ error: "Acesse o painel para continuar." }, { status: 401 });
  }

  try {
    const sql = getSql();
    const [registrations, counts] = await Promise.all([
      sql`
        SELECT
          id,
          responsible_name AS "responsibleName",
          student_name AS "studentName",
          kyorugui,
          poomsae,
          amount_cents AS "amountCents",
          payment_status AS "paymentStatus",
          created_at AS "createdAt",
          paid_at AS "paidAt"
        FROM public.open_andrade_registrations
        ORDER BY created_at DESC
      `,
      sql`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE payment_status = 'pending')::int AS pending,
          COUNT(*) FILTER (WHERE payment_status = 'paid')::int AS paid
        FROM public.open_andrade_registrations
      `,
    ]);

    return Response.json(
      {
        registrations,
        counts: {
          total: Number(counts[0].total),
          pending: Number(counts[0].pending),
          paid: Number(counts[0].paid),
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    console.error("[open-andrade] Falha ao consultar inscrições no Neon.");
    return Response.json(
      { error: "Não foi possível carregar as inscrições. Tente novamente." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
