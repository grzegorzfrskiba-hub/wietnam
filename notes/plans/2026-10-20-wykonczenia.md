# Wykończenia strony („efekt wow”) — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Zadania mają nagłówki „### Zadanie N:”, a nie „Task N”: wycinaj zadanie od „### Zadanie N:” do następnego „### Zadanie” albo do „## Jak sprawdzać”, nigdy do pierwszego „## ” (kroki mają nagłówki Markdown w blokach kodu).

**Cel:** dziewięć wykończeń z sesji decyzji 20.10.2026, żeby strona z trasą i podstrona zwierząt „żyły”: trasa rysuje się sama, nowa trasa wchodzi płynnie, liczby się nabijają, podstrona zwierząt zaczyna się dużym zdjęciem duka, zdjęcia na górze powoli się przybliżają, zdjęcia doczytywane później wyłaniają się z ramki w swoim kolorze, podgląd zdjęć zwierząt jest albumem, pasek u góry w „Dzień po dniu” mówi, gdzie jesteś, a strona kończy się zachodem słońca nad Pù Luông z przyciskami. Kolejno:
- **pomiary przed planem** (bez commita): sondy obu stron w obu językach, strony PDF, rozmiar pliku offline;
- **zdjęcia i typografia:** zdjęcie na górze podstrony, przybliżanie, wyłanianie ze średnim kolorem, akapity i zaznaczenie;
- **album w podglądzie zdjęć zwierząt** i przybliżanie kafelków Galerii;
- **pasek w „Dzień po dniu” i zakończenie strony** z tekstami w obu językach;
- **ruch nowej trasy:** rysowanie trasy, fala kafelków i przenikanie, nabijanie liczb;
- na końcu punkt kontrolny (z ruchem oglądanym w przeglądarce i na telefonie), końcowy przegląd świeżego recenzenta, publikacja za zgodą i notatki.

**Architektura:**
- **Silnik i trasy bez zmian.** Jedyna zmiana czystych funkcji: `mapLayout` w `page.js` podaje przy każdej linii i odnodze (`segs`, `stubs`) numer odcinka trasy (`leg`), żeby trasa rysowała się w kolejności podróży.
- **Ruch tylko z rąk odwiedzającego.** Chrome bez okna woła IntersectionObserver raz, zaraz po otwarciu strony (i czasem po przewinięciu przez sondę), a animacje Web Animations stoją w nim w miejscu. Dlatego:
  - klasa `live` na `<html>` (od pierwszego wywołania IntersectionObservera) włącza tylko ruch w CSS: przybliżanie zdjęcia na górze i wyłanianie zdjęć;
  - ruch w JavaScripcie (rysowanie trasy, fala, przenikanie, liczby, przenikanie napisu w pasku) idzie tylko po zmianie, którą zrobił odwiedzający (`byHand`: zdarzenie `isTrusted`), albo przy pierwszym pokazaniu po jego dotyku, kółku myszy lub klawiszu (`touched`);
  - zmiana zrobiona skryptem, jak w sondach, podmienia trasę od razu i nic się nie rusza, więc sondy czytają stan końcowy.
- **Zamiast View Transitions animacje po przebudowie** (Web Animations na kafelkach paska, liście, dniach i „Przed wyjazdem”): `document.startViewTransition` podmienia stronę w następnej klatce, a strona (`syncForm`, `reportAdd`) i wszystkie sondy czytają nową trasę zaraz po `apply`. Wygląd jest ten sam co w ustaleniu 2: kafelki wchodzą po kolei, reszta przenika.
- **Build:** średni kolor każdego zdjęcia (`bg` w danych zdjęć), zdjęcie na górze podstrony (`WILD_HERO` w `wildphotos.js`) w rozmiarze 1920 px, zdjęcie zakończenia (`FINALE_PHOTO` w `photos.js`) z kopiami galerii i dużą, także w pliku offline.

**Technologie:** JavaScript w stylu ES5, bez zależności (Web Animations API i IntersectionObserver przeglądarki); testy w JavaScriptCore (`jsc`); Python 3 z PIL (build); Chrome bez okna (sondy, zrzuty, wydruk).

**Specyfikacja:**
- [notes/plans/2026-10-20-wykonczenia-projekt.md](2026-10-20-wykonczenia-projekt.md): opis projektu przyjęty przez użytkownika 20.10.2026 (ustalenia 1–18, decyzje użytkownika: kolejność, zdjęcie duka, pasek w dniach, zakończenie z Pù Luông), z sekcją „Zmiany przy suchej próbie” (onum odpada, View Transitions zastąpione, zdjęcie duka na szerokim ekranie, ruch tylko z rąk odwiedzającego, plik offline 7,1 MB);
- sucha próba na gałęzi `sucha-proba-wykonczenia`, obejrzana przez użytkownika w przeglądarce; ten plan odtwarza ją krok po kroku.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS;
  - `page.js` bez DOM; dane wchodzą przez argumenty;
  - komentarze w kodzie po angielsku; teksty dla czytelnika po polsku w `ui.js`, po angielsku w `en/ui.js`, z tymi samymi kluczami w tej samej kolejności (test `english interface`).
- **Silnik i trasy bez zmian:** `engine.js` i dane tras się nie zmieniają; trasy z `tools/liczby.sh` takie same jak przed planem.
- **Twarda spacja w kodzie** to zawsze zapis z ukośnikiem (`\u` i `00a0`), a łącznik bez szerokości tak samo (`2060`), nigdy same znaki. Po każdym zadaniu `grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools | grep -v "var NB"` nic nie wypisuje.
- **Grep w planie:** w narzędziu Bash `grep` to nakładka zsh, która pomija pliki binarne i pisze ścieżki bez `./`, a bloki uruchamiane przez `bash -c` biorą `/usr/bin/grep`. Dlatego każdy grep po katalogach ma `-I`.
- **Teksty:** trzy nowe klucze (`end.h2`, `end.p`, `end.change`) w obu językach, po polsku per „ty”, bez form rodzajowych; strzałki albumu biorą istniejące `g.prev` i `g.next`; podpisy zdjęć i teksty alternatywne z istniejących podpisów (`caption`). Test treści `for every passport` przechodzi.
- **Zdjęcia:** bez nowych plików; `photos/` nie jest w gicie (w worktree podlinkuj z głównej kopii).
- **Ruch:** przy `prefers-reduced-motion: reduce` nic się nie rusza; wydruk i PDF w stanie końcowym, bez zakończenia i bez zdjęcia na górze podstrony; liczba stron PDF jak przed planem.
- **`noindex` zostaje** na obu stronach (`NOINDEX = True` w `site2/build.py`), podgląd linku bez zmian.
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu; pełny test (`--full`) w punkcie kontrolnym. `tests/run.sh` zatrzymuje się na pierwszym pliku testów z błędem, więc krok 2 pokazuje też błąd samego nowego testu przez `jsc.sh` albo sondę (zadanie 1).
- **Commity:** jeden na zadanie 2–5, pliki po nazwie (`git add <pliki>`), opis po polsku, na końcu `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. `git push` tylko za zgodą użytkownika (zadania 8 i 9).
- **Repo jest publiczne:** do commita nie trafiają dane osobowe ani linki z terminami znajomych.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których wykończenia najłatwiej zawiodą odwiedzającego, a których testy same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Ruch, który zostaje w połowie.**
   - Ryzyko: kart przeglądarki w tle albo słaby telefon wstrzymuje klatki, a liczba w kafelku zostaje na „7” zamiast „15”; maska lotu zostaje po rysowaniu, więc lot znika; trasa zostaje schowana (`m-wait`).
   - Oczekiwane: liczby kończą na wartości końcowej także bez klatek (zapas `setTimeout`); `finishDraw` po 2,4 s, przy powiększeniu mapy i przed wydrukiem kończy rysowanie, usuwa maski i `m-wait`.
   - Sprawdzenie: sonda `polish.js` (rysowanie zaczęte i skończone ręcznie, liczby po 1,2 s), ręcznie w przeglądarce i na telefonie (zadanie 6, kroki 5 i 6).
2. **Sondy i skrypty widzą stan końcowy.**
   - Ryzyko: sonda po `apply` czyta liczby w trakcie nabijania albo położenie kafelków w trakcie fali i nie przechodzi; Chrome bez okna woła IntersectionObserver po przewinięciu przez sondę i coś rusza.
   - Oczekiwane: ruch tylko po zdarzeniu `isTrusted` (`byHand`) albo po dotyku odwiedzającego (`touched`); zmiana skryptem nie rusza niczego.
   - Sprawdzenie: sonda `polish.js` („a script’s change: … nothing moving”), wszystkie sondy obu stron w obu językach (zadanie 6, krok 2).
3. **Telefon.**
   - Ryzyko: mapa na telefonie jest wyższa niż ekran i rysowanie zaczyna się, zanim widać południe; pasek u góry z dniem nie mieści się obok „Zmień”; zakończenie z trzema przyciskami zasłania zdjęcie.
   - Oczekiwane: rysowanie od ok. 45% mapy na ekranie, przedtem trasa schowana; napis w pasku ucina się wielokropkiem; przyciski zakończenia w dwóch rzędach.
   - Sprawdzenie: sonda `polish.js` przy 390 px, zrzuty i telefon w punkcie kontrolnym (zadanie 6, kroki 4 i 6).
4. **Zdjęcie Pù Luông w dwóch rolach.**
   - Ryzyko: `puluong_1` jest też pierwszym zdjęciem galerii Pù Luông i wiersza listy „Nie ma na twojej trasie”; bez kopii 160 px wiersz bierze duże zdjęcie (sucha próba: sonda `offroute.js` to złapała).
   - Oczekiwane: zdjęcie zakończenia ma kopie 160, 480, 960 i 1400 px i pełne 1920 px.
   - Sprawdzenie: sonda `offroute.js` (wiersze z kopią 160 px), `ls site2/out/pages/img/puluong_1*` (zadanie 4, krok 4).
5. **Wydruk, „ogranicz ruch” i bez IntersectionObservera.**
   - Ryzyko: w PDF zdjęcia doczytywane później są przezroczyste, trasa schowana albo w połowie narysowana; przy „ogranicz ruch” coś się jednak rusza.
   - Oczekiwane: ukrywanie zdjęć tylko na ekranie (`@media screen`), `beforeprint` kończy rysowanie; każdy ruch sprawdza `prefers-reduced-motion`.
   - Sprawdzenie: `print.sh` w punkcie kontrolnym (strony jak przed planem, bez zakrytych linii), sonda `polish.js` („not on paper”), ręcznie z emulacją „ogranicz ruch” (zadanie 6, krok 5).

## Kontekst dla wykonawcy

- **Gałąź suchej próby `sucha-proba-wykonczenia`** (commity w repo, na `1db4ad5`): `dc4ac2c` zadanie 2, `0c2b240` zadanie 3, `9b4c138` zadanie 4, `865270c` zadanie 5. Po każdym zadaniu `git diff <commit suchej próby> HEAD -- site2 tests tools` nic nie wypisuje.
- **Strona z trasą:** `site2/src/template.html` (szablon i style), `app.js` (logika z DOM; `render`, `renderFacts`, `renderShape`, `renderMap`, `renderMini`, `openMapZoom`, `bindCopy`, `bindChanges`, `onFormChange`), `page.js` (czyste funkcje, `mapLayout`), `ui.js` z `en/ui.js`, `photos.js`; build `site2/build.py`.
- **Podstrona:** `site2/src/wild.html`, `wildapp.js` (`img`, `photoBox`, `openViewer`, `setLang`), `wildphotos.js`; build w `wild_page`.
- **Sondy:** `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<link>'`, z `PAGE=wildlife` podstrona; ramka 900 px wysokości. W Chrome bez okna:
  - IntersectionObserver woła raz, zaraz po otwarciu strony, i czasem po przewinięciu przez sondę;
  - przejścia CSS i animacje Web Animations stoją w miejscu, a klatki animacji bywają wstrzymane;
  - zdarzenia `scroll` nie przychodzą same, więc sonda wysyła je sama (`dispatchEvent`);
  - zdarzenia ze skryptu mają `isTrusted` równe `false`.
- **Pułapki:**
  - `python3 site2/build.py` usuwa `site2/out`, więc nie buduj, gdy w tle działają sondy;
  - wbudowana przeglądarka nie otwiera `file://`: ręczne sprawdzenia przez lokalny serwer (`python3 -m http.server … --directory site2/out/pages` w `.claude/launch.json`, który nie jest w gicie); ruch wymaga prawdziwego przewijania kółkiem albo palcem (sam `scrollTo` z konsoli nic nie rusza, to zamierzone);
  - `tests/shot.sh` działa bez wirtualnego czasu, więc na zrzutach zdjęcia doczytywane później bywają jeszcze niewidoczne (tło w średnim kolorze): wtedy powtórz zrzut.

## Struktura plików

- Zmień: `site2/build.py` (średni kolor, zdjęcie na górze podstrony, zdjęcie zakończenia), `site2/src/app.js` (wyłanianie zdjęć, pasek w dniach, zakończenie, rysowanie trasy, przebudowa, liczby), `site2/src/page.js` (`leg` w `mapLayout`), `site2/src/template.html` (style i HTML), `site2/src/wild.html` (zdjęcie na górze, album, style), `site2/src/wildapp.js` (wyłanianie, album), `site2/src/photos.js` (`FINALE_PHOTO`), `site2/src/wildphotos.js` (`WILD_HERO`), `site2/src/ui.js` i `site2/src/en/ui.js` (trzy teksty).
- Testy: `tests/page.test.js`, `tests/data.test.js`, `tests/probes/wild.js`; nowa sonda `tests/probes/polish.js`.
- Bez zmian: silnik, dane tras, treści miejsc, zdjęcia, research.

---

### Zadanie 1: Stan przed planem (bez commita)

Sondy obu stron w obu językach, strony PDF i rozmiar pliku offline, do porównania w punkcie kontrolnym, oraz pomocnicze skrypty. Bez commita.

- [ ] **Krok 1: Skrypty i pomiary** (ok. 5 min)

