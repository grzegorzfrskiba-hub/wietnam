# Etap 3, partia B, plan B1: Yok Đôn, Mù Cang Chải, Tà Năng–Phan Dũng i Mỹ Sơn — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Zadania mają nagłówki „### Zadanie N:”, a nie „Task N”, więc pomocnicze skrypty `task-start` i `task-brief` ich nie znajdą: wycinaj zadanie od „### Zadanie N:” do następnego „### Zadanie” albo do „## Jak sprawdzać”.

**Cel:** pierwszy plan partii B na żywej stronie. Kolejno:
- **narzędzia i testy:** `tools/liczby.sh` (liczby ze wszystkich tras do punktu kontrolnego, także ze starej kopii źródeł) i test skupiska trzech znaczników na mapie;
- **drobne uwagi z przeglądu etapu 4:** krótkie zdanie bez JavaScriptu na stronie publicznej, zdanie o mapie bez druku, `tools/publish.sh` z wyjściem testów, `.claude/` w `.gitignore`, pkt 16 w researchu wjazdu;
- **Mỹ Sơn w Hội An:** Hội An na 1–3 noce, a przy trzech nocach dzień 3 to Mỹ Sơn o 6:00;
- **szlak Tà Năng–Phan Dũng w Đà Lạt:** na „Ekstremalnie” dni 2 i 3 to dwudniowe przejście z biurem, od 3 nocy, wyłączone w V–X;
- **Yok Đôn:** nowe miejsce z lotniskiem Buôn Ma Thuột, słonie bez jazdy, na „Ekstremalnie” noc w lesie; karta przejazdu mówi, że lot z Đà Nẵng jest tylko we wtorki, czwartki i soboty;
- **Mù Cang Chải:** nowe miejsce za Sa Pa, tarasy u gospodarzy, sezon z wyjątkiem XI–III (tarasy po żniwach), bez trudnego dnia;
- na końcu punkt kontrolny z telefonem, końcowy przegląd świeżego recenzenta, notatki i publikacja (push za zgodą).

**Architektura:**
- **Dane miejsca w tych samych plikach co w partii A:** `places.js`, `seasons.js`, `climate.js`, `travel.js`, `content.js` (lotniska, drogi z lotnisk), `content/<id>.js`, `costs.js`, `before.js`, `photos.js`, `ui.js`. Liczby stoją w tabelach „Zestawienie” w `research/<id>-2026-10.md`, a test danych je porównuje.
- **Dzień w cudzym module** (Mỹ Sơn w Hội An, Tà Năng w Đà Lạt) ma research we własnym pliku; test danych czyta jego tabele wycieczek i rezerwacji z listy `DAY_NOTES`.
- **Lot nie codziennie:** `FLIGHT_DAYS` w `content.js` (para lotnisk → klucz dni), czysta funkcja `flightNotes` w `page.js`, uwaga w karcie przejazdu (`app.js`, klucz `n.flight_days`).
- **Powód sezonu, który nie jest pogodą:** kod `tarasy` w `WEATHER_WHY` (Mù Cang Chải w XI–III); test klimatu nie sprawdza dla niego progów.
- **Silnik bez zmian.** Kadry mapy i paleta bez zmian: nowe miejsca zajmują wolne kolory 18 i 20 i leżą w dzisiejszych kadrach.
- **Testy strony** zostają na 14 dawnych pozycjach, a Hội An ma w nich dawne noce [1, 2, 2]; nowe testy liczą na pełnych danych.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, zrzuty, narzędzia); Chrome bez okna (sondy, zrzuty, wydruk); curl i API Wikimedia Commons (linki, licencje, tylko odczyt).

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): „Moduł: co ma każde miejsce”, pkt 5 („Poziom przygody”), „Treść, bezpieczeństwo, licencje”;
- [notes/etapy.md](../etapy.md): „Etap 3” (partia B), „Następny krok: plan B1 partii B”, listy „Do etapu 3 (partia B i kolejne)” i „Po publikacji, z partią B”;
- decyzje z sesji 14.10.2026, niżej w sekcji „Decyzje z sesji 14.10.2026 (partia B)”;
- research partii B z 14.10.2026 (commit a0bb86c): [Yok Đôn](../../research/yokdon-2026-10.md), [Mù Cang Chải](../../research/mucangchai-2026-10.md), [Tà Năng–Phan Dũng](../../research/tanang-2026-10.md), [Mỹ Sơn](../../research/myson-2026-10.md); odłożone: [Bạch Mã](../../research/bachma-2026-10.md), [Pù Mát](../../research/pumat-2026-10.md).

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS z bloków `:root` (pilnuje tego test `css colours`);
  - `engine.js` i `page.js` bez DOM; dane wchodzą do `page.js` przez argumenty;
  - komentarze w kodzie po angielsku, teksty dla czytelnika po polsku w `ui.js` i `content/`.
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, nigdy sam znak. Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, w `var NB = '…';`. Po każdym zadaniu `grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"` nic nie wypisuje. Narzędzie do zapisu plików bywa, że samo zamienia napis `\u00a0` na znak; ten grep to wyłapie.
- **Grep w planie:** w narzędziu Bash `grep` to nakładka zsh, która pomija pliki binarne i pisze ścieżki bez `./`, a bloki uruchamiane przez `bash -c` biorą `/usr/bin/grep`. Dlatego każdy grep po katalogach ma `-I`.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - liczebniki przez `countWord`; cudzysłów „…”, półpauza w zakresach, godziny 24-godzinne, spacja przed °C;
  - test stylu bierze rzeczowniki na „-cie” za formę 2. osoby liczby mnogiej, więc „namiocie” i „punkcie” trafiają na `NOT_PLURAL`.
- **Ceny i fakty:** każda liczba w `costs.js`, `before.js`, `seasons.js`, `climate.js` i `travel.js` stoi w tabeli researchu, a test danych to sprawdza; nową albo zmienioną liczbę najpierw wpisz do researchu, ze źródłem i datą.
- **Bezpieczeństwo w treści:** zdania o zakazach, przewodnikach i ryzyku (szlak Tà Năng tylko z biurem i przewodnikiem, las Yok Đôn tylko z przewodnikiem parku, niewybuchy w Mỹ Sơn, osuwiska na Khau Phạ) tylko z plików researchu.
- **Linki:** tylko z researchu, oficjalne strony i sprawdzeni operatorzy, bez parametrów śledzących i partnerskich.
- **Zdjęcia:**
  - tylko 11 plików, które już leżą w `photos/` głównej kopii repo: `yokdon_0`–`4`, `mucangchai_0`–`4`, `hoian_6`;
  - pobrane 14.10.2026 za zgodą użytkownika z Wikimedia Commons, na licencjach CC0, CC BY, CC BY-SA i w domenie publicznej; wpisy w `photos/meta.json`;
  - nowych zdjęć nie pobieraj bez zgody.
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu; pełny test (`--full`) w punkcie kontrolnym.
- **Commity:** jeden na zadanie, pliki po nazwie (`git add <pliki>`, nie `git add -A`), opis po polsku, na końcu `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. `git push` tylko za zgodą użytkownika (zadania 9 i 10).
- **Repo jest publiczne:** do commita nie trafiają dane osobowe ani linki z terminami znajomych.

## Na co uważać przy przeglądzie

Sześć sytuacji, w których strona najłatwiej zawiedzie odwiedzającego, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Trzecia noc w Hội An.**
   - Ryzyko: silnik daje Hội An trzecią noc kosztem innych miejsc także na trasach, na których Mỹ Sơn nic nie wnosi.
   - Oczekiwane (sucha próba): Hội An średnio 2,50 nocy zamiast 1,88; 3 noce w 51,7% pobytów, głównie na trasach z kulturą i jedzeniem (64–71% pobytów), na trasach z samą przyrodą albo górami 0–2%; na trasach z samym morzem 69%.
   - Sprawdzenie: zadanie 7, krok 5 (liczby przed planem i po nim, rozbicie Hội An według zainteresowań); decyzja z użytkownikiem, jeśli liczby wyjdą inaczej.
2. **Yok Đôn na trasach z przyrodą.**
   - Ryzyko: park z przyrodą 3 wypiera Cát Tiên i Đà Lạt na południu albo ciągnie trasy w dziwne loty.
   - Oczekiwane: Yok Đôn na 19,6% tras (3,2% bez zainteresowań); Cát Tiên 14,5% → 13,8%, Cúc Phương 19,7% → 17,1%; zygzaki 2,4% → 2,0%, dni z dwoma lotami 10,3% → 9,4%.
   - Sprawdzenie: zadanie 7, krok 5; zrzut z1.
3. **Trudne dni w nowych miejscach.**
   - Ryzyko: noc w lesie Yok Đôn albo pierwszy dzień szlaku Tà Năng w dniu, po którym trasa od razu jedzie daleko; tekst bez przewodnika; wersja dostępna w porze deszczowej.
   - Oczekiwane: obie wersje tylko na „Ekstremalnie”, wyłączone w V–X; noc w lesie (`late`) nie stoi w ostatnim dniu przed drogą do domu ani przed drogą od 7 h; szlak Tà Năng tylko od 3 nocy w Đà Lạt; oba teksty mówią, kto prowadzi.
   - Sprawdzenie: testy w `tests/page.test.js` (zadania 4 i 5), test treści (przewodnik w tekście trudnego dnia), zrzut z1.
4. **Lot z Đà Nẵng do Buôn Ma Thuột.**
   - Ryzyko: silnik planuje lot w dowolny dzień, a Vietnam Airlines lata 3 razy w tygodniu.
   - Oczekiwane: karta przejazdu z tym lotem ma uwagę „Lot Đà Nẵng – Buôn Ma Thuột jest tylko we wtorki, czwartki i soboty: zaplanuj pod niego ten dzień.”
   - Sprawdzenie: test `flightNotes` (zadanie 5), zrzut z4.
5. **Mapa przy krawędzi kadru.**
   - Ryzyko: Yok Đôn leży 0,43° pod górną krawędzią kadru południa, a Mù Cang Chải 0,64° od lewej krawędzi kadru północy, blisko Sa Pa; etykiety mogą wyjść poza kadr albo zakryć się nawzajem.
   - Oczekiwane: etykiety w kadrze, bez nakładania; znaczniki Sa Pa i Mù Cang Chải osobno.
   - Sprawdzenie: sonda `map.js` dla tras z Yok Đôn i z Mù Cang Chải (zadania 5 i 6, zadanie 7), zrzut z6.
6. **Najszersza kwota budżetu.**
   - Ryzyko: szlak Tà Năng (do 298 EUR od osoby) i Yok Đôn podnoszą kwotę na najdłuższych trasach.
   - Oczekiwane (sucha próba): najszersza kwota 8 600–17 200 zł (30 dni z Đà Nẵng w obie strony, góry i morze, „Ekstremalnie”, kwiecień), dalej postać „d ddd–dd ddd zł”, więc mieści się w kafelku przy 641, 768 i 901 px.
   - Sprawdzenie: zrzut z5 (zadanie 7, krok 6).

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest publiczne, strona działa pod https://grzegorzfrskiba-hub.github.io/wietnam/ z `docs/` na `main`. Strona grudniowa (`grzegorzfrskiba-hub/vietnam-december`) zostaje nietknięta.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik.
- **Python:** skrypty bez Pillow uruchamiaj z `-I`; zrzuty i arkusze potrzebują Pillow, więc bez `-I`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`): pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, a IntersectionObserver woła tylko raz; kroje czyta z dysku z flagą `--allow-file-access-from-files`; słowo `MIESIAC` w ustawieniach to miesiąc za pięć miesięcy od dziś. Powiększenie mapy działa od 901 px, więc sondę `map.js` uruchamiaj przy 1400 px.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - w nowym worktree podlinkuj `photos/` z głównej kopii przed buildem i dopisz `/photos` do `$(git rev-parse --git-path info/exclude)`;
  - narzędzie Bash działa w zsh: niecytowana zmienna z listą plików nie dzieli się na słowa, więc wywołania `jsc` z wieloma plikami pisz wprost albo w małym skrypcie bash;
  - `tools/links.sh` dostaje od strony Sapa O'Chau kod 406, a w przeglądarce strona otwiera się normalnie;
  - sonda `changes.js` zakłada link bez „dodaj”, a sonda `before.js` trasę z Cao Bằng, więc nie uruchamiaj ich na innych trasach;
  - WebFetch sam zapisuje pliki PDF, które otworzy; czytaj tylko strony HTML.
- **Zdjęcia:** 97 zdjęć strony (86 dawnych bez `hoian_3` i 11 nowych) leży w `photos/` głównej kopii; `photos/` nie jest w gicie. `hoian_3` zostaje w `photos/`, ale strona go już nie pokazuje.
- **Sucha próba (14.10.2026):**
  - kod i treść zadań 1–6 złożono w osobnym worktree na gałęzi `sucha-proba-b1`, commit po commicie: zadanie 1 `f1033c8`, zadanie 2 `c55e55c`, zadanie 3 `f28e62f`, zadanie 4 `1607cc8`, zadanie 5 `8840956`, zadanie 6 `d1883ea`;
  - kroki tego planu wygenerowano z tych commitów i odtworzono z gotowego tekstu planu na świeżym worktree, zadanie po zadaniu: po krokach testów zadania 3–6 dawały błąd z kroku 2, a po kodzie `ALL PASS`; commit z ostatniego kroku, wykonany dosłownie, brał wszystkie zmienione pliki; pliki i opis commitu po każdym zadaniu są identyczne z suchą próbą;
  - pełny test po zadaniu 6: `combos: 134784 months and 10368 dates (all)`, `ALL PASS` (ok. 145 s);
  - sondy po każdym zadaniu, a po zadaniu 6 dla `MIESIAC` i 2027-07: dwa razy `sondy (…): 0 z 19 nie przeszło`;
  - `tools/links.sh`: 66 z 67 adresów z kodem 200, a strona Sapa O'Chau z kodem 406; `tools/licenses.sh`: `97 photos, 0 licence problem(s), 0 author(s) to check`;
  - wydruk trzech tras: d1 15, d2 13, d3 21 stron A4, 0 zakrytych linii, w obu motywach;
  - liczby ze wszystkich tras przed planem i po nim (zadanie 7, krok 5) i najszersza kwota 8 600–17 200 zł;
  - zrzuty kart Yok Đôn i Đà Lạt ze szlakiem Tà Năng na 390 px obejrzane;
  - skrypt notatek z zadania 10 sprawdzono na kopiach plików po commicie planu (18 zmian);
  - skrypty z zadań 1, 2, 5 i 7 (skrypt sond, wydruk, uwaga o dniach lotu, liczby przed i po, rozbicie Hội An, najszersza kwota, zrzuty i kawałki) uruchomiono dosłownie z tekstu planu, a kawałki zrzutów obejrzano;
  - nie sprawdzono na sucho: telefonu, ręcznego sprawdzenia w przeglądarce, przeglądu z użytkownikiem, końcowego przeglądu i publikacji (zadania 7–10).

**Doprecyzowania z suchej próby, do zatwierdzenia razem z planem:**
- **Testy strony planują z dawnymi nocami Hội An** ([1, 2, 2]), tak jak z 14 dawnymi pozycjami, więc przypięte trasy się nie ruszają; trzecią noc sprawdzają nowe testy na pełnych danych.
- **Przypięty test rezerwacji „przyroda na poziomie 3”** (marzec) ma teraz szlak Tà Năng zamiast przewodników na Bidoup i Lang Biang, bo trasa wypada w porze suchej na „Ekstremalnie” (zadanie 4).
- **Koszt szlaku Tà Năng z powrotem do Đà Lạt:** najtańsze biuro (Highland Adventure Travel, 172 EUR) kończy szlak w Liên Hương, więc pozycja ma za grupę auto z powrotem, 79 EUR (szacunek z researchu). Dwie osoby płacą od ok. 212 EUR od osoby, jedna od 251 EUR; górna granica 298 EUR. Tak samo zapisana jest pozycja `dalat.langbiang` (zadanie 4, wiersz w researchu poprawiony w tym samym kroku).
- **Lot paralotnią jako opcja:** `mucangchai.paragliding` kosztuje od 0 (bez lotu) do 75 EUR, a nie stałe 75 EUR w każdym budżecie (zadanie 6, wiersz w researchu poprawiony w tym samym kroku).
- **Średni sezon Mù Cang Chải w XI–III** ma kod powodu `tarasy` („tarasy po żniwach, bez ryżu”), bo test klimatu przyjmuje tylko kody z `WEATHER_WHY`, a progi pogodowe tych miesięcy nie spełniają. Poprawka do opisu w sesji: wyjątek obejmuje też luty (`SSSDSZZZDDSS`).
- **Godziny słońca w researchu Yok Đôn i Mù Cang Chải** zapisane pełnymi godzinami, jak w innych plikach, bo test klimatu czyta liczby po przecinku; dawne wartości z tabeli zostają w nawiasie. W Mù Cang Chải ulewy VI–VIII test sprawdza właśnie z godzinami słońca.
- **Lùng Cúng bez wiersza w tabeli rezerwacji** Mù Cang Chải (bez trudnego dnia), z notką pod tabelą; linki Mebayluon bez spacji przed średnikiem, bo test dzieli je po „; ”.
- **Bez punktu Khau Phạ na mapie**, z tego samego powodu co Mỹ Sơn: punkt (`poi`) pokazuje się przy każdym pobycie, także bez dnia, którego dotyczy.
- **Yok Đôn:** łódź po Sêrêpốk rezerwuje się razem z noclegiem w parku (`yokdon.boat` z `book: 'yokdon.stay'`), a w tekście nocy w lesie stoi, że słonie z programu zobaczysz w dniu przyjazdu, jeśli zdążysz na turę 13:30–16:30.
- **Kwota dzienna:** wstępy do parku Yok Đôn i na punkty widokowe w Mù Cang Chải (do ok. 5 EUR) liczą się w kwocie dziennej, jak w innych miejscach, więc nie są pozycjami dni.
- **Sondy:** `$TMPDIR/sondy-b1.sh` to sondy etapu 4 i trzy przebiegi `map.js` dla tras z nowymi miejscami (19 sond).

## Decyzje z sesji 14.10.2026 (partia B)

Na start: opinii pierwszej rundy znajomych jeszcze nie ma, a większość testerów będzie anglojęzyczna. Użytkownik: robimy partię B, a drugi język, angielski jako przewodni, to kolejny etap.

Pytania do użytkownika i odpowiedzi (wszystkie według rekomendacji):
1. **Bạch Mã:** odłożony. Droga na szczyt jest przerwana osuwiskiem na km 12 od 27.10.2025, a w czerwcu 2026 naprawa nie miała pieniędzy. Research zostaje w repo.
2. **Pù Mát:** odłożony. Noc w lesie, dla której był w partii B, nie jest potwierdzona na 2026. Research zostaje w repo; bez lotniska Vinh i bez zmiany kadru mapy.
3. **Tà Năng–Phan Dũng:** trudna wersja dni 2 i 3 w Đà Lạt (jak Hang Én), od 3 nocy, wyłączona w V–X, tekst każe wybrać biuro z powrotem do Đà Lạt, a koszt obejmuje powrót.
4. **Sezon Mù Cang Chải:** wyjątek, średni sezon w XI–III, bo tarasy stoją po żniwach (`SSSDSZZZDDSS`).
5. **Yok Đôn:** pełne miejsce z lotniskiem Buôn Ma Thuột, przyroda 3, na „Ekstremalnie” noc w lesie, ostrzeżenie o upale w III–IV.
6. **Mỹ Sơn:** trzecia noc w Hội An i nowy dzień 3.
7. **Plany:** dwa. B1: miejsca, drobne uwagi etapu 4, punkt kontrolny, publikacja. B2: długi ogon researchu, kurs NBP i największe ceny, w osobnej sesji. Potem etap angielski.

Lista 23 ustaleń, zatwierdzona w całości (tu w skrócie, w grupach):
- **Zakres i kolejność (1–5):** dwa plany, B1 i B2, potem etap 5, angielski; Bạch Mã i Pù Mát odłożone z dopiskiem w researchu; angielski będzie językiem przewodnim, a polski drugim (zapis w wizji i w `etapy.md`); teksty partii B po polsku; `noindex` zostaje do etapu angielskiego i opinii pierwszej rundy.
- **Miejsca i dni (6–12):**
  - Yok Đôn: oś 12,87, noce [1, 2, 2], poziom 1, sezon `DDDDSSSSSSDD`, kolor 18, fit: kultura 1, jedzenie 1, przyroda 3; słonie bez jazdy, las i Sêrêpốk z przewodnikiem, kawa i domy Ê Đê; na „Ekstremalnie” biwak przy Thác Phật, słonie w turze popołudniowej dnia przyjazdu; ostrzeżenie o upale w III–IV; zdania o słoniach i lesie tylko z researchu;
  - lotnisko Buôn Ma Thuột z lotami z Hồ Chí Minh City, Hà Nội i Đà Nẵng (dopisek „wt, czw, sob”), drogi z Đà Lạt i z lotniska;
  - Mù Cang Chải: oś 22,95 (za Sa Pa), noce [2, 2, 3], poziom 1, u gospodarzy, kolor 20, fit: kultura 1, przyroda 2, góry 2; sezon z wyjątkiem; wydarzenia: pora wody, złote tarasy, paralotnia; bez trudnego dnia; drogi z Hà Nội, z lotniska, z Sa Pa i z Hà Giang, bez Pù Luông; wybór między Sa Pa a Mù Cang Chải zostaje silnikowi;
  - Tà Năng–Phan Dũng jak w pytaniu 3, koszt 172–298 EUR od osoby z powrotem, dopisek o błędnym źródle kary w starym researchu;
  - Mỹ Sơn jak w pytaniu 6: wersja spokojna z łodzią, plan na deszcz z Muzeum Rzeźby Czamskiej, bilet 5 EUR, auto 28–41 EUR, oznaczone ścieżki, bez punktu na mapie, zdjęcie zamiast jednego z galerii Hội An;
  - paleta bez rozszerzenia (kolory 18 i 20); rozszerzenie z partią Bạch Mã i Pù Mát;
  - zdjęcia: po 5 dla Yok Đôn i Mù Cang Chải, 1 dla Mỹ Sơn, przez dwie zgody (miniatury z arkuszami, potem 1920 px; obie udzielone 14.10.2026).
