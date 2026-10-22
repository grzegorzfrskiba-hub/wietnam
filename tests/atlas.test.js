/* The atlas's pure helpers (atlaspage.js, stage 7), on made-up texts and the real places. */

/* ---------- the places and their regions (findings 11 and 12) ---------- */
var ATLAS_IDS = atlasOrder(PLACES);
eq(ATLAS_IDS, ['mucangchai', 'sapa', 'hagiang', 'caobang', 'babe', 'hanoi', 'catba', 'ninhbinh', 'cucphuong', 'puluong',
  'phongnha', 'hue', 'danang', 'hoian', 'yokdon', 'dalat', 'cattien', 'saigon', 'phuquoc', 'mekong'], 'atlasOrder: the 20 places from north to south, no night on the way');
eq(atlasOrder({ a: { axis: 10 }, b: { axis: 12 }, c: { axis: 12 }, d: { axis: 11, node: 'a' } }), ['b', 'c', 'a'], 'atlasOrder: by axis, the same axis by id, no node');
eq(atlasRegions(ATLAS_IDS, CONTENT).map(function (g) { return g.region + ' ' + g.ids.length; }), ['north 10', 'centre 4', 'south 6'], 'atlasRegions: north, centre, south with their counts');
eq(atlasRegions(ATLAS_IDS, CONTENT)[1].ids, ['phongnha', 'hue', 'danang', 'hoian'], 'atlasRegions: a region’s places in the atlas’s order');
eq(atlasRegions(['a', 'b'], { a: { region: 'south' }, b: { region: 'north' } }), [{ region: 'north', ids: ['b'] }, { region: 'south', ids: ['a'] }],
  'atlasRegions: a region without places left out');
print('places ok');

/* ---------- what a card shows (findings 6–8) ---------- */
eq([placeInterests(PLACES.hagiang.fit), placeInterests({ kultura: 2, jedzenie: 3, przyroda: 1, gory: 0, morze: 2 }), placeInterests({ kultura: 1 })],
  [['gory', 'kultura', 'przyroda'], ['jedzenie', 'kultura', 'morze'], []], 'placeInterests: fit 2 or 3, the best first, then in the order of INTERESTS');
eq([nightsSpan([1, 2, 3]), nightsSpan([4, 4, 5]), nightsSpan([2, 2, 2]), nightsSpan([1, 1, 1]), nightsSpan([3, 3, 4])],
  [{ text: '1–3', form: 'few' }, { text: '4–5', form: 'many' }, { text: '2', form: 'few' }, { text: '1', form: 'one' }, { text: '3–4', form: 'few' }],
  'nightsSpan: from the least to the most nights, the word by the larger');
var DAYS_T = { days: [
  { o: 3, t: 'Trzeci', hard: { t: 'Trudny' } }, { o: 1, t: 'Pierwszy', easy: { t: 'Łatwy' }, solo: { t: 'Na jedną noc' } },
  { o: 2, t: 'Drugi', hard: { t: 'Pierwszy' } }, { o: 4, t: 'Drugi', hard: { t: 'Trudny', next: { t: 'Następny' } } }
] };
eq(placeTodo(DAYS_T), { usual: ['Pierwszy', 'Drugi', 'Trzeci'], hard: ['Trudny'] }, 'placeTodo: the usual titles by o, each once, then the hard ones not among them');
ATLAS_IDS.forEach(function (id) {
  var t = placeTodo(CONTENT[id]);
  ok(t.usual.length >= 2 && t.usual.every(function (x, i) { return t.usual.indexOf(x) === i; }), id + ': two titles or more to do, each once');
});
print('cards ok');

/* ---------- the bar of the twelve months (finding 7) ---------- */
var BAR = seasonBar('DDSZZSXDDDDD', { 3: ['deszcz'], 4: ['ulewy', 'powodzie'], 5: ['tajfuny'], 6: ['deszcz'], 8: ['upal'] }, [4, 5]);
eq(BAR.slice(1, 8), [{ m: 2, season: 'D', why: [], trip: false }, { m: 3, season: 'S', why: ['deszcz'], trip: false }, { m: 4, season: 'Z', why: ['ulewy', 'powodzie'], trip: true },
  { m: 5, season: 'Z', why: ['tajfuny'], trip: true }, { m: 6, season: 'S', why: ['deszcz'], trip: false }, { m: 7, season: 'X', why: [], trip: false }, { m: 8, season: 'D', why: [], trip: false }],
  'seasonBar: the season of each month, the reasons of a fair or poor one, the months of the trip');
