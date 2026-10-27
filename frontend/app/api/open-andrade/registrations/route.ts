import { getSql } from "@/lib/open-andrade/database";
import { isOpenAndradeRegistrationClosed } from "@/lib/open-andrade/event";
import { buildPixPayload } from "@/lib/open-andrade/pix";
import { getOpenAndradeFeeCents } from "@/lib/open-andrade/pricing";
import { consumeRateLimit } from "@/lib/open-andrade/rate-limit";

export const runtime = "nodejs";

function normalizeName(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > 0 && normalized.length <= 120 ? normalized : null;
}

export async function POST(request: Request) {
  if (isOpenAndradeRegistrationClosed()) {
    return Response.json(
      { error: "As inscrições para o Open Andrade foram encerradas em 11 de novembro, às 23h59." },
      { status: 410, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const rateLimit = await consumeRateLimit(request, "registration", 60, 60 * 60);
    if (!rateLimit.allowed) {
      return Response.json(
        { error: "Muitas inscrições enviadas deste acesso. Aguarde um pouco e tente novamente." },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }
  } catch {
    console.error("[open-andrade] Falha ao limitar tentativas de inscrição.");
    return Response.json(
      { error: "Não foi possível confirmar a inscrição agora. Tente novamente em instantes." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Confira os campos e tente enviar novamente." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Confira os campos e tente enviar novamente." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const responsibleName = normalizeName(input.responsibleName);
  const studentName = normalizeName(input.studentName);
  const kyorugui = input.kyorugui === true;
  const poomsae = input.poomsae === true;

  if (!responsibleName || !studentName) {
    return Response.json(
      { error: "Informe o nome completo do responsável e do aluno (até 120 caracteres cada)." },
      { status: 400 },
    );
  }

  if (typeof input.kyorugui !== "boolean" || typeof input.poomsae !== "boolean" || (!kyorugui && !poomsae)) {
    return Response.json(
      { error: "Selecione Kyorugui, Poomsae ou as duas modalidades." },
      { status: 400 },
    );
  }

  const amountCents = getOpenAndradeFeeCents(kyorugui, poomsae);

  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO public.open_andrade_registrations
        (responsible_name, student_name, kyorugui, poomsae, amount_cents)
      VALUES
        (${responsibleName}, ${studentName}, ${kyorugui}, ${poomsae}, ${amountCents})
      RETURNING id
    `;

    return Response.json(
      {
        registrationId: rows[0].id,
        payment: {
          amountCents,
          copyPaste: buildPixPayload(amountCents),
        },
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    console.error("[open-andrade] Falha ao salvar inscrição no Neon.");
    return Response.json(
      { error: "Não foi possível confirmar a inscrição agora. Tente novamente em instantes." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