- **Dane, silnik, testy (13–18):** dane z planu 2B dla nowych miejsc i dni; test danych czyta research dni w cudzym module; test skupiska trzech znaczników; bez nowych reguł silnika (problem kolejności miejsc wraca jako decyzja z liczbami); noc w Hà Nội po pętli północy nie w B1, a skrypt liczb trafia do `tools/` i liczy długie dni z lotem także przy wylotach; liczby przed planem i po nim w punkcie kontrolnym, z sondą budżetu przy 641, 768 i 901 px.
- **Drobne uwagi z etapu 4 (19):** w B1 `tools/publish.sh` z wyjściem testów, `.claude/` w `.gitignore`, krótsze zdanie w `<noscript>` na stronie publicznej, zdanie o mapie bez druku, pkt 16 researchu wjazdu; bez zmian: luka na pierwszej stronie wydruku, prawie pusta ostatnia strona, znaki →, ≈ i ✈ z kroju zastępczego; PDF z Safari i komunikatorów oraz zdanie MSZ tylko po zgłoszeniu.
- **Proces (20–23):** sucha próba na gałęzi `sucha-proba-b1` z krokami z commitów i odtworzeniem planu; punkt kontrolny z telefonem i końcowy przegląd świeżego recenzenta na najmocniejszym modelu przed publikacją; research i plan na `main` bez push, z notatkami i promptem na sesję wykonania; plan B2 zaczyna się od krótkiej sesji decyzji.

## Jak działa strona po planie B1

- **Nowe miejsca:** Yok Đôn (Wyżyna Centralna, kolor 18) i Mù Cang Chải (północ, kolor 20), każde z treścią na trzech poziomach, sezonem, klimatem, drogami, cenami, rezerwacjami i pięcioma zdjęciami.
- **Nowe dni w dawnych miejscach:** Hội An przy trzech nocach jedzie do Mỹ Sơn; Đà Lạt na „Ekstremalnie” od 3 nocy idzie szlakiem Tà Năng–Phan Dũng (poza V–X).
- **Nowe lotnisko:** Buôn Ma Thuột (BMV). Lot z Đà Nẵng ma w karcie przejazdu uwagę o dniach tygodnia.
- **Powód sezonu „tarasy po żniwach, bez ryżu”** pojawia się przy pogodzie, w „Nie ma na twojej trasie, bo…” i w ostrzeżeniu o złym sezonie zainteresowania.
- **Strona publiczna** mówi przeglądarce bez JavaScriptu krótko, żeby go włączyć; plik offline zostaje przy zdaniu o podglądzie pliku na iPhonie.

## Struktura plików

- Utwórz: `tools/liczby.sh`, `tools/liczby.js`, `site2/src/content/yokdon.js`, `site2/src/content/mucangchai.js`
- Zmień:
  - dane: `site2/src/places.js`, `seasons.js`, `climate.js`, `travel.js`, `content.js`, `costs.js`, `before.js`, `photos.js`, `ui.js`, `content/hoian.js`, `content/dalat.js`;
  - kod: `site2/src/page.js` (`flightNotes`), `site2/src/app.js` (uwaga o dniach lotu), `site2/src/template.html` (zdanie o mapie, `<noscript>`), `site2/build.py` (`NOSCRIPT`), `tools/publish.sh`, `.gitignore`;
  - research: `research/wjazd-2026-10.md`, `research/tanang-2026-10.md`, `research/yokdon-2026-10.md`, `research/mucangchai-2026-10.md`;
  - testy: `tests/page.test.js`, `tests/data.test.js`, `tests/content.test.js`, `tests/probes/publish.js`;
  - notatki (zadanie 10): `notes/etapy.md`, `notes/wizja.md`, `CLAUDE.md`, nowy raport tras; strona w `docs/` (zadanie 9).

---

### Zadanie 1: Narzędzia i testy przed partią B

Dwa punkty z listy „Do etapu 3 (partia B i kolejne)”:
- **`tools/liczby.sh`:** liczby ze wszystkich 134 784 tras do przeglądu w punkcie kontrolnym. Dotąd skrypt liczb stał w planie 2 partii A i liczył długie dni z lotem tylko przy przylotach do Sa Pa i Hà Giang. Teraz jest w `tools/` i liczy:
  - udział miejsc i średnie noce, z rozkładem pobytów według nocy;
  - dni z dwoma lotami i dni z lotem 8 h i dłużej, z najczęstszymi odcinkami w obie strony;
  - Hà Nội trzy razy, bliskie miejsca nie obok siebie, zygzaki i powroty do domu w środku trasy.

  Argument to katalog źródeł, więc kopia z `git archive` daje liczby „przed”.
- **Skupisko trzech znaczników** na mapie: `spreadPins` miał w testach tylko pary. Test sprawdza trójkąt, trzy znaczniki w rzędzie, trzy w jednym punkcie i trzy w rogu kadru: po rundach żadne dwa się nie zakrywają (z dokładnością do setnej piksela), każdy ma swój punkt i zostaje w kadrze. Kod `spreadPins` się nie zmienia: test przechodzi od razu i pilnuje zachowania przed miejscami partii B.

**Pliki:**
- Utwórz: `tools/liczby.sh`, `tools/liczby.js`
- Testy: `tests/page.test.js`

**Interfejsy:**
- Daje: `bash tools/liczby.sh [katalog źródeł]` (Markdown na wyjściu); zadanie 7 bierze z niego liczby przed planem i po nim.

- [ ] **Krok 1: Test skupiska trzech znaczników.**

W `tests/page.test.js` zamień:

```js
  'pins 12 px apart in a row move to 22 px, one above the other to 22 px; pins apart stay; two on one point go sideways; at the edge the other pin moves');
```

na:

```js
  'pins 12 px apart in a row move to 22 px, one above the other to 22 px; pins apart stay; two on one point go sideways; at the edge the other pin moves');
// a cluster of three pins (a triangle, three in a row, three on one point, in a corner): no two overlap after the rounds
// (the pairs come within a hundredth of a pixel of PIN_GAP), each keeps its point and stays inside the panel
function cluster(q) {
  var pins = spreadPins(q.map(function (a) { return { x: a[0], y: a[1], w: PIN_H }; }), { w: 270, h: 270 });
  return pins.every(function (a, i) {
    return a.px === q[i][0] && a.py === q[i][1] && a.x >= PIN_H / 2 && a.x <= 270 - PIN_H / 2 && a.y >= PIN_H / 2 && a.y <= 270 - PIN_H / 2 &&
      pins.slice(i + 1).every(function (b) { return Math.abs(b.x - a.x) >= PIN_H + PIN_GAP - 0.01 || Math.abs(b.y - a.y) >= PIN_H + PIN_GAP - 0.01; });
  });
}
eq([[[100, 100], [112, 100], [106, 108]], [[100, 100], [110, 100], [120, 100]], [[100, 100], [100, 100], [100, 100]], [[5, 5], [12, 8], [8, 15]]].map(cluster),
  [true, true, true, true], 'three pins in a cluster: apart after the rounds, each with its point, inside the panel');
```

- [ ] **Krok 2: Uruchom testy**

```bash
bash tests/run.sh
```

Oczekiwane: `ALL PASS`. Test pilnuje dzisiejszego zachowania `spreadPins`, więc przechodzi od razu.

- [ ] **Krok 3: Skrypt liczb**

Utwórz `tools/liczby.js`:

```js
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
```

Utwórz `tools/liczby.sh`:

```bash
#!/bin/bash
# Prints the numbers of every combination (134 784 trips, about a minute) as Markdown, for the review at a checkpoint:
#   bash tools/liczby.sh [directory of the sources]   (default site2/src; an old copy, e.g. from git archive, gives "before")
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
S=${1:-site2/src}
"$J" $S/places.js $S/seasons.js $S/travel.js $S/engine.js $S/content.js $S/content/*.js tools/liczby.js
```

- [ ] **Krok 4: Skrypt sond i liczby przed planem**

Skrypt sond tego planu leży poza repo, w `$TMPDIR`. To sondy etapu 4 i trzy przebiegi `map.js` dla tras z nowymi miejscami. Zanim nowe miejsca wejdą do danych, link z `dodaj=yokdon` albo `dodaj=mucangchai` pomija nieznane miejsce, więc sond jest zawsze 19:

```bash
cat > "$TMPDIR/sondy-b1.sh" <<'SONDYEOF'
#!/bin/bash
# The probes of batch B, plan 1, for one month (MIESIAC: five months from today): the 16 of stage 4 and map.js for three
# trips with the new places (an unknown place in dodaj is left out before its task); prints a line for each failure and
# the count at the end. Run from the repository's folder after python3 site2/build.py.
M=${1:-MIESIAC}
A="od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang"
B="od=SGN&do=HAN&miesiac=$M&dni=15&co=&poziom=2"
bad=0; n=0
run() {
  n=$((n+1))
  bash tests/probe.sh "tests/probes/$1" "$2" "$3" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL $1 $2 $3"; grep -iE "fail|error" "$TMPDIR/sonda.txt" | head -5; }
}
for w in 390 641 768 901 1100 1400; do run before.js $w "$A"; done
for w in 390 360 320; do run settings.js $w "$B"; done
run map.js 1400 "$B"
run map.js 1400 "od=SGN&do=SGN&miesiac=$M&dni=10&co=przyroda&poziom=2&dodaj=yokdon"
run map.js 1400 "od=DAD&do=SGN&miesiac=$M&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon"
run map.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=16&co=gory,przyroda&poziom=2&dodaj=mucangchai,sapa"
run changes.js 1400 "$B"
run changes.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2"
run anchors.js 390 "$B"
run link.js 1400 "od=HAN&do=DAD&miesiac=$M&dni=12&co=kultura&poziom=3"
run publish.js 1400 "$B"
run pdf.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=gory,kultura&poziom=2"
echo "sondy ($M): $bad z $n nie przeszło"
SONDYEOF
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-b1.sh" MIESIAC
mkdir -p "$TMPDIR/wietnam-b1/przed"
git archive HEAD site2/src | tar -x -C "$TMPDIR/wietnam-b1/przed"
bash tools/liczby.sh "$TMPDIR/wietnam-b1/przed/site2/src" > "$TMPDIR/wietnam-b1/liczby-przed.md"
tail -n 5 "$TMPDIR/wietnam-b1/liczby-przed.md"
```

Oczekiwane:
- `ALL PASS`, build bez błędów, grep nic nie wypisuje;
- `sondy (…): 0 z 19 nie przeszło`;
- liczby przed planem (ok. minuty), jak w suchej próbie: `Dzień z dwoma lotami: 10,3% tras.`, `Dzień z lotem 8 h i dłużej od drzwi do drzwi: 12,2% tras.`, `Hà Nội trzy razy: 1497 tras.`, zygzak `2,4% tras`. Plik `liczby-przed.md` czyta zadanie 7.

- [ ] **Krok 5: Commit**

```bash
git add tests/page.test.js tools/liczby.js tools/liczby.sh
git commit -F - <<'EOF'
Narzędzia i testy przed partią B: tools/liczby.sh (liczby ze wszystkich 134 784 tras do przeglądu w punkcie kontrolnym, także ze starej kopii źródeł: udział miejsc, średnie noce i pobyty według nocy, dni z dwoma lotami, dni z lotem 8 h i dłużej z najczęstszymi odcinkami w obie strony, Hà Nội trzy razy, bliskie miejsca nie obok siebie, zygzaki, powroty do domu w środku trasy); test skupiska trzech znaczników na mapie (spreadPins)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Drobne uwagi z końcowego przeglądu etapu 4

Pięć uwag z listy „Po publikacji, z partią B” (ustalenie 19):
- **`<noscript>`:** na stronie publicznej krótkie zdanie („…potrzebuje JavaScriptu: włącz go w ustawieniach przeglądarki.”), a w pliku offline dawne, o podglądzie pliku na iPhonie. `build.py` wybiera zdanie ze słownika `NOSCRIPT` według rodzaju dokumentu; znacznik `__SITE_URL__` w szablonie znika, bo adres stoi w zdaniu pliku offline z `SITE_URL`.
- **Wydruk:** zdanie „Mapa jest w skali, a na dużym ekranie zostaje w widoku przy przewijaniu.” stoi w osobnym kluczu `days.p_map` i w elemencie `.days-map`, którego CSS wydruku nie pokazuje.
- **`tools/publish.sh`:** przy nieudanych testach pokazuje 40 ostatnich linii ich wyjścia i nie rusza `docs/`.
- **`.gitignore`:** `.claude/`, bo punkt kontrolny tworzy na chwilę `.claude/launch.json`.
- **`research/wjazd-2026-10.md`, pkt 16:** strona nie ma linijki źródeł; ma trzy linki (`ENTRY.links`) i adresy urzędów w zdaniach.

**Pliki:**
- Zmień: `site2/build.py`, `site2/src/template.html`, `site2/src/ui.js`, `tools/publish.sh`, `.gitignore`, `research/wjazd-2026-10.md`
- Testy: `tests/probes/publish.js`

- [ ] **Krok 1: Sonda strony publicznej**

W `tests/probes/publish.js` zamień:

```js
// try it: NOINDEX in site2/build.py), and the sentence for a viewer without JavaScript (an iPhone's preview of a file).
```

na:

```js
// try it: NOINDEX in site2/build.py), and the short sentence for a viewer without JavaScript (the offline file has a longer
// one, about an iPhone's preview of a file: NOSCRIPT in site2/build.py).
```

W `tests/probes/publish.js` zamień:

```js
  check('a viewer without JavaScript gets a sentence with the address', !!ns && /potrzebuje JavaScriptu/.test(ns.textContent) && /grzegorzfrskiba-hub\.github\.io\/wietnam\//.test(ns.textContent), ns && ns.textContent);
```

na:

```js
  check('a viewer without JavaScript gets a short sentence, without the iPhone\'s file preview', !!ns && /potrzebuje JavaScriptu/.test(ns.textContent) && !/podglądzie pliku/.test(ns.textContent), ns && ns.textContent);
```

- [ ] **Krok 2: Sonda na starym buildzie nie przechodzi**

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/publish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: `FAIL a viewer without JavaScript gets a short sentence, without the iPhone's file preview`, bo strona ma jeszcze dawne zdanie.

- [ ] **Krok 3: Build, szablon, teksty, skrypt publikacji, research**

W `.gitignore` zamień:

```text
.superpowers/
```

na:

```text
.superpowers/
.claude/
```

W `research/wjazd-2026-10.md` zamień:

```markdown
16. **Linijka źródeł na stronie:** „Źródła: rząd Wietnamu (uchwała 229/NQ-CP), Ambasada RP w Hanoi, GIS; sprawdzone 11.10.2026.”
```

na:

```markdown
16. **Linijka źródeł na stronie:** „Źródła: rząd Wietnamu (uchwała 229/NQ-CP), Ambasada RP w Hanoi, GIS; sprawdzone 11.10.2026.”
   - Doprecyzowane 14.10.2026 (uwaga z końcowego przeglądu etapu 4): tej linijki na stronie nie ma. „Wjazd i zdrowie” kończy się trzema linkami (`ENTRY.links` w `site2/src/before.js`: strona Ambasady RP o zwolnieniu z wiz, Odyseusz MSZ i zalecane szczepienia GIS), zdania podają adresy prearrival.immigration.gov.vn i evisa.gov.vn, a źródła każdego zdania stoją tu, w nawiasach po zdaniach. Zdanie zostaje jako propozycja, gdyby strona miała kiedyś pokazywać źródła.
```

W `site2/build.py` zamień:

```python
NOINDEX = True
```

na:

```python
NOINDEX = True

# The sentence for a viewer without JavaScript: on the public page a short one; in the offline file the longer one, as an
# iPhone shows a sent HTML file in a preview that runs no scripts.
NOSCRIPT = {
    "page": "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu: włącz go w ustawieniach przeglądarki.",
    "offline": "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu. Jeśli widzisz ten tekst w podglądzie pliku na iPhonie, "
               "otwórz w przeglądarce stronę %s albo zapisz na niej swoją trasę jako PDF." % SITE_URL,
}
```

W `site2/build.py` zamień:

```python
    def page(photos, fonts):
```

na:

```python
    def page(photos, fonts, kind):
```

W `site2/build.py` zamień:

```python
                .replace("__HERO_H__", str(top["h"])).replace("/* __FONTS__ */", fonts).replace("__SITE_URL__", SITE_URL).replace("__SCRIPT__", script))

    web_page = page(web, fonts_css(False))
```

na:

```python
                .replace("__HERO_H__", str(top["h"])).replace("/* __FONTS__ */", fonts).replace("__NOSCRIPT__", NOSCRIPT[kind]).replace("__SCRIPT__", script))

    web_page = page(web, fonts_css(False), "page")
```

W `site2/build.py` zamień:

```python
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off, fonts_css(True))))
```

na:

```python
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off, fonts_css(True), "offline")))
```

W `site2/src/template.html` zamień:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .lightbox, .mapzoom, .shape-click { display: none !important; }
```

na:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .shape-click { display: none !important; }
```

W `site2/src/template.html` zamień:

```html
<noscript><p class="noscript">Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu. Jeśli widzisz ten tekst w podglądzie pliku na iPhonie, otwórz w przeglądarce stronę __SITE_URL__ albo zapisz na niej swoją trasę jako PDF.</p></noscript>
```

na:

```html
<noscript><p class="noscript">__NOSCRIPT__</p></noscript>
```

W `site2/src/template.html` zamień:

```html
      <p data-i18n="days.p"></p>
```

na:

```html
      <p><span data-i18n="days.p"></span> <span class="days-map" data-i18n="days.p_map"></span></p>
```

W `site2/src/ui.js` zamień:

```js
  'days.p': 'Każde miejsce ze zdjęciami, planem na każdy dzień i opisem dojazdu. Mapa jest w skali, a na dużym ekranie zostaje w widoku przy przewijaniu.',
```

na:

```js
  'days.p': 'Każde miejsce ze zdjęciami, planem na każdy dzień i opisem dojazdu.', 'days.p_map': 'Mapa jest w skali, a na dużym ekranie zostaje w widoku przy przewijaniu.',
```

W `tools/publish.sh` zamień:

```bash
bash tests/run.sh > /dev/null
```

na:

```bash
if ! out=$(bash tests/run.sh 2>&1); then
  echo "$out" | tail -n 40 >&2
  echo "publish.sh: the tests failed (the end of their output above), docs/ is unchanged" >&2
  exit 1
fi
```

- [ ] **Krok 4: Testy, build, sondy i wydruk**

```bash
bash tests/run.sh
python3 site2/build.py
grep -o '<noscript><p class="noscript">[^<]*' site2/out/pages/index.html site2/out/offline/Wietnam-po-swojemu.html
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-b1.sh" MIESIAC
bash tests/print.sh 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=gory,kultura&poziom=2' "$TMPDIR/wietnam-b1/z2.pdf"
python3 - "$TMPDIR/wietnam-b1/z2.pdf" <<'PYEOF'
import sys, fitz
t = ''.join(p.get_text() for p in fitz.open(sys.argv[1]))
print('mapa w druku:', 'Mapa jest w skali' in t, '| pierwsze zdanie w druku:', 'opisem dojazdu' in t)
PYEOF
```

Oczekiwane:
- `ALL PASS`, build bez błędów;
- strona publiczna: „Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu: włącz go w ustawieniach przeglądarki.”; plik offline: dawne zdanie z adresem strony;
- grep twardych spacji nic nie wypisuje;
- `sondy (…): 0 z 19 nie przeszło`;
- wydruk: 0 zakrytych linii, a skrypt wypisuje `mapa w druku: False | pierwsze zdanie w druku: True`.

- [ ] **Krok 5: Commit**

```bash
git add .gitignore research/wjazd-2026-10.md site2/build.py site2/src/template.html site2/src/ui.js tests/probes/publish.js tools/publish.sh
git commit -F - <<'EOF'
Drobne uwagi z końcowego przeglądu etapu 4: na stronie publicznej krótkie zdanie dla przeglądarki bez JavaScriptu, a w pliku offline dawne, o podglądzie pliku na iPhonie (NOSCRIPT w build.py, sonda publish.js); zdanie „Mapa jest w skali…” nie drukuje się; tools/publish.sh pokazuje koniec wyjścia testów, gdy nie przechodzą; .claude/ w .gitignore; research wjazdu mówi, że strona nie ma linijki źródeł, tylko trzy linki i adresy w zdaniach

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Mỹ Sơn w Hội An

Z `research/myson-2026-10.md` i pytania 6:
- **dane:** Hội An ma noce [1, 2, 3]; testy strony planują dalej z dawnymi [1, 2, 2], jak z 14 dawnymi pozycjami;
- **treść:** dzień 3 (`p: 3, o: 3`) „Mỹ Sơn o 6:00”: auto z kierowcą o 5:00, kasa od 6:00, wózek w głąb doliny, grupy B, C, D, A i G, występ tańca Czamów o 9:00, oznaczone ścieżki z powodu niewybuchów, popołudnie w Hội An; plan na deszcz: komunikat zarządu i Muzeum Rzeźby Czamskiej w Đà Nẵng; na „Spokojnie” wycieczka grupowa z odbiorem ok. 7:00 i powrotem łodzią po Thu Bồn (`early: false`); wydarzenie powodzi mówi też o drodze do Mỹ Sơn;
- **ceny i rezerwacje:** `hoian.myson` 5 EUR na osobę i 28–41 EUR za auto, `hoian.myson_tour` 26–36 EUR na osobę; rezerwacje dzień wcześniej (auto, bilet w kasie albo online) i 2 dni wcześniej (wycieczka);
- **test danych:** czyta tabele „Zestawienie: wycieczki” i „Zestawienie: rezerwacje” dni w cudzym module z listy `DAY_NOTES`;
- **zdjęcie:** `hoian_6` (grupy B, C i D, Gary Todd, CC0) zamiast `hoian_3`; galeria ma dalej pięć zdjęć.

**Pliki:**
- Zmień: `site2/src/places.js`, `site2/src/content/hoian.js`, `site2/src/costs.js`, `site2/src/before.js`, `site2/src/ui.js`, `site2/src/photos.js`
- Testy: `tests/page.test.js`, `tests/data.test.js`

**Interfejsy:**
- Daje: `DAY_NOTES` w `tests/data.test.js` (zadanie 4 dopisuje do niej `tanang`); `COSTS.items['hoian.myson']`, `['hoian.myson_tour']`; `BOOK` pod tymi samymi kluczami.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/data.test.js` zamień:

```js
  .map(function (id) { return 'research/' + id + '-2026-10.md'; });
```

na:

```js
  .map(function (id) { return 'research/' + id + '-2026-10.md'; });
// a day added to another place's module in batch B keeps its research in a note of its own too, with the tables
// „Zestawienie: wycieczki” and „Zestawienie: rezerwacje” (Mỹ Sơn in Hội An)
var DAY_NOTES = ['research/myson-2026-10.md'];
```

W `tests/data.test.js` zamień:

```js
  });
  OWN_NOTES.forEach(function (p) {
    researchRows(p, '### Zestawienie: ceny').forEach(function (r) { base[r[0]] = [n(r[2]), n(r[3])]; });
```

na:

```js
  });
  OWN_NOTES.concat(DAY_NOTES).forEach(function (p) {
    researchRows(p, '### Zestawienie: ceny').forEach(function (r) { base[r[0]] = [n(r[2]), n(r[3])]; });
```

W `tests/data.test.js` zamień:

```js
  OWN_NOTES.forEach(function (p) { researchRows(p, '### Zestawienie: rezerwacje').forEach(function (r) { rows[r[0]] = r; }); });
```

na:

```js
  OWN_NOTES.concat(DAY_NOTES).forEach(function (p) { researchRows(p, '### Zestawienie: rezerwacje').forEach(function (r) { rows[r[0]] = r; }); });
```

W `tests/page.test.js` zamień:

```js
OLD_IDS.forEach(function (id) { OLD_PLACES[id] = PLACES[id]; });
```

na:

```js
OLD_IDS.forEach(function (id) { OLD_PLACES[id] = PLACES[id]; });
// Hội An with its nights of stages 1–2 (since batch B it has a third, with Mỹ Sơn)
OLD_PLACES.hoian = JSON.parse(JSON.stringify(PLACES.hoian));
OLD_PLACES.hoian.nights = [1, 2, 2];
```

W `tests/page.test.js` zamień:

```js
  'mountains in March at level 3 with Sa Pa: Fansipan on foot, on the list of what to book');
```

na:

```js
  'mountains in March at level 3 with Sa Pa: Fansipan on foot, on the list of what to book');
// Hội An: at three nights the third day is Mỹ Sơn from 6:00 (at level 1 the group tour with the boat back, from about
// 7:00), with its own rain plan; at two nights the days stay as they were
function ha(n, level) { return stopDays(CONTENT.hoian, { n: n, start: 1 }, 0, level, [2, 2, 2]).map(function (d) { return d.t; }); }
var mySon = stopDays(CONTENT.hoian, { n: 3, start: 1 }, 0, 1, [2, 2, 2])[2], mySon2 = stopDays(CONTENT.hoian, { n: 3, start: 1 }, 0, 2, [2, 2, 2])[2];
eq([ha(2, 2), ha(3, 2), [mySon2.early, mySon2.cost, /Muzeum Rzeźby Czamskiej/.test(mySon2.rain)], [mySon.variant, mySon.early, mySon.cost], PLACES.hoian.nights],
  [['Bocznymi drogami Hội An', 'Stare miasto o 6:00'], ['Bocznymi drogami Hội An', 'Stare miasto o 6:00', 'Mỹ Sơn o 6:00'], [true, ['hoian.myson'], true],
   ['easy', false, ['hoian.myson_tour']], [1, 2, 3]],
  'Hội An: Mỹ Sơn from 6:00 on the third day at three nights, with a rain plan; at level 1 the group tour with the boat back');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: błąd w `tests/page.test.js`:

```text
Exception: TypeError: null is not an object (evaluating 'stopDays(CONTENT.hoian, { n: 3, start: 1 }, 0, 1, [2, 2, 2])[2]')
```

(Hội An ma jeszcze dwa plany dni, więc trzy noce nie dają planu.)

- [ ] **Krok 3: Dane, treść, ceny, rezerwacje i zdjęcie**

W `site2/src/before.js` zamień:

```js
   of its own note (tests/data.test.js checks them against both); tools/links.sh
```

na:

```js
   of its own note, for a day added to another place's module the note of the day (Mỹ Sơn: research/myson-2026-10.md;
   tests/data.test.js checks them against both); tools/links.sh
