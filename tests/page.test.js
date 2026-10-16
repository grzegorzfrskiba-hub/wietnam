/* The page's pure helpers (page.js), on made-up content and the real places. */
/* The trips pinned below plan with the 14 places of stages 1–2 and their roads and flights, so a place added later does
   not move them; the combination test (combos.test.js) plans with every place, and the places of stage 3 have checks of
   their own further down. */
var OLD_IDS = ['saigon', 'mekong', 'phuquoc', 'cattien', 'dalat', 'hoian', 'hue', 'puluong', 'ninhbinh', 'catba', 'hanoi', 'hanoiStop', 'babe', 'caobang'];
var OLD_AIRPORTS = ['SGN', 'HAN', 'DAD', 'HUI', 'DLI', 'PQC', 'VCA', 'HPH', 'THD'];
var OLD_PLACES = {};
OLD_IDS.forEach(function (id) { OLD_PLACES[id] = PLACES[id]; });
// Hội An with its nights of stages 1–2 (since batch B it has a third, with Mỹ Sơn)
OLD_PLACES.hoian = JSON.parse(JSON.stringify(PLACES.hoian));
OLD_PLACES.hoian.nights = [1, 2, 2];
function oldEnd(e) { return OLD_IDS.indexOf(e) > -1 || OLD_AIRPORTS.indexOf(e) > -1; }
var DATA_T = { places: OLD_PLACES, seasons: SEASONS, hubs: HUBS,
  graph: travelGraph(ROADS.filter(function (r) { return oldEnd(r[0]) && oldEnd(r[1]); }), FLIGHTS.filter(function (f) { return oldEnd(f[0]) && oldEnd(f[1]); })) };

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
eq([parseLink('#day-5&foo=1&constructor=%zz&toString=%zz', bad2), bad2], [{}, []], 'anchors, unknown keys and object properties are no link fields (a broken escape would name them)');
var bad3 = [];
eq([parseLink('#usun=hue,hoian,&miesiac=2027-3', bad3), bad3], [{}, ['remove', 'month']], 'an empty list item and a one-digit month are malformed');
var bad5 = [];
eq([parseLink('#start=2027-1-30&koniec=x&dni=x&dni=y', bad5), bad5], [{}, ['start', 'end', 'days']], 'broken dates are malformed; a field malformed twice is named once');
var bad6 = [];
eq([parseLink('#od=SGN&do', bad6), bad6], [{ from: 'SGN' }, ['to']], 'a link cut short: a known key without = is malformed');
var round = { from: 'DAD', to: 'SGN', year: 2027, month: 11, days: 21, interests: ['kultura'], level: 3, add: ['catba'], remove: ['hue', 'hoian'] };
eq(linkHash(round), '#od=DAD&do=SGN&miesiac=2027-11&dni=21&co=kultura&poziom=3&dodaj=catba&usun=hue,hoian', 'linkHash: the month');
eq(parseLink(linkHash(round)), round, 'linkHash, then parseLink: the same settings (the month)');
var roundD = { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', interests: [], level: 1, add: [], remove: [] };
eq(linkHash(roundD), '#od=HAN&do=HAN&start=2027-01-30&koniec=2027-02-12&co=&poziom=1', 'linkHash: dates; no interest is written, empty Dodaj and Usuń are not');
eq(parseLink(linkHash(roundD)), { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', interests: [], level: 1 }, 'linkHash, then parseLink (dates)');
// the swaps set to „Samodzielnie”: a list of small letters, written only when there are any
var badM = [];
eq([parseLink('#od=SGN&motocykl=caobang,haivan').moto, parseLink('#motocykl=Cao', badM), badM], [['caobang', 'haivan'], {}, ['moto']], 'motocykl: the swaps, small letters only');
var roundM = Object.assign({}, round, { moto: ['caobang'] });
eq(linkHash(roundM), linkHash(round) + '&motocykl=caobang', 'linkHash: the swaps last, only when there are any');
eq(parseLink(linkHash(roundM)), roundM, 'linkHash, then parseLink: the same settings (with a swap)');
// the language (stage 5): Polish only with lang=pl, English otherwise, also with another value or none; the language is no
// setting of the trip, so parseLink leaves it out and names no wrong field
eq(['#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2', '#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2&lang=pl', '#lang=pl&od=SGN', '#od=SGN&lang=en',
  '#od=SGN&lang=', '#od=SGN&lang', '#od=SGN&lang=PL', '#od=SGN&lang=pl2', '', '#day-5'].map(langOf), ['en', 'pl', 'pl', 'en', 'en', 'en', 'en', 'en', 'en', 'en'],
  'langOf: Polish only with lang=pl');
var badL = [];
eq([parseLink('#od=SGN&lang=pl', badL), parseLink('#od=SGN&lang=xx', badL), badL], [{ from: 'SGN' }, { from: 'SGN' }, []], 'parseLink leaves the language out and names no wrong field');
eq([langHash(round, 'pl'), langHash(round, 'en')], [linkHash(round) + '&lang=pl', linkHash(round)], 'langHash: lang=pl at the end in Polish, nothing in English');
eq(parseLink(langHash(roundM, 'pl')), roundM, 'langHash, then parseLink: the same settings');
// the trip as the folded rows of „Dzień po dniu” see it (the first round of fixes): its stays with their days, so a change
// that keeps them keeps the open days open, and another trip closes them
var KEY_A = { stops: [{ id: 'saigon', start: 1, n: 3 }, { id: 'dalat', start: 4, n: 3 }], days: 7 };
eq([tripKey(KEY_A), tripKey({ stops: KEY_A.stops, days: 8 }), tripKey({ stops: [KEY_A.stops[0], { id: 'dalat', start: 4, n: 2 }], days: 7 })],
  ['saigon 1 3, dalat 4 3 / 7', 'saigon 1 3, dalat 4 3 / 8', 'saigon 1 3, dalat 4 2 / 7'], 'tripKey: the stays with their first day and nights, and the days of the trip');
// the texts of the places in a language: the overlay's texts over the Polish ones, the data kept, the base unchanged
var BASE_T = { a: { name: 'Miejsce', short: 'A', pt: [1, 2], days: [{ p: 1, t: 'Dzień', d: 'Opis.', cost: ['x.y'], easy: { pace: 'rest', t: 'Łatwo', d: 'Spokojnie.' } }],
  events: [{ from: [1, 1], to: [2, 1], t: 'Uwaga.' }] } };
var OVER_T = { a: { name: 'Place', short: 'A', days: [{ t: 'Day', d: 'Text.', easy: { t: 'Easy', d: 'Relaxed.' } }], events: [{ t: 'Note.' }] } };
eq(localContent(BASE_T, OVER_T), { a: { name: 'Place', short: 'A', pt: [1, 2], days: [{ p: 1, t: 'Day', d: 'Text.', cost: ['x.y'], easy: { pace: 'rest', t: 'Easy', d: 'Relaxed.' } }],
  events: [{ from: [1, 1], to: [2, 1], t: 'Note.' }] } }, 'localContent: the texts of the overlay, the data of the base');
eq([BASE_T.a.name, localContent(BASE_T, null) === BASE_T, localContent(BASE_T, {}).a.name], ['Miejsce', true, 'Miejsce'],
  'the base stays as it was; without an overlay, or without one for a place, the Polish texts');
print('link ok');

/* ---------- the defaults and the settings a link opens ---------- */
var HOL = { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS };
var DEF = defaultSettings('2026-10-10', DATA_T, HOL);
eq([DEF.from, DEF.to, DEF.days, DEF.interests, DEF.level, DEF.add, DEF.remove], ['SGN', 'HAN', 15, [], 2, [], []],
  'the defaults: Hồ Chí Minh City → Hà Nội, 15 days, no interest, level 2');
/* The month of the defaults: the best of the 12 after today's by the trip's score; a tie goes to the month with fewer
   holidays, then to the earlier one. The test checks the rule, not a month: the best month moves with the data. */
function bestMonthOk(today) {
  var d = defaultSettings(today, DATA_T, HOL), y = +today.slice(0, 4), m = +today.slice(5, 7), rated = [];
  for (var k = 1; k <= 12; k++) {
    var mm = m + k, yy = y;
    while (mm > 12) { mm -= 12; yy++; }
    var st = normSettings(Object.assign({}, d, { year: yy, month: mm }), PLACES, HUBS);
    rated.push({ year: yy, month: mm, score: planRoute(st, DATA_T).score, hol: tripAlerts(st, HOL.list, HOL.from, HOL.until, HOL.tetMargin).hits.length });
  }
  var me = rated.filter(function (x) { return x.year === d.year && x.month === d.month; })[0];
  ok(me, today + ': the default month is one of the 12 after it');
  rated.forEach(function (x) {
    var tie = Math.abs(x.score - me.score) <= 1e-9;
    ok(!(x.score > me.score + 1e-9 || (tie && x.hol < me.hol) || (tie && x.hol === me.hol && x.year * 12 + x.month < me.year * 12 + me.month)),
      today + ': ' + x.year + '-' + x.month + ' should be the default month, not ' + d.year + '-' + d.month);
  });
}
['2026-10-10', '2027-02-15', '2027-06-30', '2027-12-31'].forEach(bestMonthOk);
function opened(hash) { return settingsFromLink(parseLink(hash), DEF, PLACES, HUBS); }
var g1 = opened('#od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3');
eq([g1.settings.from, g1.settings.to, g1.settings.year, g1.settings.month, g1.settings.days, g1.settings.interests, g1.settings.level, g1.dropped, g1.st.ok],
  ['HAN', 'DAD', 2027, 3, 12, ['kultura'], 3, [], true], 'a good link opens as it is');
var g2 = opened('#od=XYZ&do=DAD&dni=40&co=kultura,jedzenie,morze&poziom=7');
eq([g2.settings.from, g2.settings.to, g2.settings.days, g2.settings.interests, g2.settings.level, g2.dropped.slice().sort()],
  ['SGN', 'DAD', 15, [], 2, ['days', 'from', 'interests', 'level']], 'refused fields go back to the defaults, the good ones stay');
var g3 = opened('#od=SGN&do=HAN&start=2027-01-01&koniec=2027-03-01');
eq(['start' in g3.settings, g3.st.start, g3.st.month, g3.st.days, g3.dropped.slice().sort()], [false, null, DEF.month, 15, ['end', 'start']],
  'dates over 30 days: back to the month of the defaults');
var g4 = opened('#od=SGN&do=HAN&start=2027-01-30');
eq([g4.st.start, g4.dropped], [null, ['start']], 'a start without an end: back to the month');
var g5 = opened('#od=SGN&do=HAN&dodaj=hanoiStop,phuquoc&usun=hanoiStop');
eq([g5.settings.add, g5.settings.remove, g5.st.add, g5.dropped], [['phuquoc'], [], ['phuquoc'], []], 'a night on the way gets no Dodaj or Usuń, also from a link');
var g6 = opened('#miesiac=1999-05');
eq([g6.st.year, g6.st.month, g6.dropped], [DEF.year, 5, ['year']], 'a year the engine refuses: the default year, the month stays');
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
var g11 = opened('#od=SGN&do=HAN&koniec=2027-02-12');
eq([g11.st.start, 'end' in g11.settings, g11.dropped], [null, false, ['end']], 'an end without a start: the month of the defaults, and the end is reported');
var g12 = opened('#od=SGN&do=HAN&start=2027-01-30&koniec=2027-02-03&miesiac=2027-05&dni=9');
eq([g12.st.start, g12.st.days, 'year' in g12.settings, 'month' in g12.settings, 'days' in g12.settings, g12.dropped],
  ['2027-01-30', 5, false, false, false, ['year', 'month', 'days']], 'dates win: a month and days next to them are reported and left out');
var g13 = opened('#od=SGN&do=HAN&miesiac=2026-05&dni=10');
eq([g13.settings.year, g13.settings.month, g13.dropped], [2026, 5, []], 'a month already past stays in the settings (the page says the term has passed)');
eq([DEF.add, DEF.days], [[], 15], 'the defaults stay as they were');
var mc = monthChoices('2026-10-10', 2030);
eq([mc.length, mc[0], mc[mc.length - 1]], [51, { year: 2026, month: 10 }, { year: 2030, month: 12 }], 'the months: from this one to December 2030');
eq(monthChoices('2031-03-01', 2030).pop(), { year: 2032, month: 12 }, 'past the holiday list: still a year ahead');
eq([clampToday('1970-01-01', '2026-10-01', 2030), clampToday('2101-05-05', '2026-10-01', 2030), clampToday('2027-03-15', '2026-10-01', 2030)],
  ['2026-10-01', '2030-12-01', '2027-03-15'], 'today: a clock before the list starts goes to its first day, one past the last year to December 1 of it, a good one stays');
eq([clampToday('2026-10-01', '2026-10-01', 2030), clampToday('2030-12-01', '2026-10-01', 2030), clampToday('2030-12-02', '2026-10-01', 2030), clampToday('2026-09-30', '2026-10-01', 2030)],
  ['2026-10-01', '2030-12-01', '2030-12-01', '2026-10-01'], 'today: the two edges stay, a day outside goes to the edge');
['1970-01-01', '1999-12-31', '2026-09-30', '2030-12-31', '2101-05-05', '9999-12-31'].forEach(function (t) {
  var d = defaultSettings(clampToday(t, '2026-10-01', 2030), DATA_T, HOL), got = settingsFromLink({}, d, PLACES, HUBS);
  ok(normSettings(d, PLACES, HUBS).ok && got.st.ok && got.dropped.length === 0, 'a device clock of ' + t + ' still gives defaults the engine accepts');
  ok(monthChoices(clampToday(t, '2026-10-01', 2030), 2030).length <= 51 + 12, 'a device clock of ' + t + ' still gives a short list of months');
});
var gM = settingsFromLink(parseLink('#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2&motocykl=caobang,xyz,caobang'), DEF, PLACES, HUBS, [], SWAPS);
eq([gM.settings.moto, gM.dropped], [['caobang'], ['moto']], 'a link: known swaps, each once; an unknown one is dropped and reported');
eq([opened('#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2').settings.moto, DEF.moto], [[], []], 'no swap in the link or the defaults: none');
eq([withSwap(DEF, 'caobang', true).moto, withSwap(withSwap(DEF, 'caobang', true), 'caobang', false).moto, withAdded(withSwap(DEF, 'haivan', true), 'mekong').moto,
  withoutChanges(withSwap(DEF, 'haivan', true)).moto], [['caobang'], [], ['haivan'], ['haivan']], 'withSwap sets a swap and takes it back; Dodaj and „Wróć do trasy” keep it');
eq(selfSwaps(['caobang', 'haivan'], SWAPS), { places: { caobang: true }, roads: { 'hoian-hue': { text: 'r.haivan_self', cost: 'haivan.moto' }, 'danang-hue': { text: 'r.haivan_self', cost: 'haivan.moto_dn' } } },
  'selfSwaps: the place whose days go self, the road with its text and cost');
print('settings ok');

/* ---------- day plans ---------- */
var FC = {
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'A1', d: 'a1', cost: ['x.a1'], solo: { pace: 'boat', t: 'A1s', d: 'a1s', early: true } },
    { p: 3, o: 2, pace: 'rest', t: 'A3', d: 'a3' },
    { p: 2, o: 3, pace: 'hike', t: 'A2', d: 'a2', early: true, rain: 'r2', cost: ['x.a2', ['x.car', 'x.rider']], pack: ['leeches'],
      easy: { pace: 'nature', t: 'A2e', d: 'a2e', early: false, cost: ['x.a2e'] }, hard: { pace: 'hike', t: 'A2h', d: 'a2h', off: [7, 8], cost: [] } }
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
eq([titles(stopDays(FC, { n: 3, start: 1 }, 0, 3, [0, 0, 6, 6])), titles(stopDays(FC, { n: 3, start: 1 }, 0, 3, [6, 6, 0, 0]))],
  [['1:A1', '2:A3', '3:A2'], ['1:A1', '2:A3', '3:A2h']], 'level 3 over two months: the month of each day decides (A2, on day 3, is off in July)');
var dU = stopDays(FC, { n: 2, start: 1 }, 0, 2, JAN)[1], dE = stopDays(FC, { n: 2, start: 1 }, 0, 1, JAN)[1], dH = stopDays(FC, { n: 2, start: 1 }, 0, 3, JAN)[1];
eq([dU.pace, dU.early, dU.rain, dU.variant], ['hike', true, 'r2', null], 'the usual day');
eq([dE.pace, dE.early, dE.rain, dE.variant], ['nature', false, 'r2', 'easy'], 'the easy version: its own pace and early start, the day\'s rain plan');
eq([dH.early, dH.rain, dH.variant], [true, 'r2', 'hard'], 'the hard version keeps the day\'s early start and rain plan');
eq([dU.cost, dU.pack, dE.cost, dE.pack, dH.cost], [['x.a2', ['x.car', 'x.rider']], ['leeches'], ['x.a2e'], ['leeches'], []],
  'cost and pack: the day\'s; a version\'s own cost wins, one without keeps the day\'s (pack too), [] means none');
eq([stopDays(FC, { n: 1, start: 1 }, 0, 2, JAN)[0].cost, stopDays(FC, { n: 2, start: 8 }, 1, 2, JAN)[0].cost], [[], []], 'a solo plan and again: their own cost only');
eq(titles(stopDays(FC, { n: 2, start: 8 }, 1, 2, JAN)), ['8:B1', '9:A2'], 'a second stay after one night: again, then the next plan by p');
eq(titles(stopDays(FC, { n: 1, start: 9 }, 2, 2, JAN)), ['9:B1'], 'a second stay of one night: again only');
function cb(level, self) { return stopDays(CONTENT.caobang, { n: 3, start: 1 }, 0, level, JAN, null, self).map(function (d) { return [d.variant, d.cost]; }); }
eq([cb(2, false), cb(1, false), cb(1, true), cb(3, true)],
  [[[null, []], [null, [['caobang.car', 'caobang.easyrider']]], [null, [['caobang.car', 'caobang.easyrider']]]],
   [[null, []], [null, [['caobang.car', 'caobang.easyrider']]], [null, [['caobang.car', 'caobang.easyrider']]]],
   [['self', []], ['self', ['caobang.moto']], ['self', ['caobang.moto']]], [['self', []], ['self', ['caobang.moto']], ['self', ['caobang.moto']]]],
  'Cao Bằng ridden yourself: every day of the loop takes its self version, at every level, with the motorbike as its cost');
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
/* A hard version over two days (hard.next): its night is away (late), and the next day of the stay is the trip's second day.
   Both or neither: without a next day in the stay, or with the first day in a month off, the usual days. */
var FTWO = {
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'T1', d: 't1' },
    { p: 2, o: 2, pace: 'nature', t: 'T2', d: 't2', rain: 'rt', easy: { pace: 'nature', t: 'T2e', d: 't2e' },
      hard: { pace: 'hike', t: 'H1', d: 'h1', late: true, off: [10, 11], cost: ['x.trip'], next: { pace: 'hike', t: 'H2', d: 'h2', early: true } } },
    { p: 3, o: 3, pace: 'boat', t: 'T3', d: 't3', cost: ['x.boat'] },
    { p: 4, o: 4, pace: 'rest', t: 'T4', d: 't4' }
  ]
};
function vt(days) { return days.map(function (d) { return d.day + ':' + d.t + (d.variant ? '/' + d.variant : ''); }); }
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, JAN)), ['1:T1', '2:H1/hard', '3:H2/hard'], 'two days at level 3: the day and the next one of the stay');
eq(vt(stopDays(FTWO, { n: 4, start: 1 }, 0, 3, JAN)), ['1:T1', '2:H1/hard', '3:H2/hard', '4:T4'], 'four nights: the plan after the two days stays');
eq(vt(stopDays(FTWO, { n: 2, start: 1 }, 0, 3, JAN)), ['1:T1', '2:T2'], 'two nights: no next day in the stay, so the usual day');
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, [8, 8, 9])), ['1:T1', '2:H1/hard', '3:H2/hard'], 'the first day decides: two days from 30 September run into October');
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, [9, 9, 9])), ['1:T1', '2:T2', '3:T3'], 'the first day in a month off: neither');
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, JAN, HOME)), ['1:T1', '2:H1/hard', '3:H2/hard'],
  'before the way home: the second day, back in the afternoon, may be the last day of the stay');
