# Etap 2A: interfejs na telefonie, powody, pogoda i mapa — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** pierwsza część etapu 2: strona wygodna na telefonie, która tłumaczy swoją trasę.
- Formularz stoi na górze, liczby trasy tuż pod nim, a u góry ekranu pasek z podsumowaniem i „Zmień”. Bez linku strona bierze najlepszy miesiąc w roku.
- Przy każdym miejscu jest „Wybrane, bo…”, pogoda w miesiącu pobytu i wydarzenia. Pod trasą stoi „Nie ma na twojej trasie, bo…”, a przy „Dodaj” informacja, co wypadnie.
- Mapa ma trzy kadry (północ, środek, południe). Etykiety nie nachodzą na siebie, a paleta kolorów jest gotowa na nowe miejsca.
- Do tego krój IBM Plex Sans, twarde spacje, porządki i brakujące testy z przeglądów 1B oraz sondy, które sprawdzają, a nie tylko wypisują.

**Architektura:**
- **Czyste funkcje w `page.js`** (testowane w jsc):
  - pogoda pobytu, plan na deszcz, wydarzenia, zły sezon zainteresowania;
  - „Wybrane, bo…”, „Nie ma na twojej trasie, bo…”, raport po „Dodaj”;
  - ustawienia domyślne;
  - cały układ mapy: rzutowanie, znaczniki, strzałki do innych kadrów, rozmieszczanie etykiet.
- **Dane:** `climate.js` (klimat 13 miejsc z researchu), `panels.js` (granice kadrów i nazwy na podkładzie), nowe pola treści (`events`, `color`, `poi`), paleta w szablonie.
- **`app.js`** rysuje to, co policzą czyste funkcje.
- **`geo/make_basemap.py`** robi kontury kadrów z Natural Earth; jego wynik to `basemap.js`.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (skrypt konturów, build, zrzuty); Chrome bez okna.

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): „Jak działa strona”, „Miesiąc w danych, nie w tekstach”, „Treść, bezpieczeństwo, licencje”;
- [notes/etapy.md](../etapy.md): etap 2 i lista „Do etapu 2”;
- [notes/uwagi-z-przegladow-1b.md](../uwagi-z-przegladow-1b.md): sekcja „Do etapu 2”;
- decyzje z sesji 11.10.2026, niżej w sekcji „Decyzje z sesji 11.10.2026”.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS z bloków `:root`; od zadania 3 pilnuje tego test `css colours`;
  - `engine.js` i `page.js` bez DOM; dane wchodzą do `page.js` przez argumenty;
  - komentarze w kodzie po angielsku, teksty dla czytelnika po polsku w `ui.js` i `content/`.
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, nigdy sam znak. Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, między apostrofami w `var NB = '…';`. Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie zwraca.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - liczebniki przez `countWord`; cudzysłów „…”, myślnik w zakresach, godziny 24-godzinne, spacja przed °C.
- **Miesiąc w danych, nie w tekstach:** zdanie prawdziwe tylko w części roku idzie do `events` miejsca, nie do opisu dnia.
- **Fakty:** każdy nowy fakt ma źródło i datę w `research/`.
- **Zdjęcia:** tylko CC0, CC BY, CC BY-SA albo domena publiczna, z autorem i licencją w `photos.js`. Pliki zostają w `photos/`, poza gitem.
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu. Pełny przebieg (`--full`) trwa po tym planie ok. 40 s.
- **Pobieranie plików** (dane Natural Earth, zdjęcia) tylko po zgodzie użytkownika, z nazwą, źródłem i rozmiarem.
- **Repo będzie publiczne:** bez danych osobowych i bez numerów lotów.
- **Commity:**
  - po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
  - commity po zadaniach są częścią planu;
  - `git push` i publikacja artifactu tylko za zgodą użytkownika.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których strona najłatwiej zawiedzie użytkownika, a których testy czystych funkcji nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Etykiety mapy w prawdziwej przeglądarce.**
   - Ryzyko: układ liczy szerokość tekstu z szacunku (`textWidth`), a Chrome rysuje litery po swojemu.
   - Oczekiwane: na żadnej trasie etykieta nie zasłania innej etykiety, znacznika ani krawędzi kadru.
   - Sprawdzenie: test kombinacji sprawdza szacunki dla każdej trasy (zadanie 10), a sonda `tests/probes/map.js` mierzy prawdziwe ramki tekstu na sześciu gęstych trasach (zadanie 11). Plik offline bez internetu ma krój zastępczy, więc etykiety mogą się tam zetknąć; to sprawa wersji offline w etapie 4.
2. **Pasek z podsumowaniem i przycisk „Na górę”.**
   - Ryzyko: oba zależą od IntersectionObserver, którego Chrome bez okna przy wirtualnym czasie nie uruchamia po pierwszym wywołaniu.
   - Oczekiwane: podsumowanie pojawia się, gdy formularz zniknie z ekranu, a znika, gdy wróci.
   - Sprawdzenie: ręcznie w przeglądarce, w zadaniu 13.
3. **Formularz po zmianie, która nie dała trasy.**
   - Ryzyko: „Dodaj”, „Usuń” i „Wróć do trasy bez zmian” oraz wyszarzenie zainteresowań biorą stan sprzed zmiany.
   - Oczekiwane: działają na tym, co pokazuje formularz.
   - Sprawdzenie: sonda `tests/probes/settings.js` (zadanie 8).
4. **Pogoda i wydarzenia na granicy miesięcy.**
   - Ryzyko: pobyt na przełomie miesięcy, daty przez Nowy Rok, tryb miesiąca, okno wydarzenia przez Nowy Rok.
   - Oczekiwane: każdy miesiąc pobytu raz i we właściwej kolejności; wydarzenie widać, gdy pobyt trafia w jego okno.
   - Sprawdzenie: testy `stayWeather` i `stayEvents` w `tests/page.test.js` (zadanie 5).
5. **Zapowiedź przy „Dodaj”.**
   - Ryzyko: linijka „Po dodaniu wypadnie: …” mówi co innego, niż potem zrobi „Dodaj”.
   - Oczekiwane: te same miejsca.
   - Sprawdzenie: test `whyOff` porównuje zapowiedź z trasą z dodanym miejscem (zadanie 6), a sonda `tests/probes/changes.js` klika „Dodaj” i porównuje zapowiedź z komunikatem po zmianie (zadanie 9).

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik (ścieżki od katalogu repo).
- **Python:** jest Pillow i PyMuPDF; nie ma `shapely` ani `pyshp`, więc skrypt konturów czyta GeoJSON modułem `json`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`):
  - pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, IntersectionObserver woła tylko raz, na starcie, a przejścia CSS stoją; sonda czyta więc docelowe położenia ze stylów;
  - Chrome ignoruje `history.replaceState` po ok. 200 wywołaniach w 10 s, więc sonda zmienia trasę najwyżej kilkadziesiąt razy;
  - od zadania 2 słowo `MIESIAC` w ustawieniach sondy, zrzutu i wydruku zamienia się na miesiąc za pięć miesięcy od dziś.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - w nowym worktree podlinkuj `photos/` z głównej kopii przed buildem.
- **Sucha próba (11.10.2026):**
  - kod zadań 1–11 oraz treść i research z zadań 5 i 12 złożono w osobnym worktree, a skrypt notatek z zadania 14 uruchomiono na kopiach plików;
  - przeszły: `bash tests/run.sh --full` (`ALL PASS`, 39 s), build, pięć sond w sześciu wywołaniach z zadania 13 i wydruk (10 stron, 0 zakrytych linii);
  - test kombinacji: na wszystkich 134 784 trasach żadna etykieta mapy nie nachodzi na inną, na znacznik ani na krawędź;
  - sonda mapy na 6 trasach z planu i na 80 losowych trasach: bez nachodzenia w Chrome;
  - nie sprawdzono na sucho: zamiany zdjęć Hội An (zadanie 12, krok 4), ręcznego sprawdzenia paska i przeglądu zrzutów (zadanie 13).

## Decyzje z sesji 11.10.2026

Pytania do użytkownika (wszystkie rekomendacje przyjęte):
1. **Podział:** etap 2 w dwóch planach. 2A (ten plan) to kod na danych, które już są w repo; 2B (zarys na końcu) to budżet, „Przed wyjazdem”, zamiany albo–albo i przejazdy z lotnisk, rozpisany po 2A.
2. **Ustawienia na telefonie:** formularz na górze, liczby trasy i pasek dni tuż pod nim, a po przewinięciu u góry ekranu pasek z podsumowaniem i „Zmień”.
3. **Ustawienia na pierwsze wejście:** najlepszy miesiąc z 12 następnych dla trasy domyślnej (Hồ Chí Minh City → Hà Nội, 15 dni, bez zainteresowań, „Aktywnie”). Przy remisie wygrywa miesiąc bez świąt, potem wcześniejszy. 11.10.2026 wychodzi marzec 2027.
4. **Pogoda:** w karcie miejsca, pod „Wybrane, bo…”: sezon, temperatura od nocy do dnia, opady i dni z deszczem, a przy sezonie średnim i złym powód.
5. **Mapa:** trzy kadry (północ, środek, południe), zawsze wszystkie, z bladymi kropkami miejsc poza trasą. Lot do innego kadru to krótka strzałka przy lotnisku z nazwą drugiego końca.
6. **Krój:** IBM Plex Sans zamiast Be Vietnam Pro, w którym „ą” wygląda jak „q”. Nagłówki zostają w Newsreader, liczby w IBM Plex Mono.

Lista 33 ustaleń zatwierdzona w całości:
- **Układ i ustawienia:**
  - kolejność strony: zdjęcie, pasek u góry, ustawienia, „W skrócie” (liczby trasy i ostrzeżenia, pasek dni, lista poza trasą, kopiowanie), „Dzień po dniu”;
  - na telefonie zdjęcie niższe, a pole miesiąca na pierwszym ekranie (sonda na 390 × 844 px);
  - zwarty formularz: miesiąc i liczba dni w wierszu, lotniska w wierszu ze strzałką, poziom jako trzy przyciski z opisem wybranego pod spodem;
  - pasek u góry: po zniknięciu formularza podsumowanie (termin, dni, poziom) i „Zmień”; wcześniej, a na komputerze zawsze, odnośniki;
  - błąd w linku to pierwsza linijka ostrzeżeń nad liczbami trasy, błąd po zmianie zostaje pod formularzem;
  - „Dodaj”, „Usuń”, „Wróć do trasy bez zmian” po nieudanej zmianie biorą ustawienia z formularza; wyszarzenie zainteresowań odświeża się przy każdej zmianie; przy minionym terminie znika ostrzeżenie o braku dat świąt;
  - test ustawień domyślnych sprawdza zasadę wyboru miesiąca, a nie konkretny miesiąc.
- **Powody:**
  - „Wybrane, bo…”: dodane przez ciebie; lotnisko przylotu albo wylotu; pasujące zainteresowania (bez wyboru dwa najmocniejsze); „po drodze”; sezon w miesiącu pobytu; noc w drodze: „Noc w drodze z X do Y.”;
  - „Nie ma na twojej trasie, bo…” zamiast „Poza trasą”: usunięte przez ciebie; tylko od poziomu; zamknięte; poza sezonem (z powodem); nie pasuje do wybranych zainteresowań; za daleko na tyle dni; inaczej „przy N dniach wygrały inne miejsca”;
  - „Dodaj” tylko tam, gdzie się uda, z zapowiedzią „Po dodaniu wypadnie: …”;
  - komunikat po „Dodaj” mówi, co wypadło i co doszło;
  - poziom i zamknięcia sprawdzają testy na danych zastępczych.
- **Pogoda, sezon, wydarzenia:**
  - `climate.js` z liczbami z researchu i powodami ocen jako kodami, z testem zgodności z researchem i progami;
  - pogoda w karcie miejsca, pobyt na przełomie miesięcy z oboma miesiącami, skrócone karty bez pogody;
  - plan na deszcz tylko w miesiącach z co najmniej 10 dniami z deszczem;
  - wydarzenia i uwagi sezonowe przypięte do dat w roku, w treści miejsca, bez wpływu na trasę;
  - komunikat o złym sezonie zainteresowania w ostrzeżeniach.
- **Mapa:**
  - skrypt `geo/make_basemap.py` w czystym Pythonie, dane Natural Earth po zgodzie, poza gitem;
  - kadry: północ od Sa Pa i Hà Giang do Thọ Xuân, środek od Phong Nha do Hội An, południe od Phú Quốc do Đà Lạt i Yok Đôn (Pù Mát z partii B wymaga zmiany kadru);
  - etykiety rozmieszcza czysta funkcja, test kombinacji i sonda w Chrome; znikają `NLAB` i `CLAB`;
  - ramka lotniska nie chowa się pod znacznikiem miasta; strzałka z nazwą przy locie do innego kadru;
  - podziałka 50 km w każdym kadrze, nazwy bladych kropek tam, gdzie się mieszczą, powiększenie z trzema kadrami obok siebie;
  - paleta 20 kolorów z numerem koloru w treści, z testem niepowtarzania i kontrastu 4,5:1.
- **Wygląd i porządki:** krój; twarde spacje (liczba z jednostką, nazwy miejsc); dwie kolumny liczb na telefonie; data dnia w jednym wierszu; porządki w szablonie, testach i narzędziach z przeglądów; poprawki treści z przeglądów i ostrzejsze zdjęcia Hội An.
- **Zakres:** zygzaki tras, dzień z dwoma lotami, Cát Bà na 4 noce i trzy pobyty w Hà Nội idą do etapu 3; plan 2A kończy się zrzutami i przeglądem, punkt kontrolny etapu 2 jest na końcu 2B; sucha próba jak w 1B.

Doprecyzowania w tym planie, do zatwierdzenia razem z nim (wyszły z suchej próby):
- **Lotniska na telefonie w dwóch wierszach.** „Hồ Chí Minh City” nie mieści się w połowie szerokości telefonu i pole ją ucinało. Od 641 px w górę lotniska stoją w jednym wierszu ze strzałką, jak ustalono.
- **Formularz na komputerze w dwóch kolumnach.** W jednej kolumnie karta miała prawą połowę pustą.
- **Granice kadrów w osobnym pliku danych `panels.js`.** Czyta go strona i skrypt konturów, więc kadr zmienia się w jednym miejscu. W tym pliku są też róg podziałki i nazwy na podkładzie (kraje, morza). Etykiety tras omijają te nazwy, gdy mogą.
- **Kadry przesunięte względem rozpoznania:** środek od 17,95° N (zostaje miejsce pod Hội An), północ do 19,6° N (miejsce pod Thọ Xuân). Wymiary: 270 × 250, 270 × 233 i 270 × 177 px, czyli mapa jest o ok. 20 px wyższa niż dziś.
- **Krótkie nazwy lotnisk na strzałkach mapy:** HCMC, Hải Phòng, Thanh Hóa (nowe pole `short` w `AIRPORTS`). Kilka lotów z jednego lotniska to jedna strzałka z nazwami w kolejnych wierszach.
- **Bản Giốc jako pole `poi` w treści Cao Bằng** zamiast stałej w `app.js`.
- **Zdania prawdziwe w części roku przechodzą z opisów dni do wydarzeń:** pijawki w Cát Tiên, wysoka woda w delcie Mekongu, złote tarasy w Pù Luông, wysoka woda w Tràng An. Brakująca uwaga z przeglądu trudnego dnia w Pù Luông (mgła i chłód zimą) od razu staje się wydarzeniem (XII–II), a nie zdaniem w opisie dnia.
- **Poprawki stylu idą za propozycjami z przeglądu zadania 8 planu 1B.** W uwagach z przeglądów są zapisane skrótem: „Taka kolejność, bo…” w Cao Bằng i „organizuje wejścia… dopytaj” w Pù Luông to propozycje recenzenta, a „wielokropek” w Cát Bà to niezręczna elipsa w opisie rejsu. Nieaktualne jest tylko „nagłe powodzie” w Đà Lạt: tego sformułowania nie ma już w pliku (sprawdzone 11.10.2026).
- **Test danych klimatu sprawdza też, że litery w `seasons.js` są takie jak w tabelach researchu.**
- **Plan na deszcz liczy dni z deszczem tak, jak je zaokrągla strona** (9,6 dnia to 10 dni, więc plan się pokazuje).

## Jak działa strona po 2A

1. **Ustawienia i trasa** działają jak w 1B: `apply` → `normSettings` → `planRoute` → `stopDays` → render → adres. `apply(s, linkWarn)` dostaje znacznik, że link był częściowo błędny; ostrzeżenie trwa do następnej zmiany.
2. **Bez linku** `defaultSettings(today, data, holidays)` układa trasę domyślną w każdym z 12 następnych miesięcy i bierze najlepszą.
3. **„W skrócie”:** liczby trasy, ostrzeżenia (błędny link, miniony termin, święta, zły sezon zainteresowania, brak dat świąt), pasek dni, „Nie ma na twojej trasie” (`whyOff`) i kopiowanie.
4. **Karta miejsca:** „Wybrane, bo…” (`whyOn`), pogoda (`stayWeather`), wydarzenia (`stayEvents`), galeria, dni z planem na deszcz tylko w mokrych miesiącach (`rainyMonth`).
5. **Mapa:** `mapLayout(route, st, m)` liczy wszystko w pikselach, `renderMap` rysuje jedno SVG z trzema kadrami, a powiększenie pokazuje kadry obok siebie.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/engine.js` | (zmiana) nazwane granice lat |
| `site2/src/climate.js` | (nowy) `WEATHER_WHY`, `CLIMATE`: klimat 13 miejsc w 12 miesiącach |
| `site2/src/panels.js` | (nowy) `MAP_WIDTH`, `MAP_PANELS`: kadry mapy, róg podziałki, nazwy na podkładzie |
| `site2/src/basemap.js` | (wygenerowany od nowa) `BASEMAP`: kontury trzech kadrów |
| `geo/make_basemap.py` | (nowy) kontury z Natural Earth dla kadrów z `panels.js` |
| `site2/src/content.js` | (zmiana) opis pól `color`, `poi`, `events`; `short` w `AIRPORTS` |
| `site2/src/content/<id>.js` | (zmiana) `color`, `events`, `poi` (Cao Bằng), poprawki tekstów |
| `site2/src/page.js` | (zmiana) link, twarde spacje, pogoda, wydarzenia, powody, ustawienia domyślne, układ mapy |
| `site2/src/app.js` | (zmiana) formularz, pasek, ostrzeżenia, karta miejsca, lista poza trasą, mapa, powiększenie |
| `site2/src/template.html` | (zmiana) krój, kolory przez zmienne, układ strony, formularz, karta, lista, mapa, paleta |
| `site2/src/ui.js` | (zmiana) nowe teksty interfejsu |
| `site2/build.py` | (zmiana) `climate.js` i `panels.js` w kolejności skryptów |
| `tests/run.sh` | (zmiana) `climate.js` i `panels.js` w `SOURCES` |
| `tests/page.test.js`, `tests/engine.test.js`, `tests/data.test.js`, `tests/content.test.js`, `tests/combos.test.js` | (zmiana) testy nowych funkcji, danych i mapy |
| `tests/probe.sh`, `tests/shot.sh`, `tests/print.sh` | (zmiana) `MIESIAC`, pilnowanie doctype, kod wyjścia sondy |
| `tests/probes/lib.js` | (nowy) `check`, `done`, `soon`, `textOf`, `setField` |
| `tests/probes/link.js`, `anchors.js`, `changes.js` | (zmiana) kontrole zamiast wypisywania |
| `tests/probes/settings.js`, `map.js` | (nowe) formularz na telefonie; mapa zmierzona w Chrome i powiększenie |
| `research/sezony-2026-10.md` | (zmiana) tabela wydarzeń na stronie ze źródłami |
| `research/plany-dni-2026-10.md` | (zmiana) sekcja „Zmiany z planu 2A” ze źródłami poprawek treści |
| `site2/src/photos.js` | (zmiana) podpisy dwóch nowych zdjęć Hội An (pliki w `photos/`, poza gitem) |
| `notes/etapy.md`, `CLAUDE.md`, `notes/uwagi-z-przegladow-1b.md` | (zmiana) status, następny krok (plan 2B), sposoby sprawdzania |

**Kolejność:**
- Zadania idą po kolei, bo prawie każde zmienia `page.js`, `app.js` albo szablon.
- Zadanie 4 (`climate.js`) można zlecić równolegle z zadaniami 1–3: zmienia tylko nowe pliki, `build.py`, `run.sh` i koniec `data.test.js`.
- Pytanie o zgodę na pobranie danych Natural Earth (zadanie 11, krok 1) warto zadać na początku pracy, żeby zadanie 11 nie czekało. Tak samo kandydatów na zdjęcia Hội An (zadanie 12, krok 4) można znaleźć i pokazać użytkownikowi wcześniej.

---

### Zadanie 1: Czyste funkcje: poprawki i brakujące testy z przeglądów

Uwagi z przeglądów 1B o `engine.js`, `page.js` i ich testach (lista w `notes/uwagi-z-przegladow-1b.md`, „Testy i narzędzia”).

**Pliki:**
- Zmień: `site2/src/engine.js`, `site2/src/page.js`
- Test: `tests/engine.test.js`, `tests/page.test.js`

**Interfejsy:**
- Daje: `MIN_YEAR = 2000`, `MAX_YEAR = 2100` (engine.js); `parseLink` zgłasza klucz linku bez `=`; `settingsFromLink` zostawia w ustawieniach tylko pola ich terminu i zgłasza w `dropped` pola linku, których nie użył.

- [ ] **Krok 1: Testy, które nie przechodzą.** W `tests/engine.test.js` zamień:

```js
eq([fxSet({ from: 'XA', to: 'XD', month: 2, year: 2027, days: 6 }).year, fxSet({ from: 'XA', to: 'XD', month: 2, days: 6 }).year],
  [2027, null], 'the year in the month mode, optional');
eq(fxSet({ from: 'XA', to: 'XD', start: '2027-01-30', end: '2027-02-03', year: 'x' }).year, null, 'with dates, the year is not read');
```

na:

```js
eq(fxSet({ from: 'XA', to: 'XD', month: 2, year: 2027, days: 6 }).year, 2027, 'the year in the month mode');
// ok(… === null), not eq: JSON.stringify writes undefined in a list as null, so eq would let a missing year through
ok(fxSet({ from: 'XA', to: 'XD', month: 2, days: 6 }).year === null, 'the year is optional: none gives null');
ok(fxSet({ from: 'XA', to: 'XD', start: '2027-01-30', end: '2027-02-03', year: 'x' }).year === null, 'with dates, the year is not read');
eq([MIN_YEAR, MAX_YEAR, fxSet({ from: 'XA', to: 'XD', month: 2, year: MIN_YEAR, days: 6 }).ok, fxSet({ from: 'XA', to: 'XD', month: 2, year: MAX_YEAR, days: 6 }).ok],
  [2000, 2100, true, true], 'the first and the last year allowed');
```

a w tej samej tablicy przypadków zamień ostatni wiersz:

```js
  [{ from: 'XA', to: 'XD', start: '2027-01-30', end: 20270203 }, 'date']
```

na:

```js
  [{ from: 'XA', to: 'XD', start: '2027-01-30', end: 20270203 }, 'date'],
  [{ from: 'XA', to: 'XD', start: '2027-01-30', end: ['2027-02-03'] }, 'date']
```

W `tests/page.test.js` zamień wiersz z `bad2`:

```js
eq([parseLink('#day-5&foo=1&constructor=x&toString=y', bad2), bad2], [{}, []], 'anchors, unknown keys and object properties are no link fields');
```

na (zepsuty znak `%` ujawnia brak straży własnych kluczy, bo `constructor=x` przechodzi też bez niej):

```js
eq([parseLink('#day-5&foo=1&constructor=%zz&toString=%zz', bad2), bad2], [{}, []], 'anchors, unknown keys and object properties are no link fields (a broken escape would name them)');
```

Pod wierszem z `bad3` dopisz:

```js
var bad5 = [];
eq([parseLink('#start=2027-1-30&koniec=x&dni=x&dni=y', bad5), bad5], [{}, ['start', 'end', 'days']], 'broken dates are malformed; a field malformed twice is named once');
var bad6 = [];
eq([parseLink('#od=SGN&do', bad6), bad6], [{ from: 'SGN' }, ['to']], 'a link cut short: a known key without = is malformed');
```

Pod wierszem z `g10` dopisz:

```js
var g11 = opened('#od=SGN&do=HAN&koniec=2027-02-12');
eq([g11.st.start, 'end' in g11.settings, g11.dropped], [null, false, ['end']], 'an end without a start: the month of the defaults, and the end is reported');
var g12 = opened('#od=SGN&do=HAN&start=2027-01-30&koniec=2027-02-03&miesiac=2027-05&dni=9');
eq([g12.st.start, g12.st.days, 'year' in g12.settings, 'month' in g12.settings, 'days' in g12.settings, g12.dropped],
  ['2027-01-30', 5, false, false, false, ['year', 'month', 'days']], 'dates win: a month and days next to them are reported and left out');
var g13 = opened('#od=SGN&do=HAN&miesiac=2026-05&dni=10');
eq([g13.settings.year, g13.settings.month, g13.dropped], [2026, 5, []], 'a month already past stays in the settings (the page says the term has passed)');
```

Pod wierszem `'level 3 in July, a month off: the usual day'` dopisz:

```js
eq([titles(stopDays(FC, { n: 3, start: 1 }, 0, 3, [0, 0, 6, 6])), titles(stopDays(FC, { n: 3, start: 1 }, 0, 3, [6, 6, 0, 0]))],
  [['1:A1', '2:A3', '3:A2'], ['1:A1', '2:A3', '3:A2h']], 'level 3 over two months: the month of each day decides (A2, on day 3, is off in July)');
```

Pod wierszem `'past the list: no data'` dopisz:

```js
eq(alerts({ from: 'SGN', to: 'HAN', start: '2026-09-25', end: '2026-10-03' }), ['?'], 'a trip that starts before the list: no data for part of it');
```

Pod wierszem `'one night without a morning plan'` dopisz:

```js
eq([legNotes(L(5, [{ mode: 'road', h: 2 }, { mode: 'fly', h: 1 }], 1), null, false), legNotes(L(5, [{ mode: 'road', h: 1.75 }, { mode: 'fly', h: 1 }], 1), null, false)],
  [['n.afternoon'], []], 'the afternoon flight: from 2 h of road to the airport, not at 1¾ h');
eq([legNotes(L(LONG_LEG_H, [{ mode: 'road', h: LONG_LEG_H }]), null, false), legNotes(L(LONG_LEG_H - 0.25, [{ mode: 'road', h: LONG_LEG_H - 0.25 }]), null, false)],
  [['n.long'], []], 'a long day: from LONG_LEG_H hours, not a quarter of an hour less');
eq([legNotes(L(6, [{ mode: 'road', h: 6 }]), { n: 1 }, true), legNotes(L(5.75, [{ mode: 'road', h: 5.75 }]), { n: 1 }, true)],
  [['n.solo_long'], []], 'after one night with a morning plan: the warning from 6 h of travel, not at 5¾ h');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: MIN_YEAR` (tests/engine.test.js). Po kroku 3 w engine.js, a przed zmianami w page.js, pierwszy błąd daje `tests/page.test.js`: „a link cut short: a known key without = is malformed”.

- [ ] **Krok 3: `site2/src/engine.js`.** Pod `var MIN_DAYS = 5, MAX_DAYS = 30;` dopisz:

```js
var MIN_YEAR = 2000, MAX_YEAR = 2100;   // the years a link in the month mode may name
```

W komentarzu nad `normSettings` zamień `with an optional year (2000–2100) in the month mode` na `with an optional year (MIN_YEAR–MAX_YEAR) in the month mode`, a w kodzie `s.year >= 2000 && s.year <= 2100` na `s.year >= MIN_YEAR && s.year <= MAX_YEAR`.

- [ ] **Krok 4: `site2/src/page.js`.** Nagłówek pliku, trzecia linia:

```js
   Uses engine.js (normSettings, isoDay), content.js (AIRPORTS, ROAD_KEYS through arguments) and holidays.js. */
```

zamień na:

```js
   Calls engine.js (normSettings, isoDay); the data (places, holidays, airports, road texts) comes in through arguments. */
```

W `parseLink` zamień trzy linie:

```js
    var i = part.indexOf('='), key = i < 0 ? null : part.slice(0, i), v, m, list;
    var field = key !== null && LINK_KEYS.hasOwnProperty(key) ? LINK_KEYS[key] : null;   // no own key: an object property is no field
    if (!field) return;   // an anchor (no =) or an unknown key is not a link field
```

na:

```js
    var i = part.indexOf('='), key = i < 0 ? part : part.slice(0, i), v, m, list;
    var field = LINK_KEYS.hasOwnProperty(key) ? LINK_KEYS[key] : null;   // no own key: an object property is no field
    if (!field) return;   // an anchor or an unknown key is not a link field
    if (i < 0) { reject(field); return; }
```

a w komentarzu nad funkcją, przed linią `rejected, an optional array, …`, dopisz:

```js
   A known key without = (a link cut short, as in #od=SGN&do) is a malformed field too.
```

W komentarzu nad `settingsFromLink` zamień:

```js
   in interests, add and remove are dropped too, and their field is reported in dropped.
```

na:

```js
   in interests, add and remove are dropped too, and their field is reported in dropped. The settings keep only the fields
   of their term: with dates no month, year or days, without dates no start or end; such a field from the link is reported.
```

a w kodzie, tuż przed `return { settings: s, st: st, dropped: dropped };`, dopisz:

```js
      (st.start ? ['year', 'month', 'days'] : ['start', 'end']).forEach(function (k) {
        if (k in link && dropped.indexOf(k) < 0) dropped.push(k);
        delete s[k];
      });
```

- [ ] **Krok 5: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/engine.js site2/src/page.js tests/engine.test.js tests/page.test.js
git commit -F - <<'EOF'
Testy i link: ucięty klucz linku to błąd, nieużyte pola linku zgłaszane, nazwane granice lat, brakujące przypadki z przeglądów 1B

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Sondy jako kontrole

Uwagi z przeglądów 1B o sondach i skryptach Chrome: sondy mają sprawdzać i kończyć się błędem, klikać zamiast wołać `apply()`, nie zależeć od wpisanego na stałe miesiąca i pilnować trybu standardowego dokumentu.

**Pliki:**
- Utwórz: `tests/probes/lib.js`
- Zmień: `tests/probe.sh`, `tests/shot.sh`, `tests/print.sh`, `tests/probes/link.js`, `tests/probes/anchors.js`, `tests/probes/changes.js`, `site2/src/app.js` (ostatnia linia)

**Interfejsy:**
- Daje (dla sond z kolejnych zadań):
  - `check(name, cond, detail)`: jedna linijka `P:ok …` albo `P:FAIL … (detail)`;
  - `done()`: ostatnia linijka; bez niej `probe.sh` uznaje, że sonda się przerwała;
  - `soon(k)`: `{ year, month }` za `k` miesięcy od dzisiejszej daty strony (domyślnie 5);
  - `textOf(sel)`: tekst elementu bez nadmiaru spacji;
  - `setField(name, value)`: ustawia pole formularza i wysyła `change`, jak przy kliknięciu;
  - `window.__trip.today` (app.js) i `window.__probeHash` (probe.sh): dzisiejsza data strony i ustawienia, z którymi sonda otworzyła stronę.
- `probe.sh` kończy się kodem 1, gdy któraś kontrola nie przeszła albo nie przyszło `done()`.
- W `probe.sh`, `shot.sh` i `print.sh` słowo `MIESIAC` w ustawieniach zamienia się na miesiąc za pięć miesięcy od dziś (`date -v+5m +%Y-%m`).

- [ ] **Krok 1: `tests/probes/lib.js`**

```js
/* Shared by every probe: tests/probe.sh puts this file before the probe. check() logs one line per check, done() the
   last line; probe.sh prints the lines and fails when a check failed or done() never came (the probe stopped early).
   Chrome ignores history.replaceState after about 200 calls in 10 seconds, so a probe changes the trip at most ~50 times. */
var PROBE_FAILS = 0;
function check(name, cond, detail) {
  console.log('P:' + (cond ? 'ok   ' : 'FAIL ') + name + (!cond && detail != null ? ' (' + detail + ')' : ''));
  if (!cond) PROBE_FAILS++;
}
function done() { console.log('P:done, ' + (PROBE_FAILS ? PROBE_FAILS + ' failed' : 'all checks ok')); }
// the month k months after the page's today (default 5), so a probe never plans a term that has passed
function soon(k) {
  var t = window.__trip.today, y = +t.slice(0, 4), m = +t.slice(5, 7) + (k == null ? 5 : k);
  while (m > 12) { m -= 12; y++; }
  return { year: y, month: m };
}
// the text of an element, spaces folded; '' when there is none
function textOf(sel) { var e = document.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }
// a form control set as a visitor would: the value, then the change event the page listens to
function setField(name, value) {
  var f = document.getElementById('settings-form');
  f[name].value = value;
  f[name].dispatchEvent(new Event('change', { bubbles: true }));
}
check('the page is a full document (standards mode, no 8 px margin)', document.compatMode === 'CSS1Compat', document.compatMode);
```

- [ ] **Krok 2: `tests/probe.sh`.** W nagłówku zamień dwa przykłady wywołania na:

```bash
#   e.g. tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3' 2
#        tests/probe.sh my-check.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
# MIESIAC in the hash becomes the month five months from today (YYYY-MM), so a probe never opens a term that has passed.
```

oraz zdanie o dołączaniu sondy:

```bash
# iframe of <width> px, with probe.js appended as a script after the document (the parser puts it at the end of the body),
# and prints every console.log line that starts with "P:". A probe reads or clicks the page and logs what it finds.
```

na:

```bash
# iframe of <width> px, with tests/probes/lib.js and probe.js appended as scripts after the document (the parser puts them
# at the end of the body), and prints every console.log line that starts with "P:". A probe reads or clicks the page and
# logs each check with check() (lib.js), then done(). Exit 1 when a check failed or done() never came.
```

Linie, które składają stronę z sondą:

```bash
{ cat site2/out/pages/index.html; echo "<script>"; cat "$1"; echo "</script>"; } > "$D/index.html"
printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0}iframe{border:0;display:block}</style><iframe src="index.html#%s" width="%s" height="900"></iframe>' "${3:-}" "$2" > "$D/wrap.html"
```

zamień na:

```bash
HASH="${3:-}"; HASH="${HASH//MIESIAC/$(date -v+5m +%Y-%m)}"
{ cat site2/out/pages/index.html; echo "<script>window.__probeHash = '#$HASH';"; cat tests/probes/lib.js "$1"; echo "</script>"; } > "$D/index.html"
printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0}iframe{border:0;display:block}</style><iframe src="index.html#%s" width="%s" height="900"></iframe>' "$HASH" "$2" > "$D/wrap.html"
```

a ostatnią linię:

```bash
grep -o '"P:[^"]*' "$D/log.txt" | sed 's/^"P://'
```

