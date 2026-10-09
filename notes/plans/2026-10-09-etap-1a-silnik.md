# Etap 1A: silnik tras — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** silnik, który dla dowolnych ustawień (termin, lotniska, 0–2 zainteresowania, poziom przygody, „Dodaj” i „Usuń”) układa trasę z 12 miejsc pierwowzoru. Każdą kombinację ustawień sprawdza test, a użytkownik przegląda raport przykładowych tras.

**Architektura:** czyste funkcje w `site2/src/engine.js`, dane w trzech plikach: `places.js` (miejsca), `travel.js` (drogi i loty) i `seasons.js` (sezony). `travelGraph` liczy raz najszybsze przejazdy między wszystkimi punktami (algorytm Floyda–Warshalla). `planRoute` wybiera miejsca i liczbę nocy programowaniem dynamicznym wzdłuż osi południe–północ i próbuje obu kierunków. Strony w tym planie nie ruszamy, to zadanie planu 1B.

**Technologie:** JavaScript w stylu ES5 jak w pierwowzorze, bez zależności. Testy w JavaScriptCore (`jsc`), bo na tym Macu nie ma node. Do tego skrypty bash i research przez WebSearch.

**Specyfikacja:** [notes/wizja.md](../wizja.md) (decyzje 1–9 oraz sekcje „Silnik”, „Moduł” i „Miesiąc w danych, nie w tekstach”) i [notes/etapy.md](../etapy.md) (etap 1). Plan 1B (strona na nowym silniku) powstanie po punkcie kontrolnym na końcu tego planu.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Ustawienia:**
  - długość 5–30 dni (`MIN_DAYS = 5`, `MAX_DAYS = 30`), dni liczone od przylotu do wylotu włącznie, czyli noce = dni − 1;
  - lotniska `SGN`, `HAN`, `DAD`, w dowolnym układzie, także to samo w obie strony;
  - zainteresowania `'kultura', 'jedzenie', 'przyroda', 'gory', 'morze'`, wybór 0–2;
  - poziomy 1 (spokojnie), 2 (aktywnie, domyślny), 3 (ekstremalnie).
- **Dzień przylotu i dzień wylotu:** tylko drogą, najwyżej 4 h (`END_LEG_H = 4`). Najdłuższy dzień w drodze to 10 h (`MAX_LEG_H = 10`).
- **Kod:**
  - styl pierwowzoru: `var`, `function`, bez zewnętrznych zależności;
  - `engine.js` bez DOM;
  - komentarze w kodzie po angielsku jak w pierwowzorze, nazwy miejsc w danych po polsku.
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu.
- **Fakty:** każdy czas przejazdu, lot i ocena sezonu ma źródło i datę sprawdzenia w `research/`.
- **Repo będzie publiczne:** bez danych osobowych i bez numerów lotów.
- **Pierwowzór** (`~/Desktop/CLAUDE roboczy plik/vietnam-planner/`) służy tylko do odczytu.
- **Commity:** po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Commity po zadaniach są częścią planu. `git push` tylko za zgodą użytkownika.

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`. Zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne. Do tej pory są w nim tylko notatki.
- **Pierwowzór:**
  - `site2/src/data.js` zawiera dane 12 miejsc i czasy przejazdów (`ROAD`, `FLY`, `TO_AIR`, `ROAD_FROM_HAN`);
  - `research/road-times-2026-10.md` i Aneks B w `notes/audyt-2026-10-09.md` podają źródła tych czasów;
  - `research/facts-2026-10.md` zawiera m.in. rzadki lot Đà Lạt–Đà Nẵng i sezon wypraw w Phong Nha.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Wszystkie pliki ładowane w jednym wywołaniu dzielą zasięg globalny. `print()` wypisuje tekst, a nieobsłużony wyjątek kończy proces kodem różnym od zera.

## Jak działa `planRoute`

1. **Noc ma wartość:** dopasowanie miejsca do wybranych zainteresowań (`placeWeight`) razy sezon tej nocy (`SEASON_K`: D 1, S 0,7, Z 0,35). Każda noc ponad „idealną” liczbę jest warta połowę poprzedniej.
2. **Każda przeprowadzka kosztuje** `MOVE_COST` plus koszt dnia w drodze (`legCost`): 0,1 za godzinę i dużo więcej za każdą godzinę ponad 5.
3. **Trasa idzie wzdłuż osi** (`axis`) w jedną stronę, więc żadne miejsce się nie powtarza. Silnik próbuje obu kierunków i wybiera lepszy wynik.
4. **Miasto lotniska** (`HUBS`):
   - miasto lotniska przylotu może otworzyć trasę poza kolejnością osi;
   - miasto lotniska wylotu może ją w ten sam sposób zamknąć;
   - przy trasie tam i z powrotem jedno miasto może zrobić jedno i drugie, a noce dzieli między dwa pobyty.
5. **Pierwsze i ostatnie miejsce** leżą najwyżej `END_LEG_H` drogą od lotniska.
6. **„Dodaj” i „Usuń”:** „Dodaj” daje miejscu bonus `FORCE_BONUS`, którego nic nie przebije, a „Usuń” wyklucza miejsce. Jeśli dodanego miejsca nie da się zmieścić, trasa wychodzi bez niego, a lista `missing` je wymienia.
7. **Wynik:** `{ ok, days, stops: [{ id, n, start, end, season, leg }], home, missing, score }` albo `{ ok: false, error: 'no_route' }`.

Prototyp na danych roboczych liczy ok. 0,2 ms na trasę. Wszystkie 134 784 kombinacje (16 zestawów zainteresowań × 3 poziomy × 12 miesięcy × 26 długości × 9 par lotnisk) przechodzą w ok. 25 s.

## Doprecyzowania względem wizji

Do zatwierdzenia przez użytkownika na punkcie kontrolnym.

- **Hội An i Huế to dwa miejsca,** a nie jedno „central” jak w pierwowzorze. Przełęcz Hải Vân staje się przejazdem między nimi, więc silnik może wejść na środkowe wybrzeże z obu stron.
- **Zamiast liczenia tagów każde miejsce ma ocenę 0–3** dla każdego z pięciu zainteresowań (`fit`). To prostsze i bardziej przewidywalne. Tagi do opisów, np. „naczelne”, mogą dojść w etapie 2.
- **Dzień przylotu i wylotu tylko drogą,** najwyżej 4 h. Stąd zasada, że miasto lotniska otwiera i zamyka trasę.
- **Noc w Hà Nội w drodze** (`hanoiStop`) zostaje osobnym miejscem. Jak w pierwowzorze dzieli długie przejazdy na północy.
- **Oś to prawie szerokość geograficzna,** z jedną ręczną poprawką: Pù Luông stoi przed Ninh Bình, żeby trasy szły Pù Luông → Ninh Bình → Cát Bà.
- **Stałe startowe** dobrano na danych roboczych: `MOVE_COST` 0,75, sezon 1 / 0,7 / 0,35, noce ponad ideał × 0,5. Przy 15 dniach daje to 5–6 miejsc. Przy `MOVE_COST` 1 wychodziły tylko 4. Stałe stroimy na punkcie kontrolnym.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/engine.js` | stałe i czyste funkcje silnika: przejazdy, ustawienia, wartość pobytu, planowanie |
| `site2/src/places.js` | `PLACES` (dane silnika dla 14 miejsc: 12 z pierwowzoru, Hội An i Huế osobno, noc w Hà Nội w drodze) i `HUBS` (miasto każdego lotniska) |
| `site2/src/travel.js` | `ROADS` i `FLIGHTS` z researchu połączeń |
| `site2/src/seasons.js` | `SEASONS`: 12 liter na miejsce z researchu sezonów |
| `tests/assert.js` | `eq`, `ok`, jak w pierwowzorze |
| `tests/run.sh` | uruchamia testy w JavaScriptCore; `--full` sprawdza wszystkie kombinacje |
| `tests/engine.test.js` | testy jednostkowe na wymyślonej mapie, którą da się sprawdzić ręcznie |
| `tests/data.test.js` | kształt i spójność danych: miejsca, przejazdy, sezony |
| `tests/combos.test.js` | każda kombinacja ustawień na prawdziwych danych, z twardymi regułami |
| `tests/full.js` | `RUN_ALL = true` dla `--full` |
| `tools/report.js`, `tools/report.sh` | raport przykładowych tras w Markdownie do przeglądu |
| `research/polaczenia-2026-10.md` | źródła dróg i lotów |
| `research/sezony-2026-10.md` | źródła sezonów |

Zadania 1–4 budują silnik, a 5–7 dane. Research w zadaniach 6 i 7 (kroki 3) nie zależy od kodu, więc można go zlecić równolegle od początku. Dane i ich testy powstają dopiero po zadaniu 4.

