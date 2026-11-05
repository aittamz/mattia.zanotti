/**
 * COMPORTAMENTO DEL SITO
 * Carica i contenuti, cambia lingua e collega mappa e ricerca.
 * Per modificare i testi usa content/site.json, non questo file.
 */
import { header, footer, body, local, ui, validate } from "./render.mjs?v=5";
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
let lang = params.get("lang");
try {
  lang = lang || localStorage.getItem("mz-lang");
} catch {}
if (!["it", "en"].includes(lang)) lang = "it";
let data, map;
// Salva la lingua, quando il browser permette il salvataggio locale.
function remember() {
  try {
    localStorage.setItem("mz-lang", lang);
  } catch {}
  document.documentElement.lang = lang;
}
// Ricostruisce la pagina nella lingua scelta.
function show() {
  if (map) {
    map.remove();
    map = null;
  }
  remember();
  document.getElementById("site-header").innerHTML = header(lang, page);
  document.getElementById("contenuti").innerHTML = body(data, lang, page);
  document.getElementById("site-footer").innerHTML = footer(data, lang);
  document.title =
    {
      home:
        lang === "it"
          ? "Musica, media, piattaforme"
          : "Music, media, platforms",
      listening: ui(lang).listeningTitle,
      podcast: ui(lang).listeningTitle,
      conferences: ui(lang).conferences,
      events: ui(lang).eventsTitle,
    }[page] + " — Mattia Zanotti";
  document.querySelector('meta[name="description"]').content = local(
    page === "home"
      ? data.home.intro
      : page === "listening" || page === "podcast"
        ? ui(lang).listeningDesc
        : page === "events"
          ? ui(lang).eventsDesc
          : ui(lang).mapDesc,
    lang,
  );
  document.querySelectorAll("[data-lang]").forEach((b) =>
    b.addEventListener("click", () => {
      const next = b.dataset.lang;
      if (next === lang) return;
      lang = next;
      const u = new URL(location.href);
      u.searchParams.set("lang", lang);
      history.replaceState(null, "", u);
      show();
      document.querySelector(`[data-lang="${lang}"]`).focus();
    }),
  );
  // Mantiene la lingua nei link. Il CV usa già la stessa preferenza mz-lang.
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (
      /^(index|ascolti|eventi|PODCAST|mappa-conferenze)\.html/.test(href) ||
      href.startsWith("https://aittamz.github.io/MAPSEM/")
    ) {
      const u = new URL(href, location.href);
      u.searchParams.set("lang", lang);
      a.href = u.href;
    }
  });
  if (document.getElementById("mappa")) mountMap();
  const search = document.getElementById("conference-search");
  if (search)
    search.addEventListener("input", () => {
      const q = search.value.trim().toLocaleLowerCase(lang);
      let count = 0;
      document.querySelectorAll(".conf-item").forEach((item) => {
        const matched = item.textContent.toLocaleLowerCase(lang).includes(q);
        item.hidden = !matched;
        if (matched) count++;
      });
      document.getElementById("search-status").textContent = count
        ? `${count} ${count === 1 ? (lang === "it" ? "presentazione trovata" : "presentation found") : ui(lang).results}`
        : ui(lang).noResults;
    });
}
// Aggiunge alla mappa gli interventi presenti nel file dei contenuti.
function mountMap() {
  const conferences = data.conferences.map((c) => ({
    ...c,
    city: local(c.city, lang),
  }));
  if (typeof window.creaMappaConferenze !== "function") {
    document.getElementById("mappa").hidden = true;
    document.getElementById("mappa-avviso").hidden = false;
    return;
  }
  map = window.creaMappaConferenze(conferences, lang);
  if (!map) return;
  conferences.forEach((c) => {
    const popup = document.createElement("div");
    popup.className = "popup-inner";
    const city = document.createElement("h3");
    city.className = "popup-city";
    city.textContent = c.city;
    popup.append(city);
    c.papers.forEach((p) => {
      for (const [cls, value] of [
        ["popup-paper", p.title],
        ["popup-conf", local(p.conf, lang)],
        ["popup-year", local(p.year, lang)],
      ]) {
        const el = document.createElement("div");
        el.className = cls;
        el.textContent = value;
        popup.append(el);
      }
    });
    const icon = L.divIcon({
      html: '<span class="map-point"></span>',
      className: "conference-marker",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
    L.marker([c.lat, c.lng], { icon, title: c.city })
      .addTo(map)
      .bindPopup(popup, { maxWidth: 300 });
  });
}
// Se il JSON non arriva, resta visibile la versione HTML italiana di riserva.
try {
  if (!data) {
    const r = await fetch("content/site.json", { cache: "no-cache" });
    if (!r.ok) throw Error(r.status);
    data = validate(await r.json());
  }
  show();
} catch (e) {
  console.error("Site content:", e);
  document.documentElement.lang = "it";
  document.querySelectorAll("[data-lang]").forEach((b) => (b.disabled = true));
  const warning = document.createElement("p");
  warning.className = "preview-banner";
  warning.textContent =
    "Non è stato possibile caricare gli aggiornamenti. Sono mostrati i contenuti di base in italiano. Ricarica la pagina per riprovare.";
  document.getElementById("contenuti").prepend(warning);
}
