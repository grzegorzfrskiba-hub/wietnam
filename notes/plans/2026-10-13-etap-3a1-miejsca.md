# Etap 3, partia A, plan 1: Phong Nha, Cúc Phương i Đà Nẵng — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** pierwsze nowe miejsca etapu 3 i fundament pod kolejne. Na końcu punkt kontrolny planu 1.
- **Trzy nowe miejsca.** Każde ma treść na trzech poziomach, sezon, klimat, drogi, ceny, rezerwacje, kolor na mapie i pięć zdjęć:
  - Phong Nha (2–4 noce), z lotniskiem Đồng Hới: łodzią do jaskini Phong Nha, 7 km w Paradise Cave, Tú Làn na jeden dzień, a na „Ekstremalnie” wyprawa do Hang Én na dwa dni;
  - Cúc Phương (1–2 noce): ośrodki ratowania naczelnych, żółwi i łuskowców, nocna przejażdżka, stary las, a na „Ekstremalnie” Mây Bạc z przewodnikiem parku;
  - Đà Nẵng z Sơn Trà (1–2 noce): duki czerwononogie wypatrywane z dróg półwyspu, plaża Mỹ Khê, Marmurowe Góry; przełącznik „Z kierowcą / Samodzielnie” na przełęczy Hải Vân działa też na drodze Đà Nẵng–Huế.
- **Fundament:**
  - trudna wersja na dwa dni (`hard.next`);
  - zamiany po liście dróg (`SWAPS.roads`);
  - reguła silnika dla miejsc blisko miasta lotniska (`NEAR_H`);
  - testy, które dotąd nie miały czego łapać.
- **Porządki z listy „Do etapu 3”:** pasek u góry na telefonie, zdania w „Zarezerwuj wcześniej”, `textWidth`, jedna krótka nazwa miejsca, dwie drogi krótsze przez Hà Nội.

**Architektura:**
- **Dane miejsca w tych samych plikach co dotąd:**
  - `places.js`, `seasons.js`, `climate.js`, `travel.js`;
  - `content.js` (lotniska, teksty dróg, zamiany);
  - `costs.js`, `before.js`, `photos.js`, `ui.js`;
  - treść w `site2/src/content/<id>.js`.

  Research każdego nowego miejsca stoi we własnym pliku `research/<id>-2026-10.md`. Test danych czyta z niego sezon i tabele „Zestawienie” (ceny, wycieczki, rezerwacje, drogi, loty).
- **Czyste funkcje w `page.js`:**
  - `stopDays` z trudną wersją na dwa dni;
  - `swapRoads`;
  - `whyOff` z powodem `closed_part`;
  - `bookList` z pozycjami zarezerwowanymi pod jednym kluczem;
  - `placeLabels` z etykietą skróconą do nazwy;
  - `textWidth` z wielkimi literami z diakrytykami.
- **Silnik tras (`engine.js`), reguła `NEAR_H`:** miejsce najwyżej godzinę drogi od miasta lotniska, które otwiera albo zamyka trasę, stoi tuż przy nim.
- **Mapa:** kadr środka zaczyna się od 18,4° N, a kadr północy sięga do 19,3° N. Kontury liczy od nowa `geo/make_basemap.py` z danych Natural Earth, które leżą poza repo i pobiera się je po zgodzie.
- **Testy strony (`tests/page.test.js`) zostają na 14 dawnych pozycjach.** Wzorcowe trasy tych testów się więc nie zmieniają. Nowe testy etapu 3 liczą na pełnych danych i nie przypinają całych tras.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, kontury mapy, zrzuty); Chrome bez okna (sondy, zrzuty, wydruk); curl (linki).

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): „Moduł: co ma każde miejsce”, pkt 5 („Poziom przygody: trzy, plus motocykl”), „Treść, bezpieczeństwo, licencje”;
- [notes/etapy.md](../etapy.md): „Etap 3” i „Następny krok: etap 3, partia A” z listą „Do etapu 3”;
- decyzje z sesji 13.10.2026, niżej w sekcji „Decyzje z sesji 13.10.2026”;
- research z 13.10.2026 (commit 6862495):
  - miejsca: [Phong Nha](../../research/phongnha-2026-10.md), [Cúc Phương](../../research/cucphuong-2026-10.md), [Đà Nẵng](../../research/danang-2026-10.md);
  - uzupełnienia z 13.10.2026 w [trudne-dni](../../research/trudne-dni-2026-10.md), [lotniska](../../research/lotniska-2026-10.md) i [polaczenia](../../research/polaczenia-2026-10.md);
  - research Hà Giang i Sa Pa z tego samego commitu jest dla planu 2.

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS z bloków `:root` (pilnuje tego test `css colours`);
  - `engine.js` i `page.js` bez DOM; dane wchodzą do `page.js` przez argumenty;
  - komentarze w kodzie po angielsku, teksty dla czytelnika po polsku w `ui.js` i `content/`.
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, nigdy sam znak.
  - Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, w `var NB = '…';`.
  - Po każdym zadaniu `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie zwraca.
  - Narzędzie do zapisu plików bywa, że samo zamienia napis `\u00a0` na znak; ten grep to wyłapie.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - wielowyrazowe nazwy bez wietnamskich liter (Paradise Cave) w `KEEP_TOGETHER`;
  - liczebniki przez `countWord`; cudzysłów „…”, półpauza w zakresach, godziny 24-godzinne, spacja przed °C.
- **Ceny i fakty:**
  - każda liczba w `costs.js`, `before.js`, `seasons.js`, `climate.js` i `travel.js` stoi w tabeli researchu, a test danych to sprawdza;
  - dla nowych miejsc tą tabelą jest „Zestawienie” we własnym pliku miejsca;
  - nową albo zmienioną liczbę najpierw wpisz do researchu, ze źródłem i datą.
- **Bezpieczeństwo w treści:** zdania o zakazach i zamknięciach (las i drogi Sơn Trà, noce w lesie Cúc Phương, wymagania Oxalis) tylko z plików researchu miejsc.
- **Linki:** tylko z researchu (pliki miejsc i `research/rezerwacje-2026-10.md`): oficjalne strony i sprawdzeni operatorzy, bez parametrów śledzących i partnerskich.
- **Zdjęcia:**
  - tylko 15 plików, które już leżą w `photos/` głównej kopii repo: `phongnha_0`–`4`, `cucphuong_0`–`4`, `danang_0`–`4`;
  - pobrane 13.10.2026 za zgodą użytkownika, na licencjach CC BY, CC BY-SA, CC0 i w domenie publicznej;
  - autor i licencja stoją w `photos.js`;
  - nowych zdjęć nie pobieraj bez zgody.
- **Dane Natural Earth** (zadania 6 i 7) pobierasz tylko po zgodzie użytkownika, do katalogu tymczasowego, nie do repo.
- **Testy:**
  - `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu;
  - pełny przebieg (`--full`) trwa po tym planie ok. 70 s (przed planem ok. 45 s).
- **Sieć:** `tools/links.sh` pyta adresy przez curl i niczego nie zapisuje. Każde pobieranie plików tylko po zgodzie użytkownika, z nazwą, źródłem i rozmiarem.
- **Repo będzie publiczne:** bez danych osobowych i bez numerów lotów.
- **Commity:**
  - po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
  - commity po zadaniach są częścią planu;
  - `git push` i publikacja artifactu tylko za zgodą użytkownika.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których strona najłatwiej zawiedzie użytkownika, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Etykiety mapy w ciasnych miejscach.**
   - Ryzyko: Ninh Bình, Cúc Phương i Hà Nội stoją blisko siebie w kadrze północy, a Phong Nha przy górnej krawędzi kadru środka. Etykiety nachodzą wtedy na siebie albo wychodzą poza kadr. W suchej próbie tak było najpierw na 1689 trasach (Phong Nha pod tytułem kadru), potem na 71 (Cúc Phương).
   - Oczekiwane: żadna etykieta nie zakrywa innej, znacznika ani krawędzi kadru; pobyt w ciasnym miejscu pokazuje samą nazwę, a dni zostają przy znaczniku.
   - Sprawdzenie: test kombinacji (etykiety każdej trasy) i sonda `map.js` przy 1400 px (zadania 6 i 7).
2. **Hội An i Đà Nẵng rozdzielone lotem.**
   - Ryzyko: przylot do Đà Nẵng, Hội An na pierwszą noc, a Đà Nẵng dopiero na końcu trasy, po locie z północy. W suchej próbie, zanim przyszła reguła `NEAR_H`, tak wyglądało 44 550 tras.
   - Oczekiwane: miejsce najwyżej godzinę drogi od miasta lotniska stoi tuż przy nim.
   - Sprawdzenie: test silnika na danych zastępczych `NB` i test kombinacji „bliskie miejsca obok siebie” (zadanie 8).
3. **Wyprawa na dwa dni na końcu pobytu.**
   - Ryzyko: Hang Én zaczyna się ostatniego dnia pobytu, a następnego dnia trasa jedzie dalej, choć turysta jest jeszcze w jaskini.
   - Oczekiwane: oba dni wyprawy albo zwykłe dni; drugi dzień zawsze w tym samym pobycie; decyduje miesiąc dnia startu.
   - Sprawdzenie: testy `stopDays` na danych zastępczych `FTWO` i test kombinacji (zadanie 1), treść Phong Nha (zadanie 6).
4. **Budżet po zamianie na krótkiej pętli.**
   - Ryzyko: na krótkiej pętli motocykl oszczędza mniej niż zaokrąglenie do 100 zł, więc kwota w złotych się nie zmienia. Sonda, która porównywała tekst kwoty, przestała wtedy przechodzić: w suchej próbie po dodaniu Phong Nha pętla Cao Bằng na trasie sondy skróciła się z 3 do 2 nocy.
   - Oczekiwane: budżet w euro się zmienia, a liczba w „W skrócie” i w „Przed wyjazdem” mówi to samo.
   - Sprawdzenie: sonda `before.js` (zadanie 6).
5. **Zamknięte drogi i lasy w parkach.**
   - Ryzyko: tekst obiecuje coś, czego dziś nie wolno:
     - drogi na Sơn Trà są zamknięte od 8.10.2026 „do odwołania”;
     - Cúc Phương od 16.09.2026 wstrzymał noclegi w lesie;
     - od 1.09.2026 nocujący nie wchodzą w głąb lasu między 19:00 a 7:00.
   - Oczekiwane:
     - tekst mówi, że przy ulewach zarząd zamyka drogi na Sơn Trà, i każe sprawdzić komunikat;
     - biwak w dżungli tylko jako wzmianka;
     - nocna przejażdżka jedzie skrajem lasu.
   - Sprawdzenie: przegląd treści w punkcie kontrolnym (zadanie 9) i audyt przed publikacją (etap 4).

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik (ścieżki od katalogu repo).
- **Python:** 3.9, z Pillow i PyMuPDF. Nie ma opcji `-P`. Skrypt, który nie potrzebuje Pillow (`geo/make_basemap.py`, skrypt notatek), uruchamiaj z `-I`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`):
  - pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, IntersectionObserver woła tylko raz, na starcie, a przejścia CSS stoją;
  - słowo `MIESIAC` w ustawieniach sondy, zrzutu i wydruku to miesiąc za pięć miesięcy od dziś;
  - sondy przeszły w suchej próbie dla miesięcy 2027-03, 2027-04 i 2027-05.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - w nowym worktree podlinkuj `photos/` z głównej kopii przed buildem i dopisz `/photos` do `$(git rev-parse --git-path info/exclude)`, żeby link nie trafił do commita;
  - commity dodają pliki po nazwie (`git add <pliki>`), nie `git add -A`;
  - w nazwach kontroli sond nie używaj prostego cudzysłowu `"`: `probe.sh` ucina na nim linię, więc piszemy „…”;
  - w zsh `$c:site2/...` to modyfikator zmiennej, więc pisz `"${c}:site2/..."`.
- **Zdjęcia nowych miejsc** leżą już w `photos/` głównej kopii (15 plików z 13.10.2026; `photos/` nie jest w gicie). Build bierze je stamtąd.
- **Dane Natural Earth** (zadania 6 i 7):
  - dwa pliki z https://github.com/nvkelso/natural-earth-vector (domena publiczna): `ne_10m_admin_0_countries.geojson` (13 287 234 B) i `ne_10m_rivers_lake_centerlines.geojson` (7 307 743 B);
  - w suchej próbie miały sumy SHA-256 `239eec57ac17f100a11e2536cffc56752c318b50ae765b0918ff7aab4ce8f255` i `bb854a900ecbd3b408df46d5e16e3e0f974ba55993f9d8b5c26e855273c0905a`;
  - z nimi `geo/make_basemap.py` daje `site2/src/basemap.js` o sumie `8636883609b65666e278c5949314833d3ac9da0f4db0861a343fb8357200c00e` po zadaniu 6 (25 510 B) i `404d6e3350014aca758dc0a0d332a09aaa13ed71183f7c76b8d4fb11640bc8f1` po zadaniu 7 (26 030 B);
  - inna suma przy innych plikach (nowsze wydanie Natural Earth) nie jest błędem: rozstrzygają testy, sonda `map.js` i zrzut mapy;
  - zgodę na pobranie warto uzyskać na początku pracy, żeby zadanie 6 nie czekało.
- **Sucha próba (13.10.2026):**
  - kod zadań 1–8 złożono w osobnym worktree, commit po commicie;
  - kroki tego planu wygenerowano z tych commitów i odtworzono na świeżym worktree z `6862495`, zadanie po zadaniu. Po krokach testów każde zadanie dawało błąd z kroku 2, a po kodzie `ALL PASS`. Pliki po każdym zadaniu są identyczne z suchą próbą, razem z konturami mapy z `make_basemap.py`;
  - po zadaniu 8 przeszły: `bash tests/run.sh --full` (`combos: 134784 months and 10368 dates (all)`, `ALL PASS`, 69 s), build, 14 sond z zadania 9, także dla miesięcy 2027-04 i 2027-05, `tools/links.sh` (46 adresów, wszystkie 200) i wydruk trzech tras z zadania 9, jasny i ciemny (0 zakrytych linii);
  - sondy przeszły też po zadaniach 1–7;
  - skrypt notatek z zadania 10 uruchomiono na kopiach plików (9 zmian);
  - nie sprawdzono na sucho: ręcznego sprawdzenia w przeglądarce, telefonu i przeglądu z użytkownikiem (zadanie 9).

## Decyzje z sesji 13.10.2026

Pytania do użytkownika i odpowiedzi:
1. **Podział partii A:** dwa plany. Research pięciu miejsc od razu. Plan 1 to Phong Nha, Cúc Phương, Đà Nẵng i fundament. Plan 2 to Hà Giang i Sa Pa, w osobnej sesji, na kodzie planu 1.
2. **Cúc Phương:** osobne miejsce; Vân Long zostaje w Ninh Bình.
3. **Phong Nha na „Ekstremalnie”:**
   - Hang Én, 2 dni: trudna wersja dwóch dni pobytu, od 3 nocy w Phong Nha;
   - dłuższe wyprawy jednym zdaniem z linkiem;
   - „Aktywnie”: Tú Làn na jeden dzień albo Paradise 7 km;
   - „Spokojnie”: łódź do jaskini Phong Nha i kładka w Paradise.
4. **Đà Nẵng z Sơn Trà:** osobne miejsce na 1–2 noce; przełącznik Hải Vân także na drodze Đà Nẵng–Huế.
5. **Pętla Hà Giang (plan 2):** 3 albo 4 dni, zależnie od długości pobytu.

Lista 25 ustaleń, zatwierdzona w całości (tu w skrócie, w grupach):
- **Podział, research, zdjęcia (1–4):**
  - research pięciu miejsc w tej sesji, plan 2 po wykonaniu planu 1, etap 4 po planie 2;
  - jeden plik researchu na miejsce, w stałym układzie, z tabelami, które czytają testy danych;
  - research robią równolegle agenci, a przy okazji sprawdzają trudny dzień w Cát Bà i drogę Thọ Xuân–Pù Luông;
  - zdjęcia z Wikimedia Commons bez NC i ND, pobierane za zgodą, 4–5 na miejsce, wybierane z arkusza.
- **Silnik i dane (5–12):**
  - trudna wersja na dwa dni (obie albo żadna, pierwszy dzień nie jest ostatnim dniem pobytu);
  - wszystkie nowe miejsca od poziomu 1; sezon wypraw to miesiące wyłączone trudnej wersji; X tylko przy urzędowym zamknięciu głównej atrakcji;
  - oś: Phong Nha między Huế a Pù Luông, Đà Nẵng między Hội An a Huế, Cúc Phương między Pù Luông a Ninh Bình; miastem lotniska Đà Nẵng zostaje Hội An;
  - lotnisko Đồng Hới;
  - przełącznik Hải Vân na obu drogach przez przełęcz;
  - dane z planu 2B dla każdego miejsca;
  - kolory 14–16;
  - dwie drogi, które silnik omijał przez Hà Nội, równe objazdowi.
- **Testy i treść (13–19):**
  - włączone testy, które dotąd nie miały czego łapać;
  - test kombinacji liczy rezerwacje, pakowanie i wjazd;
  - kontrola tekstu trudnego dnia nie przyjmuje „bez przewodnika”;
  - treść Phong Nha, Cúc Phương i Đà Nẵng według pytań 2–4, ze zdaniami z komunikatów zarządów;
  - poprawki z listy „Do etapu 3”;
  - punkt kontrolny planu 1, z przeglądem zygzaków tras, dni z dwoma lotami, Cát Bà na 4 noce i trzech pobytów w Hà Nội.
- **Plan 2, zarys (20–22):**
  - Hà Giang 4–5 nocy, z przełącznikiem „Samodzielnie”;
  - Sa Pa z Fansipanem pieszo na dwa dni;
  - odnogi północy jako pętla Sa Pa → Hà Giang → Cao Bằng → Ba Bể.
- **Zakres (23–25):**
  - długość wyjazdu 5–30 dni;
  - nocne pociągi i autobusy tylko jako wzmianka;
  - plan z suchą próbą i commit po każdym zadaniu, wykonanie w świeżej sesji; research i plan commitowane po akceptacji; `git push` i publikacja tylko za zgodą.

Zmiany z researchu planu 1 (zatwierdzone 13.10.2026):
1. **Phong Nha, sezon `DSDDDSDDZZZS`:** wrzesień Z, luty i grudzień S, czerwiec S (upał).
2. **Hang Én:**
   - Oxalis, 327 EUR od osoby, wiek 16–70 lat;
   - drugiego dnia powrót ok. 18:00, więc noc po wyprawie jest w Phong Nha;
   - decyduje miesiąc startu (wyłączone IX–XI);
   - rezerwacja ok. 2 miesiące wcześniej.
3. **Dni Phong Nha według poziomu:**
   - „Aktywnie”: 7 km w Paradise Cave, a przy 4 nocach Tú Làn na jeden dzień;
   - „Spokojnie”: łódź do jaskini Phong Nha, kładka w Paradise Cave, ogród botaniczny, potok Nước Moọc.
4. **Nowy kod pakowania „strój kąpielowy”** w dniach z pływaniem.
5. **Sơn Đoòng** tylko jako wzmianka.
6. **Lotnisko Đồng Hới:** loty z Hà Nội (1,1 h) i Hồ Chí Minh City (1,6 h); drogi do Huế 3,5 h, Đà Nẵng 5,75 h, Ninh Bình 6,5 h; bez drogi Hà Nội–Phong Nha.
7. **Cúc Phương, sezon `SSSDSSSSSDDS`.**
8. **Dni Cúc Phương:** ośrodki ratowania i nocna przejażdżka o 19:00, potem 20 km w głąb lasu od 7:00.
9. **Mây Bạc na „Ekstremalnie”:** obowiązkowy przewodnik parku, tylko dorośli, 6–8 h, wyłączony w V–IX.
10. **Biwak w dżungli** tylko jako wzmianka.
11. **Nocleg w pokojach parku i nocna przejażdżka** jako jedna linia „Zarezerwuj wcześniej”.
12. **Đà Nẵng, sezon `SSDDDSSDSZZS`.**
13. **Đà Nẵng bez trudnego dnia.**
14. **Sơn Trà:** zamknięcia dróg przy ulewach i komunikat zarządu; GreenViet poza planem.
15. **Hải Vân z Đà Nẵng:** 2,75 h, auto 43–98 EUR, motocykl 25–32 EUR.
16. **Cát Bà dalej bez trudnego dnia.**
17. **Thọ Xuân–Pù Luông zostaje 2,5 h.**

Doprecyzowania z suchej próby, do zatwierdzenia razem z planem:
- **Wyższe kadry mapy.** Ustalenie 11 zakładało dzisiejsze kadry, ale:
  - Phong Nha wypadała pod tytułem kadru środka, więc kadr środka zaczyna się od 18,4° N (było 17,95° N);
  - Cúc Phương dociskała etykiety do dolnej krawędzi kadru północy, więc kadr północy sięga do 19,3° N (było 19,6° N).

  Kontury liczy od nowa `geo/make_basemap.py`, a ramka tytułu kadru jest liczona z tekstu.
- **Etykieta pobytu w ciasnym miejscu:** sama nazwa, a dni zostają przy znaczniku (`oneLine` w `placeLabels`). Bez tego 71 tras miało kolizję etykiet przy Cúc Phương i Ninh Bình.
- **Strzałka do innego kadru:** droga ma „→ X”, lot „✈ X”. Phong Nha ma drogi do kadru północy.
- **Najdłuższy dzień w liczbach trasy:** jednostka mniejsza. „8½ godz.” wystawało z kafelka od 641 px.
- **Reguła silnika `NEAR_H` (1 h):**
  - miejsce blisko miasta lotniska, które otwiera trasę, idzie tuż po nim, a blisko miasta, które ją zamyka, tuż przed nim;
  - test kombinacji pilnuje szerzej: każde dwa miejsca na trasie najwyżej godzinę drogi od siebie stoją obok siebie;
  - bez tej reguły 44 550 tras rozdzielało Hội An i Đà Nẵng lotem.
- **Testy strony zostają na 14 dawnych pozycjach** (`OLD_IDS`, `DATA_T`, `OLD_PLACES`): każde nowe miejsce zmieniałoby ich wzorcowe trasy. Nowe testy etapu 3 liczą na pełnych danych (`DATA_ALL`) i nie przypinają całych tras.
- **Nazwa grupy przełącznika** ma dzień karty (`swap-<id>-<dzień>`), a nie numer odcinka (ustalenie 9). Dzień jest jednoznaczny i nie zmienia się, gdy trasa przelicza inne karty.
- **Hải Vân z Đà Nẵng** ma własne pozycje cen i rezerwacji (`haivan.car_dn`, `haivan.moto_dn`), bo auto i motocykl wynajmuje się tam pod inną trasę.
- **Sonda `before.js`** porównuje budżet przed zamianą i po niej w euro. Na trasie sondy pętla Cao Bằng ma po dodaniu Phong Nha 2 noce, a motocykl oszczędza na niej mniej niż zaokrąglenie do 100 zł.
- **Najszersza kwota** ma dalej postać „d ddd–dd ddd zł”, jak „5 800–13 500 zł” w 2B. Najwyższa po planie to 7 500–14 700 zł (30 dni z Đà Nẵng do Hồ Chí Minh City, przyroda, „Ekstremalnie”, grudzień, z Hang Én). Cyfry kroju mają jedną szerokość, więc kafelek mieści każdą kwotę tej postaci; komentarze w kodzie mówią o postaci, nie o liczbie.
- **`KEEP_TOGETHER`:** Paradise Cave i Hang Va. Phong Nha wiąże strona sama, jako krótką nazwę miejsca.

## Jak działa strona po planie 1

