# Mattia Zanotti — sito personale

Sito statico su GitHub Pages, con contenuti IT/EN e materiali originali dell’autore.

**Per aggiornare il sito, parti da [MODIFICARE-IL-SITO.md](MODIFICARE-IL-SITO.md).** La guida contiene esempi per modificare testi, aggiungere pubblicazioni, inserire player e aggiornare conferenze.

## File principali

- `content/site.json`: contenuti ordinari, comprese le schede Bandcamp, YouTube e degli eventi.
- `assets/labels.mjs`: menu, pulsanti e titoli dell’interfaccia in italiano e inglese.
- `assets/render.mjs`: impaginazione, divisa in funzioni commentate.
- `assets/site.mjs`: caricamento, cambio lingua e ricerca.
- `assets/refinements.css`: grafica delle pagine aggiornate e dei player.
- `assets/material-digital.css`: base grafica condivisa, usata anche dal CV.
- `assets/conferenze-map.js`: mappa con cartografia locale, senza API key.
- `scripts/build.mjs`: rigenera l’HTML italiano di riserva.
- `scripts/check.mjs`: controlli su dati, rendering, collegamenti e player.

La pagina degli ascolti è `ascolti.html`. `PODCAST.html` reindirizza alla nuova pagina conservando i vecchi collegamenti. Il podcast esistente rimane presente accanto alla musica e ai video. La pagina `eventi.html` raccoglie festival e progetti culturali.

L’editor non è pubblicato: per scrivere sul repository occorrono l’account GitHub autorizzato e i relativi permessi. Il CV non è stato rielaborato. MAPSEM vive nel repository separato `aittamz/MAPSEM`.