---

### Zadanie 1: Uruchamianie testów i graf przejazdów

**Pliki:**
- Utwórz: `tests/assert.js`, `tests/run.sh`, `tests/engine.test.js`, `site2/src/engine.js`

**Interfejsy:**
- Daje:
  - `AIRPORT_H = 1.5`;
  - `travelGraph(roads, flights)` → `{ nodes, h, road, next, nextRoad, edge }`, gdzie `h[a][b]` to najszybsze godziny od drzwi do drzwi, a `road[a][b]` najszybsze drogą;
  - `legBetween(g, a, b, roadOnly)` → `{ from, to, segs: [{ mode: 'road'|'fly', from, to, h }], flights, total }` albo `null`;
  - `legCost(hours)` → liczba.
- Pomocnicze funkcje testów: `eq`, `ok` (z `assert.js`), `near` i wymyślona mapa `FX_*` (w `engine.test.js`).

- [ ] **Krok 1: Pomocnicze funkcje testów** — utwórz `tests/assert.js` (jak w pierwowzorze):

```js
function eq(a, b, msg) {
  if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error((msg || 'eq') + ': got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b));
}
function ok(c, msg) { if (!c) throw new Error(msg || 'not ok'); }
```

- [ ] **Krok 2: Uruchamianie testów** — utwórz `tests/run.sh`:

```bash
#!/bin/bash
# Runs the engine and data tests in JavaScriptCore (node is not installed on this Mac). Exit 0 = all pass.
#   bash tests/run.sh          every test; the combination test checks every 7th combination
#   bash tests/run.sh --full   the combination test checks every combination (about half a minute)
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
S=site2/src
FILES=""
for f in places.js seasons.js travel.js engine.js; do
  if [ -f "$S/$f" ]; then FILES="$FILES $S/$f"; fi
done
MODE=""
if [ "${1:-}" = "--full" ]; then MODE="tests/full.js"; fi
for t in engine data combos; do
  if [ ! -f "tests/$t.test.js" ]; then continue; fi
  echo "== tests/$t.test.js"
  "$J" $FILES tests/assert.js $MODE "tests/$t.test.js"
done
echo "ALL PASS"
```

- [ ] **Krok 3: Test, który nie przechodzi** — utwórz `tests/engine.test.js`:

```js
/* The engine on a made-up map, small enough to check by hand.
   Places a, b, e, c, d lie south to north (axis 1–4); e needs level 3. Airport XA is next to a, airport XD next to d,
   with one flight between them. b is closed in July. */
var FX_ROADS = [['XA', 'a', 0.5], ['a', 'b', 2], ['b', 'e', 1], ['e', 'c', 1.5], ['b', 'c', 2], ['c', 'd', 2],
  ['d', 'XD', 0.5], ['XA', 'b', 3], ['c', 'XD', 3]];
var FX_FLIGHTS = [['XA', 'XD', 1]];
var FX_HUBS = { XA: 'a', XD: 'd' };
var FX_PLACES = {
  a: { axis: 1, nights: [1, 2, 3], level: 1, fit: { kultura: 3 } },
  b: { axis: 2, nights: [1, 2, 2], level: 1, fit: { przyroda: 3 } },
  e: { axis: 2.5, nights: [1, 1, 2], level: 3, fit: { przyroda: 3, gory: 3 } },
  c: { axis: 3, nights: [2, 2, 3], level: 1, fit: { przyroda: 2, gory: 2 } },
  d: { axis: 4, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3 } }
};
var ALL_D = 'DDDDDDDDDDDD';
var FX_SEASONS = { a: ALL_D, b: 'DDDDDDXDDDDD', e: ALL_D, c: ALL_D, d: ALL_D };
var FX_GRAPH = travelGraph(FX_ROADS, FX_FLIGHTS);
var FX = { places: FX_PLACES, seasons: FX_SEASONS, graph: FX_GRAPH, hubs: FX_HUBS };
function near(a, b, msg) { ok(Math.abs(a - b) < 1e-9, (msg || 'near') + ': got ' + a + ', want ' + b); }

/* ---------- travel ---------- */
// a to d: by road a-b-c-d is 6 h; flying XA→XD is 0.5 + 1 + 1.5 (airports) + 0.5 = 3.5 h
near(FX_GRAPH.h.a.d, 3.5, 'fastest a→d');
near(FX_GRAPH.road.a.d, 6, 'road a→d');
near(FX_GRAPH.road.a.XD, 6.5, 'road a→XD');
var leg = legBetween(FX_GRAPH, 'a', 'd');
eq(leg.segs.map(function (s) { return s.mode + ':' + s.from + '-' + s.to + ':' + s.h; }),
  ['road:a-XA:0.5', 'fly:XA-XD:1', 'road:XD-d:0.5'], 'a→d goes by plane');
eq([leg.flights, leg.total], [1, 3.5], 'a→d flights and total');
var byRoad = legBetween(FX_GRAPH, 'a', 'd', true);
eq(byRoad.segs.map(function (s) { return s.from + '-' + s.to; }), ['a-b', 'b-c', 'c-d'], 'a→d by road');
eq([byRoad.flights, byRoad.total], [0, 6], 'a→d by road: no flights, 6 h');
eq(legBetween(FX_GRAPH, 'a', 'nowhere'), null, 'unknown node');
near(legCost(4), 0.4, 'legCost 4 h');
near(legCost(5), 0.5, 'legCost 5 h');
near(legCost(7), 1.3, 'legCost 7 h: 0.7 + 0.15 × 2²');
print('travel ok');
```

- [ ] **Krok 4: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: travelGraph`

- [ ] **Krok 5: Implementacja** — utwórz `site2/src/engine.js`:

```js
/* Route engine: which places, how many nights and in what order, for one set of settings.
   Pure functions shared by the page and the tests (no DOM). Data: places.js, travel.js, seasons.js. */

/* ---------- travel ---------- */
var AIRPORT_H = 1.5;      // hours at the airports for each flight, as in the December planner

/* All-pairs travel between places and airports (Floyd–Warshall). Roads and flights are two-way; a flight costs
   its hours in the air plus AIRPORT_H. h: fastest door-to-door hours; road: fastest by road only. */
function travelGraph(roads, flights) {
  var nodes = [], seen = {};
  function add(n) { if (!seen[n]) { seen[n] = true; nodes.push(n); } }
  roads.forEach(function (r) { add(r[0]); add(r[1]); });
  flights.forEach(function (f) { add(f[0]); add(f[1]); });
  var h = {}, road = {}, next = {}, nextRoad = {}, edge = {};
  nodes.forEach(function (a) {
    h[a] = {}; road[a] = {}; next[a] = {}; nextRoad[a] = {}; edge[a] = {};
    nodes.forEach(function (b) {
      h[a][b] = road[a][b] = a === b ? 0 : Infinity;
      next[a][b] = nextRoad[a][b] = a === b ? a : null;
    });
  });
  function link(a, b, hours, mode) {
    var w = mode === 'fly' ? hours + AIRPORT_H : hours;
    edge[a][b + '|' + mode] = hours;
    if (mode === 'road' && w < road[a][b]) { road[a][b] = w; nextRoad[a][b] = b; }
    if (w < h[a][b]) { h[a][b] = w; next[a][b] = b; }
  }
  roads.forEach(function (r) { link(r[0], r[1], r[2], 'road'); link(r[1], r[0], r[2], 'road'); });
  flights.forEach(function (f) { link(f[0], f[1], f[2], 'fly'); link(f[1], f[0], f[2], 'fly'); });
  nodes.forEach(function (k) {
    nodes.forEach(function (a) {
      nodes.forEach(function (b) {
        if (h[a][k] + h[k][b] < h[a][b]) { h[a][b] = h[a][k] + h[k][b]; next[a][b] = next[a][k]; }
        if (road[a][k] + road[k][b] < road[a][b]) { road[a][b] = road[a][k] + road[k][b]; nextRoad[a][b] = nextRoad[a][k]; }
      });
    });
  });
  return { nodes: nodes, h: h, road: road, next: next, nextRoad: nextRoad, edge: edge };
}

/* The trip from node a to node b along the fastest path (by road only with roadOnly):
   { from, to, segs: [{ mode: 'road'|'fly', from, to, h }], flights, total }, or null when there is no way. */
function legBetween(g, a, b, roadOnly) {
  var dist = roadOnly ? g.road : g.h, nx = roadOnly ? g.nextRoad : g.next;
  if (!dist[a] || !(dist[a][b] < Infinity)) return null;
  var segs = [], at = a, flights = 0;
  while (at !== b) {
    var to = nx[at][b], road = g.edge[at][to + '|road'], fly = g.edge[at][to + '|fly'];
    var mode = !roadOnly && fly != null && (road == null || fly + AIRPORT_H < road) ? 'fly' : 'road';
    segs.push({ mode: mode, from: at, to: to, h: mode === 'fly' ? fly : road });
    if (mode === 'fly') flights++;
    at = to;
  }
  return { from: a, to: b, segs: segs, flights: flights, total: dist[a][b] };
}

