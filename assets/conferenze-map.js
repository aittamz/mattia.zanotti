/* Impostazioni condivise dalle due mappe delle conferenze. */
function creaMappaConferenze(conferenze, stile) {
  const contenitore = document.getElementById('mappa');
  const avviso = document.getElementById('mappa-avviso');
  if (typeof L === 'undefined') {
    contenitore.hidden = true;
    avviso.hidden = false;
    return null;
  }

  const touch = matchMedia('(pointer: coarse)').matches;
  const mappa = L.map(contenitore, {
    dragging: !touch,
    touchZoom: !touch,
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    zoomDelta: 0.5
  });
  const limiti = L.latLngBounds(conferenze.map(({lat, lng}) => [lat, lng]));
  const inquadra = () => mappa.fitBounds(limiti, { padding: [24, 24], maxZoom: 4 });
  inquadra();

  const tessere = L.tileLayer('https://{s}.basemaps.cartocdn.com/' + stile + '/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
    maxZoom: 18,
    noWrap: true
  });
  let caricata = false;
  tessere.on('loading', () => { caricata = false; });
  tessere.on('tileload', () => {
    caricata = true;
    avviso.hidden = true;
  });
  tessere.on('load', () => { avviso.hidden = caricata; });
  tessere.addTo(mappa);

  const ripristina = document.getElementById('mappa-ripristina');
  ripristina.hidden = false;
  ripristina.addEventListener('click', inquadra);
  mappa.on('resize', inquadra);

  if (touch) {
    const gesti = document.getElementById('mappa-gesti');
    gesti.hidden = false;
    gesti.addEventListener('click', () => {
      const attivi = gesti.getAttribute('aria-pressed') === 'true';
      gesti.setAttribute('aria-pressed', String(!attivi));
      if (attivi) {
        mappa.dragging.disable();
        mappa.touchZoom.disable();
      } else {
        mappa.dragging.enable();
        mappa.touchZoom.enable();
      }
    });
  }
  return mappa;
}
