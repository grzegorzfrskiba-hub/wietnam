/* The texts of the places (content.js, content/<id>.js) and the photos they show (photos.js): every place the engine
   plans with has its texts and enough day plans for every stay the engine can make, the versions have the right shape,
   every photo is shown once, and the Polish typography holds. Every problem is listed by name. */
function contentCheck(label, body) {
  var fails = [];
  try {
    body(function need(c, what) { if (!c) fails.push(what); });
  } catch (e) {
    fails.push('the check stopped: ' + e);
  }
  fails.forEach(function (f) { print('  ' + label + ': ' + f); });
  ok(!fails.length, fails.length + ' problem(s) in ' + label + ', listed above');
  print(label + ' ok');
}
function isText(v) { return typeof v === 'string' && v.trim() !== '' && v === v.trim(); }
// every text in v, as [path, text] pairs added to out
function strings(v, path, out) {
  if (typeof v === 'string') out.push([path, v]);
  else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { strings(v[k], path + '.' + k, out); });
  return out;
}
var CITIES = {};   // the airports' cities: on a round trip they come twice
Object.keys(HUBS).forEach(function (code) { CITIES[HUBS[code]] = true; });

contentCheck('content', function (need) {
  var PLACE_KEYS = ['name', 'short', 'sub', 'region', 'maps', 'pt', 'color', 'poi', 'photos', 'days', 'again', 'gem', 'skip', 'instead', 'events'];
  var PALETTE = (readFile('site2/src/template.html').match(/--pal-\d+:/g) || []).length / 3, colours = {};   // light, dark, dark again
  function monthDay(v) { return Array.isArray(v) && v.length === 2 && v[0] % 1 === 0 && v[0] >= 1 && v[0] <= 12 && v[1] % 1 === 0 && v[1] >= 1 && v[1] <= 31; }
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'cost', 'pack', 'easy', 'hard', 'solo', 'self'];
  // the paid parts of a plan (keys of COSTS.items, or a list of two or more to pick from) and what it adds to the packing
  function costAndPack(w, d) {
    if (d.cost != null) {
      need(Array.isArray(d.cost), w + ': cost is a list');
      (Array.isArray(d.cost) ? d.cost : []).forEach(function (e) {
        var keys = Array.isArray(e) ? e : [e];
        need(!Array.isArray(e) || e.length >= 2, w + ': a choice in cost names two things or more');
        keys.forEach(function (k) { need(COSTS.items[k], w + ': cost ' + k + ' is no item of COSTS'); });
      });
    }
    if (d.pack != null) need(Array.isArray(d.pack) && d.pack.every(function (k) { return PACK_CODES.indexOf(k) > -1; }), w + ': pack lists codes of PACK_CODES');
  }
  // a plan or a version of one: pace, title, text, maybe an early start
  function plan(w, d, keys) {
    Object.keys(d).forEach(function (k) { need(keys.concat(['cost', 'pack']).indexOf(k) > -1, w + ': unknown field ' + k); });
    need(PACES.indexOf(d.pace) > -1, w + ': pace one of ' + PACES.join(', '));
    need(isText(d.t) && isText(d.d), w + ': title t and text d');
    if (d.early != null) need(typeof d.early === 'boolean', w + ': early is true or false');
    costAndPack(w, d);
  }
  Object.keys(PLACES).forEach(function (id) {
    var c = CONTENT[id], p = PLACES[id];
    need(c, id + ': no texts (site2/src/content/' + id + '.js)');
    if (!c) return;
    Object.keys(c).forEach(function (k) { need(PLACE_KEYS.indexOf(k) > -1, id + ': unknown field ' + k); });
    ['name', 'short', 'sub', 'maps'].forEach(function (k) { need(isText(c[k]), id + ': ' + k); });
    need(REGIONS.indexOf(c.region) > -1, id + ': region one of ' + REGIONS.join(', '));
    need(Array.isArray(c.pt) && c.pt.length === 2 && c.pt[0] > 8 && c.pt[0] < 24 && c.pt[1] > 102 && c.pt[1] < 110, id + ': pt is [lat, lon] in Vietnam');
    if (p.node) need(c.color == null, id + ': a night on the way takes the colour of ' + p.node + ', so it has none');
    else {
      need(c.color % 1 === 0 && c.color >= 1 && c.color <= PALETTE, id + ': color, a number of the palette, 1–' + PALETTE);
      need(!colours[c.color], id + ': color ' + c.color + ' is ' + colours[c.color] + '\'s too');
      colours[c.color] = id;
    }
    if (c.poi != null) need(c.poi && isText(c.poi.name) && Array.isArray(c.poi.pt) && c.poi.pt.length === 2, id + ': poi is { name, pt }');
    var range = p.node ? [0, 0] : [3, 5];
    need(Array.isArray(c.photos) && c.photos.length >= range[0] && c.photos.length <= range[1], id + ': ' + range.join('–') + ' photos');
    (c.photos || []).forEach(function (ph) { need(PHOTO_META[ph], id + ': photo ' + ph + ' is not in photos.js'); });
    var days = Array.isArray(c.days) ? c.days : [];
    need(days.length >= p.nights[2], id + ': ' + p.nights[2] + ' day plans or more, one for each night of the longest stay');
    days.forEach(function (d, i) {
      var w = id + ' day ' + (i + 1);
      plan(w, d, DAY_KEYS);
      if (d.rain != null) need(isText(d.rain), w + ': rain is a text');
      if (d.easy) plan(w + ' easy', d.easy, ['pace', 't', 'd', 'early']);
      if (d.hard) {
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off', 'late', 'next', 'rain']);
        if (d.hard.rain != null) need(isText(d.hard.rain), w + ' hard: rain is a text');
        need(/przewodnik|operator/i.test(d.hard.d) && !/bez (przewodnik|operator)/i.test(d.hard.d), w + ' hard: say who leads (przewodnik or operator, not „bez przewodnika”)');
        if (d.hard.late != null) need(typeof d.hard.late === 'boolean', w + ' hard: late is true or false');
        if (d.hard.next != null) {
          plan(w + ' hard next', d.hard.next, ['pace', 't', 'd', 'early']);
          need(d.hard.late === true, w + ' hard: a version over two days spends its night away (late: true)');
          // the day's rain plan is for another day: an expedition says what its operator does in heavy rain
          need(isText(d.hard.rain), w + ' hard: a version over two days has its own rain plan (hard.rain)');
        }
        if (d.hard.off != null) {
          need(Array.isArray(d.hard.off) && d.hard.off.length < 12 && d.hard.off.every(function (m) { return typeof m === 'number' && m % 1 === 0 && m >= 1 && m <= 12; }),
            w + ' hard: off lists months 1–12, not all of them');
        }
      }
      if (d.solo) {
        plan(w + ' solo', d.solo, ['pace', 't', 'd', 'early', 'covers']);
        need(d.p === 1, w + ': solo only on the p 1 day');
        // covers (the plans by p it stands for) matters to a second stay only, so to a place with again
        if (d.solo.covers != null) need(d.solo.covers % 1 === 0 && d.solo.covers >= 2 && d.solo.covers < c.days.length && !!c.again,
          w + ': solo covers 2 or more of the plans, fewer than all, in a place with again');
      }
      if (d.self) {
        plan(w + ' self', d.self, ['pace', 't', 'd', 'early']);
        need(Object.keys(SWAPS).some(function (k) { return SWAPS[k].place === id; }), w + ': a self version only in a place of SWAPS');
      }
      need(d.pace !== 'hike' || (d.easy && d.easy.pace !== 'hike'), w + ': a hiking day needs an easy version without a hike, for level 1');
    });
    var want = days.map(function (d, i) { return i + 1; });
    function sorted(k) { return days.map(function (d) { return d[k]; }).sort(function (a, b) { return a - b; }); }
    need(JSON.stringify(sorted('p')) === JSON.stringify(want), id + ': p is 1…' + days.length + ', each once');
    need(JSON.stringify(sorted('o')) === JSON.stringify(want), id + ': o is 1…' + days.length + ', each once');
    var first = days.filter(function (d) { return d.p === 1; })[0];
    need(first && (first.pace === 'travel' || first.pace === 'rest'), id + ': the p 1 day is an arrival day (pace travel or rest)');
    if (p.nights[0] === 1 && p.nights[2] > 1) need(first && first.solo, id + ': a stay of one night is possible, so the p 1 day needs a solo plan');
    need(!!c.again === !!CITIES[id], id + (CITIES[id] ? ': an airport\'s city needs again, the arrival day of its second stay' : ': again belongs to an airport\'s city only'));
    if (c.again) {
      plan(id + ' again', c.again, ['pace', 't', 'd', 'early']);
      need(c.again.pace === 'travel' || c.again.pace === 'rest', id + ' again: pace travel or rest');
    }
    ['gem', 'skip', 'instead'].forEach(function (k) { if (c[k] != null) need(isText(c[k]), id + ': ' + k); });
    need((c.skip == null) === (c.instead == null), id + ': skip and instead go together');
    if (c.events != null) need(Array.isArray(c.events) && c.events.length > 0, id + ': events is a list with entries');
    (Array.isArray(c.events) ? c.events : []).forEach(function (e, i) {
      var w = id + ' event ' + (i + 1);
      Object.keys(e).forEach(function (k) { need(['from', 'to', 't', 'warn', 'pack'].indexOf(k) > -1, w + ': unknown field ' + k); });
      costAndPack(w, { pack: e.pack });
      need(monthDay(e.from) && monthDay(e.to), w + ': from and to as [month, day]');
      need(isText(e.t), w + ': text t');
      if (e.warn != null) need(e.warn === true, w + ': warn is true or left out');
    });
  });
  Object.keys(CONTENT).forEach(function (id) { need(PLACES[id], 'texts for an unknown place: ' + id); });
  // every airport of the travel data has its name, place for Google Maps and point on the map
  travelGraph(ROADS, FLIGHTS).nodes.forEach(function (n) {
    if (/^[A-Z]{3}$/.test(n)) need(AIRPORTS[n] && isText(AIRPORTS[n].name) && isText(AIRPORTS[n].maps) && AIRPORTS[n].pt, 'AIRPORTS.' + n);
  });
  Object.keys(ROAD_KEYS).forEach(function (k) {
    need(k === k.split('-').sort().join('-') && k.split('-').every(function (id) { return PLACES[id]; }), 'ROAD_KEYS ' + k + ': two places in alphabetical order');
  });
  // the long roads of an airport: an airport's code and a place joined by a road of ROADS, each text a UI key; the ferries
  Object.keys(AIR_KEYS).forEach(function (k) {
    var p = k.split('-');
    need(AIRPORTS[p[0]] && PLACES[p[1]] && ROADS.some(function (r) { return (r[0] === p[0] && r[1] === p[1]) || (r[0] === p[1] && r[1] === p[0]); }) &&
      UI.pl[AIR_KEYS[k].text] && typeof AIR_KEYS[k].book === 'boolean', 'AIR_KEYS ' + k + ': an airport, a place, a road between them, a text and book');
  });
  Object.keys(FERRY).forEach(function (id) {
    var f = FERRY[id], t = /^\d{1,2}:\d{2}$/;
    need(PLACES[id] && t.test(f.last) && t.test(f.first), 'FERRY.' + id + ': a place and the times of its crossings');
    Object.keys(f.land).concat(Object.keys(f.at)).forEach(function (code) {
      need(AIRPORTS[code] && ROADS.some(function (r) { return (r[0] === code && r[1] === id) || (r[0] === id && r[1] === code); }), 'FERRY.' + id + ': ' + code + ' is an airport with a road to it');
    });
    Object.keys(f.land).forEach(function (code) { need(t.test(f.land[code]) && t.test(f.at[code] || ''), 'FERRY.' + id + ': the landing and the time at ' + code); });
  });
  // the swaps: a place with self versions of its days, or roads of ROAD_KEYS, each with a self text and a cost for each way;
  // a road belongs to one swap only
  var swapOfRoad = {};
  Object.keys(SWAPS).forEach(function (k) {
    var w = SWAPS[k];
    if (w.place) need(CONTENT[w.place] && CONTENT[w.place].days.some(function (d) { return d.self; }), 'SWAPS.' + k + ': ' + w.place + ' has days with a self version');
    Object.keys(w.roads || {}).forEach(function (pair) {
      var r = w.roads[pair];
      need(ROAD_KEYS[pair] && UI.pl[r.text] && COSTS.items[r.cost.driver] && COSTS.items[r.cost.self], 'SWAPS.' + k + ': ' + pair + ' is a road of ROAD_KEYS with its self text and the cost of each way');
      need(!swapOfRoad[pair], 'SWAPS.' + k + ': ' + pair + ' is a road of ' + swapOfRoad[pair] + ' too');
      swapOfRoad[pair] = k;
    });
    need(!!w.place !== !!(w.roads && Object.keys(w.roads).length), 'SWAPS.' + k + ': a place or roads');
    need(w.risk === undefined || w.risk === true, 'SWAPS.' + k + ': risk is true or left out');
  });
  // every item of COSTS is the cost of some plan or of a swap's road
  var paid = {};
  Object.keys(CONTENT).forEach(function (id) {
    CONTENT[id].days.forEach(function (d) {
      [d, d.easy, d.hard, d.hard && d.hard.next, d.solo, d.self].forEach(function (v) { ((v && v.cost) || []).forEach(function (e) { [].concat(e).forEach(function (x) { paid[x] = true; }); }); });
    });
  });
  Object.keys(SWAPS).forEach(function (k) {
    Object.keys(SWAPS[k].roads || {}).forEach(function (pair) { var c = SWAPS[k].roads[pair].cost; paid[c.driver] = true; paid[c.self] = true; });
  });
  Object.keys(COSTS.items).forEach(function (k) { need(paid[k], 'COSTS.items ' + k + ' is no cost of any plan or swap'); });
});

