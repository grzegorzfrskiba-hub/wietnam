/* Pure helpers of the page, shared with the tests: the settings link, the defaults, the day plans of a stay, the holiday
   warnings, the figures of a trip, the places off the trip and the travel texts. No DOM here.
   Calls engine.js (normSettings, isoDay); the data (places, holidays, airports, road texts) comes in through arguments. */
var SITE_URL = 'https://grzegorzfrskiba-hub.github.io/wietnam/';   // the public page: the copied plan links here

/* ---------- the settings link ---------- */
// the keys of a link (Polish, readable) and the settings field each fills; the order of the fields parseLink returns
var LINK_KEYS = { od: 'from', 'do': 'to', start: 'start', koniec: 'end', miesiac: 'month', dni: 'days', co: 'interests', poziom: 'level', dodaj: 'add', usun: 'remove',
  motocykl: 'moto' };
var SETTINGS_ORDER = ['from', 'to', 'start', 'end', 'year', 'month', 'days', 'interests', 'level', 'add', 'remove', 'moto'];

/* The settings in the part of the address after #:
   #od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian&motocykl=caobang, or with dates
   #od=SGN&do=HAN&start=2027-02-01&koniec=2027-02-15&co=&poziom=2. Returns the well-formed fields typed for normSettings:
   from, to, start, end as texts; year, month, days, level as numbers; interests, add, remove, moto as lists (moto: the
   swaps set to „Samodzielnie”, SWAPS in content.js). A malformed field is
   left out, so the page uses its default; unknown keys (an anchor such as #day-5, or a name such as constructor) are ignored.
   A known key without = (a link cut short, as in #od=SGN&do) is a malformed field too.
   rejected, an optional array, gets the settings field name of each malformed field, once. */
function parseLink(hash, rejected) {
  var got = {}, out = {};
  function reject(field) { if (rejected && rejected.indexOf(field) < 0) rejected.push(field); }
  String(hash || '').replace(/^#/, '').split('&').forEach(function (part) {
    var i = part.indexOf('='), key = i < 0 ? part : part.slice(0, i), v, m, list;
    var field = LINK_KEYS.hasOwnProperty(key) ? LINK_KEYS[key] : null;   // no own key: an object property is no field
    if (!field) return;   // an anchor or an unknown key is not a link field
    if (i < 0) { reject(field); return; }
    try { v = decodeURIComponent(part.slice(i + 1)); } catch (e) { reject(field); return; }
    if (field === 'from' || field === 'to') { if (/^[A-Z]{3}$/.test(v)) got[field] = v; else reject(field); }
    else if (field === 'start' || field === 'end') { if (/^\d{4}-\d{2}-\d{2}$/.test(v)) got[field] = v; else reject(field); }
    else if (field === 'month') { if ((m = /^(\d{4})-(\d{2})$/.exec(v))) { got.year = +m[1]; got.month = +m[2]; } else reject(field); }
    else if (field === 'days') { if (/^\d{1,2}$/.test(v)) got.days = +v; else reject(field); }
    else if (field === 'level') { if (/^\d$/.test(v)) got.level = +v; else reject(field); }
    else {
      list = v === '' ? [] : v.split(',');
      if (list.every(function (x) { return (field === 'add' || field === 'remove' ? /^[A-Za-z]+$/ : /^[a-z]+$/).test(x); })) got[field] = list;
      else reject(field);
    }
  });
  SETTINGS_ORDER.forEach(function (k) { if (k in got) out[k] = got[k]; });
  return out;
}

/* The settings as the part of the address after # (parseLink reads it back). The interests are always written, also
   none (co=), so a link keeps meaning "no interest" if the defaults ever change; Dodaj, Usuń and the swaps only when there
   are any. */
function linkHash(s) {
  var parts = ['od=' + s.from, 'do=' + s.to];
  if (s.start) parts.push('start=' + s.start, 'koniec=' + s.end);
  else parts.push('miesiac=' + s.year + '-' + (s.month < 10 ? '0' : '') + s.month, 'dni=' + s.days);
  parts.push('co=' + (s.interests || []).join(','), 'poziom=' + s.level);
  if (s.add && s.add.length) parts.push('dodaj=' + s.add.join(','));
  if (s.remove && s.remove.length) parts.push('usun=' + s.remove.join(','));
  if (s.moto && s.moto.length) parts.push('motocykl=' + s.moto.join(','));
  return '#' + parts.join('&');
}

/* A copy of the settings with lists of its own; add, remove and moto are never missing. */
function copySettings(s) {
  var o = {};
  Object.keys(s).forEach(function (k) { o[k] = Array.isArray(s[k]) ? s[k].slice() : s[k]; });
  o.add = o.add || [];
  o.remove = o.remove || [];
  o.moto = o.moto || [];
  return o;
}

// the settings fields behind each error of normSettings
var ERROR_FIELDS = { airport: ['from', 'to'], date: ['start', 'end'], month: ['year', 'month'], year: ['year'], days: ['days', 'start', 'end'],
  interests: ['interests'], level: ['level'], add: ['add'], remove: ['remove'] };

/* The settings a link opens: its fields over the defaults, checked with normSettings. A field the engine refuses goes back
   to its default (an airport only when it is no known one), one error at a time, until the settings pass. Places with a
   node (a night on the way) are taken out of add and remove: the page has no buttons for them. Unknown or refused values
   in interests, add and remove are dropped too, and their field is reported in dropped. The settings keep only the fields
   of their term: with dates no month, year or days, without dates no start or end; such a field from the link is reported.
   The swaps (moto) keep the ids of swaps (SWAPS) only, each once; an unknown one is dropped and reported.
   Returns { settings, st, dropped }: the settings to show, normSettings' result, and the link fields not used.
   The optional rejected (the malformed fields from parseLink) starts dropped, so they are reported too. */
function settingsFromLink(link, defaults, places, hubs, rejected, swaps) {
  var s = copySettings(defaults), dropped = rejected ? rejected.slice() : [];
  Object.keys(link).forEach(function (k) { s[k] = Array.isArray(link[k]) ? link[k].slice() : link[k]; });
  ['add', 'remove'].forEach(function (k) { s[k] = s[k].filter(function (id) { return !(places[id] && places[id].node); }); });
  for (var tries = 0; tries < 12; tries++) {
    var st = normSettings(s, places, hubs), fields;
    if (st.ok) {
      // the list fields keep only what the engine took; an unknown or refused value counts as a dropped link field
      ['interests', 'add', 'remove'].forEach(function (k) {
        if (k in link && dropped.indexOf(k) < 0 && s[k].some(function (v) { return st[k].indexOf(v) < 0; })) dropped.push(k);
        s[k] = st[k].slice();
      });
      (st.start ? ['year', 'month', 'days'] : ['start', 'end']).forEach(function (k) {
        if (k in link && dropped.indexOf(k) < 0) dropped.push(k);
        delete s[k];
      });
      var moto = s.moto.filter(function (id, i) { return swaps && swaps.hasOwnProperty(id) && s.moto.indexOf(id) === i; });
      if (moto.length !== s.moto.length && dropped.indexOf('moto') < 0) dropped.push('moto');
      s.moto = moto;
      return { settings: s, st: st, dropped: dropped };
    }
    fields = ERROR_FIELDS[st.error];
    if (st.error === 'airport') fields = fields.filter(function (k) { return !(typeof s[k] === 'string' && hubs.hasOwnProperty(s[k])); });
    fields.forEach(function (k) {
      if (k in link && dropped.indexOf(k) < 0) dropped.push(k);
      if (k in defaults) s[k] = Array.isArray(defaults[k]) ? defaults[k].slice() : defaults[k];
      else delete s[k];
    });
  }
  throw new Error('settingsFromLink: the defaults do not pass normSettings');
}

/* The settings without a link: Hồ Chí Minh City → Hà Nội, 15 days, no interest, level 2, in the best of the 12 months
   after today's: the month whose trip scores highest; a tie goes to the month with fewer holidays (tripAlerts), then to
   the earlier one. today: YYYY-MM-DD; data: planRoute's data; holidays: { list, from, until, tetMargin } for tripAlerts. */
function defaultSettings(today, data, holidays) {
  var y = +today.slice(0, 4), m = +today.slice(5, 7), best = null;
  for (var k = 1; k <= 12; k++) {
    var mm = m + k, yy = y;
    while (mm > 12) { mm -= 12; yy++; }
    var s = { from: 'SGN', to: 'HAN', year: yy, month: mm, days: 15, interests: [], level: 2, add: [], remove: [], moto: [] };
    var st = normSettings(s, data.places, data.hubs), r = planRoute(st, data);
    if (!r.ok) continue;
    var hol = tripAlerts(st, holidays.list, holidays.from, holidays.until, holidays.tetMargin).hits.length;
    if (!best || r.score > best.score + 1e-9 || (Math.abs(r.score - best.score) <= 1e-9 && hol < best.hol)) best = { s: s, score: r.score, hol: hol };
  }
  if (!best) throw new Error('defaultSettings: no month gives a trip');
  return best.s;
}

/* Today (YYYY-MM-DD) held inside the days the page plans for: not before fromISO and not after December 1 of lastYear. A
   wrong device clock then still gives defaults the engine accepts and a short list of months. */
