/* Atlas mockup (throwaway, brainstorming 22.10.2026): the 20 places of the pool, region by region, with the map beside them
   lighting the place across the middle of the screen, as on the wildlife subpage. Real texts (CONTENT), photos (PHOTO_META,
   web copies in ../img) and trips (engine.js, whyOff). The dashed box switches the variants. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function all(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
  var U = UI.pl, C = CONTENT;
  function T(k, vars) {
    var t = U[k];
    if (t == null) throw new Error('no text ' + k);
    return vars ? t.replace(/\{(\w+)\}/g, function (m, n) { return vars[n]; }) : t;
  }
  var TIED = Object.keys(C).map(function (id) { return C[id].short; }).concat(Object.keys(AIRPORTS).map(function (c) { return AIRPORTS[c].name; }), KEEP_TOGETHER)
    .filter(function (n, i, a) { return n.indexOf(' ') > -1 && a.indexOf(n) === i; }).sort(function (a, b) { return b.length - a.length; });
  function tied(t) { return tieNames(tieVietnamese(tieShort(t)), TIED); }
  function r1(v) { return v.toFixed(1); }

  var IDS = Object.keys(PLACES).filter(function (id) { return !PLACES[id].node; });
  var REG = ['north', 'centre', 'south'], REG_NAME = { north: 'Północ', centre: 'Środek', south: 'Południe' };
  var DEMO = 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2&lang=pl';
  var opt = { layout: 'a', map: 'country', order: 'ns', trip: hasTrip(location.hash) ? 'demo' : 'none' };
  function ordered() {
    var ids = IDS.slice().sort(function (a, b) { return PLACES[b].axis - PLACES[a].axis || (a < b ? -1 : 1); });
    return opt.order === 'ns' ? ids : ids.reverse();
  }
  function regions() { return opt.order === 'ns' ? REG : REG.slice().reverse(); }

  /* ---------- the trip from the address, as on the wildlife subpage ---------- */
  var TODAY = clampToday(new Date().toISOString().slice(0, 10), HOLIDAYS_FROM, PLAN_LAST_YEAR);
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var trip = null;
  function readTrip() {
    trip = null;
    if (!hasTrip(location.hash)) return;
    var defaults = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), defaults, PLACES, HUBS, bad, SWAPS), r = planRoute(got.st, DATA);
    if (!r.ok) return;
    var off = {};
    whyOff(r, got.settings, got.st, DATA, CLIMATE).forEach(function (x) { off[x.id] = x; });
    trip = { settings: got.settings, st: got.st, route: r, stays: tripStays(r, got.st, C, FERRY, selfSwaps(got.settings.moto, SWAPS).places), months: termMonths(got.st), off: off };
  }
  function names(ids) { return ids.map(function (id) { return C[id].short; }).join(', '); }
  function dayRange(a, b) { return a === b ? 'dzień ' + a : 'dni ' + a + '–' + b; }
  function stayDays(id) { return trip.stays[id].map(function (s) { return dayRange(s.first, s.last); }).join(' i '); }
  function miejsc(n) { return n + (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? ' miejsca' : ' miejsc'); }
  function noce(n) { return n === 1 ? 'noc' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 'noce' : 'nocy'; }
  function reasonText(id, x) {
    return x.reasons.map(function (r) {
      if (r === 'beaten') return T('off.r.beaten', { days: trip.st.days });
      if (r === 'level') return T('off.r.level', { lvl: T('lvl.' + PLACES[id].level) });
      if (r === 'season') return 'poza sezonem';
      return U['off.r.' + r] || r;
    }).join(', ');
  }

  /* ---------- pieces of a place ---------- */
  function img(pid, sizes) {
    return '<img class="ph" src="../img/' + pid + '-960.jpg" srcset="../img/' + pid + '-480.jpg 480w, ../img/' + pid + '-960.jpg 960w, ../img/' + pid +
      '.jpg 1400w" sizes="' + sizes + '" alt="' + esc(PHOTO_META[pid].cap) + '" loading="lazy" decoding="async">';
  }
  function ph(pid, id, sizes, cls, extra) {
    return '<button type="button" class="a-ph' + (cls ? ' ' + cls : '') + '" data-view="' + pid + '" data-place="' + id + '" aria-label="Powiększ zdjęcie: ' +
      esc(PHOTO_META[pid].cap) + '">' + img(pid, sizes) + (extra || '') + '</button>';
  }
  var BIG = '(max-width: 1100px) 100vw, 780px';
  function capline(pid) { return '<span class="a-capline">' + esc(PHOTO_META[pid].cap) + '</span>'; }
  function ints(id) {
    var f = PLACES[id].fit, ks = Object.keys(f).filter(function (k) { return f[k] >= 2; }).sort(function (a, b) { return f[b] - f[a]; });
    return '<p class="a-ints">' + ks.map(function (k) { return '<span>' + esc(T('int.' + k)) + '</span>'; }).join('') + '</p>';
  }
  function head(id) {
    var c = C[id];
    return '<p class="a-regname">' + REG_NAME[c.region] + '</p><h3>' + esc(c.name) + '</h3><p class="a-sub">' + esc(tied(c.sub)) + '</p>' + ints(id) +
      (trip && trip.stays[id] ? '<p class="w-ok">✓ Na twojej trasie: ' + esc(stayDays(id)) + '.</p>' : '');
  }
  function season(id) {
    var code = SEASONS[id], tm = trip ? trip.months : [], h = '<p class="a-k">Kiedy jechać</p><div class="a-season">';
    for (var m = 1; m <= 12; m++) {
      var L = code.charAt(m - 1);
      h += '<span class="s' + L + (tm.indexOf(m) > -1 ? ' trip' : '') + '" title="' + esc(T('mon.' + m) + ': ' + (U['season.' + L] || L)) + '"><i></i>' + esc(T('mon3.' + m)) + '</span>';
    }
    return h + '</div>';
  }
  function todo(id) {
    var c = C[id], n = PLACES[id].nights, days = c.days.slice().sort(function (a, b) { return a.o - b.o; }), items = [], hard = [];
    days.forEach(function (d) { if (items.indexOf(d.t) < 0) items.push(d.t); if (d.hard && hard.indexOf(d.hard.t) < 0) hard.push(d.hard.t); });
    return '<p class="a-k">Co tu robić <small>· ' + n[0] + '–' + n[2] + ' ' + noce(n[2]) + ' na trasie</small></p><ul class="a-todo">' +
      items.map(function (t) { return '<li>' + esc(tied(t)) + '</li>'; }).join('') +
      hard.map(function (t) { return '<li class="hard">Ekstremalnie: ' + esc(tied(t)) + '</li>'; }).join('') + '</ul>';
  }
  function links(id) {
    var wild = WILD_GUIDE_PLACES.indexOf(id) > -1 ? '<a href="../wildlife/' + esc(wildHash({ tab: 'guide', place: id }, trip && trip.settings, 'pl', false)) + '">Zwierzęta tutaj →</a>' : '';
    var add = '';
    if (!trip) add = '<a class="btn-small" href="' + esc(tripLink(null, 'pl', false, id)) + '">Dodaj ' + esc(C[id].short) + ' do trasy</a>';
    else if (!trip.stays[id]) {
      var x = trip.off[id];
      if (!x || !x.canAdd) add = '<p class="w-muted">' + esc(C[id].short) + ' nie zmieści się w tej trasie' + (x ? ' (' + esc(reasonText(id, x)) + ')' : '') + '.</p>';
      else {
        var what = x.drops.length ? T('off.drops', { list: names(x.drops) }) : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops');
        add = '<div class="a-mark"><p class="w-muted">Nie ma na twojej trasie: ' + esc(reasonText(id, x)) + '.</p><p class="w-drops">' + esc(tied(what)) + '</p>' +
          '<a class="btn-small" href="' + esc(tripLink(trip.settings, 'pl', false, id)) + '">Dodaj ' + esc(C[id].short) + ' do trasy</a></div>';
      }
    }
    return add || wild ? '<div class="a-links">' + add + wild + '</div>' : '';
  }
  function inner(id, withHead) {
    var c = C[id];
    return (withHead ? head(id) : '') + '<p class="a-what">' + esc(tied(c.what)) + '</p>' + season(id) + todo(id) +
      (c.gem ? '<p class="a-gem"><b>' + esc(T('t.gem')) + ':</b> ' + esc(tied(c.gem)) + '</p>' : '') + links(id);
  }
  function style(id) { return ' id="pl-' + id + '" style="--c:var(--pal-' + C[id].color + ')"'; }

  /* ---------- the three layouts of a place ---------- */
  var LAYOUT = {
    // A: one big photo, the rest in a strip under it, then the texts (the card of the wildlife subpage)
    a: function (id) {
      var ps = C[id].photos;
      return '<article class="a-ch a-card"' + style(id) + '>' + ph(ps[0], id, BIG, 'a-big', capline(ps[0])) +
        '<div class="a-strip" style="grid-template-columns: repeat(' + (ps.length - 1) + ', minmax(0, 1fr))">' +
        ps.slice(1).map(function (p) { return ph(p, id, '(max-width: 640px) 25vw, 200px'); }).join('') + '</div><div class="a-body">' + inner(id, true) + '</div></article>';
    },
    // B: every photo big, one under another, with its caption; the texts after the first
    b: function (id) {
      var ps = C[id].photos;
      function shot(p) { return '<figure class="a-shot" style="margin:14px 0 0">' + ph(p, id, BIG) + '<figcaption class="a-cap">' + esc(PHOTO_META[p].cap) + '</figcaption></figure>'; }
      return '<article class="a-ch a-essay"' + style(id) + '><div class="a-head">' + head(id) + '</div>' + shot(ps[0]) + '<div class="a-body">' + inner(id, false) + '</div>' +
        ps.slice(1).map(shot).join('') + '</article>';
    },
    // C: a mosaic, one big photo and two beside it, +N on the last for the rest (the album)
    c: function (id) {
      var ps = C[id].photos, more = ps.length - 3;
      return '<article class="a-ch a-mosaic"' + style(id) + '><div class="a-grid">' + ph(ps[0], id, '(max-width: 640px) 100vw, 520px', '', capline(ps[0])) +
        ph(ps[1], id, '(max-width: 640px) 50vw, 260px') + ph(ps[2], id, '(max-width: 640px) 50vw, 260px', '', more > 0 ? '<span class="a-more">+' + more + '</span>' : '') +
        '</div><div class="a-body">' + inner(id, true) + '</div></article>';
    }
  };

  function renderPanels() {
    var ids = ordered(), h = '<div class="w-intro"><h2>Dwadzieścia miejsc Route G</h2><p>Z tych miejsc planer układa trasy. Przewijaj, a mapa pokaże, gdzie jesteś; zdjęcie otwiera album miejsca.</p>';
    if (trip) h += '<div class="w-tripbox"><b>Twoja trasa:</b> ' + esc(trip.st.start ? trip.st.start : T('term.month', { month: T('mon.' + trip.st.month), year: trip.st.year })) + ' · ' + trip.st.days + ' dni · ' +
      esc(T('lvl.' + trip.st.level)) + '<br><span class="w-muted">Miejsca: ' + esc(names(trip.route.stops.filter(function (s) { return C[s.id] && C[s.id].photos; }).map(function (s) { return s.id; }).filter(function (v, i, a) { return a.indexOf(v) === i; }))) + '.</span></div>';
    h += '<p class="a-legend" style="margin-top:12px">Pora roku:<i style="background:var(--accent)"></i>dobra<i style="background:#d9a03f"></i>średnia<i style="background:var(--wet);opacity:.55"></i>zła' + (trip ? ' · w ramce miesiąc twojej trasy' : '') + '</p></div>';
    regions().forEach(function (reg, k) {
      var mine = ids.filter(function (id) { return C[id].region === reg; });
      h += '<h2 class="a-region-h' + (k === 0 ? ' first' : '') + '" id="reg-' + reg + '" data-reg="' + reg + '">' + REG_NAME[reg] + ' <small>' + miejsc(mine.length) + '</small></h2>';
      h += mine.map(LAYOUT[opt.layout]).join('');
    });
    $('#a-panels').innerHTML = h;
    $('#a-regions').innerHTML = regions().map(function (reg) { return '<a href="#" data-go="' + reg + '">' + REG_NAME[reg] + '</a>'; }).join('');
    $('#w-back').href = tripLink(trip && trip.settings, 'pl', false, null);
    $('#w-back').textContent = trip ? '← Twoja trasa' : '← Zaplanuj trasę';
  }

  /* ---------- the map ---------- */
  var BAND = window.matchMedia('(max-width: 1100px)'), dots = [], mapW = 0, mapH = 0, litKey = null, mouse = null, zoomNow = null;
  function curve(a, b) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy) || 1, k = 0.16 * len;
    return 'M' + r1(a[0]) + ' ' + r1(a[1]) + ' Q' + r1(mx - dy / len * k) + ' ' + r1(my + dx / len * k) + ' ' + r1(b[0]) + ' ' + r1(b[1]);
  }
  function renderMap() {
    var m = countryMapAll(trip && trip.route, ordered(), { frame: COUNTRY_MAP, content: C, airports: AIRPORTS });
    dots = m.dots; mapW = m.w; mapH = m.h;
    $('#w-map').innerHTML = '<div class="a-mapbox"><svg viewBox="0 0 ' + m.w + ' ' + m.h + '"><path class="bm-land" d="' + OUTLINE + '"/>' + m.segs.map(function (g) {
      return g.mode === 'fly' ? '<path class="bm-fly" d="' + curve([g.x1, g.y1], [g.x2, g.y2]) + '"/>'
        : '<line class="bm-road" x1="' + r1(g.x1) + '" y1="' + r1(g.y1) + '" x2="' + r1(g.x2) + '" y2="' + r1(g.y2) + '"/>';
    }).join('') + m.stays.map(function (p) { return '<circle class="bm-stay" cx="' + r1(p.x) + '" cy="' + r1(p.y) + '" r="3"/>'; }).join('') +
      m.dots.map(function (d) {
        var at = 'cx="' + r1(d.x) + '" cy="' + r1(d.y) + '"';
        return '<g class="bm-pt' + (trip && !trip.stays[d.id] ? ' ring' : '') + '" data-p="' + d.id + '" style="--c:var(--pal-' + C[d.id].color + ')">' +
          '<circle class="bm-halo" ' + at + ' r="9"/><circle class="bm-dot" ' + at + ' r="6"/><text y="' + r1(d.y + 5) + '">' + esc(C[d.id].short) + '</text>' +
          '<circle class="bm-hit" ' + at + ' r="12"/></g>';
      }).join('') + '</svg></div><div class="w-map-cap"><p class="w-map-names"></p>' + (trip ? '<p class="w-map-key">● na twojej trasie · ○ poza nią</p>' : '') + '</div>';
    litKey = null; zoomNow = null;
    zoomTo(null, true);
  }
  // the zoom of the map (variant „Przybliża region”): the box of a region's dots, as big as the map's box allows (up to 3.2×)
  function zoomTo(reg, now) {
    var svg = $('#w-map svg'), map = $('#w-map');
    if (!svg) return;
    var key = opt.map === 'zoom' ? reg : null;
    if (key === zoomNow && !now) return;
    zoomNow = key;
    if (!key) { svg.style.transform = ''; map.classList.remove('zoomed'); map.style.removeProperty('--k'); return; }
    var cw = svg.clientWidth, ch = svg.clientHeight, s = Math.min(cw / mapW, ch / mapH), ox = (cw - s * mapW) / 2, oy = (ch - s * mapH) / 2;
    var ds = dots.filter(function (d) { return C[d.id].region === key; }), pad = 26;
    var x0 = Math.min.apply(null, ds.map(function (d) { return d.x; })) - pad, x1 = Math.max.apply(null, ds.map(function (d) { return d.x; })) + pad;
    var y0 = Math.min.apply(null, ds.map(function (d) { return d.y; })) - pad, y1 = Math.max.apply(null, ds.map(function (d) { return d.y; })) + pad;
    var k = Math.min(cw / (s * (x1 - x0)), ch / (s * (y1 - y0)), 3.2), cx = ox + s * (x0 + x1) / 2, cy = oy + s * (y0 + y1) / 2;
    svg.style.transform = 'translate(' + r1(cw / 2 - k * cx) + 'px, ' + r1(ch / 2 - k * cy) + 'px) scale(' + k.toFixed(3) + ')';
    map.classList.add('zoomed');
    map.style.setProperty('--k', k.toFixed(3));
  }
  function curK() { return opt.map === 'zoom' && zoomNow ? parseFloat($('#w-map').style.getPropertyValue('--k')) || 1 : 1; }
  // the items that light the map: the region headings (all their places) and the places
  function items() { return all('.a-region-h, .a-ch'); }
  function itemPlaces(el) { return el.classList.contains('a-region-h') ? IDS.filter(function (id) { return C[id].region === el.getAttribute('data-reg'); }) : [el.id.slice(3)]; }
  function middleLine() { return BAND.matches ? (Math.max($('#w-map').getBoundingClientRect().bottom, 0) + window.innerHeight) / 2 : window.innerHeight / 2; }
  function light(el, line) {
    var ids = el ? itemPlaces(el) : [], reg = el && (el.getAttribute('data-reg') || C[ids[0]].region), key = ids.join(' ');
    // the zoom waits for the first heading to reach the line: above it the whole country
    var started = el && el.getBoundingClientRect().top <= line;
    zoomTo(started ? reg : null);
    if (key === litKey) return;
    litKey = key;
    var k = curK(), one = ids.length === 1;
    all('#w-map .bm-pt').forEach(function (g) {
      var p = g.getAttribute('data-p'), on = ids.indexOf(p) > -1, t = g.querySelector('text'), d = dots.filter(function (x) { return x.id === p; })[0];
      g.classList.toggle('on', on);
      t.style.opacity = on && !one ? '0' : '';
      if (on) { t.setAttribute('x', r1(d.x + (d.left ? -1 : 1) * BIG_NAME_GAP / k)); t.setAttribute('text-anchor', d.left ? 'end' : 'start'); }
    });
    $('#w-map').classList.toggle('any', ids.length > 0);
    $('#w-map .w-map-names').innerHTML = !el ? '' : one ? '<span class="w-map-name"><span class="dot' + (trip && !trip.stays[ids[0]] ? ' ring' : '') + '" style="--c:var(--pal-' + C[ids[0]].color + ')"></span>' +
      esc(C[ids[0]].short) + (trip && trip.stays[ids[0]] ? ' · ' + esc(stayDays(ids[0])) : '') + '</span>'
      : '<span class="w-map-name">' + REG_NAME[reg] + ' · ' + miejsc(ids.length) + '</span>';
  }
  function lightNow() {
    var els = items();
    if (!els.length) return;
    var i = -1, el = mouse && document.elementFromPoint(mouse.x, mouse.y), line = middleLine();
    if (el) els.forEach(function (e, k) { if (i < 0 && e.classList.contains('a-ch') && e.contains(el)) i = k; });
    if (i < 0) i = midItem(els.map(function (e) { var r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }), line);
    light(i > -1 ? els[i] : null, line);
  }
  window.addEventListener('scroll', lightNow, { passive: true });
  window.addEventListener('resize', function () { zoomNow = '?'; lightNow(); });
  $('#a-panels').addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; mouse = { x: e.clientX, y: e.clientY }; lightNow(); });
  $('#a-panels').addEventListener('pointerleave', function () { mouse = null; lightNow(); });
  $('#w-map').addEventListener('mouseover', function (e) {
    var g = e.target.closest('.bm-pt'), p = g && g.getAttribute('data-p');
    all('.a-ch').forEach(function (el) { el.classList.toggle('w-lit', !!p && el.id === 'pl-' + p); });
  });
  $('#w-map').addEventListener('mouseleave', function () { all('.w-lit').forEach(function (el) { el.classList.remove('w-lit'); }); });
  $('#w-map').addEventListener('click', function (e) {
    var g = e.target.closest('.bm-pt'), el = g && $('#pl-' + g.getAttribute('data-p'));
    if (!el) return;
    var top = BAND.matches ? $('#w-map').offsetHeight : 0, r = el.getBoundingClientRect();
    el.classList.remove('a-pre');
    window.scrollBy(0, r.top - top - 16);
    mouse = null;
  });

  /* ---------- places come in as they reach the screen ---------- */
  var STILL = window.matchMedia('(prefers-reduced-motion: reduce)');
  function prepRise() { if (!STILL.matches) all('.a-ch').forEach(function (el) { if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('a-pre'); }); }
  function rise() { all('.a-pre').forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.remove('a-pre'); }); }
  window.addEventListener('scroll', rise, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { document.documentElement.classList.add('live'); o.disconnect(); }).observe($('.w-head'));
  function shown(im) { im.classList.add('in'); }
  ['load', 'error'].forEach(function (k) { document.addEventListener(k, function (e) { if (e.target.classList && e.target.classList.contains('ph')) shown(e.target); }, true); });
  function paint() { all('img.ph:not(.in)').forEach(function (im) { if (im.complete) shown(im); }); }

  /* ---------- the album of a place ---------- */
  var album = [], at = 0, opener = null;
  function openViewer(pid, from) {
    var id = from.getAttribute('data-place');
    album = C[id].photos.slice(); at = album.indexOf(pid); opener = from;
    showPhoto();
    $('#w-viewer').showModal();
  }
  function showPhoto() {
    var pid = album[at], m = PHOTO_META[pid], id = pid.replace(/_\d+$/, '');
    $('#wv-count').textContent = (at + 1) + ' / ' + album.length;
    $('#wv-prev').disabled = at === 0; $('#wv-next').disabled = at === album.length - 1;
    $('#wv-photo').innerHTML = img(pid, '(max-width: 900px) 100vw, 900px');
    $('#wv-name').textContent = m.cap;
    $('#wv-cap').innerHTML = esc(C[id].name) + ' · ' + esc(m.artist) + ' · <a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.license) + '</a>';
    paint();
  }
  function step(k) { if (at + k >= 0 && at + k < album.length) { at += k; showPhoto(); } }
  document.addEventListener('click', function (e) {
    var v = e.target.closest ? e.target.closest('[data-view]') : null;
    if (v) { openViewer(v.getAttribute('data-view'), v); return; }
    var go = e.target.closest ? e.target.closest('[data-go]') : null;
    if (go) { e.preventDefault(); var h = $('#reg-' + go.getAttribute('data-go')); all('.a-pre').forEach(function (x) { x.classList.remove('a-pre'); }); window.scrollBy(0, h.getBoundingClientRect().top - (BAND.matches ? $('#w-map').offsetHeight : 0) - 12); return; }
    if (e.target.id === 'wv-close' || e.target.id === 'w-viewer') $('#w-viewer').close();
    var nav = e.target.closest ? e.target.closest('.wv-nav') : null;
    if (nav) step(nav.id === 'wv-next' ? 1 : -1);
  });
  $('#w-viewer').addEventListener('close', function () { if (opener) opener.focus(); opener = null; });
  $('#w-viewer').addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); } });
  var x0 = null;
  $('#w-viewer').addEventListener('touchstart', function (e) { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
  $('#w-viewer').addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) >= 50) step(dx < 0 ? 1 : -1); });

  /* ---------- the mockup's switches ---------- */
  function syncMock() { all('#a-mock button').forEach(function (b) { b.setAttribute('aria-pressed', String(opt[b.getAttribute('data-o')] === b.getAttribute('data-v'))); }); }
  function renderAll(keep) {
    // keep the place across the middle where it is, as the page's height changes with the layout
    var anchor = keep && litKey && litKey.indexOf(' ') < 0 ? $('#pl-' + litKey) : null, before = anchor ? anchor.getBoundingClientRect().top : 0;
    renderPanels(); renderMap(); paint();
    if (anchor) { var now = $('#pl-' + litKey); if (now) window.scrollBy(0, now.getBoundingClientRect().top - before); }
    prepRise(); rise(); lightNow();
  }
  $('#a-mock').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-o]');
    if (!b) return;
    opt[b.getAttribute('data-o')] = b.getAttribute('data-v');
    if (b.getAttribute('data-o') === 'trip') {
      try { history.replaceState(null, '', opt.trip === 'demo' ? '#' + DEMO : location.pathname); } catch (err) { location.hash = opt.trip === 'demo' ? DEMO : ''; }
      readTrip();
    }
    syncMock();
    renderAll(true);
  });
  readTrip(); syncMock(); renderAll(false);
  window.__atlas = { opt: opt, trip: function () { return trip; } };
})();
