import test from 'node:test';
import assert from 'node:assert/strict';
import { __test } from '../src/index.js';

test('sanitiza texto externo',()=>assert.equal(__test.safeText('  olá\n  mundo\u0000  '),'olá mundo'));
test('webhook rejeita assinatura inválida',async()=>assert.equal(await __test.verifyGithub('{}','sha256=00','segredo'),false));
test('ferramentas de escrita exigem confirmação no schema',()=>{const tool=__test.toolDefinitions.find(item=>item.name==='publish_announcement');assert.equal(tool.annotations.readOnlyHint,false);assert.ok(tool.inputSchema.required.includes('confirm'))});
test('não expõe ferramentas destrutivas',()=>assert.equal(__test.toolDefinitions.some(tool=>tool.annotations.destructiveHint),false));
