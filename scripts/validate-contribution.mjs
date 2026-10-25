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
const repos = registry.games.map((game) => game.repo);
if (new Set(repos).size !== repos.length) throw new Error("Repositório repetido no registo");
if (repos.some((repo) => !/^dinoplay-[a-z0-9-]{3,50}$/.test(repo))) throw new Error("Nome de repositório inválido");
console.log("DinoPlay: contribuição externa limitada ao registo de jogos.");
