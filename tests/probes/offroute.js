// The list of the places off the trip (the first round of fixes, fix 1, 16.10.2026), in the page's language (L in lib.js):
// the sentence under its heading; every place a folded row that starts closed, with its first photo small (the copy of
// 160 px), the dot in its colour, the short name and the sentence „what it is and where” in sight, and its reason, photo,
// map and Dodaj not; a keyboard reaches a row and a click opens it, the others stay closed; open: the photo, which shows
// all the place's photos on full screen with their authors, the full name with the usual stay, the line under the name,
// the reason, what would leave the trip and Dodaj; an open row stays open after a change of the language and of the trip
// while its place stays on the list; Dodaj puts the place on the trip. The map of the country by the list (the next round
// of fixes, fix 1), sticky, a dot for every row at its point on the land, lit alone by the mouse or the keyboard on its
// row; the mouse on a dot frames its row; a click on a dot opens its row; no map in an open row. Wider than 1100 px: beside
// the list, the name on the map inside it, out of the list and the map the open row's dot stays lit (none with no row
// open). Narrower: a band over the list under the bar at the top, the name beside the map, and out of the list and the map,
// and while the list scrolls, the row across the middle of the screen under the band is lit.
// tests/probe.sh tests/probes/offroute.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// and at 641, 901, 1024 and 1400 px; the keyboard (Tab, Enter) is checked by hand in a browser: a click from a script opens no row by a key
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
  check('closed, a row hides its reason, photo and Dodaj', list.every(function (d) { return !seen(d.querySelector('.off-why')) && !seen(d.querySelector('.off-photo')); }));
  var h = list[0].querySelector('summary').getBoundingClientRect().height;
  check('a row is at least 44 px high', h >= 44, Math.round(h));
  // the map of the country by the list
  var big = document.getElementById('off-big'), wide = innerWidth > 1100, split = document.querySelector('.off-split');
  function pts() { return Array.prototype.slice.call(big.querySelectorAll('.bm-pt')); }
  function lit() { return pts().filter(function (g) { return g.classList.contains('on'); }).map(function (g) { return g.getAttribute('data-off'); }).join(', '); }
  function framed() { return rows().filter(function (d) { return d.parentNode.classList.contains('lit'); }).map(idOf).join(', '); }
  function over(el) { el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); }
  // the row across the middle of the screen under the band, as the band lights it (the first while the list is under it)
  function midRow() {
    var line = (Math.max(big.getBoundingClientRect().bottom, 0) + innerHeight) / 2, r = rows();
    return idOf(r.filter(function (d) { return d.parentNode.getBoundingClientRect().bottom > line; })[0] || r[r.length - 1]);
  }
  var bigSvg = big.querySelector('svg'), listBox = document.getElementById('offroute-list').getBoundingClientRect(), bb = big.getBoundingClientRect();
  if (wide) check('wide: the map beside the list, sticky', seen(bigSvg) && getComputedStyle(big).position === 'sticky' && bb.left >= listBox.right + 39,
    Math.round(bb.left) + ' / ' + Math.round(listBox.right));
  else check('narrower: the map in a band over the list, sticky under the bar, 180 px high, the name beside it', seen(bigSvg) && getComputedStyle(big).position === 'sticky' &&
    getComputedStyle(big).top === '46px' && bb.bottom <= listBox.top && Math.round(bigSvg.getBoundingClientRect().height) === 180 && seen(big.querySelector('.bm-name')),
    Math.round(bb.bottom) + ' / ' + Math.round(listBox.top) + ', ' + Math.round(bigSvg.getBoundingClientRect().height));
  check('a dot on the map for every row, in its order', pts().length === list.length && pts().every(function (g, i) { return g.getAttribute('data-off') === idOf(list[i]); }), pts().length + ' / ' + list.length);
  var s = COUNTRY_MAP.width / (COUNTRY_MAP.lon1 - COUNTRY_MAP.lon0), bigLand = bigSvg.querySelector('.bm-land');
  var offPt = pts().filter(function (g) {
    var q = g.querySelector('.bm-dot'), pt = CONTENT[g.getAttribute('data-off')].pt;
    return Math.abs(+q.getAttribute('cx') - (pt[1] - COUNTRY_MAP.lon0) * s) >= 0.11 || Math.abs(+q.getAttribute('cy') - (COUNTRY_MAP.lat0 - pt[0]) * s) >= 0.11;
  }).map(function (g) { return g.getAttribute('data-off'); });
  check('every dot at its place\'s point', !offPt.length, offPt.join(', '));
  // on the land: its point or one 6 px off it, for a place on the coast (2 px on the small map of 120 px of the first round)
  var offLand = pts().filter(function (g) {
    var q = g.querySelector('.bm-dot'), x = +q.getAttribute('cx'), y = +q.getAttribute('cy');
    return ![[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]].some(function (v) { return bigLand.isPointInFill(new DOMPoint(x + v[0], y + v[1])); });
  }).map(function (g) { return g.getAttribute('data-off'); });
  check('every dot lies on the land', !offLand.length, offLand.join(', '));
  if (wide) check('at first no dot is lit', lit() === '' && framed() === '', lit());
  else check('at first the band lights the first row', lit() === idOf(list[0]) && framed() === idOf(list[0]) && flat(textOf('#off-big .bm-name')) === flat(CE[idOf(list[0])].short), lit() + ' / ' + textOf('#off-big .bm-name'));
  over(list[2].querySelector('.off-what'));
  check('the mouse on a row lights its dot alone and frames the row', lit() === idOf(list[2]) && framed() === idOf(list[2]), lit() + ' / ' + framed());
  if (wide) {
    var name = big.querySelector('.bm-pt.on text'), nb = name.getBBox(), vb = bigSvg.viewBox.baseVal;
    check('the lit dot has its name, inside the map', flat(name.textContent) === flat(CE[idOf(list[2])].short) && nb.x >= 0 && nb.x + nb.width <= vb.width,
      Math.round(nb.x) + '..' + Math.round(nb.x + nb.width) + ' / ' + vb.width);
    var outOfMap = pts().filter(function (g) { var b = g.querySelector('text').getBBox(); return b.x < 0 || b.x + b.width > vb.width; }).map(function (g) { return g.getAttribute('data-off'); });
    check('every name of the map inside it', !outOfMap.length, outOfMap.join(', '));
  } else check('the band names the lit place beside the map', flat(textOf('#off-big .bm-name')) === flat(CE[idOf(list[2])].short), textOf('#off-big .bm-name'));
  over(pts()[4].querySelector('.bm-dot'));
  check('the mouse on a dot lights it and frames its row', lit() === idOf(list[4]) && framed() === idOf(list[4]), lit() + ' / ' + framed());
  split.dispatchEvent(new MouseEvent('mouseleave'));
  if (wide) check('out of the list and the map, with no row open, no dot is lit', lit() === '' && framed() === '', lit());
  else check('out of the list and the map, the band lights the row in the middle', lit() === midRow(), lit() + ' / ' + midRow());
  list[1].querySelector('summary').focus();
  check('the keyboard on a row lights its dot', lit() === idOf(list[1]), lit());
  // a row with Dodaj: a keyboard reaches it, a click opens it and leaves the others closed
  var row = list.filter(function (d) { return d.querySelector('[data-add]'); })[0], id = idOf(row), sum = row.querySelector('summary');
  sum.focus();
  check('a keyboard reaches the row', document.activeElement === sum);
  sum.click();
  check('a click opens the row, the others stay closed', row.open && list.filter(function (d) { return d.open; }).length === 1);
  over(list[0].querySelector('summary'));
  split.dispatchEvent(new MouseEvent('mouseleave'));
  if (wide) check('out of the list and the map, the open row\'s dot stays lit', lit() === id, lit());
  else check('out of the list and the map, the band lights the row in the middle', lit() === midRow(), lit() + ' / ' + midRow());
  var c = CE[id], stay = flat(textOf('#offroute-list details[open] .off-stay'));
  check('open: the full name with the usual stay, and the line under the name', stay === flat(c.name) + ' · ' + L({ en: 'usually ', pl: 'zwykle ' }) + PLACES[id].nights[1] + ' ' +
    L({ en: PLACES[id].nights[1] === 1 ? 'night' : 'nights', pl: PLACES[id].nights[1] === 1 ? 'noc' : PLACES[id].nights[1] < 5 ? 'noce' : 'nocy' }) && flat(textOf('#offroute-list details[open] .off-sub')) === flat(c.sub), stay);
  check('open: the photo, the reason, what would leave the trip and Dodaj in sight', seen(row.querySelector('.off-photo img')) && seen(row.querySelector('.off-why')) &&
    seen(row.querySelector('.off-drops')) && seen(row.querySelector('[data-add]')));
  var mapsIn = Array.prototype.filter.call(row.querySelectorAll('.off-more svg'), function (g) { return !g.closest('.off-photo'); }).length;
  check('open: no map in the row, the place is on the map by the list', !mapsIn && !row.querySelector('figure'), mapsIn);
  // the photo: all the place's photos on full screen, with their authors and licences
  row.querySelector('.off-photo').click();
  var lb = document.getElementById('lightbox');
  check('the photo opens all the place\'s photos on full screen, with their authors', !lb.hidden && textOf('#lb-count') === '1 / ' + CONTENT[id].photos.length && /\S/.test(textOf('#lb-credit')),
    textOf('#lb-count') + ' ' + textOf('#lb-credit'));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  check('Escape closes the photos', lb.hidden);
  // a click on a dot of the big map opens its row and lights it
  var shut = list.filter(function (d) { return !d.open; })[0];
  big.querySelector('.bm-pt[data-off="' + idOf(shut) + '"] .bm-dot').dispatchEvent(new MouseEvent('click', { bubbles: true }));
  check('a click on a dot opens its row and lights it', shut.open && lit() === idOf(shut) && framed() === idOf(shut), lit());
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
  // the band while the list scrolls: the row across the middle of the screen under it lights, its name beside the map
  if (wide) return done();
  var r6 = rows()[Math.min(5, rows().length - 1)].parentNode, line = (46 + big.getBoundingClientRect().height + innerHeight) / 2;
  window.scrollTo(0, window.scrollY + r6.getBoundingClientRect().top + r6.getBoundingClientRect().height / 2 - line);
  window.dispatchEvent(new Event('scroll'));
  setTimeout(function () {
    var want = idOf(r6.querySelector('details'));
    check('scrolled: the band stands under the bar at the top', Math.round(big.getBoundingClientRect().top) === 46, Math.round(big.getBoundingClientRect().top));
    check('scrolled: the row in the middle under the band is lit, its name beside the map', lit() === want && framed() === want && flat(textOf('#off-big .bm-name')) === flat(CE[want].short),
      lit() + ' / ' + want);
    done();
  }, 300);
}, 1500);
