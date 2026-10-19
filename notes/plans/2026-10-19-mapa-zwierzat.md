# Mapa kraju na podstronie zwierząt — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Zadania mają nagłówki „### Zadanie N:”, a nie „Task N”: wycinaj zadanie od „### Zadanie N:” do następnego „### Zadanie” albo do „## Jak sprawdzać”, nigdy do pierwszego „## ” (kroki mają nagłówki Markdown w blokach kodu).

**Cel:** podstrona zwierząt `…/wietnam/wildlife/` dostaje mapę kraju jak lista „Nie ma na twojej trasie” na stronie z trasą: przyklejoną obok zakładek, z kropkami miejsc, które płynnie zapalają się przy przewijaniu, we wszystkich trzech zakładkach; w „Na trasie” duże zdjęcia, po jednej karcie w rzędzie. Kolejno:
- **pomiary przed planem** (bez commita): sondy podstrony i strony z trasą w obu językach, strony PDF;
- **dane i czyste funkcje mapy:** miejsca gatunków z Galerii bez spotkań (`home`) i punkty poza Route G (`WILD_SPOTS`) według researchu, `speciesPlaces`, `wildMapData`, `midItem`;
- **mapa na podstronie:** obok zakładek od 1101 px, węziej pasmo nad nimi; zapalanie przy przewijaniu, kursorze i klawiaturze; podpis z dniami na trasie; kropka obwodzi swoje karty i przewija do pierwszej; mapa w wydruku;
- **duże karty:** jedna w rzędzie, zdjęcie na szerokość kolumny w kadrze, który nie ucina zwierzęcia; „gdzie” i „kiedy” zwinięte; karty łagodnie wjeżdżają na ekran;
- na końcu punkt kontrolny, końcowy przegląd świeżego recenzenta, publikacja za zgodą i notatki.

**Architektura:**
- **Silnik i strona z trasą bez zmian.** Jedyna zmiana wspólnego kodu: `countryMapAll` w `page.js` przyjmuje `route` równe `null` (podstrona bez trasy: same kropki, bez odcinków i postojów). Lista „Nie ma na twojej trasie” działa jak przed planem (sonda `offroute.js`).
- **Czyste funkcje w `wildpage.js`** (bez DOM, testy w `tests/wild.test.js`): `speciesPlaces(sp)` (miejsca gatunku: jego spotkań, inaczej `home`), `wildMapData(route, stays, guide, spots, m)` (dane mapy: `countryMapAll` z kropkami miejsc przewodnika i punktów poza Route G, z polami `spot` i `trip`), `midItem(boxes, line)` (pozycja na linii środka ekranu, jak `scrollRow` w `app.js`) i `labelSides(lit, gap, width, h)` (strona nazw bliskich miejsc, np. Ninh Bình i Cúc Phương, 8 px od siebie).
- **Dane w `wild.js`:** pole `home` przy 11 gatunkach z Galerii bez spotkań, `WILD_SPOTS` (pięć punktów poza Route G ze współrzędnymi) i `spot` przy wierszach „Poza Route G”; w `wildphotos.js` `WILD_CROPS` (kadry pięciu zdjęć kart). Test treści „wildlife map” porównuje `home` i `WILD_SPOTS` z tabelami researchu.
- **Strona (`wild.html`, `wildapp.js`):** jeden element mapy `#w-map` w `<main class="wrap w-main">` przed `<div class="w-panels">` z trzema zakładkami. Od 1101 px siatka: zakładki do 780 px, mapa obok (do 340 px), przyklejona 16 px od góry; węziej pasmo przyklejone u góry, mapa 180 px wysoka i podpis obok. Zapalanie na zdarzeniu `scroll` (Chrome bez okna nie uruchamia IntersectionObserver, więc sondy to sprawdzają). Łagodne wjeżdżanie kart: klasa `w-pre` na elementach poniżej ekranu przy otwarciu zakładki, zdejmowana na `scroll`.
- `build.py` dokłada do skryptów podstrony `panels.js` (`COUNTRY_MAP`) i `basemap.js` (`OUTLINE`).

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build); Chrome bez okna (sondy, zrzuty, wydruk).

**Specyfikacja:**
- [notes/plans/2026-10-19-mapa-zwierzat-projekt.md](2026-10-19-mapa-zwierzat-projekt.md): opis projektu przyjęty przez użytkownika 19.10.2026 (ustalenia 1–26, odpowiedzi po przeglądzie opisu w ustaleniu 7);
- [research/zwierzeta-2026-10.md](../../research/zwierzeta-2026-10.md), sekcja „Mapa podstrony: miejsca gatunków z Galerii i punkty poza Route G (19.10.2026)”: miejsca 9 gatunków i współrzędne 5 punktów, ze źródłami;
- sucha próba obejrzana przez użytkownika w przeglądarce 19.10.2026 i przyjęta („jest super. tak ma działać”); ten plan odtwarza ją krok po kroku.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS (podstrona bierze tokeny strony z trasą, kolory miejsc `--pal-N`);
  - `page.js` i `wildpage.js` bez DOM; dane wchodzą przez argumenty;
  - komentarze w kodzie po angielsku; teksty dla czytelnika po polsku w `wildui.js`, po angielsku w `en/wildui.js`, z tymi samymi kluczami w tej samej kolejności (test `wildlife interface`).
- **Silnik i strona z trasą bez zmian:** `engine.js`, dane tras, `app.js` i `template.html` się nie zmieniają; sondy `offroute.js` i `wildlink.js` przechodzą jak przed planem.
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, a łącznik bez szerokości `\u2060`, nigdy same znaki. Po każdym zadaniu `grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"` nic nie wypisuje.
- **Grep w planie:** w narzędziu Bash `grep` to nakładka zsh, która pomija pliki binarne i pisze ścieżki bez `./`, a bloki uruchamiane przez `bash -c` biorą `/usr/bin/grep`. Dlatego każdy grep po katalogach ma `-I`.
- **Teksty:** trzy nowe klucze (`w.map.out`, `w.map.none`, `w.map.key`) w obu językach; po polsku do czytelnika per „ty”, bez form rodzajowych; nazwy punktów poza Route G to nazwy własne, takie same w obu językach. Nowe fakty tylko z researchu (sekcja „Mapa podstrony”).
- **Zdjęcia:** bez nowych plików; 27 zdjęć w `photos/wild/` głównej kopii repo (`photos/` nie jest w gicie; w worktree podlinkuj).
- **Ruch:** przy `prefers-reduced-motion: reduce` nic nie wjeżdża i nic nie pulsuje; wydruk pokazuje wszystko.
- **`noindex` zostaje** na obu stronach (`NOINDEX = True` w `site2/build.py`).
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu; pełny test (`--full`) w punkcie kontrolnym. `tests/run.sh` zatrzymuje się na pierwszym pliku testów z błędem, więc krok 2 pokazuje też błąd samego nowego testu przez `jsc.sh` (zadanie 1).
- **Commity:** jeden na zadanie 2–4, pliki po nazwie (`git add <pliki>`), opis po polsku, na końcu `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. `git push` tylko za zgodą użytkownika (zadania 7 i 8).
- **Repo jest publiczne:** do commita nie trafiają dane osobowe ani linki z terminami znajomych.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których mapa najłatwiej zawiedzie odwiedzającego, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Przewijanie na telefonie, pod pasmem z mapą.**
   - Ryzyko: zapala się karta schowana pod pasmem albo pierwsza na stronie, a nie ta, którą widać.
   - Oczekiwane: poniżej 1101 px liczy się środek części ekranu pod pasmem; zanim lista tam dojedzie, pierwsza pozycja, za nią ostatnia.
   - Sprawdzenie: sonda `wildmap.js` przy 320 i 390 px we wszystkich zakładkach (zadanie 3), ręcznie na telefonie w punkcie kontrolnym (zadanie 5, krok 6).
2. **Mysz, palec i klawiatura.**
   - Ryzyko: tknięcie palcem „przykleja” zapalenie do miejsca tknięcia, a przewijanie przestaje zmieniać mapę; kursor nad odstępem między kartami gasi mapę.
   - Oczekiwane: tylko mysz (`pointerType === 'mouse'`) zapala pozycję pod kursorem; poza pozycją i poza zakładkami liczy się środek ekranu; Tab na pozycji zapala ją.
   - Sprawdzenie: sonda `wildmap.js` (mysz na karcie, mysz poza zakładkami), ręcznie na telefonie i klawiaturą (zadanie 5, krok 6).
3. **Gatunek bez miejsca i legenda poza trasą.**
   - Ryzyko: kafelek Troides albo saoli zostawia zapalone miejsca poprzedniego rzędu, a szara kropka legendy zostaje na mapie po przewinięciu dalej.
   - Oczekiwane: rząd samych gatunków bez miejsca gasi kropki i mówi „Bez potwierdzonego miejsca do pokazania na mapie.”; szare punkty widać tylko zapalone.
   - Sprawdzenie: sonda `wildmap.js` w „Galerii” i w „Przewodniku” („Poza Route G”), test treści „wildlife map” (zadanie 2).
4. **Zmiana języka, zakładki i trasy.**
   - Ryzyko: po przełączeniu EN · PL albo zakładki mapa ma stare nazwy, stare zapalenie albo pierścienie innej trasy; karty innej zakładki zostają schowane (`w-pre`).
   - Oczekiwane: `render()` rysuje mapę od nowa, a `showTab()` zapala według nowej zakładki i chowa tylko jej pozycje poniżej ekranu.
   - Sprawdzenie: sondy `wild.js` i `wildmap.js` (przełącznik języka, przejście między zakładkami), ręcznie w punkcie kontrolnym.
5. **Wydruk i „ogranicz ruch”.**
   - Ryzyko: w PDF brakuje kart poniżej pierwszej strony (schowane do wjechania), „gdzie” i „kiedy” zostają zwinięte, mapa zajmuje całą stronę albo duże zdjęcia rozciągają wydruk.
   - Oczekiwane: mapa raz, ok. 70 mm, z nazwami wszystkich miejsc przewodnika; karty po dwie w rzędzie, wszystko rozwinięte; przy „ogranicz ruch” nic nie wjeżdża i nie pulsuje.
   - Sprawdzenie: sonda `wild.js` (wydruk, `beforeprint`), `print.sh` w punkcie kontrolnym (strony i zakryte linie), ręcznie z emulacją „ogranicz ruch”.

## Kontekst dla wykonawcy

- **Gałąź suchej próby `sucha-proba-mapa`** (commity w repo): `e984454` research (na `main` jako osobny commit przed planem), `eb07ec2` zadanie 2, `91e47ad` zadanie 3, `4ee09d5` zadanie 4. Po każdym zadaniu `git diff <commit suchej próby> HEAD -- site2 tests tools` nic nie wypisuje.
- **Mapa strony z trasą, na której wzorowana jest mapa podstrony:** `renderBigMap`, `lightBig`, `scrollRow`, `middleLine`, `bindBigMap` w `site2/src/app.js`; style `.off-big` i `.bm-*` w `site2/src/template.html`. Podstrona ma własną kopię stylów `.bm-*` w `wild.html` (build kopiuje z `template.html` tylko tokeny `:root`).
- **Podstrona:** `site2/src/wild.html` (szablon i style), `wildapp.js` (logika z DOM), `wildpage.js` (czyste funkcje), `wild.js` z `en/wild.js` (dane), `wildphotos.js` z `en/wildphotos.js`, `wildui.js` z `en/wildui.js`; `build.py` buduje `site2/out/pages/wildlife/index.html` (`WILD_SCRIPTS`).
- **Sondy:** `PAGE=wildlife bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<link>'`; ramka 900 px wysokości; Chrome bez okna nie uruchamia IntersectionObserver i przejść CSS nie trzeba w nim czekać (sonda `wildmap.js` wyłącza przejścia).
- **Pułapki:**
  - `tools/licenses.sh` liczy w `wildphotos.js` linie zaczynające się od `  <id>: {`; dlatego wpisy `WILD_CROPS` to tablice (`  duk: ['3 / 2', '50% 5%'],`), a nie obiekty;
  - Côn Đảo jest za małą wyspą na zarys `OUTLINE`, więc jego kropka stoi w morzu (sonda to dopuszcza);
  - `python3 site2/build.py` usuwa `site2/out`, więc nie buduj, gdy w tle działają sondy;
  - wbudowana przeglądarka nie otwiera `file://`: ręczne sprawdzenia przez lokalny serwer (`python3 -m http.server … --directory site2/out/pages` w `.claude/launch.json`, który nie jest w gicie).

## Struktura plików

- Zmień: `site2/src/page.js` (`countryMapAll` bez trasy), `site2/src/wildpage.js` (cztery funkcje), `site2/src/wild.js` (`home`, `WILD_SPOTS`, `spot`), `site2/src/wildphotos.js` (`WILD_CROPS`), `site2/src/wildapp.js` (mapa, zapalanie, karty, wjeżdżanie, wydruk), `site2/src/wild.html` (układ i style), `site2/src/wildui.js` i `site2/src/en/wildui.js` (trzy teksty), `site2/build.py` (`WILD_SCRIPTS`).
- Testy: `tests/wild.test.js`, `tests/page.test.js`, `tests/content.test.js`, `tests/probes/wild.js`; nowa sonda `tests/probes/wildmap.js`.
- Bez zmian: silnik, dane tras, `app.js`, `template.html`, zdjęcia, research (zmieniony w commicie researchu przed planem).

