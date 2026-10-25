import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile(new URL("../games/catalog.json", import.meta.url), "utf8"));
let checked = 0;
for (const game of catalog.games) {
  const paths = [...new Set([game.entry, game.cover, ...game.assets])];
  for (const path of paths) {
    const url = new URL(path, game.sourceBase);
    const response = await fetch(url, { headers: { "User-Agent": "DinoPlay-Audit" } });
    if (!response.ok) throw new Error(`${game.id}: ${path} devolveu ${response.status}`);
    if (!(await response.arrayBuffer()).byteLength) throw new Error(`${game.id}: ${path} está vazio`);
    checked++;
  }
  const page = await fetch(new URL(game.entry, game.pageBase));
  if (!page.ok) throw new Error(`${game.id}: GitHub Pages devolveu ${page.status}`);
}
console.log(`DinoPlay: ${catalog.games.length} repositórios e ${checked} recursos remotos auditados.`);