1. **Ustawienia i trasa** działają jak dotąd: `apply` → `normSettings` → `planRoute` → `stopDays` → `tripBudget` → render → adres. Silnik ma jedną regułę więcej (`NEAR_H`), a dane trzy miejsca i lotnisko więcej.
2. **Dni pobytu:** trudna wersja może zająć dwa dni (Hang Én). Pierwszy dzień ma plakietkę „Trudny dzień” i nocleg w jaskini, a drugi kończy wyprawę.
3. **Karty przejazdu:** drogi z lotnisk do Cúc Phương mają własne teksty. Droga Đà Nẵng–Huế ma przełącznik „Z kierowcą / Samodzielnie” i tekst przełęczy Hải Vân.
4. **„Nie ma na twojej trasie”:** miejsce zamknięte w części terminu dostaje powód „zamknięte w części tego terminu”.
5. **„Przed wyjazdem”:** rezerwacje nowych miejsc (Hang Én najpierw, ok. 2 miesiące wcześniej), linie mówią o tej trasie, a w pakowaniu jest strój kąpielowy.
6. **Mapa:** wyższe kadry środka i północy, strzałki dróg i lotów do innych kadrów, etykieta w ciasnym miejscu z samą nazwą.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/content/phongnha.js`, `cucphuong.js`, `danang.js` | (nowe) treść miejsc: dni na trzech poziomach, deszcz, perełka, wydarzenia |
| `site2/src/places.js` | (zmiana) trzy miejsca; bez pola `name` (krótka nazwa tylko w treści) |
| `site2/src/seasons.js`, `climate.js` | (zmiana) sezony i klimat nowych miejsc |
| `site2/src/travel.js` | (zmiana) drogi i loty nowych miejsc, dwie drogi krótsze przez Hà Nội |
| `site2/src/content.js` | (zmiana) opis `hard.next`, `SWAPS.roads`, lotnisko Đồng Hới, teksty dróg z lotnisk, `PACK_CODES`, `KEEP_TOGETHER` |
| `site2/src/costs.js`, `before.js` | (zmiana) ceny i rezerwacje nowych miejsc, `HOMESTAY_NOTES` |
| `site2/src/photos.js`, `ui.js` | (zmiana) zdjęcia i teksty nowych miejsc, powód `closed_part`, zdania „Zarezerwuj wcześniej” |
| `site2/src/page.js` | (zmiana) `stopDays` z `hard.next`, `swapRoads`, `whyOff`, `bookList`, `textWidth`, `placeLabels` z `oneLine`, ramka tytułu kadru, strzałki do innych kadrów |
| `site2/src/engine.js` | (zmiana) `NEAR_H` |
| `site2/src/app.js`, `template.html` | (zmiana) grupa przełącznika z dniem karty, pasek u góry na telefonie, etykieta z jedną linią, jednostka najdłuższego dnia |
| `site2/src/panels.js`, `basemap.js` | (zmiana) wyższe kadry środka i północy, kontury z `make_basemap.py` |
| `tests/*.test.js` | (zmiana) testy nowych mechanizmów i danych; testy strony na 14 dawnych pozycjach |
| `tests/probes/before.js`, `settings.js`, `map.js` | (zmiana) grupy przełącznika, pasek na telefonie, budżet w euro, etykieta z jedną linią |
| `tools/report.js`, `tools/report.sh` | (zmiana) krótkie nazwy z treści miejsc |
| `notes/etapy.md`, `CLAUDE.md`, `notes/raport-tras-RRRR-MM-DD.md` | (zmiana, nowy) status, następny krok (plan 2), raport tras po planie 1 |

**Kolejność:**
- zadania idą po kolei; każde zakłada pliki po poprzednim, bo kroki zamieniają dokładny tekst;
- zadania 1–5 nie dotykają danych miejsc i mogłyby iść w innej kolejności, ale kroki zadań 6–8 zakładają je wszystkie;
- zadanie 8 potrzebuje `SWAPS.roads` z zadania 2.

---

### Zadanie 1: Trudna wersja na dwa dni (`hard.next`)

Wyprawa do Hang Én (zadanie 6), a w planie 2 Fansipan pieszo, zajmuje dwa dni: pierwszy kończy się nocą poza miejscem, drugi to powrót (ustalenie 5). Trudna wersja dnia dostaje pole `next`, czyli drugi dzień wyprawy:
- obie albo żadna: wersja wchodzi tylko wtedy, gdy pobyt ma następny dzień;
- o tym, czy wyprawa działa, decyduje miesiąc pierwszego dnia, bo wyprawę rezerwuje się na dzień startu;
- drugi dzień zajmuje następny dzień pobytu, cokolwiek tam stało;
- pierwszy dzień nigdy nie jest ostatnim dniem pobytu, także przed krótką drogą; drugi może nim być, bo powrót jest po południu.

**Pliki:**
- Zmień: `site2/src/page.js` (`plainDay`, `stopDays`), `site2/src/content.js` (opis pól dnia)
- Testy: `tests/page.test.js` (dane zastępcze `FTWO`), `tests/content.test.js`, `tests/combos.test.js`

**Interfejsy:**
- Daje:
  - w treści dnia `hard.next = { pace, t, d, early? }`; dzień z `next` ma `hard.late: true` (noc poza miejscem);
  - `plainDay(x, variant)`: plan bez wersji; `variant` (`'hard'`) dostaje drugi dzień wyprawy;
  - `stopDays(c, stop, done, level, months, next, self)` bez zmiany sygnatury; drugi dzień ma `variant: 'hard'`, własne `cost`, `pack` i `early`, a `rain: null`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/combos.test.js` zamień:

```js
      if (days && s.level === 1) need(days.every(function (d) { return d.pace !== 'hike'; }), x.id + ': a hike at level 1');
```

na:

```js
      if (days && s.level === 1) need(days.every(function (d) { return d.pace !== 'hike'; }), x.id + ': a hike at level 1');
      // a hard version over two days: the next day is its second day, and it never ends the stay
      if (days) days.forEach(function (d, k) {
        var first = d.variant === 'hard' && CONTENT[x.id].days.filter(function (cd) { return cd.hard && cd.hard.next && cd.hard.t === d.t; })[0];
        if (first) need(k < days.length - 1 && days[k + 1].t === first.hard.next.t, x.id + ': ' + d.t + ' without its second day');
      });
```

W `tests/content.test.js` zamień:

```js
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off', 'late']);
        need(/przewodnik|operator/i.test(d.hard.d), w + ' hard: say who leads (przewodnik or operator)');
        if (d.hard.late != null) need(typeof d.hard.late === 'boolean', w + ' hard: late is true or false');
```

na:

```js
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off', 'late', 'next']);
        need(/przewodnik|operator/i.test(d.hard.d), w + ' hard: say who leads (przewodnik or operator)');
        if (d.hard.late != null) need(typeof d.hard.late === 'boolean', w + ' hard: late is true or false');
        if (d.hard.next != null) {
          plan(w + ' hard next', d.hard.next, ['pace', 't', 'd', 'early']);
          need(d.hard.late === true, w + ' hard: a version over two days spends its night away (late: true)');
        }
```

W `tests/page.test.js` zamień:

```js
  [null, 'hard', 'hard', 'easy'], 'variantOf: a late hard version is left out only when asked');
```

na:

```js
  [null, 'hard', 'hard', 'easy'], 'variantOf: a late hard version is left out only when asked');
/* A hard version over two days (hard.next): its night is away (late), and the next day of the stay is the trip's second day.
   Both or neither: without a next day in the stay, or with the first day in a month off, the usual days. */
var FTWO = {
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'T1', d: 't1' },
    { p: 2, o: 2, pace: 'nature', t: 'T2', d: 't2', rain: 'rt', easy: { pace: 'nature', t: 'T2e', d: 't2e' },
      hard: { pace: 'hike', t: 'H1', d: 'h1', late: true, off: [10, 11], cost: ['x.trip'], next: { pace: 'hike', t: 'H2', d: 'h2', early: true } } },
    { p: 3, o: 3, pace: 'boat', t: 'T3', d: 't3', cost: ['x.boat'] },
    { p: 4, o: 4, pace: 'rest', t: 'T4', d: 't4' }
  ]
};
function vt(days) { return days.map(function (d) { return d.day + ':' + d.t + (d.variant ? '/' + d.variant : ''); }); }
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, JAN)), ['1:T1', '2:H1/hard', '3:H2/hard'], 'two days at level 3: the day and the next one of the stay');
eq(vt(stopDays(FTWO, { n: 4, start: 1 }, 0, 3, JAN)), ['1:T1', '2:H1/hard', '3:H2/hard', '4:T4'], 'four nights: the plan after the two days stays');
eq(vt(stopDays(FTWO, { n: 2, start: 1 }, 0, 3, JAN)), ['1:T1', '2:T2'], 'two nights: no next day in the stay, so the usual day');
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, [8, 8, 9])), ['1:T1', '2:H1/hard', '3:H2/hard'], 'the first day decides: two days from 30 September run into October');
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, [9, 9, 9])), ['1:T1', '2:T2', '3:T3'], 'the first day in a month off: neither');
eq(vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 3, JAN, HOME)), ['1:T1', '2:H1/hard', '3:H2/hard'],
  'before the way home: the second day, back in the afternoon, may be the last day of the stay');
eq([vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 2, JAN)), vt(stopDays(FTWO, { n: 3, start: 1 }, 0, 1, JAN))],
  [['1:T1', '2:T2', '3:T3'], ['1:T1', '2:T2e/easy', '3:T3']], 'levels 2 and 1: the usual and the easy days');
var TWO = stopDays(FTWO, { n: 3, start: 1 }, 0, 3, JAN);
eq([TWO[1].cost, TWO[2].cost, TWO[2].pack, TWO[2].early, TWO[2].rain, TWO[1].rain], [['x.trip'], [], [], true, null, 'rt'],
  'the second day: its own cost (none), pack and early start, no rain plan; the first keeps the day\'s rain plan');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: two days at level 3: the day and the next one of the stay: got ["1:T1","2:H1/hard","3:T3"], want ["1:T1","2:H1/hard","3:H2/hard"]
```

- [ ] **Krok 3: Kod.**

W `site2/src/content.js` zamień:

```js
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off?, late? }; off: the months 1–12 it is not offered;
```

na:

```js
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off?, late?, next? }; off: the months 1–12 it is not offered;
     next: the trip's second day, { pace, t, d, early? }, for a hard version over two days (late, its night away): it takes
     the next day of the stay, whatever plan stood there, and only when the stay has that day; the month of the first day
     decides whether it runs (off), as a trip is booked by the day it starts;
```

W `site2/src/page.js` zamień:

```js
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay
function plainDay(x) { return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: null, cost: (x.cost || []).slice(), pack: (x.pack || []).slice() }; }
```

na:

```js
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay, the second day of a two-day
// hard version (variant 'hard')
function plainDay(x, variant) {
  return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: variant || null, cost: (x.cost || []).slice(), pack: (x.pack || []).slice() };
}
```

W `site2/src/page.js` zamień:

```js
   self: the place's swap is set to „Samodzielnie”, so the days with a self version take it (selfSwaps). */
```

na:

```js
   self: the place's swap is set to „Samodzielnie”, so the days with a self version take it (selfSwaps).
   A hard version with next spans two days: its night is away (late) and the next day of the stay becomes next, the trip's
   second day, whatever plan stood there. Both or neither: it is taken only when the stay has a next day, and the month of
   its first day decides, as a trip is booked by the day it starts. */
