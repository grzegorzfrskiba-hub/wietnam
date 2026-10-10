/* The page's pure helpers (page.js), on made-up content and the real places. */

/* ---------- the settings link ---------- */
eq(parseLink('#od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian'),
  { from: 'SGN', to: 'HAN', year: 2027, month: 2, days: 15, interests: ['przyroda', 'gory'], level: 2, add: ['phuquoc'], remove: ['hoian'] }, 'a month link');
eq(parseLink('#poziom=1&koniec=2027-02-12&start=2027-01-30&do=HAN&od=HAN'),
  { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', level: 1 }, 'a dates link, fields in any order');
eq(parseLink('#od=sgn&do=HANOI&miesiac=2027-2&dni=x&co=przyroda,Gory&poziom=22&dodaj=&usun=a,,b&foo=1'), { add: [] },
  'malformed fields are left out; an empty list is a list');
eq([parseLink(''), parseLink('#'), parseLink('#day-5'), parseLink('#co=%zz')], [{}, {}, {}, {}], 'no link: nothing, an anchor, a broken escape');
eq(parseLink('#co=&dodaj=hanoiStop'), { interests: [], add: ['hanoiStop'] }, 'no interest; ids keep their capitals');
var bad1 = [];
eq([parseLink('#od=sgn&do=HAN&dni=x&co=%zz&poziom=high', bad1), bad1], [{ to: 'HAN' }, ['from', 'days', 'interests', 'level']], 'malformed fields are left out and named');
var bad2 = [];
eq([parseLink('#day-5&foo=1&constructor=x&toString=y', bad2), bad2], [{}, []], 'anchors, unknown keys and object properties are no link fields');
var bad3 = [];
eq([parseLink('#usun=hue,hoian,&miesiac=2027-3', bad3), bad3], [{}, ['remove', 'month']], 'an empty list item and a one-digit month are malformed');
var round = { from: 'DAD', to: 'SGN', year: 2027, month: 11, days: 21, interests: ['kultura'], level: 3, add: ['catba'], remove: ['hue', 'hoian'] };
eq(linkHash(round), '#od=DAD&do=SGN&miesiac=2027-11&dni=21&co=kultura&poziom=3&dodaj=catba&usun=hue,hoian', 'linkHash: the month');
eq(parseLink(linkHash(round)), round, 'linkHash, then parseLink: the same settings (the month)');
var roundD = { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', interests: [], level: 1, add: [], remove: [] };
eq(linkHash(roundD), '#od=HAN&do=HAN&start=2027-01-30&koniec=2027-02-12&co=&poziom=1', 'linkHash: dates; no interest is written, empty Dodaj and Usuń are not');
eq(parseLink(linkHash(roundD)), { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', interests: [], level: 1 }, 'linkHash, then parseLink (dates)');
print('link ok');

/* ---------- the defaults and the settings a link opens ---------- */
var DEF = defaultSettings('2026-10-10');
eq(DEF, { from: 'SGN', to: 'HAN', year: 2026, month: 11, days: 15, interests: [], level: 2, add: [], remove: [] }, 'the defaults: the next month');
eq([defaultSettings('2026-12-31').year, defaultSettings('2026-12-31').month], [2027, 1], 'after December: January of the next year');
function opened(hash) { return settingsFromLink(parseLink(hash), DEF, PLACES, HUBS); }
var g1 = opened('#od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3');
eq([g1.settings.from, g1.settings.to, g1.settings.year, g1.settings.month, g1.settings.days, g1.settings.interests, g1.settings.level, g1.dropped, g1.st.ok],
  ['HAN', 'DAD', 2027, 3, 12, ['kultura'], 3, [], true], 'a good link opens as it is');
var g2 = opened('#od=XYZ&do=DAD&dni=40&co=kultura,jedzenie,morze&poziom=7');
eq([g2.settings.from, g2.settings.to, g2.settings.days, g2.settings.interests, g2.settings.level, g2.dropped.slice().sort()],
  ['SGN', 'DAD', 15, [], 2, ['days', 'from', 'interests', 'level']], 'refused fields go back to the defaults, the good ones stay');
var g3 = opened('#od=SGN&do=HAN&start=2027-01-01&koniec=2027-03-01');
eq(['start' in g3.settings, g3.st.start, g3.st.month, g3.st.days, g3.dropped.slice().sort()], [false, null, 11, 15, ['end', 'start']],
  'dates over 30 days: back to the month of the defaults');
var g4 = opened('#od=SGN&do=HAN&start=2027-01-30');
eq([g4.st.start, g4.dropped], [null, ['start']], 'a start without an end: back to the month');
var g5 = opened('#od=SGN&do=HAN&dodaj=hanoiStop,phuquoc&usun=hanoiStop');
eq([g5.settings.add, g5.settings.remove, g5.st.add, g5.dropped], [['phuquoc'], [], ['phuquoc'], []], 'a night on the way gets no Dodaj or Usuń, also from a link');
var g6 = opened('#miesiac=1999-05');
eq([g6.st.year, g6.st.month, g6.dropped], [2026, 5, ['year']], 'a year the engine refuses: the default year, the month stays');
var g7 = opened('#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=kultura,xyz&dodaj=xyz,phuquoc&usun=nieznane');
eq([g7.settings.interests, g7.settings.add, g7.settings.remove, g7.dropped.slice().sort()], [['kultura'], ['phuquoc'], [], ['add', 'interests', 'remove']],
  'unknown interests and places are taken out of the settings and reported');
eq(linkHash(g7.settings), '#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=kultura&poziom=2&dodaj=phuquoc', 'and the address no longer carries them');
var g8 = opened('#od=SGN&do=HAN&co=morze,kultura,kultura');
eq([g8.settings.interests, g8.dropped], [['kultura', 'morze'], []], 'order and repeats are no error');
var g9 = opened('#od=SGN&do=HAN&dodaj=hoian&usun=hoian');
eq([g9.settings.add, g9.settings.remove, g9.dropped], [[], ['hoian'], ['add']], 'a place both added and removed: removing wins, Dodaj is reported');
var bad4 = [], g10 = settingsFromLink(parseLink('#od=SGN&do=HAN&dni=x', bad4), DEF, PLACES, HUBS, bad4);
eq([g10.settings.days, g10.dropped], [15, ['days']], 'a malformed field counts as a dropped one');
eq([DEF.add, DEF.days], [[], 15], 'the defaults stay as they were');
var mc = monthChoices('2026-10-10', 2030);
eq([mc.length, mc[0], mc[mc.length - 1]], [51, { year: 2026, month: 10 }, { year: 2030, month: 12 }], 'the months: from this one to December 2030');
eq(monthChoices('2031-03-01', 2030).pop(), { year: 2032, month: 12 }, 'past the holiday list: still a year ahead');
print('settings ok');

/* ---------- day plans ---------- */
var FC = {
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'A1', d: 'a1', solo: { pace: 'boat', t: 'A1s', d: 'a1s', early: true } },
    { p: 3, o: 2, pace: 'rest', t: 'A3', d: 'a3' },
    { p: 2, o: 3, pace: 'hike', t: 'A2', d: 'a2', early: true, rain: 'r2',
      easy: { pace: 'nature', t: 'A2e', d: 'a2e', early: false }, hard: { pace: 'hike', t: 'A2h', d: 'a2h', off: [7, 8] } }
  ],
  again: { pace: 'travel', t: 'B1', d: 'b1' }
};
var JAN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], JUL = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
function titles(days) { return days.map(function (d) { return d.day + ':' + d.t; }); }
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 2, JAN)), ['1:A1', '2:A2'], 'two nights: p 1 and p 2, in the order o');
eq(titles(stopDays(FC, { n: 3, start: 4 }, 0, 2, JAN)), ['4:A1', '5:A3', '6:A2'], 'three nights: all three, in the order o');
eq(titles(stopDays(FC, { n: 1, start: 1 }, 0, 2, JAN)), ['1:A1s'], 'one night: the solo plan');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 1, JAN)), ['1:A1', '2:A2e'], 'level 1: the easy version');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 3, JAN)), ['1:A1', '2:A2h'], 'level 3: the hard version');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 3, JUL)), ['1:A1', '2:A2'], 'level 3 in July, a month off: the usual day');
var dU = stopDays(FC, { n: 2, start: 1 }, 0, 2, JAN)[1], dE = stopDays(FC, { n: 2, start: 1 }, 0, 1, JAN)[1], dH = stopDays(FC, { n: 2, start: 1 }, 0, 3, JAN)[1];
eq([dU.pace, dU.early, dU.rain, dU.variant], ['hike', true, 'r2', null], 'the usual day');
eq([dE.pace, dE.early, dE.rain, dE.variant], ['nature', false, 'r2', 'easy'], 'the easy version: its own pace and early start, the day\'s rain plan');
eq([dH.early, dH.rain, dH.variant], [true, 'r2', 'hard'], 'the hard version keeps the day\'s early start and rain plan');
eq(titles(stopDays(FC, { n: 2, start: 8 }, 1, 2, JAN)), ['8:B1', '9:A2'], 'a second stay after one night: again, then the next plan by p');
eq(titles(stopDays(FC, { n: 1, start: 9 }, 2, 2, JAN)), ['9:B1'], 'a second stay of one night: again only');
eq(stopDays(FC, { n: 4, start: 1 }, 0, 2, JAN), null, 'more nights than plans');
eq(stopDays(FC, { n: 3, start: 5 }, 2, 2, JAN), null, 'a second stay past the plans');
eq(stopDays({ days: FC.days }, { n: 1, start: 5 }, 2, 2, JAN), null, 'a second stay needs again');

