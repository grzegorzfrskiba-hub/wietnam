/* The atlas of places (stage 7, …/atlas/, notes/plans/2026-10-22-atlas-projekt.md): the 20 places of the pool from north to
   south, region by region (atlasOrder and atlasRegions in atlaspage.js). Each place is a card: a big photo and a strip of the
   others, which open the place's album, and under them what the page knows already (decision 2: no new texts of the
   places): the line under its name, the interests it serves, what it is, the bar of the twelve months, what to do and its
   hidden gem. With the settings of a trip in the address it plans the same trip as the page with the route (engine.js) and
   says for each place whether it is on the trip, with its days, or why not, what Dodaj would drop, and Dodaj itself, back to
   that page with the place added (decision 1). An address with a place (#hoian&…) opens the atlas on it (finding 4). Beside
   the cards a map of the whole country lights the place across the middle of the screen, as on the wildlife subpage.
   Texts: atlasui.js, in English en/atlasui.js; the words it shares with the wildlife subpage come from wildui.js, the words
   of both pages from ui.js; the page's language as on the page with the route. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- texts ---------- */
  var lang = 'en', costs = false, VIEW = CONTENT;
  // a text of the atlas (AUI), else one it shares with the wildlife subpage (WUI), else one of the page with the route (UI)
  function T(k, vars) {
    var t = AUI[lang].hasOwnProperty(k) ? AUI[lang][k] : WUI[lang].hasOwnProperty(k) ? WUI[lang][k] : UI[lang][k];
    if (t == null) throw new Error('no text ' + k);
    return vars ? t.replace(/\{(\w+)\}/g, function (m, n) { return vars[n]; }) : t;
  }
  // the multi-word names a line may not break inside, as on the page with the route (app.js), and the no-break spaces of
  // the language's typography (page.js)
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(CONTENT_EN).map(function (id) { return CONTENT_EN[id].short; }), Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
    .filter(function (n, i, every) { return n.indexOf(' ') > -1 && every.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  function tied(text) { return tieNames(tieVietnamese(lang === 'pl' ? tieShort(text) : tieEnglish(text)), TIED_NAMES); }
  function short(id) { return VIEW[id].short; }
  function names(ids) { return ids.map(short).join(', '); }
  function caption(pid) { return lang === 'en' ? PHOTO_CAPS_EN[pid] : PHOTO_META[pid].cap; }
  function licName(l) { return l === 'Public domain' ? T('ft.pd') : l; }
  function dayRange(a, b) { return a === b ? T('w.day', { n: a }) : T('w.days', { a: a, b: b }); }
  // "10 miejsc", "4 miejsca", "6 places"
  function placesText(n) { return T('a.places.' + nightForm(n), { n: n }); }

  /* ---------- the places ---------- */
  var IDS = atlasOrder(PLACES), REGS = atlasRegions(IDS, CONTENT);

  /* ---------- the trip from the address, as on the wildlife subpage ---------- */
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var TODAY = clampToday(new Date().toISOString().slice(0, 10), HOLIDAYS_FROM, PLAN_LAST_YEAR);
  // trip: { settings, st, route, stays, months, off, dropped } or null (no trip in the address, or one that gives no trip)
  var trip = null;
  function readTrip() {
    trip = null;
    if (!hasTrip(location.hash)) return;
    var defaults = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
    // the parts of the link the engine cannot take are dropped as on the page with the route (app.js), and said
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), defaults, PLACES, HUBS, bad, SWAPS), r = planRoute(got.st, DATA);
    // a link whose Dodaj and Usuń leave no trip opens without them, as on the page with the route (fromLink in app.js), and says so
    if (!r.ok) {
      var s = withoutChanges(got.settings), st = normSettings(s, PLACES, HUBS);
      r = st.ok ? planRoute(st, DATA) : r;
      if (!r.ok) return;
      got = { settings: s, st: st, dropped: ['add', 'remove'] };
    }
    var off = {};
    whyOff(r, got.settings, got.st, DATA, CLIMATE).forEach(function (x) { off[x.id] = x; });
    trip = { settings: got.settings, st: got.st, route: r, stays: tripStays(r, got.st, CONTENT, FERRY, selfSwaps(got.settings.moto, SWAPS).places), months: termMonths(got.st), off: off, dropped: got.dropped.length > 0 };
  }
  // the trip in one line, as in the summary of the page with the route: the term, the days and the level
  function tripLine() {
    var st = trip.st, term = st.start ? fmtSpan(st.start, tripDate(st.start, st.days), lang === 'en' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (m) { return T('mon3.' + m); }) : null)
      : T('term.month', { month: T('mon.' + st.month), year: st.year });
    return T('w.trip', { term: term, days: st.days, level: T('lvl.' + st.level) });
  }

  /* ---------- a card ---------- */
  // a photo of a place (ATLAS_PICS, from build.py: the copies of the page with the route, one folder up); it comes in once
  // loaded (class ph, paintFrames)
  function img(pid, sizes) {
    var p = ATLAS_PICS[pid];
    return '<img class="ph" src="' + esc(p.src) + '"' + (p.srcset ? ' srcset="' + esc(p.srcset) + '" sizes="' + sizes + '"' : '') + ' width="' + p.w + '" height="' + p.h +
      '" alt="' + esc(caption(pid)) + '" data-ph="' + p.bg + '" loading="lazy" decoding="async">';
  }
  // a photo that opens the place's album (finding 5): the big one with its caption on it, or one of the strip
  function photo(pid, id, cls, sizes) {
    return '<button type="button" class="a-ph ' + cls + '" data-view="' + pid + '" data-place="' + id + '" aria-label="' + esc(T('w.view.aria', { x: caption(pid) })) + '">' +
      img(pid, sizes) + (cls === 'a-big' ? '<span class="a-capline" aria-hidden="true">' + esc(caption(pid)) + '</span>' : '') + '</button>';
  }
  /* The bar of the twelve months (finding 7): one field a month in the colour of its season, the trip's months framed. Each
     field says its month, season and reasons to a reader of the screen; the mouse on it, a tap or the focus says the same in
     the line under the bar (monthLine). One stop for the keyboard: the first month of the trip, else January; ← → go
     through the months. */
  function season(id) {
    var bar = seasonBar(SEASONS[id], CLIMATE[id].why, trip && trip.months), first = trip ? trip.months[0] : 1;
    return '<p class="a-k">' + esc(T('a.when')) + '</p><div class="a-bar" role="group" aria-label="' + esc(barLabel(bar)) + '">' + bar.map(function (x) {
      return '<button type="button" class="a-m s' + x.season + (x.trip ? ' trip' : '') + '" data-m="' + x.m + '" tabindex="' + (x.m === first ? 0 : -1) + '" aria-label="' + esc(monthLine(x)) + '">' +
        '<i></i>' + esc(T('mon3.' + x.m)) + '</button>';
    }).join('') + '</div><p class="a-mline" aria-hidden="true"></p>';
  }
  // the bar to a reader of the screen at once (finding D2 of the final review): "Kiedy jechać (dobry sezon: styczeń, luty; …)"
  function barLabel(bar) {
    return T('a.when.aria', { list: seasonGroups(bar).map(function (g) {
      return (g.season === 'X' ? T('a.closed') : T('season.' + g.season)) + ': ' + g.months.map(function (m) { return T('mon.' + m); }).join(', ');
    }).join('; ') });
  }
  // "listopad: zły sezon, ulewy przez większość dni, pora powodzi"
  function monthLine(x) {
    var s = T('a.month', { month: T('mon.' + x.m), season: x.season === 'X' ? T('a.closed') : T('season.' + x.season) });
    return x.why.length ? s + ', ' + x.why.map(function (w) { return T('wx.' + w); }).join(', ') : s;
  }
  // what to do (finding 8): the titles of the usual plans, then of the hard ones, and how many nights a stay takes
  function todo(id) {
    var t = placeTodo(VIEW[id]), n = nightsSpan(PLACES[id].nights);
    return '<p class="a-k">' + esc(T('a.todo')) + ' <small>· ' + esc(tied(T('a.nights', { n: n.text, nights: T('nights.' + n.form) }))) + '</small></p><ul class="a-todo">' +
      t.usual.map(function (x) { return '<li>' + esc(tied(x)) + '</li>'; }).join('') +
      t.hard.map(function (x) { return '<li class="hard">' + esc(tied(T('lvl.3') + ': ' + x)) + '</li>'; }).join('') + '</ul>';
  }
  // why a place is off the trip, as in the list „Nie ma na twojej trasie” (app.js)
  function offReason(r, x) {
    if (r === 'level') return T('off.r.level', { lvl: T('lvl.' + PLACES[x.id].level) });
    if (r === 'season') return T('off.r.season', { why: x.why.map(function (w) { return T('wx.' + w); }).join(', ') });
    if (r === 'beaten') return T('off.r.beaten', { days: trip.st.days });
    return T('off.r.' + r);
  }
  /* The end of a card (finding 17): for a place off the trip why, then what Dodaj would drop and Dodaj, back to the page with
     the route and the place added (whyOff, as the list of the places off the trip); a place that cannot be added says so.
     Without a trip, Dodaj opens the planner with its own defaults and the place. Then „Zwierzęta tutaj →” at a place of the
     field guide of the wildlife subpage, with the trip. */
  function links(id) {
    var h = '';
    if (!trip) h += '<a class="btn-small" href="' + esc(tripLink(null, lang, costs, id)) + '">' + esc(T('w.add', { x: short(id) })) + '</a>';
    else if (!trip.stays[id]) {
      var x = trip.off[id], what = x.drops.length ? T('off.drops', { list: names(x.drops) }) : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops');
      h += '<div class="a-add"><p class="w-muted">' + esc(tied(T('a.off', { why: x.reasons.map(function (r) { return offReason(r, x); }).join('; ') }))) + '</p>' +
        (x.canAdd ? '<p class="w-drops">' + esc(tied(what)) + '</p><a class="btn-small" href="' + esc(tripLink(trip.settings, lang, costs, id)) + '">' + esc(T('w.add', { x: short(id) })) + '</a>'
          : '<p class="w-muted">' + esc(T('w.cannot', { x: short(id) })) + '</p>') + '</div>';
    }
    if (WILD_GUIDE_PLACES.indexOf(id) > -1) h += '<a href="../wildlife/' + esc(wildHash({ tab: 'guide', place: id }, trip && trip.settings, lang, costs)) + '">' + esc(T('stop.wild')) + '</a>';
    return h ? '<div class="a-links">' + h + '</div>' : '';
  }
  // a place's card (findings 5 and 6), n its number in the atlas (the printout names it on the map, finding 23)
  function card(id, n) {
    var c = VIEW[id], ps = c.photos, stays = trip && trip.stays[id];
    return '<article class="a-card" id="pl-' + id + '" tabindex="-1" style="--c:var(--pal-' + c.color + ')">' +
      photo(ps[0], id, 'a-big', '(max-width: 1100px) 100vw, 780px') +
      // the strip's photos share the card's width (finding D6 of the final review: 254 px each when there are three)
      '<div class="a-strip">' + ps.slice(1).map(function (p) { return photo(p, id, 'a-thumb', '(max-width: 1100px) ' + Math.ceil(100 / (ps.length - 1)) + 'vw, ' + Math.ceil(780 / (ps.length - 1)) + 'px'); }).join('') + '</div>' +
      '<div class="a-body"><p class="a-regname">' + esc(T('a.reg.' + c.region)) + '</p><h3><span class="a-num">' + n + '</span> ' + esc(c.name) + '</h3>' +
      '<p class="a-sub">' + esc(tied(c.sub)) + '</p><p class="a-ints">' + placeInterests(PLACES[id].fit).map(function (k) { return '<span>' + esc(T('int.' + k)) + '</span>'; }).join('') + '</p>' +
      (stays ? '<p class="w-ok"><a href="' + esc(dayLink(trip.settings, lang, costs, stays[0].first)) + '">' +
        esc(T('a.on', { days: stays.map(function (s) { return dayRange(s.first, s.last); }).join(' ' + T('and') + ' ') })) + '</a></p>' : '') +
      '<p class="a-what">' + esc(tied(c.what)) + '</p>' + season(id) + todo(id) +
      (c.gem ? '<p class="a-gem"><b>' + esc(T('t.gem')) + ':</b> ' + esc(tied(c.gem)) + '</p>' : '') + links(id) + '</div></article>';
  }
  // the introduction, the trip, the legend of the bar of the months, then the regions with their places
  function renderPlaces() {
    var h = '<p class="a-intro">' + esc(T('a.intro')) + '</p>';
    if (trip) h += '<div class="w-tripbox"><p><b>' + esc(T('w.trip.h')) + '</b> ' + esc(tripLine()) + '</p><p class="w-muted">' +
      esc(T('w.trip.places', { list: names(trip.route.stops.filter(function (s) { return !PLACES[s.id].node; }).map(function (s) { return s.id; }).filter(function (id, i, a) { return a.indexOf(id) === i; })) })) + '</p>' +
      (trip.dropped ? '<p class="w-muted">' + esc(T('set.dropped')) + '</p>' : '') + '</div>';
    h += '<p class="a-legend"><span>' + esc(T('a.legend')) + '</span>' + ['D', 'S', 'Z'].map(function (s) { return '<span class="s' + s + '"><i></i>' + esc(T('season.' + s)) + '</span>'; }).join('') +
      (trip ? '<span class="trip"><i></i>' + esc(T('a.legend.trip')) + '</span>' : '') + '</p>';
    var n = 0;
    REGS.forEach(function (g) {
      h += '<h2 class="a-region" id="reg-' + g.region + '" data-reg="' + g.region + '">' + esc(T('a.reg.' + g.region)) + ' <small>' + esc(placesText(g.ids.length)) + '</small></h2>' +
        '<div class="a-places">' + g.ids.map(function (id) { return card(id, ++n); }).join('') + '</div>';
    });
    $('#a-panels').innerHTML = h;
    // a region's address carries the trip, so a region opened in a new tab keeps it (fromHash brings the region)
    $('#a-regions').innerHTML = REGS.map(function (g) {
      return '<a href="' + esc(atlasHash('reg-' + g.region, trip && trip.settings, lang, costs)) + '" data-go="' + g.region + '">' + esc(T('a.reg.' + g.region)) + '</a>';
    }).join('');
  }
  // the photos of the 20 places, in the atlas's order, with their authors and licences
  function renderCredits() {
    var ps = [];
    IDS.forEach(function (id) { CONTENT[id].photos.forEach(function (p) { if (ps.indexOf(p) < 0) ps.push(p); }); });
    $('#a-credits-h').textContent = T('w.credits.h', { n: ps.length });
    $('#a-credits').innerHTML = ps.map(function (pid) {
      var m = PHOTO_META[pid], lic = licenceUrl(m.license, lang);
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(caption(pid)) + '</a>: ' + esc(m.artist) + ', ' +
        (lic ? '<a href="' + esc(lic) + '" target="_blank" rel="noopener">' + esc(licName(m.license)) + '</a>' : esc(licName(m.license))) + '</li>';
    }).join('');
  }
  // the links of the heading: back to the trip (or the planner) and to the wildlife subpage, with the trip
  function renderLinks() {
    $('#a-back').href = tripLink(trip && trip.settings, lang, costs, null);
    $('#a-back').textContent = T(trip ? 'w.back.trip' : 'w.back.plan');
    $('#a-wild').href = '../wildlife/' + wildHash({ tab: trip ? 'route' : 'gallery', place: null }, trip && trip.settings, lang, costs);
  }
  function render() { renderPlaces(); renderLinks(); renderMap(); paintFrames(); }

  /* ---------- the view ---------- */
  /* The address: the trip (only when it changed, as planning takes a moment) and the language; a place before them moves the
     page to its card. */
  function fromHash() {
    var parts = location.hash.replace(/^#/, '').split('&'), key = (parts[0].indexOf('=') < 0 ? parts.slice(1) : parts).join('&');
    if (key !== fromHash.key) { fromHash.key = key; costs = costsOf(location.hash); readTrip(); setLang(langOf(location.hash)); render(); prepRise(); }
    var p = atlasPlace(location.hash, IDS), g = location.hash.replace(/^#/, '').split('&')[0].replace(/^reg-/, '');
    if (p) bring($('#pl-' + p));
    else if (/^#reg-/.test(location.hash) && ATLAS_REGIONS.indexOf(g) > -1) toRegion(g);
    lightNow();
  }
  function setLang(l) {
    lang = l;
    VIEW = localContent(CONTENT, lang === 'en' ? CONTENT_EN : null);
    document.documentElement.lang = lang;
    document.title = T('a.doc.title');
    $('#a-hero-img').alt = caption(ATLAS_HERO);
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
    all('#lang-switch [data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    renderCredits();
  }
  /* A card the address brings (a link with #<place> from the page with the route): in sight at once, to the top of the screen
     (under the band of the map), with the focus; the map lights it while it stays there, however short its part across the
     middle (as a place of the field guide on the wildlife subpage). */
  function bring(el) {
    if (!el) return;
    el.classList.remove('a-pre');
    el.scrollIntoView();
    el.focus({ preventScroll: true });
    pinned = el; pinTop = el.getBoundingClientRect().top;
    rise();
    lightNow();
  }
  // a link to a region: its heading to the top, the address as it was
  function toRegion(r) {
    $('#reg-' + r).scrollIntoView();
    rise();
    lightNow();
  }

  /* ---------- the map beside the cards (findings 13 and 15) ---------- */
  /* The whole country (decision 4) with the trip, a dot at every place in its colour, a ring for a place off the trip
     (countryMapAll in page.js); what is lit: the card under the mouse or with the focus, else the item across the middle of
     the screen (below 1101 px, of the part under the band): a card lights its place, with its name and its days on the trip,
     a region's heading (finding 12) all its places, without names, while it crosses the middle. A printout shows every place
     with its number (finding 23). Hidden from a screen reader, which has the same in the cards. */
  var BAND = window.matchMedia('(max-width: 1100px)'), mapDots = [], mapW = 0, litKey = null, mouse = null, pinned = null, pinTop = 0, NAME_H = 18, NUM_PX = 13;
  function r1(v) { return v.toFixed(1); }
  function curve(a, b) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1, k = 0.16 * len;
    return 'M' + r1(a[0]) + ' ' + r1(a[1]) + ' Q' + r1(mx - dy / len * k) + ' ' + r1(my + dx / len * k) + ' ' + r1(b[0]) + ' ' + r1(b[1]);
  }
  function stayText(id) { return trip.stays[id].map(function (s) { return dayRange(s.first, s.last); }).join(' ' + T('and') + ' '); }
  function renderMap() {
    var m = countryMapAll(trip && trip.route, IDS, { frame: COUNTRY_MAP, content: VIEW, airports: AIRPORTS });
    mapDots = m.dots; mapW = m.w;
    // the numbers on paper: each beside its dot, on the side where it meets no other (labelSides in wildpage.js)
    var nums = labelSides(m.dots.map(function (d, i) { return { id: d.id, x: d.x, y: d.y, left: d.left, w: textWidth(String(i + 1), NUM_PX) }; }), 9, m.w, NUM_PX + 2);
    $('#a-map').innerHTML = '<svg viewBox="0 0 ' + m.w + ' ' + m.h + '"><path class="bm-land" d="' + OUTLINE + '"/>' + m.segs.map(function (g) {
      return g.mode === 'fly' ? '<path class="bm-fly" d="' + curve([g.x1, g.y1], [g.x2, g.y2]) + '"/>'
        : '<line class="bm-road" x1="' + r1(g.x1) + '" y1="' + r1(g.y1) + '" x2="' + r1(g.x2) + '" y2="' + r1(g.y2) + '"/>';
    }).join('') + m.stays.map(function (p) { return '<circle class="bm-stay" cx="' + r1(p.x) + '" cy="' + r1(p.y) + '" r="3"/>'; }).join('') +
      m.dots.map(function (d, i) {
        var at = 'cx="' + r1(d.x) + '" cy="' + r1(d.y) + '"', left = nums[d.id];
        return '<g class="bm-pt' + (trip && !trip.stays[d.id] ? ' ring' : '') + '" data-p="' + d.id + '" style="--c:var(--pal-' + VIEW[d.id].color + ')">' +
          '<circle class="bm-halo" ' + at + ' r="9"/><circle class="bm-dot" ' + at + ' r="6"/><text class="bm-name" y="' + r1(d.y + 5) + '">' + esc(short(d.id)) + '</text>' +
          '<text class="bm-num" x="' + r1(d.x + (left ? -9 : 9)) + '" y="' + r1(d.y + 4.5) + '" text-anchor="' + (left ? 'end' : 'start') + '">' + (i + 1) + '</text>' +
          '<circle class="bm-hit" ' + at + ' r="12"/></g>';
      }).join('') + '</svg><div class="w-map-cap"><p class="w-map-names"></p>' + (trip ? '<p class="w-map-key">' + esc(T('w.map.key')) + '</p>' : '') +
      '<ol class="a-maplist">' + IDS.map(function (id, i) { return '<li><b>' + (i + 1) + '</b>' + esc(short(id)) + '</li>'; }).join('') + '</ol></div>';
    litKey = null;
  }
  // the items that light the map, in their order on the page: the headings of the regions and the cards
  function items() { return all('#a-panels .a-region, #a-panels .a-card'); }
  function itemPlaces(el) { return el.classList.contains('a-region') ? IDS.filter(function (id) { return CONTENT[id].region === el.getAttribute('data-reg'); }) : [el.id.slice(3)]; }
  // the line an item lights on: the middle of the screen, below 1101 px of the part under the band
  function middleLine() { return BAND.matches ? (Math.max($('#a-map').getBoundingClientRect().bottom, 0) + window.innerHeight) / 2 : window.innerHeight / 2; }
  function light(el) {
    var ids = el ? itemPlaces(el) : [], one = !!el && el.classList.contains('a-card'), key = ids.join(' ');
    if (key === litKey) return;
    litKey = key;
    all('#a-map .bm-pt').forEach(function (g) {
      var p = g.getAttribute('data-p'), on = ids.indexOf(p) > -1, t = g.querySelector('.bm-name');
      g.classList.toggle('on', on);
      g.classList.toggle('named', on && one);
      if (on && one) {
        var d = mapDots.filter(function (x) { return x.id === p; })[0];
        t.setAttribute('x', r1(d.x + (d.left ? -BIG_NAME_GAP : BIG_NAME_GAP))); t.setAttribute('text-anchor', d.left ? 'end' : 'start');
      }
    });
    $('#a-map').classList.toggle('any', ids.length > 0);
    $('#a-map').classList.toggle('group', ids.length > 0 && !one);
    $('#a-map .w-map-names').innerHTML = !el ? '' : one ? '<span class="w-map-name"><span class="dot' + (trip && !trip.stays[ids[0]] ? ' ring' : '') + '" style="--c:var(--pal-' + VIEW[ids[0]].color + ')"></span>' +
      esc(short(ids[0])) + (trip && trip.stays[ids[0]] ? ' · ' + esc(stayText(ids[0])) : '') + '</span>'
      : '<span class="w-map-name">' + esc(T('a.reg.' + el.getAttribute('data-reg')) + ' · ' + placesText(ids.length)) + '</span>';
  }
  function lightNow() {
    if (!mapDots.length) return;
    var els = items(), i = -1, el = mouse && document.elementFromPoint(mouse.x, mouse.y);
    if (el) els.forEach(function (e, k) { if (i < 0 && e.classList.contains('a-card') && e.contains(el)) i = k; });
    // the card an address brought to the top lights while it stays there (bring)
    if (i < 0 && pinned && Math.abs(pinned.getBoundingClientRect().top - pinTop) < 48) i = els.indexOf(pinned);
    if (i < 0) { pinned = null; i = midItem(els.map(function (e) { var r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }), middleLine()); }
    light(i > -1 ? els[i] : null);
  }
  // a browser sends scroll and pointermove at most once a frame, and lightNow reads the boxes of 23 items only
  window.addEventListener('scroll', lightNow, { passive: true });
  window.addEventListener('resize', lightNow);
  BAND.addEventListener('change', lightNow);
  // the mouse (not a finger) over the cards: the card under it; the keyboard: the card with the focus
  $('#a-panels').addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; mouse = { x: e.clientX, y: e.clientY }; lightNow(); });
  $('#a-panels').addEventListener('pointerleave', function () { mouse = null; lightNow(); });
  $('#a-panels').addEventListener('focusin', function (e) { var c = e.target.closest('.a-card'); if (c) light(c); });
  // the mouse on a dot frames the card of its place; a click on it brings the card to the top of the screen (under the band)
  $('#a-map').addEventListener('mouseover', function (e) {
    var g = e.target.closest('.bm-pt'), p = g && g.getAttribute('data-p');
    all('#a-panels .a-card').forEach(function (c) { c.classList.toggle('w-lit', !!p && c.id === 'pl-' + p); });
  });
  $('#a-map').addEventListener('mouseleave', function () { all('.w-lit').forEach(function (c) { c.classList.remove('w-lit'); }); });
  $('#a-map').addEventListener('click', function (e) {
    var g = e.target.closest('.bm-pt'), el = g && $('#pl-' + g.getAttribute('data-p'));
    if (!el) return;
    el.classList.remove('a-pre');
    // the band as it will stand once the page has moved: stuck at the top, also when the click came before it stuck
    var top = BAND.matches ? $('#a-map').offsetHeight : 0, line = (top + window.innerHeight) / 2, b = el.getBoundingClientRect();
    // a card taller than the half of the screen it would have under the line (most of them) comes to its top instead
    window.scrollBy(0, b.bottom - b.top > 2 * (window.innerHeight - line) ? b.top - top - 12 : (b.top + b.bottom) / 2 - line);
    mouse = null;
    rise();
    light(el);
  });
  // the printout: the map once, every place lit with its number
  window.addEventListener('beforeprint', function () {
    all('.a-pre').forEach(function (c) { c.classList.remove('a-pre'); });
    litKey = null;
    $('#a-map').classList.remove('group');
    all('#a-map .bm-pt').forEach(function (g) { g.classList.add('on'); g.classList.remove('named'); });
  });
  window.addEventListener('afterprint', function () { litKey = 'print'; lightNow(); });

  /* ---------- the cards come in as they reach the screen (finding 15) ---------- */
  /* When the page opens, the cards below the screen wait hidden (a-pre) and rise into place once their top is on it; none
     wait with reduced motion. */
  var STILL = window.matchMedia('(prefers-reduced-motion: reduce)');
  function prepRise() {
    all('.a-pre').forEach(function (c) { c.classList.remove('a-pre'); });
    if (STILL.matches) return;
    all('#a-panels .a-card').forEach(function (c) { if (c.getBoundingClientRect().top > window.innerHeight) c.classList.add('a-pre'); });
  }
  function rise() { all('.a-pre').forEach(function (c) { if (c.getBoundingClientRect().top < window.innerHeight - 40) c.classList.remove('a-pre'); }); }
  window.addEventListener('scroll', rise, { passive: true });
  window.addEventListener('resize', rise);

  /* ---------- the bar of the months: the line under it ---------- */
  function showMonth(b) {
    var bar = b.parentNode;
    bar.querySelectorAll('.a-m').forEach(function (x) { x.classList.toggle('at', x === b); });
    bar.nextElementSibling.textContent = b.getAttribute('aria-label');
  }
  function hideMonth(bar) {
    bar.querySelectorAll('.a-m.at').forEach(function (x) { x.classList.remove('at'); });
    bar.nextElementSibling.textContent = '';
  }

  /* ---------- the album of a place (finding 5): its photos in their order, ‹ ›, the arrow keys, a swipe and a counter ---------- */
  var opener = null, album = [], at = 0, albumOf = null;
  function openViewer(pid, from) {
    var d = $('#w-viewer');
    opener = from; albumOf = from.getAttribute('data-place'); album = VIEW[albumOf].photos.slice(); at = Math.max(album.indexOf(pid), 0);
    showPhoto();
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  }
  function step(k) {
    if (at + k < 0 || at + k >= album.length) return;
    at += k;
    showPhoto();
  }
  // the photo, its caption as the title, under it the place, the author and the licence, which leads to the photo's page
  function showPhoto() {
    var pid = album[at], m = PHOTO_META[pid];
    $('#wv-count').textContent = (at + 1) + ' / ' + album.length;
    $('#wv-prev').disabled = at === 0; $('#wv-next').disabled = at === album.length - 1;
    // an arrow switched off at an end of the album hands the focus to the other one, so the arrow keys keep working
    var off = document.activeElement;
    if (off && off.disabled && /^wv-(prev|next)$/.test(off.id)) $(off.id === 'wv-next' ? '#wv-prev' : '#wv-next').focus();
    $('#wv-photo').innerHTML = img(pid, '(max-width: 900px) 100vw, 900px');
    $('#wv-name').textContent = caption(pid);
    $('#wv-cap').innerHTML = esc(VIEW[albumOf].name) + ' · ' + esc(m.artist) + ' · <a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(licName(m.license)) + '</a>';
    paintFrames();
  }
  function closeViewer() {
    var d = $('#w-viewer');
    if (d.close) d.close(); else d.removeAttribute('open');
  }

  /* ---------- the finishing touches, as on the wildlife subpage ---------- */
  /* The page moves only where the browser runs IntersectionObserver: its first call marks <html> live (atlas.html: the slow
     zoom of the photo at the top, the photos coming in). */
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { document.documentElement.classList.add('live'); o.disconnect(); }).observe($('.w-head'));
  /* A photo loaded late comes in softly: till it has loaded, its frame shows the photo's mean colour (data-ph, from
     build.py) and the photo waits unseen; once loaded (or failed), class in, and the frame drops the colour. */
  function shown(im) { im.classList.add('in'); im.parentNode.style.backgroundColor = ''; }
  function paintFrames() {
    all('img.ph:not(.in)').forEach(function (im) { if (im.complete) shown(im); else im.parentNode.style.backgroundColor = im.getAttribute('data-ph'); });
  }
  ['load', 'error'].forEach(function (k) {
    document.addEventListener(k, function (e) { if (e.target.classList && e.target.classList.contains('ph')) shown(e.target); }, true);
  });

  /* ---------- wiring ---------- */
  document.addEventListener('click', function (e) {
    var v = e.target.closest ? e.target.closest('[data-view]') : null;
    if (v) { openViewer(v.getAttribute('data-view'), v); return; }
    var go = e.target.closest ? e.target.closest('[data-go]') : null;
    if (go) { e.preventDefault(); toRegion(go.getAttribute('data-go')); return; }
    var m = e.target.closest ? e.target.closest('.a-m') : null;
    if (m) { showMonth(m); return; }
    if (e.target.id === 'wv-close' || e.target.id === 'w-viewer') closeViewer();
    var nav = e.target.closest ? e.target.closest('.wv-nav') : null;
    if (nav) step(nav.id === 'wv-next' ? 1 : -1);
  });
  // the bar of the months: the mouse on a field (not a finger, whose tap is a click) and the focus show its line
  var panels = $('#a-panels');
  panels.addEventListener('pointerover', function (e) { var m = e.target.closest('.a-m'); if (m && e.pointerType === 'mouse') showMonth(m); });
  panels.addEventListener('pointerout', function (e) {
    var bar = e.target.closest('.a-bar');
    if (bar && e.pointerType === 'mouse' && !bar.contains(e.relatedTarget) && !bar.contains(document.activeElement)) hideMonth(bar);
  });
  panels.addEventListener('focusin', function (e) { if (e.target.classList.contains('a-m')) showMonth(e.target); });
  panels.addEventListener('focusout', function (e) { var bar = e.target.closest('.a-bar'); if (bar && !bar.contains(e.relatedTarget)) hideMonth(bar); });
  // ← → (and Home, End) go through the months of a bar, which keeps one stop for the keyboard
  panels.addEventListener('keydown', function (e) {
    var m = e.target.closest('.a-m'), k = { ArrowRight: 1, ArrowLeft: -1, Home: -12, End: 12 }[e.key];
    if (!m || !k) return;
    e.preventDefault();
    var cells = Array.prototype.slice.call(m.parentNode.querySelectorAll('.a-m')), i = Math.min(11, Math.max(0, cells.indexOf(m) + k));
    cells.forEach(function (c, j) { c.tabIndex = j === i ? 0 : -1; });
    cells[i].focus();
  });
  $('#w-viewer').addEventListener('close', function () { if (opener) opener.focus(); opener = null; });
  $('#w-viewer').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); }
  });
  var x0 = null;
  $('#w-viewer').addEventListener('touchstart', function (e) { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
  $('#w-viewer').addEventListener('touchend', function (e) {
    if (x0 == null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) >= 50) step(dx < 0 ? 1 : -1);
  });
  /* EN · PL: the texts anew, without the place in the address, the trip and the costs kept; the card lit across the middle
     stays where it stood on the screen, as the cards' heights change with the language */
  $('#lang-switch').addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (!b || b.getAttribute('data-lang') === lang) return;
    var keep = litKey && litKey.indexOf(' ') < 0 ? litKey : null, before = keep ? $('#pl-' + keep).getBoundingClientRect().top : 0;
    var h = atlasHash(null, trip && trip.settings, b.getAttribute('data-lang'), costs) || location.pathname;
    try { history.replaceState(null, '', h); } catch (err) { location.replace(h); }
    fromHash();
    if (keep) { window.scrollBy(0, $('#pl-' + keep).getBoundingClientRect().top - before); rise(); lightNow(); }
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();
  /* for the probes in tests/probes/ */
  window.__atlas = { trip: function () { return trip; }, ids: IDS, today: TODAY };
})();
