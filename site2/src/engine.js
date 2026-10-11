/* Route engine: which places, how many nights and in what order, for one set of settings.
   Pure functions shared by the page and the tests (no DOM). Data: places.js, travel.js, seasons.js. */

/* ---------- travel ---------- */
var AIRPORT_H = 1.5;      // hours at the airports for each flight, as in the December planner

/* All-pairs travel between places and airports (Floyd–Warshall). Roads and flights are two-way; a flight costs
   its hours in the air plus AIRPORT_H. h: fastest door-to-door hours; road: fastest by road only. */
function travelGraph(roads, flights) {
  var nodes = [], seen = {};
  function add(n) { if (!seen[n]) { seen[n] = true; nodes.push(n); } }
  roads.forEach(function (r) { add(r[0]); add(r[1]); });
  flights.forEach(function (f) { add(f[0]); add(f[1]); });
  var h = {}, road = {}, next = {}, nextRoad = {}, edge = {};
  nodes.forEach(function (a) {
    h[a] = {}; road[a] = {}; next[a] = {}; nextRoad[a] = {}; edge[a] = {};
    nodes.forEach(function (b) {
      h[a][b] = road[a][b] = a === b ? 0 : Infinity;
      next[a][b] = nextRoad[a][b] = a === b ? a : null;
    });
  });
  function link(a, b, hours, mode) {
    var w = mode === 'fly' ? hours + AIRPORT_H : hours;
    var k = b + '|' + mode; if (edge[a][k] == null || hours < edge[a][k]) edge[a][k] = hours;
    if (mode === 'road' && w < road[a][b]) { road[a][b] = w; nextRoad[a][b] = b; }
    if (w < h[a][b]) { h[a][b] = w; next[a][b] = b; }
  }
  roads.forEach(function (r) { link(r[0], r[1], r[2], 'road'); link(r[1], r[0], r[2], 'road'); });
  flights.forEach(function (f) { link(f[0], f[1], f[2], 'fly'); link(f[1], f[0], f[2], 'fly'); });
  nodes.forEach(function (k) {
    nodes.forEach(function (a) {
      nodes.forEach(function (b) {
        if (h[a][k] + h[k][b] < h[a][b]) { h[a][b] = h[a][k] + h[k][b]; next[a][b] = next[a][k]; }
        if (road[a][k] + road[k][b] < road[a][b]) { road[a][b] = road[a][k] + road[k][b]; nextRoad[a][b] = nextRoad[a][k]; }
      });
    });
  });
  return { nodes: nodes, h: h, road: road, next: next, nextRoad: nextRoad, edge: edge };
}

/* The trip from node a to node b along the fastest path (by road only with roadOnly):
   { from, to, segs: [{ mode: 'road'|'fly', from, to, h }], flights, total }, or null when there is no way. */
function legBetween(g, a, b, roadOnly) {
  var dist = roadOnly ? g.road : g.h, nx = roadOnly ? g.nextRoad : g.next;
  if (!dist[a] || !(dist[a][b] < Infinity)) return null;
  var segs = [], at = a, flights = 0;
  while (at !== b) {
    var to = nx[at][b], road = g.edge[at][to + '|road'], fly = g.edge[at][to + '|fly'];
    var mode = !roadOnly && fly != null && (road == null || fly + AIRPORT_H < road) ? 'fly' : 'road';
    segs.push({ mode: mode, from: at, to: to, h: mode === 'fly' ? fly : road });
    if (mode === 'fly') flights++;
    at = to;
  }
  return { from: a, to: b, segs: segs, flights: flights, total: dist[a][b] };
}

/* What one travel day costs: a little per hour, and much more for every hour past five. */
function legCost(hours) { return 0.1 * hours + 0.15 * Math.pow(Math.max(0, hours - 5), 2); }

/* ---------- settings ---------- */
var MIN_DAYS = 5, MAX_DAYS = 30;
var MIN_YEAR = 2000, MAX_YEAR = 2100;   // the years a link in the month mode may name
var INTERESTS = ['kultura', 'jedzenie', 'przyroda', 'gory', 'morze'];
var LEVELS = [1, 2, 3];   // spokojnie, aktywnie, ekstremalnie

/* Day number since 1970 of a YYYY-MM-DD date, or null when it is no real date. */
function isoDay(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  var t = Date.UTC(+m[1], +m[2] - 1, +m[3]), dt = new Date(t);
  return dt.getUTCFullYear() === +m[1] && dt.getUTCMonth() === +m[2] - 1 && dt.getUTCDate() === +m[3] ? t / 864e5 : null;
}

