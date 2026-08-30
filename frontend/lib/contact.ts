export const WHATSAPP_NUMBER = "5517996195606";
export const INSTAGRAM_HANDLE = "uniaoandrade";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;
export const EXPERIMENTAL_CLASS_URL = "https://sistemakihap.com.br/experimental?kwan=tagari75se";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e quero agendar uma aula experimental de Taekwondo.";