eq([vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 2, JAN)), vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 1, JAN))],
  [['1:T1', '2:T2', '3:T3'], ['1:T1', '2:T2e/easy', '3:T3']], 'levels 2 and 1: the usual and the easy days');
var TWO = stopDays(FTWO, { n: 3, start: 1 }, 0, 3, JAN);
eq([TWO[1].cost, TWO[2].cost, TWO[2].pack, TWO[2].early, TWO[2].rain, TWO[1].rain], [['x.trip'], [], [], true, null, 'rt'],
  'the second day: its own cost (none), pack and early start, no rain plan; the first keeps the day\'s rain plan');
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
eq(alerts({ from: 'SGN', to: 'HAN', start: '2026-09-25', end: '2026-10-03' }), ['?'], 'a trip that starts before the list: no data for part of it');
eq(alerts({ from: 'SGN', to: 'HAN', month: 5, days: 10 }), ['?'], 'a month without a year: no data');
eq(fmtSpan('2027-02-06', '2027-02-12'), '6–12.02.2027', 'a span in one month');
eq(fmtSpan('2027-04-30', '2027-05-03'), '30.04–3.05.2027', 'a span over two months');
eq(fmtSpan('2030-12-28', '2031-01-02'), '28.12.2030–2.01.2031', 'a span over two years');
eq(fmtSpan('2027-01-01', '2027-01-01'), '1.01.2027', 'one day');
// in English (stage 5), with the short names of the months: the day, the month's name and the year; a span over two months
// or two years with a spaced dash between whole dates
var MON3_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
eq([fmtSpan('2027-02-06', '2027-02-12', MON3_EN), fmtSpan('2027-04-30', '2027-05-03', MON3_EN), fmtSpan('2030-12-28', '2031-01-02', MON3_EN), fmtSpan('2027-01-01', '2027-01-01', MON3_EN)],
  ['6–12 Feb 2027', '30 Apr – 3 May 2027', '28 Dec 2030 – 2 Jan 2031', '1 Jan 2027'], 'English spans: in one month, over two months, over two years, one day');
var TODAY_T = '2026-10-11';
eq([termPassed(stOf({ from: 'SGN', to: 'HAN', year: 2026, month: 9, days: 10 }), TODAY_T), termPassed(stOf({ from: 'SGN', to: 'HAN', year: 2026, month: 10, days: 10 }), TODAY_T),
  termPassed(stOf({ from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 10 }), TODAY_T)], [true, false, false], 'term passed, the month mode: an earlier month yes, this month and a later one no');
eq([termPassed(stOf({ from: 'SGN', to: 'HAN', year: 2026, month: 10, days: 10 }), '2026-10-31'), termPassed(stOf({ from: 'SGN', to: 'HAN', year: 2026, month: 10, days: 10 }), '2026-11-01')],
  [false, true], 'term passed, the month mode: the last day of the month still counts, the next day does not');
eq([termPassed(stOf({ from: 'SGN', to: 'HAN', start: '2026-08-01', end: '2026-08-10' }), TODAY_T), termPassed(stOf({ from: 'SGN', to: 'HAN', start: '2026-10-05', end: '2026-10-11' }), TODAY_T),
  termPassed(stOf({ from: 'SGN', to: 'HAN', start: '2026-10-05', end: '2026-10-10' }), TODAY_T), termPassed(stOf({ from: 'SGN', to: 'HAN', start: '2027-01-30', end: '2027-02-03' }), TODAY_T)],
  [true, false, true, false], 'term passed, dates: the end date decides (today is still in the trip), a later trip no');
eq(termPassed(stOf({ from: 'SGN', to: 'HAN', month: 2, days: 10 }), TODAY_T), false, 'term passed: a month without a year has no span, so no');
print('dates and holidays ok');

/* ---------- weather, events and the season of an interest ---------- */
var MAR = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], MARAPR = [2, 2, 3, 3, 3, 3, 3, 3, 3, 3];
eq(stayWeather({ id: 'hue', start: 3, n: 2 }, MAR, CLIMATE, SEASONS), [{ month: 3, season: 'D', t: [20, 28], mm: 51, days: 10, why: [] }],
  'the weather of a stay: its month, rounded as the page shows it');
