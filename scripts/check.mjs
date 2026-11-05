import fs from 'node:fs';
import assert from 'node:assert/strict';
import {validate,body,header,sortedPapers,safeURL,escape} from '../assets/render.mjs';
const root=new URL('../',import.meta.url),d=validate(JSON.parse(fs.readFileSync(new URL('content/site.json',root))));
for(const lang of ['it','en'])for(const page of ['home','podcast','conferences']){
 const html=header(lang,page)+body(d,lang,page);
 assert(!html.includes('undefined'));
 for(const [,url] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(/^(https?:|mailto:|#)/.test(url))continue;
  assert(fs.existsSync(new URL(url.split(/[?#]/)[0],root)),`File mancante: ${url}`);
 }
}
assert.equal(sortedPapers(d).length,d.conferences.reduce((n,c)=>n+c.papers.length,0));
assert.equal(safeURL('javascript:alert(1)'),'#');
assert.equal(escape('<script>'),'&lt;script&gt;');
assert.throws(()=>validate({...d,conferences:[{...d.conferences[0],lat:999}]}));
console.log('Dati, rendering IT/EN, collegamenti locali e coordinate validati.');
