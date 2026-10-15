# Etap 5: angielski i Route G — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Zadania mają nagłówki „### Zadanie N:”, a nie „Task N”, więc pomocnicze skrypty `task-start` i `task-brief` ich nie znajdą: wycinaj zadanie od „### Zadanie N:” do następnego „### Zadanie” albo do „## Jak sprawdzać”.

**Cel:** strona po angielsku i po polsku pod jednym adresem, pod nazwą Route G, według sesji decyzji etapu 5 z 15.10.2026. Kolejno:
- **pomiary przed planem** (bez commita): sondy, słowa na stronie i strony PDF trzech tras, wszystkie teksty strony, liczby ze wszystkich tras;
- **poprawki po polsku przed tłumaczeniem:** zdanie pod przełącznikiem motocykla z wyjątkiem z umów (decyzja 8), ryzyko jako dwa fakty, rezerwacje bez dwóch liczb obok siebie, etykieta linków „Warto wiedzieć” przez `esc()`, plany na deszcz w Yok Đôn i Mù Cang Chải i tớ dày w XII–I (ustalenia 20–24);
- **zapis zależny od języka** w czystych funkcjach `page.js`: język z linku, daty, kwoty, twarde spacje, licencje zdjęć, nakładka tekstów miejsc (ustalenie 9);
- **teksty po angielsku**, każde z testami dwóch języków: teksty 21 miejsc, podpisy 97 zdjęć, nazwy świąt i linków, interfejs `UI.en`, a z nim nazwa Route G z podpisem w obu językach (ustalenia 6, 8, 11–17);
- **przełącznik EN · PL** i `&lang=pl` w linku, w planie na WhatsApp i w PDF, angielski domyślny, podgląd linku po angielsku, zdanie bez JavaScriptu w obu językach, plik offline `Route-G.html`, README po angielsku, sondy w obu językach i sonda przełącznika (decyzje 1–2, ustalenia 1–7 i 18);
- na końcu punkt kontrolny (arkusz PL | EN, słowa i strony PDF w obu językach, trasy bez zmian, sondy dwóch miesięcy w obu językach), końcowy przegląd świeżego recenzenta, publikacja za zgodą i notatki.

**Architektura:**
- **Silnik bez zmian.** Trasy i liczby z `tools/liczby.sh` są po planie takie same jak przed nim (ustalenie 19).
- **Polskie teksty zostają, gdzie są** (`ui.js`, `content/`, `photos.js`, `holidays.js`, `before.js`). Angielskie stoją w `site2/src/en/`: `ui.js` (`UI.en` z kluczami `UI.pl`), `content/<id>.js` (`CONTENT_EN.<id>`, te same pola tekstowe co polski plik, listy w tej samej kolejności), `photos.js` (`PHOTO_CAPS_EN` według identyfikatorów zdjęć), `names.js` (`HOLIDAY_NAMES_EN` i `LINK_NAMES_EN` według polskich nazw).
- **Język strony:** `langOf(hash)` w `page.js` daje polski tylko przy `lang=pl`; `langHash(s, lang)` to `linkHash(s)` z `&lang=pl` na końcu przy polskim. W `app.js` `setLang` ustawia język, teksty miejsc (`localContent` kładzie angielskie teksty na polskie dane), teksty szablonu, formularz i stopkę; `apply` zapisuje adres w języku strony, a `fromLink` czyta język z linku.
- **Zapis zależny od języka:** `fmtSpan` (po angielsku „6–12 Feb 2027”), `money`, `vndRange` i `vndText` (kropka dziesiętna i przecinek tysięcy), `tieEnglish` (jednostki, ≈ i zakresy bez jednoliterowych wyrazów), `inMonthText`, `licenceUrl` (deed.en); w `app.js` `T('and')`, `T('season.when')` i `dateLabel` („Thu 28 Jan”).
- **Testy:** kompletność nakładek, te same liczby i nazwy wietnamskie w każdej parze tekstów, styl brytyjski, teksty dla każdego paszportu w obu językach, długość angielskiego opisu dnia, zdania o bezpieczeństwie po angielsku, przełącznik w szablonie; sondy w obu językach (`L()` i `goTo()` w `tests/probes/lib.js`) i sonda `lang.js`.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, zrzuty, arkusz, narzędzia); Chrome bez okna (sondy, zrzuty, wydruk); curl i API Wikimedia Commons (linki, licencje, tylko odczyt).

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): pkt 2 (język), 8 (nazwa i adres), 9 (prawa), „Jak działa strona” (język), „Treść, bezpieczeństwo, licencje” (po angielsku), „Technika” (dwa języki);
- [notes/etapy.md](../etapy.md), sekcja „Z sesji decyzji etapu 5 (15.10.2026)”: 8 decyzji i 31 ustaleń;
- [research/motocykl-2026-10.md](../../research/motocykl-2026-10.md), „Co powiedzieć na stronie”: zdanie pod przełącznikiem w obu językach od etapu 5;
- arkusz PL | EN z suchej próby i lista ustaleń z sesji planowania 15.10.2026, zatwierdzone przez użytkownika (niżej, „Ustalenia z sesji planowania”); zatwierdzone teksty stoją w krokach zadań 2–7.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS z bloków `:root` (test `css colours`);
  - `engine.js` i `page.js` bez DOM; dane wchodzą do `page.js` przez argumenty;
  - komentarze w kodzie po angielsku; teksty dla czytelnika po polsku w `ui.js` i `content/`, po angielsku w `en/`.
- **Silnik bez zmian:** `engine.js`, `places.js`, `seasons.js`, `climate.js`, `travel.js`, a z danych `costs.js` i `before.js` (poza komentarzami), się nie zmieniają; `tools/liczby.sh` daje po planie dokładnie to samo co przed nim (zadanie 8, krok 4).
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, a łącznik bez szerokości `\u2060`, nigdy same znaki. Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, w `var NB = '…';`. Po każdym zadaniu `grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"` nic nie wypisuje. Narzędzie do zapisu plików bywa, że samo zamienia te zapisy na znaki; ten grep to wyłapie.
- **Grep w planie:** w narzędziu Bash `grep` to nakładka zsh, która pomija pliki binarne i pisze ścieżki bez `./`, a bloki uruchamiane przez `bash -c` biorą `/usr/bin/grep`. Dlatego każdy grep po katalogach ma `-I`.
- **Teksty po polsku:** bez zmian treści poza decyzją 8, ustaleniami 20–24 i nazwą (ustalenie 30); do czytelnika per „ty”, bez form rodzajowych (także w etykietach opcji w rozmowie z użytkownikiem); „miejsce”, „u gospodarzy”; wietnamskie nazwy z diakrytykami i bez odmiany; cudzysłów „…”, półpauza w zakresach, godziny 24-godzinne, spacja przed °C.
- **Teksty po angielsku (ustalenia 11–12):** angielski brytyjski (colour, centre, traveller, programme, licence), do czytelnika „you”, bez skrótów typu „you’ll” i „don’t”; słowniczek z ustalenia 12 („Relaxed / Active / Extreme”, „Culture & history”…, „With a driver / Ride yourself”, „At a glance”, „Day by day”, „Before you go”, „Good to know”, „Picked because…”, „Not on your route”, „homestay”, „good / fair / poor season”); wietnamskie nazwy z diakrytykami, tak jak po polsku; cudzysłowy “ ” i apostrof ’, nigdy " ani '; kwoty „17–39M VND”, „0.8–1.5M VND”, „260,000 VND”, „up to 2.2M VND”; daty słowami („30 April”, „January–April”), godziny jak po polsku (6:00, 13:30). Te same fakty co po polsku: te same liczby i nazwy, nic nie dochodzi, nic nie wypada (test tych samych faktów, zadania 4–6).
- **Dla każdego paszportu (decyzja z 15.10.2026), w obu językach:** bez złotych, euro, dolarów, kursu NBP, polskich urzędów i porównań z Polską (test `for every passport` i `englishProblems`).
- **Opis dnia:** po polsku najwyżej 70 słów, po angielsku najwyżej 80 (najdłuższy w suchej próbie ma 79; ustalenie 17).
- **Fakty i ceny:** plan nie dodaje faktów ani cen; zmieniony fakt najpierw trafia do researchu, ze źródłem i datą.
- **Bezpieczeństwo w treści:** każde zdanie o przewodniku, pozwoleniu, komunikacie zarządu, niewybuchach, słoniach, strefie przygranicznej, kasku i wczesnym locie po nocy w terenie ma swój odpowiednik po angielsku; testy pilnują najważniejszych (zadania 4 i 6).
- **Link:** identyfikatory w linku (`od`, `do`, `miesiac`, `co=gory`…) zostają po polsku, żeby stare linki działały; język nie jest ustawieniem trasy: `lang=pl` dopisuje się na końcu, a `parseLink` go nie czyta.
- **`noindex` zostaje** (`NOINDEX = True` w `site2/build.py`, decyzja 5).
- **Zdjęcia:** bez nowych zdjęć; 97 zdjęć strony leży w `photos/` głównej kopii repo (`photos/` nie jest w gicie).
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu; pełny test (`--full`) w punkcie kontrolnym. `tests/run.sh` zatrzymuje się na pierwszym pliku testów z błędem, więc krok 2 każdego zadania pokazuje pierwszy błąd. Od zadania 7 sondy chodzą w obu językach.
- **Commity:** jeden na zadanie 2–7, pliki po nazwie (`git add <pliki>`, nie `git add -A`), opis po polsku, na końcu `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. `git push` tylko za zgodą użytkownika (zadania 10 i 11).
- **Repo jest publiczne:** do commita nie trafiają dane osobowe ani linki z terminami znajomych.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których strona po tym planie najłatwiej zawiedzie odwiedzającego, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Tłumaczenie gubi albo dodaje fakt.**
   - Ryzyko: angielski tekst traci liczbę, nazwę, ograniczenie albo zdanie o bezpieczeństwie, albo dodaje coś, czego po polsku nie ma.
   - Oczekiwane (sucha próba): test tych samych faktów bez wyjątków przy 1050 parach tekstów; po angielsku te same zdania o przewodnikach, komunikatach zarządu, niewybuchach, pozwoleniach i konwencji z 1968 r.
   - Sprawdzenie: testy treści (zadania 4–6), arkusz PL | EN (zadanie 8, krok 6), końcowy przegląd (zadanie 9).
2. **Język w linku.**
   - Ryzyko: stary link otwiera się po polsku albo z inną trasą; przełączenie gubi „Dodaj/Usuń”; plan na WhatsApp albo link w PDF nie niesie języka; `lang=xx` daje ostrzeżenie o błędnym linku.
   - Oczekiwane: link bez `lang=` po angielsku, ta sama trasa w obu językach, `&lang=pl` na końcu adresu, planu na WhatsApp i linku w PDF, `lang=xx` po angielsku bez ostrzeżenia.
   - Sprawdzenie: sondy `lang.js`, `link.js` i `pdf.js` w obu językach (zadania 7 i 8).
3. **Układ przy dłuższych angielskich tekstach.**
   - Ryzyko: kwota wystaje z kafelka, pasek u góry się nie mieści, formularz schodzi z pierwszego ekranu telefonu, przełącznik zachodzi na teksty zdjęcia, strona przewija się w bok przy 320 px, wydruk ma zakryte linie.
   - Oczekiwane: „57–114M VND” w kafelku przy 641, 768 i 901 px; pole miesiąca na pierwszym ekranie telefonu 390 × 844 w obu językach; przy 320 px bez przewijania w bok; wydruki trzech tras w obu językach bez zakrytych linii.
   - Sprawdzenie: sondy `before.js`, `settings.js`, `map.js` w obu językach (zadanie 7), wydruki i zrzuty (zadanie 8, kroki 5 i 7).
4. **Polska wersja zmienia się przy okazji.**
   - Ryzyko: nowy zapis (daty, kwoty, twarde spacje, listy) zmienia polski tekst albo polski test.
   - Oczekiwane: dawne testy strony z polskim zapisem bez zmian; arkusz pokazuje dokładnie 12 zmienionych polskich tekstów (decyzja 8, ustalenia 20–24, nazwa); sondy po polsku 0 z 19.
   - Sprawdzenie: testy strony (zadanie 3), arkusz (zadanie 8, krok 6), sondy po polsku.
5. **Trasy i silnik.**
   - Ryzyko: zmiana w treści albo w danych rusza trasy.
   - Oczekiwane: liczby z `tools/liczby.sh` po planie identyczne z liczbami przed nim, pełny test `ALL PASS`.
   - Sprawdzenie: zadanie 8, kroki 1 i 4.

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest publiczne, strona działa pod https://grzegorzfrskiba-hub.github.io/wietnam/ z `docs/` na `main`. Strona grudniowa (`grzegorzfrskiba-hub/vietnam-december`) zostaje nietknięta.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik.
- **Python:** skrypty bez Pillow uruchamiaj z `-I`; zrzuty i kawałki potrzebują Pillow, więc bez `-I`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`): pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, a IntersectionObserver woła tylko raz; kroje czyta z dysku z flagą `--allow-file-access-from-files`; słowo `MIESIAC` w ustawieniach to miesiąc za pięć miesięcy od dziś.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - narzędzie Bash działa w zsh: niecytowana zmienna z listą plików nie dzieli się na słowa, więc wywołania `jsc` z wieloma plikami idą przez `bash` (jak `$TMPDIR/wietnam-5/jsc.sh`);
  - `tools/links.sh` dostaje od strony Sapa O'Chau kod 406, a od kilku stron operatorów 403, bo stoją za weryfikacją antybotową: weryfikacji się nie obchodzi, a stronę sprawdza się w przeglądarce;
  - sonda `changes.js` zakłada link bez „dodaj”, a sonda `before.js` trasę z Cao Bằng, więc nie uruchamiaj ich na innych trasach;
  - sonda, która zmienia adres, robi to przez `goTo()` z `lib.js`, bo samo `location.hash = …` bez `lang=pl` przełączyłoby polską stronę na angielską (tak działa link bez `lang=`);
  - kliknięcie przycisku z kodu nie przenosi fokusu, więc sonda `lang.js` najpierw ustawia fokus na przycisku, jak zrobiłby to palec albo klawiatura;
  - WebFetch sam zapisuje pliki PDF, które otworzy; czytaj tylko strony HTML.
