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
