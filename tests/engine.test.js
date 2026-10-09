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
/* ---------- a pair listed more than once: the shortest link of each mode is kept ---------- */
/* Five pairs that do not meet: A-B roads 1, 3; C-D roads 3, 1; E-F roads 2 and 3, one each way;
   G-H roads 2, 5 and a flight of 1 (the road is faster); I-J flights 1, 4 (a flight adds AIRPORT_H = 1.5 h). */
var DUP = travelGraph([['A', 'B', 1], ['A', 'B', 3], ['C', 'D', 3], ['C', 'D', 1], ['E', 'F', 2], ['F', 'E', 3],
  ['G', 'H', 2], ['G', 'H', 5]], [['G', 'H', 1], ['I', 'J', 1], ['J', 'I', 4]]);
// a leg of one segment: its mode, hours and flights, and its total
function checkLeg(g, a, b, mode, h, flights, total) {
  var leg = legBetween(g, a, b);
  eq([leg.segs.length, leg.segs[0].mode, leg.segs[0].h, leg.flights], [1, mode, h, flights], a + '→' + b + ' segment');
  near(leg.total, total, a + '→' + b + ' total');
}
checkLeg(DUP, 'A', 'B', 'road', 1, 0, 1); checkLeg(DUP, 'B', 'A', 'road', 1, 0, 1);
checkLeg(DUP, 'C', 'D', 'road', 1, 0, 1); checkLeg(DUP, 'D', 'C', 'road', 1, 0, 1);
checkLeg(DUP, 'E', 'F', 'road', 2, 0, 2); checkLeg(DUP, 'F', 'E', 'road', 2, 0, 2);
checkLeg(DUP, 'G', 'H', 'road', 2, 0, 2); checkLeg(DUP, 'H', 'G', 'road', 2, 0, 2);
checkLeg(DUP, 'I', 'J', 'fly', 1, 1, 2.5); checkLeg(DUP, 'J', 'I', 'fly', 1, 1, 2.5);
print('travel ok');

/* ---------- settings ---------- */
function fxSet(s) { return normSettings(s, FX_PLACES, FX_HUBS); }
var s1 = fxSet({ from: 'XA', to: 'XD', month: 3, days: 6 });
eq([s1.ok, s1.days, s1.months, s1.interests, s1.level, s1.add, s1.remove, s1.start, s1.month],
  [true, 6, [2, 2, 2, 2, 2, 2], [], 2, [], [], null, 3], 'month and length');
var s2 = fxSet({ from: 'XA', to: 'XD', start: '2027-01-30', end: '2027-02-03' });
eq([s2.ok, s2.days, s2.months, s2.start], [true, 5, [0, 0, 1, 1, 1], '2027-01-30'], 'dates across a month end');
eq(fxSet({ from: 'XA', to: 'XD', start: '2027-12-29', end: '2028-01-02' }).months, [11, 11, 11, 0, 0], 'dates across a year end');
[
  [{ from: 'ZZ', to: 'XD', month: 3, days: 6 }, 'airport'],
  [{ from: 'XA', to: 'XD', month: 3, days: 4 }, 'days'],
  [{ from: 'XA', to: 'XD', month: 3, days: 31 }, 'days'],
  [{ from: 'XA', to: 'XD', month: 3, days: 6.5 }, 'days'],
  [{ from: 'XA', to: 'XD', month: 13, days: 6 }, 'month'],
  [{ from: 'XA', to: 'XD', days: 6 }, 'month'],
  [{ from: 'XA', to: 'XD', start: '2027-02-30', end: '2027-03-03' }, 'date'],
  [{ from: 'XA', to: 'XD', start: '2027-02-03', end: '2027-02-01' }, 'days'],
  [{ from: 'XA', to: 'XD', month: 3, days: 6, interests: ['kultura', 'morze', 'gory'] }, 'interests'],
  [{ from: 'XA', to: 'XD', month: 3, days: 6, level: 4 }, 'level'],
  [{ from: 'XA', to: 'XD', month: 3, days: Infinity }, 'days'],
  [{ from: 'XA', to: 'XD', start: '2027-01-01', end: '9999-12-31' }, 'days']
].forEach(function (c) { eq(fxSet(c[0]), { ok: false, error: c[1] }, 'error ' + c[1] + ' for ' + JSON.stringify(c[0])); });
eq(fxSet({ from: 'XA', to: 'XD', month: 3, days: 6, interests: ['morze', 'kultura', 'xyz'] }).interests, ['kultura', 'morze'], 'interests: known ones, in INTERESTS order');
var s3 = fxSet({ from: 'XA', to: 'XD', month: 3, days: 6, add: ['c', 'b', 'zz'], remove: ['b'] });
eq([s3.add, s3.remove], [['c'], ['b']], 'add and remove: known places; remove wins');
eq(isoDay('2027-02-29'), null, 'no 29 February in 2027');
eq(isoDay('2028-02-29') - isoDay('2028-02-28'), 1, '2028 is a leap year');
print('settings ok');
