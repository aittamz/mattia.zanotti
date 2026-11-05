// Facoltativo: aggiorna anche la versione HTML leggibile senza JavaScript.
import fs from "node:fs";
import { header, body, footer, validate, escape } from "../assets/render.mjs";
const d = validate(
  JSON.parse(fs.readFileSync(new URL("../content/site.json", import.meta.url))),
);
for (const [file, page, title] of [
  ["index.html", "home", "Musica, media, piattaforme"],
  ["ascolti.html", "listening", "Cose da ascoltare"],
  ["eventi.html", "events", "Eventi e progetti culturali"],
  ["mappa-conferenze.html", "conferences", "Conferenze"],
]) {
  const map = page === "home" || page === "conferences";
  fs.writeFileSync(
    new URL("../" + file, import.meta.url),
    `<!DOCTYPE html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} — Mattia Zanotti</title><meta name="description" content="${escape(page === "home" ? d.home.intro.it : page === "listening" ? "Musica, podcast e video. Progetti da ascoltare e da guardare." : page === "events" ? "Festival, concerti e progetti culturali di Mattia Zanotti." : "Conferenze e presentazioni di Mattia Zanotti.")}"><meta name="author" content="Mattia Zanotti">${map ? '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">' : ""}<link rel="stylesheet" href="assets/material-digital.css?v=5"><link rel="stylesheet" href="assets/refinements.css?v=5"></head>
<body class="${page === "home" ? "" : "subpage"}" data-page="${page}"><div class="site-wrapper" data-design="material-digital"><div id="site-header">${header("it", page)}</div><main id="contenuti">${body(d, "it", page)}</main><div id="site-footer">${footer(d, "it")}</div></div><noscript><p class="preview-banner">Per cambiare lingua e usare la mappa, attiva JavaScript. / Enable JavaScript to change language and use the map.</p></noscript>${map ? '<script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script defer src="assets/conferenze-map.js?v=5"></script>' : ""}<script type="module" src="assets/site.mjs?v=5"></script></body></html>\n`,
  );
}
console.log("Home, ascolti, eventi e conferenze aggiornati. CV invariato.");
