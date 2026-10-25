import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(
  await readFile(resolve(root, "games/registry.json"), "utf8"),
);

async function manifestFor(item) {
  const local = resolve(root, "external-repos", item.repo, "manifest.json");
  try {
    return JSON.parse(await readFile(local, "utf8"));
  } catch {
    const url = `https://raw.githubusercontent.com/${registry.owner}/${item.repo}/${item.tag}/manifest.json`;
    const response = await fetch(url, { headers: { "User-Agent": "DinoPlay-Catalog" } });
    if (!response.ok) throw new Error(`${item.repo}: manifesto ${response.status}`);
    return response.json();
  }
}

const games = [];
for (const item of registry.games) {
  const manifest = await manifestFor(item);
  games.push({
    ...manifest,
    runtime: "sandbox",
    size: item.size,
    repository: `https://github.com/${registry.owner}/${item.repo}`,
    sourceBase: `https://raw.githubusercontent.com/${registry.owner}/${item.repo}/${item.tag}/`,
    pageBase: `https://${registry.owner.toLowerCase()}.github.io/${item.repo}/`,
  });
}

await writeFile(
  resolve(root, "games/catalog.json"),
  `${JSON.stringify({ catalogVersion: 2, games }, null, 2)}\n`,
);
console.log(`DinoPlay: catálogo remoto criado com ${games.length} jogos.`);
