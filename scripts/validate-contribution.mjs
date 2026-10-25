import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const base = process.env.BASE_SHA;
const target = process.env.TARGET_SHA || "HEAD";
if (!base) throw new Error("BASE_SHA em falta");
const changed = execFileSync("git", ["diff", "--name-only", `${base}..${target}`], { encoding: "utf8" })
  .trim().split(/\r?\n/).filter(Boolean);
if (!changed.includes("games/registry.json")) {
  console.log("DinoPlay: pull request da plataforma; revisão normal obrigatória.");
  process.exit(0);
}
const allowed = new Set(["games/registry.json", "games/catalog.json"]);
const unexpected = changed.filter((path) => !allowed.has(path));
if (unexpected.length) throw new Error(`Uma contribuição de jogo só pode alterar o registo e catálogo: ${unexpected.join(", ")}`);
const registry = JSON.parse(await readFile("games/registry.json", "utf8"));
const previous = JSON.parse(execFileSync("git", ["show", `${base}:games/registry.json`], { encoding: "utf8" }));
const repos = registry.games.map((game) => game.repo);
if (new Set(repos).size !== repos.length) throw new Error("Repositório repetido no registo");
if (repos.some((repo) => !/^dinoplay-[a-z0-9-]{3,50}$/.test(repo))) throw new Error("Nome de repositório inválido");
if (registry.owner !== previous.owner) throw new Error("O proprietário aprovado do catálogo não pode ser alterado");
const currentByRepo = new Map(registry.games.map((game) => [game.repo, game]));
for (const game of previous.games) {
  const current = currentByRepo.get(game.repo);
  if (!current) throw new Error(`Um jogo aprovado não pode ser removido por contribuição: ${game.repo}`);
  if (JSON.stringify(current) !== JSON.stringify(game))
    throw new Error(`As atualizações de ${game.repo} são publicadas automaticamente por release; não altere a entrada manualmente`);
}
const additions = registry.games.filter((game) => !previous.games.some((old) => old.repo === game.repo));
if (additions.length !== 1) throw new Error("Cada contribuição inicial deve adicionar exatamente um jogo novo");
if (!/^v\d+\.\d+\.\d+$/.test(additions[0].tag)) throw new Error("A primeira versão deve usar uma tag estável vX.Y.Z");
if (!/^\d+(?:\.\d+)? (?:KB|MB)$/.test(additions[0].size)) throw new Error("Tamanho inválido; use por exemplo 8 MB");
console.log(`DinoPlay: primeira versão de ${additions[0].repo} pronta para aprovação manual do responsável.`);
