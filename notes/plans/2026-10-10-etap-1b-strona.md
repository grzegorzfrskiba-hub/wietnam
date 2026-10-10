# Etap 1B: strona na nowym silniku — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** strona pierwowzoru przeniesiona na silnik z planu 1A, tylko po polsku.
- Ustawiasz termin, lotniska, 0–2 zainteresowania i poziom przygody, a trasa przelicza się od razu.
- Strona pokazuje liczby trasy, ostrzeżenie o Tết i świętach, pasek dni, mapę, miejsca z galeriami i planami dni oraz przejazdy.
- Do tego „Dodaj” i „Usuń”, link z ustawieniami i kopiowanie planu.
- Plan kończy etap 1.

**Architektura:**
- **Silnik** (`engine.js`) zostaje bez zmian w planowaniu. Dochodzi tylko pole roku i kontrola typów.
- **Treść** leży w plikach danych:
  - `content/<id>.js`: teksty każdego miejsca, z wariantami dni dla poziomów;
  - `photos.js`: podpisy i licencje zdjęć;
  - `holidays.js`: Tết i święta;
  - `ui.js`: teksty interfejsu (klucze).
- **Czyste funkcje strony** (`page.js`) są bez DOM i testowane w jsc: link, plany dni pobytu, ostrzeżenia, liczby.
- **`app.js`** z pierwowzoru rysuje stronę. Ustawienia żyją w adresie strony (po `#`).

**Technologie:** JavaScript w stylu ES5 jak w pierwowzorze, bez zależności. Testy działają w JavaScriptCore (`jsc`), bo na tym Macu nie ma node. Build i zrzuty: Python 3 z Pillow i Chrome bez okna. Research przez WebSearch.

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): „Jak działa strona”, „Moduł”, „Miesiąc w danych, nie w tekstach”, „Treść, bezpieczeństwo, licencje”, „Technika”;
- [notes/etapy.md](../etapy.md): etap 1 i uwagi do planu 1B w „Następnym kroku”;
- zarys 1B na końcu [planu 1A](2026-10-09-etap-1a-silnik.md);
- decyzje z sesji 10.10.2026, niżej w sekcji „Decyzje z sesji 10.10.2026”.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl pierwowzoru: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`, kolory tylko przez zmienne CSS z `:root`;
  - `engine.js` i `page.js` bez DOM;
  - komentarze w kodzie po angielsku, teksty dla czytelnika po polsku w `ui.js` i `content/`.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych („zobaczysz”, „jeśli masz”, nigdy „byłeś/byłaś”);
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - liczebniki przez `countWord`/`nightForm`;
  - cudzysłów „…”, myślnik w zakresach (5–30), godziny 24-godzinne, spacja przed °C.
- **Treść niezależna od miesiąca:** od miesiąca zależą tylko dane (sezon, święta, trudny dzień poza sezonem). Tekst nie mówi „w grudniu” ani „z powrotem”, bo miejsce może być na początku albo na końcu trasy.
- **Zdjęcia:** tylko CC0, CC BY, CC BY-SA albo domena publiczna (bez NC i ND), z autorem i licencją w `photos.js`. Pliki JPG zostają w `photos/`, który jest poza gitem.
- **Fakty:** każdy nowy fakt (godziny, zakazy, operatorzy, święta) ma źródło i datę w `research/`. Fakty przeniesione z pierwowzoru mają źródła w jego audycie z 9.10.2026, a przeniesie je audyt w etapie 4.
- **Ustawienia:**
  - długość 5–30 dni (`MIN_DAYS`, `MAX_DAYS`);
  - lotniska `SGN`, `HAN`, `DAD` w dowolnym układzie;
  - 0–2 z `INTERESTS`, poziomy 1–3, domyślny 2;
  - miesiące do wyboru od bieżącego do grudnia `PLAN_LAST_YEAR` (2030).
- **Adres strony publicznej** (link w kopiowanym planie i w podglądzie): `https://grzegorzfrskiba-hub.github.io/wietnam/`. Zacznie działać po publikacji w etapie 4.
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu.
- **Repo będzie publiczne:** bez danych osobowych i bez numerów lotów.
- **Pierwowzór** (`~/Desktop/CLAUDE roboczy plik/vietnam-planner/`) służy tylko do odczytu.
- **Commity:**
  - po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
  - commity po zadaniach są częścią planu;
  - `git push` i publikacja artifactu tylko za zgodą użytkownika.

## Na co uważać przy przeglądzie

Pięć sytuacji, o których wizja milczy, a które najłatwiej zepsują stronę. Każda ma test w zadaniu, które ją obsługuje.

1. **Link napisany ręcznie albo stary.** Możliwe są złe typy, wartości poza zakresem, miesiąc z przeszłości, daty na ponad 30 dni, nieznane miejsca, noc w Hà Nội w „dodaj” i zepsute znaki `%`.
   - Oczekiwane: strona bierze wartość domyślną pole po polu, mówi o tym i nigdy nie jest pusta.
   - Test: `page.test.js`, czyli `parseLink` i `settingsFromLink` (zadanie 6).
2. **Odnośniki wewnątrz strony:** dzień na pasku, menu i „Na górę”.
   - Oczekiwane: nie kasują ustawień z adresu.
   - Test: `tests/probes/anchors.js` (zadanie 10).
3. **Wybór planów dni:** drugi pobyt w mieście lotniska przy trasie tam i z powrotem, pobyt na jedną noc, każdy poziom, trudny dzień w miesiącu, w którym go nie ma.
   - Oczekiwane: każdy pobyt dostaje tyle planów, ile ma nocy. Na poziomie 1 nie ma wędrówki.
   - Testy: `stopDays` w `page.test.js` i test wszystkich kombinacji na każdym poziomie (zadanie 6), pełny przebieg w zadaniu 11.
4. **Stany przejściowe i brak trasy:** puste pole daty, wylot przed przylotem albo ponad 30 dni; usunięte wszystkie miejsca przy lotnisku.
   - Oczekiwane: komunikat przy ustawieniach, ostatnia trasa zostaje, a adres się nie zmienia.
   - Test: `tests/probes/changes.js` (zadanie 10).
5. **Termin a dane o świętach:** przełom roku, Tết pod koniec stycznia, wyjazd poza zakresem danych o świętach.
   - Oczekiwane: ostrzeżenie z tygodniowym marginesem wokół Tết albo informacja o braku danych.
   - Testy: `tripAlerts` w `page.test.js` (zadanie 6) i zakres listy świąt w `data.test.js` (zadanie 2).

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`. Zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne.
- **Pierwowzór (`P=~/Desktop/"CLAUDE roboczy plik"/vietnam-planner`):**
  - `site2/src/app.js`: render, galerie, lightbox, mapa z powiększeniem;
  - `site2/src/template.html`: HTML i CSS;
  - `site2/src/data.js`: `STOPS` z planami dni, `PT`, czyli punkty na mapie;
  - `site2/src/i18n.pl.js`: polskie teksty `UI.pl` i `I18N_PL` z treścią miejsc i podpisami zdjęć;
  - `site2/src/plan.js`: `tripDate`, `nightForm`, `tieShort`;
  - `site2/src/basemap.js`: kontury mapy;
  - `site2/build.py`;
  - `tests/shot.sh`, `probe.sh`, `print.sh`;
  - `photos/`: 84 zdjęcia i `meta.json`;
  - `research/ta-nang-status-2026-10.md`.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`.
  - Pliki ładowane w jednym wywołaniu dzielą zasięg globalny, także `const`.
  - `print()` wypisuje tekst, `readFile(ścieżka)` czyta plik.
  - Argumenty po `--` są w tablicy `arguments`.
  - Wyrażenia regularne z flagą `u` znają `\p{L}`.
- **Python i Chrome:** Pillow i PyMuPDF (`fitz`) są zainstalowane. Chrome leży w `/Applications/Google Chrome.app`.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`, więc zbudowaną stronę sprawdza się przez `tests/shot.sh` i `tests/probe.sh`;
  - w nowym worktree nie ma `photos/`, więc przed buildem trzeba podlinkować ten katalog z głównej kopii.
- **Sucha próba (10.10.2026):**
  - kod zadań 1, 5, 6, 9 i 10 złożono w katalogu roboczym (z zaślepkami świąt i nowego zdjęcia Hội An);
  - przeszedł testy silnika, strony, treści i kluczy interfejsu, test kombinacji z planami dni (pełny w 23 s), build oraz sondy `link.js`, `anchors.js` i `changes.js`;
  - nie sprawdzono na sucho: usuwania reguł CSS z zadania 9 (krok 4), researchu (zadania 2 i 3) i przepisywania treści (zadania 7 i 8).
- **Silnik (plan 1A):**
  - `normSettings(s, PLACES, HUBS)` daje `st`, a `planRoute(st, DATA)` daje `{ ok, days, stops: [{ id, n, start, end, season, leg }], home, missing, score }`;
  - `leg` i `home` mają postać `{ from, to, segs: [{ mode: 'road'|'fly', from, to, h }], flights, total }`. Końce to miejsca albo kody lotnisk; noc w Hà Nội w drodze (`hanoiStop`) ma węzeł `hanoi`;
  - `HUBS = { SGN: 'saigon', HAN: 'hanoi', DAD: 'hoian' }`. Miasto lotniska przy trasie tam i z powrotem może być pierwszym i ostatnim pobytem.

## Decyzje z sesji 10.10.2026

Pytania do użytkownika:
1. **Zakres 1B:** rdzeń trasy i jedna linijka o Tết i świętach. Tabela pogody, „Celowo pominięte”, „Przed wyjazdem” i budżet wracają w etapie 2, przebudowane na dowolny termin.
2. **„Dodaj” i „Usuń”:** proste przyciski bez powodów. Jest „Usuń” przy miejscu, lista „Poza trasą” z przyciskiem „Dodaj” i komunikat „Nie zmieściło się: …”. Powody („Wybrane, bo…”, „Nie ma na twojej trasie, bo…”) dochodzą w etapie 2.
3. **Trudne warianty dni (poziom 3) już w 1B,** z researchem. Gdzie research nie znajdzie dobrego trudnego dnia, poziom 3 dostaje dzień zwykły.

Lista ustaleń zaakceptowana w całości:
- **Strona:**
  - pasek ustawień ze zwykłych kontrolek, po dwóch zainteresowaniach reszta się blokuje;
  - miesiąc z rokiem od bieżącego do grudnia 2030;
  - tymczasowe ustawienia na pierwsze wejście (właściwe w etapie 2): HCMC → Hà Nội, następny miesiąc, 15 dni, bez zainteresowań, „aktywnie”;
  - ustawienia są w adresie po `#`, bez zapisu w przeglądarce;
  - polski link `#od=…&do=…&miesiac=RRRR-MM&dni=…&co=…&poziom=…&dodaj=…&usun=…`, z datami `start=…&koniec=…`. Błędne pola link pomija;
  - przy błędnych ustawieniach komunikat; ostatnia poprawna trasa i adres zostają.
- **Zawartość strony:**
  - liczby trasy (dni i noce, miejsca, loty krajowe, dni z wędrówką, najdłuższy dzień w drodze), pod nimi linijka o Tết i świętach;
  - dzień przylotu i dzień wylotu są lekkie;
  - „Dodaj” zdejmuje miejsce z usuniętych i odwrotnie, a „Wróć do trasy bez zmian” czyści obie listy. Noc w Hà Nội w drodze nie ma przycisków.
- **Mapa:**
  - dwa dzisiejsze kadry zostają do etapu 2;
  - dochodzą Hội An i Huế osobno oraz lotniska Cát Bi i Thọ Xuân;
  - kwadraty oznaczają lotniska przylotu i wylotu, a mapa pokazuje też dojazd na lotnisko wylotu.
- **Kopiowany plan i deszcz:**
  - kopiowany plan z linkiem do strony publicznej;
  - plan na deszcz widać zawsze, gdy dzień go ma.
- **Treść:**
  - teksty przepisane z polskiej wersji pierwowzoru: per „ty”, bez grudnia i bez „z powrotem”;
  - poprawione złote tarasy w Pù Luông i pora oglądania Bản Giốc;
  - bez rad sprzecznych z przyszłymi miejscami, np. „Sa Pa i Hà Giang: tłumy”.
- **Hội An i Huế:**
  - Hội An i Huế są osobno;
  - przełęcz Hải Vân opisuje przejazd między nimi.
- **Plany dni:**
  - każde miejsce ma ich tyle, ile wynosi jego maksimum nocy;
  - wersja na jedną noc tam, gdzie minimum to 1;
  - plan ponownego przyjazdu dla miast lotnisk (HCMC, Hà Nội, Hội An).
- **Trudne warianty:**
  - tylko z licencjonowanym przewodnikiem albo operatorem;
  - mogą mieć miesiące wyłączone;
  - na stronie mają znaczek „Trudny dzień”.
- **Zdjęcia i święta:**
  - kopia zdjęć pierwowzoru z polskimi podpisami, a nieużywane zdjęcia grobowców idą do galerii Huế;
  - dla Hội An szukamy nowych zdjęć na Commons;
  - podpis, autor i licencja w repo, pliki poza gitem;
  - Tết i święta 2026–2031 ze źródłami.
- **Technika:**
  - silnik dostaje pole roku i kontrolę typów lotnisk i dat;
  - każde miejsce ma swój plik `content/<id>.js`; do tego `ui.js`, `page.js` i rysowanie w `app.js`;
  - testy obejmują kompletność treści, typografię, klucze interfejsu, link zapisany i odczytany oraz test kombinacji z planami dni;
  - `run.sh` pilnuje listy testów;
  - build jak w pierwowzorze i zrzuty na szerokości telefonu.

Doprecyzowania w tym planie, do zatwierdzenia razem z nim:
- **Dla Hội An wystarczą 1–2 nowe zdjęcia.** W pierwowzorze jest już nieużywane `hoian_3` (odnogi Thu Bồn przy Cẩm Kim), więc miejsce ma 3 zdjęcia jeszcze przed szukaniem.
- **Most Thanh Toàn** (`hoian_2`) leży koło Huế. Przy kopiowaniu dostaje nazwę `hue_6`.
- **Koszty dni (`pp`) i tabela `COSTS`** z pierwowzoru nie przechodzą do 1B. Budżet w etapie 2 zrobi własny research cen.
- **Pierwszy dzień miejsca to dzień przyjazdu,** z tempem „w drodze” albo „odpoczynek”. Pobyt w dwóch częściach przy trasie tam i z powrotem zaczyna drugą część od planu `again`.
- **Trudny dzień dziedziczy wczesną pobudkę i plan na deszcz** po dniu zwykłym, chyba że ma własne.
- **Ostrzeżenie o Tết obejmuje tydzień przed i tydzień po dniach wolnych** (`TET_MARGIN_DAYS = 7`), bo wtedy transport też jest pełny.

## Jak działa strona

1. **Ustawienia w adresie.**
   - `parseLink` czyta część adresu po `#`.
   - `settingsFromLink` kładzie pola linku na ustawienia domyślne. Pole, które silnik odrzuca, wraca do wartości domyślnej, a strona o tym mówi.
   - Każda zmiana w formularzu albo przycisk „Dodaj”/„Usuń” przechodzi przez `apply`: `normSettings` → `planRoute` → `stopDays` dla każdego pobytu → render → `history.replaceState` z nowym `linkHash`.
   - Gdy trasy nie ma, zostaje poprzednia, a pod ustawieniami pojawia się komunikat.
2. **Plany dni pobytu** (`stopDays`):
   - pobyt na `n` nocy bierze `n` planów o najniższym `p` i układa je według `o`;
   - jedna noc to wersja `solo` planu `p 1`;
   - drugi pobyt w tym samym mieście zaczyna się od `again` i bierze kolejne plany według `p`;
   - poziom wybiera wariant (`variantOf`): 1 to `easy`, 3 to `hard`, chyba że miesiąc jest w `hard.off`.
3. **Przejazdy:**
   - `legCard` pokazuje odcinki `leg` z silnika;
   - tekst odcinka drogą podaje `segKey`, a lot pokazuje nazwy lotnisk z `AIRPORTS`;
   - uwagi pod przejazdem daje `legNotes`.
4. **Ostrzeżenia:** `tripAlerts` porównuje termin z `HOLIDAYS`. W trybie miesiąca liczy się cały miesiąc, a przy Tết margines tygodnia.
5. **Odnośniki wewnątrz strony** (pasek dni, menu) przewijają widok bez zmiany adresu, bo adres trzyma ustawienia.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/engine.js` | (zmiana) pole roku w trybie miesiąca, typy lotnisk i dat |
| `site2/src/holidays.js` | `HOLIDAYS`, `HOLIDAYS_FROM`, `HOLIDAYS_UNTIL`, `PLAN_LAST_YEAR`, `TET_MARGIN_DAYS` |
| `site2/src/content.js` | `CONTENT` (pusty), `PACES`, `REGIONS`, `AIRPORTS`, `ROAD_KEYS` i opis pól treści |
| `site2/src/content/<id>.js` | treść jednego miejsca: `CONTENT.<id> = { … }` (14 plików) |
| `site2/src/photos.js` | `PHOTO_META` (podpis, autor, licencja, strona na Commons), `HERO_PHOTO` |
| `site2/src/ui.js` | `UI.pl`: teksty interfejsu (klucze) |
| `site2/src/page.js` | czyste funkcje strony: link, ustawienia domyślne, miesiące, plany dni, daty i święta, liczby trasy, miejsca poza trasą, „Dodaj” i „Usuń”, teksty przejazdów, `nightForm`, `tieShort` |
| `site2/src/app.js` | (z pierwowzoru) DOM: formularz, render trasy, mapa, galerie, lightbox, kopiowanie |
| `site2/src/template.html` | (z pierwowzoru) HTML i CSS |
| `site2/src/basemap.js` | (z pierwowzoru, bez zmian) kontury mapy |
| `site2/build.py` | (z pierwowzoru) build: `out/web` (fragment do artifactu), `out/pages` (GitHub Pages), `out/offline` |
| `tests/engine.test.js` | (zmiana) rok i typy |
| `tests/data.test.js` | (zmiana) święta, zdjęcia |
| `tests/page.test.js` | czyste funkcje strony |
| `tests/content.test.js` | treść, zdjęcia w użyciu, typografia, styl, klucze interfejsu |
| `tests/combos.test.js` | (zmiana) plany dni każdego pobytu na każdym poziomie |
| `tests/run.sh` | (zmiana) nowe pliki, lista testów, lintery |
| `tests/shot.sh`, `tests/probe.sh`, `tests/print.sh` | (z pierwowzoru) zrzut, sonda i wydruk zbudowanej strony |
| `tests/probes/link.js`, `anchors.js`, `changes.js` | sondy: link i kopiowany plan, odnośniki, „Dodaj”/„Usuń” i błędne ustawienia |
| `research/swieta-2026-10.md` | Tết i święta 2026–2031 |
| `research/trudne-dni-2026-10.md` | trudne dni dla poziomu 3 |
| `research/ta-nang-2026-10.md` | kopia ustalenia o Tà Năng z pierwowzoru |
| `research/plany-dni-2026-10.md` | nowe i poprawione fakty w planach dni |
| `photos/` (poza gitem) | pliki zdjęć i `meta.json` |

**Kolejność i równoległość:**
- Zadania 2, 3 i 4 (research i zdjęcia) nie zależą od siebie ani od zadania 1, więc można je zlecić równolegle od początku.
- Zadanie 5 potrzebuje zdjęć z zadania 4, a zadania 7 i 8 researchu z zadania 3.
- Zadania 9 i 10 budują stronę na wszystkim wcześniejszym, zadanie 11 to punkt kontrolny etapu 1.

---

### Zadanie 1: Silnik: rok w trybie miesiąca, typy lotnisk i dat

**Pliki:**
- Zmień: `site2/src/engine.js` (funkcja `normSettings`), `tests/engine.test.js` (dopisz na końcu)

**Interfejsy:**
- Korzysta z: `normSettings`, `isoDay` (plan 1A) i `fxSet` z `tests/engine.test.js`.
- Daje: `normSettings` przyjmuje w trybie miesiąca `year` (liczba całkowita 2000–2100, opcjonalna) i zwraca `year` (`null` przy datach albo bez roku). Lotniska i daty muszą być tekstem. Nowy kod błędu to `year`.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/engine.test.js`:

```js
/* ---------- settings: the year and the types of airports and dates (plan 1B) ---------- */
eq([fxSet({ from: 'XA', to: 'XD', month: 2, year: 2027, days: 6 }).year, fxSet({ from: 'XA', to: 'XD', month: 2, days: 6 }).year],
  [2027, null], 'the year in the month mode, optional');
eq(fxSet({ from: 'XA', to: 'XD', start: '2027-01-30', end: '2027-02-03', year: 'x' }).year, null, 'with dates, the year is not read');
[
  [{ from: 'XA', to: 'XD', month: 2, year: '2027', days: 6 }, 'year'],
  [{ from: 'XA', to: 'XD', month: 2, year: 2027.5, days: 6 }, 'year'],
  [{ from: 'XA', to: 'XD', month: 2, year: 1999, days: 6 }, 'year'],
  [{ from: 'XA', to: 'XD', month: 2, year: 2101, days: 6 }, 'year'],
  // a list or an object would pass as its text: ['XA'] is 'XA' to hasOwnProperty and to a regular expression
  [{ from: ['XA'], to: 'XD', month: 2, days: 6 }, 'airport'],
  [{ from: 'XA', to: { toString: function () { return 'XD'; } }, month: 2, days: 6 }, 'airport'],
  [{ from: 'XA', to: 'XD', start: ['2027-01-30'], end: '2027-02-03' }, 'date'],
  [{ from: 'XA', to: 'XD', start: '2027-01-30', end: 20270203 }, 'date']
].forEach(function (c) { eq(fxSet(c[0]), { ok: false, error: c[1] }, 'error ' + c[1] + ' for ' + JSON.stringify(c[0])); });
print('year and types ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: Error: the year in the month mode, optional: got [null,null], want [2027,null]`

- [ ] **Krok 3: Implementacja** — w `site2/src/engine.js` zastąp komentarz nad `normSettings` i jej początek aż do linii `out.month = s.month; out.days = s.days;` włącznie:

```js
/* Settings from the page or a link, checked. The term is either start + end dates (YYYY-MM-DD) or month (1–12) + days,
   with an optional year (2000–2100) in the month mode; with dates, month, year and days are not read. Airports and dates
   must be texts; month, year, days and level numbers; interests, add and remove lists (null counts as missing: a missing
   level is 2, a missing list is empty). The page turns the text of a link into those first: a text would be read as digits
   or by substring ('gorykultura' holds two interests), and a list as its text (['XA'] as 'XA'), so any other type is refused.
   Returns { ok: true, from, to, days, start, month, year, months, interests, level, add, remove } or { ok: false, error },
   error being the field refused: airport, date, month, year, days, interests, level, add or remove.
   months[d - 1] is the month (0–11) of trip day d: day 1 is the arrival day, the last day the flight home. */
function normSettings(s, places, hubs) {
  if (typeof s.from !== 'string' || typeof s.to !== 'string' || !hubs.hasOwnProperty(s.from) || !hubs.hasOwnProperty(s.to)) {
    return { ok: false, error: 'airport' };
  }
  var out = { ok: true, from: s.from, to: s.to, start: null, month: null, year: null, months: [] };
  if (s.start != null) {
    if (typeof s.start !== 'string' || typeof s.end !== 'string') return { ok: false, error: 'date' };
    var a = isoDay(s.start), b = isoDay(s.end);
    if (a === null || b === null) return { ok: false, error: 'date' };
    out.start = s.start; out.days = b - a + 1;
  } else {
    if (!(typeof s.month === 'number' && s.month >= 1 && s.month <= 12 && s.month % 1 === 0)) return { ok: false, error: 'month' };
    if (s.year != null && !(typeof s.year === 'number' && s.year >= 2000 && s.year <= 2100 && s.year % 1 === 0)) return { ok: false, error: 'year' };
    out.month = s.month; out.year = s.year == null ? null : s.year; out.days = s.days;
```

Reszta funkcji zostaje bez zmian, od komentarza `// the days check comes before any loop…`.

- [ ] **Krok 4: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `year and types ok`, na końcu `ALL PASS`

- [ ] **Krok 5: Commit**

```bash
git add site2/src/engine.js tests/engine.test.js
git commit -F - <<'EOF'
Silnik: rok w trybie miesiąca (dla ostrzeżeń o Tết) i kontrola, że lotniska i daty są tekstem

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Tết i święta (research i dane)

**Pliki:**
- Utwórz: `research/swieta-2026-10.md`, `site2/src/holidays.js`
- Zmień: `tests/data.test.js` (dopisz na końcu), `tests/run.sh` (lista `SOURCES`)

**Interfejsy:**
- Daje:
  - `HOLIDAYS`: wiersze `[pierwszy dzień, ostatni dzień, rodzaj, nazwa]`, daty `RRRR-MM-DD`, rodzaj `'tet'` albo `'holiday'`, posortowane według daty;
  - `HOLIDAYS_FROM = '2026-10-01'`, `HOLIDAYS_UNTIL = '2031-01-31'`, `PLAN_LAST_YEAR = 2030`, `TET_MARGIN_DAYS = 7`.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/data.test.js`:

```js
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
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: HOLIDAYS`

- [ ] **Krok 3: Research** (WebSearch, `mode: "extended"`, źródła wietnamskie i oficjalne) — utwórz `research/swieta-2026-10.md`. Notatka zawiera:
  - **Prawo:** dni wolne według Kodeksu pracy 2019, art. 112:
    - Nowy Rok: 1 dzień;
    - Tết: 5 dni;
    - Święto Królów Hùng (10. dzień 3. miesiąca księżycowego): 1 dzień;
    - 30.04 i 1.05: 2 dni;
    - Święto Narodowe 2.09 z dniem przed albo po: 2 dni.

    Sprawdź, czy w latach 2025–2026 doszły nowe dni wolne albo zmieniły się istniejące, i podaj źródło stanu prawa na październik 2026.
  - **Pierwszy dzień Tết (1. dzień 1. miesiąca księżycowego) w latach 2027–2031** według źródła wietnamskiego (lịch âm). Wietnam liczy kalendarz w UTC+7, więc data może się różnić od chińskiej.
  - **Dni wolne Tết dla każdego roku:**
    - według ogłoszonej decyzji rządu, jeśli już jest (przy 2027 sprawdź, czy harmonogram ogłoszono do października 2026);
    - w pozostałych latach według reguły z poprzednich lat, z opisem reguły i słowem „szacunek”.
  - **Święto Królów Hùng w latach 2027–2030** (data gregoriańska).
  - **Dni wolne w latach 2027–2030:** 1.01, 30.04–1.05 i 2.09 z przyległym dniem oraz dni odpracowywane, jeśli je ogłoszono. Do tego 1.01.2031.
  - **Tabela wierszy:** `pierwszy dzień | ostatni dzień | rodzaj | nazwa po polsku | źródło | ogłoszone czy szacunek`. Nazwy: „Nowy Rok”, „Tết”, „Święto Królów Hùng”, „Dzień Zjednoczenia i Święto Pracy”, „Święto Narodowe”.
  - **Źródło przy każdym wierszu** (URL i data sprawdzenia) oraz krótko, dlaczego tydzień przed i po Tết też jest trudny (powroty do domu, zamknięte firmy).