---

### Zadanie 1: Stan przed planem (bez commita)

Sondy podstrony i strony z trasą w obu językach i strony PDF, do porównania w punkcie kontrolnym, oraz pomocniczy `jsc.sh`. Bez commita.

- [ ] **Krok 1: Skrypty i pomiary** (ok. 10 min)

```bash
rm -rf "$TMPDIR/wietnam-mapa"; mkdir -p "$TMPDIR/wietnam-mapa"
cat > "$TMPDIR/wietnam-mapa/sondy.sh" <<'SONDYEOF'
#!/bin/bash
# The probes of the plan of the map of the wildlife subpage, in one language (pl as the argument: the links with &lang=pl):
# the subpage's own (wild.js, and wildmap.js once task 3 has made it) at 320, 390, 1024, 1400 and 1920 px on a trip in May
# 2027, and in each tab on a trip in February 2027 and without a trip; and, on the page with the route, what the plan
# touches beside it (offroute.js: countryMapAll; wildlink.js: the ways into the subpage) at 390 and 1400 px. Prints a line
# for each failure and the count at the end. Run from the repository's folder after python3 site2/build.py, and do not build
# again while it runs.
L=""; [ "${1:-}" = pl ] && L="&lang=pl"
MAY="od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2"
FEB="od=HAN&do=SGN&miesiac=2027-02&dni=21&co=przyroda&poziom=3"
bad=0; n=0
run() {
  n=$((n+1))
  PAGE="$1" bash tests/probe.sh "tests/probes/$2" "$3" "$4" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL ${1:-page} $2 $3 $4"; grep -iE "fail|error|stopped" "$TMPDIR/sonda.txt" | head -5; }
}
for p in wild.js wildmap.js; do
  [ -f "tests/probes/$p" ] || continue
  for w in 320 390 1024 1400 1920; do run wildlife $p $w "route&$MAY$L"; done
  run wildlife $p 390 "gallery$L"; run wildlife $p 1400 "gallery&$FEB$L"; run wildlife $p 1024 "guide$L"; run wildlife $p 1400 "route&$FEB$L"; run wildlife $p 390 "guide-cattien&$FEB$L"
done
for w in 390 1400; do run "" offroute.js $w "od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2$L"; run "" wildlink.js $w "$MAY$L"; done
echo "sondy${1:+ ($1)}: $bad z $n nie przeszło"
SONDYEOF
cat > "$TMPDIR/wietnam-mapa/jsc.sh" <<'JSCEOF'
#!/bin/bash
# One test file in JavaScriptCore with the sources of tests/run.sh, so a red step shows the test's own failure where
# tests/run.sh stops at the first failing file:
#   bash "$TMPDIR/wietnam-mapa/jsc.sh" <test>   (from the repository's folder)
set -uo pipefail
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
CONTENT_FILES=$(ls site2/src/content/*.js)
EN_CONTENT_FILES=$(ls site2/src/en/content/*.js)
eval "$(grep '^SOURCES=' tests/run.sh)"
"$J" $SOURCES tests/assert.js "$1"
JSCEOF
python3 site2/build.py > /dev/null
{ for t in "route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "gallery&lang=pl" "guide"; do
    PAGE=wildlife bash tests/print.sh "$t" "$TMPDIR/wietnam-mapa/przed.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //"; done
  bash tests/print.sh "od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "$TMPDIR/wietnam-mapa/przed.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //"; } > "$TMPDIR/wietnam-mapa/pdf-przed.txt"
bash "$TMPDIR/wietnam-mapa/sondy.sh" > "$TMPDIR/wietnam-mapa/sondy-przed-en.txt" 2>&1
bash "$TMPDIR/wietnam-mapa/sondy.sh" pl > "$TMPDIR/wietnam-mapa/sondy-przed-pl.txt" 2>&1
tail -n 1 "$TMPDIR/wietnam-mapa/sondy-przed-en.txt" "$TMPDIR/wietnam-mapa/sondy-przed-pl.txt"; cut -c1-30 "$TMPDIR/wietnam-mapa/pdf-przed.txt"
```

Oczekiwane: `sondy: 0 z 14 nie przeszło` i `sondy (pl): 0 z 14 nie przeszło`, potem cztery linie PDF (w suchej próbie: „Na trasie” z trasą z maja 16 stron, „Galeria” po polsku 6, „Przewodnik” 8, strona z trasą 14), każda bez stron poniżej 45%.

---

### Zadanie 2: Dane i czyste funkcje mapy

Ustalenie 7 opisu projektu (z odpowiedziami po przeglądzie opisu) i ustalenia 1–3 i 6. Pole `home` przy gatunkach z Galerii bez spotkań, punkty `WILD_SPOTS` i `spot` przy wierszach „Poza Route G”, wszystko według tabel researchu („Mapa podstrony”); `speciesPlaces`, `wildMapData` i `midItem` w `wildpage.js`; `countryMapAll` bez trasy.

**Pliki:**
- Zmień: `site2/src/page.js`, `site2/src/wild.js`, `site2/src/wildpage.js`
- Testy: `tests/content.test.js`, `tests/page.test.js`, `tests/wild.test.js`

**Interfejsy:**
- Daje: `speciesPlaces(sp) → [id]`; `wildMapData(route|null, stays|null, guide:[id], spots:[id], { frame, content, airports, spots }) → { w, h, segs, stays, dots: [{ id, x, y, left, spot, trip }] }`; `midItem([{ top, bottom }], line) → index` (−1 bez pozycji); `WILD_SPOTS = { id: { short, pt: [lat, lon] } }`; `WILD.<id>.home: [id]`; `WILD_OUTSIDE[i].spot`.

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/content.test.js` zamień:

```js
    Object.keys(x).forEach(function (k) { need(['name', 'alt', 'vn', 'lat', 'iucn', 'group', 'route', 'gallery', 'why', 'meet', 'nophoto'].indexOf(k) > -1, w + ': unknown field ' + k); });
```

na:

```js
    Object.keys(x).forEach(function (k) { need(['name', 'alt', 'vn', 'lat', 'iucn', 'group', 'route', 'gallery', 'why', 'meet', 'nophoto', 'home'].indexOf(k) > -1, w + ': unknown field ' + k); });
```

W `tests/content.test.js` zamień:

```js
});

/* Its texts in both languages (finding 19): every text of wild.js and wildphotos.js in English (en/wild.js, en/wildphotos.js),
```

na:

```js
});

/* The places of the map of the subpage (19.10.2026): a home only for a species of the Gallery without encounters, each of its
   places a place of the field guide or a point of WILD_SPOTS, as the table of the research says („Mapa podstrony” in
   research/zwierzeta-2026-10.md); the points inside the map of the country, at the research's coordinates; every place of
   "Poza Route G" with its point; a place on the map for every species of the Gallery but the two the research has none for. */
contentCheck('wildlife map', function (need) {
  var res = readFile('research/zwierzeta-2026-10.md'), sec = res.slice(res.indexOf('## Mapa podstrony'));
  sec = sec.slice(0, sec.indexOf('\n## ', 5));
  var homes = {}, spots = {};
  sec.split('\n').forEach(function (line) {
    var h = /^\| [^|]*\(`(\w+)`[^|]*\) \| ([a-z, ]+|żadne) \|/.exec(line), p = /^\| [^|]*\(`(\w+)`\) \| ([\d,]+) N, ([\d,]+) E \|/.exec(line);
    if (h) homes[h[1]] = h[2] === 'żadne' ? [] : h[2].split(', ');
    if (p) spots[p[1]] = [parseFloat(p[2].replace(',', '.')), parseFloat(p[3].replace(',', '.'))];
  });
  need(Object.keys(homes).length === 9 && Object.keys(spots).length === 5, 'the research: 9 species and 5 points in „Mapa podstrony”, not ' + Object.keys(homes).length + ' and ' + Object.keys(spots).length);
  Object.keys(WILD).forEach(function (id) {
    var x = WILD[id], w = 'WILD.' + id;
    if (x.home === undefined) return;
    need(!x.meet && x.gallery && Array.isArray(x.home) && x.home.length > 0, w + ': home only for a species of the Gallery without encounters, with a place');
    x.home.forEach(function (p) { need(WILD_GUIDE[p] || WILD_SPOTS[p], w + ': ' + p + ' is no place of the field guide and no point of WILD_SPOTS'); });
  });
  Object.keys(homes).forEach(function (id) { need(WILD[id] && JSON.stringify(WILD[id].home || []) === JSON.stringify(homes[id]), 'WILD.' + id + ': home as the research says, ' + JSON.stringify(homes[id])); });
  var f = COUNTRY_MAP;
  need(JSON.stringify(Object.keys(WILD_SPOTS)) === JSON.stringify(Object.keys(spots)), 'WILD_SPOTS: the points of the research, in its order');
  Object.keys(WILD_SPOTS).forEach(function (k) {
    var s = WILD_SPOTS[k];
    need(isText(s.short) && JSON.stringify(s.pt) === JSON.stringify(spots[k]), 'WILD_SPOTS.' + k + ': a name and the research\u2019s coordinates');
    need(s.pt[0] < f.lat0 && s.pt[0] > f.lat1 && s.pt[1] > f.lon0 && s.pt[1] < f.lon1, 'WILD_SPOTS.' + k + ': inside the map of the country');
  });
  need(WILD_OUTSIDE.every(function (o) { return WILD_SPOTS[o.spot] && WILD_SPOTS[o.spot].short === o.name; }), 'WILD_OUTSIDE: each place with its point of WILD_SPOTS, of the same name');
  var none = Object.keys(WILD).filter(function (id) { return WILD[id].gallery && !speciesPlaces(WILD[id]).length; });
  need(JSON.stringify(none) === '["troides","saola"]', 'a place on the map for every species of the Gallery but the golden birdwing and the saola, not ' + none.join(', '));
});

/* Its texts in both languages (finding 19): every text of wild.js and wildphotos.js in English (en/wild.js, en/wildphotos.js),
```

W `tests/page.test.js` zamień:

```js
ok(leftOnes.length > 0 && leftOnes.length < Object.keys(CONTENT).length, 'countryMapAll: some names on the left, most on the right (' + leftOnes.join(', ') + ')');
```

na:

```js
ok(leftOnes.length > 0 && leftOnes.length < Object.keys(CONTENT).length, 'countryMapAll: some names on the left, most on the right (' + leftOnes.join(', ') + ')');
var noTrip = countryMapAll(null, offIds, CM);
eq([noTrip.w, noTrip.h, noTrip.segs, noTrip.stays, noTrip.dots], [all.w, all.h, [], [], all.dots], 'countryMapAll without a trip (the wildlife subpage): the same dots, no legs and no stays');
```

W `tests/wild.test.js` zamień:

```js
print('order ok');
```

na:

```js
print('order ok');

/* ---------- the map of the subpage (19.10.2026) ---------- */
// the places a species lights: its encounters' places once each, else its home; none for the two without a confirmed place
eq([speciesPlaces(WILD.lutungb), speciesPlaces(WILD.niedzwiedz), speciesPlaces(WILD.kukang), speciesPlaces(WILD.rokselana), speciesPlaces(WILD.skamielinowiec), speciesPlaces(WILD.troides), speciesPlaces(WILD.saola)],
  [['ninhbinh', 'cucphuong'], ['cucphuong', 'cattien'], ['cattien', 'cucphuong'], ['khauca'], ['phongnha'], [], []], 'speciesPlaces: the encounters, else the home, else none');
eq(speciesPlaces({ meet: [{ place: 'cattien' }, { place: 'cattien' }, { place: 'yokdon' }], home: ['danang'] }), ['cattien', 'yokdon'], 'speciesPlaces: each place once, the encounters before a home');
var GP = Object.keys(WILD_GUIDE), SPOTS = Object.keys(WILD_SPOTS), MM = { frame: COUNTRY_MAP, content: CONTENT, airports: AIRPORTS, spots: WILD_SPOTS };
var m0 = wildMapData(null, null, GP, SPOTS, MM), m2 = wildMapData(T2.route, T2.stays, GP, SPOTS, MM);
eq([m0.w, m0.h, m0.segs.length, m0.stays.length, m0.dots.map(function (d) { return d.id; })], [340, 667, 0, 0, GP.concat(SPOTS)],
  'wildMapData without a trip: the frame of the country, no legs and no stays, a dot at every place of the guide, then every point beyond Route G');
eq([m0.dots.map(function (d) { return d.spot; }), m0.dots.some(function (d) { return d.trip; })], [GP.map(function () { return false; }).concat(SPOTS.map(function () { return true; })), false],
  'wildMapData: the points beyond Route G marked, no place on a trip without one');
ok(m0.dots.every(function (d) { return d.x > 0 && d.x < m0.w && d.y > 0 && d.y < m0.h; }), 'wildMapData: every dot inside the map');
eq([m2.segs.length > 0, m2.stays.length, m2.dots.filter(function (d) { return d.trip; }).map(function (d) { return d.id; })], [true, T2.route.stops.length, GP.filter(function (p) { return !!T2.stays[p]; })],
  'wildMapData with a trip: its legs and stays, the places on it marked');