- **Sucha próba (15.10.2026):**
  - kod i treść zadań 2–7 złożono w osobnym worktree na gałęzi `sucha-proba-5`, commit po commicie od commitu notatek sesji decyzji `561f277`: zadanie 2 `f333941`, zadanie 3 `c5ebd17`, zadanie 4 `f32b850`, zadanie 5 `005bc9a`, zadanie 6 `75e0645`, zadanie 7 `4c90fb3`;
  - kroki tego planu wygenerowano z tych commitów i odtworzono z gotowego tekstu planu na świeżym worktree, zadanie po zadaniu: zadanie 1 dało dokładnie wartości z jego „Oczekiwane”; po krokach testów zadania 2–7 dawały błędy z kroku 2 (w zadaniu 4 `tests/run.sh` staje na liście plików), a po kodzie `ALL PASS`; commit z ostatniego kroku, wykonany dosłownie, brał wszystkie zmienione pliki; drzewa plików, listy plików i opisy commitów po każdym zadaniu są identyczne z suchą próbą;
  - skrypt pomiarów z zadania 1, skrypty punktu kontrolnego (kroki 5–7 zadania 8) i skrypt notatek z zadania 11 uruchomiono dosłownie z tekstu planu: pomiary przed zadaniem 2, punkt kontrolny po zadaniu 7, a notatki na kopii po commicie planu (17 zmian); skrypty planu chodziły z `TMPDIR` w schowku sesji planu, więc `$TMPDIR` wykonawcy jest pusty;
  - pełny test po zadaniu 7: `combos: 134784 months and 10368 dates (all)`, `ALL PASS` (175 s); sondy po każdym zadaniu, a po zadaniu 7 w obu językach: `sondy (MIESIAC): 0 z 21 nie przeszło` i `sondy (MIESIAC, pl): 0 z 19 nie przeszło`;
  - liczby ze wszystkich tras przed planem i po nim identyczne;
  - słowa i strony PDF trzech tras w obu językach jak w tabeli w zadaniu 8, krok 5; 0 zakrytych linii w 12 wydrukach;
  - arkusz PL | EN: 1050 tekstów w każdym języku, opisy dni 4874 → 5971 słów, najdłuższy 66 i 79, 12 zmienionych polskich tekstów;
  - `tools/links.sh`: 65 z 66 adresów z kodem 200 (Sapa O'Chau 406); `tools/licenses.sh`: `97 photos, 0 licence problem(s), 0 author(s) to check`;
  - kawałki zrzutów obejrzane: nagłówek z przełącznikiem przy 390 px w obu językach i przy 320 px po polsku, ramka motocykla i „Before you go” po angielsku, kafelek „57–114M VND” przy 641, 768 i 901 px; strona po angielsku obejrzana też w całości (karty przejazdów, „Picked because…”, pogoda, wydarzenia);
  - nie sprawdzono na sucho: kroku 8 zadania 8 (ręcznie w przeglądarce i na telefonie), przeglądu z użytkownikiem, końcowego przeglądu i publikacji (zadania 8–10).

## Ustalenia z sesji planowania (15.10.2026, zatwierdzone)

Sesja planu przetłumaczyła w suchej próbie całą treść strony: interfejs, nazwy świąt i linków, README i teksty Hà Giang i Yok Đôn w samej sesji, a pozostałe 19 miejsc i ich podpisy przez czterech agentów w tle, według wspólnych zasad i skryptu, który sprawdzał każdy tekst (te same liczby i nazwy, styl, długość). Potem przegląd całości PL | EN. Użytkownik przejrzał arkusz PL | EN (wszystkie teksty zadań 2–7) i zatwierdził listę 16 ustaleń:

- **Teksty (1–5):**
  1. tłumaczenie jak wyżej, bez dodawania i pomijania faktów, według słowniczka z ustalenia 12;
  2. ujednolicenia w całym tekście: bez skrótów („you will”, „do not”); w Hà Nội „the Old Quarter”, w Hội An „the Old Town”; tytuł drugiego pobytu „Return to …”; jaskinie, pagody, targi, ulice i mosty wielką literą („Phong Nha Cave”, „Thiên Mụ Pagoda”, „Bình Tây Market”, „Long Biên Bridge”), rzeki, jeziora, wodospady i przełęcze po nazwie małą („the Son river”, „Ba Bể lake”, „the Hải Vân pass”), poza nazwami angielskimi („the Perfume River”, „the Red River”, „Crocodile Lake”); „night ride” w Cúc Phương także w interfejsie i w nazwie linku; nazwy miejsc bez „The” („Mekong Delta”, „Highlands around Đà Lạt”), bo stoją też w linii planu na WhatsApp „Days 3–5: …”;
  3. „By month” zamiast dosłownego „Month and number of days” w wyborze terminu, bo dosłowne łamało się na telefonie w dwie linie;
  4. poprawki po polsku poza ustaleniami 20–24 (ustalenie 30): rezerwacja noclegów w Mù Cang Chải bez dwóch liczb obok siebie, jak szlak Tà Năng; „700 m” także w wersji spokojnej dnia 2 w Yok Đôn; tớ dày „w XII–I”, bo test stylu nie przepuszcza „w grudniu”; zdanie pod przełącznikiem motocykla całe z researchu, z „wzór z 1949 r.”; ryzyko „Ponad 90% zabitych w 2023 r. to ofiary wypadków z udziałem motocykla (dane krajowe).”;
  5. nazwa po polsku: tytuł karty „Route G · Wietnam po swojemu”, plan na WhatsApp „Route G: 14 dni, marzec 2027”, podpis „Wietnam po swojemu” kursywą pod nazwą; nadtytuł bez zmian.
- **Zapis i kod (6–10):**
  6. daty w zdaniach „6–12 Feb 2027”, „30 Apr – 3 May 2027”, w pasku dni „Thu 28 Jan”, w pasku u góry „Mar 2027 · 15 days · Active”; „good season in March and April”; listy „A, B and C”, bez przecinka przed „and”; „Prices checked in October 2026”;
  7. licencja zdjęcia po angielsku prowadzi do angielskiego tekstu licencji (`deed.en`);
  8. teksty angielskie w osobnym katalogu `site2/src/en/`; nazwy świąt i linków w słownikach według polskich nazw, także tych samych w obu językach, żeby nowy link zawsze dostał nazwę angielską;
  9. `lang` nie jest ustawieniem trasy: `lang=xx` otwiera się po angielsku, a adres traci `lang=xx`; samo `#lang=pl` to domyślna trasa po polsku; przełączenie nie dodaje wpisu w historii przeglądarki, formularz wraca do ustawień trasy, a chwilowe komunikaty (po „Dodaj”, po kopiowaniu) znikają;
  10. przełącznik to dwa przyciski z `aria-pressed` w grupie „Language” / „Język strony”; na ekranach węższych niż 360 px tekst na zdjęciu zaczyna się 14 px niżej, pod przełącznikiem; zdanie pod mapą może się łamać (po angielsku przy 320 px było szersze niż mapa).
- **Testy (11–14):**
  11. test tych samych faktów sprowadza zapis (polskie daty, miesiące obu języków, rzymskie miesiące i wieki, dekada wieku jako rok), a lista wyjątków jest pusta;
  12. angielski opis dnia najwyżej 80 słów (najdłuższy 79; po polsku 70 przy najdłuższym 66);
  13. zdania o bezpieczeństwie pilnowane także po angielsku: kto prowadzi trudny dzień, komunikat zarządu przed Sơn Trà, 4 km w Paradise Cave, konwencja z 1968 r. z wyjątkami z umów, ryzyko jako dwa fakty, paszport nie w zastaw, wiza i strony rządowe; test „dwie liczby obok siebie” dla wszystkich tekstów obu języków;
  14. każda z 19 sond w obu językach (od zadania 7 po angielsku 19 i dwa przebiegi sondy przełącznika, po polsku 19); `settings.js` sprawdza, że przełącznik nie zachodzi na teksty zdjęcia.
- **Proces (15–16):**
  15. jedenaście zadań jak niżej; na punkt kontrolny arkusz PL | EN, słowa i strony PDF trzech tras w obu językach, zrzuty i, za zgodą, telefon;
  16. przy publikacji opis repo na GitHubie po angielsku („Route G · Vietnam, up to you: a trip planner for Vietnam, in English and Polish”), za osobną zgodą.

## Jak działa strona po etapie 5

- **Język:** bez `lang=` w linku strona jest po angielsku; przełącznik EN · PL w prawym górnym rogu zdjęcia zmienia od razu wszystkie teksty, a trasa, ustawienia i zmiany zostają. Polski dopisuje `&lang=pl` na końcu adresu, więc link z paska, plan na WhatsApp i link w PDF otwierają u odbiorcy polską wersję; każdy link sprzed etapu 5 otwiera się po angielsku.
- **Nazwa:** „Route G” w nagłówku, w tytule karty, w planie na WhatsApp, w PDF i w stopce; pod nazwą „Vietnam, up to you” albo „Wietnam po swojemu”.
- **Po angielsku:** teksty miejsc, podpisy zdjęć, święta, nazwy linków, interfejs, daty („Thu 28 Jan”, „6–12 Feb 2027”), kwoty („17–39M VND”, „260,000 VND”); podgląd linku po angielsku („Route G · Vietnam, up to you”), zdanie bez JavaScriptu w obu językach, plik offline `Route-G.html` z przełącznikiem.
- **Po polsku:** jak przed planem, z poprawkami z decyzji 8 i ustaleń 20–24 i z nazwą Route G.

## Struktura plików

- Utwórz: `site2/src/en/ui.js`, `site2/src/en/content/<id>.js` (21 plików), `site2/src/en/photos.js`, `site2/src/en/names.js`, `tests/probes/lang.js`.
- Zmień:
  - teksty i dane: `site2/src/ui.js`, `site2/src/content.js` (`CONTENT_EN`), `site2/src/content/yokdon.js`, `site2/src/content/mucangchai.js`, `site2/src/photos.js` (komentarz), `research/motocykl-2026-10.md`;
  - kod: `site2/src/page.js`, `site2/src/app.js`, `site2/src/template.html`, `site2/build.py`;
  - testy: `tests/run.sh`, `tests/content.test.js`, `tests/page.test.js`, `tests/probes/lib.js`, `before.js`, `changes.js`, `link.js`, `pdf.js`, `publish.js`, `settings.js`;
  - `README.md`;
  - notatki (zadanie 11): `notes/etapy.md`, `notes/wizja.md`, `CLAUDE.md`; strona w `docs/` (zadanie 10).
- Bez zmian: `engine.js`, `places.js`, `seasons.js`, `climate.js`, `travel.js`, `costs.js`, `before.js`, `holidays.js`, `panels.js`, `tools/`.

---

### Zadanie 1: Stan strony przed planem (bez commita)

Zanim cokolwiek się zmieni, zapisz stan strony, z którym punkt kontrolny (zadanie 8) porówna stan po planie:
- skrypt sond tego planu (`$TMPDIR/sondy-5.sh`): 19 sond planu B2, każda na linku bez `lang=` albo, z drugim argumentem `pl`, na tym samym linku z `&lang=pl`, a od zadania 7 także sonda przełącznika; przed zadaniem 7 strona jest tylko po polsku, więc tu chodzi bez `pl`;
- słowa na stronie i strony PDF trzech tras: d1 (Yok Đôn z nocą w lesie, Đà Lạt ze szlakiem Tà Năng, Mỹ Sơn), d2 (Hà Giang „Samodzielnie” i Mù Cang Chải, z ramką motocykla), d3 (30 dni, najszersza kwota);
- wszystkie teksty strony (`teksty-przed.jsonl`), z których krok 6 zadania 8 zrobi arkusz PL | EN, z zaznaczeniem polskich tekstów zmienionych w planie;
- liczby ze wszystkich tras z kopii źródeł (`liczby-przed.md`).

Folder `$TMPDIR/wietnam-5` powstaje od nowa, więc pliki z innych sesji nie pomieszają liczb.

- [ ] **Krok 1: Skrypty i pomiary** (ok. 4 min)

```bash
rm -rf "$TMPDIR/wietnam-5"; mkdir -p "$TMPDIR/wietnam-5/przed"
cat > "$TMPDIR/sondy-5.sh" <<'SONDYEOF'
#!/bin/bash
# The probes of stage 5 for one month (MIESIAC: five months from today) and one language: the 19 of plan B2, each on a link
# without lang= (from task 7 the page in English) or, with the second argument pl, on the same link with &lang=pl (Polish);
# and in the first case, once the page has it (task 7), the probe of the language switch, which tries both. Prints a line for each failure
# and the count at the end. Run from the repository's folder after python3 site2/build.py.
M=${1:-MIESIAC}; L=${2:-}
X=""; [ "$L" = "pl" ] && X="&lang=pl"
A="od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang$X"
B="od=SGN&do=HAN&miesiac=$M&dni=15&co=&poziom=2$X"
bad=0; n=0
run() {
  n=$((n+1))
  bash tests/probe.sh "tests/probes/$1" "$2" "$3" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL $1 $2 $3"; grep -iE "fail|error" "$TMPDIR/sonda.txt" | head -5; }
}
for w in 390 641 768 901 1100 1400; do run before.js $w "$A"; done
for w in 390 360 320; do run settings.js $w "$B"; done
run map.js 1400 "$B"
run map.js 1400 "od=SGN&do=SGN&miesiac=$M&dni=10&co=przyroda&poziom=2&dodaj=yokdon$X"
run map.js 1400 "od=DAD&do=SGN&miesiac=$M&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon$X"
run map.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=16&co=gory,przyroda&poziom=2&dodaj=mucangchai,sapa$X"
run changes.js 1400 "$B"
run changes.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2$X"
run anchors.js 390 "$B"
run link.js 1400 "od=HAN&do=DAD&miesiac=$M&dni=12&co=kultura&poziom=3$X"
run publish.js 1400 "$B"
run pdf.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=gory,kultura&poziom=2$X"
if [ -z "$L" ] && [ -f tests/probes/lang.js ]; then run lang.js 390 "$B"; run lang.js 1400 "$A"; fi
echo "sondy ($M${L:+, $L}): $bad z $n nie przeszło"
SONDYEOF
cat > "$TMPDIR/wietnam-5/slowa.js" <<'JSEOF'
// words on the page as a visitor sees them (innerText, so hidden parts do not count): the whole page, the days (#stops)
// and „Przed wyjazdem” (#before); a word is letters or digits between spaces, as in the test of the day texts
setTimeout(function () {
  function words(el) { return el ? (el.innerText.match(/\S+/g) || []).filter(function (w) { return /[\p{L}\p{N}]/u.test(w); }).length : -1; }
  check('słowa strona ' + words(document.body), true);
  check('słowa dni ' + words(document.getElementById('stops')), true);
  check('słowa przed ' + words(document.getElementById('before')), true);
  check('ramka motocykla ' + document.querySelectorAll('.swap-box').length, true);
  check('język ' + document.documentElement.lang, true);
  done();
}, 1500);
JSEOF
cat > "$TMPDIR/wietnam-5/teksty.js" <<'JSEOF'
// every text of the page as JSON lines, Polish (pl) and, once they are there, English (en), for the sheet PL | EN: the
// fields of each place (day texts, versions, rain plans, events, tips) and the ids of its photos, the captions, the
// interface texts, the holidays and the names of the links. g: the group, k: the key, t: the day's title where it helps,
// d: the text.
var out = [];
function put(lang, g, k, d, t) { if (typeof d === 'string') out.push({ lang: lang, g: g, k: k, t: t, d: d }); }
function place(lang, id, c) {
  ['name', 'short', 'sub', 'gem', 'skip', 'instead'].forEach(function (f) { put(lang, 'place', id + '|' + f, c[f]); });
  if (c.poi) put(lang, 'place', id + '|poi', c.poi.name);
  (c.days || []).forEach(function (d, i) {
    [['', d], ['easy', d.easy], ['hard', d.hard], ['hard.next', d.hard && d.hard.next], ['solo', d.solo], ['self', d.self]].forEach(function (v) {
      if (!v[1]) return;
      put(lang, 'day', id + '|' + i + '|' + v[0], v[1].d, v[1].t);
      put(lang, 'title', id + '|' + i + '|' + v[0], v[1].t);
      if (v[1].rain) put(lang, 'rain', id + '|' + i + '|' + v[0], v[1].rain, v[1].t);
    });
  });
  if (c.again) { put(lang, 'day', id + '|again', c.again.d, c.again.t); put(lang, 'title', id + '|again', c.again.t); }
  (c.events || []).forEach(function (e, i) { put(lang, 'event', id + '|' + i, e.t); });
}
Object.keys(CONTENT).forEach(function (id) { place('pl', id, CONTENT[id]); put('pl', 'photos', id, CONTENT[id].photos.join(' ')); });
if (typeof CONTENT_EN !== 'undefined') Object.keys(CONTENT_EN).forEach(function (id) { place('en', id, CONTENT_EN[id]); });
Object.keys(PHOTO_META).forEach(function (ph) { put('pl', 'photo', ph, PHOTO_META[ph].cap); });
if (typeof PHOTO_CAPS_EN !== 'undefined') Object.keys(PHOTO_CAPS_EN).forEach(function (ph) { put('en', 'photo', ph, PHOTO_CAPS_EN[ph]); });
Object.keys(UI).forEach(function (lang) { Object.keys(UI[lang]).forEach(function (k) { put(lang, 'ui', k, UI[lang][k]); }); });
HOLIDAYS.forEach(function (h) { put('pl', 'holiday', h[3], h[3]); });
if (typeof HOLIDAY_NAMES_EN !== 'undefined') Object.keys(HOLIDAY_NAMES_EN).forEach(function (n) { put('en', 'holiday', n, HOLIDAY_NAMES_EN[n]); });
Object.keys(BOOK).forEach(function (k) { BOOK[k].links.forEach(function (l) { put('pl', 'link', l.name, l.name); }); });
ENTRY.links.forEach(function (l) { put('pl', 'link', l.name, l.name); });
if (typeof LINK_NAMES_EN !== 'undefined') Object.keys(LINK_NAMES_EN).forEach(function (n) { put('en', 'link', n, LINK_NAMES_EN[n]); });
var seen = {};
out.forEach(function (o) { var j = JSON.stringify(o); if (!seen[j]) { seen[j] = true; print(j); } });
JSEOF
cat > "$TMPDIR/wietnam-5/jsc.sh" <<'SHEOF'
#!/bin/bash
# runs a script after every source of the page, as tests/run.sh lists them, with the English files once they are there
# (site2/src/en/); $2: the folder of the sources (default site2/src)
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
P=${2:-site2/src}
EN_C=""; [ -d $P/en/content ] && EN_C=$(ls $P/en/content/*.js)
EN_P=""; [ -f $P/en/photos.js ] && EN_P=$P/en/photos.js
EN_U=""; [ -f $P/en/ui.js ] && EN_U=$P/en/ui.js
EN_N=""; [ -f $P/en/names.js ] && EN_N=$P/en/names.js
"$J" $P/places.js $P/seasons.js $P/climate.js $P/travel.js $P/engine.js $P/holidays.js $P/content.js $P/content/*.js $EN_C $P/photos.js $EN_P $P/ui.js $EN_U $P/panels.js $P/costs.js $P/before.js $EN_N $P/page.js "$1"
SHEOF
D1='od=DAD&do=SGN&miesiac=2027-01&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon'
D2='od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai&motocykl=hagiang'
D3='od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3'
bash tests/run.sh
python3 site2/build.py
bash "$TMPDIR/sondy-5.sh" MIESIAC
for d in 1 2 3; do
  eval H=\$D$d
  bash tests/probe.sh "$TMPDIR/wietnam-5/slowa.js" 1400 "$H" | grep -E '^ok   (słowa|ramka|język)' > "$TMPDIR/wietnam-5/slowa-przed-d$d.txt"
  bash tests/print.sh "$H" "$TMPDIR/wietnam-5/przed-d$d.pdf" > "$TMPDIR/wietnam-5/druk-przed-d$d.txt"
done
bash "$TMPDIR/wietnam-5/jsc.sh" "$TMPDIR/wietnam-5/teksty.js" > "$TMPDIR/wietnam-5/teksty-przed.jsonl"
git archive HEAD site2/src | tar -x -C "$TMPDIR/wietnam-5/przed"
bash tools/liczby.sh "$TMPDIR/wietnam-5/przed/site2/src" > "$TMPDIR/wietnam-5/liczby-przed.md"
grep -h . "$TMPDIR"/wietnam-5/slowa-przed-d*.txt "$TMPDIR"/wietnam-5/druk-przed-d*.txt
wc -l < "$TMPDIR/wietnam-5/teksty-przed.jsonl"
tail -n 5 "$TMPDIR/wietnam-5/liczby-przed.md"
```

Oczekiwane:
- `ALL PASS`, build bez błędów;
- `sondy (MIESIAC): 0 z 19 nie przeszło`;
- słowa: d1 `słowa strona 4433`, `słowa dni 1759`, `słowa przed 624`, `ramka motocykla 0`; d2 `4822`, `2133`, `484`, `ramka motocykla 1`; d3 `5878`, `3147`, `679`, `ramka motocykla 0`; przy każdej `język pl`;
- wydruki: d1 14, d2 13, d3 20 stron A4, każdy z `covered text lines: 0`;
- `1067` (linie pliku tekstów);
- liczby przed planem, jak po planie B2: `Dzień z dwoma lotami: 9,4% tras.`, `Dzień z lotem 8 h i dłużej od drzwi do drzwi: 11,0% tras.`, `Hà Nội trzy razy: 1314 tras.`, zygzak `2,0% tras`.

- [ ] **Krok 2: Bez commita**

```bash
git status --short
```

Oczekiwane: nic, bo pomiary leżą w `$TMPDIR`.

---

### Zadanie 2: Poprawki po polsku przed tłumaczeniem

Decyzja 8 i ustalenia 20–24 z sesji decyzji etapu 5, żeby tłumaczenie brało gotowe polskie teksty:
- **pod przełącznikiem motocykla** całe zdanie z researchu motocykla („Co powiedzieć na stronie”, od etapu 5): na końcu wyjątek z umów, prawo jazdy z państwa ASEAN i międzynarodowe prawo jazdy z Korei Płd., choć policja przy kontroli może ich nie uznać od ręki; „wzór z 1949 r.” zamiast „międzynarodowe prawo jazdy według konwencji z 1949 r.”, jak w researchu;
- **ryzyko** jako dwa fakty, każdy ze swoim źródłem, bez „z nich”: „Na drogach Wietnamu ginie ok. 17 000 osób rocznie (szacunek WHO). Ponad 90% zabitych w 2023 r. to ofiary wypadków z udziałem motocykla (dane krajowe).”; to samo zdanie po polsku i po angielsku dochodzi do researchu motocykla;
- **rezerwacje bez dwóch liczb obok siebie:** szlak Tà Năng–Phan Dũng (ustalenie 21) i noclegi w Mù Cang Chải („na 2.09 3–4 tygodnie”, ten sam przypadek, który złapał nowy test; ustalenie 30); test typografii łapie takie miejsca w każdym tekście, a dwukropek („2025: 22–24.04”) i tysiące („17 000”) liczb nie łączą;
- **`know.links`** przez `esc()` i komentarz „entry and health” w `site2/src/template.html` (ustalenie 22);
- **plany na deszcz** dnia 2 w Yok Đôn bez „zamiast lasu”, z „700 m” (także w wersji spokojnej tego dnia), i w Mù Cang Chải bez „zamiast wędrówki”, więc pasują też do wersji „Spokojnie”; w zimnej porze w Mù Cang Chải „w XII–I kwitnie tớ dày”, jak w researchu (test stylu nie przepuszcza „w grudniu”; ustalenie 24).

**Pliki:**
- Zmień: `site2/src/ui.js`, `site2/src/app.js`, `site2/src/template.html`, `site2/src/content/yokdon.js`, `site2/src/content/mucangchai.js`, `research/motocykl-2026-10.md`
- Testy: `tests/content.test.js`

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
    need(!/\d-\d/.test(x[1]), x[0] + ': a hyphen in a range, use an en dash');
```

na:

```js
    need(!/\d-\d/.test(x[1]), x[0] + ': a hyphen in a range, use an en dash');
    // two numbers side by side read as one („na Tết i 30.04 3–4 tygodnie”, the final review of plan B2); a number's thousands
    // („17 000”) are no second number, and a colon („2025: 22–24.04”) parts them
    need(!/\d(?:[\d.:]*\d)?\s(?!\d{3}(?!\d))[\d½]/.test(x[1]), x[0] + ': two numbers side by side: put a word between them');
```

W `tests/content.test.js` zamień:

```js
  need(/Paszportu nie zostawiaj w zastaw/.test(UI.pl['sw.tips']), 'sw.tips: the passport is no deposit');
```

na:

```js
  need(/Paszportu nie zostawiaj w zastaw/.test(UI.pl['sw.tips']), 'sw.tips: the passport is no deposit');
  // the exceptions by agreement (decision 8 of stage 5, 15.10.2026): a licence of an ASEAN country and a South Korean permit,
  // which police at a check may not accept straight away (MOTO-2026-10-15t, -15v, -15w, -15y)
  need(/Wyjątki z umów: prawo jazdy z państwa ASEAN i międzynarodowe prawo jazdy z Korei Płd\., choć policja przy kontroli może ich nie uznać od ręki\.$/.test(UI.pl['sw.note']),
    'sw.note: ends with the exceptions by agreement (ASEAN, South Korea) and the caution about police checks');
  // the risk as two facts, each with its source (finding 20 of stage 5): the WHO estimate and the national data of 2023
  need(/\(szacunek WHO\)\. Ponad 90% zabitych w 2023 r\. to ofiary wypadków z udziałem motocykla \(dane krajowe\)\./.test(UI.pl['sw.risk']) && !/z nich/.test(UI.pl['sw.risk']),
    'sw.risk: the WHO estimate and the national data of 2023 as two facts, without „z nich”');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: `typography: UI.pl.b.homestay.mucangchai: two numbers side by side: put a word between them`, `typography: UI.pl.b.dalat.tanang: two numbers side by side: put a word between them` i `Exception: Error: 2 problem(s) in typography, listed above`.

- [ ] **Krok 3: Teksty, kod i research**

W `research/motocykl-2026-10.md` zamień:

```markdown
- EN: “Ride yourself only with a motorbike licence and an International Driving Permit under the 1968 Convention, both on you. A car licence does not cover even a 110–125 cc scooter. Check which convention your country issues it under: a 1949 permit does not work in Vietnam. Exceptions by agreement: a licence from an ASEAN country and a South Korean permit, though police at a check may not accept them straight away.”
```

na:

```markdown
- EN: “Ride yourself only with a motorbike licence and an International Driving Permit under the 1968 Convention, both on you. A car licence does not cover even a 110–125 cc scooter. Check which convention your country issues it under: a 1949 permit does not work in Vietnam. Exceptions by agreement: a licence from an ASEAN country and a South Korean permit, though police at a check may not accept them straight away.”
- Ryzyko w ramce, od etapu 5 (ustalenie 20 z sesji decyzji etapu 5): szacunek WHO i dane krajowe jako dwa fakty, każdy ze swoim źródłem, bez „z nich”: PL „Na drogach Wietnamu ginie ok. 17 000 osób rocznie (szacunek WHO). Ponad 90% zabitych w 2023 r. to ofiary wypadków z udziałem motocykla (dane krajowe).”, EN “About 17,000 people die on Vietnam’s roads every year (WHO estimate). Over 90% of those killed in 2023 died in crashes involving a motorbike (national data).” (WHO-GHO, MOTO-2026-10-15j).
```

W `site2/src/app.js` zamień:

```js
      '<p class="b-meta">' + T('know.links') + linksOf(ENTRY.links) + '</p>';
```

na:

```js
      '<p class="b-meta">' + esc(T('know.links')) + linksOf(ENTRY.links) + '</p>';
```

W `site2/src/content/mucangchai.js` zamień:

```js
      rain: 'w ulewie zamiast wędrówki autem po punktach widokowych Mâm Xôi i Kim Nọi, a pieszo tylko krótkie odcinki po betonowych drogach.',
```

na:

```js
      rain: 'w ulewie autem po punktach widokowych Mâm Xôi i Kim Nọi, a pieszo tylko krótkie odcinki po betonowych drogach.',
```

W `site2/src/content/mucangchai.js` zamień:

```js
    { from: [12, 1], to: [2, 29], warn: true, t: 'Zimna pora: noce w miasteczku ok. 9 °C, a w falach chłodu na przełęczy i w La Pán Tẩn szron. Tarasy stoją po żniwach bez ryżu, za to kwitnie wtedy tớ dày, a doliny często wypełnia morze chmur.' }
```

na:

```js
    { from: [12, 1], to: [2, 29], warn: true, t: 'Zimna pora: noce w miasteczku ok. 9 °C, a w falach chłodu na przełęczy i w La Pán Tẩn szron. Tarasy stoją po żniwach bez ryżu, za to w XII–I kwitnie tớ dày, a doliny często wypełnia morze chmur.' }
```

W `site2/src/content/yokdon.js` zamień:

```js
      rain: 'rano słonie jak zwykle, w pelerynie, a po południu, gdy przyjdzie burza, zamiast lasu lekcja gotowania w kuchni rodziny Ê Đê, 700 metrów od parku.',
      easy: { pace: 'nature', cost: ['yokdon.elephants', 'yokdon.cooking'], t: 'Słonie rano, kuchnia Ê Đê po południu', d: 'Rano pół dnia za słoniami, 8:00–11:00, z przewodnikiem parku i transportem z biura do lasu. Po południu lekcja gotowania u rodziny Ê Đê w Buôn Jang Lành, 700 metrów od parku: razem z gospodarzami gotujesz i jesz obiad.' },
```

na:

```js
      rain: 'rano słonie jak zwykle, w pelerynie, a po południu, gdy przyjdzie burza, lekcja gotowania w kuchni rodziny Ê Đê, 700 m od parku.',
      easy: { pace: 'nature', cost: ['yokdon.elephants', 'yokdon.cooking'], t: 'Słonie rano, kuchnia Ê Đê po południu', d: 'Rano pół dnia za słoniami, 8:00–11:00, z przewodnikiem parku i transportem z biura do lasu. Po południu lekcja gotowania u rodziny Ê Đê w Buôn Jang Lành, 700 m od parku: razem z gospodarzami gotujesz i jesz obiad.' },
```

W `site2/src/template.html` zamień:

```html
/* Before the trip: the budget, what to book, entry and health, what to pack; two columns on a wide screen */
```

na:

```html
/* Before the trip: the budget, what to book, what is worth knowing, what to pack; two columns on a wide screen */
```

W `site2/src/ui.js` zamień:

```js
  'sw.note': 'Samodzielnie tylko z prawem jazdy na motocykl i międzynarodowym prawem jazdy według konwencji z 1968 r., oba przy sobie. Samo prawo jazdy na samochód nie wystarcza nawet na skuter 110–125 cm³. Sprawdź, według której konwencji wydaje je twój kraj, bo międzynarodowe prawo jazdy według konwencji z 1949 r. w Wietnamie nie działa.',
```

na:

```js
  'sw.note': 'Samodzielnie tylko z prawem jazdy na motocykl i międzynarodowym prawem jazdy według konwencji z 1968 r., oba przy sobie. Samo prawo jazdy na samochód nie wystarcza nawet na skuter 110–125 cm³. Sprawdź, według której konwencji wydaje je twój kraj, bo wzór z 1949 r. w Wietnamie nie działa. Wyjątki z umów: prawo jazdy z państwa ASEAN i międzynarodowe prawo jazdy z Korei Płd., choć policja przy kontroli może ich nie uznać od ręki.',
```

W `site2/src/ui.js` zamień:

```js
  'sw.risk': 'Na drogach Wietnamu ginie ok. 17 000 osób rocznie (szacunek WHO), a ponad 90% z nich w wypadkach z udziałem motocykla. Po wypadku grozi odpowiedzialność karna, odszkodowanie i zakaz wyjazdu do końca dochodzenia. Bez uprawnień grozi mandat 2–4 mln VND i zatrzymanie motocykla, a polisa może nie zapłacić. Policja kontroluje cudzoziemców.',
```

na:

```js
  'sw.risk': 'Na drogach Wietnamu ginie ok. 17 000 osób rocznie (szacunek WHO). Ponad 90% zabitych w 2023 r. to ofiary wypadków z udziałem motocykla (dane krajowe). Po wypadku grozi odpowiedzialność karna, odszkodowanie i zakaz wyjazdu do końca dochodzenia. Bez uprawnień grozi mandat 2–4 mln VND i zatrzymanie motocykla, a polisa może nie zapłacić. Policja kontroluje cudzoziemców.',
```

W `site2/src/ui.js` zamień:

```js
  'b.homestay.mucangchai': 'W Mù Cang Chải w porze złotych tarasów (koniec VIII – połowa X) i na 2.09 3–4 tygodnie wcześniej.',
```

na:

```js
  'b.homestay.mucangchai': 'W Mù Cang Chải 3–4 tygodnie wcześniej w porze złotych tarasów (koniec VIII – połowa X) i na 2.09.',
```

W `site2/src/ui.js` zamień:

```js
  'b.dalat.tanang': 'Szlak Tà Năng–Phan Dũng z biurem z Đà Lạt: 1–2 tygodnie wcześniej, w weekendy I–IV, na Tết i 30.04 3–4 tygodnie. Zapytaj o licencję biura i zgodę zarządcy lasu i upewnij się, że powrót do Đà Lạt jest w cenie.',
```

na:

```js
  'b.dalat.tanang': 'Szlak Tà Năng–Phan Dũng z biurem z Đà Lạt: 1–2 tygodnie wcześniej, a 3–4 tygodnie na weekendy I–IV, na Tết i na 30.04. Zapytaj o licencję biura i zgodę zarządcy lasu i upewnij się, że powrót do Đà Lạt jest w cenie.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-5.sh" MIESIAC
```

Oczekiwane: `ALL PASS`, grep nic nie wypisuje, `sondy (MIESIAC): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add research/motocykl-2026-10.md site2/src/app.js site2/src/content/mucangchai.js site2/src/content/yokdon.js site2/src/template.html site2/src/ui.js tests/content.test.js
git commit -F - <<'EOF'
Poprawki przed tłumaczeniem (etap 5): pod przełącznikiem motocykla wyjątek z umów, prawo jazdy z państwa ASEAN i międzynarodowe prawo jazdy z Korei Płd., choć policja przy kontroli może ich nie uznać od ręki (decyzja 8, całe zdanie z researchu motocykla); ryzyko jako dwa fakty, szacunek WHO i dane krajowe z 2023 r., bez „z nich” (ustalenie 20); rezerwacje szlaku Tà Năng–Phan Dũng i noclegów w Mù Cang Chải bez dwóch liczb obok siebie (ustalenie 21), a test typografii łapie takie miejsca; etykieta linków „Warto wiedzieć” przez esc() i komentarz w template.html (ustalenie 22); plany na deszcz dnia 2 w Yok Đôn i Mù Cang Chải bez „zamiast”, „700 m” i tớ dày w XII–I (ustalenie 24)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Zapis zależny od języka

Ustalenie 9, w czystych funkcjach `page.js`, z testami strony dla obu języków. Polski zapis zostaje taki sam, a `app.js` podaje funkcjom język strony, który do zadania 7 jest polski, więc strona się nie zmienia:
- **język z linku:** `langOf(hash)` daje `'pl'` tylko przy `lang=pl`, każda inna wartość albo brak to `'en'`; `parseLink` pomija `lang`, więc nie ma ostrzeżenia o błędnym linku (ustalenie 3); `langHash(s, lang)` dopisuje `&lang=pl` na końcu adresu przy polskim (ustalenie 2);
- **nakładka tekstów miejsc:** `localContent(content, overlay)` kładzie angielskie teksty na polskie dane, a dane (`p`, `pace`, `cost`…) zostają;
- **daty w zdaniach:** `fmtSpan(a, b, mon)` z krótkimi nazwami miesięcy daje „6–12 Feb 2027”, „30 Apr – 3 May 2027”, „28 Dec 2030 – 2 Jan 2031”, „1 Jan 2027”;
- **kwoty:** `money`, `vndRange` i `vndText` z `'en'` piszą kropkę dziesiętną i przecinek tysięcy („0.8–1.5”, „260,000”, „up to 2.2M VND” przez klucz `mln.upto`);
- **twarde spacje:** `tieEnglish` trzyma liczbę z jednostką (h, min, km, m, mm, °C, cc, VND, „2.2M VND”), ≈ z liczbą i zakres liczb razem, bez polskich jednoliterowych wyrazów; `app.js` wiąże teksty w obu językach, nazwy wietnamskie i wielowyrazowe też;
- **„in March”:** `inMonthText(noun, lang)`; **licencja zdjęcia** po angielsku prowadzi do angielskiego tekstu licencji (`deed.en`).

**Pliki:**
- Zmień: `site2/src/page.js`, `site2/src/app.js`
- Testy: `tests/page.test.js`

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/page.test.js` zamień:

```js
eq(parseLink(linkHash(roundM)), roundM, 'linkHash, then parseLink: the same settings (with a swap)');
```

na:

```js
eq(parseLink(linkHash(roundM)), roundM, 'linkHash, then parseLink: the same settings (with a swap)');
// the language (stage 5): Polish only with lang=pl, English otherwise, also with another value or none; the language is no
// setting of the trip, so parseLink leaves it out and names no wrong field
eq(['#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2', '#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2&lang=pl', '#lang=pl&od=SGN', '#od=SGN&lang=en',
  '#od=SGN&lang=', '#od=SGN&lang', '#od=SGN&lang=PL', '#od=SGN&lang=pl2', '', '#day-5'].map(langOf), ['en', 'pl', 'pl', 'en', 'en', 'en', 'en', 'en', 'en', 'en'],
  'langOf: Polish only with lang=pl');
var badL = [];
eq([parseLink('#od=SGN&lang=pl', badL), parseLink('#od=SGN&lang=xx', badL), badL], [{ from: 'SGN' }, { from: 'SGN' }, []], 'parseLink leaves the language out and names no wrong field');
eq([langHash(round, 'pl'), langHash(round, 'en')], [linkHash(round) + '&lang=pl', linkHash(round)], 'langHash: lang=pl at the end in Polish, nothing in English');
eq(parseLink(langHash(roundM, 'pl')), roundM, 'langHash, then parseLink: the same settings');
// the texts of the places in a language: the overlay's texts over the Polish ones, the data kept, the base unchanged
var BASE_T = { a: { name: 'Miejsce', short: 'A', pt: [1, 2], days: [{ p: 1, t: 'Dzień', d: 'Opis.', cost: ['x.y'], easy: { pace: 'rest', t: 'Łatwo', d: 'Spokojnie.' } }],
  events: [{ from: [1, 1], to: [2, 1], t: 'Uwaga.' }] } };
var OVER_T = { a: { name: 'Place', short: 'A', days: [{ t: 'Day', d: 'Text.', easy: { t: 'Easy', d: 'Relaxed.' } }], events: [{ t: 'Note.' }] } };
eq(localContent(BASE_T, OVER_T), { a: { name: 'Place', short: 'A', pt: [1, 2], days: [{ p: 1, t: 'Day', d: 'Text.', cost: ['x.y'], easy: { pace: 'rest', t: 'Easy', d: 'Relaxed.' } }],
  events: [{ from: [1, 1], to: [2, 1], t: 'Note.' }] } }, 'localContent: the texts of the overlay, the data of the base');
eq([BASE_T.a.name, localContent(BASE_T, null) === BASE_T, localContent(BASE_T, {}).a.name], ['Miejsce', true, 'Miejsce'],
  'the base stays as it was; without an overlay, or without one for a place, the Polish texts');
```

W `tests/page.test.js` zamień:

```js
eq(fmtSpan('2027-01-01', '2027-01-01'), '1.01.2027', 'one day');
```

na:

```js
eq(fmtSpan('2027-01-01', '2027-01-01'), '1.01.2027', 'one day');
// in English (stage 5), with the short names of the months: the day, the month's name and the year; a span over two months
// or two years with a spaced dash between whole dates
var MON3_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
eq([fmtSpan('2027-02-06', '2027-02-12', MON3_EN), fmtSpan('2027-04-30', '2027-05-03', MON3_EN), fmtSpan('2030-12-28', '2031-01-02', MON3_EN), fmtSpan('2027-01-01', '2027-01-01', MON3_EN)],
  ['6–12 Feb 2027', '30 Apr – 3 May 2027', '28 Dec 2030 – 2 Jan 2031', '1 Jan 2027'], 'English spans: in one month, over two months, over two years, one day');
```

W `tests/page.test.js` zamień:

```js
  'dong as the page writes them: a thing that may cost nothing (from 0, as the flight over Khau Phạ) says only its dearer end, „do 2,2 mln VND”, never „0,1–2,2”; one number when the ends are alike; „0 VND” only for what costs nothing');
```

na:

```js
  'dong as the page writes them: a thing that may cost nothing (from 0, as the flight over Khau Phạ) says only its dearer end, „do 2,2 mln VND”, never „0,1–2,2”; one number when the ends are alike; „0 VND” only for what costs nothing');
// in English (stage 5): a decimal point and thousands with commas, as English writes money: „0.8–1.5M VND”, „260,000 VND”
eq([money(500, 'en'), money(12400, 'en'), money(1234567, 'en')], ['500', '12,400', '1,234,567'], 'English: thousands with commas');
eq([vndRange([28, 52], 29055, false, 'en'), vndRange([9, 9], 29055, false, 'en'), vndRange([1964, 3929], 29055, true, 'en')],
  [['0.8', '1.5', true], ['260,000', '260,000', false], ['57', '114', true]], 'English dong: a decimal point, thousands with commas, whole millions alike');
eq([vndText([0, 75], 29055, false, 'en'), vndText([0, 29], 29055, false, 'en'), vndText([20, 34], 29055, false, 'en')],
  [{ key: 'mln.upto', vars: { b: '2.2' } }, { key: 'vnd.upto', vars: { b: '840,000' } }, { key: 'mln', vars: { a: '0.6', b: '1.0' } }], 'English dong as the page writes them');
```

W `tests/page.test.js` zamień:

```js
   'https://creativecommons.org/publicdomain/zero/1.0/deed.pl', null], 'the text of a licence: CC BY and CC BY-SA by version (and country), CC0; none for the public domain');
```

na:

```js
   'https://creativecommons.org/publicdomain/zero/1.0/deed.pl', null], 'the text of a licence: CC BY and CC BY-SA by version (and country), CC0; none for the public domain');
eq([licenceUrl('CC BY-SA 4.0', 'en'), licenceUrl('CC BY-SA 3.0 de', 'en'), licenceUrl('CC0', 'en'), licenceUrl('Public domain', 'en')],
  ['https://creativecommons.org/licenses/by-sa/4.0/deed.en', 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en', 'https://creativecommons.org/publicdomain/zero/1.0/deed.en', null],
  'in English (stage 5): the English text of a licence');
```

W `tests/page.test.js` zamień:

```js
eq(tieVietnamese(tieVietnamese('Hà Tôn Quyền i Bến Thành')), tieVietnamese('Hà Tôn Quyền i Bến Thành'), 'idempotent');
```

na:

```js
eq(tieVietnamese(tieVietnamese('Hà Tôn Quyền i Bến Thành')), tieVietnamese('Hà Tôn Quyền i Bến Thành'), 'idempotent');
// English (stage 5): no one-letter words to tie; a number keeps its unit and ≈ its number, and a range keeps together
eq([tieEnglish('about 3–4 km from a town'), tieEnglish('≈ 5½ h on the road'), tieEnglish('nights of 13 °C, 64 mm of rain, 1700 m up'),
  tieEnglish('a fine of 2–4M VND or 230,000–300,000 VND'), tieEnglish('a 110–125 cc scooter, 11:00–14:30'), tieEnglish('a walk in a park, I hear')],
  ['about 3–\u20604' + NB + 'km from a town', '≈' + NB + '5½' + NB + 'h on the road', 'nights of 13' + NB + '°C, 64' + NB + 'mm of rain, 1700' + NB + 'm up',
   'a fine of 2–\u20604M' + NB + 'VND or 230,000–\u2060300,000' + NB + 'VND', 'a 110–\u2060125' + NB + 'cc scooter, 11:00–\u206014:30', 'a walk in a park, I hear'],
  'tieEnglish: units, ≈ and ranges as in Polish; no one-letter words');
eq(tieEnglish(tieEnglish('≈ 4 h, 1–3 km')), tieEnglish('≈ 4 h, 1–3 km'), 'idempotent');
eq([inMonthText('marcu', 'pl'), inMonthText('wrześniu', 'pl'), inMonthText('lutym', 'pl'), inMonthText('March', 'en'), inMonthText('September', 'en')],
  ['w marcu', 'we wrześniu', 'w lutym', 'in March', 'in September'], 'inMonthText: we before w and a consonant in Polish; in English, in');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: `Exception: ReferenceError: Can't find variable: langOf`.

- [ ] **Krok 3: Funkcje i język strony w app.js**

W `site2/src/app.js` zamień:

```js
  // "w marcu", "we wrześniu" (we before w and a consonant)
  function inMonth(m) { var noun = T('monl.' + m); return (/^w[^aeiouyąęó]/i.test(noun) ? 'we ' : 'w ') + noun; }
```

na:

```js
  // "w marcu", "we wrześniu", "in March" (inMonthText in page.js)
  function inMonth(m) { return inMonthText(T('monl.' + m), lang); }
  // days for a sentence (fmtSpan in page.js): in English with the short names of the months
  function span(a, b) { return fmtSpan(a, b, lang === 'en' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (m) { return T('mon3.' + m); }) : null); }
```

W `site2/src/app.js` zamień:

```js
    var v = vndText(eur, EUR_VND, sum);
```

na:

```js
    var v = vndText(eur, EUR_VND, sum, lang);
```

W `site2/src/app.js` zamień:

```js
    return st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('term.month', { month: T('mon.' + st.month), year: st.year });
```

na:

```js
    return st.start ? span(st.start, tripDate(st.start, st.days)) : T('term.month', { month: T('mon.' + st.month), year: st.year });
```

W `site2/src/app.js` zamień:

```js
    var term = st.start ? fmtSpan(st.start, tripDate(st.start, st.days)) : T('mon3.' + st.month) + ' ' + st.year;
```

na:

```js
    var term = st.start ? span(st.start, tripDate(st.start, st.days)) : T('mon3.' + st.month) + ' ' + st.year;
```

W `site2/src/app.js` zamień:

```js
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: h.name, span: fmtSpan(h.from, h.to) })); });
```

na:

```js
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: h.name, span: span(h.from, h.to) })); });
```

W `site2/src/app.js` zamień:

```js
  // a text with the no-break spaces of Polish typography (tieShort) and of the names (tieVietnamese, tieNames), all in page.js
  function tied(text) { return lang === 'pl' ? tieNames(tieVietnamese(tieShort(text)), TIED_NAMES) : text; }
```

na:

```js
  // a text with the no-break spaces of the language's typography (tieShort, tieEnglish) and of the names (tieVietnamese,
  // tieNames), all in page.js
  function tied(text) { return tieNames(tieVietnamese(lang === 'pl' ? tieShort(text) : tieEnglish(text)), TIED_NAMES); }
```

W `site2/src/app.js` zamień:

```js
  function tieShortWords(root) {
    if (lang !== 'pl') return;
```

na:

```js
  function tieShortWords(root) {
```

W `site2/src/app.js` zamień:

```js
      var m = PHOTO_META[ph], lic = licenceUrl(m.license);
```

na:

```js
      var m = PHOTO_META[ph], lic = licenceUrl(m.license, lang);
```

W `site2/src/page.js` zamień:

```js
  return '#' + parts.join('&');
```

na:

```js
  return '#' + parts.join('&');
}

/* ---------- the language (stage 5) ---------- */
/* The page's language from the part of the address after #: Polish when the link says lang=pl, else English, the default
   (decision of 15.10.2026). The language is no setting of the trip: lang with another value, or without one, is English,
   with no warning of a wrong link, and parseLink leaves it out. */
function langOf(hash) { return /(?:^#?|&)lang=pl(?:&|$)/.test(String(hash || '')) ? 'pl' : 'en'; }
/* The address of the settings in a language: Polish adds lang=pl at the end, so a link copied, sent or printed opens the
   same trip in Polish; English adds nothing, so every link from before stage 5 opens in English. */
function langHash(s, lang) { return linkHash(s) + (lang === 'pl' ? '&lang=pl' : ''); }
/* The texts of the places in a language. content: CONTENT, with the Polish texts; overlay: for English CONTENT_EN, the same
   fields where a place has a text (tests/content.test.js checks it), lists in the same order. Returns a copy of content
   with the overlay's texts over the Polish ones and the data (p, pace, cost…) as it was; without an overlay, content. */
function localContent(content, overlay) {
  function over(base, o) {
    if (o === undefined) return base;
    if (typeof base === 'string') return o;
    if (Array.isArray(base)) return base.map(function (b, i) { return over(b, o[i]); });
    if (base && typeof base === 'object') { var out = {}; Object.keys(base).forEach(function (k) { out[k] = over(base[k], o[k]); }); return out; }
    return base;
  }
  if (!overlay) return content;
  var out = {};
  Object.keys(content).forEach(function (id) { out[id] = over(content[id], overlay[id]); });
  return out;
```

W `site2/src/page.js` zamień:

```js
/* Days for a sentence: '6–12.02.2027', '30.04–3.05.2027', '28.12.2030–2.01.2031'; one day: '1.01.2027'. */
function fmtSpan(a, b) {
  var p = a.split('-'), q = b.split('-');
```

na:

```js
/* Days for a sentence: '6–12.02.2027', '30.04–3.05.2027', '28.12.2030–2.01.2031'; one day: '1.01.2027'. In English (stage 5),
   with mon the 12 short names of the months (UI.en mon3.1…12): '6–12 Feb 2027', '30 Apr – 3 May 2027',
   '28 Dec 2030 – 2 Jan 2031', '1 Jan 2027'. */
function fmtSpan(a, b, mon) {
  var p = a.split('-'), q = b.split('-');
  if (mon) {
    var md = function (x) { return +x[2] + ' ' + mon[+x[1] - 1]; };
    if (a === b) return md(p) + ' ' + p[0];
    if (p[0] !== q[0]) return md(p) + ' ' + p[0] + ' – ' + md(q) + ' ' + q[0];
    if (p[1] !== q[1]) return md(p) + ' – ' + md(q) + ' ' + q[0];
    return +p[2] + '–' + md(q) + ' ' + q[0];
  }
```

W `site2/src/page.js` zamień:

```js
/* The text of a photo's licence on creativecommons.org, in Polish: 'CC BY-SA 4.0' → …/licenses/by-sa/4.0/deed.pl, a
   licence of a country ('CC BY-SA 3.0 de') with its country, CC0 → the CC0 deed; null for the public domain, which has no
   licence text (the photo's page on Commons says why). */
function licenceUrl(license) {
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/deed.pl';
```

na:

```js
/* The text of a photo's licence on creativecommons.org, in the page's language (lang 'en', else Polish): 'CC BY-SA 4.0' →
   …/licenses/by-sa/4.0/deed.pl, a licence of a country ('CC BY-SA 3.0 de') with its country, CC0 → the CC0 deed; null for
   the public domain, which has no licence text (the photo's page on Commons says why). */
function licenceUrl(license, lang) {
  var deed = 'deed.' + (lang === 'en' ? 'en' : 'pl');
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/' + deed;
```

W `site2/src/page.js` zamień:

```js
  return m ? 'https://creativecommons.org/licenses/' + m[1].toLowerCase() + '/' + m[2] + '/' + (m[3] ? m[3] + '/' : '') + 'deed.pl' : null;
```

na:

```js
  return m ? 'https://creativecommons.org/licenses/' + m[1].toLowerCase() + '/' + m[2] + '/' + (m[3] ? m[3] + '/' : '') + deed : null;
```

W `site2/src/page.js` zamień:

```js
   never under 0,1, else dong rounded to 10 000 ("260 000"), never under 10 000. rate: dong to a euro (EUR_VND). */
function vndRange(eur, rate, sum) {
```

na:

```js
   never under 0,1, else dong rounded to 10 000 ("260 000"), never under 10 000. rate: dong to a euro (EUR_VND). lang 'en'
   (stage 5): a decimal point and thousands with commas ("0.8–1.5", "260,000"). */
function vndRange(eur, rate, sum, lang) {
```

W `site2/src/page.js` zamień:

```js
  if (Math.round(v[1] / 1e5) >= 10) return v.map(function (x) { return (Math.max(1, Math.round(x / 1e5)) / 10).toFixed(1).replace('.', ','); }).concat([true]);
  return v.map(function (x) { return money(Math.max(1, Math.round(x / 1e4)) * 1e4); }).concat([false]);
```

na:

```js
  if (Math.round(v[1] / 1e5) >= 10) {
    return v.map(function (x) { var t = (Math.max(1, Math.round(x / 1e5)) / 10).toFixed(1); return lang === 'en' ? t : t.replace('.', ','); }).concat([true]);
  }
  return v.map(function (x) { return money(Math.max(1, Math.round(x / 1e4)) * 1e4, lang); }).concat([false]);
```

W `site2/src/page.js` zamień:

```js
   plan B2, 15.10.2026); one number when both ends come out alike; "0 VND" only for what costs nothing. rate and sum: as for
   vndRange. */
function vndText(eur, rate, sum) {
```

na:

```js
   plan B2, 15.10.2026); one number when both ends come out alike; "0 VND" only for what costs nothing. rate, sum and lang:
   as for vndRange. */
function vndText(eur, rate, sum, lang) {
```

W `site2/src/page.js` zamień:

```js
  var r = vndRange(eur, rate, sum), m = r[2];
```

na:

```js
  var r = vndRange(eur, rate, sum, lang), m = r[2];
```

W `site2/src/page.js` zamień:

```js
/* A number with its thousands apart (no-break spaces), as Polish writes money: 260000 → '260 000'. */
function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); }
```

na:

```js
/* A number with its thousands apart, as the language writes money: in Polish with no-break spaces, 260000 → '260 000'; in
   English (lang 'en') with commas, '260,000'. */
function money(n, lang) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'en' ? ',' : '\u00a0'); }
```

W `site2/src/page.js` zamień:

```js
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0').replace(/mln VND/g, 'mln\u00a0VND');
}
```

na:

```js
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0').replace(/mln VND/g, 'mln\u00a0VND');
}
/* English typography (stage 5): as in Polish (tieShort), a number keeps its unit on the line (5 km, 4½ h, 25 °C, 2.2M VND,
   260,000 VND, 125 cc), ≈ keeps its number and a range of numbers (1–3, 11:00–14:30) keeps together; English has no
   one-letter words to tie. */
function tieEnglish(text) {
  return text.replace(/≈ /g, '≈\u00a0').replace(/([\d½])–(?=[\d½])/g, '$1–\u2060').replace(/([\d½]M?) (h|min|km|mm|m|°C|cc|VND)(?![\p{L}])/gu, '$1\u00a0$2');
}
/* "w marcu", "we wrześniu" (we before w and a consonant); in English (lang 'en') "in March". noun: the month as the UI key
   monl.<n> of the language gives it. */
function inMonthText(noun, lang) { return lang === 'en' ? 'in ' + noun : (/^w[^aeiouyąęó]/i.test(noun) ? 'we ' : 'w ') + noun; }
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-5.sh" MIESIAC
```

Oczekiwane: `ALL PASS`, grep nic nie wypisuje, `sondy (MIESIAC): 0 z 19 nie przeszło` (strona po polsku bez zmian).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/app.js site2/src/page.js tests/page.test.js
git commit -F - <<'EOF'
Zapis zależny od języka (etap 5, ustalenie 9) w czystych funkcjach page.js: język z linku (langOf: polski tylko z lang=pl, inaczej angielski, bez ostrzeżenia o błędnym linku) i adres w języku (langHash: &lang=pl na końcu), daty w zdaniach po angielsku („6–12 Feb 2027”), kwoty z kropką dziesiętną i przecinkiem tysięcy („0.8–1.5”, „260,000”), angielskie twarde spacje (tieEnglish: jednostki, ≈ i zakresy, bez jednoliterowych wyrazów), „in March”, tekst licencji zdjęcia po angielsku i nakładka tekstów miejsc (localContent); app.js podaje funkcjom język strony, który do zadania 7 jest polski, więc strona się nie zmienia; testy strony obu języków

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Teksty miejsc po angielsku

Ustalenia 8 i 13–17: angielskie teksty 21 miejsc w `site2/src/en/content/<id>.js`, każdy plik z tymi samymi polami tekstowymi co polski (`name`, `short`, `sub`, `poi.name`, `t`, `d` i `rain` dni z wersjami, `again`, `gem`, `skip`, `instead`, `t` wydarzeń), listy w tej samej kolejności, bez danych. Teksty są zatwierdzone w arkuszu PL | EN; strona pokaże je od zadania 7. Testy:
- **kompletność:** każde miejsce ma teksty angielskie, tekst w każdym polu, w którym polski plik ma tekst, i nic poza tym (ustalenie 13);
- **te same fakty:** w każdej parze tekstów te same liczby i te same wietnamskie nazwy, po sprowadzeniu zapisu: polskie daty (30.04), nazwy miesięcy obu języków, rzymskie miesiące i wieki, dekada wieku („lat 70. XVIII wieku” jako 1770, po angielsku „the 1770s”), tysiące i przecinek dziesiętny; lista wyjątków jest pusta (ustalenie 14);
- **styl angielski:** bez polskich liter i polskiego cudzysłowu, bez prostych cudzysłowów i apostrofu, bez amerykańskiej pisowni z krótkiej listy, bez am/pm, ze spacją przed °C, z półpauzą w zakresach i bez dwóch liczb obok siebie (ustalenie 15);
- **dla każdego paszportu w obu językach:** po polsku test łapie też „euro”, „dolar” i „złotówki”, po angielsku „dollar”, „euro”, „zloty”, „Poland” i „Polish” (ustalenie 16);
- **długość:** angielski opis dnia najwyżej 80 słów, bo najdłuższy w suchej próbie ma 79 (ustalenie 17);
- **bezpieczeństwo po angielsku:** trudny dzień mówi, kto prowadzi (guide albo operator), plan na Sơn Trà każe sprawdzić komunikat zarządu, 7 km w Paradise Cave w porze deszczowej zawraca po ok. 4 km.

**Pliki:**
- Utwórz: `site2/src/en/content/<id>.js` (21 plików)
- Zmień: `site2/src/content.js` (`CONTENT_EN`)
- Testy: `tests/content.test.js`, `tests/run.sh`

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
    need(!/(^|[^\p{L}])(zł|PLN|EUR|USD)(?!\p{L})|[€$]|NBP/u.test(x[1]), x[0] + ': money in złoty, euro or dollars, or the NBP rate: the page says dong');
```

na:

```js
    // also the words for them (the final review of plan B2): euro, dolar, złotówki
    need(!/(^|[^\p{L}])(zł|PLN|EUR|USD)(?!\p{L})|[€$]|NBP|(^|[^\p{L}])(euro(?!p)|dolar|złotówk)/iu.test(x[1]), x[0] + ': money in złoty, euro or dollars, or the NBP rate: the page says dong');
```

W `tests/content.test.js` zamień:

```js
      x[0] + ': advice for the citizens of one country (Polish offices, Poland as a yardstick)');
  });
});
```

na:

```js
      x[0] + ': advice for the citizens of one country (Polish offices, Poland as a yardstick)');
  });
});

/* ---------- two languages (stage 5, decisions of 15.10.2026) ---------- */
// The fields that hold a text in a place's content (content.js): an overlay in another language has these, and only these.
var TEXT_KEYS = ['name', 'short', 'sub', 't', 'd', 'rain', 'gem', 'skip', 'instead'];
// every text of a place as [path, text]: the strings under TEXT_KEYS (poi.name too); the data (maps, region, pace, cost…) not
function placeTexts(v, path, out) {
  if (Array.isArray(v)) v.forEach(function (x, i) { placeTexts(x, path + '.' + i, out); });
  else if (v && typeof v === 'object') {
    Object.keys(v).forEach(function (k) {
      if (typeof v[k] === 'string') { if (TEXT_KEYS.indexOf(k) > -1) out.push([path + '.' + k, v[k]]); }
      else placeTexts(v[k], path + '.' + k, out);
    });
  }
  return out;
}
// what is wrong with the overlay over of a place base: a text of the base missing or empty, or a field where the base has
// no text (data, a field of its own); lists hold their texts at the same places as the base's
function overlayProblems(base, over, path) {
  var out = [], want = {}, got = {};
  placeTexts(base, path, []).forEach(function (x) { want[x[0]] = true; });
  (function walk(v, p) {
    if (typeof v === 'string') got[p] = v;
    else if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, p + '.' + i); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], p + '.' + k); });
    else out.push(p + ': ' + JSON.stringify(v) + ' is no text');
  })(over, path);
  Object.keys(want).forEach(function (p) { if (!(p in got)) out.push(p + ': no text'); else if (!isText(got[p])) out.push(p + ': empty, or spaces at an end'); });
  Object.keys(got).forEach(function (p) { if (!want[p]) out.push(p + ': no text in the Polish file at this place'); });
  return out;
}
// The facts of a text that its translation keeps (finding 14): the numbers, as both languages would write them, and the
// Vietnamese names. Numbers: a time as written (6:00); thousands without their space or comma; the decimal comma of
// Polish as a point; a Polish date (30.04) as its day and month; a decade of a Polish century („lat 70. XVIII wieku”) as
// the year it starts (1770, as English writes „the 1770s”); the months of both languages and Roman numerals (months,
// centuries) as their numbers; English ordinals (19th, 27th) as numbers.
var MONTHS_PL = [['styczeń', 'stycznia', 'styczniu'], ['luty', 'lutego', 'lutym'], ['marzec', 'marca', 'marcu'], ['kwiecień', 'kwietnia', 'kwietniu'],
  ['maj', 'maja', 'maju'], ['czerwiec', 'czerwca', 'czerwcu'], ['lipiec', 'lipca', 'lipcu'], ['sierpień', 'sierpnia', 'sierpniu'],
  ['wrzesień', 'września', 'wrześniu'], ['październik', 'października', 'październiku'], ['listopad', 'listopada', 'listopadzie'], ['grudzień', 'grudnia', 'grudniu']];
var MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function roman(r) {
  var v = { I: 1, V: 5, X: 10, L: 50 }, n = 0;
  for (var i = 0; i < r.length; i++) n += v[r[i]] < (v[r[i + 1]] || 0) ? -v[r[i]] : v[r[i]];
  return n;
}
function factNumbers(t, lang) {
  var s = ' ' + String(t).replace(/\u00a0|\u2060/g, function (c) { return c === '\u2060' ? '' : ' '; }) + ' ', out = [];
  s = s.replace(/\d{1,2}:\d{2}/g, function (m) { out.push(m); return ' '; });
  if (lang === 'pl') {
    s = s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1');
    s = s.replace(/(\d{2})\. ([IVXL]+) (wieku|w\.)/g, function (m, d, r) { return ' ' + ((roman(r) - 1) * 100 + Number(d)) + ' '; });
    s = s.replace(/(\d{1,2})\.(\d{2})(?!\d)/g, ' $1 $2 ');
    s = s.replace(/(\d),(\d)/g, '$1.$2');
    MONTHS_PL.forEach(function (forms, i) { s = s.replace(new RegExp('(^|[^\\p{L}])(' + forms.join('|') + ')(?![\\p{L}])', 'gu'), '$1 ' + (i + 1) + ' '); });
    s = s.replace(/(^|[^\p{L}])([IVXL]+)(?![\p{L}])/gu, function (m, a, r) { return a + ' ' + roman(r) + ' '; });
  } else {
    s = s.replace(/(\d),(?=\d{3}(?!\d))/g, '$1');
    MONTHS_EN.forEach(function (name, i) { s = s.replace(new RegExp('(^|[^\\p{L}])' + name + '(?![\\p{L}])', 'gu'), '$1 ' + (i + 1) + ' '); });
    s = s.replace(/(\d)(st|nd|rd|th)(?![\p{L}])/gu, '$1');
  }
  (s.match(/\d+(?:\.\d+)?½?|½/g) || []).forEach(function (m) { out.push(/^\d+(\.\d+)?$/.test(m) ? String(Number(m)) : m.replace(/^0+(?=\d)/, '')); });
  return out.sort();
}
function vietNames(t) {
  var seen = {};
  (String(t).match(/[\p{L}\p{M}]+/gu) || []).forEach(function (w) { if (VIET_LETTER.test(w)) seen[w] = true; });
  return Object.keys(seen).sort();
}
// Pairs of texts whose numbers or names differ for a reason, by the path of the Polish text: { path: reason }.
var SAME_FACTS_EXCEPTIONS = {};
function factProblems(path, pl, en) {
  if (SAME_FACTS_EXCEPTIONS[path]) return [];
  var out = [], a = factNumbers(pl, 'pl'), b = factNumbers(en, 'en'), x = vietNames(pl), y = vietNames(en);
  if (a.join(' ') !== b.join(' ')) out.push(path + ': numbers ' + a.join(' ') + ' | ' + b.join(' '));
  if (x.join(' ') !== y.join(' ')) out.push(path + ': Vietnamese names ' + x.join(' ') + ' | ' + y.join(' '));
  return out;
}
// The style of the English texts (finding 15): British English to one reader (you), Vietnamese names with their marks,
// typographic quotes and apostrophe (“ ” ’), no Polish letter or quote, no American spelling of a short list.
var AMERICAN = /(^|[^\p{L}])(color|colors|colored|colorful|center|centers|centered|traveler|travelers|traveling|traveled|theater|theaters|favorite|favorites|gray|meter|meters|kilometer|kilometers|liter|liters|program|programs|license|licenses|defense|harbor|neighbor|neighbors|honor|catalog|aluminum|mold|plow)(?![\p{L}])/iu;
function englishProblems(path, t) {
  var out = [];
  if (/[ąćęłńśźżĄĆĘŁŃŚŹŻ]/.test(t)) out.push(path + ': a Polish letter');
  if (/[„]/.test(t)) out.push(path + ': a Polish quote „ (use “ ”)');
  if (/["']/.test(t)) out.push(path + ': straight quotes or apostrophe (use “ ” ’)');
  var m = AMERICAN.exec(t);
  if (m) out.push(path + ': American spelling „' + m[2] + '” (British English: colour, centre, traveller, metre, programme, licence…)');
  if (/\d\s*(am|pm)\b/i.test(t)) out.push(path + ': am/pm, use 24-hour time');
  if (/\d°/.test(t)) out.push(path + ': no space before °C');
  if (/\d-\d/.test(t)) out.push(path + ': a hyphen in a range, use an en dash');
  if (/\d(?:[\d.:,]*\d)?\s(?!\d{3}(?!\d))[\d½]/.test(t)) out.push(path + ': two numbers side by side: put a word between them');
  if (/(^|[^\p{L}])(PLN|EUR|USD)(?!\p{L})|[€$£]|(^|[^\p{L}])(euros?|dollars?|zloty)(?![\p{L}])/iu.test(t) || /Poland|Polish/.test(t)) out.push(path + ': money other than dong, or Poland: the page is for every passport');
  return out;
}

/* The English texts of the places (site2/src/en/content/<id>.js, finding 8): every place has them, with a text wherever
   its Polish file has one and nothing else (finding 13), the same numbers and Vietnamese names in each pair of texts
   (finding 14), in British English for every passport (findings 15 and 16), and a day's text of at most DAY_WORDS_EN
   words (finding 17: the longest English day text of the dry run, so that the texts do not grow). */
var DAY_WORDS_EN = 80;
contentCheck('english places', function (need) {
  Object.keys(CONTENT).forEach(function (id) {
    var en = CONTENT_EN[id], w = 'CONTENT_EN.' + id, pl = {};
    need(en, id + ': no English texts (site2/src/en/content/' + id + '.js)');
    if (!en) return;
    overlayProblems(CONTENT[id], en, w).forEach(function (p) { need(false, p); });
    placeTexts(CONTENT[id], w, []).forEach(function (x) { pl[x[0]] = x[1]; });
    placeTexts(en, w, []).forEach(function (x) {
      englishProblems(x[0], x[1]).forEach(function (p) { need(false, p); });
      if (pl[x[0]] != null) factProblems(x[0], pl[x[0]], x[1]).forEach(function (p) { need(false, p); });
      if (/\.d$/.test(x[0])) need(wordCount(x[1]) <= DAY_WORDS_EN, x[0] + ': ' + wordCount(x[1]) + ' words, at most ' + DAY_WORDS_EN);
    });
  });
  Object.keys(CONTENT_EN).forEach(function (id) { need(CONTENT[id], 'English texts for an unknown place: ' + id); });
  // the safety sentences of the places in English too: a hard day says who leads; a plan on Sơn Trà says to check the
  // management's notice; the 7 km in Paradise Cave turn back after about 4 km in the rainy season
  Object.keys(CONTENT_EN).forEach(function (id) {
    (CONTENT_EN[id].days || []).forEach(function (d, i) {
      if (d.hard) need(/guide|operator/i.test(d.hard.d) && !/without (a |the )?(guide|operator)/i.test(d.hard.d), 'CONTENT_EN.' + id + '.days.' + i + '.hard: say who leads (a guide or an operator)');
    });
  });
  CONTENT_EN.danang.days.forEach(function (d, i) {
    [['', d], ['.solo', d.solo], ['.easy', d.easy], ['.hard', d.hard]].forEach(function (v) {
      if (v[1] && /Sơn Trà/.test(v[1].d)) need(/check[^.]*notice/i.test(v[1].d), 'CONTENT_EN.danang.days.' + i + v[0] + ': a plan on Sơn Trà says to check the management’s notice');
    });
  });
  var cave = CONTENT.phongnha.days.map(function (d) { return d.t; }).indexOf('7 km w głąb Paradise Cave');
  need(cave > -1 && /turns back after about 4 km/.test(CONTENT_EN.phongnha.days[cave].d), 'CONTENT_EN.phongnha: the day of 7 km in Paradise Cave says that in the rainy season the trek turns back after about 4 km');
});
```

W `tests/run.sh` zamień:

```bash
# Strict on purpose: every source and test file is listed here (the texts of the places as site2/src/content/*.js),
```

na:

```bash
# Strict on purpose: every source and test file is listed here (the texts of the places as site2/src/content/*.js, their
# English texts as site2/src/en/content/*.js),
```

W `tests/run.sh` zamień:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES site2/src/photos.js site2/src/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/page.js"
```

na:

```bash
EN_CONTENT_FILES=$(ls site2/src/en/content/*.js)
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/page.js"
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
bash -c 'J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc; P=site2/src; $J $P/places.js $P/seasons.js $P/climate.js $P/travel.js $P/engine.js $P/holidays.js $P/content.js $P/content/*.js $P/photos.js $P/ui.js $P/panels.js $P/costs.js $P/before.js $P/page.js tests/assert.js tests/content.test.js' 2>&1 | grep -E "english places|Exception"
```

Oczekiwane: `tests/run.sh` staje na liście plików, bo plików angielskich jeszcze nie ma (`ls: site2/src/en/content/*.js: No such file or directory`), a sam test treści wypisuje `english places: the check stopped: ReferenceError: Can't find variable: CONTENT_EN` i `Exception: Error: 1 problem(s) in english places, listed above`.

- [ ] **Krok 3: Teksty angielskie**

W `site2/src/content.js` zamień:

```js
var CONTENT = {};
```

na:

```js
var CONTENT = {};
// the English texts of the places (stage 5): site2/src/en/content/<id>.js, CONTENT_EN.<id> with the same text fields
// (localContent in page.js lays them over the Polish ones)
var CONTENT_EN = {};
```

Utwórz `site2/src/en/content/babe.js`:

```js
/* Ba Bể: the English texts of the place (stage 5), the same fields and order as site2/src/content/babe.js where it has a
   text. */
CONTENT_EN.babe = {
  name: 'Ba Bể', short: 'Ba Bể',
  sub: 'A mountain lake ringed by Tày villages',
  days: [
    { t: 'Arrival at the lake', d: 'Check in at a homestay in a Tày stilt house in Pác Ngòi, and at dusk take a walk along the lakeshore.',
      solo: { t: 'The lake in one afternoon', d: 'Arrive by early afternoon at the latest, check in at a homestay in a Tày stilt house in Pác Ngòi and, while it is still light, take a boat to Puông Cave and Bà Góa island. Dusk on the lakeshore, then breakfast in the morning and on your way.' } },
    { t: 'On the water', d: 'By boat to Puông Cave, the Đầu Đẳng waterfall and Bà Góa island. In the afternoon, by bike through the villages.',
      easy: { t: 'On the water', d: 'By boat to Puông Cave, the Đầu Đẳng waterfall and Bà Góa island. In the afternoon, a rest with your hosts and an unhurried stroll round the village.' } },
    { t: 'Villages high above the lake', d: 'A half-day hike with a local guide to Tày and Dao villages on the slopes above the lake. Ask your hosts about an evening of Then singing.',
      easy: { t: 'A quiet morning by the lake', d: 'A short boat ride to a neighbouring Tày village and a cooking class with your hosts. Ask about an evening of Then singing.' } }
  ],
  gem: 'A night in a Tày stilt house on the lakeshore.'
};
```

Utwórz `site2/src/en/content/caobang.js`:

```js
/* Cao Bằng: the English texts of the place (stage 5), the same fields and order as site2/src/content/caobang.js where it has
   a text. */
CONTENT_EN.caobang = {
  name: 'Cao Bằng', short: 'Cao Bằng',
  sub: 'The Bản Giốc waterfall and the karst borderlands',
  days: [
    { t: 'An evening in Cao Bằng', d: 'A night in the city of Cao Bằng and, for dinner, duck roasted with seven spices (vịt quay 7 vị), the region’s speciality. Keep your passport on you, as the loop runs through the border zone. At Bản Giốc, Ngườm Ngao, Khuổi Ky and Pác Bó you need no permit, but elsewhere near the border foreigners need a police permit: do not turn off onto side roads towards the border.',
      self: { t: 'An evening in Cao Bằng', d: 'A night in the city of Cao Bằng and, for dinner, duck roasted with seven spices (vịt quay 7 vị), the region’s speciality. Pick up your hired motorbike the same evening. Keep your passport on you, as the loop runs through the border zone. At Bản Giốc, Ngườm Ngao, Khuổi Ky and Pác Bó you need no permit, but elsewhere near the border foreigners need a police permit: do not turn off onto side roads towards the border.' } },
    { t: 'Angel’s Eye and Pác Bó', d: 'Núi Mắt Thần – a mountain with a hole right through its summit, rising above a grassy valley – and the clear, green stream at Pác Bó by the border.',
      self: { t: 'Angel’s Eye and Pác Bó by motorbike', d: 'By motorbike to Núi Mắt Thần – a mountain with a hole right through its summit, rising above a grassy valley – and to the clear, green stream at Pác Bó by the border. Be back before dark: the mountain roads are unlit.' } },
    { t: 'Lakes, a pass, a waterfall and a cave', d: 'In the morning the chain of Thang Hen karst lakes and the hairpin bends of the Mã Phục pass, at midday the Bản Giốc waterfall, and in the afternoon Ngườm Ngao Cave. You reach the waterfall at midday because in the dry season, from late November to early May, power stations upstream can hold back the water in the morning, and the flow peaks at about 11:00–14:30. A night in Khuổi Ky, a Tày village of stone houses.',
      self: { t: 'Lakes, a pass, a waterfall and a cave by motorbike', d: 'In the morning, the Thang Hen karst lakes and the Mã Phục pass hairpins: ride down slowly, as the bends can be gravelly and hide oncoming lorries. At midday the Bản Giốc waterfall, because in the dry season power stations can hold back its water in the morning (the flow peaks at about 11:00–14:30), and in the afternoon Ngườm Ngao Cave. A night in Khuổi Ky; next morning, about 85 km to Cao Bằng city to return the motorbike.' } }
  ],
  gem: 'The stone houses of Khuổi Ky and the Thang Hen lakes.',
  poi: { name: 'Bản Giốc' },
  events: [
    { t: 'The best time for Bản Giốc: in late September and early October the waterfall spreads wide and the rainy season is coming to an end.' }
  ]
};
```

Utwórz `site2/src/en/content/catba.js`:

```js
/* Cát Bà & Lan Hạ Bay: the English texts of the place (stage 5), the same fields and order as site2/src/content/catba.js
   where it has a text. */
CONTENT_EN.catba = {
  name: 'Cát Bà & Lan Hạ Bay', short: 'Cát Bà',
  sub: 'A jungle-covered island on the quiet side of Hạ Long',
  days: [
    { t: 'To the island', d: 'Stay in Cát Bà town. In the evening, a walk along the waterfront, where the fishing boats moor, and dinner at one of the small eateries.' },
    { t: 'Việt Hải and the national park', d: 'A hike up Ngự Lâm peak in Cát Bà National Park, then on by bike to Việt Hải, a car-free village ringed by cliffs.',
      easy: { t: 'Việt Hải without the climb', d: 'By boat from Cát Bà town to the Việt Hải pier, then about 5 km along a flat road to the village – by electric buggy or bike – and lunch among the crags.' } },
    { t: 'After the cruise, a quiet afternoon', d: 'The boat is back on Cát Bà at about 12:00. A long seafood lunch by the harbour, then the small Cát Cò beaches and a massage.' },
    { t: 'A night on Lan Hạ Bay', d: 'A two-day cruise with one night on board: the boat sails from Cát Bà through Lan Hạ Bay as far as the quiet southern edge of Hạ Long Bay. You will go in among the karsts in a bamboo boat rowed by locals, and watch the sunset from the deck. Some cruises also call at a floating village.',
      easy: { t: 'A night on Lan Hạ Bay', d: 'A two-day cruise with one night on board, on Lan Hạ Bay and the quiet southern edge of Hạ Long Bay. Choose a larger, steadier boat where every cabin has its own bathroom. You will go in among the karsts in a bamboo boat rowed by locals, and watch the sunset from the deck.' } }
  ],
  gem: 'Việt Hải, a car-free village inside the national park. Some cruises from Cát Bà call there, so if you are staying three nights, choose one of them.',
  skip: 'Hạ Long cruises from Tuần Châu, and the crowded stops at Sửng Sốt Cave and on Ti Tốp Island.',
  instead: 'a cruise that starts on Cát Bà.'
};
```

Utwórz `site2/src/en/content/cattien.js`:

```js
/* Cát Tiên National Park: the English texts of the place (stage 5), the same fields and order as site2/src/content/cattien.js
   where it has a text. */
CONTENT_EN.cattien = {
  name: 'Cát Tiên National Park', short: 'Cát Tiên',
  sub: 'Lowland jungle, gibbons and a night safari',
  days: [
    { t: 'Into the jungle', d: 'Cross the Đồng Nai river on a small ferry to the park headquarters and spend the night inside the park. After dark, a night drive in search of deer and civets.',
      solo: { t: 'The jungle by night and at dawn', d: 'Arrive by mid-afternoon at the latest and spend the night in the park; book the dawn gibbon walk with the park before you arrive, as places are limited. After dark, a night drive in search of deer and civets. Before dawn the next day, go out with a park ranger to hear the gibbons calling, then breakfast and on your way.' } },
    { t: 'Gibbons and Crocodile Lake', d: 'Before dawn, go out with a park ranger to hear the gibbons calling, then follow a forest trail to Bàu Sấu, or Crocodile Lake. Book the gibbon walk with the park before you arrive, as places are limited, and the Bàu Sấu hike and its permit at the park headquarters no later than the day before.',
      easy: { t: 'Cát Tiên at an easy pace', d: 'In the morning, a walk with a park guide to the giant Tung and Gõ trees, about 2 hours along a forest path. In the afternoon, the nature museum and the wildlife rescue centre right next to the park headquarters.' },
      hard: { t: 'A night at Crocodile Lake', d: 'A night at the rangers’ station by Bàu Sấu, with a park guide. Leave the headquarters by 14:00: 9 km by car and 5 km on foot through the forest. In the evening, sunset over the lake and dinner with the rangers; the rooms are simple, with no phone signal. The park requires you to be fit. Next morning, 5 km back to the car and on your way around noon: do not book an early flight that day.' } }
  ],
  gem: 'One of the last large lowland forests in the south, four hours from Hồ Chí Minh City.',
  events: [
    { t: 'Rainy season in the park: take leech socks for the forest trails, as the park considers them necessary at this time of year.' }
  ]
};
```

Utwórz `site2/src/en/content/cucphuong.js`:

```js
/* Cúc Phương: the English texts of the place (stage 5), the same fields and order as site2/src/content/cucphuong.js where
   it has a text. Facts and sources: research/cucphuong-2026-10.md. */
CONTENT_EN.cucphuong = {
  name: 'Cúc Phương National Park', short: 'Cúc Phương',
  sub: 'Rescued primates, thousand-year-old trees and the forest at night',
  days: [
    { t: 'Rescued primates and the forest at night', d: 'Check into one of the park’s rooms, at the gate or by Mạc lake. In the afternoon, the rescue centres, 500 m from the ticket office and usually open until 17:00: Delacour’s and Cát Bà langurs, gibbons, lorises, turtles and pangolins. In the evening, a night ride by electric buggy along the edge of the forest: fireflies, deer and lorises; gather at 18:30 for a 19:00 start, and guests staying in the park get priority.',
      rain: 'the park museum and the visitor centre are under cover, and an umbrella comes in handy at the rescue centres; the park decides whether the night ride goes ahead in a downpour.',
      solo: { t: 'The forest at night and rescued primates in the morning', d: 'Arrive by late afternoon at the latest and check into one of the park’s rooms at the gate. At 18:30, gather for the night ride by electric buggy: fireflies, deer and lorises. In the morning, from 8:00, the rescue centres, 500 m from the ticket office: Delacour’s langurs, gibbons and turtles; move on at around 10:30.' } },
    { t: 'Deep into the forest, to the old trees', d: 'In the morning, 20 km by car to Bống, deep in the forest, where guests staying in the park are allowed in from 7:00. From there, a loop through primary forest: Động Sơn Cung Cave and the thousand-year-old Chò tree, 7 km and 2–3 hours, without a guide, with a torch for the cave. After lunch, the 700-year-old Chò chỉ tree and Động Người Xưa Cave, with traces of people from 7,500 years ago. Leave the forest before dark.',
      rain: 'the flat path to the Sấu trees and the short one to the 700-year-old Chò chỉ, as wet limestone is slippery, and in the afternoon the park museum by the gate.',
      easy: { t: 'Short paths to the old trees', d: 'By car to Bống and a short path to the 700-year-old Chò chỉ, 2 km there and back, half an hour to an hour. On the way back, Động Người Xưa Cave (300 m and about 200 steps) and a flat path among old Sấu and Đăng trees, 2 km, about an hour.' },
      hard: { t: 'Up Mây Bạc with a park guide', d: 'Mây Bạc, the park’s highest peak (648 m): from Bống, a steep path through primary forest and over limestone slopes, 7 km there and back, 4–5 hours. A park guide is compulsory, and the route is only for fit adults. Leave the forest before dark: after 19:00 you may enter the deep forest only on a guided night tour.' } }
  ],
  gem: 'Vietnam’s oldest national park, with the thousand-year-old Chò tree and a centre that rescues the country’s rarest primates.',
  skip: 'A day trip from Hà Nội: about 5.5 hours in a car and the forest at the hottest time of day.',
  instead: 'a night in the park: the night ride in the evening, and the forest from 7:00 in the morning.',
  events: [
    { t: 'Butterfly and firefly season: butterflies usually from the second week of April to the end of May, with the most on sunny days after rain, and fireflies from late April to early June. The timing shifts from year to year, and this is the park’s busiest time, so book your stay early.' },
    { t: 'Rainy season: the limestone slopes are slippery, and the forest has mosquitoes and leeches, so take leech socks and repellent. Before a storm or after downpours, the park may suspend overnight stays deep in the forest, so check the park’s notice the day before.' },
    { t: 'Cool season: from December to February the nights in the forest are chilly and the days are often grey. Take a warm layer for the evening and the night ride.' }
  ]
};
```

Utwórz `site2/src/en/content/dalat.js`:

```js
/* Highlands around Đà Lạt: the English texts of the place (stage 5), the same fields and order as site2/src/content/dalat.js
   where it has a text. Facts and sources of the Tà Năng–Phan Dũng trail: research/tanang-2026-10.md. */
CONTENT_EN.dalat = {
  name: 'Highlands around Đà Lạt', short: 'Đà Lạt',
  sub: 'Pine-covered hills, quiet guesthouses and cool nights',
  days: [
    { t: 'Dusk over the Tà Nung valley', d: 'Skip the centre and head west to the ridges above the Tà Nung valley to watch the pine-covered hills and coffee plantations at dusk. Stay at a guesthouse out of town, where the nights are quiet and cool, and starry in the dry season.' },
    { t: 'Bidoup–Núi Bà cloud forest', d: 'A guided hike towards Hòn Giao among old pines, mossy forest and wild orchids. The trail is about 50 km away, so this takes the whole day. In the dry season, from November to April, the paths are firm underfoot; in the rainy season they can be slippery. Book your guide at the park’s tourist information centre.',
      easy: { t: 'Pine forest and a lakeside monastery', d: 'The cable car from Robin Hill glides over the pine forest to Trúc Lâm, a quiet Zen monastery overlooking Tuyền Lâm lake. A stroll through the monastery gardens, then a leisurely cruise on the lake or a long lunch on the shore.' },
      hard: { t: 'The Tà Năng–Phan Dũng trail: over the hills to a camp', d: 'Day one of a two-day trek on the Tà Năng–Phan Dũng trail. You leave before dawn, and from 9:00 walk with a guide through pine forests and rice fields up to grassy hills, about 12–15 km; porters carry the tents, food and water. Before dark, a tent on a hilltop, a barbecue dinner and a campfire. You may enter the trail only with an agency and a guide, and your luggage stays at your hotel in Đà Lạt.',
        rain: 'when it pours in the mountains, the streams in the Phan Dũng forest rise suddenly: leave the decision to cross to your guide, and if the forecast is bad, put off the trek and stay in Đà Lạt.',
        next: { t: 'The Tà Năng–Phan Dũng trail: down to the Phan Dũng forest', d: 'Sunrise over the hills, then down through pine forest and dry deciduous forest, with two stream crossings, to the Phan Dũng forest gate at about 15:30. From there the agency’s car takes you to Đà Lạt, about 4.5 hours, so you will reach your hotel around 20:00 and move on the next day. Many agencies end the trek at Liên Hương on the coast: choose one that returns to Đà Lạt.' } } },
    { t: 'The summit of Lang Biang', d: 'A full-day hike up Núi Bà (2,167 m), the highest peak of Lang Biang mountain: through damp forest, then steep steps to the top, 4–6 hours’ walk there and back, only with a guide. In places the path disappears in the forest, and in the rainy season it is slippery, with leeches. When booking, ask whether the trail is open: if not, the park runs its own guided walk, 10 km through the forest from the Thiên Thai waterfall.',
      easy: { t: 'The old railway and flower villages', d: 'A heritage train from Đà Lạt’s 1930s station to Trại Mát and the mosaic-covered Linh Phước Pagoda, then the greenhouses of the flower village of Vạn Thành.' } },
    { t: 'Tea hills and a coffee plantation', d: 'Sunrise over the tea hills of Cầu Đất, then a family-run K’Ho coffee plantation at the foot of Lang Biang mountain.' }
  ],
  gem: 'Bidoup–Núi Bà. Most visitors to Đà Lạt never leave the town at all.',
  skip: 'The Crazy House, the flower parks and the Datanla alpine coaster.',
  instead: 'the pine forest and the villages out of town.'
};
```

Utwórz `site2/src/en/content/danang.js`:

```js
/* Đà Nẵng with the Sơn Trà peninsula: the English texts of the place (stage 5), the same fields and order as
   site2/src/content/danang.js where it has a text. Facts and sources: research/danang-2026-10.md. */
CONTENT_EN.danang = {
  name: 'Đà Nẵng and the Sơn Trà peninsula', short: 'Đà Nẵng',
  sub: 'Red-shanked doucs on Sơn Trà, Mỹ Khê beach and the Marble Mountains',
  days: [
    { t: 'The Marble Mountains and an evening by the Hàn', d: 'The Marble Mountains (Ngũ Hành Sơn), south of the centre: up Thủy Sơn by the steps or the lift, Huyền Không Cave and the view from Vọng Giang Đài; open 7:00–17:30. In the evening, dinner by the Hàn river, and on Saturdays and Sundays at 21:00 the Dragon Bridge breathes fire and water.',
      rain: 'the Museum of Cham Sculpture (7:00–17:00) instead of the slippery steps of the Marble Mountains.',
      solo: { t: 'An evening by the Hàn and Sơn Trà in the morning', d: 'In the evening, dinner by the Hàn river, and on Saturdays and Sundays at 21:00 the show on the Dragon Bridge. At dawn, a swim at Mỹ Khê while the lifeguards are on duty, and from 7:30 by car up Sơn Trà: the road to Bàn Cờ, where you look out for doucs, and Linh Ứng Pagoda. The management closes the roads onto the peninsula in downpours, so check its notice that evening. Move on around 10:00.' } },
    { t: 'Dawn at Mỹ Khê and doucs on Sơn Trà', d: 'In the morning, a swim at Mỹ Khê while the lifeguards are on duty, only between the flags, then the Museum of Cham Sculpture before noon. In the afternoon, by car up Sơn Trà, to Bàn Cờ and Linh Ứng Pagoda. Watch the treetops for red-shanked doucs, but do not go into the forest or feed the animals. The roads are open 7:30–17:30 (March–September until 18:30), and the management closes them in downpours: check its notice the day before.',
      rain: 'the museum and the city, but stay off Sơn Trà: in downpours the management closes the roads onto the peninsula, sometimes for several days.' }
  ],
  gem: 'Cây đa di sản: an old banyan tree on Sơn Trà that you can reach only on foot from the junction by Bãi Bắc.',
  skip: '“Treks” and “douc safaris” deep into the Sơn Trà forest, sold on the street and online: entering the forest without the management’s permission is illegal.',
  instead: 'looking for doucs from the peninsula’s permitted roads during opening hours.',
  events: [
    { t: 'On Sơn Trà, lim xẹt trees bloom along Yết Kiêu Street from late March to June, and thàn mát trees in April and May. The doucs come down then for the flowers and young leaves, so they are easier to spot.' },
    { t: 'The height of the rainy and storm season: in downpours the management closes the roads onto Sơn Trà, sometimes for several days, and the sea can be dangerous. Keep checking the notices and have a backup plan in the city.' },
    { t: 'Outside the swimming season fewer lifeguards are on duty on the beaches, and the north-east monsoon brings waves and rip currents. Swim only where there are lifeguards, between the flags.' }
  ]
};
```

Utwórz `site2/src/en/content/hagiang.js`:

```js
/* Hà Giang and the loop over the Đồng Văn plateau: the English texts of the place (stage 5), the same fields and order as
   site2/src/content/hagiang.js where it has a text. Facts and sources: research/hagiang-2026-10.md. */
CONTENT_EN.hagiang = {
  name: 'Hà Giang and the Đồng Văn plateau', short: 'Hà Giang',
  sub: 'A loop over the Đồng Văn plateau and the Mã Pí Lèng pass',
  poi: { name: 'Đồng Văn' },
  days: [
    { t: 'Evening in Hà Giang', d: 'A night in Hà Giang town, where the loop starts in the morning. Book a driver or a motorbike guide (easy rider) only through a licensed agency. Đồng Văn, Mã Pí Lèng and Lũng Cú lie in the border zone, so you need a permit for about 230,000–300,000 VND, which the agency arranges. Always carry your passport.',
      rain: 'change nothing, but ask the agency about the forecast and the state of the QL4C road.',
      easy: { t: 'Evening in Hà Giang', d: 'A night in Hà Giang town, where the loop starts in the morning. Book a car with a driver only through a licensed agency. Đồng Văn, Mã Pí Lèng and Lũng Cú lie in the border zone, so you need a permit for about 230,000–300,000 VND, which the agency arranges. Always carry your passport.' },
      self: { t: 'Evening in Hà Giang', d: 'A night in Hà Giang town; in the evening, pick up the motorbike from the rental shop you will return it to after the loop. Đồng Văn, Mã Pí Lèng and Lũng Cú lie in the border zone: the police immigration office in town issues the permit for about 230,000–300,000 VND, and your hotel can arrange it too. Always carry your passport, licence and International Driving Permit.' } },
    { t: 'Through Quản Bạ and Yên Minh to Đồng Văn', d: 'By car with a driver, or riding pillion behind a motorbike guide, over the Bắc Sum pass and through Heaven’s Gate in Quản Bạ, with a view of the conical Cô Tiên hills, then through Yên Minh and the Thẩm Mã and Chín Khoanh hairpins, past the Vương family palace in Sà Phìn. About 150 km in all, 4–5 hours of driving alone. A night in Đồng Văn and an evening walk in the old quarter.',
      rain: 'go more slowly and expect fog on the passes; in a downpour or a landslide warning, ask the agency about the state of the QL4C road.',
      easy: { t: 'Through Quản Bạ and Yên Minh to Đồng Văn', d: 'By car with a driver over the Bắc Sum pass and through Heaven’s Gate in Quản Bạ, with a view of the two conical Cô Tiên hills, then through Yên Minh and the Thẩm Mã and Chín Khoanh hairpins. On the way, the Vương family palace in Sà Phìn. About 150 km in all, 4–5 hours of driving alone. A night in Đồng Văn, and an evening walk in the old quarter.' },
      self: { t: 'Through Quản Bạ and Yên Minh to Đồng Văn by motorbike', d: 'About 150 km by motorbike, 4–5 hours of riding alone, so set off at 8:00 to arrive before dark: over the Bắc Sum pass and through Heaven’s Gate in Quản Bạ, Yên Minh, the Thẩm Mã and Chín Khoanh hairpins and past the Vương family palace in Sà Phìn to Đồng Văn. Bắc Sum has sharp bends and oncoming lorries. Police check this road, foreigners especially.' } },
    { t: 'Lũng Cú and the village below the tower', d: 'A short day, about 50–60 km: by car or with a motorbike guide to Lũng Cú and its flag tower at the northernmost tip of Vietnam, up the steps or by electric buggy. Then Lô Lô Chải village below the tower, and back to Đồng Văn for a second night. Do not turn off onto roads towards the border.',
      rain: 'in fog the view from the tower disappears, so stay longer in Đồng Văn’s old quarter and go to Lũng Cú when it clears.',
      easy: { t: 'Lũng Cú and the village below the tower', d: 'A short day, about 50–60 km: by car with a driver to Lũng Cú and its flag tower at the northernmost tip of Vietnam, up by electric buggy. Then Lô Lô Chải village below the tower, and back to Đồng Văn for a second night.' },
      self: { t: 'Lũng Cú and the village below the tower by motorbike', d: 'By motorbike, 26 km to Lũng Cú and back, about 50–60 km in all on narrow roads near the border: ride slowly and do not turn off onto roads towards the border. Up to the flag tower at Vietnam’s northern tip by the steps or by electric buggy, then Lô Lô Chải village below the tower and a second night in Đồng Văn.' } },
    { t: 'Mã Pí Lèng, the Nho Quế canyon and Du Già', d: 'Over the Mã Pí Lèng pass, on a road cut into the slope above the canyon of the Nho Quế river, to Mèo Vạc. If the weather allows, a boat through the Tu Sản canyon. In the afternoon, through Mậu Duệ to Du Già, about 100 km in all, for a night at a homestay in a valley with a waterfall.',
      rain: 'in a downpour skip the boat, which does not sail in storms, and on the pass go slowly and do not stop below steep slopes.',
      easy: { t: 'Mã Pí Lèng, the Nho Quế canyon and Du Già', d: 'By car with a driver over the Mã Pí Lèng pass, on a road cut into the slope above the canyon of the Nho Quế river, to Mèo Vạc. If the weather allows, a boat through the Tu Sản canyon. In the afternoon, through Mậu Duệ to Du Già, about 100 km in all, for a night at a homestay in a valley with a waterfall.' },
      self: { t: 'Mã Pí Lèng, the Nho Quế canyon and Du Già by motorbike', d: 'About 100 km by motorbike: over the Mã Pí Lèng pass above the canyon of the Nho Quế river to Mèo Vạc, then in the afternoon through Mậu Duệ to Du Già, for a night at a homestay. Lorries and construction machines use Mã Pí Lèng, and beyond Mèo Vạc the road is sometimes under repair, so set off in the morning and ride slowly. Take the boat through the Tu Sản canyon only in a life jacket.' } },
    { t: 'From Du Già back to Hà Giang', d: 'In the morning, a walk to the waterfall in Du Già, then along the Lũng Hồ valley and through Thái An back to Hà Giang town, about 100 km. A night in town.',
      rain: 'after a downpour the waterfall is swollen and slippery, so look at it only from the bank, and leave Du Già earlier to be back before dark.',
      easy: { t: 'From Du Già back to Hà Giang', d: 'In the morning, a walk to the waterfall in Du Già, then by car with a driver along the Lũng Hồ valley and through Thái An back to Hà Giang town, about 100 km. A night in town.' },
      self: { t: 'From Du Già back to Hà Giang by motorbike', d: 'In the morning, a walk to the waterfall in Du Già, then about 100 km by motorbike back to Hà Giang, along the Lũng Hồ valley and through Thái An; the stretch of road south of Du Già is sometimes in poor condition. Return the motorbike in town before dark.' } }
  ],
  gem: 'A boat through the Tu Sản canyon below the Mã Pí Lèng pass.',
  skip: 'The “Mỏm đá sống ảo” rock ledge on Mã Pí Lèng: closed since July 2026, and photos on the edge of the drop are dangerous.',
  instead: 'a roadside viewpoint on the pass, or a boat in the Tu Sản canyon.',
  events: [
    { t: 'Cold season: from December to February the nights on the plateau are cold, about 4–7 °C on average; there can be frost, freezing rain and even snow, and thick fog on the passes. Bring a warm jacket, a hat and gloves, and wait out icy roads.' },
    { t: 'In spring, peach and plum trees and rapeseed bloom; on the plateau, peach and rapeseed are still in flower in March.' },
    { t: 'The Khâu Vai market near Mèo Vạc: once a year, on the 27th day of the third lunar month, with a festival over 2–3 days. It falls between late April and mid-May (2025: 22–24 April, 2026: 12–13 May), so check the date for your year.' },
    { t: 'Rainy season: downpours, fog, landslides and rockfalls on the QL4C road (2024, 2026). Set off in the morning, ask about the road after a downpour, and wait it out when there is a landslide warning.' },
    { t: 'Buckwheat is in flower (tam giác mạch): pink and white fields on the plateau. The festival in Đồng Văn has a different date every year (2025: 29 November, 2026: 25 October); then rooms and roads are crowded, and traffic through Đồng Văn is sometimes stopped.' }
  ]
};
```

Utwórz `site2/src/en/content/hanoi.js`:

```js
/* Hà Nội: the English texts of the place (stage 5), the same fields and order as site2/src/content/hanoi.js where it has a
   text. */
CONTENT_EN.hanoi = {
  name: 'Hà Nội', short: 'Hà Nội',
  sub: 'The capital: the Old Quarter, temples and craft villages',
  days: [
    { t: 'The Old Quarter and Hoàn Kiếm lake', d: 'A walk around Hoàn Kiếm lake and through the narrow streets of the Old Quarter.',
      solo: { t: 'An evening in Hà Nội', d: 'At dusk, a walk around Hoàn Kiếm lake and through the narrow streets of the Old Quarter, with street food for dinner: bún chả or bánh cuốn. In the morning, egg coffee, then on your way.' } },
    { t: 'The Temple of Literature and the Museum of Ethnology', d: 'The Temple of Literature when it opens at 8:00, before the groups arrive. Then the Vietnam Museum of Ethnology, with full-size village houses in its garden (closed on Mondays).' },
    { t: 'Đường Lâm village', d: 'A day trip to Đường Lâm, about 1½ hours each way: laterite lanes, a 17th-century communal house and lunch with a local family.' },
    { t: 'Pottery and the river', d: 'The potters’ village of Bát Tràng on the Red River, and on the way into the city, at sunset, a walk across Long Biên Bridge.' }
  ],
  again: { t: 'Return to Hà Nội', d: 'A relaxed evening: at sunset, a walk across Long Biên Bridge over the Red River, and for dinner, phở cuốn (beef rolled in sheets of rice noodle) on Ngũ Xã Street by Trúc Bạch lake.' },
  gem: 'Đường Lâm, an old laterite village west of the city.',
  skip: 'Train Street: closed to tourists time and again, and crowded whenever it is open.',
  instead: 'Long Biên Bridge at dawn.'
};
```

Utwórz `site2/src/en/content/hanoiStop.js`:

```js
/* A night in Hà Nội: the English texts of the place (stage 5), the same fields and order as site2/src/content/hanoiStop.js
   where it has a text. */
CONTENT_EN.hanoiStop = {
  name: 'A night in Hà Nội', short: 'Hà Nội',
  sub: 'An overnight stop between two places',
  days: [
    { t: 'Street food and an early night', d: 'An evening in the city. Street food in the Old Quarter (bún chả, bánh cuốn, egg coffee), then an early night before you travel on.' }
  ]
};
```

Utwórz `site2/src/en/content/hoian.js`:

```js
/* Hội An: the English texts of the place (stage 5), the same fields and order as site2/src/content/hoian.js where it has a
   text. Facts and sources of Mỹ Sơn: research/myson-2026-10.md. */
CONTENT_EN.hoian = {
  name: 'Hội An', short: 'Hội An',
  sub: 'The Old Town at dawn, vegetable-growing villages and canals among water palms',
  days: [
    { t: 'Hội An’s back roads', d: 'When you arrive, get a bike and ride to the vegetable village of Trà Quế, then on to the canals among the water coconut palms of Cẩm Thanh.',
      rain: 'a lantern-making workshop, plus the covered market.',
      easy: { t: 'Hội An at a gentle pace', d: 'A cooking class in the vegetable village of Trà Quế (by taxi), then the Old Town at dusk as the lanterns come on, a sampan ride on the Thu Bồn river and dinner before the crowds peak at around 19:00. Touristy, but beautiful all the same.' },
      solo: { t: 'Hội An in the evening and at dawn', d: 'In the evening, the Old Town by lantern light, ideally before 19:00, ahead of the biggest crowds, and dinner by the Thu Bồn river. At 6:00 the next morning the same lanes are almost empty; then breakfast and on your way.' } },
    { t: 'The Old Town at 6:00', d: 'See the Old Town before the day-trippers arrive: merchant houses and assembly halls in the morning light (you can go inside from about 8:00, with an Old Town ticket). The afternoon is free: a tailor, a cafe by the river, or a bike ride to An Bàng beach, 3–4 km from the Old Town.',
      rain: 'the assembly halls in the Old Town, or fittings at the tailor’s.' },
    { t: 'Mỹ Sơn at 6:00', d: 'At 5:00, a car with a driver to Mỹ Sơn, about an hour away. The ticket office opens at 6:00, and a buggy takes you 2 km into the valley, to the ruins of 4th–13th-century Cham temples in the jungle: walk round them while it is cool and empty, as the coaches arrive around 9:30. At 9:00, a Cham dance performance by tower G. Keep to the marked paths, as unexploded ordnance may lie on the slopes.',
      rain: 'in light rain Mỹ Sơn stays open, but the paths are slippery and the lower temple groups are muddy; in downpours water floods the valley and the access road, and the management closes the site, so check its notice in the morning. In that case, go to the Museum of Cham Sculpture in Đà Nẵng (7:00–17:00), which holds sculptures from Mỹ Sơn.',
      easy: { t: 'Mỹ Sơn, back by boat', d: 'A guided group tour: hotel pick-up around 7:00, at Mỹ Sơn around 9:00, with the Cham dance performance, then lunch, and around 13:30 back to Hội An by boat on the Thu Bồn. More comfortable than at dawn, but the valley will be hot and crowded.' } }
  ],
  again: { t: 'Return to Hội An', d: 'A quiet evening by the sea: by taxi or by bike through the rice fields to An Bàng beach, a walk along the shore and a seafood dinner at one of the beach eateries.' },
  gem: 'Cẩm Thanh: canals among water coconut palms, a few kilometres from the Old Town.',
  skip: 'Hội An’s Old Town at 19:00, when the crowds among the lanterns are at their biggest.',
  instead: 'the Old Town at 6:00 and the villages around it.',
  events: [
    { t: 'The height of the flood season: after downpours the Thu Bồn river can flood the Old Town, as well as the road to Mỹ Sơn and the valley of the ruins, and halt sightseeing for several days. Keep checking forecasts and notices, and have a backup plan.' }
  ]
};
```

Utwórz `site2/src/en/content/hue.js`:

```js
/* Huế: the English texts of the place (stage 5), the same fields and order as site2/src/content/hue.js where it has a
   text. */
CONTENT_EN.hue = {
  name: 'Huế', short: 'Huế',
  sub: 'The Imperial City, tombs along the Perfume River and rice fields all around',
  days: [
    { t: 'The Imperial City', d: 'When you arrive, the Imperial City (Đại Nội): the walls, gates and courtyards of the former capital of the Nguyễn dynasty. The ticket offices close around 17:00, and from mid-March to mid-October around 17:30. Towards evening, a walk along the Perfume River and bún bò Huế for dinner.',
      rain: 'the covered galleries of the Imperial City and the Museum of Royal Antiquities.' },
    { t: 'Huế by bike', d: 'By bike along the Perfume River to the tombs of Minh Mạng and Tự Đức, and in the late afternoon to Thiên Mụ Pagoda.',
      rain: 'the Đông Ba Market hall by the Perfume River, and bún bò Huế for lunch at one of the food stalls.',
      easy: { t: 'Huế by boat and by car', d: 'By dragon boat up the Perfume River to Thiên Mụ Pagoda, then by car to the tombs of Minh Mạng and Tự Đức.' } },
    { t: 'Around Huế', d: 'The tile-roofed bridge at Thanh Toàn among the rice fields, then the Tam Giang lagoon at sunset.',
      rain: 'a cooking class in Huế, or by car to the old garden houses of Kim Long.' }
  ],
  gem: 'Thanh Toàn, a covered bridge from the 1770s among the rice fields east of Huế.',
  events: [
    { t: 'The height of the flood season: after downpours, water can flood the Citadel and close Đại Nội for several days. Check the forecasts and notices before sightseeing.' }
  ]
};
```

Utwórz `site2/src/en/content/mekong.js`:

```js
/* Mekong Delta: the English texts of the place (stage 5), the same fields and order as site2/src/content/mekong.js where it
   has a text. */
CONTENT_EN.mekong = {
  name: 'Mekong Delta', short: 'Mekong',
  sub: 'Canals, orchards and a floating market from a small boat',
  days: [
    { t: 'The canals of Phong Điền', d: 'Check in at a canal-side homestay in Phong Điền, just outside Cần Thơ. In the late afternoon, take a small sampan through the canals among the fruit orchards.',
      solo: { t: 'The delta at dusk and dawn', d: 'Reach your canal-side homestay in Phong Điền, just outside Cần Thơ, by mid-afternoon at the latest, and take a sampan through the canals among the orchards. The next morning at 5:30, a small boat to the Cái Răng floating market; be back at your homestay before 9:00, in time to move on.' } },
    { t: 'The floating market at dawn', d: 'Set off in a small boat at 5:30 to reach Cái Răng ahead of the tour boats, then the side canals and a rice noodle workshop. In the afternoon, cycle around the islet of Cồn Sơn.',
      easy: { t: 'The floating market at dawn', d: 'Set off in a small boat at 5:30 to reach Cái Răng ahead of the tour boats, then the side canals and a rice noodle workshop. In the afternoon, a leisurely boat trip to the islet of Cồn Sơn – fruit orchards and a home-cooked lunch.' } }
  ],
  gem: 'Cồn Sơn – an islet where the islanders themselves run the tourism, a short boat ride from Cần Thơ.',
  skip: 'Day trips to Mỹ Tho and Cái Bè: coach groups at the same coconut-candy stops.',
  instead: 'a night at a homestay in Phong Điền and the market at sunrise.',
  events: [
    { t: 'Fruit season: from June to August the orchards around Cần Thơ are full of fruit.' },
    { t: 'High water: from September to November the tides are highest at about 6:00–8:00 and 17:00–19:00. Agree the time of the morning boat trip to the market with your hosts, going by the tide table.' }
  ]
};
```

Utwórz `site2/src/en/content/mucangchai.js`:

```js
/* Mù Cang Chải: the English texts of the place (stage 5), the same fields and order as site2/src/content/mucangchai.js where
   it has a text. Facts and sources: research/mucangchai-2026-10.md. */
CONTENT_EN.mucangchai = {
  name: 'Mù Cang Chải and the Khau Phạ pass', short: 'Mù Cang Chải',
  sub: 'Hmông rice terraces, Mâm Xôi hill and paragliding over the Khau Phạ pass',
  days: [
    { t: 'Terraces at sunset', d: 'Check in at a homestay in La Pán Tẩn or in the town. At about 16:00, Móng Ngựa hill, 2 km from the centre: terraces laid out in a horseshoe, at their best before sunset, and crowded after 17:00. The slopes are steep; do not stand on the railings of the photo platforms. For dinner, stream fish or trout farmed below Khau Phạ.',
      rain: 'after rain the paths on the slopes of Móng Ngựa are slippery: stay at the upper viewpoint or save the terraces for tomorrow.' },
    { t: 'Villages and terraces of La Pán Tẩn', d: 'A full-day hike with a local guide: from Chế Cu Nha through terraces, forest and Hmông villages to La Pán Tẩn, about 10 km, with lunch on the way. You finish at Mâm Xôi hill, terraces laid out like a tray of sticky rice, where a car picks you up at about 16:00. After rain the dykes between the terraces are slippery, so wear shoes with a good grip.',
      rain: 'in a downpour, go by car to the Mâm Xôi and Kim Nọi viewpoints, and walk only short stretches on concrete roads.',
      easy: { t: 'Viewpoints by car', d: 'Round the viewpoints in a car with a driver: in the morning Mâm Xôi in La Pán Tẩn (the last stretch by motorbike taxi), then the terraces and rock of Kim Nọi, about 300 m on foot from the road, and the Mồ Dề bamboo forest, 3.5 km from the town.' } },
    { t: 'Above the Lìm Mông valley', d: 'In the morning, up to the Khau Phạ pass, about 20 km from the town, overlooking the terraces of the Lìm Mông valley. If you like, take a tandem paragliding flight from here with a pilot: 10–15 minutes over the terraces. Flights depend on the wind, so keep a second date in reserve. In the afternoon, the Lìm Mông valley and Tú Lệ: cốm, fresh from the fields in season, and a soak in the hot springs.',
      rain: 'paragliders do not fly in the rain, and the pass is lost in cloud: stay by the hot springs in Tú Lệ or swap this day with another.' }
  ],
  gem: 'Mâm Xôi hill in La Pán Tẩn: terraces laid out like a tray of sticky rice, part of a special national monument.',
  skip: 'Mù Cang Chải as a day trip from Hà Nội or Sa Pa: 8–12 hours in a car for terraces seen through the window.',
  instead: 'a night at a homestay in La Pán Tẩn: Mâm Xôi in the morning without the crowds, Móng Ngựa in the evening.',
  events: [
    { t: 'Water season: the terraces are flooded for planting rice, first in Tú Lệ at the end of April, in the villages of Mù Cang Chải in May and June, and in a dry year not until early July.' },
    { t: 'Season of downpours and storms: landslides happen on Highway 32 and the Khau Phạ pass, as on 1–3 October 2025, when the road was closed for three days. Check the notices the day before and keep a spare day; expect mud and leeches on the dykes.' },
    { t: 'Golden terraces: the rice ripens first in Tú Lệ and the Lìm Mông valley (late August), then in La Pán Tẩn and Chế Cu Nha (until mid-October). In late August and early September there is a festival, with paragliding flights over Khau Phạ and a flag on the terraces on 2 September. These are the only crowds of the year, so book a room and a paragliding flight a few weeks ahead.' },
    { t: 'Cold season: nights in the town are about 9 °C, and in cold snaps there is frost on the pass and in La Pán Tẩn. After the harvest the terraces are bare, but in December–January the tớ dày blossoms, and a sea of clouds often fills the valleys.' }
  ]
};
```

Utwórz `site2/src/en/content/ninhbinh.js`:

```js
/* Ninh Bình: the English texts of the place (stage 5), the same fields and order as site2/src/content/ninhbinh.js where it
   has a text. */
CONTENT_EN.ninhbinh = {
  name: 'Ninh Bình', short: 'Ninh Bình',
  sub: 'Rowing boats among limestone karsts',
  days: [
    { t: 'Into the karst hills', d: 'Stay in the lanes behind Tam Cốc. If you get there by mid-afternoon at the latest, fit in a rowing-boat trip on the Vân Long wetlands; the last boats leave in the late afternoon.',
      solo: { t: 'Karst hills in the evening and morning', d: 'Stay in the lanes behind Tam Cốc, and arrive by mid-afternoon at the latest so you can still fit in a rowing-boat trip on the Vân Long wetlands before the last boats leave. The next morning, be at the Tràng An boat wharf at 7:00, when it opens, take the boat route through the caves, then travel on.' } },
    { t: 'Tràng An at 7:00', d: 'Be at the boat wharf when it opens, at 7:00, and take the longest route through the caves before the coaches arrive. Then by bike along the village lanes, or to Hoa Lư, the 10th-century capital, and the temples of its first kings (rebuilt in the 17th century).',
      easy: { t: 'Tràng An at 7:00', d: 'Be at the boat wharf when it opens, at 7:00, and take the longest route through the caves before the coaches arrive; you do not have to row. Then by car to Hoa Lư, the 10th-century capital, and its temples.' } }
  ],
  gem: 'Delacour’s langurs on the Vân Long crags – among the rarest primates in the world.',
  skip: 'The Hang Múa viewpoint at sunset: 500 steps and a shoulder-to-shoulder crowd.',
  instead: 'Vân Long in the late afternoon.',
  events: [
    { t: 'Rainy and typhoon season: when the water in the Tràng An caves is high, the boats take an altered route, and before a storm, boat trips can be suspended for several days. Check the wharf’s notice the day before.' }
  ]
};
```

Utwórz `site2/src/en/content/phongnha.js`:

```js
/* Phong Nha: the English texts of the place (stage 5), the same fields and order as site2/src/content/phongnha.js where it
   has a text. Facts and sources: research/phongnha-2026-10.md. */
CONTENT_EN.phongnha = {
  name: 'Phong Nha–Kẻ Bàng National Park', short: 'Phong Nha',
  sub: 'Caves by boat and on foot, among karst valleys',
  days: [
    { t: 'By the Son river', d: 'You stay in the small town of Phong Nha, on the Son river, about an hour from Đồng Hới airport. In the evening, cycle round the Bồng Lai valley, among fields and farms; many places to stay lend bikes for free.' },
    { t: '7 km into Paradise Cave', d: 'Paradise Cave (Động Thiên Đường) runs a full-day trek: the first kilometre along a wooden boardwalk, then with a guide and a head torch in the dark, 7 km into the cave, with lunch inside. Gear is handed out at 8:00; you finish around 14:30–16:00. Ages 16 and over; not for anyone with heart disease or high blood pressure. In the rainy season the water rises and the trek turns back after about 4 km.',
      rain: 'the kilometre of boardwalk in Paradise Cave, which lies high up and is almost always open; when downpours go on for several days, the park suspends the 7 km trek and the boats to Phong Nha Cave.',
      easy: { t: 'By boat to Phong Nha Cave and along the boardwalk in Paradise Cave', d: 'In the morning, a boat from the pier in town: half an hour on the Son river, then about 1,200 m of underground river, now under oars, and dry chambers along walkways, about 2.5 hours in all. In the afternoon, Paradise Cave: an electric buggy, then up the hill and down the steps to a kilometre of wooden boardwalk among the dripstone formations; open roughly 7:30–16:00.' },
      hard: { t: 'Hang Én: down to Rào Thương and a night in the cave',
        rain: 'in downpours Oxalis cancels the expedition, and the water in Hang Én takes several days to go down: that leaves the kilometre of boardwalk in Paradise Cave, which lies high up and is almost always open.', d: 'A two-day expedition with Oxalis, the only operator with the province’s permit for this route, with guides and safety assistants: a steep descent to the Rào Thương stream, fords, Đoòng village, through the jungle to Nước Lạnh Cave and a night at the camp in Hang Én, with a swim in a small lake. Oxalis takes fit people aged 16–70. Sơn Đoòng, the world’s largest cave, is sold out several years ahead.',
        next: { t: 'Hang Én: the cave in the morning, then out to the road', d: 'After breakfast, the back of the cave and lunch at the camp, then across the rivers, about 30 crossings over the two days, and a 450 m climb to the road, where a car is waiting. You are back in Phong Nha around 18:00, so you spend this night here too and move on the next day.' } } },
    { t: 'Phong Nha Cave by boat, and Hang Tối', d: 'In the morning, by boat from the pier in town to Phong Nha Cave: half an hour on the Son river, then about 1,200 m of underground river under oars. In the afternoon, the Chày river and Hang Tối: a 400 m zip line over the river, the cave in the dark, a mud bath, kayaking and a swim in the river, about 4 hours in all (zip line: minimum weight 40 kg).',
      rain: 'the boardwalk in Paradise Cave or the botanical garden, which are almost always open; when downpours go on for several days, the boats to Phong Nha Cave, as well as Hang Tối, usually stop for 2–5 days.',
      easy: { t: 'The botanical garden and the Bồng Lai valley', d: 'The park’s botanical garden, about 10 km from town: forest paths of up to 4 km, the Gió waterfall, over 30 m high, and sometimes monkeys in the treetops; with a park guide the route is 5 km. In the afternoon, by bike or by car round the Bồng Lai valley, among fields and farms.' } },
    { t: 'Tú Làn in a day', d: 'An expedition with Oxalis to the Tú Làn caves: hotel pick-up at 7:00–7:30, 70 km west, then about 9 km on foot, 800 m in the caves, 15 m of ladder in a harness and 150 m of swimming along an underground river in a life jacket, with lunch in the valley. Back in Phong Nha around 17:30–19:00. Ages 16–70; book 1–2 weeks ahead.',
      rain: 'the boardwalk in Paradise Cave or the botanical garden; when the rivers rise, Oxalis changes or cancels the Tú Làn trip, and the park closes Nước Moọc.',
      easy: { t: 'The Nước Moọc stream', d: 'About 20 minutes by car from Phong Nha Cave: boardwalks along a turquoise stream, shallow swimming spots and kayaks; open roughly 8:00–15:30, in summer until 16:30.' } }
  ],
  gem: 'The underground river in Phong Nha Cave: once the engine is switched off, the boat carries on under oars.',
  skip: 'A day trip from Huế: about 7 hours in a car for two caves.',
  instead: 'two nights in Phong Nha, with the boat to Phong Nha Cave in the morning.',
  events: [
    { t: 'The vàng anh trees are in flower along the Nước Moọc stream.' },
    { t: 'Peak season: the caves can be crowded, and a tropical storm can stop the boats to Phong Nha Cave, as well as Hang Tối, for several days. After downpours in Laos the Son river can run murky.' },
    { t: 'Flood season: when the Son river rises, the park suspends the boats to Phong Nha Cave, as well as Hang Tối and Nước Moọc, usually for 2–5 days, while Paradise Cave is almost always open.' },
    { t: 'Cool season: the days are often grey and drizzly, and the water in the rivers and caves is cold. Take a warm layer for the evening and a waterproof jacket.' }
  ]
};
```

Utwórz `site2/src/en/content/phuquoc.js`:

```js
/* Phú Quốc’s quiet north: the English texts of the place (stage 5), the same fields and order as site2/src/content/phuquoc.js
   where it has a text. */
CONTENT_EN.phuquoc = {
  name: 'Phú Quốc’s quiet north', short: 'Phú Quốc',
  sub: 'Fishing villages, starfish shallows and a national park',
  days: [
    { t: 'Island pace', d: 'Stay on the north coast near Gành Dầu, away from the strip of resorts in the south. Sunset over the Gulf of Thailand.' },
    { t: 'Starfish in the shallows, and the forest', d: 'In the morning, Rạch Vẹm, where starfish lie in the shallows (look, do not pick them up). They are easiest to see from November to April, when the sea is calm and the water clear. In the afternoon, the forest roads of Phú Quốc National Park, which covers most of the north.' },
    { t: 'A day off', d: 'Nothing planned: a massage, a long lunch and a swim if the sea is calm. This is a good place to slow down.' },
    { t: 'Fishing villages and an empty beach', d: 'The east coast: a crab lunch on the pier at Hàm Ninh, a pepper plantation, then sunset on Vũng Bầu beach.' }
  ],
  gem: 'The starfish shallows of Rạch Vẹm on the north coast.',
  skip: 'Sunset Town, the cable car to Hòn Thơm and VinWonders in the south.',
  instead: 'the north coast and the national park.',
  events: [
    { t: 'Starfish season: from November to April the sea at Rạch Vẹm is calm and the water clear, so the starfish are easy to see. Look, do not pick them up.' }
  ]
};
```

Utwórz `site2/src/en/content/puluong.js`:

```js
/* Pù Luông: the English texts of the place (stage 5), the same fields and order as site2/src/content/puluong.js where it
   has a text. */
CONTENT_EN.puluong = {
  name: 'Pù Luông', short: 'Pù Luông',
  sub: 'Bamboo homestays, rice valleys and hikes along the ridges',
  days: [
    { t: 'Into the valleys', d: 'Check in at a bamboo homestay above the rice terraces in Bản Đôn or Kho Mường. In the evening, a walk around the village.' },
    { t: 'Ridges, villages and a waterfall', d: 'A full-day hike with a guide: the turquoise pools of the Hiêu waterfall, Kho Mường village and the ridges between the valleys.',
      easy: { t: 'The valleys from the road', d: 'By car with a driver along the road through the valleys, to the lower pools of the Hiêu waterfall (a short, easy walk), then Kho Mường village and a long lunch in a stilt house.' },
      hard: { t: 'To the summit of Pù Luông', d: 'A full-day climb to the summit of Pù Luông (1,700 m): 8–9 hours through the forest. The ascent is steep, over 35 degrees in places, and there may be leeches in the forest. Go only with a guide: the nature reserve runs the climbs with local guides and limits numbers, so sign up early and ask about a one-day version. It is a day for fit walkers. If it rains, skip the summit: the wet path is slippery.' } },
    { t: 'A quiet day in the valley', d: 'Bamboo waterwheels, a bamboo raft on the river, weaving in a stilt house and a long lunch with your hosts. After the harvest, mornings here can be misty and quiet.' }
  ],
  gem: 'The turquoise pools of the Hiêu waterfall.',
  skip: 'Mai Châu: charming, but these days surrounded by guesthouses geared to coach tours.',
  instead: 'Pù Luông, under two hours by road from Mai Châu.',
  events: [
    { t: 'Golden terraces: the rice here usually ripens from late May to mid-June. The timing shifts from year to year and varies between villages, so ask your hosts.' },
    { t: 'Golden terraces: the rice here usually ripens from late September to early October. The timing shifts from year to year and varies between villages, so ask your hosts.' },
    { t: 'Cool season: from December to February the days here are often grey and chilly, the mornings misty, and it is colder still on the summit of Pù Luông. Take a warm layer.' }
  ]
};
```

Utwórz `site2/src/en/content/saigon.js`:

```js
/* Hồ Chí Minh City: the English texts of the place (stage 5), the same fields and order as site2/src/content/saigon.js where
   it has a text. */
CONTENT_EN.saigon = {
  name: 'Hồ Chí Minh City', short: 'Hồ Chí Minh City',
  sub: 'Cần Giờ mangroves, Chợ Lớn and Saigon behind the scenes',
  days: [
    { t: 'A breather', d: 'No plan, on purpose: rest after the journey, then coffee at a nearby cafe, a massage and the pool. At sunset, the Saigon Waterbus (if it is running) from Bạch Đằng pier upriver to Thảo Điền, and dinner by the water.',
      solo: { t: 'An evening by the Saigon river', d: 'One night, with no forced plan: coffee at one of the cafes in the old apartment blocks, a massage, and at sunset the Saigon Waterbus (if it is running) from Bạch Đằng pier to Thảo Điền, then dinner by the water. In the morning, breakfast and on your way.' } },
    { t: 'The Cần Giờ mangroves', d: 'A day trip south – about 2 hours by car, with a short ferry crossing at Bình Khánh – to the Cần Giờ mangrove forest, a UNESCO biosphere reserve. By boat through the Vàm Sát channels, up a birdwatching tower, then seafood on the beach at Cần Thạnh and back to the city.' },
    { t: 'Saigon behind the scenes', d: 'In the morning, Chợ Lớn: Bình Tây Market, the incense coils of Thiên Hậu Temple and dim sum on Hà Tôn Quyền Street. In the afternoon, cafes in old apartment blocks, and in the evening dinner at the snail and seafood stalls on Vĩnh Khánh Street, in the former District 4.' }
  ],
  again: { t: 'Return to Hồ Chí Minh City', d: 'A relaxed evening: a stroll along the Nguyễn Huệ promenade from City Hall to the river, then dinner at the snail and seafood stalls on Vĩnh Khánh Street.' },
  gem: 'Cần Giờ: a real mangrove forest within the city limits, with hardly any foreign tourists.',
  skip: 'The Củ Chi tunnels on a big group tour, and Bến Thành Market.',
  instead: 'Cần Giờ, and Bình Tây Market in Chợ Lớn.'
};
```

Utwórz `site2/src/en/content/sapa.js`:

```js
/* Sa Pa and Fansipan: the English texts of the place (stage 5), the same fields and order as site2/src/content/sapa.js where it
   has a text. Facts and sources: research/sapa-2026-10.md. */
CONTENT_EN.sapa = {
  name: 'Sa Pa and Fansipan', short: 'Sa Pa',
  sub: 'Terraces of the Mường Hoa valley, H’Mông and Giáy villages, and Fansipan, the roof of Indochina',
  days: [
    { t: 'A hillside town', d: 'Settle in at Sa Pa, a former French hill station about 1,500 m above sea level. In the evening, a stroll round the town. Even in summer the nights here are cool, so keep a warm layer to hand.' },
    { t: 'Villages of the Mường Hoa valley', d: 'A full-day hike with a local guide: from Sa Pa down to Ý Linh Hồ and Lao Chải, then along the Mường Hoa stream to Tả Van, among the rice terraces of the H’Mông and Giáy. About 10 km, mostly downhill, with lunch at a family home in a village. From Tả Van you return by car.',
      rain: 'choose a shorter stretch of the valley or put the hike off, as the paths between the terraces are slippery then, and in thick fog it is better to wait it out.',
      easy: { t: 'Fansipan by cable car and Cát Cát village', d: 'In the morning, the cable car over the Mường Hoa valley up Fansipan, 3,143 m: go first thing, before the clouds come in, and take a warm jacket, a hat and gloves. Every year the cable car closes for maintenance for a week or longer (for three weeks in 2025), so check its notices before you come. In the afternoon, a walk down to Cát Cát village and its waterfall.' },
      hard: { t: 'Fansipan on foot: to the camp at 2,800 m', d: 'Day one of a two-day climb up Fansipan, 3,143 m: from the Trạm Tôn pass through the forest, lunch at 2,200 m and, in the afternoon, a night at the camp at 2,800 m, with no electricity. Go only with a company that arranges the park permit, and with a guide who holds an entry card: you may not enter the forest on your own. The trail is steep and slippery, and suits people in good shape.',
        rain: 'in a downpour or thunderstorm the company postpones the climb, and in storms the provincial tourism department orders a halt to treks into the mountains: stay in Sa Pa and take the cable car to the summit when it clears.',
        next: { t: 'Fansipan on foot: the summit and back', d: 'In the morning, the climb to the summit, which you reach at about 10:00–10:30, then down to the camp for lunch and on to Trạm Tôn, back in Sa Pa at about 17:00. It is quicker to ride the cable car down from just below the summit (a one-way ticket costs as much as a return), reaching Sa Pa at about 12:00–13:00. From late November to February the summit can be icy, so take gloves and a warm jacket.' } } },
    { t: 'Fansipan by cable car and Cát Cát village', d: 'In the morning, the cable car over the Mường Hoa valley up Fansipan, 3,143 m: go first thing, before the clouds come in, and take a warm jacket, a hat and gloves. Every year the cable car closes for maintenance for a week or longer (for three weeks in 2025), so check its notices before you come. In the afternoon, a walk down to Cát Cát village and its waterfall.',
      rain: 'the cable car runs in the rain too, but the summit can be in cloud then: if the forecast is bad, swap this day with another.',
      easy: { t: 'The Mường Hoa valley without the hike', d: 'In a car with a driver down the Mường Hoa valley through Ý Linh Hồ and Lao Chải to Tả Van, with short walks among the terraces and by the stream. Lunch with a family in Tả Van and, in the afternoon, if you feel like it, a Dao herbal bath in La Dao.' } },
    { t: 'Waterfalls below the Ô Quy Hồ pass', d: 'In a car with a driver up the road to the Ô Quy Hồ pass: first the Thác Bạc waterfall, a few hundred steps from the road, then, from the gate of Hoàng Liên park, about 30 minutes along a forest path to Thác Tình Yêu, the Love Waterfall. Finally the pass, almost 2,000 m above sea level, with a view of the Hoàng Liên range if there is no fog.',
      rain: 'after a downpour the path to Thác Tình Yêu is slippery, so stay at the Thác Bạc waterfall by the road or postpone the trip.' }
  ],
  gem: 'The hike down the Mường Hoa valley from Lao Chải to Tả Van, among the terraces of the H’Mông and Giáy.',
  events: [
    { t: 'Terraces full of water: in May and early June the fields of the Mường Hoa valley stand in water, and the villages are planting rice.' },
    { t: 'Season of downpours: the trails are muddy, there are leeches in the forest, and landslides can close roads and sights, as in September 2024, when Typhoon Yagi closed them for six days. Take leech socks and a waterproof jacket.' },
    { t: 'Golden terraces: the rice usually ripens from mid-August to the end of September, in Lao Chải and Tả Van most often in late August and early September. The timing shifts from year to year and varies between villages, so ask your hosts.' },
    { t: 'Frosty season: from late November to February there can be ice on the summit of Fansipan, and sometimes snow, while nights in Sa Pa itself average 6–8 °C. Take a hat, gloves and a warm jacket.' }
  ]
};
```

Utwórz `site2/src/en/content/yokdon.js`:

```js
/* Yok Đôn: the English texts of the place (stage 5), the same fields and order as site2/src/content/yokdon.js where it has
   a text. Facts and sources: research/yokdon-2026-10.md. */
CONTENT_EN.yokdon = {
  name: 'Yok Đôn National Park', short: 'Yok Đôn',
  sub: 'Elephants without rides, dry forest and the Sêrêpốk river',
  days: [
    { t: 'To the forest on the Sêrêpốk', d: 'Check in at the park’s guesthouse by the headquarters, where every tour starts. In the afternoon, a boat on the Sêrêpốk river, 40–60 minutes. If you come through Buôn Ma Thuột, stop at the World Coffee Museum, built in the style of an Ê Đê longhouse.',
      rain: 'in a storm the boat stays in: spend longer in Buôn Ma Thuột, at the World Coffee Museum and the Đắk Lắk Museum of the Central Highlands peoples, and reach the park for the evening.',
      solo: { t: 'Yok Đôn in the evening and morning', d: 'Reach the park in the afternoon and check in at the guesthouse. At sunset, a boat on the Sêrêpốk. At 8:00 the next morning you set off on foot with a park guide after the elephants, which find their own food in the forest; around 11:00 you are back and on your way.' } },
    { t: 'On foot after the elephants', d: 'At 8:00, on foot into the forest with a park guide, to where the elephants were last seen. For years they carried tourists; since 2018 they have roamed the forest freely, finding their own food: you watch from a distance, with no riding, bathing or feeding. After lunch, through the dry forest with a guide again, with a swim in a stream. The park lets you into the forest only with a guide.',
      rain: 'the elephants in the morning as usual, in a rain cape, and in the afternoon, when the storm comes, a cooking class in an Ê Đê family’s kitchen, 700 m from the park.',
      easy: { t: 'Elephants in the morning, Ê Đê cooking in the afternoon', d: 'In the morning, half a day after the elephants, 8:00–11:00, with a park guide and a ride from the office to the forest. In the afternoon, a cooking class with an Ê Đê family in Buôn Jang Lành, 700 m from the park: you cook lunch with your hosts and eat it together.' },
      hard: { t: 'A night in the Yok Đôn forest', d: 'A night in the forest with a park guide: on foot through the dry forest to a camp, usually by the Thác Phật waterfall, 8 km from the headquarters, and a night in a hammock or a park tent. Elephants roam free here, so follow the guide’s instructions. You move on around noon: do not book an early flight that day. You will see the programme’s elephants only on your arrival day, if you arrive before the 13:30 tour.' } }
  ],
  gem: 'The only dry-forest park in Vietnam where the elephants, after years of carrying tourists, roam the forest freely and you follow them on foot.',
  skip: 'Elephant rides in Lắk, or photos with an elephant behind a fence in Buôn Đôn.',
  instead: 'half a day on foot with a Yok Đôn park guide after elephants that have carried no one since 2018.',
  events: [
    { t: 'The height of the dry season: the forest sheds its leaves and is at its most open, but the days are hot, and the park lies lower than Buôn Ma Thuột. Set out at dawn and take water, a hat and sunscreen.' },
    { t: 'Rainy season: storms come in the afternoon, so the forest and the elephants are better in the morning. Take a light rain cape and insect repellent.' }
  ]
};
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-5.sh" MIESIAC
```

Oczekiwane: `ALL PASS` (w nim `english places ok`), grep nic nie wypisuje, `sondy (MIESIAC): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/content.js site2/src/en/content tests/content.test.js tests/run.sh
git commit -F - <<'EOF'
Teksty miejsc po angielsku (etap 5, ustalenie 8): site2/src/en/content/<id>.js dla 21 miejsc, z tymi samymi polami tekstowymi co polskie pliki (CONTENT_EN, nakładka, którą localContent kładzie na polskie teksty), po brytyjsku, z wietnamskimi nazwami z diakrytykami; strona pokaże je od zadania 7; test treści: każde miejsce ma teksty angielskie, tekst w każdym polu z polskim tekstem i nic poza nim (ustalenie 13), te same liczby i nazwy wietnamskie w każdej parze tekstów (ustalenie 14), styl brytyjski bez polskich liter i z typograficznymi cudzysłowami (ustalenie 15), teksty dla każdego paszportu w obu językach, po polsku też bez słów „euro”, „dolar” i „złotówki” (ustalenie 16), angielski opis dnia najwyżej 80 słów, bo najdłuższy w suchej próbie ma 79 (ustalenie 17), i te same zdania o bezpieczeństwie po angielsku (kto prowadzi trudny dzień, komunikat zarządu przed Sơn Trà, 4 km w Paradise Cave w porze deszczowej)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Podpisy zdjęć, nazwy świąt i nazwy linków po angielsku

Ustalenie 8: `site2/src/en/photos.js` z podpisem każdego z 97 zdjęć (autor, licencja i strona zdjęcia zostają w `photos.js`) i `site2/src/en/names.js` z nazwami sześciu świąt i 64 linków „Przed wyjazdem”, według polskich nazw, także tymi, które w obu językach brzmią tak samo („Vietnam Airlines”), żeby nowy link zawsze dostał nazwę angielską. Test: podpis dla każdego zdjęcia, nazwa dla każdego święta i linku, te same liczby i nazwy wietnamskie co po polsku, styl brytyjski dla każdego paszportu, bez wpisów, których nie ma w danych.

**Pliki:**
- Utwórz: `site2/src/en/photos.js`, `site2/src/en/names.js`
- Zmień: `site2/src/photos.js` (komentarz)
- Testy: `tests/content.test.js`, `tests/run.sh`

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js

/* Colours only through the variables in :root (the project rule): outside the :root blocks the template's CSS has no hex
```

na:

```js

/* The other English texts (finding 8): a caption for every photo (site2/src/en/photos.js), a name for every holiday and every
   link of „Przed wyjazdem” (site2/src/en/names.js), each with the facts of its Polish text (finding 14), in British English
   for every passport (findings 15 and 16), and nothing for a photo, a holiday or a link that is not there. */
contentCheck('english names', function (need) {
  function check(w, pl, en) {
    need(isText(en), w + ': no English text');
    if (isText(en)) englishProblems(w, en).concat(factProblems(w, pl, en)).forEach(function (p) { need(false, p); });
  }
  Object.keys(PHOTO_META).forEach(function (ph) { check('PHOTO_CAPS_EN.' + ph, PHOTO_META[ph].cap, PHOTO_CAPS_EN[ph]); });
  Object.keys(PHOTO_CAPS_EN).forEach(function (ph) { need(PHOTO_META[ph], 'PHOTO_CAPS_EN.' + ph + ': no such photo in photos.js'); });
  var holidays = {}, links = {};
  HOLIDAYS.forEach(function (h) { holidays[h[3]] = true; });
  Object.keys(BOOK).forEach(function (k) { BOOK[k].links.forEach(function (l) { links[l.name] = true; }); });
  ENTRY.links.forEach(function (l) { links[l.name] = true; });
  [['HOLIDAY_NAMES_EN', HOLIDAY_NAMES_EN, holidays], ['LINK_NAMES_EN', LINK_NAMES_EN, links]].forEach(function (x) {
    Object.keys(x[2]).forEach(function (n) { check(x[0] + '[' + JSON.stringify(n) + ']', n, x[1][n]); });
    Object.keys(x[1]).forEach(function (n) { need(x[2][n], x[0] + '[' + JSON.stringify(n) + ']: no such name in holidays.js or before.js'); });
  });
});

/* Colours only through the variables in :root (the project rule): outside the :root blocks the template's CSS has no hex
```

W `tests/run.sh` zamień:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/page.js"
```

na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js"
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: `tests/run.sh: missing file site2/src/en/photos.js`.

- [ ] **Krok 3: Podpisy i nazwy**

Utwórz `site2/src/en/names.js`:

```js
/* The names of the holidays (holidays.js) and of the links of „Przed wyjazdem” (BOOK and ENTRY in before.js) in English
   (stage 5, finding 8), by their Polish names. A name that is the same in both languages stands here too, so every new
   holiday and link needs its English name (tests/content.test.js). */
var HOLIDAY_NAMES_EN = {
  'Dzień Kultury Wietnamu': 'Vietnam Culture Day',
  'Nowy Rok': 'New Year’s Day',
  'Tết': 'Tết',
  'Święto Królów Hùng': 'Hùng Kings’ Commemoration Day',
  'Dzień Zjednoczenia i Święto Pracy': 'Reunification Day and Labour Day',
  'Święto Narodowe': 'National Day'
};
var LINK_NAMES_EN = {
  'Oxalis, Hang Én': 'Oxalis, Hang Én',
  'Oxalis, wszystkie wyprawy': 'Oxalis, all expeditions',
  'Park Cát Tiên, kontakt': 'Cát Tiên park, contact',
  'Park Cát Tiên, cennik': 'Cát Tiên park, prices',
  'Vietnam Airlines': 'Vietnam Airlines',
  'Vietjet': 'Vietjet',
  'Vietravel Airlines': 'Vietravel Airlines',
  'Viet Challenge, Tà Năng–Phan Dũng': 'Viet Challenge, Tà Năng–Phan Dũng',
  'Highland Adventure Travel, Tà Năng–Phan Dũng': 'Highland Adventure Travel, Tà Năng–Phan Dũng',
  'Da Lat Trip, Tà Năng 3 dni': 'Da Lat Trip, Tà Năng in 3 days',
  'Full Moon Travel Asia': 'Full Moon Travel Asia',
  'Cat Ba Ventures': 'Cat Ba Ventures',
  'Oxalis, Tú Làn w jeden dzień': 'Oxalis, Tú Làn in one day',
  'Rezerwat Pù Luông, formularz': 'Pù Luông reserve, form',
  'Cao Bang Eco Travel': 'Cao Bang Eco Travel',
  'Cao Bang Green Riders': 'Cao Bang Green Riders',
  'Park Yok Đôn, nocleg': 'Yok Đôn park, accommodation',
  'Park Yok Đôn, kontakt': 'Yok Đôn park, contact',
  'Park Yok Đôn, program słoni': 'Yok Đôn park, elephant programme',
  'Park Yok Đôn, biwak': 'Yok Đôn park, camping',
  'Du lịch Cúc Phương, kontakt': 'Du lịch Cúc Phương, contact',
  'Du lịch Cúc Phương, noclegi': 'Du lịch Cúc Phương, accommodation',
  'Du lịch Cúc Phương, nocna przejażdżka': 'Du lịch Cúc Phương, night ride',
  'Sapa O\'Chau, Fansipan w 2 dni': 'Sapa O’Chau, Fansipan in 2 days',
  'Park Phong Nha–Kẻ Bàng, Paradise Cave': 'Phong Nha–Kẻ Bàng park, Paradise Cave',
  'Paradise Cave': 'Paradise Cave',
  'ZingHome Ha Giang': 'ZingHome Ha Giang',
  'ZingHome Ha Giang, pętla 3 dni': 'ZingHome Ha Giang, 3-day loop',
  'ZingHome Ha Giang, pętla 4 dni': 'ZingHome Ha Giang, 4-day loop',
  'Baolau': 'Baolau',
  'Vexere': 'Vexere',
  'FUTA (Phương Trang)': 'FUTA (Phương Trang)',
  'Green SM Liên Tỉnh': 'Green SM Liên Tỉnh',
  'Park Bidoup–Núi Bà, kontakt': 'Bidoup–Núi Bà park, contact',
  'Park Bidoup–Núi Bà, formularz': 'Bidoup–Núi Bà park, form',
  'Park Bidoup–Núi Bà, cennik': 'Bidoup–Núi Bà park, prices',
  'Du lịch Cúc Phương, combo z Mây Bạc': 'Du lịch Cúc Phương, combo with Mây Bạc',
  'Mebayluon, rezerwacja': 'Mebayluon, booking',
  'Mebayluon, loty w Mù Cang Chải': 'Mebayluon, flights in Mù Cang Chải',
  'Local Vietnam, Mù Cang Chải z wędrówką': 'Local Vietnam, Mù Cang Chải with a trek',
  'Cao Bang Green Riders, cennik': 'Cao Bang Green Riders, prices',
  'Cao Bang Eco Travel, cennik': 'Cao Bang Eco Travel, prices',
  'ZingHome Ha Giang, cennik': 'ZingHome Ha Giang, prices',
  'Hoi An Transport Service': 'Hoi An Transport Service',
  'Hoi An Day Trip': 'Hoi An Day Trip',
  'Hidden Land Travel': 'Hidden Land Travel',
  'Tigit Motorbikes': 'Tigit Motorbikes',
  'Tigit Motorbikes (start w Đà Nẵng)': 'Tigit Motorbikes (start in Đà Nẵng)',
  'Green SM Green Tour': 'Green SM Green Tour',
  'Saigontourist': 'Saigontourist',
  'Grab, wynajem na godziny': 'Grab, hourly rental',
  'Tra Que Water Wheel': 'Tra Que Water Wheel',
  'LocalVietnam, Mỹ Sơn': 'LocalVietnam, Mỹ Sơn',
  'Park Cát Tiên, nocne safari': 'Cát Tiên park, night safari',
  'Hoi An Transport Service, Mỹ Sơn': 'Hoi An Transport Service, Mỹ Sơn',
  'Vietnam Vacation Travel, Mỹ Sơn': 'Vietnam Vacation Travel, Mỹ Sơn',
  'Mỹ Sơn, bilety online': 'Mỹ Sơn, tickets online',
  'Sapa Sisters': 'Sapa Sisters',
  'Sun World Fansipan Legend': 'Sun World Fansipan Legend',
  'Hoi An Transport Service, przejazdy z Đà Nẵng': 'Hoi An Transport Service, rides from Đà Nẵng',
  'Bilety elektroniczne': 'E-tickets',
  'Cennik': 'Prices',
  'E-wiza: evisa.gov.vn': 'E-visa: evisa.gov.vn',
  'Karta przylotu: prearrival.immigration.gov.vn': 'Arrival card: prearrival.immigration.gov.vn'
};
```

Utwórz `site2/src/en/photos.js`:

```js
/* The captions of the photos in English (stage 5, finding 8), by the ids of photos.js, where the author, the licence
   and the photo's page stay; each names the same place as the Polish caption. */
var PHOTO_CAPS_EN = {
  saigon_0: 'The Saigon river at blue hour',
  saigon_1: 'A lone mangrove tree off the Cần Giờ coast',
  saigon_2: 'A boardwalk through the Rừng Sác mangroves, Cần Giờ',
  saigon_3: 'Incense at Thiên Hậu Temple, Chợ Lớn',
  saigon_4: 'Dried goods at Bình Tây Market',
  mekong_0: 'A rower on the Mekong just before sunrise',
  mekong_2: 'The Cái Răng floating market, Cần Thơ',
  mekong_3: 'Selling from a boat in Phong Điền',
  mekong_1: 'A canal among nipa palms in the delta',
  phuquoc_0: 'Granite boulders on one of Phú Quốc’s beaches',
  phuquoc_1: 'Starfish in the shallows, Phú Quốc',
  phuquoc_2: 'Sunset over the Gulf of Thailand',
  phuquoc_5: 'A quiet beach near Hàm Ninh',
  cattien_0: 'A fishing boat on a lake in the Cát Tiên wetlands',
  cattien_1: 'Sunset over the Cát Tiên wetlands',
  cattien_3: 'The buttress roots of a lowland forest giant',
  cattien_4: 'The wetlands seen from the edge of the forest',
  dalat_0: 'On the Tà Năng trail in the dry season',
  dalat_1: 'A stream and a pool at Hòn Giao, Bidoup–Núi Bà National Park',
  dalat_2: 'Old pines in Bidoup–Núi Bà after rain',
  dalat_4: 'The view from Lang Biang mountain',
  dalat_3: 'Tents on the grassy hills of Tà Năng',
  hoian_0: 'Hội An’s waterfront on the Thu Bồn river',
  hoian_1: 'A basket boat among water coconut palms',
  hoian_4: 'Trần Phú Street in Hội An’s Old Town',
  hoian_5: 'An Bàng beach near Hội An',
  hoian_6: 'Temple groups B, C and D at Mỹ Sơn',
  hue_0: 'Emperor Minh Mạng’s tomb in Huế, in the mist',
  hue_1: 'The Minh Lâu pavilion at the tomb of Emperor Minh Mạng, Huế',
  hue_2: 'A pavilion by the lotus pond at the tomb of Emperor Tự Đức in Huế',
  hue_6: 'The tile-roofed Thanh Toàn bridge near Huế',
  hue_4: 'The Hải Vân pass above the sea',
  puluong_1: 'Sunset over the Pù Luông valley in November',
  puluong_2: 'A village among rice fields, Pù Luông',
  puluong_3: 'A bamboo raft poled along the river',
  puluong_0: 'The Pù Luông terraces at harvest time (September)',
  puluong_5: 'Weaving on a wooden loom at home',
  ninhbinh_1: 'A rowing boat below the cliffs of Tràng An',
  ninhbinh_0: 'Limestone karsts in Tràng An',
  ninhbinh_3: 'The Vân Long wetlands at golden hour',
  ninhbinh_4: 'A Delacour’s langur on a limestone crag',
  ninhbinh_5: 'Through a cave on the Tràng An water route',
  ninhbinh_6: 'Hoa Lư, the royal capital of the 10th century',
  catba_0: 'Junks on Lan Hạ Bay',
  catba_3: 'Morning mist over the islands off Cát Bà',
  catba_1: 'A small beach on Lan Hạ Bay',
  catba_2: 'A floating fish farm off Cát Bà',
  catba_6: 'Việt Hải village, Cát Bà National Park',
  hanoi_0: 'A train on Long Biên Bridge',
  hanoi_1: 'The main gate of the Temple of Literature',
  hanoi_3: 'A laterite lane in Đường Lâm village',
  hanoi_5: 'A stilt house in the garden of the Museum of Ethnology',
  babe_0: 'A boat on Ba Bể lake',
  babe_1: 'The still surface of Ba Bể lake',
  babe_2: 'A Tày stilt house by the lake',
  babe_3: 'The fields of Pác Ngòi between the lake and the hills',
  babe_5: 'Then singing to the sound of the tính lute',
  caobang_0: 'The Bản Giốc waterfall from the bamboo-raft jetty',
  caobang_6: 'Núi Mắt Thần, or Angel’s Eye mountain',
  caobang_1: 'Bản Giốc above the rice fields',
  caobang_2: 'Inside Ngườm Ngao Cave',
  caobang_3: 'Karst hills reflected in a rice field near Bản Giốc',
  phongnha_0: 'The Son river flowing deep into Phong Nha Cave',
  phongnha_1: 'Dripstone formations in Paradise Cave (Động Thiên Đường)',
  phongnha_2: 'The entrance to Hang Én Cave',
  phongnha_3: 'The Son river and Phong Nha town from the air',
  phongnha_4: 'Boats on the Son river at Phong Nha',
  cucphuong_0: 'A grey-shanked douc at the primate rescue centre in Cúc Phương',
  cucphuong_1: 'A forest path in Cúc Phương park',
  cucphuong_2: 'The thousand-year-old Chò tree deep in the Cúc Phương forest',
  cucphuong_3: 'A pangolin with its young at the pangolin rescue centre in Cúc Phương',
  cucphuong_4: 'An Asian forest tortoise at the turtle rescue centre in Cúc Phương',
  danang_0: 'A female red-shanked douc with her young on the Sơn Trà peninsula',
  danang_1: 'Basket boats on Mỹ Khê beach',
  danang_2: 'Huyền Không Cave in the Marble Mountains',
  danang_3: 'Hoàng Sa Road on the Sơn Trà peninsula',
  danang_4: 'A gallery of the Museum of Cham Sculpture in Đà Nẵng',
  hagiang_0: 'The Mã Pí Lèng pass above the canyon of the Nho Quế river',
  hagiang_1: 'The Tu Sản canyon and the Nho Quế river',
  hagiang_2: 'A road and terraces in Quản Bạ',
  hagiang_3: 'The two conical Cô Tiên hills in Quản Bạ',
  hagiang_4: 'The gate of the Vương family palace in Sà Phìn',
  sapa_0: 'Rice terraces of Hầu Thào and Tả Van above the Mường Hoa river',
  sapa_1: 'The summit marker on Fansipan, 3,143 m (2024)',
  sapa_2: 'The camp at 2,800 m on the Fansipan trail',
  sapa_3: 'The Hoàng Liên Sơn range from the Núi Xẻ ranger station',
  yokdon_0: 'Yok Đôn park in the dry season',
  yokdon_1: 'The Sêrêpốk river',
  yokdon_2: 'Dry dipterocarp forest near Buôn Ma Thuột',
  yokdon_3: 'A village elder’s stilt house in Buôn Ako Dhong, Buôn Ma Thuột',
  yokdon_4: 'The Đắk Lắk Museum in Buôn Ma Thuột',
  mucangchai_0: 'Terraces in La Pán Tẩn',
  mucangchai_1: 'Terraces below the Khau Phạ pass',
  mucangchai_2: 'Terraces in Chế Cu Nha',
  mucangchai_3: 'The valley below the Khau Phạ pass, seen from above',
  mucangchai_4: 'Terraces in Dế Xu Phình in the water season',
  sapa_4: 'Sa Pa seen from the slopes of the Hoàng Liên Sơn mountains'
};
```

W `site2/src/photos.js` zamień:

```js
/* Every photo the page shows: caption (Polish, the exact place), author, licence and its page on Wikimedia Commons.
```

na:

```js
/* Every photo the page shows: caption (Polish, the exact place; in English: site2/src/en/photos.js), author, licence and its
   page on Wikimedia Commons.
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-5.sh" MIESIAC
```

Oczekiwane: `ALL PASS` (w nim `english names ok`), grep nic nie wypisuje, `sondy (MIESIAC): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/en/names.js site2/src/en/photos.js site2/src/photos.js tests/content.test.js tests/run.sh
git commit -F - <<'EOF'
Podpisy zdjęć, nazwy świąt i nazwy linków po angielsku (etap 5, ustalenie 8): site2/src/en/photos.js z podpisem każdego z 97 zdjęć (autor, licencja i strona zdjęcia zostają w photos.js) i site2/src/en/names.js z nazwami sześciu świąt i 64 linków „Przed wyjazdem”, także tymi, które w obu językach brzmią tak samo, żeby nowy link zawsze dostał nazwę angielską; test treści: podpis dla każdego zdjęcia i nazwa dla każdego święta i linku, z tymi samymi liczbami i nazwami wietnamskimi co po polsku, po brytyjsku i dla każdego paszportu, bez wpisów, których nie ma w danych

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Nazwa Route G i interfejs po angielsku

Decyzja 3 i ustalenia 6, 8 i 12:
- **po polsku** w nagłówku „Route G” z podpisem „Wietnam po swojemu” (nowy klucz `hero.tag`, kursywą pod nazwą), w tytule karty „Route G · Wietnam po swojemu”, w planie na WhatsApp „Route G: 14 dni, marzec 2027” i w stopce „© 2026 Route G. Wszelkie prawa zastrzeżone.”; nadtytuł „Planer podróży po Wietnamie” bez zmian;
- **`UI.en`** w `site2/src/en/ui.js`, generowany w suchej próbie z tych samych linii co `UI.pl`: te same klucze w tej samej kolejności, po brytyjsku i według słowniczka z ustalenia 12, z kwotami „17–39M VND” i z „By month” obok „Exact dates” w wyborze terminu (dosłowne „Month and number of days” łamało się na telefonie w dwie linie);
- **test:** te same klucze co `UI.pl` i te same wartości do wstawienia (`{x}`), te same liczby i nazwy wietnamskie, styl brytyjski dla każdego paszportu, teksty dróg bez kierunku (uphill, back…), a po angielsku te same zdania o bezpieczeństwie: konwencja z 1968 r. z wyjątkami z umów, ryzyko jako dwa fakty, paszport nie w zastaw, wiza i strony rządowe.

**Pliki:**
- Utwórz: `site2/src/en/ui.js`
- Zmień: `site2/src/ui.js`, `site2/src/template.html`
- Testy: `tests/content.test.js`, `tests/run.sh`

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js

/* Colours only through the variables in :root (the project rule): outside the :root blocks the template's CSS has no hex
```

na:

```js

/* The interface in English (site2/src/en/ui.js, finding 8): UI.en has exactly the keys of UI.pl (finding 13), each with the
   values the page fills in ({name}) of its Polish text, the same numbers and Vietnamese names (finding 14), in British
   English for every passport (findings 15 and 16); a road text reads right both ways, as in Polish. */
contentCheck('english interface', function (need) {
  var pl = UI.pl, en = UI.en;
  function slots(t) { return (t.match(/\{[a-z]+\}/g) || []).sort().join(' '); }
  Object.keys(pl).forEach(function (k) { need(k in en, 'UI.en[\'' + k + '\'] is missing'); });
  Object.keys(en).forEach(function (k) {
    var w = 'UI.en[\'' + k + '\']', v = en[k];
    if (!(k in pl)) { need(false, w + ' is no key of UI.pl'); return; }
    need(typeof v === 'string' && v.trim() !== '', w + ' is empty');
    need(slots(v) === slots(pl[k]), w + ': fills in ' + (slots(v) || 'nothing') + ', the Polish ' + (slots(pl[k]) || 'nothing'));
    englishProblems(w, v).concat(factProblems(w, pl[k], v)).forEach(function (p) { need(false, p); });
    if (/^r\./.test(k)) need(!/(^|[^\p{L}])(uphill|downhill|back|at the end|at the start)(?![\p{L}])/iu.test(v), w + ' names a direction (' + v + '): a road text must read right both ways');
  });
  // the safety sentences in English too (decisions of 15.10.2026): the motorbike licence and permit of the 1968 convention,
  // the exceptions by agreement, the risk as two facts, the passport as no deposit, the visa and the government's sites
  need(/International Driving Permit under the 1968 Convention/.test(en['sw.note']) && /A car licence does not cover/.test(en['sw.note']) &&
    /Check which convention your country issues it under/.test(en['sw.note']) &&
    /Exceptions by agreement: a licence from an ASEAN country and a South Korean permit, though police at a check may not accept them straight away\.$/.test(en['sw.note']),
    'UI.en sw.note: the motorbike licence and the permit of the 1968 convention, a car licence not enough, the convention of your country, the exceptions by agreement');
  need(/\(WHO estimate\)\. Over 90% of those killed in 2023 died in crashes involving a motorbike \(national data\)\./.test(en['sw.risk']),
    'UI.en sw.risk: the WHO estimate and the national data of 2023 as two facts');
  need(/Do not leave your passport as a deposit/.test(en['sw.tips']), 'UI.en sw.tips: the passport is no deposit');
  need(/your passport needs one/.test(en['know.visa']) && /only on the government sites/.test(en['know.visa']), 'UI.en know.visa: whether your passport needs a visa; the government sites only');
});

/* Colours only through the variables in :root (the project rule): outside the :root blocks the template's CSS has no hex
```

W `tests/run.sh` zamień:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js"
```

na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js"
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: `tests/run.sh: missing file site2/src/en/ui.js`.

- [ ] **Krok 3: Nazwa i interfejs**

Utwórz `site2/src/en/ui.js`:

```js
/* The interface texts in English (stage 5, decisions of 15.10.2026): exactly the keys of UI.pl (site2/src/ui.js), in the
   same order; {name} marks a value the page fills in. British English, to one reader (you). Counted words keep the
   three forms of UI.pl, picked by nightForm() in page.js: in English .few and .many are both the plural. */
UI.en = {
  'doc.title': 'Route G · Vietnam, up to you',
  'nav.aria': 'Sections', 'nav.settings': 'Settings', 'nav.shape': 'At a glance', 'nav.days': 'Day by day', 'nav.before': 'Before you go',
  'nav.top': 'Back to top', 'nav.change': 'Change',
  'sum': '{term} · {days} days · {level}',
  'hero.alt': 'A woman rows a small boat on a river below limestone cliffs in Tràng An, Ninh Bình',
  'hero.eyebrow': 'Vietnam trip planner',
  'hero.h1': 'Route G',
  'hero.tag': 'Vietnam, up to you',
  'hero.lede': 'Set your dates, your airports, what you like and how adventurous you are. The page plans a route at once: the places, a plan for every day, the journeys and a map. You can then change it and send it as a link.',
  'hero.cta1': 'Set up your trip', 'hero.cta2': 'See the route',

  'set.eyebrow': 'Step 1', 'set.h2': 'Your trip',
  'set.p': 'The route changes with every setting, and the page’s address is a ready link to it.',
  'set.term': 'Dates', 'set.mode.month': 'By month', 'set.mode.dates': 'Exact dates',
  'set.month': 'Month', 'set.days': 'Number of days', 'set.start': 'Arrival day', 'set.end': 'Departure day',
  'set.days.note': 'Days count from arrival to departure, both included.',
  'set.airports': 'Airports', 'set.from': 'Fly into', 'set.to': 'Fly out of',
  'set.interests': 'What you like (two at most)',
  'set.interests.none': 'With nothing chosen, the route has a bit of everything.',
  'set.level': 'Adventure level',
  'int.kultura': 'Culture & history', 'int.jedzenie': 'Food', 'int.przyroda': 'Wildlife', 'int.gory': 'Mountains & caves', 'int.morze': 'Sea & islands',
  'lvl.1': 'Relaxed', 'lvl.2': 'Active', 'lvl.3': 'Extreme',
  'lvlp.1': 'Walks, day trips and the easy versions of days.',
  'lvlp.2': 'Full-day hikes, bikes and boats, nights at homestays.',
  'lvlp.3': 'Where possible, hard days with a licensed guide: longer routes and nights out in the wild. Elsewhere, days as at “Active”.',
  'mon.1': 'January', 'mon.2': 'February', 'mon.3': 'March', 'mon.4': 'April', 'mon.5': 'May', 'mon.6': 'June',
  'mon.7': 'July', 'mon.8': 'August', 'mon.9': 'September', 'mon.10': 'October', 'mon.11': 'November', 'mon.12': 'December',
  'mon3.1': 'Jan', 'mon3.2': 'Feb', 'mon3.3': 'Mar', 'mon3.4': 'Apr', 'mon3.5': 'May', 'mon3.6': 'Jun',
  'mon3.7': 'Jul', 'mon3.8': 'Aug', 'mon3.9': 'Sep', 'mon3.10': 'Oct', 'mon3.11': 'Nov', 'mon3.12': 'Dec',
  'monl.1': 'January', 'monl.2': 'February', 'monl.3': 'March', 'monl.4': 'April', 'monl.5': 'May', 'monl.6': 'June',
  'monl.7': 'July', 'monl.8': 'August', 'monl.9': 'September', 'monl.10': 'October', 'monl.11': 'November', 'monl.12': 'December',
  'set.err.airport': 'Choose the airports from the list.',
  'set.err.date': 'Give both dates: arrival and departure.',
  'set.err.month': 'Choose a month from the list.',
  'set.err.year': 'Choose a month and year from the list.',
  'set.err.days': 'A trip lasts {min} to {max} days, counting the arrival and departure days.',
  'set.err.interests': 'Choose two at most.',
  'set.err.level': 'Choose an adventure level.',
  'set.err.add': 'This place cannot be added.',
  'set.err.remove': 'This place cannot be removed.',
  'set.err.no_route': 'With these settings no route can be planned. Bring back the places you removed or change the airports.',
  'set.err.keep': ' The last route stays below.',
  'set.dropped': 'Part of the link was wrong, so the page used the default settings in its place.',

  'f.for': 'Your route: {from} → {to}, {term}',
  'f.days': 'days, {nights}',
  'nights.one': 'night', 'nights.few': 'nights', 'nights.many': 'nights',
  'f.places.one': 'place', 'f.places.few': 'places', 'f.places.many': 'places',
  'f.flights.one': 'domestic flight', 'f.flights.few': 'domestic flights', 'f.flights.many': 'domestic flights',
  'f.hikes.one': 'hiking day', 'f.hikes.few': 'hiking days', 'f.hikes.many': 'hiking days',
  'f.longest': 'longest day on the road',
  'f.budget': 'per person, roughly', 'f.budget.aria': 'Budget: {x} per person, roughly. Details under Before you go',
  'vnd': '{a}–{b}\u00a0VND', 'vnd.one': '{a}\u00a0VND', 'mln': '{a}–{b}M\u00a0VND', 'mln.one': '{a}M\u00a0VND',
  'vnd.upto': 'up to\u00a0{b}\u00a0VND', 'mln.upto': 'up to\u00a0{b}M\u00a0VND',
  'term.month': '{month} {year}',
  'alert.past': 'These dates have passed. Choose a new month or new dates, and the route will be planned again.',
  'alert.tet': 'Tết, days off about {span}: some places are closed, and transport and rooms sell out and cost more, also the week before and after. Book early.',
  'alert.holiday': '{name} (about {span}): a national holiday, so travel and popular places are busier. Book transport and rooms earlier.',
  'alert.nodata': 'For part of these dates the page has no holiday dates. Check the dates of Tết and the national holidays.',
  'alert.int_bad': '{x}: {places} has a poor season {when} ({why}).',
  'alert.int_bad_many': '{x}: {places} have a poor season {when} ({why}).',
  'alert.int_none': '{x}: no place on this route suits it well. The reasons are below, under “Not on your route”.',

  'shape.eyebrow': 'At a glance', 'shape.h2': 'All {days} days',
  'shape.p': 'One square is one day, in the colour of the place where you sleep. A dot marks an arrival day.', 'shape.click': 'Click a day to go to it.',
  'day': 'Day', 'days': 'Days',
  'flyhome': 'Departure', 'flyhome.aria': 'Day {days}: flight out of {airport}',
  'missing': 'Did not fit: {x}. The rest of the route is unchanged.',
  'copy.btn': 'Copy plan for WhatsApp', 'copy.aria': 'The plan as text', 'copy.ok': 'Copied. Paste the plan into a chat.', 'copy.fail': 'Copy the selected text below.',
  'pdf.btn': 'Save route as PDF',
  'pdf.hint': 'A print window opens. On an iPhone tap Share at the top, then “Save to Files”; on Android choose “Save as PDF” at the top, and on a computer the “Save as PDF” printer. You can then open the PDF without internet.',

  'days.eyebrow': 'Day by day', 'days.h2': 'Route', 'map.aria': 'Route map',
  'days.p': 'Every place with photos, a plan for each day and how to get there.', 'days.p_map': 'The map is to scale, and on a large screen it stays in view as you scroll.',
  'pace.travel': 'Travel day', 'pace.hike': 'Active hike', 'pace.nature': 'Easy nature', 'pace.boat': 'Day on the water',
  'pace.culture': 'Easy sightseeing', 'pace.rest': 'Rest day',
  'badge.easy': 'Relaxed version', 'badge.hard': 'Hard day', 'badge.self': 'Riding yourself', 'early': 'Up before 6',
  't.rain': 'When it rains: ', 't.gem': 'Hidden gem', 't.skip': 'Skip', 't.instead': 'Instead: ',
  'reg.south': 'southern Vietnam', 'reg.centre': 'central Vietnam', 'reg.north': 'northern Vietnam',
  'home.h3': 'Flight out of {airport}', 'home.t': 'To the airport and the flight home',
  'home.d': 'The last day stays light, as the page does not know when your flight leaves.',
  'home.far': 'The drive to the airport takes {time}: for a morning flight, leave very early or spend the last night closer to the airport.',

  'fly': 'Flight', 'door': 'door to door', 'longday': 'Long day on the road', 'maps': 'Route in Google Maps',
  'leg.airport': '{x} airport',
  'min': 'min', 'h': 'h', 'fmt.hm': '{h} h {m} min',
  'r.taxi_from': 'Taxi or transfer from {x} airport',
  'r.taxi_to': 'Taxi to {x} airport',
  'r.van_car': 'Limousine van or private car',
  'r.van_ferry': 'Limousine van and a short ferry',
  'r.bus_mekong': 'Bus or private car to Phong Điền',
  'r.bus_mekong_from': 'Bus or private car from Phong Điền',
  'r.car_cattien': 'Private car or bus, and at the park a ferry across the Đồng Nai river',
  'r.car_baoloc': 'Private car on the mountain road through Bảo Lộc',
  'r.haivan': 'Car with a driver over the Hải Vân pass, with a stop by the Lăng Cô lagoon; when the pass is in cloud, the driver takes the tunnel',
  'r.air_ninhbinh': 'Car with a driver or limousine van, both booked ahead',
  'r.air_hue': 'Car with a driver booked ahead, through the tunnel under the Hải Vân pass',
  'r.air_catba': 'Car with a driver booked ahead and the short Đồng Bài – Cái Viềng ferry',
  'r.air_mekong': 'Car with a driver booked ahead or, slower, a bus via the Miền Tây bus station and Cần Thơ',
  'r.air_cattien': 'Car with a driver booked ahead, and at the park a ferry across the Đồng Nai river, which runs only by day',
  'r.air_car': 'Car with a driver booked ahead',
  'r.air_thd': 'Taxi or car with a driver booked ahead',
  'r.air_puluong': 'Car with a driver booked ahead, best through your hosts in Pù Luông',
  'r.air_phongnha_dad': 'Car with a driver booked ahead, on the expressway, without the Hải Vân pass',
  'r.air_phongnha_hui': 'Car with a driver booked ahead, on the expressway north',
  'r.haivan_self': 'Motorbike rented one way, over the Hải Vân pass with a stop by the Lăng Cô lagoon; your luggage goes by car, and motorbikes may not use the tunnel, so in fog slow down or wait it out',
  'n.afternoon': 'A long drive to the airport first: choose an afternoon flight.',
  'n.long': 'The journey takes the whole day: set off early.',
  'n.ferry_in': 'The last crossing to {x} is at about {last}: choose a flight that lands by about {land} at the latest.',
  'n.ferry_out': 'The first crossing from {x} is at about {first}, so you will be at the airport at about {at} at the earliest.',
  'n.flight_days': 'The {a} – {b} flight runs only {days}: plan this day around it.', 'f.days_tts': 'on Tuesdays, Thursdays and Saturdays',
  'n.solo_long': 'After the morning plan at the previous place, a long road is left and you will arrive in the evening. To travel in daylight, skip the morning plan.',

  'pt.title': 'Route G: {days} days, {term}',
  'pt.route': '{from} → {to}',
  'pt.profile': 'You like: {x}. Level: {lvl}.',
  'pt.any': 'a bit of everything',
  'pt.arrive': 'Day 1: arrival in {airport}',
  'pt.home': 'Day {days}: flight out of {airport}',
  'pt.flights': 'Domestic flights: ',
  'pt.budget': 'Budget per person, without flights to Vietnam: about {x}.',
  'pt.link': 'This plan on the site: ',

  'g.open': 'Open photo {i} of {n} full screen', 'g.show': 'Show photo {i}', 'g.photos': 'Photos: {x}',
  'g.prev': 'Previous photo', 'g.next': 'Next photo', 'g.full': 'Full screen',
  'lb.aria': 'Photo viewer', 'lb.close': 'Close the photo viewer', 'lb.photo': 'Photo: ',
  'm.north': 'North', 'm.centre': 'Centre', 'm.south': 'South', 'm.china': 'China', 'm.laos': 'Laos', 'm.cambodia': 'Cambodia',
  'm.sea': 'South China Sea', 'm.tonkin': 'Gulf of Tonkin', 'm.road': 'Road', 'm.flight': 'Flight', 'm.airports': 'Arrival and departure airport',
  'm.scale': 'Each panel has its own scale and scale bar', 'm.km': '{n} km', 'm.zoom': 'Click the map to enlarge it', 'm.close': 'Close the large map',
  'm.dialog': 'Route map, enlarged', 'm.title': 'Route map: ',
  'off.h3': 'Not on your route', 'off.p': 'Each place has its reason. “Add” plans the route again with that place.',
  'off.add': 'Add', 'off.add.aria': 'Add {x} to the route', 'off.missing': 'did not fit', 'off.reset': 'Back to the route without changes',
  'off.r.removed': 'removed by you', 'off.r.level': 'only at the “{lvl}” level', 'off.r.closed': 'closed on these dates', 'off.r.closed_part': 'closed for part of these dates',
  'off.r.season': 'out of season ({why})', 'off.r.profile': 'does not match what you like', 'off.r.far': 'too far for this many days',
  'off.r.beaten': 'with {days} days, other places won',
  'off.drops': 'Adding it drops: {list}.', 'off.nodrops': 'It fits without removing other places.',
  'off.shorter': 'It fits without removing other places, but shortens the stay in: {list}.',
  'off.dropped': 'To fit {x}, the route dropped: {list}.', 'off.came': 'Also new on the route: {list}.', 'off.came_only': 'Adding {x} also brought in: {list}.',
  'sw.caobang': 'Cao Bằng loop', 'sw.hagiang': 'Hà Giang loop', 'sw.haivan': 'Over the Hải Vân pass', 'sw.driver': 'With a driver', 'sw.self': 'Ride yourself',
  'sw.note': 'Ride yourself only with a motorbike licence and an International Driving Permit under the 1968 Convention, both on you. A car licence does not cover even a 110–125 cc scooter. Check which convention your country issues it under: a 1949 permit does not work in Vietnam. Exceptions by agreement: a licence from an ASEAN country and a South Korean permit, though police at a check may not accept them straight away.',
  'sw.req.h': 'What it takes. ', 'sw.risk.h': 'Risk. ', 'sw.tips.h': 'Advice. ',
  'sw.req': 'The motorbike must carry its registration papers and compulsory third-party insurance, and a helmet that meets the standard must be fastened, for a passenger too. Check your own policy’s terms to see whether it covers riding a motorbike.',
  'sw.risk': 'About 17,000 people die on Vietnam’s roads every year (WHO estimate). Over 90% of those killed in 2023 died in crashes involving a motorbike (national data). After a crash you face criminal liability, compensation and a ban on leaving the country until the investigation ends. Riding without a valid licence means a fine of 2–4M VND and the motorbike impounded, and your insurer may not pay. Police check foreigners.',
  'sw.tips': 'Do not leave your passport as a deposit; ask to pay a cash deposit instead. Do not ride after dark, slow down in rain and fog, and on hairpins watch for gravel and lorries.',
  'sw.tips.caobang': 'On the loop, 80–100 km a day is sensible. Fill up at every chance, as there are few petrol stations outside town.',
  'sw.tips.hagiang': 'Pick up and return the motorbike in Hà Giang town. On the loop, 100–150 km a day is sensible, so set off in the morning; the sharpest bends and the most lorries are on the Bắc Sum and Mã Pí Lèng passes. Đồng Văn, Mã Pí Lèng and Lũng Cú lie in the border zone: the police immigration office in Hà Giang town issues the permit for about 230,000–300,000 VND, and your hotel can arrange it too. Do not turn off onto roads towards the border.',
  'sw.risk.hagiang': 'Since 12 April 2026 the provincial police have been checking the road to Đồng Văn, especially foreigners on rented motorbikes, and some rental shops and agencies (about 30) have pledged not to hand over a motorbike without the required licence. In 2026 two tourists died on the loop, both riding pillion behind a local driver.',
  'sw.tips.haivan': 'Motorbikes may not use the tunnel, so the only way is over the top of the pass. Leave in the morning, ahead of the traffic and the fog.',
  'stop.remove': 'Remove', 'stop.remove.aria': 'Remove {x} from the route', 'tag.added': 'Added',
  'why.on': 'Picked because: {x}.', 'why.added': 'added by you', 'why.from': 'arrival airport', 'why.to': 'departure airport',
  'why.way': 'on the way', 'why.night': 'Splits the road from {a} to {b} into two shorter days.',
  'season.D': 'good season', 'season.S': 'fair season', 'season.Z': 'poor season',
  'wx.first': 'Weather {when}: {x}.', 'wx.month': '{t} °C, {mm} mm of rain, {days}',
  'wx.days.one': 'rainy day', 'wx.days.few': 'rainy days', 'wx.days.many': 'rainy days',
  'wx.upal': 'heat', 'wx.deszcz': 'rainy season', 'wx.szaro': 'grey, little sun', 'wx.chlod': 'cool nights and cloud',
  'wx.morze': 'cold sea', 'wx.fale': 'rough sea', 'wx.ulewy': 'downpours on most days', 'wx.tajfuny': 'typhoon season', 'wx.powodzie': 'flood season',
  'wx.tarasy': 'terraces after the harvest, without rice',
  'ev.event': 'On these dates', 'ev.warn': 'Take care on these dates',

  'before.eyebrow': 'Before you go', 'before.h2': 'Budget, bookings and packing',
  'before.p': 'Everything worked out for this route. Check prices and booking times with the carriers and operators too.',
  'bud.h3': 'Budget', 'bud.two': 'per person, two sharing a room and a car.', 'bud.one': 'Travelling alone: {x}.',
  'bud.nights': 'Accommodation', 'bud.day': 'Food and small expenses', 'bud.travel': 'Transport and domestic flights', 'bud.trips': 'Tours, guides and cruises',
  'bud.top': 'The biggest costs: {x}.', 'bud.item': '{name} ({x})',
  'bud.note': 'Without flights to Vietnam, insurance and souvenirs. Prices checked in {month} {year}.',
  'bud.tet': 'These dates include Tết: rooms usually cost 20–50% more, buses 40–60% more, and domestic flights 2–3 times as much, so the amounts will be higher.',
  'bud.holiday': 'These dates include a long weekend ({x}): prices are often higher and fewer places are free.',
  'bud.holidays': 'These dates include long weekends: {x}. Prices are often higher then and fewer places are free.',
  'cost.flights': 'domestic flights', 'cost.saigon.cangio': 'a day in Cần Giờ', 'cost.mekong.sampan': 'a sampan on the Phong Điền canals', 'cost.mekong.market': 'a boat to the Cái Răng market',
  'cost.mekong.conson': 'a boat to Cồn Sơn', 'cost.phuquoc.north': 'a car in the north of Phú Quốc', 'cost.phuquoc.east': 'a car on the east coast of Phú Quốc',
  'cost.cattien.safari': 'a night safari in Cát Tiên', 'cost.cattien.gibbons': 'gibbons at dawn', 'cost.cattien.bausau_day': 'the hike to Bàu Sấu',
  'cost.cattien.trees': 'a walk to the giant trees', 'cost.cattien.bausau_night': 'a night at Bàu Sấu', 'cost.dalat.bidoup': 'a guide in Bidoup–Núi Bà',
  'cost.dalat.cablecar': 'the cable car to Trúc Lâm', 'cost.dalat.langbiang': 'the climb up Lang Biang', 'cost.dalat.train': 'the old railway to Trại Mát',
  'cost.dalat.caudat': 'a car to the Cầu Đất hills', 'cost.dalat.tanang': 'the Tà Năng–Phan Dũng trail over two days', 'cost.hoian.cooking': 'a cooking class in Trà Quế',
  'cost.hoian.myson': 'Mỹ Sơn: ticket and a car with a driver', 'cost.hoian.myson_tour': 'a group tour to Mỹ Sơn', 'cost.hue.citadel': 'the Imperial City in Huế',
  'cost.hue.tombs': 'the emperors’ tombs', 'cost.hue.boatcar': 'a dragon boat and the tombs', 'cost.hue.lagoon': 'Thanh Toàn and the Tam Giang lagoon',
  'cost.puluong.guide': 'a guide in Pù Luông', 'cost.puluong.car': 'a car in the Pù Luông valleys', 'cost.puluong.summit': 'the climb to the Pù Luông summit',
  'cost.ninhbinh.vanlong': 'a boat on Vân Long', 'cost.ninhbinh.trangan': 'a boat in Tràng An', 'cost.ninhbinh.car': 'a car to Hoa Lư',
  'cost.catba.cruise': 'a cruise on Lan Hạ Bay', 'cost.catba.viethai': 'by bike to Việt Hải', 'cost.catba.viethai_boat': 'by boat to Việt Hải',
  'cost.hanoi.duonglam': 'a trip to Đường Lâm', 'cost.hanoi.battrang': 'a trip to Bát Tràng', 'cost.babe.boat': 'a boat on Ba Bể lake',
  'cost.babe.guide': 'a guide at Ba Bể lake', 'cost.babe.cooking': 'a cooking class with your hosts', 'cost.caobang.car': 'a driver on the Cao Bằng loop',
  'cost.caobang.easyrider': 'an easy rider on the Cao Bằng loop', 'cost.caobang.moto': 'a motorbike on the Cao Bằng loop',
  'cost.hagiang.car': 'a driver on the Hà Giang loop', 'cost.hagiang.easyrider': 'an easy rider on the Hà Giang loop', 'cost.hagiang.moto': 'a motorbike on the Hà Giang loop',
  'cost.hagiang.permit': 'the border zone permit in Hà Giang',
  'cost.sapa.trek': 'a guide in the Mường Hoa valley', 'cost.sapa.cablecar': 'the cable car up Fansipan', 'cost.sapa.car': 'a car with a driver around Sa Pa',
  'cost.yokdon.boat': 'a boat on the Sêrêpốk', 'cost.yokdon.elephants': 'the elephants in Yok Đôn', 'cost.yokdon.trek': 'the Yok Đôn forest with a guide',
  'cost.yokdon.cooking': 'a cooking class with an Ê Đê family', 'cost.yokdon.camp': 'a night in the Yok Đôn forest',
  'cost.mucangchai.trek': 'a guide in Mù Cang Chải', 'cost.mucangchai.car': 'a car with a driver around Mù Cang Chải',
  'cost.mucangchai.paragliding': 'a paragliding flight over Khau Phạ',
  'cost.sapa.fansipan': 'the climb up Fansipan over two days', 'cost.sapa.descent': 'the walk down Fansipan or the cable car', 'cost.haivan.car': 'a car over the Hải Vân pass',
  'cost.haivan.moto': 'a motorbike over the Hải Vân pass',
  'cost.phongnha.cave': 'a boat to Phong Nha Cave', 'cost.phongnha.paradise': 'Paradise Cave', 'cost.phongnha.paradise7': '7 km in Paradise Cave',
  'cost.phongnha.darkcave': 'Hang Tối and the Chày river', 'cost.phongnha.tulan': 'Tú Làn in one day', 'cost.phongnha.hangen': 'the Hang Én expedition',
  'cost.phongnha.botanic': 'the Phong Nha botanic garden', 'cost.phongnha.mooc': 'the Nước Moọc stream',
  'cost.cucphuong.centres': 'the rescue centres in Cúc Phương', 'cost.cucphuong.night': 'the night ride in Cúc Phương', 'cost.cucphuong.car': 'a car to Bống',
  'cost.cucphuong.maybac': 'a guide to Mây Bạc',
  'cost.danang.sontra': 'a car on Sơn Trà', 'cost.haivan.car_dn': 'a car over the Hải Vân pass from Đà Nẵng', 'cost.haivan.moto_dn': 'a motorbike over the Hải Vân pass from Đà Nẵng',
  'book.h3': 'Book ahead', 'book.p': 'Most urgent first. Amounts per person, for two people.', 'book.cost': 'about {x} per person', 'book.upto': '{x} per person', 'book.both': 'both ways',
  'book.tet': 'For Tết, book well ahead: domestic flights 2–3 months before, cruises and homestays 1–2 months, cars with a driver 3–4 weeks.',
  'book.none': 'Nothing on this route needs booking far ahead. Book your rooms a week or two before.',
  'b.phongnha.hangen': 'The Hang Én expedition with Oxalis: about 2 months ahead; for March, April and the summer 3–4 months.',
  'b.phongnha.tulan': 'Tú Làn in one day with Oxalis: 1–2 weeks ahead, at peak times 3–4 weeks.',
  'b.haivan.car_dn': 'A car with a driver from Đà Nẵng to Huế over the Hải Vân pass: 1–3 days ahead, for Tết and long weekends 1–2 weeks.',
  'b.haivan.moto_dn': 'A one-way motorbike from Đà Nẵng to Huế, with your luggage carried: 2–3 days ahead.',
  'b.cucphuong.stay': 'A night in Cúc Phương park, and with it the night ride, where overnight guests go first: 3–7 days ahead, for a weekend 1–2 weeks, in the butterfly and firefly season 3–4 weeks.',
  'b.cucphuong.maybac': 'A park guide to Mây Bạc: 2–3 days ahead, at peak times 1–2 weeks.',
  'b.cucphuong.car': 'A car with a driver for a day to Bống: the day before.',
  'b.phongnha.paradise7': '7 km in Paradise Cave: 3–7 days ahead, at peak times 1–2 weeks.',
  'b.sapa.fansipan': 'Fansipan on foot over two days, with a company that arranges the park’s permission: 3–7 days ahead, at peak times 1–2 weeks. Ask for the company’s licence number and whether the guide has an entry card issued by the park.',
  'b.yokdon.stay': 'A night at the Yok Đôn park guesthouse, and the boat: 3–7 days ahead, for a weekend 1–2 weeks, on holidays 3–4 weeks.',
  'b.yokdon.elephants': 'The elephants in Yok Đôn: 3–7 days ahead, on holidays 2–3 weeks.',
  'b.yokdon.camp': 'A night in the Yok Đôn forest with a park guide: 3–7 days ahead, at peak times 2 weeks.',
  'b.mucangchai.paragliding': 'A tandem paragliding flight from Khau Phạ: 3–5 days ahead, in the golden terrace season and during the festival 1–2 weeks. Flights depend on the wind, so keep a second date free.',
  'b.mucangchai.trek': 'A guide for the walk from Chế Cu Nha to La Pán Tẩn: 2–3 days ahead, in the golden terrace season about a week.',
  'b.mucangchai.car': 'A car with a driver for a day around Mù Cang Chải: the day before.',
  'b.sapa.trek': 'A guide for the walk through Lao Chải and Tả Van: 1–2 days ahead, in the golden terrace season and on holidays about a week.',
  'b.sapa.car': 'A car with a driver for a day around Sa Pa: the day before, at peak times 2–3 days.',
  'b.flights': 'Domestic flights: {x}. Buy them about 3 weeks ahead.',
  'b.cattien.bausau_night': 'A night at Bàu Sấu in Cát Tiên park: 2–4 weeks ahead, on holidays at least a month.',
  'b.catba.cruise': 'A Lan Hạ Bay cruise with a night on board, sailing from Cát Bà: 1–2 weeks ahead, from October to April 2–4 weeks.',
  'b.homestay': 'Homestays: {x}. Book 1–2 weeks ahead.',
  'b.homestay.puluong': 'In Pù Luông, in the golden terrace season and on long weekends 4–6 weeks ahead.',
  'b.homestay.hagiang': 'In Đồng Văn and Du Già, in the buckwheat flower season (October–December) 2–3 weeks ahead.',
  'b.homestay.mucangchai': 'In Mù Cang Chải 3–4 weeks ahead in the golden terrace season (late August – mid-October) and for 2 September.',
  'b.puluong.summit': 'The climb to the Pù Luông summit: 3–7 days ahead, at peak times 2–3 weeks.',
  'b.caobang.car': 'A car with a driver or a motorbike guide (easy rider) for the Cao Bằng loop: 3–7 days ahead, at peak times 2–4 weeks.',
  'b.caobang.easyrider': 'A motorbike guide (easy rider) for the Cao Bằng loop: 3–7 days ahead.',
  'b.caobang.moto': 'A motorbike for the Cao Bằng loop: 1–3 days ahead, at peak times 1–2 weeks.',
  'b.hagiang.car': 'A car with a driver or a motorbike guide (easy rider) for the Hà Giang loop, through a licensed agency: 3–7 days ahead, at peak times 3–4 weeks.',
  'b.hagiang.easyrider': 'A motorbike guide (easy rider) for the Hà Giang loop, through a licensed agency: 3–7 days ahead.',
  'b.hagiang.moto': 'A motorbike for the Hà Giang loop: 1–3 days ahead, at peak times 1–2 weeks.',
  'b.haivan.car': 'A car with a driver over the Hải Vân pass: 1–3 days ahead.',
  'b.haivan.moto': 'A one-way motorbike over the Hải Vân pass, with your luggage carried: 2–3 days ahead.',
  'b.transfer': 'Limousine vans and intercity buses: 1–2 days ahead.',
  'b.airport': 'A car with a driver from or to the airport: {x}. Book 2–3 days ahead.',
  'b.dalat.bidoup': 'A guide in Bidoup–Núi Bà park: 2–3 days ahead.',
  'b.dalat.langbiang': 'A guide for Lang Biang: 2–3 days ahead, once the park confirms that the trail is open.',
  'b.dalat.tanang': 'The Tà Năng–Phan Dũng trail with an agency from Đà Lạt: 1–2 weeks ahead, and 3–4 weeks for weekends in January–April, for Tết and for 30 April. Ask about the agency’s licence and the forest manager’s permission, and make sure the return to Đà Lạt is included.',
  'b.saigon.cangio': 'A car with a driver for a day to Cần Giờ: 1–2 days ahead.',
  'b.hanoi.duonglam': 'A trip to Đường Lâm: 1–2 days ahead.',
  'b.hoian.cooking': 'A cooking class in Trà Quế: 1–2 days ahead.',
  'b.hoian.myson': 'A car with a driver to Mỹ Sơn for 5:00: the day before, at peak times (December–January, Tết, 30 April – 1 May, 2 September) 2–3 days.',
  'b.hoian.myson_tour': 'A group tour to Mỹ Sơn with the return by boat: 1–2 days ahead, at peak times 3–7 days.',
  'b.cattien.park': '{x}: sign up the day before at the latest.',
  'b.puluong.guide': 'A guide in Pù Luông: the day before at the latest.',
  'know.h3': 'Good to know', 'know.links': 'Government sites only: ',
  'know.visa': 'Visa: check whether your passport needs one. Apply for an e-visa and fill in the arrival card only on the government sites, as fake sites pretend to be them.',
  'know.vape': 'E-cigarettes: together with heated tobacco they are illegal in Vietnam, bringing them in included, and using one can mean a fine of 3–5M VND and the device destroyed, so leave them at home.',
  'pack.h3': 'What to pack',
  'p.warm': 'A warm layer and a hat: nights in {x} can be cool, down to about {t}\u00a0°C.',
  'p.rain': 'A rain jacket or poncho: it often rains in {x} at this time of year.',
  'p.leeches': 'Leech socks for forest trails: {x}.', 'p.torch': 'A head torch for the night in the forest: {x}.', 'p.swim': 'Swimwear: {x}.',
  'p.moto': 'For the motorbike, your own gloves and rain jacket; check the certified helmet when you rent.',
  'p.mosquito': 'Insect repellent with DEET and long sleeves: dengue occurs across the country, and the mosquitoes bite mostly by day.',

  'ft.photos': 'Photos · Wikimedia Commons', 'ft.notes': 'Notes',
  'ft.notes.p': 'Travel times are door-to-door estimates, with about 1½ h at the airport for each flight. Connections were checked in October 2026. Before you go, check flight timetables, opening hours, trail rules and sea conditions with the carrier and on the spot. Hard days only with a licensed guide or operator. Map outlines: Natural Earth, public domain.',
  'ft.pd': 'public domain',
  'ft.copy': '© 2026 Route G. All rights reserved.'
};
```

W `site2/src/template.html` zamień:

```html
.hero h1 em { font-style: italic; }
```

na:

```html
.hero-tag { margin-top: 6px; font: italic 400 clamp(22px, 2.8vw, 34px) var(--display); letter-spacing: -0.01em; }
```

W `site2/src/template.html` zamień:

```html
      <h1 data-i18n-html="hero.h1"></h1>
```

na:

```html
      <h1 data-i18n="hero.h1"></h1>
      <p class="hero-tag" data-i18n="hero.tag"></p>
```

W `site2/src/ui.js` zamień:

```js
/* The interface texts. Polish is the base language; another one would be UI.<code> with exactly these keys.
```

na:

```js
/* The interface texts. Polish is the base language; English is UI.en in site2/src/en/ui.js, with exactly these keys (stage 5).
```

W `site2/src/ui.js` zamień:

```js
  'doc.title': 'Wietnam po swojemu',
```

na:

```js
  'doc.title': 'Route G · Wietnam po swojemu',
```

W `site2/src/ui.js` zamień:

```js
  'hero.h1': 'Wietnam <em>po</em> swojemu',
```

na:

```js
  'hero.h1': 'Route G',
  'hero.tag': 'Wietnam po swojemu',
```

W `site2/src/ui.js` zamień:

```js
  'pt.title': 'Wietnam po swojemu: {days} dni, {term}',
```

na:

```js
  'pt.title': 'Route G: {days} dni, {term}',
```

W `site2/src/ui.js` zamień:

```js
  'ft.copy': '© 2026 Wietnam po swojemu. Wszelkie prawa zastrzeżone.'
```

na:

```js
  'ft.copy': '© 2026 Route G. Wszelkie prawa zastrzeżone.'
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-5.sh" MIESIAC
```

Oczekiwane: `ALL PASS` (w nim `english interface ok`), grep nic nie wypisuje, `sondy (MIESIAC): 0 z 19 nie przeszło` (polska strona z nazwą Route G mieści formularz na pierwszym ekranie telefonu).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/en/ui.js site2/src/template.html site2/src/ui.js tests/content.test.js tests/run.sh
git commit -F - <<'EOF'
Nazwa Route G i interfejs po angielsku (etap 5, decyzja 3, ustalenia 6, 8 i 12): po polsku w nagłówku „Route G” z podpisem „Wietnam po swojemu” (nowy klucz hero.tag), w tytule karty, w planie na WhatsApp i w stopce „© 2026 Route G. Wszelkie prawa zastrzeżone.”; UI.en w site2/src/en/ui.js z tymi samymi kluczami co UI.pl, w tej samej kolejności, po brytyjsku i według słowniczka z sesji decyzji (Relaxed, Active, Extreme; Culture & history…; With a driver, Ride yourself; At a glance, Day by day, Before you go, Good to know; Picked because, Not on your route; homestay; good, fair, poor season), z kwotami „17–39M VND”; strona pokaże go od zadania 7; test treści: te same klucze i te same wartości do wstawienia ({x}) co po polsku, te same liczby i nazwy wietnamskie, styl brytyjski dla każdego paszportu, teksty dróg bez kierunku i te same zdania o bezpieczeństwie po angielsku (konwencja z 1968 r., wyjątki z umów, ryzyko jako dwa fakty, paszport nie w zastaw, wiza i strony rządowe)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Przełącznik EN · PL i język w linku

Decyzje 1 i 2, ustalenia 1–5, 9 i 18. Od tego zadania strona jest domyślnie po angielsku:
- **przełącznik EN · PL** w prawym górnym rogu zdjęcia: dwa przyciski po co najmniej 44 px z `aria-pressed`, w grupie „Language” / „Język strony”, aktywny podkreślony, przewija się ze stroną, w druku ukryty; przełączenie od razu zmienia teksty, bez przeładowania i bez wpisu w historii przeglądarki; trasa, ustawienia i zmiany „Dodaj/Usuń” zostają, formularz wraca do ustawień trasy, a chwilowe komunikaty znikają;
- **język w linku:** polski dopisuje `&lang=pl` na końcu adresu, a z nim w planie na WhatsApp i w linku w PDF; link bez `lang=` (każdy sprzed etapu 5) albo z inną wartością otwiera się po angielsku, a adres traci `lang=xx`; `lang=pl` wpisane samo otwiera domyślną trasę po polsku;
- **teksty w języku strony:** teksty miejsc (`localContent`), podpisy, święta, nazwy linków, mapa (kadry, morza, kraje), daty w pasku dni („Thu 28 Jan”), „good season in March and April” (klucz `season.when`), listy z „and” (klucz `and`), krótkie nazwy miejsc w obu językach nierozdzielne;
- **build:** `<html lang="en">`, podgląd linku po angielsku („Route G · Vietnam, up to you”, angielski opis, `og:locale` en_GB), zdanie dla przeglądarki bez JavaScriptu po angielsku i pod nim po polsku, plik offline `Route-G.html` z przełącznikiem, kolejność skryptów z plikami `en/`;
- **README** po angielsku z akapitem po polsku;
- **układ:** zdanie pod mapą może się łamać (po angielsku przy 320 px było szersze niż mapa), a na ekranach węższych niż 360 px tekst na zdjęciu zaczyna się 14 px niżej, pod przełącznikiem (polski nadtytuł);
- **sondy w obu językach:** `L()` i `goTo()` w `lib.js`, polskie i angielskie oczekiwania w `before.js`, `changes.js`, `link.js`, `pdf.js`, `publish.js` i `settings.js` (która sprawdza też, że przełącznik nie zachodzi na teksty zdjęcia), nowa sonda `lang.js`; test treści pilnuje przełącznika w szablonie i jego ukrycia w druku.

**Pliki:**
- Utwórz: `tests/probes/lang.js`
- Zmień: `site2/src/app.js`, `site2/src/template.html`, `site2/src/ui.js`, `site2/src/en/ui.js`, `site2/build.py`, `README.md`
- Testy: `tests/content.test.js`, `tests/probes/lib.js`, `before.js`, `changes.js`, `link.js`, `pdf.js`, `publish.js`, `settings.js`

- [ ] **Krok 1: Testy i sondy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js

/* What the parks and the entry rules allow today (research/<id>-2026-10.md, research/wjazd-2026-10.md): every plan that
```

na:

```js

/* The language switch (stage 5, findings 1 and 2): EN · PL in the photo at the top, two buttons with their languages,
   not printed. */
contentCheck('language switch', function (need) {
  var tpl = readFile('site2/src/template.html');
  need(/<header class="hero" id="top">[\s\S]*<div class="lang-switch" id="lang-switch" role="group" data-i18n-aria="lang.aria"><button type="button" data-lang="en" lang="en" aria-pressed="false">EN<\/button><span aria-hidden="true">·<\/span><button type="button" data-lang="pl" lang="pl" aria-pressed="false">PL<\/button><\/div>[\s\S]*<\/header>/.test(tpl),
    'template.html: the switch EN · PL in the photo at the top');
  need(/@media print \{[\s\S]*\.lang-switch, [^{]*\{ display: none !important; \}/.test(tpl), 'template.html: the switch is not printed');
});

/* What the parks and the entry rules allow today (research/<id>-2026-10.md, research/wjazd-2026-10.md): every plan that
```

W `tests/probes/before.js` zamień:

```js
// The budget and "Przed wyjazdem", and the motorbike swaps: the budget figure leads to its part; the section has its four
```

na:

```js
// The budget and "Przed wyjazdem", and the motorbike swaps, in the page's language (L in lib.js): the budget figure leads to its part; the section has its four
```

W `tests/probes/before.js` zamień:

```js
  check('the budget is the last figure of the facts, a link to „Przed wyjazdem”, in millions of dong', fig && fig.getAttribute('href') === '#before' && /^\d+(–\u2060?\d+)? mln VND/.test(fig.textContent.replace(/\s+/g, ' ')), fig && fig.textContent);
```

na:

```js
  check('the budget is the last figure of the facts, a link to „Przed wyjazdem”, in millions of dong', fig && fig.getAttribute('href') === '#before' && L({ en: /^\d+(–\u2060?\d+)?M VND/, pl: /^\d+(–\u2060?\d+)? mln VND/ }).test(fig.textContent.replace(/\s+/g, ' ')), fig && fig.textContent);
```

W `tests/probes/before.js` zamień:

```js
  check('„Przed wyjazdem” has its four parts', parts.join(' | ') === 'Budżet | Zarezerwuj wcześniej | Warto wiedzieć | Co spakować', parts.join(' | '));
```

na:

```js
  check('„Przed wyjazdem” has its four parts', parts.join(' | ') === L({ en: 'Budget | Book ahead | Good to know | What to pack', pl: 'Budżet | Zarezerwuj wcześniej | Warto wiedzieć | Co spakować' }), parts.join(' | '));
```

W `tests/probes/before.js` zamień:

```js
    textOf('#b-budget .b-note') === 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w październiku 2026.', textOf('#b-budget .b-note'));
```

na:

```js
    textOf('#b-budget .b-note') === L({ en: 'Without flights to Vietnam, insurance and souvenirs. Prices checked in October 2026.',
      pl: 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w październiku 2026.' }), textOf('#b-budget .b-note'));
```

W `tests/probes/before.js` zamień:

```js
  check('the Cao Bằng card offers „Z kierowcą” and „Samodzielnie”, with the legal condition', self && /konwencji z 1968 r\./.test(textOf('#stops .swap[data-swap="caobang"] .swap-note')));
```

na:

```js
  check('the Cao Bằng card offers „Z kierowcą” and „Samodzielnie”, with the legal condition', self && L({ en: /1968 Convention/, pl: /konwencji z 1968 r\./ }).test(textOf('#stops .swap[data-swap="caobang"] .swap-note')));
```

W `tests/probes/before.js` zamień:

```js
    check('the days of the loop ride the motorbike', Array.prototype.some.call(card.querySelectorAll('.day h4'), function (h) { return /motocyklem/.test(h.textContent); }));
    check('what it takes, the risk and the advice show', !!card.querySelector('.swap-box') && /dowód rejestracyjny/.test(card.querySelector('.swap-box').textContent) &&
      /WHO/.test(card.querySelector('.swap-box').textContent) && /zastaw/.test(card.querySelector('.swap-box').textContent));
```

na:

```js
    check('the days of the loop ride the motorbike', Array.prototype.some.call(card.querySelectorAll('.day h4'), function (h) { return L({ en: /by motorbike/, pl: /motocyklem/ }).test(h.textContent); }));
    check('what it takes, the risk and the advice show', !!card.querySelector('.swap-box') && L({ en: /registration papers/, pl: /dowód rejestracyjny/ }).test(card.querySelector('.swap-box').textContent) &&
      /WHO/.test(card.querySelector('.swap-box').textContent) && L({ en: /deposit/, pl: /zastaw/ }).test(card.querySelector('.swap-box').textContent));
```

W `tests/probes/before.js` zamień:

```js
    check('„Przed wyjazdem” books the motorbike', /Motocykl na pętlę Cao Bằng/.test(textOf('#b-book')));
```

na:

```js
    check('„Przed wyjazdem” books the motorbike', L({ en: /A motorbike for the Cao Bằng loop/, pl: /Motocykl na pętlę Cao Bằng/ }).test(textOf('#b-book')));
```

W `tests/probes/before.js` zamień:

```js
      location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2';
```

na:

```js
      goTo('#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2');
```

W `tests/probes/before.js` zamień:

```js
        check('the road is ridden yourself: its text says so, the link too', /Motocykl wypożyczony w jedną stronę/.test(leg.textContent.replace(/\s+/g, ' ')) && /motocykl=haivan/.test(location.hash), location.hash);
```

na:

```js
        check('the road is ridden yourself: its text says so, the link too', L({ en: /Motorbike rented one way/, pl: /Motocykl wypożyczony w jedną stronę/ }).test(leg.textContent.replace(/\s+/g, ' ')) && /motocykl=haivan/.test(location.hash), location.hash);
```

W `tests/probes/before.js` zamień:

```js
          check('the plan for WhatsApp says the budget', box.hidden || /Budżet na osobę/.test(box.value), box.value.split('\n').slice(-3).join(' / '));
```

na:

```js
          check('the plan for WhatsApp says the budget', box.hidden || L({ en: /Budget per person/, pl: /Budżet na osobę/ }).test(box.value), box.value.split('\n').slice(-3).join(' / '));
```

W `tests/probes/before.js` zamień:

```js
          location.hash = '#od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3';
```

na:

```js
          goTo('#od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3');
```

W `tests/probes/before.js` zamień:

```js
            location.hash = '#od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2';
```

na:

```js
            goTo('#od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2');
```

W `tests/probes/before.js` zamień:

```js
              location.hash = '#od=DAD&do=DAD&miesiac=2027-01&dni=5&co=&poziom=2';
```

na:

```js
              goTo('#od=DAD&do=DAD&miesiac=2027-01&dni=5&co=&poziom=2');
```

W `tests/probes/before.js` zamień:

```js
                var same = (textOf('#facts') + ' ' + textOf('#before')).match(/(?<![\d,])(\d(?:[\d ,]*\d)?)–\u2060?\1 (mln )?VND/);
```

na:

```js
                var same = (textOf('#facts') + ' ' + textOf('#before')).match(L({ en: /(?<![\d,.])(\d(?:[\d,.]*\d)?)–\u2060?\1M? VND/, pl: /(?<![\d,])(\d(?:[\d ,]*\d)?)–\u2060?\1 (mln )?VND/ }));
```

W `tests/probes/before.js` zamień:

```js
                location.hash = '#od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai';
```

na:

```js
                goTo('#od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai');
```

W `tests/probes/before.js` zamień:

```js
                  var li = Array.prototype.filter.call(document.querySelectorAll('#b-book li'), function (l) { return /Lot tandemem paralotnią/.test(l.textContent); })[0];
```

na:

```js
                  var li = Array.prototype.filter.call(document.querySelectorAll('#b-book li'), function (l) { return L({ en: /tandem paragliding flight/, pl: /Lot tandemem paralotnią/ }).test(l.textContent); })[0];
```

W `tests/probes/before.js` zamień:

```js
                  check('a thing that may cost nothing says only its dearer end: „do 2,2 mln VND na osobę”', /^do 2,2 mln VND na osobę/.test(fly), fly);
                  check('and so among the dearest things', /lot paralotnią nad Khau Phạ \(do 2,2 mln VND\)/.test(textOf('#b-budget')),
                    (textOf('#b-budget').match(/Najwięcej kosztują[^.]*\./) || [''])[0]);
```

na:

```js
                  check('a thing that may cost nothing says only its dearer end: „do 2,2 mln VND na osobę”', L({ en: /^up to 2\.2M VND per person/, pl: /^do 2,2 mln VND na osobę/ }).test(fly), fly);
                  check('and so among the dearest things', L({ en: /a paragliding flight over Khau Phạ \(up to 2\.2M VND\)/, pl: /lot paralotnią nad Khau Phạ \(do 2,2 mln VND\)/ }).test(textOf('#b-budget')),
                    (textOf('#b-budget').match(L({ en: /The biggest costs.*?\.(?!\d)/, pl: /Najwięcej kosztują[^.]*\./ })) || [''])[0]);
```

W `tests/probes/before.js` zamień:

```js
                  location.hash = '#od=SGN&do=HAN&miesiac=' + at2.year + '-' + (at2.month < 10 ? '0' : '') + at2.month + '&dni=15&co=&poziom=2';
```

na:

```js
                  goTo('#od=SGN&do=HAN&miesiac=' + at2.year + '-' + (at2.month < 10 ? '0' : '') + at2.month + '&dni=15&co=&poziom=2');
```

W `tests/probes/changes.js` zamień:

```js
// that is no trip, a round trip, and the sentence after Dodaj. Every change goes through the page as a visitor makes it:
// buttons, the form, the address.
```

na:

```js
// that is no trip, a round trip, and the sentence after Dodaj, in the page's language (L in lib.js). Every change goes
// through the page as a visitor makes it: buttons, the form, the address.
```

W `tests/probes/changes.js` zamień:

```js
    whys.every(function (t) { return /^(Wybrane, bo: .+ sezon\.|Dzieli drogę z .+ do .+ na dwa krótsze dni\.)$/.test(t.replace(/\s+/g, ' ')); }), whys.join(' | '));
```

na:

```js
    whys.every(function (t) { return L({ en: /^(Picked because: .*season in .+\.|Splits the road from .+ to .+ into two shorter days\.)$/,
      pl: /^(Wybrane, bo: .+ sezon\.|Dzieli drogę z .+ do .+ na dwa krótsze dni\.)$/ }).test(t.replace(/\s+/g, ' ')); }), whys.join(' | '));
```

W `tests/probes/changes.js` zamień:

```js
    function (s) { return /^Pogoda w/.test(s.querySelector('.why-wx').textContent); }));
```

na:

```js
    function (s) { return L({ en: /^Weather in/, pl: /^Pogoda w/ }).test(s.querySelector('.why-wx').textContent); }));
```

W `tests/probes/changes.js` zamień:

```js
    function (p) { return !/\d (dni|dzień)/.test(p.textContent); }), textOf('.why-wx'));
```

na:

```js
    function (p) { return !L({ en: /\d rainy days?/, pl: /\d (dni|dzień)/ }).test(p.textContent); }), textOf('.why-wx'));
```

W `tests/probes/changes.js` zamień:

```js
  var left = /z trasy wypadło: ([^.]+)\./.exec(textOf('#dropped'));
```

na:

```js
  var left = L({ en: /the route dropped: ([^.]+)\./, pl: /z trasy wypadło: ([^.]+)\./ }).exec(textOf('#dropped'));
```

W `tests/probes/changes.js` zamień:

```js
  check('Dodaj does what its line said would leave the trip', /^Zmieści się bez usuwania innych miejsc[.,]/.test(said) ? !left : !!left && said === 'Po dodaniu wypadnie: ' + left[1] + '.',
```

na:

```js
  check('Dodaj does what its line said would leave the trip', L({ en: /^It fits without removing other places[.,]/, pl: /^Zmieści się bez usuwania innych miejsc[.,]/ }).test(said) ? !left
    : !!left && said === L({ en: 'Adding it drops: ', pl: 'Po dodaniu wypadnie: ' }) + left[1] + '.',
```

W `tests/probes/changes.js` zamień:

```js
  location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2&usun=saigon,mekong,cattien';
```

na:

```js
  goTo('#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2&usun=saigon,mekong,cattien');
```

W `tests/probes/changes.js` zamień:

```js
    check('and says that part of the link was wrong', /Część linku była błędna/.test(textOf('#alerts') + textOf('#settings-msg')), textOf('#alerts') + ' | ' + textOf('#settings-msg'));
```

na:

```js
    check('and says that part of the link was wrong', L({ en: /Part of the link was wrong/, pl: /Część linku była błędna/ }).test(textOf('#alerts') + textOf('#settings-msg')), textOf('#alerts') + ' | ' + textOf('#settings-msg'));
```

W `tests/probes/changes.js` zamień:

```js
    check('an end before the start: a message, the address stays', /od 5 do 30 dni/.test(textOf('#settings-msg')) && location.hash === dated, textOf('#settings-msg') + ' ' + location.hash);
```

na:

```js
    check('an end before the start: a message, the address stays', L({ en: /5 to 30 days/, pl: /od 5 do 30 dni/ }).test(textOf('#settings-msg')) && location.hash === dated, textOf('#settings-msg') + ' ' + location.hash);
```

W `tests/probes/changes.js` zamień:

```js
    check('the sentence after Dodaj names what left the trip', /Żeby zmieścić Phú Quốc, z trasy wypadło: /.test(textOf('#dropped')), textOf('#dropped'));
```

na:

```js
    check('the sentence after Dodaj names what left the trip', L({ en: /To fit Phú Quốc, the route dropped: /, pl: /Żeby zmieścić Phú Quốc, z trasy wypadło: / }).test(textOf('#dropped')), textOf('#dropped'));
```

Utwórz `tests/probes/lang.js`:

```js
// The language switch (stage 5, decisions 1 and 2, findings 1–3): a link without lang= opens in English, with lang=pl in
// Polish; EN · PL in the photo's top right corner, each 44 px or more, changes the texts at once and keeps the trip, its
// settings and its changes, adding &lang=pl to the end of the address or taking it off; the plan for WhatsApp and the link
// of the printout carry the language; the focus stays on the switch; lang= with another value is English, without the
// warning of a wrong link; the same link without lang= (as every link from before stage 5) opens the same trip in English.
// Run on a link without lang= (tests/probe.sh adds nothing):
// tests/probe.sh tests/probes/lang.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// tests/probe.sh tests/probes/lang.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
setTimeout(function () {
  var t = window.__trip, sw = document.getElementById('lang-switch'), plain = window.__probeHash;
  function trip() { return t.state.route.stops.map(function (s) { return s.id + s.n; }).join(','); }
  function on() { var b = sw.querySelector('[aria-pressed="true"]'); return b ? b.getAttribute('data-lang') : ''; }
  function box(el) { return el.getBoundingClientRect(); }
  check('a link without lang= opens in English', document.documentElement.lang === 'en' && on() === 'en' && textOf('.secnav a[href="#days"]') === 'Day by day' &&
    document.title === 'Route G · Vietnam, up to you' && location.hash === plain, document.documentElement.lang + ' ' + document.title + ' ' + location.hash);
  var first = trip(), title = t.state.plans[0][0].t, hero = box(document.querySelector('.hero')), s = box(sw);
  check('the switch: EN · PL, two buttons of 44 px or more', sw.querySelectorAll('button').length === 2 && textOf('#lang-switch') === 'EN·PL' &&
    Array.prototype.every.call(sw.querySelectorAll('button'), function (b) { return box(b).width >= 44 && box(b).height >= 44; }), textOf('#lang-switch'));
  check('in the top right corner of the photo', s.top - hero.top >= 0 && s.top - hero.top <= 12 && hero.right - s.right <= 40 && s.left > hero.left + hero.width / 2,
    Math.round(s.top - hero.top) + ' from the top, ' + Math.round(hero.right - s.right) + ' from the right');
  // a visitor's tap: the button takes the focus, then the click (a click from a script alone moves no focus)
  sw.querySelector('[data-lang="pl"]').focus();
  sw.querySelector('[data-lang="pl"]').click();
  check('PL: the page in Polish at once', document.documentElement.lang === 'pl' && on() === 'pl' && textOf('.secnav a[href="#days"]') === 'Dzień po dniu' &&
    document.title === 'Route G · Wietnam po swojemu', document.documentElement.lang + ' ' + document.title);
  check('the same trip', trip() === first, first + ' → ' + trip());
  check('the texts of the places in Polish too', t.state.plans[0][0].t !== title, title + ' → ' + t.state.plans[0][0].t);
  check('the address gets &lang=pl at its end', location.hash === plain + '&lang=pl', location.hash);
  check('the focus stays on the switch', document.activeElement === sw.querySelector('[data-lang="pl"]'));
  var copied = null;
  try { navigator.clipboard.writeText = function (x) { copied = x; return Promise.resolve(); }; } catch (e) { /* the fallback box below */ }
  document.getElementById('copy-plan').click();
  setTimeout(function () {
    var fb = document.getElementById('copy-fallback');
    if (copied === null && !fb.hidden) copied = fb.value;
    var lines = (copied || '').split('\n');
    check('the plan for WhatsApp in Polish, its link with lang=pl', /^Route G: \d+ dni, /.test(lines[0]) && lines[lines.length - 1] === 'Ten plan na stronie: ' + SITE_URL + plain + '&lang=pl',
      lines[0] + ' … ' + lines[lines.length - 1]);
    check('the link of the printout with lang=pl', document.querySelector('#print-link a').getAttribute('href') === SITE_URL + plain + '&lang=pl',
      document.querySelector('#print-link a').getAttribute('href'));
    // Dodaj in Polish: the change and the language stay in the address
    var add = document.querySelector('[data-add]'), id = add.getAttribute('data-add');
    add.click();
    var changed = trip(), changedHash = location.hash;
    check('Dodaj in Polish: the change and the language in the address', new RegExp('dodaj=([a-zA-Z]+,)*' + id + '(,|&)').test(changedHash) && /&lang=pl$/.test(changedHash), changedHash);
    // EN: back to English, the change kept, &lang=pl gone
    sw.querySelector('[data-lang="en"]').focus();
    sw.querySelector('[data-lang="en"]').click();
    check('EN: English again, the same trip with its change, without &lang=pl', document.documentElement.lang === 'en' && on() === 'en' && trip() === changed &&
      location.hash === changedHash.replace(/&lang=pl$/, ''), location.hash);
    check('the focus stays on the switch', document.activeElement === sw.querySelector('[data-lang="en"]'));
    location.hash = plain + '&lang=pl';
    setTimeout(function () {
      check('a link with lang=pl opens in Polish', document.documentElement.lang === 'pl' && on() === 'pl' && trip() === first, document.documentElement.lang + ' ' + trip());
      location.hash = plain;
      setTimeout(function () {
        check('the same link without lang= opens the same trip in English', document.documentElement.lang === 'en' && on() === 'en' && trip() === first, document.documentElement.lang + ' ' + trip());
        location.hash = plain + '&lang=xx';
        setTimeout(function () {
          check('lang= with another value: English, without the warning of a wrong link', document.documentElement.lang === 'en' && textOf('#alerts').indexOf('Part of the link was wrong') < 0 &&
            location.hash === plain, textOf('#alerts') + ' ' + location.hash);
          done();
        }, 400);
      }, 400);
    }, 400);
  }, 300);
}, 1500);
```

W `tests/probes/lib.js` zamień:

```js
}
// the text of an element, spaces folded; '' when there is none
```

na:

```js
}
// the page's language (stage 5): English unless the link says lang=pl; L({ en: …, pl: … }) is what a check expects in it
var LANG = document.documentElement.lang;
function L(texts) { return texts[LANG]; }
// a new link in the page's language, as a visitor's next link would be: the settings, and lang=pl when the page is in Polish
function goTo(hash) { location.hash = hash + (LANG === 'pl' ? '&lang=pl' : ''); }
// the text of an element, spaces folded; '' when there is none
```

W `tests/probes/link.js` zamień:

```js
    check('the copied plan ends with a link to the public page with these settings', line === 'Ten plan na stronie: ' + SITE_URL + asked, line);