- [ ] **Krok 4: Dane** — utwórz `site2/src/holidays.js`. Wiersze przepisz z tabeli z kroku 3, w kolejności dat:

```js
/* Tết and the national holidays in Vietnam as days off, for the warnings on the page. Dates, rules and sources:
   research/swieta-2026-10.md. Each row: [first day, last day, kind, name], YYYY-MM-DD, sorted by date.
   kind 'tet': the Lunar New Year days off (much is closed, transport and rooms sell out); 'holiday': a national holiday
   (domestic travel peaks). HOLIDAYS_FROM…HOLIDAYS_UNTIL: the days the list covers. PLAN_LAST_YEAR: the last year a trip
   can start in on the page, so a trip of MAX_DAYS from its last day still ends inside the list. */
var HOLIDAYS = [
  ['2027-01-01', '2027-01-01', 'holiday', 'Nowy Rok']
  // …the other rows of the table in research/swieta-2026-10.md, one per line, through Tết 2031
];
var HOLIDAYS_FROM = '2026-10-01', HOLIDAYS_UNTIL = '2031-01-31', PLAN_LAST_YEAR = 2030;
var TET_MARGIN_DAYS = 7;   // the week before and after Tết is busy too: people travel home and back
```

Pierwszy wiersz z bloku zostaje, a komentarz z wielokropkiem znika: w jego miejscu są wszystkie pozostałe wiersze z tabeli, ostatni to Tết 2031.

- [ ] **Krok 5: Dodaj plik do testów** — w `tests/run.sh` zmień linię `SOURCES` na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js"
```

- [ ] **Krok 6: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `holidays ok`, na końcu `ALL PASS`

- [ ] **Krok 7: Commit**

```bash
git add research/swieta-2026-10.md site2/src/holidays.js tests/data.test.js tests/run.sh
git commit -F - <<'EOF'
Dane: Tết i święta państwowe 2026–2031 ze źródłami, do ostrzeżeń na stronie

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Trudne dni (research)

**Pliki:**
- Utwórz: `research/trudne-dni-2026-10.md`, `research/ta-nang-2026-10.md` (kopia z pierwowzoru)
- Zmień: `research/sezony-2026-10.md` (źródło „Prototyp-TaNang”)

**Interfejsy:**
- Daje zadaniom 7 i 8 werdykt dla każdego z 13 miejsc (bez nocy w Hà Nội w drodze): czy ma trudny dzień, co to za dzień i który zwykły dzień zastępuje.

- [ ] **Krok 1: Kopia ustalenia o Tà Năng.** W `research/sezony-2026-10.md` zmień opis źródła „Prototyp-TaNang”: zamiast pliku w repozytorium pierwowzoru wpisz `research/ta-nang-2026-10.md` (kopia z 10.10.2026 notatki z 8.10.2026). Tak zamyka się uwaga z `notes/etapy.md` o Tà Năng.

```bash
P=~/Desktop/"CLAUDE roboczy plik"/vietnam-planner
cp "$P/research/ta-nang-status-2026-10.md" research/ta-nang-2026-10.md
```

- [ ] **Krok 2: Research** (WebSearch, `mode: "extended"`; strony operatorów, parków i prasy wietnamskiej) — utwórz `research/trudne-dni-2026-10.md`.
  - **Kryteria trudnego dnia:**
    - wyraźnie trudniejszy od zwykłego dnia miejsca: 6–10 godzin marszu, wspinaczka, noc w terenie ze strażnikiem albo dłuższa wyprawa łodzią;
    - mieści się w jednym dniu planu, z noclegiem w miejscu albo w terenie;
    - prowadzi go licencjonowany przewodnik albo operator (wizja, pkt 5).
  - **Dla każdego miejsca** (saigon, mekong, phuquoc, cattien, dalat, hoian, hue, puluong, ninhbinh, catba, hanoi, babe, caobang) podaj:
    - werdykt „tak” albo „nie” i krótko dlaczego;
    - przy „tak”: co to za dzień i gdzie;
    - kto go prowadzi (nazwy operatorów, bez linków afiliacyjnych);
    - długość i trudność, pozwolenia, ryzyka;
    - miesiące, w których go nie ma (sezon, zamknięcia, zakazy), ze źródłem;
    - orientacyjna cena w EUR z datą (do budżetu w etapie 2);
    - który zwykły dzień zastępuje (numer `p` z treści miejsca w pierwowzorze).
  - **Kandydaci do sprawdzenia:**
    - Cát Tiên: noc w dżungli, np. stacja strażników przy Bàu Sấu;
    - Đà Lạt: Lang Biang albo Bidoup pieszo;
    - Pù Luông: dłuższy trekking grzbietami z wioską w głębi rezerwatu;
    - Cát Bà: wspinaczka skałkowa albo cały dzień w kajaku z operatorem;
    - Ba Bể: dłuższy trekking. Kajaki są tam zakazane od lipca 2026, zob. `research/sezony-2026-10.md`, „Ba Bể”;
    - Cao Bằng: dłuższa wędrówka, np. pod szczyt Núi Mắt Thần.

    Przy pozostałych miejscach krótko uzasadnij „nie”, jeśli nic sensownego nie ma.
  - **Czego nie wpisywać jako trudnego dnia:**
    - wyprawy wielodniowe (Tà Năng–Phan Dũng, Hang Én, Tú Làn), bo to osobne moduły w etapie 3;
    - samodzielna jazda motocyklem, bo to zamiana albo–albo w etapie 2;
    - Bạch Mã, bo to moduł partii B.
  - Na końcu podsumowanie: tabela „miejsce | werdykt | zastępuje dzień p | miesiące wyłączone | źródła”.

- [ ] **Krok 3: Sprawdź notatkę.** Każdy wiersz z werdyktem „tak” ma źródło z datą i nazwę operatora albo instytucji. Każde miejsce z listy ma werdykt.

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS` (zadanie nie zmienia kodu)

- [ ] **Krok 4: Commit**

```bash
git add research/trudne-dni-2026-10.md research/ta-nang-2026-10.md research/sezony-2026-10.md
git commit -F - <<'EOF'
Research: trudne dni dla poziomu „ekstremalnie” i kopia ustalenia o Tà Năng

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Zdjęcia

**Pliki:**
- Utwórz: `photos/` (poza gitem: kopia z pierwowzoru i nowe zdjęcia Hội An), `site2/src/photos.js`
- Zmień: `tests/data.test.js` (dopisz na końcu), `tests/run.sh` (lista `SOURCES`)

**Interfejsy:**
- Daje:
  - `PHOTO_META`: `{ <id>: { cap, artist, license, page } }`, jeden wpis w linii, w kolejności miejsc;
  - `HERO_PHOTO = 'ninhbinh_1'`.
- Galerie miejsc dla zadania 5:
  - saigon: `saigon_0`–`saigon_4`;
  - mekong: `mekong_0`, `mekong_2`, `mekong_3`, `mekong_1`;
  - phuquoc: `phuquoc_0`, `phuquoc_1`, `phuquoc_2`, `phuquoc_5`;
  - cattien: `cattien_0`, `cattien_1`, `cattien_3`, `cattien_4`;
  - dalat: `dalat_0`, `dalat_1`, `dalat_2`, `dalat_4`, `dalat_3`;
  - hoian: `hoian_0`, `hoian_1`, `hoian_3` i 1–2 nowe (`hoian_4`, `hoian_5`);
  - hue: `hue_0`, `hue_1`, `hue_2`, `hue_6`, `hue_4`;
  - puluong: `puluong_1`, `puluong_2`, `puluong_3`, `puluong_0`, `puluong_5`;
  - ninhbinh: `ninhbinh_0`, `ninhbinh_3`, `ninhbinh_4`, `ninhbinh_5`, `ninhbinh_6`;
  - catba: `catba_0`, `catba_3`, `catba_1`, `catba_2`, `catba_6`;
  - hanoi: `hanoi_0`, `hanoi_1`, `hanoi_3`, `hanoi_5`;
  - babe: `babe_0`, `babe_1`, `babe_2`, `babe_3`, `babe_5`;
  - caobang: `caobang_0`, `caobang_6`, `caobang_1`, `caobang_2`, `caobang_3`;
  - hanoiStop: bez zdjęć.

- [ ] **Krok 1: Test, który nie przechodzi** — dopisz na końcu `tests/data.test.js`:

```js
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
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: PHOTO_META`

- [ ] **Krok 3: Kopia zdjęć.** Most Thanh Toàn leży koło Huế, więc dostaje nazwę `hue_6`:

```bash
P=~/Desktop/"CLAUDE roboczy plik"/vietnam-planner
mkdir -p photos
cp "$P"/photos/*.jpg "$P"/photos/meta.json photos/
mv photos/hoian_2.jpg photos/hue_6.jpg
git status --short photos   # nic: photos/ jest w .gitignore
```

- [ ] **Krok 4: 1–2 nowe zdjęcia Hội An z Wikimedia Commons.**
  - **Szukaj:** stare miasto rano (domy kupieckie, uliczki, most Chùa Cầu) i wioska warzywników Trà Quế.
  - **Licencja:** sprawdź ją na stronie pliku. Wolno tylko CC0, CC BY, CC BY-SA i domenę publiczną. Odrzuć NC, ND, samo GFDL i „fair use”.
  - **Pobierz plik:**

    ```bash
    curl -L -o photos/hoian_4.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/<nazwa pliku>?width=1920"
    ```

  - **Rozmiar:** sprawdź, że plik ma co najmniej 1400 px szerokości:

    ```bash
    python3 -c "from PIL import Image; print(Image.open('photos/hoian_4.jpg').size)"
    ```

  - **Metadane:** dopisz wpis do `photos/meta.json` w kształcie wpisów pierwowzoru: `block`, `title`, `page`, `artist` (pole „Author” ze strony pliku), `license` (np. `CC BY-SA 4.0`), `desc`, `file`, `w`, `h`.

- [ ] **Krok 5: Wygeneruj `site2/src/photos.js`.** Zapisz skrypt w katalogu roboczym sesji (scratchpad), nie w repo, i uruchom go z katalogu repo: `python3 <scratchpad>/photos_meta.py`. Przed uruchomieniem dopisz w `CAPS` podpisy nowych zdjęć Hội An. Podpis jest po polsku i podaje dokładne miejsce.

```python
"""One-off for plan 1B, task 4: photos/meta.json (copied from the December planner) + Polish captions → site2/src/photos.js."""
import json, re

meta = {m["file"][:-4]: m for m in json.load(open("photos/meta.json", encoding="utf-8"))}
meta["hue_6"] = meta.pop("hoian_2")   # the Thanh Toàn bridge lies near Huế: renamed when copied

# in the order of the places; the captions of the December planner (I18N_PL.cap) and new ones for Huế and Hội An
CAPS = {
    "saigon_0": "Rzeka Sajgon o niebieskiej godzinie",
    "saigon_1": "Samotne drzewo namorzynowe u wybrzeża Cần Giờ",
    "saigon_2": "Kładka przez namorzyny Rừng Sác, Cần Giờ",
    "saigon_3": "Kadzidła w świątyni Thiên Hậu, Chợ Lớn",
    "saigon_4": "Suszone produkty na targu Bình Tây",
    "mekong_0": "Wioślarz na Mekongu tuż przed wschodem słońca",
    "mekong_2": "Pływający targ Cái Răng, Cần Thơ",
    "mekong_3": "Handel z łodzi w Phong Điền",
    "mekong_1": "Kanał wśród palm nipa w delcie",
    "phuquoc_0": "Granitowe głazy na jednej z plaż Phú Quốc",
    "phuquoc_1": "Rozgwiazdy na płyciźnie, Phú Quốc",
    "phuquoc_2": "Zachód słońca nad Zatoką Tajlandzką",
    "phuquoc_5": "Cicha plaża koło Hàm Ninh",
    "cattien_0": "Łódź rybacka na jeziorze wśród mokradeł Cát Tiên",
    "cattien_1": "Zachód słońca nad mokradłami Cát Tiên",
    "cattien_3": "Korzenie deskowe olbrzyma z nizinnego lasu",
    "cattien_4": "Mokradła widziane ze skraju lasu",
    "dalat_0": "Na szlaku Tà Năng w porze suchej",
    "dalat_1": "Potok i rozlewisko przy Hòn Giao, Park Narodowy Bidoup–Núi Bà",
    "dalat_2": "Stare sosny w Bidoup–Núi Bà po deszczu",
    "dalat_4": "Widok z góry Lang Biang",
    "dalat_3": "Namioty na trawiastych wzgórzach Tà Năng",
    "hoian_0": "Nabrzeże Hội An nad rzeką Thu Bồn",
    "hoian_1": "Łódka-kosz wśród wodnych palm kokosowych",
    "hoian_3": "Odnogi rzeki Thu Bồn przy wyspie Cẩm Kim, Hội An",
    # "hoian_4": "…", "hoian_5": "…",   ← podpisy nowych zdjęć z kroku 4
    "hue_0": "Grobowiec cesarza Minh Mạng w Huế we mgle",
    "hue_1": "Pawilon Minh Lâu w grobowcu cesarza Minh Mạng, Huế",
    "hue_2": "Grobowiec cesarza Tự Đức w Huế",
    "hue_6": "Kryty dachówką most Thanh Toàn koło Huế",
    "hue_4": "Przełęcz Hải Vân nad morzem",
    "puluong_1": "Zachód słońca nad doliną Pù Luông w listopadzie",
    "puluong_2": "Wioska wśród pól ryżowych, Pù Luông",
    "puluong_3": "Bambusowa tratwa pchana tyczką po rzece",
    "puluong_0": "Tarasy Pù Luông w porze zbiorów (wrzesień)",
    "puluong_5": "Tkanie na drewnianym krośnie w domu",
    "ninhbinh_1": "Łódź wiosłowa pod skałami Tràng An",
    "ninhbinh_0": "Wapienne turnie w Tràng An",
    "ninhbinh_3": "Mokradła Vân Long o złotej godzinie",
    "ninhbinh_4": "Langur Delacoura na wapiennej skale",
    "ninhbinh_5": "Przez jaskinię na wodnej trasie Tràng An",
    "ninhbinh_6": "Hoa Lư, królewska stolica z X wieku",
    "catba_0": "Dżonki na Zatoce Lan Hạ",
    "catba_3": "Poranna mgiełka nad wyspami u brzegów Cát Bà",
    "catba_1": "Mała plaża nad Zatoką Lan Hạ",
    "catba_2": "Pływająca hodowla ryb u brzegów Cát Bà",
    "catba_6": "Wioska Việt Hải, Park Narodowy Cát Bà",
    "hanoi_0": "Pociąg na moście Long Biên",
    "hanoi_1": "Główna brama Świątyni Literatury",
    "hanoi_3": "Laterytowa uliczka w wiosce Đường Lâm",
    "hanoi_5": "Dom na palach w ogrodzie Muzeum Etnologii",
    "babe_0": "Łódź na jeziorze Ba Bể",
    "babe_1": "Gładka tafla jeziora Ba Bể",
    "babe_2": "Dom na palach ludu Tày nad jeziorem",
    "babe_3": "Pola Pác Ngòi między jeziorem a wzgórzami",
    "babe_5": "Śpiew Then przy dźwiękach lutni tính",
    "caobang_0": "Wodospad Bản Giốc z przystani bambusowych tratw",
    "caobang_6": "Núi Mắt Thần, czyli góra Oko Anioła",
    "caobang_1": "Bản Giốc nad polami ryżowymi",
    "caobang_2": "We wnętrzu jaskini Ngườm Ngao",
    "caobang_3": "Krasowe wzgórza odbite w polu ryżowym koło Bản Giốc",
}


def clean_artist(a):
    """As in the December planner's build: no Wikipedia talk-page suffix, single spaces."""
    a = re.sub(r"\s*\(thảo luận\).*$", "", a)
    a = re.sub(r"\s+", " ", a).strip(" ,")
    return a or "autor nieznany"


def q(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


lines = [
    "/* Every photo the page shows: caption (Polish, the exact place), author, licence and its page on Wikimedia Commons.",
    "   Allowed licences: CC0, CC BY, CC BY-SA and public domain, no NC or ND (notes/wizja.md). The image files are in",
    "   photos/ (not in git; copied from the December planner and checked 10.10.2026); site2/build.py makes the web copies. */",
    "var PHOTO_META = {",
]
for pid, cap in CAPS.items():
    m = meta[pid]
    lines.append("  %s: { cap: %s, artist: %s, license: %s, page: %s }," % (pid, q(cap), q(clean_artist(m["artist"])), q(m["license"]), q(m["page"])))
lines[-1] = lines[-1].rstrip(",")
lines += ["};", "var HERO_PHOTO = 'ninhbinh_1';   // the photo at the top of the page and in the link preview"]
open("site2/src/photos.js", "w", encoding="utf-8").write("\n".join(lines) + "\n")
print(len(CAPS), "photos")
```

- [ ] **Krok 6: Dodaj plik do testów** — w `tests/run.sh` zmień linię `SOURCES` na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/photos.js"
```

- [ ] **Krok 7: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `photos ok`, na końcu `ALL PASS`. Skrypt z kroku 5 wypisał `61 photos` albo `62 photos`.

- [ ] **Krok 8: Commit** (bez `photos/`)

```bash
git add site2/src/photos.js tests/data.test.js tests/run.sh
git commit -F - <<'EOF'
Dane: podpisy, autorzy i licencje zdjęć (z pierwowzoru, grobowce Huế i nowe zdjęcia Hội An)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Model treści i przeniesienie tekstów z pierwowzoru

**Pliki:**
- Utwórz: `site2/src/content.js`, `site2/src/content/<id>.js` (14 plików), `tests/content.test.js`
- Zmień: `tests/run.sh`, `research/sezony-2026-10.md` (opis źródła PR1)

**Interfejsy:**
- Korzysta z:
  - `PLACES`, `HUBS`, `ROADS`, `FLIGHTS`, `travelGraph`, `LEVELS` (plan 1A);
  - `PHOTO_META`, `HERO_PHOTO` (zadanie 4);
  - `HOLIDAYS` (zadanie 2).
- Daje:
  - `CONTENT.<id>` dla każdego `id` z `PLACES` (pola opisane w nagłówku `content.js`);
  - `PACES = ['travel', 'hike', 'nature', 'boat', 'culture', 'rest']`;
  - `REGIONS = ['south', 'centre', 'north']`;
  - `AIRPORTS.<kod> = { name, maps, pt }` dla każdego lotniska z danych przejazdów;
  - `ROAD_KEYS = { 'cattien-dalat': 'r.car_baoloc', 'hoian-hue': 'r.haivan' }`.
- Testy dla kolejnych zadań:
  - `contentCheck` i `strings` w `tests/content.test.js`;
  - `styleOk(need, list)`: reguły stylu dla listy par `[ścieżka, tekst]`;
  - `REWRITTEN`: miejsca już przepisane; zadania 7 i 8 dopisują swoje.

- [ ] **Krok 1: Test, który nie przechodzi** — utwórz `tests/content.test.js`:

```js
/* The texts of the places (content.js, content/<id>.js) and the photos they show (photos.js): every place the engine
   plans with has its texts and enough day plans for every stay the engine can make, the versions have the right shape,
   every photo is shown once, and the Polish typography holds. Every problem is listed by name. */
function contentCheck(label, body) {
  var fails = [];
  body(function need(c, what) { if (!c) fails.push(what); });
  fails.forEach(function (f) { print('  ' + label + ': ' + f); });
  ok(!fails.length, fails.length + ' problem(s) in ' + label + ', listed above');
  print(label + ' ok');
}
function isText(v) { return typeof v === 'string' && v.trim() !== '' && v === v.trim(); }
// every text in v, as [path, text] pairs added to out
function strings(v, path, out) {
  if (typeof v === 'string') out.push([path, v]);
  else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { strings(v[k], path + '.' + k, out); });
  return out;
}
var CITIES = {};   // the airports' cities: on a round trip they come twice
Object.keys(HUBS).forEach(function (code) { CITIES[HUBS[code]] = true; });

contentCheck('content', function (need) {
  var PLACE_KEYS = ['name', 'short', 'sub', 'region', 'maps', 'pt', 'photos', 'days', 'again', 'gem', 'skip', 'instead'];
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'easy', 'hard', 'solo'];
  // a plan or a version of one: pace, title, text, maybe an early start
  function plan(w, d, keys) {
    Object.keys(d).forEach(function (k) { need(keys.indexOf(k) > -1, w + ': unknown field ' + k); });
    need(PACES.indexOf(d.pace) > -1, w + ': pace one of ' + PACES.join(', '));
    need(isText(d.t) && isText(d.d), w + ': title t and text d');
    if (d.early != null) need(typeof d.early === 'boolean', w + ': early is true or false');
  }
  Object.keys(PLACES).forEach(function (id) {
    var c = CONTENT[id], p = PLACES[id];
    need(c, id + ': no texts (site2/src/content/' + id + '.js)');
    if (!c) return;
    Object.keys(c).forEach(function (k) { need(PLACE_KEYS.indexOf(k) > -1, id + ': unknown field ' + k); });
    ['name', 'short', 'sub', 'maps'].forEach(function (k) { need(isText(c[k]), id + ': ' + k); });
    need(REGIONS.indexOf(c.region) > -1, id + ': region one of ' + REGIONS.join(', '));
    need(Array.isArray(c.pt) && c.pt.length === 2 && c.pt[0] > 8 && c.pt[0] < 24 && c.pt[1] > 102 && c.pt[1] < 110, id + ': pt is [lat, lon] in Vietnam');
    var range = p.node ? [0, 0] : [3, 5];
    need(Array.isArray(c.photos) && c.photos.length >= range[0] && c.photos.length <= range[1], id + ': ' + range.join('–') + ' photos');
    (c.photos || []).forEach(function (ph) { need(PHOTO_META[ph], id + ': photo ' + ph + ' is not in photos.js'); });
    var days = Array.isArray(c.days) ? c.days : [];
    need(days.length >= p.nights[2], id + ': ' + p.nights[2] + ' day plans or more, one for each night of the longest stay');
    days.forEach(function (d, i) {
      var w = id + ' day ' + (i + 1);
      plan(w, d, DAY_KEYS);
      if (d.rain != null) need(isText(d.rain), w + ': rain is a text');
      if (d.easy) plan(w + ' easy', d.easy, ['pace', 't', 'd', 'early']);
      if (d.hard) {
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off']);
        if (d.hard.off != null) {
          need(Array.isArray(d.hard.off) && d.hard.off.length < 12 && d.hard.off.every(function (m) { return m % 1 === 0 && m >= 1 && m <= 12; }),
            w + ' hard: off lists months 1–12, not all of them');
        }
      }
      if (d.solo) {
        plan(w + ' solo', d.solo, ['pace', 't', 'd', 'early']);
        need(d.p === 1, w + ': solo only on the p 1 day');
      }
      need(d.pace !== 'hike' || (d.easy && d.easy.pace !== 'hike'), w + ': a hiking day needs an easy version without a hike, for level 1');
    });
    var want = days.map(function (d, i) { return i + 1; });
    function sorted(k) { return days.map(function (d) { return d[k]; }).sort(function (a, b) { return a - b; }); }
    need(JSON.stringify(sorted('p')) === JSON.stringify(want), id + ': p is 1…' + days.length + ', each once');
    need(JSON.stringify(sorted('o')) === JSON.stringify(want), id + ': o is 1…' + days.length + ', each once');
    var first = days.filter(function (d) { return d.p === 1; })[0];
    need(first && (first.pace === 'travel' || first.pace === 'rest'), id + ': the p 1 day is an arrival day (pace travel or rest)');
    if (p.nights[0] === 1 && p.nights[2] > 1) need(first && first.solo, id + ': a stay of one night is possible, so the p 1 day needs a solo plan');
    need(!!c.again === !!CITIES[id], id + (CITIES[id] ? ': an airport\'s city needs again, the arrival day of its second stay' : ': again belongs to an airport\'s city only'));
    if (c.again) {
      plan(id + ' again', c.again, ['pace', 't', 'd', 'early']);
      need(c.again.pace === 'travel' || c.again.pace === 'rest', id + ' again: pace travel or rest');
    }
    ['gem', 'skip', 'instead'].forEach(function (k) { if (c[k] != null) need(isText(c[k]), id + ': ' + k); });
    need((c.skip == null) === (c.instead == null), id + ': skip and instead go together');
  });
  Object.keys(CONTENT).forEach(function (id) { need(PLACES[id], 'texts for an unknown place: ' + id); });
  // every airport of the travel data has its name, place for Google Maps and point on the map
  travelGraph(ROADS, FLIGHTS).nodes.forEach(function (n) {
    if (/^[A-Z]{3}$/.test(n)) need(AIRPORTS[n] && isText(AIRPORTS[n].name) && isText(AIRPORTS[n].maps) && AIRPORTS[n].pt, 'AIRPORTS.' + n);
  });
  Object.keys(ROAD_KEYS).forEach(function (k) {
    need(k === k.split('-').sort().join('-') && k.split('-').every(function (id) { return PLACES[id]; }), 'ROAD_KEYS ' + k + ': two places in alphabetical order');
  });
});

contentCheck('photos in use', function (need) {
  var used = {};
  used[HERO_PHOTO] = 'the top of the page';
  Object.keys(CONTENT).forEach(function (id) {
    (CONTENT[id].photos || []).forEach(function (ph) { need(!used[ph], ph + ' shown twice: ' + used[ph] + ' and ' + id); used[ph] = id; });
  });
  Object.keys(PHOTO_META).forEach(function (ph) { need(used[ph], ph + ' is in photos.js, but no place shows it'); });
});

contentCheck('typography', function (need) {
  var all = strings(CONTENT, 'CONTENT', []);
  Object.keys(PHOTO_META).forEach(function (ph) { all.push(['PHOTO_META.' + ph + '.cap', PHOTO_META[ph].cap]); });
  HOLIDAYS.forEach(function (h, i) { all.push(['HOLIDAYS[' + i + ']', h[3]]); });
  all.forEach(function (x) {
    need(!/"/.test(x[1]), x[0] + ': straight quotes, use „…”');
    need(!/\d\s*(am|pm)\b/i.test(x[1]), x[0] + ': am/pm, use 24-hour time');
    need(!/\d°/.test(x[1]), x[0] + ': no space before °C');
    need(!/\d-\d/.test(x[1]), x[0] + ': a hyphen in a range, use an en dash');
  });
});

/* The style of plan 1B: to one reader (ty), no gendered forms, nothing tied to December. list: [path, text] pairs. */
// words ending in -cie that are no plural address (nouns, adverbs); add one only when it really is not a verb form
var NOT_PLURAL = ['mieście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
  'życie', 'zdjęcie', 'zamknięcie', 'skrócie', 'locie', 'całkowicie', 'obficie', 'znakomicie', 'należycie'];
function styleOk(need, list) {
  list.forEach(function (x) {
    var t = x[1];
    need(!/(^|[^\p{L}])(wy|was|wam|wasz\p{L}*)(?=[^\p{L}]|$)/iu.test(t), x[0] + ': plural address (wy, was, wam, wasz…): write to one reader');
    (t.match(/\p{L}+cie(?=[^\p{L}]|$)/giu) || []).forEach(function (w) {
      need(NOT_PLURAL.indexOf(w.toLowerCase()) > -1, x[0] + ': „' + w + '” looks like a plural form: write to one reader (a noun goes on NOT_PLURAL)');
    });
    need(!/\p{L}+(łeś|łaś|łbyś|łabyś)(?=[^\p{L}]|$)/iu.test(t), x[0] + ': a gendered form (-łeś, -łaś)');
    need(!/w grudniu|grudniow|wigili|bożego narodzenia/i.test(t), x[0] + ': tied to December: texts are written for any month');
  });
}
// the places whose texts are rewritten for plan 1B; tasks 7 and 8 add theirs, and after task 8 every place is checked
var REWRITTEN = ['hoian', 'hue'];
contentCheck('style', function (need) {
  REWRITTEN.forEach(function (id) { styleOk(need, strings(CONTENT[id], 'CONTENT.' + id, [])); });
});
```

