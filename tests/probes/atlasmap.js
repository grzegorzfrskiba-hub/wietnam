/* The map of the atlas (stage 7, findings 12, 13, 15 and 23): run with PAGE=atlas, in both languages (&lang=pl at the end),
   at 390, 1024, 1400 px (H=768 for a laptop), on a link with a trip, on one without and on one with a place:
     PAGE=atlas bash tests/probe.sh tests/probes/atlasmap.js 1400 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2'
     PAGE=atlas bash tests/probe.sh tests/probes/atlasmap.js 390 'hoian&lang=pl'
   The map beside the cards from 1101 px, sticky, a band over them below; a dot at each of the 20 places at its point on the
   land, a ring for a place off the trip; the card across the middle of the screen lights its place, with its name and days
   in the caption, a region's heading all its places, without names; the mouse or the focus on a card lights it, the mouse
   on a dot frames its card, a click on a dot brings the card to the top; cards below the screen wait to rise; at the end of
   the page the map stays where it sticks; the printout numbers every place on the map and on its card. The pulse and the
   sticky map while scrolling by hand are checked in a browser. */
(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  // no transitions, so a dot is shown or hidden at once (headless Chrome runs them on its own clock)
  var still = document.createElement('style'); still.textContent = '* { transition: none !important; }'; document.head.appendChild(still);
  var A = window.__atlas, trip = A.trip(), IDS = A.ids, wide = innerWidth > 1100, map = document.getElementById('a-map'), svg = map.querySelector('svg');
  var CE = LANG === 'pl' ? CONTENT : localContent(CONTENT, CONTENT_EN);
  function flat(t) { return String(t).replace(/\u2060/g, '').replace(/[\s\u00a0]+/g, ' ').trim(); }
  function pts() { return Array.prototype.slice.call(map.querySelectorAll('.bm-pt')); }
  function lit() { return pts().filter(function (g) { return g.classList.contains('on'); }).map(function (g) { return g.getAttribute('data-p'); }).sort().join(' '); }
  function named() { return pts().filter(function (g) { return g.classList.contains('named'); }).map(function (g) { return g.getAttribute('data-p'); }).join(' '); }
  function caption() { return Array.prototype.map.call(map.querySelectorAll('.w-map-name'), function (e) { return flat(e.textContent); }).join(' | '); }
  function line() { return wide ? innerHeight / 2 : (Math.max(map.getBoundingClientRect().bottom, 0) + innerHeight) / 2; }
  function T(k) { return AUI[LANG].hasOwnProperty(k) ? AUI[LANG][k] : WUI[LANG].hasOwnProperty(k) ? WUI[LANG][k] : UI[LANG][k]; }
  function days(id) {
    return trip.stays[id].map(function (s) { return s.first === s.last ? T('w.day').replace('{n}', s.first) : T('w.days').replace('{a}', s.first).replace('{b}', s.last); }).join(' ' + UI[LANG].and + ' ');
  }
  // an element to the middle of the screen (twice: the band sticks only once the page has scrolled), then the page's own
  // scroll handler; a tall card by a point inside it, so that the line falls on it
  function toMiddle(el, then, at) {
    for (var k = 0; k < 2; k++) { var b = el.getBoundingClientRect(), y = at == null ? (b.top + b.bottom) / 2 : b.top + at; window.scrollBy(0, y - line()); }
    window.dispatchEvent(new Event('scroll'));
    setTimeout(then, 400);
  }

  // the map and its dots
  check('the map hidden from a screen reader', map.getAttribute('aria-hidden') === 'true' && !!svg);
  var panels = document.getElementById('a-panels').getBoundingClientRect(), mb = map.getBoundingClientRect();
  if (wide) check('wide: the map beside the cards, sticky 16 px from the top', getComputedStyle(map).position === 'sticky' && getComputedStyle(map).top === '16px' && mb.left >= panels.right + 39,
    Math.round(mb.left) + ' / ' + Math.round(panels.right));
  else check('narrower: the map in a band over the cards, sticky at the top, 180 px high', getComputedStyle(map).position === 'sticky' && getComputedStyle(map).top === '0px' &&
    map.nextElementSibling === document.getElementById('a-panels') && getComputedStyle(map).display === 'flex' && Math.round(svg.getBoundingClientRect().height) === 180,
    getComputedStyle(map).display + ', ' + Math.round(svg.getBoundingClientRect().height));
  check('a dot at each of the 20 places, in the atlas’s order', pts().map(function (g) { return g.getAttribute('data-p'); }).join(' ') === IDS.join(' '));
  var s = COUNTRY_MAP.width / (COUNTRY_MAP.lon1 - COUNTRY_MAP.lon0), land = svg.querySelector('.bm-land');
  var off = pts().filter(function (g) {
    var p = g.getAttribute('data-p'), pt = CONTENT[p].pt, q = g.querySelector('.bm-dot'), x = +q.getAttribute('cx'), y = +q.getAttribute('cy');
    var at = Math.abs(x - (pt[1] - COUNTRY_MAP.lon0) * s) < 0.11 && Math.abs(y - (COUNTRY_MAP.lat0 - pt[0]) * s) < 0.11;
    return !at || ![[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]].some(function (v) { return land.isPointInFill(new DOMPoint(x + v[0], y + v[1])); });
  }).map(function (g) { return g.getAttribute('data-p'); });
  check('every dot at its point, on the land', !off.length, off.join(', '));
  var rings = pts().filter(function (g) { return g.classList.contains('ring'); }).map(function (g) { return g.getAttribute('data-p'); }).join(' ');
  check(trip ? 'a ring for each place off the trip, the trip’s roads and stays' : 'without a trip no rings, no roads', rings === (trip ? IDS.filter(function (p) { return !trip.stays[p]; }).join(' ') : '') &&
    !!svg.querySelector('.bm-road, .bm-fly') === !!trip && svg.querySelectorAll('.bm-stay').length === (trip ? trip.route.stops.length : 0), rings);
  check(trip ? 'the caption says what a ring means' : 'without a trip no key', !!map.querySelector('.w-map-key') === !!trip);
  check('no sideways scroll', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);
  // the cards below the screen wait to rise, those on it not (finding 15)
  var cards = Array.prototype.slice.call(document.querySelectorAll('.a-card')), stillMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var below = cards.filter(function (c) { return c.getBoundingClientRect().top > innerHeight; }), seen = cards.filter(function (c) { return c.getBoundingClientRect().top < innerHeight - 40 && !c.classList.contains('a-pre'); });
  check('the cards below the screen wait to rise, none on it', below.length > 0 && below.every(function (c) { return c.classList.contains('a-pre') !== stillMotion; }) &&
    !cards.some(function (c) { return c.classList.contains('a-pre') && c.getBoundingClientRect().top < innerHeight - 40 && c.getBoundingClientRect().bottom > 0; }), below.length + ' below, ' + seen.length + ' in sight');

  // an address with a place (finding 4): the map lights it, however short its part across the middle
  var linked = atlasPlace(window.__probeHash, IDS);
  if (linked) check('an address with a place: the map lights it, with its name', lit() === linked && (!wide || named() === linked), lit());

  // a card across the middle lights its place, with its name and, on the trip, its days; once the page has loaded, as a link
  // with an empty # (the atlas without a trip in English) brings the page back to its top then
  var cp = document.getElementById('pl-cucphuong');
  if (document.readyState === 'complete') setTimeout(middle, 0); else window.addEventListener('load', function () { setTimeout(middle, 0); });
  function middle() { toMiddle(cp, function () {
    check('a card across the middle lights its place, bigger', lit() === 'cucphuong' && (!wide || named() === 'cucphuong') && !map.classList.contains('group') &&
      parseFloat(getComputedStyle(map.querySelector('.bm-pt[data-p="cucphuong"] .bm-dot')).r) > parseFloat(getComputedStyle(map.querySelector('.bm-pt[data-p="hanoi"] .bm-dot')).r), lit() + ' / ' + named());
    check('the caption names it' + (trip ? ', with its days on the trip' : ''), caption() === flat(CE.cucphuong.short + (trip && trip.stays.cucphuong ? ' · ' + days('cucphuong') : '')), caption());
    check('a card that rose is in sight', !cp.classList.contains('a-pre'));
    // a region's heading across the middle: all its places, without names, the region and its number in the caption
    var head = document.getElementById('reg-centre');
    toMiddle(head, function () {
      var reg = IDS.filter(function (id) { return CONTENT[id].region === 'centre'; });
      var r0 = map.querySelector('.bm-pt[data-p="hue"] .bm-dot'), rOn = parseFloat(getComputedStyle(r0).r), rOff = parseFloat(getComputedStyle(map.querySelector('.bm-pt[data-p="hanoi"] .bm-dot')).r);
      check('a region’s heading lights all its places, without names, in their usual size', lit() === reg.slice().sort().join(' ') && named() === '' && map.classList.contains('group') && rOn === rOff,
        lit() + ' / ' + named() + ', r ' + rOn + ' / ' + rOff);
      check('the caption: the region and its number of places', caption() === flat(T('a.reg.centre') + ' · ' + T('a.places.' + nightForm(reg.length)).replace('{n}', reg.length)), caption());
      // the mouse on another card lights it instead; out of the cards, the middle again
      var other = document.getElementById('pl-hue');
      other.scrollIntoView({ block: 'start' });
      window.scrollBy(0, -40);
      var r = other.getBoundingClientRect(), x = r.left + 20, y = Math.max(r.top, map.getBoundingClientRect().bottom, 0) + 20, under = document.elementFromPoint(x, y);
      under.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', clientX: x, clientY: y, bubbles: true }));
      setTimeout(function () {
        check('the mouse on a card lights its place', lit() === 'hue', lit() + ' / ' + under.className);
        document.getElementById('a-panels').dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'mouse' }));
        setTimeout(function () {
          var items = Array.prototype.slice.call(document.querySelectorAll('.a-region, .a-card')), l = line();
          var mid = items.filter(function (c) { return c.getBoundingClientRect().bottom > l; })[0] || items[items.length - 1];
          check('the mouse out of the cards: the item across the middle again', mid.classList.contains('a-card') ? lit() === mid.id.slice(3) : lit().split(' ').length > 1, lit() + ' / ' + mid.id);
          // the focus in a card lights it
          document.querySelector('#pl-sapa .a-big').focus();
          check('the focus in a card lights its place', lit() === 'sapa', lit());
          document.activeElement.blur();
          // a dot frames its card; a click on it brings the card to the top (under the band) and lights it
          var dot = map.querySelector('.bm-pt[data-p="phuquoc"] .bm-dot');
          dot.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          var framed = Array.prototype.filter.call(document.querySelectorAll('.a-card'), function (c) { return c.classList.contains('w-lit'); }).map(function (c) { return c.id; });
          check('the mouse on a dot frames the card of its place', framed.join(' ') === 'pl-phuquoc', framed.join(' '));
          map.dispatchEvent(new MouseEvent('mouseleave'));
          check('out of the map no frames', !document.querySelector('.w-lit'));
          window.scrollTo(0, 0);
          dot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          setTimeout(function () {
            var pq = document.getElementById('pl-phuquoc'), b = pq.getBoundingClientRect(), top = wide ? 0 : map.getBoundingClientRect().bottom;
            check('a click on a dot: its card at the top of the screen (under the band), lit, in sight', Math.abs(b.top - top - 12) < 30 && lit() === 'phuquoc' && !pq.classList.contains('a-pre'),
              Math.round(b.top) + ' / ' + Math.round(top) + ', ' + lit());
            printout();
          }, 300);
        }, 250);
      }, 250);
    });
  }, wide ? 200 : 120); }

  // the printout (finding 23): every place lit with its number, no two numbers on each other, the list of the numbers, each
  // card with its number before its name; after it, the middle again
  function printout() {
    var printCss = [];
    Array.prototype.forEach.call(document.styleSheets, function (x) {
      Array.prototype.forEach.call(x.cssRules, function (r) { if (r.media && /print/.test(r.media.mediaText)) Array.prototype.forEach.call(r.cssRules, function (y) { printCss.push(y.cssText); }); });
    });
    var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
    window.dispatchEvent(new Event('beforeprint'));
    var nums = pts().map(function (g) { return g.querySelector('.bm-num'); }), boxes = nums.map(function (t) { return t.getBBox(); }), vb = svg.viewBox.baseVal, over = [];
    boxes.forEach(function (a, i) { boxes.forEach(function (b, j) { if (i < j && a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height) over.push(IDS[i] + '+' + IDS[j]); }); });
    check('the printout: every place lit, numbered 1–20 in the atlas’s order', lit() === IDS.slice().sort().join(' ') && nums.every(function (t, i) { return t.textContent === String(i + 1) && t.checkVisibility(); }) &&
      !pts().some(function (g) { return g.querySelector('.bm-name').checkVisibility(); }));
    check('the printout: no two numbers on each other, all inside the map', !over.length && boxes.every(function (b) { return b.x >= -2 && b.x + b.width <= vb.width + 2; }), over.join(', '));
    var list = Array.prototype.map.call(document.querySelectorAll('.a-maplist li'), function (li) { return flat(li.textContent); });
    check('the printout: the list of the numbers beside the map', list.length === 20 && list.every(function (t, i) { return t === (i + 1) + flat(CE[IDS[i]].short); }) && document.querySelector('.a-maplist').checkVisibility(), list.slice(0, 3).join(' | '));
    check('the printout: each card with its number before its name', IDS.every(function (id, i) { var n = document.querySelector('#pl-' + id + ' .a-num'); return n.textContent === String(i + 1) && n.checkVisibility(); }));
    check('the printout: every card in sight', !document.querySelector('.a-pre'));
    window.dispatchEvent(new Event('afterprint'));
    ps.remove();
    check('after the printout: one place or region lit again, the numbers hidden', lit() !== IDS.slice().sort().join(' ') && !map.querySelector('.bm-num').checkVisibility(), lit());
    end();
  }

  // the end of the page: the map stays where it sticks, the last card lit with its dot on the screen (also on a laptop's low
  // screen, H=768 before probe.sh)
  function end() {
    window.scrollTo(0, document.documentElement.scrollHeight);
    window.dispatchEvent(new Event('scroll'));
    setTimeout(function () {
      var top = map.getBoundingClientRect().top, d = map.querySelector('.bm-pt[data-p="' + IDS[IDS.length - 1] + '"] .bm-dot').getBoundingClientRect();
      check('the end of the page: the map where it sticks, the last place lit, its dot on the screen', (wide ? top >= 15.5 : top >= -0.5) && lit() === IDS[IDS.length - 1] && d.top >= 0 && d.bottom <= innerHeight,
        'top ' + Math.round(top) + ', ' + lit() + ', dot ' + Math.round(d.top));
      check('no sideways scroll at the end', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);
      done();
    }, 400);
  }
})();
