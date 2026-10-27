"use client";

import { useRef, useState, type FormEvent } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  getOpenAndradeFeeCents,
  OPEN_ANDRADE_ONE_MODALITY_FEE_CENTS,
  OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS,
} from "@/lib/open-andrade/pricing";

type Payment = {
  amountCents: number;
  copyPaste: string;
};

type RegistrationResponse = {
  registrationId: string;
  payment: Payment;
};

type RegistrationFormProps = {
  confirmationPreview?: boolean;
};

const PIX_KEY = "+5517996195606";
const PIX_KEY_DISPLAY = "17 99619-5606";
const WHATSAPP_NUMBER = PIX_KEY.slice(1);
const SUBMISSION_KEY_STORAGE = "open-andrade-submission-key";

const inputClassName =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3.5 font-sans text-base text-ink shadow-sm transition placeholder:text-muted/80 hover:border-navy-light/50 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20";

function formatCurrency(amountCents: number) {
  return (amountCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function createSubmissionKey() {
  if (typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();

  const bytes = window.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function RegistrationForm({ confirmationPreview = false }: RegistrationFormProps) {
  const submissionKeyRef = useRef<string | null>(null);
  const [kyorugui, setKyorugui] = useState(false);
  const [poomsae, setPoomsae] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<Payment | null>(
    confirmationPreview
      ? {
          amountCents: OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS,
          copyPaste: "PREVIA LOCAL DO OPEN ANDRADE - QR ILUSTRATIVO SEM PAGAMENTO",
        }
      : null,
  );
  const [registeredStudentName, setRegisteredStudentName] = useState(
    confirmationPreview ? "Aluno de demonstração" : "",
  );
  const [copied, setCopied] = useState(false);
  const hasSelectedModality = kyorugui || poomsae;
  const selectedFeeCents = getOpenAndradeFeeCents(kyorugui, poomsae);

  function getSubmissionKey() {
    if (submissionKeyRef.current) return submissionKeyRef.current;

    try {
      const storedKey = window.sessionStorage.getItem(SUBMISSION_KEY_STORAGE);
      if (storedKey && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(storedKey)) {
        submissionKeyRef.current = storedKey;
        return storedKey;
      }
    } catch {
      // sessionStorage may be disabled; the in-memory key still protects retries.
    }

    const key = createSubmissionKey();
    submissionKeyRef.current = key;

    try {
      window.sessionStorage.setItem(SUBMISSION_KEY_STORAGE, key);
    } catch {
      // Keep the key in memory when sessionStorage is unavailable.
    }

    return key;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!kyorugui && !poomsae) {
      setError("Selecione Kyorugui, Poomsae ou as duas modalidades.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/open-andrade/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responsibleName: formData.get("responsibleName"),
          studentName: formData.get("studentName"),
          kyorugui,
          poomsae,
          idempotencyKey: getSubmissionKey(),
        }),
      });

      const data = (await response.json()) as RegistrationResponse | { error?: string };

      if (!response.ok || !("payment" in data)) {
        setError(
          "error" in data && data.error
            ? data.error
            : "Não foi possível enviar a inscrição. Tente novamente em instantes.",
        );
        return;
      }

      try {
        window.sessionStorage.removeItem(SUBMISSION_KEY_STORAGE);
      } catch {
        // The confirmation view prevents another submission in this form instance.
      }

      setRegisteredStudentName(String(formData.get("studentName") ?? "").trim());
      setPayment(data.payment);
    } catch {
      setError("Não foi possível enviar a inscrição. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyPix() {
    if (!payment) return;

    try {
      await navigator.clipboard.writeText(payment.copyPaste);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Não foi possível copiar o Pix. Selecione o código e copie manualmente.");
    }
  }

  if (payment) {
    return (
      <section
        aria-labelledby="registration-success-title"
        className="rounded-2xl border border-line bg-paper p-6 shadow-[0_12px_32px_oklch(0.2_0.03_264/0.08)] sm:p-8"
      >
        <div className="mb-6 border-b border-line pb-5">
          <p className="font-sans text-sm font-semibold text-navy-light">Inscrição registrada</p>
          <h2
            id="registration-success-title"
            className="mt-2 max-w-[42ch] font-sans text-base font-semibold leading-relaxed text-ink sm:text-lg"
          >
            Para concluir, faça o Pix e envie o comprovante ao Sabonim Evandro.
          </h2>
        </div>

        {confirmationPreview ? (
          <p
            role="note"
            className="mb-5 rounded-xl border border-red/30 bg-red/5 p-3 font-sans text-sm leading-relaxed text-ink"
          >
            Prévia local: esta inscrição não foi salva. O QR Code e o código são ilustrativos e não aceitam pagamento.
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-4">
          <span className="font-sans text-sm text-muted">Taxa por aluno</span>
          <span className="font-display text-2xl text-ink">{formatCurrency(payment.amountCents)}</span>
        </div>

        <div className="mt-6 flex justify-center rounded-xl bg-white p-5">
          <QRCodeSVG
            value={payment.copyPaste}
            size={210}
            level="M"
            marginSize={4}
            title="QR Code Pix da inscrição"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <label htmlFor="pix-copy-paste" className="font-sans text-sm font-semibold text-ink">
            Pix copia e cola
          </label>
          <textarea
            id="pix-copy-paste"
            readOnly
            value={payment.copyPaste}
            rows={4}
            className="w-full resize-y rounded-xl border border-line bg-surface p-3 font-sans text-xs leading-relaxed text-ink focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
          />
          <button
            type="button"
            onClick={copyPix}
            className="min-h-12 w-full rounded-xl bg-navy-deep px-5 py-3.5 font-sans text-sm font-semibold text-paper shadow-[0_8px_24px_oklch(0.05_0.02_264/0.22)] transition-colors hover:bg-navy-light active:translate-y-px sm:w-fit"
          >
            {copied ? "Pix copiado" : "Copiar Pix"}
          </button>
          <p className="font-sans text-sm leading-relaxed text-muted">
            Recebedor: Evandro José de Andrade · Chave Pix telefone: {PIX_KEY_DISPLAY}.
          </p>
          <a
            href={
              confirmationPreview
                ? undefined
                : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, Sabonim Evandro! Segue o comprovante da inscrição de ${registeredStudentName} no Open Andrade.`)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={confirmationPreview || undefined}
            onClick={confirmationPreview ? (event) => event.preventDefault() : undefined}
            className="inline-flex min-h-12 w-full items-center justify-center bg-[#198754] px-5 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#157347] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54] active:translate-y-px sm:w-fit"
          >
            Enviar comprovante ao Sabonim Evandro
          </a>
          <p className="font-sans text-xs leading-relaxed text-muted">
            WhatsApp: {PIX_KEY_DISPLAY}
          </p>
        </div>

        {error ? (
          <p role="alert" className="mt-4 font-sans text-sm text-red-deep">
            {error}
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-line bg-paper p-6 shadow-[0_12px_32px_oklch(0.2_0.03_264/0.08)] sm:p-8"
    >
      <div>
        <label htmlFor="responsible-name" className="font-sans text-sm font-semibold text-ink">
          Nome do responsável
        </label>
        <input
          id="responsible-name"
          name="responsibleName"
          type="text"
          autoComplete="name"
          maxLength={120}
          required
          placeholder="Nome completo"
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="student-name" className="font-sans text-sm font-semibold text-ink">
          Nome do aluno
        </label>
        <input
          id="student-name"
          name="studentName"
          type="text"
          autoComplete="off"
          maxLength={120}
          required
          placeholder="Nome completo do aluno"
          className={inputClassName}
        />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-sans text-sm font-semibold text-ink">Modalidade</legend>
        <p id="modalities-help" className="-mt-1 font-sans text-sm text-muted">
          Escolha uma ou as duas.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label
            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-sans text-sm font-medium transition-colors ${
              kyorugui
                ? "border-navy-deep bg-surface text-ink"
                : "border-line bg-paper text-ink hover:border-navy-light/60"
            }`}
          >
            <input
              type="checkbox"
              checked={kyorugui}
              onChange={(event) => setKyorugui(event.target.checked)}
              aria-describedby="modalities-help"
              className="h-4 w-4 accent-navy-deep"
            />
            <span>Kyorugui</span>
          </label>
          <label
            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-sans text-sm font-medium transition-colors ${
              poomsae
                ? "border-navy-deep bg-surface text-ink"
                : "border-line bg-paper text-ink hover:border-navy-light/60"
            }`}
          >
            <input
              type="checkbox"
              checked={poomsae}
              onChange={(event) => setPoomsae(event.target.checked)}
              aria-describedby="modalities-help"
              className="h-4 w-4 accent-navy-deep"
            />
            <span>Poomsae</span>
          </label>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-line pt-5">
        <p aria-live="polite" className="font-sans text-sm leading-relaxed text-muted">
          {hasSelectedModality ? (
            <>Taxa desta inscrição: <strong className="font-semibold text-ink">{formatCurrency(selectedFeeCents)} por aluno.</strong></>
          ) : (
            <>
              Uma modalidade: <strong className="font-semibold text-ink">{formatCurrency(OPEN_ANDRADE_ONE_MODALITY_FEE_CENTS)}</strong>
              {" · "}
              Duas modalidades: <strong className="font-semibold text-ink">{formatCurrency(OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS)}</strong>
            </>
          )}
        </p>
        <p className="-mt-2 font-sans text-sm leading-relaxed text-muted">
          Após o pagamento, envie o comprovante pelo WhatsApp ao Sabonim Evandro.
        </p>
        {error ? (
          <p role="alert" className="font-sans text-sm leading-relaxed text-red-deep">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-14 w-full rounded-xl bg-navy-deep px-6 py-4 font-sans text-sm font-semibold text-paper shadow-[0_8px_24px_oklch(0.05_0.02_264/0.22)] transition-colors hover:bg-navy-light active:translate-y-px disabled:cursor-wait disabled:bg-navy-light/70 sm:text-base"
        >
          {isSubmitting ? "Enviando inscrição…" : "Confirmar inscrição"}
        </button>
      </div>
    </form>
  );
}
