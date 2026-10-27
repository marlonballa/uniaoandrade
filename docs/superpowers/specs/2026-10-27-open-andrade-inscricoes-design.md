# Inscrições do Open Andrade de Taekwondo

## Intenção

Permitir que responsáveis inscrevam alunos no Open Andrade de Taekwondo pelo site da União Andrade e que a organização consulte inscrições e acompanhe pagamentos.

## Objetivos

- Coletar nome do responsável e nome do aluno.
- Permitir selecionar Kyorugui, Poomsae ou ambos; exigir ao menos uma modalidade.
- Exibir instruções e dados de pagamento Pix fornecidos pela União Andrade.
- Salvar cada inscrição no banco Neon existente.
- Disponibilizar uma área administrativa protegida para consultar inscrições e marcar o pagamento como pendente ou pago.

## Fora de escopo

- Processar pagamentos ou confirmar Pix automaticamente.
- Criar outro banco ou mover a hospedagem do site para Render.
- Inventar valor, chave Pix, QR Code, data, local ou regras do evento.

## Abordagens consideradas

1. **Google Forms e Sheets:** caminho de menor configuração, com respostas em uma planilha e atualização manual do status de pagamento. Não aproveita o banco já existente e oferece uma experiência menos integrada ao site.
2. **Formulário e painel próprios com o Neon existente:** mantém a inscrição no site e armazena os dados no PostgreSQL já criado pela União Andrade. Foi escolhido como direção, considerando que o usuário informou que esse banco já existe.

## Direção proposta

- Implementar uma página do evento no Next.js existente, seguindo os estilos e a navegação atual.
- Reutilizar o projeto Neon informado pelo usuário. A hospedagem permanece na Vercel; não é necessário conectar Render.
- Proteger o painel administrativo com autenticação e permitir listar inscrições e atualizar manualmente o status do Pix.
- Tratar cada submissão como uma inscrição de um aluno, com uma ou ambas as modalidades selecionadas.
- Manter valor e dados Pix em configuração clara, preenchida somente com os dados fornecidos pela União Andrade.
- Conferir o schema existente antes de criar tabelas; não presumir que o banco esteja vazio.

## Restrições e dependências

- O repositório não contém configuração local de conexão com Neon nem metadados de projeto Vercel. O endereço do Console identifica o projeto, mas não fornece acesso ao schema ou credenciais neste workspace.
- A conexão deverá ser configurada por variável de ambiente na Vercel e, para desenvolvimento local, em arquivo local ignorado pelo Git. Segredos não devem entrar no código ou neste documento.
- Para completar e publicar a página serão necessários o valor da taxa, a chave Pix copia e cola ou imagem do QR Code e os detalhes confirmados do evento que devem aparecer ao participante.
- Por padrão, a confirmação será manual no painel, pois o fluxo solicitado usa Pix direto. Confirmação automática exigiria integração adicional com um provedor de pagamentos.

## Pontos deixados ao implementador

- Inspecionar o schema do branch Neon indicado antes de alterar o banco.
- Escolher o mecanismo de autenticação adequado para uma área administrativa de acesso restrito.
- Validar proteção contra submissões inválidas e exposição pública dos dados dos alunos.