```

W `site2/src/before.js` zamień:

```js
  'cattien.park': { ahead: 1, links: [{ name: 'Park Cát Tiên, kontakt', url: 'https://cattiennationalpark.com.vn/lien-he/' }, { name: 'Park Cát Tiên, nocne safari', url: 'https://cattiennationalpark.com.vn/xem-thu-dem/' }] },
  'puluong.guide': { ahead: 1, links: [] },
  'cucphuong.car': { ahead: 1, links: [] },
```

na:

```js
  'hoian.myson_tour': { ahead: 2, links: [{ name: 'LocalVietnam, Mỹ Sơn', url: 'https://localvietnam.com/tour/my-son-sanctuary-tour/' }] },
  'cattien.park': { ahead: 1, links: [{ name: 'Park Cát Tiên, kontakt', url: 'https://cattiennationalpark.com.vn/lien-he/' }, { name: 'Park Cát Tiên, nocne safari', url: 'https://cattiennationalpark.com.vn/xem-thu-dem/' }] },
  'puluong.guide': { ahead: 1, links: [] },
  'cucphuong.car': { ahead: 1, links: [] },
  'hoian.myson': { ahead: 1, links: [{ name: 'Hoi An Transport Service, Mỹ Sơn', url: 'https://hoiantransportservice.com/hoi-an-my-son-sanctuary-by-private-car/' }, { name: 'Vietnam Vacation Travel, Mỹ Sơn', url: 'https://vietnamvacation.com.vn/hoi-an-to-my-son-sanctuary/' }, { name: 'Mỹ Sơn, bilety online', url: 'https://mysonticketonline.vn/ticket' }] },
```

W `site2/src/content/hoian.js` zamień:

```js
/* Hội An: texts of the place (plan 1B; the December planner had Hội An and Huế as one place). Fields: see site2/src/content.js. */
```

na:

```js
/* Hội An: texts of the place (plan 1B; the December planner had Hội An and Huế as one place; Mỹ Sơn on the third day since
   batch B, facts and sources in research/myson-2026-10.md). Fields: see site2/src/content.js. */
```

W `site2/src/content/hoian.js` zamień:

```js
  photos: ['hoian_0', 'hoian_1', 'hoian_3', 'hoian_4', 'hoian_5'],
```

na:

```js
  photos: ['hoian_0', 'hoian_1', 'hoian_6', 'hoian_4', 'hoian_5'],
```

W `site2/src/content/hoian.js` zamień:

```js
      rain: 'domy zgromadzeń na starym mieście albo przymiarki u krawca.' }
```

na:

```js
      rain: 'domy zgromadzeń na starym mieście albo przymiarki u krawca.' },
    { p: 3, o: 3, pace: 'culture', early: true, cost: ['hoian.myson'], t: 'Mỹ Sơn o 6:00', d: 'O 5:00 autem z kierowcą do Mỹ Sơn, ok. godziny drogi. Kasa otwiera się o 6:00, a elektryczny wózek wiezie 2 km w głąb doliny, do ruin świątyń Czamów z IV–XIII wieku wśród dżungli. Obejdź grupy B, C, D, A i G, póki chłodno i pusto: ok. 2–3 godziny. O 9:00 u stóp wieży G jest występ tańca Czamów, a koło 9:30 zaczynają zjeżdżać autokary. Trzymaj się oznaczonych ścieżek, bo na zboczach doliny mogą leżeć niewybuchy. Po południu odpoczynek w Hội An, a jeśli kierowca jedzie drugim brzegiem Thu Bồn, wracasz przez pola ryżowe i wsie.',
      rain: 'w lekkim deszczu Mỹ Sơn jest czynne, ale ścieżki są śliskie, a w niższych grupach jest błoto; przy ulewach woda zalewa dolinę i drogę dojazdową, a zarząd zamyka teren, więc rano sprawdź jego komunikat. Wtedy jedź do Muzeum Rzeźby Czamskiej w Đà Nẵng (7:00–17:00), gdzie stoją rzeźby z Mỹ Sơn.',
      easy: { pace: 'boat', early: false, cost: ['hoian.myson_tour'], t: 'Mỹ Sơn z powrotem łodzią', d: 'Wycieczka grupowa z przewodnikiem: odbiór z hotelu ok. 7:00, w Mỹ Sơn ok. 9:00, z występem tańca Czamów, potem obiad, a ok. 13:30 powrót łodzią po Thu Bồn do Hội An. Wygodniej niż o świcie, ale w dolinie będzie gorąco i tłoczno.' } }
```

W `site2/src/content/hoian.js` zamień:

```js
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach rzeka Thu Bồn potrafi zalać stare miasto i na kilka dni wstrzymać zwiedzanie. Sprawdzaj prognozy i miej plan w zapasie.' }
```

na:

```js
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach rzeka Thu Bồn potrafi zalać stare miasto, a także drogę do Mỹ Sơn i dolinę z ruinami, i na kilka dni wstrzymać zwiedzanie. Sprawdzaj prognozy i komunikaty i miej plan w zapasie.' }
```

W `site2/src/costs.js` zamień:

```js
    'hoian.cooking': { pp: [25, 47], group: [5, 10] },
```

na:

```js
    'hoian.cooking': { pp: [25, 47], group: [5, 10] },
    'hoian.myson': { pp: [5, 5], group: [28, 41] },
    'hoian.myson_tour': { pp: [26, 36], group: [0, 0] },
