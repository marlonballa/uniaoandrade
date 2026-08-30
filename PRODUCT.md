# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with a real Node.js backend — API routes handle the contact form and any future server logic, so this is a standard Next.js server deployment, not a static export. Hosting must support a Node.js runtime (Vercel is the simplest fit for Next.js; if the client keeps KingHost, it needs KingHost's Node.js/VPS Cloud plan, not the traditional PHP shared plan). Styling delegated to Claude: Tailwind CSS, matching the design tokens (colors, type, spacing) already approved in the published mockup.

## Users

- **Persona A — o praticante adulto (25–45 anos):** rotina sedentária ou vontade de voltar a treinar; medo real de "ter perdido o jeito" ou estar velho demais para começar, mais forte na casa dos 30–40. Busca recuperar disciplina e identidade, não só condicionamento físico.
- **Persona B — pai/mãe decisor (30–45 anos, classe média, Catanduva):** preocupado com excesso de tela e falta de disciplina do filho; medo de que o filho se machuque ou desista, e de "jogar dinheiro fora" com mensalidade. Quer uma atividade que forme caráter, não só gaste energia.

## Product Purpose

Site institucional da União Andrade, uma escola de Taekwondo tradicional (linha Kukkiwon Old School) em Catanduva-SP. Existe para construir confiança, explicar a metodologia e os programas de treino, e converter visitantes em aula experimental via WhatsApp/Instagram — não para vender online nem operar um sistema de matrícula.

## Positioning

"Trabalha a arte marcial, não o esporte de competição" — diferencial confirmado pelo dono (Marlon). Tradição de mais de 20 anos, sob direção do Mestre Evandro Andrade (4º Dan) e equipe de Kyosanim (Joildo, Gustavo, Nayara e Ritinha). Isso diferencia a União Andrade de academias de Jiu-Jitsu/Muay Thai que dominam a conversa local de "luta" com discurso de esporte de competição.

## Operating Context

- Dojang físico: R. Minas Gerais, 454, 1º andar (referência: loja Hering), Centro, Catanduva-SP.
- Turmas e horários confirmados:
  - Kids e Iniciantes: segunda e quarta, 18:30h (Catanduva).
  - Adolescentes, Adultos e Graduados: segunda e quarta, 18:30h + aula extra sexta-feira, 18:30h (Catanduva).
  - Turma Mista: sábado, 09:30h às 11h, em Catiguá (não em Catanduva).
- Canais de contato/captação hoje: Instagram @uniaoandrade, WhatsApp, Facebook.
- WhatsApp para CTA: +55 17 99619-5606.
- Fotos reais confirmadas do Mestre e da equipe de Kyosanim no dojang (logo real também recebida) — em `frontend/public/`.

## Capabilities and Constraints

- Site estático institucional nesta fase — sem CMS, sem sistema de matrícula/pagamento online.
- Captação de lead via link direto do WhatsApp (wa.me, com número real) e Instagram — é o mecanismo principal dos CTAs "Agende sua aula experimental" e "Fale conosco no WhatsApp".
- Formulário de contato real na seção de contato, com back-end em Node.js (API route do Next.js) enviando e-mail para a academia — não depende de PHP nem de hospedagem compartilhada tradicional.
- Logo real (`frontend/public/logo.jpeg`) e 4 fotos reais do Mestre e da equipe de Kyosanim no dojang (`frontend/public/equipe-*.jpg`, `mestre-evandro-*.jpg`) já recebidas e em uso no hero, na seção "Quem ensina" e no banner "Embarque nessa jornada". Ainda faltam: fotos/vídeo das turmas Kids/Adolescentes/Adultos em aula e depoimentos reais de alunos — esses continuam como placeholders.

## Brand Commitments

- Nome: "União Andrade | Taekwondo Marcial".
- Paleta: vermelho, preto, branco, azul-marinho (o azul-marinho foi refinado para um tom mais rico/"luxuoso" durante o design).
- Logo: brasão circular vermelho/preto/branco — arquivo real recebido e em uso (`frontend/public/logo.jpeg`).
- Tipografia: Bevan (wordmark/logo), Unbounded (títulos de seção — inspirada na Neue Machina usada pelo kihap.com.br), Space Grotesk (corpo, nav, botões).
- Tom de voz: arquétipos Sábio (primário) e Cuidador (secundário) — calmo, direto, sem urgência artificial nem linguagem de competição/vitória ("campeão", "vencer", "imbatível"). Preferir "no seu tempo", "sem pressa", "todo mundo começa do zero".

## Evidence on Hand

- Endereço completo e um horário de turma confirmados via Instagram/Linktree da própria academia.
- Banco de conteúdo com perguntas reais de busca (banco_conteudo_uniao_andrade.xlsx) e guia de tom de voz/personas (contexto_gerador_legendas_uniao_andrade.txt) — base do copy já usado no mockup e do FAQ.
- **Já recebidos:** logo real; 3 fotos do Mestre e da equipe de Kyosanim (todas em uso em "Quem ensina"); fotos reais de turmas em aula; seis depoimentos/histórias reais com nome e foto — Jorge (retomou depois de 20 anos), Letícia (faixa amarela em julho de 2026), Sr. Manuel (começou aos 70 anos), Cláudio e Enzo (pai e filho treinando juntos), Geniel e Mylena (filha quase na faixa-preta) e Aniely e Wendel (pai e filha que treinaram juntos num treino especial de Dia dos Pais — mensagem real da Aniely, citada literalmente). Todos em `frontend/public/` (`equipe/`, `depoimentos/`, `alunos/`).
- As frases de Jorge, Letícia, Sr. Manuel, Cláudio/Enzo e Geniel/Mylena foram **escritas por Claude a pedido do Marlon**, com base nos fatos reais de cada um (não são citações literais) — precisam ser confirmadas com cada aluno/família antes de publicar. A frase da Aniele é uma citação real, tirada de um print do Instagram.
- Um vídeo enviado (`alunos/_video-precisa-compressao.mp4`, 172MB) ainda não pode ser usado no site — grande demais, precisa ser comprimido antes.
- **Não existem ainda:** depoimento real de um pai/mãe sobre a turma Kids, fotos específicas da Turma Mista em Catiguá, número exato de faixas-pretas formadas (usar "dezenas", nunca um número inventado). O código não deve fabricar esses dados — manter placeholders claramente marcados.

## Product Principles

1. Arte marcial tradicional, não esporte de competição — toda superfície reforça disciplina e tradição, nunca vitória/competição.
2. "No seu tempo, sem pressa" — reduzir o medo de começar tarde (adultos) e o medo de errar a escolha (pais), nunca usar urgência artificial.
3. Só fatos reais — nunca inventar depoimentos, números ou provas sociais; placeholders ficam marcados até o cliente fornecer o real.
4. Back-end simples e nativo do Next.js — o formulário de contato e qualquer lógica de servidor futura vivem em API routes Node.js do próprio Next.js, sem depender de PHP; a hospedagem escolhida precisa suportar Node.js (Vercel ou um plano com Node/VPS).
