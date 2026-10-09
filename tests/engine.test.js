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
eq(isoDay('2027-13-05'), null, 'no month 13 in 2027');
eq(isoDay('2027-00-10'), null, 'no month 0 in 2027');
eq(isoDay('2028-02-29') - isoDay('2028-02-28'), 1, '2028 is a leap year');
print('settings ok');

/* ---------- value ---------- */
near(placeWeight(FX_PLACES.a, []), 0.75, 'no interest: mean fit 3/5 × 1.25');
near(placeWeight(FX_PLACES.a, ['kultura']), 3.15, 'one interest: 3 + 0.25 × 0.6');
near(placeWeight(FX_PLACES.a, ['kultura', 'przyroda']), 1.65, 'two interests: (3 + 0) / 2 + 0.15');
var march = [2, 2, 2, 2, 2];
near(stayValue(FX_PLACES.a, ALL_D, 1, march, 1, 3, 0), 2.5, 'third night past the ideal of 2 is worth half');
near(stayValue(FX_PLACES.a, 'DDSDDDDDDDDD', 1, march, 1, 3, 0), 1.75, 'a fair month (S) is worth 0.7');
near(stayValue(FX_PLACES.a, ALL_D, 1, march, 1, 1, 2), 0.5, 'two nights already spent there earlier');
near(stayValue(FX_PLACES.a, 'DSDDDDDDDDDD', 1, [0, 0, 1, 1], 2, 2, 0), 1.7, 'a stay across a month end takes each night\'s month');
eq(stayValue(FX_PLACES.a, ALL_D, 1, [2, 2], 1, 3, 0), null, 'a night outside the trip is not valued');
eq(stayValue(FX_PLACES.b, FX_SEASONS.b, 1, [6, 6], 1, 2, 0), null, 'closed in July');
print('value ok');
/* ---------- planning ---------- */
function fxPlan(s) {
  var st = fxSet(s);
  ok(st.ok, 'settings ' + JSON.stringify(s));
  return planRoute(st, FX);
}
function brief(r) { return r.ok ? r.stops.map(function (x) { return x.id + x.n; }).join(' ') : r.error; }
var NATURE = { from: 'XA', to: 'XD', month: 3, days: 6, interests: ['przyroda'] };
function with_(extra) { var s = JSON.parse(JSON.stringify(NATURE)); Object.keys(extra).forEach(function (k) { s[k] = extra[k]; }); return s; }

// nature: b 2 nights (6.3) + c 3 nights (2.2 + 2.2 + 1.1) − arrive 2.5 h (0.25) − b→c (0.75 + 0.2) − leave 2.5 h (0.25)
var r1 = fxPlan(NATURE);
eq(brief(r1), 'b2 c3', 'nature in March');
near(r1.score, 10.35, 'nature score');
eq(r1.stops.map(function (s) { return [s.start, s.end, s.season]; }), [[1, 2, 'DD'], [3, 5, 'DDD']], 'days and seasons of the stops');
eq([r1.stops[0].leg.from, r1.stops[0].leg.to, r1.stops[0].leg.flights], ['XA', 'b', 0], 'arrival day: road from the airport');
eq([r1.home.from, r1.home.to, r1.home.flights, r1.home.total], ['c', 'XD', 0, 2.5], 'departure day: road to the airport');
eq(r1.days, 6, 'six days, five nights');
eq(brief(fxPlan(with_({ month: 7 }))), 'a2 c3', 'b is closed in July');
eq(brief(fxPlan(with_({ level: 3 }))), 'b2 e1 c2', 'level 3 opens e');
eq(brief(fxPlan(with_({ interests: ['kultura'] }))), 'a3 d2', 'culture flies from a to d');
eq(brief(fxPlan(with_({ from: 'XD', to: 'XA' }))), 'c3 b2', 'the other way: north to south');
eq(brief(fxPlan(with_({ days: 12 }))), 'a3 b2 c3 d3', 'twelve days use every place at its most');
eq(brief(fxPlan(with_({ start: '2027-06-28', end: '2027-07-03', month: null, days: null }))), 'b2 c3', 'b in June is fine, the July nights go to c');

// add and remove
var r2 = fxPlan(with_({ add: ['a'] }));
eq([brief(r2), r2.missing], ['a1 b2 c2', []], 'an added place goes on the route');
near(r2.score, 8.65, 'the bonus for an added place is not in the score');
var r3 = fxPlan(with_({ month: 7, add: ['b'] }));
eq([brief(r3), r3.missing], ['a2 c3', ['b']], 'a closed place cannot be added: it is listed as missing');
eq(brief(fxPlan(with_({ remove: ['b'] }))), 'a2 c3', 'a removed place stays off');
eq(fxPlan(with_({ remove: ['a', 'b', 'c', 'd', 'e'] })), { ok: false, error: 'no_route' }, 'no places, no route');

// round trips: the airport's city may open and close the trip, splitting its nights
eq(brief(fxPlan({ from: 'XA', to: 'XA', month: 3, days: 6, interests: ['kultura'] })), 'a1 d2 a2', 'round trip: a opens and closes');
eq(brief(fxPlan({ from: 'XA', to: 'XA', month: 3, days: 8, interests: ['przyroda'] })), 'b2 c3 a2', 'round trip: a closes');

