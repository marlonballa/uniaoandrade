# Inscrições do Open Andrade de Taekwondo

## Intenção

Abrir inscrições para o Open Andrade pelo site da União Andrade e dar à organização uma tela simples para acompanhar quem se inscreveu e o status do pagamento.

## Objetivos

- Criar uma página pública de inscrição no site atual.
- Coletar somente nome do responsável, nome do aluno e modalidades: Kyorugui, Poomsae ou ambas.
- Registrar uma inscrição por aluno no projeto Neon já existente.
- Depois que o envio for salvo com sucesso, confirmar a inscrição na tela e então mostrar os dados Pix para pagamento.
- Mostrar cada inscrição em um painel privado, inicialmente com status “Pendente” e ação para marcar “Pago”.

## Fora de escopo para a primeira versão

- Idade, data de nascimento, peso ou faixa.
- Confirmação automática do Pix, integração com gateway ou upload de comprovante.
- Cadastro de vários alunos em um único envio; um responsável poderá enviar outra inscrição para cada aluno.
- Criar um banco novo ou mover a hospedagem do site para Render.

## Abordagens consideradas

1. **Google Forms e Sheets:** exige menos desenvolvimento e permite acompanhar pagamentos em uma coluna da planilha, mas deixa o formulário e o controle administrativo fora do site.
2. **Formulário e painel próprios com o Neon existente:** mantém inscrição e acompanhamento dentro do site e reaproveita o banco que a União Andrade já tem. Esta é a direção escolhida pelo usuário.

## Direção proposta

- Formulário direto, com responsável, aluno e duas opções de modalidade. Exigir ao menos uma modalidade.
- Taxa de R$ 30,00 por aluno. Premissa proposta: o mesmo valor cobre uma ou ambas as modalidades.
- Considerar “inscrição confirmada” como o registro salvo com sucesso no Neon. A tela de sucesso exibe o Pix após essa gravação; a inscrição permanece pendente de pagamento.
- Mostrar o Pix copia e cola e QR Code somente depois que a gravação da inscrição no Neon for confirmada.
- Dados Pix informados pelo usuário: chave telefone `+5517996195606`, recebedor Evandro José de Andrade, Catanduva-SP. No BR Code, usar o nome como fornecido, cidade `CATANDUVA` e valor de R$ 30,00; calcular comprimentos dos campos em bytes UTF-8.
- Painel administrativo com autenticação, lista de inscrições, nome do aluno, responsável, modalidades, data de envio e status do pagamento. Permitir marcar o Pix como pago.
- Manter o site na Vercel e usar o banco Neon já existente. O painel deve usar rotas de servidor do Next.js para ler e gravar no banco.

## Restrições e dependências

- O projeto local não tem conexão Neon configurada nem vínculo local com a Vercel. A credencial deve ser configurada em variável de ambiente, sem entrar no Git.
- O Console Neon mostra o projeto União Andrade, database `neondb` e somente a branch `production`. O usuário autorizou trabalhar diretamente em produção.
- A inspeção inicial de `information_schema.tables` não retornou tabelas próprias da aplicação. Depois da autorização expressa para trabalhar na produção, a migração `frontend/db/migrations/001_open_andrade_registrations.sql` criou a tabela `public.open_andrade_registrations` e seu índice; `to_regclass` confirmou a tabela.
- Nenhuma inscrição de aluno foi inserida na produção durante o desenvolvimento.
- O Console avisava que consultar a branch arquivada iria desarquivá-la; após a migração, a conexão do SQL Editor ficou ativa.
- O usuário informou que o Torneio Interno acontece em 15/11/2026, com chegada dos alunos até às 08h e início às 09h, e que as inscrições encerram às 23h59 de 11/11/2026. A taxa é R$ 30,00 por aluno e os dados Pix estão definidos. Local da competição não foi informado; não inventar nem exibir.
- A migração `002_open_andrade_rate_limits.sql` criou a tabela `public.open_andrade_rate_limits` na produção; `to_regclass` confirmou a tabela. Ela limita envios a 60 por hora por origem e tentativas de login a 10 por 15 minutos. A aplicação persiste HMACs dos IPs, não os IPs em texto aberto. Nenhuma inscrição de teste ou linha de limite de tentativas foi inserida.
- A conexão `DATABASE_URL` e os segredos do painel ainda não estão configurados no ambiente local nem foram publicados na Vercel.

## Pontos deixados ao implementador

- Escolher uma autenticação simples e segura para uma pequena equipe administrativa.
- Adicionar a estrutura mínima de dados necessária sem alterar tabelas existentes.
- Validar a submissão e impedir que o público acesse a lista administrativa ou os dados de outras inscrições.
