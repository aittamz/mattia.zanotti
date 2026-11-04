/* Impostazioni condivise dalle due mappe delle conferenze. */
function creaMappaConferenze(conferenze) {
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
  const inquadra = () => {
    mappa.closePopup();
    mappa.fitBounds(limiti, { padding: [24, 24], maxZoom: 4 });
  };
  inquadra();

  const sfondo = L.imageOverlay('assets/cartografia.svg', [
    [-85.05112878, -180], [85.05112878, 180]
  ], { attribution: '<a href="https://www.naturalearthdata.com/">Natural Earth</a>' });
  sfondo.on('error', () => { avviso.hidden = false; });
  sfondo.addTo(mappa);

  const città = document.createElement('select');
  città.setAttribute('aria-label', 'Scegli una città');
  città.add(new Option('Scegli una città', ''));
  for (const conf of [...conferenze].sort((a, b) => a.city.localeCompare(b.city, 'it'))) {
    città.add(new Option(conf.city, conf.city));
  }
  città.addEventListener('change', () => {
    mappa.eachLayer(punto => {
      if (!città.value || punto.options.title !== città.value) return;
      mappa.setView(punto.getLatLng(), 5);
      punto.openPopup();
    });
  });
  document.querySelector('.mappa-comandi').prepend(città);

  const ripristina = document.getElementById('mappa-ripristina');
  ripristina.hidden = false;
  ripristina.addEventListener('click', () => {
    città.value = '';
    inquadra();
  });
  mappa.on('resize', e => {
    if (e.oldSize.x !== e.newSize.x) inquadra();
  });

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
