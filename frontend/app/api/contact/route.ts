import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  nome?: unknown;
  telefone?: unknown;
  mensagem?: unknown;
  empresa?: unknown; // honeypot
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  // honeypot: bots fill every field, real visitors never see this one
  if (isNonEmptyString(payload.empresa)) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isNonEmptyString(payload.nome) ||
    !isNonEmptyString(payload.telefone) ||
    !isNonEmptyString(payload.mensagem)
  ) {
    return NextResponse.json(
      { ok: false, error: "Preencha nome, telefone e mensagem." },
      { status: 400 },
    );
  }

  const { nome, telefone, mensagem } = payload;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error(
      "[contact] SMTP não configurado — defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e CONTACT_TO_EMAIL em .env.local",
    );
    return NextResponse.json(
      { ok: false, error: "Formulário indisponível no momento. Fale com a gente pelo WhatsApp." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Site União Andrade" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: SMTP_USER,
      subject: `Novo contato pelo site — ${nome}`,
      text: `Nome: ${nome}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`,
    });
  } catch (error) {
    console.error("[contact] falha ao enviar e-mail", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar sua mensagem agora. Tente pelo WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