```

na:

```js
    // in the page's language: in Polish the link of the link ends with lang=pl (the asked link has it)
    check('the copied plan ends with a link to the public page with these settings', line === L({ en: 'This plan on the site: ', pl: 'Ten plan na stronie: ' }) + SITE_URL + asked, line);
```

W `tests/probes/pdf.js` zamień:

```js
  check('the button „Zapisz trasę jako PDF” stands right after „Kopiuj plan na WhatsApp”', !!btn && btn.textContent === 'Zapisz trasę jako PDF' &&
```

na:

```js
  check('the button „Zapisz trasę jako PDF” stands right after „Kopiuj plan na WhatsApp”', !!btn && btn.textContent === L({ en: 'Save route as PDF', pl: 'Zapisz trasę jako PDF' }) &&
```

W `tests/probes/pdf.js` zamień:

```js
  check('its hint says where to tap on an iPhone and on Android', /Zachowaj w Plikach/.test(textOf('.pdf-hint')) && /Zapisz jako PDF/.test(textOf('.pdf-hint')), textOf('.pdf-hint'));
```

na:

```js
  check('its hint says where to tap on an iPhone and on Android', L({ en: /Save to Files/, pl: /Zachowaj w Plikach/ }).test(textOf('.pdf-hint')) &&
    L({ en: /Save as PDF/, pl: /Zapisz jako PDF/ }).test(textOf('.pdf-hint')), textOf('.pdf-hint'));
```

W `tests/probes/pdf.js` zamień:

```js
  check('the printout has the legend of the map', /Droga/.test(textOf('#map-print .mp-legend')), textOf('#map-print .mp-legend'));
  var link = document.querySelector('#print-link a');
```

na:

```js
  check('the printout has the legend of the map', L({ en: /Road/, pl: /Droga/ }).test(textOf('#map-print .mp-legend')), textOf('#map-print .mp-legend'));
  var link = document.querySelector('#print-link a');
  // in the page's language: in Polish the link ends with lang=pl, as the address does
```

W `tests/probes/pdf.js` zamień:

```js
    textOf('#print-link').indexOf('Ten plan na stronie: ') === 0, link && link.getAttribute('href'));
```

na:

```js
    textOf('#print-link').indexOf(L({ en: 'This plan on the site: ', pl: 'Ten plan na stronie: ' })) === 0 && /&lang=pl$/.test(location.hash) === (LANG === 'pl'), link && link.getAttribute('href'));