eq(seasonBar('DDDDDDDDDDDD', {}, null).filter(function (x) { return x.trip; }), [], 'seasonBar without a trip: no month of the trip');
eq(seasonGroups(BAR), [{ season: 'D', months: [1, 2, 8, 9, 10, 11, 12] }, { season: 'S', months: [3, 6] }, { season: 'Z', months: [4, 5] }, { season: 'X', months: [7] }],
  'seasonGroups: the months by season, good, fair, poor, closed');
var HOIAN = seasonBar(SEASONS.hoian, CLIMATE.hoian.why, null);
eq([HOIAN.length, HOIAN[10].season, HOIAN[10].why, HOIAN[0].why], [12, 'Z', ['ulewy', 'powodzie'], []], 'seasonBar of Hội An: November poor, downpours and floods');
ATLAS_IDS.forEach(function (id) {
  var bad = seasonBar(SEASONS[id], CLIMATE[id].why, null).filter(function (x) { return (x.season === 'S' || x.season === 'Z') && !x.why.length; });
  ok(!bad.length, id + ': every fair or poor month has its reason (' + bad.map(function (x) { return x.m; }).join(', ') + ')');
});
print('season ok');

/* ---------- the address (findings 4 and 18) ---------- */
var S_A = { from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: ['przyroda'], level: 2, add: [], remove: [], moto: [] };
eq([atlasHash(null, null, 'en', false), atlasHash(null, null, 'pl', true), atlasHash('hoian', null, 'en', false), atlasHash('hoian', null, 'pl', false)],
  ['', '#lang=pl', '#hoian', '#hoian&lang=pl'], 'atlasHash without a trip: the place and lang=pl, no koszty');
eq([atlasHash('hoian', S_A, 'pl', true), atlasHash(null, S_A, 'en', false)],
  ['#hoian&od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2&koszty=1&lang=pl', '#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2'], 'atlasHash with a trip: as pageHash');
var H_A = atlasHash('hoian', S_A, 'pl', true);
eq([atlasPlace(H_A, ATLAS_IDS), hasTrip(H_A), langOf(H_A), costsOf(H_A), parseLink(H_A)], ['hoian', true, 'pl', true, parseLink(linkHash(S_A))], 'atlasPlace, hasTrip, langOf, costsOf and parseLink read atlasHash back');
eq([atlasPlace('', ATLAS_IDS), atlasPlace('#od=SGN&do=HAN', ATLAS_IDS), atlasPlace('#hanoiStop', ATLAS_IDS), atlasPlace('#constructor&lang=pl', ATLAS_IDS), atlasPlace('#Hoian', ATLAS_IDS)],
  [null, null, null, null, null], 'atlasPlace: no place, a night on the way, an object’s property or a wrong name is none');
// ✓ on a card links to the first day of the stay on the page with the route, with the trip (finding D9 of the final review)
eq([dayLink(S_A, 'en', false, 3), dayLink(S_A, 'pl', true, 9)],
  ['../#day-3&od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2', '../#day-9&od=SGN&do=HAN&miesiac=2027-03&dni=15&co=przyroda&poziom=2&koszty=1&lang=pl'], 'dayLink: the day, then the trip as pageHash');
eq([dayAnchor(dayLink(S_A, 'pl', true, 9).slice(3)), parseLink(dayLink(S_A, 'pl', true, 9).slice(3))], [9, parseLink(linkHash(S_A))], 'dayAnchor and parseLink read dayLink back');
print('address ok');

/* ---------- the photos (finding 21; the round of new photos of 22.10.2026, research/zdjecia-miejsc-2026-10.md) ---------- */
// the first photo is the big one of the atlas card and the thumbnail of the list „Nie ma na twojej trasie”
var GALLERIES = {
  sapa: ['sapa_6', 'sapa_7', 'sapa_8', 'sapa_9', 'sapa_1'],
  danang: ['danang_0', 'danang_5', 'danang_1', 'danang_6', 'danang_7'],
  yokdon: ['yokdon_1', 'yokdon_5', 'yokdon_2', 'yokdon_6', 'yokdon_3'],
  cucphuong: ['cucphuong_5', 'cucphuong_1', 'cucphuong_2', 'cucphuong_0', 'cucphuong_6'],
  cattien: ['cattien_0', 'cattien_6', 'cattien_7', 'cattien_3', 'cattien_8'],
  hoian: ['hoian_7', 'hoian_1', 'hoian_6', 'hoian_4', 'hoian_8'],
  phongnha: ['phongnha_5', 'phongnha_0', 'phongnha_2', 'phongnha_3', 'phongnha_6']
};
Object.keys(GALLERIES).forEach(function (id) { eq(CONTENT[id].photos, GALLERIES[id], id + ': the photos chosen on 22.10.2026, the first one first'); });
eq(CONTENT.yokdon.photos[0], 'yokdon_1', 'Yok Đôn still opens with the Sêrêpốk river (finding 21)');
print('photos ok');
