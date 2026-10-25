import {cp,mkdir,readdir,readFile,rm,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=resolve(root,'mobile','www');
const rootFiles=[
  'index.html','about.html','privacy.html','dinoplay-v23.webmanifest','version.json',
  'dinoplay-v23-192.png','dinoplay-v23-512.png','style.css',
  'language.css','game-runtime.css','platform.css','shell.js','platform.js','parental.js','i18n.js',
  'multiplayer-core.js','multiplayer.js','sw.js'
];
const directories=['assets','games','sdk'];
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const file of rootFiles)await cp(resolve(root,file),resolve(output,file));
for(const directory of directories)await cp(resolve(root,directory),resolve(output,directory),{recursive:true});

// Store-listing artwork is kept in the repository but must not increase the installed app.
await rm(resolve(output,'assets','play-store'),{recursive:true,force:true});
await rm(resolve(output,'assets','google-play-feature-graphic.png'),{force:true});
await rm(resolve(output,'assets','google-play-feature-graphic-source.png'),{force:true});

const copied=await readdir(output);
if(!copied.includes('index.html'))throw new Error('index.html não foi copiado');
if(!copied.includes('platform.css'))throw new Error('platform.css não foi copiado');
console.log(`DinoPlay Android: ${copied.length} entradas preparadas em mobile/www.`);
