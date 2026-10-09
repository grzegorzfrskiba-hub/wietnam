/* Sample trips for a human review, as Markdown in Polish: tools/report.sh > notes/raport-tras-YYYY-MM-DD.md */
var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
var MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
var LEVEL_NAME = { 1: 'spokojnie', 2: 'aktywnie', 3: 'ekstremalnie' };
var AIRPORT = { SGN: 'HCMC', HAN: 'Hà Nội', DAD: 'Đà Nẵng' };
var SCENARIOS = [
  { from: 'SGN', to: 'HAN', month: 3, days: 15, interests: [] },
  { from: 'SGN', to: 'HAN', month: 12, days: 15, interests: [] },
  { from: 'SGN', to: 'HAN', month: 12, days: 15, interests: ['przyroda'] },
  { from: 'SGN', to: 'HAN', month: 12, days: 15, interests: ['kultura', 'jedzenie'] },
  { from: 'HAN', to: 'HAN', month: 10, days: 10, interests: ['przyroda'] },
  { from: 'HAN', to: 'HAN', month: 4, days: 14, interests: [] },
  { from: 'HAN', to: 'SGN', month: 2, days: 21, interests: ['kultura', 'jedzenie'] },
  { from: 'DAD', to: 'HAN', month: 4, days: 12, interests: ['gory'] },
  { from: 'SGN', to: 'SGN', month: 1, days: 8, interests: ['morze'] },
  { from: 'DAD', to: 'DAD', month: 7, days: 5, interests: ['kultura'] },
  { from: 'HAN', to: 'HAN', month: 11, days: 30, interests: ['przyroda', 'gory'] },
  { from: 'SGN', to: 'HAN', month: 5, days: 30, interests: [] },
  { from: 'HAN', to: 'DAD', month: 9, days: 7, interests: ['morze'] },
  { from: 'SGN', to: 'HAN', month: 3, days: 15, interests: [], add: ['phuquoc'] },
  { from: 'SGN', to: 'HAN', month: 3, days: 15, interests: [], remove: ['hoian', 'hue'] },
  { from: 'SGN', to: 'HAN', start: '2027-01-25', end: '2027-02-12', interests: ['jedzenie'] }
];
function hours(h) { return String(Math.round(h * 4) / 4).replace('.', ',') + ' h'; }
function legText(leg) {
  return leg.segs.map(function (g) { return (g.mode === 'fly' ? '✈ ' : '') + g.from + '→' + g.to; }).join(', ') + ' (' + hours(leg.total) + ')';
}
var out = ['# Raport tras: przegląd silnika', '',
  'Stałe: MOVE_COST ' + MOVE_COST + ', END_LEG_H ' + END_LEG_H + ' h, MAX_LEG_H ' + MAX_LEG_H + ' h, sezon D ' + SEASON_K.D + ' / S ' + SEASON_K.S + ' / Z ' + SEASON_K.Z + '.',
  'Litery sezonu przy nocach: D dobry, S średni, Z zły (X, czyli zamknięte, nie trafia na trasę).', ''];
SCENARIOS.forEach(function (s, n) {
  var st = normSettings(s, PLACES, HUBS), r = planRoute(st, DATA);
  var term = s.start ? s.start + ' – ' + s.end : MONTHS[s.month - 1] + ', ' + s.days + ' dni';
  var extra = (s.add ? ', dodane: ' + s.add.join(', ') : '') + (s.remove ? ', usunięte: ' + s.remove.join(', ') : '');
  out.push('## ' + (n + 1) + '. ' + AIRPORT[s.from] + ' → ' + AIRPORT[s.to] + ', ' + term + ', ' +
    (s.interests.length ? s.interests.join(' + ') : 'po trochu wszystkiego') + ', ' + LEVEL_NAME[st.level] + extra, '');
  if (!r.ok) { out.push('Brak trasy: ' + r.error, ''); return; }
  out.push('| Dni | Miejsce | Noce | Sezon | Dojazd |', '|---|---|---|---|---|');
  var road = r.home.total, flights = 0;
  r.stops.forEach(function (x) {
    out.push('| ' + x.start + '–' + x.end + ' | ' + PLACES[x.id].name + ' | ' + x.n + ' | ' + x.season + ' | ' + legText(x.leg) + ' |');
    road += x.leg.total; flights += x.leg.flights;
  });
  out.push('', 'Dzień ' + r.days + ': wylot, dojazd ' + legText(r.home) + '. Razem w drodze ' + hours(road) + ', lotów krajowych: ' + flights + '.' +
    (r.missing.length ? ' Nie zmieściło się: ' + r.missing.join(', ') + '.' : ''), '');
});
print(out.join('\n'));
