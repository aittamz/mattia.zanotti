import {header,footer,body,local,ui,validate} from './render.mjs';
const page=document.body.dataset.page;
const params=new URLSearchParams(location.search);
let lang=params.get('lang');
try{lang=lang||localStorage.getItem('mz-lang');}catch{}
if(!['it','en'].includes(lang))lang='it';
let data,map;
const preview=false;
function remember(){try{localStorage.setItem('mz-lang',lang);}catch{}document.documentElement.lang=lang;}
function show(){
 if(map){map.remove();map=null;}
 remember();document.getElementById('site-header').innerHTML=header(lang,page);
 document.getElementById('contenuti').innerHTML=body(data,lang,page);
 document.getElementById('site-footer').innerHTML=footer(data,lang);
 document.title=({home:lang==='it'?'Musica, media, piattaforme':'Music, media, platforms',podcast:'Podcast',conferences:ui(lang).conferences})[page]+' — Mattia Zanotti';
 document.querySelector('meta[name="description"]').content=local(page==='home'?data.home.intro:page==='podcast'?ui(lang).podcastDesc:ui(lang).mapDesc,lang);
 document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{const next=b.dataset.lang;if(next===lang)return;lang=next;const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);show();document.querySelector(`[data-lang="${lang}"]`).focus();}));
 // Preserve language in links and use the CV's existing, unchanged language preference.
 document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(/^(index|PODCAST|mappa-conferenze)\.html/.test(href)||href.startsWith('https://aittamz.github.io/MAPSEM/')){const u=new URL(href,location.href);u.searchParams.set('lang',lang);if(preview)u.searchParams.set('preview','1');a.href=u.href;}});
 if(document.getElementById('mappa'))mountMap();
 const search=document.getElementById('conference-search');
 if(search)search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase(lang);let count=0;document.querySelectorAll('.conf-item').forEach(item=>{const matched=item.textContent.toLocaleLowerCase(lang).includes(q);item.hidden=!matched;if(matched)count++;});document.getElementById('search-status').textContent=count?`${count} ${count===1?(lang==='it'?'presentazione trovata':'presentation found'):ui(lang).results}`:ui(lang).noResults;});
 if(preview){const banner=document.createElement('aside');banner.className='preview-banner';banner.textContent='Anteprima della bozza — queste modifiche non sono pubblicate.';document.getElementById('contenuti').prepend(banner);}
}
function mountMap(){
 const conferences=data.conferences.map(c=>({...c,city:local(c.city,lang)}));
 if(typeof window.creaMappaConferenze!=='function'){document.getElementById('mappa').hidden=true;document.getElementById('mappa-avviso').hidden=false;return;}
 map=window.creaMappaConferenze(conferences,lang);
 if(!map)return;
 conferences.forEach(c=>{
 const popup=document.createElement('div');popup.className='popup-inner';const city=document.createElement('h3');city.className='popup-city';city.textContent=c.city;popup.append(city);
 c.papers.forEach(p=>{for(const [cls,value] of [['popup-paper',p.title],['popup-conf',local(p.conf,lang)],['popup-year',local(p.year,lang)]]){const el=document.createElement('div');el.className=cls;el.textContent=value;popup.append(el);}});
 const icon=L.divIcon({html:'<span class="map-point"></span>',className:'conference-marker',iconSize:[36,36],iconAnchor:[18,18]});
 L.marker([c.lat,c.lng],{icon,title:c.city}).addTo(map).bindPopup(popup,{maxWidth:300});
 });
}
try{
 if(!data){const r=await fetch('content/site.json',{cache:'no-cache'});if(!r.ok)throw Error(r.status);data=validate(await r.json());}
 show();
}catch(e){console.error('Site content:',e);document.documentElement.lang='it';document.querySelectorAll('[data-lang]').forEach(b=>b.disabled=true);const warning=document.createElement('p');warning.className='preview-banner';warning.textContent='Non è stato possibile caricare gli aggiornamenti. Sono mostrati i contenuti di base in italiano. Ricarica la pagina per riprovare.';document.getElementById('contenuti').prepend(warning);}