```bash
rm -rf "$TMPDIR/wietnam-wow"; mkdir -p "$TMPDIR/wietnam-wow"
cat > "$TMPDIR/wietnam-wow/sondy.sh" <<'SONDYEOF'
#!/bin/bash
# The probes of the plan of the finishing touches, in one language (pl as the argument: the links with &lang=pl): every
# probe of the page with the route on the trips its notes name (before.js with koszty=1 and fold.js on a trip with Cao Bằng,
# changes.js on links without dodaj, map.js from 901 px), the probes of the wildlife subpage (wild.js, wildmap.js) in its
# three tabs, and, once task 5 has made it, the probe of the finishing touches (polish.js). Prints a line for each failure
# and the count at the end. Run from the repository's folder after python3 site2/build.py, and do not build again while it
# runs.
L=""; [ "${1:-}" = pl ] && L="&lang=pl"
A="od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang"
B="od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2"
MAY="od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2"
FEB="od=HAN&do=SGN&miesiac=2027-02&dni=21&co=przyroda&poziom=3"
bad=0; n=0
run() {
  n=$((n+1))
  PAGE="$1" bash tests/probe.sh "tests/probes/$2" "$3" "$4" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL ${1:-page} $2 $3 $4"; grep -iE "fail|error|stopped" "$TMPDIR/sonda.txt" | head -5; }
}
for w in 390 641 768 901 1100 1400; do run "" before.js $w "$A&koszty=1$L"; done
for w in 390 360 320; do run "" settings.js $w "$B$L"; done
run "" settings.js 390 "${L#&}"
run "" map.js 1400 "$B$L"
run "" map.js 1400 "od=DAD&do=SGN&miesiac=MIESIAC&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon$L"
run "" map.js 1400 "od=HAN&do=HAN&miesiac=MIESIAC&dni=16&co=gory,przyroda&poziom=2&dodaj=mucangchai,sapa$L"
run "" changes.js 1400 "$B$L"
run "" changes.js 1400 "od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2$L"
run "" anchors.js 390 "$B$L"
run "" link.js 1400 "od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3$L"
run "" publish.js 1400 "$B$L"
run "" pdf.js 1400 "od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=gory,kultura&poziom=2$L"
[ -z "$L" ] && { run "" lang.js 390 "$B"; run "" lang.js 1400 "$A"; }
for w in 390 641 901 1400; do run "" fold.js $w "$A$L"; done
for w in 390 768 1400; do run "" costs.js $w "$B$L"; done
for w in 390 901 1400; do run "" offroute.js $w "$B$L"; done
for w in 390 641 901; do run "" minimap.js $w "$B$L"; done
for w in 390 1400; do run "" wildlink.js $w "$MAY$L"; done
if [ -f tests/probes/polish.js ]; then for w in 390 1400; do run "" polish.js $w "$B$L"; run "" polish.js $w "$A$L"; done; fi
for p in wild.js wildmap.js; do
  for w in 390 1024 1400; do run wildlife $p $w "route&$MAY$L"; done
  run wildlife $p 390 "gallery$L"; run wildlife $p 1400 "gallery&$FEB$L"; run wildlife $p 1024 "guide$L"; run wildlife $p 390 "guide-cattien&$FEB$L"
done
echo "sondy${1:+ ($1)}: $bad z $n nie przeszło"
SONDYEOF
cat > "$TMPDIR/wietnam-wow/jsc.sh" <<'JSCEOF'
#!/bin/bash
# One test file in JavaScriptCore with the sources of tests/run.sh, so a red step shows the test's own failure where
# tests/run.sh stops at the first failing file:
#   bash "$TMPDIR/wietnam-wow/jsc.sh" <test>   (from the repository's folder)
set -uo pipefail
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
CONTENT_FILES=$(ls site2/src/content/*.js)
EN_CONTENT_FILES=$(ls site2/src/en/content/*.js)
eval "$(grep '^SOURCES=' tests/run.sh)"
"$J" $SOURCES tests/assert.js "$1"
JSCEOF
cat > "$TMPDIR/wietnam-wow/pomiar.sh" <<'POMIAREOF'
D="$TMPDIR/wietnam-wow"
python3 site2/build.py | grep offline > "$D/offline-$1.txt"
{ for t in "od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "od=HAN&do=HAN&miesiac=2027-03&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&koszty=1&lang=pl"; do
    bash tests/print.sh "$t" "$D/$1.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //"; done
  for t in "route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2" "gallery&lang=pl" "guide"; do
    PAGE=wildlife bash tests/print.sh "$t" "$D/$1.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //"; done; } > "$D/pdf-$1.txt"
bash "$D/sondy.sh" > "$D/sondy-$1-en.txt" 2>&1
bash "$D/sondy.sh" pl > "$D/sondy-$1-pl.txt" 2>&1
tail -n 1 "$D/sondy-$1-en.txt" "$D/sondy-$1-pl.txt"; cat "$D/offline-$1.txt"; cut -c1-40 "$D/pdf-$1.txt"
POMIAREOF
bash "$TMPDIR/wietnam-wow/pomiar.sh" przed
```

Oczekiwane: `sondy: 0 z 50 nie przeszło` i `sondy (pl): 0 z 48 nie przeszło` (bez `lang.js`, która działa tylko na linkach bez `lang=`), `offline file 7.1 MB`, potem pięć linii PDF: strona z trasą 14 i 11 stron (trasa z Cao Bằng po polsku z kosztami), podstrona „Na trasie” 9, „Galeria” 6, „Przewodnik” 10; żadna bez stron poniżej 45%.

---

### Zadanie 2: Zdjęcia i typografia

Ustalenia 4, 5, 6 i 12 opisu projektu. Zdjęcie duka z Sơn Trà na górze podstrony (na szerokim ekranie w prawych dwóch trzecich, z maską przechodzącą w ciemne tło, żeby było widać całą twarz, a tytuł stał obok), powolne przybliżanie zdjęć na górze obu stron, wyłanianie zdjęć doczytywanych później z ramki w średnim kolorze zdjęcia (z buildu), `text-wrap: pretty` i zaznaczenie w kolorze akcentu. Cyfr nautycznych nie ma: kroje w `site2/fonts/` nie mają funkcji `onum` (sprawdzone zrzutem w suchej próbie), więc ta część ustalenia 12 odpada.

**Pliki:**
- Zmień: `site2/build.py`, `site2/src/app.js`, `site2/src/template.html`, `site2/src/wild.html`, `site2/src/wildapp.js`, `site2/src/wildphotos.js`
- Testy: `tests/probes/polish.js`, `tests/probes/wild.js`

**Interfejsy:**
- Daje: dane zdjęć z polem `bg` (`'#rrggbb'`) w `PHOTOS` i `WILD_PICS`; `img()` w `app.js` i `wildapp.js` daje `<img class="… ph" data-ph="#rrggbb">`; `paintFrames()` i `shown(img)` w obu skryptach; klasa `live` na `<html>`; `var WILD_HERO = 'duk'` w `wildphotos.js`; `wild_photo_ids()` w `build.py` zwraca `(ids, hero)`; `mean_colour(im)` w `build.py`.

- [ ] **Krok 1: Testy, które nie przechodzą**

Utwórz `tests/probes/polish.js`:

```js
/* The finishing touches on the page with the route (notes/plans/2026-10-20-wykonczenia-projekt.md), in both languages
   (&lang=pl at the end), at 390 and 1400 px, on a trip with Cao Bằng and on one without:
     bash tests/probe.sh tests/probes/polish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
   Headless Chrome calls an IntersectionObserver once, right after the page opens, and runs no CSS transition: the probe
   checks the final state, and the rules of the motion by setting the class live itself. The photos: every photo loaded late
   with its mean colour, unseen till it has loaded (finding 6); the slow zoom of the photo at the top (5); the typography (12). */
(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var root = document.documentElement, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var all = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // the photos (findings 5 and 6)
  var ph = all('img.ph');
  check('every photo loaded late has its mean colour', ph.length > 20 && ph.every(function (i) { return /^#[0-9a-f]{6}$/.test(i.getAttribute('data-ph')) && i.loading === 'lazy'; }), ph.length);
  check('the photo at the top is none of them', !!document.querySelector('.hero > img') && !document.querySelector('.hero img.ph'));
  var was = root.classList.contains('live');
  root.classList.add('live');
  var top = getComputedStyle(document.querySelector('.hero > img'));
  check('live: the photo at the top zooms slowly, once', still ? top.animationName === 'none' : top.animationName === 'kb' && top.animationIterationCount === '1' && parseFloat(top.animationDuration) >= 20,
    top.animationName + ' ' + top.animationDuration);
  var im = document.createElement('img');
  im.className = 'ph'; im.style.transition = 'none'; document.querySelector('main').appendChild(im);
  var wait = getComputedStyle(im).opacity;
  im.classList.add('in');
  check('live: a photo not loaded yet waits unseen, a loaded one shows', wait === '0' && getComputedStyle(im).opacity === '1', wait);
  im.remove(); root.classList.toggle('live', was);

  // the typography (finding 12): no lone last word in a paragraph, a selection in the page's accent
  var p = getComputedStyle(document.querySelector('.hero-lede'));
  check('paragraphs wrap without a lone last word', p.textWrapStyle === 'pretty' || p.textWrap === 'pretty', p.textWrapStyle || p.textWrap);
  check('a selection in the accent colour', Array.prototype.some.call(document.styleSheets, function (s) {
    return Array.prototype.some.call(s.cssRules, function (r) { return /::selection/.test(r.selectorText || '') && /var\(--accent\)/.test(r.cssText); });
  }));

  setTimeout(function () {
    var loaded = ph.filter(function (i) { return i.complete && i.naturalWidth; });
    check('the loaded photos are marked to show', loaded.length > 0 && loaded.every(function (i) { return i.classList.contains('in'); }), loaded.length + ' / ' + ph.length);
    check('their frames lose the mean colour once loaded', loaded.every(function (i) { return !i.parentNode.style.backgroundColor; }));
    done();
  }, 1500);
})();
```

W `tests/probes/wild.js` zamień:

```js
  check('no sideways scroll', document.documentElement.scrollWidth <= window.innerWidth, document.documentElement.scrollWidth + ' > ' + window.innerWidth);
```

na:

```js
  check('no sideways scroll', document.documentElement.scrollWidth <= window.innerWidth, document.documentElement.scrollWidth + ' > ' + window.innerWidth);
  // the photo at the top (finishing touches, finding 4): the red-shanked douc of Sơn Trà the page's width with the title on
  // it and its place in the corner, the tabs under it; on a laptop (1366 × 860) the tabs on the first screen
  var hero = document.querySelector('.w-hero'), him = document.querySelector('.w-hero > img'), hb = hero ? hero.getBoundingClientRect() : {};
  check('the photo at the top: the douc of Sơn Trà, the page’s width, the title and its place on it', !!him && /\/duk(-\d+)?\.jpg$/.test(him.currentSrc) &&
    Math.abs(hb.width - innerWidth) < 1 && hero.contains(document.querySelector('.w-head h1')) && hero.contains(document.querySelector('#lang-switch')) &&
    textOf('.w-where') === 'Sơn Trà, Đà Nẵng' && him.alt === (LANG === 'en' ? WILD_CAPS_EN.duk : WILD_PHOTOS.duk.cap), him && him.currentSrc);
  check('the tabs under the photo', !!hero && document.querySelector('.w-tabs').getBoundingClientRect().top >= hb.bottom - 1);
  if (innerWidth >= 1366 && window.scrollY === 0) check('on a laptop the tabs on the first screen', document.querySelector('.w-tabs').getBoundingClientRect().bottom <= 860,
    Math.round(document.querySelector('.w-tabs').getBoundingClientRect().bottom));
  // the photos loaded late with their mean colour (finding 6); the slow zoom of the photo at the top only with the class
  // live (the first call of an IntersectionObserver)
  var phs = document.querySelectorAll('img.ph');
  check('every photo loaded late has its mean colour, the one at the top none', phs.length > 20 && Array.prototype.every.call(phs, function (i) { return /^#[0-9a-f]{6}$/.test(i.getAttribute('data-ph')); }) &&
    !!him && !him.classList.contains('ph'), phs.length);
  var was = document.documentElement.classList.contains('live');
  document.documentElement.classList.add('live');
  var hz = getComputedStyle(him || document.body).animationName;
  document.documentElement.classList.toggle('live', was);
  check('live: the photo at the top zooms slowly', hz === (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : 'kb'), hz);
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
python3 site2/build.py > /dev/null
bash tests/probe.sh tests/probes/polish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' | grep -v '^ok'
PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 1400 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2' | grep -v '^ok'
```

Oczekiwane: z `polish.js` sześć linii `FAIL` (bez średniego koloru: `FAIL every photo loaded late has its mean colour (0)`, bez przybliżania `(none 0s)`, bez wyłaniania, `text-wrap` `(auto)`, bez koloru zaznaczenia, `FAIL the loaded photos are marked to show (0 / 0)`) i `done, 6 failed`; z `wild.js` `FAIL the photo at the top: the douc of Sơn Trà, …`, `FAIL the tabs under the photo`, `FAIL every photo loaded late has its mean colour, the one at the top none (0)`, `FAIL live: the photo at the top zooms slowly (none)` i `done, 4 failed`.

- [ ] **Krok 3: Kod**

W `site2/build.py` zamień:

```python
    return re.sub(r"url\(fonts/([a-z0-9-]+\.woff2)\)", one, open(os.path.join(FONT_DIR, "fonts.css"), encoding="utf-8").read())


def og_image(im, path, low):
    """A link preview image: the photo cut to OG_SIZE, the cut taken at the height low (0 top, 1 bottom)."""
```

na:

```python
    return re.sub(r"url\(fonts/([a-z0-9-]+\.woff2)\)", one, open(os.path.join(FONT_DIR, "fonts.css"), encoding="utf-8").read())


def mean_colour(im):
    """The photo's mean colour as #rrggbb: its frame shows it till the photo has loaded (finishing touches, finding 6)."""
    return "#%02x%02x%02x" % im.resize((1, 1), Image.BOX).getpixel((0, 0))


def og_image(im, path, low):
    """A link preview image: the photo cut to OG_SIZE, the cut taken at the height low (0 top, 1 bottom)."""
```

W `site2/build.py` zamień:

```python
    photos/wild/."""
```

na:

```python
    photos/wild/. And the photo at the top of the subpage (WILD_HERO, finishing touches, finding 4)."""
```

W `site2/build.py` zamień:

```python
    return ids
```

na:

```python
    hero = re.search(r"^var WILD_HERO = '([a-z]+)';", text, re.M).group(1)
    assert hero in ids, hero
    return ids, hero
```

W `site2/build.py` zamień:

```python
    out/pages/img/wild/ with smaller copies for the tiles."""
    ids = wild_photo_ids()
```

na:

```python
    out/pages/img/wild/ with smaller copies for the tiles; the photo at the top as wide as the one of the page with the route."""
    ids, hero = wild_photo_ids()
```

W `site2/build.py` zamień:

```python
        (w, h), b = encode(im, 1400, 74)
```

na:

```python
        (w, h), b = encode(im, 1920 if pid == hero else 1400, 74)
```

W `site2/build.py` zamień:

```python
        pics[pid] = dict(src="../img/wild/%s.jpg" % pid, w=w, h=h)
```

na:

```python
        pics[pid] = dict(src="../img/wild/%s.jpg" % pid, w=w, h=h, bg=mean_colour(im))
```

W `site2/build.py` zamień:

```python
        for sw in WILD_SMALLER:
```

na:

```python
        for sw in WILD_SMALLER + ((1400,) if pid == hero else ()):
```

W `site2/build.py` zamień:

```python
    page = (template.replace("/* __FONTS__ */", fonts.replace("url(fonts/", "url(../fonts/")).replace("/* __TOKENS__ */", tokens)
```

na:

```python
    top = pics[hero]
    page = (template.replace("__HERO_SRC__", top["src"]).replace("__HERO_SRCSET__", top["srcset"]).replace("__HERO_W__", str(top["w"])).replace("__HERO_H__", str(top["h"]))
            .replace("/* __FONTS__ */", fonts.replace("url(fonts/", "url(../fonts/")).replace("/* __TOKENS__ */", tokens)
```

W `site2/build.py` zamień:

```python
        web[pid] = dict(src="img/%s.jpg" % pid, w=w, h=h)
```

na:

```python
        web[pid] = dict(src="img/%s.jpg" % pid, w=w, h=h, bg=mean_colour(im))
```

W `site2/build.py` zamień:

```python
        off[pid] = dict(src="data:image/jpeg;base64," + base64.b64encode(b).decode(), w=w, h=h)
```

na:

```python
        off[pid] = dict(src="data:image/jpeg;base64," + base64.b64encode(b).decode(), w=w, h=h, bg=web[pid]["bg"])
```

W `site2/src/app.js` zamień:

```js
    syncDaysAll();
```

na:

```js
    syncDaysAll();
    paintFrames();
```

W `site2/src/app.js` zamień:

```js
  // sizes: how wide the photo is drawn, so the browser picks the smallest copy from srcset (the offline file has none)
```

na:

```js
  // sizes: how wide the photo is drawn, so the browser picks the smallest copy from srcset (the offline file has none); the
  // photo comes in once loaded (class ph, paintFrames)
```

W `site2/src/app.js` zamień:

```js
    return '<img class="' + (cls || '') + '" src="' + p.src + '" alt="' + esc(caption(id)) + '" width="' + p.w + '" height="' + p.h +
      '" loading="lazy" decoding="async"' + (p.srcset && sizes ? ' srcset="' + p.srcset + '" sizes="' + sizes + '"' : '') + '>';
```

na:

```js
    return '<img class="' + (cls ? cls + ' ' : '') + 'ph" src="' + p.src + '" alt="' + esc(caption(id)) + '" width="' + p.w + '" height="' + p.h +
      '" data-ph="' + p.bg + '" loading="lazy" decoding="async"' + (p.srcset && sizes ? ' srcset="' + p.srcset + '" sizes="' + sizes + '"' : '') + '>';
```

W `site2/src/app.js` zamień:

```js
  }

  /* ---------- the footer and the texts in the template ---------- */
```

na:

```js
  }

  /* ---------- the finishing touches (notes/plans/2026-10-20-wykonczenia-projekt.md) ---------- */
  /* The page moves only where the browser runs IntersectionObserver: its first call marks <html> live (template.html: the
     slow zoom of the photo at the top, the photos coming in). */
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { document.documentElement.classList.add('live'); o.disconnect(); }).observe($('.hero'));
  /* A photo loaded late comes in softly (finding 6): till it has loaded, its frame shows the photo's mean colour (data-ph,
     from build.py) and the photo waits unseen; once loaded (or failed), class in, and the frame drops the colour. */
  function shown(im) { im.classList.add('in'); im.parentNode.style.backgroundColor = ''; }
  function paintFrames() {
    document.querySelectorAll('img.ph:not(.in)').forEach(function (im) { if (im.complete) shown(im); else im.parentNode.style.backgroundColor = im.getAttribute('data-ph'); });
  }
  ['load', 'error'].forEach(function (k) {
    document.addEventListener(k, function (e) { if (e.target.classList && e.target.classList.contains('ph')) shown(e.target); }, true);
  });

  /* ---------- the footer and the texts in the template ---------- */
```

W `site2/src/template.html` zamień:

```html
p, ul, ol { margin: 0; }
```

na:

```html
p, ul, ol { margin: 0; }
p { text-wrap: pretty; }
::selection { background: var(--accent); color: var(--surface); }
```

W `site2/src/template.html` zamień:

```html
.hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; }
```

na:

```html
.hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; transform-origin: center 55%; }
```

W `site2/src/template.html` zamień:

```html
.lang-switch span { opacity: 0.7; }
```

na:

```html
.lang-switch span { opacity: 0.7; }

/* The finishing touches (notes/plans/2026-10-20-wykonczenia-projekt.md): the motion starts with the class live on <html>,
   which app.js sets on the first call of an IntersectionObserver; without it (no JavaScript, an old browser) all stands
   still. The photo at the top zooms slowly, once (finding 5); a photo loaded late waits unseen in its frame, which shows the
   photo's mean colour, and comes in once loaded (class in, finding 6). */
.live .hero > img { animation: kb 24s ease-out forwards; }
@keyframes kb { from { transform: none; } to { transform: scale(1.08); } }
img.ph { transition: opacity .4s ease-out; }
@media screen { .live img.ph:not(.in) { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .live .hero > img { animation: none; } }
```

W `site2/src/wild.html` zamień:

```html
p, ul { margin: 0; }
```

na:

```html
p, ul { margin: 0; }
p { text-wrap: pretty; }
::selection { background: var(--accent); color: var(--surface); }
```

W `site2/src/wild.html` zamień:

```html
/* heading and tabs */
```

na:

```html
/* heading and tabs: the photo at the top (finishing touches, finding 4), the way back, EN · PL and the title on it, as on the
   page with the route; a little lower than there, so on a laptop (1366 × 860) the tabs under it stand on the first screen */
```

W `site2/src/wild.html` zamień:

```html
.w-head .wrap { position: relative; padding-block: 18px 0; }
```

na:

```html
.w-hero { position: relative; overflow: hidden; background: var(--photo-bg); }
.w-hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 28%; transform-origin: 50% 28%; }
.w-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(var(--scrim), 0.5) 0%, rgba(var(--scrim), 0.1) 26%, rgba(var(--scrim), 0.2) 50%, var(--shade) 100%); }
.w-hero-in { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 40px; min-height: clamp(380px, 54vh, 580px);
  padding-block: 6px 34px; color: var(--on-photo); text-shadow: 0 1px 14px rgba(var(--black), 0.4); }
.w-where { position: absolute; z-index: 1; right: var(--gutter); bottom: 10px; font: 12px var(--mono); color: var(--on-photo); opacity: 0.85; }
/* on a wide screen the square photo stands in the right two thirds, fading into the dark on its left, so the douc keeps its
   face and shoulders and the title stands beside it, not on it (a crop the width of the screen showed its eyes alone) */
@media (min-width: 1101px) {
  .w-hero > img { left: auto; width: 66%; -webkit-mask-image: linear-gradient(90deg, transparent, #000 36%); mask-image: linear-gradient(90deg, transparent, #000 36%); }
}
```

W `site2/src/wild.html` zamień:

```html
.w-top a { display: inline-flex; align-items: center; min-height: 44px; font-size: 15px; }
.lang-switch { display: flex; align-items: center; font: 500 13px var(--mono); letter-spacing: 0.08em; color: var(--muted); }
.lang-switch button { min-width: 44px; min-height: 44px; padding: 0 8px; border: 0; background: none; color: inherit; font: inherit; letter-spacing: inherit; cursor: pointer; }
.lang-switch button[aria-pressed="true"] { color: var(--ink); text-decoration: underline 2px; text-underline-offset: 5px; }
.w-eyebrow { margin-top: 8px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.w-head h1 { font-size: clamp(34px, 6vw, 56px); margin-top: 4px; }
.w-lead { max-width: 62ch; margin-top: 10px; color: var(--muted); }
.w-tabs { display: flex; gap: 4px; margin-top: 18px; overflow-x: auto; }
```

na:

```html
.w-top a { display: inline-flex; align-items: center; min-height: 44px; font-size: 15px; color: var(--on-photo); }
.lang-switch { display: flex; align-items: center; font: 500 13px var(--mono); letter-spacing: 0.08em; color: var(--on-photo); }
.lang-switch button { min-width: 44px; min-height: 44px; padding: 0 8px; border: 0; background: none; color: inherit; font: inherit; letter-spacing: inherit; cursor: pointer; opacity: 0.78; }
.lang-switch button[aria-pressed="true"] { opacity: 1; text-decoration: underline 2px; text-underline-offset: 5px; }
.w-eyebrow { font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.85; }
.w-head h1 { font-size: clamp(40px, 6.6vw, 76px); font-weight: 400; letter-spacing: -0.02em; margin-top: 6px; }
.w-lead { max-width: 58ch; margin-top: 10px; font-size: clamp(16px, 1.4vw, 18px); opacity: 0.94; }
.w-tabs { display: flex; gap: 4px; margin-top: 6px; overflow-x: auto; }
```

W `site2/src/wild.html` zamień:

```html
.w-lit { border-color: var(--ink) !important; box-shadow: 0 0 0 1px var(--ink); }

/* the photo viewer */
```

na:

```html
.w-lit { border-color: var(--ink) !important; box-shadow: 0 0 0 1px var(--ink); }

/* the finishing touches (notes/plans/2026-10-20-wykonczenia-projekt.md): the motion starts with the class live on <html>,
   which wildapp.js sets on the first call of an IntersectionObserver; without it (no JavaScript, an old browser) all stands
   still. The
   photo at the top zooms slowly, once (finding 5); a photo loaded late waits unseen in its frame, which shows the photo's
   mean colour, and comes in once loaded (class in, finding 6) */
.live .w-hero > img { animation: kb 24s ease-out forwards; }
@keyframes kb { from { transform: none; } to { transform: scale(1.08); } }
img.ph { transition: opacity .4s ease-out; }
@media screen { .live img.ph:not(.in) { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .live .w-hero > img { animation: none; } }

/* the photo viewer */
```

W `site2/src/wild.html` zamień:

```html
  .w-tabs, .lang-switch, #w-back, .w-addbox, .w-drops, .w-add, .w-viewer { display: none !important; }
```

na:

```html
  .w-tabs, .lang-switch, #w-back, .w-addbox, .w-drops, .w-add, .w-viewer, .w-hero > img, .w-hero::after, .w-where { display: none !important; }
  .w-hero { background: none; }
  .w-hero-in { min-height: 0; padding-block: 0 4mm; color: var(--ink); text-shadow: none; }
```

W `site2/src/wild.html` zamień:

```html
<header class="w-head">
```

na:

```html
<header class="w-head">
  <div class="w-hero">
    <img id="w-hero-img" src="__HERO_SRC__" srcset="__HERO_SRCSET__" sizes="(max-width: 700px) 200vw, 100vw" alt="" width="__HERO_W__" height="__HERO_H__" fetchpriority="high">
    <span class="w-where">Sơn Trà, Đà Nẵng</span>
    <div class="wrap w-hero-in">
      <div class="w-top"><a id="w-back" href="../"></a>
        <div class="lang-switch" id="lang-switch" role="group" data-i18n-aria="lang.aria"><button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button><span aria-hidden="true">·</span><button type="button" data-lang="pl" lang="pl" aria-pressed="false">PL</button></div>
      </div>
      <div><p class="w-eyebrow" data-i18n="w.eyebrow"></p>
        <h1 data-i18n="w.h1"></h1>
        <p class="w-lead" data-i18n="w.lead"></p></div>
    </div>
  </div>
```

W `site2/src/wild.html` zamień:

```html
  <div class="wrap">
    <div class="w-top"><a id="w-back" href="../"></a>
      <div class="lang-switch" id="lang-switch" role="group" data-i18n-aria="lang.aria"><button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button><span aria-hidden="true">·</span><button type="button" data-lang="pl" lang="pl" aria-pressed="false">PL</button></div>
    </div>
    <p class="w-eyebrow" data-i18n="w.eyebrow"></p>
    <h1 data-i18n="w.h1"></h1>
    <p class="w-lead" data-i18n="w.lead"></p>
```

na:

```html
  <div class="wrap">
```

W `site2/src/wildapp.js` zamień:

```js
  // a photo; style: its frame on a card (WILD_CROPS), or none
```

na:

```js
  // a photo; style: its frame on a card (WILD_CROPS), or none; it comes in once loaded (class ph, paintFrames)
```

W `site2/src/wildapp.js` zamień:

```js
    return '<img src="' + esc(p.src) + '"' + (p.srcset ? ' srcset="' + esc(p.srcset) + '" sizes="' + sizes + '"' : '') + ' width="' + p.w + '" height="' + p.h +
      '" alt="' + esc(caption(id)) + '"' + (style ? ' style="' + style + '"' : '') + ' loading="lazy" decoding="async">';
```

na:

```js
    return '<img class="ph" src="' + esc(p.src) + '"' + (p.srcset ? ' srcset="' + esc(p.srcset) + '" sizes="' + sizes + '"' : '') + ' width="' + p.w + '" height="' + p.h +
      '" alt="' + esc(caption(id)) + '"' + (style ? ' style="' + style + '"' : '') + ' data-ph="' + p.bg + '" loading="lazy" decoding="async">';
```

W `site2/src/wildapp.js` zamień:

```js
    renderRoute(); renderGallery(); renderGuide(); renderMap(); showTab();
```

na:

```js
    renderRoute(); renderGallery(); renderGuide(); renderMap(); showTab(); paintFrames();
```

W `site2/src/wildapp.js` zamień:

```js
    document.title = T('w.doc.title');
```

na:

```js
    document.title = T('w.doc.title');
    $('#w-hero-img').alt = caption(WILD_HERO);
```

W `site2/src/wildapp.js` zamień:

```js
    $('#wv-cap').innerHTML = x.nophoto ? '' : (SP[id] ? esc(caption(id)) + ' · ' : '') + esc(WILD_PHOTOS[id].artist) + ' · <a href="' + esc(WILD_PHOTOS[id].page) + '" target="_blank" rel="noopener">' + esc(WILD_PHOTOS[id].license === 'Public domain' ? UI[lang]['ft.pd'] : WILD_PHOTOS[id].license) + '</a>';
```

na:

```js
    $('#wv-cap').innerHTML = x.nophoto ? '' : (SP[id] ? esc(caption(id)) + ' · ' : '') + esc(WILD_PHOTOS[id].artist) + ' · <a href="' + esc(WILD_PHOTOS[id].page) + '" target="_blank" rel="noopener">' + esc(WILD_PHOTOS[id].license === 'Public domain' ? UI[lang]['ft.pd'] : WILD_PHOTOS[id].license) + '</a>';
    paintFrames();
```

W `site2/src/wildapp.js` zamień:

```js
  }

  /* ---------- wiring ---------- */
```

na:

```js
  }

  /* ---------- the finishing touches (notes/plans/2026-10-20-wykonczenia-projekt.md) ---------- */
  /* The page moves only where the browser runs IntersectionObserver: its first call marks <html> live (wild.html: the slow
     zoom of the photo at the top, the photos coming in). */
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { document.documentElement.classList.add('live'); o.disconnect(); }).observe($('.w-head'));
  /* A photo loaded late comes in softly (finding 6): till it has loaded, its frame shows the photo's mean colour (data-ph,
     from build.py) and the photo waits unseen; once loaded (or failed), class in, and the frame drops the colour. */
  function shown(im) { im.classList.add('in'); im.parentNode.style.backgroundColor = ''; }
  function paintFrames() {
    all('img.ph:not(.in)').forEach(function (im) { if (im.complete) shown(im); else im.parentNode.style.backgroundColor = im.getAttribute('data-ph'); });
  }
  ['load', 'error'].forEach(function (k) {
    document.addEventListener(k, function (e) { if (e.target.classList && e.target.classList.contains('ph')) shown(e.target); }, true);
  });

  /* ---------- wiring ---------- */
```

W `site2/src/wildphotos.js` zamień:

```js
   proportions rather than a cut animal); every other card photo takes the usual frame. */
var WILD_CROPS = {
```

na:

```js
   proportions rather than a cut animal); every other card photo takes the usual frame. */
// the photo at the top of the subpage (finishing touches, finding 4): the red-shanked douc of Sơn Trà, as in the link preview
var WILD_HERO = 'duk';

var WILD_CROPS = {
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py > /dev/null
for w in 390 1400; do bash tests/probe.sh tests/probes/polish.js $w 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2&lang=pl' | tail -n 1
  PAGE=wildlife bash tests/probe.sh tests/probes/wild.js $w 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2' | tail -n 1; done
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools | grep -v "var NB"
```

Oczekiwane: `ALL PASS`, cztery razy `done, all checks ok`; grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/build.py site2/src/app.js site2/src/template.html site2/src/wild.html site2/src/wildapp.js site2/src/wildphotos.js tests/probes/polish.js tests/probes/wild.js
git commit -q -F - <<'EOF'
Wykończenia, zadanie 2: zdjęcia i typografia. Na górze podstrony zwierząt duk wspaniały z Sơn Trà (na szerokim ekranie w prawych dwóch trzecich, z przejściem w ciemne tło, żeby było widać całą twarz), zdjęcia na górze obu stron powoli się przybliżają, a zdjęcia doczytywane później pojawiają się miękko, do tego czasu w ramce w średnim kolorze zdjęcia (build.py); akapity bez samotnego ostatniego słowa i zaznaczenie w kolorze akcentu. Ruch tylko z klasą live, którą strona dostaje od pierwszego wywołania IntersectionObservera; nowa sonda polish.js (reguły ruchu sprawdza, sama ustawiając tę klasę), sonda wild.js ze zdjęciem na górze

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff dc4ac2c HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 3: Album w podglądzie zdjęć zwierząt

Ustalenie 7. Strzałki ‹ ›, klawisze ← → i przesunięcie palcem (od 50 px) przechodzą przez zdjęcia zakładki, z której podgląd otwarto: w „Na trasie” zdjęcia kart, w „Galerii” kafelki, w „Przewodniku” miniaturki; każdy gatunek raz, bez gatunków bez zdjęcia (chyba że to ten otwarty). Licznik „3 / 23” w rogu zdjęcia; przy jednym zdjęciu bez strzałek i licznika. Kafelki Galerii pod myszą przybliżają się do 1,04 (tylko `@media (hover: hover)`).

**Pliki:**
- Zmień: `site2/src/wild.html`, `site2/src/wildapp.js`
- Testy: `tests/probes/wild.js`

**Interfejsy:**
- Korzysta: `paintFrames()` z zadania 2.
- Daje: w `wildapp.js` `albumOf(id, from) → [id]`, `showPhoto()`, `step(k)`; w `wild.html` `#wv-prev`, `#wv-next`, `#wv-count` w `.wv-stage`.

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/probes/wild.js` zamień:

```js
  check('a tile opens the viewer with its species', d.open && document.querySelector('#wv-name').textContent.indexOf(b.querySelector('b').textContent) === 0 && document.querySelector('#wv-why').textContent.length > 20);
```

na:

```js
  check('a tile opens the viewer with its species', d.open && document.querySelector('#wv-name').textContent.indexOf(b.querySelector('b').textContent) === 0 && document.querySelector('#wv-why').textContent.length > 20);
  // the album (finishing touches, finding 7): ‹ ›, the arrow keys and a swipe go through the photos of the tab it was opened
  // in, each once, the species without a photo left out; a counter says where
  var album = function (sel) {
    var ids = [];
    Array.prototype.forEach.call(document.querySelectorAll(sel + ' [data-view]'), function (e) { var x = e.getAttribute('data-view'); if (ids.indexOf(x) < 0 && !(WILD[x] && WILD[x].nophoto)) ids.push(x); });
    return ids;
  }, gal = album('#p-gallery'), sp = LANG === 'en' ? WILD_EN : WILD;
  check('the viewer: an album of the tab’s photos, at the first', textOf('#wv-count') === '1 / ' + gal.length && document.querySelector('#wv-prev').disabled && !document.querySelector('#wv-next').disabled, textOf('#wv-count'));
  document.querySelector('#wv-next').click();
  check('› shows the next photo', textOf('#wv-count') === '2 / ' + gal.length && document.querySelector('#wv-name').textContent.indexOf(sp[gal[1]].name) === 0, textOf('#wv-count'));
  d.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  d.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
  d.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
  check('→ and ← go through it, not past its first photo', textOf('#wv-count') === '1 / ' + gal.length && document.querySelector('#wv-name').textContent.indexOf(sp[gal[0]].name) === 0, textOf('#wv-count'));
  var swipe = function (dx) {
    var t0 = new Touch({ identifier: 1, target: d, clientX: 200, clientY: 200 }), t1 = new Touch({ identifier: 1, target: d, clientX: 200 + dx, clientY: 205 });
    d.dispatchEvent(new TouchEvent('touchstart', { touches: [t0], changedTouches: [t0], bubbles: true }));
    d.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [t1], bubbles: true }));
  };
  swipe(-120);
  check('a swipe to the left shows the next photo', textOf('#wv-count') === '2 / ' + gal.length, textOf('#wv-count'));
```

W `tests/probes/wild.js` zamień:

```js
  check('a thumbnail opens the viewer with its species', document.querySelector('#w-viewer').open && document.querySelector('#wv-name').textContent.indexOf(WILD[tb0.getAttribute('data-view')] && (LANG === 'en' ? WILD_EN : WILD)[tb0.getAttribute('data-view')].name) === 0);
```

na:

```js
  check('a thumbnail opens the viewer with its species', document.querySelector('#w-viewer').open && document.querySelector('#wv-name').textContent.indexOf(WILD[tb0.getAttribute('data-view')] && (LANG === 'en' ? WILD_EN : WILD)[tb0.getAttribute('data-view')].name) === 0);
  check('the field guide’s album: its thumbnails', textOf('#wv-count') === '1 / ' + album('#p-guide').length, textOf('#wv-count') + ' / ' + album('#p-guide').length);
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
python3 site2/build.py > /dev/null
PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 1400 'gallery&lang=pl' 2>&1 | grep -v '^ok'
```

Oczekiwane: `FAIL the viewer: an album of the tab’s photos, at the first ()` i `probe.sh: the probe stopped before done()` (strona nie ma jeszcze strzałek albumu).

- [ ] **Krok 3: Kod**

W `site2/src/wild.html` zamień:

```html
.w-tile-photo img, .w-tile .w-nophoto { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
```

na:

```html
.w-tile-photo img, .w-tile .w-nophoto { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
/* a tile's photo comes a little closer under the mouse (finishing touches, finding 7) */
.w-tile-photo { overflow: hidden; }
@media (hover: hover) {
  .w-tile-photo img { transition: transform .4s ease-out, opacity .4s ease-out; }
  .w-tile:hover .w-tile-photo img { transform: scale(1.04); }
}
```

W `site2/src/wild.html` zamień:

```html
.w-viewer img { width: 100%; max-height: 70vh; object-fit: contain; background: var(--photo-bg); }
```

na:

```html
.w-viewer img { width: 100%; max-height: 70vh; object-fit: contain; background: var(--photo-bg); }
/* the album (finishing touches, finding 7): ‹ › over the photo, the counter in its corner */
.wv-stage { position: relative; }
.wv-nav { position: absolute; top: 50%; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; border: 0; border-radius: 22px; background: var(--ctl-bg); color: var(--ctl-ink); cursor: pointer; }
.wv-nav:disabled { opacity: 0.35; cursor: default; }
.wv-prev { left: 10px; }
.wv-next { right: 10px; }
.wv-count { position: absolute; top: 12px; left: 12px; padding: 2px 9px; border-radius: 999px; background: var(--badge-bg); color: var(--on-photo); font: 500 12px var(--mono); }
```

W `site2/src/wild.html` zamień:

```html
  <div id="wv-photo"></div>
```

na:

```html
  <div class="wv-stage"><div id="wv-photo"></div>
    <button type="button" class="wv-nav wv-prev" id="wv-prev" data-i18n-aria="g.prev"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg></button>
    <button type="button" class="wv-nav wv-next" id="wv-next" data-i18n-aria="g.next"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></button>
    <span class="wv-count" id="wv-count"></span></div>
```

W `site2/src/wildapp.js` zamień:

```js
  var opener = null;
```

na:

```js
  /* An album (finishing touches, finding 7): the photos of the tab it was opened in, in their order there, each once, the
     species without a photo left out (unless opened); ‹ ›, the arrow keys and a swipe go through it, a counter says where. */
  var opener = null, album = [], at = 0;
  function albumOf(id, from) {
    var ids = [], tab = from && from.closest('.w-panels > section');
    (tab ? all('#' + tab.id + ' [data-view]') : []).forEach(function (b) {
      var x = b.getAttribute('data-view');
      if (ids.indexOf(x) < 0 && (!SP[x] || !SP[x].nophoto || x === id)) ids.push(x);
    });
    return ids.indexOf(id) > -1 ? ids : [id];
  }
  function openViewer(id, from) {
    var d = $('#w-viewer');
    opener = from; album = albumOf(id, from); at = album.indexOf(id);
    showPhoto();
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  }
  function step(k) {
    if (at + k < 0 || at + k >= album.length) return;
    at += k;
    showPhoto();
  }
```

W `site2/src/wildapp.js` zamień:

```js
  function openViewer(id, from) {
    var x = SP[id] || { nophoto: false }, d = $('#w-viewer');
    opener = from;
```

na:

```js
  function showPhoto() {
    var id = album[at], x = SP[id] || { nophoto: false };
    $('#wv-count').textContent = (at + 1) + ' / ' + album.length;
    $('#wv-prev').disabled = at === 0; $('#wv-next').disabled = at === album.length - 1;
    $('#wv-count').hidden = $('#wv-prev').hidden = $('#wv-next').hidden = album.length < 2;
```

W `site2/src/wildapp.js` zamień:

```js
    paintFrames();
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
```

na:

```js
    paintFrames();
```

W `site2/src/wildapp.js` zamień:

```js
    if (e.target.id === 'wv-close' || e.target.id === 'w-viewer') closeViewer();
```

na:

```js
    if (e.target.id === 'wv-close' || e.target.id === 'w-viewer') closeViewer();
    var nav = e.target.closest ? e.target.closest('.wv-nav') : null;
    if (nav) step(nav.id === 'wv-next' ? 1 : -1);
```

W `site2/src/wildapp.js` zamień:

```js
  $('#w-viewer').addEventListener('close', function () { if (opener) opener.focus(); opener = null; });
```

na:

```js
  $('#w-viewer').addEventListener('close', function () { if (opener) opener.focus(); opener = null; });
  $('#w-viewer').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); }
  });
  var x0 = null;
  $('#w-viewer').addEventListener('touchstart', function (e) { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
  $('#w-viewer').addEventListener('touchend', function (e) {
    if (x0 == null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) >= 50) step(dx < 0 ? 1 : -1);
  });
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py > /dev/null
for h in 'gallery&lang=pl' 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2' 'guide'; do for w in 390 1400; do
  PAGE=wildlife bash tests/probe.sh tests/probes/wild.js $w "$h" | tail -n 1; done; done
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools | grep -v "var NB"
```

Oczekiwane: `ALL PASS`, sześć razy `done, all checks ok`; grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/wild.html site2/src/wildapp.js tests/probes/wild.js
git commit -q -F - <<'EOF'
Wykończenia, zadanie 3: podgląd zdjęć na podstronie zwierząt jako album. Strzałki ‹ ›, klawisze ← → i przesunięcie palcem przechodzą przez zdjęcia zakładki, z której podgląd otwarto (każdy gatunek raz, bez gatunków bez zdjęcia), licznik w rogu mówi, które to zdjęcie; teksty strzałek z podglądu strony z trasą. Kafelki Galerii pod myszą lekko się przybliżają; sonda wild.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 0c2b240 HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 4: Pasek w „Dzień po dniu” i zakończenie strony

Ustalenia 8–10 (z odpowiedziami po przeglądzie opisu). W czasie przewijania „Dzień po dniu” pasek u góry zamiast podsumowania ustawień pokazuje dzień, przez który idzie środek widocznej części pod paskiem (na telefonie pod małą mapą): kropka w kolorze miejsca i „Dzień 6 · Hội An”, przy przejeździe jego dzień i końce, nad nagłówkiem i zdjęciami postoju jego pierwszy dzień, przy wylocie „Dzień 15 · Wylot”; nad dniami i pod nimi znowu podsumowanie, z krótkim przenikaniem w CSS. Pod „Przed wyjazdem” zachód słońca nad Pù Luông na całą szerokość, z ostatnim dniem trasy, tytułem, zdaniem i trzema przyciskami; poza wydrukiem.

**Pliki:**
- Zmień: `site2/build.py`, `site2/src/app.js`, `site2/src/en/ui.js`, `site2/src/photos.js`, `site2/src/template.html`, `site2/src/ui.js`
- Testy: `tests/data.test.js`, `tests/probes/polish.js`

**Interfejsy:**
- Korzysta: `img()` i `paintFrames()` z zadania 2.
- Daje: `var FINALE_PHOTO = 'puluong_1'` w `photos.js`; `photo_ids()` w `build.py` zwraca `(ids, hero, finale)`; w `app.js` `renderFinale()` i `syncDay()` (na każde `scroll` i `resize`, po każdym `render`); `data-short` przy każdym `section.stop` (też `#stop-home`, z napisem wylotu); w `template.html` `#sum-day` obok `#sum-text` w `.sum-swap`, klasa `in-days` na `#secnav`, `section#finale` z `#finale-photo`, `#end-day`, `#end-h2`, `#end-copy`, `#end-pdf`, `#end-status`, `#end-fallback`; klucze `end.h2`, `end.p`, `end.change`.

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/data.test.js` zamień:

```js
  need(PHOTO_META[HERO_PHOTO], 'the hero photo ' + HERO_PHOTO + ' has its credits');
```

na:

```js
  need(PHOTO_META[HERO_PHOTO], 'the hero photo ' + HERO_PHOTO + ' has its credits');
  // the photo at the end of the page (finishing touches, finding 9) is one of a place's photos, so the list of the photos
  // names its author
  need(PHOTO_META[FINALE_PHOTO] && Object.keys(CONTENT).some(function (id) { return CONTENT[id].photos.indexOf(FINALE_PHOTO) > -1; }),
    'the photo at the end of the page ' + FINALE_PHOTO + ' has its credits and is in a gallery');
```

W `tests/probes/polish.js` zamień:

```js
   with its mean colour, unseen till it has loaded (finding 6); the slow zoom of the photo at the top (5); the typography (12). */
```

na:

```js
   with its mean colour, unseen till it has loaded (finding 6); the slow zoom of the photo at the top (5); the typography (12).
   The bar at the top over the days (8): the day across the middle of the screen under it, the summary over and under the
   days. The end of the page (9 and 10): the sunset over Pù Luông, the last day of the trip, the title, the sentence and
   three buttons, not on paper. */
```

W `tests/probes/polish.js` zamień:

```js
    done();
```

na:

```js
    days();
```

W `tests/probes/polish.js` zamień:

```js
  }, 1500);