function clampToday(todayISO, fromISO, lastYear) {
  var last = lastYear + '-12-01';
  return todayISO < fromISO ? fromISO : todayISO > last ? last : todayISO;
}

/* The months the page offers, [{ year, month }]: from this month to December of lastYear, and always a year ahead. */
function monthChoices(today, lastYear) {
  var y = +today.slice(0, 4), m = +today.slice(5, 7), end = Math.max(lastYear, y + 1), out = [];
  while (y <= end) {
    out.push({ year: y, month: m });
    if (++m > 12) { m = 1; y++; }
  }
  return out;
}

/* ---------- day plans ---------- */
/* One day at an adventure level: with self (the place's swap set to „Samodzielnie”) the self version, at every level;
   else level 1 takes the easy version, level 3 the hard one unless month (1–12) is one of its months off, or unless it is
   late (its night ends away from the stay) and notLate is true; otherwise the usual day. A version keeps the day's early
   start unless it sets its own, and the day's rain plan; its cost and pack, see content.js.
   Returns { pace, t, d, early, rain, variant, cost, pack }, variant 'self', 'easy', 'hard' or null. */
function variantOf(day, level, month, notLate, self) {
  var hard = level === 3 && day.hard && (day.hard.off || []).indexOf(month) < 0 && !(notLate && day.hard.late);
  var v = self && day.self ? 'self' : level === 1 && day.easy ? 'easy' : hard ? 'hard' : null;
  var src = v ? day[v] : day;
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: (v === 'hard' && day.hard.rain ? day.hard.rain : day.rain) || null, variant: v,
    cost: (src.cost || day.cost || []).slice(), pack: (src.pack || day.pack || []).slice() };
}
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay, the second day of a two-day
// hard version (variant 'hard')
function plainDay(x, variant) {
  return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: variant || null, cost: (x.cost || []).slice(), pack: (x.pack || []).slice() };
}

/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant, cost, pack }], one per night, from the stay's first day.
   c: the place's content; stop: { n, start } from planRoute; done: nights spent there earlier in the trip (on a round trip
   the airport's city comes back at the end); level: 1–3; months: st.months, the month (0–11) of each trip day.
   A first stay takes the n plans with the lowest p, in their order o; a one-night stay the solo version of the p 1 plan
   when it has one. A second stay starts with c.again and goes on with the next plans by p. null when there are too few.
   next: the leg after the stay, { home, h } (the way home or not, its hours; see legAfter), or none: no restriction. On
   the stay's last day, when the way home or a leg of LONG_LEG_H hours or more follows, a late hard version (its next
   morning goes on the walk out, so the journey would start around noon) gives way to the usual day.
   self: the place's swap is set to „Samodzielnie”, so the days with a self version take it (selfSwaps).
   A hard version with next spans two days: its night is away (late) and the next day of the stay becomes next, the trip's
   second day, whatever plan stood there. Both or neither: it is taken only when the stay has a next day, and the month of
   its first day decides, as a trip is booked by the day it starts. */
function stopDays(c, stop, done, level, months, next, self) {
  var byP = c.days.slice().sort(function (a, b) { return a.p - b.p; }), out = [], picked;
  var notLate = !!next && (next.home || next.h >= LONG_LEG_H);
  if (done) {
    if (!c.again) return null;
    picked = byP.slice(done, done + stop.n - 1);
    if (picked.length !== stop.n - 1) return null;
    out.push(plainDay(c.again));
  } else {
    picked = byP.slice(0, stop.n);
    if (picked.length !== stop.n) return null;
  }
  var second = null;   // the second day of a two-day hard version taken the day before
  picked.sort(function (a, b) { return a.o - b.o; }).forEach(function (d) {
    var k = stop.start - 1 + out.length, last = out.length === stop.n - 1, two = d.hard && d.hard.next;
    if (second) { out.push(second); second = null; return; }
    if (stop.n === 1 && d.solo) { out.push(plainDay(d.solo)); return; }
    // a late hard version stays off the last day before a long leg, and a two-day one off the last day of any stay
    var away = last && (notLate || !!two);
    var v = variantOf(d, level, months[k] + 1, away, self);
    if (two && v.variant === 'hard') second = plainDay(d.hard.next, 'hard');
    out.push(v);
  });
  out.forEach(function (d, k) { d.day = stop.start + k; });
  return out;
}

/* ---------- dates and holidays ---------- */
/* Calendar date of trip day n (1-based) as YYYY-MM-DD, or null while no start date is set. UTC avoids time-zone shifts. */
function tripDate(startISO, day) {
  if (!startISO) return null;
  var p = startISO.split('-').map(Number);
  return new Date(Date.UTC(p[0], p[1] - 1, p[2] + day - 1)).toISOString().slice(0, 10);
}

/* First and last day of the trip, YYYY-MM-DD: with dates the trip itself, in the month mode the whole month;
   null in the month mode without a year. */
function tripSpan(st) {
  if (st.start) return [st.start, tripDate(st.start, st.days)];
  if (!st.year) return null;
  var mm = (st.month < 10 ? '0' : '') + st.month, last = new Date(Date.UTC(st.year, st.month, 0)).getUTCDate();
  return [st.year + '-' + mm + '-01', st.year + '-' + mm + '-' + last];
}

/* Whether the term is over: the trip's last day (tripSpan: the month's last day in the month mode, the end date with dates)
   is before todayISO (YYYY-MM-DD). False without a span (a month without a year). */
function termPassed(st, todayISO) {
  var span = tripSpan(st);
  return !!span && span[1] < todayISO;
}

/* The holidays that touch the trip: rows [first, last, kind, name] of list (HOLIDAYS) that overlap tripSpan, Tết from
   tetMargin days before its days off to tetMargin days after. unknown: the trip runs outside from…until, the days the
   list covers, or has no year. Returns { hits: [{ from, to, kind, name }], unknown }. */
function tripAlerts(st, list, from, until, tetMargin) {
  var span = tripSpan(st);
  if (!span) return { hits: [], unknown: true };
  var a = isoDay(span[0]), b = isoDay(span[1]);
  var hits = list.filter(function (h) {
    var m = h[2] === 'tet' ? tetMargin : 0;
    return isoDay(h[0]) - m <= b && isoDay(h[1]) + m >= a;
  }).map(function (h) { return { from: h[0], to: h[1], kind: h[2], name: h[3] }; });
  return { hits: hits, unknown: span[0] < from || span[1] > until };
}

/* Days for a sentence: '6–12.02.2027', '30.04–3.05.2027', '28.12.2030–2.01.2031'; one day: '1.01.2027'. */
function fmtSpan(a, b) {
  var p = a.split('-'), q = b.split('-');
  function dm(x) { return +x[2] + '.' + x[1]; }
  if (a === b) return dm(p) + '.' + p[0];
  if (p[0] !== q[0]) return dm(p) + '.' + p[0] + '–' + dm(q) + '.' + q[0];
  if (p[1] !== q[1]) return dm(p) + '–' + dm(q) + '.' + q[0];
  return +p[2] + '–' + dm(q) + '.' + q[0];
}

/* ---------- weather, events and the season of an interest ---------- */
var RAIN_PLAN_DAYS = 10;   // a day's rain plan shows in a month with this many days of rain or more (climate.js, as the page rounds it)

/* The weather of one stay, month by month: [{ month: 1–12, season: 'D'|'S'|'Z'|'X', t: [min, max], mm, days, why: [codes] }],
   one entry for each month the stay's days (start…end) fall in, in order, the numbers rounded as the page shows them.
   stop: { id, start, n }; months: st.months (0–11 for each trip day); climate: CLIMATE; seasons: SEASONS. */
function stayWeather(stop, months, climate, seasons) {
  var c = climate[stop.id], out = [];
  for (var d = stop.start; d < stop.start + stop.n; d++) {
    var m = months[d - 1] + 1;
    if (out.length && out[out.length - 1].month === m) continue;
    out.push({ month: m, season: seasons[stop.id].charAt(m - 1), t: [Math.round(c.t[m - 1][0]), Math.round(c.t[m - 1][1])],
      mm: Math.round(c.rain[m - 1][0]), days: Math.round(c.rain[m - 1][1]), why: (c.why[m] || []).slice() });
  }
  return out;
}

/* Whether a day's rain plan shows: in month (1–12) the place has RAIN_PLAN_DAYS days of rain or more. placeClimate: CLIMATE[id]. */
function rainyMonth(placeClimate, month) { return Math.round(placeClimate.rain[month - 1][1]) >= RAIN_PLAN_DAYS; }

/* The events and seasonal notes of a place that a stay meets: the entries of c.events ({ from, to, t, warn }; from and to
   as [month, day], every year, and a window may run over the new year) that touch the stay's days (start…end). With dates
   the days themselves count; in the month mode, as for the holidays, the whole month of the trip.
   c: the place's content; stop: { start, n }; st: normSettings' result. */
