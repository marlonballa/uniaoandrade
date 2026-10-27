import {
  OPEN_ANDRADE_ONE_MODALITY_FEE_CENTS,
  OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS,
} from "@/lib/open-andrade/pricing";

const PIX_KEY = "+5517996195606";
// Keep the BR Code name ASCII-only for bank-reader compatibility. The payer app
// resolves and displays the account-holder name from the Pix key in the DICT.
const MERCHANT_NAME = "Evandro Jose de Andrade";
const MERCHANT_CITY = "CATANDUVA";

function field(id: string, value: string) {
  const byteLength = new TextEncoder().encode(value).length;
  return `${id}${String(byteLength).padStart(2, "0")}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;

  for (const byte of new TextEncoder().encode(payload)) {
    crc ^= byte << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function buildPixPayload(amountCents: number) {
  if (![OPEN_ANDRADE_ONE_MODALITY_FEE_CENTS, OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS].includes(amountCents)) {
    throw new Error("Valor de inscrição inválido para o Pix do Open Andrade.");
  }

  const merchantAccount = field("00", "br.gov.bcb.pix") + field("01", PIX_KEY);
  const additionalData = field("05", "***");
  const amount = (amountCents / 100).toFixed(2);

  const payload = [
    field("00", "01"),
    field("01", "11"),
    field("26", merchantAccount),
    field("52", "0000"),
    field("53", "986"),
    field("54", amount),
    field("58", "BR"),
    field("59", MERCHANT_NAME),
    field("60", MERCHANT_CITY),
    field("62", additionalData),
    "6304",
  ].join("");

  return `${payload}${crc16(payload)}`;
}