var dotOf = function (id) { return m0.dots.filter(function (d) { return d.id === id; })[0]; }, hg = countryMapAll(null, ['hagiang'], MM).dots[0];
ok(dotOf('khauca').x > hg.x && Math.abs(dotOf('khauca').y - hg.y) < 3, 'Khau Ca a little east of Hà Giang, 15–20 km (research, „Mapa podstrony”)');
var B = [{ top: 100, bottom: 200 }, { top: 210, bottom: 300 }, { top: 310, bottom: 400 }];
eq([midItem([], 100), midItem(B, 50), midItem(B, 150), midItem(B, 250), midItem(B, 350), midItem(B, 900)], [-1, 0, 0, 1, 2, 2],
  'midItem: the item across the line, the first while the list is under it, the last once it is above');
print('map ok');
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | grep -m 1 Exception
bash "$TMPDIR/wietnam-mapa/jsc.sh" tests/wild.test.js 2>&1 | grep -m 1 Exception
bash "$TMPDIR/wietnam-mapa/jsc.sh" tests/content.test.js 2>&1 | grep -m 1 "wildlife map"
```

Oczekiwane: `Exception: TypeError: null is not an object (evaluating 'route.stops')` (page.test.js, `countryMapAll` bez trasy), `Exception: ReferenceError: Can't find variable: speciesPlaces` i `  wildlife map: WILD.kukang: home as the research says, ["cattien","cucphuong"]`.

- [ ] **Krok 3: Kod**

W `site2/src/page.js` zamień:

```js
   { w, h, segs, stays: [{ x, y }], dots: [{ id, x, y, left }] }. */
```

na:

```js
   { w, h, segs, stays: [{ x, y }], dots: [{ id, x, y, left }] }. route null (the wildlife subpage without a trip): no legs
   and no stays, only the dots. */
```

W `site2/src/page.js` zamień:

```js
  var f = m.frame, s = f.width / (f.lon1 - f.lon0), base = countryMap(route, ids[0], m);
```

na:

```js
  var f = m.frame, s = f.width / (f.lon1 - f.lon0), base = route ? countryMap(route, ids[0], m) : { w: f.width, h: Math.round((f.lat0 - f.lat1) * s), segs: [] };
```

W `site2/src/page.js` zamień:

```js
    stays: route.stops.map(function (x) { return proj(m.content[x.id].pt); }),
```

na:

```js
    stays: route ? route.stops.map(function (x) { return proj(m.content[x.id].pt); }) : [],
```

W `site2/src/wild.js` zamień:

```js
   text names the encounter, or null.
```

na:

```js
   text names the encounter, or null.
   home (a species of the Gallery only, without meet): the places its tile lights on the map of the subpage, places of the
   field guide or points beyond Route G of WILD_SPOTS; none where the research confirms no place (the map of the subpage,
   research/zwierzeta-2026-10.md, „Mapa podstrony”).
```

W `site2/src/wild.js` zamień:

```js
  kukang: { name: 'Kukang mały', alt: 'lori mały', vn: 'cu li nhỏ', lat: 'Xanthonycticebus pygmaeus', iucn: 'EN', group: 'primates', route: false, gallery: true,
```

na:

```js
  kukang: { name: 'Kukang mały', alt: 'lori mały', vn: 'cu li nhỏ', lat: 'Xanthonycticebus pygmaeus', iucn: 'EN', group: 'primates', route: false, gallery: true, home: ['cattien', 'cucphuong'],
```

W `site2/src/wild.js` zamień:

```js
  niedzwm: { name: 'Niedźwiedź malajski', vn: 'gấu chó', lat: 'Helarctos malayanus', iucn: 'VU', group: 'mammals', route: false, gallery: true,
```

na:

```js
  niedzwm: { name: 'Niedźwiedź malajski', vn: 'gấu chó', lat: 'Helarctos malayanus', iucn: 'VU', group: 'mammals', route: false, gallery: true, home: ['cucphuong', 'cattien'],
```

W `site2/src/wild.js` zamień:

```js
  kurtaczek: { name: 'Kurtaczek prążkowany', vn: 'đuôi cụt bụng vằn', lat: 'Hydrornis elliotii', iucn: 'LC', group: 'birds', route: false, gallery: true,
```

na:

```js
  kurtaczek: { name: 'Kurtaczek prążkowany', vn: 'đuôi cụt bụng vằn', lat: 'Hydrornis elliotii', iucn: 'LC', group: 'birds', route: false, gallery: true, home: ['cattien'],
```

W `site2/src/wild.js` zamień:

```js
  wieloszpon: { name: 'Wieloszpon wietnamski', vn: 'gà tiền mặt đỏ', lat: 'Polyplectron germaini', iucn: 'VU', group: 'birds', route: false, gallery: true,
```

na:

```js
  wieloszpon: { name: 'Wieloszpon wietnamski', vn: 'gà tiền mặt đỏ', lat: 'Polyplectron germaini', iucn: 'VU', group: 'birds', route: false, gallery: true, home: ['cattien'],
```

W `site2/src/wild.js` zamień:

```js
  sedziol: { name: 'Sędzioł czerwonogłowy', vn: 'nuốc bụng đỏ', lat: 'Harpactes erythrocephalus', iucn: 'LC', group: 'birds', route: false, gallery: true,
```

na:

```js
  sedziol: { name: 'Sędzioł czerwonogłowy', vn: 'nuốc bụng đỏ', lat: 'Harpactes erythrocephalus', iucn: 'LC', group: 'birds', route: false, gallery: true, home: ['cucphuong'],
```

W `site2/src/wild.js` zamień:

```js
  dzioborozec: { name: 'Dzioborożec wielki', vn: 'hồng hoàng', lat: 'Buceros bicornis', iucn: 'VU', group: 'birds', route: false, gallery: true,
```

na:

```js
  dzioborozec: { name: 'Dzioborożec wielki', vn: 'hồng hoàng', lat: 'Buceros bicornis', iucn: 'VU', group: 'birds', route: false, gallery: true, home: ['cattien'],
```

W `site2/src/wild.js` zamień:

```js
  zaba: { name: 'Żaba mszysta', vn: 'ếch cây sần Bắc Bộ', lat: 'Theloderma corticale', iucn: 'LC', group: 'reptiles', route: false, gallery: true,
```

na:

```js
  zaba: { name: 'Żaba mszysta', vn: 'ếch cây sần Bắc Bộ', lat: 'Theloderma corticale', iucn: 'LC', group: 'reptiles', route: false, gallery: true, home: ['cucphuong'],
```

W `site2/src/wild.js` zamień:

```js
  rokselana: { name: 'Rokselana zadartonosa', vn: 'voọc mũi hếch', lat: 'Rhinopithecus avunculus', iucn: 'CR', group: 'legends', route: false, gallery: true,
```

na:

```js
  rokselana: { name: 'Rokselana zadartonosa', vn: 'voọc mũi hếch', lat: 'Rhinopithecus avunculus', iucn: 'CR', group: 'legends', route: false, gallery: true, home: ['khauca'],
```

W `site2/src/wild.js` zamień:

```js
  gibbonr: { name: 'Gibboniec reliktowy', alt: 'gibon Cao vit', vn: 'vượn Cao vít', lat: 'Nomascus nasutus', iucn: 'CR', group: 'legends', route: false, gallery: true, nophoto: true,
```

na:

```js
  gibbonr: { name: 'Gibboniec reliktowy', alt: 'gibon Cao vit', vn: 'vượn Cao vít', lat: 'Nomascus nasutus', iucn: 'CR', group: 'legends', route: false, gallery: true, nophoto: true, home: ['trungkhanh'],
```

W `site2/src/wild.js` zamień:

```js
  kisciecann: { name: 'Kiściec annamski', vn: 'gà lôi lam mào trắng', lat: 'Lophura edwardsi', iucn: 'CR', group: 'legends', route: false, gallery: true,
```

na:

```js
  kisciecann: { name: 'Kiściec annamski', vn: 'gà lôi lam mào trắng', lat: 'Lophura edwardsi', iucn: 'CR', group: 'legends', route: false, gallery: true, home: ['bachma'],
```

W `site2/src/wild.js` zamień:

```js
  skamielinowiec: { name: 'Skamielinowiec laotański', vn: 'chuột đá Trường Sơn', lat: 'Laonastes aenigmamus', group: 'legends', route: false, gallery: true,
```

na:

```js
  skamielinowiec: { name: 'Skamielinowiec laotański', vn: 'chuột đá Trường Sơn', lat: 'Laonastes aenigmamus', group: 'legends', route: false, gallery: true, home: ['phongnha'],
```

W `site2/src/wild.js` zamień:

```js
// "Poza Route G": five places, one sentence each, shown after the name and a colon
```

na:

```js
/* The points beyond Route G on the map of the subpage (the map of the subpage, decision 7): where a legend lives and the
   places of "Poza Route G", a grey dot only while lit; short: the name on the map, the same in English; pt: [lat, lon] from
   research/zwierzeta-2026-10.md, „Mapa podstrony”. */
var WILD_SPOTS = {
  khauca: { short: 'Khau Ca', pt: [22.84, 105.12] },
  trungkhanh: { short: 'Trùng Khánh', pt: [22.85, 106.72] },
  bachma: { short: 'Bạch Mã', pt: [16.2, 107.87] },
  condao: { short: 'Côn Đảo', pt: [8.69, 106.63] },
  tramchim: { short: 'Tràm Chim', pt: [10.73, 105.52] }
};

// "Poza Route G": five places, one sentence each, and the point of each on the map (spot, WILD_SPOTS), shown after the name and a colon
```

W `site2/src/wild.js` zamień:

```js
  { name: 'Khau Ca', text: 'rokselany zadartonose, szacunkowo 104–130 w dwóch grupach (koniec 2025); tylko wyprawa z pozwoleniem i 2–3 h marszu, a szansa i tak prawie żadna.' },
  { name: 'Trùng Khánh', text: 'gibbońce reliktowe przy Bản Giốc w Cao Bằng, ok. 74 w 11 grupach; wycieczek do nich nie ma.' },
  { name: 'Bạch Mã', text: '363 gatunki ptaków, kiściec annamski z hodowli wypuszczany do lasu i ok. 6 grup duków; droga na szczyt jest przerwana od X 2025.' },
  { name: 'Côn Đảo', text: 'żółwie zielone składają jaja w IV–X, najwięcej w VI–X; tylko na wycieczce z pracownikami stacji ochrony żółwi, w małych grupach.' },
  { name: 'Tràm Chim', text: 'żurawie indyjskie z Tajlandii w zagrodach do rozrodu (2026); o dzikich źródła milczą, a czy turysta zobaczy ptaki w zagrodach, nie wiadomo.' }
```

na:

```js
  { name: 'Khau Ca', spot: 'khauca', text: 'rokselany zadartonose, szacunkowo 104–130 w dwóch grupach (koniec 2025); tylko wyprawa z pozwoleniem i 2–3 h marszu, a szansa i tak prawie żadna.' },
  { name: 'Trùng Khánh', spot: 'trungkhanh', text: 'gibbońce reliktowe przy Bản Giốc w Cao Bằng, ok. 74 w 11 grupach; wycieczek do nich nie ma.' },
  { name: 'Bạch Mã', spot: 'bachma', text: '363 gatunki ptaków, kiściec annamski z hodowli wypuszczany do lasu i ok. 6 grup duków; droga na szczyt jest przerwana od X 2025.' },
  { name: 'Côn Đảo', spot: 'condao', text: 'żółwie zielone składają jaja w IV–X, najwięcej w VI–X; tylko na wycieczce z pracownikami stacji ochrony żółwi, w małych grupach.' },
  { name: 'Tràm Chim', spot: 'tramchim', text: 'żurawie indyjskie z Tajlandii w zagrodach do rozrodu (2026); o dzikich źródła milczą, a czy turysta zobaczy ptaki w zagrodach, nie wiadomo.' }
```

W `site2/src/wildpage.js` zamień:

```js
}

/* The encounters of the field guide's place p (finding 14): every encounter of a species there, in the order of WILD, then
```

na:

```js
}

/* ---------- the map of the subpage (19.10.2026, notes/plans/2026-10-19-mapa-zwierzat-projekt.md) ---------- */
/* The places a species lights on the map: those of its encounters, in their order, once each, or of its home (a species of
   the Gallery only: places of the field guide or points of WILD_SPOTS); [] for a species without a confirmed place.
   sp: a species of WILD. */
function speciesPlaces(sp) {
  var out = [];
  (sp.meet ? sp.meet.map(function (m) { return m.place; }) : sp.home || []).forEach(function (p) { if (out.indexOf(p) < 0) out.push(p); });
  return out;
}

/* The map beside the tabs: countryMapAll (page.js) with the trip when there is one, a dot at every place of the field guide
   (guide: their ids) and at every point beyond Route G (spots: ids of m.spots, WILD_SPOTS), in that order. Each dot also
   says whether it is a point beyond Route G (spot) and whether its place is on the trip (trip; stays: tripStays, or null
   without a trip). m: { frame, content, airports, spots }; content: the places' texts in the page's language.
   Returns { w, h, segs, stays, dots: [{ id, x, y, left, spot, trip }] }. */
function wildMapData(route, stays, guide, spots, m) {
  var content = {};
  Object.keys(m.content).forEach(function (id) { content[id] = m.content[id]; });
  spots.forEach(function (id) { content[id] = m.spots[id]; });
  var out = countryMapAll(route, guide.concat(spots), { frame: m.frame, content: content, airports: m.airports });
  out.dots.forEach(function (d) { d.spot = spots.indexOf(d.id) > -1; d.trip = !!(stays && stays[d.id]); });
  return out;
}

/* Which item of a list a line across the screen falls on, as the band of the list of the places off the trip lights its
   row (scrollRow in app.js): the first item whose bottom is below the line, so the first while the list is still under
   it and the last once the list is above it; -1 for no items. boxes: [{ top, bottom }] of the items in their order, in px
   of the screen; line: its y. */
function midItem(boxes, line) {
  if (!boxes.length) return -1;
  for (var i = 0; i < boxes.length; i++) if (boxes[i].bottom > line) return i;
  return boxes.length - 1;
}

/* The encounters of the field guide's place p (finding 14): every encounter of a species there, in the order of WILD, then
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
```

