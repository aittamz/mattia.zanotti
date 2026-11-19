/**
 * Tavole di Gephi riprese dalla tesi e indice dei legami nei file GDF.
 * Le figure mostrano il layout usato nell'argomentazione. L'indice Spotify
 * interroga invece il file sorgente, che può contenere più nodi della tavola.
 */

// Ogni gruppo collega figure, unità di osservazione e lettura nel testo.
// I numeri sono quelli delle didascalie, non quelli delle pagine del PDF.
const groups = {
  trap: [
    [["TikTok · co-hashtag di #trap", "TikTok · #trap co-hashtags"], ["5.1"],
      ["La figura mostra gli hashtag che ricorrono più spesso insieme a #trap. La tabella della pagina conta le occorrenze dal CSV di raccolta.",
       "The figure shows hashtags that most often appear with #trap. The table on this page counts occurrences from the archived CSV."]],
    [["Sfera Ebbasta · artisti e tag di genere", "Sfera Ebbasta · artists and genre tags"], ["5.2", "5.3"],
      ["I legami vengono dalla cronologia di ascolto aggregata elaborata da Spotify. Sfera Ebbasta e Ghali compaiono in zone distanti; la seconda tavola sostituisce ai nomi i tag attribuiti dalla piattaforma.",
       "Links come from aggregate listening history as processed by Spotify. Sfera Ebbasta and Ghali appear in different parts of the graph. The second figure replaces artist names with platform-assigned tags."]],
    [["Trap italiana · classificazione su Spotify", "Italian trap · Spotify classification"], ["5.4", "5.5"],
      ["Il repertorio di artisti classificati come trap italiana e i tag della playlist The Sound of Italian Trap mostrano la compresenza di etichette diverse.",
       "The artists classified as Italian trap and the tags in The Sound of Italian Trap playlist show how multiple labels coexist."]],
  ],
  "italo-disco": [
    [["Righeira · rete e tre cluster", "Righeira · network and three clusters"], ["5.13", "5.14", "5.15", "5.16"],
      ["La rete di Spotify mette in relazione tre poli dell’immaginario: Italodisco (viola), disco (verde) e italo (arancio). I dettagli mostrano nomi e tag di genere.",
       "The Spotify network connects three poles of the imaginary: Italodisco (purple), disco (green) and italo (orange). The detailed figures show names and genre tags."]],
  ],
  sanremo: [
    [["Rete dei crediti SIAE, stream e visualizzazioni", "SIAE credits network, streams and views"], ["6.1", "6.2", "6.3", "6.4"],
      ["I brani si collegano attraverso autori, compositori ed editori condivisi. Le figure modulano la dimensione dei nodi per centralità di intermediazione, visualizzazioni YouTube o stream Spotify.",
       "Tracks are connected through shared lyricists, composers and publishers. The figures scale nodes by betweenness centrality, YouTube views or Spotify streams."]],
    [["YouTube · co-commenting tra video e canali", "YouTube · co-commenting across videos and channels"], ["6.5", "6.6"],
      ["Le reti partono dai 30 video ufficiali. Un legame deriva da commentatori in comune. Nella rete dei video i colori indicano quattro classi di modularità e la dimensione dei nodi segue le visualizzazioni al 15 marzo 2024.",
       "The networks start from the 30 official videos. Links derive from shared commenters. In the video network, colours mark four modularity classes and node size follows views as of 15 March 2024."]],
    // I confronti descrivono la posizione nei due grafi e seguono la lettura
    // dell'autore. La distanza nel layout non è una stima dell'effetto del Festival.
    ...[
      ["Gazzelle", 12, "Nel secondo grafo Gazzelle si allontana da Vasco Rossi, si avvicina a Sfera Ebbasta e sembra diventare un punto di snodo.", "In the second graph Gazzelle moves away from Vasco Rossi and towards Sfera Ebbasta, and appears to become a bridge in the network."],
      ["The Kolors", 14, "Nel secondo grafo i nodi appaiono più raccolti. Vasco Rossi e Capo Plaza si avvicinano alla band.", "Nodes appear closer together in the second graph. Vasco Rossi and Capo Plaza move closer to the band."],
      ["La Sad", 16, "Dopo Sanremo la rete appare più coesa, con collegamenti anche fra nodi periferici.", "After Sanremo the network appears more cohesive, with links among peripheral nodes as well."],
      ["Mahmood", 18, "Il secondo grafo mostra un centro con artisti dal seguito relativamente basso. Sfera Ebbasta appare più distante da Mahmood.", "The second graph has a centre populated by artists with relatively small followings. Sfera Ebbasta appears further from Mahmood."],
      ["Angelina Mango", 20, "Da una posizione di snodo, Mango sembra spostarsi verso una nicchia, più distante dal cluster sanremese.", "Mango appears to move from a bridging position towards a niche, further from the Sanremo cluster."],
      ["Fiorella Mannoia", 22, "Da uno dei tre cluster Mannoia si sposta verso il centro del grafo, più vicina a Lucio Dalla.", "Mannoia moves from one of the three clusters towards the centre of the graph, closer to Lucio Dalla."],
    ].map(([artist, first, it, en]) => [[`${artist} · prima e dopo il Festival`, `${artist} · before and after the festival`],
      [`6.${first}`, `6.${first + 1}`], [it, en]]),
  ],
  casi: [
    [["«La noia» · rete YouTube", "“La noia” · YouTube network"], ["6.25"],
      ["La ricerca iniziale «angelina mango la noia» serve a costruire la rete di co-commenting. Il cluster azzurro comprende canali esteri legati all’Eurovision.",
       "The initial query “angelina mango la noia” is used to build the co-commenting network. The light-blue cluster includes foreign Eurovision-related channels."]],

  ],
  "alt-z": [
    [["Alt Z · tag nelle due playlist", "Alt Z · tags across the two playlists"], ["7.3"],
      ["SpotiGeM visualizza la costellazione di tag: blu per The Sound of Alt Z, rosso per Intro to Alt Z. La presenza ricorrente di Alt Z lascia aperti i confini musicali dell’etichetta.",
       "SpotiGeM visualises the constellation of tags: blue for The Sound of Alt Z, red for Intro to Alt Z. The recurring Alt Z tag leaves the musical boundaries of the label open."]],

    [["Nessa Barrett · rete Spotify", "Nessa Barrett · Spotify network"], ["7.4"],
      ["La tesi usa Nessa Barrett come punto di partenza per verificare se nella rete compaiono i nomi associati a una prima definizione di Alt Z. Nel campione discusso quei nomi non emergono.",
       "The dissertation starts from Nessa Barrett to see whether artists named in an initial definition of Alt Z appear in her listening network. Those names do not emerge in the sample discussed."]],
    [["#altzmusic · rete TikTok", "#altzmusic · TikTok network"], ["7.7"],
      ["La raccolta parte da 42 post con #altzmusic, analizzati con Zeeschuimer e 4CAT. Nel grafo spiccano hashtag di visibilità come #fyp e un addensamento intorno a #alternative.",
       "The collection starts from 42 posts containing #altzmusic, analysed with Zeeschuimer and 4CAT. Visibility hashtags such as #fyp and a grouping around #alternative stand out."]],
  ],
};

