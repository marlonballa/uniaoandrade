---
target: "https://uniaoandrade.vercel.app/"
total_score: 27
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
timestamp: 2026-09-02T20-05-31Z
slug: uniaoandrade-vercel-app
---
**Método:** dual-agent (Avaliação A — revisão de design — e Avaliação B — detector + evidência de navegador — rodaram como sub-agentes independentes e isolados, sem contato entre si).

## Nota de metodologia

A Avaliação B tentou rodar o detector automático via overlay no navegador, mas a injeção do script foi **bloqueada pelo navegador por conteúdo misto**: o site alvo roda em `https://`, e o servidor local do detector serve em `http://` puro — o Chrome bloqueia silenciosamente esse tipo de requisição antes mesmo de enviá-la. A tentativa foi genuína (servidor subiu, `detect.js` respondia 200 via curl, mas a tag `<script>` injetada na página nunca disparou `onload` nem `onerror`); diante disso, a B seguiu o caminho de fallback previsto e fez uma auditoria manual de DOM/acessibilidade/rede no lugar do overlay. Isso é uma limitação do ambiente desta sessão, não um defeito do site.

## Nota de escopo mobile

O `resize_window` não alterou de fato o viewport renderizado nesta sessão (ficou travado em ~1920px). A Avaliação A verificou o comportamento mobile diretamente no código-fonte Next.js/Tailwind do repositório (`frontend/components/*.tsx`) como fonte confiável de verdade responsiva; a Avaliação B usou um `<iframe>` de 390×844 como proxy (media queries reais se aplicam, mas sem input de toque real). Ambas convergem nos mesmos achados sobre o carrossel de Turmas, os cards de Presença e o menu mobile.

## Nota de Saúde do Design

| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Visibilidade do status do sistema | 3 | Boa resposta local (FAQ, formulário, contador da lightbox), mas sem indicador de seção ativa no menu fixo ao rolar uma página de 12 seções |
| 2 | Correspondência com o mundo real | 4 | Português direto, jargão explicado inline ("Poomsae (formas)"), linguagem consistente com "Kyosanim"/"Mestre" |
| 3 | Controle e liberdade do usuário | 3 | FAQ/lightbox/menu mobile fecham bem, mas o CTA principal abre um domínio externo sem nenhum aviso visual de que vai sair do site |
| 4 | Consistência e padrões | 2 | O agendamento externo (sistemakihap.com.br) quebra toda a identidade visual que o site acabou de construir |
| 5 | Prevenção de erros | 2 | `ContactForm.tsx` usa `noValidate` e não roda validação no cliente antes do `fetch` — os `required` ficam inertes (confirmado no código pela A; a B confirma que todos os campos têm `<label>` associado, mas isso não impede envio em branco) |
| 6 | Reconhecimento em vez de memorização | 4 | Par ícone+rótulo consistente em Metodologia, Benefícios, Programas, Cidades |
| 7 | Flexibilidade e eficiência de uso | n/a | Página de conversão de visita única, sem fluxo repetido/avançado a otimizar |
| 8 | Design estético e minimalista | 3 | Metodologia (9 itens simultâneos) e Benefícios (6 itens simultâneos) pesam logo após o hero, contra o tom "sem pressa" da marca |
| 9 | Ajuda a reconhecer/diagnosticar/recuperar erros | 2 | Só uma linha vermelha genérica (`role="alert"`) no erro do formulário, sem indicação por campo |
| 10 | Ajuda e documentação | 4 | FAQ com 14 itens responde diretamente aos medos reais das duas personas — funciona como documentação embutida |
| **Total** | | **27/36** | **Bom (75%)** |

*(Heurística 7 marcada n/a por não se aplicar a uma landing page de conversão única; o total foi renormalizado para /36.)*

## Veredito de Especificidade de Design

**Avaliação LLM:** Design genuinamente autoral, não um template reaproveitado. A paleta (navy/vermelho/papel), o sistema tipográfico Bevan/Unbounded/Space Grotesk e o copy foram construídos em cima deste produto exato: FAQ com perguntas específicas ("posso começar depois dos 30/40?", "é bom para TDAH?"); depoimentos batendo quase um a um com as duas personas do briefing. O ponto onde a especificidade quebra: "Agende sua aula experimental" entrega o visitante ao `sistemakihap.com.br`, um SaaS de agendamento genérico sem nada da paleta, tipografia ou brasão do site — a transição mais brusca e genérica exatamente no clique de maior intenção.

**Evidência determinística:** o scan automático não pôde rodar (bloqueio de conteúdo misto). A auditoria manual de DOM da Avaliação B corrobora e complementa achados importantes:
- **Corroboração independente forte:** sem qualquer acesso ao relatório da A, a B observou uma aba abrindo sozinha para `https://sistemakihap.com.br/experimental?kwan=tagari75se` — exatamente a URL que a A identificou lendo o código como destino do botão "Agende sua aula experimental".
- **Achado adicional da B:** o carrossel de Depoimentos captura o scroll do mouse verticalmente quando o cursor está sobre ele no desktop.
- **Sem falsos positivos a reportar**, já que o detector não chegou a rodar.
- **Positivo confirmado pela B:** 26 imagens, 0 sem `alt`, 0 quebradas; 4 campos do formulário com `<label>` associado; 15 botões só-ícone amostrados com `aria-label`; sem overflow horizontal no mobile; nenhum erro de console vindo do próprio site.

**Overlays visuais:** não há overlay disponível nesta rodada — injeção bloqueada por conteúdo misto.

