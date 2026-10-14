// The numbers of every combination of settings (months mode), for the review at a checkpoint (notes/etapy.md): how often
// each place is on a trip (all trips, trips with no interest), its mean nights and how its stays split by nights; a travel
// day with two flights; a day with a flight of 8 h or more door to door, to a place or from it, and its most common legs; Hà Nội three times on one trip; two places at most 1.5 h apart by road that are not next to each other; a
// flight back near an earlier stop (3.5 h by road, not near the departure airport); a round trip that came home by plane
// in the middle and flew out again. Run by tools/liczby.sh.
var DA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
var R = DA.graph.road;
function node(id) { return PLACES[id].node || id; }
function name(id) { return AIRPORTS[id] ? AIRPORTS[id].name : CONTENT[id] ? CONTENT[id].short : id; }
var sets = [[]];
INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
var total = 0, plain = 0, on = {}, onPlain = {}, nights = {}, split = {}, twoFlights = 0, longAny = 0, longLegs = {};
var hanoi3 = 0, apart = 0, back = 0, home = 0;
sets.forEach(function (interests) { LEVELS.forEach(function (level) { for (var month = 1; month <= 12; month++) for (var days = MIN_DAYS; days <= MAX_DAYS; days++)
  Object.keys(HUBS).forEach(function (from) { Object.keys(HUBS).forEach(function (to) {
    var st = normSettings({ from: from, to: to, month: month, days: days, interests: interests, level: level }, PLACES, HUBS), r = planRoute(st, DA);
    if (!r.ok) return;
    total++; if (!interests.length) plain++;
    var seen = {}, legs = r.stops.map(function (x) { return x.leg; }).concat([r.home]), ids = r.stops.map(function (x) { return node(x.id); });
    r.stops.forEach(function (x) {
      nights[x.id] = (nights[x.id] || 0) + x.n;
      split[x.id] = split[x.id] || {}; split[x.id][x.n] = (split[x.id][x.n] || 0) + 1;
      if (seen[x.id]) return;
      seen[x.id] = true; on[x.id] = (on[x.id] || 0) + 1; if (!interests.length) onPlain[x.id] = (onPlain[x.id] || 0) + 1;
    });
    if (legs.some(function (L) { return L.flights >= 2; })) twoFlights++;
    var longs = legs.map(function (L, i) { return L.flights && L.total >= 8 ? i : -1; }).filter(function (i) { return i > -1; });
    if (longs.length) longAny++;
    longs.forEach(function (i) { var k = name(legs[i].from) + ' → ' + name(legs[i].to); longLegs[k] = (longLegs[k] || 0) + 1; });
    if (ids.filter(function (id) { return id === 'hanoi'; }).length >= 3) hanoi3++;
    if (ids.some(function (a, i) { return ids.some(function (b, j) { return j > i + 1 && a !== b && R[a][b] <= 1.5; }); })) apart++;
    if (r.stops.some(function (x, j) {
      return x.leg.flights && R[to][ids[j]] > 3.5 && ids.slice(0, Math.max(0, j - 1)).some(function (a) { return a !== ids[j] && R[a][ids[j]] <= 3.5; });
    })) back++;
    if (from === to) {
      var came = false;
      if (r.stops.some(function (x, j) {
        if (!j || !x.leg.flights) return false;
        var inX = R[from][ids[j]] <= REGION_H, inY = R[from][ids[j - 1]] <= REGION_H;
        if (came && inY && !inX) return true;
        if (inX && !inY) came = true;
        return false;
      })) home++;
    }
  }); }); }); });
function pc(n, of) { return (100 * n / of).toFixed(1).replace('.', ',') + '%'; }
print('Tras: ' + total + ' (bez zainteresowań: ' + plain + ')');
print('');
print('| Miejsce | Na trasach | Bez zainteresowań | Średnio nocy | Pobyty według nocy |');
print('|---|---|---|---|---|');
Object.keys(on).sort(function (a, b) { return on[b] - on[a] || (a < b ? -1 : 1); }).forEach(function (id) {
  var stays = 0, by = [];
  Object.keys(split[id]).forEach(function (n) { stays += split[id][n]; });
  Object.keys(split[id]).sort().forEach(function (n) { by.push(n + ': ' + pc(split[id][n], stays)); });
  print('| ' + name(id) + (PLACES[id].node ? ' (noc w drodze)' : '') + ' | ' + pc(on[id], total) + ' | ' + pc(onPlain[id] || 0, plain) + ' | ' +
    (nights[id] / on[id]).toFixed(2).replace('.', ',') + ' | ' + by.join(', ') + ' |');
});
print('');
print('- Dzień z dwoma lotami: ' + pc(twoFlights, total) + ' tras.');
print('- Dzień z lotem 8 h i dłużej od drzwi do drzwi: ' + pc(longAny, total) + ' tras.');
print('- Najczęstsze takie dni: ' + Object.keys(longLegs).sort(function (a, b) { return longLegs[b] - longLegs[a] || (a < b ? -1 : 1); }).slice(0, 5)
  .map(function (k) { return k + ' (' + longLegs[k] + ')'; }).join(', ') + '.');
print('- Hà Nội trzy razy: ' + hanoi3 + ' tras. Miejsca do 1,5 h drogi od siebie, nie obok siebie: ' + apart + ' tras.');
print('- Lot z powrotem w okolicę wcześniejszego miejsca (zygzak): ' + pc(back, total) + ' tras. Trasa w obie strony, która wróciła samolotem do domu w środku i znów odleciała: ' + home + ' tras.');