function stayEvents(c, stop, st) {
  var days = [], d, iso;   // each day as month × 100 + day
  if (st.start) for (d = stop.start; d < stop.start + stop.n; d++) { iso = tripDate(st.start, d); days.push(+iso.slice(5, 7) * 100 + +iso.slice(8)); }
  else for (d = 1; d <= 31; d++) days.push(st.month * 100 + d);
  return (c.events || []).filter(function (e) {
    var a = e.from[0] * 100 + e.from[1], b = e.to[0] * 100 + e.to[1];
    return days.some(function (x) { return a <= b ? x >= a && x <= b : x >= a || x <= b; });
  });
}

/* The chosen interests that the trip serves badly. For each chosen interest, the stays that serve it (fit 2 or more; a
   night on the way does not count): when there is none, { interest, none: true }; when each of them has only poor nights
   (Z), { interest, ids: their places, each once, why: the reasons of those months, each once, months: those months (1–12),
   each once, in order }. Otherwise nothing. route: planRoute's trip; st: normSettings' result; climate: CLIMATE. */
function interestAlerts(route, st, places, climate) {
  var out = [];
  st.interests.forEach(function (k) {
    var serving = route.stops.filter(function (s) { return !places[s.id].node && (places[s.id].fit[k] || 0) >= 2; });
    if (!serving.length) { out.push({ interest: k, none: true }); return; }
    if (!serving.every(function (s) { return /^Z+$/.test(s.season); })) return;
    var a = { interest: k, ids: [], why: [], months: [] };
    serving.forEach(function (s) {
      if (a.ids.indexOf(s.id) < 0) a.ids.push(s.id);
      for (var d = s.start; d < s.start + s.n; d++) {
        var m = st.months[d - 1] + 1;
        if (a.months.indexOf(m) < 0) a.months.push(m);
        (climate[s.id].why[m] || []).forEach(function (w) { if (a.why.indexOf(w) < 0) a.why.push(w); });
      }
    });
    out.push(a);
  });
  return out;
}

/* ---------- the trip ---------- */
/* The leg after stay i of a trip, as stopDays wants it (its next): { home, h }, h the hours of the journey. A stop's leg
   in planRoute leads into it, so the leg after a stay is the next stop's; after the last stay it is the way home. */
function legAfter(route, i) {
  var last = i === route.stops.length - 1, leg = last ? route.home : route.stops[i + 1].leg;
  return { home: last, h: leg.total };
}

/* The figures of the facts row: places (each once, nights on the way not counted), domestic flights, hiking days at the
   chosen level, the longest travel day and all hours on the road, the way to the departure airport included.
   route: planRoute's trip; plans: stopDays of each stay; places: PLACES. */
function routeStats(route, plans, places) {
  var seen = {}, out = { places: 0, flights: 0, hikes: 0, longest: 0, road: 0 };
  route.stops.forEach(function (s) { if (!places[s.id].node && !seen[s.id]) { seen[s.id] = true; out.places++; } });
  route.stops.map(function (s) { return s.leg; }).concat([route.home]).forEach(function (L) {
    out.flights += L.flights;
    out.road += L.total;
    out.longest = Math.max(out.longest, L.total);
  });
  plans.forEach(function (days) { days.forEach(function (d) { if (d.pace === 'hike') out.hikes++; }); });
  return out;
}

/* The places that left the trip when Dodaj changed it, in the order of the old trip, for the sentence after Dodaj: on the
   old trip, not on the new one. before, after: the stops of the two trips ({ id }); places: PLACES. A night on the way
   is no place to report, and a city twice on a round trip counts once. */
function droppedPlaces(before, after, places) {
  var now = {}, seen = {}, out = [];
  after.forEach(function (s) { now[s.id] = true; });
  before.forEach(function (s) {
    if (places[s.id].node || now[s.id] || seen[s.id]) return;
    seen[s.id] = true;
    out.push(s.id);
  });
  return out;
}

/* The places that stay on the trip after Dodaj, but with fewer nights, in the order of the old trip: the nights of a place
   are summed (a city twice on a round trip), and a night on the way is no place to report. before, after: the stops of
   the two trips ({ id, n }); places: PLACES. */
function shortenedPlaces(before, after, places) {
  function nights(stops) { var o = {}; stops.forEach(function (s) { if (!places[s.id].node) o[s.id] = (o[s.id] || 0) + s.n; }); return o; }
  var a = nights(before), b = nights(after), seen = {};
  return before.filter(function (s) {
    if (places[s.id].node || seen[s.id] || !(s.id in b) || b[s.id] >= a[s.id]) return false;
    seen[s.id] = true;
    return true;
  }).map(function (s) { return s.id; });
}

/* ---------- why a place is on the trip or not ---------- */
/* Why stay i of the trip is on it, for "Wybrane, bo…". A night on the way: { night: [the place before, the place after] }.
   Otherwise { added, airport, interests, way, months }: added: Dodaj asked for it; airport: 'from' when it opens the trip
   as the city of the arrival airport, 'to' when it closes the trip as the city of the departure airport, else null;
   interests: the chosen interests it serves (fit 2 or more), or, with none chosen, its two strongest of fit 2 or more
   (by fit, then in the order of INTERESTS); way: interests are chosen, it serves none and is no airport's city (it fills
   the days on the way); months: [{ month: 1–12, season }] of its days, each month once, in order.
   route: planRoute's trip; st: normSettings' result; hubs: HUBS. */
function whyOn(route, i, st, places, hubs) {
  var s = route.stops[i], p = places[s.id], last = route.stops.length - 1, months = [];
  if (p.node) return { night: [route.stops[i - 1].id, route.stops[i + 1].id] };
  var chosen = st.interests.filter(function (k) { return (p.fit[k] || 0) >= 2; });
  var strongest = INTERESTS.filter(function (k) { return (p.fit[k] || 0) >= 2; })
    .sort(function (a, b) { return p.fit[b] - p.fit[a] || INTERESTS.indexOf(a) - INTERESTS.indexOf(b); }).slice(0, 2);
  var airport = i === 0 && s.id === hubs[st.from] ? 'from' : i === last && s.id === hubs[st.to] ? 'to' : null;
  for (var d = s.start; d < s.start + s.n; d++) {
    var m = st.months[d - 1] + 1;
    if (!months.length || months[months.length - 1].month !== m) months.push({ month: m, season: s.season.charAt(d - s.start) });
  }
  return { added: st.add.indexOf(s.id) > -1, airport: airport, interests: st.interests.length ? chosen : strongest,
    way: st.interests.length > 0 && !chosen.length && !airport, months: months };
}

/* Why each place off the trip is not on it, south to north: every place without a node that is no stay of the trip.
   reasons, each one that holds, in this order: 'removed' (Usuń took it off); 'level' (it needs a higher level); 'closed'
   (closed, X, in every month of the trip); 'season' (poor, Z, in every month of the trip); 'profile' (interests are chosen
   and it serves none of them, fit under 2); 'far' (it does not fit in: with it added, the trip leaves it missing). When
   none holds: 'beaten' (with this many days, other places scored more). why: the reasons of its poor months (CLIMATE),
   each once. canAdd: Dodaj can put it on the trip (not when it needs a higher level, is closed or does not fit). drops:
   the places that would leave the trip if it were added (droppedPlaces); shorter: those that would stay with fewer nights
   (shortenedPlaces). added: Dodaj asked for it.
   Returns [{ id, reasons, why, canAdd, drops, shorter, added }]. settings: as in the link (Dodaj builds on them); st: their
   normSettings' result; route: planRoute's trip for them; data: planRoute's data; climate: CLIMATE. */
function whyOff(route, settings, st, data, climate) {
  var P = data.places, on = {}, seen = {}, months = [];
  route.stops.forEach(function (s) { on[s.id] = true; });
  st.months.forEach(function (m) { if (!seen[m]) { seen[m] = true; months.push(m + 1); } });
  return Object.keys(P).filter(function (id) { return !P[id].node && !on[id]; })
    .sort(function (a, b) { return P[a].axis - P[b].axis || (a < b ? -1 : 1); })
    .map(function (id) {
      var p = P[id], code = data.seasons[id], x = { id: id, reasons: [], why: [], canAdd: true, drops: [], shorter: [], added: st.add.indexOf(id) > -1 };
      function every(letter) { return months.every(function (m) { return code.charAt(m - 1) === letter; }); }
      if (st.remove.indexOf(id) > -1) x.reasons.push('removed');
      if (p.level > st.level) x.reasons.push('level');
      if (every('X')) x.reasons.push('closed');
      if (every('Z')) {
        x.reasons.push('season');
        months.forEach(function (m) { (climate[id].why[m] || []).forEach(function (w) { if (x.why.indexOf(w) < 0) x.why.push(w); }); });
      }
      if (st.interests.length && st.interests.every(function (k) { return (p.fit[k] || 0) < 2; })) x.reasons.push('profile');
      if (p.level > st.level || every('X')) { x.canAdd = false; return x; }
      var withIt = normSettings(withAdded(settings, id), P, data.hubs), r = withIt.ok ? planRoute(withIt, data) : null;
      // not fitted: closed in part of the term, or too far for these days
      var part = months.some(function (m) { return code.charAt(m - 1) === 'X'; });
      if (!r || !r.ok || r.missing.indexOf(id) > -1) { x.reasons.push(part ? 'closed_part' : 'far'); x.canAdd = false; }
      else { x.drops = droppedPlaces(route.stops, r.stops, P); x.shorter = shortenedPlaces(route.stops, r.stops, P); }
      if (!x.reasons.length) x.reasons.push('beaten');
      return x;
    });
}

