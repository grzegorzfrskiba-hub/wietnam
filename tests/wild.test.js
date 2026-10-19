/* The wildlife subpage's pure helpers (wildpage.js, stage 6), on made-up encounters and real trips of the engine. */
var GUIDE_T = { cattien: {}, cucphuong: {} };

/* ---------- the address (findings 2 and 3) ---------- */
eq([hasTrip('#route&od=SGN&do=HAN&miesiac=2027-02&dni=15&co=&poziom=2'), hasTrip('#od=SGN&do=HAN'), hasTrip('#gallery&lang=pl'), hasTrip(''), hasTrip('#gallery&do=HAN')],
  [true, true, false, false, false], 'hasTrip: a trip is a link with od=');
eq([wildView('#route', GUIDE_T), wildView('#gallery&od=SGN&do=HAN', GUIDE_T), wildView('#guide', GUIDE_T), wildView('#guide-cattien&lang=pl', GUIDE_T)],
  [{ tab: 'route', place: null }, { tab: 'gallery', place: null }, { tab: 'guide', place: null }, { tab: 'guide', place: 'cattien' }], 'wildView: the tab first, a place of the guide');
eq([wildView('', GUIDE_T), wildView('#lang=pl', GUIDE_T), wildView('#od=SGN&do=HAN&dni=15', GUIDE_T), wildView('#guide-hue', GUIDE_T), wildView('#zoo&od=SGN', GUIDE_T), wildView('#guide-constructor', GUIDE_T)],
  [{ tab: 'gallery', place: null }, { tab: 'gallery', place: null }, { tab: 'route', place: null }, { tab: 'gallery', place: null }, { tab: 'route', place: null }, { tab: 'gallery', place: null }],
  'wildView: without a known tab, the gallery, or with a trip the route; a place without a guide entry is none');
var S = { from: 'SGN', to: 'HAN', year: 2027, month: 2, days: 15, interests: ['przyroda'], level: 2, add: [], remove: [], moto: [] };
eq([wildHash({ tab: 'gallery', place: null }, null, 'en', false), wildHash({ tab: 'gallery', place: null }, null, 'pl', true), wildHash({ tab: 'guide', place: 'cattien' }, null, 'en', false)],
  ['#gallery', '#gallery&lang=pl', '#guide-cattien'], 'wildHash without a trip: the tab and lang=pl, no koszty');
eq(wildHash({ tab: 'route', place: null }, S, 'pl', true), '#route&od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2&koszty=1&lang=pl', 'wildHash with a trip: as pageHash');
eq(wildView(wildHash({ tab: 'guide', place: 'cucphuong' }, S, 'pl', false), GUIDE_T), { tab: 'guide', place: 'cucphuong' }, 'wildView reads wildHash back');
eq(parseLink(wildHash({ tab: 'route', place: null }, S, 'en', false)), parseLink(linkHash(S)), 'parseLink skips the tab');
eq([tripLink(S, 'en', false, null), tripLink(S, 'pl', true, 'yokdon')],
  ['../#od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2', '../#od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2&dodaj=yokdon&koszty=1&lang=pl'],
  'tripLink: the trip back, with dodaj= for Dodaj (finding 10)');
eq([tripLink(null, 'en', false, null), tripLink(null, 'pl', false, null), tripLink(null, 'en', false, 'cattien'), tripLink(null, 'pl', true, 'cattien')],
  ['../', '../#lang=pl', '../#dodaj=cattien', '../#dodaj=cattien&lang=pl'], 'tripLink without a trip: the page with its defaults');
eq(S.add, [], 'tripLink leaves the settings as they were');
print('address ok');

