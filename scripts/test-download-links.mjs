import { readFile } from "node:fs/promises";

const registry = JSON.parse(await readFile(new URL("../games/registry.json", import.meta.url), "utf8"));
const catalog = JSON.parse(await readFile(new URL("../games/catalog.json", import.meta.url), "utf8"));
const platform = await readFile(new URL("../platform.js", import.meta.url), "utf8");
const byRepo = new Map(catalog.games.map((game) => [game.repository.split("/").pop(), game]));

if (!platform.includes('data-${has ? "play" : "install"}="${safeText(id)}"'))
  throw new Error("O botão não transporta o ID exato do jogo");
if (!platform.includes("requestInstall(b.dataset.install)"))
  throw new Error("O botão Instalar não encaminha o ID para o instalador");
if (!platform.includes("sourceAssetUrl(game, asset)"))
  throw new Error("O instalador não usa a origem do repositório selecionado");

for (const item of registry.games) {
  const game = byRepo.get(item.repo);
  if (!game) throw new Error(`${item.repo}: ausente do catálogo`);
  const expectedRepository = `https://github.com/${registry.owner}/${item.repo}`;
  const expectedSource = `https://raw.githubusercontent.com/${registry.owner}/${item.repo}/${item.tag}/`;
  if (game.repository !== expectedRepository) throw new Error(`${game.id}: repositório cruzado`);
  if (game.sourceBase !== expectedSource) throw new Error(`${game.id}: tag/origem cruzada`);
  const response = await fetch(new URL("manifest.json", expectedSource), {
    headers: { "User-Agent": "DinoPlay-Link-Audit" },
  });
  if (!response.ok) throw new Error(`${game.id}: manifesto remoto ${response.status}`);
  const manifest = await response.json();
  if (manifest.id !== game.id || manifest.version !== game.version)
    throw new Error(`${game.id}: manifesto pertence a outro jogo ou versão`);
}

if (byRepo.size !== registry.games.length)
  throw new Error("Existem jogos no catálogo sem entrada única no registo");
console.log(`DinoPlay: ${registry.games.length} botões apontam para os repositórios e versões corretos.`);
