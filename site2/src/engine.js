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
var INTERESTS = ['kultura', 'jedzenie', 'przyroda', 'gory', 'morze'];
var LEVELS = [1, 2, 3];   // spokojnie, aktywnie, ekstremalnie

/* Day number since 1970 of a YYYY-MM-DD date, or null when it is no real date. */
function isoDay(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  var t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
  return new Date(t).getUTCDate() === +m[3] ? t / 864e5 : null;
}

/* Settings from the page or a link, checked. The term is either start + end dates (YYYY-MM-DD) or month (1–12) + days.
   Returns { ok: true, from, to, days, start, month, months, interests, level, add, remove } or { ok: false, error }.
   months[d - 1] is the month (0–11) of trip day d: day 1 is the arrival day, the last day the flight home. */
function normSettings(s, places, hubs) {
  if (!hubs.hasOwnProperty(s.from) || !hubs.hasOwnProperty(s.to)) return { ok: false, error: 'airport' };
  var out = { ok: true, from: s.from, to: s.to, start: null, month: null, months: [] };
  if (s.start != null) {
    var a = isoDay(s.start), b = isoDay(s.end);
    if (a === null || b === null) return { ok: false, error: 'date' };
    out.start = s.start; out.days = b - a + 1;
  } else {
    if (!(s.month >= 1 && s.month <= 12 && s.month % 1 === 0)) return { ok: false, error: 'month' };
    out.month = s.month; out.days = s.days;
  }
  // the days check comes before any loop, so a huge span is refused without building months
  if (!(out.days >= MIN_DAYS && out.days <= MAX_DAYS && out.days % 1 === 0)) return { ok: false, error: 'days' };
  if (s.start != null) {
    for (var d = 0; d < out.days; d++) out.months.push(new Date((a + d) * 864e5).getUTCMonth());
  } else {
    for (var k = 0; k < out.days; k++) out.months.push(out.month - 1);
  }
  var wanted = s.interests || [];
  out.interests = INTERESTS.filter(function (k) { return wanted.indexOf(k) > -1; });
  if (out.interests.length > 2) return { ok: false, error: 'interests' };
  out.level = s.level == null ? 2 : s.level;
  if (LEVELS.indexOf(out.level) < 0) return { ok: false, error: 'level' };
  var known = Object.keys(places).sort();
  out.remove = known.filter(function (id) { return (s.remove || []).indexOf(id) > -1; });
  out.add = known.filter(function (id) { return (s.add || []).indexOf(id) > -1 && out.remove.indexOf(id) < 0; });
  return out;
}
