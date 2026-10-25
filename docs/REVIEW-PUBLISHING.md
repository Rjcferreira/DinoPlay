# Revisão e publicação de contribuições

## Estados oficiais

1. **Primeira versão validada** — os testes automáticos passaram. Ainda não é aprovação.
2. **Primeira versão aprovada** — o responsável verificou código, conteúdo, licenças, segurança e funcionamento e integrou o repositório no catálogo.
3. **Atualização automática** — após essa aprovação inicial, uma release estável mais recente é detetada, testada e publicada automaticamente. Uma falha em qualquer teste mantém a versão anterior.
4. **Publicado** — o GitHub Pages terminou com sucesso e o manifesto aparece no catálogo público.

Um pull request aberto, com conflitos ou apenas com visto verde não está disponível na app.

## Revisão do mantenedor

O mantenedor confirma:

- alterações limitadas aos caminhos permitidos;
- manifesto, catálogo e lista de recursos coerentes;
- ausência de rede externa, telemetria, publicidade e recolha de dados;
- licenças e autoria de todos os recursos;
- interface adequada à idade e sem padrões manipuladores;
- funcionamento offline, suspensão correta e consumo razoável;
- armazenamento apenas através do SDK;
- multiplayer exclusivamente pela plataforma e sujeito ao controlo parental;
- testes em Android/PWA e ausência de erros graves.

## Integração segura

Nunca se devem aceitar alterações a `platform.js`, `sw.js`, `shell.js` ou `index.html` vindas de uma contribuição de jogo. O jogo deve viver no próprio repositório; o pull request da biblioteca altera apenas `games/registry.json` e o catálogo gerado.

Após a primeira integração, confirme que a ação de publicação terminou, que o manifesto responde no endereço público e que o número de jogos do catálogo aumentou. As atualizações posteriores não alteram manualmente o registo: a ação `Atualizar jogos aprovados` aceita apenas versões superiores e preserva a identidade do jogo.

Alterações materiais de permissões, recolha de dados, multiplayer, monetização ou idade não devem ser tratadas como atualização normal e exigem revisão humana. Os responsáveis podem denunciar qualquer jogo diretamente na Área dos Pais; o relatório não inclui identidade da criança nem dados do dispositivo.