/* What Dodaj changed besides the added place: left, the places on the old trip that the new one has not; came, the places
   on the new trip that the old one had not, the added place left out; each in the order of its trip (droppedPlaces:
   a night on the way is no place to report, a city twice on a round trip counts once). */
function addReport(before, after, added, places) {
  return { left: droppedPlaces(before, after, places),
    came: droppedPlaces(after, before, places).filter(function (id) { return id !== added; }) };
}

/* The swaps (SWAPS in content.js) set to „Samodzielnie” in the settings, as the other functions take them: places, the
   places whose days take their self versions (stopDays); roads, by the two places in alphabetical order, the road's self
   text and the item of its cost (segKey, tripBudget). moto: the settings' list of swap ids. */
function selfSwaps(moto, swaps) {
  var out = { places: {}, roads: {} };
  (moto || []).forEach(function (id) {
    var w = swaps[id];
    if (w && w.place) out.places[w.place] = true;
    if (w && w.roads) Object.keys(w.roads).forEach(function (pair) { out.roads[pair] = { text: w.roads[pair].text, cost: w.roads[pair].cost.self }; });
  });
  return out;
}
/* The roads of all swaps, by their two places in alphabetical order: { swap: its id, cost: { driver, self } }. */
function swapRoads(swaps) {
  var out = {};
  Object.keys(swaps).forEach(function (id) {
    Object.keys(swaps[id].roads || {}).forEach(function (pair) { out[pair] = { swap: id, cost: swaps[id].roads[pair].cost }; });
  });
  return out;
}
/* A copy of the settings with swap id set to „Samodzielnie” (self true) or back to the usual way with a driver. */
function withSwap(s, id, self) {
  var o = copySettings(s);
  o.moto = o.moto.filter(function (x) { return x !== id; });
  if (self) o.moto.push(id);
  return o;
}

/* Dodaj and Usuń on a copy of the settings: adding takes the place off the removed list, removing off the added one;
   withoutChanges clears both. */
function withAdded(s, id) {
  var o = copySettings(s);
  o.remove = o.remove.filter(function (x) { return x !== id; });
  if (o.add.indexOf(id) < 0) o.add.push(id);
  return o;
}
function withRemoved(s, id) {
  var o = copySettings(s);
  o.add = o.add.filter(function (x) { return x !== id; });
  if (o.remove.indexOf(id) < 0) o.remove.push(id);
  return o;
}
function withoutChanges(s) {
  var o = copySettings(s);
  o.add = [];
  o.remove = [];
  return o;
}

/* ---------- the budget ---------- */
/* A rough budget for a person, in euros, without the flights to Vietnam: { two, one, parts, items }. two is [from, to] for
   each of two people who share a room, a car, a boat and a guide; one for a person alone, who pays all of them. parts: the
   same split into nights, day (food, Grab, small tickets), travel (roads and domestic flights) and trips (the paid parts of
   the plans); items: the paid things of the trip, each key once with its cost over the whole trip, the domestic flights as
   'flights', dearest first (by to for two; a tie keeps the order of the trip). The rules:
   - a stay's nights cost the room of its place (a night on the way: its node's); an item with night: true (the cruise, the
     night at the rangers' station) has its own room, so its stay counts a night less;
   - each day of the trip costs day, and a person alone pays daySolo more;
   - a road segment costs from a seat in a van (shared) to a car with its driver (car) for its hours; the road of a swap
     (SWAPS: the Hải Vân pass) costs the item of the chosen way instead;
   - a flight costs flight.short up to shortFlightH hours in the air, else flight.long;
   - a plan's cost entry: an item costs pp + group / 2 for two, pp + group for one; a choice (a list) from its cheapest to its
     dearest, under the name of its first item.
   route: planRoute's trip; plans: stopDays of each stay; moto: the swaps set to „Samodzielnie”; data: { costs: COSTS,
   places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H }. */
// what an item of COSTS costs a person: pp + group / 2 for each of two, pp + group for one alone
function itemCost(it) { return { two: [it.pp[0] + it.group[0] / 2, it.pp[1] + it.group[1] / 2], one: [it.pp[0] + it.group[0], it.pp[1] + it.group[1]] }; }
// a plan's cost entry (content.js): an item, or a choice (a list) from its cheapest to its dearest item; items: COSTS.items
function entryCost(e, items) {
  var cs = [].concat(e).map(function (k) { return itemCost(items[k]); });
  function lo(w) { return Math.min.apply(null, cs.map(function (c) { return c[w][0]; })); }
  function hi(w) { return Math.max.apply(null, cs.map(function (c) { return c[w][1]; })); }
  return { two: [lo('two'), hi('two')], one: [lo('one'), hi('one')] };
}
function tripBudget(route, plans, moto, data) {
  var C = data.costs, self = selfSwaps(moto, data.swaps), parts = {}, items = {}, order = [], total = { two: [0, 0], one: [0, 0] };
  ['nights', 'day', 'travel', 'trips'].forEach(function (k) { parts[k] = { two: [0, 0], one: [0, 0] }; });
  function add(part, c, key) {
    [0, 1].forEach(function (i) {
      parts[part].two[i] += c.two[i]; parts[part].one[i] += c.one[i];
      total.two[i] += c.two[i]; total.one[i] += c.one[i];
    });
    if (!key) return;
    if (!items[key]) { items[key] = { key: key, two: [0, 0], one: [0, 0] }; order.push(key); }
    [0, 1].forEach(function (i) { items[key].two[i] += c.two[i]; items[key].one[i] += c.one[i]; });
  }
  var roadOf = swapRoads(data.swaps);   // the roads of the swaps: their cost each way
  function leg(L) {
    L.segs.forEach(function (g) {
      if (g.mode === 'fly') {
        var f = g.h <= data.shortFlightH ? C.flight.short : C.flight.long;
        add('travel', { two: f.slice(), one: f.slice() }, 'flights');
        return;
      }
      var pair = [g.from, g.to].sort().join('-');
      if (roadOf[pair]) {
        var k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].cost.driver;
        add('travel', itemCost(C.items[k]), k);
        return;
      }
      add('travel', { two: [C.shared[0] * g.h, C.car[1] * g.h / 2], one: [C.shared[0] * g.h, C.car[1] * g.h] });
    });
  }
  // in the order of the trip: each stay after the leg that leads to it, then the way home
  route.stops.forEach(function (s, i) {
    var nights = s.n, room = C.night[data.places[s.id].node || s.id];
    leg(s.leg);
    (plans[i] || []).forEach(function (d) {
      d.cost.forEach(function (e) {
        var list = [].concat(e);
        add('trips', entryCost(e, C.items), list[0]);
        if (list.length === 1 && C.items[list[0]].night) nights--;
      });
    });
    add('nights', { two: [room[0] * nights / 2, room[1] * nights / 2], one: [room[0] * nights, room[1] * nights] });
  });
  leg(route.home);
  add('day', { two: [C.day[0] * route.days, C.day[1] * route.days],
    one: [(C.day[0] + C.daySolo[0]) * route.days, (C.day[1] + C.daySolo[1]) * route.days] });
  var list = order.map(function (k, i) { return { k: items[k], i: i }; })
    .sort(function (a, b) { return b.k.two[1] - a.k.two[1] || a.i - b.i; }).map(function (x) { return x.k; });
  return { two: total.two, one: total.one, parts: parts, items: list };
}

/* ---------- before the trip ---------- */
/* Whether a swap set to „Samodzielnie” is on the trip: its place is a stay, or its road a road of a leg. */
function ridesOn(route, moto, swaps) {
  var self = selfSwaps(moto, swaps), legs = route.stops.map(function (s) { return s.leg; }).concat([route.home]);
  return route.stops.some(function (s) { return self.places[s.id]; }) ||
    legs.some(function (L) { return L.segs.some(function (g) { return g.mode === 'road' && !!self.roads[[g.from, g.to].sort().join('-')]; }); });
}

/* What to book ahead on this trip, the most urgent first (by ahead in BOOK; a tie keeps the order of the trip):
   [{ key, ahead, links, two, one, list, items }], key a key of BOOK with ahead over 0. two, one: what it costs a person, as
   tripBudget counts it (a long road from an airport: the car), or null when its cost is part of the stays or the travel
   (homestay, transfer); list: what it is about: the flights as [from, to] codes, the roads from airports as [code, place,
   rides] (each road once, rides 2 when the trip takes it both ways, and its cost counts every ride), the homestays as
   places; items: the items of COSTS booked under the key, each once, in the order of the trip. The keys: flights (any domestic flight);
   airport (a road of AIR_KEYS with book); transfer (a road between two places, but the road of a swap); homestay (a stay
   in a place of homestays); and the book key of each item of the plans and of a swap's road (item.book, or the item's own
   key). route, plans, moto: as for tripBudget; data: { costs, book, swaps, places, airports, airKeys, homestays,
   shortFlightH }. */
