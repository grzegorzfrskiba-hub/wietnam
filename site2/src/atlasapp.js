/* The atlas of places (stage 7, …/atlas/, notes/plans/2026-10-22-atlas-projekt.md): the 20 places of the pool from north to
   south, region by region (atlasOrder and atlasRegions in atlaspage.js). Each place is a card: a big photo and a strip of the
   others, which open the place's album, and under them what the page knows already (decision 2: no new texts of the
   places): the line under its name, the interests it serves, what it is, the bar of the twelve months, what to do and its
   hidden gem. With the settings of a trip in the address it plans the same trip as the page with the route (engine.js) and
   says for each place whether it is on the trip, with its days, or why not, what Dodaj would drop, and Dodaj itself, back to
   that page with the place added (decision 1). An address with a place (#hoian&…) opens the atlas on it (finding 4).
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
    if (!r.ok) return;
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
    return '<p class="a-k">' + esc(T('a.when')) + '</p><div class="a-bar" role="group" aria-label="' + esc(T('a.when')) + '">' + bar.map(function (x) {
      return '<button type="button" class="a-m s' + x.season + (x.trip ? ' trip' : '') + '" data-m="' + x.m + '" tabindex="' + (x.m === first ? 0 : -1) + '" aria-label="' + esc(monthLine(x)) + '">' +
        '<i></i>' + esc(T('mon3.' + x.m)) + '</button>';
    }).join('') + '</div><p class="a-mline" aria-hidden="true"></p>';
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
      '<div class="a-strip">' + ps.slice(1).map(function (p) { return photo(p, id, 'a-thumb', '(max-width: 640px) 25vw, 200px'); }).join('') + '</div>' +
      '<div class="a-body"><p class="a-regname">' + esc(T('a.reg.' + c.region)) + '</p><h3><span class="a-num">' + n + '</span> ' + esc(c.name) + '</h3>' +
      '<p class="a-sub">' + esc(tied(c.sub)) + '</p><p class="a-ints">' + placeInterests(PLACES[id].fit).map(function (k) { return '<span>' + esc(T('int.' + k)) + '</span>'; }).join('') + '</p>' +
      (stays ? '<p class="w-ok">' + esc(T('a.on', { days: stays.map(function (s) { return dayRange(s.first, s.last); }).join(' ' + T('and') + ' ') })) + '</p>' : '') +
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
    $('#a-regions').innerHTML = REGS.map(function (g) { return '<a href="#reg-' + g.region + '" data-go="' + g.region + '">' + esc(T('a.reg.' + g.region)) + '</a>'; }).join('');
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
  function render() { renderPlaces(); renderLinks(); paintFrames(); }

  /* ---------- the view ---------- */
  /* The address: the trip (only when it changed, as planning takes a moment) and the language; a place before them moves the
     page to its card. */
  function fromHash() {
    var parts = location.hash.replace(/^#/, '').split('&'), key = (parts[0].indexOf('=') < 0 ? parts.slice(1) : parts).join('&');
    if (key !== fromHash.key) { fromHash.key = key; costs = costsOf(location.hash); readTrip(); setLang(langOf(location.hash)); render(); }
    var p = atlasPlace(location.hash, IDS);
    if (p) bring($('#pl-' + p));
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
  // a card the address brings (a link with #<place> from the page with the route): to the top of the screen, with the focus
  function bring(el) {
    if (!el) return;
    el.scrollIntoView();
    el.focus({ preventScroll: true });
  }
  // a link to a region: its heading to the top, the address as it was
  function toRegion(r) { $('#reg-' + r).scrollIntoView(); }

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
  /* EN · PL: the texts anew, without the place in the address (the page stays where it is), the trip and the costs kept */
  $('#lang-switch').addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (!b || b.getAttribute('data-lang') === lang) return;
    var h = atlasHash(null, trip && trip.settings, b.getAttribute('data-lang'), costs) || location.pathname;
    try { history.replaceState(null, '', h); } catch (err) { location.replace(h); }
    fromHash();
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();
  /* for the probes in tests/probes/ */
  window.__atlas = { trip: function () { return trip; }, ids: IDS, today: TODAY };
})();
