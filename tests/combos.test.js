/* Every combination a visitor can set, on the real data: 16 sets of interests × 3 levels × 12 months × 26 lengths
   × 9 airport pairs. Each trip is checked against the hard rules. Without --full only every 7th combination runs. */
(function () {
  var all = typeof RUN_ALL !== 'undefined' && RUN_ALL;
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  // the hard limits are pinned here: a changed limit must be a deliberate change of this line
  eq([END_LEG_H, MAX_LEG_H], [4, 10], 'the hard limits: arrival and departure day at most 4 h by road, any travel day at most 10 h');
  var sets = [[]];
  INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
  var airports = Object.keys(HUBS).sort(), ids = Object.keys(PLACES).sort();
  var count = 0, k = 0, fails = [], used = {};
  function node(id) { return PLACES[id].node || id; }

  // extra: a label for a changed setting; then no route is allowed (e.g. the only city near the airport removed),
  // unless strict (after an added place the base trip still exists, so no route is a failure)
  function check(s, extra, strict) {
    var name = s.from + '→' + s.to + ' ' + s.days + 'd m' + s.month + ' L' + s.level + ' ' + (s.interests.join('+') || '-') + (extra || '');
    function need(c, what) { if (!c) fails.push(name + ': ' + what); }
    var st = normSettings(s, PLACES, HUBS);
    if (!st.ok) { fails.push(name + ': settings ' + st.error); return null; }
    var r = planRoute(st, DATA);
    if (!r.ok) { if (!extra || strict) fails.push(name + ': ' + r.error); return null; }
    var nights = 0, day = 1, seen = {}, last = r.stops.length - 1;
    r.stops.forEach(function (x, i) {
      var p = PLACES[x.id];
      need(x.start === day && x.end === day + x.n - 1, x.id + ' covers days ' + x.start + '–' + x.end + ', want from day ' + day);
      need(x.n >= p.nights[0] && x.n <= p.nights[2], x.id + ' ' + x.n + ' nights, allowed ' + p.nights[0] + '–' + p.nights[2]);
      // only the city of a round trip's airport comes twice: first and last, within its nights
      var again = seen[x.id] && s.from === s.to && x.id === HUBS[s.from] && i === last && r.stops[0].id === x.id;
      need(!seen[x.id] || again, x.id + ' twice');
      if (again) need(r.stops[0].n + x.n <= p.nights[2], x.id + ' ' + (r.stops[0].n + x.n) + ' nights over two visits');
      seen[x.id] = true;
      need(i === 0 || node(r.stops[i - 1].id) !== node(x.id), x.id + ' right after a stay in the same place');
      // a place with a node (the night in Hà Nội on the way) never opens or closes the trip, and goes when its node is removed
      need(!p.node || (i > 0 && i < last), x.id + ' (node ' + p.node + ') is the ' + (i ? 'last' : 'first') + ' stop');
      need(!p.node || (s.remove || []).indexOf(p.node) < 0, x.id + ' is on the trip though its node ' + p.node + ' is removed');
      need(p.level <= s.level, x.id + ' needs level ' + p.level);
      need(x.season.length === x.n && x.season.indexOf('X') < 0, x.id + ' season ' + x.season);
      need(x.leg && x.leg.segs.length > 0 && x.leg.total <= (i === 0 ? END_LEG_H : MAX_LEG_H), 'leg into ' + x.id + ': ' + (x.leg && x.leg.total) + ' h');
      if (x.leg) x.leg.segs.forEach(function (g) { need(g.h > 0, 'segment without hours into ' + x.id); });
      nights += x.n; day += x.n;
      used[x.id] = (used[x.id] || 0) + 1;
    });
    need(nights === s.days - 1, nights + ' nights, want ' + (s.days - 1));
    need(r.days === s.days, 'days ' + r.days);
    need(r.stops[0].leg.from === s.from && r.stops[0].leg.flights === 0, 'arrival day: by road from ' + s.from);
    need(r.home && r.home.to === s.to && r.home.flights === 0 && r.home.total <= END_LEG_H, 'departure day: ' + (r.home && r.home.total) + ' h to ' + s.to);
    return r;
  }

  sets.forEach(function (interests) {
    LEVELS.forEach(function (level) {
      for (var month = 1; month <= 12; month++) {
        for (var days = MIN_DAYS; days <= MAX_DAYS; days++) {
          airports.forEach(function (from) {
            airports.forEach(function (to) {
              if (!all && k++ % 7) return;
              var s = { from: from, to: to, month: month, days: days, interests: interests, level: level };
              count++;
              var r = check(s);
              if (!r || count % 151) return;
              // now and then: the same settings give the same trip. Removing a place: no route only if it was on the trip,
              // and a place that was not on it leaves the trip unchanged. Adding a place: it is on the trip, or missing
              // only if no trip found for these settings has it, and then the trip is unchanged
              ok(JSON.stringify(planRoute(normSettings(s, PLACES, HUBS), DATA)) === JSON.stringify(r), 'not the same trip twice: ' + JSON.stringify(s));
              // baseOn: the places on the trip; seenOn: the places on any trip found for these settings (this one and each removal)
              var baseOn = {}, seenOn = {};
              r.stops.forEach(function (x) { baseOn[x.id] = seenOn[x.id] = true; });
              ids.forEach(function (id) {
                var rm = check(Object.assign({}, s, { remove: [id] }), ' -' + id);
                if (rm) {
                  rm.stops.forEach(function (x) { seenOn[x.id] = true; });
                  ok(rm.stops.every(function (x) { return x.id !== id; }), id + ' removed but on the trip: ' + JSON.stringify(s));
                  if (!baseOn[id]) ok(JSON.stringify(rm.stops) === JSON.stringify(r.stops), id + ' removed but was not on the trip, yet the trip changed: ' + JSON.stringify(s));
                } else ok(baseOn[id], id + ' removed but was not on the trip, yet no route: ' + JSON.stringify(s));
              });
              ids.forEach(function (id) {
                var ad = check(Object.assign({}, s, { add: [id] }), ' +' + id, true);
                if (ad) ok(ad.missing.length === 0 ? ad.stops.some(function (x) { return x.id === id; }) : ad.missing[0] === id && !seenOn[id], id + ' added: on the trip, or missing only if no trip for these settings has it: ' + JSON.stringify(s));
                if (ad && ad.missing.length) ok(JSON.stringify(ad.stops) === JSON.stringify(r.stops), id + ' added but missing, yet the trip changed: ' + JSON.stringify(s));
              });
            });
          });
        }
      }
    });
  });
  print('combos: ' + count + (all ? ' (all)' : ' (every 7th; tests/run.sh --full checks all)'));
  print('places used: ' + ids.map(function (id) { return id + ' ' + (used[id] || 0); }).join(', '));
  if (fails.length) throw new Error(fails.length + ' failures:\n' + fails.slice(0, 40).join('\n'));
  print('combos ok');
})();