/* A hard version that ends away from the stay (late) stays off the stay's last day when the way home or a long leg follows:
   its next morning goes on the walk out, so the journey would start around noon. next: { home, h }, see stopDays. */
var HOME = { home: true, h: 3.5 }, LONG = { home: false, h: 7.5 }, SHORT = { home: false, h: 4 };
function nightCT(next) { return stopDays(CONTENT.cattien, { n: 2, start: 5 }, 0, 3, JAN, next).map(function (d) { return d.variant; }); }
eq(nightCT(undefined), [null, 'hard'], 'Cát Tiên, two nights, level 3, January, no leg given: the night at the lake, as before');
eq(nightCT(null), [null, 'hard'], 'a null leg is no restriction either');
eq(nightCT(SHORT), [null, 'hard'], 'a short leg after the stay: the night at the lake');
eq(nightCT(HOME), [null, null], 'the way home after the stay: the usual day');
eq(nightCT(LONG), [null, null], 'a long leg after the stay: the usual day');
eq([nightCT({ home: false, h: LONG_LEG_H })[1], nightCT({ home: false, h: LONG_LEG_H - 0.25 })[1]], [null, 'hard'],
  'a leg of LONG_LEG_H hours counts as long, a quarter of an hour less does not');
eq(stopDays(CONTENT.cattien, { n: 2, start: 5 }, 0, 3, JAN, HOME), stopDays(CONTENT.cattien, { n: 2, start: 5 }, 0, 2, JAN),
  'level 3 before the way home reads as the usual level: the usual day with its own early start and rain plan');
