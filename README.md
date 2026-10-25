# DinoPlay

DinoPlay é uma plataforma infantil instalável: uma biblioteca segura onde cada família escolhe os jogos que quer instalar. Este repositório contém apenas a app. Cada jogo tem um repositório independente, e o botão **Instalar** descarrega uma versão revista diretamente desse repositório.

## Contribuir com um jogo

Os jogos são criados a partir do [modelo oficial](https://github.com/Rjcferreira/dinoplay-game-template), publicados no próprio repositório e depois propostos ao registo da app. Comece em [CONTRIBUTING.md](CONTRIBUTING.md) e consulte:

- [Formato e SDK dos jogos](docs/GAME-SPEC.md)
- [Regras de segurança infantil](docs/CHILD-SAFETY.md)
- [Modelo multiplayer obrigatório](docs/MULTIPLAYER.md)
- [Início rápido e kit para programadores](docs/COMMUNITY-QUICKSTART.md)
- [Privacidade para responsáveis](docs/PRIVACY.md)
- [Política de conteúdo comunitário](docs/CONTENT-POLICY.md)
- [Extras pagos e compras parentais](docs/MONETIZATION.md)
- [Esquema do manifesto](games/game.schema.json)

Execute `node scripts/build-remote-catalog.mjs`, `node scripts/validate-catalog.mjs` e `node scripts/audit-remote-games.mjs` antes de enviar a contribuição. O GitHub repete automaticamente estas validações.

## Arquitetura de segurança

- Todos os jogos funcionam num `iframe` isolado, sem acesso direto aos dados da plataforma.
- Recursos remotos, anúncios, rastreadores, chat, compras e autenticação própria são proibidos.
- Cada jogo recebe apenas as capacidades declaradas e aprovadas.
- O armazenamento é separado por jogo e limitado a 256 KB.
- O multiplayer fica bloqueado por predefinição e só funciona com amizades aprovadas pelos dois responsáveis, até cinco jogadores e sem salas públicas.
- No Android, cada jogo instalado fica guardado no diretório privado da app para funcionar offline.
- Contribuições aprovadas aparecem automaticamente no catálogo; jogos instalados recebem novas versões sem reinstalação manual e conservam a versão anterior se o download falhar.

## Jogar e instalar

A versão web está disponível em [DinoPlay](https://rjcferreira.github.io/dinoplay-app/). A aplicação Android para a Google Play usa Capacitor e guarda apenas os jogos escolhidos pela família.

Para preparar o projeto Android, execute `cd mobile`, `npm install` e `npm run sync`. As instruções de compilação e publicação estão em [mobile/README.md](mobile/README.md) e [docs/GOOGLE-PLAY-RELEASE.md](docs/GOOGLE-PLAY-RELEASE.md).