Oczekiwane: `ALL PASS`; grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/page.js site2/src/wild.js site2/src/wildpage.js tests/content.test.js tests/page.test.js tests/wild.test.js
git commit -q -F - <<'EOF'
Mapa podstrony zwierząt, dane i czyste funkcje: miejsca gatunków z Galerii bez spotkań (pole home) i pięć punktów poza Route G (WILD_SPOTS, przy wierszach „Poza Route G”) według researchu; speciesPlaces, wildMapData (countryMapAll także bez trasy) i midItem; testy wild.test.js, page.test.js i test treści „wildlife map”, który porównuje dane z tabelą researchu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff eb07ec2 HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 3: Mapa na podstronie

Ustalenia 1–8, 16–18 (mapa i ruch kropek), 21–23 (pasmo i wydruk) i 24 (sonda). Mapa `#w-map` w `wild.html`, rysowanie i zapalanie w `wildapp.js` (`renderMap`, `mapEls`, `elPlaces`, `mapItems`, `light`, `lightNow`), `labelSides` w `wildpage.js`, trzy teksty, skrypty `panels.js` i `basemap.js` w buildzie podstrony; sonda `wildmap.js`.

**Pliki:**
- Zmień: `site2/build.py`, `site2/src/en/wildui.js`, `site2/src/wild.html`, `site2/src/wildapp.js`, `site2/src/wildpage.js`, `site2/src/wildui.js`
- Testy: `tests/probes/wildmap.js`, `tests/wild.test.js`

**Interfejsy:**
- Bierze: `speciesPlaces`, `wildMapData`, `midItem`, `WILD_SPOTS`, `WILD_OUTSIDE[i].spot` (zadanie 2).
- Daje: `labelSides([{ id, x, y, left, w }], gap, width, h) → { id: left }`; w `wildapp.js` `mapEls()` (elementy otwartej zakładki: karty, kafelki albo miejsca i ramki przewodnika), `all(sel)`, `lightNow()` (zadanie 4 dopisuje wjeżdżanie obok nich); klasa `w-out` na ramce „Poza Route G”.

- [ ] **Krok 1: Testy, które nie przechodzą**

Utwórz `tests/probes/wildmap.js`:

```js
/* The map of the wildlife subpage (19.10.2026, notes/plans/2026-10-19-mapa-zwierzat-projekt.md): run with PAGE=wildlife, in
   both languages (&lang=pl at the end), at 390, 1024, 1400 and 1920 px, on a link with a trip and on one without:
     PAGE=wildlife bash tests/probe.sh tests/probes/wildmap.js 1400 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2'
     PAGE=wildlife bash tests/probe.sh tests/probes/wildmap.js 390 'gallery&lang=pl'
   The map beside the tabs from 1101 px, sticky, a band over them below; a dot at every place of the field guide at its point
   on the land, a ring for a place off the trip, the points beyond Route G hidden until lit; in each tab the item across the
   middle of the screen lights its places, with their names (and days on the trip) in the caption: a card with two places,
   a row of the Gallery with a legend's point, a species without a place, a place of the field guide, "Poza Route G"; two
   close names do not cover each other; the mouse on an item lights it, on a dot frames its items, a click on a dot brings
   its first item to the middle; the printout lights every place of the field guide. The pulse and the sticky map while
   scrolling by hand are checked in a browser. */
(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  // no transitions, so a dot is shown or hidden at once (headless Chrome runs them on its own clock)
  var still = document.createElement('style'); still.textContent = '* { transition: none !important; }'; document.head.appendChild(still);
  var W = window.__wild, trip = W.trip(), wide = innerWidth > 1100, map = document.getElementById('w-map'), svg = map.querySelector('svg');
  var GP = Object.keys(WILD_GUIDE), SPOTS = Object.keys(WILD_SPOTS), CE = LANG === 'en' ? CONTENT_EN : CONTENT;
  function flat(t) { return String(t).replace(/[\s\u2060\u00a0]+/g, ' ').trim(); }
  function pts() { return Array.prototype.slice.call(map.querySelectorAll('.bm-pt')); }
  function lit() { return pts().filter(function (g) { return g.classList.contains('on'); }).map(function (g) { return g.getAttribute('data-p'); }).sort().join(' '); }
  function caption() { return Array.prototype.map.call(map.querySelectorAll('.w-map-name'), function (e) { return flat(e.textContent); }).join(' | '); }
  function nameOf(p) { return WILD_SPOTS[p] ? WILD_SPOTS[p].short : CE[p].short; }
  function shown(g) { return +getComputedStyle(g.querySelector('.bm-dot')).opacity > 0.9; }
  function line() { return wide ? innerHeight / 2 : (Math.max(map.getBoundingClientRect().bottom, 0) + innerHeight) / 2; }
  function boxOf(els) {
    var r = els.map(function (e) { return e.getBoundingClientRect(); });
    return { top: Math.min.apply(null, r.map(function (b) { return b.top; })), bottom: Math.max.apply(null, r.map(function (b) { return b.bottom; })) };
  }
  // the item to the middle of the screen (twice: the band sticks only once the page has scrolled), then the page's own
  // scroll handler, a frame later
  function toMiddle(els, then) {
    for (var k = 0; k < 2; k++) { var b = boxOf(els); window.scrollBy(0, (b.top + b.bottom) / 2 - line()); }
    window.dispatchEvent(new Event('scroll'));
    setTimeout(then, 450);   // after the dots' transition of .3 s
  }
  function tab(t, then) { location.hash = document.querySelector('#tab-' + t).getAttribute('href'); setTimeout(then, 300); }
  // the cards or the tiles in the row of the species id, as they stand now, and their species
  function rowOf(id) {
    var el = document.getElementById('sp-' + id), sel = '#p-route .w-card';
    if (!el || !el.checkVisibility()) { el = document.querySelector('#p-gallery [data-view="' + id + '"]').closest('.w-tile'); sel = '#p-gallery .w-tile'; }
    var top = Math.round(el.getBoundingClientRect().top);
    return Array.prototype.filter.call(document.querySelectorAll(sel), function (x) { return Math.abs(Math.round(x.getBoundingClientRect().top) - top) <= 2; });
  }
  function idsOf(row) { return row.map(function (x) { return x.id ? x.id.slice(3) : x.querySelector('[data-view]').getAttribute('data-view'); }); }
  function placesOf(ids) {
    var out = [];
    ids.forEach(function (id) { speciesPlaces(WILD[id]).forEach(function (p) { if (out.indexOf(p) < 0) out.push(p); }); });
    return out.sort().join(' ');
  }

  // the map and its dots
  check('the map hidden from a screen reader', map.getAttribute('aria-hidden') === 'true' && !!svg);
  var panels = document.querySelector('.w-panels').getBoundingClientRect(), mb = map.getBoundingClientRect();
  if (wide) check('wide: the map beside the tabs, sticky 16 px from the top', getComputedStyle(map).position === 'sticky' && getComputedStyle(map).top === '16px' && mb.left >= panels.right + 39,
    Math.round(mb.left) + ' / ' + Math.round(panels.right));
  else check('narrower: the map in a band over the tabs, sticky at the top, 180 px high', getComputedStyle(map).position === 'sticky' && getComputedStyle(map).top === '0px' &&
    map.nextElementSibling === document.querySelector('.w-panels') && getComputedStyle(map).display === 'flex' && Math.round(svg.getBoundingClientRect().height) === 180,
    getComputedStyle(map).display + ', ' + Math.round(svg.getBoundingClientRect().height));
  check('a dot at every place of the field guide, then every point beyond Route G', pts().map(function (g) { return g.getAttribute('data-p'); }).join(' ') === GP.concat(SPOTS).join(' '));
  var s = COUNTRY_MAP.width / (COUNTRY_MAP.lon1 - COUNTRY_MAP.lon0), land = svg.querySelector('.bm-land');
  var off = pts().filter(function (g) {
    var p = g.getAttribute('data-p'), pt = (WILD_SPOTS[p] || CONTENT[p]).pt, q = g.querySelector('.bm-dot'), x = +q.getAttribute('cx'), y = +q.getAttribute('cy');
    var at = Math.abs(x - (pt[1] - COUNTRY_MAP.lon0) * s) < 0.11 && Math.abs(y - (COUNTRY_MAP.lat0 - pt[0]) * s) < 0.11;
    // on the land, or Côn Đảo, an island too small for the outline
    return !at || p !== 'condao' && ![[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]].some(function (v) { return land.isPointInFill(new DOMPoint(x + v[0], y + v[1])); });
  }).map(function (g) { return g.getAttribute('data-p'); });
  check('every dot at its point, on the land (Côn Đảo off the outline)', !off.length, off.join(', '));
  var rings = pts().filter(function (g) { return g.classList.contains('ring'); }).map(function (g) { return g.getAttribute('data-p'); }).join(' ');
  check(trip ? 'a ring for each place of the field guide off the trip' : 'without a trip no rings', rings === (trip ? GP.filter(function (p) { return !trip.stays[p]; }).join(' ') : ''), rings);
  check(trip ? 'the caption says what a ring means' : 'without a trip no key', !!map.querySelector('.w-map-key') === !!trip);
  check('the points beyond Route G hidden while not lit', pts().filter(function (g) { return g.classList.contains('spot') && !g.classList.contains('on'); }).every(function (g) { return !shown(g); }));
  check('no sideways scroll', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);

  // On your route: a card with two places across the middle lights both (with the cards beside it in its row), named in
  // the caption, the days of a place on the trip
  tab('route', function () {
    var row = rowOf('lutungb');
    toMiddle(row, function () {
      check('a card across the middle lights its places', lit() === placesOf(idsOf(row)) && /cucphuong ninhbinh|cucphuong .*ninhbinh/.test(lit()), lit());
      var cp = trip && trip.stays.cucphuong, days = cp ? (cp[0].first === cp[cp.length - 1].last ? WUI[LANG]['w.day'].replace('{n}', cp[0].first) : WUI[LANG]['w.days'].replace('{a}', cp[0].first).replace('{b}', cp[cp.length - 1].last)) : null;
      check('the caption names them, with the days on the trip', caption().indexOf(flat(nameOf('ninhbinh'))) > -1 && caption().indexOf(flat(nameOf('cucphuong')) + (days ? ' · ' + flat(days) : '')) > -1, caption());
      if (wide) {
        var a = map.querySelector('.bm-pt[data-p="cucphuong"] text').getBBox(), b = map.querySelector('.bm-pt[data-p="ninhbinh"] text').getBBox(), vb = svg.viewBox.baseVal;
        check('two close names do not cover each other, inside the map', (a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y) &&
          [a, b].every(function (x) { return x.x >= 0 && x.x + x.width <= vb.width; }), [a, b].map(function (x) { return Math.round(x.x) + '+' + Math.round(x.width); }).join(', '));
      }
      // the mouse on another card lights its row instead; out of the tabs, the middle again
      var other = document.getElementById('sp-gaur'), r;
      other.scrollIntoView({ block: 'start' });
      window.scrollBy(0, -40);
      r = other.getBoundingClientRect();
      var x = r.left + 20, y = Math.max(r.top, map.getBoundingClientRect().bottom, 0) + 20, under = document.elementFromPoint(x, y);
      under.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', clientX: x, clientY: y, bubbles: true }));
      setTimeout(function () {
        check('the mouse on a card lights its places', lit() === placesOf(idsOf(rowOf('gaur'))), lit() + ' / ' + under.className);
        document.querySelector('.w-panels').dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'mouse' }));
        setTimeout(function () {
          var items = Array.prototype.slice.call(document.querySelectorAll('#p-route .w-card')), l = line();
          var mid = items.filter(function (c) { return c.getBoundingClientRect().bottom > l; })[0] || items[items.length - 1];
          check('the mouse out of the tabs: the card across the middle again', lit() === placesOf(idsOf(rowOf(mid.id.slice(3)))), lit() + ' / ' + mid.id);
          // a dot frames the cards of its place; a click on it brings the first of them to the middle and lights it
          var dot = map.querySelector('.bm-pt[data-p="cattien"] .bm-dot');
          dot.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          var framed = Array.prototype.filter.call(document.querySelectorAll('#p-route .w-card'), function (c) { return c.classList.contains('w-lit'); }).map(function (c) { return c.id.slice(3); });
          var want = Object.keys(WILD).filter(function (id) { return WILD[id].route && speciesPlaces(WILD[id]).indexOf('cattien') > -1; });
          check('the mouse on a dot frames the cards of its place', framed.sort().join(' ') === want.sort().join(' '), framed.join(' '));
          map.dispatchEvent(new MouseEvent('mouseleave'));
          check('out of the map no frames', !document.querySelector('.w-lit'));
          window.scrollTo(0, 0);
          dot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          setTimeout(function () {
            var first = Array.prototype.filter.call(document.querySelectorAll('#p-route .w-card'), function (c) { return speciesPlaces(WILD[c.id.slice(3)]).indexOf('cattien') > -1; })[0], b = first.getBoundingClientRect();
            check('a click on a dot: the first card of its place on the screen, lit', b.top < innerHeight && b.bottom > 0 && lit() === placesOf(idsOf(rowOf(first.id.slice(3)))) && lit().indexOf('cattien') > -1,
              first.id + ' ' + Math.round(b.top) + ' / ' + lit());
            // the printout: every place of the field guide lit and named; after it, the middle again
            window.dispatchEvent(new Event('beforeprint'));
            check('the printout: every place of the field guide lit', lit() === GP.slice().sort().join(' '), lit());
            window.dispatchEvent(new Event('afterprint'));
            gallery();
          }, 300);
        }, 250);
      }, 250);
    });
  });

  // the Gallery: a row lights the places of its tiles, a legend its grey point, a species without a place says so
  function gallery() {
    tab('gallery', function () {
      var row = rowOf('rokselana');
      toMiddle(row, function () {
        var ids = idsOf(row);
        check('a row of the Gallery lights the places of its tiles', lit() === placesOf(ids), lit() + ' / ' + ids.join(' '));
        var kc = map.querySelector('.bm-pt[data-p="khauca"]');
        check('a legend: its grey point shown, named beyond Route G', kc.classList.contains('on') && shown(kc) &&
          caption().indexOf('Khau Ca · ' + L({ en: 'beyond Route G', pl: 'poza Route G' })) > -1, caption());
        var tr = rowOf('troides');
        toMiddle(tr, function () {
          var only = idsOf(tr).every(function (id) { return !speciesPlaces(WILD[id]).length; });
          if (only) check('a species without a place: no dot lit, the caption says so', lit() === '' && caption() === L({ en: 'No confirmed place to show on the map.', pl: 'Bez potwierdzonego miejsca do pokazania na mapie.' }), lit() + ' / ' + caption());
          guide();
        });
      });
    });
  }

  // the field guide: a place lights itself, Beyond Route G (Poza Route G) its five points
  function guide() {
    tab('guide', function () {
      toMiddle([document.getElementById('guide-cattien')], function () {
        check('a place of the field guide lights itself', lit() === 'cattien', lit());
        toMiddle([document.querySelector('#p-guide .w-out')], function () {
          check('Beyond Route G lights its five points', lit() === SPOTS.slice().sort().join(' ') && pts().filter(function (g) { return g.classList.contains('spot'); }).every(shown), lit());
          check('no sideways scroll at the end', document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollWidth + ' > ' + innerWidth);
          done();
        });
      });
    });
  }
})();
```