- [ ] **Krok 2: Uruchamianie testów** — zastąp `tests/run.sh`:

```bash
#!/bin/bash
# Runs every test in JavaScriptCore (node is not installed on this Mac). Exit 0 = all pass.
#   bash tests/run.sh          every test; the combination test checks every 7th combination
#   bash tests/run.sh --full   the combination test checks every combination (about half a minute)
# Strict on purpose: every source and test file is listed here (the texts of the places as site2/src/content/*.js),
# a missing or renamed one stops the run instead of being skipped, and every tests/*.test.js must be in TESTS.
# Any other argument prints the usage and stops too.
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
CONTENT_FILES=$(ls site2/src/content/*.js)
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES site2/src/photos.js"
TESTS="tests/engine.test.js tests/data.test.js tests/content.test.js tests/combos.test.js"
MODE=""
if [ $# -eq 1 ] && [ "$1" = "--full" ]; then
  MODE="tests/full.js"
elif [ $# -ne 0 ]; then
  echo "usage: bash tests/run.sh [--full]" >&2
  exit 2
fi
for f in $SOURCES tests/assert.js $MODE $TESTS; do
  if [ ! -f "$f" ]; then
    echo "tests/run.sh: missing file $f" >&2
    exit 1
  fi
done
for t in tests/*.test.js; do
  case " $TESTS " in
    *" $t "*) ;;
    *) echo "tests/run.sh: $t is not in TESTS" >&2; exit 1 ;;
  esac
done
for t in $TESTS; do
  echo "== $t"
  "$J" $SOURCES tests/assert.js $MODE "$t"
done
echo "ALL PASS"
```

- [ ] **Krok 3: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ls: site2/src/content/*.js: No such file or directory` i kod wyjścia różny od zera

- [ ] **Krok 4: Wspólne dane treści** — utwórz `site2/src/content.js`:

```js
/* The texts of the places: one file per place in site2/src/content/, CONTENT.<id> = { … }, loaded after this one.
   Written once for every month, in Polish, to one reader (ty), without gendered forms (notes/wizja.md).
   The fields of a place:
   - name, short, sub: the full name; the short name for the strip, the map and lists; one line under the name;
   - region: one of REGIONS; maps: where Google Maps directions start or end; pt: [lat, lon] on the map;
   - photos: ids from photos.js, 3–5 (none for a night on the way);
   - days: one plan per night of the longest stay (nights[2] in places.js),
     { p, o, pace, t, d, early?, rain?, easy?, hard?, solo? }:
     p: priority, the lowest kept when the stay is short; p 1 is the arrival day (pace travel or rest);
     o: the order within the stay; pace: one of PACES; t: title; d: text; early: starts before 6:00;
     rain: what to do on a wet day (shown after "Gdy pada: ", so it starts with a small letter);
     easy: the plan at level 1 (spokojnie), { pace, t, d, early? }, required on a hiking day;
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off? }; off: the months 1–12 it is not offered;
     solo: on the p 1 day only, the plan of a one-night stay: that evening and the next morning before moving on;
   - again: on an airport's city (HUBS) only: the arrival day of its second stay on a round trip;
   - gem, skip, instead: tips (skip and instead together). */
var CONTENT = {};
var PACES = ['travel', 'hike', 'nature', 'boat', 'culture', 'rest'];
var REGIONS = ['south', 'centre', 'north'];

/* The airports of the travel data: name in texts, place for Google Maps directions, point on the map [lat, lon]. */
var AIRPORTS = {
  SGN: { name: 'Hồ Chí Minh City', maps: 'Tan Son Nhat International Airport', pt: [10.82, 106.66] },
  HAN: { name: 'Hà Nội', maps: 'Noi Bai International Airport', pt: [21.22, 105.80] },
  DAD: { name: 'Đà Nẵng', maps: 'Da Nang International Airport', pt: [16.04, 108.20] },
  HUI: { name: 'Huế', maps: 'Phu Bai International Airport', pt: [16.40, 107.70] },
  DLI: { name: 'Đà Lạt', maps: 'Lien Khuong Airport', pt: [11.75, 108.37] },
  PQC: { name: 'Phú Quốc', maps: 'Phu Quoc International Airport', pt: [10.17, 103.99] },
  VCA: { name: 'Cần Thơ', maps: 'Can Tho International Airport', pt: [10.08, 105.71] },
  HPH: { name: 'Hải Phòng (Cát Bi)', maps: 'Cat Bi International Airport', pt: [20.82, 106.72] },
  THD: { name: 'Thanh Hóa (Thọ Xuân)', maps: 'Tho Xuan Airport', pt: [19.90, 105.47] }
};

/* Roads with a text of their own (UI keys), by their two places in alphabetical order; see segKey in page.js. */
var ROAD_KEYS = { 'cattien-dalat': 'r.car_baoloc', 'hoian-hue': 'r.haivan' };
```

- [ ] **Krok 5: Przeniesienie 12 miejsc z pierwowzoru.**
  - Zapisz skrypt w katalogu roboczym sesji (scratchpad) jako `convert.js`. Skrypt sprawdzono na sucho 10.10.2026 na `cattien` i `hanoiStop`.
  - Skrypt łączy plany dni z `data.js` (`p`, `o`, `pace`, `early`, wersje `e` i `solo`, plan na deszcz) z polskimi tekstami z `I18N_PL`.
  - Koszty `pp`, ostrzeżenie `warn` i etykiety mapy nie przechodzą.

```js
/* One-off for plan 1B, task 5: prints one place of the December planner as a content file, in Polish.
   jsc data.js i18n.js i18n.pl.js convert.js -- <id> > site2/src/content/<id>.js */
var id = arguments[0], en = STOPS[id], tr = I18N_PL.stops[id], ex = I18N_PL.dayExtra[id] || {};
var REGION = { South: 'south', Central: 'centre', North: 'north' };
function q(s) { return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
function obj(o) {
  return '{ ' + Object.keys(o).map(function (k) {
    var v = o[k];
    return k + ': ' + (typeof v === 'string' ? q(v) : v !== null && typeof v === 'object' ? obj(v) : String(v));
  }).join(', ') + ' }';
}
// a day's easy (gentle) or one-night version: pace and early start from data.js, title and text from dayExtra by index
function variant(d, i, kind) {
  var src = kind === 'easy' ? d.e : d.solo, pair = ex[kind][i], o = { pace: src.pace, t: pair[0], d: pair[1] };
  if (src.early != null) o.early = src.early;
  return o;
}
var days = en.days.map(function (d, i) {
  var o = { p: d.p, o: d.o, pace: d.pace, t: tr.days[i][0], d: tr.days[i][1] };
  if (d.early) o.early = true;
  if (d.rain) o.rain = ex.rain[i];
  if (d.e) o.easy = variant(d, i, 'easy');
  if (d.solo) o.solo = variant(d, i, 'solo');
  return o;
});
var head = ['/* ' + tr.name + ': texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */',
  'CONTENT.' + id + ' = {',
  '  name: ' + q(tr.name) + ', short: ' + q(tr.short) + ',',
  '  sub: ' + q(tr.sub) + ',',
  '  region: ' + q(REGION[en.region]) + ', maps: ' + q(en.place) + ', pt: [' + PT[id].join(', ') + '],',
  '  photos: [' + en.photos.map(q).join(', ') + '],',
  '  days: [',
  days.map(function (d) { return '    ' + obj(d); }).join(',\n'),
  '  ]'];
var tail = ['gem', 'skip', 'instead'].filter(function (k) { return tr[k] != null; }).map(function (k) { return '  ' + k + ': ' + q(tr[k]); });
print(head.join('\n') + (tail.length ? ',\n' + tail.join(',\n') : '') + '\n};');
```

Uruchom z katalogu repo (`<scratchpad>` to katalog roboczy sesji):

```bash
P=~/Desktop/"CLAUDE roboczy plik"/vietnam-planner
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
mkdir -p site2/src/content
for id in saigon mekong phuquoc cattien dalat puluong ninhbinh catba hanoi hanoiStop babe caobang; do
  "$J" "$P/site2/src/data.js" "$P/site2/src/i18n.js" "$P/site2/src/i18n.pl.js" <scratchpad>/convert.js -- "$id" > "site2/src/content/$id.js"
done
ls site2/src/content | wc -l   # 12
```

- [ ] **Krok 6: Wersja na jedną noc i drugi przyjazd dla HCMC i Hà Nội.** Oba miasta mają minimum jednej nocy i lotnisko, więc potrzebują `solo` przy dniu `p: 1` i pola `again`.
  - W `site2/src/content/saigon.js`:
    - na końcu obiektu dnia `p: 1` (przed jego `}`) dopisz:

      ```js
      , solo: { pace: 'rest', t: 'Wieczór nad rzeką Sajgon', d: 'Jedna noc bez planu na siłę: kawa w jednej z kawiarni w starych blokach, masaż, a o zachodzie słońca tramwaj wodny Saigon Waterbus (jeśli akurat kursuje) z przystani Bạch Đằng do Thảo Điền i kolacja nad wodą. Rano śniadanie i dalej w drogę.' }
      ```

    - po tablicy `days` (przed `gem`) dopisz:

      ```js
      again: { pace: 'rest', t: 'Powrót do Hồ Chí Minh City', d: 'Wieczór na luzie: masaż, a potem kolacja przy straganach ze ślimakami i owocami morza na ulicy Vĩnh Khánh.' },
      ```

  - W `site2/src/content/hanoi.js`:
    - na końcu obiektu dnia `p: 1` dopisz:

      ```js
      , solo: { pace: 'travel', t: 'Wieczór w Hà Nội', d: 'O zmierzchu spacer wokół jeziora Hoàn Kiếm i uliczkami Starego Miasta, a na kolację uliczne jedzenie: bún chả albo bánh cuốn. Rano kawa z jajkiem i dalej w drogę.' }
      ```

    - po tablicy `days` (przed `gem`) dopisz:

      ```js
      again: { pace: 'travel', t: 'Powrót do Hà Nội', d: 'Wieczór na luzie: kawa z jajkiem nad jeziorem Hoàn Kiếm, a o zachodzie słońca spacer przez most Long Biên.' },
      ```

  - **Uzasadnienie:**
    - Drugi przyjazd dostaje plany o `p` wyższym niż pierwsza część pobytu, a cały pobyt mieści się w maksimum nocy. Plan `p: 4` Hà Nội (most Long Biên) nigdy więc nie trafia na trasę tam i z powrotem i nie powtarza się z `again`.
    - Wersje `solo` miast lotnisk nie mają porannej atrakcji, bo drugi pobyt bierze kolejne plany według `p`, a poranny plan wtedy by się powtórzył.

- [ ] **Krok 7: Hội An i Huế osobno.**
  - W pierwowzorze to jedno miejsce `central`. Teksty z niego trafiają do dwóch plików, a nowe od razu piszemy per „ty”.
  - Przełęcz Hải Vân opisuje przejazd Hội An ↔ Huế (`ROAD_KEYS`, klucz `r.haivan` w zadaniu 9).
  - Utwórz `site2/src/content/hoian.js`. W `photos` dopisz po `hoian_3` nowe zdjęcia z zadania 4 (`hoian_4`, ewentualnie `hoian_5`):

```js
/* Hội An: texts of the place (plan 1B; the December planner had Hội An and Huế as one place). Fields: see site2/src/content.js. */
CONTENT.hoian = {
  name: 'Hội An', short: 'Hội An',
  sub: 'Stare miasto o świcie, wioski warzywników i kanały wśród wodnych palm',
  region: 'centre', maps: 'Hoi An, Quang Nam, Vietnam', pt: [15.88, 108.34],
  photos: ['hoian_0', 'hoian_1', 'hoian_3', 'hoian_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Bocznymi drogami Hội An', d: 'Po przyjeździe weź rower i jedź do warzywnej wioski Trà Quế, a potem nad kanały wśród wodnych palm kokosowych w Cẩm Thanh.',
      rain: 'lekcja gotowania albo warsztaty robienia lampionów, a do tego kryty targ.',
      easy: { pace: 'travel', t: 'Hội An bez pośpiechu', d: 'Lekcja gotowania w warzywnej wiosce Trà Quế (dojazd taksówką), potem stare miasto ok. 17:00, gdy zapalają się lampiony, rejs sampanem po rzece Thu Bồn i kolacja, zanim ok. 19:00 tłum będzie największy. Turystycznie, a mimo to pięknie.' },
      solo: { pace: 'travel', early: true, t: 'Hội An wieczorem i o świcie', d: 'Wieczorem stare miasto w świetle lampionów, najlepiej przed 19:00, zanim tłum będzie największy, i kolacja nad rzeką Thu Bồn. Rano o 6:00 te same uliczki są prawie puste, potem śniadanie i dalej w drogę.' } },
    { p: 2, o: 2, pace: 'culture', early: true, t: 'Stare miasto o 6:00', d: 'Zobacz stare miasto, zanim zjadą się jednodniowi turyści: domy kupieckie i domy zgromadzeń w porannym świetle. Po południu wolny czas: krawiec, kawiarnia nad rzeką albo rowerem na plażę An Bàng.',
      rain: 'domy zgromadzeń na starym mieście albo przymiarki u krawca.' }
  ],
  again: { pace: 'travel', t: 'Powrót do Hội An', d: 'Spokojny wieczór: kawa nad rzeką Thu Bồn i kolacja w jednej z bocznych uliczek, z dala od głównego deptaka.' },
  gem: 'Cẩm Thanh: kanały wśród wodnych palm kokosowych, kilka kilometrów od starego miasta.',
  skip: 'Stare miasto w Hội An o 19:00, gdy tłumy wśród lampionów są największe.',
  instead: 'stare miasto o 6:00 i okoliczne wioski.'
};
```

  - Utwórz `site2/src/content/hue.js`:

```js
/* Huế: texts of the place (plan 1B; the December planner had Hội An and Huế as one place). Fields: see site2/src/content.js. */
CONTENT.hue = {
  name: 'Huế', short: 'Huế',
  sub: 'Cesarskie Miasto, grobowce nad Rzeką Perfumową i pola ryżowe wokół',
  region: 'centre', maps: 'Hue, Vietnam', pt: [16.46, 107.59],
  photos: ['hue_0', 'hue_1', 'hue_2', 'hue_6', 'hue_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Cesarskie Miasto', d: 'Po przyjeździe Cesarskie Miasto (Đại Nội): mury, bramy i dziedzińce dawnej stolicy dynastii Nguyễn. Pod wieczór spacer nad Rzeką Perfumową i kolacja z bún bò Huế.',
      rain: 'kryte galerie Cesarskiego Miasta i Muzeum Królewskich Antyków.' },
    { p: 2, o: 2, pace: 'culture', t: 'Huế na rowerze', d: 'Rowerem wzdłuż Rzeki Perfumowej do grobowców Minh Mạng i Tự Đức, a późnym popołudniem do pagody Thiên Mụ.',
      rain: 'grobowce samochodem zamiast rowerem, a potem długi obiad z bún bò Huế.',
      easy: { pace: 'culture', t: 'Huế łodzią i samochodem', d: 'Smoczą łodzią w górę Rzeki Perfumowej do pagody Thiên Mụ, potem samochodem do grobowców Minh Mạng i Tự Đức.' } },
    { p: 3, o: 3, pace: 'nature', t: 'Okolice Huế', d: 'Kryty dachówką most w Thanh Toàn wśród pól ryżowych, potem laguna Tam Giang o zachodzie słońca.',
      rain: 'lekcja gotowania w Huế albo samochodem do starych domów z ogrodami w Kim Long.' }
  ],
  gem: 'Thanh Toàn, kryty most z lat 70. XVIII wieku wśród pól ryżowych na wschód od Huế.'
};
```

- [ ] **Krok 8: Źródło PR1 w researchu sezonów.** W `research/sezony-2026-10.md`, w sekcji „Źródła”, zmień opis `[PR1]` na:

```markdown
- [PR1] Plany dni z noclegami: od 10.10.2026 w `site2/src/content/<id>.js` (przeniesione w planie 1B z `site2/src/data.js` pierwowzoru). `WEATHER`, `TO_AIR`, `MIN_NIGHTS` i `research/facts-2026-10.md` zostały w pierwowzorze.
```

- [ ] **Krok 9: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `content ok`, `photos in use ok`, `typography ok`, `style ok`, na końcu `ALL PASS`. Jeśli `photos in use` zgłosi nieużyte zdjęcie Hội An, dopisz je do `photos` w `hoian.js`; razem najwyżej 5.

- [ ] **Krok 10: Commit**

```bash
git add site2/src/content.js site2/src/content tests/content.test.js tests/run.sh research/sezony-2026-10.md
git commit -F - <<'EOF'
Treść: model treści miejsca i 14 plików z tekstami z pierwowzoru (Hội An i Huế osobno, wersje na jedną noc i drugi przyjazd)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Czyste funkcje strony

**Pliki:**
- Utwórz: `site2/src/page.js`, `tests/page.test.js`
- Zmień: `tests/run.sh` (`SOURCES`, `TESTS`), `tests/combos.test.js` (plany dni w każdej kombinacji)

**Interfejsy:**
- Korzysta z: `normSettings`, `isoDay`, `INTERESTS` (silnik), `CONTENT`, `AIRPORTS`, `ROAD_KEYS` (zadanie 5).
- Daje (wszystko w `page.js`):
  - **link i ustawienia:**
    - `SITE_URL`;
    - `parseLink(hash)` → pola ustawień (tylko poprawne);
    - `linkHash(s)` → `'#od=…'`;
    - `copySettings(s)`;
    - `settingsFromLink(link, defaults, places, hubs)` → `{ settings, st, dropped }`;
    - `defaultSettings(today)`;
    - `monthChoices(today, lastYear)` → `[{ year, month }]`;
  - **plany dni:**
    - `variantOf(day, level, month)`;
    - `stopDays(c, stop, done, level, months)` → `[{ day, pace, t, d, early, rain, variant }]` albo `null`;
  - **daty i święta:**
    - `tripDate(startISO, day)`;
    - `tripSpan(st)`;
    - `tripAlerts(st, list, from, until, tetMargin)` → `{ hits: [{ from, to, kind, name }], unknown }`;
    - `fmtSpan(a, b)`;
  - **trasa:**
    - `routeStats(route, plans, places)` → `{ places, flights, hikes, longest, road }`;
    - `offRoute(route, st, places)` → `[{ id, removed, added }]`;
    - `withAdded(s, id)`, `withRemoved(s, id)`, `withoutChanges(s)`;
  - **przejazdy:**
    - `segKey(g, airports, roadKeys)` → `[klucz UI, wartości]`;
    - `LONG_LEG_H = 7`;
    - `legNotes(leg, prev, prevSolo)` → klucze UI;
  - **słowa:** `nightForm(n)`, `tieShort(text)` (z pierwowzoru).

- [ ] **Krok 1: Test, który nie przechodzi** — utwórz `tests/page.test.js`:

```js
/* The page's pure helpers (page.js), on made-up content and the real places. */

/* ---------- the settings link ---------- */
eq(parseLink('#od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian'),
  { from: 'SGN', to: 'HAN', year: 2027, month: 2, days: 15, interests: ['przyroda', 'gory'], level: 2, add: ['phuquoc'], remove: ['hoian'] }, 'a month link');
eq(parseLink('#poziom=1&koniec=2027-02-12&start=2027-01-30&do=HAN&od=HAN'),
  { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', level: 1 }, 'a dates link, fields in any order');
eq(parseLink('#od=sgn&do=HANOI&miesiac=2027-2&dni=x&co=przyroda,Gory&poziom=22&dodaj=&usun=a,,b&foo=1'), { add: [] },
  'malformed fields are left out; an empty list is a list');
eq([parseLink(''), parseLink('#'), parseLink('#day-5'), parseLink('#co=%zz')], [{}, {}, {}, {}], 'no link: nothing, an anchor, a broken escape');
eq(parseLink('#co=&dodaj=hanoiStop'), { interests: [], add: ['hanoiStop'] }, 'no interest; ids keep their capitals');
var round = { from: 'DAD', to: 'SGN', year: 2027, month: 11, days: 21, interests: ['kultura'], level: 3, add: ['catba'], remove: ['hue', 'hoian'] };
eq(linkHash(round), '#od=DAD&do=SGN&miesiac=2027-11&dni=21&co=kultura&poziom=3&dodaj=catba&usun=hue,hoian', 'linkHash: the month');
eq(parseLink(linkHash(round)), round, 'linkHash, then parseLink: the same settings (the month)');
var roundD = { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', interests: [], level: 1, add: [], remove: [] };
eq(linkHash(roundD), '#od=HAN&do=HAN&start=2027-01-30&koniec=2027-02-12&co=&poziom=1', 'linkHash: dates; no interest is written, empty Dodaj and Usuń are not');
eq(parseLink(linkHash(roundD)), { from: 'HAN', to: 'HAN', start: '2027-01-30', end: '2027-02-12', interests: [], level: 1 }, 'linkHash, then parseLink (dates)');
print('link ok');

/* ---------- the defaults and the settings a link opens ---------- */
var DEF = defaultSettings('2026-10-10');
eq(DEF, { from: 'SGN', to: 'HAN', year: 2026, month: 11, days: 15, interests: [], level: 2, add: [], remove: [] }, 'the defaults: the next month');
eq([defaultSettings('2026-12-31').year, defaultSettings('2026-12-31').month], [2027, 1], 'after December: January of the next year');
function opened(hash) { return settingsFromLink(parseLink(hash), DEF, PLACES, HUBS); }
var g1 = opened('#od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3');
eq([g1.settings.from, g1.settings.to, g1.settings.year, g1.settings.month, g1.settings.days, g1.settings.interests, g1.settings.level, g1.dropped, g1.st.ok],
  ['HAN', 'DAD', 2027, 3, 12, ['kultura'], 3, [], true], 'a good link opens as it is');
var g2 = opened('#od=XYZ&do=DAD&dni=40&co=kultura,jedzenie,morze&poziom=7');
eq([g2.settings.from, g2.settings.to, g2.settings.days, g2.settings.interests, g2.settings.level, g2.dropped.slice().sort()],
  ['SGN', 'DAD', 15, [], 2, ['days', 'from', 'interests', 'level']], 'refused fields go back to the defaults, the good ones stay');
var g3 = opened('#od=SGN&do=HAN&start=2027-01-01&koniec=2027-03-01');
eq(['start' in g3.settings, g3.st.start, g3.st.month, g3.st.days, g3.dropped.slice().sort()], [false, null, 11, 15, ['end', 'start']],
  'dates over 30 days: back to the month of the defaults');
var g4 = opened('#od=SGN&do=HAN&start=2027-01-30');
eq([g4.st.start, g4.dropped], [null, ['start']], 'a start without an end: back to the month');
var g5 = opened('#od=SGN&do=HAN&dodaj=hanoiStop,phuquoc&usun=hanoiStop');
eq([g5.settings.add, g5.settings.remove, g5.st.add, g5.dropped], [['phuquoc'], [], ['phuquoc'], []], 'a night on the way gets no Dodaj or Usuń, also from a link');
var g6 = opened('#miesiac=1999-05');
eq([g6.st.year, g6.st.month, g6.dropped], [2026, 5, ['year']], 'a year the engine refuses: the default year, the month stays');
eq([DEF.add, DEF.days], [[], 15], 'the defaults stay as they were');
var mc = monthChoices('2026-10-10', 2030);
eq([mc.length, mc[0], mc[mc.length - 1]], [51, { year: 2026, month: 10 }, { year: 2030, month: 12 }], 'the months: from this one to December 2030');
eq(monthChoices('2031-03-01', 2030).pop(), { year: 2032, month: 12 }, 'past the holiday list: still a year ahead');
print('settings ok');

/* ---------- day plans ---------- */
var FC = {
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'A1', d: 'a1', solo: { pace: 'boat', t: 'A1s', d: 'a1s', early: true } },
    { p: 3, o: 2, pace: 'rest', t: 'A3', d: 'a3' },
    { p: 2, o: 3, pace: 'hike', t: 'A2', d: 'a2', early: true, rain: 'r2',
      easy: { pace: 'nature', t: 'A2e', d: 'a2e', early: false }, hard: { pace: 'hike', t: 'A2h', d: 'a2h', off: [7, 8] } }
  ],
  again: { pace: 'travel', t: 'B1', d: 'b1' }
};
var JAN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], JUL = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
function titles(days) { return days.map(function (d) { return d.day + ':' + d.t; }); }
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 2, JAN)), ['1:A1', '2:A2'], 'two nights: p 1 and p 2, in the order o');
eq(titles(stopDays(FC, { n: 3, start: 4 }, 0, 2, JAN)), ['4:A1', '5:A3', '6:A2'], 'three nights: all three, in the order o');
eq(titles(stopDays(FC, { n: 1, start: 1 }, 0, 2, JAN)), ['1:A1s'], 'one night: the solo plan');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 1, JAN)), ['1:A1', '2:A2e'], 'level 1: the easy version');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 3, JAN)), ['1:A1', '2:A2h'], 'level 3: the hard version');
eq(titles(stopDays(FC, { n: 2, start: 1 }, 0, 3, JUL)), ['1:A1', '2:A2'], 'level 3 in July, a month off: the usual day');
var dU = stopDays(FC, { n: 2, start: 1 }, 0, 2, JAN)[1], dE = stopDays(FC, { n: 2, start: 1 }, 0, 1, JAN)[1], dH = stopDays(FC, { n: 2, start: 1 }, 0, 3, JAN)[1];
eq([dU.pace, dU.early, dU.rain, dU.variant], ['hike', true, 'r2', null], 'the usual day');
eq([dE.pace, dE.early, dE.rain, dE.variant], ['nature', false, 'r2', 'easy'], 'the easy version: its own pace and early start, the day\'s rain plan');
eq([dH.early, dH.rain, dH.variant], [true, 'r2', 'hard'], 'the hard version keeps the day\'s early start and rain plan');
eq(titles(stopDays(FC, { n: 2, start: 8 }, 1, 2, JAN)), ['8:B1', '9:A2'], 'a second stay after one night: again, then the next plan by p');
eq(titles(stopDays(FC, { n: 1, start: 9 }, 2, 2, JAN)), ['9:B1'], 'a second stay of one night: again only');
eq(stopDays(FC, { n: 4, start: 1 }, 0, 2, JAN), null, 'more nights than plans');
eq(stopDays(FC, { n: 3, start: 5 }, 2, 2, JAN), null, 'a second stay past the plans');
eq(stopDays({ days: FC.days }, { n: 1, start: 5 }, 2, 2, JAN), null, 'a second stay needs again');
print('day plans ok');

/* ---------- dates and holidays ---------- */
eq(tripDate(null, 3), null, 'no start date');
eq(tripDate('2026-12-05', 1), '2026-12-05', 'day 1');
eq(tripDate('2026-12-05', 27), '2026-12-31', 'end of year');
eq(tripDate('2026-12-05', 28), '2027-01-01', 'new year');
function stOf(s) { return normSettings(s, PLACES, HUBS); }
eq(tripSpan(stOf({ from: 'SGN', to: 'HAN', start: '2027-01-30', end: '2027-02-03' })), ['2027-01-30', '2027-02-03'], 'span: the dates');
eq(tripSpan(stOf({ from: 'SGN', to: 'HAN', year: 2028, month: 2, days: 10 })), ['2028-02-01', '2028-02-29'], 'span: the whole month, a leap year');
eq(tripSpan(stOf({ from: 'SGN', to: 'HAN', month: 2, days: 10 })), null, 'span: a month without a year');
var FH = [['2027-01-01', '2027-01-01', 'holiday', 'Nowy Rok'], ['2027-02-05', '2027-02-10', 'tet', 'Tết'],
  ['2027-04-30', '2027-05-03', 'holiday', 'Dzień Zjednoczenia i Święto Pracy']];
function alerts(s) {
  var a = tripAlerts(stOf(s), FH, '2026-10-01', '2027-12-31', 7);
  return a.hits.map(function (h) { return h.name; }).concat(a.unknown ? ['?'] : []);
}
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-01-20', end: '2027-01-29' }), ['Tết'], 'a week before Tết counts');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-01-20', end: '2027-01-28' }), [], 'eight days before: not yet');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-02-17', end: '2027-02-25' }), ['Tết'], 'a week after Tết counts');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2026-12-27', end: '2027-01-05' }), ['Nowy Rok'], 'across the year end');
eq(alerts({ from: 'SGN', to: 'HAN', year: 2027, month: 5, days: 10 }), ['Dzień Zjednoczenia i Święto Pracy'], 'the month mode: the whole month');
eq(alerts({ from: 'SGN', to: 'HAN', year: 2027, month: 12, days: 30 }), [], 'a month with nothing');
eq(alerts({ from: 'SGN', to: 'HAN', start: '2027-12-20', end: '2028-01-10' }), ['?'], 'past the list: no data');
eq(alerts({ from: 'SGN', to: 'HAN', month: 5, days: 10 }), ['?'], 'a month without a year: no data');
eq(fmtSpan('2027-02-06', '2027-02-12'), '6–12.02.2027', 'a span in one month');
eq(fmtSpan('2027-04-30', '2027-05-03'), '30.04–3.05.2027', 'a span over two months');
eq(fmtSpan('2030-12-28', '2031-01-02'), '28.12.2030–2.01.2031', 'a span over two years');
eq(fmtSpan('2027-01-01', '2027-01-01'), '1.01.2027', 'one day');
print('dates and holidays ok');

/* ---------- the trip ---------- */
var FR = { stops: [{ id: 'saigon', leg: { flights: 0, total: 0.5 } }, { id: 'dalat', leg: { flights: 1, total: 3.75 } },
  { id: 'hanoiStop', leg: { flights: 1, total: 6 } }, { id: 'saigon', leg: { flights: 1, total: 5 } }], home: { flights: 0, total: 0.5 } };
var FP = [[{ pace: 'travel' }], [{ pace: 'travel' }, { pace: 'hike' }, { pace: 'hike' }], [{ pace: 'travel' }], [{ pace: 'rest' }]];
eq(routeStats(FR, FP, PLACES), { places: 2, flights: 3, hikes: 2, longest: 6, road: 15.75 }, 'places once each, no night on the way; every leg and the way home');
var stO = stOf({ from: 'SGN', to: 'HAN', month: 3, days: 10, add: ['phuquoc'], remove: ['mekong'] });
eq(offRoute({ stops: [{ id: 'saigon' }, { id: 'dalat' }, { id: 'hanoi' }] }, stO, PLACES).map(function (x) { return x.id + (x.removed ? '-' : '') + (x.added ? '+' : ''); }),
  ['mekong-', 'phuquoc+', 'cattien', 'hoian', 'hue', 'puluong', 'ninhbinh', 'catba', 'babe', 'caobang'], 'off the trip, south to north, no night on the way');
var base = { from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: [], level: 2, add: ['catba'], remove: ['hoian'] };
eq([withAdded(base, 'hoian').add, withAdded(base, 'hoian').remove], [['catba', 'hoian'], []], 'Dodaj takes a place off the removed list');
eq([withRemoved(base, 'catba').add, withRemoved(base, 'catba').remove], [[], ['hoian', 'catba']], 'Usuń takes a place off the added list');
eq([withoutChanges(base).add, withoutChanges(base).remove, base.add, base.remove], [[], [], ['catba'], ['hoian']],
  'back to the trip without changes; the settings given stay as they were');
print('trip ok');

/* ---------- travel texts ---------- */
function road(a, b) { return segKey({ mode: 'road', from: a, to: b, h: 1 }, AIRPORTS, ROAD_KEYS); }
eq(road('HAN', 'hanoi'), ['r.taxi_from', { x: 'Hà Nội' }], 'from an airport');
eq(road('dalat', 'DLI'), ['r.taxi_to', { x: 'Đà Lạt' }], 'to an airport');
eq([road('hue', 'hoian'), road('hoian', 'hue')], [['r.haivan', {}], ['r.haivan', {}]], 'the Hải Vân pass, either way');
eq(road('cattien', 'dalat'), ['r.car_baoloc', {}], 'a road with its own text wins over the rule for Cát Tiên');
eq([road('ninhbinh', 'catba'), road('saigon', 'cattien'), road('saigon', 'mekong'), road('hanoi', 'ninhbinh')],
  [['r.van_ferry', {}], ['r.car_cattien', {}], ['r.bus_mekong', {}], ['r.van_car', {}]], 'Cát Bà, Cát Tiên, the Mekong, any other road');
function L(total, segs, flights) { return { flights: flights || 0, total: total, segs: segs }; }
eq(legNotes(L(6.5, [{ mode: 'road', h: 2.5 }, { mode: 'fly', h: 1 }, { mode: 'road', h: 1.5 }], 1), { n: 2 }, false), ['n.afternoon'], 'a flight after 2.5 h of road');
eq(legNotes(L(4, [{ mode: 'road', h: 0.5 }, { mode: 'fly', h: 1 }, { mode: 'road', h: 1 }], 1), null, false), [], 'a short ride to the airport');
eq(legNotes(L(9.25, [{ mode: 'road', h: 9.25 }]), { n: 1 }, true), ['n.long', 'n.solo_long'], 'a long day after one night with a morning plan');
eq(legNotes(L(9.25, [{ mode: 'road', h: 9.25 }]), { n: 2 }, true), ['n.long'], 'after two nights: no warning about the morning');
eq(legNotes(L(6.5, [{ mode: 'road', h: 6.5 }]), { n: 1 }, false), [], 'one night without a morning plan');
print('travel texts ok');

/* ---------- Polish words (as in the December planner) ---------- */
[[1, 'one'], [2, 'few'], [3, 'few'], [4, 'few'], [0, 'many'], [5, 'many'], [11, 'many'], [12, 'many'], [13, 'many'], [14, 'many'],
 [21, 'many'], [22, 'few'], [24, 'few'], [25, 'many'], [112, 'many'], [122, 'few']].forEach(function (c) {
  eq(nightForm(c[0]), c[1], 'nightForm(' + c[0] + ')');
});
var NB = ' ';
eq(tieShort('Wietnam, z południa na północ'), 'Wietnam, z' + NB + 'południa na północ', 'z mid-text');
eq(tieShort('W domu'), 'W' + NB + 'domu', 'capital at the start');
eq(tieShort('i w domu'), 'i' + NB + 'w' + NB + 'domu', 'a run of one-letter words');
eq(tieShort('Hà Nội, a potem Huế i Hội An'), 'Hà Nội, a' + NB + 'potem Huế i' + NB + 'Hội An', 'a and i');
eq(tieShort('(w domu) i „o tym” oraz x–u nas'), '(w' + NB + 'domu) i' + NB + '„o' + NB + 'tym” oraz x–u' + NB + 'nas', 'after ( „ and –');
['dla przyjaciół', 'Đà Lạt i', 'ok. 5 km', 'XVIII wieku', 'C w', 'z' + NB + 'południa'].forEach(function (s) { eq(tieShort(s), s, 'unchanged: ' + s); });
eq(tieShort(tieShort('i w domu')), tieShort('i w domu'), 'idempotent');
print('words ok');
```

- [ ] **Krok 2: Dodaj pliki do testów** — w `tests/run.sh` zmień `SOURCES` i `TESTS`:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES site2/src/photos.js site2/src/page.js"
TESTS="tests/engine.test.js tests/page.test.js tests/data.test.js tests/content.test.js tests/combos.test.js"
```

- [ ] **Krok 3: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `tests/run.sh: missing file site2/src/page.js`

- [ ] **Krok 4: Implementacja** — utwórz `site2/src/page.js`. Funkcje `tripDate`, `nightForm` i `tieShort` skopiuj bez zmian z `$P/site2/src/plan.js`, razem z komentarzami:

```js
/* Pure helpers of the page, shared with the tests: the settings link, the defaults, the day plans of a stay, the holiday
   warnings, the figures of a trip, the places off the trip and the travel texts. No DOM here.
   Uses engine.js (normSettings, isoDay), content.js (AIRPORTS, ROAD_KEYS through arguments) and holidays.js. */
var SITE_URL = 'https://grzegorzfrskiba-hub.github.io/wietnam/';   // the public page: the copied plan links here

/* ---------- the settings link ---------- */
// the keys of a link (Polish, readable) and the settings field each fills; the order of the fields parseLink returns
var LINK_KEYS = { od: 'from', 'do': 'to', start: 'start', koniec: 'end', miesiac: 'month', dni: 'days', co: 'interests', poziom: 'level', dodaj: 'add', usun: 'remove' };
var SETTINGS_ORDER = ['from', 'to', 'start', 'end', 'year', 'month', 'days', 'interests', 'level', 'add', 'remove'];

/* The settings in the part of the address after #:
   #od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian, or with dates
   #od=SGN&do=HAN&start=2027-02-01&koniec=2027-02-15&co=&poziom=2. Returns the well-formed fields typed for normSettings:
   from, to, start, end as texts; year, month, days, level as numbers; interests, add, remove as lists. A malformed field is
   left out, so the page uses its default; unknown keys (an anchor such as #day-5) are ignored. */
function parseLink(hash) {
  var got = {}, out = {};
  String(hash || '').replace(/^#/, '').split('&').forEach(function (part) {
    var i = part.indexOf('='), field = i < 0 ? null : LINK_KEYS[part.slice(0, i)], v, m, list;
    if (!field) return;
    try { v = decodeURIComponent(part.slice(i + 1)); } catch (e) { return; }
    if (field === 'from' || field === 'to') { if (/^[A-Z]{3}$/.test(v)) got[field] = v; }
    else if (field === 'start' || field === 'end') { if (/^\d{4}-\d{2}-\d{2}$/.test(v)) got[field] = v; }
    else if (field === 'month') { if ((m = /^(\d{4})-(\d{2})$/.exec(v))) { got.year = +m[1]; got.month = +m[2]; } }
    else if (field === 'days') { if (/^\d{1,2}$/.test(v)) got.days = +v; }
    else if (field === 'level') { if (/^\d$/.test(v)) got.level = +v; }
    else {
      list = v === '' ? [] : v.split(',');
      if (list.every(function (x) { return (field === 'interests' ? /^[a-z]+$/ : /^[A-Za-z]+$/).test(x); })) got[field] = list;
    }
  });
  SETTINGS_ORDER.forEach(function (k) { if (k in got) out[k] = got[k]; });
  return out;
}

/* The settings as the part of the address after # (parseLink reads it back). The interests are always written, also
   none (co=), so a link keeps meaning "no interest" if the defaults ever change; Dodaj and Usuń only when there are any. */
function linkHash(s) {
  var parts = ['od=' + s.from, 'do=' + s.to];
  if (s.start) parts.push('start=' + s.start, 'koniec=' + s.end);
  else parts.push('miesiac=' + s.year + '-' + (s.month < 10 ? '0' : '') + s.month, 'dni=' + s.days);
  parts.push('co=' + (s.interests || []).join(','), 'poziom=' + s.level);
  if (s.add && s.add.length) parts.push('dodaj=' + s.add.join(','));
  if (s.remove && s.remove.length) parts.push('usun=' + s.remove.join(','));
  return '#' + parts.join('&');
}

/* A copy of the settings with lists of its own; add and remove are never missing. */
function copySettings(s) {
  var o = {};
  Object.keys(s).forEach(function (k) { o[k] = Array.isArray(s[k]) ? s[k].slice() : s[k]; });
  o.add = o.add || [];
  o.remove = o.remove || [];
  return o;
}

// the settings fields behind each error of normSettings
var ERROR_FIELDS = { airport: ['from', 'to'], date: ['start', 'end'], month: ['year', 'month'], year: ['year'], days: ['days', 'start', 'end'],
  interests: ['interests'], level: ['level'], add: ['add'], remove: ['remove'] };

/* The settings a link opens: its fields over the defaults, checked with normSettings. A field the engine refuses goes back
   to its default (an airport only when it is no known one), one error at a time, until the settings pass. Places with a
   node (a night on the way) are taken out of add and remove: the page has no buttons for them.
   Returns { settings, st, dropped }: the settings to show, normSettings' result, and the link fields not used. */
function settingsFromLink(link, defaults, places, hubs) {
  var s = copySettings(defaults), dropped = [];
  Object.keys(link).forEach(function (k) { s[k] = Array.isArray(link[k]) ? link[k].slice() : link[k]; });
  ['add', 'remove'].forEach(function (k) { s[k] = s[k].filter(function (id) { return !(places[id] && places[id].node); }); });
  for (var tries = 0; tries < 12; tries++) {
    var st = normSettings(s, places, hubs), fields;
    if (st.ok) return { settings: s, st: st, dropped: dropped };
    fields = ERROR_FIELDS[st.error];
    if (st.error === 'airport') fields = fields.filter(function (k) { return !(typeof s[k] === 'string' && hubs.hasOwnProperty(s[k])); });
    fields.forEach(function (k) {
      if (k in link && dropped.indexOf(k) < 0) dropped.push(k);
      if (k in defaults) s[k] = Array.isArray(defaults[k]) ? defaults[k].slice() : defaults[k];
      else delete s[k];
    });
  }
  throw new Error('settingsFromLink: the defaults do not pass normSettings');
}

/* The settings without a link, for now (stage 2 sets the real ones): Hồ Chí Minh City → Hà Nội, the next month, 15 days,
   no interest, level 2. today: YYYY-MM-DD. */
function defaultSettings(today) {
  var y = +today.slice(0, 4), m = +today.slice(5, 7) + 1;
  if (m > 12) { m = 1; y++; }
  return { from: 'SGN', to: 'HAN', year: y, month: m, days: 15, interests: [], level: 2, add: [], remove: [] };
}

/* The months the page offers, [{ year, month }]: from this month to December of lastYear, and always a year ahead. */
function monthChoices(today, lastYear) {
  var y = +today.slice(0, 4), m = +today.slice(5, 7), end = Math.max(lastYear, y + 1), out = [];
  while (y <= end) {
    out.push({ year: y, month: m });
    if (++m > 12) { m = 1; y++; }
  }
  return out;
}

/* ---------- day plans ---------- */
/* One day at an adventure level: level 1 takes the easy version, level 3 the hard one unless month (1–12) is one of its
   months off; otherwise the usual day. A version keeps the day's early start unless it sets its own, and the day's rain
   plan. Returns { pace, t, d, early, rain, variant }, variant 'easy', 'hard' or null. */
function variantOf(day, level, month) {
  var v = level === 1 && day.easy ? 'easy' : level === 3 && day.hard && (day.hard.off || []).indexOf(month) < 0 ? 'hard' : null;
  var src = v ? day[v] : day;
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: day.rain || null, variant: v };
}
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay
function plainDay(x) { return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: null }; }

/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant }], one per night, from the stay's first day.
   c: the place's content; stop: { n, start } from planRoute; done: nights spent there earlier in the trip (on a round trip
   the airport's city comes back at the end); level: 1–3; months: st.months, the month (0–11) of each trip day.
   A first stay takes the n plans with the lowest p, in their order o; a one-night stay the solo version of the p 1 plan
   when it has one. A second stay starts with c.again and goes on with the next plans by p. null when there are too few. */
function stopDays(c, stop, done, level, months) {
  var byP = c.days.slice().sort(function (a, b) { return a.p - b.p; }), out = [], picked;
  if (done) {
    if (!c.again) return null;
    picked = byP.slice(done, done + stop.n - 1);
    if (picked.length !== stop.n - 1) return null;
    out.push(plainDay(c.again));
  } else {
    picked = byP.slice(0, stop.n);
    if (picked.length !== stop.n) return null;
  }
  picked.sort(function (a, b) { return a.o - b.o; }).forEach(function (d) {
    out.push(stop.n === 1 && d.solo ? plainDay(d.solo) : variantOf(d, level, months[stop.start - 1 + out.length] + 1));
  });
  out.forEach(function (d, k) { d.day = stop.start + k; });
  return out;
}

/* ---------- dates and holidays ---------- */
// tripDate: copied from plan.js of the December planner, with its comment

/* First and last day of the trip, YYYY-MM-DD: with dates the trip itself, in the month mode the whole month;
   null in the month mode without a year. */
function tripSpan(st) {
  if (st.start) return [st.start, tripDate(st.start, st.days)];
  if (!st.year) return null;
  var mm = (st.month < 10 ? '0' : '') + st.month, last = new Date(Date.UTC(st.year, st.month, 0)).getUTCDate();
  return [st.year + '-' + mm + '-01', st.year + '-' + mm + '-' + last];
}

/* The holidays that touch the trip: rows [first, last, kind, name] of list (HOLIDAYS) that overlap tripSpan, Tết from
   tetMargin days before its days off to tetMargin days after. unknown: the trip runs outside from…until, the days the
   list covers, or has no year. Returns { hits: [{ from, to, kind, name }], unknown }. */
function tripAlerts(st, list, from, until, tetMargin) {
  var span = tripSpan(st);
  if (!span) return { hits: [], unknown: true };
  var a = isoDay(span[0]), b = isoDay(span[1]);
  var hits = list.filter(function (h) {
    var m = h[2] === 'tet' ? tetMargin : 0;
    return isoDay(h[0]) - m <= b && isoDay(h[1]) + m >= a;
  }).map(function (h) { return { from: h[0], to: h[1], kind: h[2], name: h[3] }; });
  return { hits: hits, unknown: span[0] < from || span[1] > until };
}

/* Days for a sentence: '6–12.02.2027', '30.04–3.05.2027', '28.12.2030–2.01.2031'; one day: '1.01.2027'. */
function fmtSpan(a, b) {
  var p = a.split('-'), q = b.split('-');
  function dm(x) { return +x[2] + '.' + x[1]; }
  if (a === b) return dm(p) + '.' + p[0];
  if (p[0] !== q[0]) return dm(p) + '.' + p[0] + '–' + dm(q) + '.' + q[0];
  if (p[1] !== q[1]) return dm(p) + '–' + dm(q) + '.' + q[0];
  return +p[2] + '–' + dm(q) + '.' + q[0];
}

/* ---------- the trip ---------- */
/* The figures of the facts row: places (each once, nights on the way not counted), domestic flights, hiking days at the
   chosen level, the longest travel day and all hours on the road, the way to the departure airport included.
   route: planRoute's trip; plans: stopDays of each stay; places: PLACES. */
function routeStats(route, plans, places) {
  var seen = {}, out = { places: 0, flights: 0, hikes: 0, longest: 0, road: 0 };
  route.stops.forEach(function (s) { if (!places[s.id].node && !seen[s.id]) { seen[s.id] = true; out.places++; } });
  route.stops.map(function (s) { return s.leg; }).concat([route.home]).forEach(function (L) {
    out.flights += L.flights;
    out.road += L.total;
    out.longest = Math.max(out.longest, L.total);
  });
  plans.forEach(function (days) { days.forEach(function (d) { if (d.pace === 'hike') out.hikes++; }); });
  return out;
}

/* The places that could be on the trip but are not, south to north, for the list with "Dodaj": every place up to the
   chosen level, without nights on the way. removed: Usuń took it off; added: Dodaj asked for it, but it did not fit. */
function offRoute(route, st, places) {
  var on = {};
  route.stops.forEach(function (s) { on[s.id] = true; });
  return Object.keys(places).filter(function (id) { return !places[id].node && !on[id] && places[id].level <= st.level; })
    .sort(function (a, b) { return places[a].axis - places[b].axis || (a < b ? -1 : 1); })
    .map(function (id) { return { id: id, removed: st.remove.indexOf(id) > -1, added: st.add.indexOf(id) > -1 }; });
}

/* Dodaj and Usuń on a copy of the settings: adding takes the place off the removed list, removing off the added one;
   withoutChanges clears both. */
function withAdded(s, id) {
  var o = copySettings(s);
  o.remove = o.remove.filter(function (x) { return x !== id; });
  if (o.add.indexOf(id) < 0) o.add.push(id);
  return o;
}
function withRemoved(s, id) {
  var o = copySettings(s);
  o.add = o.add.filter(function (x) { return x !== id; });
  if (o.remove.indexOf(id) < 0) o.remove.push(id);
  return o;
}
function withoutChanges(s) {
  var o = copySettings(s);
  o.add = [];
  o.remove = [];
  return o;
}

/* ---------- travel texts ---------- */
/* The text of one road segment as [UI key, values]: from or to an airport; a road with a text of its own (roadKeys, by
   its two places in alphabetical order); Cát Bà with the ferry; Cát Tiên with the river crossing; the Mekong buses; else
   a limousine van or a car. g: a segment of planRoute's legs; airports: AIRPORTS. */
function segKey(g, airports, roadKeys) {
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
  if (airports[g.to]) return ['r.taxi_to', { x: airports[g.to].name }];
  var pair = [g.from, g.to].sort().join('-');
  if (roadKeys[pair]) return [roadKeys[pair], {}];
  if (g.from === 'catba' || g.to === 'catba') return ['r.van_ferry', {}];
  if (g.from === 'cattien' || g.to === 'cattien') return ['r.car_cattien', {}];
  if (g.from === 'mekong' || g.to === 'mekong') return ['r.bus_mekong', {}];
  return ['r.van_car', {}];
}

var LONG_LEG_H = 7;   // a travel day this long or longer gets the "long day" flag and a note

/* The notes under a journey, as UI keys: an afternoon flight after two hours or more of road to the airport; a long day;
   after a one-night stay whose plan has a morning part (prevSolo), a warning that a long journey follows.
   prev: the stay before, { n }, or null on the arrival day. */
function legNotes(leg, prev, prevSolo) {
  var out = [];
  if (leg.flights && leg.segs[0].mode === 'road' && leg.segs[0].h >= 2) out.push('n.afternoon');
  if (leg.total >= LONG_LEG_H) out.push('n.long');
  if (prev && prev.n === 1 && prevSolo && leg.total >= 6) out.push('n.solo_long');
  return out;
}

/* ---------- Polish words ---------- */
// nightForm and tieShort: copied from plan.js of the December planner, with their comments
```

W miejscu komentarzy `// tripDate: copied…` i `// nightForm and tieShort: copied…` wklej te funkcje z pierwowzoru, a komentarze-zastępniki usuń.

