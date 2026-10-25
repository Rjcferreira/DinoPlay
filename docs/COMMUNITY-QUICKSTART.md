# Início rápido para criadores

1. Abra [dinoplay-game-template](https://github.com/Rjcferreira/dinoplay-game-template) e escolha **Use this template**.
2. Desenvolva o jogo no novo repositório `dinoplay-<nome>`.
3. Use `DinoPlay.ready()`, `DinoPlay.storage` e, quando autorizado, `DinoPlay.multiplayer`.
4. Execute `node scripts/validate.mjs` e confirme a validação do GitHub.
5. Crie uma release estável `vX.Y.Z` e ative GitHub Pages na raiz da branch `main`.
6. Apenas para a primeira versão, proponha a entrada em `games/registry.json` no repositório `DinoPlay`; o responsável aprova manualmente.
7. Nas versões seguintes, publique apenas uma nova release estável. A plataforma deteta-a em até 15 minutos e publica-a somente se toda a revisão automática passar.

A app descarrega os ficheiros diretamente da release indicada no repositório próprio do jogo. Uma alteração na branch principal nunca chega às crianças sem uma nova release e revisão completa. Uma atualização reprovada mantém a versão anterior disponível.
