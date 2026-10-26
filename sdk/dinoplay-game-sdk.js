(()=>{
'use strict';
const VERSION='1.2.0',pending=new Map();let sequence=0,context=null;
function request(action,payload={},timeout=5000){const id=`${Date.now()}-${++sequence}`;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(new Error('DinoPlay host timeout'))},timeout);pending.set(id,{resolve,reject,timer});parent.postMessage({source:'dinoplay-game',version:1,id,action,payload},'*')})}
addEventListener('message',event=>{const data=event.data;if(event.source!==parent||!data||data.source!=='dinoplay-host'||!pending.has(data.id))return;const item=pending.get(data.id);pending.delete(data.id);clearTimeout(item.timer);data.ok?item.resolve(data.value):item.reject(new Error(data.error||'DinoPlay request failed'))});
async function ready(){context=await request('ready');return context}
const storage={get:key=>request('storage:get',{key}),set:(key,value)=>request('storage:set',{key,value}),remove:key=>request('storage:remove',{key})};
const multiplayer={status:()=>request('multiplayer:status'),open:()=>request('multiplayer:open')};
const entitlements={status:()=>request('entitlements:status'),has:id=>request('entitlements:has',{id})};
const content={download:url=>request('content:download',{url},120000),has:url=>request('content:has',{url}),remove:url=>request('content:remove',{url}),getUrl:url=>request('content:url',{url},30000)};
window.DinoPlay=Object.freeze({version:VERSION,ready,close:()=>request('close'),storage,multiplayer,entitlements,content,get language(){return context?.language||'en'},get context(){return context}});
})();