na:

```bash
OUT=$(grep -o '"P:[^"]*' "$D/log.txt" | sed 's/^"P://')
echo "$OUT"
echo "$OUT" | grep -q '^done' || { echo "probe.sh: the probe stopped before done() (see $D/log.txt)" >&2; exit 1; }
if echo "$OUT" | grep -q '^FAIL'; then exit 1; fi
```

- [ ] **Krok 3: `tests/shot.sh` i `tests/print.sh`.** W obu plikach:
  - w przykładzie wywołania zamień `miesiac=2027-03` na `miesiac=MIESIAC` i dopisz pod nim komentarz `# MIESIAC in the settings becomes the month five months from today (YYYY-MM).` (w `shot.sh` przy opisie `<settings>`);
  - pod linią, która sprawdza, czy jest build (`[ -s site2/out/pages/index.html ] || …`), dopisz (w `print.sh` z `print.sh:` na początku komunikatu):

```bash
head -c 15 site2/out/pages/index.html | grep -qi '^<!doctype html>' || { echo "shot.sh: site2/out/pages/index.html has no doctype, so Chrome would use quirks mode" >&2; exit 1; }
```

  - adres strony `…/index.html#$1` zamień na `…/index.html#${1//MIESIAC/$(date -v+5m +%Y-%m)}` (w `shot.sh` w linii `URL=…`, w `print.sh` w wywołaniu Chrome).

- [ ] **Krok 4: `site2/src/app.js`, ostatnia linia.** Zamień `window.__trip = { state: state, apply: apply };` na:

```js
  window.__trip = { state: state, apply: apply, today: TODAY };
```

- [ ] **Krok 5: `tests/probes/link.js`** (cały plik):

```js
// What a settings link opens and what the copied plan links to.
// tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
setTimeout(function () {
  var asked = window.__probeHash;
  check('the address keeps the settings of the link', location.hash === asked, location.hash + ' vs ' + asked);
  check('the facts name both airports', /Hà Nội/.test(textOf('#facts-for')) && /Đà Nẵng/.test(textOf('#facts-for')), textOf('#facts-for'));
  var stays = document.querySelectorAll('#stops .stop:not(.stop-home)').length, cells = document.querySelectorAll('#strip .cell').length;
  check('stays shown', stays > 1, stays);
  check('one cell per day in the strip', cells === 12, cells);
  check('no message under the settings', textOf('#settings-msg') === '', textOf('#settings-msg'));
  var copied = null;
  try { navigator.clipboard.writeText = function (t) { copied = t; return Promise.resolve(); }; } catch (e) { /* the fallback box below */ }
  document.getElementById('copy-plan').click();
  setTimeout(function () {
    var b = document.getElementById('copy-fallback');
    if (copied === null && !b.hidden) copied = b.value;
    var line = (copied || '').split('\n').pop();
    check('the copied plan ends with a link to the public page with these settings', line === 'Ten plan na stronie: ' + SITE_URL + asked, line);
    done();
  }, 300);
}, 1500);
```

- [ ] **Krok 6: `tests/probes/anchors.js`** (cały plik). Przycisk „Na górę” sonda klika, ale nie sprawdza, czy się pokazał: pokazuje go IntersectionObserver, którego Chrome bez okna nie uruchamia.

```js
// Links inside the page keep the settings in the address: a day in the strip, the menu, back to the top.
// tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// The page scrolls smoothly (CSS scroll-behavior), which headless Chrome does not finish: the probe turns it off first.
// Headless Chrome under a time budget fires no scroll events and no IntersectionObserver calls after the first one, so
// what those show (the back-to-top button, the summary in the bar) is checked by hand in a browser, not here.
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var before = location.hash;
  document.querySelector('#strip a.cell').click();
  check('a day in the strip scrolls and keeps the address', window.scrollY > 0 && location.hash === before, window.scrollY + ' ' + location.hash);
  document.querySelector('.secnav a[href="#days"]').click();
  check('the menu link keeps the address', location.hash === before, location.hash);
  check('the map has its pins', document.querySelectorAll('#map .pin').length > 1);
  document.getElementById('totop').click();
  check('back to the top: scrolled up, the address kept', window.scrollY === 0 && location.hash === before, window.scrollY + ' ' + location.hash);
  done();
}, 1500);
```

- [ ] **Krok 7: `tests/probes/changes.js`** (cały plik). Przypadek bez trasy sonda robi przez adres (link z usuniętymi miejscami przy lotnisku), resztę przez przyciski i formularz. Trasa 21 dni w górach z dodanym Phú Quốc daje zdanie o tym, co wypadło, w każdym miesiącu (sprawdzone na danych 11.10.2026).

```js
// Dodaj, Usuń, back to the trip without changes, a link the trip cannot follow, a term that is no trip, a round trip,
// and the sentence after Dodaj. Every change goes through the page as a visitor makes it: buttons, the form, the address.
// tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var ids = function () { return Array.prototype.map.call(document.querySelectorAll('#stops .stop[data-pin]'), function (s) { return s.getAttribute('data-pin'); }); };
  var at = soon(), month = at.year + '-' + at.month;
  check('the trip has stays', ids().length > 2, ids().join(','));
  document.querySelector('[data-add="phuquoc"]').click();
  check('Dodaj Phú Quốc: on the trip and in the address', ids().indexOf('phuquoc') > -1 && /dodaj=phuquoc/.test(location.hash), ids().join(',') + ' ' + location.hash);
  document.querySelector('[data-remove="phuquoc"]').click();
  check('Usuń Phú Quốc: off the trip, removed in the address', ids().indexOf('phuquoc') < 0 && /usun=phuquoc/.test(location.hash) && !/dodaj=/.test(location.hash), location.hash);
  document.getElementById('reset-changes').click();
  check('back to the trip without changes', !/dodaj=|usun=/.test(location.hash), location.hash);
  // a link whose Usuń leaves no trip: it opens without its Dodaj and Usuń and says so
  location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2&usun=saigon,mekong,cattien';
  setTimeout(function () {
    check('a link the trip cannot follow opens without its changes', !/usun=/.test(location.hash) && ids().length > 2, location.hash);
    check('and says that part of the link was wrong', /Część linku była błędna/.test(textOf('#alerts') + textOf('#settings-msg')), textOf('#alerts') + ' | ' + textOf('#settings-msg'));
    // dates: an end before the start is no trip; the last trip and the address stay, the message says why
    var f = document.getElementById('settings-form');
    f.querySelector('input[name=mode][value=dates]').click();
    var dated = location.hash;
    check('the dates mode keeps the trip, with dates in the address', /start=\d{4}-\d\d-\d\d&koniec=/.test(dated), dated);
    setField('end', '2026-01-01');
    check('an end before the start: a message, the address stays', /od 5 do 30 dni/.test(textOf('#settings-msg')) && location.hash === dated, textOf('#settings-msg') + ' ' + location.hash);
    // a round trip SGN→SGN: Usuń is hidden on the city of the airport, shown on other stays
    f.querySelector('input[name=mode][value=month]').click();
    setField('month', month);
    setField('to', 'SGN');
    check('a round trip from the form', /od=SGN&do=SGN/.test(location.hash), location.hash);
    check('Usuń hidden on Hồ Chí Minh City, shown on the other stays', !document.querySelector('[data-remove="saigon"]') && document.querySelectorAll('.stop-remove').length > 0,
      document.querySelectorAll('.stop-remove').length);
    // Dodaj on a 21-day mountain trip: Phú Quốc pushes places off, and the page says which; the next change clears it
    setField('to', 'HAN');
    setField('days', '21');
    f.querySelector('input[name=interest][value=gory]').click();
    document.querySelector('[data-add="phuquoc"]').click();
    check('the sentence after Dodaj names what left the trip', /Żeby zmieścić Phú Quốc, z trasy wypadło: /.test(textOf('#dropped')), textOf('#dropped'));
    setField('days', '20');
    check('one more change clears the sentence', textOf('#dropped') === '', textOf('#dropped'));
    done();
  }, 500);
}, 1500);
```

- [ ] **Krok 8: Build i sondy**

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/shot.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 390 "$TMPDIR/s.png" 900
```

Oczekiwane: każda sonda kończy się linią `done, all checks ok` i kodem 0 (`echo $?`); zrzut powstaje. Żeby zobaczyć, że błąd daje kod 1, zmień na chwilę w `anchors.js` warunek pierwszej kontroli na `false` i uruchom sondę: linia `FAIL …`, kod 1. Cofnij zmianę.

- [ ] **Krok 9: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 10: Commit**

```bash
git add tests/probes tests/probe.sh tests/shot.sh tests/print.sh site2/src/app.js
git commit -F - <<'EOF'
Testy: sondy sprawdzają i kończą się błędem, klikają zamiast wołać apply(), miesiąc liczony od dziś, pilnowanie doctype

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Krój, twarde spacje i porządki w szablonie

Krój IBM Plex Sans, kolory nakładek przez zmienne, uwagi o wyglądzie ze zrzutów i z przeglądów 1B.

**Pliki:**
- Zmień: `site2/src/template.html`, `site2/src/page.js`, `site2/src/app.js`
- Test: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje:
  - `tieShort(text)` (page.js) wiąże też liczbę z jednostką (`km`, `m`, `mm`, `godz.`, `min`, `°C`) i `≈` z liczbą;
  - `tieNames(text, names)` (page.js): spacje w podanych nazwach stają się twardymi spacjami;
  - `tied(text)` (app.js): oba wiązania naraz; od tego zadania każdy tekst wpisywany do strony poza `render()` przechodzi przez `tied()`;
  - zmienne CSS `--photo-bg`, `--scrim`, `--black`, `--white`, `--ctl-bg`, `--ctl-ink`, `--badge-bg`, `--lb-bg`, `--lb-ink`, `--stop-gap`, `--stop-gap-compact`.

- [ ] **Krok 1: Testy, które nie przechodzą.** W `tests/page.test.js` zamień dwie linie:

```js
['dla przyjaciół', 'Đà Lạt i', 'ok. 5 km', 'XVIII wieku', 'C w', 'z' + NB + 'południa'].forEach(function (s) { eq(tieShort(s), s, 'unchanged: ' + s); });
eq(tieShort(tieShort('i w domu')), tieShort('i w domu'), 'idempotent');
```

na:

```js
['dla przyjaciół', 'Đà Lạt i', 'XVIII wieku', 'C w', 'z' + NB + 'południa', '5 miejsc', '2 mosty', '15 dni'].forEach(function (s) { eq(tieShort(s), s, 'unchanged: ' + s); });
eq([tieShort('ok. 3–4 km od'), tieShort('≈ 5½ godz. drogi'), tieShort('2 godz. 30 min'), tieShort('noce 13 °C, 64 mm deszczu, 1700 m n.p.m.')],
  ['ok. 3–4' + NB + 'km od', '≈' + NB + '5½' + NB + 'godz. drogi', '2' + NB + 'godz. 30' + NB + 'min', 'noce 13' + NB + '°C, 64' + NB + 'mm deszczu, 1700' + NB + 'm n.p.m.'],
  'a number keeps its unit, ≈ keeps its number');
eq(tieShort(tieShort('i w domu, ≈ 4 godz.')), tieShort('i w domu, ≈ 4 godz.'), 'idempotent');
var NAMES = ['Hồ Chí Minh City', 'Cát Tiên', 'Ba Bể'];
eq(tieNames('Nie zmieściło się: Ba Bể, Cát Tiên. Lot z Hồ Chí Minh City.', NAMES),
  'Nie zmieściło się: Ba' + NB + 'Bể, Cát' + NB + 'Tiên. Lot z Hồ' + NB + 'Chí' + NB + 'Minh' + NB + 'City.', 'names keep together, each place');
eq(tieNames('Bez nazw.', NAMES), 'Bez nazw.', 'a text without names stays as it was');
```

W `tests/content.test.js`, przed komentarzem `/* The interface texts (ui.js): none empty;`, dopisz:

```js
/* Colours only through the variables in :root (the project rule): outside the :root blocks the template's CSS has no hex
   colour and no rgb() or rgba() with numbers (a triplet variable goes in as rgba(var(--black), 0.25)). */
contentCheck('css colours', function (need) {
  var css = readFile('site2/src/template.html').split('<style>')[1].split('</style>')[0].replace(/:root[^{]*\{[^}]*\}/g, '');
  (css.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d[^)]*\)/g) || []).forEach(function (m) { need(false, 'a colour outside :root: ' + m + ' (put it in a variable)'); });
});
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `tests/page.test.js` kończy się błędem „a number keeps its unit, ≈ keeps its number”. Po kroku 3 `tests/content.test.js` wypisuje listę kolorów spoza `:root` (`#10201c`, `rgba(6,16,14,0.45)` i inne) i kończy się „problem(s) in css colours”.

- [ ] **Krok 3: `site2/src/page.js`.** Funkcję `tieShort` z jej komentarzem zastąp:

```js
/* Polish typography: a one-letter word (a i o u w z) gets a no-break space after it, so no line ends on it. It must start the text
   or follow white space, ( „ or –. A run like "i w domu" needs several passes (a match uses up the space in front of the next word), so repeat.
   A number keeps its unit on the line (5 km, 5½ godz., 25 °C, 64 mm), and ≈ keeps its number. */
function tieShort(text) {
  var before;
  do {
    before = text;
    text = text.replace(/(^|[\s(„–])([aiouwzAIOUWZ]) /g, '$1$2\u00a0');
  } while (text !== before);
  return text.replace(/≈ /g, '≈\u00a0').replace(/([\d½]) (godz\.|min|km|mm|m|°C)(?![\p{L}])/gu, '$1\u00a0$2');
}

/* Multi-word names (Ba Bể, Hồ Chí Minh City) do not break across lines: wherever one stands in text, its spaces become
   no-break spaces. names: the names that have a space, longest first, so a longer name is tied before a shorter one in it. */
function tieNames(text, names) {
  names.forEach(function (n) { if (text.indexOf(n) > -1) text = text.split(n).join(n.replace(/ /g, '\u00a0')); });
  return text;
}
```

- [ ] **Krok 4: `site2/src/template.html`.** Zmiany są mechaniczne, więc robi je skrypt; każda zamieniana linia musi wystąpić w pliku dokładnie raz. Uruchom z katalogu repo:

```bash
python3 - <<'PY'
p = 'site2/src/template.html'
t = open(p, encoding='utf-8').read()
pairs = [
 ('family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&',
  'family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&'),
 ('  --shade: rgba(6, 16, 14, 0.78);\n',
  '  --shade: rgba(6, 16, 14, 0.78);\n'
  '  /* over photos, in the photo viewer and in shadows: the same in light and dark (rgb triplets go into rgba(var(--x), a)) */\n'
  '  --photo-bg: #10201c; --scrim: 6, 16, 14; --black: 0, 0, 0; --white: 255, 255, 255;\n'
  '  --ctl-bg: rgba(250, 252, 251, 0.92); --ctl-ink: #13221f; --badge-bg: rgba(10, 20, 18, 0.72); --lb-bg: rgba(6, 12, 11, 0.95); --lb-ink: #f2f5f4;\n'
  '  --stop-gap: 18px; --stop-gap-compact: 10px;\n'),
 ('--body: "Be Vietnam Pro", "Segoe UI"', '--body: "IBM Plex Sans", "Segoe UI"'),
 ('overflow: hidden; background: #10201c; }', 'overflow: hidden; background: var(--photo-bg); }'),
 ('rgba(6,16,14,0.45) 0%, rgba(6,16,14,0.12) 28%, rgba(6,16,14,0.2) 50%', 'rgba(var(--scrim), 0.45) 0%, rgba(var(--scrim), 0.12) 28%, rgba(var(--scrim), 0.2) 50%'),
 ('text-shadow: 0 1px 14px rgba(0, 0, 0, 0.35); }', 'text-shadow: 0 1px 14px rgba(var(--black), 0.35); }'),
 ('.hero-cta .primary { background: var(--on-photo); color: #10201c; }', '.hero-cta .primary { background: var(--on-photo); color: var(--photo-bg); }'),
 ('border: 1px solid rgba(255,255,255,0.6); }', 'border: 1px solid rgba(var(--white), 0.6); }'),
 ('font-size: clamp(26px, 3vw, 36px); line-height: 1; }', 'font-size: clamp(26px, 3vw, 36px); line-height: 1; white-space: nowrap; }'),
 ('.missing { margin-top: 16px; font-size: 15px; color: var(--wet); }\n.missing:empty { display: none; }',
  '/* the status lines stay in the page when empty (a screen reader may skip the first message of a region that appears) */\n'
  '.missing { font-size: 15px; color: var(--wet); }\n.missing:not(:empty) { margin-top: 16px; }'),
 ('border-radius: 999px; padding: 6px 12px; min-height: 40px; cursor: pointer; }', 'border-radius: 999px; padding: 6px 12px; min-height: 44px; cursor: pointer; }'),
 ('border-radius: 6px; padding: 6px 12px; min-height: 40px; cursor: pointer; }', 'border-radius: 6px; padding: 6px 12px; min-height: 44px; cursor: pointer; }'),
 ('.strip-note { margin-top: 8px; font-size: 13px; color: var(--muted); }\n', ''),
 ('drop-shadow(0 6px 16px rgba(10, 30, 25, 0.16))', 'drop-shadow(0 6px 16px rgba(var(--scrim), 0.16))'),
 ('drop-shadow(0 10px 30px rgba(10, 30, 25, 0.18))', 'drop-shadow(0 10px 30px rgba(var(--scrim), 0.18))'),
 ('.m-start rect { fill: var(--ink); }\n.m-start .m-label { font-weight: 500; }\n', ''),
 ('display: grid; gap: 18px; scroll-margin-top: 16px; min-width: 0; }\n.stop-compact { gap: 10px; }',
  'display: grid; gap: var(--stop-gap); scroll-margin-top: 16px; min-width: 0; }\n.stop-compact { gap: var(--stop-gap-compact); }'),
 ('background: rgba(250, 252, 251, 0.92); color: #13221f; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,0.25); }',
  'background: var(--ctl-bg); color: var(--ctl-ink); border-radius: 50%; box-shadow: 0 1px 4px rgba(var(--black), 0.25); }'),
 ('background: rgba(10, 20, 18, 0.72); color: #fff; padding: 3px 8px;', 'background: var(--badge-bg); color: var(--on-photo); padding: 3px 8px;'),
 ('letter-spacing: 0; margin-top: 4px; }', 'letter-spacing: 0; margin-top: 4px; white-space: nowrap; }'),
 ('.day-rain { margin-top: 6px; font-size: 14px; color: var(--cool); }',
  '/* .day p sets the colour of every paragraph of a day, so the rain plan needs the stronger selector */\n'
  '.day .day-rain { margin-top: 6px; font-size: 14px; color: var(--cool); }'),
 ('.tip-warn { background: var(--wet-soft); }\n.tip-warn b { color: var(--wet); }\n', ''),
 ('background: rgba(6, 12, 11, 0.95); display: grid; grid-template-rows: auto minmax(0, 1fr) auto; color: #f2f5f4;',
  'background: var(--lb-bg); display: grid; grid-template-rows: auto minmax(0, 1fr) auto; color: var(--lb-ink);'),
 ('background: rgba(255,255,255,0.14); color: #fff; cursor: pointer; }', 'background: rgba(var(--white), 0.14); color: var(--on-photo); cursor: pointer; }'),
 ('  .facts ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n  .facts li:nth-child(4) { border-left: 0; padding-left: 0; }\n  .facts li:nth-child(n+4) { border-top: 1px solid var(--line); }\n',
  '  /* the figures in two columns, the last one across both when it is alone in its row */\n'
  '  .facts ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n'
  '  #facts li:nth-child(odd) { border-left: 0; padding-left: 0; }\n'
  '  #facts li:nth-child(n+3) { border-top: 1px solid var(--line); }\n'
  '  #facts li:last-child:nth-child(odd) { grid-column: 1 / -1; }\n'),
 ('linear-gradient(90deg, #000 85%, transparent); mask-image: linear-gradient(90deg, #000 85%, transparent); }',
  'linear-gradient(90deg, rgb(var(--black)) 85%, transparent); mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); }'),
 ('box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18); }', 'box-shadow: 0 2px 10px rgba(var(--black), 0.18); }'),
 ('  .stop > * + * { margin-top: 18px; }\n  .stop-compact > * + * { margin-top: 10px; }', '  .stop > * + * { margin-top: var(--stop-gap); }\n  .stop-compact > * + * { margin-top: var(--stop-gap-compact); }'),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `28 changes`.

- [ ] **Krok 5: `site2/src/app.js`.**
  - `dateLabel` z komentarzem nad nią zastąp (krótszy zapis „czw. 28.01” mieści się pod numerem dnia w jednym wierszu):

```js
  // the weekday and date of trip day n, only when the trip has dates: "czw. 28.01", short enough for one line under the number
  function dateLabel(day) {
    var iso = tripDate(state.st.start, day);
    if (!iso) return '';
    var p = iso.split('-').map(Number);
    var wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString('pl-PL', { weekday: 'short', timeZone: 'UTC' });
    return wd + '\u00a0' + p[2] + '.' + (p[1] < 10 ? '0' : '') + p[1];
  }
