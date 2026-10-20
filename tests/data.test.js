/* The real data, part by part. Every problem is listed by name. */
function dataCheck(label, body) {
  var fails = [];
  body(function need(c, what) { if (!c) fails.push(what); });
  fails.forEach(function (f) { print('  ' + label + ': ' + f); });
  ok(!fails.length, fails.length + ' problem(s) in ' + label + ', listed above');
  print(label + ' ok');
}

/* The places added in stage 3 keep their research in a note of their own, research/<id>-2026-10.md (each place without a
   section in research/sezony-2026-10.md): a season section like those of that note and the tables „Zestawienie: ceny”,
   „wycieczki”, „rezerwacje”, „drogi” and „loty”, with the columns of the notes of the topics. */
var SEASON_NOTE = readFile('research/sezony-2026-10.md');
var OWN_NOTES = Object.keys(PLACES).filter(function (id) { return !PLACES[id].node && SEASON_NOTE.indexOf('\n## ' + id + ': ') < 0; })
  .map(function (id) { return 'research/' + id + '-2026-10.md'; });
// a day added to another place's module in batch B keeps its research in a note of its own too, with the tables
// „Zestawienie: wycieczki” and „Zestawienie: rezerwacje” (Mỹ Sơn in Hội An, the Tà Năng–Phan Dũng trail in Đà Lạt)
var DAY_NOTES = ['research/myson-2026-10.md', 'research/tanang-2026-10.md'];

