import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = resolve(root, "games/registry.json");
const catalogPath = resolve(root, "games/catalog.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const approvedByRepo = new Map(
  catalog.games.map((game) => [game.repository.replace("https://github.com/", "").toLowerCase(), game]),
);
const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "DinoPlay-Automatic-Game-Updates",
  ...(process.env.GITHUB_TOKEN
    ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

const semver = (value) => {
  const match = String(value).match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  return match ? match.slice(1).map(Number) : null;
};
const newer = (candidate, current) => {
  const a = semver(candidate), b = semver(current);
  if (!a || !b) return false;
  return a.some((part, index) => part !== b[index] &&
    a.slice(0, index).every((value, i) => value === b[i]) && part > b[index]);
};
async function githubJson(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`${path}: GitHub ${response.status}`);
  return response.json();
}
async function latestStableTag(owner, repo) {
  try {
    const release = await githubJson(`/repos/${owner}/${repo}/releases/latest`);
    if (!release.draft && !release.prerelease && semver(release.tag_name)) return release.tag_name;
  } catch (error) {
    if (!String(error.message).includes("GitHub 404")) throw error;
  }
  const tags = await githubJson(`/repos/${owner}/${repo}/tags?per_page=100`);
  return tags.map((item) => item.name).filter(semver).sort((a, b) => {
    const av = semver(a), bv = semver(b);
    for (let i = 0; i < 3; i++) if (av[i] !== bv[i]) return bv[i] - av[i];
    return 0;
  })[0] || null;
}
async function manifestAt(owner, repo, tag) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${tag}/manifest.json`;
  const response = await fetch(url, { headers: { "user-agent": headers["user-agent"] } });
  if (!response.ok) throw new Error(`${repo}@${tag}: manifesto ${response.status}`);
  return response.json();
}

let changed = 0;
for (const item of registry.games) {
  const owner = item.owner || registry.owner;
  const approved = approvedByRepo.get(`${owner}/${item.repo}`.toLowerCase());
  if (!approved) throw new Error(`${item.repo}: não existe no catálogo aprovado`);
  const latest = await latestStableTag(owner, item.repo);
  if (!latest || !newer(latest, approved.version)) continue;
  const manifest = await manifestAt(owner, item.repo, latest);
  const expectedVersion = latest.replace(/^v/, "");
  if (manifest.id !== approved.id)
    throw new Error(`${item.repo}@${latest}: o id do jogo aprovado foi alterado`);
  if (manifest.version !== expectedVersion)
    throw new Error(`${item.repo}@${latest}: versão do manifesto não corresponde à tag`);
  for (const field of ["age", "category", "author", "license", "multiplayer", "permissions"]) {
    if (JSON.stringify(manifest[field] ?? null) !== JSON.stringify(approved[field] ?? null))
      throw new Error(`${item.repo}@${latest}: ${field} é uma alteração material e exige revisão humana`);
  }
  item.tag = latest;
  changed++;
  console.log(`${item.repo}: ${approved.version} -> ${manifest.version}`);
}

if (changed) await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`DinoPlay: ${changed} atualização(ões) aprovada(s) automaticamente.`);
