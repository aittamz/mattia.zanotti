/* Cartografia locale: nessuna API key o servizio di mappe a pagamento. */
function creaMappaConferenze(conferenze, lang = 'it') {
  const contenitore = document.getElementById('mappa');
  const avviso = document.getElementById('mappa-avviso');
  if (typeof L === 'undefined' || !conferenze.length) {
    contenitore.hidden = true;
    avviso.hidden = false;
    return null;
  }
  const touch = matchMedia('(pointer: coarse)').matches;
  const mappa = L.map(contenitore, { dragging: !touch, touchZoom: !touch, scrollWheelZoom: false, zoomSnap: .25, zoomDelta: .5 });
  const limiti = L.latLngBounds(conferenze.map(({lat,lng}) => [lat,lng]));
  const inquadra = () => {mappa.closePopup();mappa.fitBounds(limiti, {padding:[24,24],maxZoom:4});};
  inquadra();
  L.imageOverlay('assets/cartografia.svg', [[-85.05112878,-180],[85.05112878,180]], {attribution:'<a href="https://www.naturalearthdata.com/">Natural Earth</a>'}).on('error',()=>{avviso.hidden=false;}).addTo(mappa);
  const zoomIn=contenitore.querySelector('.leaflet-control-zoom-in'),zoomOut=contenitore.querySelector('.leaflet-control-zoom-out');
  if(zoomIn){zoomIn.title=lang==='it'?'Ingrandisci':'Zoom in';zoomIn.setAttribute('aria-label',zoomIn.title);}
  if(zoomOut){zoomOut.title=lang==='it'?'Riduci':'Zoom out';zoomOut.setAttribute('aria-label',zoomOut.title);}
  const città=document.createElement('select');const label=lang==='it'?'Scegli una città':'Choose a city';
  città.setAttribute('aria-label',label);città.add(new Option(label,''));
  for(const c of [...conferenze].sort((a,b)=>a.city.localeCompare(b.city,lang)))città.add(new Option(c.city,c.city));
  città.addEventListener('change',()=>{if(!città.value){inquadra();return;}mappa.eachLayer(p=>{if(p.options.title===città.value){mappa.setView(p.getLatLng(),5);p.openPopup();}});});
  document.querySelector('.mappa-comandi').prepend(città);
  const ripristina=document.getElementById('mappa-ripristina');ripristina.hidden=false;ripristina.addEventListener('click',()=>{città.value='';inquadra();});
  mappa.on('resize',e=>{if(e.oldSize.x!==e.newSize.x)inquadra();});
  if(touch){const gesti=document.getElementById('mappa-gesti');gesti.hidden=false;gesti.addEventListener('click',()=>{const active=gesti.getAttribute('aria-pressed')==='true';gesti.setAttribute('aria-pressed',String(!active));for(const h of [mappa.dragging,mappa.touchZoom])active?h.disable():h.enable();});}
  return mappa;
}
