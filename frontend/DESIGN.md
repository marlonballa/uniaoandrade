---
name: União Andrade Taekwondo Marcial
description: Site institucional de escola de Taekwondo tradicional em Catanduva-SP — cinematográfico, disciplinado, sem hype.
colors:
  navy: "oklch(0.20 0.09 264)"
  navy-deep: "oklch(0.13 0.07 264)"
  navy-light: "oklch(0.32 0.085 264)"
  paper: "oklch(0.97 0.006 90)"
  red: "oklch(0.56 0.19 27)"
  red-deep: "oklch(0.42 0.17 25)"
  ink: "oklch(0.20 0.035 264)"
  muted: "oklch(0.44 0.02 264)"
  line: "oklch(0.88 0.01 264)"
  surface: "oklch(0.965 0.008 264)"
typography:
  brand:
    fontFamily: "Bevan, serif"
    fontWeight: 400
  display:
    fontFamily: "Unbounded, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-deep}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
  button-secondary-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "0"
  card-benefit:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
  chip-city:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
---

## Overview

Site de uma página (App Router, um único `app/page.tsx`) para uma escola de
Taekwondo Kukkiwon Old School com mais de 20 anos de tradição em
Catanduva-SP. O mundo visual foi decidido e aprovado ainda na fase de mockup
(Claude Design), seção por seção, ao longo de várias rodadas com o cliente —
este documento registra o sistema como ele foi construído em código, não
inventa um novo.

Tom: Sábio (autoridade que não precisa se provar) + Cuidador (acolhe o medo
de começar tarde ou de o filho se machucar). Nunca linguagem de
competição/vitória ("campeão", "vencer", "imbatível"); nunca urgência
artificial. Ver `PRODUCT.md` na raiz do projeto para a justificativa de
marca completa.

## Colors

- `navy-deep` é o fundo dominante do hero e do rodapé — um azul-marinho
  "luxuoso", mais saturado que um navy neutro de UI (chroma alta para o L
  baixo), não um cinza-azulado.
- `red` é o único acento de marca: eyebrows, ícones, glow do hero, hover de
  links. Nunca usado como cor de preenchimento de botão principal — os CTAs
  primários são `paper` sobre fundo escuro, para contraste e um ar premium.
- Seções claras alternam entre `paper` (branco puro) e `surface` (branco com
  leve tingimento navy) para dar ritmo sem introduzir uma terceira cor.
- Texto sobre fundo escuro nunca é branco puro nem cinza neutro: é `paper`
  ou uma variação de opacidade de branco tingida de navy (`white/85`,
  `white/65`), nunca `gray-*` do Tailwind.

## Typography

Três famílias, papéis fixos, nunca intercambiáveis:

- **Bevan** — exclusivamente o wordmark "UNIÃO ANDRADE" e o monograma "UA"
  do emblema. Mais peso e menos serifa que a primeira tentativa (Cinzel),
  por pedido explícito do cliente.
- **Unbounded** — todos os títulos de seção (`h1`, `h2`) e os números da
  faixa de estatísticas. Inspirada na Neue Machina do kihap.com.br (fonte
  paga, não disponível via Google Fonts); Unbounded é o equivalente aberto
  mais próximo em peso e geometria.
- **Space Grotesk** — corpo de texto, navegação, labels, botões, formulário.

Escala: eyebrow 13px/0.18em tracking; h1 hero 36–46px; h2 de seção
32–38px; corpo 15–16px, `leading-relaxed`; labels de stat 12px tracked.

## Layout

Grade de 1440px de referência (o mockup original), mas todo componente foi
reconstruído mobile-first com Tailwind: `flex-col` por padrão, `lg:flex-row`
para os pares texto/grade (Metodologia) e a grade de contato (Footer);
`grid-cols-1` por padrão subindo para `sm:grid-cols-2` / `lg:grid-cols-3`
nos cards (Benefícios, Programas, Histórias). Padding horizontal de seção:
`px-6` no mobile, `sm:px-10`, `lg:px-18`. Padding vertical generoso
(`py-24`/`py-28`) nas seções de conteúdo, mais compacto (`py-16`/`py-20`)
na faixa de estatísticas e em Cidades.

O header é `fixed` (não `sticky`) para flutuar sobre o vídeo do hero como
vidro transparente e permanecer visível — com o mesmo tratamento de vidro —
ao rolar por cima das seções seguintes.

## Elevation & Depth

Glassmorfismo é a única linguagem de profundidade do site, usada em
exatamente dois lugares por design (header e faixa inferior do hero):
`bg-navy-deep/45` (ou `/32` sobre o vídeo) + `backdrop-blur-xl
backdrop-saturate-150` + borda de 1px em `white/10`. Fora disso, elevação é
sombra suave com offset (nunca halo sem offset): botões primários usam
`shadow-[0_8px_24px_oklch(0.05_0.02_264/0.35)]`; cards de benefício ganham
uma sombra maior só no hover.

## Shapes

Botões e chips são a linguagem de forma mais deliberada do site — cantos
arredondados generosos (`rounded-xl`/`rounded-2xl`, ~14–16px) nos CTAs por
pedido explícito do cliente (o primeiro rascunho usava cantos quase retos).
Chips de cidade e o CTA de vídeo institucional usam `rounded-full`. Cards
(benefícios, programas, histórias, metodologia) usam `rounded-xl`/`2xl`
com borda de 1px em `line`, nunca `border-left` colorido.

## Components

- **Header**: fixo, vidro, logo+wordmark à esquerda, nav à direita
  (desktop) ou menu hambúrguer com painel deslizante (mobile, `lg:hidden`).
- **Hero**: fundo em camadas (placeholder de vídeo + vinheta + scrim navy +
  glow vermelho), conteúdo `Reveal`-animado na entrada, CTA duplo (botão
  cheio + link sublinhado), faixa inferior de vidro com endereço/horário.
- **FAQ**: acordeão controlado por estado React, uma pergunta aberta por
  vez, transição `grid-template-rows` (0fr→1fr) — a única interação
  autoral do site, deliberadamente não repetida em outras seções.
- **ContactForm**: client component com estados idle/loading/success/error,
  honeypot anti-spam, POST para `/api/contact` (Node.js/nodemailer).

## Do's and Don'ts

- Vermelho é acento, nunca preenchimento de área grande — reservar para
  texto, ícones, glows e o CTA de "Fale conosco".
- Nunca introduzir uma quarta cor de marca; variações de navy/red via
  opacidade ou leve ajuste de chroma, não uma nova cor nomeada.
- Nunca trocar Bevan para o corpo de texto, nem Space Grotesk para o
  wordmark — os três papéis de fonte são fixos.
- Nunca inventar depoimentos, números de alunos ou fotos reais; manter o
  padrão de placeholder claramente rotulado (`[Nome do aluno]`,
  "FOTO — TURMA KIDS") até o cliente fornecer o conteúdo real.
- Nunca adicionar linguagem de competição/vitória ao copy — ver `PRODUCT.md`.