// the same settings always give the same trip
eq(JSON.stringify(fxPlan(NATURE)), JSON.stringify(fxPlan(NATURE)), 'same settings, same trip');

/* A place with a node shares another place's travel point (hanoiStop is a night in Hà Nội on the way): it goes between
   two other places, never first or last, and goes with its node when that is removed. A separate map for it:
   airports TS and TN; s, m, n lie south to north on one road (axis 1–3), s and n are the airports' cities, and m is
   3.5 h by road from both airports. t is the twin of m (node m, axis 2, one night). For przyroda m is worth nothing and
   t as much as n, so t is the best stop on the way: it would open or close a trip if it could. */
var TW_ROADS = [['TS', 's', 0.5], ['s', 'm', 3], ['m', 'n', 3], ['n', 'TN', 0.5]];
var TW_HUBS = { TS: 's', TN: 'n' };
var TW_PLACES = {
  s: { axis: 1, nights: [1, 2, 2], level: 1, fit: { przyroda: 1 } },
  m: { axis: 2, nights: [2, 2, 2], level: 1, fit: { przyroda: 0 } },
  t: { axis: 2, node: 'm', nights: [1, 1, 1], level: 1, fit: { przyroda: 3 } },
  n: { axis: 3, nights: [1, 2, 3], level: 1, fit: { przyroda: 3 } }
};
var TW_SEASONS = { s: ALL_D, m: ALL_D, t: ALL_D, n: ALL_D };
var TW = { places: TW_PLACES, seasons: TW_SEASONS, graph: travelGraph(TW_ROADS, []), hubs: TW_HUBS };
// the same t as a place of its own, with the roads m has: nothing keeps it from the ends of a trip
var TW_FREE_PLACES = JSON.parse(JSON.stringify(TW_PLACES)); delete TW_FREE_PLACES.t.node;
var TW_FREE = { places: TW_FREE_PLACES, seasons: TW_SEASONS, hubs: TW_HUBS,
  graph: travelGraph(TW_ROADS.concat([['s', 't', 3], ['t', 'n', 3]]), []) };
function twTrip(data, from, to, extra) {   // 5 days in March for przyroda, unless extra says otherwise
  var s = { from: from, to: to, month: 3, days: 5, interests: ['przyroda'] };
  Object.keys(extra || {}).forEach(function (k) { s[k] = extra[k]; });
  var st = normSettings(s, data.places, data.hubs);
  ok(st.ok, 'settings ' + JSON.stringify(s));
  return planRoute(st, data);
}
// as a place of its own t opens the trip going north and closes it coming back:
// t1 n3 = 3.15 + (3.15 + 3.15 + 1.575) − 0.35 (t is 3.5 h from the airport) − (0.75 + 0.3) (t to n, 3 h) − 0.05 = 9.575
var free = twTrip(TW_FREE, 'TS', 'TN');
eq(brief(free), 't1 n3', 'a twin without a node opens the trip');
near(free.score, 9.575, 'its score');
eq(brief(twTrip(TW_FREE, 'TN', 'TS')), 'n3 t1', 'and closes it');
// with its node t stays between two other places, though that scores less:
// s1 t1 n2 = 1.05 + 3.15 + 2 × 3.15 − 0.05 − (0.75 + 0.3) − (0.75 + 0.3) − 0.05 = 8.3
var tw1 = twTrip(TW, 'TS', 'TN');
eq(brief(tw1), 's1 t1 n2', 'a twin with a node does not open the trip');
near(tw1.score, 8.3, 'its score');
eq(brief(twTrip(TW, 'TN', 'TS')), 'n2 t1 s1', 'and does not close it');
// whatever the length, direction or removed city: never first or last, and sometimes between two others
var between = 0;
[5, 6, 7].forEach(function (days) {
  [['TS', 'TN'], ['TN', 'TS'], ['TS', 'TS'], ['TN', 'TN']].forEach(function (p) {
    [[], ['s'], ['n']].forEach(function (remove) {
      var r = twTrip(TW, p[0], p[1], { days: days, remove: remove });
      if (!r.ok) return;
      var order = r.stops.map(function (x) { return x.id; });
      ok(order[0] !== 't' && order[order.length - 1] !== 't', 'the twin opens or closes ' + order.join(' ') + ' (' + days + ' days ' + p.join('>') + ', removed: ' + (remove.join(', ') || 'nothing') + ')');
      if (order.indexOf('t') > -1) between++;
    });
  });
});
ok(between > 0, 'the twin is used between two other places');
// removing m removes t with it: s1 n3 = 1.05 + 3.15 + 3.15 + 1.575 − 0.05 − (0.75 + 0.6 + 0.15) − 0.05 = 7.325
var rm = twTrip(TW, 'TS', 'TN', { remove: ['m'] });
eq(brief(rm), 's1 n3', 'removing m takes its twin off the trip');
near(rm.score, 7.325, 'its score');
print('planning ok');
