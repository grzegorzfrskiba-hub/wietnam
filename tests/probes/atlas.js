/* The atlas of places (stage 7, notes/plans/2026-10-22-atlas-projekt.md): run with PAGE=atlas, in both languages (&lang=pl
   at the end), at 320–1400 px, on a link with a trip, on one without and on one with a place:
     PAGE=atlas bash tests/probe.sh tests/probes/atlas.js 1400 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2'
     PAGE=atlas bash tests/probe.sh tests/probes/atlas.js 390 'lang=pl'
     PAGE=atlas bash tests/probe.sh tests/probes/atlas.js 390 'hoian&od=HAN&do=SGN&miesiac=2027-02&dni=21&co=przyroda&poziom=3'
   The 20 places from north to south in three regions; each card with its photos, its texts in the page's language, the bar
   of the months, what to do, the gem and its links; with a trip ✓ and the days, else why not, what Dodaj would drop and
   Dodaj; without one Dodaj to the planner; the heading's links, the links to the regions, an address with a place, the
   album, the bar's line, EN · PL, noindex and the link preview, no sideways scroll and the printout. */
(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var A = window.__atlas, trip = A.trip(), hash = window.__probeHash, pl = LANG === 'pl', IDS = A.ids;
  var CE = pl ? CONTENT : localContent(CONTENT, CONTENT_EN);
  var vis = function (el) { el = typeof el === 'string' ? document.querySelector(el) : el; return !!el && el.checkVisibility(); };
  // a text without the page's typography: no word joiner (a range keeps together), a no-break space as a space
  function flat(t) { return String(t).replace(/\u2060/g, '').replace(/[\s\u00a0]+/g, ' ').trim(); }
  function T(k, vars) {
    var t = AUI[LANG].hasOwnProperty(k) ? AUI[LANG][k] : WUI[LANG].hasOwnProperty(k) ? WUI[LANG][k] : UI[LANG][k];
    return vars ? t.replace(/\{(\w+)\}/g, function (m, n) { return vars[n]; }) : t;
  }
  function cap(pid) { return pl ? PHOTO_META[pid].cap : PHOTO_CAPS_EN[pid]; }
  function card(id) { return document.getElementById('pl-' + id); }
  function href(el) { return el ? el.getAttribute('href') : null; }
  // the cards for which test fails, by id
  function failing(test) { return IDS.filter(function (id) { try { return !test(id, card(id)); } catch (e) { return true; } }); }

  /* A trip in the link always gives a trip, as on the page with the route: one whose Dodaj and Usuń leave none opens without
     them and says the link was partly wrong (finding D4 of the final review; the link with usun= of every place:
     PAGE=atlas bash tests/probe.sh tests/probes/atlas.js 1024 'od=HAN&do=SGN&miesiac=2027-03&dni=15&co=przyroda&poziom=2&usun=<all 20>') */
  check('a trip in the link gives a trip, as on the page with the route', !hasTrip(hash) || !!trip && (!/(^|&)usun=[^&]/.test(hash) || trip.settings.remove.length > 0 ||
    trip.dropped && flat(document.querySelector('.w-tripbox').textContent).indexOf(flat(UI[LANG]['set.dropped'])) > -1), trip ? JSON.stringify(trip.settings.remove) : 'no trip');
  check('the page language from the link',document.documentElement.lang === (/(&|#)lang=pl(&|$)/.test(hash) ? 'pl' : 'en'));
  check('noindex and its own link preview', !!document.querySelector('meta[name="robots"][content="noindex"]') &&
    /\/atlas\/$/.test((document.querySelector('meta[property="og:url"]') || {}).content || '') && /og-atlas\.jpg$/.test((document.querySelector('meta[property="og:image"]') || {}).content || ''));
  check('the title in the page’s language', document.title === AUI[LANG]['a.doc.title'] && textOf('.w-head h1') === AUI[LANG]['a.h1'], document.title);
  // the photo at the top (decision 8): the terraces below the Khau Phạ pass, the title and its place on it
  var hero = document.querySelector('.w-hero'), him = document.querySelector('.w-hero > img');
  check('the photo at the top: the terraces below Khau Phạ, the title and its place on it', !!him && /\/mucangchai_1(-\d+)?\.jpg$/.test(him.currentSrc) && him.alt === cap('mucangchai_1') &&
    hero.contains(document.querySelector('.w-head h1')) && hero.contains(document.getElementById('lang-switch')) && textOf('.w-where') === 'Khau Phạ, Mù Cang Chải', him && him.currentSrc);

  // the places and the regions (findings 11 and 12)
  var cards = Array.prototype.map.call(document.querySelectorAll('.a-card'), function (c) { return c.id.slice(3); });
  check('the 20 places from north to south', cards.join(' ') === atlasOrder(PLACES).join(' ') && cards.length === 20, cards.join(' '));
  var regs = atlasRegions(IDS, CONTENT), heads = Array.prototype.slice.call(document.querySelectorAll('.a-region'));
  check('three regions, each with the number of its places', heads.length === 3 && regs.every(function (g, i) {
    var n = g.ids.length;
    return heads[i].getAttribute('data-reg') === g.region && flat(heads[i].textContent) === AUI[LANG]['a.reg.' + g.region] + ' ' + AUI[LANG]['a.places.' + nightForm(n)].replace('{n}', n);
  }), heads.map(function (h) { return flat(h.textContent); }).join(' | '));
  check('each card under the heading of its region', !failing(function (id, c) { return c.parentNode.previousElementSibling.getAttribute('data-reg') === CONTENT[id].region; }).length);
  var go = Array.prototype.slice.call(document.querySelectorAll('#a-regions a'));
  check('the links to the regions: North, Centre, South', go.map(function (a) { return a.textContent; }).join(' ') === regs.map(function (g) { return AUI[LANG]['a.reg.' + g.region]; }).join(' '));

  // a card (findings 5–8): its photos, texts, interests, bar, what to do and gem
  check('each card: the big photo and the strip of the others, in the order of the place', !failing(function (id, c) {
    var v = Array.prototype.map.call(c.querySelectorAll('[data-view]'), function (b) { return b.getAttribute('data-view'); });
    return v.join(' ') === CONTENT[id].photos.join(' ') && c.querySelector('.a-big').getAttribute('data-view') === CONTENT[id].photos[0] && c.querySelectorAll('.a-strip [data-view]').length === v.length - 1 &&
      flat(c.querySelector('.a-capline').textContent) === flat(cap(CONTENT[id].photos[0]));
  }).length);
  check('each card: its region, name, line, what it is and gem in the page’s language', !failing(function (id, c) {
    var x = CE[id];
    return flat(c.querySelector('.a-regname').textContent) === AUI[LANG]['a.reg.' + x.region] && flat(c.querySelector('h3').textContent).indexOf(flat(x.name)) > -1 &&
      flat(c.querySelector('.a-sub').textContent) === flat(x.sub) && flat(c.querySelector('.a-what').textContent) === flat(x.what) && flat(c.querySelector('.a-gem').textContent).indexOf(flat(x.gem)) > -1;
  }).join(', '));
  check('each card: the interests it serves best', !failing(function (id, c) {
    return Array.prototype.map.call(c.querySelectorAll('.a-ints span'), function (s) { return s.textContent; }).join('|') === placeInterests(PLACES[id].fit).map(function (k) { return UI[LANG]['int.' + k]; }).join('|');
  }).join(', '));
  check('each card: twelve months in the colours of their seasons' + (trip ? ', the trip’s months framed' : ''), !failing(function (id, c) {
    var ms = c.querySelectorAll('.a-bar .a-m');
    return ms.length === 12 && Array.prototype.every.call(ms, function (b, i) {
      return b.classList.contains('s' + SEASONS[id].charAt(i)) && b.classList.contains('trip') === !!(trip && trip.months.indexOf(i + 1) > -1) && flat(b.textContent) === UI[LANG]['mon3.' + (i + 1)];
    });
  }).join(', '));
  check('each card: what to do and the nights of a stay', !failing(function (id, c) {
    var t = placeTodo(CE[id]), n = nightsSpan(PLACES[id].nights), li = c.querySelectorAll('.a-todo li');
    return li.length === t.usual.length + t.hard.length && flat(li[0].textContent) === flat(t.usual[0]) && c.querySelectorAll('.a-todo .hard').length === t.hard.length &&
      flat(c.querySelector('.a-k small').textContent) === flat('· ' + T('a.nights', { n: n.text, nights: UI[LANG]['nights.' + n.form] }));
  }).join(', '));
  check('„Zwierzęta tutaj →” at the 10 places of the field guide, with the trip', !failing(function (id, c) {
    var a = Array.prototype.filter.call(c.querySelectorAll('.a-links a'), function (x) { return x.textContent === UI[LANG]['stop.wild']; });
    return WILD_GUIDE_PLACES.indexOf(id) > -1 ? a.length === 1 && href(a[0]) === '../wildlife/' + wildHash({ tab: 'guide', place: id }, trip && trip.settings, LANG, COSTS) : !a.length;
  }).join(', '));

  // the trip from the link (findings 16 and 17): ✓ and the days, or why not, what Dodaj would drop and Dodaj
  if (trip) {
    var places = trip.route.stops.filter(function (s) { return !PLACES[s.id].node; }).map(function (s) { return CE[s.id].short; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
    check('the trip above the places, with its places', vis('.w-tripbox') && flat(textOf('.w-tripbox')).indexOf(flat(T('w.trip.places', { list: places.join(', ') }))) > -1, textOf('.w-tripbox'));
    check('a place on the trip: ✓ and its days', !failing(function (id, c) {
      var s = trip.stays[id], ok = c.querySelector('.w-ok');
      if (!s) return !ok;
      var days = s.map(function (x) { return x.first === x.last ? T('w.day', { n: x.first }) : T('w.days', { a: x.first, b: x.last }); }).join(' ' + UI[LANG].and + ' ');
      return !!ok && flat(ok.textContent) === flat(T('a.on', { days: days })) && !c.querySelector('.btn-small');
    }).join(', '));
    check('a place off the trip: why, what Dodaj would drop and Dodaj back to the trip with the place', !failing(function (id, c) {
      if (trip.stays[id]) return true;
      var x = trip.off[id], add = c.querySelector('.btn-small'), why = c.querySelector('.a-add > .w-muted');
      if (!why || flat(why.textContent).indexOf(flat(T('a.off', { why: '' })).replace(/\.$/, '')) !== 0) return false;
      if (!x.canAdd) return !add && flat(textOf('#pl-' + id + ' .a-add')).indexOf(flat(T('w.cannot', { x: CE[id].short }))) > -1;
      var what = x.drops.length ? T('off.drops', { list: x.drops.map(function (p) { return CE[p].short; }).join(', ') }) : x.shorter.length ? T('off.shorter', { list: x.shorter.map(function (p) { return CE[p].short; }).join(', ') }) : T('off.nodrops');
      return !!add && href(add) === tripLink(trip.settings, LANG, COSTS, id) && flat(add.textContent) === flat(T('w.add', { x: CE[id].short })) && flat(c.querySelector('.w-drops').textContent) === flat(what);
    }).join(', '));
  } else {
    check('without a trip: no ✓, no trip and Dodaj opens the planner with the place', !document.querySelector('.w-tripbox, .a-card .w-ok') && !failing(function (id, c) {
      var add = c.querySelector('.btn-small');
      return !!add && href(add) === tripLink(null, LANG, COSTS, id) && !c.querySelector('.a-add');
    }).join(', '));
  }
  var keys = Array.prototype.map.call(document.querySelectorAll('.a-legend > span'), function (s) { return flat(s.textContent); });
  check('the legend of the seasons, once' + (trip ? ', with the frame of the trip' : ''), keys.join('|') === [T('a.legend'), UI[LANG]['season.D'], UI[LANG]['season.S'], UI[LANG]['season.Z']].concat(trip ? [T('a.legend.trip')] : []).join('|'), keys.join('|'));
  // the heading's links (findings 3 and 18): back to the trip or the planner, the wildlife subpage, with the trip
  check('the way back: the trip or the planner', href(document.getElementById('a-back')) === tripLink(trip && trip.settings, LANG, COSTS, null) && textOf('#a-back') === T(trip ? 'w.back.trip' : 'w.back.plan'));
  check('„Zwierzęta” in the heading: the wildlife subpage with the trip', href(document.getElementById('a-wild')) === '../wildlife/' + wildHash({ tab: trip ? 'route' : 'gallery', place: null }, trip && trip.settings, LANG, COSTS) &&
    textOf('#a-wild') === UI[LANG]['nav.wild']);
  var top = document.querySelector('.w-top').getBoundingClientRect(), r = document.querySelector('.w-top-r').getBoundingClientRect(), back = document.getElementById('a-back').getBoundingClientRect();
  check('the heading’s links on one line, 44 px targets', top.height < 50 && back.height >= 44 && back.right <= r.left && document.getElementById('a-wild').getBoundingClientRect().height >= 44, Math.round(top.height) + ', ' + Math.round(back.right) + ' / ' + Math.round(r.left));
  check('no sideways scroll', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);
  var ps = []; IDS.forEach(function (id) { CONTENT[id].photos.forEach(function (p) { if (ps.indexOf(p) < 0) ps.push(p); }); });
  check('the credits: the photos of the 20 places', document.querySelectorAll('#a-credits li').length === ps.length && textOf('#a-credits-h') === T('w.credits.h', { n: ps.length }), ps.length);

  // an address with a place (finding 4): its card at the top of the screen, with the focus
  var linked = atlasPlace(hash, IDS);
  if (linked) {
    var lc = card(linked).getBoundingClientRect(), under = parseFloat(getComputedStyle(card(linked)).scrollMarginTop) || 0;
    check('an address with a place: its card at the top, with the focus', Math.abs(lc.top - under) < 30 && document.activeElement === card(linked), Math.round(lc.top) + ' / ' + under);
  }

  // the bar of the months (finding 7): the focus, ← → and a tap say a month in the line under the bar
  var c0 = card('hoian'), bar = c0.querySelector('.a-bar'), cells = bar.querySelectorAll('.a-m'), line = c0.querySelector('.a-mline');
  var nov = seasonBar(SEASONS.hoian, CLIMATE.hoian.why, null)[10];
  var want = T('a.month', { month: UI[LANG]['mon.11'], season: UI[LANG]['season.' + nov.season] }) + ', ' + nov.why.map(function (w) { return UI[LANG]['wx.' + w]; }).join(', ');
  check('the bar: one stop for the keyboard', Array.prototype.filter.call(cells, function (b) { return b.tabIndex === 0; }).length === 1 && cells[trip ? trip.months[0] - 1 : 0].tabIndex === 0);
  cells[9].focus();
  cells[9].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  check('the bar: → moves to the next month, which says its season and reasons', document.activeElement === cells[10] && cells[10].tabIndex === 0 && cells[9].tabIndex === -1 &&
    cells[10].getAttribute('aria-label') === want && line.textContent === want, line.textContent + ' / ' + want);
  document.activeElement.blur();
  check('the bar: without the focus the line is empty', line.textContent === '');
  cells[0].click();
  check('the bar: a tap on a month says it', line.textContent === cells[0].getAttribute('aria-label') && cells[0].classList.contains('at'), line.textContent);
  cells[0].blur();
  // the bar as a whole to a reader of the screen: its months by season (seasonGroups), as the legend names the seasons
  check('the bar: its label lists the months by season', AUI[LANG].hasOwnProperty('a.when.aria') && bar.getAttribute('aria-label') === T('a.when.aria', { list: seasonGroups(seasonBar(SEASONS.hoian, CLIMATE.hoian.why, null)).map(function (g) {
    return (g.season === 'X' ? T('a.closed') : UI[LANG]['season.' + g.season]) + ': ' + g.months.map(function (m) { return UI[LANG]['mon.' + m]; }).join(', ');
  }).join('; ') }), bar.getAttribute('aria-label'));
  // each month's short name within its field, down to 320 px (finding W2 of the final review)
  var wide = [];
  document.querySelectorAll('.a-m').forEach(function (m) {
    var r = document.createRange(); r.setStart(m.lastChild, 0); r.setEnd(m.lastChild, m.lastChild.length);
    if (r.getBoundingClientRect().width > m.getBoundingClientRect().width + 0.5) wide.push(flat(m.textContent));
  });
  check('the bar: each month’s name within its field', !wide.length, wide.length + ' ' + wide.slice(0, 3).join(' '));
  /* The seasons told apart without their hues (finding W1): good, fair and poor at least 1.5:1 from each other in lightness,
     each at least 2.5:1 from the card, a closed month (none today) 3:1, in the light and the dark theme */
  function lum(c) {
    var v = c.match(/[\d.]+/g).slice(0, 3).map(function (x) { x = x / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function ratio(a, b) { var x = lum(a) + 0.05, y = lum(b) + 0.05; return Math.max(x, y) / Math.min(x, y); }
  function seasonsApart(theme) {
    var root = document.documentElement, was = root.getAttribute('data-theme'), probe = document.createElement('div');
    root.setAttribute('data-theme', theme);
    probe.className = 'a-m'; probe.innerHTML = '<i></i>'; c0.appendChild(probe);
    var cs = {}, bg = getComputedStyle(c0).backgroundColor;
    ['D', 'S', 'Z', 'X'].forEach(function (s) { probe.className = 'a-m s' + s; cs[s] = getComputedStyle(probe.firstChild).backgroundColor; });
    probe.remove();
    if (was === null) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', was);
    var bad = [];
    [['D', 'S'], ['D', 'Z'], ['S', 'Z']].forEach(function (p) { if (ratio(cs[p[0]], cs[p[1]]) < 1.5) bad.push(p.join('') + ' ' + ratio(cs[p[0]], cs[p[1]]).toFixed(2)); });
    ['D', 'S', 'Z'].forEach(function (s) { if (ratio(cs[s], bg) < 2.5) bad.push(s + '/card ' + ratio(cs[s], bg).toFixed(2)); });
    if (ratio(cs.X, bg) < 3) bad.push('X/card ' + ratio(cs.X, bg).toFixed(2));
    return bad;
  }
  var apart = seasonsApart('light').concat(seasonsApart('dark').map(function (x) { return 'dark ' + x; }));
  check('the bar: the seasons apart in lightness, in both themes', !apart.length, apart.join(', '));

  // the printout (finding 23): two cards a row with the big photo, without the strip, the buttons and the links
  var printCss = [];
  Array.prototype.forEach.call(document.styleSheets, function (s) {
    Array.prototype.forEach.call(s.cssRules, function (x) { if (x.media && /print/.test(x.media.mediaText)) Array.prototype.forEach.call(x.cssRules, function (y) { printCss.push(y.cssText); }); });
  });
  var pst = document.createElement('style'); pst.textContent = printCss.join('\n'); document.head.appendChild(pst);
  window.dispatchEvent(new Event('beforeprint'));
  var grid = getComputedStyle(document.querySelector('.a-places')).gridTemplateColumns.split(' ').length;
  check('the print: two cards a row, with the big photo, without the strip, the buttons, the links and the way back', grid === 2 && vis('.a-big') &&
    !vis('.a-strip') && !vis('.a-links') && !vis('#a-back') && !vis('#lang-switch') && !vis('#a-regions'), grid);
  // the trip's months framed by a line on paper, which a print without the background graphics keeps (finding D7)
  var tm = document.querySelector('.a-m.trip i');
  if (tm) check('the print: the trip’s months framed by an outline', getComputedStyle(tm).outlineStyle === 'solid' && getComputedStyle(tm).boxShadow === 'none', getComputedStyle(tm).outlineStyle);
  window.dispatchEvent(new Event('afterprint'));
  pst.remove();
  check('the print on A4, as the page with the route', Array.prototype.some.call(document.styleSheets, function (s) {
    return Array.prototype.some.call(s.cssRules, function (x) { return x.type === CSSRule.PAGE_RULE && /size:\s*A4/i.test(x.cssText); });
  }));

  // a link to a region: its heading at the top of the screen, the address as it was
  var was = location.hash, south = document.getElementById('reg-south');
  document.querySelector('#a-regions [data-go="south"]').click();
  var st = south.getBoundingClientRect().top, under = parseFloat(getComputedStyle(south).scrollMarginTop) || 0;
  check('a link to a region: its heading at the top, the address as it was', Math.abs(st - under) < 30 && location.hash === was, Math.round(st) + ' / ' + under);
  // its address carries the trip, so a region opened in a new tab keeps it, and such an address brings the region (finding D3)
  var regHref = href(document.querySelector('#a-regions [data-go="north"]')), north = document.getElementById('reg-north');
  check('a link to a region: its address with the trip', regHref === atlasHash('reg-north', trip && trip.settings, LANG, COSTS), regHref);
  window.scrollTo(0, document.documentElement.scrollHeight);
  history.replaceState(null, '', regHref); window.dispatchEvent(new HashChangeEvent('hashchange'));
  var nt = north.getBoundingClientRect().top, nu = parseFloat(getComputedStyle(north).scrollMarginTop) || 0;
  check('an address with a region: its heading at the top, the trip kept', window.scrollY > 0 && Math.abs(nt - nu) < 30 && JSON.stringify(A.trip() && A.trip().settings) === JSON.stringify(trip && trip.settings),
    Math.round(nt) + ' / ' + nu);
  history.replaceState(null, '', was || location.pathname); window.dispatchEvent(new HashChangeEvent('hashchange'));

  // the album of a place (finding 5): from its big photo or the strip, ‹ ›, the arrow keys, the counter, the focus back
  var d = document.getElementById('w-viewer'), first = card(IDS[0]), ph = CONTENT[IDS[0]].photos, opener = first.querySelector('.a-big');
  opener.focus(); opener.click();
  check('the album: the place’s photos from the first, its caption, the place and the author', d.open && textOf('#wv-count') === '1 / ' + ph.length && textOf('#wv-name') === flat(cap(ph[0])) &&
    flat(textOf('#wv-cap')).indexOf(flat(CE[IDS[0]].name) + ' · ' + PHOTO_META[ph[0]].artist) === 0 && document.getElementById('wv-prev').disabled, textOf('#wv-count') + ' ' + textOf('#wv-name'));
  document.getElementById('wv-next').click();
  check('the album: › to the next photo', textOf('#wv-count') === '2 / ' + ph.length && textOf('#wv-name') === flat(cap(ph[1])));
  d.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
  check('the album: ← back', textOf('#wv-count') === '1 / ' + ph.length);
  d.close();
  setTimeout(function () {
    check('closing the album gives the focus back', document.activeElement === opener);
    first.querySelectorAll('.a-strip [data-view]')[1].click();
    check('a photo of the strip opens the album on itself', d.open && textOf('#wv-count') === '3 / ' + ph.length);
    d.close();
    setTimeout(function () {
      // EN · PL: the other language, the same trip, the place out of the address
      var other = pl ? 'en' : 'pl';
      document.querySelector('#lang-switch [data-lang="' + other + '"]').click();
      check('EN · PL: the other language, the same trip, no place in the address', document.documentElement.lang === other && !!A.trip() === !!trip && document.title === AUI[other]['a.doc.title'] &&
        (/(&|#)lang=pl(&|$)/.test(location.hash)) === (other === 'pl') && !atlasPlace(location.hash, IDS) && (!trip || location.hash.indexOf(pageHash(trip.settings, other, COSTS).slice(1)) > -1), location.hash);
      done();
    }, 150);
  }, 150);
})();