```

W `tests/probes/publish.js` zamień:

```js
// try it: NOINDEX in site2/build.py), and the short sentence for a viewer without JavaScript (the offline file has a longer
// one, about an iPhone's preview of a file: NOSCRIPT in site2/build.py).
```

na:

```js
// try it: NOINDEX in site2/build.py) in English, the page's default language (stage 5), and the short sentence for a viewer
// without JavaScript in both languages (the offline file has a longer one, about an iPhone's preview of a file: NOSCRIPT in
// site2/build.py).
```

W `tests/probes/publish.js` zamień:

```js
  check('the link preview names the public address', (document.querySelector('meta[property="og:url"]') || {}).content === 'https://grzegorzfrskiba-hub.github.io/wietnam/');
```

na:

```js
  check('the link preview names the public address', (document.querySelector('meta[property="og:url"]') || {}).content === 'https://grzegorzfrskiba-hub.github.io/wietnam/');
  check('the link preview is in English, with the name and its tagline', (document.querySelector('meta[property="og:title"]') || {}).content === 'Route G · Vietnam, up to you' &&
    (document.querySelector('meta[property="og:locale"]') || {}).content === 'en_GB', (document.querySelector('meta[property="og:title"]') || {}).content);
```

W `tests/probes/publish.js` zamień:

```js
  check('a viewer without JavaScript gets a short sentence, without the iPhone\'s file preview', !!ns && /potrzebuje JavaScriptu/.test(ns.textContent) && !/podglądzie pliku/.test(ns.textContent), ns && ns.textContent);