function bookList(route, plans, moto, data) {
  var C = data.costs, self = selfSwaps(moto, data.swaps), out = {}, order = [], roadOf = swapRoads(data.swaps);
  function entry(key) {
    var b = data.book[key];
    if (!b || !(b.ahead > 0)) return null;
    if (!out[key]) { out[key] = { key: key, ahead: b.ahead, links: b.links, two: null, one: null, list: [], items: [] }; order.push(key); }
    return out[key];
  }
  function cost(e, c) {
    if (!e) return;
    if (!e.two) { e.two = [0, 0]; e.one = [0, 0]; }
    [0, 1].forEach(function (i) { e.two[i] += c.two[i]; e.one[i] += c.one[i]; });
  }
  // an item of COSTS booked under entry e: its cost, and its name once
  function item(e, k, c) {
    cost(e, c);
    if (e && e.items.indexOf(k) < 0) e.items.push(k);
  }
  function leg(L) {
    cardSegs(L.segs, data.airports).forEach(function (g) {
      var e, k;
      if (g.mode === 'fly') {
        var f = g.h <= data.shortFlightH ? C.flight.short : C.flight.long;
        e = entry('flights');
        cost(e, { two: f, one: f });
        if (e) e.list.push([g.from, g.to]);
        return;
      }
      var code = data.airports[g.from] ? g.from : data.airports[g.to] ? g.to : null, pair = [g.from, g.to].sort().join('-');
      if (code) {
        var place = code === g.from ? g.to : g.from, air = data.airKeys[code + '-' + place];
        if (!air || !air.book) return;
        e = entry('airport');
        cost(e, { two: [C.car[0] * g.h / 2, C.car[1] * g.h / 2], one: [C.car[0] * g.h, C.car[1] * g.h] });
        var seen = e && e.list.filter(function (x) { return x[0] === code && x[1] === place; })[0];
        if (seen) seen[2]++;   // a road both ways: named once, with its rides
        else if (e) e.list.push([code, place, 1]);
      } else if (roadOf[pair]) {
        k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].cost.driver;
        item(entry(C.items[k].book || k), k, itemCost(C.items[k]));
      } else entry('transfer');
    });
  }
  route.stops.forEach(function (s, i) {
    var node = data.places[s.id].node || s.id, h;
    leg(s.leg);
    if (data.homestays.indexOf(node) > -1 && (h = entry('homestay')) && h.list.indexOf(node) < 0) h.list.push(node);
    (plans[i] || []).forEach(function (d) {
      d.cost.forEach(function (e) {
        var k = [].concat(e)[0];
        item(entry(C.items[k].book || k), k, entryCost(e, C.items));
      });
    });
  });
  leg(route.home);
  return order.map(function (k, i) { return { e: out[k], i: i }; })
    .sort(function (a, b) { return b.e.ahead - a.e.ahead || a.i - b.i; }).map(function (x) { return x.e; });
}

var PACK_COLD_C = 15;   // a night this cold or colder (the mean low of a month, as the page rounds it) asks for a warm layer
/* What to pack for this trip: [{ code, places, t }] for the UI keys p.<code>, in this order: warm, the stays with a month
   whose nights are PACK_COLD_C °C or colder (t: the coldest); rain, the stays in a month of rain (rainyMonth); boots for a
   trip with a hike, else shoes; leeches, torch and swim, the stays whose plans or events met ask for them (pack, content.js),
   and swim also the stays by the sea (fit morze 2 or more); moto, when a swap ridden yourself is on the trip; then sun, mosquito,
   cash and apps on every trip. places: the places, each once, in the order of the trip (a night on the way as its node).
   route, plans, moto: as for tripBudget; st: normSettings' result; data: { climate, seasons, content, places, swaps }. */
function packList(route, plans, st, moto, data) {
  var lists = { warm: [], rain: [], leeches: [], torch: [], swim: [] }, cold = null, hike = false, out = [];
  function put(code, id) { if (lists[code].indexOf(id) < 0) lists[code].push(id); }
  route.stops.forEach(function (s, i) {
    var id = data.places[s.id].node || s.id;
    stayWeather(s, st.months, data.climate, data.seasons).forEach(function (w) {
      if (w.t[0] > PACK_COLD_C) return;
      put('warm', id);
      cold = cold === null ? w.t[0] : Math.min(cold, w.t[0]);
    });
    for (var d = s.start; d < s.start + s.n; d++) if (rainyMonth(data.climate[s.id], st.months[d - 1] + 1)) put('rain', id);
    (plans[i] || []).forEach(function (p) {
      if (p.pace === 'hike') hike = true;
      p.pack.forEach(function (k) { put(k, id); });
    });
    stayEvents(data.content[s.id], s, st).forEach(function (e) { (e.pack || []).forEach(function (k) { put(k, id); }); });
    if ((data.places[s.id].fit.morze || 0) >= 2) put('swim', id);
  });
  ['warm', 'rain'].forEach(function (k) { if (lists[k].length) out.push({ code: k, places: lists[k], t: k === 'warm' ? cold : null }); });
  out.push({ code: hike ? 'boots' : 'shoes', places: [], t: null });
  ['leeches', 'torch', 'swim'].forEach(function (k) { if (lists[k].length) out.push({ code: k, places: lists[k], t: null }); });
  if (ridesOn(route, moto, data.swaps)) out.push({ code: 'moto', places: [], t: null });
  ['sun', 'mosquito', 'cash', 'apps'].forEach(function (k) { out.push({ code: k, places: [], t: null }); });
  return out;
}

/* Entry and health for this trip, from ENTRY (before.js): [{ code, vars }] for the UI keys e.<code>: visa (days without a
   visa, the last day of the exemption); visa_end when the trip may end after it (in the month mode the trip may start on
   the month's last day, so its latest end is that day plus the trip); passport; insurance, and insurance_moto when
   riding a motorbike yourself; doctor. st: normSettings' result; riding: a swap ridden yourself is on the trip
   (ridesOn); entry: ENTRY. */
function entryNotes(st, riding, entry) {
  var span = tripSpan(st), until = fmtSpan(entry.visaFreeUntil, entry.visaFreeUntil);
  var end = span && (st.start ? span[1] : tripDate(span[1], st.days));
  var out = [{ code: 'visa', vars: { days: entry.visaFreeDays, until: until } }];
  if (!end || end > entry.visaFreeUntil) out.push({ code: 'visa_end', vars: { until: until } });
  out.push({ code: 'passport', vars: {} }, { code: 'insurance', vars: {} });
  if (riding) out.push({ code: 'insurance_moto', vars: {} });
  out.push({ code: 'doctor', vars: {} });
  return out;
}

/* The text of a photo's licence on creativecommons.org, in Polish: 'CC BY-SA 4.0' → …/licenses/by-sa/4.0/deed.pl, a
   licence of a country ('CC BY-SA 3.0 de') with its country, CC0 → the CC0 deed; null for the public domain, which has no
   licence text (the photo's page on Commons says why). */
function licenceUrl(license) {
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/deed.pl';
  var m = /^CC (BY(?:-SA)?) (\d\.\d)(?: ([a-z]{2}))?$/.exec(license);
  return m ? 'https://creativecommons.org/licenses/' + m[1].toLowerCase() + '/' + m[2] + '/' + (m[3] ? m[3] + '/' : '') + 'deed.pl' : null;
}

/* An amount in euros, [from, to], in złoty: each end at rate and rounded to step złoty (100 for the budget, 10 for one
   item); a from that would round to 0 becomes step. */
function zlRange(eur, rate, step) {
  return eur.map(function (v) { return Math.max(step, Math.round(v * rate / step) * step); });
}
/* A number with its thousands apart (no-break spaces), as Polish writes money: 12400 → '12 400'. */
function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); }

/* ---------- travel texts ---------- */
/* The text of one road segment as [UI key, values]: from or to an airport; a road with a text of its own (roadKeys, by
   its two places in alphabetical order); Cát Bà with the ferry; Cát Tiên with the river crossing; the Mekong buses; else
   a limousine van or a car. The key is picked by the two places and the airport end, so every text reads right in both
   directions of travel (tests/content.test.js bans direction words); only the Mekong text names Phong Điền, so it has one
   form for going there and one for leaving. g: a segment of planRoute's legs; airports: AIRPORTS; selfRoads: the roads
   ridden yourself (selfSwaps(…).roads), whose own text wins; airKeys: AIR_KEYS, the long roads of an airport with a text
   of their own, which wins over the taxi. */
function segKey(g, airports, roadKeys, selfRoads, airKeys) {
  var code = airports[g.from] ? g.from : airports[g.to] ? g.to : null, air = code && airKeys && airKeys[code + '-' + (code === g.from ? g.to : g.from)];
  if (air) return [air.text, {}];
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
  if (airports[g.to]) return ['r.taxi_to', { x: airports[g.to].name }];
  var pair = [g.from, g.to].sort().join('-');
  if (selfRoads && selfRoads[pair]) return [selfRoads[pair].text, {}];
  if (roadKeys[pair]) return [roadKeys[pair], {}];
  if (g.from === 'catba' || g.to === 'catba') return ['r.van_ferry', {}];
  if (g.from === 'cattien' || g.to === 'cattien') return ['r.car_cattien', {}];
  if (g.to === 'mekong') return ['r.bus_mekong', {}];
  if (g.from === 'mekong') return ['r.bus_mekong_from', {}];
  return ['r.van_car', {}];
}