contentCheck('photos in use', function (need) {
  var used = {};
  used[HERO_PHOTO] = 'the top of the page';
  Object.keys(CONTENT).forEach(function (id) {
    (CONTENT[id].photos || []).forEach(function (ph) { need(!used[ph], ph + ' shown twice: ' + used[ph] + ' and ' + id); used[ph] = id; });
  });
  Object.keys(PHOTO_META).forEach(function (ph) { need(used[ph], ph + ' is in photos.js, but no place shows it'); });
});

contentCheck('typography', function (need) {
  var all = strings(CONTENT, 'CONTENT', []);
  strings(UI.pl, 'UI.pl', all);
  Object.keys(PHOTO_META).forEach(function (ph) { all.push(['PHOTO_META.' + ph + '.cap', PHOTO_META[ph].cap]); });
  HOLIDAYS.forEach(function (h, i) { all.push(['HOLIDAYS[' + i + ']', h[3]]); });
  all.forEach(function (x) {
    need(!/"/.test(x[1]), x[0] + ': straight quotes, use „…”');
    need(!/\d\s*(am|pm)\b/i.test(x[1]), x[0] + ': am/pm, use 24-hour time');
    need(!/\d°/.test(x[1]), x[0] + ': no space before °C');
    need(!/\d-\d/.test(x[1]), x[0] + ': a hyphen in a range, use an en dash');
    // two numbers side by side read as one („na Tết i 30.04 3–4 tygodnie”, the final review of plan B2); a number's thousands
    // („17 000”) are no second number, and a colon („2025: 22–24.04”) parts them
    need(!/\d(?:[\d.:]*\d)?\s(?!\d{3}(?!\d))[\d½]/.test(x[1]), x[0] + ': two numbers side by side: put a word between them');
  });
});

/* The style of plan 1B: to one reader (ty), no gendered forms, nothing tied to December. list: [path, text] pairs. */
// words ending in -cie that are no plural address (nouns, adverbs); add one only when it really is not a verb form
var NOT_PLURAL = ['aucie', 'nakrycie', 'mieście', 'moście', 'liście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
  'życie', 'zdjęcie', 'zamknięcie', 'skrócie', 'locie', 'całkowicie', 'obficie', 'znakomicie', 'należycie', 'dystrykcie', 'pensjonacie',
  'porcie', 'świecie', 'remoncie', 'namiocie', 'punkcie'];
function styleOk(need, list) {
  list.forEach(function (x) {
    var t = x[1];
    need(!/(^|[^\p{L}])(wy|was|wam|wami|wasz\p{L}*)(?=[^\p{L}]|$)/iu.test(t), x[0] + ': plural address (wy, was, wam, wasz…): write to one reader');
    (t.match(/\p{L}+cie(?=[^\p{L}]|$)/giu) || []).forEach(function (w) {
      need(NOT_PLURAL.indexOf(w.toLowerCase()) > -1, x[0] + ': „' + w + '” looks like a plural form: write to one reader (a noun goes on NOT_PLURAL)');
    });
    need(!/\p{L}+(łeś|łaś|łbyś|łabyś)(?=[^\p{L}]|$)/iu.test(t), x[0] + ': a gendered form (-łeś, -łaś)');
    // „Sam do lasu nie wejdziesz” speaks to a man (final review of plan B1); „ten sam”, „na sam wierzchołek” stay inside a sentence
    need(!/(^|[.!?:;]\s+)Sama?\s/u.test(t), x[0] + ': a gendered form (Sam, Sama at the start of a sentence): write „na własną rękę”, „bez przewodnika”');
    need(!/w grudniu|grudniow|grudzień to|wigili|bożego narodzenia|boże narodzenie/i.test(t), x[0] + ': tied to December: texts are written for any month');
    need(!/z powrotem w\s/i.test(t), x[0] + ': „z powrotem w…” assumes where the trip comes from; the place may open or close the trip');
  });
}
contentCheck('style', function (need) {
  styleOk(need, strings(UI.pl, 'UI.pl', []));
  Object.keys(CONTENT).forEach(function (id) { styleOk(need, strings(CONTENT[id], 'CONTENT.' + id, [])); });
  need(Object.keys(CONTENT).some(function (id) { return CONTENT[id].days.some(function (d) { return d.hard; }); }),
    'at least one hard day: level 3 must change something (research/trudne-dni-2026-10.md)');
});

/* The length of a day's text (decision of 15.10.2026): what is special in the day and its limits (hours, a guide, the
   season, the weather, an early start) in about 60 words, at most DAY_WORDS, without hints how (streets, pick-up times,
   ways to get in touch, apps), so that the texts do not grow back. A word: letters or digits between spaces. The rain plans
   and the other texts of a place are left out. */
var DAY_WORDS = 70;
function wordCount(t) { return (t.match(/\S+/g) || []).filter(function (w) { return /[\p{L}\p{N}]/u.test(w); }).length; }
contentCheck('day texts', function (need) {
  Object.keys(CONTENT).forEach(function (id) {
    var c = CONTENT[id];
    c.days.forEach(function (d) {
      [['', d], [' easy', d.easy], [' hard', d.hard], [' hard next', d.hard && d.hard.next], [' solo', d.solo], [' self', d.self]].forEach(function (v) {
        if (v[1]) need(wordCount(v[1].d) <= DAY_WORDS, id + ' day ' + d.p + v[0] + ': ' + wordCount(v[1].d) + ' words, at most ' + DAY_WORDS + ' (about 60)');
      });
    });
    if (c.again) need(wordCount(c.again.d) <= DAY_WORDS, id + ' again: ' + wordCount(c.again.d) + ' words, at most ' + DAY_WORDS + ' (about 60)');
  });
});

/* For travellers from anywhere (decision of 15.10.2026): the page's texts name no money but dong (no złoty, euro or
   dollar, no NBP rate) and no advice for the citizens of one country (Polish offices and services, Poland as a yardstick).
   The texts: the interface, the places, the captions, the holidays and the names of the links. */
contentCheck('for every passport', function (need) {
  var all = strings(CONTENT, 'CONTENT', []);
  strings(UI.pl, 'UI.pl', all);
  Object.keys(PHOTO_META).forEach(function (ph) { all.push(['PHOTO_META.' + ph + '.cap', PHOTO_META[ph].cap]); });
  HOLIDAYS.forEach(function (h, i) { all.push(['HOLIDAYS[' + i + ']', h[3]]); });
  Object.keys(BOOK).forEach(function (k) { BOOK[k].links.forEach(function (l, i) { all.push(['BOOK.' + k + '.links[' + i + ']', l.name]); }); });
  ENTRY.links.forEach(function (l, i) { all.push(['ENTRY.links[' + i + ']', l.name]); });
  all.forEach(function (x) {
    // also the words for them (the final review of plan B2): euro, dolar, złotówki
    need(!/(^|[^\p{L}])(zł|PLN|EUR|USD)(?!\p{L})|[€$]|NBP|(^|[^\p{L}])(euro(?!p)|dolar|złotówk)/iu.test(x[1]), x[0] + ': money in złoty, euro or dollars, or the NBP rate: the page says dong');
    need(!/[Pp]olsk|[Pp]olak|Polsce|Polski|Odyseusz|starost|EKUZ|(^|[^\p{L}])(GIS|MSZ)(?!\p{L})|[Aa]mbasad\p{L}* RP/u.test(x[1]),
      x[0] + ': advice for the citizens of one country (Polish offices, Poland as a yardstick)');
  });
});

/* ---------- two languages (stage 5, decisions of 15.10.2026) ---------- */
// The fields that hold a text in a place's content (content.js): an overlay in another language has these, and only these.
var TEXT_KEYS = ['name', 'short', 'sub', 't', 'd', 'rain', 'gem', 'skip', 'instead'];
// every text of a place as [path, text]: the strings under TEXT_KEYS (poi.name too); the data (maps, region, pace, cost…) not
function placeTexts(v, path, out) {
  if (Array.isArray(v)) v.forEach(function (x, i) { placeTexts(x, path + '.' + i, out); });
  else if (v && typeof v === 'object') {
    Object.keys(v).forEach(function (k) {
      if (typeof v[k] === 'string') { if (TEXT_KEYS.indexOf(k) > -1) out.push([path + '.' + k, v[k]]); }
      else placeTexts(v[k], path + '.' + k, out);
    });
  }
  return out;
}
// what is wrong with the overlay over of a place base: a text of the base missing or empty, or a field where the base has
// no text (data, a field of its own); lists hold their texts at the same places as the base's
function overlayProblems(base, over, path) {
  var out = [], want = {}, got = {};
  placeTexts(base, path, []).forEach(function (x) { want[x[0]] = true; });
  (function walk(v, p) {
    if (typeof v === 'string') got[p] = v;
    else if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, p + '.' + i); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], p + '.' + k); });
    else out.push(p + ': ' + JSON.stringify(v) + ' is no text');
  })(over, path);
  Object.keys(want).forEach(function (p) { if (!(p in got)) out.push(p + ': no text'); else if (!isText(got[p])) out.push(p + ': empty, or spaces at an end'); });
  Object.keys(got).forEach(function (p) { if (!want[p]) out.push(p + ': no text in the Polish file at this place'); });
  return out;
}
// The facts of a text that its translation keeps (finding 14): the numbers, as both languages would write them, and the
// Vietnamese names. Numbers: a time as written (6:00); thousands without their space or comma; the decimal comma of
// Polish as a point; a Polish date (30.04) as its day and month; a decade of a Polish century („lat 70. XVIII wieku”) as
// the year it starts (1770, as English writes „the 1770s”); the months of both languages and Roman numerals (months,
// centuries) as their numbers; English ordinals (19th, 27th) as numbers.
var MONTHS_PL = [['styczeń', 'stycznia', 'styczniu'], ['luty', 'lutego', 'lutym'], ['marzec', 'marca', 'marcu'], ['kwiecień', 'kwietnia', 'kwietniu'],
  ['maj', 'maja', 'maju'], ['czerwiec', 'czerwca', 'czerwcu'], ['lipiec', 'lipca', 'lipcu'], ['sierpień', 'sierpnia', 'sierpniu'],
  ['wrzesień', 'września', 'wrześniu'], ['październik', 'października', 'październiku'], ['listopad', 'listopada', 'listopadzie'], ['grudzień', 'grudnia', 'grudniu']];
var MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function roman(r) {
  var v = { I: 1, V: 5, X: 10, L: 50 }, n = 0;
  for (var i = 0; i < r.length; i++) n += v[r[i]] < (v[r[i + 1]] || 0) ? -v[r[i]] : v[r[i]];
  return n;
}
function factNumbers(t, lang) {
  var s = ' ' + String(t).replace(/\u00a0|\u2060/g, function (c) { return c === '\u2060' ? '' : ' '; }) + ' ', out = [];
  s = s.replace(/\d{1,2}:\d{2}/g, function (m) { out.push(m); return ' '; });
  if (lang === 'pl') {
    s = s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1');
    s = s.replace(/(\d{2})\. ([IVXL]+) (wieku|w\.)/g, function (m, d, r) { return ' ' + ((roman(r) - 1) * 100 + Number(d)) + ' '; });
    s = s.replace(/(\d{1,2})\.(\d{2})(?!\d)/g, ' $1 $2 ');
    s = s.replace(/(\d),(\d)/g, '$1.$2');
    MONTHS_PL.forEach(function (forms, i) { s = s.replace(new RegExp('(^|[^\\p{L}])(' + forms.join('|') + ')(?![\\p{L}])', 'gu'), '$1 ' + (i + 1) + ' '); });
    s = s.replace(/(^|[^\p{L}])([IVXL]+)(?![\p{L}])/gu, function (m, a, r) { return a + ' ' + roman(r) + ' '; });
  } else {
    s = s.replace(/(\d),(?=\d{3}(?!\d))/g, '$1');
    MONTHS_EN.forEach(function (name, i) { s = s.replace(new RegExp('(^|[^\\p{L}])' + name + '(?![\\p{L}])', 'gu'), '$1 ' + (i + 1) + ' '); });
    s = s.replace(/(\d)(st|nd|rd|th)(?![\p{L}])/gu, '$1');
  }
  (s.match(/\d+(?:\.\d+)?½?|½/g) || []).forEach(function (m) { out.push(/^\d+(\.\d+)?$/.test(m) ? String(Number(m)) : m.replace(/^0+(?=\d)/, '')); });
  return out.sort();
}
function vietNames(t) {
  var seen = {};
  (String(t).match(/[\p{L}\p{M}]+/gu) || []).forEach(function (w) { if (VIET_LETTER.test(w)) seen[w] = true; });
  return Object.keys(seen).sort();
}
// Pairs of texts whose numbers or names differ for a reason, by the path of the Polish text: { path: reason }.
var SAME_FACTS_EXCEPTIONS = {};
function factProblems(path, pl, en) {
  if (SAME_FACTS_EXCEPTIONS[path]) return [];
  var out = [], a = factNumbers(pl, 'pl'), b = factNumbers(en, 'en'), x = vietNames(pl), y = vietNames(en);
  if (a.join(' ') !== b.join(' ')) out.push(path + ': numbers ' + a.join(' ') + ' | ' + b.join(' '));
  if (x.join(' ') !== y.join(' ')) out.push(path + ': Vietnamese names ' + x.join(' ') + ' | ' + y.join(' '));
  return out;
}
// The style of the English texts (finding 15): British English to one reader (you), Vietnamese names with their marks,
// typographic quotes and apostrophe (“ ” ’), no Polish letter or quote, no American spelling of a short list.
var AMERICAN = /(^|[^\p{L}])(color|colors|colored|colorful|center|centers|centered|traveler|travelers|traveling|traveled|theater|theaters|favorite|favorites|gray|meter|meters|kilometer|kilometers|liter|liters|program|programs|license|licenses|defense|harbor|neighbor|neighbors|honor|catalog|aluminum|mold|plow)(?![\p{L}])/iu;
function englishProblems(path, t) {
  var out = [];
  if (/[ąćęłńśźżĄĆĘŁŃŚŹŻ]/.test(t)) out.push(path + ': a Polish letter');
  if (/[„]/.test(t)) out.push(path + ': a Polish quote „ (use “ ”)');
  if (/["']/.test(t)) out.push(path + ': straight quotes or apostrophe (use “ ” ’)');
  var m = AMERICAN.exec(t);
  if (m) out.push(path + ': American spelling „' + m[2] + '” (British English: colour, centre, traveller, metre, programme, licence…)');
  if (/\d\s*(am|pm)\b/i.test(t)) out.push(path + ': am/pm, use 24-hour time');
  if (/\d°/.test(t)) out.push(path + ': no space before °C');
  if (/\d-\d/.test(t)) out.push(path + ': a hyphen in a range, use an en dash');
  if (/\d(?:[\d.:,]*\d)?\s(?!\d{3}(?!\d))[\d½]/.test(t)) out.push(path + ': two numbers side by side: put a word between them');
  if (/(^|[^\p{L}])(PLN|EUR|USD)(?!\p{L})|[€$£]|(^|[^\p{L}])(euros?|dollars?|zloty)(?![\p{L}])/iu.test(t) || /Poland|Polish/.test(t)) out.push(path + ': money other than dong, or Poland: the page is for every passport');
  return out;
}

/* The English texts of the places (site2/src/en/content/<id>.js, finding 8): every place has them, with a text wherever
   its Polish file has one and nothing else (finding 13), the same numbers and Vietnamese names in each pair of texts
   (finding 14), in British English for every passport (findings 15 and 16), and a day's text of at most DAY_WORDS_EN
   words (finding 17: the longest English day text of the dry run, so that the texts do not grow). */
var DAY_WORDS_EN = 80;
contentCheck('english places', function (need) {
  Object.keys(CONTENT).forEach(function (id) {
    var en = CONTENT_EN[id], w = 'CONTENT_EN.' + id, pl = {};
    need(en, id + ': no English texts (site2/src/en/content/' + id + '.js)');
    if (!en) return;
    overlayProblems(CONTENT[id], en, w).forEach(function (p) { need(false, p); });
    placeTexts(CONTENT[id], w, []).forEach(function (x) { pl[x[0]] = x[1]; });
    placeTexts(en, w, []).forEach(function (x) {
      englishProblems(x[0], x[1]).forEach(function (p) { need(false, p); });
      if (pl[x[0]] != null) factProblems(x[0], pl[x[0]], x[1]).forEach(function (p) { need(false, p); });
      if (/\.d$/.test(x[0])) need(wordCount(x[1]) <= DAY_WORDS_EN, x[0] + ': ' + wordCount(x[1]) + ' words, at most ' + DAY_WORDS_EN);
    });
  });
  Object.keys(CONTENT_EN).forEach(function (id) { need(CONTENT[id], 'English texts for an unknown place: ' + id); });
  // the safety sentences of the places in English too: a hard day says who leads; a plan on Sơn Trà says to check the
  // management's notice; the 7 km in Paradise Cave turn back after about 4 km in the rainy season
  Object.keys(CONTENT_EN).forEach(function (id) {
    (CONTENT_EN[id].days || []).forEach(function (d, i) {
      if (d.hard) need(/guide|operator/i.test(d.hard.d) && !/without (a |the )?(guide|operator)/i.test(d.hard.d), 'CONTENT_EN.' + id + '.days.' + i + '.hard: say who leads (a guide or an operator)');
    });
  });
  CONTENT_EN.danang.days.forEach(function (d, i) {
    [['', d], ['.solo', d.solo], ['.easy', d.easy], ['.hard', d.hard]].forEach(function (v) {
      if (v[1] && /Sơn Trà/.test(v[1].d)) need(/check[^.]*notice/i.test(v[1].d), 'CONTENT_EN.danang.days.' + i + v[0] + ': a plan on Sơn Trà says to check the management’s notice');
    });
  });
  var cave = CONTENT.phongnha.days.map(function (d) { return d.t; }).indexOf('7 km w głąb Paradise Cave');
  need(cave > -1 && /turns back after about 4 km/.test(CONTENT_EN.phongnha.days[cave].d), 'CONTENT_EN.phongnha: the day of 7 km in Paradise Cave says that in the rainy season the trek turns back after about 4 km');
});

/* The other English texts (finding 8): a caption for every photo (site2/src/en/photos.js), a name for every holiday and every
   link of „Przed wyjazdem” (site2/src/en/names.js), each with the facts of its Polish text (finding 14), in British English
   for every passport (findings 15 and 16), and nothing for a photo, a holiday or a link that is not there. */
contentCheck('english names', function (need) {
  function check(w, pl, en) {
    need(isText(en), w + ': no English text');
    if (isText(en)) englishProblems(w, en).concat(factProblems(w, pl, en)).forEach(function (p) { need(false, p); });
  }
  Object.keys(PHOTO_META).forEach(function (ph) { check('PHOTO_CAPS_EN.' + ph, PHOTO_META[ph].cap, PHOTO_CAPS_EN[ph]); });
  Object.keys(PHOTO_CAPS_EN).forEach(function (ph) { need(PHOTO_META[ph], 'PHOTO_CAPS_EN.' + ph + ': no such photo in photos.js'); });
  var holidays = {}, links = {};
  HOLIDAYS.forEach(function (h) { holidays[h[3]] = true; });
  Object.keys(BOOK).forEach(function (k) { BOOK[k].links.forEach(function (l) { links[l.name] = true; }); });
  ENTRY.links.forEach(function (l) { links[l.name] = true; });
  [['HOLIDAY_NAMES_EN', HOLIDAY_NAMES_EN, holidays], ['LINK_NAMES_EN', LINK_NAMES_EN, links]].forEach(function (x) {
    Object.keys(x[2]).forEach(function (n) { check(x[0] + '[' + JSON.stringify(n) + ']', n, x[1][n]); });
    Object.keys(x[1]).forEach(function (n) { need(x[2][n], x[0] + '[' + JSON.stringify(n) + ']: no such name in holidays.js or before.js'); });
  });
});

/* The interface in English (site2/src/en/ui.js, finding 8): UI.en has exactly the keys of UI.pl (finding 13), each with the
   values the page fills in ({name}) of its Polish text, the same numbers and Vietnamese names (finding 14), in British
   English for every passport (findings 15 and 16); a road text reads right both ways, as in Polish. */
contentCheck('english interface', function (need) {
  var pl = UI.pl, en = UI.en;
  function slots(t) { return (t.match(/\{[a-z]+\}/g) || []).sort().join(' '); }
  Object.keys(pl).forEach(function (k) { need(k in en, 'UI.en[\'' + k + '\'] is missing'); });
  Object.keys(en).forEach(function (k) {
    var w = 'UI.en[\'' + k + '\']', v = en[k];
    if (!(k in pl)) { need(false, w + ' is no key of UI.pl'); return; }
    need(typeof v === 'string' && v.trim() !== '', w + ' is empty');
    need(slots(v) === slots(pl[k]), w + ': fills in ' + (slots(v) || 'nothing') + ', the Polish ' + (slots(pl[k]) || 'nothing'));
    englishProblems(w, v).concat(factProblems(w, pl[k], v)).forEach(function (p) { need(false, p); });
    if (/^r\./.test(k)) need(!/(^|[^\p{L}])(uphill|downhill|back|at the end|at the start)(?![\p{L}])/iu.test(v), w + ' names a direction (' + v + '): a road text must read right both ways');
  });
  // the safety sentences in English too (decisions of 15.10.2026): the motorbike licence and permit of the 1968 convention,
  // the exceptions by agreement, the risk as two facts, the passport as no deposit, the visa and the government's sites
  need(/International Driving Permit under the 1968 Convention/.test(en['sw.note']) && /A car licence does not cover/.test(en['sw.note']) &&
    /Check which convention your country issues it under/.test(en['sw.note']) &&
    /Exceptions by agreement: a licence from an ASEAN country and a South Korean permit, though police at a check may not accept them straight away\.$/.test(en['sw.note']),
    'UI.en sw.note: the motorbike licence and the permit of the 1968 convention, a car licence not enough, the convention of your country, the exceptions by agreement');
  need(/\(WHO estimate\)\. Over 90% of those killed in 2023 died in crashes involving a motorbike \(national data\)\./.test(en['sw.risk']),
    'UI.en sw.risk: the WHO estimate and the national data of 2023 as two facts');
  need(/Do not leave your passport as a deposit/.test(en['sw.tips']), 'UI.en sw.tips: the passport is no deposit');
  need(/your passport needs one/.test(en['know.visa']) && /only on the government sites/.test(en['know.visa']), 'UI.en know.visa: whether your passport needs a visa; the government sites only');
});

/* Colours only through the variables in :root (the project rule): outside the :root blocks the template's CSS has no hex
   colour and no rgb() or rgba() with numbers (a triplet variable goes in as rgba(var(--black), 0.25)). */
contentCheck('css colours', function (need) {
  var css = readFile('site2/src/template.html').split('<style>')[1].split('</style>')[0].replace(/:root[^{]*\{[^}]*\}/g, '');
  (css.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d[^)]*\)/g) || []).forEach(function (m) { need(false, 'a colour outside :root: ' + m + ' (put it in a variable)'); });
});

