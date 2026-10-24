const required=['DISCORD_APPLICATION_ID','DISCORD_BOT_TOKEN','DISCORD_GUILD_ID'];
const missing=required.filter(name=>!process.env[name]);
if(missing.length){console.error(`Faltam variáveis: ${missing.join(', ')}`);process.exit(1)}
const commands=[{name:'dinoplay',description:'Informação e gestão segura do projeto DinoPlay',type:1,dm_permission:false,options:[{type:1,name:'estado',description:'Mostra o estado atual do projeto'},{type:1,name:'contribuicoes',description:'Lista contribuições abertas'},{type:1,name:'ajuda',description:'Mostra os comandos disponíveis'}]}];
const url=`https://discord.com/api/v10/applications/${process.env.DISCORD_APPLICATION_ID}/guilds/${process.env.DISCORD_GUILD_ID}/commands`;
const response=await fetch(url,{method:'PUT',headers:{authorization:`Bot ${process.env.DISCORD_BOT_TOKEN}`,'content-type':'application/json'},body:JSON.stringify(commands)});
if(!response.ok){console.error(`Discord ${response.status}: ${await response.text()}`);process.exit(1)}
console.log(`Comandos registados no servidor: ${(await response.json()).map(command=>command.name).join(', ')}`);
