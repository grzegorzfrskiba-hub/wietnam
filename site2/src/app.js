/* Page logic: reads the settings (the link or the form), plans the trip with the engine (engine.js) and renders the facts,
   the day strip, the stays with their day plans and the journeys. Pure helpers: page.js; texts: ui.js, content/, photos.js,
   and in English (stage 5) en/: the page's language comes from the link and the switch EN · PL (setLang). */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- texts ---------- */
  // the page's language, 'en' or 'pl' (setLang): English unless the link says lang=pl (decision of 15.10.2026)
  var lang = 'en';
  // the estimated costs shown (fix 2 of the first round of fixes): hidden unless the link says koszty=1 or the visitor shows
  // them (setCosts)
  var costs = false;
  // the texts of the places in that language (localContent in page.js), set by setLang
  var VIEW = CONTENT;
  function T(k, vars) {
    var v = UI[lang][k];
    if (v == null) return k;
    if (vars) Object.keys(vars).forEach(function (n) { v = v.split('{' + n + '}').join(vars[n]); });
    return v;
  }
  function countWord(key, n) { return T(key + '.' + nightForm(n)); }
  function C(id) { return VIEW[id]; }
  function caption(id) { return lang === 'en' ? PHOTO_CAPS_EN[id] : PHOTO_META[id].cap; }
  // a holiday's or a link's name in the page's language (HOLIDAY_NAMES_EN and LINK_NAMES_EN in en/names.js)
  function named(map, name) { return lang === 'en' ? map[name] : name; }
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
  // the weekday and date of trip day n, only when the trip has dates: "czw. 28.01", in English "Thu 28 Jan" (finding 9),
  // short enough for one line under the number
  function dateLabel(day) {
    var iso = tripDate(state.st.start, day);
    if (!iso) return '';
    var p = iso.split('-').map(Number);
    var wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString(lang === 'en' ? 'en-GB' : 'pl-PL', { weekday: 'short', timeZone: 'UTC' });
    return lang === 'en' ? wd + '\u00a0' + p[2] + '\u00a0' + T('mon3.' + p[1]) : wd + '\u00a0' + p[2] + '.' + (p[1] < 10 ? '0' : '') + p[1];
  }
  // "w marcu", "we wrześniu", "in March" (inMonthText in page.js)
  function inMonth(m) { return inMonthText(T('monl.' + m), lang); }
  // days for a sentence (fmtSpan in page.js): in English with the short names of the months
  function span(a, b) { return fmtSpan(a, b, lang === 'en' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (m) { return T('mon3.' + m); }) : null); }
  // the short names of places, for a sentence
  function names(ids) { return ids.map(function (id) { return C(id).short; }).join(', '); }
  function capFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  // an amount in euros, [from, to], in dong (vndText): the budget of the trip (sum) in whole millions, "17–39 mln VND";
  // a part of it or a thing in millions with one decimal, "0,8–1,5 mln VND", or under a million to 10 000, "260 000 VND";
  // a thing that may cost nothing only its dearer end, "do 2,2 mln VND"; one number when both ends come out alike; "0 VND"
  // only for what costs nothing
  function vnd(eur, sum) {
    var v = vndText(eur, EUR_VND, sum, lang);
    return T(v.key, v.vars);
  }
  // names for a sentence: "A", "A i B", "A, B i C"; in English "A, B and C"
  function andList(list) { return list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' ' + T('and') + ' ' + list[list.length - 1]; }
  function termText(st) {
    return st.start ? span(st.start, tripDate(st.start, st.days)) : T('term.month', { month: T('mon.' + st.month), year: st.year });
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

  /* New settings: plan the trip; when there is one, show it and write the settings into the address, with koszty=1 when the
     costs show and lang=pl at the end when the page is in Polish (pageHash in page.js). Otherwise keep the
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
    var h = pageHash(s, lang, costs);
    if (location.hash !== h) {
      try { history.replaceState(null, '', h); } catch (e) { location.replace(h); }
    }
    render();
    return true;
  }

  /* The settings in the address: a link someone sent, or the defaults. A link whose Dodaj and Usuń leave no trip opens
     without them. A link that was partly wrong says so as the first of the warnings above the figures of the trip. A link
     with lang=pl opens in Polish, every other one in English (langOf in page.js); a link with koszty=1 shows the costs,
     every other one hides them (costsOf). */
  function fromLink() {
    if (langOf(location.hash) !== lang) setLang(langOf(location.hash));
    costs = costsOf(location.hash);
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
    labelForm();
    F.start.min = TODAY;
    F.start.max = PLAN_LAST_YEAR + '-12-31';
    F.addEventListener('submit', function (e) { e.preventDefault(); });
    F.addEventListener('change', onFormChange);
  }
  // the words of the form in the page's language: the interests and the levels (which of them is chosen comes back with syncForm)
  function labelForm() {
    $('#interest-list').innerHTML = INTERESTS.map(function (k) {
      return '<label class="chip"><input type="checkbox" name="interest" value="' + k + '"><span>' + T('int.' + k) + '</span></label>';
    }).join('');
    $('#level-list').innerHTML = LEVELS.map(function (n) {
      return '<label><input type="radio" name="level" value="' + n + '"><span>' + T('lvl.' + n) + '</span></label>';
    }).join('');
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
    F.costs.checked = costs;
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
    if (e.target.name === 'costs') { setCosts(e.target.checked); return; }   // no setting of the trip (fix 2)
    byHand = e.isTrusted;   // the visitor's own change moves the page (finishing touches)
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
    byHand = false;
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
      reveal(el);   // a day of the strip opens (finding 3 of fix 3)
      el.scrollIntoView({ block: 'start' });
      if (!/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    });
    window.addEventListener('hashchange', function () {
      if (state.settings && location.hash === pageHash(state.settings, lang, costs)) return;
      var bad = [];
      // an anchor typed by hand: put the settings back (lang= or koszty= alone is a link: the default trip in its view)
      if (!Object.keys(parseLink(location.hash, bad)).length && !bad.length && !/(?:^#|&)(lang|koszty)=/.test(location.hash)) {
        var at = document.getElementById(location.hash.slice(1));
        if (at) { reveal(at); at.scrollIntoView({ block: 'start' }); }   // a day typed as #day-5 opens
        try { history.replaceState(null, '', pageHash(state.settings, lang, costs)); } catch (e) { /* the address keeps the anchor */ }
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
    expand: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    // the arrow at the end of a folded row (a summary), turned up when the row is open (template.html: .fold-arrow)
    fold: '<svg class="fold-arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>'
  };

  /* The settings in short, for the bar at the top: "mar 2027 · 15 dni · Aktywnie", or with dates "28.01–14.02.2027 · …". */
  function summaryText(st) {
    var term = st.start ? span(st.start, tripDate(st.start, st.days)) : T('mon3.' + st.month) + ' ' + st.year;
    return T('sum', { term: term, days: st.days, level: T('lvl.' + st.level) });
  }

  function render() {
    // the folded rows open before open again, but on another trip the days and journeys start closed (tripKey in page.js)
    var keep = openFolds(), trip = tripKey(state.route), again = drawnTrip !== null && trip !== drawnTrip && byHand;
    if (trip !== foldTrip) keep = keep.filter(function (k) { return !/^(day|leg)-/.test(k); });
    foldTrip = trip;
    $('#sum-text').textContent = summaryText(state.st);
    renderFacts();
    renderShape();
    renderOffRoute();
    renderMap();
    renderStops();
    renderMini();
    renderBefore();
    renderFinale();
    $('#copy-status').textContent = $('#end-status').textContent = '';
    $('#copy-fallback').hidden = $('#end-fallback').hidden = true;
    renderPrintLink();
    $('#wild-hero').href = $('#wild-top').href = $('#wild-nav').href = wildLink('route');
    tieShortWords(document.body);
    reopenFolds(keep);
    syncDaysAll();
    paintFrames();
    syncDay();
    drawRoute(trip, drawnTrip === null || again);
    if (again) rebuilt();
  }

  /* The end of the page (finishing touches, finding 9): the sunset over Pù Luông (FINALE_PHOTO), over the title the trip's
     last day, as "Dzień 15 · Hà Nội · Wylot". */
  function renderFinale() {
    $('#finale-photo').innerHTML = img(FINALE_PHOTO, '', '(max-width: 700px) 200vw, 100vw');
    $('#end-day').textContent = T('day') + ' ' + state.route.days + ' · ' + AIRPORTS[state.st.to].name + ' · ' + T('flyhome');
  }

  /* The wildlife subpage (stage 6, finding 5) with this trip: its tab (route, or guide-<place> for a stay's „Zwierzęta
     tutaj →”), then the trip in the page's view (pageHash), so the subpage plans the same trip; always the public page's
     address, so the link works from the offline file too. */
  function wildLink(tab) { return SITE_URL + 'wildlife/#' + tab + '&' + pageHash(state.settings, lang, costs).slice(1); }
  function wildHere(id) {
    return WILD_GUIDE_PLACES.indexOf(id) > -1 ? '<p class="stop-wild"><a href="' + esc(wildLink('guide-' + id)) + '">' + esc(T('stop.wild')) + '</a></p>' : '';
  }
  // the printout names this route's address on the public page, in the page's view (as the copied plan does)
  function renderPrintLink() {
    var url = SITE_URL + pageHash(state.settings, lang, costs);
    $('#print-link').innerHTML = esc(T('pt.link')) + '<a href="' + esc(url) + '">' + esc(url) + '</a>';
  }

  function renderFacts() {
    var r = state.route, st = state.st, k = routeStats(r, state.plans, PLACES), n = r.days - 1, before = figures();
    $('#facts-for').textContent = T('f.for', { from: AIRPORTS[st.from].name, to: AIRPORTS[st.to].name, term: termText(st) });
    $('#facts').innerHTML =
      '<li><b>' + r.days + '</b><span>' + T('f.days', { nights: n + ' ' + countWord('nights', n) }) + '</span></li>' +
      '<li><b>' + k.places + '</b><span>' + countWord('f.places', k.places) + '</span></li>' +
      '<li><b>' + k.flights + '</b><span>' + countWord('f.flights', k.flights) + '</span></li>' +
      '<li><b>' + k.hikes + '</b><span>' + countWord('f.hikes', k.hikes) + '</span></li>' +
      // the longest day: its number large and its unit small, so the widest (8½ godz.) fits its tile (tests/probes/before.js)
      '<li><b>' + approx(k.longest).replace('≈ ', '').replace(' ' + T('h'), '') + '<small>\u00a0' + T('h') + '</small></b><span>' + T('f.longest') + '</span></li>' +
      // the budget only with the costs shown (fix 2); without it the five figures fill their rows (no-budget, template.html)
      (costs ? '<li class="f-budget"><a href="#b-budget" aria-label="' + esc(T('f.budget.aria', { x: vnd(state.budget.two, true) })) + '"><b>' + vnd(state.budget.two, true) + '</b><span>' + T('f.budget') + '</span></a></li>' : '');
    $('#facts').classList.toggle('no-budget', !costs);
    if (byHand && onScreen($('#facts'))) countUp(before);
    // first a link that was partly wrong, then a term that has passed (an old link keeps its trip, and says so), then the
    // holidays; the missing holiday dates only for a term still ahead
    var a = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS), passed = termPassed(st, TODAY), lines = [];
    if (state.linkWarn) lines.push(T('set.dropped'));
    if (passed) lines.push(T('alert.past'));
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: named(HOLIDAY_NAMES_EN, h.name), span: span(h.from, h.to) })); });
    // a chosen interest whose places on the trip are all in a poor season, or that no place on the trip serves
    interestAlerts(r, st, PLACES, CLIMATE).forEach(function (x) {
      var what = T('int.' + x.interest);
      lines.push(x.none ? T('alert.int_none', { x: what }) : T(x.ids.length > 1 ? 'alert.int_bad_many' : 'alert.int_bad',
        { x: what, when: x.months.map(inMonth).join(' ' + T('and') + ' '), places: x.ids.map(function (id) { return C(id).short; }).join(' ' + T('and') + ' '),
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
  // "w marcu i kwietniu dobry sezon", in English "good season in March and April" (the order of season.when)
  function seasonPhrase(months) {
    if (months.every(function (m) { return m.season === months[0].season; })) {
      return T('season.when', { when: inMonth(months[0].month) + months.slice(1).map(function (m) { return ' ' + T('and') + ' ' + T('monl.' + m.month); }).join(''),
        season: T('season.' + months[0].season) });
    }
    return months.map(function (m) { return T('season.when', { when: inMonth(m.month), season: T('season.' + m.season) }); }).join(', ');
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

  /* A day as a folded row (finding 1 of fix 3): its number (with the date), its title (head) and the arrow in the row, its
     text (body) when open. */
  function dayFold(day, head, body) {
    return '<li class="day' + (dateLabel(day) ? ' dated' : '') + '" id="day-' + day + '"><details data-fold="day-' + day + '"><summary class="day-row"><span class="day-n mono">' + T('day') + ' <b>' + day + '</b>' +
      (dateLabel(day) ? '<span class="day-date">' + esc(dateLabel(day)) + '</span>' : '') + '</span>' + head + ICON.fold + '</summary>' +
      '<div class="day-body">' + body + '</div></details></li>';
  }
  // one day of a stay: its title and badges; its text, and its rain plan only when wet: in a month with many days of rain
  // (rainyMonth in page.js)
  function dayItem(d, wet) {
    return dayFold(d.day, '<h4>' + esc(d.t) + ' <span class="pace pace-' + d.pace + '">' + T('pace.' + d.pace) + '</span>' +
      (d.variant ? ' <span class="pace pace-' + d.variant + '">' + T('badge.' + d.variant) + '</span>' : '') +
      (d.early ? ' <span class="pace pace-early">' + T('early') + '</span>' : '') + '</h4>',
      '<p>' + esc(d.d) + '</p>' + (d.rain && wet ? '<p class="day-rain"><b>' + T('t.rain') + '</b>' + esc(d.rain) + '</p>' : ''));
  }
  function tips(c) {
    var t = '';
    if (c.gem) t += '<p class="tip"><b>' + T('t.gem') + '</b>' + esc(c.gem) + '</p>';
    if (c.skip) t += '<p class="tip tip-skip"><b>' + T('t.skip') + '</b>' + esc(c.skip) + ' <span class="instead">' + T('t.instead') + esc(c.instead) + '</span></p>';
    return t ? '<div class="tips">' + t + '</div>' : '';
  }
  // sizes: how wide the photo is drawn, so the browser picks the smallest copy from srcset (the offline file has none); the
  // photo comes in once loaded (class ph, paintFrames)
  function img(id, cls, sizes) {
    var p = PHOTOS[id];
    return '<img class="' + (cls ? cls + ' ' : '') + 'ph" src="' + p.src + '" alt="' + esc(caption(id)) + '" width="' + p.w + '" height="' + p.h +
      '" data-ph="' + p.bg + '" loading="lazy" decoding="async"' + (p.srcset && sizes ? ' srcset="' + p.srcset + '" sizes="' + sizes + '"' : '') + '>';
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
    // a folded row (finding 6 of fix 3): its day, its ends, its time and the flag of a long day in the row; when open, its
    // roads and flights, the notes, the link to Google Maps and the swap of a road
    return '<div class="leg' + (long ? ' leg-long' : '') + '"><details data-fold="leg-' + day + '"><summary class="leg-head"><span class="leg-sum">' +
      '<span class="leg-day mono">' + T('day') + ' ' + day + '</span>' +
      '<span class="leg-route">' + esc(from) + ' → ' + esc(to) + '</span>' +
      '<span class="leg-total mono">' + approx(L.total) + ' ' + T('door') + '</span>' + (long ? '<span class="flag">' + T('longday') + '</span>' : '') + '</span>' + ICON.fold + '</summary>' +
      '<div class="leg-more"><ul class="leg-segs">' + cardSegs(L.segs, AIRPORTS).map(function (g) {
        var text = g.mode === 'fly' ? T('fly') + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name : T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS, selfSwaps(state.settings.moto, SWAPS).roads, AIR_KEYS));
        return '<li>' + ICON[g.mode] + '<span>' + esc(text) + '</span><span class="mono">' + fmtH(g.h) + '</span></li>';
      }).join('') + '</ul>' +
      (notes.length || maps ? '<p class="leg-foot">' + esc(notes.join(' ')) +
        (maps ? (notes.length ? ' ' : '') + '<a href="' + esc(maps) + '" target="_blank" rel="noopener">' + T('maps') + '</a>' : '') + '</p>' : '') +
      (sw ? swapBlock(sw, day) : '') + '</div></details></div>';
  }
  function mapsLink(a, b) {
    function where(n) { return AIRPORTS[n] ? AIRPORTS[n].maps : C(n).maps; }
    return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(where(a)) + '&destination=' + encodeURIComponent(where(b)) + '&travelmode=driving';
  }

  // the last day: the way to the departure airport and the flight home, without a time
  function homeCard() {
    var r = state.route, d = T('home.d') + (r.home.total >= 2 ? ' ' + T('home.far', { time: approx(r.home.total) }) : '');
    return '<section class="stop stop-compact stop-home" id="stop-home" data-short="' + esc(T('flyhome')) + '"><header class="stop-head"><span class="stop-num home-num">' + ICON.fly + '</span>' +
      '<div class="stop-title"><p class="eyebrow">' + T('day') + ' ' + r.days + '</p><h3>' + esc(T('home.h3', { airport: AIRPORTS[state.st.to].name })) + '</h3></div></header>' +
      '<ol class="days">' + dayFold(r.days, '<h4>' + T('home.t') + ' <span class="pace pace-travel">' + T('pace.travel') + '</span></h4>', '<p>' + esc(d) + '</p>') + '</ol></section>';
  }

  /* The stays in order, each after the journey that leads to it; a second stay in the same city (a round trip) without
     its photos and tips, which the first one showed. */
  function renderStops() {
    var r = state.route, html = '';
    r.stops.forEach(function (s, i) {
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; }), compact = !c.photos.length || again, sw = swapOfPlace(s.id);
      html += legCard(s.leg, s.start, i ? r.stops[i - 1] : null, s.id) +
        '<section class="stop' + (compact ? ' stop-compact' : '') + '" id="stop-' + (i + 1) + '" data-pin="' + nodeOf(s.id) + '" data-short="' + esc(c.short) + '" style="--c:' + stopColor(s.id) + '">' +
        '<header class="stop-head"><span class="stop-num">' + (i + 1) + '</span><div class="stop-title">' +
        '<p class="eyebrow">' + dayRange(s.start, s.end) + ' · ' + s.n + ' ' + countWord('nights', s.n) + ' · ' + T('reg.' + c.region) + '</p>' +
        '<h3>' + esc(c.name) + '</h3><p class="stop-sub">' + esc(c.sub) + '</p></div>' + stopTools(s) + '</header>' +
        '<div class="why">' + stayFacts(i, compact) + '</div>' +
        (again ? '' : gallery(s.id)) + (sw ? swapBlock(sw, s.start) : '') + '<ol class="days">' + state.plans[i].map(function (d) {
          return dayItem(d, rainyMonth(CLIMATE[s.id], state.st.months[d.day - 1] + 1));
        }).join('') + '</ol>' + (again ? '' : tips(c) + wildHere(s.id)) + '</section>';
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
    var L = mapLayout(state.route, state.st, { panels: MAP_PANELS, places: PLACES, content: VIEW, airports: AIRPORTS, say: T });
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
        g.push(s.mode === 'fly' ? '<path class="m-fly" data-leg="' + s.leg + '" d="' + curve([s.x1, s.y1], [s.x2, s.y2]) + '"/>'
          : '<line class="m-road" data-leg="' + s.leg + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>');
      });
      // a stub: the start of the way to another panel, with a small arrowhead at its tip
      P.stubs.forEach(function (s) {
        var dx = s.x2 - s.x1, dy = s.y2 - s.y1, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
        var bx = s.x2 - ux * 6, by = s.y2 - uy * 6;
        g.push('<line class="' + (s.mode === 'fly' ? 'm-fly' : 'm-road') + '" data-leg="' + s.leg + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>' +
          '<path class="m-arrow" data-leg="' + s.leg + '" d="M' + r1(s.x2) + ' ' + r1(s.y2) + 'L' + r1(bx - uy * 3.5) + ' ' + r1(by + ux * 3.5) + 'L' + r1(bx + uy * 3.5) + ' ' + r1(by - ux * 3.5) + 'z"/>');
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
        g.push('<g class="pin" data-pin="' + pn.key + '" data-leg="' + (parseInt(pn.nums, 10) - 1) + '" style="--c:' + stopColor(pn.key) + '"><rect x="' + r1(pn.x - pn.w / 2) + '" y="' + r1(pn.y - PIN_H / 2) +
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

  /* ---------- the small map on a phone (the next round of fixes, fix 2; .minimap in template.html) ---------- */
  /* Up to 900 px: the map's three panels side by side, copies of the map (panelSvg), shown while the map is off the
     screen above the days and the days still go by under the strip; the stay across the middle of the screen under it
     lit, its panel framed. A tap on a panel enlarges it (openMapZoom with one panel). */
  var MINI = window.matchMedia('(max-width: 900px)'), MINI_TOP = 46;   // the strip stands under the bar at the top, 47 px high
  function renderMini() {
    var svg = $('#map svg').outerHTML;
    $('#minimap').innerHTML = '<div class="mini-row">' + mapBoxes.map(function (b, i) {
      return '<div class="mini-panel" data-mini="' + i + '">' + panelSvg(svg, b, 'n' + i) + '</div>';
    }).join('') + '</div>';
    syncMini();
  }
  function syncMini() {
    var box = $('#minimap'), map = $('#map svg'), stops = $('#stops');
    if (!map || !box.firstChild) return;
    var h = box.offsetHeight, show = MINI.matches && (mz.open && mz.one != null || map.getBoundingClientRect().bottom < MINI_TOP &&
      stops.getBoundingClientRect().bottom > MINI_TOP + h + 60);
    box.classList.toggle('on', show);
    if (!show) return;
    // the stay across the middle of the screen under the strip: the first whose bottom is under that line
    var line = (MINI_TOP + h + window.innerHeight) / 2, all = Array.prototype.slice.call(stops.querySelectorAll('.stop'));
    var at = all.filter(function (s) { return s.getBoundingClientRect().bottom > line; })[0] || all[all.length - 1], key = at ? at.getAttribute('data-pin') : null;
    box.querySelectorAll('.pin').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pin') === key); });
    box.querySelectorAll('.mini-panel').forEach(function (d) {
      // a copy holds every panel (one group each, renderMap), shown through its viewBox: the panel's own group
      var g = d.querySelectorAll('svg > g')[+d.getAttribute('data-mini')];
      d.classList.toggle('lit', !!(g && g.querySelector('.pin.on')));
    });
    box.classList.toggle('any', !!key);
  }
  function bindMini() {
    window.addEventListener('scroll', function () { if (MINI.matches) syncMini(); }, { passive: true });
    window.addEventListener('resize', syncMini);
    $('#minimap').addEventListener('click', function (e) {
      var d = e.target.closest('.mini-panel');
      if (d) openMapZoom(false, +d.getAttribute('data-mini'));
    });
  }

  /* ---------- map zoom (desktop): the three panels grow out of the sidebar into a side-by-side view; on a phone one panel
     of the small map grows to the width of the screen (one: its index in mapBoxes) ---------- */
  var MZ_MS = 480;
  var mz = { open: false, busy: false, opener: null, kb: false, one: null };
  function mzWide() { return window.matchMedia('(min-width: 901px)').matches; }
  function mzBoxes(one) { return one == null ? mapBoxes : [mapBoxes[one]]; }
  // on-screen boxes of the panels inside the sidebar map (viewBox MAP_WIDTH + 12 wide, a margin of 6 all around), or of
  // the one panel of the small map
  function mzSource(one) {
    if (one != null) {
      var q = $('#minimap .mini-panel[data-mini="' + one + '"] svg').getBoundingClientRect();
      return [{ x: q.left, y: q.top, w: q.width, h: q.height }];
    }
    var r = $('#map svg').getBoundingClientRect(), k = r.width / (MAP_WIDTH + 12);
    return mapBoxes.map(function (b) { return { x: r.left, y: r.top + b.y * k, w: r.width, h: (b.h + 12) * k }; });
  }
  // the panels side by side, at one scale, as large as the window allows (one panel: 16 px from the sides on a phone)
  function mzTarget(one) {
    var boxes = mzBoxes(one), pad = one == null ? 28 : 16, gap = 24, top = 64, vw = MAP_WIDTH + 12, n = boxes.length;
    var tallest = Math.max.apply(null, boxes.map(function (b) { return b.h + 12; }));
    var f = Math.min((window.innerWidth - 2 * pad - gap * (n - 1)) / (n * vw), (window.innerHeight - top - pad) / tallest);
    var x0 = (window.innerWidth - (n * vw * f + gap * (n - 1))) / 2;
    return boxes.map(function (b, i) { return { x: x0 + i * (vw * f + gap), y: top, w: vw * f, h: (b.h + 12) * f }; });
  }
  function mzPlace(el, t, from) {
    el.style.left = t.x + 'px'; el.style.top = t.y + 'px'; el.style.width = t.w + 'px'; el.style.height = t.h + 'px';
    el.style.transform = from ? 'translate(' + (from.x - t.x) + 'px,' + (from.y - t.y) + 'px) scale(' + (from.w / t.w) + ')' : 'none';
  }

  function openMapZoom(kb, one) {
    one = one == null ? null : one;
    if (mz.open || mz.busy || (one == null && !mzWide())) return;
    finishDraw();   // the copies show the whole route
    var src = mzSource(one), dst = mzTarget(one), box = $('#mapzoom'), svg = $('#map svg').outerHTML;
    var panels = mzBoxes(one).map(function (b, i) {
      var d = document.createElement('div');
      d.className = 'mz-panel';
      d.innerHTML = panelSvg(svg, b, 'z' + (one == null ? i : one));
      return d;
    });
    mz.one = one;
    mz.hid = one == null ? $('#map') : $('#minimap .mini-panel[data-mini="' + one + '"]');
    box.querySelectorAll('.mz-panel').forEach(function (n) { n.remove(); });
    panels.forEach(function (d, i) { box.appendChild(d); mzPlace(d, dst[i], src[i]); });
    mz.open = mz.busy = true;
    mz.opener = document.activeElement;
    mz.kb = !!kb;
    box.hidden = false;
    document.body.classList.add('mz-open');
    mz.hid.classList.add('mz-hide');
    void box.offsetWidth;
    box.classList.add('on');
    panels.forEach(function (d, i) { mzPlace(d, dst[i]); });
    $('#mz-close').focus({ preventScroll: true });
    setTimeout(function () { mz.busy = false; }, MZ_MS);
  }
  function closeMapZoom() {
    if (!mz.open || mz.busy) return;
    var box = $('#mapzoom'), src = mzSource(mz.one), dst = mzTarget(mz.one);
    mz.busy = true;
    box.classList.remove('on');
    box.querySelectorAll('.mz-panel').forEach(function (d, i) { mzPlace(d, dst[i], src[i]); });
    setTimeout(function () {
      box.hidden = true;
      box.querySelectorAll('.mz-panel').forEach(function (n) { n.remove(); });
      mz.hid.classList.remove('mz-hide');
      document.body.classList.remove('mz-open');
      mz.open = mz.busy = false;
      mz.one = null;
      syncMini();
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
      if (mz.one == null ? !mzWide() : !MINI.matches) { closeMapZoom(); return; }
      var dst = mzTarget(mz.one);
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
     can put the place on the trip, with what would leave the trip for it. Each place is a folded row (fix 1 of the first
     round of fixes): its first photo small, its dot, its short name and its sentence „what it is and where” in the row;
     when open, the photo (all the place's photos on full screen), the full name with the usual stay, the line under the
     name, why it is not on the trip, what would leave it and Dodaj; the place on the map of the country by the list
     (renderBigMap). */
  function offReason(r, x) {
    if (r === 'level') return T('off.r.level', { lvl: T('lvl.' + PLACES[x.id].level) });
    if (r === 'season') return T('off.r.season', { why: x.why.map(function (w) { return T('wx.' + w); }).join(', ') });
    if (r === 'beaten') return T('off.r.beaten', { days: state.st.days });
    return T('off.r.' + r);
  }
  function renderOffRoute() {
    var s = state.settings;
    $('#offroute-list').innerHTML = whyOff(state.route, s, state.st, DATA, CLIMATE).map(function (x) {
      var c = C(x.id), n = PLACES[x.id].nights[1];
      return '<li><details data-fold="off-' + x.id + '"><summary class="off-row"><span class="off-thumb">' + img(c.photos[0], '', '64px') + '</span>' +
        '<span class="off-head"><span class="off-name"><span class="dot" style="--c:' + stopColor(x.id) + '"></span><b>' + esc(c.short) + '</b>' +
        (x.added ? ' <span class="off-tag">' + T('off.missing') + '</span>' : '') + '</span><span class="off-what">' + esc(c.what) + '</span></span>' + ICON.fold + '</summary>' +
        '<div class="off-more"><button type="button" class="off-photo" data-photos="' + x.id + '" aria-label="' + esc(T('g.open', { i: 1, n: c.photos.length })) + '">' +
        img(c.photos[0], '', '(max-width: 640px) calc(100vw - 58px), 220px') + ICON.expand + '</button>' +
        '<div class="off-text"><p class="off-stay"><b>' + esc(c.name) + '</b> · ' + esc(T('off.usual', { n: n, nights: countWord('nights', n) })) + '</p>' +
        '<p class="off-sub">' + esc(c.sub) + '</p>' +
        '<p class="off-why">' + esc(capFirst(x.reasons.map(function (r) { return offReason(r, x); }).join('; '))) + '.</p>' +
        (x.canAdd ? '<p class="off-drops">' + esc(x.drops.length ? T('off.drops', { list: names(x.drops) })
          : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops')) + '</p>' : '') +
        (x.canAdd ? '<button type="button" class="btn-small" data-add="' + x.id + '" aria-label="' + esc(T('off.add.aria', { x: c.short })) + '">' + T('off.add') + '</button>' : '') + '</div>' +
        '</div></details></li>';
    }).join('');
    $('#reset-changes').hidden = !(s.add.length || s.remove.length);
    renderBigMap();
  }
  /* The map of the country by the list (countryMapAll in page.js; the next round of fixes, fix 1): the outline, the trip as
     on the map of the trip, its stays as points and every place of the list as a dot with its name, which shows when the
     dot is lit (lightBig); on a phone the name stands beside the map (.bm-name). Hidden from a screen reader, which has the
     same in the list. */
  function renderBigMap() {
    var ids = Array.prototype.map.call(document.querySelectorAll('#offroute-list details'), offId);
    if (!ids.length) { $('#off-big').innerHTML = ''; return; }
    var m = countryMapAll(state.route, ids, { frame: COUNTRY_MAP, content: VIEW, airports: AIRPORTS });
    $('#off-big').innerHTML = '<svg viewBox="0 0 ' + m.w + ' ' + m.h + '"><path class="bm-land" d="' + OUTLINE + '"/>' + m.segs.map(function (g) {
      return g.mode === 'fly' ? '<path class="bm-fly" d="' + curve([g.x1, g.y1], [g.x2, g.y2]) + '"/>'
        : '<line class="bm-road" x1="' + r1(g.x1) + '" y1="' + r1(g.y1) + '" x2="' + r1(g.x2) + '" y2="' + r1(g.y2) + '"/>';
    }).join('') + m.stays.map(function (p) { return '<circle class="bm-stay" cx="' + r1(p.x) + '" cy="' + r1(p.y) + '" r="3"/>'; }).join('') +
      m.dots.map(function (d) {
        var at = 'cx="' + r1(d.x) + '" cy="' + r1(d.y) + '"';
        return '<g class="bm-pt" data-off="' + d.id + '" style="--c:' + stopColor(d.id) + '"><circle class="bm-halo" ' + at + ' r="9"/><circle class="bm-dot" ' + at + ' r="6"/>' +
          '<text x="' + r1(d.x + (d.left ? -BIG_NAME_GAP : BIG_NAME_GAP)) + '" y="' + r1(d.y + 5) + '" text-anchor="' + (d.left ? 'end' : 'start') + '">' + esc(C(d.id).short) + '</text>' +
          '<circle class="bm-hit" ' + at + ' r="12"/></g>';
      }).join('') + '</svg><p class="bm-name"></p>';
    lightBig(null);
  }
  function offId(d) { return d.getAttribute('data-fold').replace(/^off-/, ''); }
  /* Lights a place on the map and frames its row; null: on a phone (the band, below 1101 px) the row across the middle of
     the screen under the band (scrollRow), else the open row last opened, or the first open one, or none. */
  var lastOpenOff = null, BAND = window.matchMedia('(max-width: 1100px)');
  function lightBig(id) {
    if (!id && BAND.matches) id = scrollRow();
    if (!id) {
      var open = Array.prototype.map.call(document.querySelectorAll('#offroute-list details[open]'), offId);
      id = open.indexOf(lastOpenOff) >= 0 ? lastOpenOff : open[0] || null;
    }
    Array.prototype.forEach.call(document.querySelectorAll('#off-big .bm-pt'), function (g) { g.classList.toggle('on', g.getAttribute('data-off') === id); });
    Array.prototype.forEach.call(document.querySelectorAll('#offroute-list details'), function (d) { d.parentNode.classList.toggle('lit', offId(d) === id); });
    $('#off-big').classList.toggle('any', !!id);
    var name = $('#off-big .bm-name');
    if (name) name.innerHTML = id ? '<span class="dot" style="--c:' + stopColor(id) + '"></span>' + esc(C(id).short) : '';
  }
  /* The line a row lights on in the band's mode: the middle of the screen under the band (under the bar at the top on a
     wide screen); scrollRow: the row across it, the first row while the list is under the line, the last once it is above. */
  function middleLine() {
    var band = $('#off-big').getBoundingClientRect();
    return BAND.matches ? (Math.max(band.bottom, 0) + window.innerHeight) / 2 : window.innerHeight / 2;
  }
  function scrollRow() {
    var rows = Array.prototype.slice.call(document.querySelectorAll('#offroute-list > li'));
    if (!rows.length) return null;
    var line = middleLine(), at = rows.filter(function (li) { return li.getBoundingClientRect().bottom > line; })[0] || rows[rows.length - 1];
    return offId(at.querySelector('details'));
  }
  /* The mouse over a row or a dot, or the keyboard on a row, lights its place; out of the list and the map, the open row's
     place stays lit. A click on a dot opens its row and brings it to the middle of the screen. */
  function bindBigMap() {
    function placeAt(el) {
      var g = el.closest('#off-big .bm-pt');
      if (g) return g.getAttribute('data-off');
      var li = el.closest('#offroute-list > li');
      return li ? offId(li.querySelector('details')) : null;
    }
    // a browser sends scroll at most once a frame, and lightBig reads the boxes of the 11–14 rows only
    var split = $('.off-split');
    window.addEventListener('scroll', function () { if (BAND.matches) lightBig(null); }, { passive: true });
    BAND.addEventListener('change', function () { lightBig(null); });
    split.addEventListener('mouseover', function (e) { var id = placeAt(e.target); if (id) lightBig(id); });
    split.addEventListener('mouseleave', function () { lightBig(null); });
    split.addEventListener('focusin', function (e) { var id = placeAt(e.target); if (id) lightBig(id); });
    split.addEventListener('toggle', function (e) {
      if (e.target.open && e.target.matches('#offroute-list details')) lastOpenOff = offId(e.target);
    }, true);
    $('#off-big').addEventListener('click', function (e) {
      var g = e.target.closest('.bm-pt'), d = g && document.querySelector('#offroute-list details[data-fold="off-' + g.getAttribute('data-off') + '"]');
      if (!d) return;
      d.open = true;
      lastOpenOff = offId(d);
      var r = d.parentNode.getBoundingClientRect();
      window.scrollBy(0, (r.top + r.bottom) / 2 - middleLine());
      lightBig(lastOpenOff);
    });
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
    bindBigMap();
    // the photo of a place off the trip: all its photos on full screen, with their authors and licences
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.off-photo') : null;
      if (b) openLightbox(C(b.getAttribute('data-photos')).photos, 0, b);
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-add], [data-remove], #reset-changes') : null;
      if (!b) return;
      // the changes build on the form as it stands, so a choice in it that gave no trip yet is not lost
      var added = b.hasAttribute('data-add') ? b.getAttribute('data-add') : null, before = state.route.stops, base = readForm();
      var s = b.id === 'reset-changes' ? withoutChanges(base)
        : added ? withAdded(base, added)
        : withRemoved(base, b.getAttribute('data-remove'));
      byHand = e.isTrusted;
      var ok = apply(s);
      byHand = false;
      if (ok) {
        syncForm();
        if (added) reportAdd(added, before);
        $('#shape-h2').focus({ preventScroll: true });   // the button is gone with the old trip; the trip's heading takes the focus
      } else {
        $('#missing').textContent = $('#settings-msg').textContent;   // the message also next to the buttons that caused it
      }
    });
  }

  /* ---------- before the trip: the budget, what to book (bookList), what is worth knowing (ENTRY), what to pack (packList) ---------- */
  /* A part of „Przed wyjazdem” as a folded part (finding 7 of fix 3): its heading and one sentence (gist) in the summary, with
     what stays in sight under the sentence (the warning of Tết at the bookings, finding 8); the rest (body) when open. */
  function beforeFold(key, h3, gist, body) {
    return '<details data-fold="' + key + '"><summary class="b-head"><span class="b-title"><h3>' + h3 + '</h3>' + gist + '</span>' + ICON.fold + '</summary>' +
      '<div class="b-more">' + body + '</div></details>';
  }
  // what to book, by its name, for the sentence of its part: the flights, a car from an airport, the transfers, the hosts and
  // the stays in the parks by their own words; anything else by its first thing (its cost key)
  var BOOK_NAMES = { airport: 'bn.airport', transfer: 'bn.transfer', homestay: 'bn.homestay', 'cucphuong.stay': 'bn.cucphuong', 'yokdon.stay': 'bn.yokdon' };
  function bookName(e) { return BOOK_NAMES[e.key] ? T(BOOK_NAMES[e.key]) : T('cost.' + (e.key === 'flights' ? 'flights' : e.items[0])); }
  function linksOf(list) { return list.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(named(LINK_NAMES_EN, l.name)) + '</a>'; }).join(' · '); }
  function placesOf(ids) { return andList(ids.map(function (id) { return C(id).short; })); }
  function renderBefore() {
    var b = state.budget, r = state.route, st = state.st, moto = state.settings.moto;
    var hits = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS).hits, tet = hits.some(function (h) { return h.kind === 'tet'; });
    var holidays = hits.filter(function (h) { return h.kind === 'holiday'; }).map(function (h) { return named(HOLIDAY_NAMES_EN, h.name); });
    var top = b.items.slice(0, 3).map(function (x) { return T('bud.item', { name: T('cost.' + x.key), x: vnd(x.two) }); });
    // with the costs hidden (fix 2) the budget says so and offers to show them, without folding, and is not printed (b-off)
    $('#b-budget').classList.toggle('b-off', !costs);
    $('#b-budget').innerHTML = !costs ? '<h3>' + T('bud.h3') + '</h3><p>' + esc(T('bud.off')) + '</p><button type="button" class="btn-ghost costs-show" id="costs-show">' + T('set.costs') + '</button>'
      : beforeFold('b-budget', T('bud.h3'), '<span class="b-sum"><b>' + vnd(b.two, true) + '</b> ' + esc(T('bud.two')) + '</span>',
      '<p>' + esc(T('bud.one', { x: vnd(b.one, true) })) + '</p>' +
      '<ul class="b-parts">' + ['nights', 'day', 'travel', 'trips'].map(function (k) {
        return '<li><span>' + T('bud.' + k) + '</span><span class="mono">' + vnd(b.parts[k].two) + '</span></li>';
      }).join('') + '</ul>' +
      (top.length ? '<p>' + esc(T('bud.top', { x: andList(top) })) + '</p>' : '') +
      (tet ? '<p class="b-warn">' + esc(T('bud.tet')) + '</p>' : holidays.length ? '<p class="b-warn">' + esc(T(holidays.length > 1 ? 'bud.holidays' : 'bud.holiday', { x: andList(holidays) })) + '</p>' : '') +
      '<p class="b-note">' + esc(T('bud.note', { month: T('monl.' + +COSTS_CHECKED.slice(5, 7)), year: COSTS_CHECKED.slice(0, 4) })) + '</p>');
    var books = bookList(r, state.plans, moto, BOOK_DATA), warn = tet ? '<span class="b-warn">' + esc(T('book.tet')) + '</span>' : '';
    // how many things and the most urgent; a trip with nothing to book ahead says so, without folding
    var gist = books.length > 1 ? T('book.gist', { n: books.length, things: countWord('things', books.length), x: bookName(books[0]) })
      : books.length ? T('book.gist1', { x: bookName(books[0]) }) : '';
    $('#b-book').innerHTML = !books.length ? '<h3>' + T('book.h3') + '</h3>' + warn + '<p>' + esc(T('book.none')) + '</p>'
      : beforeFold('b-book', T('book.h3'), '<span class="b-gist">' + esc(gist) + '</span>' + warn, '<p class="b-note">' + T('book.p') + (costs ? ' ' + T('book.amounts') : '') + '</p>' +
      '<ol class="b-book">' + books.map(function (e) {
        // what the line is about: the flights, the roads from airports (both ways said so), the hosts' places, the things
        // booked under the key (a park's services); a place with a peak of its own for its hosts adds its sentence
        var x = e.key === 'flights' ? e.list.map(function (f) { return AIRPORTS[f[0]].name + ' → ' + AIRPORTS[f[1]].name; }).join(', ')
          : e.key === 'airport' ? andList(e.list.map(function (a) { return AIRPORTS[a[0]].name + ' – ' + C(a[1]).short + (a[2] > 1 ? ' ' + T('book.both') : ''); }))
          : e.key === 'homestay' ? placesOf(e.list) : capFirst(andList(e.items.map(function (k) { return T('cost.' + k); })));
        var more = e.key === 'homestay' ? e.list.filter(function (id) { return HOMESTAY_NOTES.indexOf(id) > -1; }).map(function (id) { return ' ' + T('b.homestay.' + id); }).join('') : '';
        // a thing that may cost nothing says its dearer end without „ok.”: „do 2,2 mln VND na osobę”
        var meta = [costs && e.two ? esc(T(e.two[0] > 0 ? 'book.cost' : 'book.upto', { x: vnd(e.two) })) : '', linksOf(e.links)].filter(Boolean);
        return '<li><p>' + esc(T('b.' + e.key, { x: x }) + more) + '</p>' + (meta.length ? '<p class="b-meta">' + meta.join(' · ') + '</p>' : '') + '</li>';
      }).join('') + '</ol>');
    // what is worth knowing (decision of 15.10.2026): the visa as a question for one's own passport, the e-visa and the
    // arrival card on the government's sites (the links of ENTRY), the ban on e-cigarettes
    $('#b-know').innerHTML = beforeFold('b-know', T('know.h3'), '<span class="b-gist">' + esc(T('know.gist')) + '</span>',
      '<ul class="b-list"><li>' + esc(T('know.visa')) + '</li><li>' + esc(T('know.vape')) + '</li></ul><p class="b-meta">' + esc(T('know.links')) + linksOf(ENTRY.links) + '</p>');
    var pack = packList(r, state.plans, st, moto, PACK_DATA);
    $('#b-pack').innerHTML = beforeFold('b-pack', T('pack.h3'), '<span class="b-gist">' + esc(T('pack.gist', { n: pack.length, things: countWord('things', pack.length) })) + '</span>',
      '<ul class="b-list">' + pack.map(function (p) { return '<li>' + esc(T('p.' + p.code, { x: placesOf(p.places), t: p.t })) + '</li>'; }).join('') + '</ul>');
  }

  /* ---------- the estimated costs (fix 2 of the first round of fixes, 16.10.2026) ---------- */
  /* Shown or hidden by the box of the form or by „Pokaż szacowane koszty” in „Przed wyjazdem”: only the amounts come or go
     (the figure of the budget, the budget part, the amounts of what to book), and the address gains or loses koszty=1; the
     trip is not planned again, the page does not move, the history gets no entry, and „Wróć do trasy bez zmian” does not
     count it as a change of the trip. */
  function setCosts(on) {
    var keep = openFolds(), h;
    costs = on;
    F.costs.checked = on;
    renderFacts();
    renderBefore();
    renderPrintLink();
    tieShortWords($('#shape'));
    tieShortWords($('#before'));
    reopenFolds(keep);
    h = pageHash(state.settings, lang, costs);
    try { history.replaceState(null, '', h); } catch (e) { location.replace(h); }
  }
  // „Pokaż szacowane koszty” in „Przed wyjazdem” is the same switch; the focus goes to the budget part it brings
  function bindCosts() {
    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('#costs-show')) return;
      setCosts(true);
      $('#b-budget summary').focus();
    });
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

  /* ---------- folded parts (the first round of fixes, fix 3, 16.10.2026) ---------- */
  // the trip whose days and journeys the folded rows show (tripKey in page.js)
  var foldTrip = '';
  // the keys (data-fold) of the folded parts that are open
  function openFolds() { return Array.prototype.map.call(document.querySelectorAll('details[data-fold][open]'), function (d) { return d.getAttribute('data-fold'); }); }
  function reopenFolds(keys) { keys.forEach(function (k) { var d = document.querySelector('details[data-fold="' + k + '"]'); if (d) d.open = true; }); }
  // an element a link leads to, in sight: its own folded part (a day's row) and every folded part around it open
  function reveal(el) {
    var d = el.querySelector(':scope > details');
    if (d) d.open = true;
    for (d = el.closest('details'); d; d = d.parentElement.closest('details')) d.open = true;
  }
  // the days and journeys of „Dzień po dniu”; „Rozwiń wszystkie dni” opens them all, and when all are open the button
  // closes them (finding 4 of fix 3)
  function dayFolds() { return Array.prototype.slice.call(document.querySelectorAll('#stops details[data-fold]')); }
  function syncDaysAll() {
    $('#days-all').textContent = T(dayFolds().every(function (d) { return d.open; }) ? 'days.close' : 'days.open');
  }
  function bindFolds() {
    $('#days-all').addEventListener('click', function () {
      var open = !dayFolds().every(function (d) { return d.open; });
      dayFolds().forEach(function (d) { d.open = open; });
      syncDaysAll();
    });
    // a row opened or closed by hand: the button follows (toggle does not bubble, so it is caught on its way down)
    $('#stops').addEventListener('toggle', syncDaysAll, true);
    // the printout shows everything (finding 11 of fix 3): every folded part opens before printing, and those that were
    // closed close again after it
    var closed = [];
    window.addEventListener('beforeprint', function () {
      closed = Array.prototype.filter.call(document.querySelectorAll('details:not([open])'), function (d) { d.open = true; return true; });
    });
    window.addEventListener('afterprint', function () { closed.forEach(function (d) { d.open = false; }); closed = []; });
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
    if (costs) lines.push(T('pt.budget', { x: vnd(state.budget.two, true) }));
    lines.push(T('pt.link') + SITE_URL + pageHash(state.settings, lang, costs));
    return lines.join('\n');
  }
  // the button under the figures of the trip and the one at the end of the page (finishing touches, finding 9), each with
  // its own line for the result and its own box for the text when the clipboard says no
  function bindCopy() {
    [['#copy-plan', '#copy-status', '#copy-fallback'], ['#end-copy', '#end-status', '#end-fallback']].forEach(function (x) {
      var btn = $(x[0]), status = $(x[1]), box = $(x[2]);
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

  // the multi-word names a line may not break inside: the short names of the places in both languages, the names of the
  // airports and the names without a Vietnamese letter that the texts use (KEEP_TOGETHER in content.js)
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(CONTENT_EN).map(function (id) { return CONTENT_EN[id].short; }), Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
    .filter(function (n, i, all) { return n.indexOf(' ') > -1 && all.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  // a text with the no-break spaces of the language's typography (tieShort, tieEnglish) and of the names (tieVietnamese,
  // tieNames), all in page.js
  function tied(text) { return tieNames(tieVietnamese(lang === 'pl' ? tieShort(text) : tieEnglish(text)), TIED_NAMES); }
  // every text in root, tied as above
  function tieShortWords(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), node;
    while ((node = walker.nextNode())) {
      if (/^(SCRIPT|STYLE|TEXTAREA)$/i.test(node.parentNode.nodeName)) continue;
      var t = tied(node.nodeValue);
      if (t !== node.nodeValue) node.nodeValue = t;
    }
  }

  /* The bar at the top sums up the settings once the settings, folded or whole, have gone up off the screen (class away on
     the bar). */
  function bindSummary() {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      $('#secnav').classList.toggle('away', !es[0].isIntersecting && es[0].boundingClientRect.bottom < 0);
    }).observe($('#settings'));
  }

  /* ---------- the finishing touches (notes/plans/2026-10-20-wykonczenia-projekt.md) ---------- */
  /* The page moves only where the browser runs IntersectionObserver: its first call marks <html> live (template.html: the
     slow zoom of the photo at the top, the photos coming in). */
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { document.documentElement.classList.add('live'); o.disconnect(); }).observe($('.hero'));
  /* A photo loaded late comes in softly (finding 6): till it has loaded, its frame shows the photo's mean colour (data-ph,
     from build.py) and the photo waits unseen; once loaded (or failed), class in, and the frame drops the colour. */
  function shown(im) { im.classList.add('in'); im.parentNode.style.backgroundColor = ''; }
  function paintFrames() {
    document.querySelectorAll('img.ph:not(.in)').forEach(function (im) { if (im.complete) shown(im); else im.parentNode.style.backgroundColor = im.getAttribute('data-ph'); });
  }
  ['load', 'error'].forEach(function (k) {
    document.addEventListener(k, function (e) { if (e.target.classList && e.target.classList.contains('ph')) shown(e.target); }, true);
  });

  /* The bar at the top over the days (finding 8): while the days go by, the summary of the settings gives way to the day
     across the middle of the screen under the bar (and under the small map on a phone): its place's dot and "Dzień 6 · Hội
     An"; over a stay's heading and photos its first day, over a journey "Dzień 3 · Hồ Chí Minh City → Đà Lạt"; over and
     under the days the summary again. On every scroll, as the small map (syncMini), so the probes can see it. */
  function syncDay() {
    var bar = $('#secnav'), mini = $('#minimap'), day = $('#sum-day'), at = null;
    var line = (bar.getBoundingClientRect().bottom + (mini.classList.contains('on') ? mini.offsetHeight : 0) + window.innerHeight) / 2;
    document.querySelectorAll('#stops .leg, #stops .stop, #stops .day').forEach(function (el) { if (el.getBoundingClientRect().top <= line) at = el; });
    var on = !!at && $('#stops').getBoundingClientRect().bottom > line;
    bar.classList.toggle('in-days', on);
    if (!on) return;
    var text, c = '';
    if (at.classList.contains('leg')) {
      text = at.querySelector('.leg-day').textContent + ' · ' + at.querySelector('.leg-route').textContent;
      c = at.nextElementSibling ? at.nextElementSibling.style.getPropertyValue('--c') : '';
    } else {
      var stop = at.closest('.stop'), first = at.classList.contains('day') ? at : stop.querySelector('.day');
      text = T('day') + ' ' + first.id.slice(4) + ' · ' + stop.getAttribute('data-short');
      c = stop.style.getPropertyValue('--c');
    }
    text = text.replace(/\s+/g, ' ');
    if (day.getAttribute('data-text') === text) return;
    day.setAttribute('data-text', text);
    day.innerHTML = (c ? '<span class="dot" style="--c:' + c + '"></span>' : '') + esc(text);
    if (touched && moving()) day.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });   // one day to the next
  }
  window.addEventListener('scroll', syncDay, { passive: true });
  window.addEventListener('resize', syncDay);

  /* ---------- the motion of a new trip (finishing touches, findings 1–3) ---------- */
  /* Only the visitor's own doing moves the page: a change of the trip by hand (byHand: the form's change event or the click
     of Dodaj, Usuń or the reset was isTrusted), and what first comes on the screen after the visitor has touched, scrolled
     with the wheel or pressed a key (touched). A script, as the probes, swaps the trip at once and scrolls without motion,
     so what a probe reads is the final state. Never with reduced motion. */
  var byHand = false, touched = false, SVG_NS = 'http://www.w3.org/2000/svg', STILL = window.matchMedia('(prefers-reduced-motion: reduce)');
  ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(function (k) {
    window.addEventListener(k, function (e) { if (e.isTrusted) touched = true; }, { capture: true, passive: true });
  });
  function moving() { return !STILL.matches && !!Element.prototype.animate; }
  function onScreen(el) { var b = el.getBoundingClientRect(); return b.bottom > 0 && b.top < window.innerHeight; }

  /* The route draws itself (finding 1): on the page's first trip once the visitor has scrolled the map about half onto the
     screen, and on a trip the visitor changed (draw) as soon as about half the map is on it (at once, or when it comes);
     till then, once its first edge shows, the route waits unseen (m-wait), so it never vanishes in sight. The same trip
     drawn again (the costs, EN · PL) stands still. Each leg of the trip (data-leg on its lines, stubs and pins, mapLayout) in its share of about 2 s: a road
     drawn along its length, a flight's dashes uncovered by a drawn mask, a stub's arrow and a stay's pin as their leg
     ends. The copies of the map (the small map, the printout) are made before it starts; the zoom and the printout finish it
     at once (finishDraw). */
  var DRAW_MS = 2000, drawnTrip = null, drawIO = null, drawEnd = null, drawing = [], drawOk = false;
  function drawRoute(trip, draw) {
    var svg = $('#map svg');
    if (trip === drawnTrip && drawIO) { drawIO.disconnect(); drawIO.observe(svg); return; }   // a new map of the same trip
    if (trip === drawnTrip) return;
    drawnTrip = trip;
    finishDraw();
    if (!draw || !moving() || !('IntersectionObserver' in window)) return;
    drawOk = byHand;
    drawIO = new IntersectionObserver(function (es) {
      var e = es[es.length - 1];
      if (!touched && !drawOk) return;
      if (e.intersectionRatio < drawNeed()) { $('#map').classList.add('m-wait'); return; }
      drawIO.disconnect(); drawIO = null;
      startDraw(e.target);
    }, { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45] });
    drawIO.observe(svg);
  }
  // the share of the map on the screen that starts the drawing: about half, or less where the map is taller than the
  // window (a phone turned sideways shows at most 40% of it), so the route never waits unseen for good
  function drawNeed() { var h = $('#map svg').getBoundingClientRect().height; return Math.min(0.45, 0.8 * window.innerHeight / (h || 1)); }
  function startDraw(svg) {
    $('#map').classList.remove('m-wait');
    if (!svg.isConnected) return;
    var slot = DRAW_MS / (state.route.stops.length + 1), defs = svg.querySelector('defs'), n = 0;
    svg.querySelectorAll('[data-leg]').forEach(function (el) {
      var k = +el.getAttribute('data-leg');
      if (el.classList.contains('pin')) {
        drawing.push(el.animate([{ opacity: 0, transform: 'scale(0.3)' }, { opacity: 1, transform: 'none' }], { delay: (k + 0.85) * slot, duration: 280, easing: 'cubic-bezier(.2,.8,.2,1.2)', fill: 'backwards' }));
        return;
      }
      if (el.classList.contains('m-arrow')) { drawing.push(el.animate([{ opacity: 0 }, { opacity: 1 }], { delay: (k + 0.9) * slot, duration: 120, fill: 'backwards' })); return; }
      var len = el.getTotalLength(), line = el;
      if (el.classList.contains('m-fly')) {
        var m = document.createElementNS(SVG_NS, 'mask'), id = 'draw-' + (n++);
        m.id = id;
        [['maskUnits', 'userSpaceOnUse'], ['x', -2000], ['y', -2000], ['width', 6000], ['height', 6000]].forEach(function (x) { m.setAttribute(x[0], x[1]); });
        line = el.cloneNode(false);
        ['class', 'data-leg'].forEach(function (x) { line.removeAttribute(x); });
        [['fill', 'none'], ['stroke', '#fff'], ['stroke-width', 8]].forEach(function (x) { line.setAttribute(x[0], x[1]); });
        m.appendChild(line); defs.appendChild(m);
        el.setAttribute('mask', 'url(#' + id + ')');
      }
      drawing.push(line.animate([{ strokeDasharray: len + ' ' + len, strokeDashoffset: len }, { strokeDasharray: len + ' ' + len, strokeDashoffset: 0 }],
        { delay: k * slot, duration: slot, easing: 'ease-in-out', fill: 'backwards' }));
    });
    drawEnd = setTimeout(finishDraw, DRAW_MS + 400);
  }
  function finishDraw() {
    clearTimeout(drawEnd);
    if (drawIO) { drawIO.disconnect(); drawIO = null; }
    $('#map').classList.remove('m-wait');
    drawing.forEach(function (x) { x.finish(); });
    drawing = [];
    var svg = $('#map svg');
    if (!svg) return;
    svg.querySelectorAll('mask[id^="draw-"]').forEach(function (x) { x.remove(); });
    svg.querySelectorAll('[mask^="url(#draw-"]').forEach(function (x) { x.removeAttribute('mask'); });
  }
  window.addEventListener('beforeprint', finishDraw);

  /* A new trip comes in softly (finding 2): the squares of the strip in a wave, day by day, the list of the places off the
     trip, the days and „Przed wyjazdem” fading up. Not the View Transitions API: it swaps the page in a later frame, and the
     page (syncForm, reportAdd) and the probes read the new trip right after apply. */
  function wave() {
    $('#strip').querySelectorAll('.cell').forEach(function (c, i) {
      c.animate([{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: i * 18, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
  }
  function rebuilt() {
    if (!moving()) return;
    wave();
    ['#strip-legend', '#offroute-list', '#stops', '#before .before'].forEach(function (s) {
      $(s).animate([{ opacity: 0.25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'ease-out' });
    });
  }

  /* The figures of the trip count up (finding 3): from 0 the first time they come on the screen after the visitor's touch
     (not when the page opens with them in sight), from the last trip's after the visitor's change; whole numbers only (not
     8½ nor the budget), about 0.8 s, the final text at the end also where the browser holds back its frames. */
  function figures() { return Array.prototype.map.call(document.querySelectorAll('#facts li > b'), function (b) { return b.firstChild ? +b.firstChild.nodeValue : NaN; }); }
  function countUp(from) {
    if (!moving()) return;
    document.querySelectorAll('#facts li > b').forEach(function (b, i) {
      var node = b.firstChild, to = node && node.nodeType === 3 ? +node.nodeValue : NaN, a = from ? from[i] : 0;
      if (!(to >= 0) || Math.round(to) !== to || !(a >= 0) || a === to) return;
      var t0 = performance.now(), end = setTimeout(function () { k = 1; node.nodeValue = String(to); }, 850), k = 0;
      (function step() {
        if (k >= 1) return;
        k = Math.min(1, (performance.now() - t0) / 800);
        node.nodeValue = String(Math.round(a + (to - a) * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step); else clearTimeout(end);
      })();
    });
  }
  // the first time on the screen after the visitor's touch: the figures and the strip
  [['#facts', function () { countUp(null); }], ['#strip', function () { if (moving()) wave(); }]].forEach(function (x) {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es, o) {
      if (!es[0].isIntersecting) return;
      o.disconnect();
      if (touched) x[1]();
    }, { threshold: 0.4 }).observe($(x[0]));
  });

  /* ---------- the footer and the texts in the template ---------- */
  function renderCredits() {
    var used = {};
    used[HERO_PHOTO] = true;
    Object.keys(CONTENT).forEach(function (id) { CONTENT[id].photos.forEach(function (ph) { used[ph] = true; }); });
    $('#ft-photos').innerHTML = '<h2>' + esc(T('ft.photos', { n: Object.keys(used).length })) + '</h2>' + ICON.fold;
    $('#credits').innerHTML = Object.keys(used).map(function (ph) {
      // the caption leads to the photo's page on Commons, the licence to its text
      var m = PHOTO_META[ph], lic = licenceUrl(m.license, lang);
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(caption(ph)) + '</a>: ' + esc(m.artist) + ', ' +
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

  /* ---------- the language (stage 5) ---------- */
  /* The page's language, 'en' or 'pl': the texts of the places, the words of the template and of the form, the credits and the
     switch EN · PL; the caller draws the trip again (apply). */
  function setLang(l) {
    lang = l;
    VIEW = localContent(CONTENT, lang === 'en' ? CONTENT_EN : null);
    applyStatic();
    if (F) labelForm();
    renderCredits();
    Array.prototype.forEach.call(document.querySelectorAll('#lang-switch [data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
  }
  /* EN · PL (decision 1 of 15.10.2026): the texts change at once, without a reload; the trip, its settings and its changes
     stay, and the address gains or loses lang=pl at its end (apply); the form shows the trip's settings again (syncForm). */
  function bindLang() {
    $('#lang-switch').addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]');
      if (!b || b.getAttribute('data-lang') === lang) return;
      setLang(b.getAttribute('data-lang'));
      apply(state.settings, state.linkWarn);
      syncForm();
    });
  }

  /* ---------- wiring ---------- */
  setLang(langOf(location.hash));   // the texts first, in the language of the link
  buildForm();
  bindLightbox();
  bindCopy();
  // „Zapisz trasę jako PDF”: the print dialog straight from the tap (Safari refuses a print it did not see asked for)
  $('#pdf-plan').addEventListener('click', function () { window.print(); });
  $('#end-pdf').addEventListener('click', function () { window.print(); });
  bindAnchors();
  bindMapZoom();
  bindMini();
  bindChanges();
  bindSwaps();
  bindSummary();
  bindLang();
  bindFolds();
  bindCosts();
  fromLink();
  /* back-to-top button: shown once the photo opener has scrolled away */
  var totop = $('#totop'), hero = $('.hero');
  if (totop && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { totop.hidden = es[0].isIntersecting; }).observe(hero);
  }
  /* for the probes in tests/probes/ */
  window.__trip = { state: state, apply: apply, today: TODAY, draw: function () { startDraw($('#map svg')); }, finishDraw: finishDraw,
    drawNeed: drawNeed, byHand: function (on) { byHand = on; } };
})();
