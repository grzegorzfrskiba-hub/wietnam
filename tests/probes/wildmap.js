/* The map of the wildlife subpage (19.10.2026, notes/plans/2026-10-19-mapa-zwierzat-projekt.md): run with PAGE=wildlife, in
   both languages (&lang=pl at the end), at 390, 1024, 1400 and 1920 px, on a link with a trip and on one without:
     PAGE=wildlife bash tests/probe.sh tests/probes/wildmap.js 1400 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2'
     PAGE=wildlife bash tests/probe.sh tests/probes/wildmap.js 390 'gallery&lang=pl'
   The map beside the tabs from 1101 px, sticky, a band over them below; a dot at every place of the field guide at its point
   on the land, a ring for a place off the trip, the points beyond Route G hidden until lit; in each tab the item across the
   middle of the screen lights its places, with their names (and days on the trip) in the caption: a card with two places,
   a row of the Gallery with a legend's point, a species without a place, a place of the field guide, "Poza Route G"; two
   close names do not cover each other; the mouse on an item lights it, on a dot frames its items, a click on a dot brings
   its first item to the middle; the printout lights every place of the field guide. The pulse and the sticky map while
   scrolling by hand are checked in a browser. */
(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  // no transitions, so a dot is shown or hidden at once (headless Chrome runs them on its own clock)
  var still = document.createElement('style'); still.textContent = '* { transition: none !important; }'; document.head.appendChild(still);
  var W = window.__wild, trip = W.trip(), wide = innerWidth > 1100, map = document.getElementById('w-map'), svg = map.querySelector('svg');
  var GP = Object.keys(WILD_GUIDE), SPOTS = Object.keys(WILD_SPOTS), CE = LANG === 'en' ? CONTENT_EN : CONTENT;
  function flat(t) { return String(t).replace(/[\s\u2060\u00a0]+/g, ' ').trim(); }
  function pts() { return Array.prototype.slice.call(map.querySelectorAll('.bm-pt')); }
  function lit() { return pts().filter(function (g) { return g.classList.contains('on'); }).map(function (g) { return g.getAttribute('data-p'); }).sort().join(' '); }
  function caption() { return Array.prototype.map.call(map.querySelectorAll('.w-map-name'), function (e) { return flat(e.textContent); }).join(' | '); }
  function nameOf(p) { return WILD_SPOTS[p] ? WILD_SPOTS[p].short : CE[p].short; }
  function shown(g) { return +getComputedStyle(g.querySelector('.bm-dot')).opacity > 0.9; }
  function line() { return wide ? innerHeight / 2 : (Math.max(map.getBoundingClientRect().bottom, 0) + innerHeight) / 2; }
  function boxOf(els) {
    var r = els.map(function (e) { return e.getBoundingClientRect(); });
    return { top: Math.min.apply(null, r.map(function (b) { return b.top; })), bottom: Math.max.apply(null, r.map(function (b) { return b.bottom; })) };
  }
  // the item to the middle of the screen (twice: the band sticks only once the page has scrolled), then the page's own
  // scroll handler, a frame later
  function toMiddle(els, then) {
    for (var k = 0; k < 2; k++) { var b = boxOf(els); window.scrollBy(0, (b.top + b.bottom) / 2 - line()); }
    window.dispatchEvent(new Event('scroll'));
    setTimeout(then, 450);   // after the dots' transition of .3 s
  }
  function tab(t, then) { location.hash = document.querySelector('#tab-' + t).getAttribute('href'); setTimeout(then, 300); }
  // the cards or the tiles in the row of the species id, as they stand now, and their species
  function rowOf(id) {
    var el = document.getElementById('sp-' + id), sel = '#p-route .w-card';
    if (!el || !el.checkVisibility()) { el = document.querySelector('#p-gallery [data-view="' + id + '"]').closest('.w-tile'); sel = '#p-gallery .w-tile'; }
    var top = Math.round(el.getBoundingClientRect().top);
    return Array.prototype.filter.call(document.querySelectorAll(sel), function (x) { return Math.abs(Math.round(x.getBoundingClientRect().top) - top) <= 2; });
  }
  function idsOf(row) { return row.map(function (x) { return x.id ? x.id.slice(3) : x.querySelector('[data-view]').getAttribute('data-view'); }); }
  function placesOf(ids) {
    var out = [];
    ids.forEach(function (id) { speciesPlaces(WILD[id]).forEach(function (p) { if (out.indexOf(p) < 0) out.push(p); }); });
    return out.sort().join(' ');
  }

  // the map and its dots
  check('the map hidden from a screen reader', map.getAttribute('aria-hidden') === 'true' && !!svg);
  var panels = document.querySelector('.w-panels').getBoundingClientRect(), mb = map.getBoundingClientRect();
  if (wide) check('wide: the map beside the tabs, sticky 16 px from the top', getComputedStyle(map).position === 'sticky' && getComputedStyle(map).top === '16px' && mb.left >= panels.right + 39,
    Math.round(mb.left) + ' / ' + Math.round(panels.right));
  else check('narrower: the map in a band over the tabs, sticky at the top, 180 px high', getComputedStyle(map).position === 'sticky' && getComputedStyle(map).top === '0px' &&
    map.nextElementSibling === document.querySelector('.w-panels') && getComputedStyle(map).display === 'flex' && Math.round(svg.getBoundingClientRect().height) === 180,
    getComputedStyle(map).display + ', ' + Math.round(svg.getBoundingClientRect().height));
  check('a dot at every place of the field guide, then every point beyond Route G', pts().map(function (g) { return g.getAttribute('data-p'); }).join(' ') === GP.concat(SPOTS).join(' '));
  var s = COUNTRY_MAP.width / (COUNTRY_MAP.lon1 - COUNTRY_MAP.lon0), land = svg.querySelector('.bm-land');
  var off = pts().filter(function (g) {
    var p = g.getAttribute('data-p'), pt = (WILD_SPOTS[p] || CONTENT[p]).pt, q = g.querySelector('.bm-dot'), x = +q.getAttribute('cx'), y = +q.getAttribute('cy');
    var at = Math.abs(x - (pt[1] - COUNTRY_MAP.lon0) * s) < 0.11 && Math.abs(y - (COUNTRY_MAP.lat0 - pt[0]) * s) < 0.11;
    // on the land, or Côn Đảo, an island too small for the outline
    return !at || p !== 'condao' && ![[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]].some(function (v) { return land.isPointInFill(new DOMPoint(x + v[0], y + v[1])); });
  }).map(function (g) { return g.getAttribute('data-p'); });
  check('every dot at its point, on the land (Côn Đảo off the outline)', !off.length, off.join(', '));
  var rings = pts().filter(function (g) { return g.classList.contains('ring'); }).map(function (g) { return g.getAttribute('data-p'); }).join(' ');
  check(trip ? 'a ring for each place of the field guide off the trip' : 'without a trip no rings', rings === (trip ? GP.filter(function (p) { return !trip.stays[p]; }).join(' ') : ''), rings);
  check(trip ? 'the caption says what a ring means' : 'without a trip no key', !!map.querySelector('.w-map-key') === !!trip);
  check('the points beyond Route G hidden while not lit', pts().filter(function (g) { return g.classList.contains('spot') && !g.classList.contains('on'); }).every(function (g) { return !shown(g); }));
  check('no sideways scroll', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);

  // a link to a place of the field guide (the way in from the page with the route): the map lights that place, however
  // short its section at the top of the screen (final review of the map, 19.10.2026)
  function placeLink(then) {
    var p = W.view().place;
    if (!p) return then();
    setTimeout(function () {
      check('a link to a place of the field guide lights that place', lit() === p, lit() + ' / ' + p);
      then();
    }, 600);
  }

  // On your route: a card with two places across the middle lights both (with the cards beside it in its row), named in
  // the caption, the days of a place on the trip
  placeLink(function () { tab('route', function () {
    var row = rowOf('lutungb');
    toMiddle(row, function () {
      check('a card across the middle lights its places', lit() === placesOf(idsOf(row)) && /cucphuong ninhbinh|cucphuong .*ninhbinh/.test(lit()), lit());
      var cp = trip && trip.stays.cucphuong, days = cp ? (cp[0].first === cp[cp.length - 1].last ? WUI[LANG]['w.day'].replace('{n}', cp[0].first) : WUI[LANG]['w.days'].replace('{a}', cp[0].first).replace('{b}', cp[cp.length - 1].last)) : null;
      check('the caption names them, with the days on the trip', caption().indexOf(flat(nameOf('ninhbinh'))) > -1 && caption().indexOf(flat(nameOf('cucphuong')) + (days ? ' · ' + flat(days) : '')) > -1, caption());
      if (wide) {
        var a = map.querySelector('.bm-pt[data-p="cucphuong"] text').getBBox(), b = map.querySelector('.bm-pt[data-p="ninhbinh"] text').getBBox(), vb = svg.viewBox.baseVal;
        check('two close names do not cover each other, inside the map', (a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y) &&
          [a, b].every(function (x) { return x.x >= 0 && x.x + x.width <= vb.width; }), [a, b].map(function (x) { return Math.round(x.x) + '+' + Math.round(x.width); }).join(', '));
      }
      // the mouse on another card lights its row instead; out of the tabs, the middle again
      var other = document.getElementById('sp-gaur'), r;
      other.scrollIntoView({ block: 'start' });
      window.scrollBy(0, -40);
      r = other.getBoundingClientRect();
      var x = r.left + 20, y = Math.max(r.top, map.getBoundingClientRect().bottom, 0) + 20, under = document.elementFromPoint(x, y);
      under.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', clientX: x, clientY: y, bubbles: true }));
      setTimeout(function () {
        check('the mouse on a card lights its places', lit() === placesOf(idsOf(rowOf('gaur'))), lit() + ' / ' + under.className);
        document.querySelector('.w-panels').dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'mouse' }));
        setTimeout(function () {
          var items = Array.prototype.slice.call(document.querySelectorAll('#p-route .w-card')), l = line();
          var mid = items.filter(function (c) { return c.getBoundingClientRect().bottom > l; })[0] || items[items.length - 1];
          check('the mouse out of the tabs: the card across the middle again', lit() === placesOf(idsOf(rowOf(mid.id.slice(3)))), lit() + ' / ' + mid.id);
          // a dot frames the cards of its place; a click on it brings the first of them to the middle and lights it
          var dot = map.querySelector('.bm-pt[data-p="cattien"] .bm-dot');
          dot.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          var framed = Array.prototype.filter.call(document.querySelectorAll('#p-route .w-card'), function (c) { return c.classList.contains('w-lit'); }).map(function (c) { return c.id.slice(3); });
          var want = Object.keys(WILD).filter(function (id) { return WILD[id].route && speciesPlaces(WILD[id]).indexOf('cattien') > -1; });
          check('the mouse on a dot frames the cards of its place', framed.sort().join(' ') === want.sort().join(' '), framed.join(' '));
          map.dispatchEvent(new MouseEvent('mouseleave'));
          check('out of the map no frames', !document.querySelector('.w-lit'));
          window.scrollTo(0, 0);
          dot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          setTimeout(function () {
            var first = Array.prototype.filter.call(document.querySelectorAll('#p-route .w-card'), function (c) { return speciesPlaces(WILD[c.id.slice(3)]).indexOf('cattien') > -1; })[0], b = first.getBoundingClientRect();
            check('a click on a dot: the first card of its place on the screen, lit', b.top < innerHeight && b.bottom > 0 && lit() === placesOf(idsOf(rowOf(first.id.slice(3)))) && lit().indexOf('cattien') > -1,
              first.id + ' ' + Math.round(b.top) + ' / ' + lit());
            // the printout: every place of the field guide lit and named; after it, the middle again
            window.dispatchEvent(new Event('beforeprint'));
            check('the printout: every place of the field guide lit', lit() === GP.slice().sort().join(' '), lit());
            window.dispatchEvent(new Event('afterprint'));
            gallery();
          }, 300);
        }, 250);
      }, 250);
    });
  }); });

  // the Gallery: a row lights the places of its tiles, a legend its grey point, a species without a place says so
  function gallery() {
    tab('gallery', function () {
      var row = rowOf('rokselana');
      toMiddle(row, function () {
        var ids = idsOf(row);
        check('a row of the Gallery lights the places of its tiles', lit() === placesOf(ids), lit() + ' / ' + ids.join(' '));
        var kc = map.querySelector('.bm-pt[data-p="khauca"]');
        check('a legend: its grey point shown, named beyond Route G', kc.classList.contains('on') && shown(kc) &&
          caption().indexOf('Khau Ca · ' + L({ en: 'beyond Route G', pl: 'poza Route G' })) > -1, caption());
        var tr = rowOf('troides');
        toMiddle(tr, function () {
          var only = idsOf(tr).every(function (id) { return !speciesPlaces(WILD[id]).length; });
          if (only) check('a species without a place: no dot lit, the caption says so', lit() === '' && caption() === L({ en: 'No confirmed place to show on the map.', pl: 'Bez potwierdzonego miejsca do pokazania na mapie.' }), lit() + ' / ' + caption());
          guide();
        });
      });
    });
  }

  // the field guide: a place lights itself, Beyond Route G (Poza Route G) its five points
  function guide() {
    tab('guide', function () {
      toMiddle([document.getElementById('guide-cattien')], function () {
        check('a place of the field guide lights itself', lit() === 'cattien', lit());
        toMiddle([document.querySelector('#p-guide .w-out')], function () {
          check('Beyond Route G lights its five points', lit() === SPOTS.slice().sort().join(' ') && pts().filter(function (g) { return g.classList.contains('spot'); }).every(shown), lit());
          check('no sideways scroll at the end', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);
          ends(['route', 'gallery', 'guide']);
        });
      });
    });
  }

  // the end of each tab (final review of the map, 19.10.2026): the map stays where it sticks, every lit dot on the screen,
  // also on a laptop's low screen (H=768 before probe.sh)
  function ends(list) {
    if (!list.length) return done();
    tab(list[0], function () {
      window.scrollTo(0, document.documentElement.scrollHeight);
      window.dispatchEvent(new Event('scroll'));
      setTimeout(function () {
        var top = map.getBoundingClientRect().top, off = pts().filter(function (g) { return g.classList.contains('on') && g.querySelector('.bm-dot').getBoundingClientRect().top < 0; });
        check('the end of ' + list[0] + ': the map where it sticks, every lit dot on the screen', (wide ? top >= 15.5 : top >= -0.5) && !off.length,
          'top ' + Math.round(top) + (off.length ? ', above the screen: ' + off.map(function (g) { return g.getAttribute('data-p'); }).join(' ') : ''));
        ends(list.slice(1));
      }, 450);
    });
  }
})();