var FLATE = {
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'L1', d: 'l1' },
    { p: 3, o: 3, pace: 'culture', t: 'L3', d: 'l3' },
    { p: 2, o: 2, pace: 'hike', t: 'L2', d: 'l2', early: true, rain: 'rl',
      easy: { pace: 'nature', t: 'L2e', d: 'l2e', early: false }, hard: { pace: 'hike', t: 'L2h', d: 'l2h', late: true } }
  ],
  again: { pace: 'travel', t: 'LB', d: 'lb' }
};
eq(titles(stopDays(FLATE, { n: 3, start: 1 }, 0, 3, JAN, HOME)), ['1:L1', '2:L2h', '3:L3'], 'a late hard day that is not the last day of the stay stays, also before the way home');
eq(titles(stopDays(FLATE, { n: 2, start: 1 }, 0, 3, JAN, HOME)), ['1:L1', '2:L2'], 'the same day as the last day of a two-night stay goes before the way home');
eq(titles(stopDays(FLATE, { n: 2, start: 8 }, 1, 3, JAN, HOME)), ['8:LB', '9:L2'], 'a second stay: its last day too');
eq(titles(stopDays(FLATE, { n: 2, start: 8 }, 1, 3, JAN, SHORT)), ['8:LB', '9:L2h'], 'a second stay before a short leg: the hard day');
eq([stopDays(FLATE, { n: 2, start: 1 }, 0, 1, JAN, HOME)[1].t, stopDays(FLATE, { n: 2, start: 1 }, 0, 2, JAN, HOME)[1].t], ['L2e', 'L2'], 'levels 1 and 2 do not change before the way home');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 3, JAN, HOME)), ['1:A1', '2:A2h'], 'a hard version that is not late is kept before the way home');
eq([variantOf(FLATE.days[2], 3, 1, true).variant, variantOf(FLATE.days[2], 3, 1, false).variant, variantOf(FLATE.days[2], 3, 1).variant, variantOf(FLATE.days[2], 1, 1, true).variant],
  [null, 'hard', 'hard', 'easy'], 'variantOf: a late hard version is left out only when asked');
