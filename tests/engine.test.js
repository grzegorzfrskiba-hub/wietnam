/* The engine on a made-up map, small enough to check by hand.
   Places a, b, e, c, d lie south to north (axis 1–4); e needs level 3. Airport XA is next to a, airport XD next to d,
   with one flight between them. b is closed in July. */
var FX_ROADS = [['XA', 'a', 0.5], ['a', 'b', 2], ['b', 'e', 1], ['e', 'c', 1.5], ['b', 'c', 2], ['c', 'd', 2],
  ['d', 'XD', 0.5], ['XA', 'b', 3], ['c', 'XD', 3]];
var FX_FLIGHTS = [['XA', 'XD', 1]];
var FX_HUBS = { XA: 'a', XD: 'd' };
var FX_PLACES = {
  a: { axis: 1, nights: [1, 2, 3], level: 1, fit: { kultura: 3 } },
  b: { axis: 2, nights: [1, 2, 2], level: 1, fit: { przyroda: 3 } },
  e: { axis: 2.5, nights: [1, 1, 2], level: 3, fit: { przyroda: 3, gory: 3 } },
  c: { axis: 3, nights: [2, 2, 3], level: 1, fit: { przyroda: 2, gory: 2 } },
  d: { axis: 4, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3 } }
};
var ALL_D = 'DDDDDDDDDDDD';
var FX_SEASONS = { a: ALL_D, b: 'DDDDDDXDDDDD', e: ALL_D, c: ALL_D, d: ALL_D };
var FX_GRAPH = travelGraph(FX_ROADS, FX_FLIGHTS);
var FX = { places: FX_PLACES, seasons: FX_SEASONS, graph: FX_GRAPH, hubs: FX_HUBS };
function near(a, b, msg) { ok(Math.abs(a - b) < 1e-9, (msg || 'near') + ': got ' + a + ', want ' + b); }

/* ---------- travel ---------- */
// a to d: by road a-b-c-d is 6 h; flying XA→XD is 0.5 + 1 + 1.5 (airports) + 0.5 = 3.5 h
near(FX_GRAPH.h.a.d, 3.5, 'fastest a→d');
near(FX_GRAPH.road.a.d, 6, 'road a→d');
near(FX_GRAPH.road.a.XD, 6.5, 'road a→XD');
var leg = legBetween(FX_GRAPH, 'a', 'd');
eq(leg.segs.map(function (s) { return s.mode + ':' + s.from + '-' + s.to + ':' + s.h; }),
  ['road:a-XA:0.5', 'fly:XA-XD:1', 'road:XD-d:0.5'], 'a→d goes by plane');
eq([leg.flights, leg.total], [1, 3.5], 'a→d flights and total');
var byRoad = legBetween(FX_GRAPH, 'a', 'd', true);
eq(byRoad.segs.map(function (s) { return s.from + '-' + s.to; }), ['a-b', 'b-c', 'c-d'], 'a→d by road');
eq([byRoad.flights, byRoad.total], [0, 6], 'a→d by road: no flights, 6 h');
eq(legBetween(FX_GRAPH, 'a', 'nowhere'), null, 'unknown node');
near(legCost(4), 0.4, 'legCost 4 h');
near(legCost(5), 0.5, 'legCost 5 h');
near(legCost(7), 1.3, 'legCost 7 h: 0.7 + 0.15 × 2²');
print('travel ok');