```

  - `msg` zamień na `function msg(text) { $('#settings-msg').textContent = tied(text); }`;
  - w `reportDropped` zamień `tieShort(T('off.dropped', …))` na `tied(T('off.dropped', …))` (reszta wywołania bez zmian);
  - `tieShortWords` z komentarzem nad nią zastąp:

```js
  // the multi-word names a line may not break inside: the short names of the places and the names of the airports
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }))
    .filter(function (n, i, all) { return n.indexOf(' ') > -1 && all.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  // a text with the no-break spaces of Polish typography (tieShort) and of the names (tieNames), both in page.js
  function tied(text) { return lang === 'pl' ? tieNames(tieShort(text), TIED_NAMES) : text; }
  // every text in root, tied as above
  function tieShortWords(root) {
    if (lang !== 'pl') return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), node;
    while ((node = walker.nextNode())) {
      if (/^(SCRIPT|STYLE|TEXTAREA)$/i.test(node.parentNode.nodeName)) continue;
      var t = tied(node.nodeValue);
      if (t !== node.nodeValue) node.nodeValue = t;
    }
  }
```

- [ ] **Krok 6: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 7: Zrzuty.** Zbuduj stronę i sprawdź na zrzutach krój, rząd liczb w dwóch kolumnach i datę dnia w jednym wierszu:

```bash
python3 site2/build.py
bash tests/shot.sh 'od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1' 390 "$TMPDIR/t3-390.png" 1500
bash tests/shot.sh 'od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1' 1400 "$TMPDIR/t3-1400.png" 4000
```

Oczekiwane: na telefonie liczby trasy w dwóch kolumnach, „najdłuższy dzień w drodze” w ostatnim wierszu przez całą szerokość, „6½ godz.” w jednym wierszu; na komputerze data pod numerem dnia w jednym wierszu („czw. 28.01”); „ą” wyraźne, inne niż „q”.

- [ ] **Krok 8: Commit**

```bash
git add site2/src/template.html site2/src/page.js site2/src/app.js tests/page.test.js tests/content.test.js
git commit -F - <<'EOF'
Wygląd: krój IBM Plex Sans, kolory nakładek przez zmienne (z testem), twarde spacje przy jednostkach i w nazwach, liczby trasy w dwóch kolumnach na telefonie, porządki z przeglądów 1B

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Klimat: dane i test

Liczby z tabel `research/sezony-2026-10.md` jako dane strony, z powodami ocen „średni” i „zły”. To zadanie zmienia tylko nowe pliki, `build.py`, `run.sh` i koniec `data.test.js`, więc można je zlecić równolegle z zadaniami 1–3.

**Pliki:**
- Utwórz: `site2/src/climate.js`
- Zmień: `site2/build.py` (`SCRIPTS`), `tests/run.sh` (`SOURCES`)
- Test: `tests/data.test.js` (dopisz na końcu)

**Interfejsy:**
- Daje:
  - `WEATHER_WHY`: kody powodów: `upal`, `deszcz`, `szaro`, `chlod`, `morze`, `fale`, `ulewy`, `tajfuny`, `powodzie`;
  - `CLIMATE[id] = { t: [[min, max] × 12], rain: [[mm, dni z deszczem] × 12], why: { miesiąc 1–12: [kody] } }`, od stycznia; `CLIMATE.hanoiStop === CLIMATE.hanoi`.

- [ ] **Krok 1: Test, który nie przechodzi.** Dopisz na końcu `tests/data.test.js`:

```js
/* The climate (climate.js) against its research note: the numbers and the season letters are those of the tables in
   research/sezony-2026-10.md, every fair or poor month has a reason, and a reason that is a threshold of the note
   (section „Progi”) holds for the month's numbers. EXCEPT: the note's exception, Cát Tiên in November, whose park counts
   its rainy season to November although the station in the city gets less rain. */
dataCheck('climate', function (need) {
  var MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  var EXCEPT = { cattien: { 11: ['deszcz'] } }, notes = {};
  function n(s) { return +s.replace(',', '.'); }
  readFile('research/sezony-2026-10.md').split('\n## ').forEach(function (sec) {
    var m = /^([a-z]+): /.exec(sec), sun = /Słońce, h \(I–XII[^)]*\): ([\d, ]+)/.exec(sec), same = /Słońce jak w `([a-z]+)`/.exec(sec);
    if (!m || !SEASONS[m[1]]) return;
    var r = notes[m[1]] = { t: [], rain: [], letters: '', sun: sun ? sun[1].split(',').map(Number) : null, sunOf: same ? same[1] : null };
    sec.split('\n').forEach(function (line) {
      var c = line.split('|').map(function (x) { return x.trim(); }), t, w;
      if (c.length < 7 || MONTHS.indexOf(c[1]) < 0) return;
      t = /(-?[\d,]+)–(-?[\d,]+)/.exec(c[4]); w = /([\d,]+)\s*mm,\s*([\d,]+)\s*d/.exec(c[5]);
      r.letters += c[2];
      r.t.push(t ? [n(t[1]), n(t[2])] : null);
      r.rain.push(w ? [n(w[1]), n(w[2])] : null);
    });
  });
  need(CLIMATE.hanoiStop === CLIMATE.hanoi, 'a night in Hà Nội on the way has Hà Nội\'s climate');
  Object.keys(PLACES).forEach(function (id) {
    var c = CLIMATE[id], r = notes[PLACES[id].node || id];
    need(c && r, id + ': climate and its table in the research note');
    if (!c || !r) return;
    var sun = r.sun || (r.sunOf && notes[r.sunOf].sun);
    need(r.letters === SEASONS[id], id + ': the letters of the note, ' + r.letters + ', are the season in seasons.js');
    need(JSON.stringify(c.t) === JSON.stringify(r.t), id + ': t as in the note');
    need(JSON.stringify(c.rain) === JSON.stringify(r.rain), id + ': rain as in the note');
    Object.keys(c.why).forEach(function (k) { need(+k >= 1 && +k <= 12, id + ': why for month ' + k); });
    for (var mo = 1; mo <= 12; mo++) {
      var why = c.why[mo] || [], letter = SEASONS[id].charAt(mo - 1), t = c.t[mo - 1], w = c.rain[mo - 1], h = sun ? sun[mo - 1] : null, w2 = id + ' month ' + mo;
      need(letter === 'D' ? why.length === 0 : why.length > 0, w2 + ': ' + (letter === 'D' ? 'a good month has no reason' : 'season ' + letter + ' needs a reason'));
      why.forEach(function (code) {
        need(WEATHER_WHY.indexOf(code) > -1, w2 + ': unknown reason ' + code);
        if ((EXCEPT[id] && EXCEPT[id][mo] || []).indexOf(code) > -1) return;
        if (code === 'upal') need(t[1] >= 34, w2 + ': heat needs a mean high of 34 °C or more');
        if (code === 'deszcz') need(w[0] >= 160 && w[1] >= 13, w2 + ': rainy season needs 160 mm and 13 days with rain');
        if (code === 'ulewy') need(w[0] >= 300 && w[1] >= 16 && h !== null && h <= 150, w2 + ': downpours need 300 mm, 16 days with rain and at most 150 h of sun');
        if (code === 'szaro') need(h !== null && h <= 80, w2 + ': grey needs at most 80 h of sun');
        if (code === 'chlod') need(t[0] < 15 && h !== null && h <= 150, w2 + ': cold nights need a mean low under 15 °C and at most 150 h of sun');
      });
    }
  });
});
```

- [ ] **Krok 2: Uruchom i sprawdź, że test nie przechodzi**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: CLIMATE` (tests/data.test.js).

- [ ] **Krok 3: `site2/src/climate.js`.** Liczby przepisał skrypt z tabel researchu (kolumny „temperatura °C (min–maks)” i „opady (mm, dni z deszczem)”), powody wpisano z kolumny „dlaczego” według progów z sekcji „Progi”. Cały plik:

```js
/* The climate of each place by month, January first, from the tables in research/sezony-2026-10.md (the station named
   there for the place): t: [lowest, highest] mean daily temperature in °C; rain: [mm, days with rain]. why: by month 1–12,
   the reasons of a fair or poor month (S or Z in seasons.js), as codes of WEATHER_WHY; a good month has none.
   tests/data.test.js checks the numbers and the letters against the research tables and the reasons against its thresholds. */
// upal: heat; deszcz: rainy season; szaro: grey, little sun; chlod: cold nights under cloud; morze: cold sea; fale: rough sea;
// ulewy: downpours most days; tajfuny: typhoon season (sailing bans); powodzie: flood season
var WEATHER_WHY = ['upal', 'deszcz', 'szaro', 'chlod', 'morze', 'fale', 'ulewy', 'tajfuny', 'powodzie'];
var CLIMATE = {
  saigon: {
    t: [[23.4, 32], [23.1, 32.7], [24.9, 33.6], [26.4, 34.5], [26.4, 34.9], [25.5, 33.5], [25.2, 33], [25.1, 32.9], [25, 32.6], [25, 32.3], [24.9, 32.4], [23.9, 31.6]],
    rain: [[12, 2], [8, 1], [18, 1], [57, 4], [202, 13], [224, 16], [231, 19], [219, 17], [490, 18], [340, 16], [128, 9], [41, 5]],
    why: { 4: ['upal'], 5: ['upal', 'deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 10: ['deszcz'] }
  },
  mekong: {
    t: [[22.3, 30.2], [22.7, 31.2], [23.9, 32.7], [25, 33.9], [25.2, 33.2], [24.6, 32], [24.3, 31.4], [24.4, 31.2], [24.4, 31.1], [24.4, 31], [24.3, 30.7], [23, 29.7]],
    rain: [[10, 2], [3.8, 0.8], [15.4, 1.8], [41.8, 5.6], [223, 16.4], [310, 19.9], [336, 21.5], [338, 21.6], [451, 22.1], [301, 21.8], [137, 13.6], [41.5, 6.5]],
    why: { 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 10: ['deszcz'] }
  },
  phuquoc: {
    t: [[23, 30.6], [23.7, 31.1], [24.9, 32.1], [25.6, 32.5], [25.8, 31.6], [25.6, 30.4], [25.2, 29.8], [25.2, 29.6], [25, 29.5], [24.5, 30.2], [24.4, 30.7], [23.4, 30.3]],
    rain: [[27.7, 4.6], [27.2, 3.7], [61, 6.6], [148, 11.7], [281, 19], [382, 21], [419, 22.5], [486, 23.6], [474, 22.8], [354, 21.5], [163.5, 13.8], [59.1, 6.2]],
    why: { 5: ['deszcz', 'fale'], 6: ['ulewy', 'fale'], 7: ['ulewy', 'fale'], 8: ['ulewy'], 9: ['ulewy', 'fale'], 10: ['deszcz'], 11: ['deszcz'] }
  },
  cattien: {
    t: [[23.4, 32], [23.1, 32.7], [24.9, 33.6], [26.4, 34.5], [26.4, 34.9], [25.5, 33.5], [25.2, 33], [25.1, 32.9], [25, 32.6], [25, 32.3], [24.9, 32.4], [23.9, 31.6]],
    rain: [[12, 2], [8, 1], [18, 1], [57, 4], [202, 13], [224, 16], [231, 19], [219, 17], [490, 18], [340, 16], [128, 9], [41, 5]],
    why: { 4: ['upal'], 5: ['deszcz', 'upal'], 6: ['deszcz'], 7: ['deszcz'], 8: ['powodzie'], 9: ['powodzie'], 10: ['powodzie'], 11: ['deszcz'] }
  },
  dalat: {
    t: [[11.7, 22.3], [11.9, 23.9], [13, 25.1], [14.7, 25.3], [16.2, 24.7], [16.4, 23.6], [16.2, 23], [16.2, 22.7], [16, 22.9], [15.3, 22.8], [14.6, 21.7], [13.2, 21.4]],
    rain: [[9.1, 2.2], [20.5, 2.5], [64.1, 5.8], [170, 12.8], [212, 20.5], [203.5, 21.2], [233, 23.8], [238, 23.1], [283, 24], [245, 20], [93.5, 11.5], [36.2, 5.9]],
    why: { 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 10: ['deszcz'] }
  },
  hoian: {
    t: [[19.3, 25], [20.2, 26.2], [21.8, 28.3], [23.8, 31], [25.2, 33.3], [26, 34.5], [25.7, 34.4], [25.6, 33.9], [24.5, 31.8], [23.5, 29.5], [22.1, 27.4], [20, 25.1]],
    rain: [[81.9, 12], [23.6, 5.6], [25, 4.8], [35.3, 5.4], [81, 9.2], [82.6, 8.1], [92.5, 9.4], [141, 11.6], [351, 14.6], [628, 20], [448, 20.3], [218, 18.7]],
    why: { 6: ['upal'], 7: ['upal'], 9: ['deszcz'], 10: ['ulewy', 'powodzie'], 11: ['ulewy', 'powodzie'], 12: ['deszcz'] }
  },
  hue: {
    t: [[17.5, 23.5], [18.2, 24.5], [20.2, 27.5], [22.7, 31.1], [24.5, 33.5], [25.3, 34.7], [25.2, 34.7], [25.1, 34.2], [24.1, 31.7], [22.8, 29], [21, 26.5], [18.6, 23.8]],
    rain: [[129, 15.5], [63.3, 11.6], [51.3, 10.2], [58.9, 9.2], [111, 11.7], [103, 9.3], [94.6, 8.5], [139, 10.7], [411, 16.3], [773, 20.8], [642, 20.9], [350, 20.2]],
    why: { 6: ['upal'], 7: ['upal'], 8: ['upal'], 9: ['deszcz'], 10: ['ulewy', 'powodzie'], 11: ['ulewy', 'powodzie'], 12: ['ulewy'] }
  },
  puluong: {
    t: [[14, 20.6], [15.6, 21.9], [18.4, 24.9], [21.8, 29.4], [24, 32.9], [25.4, 33.9], [25.5, 33.6], [25.2, 32.8], [24.1, 31.7], [21.4, 29.2], [18.1, 26.1], [14.8, 22.6]],
    rain: [[20.5, 8.6], [14.9, 9.2], [35.1, 11.5], [95.5, 14], [244, 18.1], [269.8, 18.2], [310.6, 18.9], [325, 18.4], [285.5, 14.2], [183.9, 11.5], [55, 7.4], [17.2, 5.8]],
    why: { 1: ['chlod'], 2: ['szaro'], 3: ['szaro'], 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 12: ['chlod'] }
  },
  ninhbinh: {
    t: [[14.4, 19.6], [15.6, 20.2], [18.1, 22.5], [21.7, 27], [24.7, 31.3], [26.4, 33], [26.8, 33], [26.1, 32], [25, 30.8], [22.5, 28.7], [19.1, 25.4], [15.6, 21.8]],
    rain: [[27.3, 9.8], [27.4, 12.8], [50.4, 16.8], [85.7, 13.1], [175.9, 12.7], [192.1, 12.9], [240.2, 13.1], [298.5, 16.1], [315.4, 14.5], [202.3, 11.5], [66.1, 7], [27, 6.4]],
    why: { 1: ['szaro', 'chlod'], 2: ['szaro'], 3: ['szaro'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'] }
  },
  catba: {
    t: [[14.2, 19.8], [15.2, 20.1], [17.7, 22.2], [21.1, 26.4], [24.1, 30.6], [25.6, 32], [25.9, 32.1], [25.3, 31.5], [24.3, 30.8], [22, 29], [18.8, 25.8], [15.5, 22.1]],
    rain: [[28, 8.4], [27.4, 12.8], [48.5, 17.1], [85.3, 12.9], [201.6, 12.6], [238.1, 14.1], [238.1, 14.2], [353, 17.5], [257.1, 13.8], [136.3, 9.7], [43, 6.4], [22.8, 5.5]],
    why: { 1: ['morze', 'chlod'], 2: ['morze', 'szaro'], 3: ['morze', 'szaro'], 6: ['deszcz'], 7: ['tajfuny'], 8: ['tajfuny'], 9: ['tajfuny'], 12: ['morze'] }
  },
  hanoi: {
    t: [[14.6, 20], [16.2, 21.3], [18.7, 23.5], [21.9, 27.7], [24.5, 31.7], [26.3, 33.8], [26.5, 33.3], [25.8, 32.5], [24.7, 31.6], [22.4, 29.6], [19.2, 26.3], [15.4, 22.1]],
    rain: [[28, 11], [19, 12], [55, 18], [79, 16], [188, 17], [231, 16], [300, 18], [335, 18], [195, 14], [126, 10], [48, 7], [24, 7]],
    why: { 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'] }
  },
  babe: {
    t: [[12.1, 19.1], [13.7, 19.9], [16.9, 23.1], [20.3, 27.3], [22.7, 31.2], [24.1, 32.3], [24.4, 32.4], [24.1, 32.4], [22.6, 31.4], [19.8, 28.6], [15.9, 25], [12.6, 21.6]],
    rain: [[22, 9.2], [29, 9.8], [55, 13.2], [113, 14.2], [184, 15.5], [272, 17.4], [280, 19.1], [277, 18.9], [149, 13], [86, 10.1], [42, 7.3], [19, 5.9]],
    why: { 1: ['chlod', 'szaro'], 2: ['chlod', 'szaro'], 3: ['szaro'], 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 12: ['chlod'] }
  },
  caobang: {
    t: [[10, 18], [12, 19], [16, 23], [19, 27], [23, 31], [24, 32], [24, 32], [24, 32], [22, 31], [19, 27], [15, 24], [11, 20]],
    rain: [[22, 10], [26, 10], [39, 12], [91, 14], [174, 15], [229, 17], [224, 18], [249, 19], [150, 14], [91, 12], [44, 9], [20, 8]],
    why: { 1: ['chlod', 'szaro'], 2: ['chlod', 'szaro'], 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 12: ['chlod'] }
  }
};
CLIMATE.hanoiStop = CLIMATE.hanoi;   // a night in Hà Nội on the way
```

Skąd powody tam, gdzie liczby nie wystarczą (sprawdza je tylko obecność, nie próg): `morze` (Cát Bà I–III i XII: morze 21–23 °C), `fale` (Phú Quốc V–VII i IX: monsun i fale na zachodnim wybrzeżu), `tajfuny` (Cát Bà VII–IX: zakazy wypływania w kolejnych latach), `powodzie` (Cát Tiên VIII–X: wezbranie Đồng Nai; Hội An i Huế X–XI: zalane starówka i Đại Nội). Cát Tiên w listopadzie ma `deszcz` mimo 128 mm na stacji w mieście: to wyjątek z tabeli „Wyjątki dla miejsca” (park liczy porę deszczową do listopada).

- [ ] **Krok 4: Kolejność skryptów.** W `site2/build.py` w `SCRIPTS` zamień `"places.js", "seasons.js", "travel.js"` na `"places.js", "seasons.js", "climate.js", "travel.js"`. W `tests/run.sh` w `SOURCES` zamień `site2/src/seasons.js site2/src/travel.js` na `site2/src/seasons.js site2/src/climate.js site2/src/travel.js`.

- [ ] **Krok 5: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `climate ok` w części `tests/data.test.js` i `ALL PASS`. Sprawdź jeszcze, że test łapie błąd: zmień na chwilę w `climate.js` powód Hội An w czerwcu z `upal` na `deszcz`; test wypisuje „hoian month 6: rainy season needs 160 mm and 13 days with rain”. Cofnij zmianę.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/climate.js site2/build.py tests/run.sh tests/data.test.js
git commit -F - <<'EOF'
Dane: klimat 13 miejsc w 12 miesiącach z researchu, z powodami ocen sezonu; test zgodności z tabelami i progami researchu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Pogoda, plan na deszcz, wydarzenia i zły sezon zainteresowania

Czyste funkcje dla karty miejsca i ostrzeżeń oraz wydarzenia w treści ośmiu miejsc. Zdania prawdziwe tylko w części roku przechodzą z opisów dni do wydarzeń.

**Pliki:**
- Zmień: `site2/src/page.js`, `site2/src/content.js` (opis pól), `site2/src/content/{puluong,caobang,mekong,phuquoc,cattien,ninhbinh,hoian,hue}.js`, `research/sezony-2026-10.md`
- Test: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Używa: `CLIMATE`, `WEATHER_WHY` (zadanie 4); `tripDate` (page.js); `planRoute` (engine.js, w testach).
- Daje (page.js):
  - `RAIN_PLAN_DAYS = 10`;
  - `stayWeather(stop, months, climate, seasons)` → `[{ month, season, t: [min, max], mm, days, why }]`, liczby zaokrąglone;
  - `rainyMonth(placeClimate, month)` → `true`, gdy w miesiącu (1–12) jest co najmniej `RAIN_PLAN_DAYS` dni z deszczem po zaokrągleniu;
  - `stayEvents(c, stop, st)` → wpisy `c.events`, w których okno trafia pobyt;
  - `interestAlerts(route, st, places, climate)` → `[{ interest, none: true }]` albo `[{ interest, ids, why, months }]`.
- Pole treści `events: [{ from: [miesiąc, dzień], to: [miesiąc, dzień], t, warn? }]`; okno może przechodzić przez Nowy Rok.
- `DATA_T` na początku `tests/page.test.js`: dane tras jak w `app.js`, dla tego i kolejnych zadań.

- [ ] **Krok 1: Testy, które nie przechodzą.** W `tests/page.test.js` pod pierwszą linią (komentarzem) dopisz:

```js
var DATA_T = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };   // the real data, as app.js plans with it
```

a przed komentarzem `/* ---------- the trip ---------- */` dopisz:

```js
/* ---------- weather, events and the season of an interest ---------- */
var MAR = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], MARAPR = [2, 2, 3, 3, 3, 3, 3, 3, 3, 3];
eq(stayWeather({ id: 'hue', start: 3, n: 2 }, MAR, CLIMATE, SEASONS), [{ month: 3, season: 'D', t: [20, 28], mm: 51, days: 10, why: [] }],
  'the weather of a stay: its month, rounded as the page shows it');
eq(stayWeather({ id: 'saigon', start: 2, n: 2 }, MARAPR, CLIMATE, SEASONS).map(function (w) { return [w.month, w.season, w.t, w.why]; }),
  [[3, 'D', [25, 34], []], [4, 'S', [26, 35], ['upal']]], 'a stay over two months: both, each with its reasons');
var FCL = { rain: [[90, 10], [80, 9.4], [70, 9.6]] };
eq([rainyMonth(FCL, 1), rainyMonth(FCL, 2), rainyMonth(FCL, 3), RAIN_PLAN_DAYS], [true, false, true, 10],
  'the rain plan from 10 days of rain, counted as the page rounds them (9.6 shows as 10)');
eq([rainyMonth(CLIMATE.saigon, 2), rainyMonth(CLIMATE.saigon, 9)], [false, true], 'Hồ Chí Minh City: no rain plan in February, one in September');
var FEV = { events: [{ from: [5, 25], to: [6, 15], t: 'A' }, { from: [11, 1], to: [4, 30], t: 'B' }, { from: [12, 24], to: [12, 26], t: 'C', warn: true }] };
function evs(st, stop) { return stayEvents(FEV, stop, st).map(function (e) { return e.t; }); }
var stJun = stOf({ from: 'SGN', to: 'HAN', start: '2027-06-13', end: '2027-06-20' });
eq([evs(stJun, { start: 2, n: 2 }), evs(stJun, { start: 4, n: 2 })], [['A'], []], 'dates: an event on the last day of its window counts, the day after not');
eq(evs(stOf({ from: 'SGN', to: 'HAN', start: '2027-12-29', end: '2028-01-05' }), { start: 1, n: 5 }), ['B'], 'a window over the new year, and a stay over it');
eq([evs(stOf({ from: 'SGN', to: 'HAN', year: 2027, month: 12, days: 10 }), { start: 1, n: 3 }), evs(stOf({ from: 'SGN', to: 'HAN', year: 2027, month: 7, days: 10 }), { start: 1, n: 3 })],
  [['B', 'C'], []], 'the month mode: the whole month counts, as for the holidays');
eq(stayEvents({ days: [] }, { start: 1, n: 2 }, stJun), [], 'a place without events');
function alertsOf(s) { var st = stOf(s); return interestAlerts(planRoute(st, DATA_T), st, PLACES, CLIMATE); }
eq(alertsOf({ from: 'HAN', to: 'DAD', year: 2027, month: 9, days: 7, interests: ['morze'], level: 2 }), [{ interest: 'morze', ids: ['catba'], why: ['tajfuny'], months: [9] }],
  'the sea in September: Cát Bà, the only sea on the trip, in its typhoon season');
eq(alertsOf({ from: 'DAD', to: 'DAD', year: 2027, month: 7, days: 5, interests: ['morze', 'kultura'], level: 2 }), [{ interest: 'morze', none: true }],
  'five days from Đà Nẵng in July: no place on the trip for the sea; culture is served');
eq(alertsOf({ from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: ['morze'], level: 2 }), [], 'the sea in March: Phú Quốc in a good season, no alert');
eq(alertsOf({ from: 'HAN', to: 'DAD', year: 2027, month: 9, days: 7, interests: [], level: 2 }), [], 'no interest chosen: no alert');
print('weather and events ok');

```

W `tests/content.test.js`, w sprawdzeniu `content`: do listy `PLACE_KEYS` dopisz na końcu `'events'`, pod nią dodaj funkcję

```js
  function monthDay(v) { return Array.isArray(v) && v.length === 2 && v[0] % 1 === 0 && v[0] >= 1 && v[0] <= 12 && v[1] % 1 === 0 && v[1] >= 1 && v[1] <= 31; }
```

a pod linią `need((c.skip == null) === (c.instead == null), id + ': skip and instead go together');` dopisz:

```js
    if (c.events != null) need(Array.isArray(c.events) && c.events.length > 0, id + ': events is a list with entries');
    (Array.isArray(c.events) ? c.events : []).forEach(function (e, i) {
      var w = id + ' event ' + (i + 1);
      Object.keys(e).forEach(function (k) { need(['from', 'to', 't', 'warn'].indexOf(k) > -1, w + ': unknown field ' + k); });
      need(monthDay(e.from) && monthDay(e.to), w + ': from and to as [month, day]');
      need(isText(e.t), w + ': text t');
      if (e.warn != null) need(e.warn === true, w + ': warn is true or left out');
    });
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: stayWeather` (tests/page.test.js).

- [ ] **Krok 3: `site2/src/page.js`.** Przed komentarzem `/* ---------- the trip ---------- */` dopisz:

```js
/* ---------- weather, events and the season of an interest ---------- */
var RAIN_PLAN_DAYS = 10;   // a day's rain plan shows in a month with this many days of rain or more (climate.js, as the page rounds it)

/* The weather of one stay, month by month: [{ month: 1–12, season: 'D'|'S'|'Z'|'X', t: [min, max], mm, days, why: [codes] }],
   one entry for each month the stay's days (start…end) fall in, in order, the numbers rounded as the page shows them.
   stop: { id, start, n }; months: st.months (0–11 for each trip day); climate: CLIMATE; seasons: SEASONS. */
function stayWeather(stop, months, climate, seasons) {
  var c = climate[stop.id], out = [];
  for (var d = stop.start; d < stop.start + stop.n; d++) {
    var m = months[d - 1] + 1;
    if (out.length && out[out.length - 1].month === m) continue;
    out.push({ month: m, season: seasons[stop.id].charAt(m - 1), t: [Math.round(c.t[m - 1][0]), Math.round(c.t[m - 1][1])],
      mm: Math.round(c.rain[m - 1][0]), days: Math.round(c.rain[m - 1][1]), why: (c.why[m] || []).slice() });
  }
  return out;
}

/* Whether a day's rain plan shows: in month (1–12) the place has RAIN_PLAN_DAYS days of rain or more. placeClimate: CLIMATE[id]. */
function rainyMonth(placeClimate, month) { return Math.round(placeClimate.rain[month - 1][1]) >= RAIN_PLAN_DAYS; }

/* The events and seasonal notes of a place that a stay meets: the entries of c.events ({ from, to, t, warn }; from and to
   as [month, day], every year, and a window may run over the new year) that touch the stay's days (start…end). With dates
   the days themselves count; in the month mode, as for the holidays, the whole month of the trip.
   c: the place's content; stop: { start, n }; st: normSettings' result. */
function stayEvents(c, stop, st) {
  var days = [], d, iso;   // each day as month × 100 + day
  if (st.start) for (d = stop.start; d < stop.start + stop.n; d++) { iso = tripDate(st.start, d); days.push(+iso.slice(5, 7) * 100 + +iso.slice(8)); }
  else for (d = 1; d <= 31; d++) days.push(st.month * 100 + d);
  return (c.events || []).filter(function (e) {
    var a = e.from[0] * 100 + e.from[1], b = e.to[0] * 100 + e.to[1];
    return days.some(function (x) { return a <= b ? x >= a && x <= b : x >= a || x <= b; });
  });
}

/* The chosen interests that the trip serves badly. For each chosen interest, the stays that serve it (fit 2 or more; a
   night on the way does not count): when there is none, { interest, none: true }; when each of them has only poor nights
   (Z), { interest, ids: their places, each once, why: the reasons of those months, each once, months: those months (1–12),
   each once, in order }. Otherwise nothing. route: planRoute's trip; st: normSettings' result; climate: CLIMATE. */
function interestAlerts(route, st, places, climate) {
  var out = [];
  st.interests.forEach(function (k) {
    var serving = route.stops.filter(function (s) { return !places[s.id].node && (places[s.id].fit[k] || 0) >= 2; });
    if (!serving.length) { out.push({ interest: k, none: true }); return; }
    if (!serving.every(function (s) { return /^Z+$/.test(s.season); })) return;
    var a = { interest: k, ids: [], why: [], months: [] };
    serving.forEach(function (s) {
      if (a.ids.indexOf(s.id) < 0) a.ids.push(s.id);
      for (var d = s.start; d < s.start + s.n; d++) {
        var m = st.months[d - 1] + 1;
        if (a.months.indexOf(m) < 0) a.months.push(m);
        (climate[s.id].why[m] || []).forEach(function (w) { if (a.why.indexOf(w) < 0) a.why.push(w); });
      }
    });
    out.push(a);
  });
  return out;
}

```

- [ ] **Krok 4: Opis pola w `site2/src/content.js`.** Pod opisem pola `again` (dwie linie zaczynające się od `- again:`) dopisz:

```js
   - events: what happens at the place in some weeks of every year, shown in its card when a stay meets them:
     [{ from, to, t, warn? }], from and to as [month, day] (a window may run over the new year); t: what to know, in a sentence or
     two; warn: true for a caution (high water, floods, leeches) rather than an event; sources in research/sezony-2026-10.md;
```

- [ ] **Krok 5: Wydarzenia w treści.** Na końcu obiektu każdego z ośmiu miejsc (po ostatnim polu, które dostaje przecinek, przed `};`) dopisz pole `events`:

```js
// content/puluong.js
  events: [
    { from: [5, 25], to: [6, 15], t: 'Złote tarasy: ryż dojrzewa tu zwykle od końca maja do połowy czerwca. Termin przesuwa się z roku na rok i różni się między wioskami, więc zapytaj gospodarzy.' },
    { from: [9, 25], to: [10, 10], t: 'Złote tarasy: ryż dojrzewa tu zwykle od końca września do początku października. Termin przesuwa się z roku na rok i różni się między wioskami, więc zapytaj gospodarzy.' }
  ]
// content/caobang.js
  events: [
    { from: [9, 20], to: [10, 10], t: 'Najlepszy czas na Bản Giốc: pod koniec września i na początku października wodospad jest szeroki, a pora deszczowa się kończy.' }
  ]
// content/mekong.js
  events: [
    { from: [6, 1], to: [8, 31], t: 'Sezon owoców: od czerwca do sierpnia sady wokół Cần Thơ są pełne owoców.' },
    { from: [9, 1], to: [11, 30], warn: true, t: 'Wysoka woda: od września do listopada przypływy są najwyższe ok. 6:00–8:00 i 17:00–19:00. Godzinę porannego rejsu na targ ustal z gospodarzami według tablicy przypływów.' }
  ]
// content/phuquoc.js
  events: [
    { from: [11, 1], to: [4, 30], t: 'Pora rozgwiazd: od listopada do kwietnia morze przy Rạch Vẹm jest spokojne, a woda czysta, więc rozgwiazdy dobrze widać. Patrz, nie podnoś.' }
  ]
// content/cattien.js
  events: [
    { from: [4, 1], to: [11, 30], warn: true, t: 'Pora deszczowa w parku: na leśne ścieżki weź skarpety przeciw pijawkom, bo park uważa je wtedy za potrzebne.' }
  ]
// content/ninhbinh.js
  events: [
    { from: [7, 1], to: [9, 30], warn: true, t: 'Pora deszczowa i tajfunów: gdy woda w jaskiniach Tràng An stoi wysoko, łodzie płyną zmienioną trasą, a przed burzą rejsy bywają wstrzymane na kilka dni. Dzień wcześniej sprawdź komunikat przystani.' }
  ]
// content/hoian.js
  events: [
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach rzeka Thu Bồn potrafi zalać stare miasto i na kilka dni wstrzymać zwiedzanie. Sprawdzaj prognozy i miej plan w zapasie.' }
  ]
// content/hue.js
  events: [
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach woda potrafi zalać Cytadelę i zamknąć Đại Nội na kilka dni. Sprawdzaj prognozy i komunikaty przed zwiedzaniem.' }
  ]
```

- [ ] **Krok 6: Zdania z części roku wychodzą z opisów dni** (mówią je teraz wydarzenia). Usuń z tekstów (razem ze spacją przed zdaniem):
  - `content/cattien.js`, dzień p 1, pole `d`: ` W porze deszczowej, od kwietnia do listopada, zabierz na leśne ścieżki skarpety przeciw pijawkom.`;
  - `content/cattien.js`, dzień p 1, `solo.d`: ` W porze deszczowej, od kwietnia do listopada, zabierz skarpety przeciw pijawkom.`;
  - `content/mekong.js`: ` W porze wysokiej wody, od września do listopada, godzinę wypłynięcia ustal z gospodarzami, bo zależy od przypływu.` w trzech miejscach: `solo.d` dnia p 1, `d` dnia p 2 i `easy.d` dnia p 2;
  - `content/ninhbinh.js`, dzień p 2, `d` i `easy.d`: ` Po ulewach wysoka woda w jaskiniach potrafi zamknąć albo zmienić część tras łodzi.`.

  W `content/puluong.js`, dzień p 3, zamień:

```js
długi obiad u gospodarzy. Złote tarasy są tu zwykle dwa razy w roku: od końca maja do połowy czerwca i od końca września do początku października; po żniwach poranki bywają mgliste i ciche.
```

  na:

```js
długi obiad u gospodarzy. Po żniwach poranki bywają tu mgliste i ciche.
```

- [ ] **Krok 7: Źródła wydarzeń.** W `research/sezony-2026-10.md`, przed nagłówkiem `### Miesiące graniczne`, dopisz:

```markdown
### Na stronie: wydarzenia i uwagi sezonowe (11.10.2026)

Pole `events` w `site2/src/content/<id>.js`. Karta miejsca pokazuje wpis, gdy pobyt trafia w jego okno; okno jest takie samo co roku. Okna wzięto z punktów wyżej; tam, gdzie źródło podaje porę miesiąca („koniec września”), okno ją zaokrągla.

| miejsce | okno | wpis | źródło |
|---|---|---|---|
| puluong | 25.05–15.06 | złote tarasy, termin zależy od roku i wioski | L1, L2 |
| puluong | 25.09–10.10 | złote tarasy, termin zależy od roku i wioski | L1, L2 |
| caobang | 20.09–10.10 | najlepszy czas na Bản Giốc | B2 |
| mekong | 1.06–31.08 | sezon owoców | VT-CanTho |
| mekong | 1.09–30.11 | uwaga: wysoka woda, szczyty przypływu ok. 6–8 i 17–19, rejs na targ według tablicy przypływów | VT-CanTho, VNnews-2026-09-29 |
| phuquoc | 1.11–30.04 | pora rozgwiazd w Rạch Vẹm: spokojne morze, czysta woda | SunPQ |
| cattien | 1.04–30.11 | uwaga: pora deszczowa w parku, skarpety przeciw pijawkom | CT-park |
| ninhbinh | 1.07–30.09 | uwaga: wysoka woda zmienia trasę łodzi w Tràng An, przed burzą rejsy wstrzymane na kilka dni (po jednym roku w lipcu, sierpniu i wrześniu) | N1, N2, N3 |
| hoian | 1.10–30.11 | uwaga: szczyt pory powodzi, Thu Bồn potrafi zalać starówkę i wstrzymać zwiedzanie | TT-2025-11-01, DT-2025-11-19 |
| hue | 1.10–30.11 | uwaga: szczyt pory powodzi, woda potrafi zalać Cytadelę i zamknąć Đại Nội | AJ-2025-10-28, VP-2025-10-30 |

```

- [ ] **Krok 8: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `weather and events ok` i `ALL PASS`.

- [ ] **Krok 9: Commit**

```bash
git add site2/src/page.js site2/src/content.js site2/src/content research/sezony-2026-10.md tests/page.test.js tests/content.test.js
git commit -F - <<'EOF'
Strona: pogoda pobytu, plan na deszcz według miesiąca, wydarzenia w treści ośmiu miejsc i komunikat o złym sezonie zainteresowania (czyste funkcje)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: „Wybrane, bo…”, „Nie ma na twojej trasie, bo…” i raport po „Dodaj”

Czyste funkcje powodów. Strona zacznie ich używać w zadaniu 9; do tego czasu stara lista „Poza trasą” (`offRoute`) zostaje.

**Pliki:**
- Zmień: `site2/src/page.js`
- Test: `tests/page.test.js`

**Interfejsy:**
- Używa: `normSettings`, `planRoute` (engine.js), `withAdded`, `droppedPlaces` (page.js), `CLIMATE` (zadanie 4).
- Daje (page.js):
  - `whyOn(route, i, st, places, hubs)` → `{ night: [id przed, id po] }` dla nocy w drodze, inaczej `{ added, airport: 'from'|'to'|null, interests: [...], way, months: [{ month, season }] }`;
  - `whyOff(route, settings, st, data, climate)` → `[{ id, reasons, why, canAdd, drops, added }]` z południa na północ; powody: `removed`, `level`, `closed`, `season`, `profile`, `far`, a gdy żaden: `beaten`;
  - `addReport(before, after, added, places)` → `{ left: [...], came: [...] }`.

- [ ] **Krok 1: Testy, które nie przechodzą.** W `tests/page.test.js`, przed komentarzem `/* ---------- travel texts ---------- */`, dopisz:

```js
/* ---------- why a place is on the trip or not ---------- */
function tripOf(s, data) { var st = stOf(s); return { st: st, r: planRoute(st, data || DATA_T) }; }
var MARCH = { from: 'SGN', to: 'HAN', year: 2027, month: 3, days: 15, interests: [], level: 2, add: [], remove: [] };
var tA = tripOf(MARCH);   // saigon 3, dalat 3, hoian 2, hue 3, hanoi 3, all D
eq(tA.r.stops.map(function (s) { return s.id; }), ['saigon', 'dalat', 'hoian', 'hue', 'hanoi'], 'the trip the next checks read');
eq(whyOn(tA.r, 0, tA.st, PLACES, HUBS), { added: false, airport: 'from', interests: ['jedzenie', 'kultura'], way: false, months: [{ month: 3, season: 'D' }] },
  'the arrival city, no interest chosen: its two strongest interests, the strongest first');
eq([whyOn(tA.r, 4, tA.st, PLACES, HUBS).airport, whyOn(tA.r, 4, tA.st, PLACES, HUBS).interests, whyOn(tA.r, 1, tA.st, PLACES, HUBS).airport],
  ['to', ['kultura', 'jedzenie'], null], 'the departure city; a tie goes in the order of INTERESTS; a stay in the middle is no airport\'s city');
var tB = tripOf(Object.assign({}, MARCH, { interests: ['przyroda'] }));   // saigon 2, cattien 2, dalat 4, ninhbinh 2, catba 4
eq([whyOn(tB.r, 0, tB.st, PLACES, HUBS).interests, whyOn(tB.r, 0, tB.st, PLACES, HUBS).way, whyOn(tB.r, 1, tB.st, PLACES, HUBS).interests, whyOn(tB.r, 1, tB.st, PLACES, HUBS).way],
  [[], false, ['przyroda'], false], 'nature chosen: the arrival city serves it not, but it is the airport\'s city (no "po drodze"); Cát Tiên serves it');
var tC = tripOf(Object.assign({}, MARCH, { interests: ['gory'] }));   // cattien, dalat, ninhbinh, babe, caobang, hanoi 1
eq([whyOn(tC.r, 0, tC.st, PLACES, HUBS).way, whyOn(tC.r, 0, tC.st, PLACES, HUBS).interests], [true, []], 'mountains chosen: Cát Tiên (fit 1) fills the days on the way');
var tD = tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['przyroda', 'gory'], level: 2 });   // ninhbinh, catba, hanoiStop, babe, caobang, hanoi
eq(whyOn(tD.r, 2, tD.st, PLACES, HUBS), { night: ['catba', 'babe'] }, 'a night on the way: the places before and after it');
eq([whyOn(tD.r, 4, tD.st, PLACES, HUBS).interests, whyOn(tD.r, 1, tD.st, PLACES, HUBS).interests], [['przyroda', 'gory'], ['przyroda']],
  'Cao Bằng serves both chosen interests, Cát Bà (mountains 1) one');
var tG = tripOf({ from: 'SGN', to: 'HAN', start: '2027-03-28', end: '2027-04-12', interests: [], level: 2 });   // saigon 3, dalat 3, hoian 2, catba 4, hanoi 3
eq([whyOn(tG.r, 0, tG.st, PLACES, HUBS).months, whyOn(tG.r, 1, tG.st, PLACES, HUBS).months], [[{ month: 3, season: 'D' }], [{ month: 3, season: 'D' }, { month: 4, season: 'D' }]],
  'dates: Hồ Chí Minh City on 28–30 March, Đà Lạt from 31 March into April, each month once');
var tI = tripOf(Object.assign({}, MARCH, { add: ['mekong'] }));
eq(whyOn(tI.r, 1, tI.st, PLACES, HUBS).added, true, 'a place Dodaj asked for');

function offOf(t, settings, data) { return whyOff(t.r, settings, t.st, data || DATA_T, CLIMATE); }
var oA = offOf(tA, MARCH), byId = function (list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; };
eq(oA.map(function (x) { return x.id; }), ['mekong', 'phuquoc', 'cattien', 'puluong', 'ninhbinh', 'catba', 'babe', 'caobang'], 'off the trip: south to north, no night on the way');
eq([byId(oA).mekong.reasons, byId(oA).mekong.canAdd, byId(oA).mekong.drops], [['beaten'], true, droppedPlaces(tA.r.stops, tI.r.stops, PLACES)],
  'the Mekong in March: nothing against it, other places won; Dodaj, and what it would push off the trip');
var tF = tripOf(Object.assign({}, MARCH, { month: 7 })), oF = byId(offOf(tF, Object.assign({}, MARCH, { month: 7 })));
eq([oF.phuquoc.reasons, oF.phuquoc.why, oF.phuquoc.canAdd], [['season'], ['ulewy', 'fale'], true], 'Phú Quốc in July: out of season, with the reasons of July');
var oB = byId(offOf(tB, Object.assign({}, MARCH, { interests: ['przyroda'] })));
eq([oB.hoian.reasons.indexOf('profile') > -1, oB.puluong.reasons.indexOf('profile') > -1], [true, false], 'nature chosen: Hội An (fit 0) is no match, Pù Luông (fit 2) is');
var E5 = { from: 'SGN', to: 'SGN', year: 2027, month: 3, days: 5, interests: [], level: 2, add: [], remove: [] }, oE = byId(offOf(tripOf(E5), E5));
eq([oE.caobang.reasons, oE.caobang.canAdd, oE.caobang.drops], [['far'], false, []], 'Cao Bằng on five days from Hồ Chí Minh City: too far, no Dodaj');
var E5add = Object.assign({}, E5, { add: ['caobang'] }), oE2 = byId(offOf(tripOf(E5add), E5add));
eq([oE2.caobang.added, oE2.caobang.reasons, oE2.caobang.canAdd], [true, ['far'], false], 'asked for with Dodaj and not fitted: still too far, marked as added');
var H = Object.assign({}, MARCH, { remove: ['hoian'] }), oH = byId(offOf(tripOf(H), H));
eq([oH.hoian.reasons, oH.hoian.canAdd], [['removed'], true], 'removed with Usuń: said so, and Dodaj brings it back');
// a place that needs a higher level, and one closed all the trip: made up, since none of the 12 places is either yet
var P3 = JSON.parse(JSON.stringify(PLACES)), S3 = JSON.parse(JSON.stringify(SEASONS));
P3.catba.level = 3; S3.babe = 'XXXXXXXXXXXX';
var D3 = { places: P3, seasons: S3, graph: DATA_T.graph, hubs: HUBS }, st3 = normSettings(MARCH, P3, HUBS), o3 = byId(whyOff(planRoute(st3, D3), MARCH, st3, D3, CLIMATE));
eq([o3.catba.reasons, o3.catba.canAdd, o3.babe.reasons, o3.babe.canAdd], [['level'], false, ['closed'], false], 'a higher level and a closed place: no Dodaj');
eq(whyOff(planRoute(normSettings(Object.assign({}, MARCH, { level: 3 }), P3, HUBS), D3), Object.assign({}, MARCH, { level: 3 }), normSettings(Object.assign({}, MARCH, { level: 3 }), P3, HUBS), D3, CLIMATE)
  .filter(function (x) { return x.id === 'catba'; })[0].reasons.indexOf('level'), -1, 'at the level it needs, the level is no reason');

eq(addReport(stopsOf(['saigon', 'dalat', 'hue', 'hanoi']), stopsOf(['saigon', 'phuquoc', 'dalat', 'hoian', 'hanoi']), 'phuquoc', PLACES), { left: ['hue'], came: ['hoian'] },
  'after Dodaj: what left the trip and what came besides the added place');
eq(addReport(stopsOf(['saigon', 'dalat', 'hanoi']), stopsOf(['saigon', 'phuquoc', 'dalat', 'hanoi']), 'phuquoc', PLACES), { left: [], came: [] }, 'only the added place came');
print('why ok');
```

Trasy w testach pochodzą z prawdziwych danych 11.10.2026 (np. marzec, 15 dni z Hồ Chí Minh City do Hà Nội: Hồ Chí Minh City, Đà Lạt, Hội An, Huế, Hà Nội). Pierwszy test pilnuje, że trasa jest wciąż ta sama; gdy dane się zmienią, wymień trasy w testach zamiast wyłączać sprawdzenia.

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: whyOn` (tests/page.test.js).

- [ ] **Krok 3: `site2/src/page.js`.** Przed komentarzem `/* Dodaj and Usuń on a copy of the settings: …` dopisz:

```js
/* ---------- why a place is on the trip or not ---------- */
/* Why stay i of the trip is on it, for "Wybrane, bo…". A night on the way: { night: [the place before, the place after] }.
   Otherwise { added, airport, interests, way, months }: added: Dodaj asked for it; airport: 'from' when it opens the trip
   as the city of the arrival airport, 'to' when it closes the trip as the city of the departure airport, else null;
   interests: the chosen interests it serves (fit 2 or more), or, with none chosen, its two strongest of fit 2 or more
   (by fit, then in the order of INTERESTS); way: interests are chosen, it serves none and is no airport's city (it fills
   the days on the way); months: [{ month: 1–12, season }] of its days, each month once, in order.
   route: planRoute's trip; st: normSettings' result; hubs: HUBS. */
function whyOn(route, i, st, places, hubs) {
  var s = route.stops[i], p = places[s.id], last = route.stops.length - 1, months = [];
  if (p.node) return { night: [route.stops[i - 1].id, route.stops[i + 1].id] };
  var chosen = st.interests.filter(function (k) { return (p.fit[k] || 0) >= 2; });
  var strongest = INTERESTS.filter(function (k) { return (p.fit[k] || 0) >= 2; })
    .sort(function (a, b) { return p.fit[b] - p.fit[a] || INTERESTS.indexOf(a) - INTERESTS.indexOf(b); }).slice(0, 2);
  var airport = i === 0 && s.id === hubs[st.from] ? 'from' : i === last && s.id === hubs[st.to] ? 'to' : null;
  for (var d = s.start; d < s.start + s.n; d++) {
    var m = st.months[d - 1] + 1;
    if (!months.length || months[months.length - 1].month !== m) months.push({ month: m, season: s.season.charAt(d - s.start) });
  }
  return { added: st.add.indexOf(s.id) > -1, airport: airport, interests: st.interests.length ? chosen : strongest,
    way: st.interests.length > 0 && !chosen.length && !airport, months: months };
}

/* Why each place off the trip is not on it, south to north: every place without a node that is no stay of the trip.
   reasons, each one that holds, in this order: 'removed' (Usuń took it off); 'level' (it needs a higher level); 'closed'
   (closed, X, in every month of the trip); 'season' (poor, Z, in every month of the trip); 'profile' (interests are chosen
   and it serves none of them, fit under 2); 'far' (it does not fit in: with it added, the trip leaves it missing). When
   none holds: 'beaten' (with this many days, other places scored more). why: the reasons of its poor months (CLIMATE),
   each once. canAdd: Dodaj can put it on the trip (not when it needs a higher level, is closed or does not fit). drops:
   the places that would leave the trip if it were added (droppedPlaces). added: Dodaj asked for it.
   Returns [{ id, reasons, why, canAdd, drops, added }]. settings: as in the link (Dodaj builds on them); st: their
   normSettings' result; route: planRoute's trip for them; data: planRoute's data; climate: CLIMATE. */
function whyOff(route, settings, st, data, climate) {
  var P = data.places, on = {}, seen = {}, months = [];
  route.stops.forEach(function (s) { on[s.id] = true; });
  st.months.forEach(function (m) { if (!seen[m]) { seen[m] = true; months.push(m + 1); } });
  return Object.keys(P).filter(function (id) { return !P[id].node && !on[id]; })
    .sort(function (a, b) { return P[a].axis - P[b].axis || (a < b ? -1 : 1); })
    .map(function (id) {
      var p = P[id], code = data.seasons[id], x = { id: id, reasons: [], why: [], canAdd: true, drops: [], added: st.add.indexOf(id) > -1 };
      function every(letter) { return months.every(function (m) { return code.charAt(m - 1) === letter; }); }
      if (st.remove.indexOf(id) > -1) x.reasons.push('removed');
      if (p.level > st.level) x.reasons.push('level');
      if (every('X')) x.reasons.push('closed');
      if (every('Z')) {
        x.reasons.push('season');
        months.forEach(function (m) { (climate[id].why[m] || []).forEach(function (w) { if (x.why.indexOf(w) < 0) x.why.push(w); }); });
      }
      if (st.interests.length && st.interests.every(function (k) { return (p.fit[k] || 0) < 2; })) x.reasons.push('profile');
      if (p.level > st.level || every('X')) { x.canAdd = false; return x; }
      var withIt = normSettings(withAdded(settings, id), P, data.hubs), r = withIt.ok ? planRoute(withIt, data) : null;
      if (!r || !r.ok || r.missing.indexOf(id) > -1) { x.reasons.push('far'); x.canAdd = false; }
      else x.drops = droppedPlaces(route.stops, r.stops, P);
      if (!x.reasons.length) x.reasons.push('beaten');
      return x;
    });
}

/* What Dodaj changed besides the added place: left, the places on the old trip that the new one has not; came, the places
   on the new trip that the old one had not, the added place left out; each in the order of its trip (droppedPlaces:
   a night on the way is no place to report, a city twice on a round trip counts once). */
function addReport(before, after, added, places) {
  return { left: droppedPlaces(before, after, places),
    came: droppedPlaces(after, before, places).filter(function (id) { return id !== added; }) };
}

```

- [ ] **Krok 4: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `why ok` i `ALL PASS`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/page.js tests/page.test.js
git commit -F - <<'EOF'
Strona: powody przy miejscach na trasie i poza nią, z zapowiedzią, co wypadnie po Dodaj, oraz raport po Dodaj (czyste funkcje)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Ustawienia domyślne: najlepszy miesiąc

**Pliki:**
- Zmień: `site2/src/page.js` (`defaultSettings`), `site2/src/app.js` (`DEFAULTS`)
- Test: `tests/page.test.js`

**Interfejsy:**
- Daje: `defaultSettings(today, data, holidays)`, gdzie `data` to dane `planRoute`, a `holidays = { list, from, until, tetMargin }` (dla `tripAlerts`). Zwraca `{ from: 'SGN', to: 'HAN', year, month, days: 15, interests: [], level: 2, add: [], remove: [] }` z miesiącem, którego trasa ma najwyższy wynik spośród 12 następnych; remis rozstrzyga mniej świąt, potem wcześniejszy miesiąc.

- [ ] **Krok 1: Testy, które nie przechodzą.** W `tests/page.test.js` zamień trzy linie:

```js
var DEF = defaultSettings('2026-10-10');
eq(DEF, { from: 'SGN', to: 'HAN', year: 2026, month: 11, days: 15, interests: [], level: 2, add: [], remove: [] }, 'the defaults: the next month');
eq([defaultSettings('2026-12-31').year, defaultSettings('2026-12-31').month], [2027, 1], 'after December: January of the next year');
```

na:

```js
var HOL = { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS };
var DEF = defaultSettings('2026-10-10', DATA_T, HOL);
eq([DEF.from, DEF.to, DEF.days, DEF.interests, DEF.level, DEF.add, DEF.remove], ['SGN', 'HAN', 15, [], 2, [], []],
  'the defaults: Hồ Chí Minh City → Hà Nội, 15 days, no interest, level 2');
/* The month of the defaults: the best of the 12 after today's by the trip's score; a tie goes to the month with fewer
   holidays, then to the earlier one. The test checks the rule, not a month: the best month moves with the data. */
function bestMonthOk(today) {
  var d = defaultSettings(today, DATA_T, HOL), y = +today.slice(0, 4), m = +today.slice(5, 7), rated = [];
  for (var k = 1; k <= 12; k++) {
    var mm = m + k, yy = y;
    while (mm > 12) { mm -= 12; yy++; }
    var st = normSettings(Object.assign({}, d, { year: yy, month: mm }), PLACES, HUBS);
    rated.push({ year: yy, month: mm, score: planRoute(st, DATA_T).score, hol: tripAlerts(st, HOL.list, HOL.from, HOL.until, HOL.tetMargin).hits.length });
  }
  var me = rated.filter(function (x) { return x.year === d.year && x.month === d.month; })[0];
  ok(me, today + ': the default month is one of the 12 after it');
  rated.forEach(function (x) {
    var tie = Math.abs(x.score - me.score) <= 1e-9;
    ok(!(x.score > me.score + 1e-9 || (tie && x.hol < me.hol) || (tie && x.hol === me.hol && x.year * 12 + x.month < me.year * 12 + me.month)),
      today + ': ' + x.year + '-' + x.month + ' should be the default month, not ' + d.year + '-' + d.month);
  });
}
['2026-10-10', '2027-02-15', '2027-06-30', '2027-12-31'].forEach(bestMonthOk);
```

W teście `g3` zamień oczekiwany miesiąc `11` na `DEF.month`:

```js
eq(['start' in g3.settings, g3.st.start, g3.st.month, g3.st.days, g3.dropped.slice().sort()], [false, null, DEF.month, 15, ['end', 'start']],
```

w teście `g6` oczekiwany rok `2026` na `DEF.year`:

```js
eq([g6.st.year, g6.st.month, g6.dropped], [DEF.year, 5, ['year']], 'a year the engine refuses: the default year, the month stays');
```

a w pętli po zegarach urządzenia wywołanie `defaultSettings(clampToday(t, '2026-10-01', 2030))` na `defaultSettings(clampToday(t, '2026-10-01', 2030), DATA_T, HOL)`.

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `tests/page.test.js` kończy się błędem `2026-10-10: … should be the default month, not 2026-11` (dzisiejsza funkcja bierze następny miesiąc).

- [ ] **Krok 3: `site2/src/page.js`.** Funkcję `defaultSettings` z komentarzem zastąp:

```js
/* The settings without a link: Hồ Chí Minh City → Hà Nội, 15 days, no interest, level 2, in the best of the 12 months
   after today's: the month whose trip scores highest; a tie goes to the month with fewer holidays (tripAlerts), then to
   the earlier one. today: YYYY-MM-DD; data: planRoute's data; holidays: { list, from, until, tetMargin } for tripAlerts. */
function defaultSettings(today, data, holidays) {
  var y = +today.slice(0, 4), m = +today.slice(5, 7), best = null;
  for (var k = 1; k <= 12; k++) {
    var mm = m + k, yy = y;
    while (mm > 12) { mm -= 12; yy++; }
    var s = { from: 'SGN', to: 'HAN', year: yy, month: mm, days: 15, interests: [], level: 2, add: [], remove: [] };
    var st = normSettings(s, data.places, data.hubs), r = planRoute(st, data);
    if (!r.ok) continue;
    var hol = tripAlerts(st, holidays.list, holidays.from, holidays.until, holidays.tetMargin).hits.length;
    if (!best || r.score > best.score + 1e-9 || (Math.abs(r.score - best.score) <= 1e-9 && hol < best.hol)) best = { s: s, score: r.score, hol: hol };
  }
  if (!best) throw new Error('defaultSettings: no month gives a trip');
  return best.s;
}
```

- [ ] **Krok 4: `site2/src/app.js`.** Zamień `var DEFAULTS = defaultSettings(TODAY);` na:

```js
  var DEFAULTS = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
```

- [ ] **Krok 5: Uruchom testy i sprawdź dzisiejszy wynik**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`. Dla porządku (11.10.2026 wychodzi marzec 2027):

```bash
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
echo 'print(JSON.stringify(defaultSettings(new Date().toISOString().slice(0, 10), { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS }, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS })))' > "$TMPDIR/def.js"
$J site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/page.js "$TMPDIR/def.js"
```

- [ ] **Krok 6: Commit**

```bash
git add site2/src/page.js site2/src/app.js tests/page.test.js
git commit -F - <<'EOF'
Strona: bez linku najlepszy miesiąc z 12 następnych dla trasy domyślnej (remis: mniej świąt, potem wcześniej)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: Strona: układ, zwarty formularz i pasek u góry

Decyzja 2 z sesji: formularz na górze, liczby trasy tuż pod nim, pasek z podsumowaniem po przewinięciu. Do tego uwagi z przeglądów 1B o komunikatach i stanie formularza.

**Pliki:**
- Utwórz: `tests/probes/settings.js`
- Zmień: `site2/src/template.html`, `site2/src/app.js`, `site2/src/ui.js`, `tests/content.test.js`

**Interfejsy:**
- Używa: `tied()` (zadanie 3), `defaultSettings` (zadanie 7), `check`, `soon`, `textOf`, `setField` (zadanie 2).
- Daje:
  - `apply(s, linkWarn)`: `state.linkWarn` trwa do następnej zmiany; ostrzeżenie o błędnym linku to pierwsza linijka `#alerts`;
  - `syncLocks()`: wyszarzenie zainteresowań i opis poziomu (`#level-note`) według formularza, także po nieudanej zmianie;
  - `summaryText(st)` i `#sum-text` w pasku `#secnav`; klasa `away` na pasku, gdy formularz zniknie z ekranu (IntersectionObserver);
  - przyciski „Dodaj”, „Usuń” i „Wróć do trasy bez zmian” budują na `readForm()`;
  - w HTML: `.facts` jest w `#shape`, nad `.block-head`; `#settings-msg` stoi pod formularzem; poziom to `.seg` z `#level-note`.

- [ ] **Krok 1: Sonda, która nie przechodzi:** `tests/probes/settings.js`

```js
// The settings on a phone: the form on the first screen, the figures of the trip right under it and following each change,
// the interests greyed out after two also when a change gives no trip, the changes building on the form, the level's
// words, the summary for the bar, and a link that was partly wrong.
// tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var f = document.getElementById('settings-form'), box = function (el) { return el.getBoundingClientRect(); };
  var top = document.documentElement.getBoundingClientRect().top;   // the page is at its top: positions are page positions
  check('the month field ends on the first screen of a 390 × 844 phone (bottom at most 760 px)', box(f.month).bottom - top <= 760, Math.round(box(f.month).bottom - top));
  var gap = box(document.querySelector('.facts')).top - box(document.getElementById('settings-msg')).bottom;
  check('the figures of the trip come right under the form (gap under 80 px)', gap >= 0 && gap < 80, Math.round(gap));
  setField('days', '10');
  check('a change shows at once in the figures', textOf('#facts li b') === '10', textOf('#facts li b'));
  check('the bar sums up the settings', / · 10 dni · Aktywnie$/.test(textOf('#sum-text')), textOf('#sum-text'));
  check('the words of the chosen level under the levels', /Całodniowe wędrówki/.test(textOf('#level-note')), textOf('#level-note'));
  f.querySelector('input[name=interest][value=kultura]').click();
  f.querySelector('input[name=interest][value=jedzenie]').click();
  check('two interests: the other three are greyed out', f.querySelectorAll('input[name=interest]:disabled').length === 3);
  // a term that is no trip, then more changes: the form keeps them, and Dodaj builds on them
  f.querySelector('input[name=mode][value=dates]').click();
  setField('end', '2026-01-01');
  check('an end before the start: a message under the form', /od 5 do 30 dni/.test(textOf('#settings-msg')), textOf('#settings-msg'));
  f.querySelector('input[name=interest][value=jedzenie]').click();
  check('the interests unlock at once, though the trip did not change', f.querySelectorAll('input[name=interest]:disabled').length === 0);
  setField('to', 'DAD');
  var add = document.querySelector('[data-add]');
  add.click();
  check('Dodaj after a change that gave no trip keeps the airport chosen in the form', f.to.value === 'DAD', f.to.value);
  check('and says again why there is no trip', /od 5 do 30 dni/.test(textOf('#settings-msg')), textOf('#settings-msg'));
  // a link that is partly wrong: the trip opens on the defaults for that part, and the first warning says so
  location.hash = '#od=XYZ&do=HAN&miesiac=' + soon().year + '-' + (soon().month < 10 ? '0' : '') + soon().month + '&dni=15&co=&poziom=2';
  setTimeout(function () {
    var first = document.querySelector('#alerts li');
    check('a partly wrong link: the first warning above the figures says so', first && /Część linku była błędna/.test(first.textContent), first && first.textContent);
    check('and the message under the form is empty', textOf('#settings-msg') === '', textOf('#settings-msg'));
    done();
  }, 500);
}, 1500);
```

- [ ] **Krok 2: Uruchom i sprawdź, że sonda nie przechodzi**

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: kod 1 i m.in. `FAIL the month field ends on the first screen…` oraz `FAIL the figures of the trip come right under the form…`.

- [ ] **Krok 3: `site2/src/template.html`.** Nowy układ w skrócie:
  - pasek `#secnav`: `.secnav-links` (trzy odnośniki) i `.secnav-sum` (`#sum-text` i odnośnik „Zmień” do `#settings`), widoczne według klasy `away`;
  - formularz: tryb terminu i poziom jako `.seg` (przyciski w rzędzie), pary pól jako `.set-pair` z `.field-grow`, lotniska z `.set-arrow`; pod poziomami `#level-note`; `#settings-msg` pod formularzem;
  - `.facts` (liczby i ostrzeżenia) jako karta na początku `#shape`;
  - na telefonie niższe zdjęcie i mniejsze odstępy, lotniska w dwóch wierszach; od 900 px formularz w dwóch kolumnach.

Zmiany robi skrypt (sprawdzony: z szablonu po zadaniu 3 daje dokładnie wersję z suchej próby). Uruchom z katalogu repo:

```bash
python3 - <<'PY'
p = 'site2/src/template.html'
t = open(p, encoding='utf-8').read()
pairs = [
 ('/* Facts */\n.facts { background: var(--surface); border-bottom: 1px solid var(--line); }\n',
  '/* Facts: the trip in figures, right under the settings */\n.facts { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding-inline: clamp(16px, 2.4vw, 26px); margin-bottom: clamp(28px, 4vw, 40px); }\n'),
 ('/* Settings */\n.settings { display: grid; gap: 22px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: clamp(16px, 2.4vw, 26px); }\n.set-group { border: 0; margin: 0; padding: 0; min-width: 0; display: grid; gap: 10px; }\n.set-group legend { font-weight: 600; font-size: 17px; padding: 0; margin-bottom: 10px; }\n',
  '/* Settings: compact, so on a phone the form starts on the first screen and the figures of the trip follow it */\n.settings { display: grid; gap: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: clamp(16px, 2.4vw, 26px); }\n.set-group { border: 0; margin: 0; padding: 0; min-width: 0; display: grid; gap: 10px; align-content: start; }\n.set-group legend { font-weight: 600; font-size: 17px; padding: 0; margin-bottom: 8px; }\n'),
 ('#level-list { align-items: stretch; }\n',
  '/* two fields in one row (month and days, the two dates, the two airports), each as wide as the row allows */\n.set-pair { display: flex; gap: 10px; align-items: flex-end; max-width: 560px; }\n.field-grow { flex: 1 1 0; min-width: 0; }\n.set-arrow { padding-bottom: 10px; color: var(--muted); }\n'),
 ('.field select, .field input { font: 16px var(--body); color: var(--ink); background: var(--paper); border: 1px solid var(--line); border-radius: 6px; padding: 8px 10px; min-height: 44px; }\n',
  '.field select, .field input { width: 100%; font: 16px var(--body); color: var(--ink); background: var(--paper); border: 1px solid var(--line); border-radius: 6px; padding: 8px 10px; min-height: 44px; }\n/* a choice of one as buttons in a row: the term mode and the level */\n.seg { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 3px; padding: 3px; background: var(--paper); border: 1px solid var(--line); border-radius: 8px; max-width: 560px; }\n.seg label { position: relative; display: grid; place-items: center; min-height: 44px; padding: 4px 6px; border-radius: 6px; cursor: pointer; font-size: 15px; text-align: center; line-height: 1.25; }\n.seg input { position: absolute; opacity: 0; pointer-events: none; }\n.seg label:has(input:checked) { background: var(--surface); box-shadow: 0 0 0 2px var(--accent); font-weight: 600; }\n.seg label:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }\n/* on a wide screen the four groups of the form stand in two columns */\n@media (min-width: 900px) { .settings { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 40px; } }\n'),
 ('.chip-wide { flex: 1 1 220px; align-items: flex-start; border-radius: 8px; }\n.chip-wide span { display: grid; gap: 2px; font-size: 13.5px; color: var(--muted); }\n.chip-wide b { font-size: 15px; font-weight: 600; color: var(--ink); }\n',
  ''),
 ('.set-msg:empty { display: none; }\n',
  '.set-msg:not(:empty) { margin-top: 14px; }\n'),
 ('  .hero-text { padding-top: 68px; }\n',
  '  /* a lower photo, so the form starts on the first screen (tests/probes/settings.js) */\n  .hero { min-height: 0; }\n  .hero-text { padding-block: 40px 24px; }\n  .hero-lede { margin-top: 10px; }\n  .hero-cta { margin-top: 16px; }\n  #settings.block { padding-top: 16px; }\n  #shape.block { padding-top: 20px; }\n  .block-head { gap: 6px; margin-bottom: 12px; }\n  /* "Hồ Chí Minh City" does not fit in half a phone\'s width, so the airports take a row each */\n  .set-airports { flex-wrap: wrap; }\n  .set-airports .field-grow { flex-basis: 100%; }\n  .set-arrow { display: none; }\n'),
 ('.secnav .wrap { display: flex; gap: 18px; overflow-x: auto; scrollbar-width: none; }\n.secnav .wrap::-webkit-scrollbar { display: none; }\n',
  '.secnav .wrap { display: flex; align-items: center; gap: 18px; }\n.secnav-links { display: flex; gap: 18px; min-width: 0; overflow-x: auto; scrollbar-width: none; }\n.secnav-links::-webkit-scrollbar { display: none; }\n'),
 ('  .secnav .wrap { -webkit-mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); }\n',
  '  .secnav-links { -webkit-mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); }\n'),
 ('.secnav a:hover { color: var(--ink); }\n',
  '.secnav a:hover { color: var(--ink); }\n/* once the form has gone up off the screen (class away, app.js), the bar sums up the settings, with "Zmień" back to the form;\n   on a phone the summary takes the place of the links */\n.secnav-sum { display: none; margin: 0 0 0 auto; align-items: center; gap: 4px 12px; font-size: 14px; color: var(--ink); white-space: nowrap; }\n.secnav.away .secnav-sum { display: flex; }\n.secnav .sum-change { color: var(--accent); font-weight: 600; padding: 12px 0 12px 8px; }\n@media (max-width: 640px) {\n  .secnav.away .secnav-links { display: none; }\n  .secnav.away .secnav-sum { margin-left: 0; flex: 1; justify-content: space-between; }\n}\n'),
 ('<div class="facts"><div class="wrap"><p class="facts-for" id="facts-for"></p><ul id="facts"></ul><ul class="alerts" id="alerts" hidden></ul></div></div>\n<nav class="secnav" data-i18n-aria="nav.aria"><div class="wrap">\n  <a href="#settings" data-i18n="nav.settings"></a>\n  <a href="#shape" data-i18n="nav.shape"></a>\n  <a href="#days" data-i18n="nav.days"></a>\n',
  '<nav class="secnav" id="secnav" data-i18n-aria="nav.aria"><div class="wrap">\n  <div class="secnav-links">\n    <a href="#settings" data-i18n="nav.settings"></a>\n    <a href="#shape" data-i18n="nav.shape"></a>\n    <a href="#days" data-i18n="nav.days"></a>\n  </div>\n  <p class="secnav-sum"><span id="sum-text"></span><a class="sum-change" href="#settings" data-i18n="nav.change"></a></p>\n'),
 ('        <div class="set-row">\n          <label class="chip"><input type="radio" name="mode" value="month"><span data-i18n="set.mode.month"></span></label>\n          <label class="chip"><input type="radio" name="mode" value="dates"><span data-i18n="set.mode.dates"></span></label>\n',
  '        <div class="seg">\n          <label><input type="radio" name="mode" value="month"><span data-i18n="set.mode.month"></span></label>\n          <label><input type="radio" name="mode" value="dates"><span data-i18n="set.mode.dates"></span></label>\n'),
 ('        <div class="set-row" id="term-month">\n          <label class="field"><span data-i18n="set.month"></span><select name="month"></select></label>\n',
  '        <div class="set-pair" id="term-month">\n          <label class="field field-grow"><span data-i18n="set.month"></span><select name="month"></select></label>\n'),
 ('        <div class="set-row" id="term-dates" hidden>\n          <label class="field"><span data-i18n="set.start"></span><input type="date" name="start"></label>\n          <label class="field"><span data-i18n="set.end"></span><input type="date" name="end"></label>\n',
  '        <div class="set-pair" id="term-dates" hidden>\n          <label class="field field-grow"><span data-i18n="set.start"></span><input type="date" name="start"></label>\n          <label class="field field-grow"><span data-i18n="set.end"></span><input type="date" name="end"></label>\n'),
 ('      <p class="set-msg" id="settings-msg" role="status"></p>\n',
  ''),
 ('        <div class="set-row">\n          <label class="field"><span data-i18n="set.from"></span><select name="from"></select></label>\n          <label class="field"><span data-i18n="set.to"></span><select name="to"></select></label>\n',
  '        <div class="set-pair set-airports">\n          <label class="field field-grow"><span data-i18n="set.from"></span><select name="from"></select></label>\n          <span class="set-arrow" aria-hidden="true">→</span>\n          <label class="field field-grow"><span data-i18n="set.to"></span><select name="to"></select></label>\n'),
 ('        <div class="set-row" id="level-list"></div>\n',
  '        <div class="seg" id="level-list"></div>\n        <p class="set-note" id="level-note"></p>\n'),
 ('    </form>\n',
  '    </form>\n    <p class="set-msg" id="settings-msg" role="status"></p>\n'),
 ('  <section class="block wrap" id="shape">\n',
  '  <section class="block wrap" id="shape">\n    <div class="facts"><p class="facts-for" id="facts-for"></p><ul id="facts"></ul><ul class="alerts" id="alerts" hidden></ul></div>\n'),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `19 changes`.

- [ ] **Krok 4: `site2/src/app.js`.**
  - Stan i `apply`: zamień

```js
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay
  var state = { settings: null, st: null, route: null, plans: null };
```

na

```js
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay;
  // linkWarn: the link that opened the page was partly wrong (said in the warnings until the next change)
  var state = { settings: null, st: null, route: null, plans: null, linkWarn: false };
```

  komentarz i nagłówek `apply`:

```js
  /* New settings: plan the trip; when there is one, show it and write the settings into the address. Otherwise keep the
     last trip and say why under the settings. Returns whether the trip changed. */
  function apply(s) {
```

na

```js
  /* New settings: plan the trip; when there is one, show it and write the settings into the address. Otherwise keep the
     last trip and say why under the settings. linkWarn: the settings come from a link that was partly wrong.
     Returns whether the trip changed. */
  function apply(s, linkWarn) {
```

  i w nim `state.settings = s; state.st = st; state.route = r;` na `state.settings = s; state.st = st; state.route = r; state.linkWarn = !!linkWarn;`.
  - `fromLink` z komentarzem zastąp:

```js
  /* The settings in the address: a link someone sent, or the defaults. A link whose Dodaj and Usuń leave no trip opens
     without them. A link that was partly wrong says so as the first of the warnings above the figures of the trip. */
  function fromLink() {
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), DEFAULTS, PLACES, HUBS, bad);
    if (!apply(got.settings, got.dropped.length > 0)) apply(withoutChanges(got.settings), true);
    syncForm();
  }
```

  - W `buildForm` poziomy jako przyciski w rzędzie: zamień linię z `chip chip-wide` na

```js
      return '<label><input type="radio" name="level" value="' + n + '"><span>' + T('lvl.' + n) + '</span></label>';
```

  - Komentarz `/* The form shows state.settings. Once two interests are chosen, the other three are greyed out. */` zastąp:

```js
  /* What follows the form as it stands, also after a change that gave no trip: once two interests are chosen, the other
     three are greyed out; under the levels, the words of the chosen one. */
  function syncLocks() {
    var two = F.querySelectorAll('input[name=interest]:checked').length >= 2;
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) { b.disabled = two && !b.checked; });
    $('#level-note').textContent = tied(T('lvlp.' + F.level.value));
  }
  /* The form shows state.settings. */