eq(stayWeather({ id: 'saigon', start: 2, n: 2 }, MARAPR, CLIMATE, SEASONS).map(function (w) { return [w.month, w.season, w.t, w.why]; }),
  [[3, 'D', [25, 34], []], [4, 'S', [26, 35], ['upal']]], 'a stay over two months: both, each with its reasons');
var FCL = { rain: [[90, 10], [80, 9.4], [70, 9.6]] };
eq([rainyMonth(FCL, 1), rainyMonth(FCL, 2), rainyMonth(FCL, 3), RAIN_PLAN_DAYS], [true, false, true, 10],
  'the rain plan from 10 days of rain, counted as the page rounds them (9.6 shows as 10)');
eq([rainyMonth(CLIMATE.saigon, 2), rainyMonth(CLIMATE.saigon, 9)], [false, true], 'Hồ Chí Minh City: no rain plan in February, one in September');
var FEV = { events: [{ from: [5, 25], to: [6, 15], t: 'A' }, { from: [11, 1], to: [4, 30], t: 'B' }, { from: [12, 24], to: [12, 26], t: 'C', warn: true }] };
function evs(st, stop) { return stayEvents(FEV, stop, st).map(function (e) { return e.t; }); }
var stJun = stOf({ from: 'SGN', to: 'HAN', start: '2027-06-13', end: '2027-06-20' });
eq([evs(stJun, { start: 2, n: 2 }), evs(stJun, { start: 4, n: 2 })], [['A'], []], 'dates: an event on the last day of its window counts, the day after not');
eq(evs(stOf({ from: 'SGN', to: 'HAN', start: '2027-12-29', end: '2028-01-05' }), { start: 1, n: 5 }), ['B'], 'a window over the new year, and a stay over it');
eq([evs(stOf({ from: 'SGN', to: 'HAN', year: 2027, month: 12, days: 10 }), { start: 1, n: 3 }), evs(stOf({ from: 'SGN', to: 'HAN', year: 2027, month: 7, days: 10 }), { start: 1, n: 3 })],
  [['B', 'C'], []], 'the month mode: the whole month counts, as for the holidays');
eq(stayEvents({ days: [] }, { start: 1, n: 2 }, stJun), [], 'a place without events');
function alertsOf(s) { var st = stOf(s); return interestAlerts(planRoute(st, DATA_T), st, PLACES, CLIMATE); }
eq(alertsOf({ from: 'HAN', to: 'DAD', year: 2027, month: 9, days: 7, interests: ['morze'], level: 2 }), [{ interest: 'morze', ids: ['catba'], why: ['tajfuny'], months: [9] }],
  'the sea in September: Cát Bà, the only sea on the trip, in its typhoon season');
eq(alertsOf({ from: 'DAD', to: 'DAD', year: 2027, month: 7, days: 5, interests: ['morze', 'kultura'], level: 2 }), [{ interest: 'morze', none: true }],
  'five days from Đà Nẵng in July: no place on the trip for the sea; culture is served');
eq(alertsOf({ from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: ['morze'], level: 2 }), [], 'the sea in March: Phú Quốc in a good season, no alert');
eq(alertsOf({ from: 'HAN', to: 'DAD', year: 2027, month: 9, days: 7, interests: [], level: 2 }), [], 'no interest chosen: no alert');
print('weather and events ok');

/* ---------- the trip ---------- */
var FR = { stops: [{ id: 'saigon', leg: { flights: 0, total: 0.5 } }, { id: 'dalat', leg: { flights: 1, total: 3.75 } },
  { id: 'hanoiStop', leg: { flights: 1, total: 6 } }, { id: 'saigon', leg: { flights: 1, total: 5 } }], home: { flights: 0, total: 0.5 } };
var FP = [[{ pace: 'travel' }], [{ pace: 'travel' }, { pace: 'hike' }, { pace: 'hike' }], [{ pace: 'travel' }], [{ pace: 'rest' }]];
eq(routeStats(FR, FP, PLACES), { places: 2, flights: 3, hikes: 2, longest: 6, road: 15.75 }, 'places once each, no night on the way; every leg and the way home');
var base = { from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: [], level: 2, add: ['catba'], remove: ['hoian'] };
eq([withAdded(base, 'hoian').add, withAdded(base, 'hoian').remove], [['catba', 'hoian'], []], 'Dodaj takes a place off the removed list');
eq([withRemoved(base, 'catba').add, withRemoved(base, 'catba').remove], [[], ['hoian', 'catba']], 'Usuń takes a place off the added list');
eq([withoutChanges(base).add, withoutChanges(base).remove, base.add, base.remove], [[], [], ['catba'], ['hoian']],
  'back to the trip without changes; the settings given stay as they were');
var FL = { stops: [{ leg: { total: 3.75 } }, { leg: { total: 7.5 } }, { leg: { total: 2 } }], home: { total: 3.5 } };
eq([legAfter(FL, 0), legAfter(FL, 1), legAfter(FL, 2)], [{ home: false, h: 7.5, ferry: false }, { home: false, h: 2, ferry: false }, { home: true, h: 3.5, ferry: false }],
  'the leg after a stay: the leg into the next stay, or the way home after the last one');
var FC = { stops: [{ id: 'yokdon', leg: { total: 1.25 } }, { id: 'cattien', leg: { total: 6 } }], home: { total: 3.75 } };
eq([legAfter(FC, 0, FERRY), legAfter(FC, 0), legAfter(FC, 1, FERRY)], [{ home: false, h: 6, ferry: true }, { home: false, h: 6, ferry: false }, { home: true, h: 3.75, ferry: false }],
  'the leg into a place behind a ferry (FERRY) says so; without FERRY no leg does');
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

/* ---------- why a place is on the trip or not ---------- */
function tripOf(s, data) { var st = stOf(s); return { st: st, r: planRoute(st, data || DATA_T) }; }
var MARCH = { from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: [], level: 2, add: [], remove: [] };
var tA = tripOf(MARCH);   // saigon 3, dalat 3, hoian 2, hue 3, hanoi 3, all D
eq(tA.r.stops.map(function (s) { return s.id; }), ['saigon', 'dalat', 'hoian', 'hue', 'hanoi'], 'the trip the next checks read');
eq(whyOn(tA.r, 0, tA.st, PLACES, HUBS), { added: false, airport: 'from', interests: ['jedzenie', 'kultura'], way: false, months: [{ month: 3, season: 'D' }] },
  'the arrival city, no interest chosen: its two strongest interests, the strongest first');
eq([whyOn(tA.r, 4, tA.st, PLACES, HUBS).airport, whyOn(tA.r, 4, tA.st, PLACES, HUBS).interests, whyOn(tA.r, 1, tA.st, PLACES, HUBS).airport],
  ['to', ['kultura', 'jedzenie'], null], 'the departure city; a tie goes in the order of INTERESTS; a stay in the middle is no airport\'s city');
var tB = tripOf(Object.assign({}, MARCH, { interests: ['przyroda'] }));   // saigon 2, cattien 2, dalat 4, ninhbinh 2, catba 4
eq([whyOn(tB.r, 0, tB.st, PLACES, HUBS).interests, whyOn(tB.r, 0, tB.st, PLACES, HUBS).way, whyOn(tB.r, 1, tB.st, PLACES, HUBS).interests, whyOn(tB.r, 1, tB.st, PLACES, HUBS).way],
  [[], false, ['przyroda'], false], 'nature chosen: the arrival city serves it not, but it is the airport\'s city (no "po drodze"); Cát Tiên serves it');
var tC = tripOf(Object.assign({}, MARCH, { interests: ['gory'] }));   // cattien, dalat, ninhbinh, babe, caobang, hanoi 1
eq([whyOn(tC.r, 0, tC.st, PLACES, HUBS).way, whyOn(tC.r, 0, tC.st, PLACES, HUBS).interests], [true, []], 'mountains chosen: Cát Tiên (fit 1) fills the days on the way');
var tD = tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['przyroda', 'gory'], level: 2 });   // ninhbinh, catba, hanoiStop, babe, caobang, hanoi
eq(whyOn(tD.r, 2, tD.st, PLACES, HUBS), { night: ['catba', 'babe'] }, 'a night on the way: the places before and after it');
eq([whyOn(tD.r, 4, tD.st, PLACES, HUBS).interests, whyOn(tD.r, 1, tD.st, PLACES, HUBS).interests], [['przyroda', 'gory'], ['przyroda']],
  'Cao Bằng serves both chosen interests, Cát Bà (mountains 1) one');
var tG = tripOf({ from: 'SGN', to: 'HAN', start: '2027-03-28', end: '2027-04-12', interests: [], level: 2 });   // saigon 3, dalat 3, hoian 2, catba 4, hanoi 3
eq([whyOn(tG.r, 0, tG.st, PLACES, HUBS).months, whyOn(tG.r, 1, tG.st, PLACES, HUBS).months], [[{ month: 3, season: 'D' }], [{ month: 3, season: 'D' }, { month: 4, season: 'D' }]],
  'dates: Hồ Chí Minh City on 28–30 March, Đà Lạt from 31 March into April, each month once');
var tI = tripOf(Object.assign({}, MARCH, { add: ['mekong'] }));
eq(whyOn(tI.r, 1, tI.st, PLACES, HUBS).added, true, 'a place Dodaj asked for');

function offOf(t, settings, data) { return whyOff(t.r, settings, t.st, data || DATA_T, CLIMATE); }
var oA = offOf(tA, MARCH), byId = function (list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; };
eq(oA.map(function (x) { return x.id; }), ['mekong', 'phuquoc', 'cattien', 'puluong', 'ninhbinh', 'catba', 'babe', 'caobang'], 'off the trip: south to north, no night on the way');
eq([byId(oA).mekong.reasons, byId(oA).mekong.canAdd, byId(oA).mekong.drops], [['beaten'], true, droppedPlaces(tA.r.stops, tI.r.stops, PLACES)],
  'the Mekong in March: nothing against it, other places won; Dodaj, and what it would push off the trip');
eq([byId(oA).mekong.shorter, byId(oA).catba.drops, byId(oA).catba.shorter], [['saigon', 'hue'], ['hue'], []],
  'the Mekong fits without pushing a place off, but shortens the stays in Hồ Chí Minh City and Huế; Cát Bà pushes Huế off');
var tF = tripOf(Object.assign({}, MARCH, { month: 7 })), oF = byId(offOf(tF, Object.assign({}, MARCH, { month: 7 })));
eq([oF.phuquoc.reasons, oF.phuquoc.why, oF.phuquoc.canAdd], [['season'], ['ulewy', 'fale'], true], 'Phú Quốc in July: out of season, with the reasons of July');
var oB = byId(offOf(tB, Object.assign({}, MARCH, { interests: ['przyroda'] })));
eq([oB.hoian.reasons.indexOf('profile') > -1, oB.puluong.reasons.indexOf('profile') > -1], [true, false], 'nature chosen: Hội An (fit 0) is no match, Pù Luông (fit 2) is');
var E5 = { from: 'SGN', to: 'SGN', year: 2027, month: 3, days: 5, interests: [], level: 2, add: [], remove: [] }, oE = byId(offOf(tripOf(E5), E5));
eq([oE.caobang.reasons, oE.caobang.canAdd, oE.caobang.drops], [['far'], false, []], 'Cao Bằng on five days from Hồ Chí Minh City: too far, no Dodaj');
var E5add = Object.assign({}, E5, { add: ['caobang'] }), oE2 = byId(offOf(tripOf(E5add), E5add));
eq([oE2.caobang.added, oE2.caobang.reasons, oE2.caobang.canAdd], [true, ['far'], false], 'asked for with Dodaj and not fitted: still too far, marked as added');
var H = Object.assign({}, MARCH, { remove: ['hoian'] }), oH = byId(offOf(tripOf(H), H));
eq([oH.hoian.reasons, oH.hoian.canAdd], [['removed'], true], 'removed with Usuń: said so, and Dodaj brings it back');
// a place that needs a higher level, and one closed all the trip: made up, since none of the 12 places is either yet
var P3 = JSON.parse(JSON.stringify(OLD_PLACES)), S3 = JSON.parse(JSON.stringify(SEASONS));
P3.catba.level = 3; S3.babe = 'XXXXXXXXXXXX';
var D3 = { places: P3, seasons: S3, graph: DATA_T.graph, hubs: HUBS }, st3 = normSettings(MARCH, P3, HUBS), o3 = byId(whyOff(planRoute(st3, D3), MARCH, st3, D3, CLIMATE));
eq([o3.catba.reasons, o3.catba.canAdd, o3.babe.reasons, o3.babe.canAdd], [['level'], false, ['closed'], false], 'a higher level and a closed place: no Dodaj');
eq(whyOff(planRoute(normSettings(Object.assign({}, MARCH, { level: 3 }), P3, HUBS), D3), Object.assign({}, MARCH, { level: 3 }), normSettings(Object.assign({}, MARCH, { level: 3 }), P3, HUBS), D3, CLIMATE)
  .filter(function (x) { return x.id === 'catba'; })[0].reasons.indexOf('level'), -1, 'at the level it needs, the level is no reason');