```

na:

```js
  check('a viewer without JavaScript gets a short sentence in both languages, without the iPhone\'s file preview', !!ns && /needs JavaScript/.test(ns.textContent) &&
    /potrzebuje JavaScriptu/.test(ns.textContent) && !/podglądzie pliku|file preview/.test(ns.textContent), ns && ns.textContent);
```

W `tests/probes/settings.js` zamień:

```js
  }), Math.round(where.top) + ' vs ' + Array.prototype.map.call(document.querySelectorAll('.hero-cta a'), function (a) { return Math.round(box(a).bottom); }).join(', '));
```

na:

```js
  }), Math.round(where.top) + ' vs ' + Array.prototype.map.call(document.querySelectorAll('.hero-cta a'), function (a) { return Math.round(box(a).bottom); }).join(', '));
  // the language switch in the photo's top right corner (stage 5) keeps clear of the texts on the photo: of their letters
  // (a Range), as a paragraph's box takes the whole width
  var sw = box(document.getElementById('lang-switch'));
  check('the language switch keeps clear of the texts on the photo', ['.hero .eyebrow', '.hero h1', '.hero-tag'].every(function (sel) {
    var r = document.createRange();
    r.selectNodeContents(document.querySelector(sel));
    var b = r.getBoundingClientRect();
    return b.bottom <= sw.top || b.top >= sw.bottom || b.right <= sw.left || b.left >= sw.right;
  }), Math.round(sw.left) + '–' + Math.round(sw.right) + ' × ' + Math.round(sw.top) + '–' + Math.round(sw.bottom));
