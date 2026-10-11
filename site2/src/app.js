/* Page logic: reads the settings (the link or the form), plans the trip with the engine (engine.js) and renders the facts,
   the day strip, the stays with their day plans and the journeys. Pure helpers: page.js; texts: ui.js, content/, photos.js. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- texts ---------- */
  var lang = 'pl';   // the only language for now; UI keeps its keys, so another one can come later as UI.<code>
  function T(k, vars) {
    var v = UI[lang][k];
    if (v == null) return k;
    if (vars) Object.keys(vars).forEach(function (n) { v = v.split('{' + n + '}').join(vars[n]); });
    return v;
  }
  function countWord(key, n) { return T(key + '.' + nightForm(n)); }
  function C(id) { return CONTENT[id]; }
  function caption(id) { return PHOTO_META[id].cap; }
  function nodeOf(id) { return PLACES[id].node || id; }
  function stopColor(id) { return 'var(--c-' + nodeOf(id) + ')'; }

  /* ---------- formatting ---------- */
  function fmtH(h) {
    var mins = Math.round(h * 60 / 5) * 5;
    if (mins < 60) return mins + ' ' + T('min');
    var hh = Math.floor(mins / 60), mm = mins % 60;
    return mm ? T('fmt.hm', { h: hh, m: mm }) : hh + ' ' + T('h');
  }
  function approx(h) {
    var r = Math.round(h * 2) / 2, whole = Math.floor(r);
    return '≈ ' + (r % 1 ? (whole ? whole : '') + '½' : whole) + ' ' + T('h');
  }
  function dayRange(a, b) { return a === b ? T('day') + ' ' + a : T('days') + ' ' + a + '–' + b; }
  // the weekday and date of trip day n, only when the trip has dates: "czw. 28.01", short enough for one line under the number
  function dateLabel(day) {
    var iso = tripDate(state.st.start, day);
    if (!iso) return '';
    var p = iso.split('-').map(Number);
    var wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString('pl-PL', { weekday: 'short', timeZone: 'UTC' });
    return wd + '\u00a0' + p[2] + '.' + (p[1] < 10 ? '0' : '') + p[1];
  }
  function termText(st) {
    return st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('term.month', { month: T('mon.' + st.month), year: st.year });
  }

  /* ---------- state ---------- */
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var TODAY = clampToday(new Date().toISOString().slice(0, 10), HOLIDAYS_FROM, PLAN_LAST_YEAR);   // the device clock, held inside the days the page plans for
  var DEFAULTS = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay
  var state = { settings: null, st: null, route: null, plans: null };

  function msg(text) { $('#settings-msg').textContent = tied(text); }

  /* New settings: plan the trip; when there is one, show it and write the settings into the address. Otherwise keep the
     last trip and say why under the settings. Returns whether the trip changed. */
  function apply(s) {
    var st = normSettings(s, PLACES, HUBS), r = st.ok ? planRoute(st, DATA) : null;
    if (!st.ok || !r.ok) {
      msg(T('set.err.' + (st.ok ? r.error : st.error), { min: MIN_DAYS, max: MAX_DAYS }) + (state.route ? T('set.err.keep') : ''));
      return false;
    }
    var done = {};
    state.settings = s; state.st = st; state.route = r;
    state.plans = r.stops.map(function (x, i) {
      var days = stopDays(C(x.id), x, done[x.id] || 0, st.level, st.months, legAfter(r, i));
      done[x.id] = (done[x.id] || 0) + x.n;
      return days;
    });
    msg('');
    $('#dropped').textContent = '';   // the sentence of the last Dodaj is about the trip that is gone
    var h = linkHash(s);
    if (location.hash !== h) {
      try { history.replaceState(null, '', h); } catch (e) { location.replace(h); }
    }
    render();
    return true;
  }

  /* The settings in the address: a link someone sent, or the defaults. A link whose Dodaj and Usuń leave no trip opens
     without them. */
  function fromLink() {
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), DEFAULTS, PLACES, HUBS, bad), dropped = got.dropped.length > 0;
    if (!apply(got.settings)) { apply(withoutChanges(got.settings)); dropped = true; }
    if (dropped) msg(T('set.dropped'));
    syncForm();
  }

  /* ---------- the settings form ---------- */
  var F = null;
  function buildForm() {
    F = $('#settings-form');
    var days = [];
    for (var d = MIN_DAYS; d <= MAX_DAYS; d++) days.push('<option value="' + d + '">' + d + '</option>');
    F.days.innerHTML = days.join('');
    var airports = Object.keys(HUBS).map(function (code) { return '<option value="' + code + '">' + esc(AIRPORTS[code].name) + '</option>'; }).join('');
    F.from.innerHTML = airports;
    F.to.innerHTML = airports;
    $('#interest-list').innerHTML = INTERESTS.map(function (k) {
      return '<label class="chip"><input type="checkbox" name="interest" value="' + k + '"><span>' + T('int.' + k) + '</span></label>';
    }).join('');
    $('#level-list').innerHTML = LEVELS.map(function (n) {
      return '<label class="chip chip-wide"><input type="radio" name="level" value="' + n + '"><span><b>' + T('lvl.' + n) + '</b>' + T('lvlp.' + n) + '</span></label>';
    }).join('');
    F.start.min = TODAY;
    F.start.max = PLAN_LAST_YEAR + '-12-31';
    F.addEventListener('submit', function (e) { e.preventDefault(); });
    F.addEventListener('change', onFormChange);
  }
  // the months on offer, plus the month of a link from outside that range, so the form always shows the settings
  function monthOptions(s) {
    var list = monthChoices(TODAY, PLAN_LAST_YEAR);
    if (s.year && !list.some(function (m) { return m.year === s.year && m.month === s.month; })) list.unshift({ year: s.year, month: s.month });
    F.month.innerHTML = list.map(function (m) {
      return '<option value="' + m.year + '-' + m.month + '">' + T('mon.' + m.month) + ' ' + m.year + '</option>';
    }).join('');
  }
  /* The form shows state.settings. Once two interests are chosen, the other three are greyed out. */
  function syncForm() {
    var s = state.settings, dates = !!s.start;
    monthOptions(s);
    F.mode.value = dates ? 'dates' : 'month';
    $('#term-month').hidden = dates;
    $('#term-dates').hidden = !dates;
    if (dates) { F.start.value = s.start; F.end.value = s.end; F.end.min = s.start; }
    else { F.month.value = s.year + '-' + s.month; F.days.value = String(s.days); }
    F.from.value = s.from;
    F.to.value = s.to;
    F.level.value = String(s.level);
    var two = s.interests.length >= 2;
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) {
      b.checked = s.interests.indexOf(b.value) > -1;
      b.disabled = two && !b.checked;
    });
  }
  function readForm() {
    var s = { from: F.from.value, to: F.to.value, interests: [], level: +F.level.value,
      add: state.settings.add.slice(), remove: state.settings.remove.slice() };
    if (F.mode.value === 'dates') { s.start = F.start.value; s.end = F.end.value; }
    else {
      var ym = F.month.value.split('-');
      s.year = +ym[0]; s.month = +ym[1]; s.days = +F.days.value;
    }
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) { if (b.checked) s.interests.push(b.value); });
    return s;
  }
  /* A change in the form. Switching between the month and the dates keeps the trip: the first of the month (or today)
     and the same length, or the month of the arrival day and the same number of days. */
  function onFormChange(e) {
    var s, st = state.st;
    if (e.target.name === 'mode') {
      s = copySettings(state.settings);
      if (e.target.value === 'dates' && !s.start) {
        var first = st.year + '-' + (st.month < 10 ? '0' : '') + st.month + '-01';
        if (first < TODAY) first = TODAY;
        s.start = first;
        s.end = tripDate(first, st.days);
      } else if (e.target.value === 'month' && s.start) {
        s.year = +s.start.slice(0, 4); s.month = +s.start.slice(5, 7); s.days = st.days;
        delete s.start; delete s.end;
      }
    } else {
      s = readForm();
    }
    if (apply(s)) syncForm();
  }

  /* Links inside the page (a day in the strip, the menu, back to the top) scroll without changing the address, which
     holds the settings; smoothly or not as the CSS says (scroll-behavior, off for reduced motion). A link pasted into the
     address bar opens its settings. */
  function bindAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      var el = a && document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ block: 'start' });
      if (!/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    });
    window.addEventListener('hashchange', function () {
      if (state.settings && location.hash === linkHash(state.settings)) return;
      var bad = [];
      if (!Object.keys(parseLink(location.hash, bad)).length && !bad.length) {   // an anchor typed by hand: put the settings back
        try { history.replaceState(null, '', linkHash(state.settings)); } catch (e) { /* the address keeps the anchor */ }
        return;
      }
      fromLink();
    });
  }

  /* ---------- rendering ---------- */
  var ICON = {
    fly: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>',
    road: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v7h-2v-2H7v2H5zm2.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7 11h10l-1-3.5H8z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>',
    expand: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };

  function render() {
    renderFacts();
    renderShape();
    renderOffRoute();
    renderMap();
    renderStops();
    $('#copy-status').textContent = '';
    $('#copy-fallback').hidden = true;
    tieShortWords(document.body);
  }

  function renderFacts() {
    var r = state.route, st = state.st, k = routeStats(r, state.plans, PLACES), n = r.days - 1;
    $('#facts-for').textContent = T('f.for', { from: AIRPORTS[st.from].name, to: AIRPORTS[st.to].name, term: termText(st) });
    $('#facts').innerHTML =
      '<li><b>' + r.days + '</b><span>' + T('f.days', { nights: n + ' ' + countWord('nights', n) }) + '</span></li>' +
      '<li><b>' + k.places + '</b><span>' + countWord('f.places', k.places) + '</span></li>' +
      '<li><b>' + k.flights + '</b><span>' + countWord('f.flights', k.flights) + '</span></li>' +
      '<li><b>' + k.hikes + '</b><span>' + countWord('f.hikes', k.hikes) + '</span></li>' +
      '<li><b>' + approx(k.longest).replace('≈ ', '') + '</b><span>' + T('f.longest') + '</span></li>';
    var a = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS);
    var lines = a.hits.map(function (h) { return T('alert.' + h.kind, { name: h.name, span: fmtSpan(h.from, h.to) }); });
    if (a.unknown) lines.push(T('alert.nodata'));
    if (termPassed(st, TODAY)) lines.unshift(T('alert.past'));   // an old link keeps its trip, and says so
    $('#alerts').innerHTML = lines.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    $('#alerts').hidden = !lines.length;
  }

  function renderShape() {
    var r = state.route, cells = [];
    $('#shape-h2').textContent = T('shape.h2', { days: r.days });
    r.stops.forEach(function (s, i) {
      state.plans[i].forEach(function (d, k) {
        var label = T('day') + ' ' + d.day + ': ' + C(s.id).short + ', ' + d.t + (dateLabel(d.day) ? ' (' + dateLabel(d.day) + ')' : '');
        cells.push('<a class="cell' + (k === 0 ? ' arrive' : '') + '" href="#day-' + d.day + '" style="--c:' + stopColor(s.id) +
          '" aria-label="' + esc(label) + '"><span>' + d.day + '</span></a>');
      });
    });
    cells.push('<a class="cell home" href="#day-' + r.days + '" aria-label="' + esc(T('flyhome.aria', { days: r.days, airport: AIRPORTS[state.st.to].name })) +
      '"><span>' + r.days + '</span>' + ICON.fly + '</a>');
    $('#strip').innerHTML = cells.join('');
    $('#strip').style.setProperty('--cols', Math.min(r.days, 16));
    $('#strip-legend').innerHTML = r.stops.map(function (s) {
      return '<li><span class="dot" style="--c:' + stopColor(s.id) + '"></span>' + esc(C(s.id).short) + ' <span class="mono">' + dayRange(s.start, s.end) + '</span></li>';
    }).join('') + '<li><span class="dot home-dot"></span>' + T('flyhome') + ' <span class="mono">' + T('day') + ' ' + r.days + '</span></li>';
    $('#missing').textContent = r.missing.length ? T('missing', { x: r.missing.map(function (id) { return C(id).short; }).join(', ') }) : '';
  }

  function dayItem(d) {
    return '<li class="day" id="day-' + d.day + '"><div class="day-n mono">' + T('day') + ' <b>' + d.day + '</b>' +
      (dateLabel(d.day) ? '<span class="day-date">' + esc(dateLabel(d.day)) + '</span>' : '') + '</div>' +
      '<div class="day-body"><h4>' + esc(d.t) + ' <span class="pace pace-' + d.pace + '">' + T('pace.' + d.pace) + '</span>' +
      (d.variant ? ' <span class="pace pace-' + d.variant + '">' + T('badge.' + d.variant) + '</span>' : '') +
      (d.early ? ' <span class="pace pace-early">' + T('early') + '</span>' : '') + '</h4>' +
      '<p>' + esc(d.d) + '</p>' + (d.rain ? '<p class="day-rain"><b>' + T('t.rain') + '</b>' + esc(d.rain) + '</p>' : '') + '</div></li>';
  }
  function tips(c) {
    var t = '';
    if (c.gem) t += '<p class="tip"><b>' + T('t.gem') + '</b>' + esc(c.gem) + '</p>';
    if (c.skip) t += '<p class="tip tip-skip"><b>' + T('t.skip') + '</b>' + esc(c.skip) + ' <span class="instead">' + T('t.instead') + esc(c.instead) + '</span></p>';
    return t ? '<div class="tips">' + t + '</div>' : '';
  }
  // sizes: how wide the photo is drawn, so the browser picks the smallest copy from srcset (the offline file has none)
  function img(id, cls, sizes) {
    var p = PHOTOS[id];
    return '<img class="' + (cls || '') + '" src="' + p.src + '" alt="' + esc(caption(id)) + '" width="' + p.w + '" height="' + p.h +
      '" loading="lazy" decoding="async"' + (p.srcset && sizes ? ' srcset="' + p.srcset + '" sizes="' + sizes + '"' : '') + '>';
  }
  // the photos of a place; keyboard stops: the photo strip (arrow keys), previous, next and full screen
  function gallery(id) {
    var ids = C(id).photos;
    if (!ids.length) return '';
    var slides = ids.map(function (ph, i) {
      return '<figure class="gal-slide"><button type="button" class="gal-open" tabindex="-1" data-i="' + i + '" aria-label="' + esc(T('g.open', { i: i + 1, n: ids.length })) + '">' +
        img(ph, '', '(max-width: 900px) calc(100vw - 64px), 760px') + '</button></figure>';
    }).join('');
    var thumbs = ids.map(function (ph, i) {
      return '<button type="button" class="gal-thumb" tabindex="-1" data-i="' + i + '" aria-label="' + esc(T('g.show', { i: i + 1 })) + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' +
        img(ph, '', '56px') + '</button>';
    }).join('');
    return '<div class="gal" data-photos="' + ids.join(',') + '">' +
      '<div class="gal-view"><div class="gal-track" tabindex="0" aria-label="' + esc(T('g.photos', { x: C(id).name })) + '">' + slides + '</div>' +
      '<button type="button" class="gal-btn gal-prev" aria-label="' + esc(T('g.prev')) + '" disabled>' + ICON.prev + '</button>' +
      '<button type="button" class="gal-btn gal-next" aria-label="' + esc(T('g.next')) + '">' + ICON.next + '</button>' +
      '<span class="gal-count mono" aria-live="polite">1 / ' + ids.length + '</span>' +
      '<button type="button" class="gal-full" data-i="0" aria-label="' + esc(T('g.full')) + '">' + ICON.expand + '</button></div>' +
      '<div class="gal-under"><p class="gal-cap">' + esc(caption(ids[0])) + '</p><div class="gal-thumbs">' + thumbs + '</div></div></div>';
  }

  /* The journey on a given day: L is a stay's leg from planRoute, or the way home (toId null). prev: the stay before. */
  function legCard(L, day, prev, toId) {
    var from = AIRPORTS[L.from] ? T('leg.airport', { x: AIRPORTS[L.from].name }) : C(L.from).short;
    var to = toId ? C(toId).short : T('leg.airport', { x: AIRPORTS[L.to].name });
    var notes = legNotes(L, prev, !!(prev && C(prev.id).days.some(function (d) { return d.solo; })));
    var long = L.total >= LONG_LEG_H, maps = L.flights ? '' : mapsLink(L.from, L.to);
    return '<div class="leg' + (long ? ' leg-long' : '') + '">' +
      '<div class="leg-head"><span class="leg-day mono">' + T('day') + ' ' + day + '</span>' +
      '<span class="leg-route">' + esc(from) + ' → ' + esc(to) + '</span>' +
      '<span class="leg-total mono">' + approx(L.total) + ' ' + T('door') + '</span></div>' +
      '<ul class="leg-segs">' + L.segs.map(function (g) {
        var text = g.mode === 'fly' ? T('fly') + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name : T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS));
        return '<li>' + ICON[g.mode] + '<span>' + esc(text) + '</span><span class="mono">' + fmtH(g.h) + '</span></li>';
      }).join('') + '</ul>' +
      (notes.length || long || maps ? '<p class="leg-foot">' + (long ? '<span class="flag">' + T('longday') + '</span> ' : '') +
        esc(notes.map(function (k) { return T(k); }).join(' ')) +
        (maps ? ' <a href="' + esc(maps) + '" target="_blank" rel="noopener">' + T('maps') + '</a>' : '') + '</p>' : '') +
      '</div>';
  }
  function mapsLink(a, b) {
    function where(n) { return AIRPORTS[n] ? AIRPORTS[n].maps : C(n).maps; }
    return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(where(a)) + '&destination=' + encodeURIComponent(where(b)) + '&travelmode=driving';
  }

  // the last day: the way to the departure airport and the flight home, without a time
  function homeCard() {
    var r = state.route, d = T('home.d') + (r.home.total >= 2 ? ' ' + T('home.far', { time: approx(r.home.total) }) : '');
    return '<section class="stop stop-compact stop-home" id="stop-home"><header class="stop-head"><span class="stop-num home-num">' + ICON.fly + '</span>' +
      '<div class="stop-title"><p class="eyebrow">' + T('day') + ' ' + r.days + '</p><h3>' + esc(T('home.h3', { airport: AIRPORTS[state.st.to].name })) + '</h3></div></header>' +
      '<ol class="days"><li class="day" id="day-' + r.days + '"><div class="day-n mono">' + T('day') + ' <b>' + r.days + '</b>' +
      (dateLabel(r.days) ? '<span class="day-date">' + esc(dateLabel(r.days)) + '</span>' : '') + '</div><div class="day-body">' +
      '<h4>' + T('home.t') + ' <span class="pace pace-travel">' + T('pace.travel') + '</span></h4><p>' + esc(d) + '</p></div></li></ol></section>';
  }

  /* The stays in order, each after the journey that leads to it; a second stay in the same city (a round trip) without
     its photos and tips, which the first one showed. */
  function renderStops() {
    var r = state.route, html = '';
    r.stops.forEach(function (s, i) {
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; });
      html += legCard(s.leg, s.start, i ? r.stops[i - 1] : null, s.id) +
        '<section class="stop' + (c.photos.length && !again ? '' : ' stop-compact') + '" id="stop-' + (i + 1) + '" data-pin="' + nodeOf(s.id) + '" style="--c:' + stopColor(s.id) + '">' +
        '<header class="stop-head"><span class="stop-num">' + (i + 1) + '</span><div class="stop-title">' +
        '<p class="eyebrow">' + dayRange(s.start, s.end) + ' · ' + s.n + ' ' + countWord('nights', s.n) + ' · ' + T('reg.' + c.region) + '</p>' +
        '<h3>' + esc(c.name) + '</h3><p class="stop-sub">' + esc(c.sub) + '</p></div>' + stopTools(s) + '</header>' +
        (again ? '' : gallery(s.id)) + '<ol class="days">' + state.plans[i].map(dayItem).join('') + '</ol>' + (again ? '' : tips(c)) + '</section>';
    });
    html += legCard(r.home, r.days, r.stops[r.stops.length - 1], null) + homeCard();
    $('#stops').innerHTML = html;
    initGalleries();
    observeStops();
  }

  /* ---------- the map: the North panel above the whole country, as in the December planner (stage 2 draws new panels) ---------- */
  var NF = { lon0: 104.85, lat0: 23.05, s: 104, x: 0, y: 0, w: 270, h: 322 };
  var CF = { lon0: 103.6, lat0: 23.4, s: 22, x: 0, y: 352, w: 270, h: 322 };
  // label offsets [dx, dy, anchor]: the places of the North panel, then the places labelled on the whole-country panel
  var NLAB = { hanoi: [-14, 4, 'end'], ninhbinh: [14, 4, 'start'], puluong: [0, 26, 'middle'], catba: [0, 26, 'middle'], caobang: [14, 4, 'start'], babe: [-14, 4, 'end'] };
  var CLAB = { saigon: [10, 18, 'start'], dalat: [10, 4, 'start'], cattien: [10, 15, 'start'], mekong: [8, 17, 'start'], phuquoc: [-4, 19, 'start'],
    hoian: [10, 10, 'start'], hue: [-10, -6, 'end'] };
  var BANGIOC = [22.85, 106.72];
  /* place names on the basemap: [UI key, lat, lon, class, anchor] */
  var GEO = {
    north: [['m.china', 22.25, 107.25, 'm-country', 'middle'], ['m.tonkin', 20.12, 107.0, 'm-water', 'middle']],
    whole: [['m.china', 21.9, 111.6, 'm-country', 'middle'], ['m.laos', 17.6, 103.9, 'm-country', 'start'],
      ['m.cambodia', 12.9, 103.9, 'm-country', 'start'], ['m.sea', 14.6, 112.4, 'm-water', 'middle']]
  };
  function basemap(key) {
    var b = BASEMAP[key];
    return '<path class="m-land-o" d="' + b.other + '"/><path class="m-land" d="' + b.vn + '"/><path class="m-river" d="' + b.rivers + '"/>';
  }
  function geoLabels(key, f) {
    return GEO[key].map(function (g) {
      var p = proj(f, [g[1], g[2]]);
      return '<text class="' + g[3] + '" x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" text-anchor="' + g[4] + '">' + T(g[0]) + '</text>';
    }).join('');
  }
  function proj(f, p) { return [f.x + (p[1] - f.lon0) * f.s, f.y + (f.lat0 - p[0]) * f.s]; }
  function curve(a, b) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1, k = 0.16 * len;
    var cx = mx - dy / len * k, cy = my + dx / len * k;
    return 'M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
  }
  // a point of the travel data on the map: an airport or a place
  function where(n) { return AIRPORTS[n] ? AIRPORTS[n].pt : C(n).pt; }

  function renderMap() {
    var route = state.route, st = state.st, n = [], c = [], groups = {};
    var r = function (v) { return v.toFixed(1); };
    route.stops.forEach(function (s, i) {
      var key = nodeOf(s.id);
      (groups[key] = groups[key] || []).push({ num: i + 1, start: s.start, end: s.end });
    });
    var legs = route.stops.map(function (s) { return s.leg; }).concat([route.home]);
    var ends = st.from === st.to ? [st.from] : [st.from, st.to];
    function seg(f, g, cls) {
      var a = proj(f, where(g.from)), b = proj(f, where(g.to));
      if (g.mode === 'fly') return '<path class="m-fly ' + cls + '" d="' + curve(a, b) + '"/>';
      return '<line class="m-road ' + cls + '" x1="' + r(a[0]) + '" y1="' + r(a[1]) + '" x2="' + r(b[0]) + '" y2="' + r(b[1]) + '"/>';
    }
    function subsFor(key) {
      var parts = groups[key].map(function (v) { return v.start === v.end ? '' + v.start : v.start + '–' + v.end; });
      return (parts.length > 1 || parts[0].indexOf('–') > -1 ? T('days') : T('day')) + ' ' + parts.join(', ');
    }
    function pill(p, key, big) {
      var nums = groups[key].map(function (v) { return v.num; }).join('·');
      var h = big ? 20 : 15, w = Math.max(h, (big ? 10 : 8) + nums.length * (big ? 6.5 : 5));
      return '<rect x="' + r(p[0] - w / 2) + '" y="' + r(p[1] - h / 2) + '" width="' + r(w) + '" height="' + h + '" rx="' + h / 2 + '"/>' +
        '<text class="pin-num' + (big ? '' : ' pin-num-s') + '" x="' + r(p[0]) + '" y="' + r(p[1] + (big ? 4 : 3.2)) + '" text-anchor="middle">' + nums + '</text>';
    }
    // an outline square around the airport point, drawn before the pins: the pin of the airport's city sits a few pixels
    // away and would cover a solid square, so the outline frames it instead
    function airportBox(f, code) {
      var p = proj(f, AIRPORTS[code].pt);
      return '<rect class="m-airport" x="' + r(p[0] - 9.5) + '" y="' + r(p[1] - 9.5) + '" width="19" height="19" rx="2"/>';
    }
    function inside(f, code) {
      var p = proj(f, AIRPORTS[code].pt);
      return p[0] >= f.x && p[0] <= f.x + f.w && p[1] >= f.y && p[1] <= f.y + f.h;
    }

    /* the North panel */
    n.push('<rect class="m-frame" x="0" y="0" width="' + NF.w + '" height="' + NF.h + '" rx="8"/>' + basemap('north') + geoLabels('north', NF));
    [21, 22].forEach(function (lat) {
      var y = r((NF.lat0 - lat) * NF.s);
      n.push('<line class="m-grid" x1="0" x2="' + NF.w + '" y1="' + y + '" y2="' + y + '"/><text class="m-gridlabel" x="' + (NF.w - 6) + '" y="' + (y - 4) + '" text-anchor="end">' + lat + '°N</text>');
    });
    [105, 106, 107].forEach(function (lon) {
      var x = r((lon - NF.lon0) * NF.s);
      n.push('<line class="m-grid m-grid-v" x1="' + x + '" x2="' + x + '" y1="0" y2="' + NF.h + '"/>');
    });
    Object.keys(NLAB).forEach(function (id) {
      if (groups[id]) return;
      var p = proj(NF, C(id).pt);
      n.push('<circle class="m-faint" cx="' + r(p[0]) + '" cy="' + r(p[1]) + '" r="4"/>');
    });
    legs.forEach(function (L) { L.segs.forEach(function (g) { n.push(seg(NF, g, '')); }); });
    ends.forEach(function (code) { if (inside(NF, code)) n.push(airportBox(NF, code)); });
    if (groups.caobang) {
      var cb = proj(NF, C('caobang').pt), bg = proj(NF, BANGIOC);
      n.push('<line class="m-road m-local" x1="' + r(cb[0]) + '" y1="' + r(cb[1]) + '" x2="' + r(bg[0]) + '" y2="' + r(bg[1]) + '"/>' +
        '<circle class="m-poi" cx="' + r(bg[0]) + '" cy="' + r(bg[1]) + '" r="4"/>' +
        '<text class="m-sub" x="' + r(bg[0] + 8) + '" y="' + r(bg[1] - 6) + '">Bản Giốc</text>');
    }
    Object.keys(groups).forEach(function (key) {
      if (!NLAB[key]) return;
      var p = proj(NF, C(key).pt), L = NLAB[key];
      n.push('<g class="pin" data-pin="' + key + '" style="--c:' + stopColor(key) + '">' + pill(p, key, true) +
        '<text class="m-label" x="' + r(p[0] + L[0]) + '" y="' + r(p[1] + L[1]) + '" text-anchor="' + L[2] + '">' + esc(C(key).short) + '</text>' +
        '<text class="m-sub" x="' + r(p[0] + L[0]) + '" y="' + r(p[1] + L[1] + 12) + '" text-anchor="' + L[2] + '">' + subsFor(key) + '</text></g>');
    });
    n.push('<text class="m-title" x="10" y="18">' + T('m.north') + '</text>');

    /* the whole-country panel */
    c.push('<rect class="m-frame" x="0" y="' + CF.y + '" width="' + CF.w + '" height="' + CF.h + '" rx="8"/>' +
      '<g clip-path="url(#clip-whole)">' + basemap('whole') + '</g>' + geoLabels('whole', CF));
    [10, 15, 20].forEach(function (lat) {
      var y = r(CF.y + (CF.lat0 - lat) * CF.s);
      c.push('<line class="m-grid" x1="0" x2="' + CF.w + '" y1="' + y + '" y2="' + y + '"/><text class="m-gridlabel" x="' + (CF.w - 6) + '" y="' + (y - 4) + '" text-anchor="end">' + lat + '°N</text>');
    });
    var i0 = proj(CF, [NF.lat0, NF.lon0]), i1 = proj(CF, [NF.lat0 - NF.h / NF.s, NF.lon0 + NF.w / NF.s]);
    c.push('<rect class="m-inset" x="' + r(i0[0]) + '" y="' + r(i0[1]) + '" width="' + r(i1[0] - i0[0]) + '" height="' + r(i1[1] - i0[1]) + '"/>' +
      '<text class="m-sub" x="' + r(i1[0] + 6) + '" y="' + r(i0[1] + 12) + '">' + T('m.panel') + '</text>');
    Object.keys(CLAB).forEach(function (id) {
      if (groups[id]) return;
      var p = proj(CF, C(id).pt);
      c.push('<circle class="m-faint" cx="' + r(p[0]) + '" cy="' + r(p[1]) + '" r="3"/>');
    });
    legs.forEach(function (L) { L.segs.forEach(function (g) { c.push(seg(CF, g, 'm-thin')); }); });
    ends.forEach(function (code) { c.push(airportBox(CF, code)); });
    var lab = Object.assign({}, CLAB);
    if (groups.phuquoc) lab.saigon = [10, -9, 'start'];   // with Phú Quốc on the trip, Hồ Chí Minh City's label goes above it
    Object.keys(groups).forEach(function (key) {
      var p = proj(CF, C(key).pt), L = lab[key];
      if (NLAB[key]) { c.push('<circle class="m-dot" cx="' + r(p[0]) + '" cy="' + r(p[1]) + '" r="2.6" style="--c:' + stopColor(key) + '"/>'); return; }
      c.push('<g class="pin" data-pin="' + key + '" style="--c:' + stopColor(key) + '">' + pill(p, key, false) +
        '<text class="m-label m-label-s" x="' + r(p[0] + L[0]) + '" y="' + r(p[1] + L[1]) + '" text-anchor="' + L[2] + '">' + esc(C(key).short) +
        ' <tspan class="m-sub">' + subsFor(key) + '</tspan></text></g>');
    });
    c.push('<text class="m-title" x="' + (CF.w - 10) + '" y="' + (CF.y + 18) + '" text-anchor="end">' + T('m.whole') + '</text>');

    $('#map').innerHTML = '<svg viewBox="-6 -6 282 686" role="img" aria-labelledby="map-title"><title id="map-title">' + T('m.title') +
      esc(route.stops.map(function (s) { return C(s.id).short; }).join(', ')) + '</title>' +
      '<defs><clipPath id="clip-north"><rect x="0" y="0" width="' + NF.w + '" height="' + NF.h + '" rx="8"/></clipPath>' +
      '<clipPath id="clip-whole"><rect x="0" y="' + CF.y + '" width="' + CF.w + '" height="' + CF.h + '" rx="8"/></clipPath></defs>' +
      '<g clip-path="url(#clip-north)">' + n.join('') + '</g>' + c.join('') +
      '<rect class="m-edge" x="0" y="0" width="' + NF.w + '" height="' + NF.h + '" rx="8"/>' +
      '<rect class="m-edge" x="0" y="' + CF.y + '" width="' + CF.w + '" height="' + CF.h + '" rx="8"/></svg>' +
      '<p class="map-legend"><span><svg width="24" height="6" aria-hidden="true"><line class="m-road" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.road') + '</span>' +
      '<span><svg width="24" height="6" aria-hidden="true"><line class="m-fly" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.flight') + '</span>' +
      '<span><svg width="12" height="12" aria-hidden="true"><rect class="m-airport" x="0.8" y="0.8" width="10.4" height="10.4" rx="2"/></svg>' + T('m.airports') + '</span>' +
      '<span class="map-note">' + T('m.scale') + '</span><button type="button" class="map-hint">' + T('m.zoom') + '</button></p>';
  }

  /* ---------- map zoom (desktop): the two panels grow out of the sidebar into a side-by-side view ---------- */
  var MZ_MS = 480;
  var mz = { open: false, busy: false, opener: null, kb: false };
  function mzWide() { return window.matchMedia('(min-width: 901px)').matches; }
  function mzSource() {
    // on-screen boxes of the two panels inside the sidebar map (viewBox is -6 -6 282 686)
    var r = $('#map svg').getBoundingClientRect(), k = r.width / 282;
    return [
      { x: r.left, y: r.top, w: r.width, h: 334 * k },
      { x: r.left, y: r.top + 352 * k, w: r.width, h: 334 * k }
    ];
  }
  function mzTarget() {
    var pad = 28, gap = 24, top = 64;
    var h = Math.min(window.innerHeight - top - pad, ((window.innerWidth - 2 * pad - gap) / 2) * 334 / 282);
    var w = h * 282 / 334, x0 = (window.innerWidth - (2 * w + gap)) / 2, y0 = top + (window.innerHeight - top - pad - h) / 2;
    return [{ x: x0, y: y0, w: w, h: h }, { x: x0 + w + gap, y: y0, w: w, h: h }];
  }
  function mzPlace(el, t, from) {
    el.style.left = t.x + 'px'; el.style.top = t.y + 'px'; el.style.width = t.w + 'px'; el.style.height = t.h + 'px';
    el.style.transform = from ? 'translate(' + (from.x - t.x) + 'px,' + (from.y - t.y) + 'px) scale(' + (from.w / t.w) + ')' : 'none';
  }
  function openMapZoom(kb) {
    if (mz.open || mz.busy || !mzWide()) return;
    var src = mzSource(), dst = mzTarget(), box = $('#mapzoom'), svg = $('#map svg').outerHTML;
    var panels = ['-6 -6 282 334', '-6 346 282 334'].map(function (vb, i) {
      var d = document.createElement('div');
      d.className = 'mz-panel';
      // own ids so the copies never borrow the sidebar map's clip paths
      d.innerHTML = svg.replace(/(clip-(?:north|whole)|map-title)/g, '$1-z' + i).replace(/viewBox="[^"]*"/, 'viewBox="' + vb + '"');
      return d;
    });
    box.querySelectorAll('.mz-panel').forEach(function (n) { n.remove(); });
    panels.forEach(function (d, i) { box.appendChild(d); mzPlace(d, dst[i], src[i]); });
    mz.open = mz.busy = true;
    mz.opener = document.activeElement;
    mz.kb = !!kb;
    box.hidden = false;
    document.body.classList.add('mz-open');
    $('#map').classList.add('mz-hide');
    void box.offsetWidth;
    box.classList.add('on');
    panels.forEach(function (d, i) { mzPlace(d, dst[i]); });
    $('#mz-close').focus({ preventScroll: true });
    setTimeout(function () { mz.busy = false; }, MZ_MS);
  }
  function closeMapZoom() {
    if (!mz.open || mz.busy) return;
    var box = $('#mapzoom'), src = mzSource(), dst = mzTarget();
    mz.busy = true;
    box.classList.remove('on');
    box.querySelectorAll('.mz-panel').forEach(function (d, i) { mzPlace(d, dst[i], src[i]); });
    setTimeout(function () {
      box.hidden = true;
      box.querySelectorAll('.mz-panel').forEach(function (n) { n.remove(); });
      $('#map').classList.remove('mz-hide');
      document.body.classList.remove('mz-open');
      mz.open = mz.busy = false;
      // keyboard users get their focus back; mouse users get no leftover focus ring
      if (mz.kb && mz.opener && mz.opener.focus) mz.opener.focus({ preventScroll: true });
      else if (document.activeElement) document.activeElement.blur();
    }, MZ_MS);
  }
  function bindMapZoom() {
    var m = $('#map');
    // the whole map opens on a mouse click; the hint is the real button (Enter/Space give a click with detail 0)
    m.addEventListener('click', function (e) {
      var hint = e.target.closest('.map-hint');
      if (hint) openMapZoom(e.detail === 0);
      else if (!e.target.closest('.map-legend')) openMapZoom(false);
    });
    $('#mapzoom').addEventListener('click', closeMapZoom);
    document.addEventListener('keydown', function (e) {
      if (!mz.open) return;
      if (e.key === 'Escape') closeMapZoom();
      if (e.key === 'Tab') { e.preventDefault(); $('#mz-close').focus(); }
    });
    window.addEventListener('resize', function () {
      if (!mz.open || mz.busy) return;
      if (!mzWide()) { closeMapZoom(); return; }
      var dst = mzTarget();
      $('#mapzoom').querySelectorAll('.mz-panel').forEach(function (d, i) { mzPlace(d, dst[i]); });
    });
  }

  /* ---------- Dodaj and Usuń ---------- */
  // Usuń only where the trip can go on without that place (the airport's city of a round trip often cannot)
  function canRemove(id) {
    var st = normSettings(withRemoved(state.settings, id), PLACES, HUBS);
    return st.ok && planRoute(st, DATA).ok;
  }
  // "Dodane" when Dodaj put the stay there and the Usuń button where the stay can go; a night on the way has neither
  function stopTools(s) {
    if (PLACES[s.id].node) return '';
    return (state.st.add.indexOf(s.id) > -1 ? '<span class="tag-added">' + T('tag.added') + '</span>' : '') +
      (canRemove(s.id) ? '<button type="button" class="stop-remove" data-remove="' + s.id + '" aria-label="' + esc(T('stop.remove.aria', { x: C(s.id).short })) + '">' + T('stop.remove') + '</button>' : '');
  }
  // the places off the trip, each with Dodaj, unless Dodaj already asked for it and it did not fit
  function renderOffRoute() {
    var s = state.settings;
    $('#offroute-list').innerHTML = offRoute(state.route, state.st, PLACES).map(function (x) {
      var c = C(x.id);
      return '<li><span class="dot" style="--c:' + stopColor(x.id) + '"></span><span>' + esc(c.short) + '</span>' +
        (x.removed ? '<span class="off-tag">' + T('off.removed') + '</span>' : '') +
        (x.added ? '<span class="off-tag">' + T('off.missing') + '</span>'
          : '<button type="button" class="btn-small" data-add="' + x.id + '" aria-label="' + esc(T('off.add.aria', { x: c.short })) + '">' + T('off.add') + '</button>') + '</li>';
    }).join('');
    $('#reset-changes').hidden = !(s.add.length || s.remove.length);
  }
  /* After Dodaj: which places left the trip to make room for the added one. Its own status line, so "Nie zmieściło się" stays;
     the next change of the trip clears it (apply). Nothing is said when no place left. */
  function reportDropped(added, before) {
    var ids = droppedPlaces(before, state.route.stops, PLACES);
    if (!ids.length) return;
    $('#dropped').textContent = tied(T('off.dropped', { x: C(added).short, list: ids.map(function (id) { return C(id).short; }).join(', ') }));
  }
  function bindChanges() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-add], [data-remove], #reset-changes') : null;
      if (!b) return;
      var added = b.hasAttribute('data-add') ? b.getAttribute('data-add') : null, before = state.route.stops;
      var s = b.id === 'reset-changes' ? withoutChanges(state.settings)
        : added ? withAdded(state.settings, added)
        : withRemoved(state.settings, b.getAttribute('data-remove'));
      if (apply(s)) {
        syncForm();
        if (added) reportDropped(added, before);
        $('#shape-h2').focus({ preventScroll: true });   // the button is gone with the old trip; the trip's heading takes the focus
      } else {
        $('#missing').textContent = $('#settings-msg').textContent;   // the message also next to the buttons that caused it
      }
    });
  }

  /* ---------- the plan as text, for WhatsApp ---------- */
  function planText() {
    var r = state.route, st = state.st, lines = [], flights = [];
    lines.push(T('pt.title', { days: r.days, term: termText(st) }));
    lines.push(T('pt.route', { from: AIRPORTS[st.from].name, to: AIRPORTS[st.to].name }));
    lines.push(T('pt.profile', { x: st.interests.length ? st.interests.map(function (k) { return T('int.' + k); }).join(', ') : T('pt.any'), lvl: T('lvl.' + st.level) }));
    lines.push(T('pt.arrive', { airport: AIRPORTS[st.from].name }));
    r.stops.forEach(function (s) { lines.push(dayRange(s.start, s.end) + ': ' + C(s.id).name); });
    lines.push(T('pt.home', { days: r.days, airport: AIRPORTS[st.to].name }));
    r.stops.forEach(function (s) {
      s.leg.segs.forEach(function (g) { if (g.mode === 'fly') flights.push(T('day') + ' ' + s.start + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name); });
    });
    if (flights.length) lines.push(T('pt.flights') + flights.join('; '));
    lines.push(T('pt.link') + SITE_URL + linkHash(state.settings));
    return lines.join('\n');
  }
  function bindCopy() {
    var btn = $('#copy-plan'), status = $('#copy-status'), box = $('#copy-fallback');
    btn.addEventListener('click', function () {
      var text = planText();
      box.hidden = true;
      var done = function () { status.textContent = T('copy.ok'); };
      var fail = function () {
        box.hidden = false; box.value = text; box.focus(); box.select();
        status.textContent = T('copy.fail');
      };
      try {
        navigator.clipboard.writeText(text).then(done, fail);
      } catch (e) { fail(); }
    });
  }

  /* ---------- galleries & lightbox ---------- */
  function initGalleries() {
    document.querySelectorAll('.gal').forEach(function (gal) {
      var track = $('.gal-track', gal), count = $('.gal-count', gal), cap = $('.gal-cap', gal);
      var prev = $('.gal-prev', gal), next = $('.gal-next', gal), full = $('.gal-full', gal);
      var ids = gal.getAttribute('data-photos').split(','), idx = 0;
      var thumbs = gal.querySelectorAll('.gal-thumb');
      function update(i) {
        idx = i;
        count.textContent = (i + 1) + ' / ' + ids.length;
        cap.textContent = caption(ids[i]);
        prev.disabled = i === 0; next.disabled = i === ids.length - 1;
        full.setAttribute('data-i', i);
        thumbs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      }
      var target = null, release = null;
      function go(i) {
        i = Math.max(0, Math.min(ids.length - 1, i));
        target = i;
        clearTimeout(release);
        release = setTimeout(function () { target = null; }, 700);
        track.scrollTo({ left: i * track.clientWidth, behavior: 'auto' });
        update(i);
      }
      var tick = null;
      track.addEventListener('scroll', function () {
        if (tick) return;
        tick = requestAnimationFrame(function () {
          tick = null;
          var w = Math.max(1, track.clientWidth);
          if (target !== null) {
            if (Math.abs(track.scrollLeft - target * w) < 2) target = null;
            return;
          }
          var i = Math.round(track.scrollLeft / w);
          if (i !== idx) update(i);
        });
      });
      prev.addEventListener('click', function () { go(idx - 1); });
      next.addEventListener('click', function () { go(idx + 1); });
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
      });
      thumbs.forEach(function (t) { t.addEventListener('click', function () { go(+t.getAttribute('data-i')); }); });
      gal.querySelectorAll('.gal-open, .gal-full').forEach(function (b) {
        b.addEventListener('click', function () { openLightbox(ids, +b.getAttribute('data-i'), b); });
      });
    });
  }

  var lb = { ids: [], i: 0, opener: null };
  function lbShow() {
    var p = PHOTOS[lb.ids[lb.i]];
    var im = $('#lb-img');
    im.src = p.src; im.alt = caption(lb.ids[lb.i]); im.width = p.w; im.height = p.h;
    $('#lb-cap').textContent = caption(lb.ids[lb.i]);
    $('#lb-credit').textContent = T('lb.photo') + PHOTO_META[lb.ids[lb.i]].artist + ' · ' + PHOTO_META[lb.ids[lb.i]].license;
    $('#lb-count').textContent = (lb.i + 1) + ' / ' + lb.ids.length;
    $('#lb-prev').disabled = lb.i === 0;
    $('#lb-next').disabled = lb.i === lb.ids.length - 1;
  }
  function openLightbox(ids, i, opener) {
    lb.ids = ids; lb.i = i; lb.opener = opener;
    $('#lightbox').hidden = false;
    document.body.classList.add('lb-open');
    lbShow();
    $('#lb-close').focus();
  }
  function closeLightbox() {
    $('#lightbox').hidden = true;
    document.body.classList.remove('lb-open');
    if (lb.opener) lb.opener.focus();
  }
  function bindLightbox() {
    $('#lb-close').addEventListener('click', closeLightbox);
    $('#lb-prev').addEventListener('click', function () { if (lb.i > 0) { lb.i--; lbShow(); } });
    $('#lb-next').addEventListener('click', function () { if (lb.i < lb.ids.length - 1) { lb.i++; lbShow(); } });
    $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox' || e.target.classList.contains('lb-stage')) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if ($('#lightbox').hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && lb.i < lb.ids.length - 1) { lb.i++; lbShow(); }
      if (e.key === 'ArrowLeft' && lb.i > 0) { lb.i--; lbShow(); }
      if (e.key === 'Tab') {
        var f = Array.prototype.slice.call($('#lightbox').querySelectorAll('button:not([disabled])'));
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var x0 = null;
    $('#lightbox').addEventListener('touchstart', function (e) { if (e.touches.length === 1) x0 = e.touches[0].clientX; }, { passive: true });
    $('#lightbox').addEventListener('touchend', function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) < 50) return;
      if (dx < 0 && lb.i < lb.ids.length - 1) { lb.i++; lbShow(); }
      if (dx > 0 && lb.i > 0) { lb.i--; lbShow(); }
    });
  }

  /* ---------- scroll-linked map highlight ---------- */
  var io = null;
  function observeStops() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = e.target.getAttribute('data-pin');
        document.querySelectorAll('#map .pin').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pin') === key); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('#stops .stop').forEach(function (s) { io.observe(s); });
  }

  // the multi-word names a line may not break inside: the short names of the places and the names of the airports
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }))
    .filter(function (n, i, all) { return n.indexOf(' ') > -1 && all.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  // a text with the no-break spaces of Polish typography (tieShort) and of the names (tieNames), both in page.js
  function tied(text) { return lang === 'pl' ? tieNames(tieShort(text), TIED_NAMES) : text; }
  // every text in root, tied as above
  function tieShortWords(root) {
    if (lang !== 'pl') return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), node;
    while ((node = walker.nextNode())) {
      if (/^(SCRIPT|STYLE|TEXTAREA)$/i.test(node.parentNode.nodeName)) continue;
      var t = tied(node.nodeValue);
      if (t !== node.nodeValue) node.nodeValue = t;
    }
  }

  /* ---------- the footer and the texts in the template ---------- */
  function renderCredits() {
    var used = {};
    used[HERO_PHOTO] = true;
    Object.keys(CONTENT).forEach(function (id) { CONTENT[id].photos.forEach(function (ph) { used[ph] = true; }); });
    $('#credits').innerHTML = Object.keys(used).map(function (ph) {
      var m = PHOTO_META[ph];
      return '<li>' + esc(m.cap) + ': ' + esc(m.artist) + ', <a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.license) + '</a></li>';
    }).join('');
  }
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = T('doc.title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = T(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.alt = T(el.getAttribute('data-i18n-alt')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
  }

  /* ---------- wiring ---------- */
  applyStatic();
  buildForm();
  renderCredits();
  bindLightbox();
  bindCopy();
  bindAnchors();
  bindMapZoom();
  bindChanges();
  fromLink();
  /* back-to-top button: shown once the photo opener has scrolled away */
  var totop = $('#totop'), hero = $('.hero');
  if (totop && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { totop.hidden = es[0].isIntersecting; }).observe(hero);
  }
  /* for the probes in tests/probes/ */
  window.__trip = { state: state, apply: apply, today: TODAY };
})();
