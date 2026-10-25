# Especificação de jogos DinoPlay

Cada jogo é um repositório independente e contém `manifest.json`, `index.html`, capa, licença, documentação, SDK e todos os recursos locais.

O manifesto declara `id`, `name`, `version`, `entry`, `category`, `age`, `cover`, `description`, `offline`, `multiplayer`, `permissions`, `languages`, `assets`, `license` e `author`. Caminhos absolutos, `..`, CDNs e ficheiros não declarados são rejeitados.

O catálogo da app acrescenta, após revisão:

- `repository`: repositório público aprovado;
- `sourceBase`: tag imutável usada no download;
- `pageBase`: execução web isolada;
- `size`: tamanho apresentado aos responsáveis.

No Android os recursos são guardados no diretório privado da app. Na Web são descarregados para uma cache isolada por jogo e versão. O jogo comunica com a plataforma exclusivamente por mensagens do SDK, sem acesso ao PIN, amizades ou dados de outros jogos.
