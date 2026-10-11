/* Pure helpers of the page, shared with the tests: the settings link, the defaults, the day plans of a stay, the holiday
   warnings, the figures of a trip, the places off the trip and the travel texts. No DOM here.
   Calls engine.js (normSettings, isoDay); the data (places, holidays, airports, road texts) comes in through arguments. */
var SITE_URL = 'https://grzegorzfrskiba-hub.github.io/wietnam/';   // the public page: the copied plan links here

/* ---------- the settings link ---------- */
// the keys of a link (Polish, readable) and the settings field each fills; the order of the fields parseLink returns
var LINK_KEYS = { od: 'from', 'do': 'to', start: 'start', koniec: 'end', miesiac: 'month', dni: 'days', co: 'interests', poziom: 'level', dodaj: 'add', usun: 'remove' };
var SETTINGS_ORDER = ['from', 'to', 'start', 'end', 'year', 'month', 'days', 'interests', 'level', 'add', 'remove'];

/* The settings in the part of the address after #:
   #od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian, or with dates
   #od=SGN&do=HAN&start=2027-02-01&koniec=2027-02-15&co=&poziom=2. Returns the well-formed fields typed for normSettings:
   from, to, start, end as texts; year, month, days, level as numbers; interests, add, remove as lists. A malformed field is
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
      if (list.every(function (x) { return (field === 'interests' ? /^[a-z]+$/ : /^[A-Za-z]+$/).test(x); })) got[field] = list;
      else reject(field);
    }
  });
  SETTINGS_ORDER.forEach(function (k) { if (k in got) out[k] = got[k]; });
  return out;
}

/* The settings as the part of the address after # (parseLink reads it back). The interests are always written, also
   none (co=), so a link keeps meaning "no interest" if the defaults ever change; Dodaj and Usuń only when there are any. */
function linkHash(s) {
  var parts = ['od=' + s.from, 'do=' + s.to];
  if (s.start) parts.push('start=' + s.start, 'koniec=' + s.end);
  else parts.push('miesiac=' + s.year + '-' + (s.month < 10 ? '0' : '') + s.month, 'dni=' + s.days);
  parts.push('co=' + (s.interests || []).join(','), 'poziom=' + s.level);
  if (s.add && s.add.length) parts.push('dodaj=' + s.add.join(','));
  if (s.remove && s.remove.length) parts.push('usun=' + s.remove.join(','));
  return '#' + parts.join('&');
}

/* A copy of the settings with lists of its own; add and remove are never missing. */
function copySettings(s) {
  var o = {};
  Object.keys(s).forEach(function (k) { o[k] = Array.isArray(s[k]) ? s[k].slice() : s[k]; });
  o.add = o.add || [];
  o.remove = o.remove || [];
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
   Returns { settings, st, dropped }: the settings to show, normSettings' result, and the link fields not used.
   The optional rejected (the malformed fields from parseLink) starts dropped, so they are reported too. */
function settingsFromLink(link, defaults, places, hubs, rejected) {
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

/* The settings without a link, for now (stage 2 sets the real ones): Hồ Chí Minh City → Hà Nội, the next month, 15 days,
   no interest, level 2. today: YYYY-MM-DD. */
function defaultSettings(today) {
  var y = +today.slice(0, 4), m = +today.slice(5, 7) + 1;
  if (m > 12) { m = 1; y++; }
  return { from: 'SGN', to: 'HAN', year: y, month: m, days: 15, interests: [], level: 2, add: [], remove: [] };
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
/* One day at an adventure level: level 1 takes the easy version, level 3 the hard one unless month (1–12) is one of its
   months off, or unless it is late (its night ends away from the stay) and notLate is true; otherwise the usual day. A
   version keeps the day's early start unless it sets its own, and the day's rain plan.
   Returns { pace, t, d, early, rain, variant }, variant 'easy', 'hard' or null. */
function variantOf(day, level, month, notLate) {
  var hard = level === 3 && day.hard && (day.hard.off || []).indexOf(month) < 0 && !(notLate && day.hard.late);
  var v = level === 1 && day.easy ? 'easy' : hard ? 'hard' : null;
  var src = v ? day[v] : day;
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: day.rain || null, variant: v };
}
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay
function plainDay(x) { return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: null }; }

/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant }], one per night, from the stay's first day.
   c: the place's content; stop: { n, start } from planRoute; done: nights spent there earlier in the trip (on a round trip
   the airport's city comes back at the end); level: 1–3; months: st.months, the month (0–11) of each trip day.
   A first stay takes the n plans with the lowest p, in their order o; a one-night stay the solo version of the p 1 plan
   when it has one. A second stay starts with c.again and goes on with the next plans by p. null when there are too few.
   next: the leg after the stay, { home, h } (the way home or not, its hours; see legAfter), or none: no restriction. On
   the stay's last day, when the way home or a leg of LONG_LEG_H hours or more follows, a late hard version (its next
   morning goes on the walk out, so the journey would start around noon) gives way to the usual day. */
function stopDays(c, stop, done, level, months, next) {
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
  picked.sort(function (a, b) { return a.o - b.o; }).forEach(function (d) {
    out.push(stop.n === 1 && d.solo ? plainDay(d.solo) : variantOf(d, level, months[stop.start - 1 + out.length] + 1, notLate && out.length === stop.n - 1));
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

/* The places that could be on the trip but are not, south to north, for the list with "Dodaj": every place up to the
   chosen level, without nights on the way. removed: Usuń took it off; added: Dodaj asked for it, but it did not fit. */
function offRoute(route, st, places) {
  var on = {};
  route.stops.forEach(function (s) { on[s.id] = true; });
  return Object.keys(places).filter(function (id) { return !places[id].node && !on[id] && places[id].level <= st.level; })
    .sort(function (a, b) { return places[a].axis - places[b].axis || (a < b ? -1 : 1); })
    .map(function (id) { return { id: id, removed: st.remove.indexOf(id) > -1, added: st.add.indexOf(id) > -1 }; });
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

/* ---------- travel texts ---------- */
/* The text of one road segment as [UI key, values]: from or to an airport; a road with a text of its own (roadKeys, by
   its two places in alphabetical order); Cát Bà with the ferry; Cát Tiên with the river crossing; the Mekong buses; else
   a limousine van or a car. The key is picked by the two places and the airport end, so every text reads right in both
   directions of travel (tests/content.test.js bans direction words); only the Mekong text names Phong Điền, so it has one
   form for going there and one for leaving. g: a segment of planRoute's legs; airports: AIRPORTS. */
function segKey(g, airports, roadKeys) {
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
  if (airports[g.to]) return ['r.taxi_to', { x: airports[g.to].name }];
  var pair = [g.from, g.to].sort().join('-');
  if (roadKeys[pair]) return [roadKeys[pair], {}];
  if (g.from === 'catba' || g.to === 'catba') return ['r.van_ferry', {}];
  if (g.from === 'cattien' || g.to === 'cattien') return ['r.car_cattien', {}];
  if (g.to === 'mekong') return ['r.bus_mekong', {}];
  if (g.from === 'mekong') return ['r.bus_mekong_from', {}];
  return ['r.van_car', {}];
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
   or follow white space, ( „ or –. A run like "i w domu" needs several passes (a match uses up the space in front of the next word), so repeat. */
function tieShort(text) {
  var before;
  do {
    before = text;
    text = text.replace(/(^|[\s(„–])([aiouwzAIOUWZ]) /g, '$1$2\u00a0');
  } while (text !== before);
  return text;
}
