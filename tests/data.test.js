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
