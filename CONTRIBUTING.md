# Contribuir para o DinoPlay

O repositório `DinoPlay` contém apenas a plataforma. Cada jogo vive num repositório público independente criado a partir de [dinoplay-game-template](https://github.com/Rjcferreira/dinoplay-game-template).

## Publicar um jogo

1. Use o botão **Use this template** no modelo oficial.
2. Crie um repositório chamado `dinoplay-<nome-do-jogo>`.
3. Preencha `manifest.json`, mantenha todos os recursos listados em `assets` e execute `node scripts/validate.mjs`.
4. Garanta que o jogo funciona sem anúncios, chat, rastreadores, login próprio ou endereços externos.
5. Crie uma versão Git imutável no formato `v1.2.3`.
6. Abra um pull request na app alterando apenas `games/registry.json`.

O catálogo é gerado por `node scripts/build-remote-catalog.mjs`. A validação confirma o manifesto, todos os ficheiros remotos e a página publicada antes de aceitar a contribuição.

## Atualizar um jogo

Publique uma nova versão no repositório do jogo e altere apenas o respetivo `tag` e `size` em `games/registry.json`. A app conserva a versão instalada até o novo pacote estar totalmente descarregado.

## Segurança

- Multiplayer exige o SDK DinoPlay e autorização parental bilateral.
- Compras e extras só podem aparecer na Área dos Pais.
- O idioma preferido é fornecido pelo SDK; cada jogo mantém as próprias traduções e usa inglês como fallback.
- Nunca inclua segredos, tokens, dados pessoais ou conteúdo de crianças.

Consulte também `docs/CHILD-SAFETY.md`, `docs/MULTIPLAYER.md`, `docs/CONTENT-POLICY.md` e `SECURITY.md`.