## Impressão Geral

O copy e a estrutura de conteúdo estão claramente pensados para este público e esta marca. O ponto fraco é que a jornada de conversão perde consistência visual e reafirmação emocional exatamente nos dois momentos que mais importam: o clique do CTA principal (sai para um domínio estranho) e o fechamento da página (termina em pergunta logística de FAQ, não no calor dos depoimentos). A maior oportunidade única é reconciliar CTA e identidade visual no momento de maior intenção do visitante.

## O Que Está Funcionando

1. **Ajuste mensagem-mercado no copy é incomumente preciso** — FAQ e depoimentos escritos claramente contra as duas personas do briefing, com honestidade em não superprometer.
2. **O carrossel de Histórias (`Historias.tsx`) é o ponto alto de craft do site** — cards verticais 9:16 com fotos reais, gradiente para legibilidade, scroll-snap, botões prev/next acessíveis.
3. **Base de acessibilidade acima da média**, confirmada por ambas as avaliações: `aria-expanded`/`aria-controls`/`role="region"` no FAQ, `:focus-visible` global, `prefers-reduced-motion` respeitado, alt text real, labels em todos os campos e botões-ícone.

## Problemas Prioritários

**[P1] A ação de conversão principal quebra a marca no momento de maior risco**
- **Por que importa:** "Agende sua aula experimental" leva a `sistemakihap.com.br/experimental?...`, sem nenhuma cor/tipografia/brasão do site. Para a Persona B (medo de "jogar dinheiro fora"), cair num domínio desconhecido no momento do compromisso quebra confiança — confirmado de forma independente pela Avaliação B.
- **Correção:** usar white-label do Kihap se disponível, ou tornar o WhatsApp (já com a marca completa) o CTA primário, rebaixando o link de agendamento.
- **Comando sugerido:** `/impeccable layout`

**[P1] Não existe caminho persistente de volta ao agendamento numa página longa**
- **Por que importa:** o cabeçalho fixo só tem 5 links de âncora e o menu hamburguer — sem botão de agendar, sem botão flutuante de WhatsApp no código.
- **Correção:** barra de CTA fixa discreta (mobile principalmente) ou botão flutuante de WhatsApp.
- **Comando sugerido:** `/impeccable layout`

**[P2] Campos obrigatórios do formulário de contato não são realmente aplicados**
- **Por que importa:** `ContactForm.tsx` usa `<form noValidate>` sem validação no cliente antes do `fetch` — `required` fica inerte. Só há uma linha de erro genérica se o servidor rejeitar.
- **Correção:** validação por campo com mensagens específicas, ou remover `noValidate`.
- **Comando sugerido:** `/impeccable harden`

**[P2] Metodologia (9 itens) e Benefícios (6 itens) violam ≤4 itens por grupo**
- **Por que importa:** logo após o hero, lista técnica de 9 itens antes de qualquer reasseguramento — a mensagem "no seu tempo" só aparece bem mais adiante.
- **Correção:** agrupar os 9 itens de Metodologia nas 3 categorias já nomeadas no copy; limitar Benefícios a 3-4 itens.
- **Comando sugerido:** `/impeccable layout`

**[P2] Risco de contraste insuficiente nos rótulos vermelhos (não confirmado)**
- **Por que importa:** rótulos de seção em `--red` 13px semibold sobre fundo claro; estimativa perto/abaixo de 4.5:1. Existe `--red-deep` mais escuro não utilizado.
- **Correção:** medir com verificador de contraste real; trocar para `--red-deep` se falhar.
- **Comando sugerido:** `/impeccable audit`

## Sinais de Alerta por Persona

**Persona A — praticante adulto (25-45, medo de "estar velho demais"):**
- Reafirmação ("gente que começou aos 30, 40, 50") só aparece na Jornada, depois de lista técnica de 9 itens cheia de jargão.
- Não está dito em lugar nenhum que a aula experimental é **gratuita** — FAQ diz "sem compromisso", que soa como "sem obrigação", não "sem custo".
- Cair no formulário sem identidade do Kihap logo após reunir coragem é ponto plausível de desistência.

**Persona B — pai/mãe decisor (medo do filho se machucar/desistir/"jogar dinheiro fora"):**
- Mesma ambiguidade grátis/pago, exatamente o medo nomeado desta persona.
- Sem idade mínima declarada, duração da aula ou política de reposição.
- Checkbox seca "É para um menor de idade" no formulário do Kihap, sem o tom acolhedor do resto do site.

## Observações Menores

- Imagens do hero/galeria sem `placeholder="blur"` mostram caixa escura vazia por um instante em conexões lentas.
- Ícones de WhatsApp/Instagram no rodapé com ~20px, abaixo do alvo de toque recomendado de ~44px.
- FAQ abre item 1 por padrão; no mobile empurra os outros 13 itens para baixo.
- Carrossel de Depoimentos captura scroll vertical do mouse no desktop.
- 5 chips de cidade em Presença todos visíveis de uma vez, no limite do critério "≤4 opções visíveis".

## Perguntas Para Refletir

1. Por que o clique de maior intenção do site entrega o visitante a uma ferramenta genérica com identidade visual diferente?
2. Não dizer se a aula experimental é grátis é estratégia deliberada, ou está custando conversões dos mais sensíveis a preço?
3. Os depoimentos são o ponto emocional mais alto — o que mudaria na taxa de fechamento se a página terminasse neles em vez de numa pergunta de FAQ sobre faixas?
