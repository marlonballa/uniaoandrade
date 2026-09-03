# União Andrade | Taekwondo Marcial — site

Next.js (App Router) + Tailwind CSS v4 + TypeScript. Backend em Node.js
(Route Handlers do próprio Next.js) para a busca de posts do Instagram.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## WhatsApp

O número usado nos botões "Agende sua aula experimental" /
"Fale conosco no WhatsApp" está em `lib/contact.ts`
(`WHATSAPP_NUMBER`). Troque ali se o número mudar.

## Posts do Instagram (atualiza a cada 15 dias)

A seção "Os posts que mais bombam no Instagram" mostra os **5 posts com
mais curtidas+comentários de todos os tempos** do @uniaoandrade (não só os
mais recentes — o código pagina o histórico inteiro da conta antes de
ordenar por engajamento). Ela usa a **"Instagram API with Instagram
Login"** (também chamada de "Business Login for Instagram") — o caminho
atual da Meta, que **não exige mais vincular uma Página do Facebook** (isso
mudou; se você viu instruções antigas pedindo uma Página, estão
desatualizadas).

**1. Preparar a conta**
O Instagram @uniaoandrade precisa ser conta **Business ou Creator**
(Configurações → Conta → Mudar para conta profissional, se ainda não for).
Não precisa de Página do Facebook.

**2. Criar o app na Meta**
Em https://developers.facebook.com/, crie um app, adicione o produto
**Instagram** e vá em **Instagram → API setup with Instagram login → Set
up Instagram business login**. Anote o **Instagram App ID** e o
**Instagram App Secret**, e cadastre uma **Redirect URI** (pode ser
`https://seusite.com/` mesmo, só precisa bater com a usada no passo
seguinte).

Como é a sua própria conta, não precisa de App Review — a Meta chama isso
de "Standard Access", liberado automaticamente pra contas que você mesmo
administra.

**3. Autorizar e gerar o token**
Abra esta URL no navegador (troque `APP_ID` e `REDIRECT_URI`):

```
https://www.instagram.com/oauth/authorize
  ?client_id=APP_ID
  &redirect_uri=REDIRECT_URI
  &response_type=code
  &scope=instagram_business_basic
```

Faça login com a conta @uniaoandrade e autorize. Você será redirecionado
para `REDIRECT_URI?code=...` — copie esse `code`.

Troque o código por um token de curta duração:

```bash
curl -X POST https://api.instagram.com/oauth/access_token \
  -F client_id=APP_ID \
  -F client_secret=APP_SECRET \
  -F grant_type=authorization_code \
  -F redirect_uri=REDIRECT_URI \
  -F code=O_CODE_DO_PASSO_ANTERIOR
```

A resposta traz `access_token` (curto) e `user_id` — **esse `user_id` é o
seu `INSTAGRAM_USER_ID`**. Agora troque o token curto por um de longa
duração (~60 dias):

```bash
curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=APP_SECRET&access_token=TOKEN_CURTO"
```

O `access_token` dessa resposta é o seu **`INSTAGRAM_ACCESS_TOKEN`**.

Preencha em `.env.local`:

```
INSTAGRAM_USER_ID=
INSTAGRAM_ACCESS_TOKEN=
```

Sem essas variáveis, a seção simplesmente não aparece no site — não quebra
nada. Se preferir, eu monto uma página no próprio site que faz os passos 3
em um clique (evita usar `curl`) — é só pedir.

**Como funciona a atualização de 15 em 15 dias:** não existe um cron
separado. O próprio `fetch` da Graph API usa o cache de dados do Next.js
(`next: { revalidate: 1296000 }`, 15 dias em segundos) — o Next só busca
de novo na API do Instagram depois desse prazo, servindo a versão em cache
enquanto isso. Isso funciona sem configuração extra na Vercel; em outra
hospedagem Node, o mesmo mecanismo vale desde que o processo continue no
ar (cache em memória/disco do Next).

**Manutenção necessária:** o token de acesso de longa duração expira a
cada ~60 dias e precisa ser renovado manualmente (gerando um novo e
atualizando `INSTAGRAM_ACCESS_TOKEN`) — a Graph API tem um endpoint de
refresh, mas automatizá-lo exigiria um lugar para guardar o token
atualizado entre execuções (um pequeno banco/KV), o que não foi construído
aqui para não adicionar infraestrutura sem necessidade. Se isso virar
incômodo, dá pra automatizar depois.

## Deploy

Este é um app Next.js completo (com back-end em Node.js via Route
Handlers), **não** um export estático — precisa de uma hospedagem que
rode Node.js:

- **Vercel** (recomendado): este projeto vive em `frontend/` dentro do
  repositório `uniaoandrade` (monorepo). Ao importar o repositório na
  Vercel, configure **Root Directory = `frontend`** nas configurações
  do projeto — sem isso a Vercel tenta buildar a partir da raiz do
  repositório e não encontra o `package.json`.
- **KingHost**: precisa do plano com Node.js/VPS Cloud, não do plano
  compartilhado tradicional (que só roda PHP).

## O que falta antes de publicar

- Fotos/vídeo das turmas Kids, Adolescentes e Adultos em aula (os cards de
  "Programas de Treino" ainda são placeholders visuais — a logo e as fotos
  do Mestre/equipe de Kyosanim já estão em uso).
- Depoimentos reais para "Histórias de Transformação" (hoje são
  placeholders com texto entre colchetes).
- Variáveis do Instagram (`INSTAGRAM_USER_ID`, `INSTAGRAM_ACCESS_TOKEN`)
  para a seção "No Instagram" aparecer no site.