```

  a na końcu `syncForm` zamień

```js
    var two = s.interests.length >= 2;
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) {
      b.checked = s.interests.indexOf(b.value) > -1;
      b.disabled = two && !b.checked;
    });
```

na

```js
    Array.prototype.forEach.call(F.querySelectorAll('input[name=interest]'), function (b) { b.checked = s.interests.indexOf(b.value) > -1; });
    syncLocks();
```

  - W `onFormChange` pod `if (apply(s)) syncForm();` dopisz `    else syncLocks();`.
  - Przed `function render() {` dopisz:

```js
  /* The settings in short, for the bar at the top: "mar 2027 · 15 dni · Aktywnie", or with dates "28.01–14.02.2027 · …". */
  function summaryText(st) {
    var term = st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('mon3.' + st.month) + ' ' + st.year;
    return T('sum', { term: term, days: st.days, level: T('lvl.' + st.level) });
  }

```

  a jako pierwszą linię `render()` dopisz `    $('#sum-text').textContent = summaryText(state.st);`.
  - W `renderFacts` zamień cztery linie od `var a = tripAlerts(…)` do `if (termPassed(st, TODAY)) lines.unshift(…);` na:

```js
    // first a link that was partly wrong, then a term that has passed (an old link keeps its trip, and says so), then the
    // holidays; the missing holiday dates only for a term still ahead
    var a = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS), passed = termPassed(st, TODAY), lines = [];
    if (state.linkWarn) lines.push(T('set.dropped'));
    if (passed) lines.push(T('alert.past'));
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: h.name, span: fmtSpan(h.from, h.to) })); });
    if (a.unknown && !passed) lines.push(T('alert.nodata'));
```

  - W `bindChanges` zamień

```js
      var added = b.hasAttribute('data-add') ? b.getAttribute('data-add') : null, before = state.route.stops;
      var s = b.id === 'reset-changes' ? withoutChanges(state.settings)
        : added ? withAdded(state.settings, added)
        : withRemoved(state.settings, b.getAttribute('data-remove'));
```

na

```js
      // the changes build on the form as it stands, so a choice in it that gave no trip yet is not lost
      var added = b.hasAttribute('data-add') ? b.getAttribute('data-add') : null, before = state.route.stops, base = readForm();
      var s = b.id === 'reset-changes' ? withoutChanges(base)
        : added ? withAdded(base, added)
        : withRemoved(base, b.getAttribute('data-remove'));
```

  - Przed komentarzem `/* ---------- the footer and the texts in the template ---------- */` dopisz:

```js
  /* The bar at the top sums up the settings once the form has gone up off the screen (class away on the bar). */
  function bindSummary() {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      $('#secnav').classList.toggle('away', !es[0].isIntersecting && es[0].boundingClientRect.bottom < 0);
    }).observe(F);
  }

```

  a w części „wiring” pod `bindChanges();` dopisz `  bindSummary();`.

- [ ] **Krok 5: Teksty.** W `site2/src/ui.js`:
  - w linii z `'nav.top': 'Na górę',` dopisz na końcu ` 'nav.change': 'Zmień',`, a pod tą linią: `  'sum': '{term} · {days} dni · {level}',`;
  - `'set.p'` zamień na `'Trasa przelicza się przy każdej zmianie, a adres strony to gotowy link do niej.'`;
  - pod linią `'mon.7': …` dopisz:

```js
  'mon3.1': 'sty', 'mon3.2': 'lut', 'mon3.3': 'mar', 'mon3.4': 'kwi', 'mon3.5': 'maj', 'mon3.6': 'cze',
  'mon3.7': 'lip', 'mon3.8': 'sie', 'mon3.9': 'wrz', 'mon3.10': 'paź', 'mon3.11': 'lis', 'mon3.12': 'gru',
```

  W `tests/content.test.js`, w `FAMILIES`, za wpisem `'mon.': [1, 2, …, 12],` dopisz `'mon3.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],`.

- [ ] **Krok 6: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: `ALL PASS`; każda sonda kończy się `done, all checks ok`.

- [ ] **Krok 7: Zrzuty**

```bash
bash tests/shot.sh '' 390 "$TMPDIR/t8-390.png" 1700
bash tests/shot.sh '' 1400 "$TMPDIR/t8-1400.png" 1300
```

Oczekiwane: na telefonie zdjęcie, pasek z odnośnikami, „Twój wyjazd” i początek formularza na pierwszym ekranie; lotniska w dwóch wierszach, poziom jako trzy przyciski z opisem pod spodem, karta z liczbami trasy tuż pod formularzem. Na komputerze formularz w dwóch kolumnach: termin i lotniska w pierwszym wierszu, zainteresowania i poziom w drugim.

- [ ] **Krok 8: Commit**