- [ ] **Krok 5: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `link ok`, `settings ok`, `day plans ok`, `dates and holidays ok`, `trip ok`, `travel texts ok`, `words ok`, na końcu `ALL PASS`

- [ ] **Krok 6: Plany dni w teście kombinacji** — w `tests/combos.test.js`, w funkcji `check`, tuż przed linią `need(nights === s.days - 1, nights + ' nights, want ' + (s.days - 1));` wstaw:

```js
    // the page's day plans (page.js): one per night of every stay at the level set, and no hike at level 1
    var done = {};
    r.stops.forEach(function (x) {
      var days = stopDays(CONTENT[x.id], x, done[x.id] || 0, s.level, st.months);
      need(days && days.length === x.n, x.id + ': ' + (days ? days.length : 'no') + ' day plans for ' + x.n + ' nights' + (done[x.id] ? ' (second stay)' : ''));
      if (days && s.level === 1) need(days.every(function (d) { return d.pace !== 'hike'; }), x.id + ': a hike at level 1');
      done[x.id] = (done[x.id] || 0) + x.n;
    });
```

- [ ] **Krok 7: Uruchom testy, także pełny przebieg**

Uruchom: `bash tests/run.sh && bash tests/run.sh --full`
Oczekiwane: dwa razy `ALL PASS`, w drugim `combos: 134784 (all)`

- [ ] **Krok 8: Commit**

