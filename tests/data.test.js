/* The real data, part by part. Every problem is listed by name. */
function dataCheck(label, body) {
  var fails = [];
  body(function need(c, what) { if (!c) fails.push(what); });
  fails.forEach(function (f) { print('  ' + label + ': ' + f); });
  ok(!fails.length, fails.length + ' problem(s) in ' + label + ', listed above');
  print(label + ' ok');
}

dataCheck('places', function (need) {
  Object.keys(PLACES).forEach(function (id) {
    var p = PLACES[id];
    need(typeof p.name === 'string' && p.name.trim(), id + ': name');
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
});