dataCheck('places', function (need) {
  Object.keys(PLACES).forEach(function (id) {
    var p = PLACES[id];
    need(typeof p.axis === 'number' && p.axis > 8 && p.axis < 24, id + ': axis between 8 and 24');
    need(Array.isArray(p.nights) && p.nights.length === 3 && p.nights.every(function (n) { return typeof n === 'number' && n % 1 === 0; }) && p.nights[0] >= 1 &&
      p.nights[0] <= p.nights[1] && p.nights[1] <= p.nights[2] && p.nights[2] <= 6, id + ': nights [min, ideal, max]: whole numbers with 1 ≤ min ≤ ideal ≤ max ≤ 6');
    need(LEVELS.indexOf(p.level) > -1, id + ': level 1, 2 or 3');
    need(p.fit && INTERESTS.every(function (k) { return [0, 1, 2, 3].indexOf(p.fit[k]) > -1; }), id + ': fit 0–3 for each of ' + INTERESTS.join(', '));
    Object.keys(p.fit || {}).forEach(function (k) { need(INTERESTS.indexOf(k) > -1, id + ': unknown interest ' + k); });
    need(!p.node || (PLACES[p.node] && !PLACES[p.node].node), id + ': node ' + p.node + ' is a place of its own');
  });
  Object.keys(HUBS).forEach(function (code) {
    need(/^[A-Z]{3}$/.test(code), 'airport code ' + code);
    need(PLACES[HUBS[code]] && !PLACES[HUBS[code]].node, code + ': its city ' + HUBS[code] + ' is a place');
  });
  // a place of stage 3 has the fit its own note gives: a row „fit” with every interest, or a row „fit.<interest>” for each
  OWN_NOTES.forEach(function (path) {
    var id = path.replace(/^research\/|-2026-10\.md$/g, ''), fit = {};
    readFile(path).split('\n').forEach(function (line) {
      var m = /^\| *fit(?:\.([a-z]+))? *\|([^|]*)\|/.exec(line);
      if (!m) return;
      if (m[1]) fit[m[1]] = +m[2].replace(/[`\s]/g, '');
      else m[2].replace(/(kultura|jedzenie|przyroda|gory|morze):? *(\d)/g, function (all, k, n) { fit[k] = +n; });
    });
    need(INTERESTS.every(function (k) { return fit[k] === PLACES[id].fit[k]; }),
      id + ': fit ' + JSON.stringify(PLACES[id].fit) + ' in places.js, ' + JSON.stringify(fit) + ' in ' + path);
  });
  // and the name its own note gives in the row „maps”, which the links „Trasa w Mapach Google” use (content/<id>.js); the
  // checkpoint of a plan checks the names in Google Maps (plan B2: Mù Cang Chải by its market in the town, as the name of
  // the commune leads to the commune's point, about 2 km east of the town)
  OWN_NOTES.forEach(function (path) {
    var id = path.replace(/^research\/|-2026-10\.md$/g, ''), m = /^\| maps \| [`']*([^`'|]+?)[`']* \|/m.exec(readFile(path));
    need(m && CONTENT[id].maps === m[1], id + ': maps ' + JSON.stringify(CONTENT[id].maps) + ' in content/' + id + '.js, ' +
      (m ? JSON.stringify(m[1]) : 'no row „maps”') + ' in ' + path);
  });
});

dataCheck('travel', function (need) {
  var G = travelGraph(ROADS, FLIGHTS), seen = {};
  function node(id) { return PLACES[id].node || id; }
  ROADS.forEach(function (r) {
    need(r.length === 3 && r[2] > 0 && r[2] <= MAX_LEG_H, 'road ' + r.join(' ') + ': hours between 0 and ' + MAX_LEG_H);
    [r[0], r[1]].forEach(function (e) {
      need((PLACES[e] && !PLACES[e].node) || /^[A-Z]{3}$/.test(e), 'road ' + r.join(' ') + ': ' + e + ' is no place or airport');
    });
    var k = 'road ' + [r[0], r[1]].sort().join('-');
    need(!seen[k], 'listed twice: ' + k);
    seen[k] = true;
  });
  FLIGHTS.forEach(function (f) {
    need(f.length === 3 && f[2] > 0 && f[2] <= 3, 'flight ' + f.join(' ') + ': between 0 and 3 h in the air');
    need(/^[A-Z]{3}$/.test(f[0]) && /^[A-Z]{3}$/.test(f[1]), 'flight ' + f.join(' ') + ': ends are airport codes');
    var k = 'flight ' + [f[0], f[1]].sort().join('-');
    need(!seen[k], 'listed twice: ' + k);
    seen[k] = true;
  });
  Object.keys(PLACES).forEach(function (id) { need(G.h[node(id)], id + ': no road or flight reaches it'); });
  // a road is no longer than the shortest way between its ends over the other roads, or the engine never takes it
  // (research/polaczenia-2026-10.md, „Uzupełnienie 13.10.2026”)
  ROADS.forEach(function (r, i) {
    var other = travelGraph(ROADS.filter(function (x, j) { return j !== i; }), []).road, d = other[r[0]] && other[r[0]][r[1]];
    need(!(d < r[2] - 1e-9), 'road ' + r.join(' ') + ': the other roads take ' + d + ' h');
  });
  // every airport code is a known airport (AIRPORTS in content.js), so a typo makes no airport of its own
  ROADS.concat(FLIGHTS).forEach(function (r) {
    [r[0], r[1]].forEach(function (e) { if (/^[A-Z]{3}$/.test(e)) need(AIRPORTS[e], (r.length && FLIGHTS.indexOf(r) > -1 ? 'flight ' : 'road ') + r.join(' ') + ': ' + e + ' is no airport of AIRPORTS'); });
  });
  Object.keys(HUBS).forEach(function (code) { need(AIRPORTS[code], 'HUBS: ' + code + ' is no airport of AIRPORTS'); });
  // every road and flight has its hours in a research table: research/polaczenia-2026-10.md or the note of a place of
  // stage 3 („Zestawienie: drogi”, „Zestawienie: loty”); a later row of the same two ends wins (the column „Jest” of an
  // „Uzupełnienie” table)
  var hours = {};
  ['research/polaczenia-2026-10.md'].concat(OWN_NOTES).forEach(function (path) {
    var col = 1;
    readFile(path).split('\n').forEach(function (line) {
      if (!/^\|/.test(line) || /^\|-/.test(line)) return;
      var c = line.replace(/^\||\|$/g, '').split('|').map(function (x) { return x.trim(); }), m = /^([A-Za-z]+) – ([A-Za-z]+)$/.exec(c[0]);
      if (/^(odcinek|trasa)$/i.test(c[0])) col = c.indexOf('Jest') > -1 ? c.indexOf('Jest') : 1;
      else if (m && /^\d+(,\d+)?$/.test(c[col] || '')) hours[[m[1], m[2]].sort().join('-')] = +c[col].replace(',', '.');
    });
  });
  ROADS.concat(FLIGHTS).forEach(function (r) {
    var k = [r[0], r[1]].sort().join('-');
    need(hours[k] === r[2], r.join(' ') + ': the research says ' + hours[k] + ' h');
  });
  Object.keys(HUBS).forEach(function (code) {
    need(G.road[code] && G.road[code][HUBS[code]] <= END_LEG_H, code + ': its city ' + HUBS[code] + ' within ' + END_LEG_H + ' h by road');
    Object.keys(PLACES).forEach(function (id) { need(G.h[code] && G.h[code][node(id)] < Infinity, id + ' cannot be reached from ' + code); });
  });
});

dataCheck('seasons', function (need) {
  Object.keys(PLACES).forEach(function (id) { need(/^[DSZX]{12}$/.test(SEASONS[id] || ''), id + ': season is 12 letters D, S, Z or X'); });
  Object.keys(SEASONS).forEach(function (id) { need(PLACES[id], 'season for an unknown place: ' + id); });
  need(SEASONS.hanoiStop === SEASONS.hanoi, 'a night in Hà Nội on the way has Hà Nội\'s season');
});

dataCheck('holidays', function (need) {
  var prev = '';
  HOLIDAYS.forEach(function (h, i) {
    var w = 'HOLIDAYS[' + i + '] ' + JSON.stringify(h);
    need(h.length === 4 && isoDay(h[0]) !== null && isoDay(h[1]) !== null && h[0] <= h[1], w + ': [first day, last day, kind, name] with real dates');
    need(['tet', 'holiday'].indexOf(h[2]) > -1, w + ': kind tet or holiday');
    need(typeof h[3] === 'string' && h[3].trim() !== '', w + ': a name');
    need(h[0] >= HOLIDAYS_FROM && h[1] <= HOLIDAYS_UNTIL, w + ': inside ' + HOLIDAYS_FROM + '…' + HOLIDAYS_UNTIL);
    need(h[0] >= prev, w + ': sorted by date');
    prev = h[0];
  });
  function has(day, kind) { return HOLIDAYS.some(function (h) { return h[0] <= day && day <= h[1] && (!kind || h[2] === kind); }); }
  for (var y = 2027; y <= 2031; y++) {
    need(HOLIDAYS.some(function (h) { return h[2] === 'tet' && h[0].slice(0, 4) === String(y); }), 'Tết ' + y);
    need(has(y + '-01-01'), 'New Year ' + y);
  }
  for (var z = 2027; z <= 2030; z++) {
    [z + '-04-30', z + '-05-01', z + '-09-02'].forEach(function (day) { need(has(day, 'holiday'), 'holiday on ' + day); });
  }
  // a trip that starts on the last day the page offers still ends inside the list
  need(isoDay(HOLIDAYS_UNTIL) - isoDay(PLAN_LAST_YEAR + '-12-31') >= MAX_DAYS - 1, 'HOLIDAYS_UNTIL covers a trip of ' + MAX_DAYS + ' days from 31.12.' + PLAN_LAST_YEAR);
  need(TET_MARGIN_DAYS === 7, 'the week before and after Tết counts');
  // the facts: the rows are those of the table in research/swieta-2026-10.md, in its order, and a row the government
  // announced („ogłoszone” in the table) is marked // announced in holidays.js, an estimate not
  var table = researchRows('research/swieta-2026-10.md', '## Tabela wierszy'), src = readFile('site2/src/holidays.js').split('\n');
  need(JSON.stringify(HOLIDAYS) === JSON.stringify(table.map(function (r) { return r.slice(0, 4); })), 'HOLIDAYS: the rows of the table in research/swieta-2026-10.md');
  table.forEach(function (r) {
    var line = src.filter(function (l) { return l.indexOf("['" + r[0] + "', '" + r[1] + "'") > -1; })[0] || '';
    need(/\/\/ announced/.test(line) === /^ogłoszone/.test(r[5]), r[0] + ': marked announced in holidays.js exactly when the research says „ogłoszone”');
  });
});

dataCheck('photos', function (need) {
  Object.keys(PHOTO_META).forEach(function (ph) {
    var m = PHOTO_META[ph];
    need(/^[a-z]+_\d+$/.test(ph), ph + ': id is place_number');
    need(typeof m.cap === 'string' && m.cap.trim() !== '' && typeof m.artist === 'string' && m.artist.trim() !== '', ph + ': caption and author');
    need(/^(CC0|Public domain|CC BY(-SA)? \d\.\d( [a-z]{2})?)$/.test(m.license), ph + ': licence ' + m.license + ' is not CC0, CC BY, CC BY-SA or public domain');
    need(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(m.page), ph + ': its page on Wikimedia Commons');
  });
  need(PHOTO_META[HERO_PHOTO], 'the hero photo ' + HERO_PHOTO + ' has its credits');
  // the photo at the end of the page (finishing touches, finding 9) is one of a place's photos, so the list of the photos
  // names its author
  need(PHOTO_META[FINALE_PHOTO] && Object.keys(CONTENT).some(function (id) { return CONTENT[id].photos.indexOf(FINALE_PHOTO) > -1; }),
    'the photo at the end of the page ' + FINALE_PHOTO + ' has its credits and is in a gallery');
  // each id once (a second entry with the same id would silently replace the first) and a real author, never a stand-in
  var entries = readFile('site2/src/photos.js').match(/^  [a-z]+_\d+: \{/gm) || [];
  need(entries.length === Object.keys(PHOTO_META).length, 'photos.js: ' + entries.length + ' entries for ' + Object.keys(PHOTO_META).length + ' ids, so an id is there twice');
  Object.keys(PHOTO_META).forEach(function (ph) { need(!/nieznany|unknown/i.test(PHOTO_META[ph].artist), ph + ': a real author, not „autor nieznany”'); });
});

/* The climate (climate.js) against its research note: the numbers and the season letters are those of the tables in
   research/sezony-2026-10.md (a place of stage 3: its own note), every fair or poor month has a reason, and a reason that is a threshold of the note
   (section „Progi”) holds for the month's numbers. EXCEPT: the note's exception, Cát Tiên in November, whose park counts
   its rainy season to November although the station in the city gets less rain. */
dataCheck('climate', function (need) {
  var MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  var EXCEPT = { cattien: { 11: ['deszcz'] } }, notes = {};
  function n(s) { return +s.replace(',', '.'); }
  [SEASON_NOTE].concat(OWN_NOTES.map(function (p) { return readFile(p); })).join('\n').split('\n## ').forEach(function (sec) {
    var m = /^([a-z]+): /.exec(sec), sun = /Słońce, h \(I–XII[^)]*\): ([\d, ]+)/.exec(sec), same = /Słońce jak w `([a-z]+)`/.exec(sec);
    if (!m || !SEASONS[m[1]]) return;
    var r = notes[m[1]] = { t: [], rain: [], letters: '', sun: sun ? sun[1].split(',').map(Number) : null, sunOf: same ? same[1] : null };
    sec.split('\n').forEach(function (line) {
      var c = line.split('|').map(function (x) { return x.trim(); }), t, w;
      if (c.length < 7 || MONTHS.indexOf(c[1]) < 0) return;
      t = /(-?[\d,]+)–(-?[\d,]+)/.exec(c[4]); w = /([\d,]+)\s*mm,\s*([\d,]+)\s*d/.exec(c[5]);
      r.letters += c[2];
      r.t.push(t ? [n(t[1]), n(t[2])] : null);
      r.rain.push(w ? [n(w[1]), n(w[2])] : null);
    });
  });
  need(CLIMATE.hanoiStop === CLIMATE.hanoi, 'a night in Hà Nội on the way has Hà Nội\'s climate');
  Object.keys(PLACES).forEach(function (id) {
    var c = CLIMATE[id], r = notes[PLACES[id].node || id];
    need(c && r, id + ': climate and its table in the research note');
    if (!c || !r) return;
    var sun = r.sun || (r.sunOf && notes[r.sunOf].sun);
    need(r.letters === SEASONS[id], id + ': the letters of the note, ' + r.letters + ', are the season in seasons.js');
    need(JSON.stringify(c.t) === JSON.stringify(r.t), id + ': t as in the note');
    need(JSON.stringify(c.rain) === JSON.stringify(r.rain), id + ': rain as in the note');
    Object.keys(c.why).forEach(function (k) { need(+k >= 1 && +k <= 12, id + ': why for month ' + k); });
    for (var mo = 1; mo <= 12; mo++) {
      var why = c.why[mo] || [], letter = SEASONS[id].charAt(mo - 1), t = c.t[mo - 1], w = c.rain[mo - 1], h = sun ? sun[mo - 1] : null, w2 = id + ' month ' + mo;
      need(letter === 'D' ? why.length === 0 : why.length > 0, w2 + ': ' + (letter === 'D' ? 'a good month has no reason' : 'season ' + letter + ' needs a reason'));
      why.forEach(function (code) {
        need(WEATHER_WHY.indexOf(code) > -1, w2 + ': unknown reason ' + code);
        if ((EXCEPT[id] && EXCEPT[id][mo] || []).indexOf(code) > -1) return;
        if (code === 'upal') need(t[1] >= 34, w2 + ': heat needs a mean high of 34 °C or more');
        if (code === 'deszcz') need(w[0] >= 160 && w[1] >= 13, w2 + ': rainy season needs 160 mm and 13 days with rain');
        if (code === 'ulewy') need(w[0] >= 300 && w[1] >= 16 && h !== null && h <= 150, w2 + ': downpours need 300 mm, 16 days with rain and at most 150 h of sun');
        if (code === 'szaro') need(h !== null && h <= 80, w2 + ': grey needs at most 80 h of sun');
        if (code === 'chlod') need(t[0] < 15 && h !== null && h <= 150, w2 + ': cold nights need a mean low under 15 °C and at most 150 h of sun');
      });
    }
  });
});

/* The prices (costs.js) and what to book ahead (before.js) against their research notes. Every number of COSTS stands in
   the tables „Zestawienie” and „Zestawienie wycieczek” of research/ceny-2026-10.md or „Zestawienie” of
   research/motocykl-2026-10.md (there a car is the group's part, a person or a motorbike the person's); every entry of
   BOOK in „Zestawienie” of research/rezerwacje-2026-10.md; the links of ENTRY among the sources of research/wjazd-2026-10.md. A place of
   stage 3: the tables „Zestawienie: ceny”, „Zestawienie: wycieczki” and „Zestawienie: rezerwacje” of its own note. An item
   costs no less at to than at from, for two people (pp + group / 2) and for one (pp + group). */
function researchRows(path, head) {
  var s = readFile(path), i = s.indexOf(head), out = [];
  if (i < 0) return out;
  s.slice(i).split('\n').slice(1).some(function (line) {
    if (/^#/.test(line)) return true;
    if (/^\|/.test(line) && !/^\|-/.test(line)) out.push(line.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }));
    return false;
  });
  return out.slice(1);   // without the row of the column names
}
dataCheck('costs', function (need) {
  function n(c) { return c === '' ? 0 : +c.replace(',', '.'); }
  var base = {}, items = {};
  researchRows('research/ceny-2026-10.md', '## Zestawienie\n').forEach(function (r) { base[r[0]] = [n(r[2]), n(r[3])]; });
  researchRows('research/ceny-2026-10.md', '### Zestawienie wycieczek').forEach(function (r) {
    items[r[0].replace(/`/g, '')] = { pp: [n(r[2]), n(r[3])], group: [n(r[4]), n(r[5])] };
  });
  researchRows('research/motocykl-2026-10.md', '## Zestawienie\n').forEach(function (r) {
    var v = [n(r[2]), n(r[3])], car = /^auto/.test(r[1]);
    items[r[0]] = { pp: car ? [0, 0] : v, group: car ? v : [0, 0] };
  });
  OWN_NOTES.concat(DAY_NOTES).forEach(function (p) {
    researchRows(p, '### Zestawienie: ceny').forEach(function (r) { base[r[0]] = [n(r[2]), n(r[3])]; });
    researchRows(p, '### Zestawienie: wycieczki').forEach(function (r) {
      items[r[0].replace(/`/g, '')] = { pp: [n(r[2]), n(r[3])], group: [n(r[4]), n(r[5])] };
    });
  });
  function same(a, b, what) { need(JSON.stringify(a) === JSON.stringify(b), what + ': ' + JSON.stringify(a) + ' in costs.js, ' + JSON.stringify(b) + ' in the research'); }
  Object.keys(PLACES).forEach(function (id) { if (!PLACES[id].node) same(COSTS.night[id], base['night.' + id], 'night.' + id); });
  Object.keys(COSTS.night).forEach(function (id) { need(PLACES[id] && !PLACES[id].node, 'a night price for no place: ' + id); });
  [['day', 'day'], ['daySolo', 'day.solo'], ['shared', 'road.shared'], ['car', 'road.private']].forEach(function (k) { same(COSTS[k[0]], base[k[1]], k[1]); });
  same(COSTS.flight.short, base['flight.short'], 'flight.short');
  same(COSTS.flight.long, base['flight.long'], 'flight.long');
  Object.keys(COSTS.items).forEach(function (k) {
    var it = COSTS.items[k], r = items[k];
    need(r, k + ': no row in the research');
    if (r) { same(it.pp, r.pp, k + ' pp'); same(it.group, r.group, k + ' group'); }
    need(it.pp[0] + it.group[0] / 2 <= it.pp[1] + it.group[1] / 2 && it.pp[0] + it.group[0] <= it.pp[1] + it.group[1], k + ': from costs more than to');
    need(it.night === undefined || it.night === true, k + ': night is true or left out');
    need(it.book === undefined || BOOK[it.book], k + ': book ' + it.book + ' is no key of BOOK');
  });
  // the rate: the row EUR-VND of research/ceny-2026-10.md („Kurs całego researchu i strony: 1 EUR = 29 055 VND …”), the one
  // the research converted the prices of its sources with, so the page's dong come back to them (decision of 15.10.2026)
  var rate = /^\| EUR-VND \| Kurs całego researchu i strony: 1 EUR = (\d+) (\d{3}) VND/m.exec(readFile('research/ceny-2026-10.md'));
  need(rate && EUR_VND === +(rate[1] + rate[2]), 'EUR_VND as in the row EUR-VND of research/ceny-2026-10.md');
  need(isoDay(COSTS_CHECKED) !== null, 'COSTS_CHECKED: a real day');
});
/* The sentences „what it is and where” (fix 1 of the first round of fixes) as the table „Zestawienie” of
   research/opisy-miejsc-2026-10.md gives them, in both languages, whose facts and sources stand there. */
dataCheck('place sentences', function (need) {
  var rows = {};
  researchRows('research/opisy-miejsc-2026-10.md', '## Zestawienie\n').forEach(function (r) { rows[r[0]] = r; });
  Object.keys(PLACES).forEach(function (id) {
    if (PLACES[id].node) return;
    var r = rows[id];
    need(r, id + ': no row in research/opisy-miejsc-2026-10.md');
    if (r) need(CONTENT[id].what === r[1] && CONTENT_EN[id].what === r[2], id + ': the sentence as in the research (' + JSON.stringify(CONTENT[id].what) + ')');
  });
  Object.keys(rows).forEach(function (id) { need(PLACES[id] && !PLACES[id].node, id + ': a row of the research for no place'); });
});
dataCheck('booking', function (need) {
  var rows = {};
  researchRows('research/rezerwacje-2026-10.md', '## Zestawienie\n').forEach(function (r) { rows[r[0]] = r; });
  OWN_NOTES.concat(DAY_NOTES).forEach(function (p) { researchRows(p, '### Zestawienie: rezerwacje').forEach(function (r) { rows[r[0]] = r; }); });
  Object.keys(BOOK).forEach(function (k) {
    var b = BOOK[k], r = rows[k];
    need(r, k + ': no row in the research');
    if (!r) return;
    need(b.ahead === +r[4], k + ': ahead ' + b.ahead + ' days, the research says ' + r[4]);
    var links = /^—/.test(r[5]) ? [] : r[5].split('; ').map(function (p) { var i = p.lastIndexOf(': http'); return { name: p.slice(0, i), url: p.slice(i + 2) }; });
    need(JSON.stringify(b.links) === JSON.stringify(links), k + ': the links as in the research');
    b.links.forEach(function (l) { need(/^https:\/\//.test(l.url) && !/[?&](utm_|ref=|aff|partner)/i.test(l.url), k + ': ' + l.url + ' is https and has no tracking'); });
  });
  Object.keys(rows).forEach(function (k) { need(BOOK[k], k + ': in the research, not in BOOK'); });
  var wjazd = readFile('research/wjazd-2026-10.md');
  ENTRY.links.forEach(function (l) { need(/^https:\/\//.test(l.url) && wjazd.indexOf(l.url) > -1, 'ENTRY: ' + l.url + ' is a source of research/wjazd-2026-10.md'); });
  HOMESTAYS.forEach(function (id) { need(PLACES[id] && /gospodarzy|Khuổi Ky/.test(JSON.stringify(CONTENT[id].days)), 'HOMESTAYS: ' + id + ' is a place whose plans sleep with hosts'); });
});