```bash
git add site2/src/page.js tests/page.test.js tests/run.sh tests/combos.test.js
git commit -F - <<'EOF'
Strona: czyste funkcje (link z ustawieniami, plany dni pobytu, ostrzeżenia o świętach, liczby trasy, Dodaj/Usuń, teksty przejazdów)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Treść: południe i centrum (przepisanie i trudne dni)

**Pliki:**
- Zmień: `site2/src/content/saigon.js`, `mekong.js`, `phuquoc.js`, `cattien.js`, `dalat.js`, `hoian.js`, `hue.js`, `tests/content.test.js` (lista `REWRITTEN`)
- Utwórz: `research/plany-dni-2026-10.md`

**Interfejsy:**
- Korzysta z: `research/trudne-dni-2026-10.md` (zadanie 3), `research/sezony-2026-10.md` („Do planów dni i zdarzeń”), `styleOk` i `REWRITTEN` (zadanie 5).
- Daje: siedem miejsc przepisanych per „ty” i niezależnych od miesiąca, z trudnymi dniami tam, gdzie research je potwierdził.

**Zasady przepisywania** (te same w zadaniu 8):
- **Forma:** do jednego czytelnika: „Zamelduj się”, „Wypłyń”, „patrz, nie podnoś”, a nie „Zameldujcie się”, „Wypłyńcie”, „patrzcie”. Bez form rodzajowych.
- **Treść niezależna od miesiąca i miejsca na trasie:**
  - bez „w grudniu”;
  - bez „z lotniska w Đà Nẵng jedzie się…”, bo skąd się przyjeżdża, pokazuje karta przejazdu;
  - bez „z powrotem”, „na start”, „lot do domu”.
  - Zdanie o porze roku wolno zostawić, jeśli jest prawdziwe w każdym miesiącu, np. „w porze suchej, od grudnia do kwietnia, szlaki są pewne”.
- **Fakty:**
  - fakty z pierwowzoru zostają;
  - każdy nowy albo zmieniony fakt (godziny, zakazy, sezon, operator) trafia do `research/plany-dni-2026-10.md`: miejsce, zdanie, źródło (URL albo skrót z `research/sezony-2026-10.md`) i data.
- **Trudny dzień:**
  - dopisz `hard` do dnia, który wskazał research (`p` z notatki), tylko przy werdykcie „tak”;
  - tempo `hike` albo inne pasujące;
  - w tekście operator albo „licencjonowany przewodnik”, pozwolenie i ryzyko;
  - `off` to miesiące z researchu;
  - bez cen i linków (to etap 2).
- **Struktura zostaje:** pola, `p`, `o`, wersje `easy` i `solo`. Test treści z zadania 5 dalej przechodzi.

- [ ] **Krok 1: Test, który nie przechodzi** — w `tests/content.test.js` zmień listę:

```js
var REWRITTEN = ['hoian', 'hue', 'saigon', 'mekong', 'phuquoc', 'cattien', 'dalat'];
```

Uruchom: `bash tests/run.sh`
Oczekiwane: `style:` wymienia formy w liczbie mnogiej (np. „Odeśpijcie”, „Zameldujcie”, „patrzcie”) i grudniowe zdania w Đà Lạt; na końcu `Exception: Error: … problem(s) in style, listed above`

- [ ] **Krok 2: Przepisz pięć miejsc z pierwowzoru** według zasad. Do tego poprawki konkretne:
  - **saigon:**
    - `sub` bez „Spokojny start”, np. „Namorzyny Cần Giờ, Chợ Lớn i Sajgon od kuchni”;
    - dzień `p: 1` bez „Przylot” i „Odeśpijcie lot”, bo miasto może być też końcem trasy;
    - `solo` i `again` z zadania 5 zostają.
  - **mekong:** formy; przy wypłynięciu o 5:30 dopisz, że w porze wysokiej wody (IX–XI) godzinę dopasowuje się do przypływu (źródło: `research/sezony-2026-10.md`, „Mekong”).
  - **phuquoc:** „(patrzcie, nie podnoście)” zmień na „(patrz, nie podnoś)”. Rozgwiazdy najlepiej widać w XI–IV (tamże, „Phú Quốc”).
  - **cattien:**
    - formy w liczbie mnogiej zamień na pojedynczą;
    - skarpety przeciw pijawkom w porze deszczowej (IV–XI; tamże, „Cát Tiên”);
    - trudny dzień według researchu, np. noc w dżungli.
  - **dalat:**
    - dzień `p: 2`: „Grudzień to pora sucha, więc szlaki są pewne pod nogami.” zamień na zdanie o porze suchej od grudnia do kwietnia i śliskich szlakach w porze deszczowej (tamże, „Đà Lạt”);
    - dzień `p: 3` (Tà Năng): forma pojedyncza, wymóg licencjonowanego przewodnika zostaje (źródło `research/ta-nang-2026-10.md`);
    - dzień `p: 4`: usuń zdanie o grudniowych słonecznikach i trawie;
    - trudny dzień według researchu.
- [ ] **Krok 3: Hội An i Huế.**
  - Teksty z zadania 5 są już per „ty”. Sprawdź w nich fakty (Cesarskie Miasto, plaża An Bàng, godzina 6:00 na starym mieście) i wpisz źródła do `research/plany-dni-2026-10.md`.
  - Dopisz trudne dni, jeśli research je potwierdził.
- [ ] **Krok 4: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `content ok`, `style ok`, na końcu `ALL PASS`. Słowo na „-cie”, które jest rzeczownikiem albo przysłówkiem (np. „przybycie”), dopisz do `NOT_PLURAL`; formę czasownika przepisz.

- [ ] **Krok 5: Przeczytaj teksty jeszcze raz** — wypisz je i przeczytaj jak czytelnik:

```bash
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
echo 'Object.keys(CONTENT).forEach(function (id) { print("== " + id); print(JSON.stringify(CONTENT[id], null, 1)); });' > "$TMPDIR/show.js"
"$J" site2/src/content.js site2/src/content/{saigon,mekong,phuquoc,cattien,dalat,hoian,hue}.js "$TMPDIR/show.js" | less
```

Sprawdź:
- czy każdy dzień ma sens jako dzień przyjazdu, kolejny dzień i jedna noc, niezależnie od tego, skąd się przyjeżdża i w jakim miesiącu;
- czy wersja `easy` nie ma wędrówki ani roweru po górach;
- czy `hard` mówi, z kim się idzie.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/content tests/content.test.js research/plany-dni-2026-10.md
git commit -F - <<'EOF'
Treść: południe, Hội An i Huế per „ty” i bez grudnia, z trudnymi dniami dla poziomu „ekstremalnie”

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: Treść: północ (przepisanie i trudne dni)

**Pliki:**
- Zmień: `site2/src/content/puluong.js`, `ninhbinh.js`, `catba.js`, `hanoi.js`, `hanoiStop.js`, `babe.js`, `caobang.js`, `tests/content.test.js`, `research/plany-dni-2026-10.md`

**Interfejsy:**
- Korzysta z: zasad z zadania 7, `research/trudne-dni-2026-10.md`, `research/sezony-2026-10.md`.
- Daje:
  - wszystkie 14 miejsc przepisanych;
  - styl sprawdzany dla każdego miejsca, lista `REWRITTEN` znika;
  - wymóg, żeby poziom 3 miał gdzieś trudny dzień.

- [ ] **Krok 1: Test, który nie przechodzi** — w `tests/content.test.js` usuń linię `var REWRITTEN = …` razem z komentarzem nad nią. Zastąp sprawdzenie stylu:

```js
contentCheck('style', function (need) {
  Object.keys(CONTENT).forEach(function (id) { styleOk(need, strings(CONTENT[id], 'CONTENT.' + id, [])); });
  need(Object.keys(CONTENT).some(function (id) { return CONTENT[id].days.some(function (d) { return d.hard; }); }),
    'at least one hard day: level 3 must change something (research/trudne-dni-2026-10.md)');
});
```

Uruchom: `bash tests/run.sh`
Oczekiwane: `style:` wymienia formy w liczbie mnogiej w miejscach północy; na końcu `Exception: Error: … problem(s) in style, listed above`

- [ ] **Krok 2: Przepisz siedem miejsc** według zasad z zadania 7. Do tego poprawki konkretne:
  - **puluong:** zdanie „W grudniu ryż jest już zebrany, więc poranki są mgliste i ciche.” zastąp neutralnym. Złote tarasy są tu dwa razy w roku: od końca maja do połowy czerwca i od końca września do początku października; po żniwach poranki bywają mgliste i ciche (źródło: `research/sezony-2026-10.md`, „Pù Luông, złote tarasy”).
  - **ninhbinh:** „Bądźcie na przystani na otwarcie” zmień na formę pojedynczą z godziną: Tràng An otwiera o 7:00 (tamże, „Ninh Bình”).
  - **catba:**
    - dzień `p: 3`: usuń „W grudniu woda jest orzeźwiająca, ok. 22 °C.”;
    - `gem`: „to wasz sposób” zmień na formę neutralną, bez nazwy jednego biura („zawijają tam niektóre rejsy z Cát Bà”);
    - trudny dzień według researchu.
  - **hanoi:**
    - dzień `p: 1` „Z powrotem w Hà Nội” zmień na neutralny tytuł, np. „Stare Miasto i jezioro Hoàn Kiếm”;
    - `sub` „Stolica i lot do domu” zmień np. na „Stolica: Stare Miasto, świątynie i wioski rzemieślników”.
  - **hanoiStop:**
    - „Wieczorem z powrotem w mieście.” zmień na „Wieczór w mieście.”;
    - „przed jazdą na północ” zmień na „przed dalszą drogą”;
    - `sub` „Przerwa w drodze na północ” zmień na „Noc w drodze, między dwoma miejscami”.
  - **babe:** łódź zamiast kajaka w dniu na wodzie i w wersji `easy`. Od lipca 2026 kajaki i SUP są na jeziorze zakazane (tamże, „Ba Bể”). Trudny dzień według researchu.
  - **caobang:**
    - dzień z Bản Giốc: w porze suchej woda płynie głównie ok. 11:00–14:30 (tamże, „Bản Giốc”), więc wodospad ma być w planie w środku dnia, a jaskinia i przełęcz rano albo po południu;
    - usuń „Grudzień to pora niskiej wody…”;
    - usuń `skip` i `instead` („Sapa i pętla Hà Giang: tłumy”), bo oba miejsca dojdą w partii A;
    - trudny dzień według researchu.
- [ ] **Krok 3: Uruchom i sprawdź, że przechodzi**

Uruchom: `bash tests/run.sh && bash tests/run.sh --full`
Oczekiwane:
- `style ok`, na końcu `ALL PASS`;
- w pełnym przebiegu `combos: 134784 (all)` i `ALL PASS`;
- trudne dni nie mogą zepsuć planów dni na poziomie 3.

- [ ] **Krok 4: Przeczytaj teksty jeszcze raz** — wypisz je i przeczytaj jak czytelnik:

```bash
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
echo 'Object.keys(CONTENT).forEach(function (id) { print("== " + id); print(JSON.stringify(CONTENT[id], null, 1)); });' > "$TMPDIR/show.js"
"$J" site2/src/content.js site2/src/content/{puluong,ninhbinh,catba,hanoi,hanoiStop,babe,caobang}.js "$TMPDIR/show.js" | less
```

Sprawdź to samo co w zadaniu 7: dzień przyjazdu, kolejny dzień i jedna noc mają sens niezależnie od tego, skąd się przyjeżdża i w jakim miesiącu; `easy` bez wędrówki; `hard` mówi, z kim się idzie.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/content tests/content.test.js research/plany-dni-2026-10.md
git commit -F - <<'EOF'
Treść: północ per „ty” i bez grudnia (tarasy Pù Luông, woda na Bản Giốc, łodzie zamiast kajaków na Ba Bể), trudne dni; styl sprawdzany dla wszystkich miejsc

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 9: Strona: szablon, teksty interfejsu, trasa i build

**Pliki:**
- Skopiuj z pierwowzoru i zmień: `site2/src/template.html`, `site2/build.py`, `tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`
- Skopiuj bez zmian: `site2/src/basemap.js`
- Utwórz: `site2/src/ui.js`, `site2/src/app.js`, `tests/probes/link.js`
- Zmień: `tests/content.test.js` (klucze interfejsu, typografia i styl `UI.pl`), `tests/run.sh` (`ui.js`, lintery)

**Interfejsy:**
- Korzysta z:
  - wszystkiego z zadań 1–8: `normSettings`, `planRoute`, `travelGraph`, `PLACES`, `HUBS`, `CONTENT`, `AIRPORTS`, `ROAD_KEYS`, `PHOTO_META`, `HERO_PHOTO`, `HOLIDAYS…`;
  - funkcji z `page.js`;
  - `BASEMAP` w zadaniu 10.
- Daje:
  - stronę bez mapy i bez „Dodaj”/„Usuń” (to zadanie 10): ustawienia, liczby, ostrzeżenia, pasek dni, pobyty z galeriami, planami dni i przejazdami, dzień wylotu, kopiowanie planu, stopkę;
  - w `app.js` funkcje, które zadanie 10 rozszerza: `T`, `C`, `caption`, `nodeOf`, `stopColor`, `apply`, `syncForm`, `render`, `renderStops`, `ICON`, `state`, `window.__trip = { state, apply }`.
- Build:
  - `python3 site2/build.py` daje `site2/out/web/index.html` (fragment z `img/`), `site2/out/pages/index.html` (pełny dokument z podglądem linku) i `site2/out/offline/Wietnam-po-swojemu.html`;
  - zbudowana strona ustawia zmienną `PHOTOS`: `{ <id>: { src, srcset?, w, h } }`.

- [ ] **Krok 1: Kopie z pierwowzoru**

```bash
P=~/Desktop/"CLAUDE roboczy plik"/vietnam-planner
cp "$P/site2/src/template.html" "$P/site2/src/basemap.js" site2/src/
cp "$P/site2/build.py" site2/
mkdir -p tests/probes
cp "$P/tests/shot.sh" "$P/tests/probe.sh" "$P/tests/print.sh" tests/
```

- [ ] **Krok 2: Test, który nie przechodzi.**
  - W `tests/content.test.js`, w `contentCheck('typography', …)`, zaraz po linii `var all = strings(CONTENT, 'CONTENT', []);` dopisz `strings(UI.pl, 'UI.pl', all);`.
  - W `contentCheck('style', …)` dopisz jako pierwszą linię `styleOk(need, strings(UI.pl, 'UI.pl', []));`.
  - Na końcu pliku dopisz:

```js
/* The interface texts (ui.js): none empty; every key the code asks for exists; every key is used. */
contentCheck('ui', function (need) {
  var pl = UI.pl, app = readFile('site2/src/app.js'), tpl = readFile('site2/src/template.html'), page = readFile('site2/src/page.js');
  var code = [app, page, readFile('site2/src/content.js'), tpl].join('\n'), used = {};
  Object.keys(pl).forEach(function (k) { need(typeof pl[k] === 'string' && pl[k].trim() !== '', 'UI.pl[\'' + k + '\'] is empty'); });
  // T('…'), countWord('…', n) with its three forms, data-i18n…="…", the travel texts of page.js; a key ending in a dot is a prefix
  function wants(k, where) { if (!/\.$/.test(k)) need(k in pl, where + ' asks for the missing key ' + k); }
  (app.match(/\bT\('[^']+'/g) || []).forEach(function (m) { wants(m.slice(3, -1), 'app.js'); });
  (app.match(/countWord\('[^']+'/g) || []).forEach(function (m) {
    ['one', 'few', 'many'].forEach(function (f) { wants(m.slice(11, -1) + '.' + f, 'app.js'); used[m.slice(11, -1) + '.' + f] = true; });
  });
  (tpl.match(/data-i18n(?:-html|-alt|-aria)?="[^"]+"/g) || []).forEach(function (m) { wants(m.split('"')[1], 'template.html'); });
  (page.match(/'[rn]\.[a-z_]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'page.js'); });
  // keys built from data as T(prefix + value): app.js builds each prefix, and every value has its key
  var FAMILIES = { 'pace.': PACES, 'reg.': REGIONS, 'int.': INTERESTS, 'lvl.': LEVELS, 'lvlp.': LEVELS, 'badge.': ['easy', 'hard'],
    'mon.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'alert.': ['tet', 'holiday', 'nodata'],
    'set.err.': ['airport', 'date', 'month', 'year', 'days', 'interests', 'level', 'add', 'remove', 'no_route'] };
  Object.keys(FAMILIES).forEach(function (pre) {
    need(app.indexOf("T('" + pre + "' + ") > -1, 'app.js never builds a key ' + pre + '…');
    FAMILIES[pre].forEach(function (v) { wants(pre + v, 'the family ' + pre); used[pre + v] = true; });
  });
  // used: part of a family or a counted word, or quoted somewhere in the code or the template ('key' or "key")
  Object.keys(pl).forEach(function (k) {
    need(used[k] || code.indexOf("'" + k + "'") > -1 || code.indexOf('"' + k + '"') > -1, 'UI.pl[\'' + k + '\'] is never used');
  });
  need(pl['fmt.hm'].indexOf('{h}') > -1 && pl['fmt.hm'].indexOf('{m}') > -1, 'fmt.hm needs {h} and {m}');
});
```

  - W `tests/run.sh` zmień `SOURCES`:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES site2/src/photos.js site2/src/ui.js site2/src/page.js"
```

Uruchom: `bash tests/run.sh`
Oczekiwane: `tests/run.sh: missing file site2/src/ui.js`

- [ ] **Krok 3: Teksty interfejsu** — utwórz `site2/src/ui.js`:

```js
/* The interface texts. Polish is the base language; another one would be UI.<code> with exactly these keys.
   {name} marks a value the page fills in. Counted words ('nights', 'f.places', 'f.flights', 'f.hikes') have three forms,
   picked by nightForm() in page.js: .one for 1; .few for numbers ending in 2–4 except 12–14; .many for the rest. */
var UI = {};
UI.pl = {
  'doc.title': 'Wietnam po swojemu',
  'nav.aria': 'Sekcje', 'nav.settings': 'Ustawienia', 'nav.shape': 'W skrócie', 'nav.days': 'Dzień po dniu', 'nav.top': 'Na górę',
  'hero.alt': 'Kobieta wiosłuje małą łodzią po rzece u stóp wapiennych skał w Tràng An, Ninh Bình',
  'hero.eyebrow': 'Planer podróży po Wietnamie',
  'hero.h1': 'Wietnam <em>po</em> swojemu',
  'hero.lede': 'Ustaw termin, lotniska, to, co lubisz, i poziom przygody. Strona od razu ułoży trasę: miejsca, plan każdego dnia, przejazdy i mapę. Potem możesz ją poprawić i wysłać linkiem.',
  'hero.cta1': 'Ustaw swój wyjazd', 'hero.cta2': 'Zobacz trasę',

  'set.eyebrow': 'Krok 1', 'set.h2': 'Twój wyjazd',
  'set.p': 'Trasa przelicza się przy każdej zmianie. Ustawienia są w adresie strony, więc skopiowany adres to gotowy link.',
  'set.term': 'Termin', 'set.mode.month': 'Miesiąc i liczba dni', 'set.mode.dates': 'Dokładne daty',
  'set.month': 'Miesiąc', 'set.days': 'Liczba dni', 'set.start': 'Dzień przylotu', 'set.end': 'Dzień wylotu',
  'set.days.note': 'Dni liczymy od przylotu do wylotu, oba włącznie.',
  'set.airports': 'Lotniska', 'set.from': 'Przylot do', 'set.to': 'Wylot z',
  'set.interests': 'Co lubisz (najwyżej dwie rzeczy)',
  'set.interests.none': 'Bez wyboru trasa ma po trochu wszystkiego.',
  'set.level': 'Poziom przygody',
  'int.kultura': 'Kultura i historia', 'int.jedzenie': 'Jedzenie', 'int.przyroda': 'Dzika przyroda', 'int.gory': 'Góry i jaskinie', 'int.morze': 'Morze i wyspy',
  'lvl.1': 'Spokojnie', 'lvl.2': 'Aktywnie', 'lvl.3': 'Ekstremalnie',
  'lvlp.1': 'Spacery, wycieczki jednodniowe i łatwe wersje dni.',
  'lvlp.2': 'Całodniowe wędrówki, rowery i łodzie, noce u gospodarzy.',
  'lvlp.3': 'Trudne dni z licencjonowanym przewodnikiem: dłuższe trasy i noce w terenie.',
  'mon.1': 'styczeń', 'mon.2': 'luty', 'mon.3': 'marzec', 'mon.4': 'kwiecień', 'mon.5': 'maj', 'mon.6': 'czerwiec',
  'mon.7': 'lipiec', 'mon.8': 'sierpień', 'mon.9': 'wrzesień', 'mon.10': 'październik', 'mon.11': 'listopad', 'mon.12': 'grudzień',
  'set.err.airport': 'Wybierz lotniska z listy.',
  'set.err.date': 'Podaj obie daty: przylotu i wylotu.',
  'set.err.month': 'Wybierz miesiąc z listy.',
  'set.err.year': 'Wybierz miesiąc z rokiem z listy.',
  'set.err.days': 'Wyjazd trwa od {min} do {max} dni, licząc dzień przylotu i dzień wylotu.',
  'set.err.interests': 'Wybierz najwyżej dwie rzeczy.',
  'set.err.level': 'Wybierz poziom przygody.',
  'set.err.add': 'Tego miejsca nie da się dodać.',
  'set.err.remove': 'Tego miejsca nie da się usunąć.',
  'set.err.no_route': 'Przy tych ustawieniach nie da się ułożyć trasy. Przywróć usunięte miejsca albo zmień lotniska.',
  'set.err.keep': ' Poniżej zostaje ostatnia trasa.',
  'set.dropped': 'Część linku była błędna, więc w jej miejsce strona wzięła ustawienia domyślne.',

  'f.for': 'Twoja trasa: {from} → {to}, {term}',
  'f.days': 'dni, {nights}',
  'nights.one': 'noc', 'nights.few': 'noce', 'nights.many': 'nocy',
  'f.places.one': 'miejsce', 'f.places.few': 'miejsca', 'f.places.many': 'miejsc',
  'f.flights.one': 'lot krajowy', 'f.flights.few': 'loty krajowe', 'f.flights.many': 'lotów krajowych',
  'f.hikes.one': 'dzień z wędrówką', 'f.hikes.few': 'dni z wędrówką', 'f.hikes.many': 'dni z wędrówką',
  'f.longest': 'najdłuższy dzień w drodze',
  'term.month': '{month} {year}',
  'alert.tet': 'Tết, dni wolne {span}: część miejsc jest zamknięta, a transport i noclegi wyprzedają się i drożeją, także tydzień przed i po. Rezerwuj wcześnie.',
  'alert.holiday': '{name}, {span}: wolne w całym kraju, Wietnamczycy ruszają w drogę. Transport i noclegi rezerwuj wcześniej.',
  'alert.nodata': 'Dla części terminu strona nie ma dat świąt. Sprawdź daty Tết i świąt państwowych.',

  'shape.eyebrow': 'W skrócie', 'shape.h2': 'Wszystkie {days} dni',
  'shape.p': 'Jeden kwadrat to jeden dzień, w kolorze miejsca noclegu. Kropka oznacza dzień przyjazdu. Kliknij dzień, żeby do niego przejść.',
  'day': 'Dzień', 'days': 'Dni',
  'flyhome': 'Wylot', 'flyhome.aria': 'Dzień {days}: wylot z {airport}',
  'missing': 'Nie zmieściło się: {x}. Reszta trasy jest bez zmian.',
  'copy.btn': 'Kopiuj plan na WhatsApp', 'copy.aria': 'Plan jako tekst', 'copy.ok': 'Skopiowano. Wklej plan do czatu.', 'copy.fail': 'Skopiuj zaznaczony tekst poniżej.',

  'days.eyebrow': 'Dzień po dniu', 'days.h2': 'Trasa', 'map.aria': 'Mapa trasy',
  'days.p': 'Każde miejsce ze zdjęciami, planem na każdy dzień i opisem dojazdu. Mapa jest w skali, a na dużym ekranie zostaje w widoku przy przewijaniu.',
  'pace.travel': 'Dzień w drodze', 'pace.hike': 'Aktywna wędrówka', 'pace.nature': 'Przyroda bez wysiłku', 'pace.boat': 'Dzień na wodzie',
  'pace.culture': 'Zwiedzanie bez wysiłku', 'pace.rest': 'Dzień odpoczynku',
  'badge.easy': 'Wersja spokojna', 'badge.hard': 'Trudny dzień', 'early': 'Pobudka przed 6',
  't.rain': 'Gdy pada: ', 't.gem': 'Ukryta perełka', 't.skip': 'Do pominięcia', 't.instead': 'Zamiast tego: ',
  'reg.south': 'południowy Wietnam', 'reg.centre': 'środkowy Wietnam', 'reg.north': 'północny Wietnam',
  'home.h3': 'Wylot z {airport}', 'home.t': 'Dojazd na lotnisko i lot do domu',
  'home.d': 'Ostatni dzień zostaje lekki, bo strona nie zna godziny lotu.',
  'home.far': 'Na lotnisko jedzie się {time}: przy locie przed południem wyjedź bardzo wcześnie albo ostatnią noc spędź bliżej lotniska.',

  'fly': 'Lot', 'door': 'od drzwi do drzwi', 'longday': 'Długi dzień w drodze', 'maps': 'Trasa w Mapach Google',
  'leg.airport': 'Lotnisko {x}',
  'min': 'min', 'h': 'godz.', 'fmt.hm': '{h} godz. {m} min',
  'r.taxi_from': 'Taksówka albo transfer z lotniska {x}',
  'r.taxi_to': 'Taksówka na lotnisko {x}',
  'r.van_car': 'Minibus typu limousine albo prywatny samochód',
  'r.van_ferry': 'Minibus typu limousine i krótki prom',
  'r.bus_mekong': 'Autobus albo prywatny samochód do Phong Điền',
  'r.car_cattien': 'Prywatny samochód albo autobus, na koniec prom przez rzekę Đồng Nai',
  'r.car_baoloc': 'Prywatny samochód w górę, przez Bảo Lộc',
  'r.haivan': 'Samochód z kierowcą przez przełęcz Hải Vân, z postojem nad laguną Lăng Cô; gdy przełęcz tonie w chmurach, kierowca jedzie tunelem',
  'n.afternoon': 'Najpierw długa droga na lotnisko: wybierz lot po południu.',
  'n.long': 'Podróż zajmie cały dzień: wyrusz wcześnie.',
  'n.solo_long': 'Po porannym planie w poprzednim miejscu zostaje długa droga i dotrzesz wieczorem. Żeby jechać za dnia, pomiń poranny plan.',

  'pt.title': 'Wietnam po swojemu: {days} dni, {term}',
  'pt.route': '{from} → {to}',
  'pt.profile': 'Co lubisz: {x}. Poziom: {lvl}.',
  'pt.any': 'po trochu wszystkiego',
  'pt.arrive': 'Dzień 1: przylot do {airport}',
  'pt.home': 'Dzień {days}: wylot z {airport}',
  'pt.flights': 'Loty krajowe: ',
  'pt.link': 'Ten plan na stronie: ',

  'g.open': 'Otwórz zdjęcie {i} z {n} na pełnym ekranie', 'g.show': 'Pokaż zdjęcie {i}', 'g.photos': 'Zdjęcia: {x}',
  'g.prev': 'Poprzednie zdjęcie', 'g.next': 'Następne zdjęcie', 'g.full': 'Pełny ekran',
  'lb.aria': 'Przeglądarka zdjęć', 'lb.close': 'Zamknij przeglądarkę zdjęć', 'lb.photo': 'Fot. ',

  'ft.photos': 'Zdjęcia · Wikimedia Commons', 'ft.notes': 'Uwagi',
  'ft.notes.p': 'Czasy przejazdów to szacunki od drzwi do drzwi, z ok. 1½ godz. na lotnisku przy każdym locie. Połączenia sprawdzono w październiku 2026. Rozkłady lotów, godziny otwarcia, zasady na szlakach i stan morza sprawdź przed wyjazdem u przewoźnika i na miejscu. Trudne dni tylko z licencjonowanym przewodnikiem albo operatorem.',
  'ft.copy': '© 2026 Wietnam po swojemu. Wszelkie prawa zastrzeżone.'
};
```

- [ ] **Krok 4: Szablon: CSS.** W skopiowanym `site2/src/template.html`:
  - **Tytuł i nagłówek:**
    - `<title>Vietnam in December</title>` zmień na `<title>Wietnam po swojemu</title>`;
    - komentarz `/* Layout: … */` na początku stylu zmień na `/* Layout: photo opener, the facts, the settings, the day strip, then the route as a split view: sticky to-scale map beside the stays on desktop, stacked on phones. */`.
  - **Kolory:**
    - w `:root` zamień `--c-central: #a1443a;` na `--c-hoian: #a1443a; --c-hue: #3f4a9e;`;
    - w obu blokach ciemnego motywu zamień `--c-central: #ee8f80;` na `--c-hoian: #ee8f80; --c-hue: #a9b1f0;`.
  - **Do usunięcia, bo opisują przełącznik języka, karty stylów, zamiany i grudniowe sekcje:**
    - blok `/* Language switch */` (cztery reguły `.lang…`) i reguła `body.mz-open .lang`;
    - reguła `.facts b.money`; w `.facts ul` zmień `repeat(6, …)` na `repeat(5, …)`;
    - blok od `/* Style cards */` do `.style-stats { … }` włącznie. Regułę `.m-startbox { fill: var(--ink); }` z tego bloku przenieś pod `.m-start .m-label`;
    - blok od `/* Swaps */` do `.swaps-none { … }` włącznie. Reguły `.day-rain` i `.day-rain b` z tego bloku przenieś pod `.day p`;
    - z bloku `/* Tones & pace */` reguły `.tone`, `.tone-good`, `.tone-cool`, `.tone-wet`, `#night .swap`, `.night-p`, `.swap-opt li.pro::before` i `.swap-opt li.con::before`. Regułę `.pace-gentle` przemianuj na `.pace-easy` i dopisz pod nią `.pace-hard { background: transparent; color: var(--wet); border: 1px dashed var(--wet); }`;
    - reguły `.why` i `.stop-head .tone`;
    - bloki `/* Weather */` (z `.src`), `/* Left out */` i `/* Logistics */` (z `#flight-list`);
    - cały `@media (max-width: 1000px) { … }`;
    - w `@media (max-width: 900px)` reguła `.extras`;
    - w `@media (max-width: 640px)` reguła `.facts b.money`, reguły `.style-list`, `.style-card`, `.style-img`, `.style-img img`, `.style-map`, `.style-map .mini-wide`, `.style-map .mini-tall` i `.style-body` z komentarzem nad nimi oraz `.swap-opts` i `.swap-or`.
  - **Menu sekcji:**
    - w `.secnav .wrap` usuń `padding-right: 154px;` i komentarz nad regułą;
    - w `@media (max-width: 900px)` dla `.secnav .wrap` usuń `margin-right` i `padding-right`, maski zostają. Komentarz zmień na `/* on narrow screens the links scroll, and the strip fades out at its end */`.
  - **Wydruk (`@media print`):**
    - z listy `display: none` usuń `.lang`, `#swaps …`, `#night …`, `.swap-or` i `.style-card…`, a dopisz `.settings`;
    - usuń regułę `.swap-opts` z komentarzem i regułę `.style-img, .style-map`;
    - z listy `break-inside: avoid` usuń `.card`, `.wx`, `.left-out li`, `.swap-opt` i `.style-card`.
  - **Nowe reguły:** przed `/* Strip */` dopisz:

```css
/* Settings */
.settings { display: grid; gap: 22px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: clamp(16px, 2.4vw, 26px); }
.set-group { border: 0; margin: 0; padding: 0; min-width: 0; display: grid; gap: 10px; }
.set-group legend { font-weight: 600; font-size: 17px; padding: 0; margin-bottom: 10px; }
.set-row { display: flex; flex-wrap: wrap; gap: 10px 14px; align-items: flex-end; }
.field { display: grid; gap: 4px; font-size: 13px; color: var(--muted); }
.field select, .field input { font: 16px var(--body); color: var(--ink); background: var(--paper); border: 1px solid var(--line); border-radius: 6px; padding: 8px 10px; min-height: 44px; }
.chip { position: relative; display: inline-flex; align-items: center; gap: 8px; background: var(--paper); border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; min-height: 44px; cursor: pointer; font-size: 15px; }
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.chip:has(input:checked) { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent); background: var(--accent-soft); }
.chip:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 3px; }
.chip:has(input:disabled) { opacity: 0.45; cursor: default; }
.chip-wide { flex: 1 1 220px; align-items: flex-start; border-radius: 8px; }
.chip-wide span { display: grid; gap: 2px; font-size: 13.5px; color: var(--muted); }
.chip-wide b { font-size: 15px; font-weight: 600; color: var(--ink); }
.set-note { font-size: 13px; color: var(--muted); }
.set-msg { font-size: 14.5px; color: var(--wet); }
.set-msg:empty { display: none; }
/* Holiday warnings under the facts, and the places that did not fit */
.alerts { display: grid; gap: 6px; padding-bottom: 14px; }
.alerts li { font-size: 14px; background: var(--warm-soft); border-left: 3px solid var(--warm); padding: 8px 12px; border-radius: 4px; }
.missing { margin-top: 16px; font-size: 15px; color: var(--wet); }
.missing:empty { display: none; }
footer .ft-copy { margin-top: 18px; }
```

- [ ] **Krok 5: Szablon: HTML.** Zastąp wszystko od `<div class="lang" …>` (zaraz po `</style>`) do końca pliku tym kodem. Elementy z `data-i18n…` zostają puste, bo tekst daje `UI.pl`. Mapa w powiększeniu (`#mapzoom`) i lista „Poza trasą” dochodzą w zadaniu 10.

```html
<header class="hero" id="top">
  <img src="__HERO_SRC__" __HERO_SRCSET__ alt="" data-i18n-alt="hero.alt" width="__HERO_W__" height="__HERO_H__" fetchpriority="high">
  <span class="hero-where">Tràng An, Ninh Bình</span>
  <div class="hero-text">
    <div class="wrap">
      <p class="eyebrow" data-i18n="hero.eyebrow"></p>
      <h1 data-i18n-html="hero.h1"></h1>
      <p class="hero-lede" data-i18n="hero.lede"></p>
      <div class="hero-cta"><a class="primary" href="#settings" data-i18n="hero.cta1"></a><a class="ghost" href="#shape" data-i18n="hero.cta2"></a></div>
    </div>
  </div>
</header>
<div class="facts"><div class="wrap"><p class="facts-for" id="facts-for"></p><ul id="facts"></ul><ul class="alerts" id="alerts" hidden></ul></div></div>
<nav class="secnav" data-i18n-aria="nav.aria"><div class="wrap">
  <a href="#settings" data-i18n="nav.settings"></a>
  <a href="#shape" data-i18n="nav.shape"></a>
  <a href="#days" data-i18n="nav.days"></a>
</div></nav>
<a class="totop" id="totop" href="#top" data-i18n-aria="nav.top" hidden><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg></a>

<main>
  <section class="block wrap" id="settings">
    <div class="block-head">
      <p class="eyebrow" data-i18n="set.eyebrow"></p>
      <h2 data-i18n="set.h2"></h2>
      <p data-i18n="set.p"></p>
    </div>
    <form class="settings" id="settings-form" novalidate>
      <fieldset class="set-group">
        <legend data-i18n="set.term"></legend>
        <div class="set-row">
          <label class="chip"><input type="radio" name="mode" value="month"><span data-i18n="set.mode.month"></span></label>
          <label class="chip"><input type="radio" name="mode" value="dates"><span data-i18n="set.mode.dates"></span></label>
        </div>
        <div class="set-row" id="term-month">
          <label class="field"><span data-i18n="set.month"></span><select name="month"></select></label>
          <label class="field"><span data-i18n="set.days"></span><select name="days"></select></label>
        </div>
        <div class="set-row" id="term-dates" hidden>
          <label class="field"><span data-i18n="set.start"></span><input type="date" name="start"></label>
          <label class="field"><span data-i18n="set.end"></span><input type="date" name="end"></label>
        </div>
        <p class="set-note" data-i18n="set.days.note"></p>
      </fieldset>
      <fieldset class="set-group">
        <legend data-i18n="set.airports"></legend>
        <div class="set-row">
          <label class="field"><span data-i18n="set.from"></span><select name="from"></select></label>
          <label class="field"><span data-i18n="set.to"></span><select name="to"></select></label>
        </div>
      </fieldset>
      <fieldset class="set-group">
        <legend data-i18n="set.interests"></legend>
        <div class="set-row" id="interest-list"></div>
        <p class="set-note" data-i18n="set.interests.none"></p>
      </fieldset>
      <fieldset class="set-group">
        <legend data-i18n="set.level"></legend>
        <div class="set-row" id="level-list"></div>
      </fieldset>
      <p class="set-msg" id="settings-msg" role="status"></p>
    </form>
  </section>

  <section class="block wrap" id="shape">
    <div class="block-head">
      <p class="eyebrow" data-i18n="shape.eyebrow"></p>
      <h2 id="shape-h2" tabindex="-1"></h2>
      <p data-i18n="shape.p"></p>
    </div>
    <div class="strip" id="strip"></div>
    <ul class="strip-legend" id="strip-legend"></ul>
    <p class="missing" id="missing" role="status"></p>
    <div class="copy">
      <button type="button" class="btn" id="copy-plan" data-i18n="copy.btn"></button>
      <span id="copy-status" role="status"></span>
      <textarea id="copy-fallback" rows="9" readonly hidden data-i18n-aria="copy.aria"></textarea>
    </div>
  </section>

  <section class="block wrap" id="days">
    <div class="block-head">
      <p class="eyebrow" data-i18n="days.eyebrow"></p>
      <h2 data-i18n="days.h2"></h2>
      <p data-i18n="days.p"></p>
    </div>
    <div class="route">
      <aside class="map-col" data-i18n-aria="map.aria"><div class="map" id="map"></div></aside>
      <div class="stops" id="stops"></div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    <h2 data-i18n="ft.photos"></h2>
    <ul class="credits" id="credits"></ul>
    <h2 data-i18n="ft.notes"></h2>
    <p data-i18n="ft.notes.p"></p>
    <p class="ft-copy" data-i18n="ft.copy"></p>
  </div>
</footer>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" data-i18n-aria="lb.aria" hidden>
  <div class="lb-bar"><span id="lb-count"></span><button type="button" class="lb-btn" id="lb-close" data-i18n-aria="lb.close"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="lb-stage"><img id="lb-img" alt=""></div>
  <div class="lb-foot"><p id="lb-cap"></p><p id="lb-credit"></p></div>
  <button type="button" class="lb-btn lb-nav" id="lb-prev" data-i18n-aria="g.prev"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg></button>
  <button type="button" class="lb-btn lb-nav" id="lb-next" data-i18n-aria="g.next"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></button>
</div>

<script>
__SCRIPT__
</script>
```

- [ ] **Krok 6: Logika strony** — utwórz `site2/src/app.js`. Trzy miejsca oznaczone `COPY` wypełnij kodem z `$P/site2/src/app.js`, a komentarze `COPY` usuń:
  - **`ICON`:** cały obiekt z pierwowzoru, bez zmian.
  - **Galerie i lightbox:** blok `/* ---------- galleries & lightbox ---------- */`, czyli `initGalleries`, zmienna `lb`, `lbShow`, `openLightbox`, `closeLightbox` i `bindLightbox`. Zmiany:
    - w `initGalleries` zamień `CAP(ids[i])` na `caption(ids[i])`;
    - w `lbShow` zamień `CAP(lb.ids[lb.i])` (dwa razy) na `caption(lb.ids[lb.i])`;
    - w `lbShow` zamień `p.artist + ' · ' + p.license` na `PHOTO_META[lb.ids[lb.i]].artist + ' · ' + PHOTO_META[lb.ids[lb.i]].license`.
  - **`observeStops` i `tieShortWords`:** bez zmian.

```js
/* Page logic: reads the settings (the link or the form), plans the trip with the engine (engine.js) and renders the facts,
   the day strip, the stays with their day plans and the journeys. Pure helpers: page.js; texts: ui.js, content/, photos.js. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- texts ---------- */
  var lang = 'pl';   // the only language for now; UI keeps its keys, so another one can come later as UI.<code>
  function T(k, vars) {
    var v = UI[lang][k];
    if (v == null) return k;
    if (vars) Object.keys(vars).forEach(function (n) { v = v.split('{' + n + '}').join(vars[n]); });
    return v;
  }
  function countWord(key, n) { return T(key + '.' + nightForm(n)); }
  function C(id) { return CONTENT[id]; }
  function caption(id) { return PHOTO_META[id].cap; }
  function nodeOf(id) { return PLACES[id].node || id; }
  function stopColor(id) { return 'var(--c-' + nodeOf(id) + ')'; }

  /* ---------- formatting ---------- */
  function fmtH(h) {
    var mins = Math.round(h * 60 / 5) * 5;
    if (mins < 60) return mins + ' ' + T('min');
    var hh = Math.floor(mins / 60), mm = mins % 60;
    return mm ? T('fmt.hm', { h: hh, m: mm }) : hh + ' ' + T('h');
  }
  function approx(h) {
    var r = Math.round(h * 2) / 2, whole = Math.floor(r);
    return '≈ ' + (r % 1 ? (whole ? whole : '') + '½' : whole) + ' ' + T('h');
  }
  function dayRange(a, b) { return a === b ? T('day') + ' ' + a : T('days') + ' ' + a + '–' + b; }
  // the weekday and date of trip day n, only when the trip has dates
  function dateLabel(day) {
    var iso = tripDate(state.st.start, day);
    if (!iso) return '';
    var p = iso.split('-').map(Number);
    return new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
  }
  function termText(st) {
    return st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('term.month', { month: T('mon.' + st.month), year: st.year });
  }

  /* ---------- state ---------- */
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var TODAY = new Date().toISOString().slice(0, 10);
  var DEFAULTS = defaultSettings(TODAY);
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay
  var state = { settings: null, st: null, route: null, plans: null };

  function msg(text) { $('#settings-msg').textContent = text; }

  /* New settings: plan the trip; when there is one, show it and write the settings into the address. Otherwise keep the
     last trip and say why under the settings. Returns whether the trip changed. */
  function apply(s) {
    var st = normSettings(s, PLACES, HUBS), r = st.ok ? planRoute(st, DATA) : null;
    if (!st.ok || !r.ok) {
      msg(T('set.err.' + (st.ok ? r.error : st.error), { min: MIN_DAYS, max: MAX_DAYS }) + (state.route ? T('set.err.keep') : ''));
      return false;
    }
    var done = {};
    state.settings = s; state.st = st; state.route = r;
    state.plans = r.stops.map(function (x) {
      var days = stopDays(C(x.id), x, done[x.id] || 0, st.level, st.months);
      done[x.id] = (done[x.id] || 0) + x.n;
      return days;
    });
    msg('');
    var h = linkHash(s);
    if (location.hash !== h) {
      try { history.replaceState(null, '', h); } catch (e) { location.replace(h); }
    }
    render();
    return true;
  }

  /* The settings in the address: a link someone sent, or the defaults. A link whose Dodaj and Usuń leave no trip opens
     without them. */
  function fromLink() {
    var got = settingsFromLink(parseLink(location.hash), DEFAULTS, PLACES, HUBS), dropped = got.dropped.length > 0;
    if (!apply(got.settings)) { apply(withoutChanges(got.settings)); dropped = true; }
    if (dropped) msg(T('set.dropped'));
    syncForm();
  }

  /* ---------- the settings form ---------- */
  var F = null;
  function buildForm() {
    F = $('#settings-form');
    var days = [];
    for (var d = MIN_DAYS; d <= MAX_DAYS; d++) days.push('<option value="' + d + '">' + d + '</option>');
    F.days.innerHTML = days.join('');
    var airports = Object.keys(HUBS).map(function (code) { return '<option value="' + code + '">' + esc(AIRPORTS[code].name) + '</option>'; }).join('');
    F.from.innerHTML = airports;
    F.to.innerHTML = airports;
    $('#interest-list').innerHTML = INTERESTS.map(function (k) {
      return '<label class="chip"><input type="checkbox" name="interest" value="' + k + '"><span>' + T('int.' + k) + '</span></label>';
    }).join('');
    $('#level-list').innerHTML = LEVELS.map(function (n) {
      return '<label class="chip chip-wide"><input type="radio" name="level" value="' + n + '"><span><b>' + T('lvl.' + n) + '</b>' + T('lvlp.' + n) + '</span></label>';
    }).join('');
    F.start.min = TODAY;
    F.start.max = PLAN_LAST_YEAR + '-12-31';
    F.addEventListener('submit', function (e) { e.preventDefault(); });
    F.addEventListener('change', onFormChange);
  }
  // the months on offer, plus the month of a link from outside that range, so the form always shows the settings
  function monthOptions(s) {
    var list = monthChoices(TODAY, PLAN_LAST_YEAR);
    if (s.year && !list.some(function (m) { return m.year === s.year && m.month === s.month; })) list.unshift({ year: s.year, month: s.month });
    F.month.innerHTML = list.map(function (m) {
      return '<option value="' + m.year + '-' + m.month + '">' + T('mon.' + m.month) + ' ' + m.year + '</option>';
    }).join('');
  }
  /* The form shows state.settings. Once two interests are chosen, the other three are greyed out. */
  function syncForm() {
    var s = state.settings, dates = !!s.start;
    monthOptions(s);
    F.mode.value = dates ? 'dates' : 'month';
    $('#term-month').hidden = dates;
    $('#term-dates').hidden = !dates;
    if (dates) { F.start.value = s.start; F.end.value = s.end; F.end.min = s.start; }
    else { F.month.value = s.year + '-' + s.month; F.days.value = String(s.days); }
    F.from.value = s.from;
    F.to.value = s.to;
    F.level.value = String(s.level);
    var two = s.interests.length >= 2;
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) {
      b.checked = s.interests.indexOf(b.value) > -1;
      b.disabled = two && !b.checked;
    });
  }
  function readForm() {
    var s = { from: F.from.value, to: F.to.value, interests: [], level: +F.level.value,
      add: state.settings.add.slice(), remove: state.settings.remove.slice() };
    if (F.mode.value === 'dates') { s.start = F.start.value; s.end = F.end.value; }
    else {
      var ym = F.month.value.split('-');
      s.year = +ym[0]; s.month = +ym[1]; s.days = +F.days.value;
    }
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) { if (b.checked) s.interests.push(b.value); });
    return s;
  }
  /* A change in the form. Switching between the month and the dates keeps the trip: the first of the month (or today)
     and the same length, or the month of the arrival day and the same number of days. */
  function onFormChange(e) {
    var s, st = state.st;
    if (e.target.name === 'mode') {
      s = copySettings(state.settings);
      if (e.target.value === 'dates' && !s.start) {
        var first = st.year + '-' + (st.month < 10 ? '0' : '') + st.month + '-01';
        if (first < TODAY) first = TODAY;
        s.start = first;
        s.end = tripDate(first, st.days);
      } else if (e.target.value === 'month' && s.start) {
        s.year = +s.start.slice(0, 4); s.month = +s.start.slice(5, 7); s.days = st.days;
        delete s.start; delete s.end;
      }
    } else {
      s = readForm();
    }
    if (apply(s)) syncForm();
  }

  /* Links inside the page (a day in the strip, the menu, back to the top) scroll without changing the address, which
     holds the settings; smoothly or not as the CSS says (scroll-behavior, off for reduced motion). A link pasted into the
     address bar opens its settings. */
  function bindAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      var el = a && document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ block: 'start' });
      if (!/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    });
    window.addEventListener('hashchange', function () {
      if (state.settings && location.hash === linkHash(state.settings)) return;
      if (!Object.keys(parseLink(location.hash)).length) {   // an anchor typed by hand: put the settings back
        try { history.replaceState(null, '', linkHash(state.settings)); } catch (e) { /* the address keeps the anchor */ }
        return;
      }
      fromLink();
    });
  }

  /* ---------- rendering ---------- */
  // COPY: var ICON = { … } from the December planner's app.js, unchanged

  function render() {
    renderFacts();
    renderShape();
    renderStops();
    $('#copy-status').textContent = '';
    $('#copy-fallback').hidden = true;
    tieShortWords(document.body);
  }

  function renderFacts() {
    var r = state.route, st = state.st, k = routeStats(r, state.plans, PLACES), n = r.days - 1;
    $('#facts-for').textContent = T('f.for', { from: AIRPORTS[st.from].name, to: AIRPORTS[st.to].name, term: termText(st) });
    $('#facts').innerHTML =
      '<li><b>' + r.days + '</b><span>' + T('f.days', { nights: n + ' ' + countWord('nights', n) }) + '</span></li>' +
      '<li><b>' + k.places + '</b><span>' + countWord('f.places', k.places) + '</span></li>' +
      '<li><b>' + k.flights + '</b><span>' + countWord('f.flights', k.flights) + '</span></li>' +
      '<li><b>' + k.hikes + '</b><span>' + countWord('f.hikes', k.hikes) + '</span></li>' +
      '<li><b>' + approx(k.longest).replace('≈ ', '') + '</b><span>' + T('f.longest') + '</span></li>';
    var a = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS);
    var lines = a.hits.map(function (h) { return T('alert.' + h.kind, { name: h.name, span: fmtSpan(h.from, h.to) }); });
    if (a.unknown) lines.push(T('alert.nodata'));
    $('#alerts').innerHTML = lines.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    $('#alerts').hidden = !lines.length;
  }

  function renderShape() {
    var r = state.route, cells = [];
    $('#shape-h2').textContent = T('shape.h2', { days: r.days });
    r.stops.forEach(function (s, i) {
      state.plans[i].forEach(function (d, k) {
        var label = T('day') + ' ' + d.day + ': ' + C(s.id).short + ', ' + d.t + (dateLabel(d.day) ? ' (' + dateLabel(d.day) + ')' : '');
        cells.push('<a class="cell' + (k === 0 ? ' arrive' : '') + '" href="#day-' + d.day + '" style="--c:' + stopColor(s.id) +
          '" aria-label="' + esc(label) + '"><span>' + d.day + '</span></a>');
      });
    });
    cells.push('<a class="cell home" href="#day-' + r.days + '" aria-label="' + esc(T('flyhome.aria', { days: r.days, airport: AIRPORTS[state.st.to].name })) +
      '"><span>' + r.days + '</span>' + ICON.fly + '</a>');
    $('#strip').innerHTML = cells.join('');
    $('#strip').style.setProperty('--cols', Math.min(r.days, 16));
    $('#strip-legend').innerHTML = r.stops.map(function (s) {
      return '<li><span class="dot" style="--c:' + stopColor(s.id) + '"></span>' + esc(C(s.id).short) + ' <span class="mono">' + dayRange(s.start, s.end) + '</span></li>';
    }).join('') + '<li><span class="dot home-dot"></span>' + T('flyhome') + ' <span class="mono">' + T('day') + ' ' + r.days + '</span></li>';
    $('#missing').textContent = r.missing.length ? T('missing', { x: r.missing.map(function (id) { return C(id).short; }).join(', ') }) : '';
  }

  function dayItem(d) {
    return '<li class="day" id="day-' + d.day + '"><div class="day-n mono">' + T('day') + ' <b>' + d.day + '</b>' +
      (dateLabel(d.day) ? '<span class="day-date">' + esc(dateLabel(d.day)) + '</span>' : '') + '</div>' +
      '<div class="day-body"><h4>' + esc(d.t) + ' <span class="pace pace-' + d.pace + '">' + T('pace.' + d.pace) + '</span>' +
      (d.variant ? ' <span class="pace pace-' + d.variant + '">' + T('badge.' + d.variant) + '</span>' : '') +
      (d.early ? ' <span class="pace pace-early">' + T('early') + '</span>' : '') + '</h4>' +
      '<p>' + esc(d.d) + '</p>' + (d.rain ? '<p class="day-rain"><b>' + T('t.rain') + '</b>' + esc(d.rain) + '</p>' : '') + '</div></li>';
  }
  function tips(c) {
    var t = '';
    if (c.gem) t += '<p class="tip"><b>' + T('t.gem') + '</b>' + esc(c.gem) + '</p>';
    if (c.skip) t += '<p class="tip tip-skip"><b>' + T('t.skip') + '</b>' + esc(c.skip) + ' <span class="instead">' + T('t.instead') + esc(c.instead) + '</span></p>';
    return t ? '<div class="tips">' + t + '</div>' : '';
  }
  // sizes: how wide the photo is drawn, so the browser picks the smallest copy from srcset (the offline file has none)
  function img(id, cls, sizes) {
    var p = PHOTOS[id];
    return '<img class="' + (cls || '') + '" src="' + p.src + '" alt="' + esc(caption(id)) + '" width="' + p.w + '" height="' + p.h +
      '" loading="lazy" decoding="async"' + (p.srcset && sizes ? ' srcset="' + p.srcset + '" sizes="' + sizes + '"' : '') + '>';
  }
  // the photos of a place; keyboard stops: the photo strip (arrow keys), previous, next and full screen
  function gallery(id) {
    var ids = C(id).photos;
    if (!ids.length) return '';
    var slides = ids.map(function (ph, i) {
      return '<figure class="gal-slide"><button type="button" class="gal-open" tabindex="-1" data-i="' + i + '" aria-label="' + esc(T('g.open', { i: i + 1, n: ids.length })) + '">' +
        img(ph, '', '(max-width: 900px) calc(100vw - 64px), 760px') + '</button></figure>';
    }).join('');
    var thumbs = ids.map(function (ph, i) {
      return '<button type="button" class="gal-thumb" tabindex="-1" data-i="' + i + '" aria-label="' + esc(T('g.show', { i: i + 1 })) + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' +
        img(ph, '', '56px') + '</button>';
    }).join('');
    return '<div class="gal" data-photos="' + ids.join(',') + '">' +
      '<div class="gal-view"><div class="gal-track" tabindex="0" aria-label="' + esc(T('g.photos', { x: C(id).name })) + '">' + slides + '</div>' +
      '<button type="button" class="gal-btn gal-prev" aria-label="' + esc(T('g.prev')) + '" disabled>' + ICON.prev + '</button>' +
      '<button type="button" class="gal-btn gal-next" aria-label="' + esc(T('g.next')) + '">' + ICON.next + '</button>' +
      '<span class="gal-count mono" aria-live="polite">1 / ' + ids.length + '</span>' +
      '<button type="button" class="gal-full" data-i="0" aria-label="' + esc(T('g.full')) + '">' + ICON.expand + '</button></div>' +
      '<div class="gal-under"><p class="gal-cap">' + esc(caption(ids[0])) + '</p><div class="gal-thumbs">' + thumbs + '</div></div></div>';
  }

  /* The journey on a given day: L is a stay's leg from planRoute, or the way home (toId null). prev: the stay before. */
  function legCard(L, day, prev, toId) {
    var from = AIRPORTS[L.from] ? T('leg.airport', { x: AIRPORTS[L.from].name }) : C(L.from).short;
    var to = toId ? C(toId).short : T('leg.airport', { x: AIRPORTS[L.to].name });
    var notes = legNotes(L, prev, !!(prev && C(prev.id).days.some(function (d) { return d.solo; })));
    var long = L.total >= LONG_LEG_H, maps = L.flights ? '' : mapsLink(L.from, L.to);
    return '<div class="leg' + (long ? ' leg-long' : '') + '">' +
      '<div class="leg-head"><span class="leg-day mono">' + T('day') + ' ' + day + '</span>' +
      '<span class="leg-route">' + esc(from) + ' → ' + esc(to) + '</span>' +
      '<span class="leg-total mono">' + approx(L.total) + ' ' + T('door') + '</span></div>' +
      '<ul class="leg-segs">' + L.segs.map(function (g) {
        var text = g.mode === 'fly' ? T('fly') + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name : T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS));
        return '<li>' + ICON[g.mode] + '<span>' + esc(text) + '</span><span class="mono">' + fmtH(g.h) + '</span></li>';
      }).join('') + '</ul>' +
      (notes.length || long || maps ? '<p class="leg-foot">' + (long ? '<span class="flag">' + T('longday') + '</span> ' : '') +
        esc(notes.map(function (k) { return T(k); }).join(' ')) +
        (maps ? ' <a href="' + esc(maps) + '" target="_blank" rel="noopener">' + T('maps') + '</a>' : '') + '</p>' : '') +
      '</div>';
  }
  function mapsLink(a, b) {
    function where(n) { return AIRPORTS[n] ? AIRPORTS[n].maps : C(n).maps; }
    return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(where(a)) + '&destination=' + encodeURIComponent(where(b)) + '&travelmode=driving';
  }

  // the last day: the way to the departure airport and the flight home, without a time
  function homeCard() {
    var r = state.route, d = T('home.d') + (r.home.total >= 2 ? ' ' + T('home.far', { time: approx(r.home.total) }) : '');
    return '<section class="stop stop-compact stop-home" id="stop-home"><header class="stop-head"><span class="stop-num home-num">' + ICON.fly + '</span>' +
      '<div class="stop-title"><p class="eyebrow">' + T('day') + ' ' + r.days + '</p><h3>' + esc(T('home.h3', { airport: AIRPORTS[state.st.to].name })) + '</h3></div></header>' +
      '<ol class="days"><li class="day" id="day-' + r.days + '"><div class="day-n mono">' + T('day') + ' <b>' + r.days + '</b>' +
      (dateLabel(r.days) ? '<span class="day-date">' + esc(dateLabel(r.days)) + '</span>' : '') + '</div><div class="day-body">' +
      '<h4>' + T('home.t') + ' <span class="pace pace-travel">' + T('pace.travel') + '</span></h4><p>' + esc(d) + '</p></div></li></ol></section>';
  }

  /* The stays in order, each after the journey that leads to it; a second stay in the same city (a round trip) without
     its photos and tips, which the first one showed. */
  function renderStops() {
    var r = state.route, html = '';
    r.stops.forEach(function (s, i) {
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; });
      html += legCard(s.leg, s.start, i ? r.stops[i - 1] : null, s.id) +
        '<section class="stop' + (c.photos.length && !again ? '' : ' stop-compact') + '" id="stop-' + (i + 1) + '" data-pin="' + nodeOf(s.id) + '" style="--c:' + stopColor(s.id) + '">' +
        '<header class="stop-head"><span class="stop-num">' + (i + 1) + '</span><div class="stop-title">' +
        '<p class="eyebrow">' + dayRange(s.start, s.end) + ' · ' + s.n + ' ' + countWord('nights', s.n) + ' · ' + T('reg.' + c.region) + '</p>' +
        '<h3>' + esc(c.name) + '</h3><p class="stop-sub">' + esc(c.sub) + '</p></div></header>' +
        (again ? '' : gallery(s.id)) + '<ol class="days">' + state.plans[i].map(dayItem).join('') + '</ol>' + (again ? '' : tips(c)) + '</section>';
    });
    html += legCard(r.home, r.days, r.stops[r.stops.length - 1], null) + homeCard();
    $('#stops').innerHTML = html;
    initGalleries();
    observeStops();
  }

  /* ---------- the plan as text, for WhatsApp ---------- */
  function planText() {
    var r = state.route, st = state.st, lines = [], flights = [];
    lines.push(T('pt.title', { days: r.days, term: termText(st) }));
    lines.push(T('pt.route', { from: AIRPORTS[st.from].name, to: AIRPORTS[st.to].name }));
    lines.push(T('pt.profile', { x: st.interests.length ? st.interests.map(function (k) { return T('int.' + k); }).join(', ') : T('pt.any'), lvl: T('lvl.' + st.level) }));
    lines.push(T('pt.arrive', { airport: AIRPORTS[st.from].name }));
    r.stops.forEach(function (s) { lines.push(dayRange(s.start, s.end) + ': ' + C(s.id).name); });
    lines.push(T('pt.home', { days: r.days, airport: AIRPORTS[st.to].name }));
    r.stops.forEach(function (s) {
      s.leg.segs.forEach(function (g) { if (g.mode === 'fly') flights.push(T('day') + ' ' + s.start + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name); });
    });
    if (flights.length) lines.push(T('pt.flights') + flights.join('; '));
    lines.push(T('pt.link') + SITE_URL + linkHash(state.settings));
    return lines.join('\n');
  }
  function bindCopy() {
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
    });
  }

  // COPY: the block "galleries & lightbox" from the December planner's app.js, with the three changes above

  // COPY: observeStops and tieShortWords from the December planner's app.js, unchanged

  /* ---------- the footer and the texts in the template ---------- */
  function renderCredits() {
    var used = {};
    used[HERO_PHOTO] = true;
    Object.keys(CONTENT).forEach(function (id) { CONTENT[id].photos.forEach(function (ph) { used[ph] = true; }); });
    $('#credits').innerHTML = Object.keys(used).map(function (ph) {
      var m = PHOTO_META[ph];
      return '<li>' + esc(m.cap) + ': ' + esc(m.artist) + ', <a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.license) + '</a></li>';
    }).join('');
  }
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = T('doc.title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = T(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.alt = T(el.getAttribute('data-i18n-alt')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
  }

  /* ---------- wiring ---------- */
  applyStatic();
  buildForm();
  renderCredits();
  bindLightbox();
  bindCopy();
  bindAnchors();
  fromLink();
  /* back-to-top button: shown once the photo opener has scrolled away */
  var totop = $('#totop'), hero = $('.hero');
  if (totop && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { totop.hidden = es[0].isIntersecting; }).observe(hero);
  }
  /* for the probes in tests/probes/ */
  window.__trip = { state: state, apply: apply };
})();
```

- [ ] **Krok 7: Build** — zastąp `site2/build.py`:

```python
"""Build the page: a fragment with separate image files (out/web, for a private artifact), the same page as a full
document for GitHub Pages (out/pages, with the link preview) and one offline file with the images inside (out/offline)."""
import base64, glob, io, json, os, re, shutil
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
PHOTO_DIR = os.path.join(ROOT, "..", "photos")
OUT_WEB = os.path.join(ROOT, "out", "web")
OUT_PAGES = os.path.join(ROOT, "out", "pages")
OUT_OFF = os.path.join(ROOT, "out", "offline")
OFFLINE_NAME = "Wietnam-po-swojemu.html"
# the page's scripts in load order; the photo list (PHOTOS) and app.js come after them
SCRIPTS = (["places.js", "seasons.js", "travel.js", "engine.js", "holidays.js", "content.js"]
           + sorted("content/" + os.path.basename(p) for p in glob.glob(os.path.join(SRC, "content", "*.js")))
           + ["photos.js", "ui.js", "page.js", "basemap.js"])
# Smaller copies for the hosted page (srcset): phones and thumbnails pick these instead of the full photo.
# The offline file keeps one embedded size per photo.
SMALLER = {"photo": (480, 960), "hero": (960, 1400)}

SITE_URL = "https://grzegorzfrskiba-hub.github.io/wietnam/"
# Link preview (WhatsApp and others), only on the public page, whose address it names.
PREVIEW = {
    "title": "Wietnam po swojemu",
    "description": "Ustaw termin, lotniska, to, co lubisz, i poziom przygody, a strona ułoży trasę po Wietnamie: miejsca, plan dni, przejazdy i mapę.",
    "alt": "Kobieta wiosłuje małą łodzią po rzece u stóp wapiennych skał w Tràng An, Ninh Bình",
}
OG_SIZE = (1200, 630)
# tab icon: karst peaks on the page's accent green
ICON = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0c6a5a'/>"
        "<path d='M8 50 15 30 21 38 30 13 39 33 45 24 56 50z' fill='#fff'/></svg>")


def head_extras(preview):
    """Tab icon for every full document; the link preview tags only for the public page."""
    from urllib.parse import quote
    out = '<link rel="icon" href="data:image/svg+xml,%s">\n' % quote(ICON, safe="/:=' ")
    if preview:
        esc = lambda t: t.replace("&", "&amp;").replace('"', "&quot;")
        out += ('<meta name="description" content="%s">\n' % esc(PREVIEW["description"])
                + '<meta property="og:type" content="website">\n<meta property="og:locale" content="pl_PL">\n'
                + '<meta property="og:url" content="%s">\n' % SITE_URL
                + '<meta property="og:title" content="%s">\n' % esc(PREVIEW["title"])
                + '<meta property="og:description" content="%s">\n' % esc(PREVIEW["description"])
                + '<meta property="og:image" content="%simg/og.jpg">\n' % SITE_URL
                + '<meta property="og:image:width" content="%d">\n<meta property="og:image:height" content="%d">\n' % OG_SIZE
                + '<meta property="og:image:alt" content="%s">\n' % esc(PREVIEW["alt"])
                + '<meta name="twitter:card" content="summary_large_image">\n')
    return out


def full_document(fragment, preview=False):
    """The page fragment as a complete HTML document: doctype, charset and viewport, tab icon, no body margin."""
    return ('<!doctype html>\n<html lang="pl">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + head_extras(preview)
            + fragment.replace("<style>", "<style>\nbody { margin: 0; }", 1).replace("</style>", "</style>\n</head>\n<body>", 1)
            + "\n</body>\n</html>\n")


def encode(im, width, quality):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    return im.size, buf.getvalue()


def photo_ids():
    """The photo ids in photos.js (one entry per line, '  id: { cap: …') and the hero photo."""
    text = open(os.path.join(SRC, "photos.js"), encoding="utf-8").read()
    ids = re.findall(r"^  ([a-z]+_\d+): \{", text, re.M)
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert hero in ids, hero
    return ids, hero


def main():
    ids, hero = photo_ids()
    missing = [p for p in ids if not os.path.exists(os.path.join(PHOTO_DIR, p + ".jpg"))]
    assert not missing, "no file in photos/ for %s" % missing
    js = "\n".join(open(os.path.join(SRC, name), encoding="utf-8").read() for name in SCRIPTS)
    app_js = open(os.path.join(SRC, "app.js"), encoding="utf-8").read()
    template = open(os.path.join(SRC, "template.html"), encoding="utf-8").read()

    for out in (OUT_WEB, OUT_PAGES, OUT_OFF):
        shutil.rmtree(out, ignore_errors=True)
        os.makedirs(out)
    os.makedirs(os.path.join(OUT_WEB, "img"))

    web, off = {}, {}
    for pid in ids:
        im = Image.open(os.path.join(PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1920 if pid == hero else 1400, 74)
        open(os.path.join(OUT_WEB, "img", pid + ".jpg"), "wb").write(b)
        web[pid] = dict(src="img/%s.jpg" % pid, w=w, h=h)
        srcset = []
        for sw in SMALLER["hero" if pid == hero else "photo"]:
            if sw < w:
                (vw, _), vb = encode(im, sw, 74)
                open(os.path.join(OUT_WEB, "img", "%s-%d.jpg" % (pid, vw)), "wb").write(vb)
                srcset.append("img/%s-%d.jpg %dw" % (pid, vw, vw))
        if srcset:
            web[pid]["srcset"] = ", ".join(srcset + ["img/%s.jpg %dw" % (pid, w)])
        (w, h), b = encode(im, 1600 if pid == hero else 1200, 68)
        off[pid] = dict(src="data:image/jpeg;base64," + base64.b64encode(b).decode(), w=w, h=h)
        if pid == hero:
            # link preview image: the hero cut to 1200 x 630, kept low so the rower stays in the picture
            ow, oh = OG_SIZE
            k = max(ow / im.width, oh / im.height)
            big = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
            top = round((big.height - oh) * 0.95)
            left = (big.width - ow) // 2
            big.crop((left, top, left + ow, top + oh)).save(os.path.join(OUT_WEB, "img", "og.jpg"), "JPEG", quality=78, optimize=True, progressive=True)

    def page(photos):
        script = js + "\nvar PHOTOS = " + json.dumps(photos, ensure_ascii=False) + ";\n" + app_js
        script = script.replace("</script", "<\\/script")
        top = photos[hero]
        # the hero is cropped to cover a box about 2x as wide as a phone screen (clamped height, 3:2 photo)
        top_set = ' srcset="%s" sizes="(max-width: 700px) 200vw, 100vw"' % top["srcset"] if "srcset" in top else ""
        return (template.replace("__HERO_SRC__", top["src"]).replace(" __HERO_SRCSET__", top_set).replace("__HERO_W__", str(top["w"]))
                .replace("__HERO_H__", str(top["h"])).replace("__SCRIPT__", script))

    web_page = page(web)
    open(os.path.join(OUT_WEB, "index.html"), "w", encoding="utf-8").write(web_page)
    # GitHub Pages serves files as they are, so it gets the full document and its own copy of the images
    open(os.path.join(OUT_PAGES, "index.html"), "w", encoding="utf-8").write(full_document(web_page, preview=True))
    shutil.copytree(os.path.join(OUT_WEB, "img"), os.path.join(OUT_PAGES, "img"))
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off)))

    size = lambda p: os.path.getsize(p) / 1e6
    img_total = sum(size(os.path.join(OUT_WEB, "img", f)) for f in os.listdir(os.path.join(OUT_WEB, "img")))
    print("web page %.2f MB + %d images %.1f MB" % (size(os.path.join(OUT_WEB, "index.html")), len(web), img_total))
    print("pages page %.2f MB + copy of the images" % size(os.path.join(OUT_PAGES, "index.html")))
    print("offline file %.1f MB" % size(os.path.join(OUT_OFF, OFFLINE_NAME)))


if __name__ == "__main__":
    main()
```

- [ ] **Krok 8: Skrypty zrzutów i sonda linku.**
  - W `tests/shot.sh` zmień dwie pierwsze linie komentarza na:

```bash
# Usage: tests/shot.sh <settings> <width> <out.png>   e.g. tests/shot.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' 390 /tmp/a.png
# <settings>: the part of a settings link after # (an empty string opens the defaults).
```

  - W `tests/probe.sh` zmień przykład w linii z `e.g.`:

```bash
#   e.g. tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3' 2
```

  - W `tests/print.sh` zmień linię użycia:

```bash
# Usage: tests/print.sh <settings> <out.pdf> [dark]   e.g. tests/print.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' /tmp/a.pdf
```

  - Utwórz `tests/probes/link.js`:

```js
// What a settings link opens and what the copied plan links to.
// tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3'
setTimeout(function () {
  var q = function (s) { var e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : '-'; };
  console.log('P:hash ' + location.hash);
  console.log('P:' + q('#facts-for') + ' · stays ' + document.querySelectorAll('#stops .stop:not(.stop-home)').length + ' · days in the strip ' + document.querySelectorAll('#strip .cell').length);
  console.log('P:alerts ' + q('#alerts') + ' · message ' + q('#settings-msg'));
  try { navigator.clipboard.writeText = function (t) { console.log('P:copied link line: ' + t.split('\n').pop()); return Promise.resolve(); }; } catch (e) { /* read the fallback box below */ }
  document.getElementById('copy-plan').click();
  setTimeout(function () { var b = document.getElementById('copy-fallback'); if (!b.hidden) console.log('P:copied link line: ' + b.value.split('\n').pop()); }, 300);
}, 1500);
```

- [ ] **Krok 9: Lintery** — w `tests/run.sh` zastąp ostatnią linię `echo "ALL PASS"`:

```bash
echo "== lint: no words in CSS content (texts come from UI.pl)"
if grep -nE "content: *\"[^\"]*[A-Za-z]{3,}" site2/src/template.html; then echo "FAIL: put the text in UI.pl" >&2; exit 1; fi
echo "== lint: counted words only through countWord(key, n)"
if grep -nE "T\('(nights|f\.places|f\.flights|f\.hikes)\.(one|few|many)'" site2/src/app.js; then echo "FAIL: use countWord(key, n)" >&2; exit 1; fi
echo "ALL PASS"
```

- [ ] **Krok 10: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ui ok`, oba lintery bez uwag, na końcu `ALL PASS`

- [ ] **Krok 11: Build, sonda i zrzuty**

```bash
python3 site2/build.py
head -c 200 site2/out/pages/index.html          # zaczyna się od <!doctype html> i ma <meta name="viewport"
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3'
mkdir -p "$TMPDIR/wietnam"
bash tests/shot.sh 'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3' 390 "$TMPDIR/wietnam/t9-390.png"
bash tests/shot.sh 'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3' 1400 "$TMPDIR/wietnam/t9-1400.png"
```

Oczekiwane:
- build wypisuje trzy rozmiary bez błędów;
- sonda wypisuje:
  - `P:hash #od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3`;
  - `P:Twoja trasa: Hà Nội → Đà Nẵng, marzec 2027 · stays …`, z liczbą dni w pasku 12;
  - `P:alerts …` (pusto albo Święto Królów Hùng, jeśli wypada w marcu) i pusty komunikat;
  - `P:copied link line: Ten plan na stronie: https://grzegorzfrskiba-hub.github.io/wietnam/#od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3`.

Obejrzyj oba zrzuty (Read na pliku PNG):
- ustawienia z wybranym marcem 2027, 12 dniami i kulturą;
- liczby trasy;
- pasek 12 dni;
- pobyty z galeriami, dniami i przejazdami (ostatni z wylotem z Đà Nẵng);
- stopka z „©”;
- bez angielskich tekstów i bez pustych miejsc po usuniętych sekcjach. Kolumna mapy jest jeszcze pusta.

- [ ] **Krok 12: Commit**

```bash
git add site2/src/template.html site2/src/basemap.js site2/src/ui.js site2/src/app.js site2/build.py tests/shot.sh tests/probe.sh tests/print.sh tests/probes/link.js tests/content.test.js tests/run.sh
git commit -F - <<'EOF'
Strona: szablon po polsku, teksty interfejsu, ustawienia w adresie, trasa z planami dni i przejazdami, build i sonda linku

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 10: Mapa, „Dodaj” i „Usuń”

**Pliki:**
- Zmień: `site2/src/app.js`, `site2/src/template.html`, `site2/src/ui.js`
- Utwórz: `tests/probes/anchors.js`, `tests/probes/changes.js`

**Interfejsy:**
- Korzysta z: `app.js` z zadania 9, `offRoute`, `withAdded`, `withRemoved`, `withoutChanges` (zadanie 6), `BASEMAP` (`basemap.js`).
- Daje:
  - mapę trasy w dwóch kadrach pierwowzoru, z powiększeniem na dużym ekranie;
  - przycisk „Usuń” przy każdym pobycie (bez nocy w Hà Nội w drodze) i znaczek „Dodane”;
  - listę „Poza trasą” z „Dodaj” i przycisk „Wróć do trasy bez zmian”.

- [ ] **Krok 1: Sondy, które nie przechodzą.**
  - Utwórz `tests/probes/anchors.js`:

```js
// Links inside the page keep the settings in the address: a day in the strip, the menu.
// tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
// The page scrolls smoothly (CSS scroll-behavior), which headless Chrome does not finish: the probe turns it off first.
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var before = location.hash;
  document.querySelector('#strip a.cell').click();
  document.querySelector('.secnav a[href="#days"]').click();
  setTimeout(function () {
    console.log('P:hash kept ' + (location.hash === before) + ' · scrolled ' + (window.scrollY > 0) + ' · map pins ' + document.querySelectorAll('#map .pin').length);
  }, 1500);
}, 1500);
```

  - Utwórz `tests/probes/changes.js`:

```js
// Dodaj, Usuń, back to the trip without changes, and settings that give no trip or no valid term.
// tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
setTimeout(function () {
  var q = function (s) { var e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : '-'; };
  var ids = function () { return Array.prototype.map.call(document.querySelectorAll('#stops .stop[data-pin]'), function (s) { return s.getAttribute('data-pin'); }).join(','); };
  console.log('P:start ' + ids());
  document.querySelector('[data-add="phuquoc"]').click();
  console.log('P:after Dodaj phuquoc: ' + ids() + ' · ' + location.hash + ' · missing: ' + q('#missing'));
  document.querySelector('[data-remove="phuquoc"]').click();
  console.log('P:after Usuń phuquoc: ' + ids() + ' · ' + location.hash);
  document.getElementById('reset-changes').click();
  console.log('P:after the reset: ' + location.hash);
  var t = window.__trip, s = JSON.parse(JSON.stringify(t.state.settings));
  s.remove = ['saigon', 'mekong', 'cattien'];
  console.log('P:every place near SGN removed → ' + t.apply(s) + ' · message: ' + q('#settings-msg') + ' · stays shown: ' + document.querySelectorAll('#stops .stop').length);
  var f = document.getElementById('settings-form');
  f.querySelector('input[name=mode][value=dates]').click();
  console.log('P:dates mode: ' + location.hash);
  f.end.value = '2026-01-01';
  f.end.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('P:end before start → message: ' + q('#settings-msg') + ' · address still: ' + location.hash);
}, 1500);
```

Zbuduj stronę i uruchom obie sondy:

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
```

Oczekiwane:
- `anchors.js`: `P:hash kept true · scrolled true · map pins 0`, bo mapy jeszcze nie ma;
- `changes.js`: tylko `P:start …`, bo nie ma jeszcze przycisku „Dodaj”, więc sonda zatrzymuje się na błędzie.

- [ ] **Krok 2: Teksty** — w `site2/src/ui.js`, po linii z `'lb.aria'`, dopisz:

```js
  'm.north': 'Północ', 'm.whole': 'Cała trasa', 'm.panel': 'Mapa północy', 'm.china': 'Chiny', 'm.laos': 'Laos', 'm.cambodia': 'Kambodża',
  'm.sea': 'Morze Południowochińskie', 'm.tonkin': 'Zatoka Tonkińska', 'm.road': 'Droga', 'm.flight': 'Lot', 'm.airports': 'Lotnisko przylotu i wylotu',
  'm.scale': 'Obie mapy w skali', 'm.zoom': 'Kliknij mapę, żeby ją powiększyć', 'm.close': 'Zamknij dużą mapę', 'm.dialog': 'Mapa trasy, powiększona', 'm.title': 'Mapa trasy: ',
  'off.h3': 'Poza trasą', 'off.p': 'Dodaj miejsce, a trasa ułoży się na nowo razem z nim. Usunięte miejsca też tu są.',
  'off.add': 'Dodaj', 'off.add.aria': 'Dodaj {x} do trasy', 'off.removed': 'usunięte', 'off.missing': 'nie zmieściło się', 'off.reset': 'Wróć do trasy bez zmian',
  'stop.remove': 'Usuń', 'stop.remove.aria': 'Usuń {x} z trasy', 'tag.added': 'Dodane',
```

- [ ] **Krok 3: Szablon.**
  - W `site2/src/template.html`, po `<p class="missing" id="missing" role="status"></p>`, wstaw:

```html
    <div class="offroute">
      <h3 class="h-sub" data-i18n="off.h3"></h3>
      <p class="off-p" data-i18n="off.p"></p>
      <ul class="off-list" id="offroute-list"></ul>
      <button type="button" class="btn-ghost" id="reset-changes" data-i18n="off.reset" hidden></button>
    </div>
```

  - Przed `<div class="lightbox"` wstaw:

```html
<div class="mapzoom" id="mapzoom" role="dialog" aria-modal="true" data-i18n-aria="m.dialog" hidden><button type="button" class="mz-close" id="mz-close"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg><span data-i18n="m.close"></span></button></div>
```

  - W CSS przed `/* Strip */` dopisz poniższe reguły. W `@media print` dopisz `.offroute, .stop-remove` do listy `display: none`.

```css
/* Changes to the trip: Dodaj, Usuń */
.offroute { margin-top: 22px; display: grid; gap: 8px; justify-items: start; }
.off-p { color: var(--muted); font-size: 14px; max-width: 64ch; }
.off-list { display: flex; flex-wrap: wrap; gap: 8px; }
.off-list li { display: inline-flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 4px 4px 4px 12px; font-size: 14px; }
.off-tag { font: 11px var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; padding-right: 8px; }
.btn-small { font: 500 13px var(--body); color: var(--accent); background: var(--accent-soft); border: 0; border-radius: 999px; padding: 6px 12px; min-height: 40px; cursor: pointer; }
.btn-ghost { font: 500 14px var(--body); color: var(--accent); background: none; border: 1px solid var(--accent); border-radius: 6px; padding: 8px 14px; min-height: 44px; cursor: pointer; }
.stop-remove { margin-left: auto; font: 500 13px var(--body); color: var(--muted); background: none; border: 1px solid var(--line); border-radius: 6px; padding: 6px 12px; min-height: 40px; cursor: pointer; }
.stop-remove:hover { color: var(--wet); border-color: var(--wet); }
.tag-added { margin-top: 8px; font: 500 11px var(--mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); background: var(--accent-soft); padding: 2px 8px; border-radius: 4px; }
```

- [ ] **Krok 4: Mapa, „Dodaj” i „Usuń” w `app.js`.**
  - W funkcji `render()` po linii `renderShape();` dopisz `renderOffRoute();` i `renderMap();`.
  - W `renderStops` zamień `'</p></div></header>' +` (koniec nagłówka pobytu) na `'</p></div>' + stopTools(s) + '</header>' +`.
  - Przed blokiem `/* ---------- the plan as text, for WhatsApp ---------- */` wstaw poniższy kod. Funkcję `curve` i blok powiększania mapy (`/* ---------- map zoom (desktop) …` do końca `bindMapZoom`) skopiuj bez zmian z `$P/site2/src/app.js` w miejsca oznaczone `COPY`, a komentarze `COPY` usuń.
  - W sekcji `wiring` po `bindAnchors();` dopisz `bindMapZoom();` i `bindChanges();`.

```js
  /* ---------- the map: the North panel above the whole country, as in the December planner (stage 2 draws new panels) ---------- */
  var NF = { lon0: 104.85, lat0: 23.05, s: 104, x: 0, y: 0, w: 270, h: 322 };
  var CF = { lon0: 103.6, lat0: 23.4, s: 22, x: 0, y: 352, w: 270, h: 322 };
  // label offsets [dx, dy, anchor]: the places of the North panel, then the places labelled on the whole-country panel
  var NLAB = { hanoi: [-14, 4, 'end'], ninhbinh: [14, 4, 'start'], puluong: [0, 26, 'middle'], catba: [0, 26, 'middle'], caobang: [14, 4, 'start'], babe: [-14, 4, 'end'] };
  var CLAB = { saigon: [10, 18, 'start'], dalat: [10, 4, 'start'], cattien: [10, 15, 'start'], mekong: [8, 17, 'start'], phuquoc: [-4, 19, 'start'],
    hoian: [10, 10, 'start'], hue: [-10, -6, 'end'] };
  var BANGIOC = [22.85, 106.72];
  /* place names on the basemap: [UI key, lat, lon, class, anchor] */
  var GEO = {
    north: [['m.china', 22.25, 107.25, 'm-country', 'middle'], ['m.tonkin', 20.12, 107.0, 'm-water', 'middle']],
    whole: [['m.china', 21.9, 111.6, 'm-country', 'middle'], ['m.laos', 17.6, 103.9, 'm-country', 'start'],
      ['m.cambodia', 12.9, 103.9, 'm-country', 'start'], ['m.sea', 14.6, 112.4, 'm-water', 'middle']]
  };
  function basemap(key) {
    var b = BASEMAP[key];
    return '<path class="m-land-o" d="' + b.other + '"/><path class="m-land" d="' + b.vn + '"/><path class="m-river" d="' + b.rivers + '"/>';
  }
  function geoLabels(key, f) {
    return GEO[key].map(function (g) {
      var p = proj(f, [g[1], g[2]]);
      return '<text class="' + g[3] + '" x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" text-anchor="' + g[4] + '">' + T(g[0]) + '</text>';
    }).join('');
  }
  function proj(f, p) { return [f.x + (p[1] - f.lon0) * f.s, f.y + (f.lat0 - p[0]) * f.s]; }
  // COPY: function curve(a, b) from the December planner's app.js, unchanged
  // a point of the travel data on the map: an airport or a place
  function where(n) { return AIRPORTS[n] ? AIRPORTS[n].pt : C(n).pt; }

  function renderMap() {
    var route = state.route, st = state.st, n = [], c = [], groups = {};
    var r = function (v) { return v.toFixed(1); };
    route.stops.forEach(function (s, i) {
      var key = nodeOf(s.id);
      (groups[key] = groups[key] || []).push({ num: i + 1, start: s.start, end: s.end });
    });
    var legs = route.stops.map(function (s) { return s.leg; }).concat([route.home]);
    var ends = st.from === st.to ? [st.from] : [st.from, st.to];
    function seg(f, g, cls) {
      var a = proj(f, where(g.from)), b = proj(f, where(g.to));
      if (g.mode === 'fly') return '<path class="m-fly ' + cls + '" d="' + curve(a, b) + '"/>';
      return '<line class="m-road ' + cls + '" x1="' + r(a[0]) + '" y1="' + r(a[1]) + '" x2="' + r(b[0]) + '" y2="' + r(b[1]) + '"/>';
    }
    function subsFor(key) {
      var parts = groups[key].map(function (v) { return v.start === v.end ? '' + v.start : v.start + '–' + v.end; });
      return (parts.length > 1 || parts[0].indexOf('–') > -1 ? T('days') : T('day')) + ' ' + parts.join(', ');
    }
    function pill(p, key, big) {
      var nums = groups[key].map(function (v) { return v.num; }).join('·');
      var h = big ? 20 : 15, w = Math.max(h, (big ? 10 : 8) + nums.length * (big ? 6.5 : 5));
      return '<rect x="' + r(p[0] - w / 2) + '" y="' + r(p[1] - h / 2) + '" width="' + r(w) + '" height="' + h + '" rx="' + h / 2 + '"/>' +
        '<text class="pin-num' + (big ? '' : ' pin-num-s') + '" x="' + r(p[0]) + '" y="' + r(p[1] + (big ? 4 : 3.2)) + '" text-anchor="middle">' + nums + '</text>';
    }
    function airportBox(f, code) {
      var p = proj(f, AIRPORTS[code].pt);
      return '<rect class="m-startbox" x="' + r(p[0] - 5) + '" y="' + r(p[1] - 5) + '" width="10" height="10" rx="2"/>';
    }
    function inside(f, code) {
      var p = proj(f, AIRPORTS[code].pt);
      return p[0] >= f.x && p[0] <= f.x + f.w && p[1] >= f.y && p[1] <= f.y + f.h;
    }

    /* the North panel */
    n.push('<rect class="m-frame" x="0" y="0" width="' + NF.w + '" height="' + NF.h + '" rx="8"/>' + basemap('north') + geoLabels('north', NF));
    [21, 22].forEach(function (lat) {
      var y = r((NF.lat0 - lat) * NF.s);
      n.push('<line class="m-grid" x1="0" x2="' + NF.w + '" y1="' + y + '" y2="' + y + '"/><text class="m-gridlabel" x="' + (NF.w - 6) + '" y="' + (y - 4) + '" text-anchor="end">' + lat + '°N</text>');
    });
    [105, 106, 107].forEach(function (lon) {
      var x = r((lon - NF.lon0) * NF.s);
      n.push('<line class="m-grid m-grid-v" x1="' + x + '" x2="' + x + '" y1="0" y2="' + NF.h + '"/>');
    });
    Object.keys(NLAB).forEach(function (id) {
      if (groups[id]) return;
      var p = proj(NF, C(id).pt);
      n.push('<circle class="m-faint" cx="' + r(p[0]) + '" cy="' + r(p[1]) + '" r="4"/>');
    });
    legs.forEach(function (L) { L.segs.forEach(function (g) { n.push(seg(NF, g, '')); }); });
    ends.forEach(function (code) { if (inside(NF, code)) n.push(airportBox(NF, code)); });
    if (groups.caobang) {
      var cb = proj(NF, C('caobang').pt), bg = proj(NF, BANGIOC);
      n.push('<line class="m-road m-local" x1="' + r(cb[0]) + '" y1="' + r(cb[1]) + '" x2="' + r(bg[0]) + '" y2="' + r(bg[1]) + '"/>' +
        '<circle class="m-poi" cx="' + r(bg[0]) + '" cy="' + r(bg[1]) + '" r="4"/>' +
        '<text class="m-sub" x="' + r(bg[0] + 8) + '" y="' + r(bg[1] - 6) + '">Bản Giốc</text>');
    }
    Object.keys(groups).forEach(function (key) {
      if (!NLAB[key]) return;
      var p = proj(NF, C(key).pt), L = NLAB[key];
      n.push('<g class="pin" data-pin="' + key + '" style="--c:' + stopColor(key) + '">' + pill(p, key, true) +
        '<text class="m-label" x="' + r(p[0] + L[0]) + '" y="' + r(p[1] + L[1]) + '" text-anchor="' + L[2] + '">' + esc(C(key).short) + '</text>' +
        '<text class="m-sub" x="' + r(p[0] + L[0]) + '" y="' + r(p[1] + L[1] + 12) + '" text-anchor="' + L[2] + '">' + subsFor(key) + '</text></g>');
    });
    n.push('<text class="m-title" x="10" y="18">' + T('m.north') + '</text>');

    /* the whole-country panel */
    c.push('<rect class="m-frame" x="0" y="' + CF.y + '" width="' + CF.w + '" height="' + CF.h + '" rx="8"/>' +
      '<g clip-path="url(#clip-whole)">' + basemap('whole') + '</g>' + geoLabels('whole', CF));
    [10, 15, 20].forEach(function (lat) {
      var y = r(CF.y + (CF.lat0 - lat) * CF.s);
      c.push('<line class="m-grid" x1="0" x2="' + CF.w + '" y1="' + y + '" y2="' + y + '"/><text class="m-gridlabel" x="' + (CF.w - 6) + '" y="' + (y - 4) + '" text-anchor="end">' + lat + '°N</text>');
    });
    var i0 = proj(CF, [NF.lat0, NF.lon0]), i1 = proj(CF, [NF.lat0 - NF.h / NF.s, NF.lon0 + NF.w / NF.s]);
    c.push('<rect class="m-inset" x="' + r(i0[0]) + '" y="' + r(i0[1]) + '" width="' + r(i1[0] - i0[0]) + '" height="' + r(i1[1] - i0[1]) + '"/>' +
      '<text class="m-sub" x="' + r(i1[0] + 6) + '" y="' + r(i0[1] + 12) + '">' + T('m.panel') + '</text>');
    Object.keys(CLAB).forEach(function (id) {
      if (groups[id]) return;
      var p = proj(CF, C(id).pt);
      c.push('<circle class="m-faint" cx="' + r(p[0]) + '" cy="' + r(p[1]) + '" r="3"/>');
    });
    legs.forEach(function (L) { L.segs.forEach(function (g) { c.push(seg(CF, g, 'm-thin')); }); });
    ends.forEach(function (code) { c.push(airportBox(CF, code)); });
    var lab = Object.assign({}, CLAB);
    if (groups.phuquoc) lab.saigon = [10, -9, 'start'];   // with Phú Quốc on the trip, Hồ Chí Minh City's label goes above it
    Object.keys(groups).forEach(function (key) {
      var p = proj(CF, C(key).pt), L = lab[key];
      if (NLAB[key]) { c.push('<circle class="m-dot" cx="' + r(p[0]) + '" cy="' + r(p[1]) + '" r="2.6" style="--c:' + stopColor(key) + '"/>'); return; }
      c.push('<g class="pin" data-pin="' + key + '" style="--c:' + stopColor(key) + '">' + pill(p, key, false) +
        '<text class="m-label m-label-s" x="' + r(p[0] + L[0]) + '" y="' + r(p[1] + L[1]) + '" text-anchor="' + L[2] + '">' + esc(C(key).short) +
        ' <tspan class="m-sub">' + subsFor(key) + '</tspan></text></g>');
    });
    c.push('<text class="m-title" x="' + (CF.w - 10) + '" y="' + (CF.y + 18) + '" text-anchor="end">' + T('m.whole') + '</text>');

    $('#map').innerHTML = '<svg viewBox="-6 -6 282 686" role="img" aria-labelledby="map-title"><title id="map-title">' + T('m.title') +
      esc(route.stops.map(function (s) { return C(s.id).short; }).join(', ')) + '</title>' +
      '<defs><clipPath id="clip-north"><rect x="0" y="0" width="' + NF.w + '" height="' + NF.h + '" rx="8"/></clipPath>' +
      '<clipPath id="clip-whole"><rect x="0" y="' + CF.y + '" width="' + CF.w + '" height="' + CF.h + '" rx="8"/></clipPath></defs>' +
      '<g clip-path="url(#clip-north)">' + n.join('') + '</g>' + c.join('') +
      '<rect class="m-edge" x="0" y="0" width="' + NF.w + '" height="' + NF.h + '" rx="8"/>' +
      '<rect class="m-edge" x="0" y="' + CF.y + '" width="' + CF.w + '" height="' + CF.h + '" rx="8"/></svg>' +
      '<p class="map-legend"><span><svg width="24" height="6" aria-hidden="true"><line class="m-road" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.road') + '</span>' +
      '<span><svg width="24" height="6" aria-hidden="true"><line class="m-fly" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.flight') + '</span>' +
      '<span><svg width="10" height="10" aria-hidden="true"><rect class="m-startbox" x="0" y="0" width="10" height="10" rx="2"/></svg>' + T('m.airports') + '</span>' +
      '<span class="map-note">' + T('m.scale') + '</span><button type="button" class="map-hint">' + T('m.zoom') + '</button></p>';
  }

  // COPY: the block "map zoom (desktop)" from the December planner's app.js (MZ_MS … bindMapZoom), unchanged

  /* ---------- Dodaj and Usuń ---------- */
  // the Usuń button of a stay and "Dodane" when Dodaj put it there; a night on the way has neither
  function stopTools(s) {
    if (PLACES[s.id].node) return '';
    return (state.st.add.indexOf(s.id) > -1 ? '<span class="tag-added">' + T('tag.added') + '</span>' : '') +
      '<button type="button" class="stop-remove" data-remove="' + s.id + '" aria-label="' + esc(T('stop.remove.aria', { x: C(s.id).short })) + '">' + T('stop.remove') + '</button>';
  }
  // the places off the trip, each with Dodaj, unless Dodaj already asked for it and it did not fit
  function renderOffRoute() {
    var s = state.settings;
    $('#offroute-list').innerHTML = offRoute(state.route, state.st, PLACES).map(function (x) {
      var c = C(x.id);
      return '<li><span class="dot" style="--c:' + stopColor(x.id) + '"></span><span>' + esc(c.short) + '</span>' +
        (x.removed ? '<span class="off-tag">' + T('off.removed') + '</span>' : '') +
        (x.added ? '<span class="off-tag">' + T('off.missing') + '</span>'
          : '<button type="button" class="btn-small" data-add="' + x.id + '" aria-label="' + esc(T('off.add.aria', { x: c.short })) + '">' + T('off.add') + '</button>') + '</li>';
    }).join('');
    $('#reset-changes').hidden = !(s.add.length || s.remove.length);
  }
  function bindChanges() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-add], [data-remove], #reset-changes') : null;
      if (!b) return;
      var s = b.id === 'reset-changes' ? withoutChanges(state.settings)
        : b.hasAttribute('data-add') ? withAdded(state.settings, b.getAttribute('data-add'))
        : withRemoved(state.settings, b.getAttribute('data-remove'));
      if (apply(s)) {
        syncForm();
        $('#shape-h2').focus({ preventScroll: true });   // the button is gone with the old trip; the trip's heading takes the focus
      }
    });
  }
```

- [ ] **Krok 5: Uruchom testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
bash tests/shot.sh 'od=SGN&do=HAN&miesiac=2027-12&dni=21&co=gory&poziom=2&dodaj=phuquoc&usun=hoian' 1400 "$TMPDIR/wietnam/t10-1400.png"
```

Oczekiwane:
- testy: `ui ok`, `ALL PASS`;
- `anchors.js`: `P:hash kept true · scrolled true · map pins …` (liczba większa od zera);
- `changes.js`:
  - po „Dodaj” `phuquoc` jest wśród pobytów, a adres ma `dodaj=phuquoc` (albo „Nie zmieściło się: Phú Quốc”);
  - po „Usuń” `phuquoc` znika, a adres ma `usun=phuquoc`;
  - po „Wróć…” adres nie ma `dodaj` ani `usun`;
  - przy usuniętych miejscach koło SGN: `false`, komunikat „Przy tych ustawieniach nie da się ułożyć trasy… Poniżej zostaje ostatnia trasa.” i pobyty dalej na stronie;
  - w trybie dat adres ma `start=` i `koniec=`;
  - przy wylocie przed przylotem: komunikat „Wyjazd trwa od 5 do 30 dni…”, a adres bez zmian, nadal ze `start=`.

Na zrzucie z `t10-1400.png` sprawdź:
- mapa obok pobytów pokazuje linie dróg i lotów, kwadraty lotnisk SGN i HAN, numery pobytów oraz szare kropki miejsc poza trasą;
- Phú Quốc jest na trasie albo w komunikacie „Nie zmieściło się”;
- Hội An jest na liście „Poza trasą” z dopiskiem „usunięte”.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/app.js site2/src/template.html site2/src/ui.js tests/probes/anchors.js tests/probes/changes.js
git commit -F - <<'EOF'
Strona: mapa trasy (dwa kadry pierwowzoru, lotniska przylotu i wylotu), Dodaj i Usuń, lista „Poza trasą”, sondy odnośników i zmian

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 11: Punkt kontrolny etapu 1

**Pliki:** bez zmian w repo, jeśli przegląd niczego nie wykaże. Zrzuty i PDF idą do `$TMPDIR/wietnam/`.

- [ ] **Krok 1: Pełny test i build**

```bash
time bash tests/run.sh --full
python3 site2/build.py
```

Oczekiwane: `combos: 134784 (all)`, `ALL PASS` w mniej niż minutę; build bez błędów.

- [ ] **Krok 2: Sondy z zadań 9 i 10** (polecenia jak tam). Oczekiwane wyniki jak tam.

- [ ] **Krok 3: Zrzuty pięciu ustawień** na szerokości 390 i 1400 px:

```bash
mkdir -p "$TMPDIR/wietnam"
i=0
for s in \
  'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' \
  'od=HAN&do=HAN&miesiac=2027-10&dni=10&co=przyroda&poziom=3' \
  'od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1' \
  'od=SGN&do=HAN&miesiac=2027-12&dni=21&co=gory&poziom=2&dodaj=phuquoc&usun=hoian' \
  'od=HAN&do=DAD&miesiac=2027-05&dni=5&co=morze&poziom=2'; do
  i=$((i+1))
  for w in 390 1400; do bash tests/shot.sh "$s" "$w" "$TMPDIR/wietnam/u$i-$w.png"; done
done
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' "$TMPDIR/wietnam/u1.pdf"
```

Obejrzyj każdy zrzut i sprawdź:
- **u1** (klasyka, marzec): trasa z południa na północ i sensowne noce;
- **u2** (Hà Nội tam i z powrotem, przyroda, poziom 3): drugi pobyt w Hà Nội zaczyna się od „Powrót do Hà Nội”, bez drugiej galerii; trudne dni ze znaczkiem „Trudny dzień”;
- **u3** (daty z Tết, kultura i jedzenie, poziom 1): ostrzeżenie o Tết, daty przy dniach, znaczki „Wersja spokojna”, żadnej „Aktywnej wędrówki”;
- **u4** („Dodaj” i „Usuń”): jak w zadaniu 10;
- **u5** (5 dni, maj): ostrzeżenie o 30.04–1.05 i trasa na 4 noce.

Do tego na wszystkich zrzutach: teksty po polsku i per „ty”, bez „w grudniu”; mapa czytelna (etykiety Hội An i Huế nie nachodzą na siebie); stopka z „©”. W PDF-ie liczba stron jest rozsądna i nie ma prawie pustych stron w środku.

- [ ] **Krok 4: Pokaż użytkownikowi.**
  - Wyślij zrzuty z telefonu (`u1-390.png`–`u5-390.png`) i dwa z komputera.
  - Podaj polecenie, które otwiera stronę lokalnie w Chrome z danym ustawieniem:

```bash
open -a "Google Chrome" "file://$PWD/site2/out/pages/index.html#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2"
```

  - Zapytaj o werdykt w duchu punktu kontrolnego etapu 1: czy trasy są sensowne i co poprawić teraz, a co w etapie 2.
  - Publikacja prywatnego artifactu do sprawdzenia na telefonie odbywa się tylko po wyraźnym „tak” użytkownika: publish z `file_path = site2/out/web/index.html` i `files` = obrazy z `site2/out/web/img/`.
  - Poprawki z przeglądu dochodzą jako osobne commity z testem, jeśli to możliwe.

---

### Zadanie 12: Notatki po przeglądzie

**Pliki:**
- Zmień: `notes/etapy.md`, `CLAUDE.md`

- [ ] **Krok 1: `notes/etapy.md`**
  - W tabeli przy etapie 1 wpisz „zrobione RRRR-MM-DD: 1A (silnik) 10.10.2026, 1B (strona) RRRR-MM-DD”.
  - Sekcję „Następny krok” zastąp sekcją o etapie 2 (interfejs). Wymień w niej decyzje z punktu kontrolnego i rzeczy przeniesione z 1B:
    - pogoda dla dni trasy;
    - budżet w zł. Koszty dni (`pp`) i `COSTS` są w pierwowzorze w `data.js`, a źródła w `research/budget-2026-10.md`;
    - „Nie ma na twojej trasie, bo…” w miejsce grudniowego „Celowo pominięte”;
    - „Wybrane, bo…”;
    - „Przed wyjazdem”;
    - właściwe ustawienia na pierwsze wejście;
    - nowe kadry mapy ze skryptem `geo/make_basemap.py` i paletą kolorów dla nowych miejsc. Thọ Xuân leży tuż pod kadrem północy;
    - wydarzenia przypięte do miesięcy (złote tarasy);
    - plan na deszcz zależny od miesiąca;
    - uwagi o wyglądzie z zrzutów.
  - Do etapu 3 dopisz:
    - nowe miejsca dostają trudne dni według zasad z `research/trudne-dni-2026-10.md`;
    - etykiety mapy (`NLAB`, `CLAB` w `app.js`) i kolory w szablonie.
  - Do audytu w etapie 4 dopisz:
    - źródła faktów w planach dni przeniesionych z pierwowzoru (audyt pierwowzoru z 9.10.2026) trzeba przenieść do `research/`;
    - przy publikacji sprawdzić licencje nowych zdjęć.
- [ ] **Krok 2: `CLAUDE.md`**
  - W statusie wpisz „plan 1B (strona) zrobiony, etap 1 zamknięty; następny krok: etap 2 (interfejs)”.
  - W „Jak sprawdzać” dopisz:

```markdown
- `python3 site2/build.py` → `site2/out/web` (fragment do artifactu), `site2/out/pages` (GitHub Pages), `site2/out/offline/Wietnam-po-swojemu.html`.
- `bash tests/shot.sh '<ustawienia z linku>' <szerokość> <plik.png>`: zrzut zbudowanej strony; `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`.
- Pułapki: wbudowana przeglądarka nie otwiera `file://`; w nowym worktree podlinkuj `photos/` z głównej kopii.
```

- [ ] **Krok 3: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`

- [ ] **Krok 4: Commit**

```bash
git add notes/etapy.md CLAUDE.md
git commit -F - <<'EOF'
Notatki: plan 1B (strona) zrobiony, etap 1 zamknięty, następny krok etap 2

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` (co 7. kombinacja); `bash tests/run.sh --full` → wszystkie kombinacje, ok. pół minuty.
- `python3 site2/build.py`, potem:
  - `bash tests/shot.sh '<ustawienia>' 390 plik.png`: zrzut na szerokości telefonu;
  - `bash tests/probe.sh tests/probes/<sonda>.js 1400 '<ustawienia>'`: sondy.
- Punkt kontrolny etapu 1: zadanie 11.