// closed (X) in part of the term and not fitted around it: closed in part of the term, not too far (made up: Cao Bằng closed
// in April, on a trip from 28 March that cannot reach it in March)
var S4 = JSON.parse(JSON.stringify(SEASONS));
S4.caobang = 'SSSXSSSSDDDS';
var D4 = { places: OLD_PLACES, seasons: S4, graph: DATA_T.graph, hubs: HUBS }, M4 = { from: 'SGN', to: 'HAN', start: '2027-03-28', end: '2027-04-11', interests: [], level: 2, add: [], remove: [] };
var st4 = normSettings(M4, PLACES, HUBS), o4 = byId(whyOff(planRoute(st4, D4), M4, st4, D4, CLIMATE)), o4s = byId(whyOff(planRoute(st4, DATA_T), M4, st4, DATA_T, CLIMATE));
eq([o4.caobang.reasons, o4.caobang.canAdd, o4s.caobang.reasons, o4s.caobang.canAdd], [['closed_part'], false, ['beaten'], true],
  'closed in part of the term and not fitted around it: said so, no Dodaj; open all the term, the same trip could take it');

function nightsOf(list) { return list.map(function (x) { return { id: x[0], n: x[1] }; }); }
eq(shortenedPlaces(nightsOf([['saigon', 3], ['hue', 3], ['hanoi', 3]]), nightsOf([['saigon', 2], ['mekong', 2], ['hue', 2], ['hanoi', 3]]), PLACES), ['saigon', 'hue'],
  'shortened: the places that stay with fewer nights, in the order of the old trip');
eq(shortenedPlaces(nightsOf([['hanoi', 2], ['catba', 3], ['hanoiStop', 1], ['babe', 2], ['hanoi', 2]]), nightsOf([['hanoi', 1], ['ninhbinh', 2], ['catba', 3], ['babe', 2], ['hanoi', 2]]), PLACES),
  ['hanoi'], 'a city twice counts its nights together and is named once; a night on the way is no place');
eq(addReport(stopsOf(['saigon', 'dalat', 'hue', 'hanoi']), stopsOf(['saigon', 'phuquoc', 'dalat', 'hoian', 'hanoi']), 'phuquoc', PLACES), { left: ['hue'], came: ['hoian'] },
  'after Dodaj: what left the trip and what came besides the added place');
eq(addReport(stopsOf(['saigon', 'dalat', 'hanoi']), stopsOf(['saigon', 'phuquoc', 'dalat', 'hanoi']), 'phuquoc', PLACES), { left: [], came: [] }, 'only the added place came');
print('why ok');

/* ---------- the budget ---------- */
// made-up prices, places and a trip: two stays and three ways, a choice, an item with its own room, a road of a swap
var COSTS_T = { night: { a: [10, 20], b: [30, 50] }, day: [10, 20], daySolo: [1, 2], shared: [2, 3], car: [10, 16], flight: { short: [30, 60], long: [40, 80] },
  items: { 'a.boat': { pp: [0, 0], group: [10, 20] }, 'b.night': { pp: [8, 8], group: [20, 30], night: true }, 'x.car': { pp: [0, 0], group: [20, 40] },
    'x.rider': { pp: [12, 18], group: [0, 0] }, 'r.car': { pp: [0, 0], group: [30, 50] }, 'r.moto': { pp: [15, 20], group: [0, 0] } } };
var BUD = { costs: COSTS_T, places: { a: {}, b: {} }, swaps: { w: { roads: { 'a-b': { text: 'r.t', cost: { driver: 'r.car', self: 'r.moto' } } } } }, shortFlightH: 1.5 };
var RT = { days: 5, stops: [{ id: 'a', n: 2, leg: { segs: [{ mode: 'road', from: 'XA', to: 'a', h: 1 }] } }, { id: 'b', n: 2, leg: { segs: [{ mode: 'road', from: 'a', to: 'b', h: 3 }] } }],
  home: { segs: [{ mode: 'road', from: 'b', to: 'XB', h: 0.5 }, { mode: 'fly', from: 'XB', to: 'XC', h: 2 }] } };
var PL = [[{ cost: ['a.boat'] }, { cost: [] }], [{ cost: [['x.car', 'x.rider']] }, { cost: ['b.night'] }]];
var bT = tripBudget(RT, PL, [], BUD);
eq([bT.parts.nights, bT.parts.day], [{ two: [25, 45], one: [50, 90] }, { two: [50, 100], one: [55, 110] }],
  'nights: a room shared by two or paid in full; the night with its own room is not paid twice; each day, a person alone pays more');
eq(bT.parts.trips, { two: [33, 53], one: [50, 98] }, 'the paid parts: pp + group / 2 for two, pp + group for one; a choice from its cheapest to its dearest');
eq(bT.parts.travel, { two: [58, 117], one: [73, 154] }, 'travel: a seat in a van to a car of one\'s own by the hour, the road of the swap by its item, a long flight');
eq([bT.two, bT.one], [[166, 315], [228, 452]], 'the whole budget: the sum of the parts');
eq(bT.items.map(function (x) { return x.key; }), ['flights', 'r.car', 'b.night', 'x.car', 'a.boat'], 'the paid things, dearest first; a choice under its first name');
var bS = tripBudget(RT, PL, ['w'], BUD);
eq([bS.two, bS.one, bS.items.map(function (x) { return x.key; })], [[166, 310], [213, 422], ['flights', 'b.night', 'r.moto', 'x.car', 'a.boat']],
  'the swap ridden yourself: its road costs the motorbike; a tie keeps the order of the trip');
eq([vndRange([1964, 3929], 29055, true), vndRange([0.01, 0.02], 29055, true), vndRange([28, 52], 29055, false), vndRange([0, 75], 29055, false),
  vndRange([9, 9], 29055, false), vndRange([0.5, 2], 29055, false), vndRange([20, 34], 29055, false)],
  [['57', '114', true], ['1', '1', true], ['0,8', '1,5', true], ['0,1', '2,2', true], ['260\u00a0000', '260\u00a0000', false], ['10\u00a0000', '60\u00a0000', false],
   ['0,6', '1,0', true]], 'dong: the sum of a trip in whole millions, never under 1; a part or a thing in millions with one decimal from 1 million up, never under 0,1, else rounded to 10 000');
eq([money(500), money(12400), money(1234567)], ['500', '12\u00a0400', '1\u00a0234\u00a0567'], 'thousands apart (NB is set further down)');
eq([vndText([0, 75], 29055, false), vndText([0, 29], 29055, false), vndText([28, 52], 29055, false), vndText([9, 9], 29055, false),
  vndText([0, 0], 29055, false), vndText([1964, 3929], 29055, true)],
  [{ key: 'mln.upto', vars: { b: '2,2' } }, { key: 'vnd.upto', vars: { b: '840\u00a0000' } }, { key: 'mln', vars: { a: '0,8', b: '1,5' } },
   { key: 'vnd.one', vars: { a: '260\u00a0000' } }, { key: 'vnd.one', vars: { a: '0' } }, { key: 'mln', vars: { a: '57', b: '114' } }],
  'dong as the page writes them: a thing that may cost nothing (from 0, as the flight over Khau Phạ) says only its dearer end, „do 2,2 mln VND”, never „0,1–2,2”; one number when the ends are alike; „0 VND” only for what costs nothing');
// in English (stage 5): a decimal point and thousands with commas, as English writes money: „0.8–1.5M VND”, „260,000 VND”
eq([money(500, 'en'), money(12400, 'en'), money(1234567, 'en')], ['500', '12,400', '1,234,567'], 'English: thousands with commas');
eq([vndRange([28, 52], 29055, false, 'en'), vndRange([9, 9], 29055, false, 'en'), vndRange([1964, 3929], 29055, true, 'en')],
  [['0.8', '1.5', true], ['260,000', '260,000', false], ['57', '114', true]], 'English dong: a decimal point, thousands with commas, whole millions alike');
eq([vndText([0, 75], 29055, false, 'en'), vndText([0, 29], 29055, false, 'en'), vndText([20, 34], 29055, false, 'en')],
  [{ key: 'mln.upto', vars: { b: '2.2' } }, { key: 'vnd.upto', vars: { b: '840,000' } }, { key: 'mln', vars: { a: '0.6', b: '1.0' } }], 'English dong as the page writes them');
// the real data: the March trip (Hồ Chí Minh City, Đà Lạt, Hội An, Huế, Hà Nội) and the Cao Bằng loop ridden yourself
var BUDR = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
function plansOf(t, self) {
  var done = {};
  return t.r.stops.map(function (x, i) {
    var d = stopDays(CONTENT[x.id], x, done[x.id] || 0, t.st.level, t.st.months, legAfter(t.r, i, FERRY), !!self);
    done[x.id] = (done[x.id] || 0) + x.n;
    return d;
  });
}
var bA = tripBudget(tA.r, plansOf(tA), [], BUDR);
eq(bA.items.map(function (x) { return x.key; }), ['flights', 'saigon.cangio', 'haivan.car', 'dalat.bidoup', 'dalat.langbiang', 'hanoi.duonglam', 'hue.lagoon', 'hue.tombs', 'hue.citadel'],
  'the March trip: the two flights first, then the day in Cần Giờ and the car over the Hải Vân pass; three nights in Đà Lạt and Hà Nội leave out their fourth days');
ok(bA.two[0] > 0 && bA.two[0] <= bA.two[1] && bA.one[0] >= bA.two[0] && bA.one[1] >= bA.two[1], 'the March trip: from up to to, alone no cheaper');
var tCB = tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 10, interests: ['gory'], level: 3, add: ['caobang'] });
var bDriver = tripBudget(tCB.r, plansOf(tCB, false), [], BUDR), bSelf = tripBudget(tCB.r, plansOf(tCB, true), ['caobang'], BUDR);
eq([bDriver.items.some(function (x) { return x.key === 'caobang.car'; }), bSelf.items.some(function (x) { return x.key === 'caobang.moto'; }), bSelf.two[1] < bDriver.two[1]],
  [true, true, true], 'Cao Bằng: a car with a driver or an easy rider, or the motorbike ridden yourself, which costs less');
print('budget ok');

/* ---------- before the trip ---------- */
var BOOKD = { costs: COSTS, book: BOOK, swaps: SWAPS, places: PLACES, airports: AIRPORTS, airKeys: AIR_KEYS, homestays: HOMESTAYS, shortFlightH: SHORT_FLIGHT_H };
var PACKD = { climate: CLIMATE, seasons: SEASONS, content: CONTENT, places: PLACES, swaps: SWAPS };
function keysOf(list) { return list.map(function (e) { return e.key; }); }
var kA = bookList(tA.r, plansOf(tA), [], BOOKD);
eq([keysOf(kA), kA[0].list, kA[0].two], [['flights', 'dalat.bidoup', 'dalat.langbiang', 'haivan.car', 'saigon.cangio', 'hanoi.duonglam'],
  [['SGN', 'DLI'], ['DLI', 'DAD'], ['HUI', 'HAN']], [102, 186]], 'the March trip: three short flights first (3 weeks ahead), then the guides, the car over the pass and the day trips');
