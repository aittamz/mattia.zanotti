/**
 * Schede della tesi e riferimenti all'archivio GitHub.
 * Ogni scheda indica le pagine stampate nella tesi e i materiali che può aprire.
 */
import { mountSpotifyNetworks, renderNetworks } from "./thesis-networks.mjs?v=1";

// Fissa le revisioni: Sanremo conserva il riferimento bibliografico del capitolo 6.
const repository = "https://github.com/aittamz/INTERMEDIALITA_METODI_DIGITALI_IMMAGINARI_MUSICALI";
const current = "3b82cab0e0e2d5c039ff9250dc51e9e883fe7b76";
const cited = "1202682c4a8670b83ca70eac078546037d085f85";
const italo = "CAPITOLO_5/IMS_ITALO_DISCO";
const sanremo = "CAPITOLO_6/SANREMO_24";
const cases = "CAPITOLO_6/CASE STUDIES_Mango_LA NOIA_Mahmood_TUTA GOLD";
const altz = "CONCLUSIONI";
const encoded = (path) => path.split("/").map(encodeURIComponent).join("/");
const file = (path, revision = current) => `${repository}/blob/${revision}/${encoded(path)}`;
const folder = (path, revision = current) => `${repository}/tree/${revision}/${encoded(path)}`;
const raw = (path) => `${repository.replace("github.com", "raw.githubusercontent.com")}/${current}/${encoded(path)}`;
const thesis = "https://hdl.handle.net/11571/1524656";

export const thesisTitle = { it: "Tesi e dati", en: "Dissertation and data" };
export const thesisIntro = {
  it: "Come Spotify, TikTok e YouTube mediano la popular music? La tesi propone il concetto di micromaterialità per studiare le interazioni tra elementi tecnologici, sociali e culturali. Usa i metodi digitali per indagare la rimediazione di Sanremo 2024 e la formazione di immaginari musicali sociotecnici.",
  en: "How do Spotify, TikTok and YouTube mediate popular music? The dissertation proposes the concept of micromateriality to examine interactions among technological, social and cultural elements. It uses digital methods to investigate the remediation of Sanremo 2024 and the formation of sociotechnical musical imaginaries.",
};

