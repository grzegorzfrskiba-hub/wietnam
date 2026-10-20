/* The wildlife subpage (stage 6, finding 22): run with PAGE=wildlife, in both languages (&lang=pl at the end), at 320–1400
   px, on a link with a trip and on one without:
     PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 390 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2'
     PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 1400 'gallery&lang=pl'
   The tabs and their addresses; ✓ and ✗ only with a trip; fireflies in the day's plan in May and out of the term in
   February (the probe checks the trip's month); Dodaj with what would leave the trip; the switch EN · PL keeping the tab and
   the trip; the photo viewer; a place of the field guide; no sideways scroll; noindex and the link preview. */
(function () {
  var W = window.__wild, trip = W.trip(), hash = window.__probeHash, pl = LANG === 'pl';
  var vis = function (sel) { var e = document.querySelector(sel); return !!e && e.checkVisibility(); };
  check('the page language from the link', document.documentElement.lang === (/(&|#)lang=pl(&|$)/.test(hash) ? 'pl' : 'en'));
  check('noindex and its own link preview', !!document.querySelector('meta[name="robots"][content="noindex"]') &&
    /\/wildlife\/$/.test((document.querySelector('meta[property="og:url"]') || {}).content || '') && /og-wild\.jpg$/.test((document.querySelector('meta[property="og:image"]') || {}).content || ''));
  // the tab of the link (finding 3): with a trip On your route, without one the Gallery, unless the link names one
  var named = (hash.replace(/^#/, '').split('&')[0].match(/^(route|gallery|guide)/) || [])[1];
  var want = named || (trip ? 'route' : 'gallery');
  check('the tab of the link: ' + want, W.view().tab === want && vis('#p-' + want) && ['route', 'gallery', 'guide'].filter(function (t) { return vis('#p-' + t); }).length === 1);
  check('the tab is marked', document.querySelector('#tab-' + want).getAttribute('aria-current') === 'page');
  check('each tab has its own address, with the trip', ['route', 'gallery', 'guide'].every(function (t) {
    var h = document.querySelector('#tab-' + t).getAttribute('href');
    return h.indexOf('#' + t) === 0 && (!trip || h.indexOf('&od=') > 0) && (h.indexOf('lang=pl') > 0) === pl;
  }));
  check('the way back: the trip or the planner', document.querySelector('#w-back').getAttribute('href') === (trip ? '../' + pageHash(trip.settings, LANG, /(&|#)koszty=1(&|$)/.test(hash)) : '../' + (pl ? '#lang=pl' : '')));
  check('no sideways scroll', document.documentElement.scrollWidth <= window.innerWidth, document.documentElement.scrollWidth + ' > ' + window.innerWidth);
  // the photo at the top (finishing touches, finding 4): the red-shanked douc of Sơn Trà the page's width with the title on
  // it and its place in the corner, the tabs under it; on a laptop (1366 × 860) the tabs on the first screen
  var hero = document.querySelector('.w-hero'), him = document.querySelector('.w-hero > img'), hb = hero ? hero.getBoundingClientRect() : {};
  check('the photo at the top: the douc of Sơn Trà, the page’s width, the title and its place on it', !!him && /\/duk(-\d+)?\.jpg$/.test(him.currentSrc) &&
    Math.abs(hb.width - innerWidth) < 1 && hero.contains(document.querySelector('.w-head h1')) && hero.contains(document.querySelector('#lang-switch')) &&
    textOf('.w-where') === 'Sơn Trà, Đà Nẵng' && him.alt === (LANG === 'en' ? WILD_CAPS_EN.duk : WILD_PHOTOS.duk.cap), him && him.currentSrc);
  check('the tabs under the photo', !!hero && document.querySelector('.w-tabs').getBoundingClientRect().top >= hb.bottom - 1);
  if (innerWidth >= 1366 && window.scrollY === 0) check('on a laptop the tabs on the first screen', document.querySelector('.w-tabs').getBoundingClientRect().bottom <= 860,
    Math.round(document.querySelector('.w-tabs').getBoundingClientRect().bottom));
  // the photos loaded late with their mean colour (finding 6); the slow zoom of the photo at the top only with the class
  // live (the first call of an IntersectionObserver)
  var phs = document.querySelectorAll('img.ph');
  check('every photo loaded late has its mean colour, the one at the top none', phs.length > 20 && Array.prototype.every.call(phs, function (i) { return /^#[0-9a-f]{6}$/.test(i.getAttribute('data-ph')); }) &&
    !!him && !him.classList.contains('ph'), phs.length);
  var was = document.documentElement.classList.contains('live');
  document.documentElement.classList.add('live');
  var hz = getComputedStyle(him || document.body).animationName;
  document.documentElement.classList.toggle('live', was);
  check('live: the photo at the top zooms slowly', hz === (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : 'kb'), hz);

  // On your route: 16 cards; with a trip in two groups, the ✓ lines only with a trip
  var cards = document.querySelectorAll('#p-route .w-card');
  check('16 cards On your route', cards.length === 16, cards.length);
  // the big photos (19.10.2026): one card a row, its photo the card's width, in its frame (WILD_CROPS); where and when folded
  // under each encounter's place, the trip's lines in sight; the cards below the screen wait hidden until they reach it
  if (W.view().tab === 'route') {
    var c0 = cards[0].getBoundingClientRect(), c1 = cards[1].getBoundingClientRect(), ph = cards[0].querySelector('.w-card-photo img').getBoundingClientRect();
    check('one card a row, the photo its width', Math.round(c1.top) > Math.round(c0.bottom) && Math.round(c0.width) === Math.round(document.querySelector('#p-route .w-cards').getBoundingClientRect().width) &&
      Math.abs(ph.width - c0.width) < 3, Math.round(c0.width) + ' / ' + Math.round(ph.width));
    var ga = document.querySelector('#sp-gaur .w-card-photo img').getBoundingClientRect(), dk = document.querySelector('#sp-dukc .w-card-photo img').getBoundingClientRect();
    check('the frames: 4:3 for the gaur, 3:2 for the others', Math.abs(ga.width / ga.height - 4 / 3) < 0.02 && Math.abs(dk.width / dk.height - 1.5) < 0.02 &&
      getComputedStyle(document.querySelector('#sp-duk .w-card-photo img')).objectPosition === '50% 5%', (ga.width / ga.height).toFixed(2) + ' ' + (dk.width / dk.height).toFixed(2));
    var more = Array.prototype.slice.call(document.querySelectorAll('#p-route .w-meet > details.w-more'));
    check('each encounter folded: its place, how and the chance in sight, where and when not', more.length === document.querySelectorAll('#p-route .w-meet').length &&
      more.every(function (d) { return !d.open && d.querySelector('summary .w-kind') && d.querySelector('summary .w-chance') && !d.querySelector(':scope > p').checkVisibility(); }));
    more[0].querySelector('summary').click();
    check('a click opens where and when', more[0].open && more[0].querySelector(':scope > p').checkVisibility());
    more[0].querySelector('summary').click();
    if (trip) check('the trip’s lines in sight, not folded', Array.prototype.every.call(document.querySelectorAll('#p-route .w-meet .w-ok, #p-route .w-meet .w-no'), function (e) { return !e.closest('details') && e.checkVisibility(); }));
    var low = Array.prototype.filter.call(cards, function (x) { return x.getBoundingClientRect().top > innerHeight; });
    check('the cards below the screen wait hidden, the others not', !matchMedia('(prefers-reduced-motion: reduce)').matches ? low.length > 0 && low.every(function (x) { return x.classList.contains('w-pre'); }) &&
      !Array.prototype.some.call(cards, function (x) { return x.getBoundingClientRect().top < innerHeight - 40 && x.classList.contains('w-pre'); }) : !document.querySelector('.w-pre'), low.length);
  }
  check(trip ? 'two groups, on the trip and to add' : 'one group, no ✓ and ✗', trip ? document.querySelectorAll('#p-route .w-group').length === 2 : document.querySelectorAll('#p-route .w-group').length === 0 && !/[✓✗]/.test(document.querySelector('#p-route .w-cards').textContent));
  if (trip) {
    var month = trip.st.months[0] + 1, ff = document.querySelector('#sp-swietliki'), cz = document.querySelector('#sp-czaple');
    var onCP = !!trip.stays.cucphuong;
    if (onCP && month === 5) check('fireflies in May: on the trip and in the day’s plan', /✓/.test(ff.textContent) && ff.textContent.indexOf(L({ en: 'In the day’s plan', pl: 'W planie dnia' })) > -1);
    if (onCP && month === 2) check('fireflies in February: out of the term', ff.querySelector('.w-no') && /✗/.test(ff.querySelector('.w-no').textContent));
    if (!trip.stays.mekong && [2, 3, 4, 5, 6, 7].indexOf(month) > -1) check('egrets out of the term instead of Dodaj (finding 10)', !!cz.querySelector('.w-no') && !cz.querySelector('.w-add'));
    // butterflies in June at Cúc Phương only (IV–V there): Dodaj Cát Tiên, where they are in V–VII (final review of stage 6)
    if (onCP && !trip.stays.cattien && month === 6) check('butterflies in June: Dodaj Cát Tiên', !!document.querySelector('#sp-motyle .w-addbox') && /dodaj=cattien|Cát Tiên/.test(document.querySelector('#sp-motyle .w-addbox').innerHTML));
    // Dodaj (finding 27): a link back with dodaj=, and what would leave the trip before it
    var add = document.querySelector('#p-route .w-add');
    if (add) check('Dodaj: back to the trip with dodaj=, after what would leave it', /^\.\.\/#od=.*&dodaj=[a-z]+/.test(add.getAttribute('href')) && /dodaj=[a-z]+/.test(add.getAttribute('href')) &&
      !!add.previousElementSibling && add.previousElementSibling.className === 'w-drops');
  } else {
    var a0 = document.querySelector('#p-route .w-add');
    check('Dodaj without a trip: the planner with the place', !!a0 && /^\.\.\/#dodaj=[a-z]+(&lang=pl)?$/.test(a0.getAttribute('href')), a0 && a0.getAttribute('href'));
  }

  // the Gallery (findings 12 and 13): about 25 tiles in groups, the legends last, two without a photo
  var tiles = document.querySelectorAll('#p-gallery .w-tile');
  check('the gallery: 25 tiles, the legends last', tiles.length === 25 && document.querySelectorAll('#p-gallery .w-legend-tile').length === 5 &&
    tiles[tiles.length - 1].classList.contains('w-legend-tile'), tiles.length);
  check('two species without a photo say so', document.querySelectorAll('#p-gallery .w-nophoto').length === 2);
  // the viewer: a tile opens it with the name and the two sentences; Escape closes it and gives the focus back
  var b = document.querySelector('#p-gallery .w-tile-name');
  b.focus(); b.click();
  var d = document.querySelector('#w-viewer');
  check('a tile opens the viewer with its species', d.open && document.querySelector('#wv-name').textContent.indexOf(b.querySelector('b').textContent) === 0 && document.querySelector('#wv-why').textContent.length > 20);
  d.close();

  // the field guide (finding 14): the places from south to north, each on the trip or with Dodaj; what to avoid, beyond
  var places = document.querySelectorAll('#p-guide .w-place');
  check('the field guide: 10 places, what to avoid and beyond Route G', places.length === 10 && document.querySelectorAll('#p-guide .w-box').length === 2 && document.querySelectorAll('#p-guide .w-avoid li').length === 5);
  check('each place of the guide: on the trip, or Dodaj', Array.prototype.every.call(places, function (p) { return !!p.querySelector('.w-ok, .w-add, .w-muted'); }));
  // the guide's thumbnails (19.10.2026 and 20.10.2026): every row and every note with a photo, 22 of species' encounters,
  // 5 of the guide's rows with a species' photo, 7 rows and 7 notes with the guide's own
  var thumbs = document.querySelectorAll('#p-guide .w-row .w-row-photo[data-view] img'), notes = document.querySelectorAll('#p-guide .w-note');
  check('the field guide: a thumbnail at all 41 rows and notes, none without', thumbs.length === 41 && !document.querySelector('#p-guide .w-row-nopic') &&
    notes.length === 7 && Array.prototype.every.call(notes, function (n) { return !!n.querySelector('.w-row-photo[data-view] img'); }), thumbs.length + ', ' + notes.length + ' notes');
  // a note's text beside its thumbnail, as in a row (on a phone too; final review of the map, 19.10.2026)
  var note = notes[0], nph = note.querySelector('.w-row-photo'), ntx = note.querySelector('p');
  if (note.checkVisibility()) check('a note of the guide: its text beside its thumbnail', Math.abs(ntx.getBoundingClientRect().left - nph.getBoundingClientRect().right - 16) < 1 && Math.abs(nph.getBoundingClientRect().left - note.getBoundingClientRect().left) < 1,
    Math.round(nph.getBoundingClientRect().left) + '–' + Math.round(nph.getBoundingClientRect().right) + ', text ' + Math.round(ntx.getBoundingClientRect().left));
  // the guide's own photo (no species): the viewer names it by its caption, without a species' names and sentence
  var own = note.querySelector('.w-row-photo[data-view]'), oid = own.getAttribute('data-view');
  own.click();
  var ownCap = LANG === 'en' ? WILD_CAPS_EN[oid] : WILD_PHOTOS[oid].cap;
  check('the guide\u2019s own photo in the viewer: its caption, no species', !WILD[oid] && document.querySelector('#w-viewer').open && document.querySelector('#wv-name').textContent === ownCap &&
    document.querySelector('#wv-sci').textContent === '' && document.querySelector('#wv-why').textContent === '', oid + ': ' + document.querySelector('#wv-name').textContent);
  document.querySelector('#w-viewer').close();
  var tb0 = document.querySelector('#p-guide .w-row-photo[data-view]'), y0 = window.scrollY;
  tb0.focus({ preventScroll: true }); tb0.click();
  check('a thumbnail opens the viewer with its species', document.querySelector('#w-viewer').open && document.querySelector('#wv-name').textContent.indexOf(WILD[tb0.getAttribute('data-view')] && (LANG === 'en' ? WILD_EN : WILD)[tb0.getAttribute('data-view')].name) === 0);
  document.querySelector('#w-viewer').close();
  window.scrollTo(0, y0);   // the focus back on the thumbnail may have moved the page

  // a place of the guide in the address: its section on the screen
  if (W.view().place) {
    var sec = document.querySelector('#guide-' + W.view().place);
    // under the band with the map below 1101 px (the map of the subpage, 19.10.2026), at the top of the screen above it; the
    // fonts load after the page has moved there, so the text above it may still shrink by about 30 px in headless Chrome
    var band = innerWidth <= 1100 && document.getElementById('w-map') ? document.getElementById('w-map').getBoundingClientRect().bottom : 0;
    check('the place of the guide on the screen' + (band ? ', under the band' : ''), Math.abs(sec.getBoundingClientRect().top - band) < 60, Math.round(sec.getBoundingClientRect().top) + ' / ' + Math.round(band));
  }
  // the final review of stage 6: a wrong part of the link said as on the page with the route; all three tabs in view from
  // 320 px; the way back a 44 px target; the print only of the open tab, without the way back and without Dodaj
  // (the parts of the link the page with the route drops: app.js, settingsFromLink with the rejected fields of parseLink)
  var bad = [], told = !!document.querySelector('#p-route .w-tripbox .w-dropped');
  var defs = defaultSettings(W.today, { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS }, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
  var dropped = hasTrip(hash) && settingsFromLink(parseLink(hash, bad), defs, PLACES, HUBS, bad, SWAPS).dropped.length > 0;
  if (trip) check(dropped ? 'a wrong part of the link: said above the cards, as on the page with the route' : 'no sentence on a wrong part of the link', told === dropped &&
    (!told || document.querySelector('#p-route .w-dropped').textContent === UI[LANG]['set.dropped']));
  var tb = document.querySelector('.w-tabs');
  check('all three tabs in view', tb.scrollWidth <= tb.clientWidth + 1, tb.scrollWidth + ' > ' + tb.clientWidth);
  check('the way back: at least 44 px high', document.querySelector('#w-back').getBoundingClientRect().height >= 44, document.querySelector('#w-back').getBoundingClientRect().height);
  var printCss = [];
  Array.prototype.forEach.call(document.styleSheets, function (s) {
    Array.prototype.forEach.call(s.cssRules, function (r) { if (r.media && /print/.test(r.media.mediaText)) Array.prototype.forEach.call(r.cssRules, function (x) { printCss.push(x.cssText); }); });
  });
  var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
  window.dispatchEvent(new Event('beforeprint'));
  check('the print: every card shown, where and when unfolded', !document.querySelector('.w-pre') && !document.querySelector('details.w-more:not([open])'));
  window.dispatchEvent(new Event('afterprint'));
  check('after the print: folded again', !document.querySelector('#p-route details.w-more[open]'));
  check('the print: only the open tab, without the way back and Dodaj', ['route', 'gallery', 'guide'].filter(function (t) { return vis('#p-' + t); }).length === 1 && vis('#p-' + W.view().tab) &&
    !vis('#w-back') && !Array.prototype.some.call(document.querySelectorAll('.w-add, .w-drops'), function (e) { return e.checkVisibility(); }));
  ps.remove();
  check('the print on A4, as the page with the route', Array.prototype.some.call(document.styleSheets, function (s) {
    return Array.prototype.some.call(s.cssRules, function (r) { return r.type === CSSRule.PAGE_RULE && /size:\s*A4/i.test(r.cssText); });
  }));

  // EN · PL: the other language, the same tab and trip, lang=pl in the address or not
  var other = pl ? 'en' : 'pl', tab = W.view().tab;
  document.querySelector('#lang-switch [data-lang="' + other + '"]').click();
  check('EN · PL: the other language, the same tab and trip', document.documentElement.lang === other && W.view().tab === tab && !!W.trip() === !!trip &&
    (/(&|#)lang=pl(&|$)/.test(location.hash)) === (other === 'pl') && document.title === WUI[other]['w.doc.title']);
  // a click on another tab: its panel, its address
  var to = tab === 'gallery' ? 'guide' : 'gallery';
  location.hash = document.querySelector('#tab-' + to).getAttribute('href');
  setTimeout(function () {
    check('a tab link shows its tab', W.view().tab === to && vis('#p-' + to));
    // its cards, tiles or places on the screen are in sight at once, not waiting to come in (19.10.2026)
    check('the new tab: nothing on the screen waits hidden', !Array.prototype.some.call(document.querySelectorAll('#p-' + to + ' .w-pre'), function (e) { return e.getBoundingClientRect().top < innerHeight - 40; }));
    if (to !== 'gallery') { done(); return; }
    // on the Gallery: Escape-like close gives the focus back to the tile that opened the viewer
    var t = document.querySelector('#p-gallery .w-tile-name');
    t.focus(); t.click(); d.close();
    setTimeout(function () { check('closing the viewer gives the focus back', document.activeElement === t); done(); }, 100);
  }, 300);
})();