print('day plans ok');

/* ---------- dates and holidays ---------- */
eq(tripDate(null, 3), null, 'no start date');
eq(tripDate('2026-12-05', 1), '2026-12-05', 'day 1');
eq(tripDate('2026-12-05', 27), '2026-12-31', 'end of year');
eq(tripDate('2026-12-05', 28), '2027-01-01', 'new year');
function stOf(s) { return normSettings(s, PLACES, HUBS); }
eq(tripSpan(stOf({ from: 'SGN', to: 'HAN', start: '2027-01-30', end: '2027-02-03' })), ['2027-01-30', '2027-02-03'], 'span: the dates');
eq(tripSpan(stOf({ from: 'SGN', to: 'HAN', year: 2028, month: 2, days: 10 })), ['2028-02-01', '2028-02-29'], 'span: the whole month, a leap year');
eq(tripSpan(stOf({ from: 'SGN', to: 'HAN', month: 2, days: 10 })), null, 'span: a month without a year');
var FH = [['2027-01-01', '2027-01-01', 'holiday', 'Nowy Rok'], ['2027-02-05', '2027-02-10', 'tet', 'Tết'],
  ['2027-04-30', '2027-05-03', 'holiday', 'Dzień Zjednoczenia i Święto Pracy']];
function alerts(s) {
  var a = tripAlerts(stOf(s), FH, '2026-10-01', '2027-12-31', 7);
  return a.hits.map(function (h) { return h.name; }).concat(a.unknown ? ['?'] : []);
}
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-01-20', end: '2027-01-29' }), ['Tết'], 'a week before Tết counts');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-01-20', end: '2027-01-28' }), [], 'eight days before: not yet');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-02-17', end: '2027-02-25' }), ['Tết'], 'a week after Tết counts');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2026-12-27', end: '2027-01-05' }), ['Nowy Rok'], 'across the year end');
eq(alerts({ from: 'SGN', to: 'HAN', year: 2027, month: 5, days: 10 }), ['Dzień Zjednoczenia i Święto Pracy'], 'the month mode: the whole month');
eq(alerts({ from: 'SGN', to: 'HAN', year: 2027, month: 12, days: 30 }), [], 'a month with nothing');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-12-20', end: '2028-01-10' }), ['?'], 'past the list: no data');
eq(alerts({ from: 'SGN', to: 'HAN', month: 5, days: 10 }), ['?'], 'a month without a year: no data');
eq(fmtSpan('2027-02-06', '2027-02-12'), '6–12.02.2027', 'a span in one month');
eq(fmtSpan('2027-04-30', '2027-05-03'), '30.04–3.05.2027', 'a span over two months');
eq(fmtSpan('2030-12-28', '2031-01-02'), '28.12.2030–2.01.2031', 'a span over two years');
eq(fmtSpan('2027-01-01', '2027-01-01'), '1.01.2027', 'one day');
print('dates and holidays ok');

/* ---------- the trip ---------- */
var FR = { stops: [{ id: 'saigon', leg: { flights: 0, total: 0.5 } }, { id: 'dalat', leg: { flights: 1, total: 3.75 } },
  { id: 'hanoiStop', leg: { flights: 1, total: 6 } }, { id: 'saigon', leg: { flights: 1, total: 5 } }], home: { flights: 0, total: 0.5 } };