```

W `tests/probes/settings.js` zamień:

```js
  check('the bar sums up the settings', / · 10 dni · Aktywnie$/.test(textOf('#sum-text')), textOf('#sum-text'));
  check('the words of the chosen level under the levels', /Całodniowe wędrówki/.test(textOf('#level-note')), textOf('#level-note'));
```

na:

```js
  check('the bar sums up the settings', L({ en: / · 10 days · Active$/, pl: / · 10 dni · Aktywnie$/ }).test(textOf('#sum-text')), textOf('#sum-text'));
  check('the words of the chosen level under the levels', L({ en: /Full-day hikes/, pl: /Całodniowe wędrówki/ }).test(textOf('#level-note')), textOf('#level-note'));
```

W `tests/probes/settings.js` zamień:

```js
  check('an end before the start: a message under the form', /od 5 do 30 dni/.test(textOf('#settings-msg')), textOf('#settings-msg'));
```

na:

```js
  check('an end before the start: a message under the form', L({ en: /5 to 30 days/, pl: /od 5 do 30 dni/ }).test(textOf('#settings-msg')), textOf('#settings-msg'));
```

W `tests/probes/settings.js` zamień:

```js
  check('and says again why there is no trip', /od 5 do 30 dni/.test(textOf('#settings-msg')), textOf('#settings-msg'));
```

na:

```js
  check('and says again why there is no trip', L({ en: /5 to 30 days/, pl: /od 5 do 30 dni/ }).test(textOf('#settings-msg')), textOf('#settings-msg'));
```

W `tests/probes/settings.js` zamień:

```js
  location.hash = '#od=XYZ&do=HAN&miesiac=' + soon().year + '-' + (soon().month < 10 ? '0' : '') + soon().month + '&dni=15&co=&poziom=2';
```

na:

```js
  goTo('#od=XYZ&do=HAN&miesiac=' + soon().year + '-' + (soon().month < 10 ? '0' : '') + soon().month + '&dni=15&co=&poziom=2');
```

W `tests/probes/settings.js` zamień:

```js
    check('a partly wrong link: the first warning above the figures says so', first && /Część linku była błędna/.test(first.textContent), first && first.textContent);
```

na:

```js
    check('a partly wrong link: the first warning above the figures says so', first && L({ en: /Part of the link was wrong/, pl: /Część linku była błędna/ }).test(first.textContent), first && first.textContent);
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: `language switch: template.html: the switch EN · PL in the photo at the top`, `language switch: template.html: the switch is not printed` i `Exception: Error: 2 problem(s) in language switch, listed above`.

- [ ] **Krok 3: Przełącznik, język w linku, build i README**

W `README.md` zamień:

```markdown
# Wietnam po swojemu
```

na:

```markdown
# Route G
```

W `README.md` zamień:

```markdown
Planer trasy po Wietnamie: https://grzegorzfrskiba-hub.github.io/wietnam/
```

na:

```markdown
Vietnam, up to you: a trip planner for Vietnam, https://grzegorzfrskiba-hub.github.io/wietnam/ (in English; in Polish with the EN · PL switch or `&lang=pl` at the end of a link).
```

W `README.md` zamień:

```markdown
Ustawiasz termin, lotniska przylotu i wylotu, jedno albo dwa zainteresowania i poziom przygody, a strona układa trasę: miejsca, plan każdego dnia, przejazdy, mapę, sezon i budżet. Trasę możesz poprawić, wysłać linkiem albo zapisać jako PDF.
```

na:

```markdown
You set your dates, the airports you fly into and out of, one or two interests and an adventure level, and the page plans a route: the places, a plan for each day, the journeys, a map, the season and a budget. You can change the route, send it as a link or save it as a PDF.
```

W `README.md` zamień:

```markdown
- Strona działa w przeglądarce, bez serwera, bez kont i bez liczników odwiedzin. Ustawienia trasy są w linku.
- Fakty i ceny pochodzą z notatek w `research/`, każdy ze źródłem i datą sprawdzenia. Rozkłady, ceny, godziny otwarcia i zasady w parkach się zmieniają, więc przed wyjazdem sprawdź je u przewoźnika i na miejscu.
- Linki rezerwacji prowadzą do oficjalnych stron i sprawdzonych operatorów, bez parametrów śledzących.
```

na:

```markdown
- The page runs in the browser, with no server, no accounts and no visitor counters. The settings of a route are in its link.
- Facts and prices come from the notes in `research/` (in Polish), each with its source and the date it was checked. Timetables, prices, opening hours and park rules change, so check them with the carrier and on the spot before you go.
- Booking links lead to official sites and checked operators, without tracking parameters.
```

W `README.md` zamień:

```markdown
## Zdjęcia, mapa i kroje
```

na:

```markdown
## Photos, map and fonts
```

W `README.md` zamień:

```markdown
- Zdjęcia pochodzą z Wikimedia Commons, na licencjach CC0, CC BY i CC BY-SA albo z domeny publicznej. Autor, licencja i link do strony każdego zdjęcia stoją w stopce strony i w `site2/src/photos.js`; te licencje obowiązują dalej. Obraz w podglądzie linku to zdjęcie „Łódź wiosłowa pod skałami Tràng An”, autor Jakub Hałun, CC BY 4.0.
- Kontury mapy: Natural Earth, domena publiczna.
- Kroje pisma: IBM Plex Sans, IBM Plex Mono i Newsreader na licencji SIL Open Font License 1.1 (pliki licencji w `site2/fonts/`).
```

na:

```markdown
- The photos come from Wikimedia Commons, under CC0, CC BY and CC BY-SA or in the public domain. The author, the licence and a link to each photo’s page are in the page’s footer and in `site2/src/photos.js`; those licences still apply. The image in the link preview is the photo “A rowing boat below the cliffs of Tràng An” by Jakub Hałun, CC BY 4.0.
- Map outlines: Natural Earth, public domain.
- Fonts: IBM Plex Sans, IBM Plex Mono and Newsreader under the SIL Open Font License 1.1 (licence files in `site2/fonts/`).
```

W `README.md` zamień:

```markdown
## Prawa
```

na:

```markdown
## Rights
```

W `README.md` zamień:

```markdown
© 2026 Wietnam po swojemu. Wszelkie prawa zastrzeżone.
```

na:

```markdown
© 2026 Route G. All rights reserved.
```

W `README.md` zamień:

```markdown
Repo jest publiczne, ale nie ma wolnej licencji: kod, teksty i notatki można czytać, ale nie wolno ich kopiować ani rozpowszechniać bez zgody. Zdjęcia, kontury mapy i kroje mają własne licencje, opisane wyżej.
```

na:

```markdown
The repository is public but has no open licence: you may read the code, texts and notes, but not copy or distribute them without permission. The photos, map outlines and fonts have their own licences, described above.

## Po polsku

Route G („Wietnam po swojemu”) to planer trasy po Wietnamie, po angielsku i po polsku: polską wersję otwiera przełącznik EN · PL albo `&lang=pl` na końcu linku. Ustawiasz termin, lotniska, zainteresowania i poziom przygody, a strona układa trasę z planem dni, przejazdami, mapą, sezonem i budżetem. Notatki, research i plany w repo są po polsku. © 2026 Route G. Wszelkie prawa zastrzeżone; zdjęcia, kontury mapy i kroje mają własne licencje, opisane wyżej.
```

W `site2/build.py` zamień:

```python
OFFLINE_NAME = "Wietnam-po-swojemu.html"
# the page's scripts in load order; the photo list (PHOTOS) and app.js come after them
```

na:

```python
OFFLINE_NAME = "Route-G.html"
# the page's scripts in load order, the English texts (en/, stage 5) after their Polish ones; the photo list (PHOTOS) and
# app.js come after them
```

W `site2/build.py` zamień:

```python
           + ["photos.js", "ui.js", "panels.js", "costs.js", "before.js", "page.js", "basemap.js"])
```

na:

```python
           + sorted("en/content/" + os.path.basename(p) for p in glob.glob(os.path.join(SRC, "en", "content", "*.js")))
           + ["photos.js", "en/photos.js", "ui.js", "en/ui.js", "panels.js", "costs.js", "before.js", "en/names.js", "page.js", "basemap.js"])
```

W `site2/build.py` zamień:

```python
# Link preview (WhatsApp and others), only on the public page, whose address it names.
```

na:

```python
# Link preview (WhatsApp and others), only on the public page, whose address it names; in English, the page's default
# language (decision 1 of stage 5: one address, so WhatsApp, which reads the file without its scripts, shows English).
```

W `site2/build.py` zamień:

```python
    "title": "Wietnam po swojemu",
    "description": "Ustaw termin, lotniska, to, co lubisz, i poziom przygody, a strona ułoży trasę po Wietnamie: miejsca, plan dni, przejazdy i mapę.",
    "alt": "Kobieta wiosłuje małą łodzią po rzece u stóp wapiennych skał w Tràng An, Ninh Bình",
```

na:

```python
    "title": "Route G · Vietnam, up to you",
    "description": "Set your dates, your airports, what you like and how adventurous you are, and the page plans a route around Vietnam: the places, a plan for each day, the journeys and a map.",
    "alt": "A woman rows a small boat on a river below limestone cliffs in Tràng An, Ninh Bình",
```

W `site2/build.py` zamień:

```python
# The sentence for a viewer without JavaScript: on the public page a short one; in the offline file the longer one, as an
# iPhone shows a sent HTML file in a preview that runs no scripts.
```

na:

```python
# The sentence for a viewer without JavaScript, in English and under it in Polish (stage 5): on the public page a short one;
# in the offline file the longer one, as an iPhone shows a sent HTML file in a preview that runs no scripts.
```

W `site2/build.py` zamień:

```python
    "page": "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu: włącz go w ustawieniach przeglądarki.",
    "offline": "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu. Jeśli widzisz ten tekst w podglądzie pliku na iPhonie, "
               "otwórz w przeglądarce stronę %s albo zapisz na niej swoją trasę jako PDF." % SITE_URL,
```

na:

```python
    "page": [("en", "This page plans your route in the browser and needs JavaScript: turn it on in your browser’s settings."),
             ("pl", "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu: włącz go w ustawieniach przeglądarki.")],
    "offline": [("en", "This page plans your route in the browser and needs JavaScript. If you see this text in an iPhone’s file preview, "
                       "open the page %s in a browser, or save your route there as a PDF." % SITE_URL),
                ("pl", "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu. Jeśli widzisz ten tekst w podglądzie pliku na iPhonie, "
                       "otwórz w przeglądarce stronę %s albo zapisz na niej swoją trasę jako PDF." % SITE_URL)],
```

W `site2/build.py` zamień:

```python
                + '<meta property="og:type" content="website">\n<meta property="og:locale" content="pl_PL">\n'
```

na:

```python
                + '<meta property="og:type" content="website">\n<meta property="og:locale" content="en_GB">\n'
```

W `site2/build.py` zamień:

```python
    return ('<!doctype html>\n<html lang="pl">\n<head>\n<meta charset="utf-8">\n'
```

na:

```python
    return ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
```

W `site2/build.py` zamień:

```python
                .replace("__HERO_H__", str(top["h"])).replace("/* __FONTS__ */", fonts).replace("__NOSCRIPT__", NOSCRIPT[kind]).replace("__SCRIPT__", script))
```

na:

```python
                .replace("__HERO_H__", str(top["h"])).replace("/* __FONTS__ */", fonts).replace("__NOSCRIPT__", "".join('<p class="noscript" lang="%s">%s</p>' % x for x in NOSCRIPT[kind])).replace("__SCRIPT__", script))
```

W `site2/src/app.js` zamień:

```js
   the day strip, the stays with their day plans and the journeys. Pure helpers: page.js; texts: ui.js, content/, photos.js. */
```

na:

```js
   the day strip, the stays with their day plans and the journeys. Pure helpers: page.js; texts: ui.js, content/, photos.js,
   and in English (stage 5) en/: the page's language comes from the link and the switch EN · PL (setLang). */
```

W `site2/src/app.js` zamień:

```js
  var lang = 'pl';   // the only language for now; UI keeps its keys, so another one can come later as UI.<code>
```

na:

```js
  // the page's language, 'en' or 'pl' (setLang): English unless the link says lang=pl (decision of 15.10.2026)
  var lang = 'en';
  // the texts of the places in that language (localContent in page.js), set by setLang
  var VIEW = CONTENT;
```

W `site2/src/app.js` zamień:

```js
  function C(id) { return CONTENT[id]; }
  function caption(id) { return PHOTO_META[id].cap; }
```

na:

```js
  function C(id) { return VIEW[id]; }
  function caption(id) { return lang === 'en' ? PHOTO_CAPS_EN[id] : PHOTO_META[id].cap; }
  // a holiday's or a link's name in the page's language (HOLIDAY_NAMES_EN and LINK_NAMES_EN in en/names.js)
  function named(map, name) { return lang === 'en' ? map[name] : name; }
```

W `site2/src/app.js` zamień:

```js
  // the weekday and date of trip day n, only when the trip has dates: "czw. 28.01", short enough for one line under the number
```

na:

```js
  // the weekday and date of trip day n, only when the trip has dates: "czw. 28.01", in English "Thu 28 Jan" (finding 9),
  // short enough for one line under the number
```

W `site2/src/app.js` zamień:

```js
    var wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString('pl-PL', { weekday: 'short', timeZone: 'UTC' });
    return wd + '\u00a0' + p[2] + '.' + (p[1] < 10 ? '0' : '') + p[1];
```

na:

```js
    var wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString(lang === 'en' ? 'en-GB' : 'pl-PL', { weekday: 'short', timeZone: 'UTC' });
    return lang === 'en' ? wd + '\u00a0' + p[2] + '\u00a0' + T('mon3.' + p[1]) : wd + '\u00a0' + p[2] + '.' + (p[1] < 10 ? '0' : '') + p[1];
```

W `site2/src/app.js` zamień:

```js
  // names for a sentence: "A", "A i B", "A, B i C"
  function andList(list) { return list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' i ' + list[list.length - 1]; }
```

na:

```js
  // names for a sentence: "A", "A i B", "A, B i C"; in English "A, B and C"
  function andList(list) { return list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' ' + T('and') + ' ' + list[list.length - 1]; }
```

W `site2/src/app.js` zamień:

```js
  /* New settings: plan the trip; when there is one, show it and write the settings into the address. Otherwise keep the
```

na:

```js
  /* New settings: plan the trip; when there is one, show it and write the settings into the address, with lang=pl at the end
     when the page is in Polish (langHash in page.js). Otherwise keep the
```

W `site2/src/app.js` zamień:

```js
    var h = linkHash(s);
```

na:

```js
    var h = langHash(s, lang);
```

W `site2/src/app.js` zamień:

```js
     without them. A link that was partly wrong says so as the first of the warnings above the figures of the trip. */
  function fromLink() {
```

na:

```js
     without them. A link that was partly wrong says so as the first of the warnings above the figures of the trip. A link
     with lang=pl opens in Polish, every other one in English (langOf in page.js). */
  function fromLink() {
    if (langOf(location.hash) !== lang) setLang(langOf(location.hash));
```

W `site2/src/app.js` zamień:

```js
    F.to.innerHTML = airports;
```

na:

```js
    F.to.innerHTML = airports;
    labelForm();
    F.start.min = TODAY;
    F.start.max = PLAN_LAST_YEAR + '-12-31';
    F.addEventListener('submit', function (e) { e.preventDefault(); });
    F.addEventListener('change', onFormChange);
  }
  // the words of the form in the page's language: the interests and the levels (which of them is chosen comes back with syncForm)
  function labelForm() {
```

W `site2/src/app.js` zamień:

```js
    }).join('');
    F.start.min = TODAY;
    F.start.max = PLAN_LAST_YEAR + '-12-31';
    F.addEventListener('submit', function (e) { e.preventDefault(); });
    F.addEventListener('change', onFormChange);
```

na:

```js
    }).join('');
```

W `site2/src/app.js` zamień:

```js
      if (state.settings && location.hash === linkHash(state.settings)) return;
```

na:

```js
      if (state.settings && location.hash === langHash(state.settings, lang)) return;
```

W `site2/src/app.js` zamień:

```js
      if (!Object.keys(parseLink(location.hash, bad)).length && !bad.length) {   // an anchor typed by hand: put the settings back
        try { history.replaceState(null, '', linkHash(state.settings)); } catch (e) { /* the address keeps the anchor */ }
```

na:

```js
      // an anchor typed by hand: put the settings back (lang= alone is a link: the default trip in its language)
      if (!Object.keys(parseLink(location.hash, bad)).length && !bad.length && !/(?:^#|&)lang=/.test(location.hash)) {
        try { history.replaceState(null, '', langHash(state.settings, lang)); } catch (e) { /* the address keeps the anchor */ }
```

W `site2/src/app.js` zamień:

```js
    // the printout names this route's address on the public page (as the copied plan does)
    var url = SITE_URL + linkHash(state.settings);
```

na:

```js
    // the printout names this route's address on the public page, in the page's language (as the copied plan does)
    var url = SITE_URL + langHash(state.settings, lang);
```

W `site2/src/app.js` zamień:

```js
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: h.name, span: span(h.from, h.to) })); });
```

na:

```js
    a.hits.forEach(function (h) { lines.push(T('alert.' + h.kind, { name: named(HOLIDAY_NAMES_EN, h.name), span: span(h.from, h.to) })); });
```

W `site2/src/app.js` zamień:

```js
        { x: what, when: x.months.map(inMonth).join(' i '), places: x.ids.map(function (id) { return C(id).short; }).join(' i '),
```

na:

```js
        { x: what, when: x.months.map(inMonth).join(' ' + T('and') + ' '), places: x.ids.map(function (id) { return C(id).short; }).join(' ' + T('and') + ' '),
```

W `site2/src/app.js` zamień:

```js
     events of the place that it meets. */
```

na:

```js
     events of the place that it meets. */
  // "w marcu i kwietniu dobry sezon", in English "good season in March and April" (the order of season.when)
```

W `site2/src/app.js` zamień:

```js
      return inMonth(months[0].month) + months.slice(1).map(function (m) { return ' i ' + T('monl.' + m.month); }).join('') + ' ' + T('season.' + months[0].season);
```

na:

```js
      return T('season.when', { when: inMonth(months[0].month) + months.slice(1).map(function (m) { return ' ' + T('and') + ' ' + T('monl.' + m.month); }).join(''),
        season: T('season.' + months[0].season) });
```

W `site2/src/app.js` zamień:

```js
    return months.map(function (m) { return inMonth(m.month) + ' ' + T('season.' + m.season); }).join(', ');
```

na:

```js
    return months.map(function (m) { return T('season.when', { when: inMonth(m.month), season: T('season.' + m.season) }); }).join(', ');
```

W `site2/src/app.js` zamień:

```js
    var L = mapLayout(state.route, state.st, { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: T });
```

na:

```js
    var L = mapLayout(state.route, state.st, { panels: MAP_PANELS, places: PLACES, content: VIEW, airports: AIRPORTS, say: T });
```

W `site2/src/app.js` zamień:

```js
  function linksOf(list) { return list.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.name) + '</a>'; }).join(' · '); }
```

na:

```js
  function linksOf(list) { return list.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(named(LINK_NAMES_EN, l.name)) + '</a>'; }).join(' · '); }
```

W `site2/src/app.js` zamień:

```js
    var holidays = hits.filter(function (h) { return h.kind === 'holiday'; }).map(function (h) { return h.name; });
```

na:

```js
    var holidays = hits.filter(function (h) { return h.kind === 'holiday'; }).map(function (h) { return named(HOLIDAY_NAMES_EN, h.name); });
```

W `site2/src/app.js` zamień:

```js
    lines.push(T('pt.link') + SITE_URL + linkHash(state.settings));
```

na:

```js
    lines.push(T('pt.link') + SITE_URL + langHash(state.settings, lang));
```

W `site2/src/app.js` zamień:

```js
  // the multi-word names a line may not break inside: the short names of the places, the names of the airports and the
  // names without a Vietnamese letter that the texts use (KEEP_TOGETHER in content.js)
```

na:

```js
  // the multi-word names a line may not break inside: the short names of the places in both languages, the names of the
  // airports and the names without a Vietnamese letter that the texts use (KEEP_TOGETHER in content.js)
```

W `site2/src/app.js` zamień:

```js
    .concat(Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
```

na:

```js
    .concat(Object.keys(CONTENT_EN).map(function (id) { return CONTENT_EN[id].short; }), Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
```

W `site2/src/app.js` zamień:

```js
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.cap) + '</a>: ' + esc(m.artist) + ', ' +
```

na:

```js
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(caption(ph)) + '</a>: ' + esc(m.artist) + ', ' +
```

W `site2/src/app.js` zamień:

```js

  /* ---------- wiring ---------- */
  applyStatic();
  buildForm();
  renderCredits();
```

na:

```js

  /* ---------- the language (stage 5) ---------- */
  /* The page's language, 'en' or 'pl': the texts of the places, the words of the template and of the form, the credits and the
     switch EN · PL; the caller draws the trip again (apply). */
  function setLang(l) {
    lang = l;
    VIEW = localContent(CONTENT, lang === 'en' ? CONTENT_EN : null);
    applyStatic();
    if (F) labelForm();
    renderCredits();
    Array.prototype.forEach.call(document.querySelectorAll('#lang-switch [data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
  }
  /* EN · PL (decision 1 of 15.10.2026): the texts change at once, without a reload; the trip, its settings and its changes
     stay, and the address gains or loses lang=pl at its end (apply); the form shows the trip's settings again (syncForm). */
  function bindLang() {
    $('#lang-switch').addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]');
      if (!b || b.getAttribute('data-lang') === lang) return;
      setLang(b.getAttribute('data-lang'));
      apply(state.settings, state.linkWarn);
      syncForm();
    });
  }

  /* ---------- wiring ---------- */
  setLang(langOf(location.hash));   // the texts first, in the language of the link
  buildForm();
```

W `site2/src/app.js` zamień:

```js
  bindSummary();
```

na:

```js
  bindSummary();
  bindLang();
```

W `site2/src/en/ui.js` zamień:

```js
  'nav.top': 'Back to top', 'nav.change': 'Change',
```

na:

```js
  'nav.top': 'Back to top', 'nav.change': 'Change', 'lang.aria': 'Language',
```

W `site2/src/en/ui.js` zamień:

```js
  'min': 'min', 'h': 'h', 'fmt.hm': '{h} h {m} min',
```

na:

```js
  'min': 'min', 'h': 'h', 'fmt.hm': '{h} h {m} min', 'and': 'and',
```

W `site2/src/en/ui.js` zamień:

```js
  'season.D': 'good season', 'season.S': 'fair season', 'season.Z': 'poor season',
```

na:

```js
  'season.D': 'good season', 'season.S': 'fair season', 'season.Z': 'poor season', 'season.when': '{season} {when}',
```

W `site2/src/template.html` zamień:

```html
.hero-where { position: absolute; z-index: 1; right: var(--gutter); bottom: 12px; font: 12px var(--mono); color: var(--on-photo); opacity: 0.85; }
```

na:

```html
.hero-where { position: absolute; z-index: 1; right: var(--gutter); bottom: 12px; font: 12px var(--mono); color: var(--on-photo); opacity: 0.85; }
/* the language switch (stage 5): EN · PL in the photo's top right corner, each at least 44 px for a finger, the active one
   underlined; it scrolls with the page */
.lang-switch { position: absolute; z-index: 2; top: 4px; right: calc(var(--gutter) - 12px); display: flex; align-items: center; color: var(--on-photo); font: 500 13px var(--mono); letter-spacing: 0.08em; text-shadow: 0 1px 10px rgba(var(--black), 0.45); }
.lang-switch button { min-width: 44px; min-height: 44px; padding: 0 8px; border: 0; background: none; color: inherit; font: inherit; letter-spacing: inherit; cursor: pointer; opacity: 0.78; }
.lang-switch button:hover, .lang-switch button[aria-pressed="true"] { opacity: 1; }
.lang-switch button[aria-pressed="true"] { text-decoration: underline 2px; text-underline-offset: 5px; }
.lang-switch span { opacity: 0.7; }
```

W `site2/src/template.html` zamień:

```html
.map-legend span { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
```

na:

```html
.map-legend span { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
/* the sentence about the scales may break: in English it is wider than the map on a phone of 320 px */
.map-legend .map-note { white-space: normal; }
```

W `site2/src/template.html` zamień:

```html
}
html { scroll-padding-top: calc(env(safe-area-inset-top, 0px) + 56px); }
```

na:

```html
}
/* the narrowest phones (320 px): the line over the name, longest in Polish, starts under the language switch */
@media (max-width: 359px) {
  .hero-text { padding-top: 54px; }
}
html { scroll-padding-top: calc(env(safe-area-inset-top, 0px) + 56px); }
```

W `site2/src/template.html` zamień:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .shape-click { display: none !important; }
```

na:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .lang-switch, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .shape-click { display: none !important; }
```

W `site2/src/template.html` zamień:

```html
<noscript><p class="noscript">__NOSCRIPT__</p></noscript>
```

na:

```html
<noscript>__NOSCRIPT__</noscript>
```

W `site2/src/template.html` zamień:

```html
  <span class="hero-where">Tràng An, Ninh Bình</span>
```

na:

```html
  <span class="hero-where">Tràng An, Ninh Bình</span>
  <div class="lang-switch" id="lang-switch" role="group" data-i18n-aria="lang.aria"><button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button><span aria-hidden="true">·</span><button type="button" data-lang="pl" lang="pl" aria-pressed="false">PL</button></div>
```

W `site2/src/ui.js` zamień:

```js
  'nav.top': 'Na górę', 'nav.change': 'Zmień',
```

na:

```js
  'nav.top': 'Na górę', 'nav.change': 'Zmień', 'lang.aria': 'Język strony',
```

W `site2/src/ui.js` zamień:

```js
  'min': 'min', 'h': 'godz.', 'fmt.hm': '{h} godz. {m} min',
```

na:

```js
  'min': 'min', 'h': 'godz.', 'fmt.hm': '{h} godz. {m} min', 'and': 'i',
```

W `site2/src/ui.js` zamień:

```js
  'season.D': 'dobry sezon', 'season.S': 'średni sezon', 'season.Z': 'zły sezon',
```

na:

```js
  'season.D': 'dobry sezon', 'season.S': 'średni sezon', 'season.Z': 'zły sezon', 'season.when': '{when} {season}',
```

- [ ] **Krok 4: Testy, build i sondy w obu językach** (ok. 7 min)

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-5.sh" MIESIAC
bash "$TMPDIR/sondy-5.sh" MIESIAC pl
```

Oczekiwane: `ALL PASS`, grep nic nie wypisuje, `sondy (MIESIAC): 0 z 21 nie przeszło` (19 sond po angielsku i dwa przebiegi sondy przełącznika) i `sondy (MIESIAC, pl): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add README.md site2/build.py site2/src/app.js site2/src/en/ui.js site2/src/template.html site2/src/ui.js tests/content.test.js tests/probes/before.js tests/probes/changes.js tests/probes/lang.js tests/probes/lib.js tests/probes/link.js tests/probes/pdf.js tests/probes/publish.js tests/probes/settings.js
git commit -F - <<'EOF'
Przełącznik EN · PL i język w linku (etap 5, decyzje 1 i 2, ustalenia 1–5 i 9): strona domyślnie po angielsku, a w prawym górnym rogu zdjęcia przełącznik EN · PL (dwa przyciski po co najmniej 44 px, aktywny podkreślony, w druku ukryty), który od razu zmienia teksty, bez przeładowania, a trasa, ustawienia i zmiany „Dodaj/Usuń” zostają; wybór polskiego dopisuje &lang=pl na końcu adresu, także w planie na WhatsApp i w linku w PDF, a link bez lang= (każdy sprzed etapu 5) albo z inną wartością otwiera się po angielsku, bez ostrzeżenia o błędnym linku; teksty miejsc, podpisy, święta i nazwy linków w języku strony, daty w pasku dni „Thu 28 Jan”, „in March”, „good season in March and April”, listy z „and”; podgląd linku po angielsku („Route G · Vietnam, up to you”, og:locale en_GB), plik HTML z lang="en", zdanie bez JavaScriptu w obu językach, plik offline Route-G.html; README po angielsku z akapitem po polsku; sondy w obu językach (L i goTo w lib.js) i nowa sonda lang.js, a test treści pilnuje przełącznika w szablonie i jego ukrycia w druku

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: Punkt kontrolny etapu 5

Wszystko razem, na zbudowanej stronie, z pomiarami przed planem (zadanie 1) i po nim, z arkuszem PL | EN i z użytkownikiem.

- [ ] **Krok 1: Pełny test**

```bash
time bash tests/run.sh --full
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)`, `ALL PASS`, ok. 2,5–3 min.

- [ ] **Krok 2: Sondy dla dwóch miesięcy w obu językach** (ok. 15 min)

```bash
python3 site2/build.py
bash "$TMPDIR/sondy-5.sh" MIESIAC
bash "$TMPDIR/sondy-5.sh" MIESIAC pl
bash "$TMPDIR/sondy-5.sh" 2027-07
bash "$TMPDIR/sondy-5.sh" 2027-07 pl
```

Oczekiwane: dwa razy `0 z 21 nie przeszło` (po angielsku) i dwa razy `0 z 19 nie przeszło` (po polsku).

- [ ] **Krok 3: Linki i licencje** (tylko odczyt)

```bash
bash tools/links.sh | grep -v '^200 '
bash tools/licenses.sh | tail -n 1
```

Oczekiwane, jak w suchej próbie: `406 https://sapaochau.org/…` (strona otwiera się w przeglądarce normalnie), `links.sh: 1 address(es) did not answer 2xx`, czyli 65 z 66 adresów z kodem 200; `licenses.sh: 97 photos, 0 licence problem(s), 0 author(s) to check`. Strony Sapa Sisters, Hoi An Day Trip i Full Moon Travel Asia bywają za weryfikacją antybotową (403): weryfikacji się nie obchodzi, a stronę sprawdza się we wbudowanej przeglądarce.

- [ ] **Krok 4: Trasy bez zmian**

```bash
bash tools/liczby.sh > "$TMPDIR/wietnam-5/liczby-po.md"
diff "$TMPDIR/wietnam-5/liczby-przed.md" "$TMPDIR/wietnam-5/liczby-po.md" && echo "liczby: identyczne"
```

Oczekiwane: `liczby: identyczne` (ok. minuty). Każda różnica to zmiana tras, której plan nie przewiduje: zatrzymaj się i pokaż ją użytkownikowi.

- [ ] **Krok 5: Słowa na stronie i strony PDF trzech tras w obu językach** (ok. 4 min)

```bash
D1='od=DAD&do=SGN&miesiac=2027-01&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon'
D2='od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai&motocykl=hagiang'
D3='od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3'
python3 site2/build.py
for d in 1 2 3; do
  eval H=\$D$d
  for l in en pl; do
    X=""; [ $l = pl ] && X="&lang=pl"
    bash tests/probe.sh "$TMPDIR/wietnam-5/slowa.js" 1400 "$H$X" | grep -E '^ok   (słowa|ramka|język)' > "$TMPDIR/wietnam-5/slowa-po-$l-d$d.txt"
    bash tests/print.sh "$H$X" "$TMPDIR/wietnam-5/po-$l-d$d.pdf" > "$TMPDIR/wietnam-5/druk-po-$l-d$d.txt"
    bash tests/print.sh "$H$X" "$TMPDIR/wietnam-5/po-$l-d$d-dark.pdf" dark > "$TMPDIR/wietnam-5/druk-po-$l-d$d-dark.txt"
  done
done
python3 -I - "$TMPDIR/wietnam-5" <<'PYEOF'
# words on the page and PDF pages of the three trips: before the plan (task 1, Polish) and after it in Polish and in English
import os, re, sys
d = sys.argv[1]
def words(f): return {l.split()[2]: int(l.split()[3]) for l in open(os.path.join(d, f), encoding='utf-8') if l.startswith('ok   słowa')}
def lang(f): return [l.split()[2] for l in open(os.path.join(d, f), encoding='utf-8') if l.startswith('ok   język')][0]
def pages(f): return int(re.search(r': (\d+) pages', open(os.path.join(d, f), encoding='utf-8').read()).group(1))
print('| trasa | słowa na stronie: przed → PL, EN | w dniach | w „Przed wyjazdem” | strony PDF: przed → PL, EN | ciemny motyw: PL, EN |')
print('|---|---|---|---|---|---|')
for n in (1, 2, 3):
    a, p, e = words('slowa-przed-d%d.txt' % n), words('slowa-po-pl-d%d.txt' % n), words('slowa-po-en-d%d.txt' % n)
    assert lang('slowa-po-pl-d%d.txt' % n) == 'pl' and lang('slowa-po-en-d%d.txt' % n) == 'en'
    print('| d%d | %d → %d, %d | %d → %d, %d | %d → %d, %d | %d → %d, %d | %d, %d |' % (n, a['strona'], p['strona'], e['strona'], a['dni'], p['dni'], e['dni'], a['przed'], p['przed'], e['przed'],
          pages('druk-przed-d%d.txt' % n), pages('druk-po-pl-d%d.txt' % n), pages('druk-po-en-d%d.txt' % n), pages('druk-po-pl-d%d-dark.txt' % n), pages('druk-po-en-d%d-dark.txt' % n)))
PYEOF
grep -h "covered text lines" "$TMPDIR"/wietnam-5/druk-po-*.txt | sort | uniq -c
grep -h "ramka" "$TMPDIR"/wietnam-5/slowa-po-*-d2.txt
```

Oczekiwane, jak w suchej próbie:

| trasa | słowa na stronie: przed → PL, EN | w dniach | w „Przed wyjazdem” | strony PDF: przed → PL, EN | ciemny motyw: PL, EN |
|---|---|---|---|---|---|
| d1 | 4433 → 4459, 4885 | 1759 → 1780, 1982 | 624 → 626, 664 | 14 → 14, 14 | 14, 14 |
| d2 | 4822 → 4848, 5426 | 2133 → 2156, 2499 | 484 → 484, 516 | 13 → 13, 14 | 13, 14 |
| d3 | 5878 → 5904, 6534 | 3147 → 3168, 3583 | 679 → 681, 712 | 20 → 20, 20 | 20, 20 |

Do tego `12 covered text lines: 0` i dwa razy `ok   ramka motocykla 1` (w obu wydrukach d2 jest ramka motocykla w Hà Giang). Polska strona ma ok. 25 słów więcej niż przed planem: dłuższe zdanie pod przełącznikiem motocykla (wyjątek z umów) i podpis pod nazwą.

- [ ] **Krok 6: Arkusz PL | EN**

