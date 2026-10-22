/* Pure helpers of the atlas of places (stage 7, …/atlas/, notes/plans/2026-10-22-atlas-projekt.md), shared with the tests:
   the order of the places and their regions, what a card shows from the data that is there already (the interests, the
   nights, the bar of the twelve months, what to do) and the atlas's address. No DOM here. Calls page.js (nightForm,
   pageHash) and engine.js (INTERESTS); the data comes in through arguments. */

/* ---------- the places ---------- */
// the regions in the atlas's order, from the north (decision 5)
var ATLAS_REGIONS = ['north', 'centre', 'south'];

/* The places of the atlas from north to south (findings 11 and 5): every place without a node (a night on the way has no
   card of its own), by axis in places.js, the highest first; places with the same axis by id. places: PLACES. */
function atlasOrder(places) {
  return Object.keys(places).filter(function (id) { return !places[id].node; })
    .sort(function (a, b) { return places[b].axis - places[a].axis || (a < b ? -1 : 1); });
}

/* The places by region (finding 12): [{ region, ids }] in the order of ATLAS_REGIONS, each region's places in the order of
   ids; a region without a place is left out. content: the places' texts (their region). */
function atlasRegions(ids, content) {
  return ATLAS_REGIONS.map(function (r) { return { region: r, ids: ids.filter(function (id) { return content[id].region === r; }) }; })
    .filter(function (g) { return g.ids.length; });
}

/* The interests a place serves well (finding 6): those it fits 2 or 3 (fit in places.js), the best first, then in the
   order of INTERESTS. */
function placeInterests(fit) {
  return INTERESTS.filter(function (k) { return (fit[k] || 0) >= 2; })
    .sort(function (a, b) { return fit[b] - fit[a] || INTERESTS.indexOf(a) - INTERESTS.indexOf(b); });
}

/* The nights a stay of the place takes on a trip (finding 8): from its least to its most (nights in places.js, [min, ideal,
   max]) as "2–4", one number when they are the same; form, the plural class of the larger one for its word ("2–4 noce",
   "4–5 nocy"; nightForm). */
function nightsSpan(nights) {
  return { text: nights[0] === nights[2] ? String(nights[0]) : nights[0] + '–' + nights[2], form: nightForm(nights[2]) };
}

/* What to do at a place (finding 8): the titles of its usual plans in the order of a stay (o), each once, and the titles of
   its hard versions (Ekstremalnie), each once and none that is a usual title already. Not the easy versions, the plan of
   one night (solo), the second stay (again), a swap's own plan (self), what to skip or the version over two days (next).
   c: the place's texts in the page's language. Returns { usual: [titles], hard: [titles] }. */
function placeTodo(c) {
  var usual = [], hard = [];
  c.days.slice().sort(function (a, b) { return a.o - b.o; }).forEach(function (d) { if (usual.indexOf(d.t) < 0) usual.push(d.t); });
  c.days.slice().sort(function (a, b) { return a.o - b.o; }).forEach(function (d) {
    if (d.hard && usual.indexOf(d.hard.t) < 0 && hard.indexOf(d.hard.t) < 0) hard.push(d.hard.t);
  });
  return { usual: usual, hard: hard };
}

/* ---------- the bar of the twelve months (finding 7) ---------- */
/* The place's season month by month: [{ m: 1–12, season: 'D' | 'S' | 'Z' | 'X', why, trip }]; why, the reasons of a fair or
   poor month (codes of WEATHER_WHY, from the place's climate), none for a good one; trip, a month of the trip (tripMonths:
   1–12, termMonths in wildpage.js; null without a trip). code: SEASONS[id]; why: CLIMATE[id].why. */
function seasonBar(code, why, tripMonths) {
  var out = [];
  for (var m = 1; m <= 12; m++) {
    var s = code.charAt(m - 1);
    out.push({ m: m, season: s, why: s === 'D' ? [] : (why[m] || []).slice(), trip: !!tripMonths && tripMonths.indexOf(m) > -1 });
  }
  return out;
}
/* The months of the bar by season, for the reader of a screen: [{ season, months }] good, fair, poor, closed, each season
   once with its months in order, a season without a month left out. bar: seasonBar's. */
function seasonGroups(bar) {
  return ['D', 'S', 'Z', 'X'].map(function (s) { return { season: s, months: bar.filter(function (x) { return x.season === s; }).map(function (x) { return x.m; }) }; })
    .filter(function (g) { return g.months.length; });
}

/* ---------- the address (findings 4 and 18) ---------- */
/* The place of the atlas's address: its first part, before the trip's settings (#hoian&od=…), when that is a place of the
   atlas (ids); else null. */
function atlasPlace(hash, ids) {
  var first = String(hash || '').replace(/^#/, '').split('&')[0];
  return ids.indexOf(first) > -1 ? first : null;
}
/* The atlas's address: the place, when there is one, then the trip's settings in the page's view (pageHash: koszty=1 and
   lang=pl as on the page with the route), or without a trip lang=pl alone; '' for the atlas in English without either. */
function atlasHash(place, settings, lang, costs) {
  var parts = place ? [place] : [];
  if (settings) parts.push(pageHash(settings, lang, costs).slice(1));
  else if (lang === 'pl') parts.push('lang=pl');
  return parts.length ? '#' + parts.join('&') : '';
}