/* Settings from the page or a link, checked. The term is either start + end dates (YYYY-MM-DD) or month (1–12) + days,
   with an optional year (MIN_YEAR–MAX_YEAR) in the month mode; with dates, month, year and days are not read. Airports and dates
   must be texts; month, year, days and level numbers; interests, add and remove lists (null counts as missing: a missing
   level is 2, a missing list is empty). The page turns the text of a link into those first: a text would be read as digits
   or by substring ('gorykultura' holds two interests), and a list as its text (['XA'] as 'XA'), so any other type is refused.
   Returns { ok: true, from, to, days, start, month, year, months, interests, level, add, remove } or { ok: false, error },
   error being the field refused: airport, date, month, year, days, interests, level, add or remove.
   months[d - 1] is the month (0–11) of trip day d: day 1 is the arrival day, the last day the flight home. */
function normSettings(s, places, hubs) {
  if (typeof s.from !== 'string' || typeof s.to !== 'string' || !hubs.hasOwnProperty(s.from) || !hubs.hasOwnProperty(s.to)) {
    return { ok: false, error: 'airport' };
  }
  var out = { ok: true, from: s.from, to: s.to, start: null, month: null, year: null, months: [] };
  if (s.start != null) {
    if (typeof s.start !== 'string' || typeof s.end !== 'string') return { ok: false, error: 'date' };
    var a = isoDay(s.start), b = isoDay(s.end);
    if (a === null || b === null) return { ok: false, error: 'date' };
    out.start = s.start; out.days = b - a + 1;
  } else {
    if (!(typeof s.month === 'number' && s.month >= 1 && s.month <= 12 && s.month % 1 === 0)) return { ok: false, error: 'month' };
    if (s.year != null && !(typeof s.year === 'number' && s.year >= MIN_YEAR && s.year <= MAX_YEAR && s.year % 1 === 0)) return { ok: false, error: 'year' };
    out.month = s.month; out.year = s.year == null ? null : s.year; out.days = s.days;
  }
  // the days check comes before any loop, so a huge span is refused without building months
  if (!(typeof out.days === 'number' && out.days >= MIN_DAYS && out.days <= MAX_DAYS && out.days % 1 === 0)) return { ok: false, error: 'days' };
  if (s.start != null) {
    for (var d = 0; d < out.days; d++) out.months.push(new Date((a + d) * 864e5).getUTCMonth());
  } else {
    for (var k = 0; k < out.days; k++) out.months.push(out.month - 1);
  }
  var wanted = s.interests == null ? [] : s.interests;
  if (!Array.isArray(wanted)) return { ok: false, error: 'interests' };
  out.interests = INTERESTS.filter(function (k) { return wanted.indexOf(k) > -1; });
  if (out.interests.length > 2) return { ok: false, error: 'interests' };
  out.level = s.level == null ? 2 : s.level;
  if (LEVELS.indexOf(out.level) < 0) return { ok: false, error: 'level' };   // LEVELS holds numbers: '2' is refused
  var toAdd = s.add == null ? [] : s.add, toRemove = s.remove == null ? [] : s.remove;
  if (!Array.isArray(toAdd)) return { ok: false, error: 'add' };
  if (!Array.isArray(toRemove)) return { ok: false, error: 'remove' };
  var known = Object.keys(places).sort();
  out.remove = known.filter(function (id) { return toRemove.indexOf(id) > -1; });
  out.add = known.filter(function (id) { return toAdd.indexOf(id) > -1 && out.remove.indexOf(id) < 0; });
  return out;
}

/* ---------- value ---------- */
var SEASON_K = { D: 1, S: 0.7, Z: 0.2 };   // D good, S fair, Z poor; X (closed) never goes on a route

/* How much one night at a place is worth for the chosen interests (0–2 of INTERESTS), before the season.
   With no interest chosen every interest counts the same ("a bit of everything"). */
function placeWeight(place, interests) {
  var all = 0, chosen = 0;
  INTERESTS.forEach(function (k) { all += place.fit[k] || 0; });
  all /= INTERESTS.length;
  if (!interests.length) return all * 1.25;
  interests.forEach(function (k) { chosen += place.fit[k] || 0; });
  return chosen / interests.length + 0.25 * all;
}

/* A stay of n nights from trip day `first`: weight × season of each night; the nights past the place's ideal are
   worth half as much each. done: nights already spent there earlier in the trip. season: the place's 12-letter
   code, January first. null when a night falls in a closed month (X). */
