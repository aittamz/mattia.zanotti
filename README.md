# Mattia Zanotti — sito personale

Sito statico su GitHub Pages. Nessun servizio a pagamento, database o compilazione necessaria per gli aggiornamenti ordinari.

## Aggiornare senza modificare HTML

1. Apri [Aggiorna i contenuti](https://aittamz.github.io/mattia.zanotti/editor.html), anche dal fondo del sito.
2. Scegli Home, Pubblicazioni, Progetti, Podcast, Conferenze oppure Contatti e link.
3. Scrivi nei campi IT/EN. Aggiungi, rimuovi o riordina le voci con i pulsanti. Le conferenze sono raggruppate per città: aggiungi gli interventi dentro la città corrispondente. Mappa, elenco e conteggi usano gli stessi dati.
4. Controlla con **Anteprima**: è una bozza locale, non una pubblicazione.
5. Premi **Copia il file aggiornato**, poi **Apri il file su GitHub**. Accedi al tuo account, seleziona tutto il contenuto del file, incolla e premi **Commit changes**.
6. Attendi la pubblicazione di GitHub Pages e ricarica il sito.

**Scarica site.json** conserva una copia. **Importa** riprende una copia. Il salvataggio della bozza vale solo per il browser usato: cancellare i dati di navigazione può rimuoverla. Il pubblico non può modificare il sito usando l’editor: occorrono i permessi GitHub per pubblicare.

I titoli di pubblicazioni, interventi e podcast restano nella lingua originale. Le descrizioni e l’interfaccia sono bilingui. Per la data degli interventi usa tre lettere e anno: `Gen 2026` / `Jan 2026`. Le coordinate sono numeri decimali; il paese va scritto in modo uniforme per un conteggio corretto.

## CV

`cv.html` è rimasto invariato. Ha il proprio sistema IT/EN e condivide la preferenza `mz-lang`. La rielaborazione del CV richiede accordo con Mattia; non è inclusa nell’editor.

## Struttura per chi sviluppa

- `content/site.json`: unica fonte dei contenuti ordinari.
- `assets/render.mjs`: componenti, testi di interfaccia IT/EN e validazione.
- `assets/site.mjs`: lingua, caricamento dei contenuti e ricerca.
- `assets/editor.mjs` e `editor.html`: editor senza credenziali e anteprima locale.
- `assets/material-digital.css`: grafica precedente, usata anche dal CV.
- `assets/refinements.css`: raffinamenti delle pagine aggiornate e dell’editor.
- `assets/conferenze-map.js`: mappa con cartografia locale Natural Earth, senza API key. Leaflet è caricato da CDN; l’elenco testuale funziona anche se la libreria non arriva.
- `assets/sources/`: materiali originali dell’autore.

Le pagine HTML includono una versione italiana leggibile anche senza JavaScript. Dopo modifiche ai contenuti, `node scripts/build.mjs` aggiorna questa versione di riserva; il sito con JavaScript legge subito il JSON aggiornato e non richiede questo comando. Per un controllo locale: `node scripts/check.mjs`.

MAPSEM vive nel repository separato `aittamz/MAPSEM`. La preferenza IT/EN è condivisa e viene passata anche nel link.