/* The parts of a leg as the card and the list of what to book show them: a road that runs through an airport without a
   flight there (Ninh Bình to Hà Giang by Nội Bài) is one road from its first place to its last, its hours summed; the map
   draws every part (its line runs by the airport). segs: a leg's segments (legBetween); airports: AIRPORTS. */
function cardSegs(segs, airports) {
  var out = [];
  segs.forEach(function (g) {
    var last = out[out.length - 1];
    if (last && last.mode === 'road' && g.mode === 'road' && airports[g.from] && last.to === g.from) out[out.length - 1] = { mode: 'road', from: last.from, to: g.to, h: last.h + g.h };
    else out.push(g);
  });
  return out;
}

/* The ferries of a journey (FERRY in content.js): a road from an airport to a place behind a ferry, with the last crossing
   and the latest landing that makes it; a road from such a place to an airport, with the first crossing and the earliest
   time at the airport. Returns [{ key: 'n.ferry_in', place, last, land } or { key: 'n.ferry_out', place, first, at }].
   leg: a leg of planRoute; ferry: FERRY; airports: AIRPORTS. */
function ferryNotes(leg, ferry, airports) {
  var out = [];
  leg.segs.forEach(function (g) {
    if (g.mode !== 'road') return;
    if (airports[g.from] && ferry[g.to] && ferry[g.to].land[g.from]) out.push({ key: 'n.ferry_in', place: g.to, last: ferry[g.to].last, land: ferry[g.to].land[g.from] });
    if (airports[g.to] && ferry[g.from] && ferry[g.from].at[g.to]) out.push({ key: 'n.ferry_out', place: g.from, first: ferry[g.from].first, at: ferry[g.from].at[g.to] });
  });
  return out;
}

var LONG_LEG_H = 7;   // a travel day this long or longer gets the "long day" flag and a note

/* The notes under a journey, as UI keys: an afternoon flight after two hours or more of road to the airport; a long day;
   after a one-night stay whose plan has a morning part (prevSolo), a warning that a long journey follows.
   prev: the stay before, { n }, or null on the arrival day. */
function legNotes(leg, prev, prevSolo) {
  var out = [];
  if (leg.flights && leg.segs[0].mode === 'road' && leg.segs[0].h >= 2) out.push('n.afternoon');
  if (leg.total >= LONG_LEG_H) out.push('n.long');
  if (prev && prev.n === 1 && prevSolo && leg.total >= 6) out.push('n.solo_long');
  return out;
}

/* ---------- Polish words ---------- */
/* Plural class of a night count: 'one', 'few' (2–4, 22–24…, but not 12–14) or 'many'. English and German use one plural, Polish two. */
function nightForm(n) {
  var last = n % 10, lastTwo = n % 100;
  if (n === 1) return 'one';
  return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'few' : 'many';
}

/* Polish typography: a one-letter word (a i o u w z) gets a no-break space after it, so no line ends on it. It must start the text
   or follow white space, ( „ or –. A run like "i w domu" needs several passes (a match uses up the space in front of the next word), so repeat.
   A number keeps its unit on the line (5 km, 5½ godz., 25 °C, 64 mm), and ≈ and „ok.” keep their number. A range of numbers
   (1–3, 140–260, 11:00–14:30) keeps together: a word joiner after its dash, which a browser would break after. */