var FP = [[{ pace: 'travel' }], [{ pace: 'travel' }, { pace: 'hike' }, { pace: 'hike' }], [{ pace: 'travel' }], [{ pace: 'rest' }]];
eq(routeStats(FR, FP, PLACES), { places: 2, flights: 3, hikes: 2, longest: 6, road: 15.75 }, 'places once each, no night on the way; every leg and the way home');
var stO = stOf({ from: 'SGN', to: 'HAN', month: 3, days: 10, add: ['phuquoc'], remove: ['mekong'] });
eq(offRoute({ stops: [{ id: 'saigon' }, { id: 'dalat' }, { id: 'hanoi' }] }, stO, PLACES).map(function (x) { return x.id + (x.removed ? '-' : '') + (x.added ? '+' : ''); }),
  ['mekong-', 'phuquoc+', 'cattien', 'hoian', 'hue', 'puluong', 'ninhbinh', 'catba', 'babe', 'caobang'], 'off the trip, south to north, no night on the way');
var base = { from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: [], level: 2, add: ['catba'], remove: ['hoian'] };
eq([withAdded(base, 'hoian').add, withAdded(base, 'hoian').remove], [['catba', 'hoian'], []], 'Dodaj takes a place off the removed list');
eq([withRemoved(base, 'catba').add, withRemoved(base, 'catba').remove], [[], ['hoian', 'catba']], 'Usuń takes a place off the added list');
eq([withoutChanges(base).add, withoutChanges(base).remove, base.add, base.remove], [[], [], ['catba'], ['hoian']],
  'back to the trip without changes; the settings given stay as they were');
var FL = { stops: [{ leg: { total: 3.75 } }, { leg: { total: 7.5 } }, { leg: { total: 2 } }], home: { total: 3.5 } };
eq([legAfter(FL, 0), legAfter(FL, 1), legAfter(FL, 2)], [{ home: false, h: 7.5 }, { home: false, h: 2 }, { home: true, h: 3.5 }],
  'the leg after a stay: the leg into the next stay, or the way home after the last one');
function stopsOf(ids) { return ids.map(function (id) { return { id: id }; }); }
eq(droppedPlaces(stopsOf(['saigon', 'dalat', 'hue', 'hanoi']), stopsOf(['saigon', 'phuquoc', 'dalat', 'hanoi']), PLACES), ['hue'], 'dropped: on the old trip, not on the new one');
eq(droppedPlaces(stopsOf(['babe', 'caobang', 'hanoi', 'dalat']), stopsOf(['dalat', 'phuquoc']), PLACES), ['babe', 'caobang', 'hanoi'], 'dropped: in the order of the old trip');
eq(droppedPlaces(stopsOf(['saigon', 'hanoiStop', 'babe']), stopsOf(['saigon', 'babe']), PLACES), [], 'dropped: a night on the way is no place to report');
eq(droppedPlaces(stopsOf(['saigon', 'dalat', 'saigon']), stopsOf(['dalat', 'phuquoc']), PLACES), ['saigon'], 'dropped: a city twice on a round trip counts once');
eq(droppedPlaces(stopsOf(['saigon', 'dalat', 'saigon']), stopsOf(['saigon', 'phuquoc']), PLACES), ['dalat'], 'dropped: a city that is still there, once, is not dropped');
eq(droppedPlaces(stopsOf(['hanoi', 'babe']), stopsOf(['hanoiStop', 'babe']), PLACES), ['hanoi'], 'dropped: a city that became a night on the way is off the route, as "Poza trasą" lists it');
eq(droppedPlaces(stopsOf(['saigon', 'dalat']), stopsOf(['saigon', 'dalat', 'phuquoc']), PLACES), [], 'dropped: nothing, the new place only added');
eq(droppedPlaces([], stopsOf(['saigon']), PLACES), [], 'dropped: no old trip');
print('trip ok');

