export type SiteRoute = {
  href: string;
  label: string;
  title: string;
  description: string;
};

export const ROUTES: SiteRoute[] = [
  {
    href: "/",
    label: "Início",
    title: "Taekwondo e Artes Marciais em Catanduva",
    description:
      "Escola de Taekwondo e artes marciais em Catanduva desde 2001. Aulas para crianças e adultos, defesa pessoal real e tradição Kukkiwon. Aula experimental gratuita.",
  },
  {
    href: "/taekwondo-catanduva",
    label: "Taekwondo",
    title: "Taekwondo em Catanduva",
    description:
      "Aulas de Taekwondo Kukkiwon Old School em Catanduva, com Mestre Evandro Andrade (4º Dan). Método, turmas, horários e aula experimental gratuita.",
  },
  {
    href: "/taekwondo-infantil-catanduva",
    label: "Infantil",
    title: "Taekwondo Infantil em Catanduva",
    description:
      "Taekwondo para crianças em Catanduva: disciplina, coordenação e segurança, no ritmo de cada criança. Veja idade ideal e agende uma aula experimental gratuita.",
  },
  {
    href: "/taekwondo-adulto-catanduva",
    label: "Adulto",
    title: "Taekwondo para Adultos em Catanduva",
    description:
      "Taekwondo para adultos em Catanduva, sem idade limite e no seu ritmo. Nunca é tarde para começar. Turmas de iniciantes a graduados. Aula experimental gratuita.",
  },
  {
    href: "/sobre",
    label: "Sobre",
    title: "Sobre a União Andrade",
    description:
      "Conheça a história da União Andrade, a trajetória do Mestre Evandro Andrade (4º Dan) e a equipe de Kyosanim que ensina Taekwondo em Catanduva desde 2001.",
  },
  {
    href: "/contato",
    label: "Contato",
    title: "Contato e Endereço",
    description:
      "Endereço, telefone e horários da União Andrade em Catanduva. Fale pelo WhatsApp ou Instagram e agende sua aula experimental gratuita de Taekwondo.",
  },
];

export function getRoute(href: string): SiteRoute {
  const route = ROUTES.find((r) => r.href === href);
  if (!route) {
    throw new Error(`Rota não encontrada em lib/routes.ts: ${href}`);
  }
  return route;
}

export const NAV_LINKS = ROUTES.filter((r) => r.href !== "/");