function stayValue(place, season, weight, months, first, n, done) {
  var v = 0;
  for (var k = 1; k <= n; k++) {
    if (months[first + k - 2] == null) return null;   // a night outside the trip
    var s = season.charAt(months[first + k - 2]), all = k + (done || 0);
    if (!SEASON_K[s]) return null;
    v += weight * SEASON_K[s] * (all <= place.nights[1] ? 1 : Math.pow(0.5, all - place.nights[1]));
  }
  return v;
}
/* ---------- planning ---------- */
var MAX_LEG_H = 10;       // longest travel day allowed, door to door
var END_LEG_H = 4;        // arrival and departure day: by road only, at most this long to or from the airport
var MOVE_COST = 0.75;     // what each change of place costs, in the units of one good night
var FORCE_BONUS = 1000;   // a place added by hand outweighs everything else

/* The best trip for checked settings (normSettings). data: { places, seasons, graph, hubs }.
   A trip sweeps the country one way along the places' axis (south→north and north→south are both tried),
   so no place comes twice. The arrival airport's city (hubs) may open the trip and the departure airport's
   city may close it, both out of the axis order; on a round trip the one city may do both, splitting its nights.
   The first place lies within END_LEG_H by road of the arrival airport, the last within END_LEG_H of the
   departure airport. A place with a node (a night on the way, as in Hà Nội) is never the first or last stop and
   goes when its node is removed.
   Returns { ok: true, days, stops: [{ id, n, start, end, season, leg }], home, missing, score }
   or { ok: false, error: 'no_route' }. */
