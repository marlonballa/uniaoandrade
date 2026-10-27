# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), hosted on Vercel (deployed at uniaoandrade.vercel.app; no custom domain connected yet). Styling: Tailwind CSS, matching the design tokens (colors, type, spacing) approved during the original mockup phase and documented in `frontend/DESIGN.md`.

The site moved from a single page to a multi-page, SEO-driven architecture (implemented per an approved blueprint): a rewritten Home plus dedicated pages per search intent — `/taekwondo-catanduva/`, `/taekwondo-infantil-catanduva/`, `/taekwondo-adulto-catanduva/`, `/sobre/`, `/contato/` (P0), then `/academia-de-lutas-catanduva/`, `/artes-marciais-catanduva/`, `/defesa-pessoal-catanduva/`, `/equipe/` (P1), then a blog at `/blog/` (P2). The blog is plain Markdown files in `frontend/content/blog/` (parsed with `gray-matter`/`marked`), not a CMS — publishing a new post means adding a file and deploying. `lib/routes.ts` is the central route/title/description registry consumed by the header, footer, and `sitemap.ts`.

Still no contact form and no enrollment/payment system: WhatsApp and Instagram remain the only contact channels.

## Users

- **Persona A — o praticante adulto (25–45 anos):** rotina sedentária ou vontade de voltar a treinar; medo real de "ter perdido o jeito" ou estar velho demais para começar, mais forte na casa dos 30–40. Busca recuperar disciplina e identidade, não só condicionamento físico.
- **Persona B — pai/mãe decisor (30–45 anos, classe média, Catanduva):** preocupado com excesso de tela e falta de disciplina do filho; medo de que o filho se machuque ou desista, e de "jogar dinheiro fora" com mensalidade. Quer uma atividade que forme caráter, não só gaste energia.

## Product Purpose

Site institucional da União Andrade, uma escola de Taekwondo tradicional (linha Kukkiwon Old School) em Catanduva-SP. Existe para construir confiança, explicar a metodologia e os programas de treino, e converter visitantes em aula experimental via WhatsApp/Instagram — não para vender online nem operar um sistema de matrícula.

## Positioning

"Trabalha a arte marcial, não o esporte de competição" — diferencial confirmado pelo dono (Marlon). Tradição de mais de 20 anos, sob direção do Mestre Evandro Andrade (4º Dan) e equipe de Kyosanim (Joildo, Gustavo, Nayara e Ritinha). Isso diferencia a União Andrade de academias de Jiu-Jitsu/Muay Thai que dominam a conversa local de "luta" com discurso de esporte de competição.

## Operating Context

- Dojang físico: R. Minas Gerais, 454, 1º andar (referência: loja Hering), Centro, Catanduva-SP.
- Turmas e horários confirmados (grade atualizada, substitui a grade anterior):
  - Kids e Iniciantes: segunda, terça, quarta e quinta, 18h (Catanduva).
  - Adolescentes, Adultos e Graduados: segunda e quarta, 18h30 ou 19h30 (Catanduva).
  - Turma Mista: sábado, 9h30 às 11h, em Catiguá (não em Catanduva).
- A União Andrade é vinculada à Liga Nacional (sem mais detalhes confirmados além da filiação em si — não inventar nome oficial completo, nível de participação ou histórico de competições).
- Aula experimental: gratuita, sem compromisso. Traje: bermuda e camiseta (homens) ou calça legging e camiseta (mulheres), nunca tops ou shorts curtos. O dobok só é obrigatório depois da matrícula.
- Currículo técnico confirmado (além dos elementos já registrados): inclui também técnicas de combate real, técnicas de combate ágil para competições, quebramento e conhecimento histórico.
- Canais de contato/captação hoje: Instagram @uniaoandrade, WhatsApp, Facebook.
- WhatsApp para CTA: +55 17 99619-5606.
- Fotos reais confirmadas do Mestre e da equipe de Kyosanim no dojang (logo real também recebida) — em `frontend/public/`.

## Capabilities and Constraints

- Site institucional multi-página, sem CMS, sem sistema de matrícula/pagamento online. O blog (`/blog/`) é conteúdo em arquivos Markdown versionados no repositório, não um painel de publicação — o cliente não escreve posts diretamente, precisa pedir para adicionar/editar via código.
- Domínio próprio, GA4 (Google Analytics) e Google Search Console ainda não configurados — pré-requisitos externos que dependem do cliente, não bloqueiam o código.
- Captação de lead via link direto do WhatsApp (wa.me, com número real) e Instagram — é o mecanismo principal dos CTAs "Agende sua aula experimental" e "Fale conosco no WhatsApp".
- Sem formulário de contato no site — o contato acontece direto por WhatsApp (wa.me) e Instagram; o formulário existente foi removido por decisão do cliente.
- Logo real (`frontend/public/logo.jpeg`) e 4 fotos reais do Mestre e da equipe de Kyosanim no dojang (`frontend/public/equipe-*.jpg`, `mestre-evandro-*.jpg`) já recebidas e em uso no hero, na seção "Quem ensina" e no banner "Embarque nessa jornada". Ainda faltam: fotos/vídeo das turmas Kids/Adolescentes/Adultos em aula e depoimentos reais de alunos — esses continuam como placeholders.

