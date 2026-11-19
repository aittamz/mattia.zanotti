/**
 * Confronto del capitolo 6 (pp. 221–236), con le metriche delle figg. 6.3–6.4.
 * Ogni riga di figure allinea lo stesso tipo di evidenza. Gli Insights TikTok
 * hanno un proprio pannello perché nella tesi esistono solo per «La noia».
 */
import { renderThesisFigure } from "./thesis-networks.mjs?v=2";

const tracks = ["«La noia» · Angelina Mango", "«Tuta Gold» · Mahmood"];
const pairs = [
  [["Nuvole di parole", "Word clouds"], ["6.24", "6.31"]],
  [["Alberi da «canzone»", "Word trees for “canzone”"], ["6.26", "6.32"]],
  [["Alberi dal nome dell’artista", "Word trees for each artist’s name"], ["6.27", "6.33"]],
  [["Reti di co-hashtag", "Co-hashtag networks"], ["6.30", "6.34"]],
];

export function renderSanremoComparison(lang) {
  const en = lang === "en";
  const t = (it, english) => en ? english : it;
  const pair = (index) => {
    const [[it, english], numbers] = pairs[index];
    const label = t(it, english);
    return `<details class="thesis-comparison-figures">
      <summary>${label} · ${numbers.join(" / ")}</summary>
      <div class="thesis-figure-grid">${numbers.map((figure, i) =>
        renderThesisFigure(figure, tracks[i], lang)).join("")}</div>
    </details>`;
  };

  // Valori dei due brani copiati dalle rispettive righe del CSV Sanremo.
  // La data è quella riportata nelle didascalie delle figure 6.3 e 6.4.
  const measures = [
    [t("Esito al Festival", "Festival result"), t("Vincitrice", "Winner"), t("Fuori dai cinque finalisti", "Outside the final five")],
    [t("Stream Spotify", "Spotify streams"), 42990087, 61957219],
    [t("Visualizzazioni YouTube", "YouTube views"), 23113597, 41462604],
  ];
  const format = new Intl.NumberFormat(lang);
  return `<div class="thesis-comparison">
    <section aria-labelledby="confronto-risultati">
      <h4 id="confronto-risultati">${t("Dal Festival alle piattaforme", "From the festival to the platforms")}</h4>
      <p>${t(
        "«La noia» vince il Festival. Nella rilevazione del 15 marzo 2024, «Tuta Gold» è al primo posto fra i brani in gara per stream su Spotify e visualizzazioni su YouTube. La tesi usa questa divergenza per indagare come cambia la popolarità quando cambia il contesto di fruizione.",
        "“La noia” wins the festival. In the snapshot dated 15 March 2024, “Tuta Gold” leads the festival entries in Spotify streams and YouTube views. The dissertation uses the divergence to ask how popularity changes across contexts of use.")}</p>
      <div class="thesis-scroll" role="region" aria-label="${t("Indicatori dei due brani", "Metrics for both tracks")}" tabindex="0">
        <table>
          <caption>${t("Risultato del Festival e dati di piattaforma al 15 marzo 2024", "Festival result and platform data as of 15 March 2024")}</caption>
          <thead><tr><th scope="col">${t("Indicatore", "Metric")}</th>${tracks.map(track => `<th scope="col">${track}</th>`).join("")}</tr></thead>
          <tbody>${measures.map(([label, ...values]) => `<tr><th scope="row">${label}</th>${values.map(value =>
            `<td>${typeof value === "number" ? format.format(value) : value}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
      <p class="thesis-note"><a href="https://www.rai.it/dl/doc/2024/02/11/1707667656946_sanremo-2024-i-risultati-delle-votazioni.pdf">${t("Risultati ufficiali delle votazioni RAI", "Official RAI voting results")} ↗</a></p>
    </section>
    <section aria-labelledby="confronto-youtube">
      <h4 id="confronto-youtube">YouTube · ${t("commenti e ricezione", "comments and reception")}</h4>
      <p>${t(
        "I due corpus provengono dai video ufficiali e sono stati raccolti con YouTube Data Tools ed esplorati con Voyant Tools. Le nuvole mostrano le parole ricorrenti dopo la rimozione delle stop word italiane e inglesi. Gli alberi mostrano il contesto delle parole selezionate.",
        "The two corpora come from the official videos and were collected with YouTube Data Tools and explored with Voyant Tools. The clouds show recurring words after Italian and English stop words are removed. The trees show words in context.")}</p>
      <p>${t(
        "Nel corpus di «La noia» emergono riferimenti a Sanremo ed Eurovision e formule di apprezzamento come «bellissima» e «preferita». In «Tuta Gold» il lessico ruota soprattutto attorno al brano e all’artista. La tesi osserva anche un richiamo a «Soldi».",
        "In the “La noia” corpus, references to Sanremo and Eurovision appear alongside expressions of appreciation such as “bellissima” and “preferita”. In “Tuta Gold”, the vocabulary centres on the track and its artist. The dissertation also notes a reference to “Soldi”.")}</p>
      ${pair(0)}${pair(1)}${pair(2)}
    </section>
    <section aria-labelledby="confronto-tiktok">
      <h4 id="confronto-tiktok">TikTok · ${t("Sound ID e riusi", "sound IDs and reuse")}</h4>
      <p>${t(
        "Il Sound ID ufficiale di «La noia» permette di esaminare performance e pubblico nel Creative Center. Per «Tuta Gold» la tesi segue un suono caricato da un utente a partire dall’esibizione di Sanremo, riutilizzato anche da Mahmood. Per quel Sound ID il Creative Center non offriva gli stessi Insights.",
        "The official “La noia” sound ID makes it possible to examine performance and audience in the Creative Center. For “Tuta Gold”, the dissertation follows a user-uploaded sound taken from the Sanremo performance and also reused by Mahmood. The Creative Center did not provide the same Insights for that sound ID.")}</p>
      <p>${t(
        "Le reti di co-hashtag sono confrontabili come rappresentazioni dei due campioni: 428 contenuti per «La noia», 537 per «Tuta Gold». Sanremo forma un addensamento riconoscibile nel primo grafo. Nel secondo, #sanremo e #sanremo2024 rientrano nel cluster centrale, insieme ai riferimenti al brano e agli hashtag di visibilità.",
        "The co-hashtag graphs can be compared as representations of two samples: 428 items for “La noia”, 537 for “Tuta Gold”. Sanremo forms a distinct grouping in the first graph. In the second, #sanremo and #sanremo2024 sit in the main cluster alongside references to the track and visibility hashtags.")}</p>
      ${pair(3)}
      <details class="thesis-comparison-figures"><summary>${t("Insights disponibili per «La noia»", "Insights available for “La noia”")} · 6.28 / 6.29</summary>
        <div class="thesis-figure-grid">
          ${renderThesisFigure("6.28", t("Performance dei video", "Video performance"), lang)}
          ${renderThesisFigure("6.29", "Audience Insights", lang)}
        </div>
      </details>
    </section>
  </div>`;
}