```

W `site2/src/page.js` zamień:

```js
  picked.sort(function (a, b) { return a.o - b.o; }).forEach(function (d) {
    out.push(stop.n === 1 && d.solo ? plainDay(d.solo) : variantOf(d, level, months[stop.start - 1 + out.length] + 1, notLate && out.length === stop.n - 1, self));
```

na:

```js
  var second = null;   // the second day of a two-day hard version taken the day before
  picked.sort(function (a, b) { return a.o - b.o; }).forEach(function (d) {
    var k = stop.start - 1 + out.length, last = out.length === stop.n - 1, two = d.hard && d.hard.next;
    if (second) { out.push(second); second = null; return; }
    if (stop.n === 1 && d.solo) { out.push(plainDay(d.solo)); return; }
    // a late hard version stays off the last day before a long leg, and a two-day one off the last day of any stay
    var away = last && (notLate || !!two);
    var v = variantOf(d, level, months[k] + 1, away, self);
    if (two && v.variant === 'hard') second = plainDay(d.hard.next, 'hard');
    out.push(v);
```

- [ ] **Krok 4: Testy i build**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje. Sond nie trzeba: to zadanie nie zmienia tego, co strona pokazuje (w suchej próbie wszystkie przeszły także po nim).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/content.js site2/src/page.js tests/combos.test.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Silnik stron: trudna wersja na dwa dni (hard.next): noc poza miejscem i drugi dzień wyprawy, obie albo żadna

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Zamiany po liście dróg (`SWAPS.roads`)

Przełęcz Hải Vân będzie leżeć na dwóch drogach: z Hội An i z Đà Nẵng do Huế (zadanie 8, ustalenie 9). Dlatego:
- zamiana drogi dostaje listę dróg zamiast jednej: `roads: { para: { text, cost } }`;
- czysta funkcja `swapRoads` zbiera te drogi dla budżetu, rezerwacji i kart przejazdu;
- grupa przełącznika w karcie ma w nazwie dzień karty (`swap-<id>-<dzień>`), więc zamiana spotkana na trasie dwa razy (tam i z powrotem przez przełęcz) daje dwie osobne grupy;
- sonda `before.js` sprawdza, że każdy przełącznik w karcie to osobna grupa.

**Pliki:**
- Zmień: `site2/src/content.js` (`SWAPS`), `site2/src/page.js` (`selfSwaps`, `swapRoads`, `tripBudget`, `bookList`), `site2/src/app.js` (karta przejazdu, `swapBlock`, `bindSwaps`), `tests/probes/before.js`
- Testy: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje:
  - `SWAPS[id].roads`: `{ 'a-b': { text, cost: { driver, self } } }`; para miejsc w kolejności alfabetycznej, `text` to klucz UI drogi jechanej samodzielnie, `cost` to pozycje `COSTS.items`;
  - `swapRoads(swaps)` → `{ 'a-b': { swap: id, cost: { driver, self } } }`;
  - `selfSwaps(moto, swaps).roads['a-b']` → `{ text, cost }`, jak dotąd;
  - w `app.js`: `swapBlock(id, day)`, a w nim grupa `swap-<id>-<day>`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
  // the swaps: a place with self versions of its days, or a road of ROAD_KEYS with a self text and a cost for each way
  Object.keys(SWAPS).forEach(function (k) {
    var w = SWAPS[k];
    if (w.place) need(CONTENT[w.place] && CONTENT[w.place].days.some(function (d) { return d.self; }), 'SWAPS.' + k + ': ' + w.place + ' has days with a self version');
    if (w.road) need(ROAD_KEYS[w.road] && UI.pl[w.text] && COSTS.items[w.cost.driver] && COSTS.items[w.cost.self], 'SWAPS.' + k + ': a road of ROAD_KEYS, its self text and the cost of each way');
    need(!!w.place !== !!w.road, 'SWAPS.' + k + ': a place or a road');
```

na:

```js
  // the swaps: a place with self versions of its days, or roads of ROAD_KEYS, each with a self text and a cost for each way;
  // a road belongs to one swap only
  var swapOfRoad = {};
  Object.keys(SWAPS).forEach(function (k) {
    var w = SWAPS[k];
    if (w.place) need(CONTENT[w.place] && CONTENT[w.place].days.some(function (d) { return d.self; }), 'SWAPS.' + k + ': ' + w.place + ' has days with a self version');
    Object.keys(w.roads || {}).forEach(function (pair) {
      var r = w.roads[pair];
      need(ROAD_KEYS[pair] && UI.pl[r.text] && COSTS.items[r.cost.driver] && COSTS.items[r.cost.self], 'SWAPS.' + k + ': ' + pair + ' is a road of ROAD_KEYS with its self text and the cost of each way');
      need(!swapOfRoad[pair], 'SWAPS.' + k + ': ' + pair + ' is a road of ' + swapOfRoad[pair] + ' too');
      swapOfRoad[pair] = k;
    });
    need(!!w.place !== !!(w.roads && Object.keys(w.roads).length), 'SWAPS.' + k + ': a place or roads');
```

W `tests/content.test.js` zamień:

```js
  Object.keys(SWAPS).forEach(function (k) { if (SWAPS[k].cost) { paid[SWAPS[k].cost.driver] = true; paid[SWAPS[k].cost.self] = true; } });
```

na:

```js
  Object.keys(SWAPS).forEach(function (k) {
    Object.keys(SWAPS[k].roads || {}).forEach(function (pair) { var c = SWAPS[k].roads[pair].cost; paid[c.driver] = true; paid[c.self] = true; });
  });
```

W `tests/content.test.js` zamień:

```js
  Object.keys(SWAPS).forEach(function (k) { if (SWAPS[k].text) wants(SWAPS[k].text, 'SWAPS'); });
```

na:

```js
  Object.keys(SWAPS).forEach(function (k) { Object.keys(SWAPS[k].roads || {}).forEach(function (pair) { wants(SWAPS[k].roads[pair].text, 'SWAPS'); }); });
```

W `tests/page.test.js` zamień:

```js
var BUD = { costs: COSTS_T, places: { a: {}, b: {} }, swaps: { w: { road: 'a-b', text: 'r.t', cost: { driver: 'r.car', self: 'r.moto' } } }, shortFlightH: 1.5 };
```

na:

```js
var BUD = { costs: COSTS_T, places: { a: {}, b: {} }, swaps: { w: { roads: { 'a-b': { text: 'r.t', cost: { driver: 'r.car', self: 'r.moto' } } } } }, shortFlightH: 1.5 };
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: travel: a seat in a van to a car of one's own by the hour, the road of the swap by its item, a long flight: got {"two":[49,116],"one":[49,152]}, want {"two":[58,117],"one":[73,154]}
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
     the legal condition under them and, when ridden yourself, what it takes, the risk and the advice. */
  function swapBlock(id) {
    var self = state.settings.moto.indexOf(id) > -1;
    return '<div class="swap" data-swap="' + id + '"><p class="swap-h">' + T('sw.' + id) + '</p>' +
      '<div class="seg swap-seg" role="radiogroup" aria-label="' + esc(T('sw.' + id)) + '">' + ['driver', 'self'].map(function (v) {
        return '<label><input type="radio" name="swap-' + id + '" value="' + v + '"' + ((v === 'self') === self ? ' checked' : '') + '><span>' + T('sw.' + v) + '</span></label>';
```

na:

```js
     the legal condition under them and, when ridden yourself, what it takes, the risk and the advice. day: the card's day,
     in the name of the radio group, so a swap met twice on a trip (there and back over a pass) makes two groups. */
  function swapBlock(id, day) {
    var self = state.settings.moto.indexOf(id) > -1;
    return '<div class="swap" data-swap="' + id + '"><p class="swap-h">' + T('sw.' + id) + '</p>' +
      '<div class="seg swap-seg" role="radiogroup" aria-label="' + esc(T('sw.' + id)) + '">' + ['driver', 'self'].map(function (v) {
        return '<label><input type="radio" name="swap-' + id + '-' + day + '" value="' + v + '"' + ((v === 'self') === self ? ' checked' : '') + '><span>' + T('sw.' + v) + '</span></label>';
```

W `site2/src/app.js` zamień:

```js
    return Object.keys(SWAPS).filter(function (k) {
      return SWAPS[k].road && L.segs.some(function (g) { return g.mode === 'road' && [g.from, g.to].sort().join('-') === SWAPS[k].road; });
    })[0];
```

na:

```js
    var roads = swapRoads(SWAPS), g = L.segs.filter(function (g) { return g.mode === 'road' && roads[[g.from, g.to].sort().join('-')]; })[0];
    return g ? roads[[g.from, g.to].sort().join('-')].swap : undefined;
```

W `site2/src/app.js` zamień:

```js
      (sw ? swapBlock(sw) : '') + '</div>';
```

na:

```js
      (sw ? swapBlock(sw, day) : '') + '</div>';
```

W `site2/src/app.js` zamień:

```js
        (again ? '' : gallery(s.id)) + (sw ? swapBlock(sw) : '') + '<ol class="days">' + state.plans[i].map(function (d) {
```

na:

```js
        (again ? '' : gallery(s.id)) + (sw ? swapBlock(sw, s.start) : '') + '<ol class="days">' + state.plans[i].map(function (d) {
```

W `site2/src/app.js` zamień:

```js
      var id = name.slice(5);
```

na:

```js
      var id = e.target.closest('.swap').getAttribute('data-swap');
```

W `site2/src/content.js` zamień:

```js
   Cao Bằng and on the road over the Hải Vân pass. A link lists the swaps set to „Samodzielnie” (motocykl=caobang,haivan);
   the trip does not change. place: the place whose days take their self versions (the days of the loop); road: a road of
   ROAD_KEYS, with text, its UI key when ridden yourself, and cost, the item of COSTS (costs.js) for each way: driver (with
   a driver, the usual) and self. */
var SWAPS = {
  caobang: { place: 'caobang' },
  haivan: { road: 'hoian-hue', text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } }
```

na:

```js
   Cao Bằng and on the roads over the Hải Vân pass. A link lists the swaps set to „Samodzielnie” (motocykl=caobang,haivan);
   the trip does not change. place: the place whose days take their self versions (the days of the loop); roads: the roads
   of ROAD_KEYS the swap rides, by their two places in alphabetical order, each with text, its UI key when ridden yourself,
   and cost, the item of COSTS (costs.js) for each way: driver (with a driver, the usual) and self. */
var SWAPS = {
  caobang: { place: 'caobang' },
  haivan: { roads: { 'hoian-hue': { text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } } } }
```

W `site2/src/page.js` zamień:

```js
    if (w && w.road) out.roads[w.road] = { text: w.text, cost: w.cost.self };
```

na:

```js
    if (w && w.roads) Object.keys(w.roads).forEach(function (pair) { out.roads[pair] = { text: w.roads[pair].text, cost: w.roads[pair].cost.self }; });
  });
  return out;
}
/* The roads of all swaps, by their two places in alphabetical order: { swap: its id, cost: { driver, self } }. */
function swapRoads(swaps) {
  var out = {};
  Object.keys(swaps).forEach(function (id) {
    Object.keys(swaps[id].roads || {}).forEach(function (pair) { out[pair] = { swap: id, cost: swaps[id].roads[pair].cost }; });
```

W `site2/src/page.js` zamień:

```js
  var roadOf = {};   // the roads of the swaps: their cost each way
  Object.keys(data.swaps).forEach(function (id) { if (data.swaps[id].road) roadOf[data.swaps[id].road] = data.swaps[id].cost; });
```

na:

```js
  var roadOf = swapRoads(data.swaps);   // the roads of the swaps: their cost each way
```

W `site2/src/page.js` zamień:

```js
        var k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].driver;
```

na:

```js
        var k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].cost.driver;
```

W `site2/src/page.js` zamień:

```js
  var C = data.costs, self = selfSwaps(moto, data.swaps), out = {}, order = [], roadOf = {};
  Object.keys(data.swaps).forEach(function (id) { if (data.swaps[id].road) roadOf[data.swaps[id].road] = data.swaps[id].cost; });
```

na:

```js
  var C = data.costs, self = selfSwaps(moto, data.swaps), out = {}, order = [], roadOf = swapRoads(data.swaps);
```

W `site2/src/page.js` zamień:

```js
        k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].driver;
```

na:

```js
        k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].cost.driver;
```

- [ ] **Krok 4: Sonda.**

W `tests/probes/before.js` zamień:

```js
  var before = ids(), money = fig.querySelector('b').textContent, self = document.querySelector('input[name="swap-caobang"][value="self"]');
```

na:

```js
  var before = ids(), money = fig.querySelector('b').textContent, self = document.querySelector('.swap[data-swap="caobang"] input[value="self"]');
```

W `tests/probes/before.js` zamień:

```js
    check('the focus stays on the choice', document.activeElement && document.activeElement.name === 'swap-caobang' && document.activeElement.value === 'self');
    check('„Przed wyjazdem” books the motorbike', /Motocykl na pętlę Cao Bằng/.test(textOf('#b-book')));
    document.querySelector('input[name="swap-caobang"][value="driver"]').click();
```

na:

```js
    check('the focus stays on the choice', document.activeElement && /^swap-caobang-\d+$/.test(document.activeElement.name) && document.activeElement.value === 'self',
      document.activeElement && document.activeElement.name);
    check('„Przed wyjazdem” books the motorbike', /Motocykl na pętlę Cao Bằng/.test(textOf('#b-book')));
    document.querySelector('.swap[data-swap="caobang"] input[value="driver"]').click();
```

W `tests/probes/before.js` zamień:

```js
      var road = document.querySelector('input[name="swap-haivan"][value="self"]');
```

na:

```js
      var road = document.querySelector('.swap[data-swap="haivan"] input[value="self"]');
      // each card's swap is a radio group of its own: the day of the card is in its name
      var names = Array.prototype.map.call(document.querySelectorAll('.swap'), function (b) { return b.querySelector('input').name; });
      check('each swap in a card is a radio group of its own', names.every(function (n, i) { return /^swap-[a-z]+-\d+$/.test(n) && names.indexOf(n) === i; }), names.join(', '));
```

W `tests/probes/before.js` zamień:

```js
        var leg = document.querySelector('input[name="swap-haivan"]').closest('.leg');
```

na:

```js
        var leg = document.querySelector('.swap[data-swap="haivan"]').closest('.leg');
```

W `tests/probes/before.js` zamień:

```js
                  var sw = document.querySelector('input[name="swap-haivan"][value="self"]');
```

na:

```js
                  var sw = document.querySelector('.swap[data-swap="haivan"] input[value="self"]');
```

W `tests/probes/before.js` zamień:

```js
                    var on = document.querySelector('input[name="swap-haivan"]:checked'), said = textOf('#settings-msg');
```

na:

```js
                    var on = document.querySelector('.swap[data-swap="haivan"] input:checked'), said = textOf('#settings-msg');
```

- [ ] **Krok 5: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; każda sonda kończy się `done, all checks ok` i kodem 0.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/app.js site2/src/content.js site2/src/page.js tests/content.test.js tests/page.test.js tests/probes/before.js
git commit -F - <<'EOF'
Zamiany: zamiana jedzie po liście dróg (SWAPS.roads, swapRoads), a grupa przełącznika w karcie ma w nazwie dzień karty (sonda before.js)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Testy, które dotąd nie miały czego łapać

Nowe miejsca przynoszą to, czego testy dotąd nie miały na czym sprawdzić (ustalenia 13 i 14):
- test kombinacji liczy sezon każdej nocy od nowa, z `SEASONS` i miesięcy trasy;
- przechodzi tryb dat: od 25. dnia każdego miesiąca 2027, na 10 i 20 dni;
- sprawdza rezerwacje, pakowanie i wjazd każdej trasy;
- wymaga, żeby każde miejsce trafiło na jakąś trasę;
- test danych pilnuje, że każdy kod lotniska w drogach i lotach jest w `AIRPORTS`;
- `whyOff` dostaje powód „zamknięte w części tego terminu” (`closed_part`): miejsce zamknięte (X) w części terminu, którego trasa nie zmieściła, nie dostaje już powodu „za daleko”.

Pełny przebieg (`--full`) trwa po tym zadaniu ok. 15 s dłużej.

**Pliki:**
- Zmień: `site2/src/page.js` (`whyOff`), `site2/src/ui.js`
- Testy: `tests/combos.test.js`, `tests/data.test.js`, `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje: powód `'closed_part'` w wynikach `whyOff` i tekst `off.r.closed_part`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/combos.test.js` zamień:

```js
  var BUDGET_DATA = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
```

na:

```js
  var BUDGET_DATA = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
  var BOOK_DATA = { costs: COSTS, book: BOOK, swaps: SWAPS, places: PLACES, airports: AIRPORTS, airKeys: AIR_KEYS, homestays: HOMESTAYS, shortFlightH: SHORT_FLIGHT_H };
  var PACK_DATA = { climate: CLIMATE, seasons: SEASONS, content: CONTENT, places: PLACES, swaps: SWAPS };
```

W `tests/combos.test.js` zamień:

```js
    var name = s.from + '→' + s.to + ' ' + s.days + 'd m' + s.month + ' L' + s.level + ' ' + (s.interests.join('+') || '-') + (extra || '');
```

na:

```js
    var name = s.from + '→' + s.to + ' ' + (s.start ? s.start + '…' + s.end : s.days + 'd m' + s.month) + ' L' + s.level + ' ' + (s.interests.join('+') || '-') + (extra || '');
```

W `tests/combos.test.js` zamień:

```js
      need(x.season.length === x.n && x.season.indexOf('X') < 0, x.id + ' season ' + x.season);
```

na:

```js
      // the season of each night, read again from SEASONS and the months of the trip: never closed (X)
      var letters = '';
      for (var j = 0; j < x.n; j++) letters += SEASONS[x.id].charAt(st.months[x.start - 1 + j]);
      need(letters === x.season && letters.indexOf('X') < 0, x.id + ' season ' + x.season + ', from SEASONS ' + letters);
```

W `tests/combos.test.js` zamień:

```js
    need(nights === s.days - 1, nights + ' nights, want ' + (s.days - 1));
    need(r.days === s.days, 'days ' + r.days);
```

na:

```js
    need(nights === st.days - 1, nights + ' nights, want ' + (st.days - 1));
    need(r.days === st.days, 'days ' + r.days);
    // before the trip (page.js): what to book (keys of BOOK, the most urgent first), what to pack, entry and health
    var books = bookList(r, plans, [], BOOK_DATA), packs = packList(r, plans, st, [], PACK_DATA), notes = entryNotes(st, false, ENTRY);
    need(books.every(function (b, i) { return BOOK[b.key] && b.ahead > 0 && (!i || books[i - 1].ahead >= b.ahead); }), 'bookList: ' + books.map(function (b) { return b.key; }).join(', '));
    need(packs.length > 0 && packs.every(function (p) { return typeof p.code === 'string' && Array.isArray(p.places); }), 'packList');
    need(notes.length > 0 && notes[0].code === 'visa', 'entryNotes');
```

W `tests/combos.test.js` zamień:

```js
  print('combos: ' + count + (all ? ' (all)' : ' (every 7th; tests/run.sh --full checks all)'));
```

na:

```js
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
```

W `tests/content.test.js` zamień:

```js
    'off.r.': ['removed', 'level', 'closed', 'season', 'profile', 'far', 'beaten'],
```

na:

```js
    'off.r.': ['removed', 'level', 'closed', 'closed_part', 'season', 'profile', 'far', 'beaten'],
```

W `tests/data.test.js` zamień:

```js
  Object.keys(PLACES).forEach(function (id) { need(G.h[node(id)], id + ': no road or flight reaches it'); });
```

na:

```js
  Object.keys(PLACES).forEach(function (id) { need(G.h[node(id)], id + ': no road or flight reaches it'); });
  // every airport code is a known airport (AIRPORTS in content.js), so a typo makes no airport of its own
  ROADS.concat(FLIGHTS).forEach(function (r) {
    [r[0], r[1]].forEach(function (e) { if (/^[A-Z]{3}$/.test(e)) need(AIRPORTS[e], (r.length && FLIGHTS.indexOf(r) > -1 ? 'flight ' : 'road ') + r.join(' ') + ': ' + e + ' is no airport of AIRPORTS'); });
  });
  Object.keys(HUBS).forEach(function (code) { need(AIRPORTS[code], 'HUBS: ' + code + ' is no airport of AIRPORTS'); });
```

W `tests/page.test.js` zamień:

```js
  .filter(function (x) { return x.id === 'catba'; })[0].reasons.indexOf('level'), -1, 'at the level it needs, the level is no reason');
```

na:

```js
  .filter(function (x) { return x.id === 'catba'; })[0].reasons.indexOf('level'), -1, 'at the level it needs, the level is no reason');
// closed (X) in part of the term and not fitted around it: closed in part of the term, not too far (made up: Cao Bằng closed
// in April, on a trip from 28 March that cannot reach it in March)
var S4 = JSON.parse(JSON.stringify(SEASONS));
S4.caobang = 'SSSXSSSSDDDS';
var D4 = { places: PLACES, seasons: S4, graph: DATA_T.graph, hubs: HUBS }, M4 = { from: 'SGN', to: 'HAN', start: '2027-03-28', end: '2027-04-11', interests: [], level: 2, add: [], remove: [] };
var st4 = normSettings(M4, PLACES, HUBS), o4 = byId(whyOff(planRoute(st4, D4), M4, st4, D4, CLIMATE)), o4s = byId(whyOff(planRoute(st4, DATA_T), M4, st4, DATA_T, CLIMATE));
eq([o4.caobang.reasons, o4.caobang.canAdd, o4s.caobang.reasons, o4s.caobang.canAdd], [['closed_part'], false, ['beaten'], true],
  'closed in part of the term and not fitted around it: said so, no Dodaj; open all the term, the same trip could take it');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: closed in part of the term and not fitted around it: said so, no Dodaj; open all the term, the same trip could take it: got [["far"],false,["beaten"],true], want [["closed_part"],false,["beaten"],true]
```

- [ ] **Krok 3: Kod.**

W `site2/src/page.js` zamień:

```js
      if (!r || !r.ok || r.missing.indexOf(id) > -1) { x.reasons.push('far'); x.canAdd = false; }
```

na:

```js
      // not fitted: closed in part of the term, or too far for these days
      var part = months.some(function (m) { return code.charAt(m - 1) === 'X'; });
      if (!r || !r.ok || r.missing.indexOf(id) > -1) { x.reasons.push(part ? 'closed_part' : 'far'); x.canAdd = false; }
```

W `site2/src/ui.js` zamień:

```js
  'off.r.removed': 'usunięte przez ciebie', 'off.r.level': 'tylko na poziomie „{lvl}”', 'off.r.closed': 'zamknięte w tym terminie',
```

na:

```js
  'off.r.removed': 'usunięte przez ciebie', 'off.r.level': 'tylko na poziomie „{lvl}”', 'off.r.closed': 'zamknięte w tym terminie', 'off.r.closed_part': 'zamknięte w części tego terminu',
```

- [ ] **Krok 4: Testy i build**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje. Sond nie trzeba: to zadanie nie zmienia tego, co strona pokazuje (w suchej próbie wszystkie przeszły także po nim).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/page.js site2/src/ui.js tests/combos.test.js tests/content.test.js tests/data.test.js tests/page.test.js
git commit -F - <<'EOF'
Testy: sezon każdej nocy liczony od nowa, tryb dat w teście kombinacji, znane lotniska, każde miejsce na jakiejś trasie, rezerwacje, pakowanie i wjazd każdej trasy; powód „zamknięte w części tego terminu”

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Porządki z listy „Do etapu 3”

Punkty listy „Do etapu 3” w `notes/etapy.md`, które nie czekają na nowe miejsca (ustalenia 14 i 18):
- **pasek u góry na telefonie** (do 640 px): bez odnośnika „Ustawienia” i z odstępem 14 px, więc „Przed wyjazdem” mieści się od 320 px; wygaszanie końca paska zostaje tylko na tablecie (641–900 px);
- **„Zarezerwuj wcześniej” mówi o tej trasie:**
  - lista miejsc stoi po dwukropku, nie w nawiasie, więc nazwy lotnisk z nawiasem nie dają nawiasów w nawiasach;
  - dopisek o Pù Luông pojawia się tylko wtedy, gdy Pù Luông jest na trasie (`HOMESTAY_NOTES`);
  - droga z lotniska jechana dwa razy ma dopisek „w obie strony”;
  - linia parku Cát Tiên wymienia to, co jest na tej trasie;
- **„Ten termin obejmuje długie weekendy: …”** przy kilku świętach;
- **`textWidth`** liczy wielkie litery z diakrytykami (Ố, Ứ) jak wielkie;
- **jedna krótka nazwa miejsca:** `CONTENT[id].short`; `PLACES` traci `name`, a raport tras czyta treść miejsc;
- **kontrola tekstu trudnego dnia** nie przyjmuje „bez przewodnika”.

**Pliki:**
- Zmień: `site2/src/app.js`, `site2/src/before.js` (`HOMESTAY_NOTES`), `site2/src/page.js` (`bookList`, `textWidth`), `site2/src/places.js` (bez `name`), `site2/src/template.html`, `site2/src/ui.js`, `tests/probes/settings.js`, `tools/report.js`, `tools/report.sh`
- Testy: `tests/page.test.js`, `tests/data.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje:
  - w wynikach `bookList` pole `items` (klucze `COSTS.items` zarezerwowane pod tym kluczem), a w linii dróg z lotnisk lista `[kod, miejsce, kursy]`;
  - `HOMESTAY_NOTES = ['puluong']` w `before.js` i tekst `b.homestay.puluong`;
  - `PLACES[id]` bez `name`: krótka nazwa tylko w `CONTENT[id].short`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
        need(/przewodnik|operator/i.test(d.hard.d), w + ' hard: say who leads (przewodnik or operator)');
```

na:

```js
        need(/przewodnik|operator/i.test(d.hard.d) && !/bez (przewodnik|operator)/i.test(d.hard.d), w + ' hard: say who leads (przewodnik or operator, not „bez przewodnika”)');
```

W `tests/content.test.js` zamień:

```js
    'b.': Object.keys(BOOK).filter(function (k) { return BOOK[k].ahead > 0; }),
```

na:

```js
    'b.': Object.keys(BOOK).filter(function (k) { return BOOK[k].ahead > 0; }), 'b.homestay.': HOMESTAY_NOTES,
```

W `tests/data.test.js` zamień:

```js
    var p = PLACES[id];
    need(typeof p.name === 'string' && p.name.trim(), id + ': name');
```

na:

```js
    var p = PLACES[id];
```

W `tests/page.test.js` zamień:

```js
  [['cattien.bausau_night', 'flights', 'catba.cruise', 'transfer', 'dalat.bidoup', 'dalat.langbiang', 'airport', 'saigon.cangio', 'cattien.park'], [['HAN', 'ninhbinh'], ['HAN', 'catba']], null],
```

na:

```js
  [['cattien.bausau_night', 'flights', 'catba.cruise', 'transfer', 'dalat.bidoup', 'dalat.langbiang', 'airport', 'saigon.cangio', 'cattien.park'], [['HAN', 'ninhbinh', 1], ['HAN', 'catba', 1]], null],
```

W `tests/page.test.js` zamień:

```js
eq(kD.filter(function (e) { return e.key === 'airport'; })[0].list, [['SGN', 'mekong'], ['HPH', 'catba']], 'a road from an airport used both ways is named once');
```

na:

```js
eq(kD.filter(function (e) { return e.key === 'airport'; })[0].list, [['SGN', 'mekong', 2], ['HPH', 'catba', 1]], 'a road from an airport used both ways is named once, with its two rides');
eq([kB.filter(function (e) { return e.key === 'cattien.park'; })[0].items, kB.filter(function (e) { return e.key === 'cattien.bausau_night'; })[0].items, kB[0].list],
  [['cattien.safari'], ['cattien.bausau_night'], []], 'the items booked under a key: Cát Tiên at level 3, the night safari only (the night at the lake replaces the walk)');
```

W `tests/page.test.js` zamień:

```js
ok(textWidth('Hồ Chí Minh City', 11.5) > 0.47 * 11.5 * 16 && textWidth('Huế', 11.5) > 0.62 * 11.5 * 3, 'a name: no narrower than Chrome draws it (0.47–0.62 em a letter)');
```

na:

```js
ok(textWidth('Hồ Chí Minh City', 11.5) > 0.47 * 11.5 * 16 && textWidth('Huế', 11.5) > 0.62 * 11.5 * 3, 'a name: no narrower than Chrome draws it (0.47–0.62 em a letter)');
eq([textWidth('Ố', 10), textWidth('Ứ', 10), textWidth('Đ', 10), textWidth('Ł', 10)], [textWidth('O', 10), textWidth('U', 10), textWidth('D', 10), textWidth('L', 10)],
  'a capital with a diacritic is as wide as a capital without one');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: nature at level 3: the night at Bàu Sấu first (4 weeks), the cruise; the cars from Nội Bài; vans between places, priced with the travel: got [["cattien.bausau_night","flights","catba.cruise","transfer","dalat.bidoup","dalat.langbiang","airport","saigon.cangio","cattien.park"],[["HAN","ninhbinh"],["HAN","catba"]],null], want [["cattien.bausau_night","flights","catba.cruise","transfer","dalat.bidoup","dalat.langbiang","airport","saigon.cangio","cattien.park"],[["HAN","ninhbinh",1],["HAN","catba",1]],null]
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
      (tet ? '<p class="b-warn">' + esc(T('bud.tet')) + '</p>' : holidays.length ? '<p class="b-warn">' + esc(T('bud.holiday', { x: holidays.join(', ') })) + '</p>' : '') +
```

na:

```js
      (tet ? '<p class="b-warn">' + esc(T('bud.tet')) + '</p>' : holidays.length ? '<p class="b-warn">' + esc(T(holidays.length > 1 ? 'bud.holidays' : 'bud.holiday', { x: andList(holidays) })) + '</p>' : '') +
```

W `site2/src/app.js` zamień:

```js
        var x = e.key === 'flights' ? e.list.map(function (f) { return AIRPORTS[f[0]].name + ' → ' + AIRPORTS[f[1]].name; }).join(', ')
          : e.key === 'airport' ? e.list.map(function (a) { return AIRPORTS[a[0]].name + ' – ' + C(a[1]).short; }).join(', ')
          : e.key === 'homestay' ? placesOf(e.list) : '';
        var meta = [e.two ? esc(T('book.cost', { x: zl(e.two, 10) })) : '', linksOf(e.links)].filter(Boolean);
        return '<li><p>' + esc(T('b.' + e.key, { x: x })) + '</p>' + (meta.length ? '<p class="b-meta">' + meta.join(' · ') + '</p>' : '') + '</li>';
```

na:

```js
        // what the line is about: the flights, the roads from airports (both ways said so), the hosts' places, the things
        // booked under the key (a park's services); a place with a peak of its own for its hosts adds its sentence
        var x = e.key === 'flights' ? e.list.map(function (f) { return AIRPORTS[f[0]].name + ' → ' + AIRPORTS[f[1]].name; }).join(', ')
          : e.key === 'airport' ? andList(e.list.map(function (a) { return AIRPORTS[a[0]].name + ' – ' + C(a[1]).short + (a[2] > 1 ? ' ' + T('book.both') : ''); }))
          : e.key === 'homestay' ? placesOf(e.list) : capFirst(andList(e.items.map(function (k) { return T('cost.' + k); })));
        var more = e.key === 'homestay' ? e.list.filter(function (id) { return HOMESTAY_NOTES.indexOf(id) > -1; }).map(function (id) { return ' ' + T('b.homestay.' + id); }).join('') : '';
        var meta = [e.two ? esc(T('book.cost', { x: zl(e.two, 10) })) : '', linksOf(e.links)].filter(Boolean);
        return '<li><p>' + esc(T('b.' + e.key, { x: x }) + more) + '</p>' + (meta.length ? '<p class="b-meta">' + meta.join(' · ') + '</p>' : '') + '</li>';
```

W `site2/src/before.js` zamień:

```js
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang'];
```

na:

```js
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang'];
// the hosts with a peak of their own: the line of the hosts adds the place's sentence (UI key b.homestay.<id>)
var HOMESTAY_NOTES = ['puluong'];
```

W `site2/src/page.js` zamień:

```js
   [{ key, ahead, links, two, one, list }], key a key of BOOK with ahead over 0. two, one: what it costs a person, as
   tripBudget counts it (a long road from an airport: the car), or null when its cost is part of the stays or the travel
   (homestay, transfer); list: what it is about: the flights as [from, to] codes, the roads from airports as [code, place]
   (each road once, though its cost counts every ride), the homestays as places. The keys: flights (any domestic flight);
```

na:

```js
   [{ key, ahead, links, two, one, list, items }], key a key of BOOK with ahead over 0. two, one: what it costs a person, as
   tripBudget counts it (a long road from an airport: the car), or null when its cost is part of the stays or the travel
   (homestay, transfer); list: what it is about: the flights as [from, to] codes, the roads from airports as [code, place,
   rides] (each road once, rides 2 when the trip takes it both ways, and its cost counts every ride), the homestays as
   places; items: the items of COSTS booked under the key, each once, in the order of the trip. The keys: flights (any domestic flight);
```

W `site2/src/page.js` zamień:

```js
    if (!out[key]) { out[key] = { key: key, ahead: b.ahead, links: b.links, two: null, one: null, list: [] }; order.push(key); }
```

na:

```js
    if (!out[key]) { out[key] = { key: key, ahead: b.ahead, links: b.links, two: null, one: null, list: [], items: [] }; order.push(key); }
```

W `site2/src/page.js` zamień:

```js
    [0, 1].forEach(function (i) { e.two[i] += c.two[i]; e.one[i] += c.one[i]; });
```

na:

```js
    [0, 1].forEach(function (i) { e.two[i] += c.two[i]; e.one[i] += c.one[i]; });
  }
  // an item of COSTS booked under entry e: its cost, and its name once
  function item(e, k, c) {
    cost(e, c);
    if (e && e.items.indexOf(k) < 0) e.items.push(k);
```

W `site2/src/page.js` zamień:

```js
        if (e && !e.list.some(function (x) { return x[0] === code && x[1] === place; })) e.list.push([code, place]);   // a road both ways: named once
      } else if (roadOf[pair]) {
        k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].cost.driver;
        cost(entry(C.items[k].book || k), itemCost(C.items[k]));
```

na:

```js
        var seen = e && e.list.filter(function (x) { return x[0] === code && x[1] === place; })[0];
        if (seen) seen[2]++;   // a road both ways: named once, with its rides
        else if (e) e.list.push([code, place, 1]);
      } else if (roadOf[pair]) {
        k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].cost.driver;
        item(entry(C.items[k].book || k), k, itemCost(C.items[k]));
```

W `site2/src/page.js` zamień:

```js
        cost(entry(C.items[k].book || k), entryCost(e, C.items));
```

na:

```js
        item(entry(C.items[k].book || k), k, entryCost(e, C.items));
```

W `site2/src/page.js` zamień:

```js
    em += ch === ' ' ? 0.26 : /[iljI.,:;'!|()]/.test(ch) ? 0.3 : /[ftr]/.test(ch) ? 0.4 : /[mwMW]/.test(ch) ? 0.9 : /[A-ZĐ]/.test(ch) ? 0.68 : 0.58;
```

na:

```js
    em += ch === ' ' ? 0.26 : /[iljI.,:;'!|()]/.test(ch) ? 0.3 : /[ftr]/.test(ch) ? 0.4 : /[mwMW]/.test(ch) ? 0.9 : ch !== ch.toLowerCase() ? 0.68 : 0.58;
```

W `site2/src/places.js` zamień:

```js
/* The places (modules) the engine plans with: only what the engine needs. Texts and photos come with plan 1B.
   name: short Polish name. axis: position on the south–north line that trips sweep along, close to the latitude
```

na:

```js
/* The places (modules) the engine plans with: only what the engine needs; the names, texts and photos are in the texts of
   the places (content.js, content/<id>.js). axis: position on the south–north line that trips sweep along, close to the latitude
```

W `site2/src/places.js` zamień:

```js
  saigon:    { name: 'Hồ Chí Minh City', axis: 10.78, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  mekong:    { name: 'Delta Mekongu', axis: 10.03, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  phuquoc:   { name: 'Phú Quốc', axis: 10.33, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 1, gory: 0, morze: 3 } },
  cattien:   { name: 'Cát Tiên', axis: 11.43, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
  dalat:     { name: 'Đà Lạt', axis: 11.94, nights: [2, 3, 4], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 2, gory: 2, morze: 0 } },
  hoian:     { name: 'Hội An', axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
  hue:       { name: 'Huế', axis: 16.46, nights: [2, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
  puluong:   { name: 'Pù Luông', axis: 20.2, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  ninhbinh:  { name: 'Ninh Bình', axis: 20.3, nights: [1, 2, 2], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  catba:     { name: 'Cát Bà', axis: 20.73, nights: [3, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 2, gory: 1, morze: 2 } },
  hanoi:     { name: 'Hà Nội', axis: 21.03, nights: [1, 2, 4], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 0 } },
  hanoiStop: { name: 'Hà Nội (noc w drodze)', axis: 21.03, node: 'hanoi', nights: [1, 1, 1], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 0, gory: 0, morze: 0 } },
  babe:      { name: 'Ba Bể', axis: 22.41, nights: [1, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  caobang:   { name: 'Cao Bằng', axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } }
```

na:

```js
  saigon:    { axis: 10.78, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  mekong:    { axis: 10.03, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  phuquoc:   { axis: 10.33, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 1, gory: 0, morze: 3 } },
  cattien:   { axis: 11.43, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
  dalat:     { axis: 11.94, nights: [2, 3, 4], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 2, gory: 2, morze: 0 } },
  hoian:     { axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
  hue:       { axis: 16.46, nights: [2, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
  puluong:   { axis: 20.2, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  ninhbinh:  { axis: 20.3, nights: [1, 2, 2], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  catba:     { axis: 20.73, nights: [3, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 2, gory: 1, morze: 2 } },
  hanoi:     { axis: 21.03, nights: [1, 2, 4], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 0 } },
  hanoiStop: { axis: 21.03, node: 'hanoi', nights: [1, 1, 1], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 0, gory: 0, morze: 0 } },
  babe:      { axis: 22.41, nights: [1, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  caobang:   { axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } }
```

W `site2/src/template.html` zamień:

```html
/* on narrow screens the links scroll, and the strip fades out at its end */
@media (max-width: 900px) {
  .secnav-links { -webkit-mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); }
```

na:

```html
/* on a tablet the links share the bar with the summary, so they scroll, and the strip fades out at its end */
@media (min-width: 641px) and (max-width: 900px) {
  .secnav-links { -webkit-mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); mask-image: linear-gradient(90deg, rgb(var(--black)) 85%, transparent); }
}
/* on a phone the links show only while the form is on the screen (class away hides them), so "Ustawienia" goes, and the
   other three fit down to 320 px */
@media (max-width: 640px) {
  .secnav-links { gap: 14px; }
  .secnav-links a[href="#settings"] { display: none; }
```

W `site2/src/ui.js` zamień:

```js
  'bud.holiday': 'Ten termin obejmuje długi weekend ({x}): ceny bywają wyższe, a miejsc mniej.',
```

na:

```js
  'bud.holiday': 'Ten termin obejmuje długi weekend ({x}): ceny bywają wyższe, a miejsc mniej.',
  'bud.holidays': 'Ten termin obejmuje długie weekendy: {x}. Ceny bywają wtedy wyższe, a miejsc mniej.',
```

W `site2/src/ui.js` zamień:

```js
  'book.h3': 'Zarezerwuj wcześniej', 'book.p': 'Od najpilniejszego. Kwoty na osobę przy dwóch osobach.', 'book.cost': 'ok. {x} na osobę',
  'book.tet': 'Na Tết rezerwuj z dużym zapasem: loty krajowe 2–3 miesiące wcześniej, rejsy i noclegi u gospodarzy 1–2 miesiące, samochody z kierowcą 3–4 tygodnie.',
  'book.none': 'Na tej trasie nic nie trzeba rezerwować z dużym wyprzedzeniem. Noclegi zarezerwuj tydzień–dwa wcześniej.',
  'b.flights': 'Loty krajowe ({x}): ok. 3 tygodnie wcześniej.',
  'b.cattien.bausau_night': 'Noc nad Bàu Sấu: telefonem, przez Zalo albo e-mailem w parku Cát Tiên, 2–4 tygodnie wcześniej, w święta co najmniej miesiąc; miejsc jest ok. 19.',
  'b.catba.cruise': 'Rejs po Zatoce Lan Hạ z noclegiem na statku, z wypłynięciem z Cát Bà: 1–2 tygodnie wcześniej, od października do kwietnia 2–4 tygodnie.',
  'b.homestay': 'Noclegi u gospodarzy ({x}): 1–2 tygodnie wcześniej, bezpośrednio u gospodarzy; w Pù Luông w porze złotych tarasów i w długie weekendy 4–6 tygodni.',
```

na:

```js
  'book.h3': 'Zarezerwuj wcześniej', 'book.p': 'Od najpilniejszego. Kwoty na osobę przy dwóch osobach.', 'book.cost': 'ok. {x} na osobę', 'book.both': 'w obie strony',
  'book.tet': 'Na Tết rezerwuj z dużym zapasem: loty krajowe 2–3 miesiące wcześniej, rejsy i noclegi u gospodarzy 1–2 miesiące, samochody z kierowcą 3–4 tygodnie.',
  'book.none': 'Na tej trasie nic nie trzeba rezerwować z dużym wyprzedzeniem. Noclegi zarezerwuj tydzień–dwa wcześniej.',
  'b.flights': 'Loty krajowe: {x}. Kupuj ok. 3 tygodnie wcześniej.',
  'b.cattien.bausau_night': 'Noc nad Bàu Sấu: telefonem, przez Zalo albo e-mailem w parku Cát Tiên, 2–4 tygodnie wcześniej, w święta co najmniej miesiąc; miejsc jest ok. 19.',
  'b.catba.cruise': 'Rejs po Zatoce Lan Hạ z noclegiem na statku, z wypłynięciem z Cát Bà: 1–2 tygodnie wcześniej, od października do kwietnia 2–4 tygodnie.',
  'b.homestay': 'Noclegi u gospodarzy: {x}. Rezerwuj 1–2 tygodnie wcześniej, bezpośrednio u gospodarzy.',
  'b.homestay.puluong': 'W Pù Luông w porze złotych tarasów i w długie weekendy 4–6 tygodni wcześniej.',
```

W `site2/src/ui.js` zamień:

```js
  'b.airport': 'Samochód z kierowcą na dalekie drogi z lotnisk ({x}): 2–3 dni wcześniej.',
```

na:

```js
  'b.airport': 'Samochód z kierowcą na dalekie drogi z lotnisk: {x}. Zamów 2–3 dni wcześniej.',
```

W `site2/src/ui.js` zamień:

```js
  'b.cattien.park': 'Gibony o świcie, wędrówka do Bàu Sấu i nocne safari w parku Cát Tiên: najpóźniej dzień wcześniej, gibony najlepiej przed przyjazdem.',
```

na:

```js
  'b.cattien.park': '{x}: zapisz się w parku przed przyjazdem albo przy zameldowaniu, najpóźniej dzień wcześniej.',
```

W `tools/report.js` zamień:

```js
    out.push('| ' + x.start + '–' + x.end + ' | ' + PLACES[x.id].name + ' | ' + x.n + ' | ' + x.season + ' | ' + legText(x.leg) + ' |');
```

na:

```js
    out.push('| ' + x.start + '–' + x.end + ' | ' + CONTENT[x.id].short + ' | ' + x.n + ' | ' + x.season + ' | ' + legText(x.leg) + ' |');
```

W `tools/report.sh` zamień:

```bash
"$J" $S/places.js $S/seasons.js $S/travel.js $S/engine.js tools/report.js
```

na:

```bash
"$J" $S/places.js $S/seasons.js $S/travel.js $S/engine.js $S/content.js $S/content/*.js tools/report.js
```

- [ ] **Krok 4: Sonda.**

W `tests/probes/settings.js` zamień:

```js
    nav.classList.remove('away');
```

na:

```js
    nav.classList.remove('away');
    // before the form goes off the screen the bar shows its links, all of them whole (on a phone without „Ustawienia”)
    var links = nav.querySelector('.secnav-links'), shown = Array.prototype.filter.call(links.querySelectorAll('a'), function (a) { return a.offsetWidth > 0; });
    check('the links of the bar fit, none cut short', links.scrollWidth <= links.clientWidth + 0.5 && shown.length === (W <= 640 ? 3 : 4),
      links.scrollWidth + ' of ' + links.clientWidth + ', ' + shown.length + ' links');
```

- [ ] **Krok 5: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; każda sonda kończy się `done, all checks ok` i kodem 0.

- [ ] **Krok 6: Commit**

```bash
git add site2/src/app.js site2/src/before.js site2/src/page.js site2/src/places.js site2/src/template.html site2/src/ui.js tests/content.test.js tests/data.test.js tests/page.test.js tests/probes/settings.js tools/report.js tools/report.sh
git commit -F - <<'EOF'
Porządki z listy „Do etapu 3”: pasek u góry mieści się na telefonie, zdania „Zarezerwuj wcześniej” mówią o tej trasie, textWidth z wielkimi literami z diakrytykami, jedna krótka nazwa miejsca (CONTENT.short), ostrzejsza kontrola tekstu trudnego dnia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Dwie drogi krótsze przez Hà Nội

Dwie drogi w danych były dłuższe niż objazd przez Hà Nội, więc silnik i tak jechał przez Hà Nội, a droga z lotniska traciła swój tekst (ustalenie 12):
- lotnisko Hà Nội – Pù Luông: 5,25 h, przez Hà Nội 5 h;
- Ninh Bình – Cao Bằng: 9,25 h, przez Hà Nội 8,5 h.

Czasy bezpośrednie są teraz równe objazdowi, jak w uzupełnieniu `research/polaczenia-2026-10.md` z 13.10.2026. Nowy test danych pilnuje, że żadna droga nie jest dłuższa od objazdu innymi drogami.

**Pliki:**
- Zmień: `site2/src/travel.js`
- Testy: `tests/data.test.js`

**Interfejsy:**
- Daje: test danych „żadna droga nie jest dłuższa od objazdu innymi drogami”; nowe drogi w zadaniach 6–8 też muszą go przejść.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/data.test.js` zamień:

```js
  Object.keys(PLACES).forEach(function (id) { need(G.h[node(id)], id + ': no road or flight reaches it'); });
```

na:

```js
  Object.keys(PLACES).forEach(function (id) { need(G.h[node(id)], id + ': no road or flight reaches it'); });
  // a road is no longer than the shortest way between its ends over the other roads, or the engine never takes it
  // (research/polaczenia-2026-10.md, „Uzupełnienie 13.10.2026”)
  ROADS.forEach(function (r, i) {
    var other = travelGraph(ROADS.filter(function (x, j) { return j !== i; }), []).road, d = other[r[0]] && other[r[0]][r[1]];
    need(!(d < r[2] - 1e-9), 'road ' + r.join(' ') + ': the other roads take ' + d + ' h');
  });
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/data.test.js`, ostatnie linie wyniku:

```
  travel: road HAN puluong 5.25: the other roads take 5 h
  travel: road ninhbinh caobang 9.25: the other roads take 8.5 h
Exception: Error: 2 problem(s) in travel, listed above
```

- [ ] **Krok 3: Kod.**

W `site2/src/travel.js` zamień:

```js
/* Roads and direct domestic flights. Every value has its source and date in research/polaczenia-2026-10.md.
```

na:

```js
/* Roads and direct domestic flights. Every value has its source and date in research/polaczenia-2026-10.md (two roads
   shortened on 13.10.2026 to the way through Hà Nội: its „Uzupełnienie 13.10.2026”), a road of a place added in stage 3 in
   that place's research note (research/<id>-2026-10.md). No road is longer than the way over the other roads.
```

W `site2/src/travel.js` zamień:

```js
  ['HAN', 'hanoi', 0.75], ['HAN', 'ninhbinh', 2.25], ['HAN', 'catba', 4], ['HAN', 'puluong', 5.25], ['HAN', 'babe', 5], ['HAN', 'caobang', 6.25],
  ['hanoi', 'ninhbinh', 2], ['hanoi', 'catba', 4], ['hanoi', 'caobang', 6.5], ['hanoi', 'babe', 5.25], ['hanoi', 'puluong', 4.25],
  ['puluong', 'ninhbinh', 3.5], ['puluong', 'catba', 7.5], ['ninhbinh', 'catba', 4.5], ['ninhbinh', 'caobang', 9.25], ['ninhbinh', 'babe', 7],
```

na:

```js
  ['HAN', 'hanoi', 0.75], ['HAN', 'ninhbinh', 2.25], ['HAN', 'catba', 4], ['HAN', 'puluong', 5], ['HAN', 'babe', 5], ['HAN', 'caobang', 6.25],
  ['hanoi', 'ninhbinh', 2], ['hanoi', 'catba', 4], ['hanoi', 'caobang', 6.5], ['hanoi', 'babe', 5.25], ['hanoi', 'puluong', 4.25],
  ['puluong', 'ninhbinh', 3.5], ['puluong', 'catba', 7.5], ['ninhbinh', 'catba', 4.5], ['ninhbinh', 'caobang', 8.5], ['ninhbinh', 'babe', 7],
```

- [ ] **Krok 4: Testy i build**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje. Sond nie trzeba: to zadanie nie zmienia tego, co strona pokazuje (w suchej próbie wszystkie przeszły także po nim).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/travel.js tests/data.test.js
git commit -F - <<'EOF'
Dane: dwie drogi krótsze przez Hà Nội (lotnisko Hà Nội – Pù Luông 5 h, Ninh Bình – Cao Bằng 8,5 h) i test, że żadna droga nie jest dłuższa od objazdu innymi drogami

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Phong Nha

Pierwsze nowe miejsce, z `research/phongnha-2026-10.md` i zmian 1–6 z researchu:
- **dane:**
  - `phongnha` na osi 17,6, noce [2, 3, 4], poziom 1, oceny: przyroda 2, góry 3;
  - sezon `DSDDDSDDZZZS`, klimat ze stacji Đồng Hới;
  - lotnisko Đồng Hới (VDH) z lotami do Hà Nội (1,1 h) i Hồ Chí Minh City (1,6 h);
  - drogi do Huế, Hội An, Ninh Bình i Pù Luông;
- **treść na trzech poziomach:**
  - „Spokojnie”: łodzią do jaskini Phong Nha i kładką przez Paradise Cave;
  - „Aktywnie”: 7 km w Paradise Cave, a przy 4 nocach Tú Làn na jeden dzień;
  - „Ekstremalnie”: Hang Én z Oxalis na dwa dni (`hard.next` z zadania 1), wyłączona w IX–XI;
  - nowy kod pakowania „strój kąpielowy”;
- **ceny i rezerwacje:** noc 21–55 EUR i osiem pozycji; Hang Én ok. 2 miesiące wcześniej, do tego Tú Làn i Paradise 7 km; kolor 14 i pięć zdjęć;
- **test danych** czyta research miejsc etapu 3 z ich własnych plików (`OWN_NOTES`): sezon i tabele „Zestawienie” cen, wycieczek, rezerwacji, dróg i lotów;
- **testy strony** (`tests/page.test.js`) zostają na 14 dawnych pozycjach (`OLD_IDS`, `DATA_T`, `OLD_PLACES`), a nowe testy etapu 3 liczą na pełnych danych (`DATA_ALL`);
- **mapa:**
  - kadr środka zaczyna się od 18,4° N zamiast 17,95° N, żeby nad Phong Nha zmieściły się etykiety dróg na północ;
  - ramka tytułu kadru jest liczona z tekstu;
  - strzałka do innego kadru ma „→” przy drodze i „✈” przy locie;
  - kontury liczy od nowa `geo/make_basemap.py`;
- **sonda `before.js`:** budżet przed zamianą i po niej porównany w euro (na trasie sondy pętla Cao Bằng ma teraz 2 noce, a motocykl oszczędza na niej mniej niż zaokrąglenie do 100 zł); komentarze o najszerszej kwocie mówią o jej postaci, nie o liczbie;
- **`KEEP_TOGETHER`:** Paradise Cave i Hang Va.

**Pliki:**
- Utwórz: `site2/src/content/phongnha.js`
- Zmień: `site2/src/places.js`, `site2/src/seasons.js`, `site2/src/climate.js`, `site2/src/travel.js`, `site2/src/content.js` (lotnisko `VDH`, `PACK_CODES`, `KEEP_TOGETHER`), `site2/src/costs.js`, `site2/src/before.js`, `site2/src/photos.js`, `site2/src/ui.js`, `site2/src/page.js` (ramka tytułu kadru, strzałki do innych kadrów), `site2/src/panels.js`, `site2/src/basemap.js` (z `make_basemap.py`), `site2/src/template.html` (komentarz), `tests/probes/before.js`
- Testy: `tests/data.test.js` (`OWN_NOTES`), `tests/page.test.js` (`OLD_IDS`, `DATA_T`, `OLD_PLACES`, `DATA_ALL`, testy etapu 3)

**Interfejsy:**
- Bierze: `hard.next` (zadanie 1), `SWAPS.roads` (zadanie 2), test objazdu (zadanie 5).
- Daje:
  - w testach danych `OWN_NOTES`: pliki `research/<id>-2026-10.md` miejsc bez sekcji w `research/sezony-2026-10.md`; każda droga i każdy lot ma godziny w tabeli researchu (`research/polaczenia-2026-10.md` albo plik miejsca), a późniejszy wiersz z kolumną „Jest” wygrywa;
  - w testach strony `OLD_IDS`, `OLD_AIRPORTS`, `OLD_PLACES`, `DATA_T` (14 dawnych pozycji) i `DATA_ALL`, `MAPW_ALL`, `stayOf`, `legAll` dla testów etapu 3;
  - `AIRPORTS.VDH`, kod pakowania `swim` w dniach.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/data.test.js` zamień:

```js
}

```

na:

```js
}

/* The places added in stage 3 keep their research in a note of their own, research/<id>-2026-10.md (each place without a
   section in research/sezony-2026-10.md): a season section like those of that note and the tables „Zestawienie: ceny”,
   „wycieczki”, „rezerwacje”, „drogi” and „loty”, with the columns of the notes of the topics. */
var SEASON_NOTE = readFile('research/sezony-2026-10.md');
var OWN_NOTES = Object.keys(PLACES).filter(function (id) { return !PLACES[id].node && SEASON_NOTE.indexOf('\n## ' + id + ': ') < 0; })
  .map(function (id) { return 'research/' + id + '-2026-10.md'; });

```

W `tests/data.test.js` zamień:

```js
  Object.keys(HUBS).forEach(function (code) { need(AIRPORTS[code], 'HUBS: ' + code + ' is no airport of AIRPORTS'); });
```

na:

```js
  Object.keys(HUBS).forEach(function (code) { need(AIRPORTS[code], 'HUBS: ' + code + ' is no airport of AIRPORTS'); });
  // every road and flight has its hours in a research table: research/polaczenia-2026-10.md or the note of a place of
  // stage 3 („Zestawienie: drogi”, „Zestawienie: loty”); a later row of the same two ends wins (the column „Jest” of an
  // „Uzupełnienie” table)
  var hours = {};
  ['research/polaczenia-2026-10.md'].concat(OWN_NOTES).forEach(function (path) {
    var col = 1;
    readFile(path).split('\n').forEach(function (line) {
      if (!/^\|/.test(line) || /^\|-/.test(line)) return;
      var c = line.replace(/^\||\|$/g, '').split('|').map(function (x) { return x.trim(); }), m = /^([A-Za-z]+) – ([A-Za-z]+)$/.exec(c[0]);
      if (/^(odcinek|trasa)$/i.test(c[0])) col = c.indexOf('Jest') > -1 ? c.indexOf('Jest') : 1;
      else if (m && /^\d+(,\d+)?$/.test(c[col] || '')) hours[[m[1], m[2]].sort().join('-')] = +c[col].replace(',', '.');
    });
  });
  ROADS.concat(FLIGHTS).forEach(function (r) {
    var k = [r[0], r[1]].sort().join('-');
    need(hours[k] === r[2], r.join(' ') + ': the research says ' + hours[k] + ' h');
  });
```

W `tests/data.test.js` zamień:

```js
   research/sezony-2026-10.md, every fair or poor month has a reason, and a reason that is a threshold of the note
```

na:

```js
   research/sezony-2026-10.md (a place of stage 3: its own note), every fair or poor month has a reason, and a reason that is a threshold of the note
```

W `tests/data.test.js` zamień:

```js
  readFile('research/sezony-2026-10.md').split('\n## ').forEach(function (sec) {
```

na:

```js
  [SEASON_NOTE].concat(OWN_NOTES.map(function (p) { return readFile(p); })).join('\n').split('\n## ').forEach(function (sec) {
```

W `tests/data.test.js` zamień:

```js
   BOOK in „Zestawienie” of research/rezerwacje-2026-10.md; ENTRY in „Zestawienie” of research/wjazd-2026-10.md. An item
```

na:

```js
   BOOK in „Zestawienie” of research/rezerwacje-2026-10.md; ENTRY in „Zestawienie” of research/wjazd-2026-10.md. A place of
   stage 3: the tables „Zestawienie: ceny”, „Zestawienie: wycieczki” and „Zestawienie: rezerwacje” of its own note. An item
```

W `tests/data.test.js` zamień:

```js
  });
  function same(a, b, what) { need(JSON.stringify(a) === JSON.stringify(b), what + ': ' + JSON.stringify(a) + ' in costs.js, ' + JSON.stringify(b) + ' in the research'); }
```

na:

```js
  });
  OWN_NOTES.forEach(function (p) {
    researchRows(p, '### Zestawienie: ceny').forEach(function (r) { base[r[0]] = [n(r[2]), n(r[3])]; });
    researchRows(p, '### Zestawienie: wycieczki').forEach(function (r) {
      items[r[0].replace(/`/g, '')] = { pp: [n(r[2]), n(r[3])], group: [n(r[4]), n(r[5])] };
    });
  });
  function same(a, b, what) { need(JSON.stringify(a) === JSON.stringify(b), what + ': ' + JSON.stringify(a) + ' in costs.js, ' + JSON.stringify(b) + ' in the research'); }
```

W `tests/data.test.js` zamień:

```js
  researchRows('research/rezerwacje-2026-10.md', '## Zestawienie\n').forEach(function (r) { rows[r[0]] = r; });
```

na:

```js
  researchRows('research/rezerwacje-2026-10.md', '## Zestawienie\n').forEach(function (r) { rows[r[0]] = r; });
  OWN_NOTES.forEach(function (p) { researchRows(p, '### Zestawienie: rezerwacje').forEach(function (r) { rows[r[0]] = r; }); });
```

W `tests/page.test.js` zamień:

```js
var DATA_T = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };   // the real data, as app.js plans with it
```

na:

```js
/* The trips pinned below plan with the 14 places of stages 1–2 and their roads and flights, so a place added later does
   not move them; the combination test (combos.test.js) plans with every place, and the places of stage 3 have checks of
   their own further down. */
var OLD_IDS = ['saigon', 'mekong', 'phuquoc', 'cattien', 'dalat', 'hoian', 'hue', 'puluong', 'ninhbinh', 'catba', 'hanoi', 'hanoiStop', 'babe', 'caobang'];
var OLD_AIRPORTS = ['SGN', 'HAN', 'DAD', 'HUI', 'DLI', 'PQC', 'VCA', 'HPH', 'THD'];
var OLD_PLACES = {};
OLD_IDS.forEach(function (id) { OLD_PLACES[id] = PLACES[id]; });
function oldEnd(e) { return OLD_IDS.indexOf(e) > -1 || OLD_AIRPORTS.indexOf(e) > -1; }
var DATA_T = { places: OLD_PLACES, seasons: SEASONS, hubs: HUBS,
  graph: travelGraph(ROADS.filter(function (r) { return oldEnd(r[0]) && oldEnd(r[1]); }), FLIGHTS.filter(function (f) { return oldEnd(f[0]) && oldEnd(f[1]); })) };
```

W `tests/page.test.js` zamień:

```js
var P3 = JSON.parse(JSON.stringify(PLACES)), S3 = JSON.parse(JSON.stringify(SEASONS));
```

na:

```js
var P3 = JSON.parse(JSON.stringify(OLD_PLACES)), S3 = JSON.parse(JSON.stringify(SEASONS));
```

W `tests/page.test.js` zamień:

```js
var D4 = { places: PLACES, seasons: S4, graph: DATA_T.graph, hubs: HUBS }, M4 = { from: 'SGN', to: 'HAN', start: '2027-03-28', end: '2027-04-11', interests: [], level: 2, add: [], remove: [] };
```

na:

```js
var D4 = { places: OLD_PLACES, seasons: S4, graph: DATA_T.graph, hubs: HUBS }, M4 = { from: 'SGN', to: 'HAN', start: '2027-03-28', end: '2027-04-11', interests: [], level: 2, add: [], remove: [] };
```

W `tests/page.test.js` zamień:

```js
eq([panelSize(MAP_PANELS.north).w, panelSize(MAP_PANELS.north).h, panelSize(MAP_PANELS.centre).h, panelSize(MAP_PANELS.south).h], [270, 250, 233, 177],
```

na:

```js
eq([panelSize(MAP_PANELS.north).w, panelSize(MAP_PANELS.north).h, panelSize(MAP_PANELS.centre).h, panelSize(MAP_PANELS.south).h], [270, 250, 270, 177],
```

W `tests/page.test.js` zamień:

```js
eq([mA.panels[1].y, mA.panels[2].y, mA.height], [266, 515, 692], 'the panels one under another, 16 px apart');
```

na:

```js
eq([mA.panels[1].y, mA.panels[2].y, mA.height], [266, 552, 729], 'the panels one under another, 16 px apart');
```

W `tests/page.test.js` zamień:

```js
eq(mA.panels.map(function (P) { return P.grid.map(function (g) { return g.lat + (g.label ? '' : '-'); }).join(' '); }), ['20 21 22 23', '16 17', '10 11- 12- 13'],
```

na:

```js
eq(mA.panels.map(function (P) { return P.grid.map(function (g) { return g.lat + (g.label ? '' : '-'); }).join(' '); }), ['20 21 22 23', '16 17 18', '10 11- 12- 13'],
```

W `tests/page.test.js` zamień:

```js
print('map ok');
```

na:

```js
print('map ok');

/* ---------- the places of stage 3, on the real data ---------- */
var DATA_ALL = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function tripAll(s) { var st = stOf(s); return { st: st, r: planRoute(st, DATA_ALL) }; }
function plansAll(t) {
  var done = {};
  return t.r.stops.map(function (x, i) { var d = stopDays(CONTENT[x.id], x, done[x.id] || 0, t.st.level, t.st.months, legAfter(t.r, i)); done[x.id] = (done[x.id] || 0) + x.n; return d; });
}
// Phong Nha: Hang Én over two days at level 3 in its season, the usual and the easy days otherwise
function pn(level, months) { return stopDays(CONTENT.phongnha, { n: 3, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([pn(3, [2, 2, 2]), pn(3, [9, 9, 9]), pn(2, [2, 2, 2]), pn(1, [2, 2, 2])], [['-', 'hard', 'hard'], ['-', '-', '-'], ['-', '-', '-'], ['-', 'easy', 'easy']],
  'Phong Nha, three nights: Hang Én on days 2 and 3 at level 3 in March, not in October (no expeditions); the usual and the easy days at levels 2 and 1');
// a stay of a place on a trip found with Dodaj (the place asked for), so that later places do not move the check
function stayOf(t, id) { var i = t.r.stops.map(function (x) { return x.id; }).indexOf(id); return { n: t.r.stops[i].n, days: plansAll(t)[i].map(function (d) { return d.variant || '-'; }) }; }
var tPN = tripAll({ from: 'DAD', to: 'DAD', year: 2027, month: 3, days: 8, interests: ['gory'], level: 3, add: ['phongnha'] }), sPN = stayOf(tPN, 'phongnha');
eq([sPN.n >= 3, sPN.days.slice(0, 3), bookList(tPN.r, plansAll(tPN), [], BOOKD)[0].key], [true, ['-', 'hard', 'hard'], 'phongnha.hangen'],
  'mountains and caves at level 3 in March: Phong Nha with Hang Én on days 2 and 3; the expedition is the first thing to book (2 months)');
// a way to another panel on a trip put together leg by leg: Hà Nội, Phong Nha (a flight to Đồng Hới), Pù Luông (a road)
function legAll(a, b, road) { return legBetween(DATA_ALL.graph, a, b, road); }
var rPR = { days: 9, stops: [{ id: 'hanoi', n: 1, start: 1, end: 1, leg: legAll('HAN', 'hanoi', true) }, { id: 'phongnha', n: 4, start: 2, end: 5, leg: legAll('hanoi', 'phongnha') },
  { id: 'puluong', n: 3, start: 6, end: 8, leg: legAll('phongnha', 'puluong') }], home: legAll('puluong', 'HAN', true) };
eq(labelsOf(mapLayout(rPR, stOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 9, interests: [], level: 2 }), MAPW).panels[1], 'stub').sort(), ['→ Pù Luông', '✈ Hà Nội'],
  'a way to another panel: a road with an arrow (Phong Nha to Pù Luông), a flight with ✈ (Đồng Hới to Hà Nội)');
print('stage 3 ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: the panels: MAP_WIDTH wide, as high as their latitudes at that scale: got [270,250,233,177], want [270,250,270,177]
```

- [ ] **Krok 3: Kod.**

W `site2/src/before.js` zamień:

```js
   From the table „Zestawienie” in research/rezerwacje-2026-10.md (tests/data.test.js checks them against it); tools/links.sh
```

na:

```js
   From the table „Zestawienie” in research/rezerwacje-2026-10.md, for a place of stage 3 the table „Zestawienie: rezerwacje”
   of its own note (tests/data.test.js checks them against both); tools/links.sh
```

W `site2/src/before.js` zamień:

```js
var BOOK = {
```

na:

```js
var BOOK = {
  'phongnha.hangen': { ahead: 60, links: [{ name: 'Oxalis, Hang Én', url: 'https://oxalisadventure.com/tour/hang-en-adventure-cave-camp/' }, { name: 'Oxalis, wszystkie wyprawy', url: 'https://oxalisadventure.com/tours/' }] },
```

W `site2/src/before.js` zamień:

```js
  'puluong.summit': { ahead: 7, links: [{ name: 'Rezerwat Pù Luông, formularz', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform' }] },
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
```

na:

```js
  'phongnha.tulan': { ahead: 14, links: [{ name: 'Oxalis, Tú Làn w jeden dzień', url: 'https://oxalisadventure.com/tour/tu-lan-1-day-experience/' }] },
  'puluong.summit': { ahead: 7, links: [{ name: 'Rezerwat Pù Luông, formularz', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform' }] },
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
  'phongnha.paradise7': { ahead: 7, links: [{ name: 'Park Phong Nha–Kẻ Bàng, Paradise Cave', url: 'https://phongnhakebang.vn/du-lich/dong-thien-duong13' }, { name: 'Paradise Cave', url: 'https://dongthienduong.com/' }] },
```

W `site2/src/climate.js` zamień:

```js
   there for the place): t: [lowest, highest] mean daily temperature in °C; rain: [mm, days with rain]. why: by month 1–12,
```

na:

```js
   there for the place; a place of stage 3: the table of its own note, research/<id>-2026-10.md): t: [lowest, highest] mean daily temperature in °C; rain: [mm, days with rain]. why: by month 1–12,
```

W `site2/src/climate.js` zamień:

```js
  },
  puluong: {
```

na:

```js
  },
  phongnha: {
    t: [[16.6, 21.7], [17.6, 22.3], [19.7, 24.9], [22.4, 28.8], [25, 32.4], [26.8, 34], [26.7, 33.9], [26, 33.1], [24.3, 30.9], [22.5, 28.2], [20.3, 25.5], [17.6, 22.6]],
    rain: [[59.4, 11.8], [39.9, 11.2], [43.2, 11.3], [60.8, 9.2], [115.6, 10.1], [78.9, 7.3], [75.5, 7.2], [166.1, 11], [472.5, 15.8], [649.1, 19.3], [318.7, 17.4], [125.1, 14.2]],
    why: { 2: ['szaro'], 6: ['upal'], 9: ['deszcz', 'powodzie'], 10: ['ulewy', 'powodzie'], 11: ['ulewy', 'powodzie'], 12: ['szaro'] }
  },
  puluong: {
```

W `site2/src/content.js` zamień:

```js
// what a day or an event adds to the list of what to pack (UI keys p.<code>): socks against leeches, a torch
var PACK_CODES = ['leeches', 'torch'];
```

na:

```js
// what a day or an event adds to the list of what to pack (UI keys p.<code>): socks against leeches, a torch, swimwear for a
// river or a cave swum through
var PACK_CODES = ['leeches', 'torch', 'swim'];
```

W `site2/src/content.js` zamień:

```js
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long'];
```

na:

```js
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long', 'Paradise Cave', 'Hang Va'];
```

W `site2/src/content.js` zamień:

```js
  THD: { name: 'Thanh Hóa (Thọ Xuân)', short: 'Thanh Hóa', maps: 'Tho Xuan Airport', pt: [19.90, 105.47] }
```

na:

```js
  THD: { name: 'Thanh Hóa (Thọ Xuân)', short: 'Thanh Hóa', maps: 'Tho Xuan Airport', pt: [19.90, 105.47] },
  VDH: { name: 'Đồng Hới', maps: 'Dong Hoi Airport', pt: [17.52, 106.59] }
```

Utwórz `site2/src/content/phongnha.js`:

```js
/* Phong Nha: texts of the place (stage 3, batch A). Facts and sources: research/phongnha-2026-10.md. Fields: see site2/src/content.js. */
CONTENT.phongnha = {
  name: 'Park Narodowy Phong Nha–Kẻ Bàng', short: 'Phong Nha',
  sub: 'Jaskinie z łodzi i pieszo wśród krasowych dolin',
  region: 'centre', maps: 'Phong Nha, Quang Tri, Vietnam', pt: [17.61, 106.31], color: 14,
  photos: ['phongnha_0', 'phongnha_1', 'phongnha_2', 'phongnha_3', 'phongnha_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Nad rzeką Son', d: 'Nocleg w miasteczku Phong Nha nad rzeką Son, ok. godziny od lotniska Đồng Hới. Wieczorem rowerem po dolinie Bồng Lai, wśród pól i farm; wiele noclegów pożycza rowery za darmo.' },
    { p: 2, o: 2, pace: 'hike', cost: ['phongnha.paradise7'], t: '7 km w głąb Paradise Cave', d: 'Całodniowa trasa ośrodka Paradise Cave (Động Thiên Đường): pierwszy kilometr drewnianą kładką, dalej z przewodnikiem i czołówką w ciemności, 7 km w głąb jaskini, z obiadem w środku. Sprzęt wydają o 8:00, koniec ok. 14:30–16:00. Trasa jest od 16 lat i nie dla osób z chorobami serca albo nadciśnieniem; zarezerwuj ją w ośrodku kilka dni wcześniej.',
      rain: 'kilometr kładki w Paradise Cave, która leży wysoko i działa prawie zawsze; przy kilkudniowych ulewach park wstrzymuje trasę 7 km i łodzie do jaskini Phong Nha.',
      easy: { pace: 'boat', cost: ['phongnha.cave', 'phongnha.paradise'], t: 'Łodzią do jaskini Phong Nha i kładką przez Paradise Cave', d: 'Rano łódź z przystani w miasteczku: pół godziny rzeką Son, potem ok. 1 200 m podziemnej rzeki, już na wiosłach, i suche komory na pomostach, razem ok. 2,5 godziny. Po południu Paradise Cave: autko elektryczne pod górę, schody w dół i kilometr drewnianej kładki wśród nacieków; czynne mniej więcej 7:30–16:00.' },
      hard: { pace: 'hike', late: true, off: [9, 10, 11], cost: ['phongnha.hangen'], pack: ['swim'], t: 'Hang Én: w dół do Rào Thương i noc w jaskini', d: 'Dwudniowa wyprawa z Oxalis, jedynym operatorem z pozwoleniem prowincji na tę trasę; prowadzą przewodnicy z asystentami bezpieczeństwa. Odbiór z hotelu o 7:30–8:00, strome zejście do potoku Rào Thương, brody, obiad w wiosce Đoòng, dalej dżunglą do jaskini Nước Lạnh, a nocleg w obozie w Hang Én. Wieczorem kąpiel w jeziorku i kolacja w jaskini. Oxalis wymaga dobrej kondycji (w ostatnim roku wędrówki po co najmniej 6 km i 500 m w górę) i wieku 16–70 lat, a dane o zdrowiu zbiera 45 dni przed wyjściem, więc zarezerwuj ok. 2 miesiące wcześniej. Ten sam operator prowadzi dłuższe wyprawy, np. Tú Làn na 4–5 dni i Hang Va z linami, a Sơn Đoòng, największa jaskinia świata, jest wyprzedana na kilka lat naprzód.',
        next: { pace: 'hike', t: 'Hang Én: rano w jaskini, wyjście do drogi', d: 'Po śniadaniu tylna część jaskini i obiad w obozie, potem przez rzeki, ok. 30 przepraw w dwa dni, i 450 m podejścia do drogi, gdzie czeka auto. W Phong Nha ok. 18:00, więc tę noc spędzisz jeszcze tutaj, a w dalszą drogę ruszysz następnego dnia.' } } },
    { p: 3, o: 3, pace: 'boat', cost: ['phongnha.cave', 'phongnha.darkcave'], pack: ['swim'], t: 'Jaskinia Phong Nha z łodzi i Hang Tối', d: 'Rano łodzią z przystani w miasteczku do jaskini Phong Nha: pół godziny rzeką Son, potem ok. 1 200 m podziemnej rzeki na wiosłach. Po południu rzeka Chày i Hang Tối: 400 m tyrolki nad rzeką, jaskinia w ciemności, kąpiel błotna, kajak i kąpiel w rzece, razem ok. 4 godzin (tyrolka od 40 kg).',
      rain: 'kładka w Paradise Cave albo ogród botaniczny, które działają prawie zawsze; przy kilkudniowych ulewach łodzie do jaskini Phong Nha i Hang Tối stoją zwykle przez 2–5 dni.',
      easy: { pace: 'nature', cost: ['phongnha.botanic'], pack: [], t: 'Ogród botaniczny i dolina Bồng Lai', d: 'Ogród botaniczny parku, ok. 10 km od miasteczka: leśne ścieżki do 4 km, ponad 30-metrowy wodospad Gió, a w koronach drzew czasem małpy; z przewodnikiem parku trasa ma 5 km. Po południu rowerem albo autem po dolinie Bồng Lai, wśród pól i farm.' } },
    { p: 4, o: 4, pace: 'hike', cost: ['phongnha.tulan'], pack: ['swim'], t: 'Tú Làn w jeden dzień', d: 'Wyprawa z Oxalis do jaskiń Tú Làn: odbiór z hotelu o 7:00–7:30, 70 km na zachód, potem ok. 9 km marszu, 800 m w jaskiniach, 15 m drabiny z uprzężą i 150 m pływania podziemną rzeką w kamizelce, z obiadem w dolinie. Powrót do Phong Nha ok. 17:30–19:00. Wiek 16–70 lat; zarezerwuj 1–2 tygodnie wcześniej.',
      rain: 'kładka w Paradise Cave albo ogród botaniczny; gdy rzeki wzbierają, Oxalis zmienia albo odwołuje Tú Làn, a park zamyka Nước Moọc.',
      easy: { pace: 'nature', cost: ['phongnha.mooc'], t: 'Potok Nước Moọc', d: 'Ok. 20 minut autem od jaskini Phong Nha: kładki wzdłuż turkusowego potoku, płytkie kąpieliska i kajaki; czynne mniej więcej 8:00–15:30, latem do 16:30.' } }
  ],
  gem: 'Podziemna rzeka w jaskini Phong Nha: po wyłączeniu silnika łódź płynie dalej na wiosłach.',
  skip: 'Wycieczka z Huế w jeden dzień: ok. 7 godzin w aucie dla dwóch jaskiń.',
  instead: 'dwie noce w Phong Nha, z łodzią do jaskini Phong Nha rano.',
  events: [
    { from: [3, 1], to: [4, 30], t: 'Nad potokiem Nước Moọc kwitną drzewa vàng anh.' },
    { from: [6, 1], to: [8, 31], warn: true, t: 'Szczyt sezonu: w jaskiniach bywa tłoczno, a burza tropikalna potrafi na kilka dni zamknąć łodzie do jaskini Phong Nha i Hang Tối. Po ulewach w Laosie rzeka Son bywa mętna.' },
    { from: [9, 1], to: [11, 30], warn: true, t: 'Pora powodzi: gdy rzeka Son wzbiera, park wstrzymuje łodzie do jaskini Phong Nha, Hang Tối i Nước Moọc, zwykle na 2–5 dni, a Paradise Cave działa prawie zawsze.' },
    { from: [12, 1], to: [3, 31], warn: true, t: 'Chłodna pora: dni bywają szare i mżyste, a woda w rzekach i jaskiniach jest zimna. Weź ciepłą warstwę na wieczór i kurtkę przeciwdeszczową.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
   and „Zestawienie” in research/motocykl-2026-10.md; tests/data.test.js checks every number against them.
```

na:

```js
   and „Zestawienie” in research/motocykl-2026-10.md, for a place of stage 3 the tables „Zestawienie: ceny” and
   „Zestawienie: wycieczki” of its own note (research/<id>-2026-10.md); tests/data.test.js checks every number against them.
```

W `site2/src/costs.js` zamień:

```js
    puluong: [14, 62], ninhbinh: [15, 62], catba: [14, 52], hanoi: [21, 69], babe: [12, 64], caobang: [14, 48] },
```

na:

```js
    puluong: [14, 62], ninhbinh: [15, 62], catba: [14, 52], hanoi: [21, 69], babe: [12, 64], caobang: [14, 48],
    phongnha: [21, 55] },
```

W `site2/src/costs.js` zamień:

```js
    'haivan.moto': { pp: [22, 29], group: [0, 0] }
```

na:

```js
    'haivan.moto': { pp: [22, 29], group: [0, 0] },
    'phongnha.cave': { pp: [5, 8], group: [24, 26] },
    'phongnha.paradise': { pp: [9, 9], group: [14, 17] },
    'phongnha.paradise7': { pp: [69, 69], group: [14, 17] },
    'phongnha.darkcave': { pp: [15, 15], group: [7, 14] },
    'phongnha.tulan': { pp: [69, 69], group: [0, 0] },
    'phongnha.hangen': { pp: [327, 327], group: [0, 0], night: true },
    'phongnha.botanic': { pp: [3, 4], group: [0, 7] },
    'phongnha.mooc': { pp: [6, 8], group: [7, 14] }
```

W `site2/src/page.js` zamień:

```js
   trip with a hike, else shoes; leeches and torch, the stays whose plans or events met ask for them (pack, content.js);
   swim, the stays by the sea (fit morze 2 or more); moto, when a swap ridden yourself is on the trip; then sun, mosquito,
```

na:

```js
   trip with a hike, else shoes; leeches, torch and swim, the stays whose plans or events met ask for them (pack, content.js),
   and swim also the stays by the sea (fit morze 2 or more); moto, when a swap ridden yourself is on the trip; then sun, mosquito,
```

W `site2/src/page.js` zamień:

```js
    // the panel's title (top left) and scale bar (bottom left or right) take their corners
    var obstacles = [{ x: 0, y: 0, w: 84, h: 24 }, { x: p.bar === 'left' ? 0 : p.w - 80, y: p.h - 18, w: 80, h: 18 }], items = [], faint = [];
```

na:

```js
    // the panel's title (top left: 10 px monospace capitals from x 10, letter-spacing 0.1 em, app.js) and scale bar (bottom
    // left or right) take their corners
    var title = textWidth(m.say('m.' + key), SMALL_PX, true) * 1.1;
    var obstacles = [{ x: 0, y: 0, w: 10 + title + 6, h: 24 }, { x: p.bar === 'left' ? 0 : p.w - 80, y: p.h - 18, w: 80, h: 18 }], items = [], faint = [];
```

W `site2/src/page.js` zamień:

```js
        if (s.names.indexOf(nameOf(ia ? g.to : g.from)) < 0) s.names.push(nameOf(ia ? g.to : g.from));
```

na:

```js
        // the other end by name, a flight with ✈ and a road with an arrow (stage 3: Phong Nha has roads to the north panel)
        var name = (g.mode === 'fly' ? '✈ ' : '→ ') + nameOf(ia ? g.to : g.from);
        if (s.names.indexOf(name) < 0) s.names.push(name);
```

W `site2/src/page.js` zamień:

```js
      var lines = s.names.map(function (n) { return '✈ ' + n; }), tips = STUB_TIPS.map(function (v) { return tipOf(s, STUB * v[0], v[1]); });
```

na:

```js
      var lines = s.names, tips = STUB_TIPS.map(function (v) { return tipOf(s, STUB * v[0], v[1]); });
```

W `site2/src/panels.js` zamień:

```js
   to Thọ Xuân airport; centre: Phong Nha to Hội An and Mỹ Sơn; south: Phú Quốc and the Mekong delta to Đà Lạt, Yok Đôn and
```

na:

```js
   to Thọ Xuân airport; centre: Phong Nha to Hội An and Mỹ Sơn, with room above Phong Nha for the labels of the ways north
   (stage 3: 18.4° N instead of 17.95); south: Phú Quốc and the Mekong delta to Đà Lạt, Yok Đôn and
```

W `site2/src/panels.js` zamień:

```js
  centre: { lon0: 105.6, lat0: 17.95, lon1: 108.9, lat1: 15.1, bar: 'left',
```

na:

```js
  centre: { lon0: 105.6, lat0: 18.4, lon1: 108.9, lat1: 15.1, bar: 'left',
```

W `site2/src/photos.js` zamień:

```js
  caobang_3: { cap: 'Krasowe wzgórza odbite w polu ryżowym koło Bản Giốc', artist: 'Adam Jones from Kelowna, BC, Canada', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Scenery_around_Ban_Gioc_Waterfall_-_Trung_Kanh_District_-_Cao_Bang_Province_-_Vietnam_-_01_(48119879587).jpg' }
```

na:

```js
  caobang_3: { cap: 'Krasowe wzgórza odbite w polu ryżowym koło Bản Giốc', artist: 'Adam Jones from Kelowna, BC, Canada', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Scenery_around_Ban_Gioc_Waterfall_-_Trung_Kanh_District_-_Cao_Bang_Province_-_Vietnam_-_01_(48119879587).jpg' },
  phongnha_0: { cap: 'Rzeka Son płynie w głąb jaskini Phong Nha', artist: 'Bùi Thụy Đào Nguyên', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:S%C3%B4ng_Son_ch%E1%BA%A3y_trong_hang.jpg' },
  phongnha_1: { cap: 'Nacieki w Paradise Cave (Động Thiên Đường)', artist: 'Bùi Thụy Đào Nguyên', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:%C4%90%E1%BB%99ng_Thi%C3%AAn_%C4%90%C6%B0%E1%BB%9Dng.jpg' },
  phongnha_2: { cap: 'Wejście do jaskini Hang Én', artist: 'Jérémie B.', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Hang_%C3%89n_Cave_-_201505_-_JB.jpg' },
  phongnha_3: { cap: 'Rzeka Son i miasteczko Phong Nha z lotu ptaka', artist: 'Preparetavalise.com', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Phong_Nha_Drone.jpg' },
  phongnha_4: { cap: 'Łodzie na rzece Son w Phong Nha', artist: 'Preparetavalise.com', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Phong_Nha_fleuve.jpg' }
```

W `site2/src/places.js` zamień:

```js
  hue:       { axis: 16.46, nights: [2, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
```

na:

```js
  hue:       { axis: 16.46, nights: [2, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
  phongnha:  { axis: 17.6, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
```

W `site2/src/seasons.js` zamień:

```js
   Reasons, climate figures and sources: research/sezony-2026-10.md. */
var SEASONS = {
  saigon: 'DDDSSSSSSSDD', mekong: 'DDDDSSSSSSDD', phuquoc: 'DDDDSZZZZSSD', cattien: 'DDDSSSSZZZSD', dalat: 'DDDDSSSSSSDD',
  hoian: 'DDDDDSSDSZZS', hue: 'DDDDDSSSSZZZ', puluong: 'SSSDSSSSSDDS', ninhbinh: 'SSSDDDSSSDDD', catba: 'SSSDDSZZZDDS',
  hanoi: 'DDDDSSSSSDDD', babe: 'SSSDSSSSDDDS', caobang: 'SSDDSSSSDDDS'
```

na:

```js
   Reasons, climate figures and sources: research/sezony-2026-10.md; a place of stage 3: its own note, research/<id>-2026-10.md. */
var SEASONS = {
  saigon: 'DDDSSSSSSSDD', mekong: 'DDDDSSSSSSDD', phuquoc: 'DDDDSZZZZSSD', cattien: 'DDDSSSSZZZSD', dalat: 'DDDDSSSSSSDD',
  hoian: 'DDDDDSSDSZZS', hue: 'DDDDDSSSSZZZ', puluong: 'SSSDSSSSSDDS', ninhbinh: 'SSSDDDSSSDDD', catba: 'SSSDDSZZZDDS',
  hanoi: 'DDDDSSSSSDDD', babe: 'SSSDSSSSDDDS', caobang: 'SSDDSSSSDDDS',
  phongnha: 'DSDDDSDDZZZS'
```

W `site2/src/template.html` zamień:

```html
.facts .f-budget b { font-size: clamp(24px, 2.5vw, 32px); }   /* the widest, 5 800–13 500 zł, fits its column (tests/probes/before.js) */
```

na:

```html
.facts .f-budget b { font-size: clamp(24px, 2.5vw, 32px); }   /* the widest form, d ddd–dd ddd zł, fits its column (tests/probes/before.js) */
```

W `site2/src/travel.js` zamień:

```js
  ['DAD', 'hoian', 0.75], ['DAD', 'hue', 2.5], ['HUI', 'hue', 0.5], ['hoian', 'hue', 3.25],
```

na:

```js
  ['DAD', 'hoian', 0.75], ['DAD', 'hue', 2.5], ['HUI', 'hue', 0.5], ['hoian', 'hue', 3.25],
  // Phong Nha with Đồng Hới airport (VDH), the far roads to the north on the expressway
  ['VDH', 'phongnha', 1], ['hue', 'phongnha', 3.5], ['hoian', 'phongnha', 6.25], ['ninhbinh', 'phongnha', 6.5], ['puluong', 'phongnha', 8.25],
```

W `site2/src/travel.js` zamień:

```js
  ['DAD', 'DLI', 1.1], ['DAD', 'VCA', 1.5], ['DAD', 'PQC', 1.8],
```

na:

```js
  ['DAD', 'DLI', 1.1], ['DAD', 'VCA', 1.5], ['DAD', 'PQC', 1.8],
  // Đồng Hới (Phong Nha)
  ['HAN', 'VDH', 1.1], ['SGN', 'VDH', 1.6],
```

W `site2/src/ui.js` zamień:

```js
  'book.h3': 'Zarezerwuj wcześniej', 'book.p': 'Od najpilniejszego. Kwoty na osobę przy dwóch osobach.', 'book.cost': 'ok. {x} na osobę', 'book.both': 'w obie strony',
  'book.tet': 'Na Tết rezerwuj z dużym zapasem: loty krajowe 2–3 miesiące wcześniej, rejsy i noclegi u gospodarzy 1–2 miesiące, samochody z kierowcą 3–4 tygodnie.',
  'book.none': 'Na tej trasie nic nie trzeba rezerwować z dużym wyprzedzeniem. Noclegi zarezerwuj tydzień–dwa wcześniej.',
```

na:

```js
  'cost.phongnha.cave': 'łódź do jaskini Phong Nha', 'cost.phongnha.paradise': 'Paradise Cave', 'cost.phongnha.paradise7': '7 km w Paradise Cave',
  'cost.phongnha.darkcave': 'Hang Tối i rzeka Chày', 'cost.phongnha.tulan': 'Tú Làn w jeden dzień', 'cost.phongnha.hangen': 'wyprawa do Hang Én',
  'cost.phongnha.botanic': 'ogród botaniczny w Phong Nha', 'cost.phongnha.mooc': 'potok Nước Moọc',
  'book.h3': 'Zarezerwuj wcześniej', 'book.p': 'Od najpilniejszego. Kwoty na osobę przy dwóch osobach.', 'book.cost': 'ok. {x} na osobę', 'book.both': 'w obie strony',
  'book.tet': 'Na Tết rezerwuj z dużym zapasem: loty krajowe 2–3 miesiące wcześniej, rejsy i noclegi u gospodarzy 1–2 miesiące, samochody z kierowcą 3–4 tygodnie.',
  'book.none': 'Na tej trasie nic nie trzeba rezerwować z dużym wyprzedzeniem. Noclegi zarezerwuj tydzień–dwa wcześniej.',
  'b.phongnha.hangen': 'Wyprawa do Hang Én z Oxalis: ok. 2 miesiące wcześniej, w marcu, kwietniu i latem 3–4 miesiące; dane o zdrowiu operator zbiera 45 dni przed wyjściem.',
  'b.phongnha.tulan': 'Tú Làn w jeden dzień z Oxalis: 1–2 tygodnie wcześniej, w szczycie 3–4 tygodnie.',
  'b.phongnha.paradise7': '7 km w Paradise Cave: w ośrodku Paradise Cave 3–7 dni wcześniej, w szczycie 1–2 tygodnie.',
```

- [ ] **Krok 4: Sonda.**

W `tests/probes/before.js` zamień:

```js
  var before = ids(), money = fig.querySelector('b').textContent, self = document.querySelector('.swap[data-swap="caobang"] input[value="self"]');
```

na:

```js
  // the budget before the swap, in euros: on a short loop the motorbike saves less than the 100 zł the amount is rounded to
  var before = ids(), money = JSON.stringify(t.state.budget.two), self = document.querySelector('.swap[data-swap="caobang"] input[value="self"]');
```

W `tests/probes/before.js` zamień:

```js
    check('the budget follows', document.querySelector('#facts .f-budget b').textContent !== money, money + ' → ' + document.querySelector('#facts .f-budget b').textContent);
```

na:

```js
    check('the budget follows, and the figure and the budget part still say the same amount', JSON.stringify(t.state.budget.two) !== money &&
      textOf('#b-budget .b-sum b') === textOf('#facts .f-budget b'), money + ' → ' + JSON.stringify(t.state.budget.two) + ', ' + textOf('#facts .f-budget b'));
```

W `tests/probes/before.js` zamień:

```js
          // the widest budget of all the settings (30 days from and to Hồ Chí Minh City, nature, November 2027): it fits its figure
```

na:

```js
          // the widest budget: an amount of the longest form, d ddd–dd ddd zł (the digits of the display font are of one width, so
          // each such amount is as wide as the highest); here 30 days from and to Hồ Chí Minh City, nature, November 2027: it fits its figure
```

W `tests/probes/before.js` zamień:

```js
            // and every figure of the facts fits its tile (its box less its padding); here the longest day is 9 godz.
```

na:

```js
            // and every figure of the facts fits its tile (its box less its padding), the longest day with its unit too
```

- [ ] **Krok 5: Kontury mapy.** Kadr środka w `site2/src/panels.js` zmienił się w kroku 3, więc kontury trzeba policzyć od nowa (`geo/make_basemap.py`, tylko biblioteka standardowa).

  - **Dane Natural Earth, tylko po zgodzie użytkownika.** Zapytaj o pobranie dwóch plików do katalogu tymczasowego (nie do repo):
    - źródło: https://github.com/nvkelso/natural-earth-vector (domena publiczna);
    - `ne_10m_admin_0_countries.geojson`, ok. 13,3 MB;
    - `ne_10m_rivers_lake_centerlines.geojson`, ok. 7,3 MB.

    Rozmiar sprawdzisz przed pobraniem:

    ```bash
    for f in ne_10m_admin_0_countries ne_10m_rivers_lake_centerlines; do
      curl -sIL "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/$f.geojson" | grep -i '^content-length' | tail -1
    done
    ```

  - Po zgodzie pobierz i sprawdź sumy:

    ```bash
    NE="$TMPDIR/natural-earth"; mkdir -p "$NE"
    for f in ne_10m_admin_0_countries ne_10m_rivers_lake_centerlines; do
      curl -sSL -o "$NE/$f.geojson" "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/$f.geojson"
    done
    shasum -a 256 "$NE"/*.geojson
    ```

    W suchej próbie sumy były takie jak w „Kontekście dla wykonawcy”. Inne sumy (nowsze wydanie Natural Earth) nie zatrzymują pracy: rozstrzygną testy, sonda `map.js` i zrzut mapy w zadaniu 9.

  - Policz kontury i sprawdź wynik:

    ```bash
    grep -n "centre: { lon0: 105.6, lat0: 18.4" site2/src/panels.js
    python3 -I geo/make_basemap.py "$TMPDIR/natural-earth"
    shasum -a 256 site2/src/basemap.js; wc -c < site2/src/basemap.js
    ```

    Oczekiwane: grep znajduje nowy kadr, a skrypt wypisuje (tak było w suchej próbie):

    ```
    north: 270 × 250 px, 65.1 px per degree, 9 + 2 land rings, 5 river lines
    centre: 270 × 270 px, 81.8 px per degree, 1 + 3 land rings, 4 river lines
    south: 270 × 177 px, 47.8 px per degree, 12 + 2 land rings, 20 river lines
    site2/src/basemap.js: 25 KB
    ```

    Suma `basemap.js` w suchej próbie: `8636883609b65666e278c5949314833d3ac9da0f4db0861a343fb8357200c00e` (25 510 B).

- [ ] **Krok 6: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 641 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 768 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 901 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1100 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; każda sonda kończy się `done, all checks ok` i kodem 0.

- [ ] **Krok 7: Commit**

```bash
git add site2/src/basemap.js site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/phongnha.js site2/src/costs.js site2/src/page.js site2/src/panels.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/template.html site2/src/travel.js site2/src/ui.js tests/data.test.js tests/page.test.js tests/probes/before.js
git commit -F - <<'EOF'
Phong Nha: dane, sezon i klimat, lotnisko Đồng Hới, treść z Hang Én na dwa dni, ceny, rezerwacje i zdjęcia; testy danych czytają research miejsc etapu 3; kadr środka mapy od 18,4° N, strzałka drogi do innego kadru z „→”; sonda before.js porównuje budżet przed zamianą i po niej w euro, bo krótsza pętla Cao Bằng oszczędza mniej niż zaokrąglenie do 100 zł

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Cúc Phương

Drugie nowe miejsce, z `research/cucphuong-2026-10.md` i zmian 7–11 z researchu:
- **dane:**
  - `cucphuong` na osi 20,25, noce [1, 2, 2], poziom 1, oceny: przyroda 3, góry 1;
  - sezon `SSSDSSSSSDDS`, klimat jak w Pù Luông (stacja Hòa Bình);
  - drogi do Ninh Bình, Hà Nội, Pù Luông, Cát Bà i Ba Bể oraz z lotnisk Hà Nội i Thọ Xuân, z własnymi tekstami dróg z lotnisk;
- **treść:**
  - pierwszy dzień: ośrodki ratowania naczelnych, żółwi i łuskowców, a wieczorem nocna przejażdżka skrajem lasu;
  - drugi dzień: 20 km w głąb lasu do starych drzew, od 7:00;
  - jedna noc ma własny plan (`solo`), a „Spokojnie” krótsze ścieżki;
  - „Ekstremalnie”: Mây Bạc z obowiązkowym przewodnikiem parku, wyłączony w V–IX;
- **ceny i rezerwacje:** noc 14–34 EUR; nocleg w parku razem z nocną przejażdżką jako jedna linia (`cucphuong.stay`), przewodnik na Mây Bạc i auto do Bống; kolor 15 i pięć zdjęć;
- **mapa:**
  - kadr północy sięga do 19,3° N zamiast 19,6° N, żeby pod Ninh Bình i Cúc Phương zmieściły się etykiety;
  - etykieta pobytu, która nie znajduje miejsca na dwie linie, pokazuje samą nazwę (`oneLine` w `placeLabels`), a dni zostają przy znaczniku;
  - kontury liczy od nowa `geo/make_basemap.py`;
  - sonda `map.js` zna etykietę z jedną linią;
- **liczby trasy:** jednostka najdłuższego dnia jest mniejsza (`<small>`), bo „8½ godz.” wystawało z kafelka od 641 px.

**Pliki:**
- Utwórz: `site2/src/content/cucphuong.js`
- Zmień: `site2/src/places.js`, `site2/src/seasons.js`, `site2/src/climate.js`, `site2/src/travel.js`, `site2/src/content.js` (`AIR_KEYS`), `site2/src/costs.js`, `site2/src/before.js`, `site2/src/photos.js`, `site2/src/ui.js`, `site2/src/page.js` (`placeLabels` z `oneLine`), `site2/src/app.js` (etykieta z jedną linią, jednostka najdłuższego dnia), `site2/src/template.html`, `site2/src/panels.js`, `site2/src/basemap.js` (z `make_basemap.py`), `tests/probes/map.js`
- Testy: `tests/page.test.js`

**Interfejsy:**
- Bierze: `OLD_PLACES`, `DATA_ALL`, `MAPW_ALL`, `stayOf`, `legAll` (zadanie 6).
- Daje: w wynikach `placeLabels` pole `oneLine` (wzięta mniejsza ramka); w elementach etykiety pobytu `oneLine: { w, h }`; etykieta z `oneLine` ma w `lines` tylko nazwę.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/page.test.js` zamień:

```js
eq([panelSize(MAP_PANELS.north).w, panelSize(MAP_PANELS.north).h, panelSize(MAP_PANELS.centre).h, panelSize(MAP_PANELS.south).h], [270, 250, 270, 177],
```

na:

```js
eq([panelSize(MAP_PANELS.north).w, panelSize(MAP_PANELS.north).h, panelSize(MAP_PANELS.centre).h, panelSize(MAP_PANELS.south).h], [270, 270, 270, 177],
```

W `tests/page.test.js` zamień:

```js
  'but a free place wins over one that covers a faint dot');
```

na:

```js
  'but a free place wins over one that covers a faint dot');
var BAND = [{ x: 0, y: 0, w: 300, h: 43 }, { x: 0, y: 57, w: 300, h: 43 }, { x: 0, y: 43, w: 100, h: 14 }];
var one = placeLabels([{ x: 100, y: 50, w: 40, h: 28, gx: 10, gy: 10, oneLine: { w: 40, h: 14 } }, { x: 100, y: 50, w: 40, h: 28, gx: 10, gy: 10 }], BAND, B);
eq([spots(one), one[0].oneLine, one[1].oneLine], [[['start', 110, 43, true], ['start', 110, 36, false]], true, false],
  'a stay with no free place for its two lines: its name alone where one line is free; a label without oneLine keeps its size');
```

W `tests/page.test.js` zamień:

```js
eq([mA.panels[1].y, mA.panels[2].y, mA.height], [266, 552, 729], 'the panels one under another, 16 px apart');
```

na:

```js
eq([mA.panels[1].y, mA.panels[2].y, mA.height], [286, 572, 749], 'the panels one under another, 16 px apart');
```

W `tests/page.test.js` zamień:

```js
  'a way to another panel: a road with an arrow (Phong Nha to Pù Luông), a flight with ✈ (Đồng Hới to Hà Nội)');
```

na:

```js
  'a way to another panel: a road with an arrow (Phong Nha to Pù Luông), a flight with ✈ (Đồng Hới to Hà Nội)');
// Cúc Phương: one night has its own plan; Mây Bạc with a park guide at level 3, outside the rainy season; the park's
// rooms are booked with the night drive
function cp(n, level, months) { return stopDays(CONTENT.cucphuong, { n: n, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([cp(1, 2, [10, 10]).length, cp(2, 3, [10, 10]), cp(2, 3, [6, 6]), cp(2, 1, [10, 10])], [1, ['-', 'hard'], ['-', '-'], ['-', 'easy']],
  'Cúc Phương: one night, its own plan; Mây Bạc at level 3 in November, not in July (the rainy season); the short paths at level 1');
var tCP = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 11, days: 8, interests: ['przyroda'], level: 3, add: ['cucphuong'] }), kCP = bookList(tCP.r, plansAll(tCP), [], BOOKD);
eq([stayOf(tCP, 'cucphuong'), kCP.map(function (e) { return e.key; }).filter(function (k) { return /^cucphuong/.test(k); }),
  kCP.filter(function (e) { return e.key === 'cucphuong.stay'; })[0].items],
  [{ n: 2, days: ['-', 'hard'] }, ['cucphuong.stay', 'cucphuong.maybac', 'cucphuong.car'], ['cucphuong.night']],
  'nature in November at level 3: two nights in Cúc Phương; the rooms of the park are booked with the night drive (a week), then the guide to Mây Bạc and the car to Bống');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: the panels: MAP_WIDTH wide, as high as their latitudes at that scale: got [270,250,270,177], want [270,270,270,177]
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
      '<li><b>' + approx(k.longest).replace('≈ ', '') + '</b><span>' + T('f.longest') + '</span></li>' +
```

na:

```js
      // the longest day: its number large and its unit small, so the widest (8½ godz.) fits its tile (tests/probes/before.js)
      '<li><b>' + approx(k.longest).replace('≈ ', '').replace(' ' + T('h'), '') + '<small>\u00a0' + T('h') + '</small></b><span>' + T('f.longest') + '</span></li>' +
```

W `site2/src/app.js` zamień:

```js
        '<text class="m-sub" x="' + r1(l.x) + '" y="' + r1(l.y + 24.75) + '" text-anchor="' + l.anchor + '">' + esc(l.lines[1]) + '</text>';
```

na:

```js
        (l.lines[1] ? '<text class="m-sub" x="' + r1(l.x) + '" y="' + r1(l.y + 24.75) + '" text-anchor="' + l.anchor + '">' + esc(l.lines[1]) + '</text>' : '');
```

W `site2/src/before.js` zamień:

```js
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
```

na:

```js
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
  'cucphuong.stay': { ahead: 7, links: [{ name: 'Du lịch Cúc Phương, kontakt', url: 'https://dulichcucphuong.com.vn/contact-us/' }, { name: 'Du lịch Cúc Phương, noclegi', url: 'https://dulichcucphuong.com.vn/co-so-luu-tru/' }, { name: 'Du lịch Cúc Phương, nocna przejażdżka', url: 'https://dulichcucphuong.com.vn/tour-xe-dien-xem-dom-dom-va-quan-sat-dong-vat-hoang-da-ban-dem-huou-nai-culi/' }] },
```

W `site2/src/before.js` zamień:

```js
  'dalat.langbiang': { ahead: 3, links: [{ name: 'Park Bidoup–Núi Bà, kontakt', url: 'https://bidoupnuiba.gov.vn/lien-he/' }] },
```

na:

```js
  'dalat.langbiang': { ahead: 3, links: [{ name: 'Park Bidoup–Núi Bà, kontakt', url: 'https://bidoupnuiba.gov.vn/lien-he/' }] },
  'cucphuong.maybac': { ahead: 3, links: [{ name: 'Du lịch Cúc Phương, kontakt', url: 'https://dulichcucphuong.com.vn/contact-us/' }, { name: 'Du lịch Cúc Phương, combo z Mây Bạc', url: 'https://dulichcucphuong.com.vn/combo-mot-ngay/' }] },
```

W `site2/src/before.js` zamień:

```js
  'puluong.guide': { ahead: 1, links: [] },
```

na:

```js
  'puluong.guide': { ahead: 1, links: [] },
  'cucphuong.car': { ahead: 1, links: [] },
```

W `site2/src/climate.js` zamień:

```js
  },
  puluong: {
```

na:

```js
  },
  cucphuong: {
    t: [[14, 20.6], [15.6, 21.9], [18.4, 24.9], [21.8, 29.4], [24, 32.9], [25.4, 33.9], [25.5, 33.6], [25.2, 32.8], [24.1, 31.7], [21.4, 29.2], [18.1, 26.1], [14.8, 22.6]],
    rain: [[20.5, 8.6], [14.9, 9.2], [35.1, 11.5], [95.5, 14], [244, 18.1], [269.8, 18.2], [310.6, 18.9], [325, 18.4], [285.5, 14.2], [183.9, 11.5], [55, 7.4], [17.2, 5.8]],
    why: { 1: ['chlod'], 2: ['szaro'], 3: ['szaro'], 5: ['deszcz'], 6: ['deszcz'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 12: ['chlod'] }
  },
  puluong: {
```

W `site2/src/content.js` zamień:

```js
  'THD-ninhbinh': { text: 'r.air_thd', book: false }, 'THD-puluong': { text: 'r.air_puluong', book: true }
```

na:

```js
  'THD-ninhbinh': { text: 'r.air_thd', book: false }, 'THD-puluong': { text: 'r.air_puluong', book: true },
  // Cúc Phương: a car from Nội Bài; from Thọ Xuân a taxi, but the way back is booked through the park
  'HAN-cucphuong': { text: 'r.air_car', book: true }, 'THD-cucphuong': { text: 'r.air_thd', book: true }
```

Utwórz `site2/src/content/cucphuong.js`:

```js
/* Cúc Phương: texts of the place (stage 3, batch A). Facts and sources: research/cucphuong-2026-10.md. Fields: see site2/src/content.js. */
CONTENT.cucphuong = {
  name: 'Park Narodowy Cúc Phương', short: 'Cúc Phương',
  sub: 'Ratowane naczelne, tysiącletnie drzewa i las nocą',
  region: 'north', maps: 'Cuc Phuong National Park, Ninh Binh, Vietnam', pt: [20.25, 105.71], color: 15,
  photos: ['cucphuong_0', 'cucphuong_1', 'cucphuong_2', 'cucphuong_3', 'cucphuong_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['cucphuong.centres', 'cucphuong.night'], t: 'Ratowane naczelne i las nocą', d: 'Zamelduj się w pokoju parku przy bramie albo nad jeziorem Mạc. Po południu ośrodki ratowania, 500 m od kasy: langury Delacoura i z Cát Bà, gibony, lori, żółwie i łuskowce, czynne zwykle do 17:00. Wieczorem nocna przejażdżka melexem po skraju lasu: świetliki, jelenie i lori; zbiórka o 18:30, start o 19:00, a nocujący w parku mają pierwszeństwo.',
      rain: 'muzeum parku i centrum dla zwiedzających są pod dachem, a w ośrodkach ratowania przyda się parasol; o tym, czy nocna przejażdżka pojedzie w ulewie, decyduje park.',
      solo: { pace: 'nature', cost: ['cucphuong.centres', 'cucphuong.night'], t: 'Las nocą i ratowane naczelne rano', d: 'Dotrzyj najpóźniej późnym popołudniem i zamelduj się w pokoju parku przy bramie. O 18:30 zbiórka na nocną przejażdżkę melexem: świetliki, jelenie i lori. Rano od 8:00 ośrodki ratowania, 500 m od kasy: langury Delacoura, gibony i żółwie, a koło 10:30 dalej w drogę.' } },
    { p: 2, o: 2, pace: 'hike', cost: ['cucphuong.car'], pack: ['torch'], t: 'W głąb lasu, do starych drzew', d: 'Rano 20 km autem w głąb lasu do Bống; nocujący w parku wchodzą w głąb lasu od 7:00. Z Bống pętla przez las pierwotny: jaskinia Động Sơn Cung, pięć drzew Chò chỉ i tysiącletnie drzewo Chò, 7 km i 2–3 godziny, bez przewodnika, ale z latarką do jaskini. Po obiedzie krótka ścieżka do 700-letniego Chò chỉ, a w drodze powrotnej jaskinia Động Người Xưa ze śladami ludzi sprzed 7 500 lat. Z lasu wyjdź przed zmrokiem.',
      rain: 'płaska ścieżka do drzew Sấu i krótka do 700-letniego Chò chỉ, bo na mokrym wapieniu jest ślisko, a po południu muzeum parku przy bramie.',
      easy: { pace: 'nature', t: 'Krótkie ścieżki do starych drzew', d: 'Autem do Bống i krótka ścieżka do 700-letniego Chò chỉ, 2 km tam i z powrotem, pół godziny do godziny. W drodze powrotnej jaskinia Động Người Xưa (300 m i ok. 200 schodów) i płaska ścieżka wśród starych drzew Sấu i Đăng, 2 km, ok. godziny.' },
      hard: { pace: 'hike', off: [5, 6, 7, 8, 9], cost: ['cucphuong.car', 'cucphuong.maybac'], t: 'Na Mây Bạc z przewodnikiem parku', d: 'Mây Bạc, najwyższy szczyt parku (648 m): z Bống przewodnik parku prowadzi stromą ścieżką przez las pierwotny i wapienne zbocza, 7 km tam i z powrotem, 4–5 godzin. Przewodnik jest obowiązkowy i trzeba go zamówić w parku z wyprzedzeniem; trasa jest tylko dla dorosłych w dobrej kondycji. Po obiedzie w Bống, jeśli starczy sił, pętla do tysiącletniego drzewa Chò, 7 km i 2–3 godziny. Z lasu wyjdź przed zmrokiem: po 19:00 w głąb lasu wolno wejść tylko na nocną wycieczkę z przewodnikiem. Park prowadzi też dwudniowy biwak w lesie z nocnymi obserwacjami; zapytaj, czy noclegi w lesie są otwarte, bo park wstrzymuje je po ulewach.' } }
  ],
  gem: 'Najstarszy park narodowy Wietnamu, z tysiącletnim drzewem Chò i ośrodkiem, który ratuje najrzadsze naczelne kraju.',
  skip: 'Wycieczka jednodniowa z Hà Nội: ok. 5,5 godziny w aucie i las w najgorętszej porze dnia.',
  instead: 'noc w parku: wieczorem nocna przejażdżka, rano las od 7:00.',
  events: [
    { from: [4, 10], to: [6, 10], t: 'Pora motyli i świetlików: motyle zwykle od drugiego tygodnia kwietnia do końca maja, najwięcej w słoneczne dni po deszczu, a świetliki od końca kwietnia do początku czerwca. Termin przesuwa się z roku na rok, a to szczyt ruchu w parku, więc nocleg zarezerwuj wcześniej.' },
    { from: [5, 1], to: [9, 30], warn: true, pack: ['leeches'], t: 'Pora deszczowa: wapienne zbocza są śliskie, a w lesie są komary i pijawki, więc weź skarpety przeciw pijawkom i środek odstraszający. Przed sztormem albo po ulewach park potrafi wstrzymać noclegi w głębi lasu, więc dzień wcześniej sprawdź komunikat parku.' },
    { from: [12, 1], to: [2, 29], warn: true, t: 'Chłodna pora: od grudnia do lutego noce w lesie są chłodne, a dni bywają szare. Weź ciepłą warstwę na wieczór i na nocną przejażdżkę.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
    phongnha: [21, 55] },
```

na:

```js
    phongnha: [21, 55], cucphuong: [14, 34] },
```

W `site2/src/costs.js` zamień:

```js
    'phongnha.mooc': { pp: [6, 8], group: [7, 14] }
```

na:

```js
    'phongnha.mooc': { pp: [6, 8], group: [7, 14] },
    'cucphuong.centres': { pp: [6, 9], group: [0, 0] },
    'cucphuong.night': { pp: [5, 0], group: [0, 21], book: 'cucphuong.stay' },
    'cucphuong.car': { pp: [0, 0], group: [36, 53] },
    'cucphuong.maybac': { pp: [0, 0], group: [17, 86] }
```

W `site2/src/page.js` zamień:

```js
   else the one that covers least (weighted), or none for an item with drop: true. Returns, in the items' order,
   { x, y (the text's anchor point, at the box's top), anchor, box, clear, cost, alt (0 for the first point, then the
   number of the alts point + 1) } or null. */
function placeLabels(items, obstacles, bounds) {
  var placed = [];
  return items.map(function (it) {
    var w = it.w, h = it.h, gx = it.gx, gy = it.gy, best = null;
```

na:

```js
   else the one that covers least (weighted), or none for an item with drop: true. An item with oneLine ({ w, h }, a
   stay's name alone) that finds no free place tries that smaller box too, and takes it when it is free. Returns, in the
   items' order, { x, y (the text's anchor point, at the box's top), anchor, box, clear, cost, alt (0 for the first point,
   then the number of the alts point + 1), oneLine (the smaller box was taken) } or null. */
function placeLabels(items, obstacles, bounds) {
  var placed = [];
  // the best place for a box of w × h by the item's points: the first free one, else the one that covers least
  function spot(it, w, h) {
    var gx = it.gx, gy = it.gy, best = null;
```

W `site2/src/page.js` zamień:

```js
    });
    var clear = best.hard < 0.01;   // sums of floating point areas: less than 0.01 px² is nothing
```

na:

```js
    });
    return best;
  }
  return items.map(function (it) {
    var best = spot(it, it.w, it.h), one = null;
    if (best.hard >= 0.01 && it.oneLine) one = spot(it, it.oneLine.w, it.oneLine.h);
    if (one && one.hard < 0.01) best = one;
    var clear = best.hard < 0.01;   // sums of floating point areas: less than 0.01 px² is nothing
```

W `site2/src/page.js` zamień:

```js
      clear: clear, cost: best.cost, alt: best.alt };
```

na:

```js
      clear: clear, cost: best.cost, alt: best.alt, oneLine: best === one };
```

W `site2/src/page.js` zamień:

```js
   none covers another, a marker or the edge (a stub gets longer or turns when its label finds no room); a label that
```

na:

```js
   none covers another, a marker or the edge (a stub gets longer or turns when its label finds no room, a stay's label
   keeps its name alone when its two lines find none); a label that
```

W `site2/src/page.js` zamień:

```js
        toward: q[0] > p.w - 70 ? [-1, 0] : q[0] < 70 ? [1, 0] : null,   // near a side of the panel, the label tries inward first
```

na:

```js
        toward: q[0] > p.w - 70 ? [-1, 0] : q[0] < 70 ? [1, 0] : null,   // near a side of the panel, the label tries inward first
        oneLine: { w: textWidth(m.content[k].short, NAME_PX), h: LINE_H },   // in a crowded place: the name alone, the days stay on the pin
```

W `site2/src/page.js` zamień:

```js
      P.labels.push(Object.assign({}, it.what, l));
```

na:

```js
      P.labels.push(Object.assign({}, it.what, l, l.oneLine ? { lines: it.what.lines.slice(0, 1) } : {}));
```

W `site2/src/panels.js` zamień:

```js
   to Thọ Xuân airport; centre: Phong Nha to Hội An and Mỹ Sơn, with room above Phong Nha for the labels of the ways north
```

na:

```js
   to Thọ Xuân airport, with room under Ninh Bình and Cúc Phương for their labels (stage 3: 19.3° N instead of 19.6); centre: Phong Nha to Hội An and Mỹ Sơn, with room above Phong Nha for the labels of the ways north
```

W `site2/src/panels.js` zamień:

```js
  north: { lon0: 103.45, lat0: 23.45, lon1: 107.6, lat1: 19.6, bar: 'left',
```

na:

```js
  north: { lon0: 103.45, lat0: 23.45, lon1: 107.6, lat1: 19.3, bar: 'left',
```

W `site2/src/photos.js` zamień:

```js
  phongnha_4: { cap: 'Łodzie na rzece Son w Phong Nha', artist: 'Preparetavalise.com', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Phong_Nha_fleuve.jpg' }
```

na:

```js
  phongnha_4: { cap: 'Łodzie na rzece Son w Phong Nha', artist: 'Preparetavalise.com', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Phong_Nha_fleuve.jpg' },
  cucphuong_0: { cap: 'Duk szarołydkowy w ośrodku ratowania naczelnych w Cúc Phương', artist: 'Superbass', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:2024-03-28-Pygathrix_cinerea_-3122.jpg' },
  cucphuong_1: { cap: 'Leśna ścieżka w parku Cúc Phương', artist: 'hds', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Forest_in_Cuc_Phuong_National_Park_(15706323528).jpg' },
  cucphuong_2: { cap: 'Tysiącletnie drzewo Chò w głębi lasu Cúc Phương', artist: 'TomFitzhenry', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Thousand_year_old_tree_in_Cuc_Phuong_National_Park,_Vietnam.jpg' },
  cucphuong_3: { cap: 'Łuskowiec z młodym w ośrodku ratowania łuskowców w Cúc Phương', artist: 'U.S. Government Accountability Office from Washington, DC, United States', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Mother_Pangolin_and_baby_pangolin_-_Pangolin_Rescue_Center,_Cuc_Phuong_National_Park,_Vietnam_(37627416742).jpg' },
  cucphuong_4: { cap: 'Żółw brunatny w ośrodku ratowania żółwi w Cúc Phương', artist: 'Superbass', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:2024-03-29-Manouria_emys-167A3610.jpg' }
```

W `site2/src/places.js` zamień:

```js
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà). nights: [min, ideal, max]; the
```

na:

```js
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà, and Cúc Phương between them). nights: [min, ideal, max]; the
```

W `site2/src/places.js` zamień:

```js
  phongnha:  { axis: 17.6, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
```

na:

```js
  phongnha:  { axis: 17.6, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
  cucphuong: { axis: 20.25, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
```

W `site2/src/seasons.js` zamień:

```js
  phongnha: 'DSDDDSDDZZZS'
```

na:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS'
```

W `site2/src/template.html` zamień:

```html
.facts span { font-size: 13px; color: var(--muted); }
```

na:

```html
.facts span { font-size: 13px; color: var(--muted); }
.facts b small { font-size: 0.6em; }   /* the unit of the longest day */
```

W `site2/src/travel.js` zamień:

```js
  ['catba', 'caobang', 9.5], ['caobang', 'babe', 4.5],
```

na:

```js
  ['catba', 'caobang', 9.5], ['caobang', 'babe', 4.5],
  // Cúc Phương, between Pù Luông and Ninh Bình
  ['ninhbinh', 'cucphuong', 1.25], ['hanoi', 'cucphuong', 2.75], ['HAN', 'cucphuong', 3], ['puluong', 'cucphuong', 2.75], ['THD', 'cucphuong', 2],
  ['catba', 'cucphuong', 5.5], ['babe', 'cucphuong', 7.75],
```

W `site2/src/ui.js` zamień:

```js
  'cost.phongnha.botanic': 'ogród botaniczny w Phong Nha', 'cost.phongnha.mooc': 'potok Nước Moọc',
```

na:

```js
  'cost.phongnha.botanic': 'ogród botaniczny w Phong Nha', 'cost.phongnha.mooc': 'potok Nước Moọc',
  'cost.cucphuong.centres': 'ośrodki ratowania w Cúc Phương', 'cost.cucphuong.night': 'nocna przejażdżka w Cúc Phương', 'cost.cucphuong.car': 'auto do Bống',
  'cost.cucphuong.maybac': 'przewodnik na Mây Bạc',
```

W `site2/src/ui.js` zamień:

```js
  'b.phongnha.tulan': 'Tú Làn w jeden dzień z Oxalis: 1–2 tygodnie wcześniej, w szczycie 3–4 tygodnie.',
```

na:

```js
  'b.phongnha.tulan': 'Tú Làn w jeden dzień z Oxalis: 1–2 tygodnie wcześniej, w szczycie 3–4 tygodnie.',
  'b.cucphuong.stay': 'Nocleg w pokojach parku Cúc Phương, a z nim nocna przejażdżka, na której nocujący mają pierwszeństwo: w parku telefonem, przez Zalo albo e-mailem, 3–7 dni wcześniej, na weekend 1–2 tygodnie, w porze motyli i świetlików 3–4 tygodnie.',
  'b.cucphuong.maybac': 'Przewodnik parku na Mây Bạc: 2–3 dni wcześniej, w szczycie 1–2 tygodnie.',
  'b.cucphuong.car': 'Auto z kierowcą na dzień do Bống: dzień wcześniej, przez park albo nocleg.',
```

- [ ] **Krok 4: Sonda.**

W `tests/probes/map.js` zamień:

```js
      // a label: a stay's name with its days (the two lines as one box), or the text of a stub, a point of interest, a faint dot
      var labels = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) {
        var a = p.querySelector('.m-label').getBoundingClientRect(), b = p.querySelector('.m-sub').getBoundingClientRect();
```

na:

```js
      // a label: a stay's name with its days (the two lines as one box; in a tight spot the name alone), or the text of a stub,
      // a point of interest, a faint dot
      var labels = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) {
        var a = p.querySelector('.m-label').getBoundingClientRect(), sub = p.querySelector('.m-sub'), b = sub ? sub.getBoundingClientRect() : a;
```

- [ ] **Krok 5: Kontury mapy.** Kadr północy w `site2/src/panels.js` zmienił się w kroku 3, więc kontury trzeba policzyć od nowa (`geo/make_basemap.py`, tylko biblioteka standardowa).

  - Dane Natural Earth są w `$TMPDIR/natural-earth` z zadania 6. Jeśli ich nie ma (inna sesja, restart), zapytaj o zgodę i pobierz je jak w zadaniu 6, krok 5.

  - Policz kontury i sprawdź wynik:

    ```bash
    grep -n "north: { lon0: 103.45, lat0: 23.45, lon1: 107.6, lat1: 19.3" site2/src/panels.js
    python3 -I geo/make_basemap.py "$TMPDIR/natural-earth"
    shasum -a 256 site2/src/basemap.js; wc -c < site2/src/basemap.js
    ```

    Oczekiwane: grep znajduje nowy kadr, a skrypt wypisuje (tak było w suchej próbie):

    ```
    north: 270 × 270 px, 65.1 px per degree, 9 + 2 land rings, 5 river lines
    centre: 270 × 270 px, 81.8 px per degree, 1 + 3 land rings, 4 river lines
    south: 270 × 177 px, 47.8 px per degree, 12 + 2 land rings, 20 river lines
    site2/src/basemap.js: 25 KB
    ```

    Suma `basemap.js` w suchej próbie: `404d6e3350014aca758dc0a0d332a09aaa13ed71183f7c76b8d4fb11640bc8f1` (26 030 B).

- [ ] **Krok 6: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 641 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 768 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 901 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1100 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; każda sonda kończy się `done, all checks ok` i kodem 0.

- [ ] **Krok 7: Commit**

```bash
git add site2/src/app.js site2/src/basemap.js site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/cucphuong.js site2/src/costs.js site2/src/page.js site2/src/panels.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/template.html site2/src/travel.js site2/src/ui.js tests/page.test.js tests/probes/map.js
git commit -F - <<'EOF'
Cúc Phương: dane, sezon i klimat, drogi i teksty dróg z lotnisk, treść z Mây Bạc, ceny, rezerwacje (nocleg w parku razem z nocną przejażdżką) i zdjęcia; kadr północy mapy do 19,3° N, etykieta pobytu w ciasnym miejscu skraca się do nazwy (sonda map.js to zna); mniejsza jednostka najdłuższego dnia w liczbach trasy

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: Đà Nẵng z Sơn Trà i reguła `NEAR_H`

Trzecie nowe miejsce, z `research/danang-2026-10.md` i zmian 12–15 z researchu:
- **dane:**
  - `danang` na osi 16,07, między Hội An a Huế, noce [1, 2, 2], poziom 1;
  - sezon `SSDDDSSDSZZS`, klimat jak w Hội An, z własnymi powodami miesięcy;
  - drogi do lotniska Đà Nẵng (15 min), Hội An, Huế i Phong Nha;
- **przełęcz Hải Vân także z Đà Nẵng:**
  - droga Đà Nẵng–Huế ma tekst przełęczy (`r.haivan`) i swoją parę w `SWAPS.haivan.roads`;
  - ma własne pozycje auta i motocykla (`haivan.car_dn`, `haivan.moto_dn`) z rezerwacjami;
- **treść:**
  - dzień przyjazdu: Marmurowe Góry i wieczór nad Hàn;
  - drugi dzień: rano Mỹ Khê, Muzeum Rzeźby Czamskiej, po południu Sơn Trà autem;
  - jedna noc ma własny plan z wczesnym startem;
  - bez trudnego dnia;
  - zdania o lesie i drogach Sơn Trà z komunikatów zarządu;
  - kolor 16 i pięć zdjęć;
- **silnik:** reguła `NEAR_H` (1 h). Miejsce blisko miasta lotniska, które otwiera trasę, idzie tuż po nim, a blisko miasta, które ją zamyka, tuż przed nim. Test kombinacji pilnuje szerzej: każde dwa miejsca na trasie najwyżej godzinę drogi od siebie stoją obok siebie;
- **słowa:** „moście” i „liście” trafiają do `NOT_PLURAL`, listy słów, które tylko wyglądają na liczbę mnogą (test pilnuje, żeby tekst mówił do jednej osoby).

**Pliki:**
- Utwórz: `site2/src/content/danang.js`
- Zmień: `site2/src/places.js`, `site2/src/seasons.js`, `site2/src/climate.js`, `site2/src/travel.js`, `site2/src/content.js` (`ROAD_KEYS`, `SWAPS.haivan`), `site2/src/costs.js`, `site2/src/before.js`, `site2/src/photos.js`, `site2/src/ui.js`, `site2/src/engine.js` (`NEAR_H`)
- Testy: `tests/engine.test.js` (dane zastępcze `NB`), `tests/combos.test.js`, `tests/content.test.js`, `tests/page.test.js`

**Interfejsy:**
- Bierze: `SWAPS.roads` i `swapRoads` (zadanie 2), testy etapu 3 (zadanie 6).
- Daje: `NEAR_H = 1` w `engine.js`; w `SWAPS.haivan.roads` pary `hoian-hue` i `danang-hue`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/combos.test.js` zamień:

```js
      need(i === 0 || node(r.stops[i - 1].id) !== node(x.id), x.id + ' right after a stay in the same place');
```

na:

```js
      need(i === 0 || node(r.stops[i - 1].id) !== node(x.id), x.id + ' right after a stay in the same place');
      // a place near another one on the trip (within NEAR_H by road: Hội An and Đà Nẵng) stands right next to it
      r.stops.forEach(function (y, j) {
        if (j > i + 1 && node(y.id) !== node(x.id) && DATA.graph.road[node(x.id)][node(y.id)] <= NEAR_H) need(false, x.id + ' and ' + y.id + ' are near each other, but not next to each other');
      });
```

W `tests/content.test.js` zamień:

```js
var NOT_PLURAL = ['aucie', 'nakrycie', 'mieście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
```

na:

```js
var NOT_PLURAL = ['aucie', 'nakrycie', 'mieście', 'moście', 'liście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
```

W `tests/engine.test.js` zamień:

```js
near(rm.score, 7.325, 'its score');
```

na:

```js
near(rm.score, 7.325, 'its score');

/* A place near an airport's city (n, 0.75 h from h, as Đà Nẵng from Hội An) goes right after it on arrival or right
   before it on departure: without the rule (NEAR_H 0) a round trip flies away from h and comes back to n. */
var NB_D = 'DDDDDDDDDDDD';
var NB = { places: {
    h: { axis: 5, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3 } },
    n: { axis: 5.2, nights: [1, 2, 2], level: 1, fit: { przyroda: 3, morze: 3 } },
    s: { axis: 1, nights: [2, 3, 3], level: 1, fit: { przyroda: 3, gory: 3 } },
    t: { axis: 9, nights: [2, 3, 3], level: 1, fit: { przyroda: 3, gory: 3 } } },
  seasons: { h: NB_D, n: NB_D, s: NB_D, t: NB_D }, hubs: { XH: 'h', XS: 's', XT: 't' },
  graph: travelGraph([['XH', 'h', 0.5], ['XH', 'n', 0.25], ['h', 'n', 0.75], ['XS', 's', 0.5], ['XT', 't', 0.5], ['n', 't', 6]], [['XH', 'XS', 1], ['XH', 'XT', 1], ['XS', 'XT', 1.5]]) };
function nbPlan(days, rule) {
  var keep = NEAR_H, st = normSettings({ from: 'XH', to: 'XH', month: 3, days: days, interests: ['przyroda'] }, NB.places, NB.hubs);
  if (!rule) NEAR_H = 0;
  var r = planRoute(st, NB);
  NEAR_H = keep;
  return brief(r);
}
eq([nbPlan(8, false), nbPlan(8, true), nbPlan(5, true)], ['h2 s3 n2', 'h1 s2 t3 h1', 'h2 n2'],
  'a round trip from XH: no way back to n after a flight south (with the rule); n right after h when it fits');
```

W `tests/page.test.js` zamień:

```js
eq(selfSwaps(['caobang', 'haivan'], SWAPS), { places: { caobang: true }, roads: { 'hoian-hue': { text: 'r.haivan_self', cost: 'haivan.moto' } } },
```

na:

```js
eq(selfSwaps(['caobang', 'haivan'], SWAPS), { places: { caobang: true }, roads: { 'hoian-hue': { text: 'r.haivan_self', cost: 'haivan.moto' }, 'danang-hue': { text: 'r.haivan_self', cost: 'haivan.moto_dn' } } },
```

W `tests/page.test.js` zamień:

```js
var MAPW = { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
```

na:

```js
var MAPW = { panels: MAP_PANELS, places: OLD_PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
```

W `tests/page.test.js` zamień:

```js
eq(labelsOf(mapLayout(rPR, stOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 9, interests: [], level: 2 }), MAPW).panels[1], 'stub').sort(), ['→ Pù Luông', '✈ Hà Nội'],
```

na:

```js
var MAPW_ALL = Object.assign({}, MAPW, { places: PLACES });
eq(labelsOf(mapLayout(rPR, stOf({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 9, interests: [], level: 2 }), MAPW_ALL).panels[1], 'stub').sort(), ['→ Pù Luông', '✈ Hà Nội'],
```

W `tests/page.test.js` zamień:

```js
  'nature in November at level 3: two nights in Cúc Phương; the rooms of the park are booked with the night drive (a week), then the guide to Mây Bạc and the car to Bống');
```

na:

```js
  'nature in November at level 3: two nights in Cúc Phương; the rooms of the park are booked with the night drive (a week), then the guide to Mây Bạc and the car to Bống');
// Đà Nẵng: one night has its own early plan; the road to Huế goes over the Hải Vân pass, with a driver or ridden yourself
eq([stopDays(CONTENT.danang, { n: 1, start: 1 }, 0, 2, [3]).map(function (d) { return [d.early, d.cost]; }), segKey({ mode: 'road', from: 'danang', to: 'hue', h: 2.75 }, AIRPORTS, ROAD_KEYS),
  segKey({ mode: 'road', from: 'hue', to: 'danang', h: 2.75 }, AIRPORTS, ROAD_KEYS, selfSwaps(['haivan'], SWAPS).roads)],
  [[[true, ['danang.sontra']]], ['r.haivan', {}], ['r.haivan_self', {}]], 'Đà Nẵng: the one-night plan starts at dawn; Đà Nẵng to Huế over the pass, ridden yourself either way');
var rDH = { days: 5, stops: [{ id: 'danang', n: 2, start: 1, end: 2, leg: legAll('DAD', 'danang', true) }, { id: 'hue', n: 2, start: 3, end: 4, leg: legAll('danang', 'hue') }],
  home: legAll('hue', 'DAD', true) };
var pDH = [stopDays(CONTENT.danang, rDH.stops[0], 0, 2, [3, 3, 3, 3, 3]), stopDays(CONTENT.hue, rDH.stops[1], 0, 2, [3, 3, 3, 3, 3])];
function keysOfB(b) { return b.items.map(function (x) { return x.key; }).filter(function (k) { return /^haivan/.test(k); }); }
eq([keysOfB(tripBudget(rDH, pDH, [], BUDR)), keysOfB(tripBudget(rDH, pDH, ['haivan'], BUDR)), keysOf(bookList(rDH, pDH, [], BOOKD)).indexOf('haivan.car_dn') > -1],
  [['haivan.car_dn'], ['haivan.moto_dn'], true], 'Đà Nẵng to Huế: the car over the pass from Đà Nẵng, or the motorbike ridden yourself; the car on the list of what to book');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/engine.test.js`, ostatnie linie wyniku:

```
Exception: ReferenceError: Can't find variable: NEAR_H
```

- [ ] **Krok 3: Kod.**

W `site2/src/before.js` zamień:

```js
  'haivan.car': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/hoi-an-hue-private-car/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
```

na:

```js
  'haivan.car': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/hoi-an-hue-private-car/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
  'haivan.car_dn': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/da-nang-to-hue-private-car-hai-van-pass/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
  'haivan.moto_dn': { ahead: 3, links: [{ name: 'Hidden Land Travel', url: 'https://hiddenlandtravel.com/rental/da-nang-to-hue-motorbike-rental/' }, { name: 'Tigit Motorbikes', url: 'https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike' }] },
```

W `site2/src/before.js` zamień:

```js
  'babe.boat': { ahead: 0, links: [] },
```

na:

```js
  'babe.boat': { ahead: 0, links: [] },
  'danang.sontra': { ahead: 0, links: [{ name: 'Grab, wynajem na godziny', url: 'https://www.grab.com/vn/transport/rent/' }, { name: 'Hoi An Transport Service, przejazdy z Đà Nẵng', url: 'https://hoiantransportservice.com/private-car-with-driver-from-da-nang/' }] },
```

W `site2/src/climate.js` zamień:

```js
    why: { 6: ['upal'], 7: ['upal'], 9: ['deszcz'], 10: ['ulewy', 'powodzie'], 11: ['ulewy', 'powodzie'], 12: ['deszcz'] }
```

na:

```js
    why: { 6: ['upal'], 7: ['upal'], 9: ['deszcz'], 10: ['ulewy', 'powodzie'], 11: ['ulewy', 'powodzie'], 12: ['deszcz'] }
  },
  danang: {
    t: [[19.3, 25], [20.2, 26.2], [21.8, 28.3], [23.8, 31], [25.2, 33.3], [26, 34.5], [25.7, 34.4], [25.6, 33.9], [24.5, 31.8], [23.5, 29.5], [22.1, 27.4], [20, 25.1]],
    rain: [[81.9, 12], [23.6, 5.6], [25, 4.8], [35.3, 5.4], [81, 9.2], [82.6, 8.1], [92.5, 9.4], [141, 11.6], [351, 14.6], [628, 20], [448, 20.3], [218, 18.7]],
    why: { 1: ['morze', 'fale'], 2: ['morze', 'fale'], 6: ['upal'], 7: ['upal'], 9: ['deszcz'], 10: ['ulewy', 'powodzie'], 11: ['ulewy', 'tajfuny'], 12: ['deszcz', 'fale'] }
```

W `site2/src/content.js` zamień:

```js
var ROAD_KEYS = { 'cattien-dalat': 'r.car_baoloc', 'hoian-hue': 'r.haivan' };
```

na:

```js
var ROAD_KEYS = { 'cattien-dalat': 'r.car_baoloc', 'hoian-hue': 'r.haivan', 'danang-hue': 'r.haivan' };
```

W `site2/src/content.js` zamień:

```js
  haivan: { roads: { 'hoian-hue': { text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } } } }
```

na:

```js
  haivan: { roads: { 'hoian-hue': { text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } },
    'danang-hue': { text: 'r.haivan_self', cost: { driver: 'haivan.car_dn', self: 'haivan.moto_dn' } } } }
```

Utwórz `site2/src/content/danang.js`:

```js
/* Đà Nẵng with the Sơn Trà peninsula: texts of the place (stage 3, batch A). Facts and sources: research/danang-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.danang = {
  name: 'Đà Nẵng i półwysep Sơn Trà', short: 'Đà Nẵng',
  sub: 'Duki czerwononogie na Sơn Trà, plaża Mỹ Khê i Marmurowe Góry',
  region: 'centre', maps: 'My Khe Beach, Da Nang, Vietnam', pt: [16.06, 108.25], color: 16,
  photos: ['danang_0', 'danang_1', 'danang_2', 'danang_3', 'danang_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Marmurowe Góry i wieczór nad Hàn', d: 'Marmurowe Góry (Ngũ Hành Sơn) na południe od centrum: na Thủy Sơn schodami albo windą, jaskinia Huyền Không i widok z Vọng Giang Đài, czynne 7:00–17:30. Wieczorem kolacja nad rzeką Hàn, a w sobotę i niedzielę o 21:00 Smoczy Most zieje ogniem i wodą.',
      rain: 'w Muzeum Rzeźby Czamskiej (7:00–17:00) zamiast na śliskich schodach Marmurowych Gór.',
      solo: { pace: 'nature', early: true, cost: ['danang.sontra'], t: 'Wieczór nad Hàn i Sơn Trà rano', d: 'Wieczorem kolacja nad rzeką Hàn, a w sobotę i niedzielę o 21:00 pokaz na Smoczym Moście. O świcie kąpiel na Mỹ Khê, gdy dyżurują ratownicy, a od 7:30 autem na Sơn Trà: droga na Bàn Cờ, z której wypatrujesz duków, i pagoda Linh Ứng. Koło 10:00 dalej w drogę.' } },
    { p: 2, o: 2, pace: 'nature', early: true, cost: ['danang.sontra'], t: 'Świt na Mỹ Khê i duki z Sơn Trà', d: 'Rano kąpiel na Mỹ Khê, póki dyżurują ratownicy, tylko między flagami. Przed południem Muzeum Rzeźby Czamskiej. Po południu autem z kierowcą, np. Grab na godziny, na półwysep Sơn Trà: od ulicy Yết Kiêu na Bàn Cờ, w dół do Bãi Bắc, pieszo do starego banianu Cây đa di sản, a na koniec pagoda Linh Ứng z posągiem Bodhisattwy. W koronach drzew przy drodze wypatruj duków czerwononogich: zatrzymaj auto i patrz w górę, ale do lasu nie wchodź i zwierząt nie karm. Drogi są otwarte 7:30–17:30, a od marca do września do 18:30; przy ulewach zarząd je zamyka.',
      rain: 'muzeum i miasto, a na Sơn Trà nie jedź: przy ulewach zarząd zamyka drogi na półwysep, czasem na kilka dni.' }
  ],
  gem: 'Cây đa di sản: stary banian na Sơn Trà, do którego od skrzyżowania przy Bãi Bắc dochodzi się już tylko pieszo.',
  skip: '„Trekkingi” i „safari z dukami” w głąb lasu Sơn Trà, sprzedawane na ulicy i w sieci: bez zgody zarządu wejście do lasu jest nielegalne.',
  instead: 'duki wypatrywane z dozwolonych dróg półwyspu w godzinach otwarcia.',
  events: [
    { from: [3, 25], to: [6, 30], t: 'Na Sơn Trà kwitną lim xẹt przy ulicy Yết Kiêu (od końca marca do czerwca) i thàn mát (w kwietniu i maju). Duki schodzą wtedy po kwiaty i młode liście, więc łatwiej je wypatrzyć.' },
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory deszczowej i burz: przy ulewach zarząd zamyka drogi na Sơn Trà, czasem na kilka dni, a morze bywa groźne. Sprawdzaj komunikaty i miej plan w mieście.' },
    { from: [12, 1], to: [3, 14], warn: true, t: 'Poza sezonem kąpielowym ratownicy na plażach dyżurują w mniejszym składzie, a monsun północno-wschodni niesie fale i prądy wsteczne. Kąp się tylko przy ratownikach, między flagami.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
    phongnha: [21, 55], cucphuong: [14, 34] },
```

na:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58] },
```

W `site2/src/costs.js` zamień:

```js
    'cucphuong.maybac': { pp: [0, 0], group: [17, 86] }
```

na:

```js
    'cucphuong.maybac': { pp: [0, 0], group: [17, 86] },
    'danang.sontra': { pp: [0, 0], group: [22, 52] },
    'haivan.car_dn': { pp: [0, 0], group: [43, 98] },
    'haivan.moto_dn': { pp: [25, 32], group: [0, 0] }
```

W `site2/src/engine.js` zamień:

```js
var FORCE_BONUS = 1000;   // a place added by hand outweighs everything else
```

na:

```js
var FORCE_BONUS = 1000;   // a place added by hand outweighs everything else
var NEAR_H = 1;           // a place this close by road to an airport's city (Đà Nẵng to Hội An) goes right next to it
```

W `site2/src/engine.js` zamień:

```js
   goes when its node is removed.
```

na:

```js
   goes when its node is removed. A place within NEAR_H by road of the city that opens the trip comes right after it,
   and one near the city that closes it right before it, so a trip never comes back to the airport's neighbourhood
   (Hội An, a flight away, then Đà Nẵng).
```

W `site2/src/engine.js` zamień:

```js
  function depart(id) { var h = G.road[node(id)][st.to]; return !P[id].node && h <= END_LEG_H ? legCost(h) : null; }
```

na:

```js
  function depart(id) { var h = G.road[node(id)][st.to]; return !P[id].node && h <= END_LEG_H ? legCost(h) : null; }
  // two places within NEAR_H by road of each other (a city of an airport and its neighbour), a and b both set
  function near(a, b) { return !!a && !!b && node(a) !== node(b) && G.road[node(a)][node(b)] <= NEAR_H; }
```

W `site2/src/engine.js` zamień:

```js
      for (i = 0; i < j; i++) {
```

na:

```js
      for (i = 0; i < j; i++) {
        // a place near the city that opens the trip comes right after it, one near the city that closes it right before it
        if (near(first, id) || near(last, order[i])) continue;
```

W `site2/src/photos.js` zamień:

```js
  cucphuong_4: { cap: 'Żółw brunatny w ośrodku ratowania żółwi w Cúc Phương', artist: 'Superbass', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:2024-03-29-Manouria_emys-167A3610.jpg' }
```

na:

```js
  cucphuong_4: { cap: 'Żółw brunatny w ośrodku ratowania żółwi w Cúc Phương', artist: 'Superbass', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:2024-03-29-Manouria_emys-167A3610.jpg' },
  danang_0: { cap: 'Samica duka czerwononogiego z młodym na półwyspie Sơn Trà', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Red-shanked_douc_langur_(Pygathrix_nemaeus)_female_and_juvenile_Son_Tra.jpg' },
  danang_1: { cap: 'Łódki-kosze na plaży Mỹ Khê', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Coracles_in_Da_Nang_1.jpg' },
  danang_2: { cap: 'Jaskinia Huyền Không w Marmurowych Górach', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Huyen_Khong_Cave_1.jpg' },
  danang_3: { cap: 'Droga Hoàng Sa na półwyspie Sơn Trà', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Ho%C3%A0ng_Sa_Road,_Son_Tra_Peninsula.jpg' },
  danang_4: { cap: 'Sala Muzeum Rzeźby Czamskiej w Đà Nẵng', artist: 'Daderot', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Interior_view_-_Museum_of_Cham_Sculpture_-_Danang,_Vietnam_-_DSC01931.JPG' }
```

W `site2/src/places.js` zamień:

```js
  hoian:     { axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
```

na:

```js
  hoian:     { axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
  danang:    { axis: 16.07, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 2, gory: 1, morze: 2 } },
```

W `site2/src/seasons.js` zamień:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS'
```

na:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS'
```

W `site2/src/travel.js` zamień:

```js
  ['DAD', 'hoian', 0.75], ['DAD', 'hue', 2.5], ['HUI', 'hue', 0.5], ['hoian', 'hue', 3.25],
```

na:

```js
  ['DAD', 'hoian', 0.75], ['DAD', 'hue', 2.5], ['HUI', 'hue', 0.5], ['hoian', 'hue', 3.25],
  // Đà Nẵng with Sơn Trà, between Hội An and Huế (its road to Huế goes over the Hải Vân pass)
  ['DAD', 'danang', 0.25], ['hoian', 'danang', 0.75], ['danang', 'hue', 2.75], ['danang', 'phongnha', 5.75],
```

W `site2/src/ui.js` zamień:

```js
  'cost.cucphuong.maybac': 'przewodnik na Mây Bạc',
```

na:

```js
  'cost.cucphuong.maybac': 'przewodnik na Mây Bạc',
  'cost.danang.sontra': 'auto na Sơn Trà', 'cost.haivan.car_dn': 'auto przez przełęcz Hải Vân z Đà Nẵng', 'cost.haivan.moto_dn': 'motocykl przez przełęcz Hải Vân z Đà Nẵng',
```

W `site2/src/ui.js` zamień:

```js
  'b.phongnha.tulan': 'Tú Làn w jeden dzień z Oxalis: 1–2 tygodnie wcześniej, w szczycie 3–4 tygodnie.',
```

na:

```js
  'b.phongnha.tulan': 'Tú Làn w jeden dzień z Oxalis: 1–2 tygodnie wcześniej, w szczycie 3–4 tygodnie.',
  'b.haivan.car_dn': 'Samochód z kierowcą z Đà Nẵng do Huế przez przełęcz Hải Vân: 1–3 dni wcześniej, na Tết i długie weekendy 1–2 tygodnie.',
  'b.haivan.moto_dn': 'Motocykl w jedną stronę z Đà Nẵng do Huế, z przewozem bagażu: 2–3 dni wcześniej; odbierasz go w biurze wypożyczalni.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 641 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 768 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 901 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1100 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; każda sonda kończy się `done, all checks ok` i kodem 0.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/danang.js site2/src/costs.js site2/src/engine.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/ui.js tests/combos.test.js tests/content.test.js tests/engine.test.js tests/page.test.js
git commit -F - <<'EOF'
Đà Nẵng z Sơn Trà: dane, sezon i klimat, drogi, przełęcz Hải Vân także z Đà Nẵng (SWAPS.roads), treść, ceny, rezerwacje i zdjęcia; silnik: miejsce najwyżej godzinę drogi od miasta lotniska stoi tuż przy nim (NEAR_H), a test kombinacji pilnuje, by bliskie miejsca stały obok siebie

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 9: Punkt kontrolny planu 1

Sprawdzenie całości przed planem 2 (ustalenie 19). Sprawdzasz:
- pełny test, wszystkie sondy, linki i wydruk;
- raport tras i liczby: zygzaki, dni z dwoma lotami, Cát Bà na 4 noce, trzy pobyty w Hà Nội, udział nowych miejsc;
- zrzuty sześciu ustawień;
- ręcznie to, czego Chrome bez okna nie pokaże;
- prawdziwy telefon;
- całość razem z użytkownikiem.

Poprawki z przeglądu idą jako osobne commity (test, kod, `ALL PASS`, commit), a wynik przeglądu trafia do notatek w zadaniu 10.

**Pliki:**
- Jeśli przegląd niczego nie wykaże, w repo przybywa tylko raport tras `notes/raport-tras-RRRR-MM-DD.md`; commit razem z notatkami w zadaniu 10.
- Zrzuty, PDF-y i liczby idą do `$TMPDIR/wietnam-3a1/`.
- Do ręcznego sprawdzenia powstaje na chwilę `.claude/launch.json` (lokalny serwer); krok 7 go usuwa.

- [ ] **Krok 1: Pełny test i build**

```bash
time bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS` w ok. 70 s; build bez błędów; grep nic nie wypisuje.

- [ ] **Krok 2: Wszystkie sondy**

```bash
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 641 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 768 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 901 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1100 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/before.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
```

Oczekiwane: każda sonda kończy się `done, all checks ok` i kodem 0.

- [ ] **Krok 3: Linki**

```bash
bash tools/links.sh
```

Oczekiwane: ostatnia linia `links.sh: all addresses answer` i kod 0 (w suchej próbie 46 adresów, wszystkie 200). Adres, który nie odpowiada 2xx, otwórz w przeglądarce, a zepsuty link zgłoś użytkownikowi. Nowy link trafia najpierw do researchu.

- [ ] **Krok 4: Wydruk trzech tras**

```bash
mkdir -p "$TMPDIR/wietnam-3a1"
bash tests/print.sh 'od=DAD&do=SGN&miesiac=2027-12&dni=30&co=przyroda&poziom=3' "$TMPDIR/wietnam-3a1/d1.pdf"
bash tests/print.sh 'od=DAD&do=SGN&miesiac=2027-12&dni=30&co=przyroda&poziom=3' "$TMPDIR/wietnam-3a1/d1-ciemny.pdf" dark
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-03&dni=14&co=przyroda,gory&poziom=2' "$TMPDIR/wietnam-3a1/d2.pdf"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-03&dni=14&co=przyroda,gory&poziom=2' "$TMPDIR/wietnam-3a1/d2-ciemny.pdf" dark
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' "$TMPDIR/wietnam-3a1/d3.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' "$TMPDIR/wietnam-3a1/d3-ciemny.pdf" dark
```

Oczekiwane: przy każdym pliku `covered text lines: 0`. W suchej próbie wyszło 22, 14 i 14 stron, w obu motywach tyle samo.

- [ ] **Krok 5: Raport tras i liczby do przeglądu**

Raport przykładowych tras (16 ustawień z `tools/report.js`) trafia do `notes/` i do commita w zadaniu 10:

```bash
bash tools/report.sh > "notes/raport-tras-$(date +%Y-%m-%d).md"
```

Liczby ze wszystkich 134 784 kombinacji (ok. 35 s):

```bash
mkdir -p "$TMPDIR/wietnam-3a1"
cat > "$TMPDIR/wietnam-3a1/przeglad.js" <<'EOF'
// For the review at the checkpoint: over every combination, how often each place is on a trip (all trips, trips with no
// interest), its mean nights, and the things notes/etapy.md asks to look at: a travel day with two flights, Cát Bà for
// 4 nights, Hà Nội three times on one trip, two places at most 1.5 h apart by road that are not next to each other.
var DA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function node(id) { return PLACES[id].node || id; }
var sets = [[]];
INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
var total = 0, plain = 0, on = {}, onPlain = {}, nights = {}, twoFlights = 0, catba = 0, catba4 = 0, hanoi3 = 0, apart = 0;
sets.forEach(function (interests) { LEVELS.forEach(function (level) { for (var month = 1; month <= 12; month++) for (var days = MIN_DAYS; days <= MAX_DAYS; days++)
  Object.keys(HUBS).forEach(function (from) { Object.keys(HUBS).forEach(function (to) {
    var st = normSettings({ from: from, to: to, month: month, days: days, interests: interests, level: level }, PLACES, HUBS), r = planRoute(st, DA);
    if (!r.ok) return;
    total++; if (!interests.length) plain++;
    var seen = {}, legs = r.stops.map(function (x) { return x.leg; }).concat([r.home]), ids = r.stops.map(function (x) { return node(x.id); });
    r.stops.forEach(function (x) {
      nights[x.id] = (nights[x.id] || 0) + x.n;
      if (x.id === 'catba') { catba++; if (x.n === 4) catba4++; }
      if (seen[x.id]) return;
      seen[x.id] = true; on[x.id] = (on[x.id] || 0) + 1; if (!interests.length) onPlain[x.id] = (onPlain[x.id] || 0) + 1;
    });
    if (legs.some(function (L) { return L.flights >= 2; })) twoFlights++;
    if (ids.filter(function (id) { return id === 'hanoi'; }).length >= 3) hanoi3++;
    if (ids.some(function (a, i) { return ids.some(function (b, j) { return j > i + 1 && a !== b && DA.graph.road[a][b] <= 1.5; }); })) apart++;
  }); }); }); });
function pc(n, of) { return (100 * n / of).toFixed(1).replace('.', ',') + '%'; }
print('Tras: ' + total + ' (bez zainteresowań: ' + plain + ')');
print('| Miejsce | Na trasach | Bez zainteresowań | Średnio nocy |');
print('|---|---|---|---|');
Object.keys(on).sort(function (a, b) { return on[b] - on[a]; }).forEach(function (id) {
  print('| ' + (CONTENT[id] ? CONTENT[id].short : id) + (PLACES[id].node ? ' (noc w drodze)' : '') + ' | ' + pc(on[id], total) + ' | ' + pc(onPlain[id] || 0, plain) + ' | ' + (nights[id] / on[id]).toFixed(2).replace('.', ',') + ' |');
});
print('Dzień z dwoma lotami: ' + pc(twoFlights, total) + ' tras. Cát Bà na 4 noce: ' + pc(catba4, catba) + ' pobytów w Cát Bà. Hà Nội trzy razy: ' + hanoi3 + ' tras. Miejsca do 1,5 h drogi od siebie, nie obok siebie: ' + apart + ' tras.');
EOF
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
P=site2/src
"$J" $P/places.js $P/seasons.js $P/travel.js $P/engine.js $P/content.js $P/content/*.js "$TMPDIR/wietnam-3a1/przeglad.js" > "$TMPDIR/wietnam-3a1/przeglad.md"
cat "$TMPDIR/wietnam-3a1/przeglad.md"
```

Oczekiwane, jak w suchej próbie (w nawiasie przed planem 1):
- Đà Nẵng na 42,1% tras (54,1% tras bez zainteresowań), Phong Nha na 35,6%, Cúc Phương na 24,8%;
- Cao Bằng na 5,9% (11,7%), Ba Bể na 6,3% (12,5%), Cát Tiên na 16,6% (23,6%);
- dzień z dwoma lotami: 11,2% tras (8,6%); nowy to Đà Lạt ↔ Đồng Hới przez Hồ Chí Minh City, 7,25 h;
- Cát Bà na 4 noce: 74,0% pobytów (77,9%);
- Hà Nội trzy razy: 432 trasy (1257);
- miejsca najwyżej 1,5 h drogi od siebie, a nie obok siebie: 0 tras (0).

Jeśli poprawki z kroku 9 zmienią dane albo silnik, policz liczby jeszcze raz i opisz zmianę w wyniku przeglądu.

- [ ] **Krok 6: Zrzuty sześciu ustawień**

Zrzuty idą na 390 px (trzy także na 1400 px), na całą wysokość strony, i są cięte na kawałki do oglądania:

```bash
mkdir -p "$TMPDIR/wietnam-3a1"
i=1
for s in \
  'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=gory,przyroda&poziom=3' \
  'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2&motocykl=haivan' \
  'od=DAD&do=HAN&miesiac=2027-04&dni=10&co=morze,przyroda&poziom=2' \
  'od=SGN&do=HAN&miesiac=2027-03&dni=11&co=przyroda,gory&poziom=2' \
  'od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1' \
  'od=DAD&do=SGN&miesiac=2027-12&dni=30&co=przyroda&poziom=3'; do
  if [ $i -eq 6 ]; then hp=34000; hd=25000; else hp=29000; hd=21000; fi
  bash tests/shot.sh "$s" 390 "$TMPDIR/wietnam-3a1/z$i-390.png" $hp
  case $i in 1|5|6) bash tests/shot.sh "$s" 1400 "$TMPDIR/wietnam-3a1/z$i-1400.png" $hd ;; esac
  i=$((i+1))
done
python3 - "$TMPDIR/wietnam-3a1" <<'EOF'
# cuts each long screenshot into pieces 2400 px high, to look at with Read: kawalki/z1-390-00.png, z1-390-01.png, …
import glob, os, sys
from PIL import Image
d = sys.argv[1]
os.makedirs(os.path.join(d, 'kawalki'), exist_ok=True)
for p in sorted(glob.glob(os.path.join(d, 'z*.png'))):
    im = Image.open(p)
    name = os.path.basename(p)[:-4]
    for n, y in enumerate(range(0, im.height, 2400)):
        im.crop((0, y, im.width, min(y + 2400, im.height))).save(os.path.join(d, 'kawalki', '%s-%02d.png' % (name, n)))
EOF
```

Strona przy 390 px ma ok. 19 600–32 300 px wysokości, a przy 1400 px ok. 13 600–22 700 px (najwyższa jest z6, 30 dni); białe kawałki pod końcem strony pomiń. Obejrzyj kawałki narzędziem Read i sprawdź:
- **z1** (Hà Nội → Đà Nẵng, 12 dni, góry i przyroda, „Ekstremalnie”, marzec):
  - liczby trasy: „7½ godz.” z mniejszą jednostką, kwota w kafelku;
  - mapa przy 1400 px: Cúc Phương, „✈ Đồng Hới” w kadrze północy, strzałki lotów przy Phong Nha;
  - Cúc Phương: dzień 2 to Mây Bạc z plakietką „Trudny dzień”;
  - Phong Nha: dni 4–5 to Hang Én (noc w jaskini, potem drugi dzień z plakietką), dzień 6 to Tú Làn;
  - karta przejazdu Phong Nha → Đà Lạt: dwa loty przez Hồ Chí Minh City i „Długi dzień w drodze”;
  - „Przed wyjazdem”: Hang Én na początku rezerwacji, strój kąpielowy w pakowaniu.
- **z2** (Hồ Chí Minh City → Hà Nội, 15 dni, Hải Vân samodzielnie):
  - Hội An i Đà Nẵng stoją obok siebie;
  - karta przejazdu Đà Nẵng → Huế: przełącznik na „Samodzielnie” i tekst „Motocykl wypożyczony w jedną stronę…”;
  - w rezerwacjach motocykl przez przełęcz z Đà Nẵng.
- **z3** (Đà Nẵng → Hà Nội, 10 dni, morze i przyroda, kwiecień):
  - Đà Nẵng: Sơn Trà ze zdaniem, że przy ulewach zarząd zamyka drogi;
  - droga z lotniska do Cúc Phương ma własny tekst;
  - nocleg w parku Cúc Phương z nocną przejażdżką to jedna linia rezerwacji.
- **z4** (Hồ Chí Minh City → Hà Nội, 11 dni, przyroda i góry):
  - Đà Nẵng na jedną noc: wieczór nad Hàn i Sơn Trà rano, potem droga do Phong Nha (5¾ h).
- **z5** (Đà Nẵng → Hồ Chí Minh City, 28.01–14.02.2027, kultura i jedzenie, „Spokojnie”): zygzak z listy „Do etapu 3”. W suchej próbie trasa szła tak: Hội An, lot do Hà Nội, lot do Huế, Đà Lạt, delta Mekongu, Hồ Chí Minh City. Pokaż go użytkownikowi w kroku 9.
- **z6** (Đà Nẵng → Hồ Chí Minh City, 30 dni, przyroda, „Ekstremalnie”, grudzień):
  - najwyższa kwota („7 500–14 700 zł” w suchej próbie) mieści się w kafelku;
  - mapa z dziesięcioma miejscami bez kolizji etykiet.

Na wszystkich zrzutach sprawdź też:
- twardą spację w kwotach i „ok.” z liczbą;
- nazwy, które nie łamią się w środku (Phong Nha, Paradise Cave, Hang Én);
- teksty po polsku i per „ty”.

- [ ] **Krok 7: Ręcznie w przeglądarce: pasek u góry, „Na górę”, mapa i przełącznik z klawiatury.** Chrome bez okna nie uruchamia IntersectionObserver, a wbudowana przeglądarka nie otwiera `file://`, więc strona idzie z lokalnego serwera.
  - Utwórz `.claude/launch.json`:

    ```json
    {
      "version": "0.0.1",
      "configurations": [
        { "name": "strona-3a1", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765", "--directory", "site2/out/pages"], "port": 8765 }
      ]
    }
    ```

  - Uruchom serwer narzędziem `preview_start` (nazwa `strona-3a1`) i przejdź do `http://localhost:8765/#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2&motocykl=haivan`.
  - Ustaw widok `mobile` (`resize_window`) i sprawdź, przewijając i robiąc zrzuty ekranu:
    - pasek u góry, póki formularz jest na ekranie, ma trzy odnośniki: „W skrócie”, „Dzień po dniu”, „Przed wyjazdem”; wszystkie mieszczą się w całości, także przy szerokości 320 px (`resize_window` z `width` 320);
    - gdy formularz zniknie u góry ekranu, pasek pokazuje podsumowanie i „Zmień”;
    - „Na górę” pojawia się po przewinięciu i wraca na górę strony.
  - Ustaw widok `desktop` i sprawdź:
    - przy przewijaniu „Dzień po dniu” mapa podświetla znacznik miejsca, które jest na ekranie;
    - kliknięcie mapy otwiera powiększenie z trzema kadrami, a Escape je zamyka;
    - przełącznik w karcie przejazdu Đà Nẵng → Huế działa z klawiatury: Tab dochodzi do niego, strzałki zmieniają wybór, a fokus zostaje na przełączniku po przebudowie strony.
  - Zatrzymaj serwer (`preview_stop`) i usuń `.claude/launch.json` (oraz pusty katalog `.claude/`, jeśli nic innego w nim nie ma).

- [ ] **Krok 8: Prawdziwy telefon** (z użytkownikiem, w domowej sieci Wi-Fi). Najpierw zapytaj, czy użytkownik ma teraz telefon pod ręką, w tej samej sieci Wi-Fi co Mac. Jeśli tak:
  - podaj adres Maca i uruchom serwer w tle (narzędziem Bash z `run_in_background`):

    ```bash
    ipconfig getifaddr en0
    python3 -m http.server 8766 --bind 0.0.0.0 --directory site2/out/pages
    ```

  - macOS może zapytać, czy `python3` ma przyjmować połączenia przychodzące: to decyzja użytkownika;
  - zanim użytkownik weźmie telefon do ręki, podaj mu od razu dwa gotowe linki z adresem z `ipconfig` i listę stuknięć:
    1. `http://<adres Maca>:8766/#od=HAN&do=DAD&miesiac=2027-03&dni=12&co=gory,przyroda&poziom=3`: pasek u góry mieści trzy odnośniki; mapa: stuknięcie otwiera powiększenie, a krzyżyk je zamyka; w Phong Nha dwa dni Hang Én; w „Przed wyjazdem” Hang Én na początku rezerwacji, a link Oxalis otwiera się w nowej karcie;
    2. `http://<adres Maca>:8766/#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2`: przełącznik w karcie przejazdu Đà Nẵng → Huế dotykiem, potem tekst drogi na motocyklu i ramka; „Kopiuj plan na WhatsApp” z linią budżetu;
  - po sprawdzeniu zatrzymaj serwer.

  Jeśli telefon nie łączy się z Makiem (zapora, sieć dla gości), zaproponuj prywatny artifact; publikacja tylko po wyraźnym „tak” użytkownika: publish z `file_path = site2/out/web/index.html` i `files` = obrazy z `site2/out/web/img/`.

- [ ] **Krok 9: Przegląd z użytkownikiem**
  - Pokaż użytkownikowi w rozmowie:
    - kawałki zrzutów z kroku 6: z1 (liczby, mapa, Mây Bạc, Hang Én), z2 (przełącznik od strony Đà Nẵng), z3 (Sơn Trà, droga do Cúc Phương), z4 (Đà Nẵng na jedną noc), z5 (zygzak), z6 (najwyższa kwota);
    - tabelę z kroku 5 z liczbami sprzed planu 1;
    - wynik ręcznego sprawdzenia i telefonu.
  - Do decyzji, po jednej sprawie, z rekomendacją (poprawić teraz albo przenieść do planu 2):
    - Đà Nẵng na 42% tras i 54% tras bez zainteresowań, często obok Hội An po 2 noce: zostawić, czy obniżyć ocenę (`fit`) Đà Nẵng w `places.js` i w researchu;
    - Cao Bằng i Ba Bể o połowę rzadziej niż przed planem (ok. 6% tras);
    - nowe dni z dwoma lotami: Đà Lạt ↔ Đồng Hới przez Hồ Chí Minh City (7,25 h);
    - zygzak z z5: Hội An, lot do Hà Nội, lot do Huế.
  - Poprawki idą jako osobne commity: test, który nie przechodzi (gdzie się da), kod, `ALL PASS`, sondy, commit z opisem „Poprawka z punktu kontrolnego 3A1: …”. Zmiana ocen albo danych najpierw trafia do researchu miejsca.
  - Wynik przeglądu zapisz jednym akapitem w `$TMPDIR/przeglad-3a1.txt`. Akapit mówi:
    - co przeszło, z liczbami z kroków 1–5;
    - co obejrzał użytkownik;
    - co poprawiono;
    - co przeszło do planu 2.

    Zadanie 10 wpisze go do `notes/etapy.md` po „Punkt kontrolny planu 1 (…):”.

---

### Zadanie 10: Notatki: status, następny krok i raport tras

**Pliki:**
- Zmień: `notes/etapy.md`, `CLAUDE.md`
- Dodaj: `notes/raport-tras-RRRR-MM-DD.md` (z zadania 9, krok 5)

- [ ] **Krok 1: Zmiany w notatkach.** Skrypt sprawdzono na kopiach plików z 13.10.2026; dał 9 zmian. Bierze:
  - dzisiejszą datę;
  - wynik przeglądu z `$TMPDIR/przeglad-3a1.txt` (zadanie 9, krok 9);
  - najnowszy raport tras z `notes/` (zadanie 9, krok 5).

  Zmienia:
  - `notes/etapy.md`:
    - tabela etapów: etap 3 w toku, plan 1 zrobiony, z linkiem do raportu tras;
    - partia A w sekcji etapu 3: dwa plany, co zrobił plan 1;
    - „Następny krok” to plan 2 partii A. Ma trzy akapity: co zrobił plan 1, wynik punktu kontrolnego i plan 2 (Hà Giang i Sa Pa, sprawy otwarte w researchu). Opis planu 2B przechodzi pod nagłówek „Z planu 2B”, obok „Z planu 2A”;
    - lista „Do etapu 3” bez punktów, które zrobił plan 1. Zostaje to, czego potrzebują plan 2 i partia B, z najszerszą kwotą po planie 1;
    - do audytu przed publikacją (etap 4) dochodzą: research planu 1, komunikaty parków i licencje 15 nowych zdjęć;
  - `CLAUDE.md`: status, plik researchu nowego miejsca, czas pełnego testu.

Uruchom z katalogu repo:

```bash
python3 -I - <<'EOF'
# notes after plan 1 of stage 3, batch A, from the repo's folder; each change asserts its old text once. The date is
# today's, the result of the review comes from $TMPDIR/przeglad-3a1.txt (task 9, step 9) and the route report is the
# newest notes/raport-tras-*.md (task 9, step 5).
import datetime, glob, os
t = datetime.date.today()
D = '%d.%02d.%d' % (t.day, t.month, t.year)
REVIEW = open(os.path.join(os.environ['TMPDIR'], 'przeglad-3a1.txt'), encoding='utf-8').read().strip()
assert REVIEW, 'the review first: task 9, step 9'
REPORTS = sorted(p for p in glob.glob('notes/raport-tras-*.md') if not p.endswith('-2026-10-09.md'))
assert REPORTS, 'the route report first: task 9, step 5'
R = os.path.basename(REPORTS[-1])
e = open('notes/etapy.md', encoding='utf-8').read()
c = open('CLAUDE.md', encoding='utf-8').read()
n = 0
def rep(s, a, b):
    global n
    assert s.count(a) == 1, a[:70]
    n += 1
    return s.replace(a, b)
PLAN = 'plans/2026-10-13-etap-3a1-miejsca.md'
# the table of stages
e = rep(e, '| 3. Nowe miejsca, partiami | |',
  '| 3. Nowe miejsca, partiami | w toku: partia A, plan 1 (Phong Nha, Cúc Phương, Đà Nẵng) zrobiony @DZIEN@, raport tras: [notes/' + R + '](' + R + '); plan 2 (Hà Giang, Sa Pa) do zaplanowania |')
# batch A in the section of stage 3
e = rep(e, '''- **Partia A, najważniejsza dla przygodowych:**
  - Phong Nha: łatwe jaskinie, Hang Én, Tú Làn;
  - Cúc Phương z Vân Long: naczelne;
  - Đà Nẵng z Sơn Trà: red-shanked douc;
  - Hà Giang: pętla z kierowcą albo samodzielnie, z researchem przepisów o motocyklach;
  - Sa Pa z Fansipan.''', '''- **Partia A, najważniejsza dla przygodowych,** w dwóch planach (sesja decyzji 13.10.2026):
  - plan 1 ([''' + PLAN + '''](''' + PLAN + '''), zrobiony @DZIEN@):
    - Phong Nha: łatwe jaskinie, 7 km w Paradise Cave i Tú Làn na jeden dzień, a na „Ekstremalnie” Hang Én na dwa dni;
    - Cúc Phương: naczelne, żółwie i stary las, nocleg w parku (Vân Long zostaje w Ninh Bình);
    - Đà Nẵng z Sơn Trà: duki czerwononogie z dróg półwyspu, plaża Mỹ Khê, Marmurowe Góry;
  - plan 2: Hà Giang (pętla z kierowcą albo samodzielnie, z researchem przepisów o motocyklach) i Sa Pa z Fansipanem.''')
# the next step: what plan 1 did, the checkpoint, plan 2; what 2B did moves under „Z planu 2B”
i = e.index('## Następny krok: etap 3, partia A\n')
j = e.index('**Etap 3, partia A:** najpierw sesja decyzji')
k = e.index('**Do etapu 3 (nowe miejsca):**')
old2b = e[i:j].replace('## Następny krok: etap 3, partia A\n\n', '').rstrip('\n')
assert old2b.startswith('Zrobione 12.10.2026: plan 2B') and old2b.count('\n\n') == 2, old2b[:80]
old2b = rep(old2b, 'Drobniejsze uwagi recenzenta są w listach niżej.', 'Drobniejsze uwagi recenzenta są w listach wyżej, w „Następny krok”.')
e = e[:i] + '''## Następny krok: etap 3, partia A, plan 2

Zrobione @DZIEN@: plan 1 partii A ([''' + PLAN + '''](''' + PLAN + ''')). Na stronie są trzy nowe miejsca, każde z treścią na trzech poziomach, sezonem, klimatem, drogami, cenami, rezerwacjami i zdjęciami, a research każdego stoi we własnym pliku (`research/<id>-2026-10.md`), którego tabele czyta test danych: Phong Nha z lotniskiem Đồng Hới i wyprawą do Hang Én na dwa dni, Cúc Phương z nocną przejażdżką i Mây Bạc, Đà Nẵng z Sơn Trà i przełęczą Hải Vân także od strony Đà Nẵng. Silnik umie trudną wersję na dwa dni (`hard.next`) i stawia miejsce bliskie miastu lotniska tuż przy nim (`NEAR_H`), a zamiany jadą po liście dróg (`SWAPS.roads`). Testy łapią to, czego wcześniej nie miały czym łapać: sezon każdej nocy, tryb dat, znane lotniska, każde miejsce na jakiejś trasie, rezerwacje, pakowanie i wjazd każdej trasy, bliskie miejsca obok siebie. Kadry mapy są wyższe (środek od 18,4° N, północ do 19,3° N), a etykieta pobytu w ciasnym miejscu skraca się do nazwy. Zrobione są też punkty listy „Do etapu 3”, które nie czekały na Hà Giang i Sa Pa.

Punkt kontrolny planu 1 (@DZIEN@): DECYZJE-Z-PRZEGLADU

**Plan 2 partii A: Hà Giang i Sa Pa.** Research jest gotowy ([research/hagiang-2026-10.md](../research/hagiang-2026-10.md), [research/sapa-2026-10.md](../research/sapa-2026-10.md), 13.10.2026). Najpierw krótka sesja decyzji o tym, co research zostawił otwarte, potem plan z suchą próbą na kodzie planu 1, jak w planie 1:
- **Hà Giang:**
  - sezon ze stacji w mieście (`SSSDSZSSSDDS`) albo z modelu dla płaskowyżu (`ZSSSDSSSDSSZ`, z mrozem w styczniu i grudniu);
  - noce [4, 4, 5]: pętla na 3 albo 4 dni (ustalenie 20), bez trudnego dnia;
  - zamiana „Samodzielnie” w `SWAPS` (miejsce, jak Cao Bằng), z motocyklem branym i oddawanym w mieście Hà Giang i z przepisami oraz kontrolami od kwietnia 2026 w ramce;
  - pozwolenie na strefę przygraniczną: stan prawny niejasny;
  - droga Hà Giang – Sa Pa: 6,5 h w notatce o Hà Giang, 5,75 h w notatce o Sa Pa (mediana 6 h); autostrada z Tuyên Quang (otwarcie planowane na 30.10.2026) może skrócić drogę z Hà Nội.
- **Sa Pa:**
  - sezon `SSDSZZZZZSSS`: złoty sezon tarasów wypada w miesiącach Z;
  - Fansipan pieszo jako trudna wersja na dwa dni (`hard.next` z planu 1), wyłączona w V–IX, tylko z firmą, która załatwia zgodę parku, i z przewodnikiem z kartą parku;
  - oś 22,9, żeby pętla Ba Bể → Cao Bằng → Hà Giang → Sa Pa szła w jednym kierunku osi (ustalenie 22); droga Sa Pa – Cao Bằng ma ok. 11 h, ponad limit 10 h.
- **Mapa i paleta:** Hà Giang i Sa Pa leżą w kadrze północy; zajęte są kolory 1–16 z 20.

''' + e[k:]
# the list for stage 3: what plan 1 did goes, what plan 2 and batch B need stays
a = e.index('**Do etapu 3 (nowe miejsca):**\n')
b = e.index('\nDrobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)\n\n**Do audytu przed publikacją (etap 4):**')
old = e[a:b]
assert old.count('\n- ') == 16 and 'droga Thọ Xuân – Pù Luông' in old and '`textWidth` w `site2/src/page.js`' in old, 'the list for stage 3 has changed'
n += 1
e = e[:a] + '''**Do etapu 3 (nowe miejsca):**
- każde nowe miejsce dostaje też dane z planu 2B: cenę noclegu w `COSTS.night`, płatne części dni jako pozycje `COSTS.items` wskazane polem `cost` w dniach, wpisy w `BOOK` z wyprzedzeniem i linkami, miejsce w `HOMESTAYS`, gdy nocuje się u gospodarzy, i teksty dalekich dróg z lotnisk w `AIR_KEYS`; liczby stoją w tabelach „Zestawienie” pliku researchu miejsca (`research/<id>-2026-10.md`), a test danych czyta je stamtąd;
- Hà Giang: zamiana motocykla w `SWAPS`, z przeglądem kontroli policji na pętli (`research/motocykl-2026-10.md`, `research/hagiang-2026-10.md`);
- najszersza kwota budżetu ma postać „d ddd–dd ddd zł” (najwyższa po planie 1: 7 500–14 700 zł, 30 dni z Đà Nẵng do Hồ Chí Minh City, przyroda, „Ekstremalnie”, grudzień, z Hang Én); cyfry kroju mają jedną szerokość, więc kafelek mieści każdą kwotę tej postaci, ale kwota z pięcioma cyframi na obu końcach byłaby szersza: po każdej partii sonda `before.js` przy 641, 768 i 901 px;
- nowe miejsca dostają trudne dni według zasad z [research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md) (dziś trudny dzień mają Cát Tiên, Pù Luông, Phong Nha i Cúc Phương); wyprawa na dwa dni to trudna wersja z polem `next`;
- każde nowe miejsce dostaje numer koloru (`color` w treści) i musi leżeć w kadrze mapy (`site2/src/panels.js`). Paleta ma 20 kolorów, a zajętych jest 16; partie A i B dają razem 24 miejsca, więc przed partią B paletę trzeba rozszerzyć. Pù Mát (partia B) leży poza kadrami: trzeba przesunąć kadr i wygenerować kontury od nowa (`geo/make_basemap.py`);
- wielowyrazowe nazwy z nowych tekstów bez wietnamskich liter (jak Lang Biang, Paradise Cave) dopisać do `KEEP_TOGETHER` w `site2/src/content.js`; nazwy z takimi literami wiąże reguła `tieVietnamese`, a krótkie nazwy miejsc strona wiąże sama. Sonda `changes.js` łapie tylko nazwy z literą wietnamską, więc nazwy bez niej trzeba wypatrzyć samemu;
- przed dodaniem czwartego kadru: `site2/src/basemap.js` do testów (`SOURCES` w `tests/run.sh`) i test, że `BASEMAP` ma kontury każdego kadru z `MAP_PANELS`; bez nowych konturów strona by się wywróciła;
- po planie 2 obejrzeć jeszcze raz, jak w punkcie kontrolnym planu 1: na ilu trasach jest każde miejsce, dni z dwoma lotami, Cát Bà na 4 noce, Hà Nội trzy razy na jednej trasie i bliskie miejsca obok siebie.
''' + e[b:]
# the audit before publishing: the research of plan 1 and the notices of the parks
e = rep(e, '**Do audytu przed publikacją (etap 4):**\n', '''**Do audytu przed publikacją (etap 4):**
- research planu 1 partii A: punkty „Nie ustaliłem” i „Do sprawdzenia” w `research/phongnha-2026-10.md`, `research/cucphuong-2026-10.md` i `research/danang-2026-10.md`, a tuż przed publikacją komunikaty parków: drogi na Sơn Trà zamknięte od 8.10.2026 „do odwołania”, w Cúc Phương wstrzymane noclegi w lesie (od 16.09.2026) i zakaz wchodzenia w głąb lasu między 19:00 a 7:00 (od 1.09.2026), terminy wypraw Oxalis do Hang Én i Tú Làn;
- licencje i autorzy 15 nowych zdjęć (`phongnha_0`–`4`, `cucphuong_0`–`4`, `danang_0`–`4`), razem z resztą przy publikacji;
''')
# what plan 2B did, under its own heading next to the earlier plans
e = rep(e, '### Z planu 2A\n', '### Z planu 2B\n\n' + old2b + '\n\n### Z planu 2A\n')
c = rep(c, '**Status (12.10.2026):** etap 2 zrobiony: plany 2A (telefon, powody, pogoda, mapa) i 2B (budżet, „Przed wyjazdem”, motocykl, przejazdy z lotnisk). Następny krok: etap 3, partia A (nowe miejsca), zob. [notes/etapy.md](notes/etapy.md).',
  '**Status (@DZIEN@):** etap 3 w toku: partia A, plan 1 (Phong Nha, Cúc Phương, Đà Nẵng z Sơn Trà) zrobiony. Następny krok: plan 2 partii A (Hà Giang, Sa Pa), zob. [notes/etapy.md](notes/etapy.md).')
c = rep(c, '- **Fakty i ceny** zapisuj ze źródłem i datą w `research/`.', '- **Fakty i ceny** zapisuj ze źródłem i datą w `research/`. Nowe miejsce etapu 3 ma własny plik `research/<id>-2026-10.md`, którego tabele „Zestawienie” czyta test danych.')
c = rep(c, '`bash tests/run.sh --full` sprawdza wszystkie (ok. 40 s).', '`bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 70 s).')
e = e.replace('@DZIEN@', D).replace('DECYZJE-Z-PRZEGLADU', REVIEW)
c = c.replace('@DZIEN@', D)
open('notes/etapy.md', 'w', encoding='utf-8').write(e)
open('CLAUDE.md', 'w', encoding='utf-8').write(c)
print(n, 'changes')
EOF
```

Oczekiwane: `9 changes`.

- [ ] **Krok 2: Sprawdź**

```bash
git status --short
grep -n "@DZIEN@\|DECYZJE-Z-PRZEGLADU" notes/etapy.md CLAUDE.md
grep -c $'\xc2\xa0' notes/etapy.md CLAUDE.md
```

Oczekiwane:
- zmienione są tylko `notes/etapy.md` i `CLAUDE.md`, a nowy jest raport tras;
- drugi grep nic nie wypisuje;
- trzeci wypisuje `0` przy obu plikach.

Przeczytaj `git diff` i sprawdź:
- akapit przeglądu brzmi dobrze po „Punkt kontrolny planu 1 (…):”;
- linia `notes/raport-tras-RRRR-MM-DD.md` w CLAUDE.md zostaje bez zmian (to wzór nazwy pliku).

- [ ] **Krok 3: Commit**

```bash
git add notes/etapy.md CLAUDE.md notes/raport-tras-*.md
git commit -F - <<'EOF'
Notatki: plan 1 partii A zrobiony, punkt kontrolny i raport tras; następny krok: plan 2 partii A (Hà Giang, Sa Pa)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

`git push` tylko za zgodą użytkownika.

---

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` (co 7. kombinacja); `bash tests/run.sh --full` → wszystkie kombinacje i tryb dat, z budżetem, rezerwacjami, pakowaniem i wjazdem każdej trasy, ok. 70 s.
- `python3 site2/build.py`, potem:
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js` i `before.js` (polecenia w zadaniu 9, krok 2); każda kończy się `done, all checks ok`;
  - `bash tests/shot.sh '<ustawienia>' 390 plik.png [wysokość]`: zrzut; cała strona to ok. 19 600–32 300 px przy 390 px;
  - `bash tests/print.sh '<ustawienia>' plik.pdf [dark]`: wydruk, 0 zakrytych linii;
  - w ustawieniach słowo `MIESIAC` to miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu odpowiadają 2xx (curl, bez zapisywania stron).
- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.
- `python3 -I geo/make_basemap.py <katalog z danymi Natural Earth>`: kontury mapy po zmianie kadrów w `site2/src/panels.js` (zadania 6 i 7).
- Ręcznie przez lokalny serwer: pasek u góry, „Na górę”, podświetlanie na mapie, powiększenie mapy i przełącznik z klawiatury (zadanie 9, krok 7).
- Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie wypisuje.