## Brand Commitments

- Nome: "União Andrade | Taekwondo Marcial".
- Paleta: vermelho, preto, branco, azul-marinho (o azul-marinho foi refinado para um tom mais rico/"luxuoso" durante o design).
- Logo: brasão circular vermelho/preto/branco — arquivo real recebido e em uso (`frontend/public/logo.jpeg`).
- Tipografia: Bevan (wordmark/logo), Unbounded (títulos de seção — inspirada na Neue Machina usada pelo kihap.com.br), Space Grotesk (corpo, nav, botões).
- Tom de voz: arquétipos Sábio (primário) e Cuidador (secundário) — calmo, direto, sem urgência artificial nem linguagem de competição/vitória ("campeão", "vencer", "imbatível"). Preferir "no seu tempo", "sem pressa", "todo mundo começa do zero".
- Regras mecânicas de escrita (pedidas explicitamente pelo cliente): nunca usar travessão (—); nunca usar a construção "não é X, é Y"; nunca fazer suposições no copy; nunca usar emoji; evitar as palavras "silencioso", "segredo", "clareza", "coisas que ninguém te conta"/"ninguém fala sobre". Comunicação com o cliente sempre em Português do Brasil (registrado também em `CLAUDE.md` na raiz do projeto).

## Evidence on Hand

- Endereço completo e um horário de turma confirmados via Instagram/Linktree da própria academia.
- Banco de conteúdo com perguntas reais de busca (banco_conteudo_uniao_andrade.xlsx) e guia de tom de voz/personas (contexto_gerador_legendas_uniao_andrade.txt) — base do copy já usado no mockup e do FAQ. A aba "Perguntas Reais (AlsoAsked)" dessa planilha já foi minerada uma vez para expandir o FAQ do site de 14 para 24 perguntas; ainda tem perguntas nela não usadas (ex. categoria de peso, WTF x ITF, regras específicas de competição) porque exigem confirmação factual do cliente antes de virar conteúdo do site.
- **Já recebidos:** logo real; 3 fotos do Mestre e da equipe de Kyosanim (todas em uso em "Quem ensina"); fotos reais de turmas em aula; seis depoimentos/histórias reais com nome e foto — Jorge (retomou depois de 20 anos), Letícia (faixa amarela em julho de 2026), Sr. Manuel (começou aos 70 anos), Cláudio e Enzo (pai e filho treinando juntos), Geniel e Mylena (filha quase na faixa-preta) e Aniely e Wendel (pai e filha que treinaram juntos num treino especial de Dia dos Pais — mensagem real da Aniely, citada literalmente). Todos em `frontend/public/` (`equipe/`, `depoimentos/`, `alunos/`).
- As frases de Jorge, Letícia, Sr. Manuel, Cláudio/Enzo e Geniel/Mylena foram **escritas por Claude a pedido do Marlon**, com base nos fatos reais de cada um (não são citações literais) — precisam ser confirmadas com cada aluno/família antes de publicar. A frase da Aniele é uma citação real, tirada de um print do Instagram.
- Um vídeo enviado (`alunos/_video-precisa-compressao.mp4`, 172MB) ainda não pode ser usado no site — grande demais, precisa ser comprimido antes.
- **Não existem ainda:** depoimento real de um pai/mãe sobre a turma Kids, fotos específicas da Turma Mista em Catiguá, número exato de faixas-pretas formadas (usar "dezenas", nunca um número inventado). O código não deve fabricar esses dados — manter placeholders claramente marcados.

## Product Principles

1. Arte marcial tradicional, não esporte de competição — toda superfície reforça disciplina e tradição, nunca vitória/competição.
2. "No seu tempo, sem pressa" — reduzir o medo de começar tarde (adultos) e o medo de errar a escolha (pais), nunca usar urgência artificial.
3. Só fatos reais — nunca inventar depoimentos, números ou provas sociais; placeholders ficam marcados até o cliente fornecer o real.
4. Back-end simples e nativo do Next.js — qualquer lógica de servidor futura vive em API routes Node.js do próprio Next.js, sem depender de PHP; a hospedagem escolhida precisa suportar Node.js (Vercel ou um plano com Node/VPS).