/* ---------- the trip and its encounters (finding 9) ---------- */
var DATA_W = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function tripOf(s) {
  var st = normSettings(s, PLACES, HUBS), r = planRoute(st, DATA_W);
  ok(st.ok && r.ok, 'a trip for ' + linkHash(s));
  return { st: st, route: r, stays: tripStays(r, st, CONTENT, FERRY) };
}
// a trip of 15 days in May 2027 from Hồ Chí Minh City to Hà Nội, with nature and Cúc Phương added at each level
function mayTrip(level, days) { return tripOf({ from: 'SGN', to: 'HAN', year: 2027, month: 5, days: days || 15, interests: ['przyroda'], level: level, add: ['cucphuong', 'cattien'], remove: [], moto: [] }); }
var T2 = mayTrip(2), T1 = mayTrip(1);
ok(T2.stays.cattien && T2.stays.cucphuong, 'the May trip has Cát Tiên and Cúc Phương');
var cat = T2.stays.cattien[0];
eq([cat.last - cat.first + 1, cat.days.length, cat.days.map(function (d) { return d.day; })[0]], [cat.days.length, cat.days.length, cat.first], 'tripStays: the days of the stay, from its first day');
eq(T2.stays.cattien[0].days.map(function (d) { return d.plan.p; }).sort(), cat.days.map(function (d, i) { return i + 1; }).sort(), 'stopDays: each day says its plan p');
// made-up encounters at Cát Tiên: one in the usual version of plan 2, one only in the hard version, one without a plan,
// one in May only (in the term) and one in August only (not)
var M = {
  usual: { place: 'cattien', months: null, plan: [[2, '']] },
  hard: { place: 'cattien', months: null, plan: [[2, 'hard']] },
  none: { place: 'cattien', months: null, plan: null },
  may: { place: 'cattien', months: [5], plan: [[2, ''], [2, 'hard']] },
  aug: { place: 'cattien', months: [8], plan: [[2, '']] },
  off: { place: 'phuquoc', months: null, plan: [[1, '']] }
};
if (cat.days.length >= 2) {
  eq(['usual', 'hard', 'none', 'may', 'aug'].map(function (k) { var o = meetOnTrip(M[k], T2.stays, T2.st.months); return [o.plan, o.month]; }),
    [[true, null], [false, null], [false, null], [true, true], [false, false]], 'meetOnTrip at level 2: the usual version is in the plan, the hard one is not; the month');
  var o1 = meetOnTrip(M.usual, T1.stays, T1.st.months);
  eq(o1.plan, !T1.stays.cattien[0].days.some(function (d) { return d.plan.p === 2 && d.plan.v === 'easy'; }), 'meetOnTrip at level 1: the easy version takes the place of the usual one');
}
eq(meetOnTrip(M.off, T2.stays, T2.st.months) === null || !!T2.stays.phuquoc, true, 'meetOnTrip: null for a place off the trip');
var o = meetOnTrip(M.none, T2.stays, T2.st.months);
eq([o.first, o.last], [cat.first, cat.last], 'meetOnTrip: the days of the stay');
// one night in Cát Tiên: its solo plan
var solo = { cattien: [{ first: 3, last: 3, days: [{ day: 3, plan: { p: 1, v: 'solo' } }] }] };
eq([meetOnTrip({ place: 'cattien', months: null, plan: [[1, 'solo']] }, solo, [4, 4, 4, 4]).plan, meetOnTrip({ place: 'cattien', months: null, plan: [[1, '']] }, solo, [4, 4, 4, 4]).plan],
  [true, false], 'meetOnTrip: a one-night stay has the solo version only');
// a plan in a month outside the encounter's months is no plan (fireflies on a night ride in February)
eq(meetOnTrip({ place: 'cattien', months: [4], plan: [[1, 'solo']] }, solo, [4, 4, 4, 4]), { first: 3, last: 3, plan: false, month: false }, 'meetOnTrip: out of season, neither');
eq(meetOnTrip({ place: 'cattien', months: [5], plan: [[1, 'solo']] }, solo, [4, 4, 4, 4]), { first: 3, last: 3, plan: true, month: true }, 'meetOnTrip: in season, both');
eq([meetInTerm({ months: null }, [2]), meetInTerm({ months: [4, 5, 6] }, [2, 3]), meetInTerm({ months: [4, 5, 6] }, [3, 4])], [true, false, true], 'meetInTerm (finding 10)');

/* ---------- the final review of stage 6 ---------- */
// a swap set to „Samodzielnie” (moto) gives the place's days their self versions, as on the page with the route (app.js)
var SM = { from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 14, interests: ['gory'], level: 2, add: ['caobang'], remove: [], moto: ['caobang'] };
var stm = normSettings(SM, PLACES, HUBS), rm = planRoute(stm, DATA_W), sm = tripStays(rm, stm, CONTENT, FERRY, selfSwaps(SM.moto, SWAPS).places);
ok(sm.caobang && sm.caobang[0].days.some(function (d) { return d.plan.v === 'self'; }), 'tripStays with the swaps: Cao Bằng on the motorbike takes its self days');
ok(!tripStays(rm, stm, CONTENT, FERRY).caobang[0].days.some(function (d) { return d.plan.v === 'self'; }), 'tripStays without the swaps: no self days');
// Dodaj (finding 27): without a trip each place of the species; on the trip only out of its term (butterflies in June at
// Cúc Phương), the places off the trip; on the trip in its term, none
var BF = { meet: [{ place: 'cucphuong', months: [4, 5] }, { place: 'cattien', months: [5, 6, 7] }, { place: 'cattien', months: null }] };
var onCP = { cucphuong: [{ first: 2, last: 3, days: [] }] }, june = [5, 5, 5, 5], may = [4, 4, 4, 4];
eq([addPlaces(BF, null, null), addPlaces(BF, onCP, june), addPlaces(BF, onCP, may), addPlaces({ meet: [{ place: 'cucphuong', months: null }, { place: 'yokdon', months: null }] }, onCP, june)],
  [['cucphuong', 'cattien'], ['cattien'], [], []], 'addPlaces: Dodaj on the trip only out of the term');