```

na:

```js
  }, 1500);

  // the bar over the days (finding 8): an element brought just above the line in the middle of the screen under the bar (and
  // under the small map on a phone), as the page counts it; headless Chrome sends no scroll event of its own, so the probe does
  var S = window.__trip.state, V = localContent(CONTENT, LANG === 'en' ? CONTENT_EN : null);
  function line() {
    var mini = document.getElementById('minimap');
    return (document.getElementById('secnav').getBoundingClientRect().bottom + (mini.classList.contains('on') ? mini.offsetHeight : 0) + innerHeight) / 2;
  }
  function bring(el) {
    for (var k = 0; k < 3; k++) { window.scrollBy(0, el.getBoundingClientRect().top - (line() - 12)); window.dispatchEvent(new Event('scroll')); }
  }
  function days() {
    var bar = document.getElementById('secnav'), sum = textOf('#sum-text'), day = function () { return textOf('#sum-day'); };
    var fold = function (t) { return t.replace(/\s+/g, ' ').trim(); };
    var s2 = S.route.stops[1], li = document.getElementById('day-' + (s2.end > s2.start ? s2.start + 1 : s2.start));
    bring(li);
    var n = +li.id.slice(4);
    check('over a day: the bar says the day and its place', bar.classList.contains('in-days') && day() === UI[LANG].day + ' ' + n + ' · ' + V[s2.id].short &&
      document.querySelector('#sum-day .dot').style.getPropertyValue('--c') === document.getElementById('stop-2').style.getPropertyValue('--c'), day());
    check('the summary of the settings stays, hidden', textOf('#sum-text') === sum && getComputedStyle(document.getElementById('sum-text')).visibility === 'hidden');
    bring(document.getElementById('stop-2'));
    check('over a stay’s heading and photos: its first day', day() === UI[LANG].day + ' ' + s2.start + ' · ' + V[s2.id].short, day());
    var leg = document.getElementById('stop-2').previousElementSibling;
    bring(leg);
    check('over a journey: its day and its ends', day() === fold(leg.querySelector('.leg-day').textContent + ' · ' + leg.querySelector('.leg-route').textContent), day());
    bring(document.getElementById('stop-home').querySelector('.day'));
    check('over the last day: the departure', day() === UI[LANG].day + ' ' + S.route.days + ' · ' + UI[LANG].flyhome, day());
    bring(document.getElementById('shape'));
    check('over the days: the summary again', !bar.classList.contains('in-days') && getComputedStyle(document.getElementById('sum-text')).visibility === 'visible');
    bring(document.getElementById('before'));
    check('under the days: the summary again', !bar.classList.contains('in-days'));
    window.scrollTo(0, 0);
    end();
  }

  // the end of the page (findings 9 and 10)
  function end() {
    var f = document.getElementById('finale'), im = f && f.querySelector('.finale-photo img');
    check('the end of the page: under „Before you go”, over the footer', !!f && !!(document.getElementById('before').compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      f.nextElementSibling === document.querySelector('footer'));
    check('its photo: the sunset over Pù Luông, the page’s width, loaded late', !!im && /puluong_1(-\d+)?\.jpg$/.test(im.currentSrc || im.src) && im.classList.contains('ph') &&
      Math.abs(f.getBoundingClientRect().width - innerWidth) < 1 && textOf('.finale-where') === 'Pù Luông' && im.alt === (LANG === 'en' ? PHOTO_CAPS_EN.puluong_1 : PHOTO_META.puluong_1.cap), im && (im.currentSrc || im.src));
    var r = S.route, st = S.st;
    check('the last day of the trip over the title', textOf('#end-day') === UI[LANG].day + ' ' + r.days + ' · ' + AIRPORTS[st.to].name + ' · ' + UI[LANG].flyhome, textOf('#end-day'));
    check('the title, the sentence and three buttons', textOf('#end-h2') === UI[LANG]['end.h2'] && textOf('.finale-p') === UI[LANG]['end.p'] && textOf('#end-copy') === UI[LANG]['copy.btn'] &&
      textOf('#end-pdf') === UI[LANG]['pdf.btn'] && f.querySelector('a[href="#settings"]').textContent === UI[LANG]['end.change']);
    document.getElementById('end-copy').click();
    setTimeout(function () {
      var box = document.getElementById('end-fallback');
      check('copy at the end: the plan copied, or the text to copy under the buttons', (textOf('#end-status') === UI[LANG]['copy.ok'] || (!box.hidden && box.value.indexOf(SITE_URL) > -1 && textOf('#end-status') === UI[LANG]['copy.fail'])) &&
        textOf('#copy-status') === '', textOf('#end-status'));
      var printCss = [];
      Array.prototype.forEach.call(document.styleSheets, function (s) {
        Array.prototype.forEach.call(s.cssRules, function (x) { if (x.media && /print/.test(x.media.mediaText)) Array.prototype.forEach.call(x.cssRules, function (y) { printCss.push(y.cssText); }); });
      });
      var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
      check('not on paper', !f.checkVisibility());
      ps.remove();
      done();
    }, 400);
  }
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | grep -m 1 Exception
python3 site2/build.py > /dev/null
bash tests/probe.sh tests/probes/polish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 2>&1 | grep -v '^ok'
```

Oczekiwane: `Exception: ReferenceError: Can't find variable: FINALE_PHOTO` (data.test.js), a z sondy pięć linii `FAIL over a day: …`, `FAIL the summary of the settings stays, hidden`, `FAIL over a stay’s heading …`, `FAIL over a journey: …`, `FAIL over the last day: the departure ()`, potem cztery linie `FAIL` zakończenia (`FAIL the end of the page: under „Before you go”, over the footer` i dalsze) i `probe.sh: the probe stopped before done()` (strona nie ma jeszcze przycisku `#end-copy`).

- [ ] **Krok 3: Kod**

W `site2/build.py` zamień:

```python
    """The photo ids in photos.js (one entry per line, '  id: { cap: …') and the hero photo."""
```

na:

```python
    """The photo ids in photos.js (one entry per line, '  id: { cap: …'), the hero photo and the photo at the end of the page
    (finishing touches, finding 9)."""
```

W `site2/build.py` zamień:

```python
    assert "nieznany" not in text, "photos.js: a photo without its real author"
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert hero in ids, hero
    return ids, hero


def main():
```

na:

```python
    assert "nieznany" not in text, "photos.js: a photo without its real author"
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert hero in ids, hero
    finale = re.search(r"^var FINALE_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert finale in ids, finale
    return ids, hero, finale


def main():
```

W `site2/build.py` zamień:

```python
    ids, hero = photo_ids()
```

na:

```python
    ids, hero, finale = photo_ids()
    big = (hero, finale)   # the photos the page's width: at the top and at the end
```

W `site2/build.py` zamień:

```python
        im = Image.open(os.path.join(PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1920 if pid == hero else 1400, 74)
```

na:

```python
        im = Image.open(os.path.join(PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1920 if pid in big else 1400, 74)
```

W `site2/build.py` zamień:

```python
        for sw in SMALLER["hero" if pid == hero else "photo"]:
```

na:

```python
        # the photo at the end is a place's photo too, so it keeps the small copies of the galleries and of the list of the
        # places off the trip, and gets the large one of the photo at the top
        for sw in SMALLER["hero"] if pid == hero else SMALLER["photo"] + SMALLER["hero"][-1:] if pid == finale else SMALLER["photo"]:
```

W `site2/build.py` zamień:

```python
        (w, h), b = encode(im, *OFFLINE["hero" if pid == hero else "photo"])
```

na:

```python
        (w, h), b = encode(im, *OFFLINE["hero" if pid in big else "photo"])
```

W `site2/src/app.js` zamień:

```js
    $('#copy-status').textContent = '';
    $('#copy-fallback').hidden = true;
```

na:

```js
    renderFinale();
    $('#copy-status').textContent = $('#end-status').textContent = '';
    $('#copy-fallback').hidden = $('#end-fallback').hidden = true;
```

W `site2/src/app.js` zamień:

```js
    paintFrames();
```

na:

```js
    paintFrames();
    syncDay();
  }

  /* The end of the page (finishing touches, finding 9): the sunset over Pù Luông (FINALE_PHOTO), over the title the trip's
     last day, as "Dzień 15 · Hà Nội · Wylot". */
  function renderFinale() {
    $('#finale-photo').innerHTML = img(FINALE_PHOTO, '', '(max-width: 700px) 200vw, 100vw');
    $('#end-day').textContent = T('day') + ' ' + state.route.days + ' · ' + AIRPORTS[state.st.to].name + ' · ' + T('flyhome');
```

W `site2/src/app.js` zamień:

```js
    return '<section class="stop stop-compact stop-home" id="stop-home"><header class="stop-head"><span class="stop-num home-num">' + ICON.fly + '</span>' +
```

na:

```js
    return '<section class="stop stop-compact stop-home" id="stop-home" data-short="' + esc(T('flyhome')) + '"><header class="stop-head"><span class="stop-num home-num">' + ICON.fly + '</span>' +
```

W `site2/src/app.js` zamień:

```js
        '<section class="stop' + (compact ? ' stop-compact' : '') + '" id="stop-' + (i + 1) + '" data-pin="' + nodeOf(s.id) + '" style="--c:' + stopColor(s.id) + '">' +
```

na:

```js
        '<section class="stop' + (compact ? ' stop-compact' : '') + '" id="stop-' + (i + 1) + '" data-pin="' + nodeOf(s.id) + '" data-short="' + esc(c.short) + '" style="--c:' + stopColor(s.id) + '">' +
```

W `site2/src/app.js` zamień:

```js
  }
  function bindCopy() {
```

na:

```js
  }
  // the button under the figures of the trip and the one at the end of the page (finishing touches, finding 9), each with
  // its own line for the result and its own box for the text when the clipboard says no
  function bindCopy() {
```

W `site2/src/app.js` zamień:

```js
    var btn = $('#copy-plan'), status = $('#copy-status'), box = $('#copy-fallback');
    btn.addEventListener('click', function () {
      var text = planText();
      box.hidden = true;
      var done = function () { status.textContent = T('copy.ok'); };
      var fail = function () {
        box.hidden = false; box.value = text; box.focus(); box.select();
        status.textContent = T('copy.fail');
      };
      try {
        navigator.clipboard.writeText(text).then(done, fail);
      } catch (e) { fail(); }
```

na:

```js
    [['#copy-plan', '#copy-status', '#copy-fallback'], ['#end-copy', '#end-status', '#end-fallback']].forEach(function (x) {
      var btn = $(x[0]), status = $(x[1]), box = $(x[2]);
      btn.addEventListener('click', function () {
        var text = planText();
        box.hidden = true;
        var done = function () { status.textContent = T('copy.ok'); };
        var fail = function () {
          box.hidden = false; box.value = text; box.focus(); box.select();
          status.textContent = T('copy.fail');
        };
        try {
          navigator.clipboard.writeText(text).then(done, fail);
        } catch (e) { fail(); }
      });
```

W `site2/src/app.js` zamień:

```js
  });

  /* ---------- the footer and the texts in the template ---------- */
```

na:

```js
  });

  /* The bar at the top over the days (finding 8): while the days go by, the summary of the settings gives way to the day
     across the middle of the screen under the bar (and under the small map on a phone): its place's dot and "Dzień 6 · Hội
     An"; over a stay's heading and photos its first day, over a journey "Dzień 3 · Hồ Chí Minh City → Đà Lạt"; over and
     under the days the summary again. On every scroll, as the small map (syncMini), so the probes can see it. */
  function syncDay() {
    var bar = $('#secnav'), mini = $('#minimap'), day = $('#sum-day'), at = null;
    var line = (bar.getBoundingClientRect().bottom + (mini.classList.contains('on') ? mini.offsetHeight : 0) + window.innerHeight) / 2;
    document.querySelectorAll('#stops .leg, #stops .stop, #stops .day').forEach(function (el) { if (el.getBoundingClientRect().top <= line) at = el; });
    var on = !!at && $('#stops').getBoundingClientRect().bottom > line;
    bar.classList.toggle('in-days', on);
    if (!on) return;
    var text, c = '';
    if (at.classList.contains('leg')) {
      text = at.querySelector('.leg-day').textContent + ' · ' + at.querySelector('.leg-route').textContent;
      c = at.nextElementSibling ? at.nextElementSibling.style.getPropertyValue('--c') : '';
    } else {
      var stop = at.closest('.stop'), first = at.classList.contains('day') ? at : stop.querySelector('.day');
      text = T('day') + ' ' + first.id.slice(4) + ' · ' + stop.getAttribute('data-short');
      c = stop.style.getPropertyValue('--c');
    }
    text = text.replace(/\s+/g, ' ');
    if (day.getAttribute('data-text') === text) return;
    day.setAttribute('data-text', text);
    day.innerHTML = (c ? '<span class="dot" style="--c:' + c + '"></span>' : '') + esc(text);
  }
  window.addEventListener('scroll', syncDay, { passive: true });
  window.addEventListener('resize', syncDay);

  /* ---------- the footer and the texts in the template ---------- */
```

W `site2/src/app.js` zamień:

```js
  $('#pdf-plan').addEventListener('click', function () { window.print(); });
```

na:

```js
  $('#pdf-plan').addEventListener('click', function () { window.print(); });
  $('#end-pdf').addEventListener('click', function () { window.print(); });
```

W `site2/src/en/ui.js` zamień:

```js
  'pdf.btn': 'Save route as PDF',
```

na:

```js
  'pdf.btn': 'Save route as PDF',
  'end.h2': 'That’s your Vietnam.', 'end.p': 'Send it to whoever is coming with you, or keep it as a PDF.', 'end.change': 'Change the route',
```

W `site2/src/photos.js` zamień:

```js
var HERO_PHOTO = 'ninhbinh_1';   // the photo at the top of the page and in the link preview
```

na:

```js
var HERO_PHOTO = 'ninhbinh_1';   // the photo at the top of the page and in the link preview
var FINALE_PHOTO = 'puluong_1';   // the photo at the end of the page (finishing touches, finding 9), one of Pù Luông's
```

W `site2/src/template.html` zamień:

```html
.instead { display: block; margin-top: 4px; font-weight: 500; }

footer { margin-top: clamp(56px, 8vw, 96px); border-top: 1px solid var(--line); padding-block: 32px 48px; color: var(--muted); font-size: 12.5px; }
```

na:

```html
.instead { display: block; margin-top: 4px; font-weight: 500; }

/* The end of the page (finishing touches, finding 9): the sunset over the valley of Pù Luông the page's width, coming out of
   the page above it; over the title the trip's last day, under it a sentence and three buttons; not on paper (the PDF has its
   own end) */
.finale { position: relative; display: flex; align-items: flex-end; min-height: clamp(440px, 72vh, 680px); margin-top: clamp(56px, 8vw, 96px); overflow: hidden; background: var(--photo-bg); }
.finale-photo { position: absolute; inset: 0; }
.finale-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 62%; }
.finale::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, var(--paper) 0%, rgba(var(--scrim), 0) 24%, rgba(var(--scrim), 0.12) 52%, var(--shade) 100%); }
.finale-text { position: relative; z-index: 1; width: 100%; padding-block: 48px clamp(40px, 7vh, 64px); color: var(--on-photo); text-shadow: 0 1px 14px rgba(var(--black), 0.35); }
.finale .eyebrow { color: var(--on-photo); opacity: 0.85; }
.finale h2 { margin-top: 8px; font-size: clamp(38px, 6vw, 72px); font-weight: 400; letter-spacing: -0.02em; }
.finale-p { margin-top: 10px; max-width: 46ch; font-size: clamp(16px, 1.5vw, 19px); opacity: 0.94; }
.finale-cta button { font: 500 15px var(--body); padding: 11px 18px; border-radius: 6px; min-height: 44px; border: 0; cursor: pointer; }
.finale-cta .ghost { background: none; }
.finale-where { position: absolute; z-index: 1; right: var(--gutter); bottom: 12px; font: 12px var(--mono); color: var(--on-photo); opacity: 0.85; }
.finale-status { margin-top: 10px; min-height: 1.6em; }
#end-fallback { display: block; width: 100%; max-width: 640px; margin-top: 8px; color: var(--ink); background: var(--surface); text-shadow: none; }
.finale + footer { margin-top: 0; }
footer { margin-top: clamp(56px, 8vw, 96px); border-top: 1px solid var(--line); padding-block: 32px 48px; color: var(--muted); font-size: 12.5px; }
```

W `site2/src/template.html` zamień:

```html
.secnav-sum { display: none; margin: 0 0 0 auto; min-width: 0; align-items: center; gap: 4px 12px; font-size: 14px; color: var(--ink); white-space: nowrap; }
```

na:

```html
.secnav-sum { display: none; margin: 0 0 0 auto; min-width: 0; align-items: center; gap: 4px 12px; font-size: 14px; color: var(--ink); white-space: nowrap; }
/* over the days the summary gives way to the day across the middle of the screen (finishing touches, finding 8): both in
   one place, crossfading; the dot in its place's colour */
.sum-swap { display: grid; min-width: 0; }
.sum-swap > span { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; transition: opacity .25s, visibility .25s; }
#sum-day { opacity: 0; visibility: hidden; }
#sum-day .dot { margin-right: 8px; vertical-align: -1px; }
.secnav.in-days #sum-text { opacity: 0; visibility: hidden; }
.secnav.in-days #sum-day { opacity: 1; visibility: visible; }
```

W `site2/src/template.html` zamień:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .lang-switch, .hero-cta, .hero-wild, .stop-wild, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .minimap, .shape-click, .fold-arrow, .days-all, .days-click, .b-gist, .b-off { display: none !important; }
```

na:

```html
  .secnav, .totop, .finale, .hero > img, .hero::after, .hero-where, .lang-switch, .hero-cta, .hero-wild, .stop-wild, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .minimap, .shape-click, .fold-arrow, .days-all, .days-click, .b-gist, .b-off { display: none !important; }
```

W `site2/src/template.html` zamień:

```html
  <p class="secnav-sum"><span id="sum-text"></span><a class="sum-change" href="#settings" data-i18n="nav.change"></a></p>
```

na:

```html
  <p class="secnav-sum"><span class="sum-swap"><span id="sum-text"></span><span id="sum-day"></span></span><a class="sum-change" href="#settings" data-i18n="nav.change"></a></p>
```

W `site2/src/template.html` zamień:

```html
</main>

<footer>
```

na:

```html
</main>

<section class="finale" id="finale" aria-labelledby="end-h2">
  <div class="finale-photo" id="finale-photo"></div>
  <span class="finale-where">Pù Luông</span>
  <div class="finale-text"><div class="wrap">
    <p class="eyebrow" id="end-day"></p>
    <h2 id="end-h2" data-i18n="end.h2"></h2>
    <p class="finale-p" data-i18n="end.p"></p>
    <div class="hero-cta finale-cta"><button type="button" class="primary" id="end-copy" data-i18n="copy.btn"></button><button type="button" class="ghost" id="end-pdf" data-i18n="pdf.btn"></button><a class="ghost" href="#settings" data-i18n="end.change"></a></div>
    <p class="finale-status" id="end-status" role="status"></p>
    <textarea id="end-fallback" rows="9" readonly hidden data-i18n-aria="copy.aria"></textarea>
  </div></div>
</section>

<footer>
```

W `site2/src/ui.js` zamień:

```js
  'pdf.btn': 'Zapisz trasę jako PDF',
```

na:

```js
  'pdf.btn': 'Zapisz trasę jako PDF',
  'end.h2': 'To twój Wietnam.', 'end.p': 'Wyślij trasę tym, którzy jadą z tobą, albo zapisz ją jako PDF.', 'end.change': 'Zmień trasę',
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py | tail -n 1
ls site2/out/pages/img/puluong_1* | wc -l
for l in "" "&lang=pl"; do for w in 390 1400; do for h in 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'; do
  bash tests/probe.sh tests/probes/polish.js $w "$h$l" | tail -n 1; done; bash tests/probe.sh tests/probes/offroute.js $w "od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2$l" | tail -n 1; done; done
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools | grep -v "var NB"
```

Oczekiwane: `ALL PASS`, `offline file 7.2 MB`, `5` (kopie 160, 480, 960 i 1400 px i pełne zdjęcie), dwanaście razy `done, all checks ok`; grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/build.py site2/src/app.js site2/src/en/ui.js site2/src/photos.js site2/src/template.html site2/src/ui.js tests/data.test.js tests/probes/polish.js
git commit -q -F - <<'EOF'
Wykończenia, zadanie 4: pasek u góry w „Dzień po dniu” i zakończenie strony. W czasie przewijania dni pasek zamiast podsumowania ustawień pokazuje dzień ze środka ekranu z kropką w kolorze miejsca („Dzień 6 · Hội An”, przy przejeździe jego dzień i końce, nad nagłówkiem i zdjęciami postoju jego pierwszy dzień), nad dniami i pod nimi znowu podsumowanie. Pod „Przed wyjazdem” zachód słońca nad doliną Pù Luông na całą szerokość (FINALE_PHOTO, w buildzie w rozmiarze zdjęcia z góry strony, także w pliku offline), ostatni dzień trasy, „To twój Wietnam.”, zdanie i trzy przyciski: kopia na WhatsApp z własnym komunikatem, PDF i zmiana trasy; poza wydrukiem. Teksty po polsku i po angielsku; test danych i sonda polish.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 9b4c138 HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 5: Ruch nowej trasy

Ustalenia 1–3 i 13 (z odpowiedziami po przeglądzie opisu). Trasa rysuje się sama w kolejności podróży, ok. 2 s: przy pierwszej trasie strony, gdy odwiedzający przewinie mapę mniej więcej do połowy na ekran, a po jego zmianie trasy, gdy połowa mapy jest na ekranie; do tego czasu, odkąd pokaże się brzeg mapy, trasa czeka schowana (`m-wait`). Ta sama trasa narysowana jeszcze raz (koszty, EN · PL) stoi. Po zmianie trasy przez odwiedzającego kafelki paska wchodzą falą, a lista, dni i „Przed wyjazdem” płynnie się pojawiają; liczby w kafelkach nabijają się od starej trasy, a przy pierwszym pokazaniu po dotyku od zera. Napis w pasku przenika z dnia na dzień. Wszystko tylko z rąk odwiedzającego i bez „ogranicz ruch”.

**Pliki:**
- Zmień: `site2/src/app.js`, `site2/src/page.js`, `site2/src/template.html`
- Testy: `tests/page.test.js`, `tests/probes/polish.js`

**Interfejsy:**
- Korzysta: `syncDay()` z zadania 4.
- Daje: `leg` przy każdym elemencie `segs` i `stubs` paneli `mapLayout`; w `app.js` `data-leg` przy liniach, strzałkach i pinezkach mapy, `drawRoute(trip, draw)`, `startDraw(svg)`, `finishDraw()`, `rebuilt()`, `wave()`, `figures()`, `countUp(from)`, `moving()`, `onScreen(el)`, zmienne `byHand` i `touched`; dla sond `window.__trip.draw()`, `window.__trip.finishDraw()` i `window.__trip.byHand(on)`.

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/page.test.js` zamień:

```js
  'the degrees of latitude: every line, but no label where a label of the trip stands (11° and 12° N by Hồ Chí Minh City and Đà Lạt)');
```

na:

```js
  'the degrees of latitude: every line, but no label where a label of the trip stands (11° and 12° N by Hồ Chí Minh City and Đà Lạt)');
// the leg of each line and stub (finishing touches, finding 1: the route draws itself in the trip's order): 0 the way from
// the arrival airport to the first stay, the last the way home; a stub of two legs (the round trip's Hà Nội) the first
function legsOf(P) { return P.segs.map(function (g) { return g.mode + g.leg; }).join(' ') + ' | ' + P.stubs.map(function (g) { return g.mode + g.leg; }).sort().join(' '); }
eq(mA.panels.map(legsOf), ['road4 road5 | fly4', 'road2 road3 road4 | fly2 fly4', 'road0 road1 fly1 road1 road2 | fly2'],
  'mapLayout: every line and stub with its leg of the trip (north, centre, south)');
eq(mH.panels.map(legsOf)[0], 'road0 road1 road5 road6 | fly1', 'mapLayout: the round trip from Hà Nội, its stub with the first of its legs');
```

W `tests/probes/polish.js` zamień:

```js
   three buttons, not on paper. */
```

na:

```js
   three buttons, not on paper. The motion of a new trip (1–3): the leg of every line and pin, the drawing itself started
   and finished by hand, a script's change of the trip at once and still, a visitor's change (byHand) with the strip in a
   wave, the days fading up and the figures counting from the last trip's. */
```

W `tests/probes/polish.js` zamień:

```js
      done();
```

na:

```js
      motion();
```

W `tests/probes/polish.js` zamień:

```js
  }
})();
```

na:

```js
  }

  // the motion of a new trip (findings 1–3); the page's own animations only (Web Animations, not its CSS transitions)
  function own(list) { return list.filter(function (x) { return !(x instanceof CSSTransition) && !(x instanceof CSSAnimation); }); }
  function motion() {
    var svg = document.querySelector('#map svg'), legs = S.route.stops.length + 1, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lines = Array.prototype.slice.call(svg.querySelectorAll('.m-road:not(.m-local), .m-fly'));
    check('every line of the route with its leg of the trip', lines.length > 0 && lines.every(function (l) { var k = +l.getAttribute('data-leg'); return l.hasAttribute('data-leg') && k >= 0 && k < legs; }), lines.length);
    check('every pin with the leg that brings its first stay', Array.prototype.every.call(svg.querySelectorAll('.pin'), function (p) {
      return +p.getAttribute('data-leg') === parseInt(p.querySelector('.pin-num').textContent, 10) - 1;
    }));
    check('at rest: the route whole, no mask, nothing moving', !svg.querySelector('mask, [mask]') && own(svg.getAnimations({ subtree: true })).length === 0 &&
      !document.getElementById('map').classList.contains('m-wait'));
    window.__trip.draw();
    var moving = own(svg.getAnimations({ subtree: true })), flights = svg.querySelectorAll('.m-fly[data-leg]');
    check('drawing: each line, arrow and pin moves, each flight under its mask', moving.length === svg.querySelectorAll('[data-leg]').length &&
      Array.prototype.every.call(flights, function (x) { return /^url\(#draw-\d+\)$/.test(x.getAttribute('mask')); }), moving.length + ' / ' + svg.querySelectorAll('[data-leg]').length);
    var last = svg.querySelector('.pin');
    check('drawing: a stay’s pin waits for its leg', !!last && getComputedStyle(last).opacity === '0');
    window.__trip.finishDraw();
    check('finished: no mask, the pin in place', !svg.querySelector('mask, [mask]') && getComputedStyle(last).opacity === '1' && own(svg.getAnimations({ subtree: true })).length === 0);
    // a script's change, as a probe makes: the new trip at once, nothing moving
    var days = S.route.days, set = JSON.parse(JSON.stringify(S.settings)), other = days > 12 ? days - 2 : days + 2;
    set.days = other;
    window.__trip.apply(set);
    check('a script’s change: the new figures at once, nothing moving', textOf('#facts li b') === String(other) && own(document.getAnimations()).length === 0, textOf('#facts li b'));
    // the visitor's change: the strip in a wave, the rest fading up, the figures counting from the last trip's
    document.getElementById('shape').scrollIntoView();
    window.__trip.byHand(true); set.days = days; window.__trip.apply(set); window.__trip.byHand(false);
    var cells = document.querySelectorAll('#strip .cell'), d0 = cells[0].getAnimations()[0], d1 = cells[cells.length - 1].getAnimations()[0];
    check('a visitor’s change: the squares of the strip in a wave', still ? !d0 : !!d0 && !!d1 && d1.effect.getTiming().delay > d0.effect.getTiming().delay);
    check('a visitor’s change: the days and the list fade up', still || (own(document.getElementById('stops').getAnimations()).length === 1 && own(document.getElementById('offroute-list').getAnimations()).length === 1));
    check('a visitor’s change: the figures count from the last trip’s', still || textOf('#facts li b') === String(other), textOf('#facts li b'));
    setTimeout(function () {
      check('… and end at the new ones', textOf('#facts li b') === String(days), textOf('#facts li b'));
      done();
    }, 1200);
  }
})();
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | grep -m 1 Exception | cut -c1-160
python3 site2/build.py > /dev/null
bash tests/probe.sh tests/probes/polish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 2>&1 | grep -v '^ok'
```

Oczekiwane: `Exception: Error: mapLayout: every line and stub with its leg of the trip (north, centre, south): got ["roadundefined roadundefined | flyundefined",…` (page.test.js), a z sondy `FAIL every line of the route with its leg of the trip (15)`, `FAIL every pin with the leg that brings its first stay` i `probe.sh: the probe stopped before done()` (strona nie ma jeszcze `window.__trip.draw`).

- [ ] **Krok 3: Kod**

W `site2/src/app.js` zamień:

```js
    if (e.target.name === 'costs') { setCosts(e.target.checked); return; }   // no setting of the trip (fix 2)
```

na:

```js
    if (e.target.name === 'costs') { setCosts(e.target.checked); return; }   // no setting of the trip (fix 2)
    byHand = e.isTrusted;   // the visitor's own change moves the page (finishing touches)
```

W `site2/src/app.js` zamień:

```js
    else syncLocks();
```

na:

```js
    else syncLocks();
    byHand = false;
```

W `site2/src/app.js` zamień:

```js
    var keep = openFolds(), trip = tripKey(state.route);
```

na:

```js
    var keep = openFolds(), trip = tripKey(state.route), again = drawnTrip !== null && trip !== drawnTrip && byHand;
```

W `site2/src/app.js` zamień:

```js
    syncDay();
```

na:

```js
    syncDay();
    drawRoute(trip, drawnTrip === null || again);
    if (again) rebuilt();
```

W `site2/src/app.js` zamień:

```js
    var r = state.route, st = state.st, k = routeStats(r, state.plans, PLACES), n = r.days - 1;
```

na:

```js
    var r = state.route, st = state.st, k = routeStats(r, state.plans, PLACES), n = r.days - 1, before = figures();
```

W `site2/src/app.js` zamień:

```js
    $('#facts').classList.toggle('no-budget', !costs);
```

na:

```js
    $('#facts').classList.toggle('no-budget', !costs);
    if (byHand && onScreen($('#facts'))) countUp(before);
```

W `site2/src/app.js` zamień:

```js
        g.push(s.mode === 'fly' ? '<path class="m-fly" d="' + curve([s.x1, s.y1], [s.x2, s.y2]) + '"/>'
          : '<line class="m-road" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>');
```

na:

```js
        g.push(s.mode === 'fly' ? '<path class="m-fly" data-leg="' + s.leg + '" d="' + curve([s.x1, s.y1], [s.x2, s.y2]) + '"/>'
          : '<line class="m-road" data-leg="' + s.leg + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>');
```

W `site2/src/app.js` zamień:

```js
        g.push('<line class="' + (s.mode === 'fly' ? 'm-fly' : 'm-road') + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>' +
          '<path class="m-arrow" d="M' + r1(s.x2) + ' ' + r1(s.y2) + 'L' + r1(bx - uy * 3.5) + ' ' + r1(by + ux * 3.5) + 'L' + r1(bx + uy * 3.5) + ' ' + r1(by - ux * 3.5) + 'z"/>');
```

na:

```js
        g.push('<line class="' + (s.mode === 'fly' ? 'm-fly' : 'm-road') + '" data-leg="' + s.leg + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>' +
          '<path class="m-arrow" data-leg="' + s.leg + '" d="M' + r1(s.x2) + ' ' + r1(s.y2) + 'L' + r1(bx - uy * 3.5) + ' ' + r1(by + ux * 3.5) + 'L' + r1(bx + uy * 3.5) + ' ' + r1(by - ux * 3.5) + 'z"/>');
```

W `site2/src/app.js` zamień:

```js
        g.push('<g class="pin" data-pin="' + pn.key + '" style="--c:' + stopColor(pn.key) + '"><rect x="' + r1(pn.x - pn.w / 2) + '" y="' + r1(pn.y - PIN_H / 2) +
```

na:

```js
        g.push('<g class="pin" data-pin="' + pn.key + '" data-leg="' + (parseInt(pn.nums, 10) - 1) + '" style="--c:' + stopColor(pn.key) + '"><rect x="' + r1(pn.x - pn.w / 2) + '" y="' + r1(pn.y - PIN_H / 2) +
```

W `site2/src/app.js` zamień:

```js
    if (mz.open || mz.busy || (one == null && !mzWide())) return;
```

na:

```js
    if (mz.open || mz.busy || (one == null && !mzWide())) return;
    finishDraw();   // the copies show the whole route
```

W `site2/src/app.js` zamień:

```js
      if (apply(s)) {
```

na:

```js
      byHand = e.isTrusted;
      var ok = apply(s);
      byHand = false;
      if (ok) {
```

W `site2/src/app.js` zamień:

```js
    day.innerHTML = (c ? '<span class="dot" style="--c:' + c + '"></span>' : '') + esc(text);
```

na:

```js
    day.innerHTML = (c ? '<span class="dot" style="--c:' + c + '"></span>' : '') + esc(text);
    if (touched && moving()) day.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });   // one day to the next
```

W `site2/src/app.js` zamień:

```js
  window.addEventListener('resize', syncDay);

  /* ---------- the footer and the texts in the template ---------- */
```

na:

```js
  window.addEventListener('resize', syncDay);

  /* ---------- the motion of a new trip (finishing touches, findings 1–3) ---------- */
  /* Only the visitor's own doing moves the page: a change of the trip by hand (byHand: the form's change event or the click
     of Dodaj, Usuń or the reset was isTrusted), and what first comes on the screen after the visitor has touched, scrolled
     with the wheel or pressed a key (touched). A script, as the probes, swaps the trip at once and scrolls without motion,
     so what a probe reads is the final state. Never with reduced motion. */
  var byHand = false, touched = false, SVG_NS = 'http://www.w3.org/2000/svg', STILL = window.matchMedia('(prefers-reduced-motion: reduce)');
  ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(function (k) {
    window.addEventListener(k, function (e) { if (e.isTrusted) touched = true; }, { capture: true, passive: true });
  });
  function moving() { return !STILL.matches && !!Element.prototype.animate; }
  function onScreen(el) { var b = el.getBoundingClientRect(); return b.bottom > 0 && b.top < window.innerHeight; }

  /* The route draws itself (finding 1): on the page's first trip once the visitor has scrolled the map about half onto the
     screen, and on a trip the visitor changed (draw) as soon as about half the map is on it (at once, or when it comes);
     till then, once its first edge shows, the route waits unseen (m-wait), so it never vanishes in sight. The same trip
     drawn again (the costs, EN · PL) stands still. Each leg of the trip (data-leg on its lines, stubs and pins, mapLayout) in its share of about 2 s: a road
     drawn along its length, a flight's dashes uncovered by a drawn mask, a stub's arrow and a stay's pin as their leg
     ends. The copies of the map (the small map, the printout) are made before it starts; the zoom and the printout finish it
     at once (finishDraw). */
  var DRAW_MS = 2000, drawnTrip = null, drawIO = null, drawEnd = null, drawing = [], drawOk = false;
  function drawRoute(trip, draw) {
    var svg = $('#map svg');
    if (trip === drawnTrip && drawIO) { drawIO.disconnect(); drawIO.observe(svg); return; }   // a new map of the same trip
    if (trip === drawnTrip) return;
    drawnTrip = trip;
    finishDraw();
    if (!draw || !moving() || !('IntersectionObserver' in window)) return;
    drawOk = byHand;
    drawIO = new IntersectionObserver(function (es) {
      var e = es[es.length - 1];
      if (!touched && !drawOk) return;
      if (e.intersectionRatio < 0.45) { $('#map').classList.add('m-wait'); return; }
      drawIO.disconnect(); drawIO = null;
      startDraw(e.target);
    }, { threshold: [0, 0.45] });
    drawIO.observe(svg);
  }
  function startDraw(svg) {
    $('#map').classList.remove('m-wait');
    if (!svg.isConnected) return;
    var slot = DRAW_MS / (state.route.stops.length + 1), defs = svg.querySelector('defs'), n = 0;
    svg.querySelectorAll('[data-leg]').forEach(function (el) {
      var k = +el.getAttribute('data-leg');
      if (el.classList.contains('pin')) {
        drawing.push(el.animate([{ opacity: 0, transform: 'scale(0.3)' }, { opacity: 1, transform: 'none' }], { delay: (k + 0.85) * slot, duration: 280, easing: 'cubic-bezier(.2,.8,.2,1.2)', fill: 'backwards' }));
        return;
      }
      if (el.classList.contains('m-arrow')) { drawing.push(el.animate([{ opacity: 0 }, { opacity: 1 }], { delay: (k + 0.9) * slot, duration: 120, fill: 'backwards' })); return; }
      var len = el.getTotalLength(), line = el;
      if (el.classList.contains('m-fly')) {
        var m = document.createElementNS(SVG_NS, 'mask'), id = 'draw-' + (n++);
        m.id = id;
        [['maskUnits', 'userSpaceOnUse'], ['x', -2000], ['y', -2000], ['width', 6000], ['height', 6000]].forEach(function (x) { m.setAttribute(x[0], x[1]); });
        line = el.cloneNode(false);
        ['class', 'data-leg'].forEach(function (x) { line.removeAttribute(x); });
        [['fill', 'none'], ['stroke', '#fff'], ['stroke-width', 8]].forEach(function (x) { line.setAttribute(x[0], x[1]); });
        m.appendChild(line); defs.appendChild(m);
        el.setAttribute('mask', 'url(#' + id + ')');
      }
      drawing.push(line.animate([{ strokeDasharray: len + ' ' + len, strokeDashoffset: len }, { strokeDasharray: len + ' ' + len, strokeDashoffset: 0 }],
        { delay: k * slot, duration: slot, easing: 'ease-in-out', fill: 'backwards' }));
    });
    drawEnd = setTimeout(finishDraw, DRAW_MS + 400);
  }
  function finishDraw() {
    clearTimeout(drawEnd);
    if (drawIO) { drawIO.disconnect(); drawIO = null; }
    $('#map').classList.remove('m-wait');
    drawing.forEach(function (x) { x.finish(); });
    drawing = [];
    var svg = $('#map svg');
    if (!svg) return;
    svg.querySelectorAll('mask[id^="draw-"]').forEach(function (x) { x.remove(); });
    svg.querySelectorAll('[mask^="url(#draw-"]').forEach(function (x) { x.removeAttribute('mask'); });
  }
  window.addEventListener('beforeprint', finishDraw);

  /* A new trip comes in softly (finding 2): the squares of the strip in a wave, day by day, the list of the places off the
     trip, the days and „Przed wyjazdem” fading up. Not the View Transitions API: it swaps the page in a later frame, and the
     page (syncForm, reportAdd) and the probes read the new trip right after apply. */
  function wave() {
    $('#strip').querySelectorAll('.cell').forEach(function (c, i) {
      c.animate([{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: i * 18, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
  }
  function rebuilt() {
    if (!moving()) return;
    wave();
    ['#strip-legend', '#offroute-list', '#stops', '#before .before'].forEach(function (s) {
      $(s).animate([{ opacity: 0.25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'ease-out' });
    });
  }

  /* The figures of the trip count up (finding 3): from 0 the first time they come on the screen after the visitor's touch
     (not when the page opens with them in sight), from the last trip's after the visitor's change; whole numbers only (not
     8½ nor the budget), about 0.8 s, the final text at the end also where the browser holds back its frames. */
  function figures() { return Array.prototype.map.call(document.querySelectorAll('#facts li > b'), function (b) { return b.firstChild ? +b.firstChild.nodeValue : NaN; }); }
  function countUp(from) {
    if (!moving()) return;
    document.querySelectorAll('#facts li > b').forEach(function (b, i) {
      var node = b.firstChild, to = node && node.nodeType === 3 ? +node.nodeValue : NaN, a = from ? from[i] : 0;
      if (!(to >= 0) || Math.round(to) !== to || !(a >= 0) || a === to) return;
      var t0 = performance.now(), end = setTimeout(function () { k = 1; node.nodeValue = String(to); }, 850), k = 0;
      (function step() {
        if (k >= 1) return;
        k = Math.min(1, (performance.now() - t0) / 800);
        node.nodeValue = String(Math.round(a + (to - a) * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step); else clearTimeout(end);
      })();
    });
  }
  // the first time on the screen after the visitor's touch: the figures and the strip
  [['#facts', function () { countUp(null); }], ['#strip', function () { if (moving()) wave(); }]].forEach(function (x) {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es, o) {
      if (!es[0].isIntersecting) return;
      o.disconnect();
      if (touched) x[1]();
    }, { threshold: 0.4 }).observe($(x[0]));
  });

  /* ---------- the footer and the texts in the template ---------- */
```

W `site2/src/app.js` zamień:

```js
  window.__trip = { state: state, apply: apply, today: TODAY };
```

na:

```js
  window.__trip = { state: state, apply: apply, today: TODAY, draw: function () { startDraw($('#map svg')); }, finishDraw: finishDraw,
    byHand: function (on) { byHand = on; } };
```

W `site2/src/page.js` zamień:

```js
   a pin is { key, x, y, w, nums, px, py }: px, py its point, x, y where it is drawn;
```

na:

```js
   a seg and a stub are { mode, x1, y1, x2, y2, leg }: leg the trip's leg it belongs to, 0 the way from the arrival airport
   to the first stay, the last the way home (a stub of several legs: the first), so the route draws itself in the trip's
   order (finishing touches, finding 1); a pin is { key, x, y, w, nums, px, py }: px, py its point, x, y where it is drawn;
```

W `site2/src/page.js` zamień:

```js
    legs.forEach(function (L) {
```

na:

```js
    legs.forEach(function (L, li) {
```

W `site2/src/page.js` zamień:

```js
        if (ia && ib) { P.segs.push({ mode: g.mode, x1: a[0], y1: a[1], x2: b[0], y2: b[1] }); return; }
```

na:

```js
        if (ia && ib) { P.segs.push({ mode: g.mode, x1: a[0], y1: a[1], x2: b[0], y2: b[1], leg: li }); return; }
```

W `site2/src/page.js` zamień:

```js
        var s = stubAt[here] || (stubAt[here] = { mode: g.mode, x1: from[0], y1: from[1], vx: 0, vy: 0, names: [] });
```

na:

```js
        var s = stubAt[here] || (stubAt[here] = { mode: g.mode, x1: from[0], y1: from[1], vx: 0, vy: 0, names: [], leg: li });
```

W `site2/src/page.js` zamień:

```js
        P.stubs.push({ mode: it.stub.mode, x1: it.stub.x1, y1: it.stub.y1, x2: tip[0], y2: tip[1] });
```

na:

```js
        P.stubs.push({ mode: it.stub.mode, x1: it.stub.x1, y1: it.stub.y1, x2: tip[0], y2: tip[1], leg: it.stub.leg });
```

W `site2/src/template.html` zamień:

```html
.pin rect { fill: var(--c); stroke: var(--surface); stroke-width: 2; transition: transform .2s; transform-box: fill-box; transform-origin: center; }
```

na:

```html
.pin rect { fill: var(--c); stroke: var(--surface); stroke-width: 2; transition: transform .2s; transform-box: fill-box; transform-origin: center; }
/* the route draws itself (finishing touches, finding 1, app.js): till then its lines, stubs and pins wait unseen (m-wait);
   a pin comes in from its middle */
#map.m-wait [data-leg] { opacity: 0; }
.pin { transform-box: fill-box; transform-origin: center; }
```


- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py > /dev/null
for k in 1 2; do for l in "" "&lang=pl"; do for w in 390 1400; do for h in 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'; do
  bash tests/probe.sh tests/probes/polish.js $w "$h$l" | tail -n 1; done; done; done; done | sort | uniq -c
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools | grep -v "var NB"
```

Oczekiwane: `ALL PASS` i `16 done, all checks ok` (każde ustawienie dwa razy, bo ruch zależy od czasu); grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/app.js site2/src/page.js site2/src/template.html tests/page.test.js tests/probes/polish.js
git commit -q -F - <<'EOF'
Wykończenia, zadanie 5: ruch nowej trasy. Trasa rysuje się sama w kolejności podróży, ok. 2 s, gdy mapa wjedzie na ekran (drogi wzdłuż długości, loty spod maski, pinezki postojów, gdy dojdzie do nich odcinek; mapLayout podaje odcinek trasy przy każdej linii), po zmianie trasy rysuje się od nowa, a ta sama trasa nie; kafelki paska dni wchodzą falą, a lista, dni i „Przed wyjazdem” płynnie się pojawiają; liczby w kafelkach nabijają się. Zamiast View Transitions animacje po przebudowie, bo View Transitions podmienia stronę w następnej klatce, a strona i sondy czytają nową trasę zaraz po apply. Ruch tylko z rąk odwiedzającego (zmiana i kliknięcie isTrusted, pierwsze pokazanie po dotyku, kółku albo klawiszu), nigdy przy „ogranicz ruch”, więc sondy widzą stan końcowy; test page.test.js i sonda polish.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 865270c HEAD -- site2 tests tools` nic nie wypisuje.

---

### Zadanie 6: Punkt kontrolny

Wszystko w porównaniu z zadaniem 1 i z suchą próbą. Wyniki do `$TMPDIR/wietnam-wow/punkt.md`, z którego zadanie 9 bierze akapit do notatek.

- [ ] **Krok 1: Pełny test** (ok. 3 min)

```bash
bash tests/run.sh --full 2>&1 | grep -E "^combos:|^ALL PASS"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`.

- [ ] **Krok 2: Sondy, PDF i plik offline** (ok. 5 min; w tle, bez przebudowy strony w tym czasie)

```bash
bash "$TMPDIR/wietnam-wow/pomiar.sh" po
paste -d '\n' "$TMPDIR/wietnam-wow/pdf-przed.txt" "$TMPDIR/wietnam-wow/pdf-po.txt" | cut -c1-40
```

Oczekiwane: `sondy: 0 z 54 nie przeszło` i `sondy (pl): 0 z 52 nie przeszło` (przed planem 50 i 48: doszły po cztery przebiegi sondy `polish.js`), `offline file 7.2 MB` (przed planem 7,1: większe zdjęcie zakończenia), a w zestawieniu PDF każda para linii z tą samą liczbą stron (14, 11, 9, 6, 10), w żadnym PDF stron poniżej 45% ani zakrytych linii.

- [ ] **Krok 3: Trasy bez zmian** (ok. 3 min)

```bash
rm -rf "$TMPDIR/wietnam-wow/przed"; mkdir -p "$TMPDIR/wietnam-wow/przed"
git archive 1db4ad5 site2/src | tar -x -C "$TMPDIR/wietnam-wow/przed"
bash tools/liczby.sh "$TMPDIR/wietnam-wow/przed/site2/src" > "$TMPDIR/wietnam-wow/liczby-przed.md"
bash tools/liczby.sh > "$TMPDIR/wietnam-wow/liczby-po.md"
diff "$TMPDIR/wietnam-wow/liczby-przed.md" "$TMPDIR/wietnam-wow/liczby-po.md" && echo "trasy bez zmian"
```

Oczekiwane: `trasy bez zmian`.

- [ ] **Krok 4: Zrzuty do przeglądu**

```bash
mkdir -p "$TMPDIR/wietnam-wow/zrzuty"; T="od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2"
for l in en pl; do X=""; [ $l = pl ] && X="&lang=pl"; for w in 390 1366 1920; do
  PAGE=wildlife bash tests/shot.sh "route&$T$X" $w "$TMPDIR/wietnam-wow/zrzuty/wild-$l-$w.png" 900 > /dev/null; done; done
ls "$TMPDIR/wietnam-wow/zrzuty" | wc -l
```

Oczekiwane: `6`. Obejrzyj je: duk w całości (przy 1366 i 1920 px w prawych dwóch trzecich, z tytułem obok, przy 390 px nad tytułem), zakładki pod zdjęciem, przy 1366 px na pierwszym ekranie. Zakończenie, pasek i album obejrzyj w kroku 5.

- [ ] **Krok 5: Ręcznie w przeglądarce, z użytkownikiem** (lokalny serwer z `site2/out/pages`; przewijaj kółkiem, bo ruch idzie tylko z rąk odwiedzającego)

Sprawdź i zapisz wynik w `$TMPDIR/wietnam-wow/punkt.md`:
- przy 1366 × 860: zdjęcie na górze powoli się przybliża; liczby w kafelkach nabijają się, gdy kafelki wjadą; kafelki paska wchodzą falą; trasa rysuje się od lotniska przylotu do wylotu, pinezki zapalają się po kolei; zdjęcia dni wyłaniają się z koloru; pasek u góry w dniach pokazuje dzień z kropką, nad i pod dniami podsumowanie; zakończenie z Pù Luông, „Copy plan for WhatsApp” kopiuje plan;
- zmiana trasy kliknięciem „Remove”, „Dodaj” i w formularzu: fala, przenikanie, liczby od starej trasy, rysowanie od nowa; przełącznik EN · PL i koszty: nic się nie rysuje od nowa;
- podstrona: duk, przybliżanie, album (strzałki, klawisze, licznik), kafelki Galerii pod myszą;
- powiększenie mapy w trakcie rysowania: kadry z całą trasą;
- emulacja „ogranicz ruch”: nic się nie rusza, wszystko od razu na miejscu;
- jasny i ciemny motyw; konsola bez błędów.

- [ ] **Krok 6: Telefon** (z użytkownikiem, za zgodą)

Strona z komputera w domowej sieci (`python3 -m http.server <port> --bind 0.0.0.0 --directory site2/out/pages`, na telefonie `http://<IP komputera>:<port>/#od=SGN&do=HAN&miesiac=2027-05&dni=15&co=&poziom=2`) albo żywa strona po publikacji. Lista dla użytkownika, krok po kroku: zdjęcie na górze się przybliża; przewiń do kafelków: liczby się nabijają; dalej do mapy: trasa rysuje się, gdy widać połowę mapy; w dniach pasek u góry pokazuje dzień i miejsce; na dole zakończenie z zachodem słońca, „Kopiuj plan” działa; podstrona zwierząt: duk na górze, zdjęcie w Galerii otwiera album, przesunięcie palcem przechodzi dalej.

### Zadanie 7: Końcowy przegląd przed publikacją

- [ ] **Krok 1: Świeży recenzent na najmocniejszym modelu** (Agent z `model: fable`, w tle, we własnym worktree z podlinkowanym `photos/` i własnym `TMPDIR`)

Zadanie dla recenzenta: przeczytaj cały diff od commitu planu do `HEAD`, ten plan, opis projektu (`notes/plans/2026-10-20-wykonczenia-projekt.md`) i dowody z punktu kontrolnego (`$TMPDIR/wietnam-wow/`); nowe teksty po polsku obok angielskich; własnymi sondami sprawdź to, czego sondy planu nie badają (np. szybkie dwie zmiany trasy w trakcie rysowania, zmiana trasy z mapą poza ekranem, powiększenie mapy w trakcie rysowania, przełącznik EN · PL w trakcie rysowania, wydruk w trakcie rysowania, album przy gatunku bez zdjęcia, pasek przy trasie z nocą w drodze); oceń „Gotowe do publikacji: Tak / Po poprawkach / Nie”, z uwagami krytycznymi, ważnymi i drobnymi. Wynik do `$TMPDIR/przeglad-wow.txt`.

- [ ] **Krok 2: Uwagi z użytkownikiem**

Każdą uwagę krytyczną i ważną sprawdź sam (kod, sonda, przeglądarka), potem pokaż użytkownikowi z rekomendacją; poprawki w osobnych commitach „Poprawka z końcowego przeglądu wykończeń: …”, każda z testem albo sondą, która najpierw nie przechodzi; drobne na listę następnej rundy albo do poprawki, według wyboru użytkownika.

### Zadanie 8: Publikacja (każdy krok za wyraźną zgodą użytkownika)

- [ ] **Krok 1: Strona do `docs/`** (za zgodą)

```bash
bash tools/publish.sh
git status --short docs | wc -l
grep -c 'name="robots" content="noindex"' docs/index.html docs/wildlife/index.html
ls docs/img/puluong_1* | wc -l
```

Oczekiwane: `publish.sh: docs/ ready (…)`, zmienione obie strony i nowe kopie zdjęć duka i Pù Luông, `noindex` w obu stronach, `5`.

- [ ] **Krok 2: Commit `docs/`** (za zgodą)

```bash
git add docs
git commit -q -F - <<'EOF'
Strona na GitHub Pages z wykończeniami: trasa rysuje się sama, nowa trasa wchodzi płynnie, liczby się nabijają, duk na górze podstrony zwierząt, zdjęcia wyłaniają się z koloru, album w podglądzie zdjęć zwierząt, dzień w pasku u góry i zakończenie z Pù Luông; dalej z noindex

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 3: `git push`** (za osobną zgodą), potem sprawdzenie żywej strony

```bash
git push origin main
gh api repos/grzegorzfrskiba-hub/wietnam/pages/builds/latest --jq .status
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -c 'id="finale"'
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/wildlife/ | grep -c 'class="w-hero"'
```

Oczekiwane po zbudowaniu GitHub Pages (`built`): `1` i `1`.

### Zadanie 9: Notatki: status i następny krok

- [ ] **Krok 1: `notes/etapy.md` i `CLAUDE.md`**

W `notes/etapy.md`, w „Następna runda poprawek (po etapie 6)”, akapit „**Wykończenia („efekt wow”)** (sesja decyzji 20.10.2026)” z odnośnikami do opisu projektu i tego planu, „Zrobione <data>: …” (co jest na stronie), „Punkt kontrolny (<data>): …” (z `$TMPDIR/wietnam-wow/punkt.md`), „Końcowy przegląd (<data>): …” (z `$TMPDIR/przeglad-wow.txt` i decyzji użytkownika) i „Publikacja (<data>): …”; w „## Następny krok” zamiast punktu o tym planie dalej linki dla anglojęzycznych testerów i plan następnej rundy poprawek. W `CLAUDE.md`: linia `**Status (…)**` z wykończeniami, a w „Jak sprawdzać” przy sondach `polish.js` (wykończenia strony z trasą: zdjęcia, typografia, pasek w dniach, zakończenie, rysowanie trasy i ruch nowej trasy w stanie końcowym) i w pułapkach: ruch strony tylko z rąk odwiedzającego (`isTrusted`, dotyk), więc ręcznie przewija się kółkiem albo palcem, a Chrome bez okna woła IntersectionObserver raz i nie odtwarza animacji.

- [ ] **Krok 2: Commit notatek** (za zgodą), push za osobną zgodą

```bash
git add notes/etapy.md CLAUDE.md
git commit -q -F - <<'EOF'
Notatki: wykończenia strony zrobione (trasa rysuje się sama, płynna przebudowa, liczby, duk na podstronie, zdjęcia z koloru, album, dzień w pasku, zakończenie z Pù Luông), punkt kontrolny, końcowy przegląd i publikacja

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

Na koniec zapytaj użytkownika o `git push` i o usunięcie gałęzi `sucha-proba-wykonczenia` (`git branch -D`, bo jej commity mają inne SHA niż `main`).

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` po każdym zadaniu; `--full` w punkcie kontrolnym.
- Sondy: `bash "$TMPDIR/wietnam-wow/sondy.sh" [pl]` (zadanie 1), pojedynczo `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<link>'`, z `PAGE=wildlife` podstrona.
- Każde zadanie 2–5 porównaj z jego commitem na gałęzi `sucha-proba-wykonczenia` (`git diff <commit suchej próby> HEAD -- site2 tests tools` nic nie wypisuje).
- Grep twardych spacji z „Ograniczeń globalnych” po każdym zadaniu.