```

W `site2/src/photos.js` zamień:

```js
  hoian_3: { cap: 'Odnogi rzeki Thu Bồn przy wyspie Cẩm Kim, Hội An', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Arms_of_the_Thu_Bon_River_on_Cam_Kim_Island.jpg' },
  hoian_4: { cap: 'Ulica Trần Phú w starym mieście Hội An', artist: 'Steffen Schmitz (Carschten)', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:H%E1%BB%99i_An,_Ancient_Town,_2020-01_CN-10.jpg' },
  hoian_5: { cap: 'Plaża An Bàng koło Hội An', artist: 'Mig Gilbert from Brighton', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:An_B%C3%A0ng_Beach_(39647682455).jpg' },
```

na:

```js
  hoian_4: { cap: 'Ulica Trần Phú w starym mieście Hội An', artist: 'Steffen Schmitz (Carschten)', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:H%E1%BB%99i_An,_Ancient_Town,_2020-01_CN-10.jpg' },
  hoian_5: { cap: 'Plaża An Bàng koło Hội An', artist: 'Mig Gilbert from Brighton', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:An_B%C3%A0ng_Beach_(39647682455).jpg' },
  hoian_6: { cap: 'Grupy świątyń B, C i D w Mỹ Sơn', artist: 'Gary Todd', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:My_Son_Cham_Ruins,_Groups_B,C,D.jpg' },
```

W `site2/src/places.js` zamień:

```js
  hoian:     { axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
```

na:

```js
  hoian:     { axis: 15.88, nights: [1, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
```

W `site2/src/ui.js` zamień:

```js
  'cost.dalat.caudat': 'auto na wzgórza Cầu Đất', 'cost.hoian.cooking': 'lekcja gotowania w Trà Quế', 'cost.hue.citadel': 'Cesarskie Miasto w Huế',
```

na:

```js
  'cost.dalat.caudat': 'auto na wzgórza Cầu Đất', 'cost.hoian.cooking': 'lekcja gotowania w Trà Quế',
  'cost.hoian.myson': 'Mỹ Sơn: bilet i auto z kierowcą', 'cost.hoian.myson_tour': 'wycieczka grupowa do Mỹ Sơn', 'cost.hue.citadel': 'Cesarskie Miasto w Huế',
```

W `site2/src/ui.js` zamień:

```js
  'b.hoian.cooking': 'Lekcja gotowania w Trà Quế: 1–2 dni wcześniej.',
```

na:

```js
  'b.hoian.cooking': 'Lekcja gotowania w Trà Quế: 1–2 dni wcześniej.',
  'b.hoian.myson': 'Auto z kierowcą do Mỹ Sơn na 5:00: dzień wcześniej, w szczycie (XII–I, Tết, 30.04–1.05, 2.09) 2–3 dni. Bilet kupisz w kasie albo online.',
  'b.hoian.myson_tour': 'Wycieczka grupowa do Mỹ Sơn z powrotem łodzią: 1–2 dni wcześniej, w szczycie 3–7 dni.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-b1.sh" MIESIAC
```

Oczekiwane: `ALL PASS`, build bez błędów, grep nic nie wypisuje, `sondy (…): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/before.js site2/src/content/hoian.js site2/src/costs.js site2/src/photos.js site2/src/places.js site2/src/ui.js tests/data.test.js tests/page.test.js
git commit -F - <<'EOF'
Mỹ Sơn w Hội An: Hội An ma 1–3 noce, a przy trzech nocach dzień 3 to Mỹ Sơn o 6:00 (auto z kierowcą o 5:00, wózek w głąb doliny, występ tańca Czamów o 9:00, oznaczone ścieżki z powodu niewybuchów), na „Spokojnie” wycieczka grupowa z powrotem łodzią po Thu Bồn, plan na deszcz z Muzeum Rzeźby Czamskiej; bilet 5 EUR i auto 28–41 EUR, rezerwacje, wydarzenie powodzi z doliną Mỹ Sơn, zdjęcie grup B, C i D zamiast odnóg rzeki przy Cẩm Kim; test danych czyta research dnia w cudzym module (DAY_NOTES), testy strony planują z dawnymi nocami Hội An

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Szlak Tà Năng–Phan Dũng w Đà Lạt

Z `research/tanang-2026-10.md` i pytania 3:
- **treść:** dzień 2 w Đà Lạt (Bidoup) dostaje trudną wersję na dwa dni: „Szlak Tà Năng–Phan Dũng: przez wzgórza do biwaku” (odbiór przed świtem, marsz z przewodnikiem od 9:00, słup trzech dawnych prowincji, namiot, porterzy, tylko z biurem i przewodnikiem, pytanie o licencję), `late: true`, `off: [5, 6, 7, 8, 9, 10]`, latarka na liście do spakowania, własny plan na deszcz (przewodnik decyduje o przeprawie, biuro przekłada wyjście) i drugi dzień „w dół do lasu Phan Dũng” (dwie przeprawy, brama ok. 15:30, auto biura do Đà Lạt ok. 20:00, pytanie o powrót w cenie). Đà Lạt ma noce [2, 3, 4], więc szlak wchodzi od 3 nocy;
- **koszt:** `dalat.tanang` 172–298 EUR od osoby i za grupę 79 EUR auta z powrotem przy najtańszym biurze (wiersz researchu poprawiony w tym zadaniu, zob. „Doprecyzowania z suchej próby”);
- **rezerwacja:** 14 dni wcześniej (Viet Challenge, Highland Adventure Travel, Da Lat Trip), z pytaniem o licencję, zgodę zarządcy lasu i powrót;
- **przypięty test rezerwacji „przyroda na poziomie 3”** ma szlak zamiast przewodników na Bidoup i Lang Biang;
- **`DAY_NOTES`** dostaje `research/tanang-2026-10.md`.

**Pliki:**
- Zmień: `site2/src/content/dalat.js`, `site2/src/costs.js`, `site2/src/before.js`, `site2/src/ui.js`, `research/tanang-2026-10.md`
- Testy: `tests/page.test.js`, `tests/data.test.js`

**Interfejsy:**
- Bierze: `hard.next` i `hard.rain` (partia A), `DAY_NOTES` (zadanie 3).
- Daje: `COSTS.items['dalat.tanang']`, `BOOK['dalat.tanang']`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/data.test.js` zamień:

```js
// „Zestawienie: wycieczki” and „Zestawienie: rezerwacje” (Mỹ Sơn in Hội An)
var DAY_NOTES = ['research/myson-2026-10.md'];
```

na:

```js
// „Zestawienie: wycieczki” and „Zestawienie: rezerwacje” (Mỹ Sơn in Hội An, the Tà Năng–Phan Dũng trail in Đà Lạt)
var DAY_NOTES = ['research/myson-2026-10.md', 'research/tanang-2026-10.md'];
```

W `tests/page.test.js` zamień:

```js
  [['cattien.bausau_night', 'flights', 'catba.cruise', 'transfer', 'dalat.bidoup', 'dalat.langbiang', 'airport', 'saigon.cangio', 'cattien.park'], [['HAN', 'ninhbinh', 1], ['HAN', 'catba', 1]], null],
  'nature at level 3: the night at Bàu Sấu first (4 weeks), the cruise; the cars from Nội Bài; vans between places, priced with the travel');
```

na:

```js
  [['cattien.bausau_night', 'flights', 'dalat.tanang', 'catba.cruise', 'transfer', 'airport', 'saigon.cangio', 'cattien.park'], [['HAN', 'ninhbinh', 1], ['HAN', 'catba', 1]], null],
  'nature at level 3: the night at Bàu Sấu first (4 weeks), the Tà Năng–Phan Dũng trail and the cruise (2 weeks); the cars from Nội Bài; vans between places, priced with the travel');
```

W `tests/page.test.js` zamień:

```js
  'Hội An: Mỹ Sơn from 6:00 on the third day at three nights, with a rain plan; at level 1 the group tour with the boat back');
```

na:

```js
  'Hội An: Mỹ Sơn from 6:00 on the third day at three nights, with a rain plan; at level 1 the group tour with the boat back');
// Đà Lạt: the Tà Năng–Phan Dũng trail over two days at level 3 (days 2 and 3, the night in a tent), from three nights,
// not in May–October; at level 2 the days as they were; the trail has its own rain plan
function dl(n, level, months) { return stopDays(CONTENT.dalat, { n: n, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([dl(3, 3, [0, 0, 0]), dl(4, 3, [11, 11, 11, 11]), dl(3, 3, [5, 5, 5]), dl(2, 3, [0, 0]), dl(3, 2, [0, 0, 0]),
  stopDays(CONTENT.dalat, { n: 3, start: 1 }, 0, 3, [0, 0, 0])[1].rain === CONTENT.dalat.days[1].hard.rain, CONTENT.dalat.days[1].hard.off],
  [['-', 'hard', 'hard'], ['-', 'hard', 'hard', '-'], ['-', '-', '-'], ['-', '-'], ['-', '-', '-'], true, [5, 6, 7, 8, 9, 10]],
  'Đà Lạt: Tà Năng–Phan Dũng on days 2 and 3 at level 3 in January and December, not in June nor in two nights; its own rain plan');
var tTN = tripAll({ from: 'SGN', to: 'SGN', year: 2027, month: 1, days: 10, interests: ['gory'], level: 3, add: ['dalat'] });
eq([stayOf(tTN, 'dalat').days.slice(1, 3), keysOf(bookList(tTN.r, plansAll(tTN), [], BOOKD)).indexOf('dalat.tanang') > -1], [['hard', 'hard'], true],
  'mountains in January at level 3 with Đà Lạt: the Tà Năng–Phan Dũng trail, on the list of what to book');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: błąd w `tests/page.test.js` przy przypiętym teście rezerwacji:

```text
Exception: Error: nature at level 3: the night at Bàu Sấu first (4 weeks), the Tà Năng–Phan Dũng trail and the cruise (2 weeks); the cars from Nội Bài; vans between places, priced with the travel: got [["cattien.bausau_night","flights","catba.cruise","transfer","dalat.bidoup","dalat.langbiang", …
```

- [ ] **Krok 3: Treść, koszt, rezerwacja i research**

W `research/tanang-2026-10.md` zamień:

```markdown
| `dalat.tanang` | (b) `o` 2 hard, obejmuje też `o` 3 hard.next | 172 | 298 | | | 2 dni/1 noc z biurem z Đà Lạt, przewodnik po angielsku; od: HAT, grupa łączona, 5 000 000 VND (bez powrotu do Đà Lạt: +79–88 EUR za auto, szacunek); do: Viet Challenge przez pośrednika, 334 USD (VIA†), bezpośrednio 6 900 000 VND = 237 EUR z vanem do Đà Lạt (VC) |
```

na:

```markdown
| `dalat.tanang` | (b) `o` 2 hard, obejmuje też `o` 3 hard.next | 172 | 298 | 79 | 0 | 2 dni/1 noc z biurem z Đà Lạt, przewodnik po angielsku, z powrotem do Đà Lạt (decyzja z sesji partii B, 14.10.2026); od: HAT, grupa łączona, 5 000 000 VND, bez powrotu, więc za grupę auto z powrotem do Đà Lạt 79 EUR (szacunek, 79–88); do: Viet Challenge przez pośrednika, 334 USD (VIA†), z vanem do Đà Lạt; bezpośrednio u VC 6 900 000 VND = 237 EUR z vanem (VC) |
```

W `site2/src/before.js` zamień:

```js
   of its own note, for a day added to another place's module the note of the day (Mỹ Sơn: research/myson-2026-10.md;
```

na:

```js
   of its own note, for a day added to another place's module the note of the day (Mỹ Sơn: research/myson-2026-10.md,
   Tà Năng–Phan Dũng: research/tanang-2026-10.md;
```

W `site2/src/before.js` zamień:

```js
  'flights': { ahead: 21, links: [{ name: 'Vietnam Airlines', url: 'https://www.vietnamairlines.com/' }, { name: 'Vietjet', url: 'https://www.vietjetair.com/' }, { name: 'Vietravel Airlines', url: 'https://www.vietravelairlines.com/' }] },
```

na:

```js
  'flights': { ahead: 21, links: [{ name: 'Vietnam Airlines', url: 'https://www.vietnamairlines.com/' }, { name: 'Vietjet', url: 'https://www.vietjetair.com/' }, { name: 'Vietravel Airlines', url: 'https://www.vietravelairlines.com/' }] },
  'dalat.tanang': { ahead: 14, links: [{ name: 'Viet Challenge, Tà Năng–Phan Dũng', url: 'https://vietchallenge.com/tour/the-ta-nang-phan-dung-trail-a-breathtaking-adventure-in-vietnam' }, { name: 'Highland Adventure Travel, Tà Năng–Phan Dũng', url: 'https://highlandadventuretravel.com/tour/trekking-ta-nang-phan-dung-31.html' }, { name: 'Da Lat Trip, Tà Năng 3 dni', url: 'https://www.dalattrip.com/ta-nang-trekking-tour/' }] },
```

W `site2/src/content/dalat.js` zamień:

```js
/* Wyżyna wokół Đà Lạt: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
```

na:

```js
/* Wyżyna wokół Đà Lạt: texts of the place, moved from the December planner (plan 1B); the Tà Năng–Phan Dũng trail as the
   hard version of days 2 and 3 since batch B, facts and sources in research/tanang-2026-10.md. Fields: see site2/src/content.js. */
```

W `site2/src/content/dalat.js` zamień:

```js
    { p: 2, o: 2, pace: 'hike', cost: ['dalat.bidoup'], t: 'Las mglisty Bidoup–Núi Bà', d: 'Wędrówka z przewodnikiem wśród starych sosen, omszałego lasu i dzikich storczyków w stronę Hòn Giao. Do szlaku jest ok. 50 km, więc to cały dzień. W porze suchej, od listopada do kwietnia, ścieżki są pewne pod nogami, a w porze deszczowej bywają śliskie. Przewodnika zarezerwuj w centrum informacji turystycznej parku.', easy: { pace: 'nature', cost: ['dalat.cablecar'], t: 'Las sosnowy i klasztor nad jeziorem', d: 'Kolejka linowa z Robin Hill sunie nad lasem sosnowym do Trúc Lâm, cichego klasztoru zen nad jeziorem Tuyền Lâm. Spacer po klasztornych ogrodach, potem niespieszny rejs łódką po jeziorze albo długi obiad nad brzegiem.' } },
```

na:

```js
    { p: 2, o: 2, pace: 'hike', cost: ['dalat.bidoup'], t: 'Las mglisty Bidoup–Núi Bà', d: 'Wędrówka z przewodnikiem wśród starych sosen, omszałego lasu i dzikich storczyków w stronę Hòn Giao. Do szlaku jest ok. 50 km, więc to cały dzień. W porze suchej, od listopada do kwietnia, ścieżki są pewne pod nogami, a w porze deszczowej bywają śliskie. Przewodnika zarezerwuj w centrum informacji turystycznej parku.', easy: { pace: 'nature', cost: ['dalat.cablecar'], t: 'Las sosnowy i klasztor nad jeziorem', d: 'Kolejka linowa z Robin Hill sunie nad lasem sosnowym do Trúc Lâm, cichego klasztoru zen nad jeziorem Tuyền Lâm. Spacer po klasztornych ogrodach, potem niespieszny rejs łódką po jeziorze albo długi obiad nad brzegiem.' },
      hard: { pace: 'hike', early: true, late: true, off: [5, 6, 7, 8, 9, 10], cost: ['dalat.tanang'], pack: ['torch'], t: 'Szlak Tà Năng–Phan Dũng: przez wzgórza do biwaku', d: 'Pierwszy dzień dwudniowego przejścia szlakiem Tà Năng–Phan Dũng. Biuro odbiera z hotelu przed świtem, śniadanie na targu w Đà Loan i od 9:00 marsz z przewodnikiem przez lasy sosnowe i pola ryżowe na trawiaste wzgórza. Po obiedzie słup, przy którym stykały się trzy dawne prowincje, a przed zmrokiem namiot na wzgórzu, kolacja z grilla i ognisko. To ok. 12–15 km; namioty, jedzenie i wodę niosą porterzy. Na szlak wolno wejść tylko z biurem i przewodnikiem, więc wyjście zarezerwuj wcześniej i zapytaj o licencję biura. Bagaż zostaje w hotelu w Đà Lạt.',
        rain: 'gdy w górach leje, strumienie w lesie Phan Dũng wzbierają w kilka minut: decyzję o przeprawie zostaw przewodnikowi, a przy złej prognozie biuro przełoży wyjście, więc zostań w Đà Lạt.',
        next: { pace: 'hike', t: 'Szlak Tà Năng–Phan Dũng: w dół do lasu Phan Dũng', d: 'Wschód słońca nad wzgórzami, potem w dół przez las sosnowy i suchy las liściasty, z dwiema przeprawami przez strumienie, do bramy lasu Phan Dũng ok. 15:30. Stamtąd auto biura wiezie z powrotem do Đà Lạt, ok. 4,5 godziny, więc w hotelu będziesz ok. 20:00, a w dalszą drogę ruszysz następnego dnia. Przy rezerwacji upewnij się, że powrót do Đà Lạt jest w cenie: wiele biur kończy w Liên Hương nad morzem, skąd do Đà Lạt jeździ jeden minibus dziennie, rano.' } } },
```

W `site2/src/costs.js` zamień:

```js
    'dalat.caudat': { pp: [0, 0], group: [36, 53] },
```

na:

```js
    'dalat.caudat': { pp: [0, 0], group: [36, 53] },
    'dalat.tanang': { pp: [172, 298], group: [79, 0] },
```

W `site2/src/ui.js` zamień:

```js
  'cost.dalat.caudat': 'auto na wzgórza Cầu Đất', 'cost.hoian.cooking': 'lekcja gotowania w Trà Quế',
```

na:

```js
  'cost.dalat.caudat': 'auto na wzgórza Cầu Đất', 'cost.dalat.tanang': 'szlak Tà Năng–Phan Dũng w dwa dni', 'cost.hoian.cooking': 'lekcja gotowania w Trà Quế',
```

W `site2/src/ui.js` zamień:

```js
  'b.dalat.langbiang': 'Przewodnik na Lang Biang: 2–3 dni wcześniej, gdy park potwierdzi, że szlak jest otwarty.',
```

na:

```js
  'b.dalat.langbiang': 'Przewodnik na Lang Biang: 2–3 dni wcześniej, gdy park potwierdzi, że szlak jest otwarty.',
  'b.dalat.tanang': 'Szlak Tà Năng–Phan Dũng z biurem z Đà Lạt: 1–2 tygodnie wcześniej, w szczycie (weekendy I–IV, Tết, 30.04–1.05, 2.09) 3–4 tygodnie. Zapytaj o licencję biura i zgodę zarządcy lasu i upewnij się, że powrót do Đà Lạt jest w cenie.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-b1.sh" MIESIAC
```

Oczekiwane: `ALL PASS`, build bez błędów, grep nic nie wypisuje, `sondy (…): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add research/tanang-2026-10.md site2/src/before.js site2/src/content/dalat.js site2/src/costs.js site2/src/ui.js tests/data.test.js tests/page.test.js
git commit -F - <<'EOF'
Szlak Tà Năng–Phan Dũng w Đà Lạt: na „Ekstremalnie” dni 2 i 3 to dwudniowe przejście z biurem i przewodnikiem (namiot na wzgórzu, porterzy, dwie przeprawy przez strumienie, powrót autem biura do Đà Lạt ok. 20:00), od 3 nocy, wyłączone w V–X, z własnym planem na deszcz i latarką na liście do spakowania; koszt 172–298 EUR od osoby z powrotem do Đà Lạt (w researchu za grupę auto z powrotem przy najtańszym biurze), rezerwacja 1–2 tygodnie wcześniej z pytaniem o licencję i zgodę zarządcy lasu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Yok Đôn z lotniskiem Buôn Ma Thuột

Z `research/yokdon-2026-10.md` i pytania 5:
- **dane:** `yokdon` na osi 12,87 (za Đà Lạt), noce [1, 2, 2], poziom 1, fit: kultura 1, jedzenie 1, przyroda 3, góry 0, morze 0; sezon `DDDDSSSSSSDD` i klimat ze stacji Buôn Ma Thuột (pora deszczowa V–X); drogi: lotnisko 1,25 h (taksówka, powrót przez park: `r.air_thd`), Đà Lạt 6 h, Cát Tiên 6 h; loty: Hồ Chí Minh City 1 h, Hà Nội 1,8 h, Đà Nẵng 1,1 h;
- **lotnisko:** `BMV` w `AIRPORTS`; lot z Đà Nẵng tylko we wtorki, czwartki i soboty: `FLIGHT_DAYS` w `content.js`, czysta funkcja `flightNotes` w `page.js`, uwaga w karcie przejazdu (`n.flight_days`, `f.days_tts`);
- **treść:** przyjazd z łodzią po Sêrêpốk (plan na deszcz: muzea w Buôn Ma Thuột; plan na jedną noc: łódź wieczorem, słonie rano); dzień 2 pieszo za słoniami z przewodnikiem parku i las po południu; na „Spokojnie” słonie rano i lekcja gotowania u rodziny Ê Đê; na „Ekstremalnie” noc w lesie przy Thác Phật z przewodnikiem parku (`late: true`, wyłączona w V–X, latarka); perełka, „do pominięcia” (jazda na słoniu w Lắk), dwa ostrzeżenia (upał III–IV, pora deszczowa);
- **ceny i rezerwacje:** noc 10–14 EUR; słonie 22–45 EUR na osobę i 7 za grupę, las 15–21, łódź 14 (rezerwowana z noclegiem), gotowanie 10 na osobę i 3 za grupę, noc w lesie 48 za grupę; rezerwacje noclegu, słoni i nocy w lesie po 7 dni (strona parku);
- **research:** godziny słońca pełnymi godzinami;
- **mapa:** kolor 18; punkt w kadrze południa;
- **zdjęcia:** `yokdon_0`–`4`;
- **test treści:** `namiocie` na `NOT_PLURAL`, `FLIGHT_DAYS` w kontroli kluczy interfejsu.

**Pliki:**
- Utwórz: `site2/src/content/yokdon.js`
- Zmień: `site2/src/places.js`, `seasons.js`, `climate.js`, `travel.js`, `content.js`, `page.js`, `app.js`, `costs.js`, `before.js`, `photos.js`, `ui.js`, `research/yokdon-2026-10.md`
- Testy: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje: `FLIGHT_DAYS` (`content.js`), `flightNotes(leg, flightDays)` → `[{ key: 'n.flight_days', a, b, days }]` (`page.js`); `AIRPORTS.BMV`, `AIR_KEYS['BMV-yokdon']`; `COSTS.items` `yokdon.boat`, `yokdon.elephants`, `yokdon.trek`, `yokdon.cooking`, `yokdon.camp`; `BOOK` `yokdon.stay`, `yokdon.elephants`, `yokdon.camp`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
  'porcie', 'świecie', 'remoncie'];
```

na:

```js
  'porcie', 'świecie', 'remoncie', 'namiocie'];
```

W `tests/content.test.js` zamień:

```js
  Object.keys(AIR_KEYS).forEach(function (k) { wants(AIR_KEYS[k].text, 'AIR_KEYS'); });
```

na:

```js
  Object.keys(AIR_KEYS).forEach(function (k) { wants(AIR_KEYS[k].text, 'AIR_KEYS'); });
  Object.keys(FLIGHT_DAYS).forEach(function (k) { wants(FLIGHT_DAYS[k], 'FLIGHT_DAYS'); });
```

W `tests/page.test.js` zamień:

```js
  'mountains in January at level 3 with Đà Lạt: the Tà Năng–Phan Dũng trail, on the list of what to book');
```

na:

```js
  'mountains in January at level 3 with Đà Lạt: the Tà Năng–Phan Dũng trail, on the list of what to book');
// Yok Đôn: on foot after the elephants on day 2, at level 1 half a day with them and a cooking lesson; at level 3 a night in
// the forest with the park's guide, not in May–October and not on the last day before the way home; one night: the solo plan
function yd(n, level, months, next) { return stopDays(CONTENT.yokdon, { n: n, start: 1 }, 0, level, months, next).map(function (d) { return d.variant || '-'; }); }
eq([yd(2, 2, [0, 0]), yd(2, 1, [0, 0]), yd(2, 3, [0, 0]), yd(2, 3, [6, 6]), yd(2, 3, [0, 0], { home: true, h: 3 }), stopDays(CONTENT.yokdon, { n: 1, start: 1 }, 0, 2, [0])[0].t],
  [['-', '-'], ['-', 'easy'], ['-', 'hard'], ['-', '-'], ['-', '-'], CONTENT.yokdon.days[0].solo.t],
  'Yok Đôn: the elephants on day 2, at level 1 with a cooking lesson; the night in the forest at level 3 in January, not in July nor before the way home; one night solo');
var tYD = tripAll({ from: 'SGN', to: 'SGN', year: 2027, month: 1, days: 10, interests: ['przyroda'], level: 2, add: ['yokdon'] }), iYD = tYD.r.stops.map(function (x) { return x.id; }).indexOf('yokdon');
eq([iYD > -1, tYD.r.stops[iYD].leg.segs.some(function (g) { return g.to === 'BMV' || g.from === 'BMV'; }) || tYD.r.stops[iYD + 1 < tYD.r.stops.length ? iYD + 1 : iYD].leg.segs.some(function (g) { return g.from === 'BMV'; }),
  keysOf(bookList(tYD.r, plansAll(tYD), [], BOOKD)).filter(function (k) { return /^yokdon/.test(k); }).sort()],
  [true, true, ['yokdon.elephants', 'yokdon.stay']],
  'nature in January with Yok Đôn: by Buôn Ma Thuột airport, the elephants and the park\'s guest house on the list of what to book');
// a flight that runs only on some days of the week: the journey's card says on which (FLIGHT_DAYS)
eq([flightNotes({ segs: [{ mode: 'road', from: 'hoian', to: 'DAD', h: 0.75 }, { mode: 'fly', from: 'DAD', to: 'BMV', h: 1.1 }, { mode: 'road', from: 'BMV', to: 'yokdon', h: 1.25 }] }, FLIGHT_DAYS),
  flightNotes({ segs: [{ mode: 'fly', from: 'SGN', to: 'BMV', h: 1 }] }, FLIGHT_DAYS)],
  [[{ key: 'n.flight_days', a: 'DAD', b: 'BMV', days: 'f.days_tts' }], []], 'the flight Đà Nẵng – Buôn Ma Thuột runs three days a week, the flight from Hồ Chí Minh City every day');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: błąd w `tests/page.test.js`:

```text
Exception: TypeError: undefined is not an object (evaluating 'c.days')
```

(`CONTENT.yokdon` jeszcze nie istnieje.)

- [ ] **Krok 3: Dane, lotnisko, uwaga o dniach lotu, treść, ceny, rezerwacje i zdjęcia**

W `research/yokdon-2026-10.md` zamień:

```markdown
- Liczby K-BMT odczytałem 14.10.2026 z tabeli w Wikipedii „Buôn Ma Thuột (city)”, źródło IBST. Słońce, h (I–XII): 249,7; 249,4; 265,1; 253,4; 226,2; 185,4; 180,5; 162,6; 153,5; 168,5; 170,9; 188,6. Kod jest taki sam jak dla `dalat`.
```

na:

```markdown
- Liczby K-BMT odczytałem 14.10.2026 z tabeli w Wikipedii „Buôn Ma Thuột (city)”, źródło IBST. Słońce, h (I–XII): 250, 249, 265, 253, 226, 185, 181, 163, 154, 169, 171, 189 (zaokrąglone do pełnych godzin; z tabeli: 249,7; 249,4; 265,1; 253,4; 226,2; 185,4; 180,5; 162,6; 153,5; 168,5; 170,9; 188,6). Kod jest taki sam jak dla `dalat`.
```

W `site2/src/app.js` zamień:

```js
      .concat(ferryNotes({ segs: cardSegs(L.segs, AIRPORTS) }, FERRY, AIRPORTS).map(function (n) { return T(n.key, { x: C(n.place).short, last: n.last, land: n.land, first: n.first, at: n.at }); }));
```

na:

```js
      .concat(ferryNotes({ segs: cardSegs(L.segs, AIRPORTS) }, FERRY, AIRPORTS).map(function (n) { return T(n.key, { x: C(n.place).short, last: n.last, land: n.land, first: n.first, at: n.at }); }))
      .concat(flightNotes(L, FLIGHT_DAYS).map(function (n) { return T(n.key, { a: AIRPORTS[n.a].name, b: AIRPORTS[n.b].name, days: T(n.days) }); }));
```

W `site2/src/before.js` zamień:

```js
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
```

na:

```js
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
  'yokdon.stay': { ahead: 7, links: [{ name: 'Park Yok Đôn, nocleg', url: 'https://tour.yokdonnationalpark.vn/EN/Tours/Detail/23' }, { name: 'Park Yok Đôn, kontakt', url: 'https://tour.yokdonnationalpark.vn/EN/lien-he.html' }] },
  'yokdon.elephants': { ahead: 7, links: [{ name: 'Park Yok Đôn, program słoni', url: 'https://tour.yokdonnationalpark.vn/EN/Tours/Detail/2' }] },
  'yokdon.camp': { ahead: 7, links: [{ name: 'Park Yok Đôn, biwak', url: 'https://tour.yokdonnationalpark.vn/EN/Tours/Detail/14' }] },
```

W `site2/src/climate.js` zamień:

```js
    why: { 1: ['chlod'], 2: ['chlod'], 4: ['deszcz'], 5: ['ulewy'], 6: ['ulewy'], 7: ['ulewy'], 8: ['ulewy'], 9: ['ulewy'], 10: ['deszcz', 'chlod'], 11: ['chlod'], 12: ['chlod'] }
```

na:

```js
    why: { 1: ['chlod'], 2: ['chlod'], 4: ['deszcz'], 5: ['ulewy'], 6: ['ulewy'], 7: ['ulewy'], 8: ['ulewy'], 9: ['ulewy'], 10: ['deszcz', 'chlod'], 11: ['chlod'], 12: ['chlod'] }
  },
  yokdon: {
    t: [[17.5, 27.1], [18.2, 29.6], [19.6, 32], [21.4, 33.3], [22, 31.8], [21.7, 29.9], [21.3, 29.2], [21.4, 29], [21.1, 28.9], [20.5, 28.4], [19.6, 27.2], [18.3, 26.2]],
    rain: [[5.2, 1.6], [3.8, 0.8], [24.1, 3.4], [84.3, 7.8], [233.6, 18.5], [245.1, 21.2], [253.7, 23.4], [309.8, 24.2], [311.4, 23.2], [198.8, 15.7], [100.3, 10.6], [26.4, 5.8]],
    why: { 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 10: ['deszcz'] }
```

W `site2/src/content.js` zamień:

```js
  VDH: { name: 'Đồng Hới', maps: 'Dong Hoi Airport', pt: [17.52, 106.59] }
};
```

na:

```js
  VDH: { name: 'Đồng Hới', maps: 'Dong Hoi Airport', pt: [17.52, 106.59] },
  BMV: { name: 'Buôn Ma Thuột', maps: 'Buon Ma Thuot Airport', pt: [12.67, 108.12] }
};

/* Flights that do not run every day (the research of the place, „Zestawienie: loty”): by the two airports in alphabetical
   order, the UI key of the days they run; the journey's card says so (flightNotes in page.js). */
var FLIGHT_DAYS = { 'BMV-DAD': 'f.days_tts' };
```

W `site2/src/content.js` zamień:

```js
  'HAN-cucphuong': { text: 'r.air_car', book: true }, 'THD-cucphuong': { text: 'r.air_thd', book: true }
```

na:

```js
  'HAN-cucphuong': { text: 'r.air_car', book: true }, 'THD-cucphuong': { text: 'r.air_thd', book: true },
  // Yok Đôn: a taxi from Buôn Ma Thuột airport, but no taxi waits at the park, so the way back is booked through the park
  'BMV-yokdon': { text: 'r.air_thd', book: true }
```

Utwórz `site2/src/content/yokdon.js`:

```js
/* Yok Đôn: texts of the place (stage 3, batch B). Facts and sources: research/yokdon-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.yokdon = {
  name: 'Park Narodowy Yok Đôn', short: 'Yok Đôn',
  sub: 'Słonie bez jazdy, suchy las i rzeka Sêrêpốk',
  region: 'south', maps: 'Yok Don National Park Headquarters, Buon Don, Dak Lak', pt: [12.87, 107.81], color: 18,
  photos: ['yokdon_0', 'yokdon_1', 'yokdon_2', 'yokdon_3', 'yokdon_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['yokdon.boat'], t: 'Do lasu nad Sêrêpốk', d: 'Zamelduj się w domu gościnnym parku, przy siedzibie, gdzie zaczynają się wszystkie wycieczki. Po południu łódź po rzece Sêrêpốk, 40–60 minut. Jeśli jedziesz przez Buôn Ma Thuột, zatrzymaj się w Muzeum Kawy, zbudowanym na wzór długiego domu ludu Ê Đê.',
      rain: 'w burzy łódź nie wypłynie: zostań dłużej w Buôn Ma Thuột, w Muzeum Kawy i w muzeum Đắk Lắk o ludach Wyżyny Centralnej, a do parku dojedź na wieczór.',
      solo: { pace: 'nature', cost: ['yokdon.boat', 'yokdon.elephants'], t: 'Yok Đôn wieczorem i rano', d: 'Dotrzyj do parku po południu i zamelduj się w domu gościnnym. O zachodzie łódź po Sêrêpốk. Rano o 8:00 ruszasz z przewodnikiem parku pieszo za słoniami, które same szukają jedzenia w lesie; koło 11:00 wracasz i dalej w drogę.' } },
    { p: 2, o: 2, pace: 'hike', cost: ['yokdon.elephants', 'yokdon.trek'], t: 'Pieszo za słoniami', d: 'O 8:00 z przewodnikiem parku w las, pieszo tam, gdzie słonie były ostatnio widziane. Słonie przez lata woziły turystów, a od 2018 roku chodzą wolno po lesie i same szukają jedzenia; patrzysz z odległości, bez jazdy, kąpieli i karmienia. Po obiedzie znów z przewodnikiem, tym razem przez suchy las, z kąpielą w strumieniu. Sam do lasu nie wejdziesz: słonie chodzą po nim swobodnie, więc park wpuszcza tylko z przewodnikiem.',
      rain: 'rano słonie jak zwykle, w pelerynie, a po południu, gdy przyjdzie burza, zamiast lasu lekcja gotowania w kuchni rodziny Ê Đê, 700 metrów od parku.',
      easy: { pace: 'nature', cost: ['yokdon.elephants', 'yokdon.cooking'], t: 'Słonie rano, kuchnia Ê Đê po południu', d: 'Rano pół dnia za słoniami, 8:00–11:00, z przewodnikiem parku i transportem z biura do lasu. Po południu lekcja gotowania u rodziny Ê Đê w Buôn Jang Lành, 700 metrów od parku: razem z gospodarzami gotujesz i jesz obiad.' },
      hard: { pace: 'hike', late: true, off: [5, 6, 7, 8, 9, 10], cost: ['yokdon.camp'], pack: ['torch'], t: 'Noc w lesie Yok Đôn', d: 'Noc w lesie z przewodnikiem parku: od rana pieszo przez suchy las, przez zarośla i trawiaste polany, do obozu, zwykle przy wodospadzie Thác Phật, 8 kilometrów od siedziby. Nocleg w hamaku albo w namiocie parku, a rano marsz z powrotem; w dalszą podróż ruszysz koło południa. Park daje hamak, namiot i przewodnika, jedzenie zamów osobno. Słonie chodzą po tym lesie wolno, więc idziesz tylko z przewodnikiem i trzymasz się jego wskazówek. Słonie z programu zobaczysz w dniu przyjazdu, jeśli zdążysz na turę 13:30–16:30.' } }
  ],
  gem: 'Jedyny w Wietnamie park suchego lasu, w którym słonie po latach wożenia turystów chodzą wolno po lesie, a ty idziesz za nimi pieszo.',
  skip: 'Jazda na słoniu w Lắk albo zdjęcia ze słoniem za ogrodzeniem w Buôn Đôn.',
  instead: 'pół dnia pieszo z przewodnikiem parku Yok Đôn za słoniami, które od 2018 roku nikogo nie wożą.',
  events: [
    { from: [3, 1], to: [4, 30], warn: true, t: 'Szczyt pory suchej: las zrzuca liście i jest najbardziej przejrzysty, ale dni są gorące, a park leży niżej niż Buôn Ma Thuột. Wychodź o świcie, weź wodę, kapelusz i krem z filtrem.' },
    { from: [5, 1], to: [10, 31], warn: true, t: 'Pora deszczowa: po południu przychodzą burze, więc las i słonie lepiej rano. Weź lekką pelerynę i środek na komary.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52], sapa: [24, 60] },
```

na:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52], sapa: [24, 60], yokdon: [10, 14] },
```

W `site2/src/costs.js` zamień:

```js
    'sapa.descent': { pp: [0, 29], group: [0, 0] }
```

na:

```js
    'sapa.descent': { pp: [0, 29], group: [0, 0] },
    'yokdon.boat': { pp: [0, 0], group: [14, 14], book: 'yokdon.stay' },
    'yokdon.elephants': { pp: [22, 45], group: [7, 7] },
    'yokdon.trek': { pp: [0, 0], group: [15, 21] },
    'yokdon.cooking': { pp: [10, 10], group: [3, 3] },
    'yokdon.camp': { pp: [0, 0], group: [48, 48] }
```

W `site2/src/page.js` zamień:

```js
}

var LONG_LEG_H = 7;   // a travel day this long or longer gets the "long day" flag and a note
```

na:

```js
}

/* The flights of a journey that run only on some days of the week (FLIGHT_DAYS in content.js), as notes for its card:
   [{ key: 'n.flight_days', a, b, days }], a and b the airports in the order flown, days the UI key of the days.
   leg: a leg of planRoute (its segs); flightDays: FLIGHT_DAYS. */
function flightNotes(leg, flightDays) {
  return leg.segs.filter(function (g) { return g.mode === 'fly' && flightDays[[g.from, g.to].sort().join('-')]; })
    .map(function (g) { return { key: 'n.flight_days', a: g.from, b: g.to, days: flightDays[[g.from, g.to].sort().join('-')] }; });
}

var LONG_LEG_H = 7;   // a travel day this long or longer gets the "long day" flag and a note
```

W `site2/src/photos.js` zamień:

```js
  sapa_3: { cap: 'Pasmo Hoàng Liên Sơn ze stacji strażników Núi Xẻ', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Ho%C3%A0ng_Li%C3%AAn_S%C6%A1n_mountains_01.jpg' },
```

na:

```js
  sapa_3: { cap: 'Pasmo Hoàng Liên Sơn ze stacji strażników Núi Xẻ', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Ho%C3%A0ng_Li%C3%AAn_S%C6%A1n_mountains_01.jpg' },
  yokdon_0: { cap: 'Park Yok Đôn w porze suchej', artist: 'Đỗ Tuấn Hưng', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Yokdon8.JPG' },
  yokdon_1: { cap: 'Rzeka Sêrêpốk', artist: 'Đông Hồ', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:M%E1%BB%99t_%C4%91o%E1%BA%A1n_Serepok_(12393625664).jpg' },
  yokdon_2: { cap: 'Suchy las dwuskrzydlcowy w okolicy Buôn Ma Thuột', artist: 'Lam Nguyen', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:R%E1%BB%ABng_kh%E1%BB%99p_Bu%C3%B4n_M%C3%AA_Thu%E1%BA%ADt.jpg' },
  yokdon_3: { cap: 'Dom na palach starszego wsi w Buôn Ako Dhong, Buôn Ma Thuột', artist: 'Key2015', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Buon_ako_nha_san.JPG' },
  yokdon_4: { cap: 'Muzeum Đắk Lắk w Buôn Ma Thuột', artist: 'Daaé', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Bao_tang_Dak_Lak_1.JPG' },
```

W `site2/src/places.js` zamień:

```js
  sapa:      { axis: 22.9, nights: [2, 3, 4], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } }
```

na:

```js
  sapa:      { axis: 22.9, nights: [2, 3, 4], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
  yokdon:    { axis: 12.87, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 3, gory: 0, morze: 0 } }
```

W `site2/src/seasons.js` zamień:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS', hagiang: 'SSSDSZSSSDDS', sapa: 'SSDSZZZZZSSS'
```

na:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS', hagiang: 'SSSDSZSSSDDS', sapa: 'SSDSZZZZZSSS',
  yokdon: 'DDDDSSSSSSDD'
```

W `site2/src/travel.js` zamień:

```js
  ['catba', 'cucphuong', 5.5], ['babe', 'cucphuong', 7.75],
```

na:

```js
  ['catba', 'cucphuong', 5.5], ['babe', 'cucphuong', 7.75],
  // Yok Đôn with Buôn Ma Thuột airport (BMV); by road only from Đà Lạt and Cát Tiên, from the rest of the country by plane
  ['BMV', 'yokdon', 1.25], ['dalat', 'yokdon', 6], ['cattien', 'yokdon', 6],
```

W `site2/src/travel.js` zamień:

```js
  ['HAN', 'VDH', 1.1], ['SGN', 'VDH', 1.6],
```

na:

```js
  ['HAN', 'VDH', 1.1], ['SGN', 'VDH', 1.6],
  // Buôn Ma Thuột (Yok Đôn); from Đà Nẵng three days a week (FLIGHT_DAYS in content.js)
  ['SGN', 'BMV', 1], ['HAN', 'BMV', 1.8], ['DAD', 'BMV', 1.1],
```

W `site2/src/ui.js` zamień:

```js
  'n.ferry_out': 'Pierwsza przeprawa z {x} jest ok. {first}, więc na lotnisku będziesz najwcześniej ok. {at}.',
```

na:

```js
  'n.ferry_out': 'Pierwsza przeprawa z {x} jest ok. {first}, więc na lotnisku będziesz najwcześniej ok. {at}.',
  'n.flight_days': 'Lot {a} – {b} jest tylko {days}: zaplanuj pod niego ten dzień.', 'f.days_tts': 'we wtorki, czwartki i soboty',
```

W `site2/src/ui.js` zamień:

```js
  'cost.sapa.trek': 'przewodnik w dolinie Mường Hoa', 'cost.sapa.cablecar': 'kolejka na Fansipan', 'cost.sapa.car': 'auto z kierowcą w okolicy Sa Pa',
```

na:

```js
  'cost.sapa.trek': 'przewodnik w dolinie Mường Hoa', 'cost.sapa.cablecar': 'kolejka na Fansipan', 'cost.sapa.car': 'auto z kierowcą w okolicy Sa Pa',
  'cost.yokdon.boat': 'łódź po Sêrêpốk', 'cost.yokdon.elephants': 'słonie w Yok Đôn', 'cost.yokdon.trek': 'las Yok Đôn z przewodnikiem',
  'cost.yokdon.cooking': 'lekcja gotowania u rodziny Ê Đê', 'cost.yokdon.camp': 'noc w lesie Yok Đôn',
```

W `site2/src/ui.js` zamień:

```js
  'b.sapa.fansipan': 'Fansipan pieszo w dwa dni, z firmą, która załatwi zgodę parku: 3–7 dni wcześniej, w szczycie 1–2 tygodnie. Zapytaj o numer licencji firmy i o to, czy przewodnik ma kartę wejścia wydaną przez park.',
```

na:

```js
  'b.sapa.fansipan': 'Fansipan pieszo w dwa dni, z firmą, która załatwi zgodę parku: 3–7 dni wcześniej, w szczycie 1–2 tygodnie. Zapytaj o numer licencji firmy i o to, czy przewodnik ma kartę wejścia wydaną przez park.',
  'b.yokdon.stay': 'Nocleg w domu gościnnym parku Yok Đôn (13 pokoi) i łódź: e-mailem albo przez WhatsApp w parku, 3–7 dni wcześniej, na weekend 1–2 tygodnie, w święta 3–4 tygodnie.',
  'b.yokdon.elephants': 'Słonie w Yok Đôn, do 10 osób w grupie: w parku 3–7 dni wcześniej, w święta 2–3 tygodnie, bo miejsc jest tyle, ile słoni w programie.',
  'b.yokdon.camp': 'Noc w lesie Yok Đôn z przewodnikiem parku: 3–7 dni wcześniej, w szczycie 2 tygodnie.',
```

- [ ] **Krok 4: Testy, build, sondy i uwaga o dniach lotu na stronie**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-b1.sh" MIESIAC
cat > "$TMPDIR/wietnam-b1/lot.js" <<'PROBEEOF'
// the note under a journey with the flight Đà Nẵng – Buôn Ma Thuột (FLIGHT_DAYS): the days it runs
setTimeout(function () {
  check('the card of the flight from Đà Nẵng says the days it runs', /Lot\sĐà\sNẵng\s–\sBuôn\sMa\sThuột\sjest\stylko\swe\swtorki,\sczwartki\si\ssoboty/.test(document.body.innerText));
  done();
}, 1500);
PROBEEOF
bash tests/probe.sh "$TMPDIR/wietnam-b1/lot.js" 1400 'od=DAD&do=SGN&miesiac=MIESIAC&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon'
```

Oczekiwane: `ALL PASS`, build bez błędów, grep nic nie wypisuje, `sondy (…): 0 z 19 nie przeszło`, a ostatnia sonda `done, all checks ok`.

- [ ] **Krok 5: Commit**

```bash
git add research/yokdon-2026-10.md site2/src/app.js site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/yokdon.js site2/src/costs.js site2/src/page.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/ui.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Yok Đôn: park suchego lasu na 1–2 noce w domu gościnnym parku, oś 12,87 (za Đà Lạt), sezon z progów stacji Buôn Ma Thuột, przyroda 3; pieszo za słoniami bez jazdy z przewodnikiem parku, na „Spokojnie” pół dnia ze słoniami i lekcja gotowania u rodziny Ê Đê, na „Ekstremalnie” noc w lesie przy Thác Phật z przewodnikiem parku, wyłączona w V–X; lotnisko Buôn Ma Thuột z lotami z Hồ Chí Minh City, Hà Nội i Đà Nẵng, a karta przejazdu mówi, że lot z Đà Nẵng jest tylko we wtorki, czwartki i soboty (FLIGHT_DAYS, flightNotes); drogi z Đà Lạt i Cát Tiên, ceny, rezerwacje, ostrzeżenia o upale i porze deszczowej, kolor 18 i pięć zdjęć

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Mù Cang Chải

Z `research/mucangchai-2026-10.md` i pytania 4:
- **dane:** `mucangchai` na osi 22,95 (za Sa Pa, choć leży na 21,85° N: zejście z pętli północy do Hà Nội szosą 32), noce [2, 2, 3], poziom 1, fit: kultura 1, jedzenie 0, przyroda 2, góry 2, morze 0, nocleg u gospodarzy (`HOMESTAYS`, z uwagą o porze złotych tarasów w `HOMESTAY_NOTES`); sezon `SSSDSZZZDDSS` z powodem `tarasy` w XI–III; drogi: Hà Nội 6 h, lotnisko 5,75 h (`r.air_car`), Sa Pa 4,5 h, Hà Giang 7 h (szacunek); bez Pù Luông;
- **treść:** przyjazd z Móng Ngựa o zachodzie słońca; dzień 2 wędrówka z przewodnikiem z Chế Cu Nha do La Pán Tẩn i Mâm Xôi, na „Spokojnie” punkty widokowe autem; dzień 3 (przy trzech nocach) przełęcz Khau Phạ z lotem paralotnią jako opcją i doliną Lìm Mông; bez trudnego dnia; cztery wydarzenia (pora wody, ulewy i osuwiska z pijawkami, złote tarasy z festiwalem, zimna pora);
- **ceny i rezerwacje:** noc 14–51 EUR; przewodnik 17–31 EUR na osobę i 5–18 za grupę; auto 36–53 za grupę; paralotnia 0–75 EUR na osobę (opcja); rezerwacje: paralotnia 5 dni (Mebayluon), przewodnik 3 dni (Local Vietnam), auto dzień wcześniej;
- **research:** godziny słońca pełnymi godzinami, paralotnia od 0, Lùng Cúng poza tabelą rezerwacji, linki bez spacji przed średnikiem;
- **mapa:** kolor 20; punkt w kadrze północy, bez punktu Khau Phạ;
- **zdjęcia:** `mucangchai_0`–`4`;
- **test treści:** `punkcie` na `NOT_PLURAL`.

**Pliki:**
- Utwórz: `site2/src/content/mucangchai.js`
- Zmień: `site2/src/places.js`, `seasons.js`, `climate.js`, `travel.js`, `content.js`, `costs.js`, `before.js`, `photos.js`, `ui.js`, `research/mucangchai-2026-10.md`
- Testy: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje: kod powodu `tarasy` w `WEATHER_WHY` (klucz `wx.tarasy`); `AIR_KEYS['HAN-mucangchai']`; `COSTS.items` `mucangchai.trek`, `mucangchai.car`, `mucangchai.paragliding`; `BOOK` pod tymi samymi kluczami; `b.homestay.mucangchai`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
  'porcie', 'świecie', 'remoncie', 'namiocie'];
```

na:

```js
  'porcie', 'świecie', 'remoncie', 'namiocie', 'punkcie'];
```

W `tests/page.test.js` zamień:

```js
  [[{ key: 'n.flight_days', a: 'DAD', b: 'BMV', days: 'f.days_tts' }], []], 'the flight Đà Nẵng – Buôn Ma Thuột runs three days a week, the flight from Hồ Chí Minh City every day');
```

na:

```js
  [[{ key: 'n.flight_days', a: 'DAD', b: 'BMV', days: 'f.days_tts' }], []], 'the flight Đà Nẵng – Buôn Ma Thuột runs three days a week, the flight from Hồ Chí Minh City every day');
// Mù Cang Chải: on the axis past Sa Pa (the way down from Sa Pa to Hà Nội); its fair months XI–III are the terraces after
// the harvest (wx.tarasy), not the weather; at level 1 the viewpoints by car; a third night adds Khau Phạ; no hard day
function mcc(n, level) { return stopDays(CONTENT.mucangchai, { n: n, start: 1 }, 0, level, [9, 9, 9]).map(function (d) { return (d.variant || '-') + ' ' + d.t; }); }
eq([PLACES.mucangchai.axis > PLACES.sapa.axis, CLIMATE.mucangchai.why[1], CLIMATE.mucangchai.why[4], mcc(2, 2).length, mcc(3, 3)[2], mcc(2, 1)[1].split(' ')[0],
  CONTENT.mucangchai.days.some(function (d) { return d.hard; }), HOMESTAYS.indexOf('mucangchai') > -1],
  [true, ['tarasy'], undefined, 2, '- Nad doliną Lìm Mông', 'easy', false, true],
  'Mù Cang Chải: past Sa Pa on the axis, its fair winter months for the terraces after the harvest, the viewpoints by car at level 1, Khau Phạ at three nights');
var tMC = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['gory'], level: 2, add: ['mucangchai'] }), oMC = tMC.r.stops.map(function (x) { return x.id; });
eq([oMC.indexOf('mucangchai') > -1, oMC.indexOf('sapa') < 0 || oMC.indexOf('sapa') === oMC.indexOf('mucangchai') - 1, keysOf(bookList(tMC.r, plansAll(tMC), [], BOOKD)).indexOf('homestay') > -1],
  [true, true, true], 'mountains in October with Mù Cang Chải: after Sa Pa when both are on the trip, the hosts on the list of what to book');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: błąd w `tests/page.test.js`:

```text
Exception: TypeError: undefined is not an object (evaluating 'PLACES.mucangchai.axis')
```

- [ ] **Krok 3: Dane, powód „tarasy”, treść, ceny, rezerwacje i zdjęcia**

W `research/mucangchai-2026-10.md` zamień:

```markdown
  - Słońce, h (I–XII): 157,2; 160,5; 188,8; 193,5; 173,1; 105,8; 114,6; 135,5; 146,0; 145,4; 155,8; 163,4.
```

na:

```markdown
  - Słońce, h (I–XII): 157, 161, 189, 194, 173, 106, 115, 136, 146, 145, 156, 163 (zaokrąglone do pełnych godzin; z tabeli: 157,2; 160,5; 188,8; 193,5; 173,1; 105,8; 114,6; 135,5; 146,0; 145,4; 155,8; 163,4).
```

W `research/mucangchai-2026-10.md` zamień:

```markdown
| `mucangchai.paragliding` | p 3 | 75 | 75 | | | 2 190 000 VND/os. z ubezpieczeniem, odwozem i zdjęciami (MBL, BLC-2026-03-16); opcja |
```

na:

```markdown
| `mucangchai.paragliding` | p 3 | 0 | 75 | | | od: bez lotu, bo lot to opcja dnia (decyzja z sesji partii B, 14.10.2026); do: 2 190 000 VND/os. z ubezpieczeniem, odwozem i zdjęciami (MBL, BLC-2026-03-16) |
```

W `research/mucangchai-2026-10.md` zamień:

```markdown
| mucangchai.paragliding | lot tandemem paralotnią z Khau Phạ | 3–5 dni | 1–2 tygodnie: koniec VIII – IX, 2.09, festiwale | 5 | Mebayluon, rezerwacja: https://www.mebayluon.com/booking ; Mebayluon, loty w Mù Cang Chải: https://www.mebayluon.com/blog/du-luon-mu-cang-chai |
| mucangchai.trek | przewodnik na wędrówkę Chế Cu Nha – La Pán Tẩn | 2–3 dni (szacunek) | ok. tydzień: złoty sezon, 2.09 (szacunek) | 3 | Local Vietnam, Mù Cang Chải z wędrówką: https://localvietnam.com/tour/mu-cang-chai-tour/ |
| mucangchai.lungcung | Lùng Cúng w 2 dni z biurem, nocleg w chacie | 1–2 tygodnie (szacunek) | 2–3 tygodnie: złoty sezon, XII (szacunek) | 14 | MAM Travel, Lùng Cúng: https://mamtravel.vn/en/tour/trekking-lung-cung/ |
| mucangchai.car | auto z kierowcą na dzień | dzień wcześniej (szacunek) | 2–3 dni: złoty sezon (szacunek) | 1 | — (przez gospodarzy) |

```

na:

```markdown
| mucangchai.paragliding | lot tandemem paralotnią z Khau Phạ | 3–5 dni | 1–2 tygodnie: koniec VIII – IX, 2.09, festiwale | 5 | Mebayluon, rezerwacja: https://www.mebayluon.com/booking; Mebayluon, loty w Mù Cang Chải: https://www.mebayluon.com/blog/du-luon-mu-cang-chai |
| mucangchai.trek | przewodnik na wędrówkę Chế Cu Nha – La Pán Tẩn | 2–3 dni (szacunek) | ok. tydzień: złoty sezon, 2.09 (szacunek) | 3 | Local Vietnam, Mù Cang Chải z wędrówką: https://localvietnam.com/tour/mu-cang-chai-tour/ |
| mucangchai.car | auto z kierowcą na dzień | dzień wcześniej (szacunek) | 2–3 dni: złoty sezon (szacunek) | 1 | — (przez gospodarzy) |

- Lùng Cúng bez trudnego dnia (decyzja z sesji partii B, 14.10.2026: żadne biuro nie podaje numeru licencji), więc bez wiersza w tabeli; gdyby wrócił: `mucangchai.lungcung`, 1–2 tygodnie (szacunek), w szczycie 2–3 tygodnie (złoty sezon, XII), 14 dni, MAM Travel, Lùng Cúng: https://mamtravel.vn/en/tour/trekking-lung-cung/.
```

W `site2/src/before.js` zamień:

```js
  'cucphuong.maybac': { ahead: 3, links: [{ name: 'Du lịch Cúc Phương, kontakt', url: 'https://dulichcucphuong.com.vn/contact-us/' }, { name: 'Du lịch Cúc Phương, combo z Mây Bạc', url: 'https://dulichcucphuong.com.vn/combo-mot-ngay/' }] },
```

na:

```js
  'cucphuong.maybac': { ahead: 3, links: [{ name: 'Du lịch Cúc Phương, kontakt', url: 'https://dulichcucphuong.com.vn/contact-us/' }, { name: 'Du lịch Cúc Phương, combo z Mây Bạc', url: 'https://dulichcucphuong.com.vn/combo-mot-ngay/' }] },
  'mucangchai.paragliding': { ahead: 5, links: [{ name: 'Mebayluon, rezerwacja', url: 'https://www.mebayluon.com/booking' }, { name: 'Mebayluon, loty w Mù Cang Chải', url: 'https://www.mebayluon.com/blog/du-luon-mu-cang-chai' }] },
  'mucangchai.trek': { ahead: 3, links: [{ name: 'Local Vietnam, Mù Cang Chải z wędrówką', url: 'https://localvietnam.com/tour/mu-cang-chai-tour/' }] },
```

W `site2/src/before.js` zamień:

```js
  'sapa.car': { ahead: 1, links: [] },
```

na:

```js
  'sapa.car': { ahead: 1, links: [] },
  'mucangchai.car': { ahead: 1, links: [] },
```

W `site2/src/before.js` zamień:

```js
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang', 'hagiang'];
// the hosts with a peak of their own: the line of the hosts adds the place's sentence (UI key b.homestay.<id>)
var HOMESTAY_NOTES = ['puluong', 'hagiang'];
```

na:

```js
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang', 'hagiang', 'mucangchai'];
// the hosts with a peak of their own: the line of the hosts adds the place's sentence (UI key b.homestay.<id>)
var HOMESTAY_NOTES = ['puluong', 'hagiang', 'mucangchai'];
```

W `site2/src/climate.js` zamień:

```js
// ulewy: downpours most days; tajfuny: typhoon season (sailing bans); powodzie: flood season
var WEATHER_WHY = ['upal', 'deszcz', 'szaro', 'chlod', 'morze', 'fale', 'ulewy', 'tajfuny', 'powodzie'];
```

na:

```js
// ulewy: downpours most days; tajfuny: typhoon season (sailing bans); powodzie: flood season; tarasy: the rice terraces after
// the harvest, without rice (not the weather: Mù Cang Chải's exception in XI–III, decision of 14.10.2026, research/mucangchai-2026-10.md)
var WEATHER_WHY = ['upal', 'deszcz', 'szaro', 'chlod', 'morze', 'fale', 'ulewy', 'tajfuny', 'powodzie', 'tarasy'];
```

W `site2/src/climate.js` zamień:

```js
    rain: [[5.2, 1.6], [3.8, 0.8], [24.1, 3.4], [84.3, 7.8], [233.6, 18.5], [245.1, 21.2], [253.7, 23.4], [309.8, 24.2], [311.4, 23.2], [198.8, 15.7], [100.3, 10.6], [26.4, 5.8]],
    why: { 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 10: ['deszcz'] }
  }
```

na:

```js
    rain: [[5.2, 1.6], [3.8, 0.8], [24.1, 3.4], [84.3, 7.8], [233.6, 18.5], [245.1, 21.2], [253.7, 23.4], [309.8, 24.2], [311.4, 23.2], [198.8, 15.7], [100.3, 10.6], [26.4, 5.8]],
    why: { 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 10: ['deszcz'] }
  },
  mucangchai: {
    t: [[9.2, 19], [10.5, 21.3], [13.4, 24.8], [16.7, 27.3], [19.1, 28], [20.5, 27.4], [20.4, 27.2], [19.8, 27.4], [18.4, 26.8], [16.1, 25.1], [12.6, 22.1], [9.2, 19.4]],
    rain: [[28.5, 4.9], [32.1, 5.3], [63.4, 7.6], [129.5, 13.7], [215.1, 18.9], [344, 24.2], [383.7, 26.1], [313.5, 23], [132.3, 15.1], [64, 10.4], [35.4, 5.6], [24.2, 4]],
    why: { 1: ['tarasy'], 2: ['tarasy'], 3: ['tarasy'], 5: ['deszcz'], 6: ['ulewy'], 7: ['ulewy'], 8: ['ulewy'], 11: ['tarasy'], 12: ['tarasy'] }
  }
```

W `site2/src/content.js` zamień:

```js
  'HAN-hagiang': { text: 'r.air_ninhbinh', book: true }, 'HAN-sapa': { text: 'r.air_ninhbinh', book: true },
```

na:

```js
  'HAN-hagiang': { text: 'r.air_ninhbinh', book: true }, 'HAN-sapa': { text: 'r.air_ninhbinh', book: true },
  // Mù Cang Chải: a car from Nội Bài; the sleeper buses leave from Mỹ Đình in the city
  'HAN-mucangchai': { text: 'r.air_car', book: true },
```

Utwórz `site2/src/content/mucangchai.js`:

```js
/* Mù Cang Chải: texts of the place (stage 3, batch B). Facts and sources: research/mucangchai-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.mucangchai = {
  name: 'Mù Cang Chải i przełęcz Khau Phạ', short: 'Mù Cang Chải',
  sub: 'Tarasy ryżowe Hmông, wzgórze Mâm Xôi i paralotnie nad przełęczą Khau Phạ',
  region: 'north', maps: 'Mu Cang Chai, Lao Cai, Vietnam', pt: [21.85, 104.09], color: 20,
  photos: ['mucangchai_0', 'mucangchai_1', 'mucangchai_2', 'mucangchai_3', 'mucangchai_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Tarasy o zachodzie słońca', d: 'Zamelduj się u gospodarzy w La Pán Tẩn albo w miasteczku. Ok. 16:00 wzgórze Móng Ngựa, 2 km od centrum: tarasy ułożone w podkowę, najpiękniejsze przed zachodem słońca, a po 17:00 tłoczno. Na zboczach jest stromo, a na barierkach budek do zdjęć nie stawaj. Na kolację ryba z potoku albo pstrąg z hodowli pod Khau Phạ.',
      rain: 'po deszczu ścieżki na zboczach Móng Ngựa są śliskie: zostań na górnym punkcie widokowym albo przełóż tarasy na jutro.' },
    { p: 2, o: 2, pace: 'hike', cost: ['mucangchai.trek'], t: 'Wioski i tarasy La Pán Tẩn', d: 'Całodniowa wędrówka z lokalnym przewodnikiem: z Chế Cu Nha przez tarasy, las i wioski Hmông do La Pán Tẩn, ok. 10 km, z obiadem po drodze. Na koniec wzgórze Mâm Xôi, tarasy ułożone jak taca kleistego ryżu, skąd ok. 16:00 zabierze cię auto. Po deszczu groble między tarasami są śliskie, więc weź buty z dobrą podeszwą.',
      rain: 'w ulewie zamiast wędrówki autem po punktach widokowych Mâm Xôi i Kim Nọi, a pieszo tylko krótkie odcinki po betonowych drogach.',
      easy: { pace: 'nature', cost: ['mucangchai.car'], t: 'Punkty widokowe autem', d: 'Autem z kierowcą po punktach widokowych: rano Mâm Xôi w La Pán Tẩn (ostatni odcinek mototaksówką), potem tarasy i skała Kim Nọi, ok. 300 m pieszo od drogi, i bambusowy las Mồ Dề, 3,5 km od miasteczka.' } },
    { p: 3, o: 3, pace: 'nature', cost: ['mucangchai.car', 'mucangchai.paragliding'], t: 'Nad doliną Lìm Mông', d: 'Rano na przełęcz Khau Phạ, ok. 20 km od miasteczka, z widokiem na tarasy doliny Lìm Mông. Kto chce, leci stąd tandemem paralotnią z pilotem: 10–15 minut nad tarasami, z lądowaniem w dolinie, z której operator odwozi na górę. Loty zależą od wiatru, więc zarezerwuj z wyprzedzeniem i miej w zapasie drugi termin. Po południu spacer doliną Lìm Mông i Tú Lệ: cốm prosto z pola i kąpiel w gorących źródłach.',
      rain: 'w deszczu paralotnie nie latają, a przełęcz tonie w chmurach: zostań w Tú Lệ przy gorących źródłach albo zamień ten dzień z innym.' }
  ],
  gem: 'Wzgórze Mâm Xôi w La Pán Tẩn: tarasy ułożone jak taca kleistego ryżu, część zabytku narodowego szczególnej klasy.',
  skip: 'Mù Cang Chải w jeden dzień z Hà Nội albo z Sa Pa: 8–12 godzin w aucie na tarasy oglądane przez szybę.',
  instead: 'noc u gospodarzy w La Pán Tẩn: rano Mâm Xôi bez tłumu, wieczorem Móng Ngựa.',
  events: [
    { from: [4, 25], to: [6, 15], t: 'Pora wody: tarasy zalewa się pod sadzenie ryżu, najwcześniej w Tú Lệ pod koniec kwietnia, w wioskach Mù Cang Chải w maju i czerwcu, a w suchy rok dopiero na początku lipca.' },
    { from: [6, 1], to: [10, 10], warn: true, pack: ['leeches'], t: 'Pora ulew i sztormów: na szosie 32 i na przełęczy Khau Phạ zdarzają się osuwiska, jak 1–3 października 2025, gdy droga stała trzy dni. Dzień wcześniej sprawdź komunikaty i miej dzień zapasu; na groblach są błoto i pijawki.' },
    { from: [8, 20], to: [10, 20], t: 'Złote tarasy: ryż dojrzewa najpierw w Tú Lệ i dolinie Lìm Mông (koniec sierpnia), potem w La Pán Tẩn i Chế Cu Nha (do połowy października). Na przełomie sierpnia i września trwa festiwal z lotami paralotni nad Khau Phạ i flagą na tarasach 2 września. To jedyny tłok w roku, więc nocleg i lot zarezerwuj kilka tygodni wcześniej.' },
    { from: [12, 1], to: [2, 29], warn: true, t: 'Zimna pora: noce w miasteczku ok. 9 °C, a w falach chłodu na przełęczy i w La Pán Tẩn szron. Tarasy stoją po żniwach bez ryżu, za to kwitnie wtedy tớ dày, a doliny często wypełnia morze chmur.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52], sapa: [24, 60], yokdon: [10, 14] },
```

na:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52], sapa: [24, 60], yokdon: [10, 14], mucangchai: [14, 51] },
```

W `site2/src/costs.js` zamień:

```js
    'yokdon.camp': { pp: [0, 0], group: [48, 48] }
```

na:

```js
    'yokdon.camp': { pp: [0, 0], group: [48, 48] },
    'mucangchai.trek': { pp: [17, 31], group: [5, 18] },
    'mucangchai.car': { pp: [0, 0], group: [36, 53] },
    'mucangchai.paragliding': { pp: [0, 75], group: [0, 0] }
```

W `site2/src/photos.js` zamień:

```js
  yokdon_4: { cap: 'Muzeum Đắk Lắk w Buôn Ma Thuột', artist: 'Daaé', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Bao_tang_Dak_Lak_1.JPG' },
```

na:

```js
  yokdon_4: { cap: 'Muzeum Đắk Lắk w Buôn Ma Thuột', artist: 'Daaé', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Bao_tang_Dak_Lak_1.JPG' },
  mucangchai_0: { cap: 'Tarasy w La Pán Tẩn', artist: 'Văn Ngọc Tăng (langthangdaydo)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:La_P%C3%A1n_T%E1%BA%A9n_Agriculture_(Unsplash).jpg' },
  mucangchai_1: { cap: 'Tarasy pod przełęczą Khau Phạ', artist: 'Doan Tuan (danny_pham93)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Khau_Ph%E1%BA%A1_Pass,_Vietnam_(Unsplash).jpg' },
  mucangchai_2: { cap: 'Tarasy w gminie Chế Cu Nha', artist: 'Doan Tuan (danny_pham93)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Terraces_in_Che_Cu_Nha_commune,_Mu_Cang_Chai_(Unsplash).jpg' },
  mucangchai_3: { cap: 'Dolina pod przełęczą Khau Phạ z góry', artist: 'Victor311', license: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Khau_Ph%E1%BA%A1_nh%C3%ACn_t%E1%BB%AB_tr%C3%AAn_cao.jpg' },
  mucangchai_4: { cap: 'Tarasy w porze wody w Dế Xu Phình', artist: 'Gió Đông', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Mu_Cang_Chai_02.JPG' },
```

W `site2/src/places.js` zamień:

```js
   22.34° N, sits past Hà Giang so the north runs Ba Bể → Cao Bằng → Hà Giang → Sa Pa). nights: [min, ideal, max]; the
```

na:

```js
   22.34° N, sits past Hà Giang so the north runs Ba Bể → Cao Bằng → Hà Giang → Sa Pa; Mù Cang Chải, at 21.85° N, sits past
   Sa Pa, the way down from Sa Pa to Hà Nội on road 32). nights: [min, ideal, max]; the
```

W `site2/src/places.js` zamień:

```js
  yokdon:    { axis: 12.87, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 3, gory: 0, morze: 0 } }
```

na:

```js
  yokdon:    { axis: 12.87, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 3, gory: 0, morze: 0 } },
  mucangchai: { axis: 22.95, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } }
```

W `site2/src/seasons.js` zamień:

```js
  yokdon: 'DDDDSSSSSSDD'
```

na:

```js
  yokdon: 'DDDDSSSSSSDD', mucangchai: 'SSSDSZZZDDSS'
```

W `site2/src/travel.js` zamień:

```js
  ['hanoi', 'sapa', 5.5], ['HAN', 'sapa', 5], ['hagiang', 'sapa', 6], ['ninhbinh', 'sapa', 6.5],
```

na:

```js
  ['hanoi', 'sapa', 5.5], ['HAN', 'sapa', 5], ['hagiang', 'sapa', 6], ['ninhbinh', 'sapa', 6.5],
  // Mù Cang Chải, on road 32 from Hà Nội over the Khau Phạ pass, and to Sa Pa by Than Uyên
  ['hanoi', 'mucangchai', 6], ['HAN', 'mucangchai', 5.75], ['sapa', 'mucangchai', 4.5], ['hagiang', 'mucangchai', 7],
```

W `site2/src/ui.js` zamień:

```js
  'wx.morze': 'zimne morze', 'wx.fale': 'wzburzone morze', 'wx.ulewy': 'ulewy przez większość dni', 'wx.tajfuny': 'pora tajfunów', 'wx.powodzie': 'pora powodzi',
```

na:

```js
  'wx.morze': 'zimne morze', 'wx.fale': 'wzburzone morze', 'wx.ulewy': 'ulewy przez większość dni', 'wx.tajfuny': 'pora tajfunów', 'wx.powodzie': 'pora powodzi',
  'wx.tarasy': 'tarasy po żniwach, bez ryżu',
```

W `site2/src/ui.js` zamień:

```js
  'cost.yokdon.cooking': 'lekcja gotowania u rodziny Ê Đê', 'cost.yokdon.camp': 'noc w lesie Yok Đôn',
```

na:

```js
  'cost.yokdon.cooking': 'lekcja gotowania u rodziny Ê Đê', 'cost.yokdon.camp': 'noc w lesie Yok Đôn',
  'cost.mucangchai.trek': 'przewodnik w Mù Cang Chải', 'cost.mucangchai.car': 'auto z kierowcą w okolicy Mù Cang Chải',
  'cost.mucangchai.paragliding': 'lot paralotnią nad Khau Phạ',
```

W `site2/src/ui.js` zamień:

```js
  'b.yokdon.camp': 'Noc w lesie Yok Đôn z przewodnikiem parku: 3–7 dni wcześniej, w szczycie 2 tygodnie.',
```

na:

```js
  'b.yokdon.camp': 'Noc w lesie Yok Đôn z przewodnikiem parku: 3–7 dni wcześniej, w szczycie 2 tygodnie.',
  'b.mucangchai.paragliding': 'Lot tandemem paralotnią z Khau Phạ: 3–5 dni wcześniej, w porze złotych tarasów i w czasie festiwalu 1–2 tygodnie. Loty zależą od wiatru, więc zostaw sobie drugi termin.',
  'b.mucangchai.trek': 'Przewodnik na wędrówkę z Chế Cu Nha do La Pán Tẩn: 2–3 dni wcześniej, w porze złotych tarasów ok. tygodnia.',
  'b.mucangchai.car': 'Samochód z kierowcą na dzień w okolicy Mù Cang Chải: dzień wcześniej, przez gospodarzy.',
```

W `site2/src/ui.js` zamień:

```js
  'b.homestay.hagiang': 'W Đồng Văn i Du Già w porze kwitnienia gryki (X–XII) 2–3 tygodnie wcześniej.',
```

na:

```js
  'b.homestay.hagiang': 'W Đồng Văn i Du Già w porze kwitnienia gryki (X–XII) 2–3 tygodnie wcześniej.',
  'b.homestay.mucangchai': 'W Mù Cang Chải w porze złotych tarasów (koniec VIII – połowa X) i na 2.09 3–4 tygodnie wcześniej.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"
bash "$TMPDIR/sondy-b1.sh" MIESIAC
```

Oczekiwane: `ALL PASS`, build bez błędów, grep nic nie wypisuje, `sondy (…): 0 z 19 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add research/mucangchai-2026-10.md site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/mucangchai.js site2/src/costs.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/ui.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Mù Cang Chải: tarasy ryżowe Hmông na 2–3 noce u gospodarzy, oś 22,95 (za Sa Pa, zejście z pętli północy do Hà Nội szosą 32), sezon ze stacji w miasteczku z wyjątkiem XI–III na średni, bo tarasy stoją po żniwach (nowy powód „tarasy po żniwach, bez ryżu”), bez trudnego dnia; wędrówka z przewodnikiem z Chế Cu Nha do La Pán Tẩn, na „Spokojnie” punkty widokowe autem, przy trzech nocach przełęcz Khau Phạ z lotem paralotnią jako opcją; drogi z Hà Nội, z lotniska, z Sa Pa i z Hà Giang, ceny, rezerwacje, nocleg u gospodarzy z uwagą o porze złotych tarasów, cztery wydarzenia, kolor 20 i pięć zdjęć

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Punkt kontrolny planu B1

Wszystko razem, na zbudowanej stronie, z liczbami przed planem i po nim, z użytkownikiem i z prawdziwym telefonem.

- [ ] **Krok 1: Pełny test**

```bash
time bash tests/run.sh --full
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)`, `ALL PASS`, ok. 2,5 min (w suchej próbie 145 s).

- [ ] **Krok 2: Sondy dla dwóch miesięcy**

```bash
python3 site2/build.py
bash "$TMPDIR/sondy-b1.sh" MIESIAC
bash "$TMPDIR/sondy-b1.sh" 2027-07
```

Oczekiwane: dwa razy `sondy (…): 0 z 19 nie przeszło` (lipiec: pora deszczowa, w której szlak Tà Năng i noc w lesie Yok Đôn są wyłączone).

- [ ] **Krok 3: Linki i licencje** (tylko odczyt)

```bash
bash tools/links.sh | grep -v '^200 '
bash tools/licenses.sh | tail -n 1
```

Oczekiwane: jedna linia `406 https://sapaochau.org/…` (strona otwiera się w przeglądarce normalnie) i `links.sh: 1 address(es) did not answer 2xx`, czyli 66 z 67 adresów z kodem 200; `licenses.sh: 97 photos, 0 licence problem(s), 0 author(s) to check`.

- [ ] **Krok 4: Wydruk trzech tras w obu motywach**

```bash
D1='od=DAD&do=SGN&miesiac=2027-01&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon'
D2='od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai'
D3='od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3'
bash tests/print.sh "$D1" "$TMPDIR/wietnam-b1/d1.pdf"
bash tests/print.sh "$D1" "$TMPDIR/wietnam-b1/d1-dark.pdf" dark
bash tests/print.sh "$D2" "$TMPDIR/wietnam-b1/d2.pdf"
bash tests/print.sh "$D2" "$TMPDIR/wietnam-b1/d2-dark.pdf" dark
bash tests/print.sh "$D3" "$TMPDIR/wietnam-b1/d3.pdf"
bash tests/print.sh "$D3" "$TMPDIR/wietnam-b1/d3-dark.pdf" dark
```

Oczekiwane: każdy wydruk na A4, `covered text lines: 0`, żadnej prawie pustej strony poza ostatnią; d1 15 stron, d3 21 stron (jak w suchej próbie, gdzie d2 przy 14 dniach miał 13 stron; przy 15 dniach będzie o stronę albo dwie dłuższy).

- [ ] **Krok 5: Raport tras i liczby do przeglądu**

Raport przykładowych tras trafia do `notes/` i do commita w zadaniu 10; ścieżka idzie do `$TMPDIR/raport-b1.txt`:

```bash
R="notes/raport-tras-$(date +%Y-%m-%d).md"
[ -e "$R" ] && R="notes/raport-tras-$(date +%Y-%m-%d)-b1.md"
bash tools/report.sh > "$R"
echo "$R" > "$TMPDIR/raport-b1.txt"
cat "$TMPDIR/raport-b1.txt"
```

Liczby ze wszystkich tras po planie, obok liczb przed planem z zadania 1, krok 4 (ok. minuty każde):

```bash
bash tools/liczby.sh > "$TMPDIR/wietnam-b1/liczby-po.md"
cat "$TMPDIR/wietnam-b1/liczby-przed.md" "$TMPDIR/wietnam-b1/liczby-po.md"
```

Oczekiwane, jak w suchej próbie (w nawiasie przed planem):
- Yok Đôn na 19,6% tras (3,2% bez zainteresowań, zawsze 2 noce), Mù Cang Chải na 5,9% (3,2%, średnio 2,71 nocy);
- Hội An na 72,0% (72,0%), średnio 2,50 nocy (1,88), 3 noce w 51,7% pobytów;
- Đà Lạt 48,0% (49,8%), Cát Tiên 13,8% (14,5%), Cúc Phương 17,1% (19,7%), Sa Pa 18,7% (20,7%), Hà Giang 25,8% (28,0%), Pù Luông 7,1% (9,1%), Ba Bể 6,2% (8,0%), Cao Bằng 4,2% (5,6%);
- dzień z dwoma lotami: 9,4% tras (10,3%);
- dzień z lotem 8 h i dłużej: 11,0% tras (12,2%), najczęściej Sa Pa → Hội An (4680), Sa Pa → Hồ Chí Minh City (2664), Hội An → Sa Pa (1983), Mù Cang Chải → Hội An (1107), Hà Giang → Hội An (762);
- Hà Nội trzy razy: 1314 tras (1497); bliskie miejsca nie obok siebie: 0 tras (0);
- zygzak: 2,0% tras (2,4%); powrót do domu w środku trasy w obie strony: 0 tras (0).

Trzecia noc w Hội An według zainteresowań i najszersza kwota budżetu (ok. 2 min):

```bash
cat > "$TMPDIR/wietnam-b1/hoian.js" <<'JSEOF'
// Hội An by interest: on how many trips, and how many of its stays have three nights (the third day is Mỹ Sơn)
var DA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
var sets = [[]];
INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
sets.forEach(function (interests) {
  var trips = 0, on = 0, stays = 0, three = 0;
  LEVELS.forEach(function (level) { for (var month = 1; month <= 12; month++) for (var days = MIN_DAYS; days <= MAX_DAYS; days++)
    Object.keys(HUBS).forEach(function (from) { Object.keys(HUBS).forEach(function (to) {
      var r = planRoute(normSettings({ from: from, to: to, month: month, days: days, interests: interests, level: level }, PLACES, HUBS), DA), seen = false;
      if (!r.ok) return;
      trips++;
      r.stops.forEach(function (x) { if (x.id === 'hoian') { stays++; seen = true; if (x.n === 3) three++; } });
      if (seen) on++;
    }); }); });
  print((interests.join('+') || '(brak)') + ': Hội An na ' + Math.round(100 * on / trips) + '% tras, 3 noce w ' + Math.round(100 * three / stays) + '% pobytów');
});
JSEOF
cat > "$TMPDIR/wietnam-b1/kwota.js" <<'JSEOF'
// the widest budget of trips of 25–30 days, as the facts row shows it (two people, rounded to 100 zł)
var DA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
var BUDR = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
var sets = [[]], top = [];
INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
sets.forEach(function (interests) { LEVELS.forEach(function (level) { for (var month = 1; month <= 12; month++) for (var days = 25; days <= MAX_DAYS; days++)
  Object.keys(HUBS).forEach(function (from) { Object.keys(HUBS).forEach(function (to) {
    var st = normSettings({ from: from, to: to, month: month, days: days, interests: interests, level: level }, PLACES, HUBS), r = planRoute(st, DA);
    if (!r.ok) return;
    var done = {}, plans = r.stops.map(function (x, i) { var d = stopDays(CONTENT[x.id], x, done[x.id] || 0, st.level, st.months, legAfter(r, i)); done[x.id] = (done[x.id] || 0) + x.n; return d; });
    var z = zlRange(tripBudget(r, plans, [], BUDR).two, EUR_PLN, 100);
    top.push([z[1], money(z[0]) + '–' + money(z[1]) + ' zł', [from, to, month, days, interests.join(','), level].join(' ')]);
  }); }); }); });
top.sort(function (a, b) { return b[0] - a[0]; });
top.slice(0, 3).forEach(function (t) { print(t[1].replace(/\u00a0/g, ' ') + '  ' + t[2]); });
JSEOF
cat > "$TMPDIR/wietnam-b1/jsc.sh" <<'SHEOF'
#!/bin/bash
# runs a script of the checkpoint after every source of the page (as tests/run.sh lists them)
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
P=site2/src
"$J" $P/places.js $P/seasons.js $P/climate.js $P/travel.js $P/engine.js $P/holidays.js $P/content.js $P/content/*.js $P/photos.js $P/ui.js $P/panels.js $P/costs.js $P/before.js $P/page.js "$1"
SHEOF
bash "$TMPDIR/wietnam-b1/jsc.sh" "$TMPDIR/wietnam-b1/hoian.js"
bash "$TMPDIR/wietnam-b1/jsc.sh" "$TMPDIR/wietnam-b1/kwota.js"
```

Oczekiwane, jak w suchej próbie:
- Hội An: 3 noce w 61% pobytów bez zainteresowań, 64–71% przy kulturze albo jedzeniu (bez przyrody i gór), 41–58% przy kulturze albo jedzeniu z przyrodą albo górami, 0% przy samej przyrodzie i przy przyrodzie z górami, 2% przy samych górach, 32% przy przyrodzie z morzem, 44% przy górach z morzem, 69% przy samym morzu;
- najszersza kwota: `8 600–17 200 zł  DAD DAD 4 30 gory,morze 3`.

Jeśli poprawki z kroku 9 zmienią dane albo silnik, policz liczby jeszcze raz i opisz zmianę w wyniku przeglądu.

- [ ] **Krok 6: Zrzuty sześciu ustawień**

```bash
Z1='od=SGN&do=SGN&miesiac=2027-01&dni=10&co=przyroda&poziom=3&dodaj=yokdon'
Z2='od=DAD&do=DAD&miesiac=2027-03&dni=8&co=kultura&poziom=2'
Z3='od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai'
Z4='od=DAD&do=SGN&miesiac=2027-01&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon'
Z5='od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3'
Z6='od=HAN&do=HAN&miesiac=2027-10&dni=16&co=gory,przyroda&poziom=2&dodaj=mucangchai,sapa'
cat > "$TMPDIR/wietnam-b1/miejsca.js" <<'JSEOF'
// where the places to look at stand on the page (y from the top, in px); \s also matches the no-break spaces in names
setTimeout(function () {
  function y(el) { return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1; }
  function stop(re) { return Array.prototype.filter.call(document.querySelectorAll('.stop'), function (s) { return re.test(s.textContent.slice(0, 200)); })[0]; }
  var fly = Array.prototype.filter.call(document.querySelectorAll('.leg'), function (l) { return /Buôn\sMa\sThuột/.test(l.textContent) && /Đà\sNẵng/.test(l.textContent); })[0];
  [['yokdon', stop(/Yok\sĐôn/)], ['dalat', stop(/Wyżyna\swokół/)], ['hoian', stop(/Stare\smiasto\so\sświcie/)], ['mucangchai', stop(/Mù\sCang\sChải\si\sprzełęcz/)],
   ['fly', fly], ['facts', document.querySelector('.facts')], ['map', document.querySelector('.map-col')], ['height', document.documentElement]].forEach(function (p) {
    check('y ' + p[0] + ' ' + (p[0] === 'height' ? document.documentElement.scrollHeight : y(p[1])), true);
  });
  done();
}, 1500);
JSEOF
for z in 1 2 3 4; do eval H=\$Z$z; bash tests/probe.sh "$TMPDIR/wietnam-b1/miejsca.js" 390 "$H" | grep '^ok   y ' > "$TMPDIR/wietnam-b1/z$z-y.txt"; done
for z in 1 2 3 4; do eval H=\$Z$z; bash tests/shot.sh "$H" 390 "$TMPDIR/wietnam-b1/z$z.png" "$(awk '$3 == "height" { print $4 + 50 }' "$TMPDIR/wietnam-b1/z$z-y.txt")"; done
for w in 641 768 901; do bash tests/probe.sh "$TMPDIR/wietnam-b1/miejsca.js" $w "$Z5" | grep '^ok   y ' > "$TMPDIR/wietnam-b1/z5-$w-y.txt"; bash tests/shot.sh "$Z5" $w "$TMPDIR/wietnam-b1/z5-$w.png" "$(awk '$3 == "facts" { print $4 + 600 }' "$TMPDIR/wietnam-b1/z5-$w-y.txt")"; done
for m in Z6 Z1; do eval H=\$$m; bash tests/probe.sh "$TMPDIR/wietnam-b1/miejsca.js" 1400 "$H" | grep '^ok   y ' > "$TMPDIR/wietnam-b1/mapa-$m-y.txt"; bash tests/shot.sh "$H" 1400 "$TMPDIR/wietnam-b1/mapa-$m.png" "$(awk '$3 == "map" { print $4 + 1400 }' "$TMPDIR/wietnam-b1/mapa-$m-y.txt")"; done
python3 - "$TMPDIR/wietnam-b1" <<'PYEOF'
# the pieces to look at with Read: each stay or journey of interest in two columns, the facts row at three widths, the maps
import os, sys
from PIL import Image
d = sys.argv[1]
def ys(z):
    out = {}
    for line in open(os.path.join(d, 'z%d-y.txt' % z)):
        p = line.split(); out[p[2]] = int(p[3])
    return out
def piece(z, key, h, out):
    y = ys(z)[key]
    if y < 0: print('missing', z, key); return
    im = Image.open(os.path.join(d, 'z%d.png' % z)).crop((0, y, 390, y + h))
    half = (im.height + 1) // 2
    s = Image.new('RGB', (800, half), 'white'); s.paste(im.crop((0, 0, 390, half)), (0, 0)); s.paste(im.crop((0, half, 390, im.height)), (410, 0))
    s.save(os.path.join(d, out))
piece(1, 'dalat', 2300, 'k-dalat.png'); piece(1, 'yokdon', 1700, 'k-yokdon.png')
piece(2, 'hoian', 2000, 'k-hoian.png'); piece(3, 'mucangchai', 2300, 'k-mucangchai.png'); piece(4, 'fly', 500, 'k-lot.png')
def facts(w):
    y = [int(l.split()[3]) for l in open(os.path.join(d, 'z5-%d-y.txt' % w)) if l.split()[2] == 'facts'][0]
    return Image.open(os.path.join(d, 'z5-%d.png' % w)).crop((0, max(0, y - 40), w, y + 560))
ims = [facts(w) for w in (641, 768, 901)]
s = Image.new('RGB', (sum(i.width for i in ims) + 20, 600), (200, 200, 200)); x = 0
for i in ims: s.paste(i, (x, 0)); x += i.width + 10
s.save(os.path.join(d, 'k-kwota.png'))
for m in ('Z6', 'Z1'):
    y = [int(l.split()[3]) for l in open(os.path.join(d, 'mapa-%s-y.txt' % m)) if l.split()[2] == 'map'][0]
    Image.open(os.path.join(d, 'mapa-%s.png' % m)).crop((0, y, 1400, y + 1400)).save(os.path.join(d, 'k-mapa-%s.png' % m))
print(sorted(f for f in os.listdir(d) if f.startswith('k-')))
PYEOF
```

Obejrzyj kawałki narzędziem Read (mapy przytnij do kolumny mapy, jeśli są za szerokie) i sprawdź:
- **k-dalat, k-yokdon** (z1, styczeń, przyroda, „Ekstremalnie”, 390 px): w Đà Lạt dni 2 i 3 to szlak Tà Năng–Phan Dũng z plakietkami „Trudny dzień” i „Pobudka przed 6”, z biurem i przewodnikiem, powrotem ok. 20:00; w Yok Đôn dzień 2 to „Noc w lesie Yok Đôn” z przewodnikiem parku, a „Do pominięcia” mówi o jeździe na słoniu w Lắk;
- **k-hoian** (z2, marzec, kultura, 8 dni): Hội An na 3 noce, dzień 3 „Mỹ Sơn o 6:00” z plakietkami „Zwiedzanie bez wysiłku” i „Pobudka przed 6”, galeria „1 / 5” (plan na deszcz strona pokazuje dopiero w miesiącu z co najmniej 10 dniami z deszczem, więc w marcu go nie ma; zdjęcie grup B, C i D w galerii sprawdza telefon, krok 8);
- **k-mucangchai** (z3, październik, góry, 15 dni): 3 noce, dzień 2 wędrówka z przewodnikiem, dzień 3 Khau Phạ z paralotnią jako opcją, wydarzenia „Złote tarasy” i „Pora ulew i sztormów”, pogoda bez powodu „tarasy po żniwach” (październik to dobry sezon);
- **k-lot** (z4): karta przejazdu z lotem Đà Nẵng → Buôn Ma Thuột i uwagą o wtorkach, czwartkach i sobotach;
- **k-kwota** (z5 przy 641, 768 i 901 px): kwota 8 600–17 200 zł mieści się w kafelku, bez wystawania;
- **k-mapa-Z6, k-mapa-Z1** (mapy przy 1400 px): w kadrze północy znaczniki Sa Pa i Mù Cang Chải osobno, z etykietami w kadrze; w kadrze południa Yok Đôn przy górnej krawędzi, z etykietą w kadrze.

- [ ] **Krok 7: Ręcznie w przeglądarce.** Chrome bez okna nie uruchamia IntersectionObserver, a wbudowana przeglądarka nie otwiera `file://`, więc strona idzie z lokalnego serwera.
  - Utwórz `.claude/launch.json`:

    ```json
    {
      "version": "0.0.1",
      "configurations": [
        { "name": "strona-b1", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765", "--directory", "site2/out/pages"], "port": 8765 }
      ]
    }
    ```

  - Uruchom serwer narzędziem `preview_start` (nazwa `strona-b1`) i przejdź do `http://localhost:8765/#od=DAD&do=SGN&miesiac=2027-01&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon`.
  - Ustaw widok `desktop` i sprawdź: podświetlanie znacznika Yok Đôn na mapie przy przewijaniu, powiększenie mapy z trzema kadrami i Escape, który je zamyka; potem to samo dla `#od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai` (znacznik Mù Cang Chải).
  - Ustaw widok `mobile` i sprawdź pasek u góry i „Na górę”.
  - Klikaj po współrzędnych ze świeżego zrzutu, nie po `ref`. Przycisku PDF nie klikaj w tej przeglądarce.
  - Zatrzymaj serwer (`preview_stop`) i usuń `.claude/launch.json` (oraz pusty katalog `.claude/`).

- [ ] **Krok 8: Prawdziwy telefon** (z użytkownikiem, w domowej sieci Wi-Fi). Najpierw zapytaj, czy użytkownik ma teraz telefon pod ręką, w tej samej sieci Wi-Fi co Mac. Jeśli tak:
  - podaj adres Maca i uruchom serwer w tle (narzędziem Bash z `run_in_background`); w telefonie wpisuje się tylko `<adres>:8766/1` i `<adres>:8766/2`:

    ```bash
    ipconfig getifaddr en0
    T="$TMPDIR/telefon-b1"; rm -rf "$T"; mkdir -p "$T/1" "$T/2"
    ln -s "$PWD/site2/out/pages/index.html" "$T/index.html"; ln -s "$PWD/site2/out/pages/img" "$T/img"; ln -s "$PWD/site2/out/pages/fonts" "$T/fonts"
    printf '<meta http-equiv="refresh" content="0; url=/#od=DAD&do=SGN&miesiac=2027-01&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon">' > "$T/1/index.html"
    printf '<meta http-equiv="refresh" content="0; url=/#od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai">' > "$T/2/index.html"
    python3 -m http.server 8766 --bind 0.0.0.0 --directory "$T"
    ```

  - macOS może zapytać, czy `python3` ma przyjmować połączenia przychodzące: to decyzja użytkownika.
  - Zanim użytkownik weźmie telefon do ręki, podaj mu od razu oba adresy i listę stuknięć:
    1. `<adres>:8766/1` (Hội An, Huế, Yok Đôn, Đà Lạt, Cát Tiên, Hồ Chí Minh City):
       - w Hội An dzień 3 „Mỹ Sơn o 6:00”, a w galerii Hội An (przesuń palcem) zdjęcie grup świątyń B, C i D w Mỹ Sơn;
       - karta przejazdu z lotem Đà Nẵng → Buôn Ma Thuột z uwagą o wtorkach, czwartkach i sobotach;
       - w Yok Đôn dzień 2 „Noc w lesie Yok Đôn” i galeria pięciu zdjęć (przesuń palcem);
       - w Đà Lạt dni 2 i 3 ze szlakiem Tà Năng–Phan Dũng;
       - w „Przed wyjazdem” → „Zarezerwuj wcześniej” szlak Tà Năng (2 tygodnie wcześniej) i słonie w Yok Đôn; stuknięcie linku parku Yok Đôn otwiera jego stronę.
    2. `<adres>:8766/2` (Hà Giang, Sa Pa, Mù Cang Chải): w Mù Cang Chải trzy dni i wydarzenia; w „Zarezerwuj wcześniej” linia noclegów u gospodarzy z uwagą o porze złotych tarasów.

    Powiększenia mapy na telefonie nie ma z założenia (działa od 901 px), więc tego nie sprawdzaj. Przez zwykłe http „Kopiuj plan na WhatsApp” pokazuje zapasowe pole z zaznaczonym tekstem, bo schowek działa tylko na stronie https: to nie błąd.
  - Porównaj log serwera z listą: jeśli otworzył się tylko jeden adres, zapytaj spokojnie o drugi. Gdy użytkownik zgłosi problem, zapytaj o pozostałe punkty listy jednym pytaniem wielokrotnego wyboru.
  - Po sprawdzeniu zatrzymaj serwer i usuń `$TMPDIR/telefon-b1`.

- [ ] **Krok 9: Przegląd z użytkownikiem**
  - Pokaż użytkownikowi w rozmowie kawałki z kroku 6 (najlepiej po jednym arkuszu na trasę), liczby z kroku 5 i wynik kroków 1–4, 7 i 8.
  - Do decyzji, po jednej sprawie, z rekomendacją i liczbami: każda rzecz, która wyszła inaczej niż w suchej próbie, a do tego dwie sprawy z punktu 1 „Na co uważać przy przeglądzie”, jeśli liczby są takie jak w suchej próbie:
    - trzecia noc w Hội An na trasach z samym morzem (69% pobytów): rekomendacja zostawić, bo Hội An ma plażę An Bàng i morze 1, a decyzja 6 to świadomie trzecia noc z Mỹ Sơn;
    - Yok Đôn na 19,6% tras: rekomendacja zostawić (przyroda 3 jak Cát Tiên, decyzja 5).
  - Poprawki idą jako osobne commity: test, który nie przechodzi (gdzie się da), kod, `ALL PASS`, sondy, commit z opisem „Poprawka z punktu kontrolnego planu B1: …”. Zmiana faktu najpierw trafia do researchu.
  - Wynik przeglądu zapisz jednym akapitem w `$TMPDIR/przeglad-b1.txt`: co przeszło, z liczbami z kroków 1–5; co obejrzał użytkownik; co poprawiono; co przeszło do planu B2 albo dalej. Zadanie 10 wpisze go do `notes/etapy.md`.

---

### Zadanie 8: Końcowy przegląd przed publikacją

Świeży recenzent na najmocniejszym modelu (Agent z modelem `fable`) patrzy na całość przed publikacją. W poprzednich planach taki przegląd znalazł rzeczy, których nie złapały sucha próba ani punkt kontrolny.

- [ ] **Krok 1: Zlecenie.** Uruchom recenzenta z zadaniem po angielsku, z wynikiem po polsku. Zlecenie podaje:
  - ten plan i `notes/wizja.md`;
  - zakres zmian: `git diff <commit planu>..HEAD` (commit tego planu na `main`), bez `docs/`;
  - sekcję „Na co uważać przy przeglądzie”;
  - zbudowaną stronę w `site2/out/pages`, wydruki i kawałki zrzutów z `$TMPDIR/wietnam-b1/`;
  - research: `research/yokdon-2026-10.md`, `mucangchai-2026-10.md`, `tanang-2026-10.md`, `myson-2026-10.md`.

  Recenzent odpowiada na pytania:
  - czy każde zdanie nowych tekstów o bezpieczeństwie, zakazach, przewodnikach i cenach ma pokrycie w researchu;
  - czy teksty dla czytelnika są po polsku, per „ty”, bez form rodzajowych;
  - czy trudne dni (szlak Tà Năng, noc w lesie Yok Đôn) pojawiają się tylko tam, gdzie powinny (poziom, miesiące, długość pobytu, następny przejazd);
  - czy coś w kodzie łamie ograniczenia globalne albo psuje dawne trasy;
  - czy coś w repo nie powinno być publiczne.

  Uwagi dzieli na krytyczne, ważne i drobne, każdą z plikiem i linią. Wynik zapisuje do `$TMPDIR/przeglad-koncowy-b1.txt`.
- [ ] **Krok 2: Uwagi jedna po drugiej.**
  - Każdą uwagę sprawdź sam w kodzie, w researchu albo na stronie, zanim cokolwiek zmienisz.
  - Prawdziwa uwaga krytyczna albo ważna to osobny commit „Poprawka z końcowego przeglądu planu B1: …” (test, kod, `ALL PASS`, sondy). Fakt zmienia się najpierw w researchu.
  - Drobne uwagi bez zmian idą na listy w `notes/etapy.md` w zadaniu 10 (ręcznie, po skrypcie).
  - Sprawę produktową (to, co zobaczy odwiedzający) najpierw pokaż użytkownikowi, z rekomendacją.
- [ ] **Krok 3: Wynik.** Zapisz do `$TMPDIR/recenzja-b1.txt` jeden akapit: co recenzent znalazł, co poprawiono i co poszło na listy. Zadanie 10 wpisze go do `notes/etapy.md`.

---

### Zadanie 9: Publikacja (każdy krok za wyraźną zgodą użytkownika)

- [ ] **Krok 1: Drugi rzut oka na komunikaty** (jak w zadaniu 11 etapu 4, tylko strony HTML, bez WebFetch na PDF-ach): czy coś zmieniło się od 14.10.2026 w faktach, które strona podaje jako bezpieczeństwo albo zamknięcia: program słoni i biwak w parku Yok Đôn, szlak Tà Năng–Phan Dũng (komunikat prowincji Lâm Đồng), droga 32 i przełęcz Khau Phạ (osuwiska), loty Đà Nẵng – Buôn Ma Thuột, bilet i zamknięcia Mỹ Sơn. Zmiana faktu: najpierw research, potem strona, osobny commit, `ALL PASS`; o zmianie powiedz użytkownikowi przed publikacją.
- [ ] **Krok 2: `docs/`**

```bash
bash tools/publish.sh
git status --short docs | head
grep -c 'name="robots" content="noindex"' docs/index.html
```

Oczekiwane: `publish.sh: docs/ ready (…)`; zmienione pliki w `docs/` (strona, nowe zdjęcia `yokdon_*`, `mucangchai_*`, `hoian_6`); `1`.

- [ ] **Krok 3: Commit `docs/`**

```bash
git add docs
git commit -F - <<'EOF'
Strona na GitHub Pages po planie B1 partii B: Yok Đôn, Mù Cang Chải, szlak Tà Năng–Phan Dũng w Đà Lạt, Mỹ Sơn w Hội An i drobne uwagi z etapu 4; dalej z noindex

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 4: `git push` tylko za wyraźnym „tak” użytkownika.** Zapytaj w rozmowie, co pójdzie na GitHuba (commity od ostatniego push: research, plan, zadania 1–6, poprawki, `docs/`). Po zgodzie:

```bash
git push
```

- [ ] **Krok 5: Strona na żywo** (po 1–2 minutach na build GitHub Pages)

```bash
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -c 'yokdon\|Yok Đôn'
curl -s -o /dev/null -w '%{http_code}\n' https://grzegorzfrskiba-hub.github.io/wietnam/img/yokdon_0.jpg
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -c 'name="robots" content="noindex"'
```

Oczekiwane: liczba większa od 0; `200`; `1`. Jeśli strona jeszcze stara, odczekaj i powtórz.

---

### Zadanie 10: Notatki: status, następny krok i raport tras

**Pliki:**
- Zmień: `notes/etapy.md`, `notes/wizja.md`, `CLAUDE.md`
- Dodaj: raport tras z zadania 7, krok 5 (ścieżka w `$TMPDIR/raport-b1.txt`)

- [ ] **Krok 1: Zmiany w notatkach.** Skrypt sprawdzono na kopiach plików po commicie tego planu; dał 18 zmian. Bierze dzisiejszą datę, wynik punktu kontrolnego z `$TMPDIR/przeglad-b1.txt` (zadanie 7, krok 9), wynik końcowego przeglądu z `$TMPDIR/recenzja-b1.txt` (zadanie 8) i ścieżkę raportu tras z `$TMPDIR/raport-b1.txt`. Zmienia:
  - `notes/etapy.md`:
    - tabela etapów i partia B w sekcji etapu 3: plan B1 zrobiony, z linkiem do raportu tras; plan B2 do zaplanowania;
    - „Następny krok” to plan B2: co zrobił plan B1, wynik punktu kontrolnego, wynik końcowego przeglądu i plan B2 (najpierw krótka sesja decyzji); akapit sesji decyzji partii B przechodzi pod „Z sesji decyzji partii B (14.10.2026)”;
    - lista „Do etapu 3 (partia B i kolejne)”: najszersza kwota po planie B1, trudne dni w Đà Lạt i Yok Đôn, paleta pełna, liczby z `tools/liczby.sh`, długie dni z lotem 11,0%, bez punktu o `spreadPins`, nowy punkt o `DAY_NOTES` i `FLIGHT_DAYS`;
    - lista „Po publikacji, z partią B”: bez uwag, które zrobiło zadanie 2;
  - `notes/wizja.md`: „Ekstremalnie” ze szlakiem Tà Năng i nocą w lesie Yok Đôn; „Sprawdzone w researchu” z Yok Đôn i odłożonym Pù Mát;
  - `CLAUDE.md`: status, czas pełnego testu (ok. 2,5 min) i `tools/liczby.sh` w „Jak sprawdzać”.

  Jeśli punkt kontrolny albo przegląd zmienił liczby (długie dni z lotem, najszersza kwota), popraw po skrypcie te zdania w `notes/etapy.md` ręcznie.

Uruchom z katalogu repo:

```bash
python3 -I - <<'NOTESEOF'
# notes after plan B1 of stage 3, batch B, from the repo's folder; each change asserts its old text once. The date is
# today's; the checkpoint's result comes from $TMPDIR/przeglad-b1.txt (task 7, step 9), the final review's from
# $TMPDIR/recenzja-b1.txt (task 8) and the route report is the file named in $TMPDIR/raport-b1.txt (task 7, step 5).
import datetime, os
t = datetime.date.today()
D = '%d.%02d.%d' % (t.day, t.month, t.year)
TMP = os.environ['TMPDIR']
def read(name, what):
    s = open(os.path.join(TMP, name), encoding='utf-8').read().strip()
    assert s, what
    return s
REVIEW = read('przeglad-b1.txt', 'the checkpoint first: task 7, step 9')
FINAL = read('recenzja-b1.txt', 'the final review first: task 8')
R = read('raport-b1.txt', 'the route report first: task 7, step 5')
assert R.startswith('notes/raport-tras-') and os.path.exists(R), 'the route report first: task 7, step 5'
R = os.path.basename(R)
e = open('notes/etapy.md', encoding='utf-8').read()
w = open('notes/wizja.md', encoding='utf-8').read()
c = open('CLAUDE.md', encoding='utf-8').read()
n = 0
def rep(s, a, b):
    global n
    assert s.count(a) == 1, a[:70]
    n += 1
    return s.replace(a, b)
PLAN = 'plans/2026-10-14-etap-3b1-miejsca.md'
# the table of stages and batch B in the section of stage 3
e = rep(e, 'plan B1 (Yok Đôn, Mù Cang Chải, Tà Năng w Đà Lạt, Mỹ Sơn w Hội An) zaplanowany 14.10.2026: [' + PLAN + '](' + PLAN + '), do wykonania; plan B2 (długi ogon researchu, kurs NBP i ceny) po nim |',
  'plan B1 (Yok Đôn, Mù Cang Chải, Tà Năng w Đà Lạt, Mỹ Sơn w Hội An) zrobiony @DZIEN@: [' + PLAN + '](' + PLAN + '), raport tras: [notes/' + R + '](' + R + '); plan B2 (długi ogon researchu, kurs NBP i ceny) do zaplanowania |')
e = rep(e, '  - plan B1 ([' + PLAN + '](' + PLAN + '), do wykonania):', '  - plan B1 ([' + PLAN + '](' + PLAN + '), zrobiony @DZIEN@):')
# the next step: plan B2; the paragraph of the session moves under its own heading
i = e.index('## Następny krok: plan B1 partii B\n\n')
j = e.index('\n\n### Z etapu 4\n')
old = e[i:j].replace('## Następny krok: plan B1 partii B\n\n', '')
assert old.startswith('Sesja decyzji partii B (14.10.2026):') and '\n' not in old, old[:80]
n += 1
e = e[:i] + '''## Następny krok: plan B2 partii B

Zrobione @DZIEN@: plan B1 partii B ([''' + PLAN + '''](''' + PLAN + ''')). Na stronie są dwa nowe miejsca i dwa nowe dni: Yok Đôn (park suchego lasu na 1–2 noce, pieszo za słoniami bez jazdy z przewodnikiem parku, na „Ekstremalnie” noc w lesie przy Thác Phật, wyłączona w V–X) z lotniskiem Buôn Ma Thuột, w którego karcie przejazdu stoi, że lot z Đà Nẵng jest tylko we wtorki, czwartki i soboty; Mù Cang Chải za Sa Pa (tarasy Hmông na 2–3 noce u gospodarzy, sezon z wyjątkiem XI–III, bo tarasy stoją po żniwach, paralotnia nad Khau Phạ jako opcja); szlak Tà Năng–Phan Dũng jako trudna wersja dni 2 i 3 w Đà Lạt (od 3 nocy, z biurem i przewodnikiem, wyłączony w V–X); Mỹ Sơn jako dzień 3 w Hội An (Hội An na 1–3 noce). Do tego drobne uwagi z przeglądu etapu 4 (krótkie zdanie bez JavaScriptu na stronie, zdanie o mapie bez druku, `tools/publish.sh` z wyjściem testów) i `tools/liczby.sh` na liczby ze wszystkich tras.

Punkt kontrolny planu B1 (@DZIEN@): DECYZJE-Z-PRZEGLADU

Końcowy przegląd planu B1 (@DZIEN@, świeży recenzent): WYNIK-RECENZJI

**Plan B2:** najpierw krótka sesja decyzji: jak głęboko sprawdzamy ok. 100 otwartych punktów researchu (godziny, bilety do ok. 5 EUR, współrzędne, ceny przewodników i noclegów, dni zamknięć) i które ceny odświeżamy razem z kursem NBP; potem plan z suchą próbą. Po partii B etap 5, angielski.

### Z sesji decyzji partii B (14.10.2026)

''' + old + e[j:]
# the list for stage 3 and later batches
e = rep(e, '(najwyższa po planie 2: 7 900–16 200 zł, 30 dni z Đà Nẵng w obie strony, góry i morze, „Ekstremalnie”, styczeń, z Hang Én i Fansipanem)',
  '(najwyższa po planie B1: 8 600–17 200 zł, 30 dni z Đà Nẵng w obie strony, góry i morze, „Ekstremalnie”, kwiecień)')
e = rep(e, '(dziś trudny dzień mają Cát Tiên, Pù Luông, Phong Nha, Cúc Phương i Sa Pa)', '(dziś trudny dzień mają Cát Tiên, Pù Luông, Phong Nha, Cúc Phương, Sa Pa, Đà Lạt ze szlakiem Tà Năng–Phan Dũng i Yok Đôn)')
e = rep(e, 'Paleta ma 20 kolorów, a zajętych jest 18 (wolne zostały 18 i 20), więc przed partią B paletę trzeba rozszerzyć. Pù Mát (partia B) leży poza kadrami: trzeba przesunąć kadr i wygenerować kontury od nowa (`geo/make_basemap.py`);',
  'Paleta ma 20 kolorów i po planie B1 wszystkie są zajęte (Yok Đôn 18, Mù Cang Chải 20), więc przed kolejnym miejscem (Bạch Mã, Pù Mát) paletę trzeba rozszerzyć. Pù Mát leży poza kadrami: trzeba przesunąć kadr północy do 18,6° N (z lotniskiem Vinh) i wygenerować kontury od nowa (`geo/make_basemap.py`);')
e = rep(e, 'skryptem z punktu kontrolnego planu 2 (`notes/plans/2026-10-13-etap-3a2-miejsca.md`, zadanie 7, krok 5);',
  'skryptem `bash tools/liczby.sh` (liczby przed partią: z kopią źródeł z `git archive`);')
e = rep(e, '- dni z lotem 8–10 h od drzwi do drzwi stoją na 12,2% tras (przed planem 2: 3,6%), prawie wszystkie do albo z Sa Pa i Hà Giang (najczęściej Sa Pa → ✈ Hội An, 8,65 h),',
  '- dni z lotem 8–10 h od drzwi do drzwi stoją na 11,0% tras (przed planem B1: 12,2%, przed planem 2 partii A: 3,6%), prawie wszystkie do albo z Sa Pa, Hà Giang i Mù Cang Chải (najczęściej Sa Pa → ✈ Hội An),')
e = rep(e, ' Skrypt liczb z punktu kontrolnego planu 2 liczy długie dni tylko przy przylotach do Sa Pa i Hà Giang, więc przy następnym użyciu przenieść go do `tools/` i liczyć w nim też wyloty;',
  ' Liczy je `bash tools/liczby.sh`, w obie strony;')
e = rep(e, '- `spreadPins` ma w testach tylko pary znaczników: przed partią B, która doda miejsca na północy, dopisać w `tests/page.test.js` skupisko trzech znaczników;\n',
  '- dzień w cudzym module (Mỹ Sơn w Hội An, Tà Năng–Phan Dũng w Đà Lạt) ma research we własnym pliku, a test danych czyta jego tabele z listy `DAY_NOTES` w `tests/data.test.js`; lot, który nie lata codziennie, dostaje wpis w `FLIGHT_DAYS` (`content.js`), a karta przejazdu mówi, w które dni lata;\n')
# after publishing: what plan B1 did goes; the rest is for plan B2 and later
e = rep(e, '**Po publikacji, z partią B:**', '**Po publikacji, z partią B (plan B2 i później):**')
e = rep(e, '- wydruk: ostatnia strona bywa prawie pusta (sama stopka), a zdanie „Mapa jest w skali, a na dużym ekranie zostaje w widoku przy przewijaniu” drukuje się, choć mówi o ekranie;',
  '- wydruk: ostatnia strona bywa prawie pusta (sama stopka);')
e = rep(e, '''  - zdanie w `<noscript>` na stronie publicznej mówi też o podglądzie pliku na iPhonie; na stronę wystarczy krótsze zdanie, a pełne do pliku offline;
  - `tools/publish.sh` chowa wyjście testów (`> /dev/null`), więc przy błędzie widać tylko część komunikatu;
  - `.claude/` w `.gitignore`, bo punkt kontrolny tworzy na chwilę `.claude/launch.json`;
  - `research/wjazd-2026-10.md`, „Co powiedzieć na stronie”, pkt 16: strona nie ma linijki źródeł, którą opisuje; doprecyzować w researchu.
''', '')
# the vision
w = rep(w, 'Stan na 14.10.2026: Tú Làn jest na stronie tylko w jeden dzień, a Tà Năng–Phan Dũng czeka na partię B.',
  'Stan na @DZIEN@: Tú Làn jest na stronie tylko w jeden dzień; szlak Tà Năng–Phan Dũng to od planu B1 partii B trudna wersja dni 2 i 3 w Đà Lạt, a noc w lesie Yok Đôn trudna wersja dnia 2 (obie wyłączone w V–X).')
w = rep(w, '; Pù Mát w partii B;', '; noc w lesie Yok Đôn ([research/yokdon-2026-10.md](../research/yokdon-2026-10.md)); Pù Mát odłożony (14.10.2026: noc w lesie niepotwierdzona na 2026);')
# CLAUDE.md: the status, the full test's time and the numbers tool
i = c.index('**Status ('); j = c.index('\n', i)
assert 'Następny krok: plan B1 partii B' in c[i:j], c[i:j]
n += 1
c = c[:i] + '**Status (@DZIEN@):** etap 3, partia B: plan B1 zrobiony i opublikowany pod https://grzegorzfrskiba-hub.github.io/wietnam/ (Yok Đôn, Mù Cang Chải, szlak Tà Năng–Phan Dũng w Đà Lạt, Mỹ Sơn w Hội An), dalej z `noindex`. Następny krok: plan B2 partii B (najpierw krótka sesja decyzji), potem etap angielski, zob. [notes/etapy.md](notes/etapy.md).' + c[j:]
c = rep(c, '`bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 100 s).', '`bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 2,5 min).')
c = rep(c, '- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.',
  '- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.\n- `bash tools/liczby.sh [katalog źródeł]`: liczby ze wszystkich 134 784 tras do punktu kontrolnego (udział miejsc, noce, długie dni z lotem, zygzaki); ze starą kopią źródeł z `git archive` daje liczby „przed”.')
e = e.replace('@DZIEN@', D).replace('DECYZJE-Z-PRZEGLADU', REVIEW).replace('WYNIK-RECENZJI', FINAL)
w = w.replace('@DZIEN@', D)
c = c.replace('@DZIEN@', D)
open('notes/etapy.md', 'w', encoding='utf-8').write(e)
open('notes/wizja.md', 'w', encoding='utf-8').write(w)
open('CLAUDE.md', 'w', encoding='utf-8').write(c)
print(n, 'changes')
NOTESEOF
```

Oczekiwane: `18 changes`. Jeśli skrypt stanie na `assert`, któryś tekst w notatkach zmienił się od commita tego planu: przeczytaj komunikat, popraw skrypt pod nowy tekst i opisz to w wyniku zadania.

- [ ] **Krok 2: Sprawdź**

```bash
git status --short
grep -n "@DZIEN@\|DECYZJE-Z-PRZEGLADU\|WYNIK-RECENZJI" notes/etapy.md notes/wizja.md CLAUDE.md
grep -c $'\xc2\xa0' notes/etapy.md notes/wizja.md CLAUDE.md
```

Oczekiwane:
- zmienione są tylko `notes/etapy.md`, `notes/wizja.md` i `CLAUDE.md`, a nowy jest raport tras;
- drugi grep nic nie wypisuje;
- trzeci wypisuje `0` przy każdym pliku.

Przeczytaj `git diff` i sprawdź, czy akapity punktu kontrolnego i przeglądu nie mają imion, numerów ani linków z terminami znajomych, a drobne uwagi recenzenta trafiły na listy.

- [ ] **Krok 3: Commit i push**

```bash
git add notes/etapy.md notes/wizja.md CLAUDE.md "$(cat "$TMPDIR/raport-b1.txt")"
git commit -F - <<'EOF'
Notatki: plan B1 partii B zrobiony (Yok Đôn, Mù Cang Chải, szlak Tà Năng–Phan Dũng w Đà Lạt, Mỹ Sơn w Hội An), punkt kontrolny, końcowy przegląd i raport tras; następny krok: plan B2 (długi ogon researchu, kurs NBP i ceny), potem etap angielski

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

`git push` tylko za zgodą użytkownika. Na koniec zapytaj o usunięcie gałęzi `sucha-proba-b1` (`git branch -D`, bo jej commity mają inne SHA niż `main`, choć pliki są te same).

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` po każdym zadaniu; `bash tests/run.sh --full` w punkcie kontrolnym (ok. 2,5 min).
- `python3 site2/build.py`, potem `bash "$TMPDIR/sondy-b1.sh" MIESIAC` → `sondy (…): 0 z 19 nie przeszło`.
- `grep -rnI $'\xc2\xa0' site2/src tests tools research | grep -v "var NB"` → nic.
- `bash tools/liczby.sh [katalog źródeł]` → liczby ze wszystkich tras; przed planem z kopią z `git archive`.
- `bash tools/links.sh` → 66 z 67 z kodem 200 (Sapa O'Chau 406); `bash tools/licenses.sh` → 97 zdjęć, 0 problemów.
- `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]` → A4, 0 zakrytych linii.
- Po każdym commicie zadania 1–6: `git diff sucha-proba-b1~<6−N> -- site2 tests tools research .gitignore` (albo commit suchej próby z „Kontekstu dla wykonawcy”) nic nie wypisuje.