// In ogni coppia di testi, l'italiano precede l'inglese.
const sections = [
  {
    id: "trap",
    title: ["Trap", "Trap"],
    ref: ["Cap. 5 · pp. 151–161 · figg. 5.1–5.3", "Ch. 5 · pp. 151–161 · figs. 5.1–5.3"],
    description: [
      "I co-hashtag di #trap su TikTok e le associazioni tra artisti a partire da Sfera Ebbasta su Spotify. La tabella conta una sola occorrenza di ciascun co-hashtag per post che contiene #trap.",
      "TikTok co-hashtags for #trap and Spotify artist associations starting from Sfera Ebbasta. The table counts each co-hashtag once per post containing #trap.",
    ],
    tables: ["trap"],
    links: [["Rete Spotify di Sfera Ebbasta", "Sfera Ebbasta’s Spotify network", file("CAPITOLO_5/IMS_TRAP/Sfera_ebbasta_SAN.gdf")]],
  },
  {
    id: "italo-disco",
    title: ["Italo disco", "Italo disco"],
    ref: ["Cap. 5 · pp. 161–176 · figg. 5.12–5.16", "Ch. 5 · pp. 161–176 · figs. 5.12–5.16"],
    description: [
      "Il confronto tra la playlist The Sound of Italo Disco e il repertorio di italodisco.net individua 36 nomi in comune. Puoi cercarli nella lista Spotify e consultare a parte la lista del sito.",
      "The comparison between The Sound of Italo Disco playlist and the italodisco.net repertoire identifies 36 names in common. You can find them in the Spotify list and browse the website’s list separately.",
    ],
    tables: ["italo", "italo-source"],
    links: [
      ["CSV del confronto", "Comparison CSV", file(italo + "/ITALO DISCO_Spotify_Italodisco.net.csv")],
      ["Rete dei Righeira (Gephi)", "Righeira network (Gephi)", file(italo + "/RIGHEIRA_SAN.gephi")],
    ],
    image: [italo + "/SPOTIFY VS ITALODISCO.png", "Grafico del confronto tra le due liste", "Chart comparing the two lists"],
  },
  {
    id: "sanremo",
    title: ["Sanremo 2024", "Sanremo 2024"],
    ref: ["Cap. 6 · pp. 181–220 · figg. 6.1–6.23", "Ch. 6 · pp. 181–220 · figs. 6.1–6.23"],
    description: [
      "Esplora stream Spotify e visualizzazioni YouTube dei 30 brani in gara. Le due rilevazioni di «Sanremo 2024» conservano l’ordine della playlist al momento della raccolta.",
      "Explore Spotify streams and YouTube views for the 30 competition entries. Each snapshot of the “Sanremo 2024” playlist retains its order at the time of collection.",
    ],
    tables: ["festival", "sanremo-pre", "sanremo-post"],
    links: [
      ["Dati SIAE e progetti Gephi", "SIAE data and Gephi projects", folder(sanremo + "/SANREMO_generale", cited)],
      ["Playlist Spotify", "Spotify playlists", folder(sanremo + "/SANREMO_Spotify", cited)],
      ["Reti Spotify pre e post", "Pre- and post-festival Spotify networks", folder(sanremo + "/Spotify_Artist_Network_SAN", cited)],
      ["Reti YouTube", "YouTube networks", folder(sanremo + "/SANREMO_analisi_YT", cited)],
    ],
    note: [
      "Nel deposito citato nella tesi, i file pre e post di «Giovani Scoperte» e «La Voce delle Donne» coincidono a coppie. Le tabelle qui sopra riguardano la playlist «Sanremo 2024».",
      "In the archive version cited in the dissertation, the pre- and post-festival files for “Giovani Scoperte” and “La Voce delle Donne” are identical within each pair. The tables above cover the “Sanremo 2024” playlist.",
    ],
  },
  {
    id: "casi",
    title: ["«La noia» e «Tuta Gold»", "“La noia” and “Tuta Gold”"],
    ref: ["Cap. 6 · da p. 221 · figg. 6.24–6.34", "Ch. 6 · from p. 221 · figs. 6.24–6.34"],
    description: [
      "Le visualizzazioni mettono in relazione il lessico dei commenti YouTube e gli hashtag associati ai brani su TikTok. Sul sito sono consultabili le visualizzazioni aggregate.",
      "Visualisations cover the vocabulary in YouTube comments and the TikTok hashtags associated with the tracks. Aggregate visualisations are available here.",
    ],
    links: [
      ["La noia · co-hashtag TikTok", "La noia · TikTok co-hashtags", file(cases + "/TikTok_TT/LA NOIA_mango_ COHASHTAG_TT.png")],
      ["Tuta Gold · co-hashtag TikTok", "Tuta Gold · TikTok co-hashtags", file(cases + "/TikTok_TT/TUTA GOLD_Mahmood_CoHashtag_TT.png")],
      ["Tuta Gold · nuvola di parole", "Tuta Gold · word cloud", file(cases + "/YouTube_YT/mahmood cirrus.svg")],
    ],
    image: [cases + "/YouTube_YT/Mango_cirrus.png", "Nuvola di parole dei commenti a La noia su YouTube", "Word cloud of YouTube comments on La noia"],
  },
  {
    id: "alt-z",
    title: ["Alt Z", "Alt Z"],
    ref: ["Conclusioni · da p. 237 · figg. 7.3–7.7", "Conclusion · from p. 237 · figs. 7.3–7.7"],
    description: [
      "Le playlist Intro to Alt Z e The Sound of Alt Z mettono a disposizione brani, artisti e generi per confrontare l’uso dell’etichetta su Spotify. Completano il caso la rete di Nessa Barrett e i co-hashtag di #altzmusic.",
      "The Intro to Alt Z and The Sound of Alt Z playlists provide tracks, artists and genres for comparing the label’s use on Spotify. The Nessa Barrett network and #altzmusic co-hashtags extend the case study.",
    ],
    tables: ["altz-intro", "altz-sound"],
    links: [
      ["Rete Spotify di Nessa Barrett", "Nessa Barrett’s Spotify network", file(altz + "/Nessa_Barrett_SAN.gdf")],
      ["Rete TikTok #altzmusic (Gephi)", "TikTok #altzmusic network (Gephi)", file(altz + "/ALTZ_ COHASHTAG_TT.gephi")],
      ["CSV di Intro to Alt Z", "Intro to Alt Z CSV", file(altz + "/Intro to Alt Z_SPOTIFY_playlist.csv")],
      ["CSV di The Sound of Alt Z", "The Sound of Alt Z CSV", file(altz + "/The Sound of Alt Z_SPOTIFY_playlist.csv")],
      ["Grafici delle playlist", "Playlist charts", folder(altz + "/Spotigem_analisi_CONFRONTI")],
    ],
  },
];

