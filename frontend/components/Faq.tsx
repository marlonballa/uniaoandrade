"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Taekwondo é uma luta forte? Serve para defesa pessoal?",
    a: "É uma arte marcial completa — combina luta, técnica e defesa pessoal real, não só chutes esportivos. Você desenvolve reflexo, postura e recursos de defesa pessoal enquanto aprende disciplina e respeito, sem precisar competir com ninguém.",
  },
  {
    q: "Qual a idade ideal para uma criança começar Taekwondo?",
    a: "Não existe uma idade única — existe a fase certa para cada criança. Nossas turmas Kids respeitam esse processo: primeiro coordenação e disciplina de forma lúdica, depois técnica com mais consistência, sempre no ritmo de cada aluno.",
  },
  {
    q: "Dá para começar Taekwondo depois dos 30 ou 40 anos?",
    a: "Dá, e é mais comum do que parece. Boa parte da nossa turma adulta começou depois dos 30, 40 e até dos 50 — sem constrangimento e sem comparação com ninguém. Aqui você treina no seu tempo.",
  },
  {
    q: "Quanto tempo leva para virar faixa-preta?",
    a: "É um processo gradual — cada graduação é conquistada, não dada por tempo de casa. Ao longo de mais de 20 anos, formamos dezenas de faixas-pretas, sempre respeitando a evolução técnica de cada aluno.",
  },
  {
    q: "O Taekwondo tem risco de lesão?",
    a: "Como em qualquer arte marcial, existe contato — por isso o treino segue progressão gradual, com equipamentos de proteção e supervisão constante do Mestre e da equipe de instrutores.",
  },
  {
    q: "Qual a diferença da União Andrade para outras academias?",
    a: "Trabalhamos o Taekwondo como arte marcial — não como esporte de competição. A linha Kukkiwon Old School preserva técnica, disciplina, filosofia e tradição, com mais de 20 anos de história em Catanduva.",
  },
  {
    q: "Como funciona a aula experimental?",
    a: "É simples: você agenda pelo WhatsApp ou Instagram, vem conhecer o dojang e treina uma aula com a turma. Sem compromisso — só para sentir como é treinar Taekwondo de verdade.",
  },
  {
    q: "O Taekwondo tem soco, ou é só chute?",
    a: "Tem soco, sim. Apesar do nome remeter aos pés, o Taekwondo trabalha socos, defesas, torções e até derrubadas — chute é só uma parte de uma arte marcial completa.",
  },
  {
    q: "Taekwondo emagrece? Quantas calorias gasta numa aula?",
    a: "O treino é intenso e trabalha o corpo inteiro, então ajuda — mas o gasto calórico exato varia de pessoa pra pessoa. Emagrecimento vem da constância, não de uma aula isolada; o que a gente garante é treino sério, toda semana, no seu ritmo.",
  },
  {
    q: "Taekwondo faz a criança crescer mais?",
    a: "Não — nenhum esporte aumenta a altura além do potencial genético de cada um, isso é mito. O que o Taekwondo desenvolve de verdade é postura, coordenação e condicionamento físico, não centímetros.",
  },
  {
    q: "Dá para aprender Taekwondo sozinho, sem ir a uma academia?",
    a: "Dá pra imitar alguns movimentos por vídeo, mas faixa, graduação e a evolução técnica de verdade só acontecem com professor e turma — é o olhar de quem corrige e acompanha que faz a diferença entre imitar um chute e realmente aprender Taekwondo.",
  },
  {
    q: "Taekwondo é uma boa opção para criança com dificuldade de concentração ou TDAH?",
    a: "Muitos pais relatam que a rotina, a disciplina e as regras claras do treino ajudam no dia a dia — mas não é tratamento nem substitui acompanhamento médico. Se é o seu caso, vale conversar com a gente pra entender se o ritmo da turma combina com seu filho.",
  },
  {
    q: "Qual a diferença entre Taekwondo e Jiu-Jitsu ou Muay Thai?",
    a: "Cada arte marcial tem sua própria tradição e foco — não é sobre qual é \"melhor\". Na União Andrade, o Taekwondo é trabalhado como arte marcial completa, com ênfase em técnica, filosofia e disciplina, não como esporte de competição.",
  },
  {
    q: "Quais são as faixas do Taekwondo? Qual é a mais alta?",
    a: "Assim como na maioria das escolas de Taekwondo, a evolução passa por faixas coloridas até chegar à faixa-preta — a mais alta graduação. A ordem exata e os critérios de cada faixa seguem a linha Kukkiwon Old School que a União Andrade preserva há mais de 20 anos.",
  },
];

const MID = Math.ceil(FAQ_ITEMS.length / 2);
const COLUMNS = [FAQ_ITEMS.slice(0, MID), FAQ_ITEMS.slice(MID)];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface px-6 py-24 sm:px-10 lg:px-18 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
        <span className="font-sans text-[13px] font-semibold tracking-[0.18em] text-red">
          PERGUNTAS FREQUENTES
        </span>
        <h2 className="max-w-[680px] font-display text-3xl text-ink sm:text-4xl">
          O que quem pesquisa Taekwondo mais pergunta
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-x-14 sm:grid-cols-2">
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col divide-y divide-line"
          >
            {column.map((item, i) => {
              const index = columnIndex === 0 ? i : MID + i;
              const isOpen = openIndex === index;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left font-sans text-[17px] font-semibold text-ink"
                    >
                      {item.q}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--red)"
                        strokeWidth="2.5"
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 font-sans text-[15px] leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
