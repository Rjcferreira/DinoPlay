import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(
  await readFile(resolve(root, "games/registry.json"), "utf8"),
);
const coverDirectory = resolve(root, "assets/game-covers");
await mkdir(coverDirectory, { recursive: true });

async function manifestFor(item) {
  const owner = item.owner || registry.owner;
  const local = resolve(root, "external-repos", item.repo, "manifest.json");
  try {
    const manifest = JSON.parse(await readFile(local, "utf8"));
    if (`v${manifest.version}` === item.tag) return manifest;
  } catch {}
  const url = `https://raw.githubusercontent.com/${owner}/${item.repo}/${item.tag}/manifest.json`;
  const response = await fetch(url, { headers: { "User-Agent": "DinoPlay-Catalog" } });
  if (!response.ok) throw new Error(`${item.repo}: manifesto ${response.status}`);
  return response.json();
}

const games = [];
for (const item of registry.games) {
  const owner = item.owner || registry.owner;
  const manifest = await manifestFor(item);
  const extension = extname(manifest.cover).toLowerCase();
  if (!new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]).has(extension))
    throw new Error(`${item.repo}: formato de capa não permitido`);
  const coverUrl = `https://raw.githubusercontent.com/${owner}/${item.repo}/${item.tag}/${manifest.cover}`;
  const coverResponse = await fetch(coverUrl, { headers: { "User-Agent": "DinoPlay-Catalog-Cover" } });
  if (!coverResponse.ok) throw new Error(`${item.repo}: capa ${coverResponse.status}`);
  const coverBytes = new Uint8Array(await coverResponse.arrayBuffer());
  if (!coverBytes.length || coverBytes.length > 5 * 1024 * 1024)
    throw new Error(`${item.repo}: tamanho de capa inválido`);
  const catalogCoverPath = `assets/game-covers/${manifest.id}${extension}`;
  await writeFile(resolve(root, catalogCoverPath), coverBytes);
  const catalogCover = `${catalogCoverPath}?v=${manifest.version}`;
  games.push({
    ...manifest,
    runtime: "sandbox",
    size: item.size,
    catalogCover,
    repository: `https://github.com/${owner}/${item.repo}`,
    sourceBase: `https://raw.githubusercontent.com/${owner}/${item.repo}/${item.tag}/`,
    pageBase: `https://${owner.toLowerCase()}.github.io/${item.repo}/`,
  });
}

await writeFile(
  resolve(root, "games/catalog.json"),
  `${JSON.stringify({ catalogVersion: 2, games }, null, 2)}\n`,
);
console.log(`DinoPlay: catálogo remoto criado com ${games.length} jogos.`);