const graphs = { trap: ["sfera", "Sfera Ebbasta"], "alt-z": ["nessa", "Nessa Barrett"] };

export function renderNetworks(section, lang) {
  const en = lang === "en";
  const t = (pair) => pair[Number(en)];
  const heading = en ? "Networks from the dissertation" : "Le reti nella tesi";
  const graph = graphs[section];
  return `<section class="thesis-networks" aria-label="${heading}">
    <h4>${heading}</h4>
    ${groups[section].map(([title, figures, caption]) => `<details class="thesis-figure">
      <summary>${t(title)} · ${figures.length === 1 ? "Fig." : en ? "Figs." : "Figg."} ${figures.join(" / ")}</summary>
      <p>${t(caption)}</p>
      <div class="thesis-figure-grid">${figures.map((number) => renderThesisFigure(number, t(title), lang)).join("")}</div>
    </details>`).join("")}
    ${graph ? `<details data-spotify-network="${graph[0]}"><summary>${en ? "Browse Spotify links" : "Esplora i collegamenti Spotify"} · ${graph[1]}</summary>
      <div class="thesis-table-content"></div></details>` : ""}
  </section>`;
}

// Le tavole sono disponibili anche come file indipendenti per ingrandirle.
export function renderThesisFigure(number, title, lang) {
  const path = `assets/thesis-figures/${number}.webp`;
  const label = `${lang === "en" ? "Figure" : "Figura"} ${number}`;
  return `<figure><a href="${path}"><img loading="lazy" src="${path}" alt="${title} · ${label}"></a>
    <figcaption><a href="${path}">${label} · ${title}</a></figcaption></figure>`;
}

