/**
 * IMPAGINAZIONE DELLE PAGINE
 * I contenuti si modificano in content/site.json.
 * Menu e pulsanti sono in assets/labels.mjs.
 * Qui trovi una funzione per ciascuna pagina e i blocchi condivisi.
 */
import { labels } from "./labels.mjs?v=6";

export const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function safeURL(value) {
  try {
    const u = new URL(value, "https://example.org/");
    return ["https:", "http:", "mailto:"].includes(u.protocol)
      ? escape(value)
      : "#";
  } catch {
    return "#";
  }
}
export const local = (value, lang) =>
  typeof value === "object" && value !== null
    ? value[lang] || value.it || ""
    : value;

export const ui = (lang) => labels[lang] || labels.it;
const text = (v, lang) => escape(local(v, lang));
const lines = (v, lang) => text(v, lang).replace(/\n/g, "<br>");
/** Link esterni: manteniamo la pagina del sito aperta. */
const external = (url, label, cls = "") =>
  `<a class="${cls}" href="${safeURL(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
/** Navigazione comune a tutte le pagine, con selettore IT/EN. */
export function header(lang, page) {
  const t = ui(lang);
  const nav = [
    ["index.html", "Home", "home"],
    ["index.html#ricerca", t.research, "research"],
    ["cv.html", "CV", "cv"],
    ["ascolti.html", t.listening, "listening"],
    ["eventi.html", t.events, "events"],
    ["mappa-conferenze.html", t.conferences, "conferences"],
  ];
  return /* HTML */ `<a class="skip-link" href="#contenuti">${t.skip}</a>
    <header class="masthead">
      <a class="brand" href="index.html"
        ><b>MZ</b><span>MATTIA ZANOTTI<br />${lines(t.role, lang)}</span></a
      >
      <div class="header-tools">
        <nav class="nav-links" aria-label="${t.nav}">
          ${nav.map(([href, title, key], i) => /* HTML */ `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}><span class="nav-number">0${i + 1}</span> ${title}</a>`).join("")}
        </nav>
        <div
          class="language-switch"
          role="group"
          aria-label="${lang === "it" ? "Lingua" : "Language"}"
        >
          <button
            type="button"
            data-lang="it"
            lang="it"
            aria-label="Italiano"
            aria-pressed="${lang === "it"}"
          >
            IT</button
          ><span aria-hidden="true">/</span
          ><button
            type="button"
            data-lang="en"
            lang="en"
            aria-label="English"
            aria-pressed="${lang === "en"}"
          >
            EN
          </button>
        </div>
      </div>
    </header>`;
}
/** Contatti pubblici. L’editor non viene pubblicato. */
export function footer(d, lang) {
  const t = ui(lang);
  return /* HTML */ `<footer class="footer" id="contatti">
    <div class="footer-nome">
      MATTIA ZANOTTI<br /><span
        >${lang === "it" ? "Musica / Media / Piattaforme" : "Music / Media / Platforms"}</span
      >
    </div>
    <div class="footer-links">
      ${external(d.links.orcid, "ORCID")}${external(d.links.scholar, "Scholar")}${external(d.links.github, "GitHub")}<a
        href="mailto:${escape(d.links.email)}"
        >Email</a
      >
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Mattia Zanotti</span>
    </div>
  </footer>`;
}
/** Contenitore della mappa: la logica interattiva è in conferenze-map.js. */
function mapPanel(lang, home = false) {
  const t = ui(lang);
  return /* HTML */ `<section class="mappa-sezione" id="conferenze">
    ${
      home
        ? /* HTML */ `<div class="mappa-header">
            <h2 class="sezione-label">${t.mapHeading}</h2>
            <p class="map-intro">${t.mapDesc}</p>
          </div>`
        : ""
    }
    <div class="mappa-comandi">
      <button type="button" id="mappa-ripristina" hidden>${t.allCities}</button
      ><button type="button" id="mappa-gesti" aria-pressed="false" hidden>
        ${t.touch}</button
      ><a href="${home ? "mappa-conferenze.html" : ""}#elenco-conferenze"
        >${t.list} ↓</a
      >
    </div>
    <p id="mappa-avviso" role="status" hidden>${t.mapError}</p>
    <div id="mappa" role="region" aria-label="${t.mapLabel}"></div>
  </section>`;
}
/** Ordina tutti gli interventi per mese e anno, dal più recente. */
export function sortedPapers(d) {
  const months = {
    Gen: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    Mag: 5,
    Giu: 6,
    Lug: 7,
    Ago: 8,
    Set: 9,
    Ott: 10,
    Nov: 11,
    Dic: 12,
  };
  return d.conferences
    .flatMap((c, index) => c.papers.map((p) => ({ ...p, city: c.city, index })))
    .sort((a, b) => {
      const date = (x) => {
        const [m, y] = local(x.year, "it").split(" ");
        return Number(y) * 12 + (months[m] || 0);
      };
      return date(b) - date(a);
    });
}
/** Ogni funzione qui sotto costruisce una sola pagina. */
export function body(d, lang, page) {
  if (page === "home") return renderHome(d, lang);
  if (page === "events") return renderEvents(d, lang);
  if (page === "listening" || page === "podcast")
    return renderListening(d, lang);
  if (page === "conferences") return renderConferences(d, lang);
  throw new Error("Pagina sconosciuta: " + page);
}

/** HOME: presentazione, pubblicazioni, progetti e mappa. */
function renderHome(d, lang) {
  const t = ui(lang),
    v = (x) => text(x, lang);
  return /* HTML */ `<section class="hero" aria-labelledby="nome">
      <div class="hero-copy">
        <p class="eyebrow">POPULAR MUSIC / DIGITAL CULTURES</p>
        <h1 id="nome">MATTIA<br />ZANOTTI<span class="name-period">.</span></h1>
        <svg class="orbit" viewBox="0 0 500 260" aria-hidden="true">
          <ellipse
            cx="248"
            cy="130"
            rx="232"
            ry="46"
            transform="rotate(-23 248 130)"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        <p class="hero-kicker">${lines(d.home.kicker, lang)}</p>
        <a class="explore" href="#ricerca"
          >${t.explore} <span aria-hidden="true">⟶</span></a
        >
      </div>
      <div class="hero-art real-collage" role="img" aria-label="${t.collage}">
        <div class="collage-plane">
          <div class="ink ink-one"></div>
          <div class="ink ink-two"></div>
          ${["score.jpg", "bixio.jpg", "network.webp", "portrait.webp", "word-tree.webp", "live.jpg"].map((f, i) => /* HTML */ `<img class="fragment ${["score", "cover", "network", "portrait", "tree", "live"][i]}" src="assets/sources/${f}" alt="" ${i > 2 ? 'loading="lazy"' : ""} />`).join("")}<span
            class="collage-rule rule-one"
            aria-hidden="true"
          ></span
          ><span class="collage-rule rule-two" aria-hidden="true"></span
          ><span class="archive-label">${t.materials}</span>
        </div>
      </div>
    </section>
    <nav class="index-grid" aria-label="${t.index}">
      ${[
        ["#ricerca", t.research, t.researchTopics],
        ["#progetti", t.projects, t.projectTopics],
        ["eventi.html", t.events, t.eventTopics],
        ["ascolti.html", t.listening, t.listeningTopics],
      ]
        .map(
          ([url, title, desc], i) =>
            `<a href="${url}"><b>${title} <small>(0${i + 1})</small></b><span>${lines(desc, lang)}</span><i aria-hidden="true">↗</i></a>`,
        )
        .join("")}
    </nav>
    <section class="intro">
      <span>${t.between}</span>
      <p>${v(d.home.intro)}</p>
      <a href="cv.html">${t.profile} ⟶</a>
    </section>
    ${local(d.home.news, lang) ? /* HTML */ `<aside class="news-strip"><span class="news-label">${t.news} ↗</span><span>${v(d.home.news)}</span></aside>` : ""}
    <div class="due-colonne">
      <section class="colonna" id="ricerca">
        <h2 class="sezione-label">${t.publications}</h2>
        ${d.publications
          .map(
            (p) =>
              /* HTML */ `<article class="pub">
                <h3 class="pub-title">${external(p.url, escape(p.title))}</h3>
                <p class="pub-meta">${escape(p.meta)}</p>
                <span class="pub-tag">${v(p.tag)}</span>
              </article>`,
          )
          .join("")}
      </section>
      <section class="colonna" id="progetti">
        <h2 class="sezione-label">${t.active}</h2>
        ${d.projects
          .map(
            (p) =>
              /* HTML */ `<article class="progetto">
                <div>
                  <h3 class="progetto-nome">
                    ${external(p.url, escape(p.title) + ' <span aria-hidden="true">↗</span>')}
                  </h3>
                  <p class="progetto-sub">${v(p.description)}</p>
                </div>
                <span class="status">${v(p.tag)}</span>
              </article>`,
          )
          .join("")}
      </section>
    </div>
    <section class="altro-sezione">
      <h2 class="sezione-label">${t.other}</h2>
      <div class="altro-griglia">
        <article class="altro-card">
          <h3 class="altro-titolo"><a href="eventi.html">${t.events} ↗</a></h3>
          <p class="altro-desc">${t.eventsDesc}</p>
        </article>
        <article class="altro-card">
          <h3 class="altro-titolo">
            <a href="ascolti.html">${t.listening} ↗</a>
          </h3>
          <p class="altro-desc">${t.listeningDesc}</p>
        </article>
        <article class="altro-card">
          <h3 class="altro-titolo">
            ${external(d.links.newsletter, "Newsletter ↗")}
          </h3>
          <p class="altro-desc">${v(d.home.newsletter)}</p>
        </article>
      </div>
    </section>
    ${mapPanel(lang, true)}`;
}

/** ASCOLTI: album, playlist e podcast. I dati si modificano nel JSON. */
function renderListening(d, lang) {
  const t = ui(lang),
    v = (x) => text(x, lang);
  return /* HTML */ `<div class="page-header podcast-hero">
      <div>
        <p class="page-tag">${t.listening} / AUDIO / VIDEO</p>
        <h1 class="page-title">
          ${lang === "it" ? 'COSE DA<br><span class="acc-terra">ASCOLTARE</span>' : 'THINGS TO<br><span class="acc-terra">LISTEN TO</span>'}<span
            class="name-period"
            >.</span
          >
        </h1>
        <p class="page-desc">${t.listeningDesc}</p>
      </div>
      <div class="sound-art" aria-hidden="true">
        ${Array.from({ length: 27 }, (_, i) => /* HTML */ `<i style="--bar:${18 + ((i * 31 + 7) % 83)}%"></i>`).join("")}
      </div>
    </div>
    ${renderListeningCards(d, lang)}
    <section class="podcast-sezione">
      <h2 class="sezione-label">${t.myPodcasts}</h2>
      <div class="podcast-lista">
        ${d.podcasts
          .map(
            (p, i) =>
              /* HTML */ `<article class="podcast-card">
                <div class="podcast-header">
                  <span class="podcast-num"
                    >${String(i + 1).padStart(2, "0")}</span
                  ><span class="tipo-badge">${t.curated}</span>
                </div>
                <h2 class="podcast-title">${escape(p.title)}</h2>
                <p class="podcast-meta">${v(p.meta)}</p>
                <p class="podcast-desc">${v(p.description)}</p>
                <div class="podcast-footer">
                  ${external(p.url, t.listen + " ↗", "podcast-btn")}
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>`;
}

/** CONFERENZE: conteggi ed elenco vengono calcolati dagli stessi dati della mappa. */
function renderConferences(d, lang) {
  const t = ui(lang),
    v = (x) => text(x, lang);
  const papers = sortedPapers(d),
    years = papers
      .map((p) => Number(local(p.year, "it").match(/\d{4}/)?.[0]))
      .filter(Number.isFinite);
  return /* HTML */ `<div class="page-header">
      <p class="page-tag">${t.mapHeading}</p>
      <h1 class="page-title">
        ${lang === "it" ? "INCONTRI" : "ENCOUNTERS"}<span class="name-period"
          >.</span
        >
      </h1>
      <p class="page-desc">${t.mapDesc}</p>
      <div class="stats-row">
        ${[
          [papers.length, t.presentations],
          [d.conferences.length, t.cities],
          [new Set(d.conferences.map((c) => c.country)).size, t.countries],
          [
            years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "—",
            t.period,
          ],
        ]
          .map(
            ([n, l]) =>
              /* HTML */ `<div class="stat"><strong>${n}</strong>${l}</div>`,
          )
          .join("")}
      </div>
    </div>
    ${mapPanel(lang)}
    <section class="conf-lista" id="elenco-conferenze">
      <h2 class="conf-lista-label">${t.reverse}</h2>
      <label class="search-label" for="conference-search"
        >${t.searchLabel}</label
      ><input
        id="conference-search"
        type="search"
        placeholder="${t.search}"
        autocomplete="off"
      />
      <p id="search-status" role="status" aria-live="polite"></p>
      <div id="conference-results">
        ${papers
          .map(
            (p) =>
              /* HTML */ `<article class="conf-item">
                <div class="conf-dot" style="background:var(--orange)"></div>
                <div class="conf-meta">
                  ${v(p.year)}<br /><span>${v(p.city)}</span>
                </div>
                <div>
                  <h3 class="conf-paper">${escape(p.title)}</h3>
                  <p class="conf-name">${v(p.conf)}</p>
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>`;
}

/** Controlli sui contenuti: intercettano errori prima della pubblicazione. */
export function validate(d) {
  for (const event of d.events || []) {
    if (
      typeof event.title !== "string" ||
      !event.description ||
      typeof event.description.it !== "string" ||
      typeof event.description.en !== "string" ||
      !/^https:\/\//.test(event.url)
    )
      throw new Error("Controlla le schede degli eventi.");
    if (
      event.role &&
      (typeof event.role.it !== "string" || typeof event.role.en !== "string")
    )
      throw new Error("Il ruolo negli eventi deve avere IT ed EN.");
  }
  if (d.listening !== undefined && !Array.isArray(d.listening))
    throw new Error("La sezione listening deve essere un elenco.");
  for (const item of d.listening || []) {
    playerURL(item);
    if (
      typeof item.title !== "string" ||
      !item.meta ||
      typeof item.meta.it !== "string" ||
      typeof item.meta.en !== "string" ||
      !/^https:\/\//.test(item.url)
    )
      throw new Error("Controlla titolo, meta IT/EN e link degli ascolti.");
    const url = new URL(item.url);
    if (
      item.type === "bandcamp" &&
      !(
        url.hostname === "bandcamp.com" ||
        url.hostname.endsWith(".bandcamp.com")
      )
    )
      throw new Error("Usa un link Bandcamp per l’album.");
    if (
      item.type === "youtube-playlist" &&
      (!["youtube.com", "www.youtube.com"].includes(url.hostname) ||
        url.searchParams.get("list") !== item.playlistId)
    )
      throw new Error(
        "Il link YouTube deve corrispondere all’ID della playlist.",
      );
  }
  const bilingual = (v) =>
    v && typeof v.it === "string" && typeof v.en === "string";
  const str = (v) => typeof v === "string";
  const url = (v) => str(v) && /^https?:\/\//i.test(v) && safeURL(v) !== "#";
  if (
    !d ||
    !d.home ||
    !["kicker", "intro", "news", "music", "newsletter"].every((k) =>
      bilingual(d.home[k]),
    )
  )
    throw Error("Controlla i testi IT/EN della home.");
  for (const key of ["publications", "projects", "podcasts", "conferences"])
    if (!Array.isArray(d[key])) throw Error("Sezione mancante: " + key);
  for (const p of d.publications)
    if (!str(p.title) || !str(p.meta) || !bilingual(p.tag) || !url(p.url))
      throw Error(
        "Controlla titolo, metadati, etichette e link delle pubblicazioni.",
      );
  for (const p of d.projects)
    if (
      !str(p.title) ||
      !bilingual(p.description) ||
      !bilingual(p.tag) ||
      !url(p.url)
    )
      throw Error("Controlla i campi IT/EN e i link dei progetti.");
  for (const p of d.podcasts)
    if (
      !str(p.title) ||
      !bilingual(p.meta) ||
      !bilingual(p.description) ||
      !url(p.url)
    )
      throw Error("Controlla i campi IT/EN e i link dei podcast.");
  for (const c of d.conferences) {
    if (
      !bilingual(c.city) ||
      !str(c.country) ||
      !Number.isFinite(c.lat) ||
      Math.abs(c.lat) > 90 ||
      !Number.isFinite(c.lng) ||
      Math.abs(c.lng) > 180 ||
      !Array.isArray(c.papers)
    )
      throw Error("Controlla città, paese e coordinate delle conferenze.");
    for (const p of c.papers)
      if (
        !str(p.title) ||
        !bilingual(p.conf) ||
        !bilingual(p.year) ||
        !/^\S+ \d{4}$/.test(p.year.it)
      )
        throw Error("Controlla titoli, convegni e date (es. Nov 2026).");
  }
  if (
    !d.links ||
    !["orcid", "scholar", "github", "newsletter"].every((k) =>
      url(d.links[k]),
    ) ||
    !str(d.links.email) ||
    !/^\S+@\S+\.\S+$/.test(d.links.email)
  )
    throw Error("Controlla link e indirizzo email.");
  return d;
}

/**
 * PLAYER ESTERNI
 * Non incollare HTML arbitrario nei dati: bastano tipo, ID e link originale.
 * Le sorgenti degli iframe vengono costruite solo per YouTube e Bandcamp.
 */
export function playerURL(item) {
  if (item.type === "bandcamp" && /^\d+$/.test(item.albumId)) {
    return `https://bandcamp.com/EmbeddedPlayer/album=${item.albumId}/size=large/bgcol=333333/linkcol=ff491b/artwork=small/transparent=true/`;
  }
  if (
    item.type === "youtube-playlist" &&
    /^[A-Za-z0-9_-]+$/.test(item.playlistId)
  ) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${item.playlistId}`;
  }
  throw new Error("Player non valido: controlla tipo e ID.");
}

function renderListeningCards(data, lang) {
  const t = ui(lang);
  if (!data.listening?.length) return "";
  return /* HTML */ `
    <section class="listening-section" aria-labelledby="musica-video">
      <h2 class="sezione-label" id="musica-video">${t.recordings}</h2>
      <div class="listening-grid">
        ${data.listening
          .map(
            (item) => /* HTML */ `
              <article class="listening-card">
                <p class="listening-platform">
                  ${item.type === "bandcamp" ? "BANDCAMP / ALBUM" : "YOUTUBE / PLAYLIST"}
                </p>
                <h2 class="listening-title">${escape(item.title)}</h2>
                <p class="listening-meta">${text(item.meta, lang)}</p>
                <div
                  class="player-frame ${item.type === "bandcamp" ? "player-bandcamp" : "player-youtube"}"
                >
                  <iframe
                    src="${escape(playerURL(item))}"
                    title="${escape(item.title)} — ${item.type === "bandcamp" ? "Bandcamp" : "YouTube"}"
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allow="encrypted-media; fullscreen; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                ${external(item.url, (item.type === "bandcamp" ? t.openBandcamp : t.openYoutube) + " ↗", "listening-link")}
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

/** EVENTI: ruolo e periodo compaiono soltanto quando sono stati confermati. */
function renderEvents(data, lang) {
  const t = ui(lang);
  return /* HTML */ `
    <div class="page-header events-hero">
      <p class="page-tag">
        ${lang === "it" ? "LIVE / CULTURE / INCONTRI" : "LIVE / CULTURE / ENCOUNTERS"}
      </p>
      <h1 class="page-title">
        ${lang === "it" ? 'FARE /<br>INCONTRARE /<br><span class="acc-terra">INVENTARE</span>' : 'MAKE /<br>GATHER /<br><span class="acc-terra">IMAGINE</span>'}<span
          class="name-period"
          >.</span
        >
      </h1>
      <p class="page-desc">${t.eventsTitle}. ${t.eventsDesc}</p>
    </div>
    <section class="events-section" aria-label="${t.eventsTitle}">
      ${(data.events || [])
        .map(
          (event, index) => /* HTML */ `
            <article class="event-card">
              <div class="event-index">
                0${index + 1}${event.period ? "<span>" + escape(event.period) + "</span>" : ""}
              </div>
              <div>
                <h2>${escape(event.title)}</h2>
                <p class="event-description">
                  ${text(event.description, lang)}
                </p>
                ${event.role ? '<p class="event-role"><span>' + t.eventRole + "</span> " + text(event.role, lang) + "</p>" : ""}
                ${external(event.url, t.eventPage + " ↗", "listening-link")}
              </div>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}
