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
  // a day of a stay that is the hard version marked late in the texts (the day carries the version's own title)
  function isLate(id, d) {
    return d.variant === 'hard' && CONTENT[id].days.some(function (cd) { return cd.hard && cd.hard.late && cd.hard.t === d.t; });
  }
  var held = 0;   // stays at level 3 where that rule kept a late hard night off the last day
  var MAP_WORDS = { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
  var BUDGET_DATA = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
  var BOOK_DATA = { costs: COSTS, book: BOOK, swaps: SWAPS, places: PLACES, airports: AIRPORTS, airKeys: AIR_KEYS, homestays: HOMESTAYS, shortFlightH: SHORT_FLIGHT_H };
  var PACK_DATA = { climate: CLIMATE, seasons: SEASONS, content: CONTENT, places: PLACES, swaps: SWAPS };

  // extra: a label for a changed setting; then no route is allowed (e.g. the only city near the airport removed),
  // unless strict (after an added place the base trip still exists, so no route is a failure)
  function check(s, extra, strict) {
    var name = s.from + '→' + s.to + ' ' + (s.start ? s.start + '…' + s.end : s.days + 'd m' + s.month) + ' L' + s.level + ' ' + (s.interests.join('+') || '-') + (extra || '');
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
      // a place near another one on the trip (within NEAR_H by road: Hội An and Đà Nẵng) stands right next to it
      r.stops.forEach(function (y, j) {
        if (j > i + 1 && node(y.id) !== node(x.id) && DATA.graph.road[node(x.id)][node(y.id)] <= NEAR_H) need(false, x.id + ' and ' + y.id + ' are near each other, but not next to each other');
      });
      // a place with a node (the night in Hà Nội on the way) never opens or closes the trip, and goes when its node is removed
      need(!p.node || (i > 0 && i < last), x.id + ' (node ' + p.node + ') is the ' + (i ? 'last' : 'first') + ' stop');
      need(!p.node || (s.remove || []).indexOf(p.node) < 0, x.id + ' is on the trip though its node ' + p.node + ' is removed');
      need(p.level <= s.level, x.id + ' needs level ' + p.level);
      // the season of each night, read again from SEASONS and the months of the trip: never closed (X)
      var letters = '';
      for (var j = 0; j < x.n; j++) letters += SEASONS[x.id].charAt(st.months[x.start - 1 + j]);
      need(letters === x.season && letters.indexOf('X') < 0, x.id + ' season ' + x.season + ', from SEASONS ' + letters);
      need(x.leg && x.leg.segs.length > 0 && x.leg.total <= (i === 0 ? END_LEG_H : MAX_LEG_H), 'leg into ' + x.id + ': ' + (x.leg && x.leg.total) + ' h');
      if (x.leg) x.leg.segs.forEach(function (g) { need(g.h > 0, 'segment without hours into ' + x.id); });
      nights += x.n; day += x.n;
      used[x.id] = (used[x.id] || 0) + 1;
    });
    // the page's day plans (page.js), planned as app.js does: one per night of every stay at the level set, no hike at level 1,
    // and a hard version that ends away from the stay (late) never on the last day of a stay that the way home, a leg of
    // LONG_LEG_H hours or more or a journey to a place behind a ferry follows
    var done = {}, plans = [];
    r.stops.forEach(function (x, i) {
      var next = legAfter(r, i, FERRY), days = stopDays(CONTENT[x.id], x, done[x.id] || 0, s.level, st.months, next);
      plans.push(days || []);
      need(days && days.length === x.n, x.id + ': ' + (days ? days.length : 'no') + ' day plans for ' + x.n + ' nights' + (done[x.id] ? ' (second stay)' : ''));
      if (days && s.level === 1) need(days.every(function (d) { return d.pace !== 'hike'; }), x.id + ': a hike at level 1');
      // a hard version over two days: the next day is its second day, and it never ends the stay
      if (days) days.forEach(function (d, k) {
        var first = d.variant === 'hard' && CONTENT[x.id].days.filter(function (cd) { return cd.hard && cd.hard.next && cd.hard.t === d.t; })[0];
        if (first) need(k < days.length - 1 && days[k + 1].t === first.hard.next.t, x.id + ': ' + d.t + ' without its second day');
      });
      if (days && days.length === x.n && s.level === 3 && (next.home || next.h >= LONG_LEG_H || next.ferry)) {
        need(!isLate(x.id, days[x.n - 1]), x.id + ': a late hard night on the last day of the stay, before ' + (next.home ? 'the way home' : 'a leg of ' + next.h + ' h' + (next.ferry ? ' to a ferry' : '')));
        // the rule had work to do: without the leg the same stay would have ended with that night
        if (isLate(x.id, stopDays(CONTENT[x.id], x, done[x.id] || 0, s.level, st.months)[x.n - 1])) held++;
      }
      done[x.id] = (done[x.id] || 0) + x.n;
    });
    // the map (mapLayout in page.js): every stay has its label on a panel, and no label covers another one, a marker or the
    // edge of its panel (a faint dot's name is left out when it does not fit)
    var lay = mapLayout(r, st, MAP_WORDS);
    lay.panels.forEach(function (P) {
      P.labels.forEach(function (l) { need(l.kind === 'faint' || l.clear, 'map ' + P.key + ': the label of ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
      // no two pins overlap (spreadPins)
      P.pins.forEach(function (a, i) {
        P.pins.slice(i + 1).forEach(function (b) {
          need(overlapArea({ x: a.x - a.w / 2, y: a.y - PIN_H / 2, w: a.w, h: PIN_H }, { x: b.x - b.w / 2, y: b.y - PIN_H / 2, w: b.w, h: PIN_H }) === 0,
            'map ' + P.key + ': the pins of ' + a.key + ' and ' + b.key + ' overlap');
        });
      });
    });
    r.stops.forEach(function (x) {
      need(lay.panels.some(function (P) { return P.labels.some(function (l) { return l.kind === 'stop' && l.key === node(x.id); }); }), 'map: ' + x.id + ' has no label on any panel');
    });
    // the budget (tripBudget in page.js), with a driver and with every swap ridden yourself: numbers, from up to to, a person
    // alone pays no less, the parts add up to the whole, the paid things dearest first
    [[], Object.keys(SWAPS)].forEach(function (moto) {
      var self = selfSwaps(moto, SWAPS), donS = {}, pl = moto.length ? r.stops.map(function (x, i) {
        var d = stopDays(CONTENT[x.id], x, donS[x.id] || 0, s.level, st.months, legAfter(r, i, FERRY), !!self.places[x.id]);
        donS[x.id] = (donS[x.id] || 0) + x.n;
        return d || [];
      }) : plans;
      var b = tripBudget(r, pl, moto, BUDGET_DATA), sum = [0, 0];
      Object.keys(b.parts).forEach(function (p) { sum[0] += b.parts[p].two[0]; sum[1] += b.parts[p].two[1]; });
      need(isFinite(b.two[0]) && isFinite(b.one[1]) && b.two[0] > 0 && b.two[0] <= b.two[1] && b.one[0] >= b.two[0] && b.one[1] >= b.two[1],
        'budget ' + (moto.length ? 'ridden yourself' : 'with a driver') + ': ' + JSON.stringify([b.two, b.one]));
      need(Math.abs(sum[0] - b.two[0]) < 1e-6 && Math.abs(sum[1] - b.two[1]) < 1e-6, 'budget: the parts add up to the whole');
      need(b.items.every(function (x, i) { return !i || b.items[i - 1].two[1] >= x.two[1]; }), 'budget: the paid things dearest first');
    });
    // no zigzag by plane around the airports' regions (REGION_H by road, see planRoute): no flight back into the region of
    // the arrival airport or out of the region of the departure airport, and on a round trip no flight out of the home
    // region after a flight back into it
    var homeAgain = false;
    function inRegion(x, airport) { return DATA.graph.road[airport][node(x.id)] <= REGION_H; }
    r.stops.forEach(function (x, i) {
      if (!i || !x.leg.flights) return;
      var y = r.stops[i - 1];
      need(!(inRegion(x, s.from) && !inRegion(x, s.to)), x.id + ': a flight back into the region of ' + s.from);
      need(!(inRegion(y, s.to) && !inRegion(y, s.from)), y.id + ': a flight out of the region of ' + s.to);
      if (s.from !== s.to) return;
      need(!(homeAgain && inRegion(y, s.from) && !inRegion(x, s.from)), y.id + ': a flight out of the home region after coming home by plane');
      if (inRegion(x, s.from) && !inRegion(y, s.from)) homeAgain = true;
    });
    need(nights === st.days - 1, nights + ' nights, want ' + (st.days - 1));
    need(r.days === st.days, 'days ' + r.days);
    // before the trip (page.js): what to book (keys of BOOK, the most urgent first) and what to pack
    var books = bookList(r, plans, [], BOOK_DATA), packs = packList(r, plans, st, [], PACK_DATA);
    need(books.every(function (b, i) { return BOOK[b.key] && b.ahead > 0 && (!i || books[i - 1].ahead >= b.ahead); }), 'bookList: ' + books.map(function (b) { return b.key; }).join(', '));
    need(packs.length > 0 && packs.every(function (p) { return typeof p.code === 'string' && Array.isArray(p.places); }), 'packList');
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
  // the date mode: trips over the turn of every month of 2027 (from the 25th, for 10 and 20 days), each night with its own
  // month, for every set of interests, level and pair of airports (sampled like the months without --full)
  var dated = 0;
  sets.forEach(function (interests) {
    LEVELS.forEach(function (level) {
      for (var mo = 1; mo <= 12; mo++) [10, 20].forEach(function (len) {
        var a = Date.UTC(2027, mo - 1, 25), start = new Date(a).toISOString().slice(0, 10), end = new Date(a + (len - 1) * 864e5).toISOString().slice(0, 10);
        airports.forEach(function (from) {
          airports.forEach(function (to) {
            if (!all && k++ % 7) return;
            dated++;
            check({ from: from, to: to, start: start, end: end, interests: interests, level: level });
          });
        });
      });
    });
  });
  print('combos: ' + count + ' months and ' + dated + ' dates' + (all ? ' (all)' : ' (every 7th; tests/run.sh --full checks all)'));
  // every place is on some trip: a place no trip takes is dead data (or the engine cannot reach it)
  ok(ids.every(function (id) { return used[id] > 0; }), 'on no trip: ' + ids.filter(function (id) { return !used[id]; }).join(', '));
  print('places used: ' + ids.map(function (id) { return id + ' ' + (used[id] || 0); }).join(', '));
  print('late hard nights kept off the last day of a stay: ' + held);
  ok(held > 0, 'no checked stay had a late hard night to keep off its last day: the rule is not tested');
  if (fails.length) throw new Error(fails.length + ' failures:\n' + fails.slice(0, 40).join('\n'));
  print('combos ok');
})();