W `tests/wild.test.js` zamień:

```js
print('map ok');
```

na:

```js
print('map ok');
// two close names lit together (a card of Ninh Bình and Cúc Phương, 8 px apart): the eastern keeps its side, the western
// goes left; a name that fits nowhere else keeps its side; names far apart keep theirs
var cpd = dotOf('cucphuong'), nbd = dotOf('ninhbinh'), wOf = function (d) { return { id: d.id, x: d.x, y: d.y, left: d.left, w: textWidth(CONTENT[d.id].short, BIG_NAME_PX) }; };
eq(labelSides([wOf(cpd), wOf(nbd)], BIG_NAME_GAP, m0.w, 18), { ninhbinh: false, cucphuong: true }, 'labelSides: Cúc Phương to the left of Ninh Bình');
eq(labelSides([wOf(cpd), wOf(dotOf('cattien'))], BIG_NAME_GAP, m0.w, 18), { cattien: false, cucphuong: false }, 'labelSides: names far apart keep their sides');
eq(labelSides([{ id: 'a', x: 10, y: 50, left: false, w: 60 }, { id: 'b', x: 20, y: 52, left: false, w: 60 }], 14, 340, 18), { b: false, a: false },
  'labelSides: a name with no room on the other side keeps its own');
print('labels ok');
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | grep -m 1 Exception
```

Oczekiwane: `Exception: ReferenceError: Can't find variable: labelSides`. Sonda `wildmap.js` przejdzie dopiero po kroku 3 (strona jeszcze nie ma mapy).

- [ ] **Krok 3: Kod**

W `site2/build.py` zamień:

```python
                + ["ui.js", "en/ui.js", "page.js", "wildpage.js", "wild.js", "en/wild.js", "wildphotos.js", "en/wildphotos.js", "wildui.js", "en/wildui.js"])
```

na:

```python
                + ["ui.js", "en/ui.js", "panels.js", "page.js", "basemap.js", "wildpage.js", "wild.js", "en/wild.js", "wildphotos.js", "en/wildphotos.js", "wildui.js", "en/wildui.js"])
```

W `site2/src/en/wildui.js` zamień:

```js
  'w.guide.lead': 'What lives at the places of Route G, from south to north: where and when to look, with a guide or without. Birds and smaller animals too.',
```

na:

```js
  'w.guide.lead': 'What lives at the places of Route G, from south to north: where and when to look, with a guide or without. Birds and smaller animals too.',
  'w.map.out': 'beyond Route G', 'w.map.none': 'No confirmed place to show on the map.', 'w.map.key': '● on your route · ○ off it',
```

W `site2/src/wild.html` zamień:

```html
.w-box ul { margin-top: 10px; padding-left: 20px; list-style: disc; display: flex; flex-direction: column; gap: 6px; }

/* the photo viewer */
```

na:

```html
.w-box ul { margin-top: 10px; padding-left: 20px; list-style: disc; display: flex; flex-direction: column; gap: 6px; }

/* The map beside the tabs (19.10.2026): the country with the trip, a dot at every place of the field guide in its colour, a
   ring for a place off the trip, and the points beyond Route G, grey and shown only while lit (wildapp.js). A lit place
   (class on) has its dot bigger, with a pulse around it, and its name; the other dots fade; the caption names the lit places.
   From 1101 px the map stands beside the tabs, sticky; below, a band over them: the map 180 px high on the left, the
   caption beside it. Its rules for the dots come from the map of the list of the places off the trip (template.html). */
.w-map { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; gap: 14px; margin: -8px 0 12px; padding: 6px 0;
  background: var(--paper); border-bottom: 1px solid var(--line); }
.w-map svg { display: block; height: 180px; width: auto; flex: none; overflow: visible; }
.w-map-cap { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.w-map-names { display: flex; flex-direction: column; gap: 2px; font-weight: 600; font-size: 15px; line-height: 1.35; }
.w-map-names:empty { display: none; }
.w-map-name { display: flex; align-items: center; gap: 8px; animation: w-in .3s ease-out; }
.w-map-none { font-weight: 400; color: var(--muted); }
.w-map-key { font-size: 13px; color: var(--muted); }
.w-map .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: var(--c); flex: none; }
.w-map .dot.ring { background: var(--surface); box-shadow: inset 0 0 0 2px var(--c); }
@keyframes w-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@media (min-width: 1101px) {
  .w-main { display: grid; grid-template-columns: minmax(0, 780px) minmax(0, 1fr); gap: 40px; align-items: start; }
  .w-panels { grid-column: 1; grid-row: 1; }
  .w-map { grid-column: 2; grid-row: 1; top: 16px; display: block; margin: 0; padding: 0; background: none; border: 0; }
  .w-map svg { width: 100%; max-width: 340px; height: auto; max-height: calc(100vh - 150px); }
  .w-map-cap { margin-top: 10px; min-height: 48px; }
}
.bm-land { fill: var(--land); stroke: var(--border); stroke-width: 1; stroke-linejoin: round; }
.bm-road { stroke: var(--ink); stroke-width: 1.6; stroke-linecap: round; fill: none; opacity: 0.75; }
.bm-fly { stroke: var(--ink); stroke-width: 1.3; stroke-dasharray: 4 4; fill: none; opacity: 0.75; }
.bm-stay { fill: var(--ink); }
.bm-pt { cursor: pointer; }
.bm-pt .bm-dot { fill: var(--c); stroke: var(--surface); stroke-width: 2; transition: r .3s, opacity .3s; }
.bm-pt.ring .bm-dot { fill: var(--surface); stroke: var(--c); stroke-width: 3; }
.bm-pt .bm-halo { fill: var(--c); opacity: 0; }
.bm-hit { fill: transparent; }
.bm-pt.spot { pointer-events: none; }
.bm-pt.spot .bm-dot { opacity: 0; }
.bm-pt.spot.on .bm-dot { opacity: 1; }
/* the name: 14 px (BIG_NAME_PX in page.js), 14 px from the dot (BIG_NAME_GAP) */
.bm-pt text { font: 600 14px var(--body); fill: var(--ink); paint-order: stroke; stroke: var(--surface); stroke-width: 4px; stroke-linejoin: round; opacity: 0; transition: opacity .3s; pointer-events: none; }
.bm-pt.on .bm-dot { r: 9px; }
.bm-pt.on .bm-halo { animation: bm-pulse 1.6s ease-out infinite; }
.bm-pt.on text { opacity: 1; }
.w-map.any .bm-pt:not(.on) .bm-dot { opacity: 0.45; }
.w-map.any .bm-pt.spot:not(.on) .bm-dot { opacity: 0; }
@keyframes bm-pulse { 0% { r: 9px; opacity: 0.45; } 100% { r: 26px; opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .bm-pt.on .bm-halo { animation: none; r: 16px; opacity: 0.25; } .w-map-name { animation: none; } }
/* the band: the map drawn 180 px high, about 0.27 of its px, so its lines, dots and the place to tap one are drawn bigger
   in its px; the names stand beside the map */
@media (max-width: 1100px) {
  .bm-land { stroke-width: 3; }
  .bm-road { stroke-width: 5; }
  .bm-fly { stroke-width: 4.5; stroke-dasharray: 12 12; }
  .bm-stay { r: 8px; }
  .bm-pt .bm-dot { r: 15px; stroke-width: 5; }
  .bm-pt.ring .bm-dot { stroke-width: 8; }
  .bm-pt.on .bm-dot { r: 26px; }
  .bm-pt.on .bm-halo { animation-name: bm-pulse-band; }
  .bm-hit { r: 40px; }
  .bm-pt text { display: none; }
  @keyframes bm-pulse-band { 0% { r: 26px; opacity: 0.45; } 100% { r: 70px; opacity: 0; } }
}
@media (max-width: 1100px) and (prefers-reduced-motion: reduce) { .bm-pt.on .bm-halo { r: 44px; } }
/* the items a dot on the map frames: the cards, tiles and places of its place */
.w-card, .w-tile, .w-place, .w-box { transition: box-shadow .2s, border-color .2s; }
.w-lit { border-color: var(--ink) !important; box-shadow: 0 0 0 1px var(--ink); }

/* the photo viewer */
```

W `site2/src/wild.html` zamień:

```html
@media print { .w-tabs, .lang-switch, #w-back, .w-addbox, .w-drops, .w-add, .w-viewer { display: none !important; } }
```

na:

```html
@media print {
  .w-tabs, .lang-switch, #w-back, .w-addbox, .w-drops, .w-add, .w-viewer { display: none !important; }
  /* the map once, before the open tab, with every place of the field guide named on it (wildapp.js lights them all) */
  .w-main { display: block; }
  .w-map { position: static; display: flex; align-items: flex-start; gap: 6mm; margin: 0 0 6mm; padding: 0; border: 0; background: none; break-inside: avoid; }
  .w-map svg { width: 70mm; max-width: none; height: auto; max-height: none; }
  .w-map-cap { margin: 0; }
  .w-map-names { display: none; }
  .bm-pt .bm-dot, .bm-pt.on .bm-dot { r: 6px; stroke-width: 2; }
  .bm-pt.ring .bm-dot { stroke-width: 3; }
  .bm-pt .bm-halo { display: none; }
  .bm-pt text { display: inline; }
  .bm-land { stroke-width: 1; }
  .bm-road { stroke-width: 1.6; }
  .bm-fly { stroke-width: 1.3; stroke-dasharray: 4 4; }
  .bm-stay { r: 3px; }
}
```

W `site2/src/wild.html` zamień:

```html
<main class="wrap">
  <section id="p-route" hidden></section>
  <section id="p-gallery" hidden></section>
  <section id="p-guide" hidden></section>
```

na:

```html
<main class="wrap w-main">
  <div class="w-map" id="w-map" aria-hidden="true"></div>
  <div class="w-panels">
    <section id="p-route" hidden></section>
    <section id="p-gallery" hidden></section>
    <section id="p-guide" hidden></section>
  </div>
```

W `site2/src/wildapp.js` zamień:

```js
    h += '<section class="w-box"><h3>' + esc(T('w.outside.h')) + '</h3><ul>' + OUTSIDE.map(function (o) { return '<li><b>' + esc(o.name) + '</b>: ' + esc(tied(o.text)) + '</li>'; }).join('') + '</ul></section>';
```

na:

```js
    h += '<section class="w-box w-out"><h3>' + esc(T('w.outside.h')) + '</h3><ul>' + OUTSIDE.map(function (o) { return '<li><b>' + esc(o.name) + '</b>: ' + esc(tied(o.text)) + '</li>'; }).join('') + '</ul></section>';
```

W `site2/src/wildapp.js` zamień:

```js
    $('#w-back').textContent = T(trip ? 'w.back.trip' : 'w.back.plan');
```

na:

```js
    $('#w-back').textContent = T(trip ? 'w.back.trip' : 'w.back.plan');
    lightNow();
```

W `site2/src/wildapp.js` zamień:

```js
    renderRoute(); renderGallery(); renderGuide(); showTab();
```

na:

```js
    renderRoute(); renderGallery(); renderGuide(); renderMap(); showTab();
```

W `site2/src/wildapp.js` zamień:

```js
  }

  /* ---------- the photo viewer (finding 13): the photo, two sentences, the names and the photo's caption ---------- */
```

na:

```js
  }

  /* ---------- the map beside the tabs (19.10.2026, notes/plans/2026-10-19-mapa-zwierzat-projekt.md) ---------- */
  /* The country with the trip, a dot at every place of the field guide in its colour (a ring for a place off the trip) and
     the points beyond Route G, grey and shown only while lit (wildMapData in wildpage.js). What is lit follows the open tab:
     the item under the mouse, else the item across the middle of the screen (below 1101 px, of the part under the band);
     a card lights its species' places, a row of the Gallery those of its tiles, a place of the field guide itself and
     "Poza Route G" its points. The caption names the lit places, with their days on the trip; a species without a place
     says so. Hidden from a screen reader, which has the same in the tabs. */
  var BAND = window.matchMedia('(max-width: 1100px)'), mapDots = [], mapW = 0, litKey = null, mouse = null, NAME_H = 18;
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function r1(v) { return v.toFixed(1); }
  function curve(a, b) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1, k = 0.16 * len;
    return 'M' + r1(a[0]) + ' ' + r1(a[1]) + ' Q' + r1(mx - dy / len * k) + ' ' + r1(my + dx / len * k) + ' ' + r1(b[0]) + ' ' + r1(b[1]);
  }
  function placeColor(p) { return WILD_SPOTS[p] ? 'var(--muted)' : 'var(--pal-' + VIEW[p].color + ')'; }
  function placeName(p) { return WILD_SPOTS[p] ? WILD_SPOTS[p].short : short(p); }
  function renderMap() {
    var m = wildMapData(trip && trip.route, trip && trip.stays, Object.keys(GD), Object.keys(WILD_SPOTS), { frame: COUNTRY_MAP, content: VIEW, airports: AIRPORTS, spots: WILD_SPOTS });
    mapDots = m.dots; mapW = m.w;
    $('#w-map').innerHTML = '<svg viewBox="0 0 ' + m.w + ' ' + m.h + '"><path class="bm-land" d="' + OUTLINE + '"/>' + m.segs.map(function (g) {
      return g.mode === 'fly' ? '<path class="bm-fly" d="' + curve([g.x1, g.y1], [g.x2, g.y2]) + '"/>'
        : '<line class="bm-road" x1="' + r1(g.x1) + '" y1="' + r1(g.y1) + '" x2="' + r1(g.x2) + '" y2="' + r1(g.y2) + '"/>';
    }).join('') + m.stays.map(function (p) { return '<circle class="bm-stay" cx="' + r1(p.x) + '" cy="' + r1(p.y) + '" r="3"/>'; }).join('') +
      m.dots.map(function (d) {
        var at = 'cx="' + r1(d.x) + '" cy="' + r1(d.y) + '"';
        return '<g class="bm-pt' + (d.spot ? ' spot' : trip && !d.trip ? ' ring' : '') + '" data-p="' + d.id + '" style="--c:' + placeColor(d.id) + '">' +
          '<circle class="bm-halo" ' + at + ' r="9"/><circle class="bm-dot" ' + at + ' r="6"/><text y="' + r1(d.y + 5) + '">' + esc(placeName(d.id)) + '</text>' +
          '<circle class="bm-hit" ' + at + ' r="12"/></g>';
      }).join('') + '</svg><div class="w-map-cap"><p class="w-map-names"></p>' + (trip ? '<p class="w-map-key">' + esc(T('w.map.key')) + '</p>' : '') + '</div>';
    litKey = null;
  }
  // the elements of the open tab that light places: its cards, its tiles or its places and boxes
  function mapEls() { return all(view.tab === 'route' ? '#p-route .w-card' : view.tab === 'gallery' ? '#p-gallery .w-tile' : '#p-guide .w-place, #p-guide .w-box'); }
  // the places of one: a card's or a tile's species, a place of the field guide, the points of "Poza Route G"
  function elPlaces(el) {
    if (view.tab !== 'guide') return speciesPlaces(SP[el.id ? el.id.slice(3) : el.querySelector('[data-view]').getAttribute('data-view')]);
    return el.id ? [el.id.slice(6)] : el.classList.contains('w-out') ? WILD_OUTSIDE.map(function (o) { return o.spot; }) : [];
  }
  /* The items that light places: [{ els, places, none }]; none: only species without a place on the map. The elements in
     rows, as they stand on the screen now: a row of cards or tiles lights the places of all its species. */
  function mapItems() {
    var rows = [];
    mapEls().forEach(function (el) {
      var top = Math.round(el.getBoundingClientRect().top), p = elPlaces(el), row = rows[rows.length - 1];
      if (!row || Math.abs(row.top - top) > 2) rows.push(row = { top: top, els: [], places: [], none: view.tab !== 'guide' });
      row.els.push(el);
      p.forEach(function (x) { if (row.places.indexOf(x) < 0) row.places.push(x); });
      row.none = row.none && !p.length;
    });
    return rows;
  }
  function itemBox(it) {
    var r = it.els.map(function (el) { return el.getBoundingClientRect(); });
    return { top: Math.min.apply(null, r.map(function (b) { return b.top; })), bottom: Math.max.apply(null, r.map(function (b) { return b.bottom; })) };
  }
  // the line an item lights on: the middle of the screen, below 1101 px of the part under the band
  function middleLine() { return BAND.matches ? (Math.max($('#w-map').getBoundingClientRect().bottom, 0) + window.innerHeight) / 2 : window.innerHeight / 2; }
  function light(item) {
    var ids = item ? item.places : [], none = !!(item && item.none), key = ids.join(' ') + (none ? ' none' : '');
    if (key === litKey) return;
    litKey = key;
    var lit = mapDots.filter(function (d) { return ids.indexOf(d.id) > -1; });
    var sides = labelSides(lit.map(function (d) { return { id: d.id, x: d.x, y: d.y, left: d.left, w: textWidth(placeName(d.id), BIG_NAME_PX) }; }), BIG_NAME_GAP, mapW, NAME_H);
    all('#w-map .bm-pt').forEach(function (g) {
      var p = g.getAttribute('data-p'), on = ids.indexOf(p) > -1, d = mapDots.filter(function (x) { return x.id === p; })[0], t = g.querySelector('text');
      g.classList.toggle('on', on);
      if (on) { t.setAttribute('x', r1(d.x + (sides[p] ? -BIG_NAME_GAP : BIG_NAME_GAP))); t.setAttribute('text-anchor', sides[p] ? 'end' : 'start'); }
    });
    $('#w-map').classList.toggle('any', ids.length > 0 || none);
    $('#w-map .w-map-names').innerHTML = none ? '<span class="w-map-name w-map-none">' + esc(T('w.map.none')) + '</span>' : ids.map(function (p) {
      var stays = trip && trip.stays[p], ring = trip && !stays && !WILD_SPOTS[p];
      return '<span class="w-map-name"><span class="dot' + (ring ? ' ring' : '') + '" style="--c:' + placeColor(p) + '"></span>' + esc(placeName(p)) +
        (WILD_SPOTS[p] ? ' · ' + esc(T('w.map.out')) : stays ? ' · ' + esc(dayRange(stays[0].first, stays[stays.length - 1].last)) : '') + '</span>';
    }).join('');
  }
  function lightNow() {
    if (!mapDots.length) return;
    var items = mapItems(), i = -1, el = mouse && document.elementFromPoint(mouse.x, mouse.y);
    if (el) items.forEach(function (it, k) { if (i < 0 && it.els.some(function (e) { return e.contains(el); })) i = k; });
    if (i < 0) i = midItem(items.map(itemBox), middleLine());
    light(i > -1 ? items[i] : null);
  }
  function itemOf(el) { return mapItems().filter(function (it) { return it.els.some(function (e) { return e.contains(el); }); })[0]; }
  // a browser sends scroll and pointermove at most once a frame, and lightNow reads the boxes of 12–25 items only
  window.addEventListener('scroll', lightNow, { passive: true });
  window.addEventListener('resize', lightNow);
  BAND.addEventListener('change', lightNow);
  // the mouse (not a finger) over the tabs: the item under it; the keyboard: the item with the focus
  $('.w-panels').addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; mouse = { x: e.clientX, y: e.clientY }; lightNow(); });
  $('.w-panels').addEventListener('pointerleave', function () { mouse = null; lightNow(); });
  $('.w-panels').addEventListener('focusin', function (e) { var it = itemOf(e.target); if (it) light(it); });
  // the mouse on a dot frames the cards, tiles or places of its place; a click on it brings the first of them to the middle
  $('#w-map').addEventListener('mouseover', function (e) {
    var g = e.target.closest('.bm-pt'), p = g && g.getAttribute('data-p');
    mapEls().forEach(function (el) { el.classList.toggle('w-lit', !!p && elPlaces(el).indexOf(p) > -1); });
  });
  $('#w-map').addEventListener('mouseleave', function () { all('.w-lit').forEach(function (el) { el.classList.remove('w-lit'); }); });
  $('#w-map').addEventListener('click', function (e) {
    var g = e.target.closest('.bm-pt'), p = g && g.getAttribute('data-p'), el = p && mapEls().filter(function (x) { return elPlaces(x).indexOf(p) > -1; })[0];
    if (!el) return;
    var it = itemOf(el), b = itemBox(it), top = BAND.matches ? Math.max($('#w-map').getBoundingClientRect().bottom, 0) : 0, line = middleLine();
    // an item taller than the half of the screen it would have under the line comes to its top instead
    window.scrollBy(0, b.bottom - b.top > 2 * (window.innerHeight - line) ? b.top - top - 12 : (b.top + b.bottom) / 2 - line);
    mouse = null;
    light(it);
  });
  // the printout: the map once, with every place of the field guide lit and named
  window.addEventListener('beforeprint', function () { light({ places: Object.keys(GD), none: false }); });
  window.addEventListener('afterprint', lightNow);

  /* ---------- the photo viewer (finding 13): the photo, two sentences, the names and the photo's caption ---------- */
```

W `site2/src/wildpage.js` zamień:

```js
}

/* The encounters of the field guide's place p (finding 14): every encounter of a species there, in the order of WILD, then
```

na:

```js
}

/* The side of each lit name on the map: its own side (left, from countryMapAll: on the left only where it would cross the
   right edge), unless its box meets the box of a name already placed; then the other side, when the name fits there and
   meets none. Names are placed from east to west, so of two close places (Ninh Bình and Cúc Phương, 8 px apart) the
   eastern keeps its side and the western goes left. lit: [{ id, x, y, left, w }], w the name's width in px; gap: from the
   dot to the name (BIG_NAME_GAP); width: the map's; h: a name's height. Returns { id: true for a name on the left }. */
function labelSides(lit, gap, width, h) {
  var placed = [], out = {};
  function box(d, left) { return left ? [d.x - gap - d.w, d.x - gap] : [d.x + gap, d.x + gap + d.w]; }
  function meets(d, b) { return placed.some(function (p) { return Math.abs(p.y - d.y) < h && b[0] < p.b[1] && p.b[0] < b[1]; }); }
  lit.slice().sort(function (a, b) { return b.x - a.x; }).forEach(function (d) {
    var left = d.left, b = box(d, left);
    if (meets(d, b)) {
      var o = box(d, !left);
      if (o[0] >= 0 && o[1] <= width && !meets(d, o)) { left = !left; b = o; }
    }
    placed.push({ y: d.y, b: b });
    out[d.id] = left;
  });
  return out;
}

/* The encounters of the field guide's place p (finding 14): every encounter of a species there, in the order of WILD, then
```

W `site2/src/wildui.js` zamień:

```js
  'w.guide.lead': 'Co żyje w miejscach Route G, z południa na północ: gdzie i kiedy szukać, z przewodnikiem czy bez. Także ptaki i drobniejsze zwierzęta.',
```

na:

```js
  'w.guide.lead': 'Co żyje w miejscach Route G, z południa na północ: gdzie i kiedy szukać, z przewodnikiem czy bez. Także ptaki i drobniejsze zwierzęta.',
  'w.map.out': 'poza Route G', 'w.map.none': 'Bez potwierdzonego miejsca do pokazania na mapie.', 'w.map.key': '● na twojej trasie · ○ poza nią',
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy i sondy przechodzą** (ok. 3 min)

```bash
bash tests/run.sh 2>&1 | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
python3 site2/build.py > /dev/null
for a in "1400 route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "390 gallery&lang=pl" "1024 guide"; do
  PAGE=wildlife bash tests/probe.sh tests/probes/wildmap.js ${a%% *} "${a#* }" | tail -n 1; done
