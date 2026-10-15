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
  function licName(l) { return l === 'Public domain' ? T('ft.pd') : l; }   // a licence as the page names it
  function nodeOf(id) { return PLACES[id].node || id; }
  function stopColor(id) { return 'var(--pal-' + C(nodeOf(id)).color + ')'; }

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
  // "w marcu", "we wrześniu" (we before w and a consonant)
  function inMonth(m) { var noun = T('monl.' + m); return (/^w[^aeiouyąęó]/i.test(noun) ? 'we ' : 'w ') + noun; }
  // the short names of places, for a sentence
  function names(ids) { return ids.map(function (id) { return C(id).short; }).join(', '); }
  function capFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  // an amount in euros, [from, to], in złoty: rounded to 100 zł (or step), thousands apart: "2 600–5 900 zł", or "30 zł" when
  // both ends round alike; nothing is "0 zł"
  function zl(eur, step) {
    if (eur[1] <= 0) return '0\u00a0zł';
    var r = zlRange(eur, EUR_PLN, step || 100);
    return r[0] === r[1] ? T('zl.one', { a: money(r[0]) }) : T('zl', { a: money(r[0]), b: money(r[1]) });
  }
  // names for a sentence: "A", "A i B", "A, B i C"
  function andList(list) { return list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' i ' + list[list.length - 1]; }
  function termText(st) {
    return st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('term.month', { month: T('mon.' + st.month), year: st.year });
  }

  /* ---------- state ---------- */
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var BUDGET_DATA = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
  var BOOK_DATA = { costs: COSTS, book: BOOK, swaps: SWAPS, places: PLACES, airports: AIRPORTS, airKeys: AIR_KEYS, homestays: HOMESTAYS, shortFlightH: SHORT_FLIGHT_H };
  var PACK_DATA = { climate: CLIMATE, seasons: SEASONS, content: CONTENT, places: PLACES, swaps: SWAPS };
  var TODAY = clampToday(new Date().toISOString().slice(0, 10), HOLIDAYS_FROM, PLAN_LAST_YEAR);   // the device clock, held inside the days the page plans for
  var DEFAULTS = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay;
  // budget: tripBudget of the trip; linkWarn: the link that opened the page was partly wrong (said in the warnings until the next change)
  var state = { settings: null, st: null, route: null, plans: null, budget: null, linkWarn: false };

  function msg(text) { $('#settings-msg').textContent = tied(text); }

  /* New settings: plan the trip; when there is one, show it and write the settings into the address. Otherwise keep the
     last trip and say why under the settings. linkWarn: the settings come from a link that was partly wrong. The settings
     are copied with their lists (copySettings), so a caller may leave out add, remove and moto.
     Returns whether the trip changed. */
  function apply(s, linkWarn) {
    s = copySettings(s);
    var st = normSettings(s, PLACES, HUBS), r = st.ok ? planRoute(st, DATA) : null;
    if (!st.ok || !r.ok) {
      msg(T('set.err.' + (st.ok ? r.error : st.error), { min: MIN_DAYS, max: MAX_DAYS }) + (state.route ? T('set.err.keep') : ''));
      return false;
    }
    var done = {};
    state.settings = s; state.st = st; state.route = r; state.linkWarn = !!linkWarn;
    var self = selfSwaps(s.moto, SWAPS);
    state.plans = r.stops.map(function (x, i) {
      var days = stopDays(C(x.id), x, done[x.id] || 0, st.level, st.months, legAfter(r, i, FERRY), !!self.places[x.id]);
      done[x.id] = (done[x.id] || 0) + x.n;
      return days;
    });
    state.budget = tripBudget(r, state.plans, s.moto, BUDGET_DATA);
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
     without them. A link that was partly wrong says so as the first of the warnings above the figures of the trip. */
  function fromLink() {
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), DEFAULTS, PLACES, HUBS, bad, SWAPS);
    if (!apply(got.settings, got.dropped.length > 0)) apply(withoutChanges(got.settings), true);
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
      return '<label><input type="radio" name="level" value="' + n + '"><span>' + T('lvl.' + n) + '</span></label>';
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
  /* What follows the form as it stands, also after a change that gave no trip: once two interests are chosen, the other
     three are greyed out; under the levels, the words of the chosen one. */
  function syncLocks() {
    var two = F.querySelectorAll('input[name=interest]:checked').length >= 2;
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) { b.disabled = two && !b.checked; });
    $('#level-note').textContent = tied(T('lvlp.' + F.level.value));
  }
  /* The form shows state.settings. */
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
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) { b.checked = s.interests.indexOf(b.value) > -1; });
    syncLocks();
  }
  function readForm() {
    var s = { from: F.from.value, to: F.to.value, interests: [], level: +F.level.value,
      add: state.settings.add.slice(), remove: state.settings.remove.slice(), moto: state.settings.moto.slice() };
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
    else syncLocks();
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

  /* The settings in short, for the bar at the top: "mar 2027 · 15 dni · Aktywnie", or with dates "28.01–14.02.2027 · …". */
  function summaryText(st) {
    var term = st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('mon3.' + st.month) + ' ' + st.year;
    return T('sum', { term: term, days: st.days, level: T('lvl.' + st.level) });
  }

  function render() {
    $('#sum-text').textContent = summaryText(state.st);
    renderFacts();
    renderShape();
    renderOffRoute();
    renderMap();
    renderStops();
    renderBefore();
    $('#copy-status').textContent = '';
    $('#copy-fallback').hidden = true;
    // the printout names this route's address on the public page (as the copied plan does)
    var url = SITE_URL + linkHash(state.settings);
    $('#print-link').innerHTML = esc(T('pt.link')) + '<a href="' + esc(url) + '">' + esc(url) + '</a>';
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
      // the longest day: its number large and its unit small, so the widest (8½ godz.) fits its tile (tests/probes/before.js)
      '<li><b>' + approx(k.longest).replace('≈ ', '').replace(' ' + T('h'), '') + '<small>\u00a0' + T('h') + '</small></b><span>' + T('f.longest') + '</span></li>' +
      '<li class="f-budget"><a href="#before" aria-label="' + esc(T('f.budget.aria', { x: zl(state.budget.two) })) + '"><b>' + zl(state.budget.two) + '</b><span>' + T('f.budget') + '</span></a></li>';
    // first a link that was partly wrong, then a term that has passed (an old link keeps its trip, and says so), then the
    // holidays; the missing holiday dates only for a term still ahead
    var a = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS), passed = termPassed(st, TODAY), lines = [];
    if (state.linkWarn) lines.push(T('set.dropped'));
    if (passed) lines.push(T('alert.past'));
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: h.name, span: fmtSpan(h.from, h.to) })); });
    // a chosen interest whose places on the trip are all in a poor season, or that no place on the trip serves
    interestAlerts(r, st, PLACES, CLIMATE).forEach(function (x) {
      var what = T('int.' + x.interest);
      lines.push(x.none ? T('alert.int_none', { x: what }) : T(x.ids.length > 1 ? 'alert.int_bad_many' : 'alert.int_bad',
        { x: what, when: x.months.map(inMonth).join(' i '), places: x.ids.map(function (id) { return C(id).short; }).join(' i '),
          why: x.why.map(function (w) { return T('wx.' + w); }).join(', ') }));
    });
    if (a.unknown && !passed) lines.push(T('alert.nodata'));
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

  /* Why stay i is on the trip ("Wybrane, bo…"), and, on a full card, its weather in the month or months of its days and the
     events of the place that it meets. */
  function seasonPhrase(months) {
    if (months.every(function (m) { return m.season === months[0].season; })) {
      return inMonth(months[0].month) + months.slice(1).map(function (m) { return ' i ' + T('monl.' + m.month); }).join('') + ' ' + T('season.' + months[0].season);
    }
    return months.map(function (m) { return inMonth(m.month) + ' ' + T('season.' + m.season); }).join(', ');
  }
  // the weather of a stay, month by month; a number of days of rain keeps its words on its line ("12 dni z deszczem")
  function weatherLine(list) {
    return T('wx.first', { when: inMonth(list[0].month), x: list.map(function (w, k) {
      return (k ? inMonth(w.month) + ': ' : '') + T('wx.month', { t: w.t[0] + '–' + w.t[1], mm: w.mm, days: w.days + '\u00a0' + countWord('wx.days', w.days) }) +
        (w.why.length ? ' (' + w.why.map(function (c) { return T('wx.' + c); }).join(', ') + ')' : '');
    }).join('; ') });
  }
  function stayFacts(i, compact) {
    var s = state.route.stops[i], w = whyOn(state.route, i, state.st, PLACES, HUBS), parts = [], html;
    if (w.night) return '<p class="why-on">' + esc(T('why.night', { a: C(w.night[0]).short, b: C(w.night[1]).short })) + '</p>';
    if (w.added) parts.push(T('why.added'));
    if (w.airport) parts.push(T('why.' + w.airport));
    w.interests.forEach(function (k) { parts.push(T('int.' + k).toLowerCase()); });
    if (w.way) parts.push(T('why.way'));
    parts.push(seasonPhrase(w.months));
    html = '<p class="why-on">' + esc(T('why.on', { x: parts.join(', ') })) + '</p>';
    if (compact) return html;
    html += '<p class="why-wx">' + esc(weatherLine(stayWeather(s, state.st.months, CLIMATE, SEASONS))) + '</p>';
    stayEvents(C(s.id), s, state.st).forEach(function (e) {
      html += '<p class="event' + (e.warn ? ' event-warn' : '') + '"><b>' + T(e.warn ? 'ev.warn' : 'ev.event') + '</b>' + esc(e.t) + '</p>';
    });
    return html;
  }

  // one day of a stay; its rain plan only when wet: in a month with many days of rain (rainyMonth in page.js)
  function dayItem(d, wet) {
    return '<li class="day" id="day-' + d.day + '"><div class="day-n mono">' + T('day') + ' <b>' + d.day + '</b>' +
      (dateLabel(d.day) ? '<span class="day-date">' + esc(dateLabel(d.day)) + '</span>' : '') + '</div>' +
      '<div class="day-body"><h4>' + esc(d.t) + ' <span class="pace pace-' + d.pace + '">' + T('pace.' + d.pace) + '</span>' +
      (d.variant ? ' <span class="pace pace-' + d.variant + '">' + T('badge.' + d.variant) + '</span>' : '') +
      (d.early ? ' <span class="pace pace-early">' + T('early') + '</span>' : '') + '</h4>' +
      '<p>' + esc(d.d) + '</p>' + (d.rain && wet ? '<p class="day-rain"><b>' + T('t.rain') + '</b>' + esc(d.rain) + '</p>' : '') + '</div></li>';
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

  /* The either-or choice of a swap (SWAPS in content.js) inside a card: „Z kierowcą” or „Samodzielnie” as two radio buttons,
     the legal condition under them and, when ridden yourself, what it takes, the risk and the advice. day: the card's day,
     in the name of the radio group, so a swap met twice on a trip (there and back over a pass) makes two groups. */
  function swapBlock(id, day) {
    var self = state.settings.moto.indexOf(id) > -1;
    return '<div class="swap" data-swap="' + id + '"><p class="swap-h">' + esc(T('sw.' + id)) + '</p>' +
      '<div class="seg swap-seg" role="radiogroup" aria-label="' + esc(T('sw.' + id)) + '">' + ['driver', 'self'].map(function (v) {
        return '<label><input type="radio" name="swap-' + id + '-' + day + '" value="' + v + '"' + ((v === 'self') === self ? ' checked' : '') + '><span>' + esc(T('sw.' + v)) + '</span></label>';
      }).join('') + '</div><p class="swap-note">' + esc(T('sw.note')) + '</p>' +
      (self ? '<div class="swap-box"><p><b>' + esc(T('sw.req.h')) + '</b>' + esc(T('sw.req')) + '</p><p><b>' + esc(T('sw.risk.h')) + '</b>' + esc(T('sw.risk') + (SWAPS[id].risk ? ' ' + T('sw.risk.' + id) : '')) + '</p>' +
        '<p><b>' + esc(T('sw.tips.h')) + '</b>' + esc(T('sw.tips') + ' ' + T('sw.tips.' + id)) + '</p></div>' : '') + '</div>';
  }
  // the swap of a place (its days), or of a road of the leg L (SWAPS), or undefined
  function swapOfPlace(id) { return Object.keys(SWAPS).filter(function (k) { return SWAPS[k].place === id; })[0]; }
  function swapOfLeg(L) {
    var roads = swapRoads(SWAPS), g = L.segs.filter(function (g) { return g.mode === 'road' && roads[[g.from, g.to].sort().join('-')]; })[0];
    return g ? roads[[g.from, g.to].sort().join('-')].swap : undefined;
  }

  /* The journey on a given day: L is a stay's leg from planRoute, or the way home (toId null). prev: the stay before. */
  function legCard(L, day, prev, toId) {
    var from = AIRPORTS[L.from] ? T('leg.airport', { x: AIRPORTS[L.from].name }) : C(L.from).short;
    var to = toId ? C(toId).short : T('leg.airport', { x: AIRPORTS[L.to].name });
    var notes = legNotes(L, prev, !!(prev && C(prev.id).days.some(function (d) { return d.solo; }))).map(function (k) { return T(k); })
      .concat(ferryNotes({ segs: cardSegs(L.segs, AIRPORTS) }, FERRY, AIRPORTS).map(function (n) { return T(n.key, { x: C(n.place).short, last: n.last, land: n.land, first: n.first, at: n.at }); }))
      .concat(flightNotes(L, FLIGHT_DAYS).map(function (n) { return T(n.key, { a: AIRPORTS[n.a].name, b: AIRPORTS[n.b].name, days: T(n.days) }); }));
    var long = L.total >= LONG_LEG_H, maps = L.flights ? '' : mapsLink(L.from, L.to), sw = swapOfLeg(L);
    return '<div class="leg' + (long ? ' leg-long' : '') + '">' +
      '<div class="leg-head"><span class="leg-day mono">' + T('day') + ' ' + day + '</span>' +
      '<span class="leg-route">' + esc(from) + ' → ' + esc(to) + '</span>' +
      '<span class="leg-total mono">' + approx(L.total) + ' ' + T('door') + '</span></div>' +
      '<ul class="leg-segs">' + cardSegs(L.segs, AIRPORTS).map(function (g) {
        var text = g.mode === 'fly' ? T('fly') + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name : T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS, selfSwaps(state.settings.moto, SWAPS).roads, AIR_KEYS));
        return '<li>' + ICON[g.mode] + '<span>' + esc(text) + '</span><span class="mono">' + fmtH(g.h) + '</span></li>';
      }).join('') + '</ul>' +
      (notes.length || long || maps ? '<p class="leg-foot">' + (long ? '<span class="flag">' + T('longday') + '</span> ' : '') +
        esc(notes.join(' ')) +
        (maps ? ' <a href="' + esc(maps) + '" target="_blank" rel="noopener">' + T('maps') + '</a>' : '') + '</p>' : '') +
      (sw ? swapBlock(sw, day) : '') + '</div>';
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
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; }), compact = !c.photos.length || again, sw = swapOfPlace(s.id);
      html += legCard(s.leg, s.start, i ? r.stops[i - 1] : null, s.id) +
        '<section class="stop' + (compact ? ' stop-compact' : '') + '" id="stop-' + (i + 1) + '" data-pin="' + nodeOf(s.id) + '" style="--c:' + stopColor(s.id) + '">' +
        '<header class="stop-head"><span class="stop-num">' + (i + 1) + '</span><div class="stop-title">' +
        '<p class="eyebrow">' + dayRange(s.start, s.end) + ' · ' + s.n + ' ' + countWord('nights', s.n) + ' · ' + T('reg.' + c.region) + '</p>' +
        '<h3>' + esc(c.name) + '</h3><p class="stop-sub">' + esc(c.sub) + '</p></div>' + stopTools(s) + '</header>' +
        '<div class="why">' + stayFacts(i, compact) + '</div>' +
        (again ? '' : gallery(s.id)) + (sw ? swapBlock(sw, s.start) : '') + '<ol class="days">' + state.plans[i].map(function (d) {
          return dayItem(d, rainyMonth(CLIMATE[s.id], state.st.months[d.day - 1] + 1));
        }).join('') + '</ol>' + (again ? '' : tips(c)) + '</section>';
    });
    html += legCard(r.home, r.days, r.stops[r.stops.length - 1], null) + homeCard();
    $('#stops').innerHTML = html;
    initGalleries();
    observeStops();
  }

  /* ---------- the map: three panels one under another (mapLayout in page.js, MAP_PANELS in panels.js) ---------- */
  var mapBoxes = [];   // where the panels stand in the map's SVG: [{ y, h }], for the enlarged map
  function r1(v) { return v.toFixed(1); }
  function curve(a, b) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1, k = 0.16 * len;
    var cx = mx - dy / len * k, cy = my + dx / len * k;
    return 'M' + r1(a[0]) + ' ' + r1(a[1]) + ' Q' + r1(cx) + ' ' + r1(cy) + ' ' + r1(b[0]) + ' ' + r1(b[1]);
  }
  // a scale bar of 50 km in the panel's bottom corner (p.bar), measured across at the panel's middle latitude
  function scaleBar(p) {
    var mid = p.lat0 - p.h / p.s / 2, len = 50 / (111.32 * Math.cos(mid * Math.PI / 180)) * p.s;
    var x0 = p.bar === 'left' ? 10 : p.w - 10 - len, y = p.h - 8;
    return '<g class="m-scale"><path d="M' + r1(x0) + ' ' + (y - 3) + 'v3h' + r1(len) + 'v-3"/><text x="' + r1(p.bar === 'left' ? x0 + len + 4 : x0 - 4) + '" y="' + (y + 1) +
      '" text-anchor="' + (p.bar === 'left' ? 'start' : 'end') + '">' + T('m.km', { n: 50 }) + '</text></g>';
  }
  // the text of a label, inside its box (page.js: STAY_LABEL_H, LINE_H): a stay's name over its days, or lines of 10 px
  // (the ends of a stub, a point of interest, a faint dot) in one group
  function labelText(l, cls) {
    if (l.kind === 'stop') {
      return '<text class="m-label" x="' + r1(l.x) + '" y="' + r1(l.y + 12.5) + '" text-anchor="' + l.anchor + '">' + esc(l.lines[0]) + '</text>' +
        (l.lines[1] ? '<text class="m-sub" x="' + r1(l.x) + '" y="' + r1(l.y + 24.75) + '" text-anchor="' + l.anchor + '">' + esc(l.lines[1]) + '</text>' : '');
    }
    return '<g class="m-lab">' + l.lines.map(function (line, i) {
      return '<text class="' + cls + '" x="' + r1(l.x) + '" y="' + r1(l.y + 10.75 + LINE_H * i) + '" text-anchor="' + l.anchor + '">' + esc(line) + '</text>';
    }).join('') + '</g>';
  }
  function renderMap() {
    var L = mapLayout(state.route, state.st, { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: T });
    var defs = [], body = [];
    mapBoxes = L.panels.map(function (P) { return { y: P.y, h: P.p.h }; });
    L.panels.forEach(function (P) {
      var p = P.p, b = BASEMAP[P.key], g = [], grid = [];
      defs.push('<clipPath id="clip-' + P.key + '"><rect x="0" y="0" width="' + p.w + '" height="' + p.h + '" rx="8"/></clipPath>');
      g.push('<rect class="m-frame" x="0" y="0" width="' + p.w + '" height="' + p.h + '" rx="8"/>',
        '<path class="m-land-o" d="' + b.other + '"/><path class="m-land" d="' + b.vn + '"/><path class="m-river" d="' + b.rivers + '"/>');
      // whole degrees: the latitudes across, labelled on the right where no label of the trip stands (mapLayout), the longitudes dashed
      P.grid.forEach(function (q) {
        grid.push('<line class="m-grid" x1="0" x2="' + p.w + '" y1="' + r1(q.y) + '" y2="' + r1(q.y) + '"/>' +
          (q.label ? '<text class="m-gridlabel" x="' + (p.w - 6) + '" y="' + r1(q.y - 4) + '" text-anchor="end">' + q.lat + '°N</text>' : ''));
      });
      for (var lon = Math.ceil(p.lon0); lon <= Math.floor(p.lon0 + p.w / p.s); lon++) {
        var gx = r1((lon - p.lon0) * p.s);
        grid.push('<line class="m-grid m-grid-v" x1="' + gx + '" x2="' + gx + '" y1="0" y2="' + p.h + '"/>');
      }
      g.push(grid.join(''));
      P.names.forEach(function (n) {
        g.push('<text class="m-' + n.kind + '" x="' + r1(n.x) + '" y="' + r1(n.y) + '" text-anchor="' + n.anchor + '">' + esc(n.text) + '</text>');
      });
      P.faint.forEach(function (f) { g.push('<circle class="m-faint" cx="' + r1(f.x) + '" cy="' + r1(f.y) + '" r="3.5"/>'); });
      P.segs.forEach(function (s) {
        g.push(s.mode === 'fly' ? '<path class="m-fly" d="' + curve([s.x1, s.y1], [s.x2, s.y2]) + '"/>'
          : '<line class="m-road" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>');
      });
      // a stub: the start of the way to another panel, with a small arrowhead at its tip
      P.stubs.forEach(function (s) {
        var dx = s.x2 - s.x1, dy = s.y2 - s.y1, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
        var bx = s.x2 - ux * 6, by = s.y2 - uy * 6;
        g.push('<line class="' + (s.mode === 'fly' ? 'm-fly' : 'm-road') + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>' +
          '<path class="m-arrow" d="M' + r1(s.x2) + ' ' + r1(s.y2) + 'L' + r1(bx - uy * 3.5) + ' ' + r1(by + ux * 3.5) + 'L' + r1(bx + uy * 3.5) + ' ' + r1(by - ux * 3.5) + 'z"/>');
      });
      P.pois.forEach(function (o) {
        g.push('<line class="m-road m-local" x1="' + r1(o.from[0]) + '" y1="' + r1(o.from[1]) + '" x2="' + r1(o.x) + '" y2="' + r1(o.y) + '"/>' +
          '<circle class="m-poi" cx="' + r1(o.x) + '" cy="' + r1(o.y) + '" r="4"/>');
      });
      // an airport's box, with a line to the airport's point when the box had to move off a pin
      P.airports.forEach(function (a) {
        if (Math.abs(a.bx - a.x) + Math.abs(a.by - a.y) > 0.5) {
          g.push('<line class="m-lead" x1="' + r1(a.x) + '" y1="' + r1(a.y) + '" x2="' + r1(a.bx) + '" y2="' + r1(a.by) + '"/><circle class="m-apt-dot" cx="' + r1(a.x) + '" cy="' + r1(a.y) + '" r="2"/>');
        }
        g.push('<rect class="m-airport" x="' + r1(a.bx - AIRPORT_BOX / 2) + '" y="' + r1(a.by - AIRPORT_BOX / 2) + '" width="' + AIRPORT_BOX + '" height="' + AIRPORT_BOX + '" rx="2"/>');
      });
      P.labels.forEach(function (l) {
        if (l.kind !== 'stop') g.push(labelText(l, l.kind === 'faint' ? 'm-faint-label' : 'm-sub'));
      });
      // a pin moved off its point (spreadPins in page.js): a line to the point
      P.pins.forEach(function (pn) {
        if (Math.abs(pn.x - pn.px) + Math.abs(pn.y - pn.py) <= 0.5) return;
        g.push('<line class="m-lead" x1="' + r1(pn.px) + '" y1="' + r1(pn.py) + '" x2="' + r1(pn.x) + '" y2="' + r1(pn.y) + '"/><circle class="m-pin-dot" cx="' + r1(pn.px) + '" cy="' + r1(pn.py) + '" r="2"/>');
      });
      // the pins last, each with its label in one group, so the stay being read lights up both (observeStops)
      P.pins.forEach(function (pn) {
        var l = P.labels.filter(function (x) { return x.kind === 'stop' && x.key === pn.key; })[0];
        g.push('<g class="pin" data-pin="' + pn.key + '" style="--c:' + stopColor(pn.key) + '"><rect x="' + r1(pn.x - pn.w / 2) + '" y="' + r1(pn.y - PIN_H / 2) +
          '" width="' + r1(pn.w) + '" height="' + PIN_H + '" rx="' + PIN_H / 2 + '"/><text class="pin-num" x="' + r1(pn.x) + '" y="' + r1(pn.y + 4) + '" text-anchor="middle">' +
          pn.nums + '</text>' + (l ? labelText(l) : '') + '</g>');
      });
      body.push('<g transform="translate(0,' + P.y + ')"><g clip-path="url(#clip-' + P.key + ')">' + g.join('') + '</g>' +
        '<rect class="m-edge" x="0" y="0" width="' + p.w + '" height="' + p.h + '" rx="8"/><text class="m-title" x="10" y="17">' + T('m.' + P.key) + '</text>' +
        scaleBar(p) + '</g>');
    });
    var legend = '<span><svg width="24" height="6" aria-hidden="true"><line class="m-road" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.road') + '</span>' +
      '<span><svg width="24" height="6" aria-hidden="true"><line class="m-fly" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.flight') + '</span>' +
      '<span><svg width="12" height="12" aria-hidden="true"><rect class="m-airport" x="0.8" y="0.8" width="10.4" height="10.4" rx="2"/></svg>' + T('m.airports') + '</span>' +
      '<span class="map-note">' + T('m.scale') + '</span>';
    $('#map').innerHTML = '<svg viewBox="-6 -6 ' + (MAP_WIDTH + 12) + ' ' + (L.height + 12) + '" role="img" aria-labelledby="map-title"><title id="map-title">' + T('m.title') +
      esc(state.route.stops.map(function (s) { return C(s.id).short; }).join(', ')) + '</title><defs>' + defs.join('') + '</defs>' + body.join('') + '</svg>' +
      '<p class="map-legend">' + legend + '<button type="button" class="map-hint">' + T('m.zoom') + '</button></p>';
    // the printout: the three panels apart, north and centre side by side, the south under them with the legend
    var svg = $('#map svg').outerHTML;
    $('#map-print').innerHTML = mapBoxes.map(function (b, i) { return '<div class="mp-panel">' + panelSvg(svg, b, 'p' + i) + '</div>'; }).join('') +
      '<p class="map-legend mp-legend">' + legend + '</p>';
  }
  /* One panel of the map as an SVG of its own (the zoom and the printout): own ids, so a copy never borrows the sidebar
     map's clip paths (the ids clip-<panel>, never the attribute clip-path), and a viewBox around the panel. b: its box in
     mapBoxes; tag: what the copy's ids end with. */
  function panelSvg(svg, b, tag) {
    return svg.replace(new RegExp('(clip-(?:' + Object.keys(MAP_PANELS).join('|') + ')|map-title)', 'g'), '$1-' + tag)
      .replace(/viewBox="[^"]*"/, 'viewBox="-6 ' + (b.y - 6) + ' ' + (MAP_WIDTH + 12) + ' ' + (b.h + 12) + '"');
  }

  /* ---------- map zoom (desktop): the three panels grow out of the sidebar into a side-by-side view ---------- */
  var MZ_MS = 480;
  var mz = { open: false, busy: false, opener: null, kb: false };
  function mzWide() { return window.matchMedia('(min-width: 901px)').matches; }
  // on-screen boxes of the panels inside the sidebar map (viewBox MAP_WIDTH + 12 wide, a margin of 6 all around)
  function mzSource() {
    var r = $('#map svg').getBoundingClientRect(), k = r.width / (MAP_WIDTH + 12);
    return mapBoxes.map(function (b) { return { x: r.left, y: r.top + b.y * k, w: r.width, h: (b.h + 12) * k }; });
  }
  // the panels side by side, at one scale, as large as the window allows
  function mzTarget() {
    var pad = 28, gap = 24, top = 64, vw = MAP_WIDTH + 12, n = mapBoxes.length;
    var tallest = Math.max.apply(null, mapBoxes.map(function (b) { return b.h + 12; }));
    var f = Math.min((window.innerWidth - 2 * pad - gap * (n - 1)) / (n * vw), (window.innerHeight - top - pad) / tallest);
    var x0 = (window.innerWidth - (n * vw * f + gap * (n - 1))) / 2;
    return mapBoxes.map(function (b, i) { return { x: x0 + i * (vw * f + gap), y: top, w: vw * f, h: (b.h + 12) * f }; });
  }
  function mzPlace(el, t, from) {
    el.style.left = t.x + 'px'; el.style.top = t.y + 'px'; el.style.width = t.w + 'px'; el.style.height = t.h + 'px';
    el.style.transform = from ? 'translate(' + (from.x - t.x) + 'px,' + (from.y - t.y) + 'px) scale(' + (from.w / t.w) + ')' : 'none';
  }

  function openMapZoom(kb) {
    if (mz.open || mz.busy || !mzWide()) return;
    var src = mzSource(), dst = mzTarget(), box = $('#mapzoom'), svg = $('#map svg').outerHTML;
    var panels = mapBoxes.map(function (b, i) {
      var d = document.createElement('div');
      d.className = 'mz-panel';
      d.innerHTML = panelSvg(svg, b, 'z' + i);
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
  /* "Nie ma na twojej trasie, bo…": every place off the trip with why it is not on it (whyOff in page.js), and Dodaj where it
     can put the place on the trip, with what would leave the trip for it. */
  function offReason(r, x) {
    if (r === 'level') return T('off.r.level', { lvl: T('lvl.' + PLACES[x.id].level) });
    if (r === 'season') return T('off.r.season', { why: x.why.map(function (w) { return T('wx.' + w); }).join(', ') });
    if (r === 'beaten') return T('off.r.beaten', { days: state.st.days });
    return T('off.r.' + r);
  }
  function renderOffRoute() {
    var s = state.settings;
    $('#offroute-list').innerHTML = whyOff(state.route, s, state.st, DATA, CLIMATE).map(function (x) {
      var c = C(x.id);
      return '<li><span class="dot" style="--c:' + stopColor(x.id) + '"></span><div class="off-body"><b>' + esc(c.short) + '</b>' +
        (x.added ? ' <span class="off-tag">' + T('off.missing') + '</span>' : '') +
        '<p class="off-why">' + esc(capFirst(x.reasons.map(function (r) { return offReason(r, x); }).join('; '))) + '.</p>' +
        (x.canAdd ? '<p class="off-drops">' + esc(x.drops.length ? T('off.drops', { list: names(x.drops) })
          : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops')) + '</p>' : '') + '</div>' +
        (x.canAdd ? '<button type="button" class="btn-small" data-add="' + x.id + '" aria-label="' + esc(T('off.add.aria', { x: c.short })) + '">' + T('off.add') + '</button>' : '') + '</li>';
    }).join('');
    $('#reset-changes').hidden = !(s.add.length || s.remove.length);
  }
  /* After Dodaj: which places left the trip and which came besides the added one (addReport). Its own status line, so
     "Nie zmieściło się" stays; the next change of the trip clears it (apply). Nothing is said when nothing else changed. */
  function reportAdd(added, before) {
    var rep = addReport(before, state.route.stops, added, PLACES), x = C(added).short, text = '';
    if (rep.left.length) text = T('off.dropped', { x: x, list: names(rep.left) });
    if (rep.came.length) text += (text ? ' ' : '') + T(rep.left.length ? 'off.came' : 'off.came_only', { x: x, list: names(rep.came) });
    $('#dropped').textContent = tied(text);
  }
  function bindChanges() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-add], [data-remove], #reset-changes') : null;
      if (!b) return;
      // the changes build on the form as it stands, so a choice in it that gave no trip yet is not lost
      var added = b.hasAttribute('data-add') ? b.getAttribute('data-add') : null, before = state.route.stops, base = readForm();
      var s = b.id === 'reset-changes' ? withoutChanges(base)
        : added ? withAdded(base, added)
        : withRemoved(base, b.getAttribute('data-remove'));
      if (apply(s)) {
        syncForm();
        if (added) reportAdd(added, before);
        $('#shape-h2').focus({ preventScroll: true });   // the button is gone with the old trip; the trip's heading takes the focus
      } else {
        $('#missing').textContent = $('#settings-msg').textContent;   // the message also next to the buttons that caused it
      }
    });
  }

  /* ---------- before the trip: the budget, what to book (bookList), what is worth knowing (ENTRY), what to pack (packList) ---------- */
  function linksOf(list) { return list.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.name) + '</a>'; }).join(' · '); }
  function placesOf(ids) { return andList(ids.map(function (id) { return C(id).short; })); }
  function renderBefore() {
    var b = state.budget, r = state.route, st = state.st, moto = state.settings.moto;
    var hits = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS).hits, tet = hits.some(function (h) { return h.kind === 'tet'; });
    var holidays = hits.filter(function (h) { return h.kind === 'holiday'; }).map(function (h) { return h.name; });
    var top = b.items.slice(0, 3).map(function (x) { return T('bud.item', { name: T('cost.' + x.key), x: zl(x.two, 10) }); });
    $('#b-budget').innerHTML = '<h3>' + T('bud.h3') + '</h3><p class="b-sum"><b>' + zl(b.two) + '</b> ' + esc(T('bud.two')) + '</p>' +
      '<p>' + esc(T('bud.one', { x: zl(b.one) })) + '</p>' +
      '<ul class="b-parts">' + ['nights', 'day', 'travel', 'trips'].map(function (k) {
        return '<li><span>' + T('bud.' + k) + '</span><span class="mono">' + zl(b.parts[k].two) + '</span></li>';
      }).join('') + '</ul>' +
      (top.length ? '<p>' + esc(T('bud.top', { x: andList(top) })) + '</p>' : '') +
      (tet ? '<p class="b-warn">' + esc(T('bud.tet')) + '</p>' : holidays.length ? '<p class="b-warn">' + esc(T(holidays.length > 1 ? 'bud.holidays' : 'bud.holiday', { x: andList(holidays) })) + '</p>' : '') +
      '<p class="b-note">' + esc(T('bud.note', { month: T('monl.' + +COSTS_CHECKED.slice(5, 7)), year: COSTS_CHECKED.slice(0, 4), rate: fmtSpan(EUR_PLN_DATE, EUR_PLN_DATE) })) + '</p>';
    var books = bookList(r, state.plans, moto, BOOK_DATA);
    $('#b-book').innerHTML = '<h3>' + T('book.h3') + '</h3><p class="b-note">' + T('book.p') + '</p>' +
      (tet ? '<p class="b-warn">' + esc(T('book.tet')) + '</p>' : '') +
      (books.length ? '<ol class="b-book">' + books.map(function (e) {
        // what the line is about: the flights, the roads from airports (both ways said so), the hosts' places, the things
        // booked under the key (a park's services); a place with a peak of its own for its hosts adds its sentence
        var x = e.key === 'flights' ? e.list.map(function (f) { return AIRPORTS[f[0]].name + ' → ' + AIRPORTS[f[1]].name; }).join(', ')
          : e.key === 'airport' ? andList(e.list.map(function (a) { return AIRPORTS[a[0]].name + ' – ' + C(a[1]).short + (a[2] > 1 ? ' ' + T('book.both') : ''); }))
          : e.key === 'homestay' ? placesOf(e.list) : capFirst(andList(e.items.map(function (k) { return T('cost.' + k); })));
        var more = e.key === 'homestay' ? e.list.filter(function (id) { return HOMESTAY_NOTES.indexOf(id) > -1; }).map(function (id) { return ' ' + T('b.homestay.' + id); }).join('') : '';
        var meta = [e.two ? esc(T('book.cost', { x: zl(e.two, 10) })) : '', linksOf(e.links)].filter(Boolean);
        return '<li><p>' + esc(T('b.' + e.key, { x: x }) + more) + '</p>' + (meta.length ? '<p class="b-meta">' + meta.join(' · ') + '</p>' : '') + '</li>';
      }).join('') + '</ol>' : '<p>' + esc(T('book.none')) + '</p>');
    // what is worth knowing (decision of 15.10.2026): the visa as a question for one's own passport, the e-visa and the
    // arrival card on the government's sites (the links of ENTRY), the ban on e-cigarettes
    $('#b-know').innerHTML = '<h3>' + T('know.h3') + '</h3><ul class="b-list"><li>' + esc(T('know.visa')) + '</li><li>' + esc(T('know.vape')) + '</li></ul>' +
      '<p class="b-meta">' + T('know.links') + linksOf(ENTRY.links) + '</p>';
    $('#b-pack').innerHTML = '<h3>' + T('pack.h3') + '</h3><ul class="b-list">' + packList(r, state.plans, st, moto, PACK_DATA).map(function (p) {
      return '<li>' + esc(T('p.' + p.code, { x: placesOf(p.places), t: p.t })) + '</li>';
    }).join('') + '</ul>';
  }

  /* „Z kierowcą” or „Samodzielnie” in a card: the trip stays, its days, texts and budget follow; the choice builds on the
     form as it stands (as Dodaj does), and the focus goes back to the chosen button of the new card. When the form gives
     no trip, nothing changes: the choice goes back to the trip's, and the form's message also stands in the card. */
  function bindSwaps() {
    document.addEventListener('change', function (e) {
      var name = e.target.name || '';
      if (name.indexOf('swap-') !== 0) return;
      var id = e.target.closest('.swap').getAttribute('data-swap');
      if (apply(withSwap(readForm(), id, e.target.value === 'self'))) {
        syncForm();
        var again = document.querySelector('input[name="' + name + '"]:checked');
        if (again) again.focus({ preventScroll: true });
      } else {
        var box = e.target.closest('.swap'), was = state.settings.moto.indexOf(id) > -1 ? 'self' : 'driver', p = box.querySelector('.swap-msg');
        Array.prototype.forEach.call(box.querySelectorAll('input[name="' + name + '"]'), function (x) { x.checked = x.value === was; if (x.checked) x.focus({ preventScroll: true }); });
        if (!p) { p = document.createElement('p'); p.className = 'swap-msg'; p.setAttribute('role', 'status'); box.appendChild(p); }
        p.textContent = $('#settings-msg').textContent;
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
    lines.push(T('pt.budget', { x: zl(state.budget.two) }));
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
    $('#lb-credit').textContent = T('lb.photo') + PHOTO_META[lb.ids[lb.i]].artist + ' · ' + licName(PHOTO_META[lb.ids[lb.i]].license);
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

  // the multi-word names a line may not break inside: the short names of the places, the names of the airports and the
  // names without a Vietnamese letter that the texts use (KEEP_TOGETHER in content.js)
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
    .filter(function (n, i, all) { return n.indexOf(' ') > -1 && all.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  // a text with the no-break spaces of Polish typography (tieShort) and of the names (tieVietnamese, tieNames), all in page.js
  function tied(text) { return lang === 'pl' ? tieNames(tieVietnamese(tieShort(text)), TIED_NAMES) : text; }
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

  /* The bar at the top sums up the settings once the form has gone up off the screen (class away on the bar). */
  function bindSummary() {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      $('#secnav').classList.toggle('away', !es[0].isIntersecting && es[0].boundingClientRect.bottom < 0);
    }).observe(F);
  }

  /* ---------- the footer and the texts in the template ---------- */
  function renderCredits() {
    var used = {};
    used[HERO_PHOTO] = true;
    Object.keys(CONTENT).forEach(function (id) { CONTENT[id].photos.forEach(function (ph) { used[ph] = true; }); });
    $('#credits').innerHTML = Object.keys(used).map(function (ph) {
      // the caption leads to the photo's page on Commons, the licence to its text
      var m = PHOTO_META[ph], lic = licenceUrl(m.license);
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.cap) + '</a>: ' + esc(m.artist) + ', ' +
        (lic ? '<a href="' + esc(lic) + '" target="_blank" rel="noopener">' + esc(licName(m.license)) + '</a>' : esc(licName(m.license))) + '</li>';
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
  // „Zapisz trasę jako PDF”: the print dialog straight from the tap (Safari refuses a print it did not see asked for)
  $('#pdf-plan').addEventListener('click', function () { window.print(); });
  bindAnchors();
  bindMapZoom();
  bindChanges();
  bindSwaps();
  bindSummary();
  fromLink();
  /* back-to-top button: shown once the photo opener has scrolled away */
  var totop = $('#totop'), hero = $('.hero');
  if (totop && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { totop.hidden = es[0].isIntersecting; }).observe(hero);
  }
  /* for the probes in tests/probes/ */
  window.__trip = { state: state, apply: apply, today: TODAY };
})();