/* What one travel day costs: a little per hour, and much more for every hour past five. */
function legCost(hours) { return 0.1 * hours + 0.15 * Math.pow(Math.max(0, hours - 5), 2); }
```

- [ ] **Krok 6: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `travel ok`, na końcu `ALL PASS`

- [ ] **Krok 7: Commit**

```bash
git add tests/assert.js tests/run.sh tests/engine.test.js site2/src/engine.js
git commit -F - <<'EOF'
Silnik: graf przejazdów (drogi, loty, najszybsza trasa) i testy w JavaScriptCore

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Ustawienia

**Pliki:**
- Zmień: `site2/src/engine.js` (dopisz na końcu), `tests/engine.test.js` (dopisz na końcu)

**Interfejsy:**
- Korzysta z: wymyślonej mapy `FX_*` z zadania 1.
- Daje:
  - `MIN_DAYS = 5`, `MAX_DAYS = 30`, `INTERESTS`, `LEVELS`;
  - `isoDay(iso)` → numer dnia od 1970 albo `null`;
  - `normSettings(s, places, hubs)` → `{ ok: true, from, to, days, start, month, months, interests, level, add, remove }` albo `{ ok: false, error }`, gdzie `error` ∈ `airport`, `date`, `month`, `days`, `interests`, `level`;
  - `months[d − 1]` to miesiąc (0–11) dnia `d`.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/engine.test.js`:

```js
/* ---------- settings ---------- */
function fxSet(s) { return normSettings(s, FX_PLACES, FX_HUBS); }
var s1 = fxSet({ from: 'XA', to: 'XD', month: 3, days: 6 });
eq([s1.ok, s1.days, s1.months, s1.interests, s1.level, s1.add, s1.remove, s1.start, s1.month],
  [true, 6, [2, 2, 2, 2, 2, 2], [], 2, [], [], null, 3], 'month and length');