```

Oczekiwane: `ALL PASS`; grep nic nie wypisuje; trzy razy `done, all checks ok`.

- [ ] **Krok 5: Commit**

```bash
git add site2/build.py site2/src/en/wildui.js site2/src/wild.html site2/src/wildapp.js site2/src/wildpage.js site2/src/wildui.js tests/probes/wildmap.js tests/wild.test.js
git commit -q -F - <<'EOF'
Mapa kraju na podstronie zwierząt: przyklejona obok zakładek od 1101 px, węziej pasmo nad nimi; kropki miejsc przewodnika (pierścień dla miejsca poza trasą), trasa i szare punkty poza Route G; w każdej zakładce rząd kart, kafelków albo miejsce na środku ekranu (albo pod myszą) zapala swoje miejsca, a podpis podaje ich nazwy z dniami na trasie; kropka obwodzi swoje karty i po kliknięciu przewija do pierwszej; w wydruku mapa raz, z nazwami wszystkich miejsc; labelSides rozsuwa bliskie nazwy; sonda wildmap.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 91e47ad HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 4: Duże karty, kadry i wjeżdżanie

Ustalenia 9–14 („Na trasie”), 10 (kadry), 19 (wjeżdżanie) i 23 (wydruk kart). Jedna karta w rzędzie, zdjęcie na szerokość kolumny (`sizes` do 780 px) w kadrze `WILD_CROPS`; przy każdym spotkaniu `details.w-more` z „gdzie” i „kiedy”, a linie trasy na wierzchu; `prepRise` i `rise` w `wildapp.js`; w wydruku dwie karty w rzędzie i wszystko rozwinięte.

Kadry (arkusz w suchej próbie, przyjęty z całą suchą próbą): 3:2 wokół środka dla 11 zdjęć kart, a dla pięciu, przy których środek ucina zwierzę: duk 3:2 z kadrem u góry (`50% 5%`, cała głowa), gibboniec 4:3 (`50% 30%`: głowa i stopy), świetliki 3:2 niżej (`50% 70%`: drzewo ze świetlikami), lutung jasnogłowy 3:2 niżej (`50% 62%`: cały na skale), gaur 4:3 (`50% 40%`: rogi i pysk).

**Pliki:**
- Zmień: `site2/src/wild.html`, `site2/src/wildapp.js`, `site2/src/wildphotos.js`
- Testy: `tests/content.test.js`, `tests/probes/wild.js`

**Interfejsy:**
- Bierze: `mapEls()`, `all(sel)`, `lightNow()` w `wildapp.js` (zadanie 3).
- Daje: `WILD_CROPS = { id: [aspect-ratio, object-position] }`; klasy `w-more` (zwinięte „gdzie” i „kiedy”) i `w-pre` (pozycja czekająca na wjechanie).

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/content.test.js` zamień:

```js
  need(WILD_OUTSIDE.every(function (o) { return WILD_SPOTS[o.spot] && WILD_SPOTS[o.spot].short === o.name; }), 'WILD_OUTSIDE: each place with its point of WILD_SPOTS, of the same name');
```

na:

```js
  need(WILD_OUTSIDE.every(function (o) { return WILD_SPOTS[o.spot] && WILD_SPOTS[o.spot].short === o.name; }), 'WILD_OUTSIDE: each place with its point of WILD_SPOTS, of the same name');
  // the frames of the card photos (decision 10): a species with a card and a photo, 3:2 or 4:3, a point of the photo
  Object.keys(WILD_CROPS).forEach(function (id) {
    var c = WILD_CROPS[id];
    need(WILD[id] && WILD[id].route && WILD_PHOTOS[id] && ['3 / 2', '4 / 3'].indexOf(c[0]) > -1 && /^\d{1,3}% \d{1,3}%$/.test(c[1]), 'WILD_CROPS.' + id + ': a card photo, 3 / 2 or 4 / 3, x% y%');
  });
```

W `tests/probes/wild.js` zamień:

```js
  check('16 cards On your route', cards.length === 16, cards.length);
```

na:

```js
  check('16 cards On your route', cards.length === 16, cards.length);
  // the big photos (19.10.2026): one card a row, its photo the card's width, in its frame (WILD_CROPS); where and when folded
  // under each encounter's place, the trip's lines in sight; the cards below the screen wait hidden until they reach it
  if (W.view().tab === 'route') {
    var c0 = cards[0].getBoundingClientRect(), c1 = cards[1].getBoundingClientRect(), ph = cards[0].querySelector('.w-card-photo img').getBoundingClientRect();
    check('one card a row, the photo its width', Math.round(c1.top) > Math.round(c0.bottom) && Math.round(c0.width) === Math.round(document.querySelector('#p-route .w-cards').getBoundingClientRect().width) &&
      Math.abs(ph.width - c0.width) < 3, Math.round(c0.width) + ' / ' + Math.round(ph.width));
    var ga = document.querySelector('#sp-gaur .w-card-photo img').getBoundingClientRect(), dk = document.querySelector('#sp-dukc .w-card-photo img').getBoundingClientRect();
    check('the frames: 4:3 for the gaur, 3:2 for the others', Math.abs(ga.width / ga.height - 4 / 3) < 0.02 && Math.abs(dk.width / dk.height - 1.5) < 0.02 &&
      getComputedStyle(document.querySelector('#sp-duk .w-card-photo img')).objectPosition === '50% 5%', (ga.width / ga.height).toFixed(2) + ' ' + (dk.width / dk.height).toFixed(2));
    var more = Array.prototype.slice.call(document.querySelectorAll('#p-route .w-meet > details.w-more'));
    check('each encounter folded: its place, how and the chance in sight, where and when not', more.length === document.querySelectorAll('#p-route .w-meet').length &&
      more.every(function (d) { return !d.open && d.querySelector('summary .w-kind') && d.querySelector('summary .w-chance') && !d.querySelector(':scope > p').checkVisibility(); }));
    more[0].querySelector('summary').click();
    check('a click opens where and when', more[0].open && more[0].querySelector(':scope > p').checkVisibility());
    more[0].querySelector('summary').click();
    if (trip) check('the trip’s lines in sight, not folded', Array.prototype.every.call(document.querySelectorAll('#p-route .w-meet .w-ok, #p-route .w-meet .w-no'), function (e) { return !e.closest('details') && e.checkVisibility(); }));
    var low = Array.prototype.filter.call(cards, function (x) { return x.getBoundingClientRect().top > innerHeight; });
    check('the cards below the screen wait hidden, the others not', !matchMedia('(prefers-reduced-motion: reduce)').matches ? low.length > 0 && low.every(function (x) { return x.classList.contains('w-pre'); }) &&
      !Array.prototype.some.call(cards, function (x) { return x.getBoundingClientRect().top < innerHeight - 40 && x.classList.contains('w-pre'); }) : !document.querySelector('.w-pre'), low.length);
  }
```

W `tests/probes/wild.js` zamień:

```js
  var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
```

na:

```js
  var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
  window.dispatchEvent(new Event('beforeprint'));
  check('the print: every card shown, where and when unfolded', !document.querySelector('.w-pre') && !document.querySelector('details.w-more:not([open])'));
  window.dispatchEvent(new Event('afterprint'));
  check('after the print: folded again', !document.querySelector('#p-route details.w-more[open]'));
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash "$TMPDIR/wietnam-mapa/jsc.sh" tests/content.test.js 2>&1 | grep -m 1 "WILD_CROPS"
```

Oczekiwane: `  wildlife map: the check stopped: ReferenceError: Can't find variable: WILD_CROPS`. Sonda `wild.js` przejdzie dopiero po kroku 3.

- [ ] **Krok 3: Kod**

W `site2/src/wild.html` zamień:

```html
.w-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 18px; margin-top: 16px; }
```

na:

```html
/* one card a row, its photo the column's width (19.10.2026: big photos, the map beside them) */
.w-cards { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; margin-top: 16px; }
```

W `site2/src/wild.html` zamień:

```html
.w-card-photo img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; }
```

na:

```html
.w-card-photo img { width: 100%; aspect-ratio: var(--ar, 3 / 2); object-fit: cover; object-position: var(--pos, 50% 50%); }
```

W `site2/src/wild.html` zamień:

```html
.w-card-body { padding: 14px 16px 18px; display: flex; flex-direction: column; gap: 6px; }
.w-card h3 { font-size: 24px; }
```

na:

```html
.w-card-body { padding: 18px 22px 22px; display: flex; flex-direction: column; gap: 6px; }
.w-card h3 { font-size: clamp(26px, 4vw, 32px); }
```

W `site2/src/wild.html` zamień:

```html
.w-meet-top { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
```

na:

```html
.w-meet-top { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
/* an encounter's where and when, folded under its place: the arrow at the right turns when it opens */
.w-more > summary { display: flex; align-items: center; gap: 12px; min-height: 44px; list-style: none; cursor: pointer; }
.w-more > summary::-webkit-details-marker { display: none; }
.w-more > summary::after { content: ''; flex: none; margin: 0 6px 0 auto; width: 8px; height: 8px; border-right: 2px solid var(--muted); border-bottom: 2px solid var(--muted); transform: rotate(45deg); transition: transform .2s; }
.w-more[open] > summary::after { transform: rotate(-135deg); }
.w-more > p { margin-top: 4px; }
```

W `site2/src/wild.html` zamień:

```html
/* the items a dot on the map frames: the cards, tiles and places of its place */
.w-card, .w-tile, .w-place, .w-box { transition: box-shadow .2s, border-color .2s; }
```

na:

```html
/* the items a dot on the map frames: the cards, tiles and places of its place; those below the screen when a tab opens
   wait hidden (w-pre) and rise into place as they reach it (wildapp.js) */
.w-card, .w-tile, .w-place, .w-box { transition: opacity .5s ease-out, transform .5s ease-out, box-shadow .2s, border-color .2s; }
.w-pre { opacity: 0; transform: translateY(28px); }
```

W `site2/src/wild.html` zamień:

```html
  .w-tabs, .lang-switch, #w-back, .w-addbox, .w-drops, .w-add, .w-viewer { display: none !important; }
```

na:

```html
  .w-tabs, .lang-switch, #w-back, .w-addbox, .w-drops, .w-add, .w-viewer { display: none !important; }
  .w-pre { opacity: 1 !important; transform: none !important; }
  .w-more > summary::after { display: none; }
  /* on paper two cards a row, as before the big photos */
  .w-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
```

W `site2/src/wildapp.js` zamień:

```js
  function img(id, sizes) {
```

na:

```js
  // a photo; style: its frame on a card (WILD_CROPS), or none
  function img(id, sizes, style) {
```

W `site2/src/wildapp.js` zamień:

```js
      '" alt="' + esc(caption(id)) + '" loading="lazy" decoding="async">';
```

na:

```js
      '" alt="' + esc(caption(id)) + '"' + (style ? ' style="' + style + '"' : '') + ' loading="lazy" decoding="async">';
```

W `site2/src/wildapp.js` zamień:

```js
  }
  function photoBox(id, cls) {
```

na:

```js
  }
  // a card's photo the width of its column (up to 780 px, the whole screen below 1101 px), in its frame
  function photoBox(id, cls) {
```

W `site2/src/wildapp.js` zamień:

```js
    if (SP[id].nophoto) return '<div class="w-nophoto ' + cls + '"><span>' + esc(T('w.nophoto')) + '</span></div>';
```

na:

```js
    if (SP[id].nophoto) return '<div class="w-nophoto ' + cls + '"><span>' + esc(T('w.nophoto')) + '</span></div>';
    var crop = cls === 'w-card-photo' && WILD_CROPS[id];
```

W `site2/src/wildapp.js` zamień:

```js
      img(id, cls === 'w-tile-photo' ? '(max-width: 640px) 50vw, 240px' : '(max-width: 640px) 100vw, 380px') + '</button>';
```

na:

```js
      img(id, cls === 'w-tile-photo' ? '(max-width: 640px) 50vw, 240px' : '(max-width: 1100px) 100vw, 780px', crop ? '--ar:' + crop[0] + ';--pos:' + crop[1] : '') + '</button>';
```

W `site2/src/wildapp.js` zamień:

```js
  // one encounter of a card: where and how, the chance, when; with a trip, what the trip means for it (finding 9)
```

na:

```js
  /* one encounter of a card: the place, how and the chance in sight, where and when folded under them (the map of the
     subpage, decision 11); with a trip, what the trip means for it (finding 9), in sight */
```

W `site2/src/wildapp.js` zamień:

```js
    var h = '<li class="w-meet"><p class="w-meet-top">' + kind(m.kind) + ' <b>' + esc(short(m.place)) + '</b> <span class="w-chance">' + chance(m.chance, m.chanceNote) + '</span></p>' +
      '<p>' + esc(tied(capFirst(m.where))) + '</p><p class="w-muted">' + esc(T('w.when', { when: tied(m.when) })) + '</p>';
```

na:

```js
    var h = '<li class="w-meet"><details class="w-more"><summary><span class="w-meet-top">' + kind(m.kind) + ' <b>' + esc(short(m.place)) + '</b> <span class="w-chance">' + chance(m.chance, m.chanceNote) + '</span></span></summary>' +
      '<p>' + esc(tied(capFirst(m.where))) + '</p><p class="w-muted">' + esc(T('w.when', { when: tied(m.when) })) + '</p></details>';
```

W `site2/src/wildapp.js` zamień:

```js
    lightNow();
```

na:

```js
    lightNow();
    prepRise();
```

W `site2/src/wildapp.js` zamień:

```js
  window.addEventListener('afterprint', lightNow);

  /* ---------- the photo viewer (finding 13): the photo, two sentences, the names and the photo's caption ---------- */
```