/* ---------- travel texts ---------- */
function road(a, b) { return segKey({ mode: 'road', from: a, to: b, h: 1 }, AIRPORTS, ROAD_KEYS); }
eq(road('HAN', 'hanoi'), ['r.taxi_from', { x: 'Hà Nội' }], 'from an airport');
eq(road('dalat', 'DLI'), ['r.taxi_to', { x: 'Đà Lạt' }], 'to an airport');
eq([road('hue', 'hoian'), road('hoian', 'hue')], [['r.haivan', {}], ['r.haivan', {}]], 'the Hải Vân pass, either way');
eq([road('cattien', 'dalat'), road('dalat', 'cattien')], [['r.car_baoloc', {}], ['r.car_baoloc', {}]], 'a road with its own text wins over the rule for Cát Tiên, either way');
eq([road('ninhbinh', 'catba'), road('saigon', 'cattien'), road('saigon', 'mekong'), road('hanoi', 'ninhbinh')],
  [['r.van_ferry', {}], ['r.car_cattien', {}], ['r.bus_mekong', {}], ['r.van_car', {}]], 'Cát Bà, Cát Tiên, the Mekong, any other road');
// one text serves both directions where it names none (content.test.js checks the words); the Mekong text names Phong Điền, so it has a form for each
eq([road('catba', 'ninhbinh'), road('cattien', 'saigon')], [['r.van_ferry', {}], ['r.car_cattien', {}]], 'the ferry and the Cát Tiên road read the same both ways');
eq([road('saigon', 'mekong'), road('mekong', 'saigon')], [['r.bus_mekong', {}], ['r.bus_mekong_from', {}]], 'the Mekong road: to Phong Điền and from Phong Điền');
eq([road('SGN', 'mekong'), road('mekong', 'SGN')], [['r.taxi_from', { x: AIRPORTS.SGN.name }], ['r.taxi_to', { x: AIRPORTS.SGN.name }]], 'an airport at either end wins over the Mekong text');
function L(total, segs, flights) { return { flights: flights || 0, total: total, segs: segs }; }
eq(legNotes(L(6.5, [{ mode: 'road', h: 2.5 }, { mode: 'fly', h: 1 }, { mode: 'road', h: 1.5 }], 1), { n: 2 }, false), ['n.afternoon'], 'a flight after 2.5 h of road');
eq(legNotes(L(4, [{ mode: 'road', h: 0.5 }, { mode: 'fly', h: 1 }, { mode: 'road', h: 1 }], 1), null, false), [], 'a short ride to the airport');
eq(legNotes(L(9.25, [{ mode: 'road', h: 9.25 }]), { n: 1 }, true), ['n.long', 'n.solo_long'], 'a long day after one night with a morning plan');
eq(legNotes(L(9.25, [{ mode: 'road', h: 9.25 }]), { n: 2 }, true), ['n.long'], 'after two nights: no warning about the morning');
eq(legNotes(L(6.5, [{ mode: 'road', h: 6.5 }]), { n: 1 }, false), [], 'one night without a morning plan');
print('travel texts ok');

/* ---------- Polish words (as in the December planner) ---------- */
[[1, 'one'], [2, 'few'], [3, 'few'], [4, 'few'], [0, 'many'], [5, 'many'], [11, 'many'], [12, 'many'], [13, 'many'], [14, 'many'],
 [21, 'many'], [22, 'few'], [24, 'few'], [25, 'many'], [112, 'many'], [122, 'few']].forEach(function (c) {
  eq(nightForm(c[0]), c[1], 'nightForm(' + c[0] + ')');
});
var NB = ' ';
eq(tieShort('Wietnam, z południa na północ'), 'Wietnam, z' + NB + 'południa na północ', 'z mid-text');
eq(tieShort('W domu'), 'W' + NB + 'domu', 'capital at the start');
eq(tieShort('i w domu'), 'i' + NB + 'w' + NB + 'domu', 'a run of one-letter words');
eq(tieShort('Hà Nội, a potem Huế i Hội An'), 'Hà Nội, a' + NB + 'potem Huế i' + NB + 'Hội An', 'a and i');
eq(tieShort('(w domu) i „o tym” oraz x–u nas'), '(w' + NB + 'domu) i' + NB + '„o' + NB + 'tym” oraz x–u' + NB + 'nas', 'after ( „ and –');
['dla przyjaciół', 'Đà Lạt i', 'ok. 5 km', 'XVIII wieku', 'C w', 'z' + NB + 'południa'].forEach(function (s) { eq(tieShort(s), s, 'unchanged: ' + s); });
eq(tieShort(tieShort('i w domu')), tieShort('i w domu'), 'idempotent');
print('words ok');
