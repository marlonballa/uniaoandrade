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
      { error: "As inscrições para o Open Andrade foram encerradas em 8 de novembro, às 23h59." },
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
  const idempotencyKey =
    typeof input.idempotencyKey === "string"
      && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.idempotencyKey)
      ? input.idempotencyKey
      : null;
  const kyorugui = input.kyorugui === true;
  const poomsae = input.poomsae === true;

  if (!responsibleName || !studentName || !idempotencyKey) {
    return Response.json(
      { error: "Confira os dados da inscrição e tente enviar novamente." },
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
    const insertedRows = await sql`
      INSERT INTO public.open_andrade_registrations
        (idempotency_key, responsible_name, student_name, kyorugui, poomsae, amount_cents)
      VALUES
        (${idempotencyKey}, ${responsibleName}, ${studentName}, ${kyorugui}, ${poomsae}, ${amountCents})
      ON CONFLICT (idempotency_key) DO NOTHING
      RETURNING id, responsible_name, student_name, kyorugui, poomsae, amount_cents
    `;
    const existingRows = insertedRows.length > 0
      ? insertedRows
      : await sql`
          SELECT id, responsible_name, student_name, kyorugui, poomsae, amount_cents
          FROM public.open_andrade_registrations
          WHERE idempotency_key = ${idempotencyKey}
          LIMIT 1
        `;
    const registration = existingRows[0];

    if (!registration) {
      throw new Error("Não foi possível recuperar a inscrição após o envio.");
    }

    if (
      registration.responsible_name !== responsibleName
      || registration.student_name !== studentName
      || registration.kyorugui !== kyorugui
      || registration.poomsae !== poomsae
    ) {
      return Response.json(
        { error: "Esta tentativa já está associada a outros dados. Para evitar duplicidade, não envie novamente; fale com o Sabonim Evandro para conferir a inscrição registrada." },
        { status: 409, headers: { "Cache-Control": "no-store" } },
      );
    }

    return Response.json(
      {
        registrationId: registration.id,
        payment: {
          amountCents: registration.amount_cents,
          copyPaste: buildPixPayload(Number(registration.amount_cents)),
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