eq(termMonths({ months: [0, 0, 1, 1, 1] }), [1, 2], 'termMonths: once each, 1–12');
print('encounters ok');

/* ---------- the order of On your route (finding 11) and the rows of the guide (finding 14) ---------- */
var W = {
  a: { route: true, meet: [{ place: 'cattien', chance: 1 }] },
  b: { route: true, meet: [{ place: 'danang', chance: 3 }] },
  c: { route: true, meet: [{ place: 'cattien', chance: 2 }, { place: 'hue', chance: 3 }] },
  d: { route: false, gallery: true },
  e: { route: true, meet: [{ place: 'yokdon', chance: 2 }] }
};
eq(routeOrder(W, null), { on: [], off: ['b', 'c', 'e', 'a'] }, 'routeOrder without a trip: one group by chance, then the order of WILD');
eq(routeOrder(W, function (id) { return W[id].meet.some(function (m) { return m.place === 'cattien'; }); }), { on: ['c', 'a'], off: ['b', 'e'] }, 'routeOrder with a trip: on it first');
eq(guideRows(W, { cattien: { rows: [{ name: 'x' }] } }, 'cattien'), [{ id: 'a', i: 0 }, { id: 'c', i: 0 }, { row: { name: 'x' } }], 'guideRows: the encounters, then the guide’s rows');
print('order ok');

/* ---------- the map of the subpage (19.10.2026) ---------- */
// the places a species lights: its encounters' places once each, else its home; none for the two without a confirmed place
eq([speciesPlaces(WILD.lutungb), speciesPlaces(WILD.niedzwiedz), speciesPlaces(WILD.kukang), speciesPlaces(WILD.rokselana), speciesPlaces(WILD.skamielinowiec), speciesPlaces(WILD.troides), speciesPlaces(WILD.saola)],
  [['ninhbinh', 'cucphuong'], ['cucphuong', 'cattien'], ['cattien', 'cucphuong'], ['khauca'], ['phongnha'], [], []], 'speciesPlaces: the encounters, else the home, else none');
eq(speciesPlaces({ meet: [{ place: 'cattien' }, { place: 'cattien' }, { place: 'yokdon' }], home: ['danang'] }), ['cattien', 'yokdon'], 'speciesPlaces: each place once, the encounters before a home');
var GP = Object.keys(WILD_GUIDE), SPOTS = Object.keys(WILD_SPOTS), MM = { frame: COUNTRY_MAP, content: CONTENT, airports: AIRPORTS, spots: WILD_SPOTS };
var m0 = wildMapData(null, null, GP, SPOTS, MM), m2 = wildMapData(T2.route, T2.stays, GP, SPOTS, MM);
eq([m0.w, m0.h, m0.segs.length, m0.stays.length, m0.dots.map(function (d) { return d.id; })], [340, 667, 0, 0, GP.concat(SPOTS)],
  'wildMapData without a trip: the frame of the country, no legs and no stays, a dot at every place of the guide, then every point beyond Route G');
eq([m0.dots.map(function (d) { return d.spot; }), m0.dots.some(function (d) { return d.trip; })], [GP.map(function () { return false; }).concat(SPOTS.map(function () { return true; })), false],
  'wildMapData: the points beyond Route G marked, no place on a trip without one');
ok(m0.dots.every(function (d) { return d.x > 0 && d.x < m0.w && d.y > 0 && d.y < m0.h; }), 'wildMapData: every dot inside the map');
eq([m2.segs.length > 0, m2.stays.length, m2.dots.filter(function (d) { return d.trip; }).map(function (d) { return d.id; })], [true, T2.route.stops.length, GP.filter(function (p) { return !!T2.stays[p]; })],
  'wildMapData with a trip: its legs and stays, the places on it marked');
var dotOf = function (id) { return m0.dots.filter(function (d) { return d.id === id; })[0]; }, hg = countryMapAll(null, ['hagiang'], MM).dots[0];
ok(dotOf('khauca').x > hg.x && Math.abs(dotOf('khauca').y - hg.y) < 3, 'Khau Ca a little east of Hà Giang, 15–20 km (research, „Mapa podstrony”)');
var B = [{ top: 100, bottom: 200 }, { top: 210, bottom: 300 }, { top: 310, bottom: 400 }];
eq([midItem([], 100), midItem(B, 50), midItem(B, 150), midItem(B, 250), midItem(B, 350), midItem(B, 900)], [-1, 0, 0, 1, 2, 2],
  'midItem: the item across the line, the first while the list is under it, the last once it is above');
print('map ok');
