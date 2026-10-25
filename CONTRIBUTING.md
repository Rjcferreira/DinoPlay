# Contribuir para o DinoPlay

O repositório `DinoPlay` contém apenas a plataforma. Cada jogo vive num repositório público independente criado a partir de [dinoplay-game-template](https://github.com/Rjcferreira/dinoplay-game-template).

## Publicar um jogo

1. Use o botão **Use this template** no modelo oficial.
2. Crie um repositório chamado `dinoplay-<nome-do-jogo>`.
3. Preencha `manifest.json`, mantenha todos os recursos listados em `assets` e execute `node scripts/validate.mjs`.
4. Garanta que o jogo funciona sem anúncios, chat, rastreadores, login próprio ou endereços externos.
5. Crie uma versão Git imutável no formato `v1.2.3`.
6. Abra um pull request na app alterando apenas `games/registry.json` e o `games/catalog.json` gerado. Na entrada do registo indique também `owner` com o teu utilizador GitHub; a descarga, as atualizações e os créditos permanecem no teu repositório.

O catálogo é gerado por `node scripts/build-remote-catalog.mjs`. A validação confirma o manifesto, todos os ficheiros remotos e a página publicada. Esta primeira entrada exige sempre aprovação do responsável DinoPlay.

## Atualizar um jogo

Depois da primeira aprovação, publique uma release estável com tag `vX.Y.Z` no repositório do jogo. A DinoPlay procura novas releases a cada 15 minutos, valida automaticamente manifesto, identidade do jogo, ficheiros, segurança, compatibilidade, descarga e funcionamento da plataforma e só então atualiza o catálogo. Não abra um pull request para alterar a tag. Se qualquer teste falhar, a versão anterior continua ativa.

Atualizações não podem mudar o `id` do jogo. Mudanças materiais em recolha de dados, multiplayer, monetização, classificação etária ou permissões exigem nova revisão humana antes da publicação.

## Segurança

- Multiplayer exige o SDK DinoPlay e autorização parental bilateral.
- Compras e extras só podem aparecer na Área dos Pais.
- O idioma preferido é fornecido pelo SDK; cada jogo mantém as próprias traduções e usa inglês como fallback.
- Nunca inclua segredos, tokens, dados pessoais ou conteúdo de crianças.

Consulte também `docs/CHILD-SAFETY.md`, `docs/MULTIPLAYER.md`, `docs/CONTENT-POLICY.md` e `SECURITY.md`.