var tBk = tripOf(Object.assign({}, MARCH, { interests: ['przyroda'], level: 3 })), kB = bookList(tBk.r, plansOf(tBk), [], BOOKD);
eq([keysOf(kB), kB.filter(function (e) { return e.key === 'airport'; })[0].list, kB.filter(function (e) { return e.key === 'transfer'; })[0].two],
  [['cattien.bausau_night', 'flights', 'dalat.tanang', 'catba.cruise', 'transfer', 'airport', 'saigon.cangio', 'cattien.park'], [['HAN', 'ninhbinh', 1], ['HAN', 'catba', 1]], null],
  'nature at level 3: the night at Bàu Sấu first (4 weeks), the Tà Năng–Phan Dũng trail and the cruise (2 weeks); the cars from Nội Bài; vans between places, priced with the travel');
var tCk = tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['przyroda', 'gory'], level: 2 }), kC = bookList(tCk.r, plansOf(tCk, ['caobang']), ['caobang'], BOOKD);
eq([keysOf(kC), kC[1].list], [['catba.cruise', 'homestay', 'airport', 'transfer', 'caobang.moto'], ['babe', 'caobang']],
  'Cao Bằng ridden yourself: the motorbike to rent; the hosts of Ba Bể and Khuổi Ky');
var tDk = tripOf({ from: 'SGN', to: 'SGN', start: '2028-08-01', end: '2028-08-20', interests: ['morze'], level: 1 }), kD = bookList(tDk.r, plansOf(tDk), [], BOOKD);
eq(kD.filter(function (e) { return e.key === 'airport'; })[0].list, [['SGN', 'mekong', 2], ['HPH', 'catba', 1]], 'a road from an airport used both ways is named once, with its two rides');
eq([kB.filter(function (e) { return e.key === 'cattien.park'; })[0].items, kB.filter(function (e) { return e.key === 'cattien.bausau_night'; })[0].items, kB[0].list],
  [['cattien.safari'], ['cattien.bausau_night'], []], 'the items booked under a key: Cát Tiên at level 3, the night safari only (the night at the lake replaces the walk)');
eq([packList(tA.r, plansOf(tA), tA.st, [], PACKD).map(function (p) { return p.code + (p.places.length ? ':' + p.places.join(',') : '') + (p.t !== null ? ':' + p.t : ''); }),
  packList(tBk.r, plansOf(tBk), tBk.st, [], PACKD).map(function (p) { return p.code; }), packList(tCk.r, plansOf(tCk, ['caobang']), tCk.st, ['caobang'], PACKD).map(function (p) { return p.code; })],
  [['warm:dalat:13', 'rain:hue,hanoi', 'mosquito'], ['warm', 'rain', 'torch', 'swim', 'mosquito'], ['rain', 'swim', 'moto', 'mosquito']],
  'packing only from the trip (decision of 15.10.2026): cold nights in Đà Lạt (13 °C), rain in Huế and Hà Nội in March; a torch for the night at Bàu Sấu, swimming at Cát Bà; the motorbike; repellent for dengue on every trip');
var tEk = tripOf({ from: 'DAD', to: 'HAN', year: 2027, month: 7, days: 12, interests: ['przyroda'], level: 3 });
eq(packList(tEk.r, plansOf(tEk), tEk.st, [], PACKD).filter(function (p) { return p.code === 'leeches'; })[0].places, ['cattien'], 'July in Cát Tiên: the leeches of the rainy season (an event)');
eq([ridesOn(tCk.r, ['caobang'], SWAPS), ridesOn(tCk.r, ['haivan'], SWAPS), ridesOn(tA.r, ['haivan'], SWAPS)],
  [true, false, true], 'riding yourself on the trip: Cao Bằng on the loop, the pass on the March trip (Hội An → Huế)');
// the credits: a photo's licence links to its text on creativecommons.org, in Polish; the public domain has no text
eq([licenceUrl('CC BY-SA 4.0'), licenceUrl('CC BY 2.0'), licenceUrl('CC BY-SA 3.0 de'), licenceUrl('CC0'), licenceUrl('Public domain')],
  ['https://creativecommons.org/licenses/by-sa/4.0/deed.pl', 'https://creativecommons.org/licenses/by/2.0/deed.pl', 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.pl',
   'https://creativecommons.org/publicdomain/zero/1.0/deed.pl', null], 'the text of a licence: CC BY and CC BY-SA by version (and country), CC0; none for the public domain');
eq([licenceUrl('CC BY-SA 4.0', 'en'), licenceUrl('CC BY-SA 3.0 de', 'en'), licenceUrl('CC0', 'en'), licenceUrl('Public domain', 'en')],
  ['https://creativecommons.org/licenses/by-sa/4.0/deed.en', 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en', 'https://creativecommons.org/publicdomain/zero/1.0/deed.en', null],
  'in English (stage 5): the English text of a licence');
print('before ok');

/* ---------- the map ---------- */
eq([panelSize(MAP_PANELS.north).w, panelSize(MAP_PANELS.north).h, panelSize(MAP_PANELS.centre).h, panelSize(MAP_PANELS.south).h], [270, 270, 270, 177],
  'the panels: MAP_WIDTH wide, as high as their latitudes at that scale');
eq(textWidth('Dni 1–3', 10, true), 7 * 10 * 0.61, 'a monospaced text: 0.61 em a letter');
ok(textWidth('Hồ Chí Minh City', 11.5) > 0.47 * 11.5 * 16 && textWidth('Huế', 11.5) > 0.62 * 11.5 * 3, 'a name: no narrower than Chrome draws it (0.47–0.62 em a letter)');
eq([textWidth('Ố', 10), textWidth('Ứ', 10), textWidth('Đ', 10), textWidth('Ł', 10)], [textWidth('O', 10), textWidth('U', 10), textWidth('D', 10), textWidth('L', 10)],
  'a capital with a diacritic is as wide as a capital without one');
eq([titleWidth('Północ'), titleWidth('Południe')], [42, 56], 'a panel title: 0.7 em a letter at 10 px (monospace 0.6 em and letter-spacing 0.1 em), as Chrome draws it');
var B = { w: 300, h: 100 };
function spots(list) { return list.map(function (l) { return l ? [l.anchor, l.box.x, l.box.y, l.clear] : null; }); }
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }, { x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [], B)),
  [['start', 110, 40, true], ['end', 50, 40, true]], 'labels: the first to the right of its point, the next one, which would cover it, to the left');
eq(spots(placeLabels([{ x: 290, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [], B)), [['end', 240, 40, true]], 'by the edge: on the side that stays inside');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10, toward: [0, 1] }], [], B)), [['middle', 80, 60, true]], 'toward: below the point first');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10, drop: true }, { x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [{ x: 0, y: 0, w: 300, h: 100 }], B)),
  [null, ['start', 110, 40, false]], 'nothing free: a label that may drop is left out, any other takes the place that covers least');
var withAlt = placeLabels([{ x: 20, y: 20, alts: [[200, 50]], w: 30, h: 10, gx: 3, gy: 3 }], [{ x: 0, y: 0, w: 100, h: 100 }], B)[0];
eq([withAlt.alt, withAlt.clear], [1, true], 'when the first point has no room, a label stands by its other point');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [{ x: 0, y: 0, w: 300, h: 100, k: 0.3 }], B)), [['start', 110, 40, true]],
  'an obstacle with k under 1 (a faint dot) may be covered: the label is still clear');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [{ x: 112, y: 45, w: 8, h: 8, k: 0.3 }], B)), [['end', 50, 40, true]],
  'but a free place wins over one that covers a faint dot');
var BAND = [{ x: 0, y: 0, w: 300, h: 43 }, { x: 0, y: 57, w: 300, h: 43 }, { x: 0, y: 43, w: 100, h: 14 }];
var one = placeLabels([{ x: 100, y: 50, w: 40, h: 28, gx: 10, gy: 10, oneLine: { w: 40, h: 14 } }, { x: 100, y: 50, w: 40, h: 28, gx: 10, gy: 10 }], BAND, B);
eq([spots(one), one[0].oneLine, one[1].oneLine], [[['start', 110, 43, true], ['start', 110, 36, false]], true, false],
  'a stay with no free place for its two lines: its name alone where one line is free; a label without oneLine keeps its size');

// pins that overlap move apart along the line between them, just enough for PIN_GAP px, and keep their points
function spread(pins) {
  return spreadPins(pins.map(function (q) { return { x: q[0], y: q[1], w: q[2] || PIN_H }; }), { w: 270, h: 270 })
    .map(function (pn) { return [Math.round(pn.x * 100) / 100, Math.round(pn.y * 100) / 100, pn.px, pn.py]; });
}
eq([spread([[100, 100], [112, 100]]), spread([[100, 100], [100, 110]]), spread([[100, 100], [130, 100]]), spread([[100, 100], [100, 100]]), spread([[5, 100], [10, 100]])],
  [[[95, 100, 100, 100], [117, 100, 112, 100]], [[100, 94, 100, 100], [100, 116, 100, 110]], [[100, 100, 100, 100], [130, 100, 130, 100]],
   [[89, 100, 100, 100], [111, 100, 100, 100]], [[10, 100, 5, 100], [32, 100, 10, 100]]],
  'pins 12 px apart in a row move to 22 px, one above the other to 22 px; pins apart stay; two on one point go sideways; at the edge the other pin moves');
// a cluster of three pins (a triangle, three in a row, three on one point, in a corner): no two overlap after the rounds
// (the pairs come within a hundredth of a pixel of PIN_GAP), each keeps its point and stays inside the panel
function cluster(q) {
  var pins = spreadPins(q.map(function (a) { return { x: a[0], y: a[1], w: PIN_H }; }), { w: 270, h: 270 });
  return pins.every(function (a, i) {
    return a.px === q[i][0] && a.py === q[i][1] && a.x >= PIN_H / 2 && a.x <= 270 - PIN_H / 2 && a.y >= PIN_H / 2 && a.y <= 270 - PIN_H / 2 &&
      pins.slice(i + 1).every(function (b) { return Math.abs(b.x - a.x) >= PIN_H + PIN_GAP - 0.01 || Math.abs(b.y - a.y) >= PIN_H + PIN_GAP - 0.01; });
  });
}
eq([[[100, 100], [112, 100], [106, 108]], [[100, 100], [110, 100], [120, 100]], [[100, 100], [100, 100], [100, 100]], [[5, 5], [12, 8], [8, 15]]].map(cluster),
  [true, true, true, true], 'three pins in a cluster: apart after the rounds, each with its point, inside the panel');
var MAPW = { panels: MAP_PANELS, places: OLD_PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
function pinsOf(L) { return L.panels.map(function (P) { return P.key + ':' + P.pins.map(function (p) { return p.key + '(' + p.nums + ')'; }).join(','); }); }
function labelsOf(P, kind) { return P.labels.filter(function (l) { return l.kind === kind; }).map(function (l) { return l.lines.join('/'); }); }
var mA = mapLayout(tA.r, tA.st, MAPW);   // saigon, dalat, hoian, hue, hanoi: flights Đà Lạt → Đà Nẵng and Huế → Hà Nội
eq(pinsOf(mA), ['north:hanoi(5)', 'centre:hoian(3),hue(4)', 'south:saigon(1),dalat(2)'], 'each stay on its panel, with its number');
eq([mA.panels[1].y, mA.panels[2].y, mA.height], [286, 572, 749], 'the panels one under another, 16 px apart');
eq([labelsOf(mA.panels[0], 'stub'), labelsOf(mA.panels[1], 'stub').sort(), labelsOf(mA.panels[2], 'stub')], [['✈ Huế'], ['✈ Hà Nội', '✈ Đà Lạt'], ['✈ Đà Nẵng']],
  'a flight to another panel: a stub at each end, named after the other end');
eq([labelsOf(mA.panels[2], 'stop'), labelsOf(mA.panels[2], 'faint').sort()], [['Hồ Chí Minh City/Dni 1–3', 'Đà Lạt/Dni 4–6'], ['Cát Tiên', 'Mekong', 'Phú Quốc']],
  'the south: the stays named with their days, the places off the trip by name');
eq([mA.panels[0].airports.length, mA.panels[2].airports.length, mA.panels[1].airports.length], [1, 1, 0], 'the airports of the trip: Hà Nội in the north, Hồ Chí Minh City in the south');
var han = mA.panels[0].airports[0], hanoiPin = mA.panels[0].pins[0];
ok(overlapArea({ x: han.bx - AIRPORT_BOX / 2, y: han.by - AIRPORT_BOX / 2, w: AIRPORT_BOX, h: AIRPORT_BOX }, { x: hanoiPin.x - hanoiPin.w / 2, y: hanoiPin.y - PIN_H / 2, w: hanoiPin.w, h: PIN_H }) === 0 &&
  (han.bx !== han.x || han.by !== han.y), 'the box of Hà Nội airport moves off the pin of the city');
var mH = mapLayout(tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 12, interests: [], level: 2 }).r,
  tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 12, interests: [], level: 2 }).st, MAPW);