na:

```js
  window.addEventListener('afterprint', lightNow);

  /* ---------- the cards, tiles and places come in as they reach the screen (19.10.2026) ---------- */
  /* When a tab opens, those below the screen wait hidden (w-pre) and rise into place once their top is on it; none wait with
     reduced motion. The printout shows them all, with every encounter's where and when unfolded. */
  var STILL = window.matchMedia('(prefers-reduced-motion: reduce)'), unfolded = [];
  function prepRise() {
    if (STILL.matches) return;
    mapEls().forEach(function (el) { if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('w-pre'); });
  }
  function rise() { all('.w-pre').forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.remove('w-pre'); }); }
  window.addEventListener('scroll', rise, { passive: true });
  window.addEventListener('resize', rise);
  window.addEventListener('beforeprint', function () {
    all('.w-pre').forEach(function (el) { el.classList.remove('w-pre'); });
    unfolded = all('details.w-more:not([open])');
    unfolded.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () { unfolded.forEach(function (d) { d.open = false; }); unfolded = []; });

  /* ---------- the photo viewer (finding 13): the photo, two sentences, the names and the photo's caption ---------- */
```

W `site2/src/wildphotos.js` zamień:

```js
};
```

na:

```js
};

/* The frame of a photo on a card of On your route (19.10.2026), where the usual one, 3:2 around the middle, would cut the
   animal: [aspect-ratio, object-position]. The whole animal stays in the frame (the map of the subpage, decision 10: other
   proportions rather than a cut animal); every other card photo takes the usual frame. */
var WILD_CROPS = {
  duk: ['3 / 2', '50% 5%'],
  gibbon: ['4 / 3', '50% 30%'],
  swietliki: ['3 / 2', '50% 70%'],
  lutungj: ['3 / 2', '50% 62%'],
  gaur: ['4 / 3', '50% 40%']
};
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy i sondy przechodzą** (ok. 3 min)

```bash
bash tests/run.sh 2>&1 | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
python3 site2/build.py > /dev/null
for a in "390 route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "1400 route&lang=pl" "1920 route&od=HAN&do=SGN&miesiac=2027-02&dni=21&co=przyroda&poziom=3&lang=pl"; do
  PAGE=wildlife bash tests/probe.sh tests/probes/wild.js ${a%% *} "${a#* }" | tail -n 1; done
```

Oczekiwane: `ALL PASS`; grep nic nie wypisuje; trzy razy `done, all checks ok`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/wild.html site2/src/wildapp.js site2/src/wildphotos.js tests/content.test.js tests/probes/wild.js
git commit -q -F - <<'EOF'
Duże zdjęcia w „Na trasie”: jedna karta w rzędzie, zdjęcie na szerokość kolumny (do 780 px) w kadrze, który nie ucina zwierzęcia (WILD_CROPS: 4:3 dla gibbońca i gaura, przesunięty kadr dla duka, świetlików i lutunga jasnogłowego); przy każdym spotkaniu „gdzie” i „kiedy” zwinięte pod miejscem, a to, co mówi trasa, na wierzchu; karty, kafelki i miejsca łagodnie wjeżdżają, gdy dochodzą do ekranu (bez ruchu przy „ogranicz ruch”); wydruk: dwie karty w rzędzie, wszystko rozwinięte; sonda wild.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 4ee09d5 HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 5: Punkt kontrolny

Wszystko w porównaniu z zadaniem 1 i z suchą próbą. Wyniki do `$TMPDIR/wietnam-mapa/punkt.md`, z którego zadanie 8 bierze akapit do notatek.

- [ ] **Krok 1: Pełny test** (ok. 3 min)

```bash
bash tests/run.sh --full 2>&1 | grep -E "^combos:|^ALL PASS"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`.

- [ ] **Krok 2: Sondy w obu językach** (ok. 15 min; w tle, bez przebudowy strony w tym czasie)

```bash
python3 site2/build.py > /dev/null
bash "$TMPDIR/wietnam-mapa/sondy.sh" > "$TMPDIR/wietnam-mapa/sondy-po-en.txt" 2>&1
bash "$TMPDIR/wietnam-mapa/sondy.sh" pl > "$TMPDIR/wietnam-mapa/sondy-po-pl.txt" 2>&1
tail -n 1 "$TMPDIR/wietnam-mapa/sondy-po-en.txt" "$TMPDIR/wietnam-mapa/sondy-po-pl.txt"
```

Oczekiwane: `sondy: 0 z 24 nie przeszło` i `sondy (pl): 0 z 24 nie przeszło` (przed planem po 14: doszła sonda `wildmap.js`).

- [ ] **Krok 3: Wydruk**

```bash
{ for t in "route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "gallery&lang=pl" "guide"; do
    PAGE=wildlife bash tests/print.sh "$t" "$TMPDIR/wietnam-mapa/po.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //"; done
  bash tests/print.sh "od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "$TMPDIR/wietnam-mapa/po.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //"; } > "$TMPDIR/wietnam-mapa/pdf-po.txt"
paste -d '\n' "$TMPDIR/wietnam-mapa/pdf-przed.txt" "$TMPDIR/wietnam-mapa/pdf-po.txt" | cut -c1-40
```

Oczekiwane (sucha próba): „Na trasie” z trasą z maja 16 → 9 stron (karty po dwie w rzędzie, wszystko rozwinięte), „Galeria” 6 → 6, „Przewodnik” 8 → 9 (mapa na pierwszej stronie), strona z trasą bez zmian (14 → 14); w żadnym PDF stron poniżej 45% ani zakrytych linii. Pierwsza strona każdego PDF podstrony ma mapę z nazwami miejsc przewodnika (obejrzyj jedną).

- [ ] **Krok 4: Zrzuty do przeglądu** (ok. 5 min)

```bash
mkdir -p "$TMPDIR/wietnam-mapa/zrzuty"; T="od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2"
for l in en pl; do X=""; [ $l = pl ] && X="&lang=pl"; for w in 390 1024 1400 1920; do H=2600; [ $w -gt 1100 ] && H=1800
  for v in route gallery guide; do PAGE=wildlife bash tests/shot.sh "$v&$T$X" $w "$TMPDIR/wietnam-mapa/zrzuty/$v-$l-$w.png" $H > /dev/null; done; done; done
ls "$TMPDIR/wietnam-mapa/zrzuty" | wc -l
```

Oczekiwane: `24`. Obejrzyj je (mapa obok przy 1400 i 1920 px, pasmo przy 390 i 1024 px, pierwsza pozycja zapalona, duże zdjęcia w całości); zrzuty idą za motywem systemu, więc drugi motyw sprawdź ręcznie w kroku 5; duże zdjęcie bywa szare w Chrome bez okna, wtedy powtórz ten zrzut.

- [ ] **Krok 5: Ręcznie w przeglądarce** (lokalny serwer z `site2/out/pages`, wbudowana przeglądarka nie otwiera `file://`)

Sprawdź i zapisz wynik w `$TMPDIR/wietnam-mapa/punkt.md`:
- przy szerokim oknie: mapa stoi obok przy przewijaniu wszystkich trzech zakładek; kropki zapalają się płynnie (rośnięcie, puls, nazwa), karty wjeżdżają łagodnie; kursor na karcie zapala jej miejsca, na kropce obwodzi karty, kliknięcie kropki przewija;
- klawiatura: Tab na zdjęciu karty i na strzałce „gdzie i kiedy” zapala miejsca karty; Enter rozwija;
- przełącznik EN · PL w połowie strony: nazwy na mapie i w podpisie w nowym języku, zapalona pozycja na środku;
- emulacja „ogranicz ruch” (DevTools, Rendering, `prefers-reduced-motion: reduce`): nic nie wjeżdża, kropki nie pulsują;
- jasny i ciemny motyw: pierścienie miejsc poza trasą i szare punkty widać na zarysie kraju;
- konsola bez błędów.

- [ ] **Krok 6: Telefon** (z użytkownikiem, za zgodą)

Strona z komputera w domowej sieci (`python3 -m http.server <port> --bind 0.0.0.0 --directory site2/out/pages`, na telefonie `http://<IP komputera>:<port>/wildlife/#route&…`) albo żywa strona po publikacji. Lista dla użytkownika, krok po kroku: pasmo z mapą stoi u góry przy przewijaniu każdej zakładki; zapala się karta na środku widocznej części; tknięcie karty niczego nie „przykleja” (dalsze przewijanie zmienia mapę); tknięcie kropki przewija do karty; zdjęcia ostre i całe; strzałka rozwija „gdzie i kiedy”.

### Zadanie 6: Końcowy przegląd przed publikacją

- [ ] **Krok 1: Świeży recenzent na najmocniejszym modelu** (Agent z `model: fable`, w tle, we własnym worktree z podlinkowanym `photos/` i własnym `TMPDIR`)

Zadanie dla recenzenta: przeczytaj cały diff od commitu planu do `HEAD`, ten plan, opis projektu (`notes/plans/2026-10-19-mapa-zwierzat-projekt.md`), sekcję „Mapa podstrony” researchu i dowody z punktu kontrolnego (`$TMPDIR/wietnam-mapa/`); porównaj `home` i `WILD_SPOTS` ze źródłami researchu; nowe teksty po polsku obok angielskich; własnymi sondami sprawdź to, czego sondy planu nie badają (np. zmiana zakładki w połowie strony, szerokości 1101 i 1100 px, bardzo niskie okno, link z `#guide-<miejsce>`); oceń „Gotowe do publikacji: Tak / Po poprawkach / Nie”, z uwagami krytycznymi, ważnymi i drobnymi. Wynik do `$TMPDIR/przeglad-mapa.txt`.

- [ ] **Krok 2: Uwagi z użytkownikiem**

Każdą uwagę krytyczną i ważną sprawdź sam (research, kod, sonda), potem pokaż użytkownikowi z rekomendacją; poprawki w osobnych commitach „Poprawka z końcowego przeglądu mapy podstrony: …”, każda z testem albo sondą, która najpierw nie przechodzi; drobne na listę następnej rundy albo do poprawki, według wyboru użytkownika.

### Zadanie 7: Publikacja (każdy krok za wyraźną zgodą użytkownika)

- [ ] **Krok 1: Strona do `docs/`** (za zgodą)

```bash
bash tools/publish.sh
git status --short docs | wc -l
grep -c 'name="robots" content="noindex"' docs/index.html docs/wildlife/index.html
```

Oczekiwane: `publish.sh: docs/ ready (…)`, zmieniona podstrona (`docs/wildlife/index.html`), `noindex` w obu stronach.

- [ ] **Krok 2: Commit `docs/`** (za zgodą)

```bash
git add docs
git commit -q -F - <<'EOF'
Strona na GitHub Pages z mapą kraju na podstronie zwierząt (przyklejona obok zakładek, węziej pasmo nad nimi; miejsca zapalają się przy przewijaniu) i dużymi zdjęciami w „Na trasie”; dalej z noindex

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 3: `git push`** (za osobną zgodą), potem sprawdzenie żywej strony

```bash
git push origin main
gh api repos/grzegorzfrskiba-hub/wietnam/pages/builds/latest --jq .status
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/wildlife/ | grep -c 'id="w-map"'
```

Oczekiwane po zbudowaniu GitHub Pages (`built`): `1`.

### Zadanie 8: Notatki: status i następny krok

- [ ] **Krok 1: `notes/etapy.md` i `CLAUDE.md`**

W `notes/etapy.md`, w „Następna runda poprawek (po etapie 6)”, akapit „**Mapa kraju na podstronie zwierząt** (sesja decyzji 19.10.2026)” z odnośnikami do opisu projektu i tego planu, „Zrobione <data>: …” (co jest na stronie), „Punkt kontrolny (<data>): …” (z `$TMPDIR/wietnam-mapa/punkt.md`), „Końcowy przegląd (<data>): …” (z `$TMPDIR/przeglad-mapa.txt` i decyzji użytkownika) i „Publikacja (<data>): …”; w „## Następny krok” usuń punkt o tym planie. W `CLAUDE.md`: linia `**Status (…)**` z mapą na podstronie zwierząt, a w „Jak sprawdzać” przy sondach `wildmap.js` (z `PAGE=wildlife`: mapa podstrony, zapalanie w trzech zakładkach, pasmo, wydruk).

- [ ] **Krok 2: Commit notatek** (za zgodą), push za osobną zgodą

```bash
git add notes/etapy.md CLAUDE.md
git commit -q -F - <<'EOF'
Notatki: mapa kraju na podstronie zwierząt zrobiona (zapalanie miejsc przy przewijaniu w trzech zakładkach, duże zdjęcia w „Na trasie”), punkt kontrolny, końcowy przegląd i publikacja

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

Na koniec zapytaj użytkownika o `git push` i o usunięcie gałęzi `sucha-proba-mapa` (`git branch -D`, bo jej commity mają inne SHA niż `main`).

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` po każdym zadaniu; `--full` w punkcie kontrolnym.
- Sondy: `bash "$TMPDIR/wietnam-mapa/sondy.sh" [pl]` (zadanie 1), pojedynczo `PAGE=wildlife bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<link>'`.
- Każde zadanie 2–4 porównaj z jego commitem na gałęzi `sucha-proba-mapa` (`git diff <commit suchej próby> HEAD -- site2 tests tools` nic nie wypisuje).
- Grep twardych spacji z „Ograniczeń globalnych” po każdym zadaniu.
