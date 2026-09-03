export type Historia = {
  nome: string;
  foto: string | null;
  fotoPosicao: string;
  fato: string;
  quote: string;
};

export const HISTORIAS: Historia[] = [
  {
    nome: "Jorge",
    foto: "/depoimentos/jorge-retomou-taekwondo.jpg",
    fotoPosicao: "50% 15%",
    fato: "Retomou o Taekwondo depois de 20 anos afastado.",
    quote:
      "Voltei depois de 20 anos longe do tatame. Achei que não ia lembrar de nada. O corpo lembra, e a vontade também. Foi como nunca ter saído.",
  },
  {
    nome: "Letícia",
    foto: "/depoimentos/leticia-faixa-amarela.jpg",
    fotoPosicao: "50% 15%",
    fato: "Conquistou a faixa amarela em julho de 2026.",
    quote:
      "Cada faixa é a prova de que consegui evoluir no meu ritmo. A faixa amarela é a certeza de que estou no caminho certo.",
  },
  {
    nome: "Sr. Manuel",
    foto: "/depoimentos/sr-manuel.jpg",
    fotoPosicao: "50% 15%",
    fato: "Começou o Taekwondo aos 70 anos.",
    quote:
      "Comecei aos 70. Muita gente achou estranho, mas eu queria provar pra mim mesmo que não existe idade certa pra recomeçar.",
  },
  {
    nome: "Cláudio e Enzo",
    foto: "/depoimentos/claudio-enzo.jpg",
    fotoPosicao: "50% 35%",
    fato: "Pai e filho treinam juntos na União Andrade.",
    quote:
      "Treinar com o Enzo virou o nosso momento da semana. Ele aprende disciplina, eu aprendo a ter paciência. Os dois saímos melhores.",
  },
  {
    nome: "Geniel e Mylena",
    foto: "/depoimentos/geniel-mylena.jpg",
    fotoPosicao: "50% 15%",
    fato: "Mylena entrou para se soltar e perder a timidez, hoje está quase na faixa-preta.",
    quote:
      "Colocamos a Mylena no Taekwondo pra ela se soltar, conversar mais, perder a timidez. Hoje ela está quase na faixa-preta e é uma pessoa completamente diferente.",
  },
  {
    nome: "Aniely e Wendel",
    foto: null,
    fotoPosicao: "",
    fato: "Pai e filha treinaram juntos no treino especial de Dia dos Pais.",
    quote:
      "Foi lindo ver a interação, o carinho e a alegria compartilhados entre pais e filhos treinando juntos. Um momento que vai ficar marcado para sempre em nossos corações.",
  },
];
