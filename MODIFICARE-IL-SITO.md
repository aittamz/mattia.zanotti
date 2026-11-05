# Come modificare il sito

Questa guida riguarda home, ascolti e conferenze. Il CV è separato e non è stato rielaborato.

## Partire da GitHub

1. Apri il file da modificare nel repository `aittamz/mattia.zanotti`.
2. Premi la matita **Edit this file**. Devi essere collegato con il tuo account GitHub.
3. Modifica i campi desiderati e premi **Commit changes**.
4. Attendi che la pubblicazione in **Actions** termini con la spunta verde, quindi ricarica il sito.

Per correggere un errore puoi aprire **History**, visualizzare la versione precedente e recuperare il testo. Non serve un abbonamento a pagamento per modificare questo sito.

## Quale file aprire

| Voglio cambiare…                                                                                     | File                     |
| ---------------------------------------------------------------------------------------------------- | ------------------------ |
| Presentazione, notizia in evidenza, pubblicazioni, progetti, podcast, ascolti, conferenze e contatti | `content/site.json`      |
| Nomi nel menu, titoli delle sezioni e pulsanti IT/EN                                                 | `assets/labels.mjs`      |
| Aspetto delle pagine aggiornate e dei player                                                         | `assets/refinements.css` |
| Struttura delle pagine                                                                               | `assets/render.mjs`      |
| Comportamento del selettore di lingua e della ricerca                                                | `assets/site.mjs`        |

Non cambiare a mano `index.html`, `ascolti.html` e `mappa-conferenze.html`: contengono una versione italiana di riserva generata dai dati. Le modifiche ordinarie nel JSON vengono caricate dal sito senza altri comandi. `PODCAST.html` rimanda ad `ascolti.html` per conservare i vecchi link.

## Come leggere il file dei contenuti

`content/site.json` è diviso in sezioni:

- `home`: testi della homepage; `news` vuoto nasconde la notizia in evidenza.
- `publications`: pubblicazioni, nell’ordine in cui devono comparire.
- `projects`: progetti, nello stesso ordine della homepage.
- `podcasts`: serie podcast con titolo, descrizione e link.
- `listening`: player Bandcamp e YouTube.
- `conferences`: città, coordinate e interventi; alimentano mappa ed elenco insieme.
- `links`: contatti.

I campi con `it` ed `en` contengono le due lingue. I titoli di opere e interventi restano nella lingua originale.

Il JSON non ammette commenti: ecco perché le istruzioni sono qui. Mantieni virgolette doppie, parentesi e virgole. Scrivi `\n` per andare a capo dentro una frase. Se una frase contiene virgolette doppie, scrivile come `\"`.

## Cambiare una frase

Cerca la frase attuale e modifica solo il testo tra le virgolette:

```json
"kicker": {
  "it": "Musica, media, piattaforme\ne le culture che li attraversano.",
  "en": "Music, media, platforms\nand the cultures that connect them."
}
```

## Aggiungere una pubblicazione

Dentro `publications`, duplica un oggetto esistente. Tra due oggetti va una virgola. L’ultimo oggetto non ha una virgola dopo la parentesi finale.

```json
{
  "title": "Titolo originale della pubblicazione",
  "meta": "2026 · Rivista o volume · pagine",
  "tag": {
    "it": "articolo · open access",
    "en": "article · open access"
  },
  "url": "https://doi.org/INSERISCI-IL-DOI"
}
```

## Aggiungere un album Bandcamp

Dentro `listening`, duplica una scheda Bandcamp e cambia titolo, metadati, link e `albumId`.

L’ID numerico si trova nel codice fornito da Bandcamp: **Share/Embed → Embed this album**, nel pezzo `album=…`. Non usare il titolo dell’album come ID e non incollare tutto l’iframe nel JSON.

Questa è la scheda reale già presente:

```json
{
  "type": "bandcamp",
  "title": "Tutto lascia traccia",
  "meta": {
    "it": "di noi stessi e altri mondi · Album · 2024",
    "en": "di noi stessi e altri mondi · Album · 2024"
  },
  "url": "https://dinoistessiealtrimondi.bandcamp.com/album/tutto-lascia-traccia",
  "albumId": "746872014"
}
```

## Aggiungere una playlist YouTube

Dentro `listening`, duplica una scheda YouTube. L’ID è il valore dopo `list=` nel link della playlist. Il parametro di condivisione `si=` non serve.

Questa è la scheda reale già presente:

```json
{
  "type": "youtube-playlist",
  "title": "Samples",
  "meta": {
    "it": "Playlist YouTube",
    "en": "YouTube playlist"
  },
  "url": "https://www.youtube.com/playlist?list=PL5mbVOrAf0mWJyvLdg-9pRJZgqVHs3S-E",
  "playlistId": "PL5mbVOrAf0mWJyvLdg-9pRJZgqVHs3S-E"
}
```

L’ordine delle schede nel file è l’ordine nella pagina. I player non avviano la riproduzione automaticamente. L’incorporamento dipende anche dalle impostazioni dei contenuti sulle piattaforme.

## Aggiungere un intervento

Dentro `conferences`, trova la città e aggiungi un oggetto dentro il relativo `papers`. Se la città non esiste, duplica prima un intero oggetto città e modifica coordinate, nome e paese.

```json
{
  "title": "Titolo originale dell’intervento",
  "conf": {
    "it": "Nome del convegno",
    "en": "Conference name"
  },
  "year": {
    "it": "Nov 2026",
    "en": "Nov 2026"
  }
}
```

Date italiane: `Gen`, `Feb`, `Mar`, `Apr`, `Mag`, `Giu`, `Lug`, `Ago`, `Set`, `Ott`, `Nov`, `Dic`, seguite da spazio e anno. Il paese va scritto sempre nello stesso modo per ottenere un conteggio corretto.

## Per lavorare anche sul codice

Le funzioni principali di `render.mjs` sono commentate:

- `header` e `footer`: navigazione e contatti comuni.
- `renderHome`: homepage.
- `renderListening`: ascolti e podcast.
- `renderListeningCards`: schede e player.
- `renderConferences`: elenco degli interventi.
- `playerURL`: costruisce gli indirizzi dei player da ID validi.
- `validate`: controlla i dati.

Se hai Node.js e una copia del repository sul computer:

```bash
node scripts/build.mjs
node scripts/check.mjs
```

Il primo comando aggiorna anche l’HTML di riserva. Il secondo controlla dati, link locali e player. Non occorre installare librerie per eseguire questi due comandi.

## Privacy dell’editor

Non è pubblicato un editor sul sito e non sono inserite password nel codice. Le modifiche sul repository richiedono il tuo account GitHub e i permessi di scrittura.

## Aggiornare gli eventi

La pagina `eventi.html` legge l’elenco `events` nello stesso file dei contenuti.
Ogni scheda ha `title`, `description` IT/EN e `url`. I campi `period` e `role`
IT/EN sono facoltativi: se non sono presenti, la pagina non li mostra. Inseriscili
solo quando ruoli e date sono confermati. Per ora sono compilati per indiEalet
Music Festival (2015–2019).

```json
{
  "title": "Nome del progetto",
  "period": "2015–2019",
  "role": {
    "it": "Direzione artistica e organizzativa",
    "en": "Artistic and organizational direction"
  },
  "description": {
    "it": "Una breve descrizione del progetto.",
    "en": "A short description of the project."
  },
  "url": "https://www.facebook.com/PAGINA-DEL-PROGETTO"
}
```
