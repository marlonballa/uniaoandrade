# Acesso ao blog pelo site

## Intenção

Facilitar a descoberta do blog da União Andrade, com entrada no menu principal e um destaque na página inicial.

## Objetivos e limites

- Adicionar “Blog” à navegação principal no desktop e no menu móvel.
- Criar uma chamada visual na página inicial que leve à listagem do blog.
- Reutilizar a rota `/blog`, a identidade visual e os componentes existentes.
- Não alterar a página do blog nem o conteúdo dos artigos.

## Abordagens consideradas

- **Menu principal:** acesso constante, mas oferece menos destaque na página inicial.
- **Destaque na página inicial:** dá visibilidade ao blog na home, mas não ajuda quem está em outras páginas.
- **Menu e destaque (escolhido):** oferece acesso em qualquer página e apresenta o blog a quem chega pela home.

## Decisões de implementação

- Usar o rótulo “Blog” no menu desktop e móvel, respeitando o comportamento responsivo já existente.
- Inserir na página inicial uma chamada curta e clicável para os artigos, com o visual e a linguagem já adotados pelo site.
- Manter a lista de posts e a gestão de conteúdo sem alterações.

## Restrições

- Preservar a paleta, tipografia e espaçamento definidos em `frontend/DESIGN.md`.
- A chamada da home deve funcionar em celular e desktop e apontar para `/blog`.
