import assert from 'node:assert/strict';
import { searchAtlas, normalizeText } from '../src/app/lib/chatbot/searchAtlas.js';
import { getEntries } from '../src/app/lib/editorial/registry.js';
import { isSameOrigin } from '../src/app/lib/account/request.js';
const all=searchAtlas('semilla',{limit:50}).results;
assert.ok(all.length>0);
const category=searchAtlas('semilla',{categoryId:'germinacion',limit:50}).results;
assert.ok(category.length>0);assert.ok(category.every(result=>result.categoryId==='germinacion'));
const provincial=searchAtlas('heladas',{provinceId:'cordoba',limit:50}).results;
assert.ok(provincial.length>0);
for(const result of provincial) {const entry=getEntries().find(entry=>entry.id===result.entryId);assert.ok(normalizeText(JSON.stringify(entry)).includes('cordoba'));}
assert.equal(searchAtlas('heladas',{provinceId:'invalida'}).results.length,0);
assert.ok(searchAtlas('semilla',{limit:1}).results.length<=1);
assert.ok(isSameOrigin(new Request('http://localhost:3001/api/aportes',{headers:{host:'127.0.0.1:3001',origin:'http://127.0.0.1:3001'}})));
assert.ok(!isSameOrigin(new Request('https://atlas.example/api/aportes',{headers:{host:'atlas.example',origin:'https://evil.example'}})));
assert.ok(!isSameOrigin(new Request('https://atlas.example/api/aportes')));
console.log('PASS: public search category/province filters, limits and same-origin checks.');
