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
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'easy', 'hard', 'solo'];
  // a plan or a version of one: pace, title, text, maybe an early start
  function plan(w, d, keys) {
    Object.keys(d).forEach(function (k) { need(keys.indexOf(k) > -1, w + ': unknown field ' + k); });
    need(PACES.indexOf(d.pace) > -1, w + ': pace one of ' + PACES.join(', '));
    need(isText(d.t) && isText(d.d), w + ': title t and text d');
    if (d.early != null) need(typeof d.early === 'boolean', w + ': early is true or false');
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
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off', 'late']);
        need(/przewodnik|operator/i.test(d.hard.d), w + ' hard: say who leads (przewodnik or operator)');
        if (d.hard.late != null) need(typeof d.hard.late === 'boolean', w + ' hard: late is true or false');
        if (d.hard.off != null) {
          need(Array.isArray(d.hard.off) && d.hard.off.length < 12 && d.hard.off.every(function (m) { return typeof m === 'number' && m % 1 === 0 && m >= 1 && m <= 12; }),
            w + ' hard: off lists months 1–12, not all of them');
        }
      }
      if (d.solo) {
        plan(w + ' solo', d.solo, ['pace', 't', 'd', 'early']);
        need(d.p === 1, w + ': solo only on the p 1 day');
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
      Object.keys(e).forEach(function (k) { need(['from', 'to', 't', 'warn'].indexOf(k) > -1, w + ': unknown field ' + k); });
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
  });
});

/* The style of plan 1B: to one reader (ty), no gendered forms, nothing tied to December. list: [path, text] pairs. */
// words ending in -cie that are no plural address (nouns, adverbs); add one only when it really is not a verb form
var NOT_PLURAL = ['mieście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
  'życie', 'zdjęcie', 'zamknięcie', 'skrócie', 'locie', 'całkowicie', 'obficie', 'znakomicie', 'należycie', 'dystrykcie', 'pensjonacie',
  'porcie', 'świecie'];
function styleOk(need, list) {
  list.forEach(function (x) {
    var t = x[1];
    need(!/(^|[^\p{L}])(wy|was|wam|wami|wasz\p{L}*)(?=[^\p{L}]|$)/iu.test(t), x[0] + ': plural address (wy, was, wam, wasz…): write to one reader');
    (t.match(/\p{L}+cie(?=[^\p{L}]|$)/giu) || []).forEach(function (w) {
      need(NOT_PLURAL.indexOf(w.toLowerCase()) > -1, x[0] + ': „' + w + '” looks like a plural form: write to one reader (a noun goes on NOT_PLURAL)');
    });
    need(!/\p{L}+(łeś|łaś|łbyś|łabyś)(?=[^\p{L}]|$)/iu.test(t), x[0] + ': a gendered form (-łeś, -łaś)');
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
  // T('…'), countWord('…', n) with its three forms, data-i18n…="…", the travel texts of page.js; a key ending in a dot is a prefix
  function wants(k, where) { if (!/\.$/.test(k)) need(k in pl, where + ' asks for the missing key ' + k); }
  (app.match(/\bT\('[^']+'/g) || []).forEach(function (m) { wants(m.slice(3, -1), 'app.js'); });
  (app.match(/countWord\('[^']+'/g) || []).forEach(function (m) {
    ['one', 'few', 'many'].forEach(function (f) { wants(m.slice(11, -1) + '.' + f, 'app.js'); used[m.slice(11, -1) + '.' + f] = true; });
  });
  (tpl.match(/data-i18n(?:-html|-alt|-aria)?="[^"]+"/g) || []).forEach(function (m) { wants(m.split('"')[1], 'template.html'); });
  (page.match(/'[rn]\.[a-z_]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'page.js'); });
  Object.keys(ROAD_KEYS).forEach(function (k) { wants(ROAD_KEYS[k], 'ROAD_KEYS'); });
  (app.match(/'m\.[a-z]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'app.js (map labels)'); });
  (panels.match(/'m\.[a-z]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'panels.js (names on the basemap)'); });
  // keys built from data as T(prefix + value): app.js builds each prefix, and every value has its key
  var FAMILIES = { 'pace.': PACES, 'reg.': REGIONS, 'int.': INTERESTS, 'lvl.': LEVELS, 'lvlp.': LEVELS, 'badge.': ['easy', 'hard'],
    'mon.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'mon3.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'monl.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'season.': ['D', 'S', 'Z'], 'why.': ['from', 'to'], 'wx.': WEATHER_WHY,
    'off.r.': ['removed', 'level', 'closed', 'season', 'profile', 'far', 'beaten'],
    'm.': Object.keys(MAP_PANELS),
    'alert.': ['tet', 'holiday', 'nodata'],
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