function planRoute(st, data) {
  var P = data.places, G = data.graph, N = st.days - 1;
  var hubA = data.hubs[st.from], hubB = data.hubs[st.to];
  var ids = Object.keys(P).sort();
  var usable = {}, weight = {}, bonus = {}, table = {};
  ids.forEach(function (id) {
    // a place with a node (a night on the way) goes when its node is removed
    usable[id] = st.remove.indexOf(id) < 0 && st.remove.indexOf(node(id)) < 0 && P[id].level <= st.level;
    if (!usable[id]) return;
    weight[id] = placeWeight(P[id], st.interests);
    bonus[id] = st.add.indexOf(id) > -1 ? FORCE_BONUS : 0;
    table[id] = [];   // table[id][first][n]: value of n nights from trip day `first`
    for (var first = 1; first <= N; first++) {
      table[id][first] = [];
      for (var n = P[id].nights[0]; n <= P[id].nights[2] && first + n - 1 <= N; n++) {
        var v = stayValue(P[id], data.seasons[id], weight[id], st.months, first, n, 0);
        table[id][first][n] = v === null ? null : v + bonus[id];
      }
    }
  });
  function val(id, first, n) { var r = table[id][first] && table[id][first][n]; return r == null ? null : r; }
  function node(id) { return P[id].node || id; }
  function hop(a, b) {   // cost of moving between two places, or null when it is no real move or too long
    if (node(a) === node(b)) return null;
    var h = G.h[node(a)][node(b)];
    return h <= MAX_LEG_H ? MOVE_COST + legCost(h) : null;
  }
  // a place with a node (a night on the way) never opens or closes a trip, so it has no arrival or departure leg
  function arrive(id) { var h = G.road[st.from][node(id)]; return !P[id].node && h <= END_LEG_H ? legCost(h) : null; }
  function depart(id) { var h = G.road[node(id)][st.to]; return !P[id].node && h <= END_LEG_H ? legCost(h) : null; }
  function nightsOf(id) { var out = []; for (var n = P[id].nights[0]; n <= P[id].nights[2]; n++) out.push(n); return out; }

  /* One sweep. first: the city opening the trip out of order, or null; last: the city closing it, or null;
     n1: on a round trip with first === last, the nights of the first visit (the second gets what is left). */
  function sweep(dir, first, last, n1) {
    var order = ids.filter(function (id) { return usable[id] && id !== hubA && id !== hubB; })
      .sort(function (a, b) { return P[a].axis - P[b].axis || (a < b ? -1 : 1); });
    if (dir === 'NS') order.reverse();
    var m = order.length, score = [], back = [], i, j, t, k;
    for (i = 0; i < m; i++) { score.push([]); back.push([]); for (t = 0; t <= N; t++) { score[i].push(-Infinity); back[i].push(null); } }
    var open = [];   // open[k]: value of k nights in the opening city, arrival included
    if (first && arrive(first) !== null) nightsOf(first).forEach(function (k) {
      var g = val(first, 1, k);
      if (g !== null && (!n1 || k === n1)) open[k] = g - arrive(first);
    });
    function better(i, t, v, how) { if (v > score[i][t] + 1e-9) { score[i][t] = v; back[i][t] = how; } }
    for (j = 0; j < m; j++) {
      var id = order[j], nj = nightsOf(id), aj = arrive(id), hj = first ? hop(first, id) : null;
      nj.forEach(function (n) {
        var g1 = val(id, 1, n);
        if (aj !== null && g1 !== null) better(j, n, g1 - aj, { kind: 'start' });
        if (hj !== null) open.forEach(function (ov, k) {
          var g = val(id, k + 1, n);
          if (g !== null) better(j, k + n, ov + g - hj, { kind: 'open', k: k });
        });
      });
      for (i = 0; i < j; i++) {
        var c = hop(order[i], id);
        if (c === null) continue;
        for (t = 1; t < N; t++) {
          if (score[i][t] === -Infinity) continue;
          for (k = 0; k < nj.length; k++) {
            var g2 = val(id, t + 1, nj[k]);
            if (g2 !== null) better(j, t + nj[k], score[i][t] + g2 - c, { kind: 'stop', i: i, t: t });
          }
        }
      }
    }
    // value of the closing city for nights t+1..N, or null
    function close(t) {
      var n2 = N - t, done = n1 && first === last ? n1 : 0;
      if (n2 < P[last].nights[0] || n2 + done > P[last].nights[2] || depart(last) === null) return null;
      var v = stayValue(P[last], data.seasons[last], weight[last], st.months, t + 1, n2, done);
      return v === null ? null : v + (done ? 0 : bonus[last]) - depart(last);
    }
    var best = null;
    function end(v, how) { if (!best || v > best.score + 1e-9) best = { score: v, how: how }; }
    for (i = 0; i < m; i++) {
      if (score[i][N] > -Infinity && depart(order[i]) !== null) end(score[i][N] - depart(order[i]), { i: i, t: N });
      var cl = last ? hop(order[i], last) : null;
      if (cl !== null) for (t = 1; t < N; t++) {
        if (score[i][t] === -Infinity) continue;
        var vl = close(t);
        if (vl !== null) end(score[i][t] + vl - cl, { i: i, t: t, last: N - t });
      }
    }
    open.forEach(function (ov, k) {
      if (k === N && depart(first) !== null) end(ov - depart(first), { open: k });
      var c1 = last && k < N ? hop(first, last) : null, v1 = c1 !== null ? close(k) : null;
      if (v1 !== null) end(ov + v1 - c1, { open: k, last: N - k });
    });
    if (!best) return null;
    var stops = [], how = best.how;   // walk back to the list of stops
    if (how.last) stops.push({ id: last, n: how.last });
    if (how.open) stops.unshift({ id: first, n: how.open });
    else {
      i = how.i; t = how.t;
      while (true) {
        var b = back[i][t], prevT = b.kind === 'stop' ? b.t : b.kind === 'open' ? b.k : 0;
        stops.unshift({ id: order[i], n: t - prevT });
        if (b.kind === 'open') { stops.unshift({ id: first, n: b.k }); break; }
        if (b.kind === 'start') break;
        i = b.i; t = b.t;
      }
    }
    return { score: best.score, stops: stops };
  }

  var tries = [[hubA, hubB, 0]];
  if (hubA === hubB) {
    tries = [[hubA, null, 0], [null, hubB, 0]];
    if (usable[hubA]) nightsOf(hubA).forEach(function (k) { tries.push([hubA, hubB, k]); });
  }
  var best = null;
  ['SN', 'NS'].forEach(function (dir) {
    tries.forEach(function (x) {
      var r = sweep(dir, x[0] && usable[x[0]] ? x[0] : null, x[1] && usable[x[1]] ? x[1] : null, x[2]);
      if (r && (!best || r.score > best.score + 1e-9)) best = r;
    });
  });
  if (!best) return { ok: false, error: 'no_route' };

  var day = 1, prev = null, out = [];
  best.stops.forEach(function (s) {
    var season = '';
    for (var x = 0; x < s.n; x++) season += data.seasons[s.id].charAt(st.months[day - 1 + x]);
    out.push({ id: s.id, n: s.n, start: day, end: day + s.n - 1, season: season,
      leg: prev === null ? legBetween(G, st.from, node(s.id), true) : legBetween(G, node(prev), node(s.id), false) });
    day += s.n; prev = s.id;
  });
  var here = {};
  out.forEach(function (s) { here[s.id] = true; });
  var missing = st.add.filter(function (id) { return !here[id]; });
  return { ok: true, days: st.days, stops: out, home: legBetween(G, node(prev), st.to, true), missing: missing,
    score: best.score - FORCE_BONUS * (st.add.length - missing.length) };
}
