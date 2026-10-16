// The list of the places off the trip (the first round of fixes, fix 1, 16.10.2026), in the page's language (L in lib.js):
// the sentence under its heading; every place a folded row that starts closed, with its first photo small (the copy of
// 160 px), the dot in its colour, the short name and the sentence „what it is and where” in sight, and its reason, photo,
// map and Dodaj not; a keyboard reaches a row and a click opens it, the others stay closed; open: the photo, which shows
// all the place's photos on full screen with their authors, the full name with the usual stay, the line under the name,
// the reason, what would leave the trip and Dodaj, and the small map of the country: its outline, the trip as lines, the
// place as a dot at its point, on the land; an open row stays open after a change of the language and of the trip while
// its place stays on the list; Dodaj puts the place on the trip.
// tests/probe.sh tests/probes/offroute.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// and at 641, 901 and 1400 px; the keyboard (Tab, Enter) is checked by hand in a browser: a click from a script opens no row by a key
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  function seen(el) { return !!el && el.checkVisibility(); }
  function flat(t) { return String(t).replace(/[\s\u2060]+/g, ' ').trim(); }
  function rows() { return Array.prototype.map.call(document.querySelectorAll('#offroute-list > li'), function (li) { return li.querySelector(':scope > details'); }); }
  function idOf(d) { return d.getAttribute('data-fold').replace(/^off-/, ''); }
  var list = rows(), CE = LANG === 'en' ? CONTENT_EN : CONTENT;
  check('the sentence under the heading', textOf('.off-p') === L({ en: 'Open a place to see what is there, why it is not on your route and what would leave the route if you add it.',
    pl: 'Rozwiń miejsce, żeby zobaczyć, co tam jest, dlaczego nie ma go na trasie i co wypadnie po dodaniu.' }), textOf('.off-p'));
  check('every place off the trip is a folded row, all closed', list.length > 5 && list.every(function (d) { return d && !d.open; }), list.length);
  var bad = list.filter(function (d) {
    var id = idOf(d), s = d.querySelector('summary'), im = s.querySelector('.off-thumb img');
    return !im || !/-160\.jpg$/.test(im.currentSrc) || !s.querySelector('.dot') || flat(s.querySelector('.off-name b').textContent) !== flat(CE[id].short) ||
      flat(s.querySelector('.off-what').textContent) !== flat(CE[id].what);
  }).map(idOf);
  check('each row: the first photo small (160 px), the dot, the short name and its sentence', !bad.length, bad.join(', '));
  check('closed, a row hides its reason, photo, map and Dodaj', list.every(function (d) { return !seen(d.querySelector('.off-why')) && !seen(d.querySelector('.off-map')) && !seen(d.querySelector('.off-photo')); }));
  var h = list[0].querySelector('summary').getBoundingClientRect().height;
  check('a row is at least 44 px high', h >= 44, Math.round(h));
  // a row with Dodaj: a keyboard reaches it, a click opens it and leaves the others closed
  var row = list.filter(function (d) { return d.querySelector('[data-add]'); })[0], id = idOf(row), sum = row.querySelector('summary');
  sum.focus();
  check('a keyboard reaches the row', document.activeElement === sum);
  sum.click();
  check('a click opens the row, the others stay closed', row.open && list.filter(function (d) { return d.open; }).length === 1);
  var c = CE[id], stay = flat(textOf('#offroute-list details[open] .off-stay'));
  check('open: the full name with the usual stay, and the line under the name', stay === flat(c.name) + ' · ' + L({ en: 'usually ', pl: 'zwykle ' }) + PLACES[id].nights[1] + ' ' +
    L({ en: PLACES[id].nights[1] === 1 ? 'night' : 'nights', pl: PLACES[id].nights[1] === 1 ? 'noc' : PLACES[id].nights[1] < 5 ? 'noce' : 'nocy' }) && flat(textOf('#offroute-list details[open] .off-sub')) === flat(c.sub), stay);
  check('open: the photo, the reason, what would leave the trip and Dodaj in sight', seen(row.querySelector('.off-photo img')) && seen(row.querySelector('.off-why')) &&
    seen(row.querySelector('.off-drops')) && seen(row.querySelector('[data-add]')));
  // the small map: the outline of the country, the trip, the place at its point (COUNTRY_MAP), on the land
  var svg = row.querySelector('.off-map svg'), land = svg && svg.querySelector('.cm-land'), dot = svg && svg.querySelector('.cm-dot');
  var s = COUNTRY_MAP.width / (COUNTRY_MAP.lon1 - COUNTRY_MAP.lon0), pt = CONTENT[id].pt;
  check('open: the small map with the outline, the trip and the dot', seen(svg) && !!land && svg.querySelectorAll('.cm-road, .cm-fly').length > 2 && !!dot);
  check('the dot at the place\'s point', Math.abs(+dot.getAttribute('cx') - (pt[1] - COUNTRY_MAP.lon0) * s) < 0.11 && Math.abs(+dot.getAttribute('cy') - (COUNTRY_MAP.lat0 - pt[0]) * s) < 0.11,
    dot.getAttribute('cx') + ', ' + dot.getAttribute('cy'));
  // every place's dot lies on the land of the outline (its point or one 2 px off it, for a place on the coast)
  var off = list.filter(function (d) {
    var g = d.querySelector('.off-map svg'), l = g.querySelector('.cm-land'), q = g.querySelector('.cm-dot'), x = +q.getAttribute('cx'), y = +q.getAttribute('cy');
    return ![[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2]].some(function (v) { return l.isPointInFill(new DOMPoint(x + v[0], y + v[1])); });
  }).map(idOf);
  check('every place\'s dot lies on the land of the outline', !off.length, off.join(', '));
  check('the map is narrower than its row and has a short legend', svg.getBoundingClientRect().width <= 100 && /\S/.test(textOf('#offroute-list details[open] .cm-legend')), textOf('#offroute-list details[open] .cm-legend'));
  // the photo: all the place's photos on full screen, with their authors and licences
  row.querySelector('.off-photo').click();
  var lb = document.getElementById('lightbox');
  check('the photo opens all the place\'s photos on full screen, with their authors', !lb.hidden && textOf('#lb-count') === '1 / ' + CONTENT[id].photos.length && /\S/.test(textOf('#lb-credit')),
    textOf('#lb-count') + ' ' + textOf('#lb-credit'));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  check('Escape closes the photos', lb.hidden);
  // the language: the open row stays open
  var sw = document.getElementById('lang-switch'), other = sw.querySelector('[aria-pressed="false"]');
  other.focus();
  other.click();
  function isOpen(k) { var d = document.querySelector('details[data-fold="off-' + k + '"]'); return !!d && d.open; }
  check('after a change of the language the row stays open', isOpen(id));
  sw.querySelector('[aria-pressed="false"]').click();
  // another place added: the trip changes, the open row stays open while its place is still off the trip
  var next = rows().filter(function (d) { return idOf(d) !== id && d.querySelector('[data-add]'); })[0], nid = idOf(next);
  next.querySelector('[data-add]').click();
  var still = rows().some(function (d) { return idOf(d) === id; });
  check('after a change of the trip the row stays open while its place is on the list', !still || isOpen(id), nid + ' added; ' + id + (still ? ' on the list' : ' gone'));
  // Dodaj in the open row puts its place on the trip
  if (still) {
    document.querySelector('details[data-fold="off-' + id + '"] [data-add]').click();
    check('Dodaj puts the place on the trip and it leaves the list', window.__trip.state.route.stops.some(function (x) { return x.id === id; }) && !document.querySelector('details[data-fold="off-' + id + '"]'));
  }
  done();
}, 1500);