```bash
git add site2/src/template.html site2/src/app.js site2/src/ui.js tests/content.test.js tests/probes/settings.js
git commit -F - <<'EOF'
Strona: formularz na górze i liczby trasy tuż pod nim, zwarty formularz, pasek z podsumowaniem i Zmień, błędny link w ostrzeżeniach, zmiany budują na formularzu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 9: Strona: karta miejsca, lista poza trasą i ostrzeżenia

Strona zaczyna używać funkcji z zadań 5 i 6. Stara lista „Poza trasą” (`offRoute`) znika.

**Pliki:**
- Zmień: `site2/src/app.js`, `site2/src/template.html`, `site2/src/ui.js`, `site2/src/page.js` (usuń `offRoute`), `tests/probes/changes.js`
- Test: `tests/page.test.js` (usuń test `offRoute`), `tests/content.test.js` (rodziny kluczy)

**Interfejsy:**
- Używa: `whyOn`, `whyOff`, `addReport` (zadanie 6), `stayWeather`, `rainyMonth`, `stayEvents`, `interestAlerts`, `CLIMATE` (zadania 4 i 5), `tied()` (zadanie 3).
- Daje (app.js): `inMonth(m)` („w marcu”, „we wrześniu”), `names(ids)`, `capFirst(t)`, `seasonPhrase`, `weatherLine`, `stayFacts(i, compact)`, `dayItem(d, wet)`, `offReason(r, x)`, `reportAdd(added, before)` (zastępuje `reportDropped`).
- Klucze interfejsu: `monl.1`–`monl.12`, `season.D|S|Z`, `why.*`, `wx.*`, `ev.event`, `ev.warn`, `off.r.*`, `off.drops`, `off.nodrops`, `off.came`, `off.came_only`, `alert.int_bad`, `alert.int_bad_many`, `alert.int_none`; znika `off.removed`.

- [ ] **Krok 1: Sonda, która nie przechodzi.** `tests/probes/changes.js` zastąp całym plikiem:

```js
// Why each place is on the trip or not, Dodaj, Usuń, back to the trip without changes, a link the trip cannot follow, a term
// that is no trip, a round trip, and the sentence after Dodaj. Every change goes through the page as a visitor makes it:
// buttons, the form, the address.
// tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var ids = function () { return Array.prototype.map.call(document.querySelectorAll('#stops .stop[data-pin]'), function (s) { return s.getAttribute('data-pin'); }); };
  var at = soon(), month = at.year + '-' + at.month;
  check('the trip has stays', ids().length > 2, ids().join(','));
  var whys = Array.prototype.map.call(document.querySelectorAll('#stops .stop:not(.stop-home) .why-on'), function (p) { return p.textContent; });
  check('each stay says why it is on the trip', whys.length === document.querySelectorAll('#stops .stop:not(.stop-home)').length &&
    whys.every(function (t) { return /^(Wybrane, bo: .+ sezon\.|Noc w drodze z .+ do .+\.)$/.test(t.replace(/\s+/g, ' ')); }), whys.join(' | '));
  check('each full card has its weather', Array.prototype.every.call(document.querySelectorAll('#stops .stop:not(.stop-compact):not(.stop-home)'),
    function (s) { return /^Pogoda w/.test(s.querySelector('.why-wx').textContent); }));
  var offs = document.querySelectorAll('#offroute-list li');
  check('each place off the trip says why', offs.length > 0 && Array.prototype.every.call(offs, function (li) { return li.querySelector('.off-why').textContent.length > 5; }));
  var said = document.querySelector('[data-add="phuquoc"]').closest('li').querySelector('.off-drops').textContent.replace(/\s+/g, ' ');
  document.querySelector('[data-add="phuquoc"]').click();
  var left = /z trasy wypadło: ([^.]+)\./.exec(textOf('#dropped'));
  check('Dodaj does what its line said would leave the trip', said === 'Zmieści się bez usuwania innych miejsc.' ? !left : !!left && said === 'Po dodaniu wypadnie: ' + left[1] + '.',
    said + ' | ' + textOf('#dropped'));
  check('Dodaj Phú Quốc: on the trip and in the address', ids().indexOf('phuquoc') > -1 && /dodaj=phuquoc/.test(location.hash), ids().join(',') + ' ' + location.hash);
  document.querySelector('[data-remove="phuquoc"]').click();
  check('Usuń Phú Quốc: off the trip, removed in the address', ids().indexOf('phuquoc') < 0 && /usun=phuquoc/.test(location.hash) && !/dodaj=/.test(location.hash), location.hash);
  document.getElementById('reset-changes').click();
  check('back to the trip without changes', !/dodaj=|usun=/.test(location.hash), location.hash);
  // a link whose Usuń leaves no trip: it opens without its Dodaj and Usuń and says so
  location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2&usun=saigon,mekong,cattien';
  setTimeout(function () {
    check('a link the trip cannot follow opens without its changes', !/usun=/.test(location.hash) && ids().length > 2, location.hash);
    check('and says that part of the link was wrong', /Część linku była błędna/.test(textOf('#alerts') + textOf('#settings-msg')), textOf('#alerts') + ' | ' + textOf('#settings-msg'));
    // dates: an end before the start is no trip; the last trip and the address stay, the message says why
    var f = document.getElementById('settings-form');
    f.querySelector('input[name=mode][value=dates]').click();
    var dated = location.hash;
    check('the dates mode keeps the trip, with dates in the address', /start=\d{4}-\d\d-\d\d&koniec=/.test(dated), dated);
    setField('end', '2026-01-01');
    check('an end before the start: a message, the address stays', /od 5 do 30 dni/.test(textOf('#settings-msg')) && location.hash === dated, textOf('#settings-msg') + ' ' + location.hash);
    // a round trip SGN→SGN: Usuń is hidden on the city of the airport, shown on other stays
    f.querySelector('input[name=mode][value=month]').click();
    setField('month', month);
    setField('to', 'SGN');
    check('a round trip from the form', /od=SGN&do=SGN/.test(location.hash), location.hash);
    check('Usuń hidden on Hồ Chí Minh City, shown on the other stays', !document.querySelector('[data-remove="saigon"]') && document.querySelectorAll('.stop-remove').length > 0,
      document.querySelectorAll('.stop-remove').length);
    // Dodaj on a 21-day mountain trip: Phú Quốc pushes places off, and the page says which; the next change clears it
    setField('to', 'HAN');
    setField('days', '21');
    f.querySelector('input[name=interest][value=gory]').click();
    document.querySelector('[data-add="phuquoc"]').click();
    check('the sentence after Dodaj names what left the trip', /Żeby zmieścić Phú Quốc, z trasy wypadło: /.test(textOf('#dropped')), textOf('#dropped'));
    setField('days', '20');
    check('one more change clears the sentence', textOf('#dropped') === '', textOf('#dropped'));
    done();
  }, 500);
}, 1500);
```

- [ ] **Krok 2: Uruchom i sprawdź, że sonda nie przechodzi**

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: kod 1, `FAIL each stay says why it is on the trip`.

- [ ] **Krok 3: `site2/src/page.js` i `tests/page.test.js`.** Usuń z `page.js` funkcję `offRoute` razem z jej komentarzem (`/* The places that could be on the trip but are not, south to north, …`), a z `page.test.js` trzy linie testu (`var stO = …` i wywołanie `eq(offRoute(…), […], 'off the trip, south to north, no night on the way');`). Listę miejsc poza trasą daje teraz `whyOff`, z testami z zadania 6.

- [ ] **Krok 4: `site2/src/app.js`.**
  - Pod funkcją `dateLabel` dopisz:

```js
  // "w marcu", "we wrześniu" (we before w and a consonant)
  function inMonth(m) { var noun = T('monl.' + m); return (/^w[^aeiouyąęó]/i.test(noun) ? 'we ' : 'w ') + noun; }
  // the short names of places, for a sentence
  function names(ids) { return ids.map(function (id) { return C(id).short; }).join(', '); }
  function capFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
```

  - W `renderFacts`, pod linią `a.hits.forEach(…)`, dopisz:

```js
    // a chosen interest whose places on the trip are all in a poor season, or that no place on the trip serves
    interestAlerts(r, st, PLACES, CLIMATE).forEach(function (x) {
      var what = T('int.' + x.interest);
      lines.push(x.none ? T('alert.int_none', { x: what }) : T(x.ids.length > 1 ? 'alert.int_bad_many' : 'alert.int_bad',
        { x: what, when: x.months.map(inMonth).join(' i '), places: x.ids.map(function (id) { return C(id).short; }).join(' i '),
          why: x.why.map(function (w) { return T('wx.' + w); }).join(', ') }));
    });
```

  - Linię `  function dayItem(d) {` zastąp blokiem (nowe funkcje karty i nagłówek `dayItem` z flagą `wet`):

```js
  /* Why stay i is on the trip ("Wybrane, bo…"), and, on a full card, its weather in the month or months of its days and the
     events of the place that it meets. */
  function seasonPhrase(months) {
    if (months.every(function (m) { return m.season === months[0].season; })) {
      return inMonth(months[0].month) + months.slice(1).map(function (m) { return ' i ' + T('monl.' + m.month); }).join('') + ' ' + T('season.' + months[0].season);
    }
    return months.map(function (m) { return inMonth(m.month) + ' ' + T('season.' + m.season); }).join(', ');
  }
  function weatherLine(list) {
    return T('wx.first', { when: inMonth(list[0].month), x: list.map(function (w, k) {
      return (k ? inMonth(w.month) + ': ' : '') + T('wx.month', { t: w.t[0] + '–' + w.t[1], mm: w.mm, days: w.days + ' ' + countWord('wx.days', w.days) }) +
        (w.why.length ? ' (' + w.why.map(function (c) { return T('wx.' + c); }).join(', ') + ')' : '');
    }).join('; ') });
  }
  function stayFacts(i, compact) {
    var s = state.route.stops[i], w = whyOn(state.route, i, state.st, PLACES, HUBS), parts = [], html;
    if (w.night) return '<p class="why-on">' + esc(T('why.night', { a: C(w.night[0]).short, b: C(w.night[1]).short })) + '</p>';
    if (w.added) parts.push(T('why.added'));
    if (w.airport) parts.push(T('why.' + w.airport));
    w.interests.forEach(function (k) { parts.push(T('int.' + k).toLowerCase()); });
    if (w.way) parts.push(T('why.way'));
    parts.push(seasonPhrase(w.months));
    html = '<p class="why-on">' + esc(T('why.on', { x: parts.join(', ') })) + '</p>';
    if (compact) return html;
    html += '<p class="why-wx">' + esc(weatherLine(stayWeather(s, state.st.months, CLIMATE, SEASONS))) + '</p>';
    stayEvents(C(s.id), s, state.st).forEach(function (e) {
      html += '<p class="event' + (e.warn ? ' event-warn' : '') + '"><b>' + T(e.warn ? 'ev.warn' : 'ev.event') + '</b>' + esc(e.t) + '</p>';
    });
    return html;
  }

  // one day of a stay; its rain plan only when wet: in a month with many days of rain (rainyMonth in page.js)
  function dayItem(d, wet) {
```

    a w ostatniej linii `dayItem` zamień `(d.rain ? '<p class="day-rain">` na `(d.rain && wet ? '<p class="day-rain">`.
  - W `renderStops` zamień

```js
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; });
```

    na

```js
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; }), compact = !c.photos.length || again;
```

    w linii z `<section class="stop'` zamień `(c.photos.length && !again ? '' : ' stop-compact')` na `(compact ? ' stop-compact' : '')`, a ostatnią linię składania karty:

```js
        (again ? '' : gallery(s.id)) + '<ol class="days">' + state.plans[i].map(dayItem).join('') + '</ol>' + (again ? '' : tips(c)) + '</section>';
```

    na

```js
        '<div class="why">' + stayFacts(i, compact) + '</div>' +
        (again ? '' : gallery(s.id)) + '<ol class="days">' + state.plans[i].map(function (d) {
          return dayItem(d, rainyMonth(CLIMATE[s.id], state.st.months[d.day - 1] + 1));
        }).join('') + '</ol>' + (again ? '' : tips(c)) + '</section>';
```

  - `renderOffRoute` i `reportDropped` (od komentarza `// the places off the trip, each with Dodaj, …` do końca `reportDropped`) zastąp:

```js
  /* "Nie ma na twojej trasie, bo…": every place off the trip with why it is not on it (whyOff in page.js), and Dodaj where it
     can put the place on the trip, with what would leave the trip for it. */
  function offReason(r, x) {
    if (r === 'level') return T('off.r.level', { lvl: T('lvl.' + PLACES[x.id].level) });
    if (r === 'season') return T('off.r.season', { why: x.why.map(function (w) { return T('wx.' + w); }).join(', ') });
    if (r === 'beaten') return T('off.r.beaten', { days: state.st.days });
    return T('off.r.' + r);
  }
  function renderOffRoute() {
    var s = state.settings;
    $('#offroute-list').innerHTML = whyOff(state.route, s, state.st, DATA, CLIMATE).map(function (x) {
      var c = C(x.id);
      return '<li><span class="dot" style="--c:' + stopColor(x.id) + '"></span><div class="off-body"><b>' + esc(c.short) + '</b>' +
        (x.added ? ' <span class="off-tag">' + T('off.missing') + '</span>' : '') +
        '<p class="off-why">' + esc(capFirst(x.reasons.map(function (r) { return offReason(r, x); }).join('; '))) + '.</p>' +
        (x.canAdd ? '<p class="off-drops">' + esc(x.drops.length ? T('off.drops', { list: names(x.drops) }) : T('off.nodrops')) + '</p>' : '') + '</div>' +
        (x.canAdd ? '<button type="button" class="btn-small" data-add="' + x.id + '" aria-label="' + esc(T('off.add.aria', { x: c.short })) + '">' + T('off.add') + '</button>' : '') + '</li>';
    }).join('');
    $('#reset-changes').hidden = !(s.add.length || s.remove.length);
  }
  /* After Dodaj: which places left the trip and which came besides the added one (addReport). Its own status line, so
     "Nie zmieściło się" stays; the next change of the trip clears it (apply). Nothing is said when nothing else changed. */
  function reportAdd(added, before) {
    var rep = addReport(before, state.route.stops, added, PLACES), x = C(added).short, text = '';
    if (rep.left.length) text = T('off.dropped', { x: x, list: names(rep.left) });
    if (rep.came.length) text += (text ? ' ' : '') + T(rep.left.length ? 'off.came' : 'off.came_only', { x: x, list: names(rep.came) });
    $('#dropped').textContent = tied(text);
  }
```

  - W `bindChanges` zamień `if (added) reportDropped(added, before);` na `if (added) reportAdd(added, before);`.

- [ ] **Krok 5: `site2/src/template.html`.** Lista poza trasą jako karty z powodem (zamiast pigułek), style bloku „Wybrane, bo…”, pogody i wydarzeń. Uruchom (sprawdzony skrypt):

```bash
python3 - <<'PY'
p = 'site2/src/template.html'
t = open(p, encoding='utf-8').read()
pairs = [
 ('/* Changes to the trip: Dodaj, Usuń */\n',
  '/* Changes to the trip: Dodaj, Usuń; the places off the trip, each with why it is not on it */\n'),
 ('.off-list { display: flex; flex-wrap: wrap; gap: 8px; }\n.off-list li { display: inline-flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 4px 4px 4px 12px; font-size: 14px; }\n.off-tag { font: 11px var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; padding-right: 8px; }\n',
  '.off-list { display: grid; gap: 8px; width: 100%; max-width: 760px; }\n.off-list li { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto; align-items: start; gap: 10px 12px; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; font-size: 14px; }\n.off-list li > .dot { margin-top: 6px; }\n.off-why { color: var(--muted); }\n.off-drops { color: var(--muted); font-size: 13px; }\n.off-tag { font: 11px var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }\n'),
 ('.stop-sub { color: var(--muted); font-size: 15px; }\n',
  '.stop-sub { color: var(--muted); font-size: 15px; }\n\n/* Why a stay is on the trip, its weather and the events it meets */\n.why { display: grid; gap: 6px; }\n.why-on { font-size: 15px; }\n.why-wx { font-size: 14px; color: var(--muted); }\n.event { font-size: 14px; line-height: 1.5; background: var(--accent-soft); padding: 8px 12px; border-radius: 6px; }\n.event b { display: block; font: 500 11px var(--mono); text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 2px; }\n.event-warn { background: var(--warm-soft); }\n.event-warn b { color: var(--warm); }\n'),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `3 changes`.

- [ ] **Krok 6: Teksty.** `site2/src/ui.js` (sprawdzony skrypt; dopisuje miejscownik miesięcy, ostrzeżenia o zainteresowaniu, teksty listy poza trasą, „Wybrane, bo…”, sezony, pogodę i wydarzenia, a usuwa `off.removed`):

```bash
python3 - <<'PY'
p = 'site2/src/ui.js'
t = open(p, encoding='utf-8').read()
pairs = [
 ("  'mon3.7': 'lip', 'mon3.8': 'sie', 'mon3.9': 'wrz', 'mon3.10': 'paź', 'mon3.11': 'lis', 'mon3.12': 'gru',\n",
  "  'mon3.7': 'lip', 'mon3.8': 'sie', 'mon3.9': 'wrz', 'mon3.10': 'paź', 'mon3.11': 'lis', 'mon3.12': 'gru',\n  'monl.1': 'styczniu', 'monl.2': 'lutym', 'monl.3': 'marcu', 'monl.4': 'kwietniu', 'monl.5': 'maju', 'monl.6': 'czerwcu',\n  'monl.7': 'lipcu', 'monl.8': 'sierpniu', 'monl.9': 'wrześniu', 'monl.10': 'październiku', 'monl.11': 'listopadzie', 'monl.12': 'grudniu',\n"),
 ("  'alert.nodata': 'Dla części terminu strona nie ma dat świąt. Sprawdź daty Tết i świąt państwowych.',\n",
  "  'alert.nodata': 'Dla części terminu strona nie ma dat świąt. Sprawdź daty Tết i świąt państwowych.',\n  'alert.int_bad': '{x}: {when} {places} ma zły sezon ({why}).',\n  'alert.int_bad_many': '{x}: {when} {places} mają zły sezon ({why}).',\n  'alert.int_none': '{x}: żadne miejsce na tej trasie nie pasuje do tego dobrze. Powody są niżej, w części „Nie ma na twojej trasie”.',\n"),
 ("  'off.h3': 'Poza trasą', 'off.p': 'Dodaj miejsce, a trasa ułoży się na nowo razem z nim. Usunięte miejsca też tu są.',\n  'off.add': 'Dodaj', 'off.add.aria': 'Dodaj {x} do trasy', 'off.removed': 'usunięte', 'off.missing': 'nie zmieściło się', 'off.reset': 'Wróć do trasy bez zmian',\n  'off.dropped': 'Żeby zmieścić {x}, z trasy wypadło: {list}.',\n",
  "  'off.h3': 'Nie ma na twojej trasie', 'off.p': 'Przy każdym miejscu jest powód. „Dodaj” układa trasę na nowo razem z tym miejscem.',\n  'off.add': 'Dodaj', 'off.add.aria': 'Dodaj {x} do trasy', 'off.missing': 'nie zmieściło się', 'off.reset': 'Wróć do trasy bez zmian',\n  'off.r.removed': 'usunięte przez ciebie', 'off.r.level': 'tylko na poziomie „{lvl}”', 'off.r.closed': 'zamknięte w tym terminie',\n  'off.r.season': 'poza sezonem ({why})', 'off.r.profile': 'nie pasuje do tego, co lubisz', 'off.r.far': 'za daleko na tyle dni',\n  'off.r.beaten': 'przy {days} dniach wygrały inne miejsca',\n  'off.drops': 'Po dodaniu wypadnie: {list}.', 'off.nodrops': 'Zmieści się bez usuwania innych miejsc.',\n  'off.dropped': 'Żeby zmieścić {x}, z trasy wypadło: {list}.', 'off.came': 'Doszło też: {list}.', 'off.came_only': 'Po dodaniu {x} doszło też: {list}.',\n"),
 ("  'stop.remove': 'Usuń', 'stop.remove.aria': 'Usuń {x} z trasy', 'tag.added': 'Dodane',\n",
  "  'stop.remove': 'Usuń', 'stop.remove.aria': 'Usuń {x} z trasy', 'tag.added': 'Dodane',\n  'why.on': 'Wybrane, bo: {x}.', 'why.added': 'dodane przez ciebie', 'why.from': 'lotnisko przylotu', 'why.to': 'lotnisko wylotu',\n  'why.way': 'po drodze', 'why.night': 'Noc w drodze z {a} do {b}.',\n  'season.D': 'dobry sezon', 'season.S': 'średni sezon', 'season.Z': 'zły sezon',\n  'wx.first': 'Pogoda {when}: {x}.', 'wx.month': '{t} °C, {mm} mm deszczu, {days}',\n  'wx.days.one': 'dzień z deszczem', 'wx.days.few': 'dni z deszczem', 'wx.days.many': 'dni z deszczem',\n  'wx.upal': 'upał', 'wx.deszcz': 'pora deszczowa', 'wx.szaro': 'szaro, mało słońca', 'wx.chlod': 'chłodne noce i pochmurno',\n  'wx.morze': 'zimne morze', 'wx.fale': 'wzburzone morze', 'wx.ulewy': 'ulewy przez większość dni', 'wx.tajfuny': 'pora tajfunów', 'wx.powodzie': 'pora powodzi',\n  'ev.event': 'W tym terminie', 'ev.warn': 'Uwaga w tym terminie',\n"),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `4 changes`. W `tests/content.test.js`, w `FAMILIES`, za wpisem `'mon3.': […],` dopisz:

```js
 'monl.': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'season.': ['D', 'S', 'Z'], 'why.': ['from', 'to'], 'wx.': WEATHER_WHY,
    'off.r.': ['removed', 'level', 'closed', 'season', 'profile', 'far', 'beaten'],
```

- [ ] **Krok 7: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: `ALL PASS`; sondy `done, all checks ok` (druga trasa ma noc w Hà Nội w drodze: „Noc w drodze z Cát Bà do Ba Bể.”).

- [ ] **Krok 8: Zrzut z złym sezonem zainteresowania**

```bash
bash tests/shot.sh 'od=SGN&do=HAN&miesiac=2027-09&dni=15&co=morze&poziom=2' 390 "$TMPDIR/t9-390.png" 4200
```

Oczekiwane: w ostrzeżeniach „Morze i wyspy: we wrześniu Phú Quốc i Cát Bà mają zły sezon (…)”; w kartach „Wybrane, bo: …” i „Pogoda we wrześniu: …”; pod paskiem dni „Nie ma na twojej trasie” z powodem przy każdym miejscu i linijką „Po dodaniu wypadnie: …” przy „Dodaj”.

- [ ] **Krok 9: Commit**

```bash
git add site2/src/app.js site2/src/template.html site2/src/ui.js site2/src/page.js tests/page.test.js tests/content.test.js tests/probes/changes.js
git commit -F - <<'EOF'
Strona: Wybrane, bo… i pogoda w karcie miejsca, wydarzenia, plan na deszcz w mokrych miesiącach, Nie ma na twojej trasie, bo… z zapowiedzią po Dodaj, zły sezon zainteresowania w ostrzeżeniach

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 10: Mapa: kadry, układ i etykiety (czyste funkcje), paleta

Wszystko, co mapa rysuje, liczy czysta funkcja `mapLayout`, więc test kombinacji może sprawdzić etykiety na każdej trasie. Strona przechodzi na paletę kolorów. Rysowanie (zadanie 11) zostaje jeszcze stare, na starych konturach.

**Pliki:**
- Utwórz: `site2/src/panels.js`
- Zmień: `site2/src/page.js` (na końcu), `site2/src/content.js`, `site2/src/content/*.js` (13 miejsc: `color`; Cao Bằng: `poi`), `site2/src/template.html` (paleta), `site2/src/app.js` (`stopColor`, kolor Bản Giốc), `site2/build.py`, `tests/run.sh`
- Test: `tests/page.test.js`, `tests/combos.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje:
  - `MAP_WIDTH = 270`, `MAP_PANELS = { north, centre, south }` z `lon0, lat0, lon1, lat1, bar ('left'|'right'), names: [[klucz UI, lat, lon, 'country'|'water', anchor]]` (panels.js);
  - `panelSize(c)` → `{ lon0, lat0, s, w, h, bar }`; `PANEL_GAP = 16`, `PIN_H = 20`, `AIRPORT_BOX = 12`, `STUB = 30`, `STAY_LABEL_H = 28`, `LINE_H = 14`, `NAME_PX = 11.5`, `SUB_PX = 10`, `SMALL_PX = 10`, `STUB_TIPS`;
  - `textWidth(text, px, mono)`, `overlapArea(a, b)`, `placeLabels(items, obstacles, bounds)`;
  - `mapLayout(route, st, m)`, `m = { panels, places, content, airports, say }` → `{ height, panels: [{ key, y, p, names, segs, stubs, pins, airports, pois, faint, labels }] }`; etykieta: `{ kind: 'stop'|'stub'|'poi'|'faint', key, lines, x, y, anchor, box, clear }`, gdzie `y` to góra ramki, a `x` punkt zaczepienia tekstu;
  - pola treści `color` (numer palety 1–20; noc w drodze bez niego) i `poi: { name, pt }`; `AIRPORTS[code].short` (nazwa na strzałce mapy);
  - zmienne CSS `--pal-1`…`--pal-20` w trzech blokach; `stopColor(id)` = `var(--pal-N)`.

- [ ] **Krok 1: Testy, które nie przechodzą.** W `tests/page.test.js`, przed komentarzem `/* ---------- travel texts ---------- */`, dopisz:

```js
/* ---------- the map ---------- */
eq([panelSize(MAP_PANELS.north).w, panelSize(MAP_PANELS.north).h, panelSize(MAP_PANELS.centre).h, panelSize(MAP_PANELS.south).h], [270, 250, 233, 177],
  'the panels: MAP_WIDTH wide, as high as their latitudes at that scale');
eq(textWidth('Dni 1–3', 10, true), 7 * 10 * 0.61, 'a monospaced text: 0.61 em a letter');
ok(textWidth('Hồ Chí Minh City', 11.5) > 0.47 * 11.5 * 16 && textWidth('Huế', 11.5) > 0.62 * 11.5 * 3, 'a name: no narrower than Chrome draws it (0.47–0.62 em a letter)');
var B = { w: 300, h: 100 };
function spots(list) { return list.map(function (l) { return l ? [l.anchor, l.box.x, l.box.y, l.clear] : null; }); }
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }, { x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [], B)),
  [['start', 110, 40, true], ['end', 50, 40, true]], 'labels: the first to the right of its point, the next one, which would cover it, to the left');
eq(spots(placeLabels([{ x: 290, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [], B)), [['end', 240, 40, true]], 'by the edge: on the side that stays inside');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10, toward: [0, 1] }], [], B)), [['middle', 80, 60, true]], 'toward: below the point first');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10, drop: true }, { x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [{ x: 0, y: 0, w: 300, h: 100 }], B)),
  [null, ['start', 110, 40, false]], 'nothing free: a label that may drop is left out, any other takes the place that covers least');
var withAlt = placeLabels([{ x: 20, y: 20, alts: [[200, 50]], w: 30, h: 10, gx: 3, gy: 3 }], [{ x: 0, y: 0, w: 100, h: 100 }], B)[0];
eq([withAlt.alt, withAlt.clear], [1, true], 'when the first point has no room, a label stands by its other point');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [{ x: 0, y: 0, w: 300, h: 100, k: 0.3 }], B)), [['start', 110, 40, true]],
  'an obstacle with k under 1 (a faint dot) may be covered: the label is still clear');
eq(spots(placeLabels([{ x: 100, y: 50, w: 40, h: 20, gx: 10, gy: 10 }], [{ x: 112, y: 45, w: 8, h: 8, k: 0.3 }], B)), [['end', 50, 40, true]],
  'but a free place wins over one that covers a faint dot');

var MAPW = { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
function pinsOf(L) { return L.panels.map(function (P) { return P.key + ':' + P.pins.map(function (p) { return p.key + '(' + p.nums + ')'; }).join(','); }); }
function labelsOf(P, kind) { return P.labels.filter(function (l) { return l.kind === kind; }).map(function (l) { return l.lines.join('/'); }); }
var mA = mapLayout(tA.r, tA.st, MAPW);   // saigon, dalat, hoian, hue, hanoi: flights Đà Lạt → Đà Nẵng and Huế → Hà Nội
eq(pinsOf(mA), ['north:hanoi(5)', 'centre:hoian(3),hue(4)', 'south:saigon(1),dalat(2)'], 'each stay on its panel, with its number');
eq([mA.panels[1].y, mA.panels[2].y, mA.height], [266, 515, 692], 'the panels one under another, 16 px apart');
eq([labelsOf(mA.panels[0], 'stub'), labelsOf(mA.panels[1], 'stub').sort(), labelsOf(mA.panels[2], 'stub')], [['✈ Huế'], ['✈ Hà Nội', '✈ Đà Lạt'], ['✈ Đà Nẵng']],
  'a flight to another panel: a stub at each end, named after the other end');
eq([labelsOf(mA.panels[2], 'stop'), labelsOf(mA.panels[2], 'faint').sort()], [['Hồ Chí Minh City/Dni 1–3', 'Đà Lạt/Dni 4–6'], ['Cát Tiên', 'Mekong', 'Phú Quốc']],
  'the south: the stays named with their days, the places off the trip by name');
eq([mA.panels[0].airports.length, mA.panels[2].airports.length, mA.panels[1].airports.length], [1, 1, 0], 'the airports of the trip: Hà Nội in the north, Hồ Chí Minh City in the south');
var han = mA.panels[0].airports[0], hanoiPin = mA.panels[0].pins[0];
ok(overlapArea({ x: han.bx - AIRPORT_BOX / 2, y: han.by - AIRPORT_BOX / 2, w: AIRPORT_BOX, h: AIRPORT_BOX }, { x: hanoiPin.x - hanoiPin.w / 2, y: hanoiPin.y - PIN_H / 2, w: hanoiPin.w, h: PIN_H }) === 0 &&
  (han.bx !== han.x || han.by !== han.y), 'the box of Hà Nội airport moves off the pin of the city');
var mH = mapLayout(tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 12, interests: [], level: 2 }).r,
  tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 12, interests: [], level: 2 }).st, MAPW);
eq([pinsOf(mH)[0], labelsOf(mH.panels[0], 'stop'), labelsOf(mH.panels[0], 'stub')], ['north:hanoi(1·6)', ['Hà Nội/Dni 1, 11'], ['✈ HCMC/✈ Huế']],
  'a round trip: one pin for the city with both numbers; two flights from one airport make one stub, short names of airports');