/* The palette of the places (--pal-N in template.html): 20 colours in each of the three blocks, light and dark, and the
   number of a day on each colour (--on-c) has a contrast of at least 4.5:1 (WCAG AA), in both themes. */
contentCheck('palette', function (need) {
  var css = readFile('site2/src/template.html').split('<style>')[1].split('</style>')[0];
  var light = /:root \{([^}]*)\}/.exec(css)[1], dark = /:root:not\(\[data-theme="light"\]\) \{([^}]*)\}/.exec(css)[1];
  function vars(block) { var o = {}; block.replace(/--([a-z0-9-]+): (#[0-9a-f]{6});/g, function (m, k, v) { o[k] = v; }); return o; }
  function lum(hex) {
    return [1, 3, 5].map(function (i) { var c = parseInt(hex.slice(i, i + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); })
      .reduce(function (a, c, i) { return a + c * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  [['light', vars(light)], ['dark', vars(dark)]].forEach(function (theme) {
    var v = theme[1];
    for (var n = 1; n <= 20; n++) {
      need(v['pal-' + n], theme[0] + ': --pal-' + n + ' is missing');
      if (v['pal-' + n]) need(ratio(v['pal-' + n], v['on-c']) >= 4.5, theme[0] + ': --pal-' + n + ' ' + v['pal-' + n] + ' and the number on it ' + v['on-c'] + ': contrast ' + ratio(v['pal-' + n], v['on-c']).toFixed(2) + ' < 4.5');
    }
  });
  need(css.split('--pal-1:').length - 1 === 3, 'the palette in all three blocks: light, dark by the system, dark chosen');
});

/* The names kept together (KEEP_TOGETHER in content.js): each is a name of several words that a text of the places uses,
   with no letter that tieVietnamese (page.js) would know it by, so the list is what keeps it on one line. */
contentCheck('names kept together', function (need) {
  var texts = JSON.stringify(CONTENT);
  KEEP_TOGETHER.forEach(function (n) {
    need(n.indexOf(' ') > -1 && texts.indexOf(n) > -1, n + ': a name of several words that a text of the places uses');
    need(!VIET_LETTER.test(n), n + ': has a Vietnamese letter, so tieVietnamese keeps it together without the list');
  });
});

/* The interface texts (ui.js): none empty; every key the code asks for exists; every key is used. */
contentCheck('ui', function (need) {
  var pl = UI.pl, app = readFile('site2/src/app.js'), tpl = readFile('site2/src/template.html'), page = readFile('site2/src/page.js'), panels = readFile('site2/src/panels.js');
  var code = [app, page, readFile('site2/src/content.js'), panels, tpl].join('\n'), used = {};
  Object.keys(pl).forEach(function (k) { need(typeof pl[k] === 'string' && pl[k].trim() !== '', 'UI.pl[\'' + k + '\'] is empty'); });
  // a road text is picked by the two places alone (segKey in page.js), so it must read right in both directions of travel:
  // no uphill or downhill, no "at the end"; only the airport texts and the Mekong pair differ by direction, and they say to or from
  Object.keys(pl).filter(function (k) { return /^r\./.test(k); }).forEach(function (k) {
    need(!/w górę|w dół|pod górę|na koniec|na początek|na początku|z powrotem/i.test(pl[k]), 'UI.pl[\'' + k + '\'] names a direction (' + pl[k] + '): a road text must read right both ways');
  });
  // T('…'), both keys of T(condition ? '…' : '…'), countWord('…', n) with its three forms, data-i18n…="…", the travel texts
  // of page.js; a key ending in a dot is a prefix
  function wants(k, where) { if (!/\.$/.test(k)) need(k in pl, where + ' asks for the missing key ' + k); }
  (app.match(/\bT\('[^']+'/g) || []).forEach(function (m) { wants(m.slice(3, -1), 'app.js'); });
  (app.match(/\bT\([^'()]{1,80}\? *'[^']+' *: *'[^']+'/g) || []).forEach(function (m) {
    m.match(/'[^']+'/g).forEach(function (q) { wants(q.slice(1, -1), 'app.js (a key picked by a condition)'); });
  });
  (app.match(/countWord\('[^']+'/g) || []).forEach(function (m) {
    ['one', 'few', 'many'].forEach(function (f) { wants(m.slice(11, -1) + '.' + f, 'app.js'); used[m.slice(11, -1) + '.' + f] = true; });
  });
  (tpl.match(/data-i18n(?:-html|-alt|-aria)?="[^"]+"/g) || []).forEach(function (m) { wants(m.split('"')[1], 'template.html'); });
  (page.match(/'[rn]\.[a-z_]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'page.js'); });
  Object.keys(ROAD_KEYS).forEach(function (k) { wants(ROAD_KEYS[k], 'ROAD_KEYS'); });
  Object.keys(SWAPS).forEach(function (k) { Object.keys(SWAPS[k].roads || {}).forEach(function (pair) { wants(SWAPS[k].roads[pair].text, 'SWAPS'); }); });
  Object.keys(AIR_KEYS).forEach(function (k) { wants(AIR_KEYS[k].text, 'AIR_KEYS'); });
  Object.keys(FLIGHT_DAYS).forEach(function (k) { wants(FLIGHT_DAYS[k], 'FLIGHT_DAYS'); });
  (app.match(/'m\.[a-z]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'app.js (map labels)'); });
  (panels.match(/'m\.[a-z]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'panels.js (names on the basemap)'); });
  // keys built from data as T(prefix + value): app.js builds each prefix, and every value has its key
  var FAMILIES = { 'pace.': PACES, 'reg.': REGIONS, 'int.': INTERESTS, 'lvl.': LEVELS, 'lvlp.': LEVELS, 'badge.': ['easy', 'hard', 'self'],
    'mon.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'mon3.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'monl.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'season.': ['D', 'S', 'Z'], 'why.': ['from', 'to'], 'wx.': WEATHER_WHY,
    'off.r.': ['removed', 'level', 'closed', 'closed_part', 'season', 'profile', 'far', 'beaten'],
    'm.': Object.keys(MAP_PANELS),
    'alert.': ['tet', 'holiday', 'nodata'],
    'bud.': ['nights', 'day', 'travel', 'trips'], 'cost.': Object.keys(COSTS.items).concat(['flights']),
    'sw.': Object.keys(SWAPS).concat(['driver', 'self']), 'sw.tips.': Object.keys(SWAPS),
    'sw.risk.': Object.keys(SWAPS).filter(function (k) { return SWAPS[k].risk; }),
    'b.': Object.keys(BOOK).filter(function (k) { return BOOK[k].ahead > 0; }), 'b.homestay.': HOMESTAY_NOTES,
    'p.': ['warm', 'rain', 'leeches', 'torch', 'swim', 'moto', 'mosquito'],
    'set.err.': ['airport', 'date', 'month', 'year', 'days', 'interests', 'level', 'add', 'remove', 'no_route'] };
  Object.keys(FAMILIES).forEach(function (pre) {
    need(app.indexOf("T('" + pre + "' + ") > -1, 'app.js never builds a key ' + pre + '…');
    FAMILIES[pre].forEach(function (v) { wants(pre + v, 'the family ' + pre); used[pre + v] = true; });
  });
  // used: part of a family or a counted word, or quoted somewhere in the code or the template ('key' or "key")
  Object.keys(pl).forEach(function (k) {
    need(used[k] || code.indexOf("'" + k + "'") > -1 || code.indexOf('"' + k + '"') > -1, 'UI.pl[\'' + k + '\'] is never used');
  });
  need(pl['fmt.hm'].indexOf('{h}') > -1 && pl['fmt.hm'].indexOf('{m}') > -1, 'fmt.hm needs {h} and {m}');
});

/* The printout, the offline version for travellers (decision of 14.10.2026): A4 with 12 mm margins, the button „Zapisz
   trasę jako PDF” right after „Kopiuj plan na WhatsApp”, the map's panels apart for print and the link to the route on the
   first page; tests/probes/pdf.js taps the button, tests/print.sh prints. */
contentCheck('printout', function (need) {
  var tpl = readFile('site2/src/template.html');
  need(/\n@page \{ size: A4; margin: 12mm; \}\n/.test(tpl), 'template.html: @page { size: A4; margin: 12mm; }');
  need(/id="copy-plan"[^>]*><\/button>\s*<button type="button" class="btn-ghost" id="pdf-plan" data-i18n="pdf.btn"><\/button>/.test(tpl), 'template.html: the PDF button right after „Kopiuj plan”');
  need(/<div class="map-print" id="map-print"><\/div>/.test(tpl) && /<p class="print-link" id="print-link"><\/p>/.test(tpl), 'template.html: the map and the link of the printout');
  // with the costs hidden (fix 2 of the first round of fixes) the budget part is not printed at all
  need(/@media print \{[\s\S]*, \.b-off[,\s][^{]*\{ display: none !important; \}/.test(tpl), 'template.html: the budget part with the costs hidden (.b-off) is not printed');
});

/* The language switch (stage 5, findings 1 and 2): EN · PL in the photo at the top, two buttons with their languages,
   not printed. */
contentCheck('language switch', function (need) {
  var tpl = readFile('site2/src/template.html');
  need(/<header class="hero" id="top">[\s\S]*<div class="lang-switch" id="lang-switch" role="group" data-i18n-aria="lang.aria"><button type="button" data-lang="en" lang="en" aria-pressed="false">EN<\/button><span aria-hidden="true">·<\/span><button type="button" data-lang="pl" lang="pl" aria-pressed="false">PL<\/button><\/div>[\s\S]*<\/header>/.test(tpl),
    'template.html: the switch EN · PL in the photo at the top');
  need(/@media print \{[\s\S]*\.lang-switch, [^{]*\{ display: none !important; \}/.test(tpl), 'template.html: the switch is not printed');
  // the name in the file itself, before or without the scripts (the final review of stage 5): the page's English title in
  // <title> (a reader without JavaScript, the offline file) and in the link preview of build.py
  need(tpl.indexOf('<title>' + UI.en['doc.title'] + '</title>') > -1, 'template.html: the title of the file is the English title of the page (doc.title)');
  need(readFile('site2/build.py').indexOf('"title": "' + UI.en['doc.title'] + '"') > -1, 'build.py: the link preview has the English title of the page (doc.title)');
});

/* What the parks and the entry rules allow today (research/<id>-2026-10.md, research/wjazd-2026-10.md): every plan that
   drives to Sơn Trà says to check the notice of its management the day before, as the roads close in heavy rain (closed
   8–13.10.2026, open again from 14.10.2026); „Warto wiedzieć” (decision of 15.10.2026) asks whether one's own passport
   needs a visa and sends the e-visa and the arrival card to the government's sites only, its two links, as fake sites
   copy them (WJ-2026-10-14c, WJ-2026-10-14i). */
contentCheck('safety', function (need) {
  CONTENT.danang.days.forEach(function (d) {
    [['', d], [' solo', d.solo], [' easy', d.easy], [' hard', d.hard]].forEach(function (v) {
      if (v[1] && /Sơn Trà/.test(v[1].d)) need(/sprawdź[^.]*komunikat/.test(v[1].d), 'danang day ' + d.p + v[0] + ': a plan on Sơn Trà says to check the notice of the management (sprawdź … komunikat)');
    });
  });
  // the motorbike ridden yourself, for every passport (decision of 15.10.2026, research/motocykl-2026-10.md): a licence for
  // the motorbike and an international permit of the 1968 convention, as many countries give only the 1949 one, which
  // Vietnam does not accept; a car's licence is not enough; the passport is no deposit
  need(/konwencji z 1968 r\./.test(UI.pl['sw.note']) && /na samochód nie wystarcza/.test(UI.pl['sw.note']) && /według której konwencji wydaje je twój kraj/.test(UI.pl['sw.note']),
    'sw.note: a motorbike licence and the international permit of the 1968 convention; a car\'s is not enough; which convention your country follows');
  need(/Paszportu nie zostawiaj w zastaw/.test(UI.pl['sw.tips']), 'sw.tips: the passport is no deposit');
  // the exceptions by agreement (decision 8 of stage 5, 15.10.2026): a licence of an ASEAN country and a South Korean permit,
  // which police at a check may not accept straight away (MOTO-2026-10-15t, -15v, -15w, -15y)
  need(/Wyjątki z umów: prawo jazdy z państwa ASEAN i międzynarodowe prawo jazdy z Korei Płd\., choć policja przy kontroli może ich nie uznać od ręki\.$/.test(UI.pl['sw.note']),
    'sw.note: ends with the exceptions by agreement (ASEAN, South Korea) and the caution about police checks');
  // the risk as two facts, each with its source (finding 20 of stage 5): the WHO estimate and the national data of 2023
  need(/\(szacunek WHO\)\. Ponad 90% zabitych w 2023 r\. to ofiary wypadków z udziałem motocykla \(dane krajowe\)\./.test(UI.pl['sw.risk']) && !/z nich/.test(UI.pl['sw.risk']),
    'sw.risk: the WHO estimate and the national data of 2023 as two facts, without „z nich”');
  // the 7 km in Paradise Cave turn back after about 4 km when the water is high in the rainy season (PN-2026-10-15c)
  need(CONTENT.phongnha.days.some(function (d) { return d.t === '7 km w głąb Paradise Cave' && /zawraca po ok\. 4 km/.test(d.d); }),
    'phongnha: the day of 7 km in Paradise Cave says that in the rainy season the trek turns back after about 4 km');
  need(/twój paszport/.test(UI.pl['know.visa']) && /stronach rządowych/.test(UI.pl['know.visa']), 'know.visa: whether your passport needs a visa; the e-visa and the arrival card on the government\'s sites only');
  need(ENTRY.links.length === 2 && ENTRY.links.every(function (l) { return /^https:\/\/[a-z.]+\.gov\.vn\/$/.test(l.url); }), 'ENTRY.links: the two sites of the government (.gov.vn)');
});
