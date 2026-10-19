/* Pure helpers of the wildlife subpage (stage 6, …/wildlife/), shared with the tests: its address, the trip it was opened
   with and what that trip means for each encounter. No DOM here. Calls page.js (parseLink, linkHash, pageHash, stopDays,
   legAfter) and engine.js (normSettings, planRoute); the data comes in through arguments. */

/* ---------- the address ---------- */
// the tabs, in their order on the page (finding 1 of stage 6): On your route, Gallery, Field guide
var WILD_TABS = ['route', 'gallery', 'guide'];
// the groups of the gallery, in their order (finding 12): the legends last
var WILD_GROUPS = ['primates', 'mammals', 'birds', 'reptiles', 'insects', 'legends'];

/* Whether the address carries a trip: the settings of the page with the route, as its link writes them (od=… first). */
function hasTrip(hash) { return /(?:^#?|&)od=/.test(String(hash || '')); }

/* The tab of the address after #: route, gallery or guide, or guide-<place> for a place of the field guide (the link „Zwierzęta
   tutaj →” of a stay, finding 5); the first part of the address, before the settings. Without one, or with an unknown one,
   a link with a trip opens On your route and one without opens the Gallery (finding 3).
   Returns { tab, place }, place an id of guide or null. guide: the field guide's places (WILD_GUIDE). */
function wildView(hash, guide) {
  var first = String(hash || '').replace(/^#/, '').split('&')[0], m = /^guide-([a-z]+)$/.exec(first);
  if (WILD_TABS.indexOf(first) > -1) return { tab: first, place: null };
  if (m && guide.hasOwnProperty(m[1])) return { tab: 'guide', place: m[1] };
  return { tab: hasTrip(hash) ? 'route' : 'gallery', place: null };
}

/* The subpage's address for a view: the tab (guide-<place> with a place), the trip's settings when there is one, then
   koszty=1 and lang=pl as on the page with the route (pageHash), so its links back open the trip as it was. */
function wildHash(view, settings, lang, costs) {
  var tab = '#' + view.tab + (view.place ? '-' + view.place : '');
  if (settings) return tab + '&' + pageHash(settings, lang, costs).slice(1);
  return tab + (lang === 'pl' ? '&lang=pl' : '');
}

/* The address of the page with the route from the subpage: the trip as it was (pageHash), or the page's own defaults when
   the subpage knows no trip ('' opens them, in English; lang=pl in Polish). add: a place to put on the trip (Dodaj, finding
   10): the page reads it from dodaj= and plans the trip again. Relative, as the subpage lives one folder down. */
function tripLink(settings, lang, costs, add) {
  if (settings) return '../' + pageHash(add ? withAdded(settings, add) : settings, lang, costs);
  var parts = (add ? ['dodaj=' + add] : []).concat(lang === 'pl' ? ['lang=pl'] : []);
  return '../' + (parts.length ? '#' + parts.join('&') : '');
}

/* ---------- the trip ---------- */
/* The stays of a trip by place, with their trip days and day plans (stopDays): { id: [{ first, last, days }] }, a city twice
   on a round trip with both stays. route: planRoute's trip; st: its normSettings' result; content: the places' texts (their
   days); ferry: FERRY of travel.js (legAfter); self: the places of the swaps set to „Samodzielnie” (selfSwaps(…).places),
   whose days take their self versions, as on the page with the route. */
function tripStays(route, st, content, ferry, self) {
  var out = {}, done = {};
  route.stops.forEach(function (x, i) {
    if (!content[x.id]) return;   // a night on the way has no plans
    var days = stopDays(content[x.id], x, done[x.id] || 0, st.level, st.months, legAfter(route, i, ferry), !!(self && self[x.id])) || [];
    done[x.id] = (done[x.id] || 0) + x.n;
    (out[x.id] = out[x.id] || []).push({ first: x.start, last: x.start + x.n - 1, days: days });
  });
  return out;
}

/* The places a card offers to add (finding 27): without a trip (stays null) each place of the species; with one, the
   places off the trip, unless the species is on the trip in its term already (an encounter on the trip in a month of its
   months, or of the whole year): butterflies in June at Cúc Phương (IV–V) offer Cát Tiên (V–VII). sp: a species of WILD;
   stays: tripStays; months: st.months. */
function addPlaces(sp, stays, months) {
  var places = [];
  sp.meet.forEach(function (m) { if (places.indexOf(m.place) < 0 && !(stays && stays[m.place])) places.push(m.place); });
  if (stays && sp.meet.some(function (m) { var o = meetOnTrip(m, stays, months); return o && o.month !== false; })) return [];
  return places;
}

/* What the trip means for one encounter (findings 9 and 11): null when its place is not on the trip; else
   { first, last, plan, month }: the trip days of the place's stays; plan, whether a day of the trip comes from a plan whose
   text names the encounter (meet.plan: [[p, version]], the plans of the place's texts, '' for the usual version); month,
   whether a day of those stays falls in a month of meet.months, or null for an animal of the whole year. A plan counts
   only in a month of the encounter, as fireflies on a night ride in February are no plan of seeing them.
   stays: tripStays; months: st.months, the month (0–11) of each trip day. */
function meetOnTrip(meet, stays, months) {
  var list = stays[meet.place];
  if (!list) return null;
  var inMonth = function (day) { return !meet.months || meet.months.indexOf(months[day - 1] + 1) > -1; }, month = false, plan = false;
  list.forEach(function (s) {
    for (var d = s.first; d <= s.last; d++) if (inMonth(d)) month = true;
    s.days.forEach(function (d) {
      if ((meet.plan || []).some(function (x) { return d.plan && d.plan.p === x[0] && d.plan.v === x[1]; }) && inMonth(d.day)) plan = true;
    });
  });
  return { first: list[0].first, last: list[list.length - 1].last, plan: plan, month: meet.months ? month : null };
}

/* Whether an encounter's animal can be seen in a term at all (finding 10): true for one of the whole year, else whether a
   month of the term is one of meet.months. termMonths: the months (1–12) of the trip, once each. */
function meetInTerm(meet, termMonths) {
  return !meet.months || termMonths.some(function (m) { return meet.months.indexOf(m) > -1; });
}

/* The months (1–12) of a trip, once each, in the order of the trip: st.months is the month (0–11) of each day. */
function termMonths(st) {
  var out = [];
  st.months.forEach(function (m) { if (out.indexOf(m + 1) < 0) out.push(m + 1); });
  return out;
}

/* The species of On your route in their order (finding 11): with a trip, first the ones with an encounter on it, then the
   rest; in each group the biggest chance of any of their encounters first, then the order of WILD. Without a trip (onTrip
   null) one group by chance. Returns { on: [ids], off: [ids] }. wild: WILD; onTrip(id): whether the species meets the trip. */
function routeOrder(wild, onTrip) {
  var ids = Object.keys(wild).filter(function (id) { return wild[id].route; });
  var best = function (id) { return Math.max.apply(null, wild[id].meet.map(function (m) { return m.chance; })); };
  var sorted = function (list) { return list.map(function (id, i) { return [id, i]; }).sort(function (a, b) { return best(b[0]) - best(a[0]) || a[1] - b[1]; }).map(function (x) { return x[0]; }); };
  if (!onTrip) return { on: [], off: sorted(ids) };
  return { on: sorted(ids.filter(onTrip)), off: sorted(ids.filter(function (id) { return !onTrip(id); })) };
}

/* The encounters of the field guide's place p (finding 14): every encounter of a species there, in the order of WILD, then
   the guide's own rows. Returns [{ id, i } | { row }]: id and the index of its encounter, or the row of WILD_GUIDE. */
function guideRows(wild, guide, p) {
  var out = [];
  Object.keys(wild).forEach(function (id) { (wild[id].meet || []).forEach(function (m, i) { if (m.place === p) out.push({ id: id, i: i }); }); });
  (guide[p].rows || []).forEach(function (r) { out.push({ row: r }); });
  return out;
}
