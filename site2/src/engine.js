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
    edge[a][b + '|' + mode] = hours;
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