var mD = mapLayout(tD.r, tD.st, MAPW);   // Cao Bằng on the trip: Bản Giốc
eq([mD.panels[0].pois.map(function (q) { return q.name; }), labelsOf(mD.panels[0], 'poi')], [['Bản Giốc'], ['Bản Giốc']], 'a point of interest with its stay');
[mA, mH, mD].forEach(function (L, n) {
  L.panels.forEach(function (P) {
    P.labels.forEach(function (l) { ok(l.clear, 'map ' + n + ' ' + P.key + ': ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
  });
});
print('map ok');
```

W `tests/combos.test.js` pod linią `var held = 0; …` dopisz:

```js
  var MAP_WORDS = { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
```

a przed linią `need(nights === s.days - 1, nights + ' nights, want ' + (s.days - 1));` dopisz:

```js
    // the map (mapLayout in page.js): every stay has its label on a panel, and no label covers another one, a marker or the
    // edge of its panel (a faint dot's name is left out when it does not fit)
    var lay = mapLayout(r, st, MAP_WORDS);
    lay.panels.forEach(function (P) {
      P.labels.forEach(function (l) { need(l.kind === 'faint' || l.clear, 'map ' + P.key + ': the label of ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
    });
    r.stops.forEach(function (x) {
      need(lay.panels.some(function (P) { return P.labels.some(function (l) { return l.kind === 'stop' && l.key === node(x.id); }); }), 'map: ' + x.id + ' has no label on any panel');
    });
```

W `tests/content.test.js`:
  - w sprawdzeniu `content` zamień listę `PLACE_KEYS` na `['name', 'short', 'sub', 'region', 'maps', 'pt', 'color', 'poi', 'photos', 'days', 'again', 'gem', 'skip', 'instead', 'events']`, a pod nią dopisz:

```js
  var PALETTE = (readFile('site2/src/template.html').match(/--pal-\d+:/g) || []).length / 3, colours = {};   // light, dark, dark again
```

  - pod sprawdzeniem `pt` (linia z `id + ': pt is [lat, lon] in Vietnam'`) dopisz:

```js
    if (p.node) need(c.color == null, id + ': a night on the way takes the colour of ' + p.node + ', so it has none');
    else {
      need(c.color % 1 === 0 && c.color >= 1 && c.color <= PALETTE, id + ': color, a number of the palette, 1–' + PALETTE);
      need(!colours[c.color], id + ': color ' + c.color + ' is ' + colours[c.color] + '\'s too');
      colours[c.color] = id;
    }
    if (c.poi != null) need(c.poi && isText(c.poi.name) && Array.isArray(c.poi.pt) && c.poi.pt.length === 2, id + ': poi is { name, pt }');
```

  - przed komentarzem `/* The interface texts (ui.js): none empty;` dopisz sprawdzenie palety:

```js
/* The palette of the places (--pal-N in template.html): 20 colours in each of the three blocks, light and dark, and the
   number of a day on each colour (--on-c) has a contrast of at least 4.5:1 (WCAG AA), in both themes. */
contentCheck('palette', function (need) {
  var css = readFile('site2/src/template.html').split('<style>')[1].split('</style>')[0];
  var light = /:root \{([^}]*)\}/.exec(css)[1], dark = /:root:not\(\[data-theme="light"\]\) \{([^}]*)\}/.exec(css)[1];
  function vars(block) { var o = {}; block.replace(/--([a-z0-9-]+): (#[0-9a-f]{6});/g, function (m, k, v) { o[k] = v; }); return o; }
  function lum(hex) {
    return [1, 3, 5].map(function (i) { var c = parseInt(hex.slice(i, i + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); })
      .reduce(function (a, c, i) { return a + c * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  [['light', vars(light)], ['dark', vars(dark)]].forEach(function (theme) {
    var v = theme[1];
    for (var n = 1; n <= 20; n++) {
      need(v['pal-' + n], theme[0] + ': --pal-' + n + ' is missing');
      if (v['pal-' + n]) need(ratio(v['pal-' + n], v['on-c']) >= 4.5, theme[0] + ': --pal-' + n + ' ' + v['pal-' + n] + ' and the number on it ' + v['on-c'] + ': contrast ' + ratio(v['pal-' + n], v['on-c']).toFixed(2) + ' < 4.5');
    }
  });
  need(css.split('--pal-1:').length - 1 === 3, 'the palette in all three blocks: light, dark by the system, dark chosen');
});

```

  - w sprawdzeniu `ui` czytaj też `panels.js` (nazwy na podkładzie to klucze interfejsu): zamień dwie pierwsze linie

```js
  var pl = UI.pl, app = readFile('site2/src/app.js'), tpl = readFile('site2/src/template.html'), page = readFile('site2/src/page.js');
  var code = [app, page, readFile('site2/src/content.js'), tpl].join('\n'), used = {};
```

    na

```js
  var pl = UI.pl, app = readFile('site2/src/app.js'), tpl = readFile('site2/src/template.html'), page = readFile('site2/src/page.js'), panels = readFile('site2/src/panels.js');
  var code = [app, page, readFile('site2/src/content.js'), panels, tpl].join('\n'), used = {};
```

    a pod linią z `'app.js (map labels)'` dopisz:

```js
  (panels.match(/'m\.[a-z]+'/g) || []).forEach(function (m) { wants(m.slice(1, -1), 'panels.js (names on the basemap)'); });
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: panelSize` albo `MAP_PANELS` (tests/page.test.js).

- [ ] **Krok 3: `site2/src/panels.js`** (cały plik):

```js
/* The map's three panels, one under another on the page, each by its top-left corner (lon0, lat0) and bottom-right corner
   (lon1, lat1); bar: the bottom corner of the scale bar, 'left' or 'right', where the panel is empty; names: the names on
   the basemap, [UI key, lat, lon, kind ('country' or 'water'), anchor ('start', 'middle' or 'end')].
   Every panel is MAP_WIDTH px wide, so its scale and height follow (panelSize in page.js). geo/make_basemap.py
   reads this file to cut the contours (basemap.js); after a change here, run it again. North: Sa Pa, Hà Giang and Bản Giốc
   to Thọ Xuân airport; centre: Phong Nha to Hội An and Mỹ Sơn; south: Phú Quốc and the Mekong delta to Đà Lạt, Yok Đôn and
   Nha Trang. */
var MAP_WIDTH = 270;
var MAP_PANELS = {
  north: { lon0: 103.45, lat0: 23.45, lon1: 107.6, lat1: 19.6, bar: 'left',
    names: [['m.china', 23.25, 106.0, 'country', 'middle'], ['m.laos', 20.55, 103.55, 'country', 'start'], ['m.tonkin', 19.75, 107.5, 'water', 'end']] },
  centre: { lon0: 105.6, lat0: 17.95, lon1: 108.9, lat1: 15.1, bar: 'left',
    names: [['m.laos', 16.3, 106.3, 'country', 'middle'], ['m.sea', 17.6, 108.8, 'water', 'end']] },
  south: { lon0: 103.6, lat0: 13.3, lon1: 109.25, lat1: 9.6, bar: 'left',
    names: [['m.cambodia', 12.5, 105.0, 'country', 'middle'], ['m.sea', 9.75, 109.1, 'water', 'end']] }
};
```

- [ ] **Krok 4: `site2/src/page.js`.** Na końcu pliku dopisz część mapy:

```js
/* ---------- the map: three panels, the markers and the labels ---------- */
var PANEL_GAP = 16;                               // between two panels, px
/* A panel's scale (px per degree) and height from its corners (panels.js): MAP_WIDTH px wide. geo/make_basemap.py works
   them out the same way, rounding the height half up. */
function panelSize(c) {
  var s = MAP_WIDTH / (c.lon1 - c.lon0);
  return { lon0: c.lon0, lat0: c.lat0, s: s, w: MAP_WIDTH, h: Math.round((c.lat0 - c.lat1) * s), bar: c.bar };
}
var PIN_H = 20, POINT_R = 4, AIRPORT_BOX = 12, STUB = 30;
var NAME_PX = 11.5, SUB_PX = 10, SMALL_PX = 10;   // the label fonts: .m-label, .m-sub and .m-faint-label in template.html
// the boxes of labels: a stay's name over its days, a line of 10 px. Chrome draws the glyphs of a line 1.3 em high (IBM Plex:
// 1.025 em above the baseline, 0.275 em below), so a box leaves half a pixel above and below them (app.js: labelText)
var STAY_LABEL_H = 28, LINE_H = 14;

/* A text's width in px, a little more than it takes: IBM Plex Sans semibold by the kind of each letter (measured in
   Chrome, 11.10.2026: 0.47–0.62 em a letter over the names of the places), IBM Plex Mono 0.6 em a letter. */
function textWidth(text, px, mono) {
  if (mono) return String(text).length * px * 0.61;
  var em = 0;
  String(text).split('').forEach(function (ch) {
    em += ch === ' ' ? 0.26 : /[iljI.,:;'!|()]/.test(ch) ? 0.3 : /[ftr]/.test(ch) ? 0.4 : /[mwMW]/.test(ch) ? 0.9 : /[A-ZĐ]/.test(ch) ? 0.68 : 0.58;
  });
  return em * px + 2;
}
function overlapArea(a, b) {
  return Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
}

/* Labels on one panel, each where it covers no other label, no marker and stays inside the panel, when it can.
   items: [{ x, y (the point), w, h (the label), gx, gy (the gap from the point sideways and up or down), drop, toward,
   alts }], in the order of placing; alts: other points [x, y] the label may stand by instead, tried after the first; obstacles: [{ x, y, w, h, k }] that no label should cover, k the weight of covering it: 1 when
   left out; an obstacle with k under 1 (a faint dot) may be covered when nothing better is free; bounds: { w, h }. Each item tries twelve places around its point (right, left, above, below, then shifted
   up, down or sideways), those on the side of toward ([dx, dy], a direction) first; the first that covers nothing wins,
   else the one that covers least (weighted), or none for an item with drop: true. Returns, in the items' order,
   { x, y (the text's anchor point, at the box's top), anchor, box, clear, cost, alt (0 for the first point, then the
   number of the alts point + 1) } or null. */
function placeLabels(items, obstacles, bounds) {
  var placed = [];
  return items.map(function (it) {
    var w = it.w, h = it.h, gx = it.gx, gy = it.gy, best = null;
    [[it.x, it.y]].concat(it.alts || []).forEach(function (pt, alt) {
      var x = pt[0], y = pt[1];
      var tries = [[x + gx, y - h / 2, 'start'], [x - gx - w, y - h / 2, 'end'], [x - w / 2, y - gy - h, 'middle'], [x - w / 2, y + gy, 'middle'],
        [x + gx, y - h + 4, 'start'], [x + gx, y - 4, 'start'], [x - gx - w, y - h + 4, 'end'], [x - gx - w, y - 4, 'end'],
        [x - 6, y - gy - h, 'start'], [x + 6 - w, y - gy - h, 'end'], [x - 6, y + gy, 'start'], [x + 6 - w, y + gy, 'end']];
      if (it.toward) {   // the places whose centre lies most in that direction first (a stable sort keeps the rest in order)
        var t = it.toward;
        tries = tries.map(function (p, i) { return { p: p, i: i, d: (p[0] + w / 2 - x) * t[0] + (p[1] + h / 2 - y) * t[1] }; })
          .sort(function (a, b) { return b.d - a.d || a.i - b.i; }).map(function (o) { return o.p; });
      }
      tries.forEach(function (p) {
        var box = { x: p[0], y: p[1], w: w, h: h }, hard = box.w * box.h - overlapArea(box, { x: 0, y: 0, w: bounds.w, h: bounds.h }), soft = 0;
        placed.forEach(function (o) { hard += overlapArea(box, o); });
        obstacles.forEach(function (o) { if (o.k == null) hard += overlapArea(box, o); else soft += overlapArea(box, o) * o.k; });
        if (!best || hard + soft < best.cost - 1e-9) best = { cost: hard + soft, hard: hard, box: box, anchor: p[2], alt: alt };
      });
    });
    var clear = best.hard < 0.01;   // sums of floating point areas: less than 0.01 px² is nothing
    if (!clear && it.drop) return null;
    placed.push(best.box);
    var b = best.box;
    return { x: best.anchor === 'start' ? b.x : best.anchor === 'end' ? b.x + b.w : b.x + b.w / 2, y: b.y, anchor: best.anchor, box: b,
      clear: clear, cost: best.cost, alt: best.alt };
  });
}

/* Everything the map draws, in px, for one trip. The panels stand one under another, PANEL_GAP apart (MAP_PANELS in
   panels.js, sized by panelSize). Each panel gets: its stays as pins with the stay numbers (a city twice on a round trip is
   one pin); the legs inside it; a stub for the legs to another panel, one per point, toward where they go, with the names
   of the other ends; the trip's airports; a stay's point of interest (content poi); the places off the trip as faint dots;
   and the labels. The airports' boxes come first: on their point, or moved straight off a pin that would hide them. Then
   the labels of the stays (the most crowded first), the stubs and the points of interest, placed by placeLabels so that
   none covers another, a marker or the edge (a stub gets longer or turns when its label finds no room); a label that
   finds none starts the placing again in front, up to ten times, and the try with the fewest such labels wins. Last, the
   names of the faint dots, only where they fit.
   The names on the basemap (the panel's names) are drawn first; a label may cover one when nothing better is free.
   route: planRoute's trip; st: normSettings' result; m: { panels, places, content, airports, say }: MAP_PANELS, PLACES,
   CONTENT, AIRPORTS and say(key) giving an interface text (the names on the basemap; 'day' and 'days' before day numbers).
   Returns { height, panels: [{ key, y, p (panelSize), names, segs, stubs, pins, airports, pois, faint, labels }] }; a name
   is { text, kind, x, y, anchor }, a label { kind: 'stop'|'stub'|'poi'|'faint', key, lines, x, y, anchor, box, clear }. */
// a stub's length (× STUB) and turn in degrees, in the order tried
var STUB_TIPS = [[1, 0], [1.5, 0], [2, 0], [1.5, 35], [1.5, -35], [2, 60], [2, -60], [2.5, 0]];
function mapLayout(route, st, m) {
  var groups = {}, order = [], out = [], top = 0;
  function node(id) { return m.places[id].node || id; }
  function where(n) { return m.airports[n] ? m.airports[n].pt : m.content[n].pt; }
  function nameOf(n) { return m.airports[n] ? m.airports[n].short || m.airports[n].name : m.content[n].short; }
  route.stops.forEach(function (s, i) {
    var k = node(s.id);
    if (!groups[k]) { groups[k] = []; order.push(k); }
    groups[k].push({ num: i + 1, start: s.start, end: s.end });
  });
  var legs = route.stops.map(function (s) { return s.leg; }).concat([route.home]);
  var ends = st.from === st.to ? [st.from] : [st.from, st.to];
  Object.keys(m.panels).forEach(function (key) {
    var p = panelSize(m.panels[key]), P = { key: key, y: top, p: p, names: [], segs: [], stubs: [], pins: [], airports: [], pois: [], faint: [], labels: [] };
    function proj(pt) { return [(pt[1] - p.lon0) * p.s, (p.lat0 - pt[0]) * p.s]; }
    function inside(q) { return q[0] >= 0 && q[0] <= p.w && q[1] >= 0 && q[1] <= p.h; }
    function pinBox(pn) { return { x: pn.x - pn.w / 2, y: pn.y - PIN_H / 2, w: pn.w, h: PIN_H }; }
    function dot(q, k) { return { x: q[0] - POINT_R, y: q[1] - POINT_R, w: 2 * POINT_R, h: 2 * POINT_R, k: k }; }
    // the panel's title (top left) and scale bar (bottom left or right) take their corners
    var obstacles = [{ x: 0, y: 0, w: 84, h: 24 }, { x: p.bar === 'left' ? 0 : p.w - 80, y: p.h - 18, w: 80, h: 18 }], items = [], faint = [];
    (m.panels[key].names || []).forEach(function (n) {   // the names on the basemap: countries in 9 px capitals, water in 11 px italics
      var q = proj([n[1], n[2]]), text = m.say(n[0]), w = n[3] === 'country' ? text.length * 9 * 0.78 : textWidth(text, 11) * 0.9;
      P.names.push({ text: text, kind: n[3], x: q[0], y: q[1], anchor: n[4] });
      obstacles.push({ x: n[4] === 'start' ? q[0] : n[4] === 'end' ? q[0] - w : q[0] - w / 2, y: q[1] - 10, w: w, h: 13, k: 0.5 });
    });
    order.forEach(function (k) {
      var q = proj(m.content[k].pt);
      if (!inside(q)) return;
      var nums = groups[k].map(function (v) { return v.num; }).join('·'), w = Math.max(PIN_H, 10 + nums.length * 6.5);
      var parts = groups[k].map(function (v) { return v.start === v.end ? '' + v.start : v.start + '–' + v.end; });
      var sub = m.say(parts.length > 1 || parts[0].indexOf('–') > -1 ? 'days' : 'day') + ' ' + parts.join(', ');
      P.pins.push({ key: k, x: q[0], y: q[1], w: w, nums: nums });
      items.push({ x: q[0], y: q[1], w: Math.max(textWidth(m.content[k].short, NAME_PX), textWidth(sub, SUB_PX, true)), h: STAY_LABEL_H, gx: w / 2 + 3, gy: PIN_H / 2 + 2,
        toward: q[0] > p.w - 70 ? [-1, 0] : q[0] < 70 ? [1, 0] : null,   // near a side of the panel, the label tries inward first
        what: { kind: 'stop', key: k, lines: [m.content[k].short, sub] } });
    });
    P.pins.forEach(function (pn) { obstacles.push(pinBox(pn)); });
    // the stays in crowded places first: the more pins within 70 px, the earlier, then in the order of the trip
    function crowd(it) { return P.pins.filter(function (pn) { return Math.abs(pn.x - it.x) < 70 && Math.abs(pn.y - it.y) < 70; }).length; }
    items = items.map(function (it, i) { return { it: it, i: i, c: crowd(it) }; }).sort(function (a, b) { return b.c - a.c || a.i - b.i; }).map(function (x) { return x.it; });
    // the airports' boxes: on their point, or moved straight off a pin that would hide them, as little as it takes
    ends.forEach(function (code) {
      var q = proj(m.airports[code].pt), half = AIRPORT_BOX / 2, box = { x: q[0] - half, y: q[1] - half, w: AIRPORT_BOX, h: AIRPORT_BOX };
      if (!inside(q)) return;
      function hit() { return P.pins.filter(function (pn) { return overlapArea(box, pinBox(pn)) > 0; })[0]; }
      var pin = hit();
      if (pin) {
        var vx = q[0] - pin.x, vy = q[1] - pin.y, vl = Math.sqrt(vx * vx + vy * vy);
        if (vl < 1) { vx = 0; vy = -1; vl = 1; }   // the point under the middle of the pin: up
        for (var step = 1; step <= 40 && hit(); step++) { box.x = q[0] - half + vx / vl * step; box.y = q[1] - half + vy / vl * step; }
      }
      P.airports.push({ code: code, x: q[0], y: q[1], bx: box.x + half, by: box.y + half });
      obstacles.push(box, { x: q[0] - 3, y: q[1] - 3, w: 6, h: 6 });   // the box, and the point where the road starts
    });
    // the legs inside the panel; the legs from one point here to another panel make one stub
    var stubAt = {}, stubs = [];
    legs.forEach(function (L) {
      L.segs.forEach(function (g) {
        var a = proj(where(g.from)), b = proj(where(g.to)), ia = inside(a), ib = inside(b);
        if (ia && ib) { P.segs.push({ mode: g.mode, x1: a[0], y1: a[1], x2: b[0], y2: b[1] }); return; }
        if (!ia && !ib) return;
        var here = ia ? g.from : g.to, from = ia ? a : b, to = ia ? b : a, dx = to[0] - from[0], dy = to[1] - from[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
        var s = stubAt[here] || (stubAt[here] = { mode: g.mode, x1: from[0], y1: from[1], vx: 0, vy: 0, names: [] });
        if (!s.names.length) stubs.push(s);
        s.vx += dx / len; s.vy += dy / len;
        if (s.names.indexOf(nameOf(ia ? g.to : g.from)) < 0) s.names.push(nameOf(ia ? g.to : g.from));
      });
    });
    // a stub's tip: len px from its point toward its way, turned by deg degrees, held 4 px inside the panel
    function tipOf(s, len, deg) {
      var a = (deg || 0) * Math.PI / 180, ux = s.ux * Math.cos(a) - s.uy * Math.sin(a), uy = s.ux * Math.sin(a) + s.uy * Math.cos(a), k = len;
      [[ux, s.x1, p.w], [uy, s.y1, p.h]].forEach(function (v) {
        if (v[0] > 0) k = Math.min(k, (v[2] - 4 - v[1]) / v[0]);
        if (v[0] < 0) k = Math.min(k, (4 - v[1]) / v[0]);
      });
      k = Math.max(k, 0);
      return [s.x1 + ux * k, s.y1 + uy * k];
    }
    stubs.forEach(function (s) {
      var vl = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      if (vl < 0.1) { s.vx = 0; s.vy = 1; vl = 1; }   // two ways that cancel out (there and back): straight down
      s.ux = s.vx / vl; s.uy = s.vy / vl;
      var lines = s.names.map(function (n) { return '✈ ' + n; }), tips = STUB_TIPS.map(function (v) { return tipOf(s, STUB * v[0], v[1]); });
      items.push({ x: tips[0][0], y: tips[0][1], alts: tips.slice(1), w: Math.max.apply(null, lines.map(function (l) { return textWidth(l, SUB_PX, true); })),
        h: LINE_H * lines.length, gx: 3, gy: 3, toward: [s.ux, s.uy], stub: s, what: { kind: 'stub', key: s.names.join(', '), lines: lines } });
    });
    route.stops.forEach(function (s) {
      var poi = m.content[s.id].poi, q = poi && proj(poi.pt);
      if (!q || !inside(q) || P.pois.some(function (o) { return o.name === poi.name; })) return;
      P.pois.push({ name: poi.name, x: q[0], y: q[1], from: proj(m.content[s.id].pt) });
      obstacles.push(dot(q));
      items.push({ x: q[0], y: q[1], w: textWidth(poi.name, SUB_PX, true), h: LINE_H, gx: POINT_R + 3, gy: POINT_R + 2, what: { kind: 'poi', key: poi.name, lines: [poi.name] } });
    });
    Object.keys(m.places).forEach(function (id) {
      var q = proj(m.content[id].pt);
      if (m.places[id].node || groups[id] || !inside(q)) return;
      P.faint.push({ id: id, x: q[0], y: q[1] });
      obstacles.push(dot(q, 0.3));   // a label may cover a faint dot when nothing better is free
      faint.push({ x: q[0], y: q[1], w: textWidth(m.content[id].short, SMALL_PX), h: LINE_H, gx: POINT_R + 3, gy: POINT_R + 2, drop: true,
        what: { kind: 'faint', key: id, lines: [m.content[id].short] } });
    });
    var best = null, list = items;
    for (var tryNo = 0; tryNo < 10 && list.length; tryNo++) {
      var got = placeLabels(list, obstacles, p), stuck = got.filter(function (l) { return !l.clear; }).length;
      var cost = got.reduce(function (a, l) { return a + l.cost; }, 0);
      if (!best || stuck < best.stuck || (stuck === best.stuck && cost < best.cost - 1e-9)) best = { got: got, list: list, stuck: stuck, cost: cost };
      if (!stuck) break;
      var bad = got.map(function (l, i) { return l.clear ? -1 : i; }).filter(function (i) { return i > -1; })[0];
      list = [list[bad]].concat(list.slice(0, bad), list.slice(bad + 1));
    }
    var taken = obstacles.slice();
    (best ? best.got : []).forEach(function (l, i) {
      var it = best.list[i];
      if (it.stub) {
        var v = STUB_TIPS[l.alt], tip = tipOf(it.stub, STUB * v[0], v[1]);
        P.stubs.push({ mode: it.stub.mode, x1: it.stub.x1, y1: it.stub.y1, x2: tip[0], y2: tip[1] });
      }
      P.labels.push(Object.assign({}, it.what, l));
      taken.push(l.box);
    });
    placeLabels(faint, taken, p).forEach(function (l, i) { if (l) P.labels.push(Object.assign({}, faint[i].what, l)); });
    out.push(P);
    top += p.h + PANEL_GAP;
  });
  return { height: top - PANEL_GAP, panels: out };
}
```

Jak to działa, w skrócie:
- `textWidth` szacuje szerokość trochę ponad to, co rysuje Chrome (pomiar w Chrome 11.10.2026: 0,47–0,62 em na literę w nazwach miejsc), a ramki etykiet mają pół piksela zapasu nad i pod literami (wiersz w IBM Plex to 1,3 em);
- `placeLabels` próbuje 12 miejsc wokół punktu (dla strzałek także przy dłuższej albo skręconej strzałce, `alts`) i bierze pierwsze wolne; blada kropka (`k < 1`) może zostać przykryta, gdy nic lepszego nie ma;
- `mapLayout` najpierw odsuwa ramki lotnisk od pinezek, potem układa etykiety miejsc (najciaśniejsze najpierw), strzałek i punktów zainteresowania, do dziesięciu razy z inną kolejnością, a na końcu nazwy bladych kropek tam, gdzie się mieszczą.

- [ ] **Krok 5: `site2/src/content.js`.** Pod opisem pola `region` (linia `- region: one of REGIONS; maps: …; pt: [lat, lon] on the map;`) dopisz:

```js
   - color: the place's colour, a number of the palette in template.html (--pal-1…); a night on the way has none, it takes
     the colour of its node; poi: { name, pt } a point of interest the map shows next to the stay (Bản Giốc by Cao Bằng);
```

Komentarz nad `AIRPORTS` zastąp:

```js
/* The airports of the travel data: name in texts, place for Google Maps directions, point on the map [lat, lon]; short:
   the name on the map's arrows to another panel, where it differs. */
```

i dopisz pole `short` trzem lotniskom: `SGN: { name: 'Hồ Chí Minh City', short: 'HCMC', …`, `HPH: { name: 'Hải Phòng (Cát Bi)', short: 'Hải Phòng', …`, `THD: { name: 'Thanh Hóa (Thọ Xuân)', short: 'Thanh Hóa', …`.

- [ ] **Krok 6: Kolory i Bản Giốc w treści.** W każdym pliku `site2/src/content/<id>.js` (poza `hanoiStop.js`) w linii z `region`, `maps` i `pt` dopisz za `pt: [lat, lon]` pole `color` z numerem palety; numery idą za kolejnością miejsc w `places.js`, więc kolory się nie zmieniają:

| miejsce | color | | miejsce | color |
|---|---|---|---|---|
| saigon | 1 | | puluong | 8 |
| mekong | 2 | | ninhbinh | 9 |
| phuquoc | 3 | | catba | 10 |
| cattien | 4 | | hanoi | 11 |
| dalat | 5 | | babe | 12 |
| hoian | 6 | | caobang | 13 |
| hue | 7 | | | |

Przykład: `region: 'south', maps: 'Da Lat, Vietnam', pt: [11.94, 108.44], color: 5,`. W `content/caobang.js` pod `gem` dopisz:

```js
  poi: { name: 'Bản Giốc', pt: [22.85, 106.72] },
```

- [ ] **Krok 7: Paleta w szablonie i `app.js`.** Paleta zastępuje kolory `--c-<id>` w trzech blokach (jasnym i dwóch ciemnych); numery 1–13 mają dzisiejsze kolory miejsc, 14–20 czekają na nowe miejsca (kontrast z numerem dnia sprawdzony: co najmniej 5,2:1 w jasnym i 7,8:1 w ciemnym motywie). Bản Giốc bierze kolor z elementu. Uruchom (sprawdzony skrypt):

```bash
python3 - <<'PY'
p = 'site2/src/template.html'
t = open(p, encoding='utf-8').read()
pairs = [
 ('  --c-saigon: #4b5a66; --c-dalat: #2d7552; --c-cattien: #4a7426; --c-mekong: #82552c; --c-phuquoc: #12707e; --c-hoian: #a1443a; --c-hue: #3f4a9e;\n  --c-puluong: #5c7520; --c-ninhbinh: #23676a; --c-catba: #2b5f9b; --c-caobang: #946000; --c-babe: #6e4fa0; --c-hanoi: #9a3f6e;\n',
  '  /* the colours of the places (palette numbers in content/<id>.js, field color); 14–20 wait for new places */\n  --pal-1: #4b5a66; --pal-2: #82552c; --pal-3: #12707e; --pal-4: #4a7426; --pal-5: #2d7552; --pal-6: #a1443a; --pal-7: #3f4a9e;\n  --pal-8: #5c7520; --pal-9: #23676a; --pal-10: #2b5f9b; --pal-11: #9a3f6e; --pal-12: #6e4fa0; --pal-13: #946000; --pal-14: #b0305a;\n  --pal-15: #5146a8; --pal-16: #2f6b3a; --pal-17: #a3500f; --pal-18: #7a3d8a; --pal-19: #1f6286; --pal-20: #646419;\n'),
 ('  :root:not([data-theme="light"]) {\n    --paper: #0c1513; --surface: #131f1c; --ink: #e3ece8; --muted: #9bb0a8; --line: #26342f;\n    --accent: #5cc4ad; --accent-soft: #163a32; --warm-soft: #3a2e14; --warm: #e8b856; --cool-soft: #172c42; --cool: #8ab8ec;\n    --wet-soft: #43211b; --wet: #f09a85; --lilac-soft: #2b2440; --on-c: #0c1513; --sea: #0b1a26; --land: #26372f; --land-o: #18231f; --border: #4a5d55; --river: #2f5a6e; --water-ink: #7fa6bd;\n    --c-saigon: #b2c1cc; --c-dalat: #6fcf9d; --c-cattien: #a2d16f; --c-mekong: #d9a874; --c-phuquoc: #5fcad8; --c-hoian: #ee8f80; --c-hue: #a9b1f0;\n    --c-puluong: #c3d975; --c-ninhbinh: #6cc6c0; --c-catba: #86b4ee; --c-caobang: #f0bb4f; --c-babe: #bba0ec; --c-hanoi: #ec96c3;\n',
  '  :root:not([data-theme="light"]) {\n    --paper: #0c1513; --surface: #131f1c; --ink: #e3ece8; --muted: #9bb0a8; --line: #26342f;\n    --accent: #5cc4ad; --accent-soft: #163a32; --warm-soft: #3a2e14; --warm: #e8b856; --cool-soft: #172c42; --cool: #8ab8ec;\n    --wet-soft: #43211b; --wet: #f09a85; --lilac-soft: #2b2440; --on-c: #0c1513; --sea: #0b1a26; --land: #26372f; --land-o: #18231f; --border: #4a5d55; --river: #2f5a6e; --water-ink: #7fa6bd;\n    --pal-1: #b2c1cc; --pal-2: #d9a874; --pal-3: #5fcad8; --pal-4: #a2d16f; --pal-5: #6fcf9d; --pal-6: #ee8f80; --pal-7: #a9b1f0;\n    --pal-8: #c3d975; --pal-9: #6cc6c0; --pal-10: #86b4ee; --pal-11: #ec96c3; --pal-12: #bba0ec; --pal-13: #f0bb4f; --pal-14: #f59ab8;\n    --pal-15: #b2acf2; --pal-16: #86d394; --pal-17: #f4ad6d; --pal-18: #d9a3e6; --pal-19: #7cc0e6; --pal-20: #d3d36a;\n'),
 ('  :root[data-theme="dark"] {\n    --paper: #0c1513; --surface: #131f1c; --ink: #e3ece8; --muted: #9bb0a8; --line: #26342f;\n    --accent: #5cc4ad; --accent-soft: #163a32; --warm-soft: #3a2e14; --warm: #e8b856; --cool-soft: #172c42; --cool: #8ab8ec;\n    --wet-soft: #43211b; --wet: #f09a85; --lilac-soft: #2b2440; --on-c: #0c1513; --sea: #0b1a26; --land: #26372f; --land-o: #18231f; --border: #4a5d55; --river: #2f5a6e; --water-ink: #7fa6bd;\n    --c-saigon: #b2c1cc; --c-dalat: #6fcf9d; --c-cattien: #a2d16f; --c-mekong: #d9a874; --c-phuquoc: #5fcad8; --c-hoian: #ee8f80; --c-hue: #a9b1f0;\n    --c-puluong: #c3d975; --c-ninhbinh: #6cc6c0; --c-catba: #86b4ee; --c-caobang: #f0bb4f; --c-babe: #bba0ec; --c-hanoi: #ec96c3;\n',
  '  :root[data-theme="dark"] {\n    --paper: #0c1513; --surface: #131f1c; --ink: #e3ece8; --muted: #9bb0a8; --line: #26342f;\n    --accent: #5cc4ad; --accent-soft: #163a32; --warm-soft: #3a2e14; --warm: #e8b856; --cool-soft: #172c42; --cool: #8ab8ec;\n    --wet-soft: #43211b; --wet: #f09a85; --lilac-soft: #2b2440; --on-c: #0c1513; --sea: #0b1a26; --land: #26372f; --land-o: #18231f; --border: #4a5d55; --river: #2f5a6e; --water-ink: #7fa6bd;\n    --pal-1: #b2c1cc; --pal-2: #d9a874; --pal-3: #5fcad8; --pal-4: #a2d16f; --pal-5: #6fcf9d; --pal-6: #ee8f80; --pal-7: #a9b1f0;\n    --pal-8: #c3d975; --pal-9: #6cc6c0; --pal-10: #86b4ee; --pal-11: #ec96c3; --pal-12: #bba0ec; --pal-13: #f0bb4f; --pal-14: #f59ab8;\n    --pal-15: #b2acf2; --pal-16: #86d394; --pal-17: #f4ad6d; --pal-18: #d9a3e6; --pal-19: #7cc0e6; --pal-20: #d3d36a;\n'),
 ('.m-poi { fill: var(--surface); stroke: var(--c-caobang); stroke-width: 2; }\n',
  '.m-poi { fill: var(--surface); stroke: var(--c); stroke-width: 2; }\n'),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `4 changes`. W `site2/src/app.js` zamień `function stopColor(id) { return 'var(--c-' + nodeOf(id) + ')'; }` na:

```js
  function stopColor(id) { return 'var(--pal-' + C(nodeOf(id)).color + ')'; }
```

a w starym rysowaniu mapy (do zadania 11) w linii z `<circle class="m-poi"` zamień `r="4"/>' +` na `r="4" style="--c:' + stopColor('caobang') + '"/>' +`.

- [ ] **Krok 8: Kolejność skryptów.** W `site2/build.py` w `SCRIPTS` zamień `["photos.js", "ui.js", "page.js", "basemap.js"]` na `["photos.js", "ui.js", "panels.js", "page.js", "basemap.js"]`; w `tests/run.sh` w `SOURCES` zamień `site2/src/ui.js site2/src/page.js` na `site2/src/ui.js site2/src/panels.js site2/src/page.js`.

- [ ] **Krok 9: Uruchom testy**

```bash
time bash tests/run.sh
time bash tests/run.sh --full | grep -A2 "combos:"
```

Oczekiwane: `map ok`, `palette ok`, `ALL PASS` w ok. 5 s; pełny przebieg w ok. 40 s, `combos: 134784 (all)` i `combos ok` (żadna etykieta nie nachodzi na inną, na znacznik ani na krawędź). Strona buduje się i wygląda jak przed zadaniem (kolory te same, mapa jeszcze stara): `python3 site2/build.py`.

- [ ] **Krok 10: Commit**

```bash
git add site2/src/panels.js site2/src/page.js site2/src/content.js site2/src/content site2/src/template.html site2/src/app.js site2/build.py tests/run.sh tests/page.test.js tests/combos.test.js tests/content.test.js
git commit -F - <<'EOF'
Mapa: trzy kadry w panels.js i cały układ mapy jako czysta funkcja (rozmieszczanie etykiet, strzałki do innych kadrów, ramki lotnisk), test kombinacji bez nachodzących etykiet; paleta 20 kolorów z testem kontrastu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 11: Mapa: kontury, rysowanie i powiększenie

Nowe kontury z Natural Earth dla kadrów z `panels.js`, rysowanie mapy z `mapLayout` i powiększenie z trzema kadrami obok siebie. Znikają `NF`, `CF`, `NLAB`, `CLAB`, `BANGIOC` i stare nazwy na podkładzie.

**Pliki:**
- Utwórz: `geo/make_basemap.py`, `tests/probes/map.js`
- Zmień: `site2/src/basemap.js` (wygenerowany), `site2/src/app.js` (mapa i powiększenie), `site2/src/template.html` (style mapy), `site2/src/ui.js` (teksty mapy)
- Test: `tests/content.test.js` (rodzina `m.`)

**Interfejsy:**
- Używa: `MAP_PANELS`, `MAP_WIDTH`, `panelSize`, `mapLayout`, `PIN_H`, `AIRPORT_BOX`, `LINE_H` (zadanie 10).
- Daje:
  - `BASEMAP = { north|centre|south: { vn, other, rivers } }` w pikselach kadru (basemap.js, z `make_basemap.py`);
  - w SVG mapy: każdy kadr to `<g transform="translate(0,y)">` z ramką `.m-edge`; pinezka i jej etykieta w jednej grupie `.pin` (`data-pin`); etykiety strzałek, punktów i kropek w grupach `.m-lab`;
  - `mapBoxes` (app.js): `[{ y, h }]` kadrów, dla powiększenia;
  - klucze `m.centre`, `m.south`, `m.km`; nowy tekst `m.scale`; znikają `m.whole`, `m.panel`.

- [ ] **Krok 1: Dane Natural Earth (tylko po zgodzie).** Zapytaj użytkownika o zgodę na pobranie dwóch plików do katalogu tymczasowego (nie do repo): źródło https://github.com/nvkelso/natural-earth-vector/tree/master/geojson, dane w domenie publicznej; `ne_10m_admin_0_countries.geojson` (ok. 13,3 MB) i `ne_10m_rivers_lake_centerlines.geojson` (ok. 7,3 MB). Rozmiar sprawdzisz przed pobraniem:

```bash
for f in ne_10m_admin_0_countries ne_10m_rivers_lake_centerlines; do
  curl -sIL "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/$f.geojson" | grep -i '^content-length' | tail -1
done
```

Po zgodzie:

```bash
NE="$TMPDIR/natural-earth"; mkdir -p "$NE"
for f in ne_10m_admin_0_countries ne_10m_rivers_lake_centerlines; do
  curl -sSL -o "$NE/$f.geojson" "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/$f.geojson"
done
ls -la "$NE"
```

- [ ] **Krok 2: `geo/make_basemap.py`** (cały plik; czysty Python, bez bibliotek spoza standardowej):

```python
"""The contours of the map panels for site2/src/basemap.js: the land of Vietnam, the land of its neighbours and the rivers,
from Natural Earth 1:10m (public domain), clipped to each panel, projected to its pixels and simplified. The panels come
from site2/src/panels.js (MAP_WIDTH, MAP_PANELS), sized as panelSize in page.js does it.

Run:  python3 geo/make_basemap.py <dir>
<dir> holds ne_10m_admin_0_countries.geojson and ne_10m_rivers_lake_centerlines.geojson from
https://github.com/nvkelso/natural-earth-vector/tree/master/geojson (not in git: download them when the panels change).
Only the standard library: the clipping (Sutherland–Hodgman, Liang–Barsky) and the simplification (Douglas–Peucker) are here."""
import json, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "..", "site2", "src")
OUT = os.path.join(SRC, "basemap.js")
MARGIN = 6         # the contours run this far past the panel's edge; the page clips them to the panel's rounded frame
TOL_LAND, TOL_RIVER = 0.35, 0.5   # simplification tolerance, in pixels

def panels():
    """MAP_WIDTH and MAP_PANELS from panels.js, each panel sized as panelSize in page.js: s = MAP_WIDTH / (lon1 - lon0) px
    per degree, h = (lat0 - lat1) * s rounded half up, as Math.round does."""
    text = open(os.path.join(SRC, "panels.js"), encoding="utf-8").read()
    width = int(re.search(r"var MAP_WIDTH = (\d+);", text).group(1))
    out = {}
    for name, lon0, lat0, lon1, lat1 in re.findall(r"(\w+): \{ lon0: ([\d.]+), lat0: ([\d.]+), lon1: ([\d.]+), lat1: ([\d.]+)[,} ]", text):
        lon0, lat0, lon1, lat1 = float(lon0), float(lat0), float(lon1), float(lat1)
        s = width / (lon1 - lon0)
        out[name] = {"lon0": lon0, "lat0": lat0, "s": s, "w": width, "h": int((lat0 - lat1) * s + 0.5)}
    assert out, "no panels in panels.js"
    return out


def project(p, pt):
    return ((pt[0] - p["lon0"]) * p["s"], (p["lat0"] - pt[1]) * p["s"])


def clip_ring(ring, x0, y0, x1, y1):
    """Sutherland–Hodgman: a closed ring clipped to the rectangle (it may come out empty)."""
    def edge(points, inside, cut):
        out = []
        for i, b in enumerate(points):
            a = points[i - 1]
            if inside(b):
                if not inside(a):
                    out.append(cut(a, b))
                out.append(b)
            elif inside(a):
                out.append(cut(a, b))
        return out

    def at_x(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))

    def at_y(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)

    pts = ring
    for inside, cut in ((lambda q: q[0] >= x0, at_x(x0)), (lambda q: q[0] <= x1, at_x(x1)),
                        (lambda q: q[1] >= y0, at_y(y0)), (lambda q: q[1] <= y1, at_y(y1))):
        if not pts:
            break
        pts = edge(pts, inside, cut)
    return pts


def clip_line(line, x0, y0, x1, y1):
    """Liang–Barsky for each segment: the parts of a polyline inside the rectangle, as polylines."""
    out, cur = [], []
    for a, b in zip(line, line[1:]):
        dx, dy, t0, t1, ok = b[0] - a[0], b[1] - a[1], 0.0, 1.0, True
        for p, q in ((-dx, a[0] - x0), (dx, x1 - a[0]), (-dy, a[1] - y0), (dy, y1 - a[1])):
            if p == 0:
                if q < 0:
                    ok = False
            else:
                t = q / p
                if p < 0:
                    t0 = max(t0, t)
                else:
                    t1 = min(t1, t)
        if not ok or t0 > t1:
            if cur:
                out.append(cur)
                cur = []
            continue
        pa = (a[0] + t0 * dx, a[1] + t0 * dy)
        pb = (a[0] + t1 * dx, a[1] + t1 * dy)
        if not cur:
            cur = [pa]
        cur.append(pb)
        if t1 < 1:
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return out


def simplify(pts, tol):
    """Douglas–Peucker, iterative."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        ax, ay = pts[i]
        bx, by = pts[j]
        dx, dy = bx - ax, by - ay
        norm = (dx * dx + dy * dy) ** 0.5 or 1e-9
        best, at = -1.0, -1
        for k in range(i + 1, j):
            d = abs(dy * (pts[k][0] - ax) - dx * (pts[k][1] - ay)) / norm
            if d > best:
                best, at = d, k
        if best > tol:
            keep[at] = True
            stack += [(i, at), (at, j)]
    return [p for p, k in zip(pts, keep) if k]


def simplify_ring(ring, tol):
    """A closed ring: Douglas–Peucker needs two different ends, so the ring is cut at the point farthest from its first."""
    if len(ring) < 4:
        return ring
    far = max(range(len(ring)), key=lambda k: (ring[k][0] - ring[0][0]) ** 2 + (ring[k][1] - ring[0][1]) ** 2)
    return simplify(ring[:far + 1], tol)[:-1] + simplify(ring[far:] + ring[:1], tol)[:-1]


def area(ring):
    return abs(sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(ring, ring[1:] + ring[:1]))) / 2


def path(parts, closed):
    def f(v):
        s = "%.1f" % v
        return "0" if s in ("0.0", "-0.0") else s.rstrip("0").rstrip(".")
    return "".join("M" + " ".join(f(x) + " " + f(y) for x, y in pts) + ("z" if closed else "") for pts in parts)


def rings_of(geom):
    if geom["type"] == "Polygon":
        return geom["coordinates"]
    return [r for poly in geom["coordinates"] for r in poly]


def lines_of(geom):
    if geom["type"] == "LineString":
        return [geom["coordinates"]]
    return geom["coordinates"]


def main(src):
    countries = json.load(open(os.path.join(src, "ne_10m_admin_0_countries.geojson"), encoding="utf-8"))["features"]
    rivers = json.load(open(os.path.join(src, "ne_10m_rivers_lake_centerlines.geojson"), encoding="utf-8"))["features"]
    basemap = {}
    for name, p in panels().items():
        box = (-MARGIN, -MARGIN, p["w"] + MARGIN, p["h"] + MARGIN)
        layers = {"vn": [], "other": [], "rivers": []}
        for f in countries:
            key = "vn" if f["properties"]["ADM0_A3"] == "VNM" else "other"
            for ring in rings_of(f["geometry"]):
                c = simplify_ring(clip_ring([project(p, q) for q in ring], *box), TOL_LAND)
                if len(c) > 2 and area(c) > 2:
                    layers[key].append(c)
        for f in rivers:
            if not f["geometry"]:
                continue
            for line in lines_of(f["geometry"]):
                for part in clip_line([project(p, q) for q in line], *box):
                    part = simplify(part, TOL_RIVER)
                    if len(part) > 1:
                        layers["rivers"].append(part)
        basemap[name] = {"vn": path(layers["vn"], True), "other": path(layers["other"], True), "rivers": path(layers["rivers"], False)}
        print("%s: %d × %d px, %.1f px per degree, %d + %d land rings, %d river lines" % (
            name, p["w"], p["h"], p["s"], len(layers["vn"]), len(layers["other"]), len(layers["rivers"])))
    with open(OUT, "w", encoding="utf-8") as out:
        out.write("/* Basemap: Natural Earth 1:10m land and rivers (public domain), clipped and projected for the map panels of\n"
                  "   panels.js by geo/make_basemap.py: per panel, the land of Vietnam (vn), of its neighbours (other) and the rivers. */\n")
        out.write("var BASEMAP = " + json.dumps(basemap, separators=(",", ":")) + ";\n")
    print("%s: %.0f KB" % (os.path.relpath(OUT), os.path.getsize(OUT) / 1024))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
```

- [ ] **Krok 3: Kontury**

```bash
python3 -I geo/make_basemap.py "$TMPDIR/natural-earth"
```

Oczekiwane:

```
north: 270 × 250 px, 65.1 px per degree, 9 + 2 land rings, 5 river lines
centre: 270 × 233 px, 81.8 px per degree, 1 + 2 land rings, 4 river lines
south: 270 × 177 px, 47.8 px per degree, 12 + 2 land rings, 20 river lines
site2/src/basemap.js: 24 KB
```

Stara mapa przestaje teraz działać (nie ma już `BASEMAP.whole`); naprawia to krok 4.

- [ ] **Krok 4: `site2/src/app.js`.** Wszystko od komentarza `/* ---------- the map: the North panel above the whole country, …` do linii przed `  function openMapZoom(kb) {` (stare `NF`, `CF`, `NLAB`, `CLAB`, `BANGIOC`, `GEO`, `basemap`, `geoLabels`, `proj`, `curve`, `where`, `renderMap`, `MZ_MS`, `mz`, `mzWide`, `mzSource`, `mzTarget`, `mzPlace`) zastąp:

```js
  /* ---------- the map: three panels one under another (mapLayout in page.js, MAP_PANELS in panels.js) ---------- */
  var mapBoxes = [];   // where the panels stand in the map's SVG: [{ y, h }], for the enlarged map
  function r1(v) { return v.toFixed(1); }
  function curve(a, b) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1, k = 0.16 * len;
    var cx = mx - dy / len * k, cy = my + dx / len * k;
    return 'M' + r1(a[0]) + ' ' + r1(a[1]) + ' Q' + r1(cx) + ' ' + r1(cy) + ' ' + r1(b[0]) + ' ' + r1(b[1]);
  }
  // a scale bar of 50 km in the panel's bottom corner (p.bar), measured across at the panel's middle latitude
  function scaleBar(p) {
    var mid = p.lat0 - p.h / p.s / 2, len = 50 / (111.32 * Math.cos(mid * Math.PI / 180)) * p.s;
    var x0 = p.bar === 'left' ? 10 : p.w - 10 - len, y = p.h - 8;
    return '<g class="m-scale"><path d="M' + r1(x0) + ' ' + (y - 3) + 'v3h' + r1(len) + 'v-3"/><text x="' + r1(p.bar === 'left' ? x0 + len + 4 : x0 - 4) + '" y="' + (y + 1) +
      '" text-anchor="' + (p.bar === 'left' ? 'start' : 'end') + '">' + T('m.km', { n: 50 }) + '</text></g>';
  }
  // the text of a label, inside its box (page.js: STAY_LABEL_H, LINE_H): a stay's name over its days, or lines of 10 px
  // (the ends of a stub, a point of interest, a faint dot) in one group
  function labelText(l, cls) {
    if (l.kind === 'stop') {
      return '<text class="m-label" x="' + r1(l.x) + '" y="' + r1(l.y + 12.5) + '" text-anchor="' + l.anchor + '">' + esc(l.lines[0]) + '</text>' +
        '<text class="m-sub" x="' + r1(l.x) + '" y="' + r1(l.y + 24.75) + '" text-anchor="' + l.anchor + '">' + esc(l.lines[1]) + '</text>';
    }
    return '<g class="m-lab">' + l.lines.map(function (line, i) {
      return '<text class="' + cls + '" x="' + r1(l.x) + '" y="' + r1(l.y + 10.75 + LINE_H * i) + '" text-anchor="' + l.anchor + '">' + esc(line) + '</text>';
    }).join('') + '</g>';
  }
  function renderMap() {
    var L = mapLayout(state.route, state.st, { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: T });
    var defs = [], body = [];
    mapBoxes = L.panels.map(function (P) { return { y: P.y, h: P.p.h }; });
    L.panels.forEach(function (P) {
      var p = P.p, b = BASEMAP[P.key], g = [], grid = [];
      defs.push('<clipPath id="clip-' + P.key + '"><rect x="0" y="0" width="' + p.w + '" height="' + p.h + '" rx="8"/></clipPath>');
      g.push('<rect class="m-frame" x="0" y="0" width="' + p.w + '" height="' + p.h + '" rx="8"/>',
        '<path class="m-land-o" d="' + b.other + '"/><path class="m-land" d="' + b.vn + '"/><path class="m-river" d="' + b.rivers + '"/>');
      // whole degrees: the latitudes across, labelled on the right, the longitudes dashed
      for (var lat = Math.ceil(p.lat0 - p.h / p.s); lat <= Math.floor(p.lat0); lat++) {
        var gy = r1((p.lat0 - lat) * p.s);
        grid.push('<line class="m-grid" x1="0" x2="' + p.w + '" y1="' + gy + '" y2="' + gy + '"/><text class="m-gridlabel" x="' + (p.w - 6) + '" y="' + r1(gy - 4) + '" text-anchor="end">' + lat + '°N</text>');
      }
      for (var lon = Math.ceil(p.lon0); lon <= Math.floor(p.lon0 + p.w / p.s); lon++) {
        var gx = r1((lon - p.lon0) * p.s);
        grid.push('<line class="m-grid m-grid-v" x1="' + gx + '" x2="' + gx + '" y1="0" y2="' + p.h + '"/>');
      }
      g.push(grid.join(''));
      P.names.forEach(function (n) {
        g.push('<text class="m-' + n.kind + '" x="' + r1(n.x) + '" y="' + r1(n.y) + '" text-anchor="' + n.anchor + '">' + esc(n.text) + '</text>');
      });
      P.faint.forEach(function (f) { g.push('<circle class="m-faint" cx="' + r1(f.x) + '" cy="' + r1(f.y) + '" r="3.5"/>'); });
      P.segs.forEach(function (s) {
        g.push(s.mode === 'fly' ? '<path class="m-fly" d="' + curve([s.x1, s.y1], [s.x2, s.y2]) + '"/>'
          : '<line class="m-road" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>');
      });
      // a stub: the start of the way to another panel, with a small arrowhead at its tip
      P.stubs.forEach(function (s) {
        var dx = s.x2 - s.x1, dy = s.y2 - s.y1, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
        var bx = s.x2 - ux * 6, by = s.y2 - uy * 6;
        g.push('<line class="' + (s.mode === 'fly' ? 'm-fly' : 'm-road') + '" x1="' + r1(s.x1) + '" y1="' + r1(s.y1) + '" x2="' + r1(s.x2) + '" y2="' + r1(s.y2) + '"/>' +
          '<path class="m-arrow" d="M' + r1(s.x2) + ' ' + r1(s.y2) + 'L' + r1(bx - uy * 3.5) + ' ' + r1(by + ux * 3.5) + 'L' + r1(bx + uy * 3.5) + ' ' + r1(by - ux * 3.5) + 'z"/>');
      });
      P.pois.forEach(function (o) {
        g.push('<line class="m-road m-local" x1="' + r1(o.from[0]) + '" y1="' + r1(o.from[1]) + '" x2="' + r1(o.x) + '" y2="' + r1(o.y) + '"/>' +
          '<circle class="m-poi" cx="' + r1(o.x) + '" cy="' + r1(o.y) + '" r="4"/>');
      });
      // an airport's box, with a line to the airport's point when the box had to move off a pin
      P.airports.forEach(function (a) {
        if (Math.abs(a.bx - a.x) + Math.abs(a.by - a.y) > 0.5) {
          g.push('<line class="m-lead" x1="' + r1(a.x) + '" y1="' + r1(a.y) + '" x2="' + r1(a.bx) + '" y2="' + r1(a.by) + '"/><circle class="m-apt-dot" cx="' + r1(a.x) + '" cy="' + r1(a.y) + '" r="2"/>');
        }
        g.push('<rect class="m-airport" x="' + r1(a.bx - AIRPORT_BOX / 2) + '" y="' + r1(a.by - AIRPORT_BOX / 2) + '" width="' + AIRPORT_BOX + '" height="' + AIRPORT_BOX + '" rx="2"/>');
      });
      P.labels.forEach(function (l) {
        if (l.kind !== 'stop') g.push(labelText(l, l.kind === 'faint' ? 'm-faint-label' : 'm-sub'));
      });
      // the pins last, each with its label in one group, so the stay being read lights up both (observeStops)
      P.pins.forEach(function (pn) {
        var l = P.labels.filter(function (x) { return x.kind === 'stop' && x.key === pn.key; })[0];
        g.push('<g class="pin" data-pin="' + pn.key + '" style="--c:' + stopColor(pn.key) + '"><rect x="' + r1(pn.x - pn.w / 2) + '" y="' + r1(pn.y - PIN_H / 2) +
          '" width="' + r1(pn.w) + '" height="' + PIN_H + '" rx="' + PIN_H / 2 + '"/><text class="pin-num" x="' + r1(pn.x) + '" y="' + r1(pn.y + 4) + '" text-anchor="middle">' +
          pn.nums + '</text>' + (l ? labelText(l) : '') + '</g>');
      });
      body.push('<g transform="translate(0,' + P.y + ')"><g clip-path="url(#clip-' + P.key + ')">' + g.join('') + '</g>' +
        '<rect class="m-edge" x="0" y="0" width="' + p.w + '" height="' + p.h + '" rx="8"/><text class="m-title" x="10" y="17">' + T('m.' + P.key) + '</text>' +
        scaleBar(p) + '</g>');
    });
    $('#map').innerHTML = '<svg viewBox="-6 -6 ' + (MAP_WIDTH + 12) + ' ' + (L.height + 12) + '" role="img" aria-labelledby="map-title"><title id="map-title">' + T('m.title') +
      esc(state.route.stops.map(function (s) { return C(s.id).short; }).join(', ')) + '</title><defs>' + defs.join('') + '</defs>' + body.join('') + '</svg>' +
      '<p class="map-legend"><span><svg width="24" height="6" aria-hidden="true"><line class="m-road" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.road') + '</span>' +
      '<span><svg width="24" height="6" aria-hidden="true"><line class="m-fly" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.flight') + '</span>' +
      '<span><svg width="12" height="12" aria-hidden="true"><rect class="m-airport" x="0.8" y="0.8" width="10.4" height="10.4" rx="2"/></svg>' + T('m.airports') + '</span>' +
      '<span class="map-note">' + T('m.scale') + '</span><button type="button" class="map-hint">' + T('m.zoom') + '</button></p>';
  }

  /* ---------- map zoom (desktop): the three panels grow out of the sidebar into a side-by-side view ---------- */
  var MZ_MS = 480;
  var mz = { open: false, busy: false, opener: null, kb: false };
  function mzWide() { return window.matchMedia('(min-width: 901px)').matches; }
  // on-screen boxes of the panels inside the sidebar map (viewBox MAP_WIDTH + 12 wide, a margin of 6 all around)
  function mzSource() {
    var r = $('#map svg').getBoundingClientRect(), k = r.width / (MAP_WIDTH + 12);
    return mapBoxes.map(function (b) { return { x: r.left, y: r.top + b.y * k, w: r.width, h: (b.h + 12) * k }; });
  }
  // the panels side by side, at one scale, as large as the window allows
  function mzTarget() {
    var pad = 28, gap = 24, top = 64, vw = MAP_WIDTH + 12, n = mapBoxes.length;
    var tallest = Math.max.apply(null, mapBoxes.map(function (b) { return b.h + 12; }));
    var f = Math.min((window.innerWidth - 2 * pad - gap * (n - 1)) / (n * vw), (window.innerHeight - top - pad) / tallest);
    var x0 = (window.innerWidth - (n * vw * f + gap * (n - 1))) / 2;
    return mapBoxes.map(function (b, i) { return { x: x0 + i * (vw * f + gap), y: top, w: vw * f, h: (b.h + 12) * f }; });
  }
  function mzPlace(el, t, from) {
    el.style.left = t.x + 'px'; el.style.top = t.y + 'px'; el.style.width = t.w + 'px'; el.style.height = t.h + 'px';
    el.style.transform = from ? 'translate(' + (from.x - t.x) + 'px,' + (from.y - t.y) + 'px) scale(' + (from.w / t.w) + ')' : 'none';
  }
```

W `openMapZoom` zamień kopiowanie dwóch kadrów:

```js
    var panels = ['-6 -6 282 334', '-6 346 282 334'].map(function (vb, i) {
      var d = document.createElement('div');
      d.className = 'mz-panel';
      // own ids so the copies never borrow the sidebar map's clip paths
      d.innerHTML = svg.replace(/(clip-(?:north|whole)|map-title)/g, '$1-z' + i).replace(/viewBox="[^"]*"/, 'viewBox="' + vb + '"');
      return d;
    });
```

na:

```js
    var panels = mapBoxes.map(function (b, i) {
      var d = document.createElement('div');
      d.className = 'mz-panel';
      // own ids so the copies never borrow the sidebar map's clip paths; each copy shows one panel
      d.innerHTML = svg.replace(/(clip-[a-z]+|map-title)/g, '$1-z' + i).replace(/viewBox="[^"]*"/, 'viewBox="-6 ' + (b.y - 6) + ' ' + (MAP_WIDTH + 12) + ' ' + (b.h + 12) + '"');
      return d;
    });
```

- [ ] **Krok 5: Style mapy.** Nowe klasy (strzałka, kreska do lotniska, podziałka, nazwy bladych kropek), etykiety 11,5 px (rozmiar, którym liczy `page.js`), znikają style drugiej, małej mapy. Uruchom (sprawdzony skrypt):

```bash
python3 - <<'PY'
p = 'site2/src/template.html'
t = open(p, encoding='utf-8').read()
pairs = [
 ('.m-inset { fill: none; stroke: var(--muted); stroke-width: 1; stroke-dasharray: 3 3; }\n.m-thin.m-road { stroke-width: 1.6; }\n.m-thin.m-fly { stroke-width: 1; stroke-dasharray: 3 3; }\n',
  ''),
 ('.m-local { stroke-dasharray: 2 3; stroke-width: 1.6; }\n',
  '.m-local { stroke-dasharray: 2 3; stroke-width: 1.6; }\n.m-arrow { fill: var(--muted); }\n.m-lead { stroke: var(--ink); stroke-width: 1; }\n.m-apt-dot { fill: var(--ink); }\n.m-scale path { fill: none; stroke: var(--muted); stroke-width: 1.2; }\n.m-scale text { fill: var(--muted); font: 9px var(--mono); }\n.m-faint-label { fill: var(--muted); font: 400 10px var(--body); opacity: 0.85; paint-order: stroke; stroke: var(--land); stroke-width: 3px; stroke-linejoin: round; }\n'),
 ('.m-poi { fill: var(--surface); stroke: var(--c); stroke-width: 2; }\n.m-label { fill: var(--ink); font: 600 12.5px var(--body); paint-order: stroke; stroke: var(--surface); stroke-width: 4px; stroke-linejoin: round; }\n.m-label-s { font-size: 11.5px; }\n',
  '.m-poi { fill: var(--surface); stroke: var(--muted); stroke-width: 2; }\n/* the label fonts are the sizes page.js measures labels with (NAME_PX, SUB_PX, SMALL_PX) */\n.m-label { fill: var(--ink); font: 600 11.5px var(--body); paint-order: stroke; stroke: var(--surface); stroke-width: 4px; stroke-linejoin: round; }\n'),
 ('.pin-num-s { font-size: 9px; }\n',
  ''),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `4 changes`.

- [ ] **Krok 6: Teksty.** `site2/src/ui.js` (sprawdzony skrypt):

```bash
python3 - <<'PY'
p = 'site2/src/ui.js'
t = open(p, encoding='utf-8').read()
pairs = [
 ("  'm.north': 'Północ', 'm.whole': 'Cała trasa', 'm.panel': 'Mapa północy', 'm.china': 'Chiny', 'm.laos': 'Laos', 'm.cambodia': 'Kambodża',\n",
  "  'm.north': 'Północ', 'm.centre': 'Środek', 'm.south': 'Południe', 'm.china': 'Chiny', 'm.laos': 'Laos', 'm.cambodia': 'Kambodża',\n"),
 ("  'm.scale': 'Obie mapy w skali', 'm.zoom': 'Kliknij mapę, żeby ją powiększyć', 'm.close': 'Zamknij dużą mapę', 'm.dialog': 'Mapa trasy, powiększona', 'm.title': 'Mapa trasy: ',\n",
  "  'm.scale': 'Każdy kadr ma swoją skalę i podziałkę', 'm.km': '{n} km', 'm.zoom': 'Kliknij mapę, żeby ją powiększyć', 'm.close': 'Zamknij dużą mapę',\n  'm.dialog': 'Mapa trasy, powiększona', 'm.title': 'Mapa trasy: ',\n"),
]
for a, b in pairs:
    assert t.count(a) == 1, (t.count(a), a[:70])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8').write(t)
print(len(pairs), 'changes')
PY
```

Oczekiwane: `2 changes`. W `tests/content.test.js`, w `FAMILIES`, przed `'alert.': …` dopisz `'m.': Object.keys(MAP_PANELS),` (tytuły kadrów to `T('m.' + klucz kadru)`).

- [ ] **Krok 7: Sonda mapy:** `tests/probes/map.js`. Mierzy w Chrome ramki tekstu na sześciu gęstych trasach i otwiera powiększenie; położenie kadrów czyta ze stylów, bo Chrome bez okna nie przesuwa ich animacją.

```js
// The map, measured as Chrome draws it: on a few crowded trips no label covers another label, a pin or an airport's box,
// and each stays inside its panel (page.js places them from estimated widths; this checks the real text); then the
// enlarged map opens with the three panels side by side and closes again.
// tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var t = window.__trip, at = soon();
  var trips = [
    { from: 'HAN', to: 'HAN', days: 30, interests: ['przyroda', 'gory'] },
    { from: 'SGN', to: 'HAN', days: 30, interests: ['kultura', 'jedzenie'] },
    { from: 'DAD', to: 'DAD', days: 18, interests: ['przyroda', 'gory'] },
    { from: 'SGN', to: 'SGN', days: 25, interests: [] },
    { from: 'HAN', to: 'DAD', days: 27, interests: [] },
    { from: 'DAD', to: 'SGN', days: 22, interests: ['morze'] }
  ];
  function inter(a, b) { return Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)); }
  trips.forEach(function (x) {
    t.apply({ from: x.from, to: x.to, year: at.year, month: at.month, days: x.days, interests: x.interests, level: 2, add: [], remove: [] });
    var bad = [], panels = document.querySelectorAll('#map svg > g');
    Array.prototype.forEach.call(panels, function (g) {
      var frame = g.querySelector('.m-edge').getBoundingClientRect();
      // a label: a stay's name with its days (the two lines as one box), or the text of a stub, a point of interest, a faint dot
      var labels = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) {
        var a = p.querySelector('.m-label').getBoundingClientRect(), b = p.querySelector('.m-sub').getBoundingClientRect();
        return { name: p.querySelector('.m-label').textContent, r: { left: Math.min(a.left, b.left), right: Math.max(a.right, b.right), top: a.top, bottom: b.bottom } };
      }).concat(Array.prototype.map.call(g.querySelectorAll('.m-lab'), function (e) { return { name: e.textContent, r: e.getBoundingClientRect() }; }));
      var marks = Array.prototype.map.call(g.querySelectorAll('.pin rect, .m-airport'), function (e) { return e.getBoundingClientRect(); });
      labels.forEach(function (l, i) {
        if (l.r.left < frame.left - 0.5 || l.r.right > frame.right + 0.5 || l.r.top < frame.top - 0.5 || l.r.bottom > frame.bottom + 0.5) bad.push(l.name + ' outside');
        labels.slice(i + 1).forEach(function (o) { if (inter(l.r, o.r) > 1) bad.push(l.name + ' / ' + o.name); });
        marks.forEach(function (m) { if (inter(l.r, m) > 1) bad.push(l.name + ' over a marker'); });
      });
    });
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker or the edge', !bad.length, bad.join('; '));
  });
  var hint = document.querySelector('.map-hint');
  hint.click();
  setTimeout(function () {
    var box = document.getElementById('mapzoom');
    check('the enlarged map opens with the three panels side by side', !box.hidden && box.querySelectorAll('.mz-panel').length === 3, box.querySelectorAll('.mz-panel').length);
    var p = box.querySelectorAll('.mz-panel');
    // the places they move to (headless Chrome does not run the move itself, so the boxes are read from their styles)
    var left = Array.prototype.map.call(p, function (d) { return parseFloat(d.style.left); });
    check('in one row, left to right', p.length === 3 && left[0] < left[1] && left[1] < left[2], left.join(', '));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    setTimeout(function () {
      check('Escape closes it', box.hidden);
      done();
    }, 700);
  }, 700);
}, 2500);
```

- [ ] **Krok 8: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: `ALL PASS`; każda sonda `done, all checks ok`.

- [ ] **Krok 9: Zrzuty mapy**

```bash
bash tests/shot.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 1400 "$TMPDIR/m-1400.png" 4200
bash tests/shot.sh 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2' 390 "$TMPDIR/m-390.png" 5200
```

Oczekiwane: trzy kadry jeden pod drugim (Północ, Środek, Południe), każdy z podziałką 50 km w pustym rogu i nazwami krajów i mórz w kadrze; strzałki „✈ …” przy lotach do innych kadrów; ramka lotniska Hà Nội odsunięta od pinezki z kreską do punktu lotniska; na trasie z Cao Bằng punkt Bản Giốc; nic nie nachodzi na siebie.

- [ ] **Krok 10: Commit**

```bash
git add geo/make_basemap.py site2/src/basemap.js site2/src/app.js site2/src/template.html site2/src/ui.js tests/content.test.js tests/probes/map.js
git commit -F - <<'EOF'
Mapa: kontury trzech kadrów z Natural Earth (skrypt geo/make_basemap.py), rysowanie z układu mapy, strzałki do innych kadrów, podziałki, powiększenie z trzema kadrami; sonda mierzy etykiety w Chrome

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 12: Treść: poprawki z przeglądów i ostrzejsze zdjęcia Hội An

Poprawki tekstów z sekcji „Do etapu 2” w [notes/uwagi-z-przegladow-1b.md](../uwagi-z-przegladow-1b.md), zimowa uwaga w Pù Luông jako wydarzenie, źródła zmian w `research/` i dwa nowe zdjęcia Hội An. Zdania prawdziwe tylko w części roku przeniosło już zadanie 5. Brzmienie poprawek idzie za propozycjami z przeglądu zadania 8 planu 1B, poprawionymi tam, gdzie same powtarzały błąd.

**Pliki:**
- Zmień: `site2/src/content/{hue,dalat,puluong,cattien,mekong,hoian,caobang,hanoi,catba}.js`, `research/plany-dni-2026-10.md`, `research/sezony-2026-10.md`, `site2/src/photos.js`
- Poza gitem: `photos/hoian_4.jpg`, `photos/hoian_5.jpg`, `photos/meta.json`
- Test: bez nowych testów. Teksty sprawdzają testy treści (styl, typografia, pole `events`), a zdjęcia test danych `photos` i `build.py`.

**Interfejsy:**
- Używa: pola `events` z zadania 5 (`{ from, to, t, warn? }`).
- Daje: nic nowego dla kodu.

- [ ] **Krok 1: Teksty** (sprawdzony skrypt; zmienia tylko pliki treści):

```bash
python3 - <<'PY'
pairs = [
 ('hue', "Zwiedzanie kończy się ok. 17:00, latem ok. 17:30.",
         "Kasy zamykają ok. 17:00, a od połowy marca do połowy października ok. 17:30."),
 ('hue', "rain: 'grobowce samochodem zamiast rowerem, a potem długi obiad z bún bò Huế.'",
         "rain: 'hala targu Đông Ba nad Rzeką Perfumową i obiad z bún bò Huế przy jednym ze straganów z jedzeniem.'"),
 ('dalat', "t: 'Sosnowe wzgórza o zmierzchu'", "t: 'Zmierzch nad doliną Tà Nung'"),
 ('dalat', "W porze suchej, od grudnia do kwietnia,", "W porze suchej, od listopada do kwietnia,"),
 ('puluong', "potem 8–9 godzin marszu przez las", "potem 8–9 godzin w drodze przez las"),
 ('puluong', "Rezerwat sam prowadzi trasę na szczyt, z przewodnikami z okolicznych wiosek, i ogranicza liczbę osób, więc zapisz się z wyprzedzeniem u zarządu rezerwatu i zapytaj o wersję jednodniową.",
             "Rezerwat sam organizuje wejścia na szczyt z przewodnikami z okolicznych wiosek i ogranicza liczbę uczestników, więc zapisz się u niego z wyprzedzeniem i dopytaj o wersję jednodniową."),
 ('puluong', "więc zapytaj gospodarzy.' }\n  ]",
             "więc zapytaj gospodarzy.' },\n    { from: [12, 1], to: [2, 29], warn: true, t: 'Chłodna pora: od grudnia do lutego dni bywają tu szare i chłodne, poranki mgliste, a na szczycie Pù Luông jest jeszcze zimniej. Weź ciepłą warstwę.' }\n  ]"),
 ('cattien', "5 km pieszo do drogi, więc dalsza droga zaczyna się koło południa",
             "5 km pieszo do samochodu, więc w dalszą podróż ruszysz koło południa"),
 ('mekong', "a przed 9:00 wróć do gospodarzy, w porę na dalszą drogę.", "a przed 9:00 wróć na nocleg, w porę na dalszą drogę."),
 ('hoian', "na plażę An Bàng, 3–4 km od starego miasta, spacer brzegiem", "na plażę An Bàng, spacer brzegiem"),
 ('caobang', "Wodospad jest w środku dnia, bo w porze suchej, od końca listopada do początku maja, elektrownie powyżej niego potrafią rano zatrzymywać wodę i najwięcej jej spada ok. 11:00–14:30.",
             "Do wodospadu dojedziesz w środku dnia, bo w porze suchej, od końca listopada do początku maja, elektrownie w górze rzeki potrafią rano zatrzymywać wodę, a najwięcej jej spada ok. 11:00–14:30."),
 ('hanoi', "a na kolację phở cuốn, czyli wołowina zawinięta w płaty makaronu ryżowego, na ulicy Ngũ Xã nad jeziorem Trúc Bạch.",
           "a na kolację phở cuốn (wołowina zawinięta w płaty makaronu ryżowego) na ulicy Ngũ Xã nad jeziorem Trúc Bạch."),
 ('catba', "Wieczorem spacer nabrzeżem wśród łodzi rybackich i kolacja w miasteczku.",
           "Wieczorem spacer nabrzeżem, przy którym cumują łodzie rybackie, i kolacja w jednej z knajpek."),
 ('catba', "Między skały bambusową łodzią, którą wiosłują miejscowi, potem pływająca wioska, zachód słońca z pokładu i noc na statku.",
           "Między skały popłyniesz bambusową łodzią, którą wiosłują miejscowi, a zachód słońca obejrzysz z pokładu. Część rejsów zawija też do pływającej wioski."),
 ('catba', "więc przy trzech nocach warto wybrać taki rejs.", "więc przy trzech nocach wybierz jeden z nich."),
]
for f, a, b in pairs:
    p = 'site2/src/content/' + f + '.js'
    t = open(p, encoding='utf-8').read()
    assert t.count(a) == 1, (f, t.count(a), a[:60])
    open(p, 'w', encoding='utf-8').write(t.replace(a, b))
print(len(pairs), 'changes')
PY
```

Oczekiwane: `15 changes`. Co się zmienia i dlaczego, mówi tabela z kroku 3.

- [ ] **Krok 2: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 3: Źródła zmian** (sprawdzony skrypt):
  - wiersz zimowej uwagi w tabeli wydarzeń w `research/sezony-2026-10.md`;
  - w `research/plany-dni-2026-10.md`: odnośnik we wstępie, sekcja „Zmiany z planu 2A” z tabelą wszystkich zmian, punkt o targu Đông Ba w „Do sprawdzenia przed publikacją” i trzy źródła o targu, sprawdzone 11.10.2026.

```bash
python3 - <<'PY'
def edit(p, pairs):
    t = open(p, encoding='utf-8').read()
    for a, b in pairs:
        assert t.count(a) == 1, (p, t.count(a), a[:60])
        t = t.replace(a, b)
    open(p, 'w', encoding='utf-8').write(t)
    return len(pairs)

n = edit('research/sezony-2026-10.md', [
 ("| puluong | 25.09–10.10 | złote tarasy, termin zależy od roku i wioski | L1, L2 |\n",
  "| puluong | 25.09–10.10 | złote tarasy, termin zależy od roku i wioski | L1, L2 |\n"
  "| puluong | 1.12–29.02 | uwaga: chłodna pora, szare i chłodne dni, mgliste poranki, na szczycie jeszcze zimniej, więc ciepła warstwa | K4, PR1 (wiersze I, II i XII w tabeli „puluong”); `research/trudne-dni-2026-10.md`, sekcja „puluong”, „Ryzyka” |\n"),
])

ZMIANY = """## Zmiany z planu 2A (11.10.2026)

Zdania zmienione w planie 2A. Wiersze w sekcjach miejsc wyżej cytują teksty z planu 1B. Adresy nowych źródeł otwarto 11.10.2026.

| miejsce i pole | zdanie teraz | co się zmieniło i dlaczego | źródło (data) |
|---|---|---|---|
| cattien p 1 i `solo`; mekong `solo` p 1, p 2 i jego `easy`; ninhbinh p 2 i jego `easy`; puluong p 3 | usunięte zdania o porze roku | Pijawki (IV–XI), wysoka woda w delcie (IX–XI), wysoka woda w Tràng An i złote tarasy przeszły do wydarzeń, które karta miejsca pokazuje tylko wtedy, gdy pobyt trafia w ich okno. W Pù Luông zostało „Po żniwach poranki bywają tu mgliste i ciche.” | SEZ, „Na stronie: wydarzenia i uwagi sezonowe” |
| hue `days` p 1 | „Kasy zamykają ok. 17:00, a od połowy marca do połowy października ok. 17:30.” | Było „Zwiedzanie kończy się ok. 17:00, latem ok. 17:30.”: „latem” było niejasne. Okresy za Vinpearl: kasy do 17:30 od 16.3 do 15.10 i do 17:00 od 16.10 do 15.3. | HUE-VP†, HUE-VW (13.12.2025) |
| hue `rain` dnia p 2 | „hala targu Đông Ba nad Rzeką Perfumową i obiad z bún bò Huế przy jednym ze straganów z jedzeniem” | Było „grobowce samochodem zamiast rowerem…”, czyli to samo co wersja spokojna dnia. Targ Đông Ba leży na północnym brzegu Rzeki Perfumowej, od mostu Trường Tiền do mostu Gia Hội, z wejściem od ulicy Trần Hưng Đạo. W środku stoi hala na trzech poziomach, a na targu jest część z jedzeniem, m.in. z bún bò Huế. Czynny codziennie ok. 5:00–19:00. | HUE-DB-VH, HUE-DB-AEON (23.8.2025), HUE-DB-WIKI (ostatnia edycja 10.10.2026) |
| dalat `days` p 1, tytuł | „Zmierzch nad doliną Tà Nung” | Było „Sosnowe wzgórza o zmierzchu”, co powtarzało opis dnia i podtytuł miejsca. | — |
| dalat `days` p 2 | „W porze suchej, od listopada do kwietnia, ścieżki są pewne pod nogami, a w porze deszczowej bywają śliskie.” | Było „od grudnia do kwietnia”. Źródła podają trzy granice pory suchej: XII–IV dla Bidoup (VNE-2025-02-18), XI–III dla Lang Biang (LB-VNE) i XI–IV w ocenach sezonu (SEZ, „dalat”). Tekst idzie za ocenami, które strona pokazuje w karcie miejsca: listopad jest graniczny (93,5 mm w 11,5 dnia), ale ma ocenę D. | SEZ: IBST-DL, VNE-2025-02-18 (18.2.2025); LB-VNE (26.7.2024) |
| puluong `hard` | „…potem 8–9 godzin w drodze przez las, z obiadem na szczycie.” | Było „8–9 godzin marszu”. U Hanoi Eco Tour te godziny obejmują obiad, a Pu Luong Excursions podaje ok. 12 godzin całej wycieczki. | TD: PL-HET (10.9.2026), PL-PLE |
| puluong `hard` | „Rezerwat sam organizuje wejścia na szczyt z przewodnikami z okolicznych wiosek i ogranicza liczbę uczestników, więc zapisz się u niego z wyprzedzeniem i dopytaj o wersję jednodniową.” | Fakty jak w wierszu z planu 1B, poprawiony styl: „prowadzi trasę” brzmiało jak „wytycza”, a „rezerwat… rezerwatu” i „zapytaj… zapytaj” się powtarzały. | jak w sekcji „puluong” |
| puluong `events` | uwaga od 1.12 do 29.02: chłodna pora | Nowe, z przeglądu trudnego dnia: mgła i zimno zimą to ryzyko z TD, a trudny dzień strona pokazuje od X do IV. Zdanie dotyczy części roku, więc trafia do wydarzeń. | SEZ, „Na stronie: wydarzenia i uwagi sezonowe” |
| cattien `hard` | „…i 5 km pieszo do samochodu, więc w dalszą podróż ruszysz koło południa” | Było „5 km pieszo do drogi, więc dalsza droga zaczyna się…”: powtórzenie. Fakty bez zmian. | jak w sekcji „cattien” |
| mekong `solo` dnia p 1 | „a przed 9:00 wróć na nocleg, w porę na dalszą drogę” | Było „wróć do gospodarzy”, trzeci raz w jednym opisie. | — |
| hoian `again` | usunięte: „3–4 km od starego miasta” | Odległość podaje dzień p 2, a w opisie wieczoru na plaży jest zbędna. | — |
| caobang `days` p 2 | „Do wodospadu dojedziesz w środku dnia, bo w porze suchej, od końca listopada do początku maja, elektrownie w górze rzeki potrafią rano zatrzymywać wodę, a najwięcej jej spada ok. 11:00–14:30.” | Było „Wodospad jest w środku dnia, bo … i najwięcej jej spada…”: skrót myślowy, a „i” łączyło zdania o różnych podmiotach. Fakty bez zmian. | jak w sekcji „caobang” |
| hanoi `again` | „a na kolację phở cuốn (wołowina zawinięta w płaty makaronu ryżowego) na ulicy Ngũ Xã nad jeziorem Trúc Bạch” | Było „phở cuốn, czyli …, na ulicy Ngũ Xã”: miejsce stało za objaśnieniem. | jak w sekcji „hanoi” |
| catba `days` p 1 | „Wieczorem spacer nabrzeżem, przy którym cumują łodzie rybackie, i kolacja w jednej z knajpek.” | Było „…i kolacja w miasteczku”, drugi raz „w miasteczku” w dwóch zdaniach. | — |
| catba `days` p 2 | „Między skały popłyniesz bambusową łodzią, którą wiosłują miejscowi, a zachód słońca obejrzysz z pokładu. Część rejsów zawija też do pływającej wioski.” | Było „Między skały bambusową łodzią…, potem pływająca wioska, zachód słońca z pokładu i noc na statku.”: niezręczna elipsa. Pływająca wioska jest tylko w części programów. | CB-VT2 (31.5.2026) |
| catba `gem` | „…więc przy trzech nocach wybierz jeden z nich.” | Było „warto wybrać taki rejs”: powtórzenie „rejsy… rejs”. | — |

"""

n += edit('research/plany-dni-2026-10.md', [
 ("- Adresy otwarto 10.10.2026, poza oznaczonymi † (zob. „Jak czytać”).\n",
  "- **Plan 2A (11.10.2026)** zmienił część tych zdań: zob. sekcję „Zmiany z planu 2A” przed listą „Do sprawdzenia”.\n"
  "- Adresy otwarto 10.10.2026, poza oznaczonymi † (zob. „Jak czytać”).\n"),
 ("## Do sprawdzenia przed publikacją (etap 4)\n", ZMIANY + "## Do sprawdzenia przed publikacją (etap 4)\n"),
 ("- **Hội An:** zasady biletu na stare miasto.",
  "- **Targ Đông Ba:** godziny i część z jedzeniem na stronie zarządu targu. Tu są tylko portal turystyczny Huế (bez daty) i strona centrum handlowego.\n"
  "- **Hội An:** zasady biletu na stare miasto."),
])
t = open('research/plany-dni-2026-10.md', encoding='utf-8').read()
i = t.index('\n| HUE-VOV |'); j = t.index('\n', i + 1) + 1
t = t[:j] + (
 "| HUE-DB-VH | Visit Huế (portal turystyczny Huế), „Chợ Đông Ba: Điểm đến hấp dẫn của xứ Huế”: targ nad rzeką Hương, z frontem od ulicy Trần Hưng Đạo, od mostu Gia Hội do mostu Trường Tiền; na targu dania z Huế, m.in. bún bò, cơm hến i bánh lọc. | https://visithue.vn/cho-dong-ba-diem-den-hap-dan-cua-xu-hue/?pid=MjMzODF8Y3NkbGRs0 | urzędowe (portal turystyczny) | brak |\n"
 "| HUE-DB-AEON | AEON Mall Huế, „Khám phá chợ Đông Ba Huế & 5 kinh nghiệm không thể bỏ qua”: 2 Trần Hưng Đạo, nad rzeką Hương przy moście Trường Tiền; w środku budynek na trzech poziomach (suche produkty, rękodzieło, tkaniny); część z jedzeniem (bún bò Huế, bánh bèo, bánh lọc i inne); czynny codziennie 5:00–19:00. | https://hue.aeonmall-vietnam.com/cam-nang-aeon-mall-hue/cho-dong-ba-hue.html | komercyjne (centrum handlowe) | 23.8.2025 |\n"
 "| HUE-DB-WIKI | Wikipedia (wietnamska), „Chợ Đông Ba”: północny brzeg rzeki Hương, od mostu Trường Tiền do mostu Gia Hội, 47 614 m²; w 2020 ponad 2700 stoisk. | https://vi.wikipedia.org/wiki/Ch%E1%BB%A3_%C4%90%C3%B4ng_Ba | Wikipedia | ostatnia edycja 10.10.2026 |\n") + t[j:]
open('research/plany-dni-2026-10.md', 'w', encoding='utf-8').write(t)
print(n + 1, 'changes')
PY
```

Oczekiwane: `5 changes`, a potem `bash tests/run.sh` → `climate ok` i `ALL PASS` (test klimatu czyta tabele z `research/sezony-2026-10.md`).

- [ ] **Krok 4: Dwa ostrzejsze zdjęcia Hội An z Wikimedia Commons.** Zastępują ciemne zdjęcia z telefonu `hoian_4` (stare miasto o świcie) i `hoian_5` (wioska Trà Quế). Identyfikatory zostają, więc `content/hoian.js` się nie zmienia.
  - **Szukaj** na https://commons.wikimedia.org tego samego tematu, żeby zdjęcie pasowało do dni:
    - `hoian_4`: uliczka starego miasta rano, w dziennym świetle (Trần Phú, Nguyễn Thái Học albo most Chùa Cầu);
    - `hoian_5`: grządki i ogrodnicy w Trà Quế, a jeśli nie ma ostrego zdjęcia, plaża An Bàng (dzień p 2 i powrót do Hội An).
  - **Wymagania:**
    - licencja CC0, CC BY, CC BY-SA albo domena publiczna, bez NC, ND, samego GFDL i „fair use”;
    - zdjęcie poziome, oryginał co najmniej 1920 px szerokości;
    - ostre i jasne.
  - **Dane pliku** (licencja, autor, wymiary i adres kopii 1920 px) poda API Commons. Wpisz nazwę pliku bez „File:”:

    ```bash
    F='Nazwa pliku.jpg'
    curl -s -G 'https://commons.wikimedia.org/w/api.php' --data-urlencode "titles=File:$F" \
      -d action=query -d format=json -d prop=imageinfo -d 'iiprop=url|size|extmetadata' -d iiurlwidth=1920 |
    python3 -I -c "import json, re, sys; p = list(json.load(sys.stdin)['query']['pages'].values())[0]; i = p['imageinfo'][0]; m = i['extmetadata']; print(p['title'], i['width'], 'x', i['height']); print('licencja:', m['LicenseShortName']['value']); print('autor:', re.sub('<[^>]+>', '', m['Artist']['value']).strip()); print('strona:', i['descriptionurl']); print('kopia:', i['thumburl'])"
    curl -sIL '<adres kopii z wyniku>' | grep -i '^content-length' | tail -1
    ```

  - **Zgoda:** przed pobraniem pokaż użytkownikowi oba zdjęcia: nazwę pliku, stronę na Commons, licencję, autora i rozmiar kopii w KB. Pobierz dopiero po wyraźnym „tak”. Jeśli użytkownik się nie zgodzi albo nie ma lepszych zdjęć, zostaw obecne i zapisz to w zadaniu 14 jako sprawę otwartą.
  - **Pobierz** do nowego, pustego katalogu tymczasowego, sprawdź wymiary i obejrzyj zdjęcie (narzędziem Read), a dopiero potem skopiuj je do `photos/`. Stare pliki nadpisujesz, ale da się je pobrać ponownie ze stron w obecnym `photos.js`.

    ```bash
    T=$(mktemp -d)
    curl -sSL -o "$T/hoian_4.jpg" '<adres kopii>'
    python3 -I -c "import sys; from PIL import Image; print(Image.open(sys.argv[1]).size)" "$T/hoian_4.jpg"
    cp "$T/hoian_4.jpg" photos/hoian_4.jpg
    ```

    Tak samo `hoian_5.jpg`.
  - **Metadane w `photos/meta.json`:** we wpisach z `"file": "hoian_4.jpg"` i `"file": "hoian_5.jpg"` zamień `title` (z „File:”), `page`, `artist` (autor z API), `license`, `desc` (opis ze strony pliku), `w` i `h` (wymiary pobranej kopii). Pola `block` i `file` zostają.
  - **Podpisy w `site2/src/photos.js`:** w liniach `hoian_4:` i `hoian_5:` zamień `cap` (po polsku, z dokładnym miejscem, np. „Ulica Nguyễn Thái Học w starym mieście Hội An rano”), `artist`, `license` i `page`.

- [ ] **Krok 5: Testy, build i zrzut galerii**

```bash
bash tests/run.sh
python3 site2/build.py
bash tests/shot.sh 'od=DAD&do=DAD&miesiac=MIESIAC&dni=5&co=kultura&poziom=2' 1400 "$TMPDIR/hoian.png" 4200
```

Oczekiwane: `ALL PASS`; build bez błędów (sam robi mniejsze kopie zdjęć); na zrzucie karta Hội An z nowymi zdjęciami i podpisami. Gdyby w tym miesiącu Hội An wypadło z trasy (pora powodzi), zamień `MIESIAC` na `2027-03`.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/content research/plany-dni-2026-10.md research/sezony-2026-10.md site2/src/photos.js
git commit -F - <<'EOF'
Treść: poprawki z przeglądów (Huế, Đà Lạt, Pù Luông, Cát Tiên, delta Mekongu, Hội An, Cao Bằng, Hà Nội, Cát Bà), zimowa uwaga w Pù Luông, źródła zmian w researchu i ostrzejsze zdjęcia Hội An

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

Bez nowych zdjęć commit nie obejmuje `photos.js`, a w tytule odpada „i ostrzejsze zdjęcia Hội An”.

---

### Zadanie 13: Zrzuty z telefonu i przegląd 2A

Sprawdzenie całości przed oddaniem: pełny test, wszystkie sondy, wydruk, zrzuty siedmiu ustawień i ręczne sprawdzenie w przeglądarce tego, czego Chrome bez okna nie pokaże. Na końcu użytkownik ogląda zrzuty i decyduje, co poprawić teraz, a co w 2B. Punkt kontrolny etapu 2 jest dopiero na końcu planu 2B.

**Pliki:** bez zmian w repo, jeśli przegląd niczego nie wykaże. Zrzuty i PDF-y idą do `$TMPDIR/wietnam-2a/`. Do ręcznego sprawdzenia powstaje na chwilę `.claude/launch.json` (lokalny serwer), usuwany w kroku 5.

- [ ] **Krok 1: Pełny test i build**

```bash
time bash tests/run.sh --full
python3 site2/build.py
```

Oczekiwane: `combos: 134784 (all)` i `ALL PASS` w ok. 40 s; build bez błędów.

- [ ] **Krok 2: Wszystkie sondy**

```bash
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: każda sonda kończy się `done, all checks ok` i kodem wyjścia 0.

- [ ] **Krok 3: Wydruk**

```bash
mkdir -p "$TMPDIR/wietnam-2a"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2a/u1.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2a/u1-ciemny.pdf" dark
```

Oczekiwane: ok. 10 stron i 0 zakrytych linii w obu plikach (sucha próba: 10 stron, 0 linii). Mapa drukuje się w trzech kadrach jeden pod drugim.

- [ ] **Krok 4: Zrzuty siedmiu ustawień** na szerokości 390 i 1400 px:

```bash
i=0
for s in \
  '' \
  'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' \
  'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=przyroda,gory&poziom=3' \
  'od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1' \
  'od=HAN&do=DAD&miesiac=2027-09&dni=7&co=morze&poziom=2' \
  'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2&dodaj=phuquoc&usun=hoian' \
  'od=SGN&do=HAN&miesiac=MIESIAC&dni=99&co=&poziom=2'; do
  for w in 390 1400; do bash tests/shot.sh "$s" "$w" "$TMPDIR/wietnam-2a/u$i-$w.png" 6000; done
  i=$((i+1))
done
```

Obejrzyj każdy zrzut (narzędziem Read) i sprawdź:
- **u0** (pierwsze wejście, bez linku): najlepszy miesiąc z 12 następnych dla trasy domyślnej; na 390 px pole miesiąca na pierwszym ekranie, a liczby trasy tuż pod formularzem;
- **u1** (klasyka): „Wybrane, bo…” przy każdym miejscu, pogoda w karcie, dni bez planu na deszcz w suchych miesiącach, „Nie ma na twojej trasie, bo…” z przyciskami „Dodaj” i zapowiedzią „Po dodaniu wypadnie: …”;
- **u2** (Hà Nội tam i z powrotem, październik, poziom 3): noc w drodze w skróconej karcie, bez pogody, z powodem „Noc w drodze z … do …”; punkt Bản Giốc na mapie przy Cao Bằng; ramka lotniska Hà Nội odsunięta od znacznika;
- **u3** (daty z Tết, poziom 1): ostrzeżenie o Tết, pobyt na przełomie stycznia i lutego z pogodą obu miesięcy, data dnia w jednym wierszu („czw. 28.01”), znaczki „Wersja spokojna”;
- **u4** (morze we wrześniu): ostrzeżenie o złym sezonie morza (Cát Bà w porze tajfunów), plan na deszcz przy dniach, strzałki „✈ …” na mapie przy lotach między kadrami;
- **u5** („Dodaj” i „Usuń” z linku): Phú Quốc z powodem „dodane przez ciebie”, Hội An na liście poza trasą z powodem „usunięte przez ciebie”;
- **u6** (błąd w linku, `dni=99`): pierwsza linijka ostrzeżeń nad liczbami trasy mówi o błędzie w linku.

Na wszystkich zrzutach:
- krój IBM Plex Sans („ą” nie wygląda jak „q”);
- nazwy wielowyrazowe i liczby z jednostkami nie łamią się w środku;
- na 390 px liczby trasy w dwóch kolumnach;
- teksty po polsku i per „ty”;
- mapa: trzy kadry z podziałkami, nazwy krajów i mórz, etykiety nie nachodzą na siebie;
- stopka z „©”.

- [ ] **Krok 5: Ręcznie w przeglądarce: pasek u góry, „Na górę” i podświetlanie na mapie.** Chrome bez okna nie uruchamia tych rzeczy (IntersectionObserver), więc sprawdź je we wbudowanej przeglądarce. Nie otwiera ona `file://`, więc strona idzie z lokalnego serwera.
  - Utwórz `.claude/launch.json`:

    ```json
    {
      "version": "0.0.1",
      "configurations": [
        { "name": "strona-2a", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765", "--directory", "site2/out/pages"], "port": 8765 }
      ]
    }
    ```

  - Uruchom serwer narzędziem `preview_start` (nazwa `strona-2a`), przejdź do `http://localhost:8765/#od=SGN&do=HAN&miesiac=<miesiąc za pięć miesięcy, RRRR-MM>&dni=15&co=&poziom=2` i ustaw widok `mobile` (`resize_window`).
  - Sprawdź na telefonie, przewijając i robiąc zrzuty ekranu:
    - u góry strony pasek pokazuje odnośniki do sekcji;
    - gdy formularz zniknie u góry ekranu, pasek pokazuje podsumowanie (termin, dni, poziom) i „Zmień”;
    - „Zmień” przewija do formularza, a po powrocie formularza na ekran podsumowanie znika;
    - „Na górę” pojawia się, gdy zdjęcie u góry zniknie z ekranu, i wraca na górę strony.
  - Ustaw widok `desktop` i sprawdź:
    - pasek zawsze pokazuje odnośniki;
    - przy przewijaniu „Dzień po dniu” mapa obok podświetla znacznik miejsca, które jest na ekranie.
  - Zatrzymaj serwer (`preview_stop`) i usuń `.claude/launch.json` (oraz pusty katalog `.claude/`, jeśli nic innego w nim nie ma).

- [ ] **Krok 6: Pokaż użytkownikowi**
  - Wyślij zrzuty z telefonu (`u0-390.png`–`u6-390.png`) i dwa z komputera (`u1-1400.png`, `u4-1400.png`).
  - Podaj polecenie, które otwiera stronę lokalnie w Chrome:

    ```bash
    open -a "Google Chrome" "file://$PWD/site2/out/pages/index.html#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2"
    ```

  - Zapytaj, co poprawić jeszcze w 2A, a co przenieść do planu 2B albo do etapu 3.
  - Publikacja prywatnego artifactu do sprawdzenia na telefonie tylko po wyraźnym „tak”: publish z `file_path = site2/out/web/index.html` i `files` = obrazy z `site2/out/web/img/`.
  - Poprawki z przeglądu idą jako osobne commity, z testem tam, gdzie się da. Uwagi odłożone na później zapisuje zadanie 14.

---

### Zadanie 14: Notatki: status, następny krok i uwagi z przeglądów

**Pliki:**
- Zmień: `notes/etapy.md`, `CLAUDE.md`, `notes/uwagi-z-przegladow-1b.md`

- [ ] **Krok 1: Zmiany w notatkach** (skrypt sprawdzony na kopiach plików z 11.10.2026):
  - `notes/etapy.md`:
    - tabela etapów: etap 2 w toku, 2A zrobione;
    - w sekcji etapu 2 co zrobił plan 2A, a co zrobi plan 2B;
    - „Następny krok” to plan 2B. Lista „Do etapu 2” znika: zrobione punkty wypadają, „Przed wyjazdem” i przejazdy z lotnisk są w zarysie 2B, a zygzaki tras przechodzą do etapu 3;
    - do etapu 3 dochodzi kolor i kadr nowych miejsc (paleta 20 kolorów na 24 miejsca partii A i B, Pù Mát poza kadrami) w miejsce punktu o `NLAB` i `CLAB`;
    - do etapu 4 dochodzi krój w pliku offline i źródło konturów mapy;
    - opis planu 1B i decyzje punktu kontrolnego etapu 1 przechodzą pod nagłówek „Z planu 1B”, obok „Z planu 1A”;
  - `CLAUDE.md`: status i „Jak sprawdzać” (nowe sondy, `MIESIAC`, `dark`, skrypt konturów, ręczne sprawdzenie paska);
  - `notes/uwagi-z-przegladow-1b.md`: sekcja „Do etapu 2” zrobiona, a punkt o `NLAB` i `CLAB` z „Do etapu 3” odpada.

```bash
python3 - <<'PY'
def edit(p, pairs):
    t = open(p, encoding='utf-8').read()
    for a, b in pairs:
        assert t.count(a) == 1, (p, t.count(a), a[:60])
        t = t.replace(a, b)
    open(p, 'w', encoding='utf-8').write(t)
    return len(pairs)

PLAN_2A = '[plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md)'
e = open('notes/etapy.md', encoding='utf-8').read()

# stage 2: what plan 2A did and what plan 2B will do
a = e.index('- panel ustawień pod telefon i właściwe ustawienia domyślne'); b = e.index('**Punkt kontrolny:** zrzuty z telefonu')
e = e[:a] + """Plan 2A (""" + PLAN_2A + """, zrobiony RRRR-MM-DD):
- formularz na górze strony, a po przewinięciu pasek z podsumowaniem i „Zmień”; na pierwsze wejście najlepszy miesiąc z 12 następnych;
- „Wybrane, bo…”, „Nie ma na twojej trasie, bo…” i zapowiedź przy „Dodaj”;
- pogoda w karcie miejsca, plan na deszcz zależny od miesiąca, wydarzenia i uwagi sezonowe, ostrzeżenie o złym sezonie zainteresowania;
- mapa w trzech kadrach: kontury ze skryptu `geo/make_basemap.py`, rozmieszczanie etykiet i paleta 20 kolorów;
- krój IBM Plex Sans, twarde spacje, uwagi z przeglądów planu 1B i sondy, które sprawdzają.

Plan 2B (zarys na końcu planu 2A):
- budżet: przedział w złotych, najdroższe pozycje, wyprzedzenie rezerwacji; koszty pierwowzoru są w EUR i na grudzień, więc z własnym researchem cen;
- „Przed wyjazdem”: rezerwacje według trasy, pakowanie według miesięcy, wjazd;
- zamiany albo–albo w modułach, najpierw samodzielny motocykl;
- przejazdy z lotnisk do Cát Bà, Cát Tiên i delty Mekongu;
- punkt kontrolny etapu 2.

""" + e[b:]

# the next step: plan 2B; what plan 1B left goes under its own heading, like plan 1A
a = e.index('## Następny krok: etap 2 (interfejs)\n'); b = e.index('Punkt kontrolny etapu 1 (11.10.2026)')
old_1b = e[a:b].replace('## Następny krok: etap 2 (interfejs)\n\n', '')
c = e.index('**Do etapu 2 (interfejs):**'); d = e.index('**Do etapu 3 (nowe miejsca):**')
checkpoint_1 = e[b:c]
e = e[:a] + """## Następny krok: plan 2B

Zrobione RRRR-MM-DD: plan 2A (""" + PLAN_2A + """). Strona jest wygodna na telefonie i tłumaczy swoją trasę. Formularz stoi na górze, a po przewinięciu pasek u góry pokazuje podsumowanie i „Zmień”. Przy każdym miejscu jest „Wybrane, bo…”, pogoda w miesiącu pobytu i wydarzenia, a pod trasą „Nie ma na twojej trasie, bo…” z zapowiedzią przy „Dodaj”. Mapa ma trzy kadry, a jej etykiety nie nachodzą na siebie.

Przegląd zrzutów 2A (RRRR-MM-DD): DECYZJE-Z-PRZEGLADU

**Plan 2B:** najpierw sesja decyzji (po jednym pytaniu, z rekomendacją), potem research i plan z suchą próbą. Zakres i pytania: „Zarys planu 2B” na końcu planu 2A.

""" + e[d:]

e = e.replace(
 "- etykiety mapy (`NLAB`, `CLAB` w `site2/src/app.js`) i kolory w szablonie (`site2/src/template.html`).\n",
 "- każde nowe miejsce dostaje numer koloru (`color` w treści) i musi leżeć w kadrze mapy (`site2/src/panels.js`). Paleta ma 20 kolorów, a partie A i B dają razem 24 miejsca, więc paletę trzeba rozszerzyć. Pù Mát (partia B) leży poza kadrami: trzeba przesunąć kadr i wygenerować kontury od nowa (`geo/make_basemap.py`);\n"
 "- do obejrzenia po dodaniu nowych miejsc: zygzaki przy trasie tam i z powrotem i przy przylocie do Đà Nẵng (raport tras 1A, trasy 6, 8 i 11), dzień z dwoma lotami (ok. 9% tras, głównie Phú Quốc ↔ Đà Lạt przez Sajgon), Cát Bà często na 4 noce, Hà Nội trzy razy na 30-dniowej trasie z Hà Nội. Przykład zygzaka: `#od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1` (Hội An, lot do Hà Nội, lot do Huế, potem na południe).\n", 1)
assert '`color` w treści' in e
e = e.replace(
 "- wydruk: mapy drukują się małe (ok. 220 px) z pustym miejscem obok, a w środku stron zostają puste pasy; do decyzji o formacie wersji offline.\n",
 "- wydruk: mapy drukują się małe (ok. 220 px) z pustym miejscem obok, a w środku stron zostają puste pasy; do decyzji o formacie wersji offline;\n"
 "- plik offline bez internetu dostaje krój zastępczy, więc etykiety mapy mogą się w nim zetknąć; rozstrzygnąć razem z czcionkami na własnym hostingu;\n"
 "- źródło konturów mapy (Natural Earth, domena publiczna) w stopce albo w README.\n", 1)
assert 'Natural Earth, domena publiczna' in e
a = e.index('### Z planu 1A')
e = e[:a] + '### Z planu 1B\n\n' + old_1b + checkpoint_1 + e[a:]
open('notes/etapy.md', 'w', encoding='utf-8').write(e)
n = 5

n += edit('notes/etapy.md', [
 ("| 2. Interfejs | |", "| 2. Interfejs | w toku: 2A (telefon, powody, pogoda, mapa) zrobione RRRR-MM-DD, 2B do zaplanowania |"),
])

n += edit('CLAUDE.md', [
 ("**Status (11.10.2026):** etap 1 zamknięty: plan 1A (silnik) i plan 1B (strona) zrobione, punkt kontrolny przeszedł. Następny krok: etap 2 (interfejs), zob. [notes/etapy.md](notes/etapy.md).",
  "**Status (RRRR-MM-DD):** etap 2 w toku: plan 2A (telefon, powody, pogoda, mapa) zrobiony. Następny krok: plan 2B (budżet, „Przed wyjazdem”, zamiany albo–albo, przejazdy z lotnisk), zob. [notes/etapy.md](notes/etapy.md)."),
 ("`bash tests/run.sh --full` sprawdza wszystkie (ok. pół minuty).", "`bash tests/run.sh --full` sprawdza wszystkie (ok. 40 s)."),
 ("  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`;\n"
  "  - `bash tests/print.sh '<ustawienia>' <plik.pdf>`: wydruk do PDF; podaje liczbę stron, prawie puste strony i linie zakryte ramkami.\n",
  "  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`; sonda kończy się kodem 1, gdy któraś kontrola nie przejdzie;\n"
  "  - `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]`: wydruk do PDF; podaje liczbę stron, prawie puste strony i linie zakryte ramkami;\n"
  "  - słowo `MIESIAC` w ustawieniach zamienia się na miesiąc za pięć miesięcy od dziś.\n"
  "- `python3 -I geo/make_basemap.py <katalog z danymi Natural Earth>`: kontury mapy (`site2/src/basemap.js`) po zmianie kadrów w `site2/src/panels.js`. Dane (ok. 20 MB) leżą poza repo i pobiera się je za zgodą użytkownika (plan 2A, zadanie 11).\n"),
 ("- Pułapki: wbudowana przeglądarka nie otwiera `file://`; w nowym worktree podlinkuj `photos/` z głównej kopii.",
  "- Pułapki: wbudowana przeglądarka nie otwiera `file://`; w nowym worktree podlinkuj `photos/` z głównej kopii; pasek u góry, „Na górę” i podświetlanie na mapie działają na IntersectionObserver, którego Chrome bez okna nie uruchamia, więc sprawdza się je ręcznie przez lokalny serwer (plan 2A, zadanie 13)."),
])

u = open('notes/uwagi-z-przegladow-1b.md', encoding='utf-8').read()
a = u.index('## Do etapu 2\n'); b = u.index('## Do etapu 3\n')
u = u[:a] + """## Do etapu 2

Zrobione w planie 2A (""" + PLAN_2A + """, RRRR-MM-DD): wszystkie uwagi z tej sekcji. Przy okazji odpadła uwaga o `NLAB` i `CLAB` z „Do etapu 3”: etykiety mapy rozmieszcza teraz czysta funkcja, test treści pilnuje koloru każdego miejsca, a test kombinacji jego etykiety w kadrze.

""" + u[b:]
x = "- `site2/src/app.js` (`renderMap`): miejsce bez wpisu w `NLAB` albo `CLAB` wywraca rysowanie mapy (dziś są wszystkie); dopisywanie wpisów jest na liście w [etapy.md](etapy.md), tu chodzi o to, żeby brak wpisu nie zabijał strony.\n"
assert u.count(x) == 1
u = u.replace(x, '')
open('notes/uwagi-z-przegladow-1b.md', 'w', encoding='utf-8').write(u)
n += 2
print(n, 'changes')
PY
```

Oczekiwane: `12 changes`. Jeśli któryś z tych plików zmienił się od 11.10.2026 i skrypt zatrzyma się na `assert`, wprowadź te same zmiany ręcznie.

- [ ] **Krok 2: Uzupełnij to, czego plan nie mógł znać**
  - `RRRR-MM-DD`: data zakończenia 2A, w sześciu miejscach: cztery w `notes/etapy.md`, jedno w `CLAUDE.md` (status) i jedno w `notes/uwagi-z-przegladow-1b.md`. Nie zmieniaj `raport-tras-RRRR-MM-DD.md` w `CLAUDE.md`, to wzór nazwy pliku. Znajdziesz je tak:

    ```bash
    grep -n 'RRRR-MM-DD' notes/etapy.md CLAUDE.md notes/uwagi-z-przegladow-1b.md
    ```

  - `DECYZJE-Z-PRZEGLADU` w `notes/etapy.md`: decyzje użytkownika z zadania 13 (krok 6), zdaniem albo listą. Uwagi odłożone do 2B dopisz pod „Plan 2B”, a do etapów 3 i 4 do ich list.
  - Jeśli zdjęć Hội An nie wymieniono (zadanie 12, krok 4), w `notes/uwagi-z-przegladow-1b.md` zostaw w sekcji „Do etapu 2” ich punkt i zamień „wszystkie uwagi z tej sekcji” na „wszystkie uwagi z tej sekcji poza zdjęciami Hội An”.

- [ ] **Krok 3: Testy i twarde spacje**

```bash
bash tests/run.sh
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
grep -c 'DECYZJE-Z-PRZEGLADU' notes/etapy.md
```

Oczekiwane: `ALL PASS`; drugi grep nic nie wypisuje; trzeci wypisuje `0`.

- [ ] **Krok 4: Commit**

```bash
git add notes/etapy.md CLAUDE.md notes/uwagi-z-przegladow-1b.md
git commit -F - <<'EOF'
Notatki: plan 2A zrobiony, następny krok plan 2B; status, sposoby sprawdzania i uwagi z przeglądów 1B

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Zarys planu 2B

Do rozpisania po 2A, w osobnej sesji: najpierw pytania do użytkownika (po jednym, z rekomendacją), potem research i plan z suchą próbą jak przy 2A. Wiele jest już ustalone w [notes/wizja.md](../wizja.md) (pkt 5 i 7, „Moduł”, „Do sprawdzenia w researchu”).

**Cel:** druga część etapu 2. Strona mówi, ile mniej więcej kosztuje wyjazd i co załatwić przed nim, daje wybór albo–albo wewnątrz modułów i opisuje przejazdy z lotnisk. Na końcu punkt kontrolny etapu 2.

1. **Budżet** (ustalone w wizji, pkt 7: przedział na osobę w złotych, bez lotów do Wietnamu, ceny w danych w EUR z datą kursu, bez poprawek sezonowych, ostrzeżenie o wyższych cenach w Tết i święta):
   - research cen 2026–2027 ze źródłem i datą w `research/`: noclegi, przejazdy i loty krajowe z danych połączeń, wejścia, przewodnicy i trudne dni (noc nad Bàu Sấu, wejście na Pù Luông), rejs po Lan Hạ, jedzenie; koszty pierwowzoru (EUR, grudzień) tylko jako punkt odniesienia;
   - koszty w treści miejsc i w danych połączeń; czysta funkcja liczy przedział dla trasy, z testami na danych zastępczych;
   - w „W skrócie”: przedział, najdroższe pozycje i to, co zarezerwować z wyprzedzeniem;
   - pytania do sesji: standard noclegów (jeden, zależny od poziomu czy do wyboru), dwie osoby w pokoju czy jedna, szerokość przedziału.
2. **„Przed wyjazdem”** zamiast grudniowej sekcji pierwowzoru, bez konkretnych lotów:
   - rezerwacje według trasy: co i z jakim wyprzedzeniem (z danych budżetu i trudnych dni);
   - pakowanie według miesięcy i miejsc z `climate.js` i wydarzeń (chłód w górach, pora deszczowa, pijawki);
   - wjazd: ile dni bez wizy, ważność paszportu, ubezpieczenie, ze źródłem urzędowym i datą;
   - pytanie do sesji: lista do odhaczania czy zwykły tekst.
3. **Zamiany albo–albo w modułach** (wizja, pkt 5):
   - pierwsza zamiana to samodzielna jazda motocyklem zamiast kierowcy na pętlach Cao Bằng i przełęczy Hải Vân (Hà Giang dojdzie z partią A), z wymaganiami i uczciwą informacją o ryzyku; nie zależy od poziomu;
   - research przepisów: uznawanie polskiego międzynarodowego prawa jazdy, kategorie po nowym prawie drogowym, ubezpieczenie, kontrole;
   - przełącznik w karcie miejsca i nowy klucz w linku; zamiana nie zmienia trasy;
   - pytanie do sesji: inne zamiany od razu (np. rower albo łódź) czy tylko motocykl.
4. **Przejazdy z lotnisk** do Cát Bà, Cát Tiên i delty Mekongu: research (prom, autobus, limuzyna, taksówka, czas, cena) i teksty kart przejazdu; dziś strona pisze tylko o taksówce albo transferze.
5. **Punkt kontrolny etapu 2:** pełny test, wszystkie sondy, zrzuty z telefonu dla kilku profili i terminów, przegląd z użytkownikiem i decyzje do etapu 3.

Do sesji 2B trafiają też uwagi z przeglądu 2A (zadanie 13, krok 6), które użytkownik odłoży.

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` (co 7. kombinacja); `bash tests/run.sh --full` → wszystkie 134 784 kombinacje, ok. 40 s.
- `python3 site2/build.py`, potem:
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js` i `map.js` (polecenia w zadaniu 13, krok 2); każda kończy się `done, all checks ok`;
  - `bash tests/shot.sh '<ustawienia>' 390 plik.png [wysokość]`: zrzut na szerokości telefonu;
  - `bash tests/print.sh '<ustawienia>' plik.pdf [dark]`: wydruk, 0 zakrytych linii;
  - w ustawieniach słowo `MIESIAC` to miesiąc za pięć miesięcy od dziś.
- `python3 -I geo/make_basemap.py <katalog z danymi Natural Earth>`: kontury mapy po zmianie `site2/src/panels.js` (zadanie 11).
- Ręcznie: pasek u góry, „Na górę” i podświetlanie na mapie (zadanie 13, krok 5).
- Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie wypisuje.
