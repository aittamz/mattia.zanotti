// Facoltativo: aggiorna anche la versione HTML leggibile senza JavaScript.
import fs from 'node:fs';
import {header,body,footer,validate,escape} from '../assets/render.mjs';
const d=validate(JSON.parse(fs.readFileSync(new URL('../content/site.json',import.meta.url))));
for(const [file,page,title] of [['index.html','home','Musica, media, piattaforme'],['PODCAST.html','podcast','Podcast'],['mappa-conferenze.html','conferences','Conferenze']]){
 const map=page!=='podcast';
 fs.writeFileSync(new URL('../'+file,import.meta.url),`<!DOCTYPE html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} — Mattia Zanotti</title><meta name="description" content="${escape(d.home.intro.it)}"><meta name="author" content="Mattia Zanotti">${map?'<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">':''}<link rel="stylesheet" href="assets/material-digital.css?v=3"><link rel="stylesheet" href="assets/refinements.css?v=3"></head>
<body class="${page==='home'?'':'subpage'}" data-page="${page}"><div class="site-wrapper" data-design="material-digital"><div id="site-header">${header('it',page)}</div><main id="contenuti">${body(d,'it',page)}</main><div id="site-footer">${footer(d,'it')}</div></div><noscript><p class="preview-banner">Per cambiare lingua e usare la mappa, attiva JavaScript. / Enable JavaScript to change language and use the map.</p></noscript>${map?'<script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script defer src="assets/conferenze-map.js?v=3"></script>':''}<script type="module" src="assets/site.mjs?v=3"></script></body></html>\n`);
}
console.log('Home, podcast e conferenze aggiornati. CV invariato.');