eq([pinsOf(mH)[0], labelsOf(mH.panels[0], 'stop'), labelsOf(mH.panels[0], 'stub')], ['north:hanoi(1·6)', ['Hà Nội/Dni 1, 11'], ['✈ HCMC/✈ Huế']],
  'a round trip: one pin for the city with both numbers; two flights from one airport make one stub, short names of airports');
eq(mA.panels.map(function (P) { return P.grid.map(function (g) { return g.lat + (g.label ? '' : '-'); }).join(' '); }), ['20 21 22 23', '16 17 18', '10 11- 12- 13'],
  'the degrees of latitude: every line, but no label where a label of the trip stands (11° and 12° N by Hồ Chí Minh City and Đà Lạt)');
var mD = mapLayout(tD.r, tD.st, MAPW);   // Cao Bằng on the trip: Bản Giốc
eq([mD.panels[0].pois.map(function (q) { return q.name; }), labelsOf(mD.panels[0], 'poi')], [['Bản Giốc'], ['Bản Giốc']], 'a point of interest with its stay');
[mA, mH, mD].forEach(function (L, n) {
  L.panels.forEach(function (P) {
    P.labels.forEach(function (l) { ok(l.clear, 'map ' + n + ' ' + P.key + ': ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
    P.grid.filter(function (g) { return g.label; }).forEach(function (g) {
      ok(P.labels.every(function (l) { return overlapArea(l.box, gridBox(g, P.p)) === 0; }), 'map ' + n + ' ' + P.key + ': a label covers ' + g.lat + '°N');
    });
  });
});
print('map ok');

/* ---------- the places of stage 3, on the real data ---------- */
var DATA_ALL = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function tripAll(s) { var st = stOf(s); return { st: st, r: planRoute(st, DATA_ALL) }; }
function plansAll(t) {
  var done = {};
  return t.r.stops.map(function (x, i) { var d = stopDays(CONTENT[x.id], x, done[x.id] || 0, t.st.level, t.st.months, legAfter(t.r, i, FERRY)); done[x.id] = (done[x.id] || 0) + x.n; return d; });
}
// Phong Nha: Hang Én over two days at level 3 in its season, the usual and the easy days otherwise
function pn(level, months) { return stopDays(CONTENT.phongnha, { n: 3, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([pn(3, [2, 2, 2]), pn(3, [9, 9, 9]), pn(2, [2, 2, 2]), pn(1, [2, 2, 2])], [['-', 'hard', 'hard'], ['-', '-', '-'], ['-', '-', '-'], ['-', 'easy', 'easy']],
  'Phong Nha, three nights: Hang Én on days 2 and 3 at level 3 in March, not in October (no expeditions); the usual and the easy days at levels 2 and 1');
// an expedition has its own rain plan, not that of the day it replaces; its second day has none; the usual day keeps its own
var rainPN = function (level) { return stopDays(CONTENT.phongnha, { n: 3, start: 1 }, 0, level, [2, 2, 2]).map(function (d) { return d.rain; }); };
eq([rainPN(3)[1] === CONTENT.phongnha.days[1].hard.rain, rainPN(3)[2], rainPN(2)[1] === CONTENT.phongnha.days[1].rain], [true, null, true],
  'Phong Nha in March: Hang Én with its own rain plan, none on its second day; at level 2 the day of Paradise Cave keeps its own');
// a stay of a place on a trip found with Dodaj (the place asked for), so that later places do not move the check
function stayOf(t, id) { var i = t.r.stops.map(function (x) { return x.id; }).indexOf(id); return { n: t.r.stops[i].n, days: plansAll(t)[i].map(function (d) { return d.variant || '-'; }) }; }
var tPN = tripAll({ from: 'DAD', to: 'DAD', year: 2027, month: 3, days: 8, interests: ['gory'], level: 3, add: ['phongnha'] }), sPN = stayOf(tPN, 'phongnha');
eq([sPN.n >= 3, sPN.days.slice(0, 3), bookList(tPN.r, plansAll(tPN), [], BOOKD)[0].key], [true, ['-', 'hard', 'hard'], 'phongnha.hangen'],
  'mountains and caves at level 3 in March: Phong Nha with Hang Én on days 2 and 3; the expedition is the first thing to book (2 months)');
// a way to another panel on a trip put together leg by leg: Hà Nội, Phong Nha (a flight to Đồng Hới), Pù Luông (a road)
function legAll(a, b, road) { return legBetween(DATA_ALL.graph, a, b, road); }
var rPR = { days: 9, stops: [{ id: 'hanoi', n: 1, start: 1, end: 1, leg: legAll('HAN', 'hanoi', true) }, { id: 'phongnha', n: 4, start: 2, end: 5, leg: legAll('hanoi', 'phongnha') },
  { id: 'puluong', n: 3, start: 6, end: 8, leg: legAll('phongnha', 'puluong') }], home: legAll('puluong', 'HAN', true) };
var MAPW_ALL = Object.assign({}, MAPW, { places: PLACES });
eq(labelsOf(mapLayout(rPR, stOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 9, interests: [], level: 2 }), MAPW_ALL).panels[1], 'stub').sort(), ['→ Pù Luông', '✈ Hà Nội'],
  'a way to another panel: a road with an arrow (Phong Nha to Pù Luông), a flight with ✈ (Đồng Hới to Hà Nội)');
// Cúc Phương: one night has its own plan; Mây Bạc with a park guide at level 3, outside the rainy season; the park's
// rooms are booked with the night drive
function cp(n, level, months) { return stopDays(CONTENT.cucphuong, { n: n, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([cp(1, 2, [10, 10]).length, cp(2, 3, [10, 10]), cp(2, 3, [6, 6]), cp(2, 1, [10, 10])], [1, ['-', 'hard'], ['-', '-'], ['-', 'easy']],
  'Cúc Phương: one night, its own plan; Mây Bạc at level 3 in November, not in July (the rainy season); the short paths at level 1');
var tCP = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 11, days: 8, interests: ['przyroda'], level: 3, add: ['cucphuong'] }), kCP = bookList(tCP.r, plansAll(tCP), [], BOOKD);
eq([stayOf(tCP, 'cucphuong'), kCP.map(function (e) { return e.key; }).filter(function (k) { return /^cucphuong/.test(k); }),
  kCP.filter(function (e) { return e.key === 'cucphuong.stay'; })[0].items],
  [{ n: 2, days: ['-', 'hard'] }, ['cucphuong.stay', 'cucphuong.maybac', 'cucphuong.car'], ['cucphuong.night']],
  'nature in November at level 3: two nights in Cúc Phương; the rooms of the park are booked with the night drive (a week), then the guide to Mây Bạc and the car to Bống');
// Đà Nẵng: one night has its own early plan; the road to Huế goes over the Hải Vân pass, with a driver or ridden yourself
eq([stopDays(CONTENT.danang, { n: 1, start: 1 }, 0, 2, [3]).map(function (d) { return [d.early, d.cost]; }), segKey({ mode: 'road', from: 'danang', to: 'hue', h: 2.75 }, AIRPORTS, ROAD_KEYS),
  segKey({ mode: 'road', from: 'hue', to: 'danang', h: 2.75 }, AIRPORTS, ROAD_KEYS, selfSwaps(['haivan'], SWAPS).roads)],
  [[[true, ['danang.sontra']]], ['r.haivan', {}], ['r.haivan_self', {}]], 'Đà Nẵng: the one-night plan starts at dawn; Đà Nẵng to Huế over the pass, ridden yourself either way');
var rDH = { days: 5, stops: [{ id: 'danang', n: 2, start: 1, end: 2, leg: legAll('DAD', 'danang', true) }, { id: 'hue', n: 2, start: 3, end: 4, leg: legAll('danang', 'hue') }],
  home: legAll('hue', 'DAD', true) };
var pDH = [stopDays(CONTENT.danang, rDH.stops[0], 0, 2, [3, 3, 3, 3, 3]), stopDays(CONTENT.hue, rDH.stops[1], 0, 2, [3, 3, 3, 3, 3])];
function keysOfB(b) { return b.items.map(function (x) { return x.key; }).filter(function (k) { return /^haivan/.test(k); }); }
eq([keysOfB(tripBudget(rDH, pDH, [], BUDR)), keysOfB(tripBudget(rDH, pDH, ['haivan'], BUDR)), keysOf(bookList(rDH, pDH, [], BOOKD)).indexOf('haivan.car_dn') > -1],
  [['haivan.car_dn'], ['haivan.moto_dn'], true], 'Đà Nẵng to Huế: the car over the pass from Đà Nẵng, or the motorbike ridden yourself; the car on the list of what to book');
// no zigzag by plane around the airports' regions (REGION_H, plan 2): the zigzag from the list after plan 1 (Đà Nẵng to
// Hồ Chí Minh City, 28.01–14.02.2027, culture and food, level 1: Hội An, ✈ Hà Nội, ✈ Huế) and a round trip from Đà Nẵng
// that came home by plane in the middle and flew out again (January, 18 days: ✈ Đà Lạt, ✈ Huế, Phong Nha, ✈ Hà Nội)
function inRegionAll(id, airport) { return DATA_ALL.graph.road[airport][id] <= REGION_H; }
// the stops reached by a flight into the airport's region, and those left by a flight out of it after one came in
function flownInto(t, airport) {
  return t.r.stops.filter(function (x, i) { return i > 0 && x.leg.flights && inRegionAll(x.id, airport) && !inRegionAll(t.r.stops[i - 1].id, airport); })
    .map(function (x) { return x.id; });
}
function flownOutAgain(t, airport) {
  var home = false, out = [];
  t.r.stops.forEach(function (x, i) {
    if (!i || !x.leg.flights) return;
    var y = t.r.stops[i - 1].id;
    if (home && inRegionAll(y, airport) && !inRegionAll(x.id, airport)) out.push(y);
    if (inRegionAll(x.id, airport) && !inRegionAll(y, airport)) home = true;
  });
  return out;
}
var tZZ = tripAll({ from: 'DAD', to: 'SGN', start: '2027-01-28', end: '2027-02-14', interests: ['kultura', 'jedzenie'], level: 1 });
var tRT = tripAll({ from: 'DAD', to: 'DAD', month: 1, days: 18, interests: [], level: 1 });
eq([tZZ.r.stops[0].id, flownInto(tZZ, 'DAD'), flownInto(tRT, 'DAD').length > 0, flownOutAgain(tRT, 'DAD')], ['hoian', [], true, []],
  'Đà Nẵng to Hồ Chí Minh City: Hội An first, no flight back near Đà Nẵng; a round trip from Đà Nẵng comes home by plane and flies out no more');
// Hà Giang: the loop over three days, with five nights over four (Lũng Cú on day 3); no hard day, so level 3 is level 2;
// ridden yourself, every day of the loop on the motorbike; the permit for the border zone on the first day, at level 1 too
function hg(n, level, self) { return stopDays(CONTENT.hagiang, { n: n, start: 1 }, 0, level, [9, 9, 9, 9, 9], null, self); }
eq([hg(4, 2).map(function (d) { return d.t; }), hg(5, 2)[2].t, JSON.stringify(hg(5, 3)) === JSON.stringify(hg(5, 2)),
  hg(4, 2, true).map(function (d) { return d.variant; }), hg(4, 1)[0].cost],
  [['Wieczór w Hà Giang', 'Przez Quản Bạ i Yên Minh do Đồng Văn', 'Mã Pí Lèng, kanion Nho Quế i Du Già', 'Z Du Già z powrotem do Hà Giang'],
    'Lũng Cú i wieś pod masztem', true, ['self', 'self', 'self', 'self'], ['hagiang.permit']],
  'Hà Giang: four nights, the loop over three days; five, Lũng Cú on day 3; level 3 as level 2; ridden yourself every day; the permit at level 1 too');
var tHG = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 12, interests: ['gory'], level: 2, add: ['hagiang'] });
var bHGd = tripBudget(tHG.r, plansOf(tHG, false), [], BUDR), bHGs = tripBudget(tHG.r, plansOf(tHG, true), ['hagiang'], BUDR), kHG = bookList(tHG.r, plansOf(tHG, false), [], BOOKD);
function hgItems(b) { return b.items.map(function (x) { return x.key; }).filter(function (k) { return /^hagiang/.test(k); }).sort(); }
eq([stayOf(tHG, 'hagiang').n >= 4, hgItems(bHGd), hgItems(bHGs), bHGs.two[1] < bHGd.two[1], keysOf(kHG).indexOf('hagiang.car') > -1,
  kHG.filter(function (e) { return e.key === 'homestay'; })[0].list.indexOf('hagiang') > -1],
  [true, ['hagiang.car', 'hagiang.permit'], ['hagiang.moto', 'hagiang.permit'], true, true, true],
  'mountains in October with Hà Giang: the car or the easy rider and the permit; ridden yourself the motorbike, for less; the car on the list of what to book, Hà Giang with the hosts');
// Sa Pa: Fansipan on foot over two days at level 3, from three nights, not in May–September (its months of downpours) nor
// with two nights; at level 1 the cable car and the valley by car; the expedition has its own rain plan and sleeps in the camp
function sp(n, level, months) { return stopDays(CONTENT.sapa, { n: n, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([sp(3, 3, [2, 2, 2]), sp(3, 3, [6, 6, 6]), sp(2, 3, [2, 2]), sp(3, 1, [2, 2, 2]),
  stopDays(CONTENT.sapa, { n: 3, start: 1 }, 0, 3, [2, 2, 2])[1].rain === CONTENT.sapa.days[1].hard.rain, COSTS.items['sapa.fansipan'].night],
  [['-', 'hard', 'hard'], ['-', '-', '-'], ['-', '-'], ['-', 'easy', 'easy'], true, true],
  'Sa Pa: Fansipan on foot on days 2 and 3 at level 3 in March, not in July nor in two nights; at level 1 the cable car and the valley by car; its own rain plan, a night in the camp');
var tSP = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 10, interests: ['gory'], level: 3, add: ['sapa'] });
eq([stayOf(tSP, 'sapa').days.slice(1, 3), keysOf(bookList(tSP.r, plansAll(tSP), [], BOOKD)).indexOf('sapa.fansipan') > -1], [['hard', 'hard'], true],
  'mountains in March at level 3 with Sa Pa: Fansipan on foot, on the list of what to book');
// Hội An: at three nights the third day is Mỹ Sơn from 6:00 (at level 1 the group tour with the boat back, from about
// 7:00), with its own rain plan; at two nights the days stay as they were
function ha(n, level) { return stopDays(CONTENT.hoian, { n: n, start: 1 }, 0, level, [2, 2, 2]).map(function (d) { return d.t; }); }
var mySon = stopDays(CONTENT.hoian, { n: 3, start: 1 }, 0, 1, [2, 2, 2])[2], mySon2 = stopDays(CONTENT.hoian, { n: 3, start: 1 }, 0, 2, [2, 2, 2])[2];
eq([ha(2, 2), ha(3, 2), [mySon2.early, mySon2.cost, /Muzeum Rzeźby Czamskiej/.test(mySon2.rain)], [mySon.variant, mySon.early, mySon.cost], PLACES.hoian.nights],
  [['Bocznymi drogami Hội An', 'Stare miasto o 6:00'], ['Bocznymi drogami Hội An', 'Stare miasto o 6:00', 'Mỹ Sơn o 6:00'], [true, ['hoian.myson'], true],
   ['easy', false, ['hoian.myson_tour']], [1, 2, 3]],
  'Hội An: Mỹ Sơn from 6:00 on the third day at three nights, with a rain plan; at level 1 the group tour with the boat back');
// a round trip through Đà Nẵng: Hội An for one night first (its solo plan has the old town at dawn, the p 2 plan) and two
// nights at the end, which go on with Mỹ Sơn, not the old town at 6:00 again (final review of plan B1); Hà Nội's solo
// stands for its p 1 plan only, so its second stay keeps the p 2 plan
function back(id) { return stopDays(CONTENT[id], { n: 2, start: 9 }, 1, 2, [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], { home: true, h: 1 }).map(function (d) { return d.t; }); }
eq([back('hoian'), back('hanoi')], [['Powrót do Hội An', 'Mỹ Sơn o 6:00'], ['Powrót do Hà Nội', 'Świątynia Literatury i Muzeum Etnologii']],
  'a second stay of two nights: Hội An goes on with Mỹ Sơn after its solo night, Hà Nội with its p 2 plan');
// Đà Lạt: the Tà Năng–Phan Dũng trail over two days at level 3 (days 2 and 3, the night in a tent), from three nights,
// not in May–October; at level 2 the days as they were; the trail has its own rain plan
function dl(n, level, months) { return stopDays(CONTENT.dalat, { n: n, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([dl(3, 3, [0, 0, 0]), dl(4, 3, [11, 11, 11, 11]), dl(3, 3, [5, 5, 5]), dl(2, 3, [0, 0]), dl(3, 2, [0, 0, 0]),
  stopDays(CONTENT.dalat, { n: 3, start: 1 }, 0, 3, [0, 0, 0])[1].rain === CONTENT.dalat.days[1].hard.rain, CONTENT.dalat.days[1].hard.off],
  [['-', 'hard', 'hard'], ['-', 'hard', 'hard', '-'], ['-', '-', '-'], ['-', '-'], ['-', '-', '-'], true, [5, 6, 7, 8, 9, 10]],
  'Đà Lạt: Tà Năng–Phan Dũng on days 2 and 3 at level 3 in January and December, not in June nor in two nights; its own rain plan');
var tTN = tripAll({ from: 'SGN', to: 'SGN', year: 2027, month: 1, days: 10, interests: ['gory'], level: 3, add: ['dalat'] });
eq([stayOf(tTN, 'dalat').days.slice(1, 3), keysOf(bookList(tTN.r, plansAll(tTN), [], BOOKD)).indexOf('dalat.tanang') > -1], [['hard', 'hard'], true],
  'mountains in January at level 3 with Đà Lạt: the Tà Năng–Phan Dũng trail, on the list of what to book');
// Yok Đôn: on foot after the elephants on day 2, at level 1 half a day with them and a cooking lesson; at level 3 a night in
// the forest with the park's guide, not in May–October and not on the last day before the way home; one night: the solo plan
function yd(n, level, months, next) { return stopDays(CONTENT.yokdon, { n: n, start: 1 }, 0, level, months, next).map(function (d) { return d.variant || '-'; }); }
eq([yd(2, 2, [0, 0]), yd(2, 1, [0, 0]), yd(2, 3, [0, 0]), yd(2, 3, [6, 6]), yd(2, 3, [0, 0], { home: true, h: 3 }), stopDays(CONTENT.yokdon, { n: 1, start: 1 }, 0, 2, [0])[0].t],
  [['-', '-'], ['-', 'easy'], ['-', 'hard'], ['-', '-'], ['-', '-'], CONTENT.yokdon.days[0].solo.t],
  'Yok Đôn: the elephants on day 2, at level 1 with a cooking lesson; the night in the forest at level 3 in January, not in July nor before the way home; one night solo');
var tYD = tripAll({ from: 'SGN', to: 'SGN', year: 2027, month: 1, days: 10, interests: ['przyroda'], level: 2, add: ['yokdon'] }), iYD = tYD.r.stops.map(function (x) { return x.id; }).indexOf('yokdon');
eq([iYD > -1, tYD.r.stops[iYD].leg.segs.some(function (g) { return g.to === 'BMV' || g.from === 'BMV'; }) || tYD.r.stops[iYD + 1 < tYD.r.stops.length ? iYD + 1 : iYD].leg.segs.some(function (g) { return g.from === 'BMV'; }),
  keysOf(bookList(tYD.r, plansAll(tYD), [], BOOKD)).filter(function (k) { return /^yokdon/.test(k); }).sort()],
  [true, true, ['yokdon.elephants', 'yokdon.stay']],
  'nature in January with Yok Đôn: by Buôn Ma Thuột airport, the elephants and the park\'s guest house on the list of what to book');
// a flight that runs only on some days of the week: the journey's card says on which (FLIGHT_DAYS)
eq([flightNotes({ segs: [{ mode: 'road', from: 'hoian', to: 'DAD', h: 0.75 }, { mode: 'fly', from: 'DAD', to: 'BMV', h: 1.1 }, { mode: 'road', from: 'BMV', to: 'yokdon', h: 1.25 }] }, FLIGHT_DAYS),
  flightNotes({ segs: [{ mode: 'fly', from: 'SGN', to: 'BMV', h: 1 }] }, FLIGHT_DAYS)],
  [[{ key: 'n.flight_days', a: 'DAD', b: 'BMV', days: 'f.days_tts' }], []], 'the flight Đà Nẵng – Buôn Ma Thuột runs three days a week, the flight from Hồ Chí Minh City every day');
// after the night in the forest the journey starts around noon: 6 h by road to Cát Tiên would reach the Đồng Nai at its
// last ferry, so the night gives way there (final review of plan B1); 6 h to Đà Lạt is an evening arrival and keeps it
eq([yd(2, 3, [0, 0], { home: false, h: 6, ferry: true }), yd(2, 3, [0, 0], { home: false, h: 6, ferry: false })], [['-', '-'], ['-', 'hard']],
  'Yok Đôn: no night in the forest before a journey to a place behind a ferry, as before a long leg');
// Mù Cang Chải: on the axis past Sa Pa (the way down from Sa Pa to Hà Nội); its fair months XI–III are the terraces after
// the harvest (wx.tarasy), not the weather; at level 1 the viewpoints by car; a third night adds Khau Phạ; no hard day
function mcc(n, level) { return stopDays(CONTENT.mucangchai, { n: n, start: 1 }, 0, level, [9, 9, 9]).map(function (d) { return (d.variant || '-') + ' ' + d.t; }); }
eq([PLACES.mucangchai.axis > PLACES.sapa.axis, CLIMATE.mucangchai.why[1], CLIMATE.mucangchai.why[4], mcc(2, 2).length, mcc(3, 3)[2], mcc(2, 1)[1].split(' ')[0],
  CONTENT.mucangchai.days.some(function (d) { return d.hard; }), HOMESTAYS.indexOf('mucangchai') > -1],
  [true, ['tarasy'], undefined, 2, '- Nad doliną Lìm Mông', 'easy', false, true],
  'Mù Cang Chải: past Sa Pa on the axis, its fair winter months for the terraces after the harvest, the viewpoints by car at level 1, Khau Phạ at three nights');
var tMC = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['gory'], level: 2, add: ['mucangchai'] }), oMC = tMC.r.stops.map(function (x) { return x.id; });
eq([oMC.indexOf('mucangchai') > -1, oMC.indexOf('sapa') < 0 || oMC.indexOf('sapa') === oMC.indexOf('mucangchai') - 1, keysOf(bookList(tMC.r, plansAll(tMC), [], BOOKD)).indexOf('homestay') > -1],
  [true, true, true], 'mountains in October with Mù Cang Chải: after Sa Pa when both are on the trip, the hosts on the list of what to book');
// Cúc Phương and Ninh Bình on one trip: their pins move apart on the map, each with its point where the place is
var tCN = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 10, interests: ['przyroda'], level: 2, add: ['cucphuong', 'ninhbinh'] });
var pCN = mapLayout(tCN.r, tCN.st, MAPW_ALL).panels[0].pins.filter(function (pn) { return pn.key === 'cucphuong' || pn.key === 'ninhbinh'; });
function pinBoxOf(pn) { return { x: pn.x - pn.w / 2, y: pn.y - PIN_H / 2, w: pn.w, h: PIN_H }; }
var nP = panelSize(MAP_PANELS.north);
eq([pCN.length, overlapArea(pinBoxOf(pCN[0]), pinBoxOf(pCN[1])), pCN.map(function (pn) { return [pn.px, pn.py]; }),
  pCN.every(function (pn) { return pn.x !== pn.px; })],
  [2, 0, pCN.map(function (pn) { var c = CONTENT[pn.key].pt; return [(c[1] - nP.lon0) * nP.s, (nP.lat0 - c[0]) * nP.s]; }), true],
  'Cúc Phương and Ninh Bình: two pins apart, each moved off its point, which it keeps');
// a road through an airport without a flight there (Ninh Bình to Hà Giang by Nội Bài): one road in the card and on the list
// of what to book, its hours summed; a leg with a flight keeps its parts; the map draws every part
var tNH = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['gory', 'kultura'], level: 2 });
var legNH = tNH.r.stops.filter(function (x) { return x.id === 'hagiang'; })[0].leg, kNH = bookList(tNH.r, plansAll(tNH), [], BOOKD);
var flyLeg = [{ mode: 'road', from: 'hue', to: 'HUI', h: 0.5 }, { mode: 'fly', from: 'HUI', to: 'HAN', h: 1.2 }, { mode: 'road', from: 'HAN', to: 'ninhbinh', h: 2.25 }];
eq([legNH.segs.length, cardSegs(legNH.segs, AIRPORTS), kNH.filter(function (e) { return e.key === 'airport'; })[0].list, cardSegs(flyLeg, AIRPORTS)],
  [2, [{ mode: 'road', from: 'ninhbinh', to: 'hagiang', h: 8 }], [['HAN', 'ninhbinh', 1]], flyLeg],
  'Ninh Bình to Hà Giang by Nội Bài: one road of 8 h; the car from the airport to Ninh Bình is booked once, the road to Hà Giang is a transfer');
print('stage 3 ok');

/* ---------- travel texts ---------- */
function road(a, b) { return segKey({ mode: 'road', from: a, to: b, h: 1 }, AIRPORTS, ROAD_KEYS); }
eq(road('HAN', 'hanoi'), ['r.taxi_from', { x: 'Hà Nội' }], 'from an airport');
eq(road('dalat', 'DLI'), ['r.taxi_to', { x: 'Đà Lạt' }], 'to an airport');
eq([road('hue', 'hoian'), road('hoian', 'hue')], [['r.haivan', {}], ['r.haivan', {}]], 'the Hải Vân pass, either way');
function air(a, b) { return segKey({ mode: 'road', from: a, to: b, h: 2 }, AIRPORTS, ROAD_KEYS, null, AIR_KEYS); }
eq([air('HAN', 'catba'), air('catba', 'HPH'), air('SGN', 'cattien'), air('mekong', 'SGN'), air('HAN', 'hanoi'), air('dalat', 'DLI')],
  [['r.air_catba', {}], ['r.air_catba', {}], ['r.air_cattien', {}], ['r.air_mekong', {}], ['r.taxi_from', { x: 'Hà Nội' }], ['r.taxi_to', { x: 'Đà Lạt' }]],
  'a long road of an airport has its own text both ways (AIR_KEYS); a short one keeps the taxi');
// Phong Nha from the airports of Đà Nẵng and Huế (plan 2): its own roads, on the expressway, each with its text
eq([air('DAD', 'phongnha'), air('phongnha', 'HUI'), legBetween(DATA_ALL.graph, 'DAD', 'phongnha', true).total, legBetween(DATA_ALL.graph, 'HUI', 'phongnha', true).total],
  [['r.air_phongnha_dad', {}], ['r.air_phongnha_hui', {}], 5.5, 3.75], 'Phong Nha from Đà Nẵng airport (5½ h) and from Huế airport (3¾ h): roads of their own, with their texts');
eq([air('HAN', 'hagiang'), air('sapa', 'HAN')], [['r.air_ninhbinh', {}], ['r.air_ninhbinh', {}]], 'Hà Giang and Sa Pa from Nội Bài: a car or a limousine van booked ahead, as to Ninh Bình');
var arrive = { segs: [{ mode: 'road', from: 'HAN', to: 'catba', h: 4 }] }, leave = { segs: [{ mode: 'road', from: 'cattien', to: 'SGN', h: 3.75 }, { mode: 'fly', from: 'SGN', to: 'HAN', h: 2.2 }] };
eq([ferryNotes(arrive, FERRY, AIRPORTS), ferryNotes(leave, FERRY, AIRPORTS), ferryNotes({ segs: [{ mode: 'road', from: 'ninhbinh', to: 'catba', h: 4.5 }] }, FERRY, AIRPORTS)],
  [[{ key: 'n.ferry_in', place: 'catba', last: '18:00', land: '13:30' }], [{ key: 'n.ferry_out', place: 'cattien', first: '6:00', at: '10:00' }], []],
  'the ferry: from an airport the latest landing, toward an airport the earliest time there; a road between places says nothing');
var selfR = selfSwaps(['haivan'], SWAPS).roads;
eq([segKey({ mode: 'road', from: 'hue', to: 'hoian', h: 3.25 }, AIRPORTS, ROAD_KEYS, selfR), segKey({ mode: 'road', from: 'hoian', to: 'hue', h: 3.25 }, AIRPORTS, ROAD_KEYS, selfR),
  segKey({ mode: 'road', from: 'cattien', to: 'dalat', h: 4.5 }, AIRPORTS, ROAD_KEYS, selfR)], [['r.haivan_self', {}], ['r.haivan_self', {}], ['r.car_baoloc', {}]],
  'the Hải Vân pass ridden yourself, either way; other roads as before');
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
eq([legNotes(L(5, [{ mode: 'road', h: 2 }, { mode: 'fly', h: 1 }], 1), null, false), legNotes(L(5, [{ mode: 'road', h: 1.75 }, { mode: 'fly', h: 1 }], 1), null, false)],
  [['n.afternoon'], []], 'the afternoon flight: from 2 h of road to the airport, not at 1¾ h');
eq([legNotes(L(LONG_LEG_H, [{ mode: 'road', h: LONG_LEG_H }]), null, false), legNotes(L(LONG_LEG_H - 0.25, [{ mode: 'road', h: LONG_LEG_H - 0.25 }]), null, false)],
  [['n.long'], []], 'a long day: from LONG_LEG_H hours, not a quarter of an hour less');
eq([legNotes(L(6, [{ mode: 'road', h: 6 }]), { n: 1 }, true), legNotes(L(5.75, [{ mode: 'road', h: 5.75 }]), { n: 1 }, true)],
  [['n.solo_long'], []], 'after one night with a morning plan: the warning from 6 h of travel, not at 5¾ h');
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
['dla przyjaciół', 'Đà Lạt i', 'XVIII wieku', 'C w', 'z' + NB + 'południa', '5 miejsc', '2 mosty', '15 dni'].forEach(function (s) { eq(tieShort(s), s, 'unchanged: ' + s); });
eq([tieShort('ok. 3–4 km od'), tieShort('≈ 5½ godz. drogi'), tieShort('2 godz. 30 min'), tieShort('noce 13 °C, 64 mm deszczu, 1700 m n.p.m.')],
  ['ok.' + NB + '3–\u20604' + NB + 'km od', '≈' + NB + '5½' + NB + 'godz. drogi', '2' + NB + 'godz. 30' + NB + 'min', 'noce 13' + NB + '°C, 64' + NB + 'mm deszczu, 1700' + NB + 'm n.p.m.'],
  'a number keeps its unit, ≈ and „ok.” keep their number');
eq(tieShort('ok. 17 000 osób, 230 000–300 000 VND, mandat 2–4 mln VND, 1700 m'),
  'ok.' + NB + '17' + NB + '000 osób, 230' + NB + '000–\u2060300' + NB + '000' + NB + 'VND, mandat 2–\u20604' + NB + 'mln' + NB + 'VND, 1700' + NB + 'm',
  'a number keeps its thousands and dong their number: 17 000, 230 000–300 000 VND, 2–4 mln VND');
eq([tieShort('jedzie ok. ½ godz.'), tieShort('Ok. 2 h'), tieShort('ok. godziny'), tieShort('bok. 5')],
  ['jedzie ok.' + NB + '½' + NB + 'godz.', 'Ok.' + NB + '2 h', 'ok. godziny', 'bok. 5'], '„ok.” only before a number, and only as a word of its own');
eq([tieShort('140–260'), tieShort('ok. 11:00–14:30'), tieShort('½–1 godz.'), tieShort('Đồng Bài – Cái Viềng'), tieShort('x–u nas')],
  ['140–\u2060260', 'ok.' + NB + '11:00–\u206014:30', '½–\u20601' + NB + 'godz.', 'Đồng Bài – Cái Viềng', 'x–u' + NB + 'nas'],
  'a range of numbers keeps together across its dash (a word joiner after it); a dash between words still breaks');
eq(tieShort(tieShort('i w domu, ≈ 4 godz.')), tieShort('i w domu, ≈ 4 godz.'), 'idempotent');
var NAMES = ['Hồ Chí Minh City', 'Cát Tiên', 'Ba Bể'];
eq(tieNames('Nie zmieściło się: Ba Bể, Cát Tiên. Lot z Hồ Chí Minh City.', NAMES),
  'Nie zmieściło się: Ba' + NB + 'Bể, Cát' + NB + 'Tiên. Lot z Hồ' + NB + 'Chí' + NB + 'Minh' + NB + 'City.', 'names keep together, each place');
eq(tieNames('Bez nazw.', NAMES), 'Bez nazw.', 'a text without names stays as it was');
eq(tieVietnamese('w górę rzeki do Thảo Điền, targ Bình Tây w Chợ Lớn i ulica Hà Tôn Quyền.'),
  'w górę rzeki do Thảo' + NB + 'Điền, targ Bình' + NB + 'Tây w Chợ' + NB + 'Lớn i ulica Hà' + NB + 'Tôn' + NB + 'Quyền.', 'a Vietnamese name keeps together, also of three words');
eq(tieVietnamese('plaża An Bàng nad Zatoką Lan Hạ'), 'plaża An' + NB + 'Bàng nad Zatoką Lan' + NB + 'Hạ',
  'a word without a Vietnamese letter keeps with one that has it; two Polish words do not');
eq(tieVietnamese('do Hội An. Potem Saigon Waterbus i Stare Miasto'), 'do Hội' + NB + 'An. Potem Saigon Waterbus i Stare Miasto', 'a full stop ends a name; words without Vietnamese letters stay apart');
eq(tieVietnamese(tieVietnamese('Hà Tôn Quyền i Bến Thành')), tieVietnamese('Hà Tôn Quyền i Bến Thành'), 'idempotent');
// English (stage 5): no one-letter words to tie; a number keeps its unit and ≈ its number, and a range keeps together
eq([tieEnglish('about 3–4 km from a town'), tieEnglish('≈ 5½ h on the road'), tieEnglish('nights of 13 °C, 64 mm of rain, 1700 m up'),
  tieEnglish('a fine of 2–4M VND or 230,000–300,000 VND'), tieEnglish('a 110–125 cc scooter, 11:00–14:30'), tieEnglish('a walk in a park, I hear')],
  ['about 3–\u20604' + NB + 'km from a town', '≈' + NB + '5½' + NB + 'h on the road', 'nights of 13' + NB + '°C, 64' + NB + 'mm of rain, 1700' + NB + 'm up',
   'a fine of 2–\u20604M' + NB + 'VND or 230,000–\u2060300,000' + NB + 'VND', 'a 110–\u2060125' + NB + 'cc scooter, 11:00–\u206014:30', 'a walk in a park, I hear'],
  'tieEnglish: units, ≈ and ranges as in Polish; no one-letter words');
eq(tieEnglish(tieEnglish('≈ 4 h, 1–3 km')), tieEnglish('≈ 4 h, 1–3 km'), 'idempotent');
eq([inMonthText('marcu', 'pl'), inMonthText('wrześniu', 'pl'), inMonthText('lutym', 'pl'), inMonthText('March', 'en'), inMonthText('September', 'en')],
  ['w marcu', 'we wrześniu', 'w lutym', 'in March', 'in September'], 'inMonthText: we before w and a consonant in Polish; in English, in');
print('words ok');