```bash
bash "$TMPDIR/wietnam-5/jsc.sh" "$TMPDIR/wietnam-5/teksty.js" > "$TMPDIR/wietnam-5/teksty-po.jsonl"
python3 site2/build.py > /dev/null
python3 -I - "$TMPDIR/wietnam-5" <<'PYEOF'
# The sheet PL | EN (finding 29): every text of the page in Polish next to its English, by place (name and tips, the days with
# their versions and rain plans, events, the captions of the place's photos), then the interface, the holidays, the names of
# the links and the texts of the build (link preview, the sentence without JavaScript) and the README; a Polish text the plan
# changed shows what went (red) and what came (green) against task 1; the words of the day texts in both languages. Writes
# $TMPDIR/wietnam-5/arkusz-pl-en.html; run from the repository's folder.
import difflib, html, json, os, re, sys
d = sys.argv[1]
def load(name):
    out = {}
    for line in open(os.path.join(d, name), encoding='utf-8'):
        r = json.loads(line)
        out[(r['lang'], r['g'], r['k'])] = r
    return out
A, B = load('teksty-przed.jsonl'), load('teksty-po.jsonl')
def words(t): return len([w for w in t.split() if re.search(r'[^\W_]', w)])
def marked(a, b):
    ta, tb = re.findall(r'\S+|\s+', a), re.findall(r'\S+|\s+', b)
    out = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, ta, tb, autojunk=False).get_opcodes():
        x, y = html.escape(''.join(ta[i1:i2])), html.escape(''.join(tb[j1:j2]))
        if op == 'equal': out.append(y)
        else: out.append(('<del>' + x + '</del>' if x.strip() else '') + ('<ins>' + y + '</ins>' if y.strip() else y))
    return ''.join(out)
changed = [0]
def row(label, g, k, count=False):
    pl, en, old = B.get(('pl', g, k)), B.get(('en', g, k)), A.get(('pl', g, k))
    if not pl and not en: return ''
    p = pl['d'] if pl else ''
    if old and old['d'] != p:
        changed[0] += 1
        ptext, tag = marked(old['d'], p), ' <span class="tag">zmiana PL</span>'
    else:
        ptext, tag = html.escape(p), ''
    e = html.escape(en['d']) if en else '<span class="miss">brak</span>'
    n = (' · %d → %d słów' % (words(p), words(en['d'])) if en else '') if count else ''
    return ('<div class="row"><p class="lab">' + html.escape(label) + n + tag + '</p><div class="pair"><p>' + (ptext or '—') + '</p><p lang="en">' + e + '</p></div></div>')
VARIANT = {'': '', 'easy': ' · wersja spokojna', 'hard': ' · trudny dzień', 'hard.next': ' · trudny dzień, drugi dzień', 'solo': ' · plan na jedną noc', 'self': ' · samodzielnie'}
ids = []
for (lang, g, k) in B:
    if lang == 'pl' and g == 'place' and k.endswith('|name'): ids.append(k.split('|')[0])
toc, body = [], []
for id_ in ids:
    name_pl, name_en = B[('pl', 'place', id_ + '|name')]['d'], B.get(('en', 'place', id_ + '|name'), {'d': '?'})['d']
    rows = [row('Nazwa', 'place', id_ + '|name'), row('Krótka nazwa', 'place', id_ + '|short'), row('Podtytuł', 'place', id_ + '|sub'), row('Punkt na mapie', 'place', id_ + '|poi')]
    days = sorted(set(int(k.split('|')[1]) for (l, g, k) in B if l == 'pl' and g == 'day' and k.startswith(id_ + '|') and k.split('|')[1].isdigit()))
    for i in days:
        for v in ['', 'easy', 'hard', 'hard.next', 'solo', 'self']:
            k = '%s|%d|%s' % (id_, i, v)
            if ('pl', 'title', k) not in B: continue
            lab = 'Dzień %d%s' % (i + 1, VARIANT[v])
            rows += [row(lab + ': tytuł', 'title', k), row(lab + ': opis', 'day', k, True), row(lab + ': gdy pada', 'rain', k)]
    if ('pl', 'title', id_ + '|again') in B:
        rows += [row('Drugi pobyt: tytuł', 'title', id_ + '|again'), row('Drugi pobyt: opis', 'day', id_ + '|again', True)]
    rows += [row('Ukryta perełka', 'place', id_ + '|gem'), row('Do pominięcia', 'place', id_ + '|skip'), row('Zamiast tego', 'place', id_ + '|instead')]
    i = 0
    while ('pl', 'event', '%s|%d' % (id_, i)) in B:
        rows.append(row('Wydarzenie %d' % (i + 1), 'event', '%s|%d' % (id_, i))); i += 1
    for ph in (B.get(('pl', 'photos', id_)) or {'d': ''})['d'].split():
        rows.append(row('Zdjęcie ' + ph, 'photo', ph))
    anchor = 'm-' + id_
    toc.append('<a href="#' + anchor + '">' + html.escape(name_pl) + '</a>')
    body.append('<section id="' + anchor + '"><h2>' + html.escape(name_pl) + ' <span class="en">' + html.escape(name_en) + '</span></h2>' + ''.join(rows) + '</section>')
# the photo at the top of the page (no place's)
used = set()
for (l, g, k) in B:
    if l == 'pl' and g == 'photos': used.update(B[(l, g, k)]['d'].split())
rest = [k for (l, g, k) in B if l == 'pl' and g == 'photo' and k not in used]
if rest: body.append('<section id="m-hero"><h2>Zdjęcie na górze strony</h2>' + ''.join(row('Zdjęcie ' + k, 'photo', k) for k in rest) + '</section>')
toc.append('<a href="#m-hero">Zdjęcie na górze</a>')
# the interface, in the order of UI.pl, under headings by the first key of each part
PARTS = [('doc.title', 'Nagłówek, nawigacja i formularz'), ('f.for', 'Trasa w skrócie i ostrzeżenia'), ('shape.eyebrow', 'Pasek dni, kopiowanie i PDF'),
         ('days.eyebrow', 'Dni, przejazdy i trasa na WhatsApp'), ('g.open', 'Zdjęcia, mapa i miejsca poza trasą'), ('sw.caobang', 'Motocykl'),
         ('stop.remove', 'Miejsce na trasie, pogoda i wydarzenia'), ('before.eyebrow', 'Przed wyjazdem: budżet'), ('book.h3', 'Przed wyjazdem: rezerwacje'),
         ('know.h3', 'Przed wyjazdem: warto wiedzieć i pakowanie'), ('ft.photos', 'Stopka')]
heads = dict(PARTS)
ui = [k for (l, g, k) in B if l == 'pl' and g == 'ui']
parts = []
for k in ui:
    if k in heads: parts.append('<h3>' + html.escape(heads[k]) + '</h3>')
    parts.append(row(k, 'ui', k))
body.append('<section id="m-ui"><h2>Interfejs <span class="en">' + str(len(ui)) + ' kluczy</span></h2>' + ''.join(parts) + '</section>')
toc.append('<a href="#m-ui">Interfejs</a>')
hol = sorted(set(k for (l, g, k) in B if l == 'pl' and g == 'holiday'))
body.append('<section id="m-holidays"><h2>Święta</h2>' + ''.join(row(k, 'holiday', k) for k in hol) + '</section>')
links = [k for (l, g, k) in B if l == 'pl' and g == 'link']
body.append('<section id="m-links"><h2>Nazwy linków <span class="en">' + str(len(links)) + '</span></h2>' + ''.join(row('Link', 'link', k) for k in links) + '</section>')
toc += ['<a href="#m-holidays">Święta</a>', '<a href="#m-links">Linki</a>', '<a href="#m-build">Podgląd i README</a>']
# the texts of the build and the README, as they are after the plan
page = open('site2/out/pages/index.html', encoding='utf-8').read()
def meta(p): m = re.search(r'<meta property="' + p + r'" content="([^"]*)">', page); return html.unescape(m.group(1)) if m else '—'
ns = re.findall(r'<p class="noscript" lang="(\w+)">(.*?)</p>', page)
off = [f for f in os.listdir('site2/out/offline') if f.endswith('.html')]
nso = re.findall(r'<p class="noscript" lang="(\w+)">(.*?)</p>', open(os.path.join('site2/out/offline', off[0]), encoding='utf-8').read()) if off else []
build = [('Podgląd linku: tytuł', meta('og:title')), ('Podgląd linku: opis', meta('og:description')), ('Podgląd linku: opis zdjęcia', meta('og:image:alt')),
         ('Język podglądu', meta('og:locale')), ('Plik offline', ', '.join(off))]
build += [('Bez JavaScriptu na stronie (' + l + ')', html.unescape(t)) for l, t in ns] + [('Bez JavaScriptu w pliku offline (' + l + ')', html.unescape(t)) for l, t in nso]
readme = open('README.md', encoding='utf-8').read()
body.append('<section id="m-build"><h2>Podgląd linku, zdanie bez JavaScriptu i README</h2>' + ''.join(
    '<div class="row"><p class="lab">' + html.escape(a) + '</p><p>' + html.escape(b) + '</p></div>' for a, b in build) +
    '<div class="row"><p class="lab">README.md</p><pre>' + html.escape(readme) + '</pre></div></section>')
dw = lambda lang: [words(r['d']) for (l, g, k), r in B.items() if l == lang and g == 'day']
n_pl, n_en = sum(1 for (l, g, k) in B if l == 'pl' and g not in ('photos',)), sum(1 for (l, g, k) in B if l == 'en')
lead = ('Teksty po polsku: %d, po angielsku: %d. Opisy dni razem: %d słów po polsku, %d po angielsku; najdłuższy: %d i %d słów. '
        'Polskie teksty zmienione w planie: %d (na czerwono to, co wypadło, na zielono to, co doszło).' % (n_pl, n_en, sum(dw('pl')), sum(dw('en')), max(dw('pl')), max(dw('en')), changed[0]))
CSS = (':root{--bg:#fbfaf7;--fg:#1d1b18;--mut:#6b655c;--card:#fff;--line:#e3ded5;--del-bg:#fde2e1;--del-fg:#8a1c17;--ins-bg:#dff3e2;--ins-fg:#14532d;--acc:#0c6a5a}'
       '@media (prefers-color-scheme:dark){:root{--bg:#171614;--fg:#ece8e1;--mut:#a39d93;--card:#211f1c;--line:#38342e;--del-bg:#4a1f1d;--del-fg:#ffb4ae;--ins-bg:#1c3a24;--ins-fg:#a7e3b5;--acc:#7fd1bf}}'
       'body{background:var(--bg);color:var(--fg);font:15px/1.5 -apple-system,system-ui,sans-serif;margin:0 auto;max-width:1200px;padding:16px}'
       'h1{font-size:24px}h2{font-size:20px;margin-top:32px;border-bottom:1px solid var(--line);padding-bottom:4px}h2 .en{color:var(--mut);font-weight:400}h3{font-size:15px;margin:22px 0 4px;color:var(--acc)}'
       '.lead,.lab{color:var(--mut)}.lab{font-size:12px;margin:0 0 4px}.toc{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:14px}.toc a{color:var(--acc)}'
       '.row{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin:6px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}'
       '.pair p,.row>p{margin:0}del{background:var(--del-bg);color:var(--del-fg)}ins{background:var(--ins-bg);color:var(--ins-fg);text-decoration:none}'
       '.tag{background:var(--ins-bg);color:var(--ins-fg);border-radius:4px;padding:0 5px;font-size:11px}.miss{color:var(--del-fg)}pre{white-space:pre-wrap;font-size:13px;margin:0}'
       '@media (max-width:700px){.pair{grid-template-columns:1fr}}')
doc = ('<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Arkusz PL | EN</title><style>' + CSS +
       '</style></head><body><h1>Route G: arkusz PL | EN</h1><p class="lead">' + html.escape(lead) + '</p><nav class="toc">' + ''.join(toc) + '</nav>' + ''.join(body) + '</body></html>')
open(os.path.join(d, 'arkusz-pl-en.html'), 'w', encoding='utf-8').write(doc)
print('arkusz: ' + lead)
PYEOF
```

Oczekiwane: `arkusz: Teksty po polsku: 1050, po angielsku: 1050. Opisy dni razem: 4874 słów po polsku, 5971 po angielsku; najdłuższy: 66 i 79 słów. Polskie teksty zmienione w planie: 12 (…)`. Arkusz `$TMPDIR/wietnam-5/arkusz-pl-en.html` (każdy tekst po polsku obok angielskiego, według miejsc, potem interfejs, święta, linki, podgląd linku, zdanie bez JavaScriptu i README) idzie do użytkownika w kroku 9.

- [ ] **Krok 7: Zrzuty: nagłówek z przełącznikiem, ramka motocykla, „Before you go” i kafelek kwoty**

```bash
D2='od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai&motocykl=hagiang'
D3='od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3'
B='od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
cat > "$TMPDIR/wietnam-5/miejsca.js" <<'JSEOF'
// where the pieces to look at stand on the page (y from the top and height, px): the motorbike box of Hà Giang,
// „Before you go” and the facts row
setTimeout(function () {
  function at(el) { var r = el && el.getBoundingClientRect(); return r ? Math.round(r.top + window.scrollY) + ' ' + Math.round(r.height) : '-1 0'; }
  [['ramka', document.querySelector('#stops .swap[data-swap="hagiang"]')], ['przed', document.getElementById('before')], ['fakty', document.querySelector('.facts')]].forEach(function (p) {
    check('y ' + p[0] + ' ' + at(p[1]), true);
  });
  check('y height ' + document.documentElement.scrollHeight + ' 0', true);
  done();
}, 1500);
JSEOF
bash tests/shot.sh "$B" 390 "$TMPDIR/wietnam-5/top-en-390.png" 1000
bash tests/shot.sh "$B&lang=pl" 390 "$TMPDIR/wietnam-5/top-pl-390.png" 1000
bash tests/shot.sh "$B&lang=pl" 320 "$TMPDIR/wietnam-5/top-pl-320.png" 1000
bash tests/probe.sh "$TMPDIR/wietnam-5/miejsca.js" 390 "$D2" | grep '^ok   y ' > "$TMPDIR/wietnam-5/d2-y.txt"
bash tests/shot.sh "$D2" 390 "$TMPDIR/wietnam-5/d2.png" "$(awk '$3 == "height" { print $4 + 50 }' "$TMPDIR/wietnam-5/d2-y.txt")"
for w in 641 768 901; do
  bash tests/probe.sh "$TMPDIR/wietnam-5/miejsca.js" $w "$D3" | grep '^ok   y ' > "$TMPDIR/wietnam-5/d3-$w-y.txt"
  bash tests/shot.sh "$D3" $w "$TMPDIR/wietnam-5/d3-$w.png" "$(awk '$3 == "fakty" { print $4 + 600 }' "$TMPDIR/wietnam-5/d3-$w-y.txt")"
done
python3 - "$TMPDIR/wietnam-5" <<'PYEOF'
# the pieces to look at with Read: the top of the page at 390 px in English and in Polish and at 320 px in Polish; the
# motorbike box and „Before you go” of d2 in English in columns; the facts row of d3 in English at three widths
import os, sys
from PIL import Image
d = sys.argv[1]
def ys(f):
    return {l.split()[2]: (int(l.split()[3]), int(l.split()[4])) for l in open(os.path.join(d, f), encoding='utf-8')}
def side(ims, out, h):
    s = Image.new('RGB', (sum(i.width for i in ims) + 16 * (len(ims) - 1), h), (200, 200, 200)); x = 0
    for i in ims: s.paste(i.crop((0, 0, i.width, h)), (x, 0)); x += i.width + 16
    s.save(os.path.join(d, out))
side([Image.open(os.path.join(d, f)) for f in ('top-en-390.png', 'top-pl-390.png', 'top-pl-320.png')], 'k-naglowek.png', 1000)
def columns(im, y, h, out, n):
    im = im.crop((0, y, im.width, y + h)); part = (im.height + n - 1) // n
    s = Image.new('RGB', (n * im.width + 16 * (n - 1), part), 'white')
    for i in range(n): s.paste(im.crop((0, i * part, im.width, min(im.height, (i + 1) * part))), (i * (im.width + 16), 0))
    s.save(os.path.join(d, out))
y = ys('d2-y.txt'); im = Image.open(os.path.join(d, 'd2.png'))
columns(im, y['ramka'][0] - 20, y['ramka'][1] + 40, 'k-ramka.png', 2)
columns(im, y['przed'][0], y['przed'][1], 'k-przed.png', 3)
ims = []
for w in (641, 768, 901):
    f = ys('d3-%d-y.txt' % w)['fakty'][0]
    ims.append(Image.open(os.path.join(d, 'd3-%d.png' % w)).crop((0, max(0, f - 40), w, f + 560)))
side(ims, 'k-kwota.png', 600)
print(sorted(f for f in os.listdir(d) if f.startswith('k-')))
PYEOF
```

Obejrzyj kawałki narzędziem Read:
- **k-naglowek** (390 px po angielsku i po polsku, 320 px po polsku): EN · PL w prawym górnym rogu zdjęcia, aktywny język podkreślony, nazwa „Route G” z podpisem, przy 320 px polski nadtytuł pod przełącznikiem, „By month” w jednym wierszu;
- **k-ramka** (d2, 390 px): pod przełącznikiem „1968 Convention” i „Exceptions by agreement”, w ramce „What it takes”, „Risk” z „(WHO estimate)” i „(national data)”, „Advice” z paszportem nie w zastaw i pozwoleniem „about 230,000–300,000 VND”;
- **k-przed** („Before you go” d2 w trzech kolumnach): budżet w milionach dongów („M VND”), „Book ahead” z kwotami, „Good to know” z dwoma zdaniami i dwoma linkami rządowymi, „What to pack”;
- **k-kwota** (d3 przy 641, 768 i 901 px): „57–114M VND” w całości w kafelku, angielskie nazwy świąt z datami „about 30 Apr – 3 May 2027”.

- [ ] **Krok 8: Ręcznie, w przeglądarce i na telefonie** (za zgodą użytkownika, który może pominąć telefon)
  - W przeglądarce na komputerze (lokalny serwer na `site2/out/pages`, jak w planie 2A, zadanie 13): EN · PL z klawiatury (Tab, Enter) zmienia język, a fokus zostaje na przycisku; pasek u góry i „Na górę” po angielsku; podświetlanie znaczników na mapie po przełączeniu języka; powiększenie mapy z angielskimi nazwami kadrów i mórz.
  - Na telefonie w domowej sieci Wi-Fi: folder ze stroną i dwiema stronami przekierowań, `/1` na trasę d2 po angielsku i `/2` na tę samą trasę z `&lang=pl`, i serwer w tle (macOS może zapytać, czy python3 może przyjmować połączenia; to decyzja użytkownika):

    ```bash
    T="$TMPDIR/wietnam-5/telefon"; rm -rf "$T"; mkdir -p "$T/1" "$T/2"
    for f in index.html img fonts; do ln -s "$PWD/site2/out/pages/$f" "$T/$f"; done
    H='od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai&motocykl=hagiang'
    printf '<meta http-equiv="refresh" content="0; url=../#%s">' "$H" > "$T/1/index.html"
    printf '<meta http-equiv="refresh" content="0; url=../#%s&amp;lang=pl">' "$H" > "$T/2/index.html"
    ipconfig getifaddr en0
    cd "$T" && python3 -m http.server 8766 --bind 0.0.0.0
    ```

    W tej samej wiadomości podaj adres `IP:8766/1` i listę stuknięć: strona po angielsku; stuknij „PL” w prawym górnym rogu zdjęcia: teksty po polsku, trasa ta sama; „Kopiuj plan na WhatsApp” pokazuje przez zwykłe http zapasowe pole z tekstem (schowek działa tylko przez https), a jego ostatnia linia kończy się na `&lang=pl`; stuknij „EN”: z powrotem po angielsku; „Save route as PDF” otwiera okno drukowania; `IP:8766/2` otwiera tę samą trasę po polsku. Porównaj log serwera z listą, zanim zapiszesz wynik, a na koniec zatrzymaj serwer.

- [ ] **Krok 9: Przegląd z użytkownikiem**
  - Wyślij użytkownikowi arkusz PL | EN (`SendUserFile`, podgląd w panelu) i kawałki z kroku 7; podaj tabelę z kroku 5 i wynik kroków 1–4 i 8.
  - Do decyzji, po jednej sprawie, z rekomendacją: każda rzecz, która wyszła inaczej niż w suchej próbie, i każda uwaga użytkownika do tłumaczenia.
  - Poprawki idą jako osobne commity: test, który nie przechodzi (gdzie się da), kod albo tekst w obu językach, `ALL PASS`, sondy w obu językach, commit z opisem „Poprawka z punktu kontrolnego etapu 5: …”. Zmiana faktu najpierw trafia do researchu.
  - Wynik przeglądu zapisz jednym akapitem w `$TMPDIR/przeglad-5.txt`: co przeszło, z liczbami z kroków 1–6; co obejrzał użytkownik; co poprawiono; co przeszło dalej. Zadanie 11 wpisze go do `notes/etapy.md`.

---

### Zadanie 9: Końcowy przegląd przed publikacją

Świeży recenzent na najmocniejszym modelu (Agent z modelem `fable`) patrzy na całość przed publikacją: tłumaczenie i kod (ustalenie 28). W poprzednich planach taki przegląd znalazł rzeczy, których nie złapały sucha próba ani punkt kontrolny.

- [ ] **Krok 1: Zlecenie.** Uruchom recenzenta z zadaniem po angielsku, z wynikiem po polsku. Zlecenie podaje:
  - ten plan, `notes/wizja.md` i sekcję „Z sesji decyzji etapu 5 (15.10.2026)” w `notes/etapy.md`;
  - zakres zmian: `git diff <commit planu>..HEAD -- . ':(exclude)docs'` (commit planu: `git log --format=%h -1 -- notes/plans/2026-10-15-etap-5-angielski.md`);
  - sekcję „Na co uważać przy przeglądzie”;
  - arkusz PL | EN, wydruki i kawałki zrzutów z `$TMPDIR/wietnam-5/` oraz zbudowaną stronę w `site2/out/pages`.

  Recenzent odpowiada na pytania:
  - czy każdy angielski tekst mówi to samo co polski: te same fakty, liczby, nazwy i ograniczenia, nic dodanego i nic pominiętego; czytaj cały arkusz, tekst po tekście;
  - czy zdania o bezpieczeństwie mają pełne odpowiedniki po angielsku (przewodnik, pozwolenie, komunikat zarządu, niewybuchy, słonie, strefa przygraniczna, kask, wczesny lot po nocy w terenie, konwencja z 1968 r. z wyjątkami z umów, ryzyko jako dwa fakty);
  - czy angielski jest naturalny i brytyjski, spójny w nazwach (słowniczek z ustalenia 12, wielkie litery w nazwach) i zrozumiały dla czytelnika z dowolnego kraju;
  - czy polskie teksty zmieniły się tylko tam, gdzie mówi plan (decyzja 8, ustalenia 20–24, nazwa);
  - czy język w linku, przełącznik, plan na WhatsApp, PDF, podgląd linku, zdanie bez JavaScriptu i plik offline działają, jak mówią decyzje 1–2 i ustalenia 1–5;
  - czy coś w kodzie łamie ograniczenia globalne albo psuje dawne trasy i linki, i czy nowe testy złapią brakujący albo niezgodny tekst w jednym z języków;
  - czy coś w repo nie powinno być publiczne.

  Uwagi dzieli na krytyczne, ważne i drobne, każdą z plikiem i linią. Wynik zapisuje do `$TMPDIR/przeglad-koncowy-5.txt`.
- [ ] **Krok 2: Uwagi jedna po drugiej.**
  - Każdą uwagę sprawdź sam w kodzie, w researchu albo na stronie, zanim cokolwiek zmienisz.
  - Prawdziwa uwaga krytyczna albo ważna to osobny commit „Poprawka z końcowego przeglądu etapu 5: …” (test, kod albo tekst w obu językach, `ALL PASS`, sondy w obu językach). Fakt zmienia się najpierw w researchu.
  - Drobne uwagi bez zmian idą na listy w `notes/etapy.md` w zadaniu 11 (ręcznie, po skrypcie).
  - Sprawę produktową (to, co zobaczy odwiedzający) najpierw pokaż użytkownikowi, z rekomendacją.
- [ ] **Krok 3: Wynik.** Zapisz do `$TMPDIR/recenzja-5.txt` jeden akapit: co recenzent znalazł, co poprawiono i co poszło na listy. Zadanie 11 wpisze go do `notes/etapy.md`.

---

### Zadanie 10: Publikacja (każdy krok za wyraźną zgodą użytkownika)

- [ ] **Krok 1: Drugi rzut oka na komunikaty** (jak w zadaniu 9 planu B2, tylko strony HTML, bez WebFetch na PDF-ach): czy coś zmieniło się od 15.10.2026 w faktach, które strona podaje jako bezpieczeństwo, prawo albo zamknięcia: e-wiza i karta przylotu (dalej tylko evisa.gov.vn i prearrival.immigration.gov.vn), e-papierosy (dekret 90/2026), drogi na Sơn Trà, szlak na Lang Biang (zawieszony od 31.10.2024), zasady ruchu w czasie festiwalu gryki w Đồng Văn (festiwal od 25.10.2026), loty paralotnią Mebayluon. Zmiana faktu: najpierw research, potem strona w obu językach, osobny commit, `ALL PASS`; o zmianie powiedz użytkownikowi przed publikacją.
- [ ] **Krok 2: `docs/`**

```bash
bash tools/publish.sh
git status --short docs | head
grep -c 'name="robots" content="noindex"' docs/index.html
grep -c '<html lang="en">' docs/index.html
```

Oczekiwane: `publish.sh: docs/ ready (…)`; zmieniona strona w `docs/` (zdjęcia bez zmian); `1`; `1`.

- [ ] **Krok 3: Commit `docs/`**

```bash
git add docs
git commit -F - <<'EOF'
Strona na GitHub Pages po etapie 5: Route G po angielsku i po polsku pod jednym adresem, z przełącznikiem EN · PL, angielskim domyślnym i &lang=pl w linku przy polskim; podgląd linku po angielsku; dalej z noindex

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 4: `git push` tylko za wyraźnym „tak” użytkownika.** Zapytaj w rozmowie, co pójdzie na GitHuba (commity od ostatniego push: zadania 2–7, poprawki, `docs/`, a jeśli jeszcze nie poszły, także notatki z sesji decyzji i plan). Po zgodzie:

```bash
git push
```

- [ ] **Krok 5: Strona na żywo** (po 1–2 minutach na build GitHub Pages)

```bash
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -c 'Route G · Vietnam, up to you'
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -c 'og:locale" content="en_GB'
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -c 'name="robots" content="noindex"'
```

Oczekiwane: liczby większe od 0, a ostatnia `1`. Jeśli strona jest jeszcze stara (0), odczekaj i powtórz. Potem otwórz we wbudowanej przeglądarce https://grzegorzfrskiba-hub.github.io/wietnam/ (po angielsku), stuknij „PL” (po polsku, a adres kończy się na `&lang=pl`) i sprawdź „Kopiuj plan na WhatsApp”: przez https plan idzie do schowka, a jego link niesie `&lang=pl`.

- [ ] **Krok 6: Opis repo po angielsku** (ustalenie 7), tylko za wyraźnym „tak” użytkownika, z pokazanym tekstem:

```bash
~/.local/bin/gh repo view grzegorzfrskiba-hub/wietnam --json description
~/.local/bin/gh repo edit grzegorzfrskiba-hub/wietnam --description "Route G · Vietnam, up to you: a trip planner for Vietnam, in English and Polish"
```

---

### Zadanie 11: Notatki: status i następny krok

Trasy się nie zmieniają, więc nowego raportu tras nie ma.

**Pliki:**
- Zmień: `notes/etapy.md`, `notes/wizja.md`, `CLAUDE.md`

- [ ] **Krok 1: Zmiany w notatkach.** Skrypt sprawdzono na kopiach plików po commicie tego planu; dał 17 zmian. Bierze dzisiejszą datę, wynik punktu kontrolnego z `$TMPDIR/przeglad-5.txt` (zadanie 8, krok 9) i wynik końcowego przeglądu z `$TMPDIR/recenzja-5.txt` (zadanie 9). Zmienia:
  - `notes/etapy.md`:
    - tabela etapów: etap 5 zrobiony, strona po angielsku i po polsku pod jednym adresem, dalej z `noindex`;
    - „Następny krok” to pierwsza runda anglojęzycznych testerów: co zrobił etap 5, wynik punktu kontrolnego i końcowego przeglądu; akapity sesji decyzji etapu 5 zostają w swojej sekcji, a akapity planu B2 przechodzą pod „Z planu B2 partii B”;
    - lista „Po publikacji”: bez spraw, które zrobił etap 5 (umowa ASEAN, zdanie o ryzyku, `b.dalat.tanang`, `know.links`, plany na deszcz i tớ dày);
  - `notes/wizja.md`: język, nazwa, prawa i dwa języki są na stronie od etapu 5;
  - `CLAUDE.md`: status, zasada języka strony, sondy w obu językach i plik offline `Route-G.html` w „Jak sprawdzać”.

  Jeśli punkt kontrolny albo przegląd zmienił liczby (słowa, strony PDF, najdłuższy opis), popraw po skrypcie zdanie „Zrobione …” w `notes/etapy.md` ręcznie. Jeśli strona nie została opublikowana (zadanie 10), popraw ręcznie status w `CLAUDE.md`.

Uruchom z katalogu repo:

```bash
python3 -I - <<'NOTESEOF'
# notes after stage 5, from the repo's folder; each change asserts its old text. The date is today's; the checkpoint's
# result comes from $TMPDIR/przeglad-5.txt (task 8, step 9) and the final review's from $TMPDIR/recenzja-5.txt (task 9).
import datetime, os
t = datetime.date.today()
D = '%d.%02d.%d' % (t.day, t.month, t.year)
TMP = os.environ['TMPDIR']
def read(name, what):
    s = open(os.path.join(TMP, name), encoding='utf-8').read().strip()
    assert s, what
    return s
REVIEW = read('przeglad-5.txt', 'the checkpoint first: task 8, step 9')
FINAL = read('recenzja-5.txt', 'the final review first: task 9')
e = open('notes/etapy.md', encoding='utf-8').read()
w = open('notes/wizja.md', encoding='utf-8').read()
c = open('CLAUDE.md', encoding='utf-8').read()
n = 0
def rep(s, a, b, count=1):
    global n
    assert s.count(a) == count, (a[:70], s.count(a))
    n += 1
    return s.replace(a, b)
def line(s, start, new, must):
    # the whole line that starts with start, which must hold must
    global n
    assert s.count('\n' + start) == 1, start
    i = s.index('\n' + start) + 1; j = s.index('\n', i)
    assert must in s[i:j], (start, must)
    n += 1
    return s[:i] + new + s[j:]
def drop(s, start):
    global n
    assert s.count('\n' + start) == 1, start
    i = s.index('\n' + start) + 1; j = s.index('\n', i) + 1
    n += 1
    return s[:i] + s[j:]
P = 'plans/2026-10-15-etap-5-angielski.md'
# the table of stages
e = line(e, '| 5. Angielski |', '| 5. Angielski | zrobione @DZIEN@: [' + P + '](' + P + '); Route G po angielsku i po polsku pod jednym adresem (przełącznik EN · PL, `&lang=pl` w linku), dalej z `noindex` |', 'do wykonania')
# the next step: the first round of English-speaking testers; what stage 5 did, the checkpoint, the review, the publication
i = e.index('## Następny krok: wykonanie planu etapu 5 (angielski)\n')
j = e.index('### Z sesji decyzji etapu 5 (15.10.2026)')
n += 1
e = e[:i] + '''## Następny krok: pierwsza runda anglojęzycznych testerów

Zrobione @DZIEN@: etap 5 ([''' + P + '''](''' + P + ''')). Strona Route G jest po angielsku i po polsku pod jednym adresem: domyślnie po angielsku, z przełącznikiem EN · PL w prawym górnym rogu zdjęcia; polski dopisuje `&lang=pl` na końcu linku, także w planie na WhatsApp i w PDF, a link bez `lang=` (każdy sprzed etapu 5) otwiera się po angielsku. Po angielsku są teksty 21 miejsc, podpisy 97 zdjęć, święta, nazwy linków i interfejs (`site2/src/en/`), daty („Thu 28 Jan”, „6–12 Feb 2027”) i kwoty („17–39M VND”); podgląd linku jest po angielsku („Route G · Vietnam, up to you”), zdanie bez JavaScriptu w obu językach, plik offline to `Route-G.html`, a README jest po angielsku z akapitem po polsku. Po polsku doszły nazwa Route G z podpisem „Wietnam po swojemu”, wyjątek z umów pod przełącznikiem motocykla (ASEAN, Korea Płd.), ryzyko jako dwa fakty i poprawki z ustaleń 20–24. Testy pilnują obu języków: kompletność, te same liczby i nazwy wietnamskie w każdej z 1050 par tekstów, styl brytyjski, teksty dla każdego paszportu, angielski opis dnia najwyżej 80 słów i zdania o bezpieczeństwie po angielsku; sondy chodzą w obu językach, a sonda `lang.js` sprawdza przełącznik i język w linku. Trasy i silnik bez zmian: liczby z `tools/liczby.sh` są takie same jak przed planem.

Punkt kontrolny etapu 5 (@DZIEN@): DECYZJE-Z-PRZEGLADU

Końcowy przegląd etapu 5 (@DZIEN@, świeży recenzent): WYNIK-RECENZJI

Publikacja (@DZIEN@): za zgodą użytkownika strona po etapie 5 poszła na GitHub Pages (https://grzegorzfrskiba-hub.github.io/wietnam/, dalej z `noindex`).

**Następny krok:** pierwsza runda anglojęzycznych testerów: kilka przygodowych osób dostaje sam adres strony i trzy pytania, jak w pierwszej rundzie (decyzja 2 z 14.10.2026); opinie zapisujemy w „Pierwsza runda” bez imion i linków, punkt po punkcie, z decyzją, co z nimi zrobić. Otwarcie dla wyszukiwarek, własna domena i odświeżenie cen na sam koniec (lista „Po publikacji”).

''' + e[j:]
# the list for new texts; after publishing: what stage 5 did goes
e = line(e, '- po etapie 5 każdy nowy tekst od razu w obu językach', '- każdy nowy tekst od razu w obu językach (od etapu 5, @DZIEN@): polski w `ui.js` i `content/`, angielski w `site2/src/en/` (`UI.en`, `en/content/<id>.js`, podpis zdjęcia w `en/photos.js`, nazwa święta albo linku w `en/names.js`), z tymi samymi liczbami i nazwami wietnamskimi (testy `english places`, `english names` i `english interface`), po brytyjsku, a angielski opis dnia ma najwyżej 80 słów; nowe miejsce dostaje angielski plik tekstów i angielskie podpisy zdjęć;', 'ustalenia 13–14')
e = rep(e, '**Po publikacji (po partii B):**', '**Po publikacji (po etapie 5):**')
e = drop(e, '  - tớ dày w zimnej porze Mù Cang Chải, plany na deszcz z „zamiast”')
e = drop(e, '  - umowa ASEAN (zdanie pod przełącznikiem motocykla), zdanie o ryzyku')
# the vision: the language, the name and the rights are on the page
w = rep(w, '`noindex` do samego końca; na stronie po etapie 5 (szczegóły', '`noindex` do samego końca; na stronie od etapu 5, @DZIEN@ (szczegóły')
w = rep(w, '### 2. Język: polski, od etapu 5 angielski i polski', '### 2. Język: angielski i polski (od etapu 5)')
w = rep(w, '- Treść i interfejs są po polsku.\n', '- Do etapu 5 treść i interfejs były po polsku.\n')
w = rep(w, '(sesja etapu 5; na stronie po etapie 5)', '(sesja etapu 5; na stronie od etapu 5, @DZIEN@)', 3)
w = rep(w, '(decyzja z 15.10.2026, na stronie po etapie 5)', '(decyzja z 15.10.2026, na stronie od etapu 5, @DZIEN@)')
w = rep(w, 'Angielski to etap 5, w toku (sesja decyzji 15.10.2026).', 'Angielski: etap 5, zrobiony @DZIEN@.')
# CLAUDE.md: the status, the project, the rule of the language, the offline file and the probes
c = line(c, '**Status (', '**Status (@DZIEN@):** etap 5 zrobiony: Route G jest po angielsku i po polsku pod https://grzegorzfrskiba-hub.github.io/wietnam/ (domyślnie po angielsku, przełącznik EN · PL, `&lang=pl` w linku), dalej z `noindex`; strona jest dla podróżnych z całego świata, z cenami w dongach. Następny krok: pierwsza runda anglojęzycznych testerów, zob. [notes/etapy.md](notes/etapy.md).', 'wykonanie planu etapu 5')
c = rep(c, '- **Ten projekt: ogólny planer, dziś po polsku, po etapie 5 „Route G” po angielsku i po polsku.**', '- **Ten projekt: ogólny planer „Route G”, po angielsku i po polsku.**')
c = line(c, '- **Język strony:**', '- **Język strony:** od etapu 5 angielski domyślny i polski drugi, z tymi samymi faktami, na jednym adresie z przełącznikiem EN · PL i `&lang=pl` w linku (decyzje z 15.10.2026 w [notes/etapy.md](notes/etapy.md), „Z sesji decyzji etapu 5”); każdy nowy tekst od razu w obu językach: polski w `site2/src/ui.js` i `content/`, angielski w `site2/src/en/`, a testy dwóch języków pilnują tych samych faktów. Styl tekstów opisuje [notes/wizja.md](notes/wizja.md), sekcja „Treść, bezpieczeństwo, licencje”.', 'do wykonania etapu 5')
c = rep(c, '`site2/out/offline/Wietnam-po-swojemu.html`', '`site2/out/offline/Route-G.html`')
c = rep(c, '`pdf.js` (przycisk PDF, mapa i link w wydruku); sonda kończy się kodem 1', '`pdf.js` (przycisk PDF, mapa i link w wydruku), `lang.js` (przełącznik EN · PL i język w linku, na linku bez `lang=`); każda sonda działa w obu językach, a ustawienia z `&lang=pl` na końcu sprawdzają polską wersję; sonda kończy się kodem 1')
e = e.replace('@DZIEN@', D).replace('DECYZJE-Z-PRZEGLADU', REVIEW).replace('WYNIK-RECENZJI', FINAL)
w = w.replace('@DZIEN@', D)
c = c.replace('@DZIEN@', D)
open('notes/etapy.md', 'w', encoding='utf-8').write(e)
open('notes/wizja.md', 'w', encoding='utf-8').write(w)
open('CLAUDE.md', 'w', encoding='utf-8').write(c)
print(n, 'changes')
NOTESEOF
```

Oczekiwane: `17 changes`. Jeśli skrypt stanie na `assert`, któryś tekst w notatkach zmienił się od commita tego planu: przeczytaj komunikat, popraw skrypt pod nowy tekst i opisz to w wyniku zadania.

- [ ] **Krok 2: Sprawdź**

```bash
git status --short
grep -n "@DZIEN@\|DECYZJE-Z-PRZEGLADU\|WYNIK-RECENZJI" notes/etapy.md notes/wizja.md CLAUDE.md
grep -c $'\xc2\xa0' notes/etapy.md notes/wizja.md CLAUDE.md
```

Oczekiwane:
- zmienione są tylko `notes/etapy.md`, `notes/wizja.md` i `CLAUDE.md`;
- drugi grep nic nie wypisuje;
- trzeci wypisuje `0` przy każdym pliku.

Przeczytaj `git diff` i sprawdź, czy akapity punktu kontrolnego i przeglądu nie mają imion, numerów ani linków z terminami znajomych, a drobne uwagi recenzenta trafiły na listy.

- [ ] **Krok 3: Commit i push**

```bash
git add notes/etapy.md notes/wizja.md CLAUDE.md
git commit -F - <<'EOF'
Notatki: etap 5 zrobiony (Route G po angielsku i po polsku pod jednym adresem, przełącznik EN · PL, &lang=pl w linku, teksty miejsc, podpisy, święta, linki i interfejs po angielsku, testy dwóch języków, poprawki z ustaleń 20–24), punkt kontrolny i końcowy przegląd; następny krok: pierwsza runda anglojęzycznych testerów

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

`git push` tylko za zgodą użytkownika. Na koniec zapytaj o usunięcie gałęzi `sucha-proba-5` (`git branch -D`, bo jej commity mają inne SHA niż `main`, choć pliki są te same).

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` po każdym zadaniu; `bash tests/run.sh --full` w punkcie kontrolnym (ok. 3 min).
- `python3 site2/build.py`, potem `bash "$TMPDIR/sondy-5.sh" MIESIAC` → do zadania 6 `0 z 19 nie przeszło`, od zadania 7 `0 z 21` (po angielsku, z sondą przełącznika), a z drugim argumentem `pl` `0 z 19` (po polsku).
- `grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"` → nic.
- `bash tools/liczby.sh` po planie → to samo co `$TMPDIR/wietnam-5/liczby-przed.md` (zadanie 1).
- `bash tools/links.sh` → 65 z 66 z kodem 200 (Sapa O'Chau 406, zob. zadanie 8, krok 3); `bash tools/licenses.sh` → 97 zdjęć, 0 problemów.
- `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]` → A4, 0 zakrytych linii, w obu językach (ustawienia z `&lang=pl` na końcu to polska wersja).
- Po każdym commicie zadania 2–7: `git diff sucha-proba-5~<7−N> -- site2 tests tools research README.md` (albo commit suchej próby z „Kontekstu dla wykonawcy”) nic nie wypisuje.