function tieShort(text) {
  var before;
  do {
    before = text;
    text = text.replace(/(^|[\s(„–])([aiouwzAIOUWZ]) /g, '$1$2\u00a0');
  } while (text !== before);
  return text.replace(/≈ /g, '≈\u00a0').replace(/([\d½])–(?=[\d½])/g, '$1–\u2060').replace(/(^|[\s(„–])([Oo]k\.) (?=[\d½])/g, '$1$2\u00a0').replace(/([\d½]) (godz\.|min|km|mm|m|°C)(?![\p{L}])/gu, '$1\u00a0$2');
}

/* Multi-word names (Ba Bể, Hồ Chí Minh City) do not break across lines: wherever one stands in text, its spaces become
   no-break spaces. names: the names that have a space, longest first, so a longer name is tied before a shorter one in it. */
function tieNames(text, names) {
  names.forEach(function (n) { if (text.indexOf(n) > -1) text = text.split(n).join(n.replace(/ /g, '\u00a0')); });
  return text;
}

/* Vietnamese names of several words (Thảo Điền, Hà Tôn Quyền) keep together too, without a list: a space between two
   words that start with a capital, when one of them has a letter that Polish has not (ả, ề, ơ, đ…), becomes a no-break
   space. A full stop or a comma between them ends the name. A name without such a letter (Lang Biang) needs the list
   of tieNames. */
var VIET_LETTER = /[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/iu;
function tieVietnamese(text) {
  var parts = String(text).split(/( )/);   // the words, each with its punctuation, and the spaces between them
  for (var i = 1; i < parts.length - 1; i += 2) {
    var a = /(?:^|[^\p{L}\p{M}])(\p{Lu}[\p{L}\p{M}]*)$/u.exec(parts[i - 1]), b = /^\p{Lu}[\p{L}\p{M}]*/u.exec(parts[i + 1]);
    if (a && b && (VIET_LETTER.test(a[1]) || VIET_LETTER.test(b[0]))) parts[i] = '\u00a0';
  }
  return parts.join('');
}

/* ---------- the map: three panels, the markers and the labels ---------- */
var PANEL_GAP = 16;                               // between two panels, px
/* A panel's scale (px per degree) and height from its corners (panels.js): MAP_WIDTH px wide. geo/make_basemap.py works
   them out the same way, rounding the height half up. */
function panelSize(c) {
  var s = MAP_WIDTH / (c.lon1 - c.lon0);
  return { lon0: c.lon0, lat0: c.lat0, s: s, w: MAP_WIDTH, h: Math.round((c.lat0 - c.lat1) * s), bar: c.bar };
}
var PIN_H = 20, POINT_R = 4, AIRPORT_BOX = 12, STUB = 30;
var NAME_PX = 11.5, SUB_PX = 10, SMALL_PX = 10;   // the label fonts: .m-label, .m-sub and .m-faint-label in template.html
// the boxes of labels: a stay's name over its days, a line of 10 px. Chrome draws the glyphs of a line 1.3 em high (IBM Plex:
// 1.025 em above the baseline, 0.275 em below), so a box leaves half a pixel above and below them (app.js: labelText)
var STAY_LABEL_H = 28, LINE_H = 14;

/* A text's width in px, a little more than it takes: IBM Plex Sans semibold by the kind of each letter (measured in
   Chrome, 11.10.2026: 0.47–0.62 em a letter over the names of the places), IBM Plex Mono 0.6 em a letter. */
function textWidth(text, px, mono) {
  if (mono) return String(text).length * px * 0.61;
  var em = 0;
  String(text).split('').forEach(function (ch) {
    em += ch === ' ' ? 0.26 : /[iljI.,:;'!|()]/.test(ch) ? 0.3 : /[ftr]/.test(ch) ? 0.4 : /[mwMW]/.test(ch) ? 0.9 : ch !== ch.toLowerCase() ? 0.68 : 0.58;
  });
  return em * px + 2;
}
/* The width of a panel's title as Chrome draws it (.m-title in template.html, from x 10 in app.js): 10 px monospace capitals,
   0.6 em a letter and letter-spacing 0.1 em; measured at 0.700 em a letter (13.10.2026). */
function titleWidth(text) { return String(text).length * SMALL_PX * 0.7; }
/* Pins that overlap move apart along the line between them, each half the way, just enough to leave PIN_GAP px between
   them (Cúc Phương and Ninh Bình lie 12 px apart on the map, a pin is 20 px wide): each keeps its point as px, py, for a
   line to it. A pin moves only inside the panel, and what one cannot move the other does. Pins in a cluster are pushed
   pair by pair, a few rounds. pins: [{ x, y, w }] (mapLayout's), changed in place; p: the panel (panelSize). */
var PIN_GAP = 2;
function spreadPins(pins, p) {
  function shift(pn, dx, dy) {   // moves a pin, kept inside the panel; returns the move it made
    var x = Math.min(Math.max(pn.x + dx, pn.w / 2), p.w - pn.w / 2), y = Math.min(Math.max(pn.y + dy, PIN_H / 2), p.h - PIN_H / 2);
    var made = [x - pn.x, y - pn.y];
    pn.x = x; pn.y = y;
    return made;
  }
  pins.forEach(function (pn) { pn.px = pn.x; pn.py = pn.y; });
  for (var round = 0; round < 10; round++) {
    var moved = false;
    pins.forEach(function (a, i) {
      pins.slice(i + 1).forEach(function (b) {
        var dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy), W = (a.w + b.w) / 2 + PIN_GAP, H = PIN_H + PIN_GAP;
        if (Math.abs(dx) >= W - 1e-9 || Math.abs(dy) >= H - 1e-9) return;   // apart already
        var ux = d < 0.5 ? 1 : dx / d, uy = d < 0.5 ? 0 : dy / d;
        var need = Math.min(Math.abs(ux) > 1e-9 ? W / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-9 ? H / Math.abs(uy) : Infinity) - (d < 0.5 ? 0 : d);
        var made = shift(a, -ux * need / 2, -uy * need / 2);
        shift(b, ux * need + made[0], uy * need + made[1]);
        moved = true;
      });
    });
    if (!moved) break;
  }
  return pins;
}
function overlapArea(a, b) {
  return Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
}

/* Labels on one panel, each where it covers no other label, no marker and stays inside the panel, when it can.
   items: [{ x, y (the point), w, h (the label), gx, gy (the gap from the point sideways and up or down), drop, toward,
   alts }], in the order of placing; alts: other points [x, y] the label may stand by instead, tried after the first; obstacles: [{ x, y, w, h, k }] that no label should cover, k the weight of covering it: 1 when
   left out; an obstacle with k under 1 (a faint dot) may be covered when nothing better is free; bounds: { w, h }. Each item tries twelve places around its point (right, left, above, below, then shifted
   up, down or sideways), those on the side of toward ([dx, dy], a direction) first; the first that covers nothing wins,
   else the one that covers least (weighted), or none for an item with drop: true. An item with oneLine ({ w, h }, a
   stay's name alone) that finds no free place tries that smaller box too, and takes it when it is free. Returns, in the
   items' order, { x, y (the text's anchor point, at the box's top), anchor, box, clear, cost, alt (0 for the first point,
   then the number of the alts point + 1), oneLine (the smaller box was taken) } or null. */
function placeLabels(items, obstacles, bounds) {
  var placed = [];
  // the best place for a box of w × h by the item's points: the first free one, else the one that covers least
  function spot(it, w, h) {
    var gx = it.gx, gy = it.gy, best = null;
    [[it.x, it.y]].concat(it.alts || []).forEach(function (pt, alt) {
      var x = pt[0], y = pt[1];
      var tries = [[x + gx, y - h / 2, 'start'], [x - gx - w, y - h / 2, 'end'], [x - w / 2, y - gy - h, 'middle'], [x - w / 2, y + gy, 'middle'],
        [x + gx, y - h + 4, 'start'], [x + gx, y - 4, 'start'], [x - gx - w, y - h + 4, 'end'], [x - gx - w, y - 4, 'end'],
        [x - 6, y - gy - h, 'start'], [x + 6 - w, y - gy - h, 'end'], [x - 6, y + gy, 'start'], [x + 6 - w, y + gy, 'end']];
      if (it.toward) {   // the places whose centre lies most in that direction first (a stable sort keeps the rest in order)
        var t = it.toward;
        tries = tries.map(function (p, i) { return { p: p, i: i, d: (p[0] + w / 2 - x) * t[0] + (p[1] + h / 2 - y) * t[1] }; })
          .sort(function (a, b) { return b.d - a.d || a.i - b.i; }).map(function (o) { return o.p; });
      }
      tries.forEach(function (p) {
        var box = { x: p[0], y: p[1], w: w, h: h }, hard = box.w * box.h - overlapArea(box, { x: 0, y: 0, w: bounds.w, h: bounds.h }), soft = 0;
        placed.forEach(function (o) { hard += overlapArea(box, o); });
        obstacles.forEach(function (o) { if (o.k == null) hard += overlapArea(box, o); else soft += overlapArea(box, o) * o.k; });
        if (!best || hard + soft < best.cost - 1e-9) best = { cost: hard + soft, hard: hard, box: box, anchor: p[2], alt: alt };
      });
    });
    return best;
  }
  return items.map(function (it) {
    var best = spot(it, it.w, it.h), one = null;
    if (best.hard >= 0.01 && it.oneLine) one = spot(it, it.oneLine.w, it.oneLine.h);
    if (one && one.hard < 0.01) best = one;
    var clear = best.hard < 0.01;   // sums of floating point areas: less than 0.01 px² is nothing
    if (!clear && it.drop) return null;
    placed.push(best.box);
    var b = best.box;
    return { x: best.anchor === 'start' ? b.x : best.anchor === 'end' ? b.x + b.w : b.x + b.w / 2, y: b.y, anchor: best.anchor, box: b,
      clear: clear, cost: best.cost, alt: best.alt, oneLine: best === one };
  });
}

/* Everything the map draws, in px, for one trip. The panels stand one under another, PANEL_GAP apart (MAP_PANELS in
   panels.js, sized by panelSize). Each panel gets: its stays as pins with the stay numbers (a city twice on a round trip is
   one pin; pins that would overlap move apart, spreadPins); the legs inside it; a stub for the legs to another panel, one per point, toward where they go, with the names
   of the other ends; the trip's airports; a stay's point of interest (content poi); the places off the trip as faint dots;
   and the labels. The airports' boxes come first: on their point, or moved straight off a pin that would hide them. Then
   the labels of the stays (the most crowded first), the stubs and the points of interest, placed by placeLabels so that
   none covers another, a marker or the edge (a stub gets longer or turns when its label finds no room, a stay's label
   keeps its name alone when its two lines find none); a label that
   finds none starts the placing again in front, up to ten times, and the try with the fewest such labels wins. Last, the
   names of the faint dots, only where they fit.
   The names on the basemap (the panel's names) are drawn first; a label may cover one when nothing better is free.
   route: planRoute's trip; st: normSettings' result; m: { panels, places, content, airports, say }: MAP_PANELS, PLACES,
   CONTENT, AIRPORTS and say(key) giving an interface text (the names on the basemap; 'day' and 'days' before day numbers).
   The whole degrees of latitude come last: each line is drawn, and its label at the right edge (gridBox) only where it
   covers no label and no marker.
   Returns { height, panels: [{ key, y, p (panelSize), grid, names, segs, stubs, pins, airports, pois, faint, labels }] };
   a pin is { key, x, y, w, nums, px, py }: px, py its point, x, y where it is drawn;
   grid is [{ lat, y, label }] (label: its text is drawn), a name { text, kind, x, y, anchor }, a label { kind:
   'stop'|'stub'|'poi'|'faint', key, lines, x, y, anchor, box, clear }. */
// the box of a degree's label: "21°N" in 10 px monospace, ending 6 px from the panel's right edge, 4 px over its line (app.js)
function gridBox(g, p) {
  var w = textWidth(g.lat + '°N', SMALL_PX, true);
  return { x: p.w - 6 - w, y: g.y - 14.5, w: w, h: 13.5 };
}
// a stub's length (× STUB) and turn in degrees, in the order tried
var STUB_TIPS = [[1, 0], [1.5, 0], [2, 0], [1.5, 35], [1.5, -35], [2, 60], [2, -60], [2.5, 0]];
function mapLayout(route, st, m) {
  var groups = {}, order = [], out = [], top = 0;
  function node(id) { return m.places[id].node || id; }
  function where(n) { return m.airports[n] ? m.airports[n].pt : m.content[n].pt; }
  function nameOf(n) { return m.airports[n] ? m.airports[n].short || m.airports[n].name : m.content[n].short; }
  route.stops.forEach(function (s, i) {
    var k = node(s.id);
    if (!groups[k]) { groups[k] = []; order.push(k); }
    groups[k].push({ num: i + 1, start: s.start, end: s.end });
  });
  var legs = route.stops.map(function (s) { return s.leg; }).concat([route.home]);
  var ends = st.from === st.to ? [st.from] : [st.from, st.to];
  Object.keys(m.panels).forEach(function (key) {
    var p = panelSize(m.panels[key]), P = { key: key, y: top, p: p, grid: [], names: [], segs: [], stubs: [], pins: [], airports: [], pois: [], faint: [], labels: [] };
    function proj(pt) { return [(pt[1] - p.lon0) * p.s, (p.lat0 - pt[0]) * p.s]; }
    function inside(q) { return q[0] >= 0 && q[0] <= p.w && q[1] >= 0 && q[1] <= p.h; }
    function pinBox(pn) { return { x: pn.x - pn.w / 2, y: pn.y - PIN_H / 2, w: pn.w, h: PIN_H }; }
    function dot(q, k) { return { x: q[0] - POINT_R, y: q[1] - POINT_R, w: 2 * POINT_R, h: 2 * POINT_R, k: k }; }
    // the panel's title (top left, from x 10: titleWidth) and scale bar (bottom left or right) take their corners
    var obstacles = [{ x: 0, y: 0, w: 10 + titleWidth(m.say('m.' + key)) + 6, h: 24 }, { x: p.bar === 'left' ? 0 : p.w - 80, y: p.h - 18, w: 80, h: 18 }], items = [], faint = [];
    (m.panels[key].names || []).forEach(function (n) {   // the names on the basemap: countries in 9 px capitals, water in 11 px italics
      var q = proj([n[1], n[2]]), text = m.say(n[0]), w = n[3] === 'country' ? text.length * 9 * 0.78 : textWidth(text, 11) * 0.9;
      P.names.push({ text: text, kind: n[3], x: q[0], y: q[1], anchor: n[4] });
      obstacles.push({ x: n[4] === 'start' ? q[0] : n[4] === 'end' ? q[0] - w : q[0] - w / 2, y: q[1] - 10, w: w, h: 13, k: 0.5 });
    });
    order.forEach(function (k) {
      var q = proj(m.content[k].pt);
      if (!inside(q)) return;
      var nums = groups[k].map(function (v) { return v.num; }).join('·'), w = Math.max(PIN_H, 10 + nums.length * 6.5);
      var parts = groups[k].map(function (v) { return v.start === v.end ? '' + v.start : v.start + '–' + v.end; });
      var sub = m.say(parts.length > 1 || parts[0].indexOf('–') > -1 ? 'days' : 'day') + ' ' + parts.join(', ');
      P.pins.push({ key: k, x: q[0], y: q[1], w: w, nums: nums });
      items.push({ x: q[0], y: q[1], w: Math.max(textWidth(m.content[k].short, NAME_PX), textWidth(sub, SUB_PX, true)), h: STAY_LABEL_H, gx: w / 2 + 3, gy: PIN_H / 2 + 2,
        toward: q[0] > p.w - 70 ? [-1, 0] : q[0] < 70 ? [1, 0] : null,   // near a side of the panel, the label tries inward first
        oneLine: { w: textWidth(m.content[k].short, NAME_PX), h: LINE_H },   // in a crowded place: the name alone, the days stay on the pin
        what: { kind: 'stop', key: k, lines: [m.content[k].short, sub] } });
    });
    spreadPins(P.pins, p);   // pins that would overlap move apart, and their labels with them
    P.pins.forEach(function (pn, i) { items[i].x = pn.x; items[i].y = pn.y; });
    P.pins.forEach(function (pn) { obstacles.push(pinBox(pn)); });
    // the stays in crowded places first: the more pins within 70 px, the earlier, then in the order of the trip
    function crowd(it) { return P.pins.filter(function (pn) { return Math.abs(pn.x - it.x) < 70 && Math.abs(pn.y - it.y) < 70; }).length; }
    items = items.map(function (it, i) { return { it: it, i: i, c: crowd(it) }; }).sort(function (a, b) { return b.c - a.c || a.i - b.i; }).map(function (x) { return x.it; });
    // the airports' boxes: on their point, or moved straight off a pin that would hide them, as little as it takes
    ends.forEach(function (code) {
      var q = proj(m.airports[code].pt), half = AIRPORT_BOX / 2, box = { x: q[0] - half, y: q[1] - half, w: AIRPORT_BOX, h: AIRPORT_BOX };
      if (!inside(q)) return;
      function hit() { return P.pins.filter(function (pn) { return overlapArea(box, pinBox(pn)) > 0; })[0]; }
      var pin = hit();
      if (pin) {
        var vx = q[0] - pin.x, vy = q[1] - pin.y, vl = Math.sqrt(vx * vx + vy * vy);
        if (vl < 1) { vx = 0; vy = -1; vl = 1; }   // the point under the middle of the pin: up
        for (var step = 1; step <= 40 && hit(); step++) { box.x = q[0] - half + vx / vl * step; box.y = q[1] - half + vy / vl * step; }
      }
      P.airports.push({ code: code, x: q[0], y: q[1], bx: box.x + half, by: box.y + half });
      obstacles.push(box, { x: q[0] - 3, y: q[1] - 3, w: 6, h: 6 });   // the box, and the point where the road starts
    });
    // the legs inside the panel; the legs from one point here to another panel make one stub
    var stubAt = {}, stubs = [];
    legs.forEach(function (L) {
      L.segs.forEach(function (g) {
        var a = proj(where(g.from)), b = proj(where(g.to)), ia = inside(a), ib = inside(b);
        if (ia && ib) { P.segs.push({ mode: g.mode, x1: a[0], y1: a[1], x2: b[0], y2: b[1] }); return; }
        if (!ia && !ib) return;
        var here = ia ? g.from : g.to, from = ia ? a : b, to = ia ? b : a, dx = to[0] - from[0], dy = to[1] - from[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
        var s = stubAt[here] || (stubAt[here] = { mode: g.mode, x1: from[0], y1: from[1], vx: 0, vy: 0, names: [] });
        if (!s.names.length) stubs.push(s);
        s.vx += dx / len; s.vy += dy / len;
        // the other end by name, a flight with ✈ and a road with an arrow (stage 3: Phong Nha has roads to the north panel)
        var name = (g.mode === 'fly' ? '✈ ' : '→ ') + nameOf(ia ? g.to : g.from);
        if (s.names.indexOf(name) < 0) s.names.push(name);
      });
    });
    // a stub's tip: len px from its point toward its way, turned by deg degrees, held 4 px inside the panel
    function tipOf(s, len, deg) {
      var a = (deg || 0) * Math.PI / 180, ux = s.ux * Math.cos(a) - s.uy * Math.sin(a), uy = s.ux * Math.sin(a) + s.uy * Math.cos(a), k = len;
      [[ux, s.x1, p.w], [uy, s.y1, p.h]].forEach(function (v) {
        if (v[0] > 0) k = Math.min(k, (v[2] - 4 - v[1]) / v[0]);
        if (v[0] < 0) k = Math.min(k, (4 - v[1]) / v[0]);
      });
      k = Math.max(k, 0);
      return [s.x1 + ux * k, s.y1 + uy * k];
    }
    stubs.forEach(function (s) {
      var vl = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      if (vl < 0.1) { s.vx = 0; s.vy = 1; vl = 1; }   // two ways that cancel out (there and back): straight down
      s.ux = s.vx / vl; s.uy = s.vy / vl;
      var lines = s.names, tips = STUB_TIPS.map(function (v) { return tipOf(s, STUB * v[0], v[1]); });
      items.push({ x: tips[0][0], y: tips[0][1], alts: tips.slice(1), w: Math.max.apply(null, lines.map(function (l) { return textWidth(l, SUB_PX, true); })),
        h: LINE_H * lines.length, gx: 3, gy: 3, toward: [s.ux, s.uy], stub: s, what: { kind: 'stub', key: s.names.join(', '), lines: lines } });
    });
    route.stops.forEach(function (s) {
      var poi = m.content[s.id].poi, q = poi && proj(poi.pt);
      if (!q || !inside(q) || P.pois.some(function (o) { return o.name === poi.name; })) return;
      P.pois.push({ name: poi.name, x: q[0], y: q[1], from: proj(m.content[s.id].pt) });
      obstacles.push(dot(q));
      items.push({ x: q[0], y: q[1], w: textWidth(poi.name, SUB_PX, true), h: LINE_H, gx: POINT_R + 3, gy: POINT_R + 2, what: { kind: 'poi', key: poi.name, lines: [poi.name] } });
    });
    Object.keys(m.places).forEach(function (id) {
      var q = proj(m.content[id].pt);
      if (m.places[id].node || groups[id] || !inside(q)) return;
      P.faint.push({ id: id, x: q[0], y: q[1] });
      obstacles.push(dot(q, 0.3));   // a label may cover a faint dot when nothing better is free
      faint.push({ x: q[0], y: q[1], w: textWidth(m.content[id].short, SMALL_PX), h: LINE_H, gx: POINT_R + 3, gy: POINT_R + 2, drop: true,
        what: { kind: 'faint', key: id, lines: [m.content[id].short] } });
    });
    var best = null, list = items;
    for (var tryNo = 0; tryNo < 10 && list.length; tryNo++) {
      var got = placeLabels(list, obstacles, p), stuck = got.filter(function (l) { return !l.clear; }).length;
      var cost = got.reduce(function (a, l) { return a + l.cost; }, 0);
      if (!best || stuck < best.stuck || (stuck === best.stuck && cost < best.cost - 1e-9)) best = { got: got, list: list, stuck: stuck, cost: cost };
      if (!stuck) break;
      var bad = got.map(function (l, i) { return l.clear ? -1 : i; }).filter(function (i) { return i > -1; })[0];
      list = [list[bad]].concat(list.slice(0, bad), list.slice(bad + 1));
    }
    var taken = obstacles.slice();
    (best ? best.got : []).forEach(function (l, i) {
      var it = best.list[i];
      if (it.stub) {
        var v = STUB_TIPS[l.alt], tip = tipOf(it.stub, STUB * v[0], v[1]);
        P.stubs.push({ mode: it.stub.mode, x1: it.stub.x1, y1: it.stub.y1, x2: tip[0], y2: tip[1] });
      }
      P.labels.push(Object.assign({}, it.what, l, l.oneLine ? { lines: it.what.lines.slice(0, 1) } : {}));
      taken.push(l.box);
    });
    placeLabels(faint, taken, p).forEach(function (l, i) { if (l) { P.labels.push(Object.assign({}, faint[i].what, l)); taken.push(l.box); } });
    for (var lat = Math.ceil(p.lat0 - p.h / p.s); lat <= Math.floor(p.lat0); lat++) {
      var g = { lat: lat, y: (p.lat0 - lat) * p.s }, gb = gridBox(g, p);
      g.label = !taken.some(function (o) { return overlapArea(gb, o) > 0; });
      P.grid.push(g);
    }
    out.push(P);
    top += p.h + PANEL_GAP;
  });
  return { height: top - PANEL_GAP, panels: out };
}