var s2 = fxSet({ from: 'XA', to: 'XD', start: '2027-01-30', end: '2027-02-03' });
eq([s2.ok, s2.days, s2.months, s2.start], [true, 5, [0, 0, 1, 1, 1], '2027-01-30'], 'dates across a month end');
eq(fxSet({ from: 'XA', to: 'XD', start: '2027-12-29', end: '2028-01-02' }).months, [11, 11, 11, 0, 0], 'dates across a year end');
[
  [{ from: 'ZZ', to: 'XD', month: 3, days: 6 }, 'airport'],
  [{ from: 'XA', to: 'XD', month: 3, days: 4 }, 'days'],
  [{ from: 'XA', to: 'XD', month: 3, days: 31 }, 'days'],
  [{ from: 'XA', to: 'XD', month: 3, days: 6.5 }, 'days'],
  [{ from: 'XA', to: 'XD', month: 13, days: 6 }, 'month'],
  [{ from: 'XA', to: 'XD', days: 6 }, 'month'],
  [{ from: 'XA', to: 'XD', start: '2027-02-30', end: '2027-03-03' }, 'date'],
  [{ from: 'XA', to: 'XD', start: '2027-02-03', end: '2027-02-01' }, 'days'],
  [{ from: 'XA', to: 'XD', month: 3, days: 6, interests: ['kultura', 'morze', 'gory'] }, 'interests'],
  [{ from: 'XA', to: 'XD', month: 3, days: 6, level: 4 }, 'level']
].forEach(function (c) { eq(fxSet(c[0]), { ok: false, error: c[1] }, 'error ' + c[1] + ' for ' + JSON.stringify(c[0])); });
eq(fxSet({ from: 'XA', to: 'XD', month: 3, days: 6, interests: ['morze', 'kultura', 'xyz'] }).interests, ['kultura', 'morze'], 'interests: known ones, in INTERESTS order');
var s3 = fxSet({ from: 'XA', to: 'XD', month: 3, days: 6, add: ['c', 'b', 'zz'], remove: ['b'] });
eq([s3.add, s3.remove], [['c'], ['b']], 'add and remove: known places; remove wins');
eq(isoDay('2027-02-29'), null, 'no 29 February in 2027');
eq(isoDay('2028-02-29') - isoDay('2028-02-28'), 1, '2028 is a leap year');
print('settings ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: normSettings`

- [ ] **Krok 3: Implementacja** — dopisz na końcu `site2/src/engine.js`:

```js
/* ---------- settings ---------- */
var MIN_DAYS = 5, MAX_DAYS = 30;
var INTERESTS = ['kultura', 'jedzenie', 'przyroda', 'gory', 'morze'];
var LEVELS = [1, 2, 3];   // spokojnie, aktywnie, ekstremalnie

/* Day number since 1970 of a YYYY-MM-DD date, or null when it is no real date. */
function isoDay(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  var t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
  return new Date(t).getUTCDate() === +m[3] ? t / 864e5 : null;
}

/* Settings from the page or a link, checked. The term is either start + end dates (YYYY-MM-DD) or month (1–12) + days.
   Returns { ok: true, from, to, days, start, month, months, interests, level, add, remove } or { ok: false, error }.
   months[d - 1] is the month (0–11) of trip day d: day 1 is the arrival day, the last day the flight home. */
function normSettings(s, places, hubs) {
  if (!hubs.hasOwnProperty(s.from) || !hubs.hasOwnProperty(s.to)) return { ok: false, error: 'airport' };
  var out = { ok: true, from: s.from, to: s.to, start: null, month: null, months: [] };
  if (s.start != null) {
    var a = isoDay(s.start), b = isoDay(s.end);
    if (a === null || b === null) return { ok: false, error: 'date' };
    out.start = s.start; out.days = b - a + 1;
    for (var d = 0; d < out.days; d++) out.months.push(new Date((a + d) * 864e5).getUTCMonth());
  } else {
    if (!(s.month >= 1 && s.month <= 12 && s.month % 1 === 0)) return { ok: false, error: 'month' };
    out.month = s.month; out.days = s.days;
    for (var k = 0; k < s.days; k++) out.months.push(s.month - 1);
  }
  if (!(out.days >= MIN_DAYS && out.days <= MAX_DAYS && out.days % 1 === 0)) return { ok: false, error: 'days' };
  var wanted = s.interests || [];
  out.interests = INTERESTS.filter(function (k) { return wanted.indexOf(k) > -1; });
  if (out.interests.length > 2) return { ok: false, error: 'interests' };
  out.level = s.level == null ? 2 : s.level;
  if (LEVELS.indexOf(out.level) < 0) return { ok: false, error: 'level' };
  var known = Object.keys(places).sort();
  out.remove = known.filter(function (id) { return (s.remove || []).indexOf(id) > -1; });
  out.add = known.filter(function (id) { return (s.add || []).indexOf(id) > -1 && out.remove.indexOf(id) < 0; });
  return out;
}
```

- [ ] **Krok 4: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `travel ok`, `settings ok`, `ALL PASS`

- [ ] **Krok 5: Commit**

```bash
git add site2/src/engine.js tests/engine.test.js
git commit -F - <<'EOF'
Silnik: ustawienia (daty albo miesiąc i długość, lotniska, zainteresowania, poziom, Dodaj/Usuń)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Wartość pobytu

**Pliki:**
- Zmień: `site2/src/engine.js` (dopisz na końcu), `tests/engine.test.js` (dopisz na końcu)

**Interfejsy:**
- Korzysta z: `INTERESTS` (zadanie 2).
- Daje:
  - `SEASON_K = { D: 1, S: 0.7, Z: 0.35 }`;
  - `placeWeight(place, interests)` → liczba;
  - `stayValue(place, season, weight, months, first, n, done)` → liczba albo `null`, gdy któraś noc wypada w zamkniętym miesiącu.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/engine.test.js`:

```js
/* ---------- value ---------- */
near(placeWeight(FX_PLACES.a, []), 0.75, 'no interest: mean fit 3/5 × 1.25');
near(placeWeight(FX_PLACES.a, ['kultura']), 3.15, 'one interest: 3 + 0.25 × 0.6');
near(placeWeight(FX_PLACES.a, ['kultura', 'przyroda']), 1.65, 'two interests: (3 + 0) / 2 + 0.15');
var march = [2, 2, 2, 2, 2];
near(stayValue(FX_PLACES.a, ALL_D, 1, march, 1, 3, 0), 2.5, 'third night past the ideal of 2 is worth half');
near(stayValue(FX_PLACES.a, 'DDSDDDDDDDDD', 1, march, 1, 3, 0), 1.75, 'a fair month (S) is worth 0.7');
near(stayValue(FX_PLACES.a, ALL_D, 1, march, 1, 1, 2), 0.5, 'two nights already spent there earlier');
near(stayValue(FX_PLACES.a, 'DSDDDDDDDDDD', 1, [0, 0, 1], 2, 2, 0), 1.7, 'a stay across a month end takes each night\'s month');
eq(stayValue(FX_PLACES.b, FX_SEASONS.b, 1, [6, 6], 1, 2, 0), null, 'closed in July');
print('value ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: placeWeight`

- [ ] **Krok 3: Implementacja** — dopisz na końcu `site2/src/engine.js`:

```js
/* ---------- value ---------- */
var SEASON_K = { D: 1, S: 0.7, Z: 0.35 };   // D good, S fair, Z poor; X (closed) never goes on a route

/* How much one night at a place is worth for the chosen interests (0–2 of INTERESTS), before the season.
   With no interest chosen every interest counts the same ("a bit of everything"). */
function placeWeight(place, interests) {
  var all = 0, chosen = 0;
  INTERESTS.forEach(function (k) { all += place.fit[k] || 0; });
  all /= INTERESTS.length;
  if (!interests.length) return all * 1.25;
  interests.forEach(function (k) { chosen += place.fit[k] || 0; });
  return chosen / interests.length + 0.25 * all;
}

/* A stay of n nights from trip day `first`: weight × season of each night; the nights past the place's ideal are
   worth half as much each. done: nights already spent there earlier in the trip. season: the place's 12-letter
   code, January first. null when a night falls in a closed month (X). */
function stayValue(place, season, weight, months, first, n, done) {
  var v = 0;
  for (var k = 1; k <= n; k++) {
    var s = season.charAt(months[first + k - 2]), all = k + (done || 0);
    if (!SEASON_K[s]) return null;
    v += weight * SEASON_K[s] * (all <= place.nights[1] ? 1 : Math.pow(0.5, all - place.nights[1]));
  }
  return v;
}
```

- [ ] **Krok 4: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `travel ok`, `settings ok`, `value ok`, `ALL PASS`

- [ ] **Krok 5: Commit**

```bash
git add site2/src/engine.js tests/engine.test.js
git commit -F - <<'EOF'
Silnik: wartość pobytu (dopasowanie do zainteresowań, sezon każdej nocy)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Planowanie trasy

**Pliki:**
- Zmień: `site2/src/engine.js` (dopisz na końcu), `tests/engine.test.js` (dopisz na końcu)

**Interfejsy:**
- Korzysta z: `travelGraph`, `legBetween`, `legCost` (zadanie 1), `normSettings` (zadanie 2), `placeWeight`, `stayValue`, `SEASON_K` (zadanie 3).
- Daje:
  - `MAX_LEG_H = 10`, `END_LEG_H = 4`, `MOVE_COST = 0.75`, `FORCE_BONUS = 1000`;
  - `planRoute(st, data)`, gdzie `data = { places, seasons, graph, hubs }` → `{ ok: true, days, stops: [{ id, n, start, end, season, leg }], home, missing, score }` albo `{ ok: false, error: 'no_route' }`.
  - Pierwszy `leg` i `home` są zawsze drogowe.

Oczekiwane trasy w teście policzono ręcznie, np. „przyroda w marcu”: b przez 2 noce (6,3) + c przez 3 noce (2,2 + 2,2 + 1,1) − przylot 2,5 h (0,25) − przejazd b→c (0,75 + 0,2) − wylot 2,5 h (0,25) = 10,35.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/engine.test.js`:

```js
/* ---------- planning ---------- */
function fxPlan(s) {
  var st = fxSet(s);
  ok(st.ok, 'settings ' + JSON.stringify(s));
  return planRoute(st, FX);
}
function brief(r) { return r.ok ? r.stops.map(function (x) { return x.id + x.n; }).join(' ') : r.error; }
var NATURE = { from: 'XA', to: 'XD', month: 3, days: 6, interests: ['przyroda'] };
function with_(extra) { var s = JSON.parse(JSON.stringify(NATURE)); Object.keys(extra).forEach(function (k) { s[k] = extra[k]; }); return s; }

// nature: b 2 nights (6.3) + c 3 nights (2.2 + 2.2 + 1.1) − arrive 2.5 h (0.25) − b→c (0.75 + 0.2) − leave 2.5 h (0.25)
var r1 = fxPlan(NATURE);
eq(brief(r1), 'b2 c3', 'nature in March');
near(r1.score, 10.35, 'nature score');
eq(r1.stops.map(function (s) { return [s.start, s.end, s.season]; }), [[1, 2, 'DD'], [3, 5, 'DDD']], 'days and seasons of the stops');
eq([r1.stops[0].leg.from, r1.stops[0].leg.to, r1.stops[0].leg.flights], ['XA', 'b', 0], 'arrival day: road from the airport');
eq([r1.home.from, r1.home.to, r1.home.flights, r1.home.total], ['c', 'XD', 0, 2.5], 'departure day: road to the airport');
eq(r1.days, 6, 'six days, five nights');
eq(brief(fxPlan(with_({ month: 7 }))), 'a2 c3', 'b is closed in July');
eq(brief(fxPlan(with_({ level: 3 }))), 'b2 e1 c2', 'level 3 opens e');
eq(brief(fxPlan(with_({ interests: ['kultura'] }))), 'a3 d2', 'culture flies from a to d');
eq(brief(fxPlan(with_({ from: 'XD', to: 'XA' }))), 'c3 b2', 'the other way: north to south');
eq(brief(fxPlan(with_({ days: 12 }))), 'a3 b2 c3 d3', 'twelve days use every place at its most');
eq(brief(fxPlan(with_({ start: '2027-06-28', end: '2027-07-03', month: null, days: null }))), 'b2 c3', 'b in June is fine, the July nights go to c');

// add and remove
var r2 = fxPlan(with_({ add: ['a'] }));
eq([brief(r2), r2.missing], ['a1 b2 c2', []], 'an added place goes on the route');
near(r2.score, 8.65, 'the bonus for an added place is not in the score');
var r3 = fxPlan(with_({ month: 7, add: ['b'] }));
eq([brief(r3), r3.missing], ['a2 c3', ['b']], 'a closed place cannot be added: it is listed as missing');
eq(brief(fxPlan(with_({ remove: ['b'] }))), 'a2 c3', 'a removed place stays off');
eq(fxPlan(with_({ remove: ['a', 'b', 'c', 'd', 'e'] })), { ok: false, error: 'no_route' }, 'no places, no route');

// round trips: the airport's city may open and close the trip, splitting its nights
eq(brief(fxPlan({ from: 'XA', to: 'XA', month: 3, days: 6, interests: ['kultura'] })), 'a1 d2 a2', 'round trip: a opens and closes');
eq(brief(fxPlan({ from: 'XA', to: 'XA', month: 3, days: 8, interests: ['przyroda'] })), 'b2 c3 a2', 'round trip: a closes');

// the same settings always give the same trip
eq(JSON.stringify(fxPlan(NATURE)), JSON.stringify(fxPlan(NATURE)), 'same settings, same trip');
print('planning ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: planRoute`

- [ ] **Krok 3: Implementacja** — dopisz na końcu `site2/src/engine.js`:

```js
/* ---------- planning ---------- */
var MAX_LEG_H = 10;       // longest travel day allowed, door to door
var END_LEG_H = 4;        // arrival and departure day: by road only, at most this long to or from the airport
var MOVE_COST = 0.75;     // what each change of place costs, in the units of one good night
var FORCE_BONUS = 1000;   // a place added by hand outweighs everything else

/* The best trip for checked settings (normSettings). data: { places, seasons, graph, hubs }.
   A trip sweeps the country one way along the places' axis (south→north and north→south are both tried),
   so no place comes twice. The arrival airport's city (hubs) may open the trip and the departure airport's
   city may close it, both out of the axis order; on a round trip the one city may do both, splitting its nights.
   The first place lies within END_LEG_H by road of the arrival airport, the last within END_LEG_H of the
   departure airport. Returns { ok: true, days, stops: [{ id, n, start, end, season, leg }], home, missing, score }
   or { ok: false, error: 'no_route' }. */
function planRoute(st, data) {
  var P = data.places, G = data.graph, N = st.days - 1;
  var hubA = data.hubs[st.from], hubB = data.hubs[st.to];
  var ids = Object.keys(P).sort();
  var usable = {}, weight = {}, bonus = {}, table = {};
  ids.forEach(function (id) {
    usable[id] = st.remove.indexOf(id) < 0 && P[id].level <= st.level;
    if (!usable[id]) return;
    weight[id] = placeWeight(P[id], st.interests);
    bonus[id] = st.add.indexOf(id) > -1 ? FORCE_BONUS : 0;
    table[id] = [];   // table[id][first][n]: value of n nights from trip day `first`
    for (var first = 1; first <= N; first++) {
      table[id][first] = [];
      for (var n = P[id].nights[0]; n <= P[id].nights[2] && first + n - 1 <= N; n++) {
        var v = stayValue(P[id], data.seasons[id], weight[id], st.months, first, n, 0);
        table[id][first][n] = v === null ? null : v + bonus[id];
      }
    }
  });
  function val(id, first, n) { var r = table[id][first] && table[id][first][n]; return r == null ? null : r; }
  function node(id) { return P[id].node || id; }
  function hop(a, b) {   // cost of moving between two places, or null when it is no real move or too long
    if (node(a) === node(b)) return null;
    var h = G.h[node(a)][node(b)];
    return h <= MAX_LEG_H ? MOVE_COST + legCost(h) : null;
  }
  function arrive(id) { var h = G.road[st.from][node(id)]; return h <= END_LEG_H ? legCost(h) : null; }
  function depart(id) { var h = G.road[node(id)][st.to]; return h <= END_LEG_H ? legCost(h) : null; }
  function nightsOf(id) { var out = []; for (var n = P[id].nights[0]; n <= P[id].nights[2]; n++) out.push(n); return out; }

  /* One sweep. first: the city opening the trip out of order, or null; last: the city closing it, or null;
     n1: on a round trip with first === last, the nights of the first visit (the second gets what is left). */
  function sweep(dir, first, last, n1) {
    var order = ids.filter(function (id) { return usable[id] && id !== hubA && id !== hubB; })
      .sort(function (a, b) { return P[a].axis - P[b].axis || (a < b ? -1 : 1); });
    if (dir === 'NS') order.reverse();
    var m = order.length, score = [], back = [], i, j, t, k;
    for (i = 0; i < m; i++) { score.push([]); back.push([]); for (t = 0; t <= N; t++) { score[i].push(-Infinity); back[i].push(null); } }
    var open = [];   // open[k]: value of k nights in the opening city, arrival included
    if (first && arrive(first) !== null) nightsOf(first).forEach(function (k) {
      var g = val(first, 1, k);
      if (g !== null && (!n1 || k === n1)) open[k] = g - arrive(first);
    });
    function better(i, t, v, how) { if (v > score[i][t] + 1e-9) { score[i][t] = v; back[i][t] = how; } }
    for (j = 0; j < m; j++) {
      var id = order[j], nj = nightsOf(id), aj = arrive(id), hj = first ? hop(first, id) : null;
      nj.forEach(function (n) {
        var g1 = val(id, 1, n);
        if (aj !== null && g1 !== null) better(j, n, g1 - aj, { kind: 'start' });
        if (hj !== null) open.forEach(function (ov, k) {
          var g = val(id, k + 1, n);
          if (g !== null) better(j, k + n, ov + g - hj, { kind: 'open', k: k });
        });
      });
      for (i = 0; i < j; i++) {
        var c = hop(order[i], id);
        if (c === null) continue;
        for (t = 1; t < N; t++) {
          if (score[i][t] === -Infinity) continue;
          for (k = 0; k < nj.length; k++) {
            var g2 = val(id, t + 1, nj[k]);
            if (g2 !== null) better(j, t + nj[k], score[i][t] + g2 - c, { kind: 'stop', i: i, t: t });
          }
        }
      }
    }
    // value of the closing city for nights t+1..N, or null
    function close(t) {
      var n2 = N - t, done = n1 && first === last ? n1 : 0;
      if (n2 < P[last].nights[0] || n2 + done > P[last].nights[2] || depart(last) === null) return null;
      var v = stayValue(P[last], data.seasons[last], weight[last], st.months, t + 1, n2, done);
      return v === null ? null : v + (done ? 0 : bonus[last]) - depart(last);
    }
    var best = null;
    function end(v, how) { if (!best || v > best.score + 1e-9) best = { score: v, how: how }; }
    for (i = 0; i < m; i++) {
      if (score[i][N] > -Infinity && depart(order[i]) !== null) end(score[i][N] - depart(order[i]), { i: i, t: N });
      var cl = last ? hop(order[i], last) : null;
      if (cl !== null) for (t = 1; t < N; t++) {
        if (score[i][t] === -Infinity) continue;
        var vl = close(t);
        if (vl !== null) end(score[i][t] + vl - cl, { i: i, t: t, last: N - t });
      }
    }
    open.forEach(function (ov, k) {
      if (k === N && depart(first) !== null) end(ov - depart(first), { open: k });
      var c1 = last && k < N ? hop(first, last) : null, v1 = c1 !== null ? close(k) : null;
      if (v1 !== null) end(ov + v1 - c1, { open: k, last: N - k });
    });
    if (!best) return null;
    var stops = [], how = best.how;   // walk back to the list of stops
    if (how.last) stops.push({ id: last, n: how.last });
    if (how.open) stops.unshift({ id: first, n: how.open });
    else {
      i = how.i; t = how.t;
      while (true) {
        var b = back[i][t], prevT = b.kind === 'stop' ? b.t : b.kind === 'open' ? b.k : 0;
        stops.unshift({ id: order[i], n: t - prevT });
        if (b.kind === 'open') { stops.unshift({ id: first, n: b.k }); break; }
        if (b.kind === 'start') break;
        i = b.i; t = b.t;
      }
    }
    return { score: best.score, stops: stops };
  }

  var tries = [[hubA, hubB, 0]];
  if (hubA === hubB) {
    tries = [[hubA, null, 0], [null, hubB, 0]];
    if (usable[hubA]) nightsOf(hubA).forEach(function (k) { tries.push([hubA, hubB, k]); });
  }
  var best = null;
  ['SN', 'NS'].forEach(function (dir) {
    tries.forEach(function (x) {
      var r = sweep(dir, x[0] && usable[x[0]] ? x[0] : null, x[1] && usable[x[1]] ? x[1] : null, x[2]);
      if (r && (!best || r.score > best.score + 1e-9)) best = r;
    });
  });
  if (!best) return { ok: false, error: 'no_route' };

  var day = 1, prev = null, out = [];
  best.stops.forEach(function (s) {
    var season = '';
    for (var x = 0; x < s.n; x++) season += data.seasons[s.id].charAt(st.months[day - 1 + x]);
    out.push({ id: s.id, n: s.n, start: day, end: day + s.n - 1, season: season,
      leg: prev === null ? legBetween(G, st.from, node(s.id), true) : legBetween(G, node(prev), node(s.id), false) });
    day += s.n; prev = s.id;
  });
  var here = {};
  out.forEach(function (s) { here[s.id] = true; });
  var missing = st.add.filter(function (id) { return !here[id]; });
  return { ok: true, days: st.days, stops: out, home: legBetween(G, node(prev), st.to, true), missing: missing,
    score: best.score - FORCE_BONUS * (st.add.length - missing.length) };
}
```

- [ ] **Krok 4: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `travel ok`, `settings ok`, `value ok`, `planning ok`, `ALL PASS`

- [ ] **Krok 5: Commit**

```bash
git add site2/src/engine.js tests/engine.test.js
git commit -F - <<'EOF'
Silnik: planowanie trasy (oś południe–północ, miasta lotnisk, Dodaj/Usuń, trasy tam i z powrotem)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Dane miejsc

**Pliki:**
- Utwórz: `site2/src/places.js`, `tests/data.test.js`

**Interfejsy:**
- Korzysta z: `INTERESTS`, `LEVELS` (zadanie 2).
- Daje:
  - `PLACES` (`id → { name, axis, nights: [min, ideal, max], level, fit, node? }`);
  - `HUBS` (`kod lotniska → id miasta`);
  - `dataCheck(label, body)` w `tests/data.test.js`, z którego korzystają zadania 6 i 7.

Wartości to propozycja redakcyjna do przejrzenia na punkcie kontrolnym:
- **Noce:** maksimum to liczba planów dnia, które miejsce ma albo dostanie w planie 1B. Minimum 1 tylko tam, gdzie pierwowzór ma wersję na jedną noc (`solo`) albo to miasto lotniska.
- **Hội An i Huế:** `hoian` [1, 2, 2] i `hue` [1, 2, 3] powstają z czterech dni „central”.

- [ ] **Krok 1: Test, który nie przechodzi** — utwórz `tests/data.test.js`:

```js
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
    need(Array.isArray(p.nights) && p.nights.length === 3 && p.nights[0] >= 1 &&
      p.nights[0] <= p.nights[1] && p.nights[1] <= p.nights[2] && p.nights[2] <= 6, id + ': nights [min, ideal, max] with 1 ≤ min ≤ ideal ≤ max ≤ 6');
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
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: PLACES`

- [ ] **Krok 3: Dane** — utwórz `site2/src/places.js`:

```js
/* The places (modules) the engine plans with: only what the engine needs. Texts and photos come with plan 1B.
   name: short Polish name. axis: position on the south–north line that trips sweep along, close to the latitude
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà). nights: [min, ideal, max]; the
   minimum is 1 only where a one-night plan exists. level: the lowest adventure level the place is offered at
   (1 spokojnie, 2 aktywnie, 3 ekstremalnie). fit: 0–3 for each interest. node: the travel point it shares with
   another place (hanoiStop is a night in Hà Nội on the way, between two other places). */
var PLACES = {
  saigon:    { name: 'Hồ Chí Minh City', axis: 10.78, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  mekong:    { name: 'Delta Mekongu', axis: 10.03, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  phuquoc:   { name: 'Phú Quốc', axis: 10.33, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 1, gory: 0, morze: 3 } },
  cattien:   { name: 'Cát Tiên', axis: 11.43, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
  dalat:     { name: 'Đà Lạt', axis: 11.94, nights: [2, 3, 4], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 2, gory: 2, morze: 0 } },
  hoian:     { name: 'Hội An', axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
  hue:       { name: 'Huế', axis: 16.46, nights: [1, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
  puluong:   { name: 'Pù Luông', axis: 20.2, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  ninhbinh:  { name: 'Ninh Bình', axis: 20.3, nights: [1, 2, 2], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  catba:     { name: 'Cát Bà', axis: 20.73, nights: [3, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 2, gory: 1, morze: 2 } },
  hanoi:     { name: 'Hà Nội', axis: 21.03, nights: [1, 2, 4], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 0 } },
  hanoiStop: { name: 'Hà Nội (noc w drodze)', axis: 21.03, node: 'hanoi', nights: [1, 1, 1], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 0, gory: 0, morze: 0 } },
  babe:      { name: 'Ba Bể', axis: 22.41, nights: [1, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  caobang:   { name: 'Cao Bằng', axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } }
};
/* The city each international airport opens and closes trips with. */
var HUBS = { SGN: 'saigon', HAN: 'hanoi', DAD: 'hoian' };
```

- [ ] **Krok 4: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `places ok`, `ALL PASS`

- [ ] **Krok 5: Commit**

```bash
git add site2/src/places.js tests/data.test.js
git commit -F - <<'EOF'
Dane: 14 miejsc dla silnika (oś, noce, poziom, dopasowanie do zainteresowań) i miasta lotnisk

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Połączenia (research i dane)

**Pliki:**
- Utwórz: `research/polaczenia-2026-10.md`, `site2/src/travel.js`
- Zmień: `tests/data.test.js` (dopisz na końcu)

**Interfejsy:**
- Korzysta z: `PLACES`, `HUBS`, `dataCheck` (zadanie 5), `travelGraph`, `END_LEG_H`, `MAX_LEG_H` (zadania 1 i 4).
- Daje: `ROADS` (`[a, b, godziny]`, dwukierunkowo) i `FLIGHTS` (`[a, b, godziny w powietrzu]`, dwukierunkowo).

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/data.test.js`:

```js
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
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: ROADS`

- [ ] **Krok 3: Research połączeń** — utwórz `research/polaczenia-2026-10.md`.

Zasady:
- **Każdy wiersz ma wartość, źródło (URL) i datę sprawdzenia.** Szukaj przez WebSearch, w trybie „standard”, a przy słabych wynikach „extended”.
- **Najpierw przenieś wartości, które mają już źródło w pierwowzorze:** z `research/road-times-2026-10.md` i z Aneksu B w `notes/audyt-2026-10-09.md`.
- **Drogi:** czas od drzwi do drzwi prywatnym samochodem albo minibusem typu limousine, zaokrąglony do 0,25 h. Bierz czas typowy, nie najbardziej optymistyczny.
- **Loty:** tylko bezpośrednie połączenia obsługiwane w rozkładzie zima 2026/27 przez Vietnam Airlines, Vietjet, Bamboo Airways albo Vietravel Airlines. Podaj typowy czas w powietrzu z rozkładu i przewoźników, bez numerów lotów. Lot, którego nie ma, usuń. Đà Lạt–Đà Nẵng jest rzadki (`research/facts-2026-10.md` w pierwowzorze), więc zanotuj częstotliwość.
- **Dodatkowe lotniska (opcjonalnie):** sprawdź Cát Bi (HPH, przy Cát Bà) i Thọ Xuân (THD, przy Pù Luông i Ninh Bình). Dodaj je tylko wtedy, gdy mają bezpośrednie loty z SGN albo DAD, a dojazd do miejsca zajmuje najwyżej 3 h. Wtedy dopisz drogi HPH–catba, THD–puluong i THD–ninhbinh oraz loty.

Format pliku:

```markdown
# Połączenia: drogi i loty krajowe (sprawdzone DD.MM.2026)

Dane do `site2/src/travel.js`. Drogi: godziny od drzwi do drzwi. Loty: czas w powietrzu, silnik dolicza 1,5 h na lotniskach.

## Drogi

| Odcinek | Godziny | Źródło (data) |
|---|---|---|
| SGN – saigon | 0,5 | Vietnam Airlines, przewodnik po lotnisku: 15–30 min (pierwowzór, 9.10.2026) |

## Loty bezpośrednie

| Trasa | W powietrzu | Przewoźnicy, częstotliwość | Źródło (data) |
|---|---|---|---|
```

Odcinki do sprawdzenia. W nawiasie wartość startowa; „ma źródło” oznacza, że źródło jest już w pierwowzorze.
- **Południe:**
  - SGN–saigon (0,5, ma źródło);
  - SGN–mekong (3,5) i saigon–mekong (3,5);
  - SGN–cattien (4) i saigon–cattien (4);
  - cattien–dalat (4,5);
  - VCA–mekong (0,75);
  - PQC–phuquoc (0,75, ma szacunek);
  - DLI–dalat (0,75, ma źródło).
- **Centrum:** DAD–hoian (0,75), DAD–hue (2,5), HUI–hue (0,5, ma źródło), hoian–hue (3, przez przełęcz Hải Vân z postojami).
- **Północ:**
  - HAN–hanoi (0,75);
  - HAN–ninhbinh (2), HAN–catba (4, ma źródło), HAN–puluong (4), HAN–babe (5), HAN–caobang (6);
  - hanoi–ninhbinh (2), hanoi–catba (4, ma źródło), hanoi–caobang (6,5; w pierwowzorze 6 w jedną stronę i 7 w drugą), hanoi–babe (5), hanoi–puluong (4);
  - puluong–ninhbinh (3, ma źródło), puluong–catba (6);
  - ninhbinh–catba (4, ma źródło), ninhbinh–caobang (8), ninhbinh–babe (7);
  - catba–caobang (9), caobang–babe (5).
- **Loty:** SGN–HAN (2,2), SGN–DAD (1,3), SGN–HUI (1,3), SGN–DLI (0,9), SGN–PQC (1), HAN–DAD (1,3), HAN–HUI (1,2), HAN–DLI (1,8), HAN–PQC (2,1), HAN–VCA (2,2), DAD–DLI (1,1), DAD–VCA (1,5), DAD–PQC (1,6).

- [ ] **Krok 4: Dane** — utwórz `site2/src/travel.js` z wartościami startowymi, a potem popraw każdą wartość, która w researchu wyszła inna. Usuń lot, którego nie ma. Dopisz HPH i THD tylko zgodnie z krokiem 3. Plik jest kopią tabel z researchu, nie odwrotnie.

```js
/* Roads and direct domestic flights. Every value has its source and date in research/polaczenia-2026-10.md.
   ROADS: [a, b, hours door to door], two-way; ends are places or airport codes.
   FLIGHTS: [a, b, hours in the air], two-way; the engine adds AIRPORT_H at the airports for each flight. */
var ROADS = [
  // the south
  ['SGN', 'saigon', 0.5], ['SGN', 'mekong', 3.5], ['saigon', 'mekong', 3.5], ['SGN', 'cattien', 4], ['saigon', 'cattien', 4],
  ['cattien', 'dalat', 4.5], ['VCA', 'mekong', 0.75], ['PQC', 'phuquoc', 0.75], ['DLI', 'dalat', 0.75],
  // the centre
  ['DAD', 'hoian', 0.75], ['DAD', 'hue', 2.5], ['HUI', 'hue', 0.5], ['hoian', 'hue', 3],
  // the north
  ['HAN', 'hanoi', 0.75], ['HAN', 'ninhbinh', 2], ['HAN', 'catba', 4], ['HAN', 'puluong', 4], ['HAN', 'babe', 5], ['HAN', 'caobang', 6],
  ['hanoi', 'ninhbinh', 2], ['hanoi', 'catba', 4], ['hanoi', 'caobang', 6.5], ['hanoi', 'babe', 5], ['hanoi', 'puluong', 4],
  ['puluong', 'ninhbinh', 3], ['puluong', 'catba', 6], ['ninhbinh', 'catba', 4], ['ninhbinh', 'caobang', 8], ['ninhbinh', 'babe', 7],
  ['catba', 'caobang', 9], ['caobang', 'babe', 5]
];
var FLIGHTS = [
  ['SGN', 'HAN', 2.2], ['SGN', 'DAD', 1.3], ['SGN', 'HUI', 1.3], ['SGN', 'DLI', 0.9], ['SGN', 'PQC', 1],
  ['HAN', 'DAD', 1.3], ['HAN', 'HUI', 1.2], ['HAN', 'DLI', 1.8], ['HAN', 'PQC', 2.1], ['HAN', 'VCA', 2.2],
  ['DAD', 'DLI', 1.1], ['DAD', 'VCA', 1.5], ['DAD', 'PQC', 1.6]
];
```

- [ ] **Krok 5: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `places ok`, `travel ok`, `ALL PASS`

- [ ] **Krok 6: Commit**

```bash
git add research/polaczenia-2026-10.md site2/src/travel.js tests/data.test.js
git commit -F - <<'EOF'
Dane: drogi i loty krajowe dla silnika, ze źródłami w research/polaczenia-2026-10.md

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Sezony (research i dane)

**Pliki:**
- Utwórz: `research/sezony-2026-10.md`, `site2/src/seasons.js`
- Zmień: `tests/data.test.js` (dopisz na końcu)

**Interfejsy:**
- Korzysta z: `PLACES`, `dataCheck` (zadanie 5).
- Daje: `SEASONS` (`id → 12 liter od stycznia`). `SEASONS.hanoiStop === SEASONS.hanoi`.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/data.test.js`:

```js
dataCheck('seasons', function (need) {
  Object.keys(PLACES).forEach(function (id) { need(/^[DSZX]{12}$/.test(SEASONS[id] || ''), id + ': season is 12 letters D, S, Z or X'); });
  Object.keys(SEASONS).forEach(function (id) { need(PLACES[id], 'season for an unknown place: ' + id); });
  need(SEASONS.hanoiStop === SEASONS.hanoi, 'a night in Hà Nội on the way has Hà Nội\'s season');
});
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: SEASONS`

- [ ] **Krok 3: Research sezonów** — utwórz `research/sezony-2026-10.md`.

Skala ocen (stosuj ją do wszystkich miejsc tak samo):
- **D, dobry:** pogoda sprzyja temu, po co się tam jedzie. Zwykle mało deszczu i znośna temperatura.
- **S, średni:** jedno wyraźne utrudnienie, ale główne atrakcje działają. Na przykład upał, ulewy po południu, chłód i mgła albo wzburzone morze.
- **Z, zły:** pora tajfunów albo powodzi, ulewy przez większość dni, mróz w górach. Większość atrakcji jest zagrożona.
- **X, zamknięte:** główna atrakcja nie działa, np. wstrzymane rejsy, wyprawy albo zamknięty park. Tylko z oficjalnym źródłem.

Zasady:
- **Oceniaj miejsce za to, po co się tam jedzie według planów dnia w pierwowzorze** (`site2/src/data.js`). Na przykład Cát Bà to rejs po zatoce, plaże i park narodowy, Cao Bằng to Bản Giốc i krajobraz, a Đà Lạt to wędrówki.
- **Liczby klimatyczne:** z tabel klimatycznych Wikipedii opartych na normach wietnamskiego instytutu (jak w pierwowzorze), z World Climate Guide albo Weatherspark.
- **Stacje (stacja zastępcza tam, gdzie brak własnej):**
  - saigon i cattien: Hồ Chí Minh City;
  - mekong: Cần Thơ;
  - phuquoc: Phú Quốc;
  - dalat: Đà Lạt;
  - hoian: Đà Nẵng;
  - hue: Huế;
  - puluong: Hòa Bình;
  - ninhbinh: Thanh Hóa albo Nam Định;
  - catba: Hải Phòng;
  - hanoi: Hà Nội;
  - babe: Bắc Kạn;
  - caobang: Cao Bằng.
- **Poza klimatem sprawdź:**
  - pora tajfunów na północy i w centrum;
  - powodzie w Hội An i Huế;
  - kiedy wstrzymuje się rejsy po Lan Hạ;
  - poziom wody na Bản Giốc;
  - sezony ryżu w Pù Luông;
  - porę deszczową w Cát Tiên (szlaki, pijawki, zamknięcia);
  - stan morza na zachodnim wybrzeżu Phú Quốc;
  - porę wysokiej wody w delcie Mekongu.

Format pliku:
- Na górze tabela zbiorcza z kolumnami: miejsce, kod (12 liter od stycznia).
- Potem dla każdego miejsca tabela z 12 wierszami i kolumnami: miesiąc, ocena, dlaczego (jedno zdanie), temperatura w °C (min–maks), opady (mm, dni z deszczem), źródło (data).

Hipoteza robocza do sprawdzenia, nie do przepisania. Każdy miesiąc musi wynikać ze źródła:
- saigon i mekong: `DDDDSSSSSSSD`
- phuquoc: `DDDDSZZZZSDD`
- cattien: `DDDDSSSZZZSD`
- dalat: `DDDDSSSSSSSD`
- hoian: `SDDDDDDDSZZS`
- hue: `SSDDDDDDSZZZ`
- puluong: `SSDDDDSSDDDS`
- ninhbinh: `SSDDDDSSDDDD`
- catba: `SSSDDDSZZDDS`
- hanoi: `DDDDSSSSSDDD`
- babe: `SSDDDSSSDDDS`
- caobang: `SSDDDSSDDDDS`

- [ ] **Krok 4: Dane** — utwórz `site2/src/seasons.js`. Kody przepisz z tabeli zbiorczej researchu. Poniżej plik z hipotezą: zamień każdy kod, który w researchu wyszedł inaczej.

```js
/* The season of each place, one letter per month from January: D dobry, S średni, Z zły, X zamknięte.
   Reasons, climate figures and sources: research/sezony-2026-10.md. */
var SEASONS = {
  saigon: 'DDDDSSSSSSSD', mekong: 'DDDDSSSSSSSD', phuquoc: 'DDDDSZZZZSDD', cattien: 'DDDDSSSZZZSD', dalat: 'DDDDSSSSSSSD',
  hoian: 'SDDDDDDDSZZS', hue: 'SSDDDDDDSZZZ', puluong: 'SSDDDDSSDDDS', ninhbinh: 'SSDDDDSSDDDD', catba: 'SSSDDDSZZDDS',
  hanoi: 'DDDDSSSSSDDD', babe: 'SSDDDSSSDDDS', caobang: 'SSDDDSSDDDDS'
};
SEASONS.hanoiStop = SEASONS.hanoi;   // a night in Hà Nội on the way
```

- [ ] **Krok 5: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `places ok`, `travel ok`, `seasons ok`, `ALL PASS`

- [ ] **Krok 6: Commit**

```bash
git add research/sezony-2026-10.md site2/src/seasons.js tests/data.test.js
git commit -F - <<'EOF'
Dane: sezon 14 miejsc w 12 miesiącach, ze źródłami w research/sezony-2026-10.md

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: Test wszystkich kombinacji

**Pliki:**
- Utwórz: `tests/combos.test.js`, `tests/full.js`

**Interfejsy:**
- Korzysta z: całego silnika i wszystkich danych.
- Daje: `RUN_ALL` (w `tests/full.js`), czytane przez `tests/combos.test.js`.

**Twarde reguły sprawdzane dla każdej trasy:**
- dni ciągłe;
- liczba nocy w granicach miejsca;
- żadne miejsce dwa razy, poza miastem lotniska na trasie tam i z powrotem: pierwsze i ostatnie, razem w granicach nocy;
- nic dwa razy pod rząd w tym samym punkcie;
- poziom;
- żadnej nocy w zamkniętym miesiącu;
- przejazdy ≤ 10 h;
- dzień przylotu i wylotu tylko drogą, ≤ 4 h;
- suma nocy = dni − 1.

**Co 150. kombinacja dodatkowo sprawdza:**
- powtarzalność (te same ustawienia dają tę samą trasę);
- „Usuń” i „Dodaj” dla każdego miejsca. Brak trasy po usunięciu jest wtedy dozwolony, np. bez Hội An nie da się ułożyć 5 dni z Đà Nẵng i z powrotem.

- [ ] **Krok 1: Test** — utwórz `tests/full.js`:

```js
var RUN_ALL = true;
```

i `tests/combos.test.js`:

```js
/* Every combination a visitor can set, on the real data: 16 sets of interests × 3 levels × 12 months × 26 lengths
   × 9 airport pairs. Each trip is checked against the hard rules. Without --full only every 7th combination runs. */
(function () {
  var all = typeof RUN_ALL !== 'undefined' && RUN_ALL;
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var sets = [[]];
  INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
  var airports = Object.keys(HUBS).sort(), ids = Object.keys(PLACES).sort();
  var count = 0, k = 0, fails = [], used = {};
  function node(id) { return PLACES[id].node || id; }

  // extra: a label for a changed setting; then no route at all is allowed (e.g. the only city near the airport removed)
  function check(s, extra) {
    var name = s.from + '→' + s.to + ' ' + s.days + 'd m' + s.month + ' L' + s.level + ' ' + (s.interests.join('+') || '-') + (extra || '');
    function need(c, what) { if (!c) fails.push(name + ': ' + what); }
    var st = normSettings(s, PLACES, HUBS);
    if (!st.ok) { fails.push(name + ': settings ' + st.error); return null; }
    var r = planRoute(st, DATA);
    if (!r.ok) { if (!extra) fails.push(name + ': ' + r.error); return null; }
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
              if (!r || count % 150) return;
              // now and then: the same settings give the same trip, and every place can be removed or added
              ok(JSON.stringify(planRoute(normSettings(s, PLACES, HUBS), DATA)) === JSON.stringify(r), 'not the same trip twice: ' + JSON.stringify(s));
              ids.forEach(function (id) {
                var rm = check(Object.assign({}, s, { remove: [id] }), ' -' + id);
                if (rm) ok(rm.stops.every(function (x) { return x.id !== id; }), id + ' removed but on the trip: ' + JSON.stringify(s));
                var ad = check(Object.assign({}, s, { add: [id] }), ' +' + id);
                if (ad) ok(ad.missing.length === 0 ? ad.stops.some(function (x) { return x.id === id; }) : ad.missing[0] === id, id + ' added: on the trip or missing: ' + JSON.stringify(s));
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
```

- [ ] **Krok 2: Uruchom szybki przebieg**

Uruchom: `bash tests/run.sh`
Oczekiwane: `combos: 19255 (every 7th; tests/run.sh --full checks all)`, potem linia `places used: …`, w której każde miejsce ma więcej niż 0, potem `combos ok` i `ALL PASS`.

Jeśli jakieś miejsce ma 0, zanotuj to do raportu (zadanie 9). Nie zmieniaj testu.

Jeśli test pokazuje błędy (np. `no_route` albo przejazd ponad 10 h), to zwykle znak, że research zmienił dane, np. brakuje lotu. Opisz problem użytkownikowi z przykładami z listy. Nie osłabiaj reguł testu i nie poprawiaj danych bez źródła.

- [ ] **Krok 3: Sprawdź, że test łapie błąd.** W `site2/src/engine.js` zmień chwilowo `var END_LEG_H = 4;` na `var END_LEG_H = 0.25;`.

Uruchom: `bash tests/run.sh`
Oczekiwane: FAIL, czyli lista problemów i wyjście z kodem różnym od zera. Potem przywróć `var END_LEG_H = 4;`.

- [ ] **Krok 4: Uruchom pełny przebieg**

Uruchom: `bash tests/run.sh --full`
Oczekiwane: `combos: 134784 (all)`, `combos ok`, `ALL PASS` w ok. pół minuty.

- [ ] **Krok 5: Commit**

```bash
git add tests/combos.test.js tests/full.js
git commit -F - <<'EOF'
Testy: każda kombinacja ustawień (134 784) sprawdzana twardymi regułami; --full dla pełnego przebiegu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 9: Raport do przeglądu i punkt kontrolny

**Pliki:**
- Utwórz: `tools/report.js`, `tools/report.sh`, `notes/raport-tras-RRRR-MM-DD.md` (data wykonania)

**Interfejsy:**
- Korzysta z: całego silnika i danych.
- Daje: raport w Markdownie z 16 scenariuszami. Dla każdego jest tabela z kolumnami: dni, miejsce, noce, sezon, dojazd. Pod nią dzień wylotu, łączny czas w drodze i liczba lotów.

- [ ] **Krok 1: Skrypt raportu** — utwórz `tools/report.js`:

```js
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
```

i `tools/report.sh`:

```bash
#!/bin/bash
# Prints sample trips as Markdown for a human review:  bash tools/report.sh > notes/raport-tras-YYYY-MM-DD.md
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
S=site2/src
"$J" $S/places.js $S/seasons.js $S/travel.js $S/engine.js tools/report.js
```

- [ ] **Krok 2: Wygeneruj raport**

Uruchom: `bash tools/report.sh > notes/raport-tras-$(date +%Y-%m-%d).md`
Oczekiwane: plik zaczyna się od `# Raport tras: przegląd silnika` i ma 16 sekcji `## `.

Dopisz na końcu raportu sekcję `## Miejsca na trasach` z linią `places used: …` z zadania 8, krok 2.

- [ ] **Krok 3: Commit**

```bash
git add tools/report.js tools/report.sh notes/raport-tras-*.md
git commit -F - <<'EOF'
Raport przykładowych tras do przeglądu silnika

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 4: STOP — punkt kontrolny z użytkownikiem**

Pokaż użytkownikowi raport i zapytaj o kolejne punkty, po jednym naraz, z rekomendacją:
1. Czy trasy mają sens (kolejność, liczba miejsc, czas w drodze)?
2. Czy dzień przylotu i wylotu najwyżej 4 h drogą to dobra granica?
3. Oceny `fit` i liczba nocy w `places.js`.
4. Doprecyzowania względem wizji, w tym Hội An i Huế jako dwa miejsca oraz oceny 0–3 zamiast tagów.

Każda zmiana stałych albo danych to osobny commit z uruchomieniem `bash tests/run.sh`. Po każdej zmianie wygeneruj raport na nowo.

---

### Zadanie 10: Notatki po przeglądzie

**Pliki:**
- Zmień: `notes/etapy.md`, `CLAUDE.md`

- [ ] **Krok 1: `notes/etapy.md`**
  - w tabeli etapów przy etapie 1 dopisz: „1A (silnik) zrobione RRRR-MM-DD, raport: `notes/raport-tras-…`”;
  - w sekcji „Następny krok” wpisz „plan 1B: strona na nowym silniku” i wymień uwagi z przeglądu, które dotyczą strony.

- [ ] **Krok 2: `CLAUDE.md`** — dopisz sekcję:

```markdown
## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS`. Testy działają w JavaScriptCore, bo node nie ma. Test kombinacji sprawdza co 7. ustawienie; `bash tests/run.sh --full` sprawdza wszystkie (ok. pół minuty).
- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.
```

- [ ] **Krok 3: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`

- [ ] **Krok 4: Commit**

```bash
git add notes/etapy.md CLAUDE.md
git commit -F - <<'EOF'
Notatki: plan 1A (silnik) zrobiony, następny krok plan 1B

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Zarys planu 1B: strona na nowym silniku

Szczegółowy plan 1B powstanie po punkcie kontrolnym.

- **Kopia z pierwowzoru:**
  - `site2/` (`app.js`, `template.html`, `build.py`, `basemap.js`, funkcje pomocnicze z `plan.js`);
  - testy strony (`pl.test.js`, `i18n.test.js`, `shot.sh`, `probe.sh`, `print.sh`);
  - zdjęcia z `photos/` razem z `meta.json`. Licencje 84 zdjęć pierwowzoru już pasują: CC BY, CC BY-SA, CC0 i domena publiczna.
- **Polski jako baza:**
  - treść z `I18N_PL` przenosimy do plików treści miejsc;
  - EN, DE, `ROUTES`, `SWAPS`, `cityNight` i przełącznik „gentle” znikają;
  - mechanizm kluczy i test kompletności zostają.
- **Treść miejsc:**
  - „central” dzielimy na Hội An i Huế;
  - warianty dni według poziomu przygody, z wersją łagodną jako punktem wyjścia;
  - wersje na jedną noc i noc w Hà Nội w drodze;
  - teksty neutralne wobec miesiąca.
- **Tết i święta 2027–2030:** research i dane do ostrzeżeń.
- **`planRoute` w `app.js`:**
  - prosty pasek ustawień (termin, lotniska, zainteresowania, poziom);
  - nowy format linku z ustawieniami;
  - kopiowanie planu.
- **Build i zrzut** na szerokości telefonu.
- **Uwaga do etapu 2:** w pierwowzorze nie ma skryptu `geo/make_basemap.py`, jest tylko jego wynik w `basemap.js`. Nowe kadry mapy wymagają napisania tego skryptu od nowa.