let networkData;

export function mountSpotifyNetworks(root, lang) {
  const en = lang === "en";
  for (const details of root.querySelectorAll("[data-spotify-network]")) {
    details.addEventListener("toggle", async () => {
      if (!details.open || details.dataset.loaded) return;
      const box = details.querySelector(".thesis-table-content");
      box.textContent = en ? "Loading…" : "Caricamento…";
      try {
        // Una sola richiesta per entrambi i pannelli e per i cambi di lingua.
        networkData ??= fetch(new URL("../content/thesis-networks.json", import.meta.url))
          .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          })
          .catch((error) => {
            networkData = undefined;
            throw error;
          });
        const data = await networkData;
        renderSpotifyIndex(box, data[details.dataset.spotifyNetwork], en);
        details.dataset.loaded = "true";
      } catch {
        box.textContent = en ? "Could not load the network. Reopen to try again." : "Rete non caricata. Chiudi e riapri per riprovare.";
      }
    });
  }
}

function renderSpotifyIndex(box, { artists, links }, en) {
  box.innerHTML = `<p>${en
    ? "Choose an artist to view immediate neighbours and platform genre tags. Links follow source and target in the GDF file."
    : "Scegli un artista per consultare i vicini diretti e i tag di genere. La direzione segue sorgente e destinazione nel GDF."}</p>
    <label>${en ? "Artist" : "Artista"} <select></select></label>
    <p role="status"></p><ul class="thesis-neighbours"></ul>`;
  const select = box.querySelector("select");
  const status = box.querySelector("[role=status]");
  const results = box.querySelector("ul");

  // Indicizza gli archi per entrambi gli estremi. I vicini reciproci
  // compaiono una volta, con entrambe le direzioni.
  const neighbours = artists.map(() => new Map());
  for (const [source, target] of links) {
    neighbours[source].set(target, (neighbours[source].get(target) || 0) | 1);
    neighbours[target].set(source, (neighbours[target].get(source) || 0) | 2);
  }
  const compare = (a, b) => artists[a][0].localeCompare(artists[b][0], en ? "en" : "it");
  for (const index of artists.map((_, i) => i).sort(compare)) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = artists[index][0];
    select.append(option);
  }

  function show(index) {
    select.value = index;
    const adjacent = [...neighbours[index]].sort(([a], [b]) => compare(a, b));
    status.textContent = `${artists[index][0]} · ${adjacent.length} ${en ? "neighbours" : "vicini"}`;
    results.replaceChildren();
    for (const [other, direction] of adjacent) {
      const [name, genres] = artists[other];
      const row = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = name;
      button.addEventListener("click", () => {
        show(other);
        select.focus();
      });
      const edge = direction === 3 ? "↔" : direction === 1 ? "→" : "←";
      row.append(`${edge} `, button, genres ? ` · ${genres}` : "");
      results.append(row);
    }
  }
  select.addEventListener("change", () => show(Number(select.value)));
  show(0); // Il primo nodo dei due GDF è l'artista da cui parte la raccolta.
}
