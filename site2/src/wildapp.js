/* The wildlife subpage (stage 6, …/wildlife/): three tabs, On your route, Gallery and Field guide, each with its own address
   (wildView in wildpage.js). With the settings of a trip in the address it plans the same trip as the page with the route
   (engine.js) and says for each encounter whether its place is on the trip, in the day's plan and in the term; Dodaj goes
   back to that page with the place added (dodaj=), saying first what would leave the trip (whyOff in page.js).
   Texts: wild.js and wildui.js, in English en/wild.js and en/wildui.js; the page's language as on the page with the route. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- texts ---------- */
  var lang = 'en', costs = false;
  var VIEW = CONTENT, SP = WILD, GD = WILD_GUIDE, AVOID = WILD_AVOID, OUTSIDE = WILD_OUTSIDE;
  // a text of the subpage (WUI) or, for the words both pages share (months, levels), of the page with the route (UI)
  function T(k, vars) {
    var own = WUI[lang], t = own.hasOwnProperty(k) ? own[k] : UI[lang][k];
    if (t == null) throw new Error('no text ' + k);
    return vars ? t.replace(/\{(\w+)\}/g, function (m, n) { return vars[n]; }) : t;
  }
  // the multi-word names a line may not break inside, as on the page with the route (app.js), and the no-break spaces of
  // the language's typography (page.js)
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(CONTENT_EN).map(function (id) { return CONTENT_EN[id].short; }), Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
    .filter(function (n, i, all) { return n.indexOf(' ') > -1 && all.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  function tied(text) { return tieNames(tieVietnamese(lang === 'pl' ? tieShort(text) : tieEnglish(text)), TIED_NAMES); }
  function short(id) { return VIEW[id].short; }
  function caption(id) { return lang === 'en' ? WILD_CAPS_EN[id] : WILD_PHOTOS[id].cap; }
  function names(ids) { return ids.map(short).join(', '); }
  function capFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function dayRange(a, b) { return a === b ? T('w.day', { n: a }) : T('w.days', { a: a, b: b }); }

  /* ---------- the trip from the address ---------- */
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var TODAY = clampToday(new Date().toISOString().slice(0, 10), HOLIDAYS_FROM, PLAN_LAST_YEAR);
  // trip: { settings, st, route, stays, months, off } or null (no trip in the address, or one that gives no trip)
  var trip = null, view = { tab: 'gallery', place: null };
  function readTrip() {
    trip = null;
    if (!hasTrip(location.hash)) return;
    var defaults = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
    var got = settingsFromLink(parseLink(location.hash), defaults, PLACES, HUBS, [], SWAPS), r = planRoute(got.st, DATA);
    if (!r.ok) return;
    var off = {};
    whyOff(r, got.settings, got.st, DATA, CLIMATE).forEach(function (x) { off[x.id] = x; });
    trip = { settings: got.settings, st: got.st, route: r, stays: tripStays(r, got.st, CONTENT, FERRY), months: termMonths(got.st), off: off };
  }
  // the trip in one line, as in the summary of the page with the route: the term, the days and the level
  function tripLine() {
    var st = trip.st, term = st.start ? fmtSpan(st.start, tripDate(st.start, st.days), lang === 'en' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (m) { return T('mon3.' + m); }) : null)
      : T('term.month', { month: T('mon.' + st.month), year: st.year });
    return T('w.trip', { term: term, days: st.days, level: T('lvl.' + st.level) });
  }
  function onTrip(id) { return trip && SP[id].meet.some(function (m) { return trip.stays[m.place]; }); }

  /* ---------- pieces ---------- */
  var DOTS = { 3: '●●●', 2: '●●○', 1: '●○○', 0: '○○○' };
  function img(id, sizes) {
    var p = WILD_PICS[id];
    return '<img src="' + esc(p.src) + '"' + (p.srcset ? ' srcset="' + esc(p.srcset) + '" sizes="' + sizes + '"' : '') + ' width="' + p.w + '" height="' + p.h +
      '" alt="' + esc(caption(id)) + '" loading="lazy" decoding="async">';
  }
  function photoBox(id, cls) {
    if (SP[id].nophoto) return '<div class="w-nophoto ' + cls + '"><span>' + esc(T('w.nophoto')) + '</span></div>';
    return '<button type="button" class="w-photo ' + cls + '" data-view="' + id + '" aria-label="' + esc(T('w.view.aria', { x: SP[id].name })) + '">' +
      img(id, cls === 'w-tile-photo' ? '(max-width: 640px) 50vw, 240px' : '(max-width: 640px) 100vw, 380px') + '</button>';
  }
  function kind(k) { return '<span class="w-kind w-kind-' + k + '">' + esc(T('w.kind.' + k)) + '</span>'; }
  function chance(c, note) { return '<span class="w-dots" aria-hidden="true">' + DOTS[c] + '</span> <span>' + esc(note || T('w.chance.' + c)) + '</span>'; }
  function iucn(x) { return x.iucn ? '<span class="w-iucn w-iucn-' + x.iucn.toLowerCase() + '">' + esc(T('w.iucn', { cat: T('w.iucn.' + x.iucn) })) + '</span>' : ''; }
  function namesLine(x) { return '<p class="w-sci">' + esc(x.vn) + ' · <i>' + esc(x.lat) + '</i></p>'; }

  /* Dodaj for a place off the trip (findings 10 and 27): a link back to the page with the route and the place added, and
     before it what would leave the trip, from the same whyOff as the list „Nie ma na twojej trasie”; with the term wrong for
     the animal, when it can be seen instead of the link; a place that cannot be added says so. Without a trip, Dodaj opens
     the page with its own defaults and the place. */
  function addBlock(p, meet) {
    if (!trip) return '<a class="btn-small w-add" href="' + esc(tripLink(null, lang, costs, p)) + '">' + esc(T('w.add', { x: short(p) })) + '</a>';
    if (meet && !meetInTerm(meet, trip.months)) return '<p class="w-no">' + esc(T('w.term.no', { when: meet.season })) + '</p>';
    var x = trip.off[p];
    if (!x || !x.canAdd) return '<p class="w-muted">' + esc(T('w.cannot', { x: short(p) })) + '</p>';
    var what = x.drops.length ? T('off.drops', { list: names(x.drops) }) : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops');
    return '<p class="w-drops">' + esc(tied(what)) + '</p><a class="btn-small w-add" href="' + esc(tripLink(trip.settings, lang, costs, p)) + '">' + esc(T('w.add', { x: short(p) })) + '</a>';
  }
  // one encounter of a card: where and how, the chance, when; with a trip, what the trip means for it (finding 9)
  function meetBlock(m) {
    var h = '<li class="w-meet"><p class="w-meet-top">' + kind(m.kind) + ' <b>' + esc(short(m.place)) + '</b> <span class="w-chance">' + chance(m.chance, m.chanceNote) + '</span></p>' +
      '<p>' + esc(tied(capFirst(m.where))) + '</p><p class="w-muted">' + esc(T('w.when', { when: tied(m.when) })) + '</p>';
    if (trip) {
      var o = meetOnTrip(m, trip.stays, trip.st.months);
      if (o) {
        h += '<p class="w-ok">' + esc(T('w.on', { x: short(m.place), days: dayRange(o.first, o.last) })) + '</p>';
        if (o.month === false) h += '<p class="w-no">' + esc(T('w.term.no', { when: m.season })) + '</p>';
        else if (o.plan) h += '<p class="w-ok">' + esc(T('w.plan.yes')) + '</p>';
        else h += '<p class="w-muted">' + esc(m.plan ? T('w.plan.level') : T('w.plan.no')) + '</p>';
      }
    }
    return h + '</li>';
  }
  function card(id) {
    var x = SP[id], places = [];
    x.meet.forEach(function (m) { if (places.indexOf(m.place) < 0) places.push(m.place); });
    var adds = trip ? places.filter(function (p) { return !trip.stays[p]; }) : places;
    var h = '<article class="w-card" id="sp-' + id + '" tabindex="-1">' + photoBox(id, 'w-card-photo') + '<div class="w-card-body"><h3>' + esc(x.name) + '</h3>' +
      (x.alt ? '<p class="w-alt">' + esc(x.alt) + '</p>' : '') + namesLine(x) + iucn(x) + '<p class="w-why">' + esc(tied(x.why)) + '</p>' +
      '<ul class="w-meets">' + x.meet.map(meetBlock).join('') + '</ul>';
    // Dodaj only when the species is not on the trip yet: one per place, at the encounter of that place
    if (!onTrip(id)) h += adds.map(function (p) { return '<div class="w-addbox">' + addBlock(p, x.meet.filter(function (m) { return m.place === p; })[0]) + '</div>'; }).join('');
    return h + '</div></article>';
  }

  /* ---------- the tabs ---------- */
  function renderRoute() {
    var o = routeOrder(SP, trip ? onTrip : null), h = '<div class="w-intro"><h2>' + esc(T('w.route.h')) + '</h2><p>' + esc(T('w.route.lead')) + '</p></div>';
    h += trip ? '<div class="w-tripbox"><p><b>' + esc(T('w.trip.h')) + '</b> ' + esc(tripLine()) + '</p><p class="w-muted">' + esc(T('w.trip.places', { list: names(trip.route.stops.filter(function (s) { return !PLACES[s.id].node; }).map(function (s) { return s.id; }).filter(function (id, i, a) { return a.indexOf(id) === i; })) })) + '</p></div>'
      : '<div class="w-tripbox"><p><b>' + esc(T('w.notrip.h')) + '</b> ' + esc(T('w.notrip')) + '</p></div>';
    h += '<p class="w-legend">' + esc(T('w.legend')) + ' ' + kind('wild') + ' ' + kind('rescue') + ' ' + kind('program') + '</p>';
    if (trip) {
      h += '<h2 class="w-group">' + esc(T('w.group.on')) + ' <small>' + o.on.length + '</small></h2><div class="w-cards">' + o.on.map(card).join('') + '</div>';
      h += '<h2 class="w-group">' + esc(T('w.group.off')) + ' <small>' + o.off.length + '</small></h2><div class="w-cards">' + o.off.map(card).join('') + '</div>';
    } else h += '<div class="w-cards">' + o.off.map(card).join('') + '</div>';
    $('#p-route').innerHTML = h;
  }
  function renderGallery() {
    var h = '<div class="w-intro"><h2>' + esc(T('w.gallery.h')) + '</h2><p>' + esc(T('w.gallery.lead')) + '</p></div>';
    WILD_GROUPS.forEach(function (g) {
      var ids = Object.keys(SP).filter(function (id) { return SP[id].gallery && SP[id].group === g; });
      if (!ids.length) return;
      h += '<h2 class="w-group">' + esc(T('w.g.' + g)) + ' <small>' + ids.length + '</small></h2><ul class="w-tiles">' + ids.map(function (id) {
        return '<li class="w-tile' + (g === 'legends' ? ' w-legend-tile' : '') + '">' + photoBox(id, 'w-tile-photo') +
          '<button type="button" class="w-tile-name" data-view="' + id + '"><b>' + esc(SP[id].name) + '</b><i>' + esc(SP[id].lat) + '</i></button></li>';
      }).join('') + '</ul>';
    });
    $('#p-gallery').innerHTML = h;
  }
  function guideRow(r) {
    if (r.row) {
      var x = r.row;
      if (x.kind === 'note') return '<li class="w-row w-note"><p><b>' + esc(x.name) + ':</b> ' + esc(tied(x.how)) + '</p></li>';
      return '<li class="w-row"><p class="w-row-name"><b>' + esc(x.name) + '</b> ' + kind(x.kind) + '</p><div><p>' + esc(tied(capFirst(x.how))) + '</p>' +
        (x.when ? '<p class="w-muted">' + esc(T('w.when', { when: tied(x.when) })) + '</p>' : '') + '</div><p class="w-chance">' + chance(x.chance) + '</p></li>';
    }
    var s = SP[r.id], m = s.meet[r.i];
    return '<li class="w-row"><p class="w-row-name"><a href="' + esc(wildHash({ tab: 'route', place: null }, trip && trip.settings, lang, costs)) + '" data-card="' + r.id + '"><b>' + esc(s.name) + '</b></a> ' + kind(m.kind) + '</p>' +
      '<div><p>' + esc(tied(capFirst(m.where))) + '</p><p class="w-muted">' + esc(T('w.when', { when: tied(m.when) })) + '</p></div><p class="w-chance">' + chance(m.chance, m.chanceNote) + '</p></li>';
  }
  function renderGuide() {
    var h = '<div class="w-intro"><h2>' + esc(T('w.guide.h')) + '</h2><p>' + esc(T('w.guide.lead')) + '</p></div>';
    Object.keys(GD).forEach(function (p) {
      var on = trip && trip.stays[p];
      h += '<section class="w-place" id="guide-' + p + '" tabindex="-1"><div class="w-place-h"><h3>' + esc(VIEW[p].name) + '</h3><p class="w-muted">' + esc(GD[p].where) + '</p>' +
        (on ? '<p class="w-ok">' + esc(T('w.place.on')) + '</p>' : '<div class="w-addbox">' + addBlock(p, null) + '</div>') + '</div>' +
        '<ul class="w-rows">' + guideRows(SP, GD, p).map(guideRow).join('') + '</ul></section>';
    });
    h += '<section class="w-box w-avoid"><h3>' + esc(T('w.avoid.h')) + '</h3><ul>' + AVOID.map(function (t) { return '<li>' + esc(tied(t)) + '</li>'; }).join('') + '</ul></section>';
    h += '<section class="w-box"><h3>' + esc(T('w.outside.h')) + '</h3><ul>' + OUTSIDE.map(function (o) { return '<li><b>' + esc(o.name) + '</b>: ' + esc(tied(o.text)) + '</li>'; }).join('') + '</ul></section>';
    $('#p-guide').innerHTML = h;
  }
  function renderCredits() {
    $('#w-credits-h').textContent = T('w.credits.h', { n: Object.keys(WILD_PHOTOS).length });
    $('#w-credits').innerHTML = Object.keys(WILD_PHOTOS).map(function (id) {
      var m = WILD_PHOTOS[id], lic = licenceUrl(m.license, lang);
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(caption(id)) + '</a>: ' + esc(m.artist) + ', ' +
        (lic ? '<a href="' + esc(lic) + '" target="_blank" rel="noopener">' + esc(m.license === 'Public domain' ? UI[lang]['ft.pd'] : m.license) + '</a>' : esc(m.license)) + '</li>';
    }).join('');
  }

  /* ---------- the view ---------- */
  function showTab() {
    WILD_TABS.forEach(function (t) {
      var a = $('#tab-' + t);
      a.href = wildHash({ tab: t, place: null }, trip && trip.settings, lang, costs);
      if (t === view.tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      $('#p-' + t).hidden = t !== view.tab;
    });
    $('#w-back').href = tripLink(trip && trip.settings, lang, costs, null);
    $('#w-back').textContent = T(trip ? 'w.back.trip' : 'w.back.plan');
  }
  function render() {
    renderRoute(); renderGallery(); renderGuide(); showTab();
  }
  /* The address: the trip (only when it changed, as planning takes a moment), the language, the tab. An address of a place
     of the guide moves to its section. */
  function fromHash() {
    var parts = location.hash.replace(/^#/, '').split('&'), key = (parts[0].indexOf('=') < 0 ? parts.slice(1) : parts).join('&');
    if (key !== fromHash.key) { fromHash.key = key; costs = costsOf(location.hash); readTrip(); setLang(langOf(location.hash)); render(); }
    var was = view.tab;
    view = wildView(location.hash, GD);
    showTab();
    // another tab starts at its top, under the tabs, when the page had scrolled past them
    var head = $('.w-head').getBoundingClientRect().bottom + window.scrollY;
    if (was !== view.tab && !view.place && window.scrollY > head) window.scrollTo(0, head);
    if (view.place) { var s = $('#guide-' + view.place); if (s) { s.scrollIntoView(); s.focus({ preventScroll: true }); } }
  }
  function setLang(l) {
    lang = l;
    VIEW = localContent(CONTENT, lang === 'en' ? CONTENT_EN : null);
    SP = localContent(WILD, lang === 'en' ? WILD_EN : null);
    GD = localContent(WILD_GUIDE, lang === 'en' ? WILD_GUIDE_EN : null);
    AVOID = lang === 'en' ? WILD_AVOID_EN : WILD_AVOID;
    OUTSIDE = lang === 'en' ? WILD_OUTSIDE_EN : WILD_OUTSIDE;
    document.documentElement.lang = lang;
    document.title = T('w.doc.title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
    Array.prototype.forEach.call(document.querySelectorAll('#lang-switch [data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    renderCredits();
  }

  /* ---------- the photo viewer (finding 13): the photo, two sentences, the names and the photo's caption ---------- */
  var opener = null;
  function openViewer(id, from) {
    var x = SP[id], d = $('#w-viewer');
    opener = from;
    $('#wv-photo').innerHTML = x.nophoto ? '<div class="w-nophoto"><span>' + esc(T('w.nophoto')) + '</span></div>' : img(id, '(max-width: 900px) 100vw, 900px');
    $('#wv-name').textContent = x.name + (x.alt ? ' (' + x.alt + ')' : '');
    $('#wv-sci').innerHTML = esc(x.vn) + ' · <i>' + esc(x.lat) + '</i>' + (x.iucn ? ' · ' + esc(T('w.iucn', { cat: T('w.iucn.' + x.iucn) })) : '');
    $('#wv-why').textContent = tied(x.why);
    $('#wv-cap').innerHTML = x.nophoto ? '' : esc(caption(id)) + ' · ' + esc(WILD_PHOTOS[id].artist) + ' · <a href="' + esc(WILD_PHOTOS[id].page) + '" target="_blank" rel="noopener">' + esc(WILD_PHOTOS[id].license === 'Public domain' ? UI[lang]['ft.pd'] : WILD_PHOTOS[id].license) + '</a>';
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  }
  function closeViewer() {
    var d = $('#w-viewer');
    if (d.close) d.close(); else d.removeAttribute('open');
  }

  /* ---------- wiring ---------- */
  document.addEventListener('click', function (e) {
    var v = e.target.closest ? e.target.closest('[data-view]') : null;
    if (v) { openViewer(v.getAttribute('data-view'), v); return; }
    var c = e.target.closest ? e.target.closest('[data-card]') : null;
    if (c) {   // a species of the guide: its card in On your route
      e.preventDefault();
      try { history.pushState(null, '', c.getAttribute('href')); } catch (err) { location.hash = c.getAttribute('href'); }
      fromHash();
      var el = $('#sp-' + c.getAttribute('data-card'));
      if (el) { el.scrollIntoView(); el.focus({ preventScroll: true }); }
      return;
    }
    if (e.target.id === 'wv-close' || e.target.id === 'w-viewer') closeViewer();
  });
  $('#w-viewer').addEventListener('close', function () { if (opener) opener.focus(); opener = null; });
  $('#lang-switch').addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (!b || b.getAttribute('data-lang') === lang) return;
    var h = wildHash(view, trip && trip.settings, b.getAttribute('data-lang'), costs);
    try { history.replaceState(null, '', h); } catch (err) { location.replace(h); }
    fromHash();
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();
  /* for the probes in tests/probes/ */
  window.__wild = { trip: function () { return trip; }, view: function () { return view; }, today: TODAY };
})();
