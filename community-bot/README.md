# DinoPlay Community Bot

Serviço privado que liga Discord, GitHub e o plugin MCP DinoPlay. Não recebe nem trata dados de crianças.

## Endpoints

- `GET /health` — estado sem revelar segredos.
- `POST /discord/interactions` — interações assinadas do Discord.
- `POST /github/webhook` — eventos assinados da GitHub App.
- `POST /mcp` — ferramentas autenticadas para Codex/ChatGPT.

## Segredos Cloudflare

Nunca guardar tokens no Git. Configurar com `npx wrangler secret put NOME`:

`DISCORD_APPLICATION_ID`, `DISCORD_PUBLIC_KEY`, `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, `DISCORD_CHANNEL_ID`, `GITHUB_APP_ID`, `GITHUB_INSTALLATION_ID`, `GITHUB_PRIVATE_KEY`, `GITHUB_WEBHOOK_SECRET` e `MCP_BEARER_TOKEN`.

O namespace KV opcional `AUDIT` guarda 90 dias de auditoria. Sem ele, a auditoria continua disponível nos logs do Worker.

## Segurança

- O token Discord e a chave privada GitHub existem apenas como segredos do Worker.
- Todas as mensagens usam `allowed_mentions: { parse: [] }`.
- Webhooks são verificados antes de processar o conteúdo.
- O MCP usa um bearer token independente.
- Publicar anúncios exige confirmação explícita.
- A GitHub App deve ter acesso apenas ao repositório DinoPlay.