// Lo schema è condiviso da tutte le playlist, che hanno le stesse colonne selezionate.
const trackColumns = [["Brano", "Track"], ["Artista", "Artist"], ["Generi", "Genres"]];
const tables = {
  trap: [["Co-hashtag di #trap", "#trap co-hashtags"], [["Hashtag", "Hashtag"], ["Post", "Posts"]]],
  italo: [["Artisti nella playlist Spotify", "Artists in the Spotify playlist"], [["Artista", "Artist"], ["Su italodisco.net", "On italodisco.net"]]],
  "italo-source": [["Artisti nella lista italodisco.net", "Artists in the italodisco.net list"], [["Artista", "Artist"]]],
  festival: [["I 30 brani in gara", "The 30 competition entries"], [["Brano", "Track"], ["Stream Spotify", "Spotify streams"], ["Visualizzazioni YouTube", "YouTube views"]]],
  "sanremo-pre": [["Playlist Sanremo 2024 · prima", "Sanremo 2024 playlist · before"], trackColumns],
  "sanremo-post": [["Playlist Sanremo 2024 · dopo", "Sanremo 2024 playlist · after"], trackColumns],
  "altz-intro": [["Intro to Alt Z", "Intro to Alt Z"], trackColumns],
  "altz-sound": [["The Sound of Alt Z", "The Sound of Alt Z"], trackColumns],
};

// Le tabelle si caricano solo all'apertura del pannello. I link restano disponibili anche senza JavaScript.
export function renderThesis(lang) {
  const en = lang === "en";
  const t = (pair) => pair[Number(en)];
  return `<article class="thesis-page">
    <header class="thesis-hero">
      <p class="thesis-meta">${t(["Dottorato · Università di Pavia · 2025", "PhD · University of Pavia · 2025"])}</p>
      <h1>${thesisTitle[lang]}</h1>
      <p class="thesis-title" lang="it">Processi di piattaformizzazione nella produzione intermediale della popular music: micromaterialità, metodi digitali e immaginari musicali</p>
      <p>${thesisIntro[lang]}</p>
      <p>${t([
        "Il capitolo 4 presenta gli strumenti e i criteri di raccolta. Nei capitoli 5 e 6 e nelle conclusioni, playlist, tag di genere, reti di ascolto, commenti e hashtag diventano tracce di mediazioni diverse. Le schede qui sotto indicano, caso per caso, che cosa misura ciascuna rete.",
        "Chapter 4 explains the tools and collection criteria. In Chapters 5 and 6 and the conclusion, playlists, genre tags, listening networks, comments and hashtags become traces of different forms of mediation. The sections below explain what each network measures.",
      ])}</p>
      <p class="thesis-links"><a href="${thesis}">${t(["Leggi la tesi su IRIS ↗", "Read the dissertation on IRIS ↗"])}</a>
        <a href="#dati">${t(["Esplora i dati ↓", "Explore the data ↓"])}</a>
        <a href="${repository}">${t(["Archivio GitHub ↗", "GitHub archive ↗"])}</a></p>
    </header>
    <nav class="thesis-index" aria-label="${t(["Casi di studio", "Case studies"])}">
      ${sections.map(({ id, title }) => `<a href="#${id}">${t(title)}</a>`).join("")}
    </nav>
    <section id="dati" aria-labelledby="titolo-dati">
      <h2 id="titolo-dati">${t(["Esplora i dati", "Explore the data"])}</h2>
      ${sections.map(({id, title, ref, description, tables: keys = [], links, image, note}) => `<section class="thesis-case" id="${id}">
        <p class="thesis-meta">${t(ref)}</p><h3>${t(title)}</h3><p>${t(description)}</p>
        ${keys.map((key) => `<details class="thesis-dataset" data-thesis-table="${key}">
          <summary>${t(tables[key][0])}</summary><div class="thesis-table-content"></div>
        </details>`).join("")}
        ${renderNetworks(id, lang)}
        ${image ? `<details class="thesis-figure"><summary>${t(image.slice(1))}</summary>
          <a href="${file(image[0])}"><img loading="lazy" src="${raw(image[0])}" alt="${t(image.slice(1))}"></a>
        </details>` : ""}
        <ul class="thesis-links">${links.map(([it, en, href]) => `<li><a href="${href}">${t([it, en])} ↗</a></li>`).join("")}</ul>
        ${note ? `<p class="thesis-note">${t(note)}</p>` : ""}
      </section>`).join("")}
    </section>
  </article>`.replace(/^[ \t]+$/gm, "");
}

let datasets;

export function mountThesisTables(root, lang) {
  mountSpotifyNetworks(root, lang);
  // Il cambio lingua ricrea i pannelli: i listener vanno associati ai nuovi elementi.
  for (const panel of root.querySelectorAll("[data-thesis-table]")) {
    panel.addEventListener("toggle", async () => {
      if (!panel.open || panel.dataset.loaded) return;
      const box = panel.querySelector(".thesis-table-content");
      box.textContent = lang === "it" ? "Caricamento…" : "Loading…";
      try {
        // Riusa la richiesta tra pannelli, ma permette il retry alla prossima apertura.
        datasets ??= fetch(new URL("../content/thesis-tables.json?v=1", import.meta.url))
          .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          })
          .catch((error) => {
            datasets = undefined;
            throw error;
          });
        const data = await datasets;
        const key = panel.dataset.thesisTable;
        showTable(box, key, data[key], lang);
        panel.dataset.loaded = "true";
      } catch {
        box.textContent = lang === "it"
          ? "Dati non caricati. Chiudi e riapri per riprovare."
          : "Data could not be loaded. Close and reopen to retry.";
      }
    });
  }
}

function showTable(box, key, rows, lang) {
  const en = lang === "en";
  const t = (it, english) => en ? english : it;
  const text = (value) => value === "PRESENTE" ? t("Sì", "Yes")
    : value === "NON PRESENTE" ? t("No", "No") : String(value);
  const headings = tables[key][1].map(([it, english]) => t(it, english));
  box.innerHTML = `<div class="thesis-controls">
      <label>${t("Cerca nella tabella", "Search this table")} <input type="search"></label>
      ${key === "italo" ? `<label class="thesis-check"><input type="checkbox"> ${t("Solo i 36 nomi in comune", "Only the 36 names in common")}</label>` : ""}
    </div>
    <p class="thesis-count" role="status"></p>
    <div class="thesis-scroll" role="region" aria-label="${t(...tables[key][0])}" tabindex="0">
      <table><thead><tr>${headings.map((heading) => `<th scope="col">${heading}</th>`).join("")}</tr></thead><tbody></tbody></table>
    </div>
    <button type="button">${t("Mostra altre righe", "Show more rows")}</button>`;

  const input = box.querySelector('input[type="search"]');
  const common = box.querySelector('input[type="checkbox"]');
  const more = box.querySelector("button");
  const tbody = box.querySelector("tbody");
  const count = box.querySelector(".thesis-count");
  // La paginazione limita il DOM, anche per il corpus da oltre mille righe.
  const pageSize = 50;
  let limit = pageSize;

  // Normalizza accenti e maiuscole. Inserisce i valori CSV come testo semplice.
  const normalize = (value) => value.toLocaleLowerCase(lang).normalize("NFD").replace(/\p{M}/gu, "");
  function update() {
    const query = normalize(input.value.trim());
    const found = rows.filter((row) =>
      (!common?.checked || row[1] === "PRESENTE") &&
      row.some((value) => normalize(text(value)).includes(query)),
    );
    const visible = found.slice(0, limit);
    const fragment = document.createDocumentFragment();
    for (const row of visible) {
      const tr = fragment.appendChild(document.createElement("tr"));
      for (const value of row) tr.insertCell().textContent = text(value);
    }
    tbody.replaceChildren(fragment);
    count.textContent = t(`${visible.length} righe mostrate su ${found.length}`, `Showing ${visible.length} of ${found.length} rows`);
    more.hidden = visible.length >= found.length;
  }
  function filter() {
    limit = pageSize;
    update();
  }
  input.addEventListener("input", filter);
  common?.addEventListener("change", filter);
  more.addEventListener("click", () => {
    limit += pageSize;
    update();
  });
  update();
}
