# Etap 4: audyt i publikacja — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** strona gotowa do pokazania znajomym i opublikowana pod https://grzegorzfrskiba-hub.github.io/wietnam/, na początek bez wyszukiwarek. Kolejno:
- **poprawki z listy audytu:**
  - zdanie „Sprawdź aktualne zasady wjazdu” w trybie miesiąca;
  - droga przez lotnisko bez lotu jako jedna droga;
  - `esc()` w przełączniku motocykla;
  - kurs NBP i adres strony w jednym miejscu;
  - testy świąt i zdjęć;
- **PDF jako wersja offline dla podróżnych:** przycisk „Zapisz trasę jako PDF” i wydruk na A4 z mapą w trzech kadrach, linkiem do trasy i mniejszymi zdjęciami;
- **kroje na własnym hostingu,** lżejszy plik offline (6,4 MB zamiast 20,3 MB) i `noindex` na stronie publicznej;
- **zdjęcia i stopka:** licencje wszystkich 87 zdjęć sprawdzone w Wikimedia Commons, licencja w stopce prowadzi do swojego tekstu, Natural Earth w „Uwagi”;
- **fakty z 14.10.2026** w researchu i na stronie, porządki w researchu przed upublicznieniem, źródła faktów z pierwowzoru w `research/`;
- **wizja przejrzana z tym, co jest na stronie,** README z „©”, neutralne zdania o organizatorze;
- na końcu punkt kontrolny, końcowy przegląd, publikacja (każdy krok za zgodą użytkownika), sprawdzenie na żywo, pierwsze linki i notatki.

**Architektura:**
- **Kod strony** zmienia się w tych samych plikach co dotąd:
  - `page.js` dostaje czyste funkcje `cardSegs` (droga przez lotnisko jako jedna) i `licenceUrl` (tekst licencji zdjęcia), a `entryNotes` liczy najpóźniejszy koniec wyjazdu i trzy nowe zdania;
  - `app.js` składa wydruk: kopię mapy w trzech kadrach (`panelSvg`, wspólna z powiększeniem mapy) i link do trasy;
  - `template.html` ma CSS wydruku (A4, `@page`), przycisk PDF i zdanie bez JavaScriptu.
- **Build** (`site2/build.py`) wstawia reguły krojów z `site2/fonts/fonts.css`:
  - na stronie z plikami obok strony;
  - w pliku offline jako base64.

  Do tego `noindex` (stała `NOINDEX`), adres strony z `page.js` i mniejsze zdjęcia offline.
- **Publikacja z `docs/` na `main`,** jak strona grudniowa: `tools/publish.sh` buduje stronę i kopiuje ją do `docs/`, a GitHub Pages podaje ją pod `/wietnam/`.
- **Research:** fakty z 14.10.2026 dopisane do plików, z których pochodzą, ze źródłami; porządki bez zmiany faktów; nowy `research/pierwowzor-2026-10.md`.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, zrzuty, narzędzia); Chrome bez okna (sondy, zrzuty, wydruk); curl i API Wikimedia Commons (linki, licencje, tylko odczyt); `gh` (publikacja).

**Specyfikacja:**
- [notes/wizja.md](../wizja.md), zwłaszcza „Repo i licencja”, „Treść, bezpieczeństwo, licencje” i „Technika” (offline);
- [notes/etapy.md](../etapy.md): „Etap 4: audyt i publikacja (po partii A)”, „Następny krok: etap 4” i lista „Do audytu przed publikacją (etap 4)”;
- [notes/uwagi-z-przegladow-1b.md](../uwagi-z-przegladow-1b.md), „Do etapu 4 (audyt przed publikacją)”;
- decyzje z sesji 14.10.2026, niżej w sekcji „Decyzje z sesji 14.10.2026”.

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
  - Po każdym zadaniu `grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"` nic nie zwraca, a `grep -c $'\xc2\xa0'` na zmienionych notatkach i researchu daje 0.
  - Narzędzie do zapisu plików bywa, że samo zamienia napis `\u00a0` na znak; te grepy to wyłapią.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - cudzysłów „…”, półpauza w zakresach, godziny 24-godzinne.
- **Fakty i ceny:**
  - nowy albo zmieniony fakt najpierw trafia do researchu, ze źródłem i datą, a dopiero potem na stronę;
  - kurs NBP z 9.10.2026 i ceny z 11–13.10.2026 zostają (decyzja 4); test danych czyta kurs z wiersza NBP-A w `research/ceny-2026-10.md`;
  - długi ogon researchu (godziny, bilety do ok. 5 EUR, współrzędne, „Nie ustaliłem”) zostaje na partię B, bez zmian na stronie.
- **Bezpieczeństwo w treści:** zdania o przepisach, wjeździe i zakazach tylko z researchu (`research/wjazd-2026-10.md`, notatki miejsc). Ramka „Samodzielnie” zostaje bez zdania MSZ (decyzja 5). Bez nazwisk osób prywatnych.
- **Zdjęcia:** bez nowych zdjęć; 87 zdjęć z `photos/` głównej kopii (poza gitem). Licencje i autorów sprawdza `tools/licenses.sh` w API Wikimedia Commons.
- **Kroje:** 18 plików woff2 i 2 pliki licencji OFL w `site2/fonts/` pobrano 14.10.2026 za zgodą użytkownika (fonts.gstatic.com i raw.githubusercontent.com/google/fonts, razem 531 KB). Wykonawca bierze je z gałęzi suchej próby (zadanie 3), bez drugiego pobierania; sumy SHA-256 stoją w zadaniu.
- **Testy:**
  - `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu;
  - pełny przebieg (`--full`) trwa ok. 100 s;
  - sondy: `$TMPDIR/sondy-4.sh` z zadania 1, krok 4.
- **Sieć:**
  - `tools/links.sh` i `tools/licenses.sh` pytają adresy i API przez curl albo Pythona i niczego nie zapisują;
  - każde pobieranie plików tylko po zgodzie użytkownika, z nazwą, źródłem i rozmiarem;
  - nie otwieraj plików PDF z sieci narzędziem WebFetch, bo samo je zapisuje.
- **Repo stanie się publiczne** (zadanie 11), razem z całą historią: bez danych osobowych, bez numerów lotów, bez imion i linków znajomych z pierwszej rundy.
- **Commity:**
  - po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
  - commity po zadaniach są częścią planu;
  - pliki dodawaj po nazwie (`git add <pliki>`), nie `git add -A`.
- **Publikacja tylko za wyraźną zgodą użytkownika, każdy krok osobno:**
  - `git push`;
  - przełączenie repo na publiczne;
  - włączenie GitHub Pages;
  - zmiana opisu repo;
  - publikacja artifactu.

## Na co uważać przy przeglądzie

Sześć sytuacji, w których strona najłatwiej zawiedzie odwiedzającego, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **PDF na prawdziwym telefonie.**
   - Ryzyko: Safari na iPhonie bierze papier z ustawień regionu i według zgłoszeń ignoruje `@page` oraz `break-after: avoid`, więc nagłówek może zostać sam na dole strony. Okno drukowania nie otworzy się, jeśli wywołanie nie przyjdzie wprost z dotknięcia.
   - Oczekiwane: na iPhonie i na Androidzie przycisk otwiera okno drukowania, a PDF zapisuje się w telefonie i otwiera bez internetu: mapa w trzech kadrach, link do trasy, polskie i wietnamskie litery w tym samym kroju co na stronie.
   - Sprawdzenie: wydruk w Chrome (zadanie 9, krok 4), sonda `pdf.js`, telefon (zadanie 9, krok 8).
2. **Kroje.**
   - Ryzyko: brakujący plik albo zły zakres znaków daje krój zastępczy przy literach wietnamskich (ộ, ữ, Đ) albo polskich (ą, ł). Chrome bez okna bez flagi `--allow-file-access-from-files` nie czyta krojów z dysku, więc zrzuty i PDF wyszłyby innym krojem, z innymi szerokościami etykiet mapy.
   - Oczekiwane: na stronie, w PDF i w pliku offline bez sieci te same trzy kroje; żadnego zapytania do Google Fonts.
   - Sprawdzenie: lint w `tests/run.sh`, sonda `publish.js` (18 reguł `@font-face`, trzy kroje załadowane), wydruk i zrzuty (zadanie 9), plik offline z odciętą siecią (zadanie 3, krok 4).
3. **Strona publiczna.**
   - Ryzyko: ścieżki `img/` i `fonts/` pod `/wietnam/`, podgląd linku w WhatsAppie mimo `noindex`, schowek, który działa tylko przez https.
   - Oczekiwane: strona, zdjęcia i kroje przez https; podgląd z obrazem, tytułem i opisem; „Kopiuj plan na WhatsApp” kopiuje do schowka; w źródle `<meta name="robots" content="noindex">`.
   - Sprawdzenie: zadanie 11, kroki 6 i 7.
4. **Droga przez lotnisko bez lotu.**
   - Ryzyko: karta pokazuje jedną drogę Ninh Bình → Hà Giang (8 h), a mapa rysuje linię przez Hà Nội; „Zarezerwuj wcześniej” gubi samochód z lotniska albo dalej mówi „w obie strony”.
   - Oczekiwane: w karcie „Minibus typu limousine albo prywatny samochód”, 8 godz., z ostrzeżeniem „Długi dzień w drodze”; w rezerwacjach samochód z lotniska tylko do Ninh Bình, a droga do Hà Giang wśród minibusów; mapa przez Hà Nội.
   - Sprawdzenie: test w `tests/page.test.js` (zadanie 1), zrzut z1 (zadanie 9, krok 6).
5. **Fakty z 14.10.2026.**
   - Ryzyko: strona i research mówią co innego (data festiwalu gryki, karta przylotu), albo zdanie o karcie przylotu brzmi jak obowiązek na każdym lotnisku.
   - Oczekiwane: każde zdanie strony ma swój wiersz w researchu, ze źródłem z 14.10.2026; w dniu publikacji drugi rzut oka na komunikaty, które zmieniają się z tygodnia na tydzień.
   - Sprawdzenie: zadanie 6 (research przed stroną), zrzut z2 (zadanie 9), zadanie 11, krok 1.
6. **Publiczne repo.**
   - Ryzyko: dane osobowe w nowych notatkach albo w historii (imiona znajomych, linki z ich terminami, wyjazd organizatora).
   - Oczekiwane: neutralne zdania (decyzja 3); opinie znajomych w notatkach bez imion i bez linków.
   - Sprawdzenie: grep w zadaniu 9, krok 1, i zadanie 12.

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne do zadania 11. Strona grudniowa (`grzegorzfrskiba-hub/vietnam-december`) zostaje nietknięta.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik (ścieżki od katalogu repo).
- **Python:** 3.9, z Pillow i PyMuPDF w katalogu użytkownika. Skrypt, który nie potrzebuje Pillow (skrypt notatek), uruchamiaj z `-I`; zrzuty i arkusze PDF potrzebują Pillow i PyMuPDF, więc bez `-I`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`):
  - pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, IntersectionObserver woła tylko raz, na starcie, a przejścia CSS stoją;
  - kroje czyta z dysku tylko z flagą `--allow-file-access-from-files`, którą zadanie 3 daje wszystkim trzem skryptom;
  - słowo `MIESIAC` w ustawieniach sondy, zrzutu i wydruku to miesiąc za pięć miesięcy od dziś.
- **GitHub:** `gh` jest w `~/.local/bin/gh`, zalogowany na konto `grzegorzfrskiba-hub`. Strona grudniowa używa GitHub Pages z `main` `/docs` z wymuszonym HTTPS; ta strona robi to samo.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - w nowym worktree podlinkuj `photos/` z głównej kopii przed buildem i dopisz `/photos` do `$(git rev-parse --git-path info/exclude)`, żeby link nie trafił do commita;
  - commity dodają pliki po nazwie (`git add <pliki>`), nie `git add -A`;
  - w nazwach kontroli sond nie używaj prostego cudzysłowu `"`: `probe.sh` ucina na nim linię, więc piszemy „…”;
  - strona wiąże nazwy twardą spacją („Ninh Bình”), więc w sondach szukaj nazw przez `\s`, nie przez spację;
  - narzędzie Bash działa w zsh: niecytowana zmienna z listą plików nie dzieli się na słowa, więc wywołania `jsc` z wieloma plikami pisz wprost albo w małym skrypcie bash;
  - `tools/links.sh` dostaje od strony Sapa O'Chau kod 406: serwer odrzuca curla po kilku zapytaniach, a w przeglądarce strona otwiera się normalnie;
  - WebFetch sam zapisuje pliki PDF, które otworzy; przy faktach w dniu publikacji czytaj tylko strony HTML.
- **Zdjęcia** (87, wszystkie ze strony) leżą w `photos/` głównej kopii; `photos/` nie jest w gicie. Build bierze je stamtąd.
- **Sucha próba (14.10.2026):**
  - kod i treść zadań 1–8 złożono w osobnym worktree na gałęzi `sucha-proba-4`, commit po commicie: zadanie 1 `cebc590`, zadanie 2 `ae2473b`, zadanie 3 `fac30e2`, zadanie 4 `b3fb31b`, zadanie 5 `54387a5`, zadanie 6 `d6667eb`, zadanie 7 `c6dace1`, zadanie 8 `e4842be`;
  - kroki tego planu wygenerowano z tych commitów i odtworzono z gotowego tekstu planu na świeżym worktree, zadanie po zadaniu:
    - po krokach testów każde zadanie z testami dawało błąd z kroku 2, a po kodzie `ALL PASS`;
    - commit z ostatniego kroku, wykonany dosłownie, brał wszystkie zmienione pliki;
    - pliki i opis commitu po każdym zadaniu są identyczne z suchą próbą;
  - kroje w zadaniu 3 przyszły z gałęzi suchej próby, a sumy SHA-256 się zgodziły;
  - pełny test przeszedł po zadaniach 6 i 8, a w odtworzeniu planu po zadaniu 1 (`combos: 134784 months and 10368 dates (all)`, `ALL PASS`);
  - sondy po zadaniach 3 i 4 (15 i 16 sond), a po zadaniu 8 dla miesięcy `MIESIAC`, 2027-10 i 2027-05: trzy razy `sondy (…): 0 z 16 nie przeszło`;
  - `tools/links.sh`: 52 z 53 adresów z kodem 200, a strona Sapa O'Chau z kodem 406, jak w planie 2; `tools/licenses.sh`: `87 photos, 0 licence problem(s), 0 author(s) to check`;
  - wydruk trzech tras: d1 12, d2 16, d3 21 stron A4, 0 zakrytych linii, d1 także w ciemnym motywie;
  - plik offline z odciętą siecią: trzy kroje ze środka pliku, trasa ułożona;
  - `tools/publish.sh` dał `docs/` (36 MB, `index.html` z `noindex`, `img/`, `fonts/` z licencjami, `.nojekyll`), potem usunięty;
  - liczby ze wszystkich tras (zadanie 9, krok 5) takie jak w punkcie kontrolnym planu 2 partii A;
  - zrzuty i arkusze z zadania 9, krok 6, obejrzane: karta jednej drogi Ninh Bình → Hà Giang, rezerwacje bez „w obie strony”, trzy nowe zdania wjazdu, stopka z linkami licencji, pierwsze strony PDF z linkiem i mapą w trzech kadrach;
  - skrypt notatek z zadania 12 sprawdzono na kopiach plików po commicie planu i po zadaniu 8 (9 zmian);
  - nie sprawdzono na sucho: PDF na prawdziwym telefonie, ręcznego sprawdzenia w przeglądarce, przeglądu z użytkownikiem, końcowego przeglądu, faktów w dniu publikacji i samej publikacji (zadania 9–12).

**Doprecyzowania z suchej próby, do zatwierdzenia razem z planem:**
- **Noc nad Bàu Sấu w budżecie** z przewodnikiem, którego wymaga tekst dnia: `cattien.bausau_night` za grupę 79–88 EUR zamiast 50–88 EUR (zadanie 7). Research już podawał 79 EUR z przewodnikiem, a tabela i `costs.js` liczyły od 50 EUR bez niego.
- **Zdania wjazdu w formie „Etykieta: …”**, jak pozostałe linie. Karta przylotu jest opisana ogólnie, bo lotniska wprowadzają ją po kolei, a Phú Quốc, który też ją ma, nie jest na stronie lotniskiem przylotu z zagranicy.
- **E-wiza dla każdej trasy:** zdanie mówi „jeśli jej potrzebujesz”, bo wyjazdy na stronie trwają najwyżej 30 dni, a bez wizy można 45.
- **Plik offline ma 6,4 MB**, nie 5–6 MB: kroje dokładają ok. 0,7 MB, a zdjęcie otwierające ma 1280 px.
- **Przełącznik motocykla w wydruku dzieli się między akapitami:** ramka „Samodzielnie” w Hà Giang przeskakiwała w całości na następną stronę i zostawiała pół strony pustej.
- **Chrome bez okna i kroje:** `shot.sh` i `print.sh` dostały flagę `--allow-file-access-from-files`, a `probe.sh` dowiązanie `fonts/`. Sonda `publish.js` sprawdza reguły `@font-face` i załadowane kroje, bo Chrome nie notuje pobrań plików z `file://`.
- **Zdanie bez JavaScriptu** bierze adres strony z `page.js` przez znacznik `__SITE_URL__`, więc adres dalej stoi w jednym miejscu.
- **`COSTS_CHECKED` to 13.10.2026,** ostatni dzień sprawdzania cen (research Hà Giang i Sa Pa); zdanie pod budżetem dalej mówi „w październiku 2026”.
- **Jeszcze dwa zdania w rozpoznaniu** (o uczestnikach wyjazdu grudniowego) też idą na neutralne, zgodnie z decyzją 3. Te cztery linie zadanie 8 podmienia małym skryptem, który szuka ich po początku, więc ten plan, publiczny razem z repo, nie powtarza starych zdań.
- **Krokodyle w Bàu Sấu** mają w researchu źródło (VnExpress, 16.8.2020), a nie ocenę bez źródła.

## Decyzje z sesji 14.10.2026

Pytania do użytkownika i odpowiedzi:
1. **Start:** najpierw cicho. Strona publiczna ma `noindex`, działa pod adresem i z linków, a do wyszukiwarek trafi po opiniach znajomych (usunięcie stałej `NOINDEX` w `build.py`).
2. **Pierwsze linki:** mała runda, 2–4 przygodowe osoby.
   - Dostają sam adres strony i trzy pytania, ustawiają swój termin same i odsyłają swój plan.
   - Wysyła użytkownik ze swojego WhatsAppa, zaraz po sprawdzeniu opublikowanej strony na własnym telefonie.
   - Reszta znajomych dostaje link po poprawkach z ich uwag.
   - Imiona i linki osób nie trafiają do repo.
3. **Co repo mówi o organizatorze:** neutralne zdania od teraz. W CLAUDE.md jest „planer grudniowego wyjazdu grupy”, w rozpoznaniu „grupa z niej korzysta”. Historia i autor commitów zostają bez zmian.
4. **Zakres audytu faktów:** ważne teraz, drobiazgi potem.
   - Przed publikacją: bezpieczeństwo, zamknięcia i prawo (kontrola 14.10.2026 i drugi rzut oka w dniu publikacji), licencje zdjęć, linki, porządki w researchu.
   - Ceny i kurs z 9–13.10.2026 zostają.
   - Godziny, drobne bilety, współrzędne i „Nie ustaliłem” po publikacji, z partią B.
5. **Motocykl i MSZ:** przełącznik i ramka „Samodzielnie” zostają bez zmian.
   - Rekomendacja była inna: ramka zaczyna się od zdania MSZ (Odyseusz, 30.06.2026: „odradzamy samodzielne podróże motocyklowe po Wietnamie”).
   - Użytkownik wybrał bez zmian. Research wjazdu i motocykla zapisuje poziom 1 i zdanie MSZ, z adnotacją, że strona świadomie go nie cytuje.
   - Link do Odyseusza zostaje w „Wjazd i zdrowie”.
6. **Offline:** PDF dla podróżnych.
   - Przycisk „Zapisz trasę jako PDF” i poprawiony wydruk.
   - Lżejszy plik HTML (zdjęcia 640 px) zostaje w buildzie na komputer i Chrome na Androidzie, bez rozsyłania: iPhone pokazuje plik HTML w podglądzie bez JavaScriptu, czyli prawie pusty.

Fakty do pytań sprawdzili w tle trzej agenci: wersja offline na telefonach, komunikaty i przepisy na północy oraz w środku i na południu kraju. Stronę MSZ odczytano w przeglądarce.

Lista 30 ustaleń, zatwierdzona w całości (tu w skrócie, w grupach):
- **Publikacja (1–8):**
  - Pages z `docs/` na `main`, jak strona grudniowa (`tools/publish.sh`, `.nojekyll`, HTTPS);
  - każdy krok publikacji za osobną zgodą;
  - `noindex` tylko na stronie publicznej;
  - README po polsku, z „©” i licencjami zdjęć, map i krojów, bez imienia i nazwiska;
  - Natural Earth w stopce;
  - neutralne zdania o organizatorze;
  - `SITE_URL` w jednym miejscu;
  - sprawdzenie na żywo: https, schowek, podgląd w WhatsAppie, `noindex`, PDF na telefonie.
- **PDF i plik offline (9–13):**
  - przycisk z podpowiedzią;
  - A4 z marginesami 12 mm, mapa w trzech kadrach na szerokość strony, jedno mniejsze zdjęcie na miejsce, link do trasy, bez „Kliknij dzień…”;
  - `tests/print.sh` naprawdę na A4 i z kodem 1 przy zakrytych liniach;
  - plik offline ze zdjęciami 640 px i zdaniem bez JavaScriptu;
  - kroje na własnym hostingu z licencjami OFL.
- **Poprawki z listy audytu, każda z testem (14–18):**
  - najpóźniejszy koniec wyjazdu w trybie miesiąca;
  - droga przez lotnisko jako jedna droga;
  - `esc()` w przełączniku;
  - kurs NBP w jednym źródle;
  - testy świąt z researchem, powtórzonego identyfikatora zdjęcia i autora zastępczego.
- **Fakty, zdjęcia, research (19–26):**
  - kontrola z 14.10.2026 w researchu;
  - dwa zdania w „Wjazd i zdrowie” (karta przylotu, e-wiza tylko z urzędowej strony);
  - zdanie o e-papierosach;
  - drugi rzut oka w dniu publikacji;
  - licencje 87 zdjęć w API Commons (`tools/licenses.sh`) i stopka z tekstem licencji;
  - porządki w researchu;
  - źródła z pierwowzoru w `research/pierwowzor-2026-10.md`;
  - długi ogon jako lista na partię B.
- **Notatki, sondy, plan (27–30):**
  - przegląd wizji z datą;
  - opinie znajomych bez imion;
  - sondy `publish.js` i `pdf.js` obok 14 dawnych;
  - plan z suchą próbą jak 3A2, z końcowym przeglądem przed publikacją.

## Jak działa strona po etapie 4

1. **Ustawienia i trasa** działają jak dotąd: `apply` → `normSettings` → `planRoute` → `stopDays` → `tripBudget` → render → adres. Silnik się nie zmienia, więc trasy i liczby są te same co po planie 2 partii A.
2. **Karta przejazdu i „Zarezerwuj wcześniej”** pokazują drogę przez lotnisko bez lotu jako jedną drogę (`cardSegs`); mapa dalej rysuje jej linię przez lotnisko.
3. **„Wjazd i zdrowie”:**
   - zdanie „Sprawdź aktualne zasady wjazdu” liczy w trybie miesiąca najpóźniejszy koniec wyjazdu;
   - dochodzą e-wiza tylko z evisa.gov.vn, karta przylotu na Tân Sơn Nhất i zakaz e-papierosów.
4. **Pod „Kopiuj plan na WhatsApp”** stoi przycisk „Zapisz trasę jako PDF” z podpowiedzią. Wydruk:
   - A4 z marginesami 12 mm;
   - na pierwszej stronie link do tej trasy, bez zdania „Kliknij dzień…”;
   - mapa w trzech kadrach (północ i środek obok siebie, pod nimi południe z legendą);
   - jedno mniejsze zdjęcie na miejsce;
   - przełącznik motocykla dzieli się między akapitami.
5. **Kroje** (IBM Plex Sans, IBM Plex Mono, Newsreader) idą z folderu `fonts/` obok strony; strona nie łączy się z Google.
6. **Stopka:**
   - podpis zdjęcia prowadzi do jego strony na Commons, a nazwa licencji do jej tekstu po polsku;
   - domena publiczna jest po polsku;
   - w „Uwagi” stoi źródło konturów mapy (Natural Earth).
7. **Strona publiczna** ma `noindex`, podgląd linku i adres z `page.js`.
8. **Plik offline** ma 6,4 MB, zdjęcia 640 px i kroje w środku. Bez JavaScriptu (podgląd pliku na iPhonie) pokazuje zdanie z adresem strony.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/page.js` | (zmiana) `cardSegs`, `licenceUrl`; `entryNotes` z najpóźniejszym końcem wyjazdu i zdaniami `evisa`, `arrival`, `vape`; `bookList` po `cardSegs` |
| `site2/src/app.js` | (zmiana) karta przejazdu po `cardSegs`; `esc()` w przełączniku; zdanie pod budżetem z danych; wydruk: `panelSvg`, kopia mapy, link do trasy; przycisk PDF; stopka z tekstem licencji |
| `site2/src/template.html` | (zmiana) bez Google Fonts; `@page` i CSS wydruku; przycisk PDF i podpowiedź; miejsce na mapę i link w wydruku; zdanie bez JavaScriptu |
| `site2/src/ui.js`, `costs.js`, `photos.js`, `content/hagiang.js` | (zmiana) teksty przycisku, wjazdu, stopki i „Kliknij dzień…”; `EUR_PLN_DATE`, `COSTS_CHECKED`; trzy podpisy zdjęć; data festiwalu gryki 2026 |
| `site2/build.py` | (zmiana) kroje z `site2/fonts/` (obok strony albo base64), `NOINDEX`, `SITE_URL` z `page.js`, zdjęcia offline 640 px, kontrola identyfikatorów i autorów zdjęć |
| `site2/fonts/` | (nowe) 18 plików woff2, `fonts.css`, `OFL-IBM-Plex.txt`, `OFL-Newsreader.txt` |
| `tests/*.test.js`, `tests/run.sh`, `tests/probe.sh`, `tests/shot.sh`, `tests/print.sh` | (zmiana) testy nowych funkcji, faktów i wydruku; kontrola krojów; flaga dostępu do plików; A4 i kod 1 przy zakrytych liniach |
| `tests/probes/publish.js`, `pdf.js`; `tests/probes/before.js` | (nowe, zmiana) kroje, `noindex`, podgląd linku, zdanie bez JavaScriptu; przycisk PDF i wydruk; zdanie pod budżetem |
| `tools/licenses.sh`, `tools/publish.sh` | (nowe) licencje zdjęć w API Commons; `docs/` dla GitHub Pages |
| `research/*.md` | (zmiana, nowe) fakty z 14.10.2026, porządki, `pierwowzor-2026-10.md` |
| `README.md`, `notes/wizja.md`, `notes/pomysl-planer-dla-znajomych.md`, `CLAUDE.md` | (nowe, zmiana) README z „©”, wizja przejrzana 14.10.2026, neutralne zdania, sposoby sprawdzania |
| `docs/` | (nowe, zadanie 11) zbudowana strona dla GitHub Pages |
| `notes/etapy.md`, `CLAUDE.md` | (zmiana, zadanie 12) status, następny krok, długi ogon na partię B |

**Kolejność:** zadania idą po kolei; każde zakłada pliki po poprzednim, bo kroki zamieniają dokładny tekst. Zadania 6 i 7 zmieniają te same pliki researchu w różnych miejscach, a zadanie 6 musi być pierwsze.

---

### Zadanie 1: Poprawki z listy audytu w stronie: wjazd, droga przez lotnisko, `esc()`

Trzy punkty listy „Do audytu przed publikacją (etap 4)”:
- **Wjazd w trybie miesiąca.**
  - Było: wyjazd w lipcu 2028 na 30 dni nie dostawał zdania „Sprawdź aktualne zasady wjazdu”. Koniec terminu liczył się jako koniec miesiąca, a taki wyjazd może zacząć się ostatniego dnia miesiąca i skończyć po 14.08.2028.
  - Teraz: najpóźniejszy koniec to ostatni dzień miesiąca plus długość.
- **Droga przez lotnisko bez lotu:** Ninh Bình ↔ Hà Giang przez Nội Bài (7083 trasy, 5,3%) i Mekong ↔ Cát Tiên przez Tân Sơn Nhất (858 tras, 0,6%).
  - Było: karta przejazdu podawała dwa razy tekst dojazdu z lotniska, a „Zarezerwuj wcześniej” mówiło „Hà Nội – Ninh Bình w obie strony i Hà Nội – Hà Giang”.
  - Teraz: to jedna droga z tekstem zwykłej drogi, a mapa dalej rysuje ją przez lotnisko.
- **`esc()` w przełączniku motocykla:** nagłówek, etykiety i nagłówki ramki przechodzą przez `esc()`, jak każdy tekst wstawiany do HTML. Dziś teksty nie mają znaków HTML, więc strona się nie zmienia; sonda `before.js` sprawdza przełącznik.

**Pliki:**
- Zmień: `site2/src/page.js` (`entryNotes`, nowa funkcja `cardSegs`, `bookList`), `site2/src/app.js` (`swapBlock`, `legCard`)
- Testy: `tests/page.test.js`

**Interfejsy:**
- Daje: `cardSegs(segs, airports)`, czyli części drogi (`legBetween(…).segs`), w których droga przez lotnisko bez lotu jest sklejona w jedną `{ mode: 'road', from, to, h }` z sumą godzin; części z lotem zostają bez zmian. Używają go `bookList` (page.js) i karta przejazdu (app.js, także `ferryNotes`).
- `entryNotes(st, riding, entry)` bez zmiany sygnatury.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/page.test.js` zamień:

```js
eq([ridesOn(tCk.r, ['caobang'], SWAPS), ridesOn(tCk.r, ['haivan'], SWAPS), ridesOn(tA.r, ['haivan'], SWAPS), entryNotes(tA.st, true, ENTRY).map(function (e) { return e.code; }).indexOf('insurance_moto') > -1],
```

na:

```js
// the month mode: a trip may start on the month's last day, so 16 days in July 2028 may end after 14.08.2028, 15 days not
function visaEnd(month, days) {
  var st = stOf({ from: 'HAN', to: 'HAN', year: 2028, month: month, days: days, interests: [], level: 2 });
  return entryNotes(st, false, ENTRY).map(function (e) { return e.code; }).indexOf('visa_end') > -1;
}
eq([visaEnd(7, 15), visaEnd(7, 16), visaEnd(7, 30), visaEnd(6, 30)], [false, true, true, false],
  'entry in the month mode: the latest end is the month\'s last day plus the trip, so July 2028 for 16 or 30 days is told to check the rules');
eq([ridesOn(tCk.r, ['caobang'], SWAPS), ridesOn(tCk.r, ['haivan'], SWAPS), ridesOn(tA.r, ['haivan'], SWAPS), entryNotes(tA.st, true, ENTRY).map(function (e) { return e.code; }).indexOf('insurance_moto') > -1],
```

W `tests/page.test.js` zamień:

```js
print('stage 3 ok');
```

na:

```js
// a road through an airport without a flight there (Ninh Bình to Hà Giang by Nội Bài): one road in the card and on the list
// of what to book, its hours summed; a leg with a flight keeps its parts; the map draws every part
var tNH = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['gory', 'kultura'], level: 2 });
var legNH = tNH.r.stops.filter(function (x) { return x.id === 'hagiang'; })[0].leg, kNH = bookList(tNH.r, plansAll(tNH), [], BOOKD);
var flyLeg = [{ mode: 'road', from: 'hue', to: 'HUI', h: 0.5 }, { mode: 'fly', from: 'HUI', to: 'HAN', h: 1.2 }, { mode: 'road', from: 'HAN', to: 'ninhbinh', h: 2.25 }];
eq([legNH.segs.length, cardSegs(legNH.segs, AIRPORTS), kNH.filter(function (e) { return e.key === 'airport'; })[0].list, cardSegs(flyLeg, AIRPORTS)],
  [2, [{ mode: 'road', from: 'ninhbinh', to: 'hagiang', h: 8 }], [['HAN', 'ninhbinh', 1]], flyLeg],
  'Ninh Bình to Hà Giang by Nội Bài: one road of 8 h; the car from the airport to Ninh Bình is booked once, the road to Hà Giang is a transfer');
print('stage 3 ok');
```

- [ ] **Krok 2: Uruchom testy i sprawdź, że nie przechodzą.**

```bash
bash tests/run.sh
```

Oczekiwane: przebieg staje na `tests/page.test.js` z błędem:

```text
Exception: Error: entry in the month mode: the latest end is the month's last day plus the trip, so July 2028 for 16 or 30 days is told to check the rules: got [false,false,false,false], want [false,true,true,false]
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
    return '<div class="swap" data-swap="' + id + '"><p class="swap-h">' + T('sw.' + id) + '</p>' +
      '<div class="seg swap-seg" role="radiogroup" aria-label="' + esc(T('sw.' + id)) + '">' + ['driver', 'self'].map(function (v) {
        return '<label><input type="radio" name="swap-' + id + '-' + day + '" value="' + v + '"' + ((v === 'self') === self ? ' checked' : '') + '><span>' + T('sw.' + v) + '</span></label>';
      }).join('') + '</div><p class="swap-note">' + esc(T('sw.note')) + '</p>' +
      (self ? '<div class="swap-box"><p><b>' + T('sw.req.h') + '</b>' + esc(T('sw.req')) + '</p><p><b>' + T('sw.risk.h') + '</b>' + esc(T('sw.risk') + (SWAPS[id].risk ? ' ' + T('sw.risk.' + id) : '')) + '</p>' +
        '<p><b>' + T('sw.tips.h') + '</b>' + esc(T('sw.tips') + ' ' + T('sw.tips.' + id)) + '</p></div>' : '') + '</div>';
```

na:

```js
    return '<div class="swap" data-swap="' + id + '"><p class="swap-h">' + esc(T('sw.' + id)) + '</p>' +
      '<div class="seg swap-seg" role="radiogroup" aria-label="' + esc(T('sw.' + id)) + '">' + ['driver', 'self'].map(function (v) {
        return '<label><input type="radio" name="swap-' + id + '-' + day + '" value="' + v + '"' + ((v === 'self') === self ? ' checked' : '') + '><span>' + esc(T('sw.' + v)) + '</span></label>';
      }).join('') + '</div><p class="swap-note">' + esc(T('sw.note')) + '</p>' +
      (self ? '<div class="swap-box"><p><b>' + esc(T('sw.req.h')) + '</b>' + esc(T('sw.req')) + '</p><p><b>' + esc(T('sw.risk.h')) + '</b>' + esc(T('sw.risk') + (SWAPS[id].risk ? ' ' + T('sw.risk.' + id) : '')) + '</p>' +
        '<p><b>' + esc(T('sw.tips.h')) + '</b>' + esc(T('sw.tips') + ' ' + T('sw.tips.' + id)) + '</p></div>' : '') + '</div>';
```

W `site2/src/app.js` zamień:

```js
      .concat(ferryNotes(L, FERRY, AIRPORTS).map(function (n) { return T(n.key, { x: C(n.place).short, last: n.last, land: n.land, first: n.first, at: n.at }); }));
```

na:

```js
      .concat(ferryNotes({ segs: cardSegs(L.segs, AIRPORTS) }, FERRY, AIRPORTS).map(function (n) { return T(n.key, { x: C(n.place).short, last: n.last, land: n.land, first: n.first, at: n.at }); }));
```

W `site2/src/app.js` zamień:

```js
      '<ul class="leg-segs">' + L.segs.map(function (g) {
```

na:

```js
      '<ul class="leg-segs">' + cardSegs(L.segs, AIRPORTS).map(function (g) {
```

W `site2/src/page.js` zamień:

```js
    L.segs.forEach(function (g) {
      var e, k;
```

na:

```js
    cardSegs(L.segs, data.airports).forEach(function (g) {
      var e, k;
```

W `site2/src/page.js` zamień:

```js
   visa, the last day of the exemption); visa_end when the trip may end after it (the month mode counts the whole month);
   passport; insurance, and insurance_moto when riding a motorbike yourself; doctor. st: normSettings' result; riding: a
   swap ridden yourself is on the trip (ridesOn); entry: ENTRY. */
function entryNotes(st, riding, entry) {
  var span = tripSpan(st), until = fmtSpan(entry.visaFreeUntil, entry.visaFreeUntil);
  var out = [{ code: 'visa', vars: { days: entry.visaFreeDays, until: until } }];
  if (!span || span[1] > entry.visaFreeUntil) out.push({ code: 'visa_end', vars: { until: until } });
```

na:

```js
   visa, the last day of the exemption); visa_end when the trip may end after it (in the month mode the trip may start on
   the month's last day, so its latest end is that day plus the trip); passport; insurance, and insurance_moto when
   riding a motorbike yourself; doctor. st: normSettings' result; riding: a swap ridden yourself is on the trip
   (ridesOn); entry: ENTRY. */
function entryNotes(st, riding, entry) {
  var span = tripSpan(st), until = fmtSpan(entry.visaFreeUntil, entry.visaFreeUntil);
  var end = span && (st.start ? span[1] : tripDate(span[1], st.days));
  var out = [{ code: 'visa', vars: { days: entry.visaFreeDays, until: until } }];
  if (!end || end > entry.visaFreeUntil) out.push({ code: 'visa_end', vars: { until: until } });
```

W `site2/src/page.js` zamień:

```js
  return ['r.van_car', {}];
}
```

na:

```js
  return ['r.van_car', {}];
}

/* The parts of a leg as the card and the list of what to book show them: a road that runs through an airport without a
   flight there (Ninh Bình to Hà Giang by Nội Bài) is one road from its first place to its last, its hours summed; the map
   draws every part (its line runs by the airport). segs: a leg's segments (legBetween); airports: AIRPORTS. */
function cardSegs(segs, airports) {
  var out = [];
  segs.forEach(function (g) {
    var last = out[out.length - 1];
    if (last && last.mode === 'road' && g.mode === 'road' && airports[g.from] && last.to === g.from) out[out.length - 1] = { mode: 'road', from: last.from, to: g.to, h: last.h + g.h };
    else out.push(g);
  });
  return out;
}
```

- [ ] **Krok 4: Testy, build i sondy**

Pełny test (rezerwacje każdej trasy idą teraz przez `cardSegs`), build i grep:

```bash
bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`; build bez błędów; grep nic nie wypisuje.

Sondy, czyli sprawdzenia zbudowanej strony w Chrome bez okna. Plik `$TMPDIR/sondy-4.sh` powstaje tutaj, a kolejne zadania tylko go uruchamiają. Argument to miesiąc (`MIESIAC` albo `RRRR-MM`). Sondy `publish.js` i `pdf.js` dochodzą w zadaniach 3 i 4; do tego czasu skrypt je pomija:

```bash
cat > "$TMPDIR/sondy-4.sh" <<'EOF'
#!/bin/bash
# The probes of stage 4 for one month (MIESIAC: five months from today): the 14 of plan 3A2 and publish.js and pdf.js
# (tasks 3 and 4 add them; before that they are skipped); prints a line for each failure and the count at the end.
# Run from the repository's folder after python3 site2/build.py.
M=${1:-MIESIAC}
A="od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang"
B="od=SGN&do=HAN&miesiac=$M&dni=15&co=&poziom=2"
bad=0; n=0
run() {
  if [ ! -f "tests/probes/$1" ]; then echo "SKIP $1 (jeszcze nie ma)"; return; fi
  n=$((n+1))
  bash tests/probe.sh "tests/probes/$1" "$2" "$3" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL $1 $2 $3"; grep -iE "fail|error" "$TMPDIR/sonda.txt" | head -5; }
}
for w in 390 641 768 901 1100 1400; do run before.js $w "$A"; done
for w in 390 360 320; do run settings.js $w "$B"; done
run map.js 1400 "$B"
run changes.js 1400 "$B"
run changes.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2"
run anchors.js 390 "$B"
run link.js 1400 "od=HAN&do=DAD&miesiac=$M&dni=12&co=kultura&poziom=3"
run publish.js 1400 "$B"
run pdf.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=gory,kultura&poziom=2"
echo "sondy ($M): $bad z $n nie przeszło"
EOF
bash "$TMPDIR/sondy-4.sh" MIESIAC
bash "$TMPDIR/sondy-4.sh" 2027-10
```

Oczekiwane: przy każdym miesiącu `SKIP publish.js (jeszcze nie ma)` i `SKIP pdf.js (jeszcze nie ma)`, a na końcu `sondy (…): 0 z 14 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/app.js site2/src/page.js tests/page.test.js
git commit -F - <<'EOF'
Poprawki z audytu przed publikacją: w trybie miesiąca zdanie „Sprawdź aktualne zasady wjazdu” liczy najpóźniejszy koniec wyjazdu (ostatni dzień miesiąca plus długość), droga przez lotnisko bez lotu (Ninh Bình – Hà Giang przez Nội Bài) to jedna droga w karcie przejazdu i w „Zarezerwuj wcześniej”, a nagłówek i etykiety przełącznika motocykla przechodzą przez esc()

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Kurs NBP, święta i adres strony w jednym miejscu

Trzy punkty listy audytu i uwag z przeglądów:
- **Kurs NBP i dzień cen.**
  - Było: data stała w zdaniu pod budżetem (`bud.note`) na sztywno, `COSTS_CHECKED` nie był nigdzie użyty, a test danych porównywał kurs z liczbą wpisaną w teście.
  - Teraz: `costs.js` trzyma kurs, dzień jego tabeli i dzień cen (`EUR_PLN`, `EUR_PLN_DATE`, `COSTS_CHECKED`), zdanie pod budżetem składa z nich miesiąc i datę, a test danych czyta kurs z wiersza NBP-A w `research/ceny-2026-10.md`.
  - Kurs z 9.10.2026 i ceny z 11–13.10.2026 zostają (decyzja 4), więc zdanie na stronie brzmi jak dotąd.
- **Święta:** test danych sprawdzał tylko kształt wierszy, a teraz porównuje je z tabelą wierszy w `research/swieta-2026-10.md`, także z oznaczeniem „ogłoszone” (`// announced` w `holidays.js`). Dzisiejsze dane przechodzą; test łapie zmianę daty, usunięty wiersz albo zgubione „ogłoszone”.
- **`SITE_URL` w dwóch miejscach:** `build.py` bierze adres strony z `page.js`.

**Pliki:**
- Zmień: `site2/src/costs.js`, `site2/src/ui.js` (`bud.note`), `site2/src/app.js` (zdanie pod budżetem), `site2/build.py` (`SITE_URL`)
- Testy: `tests/data.test.js` (`costs`, `holidays`), `tests/probes/before.js` (zdanie pod budżetem)

**Interfejsy:**
- Daje: `EUR_PLN_DATE` (`'2026-10-09'`) i `COSTS_CHECKED` (`'2026-10-13'`) w `costs.js`; klucz `bud.note` z `{month}`, `{year}` i `{rate}`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/data.test.js` zamień:

```js
  need(TET_MARGIN_DAYS === 7, 'the week before and after Tết counts');
});
```

na:

```js
  need(TET_MARGIN_DAYS === 7, 'the week before and after Tết counts');
  // the facts: the rows are those of the table in research/swieta-2026-10.md, in its order, and a row the government
  // announced („ogłoszone” in the table) is marked // announced in holidays.js, an estimate not
  var table = researchRows('research/swieta-2026-10.md', '## Tabela wierszy'), src = readFile('site2/src/holidays.js').split('\n');
  need(JSON.stringify(HOLIDAYS) === JSON.stringify(table.map(function (r) { return r.slice(0, 4); })), 'HOLIDAYS: the rows of the table in research/swieta-2026-10.md');
  table.forEach(function (r) {
    var line = src.filter(function (l) { return l.indexOf("['" + r[0] + "', '" + r[1] + "'") > -1; })[0] || '';
    need(/\/\/ announced/.test(line) === /^ogłoszone/.test(r[5]), r[0] + ': marked announced in holidays.js exactly when the research says „ogłoszone”');
  });
});
```

W `tests/data.test.js` zamień:

```js
  need(EUR_PLN === 4.3775 && /^\d{4}-\d{2}-\d{2}$/.test(COSTS_CHECKED), 'the NBP rate of 9.10.2026 and the day the prices were checked');
```

na:

```js
  // the rate and its day: the row NBP-A of research/ceny-2026-10.md („Tabela A nr …: EUR 4,3775 zł, …”, the day of the table)
  var nbp = /^\| NBP-A \| Tabela A nr [^:|]*: EUR (\d+),(\d+) zł[^|]*\|[^|]*\|[^|]*\| (\d+)\.(\d+)\.(\d{4}) \|$/m.exec(readFile('research/ceny-2026-10.md'));
  need(nbp && EUR_PLN === +(nbp[1] + '.' + nbp[2]) && typeof EUR_PLN_DATE === 'string' && EUR_PLN_DATE === nbp[5] + '-' + ('0' + nbp[4]).slice(-2) + '-' + ('0' + nbp[3]).slice(-2),
    'EUR_PLN and EUR_PLN_DATE as in the row NBP-A of research/ceny-2026-10.md');
  need(isoDay(COSTS_CHECKED) !== null && typeof EUR_PLN_DATE === 'string' && COSTS_CHECKED >= EUR_PLN_DATE, 'COSTS_CHECKED: a real day, not before the rate');
```

W `tests/probes/before.js` zamień:

```js
  // Cao Bằng ridden yourself
```

na:

```js
  check('the note under the budget names the month of the prices and the day of the NBP rate (costs.js)',
    textOf('#b-budget .b-note') === 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w październiku 2026 i przeliczone z euro po kursie NBP z 9.10.2026.', textOf('#b-budget .b-note'));
  // Cao Bằng ridden yourself
```

- [ ] **Krok 2: Uruchom testy i sprawdź, że nie przechodzą.**

```bash
bash tests/run.sh
```

Oczekiwane: `holidays ok`, a potem przebieg staje na `tests/data.test.js` z błędem:

```text
  costs: EUR_PLN and EUR_PLN_DATE as in the row NBP-A of research/ceny-2026-10.md
  costs: COSTS_CHECKED: a real day, not before the rate
Exception: Error: 2 problem(s) in costs, listed above
```

- [ ] **Krok 3: Kod.**

W `site2/build.py` zamień:

```python
SITE_URL = "https://grzegorzfrskiba-hub.github.io/wietnam/"
```

na:

```python
# the public address, written once: var SITE_URL in page.js (the copied plan links to it)
SITE_URL = re.search(r"^var SITE_URL = '([^']+)';", open(os.path.join(SRC, "page.js"), encoding="utf-8").read(), re.M).group(1)
```

W `site2/src/app.js` zamień:

```js
      '<p class="b-note">' + esc(T('bud.note')) + '</p>';
```

na:

```js
      '<p class="b-note">' + esc(T('bud.note', { month: T('monl.' + +COSTS_CHECKED.slice(5, 7)), year: COSTS_CHECKED.slice(0, 4), rate: fmtSpan(EUR_PLN_DATE, EUR_PLN_DATE) })) + '</p>';
```

W `site2/src/costs.js` zamień:

```js
   EUR_PLN: the NBP rate the page converts with (table A, 9.10.2026). */
var EUR_PLN = 4.3775;
var COSTS_CHECKED = '2026-10-12';   // the day the prices were checked last (11–12.10.2026)
```

na:

```js
   EUR_PLN, EUR_PLN_DATE: the NBP rate the page converts with and the day of its table (the row NBP-A of
   research/ceny-2026-10.md, which tests/data.test.js reads); COSTS_CHECKED: the last day the prices were checked, whose
   month the note under the budget names. */
var EUR_PLN = 4.3775, EUR_PLN_DATE = '2026-10-09';
var COSTS_CHECKED = '2026-10-13';   // the prices of the research notes were checked 11–13.10.2026
```

W `site2/src/ui.js` zamień:

```js
  'bud.note': 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w październiku 2026 i przeliczone z euro po kursie NBP z 9.10.2026.',
```

na:

```js
  'bud.note': 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w {month} {year} i przeliczone z euro po kursie NBP z {rate}.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -o 'og:url" content="[^"]*' site2/out/pages/index.html
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
bash "$TMPDIR/sondy-4.sh" MIESIAC
```

Oczekiwane:
- `ALL PASS`;
- build bez błędów;
- `og:url" content="https://grzegorzfrskiba-hub.github.io/wietnam/`;
- grep nic nie wypisuje;
- `sondy (…): 0 z 14 nie przeszło`. Sonda `before.js` sprawdza teraz także zdanie pod budżetem: „Ceny sprawdzone w październiku 2026 i przeliczone z euro po kursie NBP z 9.10.2026.”

- [ ] **Krok 5: Commit**

```bash
git add site2/src/costs.js site2/src/ui.js site2/src/app.js site2/build.py tests/data.test.js tests/probes/before.js
git commit -F - <<'EOF'
Poprawki z audytu przed publikacją: kurs NBP i dzień cen w jednym miejscu (costs.js: EUR_PLN, EUR_PLN_DATE, COSTS_CHECKED), zdanie pod budżetem składa datę z danych, a test danych czyta kurs z wiersza NBP-A w researchu; test danych porównuje święta z tabelą wierszy w research/swieta-2026-10.md, także znacznik „announced”; build.py bierze adres strony z page.js (SITE_URL w jednym miejscu)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Kroje na własnym hostingu, lżejszy plik offline i `noindex`

Punkty 3, 12 i 13 listy ustaleń:
- **Kroje** IBM Plex Sans, IBM Plex Mono i Newsreader leżą w `site2/fonts/`:
  - 18 plików woff2 z Google Fonts (zestawy latin, latin-ext i vietnamese), z licencjami SIL OFL;
  - reguły `@font-face` w `site2/fonts/fonts.css`, po jednej na plik.

  Strona przestaje łączyć się z Google, co chroni prywatność odwiedzających. Build wstawia reguły do strony: na stronie z plikami w `fonts/` obok niej, a w pliku offline z plikami w środku (base64).
- **Plik offline:** zdjęcia 640 px (otwierające 1280 px) zamiast 1200 px, czyli 6,4 MB zamiast 20,3 MB. Zdanie w `<noscript>` mówi, gdzie otworzyć stronę, gdy plik pokaże podgląd bez JavaScriptu (iPhone).
- **`noindex`** tylko na stronie publicznej (stała `NOINDEX` w `build.py`, decyzja 1).
- **Narzędzia Chrome bez okna** czytają kroje z dysku: Chrome nie wczyta pliku kroju z `file://` bez flagi `--allow-file-access-from-files`. Bez niej zrzuty i PDF wyszłyby krojem zastępczym, z innymi szerokościami etykiet mapy. Flaga trafia do `shot.sh` i `print.sh`, a `probe.sh` dostaje dowiązanie `fonts/` obok kopii strony.

**Pliki:**
- Utwórz: `site2/fonts/fonts.css`; skopiuj z gałęzi suchej próby 18 plików woff2 i `OFL-IBM-Plex.txt`, `OFL-Newsreader.txt`
- Zmień: `site2/src/template.html` (bez Google Fonts, `/* __FONTS__ */`, `<noscript>`), `site2/build.py`
- Testy: `tests/run.sh` (kontrola krojów), `tests/probe.sh`, `tests/shot.sh`, `tests/print.sh`, nowa sonda `tests/probes/publish.js`

**Interfejsy:**
- Daje:
  - `fonts_css(inline)` w `build.py`;
  - znaczniki `/* __FONTS__ */` i `__SITE_URL__` w `template.html`, które wypełnia build;
  - folder `fonts/` obok strony w `site2/out/web` i `site2/out/pages`;
  - `NOINDEX = True`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/print.sh` zamień:

```bash
"$C" --headless=new --disable-gpu --user-data-dir="$TMP" "${DARK[@]+"${DARK[@]}"}" \
```

na:

```bash
"$C" --headless=new --disable-gpu --user-data-dir="$TMP" --allow-file-access-from-files "${DARK[@]+"${DARK[@]}"}" \
```

W `tests/probe.sh` zamień:

```bash
HASH="${3:-}"; HASH="${HASH//MIESIAC/$(date -v+5m +%Y-%m)}"
```

na:

```bash
ln -s "$PWD/site2/out/pages/fonts" "$D/fonts"
HASH="${3:-}"; HASH="${HASH//MIESIAC/$(date -v+5m +%Y-%m)}"
```

Utwórz `tests/probes/publish.js`:

```js
// What the published page loads and says about itself: the fonts are its own files from the folder fonts/ next to it
// (no request to Google Fonts), the link preview and the robots tag of the public page (noindex while the first friends
// try it: NOINDEX in site2/build.py), and the sentence for a viewer without JavaScript (an iPhone's preview of a file).
// tests/probe.sh tests/probes/publish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var links = Array.prototype.map.call(document.querySelectorAll('link[href]'), function (l) { return l.href; });
  check('no link to Google Fonts', !links.some(function (h) { return /fonts\.(googleapis|gstatic)/.test(h); }), links.join(' '));
  var srcs = [];
  Array.prototype.forEach.call(document.styleSheets, function (s) { Array.prototype.forEach.call(s.cssRules, function (r) { if (r.type === 5) srcs.push(r.style.getPropertyValue('src')); }); });
  check('the 18 @font-face rules name files in the folder fonts/ next to the page', srcs.length === 18 && srcs.every(function (s) { return /fonts\/[a-z0-9-]+\.woff2/.test(s) && !/gstatic/.test(s); }), srcs.length + ': ' + srcs[0]);
  var loaded = {};
  document.fonts.forEach(function (f) { if (f.status === 'loaded') loaded[f.family.replace(/["']/g, '')] = true; });
  check('IBM Plex Sans, IBM Plex Mono and Newsreader are loaded', loaded['IBM Plex Sans'] && loaded['IBM Plex Mono'] && loaded.Newsreader, Object.keys(loaded).join(', '));
  var robots = document.querySelector('meta[name="robots"]');
  check('the public page asks search engines not to index it (noindex)', !!robots && robots.getAttribute('content') === 'noindex', robots && robots.outerHTML);
  check('the link preview names the public address', (document.querySelector('meta[property="og:url"]') || {}).content === 'https://grzegorzfrskiba-hub.github.io/wietnam/');
  var ns = document.querySelector('noscript');
  check('a viewer without JavaScript gets a sentence with the address', !!ns && /potrzebuje JavaScriptu/.test(ns.textContent) && /grzegorzfrskiba-hub\.github\.io\/wietnam\//.test(ns.textContent), ns && ns.textContent);
  done();
}, 1500);
```

W `tests/run.sh` zamień:

```bash
echo "ALL PASS"
```

na:

```bash
echo "== lint: the fonts come with the page (site2/fonts), not from Google Fonts"
if grep -nE "fonts\.(googleapis|gstatic)\.com" site2/src/template.html site2/build.py; then echo "FAIL: the page loads fonts from Google" >&2; exit 1; fi
[ -f site2/fonts/fonts.css ] || { echo "FAIL: site2/fonts/fonts.css is missing" >&2; exit 1; }
for f in $(grep -o "url(fonts/[a-z0-9-]*\.woff2)" site2/fonts/fonts.css | sed 's/^url(fonts\///; s/)$//'); do
  [ -f "site2/fonts/$f" ] || { echo "FAIL: site2/fonts/$f is missing" >&2; exit 1; }
done
echo "ALL PASS"
```

W `tests/shot.sh` zamień:

```bash
"$C" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP" \
```

na:

```bash
"$C" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP" --allow-file-access-from-files \
```

- [ ] **Krok 2: Uruchom testy i sprawdź, że nie przechodzą.**

```bash
bash tests/run.sh
```

Oczekiwane: wszystkie testy `ok`, a potem nowa kontrola krojów wypisuje trzy linie Google Fonts z `site2/src/template.html` i kończy się:

```text
FAIL: the page loads fonts from Google
```

- [ ] **Krok 3: Kod i pliki krojów.**

Pliki krojów pobrano 14.10.2026 za zgodą użytkownika. Weź je z commitu tego zadania na gałęzi suchej próby, bez ponownego pobierania, i sprawdź sumy:

```bash
git checkout fac30e2 -- 'site2/fonts/*.woff2' 'site2/fonts/*.txt'
shasum -a 256 -c - <<'EOF'
7e6b2818edbd8f6a01ae80641cc8f16a51080d08fb4e532be3a0b6f74adb07da  site2/fonts/OFL-IBM-Plex.txt
fdfad38143ec470553cae82a1e45320bdd1b9ec70415d37bd0171051d8a4ded8  site2/fonts/OFL-Newsreader.txt
f1050dc5317b43434c0aeda599d4624c774ffc162e87a8cf204b949b6a85816d  site2/fonts/ibm-plex-mono-400-latin-ext.woff2
c36f509c0a8f9f85f29cb44bc8701d8a9e0b14c499e77a884f789ead7093a7ac  site2/fonts/ibm-plex-mono-400-latin.woff2
0a8b854cc18641bd1b8222afa7ec82a75e59bc6501f777744ec87db1b6cd7a2c  site2/fonts/ibm-plex-mono-400-vietnamese.woff2
77f03e26f981c582bdba3a7abed4baa2d3149211c01366bb3ab3ba7622ec4ae5  site2/fonts/ibm-plex-mono-500-latin-ext.woff2
a76f53ca6612e7b3828eec2311098675b7f9849ae4169a8bcef6302aec02a6c0  site2/fonts/ibm-plex-mono-500-latin.woff2
b2529fba93fd07a50ffb8fc3d103eb04b0c298d4f6564d2833c44fde286de7e4  site2/fonts/ibm-plex-mono-500-vietnamese.woff2
f0d521828c0d91f2857f001f0ede42adb7b2c12520b00f1cbc1af16ae4fa1eeb  site2/fonts/ibm-plex-sans-italic-latin-ext.woff2
134dc0ee94e70cf5d52f608a7ac4b864c9b00bdf69779b8919712ce89da253b1  site2/fonts/ibm-plex-sans-italic-latin.woff2
78cf4ebeacdce782613207abc4dd52a19fa30f306dc60e817f293287bac4516d  site2/fonts/ibm-plex-sans-italic-vietnamese.woff2
ae1d854fefa1167a79071f1afe01d4d51b60c5840c1be36dd74bd5fe7375b405  site2/fonts/ibm-plex-sans-normal-latin-ext.woff2
056e4e2459f57a0033c8c9c844ff19d6e42ac8602027803d4345823bcc939818  site2/fonts/ibm-plex-sans-normal-latin.woff2
526a4dd36c3af41f73a623e852302d8947d7fd4c00ee3026d82ef1f24a412fcd  site2/fonts/ibm-plex-sans-normal-vietnamese.woff2
89e1d530cc551a0f1476bac4983b8c3f9d4842e414dc624fcff16e31acf17c35  site2/fonts/newsreader-italic-latin-ext.woff2
e384e31812c1d580b5ae2217ade8ca5fe9e5135ea9c27423359d00a954c28488  site2/fonts/newsreader-italic-latin.woff2
b2322735d7fe57fae3c4d2246860ea82241ba493f7ed7c0e0394fdcdb2c8b247  site2/fonts/newsreader-italic-vietnamese.woff2
cbca001188852d514d8654be7ddc97868f039bdf986b926ec5c985c117853cfd  site2/fonts/newsreader-normal-latin-ext.woff2
01817351be3edfc1714fe6d60ddea6a22a169a5ebd033b50c7f9495e5d9c386a  site2/fonts/newsreader-normal-latin.woff2
68ef9a14f1462e2218ecd03c39d26236402ff6a9e78da39ba5591a430a229824  site2/fonts/newsreader-normal-vietnamese.woff2
EOF
```

Oczekiwane: 20 linii zakończonych `OK`.

W `site2/build.py` zamień:

```python
"""Build the page: a fragment with separate image files (out/web, for a private artifact), the same page as a full
document for GitHub Pages (out/pages, with the link preview) and one offline file with the images inside (out/offline)."""
```

na:

```python
"""Build the page: a fragment with separate image and font files (out/web, for a private artifact), the same page as a full
document for GitHub Pages (out/pages, with the link preview and the robots tag) and one offline file with the images and
the fonts inside (out/offline), for a computer or Chrome on Android (an iPhone does not run its scripts)."""
```

W `site2/build.py` zamień:

```python
OUT_WEB = os.path.join(ROOT, "out", "web")
```

na:

```python
FONT_DIR = os.path.join(ROOT, "fonts")   # the fonts with their licences and fonts.css, the @font-face rules
OUT_WEB = os.path.join(ROOT, "out", "web")
```

W `site2/build.py` zamień:

```python
# The offline file keeps one embedded size per photo.
SMALLER = {"photo": (480, 960), "hero": (960, 1400)}
```

na:

```python
# The offline file keeps one embedded size per photo, small enough for a file of about 6 MB: width and JPEG quality.
SMALLER = {"photo": (480, 960), "hero": (960, 1400)}
OFFLINE = {"photo": (640, 60), "hero": (1280, 62)}
```

W `site2/build.py` zamień:

```python
# tab icon: karst peaks on the page's accent green
```

na:

```python
# The public page stays out of search engines while the first friends try it (decision of 14.10.2026); to open it, set
# NOINDEX = False, build and publish again.
NOINDEX = True
# tab icon: karst peaks on the page's accent green
```

W `site2/build.py` zamień:

```python
    """Tab icon for every full document; the link preview tags only for the public page."""
    from urllib.parse import quote
    out = '<link rel="icon" href="data:image/svg+xml,%s">\n' % quote(ICON, safe="/:=' ")
```

na:

```python
    """Tab icon for every full document; the link preview tags and, while NOINDEX, the robots tag only for the public page."""
    from urllib.parse import quote
    out = '<link rel="icon" href="data:image/svg+xml,%s">\n' % quote(ICON, safe="/:=' ")
    if preview and NOINDEX:
        out += '<meta name="robots" content="noindex">\n'
```

W `site2/build.py` zamień:

```python
def photo_ids():
```

na:

```python
def fonts_css(inline):
    """The @font-face rules of site2/fonts/fonts.css: as written (url(fonts/…), the files next to the page) or, for the
    offline file, with each woff2 file inside as base64. Every file the rules name must exist."""
    def one(m):
        path = os.path.join(FONT_DIR, m.group(1))
        assert os.path.exists(path), "no font file " + path
        return "url(data:font/woff2;base64,%s)" % base64.b64encode(open(path, "rb").read()).decode() if inline else m.group(0)
    return re.sub(r"url\(fonts/([a-z0-9-]+\.woff2)\)", one, open(os.path.join(FONT_DIR, "fonts.css"), encoding="utf-8").read())


def photo_ids():
```

W `site2/build.py` zamień:

```python
    os.makedirs(os.path.join(OUT_WEB, "img"))

```

na:

```python
    os.makedirs(os.path.join(OUT_WEB, "img"))
    # the font files travel with their licences (SIL OFL); their rules go into the page itself
    shutil.copytree(FONT_DIR, os.path.join(OUT_WEB, "fonts"), ignore=shutil.ignore_patterns("*.css"))

```

W `site2/build.py` zamień:

```python
        (w, h), b = encode(im, 1600 if pid == hero else 1200, 68)
```

na:

```python
        (w, h), b = encode(im, *OFFLINE["hero" if pid == hero else "photo"])
```

W `site2/build.py` zamień:

```python
    def page(photos):
```

na:

```python
    def page(photos, fonts):
```

W `site2/build.py` zamień:

```python
                .replace("__HERO_H__", str(top["h"])).replace("__SCRIPT__", script))

    web_page = page(web)
```

na:

```python
                .replace("__HERO_H__", str(top["h"])).replace("/* __FONTS__ */", fonts).replace("__SITE_URL__", SITE_URL).replace("__SCRIPT__", script))

    web_page = page(web, fonts_css(False))
```

W `site2/build.py` zamień:

```python
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off)))
```

na:

```python
    shutil.copytree(os.path.join(OUT_WEB, "fonts"), os.path.join(OUT_PAGES, "fonts"))
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off, fonts_css(True))))
```

Utwórz `site2/fonts/fonts.css`:

```css
/* IBM Plex Sans, IBM Plex Mono and Newsreader under the SIL Open Font License 1.1 (OFL-IBM-Plex.txt, OFL-Newsreader.txt):
   the woff2 files and @font-face rules of Google Fonts (css2 API, read 14.10.2026), only the subsets latin, latin-ext and
   vietnamese, one rule per file (a variable font covers its range of weights). site2/build.py puts these rules into the
   page: url(fonts/…) next to the page on the web, the files themselves (base64) in the offline file. */
@font-face { font-family: 'IBM Plex Sans'; font-style: italic; font-weight: 400; font-stretch: 100%; font-display: swap; src: url(fonts/ibm-plex-sans-italic-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IBM Plex Sans'; font-style: italic; font-weight: 400; font-stretch: 100%; font-display: swap; src: url(fonts/ibm-plex-sans-italic-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'IBM Plex Sans'; font-style: italic; font-weight: 400; font-stretch: 100%; font-display: swap; src: url(fonts/ibm-plex-sans-italic-vietnamese.woff2) format('woff2'); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
@font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 400 600; font-stretch: 100%; font-display: swap; src: url(fonts/ibm-plex-sans-normal-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 400 600; font-stretch: 100%; font-display: swap; src: url(fonts/ibm-plex-sans-normal-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 400 600; font-stretch: 100%; font-display: swap; src: url(fonts/ibm-plex-sans-normal-vietnamese.woff2) format('woff2'); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url(fonts/ibm-plex-mono-400-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url(fonts/ibm-plex-mono-400-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url(fonts/ibm-plex-mono-400-vietnamese.woff2) format('woff2'); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 500; font-display: swap; src: url(fonts/ibm-plex-mono-500-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 500; font-display: swap; src: url(fonts/ibm-plex-mono-500-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 500; font-display: swap; src: url(fonts/ibm-plex-mono-500-vietnamese.woff2) format('woff2'); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
@font-face { font-family: 'Newsreader'; font-style: italic; font-weight: 400; font-display: swap; src: url(fonts/newsreader-italic-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Newsreader'; font-style: italic; font-weight: 400; font-display: swap; src: url(fonts/newsreader-italic-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Newsreader'; font-style: italic; font-weight: 400; font-display: swap; src: url(fonts/newsreader-italic-vietnamese.woff2) format('woff2'); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
@font-face { font-family: 'Newsreader'; font-style: normal; font-weight: 400 500; font-display: swap; src: url(fonts/newsreader-normal-latin.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Newsreader'; font-style: normal; font-weight: 400 500; font-display: swap; src: url(fonts/newsreader-normal-latin-ext.woff2) format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Newsreader'; font-style: normal; font-weight: 400 500; font-display: swap; src: url(fonts/newsreader-normal-vietnamese.woff2) format('woff2'); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
```

W `site2/src/template.html` zamień:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap">
<style>
```

na:

```html
<style>
/* __FONTS__ */
```

W `site2/src/template.html` zamień:

```html
.hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; }
```

na:

```html
/* without JavaScript (an iPhone's preview of the offline file): where to open the page instead */
.noscript { margin: 0; padding: 16px var(--gutter); background: var(--warm-soft); color: var(--ink); }
.hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; }
```

W `site2/src/template.html` zamień:

```html
<header class="hero" id="top">
```

na:

```html
<noscript><p class="noscript">Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu. Jeśli widzisz ten tekst w podglądzie pliku na iPhonie, otwórz w przeglądarce stronę __SITE_URL__ albo zapisz na niej swoją trasę jako PDF.</p></noscript>
<header class="hero" id="top">
```

- [ ] **Krok 4: Testy, build, plik offline bez sieci i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -c 'name="robots"' site2/out/pages/index.html site2/out/web/index.html site2/out/offline/Wietnam-po-swojemu.html
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
```

Oczekiwane:
- `ALL PASS`;
- build kończy się `offline file 6.4 MB`;
- `noindex` tylko na stronie publicznej: liczby 1, 0, 0;
- grep twardej spacji nic nie wypisuje.

Plik offline z odciętą siecią (Chrome dostaje martwy serwer pośredniczący): kroje mają się wczytać ze środka pliku, a trasa ma się ułożyć:

```bash
D="$TMPDIR/offline-check"; rm -rf "$D"; mkdir -p "$D"
{ cat site2/out/offline/Wietnam-po-swojemu.html; echo "<script>setTimeout(function(){var L={};document.fonts.forEach(function(f){if(f.status==='loaded')L[f.family.replace(/[\"']/g,'')]=1;});console.log('P:fonts '+Object.keys(L).sort().join(', '));console.log('P:stops '+document.querySelectorAll('#stops .stop').length);},2000);</script>"; } > "$D/index.html"
U=$(mktemp -d)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --user-data-dir="$U" --enable-logging=stderr --v=0 --virtual-time-budget=6000 --proxy-server=127.0.0.1:9 --dump-dom "file://$D/index.html" > /dev/null 2> "$D/log.txt"
rm -rf "$U"; grep -o '"P:[^"]*' "$D/log.txt"
```

Oczekiwane: `"P:fonts IBM Plex Mono, IBM Plex Sans, Newsreader` i `"P:stops N` z N większym od 0 (trasa domyślna, zależna od dzisiejszej daty).

```bash
bash "$TMPDIR/sondy-4.sh" MIESIAC
```

Oczekiwane: `SKIP pdf.js (jeszcze nie ma)` i `sondy (…): 0 z 15 nie przeszło`. Nowa sonda `publish.js` sprawdza:
- 18 reguł `@font-face` z plikami w `fonts/`;
- trzy załadowane kroje;
- brak linków do Google Fonts;
- `noindex`;
- podgląd linku z adresem strony;
- zdanie bez JavaScriptu.

- [ ] **Krok 5: Commit**

```bash
git add tests/run.sh tests/probe.sh tests/shot.sh tests/print.sh tests/probes/publish.js site2/fonts site2/src/template.html site2/build.py
git commit -F - <<'EOF'
Kroje na własnym hostingu: IBM Plex Sans, IBM Plex Mono i Newsreader w site2/fonts (18 plików woff2 z Google Fonts, litery łacińskie, polskie i wietnamskie, z licencjami SIL OFL i regułami @font-face), strona nie łączy się już z Google, a plik offline ma kroje w środku; plik offline ze zdjęciami 640 px (6,4 MB zamiast 20,3 MB) i ze zdaniem dla przeglądarki bez JavaScriptu (podgląd pliku na iPhonie); wersja na Pages z „noindex” (NOINDEX w build.py) do czasu opinii znajomych; sonda publish.js, kontrola krojów w tests/run.sh, zrzuty i wydruk czytają kroje z dysku

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: PDF: przycisk „Zapisz trasę jako PDF” i wydruk na A4

Decyzja 6 i punkty 9–11 listy ustaleń. PDF jest wersją offline dla podróżnych, bo otworzy go każdy telefon. Przed zmianą trzy trasy drukowały się na 13, 17 i 23 stronach formatu Letter (Chrome bez `@page`), z mapą ok. 6 cm i pustym miejscem obok.
- **Przycisk „Zapisz trasę jako PDF”** stoi obok „Kopiuj plan na WhatsApp” i wywołuje okno drukowania wprost z dotknięcia (Safari odrzuca drukowanie, którego nie poprosił odwiedzający). Pod przyciskami stoi podpowiedź dla iPhone'a, Androida i komputera. Przyciski i podpowiedź są w `.copy`, która się nie drukuje.
- **Wydruk:**
  - A4 z marginesami 12 mm (`@page`);
  - mapa w trzech osobnych kadrach (północ i środek obok siebie, pod nimi południe z legendą), każdy ok. 9 cm szerokości; mapa z boku strony zostaje na ekranie;
  - pod tytułem link „Ten plan na stronie: …” do tej trasy;
  - jedno zdjęcie na miejsce, ok. 7,5 cm szerokości i 5 cm wysokości;
  - zdanie „Kliknij dzień, żeby do niego przejść” się nie drukuje;
  - przełącznik motocykla dzieli się między akapitami. W suchej próbie ramka „Samodzielnie” w Hà Giang przeskakiwała w całości na następną stronę i zostawiała pół strony pustej.
- **Kopie kadrów mapy** robi jedna funkcja `panelSvg`, wspólna dla powiększenia mapy i wydruku: kopia ma własne identyfikatory i `viewBox` wokół swojego kadru.
- **`tests/print.sh`:** drukuje na A4 z reguły `@page`, podaje format papieru i kończy się kodem 1 przy zakrytych liniach tekstu.

**Pliki:**
- Zmień: `site2/src/template.html` (CSS przycisku i wydruku, `@page`, przycisk, podpowiedź, `#map-print`, `#print-link`, „Kliknij dzień…” osobno), `site2/src/app.js` (`render`, `renderMap`, `panelSvg`, `openMapZoom`, przycisk), `site2/src/ui.js` (`pdf.btn`, `pdf.hint`, `shape.p`, `shape.click`)
- Testy: `tests/content.test.js` (`printout`), `tests/print.sh`, nowa sonda `tests/probes/pdf.js`

**Interfejsy:**
- Daje:
  - `panelSvg(svg, b, tag)` w app.js: jeden kadr mapy jako osobne SVG, z identyfikatorami zakończonymi `-<tag>`;
  - elementy `#pdf-plan`, `.pdf-hint`, `#map-print` (z `.mp-panel` i `.mp-legend`), `#print-link`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
/* What the parks allow today (research/<id>-2026-10.md): every plan that drives to Sơn Trà says to check the notice of its
```

na:

```js
/* The printout, the offline version for travellers (decision of 14.10.2026): A4 with 12 mm margins, the button „Zapisz
   trasę jako PDF” right after „Kopiuj plan na WhatsApp”, the map's panels apart for print and the link to the route on the
   first page; tests/probes/pdf.js taps the button, tests/print.sh prints. */
contentCheck('printout', function (need) {
  var tpl = readFile('site2/src/template.html');
  need(/\n@page \{ size: A4; margin: 12mm; \}\n/.test(tpl), 'template.html: @page { size: A4; margin: 12mm; }');
  need(/id="copy-plan"[^>]*><\/button>\s*<button type="button" class="btn-ghost" id="pdf-plan" data-i18n="pdf.btn"><\/button>/.test(tpl), 'template.html: the PDF button right after „Kopiuj plan”');
  need(/<div class="map-print" id="map-print"><\/div>/.test(tpl) && /<p class="print-link" id="print-link"><\/p>/.test(tpl), 'template.html: the map and the link of the printout');
});

/* What the parks allow today (research/<id>-2026-10.md): every plan that drives to Sơn Trà says to check the notice of its
```

W `tests/print.sh` zamień:

```bash
# Prints the built page to PDF through headless Chrome (A4, backgrounds on), then reports the page count,
# the pages that are almost empty and the text lines covered by a box drawn over them (must be 0).
```

na:

```bash
# Prints the built page to PDF through headless Chrome (A4 from the page's @page rule, backgrounds on), then reports the
# paper, the page count, the pages that are almost empty and the text lines covered by a box drawn over them.
# Exit 1 when a line of text is covered.
```

W `tests/print.sh` zamień:

```bash
print("%s: %d pages; filled to %% of height: %s; under 45%% (not counting the last): %s" % (sys.argv[1], len(doc), fill, low or "none"))
```

na:

```bash
print("%s: %d pages of %.0f x %.0f mm; filled to %% of height: %s; under 45%% (not counting the last): %s"
      % (sys.argv[1], len(doc), doc[0].rect.width * 25.4 / 72, doc[0].rect.height * 25.4 / 72, fill, low or "none"))
```

W `tests/print.sh` zamień:

```bash
PY
```

na:

```bash
sys.exit(1 if lines else 0)
PY
```

Utwórz `tests/probes/pdf.js`:

```js
// „Zapisz trasę jako PDF” and the printout: the button stands right after „Kopiuj plan na WhatsApp”, with its hint, and a
// tap opens the print dialog (window.print, stubbed here); the printout gets the three panels of the map apart, each a
// copy with its own ids and a viewBox around its panel, the legend, and the link to this route on the public page; on the
// screen these parts stay hidden.
// tests/probe.sh tests/probes/pdf.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=gory,kultura&poziom=2'
setTimeout(function () {
  var btn = document.getElementById('pdf-plan'), printed = 0;
  check('the button „Zapisz trasę jako PDF” stands right after „Kopiuj plan na WhatsApp”', !!btn && btn.textContent === 'Zapisz trasę jako PDF' &&
    !!btn.previousElementSibling && btn.previousElementSibling.id === 'copy-plan', btn && btn.textContent);
  check('its hint says where to tap on an iPhone and on Android', /Zachowaj w Plikach/.test(textOf('.pdf-hint')) && /Zapisz jako PDF/.test(textOf('.pdf-hint')), textOf('.pdf-hint'));
  window.print = function () { printed++; };
  btn.click();
  check('a tap opens the print dialog', printed === 1, printed);
  var panels = document.querySelectorAll('#map-print .mp-panel svg'), boxes = Array.prototype.map.call(panels, function (s) { return s.getAttribute('viewBox'); });
  check('the printout has the three panels of the map, each with its own viewBox', panels.length === 3 && boxes[0] !== boxes[1] && boxes[1] !== boxes[2], boxes.join(' | '));
  var seen = {}, twice = Array.prototype.map.call(document.querySelectorAll('[id]'), function (e) { return e.id; })
    .filter(function (id) { if (seen[id]) return true; seen[id] = true; return false; });
  check('no id twice on the page (the copies of the map have their own)', twice.length === 0, twice.slice(0, 5).join(', '));
  check('the printout has the legend of the map', /Droga/.test(textOf('#map-print .mp-legend')), textOf('#map-print .mp-legend'));
  var link = document.querySelector('#print-link a');
  check('the printout links to this route on the public page', !!link && link.getAttribute('href') === 'https://grzegorzfrskiba-hub.github.io/wietnam/' + location.hash &&
    textOf('#print-link').indexOf('Ten plan na stronie: ') === 0, link && link.getAttribute('href'));
  check('on the screen the parts of the printout stay hidden', getComputedStyle(document.getElementById('map-print')).display === 'none' &&
    getComputedStyle(document.getElementById('print-link')).display === 'none');
  done();
}, 1500);
```

- [ ] **Krok 2: Uruchom testy i sprawdź, że nie przechodzą.**

```bash
bash tests/run.sh
```

Oczekiwane: przebieg staje na `tests/content.test.js` z błędem:

```text
  printout: template.html: @page { size: A4; margin: 12mm; }
  printout: template.html: the PDF button right after „Kopiuj plan”
  printout: template.html: the map and the link of the printout
Exception: Error: 3 problem(s) in printout, listed above
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
    tieShortWords(document.body);
```

na:

```js
    // the printout names this route's address on the public page (as the copied plan does)
    var url = SITE_URL + linkHash(state.settings);
    $('#print-link').innerHTML = esc(T('pt.link')) + '<a href="' + esc(url) + '">' + esc(url) + '</a>';
    tieShortWords(document.body);
```

W `site2/src/app.js` zamień:

```js
    $('#map').innerHTML = '<svg viewBox="-6 -6 ' + (MAP_WIDTH + 12) + ' ' + (L.height + 12) + '" role="img" aria-labelledby="map-title"><title id="map-title">' + T('m.title') +
      esc(state.route.stops.map(function (s) { return C(s.id).short; }).join(', ')) + '</title><defs>' + defs.join('') + '</defs>' + body.join('') + '</svg>' +
      '<p class="map-legend"><span><svg width="24" height="6" aria-hidden="true"><line class="m-road" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.road') + '</span>' +
      '<span><svg width="24" height="6" aria-hidden="true"><line class="m-fly" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.flight') + '</span>' +
      '<span><svg width="12" height="12" aria-hidden="true"><rect class="m-airport" x="0.8" y="0.8" width="10.4" height="10.4" rx="2"/></svg>' + T('m.airports') + '</span>' +
      '<span class="map-note">' + T('m.scale') + '</span><button type="button" class="map-hint">' + T('m.zoom') + '</button></p>';
```

na:

```js
    var legend = '<span><svg width="24" height="6" aria-hidden="true"><line class="m-road" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.road') + '</span>' +
      '<span><svg width="24" height="6" aria-hidden="true"><line class="m-fly" x1="0" x2="24" y1="3" y2="3"/></svg>' + T('m.flight') + '</span>' +
      '<span><svg width="12" height="12" aria-hidden="true"><rect class="m-airport" x="0.8" y="0.8" width="10.4" height="10.4" rx="2"/></svg>' + T('m.airports') + '</span>' +
      '<span class="map-note">' + T('m.scale') + '</span>';
    $('#map').innerHTML = '<svg viewBox="-6 -6 ' + (MAP_WIDTH + 12) + ' ' + (L.height + 12) + '" role="img" aria-labelledby="map-title"><title id="map-title">' + T('m.title') +
      esc(state.route.stops.map(function (s) { return C(s.id).short; }).join(', ')) + '</title><defs>' + defs.join('') + '</defs>' + body.join('') + '</svg>' +
      '<p class="map-legend">' + legend + '<button type="button" class="map-hint">' + T('m.zoom') + '</button></p>';
    // the printout: the three panels apart, north and centre side by side, the south under them with the legend
    var svg = $('#map svg').outerHTML;
    $('#map-print').innerHTML = mapBoxes.map(function (b, i) { return '<div class="mp-panel">' + panelSvg(svg, b, 'p' + i) + '</div>'; }).join('') +
      '<p class="map-legend mp-legend">' + legend + '</p>';
  }
  /* One panel of the map as an SVG of its own (the zoom and the printout): own ids, so a copy never borrows the sidebar
     map's clip paths (the ids clip-<panel>, never the attribute clip-path), and a viewBox around the panel. b: its box in
     mapBoxes; tag: what the copy's ids end with. */
  function panelSvg(svg, b, tag) {
    return svg.replace(new RegExp('(clip-(?:' + Object.keys(MAP_PANELS).join('|') + ')|map-title)', 'g'), '$1-' + tag)
      .replace(/viewBox="[^"]*"/, 'viewBox="-6 ' + (b.y - 6) + ' ' + (MAP_WIDTH + 12) + ' ' + (b.h + 12) + '"');
```

W `site2/src/app.js` zamień:

```js
      // own ids so the copies never borrow the sidebar map's clip paths (the ids clip-<panel>, never the attribute clip-path);
      // each copy shows one panel
      d.innerHTML = svg.replace(new RegExp('(clip-(?:' + Object.keys(MAP_PANELS).join('|') + ')|map-title)', 'g'), '$1-z' + i)
        .replace(/viewBox="[^"]*"/, 'viewBox="-6 ' + (b.y - 6) + ' ' + (MAP_WIDTH + 12) + ' ' + (b.h + 12) + '"');
```

na:

```js
      d.innerHTML = panelSvg(svg, b, 'z' + i);
```

W `site2/src/app.js` zamień:

```js
  bindAnchors();
```

na:

```js
  // „Zapisz trasę jako PDF”: the print dialog straight from the tap (Safari refuses a print it did not see asked for)
  $('#pdf-plan').addEventListener('click', function () { window.print(); });
  bindAnchors();
```

W `site2/src/template.html` zamień:

```html
#copy-status { font-size: 14px; color: var(--accent); }
```

na:

```html
.pdf-hint { flex-basis: 100%; margin: 0; max-width: 62ch; font-size: 14px; color: var(--muted); }
#copy-status { font-size: 14px; color: var(--accent); }
```

W `site2/src/template.html` zamień:

```html
/* the zoom button exists for screen readers and keyboards only where zooming works (wide screens); display: none hides it everywhere else */
```

na:

```html
/* the map's panels apart and the link to the route: for the printout only (@media print) */
.map-print, .print-link { display: none; }
/* the zoom button exists for screen readers and keyboards only where zooming works (wide screens); display: none hides it everywhere else */
```

W `site2/src/template.html` zamień:

```html
@media print {
```

na:

```html
@page { size: A4; margin: 12mm; }
@media print {
```

W `site2/src/template.html` zamień:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .lightbox, .mapzoom { display: none !important; }
  .hero-text { color: var(--ink); text-shadow: none; padding-block: 0 24px; }
  .hero .eyebrow { color: var(--muted); }
  .map-col { position: static; break-inside: avoid; }
  .map svg { max-width: 220px; }
```

na:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .lightbox, .mapzoom, .shape-click { display: none !important; }
  .hero-text { color: var(--ink); text-shadow: none; padding-block: 0 24px; }
  .hero .eyebrow { color: var(--muted); }
  /* the map: its three panels apart across the page, north and centre side by side, the south under them with the
     legend, each about 9 cm wide (the sidebar map is for the screen); the link to the route under the title */
  .map-col { display: none !important; }
  .map-print { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; align-items: start; break-inside: avoid; margin-bottom: 8mm; }
  .map-print svg { display: block; width: 100%; height: auto; }
  .mp-legend { align-self: end; }
  .print-link { display: block; margin-top: 12px; font: 11px var(--mono); color: var(--muted); overflow-wrap: anywhere; }
```

W `site2/src/template.html` zamień:

```html
  .gal { max-width: 360px; break-inside: avoid; }
```

na:

```html
  /* one photo a stay, about 5 cm high, so a photo that has to move to the next page leaves a smaller gap */
  .gal { max-width: 7.5cm; break-inside: avoid; }
```

W `site2/src/template.html` zamień:

```html
  /* "Przed wyjazdem" and the motorbike's choice: blocks, not grids (as .stop above), and each of their items whole */
```

na:

```html
  /* "Przed wyjazdem" and the motorbike's choice: blocks, not grids (as .stop above), and each of their items whole; the
     choice may break between its paragraphs, its heading stays with the switch */
```

W `site2/src/template.html` zamień:

```html
  .b-book li, .b-list li, .b-parts li, .swap { break-inside: avoid; }
```

na:

```html
  .b-book li, .b-list li, .b-parts li, .swap-seg, .swap p { break-inside: avoid; }
  .swap-h { break-after: avoid; }
```

W `site2/src/template.html` zamień:

```html
      <div class="hero-cta"><a class="primary" href="#settings" data-i18n="hero.cta1"></a><a class="ghost" href="#shape" data-i18n="hero.cta2"></a></div>
```

na:

```html
      <p class="print-link" id="print-link"></p>
      <div class="hero-cta"><a class="primary" href="#settings" data-i18n="hero.cta1"></a><a class="ghost" href="#shape" data-i18n="hero.cta2"></a></div>
```

W `site2/src/template.html` zamień:

```html
      <p data-i18n="shape.p"></p>
```

na:

```html
      <p><span data-i18n="shape.p"></span> <span class="shape-click" data-i18n="shape.click"></span></p>
```

W `site2/src/template.html` zamień:

```html
      <span id="copy-status" role="status"></span>
      <textarea id="copy-fallback" rows="9" readonly hidden data-i18n-aria="copy.aria"></textarea>
```

na:

```html
      <button type="button" class="btn-ghost" id="pdf-plan" data-i18n="pdf.btn"></button>
      <span id="copy-status" role="status"></span>
      <textarea id="copy-fallback" rows="9" readonly hidden data-i18n-aria="copy.aria"></textarea>
      <p class="pdf-hint" data-i18n="pdf.hint"></p>
```

W `site2/src/template.html` zamień:

```html
    <div class="route">
```

na:

```html
    <div class="map-print" id="map-print"></div>
    <div class="route">
```

W `site2/src/ui.js` zamień:

```js
  'shape.p': 'Jeden kwadrat to jeden dzień, w kolorze miejsca noclegu. Kropka oznacza dzień przyjazdu. Kliknij dzień, żeby do niego przejść.',
```

na:

```js
  'shape.p': 'Jeden kwadrat to jeden dzień, w kolorze miejsca noclegu. Kropka oznacza dzień przyjazdu.', 'shape.click': 'Kliknij dzień, żeby do niego przejść.',
```

W `site2/src/ui.js` zamień:

```js
  'copy.btn': 'Kopiuj plan na WhatsApp', 'copy.aria': 'Plan jako tekst', 'copy.ok': 'Skopiowano. Wklej plan do czatu.', 'copy.fail': 'Skopiuj zaznaczony tekst poniżej.',

```

na:

```js
  'copy.btn': 'Kopiuj plan na WhatsApp', 'copy.aria': 'Plan jako tekst', 'copy.ok': 'Skopiowano. Wklej plan do czatu.', 'copy.fail': 'Skopiuj zaznaczony tekst poniżej.',
  'pdf.btn': 'Zapisz trasę jako PDF',
  'pdf.hint': 'Otworzy się okno drukowania. Na iPhonie stuknij Udostępnij u góry, potem „Zachowaj w Plikach”; na Androidzie wybierz u góry „Zapisz jako PDF”, a na komputerze drukarkę „Zapisz jako PDF”. PDF otworzysz potem bez internetu.',

```

- [ ] **Krok 4: Testy, build, wydruk i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
mkdir -p "$TMPDIR/wietnam-4"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' "$TMPDIR/wietnam-4/d1.pdf"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' "$TMPDIR/wietnam-4/d1-ciemny.pdf" dark
bash "$TMPDIR/sondy-4.sh" MIESIAC
```

Oczekiwane:
- `ALL PASS`;
- build bez błędów;
- grep nic nie wypisuje;
- oba wydruki: `12 pages of 210 x 297 mm` i `covered text lines: 0`;
- `sondy (…): 0 z 16 nie przeszło`. Nowa sonda `pdf.js` sprawdza:
  - przycisk zaraz po „Kopiuj plan na WhatsApp” i podpowiedź;
  - wywołanie okna drukowania;
  - trzy kadry z różnymi `viewBox`;
  - żaden identyfikator nie powtarza się na stronie;
  - legendę i link do trasy;
  - ukrycie części wydruku na ekranie.

- [ ] **Krok 5: Commit**

```bash
git add tests/content.test.js tests/print.sh tests/probes/pdf.js site2/src/template.html site2/src/ui.js site2/src/app.js
git commit -F - <<'EOF'
PDF jako wersja offline dla podróżnych: przycisk „Zapisz trasę jako PDF” obok „Kopiuj plan na WhatsApp”, z podpowiedzią dla iPhone’a, Androida i komputera; wydruk na A4 z marginesami 12 mm, mapa w trzech kadrach na szerokość strony (północ i środek obok siebie, pod nimi południe z legendą), na pierwszej stronie link do tej trasy, jedno mniejsze zdjęcie na miejsce, przełącznik motocykla dzieli się między akapitami, a zdanie „Kliknij dzień…” się nie drukuje; tests/print.sh podaje format papieru i kończy się błędem przy zakrytych liniach, sonda pdf.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Zdjęcia i stopka

Punkty 5, 18 i 23 listy ustaleń oraz uwagi z przeglądów 1B:
- **Licencje wszystkich 87 zdjęć** sprawdza w API Wikimedia Commons nowe narzędzie `tools/licenses.sh` (tylko odczyt, jak `links.sh`). W suchej próbie 14.10.2026 wynik był `87 photos, 0 licence problem(s), 0 author(s) to check`. Autora porównuje słowo po słowie z autorem i atrybucją z Commons, więc „Steffen Schmitz (Carschten)” przechodzi.
- **Dwa podpisy** z imieniem i loginem autora zlanymi w jeden napis dostają login w nawiasie: „frank mckenna (frankiefoto)”, „Chester Ho (chesterho)”. Podpis `hue_2` mówi o tym, co jest na zdjęciu: o pawilonie nad stawem z lotosami przy grobowcu cesarza Tự Đức.
- **Stopka:**
  - podpis zdjęcia prowadzi do jego strony na Commons, a nazwa licencji do jej tekstu po polsku na creativecommons.org (`licenceUrl`; wszystkie siedem adresów odpowiadało 14.10.2026 kodem 200);
  - domena publiczna jest po polsku, także w przeglądarce zdjęć;
  - w „Uwagi” dochodzi zdanie „Kontury mapy: Natural Earth, domena publiczna.”
- **Test danych i build** zatrzymują powtórzony identyfikator zdjęcia (drugi wpis z tym samym identyfikatorem po cichu zastępowałby pierwszy) i autora zastępczego „autor nieznany”.

**Pliki:**
- Utwórz: `tools/licenses.sh` (z prawem wykonania, jak `tools/links.sh`)
- Zmień: `site2/src/page.js` (`licenceUrl`), `site2/src/app.js` (`licName`, stopka, przeglądarka zdjęć), `site2/src/ui.js` (`ft.notes.p`, `ft.pd`), `site2/src/photos.js` (trzy wpisy), `site2/build.py` (`photo_ids`)
- Testy: `tests/page.test.js`, `tests/data.test.js` (`photos`)

**Interfejsy:**
- Daje: `licenceUrl(license)` w page.js: adres tekstu licencji po polsku albo `null` dla domeny publicznej.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/data.test.js` zamień:

```js
  need(PHOTO_META[HERO_PHOTO], 'the hero photo ' + HERO_PHOTO + ' has its credits');
});
```

na:

```js
  need(PHOTO_META[HERO_PHOTO], 'the hero photo ' + HERO_PHOTO + ' has its credits');
  // each id once (a second entry with the same id would silently replace the first) and a real author, never a stand-in
  var entries = readFile('site2/src/photos.js').match(/^  [a-z]+_\d+: \{/gm) || [];
  need(entries.length === Object.keys(PHOTO_META).length, 'photos.js: ' + entries.length + ' entries for ' + Object.keys(PHOTO_META).length + ' ids, so an id is there twice');
  Object.keys(PHOTO_META).forEach(function (ph) { need(!/nieznany|unknown/i.test(PHOTO_META[ph].artist), ph + ': a real author, not „autor nieznany”'); });
});
```

W `tests/page.test.js` zamień:

```js
print('before ok');
```

na:

```js
// the credits: a photo's licence links to its text on creativecommons.org, in Polish; the public domain has no text
eq([licenceUrl('CC BY-SA 4.0'), licenceUrl('CC BY 2.0'), licenceUrl('CC BY-SA 3.0 de'), licenceUrl('CC0'), licenceUrl('Public domain')],
  ['https://creativecommons.org/licenses/by-sa/4.0/deed.pl', 'https://creativecommons.org/licenses/by/2.0/deed.pl', 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.pl',
   'https://creativecommons.org/publicdomain/zero/1.0/deed.pl', null], 'the text of a licence: CC BY and CC BY-SA by version (and country), CC0; none for the public domain');
print('before ok');
```

- [ ] **Krok 2: Uruchom testy i sprawdź, że nie przechodzą.**

```bash
bash tests/run.sh
```

Oczekiwane: przebieg staje na `tests/page.test.js` z błędem:

```text
Exception: ReferenceError: Can't find variable: licenceUrl
```

- [ ] **Krok 3: Kod.**

W `site2/build.py` zamień:

```python
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
```

na:

```python
    assert len(ids) == len(set(ids)), "an id twice in photos.js: %s" % sorted(p for p in set(ids) if ids.count(p) > 1)
    assert "nieznany" not in text, "photos.js: a photo without its real author"
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
```

W `site2/src/app.js` zamień:

```js
  function nodeOf(id) { return PLACES[id].node || id; }
```

na:

```js
  function licName(l) { return l === 'Public domain' ? T('ft.pd') : l; }   // a licence as the page names it
  function nodeOf(id) { return PLACES[id].node || id; }
```

W `site2/src/app.js` zamień:

```js
    $('#lb-credit').textContent = T('lb.photo') + PHOTO_META[lb.ids[lb.i]].artist + ' · ' + PHOTO_META[lb.ids[lb.i]].license;
```

na:

```js
    $('#lb-credit').textContent = T('lb.photo') + PHOTO_META[lb.ids[lb.i]].artist + ' · ' + licName(PHOTO_META[lb.ids[lb.i]].license);
```

W `site2/src/app.js` zamień:

```js
      var m = PHOTO_META[ph];
      return '<li>' + esc(m.cap) + ': ' + esc(m.artist) + ', <a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.license) + '</a></li>';
```

na:

```js
      // the caption leads to the photo's page on Commons, the licence to its text
      var m = PHOTO_META[ph], lic = licenceUrl(m.license);
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(m.cap) + '</a>: ' + esc(m.artist) + ', ' +
        (lic ? '<a href="' + esc(lic) + '" target="_blank" rel="noopener">' + esc(licName(m.license)) + '</a>' : esc(licName(m.license))) + '</li>';
```

W `site2/src/page.js` zamień:

```js
/* An amount in euros, [from, to], in złoty: each end at rate and rounded to step złoty (100 for the budget, 10 for one
```

na:

```js
/* The text of a photo's licence on creativecommons.org, in Polish: 'CC BY-SA 4.0' → …/licenses/by-sa/4.0/deed.pl, a
   licence of a country ('CC BY-SA 3.0 de') with its country, CC0 → the CC0 deed; null for the public domain, which has no
   licence text (the photo's page on Commons says why). */
function licenceUrl(license) {
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/deed.pl';
  var m = /^CC (BY(?:-SA)?) (\d\.\d)(?: ([a-z]{2}))?$/.exec(license);
  return m ? 'https://creativecommons.org/licenses/' + m[1].toLowerCase() + '/' + m[2] + '/' + (m[3] ? m[3] + '/' : '') + 'deed.pl' : null;
}

/* An amount in euros, [from, to], in złoty: each end at rate and rounded to step złoty (100 for the budget, 10 for one
```

W `site2/src/photos.js` zamień:

```js
  saigon_3: { cap: 'Kadzidła w świątyni Thiên Hậu, Chợ Lớn', artist: 'frank mckenna frankiefoto', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Incensories_at_Thien_Hau_Temple,_Ho_Chi_Minh_City,_2016.jpg' },
```

na:

```js
  saigon_3: { cap: 'Kadzidła w świątyni Thiên Hậu, Chợ Lớn', artist: 'frank mckenna (frankiefoto)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Incensories_at_Thien_Hau_Temple,_Ho_Chi_Minh_City,_2016.jpg' },
```

W `site2/src/photos.js` zamień:

```js
  hoian_1: { cap: 'Łódka-kosz wśród wodnych palm kokosowych', artist: 'Chester Ho chesterho', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Basket_Boat_and_the_Bamboo_forest_(Unsplash).jpg' },
```

na:

```js
  hoian_1: { cap: 'Łódka-kosz wśród wodnych palm kokosowych', artist: 'Chester Ho (chesterho)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Basket_Boat_and_the_Bamboo_forest_(Unsplash).jpg' },
```

W `site2/src/photos.js` zamień:

```js
  hue_2: { cap: 'Grobowiec cesarza Tự Đức w Huế', artist: 'thalling55', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Tomb_of_Tu_Duc_(1346187541).jpg' },
```

na:

```js
  hue_2: { cap: 'Pawilon nad stawem z lotosami przy grobowcu cesarza Tự Đức w Huế', artist: 'thalling55', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Tomb_of_Tu_Duc_(1346187541).jpg' },
```

W `site2/src/ui.js` zamień:

```js
  'ft.notes.p': 'Czasy przejazdów to szacunki od drzwi do drzwi, z ok. 1½ godz. na lotnisku przy każdym locie. Połączenia sprawdzono w październiku 2026. Rozkłady lotów, godziny otwarcia, zasady na szlakach i stan morza sprawdź przed wyjazdem u przewoźnika i na miejscu. Trudne dni tylko z licencjonowanym przewodnikiem albo operatorem.',
```

na:

```js
  'ft.notes.p': 'Czasy przejazdów to szacunki od drzwi do drzwi, z ok. 1½ godz. na lotnisku przy każdym locie. Połączenia sprawdzono w październiku 2026. Rozkłady lotów, godziny otwarcia, zasady na szlakach i stan morza sprawdź przed wyjazdem u przewoźnika i na miejscu. Trudne dni tylko z licencjonowanym przewodnikiem albo operatorem. Kontury mapy: Natural Earth, domena publiczna.',
  'ft.pd': 'domena publiczna',
```

Utwórz `tools/licenses.sh`:

```bash
#!/bin/bash
# Checks the photos of the page (PHOTO_META in site2/src/photos.js) against Wikimedia Commons: asks the Commons API for each
# file's licence and author (extmetadata, 50 files a query) and prints the photos whose licence differs from photos.js, is
# no longer CC0, CC BY, CC BY-SA or public domain (notes/wizja.md), or whose author in photos.js has a word that neither the
# author nor the attribution on Commons has (a hint to read the file's page). Nothing is saved.
#   bash tools/licenses.sh         one line per photo with a difference, then a summary
# Exit 1 when a licence differs or a file is missing on Commons; a differing author alone only prints a line to check.
set -uo pipefail
cd "$(dirname "$0")/.."
python3 -I - <<'PY'
import html, json, re, sys, urllib.parse, urllib.request
src = open('site2/src/photos.js', encoding='utf-8').read()
meta = {}
for m in re.finditer(r"^  ([a-z]+_\d+): \{ cap: '((?:[^'\\]|\\.)*)', artist: '((?:[^'\\]|\\.)*)', license: '([^']*)', page: '([^']*)' \}", src, re.M):
    meta[m.group(1)] = {'artist': m.group(3).replace("\\'", "'"), 'license': m.group(4), 'title': urllib.parse.unquote(m.group(5).split('/wiki/', 1)[1]).replace('_', ' ')}
n_src = len(re.findall(r"^  [a-z]+_\d+: \{", src, re.M))
if len(meta) != n_src:
    print('licenses.sh: read %d of %d entries of photos.js' % (len(meta), n_src)); sys.exit(1)
def plain(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s or ''))).strip()
def norm(s): return re.sub(r'\s+', ' ', s.replace('Public Domain', 'Public domain')).strip()
def words(s): return set(re.sub(r'[()\[\],.©/]', ' ', s.lower()).split())
found, ids = {}, sorted(meta)
for i in range(0, len(ids), 50):
    titles = '|'.join(meta[p]['title'] for p in ids[i:i + 50])
    q = urllib.parse.urlencode({'action': 'query', 'titles': titles, 'prop': 'imageinfo', 'iiprop': 'extmetadata',
                                'iiextmetadatafilter': 'Artist|Attribution|LicenseShortName', 'format': 'json', 'formatversion': '2'})
    req = urllib.request.Request('https://commons.wikimedia.org/w/api.php?' + q, headers={'User-Agent': 'wietnam-po-swojemu licence check (read only)'})
    data = json.load(urllib.request.urlopen(req, timeout=60))
    norm_map = {x['to']: x['from'] for x in data['query'].get('normalized', [])}
    for pg in data['query']['pages']:
        t = norm_map.get(pg['title'], pg['title'])
        found[t] = None if pg.get('missing') else pg['imageinfo'][0]['extmetadata']
bad = check = 0
for p in ids:
    m = meta[p]; e = found.get(m['title'])
    if e is None:
        print('MISSING %s: no file %s on Commons' % (p, m['title'])); bad += 1; continue
    lic = norm(plain(e.get('LicenseShortName', {}).get('value')))
    art = plain(e.get('Artist', {}).get('value')) + ' / ' + plain(e.get('Attribution', {}).get('value'))
    if norm(m['license']) != lic or re.search(r'\b(NC|ND)\b', lic):
        print('LICENCE %s: %s in photos.js, %s on Commons' % (p, m['license'], lic)); bad += 1
    if not words(m['artist']) <= words(art):
        print('AUTHOR  %s: %s in photos.js, %s on Commons' % (p, m['artist'], art)); check += 1
print('licenses.sh: %d photos, %d licence problem(s), %d author(s) to check' % (len(ids), bad, check))
sys.exit(1 if bad else 0)
PY
```

Nadaj narzędziu prawo wykonania, jak `tools/links.sh`:

```bash
chmod +x tools/licenses.sh
```

- [ ] **Krok 4: Testy, build, licencje i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
bash tools/licenses.sh
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
bash "$TMPDIR/sondy-4.sh" MIESIAC
```

Oczekiwane:
- `ALL PASS`;
- build bez błędów;
- `licenses.sh: 87 photos, 0 licence problem(s), 0 author(s) to check`. Inny wynik zgłoś użytkownikowi: zdjęcie z inną licencją albo bez pliku na Commons nie może zostać na stronie bez decyzji;
- grep nic nie wypisuje;
- `sondy (…): 0 z 16 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add tests/page.test.js tests/data.test.js tools/licenses.sh site2/src/page.js site2/src/app.js site2/src/ui.js site2/src/photos.js site2/build.py
git commit -F - <<'EOF'
Zdjęcia i stopka przed publikacją: licencje wszystkich 87 zdjęć zgodne z Wikimedia Commons (nowe narzędzie tools/licenses.sh, tylko odczyt API), w stopce podpis prowadzi do strony zdjęcia, a nazwa licencji do jej tekstu po polsku, domena publiczna po polsku także w przeglądarce zdjęć; autorzy „frank mckenna (frankiefoto)” i „Chester Ho (chesterho)” z loginem w nawiasie, podpis hue_2 mówi o pawilonie nad stawem z lotosami; kontury mapy z Natural Earth w „Uwagi”; test danych i build zatrzymują powtórzony identyfikator zdjęcia i autora zastępczego

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Fakty z 14.10.2026 w researchu i na stronie

Decyzja 4 i punkty 19–21 listy ustaleń. 14.10.2026 trzej agenci w tle sprawdzili fakty, które dotyczą bezpieczeństwa, zamknięć i prawa, a stronę MSZ odczytano w przeglądarce. Wyniki trafiają najpierw do researchu, do plików, z których pochodzą, ze źródłami (etykiety `XX-2026-10-14…`). Na stronie zmienia się tylko to, co zmieniło się w faktach.
- **Research:**
  - `wjazd`: deklaracja zdrowotna, karta przylotu, ostrzeżenia przed fałszywymi stronami, MSZ (poziom 1 i rada o motocyklu, której strona świadomie nie cytuje, decyzja 5), zdania dla strony;
  - `danang`: Sơn Trà dalej zamknięte, Hải Vân Quan;
  - `phongnha`: ulewy 9–10.10.2026;
  - `rezerwacje`: most do Cát Tiên jeszcze w budowie;
  - `ceny` i `plany-dni`: dwa bilety na stare miasto Hội An, ważne do 3 dni, a kwota w budżecie zostaje; Đại Nội, Lang Biang, Cát Tiên, Cát Bà;
  - `hagiang`: festiwal gryki 25.10.2026, targ w Khâu Vai, skała na Mã Pí Lèng, autostrada, pozwolenie;
  - `sapa`: godziny kolejki, bilety w Cát Cát i w dolinie;
  - `cucphuong`: wstrzymanie noclegów w lesie;
  - `motocykl`: rada MSZ.
- **Strona:**
  - w `content/hagiang.js` festiwal w Đồng Văn w 2026 r. 25.10, a nie 6.11;
  - w „Wjazd i zdrowie” trzy zdania dla każdej trasy:
    - „E-wiza: jeśli jej potrzebujesz, złóż wniosek tylko na rządowej stronie evisa.gov.vn. W sieci są fałszywe strony, które się pod nią podszywają.”;
    - „Karta przylotu: Wietnam wprowadza ją na kolejnych lotniskach, a na Tân Sơn Nhất (Hồ Chí Minh City) od kwietnia 2026. Wypełnia się ją w ciągu 3 dni przed lotem, bezpłatnie i tylko na stronie urzędu imigracyjnego prearrival.immigration.gov.vn.”;
    - „E-papierosy: razem z podgrzewanym tytoniem są w Wietnamie nielegalne, a za ich przywóz i używanie grożą kary i konfiskata, więc zostaw je w domu.”

    Zdanie o karcie przylotu jest ogólne, bo lotniska wprowadzają ją po kolei. Phú Quốc, który też ją ma, nie jest na stronie lotniskiem przylotu z zagranicy.

**Pliki:**
- Zmień: `research/wjazd-2026-10.md`, `danang`, `phongnha`, `rezerwacje`, `ceny`, `plany-dni`, `hagiang`, `sapa`, `cucphuong`, `motocykl` (wszystkie `research/<nazwa>-2026-10.md`); `site2/src/page.js` (`entryNotes`), `site2/src/ui.js` (`e.evisa`, `e.arrival`, `e.vape`), `site2/src/content/hagiang.js`
- Testy: `tests/page.test.js` (zdania wjazdu każdej trasy), `tests/content.test.js` (rodzina kluczy `e.`)

**Interfejsy:**
- Daje: `entryNotes` zwraca też kody `evisa` (po `visa` i `visa_end`), `arrival` i `vape` (po `passport`), w tej kolejności: `visa`, [`visa_end`], `evisa`, `passport`, `arrival`, `vape`, `insurance`, [`insurance_moto`], `doctor`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
    'e.': ['visa', 'visa_end', 'passport', 'insurance', 'insurance_moto', 'doctor'],
```

na:

```js
    'e.': ['visa', 'visa_end', 'evisa', 'passport', 'arrival', 'vape', 'insurance', 'insurance_moto', 'doctor'],
```

W `tests/page.test.js` zamień:

```js
  [['visa', 'passport', 'insurance', 'doctor'], ['visa', 'visa_end', 'passport', 'insurance', 'doctor'], { days: 45, until: '14.08.2028' }],
  'entry: a trip that ends after the exemption is told to check the rules; the visa line names the days and the last day');
```

na:

```js
  [['visa', 'evisa', 'passport', 'arrival', 'vape', 'insurance', 'doctor'], ['visa', 'visa_end', 'evisa', 'passport', 'arrival', 'vape', 'insurance', 'doctor'], { days: 45, until: '14.08.2028' }],
  'entry: a trip that ends after the exemption is told to check the rules; the visa line names the days and the last day; every trip gets the official e-visa site, the arrival card and the ban on e-cigarettes');
```

- [ ] **Krok 2: Uruchom testy i sprawdź, że nie przechodzą.**

```bash
bash tests/run.sh
```

Oczekiwane: przebieg staje na `tests/page.test.js` z błędem, który zaczyna się tak:

```text
Exception: Error: entry: a trip that ends after the exemption is told to check the rules; the visa line names the days and the last day; every trip gets the official e-visa site, the arrival card and the ban on e-cigarettes: got [["visa","passport","insurance","doctor"]
```

- [ ] **Krok 3: Research, potem strona.**

W `research/ceny-2026-10.md` zamień:

```markdown
| bilet do Starego Miasta Hội An dla cudzoziemców | 120 000 VND | DZ-HA, DZ-HAVT |
```

na:

```markdown
| bilet na stare miasto Hội An od 2026: wspólna przestrzeń, Most Japoński albo świątynia Quan Công i dwa obiekty; to samo z muzeami i trzema obiektami do wyboru; jednakowo dla Wietnamczyków i cudzoziemców, ważny przez pobyt, najwyżej 3 dni (sprawdzenie 14.10.2026; dawny bilet dla cudzoziemców za 120 000 VND z DZ-HA, 2023, jest nieaktualny) | 80 000; 120 000 VND | HA-2026-10-14a (wcześniej DZ-HA, DZ-HAVT) |
```

W `research/ceny-2026-10.md` zamień:

```markdown
  - Hội An: danie w restauracji turystycznej 80 000–150 000 VND i bilet do Starego Miasta 120 000 VND (DZ-HAVT, DZ-HA);
```

na:

```markdown
  - Hội An: danie w restauracji turystycznej 80 000–150 000 VND (DZ-HAVT) i bilet na stare miasto 80 000 albo 120 000 VND, kupowany raz na pobyt, najwyżej 3 dni (HA-2026-10-14a); w kwocie dziennej zostaje 120 000 VND (decyzja z 14.10.2026);
```

W `research/ceny-2026-10.md` zamień:

```markdown
## Wycieczki i przewodnicy
```

na:

```markdown
### Sprawdzenie przed publikacją (14.10.2026): bilet na stare miasto Hội An

Adresy otwarto 14.10.2026 (WebSearch i WebFetch, bez zapisywania stron); wszystkie się otworzyły.

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| HA-2026-10-14a | Danang Fantastic City (portal turystyczny miasta Đà Nẵng, do którego należy dziś Hội An), po wietnamsku i angielsku: dwa bilety na stare miasto, 80 000 VND (wspólna przestrzeń, Most Japoński albo świątynia Quan Công i dwa obiekty) i 120 000 VND (to samo, muzea i trzy obiekty do wyboru); kupowany raz, ważny przez pobyt, najwyżej 3 dni; zachować odcinek; grupy od 8 biletów z przewodnikiem; bez podziału na cudzoziemców i Wietnamczyków; strefa bez pojazdów 9:00–21:30 latem i 9:00–21:00 zimą. | https://danangfantasticity.com/kham-pha/cap-nhat-ve-tham-quan-khu-pho-co-hoi-an-2026 ; https://danangfantasticity.com/en/discovery/hoi-an-ancient-town-entrance-tickets-2026 | urzędowe (portal turystyczny miasta) | 6.03.2026 |
| HA-2026-10-14b | Portal miasta Đà Nẵng: uchwała 02/2026/NQ-HĐND z 11.02.2026, w mocy od 21.02.2026: stare miasto Hội An 20 000–30 000 VND od osoby za obiekt, jednakowo dla Wietnamczyków i cudzoziemców; zwolnieni m.in. dzieci poniżej 16 lat i uczniowie, Wietnamczycy od 60 lat, goście dyplomatyczni. | https://danang.gov.vn/vi/w/quy-dinh-muc-thu-10000-40000-dong-luot-tham-quan-tai-hoi-an-my-son-va-cac-thap-co | urzędowe (portal miasta) | 13.02.2026 |
| HA-2026-10-14c | Báo Đà Nẵng (dziennik władz miasta): to samo; o bilecie łączonym i ważności nic. | https://baodanang.vn/phi-tham-quan-10-000-40-000-dong-luot-tai-hoi-an-my-son-va-cac-thap-co-3324679.html | prasa | 16.02.2026 |
| HA-2026-10-14d | Nhân Dân: uchwała 98/2026/NQ-HĐND (VII 2026, dzień w źródle z literówką) zmienia 02/2026, w mocy od 10.08.2026: stare miasto Hội An 20 000 VND od osoby za obiekt, jednakowo dla Wietnamczyków i cudzoziemców; Cù Lao Chàm 70 000 VND, Mỹ Sơn 40 000 VND. | https://nhandan.vn/da-nang-dieu-chinh-phi-tham-quan-cac-cong-trinh-van-hoa-va-di-san-post980432.html | prasa | 7.08.2026 |
| HA-2026-10-14e | Thanh Niên: HĐND przyjęła 11.02 opłatę 20 000–30 000 VND za obiekt; zapowiedź innego artykułu mówi, że Hội An sprzedaje jeszcze bilety według starych zasad. | https://thanhnien.vn/muc-gia-moi-cua-ve-tham-quan-cac-di-tich-bao-tang-o-da-nang-185260211172403155.htm | prasa | 11.02.2026 |

## Wycieczki i przewodnicy
```

W `research/ceny-2026-10.md` zamień:

```markdown
Lekcja gotowania w Trà Quế kosztuje od ok. 725 000 VND do 53 USD za osobę. Łódź na rzece przy starym mieście ma cenę ustaloną przez miasto: 150 000 VND za 15 minut dla 1–3 osób. Bilet na stare miasto (120 000 VND, 4 EUR) jest w kwocie dziennej.
```

na:

```markdown
Lekcja gotowania w Trà Quế kosztuje od ok. 725 000 VND do 53 USD za osobę. Łódź na rzece przy starym mieście ma cenę ustaloną przez miasto: 150 000 VND za 15 minut dla 1–3 osób. Bilet na stare miasto (120 000 VND, 4 EUR) jest w kwocie dziennej. Od 2026 są dwa bilety, 80 000 i 120 000 VND, jednakowe dla Wietnamczyków i cudzoziemców, ważne przez pobyt, najwyżej 3 dni; opłata za obiekt według uchwał HĐND Đà Nẵng to od 10.8.2026 20 000 VND od osoby, a wcześniej, od 21.2.2026, 20 000–30 000 VND (HA-2026-10-14a, HA-2026-10-14b, HA-2026-10-14d w sekcji „Źródła”). Czy po 10.8.2026 kasy zmieniły bilety, nie ustaliłem. W kwocie dziennej zostaje 120 000 VND (sprawdzenie i decyzja z 14.10.2026).
```

W `research/ceny-2026-10.md` zamień:

```markdown
| (bez klucza) | bilet na stare miasto, 5 wejść | 120 000 VND/os. | na osobę | 4 | W-HA-VT; w kwocie dziennej |
```

na:

```markdown
| (bez klucza) | bilet na stare miasto od 2026: wspólna przestrzeń, Most Japoński albo świątynia Quan Công i dwa obiekty; to samo z muzeami i trzema obiektami do wyboru; ważny przez pobyt, najwyżej 3 dni (opis „5 wejść” z W-HA-VT jest nieaktualny) | 80 000; 120 000 VND/os. | na osobę | 3; 4 | HA-2026-10-14a; w kwocie dziennej 120 000 VND |
```

W `research/cucphuong-2026-10.md` zamień:

```markdown
- **Godziny:** zajęcia dzienne kończą się przed 19:00, a zabawy grupowe przed 23:00 (CP-NOIQUY). Od 1.09.2026 między 19:00 a 7:00 nocujący nie wchodzą w głąb lasu, poza nocną wycieczką z przewodnikiem, a każdy wyjeżdżający pojazd i bagaż są kontrolowane (CP-POJAZDY, decyzja 195/QĐ-VCP-TCHC z 18.08.2026).
```

na:

```markdown
- **Godziny:** zajęcia dzienne kończą się przed 19:00, a zabawy grupowe przed 23:00 (CP-NOIQUY). Od 1.09.2026 między 19:00 a 7:00 nocujący nie wchodzą w głąb lasu, poza nocną wycieczką z przewodnikiem, a każdy wyjeżdżający pojazd i bagaż są kontrolowane (CP-POJAZDY, decyzja 195/QĐ-VCP-TCHC z 18.08.2026). Stan 14.10.2026: zasada obowiązuje, a komunikat z 20.08.2026 nie ma daty końca ani odwołania (CP-2026-10-14c); regulamin z 24.09.2026 dopuszcza zajęcia po 19:00 tylko z pozwoleniem (CP-2026-10-14d).
```

W `research/cucphuong-2026-10.md` zamień:

```markdown
- **Noclegi w lesie:** wstrzymane 23.08.2026 przed sztormem nr 4 (VOV-2026-08-23) i od 16.09.2026 do odwołania z powodu ulew i powodzi (TT-2026-09-16). Źródła nie mówią, czy chodzi tylko o biwaki, czy też o pokoje w Bống albo przy bramie; inne zajęcia działały „według warunków” i wskazań zarządcy (BVH-2026-09-16). Przed rezerwacją noclegu zapytaj park, co jest otwarte.
- **Bống:** prąd tylko ok. 4 h wieczorem (CP-POKOJE), w głębi lasu zanika zasięg telefonu (ND-2024b).
- **Ryzyka:** pijawki i komary w porze deszczowej, śliskie wapienne zbocza (CP-BIWAK, OX), jaskinie bez oświetlenia (CP-SZLAKI, CP-DROGA), zwierzęta przechodzące przez wąską krętą drogę do Bống (JB).
- **Zarządca:** park podlega dziś ministerstwu rolnictwa i środowiska. Prowincja Ninh Bình chce go przejąć, a ministerstwo w raporcie z 30.06.2026 radziło zostawić go pod zarządem centralnym (THANHTRA†). Strona i cennik mogą się więc zmienić, jak w Cát Tiên (SEZ).
```

na:

```markdown
- **Noclegi w lesie:** wstrzymane 23.08.2026 przed sztormem nr 4 (VOV-2026-08-23) i od 16.09.2026 do odwołania z powodu ulew i powodzi (TT-2026-09-16). Źródła nie mówią, czy chodzi tylko o biwaki, czy też o pokoje w Bống albo przy bramie; inne zajęcia działały „według warunków” i wskazań zarządcy (BVH-2026-09-16). Przed rezerwacją noclegu zapytaj park, co jest otwarte. Stan 14.10.2026: wstrzymania z 16.09.2026, o ile można to ustalić, nie odwołano. Na stronie parku nie ma komunikatu o wznowieniu (najnowsze wpisy z 24.09.2026), prasa po 17.09.2026 o wznowieniu nie pisze, a wydział turystyki zapowiadał przegląd tras przed wznowieniem, gdy opadnie woda (CP-2026-10-14a, CP-2026-10-14e, CP-2026-10-14f). Czy chodzi też o pokoje w Bống, dalej nie wiadomo: źródła mówią tylko o nocowaniu w lesie, a regulamin z 24.09.2026 o tym milczy (CP-2026-10-14d). Do ustalenia w parku, tel. 1800 5555 88.
- **Bống:** prąd tylko ok. 4 h wieczorem (CP-POKOJE), w głębi lasu zanika zasięg telefonu (ND-2024b).
- **Ryzyka:** pijawki i komary w porze deszczowej, śliskie wapienne zbocza (CP-BIWAK, OX), jaskinie bez oświetlenia (CP-SZLAKI, CP-DROGA), zwierzęta przechodzące przez wąską krętą drogę do Bống (JB).
- **Zarządca:** park podlega dziś ministerstwu rolnictwa i środowiska. Prowincja Ninh Bình chce go przejąć, a ministerstwo w raporcie z 30.06.2026 radziło zostawić go pod zarządem centralnym (THANHTRA†). Stan 14.10.2026: bez zmian. Ninh Bình wysłała 24.06.2026 wniosek do rządu i premiera o przekazanie parku (CP-2026-10-14g); ministerstwo w raporcie 7019 radzi zostawić cztery parki międzyprowincjonalne, w tym Cúc Phương, pod sobą, a Thanh Hóa i Phú Thọ chcą obecnego modelu (CP-2026-10-14h, otwarte źródło zamiast THANHTRA†). Decyzji rządu nie znalazłem. Strona i cennik mogą się więc zmienić, jak w Cát Tiên (SEZ).
```

W `research/cucphuong-2026-10.md` zamień:

```markdown
- Czy park odwołał wstrzymanie noclegów w lesie z 16.09.2026 i czy dotyczyło ono też pokoi w Bống (TT-2026-09-16).
- Godziny EPRC i programu żółwi w 2026 (dziś tylko WV ze stanem 1.2024) i czy combo zawiera wstęp do parku (SOV mówi, że tak; CP-COMBO milczy).
- Cena przewodnika na Mây Bạc, minimalna grupa i czy park prowadzi tam cudzoziemców po angielsku (CP-COMBO, BVH-2025b).
- Czy przy nocnej przejażdżce para płaci minimum 600 000 VND, czy park łączy małe grupy (CP-NOC).
- Szczegóły decyzji 195/QĐ-VCP-TCHC (skany w CP-POJAZDY nie dały się odczytać): czy auta gości trzeba zgłaszać, co się dzieje po wyczerpaniu limitu 300 pojazdów i czy elektryczne busy parku wożą pojedyncze osoby do Bống i za ile.
- Godziny otwarcia bramy: 6:00–19:00 według JB i VNA†, start programów o 8:00 według BVH-2025b; oficjalnej godziny nie znalazłem.
- Zarząd parku: czy Ninh Bình przejęła park (THANHTRA†); wtedy adresy stron i cennik mogą się zmienić.
- Program biwaku 2 dni/1 noc (CP-BIWAK): cena, terminy i czy wróci po wstrzymaniu.
```

na:

```markdown
- Czy park odwołał wstrzymanie noclegów w lesie z 16.09.2026 i czy dotyczyło ono też pokoi w Bống (TT-2026-09-16). Sprawdzone 14.10.2026: nie odwołał, o ile można to ustalić; czy wstrzymanie obejmuje pokoje w Bống, dalej nie wiadomo, to pytanie do parku (sekcja „Bezpieczeństwo i przepisy”, CP-2026-10-14a, CP-2026-10-14e, CP-2026-10-14f).
- Godziny EPRC i programu żółwi w 2026 (dziś tylko WV ze stanem 1.2024) i czy combo zawiera wstęp do parku (SOV mówi, że tak; CP-COMBO milczy).
- Cena przewodnika na Mây Bạc, minimalna grupa i czy park prowadzi tam cudzoziemców po angielsku (CP-COMBO, BVH-2025b).
- Czy przy nocnej przejażdżce para płaci minimum 600 000 VND, czy park łączy małe grupy (CP-NOC). Sprawdzone 14.10.2026: przejażdżka jest w sprzedaży, codziennie 19:00–22:00, 150 000 VND dla nocujących i 210 000 VND dla pozostałych, z minimum 600 000 VND za turę poniżej 4 osób i bez komunikatu o przerwie (CP-2026-10-14b); czy park łączy małe grupy, strona dalej nie mówi.
- Szczegóły decyzji 195/QĐ-VCP-TCHC (skany w CP-POJAZDY nie dały się odczytać): czy auta gości trzeba zgłaszać, co się dzieje po wyczerpaniu limitu 300 pojazdów i czy elektryczne busy parku wożą pojedyncze osoby do Bống i za ile.
- Godziny otwarcia bramy: 6:00–19:00 według JB i VNA†, start programów o 8:00 według BVH-2025b; oficjalnej godziny nie znalazłem.
- Zarząd parku: czy Ninh Bình przejęła park (THANHTRA†); wtedy adresy stron i cennik mogą się zmienić. Sprawdzone 14.10.2026: nie, park dalej podlega ministerstwu, a decyzji rządu w sprawie wniosku Ninh Bình nie znalazłem (CP-2026-10-14g, CP-2026-10-14h).
- Program biwaku 2 dni/1 noc (CP-BIWAK): cena, terminy i czy wróci po wstrzymaniu. Sprawdzone 14.10.2026 tylko częściowo: wstrzymania nocowania w lesie nie odwołano (CP-2026-10-14a), a ceny i terminów biwaku nie sprawdzano.
```

W `research/cucphuong-2026-10.md` zamień:

```markdown
| SEZ, TD, CEN, REZ, POL, LOT | pliki projektu: sezony (K5, N2, N3, zasady oceny), trudne dni (ramy prawne 2026), ceny (kurs NBP, W-LV), rezerwacje, połączenia, lotniska (THD-SPL) | `research/sezony-2026-10.md` ; `research/trudne-dni-2026-10.md` ; `research/ceny-2026-10.md` ; `research/rezerwacje-2026-10.md` ; `research/polaczenia-2026-10.md` ; `research/lotniska-2026-10.md` | własne obliczenie | 9–12.10.2026 |
```

na:

```markdown
| SEZ, TD, CEN, REZ, POL, LOT | pliki projektu: sezony (K5, N2, N3, zasady oceny), trudne dni (ramy prawne 2026), ceny (kurs NBP, W-LV), rezerwacje, połączenia, lotniska (THD-SPL) | `research/sezony-2026-10.md` ; `research/trudne-dni-2026-10.md` ; `research/ceny-2026-10.md` ; `research/rezerwacje-2026-10.md` ; `research/polaczenia-2026-10.md` ; `research/lotniska-2026-10.md` | własne obliczenie | 9–12.10.2026 |

### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów „Do sprawdzenia przed publikacją (etap 4)”: WebSearch i WebFetch 14.10.2026, bez zapisywania stron; wszystkie adresy się otworzyły. Część to te same strony co w tabeli wyżej, w odczycie z 14.10.2026.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| CP-2026-10-14a | Strona ośrodka usług parku (ta sama co CP-WWW): najnowsze wpisy z 24.09.2026 (Trung thu, regulamin) i z 20.08.2026 (zasady ruchu); komunikatu o wznowieniu nocowania w lesie ani o Bống brak; dwie nocne przejażdżki na liście programów | https://dulichcucphuong.com.vn/ | park/zarządca | odczyt 14.10.2026 |
| CP-2026-10-14b | Nocna przejażdżka melexem (pierwszy adres CP-NOC): codziennie 19:00–22:00, ok. 1 h; 150 000 VND dla nocujących, 210 000 VND dla pozostałych; minimum 600 000 VND za turę poniżej 4 osób; przycisk rezerwacji, bez komunikatu o przerwie | https://dulichcucphuong.com.vn/tour-xe-dien-xem-dom-dom-va-quan-sat-dong-vat-hoang-da-ban-dem-huou-nai-culi/ | park/zarządca | 9.05.2024, aktualizacja 13.09.2026 |
| CP-2026-10-14c | Zasady ruchu w strefie rdzenia od 1.09.2026 (ta sama strona co CP-POJAZDY; decyzja 195/QĐ-VCP-TCHC z 18.08.2026): nocujący nie wchodzą sami w głąb lasu w godz. 19:00–7:00, poza nocną wycieczką z przewodnikiem; bez daty końca | https://dulichcucphuong.com.vn/thong-bao-quy-dinh-moi-ve-quan-ly-phuong-tien-giao-thong-vao-vung-loi-vuon-quoc-gia-cuc-phuong-ap-dung-tu-01-09-2026/ | park/zarządca | 20.08.2026 |
| CP-2026-10-14d | Regulamin zwiedzania (ta sama strona co CP-NOIQUY): zajęcia dzienne do 19:00 poza tymi z pozwoleniem, zabawy grupowe do 23:00, wszystkie zajęcia za zgodą zarządcy; o nocowaniu w lesie i jego wstrzymaniu nic | https://dulichcucphuong.com.vn/noi-quy-tham-quan-vuon-quoc-gia-cuc-phuong/ | park/zarządca | 24.09.2026 |
| CP-2026-10-14e | Tuổi Trẻ (ten sam artykuł co TT-2026-09-16): wydział turystyki Ninh Bình wstrzymuje nocowanie w lesie w Cúc Phương od 16.09 do odwołania; o Bống i pokojach nic | https://tuoitre.vn/nhieu-diem-du-lich-o-ninh-binh-tam-dung-don-khach-do-mua-lon-100260916122654333.htm | prasa | 16.09.2026 |
| CP-2026-10-14f | Công an Nhân dân: to samo wstrzymanie; trasy zostaną sprawdzone przed wznowieniem, gdy opadnie woda i będzie bezpiecznie; o Bống i pokojach nic | https://cand.vn/ninh-binh-tam-dung-dieu-chinh-hoat-dong-nhieu-khu-diem-du-lich-do-mua-lu-post822331.html | prasa | 17.09.2026 |
| CP-2026-10-14g | Tiền Phong: przewodniczący komitetu ludowego Ninh Bình podpisał 24.06 wniosek do rządu i premiera o przekazanie parku prowincji; zmiana nie ruszałaby granic administracyjnych; decyzji brak | https://tienphong.vn/ninh-binh-muon-quan-ly-vuon-quoc-gia-cuc-phuong-post1854055.tpo | prasa | 24.06.2026 |
| CP-2026-10-14h | VietNamNet: ministerstwo w raporcie 7019 radzi rządowi zostawić mu cztery parki międzyprowincjonalne, w tym Cúc Phương; Ninh Bình chce przejąć park, Thanh Hóa i Phú Thọ chcą obecnego modelu; decyzji rządu brak | https://vietnamnet.vn/bo-nnmt-muon-tiep-tuc-quan-ly-4-vuon-quoc-gia-cuc-phuong-tam-dao-bach-ma-yok-don-2531782.html | prasa | 2.07.2026 |
```

W `research/danang-2026-10.md` zamień:

```markdown
    | 8.10.2026 | do odwołania (stan 9.10.2026) | prognoza ulew 8–9.10, ryzyko osuwisk i powodzi błyskawicznych | CF-2026-10-09 |
```

na:

```markdown
    | 8.10.2026 | do odwołania (stan 14.10.2026, bez komunikatu o otwarciu) | prognoza ulew 8–9.10, ryzyko osuwisk i powodzi błyskawicznych | CF-2026-10-09, DN-2026-10-14a, DN-2026-10-14b, DN-2026-10-14c |
```

W `research/danang-2026-10.md` zamień:

```markdown
- **Bilet:** Hải Vân Quan na szczycie przełęczy kosztuje od 2.6.2026 70 000 VND od osoby, tyle samo dla Wietnamczyków i cudzoziemców (uchwała HĐND Huế z 22.5.2026; zarządza Centrum Ochrony Zabytków Huế w latach 2026–2028) (HVQ-2026; HVQ-0602†). To 2 EUR, czyli kwota dzienna.
```

na:

```markdown
- **Bilet:** Hải Vân Quan na szczycie przełęczy kosztuje od 2.6.2026 70 000 VND od osoby, tyle samo dla Wietnamczyków i cudzoziemców (uchwała HĐND Huế 05/2026/NQ-HĐND z 22.5.2026; zarządza Centrum Ochrony Zabytków Huế w latach 2026–2028) (HVQ-2026; DN-2026-10-14e, DN-2026-10-14g). Opłatę pobiera się do 31.12.2028, a zabytek jest czynny codziennie 7:00–17:30 (DN-2026-10-14e). Bezpłatnie wchodzą dzieci: poniżej 1,2 m według VnExpress, poniżej 13 lat według Báo Văn hóa (DN-2026-10-14e, DN-2026-10-14f). To 2 EUR, czyli kwota dzienna.
```

W `research/danang-2026-10.md` zamień:

```markdown
- **Sơn Trà:** czy drogi otwarto po wstrzymaniu z 8.10.2026 (CF-2026-10-09), czy trasa Tiên Sa – Suối Ôm – Bàn Cờ wróciła i czy zarząd nie zmienił godzin, zasad pojazdów i zielonej karty (VNP-2026-08-17). Najlepiej szukać komunikatów zarządu w prasie z Đà Nẵng.
- **GreenViet i przewodnicy:** czy po 10.9.2026 zarząd zatwierdził jakiekolwiek wyjścia z obserwacją duków (TT-2026-09-10); jeśli tak, poranne wyjście z GreenViet może wrócić jako wersja dnia p 2.
```

na:

```markdown
- **Sơn Trà:** czy drogi otwarto po wstrzymaniu z 8.10.2026 (CF-2026-10-09), czy trasa Tiên Sa – Suối Ôm – Bàn Cờ wróciła i czy zarząd nie zmienił godzin, zasad pojazdów i zielonej karty (VNP-2026-08-17). Najlepiej szukać komunikatów zarządu w prasie z Đà Nẵng. Sprawdzone 14.10.2026: drogi dalej wstrzymane od 8.10.2026 do odwołania, komunikatu o otwarciu nie ma (DN-2026-10-14a, DN-2026-10-14b, DN-2026-10-14c), a nowszych zasad niż z 17.8.2026 (godziny, pojazdy, zielona karta, wstrzymana trasa Tiên Sa – Suối Ôm – Bàn Cờ) nie znalazłem. Tuż przed publikacją sprawdzić jeszcze raz.
- **GreenViet i przewodnicy:** czy po 10.9.2026 zarząd zatwierdził jakiekolwiek wyjścia z obserwacją duków (TT-2026-09-10); jeśli tak, poranne wyjście z GreenViet może wrócić jako wersja dnia p 2. Sprawdzone 14.10.2026: zgody zarządu na takie wyjścia ani zatwierdzonego planu ekoturystyki rezerwatu nie znalazłem, więc spaceru z GreenViet dalej nie ma w planie. Na marginesie: portal miasta opisał 2.10.2025 pilotaż herbaty na szczycie Bàn Cờ z zarządem półwyspu jako organizatorem (grupy do 10 osób, 5:00–7:00 i 17:00–19:00, wzmianka o łączeniu z wypatrywaniem duków); czy ruszył, nie ustaliłem (DN-2026-10-14d).
```

W `research/danang-2026-10.md` zamień:

```markdown
- **Hải Vân Quan:** dzień, od którego obowiązuje opłata 70 000 VND (2.6.2026 znam tylko z wyników wyszukiwania, HVQ-0602†).
```

na:

```markdown
- **Hải Vân Quan:** dzień, od którego obowiązuje opłata 70 000 VND (2.6.2026 znam tylko z wyników wyszukiwania, HVQ-0602†). Sprawdzone 14.10.2026: 2.6.2026 potwierdza artykuł VnExpress, który się otworzył; opłata obowiązuje do 31.12.2028 na podstawie uchwały 05/2026/NQ-HĐND, a zabytek jest czynny codziennie 7:00–17:30 (DN-2026-10-14e, DN-2026-10-14g).
```

W `research/danang-2026-10.md` zamień:

```markdown
- Czy drogi Sơn Trà są dziś (13.10.2026) otwarte: ostatnia wiadomość to wstrzymanie od 8.10.2026 do odwołania (CF-2026-10-09).
- Aktualnej oferty GreenViet, jej ceny na 2026 i tego, czy zarząd zgadza się na start przed 7:30. Nie znalazłem też żadnego przewodnika do obserwacji duków z uprawnieniami po 10.9.2026.
```

na:

```markdown
- Czy drogi Sơn Trà są dziś (13.10.2026) otwarte: ostatnia wiadomość to wstrzymanie od 8.10.2026 do odwołania (CF-2026-10-09). 14.10.2026 to samo: komunikatu o otwarciu nie ma (DN-2026-10-14a, DN-2026-10-14c).
- Aktualnej oferty GreenViet, jej ceny na 2026 i tego, czy zarząd zgadza się na start przed 7:30. Nie znalazłem też żadnego przewodnika do obserwacji duków z uprawnieniami po 10.9.2026. 14.10.2026 to samo: zgody zarządu na wyjścia z obserwacją duków nie znalazłem; jest tylko pilotaż herbaty na Bàn Cờ z 2025 r. (DN-2026-10-14d).
```

W `research/danang-2026-10.md` zamień:

```markdown
| ZDJ | Strony plików na Wikimedia Commons (adresy w tabeli „Zdjęcia: kandydaci”) i kategorie: Pygathrix nemaeus in Vietnam, Huyen Khong Cave, My Khe Beach, Son Tra District, Linh Ung Pagoda, Quan The Am statue (Linh Ung Pagoda), Museum of Cham Sculpture | https://commons.wikimedia.org/wiki/Category:Pygathrix_nemaeus_in_Vietnam ; https://commons.wikimedia.org/wiki/Category:Son_Tra_District | encyklopedia (repozytorium mediów) | 13.10.2026 |
```

na:

```markdown
| ZDJ | Strony plików na Wikimedia Commons (adresy w tabeli „Zdjęcia: kandydaci”) i kategorie: Pygathrix nemaeus in Vietnam, Huyen Khong Cave, My Khe Beach, Son Tra District, Linh Ung Pagoda, Quan The Am statue (Linh Ung Pagoda), Museum of Cham Sculpture | https://commons.wikimedia.org/wiki/Category:Pygathrix_nemaeus_in_Vietnam ; https://commons.wikimedia.org/wiki/Category:Son_Tra_District | encyklopedia (repozytorium mediów) | 13.10.2026 |

### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów „Do sprawdzenia przed publikacją (etap 4)”: WebSearch i WebFetch 14.10.2026, bez zapisywania stron. Wszystkie adresy z tej tabeli się otworzyły.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| DN-2026-10-14a | Báo Đà Nẵng: zarząd półwyspu wstrzymuje zwiedzanie Sơn Trà od 8.10 do odwołania; ulewy 8–9.10, ryzyko osuwisk i powodzi błyskawicznych; śliskie drogi, mgła; bez daty otwarcia, bez wzmianki o godzinach i zielonej karcie | https://baodanang.vn/tam-dung-tham-quan-tai-ban-dao-son-tra-3354524.html | prasa (dziennik władz miasta) | 8.10.2026, 17:03 |
| DN-2026-10-14b | VnExpress: to samo wstrzymanie; termin otwarcia nieustalony; zarząd radzi nie wjeżdżać na półwysep i zmienić plany | https://vnexpress.net/da-nang-tam-dung-tham-quan-ban-dao-son-tra-5130055.html | prasa | 8.10.2026, 18:40 |
| DN-2026-10-14c | VnExpress, strona tematu „bán đảo Sơn Trà”: najnowszy wpis to wstrzymanie z 8.10; wiadomości o otwarciu brak | https://vnexpress.net/tag/ban-dao-son-tra-83776 | prasa | odczyt 14.10.2026 |
| DN-2026-10-14d | Danang Fantastic City: pilotaż herbaty na szczycie Bàn Cờ, Wydział Turystyki wyznacza zarząd półwyspu na organizatora, grupy do 10 osób, 5:00–7:00 i 17:00–19:00, na 5 lat; możliwe połączenie z wypatrywaniem duków; bez ceny i bez opisu zgody na obserwację duków | https://danangfantasticity.com/en/tin-tuc/da-nang-thi-diem-tour-trai-nghiem-thuong-tra-tren-dinh-ban-co | urzędowe (portal turystyczny miasta) | 2.10.2025 |
| DN-2026-10-14e | VnExpress: Hải Vân Quan, opłata od 2.6, 70 000 VND za wejście, jednakowa dla Wietnamczyków i cudzoziemców, do 31.12.2028; czynne 7:00–17:30; dzieci poniżej 1,2 m za darmo; 50% zniżki dla mieszkańców Huế i Đà Nẵng | https://vnexpress.net/di-tich-hai-van-quan-chinh-thuc-thu-phi-tham-quan-5080669.html | prasa | 1.6.2026, 18:11 |
| DN-2026-10-14f | Báo Văn hóa: HĐND Huế przyjęła 22.5 opłatę 70 000 VND; dochód dla Centrum Ochrony Zabytków Huế, co najmniej 20% na utrzymanie zabytku; bezpłatnie m.in. dzieci poniżej 13 lat; uchwała do końca 2028 | https://baovanhoa.vn/van-hoa/thu-phi-tham-quan-di-tich-quoc-gia-hai-van-quan-voi-muc-70000-dong-230675.html | prasa | 22.5.2026 |
| DN-2026-10-14g | Uchwała 05/2026/NQ-HĐND (Huế, 22.5.2026) o opłacie za Hải Vân Quan; serwis podaje tylko metryczkę, bez tekstu | https://thuviennhadat.vn/van-ban-phap-luat-viet-nam/nghi-quyet-05-2026-nq-hdnd-quan-ly-phi-tham-quan-di-tich-lich-su-hai-van-quan-quan-hue-707049.html | urzędowe (akt prawny w serwisie prawnym) | 22.5.2026 |
```

W `research/hagiang-2026-10.md` zamień:

```markdown
  - **Zamknięcia punktów:** „Mỏm đá sống ảo” (skalny występ nad przepaścią na Mã Pí Lèng) jest zamknięty od 1.07.2026 do odwołania, bo nie spełnia warunków bezpieczeństwa (HG-VOV-0626). Maszt w Lũng Cú był zamknięty 30.05–18.06.2025 na czas remontu (HG-VNS-0625). Łodzie w Tu Sản pływały normalnie w lipcu 2026 (HG-BVH-NQ), ale nie w czasie burz (HG-COR-TS). X nie wystąpiło: oficjalnego zamknięcia pętli nie znalazłem.
```

na:

```markdown
  - **Zamknięcia punktów:** „Mỏm đá sống ảo” (skalny występ nad przepaścią na Mã Pí Lèng) jest zamknięty od 1.07.2026 do odwołania, bo nie spełnia warunków bezpieczeństwa (HG-VOV-0626); 10.10.2026 gmina Đồng Văn postawiła tam nowy płot wysokości 2 m z tablicą zakazu wejścia, bo w skale są pęknięcia i grozi obryw, a miejsce wróci dopiero po spełnieniu warunków bezpieczeństwa (HG-2026-10-14k, stan 14.10.2026). Maszt w Lũng Cú był zamknięty 30.05–18.06.2025 na czas remontu (HG-VNS-0625). Łodzie w Tu Sản pływały normalnie w lipcu 2026 (HG-BVH-NQ), ale nie w czasie burz (HG-COR-TS). X nie wystąpiło: oficjalnego zamknięcia pętli nie znalazłem.
```

W `research/hagiang-2026-10.md` zamień:

```markdown
| [10, 1] | [12, 31] | „Kwitnie gryka (tam giác mạch): różowe i białe pola na płaskowyżu. Festiwal w Đồng Văn ma co roku inną datę (2025: 29.11, 2026: 6.11), wtedy noclegi i drogi są zatłoczone, a w czasie festiwalu ruch przez Đồng Văn bywa wstrzymany.” | nie | HG-VNE (X–XII), HG-VNP-0826 (X–XII 2026, otwarcie 6.11), HG-LSVN-1125 (2025: 29.11, zakaz ruchu w gminie Đồng Văn 28–30.11 poza pojazdami uprzywilejowanymi) |

- **Gryka:** pola obsiewa się w trzech turach, ok. 400 ha w 2026, żeby kwitły od października do grudnia (HG-VNP-0826). Okno daje cały ten okres.
- **Khâu Vai:** data zależy od kalendarza księżycowego, więc okno obejmuje najwcześniejszą i najpóźniejszą znaną datę z zapasem. W 2027 wypada ok. 3.05 (**szacunek** z kalendarza księżycowego: nów 7.04.2027 czasu wietnamskiego, plus 26 dni); do sprawdzenia w kalendarzu urzędowym.
- **Festiwal gryki:** XII edycja 2026 otwiera się wieczorem 6.11.2026 na placu w Đồng Văn; 3–7.11 targ produktów lokalnych na starówce, 5–11.11 targi wietnamsko-chińskie (HG-VNP-0826).
```

na:

```markdown
| [10, 1] | [12, 31] | „Kwitnie gryka (tam giác mạch): różowe i białe pola na płaskowyżu. Festiwal w Đồng Văn ma co roku inną datę (2025: 29.11, 2026: 25.10), wtedy noclegi i drogi są zatłoczone, a w czasie festiwalu ruch przez Đồng Văn bywa wstrzymany.” | nie | HG-VNE (X–XII), HG-VNP-0826 (X–XII 2026; plan z sierpnia: otwarcie 6.11), HG-2026-10-14o i HG-2026-10-14q (otwarcie 25.10.2026, stan 14.10.2026), HG-LSVN-1125 (2025: 29.11, zakaz ruchu w gminie Đồng Văn 28–30.11 poza pojazdami uprzywilejowanymi) |

- **Gryka:** pola obsiewa się w trzech turach, ok. 400 ha w 2026, żeby kwitły od października do grudnia (HG-VNP-0826). Okno daje cały ten okres.
- **Khâu Vai:** data zależy od kalendarza księżycowego, więc okno obejmuje najwcześniejszą i najpóźniejszą znaną datę z zapasem. W 2027 wypada ok. 3.05 (**szacunek** z kalendarza księżycowego: nów 7.04.2027 czasu wietnamskiego, plus 26 dni); do sprawdzenia w kalendarzu urzędowym. Sprawdzenie 14.10.2026: przelicznik kalendarza daje dla 27. dnia 3. miesiąca roku Đinh Mùi 3.05.2027, poniedziałek (HG-2026-10-14u), a serwis biura 2.05.2027 (HG-2026-10-14v†); urzędowej daty jeszcze nie ma. Festiwal zaczyna się zwykle dzień albo dwa przed dniem targu (2025: 22–24.04, 2026: 12–13.05; HG-ND-0425, HG-ND-0526).
- **Festiwal gryki:** XII edycja 2026 otwiera się 25.10.2026 o 20:00 na placu Thanh niên w Đồng Văn, według komunikatu prowincji (HG-2026-10-14o, HG-2026-10-14q; tak samo HG-2026-10-14p i HG-2026-10-14r). Plan z sierpnia podawał otwarcie 6.11.2026 i targ produktów lokalnych 3–7.11 (HG-VNP-0826). Program według komunikatu: 21–25.10 produkty lokalne (OCOP) na starówce Đồng Văn, 23.10 dzień kultury Lô Lô i wymiana kulturalna z Chinami, 24–25.10 dzień kultury w Lùng Tám, 31.10 koncert rockowy w geoparku, 5–11.11 targi wietnamsko-chińskie w kompleksie sportowym prowincji w Hà Giang 1 (HG-2026-10-14q, HG-2026-10-14r). VnExpress z 12.10 pisze, że do otwarcia został prawie miesiąc, co pasowałoby raczej do 6.11 (HG-2026-10-14s); przyjmuję 25.10, bo podają je nowsze teksty, gazeta prowincji i komunikat prowincji. Zasad ruchu na 2026 do 14.10.2026 nie ogłoszono; w 2025 r. ukazały się w dniu przed otwarciem i zakazywały 28–30.11 ciężarówek powyżej 8 t, pojazdów specjalnych i ciągników siodłowych na QL4C, na drodze do Lũng Cú i na ĐT176 Yên Minh – Mèo Vạc, a przez gminę Đồng Văn wpuszczały tylko pojazdy uprzywilejowane i obsługujące festiwal (HG-2026-10-14t, HG-LSVN-1125).
```

W `research/hagiang-2026-10.md` zamień:

```markdown
- **Ramka „Samodzielnie” (decyzja 13.10.2026):** przełącznik jak w Cao Bằng; motocykl bierze się i oddaje w mieście Hà Giang; ramka dodaje do wspólnych wymagań i ryzyka kontrole od 12.04.2026, oba wypadki z 2026 r. i pozwolenie na strefę przygraniczną (sekcja „Strefa przygraniczna: pozwolenie”).
```

na:

```markdown
- **Sprawdzenie 14.10.2026:** bez zmian. Nowych zasad z V–X 2026 dla cudzoziemców na wypożyczonych motocyklach, nowych kar ani wiadomości, że wypożyczalnie odmawiają bez kategorii A, nie znalazłem. Prasa z 5.06.2026 opisuje kampanię prowincji i policji drogowej: instruktaż o kaskach i ochraniaczach przed wyjazdem, kontrole pojazdów i częstsze patrole, a 30 firm i prawie 2000 kierowców przeszło szkolenie z przepisów i podpisało zobowiązanie (HG-2026-10-14h); o prawie jazdy turystów tekst nic nie mówi. Biura powtarzają wymóg prawa jazdy z kategorią motocyklową albo IDP z 1968 r. i podają, bez podstawy prawnej, kary 1–3 mln VND i możliwe zatrzymanie motocykla (HG-2026-10-14i). Platforma rezerwacyjna sprzedaje 4-dniową wycieczkę z jazdą samemu, której nazwa obiecuje jazdę bez prawa jazdy, policji i kar (HG-2026-10-14j): to sygnał, że nie wszyscy odmawiają, a nie dowód. Nowych śmiertelnych wypadków turystów w VIII–X 2026 nie znalazłem (to wynik wyszukiwania, nie pewność).
- **Ramka „Samodzielnie” (decyzja 13.10.2026):** przełącznik jak w Cao Bằng; motocykl bierze się i oddaje w mieście Hà Giang; ramka dodaje do wspólnych wymagań i ryzyka kontrole od 12.04.2026, oba wypadki z 2026 r. i pozwolenie na strefę przygraniczną (sekcja „Strefa przygraniczna: pozwolenie”).
```

W `research/hagiang-2026-10.md` zamień:

```markdown
- **Wniosek dla strony (zastępuje wcześniejszy):** pozwolenie jest potrzebne na Đồng Văn, Mã Pí Lèng i Lũng Cú. W wycieczce załatwia je biuro, a jadąc samemu: urząd imigracyjny policji w mieście Hà Giang albo hotel. Paszport zawsze przy sobie.

```

na:

```markdown
- **Wniosek dla strony (zastępuje wcześniejszy):** pozwolenie jest potrzebne na Đồng Văn, Mã Pí Lèng i Lũng Cú. W wycieczce załatwia je biuro, a jadąc samemu: urząd imigracyjny policji w mieście Hà Giang albo hotel. Paszport zawsze przy sobie.
- **Sprawdzenie 14.10.2026:** wniosek bez zmian. Decyzji, która uznaje płaskowyż Đồng Văn za obszar turystyczny, dalej nie ma, ani krajowej, ani prowincji: portal ministerstwa kultury wymienia w marcu 2026 krajowy obszar turystyczny Płaskowyż Đồng Văn tylko wśród celów rozbudowy w planach prowincji, pod nazwą z planu z 2017 r. (HG-2026-10-14c). Opłata urzędowa to dalej 10 USD, a zmiany rozporządzenia 28/2026/TT-BTC nie znalazłem (HG-2026-10-14a). Dekret 340/2026/NĐ-CP z 28.08.2026, w mocy od 16.10.2026, zmienia tylko przepisy o budowach w pasie przygranicznym, a art. 6 dekretu 34/2014 o pozwoleniach dla cudzoziemców zostaje (HG-2026-10-14b). Biura dalej piszą, że pozwolenie sprawdza się od czerwca 2026 i że przez biuro kosztuje ok. 250 000 VND (HG-2026-10-14d).

```

W `research/hagiang-2026-10.md` zamień:

```markdown
  - **Nocne autobusy** sypialne z Hà Nội przyjeżdżają do Hà Giang między 23:15 a 4:10 (HG-NV-HN), więc noc w autobusie nie zastąpi noclegu przed pętlą; strona ich nie proponuje.
```

na:

```markdown
  - **Sprawdzenie 14.10.2026:** autostrada nie jest otwarta i komunikatu o otwarciu nie znalazłem. 9.09.2026 gazeta prowincji pisała o celu oddania w 2026 r.: odcinek 77 km przez dawną prowincję Tuyên Quang miał 74,13% wartości robót, a odcinek 27,48 km przez dawną Hà Giang 99,3% (HG-2026-10-14e). 24.09.2026 odcinek 77 km miał 75,05%, a wszystkie elementy wersji czteropasmowej mają być gotowe do 31.12.2026; daty 30.10 tam nie ma (HG-2026-10-14f). Datę 30.10.2026 podaje tylko HG-BVH-0926, więc otwarcie w tym dniu jest wątpliwe (moja ocena). Czasu przejazdu po otwarciu żadne źródło z 2026 r. nie podaje (HG-2026-10-14e, HG-2026-10-14f, HG-2026-10-14g); w danych zostaje 6,5 h.
  - **Nocne autobusy** sypialne z Hà Nội przyjeżdżają do Hà Giang między 23:15 a 4:10 (HG-NV-HN), więc noc w autobusie nie zastąpi noclegu przed pętlą; strona ich nie proponuje.
```

W `research/hagiang-2026-10.md` zamień:

```markdown
2. **Autostrada Tuyên Quang – Hà Giang:** czy otwarto ją 30.10.2026 (źródła podają też lipiec 2027) i o ile skraca hanoi – hagiang i HAN – hagiang.
3. **Pozwolenie na strefę przygraniczną:** 13.10.2026 odczytano dekret 299/2025 i listę gmin (uzupełnienie w sekcji „Strefa przygraniczna: pozwolenie”): pozwolenie jest potrzebne. Przed publikacją sprawdzić, czy prowincja nie uznała płaskowyżu za obszar turystyczny (wtedy wyjątek z dekretu by go objął) i czy opłata urzędowa to dalej 10 USD.
4. **Wypożyczalnie:** czy po 12.04.2026 odmawiają bez kategorii A i IDP; kaucja i ubezpieczenie w ZingHome.
5. **Drugie biuro z licencją** z siedzibą w Hà Giang, do linków, oraz cennik auta z kierowcą na samą pętlę (z noclegiem kierowcy). Licencję ZingHome 08-0023/2026 sprawdzić w rejestrze krajowego urzędu turystyki (rejestr nie otwiera się dla narzędzia).
6. **Ceny:** bilet do Lũng Cú (strona Vietnam Airlines zwraca 404), łódź w Tu Sản w 2026 (100 000–150 000 albo 250 000 VND), pakiety ZingHome.
7. **„Mỏm đá sống ảo”:** czy otwarty ponownie.
8. **Wydarzenia:** data targu w Khâu Vai w 2027 (szacunek 3.05) i festiwalu gryki w 2027, z zakazami ruchu w Đồng Văn.
9. **Droga hagiang – sapa:** uzgodniona 13.10.2026 na 6 h (mediana obu notatek).
10. **Osuwiska:** nowe zamknięcia QL4C, zwłaszcza w październiku (trzeci rok dałby argument za Z) i w lipcu–sierpniu.
```

na:

```markdown
2. **Autostrada Tuyên Quang – Hà Giang:** czy otwarto ją 30.10.2026 (źródła podają też lipiec 2027) i o ile skraca hanoi – hagiang i HAN – hagiang. Sprawdzone 14.10.2026: nieotwarta, termin 30.10 niepotwierdzony, czasu przejazdu brak (sekcja „Dojazd”, HG-2026-10-14e, HG-2026-10-14f).
3. **Pozwolenie na strefę przygraniczną:** 13.10.2026 odczytano dekret 299/2025 i listę gmin (uzupełnienie w sekcji „Strefa przygraniczna: pozwolenie”): pozwolenie jest potrzebne. Przed publikacją sprawdzić, czy prowincja nie uznała płaskowyżu za obszar turystyczny (wtedy wyjątek z dekretu by go objął) i czy opłata urzędowa to dalej 10 USD. Sprawdzone 14.10.2026: płaskowyżu nie uznano za obszar turystyczny, opłata to dalej 10 USD, a nowy dekret 340/2026 pozwoleń nie dotyczy (sekcja „Strefa przygraniczna: pozwolenie”, HG-2026-10-14a, HG-2026-10-14b, HG-2026-10-14c).
4. **Wypożyczalnie:** czy po 12.04.2026 odmawiają bez kategorii A i IDP; kaucja i ubezpieczenie w ZingHome. Sprawdzone 14.10.2026: nowych wiadomości o odmowach, zasadach ani karach brak (sekcja „Motocykl samodzielnie w Hà Giang”, HG-2026-10-14h, HG-2026-10-14i, HG-2026-10-14j); kaucji i ubezpieczenia w ZingHome nie sprawdzano.
5. **Drugie biuro z licencją** z siedzibą w Hà Giang, do linków, oraz cennik auta z kierowcą na samą pętlę (z noclegiem kierowcy). Licencję ZingHome 08-0023/2026 sprawdzić w rejestrze krajowego urzędu turystyki (rejestr nie otwiera się dla narzędzia).
6. **Ceny:** bilet do Lũng Cú (strona Vietnam Airlines zwraca 404), łódź w Tu Sản w 2026 (100 000–150 000 albo 250 000 VND), pakiety ZingHome.
7. **„Mỏm đá sống ảo”:** czy otwarty ponownie. Sprawdzone 14.10.2026: nie; 10.10.2026 gmina Đồng Văn postawiła nowy płot wysokości 2 m z zakazem wejścia, bo skała pęka, a otwarcie będzie możliwe dopiero po spełnieniu warunków bezpieczeństwa i ocenie ekspertów (HG-2026-10-14k).
8. **Wydarzenia:** data targu w Khâu Vai w 2027 (szacunek 3.05) i festiwalu gryki w 2027, z zakazami ruchu w Đồng Văn. Sprawdzone 14.10.2026: urzędowych dat na 2027 jeszcze nie ma; przelicznik kalendarza potwierdza 3.05.2027 dla Khâu Vai (HG-2026-10-14u). Festiwal gryki 2026 otwiera się 25.10.2026, a nie 6.11 (sekcja „Wydarzenia”); zasad ruchu na 2026 do 14.10.2026 nie ogłoszono, a w 2025 r. ukazały się w dniu przed otwarciem, więc warto sprawdzić je ok. 24.10.2026. Zostaje otwarte.
9. **Droga hagiang – sapa:** uzgodniona 13.10.2026 na 6 h (mediana obu notatek).
10. **Osuwiska:** nowe zamknięcia QL4C, zwłaszcza w październiku (trzeci rok dałby argument za Z) i w lipcu–sierpniu. Sprawdzone 14.10.2026: nowych zamknięć QL4C we wrześniu i październiku 2026 (do 14.10) nie znalazłem; 4.08.2026 wykonawca naprawiał 15 osuwisk na QL4C i 8 na QL34 przy otwartym ruchu (HG-2026-10-14l), a 22.09.2026 zarząd dróg krajowych pisał o normalnym ruchu (HG-2026-10-14m). Do października 2025 dochodzi ulewa 8.10.2025, po której runęła brama na wjeździe do centrum Đồng Văn i zablokowała drogę, z objazdem (HG-2026-10-14n). Październik ma więc zdarzenia w 2024 i 2025 r., a w 2026 r. (do 14.10) żadnego: argumentu za Z nie przybyło.
```

W `research/hagiang-2026-10.md` zamień:

```markdown
### Pliki projektu
```

na:

```markdown
### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów „Do sprawdzenia przed publikacją (etap 4)” 14.10.2026 (agent badawczy, WebSearch i WebFetch, bez zapisywania stron). † jak w „Jak czytać”.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| HG-2026-10-14a | Rozporządzenie 28/2026/TT-BTC (ten sam adres co F-POZW-7): poz. II.8 taryfy, pozwolenie na wjazd w strefę zakazaną albo przygraniczną 10 USD za osobę; w mocy od 1.04.2026; strona nie pokazuje zmian aktu. | https://english.luatvietnam.vn/circular-no-28-2026-tt-btc-dated-march-27-2026-of-the-ministry-of-finance-providing-the-rates-and-the-collection-and-remittance-of-charges-and-fees-430424-doc1.html | urzędowe (tekst aktu w bazie komercyjnej) | 27.03.2026 (akt), odczyt 14.10.2026 |
| HG-2026-10-14b | Tạp chí Tòa án: dekret 340/2026/NĐ-CP z 28.08.2026, w mocy od 16.10.2026, o budowlach granicznych i inwestycjach w pasie przygranicznym; uchyla ust. 2 art. 8 dekretu 34/2014; o pozwoleniach dla cudzoziemców nic. | https://tapchitoaan.vn/index.php/chinh-phu-sua-doi-quy-dinh-ve-dau-tu-xay-dung-cong-trinh-bien-gioi16326.html | prasa | 4.09.2026 |
| HG-2026-10-14c | Portal ministerstwa kultury: plany Tuyên Quang, wśród nich rozbudowa krajowych obszarów turystycznych, także Płaskowyżu Đồng Văn; bez decyzji o uznaniu i bez daty. | https://bvhttdl.gov.vn/tuyen-quang-huong-en-du-lich-xanh-ban-sac-chat-luong-cao-va-ben-vung.htm | urzędowe | 9.03.2026 |
| HG-2026-10-14d | Borderlands Tours: od czerwca 2026 władze egzekwują pozwolenie dla cudzoziemców (Quản Bạ, Yên Minh, Đồng Văn, Mèo Vạc), ok. 250 000 VND, w urzędzie imigracyjnym w mieście Hà Giang albo przez biuro; bez pozwolenia grozi kara, opóźnienie albo powrót do miasta. | https://www.borderlandstours.com/post/ha-giang-loop-permit-2026 | operator | 8.06.2026 (rok z treści) |
| HG-2026-10-14e | Báo Tuyên Quang (gazeta prowincji): odcinek 77 km 74,13% wartości robót, odcinek 27,48 km 99,3%; wszystkie elementy czteropasmowe do 31.12.2026; cel oddania w 2026 r. bez dnia; bez czasu przejazdu. | https://baotuyenquang.com.vn/kinh-te/202609/cao-toc-tuyen-quang-ha-giang-tang-toc-hoan-thien-4-lan-xe-6b61358/ | prasa (gazeta prowincji) | 9.09.2026 |
| HG-2026-10-14f | VietnamPlus: odcinek 77 km 75,05%; odcinek przez dawną Hà Giang w wersji dwupasmowej 99,7%, czteropasmowej ponad 58%; wykonawcy mają skończyć elementy czteropasmowe do 31.12; brak 30.10 i czasu przejazdu. | https://www.vietnamplus.vn/gap-rut-thi-cong-som-hoan-thanh-cao-toc-tuyen-quang-ha-giang-cuoi-nam-post1138183.vnp | prasa | 24.09.2026 |
| HG-2026-10-14g | Báo Tuyên Quang: projekt wykonany w ponad 83% zakresu robót, wypłacono ok. 85% środków; bez terminu otwarcia i bez liczby godzin. | https://baotuyenquang.com.vn/xa-hoi/202608/nuoc-rut-tren-cong-truong-cao-toc-tuyen-quang-ha-giang-285535a/ | prasa (gazeta prowincji) | 21.08.2026 |
| HG-2026-10-14h | Báo Văn hóa: kampania na polecenie prowincji i departamentu policji drogowej: instruktaż o sprzęcie ochronnym, kontrole pojazdów, patrole; 30 firm i prawie 2000 kierowców poinformowanych o przepisach i zobowiązanych; o prawie jazdy turystów, karach i wypożyczalniach nic. | https://baovanhoa.vn/du-lich/tuyen-quang-siet-quan-ly-tour-xe-may-tren-cac-tuyen-du-lich-trai-nghiem-234441.html | prasa | 5.06.2026 |
| HG-2026-10-14i | The Loop Tours: posterunki w mieście Hà Giang, Yên Minh, Đồng Văn i Mèo Vạc; sprawdzają prawo jazdy albo IDP z 1968 r., pozwolenie i paszport; kary zwykle 1–3 mln VND i możliwe zatrzymanie motocykla, bez podstawy prawnej; o odmowach wypożyczalni nic. | https://thelooptours.com/news/police-checkpoints-on-the-ha-giang-loop-rules-fines-tips-2026 | operator | brak (© 2026) |
| HG-2026-10-14j | AAA Trip Canvas: 4-dniowa wycieczka „Self Ride” Yolo Ha Giang za 170–177 USD, z nazwą obiecującą jazdę bez prawa jazdy, policji i kar; strona nie wyjaśnia, jak to działa. | https://www.aaa.com/tripcanvas/thing-to-do/self-ride-with-yolo-ha-giang-no-license-no-police-no-fines-415709P2 | operator (platforma) | brak |
| HG-2026-10-14k | VnExpress: 10.10 gmina Đồng Văn postawiła płot 2 m i tablicę z zakazem; od 1.07 teren odgrodzony na czas napraw; pęknięcia skały, ryzyko obrywu; otwarcie tylko po spełnieniu warunków bezpieczeństwa, ocena ekspertów; turyści dalej przechodzą przez płot. | https://vnexpress.net/dung-rao-chan-moi-tai-mom-da-tu-than-deo-ma-pi-leng-5131552.html | prasa | 13.10.2026 |
| HG-2026-10-14l | Báo Tuyên Quang: wykonawca naprawia 15 osuwisk na QL4C i 8 na QL34, drogi otwarte w czasie napraw; od początku roku 490 osuwisk na drogach krajowych w prowincji. | https://baotuyenquang.com.vn/xa-hoi/202608/dam-bao-thong-suot-tren-cac-tuyen-duong-huyet-mach-2e857cc/ | prasa (gazeta prowincji) | 4.08.2026 |
| HG-2026-10-14m | Nhân Dân za zarządem dróg krajowych, stan na 22.09 godz. 14:00: ruch normalny; osuwiska w Lâm Đồng i podtopienia w Thanh Hóa; QL4C niewymieniona. | https://nhandan.vn/quoc-lo-thong-suot-khan-truong-xu-ly-diem-sat-lo-post990232.html | prasa | 22.09.2026 |
| HG-2026-10-14n | Vietbao: rano 8.10.2025 po długich ulewach runęła brama na wjeździe do centrum gminy Đồng Văn i zablokowała drogę; służby ogrodziły miejsce i skierowały ruch objazdem. | https://vietbao.vn/video-sap-cong-chao-vao-cao-nguyen-da-dong-van-565957.html | prasa (agregator) | 8.10.2025 |
| HG-2026-10-14o | Báo Tuyên Quang: według planu otwarcie XII festiwalu 25.10 o 20:00 na placu Thanh niên; ponad 240 ha gryki w 12 z 22 gmin płaskowyżu; pierwsze pola już kwitną; o ruchu nic. | https://baotuyenquang.com.vn/xa-hoi/202610/gieo-trong-hon-240-ha-cay-tam-giac-mach-phuc-vu-le-hoi-cd75329/ | prasa (gazeta prowincji) | 1.10.2026 |
| HG-2026-10-14p | Báo Văn hóa: otwarcie 25.10 o 20:00 na placu Thanh niên w Đồng Văn; kwitnienie do początku grudnia; o ruchu nic. | https://baovanhoa.vn/du-lich/lung-cu-san-sang-don-du-khach-mua-hoa-tam-giac-mach-272144.html | prasa | 7.10.2026 |
| HG-2026-10-14q | Dân Việt (Trang trại Việt) za komunikatem prasowym prowincji: otwarcie 25.10.2026 o 20:00; 11–15.10 Quản Bạ, 17.10 święto ryby w Cốc Cai (Mậu Duệ), 21–25.10 OCOP na starówce, 23.10 dzień Lô Lô, 24–25.10 Lùng Tám, 31.10 koncert, 5–11.11 targi; o ruchu nic. | https://trangtraiviet.danviet.vn/tuyen-quang-le-hoi-hoa-tam-giac-mach-2026-co-gi-hap-dan-du-khach-d1466881.html | prasa | 13.10.2026 |
| HG-2026-10-14r | Sức khỏe và Môi trường: otwarcie planowane na 25.10.2026 o 20:00; targi wietnamsko-chińskie 5–11.11 w kompleksie sportowym prowincji w Hà Giang 1; kwitnienie X–XII; o ruchu nic. | https://suckhoemoitruong.com.vn/nhieu-hoat-dong-dac-sac-tai-le-hoi-hoa-tam-giac-mach-lan-thu-xii-30185.html | prasa | 13.10.2026 |
| HG-2026-10-14s | VnExpress: Lũng Cú, ok. 70 ha w 16 wsiach, siew 25–30.08, 20–25.09 i 15–20.10, kwiaty od połowy października do początku grudnia; tekst mówi o prawie miesiącu do otwarcia, bez daty. | https://vnexpress.net/lung-cu-trong-70-ha-hoa-tam-giac-mach-don-mua-le-hoi-nam-2026-5130438.html | prasa | 12.10.2026 |
| HG-2026-10-14t | Báo Xây dựng: festiwal 2025, departament budownictwa zakazuje 28–30.11 ciężarówek powyżej 8 t, pojazdów specjalnych i ciągników na QL4C, drodze do Lũng Cú i ĐT176 Yên Minh – Mèo Vạc, objazdy z Hà Giang; przez gminę Đồng Văn tylko pojazdy uprzywilejowane i festiwalowe. | https://baoxaydung.vn/tuyen-quang-phan-luong-dam-bao-an-toan-giao-thong-dip-le-hoi-hoa-tam-giac-mach-192251128084206828.htm | prasa | 28.11.2025 |
| HG-2026-10-14u | Przelicznik kalendarza: 3.05.2027 to 27. dzień 3. miesiąca księżycowego roku Đinh Mùi. | https://www.xemlicham.com/am-lich/nam/2027/thang/5/ngay/3 | blog (serwis kalendarza) | odczyt 14.10.2026 |
| HG-2026-10-14v† | LocalVietnam, przewodnik po targu w Khâu Vai: daty w kolejnych latach, 2027: 2.05 (z wyników wyszukiwania; strona pokazała narzędziu tylko menu). | https://localvietnam.com/?p=2587 | operator | brak |

### Pliki projektu
```

W `research/motocykl-2026-10.md` zamień:

```markdown
  - **Ryzyko.** WHO szacuje śmiertelność na drogach w Wietnamie na 17,7 na 100 000 mieszkańców, a w Polsce na 6,5 (2021). To ok. 2,7 raza więcej (WHO-GHO).

```

na:

```markdown
  - **Ryzyko.** WHO szacuje śmiertelność na drogach w Wietnamie na 17,7 na 100 000 mieszkańców, a w Polsce na 6,5 (2021). To ok. 2,7 raza więcej (WHO-GHO).
  - **MSZ RP** odradza samodzielne podróże motocyklem po Wietnamie, zwłaszcza poza największymi ośrodkami, ale strona celowo nie cytuje tej rady w ramce „Samodzielnie”, a przełącznik „Z kierowcą / Samodzielnie” zostaje bez zmian (decyzja z 14.10.2026; WJ-2026-10-14p w `research/wjazd-2026-10.md`).

```

W `research/phongnha-2026-10.md` zamień:

```markdown
  - **Lipiec 2026:** po ulewach w Laosie rzeka Son była przez kilka dni mętna. Łodzie do jaskini Phong Nha pływały, ale przy Hang Tối nie dało się kąpać w rzece. Chętnych na rzekę Chày było ok. 20% mniej, w szczycie sezonu (TT-2026-07-15).
```

na:

```markdown
    - 9–10.10.2026, ulewy od wieczora 9.10: woda zalała niżej położone części gminy Phong Nha i brody, m.in. Bến Troóc, a władze postawiły zapory przy zalanych przejazdach (PN-2026-10-14g). Centrum Turystyki wydało komunikat o stanie zwiedzania z 10.10.2026 (PN-2026-10-14h†), ale jego treści nie odczytałem, więc nie wiem, czy łodzie i jaskinie stały. Strona parku do 12.10.2026 komunikatu o wstrzymaniu nie ma, a prasy o zamknięciu łodzi albo jaskiń nie znalazłem (PN-2026-10-14f; sprawdzenie 14.10.2026).
  - **Lipiec 2026:** po ulewach w Laosie rzeka Son była przez kilka dni mętna. Łodzie do jaskini Phong Nha pływały, ale przy Hang Tối nie dało się kąpać w rzece. Chętnych na rzekę Chày było ok. 20% mniej, w szczycie sezonu (TT-2026-07-15).
```

W `research/phongnha-2026-10.md` zamień:

```markdown
- **Godziny i ceny Paradise Cave:** oficjalnych godzin nie ma, a źródła podają od 6:30–17:00 do 7:30–16:00 (JB-PC, VS-PC, VNA-PC†, VJ-PC†). Bilet 270 000 VND z autkiem trzeba sprawdzić na 2027.
- **Sezony wypraw Oxalis:** Hang Én (strona: XII–połowa IX, FAQ: XII–koniec VIII) i Tú Làn w jeden dzień (strona: cały rok, karta†: XI–połowa IX). Do tego cena Hang Én od 15.11.2026 (9 500 000 VND).
- **Paradise Cave 7 km:** minimum osób (2 czy 5) i to, czy trasa działa cały rok.
```

na:

```markdown
- **Godziny i ceny Paradise Cave:** oficjalnych godzin nie ma, a źródła podają od 6:30–17:00 do 7:30–16:00 (JB-PC, VS-PC, VNA-PC†, VJ-PC†). Bilet 270 000 VND z autkiem trzeba sprawdzić na 2027. Sprawdzone 14.10.2026: strona parku dalej podaje 270 000 VND z autkiem, dzieci 1,1–1,3 m 145 000 VND, poniżej 1,1 m za darmo, ale bez godzin i bez daty cennika (PN-2026-10-14e). Urzędowych godzin dalej nie ma, a czy cena obowiązuje w 2027, nie wiadomo.
- **Sezony wypraw Oxalis:** Hang Én (strona: XII–połowa IX, FAQ: XII–koniec VIII) i Tú Làn w jeden dzień (strona: cały rok, karta†: XI–połowa IX). Do tego cena Hang Én od 15.11.2026 (9 500 000 VND). Sprawdzone 14.10.2026: bez zmian. Strony Hang Én po angielsku i wietnamsku podają sezon od grudnia do połowy września (FAQ: do końca sierpnia) i 9 500 000 VND od osoby, a dat pierwszego i ostatniego wyjścia sezonu 2026/27 nie publikują: są tylko w kalendarzu rezerwacji, którego narzędzie nie czyta (PN-2026-10-14a, PN-2026-10-14b). Jungle Boss dalej pisze o 8 800 000 VND do 14.11.2026 i 9 500 000 VND od 15.11.2026, z wyjściami grudniowymi już po nowej cenie (PN-2026-10-14c). Tú Làn w jeden dzień: strona dalej podaje cały rok i 2 000 000 VND (PN-2026-10-14d).
- **Paradise Cave 7 km:** minimum osób (2 czy 5) i to, czy trasa działa cały rok. Sprawdzone 14.10.2026: strona parku dalej podaje 2 000 000 VND, a minimum grupy w jednym miejscu 2 osoby, w innym 5 (PN-2026-10-14e); czy trasa działa cały rok, nie podaje.
```

W `research/phongnha-2026-10.md` zamień:

```markdown
- **Komunikaty Centrum Turystyki o wstrzymaniach:** strona parku nie ma zakładki z komunikatami, a sprawdzałem tylko aktualności.
```

na:

```markdown
- **Komunikaty Centrum Turystyki o wstrzymaniach:** strona parku nie ma zakładki z komunikatami, a sprawdzałem tylko aktualności. Sprawdzone 14.10.2026: Centrum ma profil na Facebooku z komunikatami, np. o stanie zwiedzania z 10.10.2026, ale jego treść znam tylko z tytułu w wynikach wyszukiwania (PN-2026-10-14h†); strona parku do 12.10.2026 komunikatów o wstrzymaniu nie ma (PN-2026-10-14f).
```

W `research/phongnha-2026-10.md` zamień:

```markdown
| KURS | Kurs NBP z `research/ceny-2026-10.md`: tabela A 197/A/NBP/2026 z 9.10.2026 i tabela B 040/B/NBP/2026 z 7.10.2026. | plik w repozytorium | urzędowe (za `research/ceny-2026-10.md`) | 9.10.2026 |
```

na:

```markdown
| KURS | Kurs NBP z `research/ceny-2026-10.md`: tabela A 197/A/NBP/2026 z 9.10.2026 i tabela B 040/B/NBP/2026 z 7.10.2026. | plik w repozytorium | urzędowe (za `research/ceny-2026-10.md`) | 9.10.2026 |

### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów „Do sprawdzenia przed publikacją (etap 4)”: WebSearch i WebFetch 14.10.2026, bez zapisywania stron. † jak w „Jak czytać”: treść znana tylko z wyników wyszukiwania.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| PN-2026-10-14a | Oxalis, Hang Én (ta sama strona co OX-HE): sezon XII–połowa IX (FAQ: do końca VIII), 9 500 000 VND z opłatami parku, do 16 osób, 16–70 lat, rezerwacja online do 19:00 dzień wcześniej, zwrot przy rezygnacji co najmniej 7 dni przed, powrót ok. 18:00; bez dat wyjść i bez przechowywania bagażu. | https://oxalisadventure.com/tour/hang-en-adventure-cave-camp/ | operator | brak (odczyt 14.10.2026) |
| PN-2026-10-14b | Oxalis, Hang Én po wietnamsku: wyjścia od grudnia do połowy września, w porze deszczowej zamknięte; 9 500 000 VND, 16–70 lat, do 16 osób, koniec ok. 18:00. | https://oxalisadventure.com/vi/tour/kham-pha-hang-en/ | operator | brak (odczyt 14.10.2026) |
| PN-2026-10-14c | Jungle Boss (ta sama strona co JB-HE): 8 800 000 VND do 14.11.2026, od 15.11.2026 9 500 000 VND, grudzień już po nowej cenie; jaskinia zamknięta od połowy IX do XI; rezerwacja kilka miesięcy wcześniej, 10% zniżki przy 90 dniach. Operator konkurencyjny wobec Oxalis. | https://junglebosstours.com/explorer/tourism-blog/hang-en-cave-tour-phong-nha | przewodnik komercyjny | brak (© 2026) |
| PN-2026-10-14d | Oxalis, Tú Làn w jeden dzień (ta sama strona co OX-TL1): cały rok, 2 000 000 VND, 16–70 lat, do 12 osób, odbiór 7:00–7:30, powrót 17:30–19:00. | https://oxalisadventure.com/tour/tu-lan-1-day-experience/ | operator | brak (odczyt 14.10.2026) |
| PN-2026-10-14e | Strona parku, Paradise Cave (ta sama strona co PNKB-PC): 270 000 VND z autkiem, dzieci 1,1–1,3 m 145 000 VND, poniżej 1,1 m za darmo; trasa 7 km 2 000 000 VND, 2 dni/1 noc 4 000 000 VND, sprzeczne minimum osób; bez godzin i bez daty cennika. | https://phongnhakebang.vn/du-lich/dong-thien-duong13 | park/zarządca | brak (odczyt 14.10.2026) |
| PN-2026-10-14f | Strona główna parku (ta sama co PNKB-WWW): wiadomości z 2–12.10.2026, żadnego komunikatu o wstrzymaniu łodzi czy jaskiń. | https://phongnhakebang.vn/ | park/zarządca | 12.10.2026 (najnowszy wpis) |
| PN-2026-10-14g | VietnamPlus: ulewy od wieczora 9.10 do 10.10 zalały niżej położone części gminy Phong Nha, woda na brodach Bến Troóc, Ngọn Rào, Xuân Trạch, Thanh Sen; zapory przy zalanych przejazdach; o turystyce nic. | https://www.vietnamplus.vn/quang-tri-mua-lu-dien-bien-phuc-tap-nhieu-ngam-tran-tuyen-duong-bi-ngap-sau-post1141225.vnp | prasa (agencja państwowa) | 10.10.2026, 16:28 |
| PN-2026-10-14h† | Profil Centrum Turystyki Phong Nha–Kẻ Bàng na Facebooku: wpis z komunikatem o stanie zwiedzania z 10.10.2026; znam tylko tytuł z wyników wyszukiwania. | https://www.facebook.com/phongnhatourism/ | park/zarządca (centrum turystyki parku) | 10.10.2026† |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
- **Lang Biang:** czy szlak na Núi Bà otwarto po zawieszeniu z 31.10.2024. Do tego: czy park Bidoup–Núi Bà wymaga zgody albo przewodnika na ścieżce na Núi Bà. Źródła z 2026 to przewodniki firm, nie urząd. Do sprawdzenia też godziny wejścia na szlak: jeden przewodnik podaje 7:00–13:00, a ośrodek u stóp góry jest czynny ok. 7:00–17:00.
- **Đại Nội:** godziny na stronie Centrum Ochrony Zabytków Huế (Trung tâm Bảo tồn Di tích Cố đô Huế). Tu są tylko strony Vingroup.
- **Cát Tiên:** cennik i rezerwacja noclegu nad Bàu Sấu po przejściu parku pod zarząd miasta Đồng Nai (TD, „Uwagi dla zadań 7 i 8”, pkt 7).
- **Targ Đông Ba:** godziny i część z jedzeniem na stronie zarządu targu. Tu są tylko portal turystyczny Huế (bez daty) i strona centrum handlowego.
- **Hội An:** zasady biletu na stare miasto. Źródła różnią się co do ważności: 24 godziny albo dłużej.
```

na:

```markdown
- **Lang Biang:** czy szlak na Núi Bà otwarto po zawieszeniu z 31.10.2024. Do tego: czy park Bidoup–Núi Bà wymaga zgody albo przewodnika na ścieżce na Núi Bà. Źródła z 2026 to przewodniki firm, nie urząd. Do sprawdzenia też godziny wejścia na szlak: jeden przewodnik podaje 7:00–13:00, a ośrodek u stóp góry jest czynny ok. 7:00–17:00. Sprawdzone 14.10.2026: bez zmian. Komunikatu o otwarciu dalej nie ma, a wiadomości parku do 9.10.2026 nic o Lang Biang nie mówią (LB-2026-10-14a); wyszukiwania po wietnamsku zwracają tylko zawieszenie z 2024, otwarcie przez ośrodek Lang Biang z X 2024 i przewodniki firm z 2026. Przepisu parku o zgodzie albo przewodniku na tej trasie nie znalazłem, a biura dalej sprzedają wejście z przewodnikiem, np. oferta z VI 2026 obiecuje w cenie pozwolenia leśne i turystyczne (LB-2026-10-14b†). Rada „zapytaj park albo ośrodek Lang Biang” zostaje; godzin wejścia na szlak nie sprawdzano.
- **Đại Nội:** godziny na stronie Centrum Ochrony Zabytków Huế (Trung tâm Bảo tồn Di tích Cố đô Huế). Tu są tylko strony Vingroup. Sprawdzone 14.10.2026, punkt zamknięty: strona Centrum (notka z 12.3.2024) podaje dla wszystkich punktów zwiedzania kasy 6:30–17:30 od 16.3 do 15.10 i 7:00–17:00 od 16.10 do 15.3, a zamknięcie 60 minut po kasach, czyli o 18:30 i 18:00 (HUE-2026-10-14a; to samo co HUE-TG w `research/rezerwacje-2026-10.md`). Đại Nội nie jest tam wymieniony z nazwy, ale notka nie ma wyjątków; nowszego komunikatu o zmianie godzin nie znalazłem.
- **Cát Tiên:** cennik i rezerwacja noclegu nad Bàu Sấu po przejściu parku pod zarząd miasta Đồng Nai (TD, „Uwagi dla zadań 7 i 8”, pkt 7). Sprawdzone 14.10.2026: bez zmian. Strona parku ma ten sam cennik (pliki z 2024 i 2025) i ten sam kontakt, najnowszy wpis jest z 7.8.2026, a w stopce dalej są nazwa parku i logotypy ministerstwa (CT-2026-10-14a, CT-2026-10-14b). Po uchwale 188/NQ-CP z 16.7.2026 nie znalazłem wiadomości o samym przekazaniu parku miastu Đồng Nai ani o nowym cenniku czy kanale rezerwacji (CT-2026-10-14d, CT-2026-10-14e).
- **Targ Đông Ba:** godziny i część z jedzeniem na stronie zarządu targu. Tu są tylko portal turystyczny Huế (bez daty) i strona centrum handlowego.
- **Hội An:** zasady biletu na stare miasto. Źródła różnią się co do ważności: 24 godziny albo dłużej. Sprawdzone 14.10.2026: portal turystyczny miasta Đà Nẵng (6.3.2026) opisuje dwa bilety: 80 000 VND (wspólna przestrzeń, Most Japoński albo świątynia Quan Công i dwa obiekty) i 120 000 VND (to samo, muzea i trzy obiekty do wyboru), jednakowe dla Wietnamczyków i cudzoziemców. Bilet kupuje się raz i używa przez cały pobyt, najwyżej 3 dni (HA-2026-10-14a). Opłata za obiekt to od 10.8.2026 20 000 VND od osoby (uchwała 98/2026/NQ-HĐND, HA-2026-10-14d; wcześniej 20 000–30 000 VND, HA-2026-10-14b). Opisy biletu na 5 wejść w HA-GMH i HA-CTR są więc nieaktualne, a zdanie dnia p 2 o bilecie na stare miasto pasuje; czy po 10.8.2026 kasy zmieniły bilety, nie ustaliłem.
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
- **Cát Bà:** czy Cannon Fort znów przyjmuje turystów i czy zniesiono zawieszenie kajaków (zob. też TD, „Uwagi dla zadań 7 i 8”, pkt 7).
```

na:

```markdown
- **Cát Bà:** czy Cannon Fort znów przyjmuje turystów i czy zniesiono zawieszenie kajaków (zob. też TD, „Uwagi dla zadań 7 i 8”, pkt 7). Sprawdzone 14.10.2026: fort dalej nie przyjmuje turystów, a zawieszenia kajaków nie zniesiono. Komunikatu o ponownym otwarciu fortu nie znalazłem; najnowsze datowane źródła o jego stanie mówią, że nie przyjmuje turystów i można najwyżej poprosić strażnicę o wejście (CB-VW, CB-NV, CB-2026-10-14d). Portal komercyjny z 30.5.2026 opisuje fort jak czynny punkt widokowy z biletem 40 000 VND, ale tę samą cenę podawały teksty z 2023 r. (CB-2026-10-14e). Urzędowego zniesienia zawieszenia kajaków nie ma: armator pisze, że zawieszenie na podstawie pisma 483/TB-UBND obowiązuje od 1.2.2026 do odwołania w całej zatoce Lan Hạ, z jaskiniami Sáng – Tối (CB-2026-10-14a), a teksty promocyjne, także w prasie, opisują kajaki bez podstawy prawnej (CB-2026-10-14b, CB-2026-10-14c). Urzędowej listy miejsc do pływania kajakiem też nie znalazłem. Dzień p 1 bez fortu i dzień p 2 bez kajaka zostają.
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| CAO-HNM | Hà Nội Mới (TTXVN), „Khuyến cáo du khách lựa chọn thời gian tham quan thác Bản Giốc”: zapora zatrzymuje wodę do ok. 11:00, a woda płynie ok. 11:00–15:00, gdy elektrownia ją puszcza. | https://hanoimoi.vn/khuyen-cao-du-khach-lua-chon-thoi-gian-tham-quan-thac-ban-gioc-438051.html | prasa | 21.4.2023 |

```

na:

```markdown
| CAO-HNM | Hà Nội Mới (TTXVN), „Khuyến cáo du khách lựa chọn thời gian tham quan thác Bản Giốc”: zapora zatrzymuje wodę do ok. 11:00, a woda płynie ok. 11:00–15:00, gdy elektrownia ją puszcza. | https://hanoimoi.vn/khuyen-cao-du-khach-lua-chon-thoi-gian-tham-quan-thac-ban-gioc-438051.html | prasa | 21.4.2023 |
| HA-2026-10-14a | Danang Fantastic City (portal turystyczny miasta Đà Nẵng), po wietnamsku i angielsku, sprawdzenie 14.10.2026: dwa bilety na stare miasto Hội An, 80 000 VND (wspólna przestrzeń, Most Japoński albo świątynia Quan Công i dwa obiekty) i 120 000 VND (to samo, muzea i trzy obiekty do wyboru); kupowany raz, ważny przez pobyt, najwyżej 3 dni; bez podziału na cudzoziemców i Wietnamczyków. | https://danangfantasticity.com/kham-pha/cap-nhat-ve-tham-quan-khu-pho-co-hoi-an-2026 ; https://danangfantasticity.com/en/discovery/hoi-an-ancient-town-entrance-tickets-2026 | urzędowe (portal turystyczny miasta) | 6.3.2026 |
| HA-2026-10-14b | Portal miasta Đà Nẵng: uchwała 02/2026/NQ-HĐND z 11.2.2026, w mocy od 21.2.2026: stare miasto Hội An 20 000–30 000 VND od osoby za obiekt, jednakowo dla Wietnamczyków i cudzoziemców. | https://danang.gov.vn/vi/w/quy-dinh-muc-thu-10000-40000-dong-luot-tham-quan-tai-hoi-an-my-son-va-cac-thap-co | urzędowe (portal miasta) | 13.2.2026 |
| HA-2026-10-14d | Nhân Dân: uchwała 98/2026/NQ-HĐND zmienia 02/2026, w mocy od 10.8.2026: stare miasto Hội An 20 000 VND od osoby za obiekt, jednakowo dla Wietnamczyków i cudzoziemców. | https://nhandan.vn/da-nang-dieu-chinh-phi-tham-quan-cac-cong-trinh-van-hoa-va-di-san-post980432.html | prasa | 7.8.2026 |
| HUE-2026-10-14a | Centrum Ochrony Zabytków Huế, „Thời gian tham quan” (ta sama strona co HUE-TG w `research/rezerwacje-2026-10.md`), sprawdzenie 14.10.2026: kasy wszystkich punktów zwiedzania 6:30–17:30 (16.3–15.10) i 7:00–17:00 (16.10–15.3); zamknięcie 60 minut po kasach, o 18:30 i 18:00; bez osobnych godzin dla pojedynczych obiektów. | https://hueworldheritage.org.vn/Thong-tin-tham-quan/Thoi-gian-tham-quan | urzędowe (Centrum Ochrony Zabytków Huế) | 12.3.2024 (odczyt 14.10.2026) |
| LB-2026-10-14a | Park Bidoup–Núi Bà, wiadomości: najnowsze z 9.10.2026 (szkolenie z dronów, sprawy kadrowe); nic o Lang Biang, otwarciu, zgłoszeniach ani przewodnikach. | https://bidoupnuiba.gov.vn/tin-tuc/ | urzędowe (park) | 9.10.2026 (najnowszy wpis) |
| LB-2026-10-14b† | Seek Sophie, oferta jednodniowego wejścia na Lang Biang (termin VI 2026) z pozwoleniami leśnymi i turystycznymi w cenie; treść znam tylko z wyników wyszukiwania. | https://www.seeksophie.com/en/experiences/da-lat-trek-da-lat-s-highest-peak-with-an-optional-bike-ride-langbiang-mountain-adventure-opo50p7kjw | komercyjne (pośrednik) | VI 2026† |
| CT-2026-10-14a | Park Cát Tiên, strona główna, sprawdzenie 14.10.2026: najnowsze wpisy z 3.7 i 7.8.2026; nic o noclegu nad Bàu Sấu, nowym cenniku, przekazaniu miastu, Đảo Tiên, gibonach, moście i promie; w stopce nazwa parku i logotypy ministerstwa. | https://cattiennationalpark.com.vn/ | urzędowe (park) | 7.8.2026 (najnowszy wpis) |
| CT-2026-10-14b | Park Cát Tiên, cennik: te same pliki PDF (decyzja z 2024 w folderze 2025/07 i cennik dla gości krajowych w folderze 2024/06), wpis z 20.3.2023; bez nowej daty. | https://cattiennationalpark.com.vn/bang-gia-dich-vu/ | urzędowe (park) | wpis 20.3.2023 (odczyt 14.10.2026) |
| CT-2026-10-14d | Thanh Niên: uchwała 188/NQ-CP z 16.7.2026 o przekazaniu parku Cát Tiên miastu Đồng Nai; ok. 44 000 ha w Đồng Nai i 27 300 ha w Lâm Đồng; o usługach turystycznych nic. | https://thanhnien.vn/kham-pha-vuon-quoc-gia-cat-tien-canh-rung-nguyen-sinh-hon-71000-ha-ben-song-dong-nai-185260720202522645.htm | prasa | 21.7.2026 |
| CT-2026-10-14e | VietnamPlus: plan ekoturystyki parku Cát Tiên 2025–2030 (19 miejsc, 15 tras, 142 km); o Bàu Sấu, Đảo Tiên, gibonach, promie i moście nic. | https://www.vietnamplus.vn/vuon-quoc-gia-cat-tien-la-phoi-xanh-cua-the-gioi-tai-viet-nam-post1135557.vnp | prasa (agencja państwowa) | 26.9.2026 |
| CB-2026-10-14a | Indochina Sails: zawieszenie kajaków na podstawie pisma 483/TB-UBND urzędu Cát Hải, od 1.2.2026 do odwołania, cała zatoka Lan Hạ z jaskiniami Sáng – Tối; zawieszenie dalej obowiązuje; dozwolonych stref brak. | https://www.indochinasails.com/en/blog/kayak-suspension-enhanced-bamboo-boat-experience-in-lan-ha-bay.html | operator | brak (© 1993–2026) |
| CB-2026-10-14b | Bhaya Cruises: kajaki opisane jako dostępne; strefy mogą się zmieniać, trzeba trzymać się tras ustalonych przez władze w 2026 r.; bez decyzji i bez zawieszenia. | https://bhayacruises.com/blog/lan-ha-bay/ | operator | 13.4.2026, aktualizacja 17.7.2026 |
| CB-2026-10-14c | Báo Văn hóa o sezonie 2026 na Cát Bà: kajak o zachodzie słońca na Lan Hạ wśród atrakcji; o zawieszeniu i o forcie nic. | https://baovanhoa.vn/du-lich/dieu-gi-se-tao-nen-con-sot-du-lich-cat-ba-nam-2026-216267.html | prasa | 1.4.2026 |
| CB-2026-10-14d | Lữ hành Việt Nam: fort nie przyjmuje już turystów, można poprosić strażnicę; usług brak; dawny bilet 40 000 VND. | https://luhanhvietnam.com.vn/du-lich/phao-dai-than-cong-cat-ba.html | komercyjne (portal) | 18.5.2023 |
| CB-2026-10-14e | vietnamtourism.com (portal komercyjny bez wydawcy): fort jako punkt widokowy z kawiarnią, bilet 40 000 VND; kajaki bez przewodnika po opłacie 40 000 VND w pływających domach, o zawieszeniu nic. | https://www.vietnamtourism.com/vi/nhung-ieu-nen-lam-tren-ao-cat-ba-cam-nang-ay-u-nam-2026 | komercyjne (portal) | aktualizacja 30.5.2026 |

```

W `research/rezerwacje-2026-10.md` zamień:

```markdown
### Đảo Tiên
```

na:

```markdown
**Stan 14.10.2026: bez zmian** dla noclegu nad Bàu Sấu, Đảo Tiên i gibonów. Strona parku ma ten sam cennik (pliki z 2024 i 2025 roku) i ten sam kontakt, najnowszy wpis jest z 7.08.2026, a w stopce dalej są nazwa parku i logotypy ministerstwa (CT-2026-10-14a, CT-2026-10-14b). VnExpress (aktualizacja 25.05.2026) dalej pisze, że Đảo Tiên jest zamknięty, bez daty i powodu (CT-2026-10-14c); opinia o wycieczce o 8:30 jest ze stycznia 2026, czyli sprzed tej aktualizacji, a jej datę znam tylko z wyników wyszukiwania (CT-2026-10-14h†). O gibonach nowych źródeł nie ma. Wiadomości o samym przekazaniu parku miastu Đồng Nai po uchwale 188/NQ-CP ani o nowym cenniku czy kanale rezerwacji nie znalazłem (CT-2026-10-14d, CT-2026-10-14e). Most: niżej, „Most przez Đồng Nai”.

### Đảo Tiên
```

W `research/rezerwacje-2026-10.md` zamień:

```markdown
- **Wniosek:** stan budowy i data otwarcia są nieznane. W tekstach zostaje prom.
```

na:

```markdown
- **Sprawdzenie 14.10.2026: prasa o moście jest.** Budowę mostu przez Đồng Nai do parku rozpoczęto na początku kwietnia 2025: ponad 156 m, 5 przęseł, szerokość 7 m (6 m wspólnego pasa dla aut i pieszych), nacisk 10 t na oś, 50 mld VND (45 mld z budżetu przez ministerstwo rolnictwa i środowiska, 5 mld z parku); zakończenie planowano na początek 2026 r. (CT-2026-10-14f, CT-2026-10-14g). Wiadomości o otwarciu do 14.10.2026 nie znalazłem, a przewodnik VnExpress (aktualizacja 25.05.2026) liczy prom w cenie biletu (CT-2026-10-14c).
- **Wniosek (14.10.2026):** stan budowy i data otwarcia dalej są nieznane, choć otwarcie planowano na początek 2026 r. W tekstach zostaje prom.
```

W `research/rezerwacje-2026-10.md` zamień:

```markdown
| PL-HDLC | Báo Lào Cai za VnExpress: Hang Dơi zamknięta do zakończenia kontroli przez gminę; ok. 2,5 km, wejście wyższe niż 10 m; wieś pobierała opłaty bez zezwolenia | https://baolaocai.vn/dung-tham-quan-hang-250-trieu-nam-tuoi-o-thanh-hoa-vi-da-roi-post909263.html | prasa | 12.09.2026 |
```

na:

```markdown
| PL-HDLC | Báo Lào Cai za VnExpress: Hang Dơi zamknięta do zakończenia kontroli przez gminę; ok. 2,5 km, wejście wyższe niż 10 m; wieś pobierała opłaty bez zezwolenia | https://baolaocai.vn/dung-tham-quan-hang-250-trieu-nam-tuoi-o-thanh-hoa-vi-da-roi-post909263.html | prasa | 12.09.2026 |

### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów do etapu 4 o Cát Tiên: adresy otwarto 14.10.2026 (WebSearch i WebFetch, bez zapisywania stron), poza oznaczonym † (treść znana tylko z wyników wyszukiwania). CT-2026-10-14a, b i c to te same strony co CT-HOME, CT-CENY i CT-VNE, otwarte znowu 14.10.2026.

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CT-2026-10-14a | Park Cát Tiên, strona główna: najnowsze wpisy z 3.07 i 7.08.2026; nic o noclegu nad Bàu Sấu, nowym cenniku, przekazaniu miastu, Đảo Tiên, gibonach, moście i promie; w stopce nazwa parku i logotypy ministerstwa | https://cattiennationalpark.com.vn/ | urzędowe (park) | najnowszy wpis 7.08.2026 |
| CT-2026-10-14b | Park, cennik: te same pliki PDF (decyzja z 2024 w folderze 2025/07 i cennik dla gości krajowych w folderze 2024/06), wpis z 20.03.2023; bez nowej daty | https://cattiennationalpark.com.vn/bang-gia-dich-vu/ | urzędowe (park) | wpis 20.03.2023 (odczyt 14.10.2026) |
| CT-2026-10-14c | VnExpress, przewodnik po parku: nocleg nad Bàu Sấu (wyjazd do 13:00 rowerem albo 14:00 autem, powrót do 9:30, bez namiotów), opłata 250 000 VND, auto 640 000 VND, przewodnik 450 000 VND; Đảo Tiên zamknięte bez daty i powodu; prom w cenie biletu; o moście nic | https://vnexpress.net/cam-nang-du-lich-vuon-quoc-gia-cat-tien-4775984.html | prasa | 9.08.2024, aktualizacja 25.05.2026 |
| CT-2026-10-14d | Thanh Niên: uchwała 188/NQ-CP z 16.07.2026 o przekazaniu parku miastu Đồng Nai; ok. 44 000 ha w Đồng Nai i 27 300 ha w Lâm Đồng; o usługach turystycznych nic | https://thanhnien.vn/kham-pha-vuon-quoc-gia-cat-tien-canh-rung-nguyen-sinh-hon-71000-ha-ben-song-dong-nai-185260720202522645.htm | prasa | 21.07.2026 |
| CT-2026-10-14e | VietnamPlus: plan ekoturystyki parku 2025–2030 (19 miejsc, 15 tras, 142 km); o Bàu Sấu, Đảo Tiên, gibonach, promie i moście nic | https://www.vietnamplus.vn/vuon-quoc-gia-cat-tien-la-phoi-xanh-cua-the-gioi-tai-viet-nam-post1135557.vnp | prasa (agencja państwowa) | 26.09.2026 |
| CT-2026-10-14f | Báo Đồng Nai: początek budowy mostu przez Đồng Nai do parku, ponad 156 m, 5 przęseł, szerokość 7 m, 10 t na oś, 50 mld VND (45 z budżetu, 5 z parku), zakończenie planowane na początek 2026; dotąd do parku tylko promem | https://baodongnai.com.vn/tin-moi/202504/khoi-cong-cau-qua-song-vao-vuon-quoc-gia-cat-tien-c8c019f/ | prasa (dziennik prowincji) | 4.04.2025 |
| CT-2026-10-14g | Nông nghiệp và Môi trường: to samo, w dzienniku ministerstwa rolnictwa i środowiska; prom nazwany niewygodnym i niebezpiecznym | https://nongnghiepmoitruong.vn/khoi-cong-xay-dung-cau-vao-vuon-quoc-gia-cat-tien-d746637.html | prasa (dziennik ministerstwa) | 4.04.2025 |
| CT-2026-10-14h† | Wanderlog (zestawienie opinii Google): codzienne wycieczki na Đảo Tiên o 8:30 z centrum dla zwiedzających, 400 000 VND; strona nie pokazuje dat opinii, a datę opinii (styczeń 2026) znam tylko z wyników wyszukiwania | https://wanderlog.com/place/details/30765/dao-tien-endangered-primate-species-centre | blog | brak (opinia z I 2026†) |
```

W `research/sapa-2026-10.md` zamień:

```markdown
  - Kolejka szynowa Mường Hoa jedzie ok. 2 km z centrum Sa Pa do dolnej stacji kolejki linowej (SP-NQS260918). Od górnej stacji na szczyt prowadzą schody albo krótka kolejka szynowa (SP-VT-FAN, SP-SPL-CAP).
```

na:

```markdown
  - Sprawdzenie 14.10.2026: od 4.3.2026 kolejka zabiera w górę od poniedziałku do czwartku 8:00–14:30, w piątek 8:00–15:30, w sobotę 7:30–15:30 i w niedzielę 7:30–14:30; ostatni zjazd o 16:00, a w piątek i sobotę o 17:00 (SP-2026-10-14f, SP-2026-10-14g). Pierwszy wjazd jest więc o 7:30 w sobotę i niedzielę i o 8:00 w inne dni, a ostatni o 14:30 albo 15:30.
  - Kolejka szynowa Mường Hoa jedzie ok. 2 km z centrum Sa Pa do dolnej stacji kolejki linowej (SP-NQS260918). Od górnej stacji na szczyt prowadzą schody albo krótka kolejka szynowa (SP-VT-FAN, SP-SPL-CAP).
```

W `research/sapa-2026-10.md` zamień:

```markdown
  - Obiad jest na 2200 m (SP-OCH, SP-VNE-21H†). Część grup nocuje na 2200 m i idzie na szczyt nocą, na wschód słońca (SP-BLC231222, SP-BLC260415).
```

na:

```markdown
  - Sprawdzenie 14.10.2026: na ok. 2800 m jest pole namiotowe i osobna wspólna chata, więc nocleg zależy od biura: przewodnik z X 2026 opisuje prostą chatę z materacami i śpiworami, a Sapa O'Chau daje namioty (SP-2026-10-14a, SP-2026-10-14b, SP-OCH).
  - Obiad jest na 2200 m (SP-OCH, SP-VNE-21H†). Część grup nocuje na 2200 m i idzie na szczyt nocą, na wschód słońca (SP-BLC231222, SP-BLC260415).
```

W `research/sapa-2026-10.md` zamień:

```markdown
  - **Zima (XII–II) zostaje**, z uwagą o lodzie w wydarzeniu [11, 20]–[2, 29], bo wtedy też się wchodzi (SP-BLC260415, SP-TTN251225).
```

na:

```markdown
  - **Sprawdzenie 14.10.2026:** przerw ani zamknięć szlaku w 2026 r. (pożary, burze) dalej nie znalazłem; prasa Lào Cai z IV i VII 2026 opisuje wejścia na bieżąco (SP-BLC260415, SP-BLC260727). Procedura bez zmian: zgłoszenie w parku przez przewodnika albo biuro z licencją, zwykle 1–2 dni wcześniej (SP-2026-10-14a). Opłaty parku na 2026 dalej nie ma: treść uchwały 17/2025/NQ-HĐND z 9.12.2025 się nie otworzyła (SP-2026-10-14d†), a ostatnia znaleziona stawka prowincji, 150 000 VND za osobę z decyzji z 2014 r., już nie obowiązuje (SP-2026-10-14c†).
  - **Zima (XII–II) zostaje**, z uwagą o lodzie w wydarzeniu [11, 20]–[2, 29], bo wtedy też się wchodzi (SP-BLC260415, SP-TTN251225).
```

W `research/sapa-2026-10.md` zamień:

```markdown
    - Dolina Lao Chải – Tả Van: Wikivoyage pisze, że poza Cát Cát za wstęp do wiosek się już nie płaci, ale Sapa Sisters wlicza w cenę opłatę za wstęp do doliny (SP-WV, SP-SIS). Przy Tả Van jest punkt kontrolny (SP-VNE-TV). Kwoty nie ustaliłem.
```

na:

```markdown
    - Sprawdzenie 14.10.2026: 150 000 VND to bilet dla dorosłego (5 EUR), a 70 000 VND dla dziecka 1–1,4 m (2 EUR); dzieci poniżej 1 m wchodzą za darmo. Tak podaje prasa z VII 2023 (SP-2026-10-14i), przewodnik Vietnam Airlines (SP-2026-10-14j†) i serwisy biur z 2026 r. (SP-2026-10-14m, tam dziecko 80 000 VND), więc 70 000 VND w Wikivoyage to najpewniej cena dziecięca (SP-2026-10-14l). Urzędowego cennika na 2026 nie znalazłem, a o opłacie 10 000 VND za rejon wodospadu z 2025 r. (SP-BDT) nowych wiadomości nie ma. Kwota `sapa.catcat` w zestawieniu zostaje (decyzja z 14.10.2026: ceny jak sprawdzone 9–13.10.2026).
    - Dolina Lao Chải – Tả Van: Wikivoyage pisze, że poza Cát Cát za wstęp do wiosek się już nie płaci, ale Sapa Sisters wlicza w cenę opłatę za wstęp do doliny (SP-WV, SP-SIS). Przy Tả Van jest punkt kontrolny (SP-VNE-TV). Kwoty nie ustaliłem.
    - Sprawdzenie 14.10.2026: prasa z VII 2023 i przewodniki podają za dolinę 75 000 VND od dorosłego (3 EUR) i 50 000 VND od dziecka, płatne przy punkcie kontrolnym Tả Van (SP-2026-10-14i, SP-2026-10-14k†, SP-2026-10-14m); blog z 2022 r. pisze, że kontrola przy bramie jest luźna (SP-2026-10-14n). VnExpress z VIII 2026 wspomina tylko punkt kontrolny, bez opłaty (SP-VNE-TV). Urzędowej stawki na 2026 nie znalazłem; w wycieczce opłatę wlicza biuro (SP-SIS).
```

W `research/sapa-2026-10.md` zamień:

```markdown
  - aktualna opłata parku Hoàng Liên za wejście i procedura zezwolenia (oficjalnego cennika z 2026 nie znalazłem, a 150 000 VND jest z 2015);
  - czy park ogłosił sezonowe przerwy, np. przy zagrożeniu pożarowym jak Bát Xát w kwietniu albo przy sztormach (13.10.2026 żadnej z 2026 r. nie znaleziono);
  - czy nocleg na 2800 m to dziś namioty, czy dom;
```

na:

```markdown
  - aktualna opłata parku Hoàng Liên za wejście i procedura zezwolenia (oficjalnego cennika z 2026 nie znalazłem, a 150 000 VND jest z 2015). Sprawdzone 14.10.2026: opłaty na 2026 dalej nie ma (SP-2026-10-14c†, SP-2026-10-14d†), a procedura jest bez zmian (SP-2026-10-14a; „Trudny dzień”, „Miesiące wyłączone”);
  - czy park ogłosił sezonowe przerwy, np. przy zagrożeniu pożarowym jak Bát Xát w kwietniu albo przy sztormach (13.10.2026 żadnej z 2026 r. nie znaleziono). Sprawdzone 14.10.2026: dalej żadnej (SP-BLC260415, SP-BLC260727);
  - czy nocleg na 2800 m to dziś namioty, czy dom. Sprawdzone 14.10.2026: jedno i drugie, bo na 2800 m są pole namiotowe i wspólna chata, a wybór zależy od biura (SP-2026-10-14a, SP-2026-10-14b);
```

W `research/sapa-2026-10.md` zamień:

```markdown
  - cena (800 000 czy 850 000 VND, dzień powszedni i weekend) i godzina pierwszego wagonika: 7:30 (SP-SW, SP-VT-FAN) albo 8:00 w dni inne niż sobota (SP-TTN251225);
  - terminy przeglądów w roku podróży (w 2025: 24.11–15.12; w 2026: 21–27.9, potwierdzone, F-KOL-1; terminu zimą 2026/2027 13.10.2026 nie znaleziono).
- **Opłaty w wioskach:** bilet do Cát Cát (70 000 czy 150 000 VND) i czy w dolinie Lao Chải – Tả Van pobiera się opłatę.
```

na:

```markdown
  - cena (800 000 czy 850 000 VND, dzień powszedni i weekend) i godzina pierwszego wagonika: 7:30 (SP-SW, SP-VT-FAN) albo 8:00 w dni inne niż sobota (SP-TTN251225). Sprawdzone 14.10.2026: cena publikowana na 2026 to 850 000 VND za dorosłego w obie strony i 550 000 VND za dziecko 1–1,4 m, w święta z dopłatą 50 000–100 000 VND, a 800 000 VND w dni robocze podaje tylko jeden blog (SP-2026-10-14f, SP-2026-10-14h). Od 4.3.2026 pierwszy wjazd jest o 7:30 w sobotę i niedzielę, a o 8:00 w inne dni; ostatni o 14:30 albo 15:30, zależnie od dnia (SP-2026-10-14f, SP-2026-10-14g; „Plany dni”, o 3). Kwota `sapa.cablecar` w zestawieniu zostaje (decyzja z 14.10.2026);
  - terminy przeglądów w roku podróży (w 2025: 24.11–15.12; w 2026: 21–27.9, potwierdzone, F-KOL-1; terminu zimą 2026/2027 13.10.2026 nie znaleziono). Sprawdzone 14.10.2026: najnowszy komunikat na oficjalnej stronie to wznowienie 28.9.2026 po przeglądzie 21–27.9, a przerwy na zimę 2026/2027 nie ogłoszono (SP-2026-10-14e).
- **Opłaty w wioskach:** bilet do Cát Cát (70 000 czy 150 000 VND) i czy w dolinie Lao Chải – Tả Van pobiera się opłatę. Sprawdzone 14.10.2026: Cát Cát 150 000 VND za dorosłego, a 70 000 VND to bilet dziecięcy; w dolinie Lao Chải – Tả Van 75 000 VND za dorosłego według prasy z 2023 i przewodników, bez urzędowej stawki na 2026 („Bezpieczeństwo i przepisy”, „Opłaty za wstęp”). Kwota `sapa.catcat` w zestawieniu zostaje (decyzja z 14.10.2026).
```

W `research/sapa-2026-10.md` zamień:

```markdown
- **Opłaty:** obowiązująca w 2026 opłata parku za Fansipan i opłata za wstęp do doliny Lao Chải – Tả Van.
```

na:

```markdown
- **Opłaty:** obowiązująca w 2026 opłata parku za Fansipan i opłata za wstęp do doliny Lao Chải – Tả Van. Sprawdzenie 14.10.2026: opłaty parku dalej nie ma (uchwała 17/2025/NQ-HĐND się nie otworzyła, SP-2026-10-14d†); za dolinę prasa z 2023 i przewodniki podają 75 000 VND, ale urzędowej stawki na 2026 nie znalazłem (SP-2026-10-14i).
```

W `research/sapa-2026-10.md` zamień:

```markdown
| MOTO | kontrole policji wobec cudzoziemców m.in. w Sa Pa (za VT-LEGAL) | `research/motocykl-2026-10.md` | własne obliczenie (notatka projektu) | 12.10.2026 |
```

na:

```markdown
| MOTO | kontrole policji wobec cudzoziemców m.in. w Sa Pa (za VT-LEGAL) | `research/motocykl-2026-10.md` | własne obliczenie (notatka projektu) | 12.10.2026 |

### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów „Do sprawdzenia przed publikacją (etap 4)”: WebSearch i WebFetch 14.10.2026, bez zapisywania stron. † jak w „Jak czytać”: treść znana tylko z wyników wyszukiwania.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| SP-2026-10-14a | Fly Sapa, przewodnik po wejściu na Fansipan: zgłoszenie w parku przez przewodnika albo biuro z licencją, zwykle 1–2 dni wcześniej; 2 dni 2,85–4 mln VND, 1 dzień 1,5–2,5 mln VND; nocleg w prostej chacie z materacami i śpiworami; trasy z Cát Cát i Sín Chải zamknięte albo rzadkie; o przerwach w 2026 nic, opłaty parku brak | https://www.flysapa.com/en/post/fansipan-trekking-guide | blog | ok. 10.10.2026 (strona: 4 dni temu) |
| SP-2026-10-14b | Bookatrekking: pole namiotowe na 2800 m na szlaku na Fansipan; osobno wymieniona wspólna chata na 2800 m | https://bookatrekking.com/en/accommodation/fansipan-campsite-2800-m/ | operator (platforma) | brak (© 2026) |
| SP-2026-10-14c† | Decyzja 56/2014/QĐ-UBND Lào Cai: trasa na Fansipan 150 000 VND za osobę, opłatę pobiera park; według bazy aktów decyzja nie obowiązuje od 2019 r. (z wyników wyszukiwania) | https://vbpl.moj.gov.vn/TW/Lists/vbpq/Attachments/37171/QD%2056-2014.doc ; https://caselaw.vn/van-ban-phap-luat/161436-quyet-dinh-so-56-2014-qd-ubnd-ngay-29-09-2014-ve-thu-phi-tham-quan-danh-lam-thang-canh-sa-pa-tinh-lao-cai-van-ban-het-hieu-luc | urzędowe | 29.9.2014 |
| SP-2026-10-14d† | Uchwała 17/2025/NQ-HĐND Lào Cai o opłatach i daninach, 9.12.2025 (z wyników wyszukiwania; thuvienphapluat zwraca 403, vbpl.vn ładuje treść w JavaScripcie) | https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Nghi-quyet-17-2025-NQ-HDND-quy-dinh-phi-le-phi-Lao-Cai-685553.aspx ; https://vbpl.vn/laocai/Pages/vbpq-toanvan.aspx?ItemID=184780 | urzędowe | 9.12.2025 |
| SP-2026-10-14e | Sun World, strona parku Fansipan Legend (ta sama co SP-SW): otwarte 7:30–17:00, godziny mogą się zmienić; komunikat o wznowieniu kolejki od 28.9 po planowym przeglądzie; komunikatów na XI–XII 2026 i zimę brak; cen brak | https://sunworld.vn/vi/fansipan | operator | odczyt 14.10.2026, komunikat 28.9.2026 |
| SP-2026-10-14f | La Bàn Travel (agent sprzedaży Sun World): cennik publikowany na 1.1–31.12.2026, dorosły 850 000 VND, dziecko 550 000 VND, w święta dopłata 50 000–100 000 VND; godziny od 4.3.2026 według dni tygodnia; o przeglądach nic | https://vesunworldfansipan.com/ve-cap-treo-fansipan/ | operator | brak (cennik na 2026, godziny od 4.3.2026) |
| SP-2026-10-14g | Sun Paradise Land (serwis z logo grupy Sun): te same okna wjazdu i godziny ostatniego zjazdu co SP-2026-10-14f; cen i przeglądów brak | https://sunparadiseland.com/SunParadiseLandSaPa/tin-tuc/gio-van-hanh-cap-treo-fansipan-2026-va-lich-tham-quan-1-ngay-25767 | operator | 18.8.2026 |
| SP-2026-10-14h | Blog Vexere: dorosły 800 000 VND w dni robocze i popołudniami w weekend, 850 000 VND w sobotę rano i w święta, dziecko 550 000 VND; w weekend i święta wjazd 7:30–15:30, ostatni zjazd 17:00–19:00 | https://blog.vexere.com/cap-treo-fansipan/ | blog | 22.4.2026 |
| SP-2026-10-14i | CafeBiz: ceny biletów w Sa Pa, Cát Cát dorosły 150 000 VND, dziecko 70 000 VND; Lao Chải – Tả Van dorosły 75 000 VND, dziecko 50 000 VND | https://cafebiz.vn/cap-nhat-bang-gia-ve-tham-quan-cac-diem-du-lich-sa-pa-17623072510043089.chn | prasa | 25.7.2023 |
| SP-2026-10-14j† | Vietnam Airlines, przewodnik po Cát Cát: dorosły 150 000 VND, dziecko 1–1,4 m 70 000 VND; przy bramie 2 wózek elektryczny 10 000 VND za kurs (z wyników wyszukiwania; strona zwraca 404) | https://www.vietnamairlines.com/at/vi/plan-book/travel/travel-guide/cat-cat-village | operator | brak |
| SP-2026-10-14k† | Vietnam Airlines, atrakcje Sa Pa: Lao Chải i Tả Van ok. 75 000 VND dorosły, 50 000 VND dziecko (z wyników wyszukiwania; strona zwraca 404) | https://www.vietnamairlines.com/en/useful-information/travel-guide/sapa-attractions | operator | brak |
| SP-2026-10-14l | Wikivoyage, Sa Pa (ta sama strona co SP-WV): w opisie Cát Cát 70 000 VND (dzieci do 10 lat 30 000 VND) z dopiskiem o aktualizacji z VIII 2024; w innym miejscu Cát Cát 150 000 VND i wioski poza Cát Cát bez opłat | https://en.wikivoyage.org/wiki/Sa_Pa | encyklopedia | odczyt 14.10.2026 |
| SP-2026-10-14m | AZ Tour, ceny w Sa Pa: Cát Cát 150 000 VND, dziecko 80 000 VND; Lao Chải – Tả Van 75 000 i 50 000 VND (tabela nieczytelna); kolejka 850 000 i 550 000 VND, dla mieszkańców sześciu prowincji północnego zachodu 300 000 VND | https://dulichsapa.org.vn/cam-nang/cap-nhat-gia-ve-tham-quan-cac-diem-du-lich-sapa-moi-nhat/ | operator | brak (© 2024) |
| SP-2026-10-14n | Expatolife: bilet do Tả Van 75 000 VND za dorosłego; kontrola przy bramie luźna, w południe i w złą pogodę często nikt nie sprawdza | https://www.expatolife.com/lao-chai-ta-van-sapa-vietnam | blog | 27.10.2022 |
```

W `research/wjazd-2026-10.md` zamień:

```markdown
**Do czego:** dane dla planu 2B, do części „Wjazd i zdrowie” w sekcji „Przed wyjazdem”. Zakres: dni bez wizy, ważność paszportu, ubezpieczenie, lekarz medycyny podróży, komary i malaria oraz inne formalności przy wjeździe. Strona układa wyjazdy na 5–30 dni, z terminami do 2030 r., więc liczy się też data końca zwolnienia z wiz. Adresy otwarto 11.10.2026 (poza oznaczonymi †, zob. „Jak czytać”), a późniejsze zmiany nie są uwzględnione.
```

na:

```markdown
**Do czego:** dane dla planu 2B, do części „Wjazd i zdrowie” w sekcji „Przed wyjazdem”. Zakres: dni bez wizy, ważność paszportu, ubezpieczenie, lekarz medycyny podróży, komary i malaria oraz inne formalności przy wjeździe. Strona układa wyjazdy na 5–30 dni, z terminami do 2030 r., więc liczy się też data końca zwolnienia z wiz. Adresy otwarto 11.10.2026 (poza oznaczonymi †, zob. „Jak czytać”), a późniejsze zmiany nie są uwzględnione. Wyjątek to sprawdzenie przed publikacją z 14.10.2026 (etykiety WJ-2026-10-14…, sekcja „Źródła”): deklaracja zdrowotna, karta przylotu, ostrzeżenia przed fałszywymi stronami, poziom i uwagi MSZ oraz odpowiedzi na listę „Do sprawdzenia przed publikacją (etap 4)”.
```

W `research/wjazd-2026-10.md` zamień:

```markdown
  - **Poziomu ostrzeżenia MSZ nie udało się ustalić.** Profil Wietnamu jest teraz w nowym Odyseuszu, a narzędzie widzi z tej strony tylko tytuł.
```

na:

```markdown
  - **Poziom ostrzeżenia MSZ: 1, zwykła ostrożność** (profil Wietnamu w Odyseuszu, odczytany ręcznie w przeglądarce 14.10.2026, bo narzędzie widzi z niego tylko tytuł). MSZ odradza samodzielne podróże motocyklem, ale strona tej rady celowo nie cytuje (decyzja z 14.10.2026).
```

W `research/wjazd-2026-10.md` zamień:

```markdown
  - **Strona MSZ „Informacje dla podróżujących” nie dała się odczytać.** MSZ przeniosło profile państw do nowego systemu Odyseusz (PL-AMB-ody). Stary adres gov.pl/web/dyplomacja/wietnam prowadzi teraz na stronę główną gov.pl. Adres gov.pl/web/wietnam/informacje-dla-podrozujacych prowadzi na odyseusz.gov.pl/VN, a to aplikacja w JavaScripcie, z której narzędzie widzi tylko tytuł (PL-MSZ-VN). Zdania „MSZ” w tym pliku pochodzą więc ze stron Ambasady RP w Hanoi.
```

na:

```markdown
  - **Strona MSZ „Informacje dla podróżujących” nie dała się odczytać.** MSZ przeniosło profile państw do nowego systemu Odyseusz (PL-AMB-ody). Stary adres gov.pl/web/dyplomacja/wietnam prowadzi teraz na stronę główną gov.pl. Adres gov.pl/web/wietnam/informacje-dla-podrozujacych prowadzi na odyseusz.gov.pl/VN, a to aplikacja w JavaScripcie, z której narzędzie widzi tylko tytuł (PL-MSZ-VN). Zdania „MSZ” w tym pliku pochodzą więc ze stron Ambasady RP w Hanoi. 14.10.2026 profil Wietnamu odczytano ręcznie w przeglądarce (WJ-2026-10-14p), więc poziom i uwagi w sekcji „Bezpieczeństwo (MSZ RP)” pochodzą już z samego Odyseusza.
```

W `research/wjazd-2026-10.md` zamień:

```markdown
  - Urzędowego ostrzeżenia przed fałszywymi stronami pośredników nie znalazłem; FCDO też go nie ma (UK-FCDO).
```

na:

```markdown
  - Urzędowego ostrzeżenia przed fałszywymi stronami pośredników 11.10.2026 nie znalazłem; FCDO też go nie ma (UK-FCDO).
  - **Sprawdzenie 14.10.2026: ostrzeżenia urzędowe są.** Agencja VNA (26.7.2026) przytacza oficera wydziału do walki z cyberprzestępczością Ministerstwa Bezpieczeństwa Publicznego: fałszywe strony wizowe naśladują portal urzędu, mają mylące domeny, kupują reklamy i obiecują ekspresowe wizy, a władze każą składać wnioski tylko na rządowych portalach w domenie .gov.vn (evisa.gov.vn, thithucdientu.gov.vn) i zgłaszać oszustwa policji (WJ-2026-10-14i). To samo ministerstwo ostrzega przed fałszywymi stronami karty przylotu, które wyłudzają pieniądze z kart płatniczych (WJ-2026-10-14c). FCDO o fałszywych stronach dalej nie pisze (WJ-2026-10-14a).
```

W `research/wjazd-2026-10.md` zamień:

```markdown
- **Meldunek:**
```

na:

```markdown
- **E-papierosy i podgrzewany tytoń** (sprawdzenie 14.10.2026): według MSZ RP są w Wietnamie nielegalne, a za ich przywóz, sprzedaż i używanie grożą kary i konfiskata (WJ-2026-10-14p). Wcześniejsze wzmianki Itaki i Vietcetery są w sekcji „Poza zakresem”.
- **Meldunek:**
```

W `research/wjazd-2026-10.md` zamień:

```markdown
- **Deklaracja zdrowotna:** FCDO pisze, że „od 1 lipca” podróżni do Wietnamu i w tranzycie mogą musieć wypełnić deklarację zdrowotną, czasem z dowodem szczepień, i odsyła do ambasady Wietnamu (UK-FCDO). Roku nie podaje. Wietnamskiego źródła nie znalazłem. Do sprawdzenia przed publikacją.
```

na:

```markdown
  - **Sprawdzenie 14.10.2026:** karta to system PAI urzędu imigracyjnego, w pilotażu na Tân Sơn Nhất od 15.4.2026 i na Phú Quốc od 1.6.2026. Źródła urzędowe się różnią: Ministerstwo Bezpieczeństwa Publicznego pisało w maju 2026, że karta nie jest jeszcze obowiązkowa i że system obejmie kolejne lotniska (WJ-2026-10-14c, WJ-2026-10-14d), a komunikat policji granicznej Tân Sơn Nhất (nr 1474/CACK TSN) nazywa ją obowiązkową dla cudzoziemców, poza tranzytem (WJ-2026-10-14e). Na Phú Quốc Dân trí pisze o zachęcie, a CafeF o obowiązku (WJ-2026-10-14f, WJ-2026-10-14g†). O Nội Bài i Đà Nẵng od czerwca 2026 piszą ambasada USA i strony komercyjne, a urzędu wietnamskiego nie znalazłem (WJ-2026-10-14h†). FCDO dalej pisze, że karta nie jest obowiązkowa (WJ-2026-10-14a). Kartę wypełnia się bezpłatnie, w ciągu 3 dni przed wjazdem, tylko na prearrival.immigration.gov.vn, a ministerstwo ostrzega przed fałszywymi stronami (WJ-2026-10-14c).
- **Deklaracja zdrowotna:** FCDO pisze, że „od 1 lipca” podróżni do Wietnamu i w tranzycie mogą musieć wypełnić deklarację zdrowotną, czasem z dowodem szczepień, i odsyła do ambasady Wietnamu (UK-FCDO). Roku nie podaje. 11.10.2026 wietnamskiego źródła nie znalazłem.
  - **Sprawdzenie 14.10.2026:** lipiec, o którym pisze FCDO, to 1.7.2026. Dekret 165/2026/NĐ-CP z 15.5.2026, wykonawczy do ustawy o zapobieganiu chorobom, w art. 22 ust. 2 pozwala żądać deklaracji zdrowotnej, elektronicznie albo na papierze, po wietnamsku i angielsku, w ciągu 7 dni przed wjazdem, wyjazdem albo tranzytem, ale tylko wtedy, gdy minister zdrowia zarządzi ją dla konkretnej choroby i grupy podróżnych. Ministerstwo zdrowia zaprzecza, że to stały obowiązek dla wszystkich, buduje własny system i nie używa strony tokhaiyte.vn (WJ-2026-10-14b). Takiego zarządzenia do 14.10.2026 nie znalazłem.
```

W `research/wjazd-2026-10.md` zamień:

```markdown
- **Poziom ostrzeżenia MSZ: nie ustalono.** System Odyseusz pokazuje go w profilu państwa (PL-AMB-ody), ale profil Wietnamu (odyseusz.gov.pl/VN) jest nieczytelny dla narzędzia (PL-MSZ-VN). W wynikach wyszukiwania poziomu też nie było. Trzeba go sprawdzić ręcznie w przeglądarce.
```

na:

```markdown
- **Poziom ostrzeżenia MSZ: 1, zwykła ostrożność** (sprawdzone 14.10.2026). System Odyseusz pokazuje go w profilu państwa (PL-AMB-ody). Profil Wietnamu (odyseusz.gov.pl/VN, aktualizacja strony 30.6.2026) odczytano ręcznie w przeglądarce, bo narzędzie widzi z niego tylko tytuł (WJ-2026-10-14p, WJ-2026-10-14l). 11.10.2026 poziomu nie ustalono (PL-MSZ-VN).
- **Uwagi MSZ w Odyseuszu** (WJ-2026-10-14p):
  - bezpieczeństwo: „Odradzamy samodzielne podróżowanie motocyklem z uwagi na niebezpieczne warunki drogowe, zwłaszcza poza największymi ośrodkami”; w pełnym tekście MSZ odradza samodzielne podróże motocyklowe po Wietnamie;
  - podróżowanie: paszport ważny co najmniej 6 miesięcy po zakończeniu pobytu (zgadza się to z wnioskiem w „Paszport”: liczyć od dnia powrotu), dowód osobisty nie wystarcza; obywatele Polski mogą być w Wietnamie bez wizy 45 dni, a na dłuższy pobyt potrzebna jest e-wiza; Wietnam nie uznaje polskiego prawa jazdy, a międzynarodowe może nie wystarczyć, zwłaszcza na motocykl i skuter; część obszarów jest zamknięta dla turystów;
  - prawo i obyczaje: e-papierosy i podgrzewany tytoń są nielegalne, a za ich przywóz, sprzedaż i używanie grożą kary i konfiskata; drony wymagają zezwolenia; nie wolno fotografować obiektów wojskowych i rządowych.
  - Inne uwagi znam tylko z indeksu wyszukiwarki: kradzieże w dużych miastach (kieszonkowcy, wyrywanie torebek z motocykli, bankomaty), tajfuny w drugiej połowie roku w centrum i na południu, surowe kary za narkotyki, z karą śmierci włącznie, i rada, by korzystać z licencjonowanych biur i przewodników (WJ-2026-10-14m†).
- **Decyzja z 14.10.2026:** przełącznik motocykla „Z kierowcą / Samodzielnie” zostaje bez zmian, a strona celowo nie cytuje rady MSZ o motocyklu w ramce „Samodzielnie” (zapisane też w `research/motocykl-2026-10.md`).
```

W `research/wjazd-2026-10.md` zamień:

```markdown
- **Ruch drogowy i tajfuny:** czytane strony MSZ nic o nich nie mówią. Poza MSZ: FCDO podaje sezon burz tropikalnych od maja do listopada (UK-FCDO, 21.9.2026), a szczegóły dla regionów są w `research/sezony-2026-10.md` (SEZ).
- **Rejestracja podróży:** MSZ zachęca do rejestracji w Odyseuszu. Logowanie przez mObywatel, profil zaufany, e-dowód albo bank (PL-AMB-ody).
```

na:

```markdown
- **Ruch drogowy i tajfuny:** strony Ambasady RP czytane 11.10.2026 nic o nich nie mówią. Profil w Odyseuszu odradza samodzielną jazdę motocyklem z powodu warunków drogowych (wyżej), a tajfuny wymienia według indeksu wyszukiwarki (WJ-2026-10-14m†). Poza MSZ: FCDO podaje sezon burz tropikalnych od maja do listopada (UK-FCDO, 21.9.2026), a szczegóły dla regionów są w `research/sezony-2026-10.md` (SEZ).
- **Rejestracja podróży:** MSZ zachęca do rejestracji w Odyseuszu. Logowanie przez mObywatel, profil zaufany, e-dowód albo bank (PL-AMB-ody).
- **Wiadomości Ambasady RP w Hanoi** (sprawdzone 14.10.2026): najnowsze są z 24.6, 3.8, 24.9 i 30.9.2026 i nic nie mówią o wizach, karcie przylotu, deklaracji zdrowotnej ani fałszywych stronach (WJ-2026-10-14n).
```

W `research/wjazd-2026-10.md` zamień:

```markdown
- **E-papierosy:** Itaka pisze o zakazie używania e-papierosów w Wietnamie. Urządzenia, także do podgrzewania tytoniu, mogą zostać zabrane przy kontroli przed lotem krajowym albo przy wyjeździe (ITAKA). Vietcetera: od marca 2026 zakazana jest działalność gospodarcza z e-papierosami i podgrzewanym tytoniem (VC-2026). Tekstu urzędowego nie czytałem.
```

na:

```markdown
- **E-papierosy:** Itaka pisze o zakazie używania e-papierosów w Wietnamie. Urządzenia, także do podgrzewania tytoniu, mogą zostać zabrane przy kontroli przed lotem krajowym albo przy wyjeździe (ITAKA). Vietcetera: od marca 2026 zakazana jest działalność gospodarcza z e-papierosami i podgrzewanym tytoniem (VC-2026). Tekstu urzędowego nie czytałem. Od 14.10.2026 to już nie poza zakresem: według MSZ RP e-papierosy i podgrzewany tytoń są w Wietnamie nielegalne (WJ-2026-10-14p), a strona dostaje o tym jedno zdanie (decyzja z 14.10.2026; „Inne formalności przy wjeździe”, „Co powiedzieć na stronie”, pkt 14).
```

W `research/wjazd-2026-10.md` zamień:

```markdown
1. Poziom ostrzeżenia i uwagi MSZ w profilu Wietnamu w Odyseuszu (ręcznie, w przeglądarce).
2. Czy rząd Wietnamu przedłużył albo zastąpił uchwałę 229/NQ-CP (np. „miễn thị thực Ba Lan”, „Nghị quyết miễn thị thực” z bieżącym rokiem).
3. Deklaracja zdrowotna „od 1 lipca” według FCDO: rok, kogo dotyczy, wietnamska podstawa prawna.
4. Karta przylotu na Tân Sơn Nhất: nadal dobrowolna czy już obowiązkowa, i czy objęła inne lotniska.
5. Próg gotówki w akcie wietnamskim zamiast tylko w FCDO.
6. Urzędowe ostrzeżenie przed fałszywymi stronami e-wiz (urząd imigracyjny, MSZ RP).
7. Zmiana ustawy o wjeździe cudzoziemców z 2025 r. (wizy UD od 1.7.2026, VC-2026): czy zmieniła coś dla turystów, np. ważność paszportu albo 45 dni.
8. WHO: lista „Vaccination requirements and recommendations for international travellers; and malaria situation per country”, wydanie z 2022 r. To PDF, którego nie czytałem (WHO-ITH).
```

na:

```markdown
1. Poziom ostrzeżenia i uwagi MSZ w profilu Wietnamu w Odyseuszu (ręcznie, w przeglądarce). Sprawdzone 14.10.2026: poziom 1, zwykła ostrożność; MSZ odradza samodzielne podróże motocyklem, a pozostałe uwagi są w sekcji „Bezpieczeństwo (MSZ RP)” (WJ-2026-10-14p).
2. Czy rząd Wietnamu przedłużył albo zastąpił uchwałę 229/NQ-CP (np. „miễn thị thực Ba Lan”, „Nghị quyết miễn thị thực” z bieżącym rokiem). Sprawdzone 14.10.2026: nie. Takiej uchwały nie znalazłem; najnowsza uchwała wizowa, 325/NQ-CP z 12.10.2026, dotyczy grup turystów z Chin lecących do Cam Ranh (WJ-2026-10-14k†). FCDO i MSZ RP dalej piszą o 45 dniach bez wizy (WJ-2026-10-14a, WJ-2026-10-14p).
3. Deklaracja zdrowotna „od 1 lipca” według FCDO: rok, kogo dotyczy, wietnamska podstawa prawna. Sprawdzone 14.10.2026: chodzi o 1.7.2026 i dekret 165/2026/NĐ-CP; deklaracja jest potrzebna tylko wtedy, gdy minister zdrowia zarządzi ją dla konkretnej choroby i grupy podróżnych, a takiego zarządzenia do 14.10.2026 nie znalazłem (WJ-2026-10-14b; „Inne formalności przy wjeździe”).
4. Karta przylotu na Tân Sơn Nhất: nadal dobrowolna czy już obowiązkowa, i czy objęła inne lotniska. Sprawdzone 14.10.2026: źródła urzędowe się różnią: ministerstwo nazywa kartę nieobowiązkową (WJ-2026-10-14c, WJ-2026-10-14d), a komunikat policji granicznej Tân Sơn Nhất obowiązkową (WJ-2026-10-14e). Od 1.6.2026 pilotaż obejmuje też Phú Quốc (WJ-2026-10-14f); o Nội Bài i Đà Nẵng piszą tylko ambasada USA i strony komercyjne (WJ-2026-10-14h†). Strona każe kartę wypełnić przed lotem („Co powiedzieć na stronie”, pkt 12).
6. Urzędowe ostrzeżenie przed fałszywymi stronami e-wiz (urząd imigracyjny, MSZ RP). Sprawdzone 14.10.2026: są ostrzeżenia wietnamskie: policja w VNA o fałszywych stronach wizowych (WJ-2026-10-14i) i Ministerstwo Bezpieczeństwa Publicznego o fałszywych stronach karty przylotu (WJ-2026-10-14c). W wiadomościach Ambasady RP w Hanoi nic o tym nie ma (WJ-2026-10-14n).
7. Zmiana ustawy o wjeździe cudzoziemców z 2025 r. (wizy UD od 1.7.2026, VC-2026): czy zmieniła coś dla turystów, np. ważność paszportu albo 45 dni. Sprawdzone 14.10.2026: zmiany dla turystów nie znalazłem. Ustawa 118/2025/QH15, w mocy od 1.7.2026 (WJ-2026-10-14o†), dodaje wizy UĐ1 i UĐ2, wizy do 5 lat dla wybranych grup i karty pobytu do 10 lat, a o 45 dniach, e-wizie, paszporcie i deklaracjach omówienie nic nie mówi (WJ-2026-10-14j).

**Zostaje do sprawdzenia:**

- próg gotówki w akcie wietnamskim zamiast tylko w FCDO (dawny pkt 5, 14.10.2026 niesprawdzany);
- WHO: lista „Vaccination requirements and recommendations for international travellers; and malaria situation per country”, wydanie z 2022 r. To PDF, którego nie czytałem (WHO-ITH; dawny pkt 8, 14.10.2026 niesprawdzany);
- tuż przed publikacją jeszcze raz: czy minister zdrowia zarządził deklarację zdrowotną dla jakiejś choroby i czy karta przylotu stała się obowiązkowa albo objęła kolejne lotniska (z pkt 3 i 4).
```

W `research/wjazd-2026-10.md` zamień:

```markdown
12. **Karta przylotu** (gdy trasa zaczyna się albo kończy w Hồ Chí Minh City): „Lecisz na Tân Sơn Nhất? Wietnam zachęca, by w ciągu 3 dni przed lądowaniem wypełnić kartę przylotu na prearrival.immigration.gov.vn. Nie jest obowiązkowa.” (UK-FCDO, VN-PRE, RPL)
13. **MSZ:** „Zarejestruj podróż w Odyseuszu MSZ i sprawdź tam aktualne ostrzeżenia dla Wietnamu.” (PL-AMB-ody)
14. **Linijka źródeł na stronie:** „Źródła: rząd Wietnamu (uchwała 229/NQ-CP), Ambasada RP w Hanoi, GIS; sprawdzone 11.10.2026.”
```

na:

```markdown
12. **Karta przylotu** (zawsze, bo lotniska wprowadzają ją po kolei, a Phú Quốc nie jest lotniskiem przylotu z zagranicy na stronie): „Karta przylotu: Wietnam wprowadza ją na kolejnych lotniskach, a na Tân Sơn Nhất (Hồ Chí Minh City) od kwietnia 2026. Wypełnia się ją w ciągu 3 dni przed lotem, bezpłatnie i tylko na stronie urzędu imigracyjnego prearrival.immigration.gov.vn.” (WJ-2026-10-14c, WJ-2026-10-14d, WJ-2026-10-14e, WJ-2026-10-14f, VN-PRE)
   - Poprawione 14.10.2026 (decyzja z tego dnia): dawne zdanie mówiło za FCDO, że karta „nie jest obowiązkowa”, a komunikat policji granicznej Tân Sơn Nhất nazywa ją obowiązkową (WJ-2026-10-14e). Pilotaż działa na Tân Sơn Nhất od 15.4.2026 i na Phú Quốc od 1.6.2026 (sekcja „Inne formalności przy wjeździe”).
13. **E-wiza tylko na stronach rządu** (zawsze; decyzja z 14.10.2026): „E-wiza: jeśli jej potrzebujesz, złóż wniosek tylko na rządowej stronie evisa.gov.vn. W sieci są fałszywe strony, które się pod nią podszywają.” (WJ-2026-10-14i, VN-XNC-dom)
14. **E-papierosy** (zawsze; decyzja z 14.10.2026): „E-papierosy: razem z podgrzewanym tytoniem są w Wietnamie nielegalne, a za ich przywóz i używanie grożą kary i konfiskata, więc zostaw je w domu.” (WJ-2026-10-14p)
15. **MSZ:** „Zarejestruj podróż w Odyseuszu MSZ i sprawdź tam aktualne ostrzeżenia dla Wietnamu.” (PL-AMB-ody)
16. **Linijka źródeł na stronie:** „Źródła: rząd Wietnamu (uchwała 229/NQ-CP), Ambasada RP w Hanoi, GIS; sprawdzone 11.10.2026.”
```

W `research/wjazd-2026-10.md` zamień:

```markdown
| msz_poziom | Nie ustalono, bo profil Wietnamu w Odyseuszu jest nieczytelny dla narzędzia. | PL-MSZ-VN, PL-AMB-ody | nie odczytano; 3.8.2026 |
```

na:

```markdown
| msz_poziom | Poziom 1, zwykła ostrożność, z radą, by nie podróżować samodzielnie motocyklem (profil w Odyseuszu odczytany ręcznie w przeglądarce 14.10.2026). | WJ-2026-10-14p | 30.6.2026 |
```

W `research/wjazd-2026-10.md` zamień:

```markdown
### Własne
```

na:

```markdown
### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie listy „Do sprawdzenia przed publikacją (etap 4)”: WebSearch i WebFetch 14.10.2026, bez zapisywania stron; profil MSZ w Odyseuszu (WJ-2026-10-14p) odczytano ręcznie w przeglądarce. † oznacza treść znaną tylko z wyników wyszukiwania (strona nie otworzyła się dla narzędzia albo jej nie otwierałem).

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| WJ-2026-10-14a | FCDO: 45 dni bez wizy; deklaracja zdrowotna „od 1 lipca” bez roku, z odesłaniem do ambasady Wietnamu; karta przylotu na Tân Sơn Nhất od 15.4.2026 dobrowolna, może się to zmienić albo objąć inne lotniska; paszport 6 miesięcy od przyjazdu i 2 wolne strony; o fałszywych stronach nic. Ostatnia aktualizacja porad 21.9.2026. | https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements ; https://www.gov.uk/foreign-travel-advice/vietnam | urzędowe (Wielka Brytania) | 21.9.2026 (odczyt 14.10.2026) |
| WJ-2026-10-14b | Báo Chính phủ: ministerstwo zdrowia o deklaracji zdrowotnej od 1.7: dekret 165/2026/NĐ-CP z 15.5.2026, art. 22 ust. 2; nie jest stałym obowiązkiem dla wszystkich, minister decyduje dla każdej choroby, kogo i kiedy dotyczy; 7 dni przed przekroczeniem granicy, elektronicznie albo na papierze, po wietnamsku i angielsku; ministerstwo nie używa tokhaiyte.vn i zapowiada własny system. | https://baochinhphu.vn/bo-y-te-thong-tin-quy-dinh-khai-bao-y-te-khi-xuat-nhap-canh-tu-ngay-mai-1-7-102260630155814001.htm | urzędowe (dziennik rządu) | 30.6.2026 |
| WJ-2026-10-14c | Ministerstwo Bezpieczeństwa Publicznego o PAI: pilotaż na Tân Sơn Nhất 15–30.4.2026, jeszcze nieobowiązkowy, w ciągu 3 dni przed wjazdem, potem kolejne lotniska i rozważane przejścia lądowe; wykryto fałszywe strony wyłudzające pieniądze z kart, korzystać tylko z oficjalnego adresu. | https://bocongan.gov.vn/bai-viet/cuc-quan-ly-xuat-nhap-canh-trien-khai-he-thong-cung-cap-thong-tin-truoc-chuyen-di-pai-1778469461 | urzędowe (ministerstwo) | 11.5.2026 |
| WJ-2026-10-14d | To samo ministerstwo po angielsku: system dobrowolny dla podróżnych lotniczych, rozszerzenie na cały kraj po pilotażu, ostrzeżenie przed fałszywymi stronami. | https://en.bocongan.gov.vn/article/immigration-department-launches-pre-arrival-information-system-1778670404 | urzędowe (ministerstwo) | 13.5.2026 |
| WJ-2026-10-14e | Konsulat Singapuru w HCMC za komunikatem policji granicznej Tân Sơn Nhất (nr 1474/CACK TSN): deklaracja przed przylotem obowiązkowa dla cudzoziemców i Wietnamczyków z zagranicy na wizie; tranzyt zwolniony; brak deklaracji może wydłużyć odprawę. | https://hochiminhcity.mfa.gov.sg/mission-updates/tan-son-nhat-airport-introduces-pre-arrival-declaration-for-foreigners/ | urzędowe (Singapur) | 20.4.2026 (strona aktualizowana 28.9.2026) |
| WJ-2026-10-14f | Dân trí: Phú Quốc, pilotaż PAI od 1.6.2026, policja graniczna zachęca do deklaracji; inne lotniska poza Tân Sơn Nhất nie są wymienione. | https://dantri.com.vn/du-lich/khach-nhap-canh-phu-quoc-duoc-khuyen-khich-khai-bao-thong-tin-tai-san-bay-20260601201819646.htm | prasa | 2.6.2026 |
| WJ-2026-10-14g† | CafeF: od 1.6.2026 obowiązkowa deklaracja dla przylatujących na Phú Quốc (tylko tytuł i opis z wyników wyszukiwania). | https://cafef.vn/tu-1-6-bat-buoc-khai-bao-thong-tin-doi-voi-khach-nhap-canh-phu-quoc-188260531215759558.chn | prasa | 31.5.2026† |
| WJ-2026-10-14h† | Ambasada USA: komunikat o deklaracji przed przylotem na lotniskach Wietnamu, według wyników wyszukiwania także Hà Nội i Đà Nẵng, do 3 dni przed przylotem (strona zwraca 403). | https://vn.usembassy.gov/notice-implementation-of-pre-arrival-declaration-for-international-visitors-arriving-at-airports-in-vietnam/ | urzędowe (USA) | 17.6.2026† |
| WJ-2026-10-14i | VNA (VietnamPlus): rośnie liczba fałszywych stron wizowych; oficer wydziału do walki z cyberprzestępczością opisuje metody; władze radzą tylko rządowe portale w domenie .gov.vn i zgłaszanie oszustw policji; oficjalne portale evisa.gov.vn i thithucdientu.gov.vn. | https://en.vietnamplus.vn/vietnam-steps-up-e-visa-rollout-to-protect-citizens-international-visitors-post349493.vnp | prasa (agencja państwowa) | 26.7.2026 |
| WJ-2026-10-14j | Quản lý Nhà nước: nowe przepisy o wjeździe cudzoziemców, wizy UĐ1 i UĐ2, wizy do 5 lat dla wybranych grup, karty pobytu do 10 lat, czasowe zwolnienia z wiz dla grup preferowanych; o 45 dniach, e-wizie, paszporcie i deklaracjach nic. | https://www.quanlynhanuoc.vn/2026/08/04/mot-so-diem-moi-cua-phap-luat-ve-nhap-canh-xuat-canh-qua-canh-cu-tru-cua-nguoi-nuoc-ngoai-tai-viet-nam-va-van-de-dat-ra-doi-voi-quan-ly-nha-nuoc/ | prasa (czasopismo) | 4.8.2026 |
| WJ-2026-10-14k† | Uchwała 325/NQ-CP z 12.10.2026: pilotażowe zwolnienie z wiz dla grup turystów z Chin lecących bezpośrednio do Cam Ranh, do 31.12.2027 (tylko wyniki wyszukiwania). | https://baomoi.com/thi-diem-mien-thi-thuc-cho-cong-dan-trung-quoc-di-du-lich-theo-doan-den-khanh-hoa-c56253743.epi | prasa (przedruk z dziennika rządu) | 12.10.2026† |
| WJ-2026-10-14l | Stary adres MSZ prowadzi na stronę główną gov.pl; adres ambasady „informacje dla podróżujących” przekierowuje (302) na odyseusz.gov.pl/VN, gdzie narzędzie widzi tylko tytuł (te same adresy co PL-MSZ-VN). | https://www.gov.pl/web/dyplomacja/wietnam ; https://www.gov.pl/web/wietnam/informacje-dla-podrozujacych ; https://odyseusz.gov.pl/VN | urzędowe (MSZ) | odczyt 14.10.2026 |
| WJ-2026-10-14m† | Profil Wietnamu w Odyseuszu według indeksu wyszukiwarki: poziom 1 (zwykła ostrożność); kradzieże w miastach, odradzane samodzielne podróże motocyklem, tajfuny w drugiej połowie roku, narkotyki, zdjęcia obiektów wojskowych, drony, licencjonowane biura, paszport 6 miesięcy po pobycie, dowód nie wystarcza. | https://odyseusz.gov.pl/VN | urzędowe (MSZ) | brak† |
| WJ-2026-10-14n | Ambasada RP w Hanoi: najnowsze wiadomości z 24.6, 3.8, 24.9 i 30.9.2026; nic o wizach, karcie przylotu, deklaracji zdrowotnej ani fałszywych stronach. | https://www.gov.pl/web/wietnam | urzędowe (MSZ, ambasada) | 30.9.2026 (najnowszy wpis) |
| WJ-2026-10-14o† | Ustawa 118/2025/QH15 zmienia 10 ustaw o bezpieczeństwie i porządku, w tym ustawę o wjeździe cudzoziemców; uchwalona 10.12.2025, w mocy od 1.7.2026 (tylko wyniki wyszukiwania). | https://lsvn.vn/nhung-diem-moi-tai-luat-so-118-2025-qh15-sua-doi-10-luat-ve-an-ninh-trat-tu-a167867.html | prasa | brak† |
| WJ-2026-10-14p | MSZ, profil Wietnamu w Odyseuszu, odczytany ręcznie w przeglądarce: poziom 1 (zwykła ostrożność); odradza samodzielne podróżowanie motocyklem, zwłaszcza poza największymi ośrodkami; paszport ważny co najmniej 6 miesięcy po zakończeniu pobytu, dowód osobisty nie wystarcza; 45 dni bez wizy, na dłuższy pobyt e-wiza; polskiego prawa jazdy Wietnam nie uznaje, a międzynarodowe może nie wystarczyć, zwłaszcza na motocykl i skuter; część obszarów zamknięta dla turystów; e-papierosy i podgrzewany tytoń nielegalne (kary za przywóz, sprzedaż i używanie, konfiskata); drony za zezwoleniem; zakaz zdjęć obiektów wojskowych i rządowych. | https://odyseusz.gov.pl/VN | urzędowe (MSZ) | 30.6.2026 (odczyt w przeglądarce 14.10.2026) |

### Własne
```

W `site2/src/content/hagiang.js` zamień:

```js
    { from: [10, 1], to: [12, 31], t: 'Kwitnie gryka (tam giác mạch): różowe i białe pola na płaskowyżu. Festiwal w Đồng Văn ma co roku inną datę (2025: 29.11, 2026: 6.11); wtedy noclegi i drogi są zatłoczone, a ruch przez Đồng Văn bywa wstrzymany.' }
```

na:

```js
    { from: [10, 1], to: [12, 31], t: 'Kwitnie gryka (tam giác mạch): różowe i białe pola na płaskowyżu. Festiwal w Đồng Văn ma co roku inną datę (2025: 29.11, 2026: 25.10); wtedy noclegi i drogi są zatłoczone, a ruch przez Đồng Văn bywa wstrzymany.' }
```

W `site2/src/page.js` zamień:

```js
   the month's last day, so its latest end is that day plus the trip); passport; insurance, and insurance_moto when
   riding a motorbike yourself; doctor. st: normSettings' result; riding: a swap ridden yourself is on the trip
   (ridesOn); entry: ENTRY. */
```

na:

```js
   the month's last day, so its latest end is that day plus the trip); evisa (the only official e-visa site), passport,
   arrival (the arrival card), vape (e-cigarettes are banned; research/wjazd-2026-10.md, 14.10.2026); insurance, and
   insurance_moto when riding a motorbike yourself; doctor. st: normSettings' result; riding: a swap ridden yourself is on
   the trip (ridesOn); entry: ENTRY. */
```

W `site2/src/page.js` zamień:

```js
  out.push({ code: 'passport', vars: {} }, { code: 'insurance', vars: {} });
```

na:

```js
  out.push({ code: 'evisa', vars: {} }, { code: 'passport', vars: {} }, { code: 'arrival', vars: {} }, { code: 'vape', vars: {} }, { code: 'insurance', vars: {} });
```

W `site2/src/ui.js` zamień:

```js
  'e.passport': 'Paszport: ważny co najmniej 6 miesięcy, najlepiej licząc od dnia powrotu, z dwiema wolnymi stronami.',
```

na:

```js
  'e.evisa': 'E-wiza: jeśli jej potrzebujesz, złóż wniosek tylko na rządowej stronie evisa.gov.vn. W sieci są fałszywe strony, które się pod nią podszywają.',
  'e.passport': 'Paszport: ważny co najmniej 6 miesięcy, najlepiej licząc od dnia powrotu, z dwiema wolnymi stronami.',
  'e.arrival': 'Karta przylotu: Wietnam wprowadza ją na kolejnych lotniskach, a na Tân Sơn Nhất (Hồ Chí Minh City) od kwietnia 2026. Wypełnia się ją w ciągu 3 dni przed lotem, bezpłatnie i tylko na stronie urzędu imigracyjnego prearrival.immigration.gov.vn.',
  'e.vape': 'E-papierosy: razem z podgrzewanym tytoniem są w Wietnamie nielegalne, a za ich przywóz i używanie grożą kary i konfiskata, więc zostaw je w domu.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
grep -c $'\xc2\xa0' research/*.md | grep -v ":0$"
bash "$TMPDIR/sondy-4.sh" MIESIAC
```

Oczekiwane:
- `combos: 134784 months and 10368 dates (all)` i `ALL PASS`: zdania wjazdu każdej trasy;
- build bez błędów;
- oba grepy nic nie wypisują;
- `sondy (…): 0 z 16 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add research/ceny-2026-10.md research/cucphuong-2026-10.md research/danang-2026-10.md research/hagiang-2026-10.md research/motocykl-2026-10.md research/phongnha-2026-10.md research/plany-dni-2026-10.md research/rezerwacje-2026-10.md research/sapa-2026-10.md research/wjazd-2026-10.md site2/src/content/hagiang.js site2/src/page.js site2/src/ui.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Fakty z 14.10.2026 przed publikacją: research sprawdzony na dziś (drogi na Sơn Trà dalej zamknięte, ulewy w Phong Nha 9–10.10, opłata za Hải Vân Quan do 31.12.2028, dwa bilety na stare miasto Hội An ważne do 3 dni, godziny Đại Nội, most do Cát Tiên jeszcze w budowie, festiwal gryki 25.10.2026, godziny kolejki na Fansipan, bilety w Sa Pa, wstrzymane noclegi w lesie Cúc Phương, fort i kajaki na Cát Bà, deklaracja zdrowotna, karta przylotu, fałszywe strony wizowe, MSZ: poziom 1 i rada o motocyklu, której strona nie cytuje); na stronie data festiwalu w Đồng Văn i trzy zdania w „Wjazd i zdrowie”: e-wiza tylko z evisa.gov.vn, karta przylotu, e-papierosy

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Porządki w researchu przed upublicznieniem repo

Punkty 24 i 25 listy ustaleń, lista „Do audytu przed publikacją (etap 4)” i uwagi z przeglądów 1B o researchu. Zmiany porządkują notatki, ale faktów nie zmieniają, poza jedną ceną: noc nad Bàu Sấu niżej.
- **Robocze oznaczenia z planu 1B** (numery zadań i przeglądów, ok. 30 linii w `research/plany-dni-2026-10.md` i `research/trudne-dni-2026-10.md`) zastąpione datami decyzji. Sekcja „Uwagi dla zadań 7 i 8” nazywa się teraz „Uwagi do planów dni (10.10.2026)”, a odwołania do niej w „Do sprawdzenia” idą za nią.
- **`research/polaczenia-2026-10.md`:**
  - bez odwołań do audytu pierwowzoru (dokument spoza repo); zamiast nich źródła z tego samego wiersza;
  - przy autostradzie do Cao Bằng komunikat rządu z 29.09.2026, znany z tego audytu;
  - „biuro Mr Linh's Adventures” jako firma;
  - bez dopisków roboczych.
- **`research/sezony-2026-10.md`:** akapit o historii metody (dwie połowy, plan 1A, scalanie), bez dopisków do zespołu.
- **`research/swieta-2026-10.md`:** strona pokazuje „ok.” przy każdym święcie, a strona 11483/TB-BNV jest aktualizowana w miejscu.
- **`research/trudne-dni-2026-10.md`:**
  - Cát Tiên z przewodnikiem w cenie (54–59 EUR na osobę przy dwóch), z cennikiem dla gości krajowych i odesłaniem do cen dla cudzoziemców w `research/ceny-2026-10.md`;
  - krokodyle syjamskie w Bàu Sấu, ze źródłem (VnExpress, 16.8.2020, odczyt 14.10.2026);
  - dekret 146/2026 z jednego źródła;
  - liczba źródeł z † zgodna z opisem;
  - Cát Bà „na razie bez trudnego dnia” i stan na 14.10.2026;
  - jedno zdanie robocze przepisane.
- **Nowy `research/pierwowzor-2026-10.md`:** fakty z planów dni przeniesione bez zmian z pierwowzoru, ze źródłami z jego audytu (8–9.10.2026). Plik podaje też listę faktów pominiętych, bo mają dziś własne źródła albo strona ich już nie podaje. Bez lotów i spraw prywatnych.
- **Noc nad Bàu Sấu w budżecie** (doprecyzowanie z suchej próby): tekst dnia każe iść z przewodnikiem parku, a dolna granica ceny go nie liczyła.
  - Teraz `cattien.bausau_night` kosztuje za grupę 79–88 EUR zamiast 50–88 EUR: auto, przewodnik po angielsku i pokój, z tego samego cennika.
  - Research zmienia się pierwszy, a test danych pilnuje zgodności.

**Pliki:**
- Utwórz: `research/pierwowzor-2026-10.md`
- Zmień: `research/plany-dni-2026-10.md`, `trudne-dni`, `polaczenia`, `sezony`, `swieta`, `ceny` (wszystkie `research/<nazwa>-2026-10.md`), `site2/src/costs.js` (`cattien.bausau_night`)

- [ ] **Krok 1: Zmiany.**

W `research/ceny-2026-10.md` zamień:

```markdown
- **`cattien.bausau_night`** to podział sumy z TD (40–59 EUR na osobę przy dwóch osobach): na osobę 430 000 VND; za grupę od 1 450 000 VND (auto i pokój trzyosobowy, bez przewodnika) do 2 550 000 VND (auto, przewodnik po angielsku i bungalow). Pokój zastępuje nocleg w siedzibie parku, więc noclegi Cát Tiên trzeba wtedy liczyć o jedną noc mniej. Tekst dnia każe iść z przewodnikiem, a dolna granica TD go nie ma: z przewodnikiem po angielsku „za grupę od” wynosi 2 300 000 VND (79 EUR).
```

na:

```markdown
- **`cattien.bausau_night`** to podział sumy z TD (40–59 EUR na osobę przy dwóch osobach): na osobę 430 000 VND; za grupę od 1 450 000 VND (auto i pokój trzyosobowy, bez przewodnika) do 2 550 000 VND (auto, przewodnik po angielsku i bungalow). Pokój zastępuje nocleg w siedzibie parku, więc noclegi Cát Tiên trzeba wtedy liczyć o jedną noc mniej. Tekst dnia każe iść z przewodnikiem, a dolna granica TD go nie ma, więc „za grupę od” liczy przewodnika po angielsku: 2 300 000 VND (79 EUR; poprawka z 14.10.2026, wcześniej 50 EUR bez przewodnika).
```

W `research/ceny-2026-10.md` zamień:

```markdown
| `cattien.bausau_night` | p 2 hard | 15 | 15 | 50 | 88 | podział TD; za grupę zawiera pokój 26–34, który zastępuje nocleg; od bez przewodnika |
```

na:

```markdown
| `cattien.bausau_night` | p 2 hard | 15 | 15 | 79 | 88 | podział TD; za grupę zawiera pokój 26–34, który zastępuje nocleg, i przewodnika po angielsku, którego wymaga tekst dnia |
```

Utwórz `research/pierwowzor-2026-10.md`:

```markdown
# Pierwowzór: fakty z planów dni ze źródłami z jego audytu (zestawione 14.10.2026)

## Jak czytać

Część zdań w planach dni przeszła bez zmian z pierwowzoru, planera „Vietnam in December”, z którego pochodzą kod i pierwsze teksty tej strony. Fakty z tych zdań sprawdził audyt pierwowzoru z 8–9.10.2026 (`notes/audyt-2026-10-09.md` w repozytorium pierwowzoru, poza tym repozytorium), a ich źródła podał w Aneksie B, „Sprawdzanie faktów: szczegóły i źródła”. Ten plik przenosi z Aneksu B tylko fakty o miejscach, które teksty tego planera nadal podają: każdy sprawdziłem 14.10.2026 w `site2/src/content/*.js` i `site2/src/ui.js`. Wiersz podaje miejsce i pole w pliku treści, zdanie ze strony, fakt według audytu oraz sekcję Aneksu B, adres źródła i jego datę tak, jak podaje je audyt. Adresów nie otwierałem ponownie. Gdy audyt nie podaje adresu albo daty, piszę to wprost: taki fakt nie ma dziś innego źródła niż audyt. Na końcu, po jednej linii na fakt, są fakty z Aneksu B, które pominąłem: te, które notatki w `research/` źródłują na nowo, i te, których strona już nie podaje.

## Fakty na stronie

| miejsce i pole | zdanie na stronie | fakt według audytu | źródło według audytu (data) |
|---|---|---|---|
| `ninhbinh` `days` p 2 i jego `easy` | „do Hoa Lư, stolicy z X wieku, i świątyń jej pierwszych królów (odbudowanych w XVII wieku)”; w `easy` „do Hoa Lư, stolicy z X wieku, i jej świątyń” | Świątynie w Hoa Lư czczą królów z X wieku; według tradycji powstały w XI wieku, a odbudowano je w 1606 roku. | Aneks B, „Do poprawienia”: [czasopismo Uniwersytetu Hoa Lư](https://vjol.info.vn/tckh-truongdaihochoalu/article/download/131893/108331), bez daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `ninhbinh` `gem` | „Langury Delacoura na skałach Vân Long – jedne z najrzadszych naczelnych na świecie.” | W Vân Long żyje ok. 200 z ok. 570 langurów Delacoura na świecie. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `catba` `sub`, `days` p 2 i jego `easy` | „Wyspa porośnięta dżunglą po spokojnej stronie Hạ Long”; „płynie przez Zatokę Lan Hạ aż po spokojny południowy skraj Zatoki Hạ Long” | Rejsy z Cát Bà wpływają na zatokę Hạ Long. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `hue` `gem` | „Thanh Toàn, kryty most z lat 70. XVIII wieku wśród pól ryżowych na wschód od Huế.” | Most w Thanh Toàn pochodzi z 1776 roku. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `puluong` `instead` | „Pù Luông, niecałe dwie godziny drogi od Mai Châu.” | Z Mai Châu do Pù Luông jedzie się 1 h 20 min–2 h. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |

## Fakt, którego audyt nie potwierdził

| miejsce i pole | zdanie na stronie | fakt według audytu | źródło według audytu (data) |
|---|---|---|---|
| `hanoi` `days` p 3 | „Jednodniowa wycieczka do Đường Lâm, ok. 1½ godz. w każdą stronę” | Czas drogi Hà Nội – Đường Lâm był w pierwowzorze bez źródła, a audyt żadnego nie znalazł. | Aneks B, „Nie dało się potwierdzić”: bez źródła; sprawdzone w audycie pierwowzoru 8–9.10.2026. Samą odległość, ok. 50 km na zachód od Hà Nội, podaje DLM-WIKI w `research/rezerwacje-2026-10.md` |

## Pominięte

Z założenia pominąłem loty i sprawy przewoźników, punkty o Wigilii, ocenę planu pierwowzoru pod kątem jego uczestników i sprawy osobiste.

**Źródła na nowo w tym repozytorium:**

- Świątynia Literatury od 8:00 (`hanoi` `days` p 2): HN-VM i HN-GSM-VM w `research/plany-dni-2026-10.md`; ceny biletu strona nie podaje.
- powrót statku na Cát Bà ok. 12:00 (`catba` `days` p 3): CB-FM w `research/plany-dni-2026-10.md` i Full Moon w wierszu hanoi – catba w `research/polaczenia-2026-10.md`.
- drogi Ninh Bình – Cát Bà i Pù Luông – Ninh Bình: `research/polaczenia-2026-10.md`, gdzie wyszły 4,5 h i 3,5 h (audyt: ok. 4 h i ok. 3 h).
- droga Hà Nội – Cao Bằng i autostrada nie przed Tết 2027: wiersz hanoi – caobang w `research/polaczenia-2026-10.md`, z komunikatem rządu z 29.09.2026 za audytem; strona podaje tylko czas drogi.
- drogi Hồ Chí Minh City – Cát Tiên i Cát Tiên – Đà Lạt: `research/polaczenia-2026-10.md`.
- drogi, które w pierwowzorze nie miały źródła (Hồ Chí Minh City – Phong Điền, Phong Điền – lotnisko Cần Thơ, Đà Nẵng – Hội An, Hà Nội – Pù Luông, Ba Bể – Hà Nội i Ba Bể – Cao Bằng, liczona dziś od miasta zamiast od Bản Giốc): `research/polaczenia-2026-10.md`.
- morze przy Cát Bà w grudniu ok. 22 °C: C10 i C11 w `research/sezony-2026-10.md`; strona podaje tylko „zimne morze” jako powód oceny w XII–III, a zdanie z liczbą zniknęło z tekstu 10.10.2026.
- pogoda w Huế, Đà Nẵng, Đà Lạt, Hà Nội, Hồ Chí Minh City i na Phú Quốc oraz sześć wierszy, których audyt nie potwierdził (Cần Thơ, Hòa Bình, Thanh Hóa, Hải Phòng, Cao Bằng, Bắc Kạn): tabele stacji w `research/sezony-2026-10.md`.
- sezon wypraw w Phong Nha (Hang Én od grudnia) i Sơn Đoòng: OX-HE, OX-HE2, JB-CMP i BLC-2026 w `research/phongnha-2026-10.md`.
- ceny rejsu po Lan Hạ: W-CB-VT (ten sam adres co w audycie) i W-CB-FM w `research/ceny-2026-10.md`.
- stawki aut z kierowcą: `research/ceny-2026-10.md`.
- Cần Giờ z przeprawą promową w Bình Khánh (`saigon` `days` p 2): CG-PROM i CG-MOST w `research/rezerwacje-2026-10.md` oraz W-SG-VNE w `research/ceny-2026-10.md`.
- tramwaj wodny Saigon Waterbus (`saigon` `days` p 1): SG-WB w `research/plany-dni-2026-10.md`, ten sam artykuł co w audycie.
- Tràng An od 7:00 i bilet (`ninhbinh` `days` p 2), także godziny na 2026, których audyt nie potwierdził: NB-JB i NB-VW w `research/plany-dni-2026-10.md`, DZ-BVH w `research/ceny-2026-10.md` (bilet z łodzią 300 000 VND od 1.01.2026; audyt: 250 000 VND).
- Cát Tiên: Bàu Sấu 9 km autem i 5 km pieszo za ok. 250 000 VND i zapisy w parku (`cattien` `days` p 2): CT-ceny i CT-VNE w `research/trudne-dni-2026-10.md`.
- Đà Lạt: kolejka z Robin Hill i pociąg do Trại Mát (`dalat`, wersje `easy` dni p 2 i p 3): W-DL-VW i W-DL-VST w `research/ceny-2026-10.md`.
- Hang Múa, ok. 500 schodów (`ninhbinh` `skip`): NB-NBTC w `research/trudne-dni-2026-10.md`.
- pływająca wioska w części rejsów (`catba` `days` p 2): CB-VT2 w `research/plany-dni-2026-10.md`.
- Việt Hải łodzią i ok. 5 km meleksem albo rowerem (`catba` `days` p 4 i jego `easy`): CB-FM i CB-VT2 w `research/plany-dni-2026-10.md`.
- szlak na Ngự Lâm (`catba` `days` p 4): W-CB-VTT w `research/ceny-2026-10.md`; czasu podejścia z audytu strona nie podaje.
- rozgwiazdy w Rạch Vẹm (`phuquoc` `days` p 2): SunPQ w `research/sezony-2026-10.md`.
- stare miasto w Hội An o 6:00 (`hoian` `days` p 2): HA-GMH w `research/plany-dni-2026-10.md`.
- ryż w Pù Luông zebrany w październiku (`puluong` `days` p 3 i `events`): dziś terminy złotych tarasów z L1 i L2 w `research/sezony-2026-10.md`.
- dom wspólnoty w Đường Lâm z 1684 roku (`hanoi` `days` p 3): DLM-WIKI w `research/rezerwacje-2026-10.md`.
- zasady na przełęczy Hải Vân (audyt ich nie szukał): `research/motocykl-2026-10.md`, sekcja „Przełęcz Hải Vân (Hội An–Huế)”.
- pora wypłynięcia na targ Cái Răng (audyt jej nie szukał; `mekong` `days` p 2): VT-CanTho w `research/sezony-2026-10.md`.

**Strona już tego nie podaje:**

- Bản Giốc zimą 7:30–17:30 i oficjalne godziny wodospadu na 2026: tekst Cao Bằng nie podaje godzin otwarcia.
- różowa trawa i dzikie słoneczniki w grudniu w Đà Lạt: zdanie usunięte 10.10.2026 (`research/plany-dni-2026-10.md`, sekcja „dalat”).
- rejs po Vân Long o złotej godzinie, z wsiadką do ok. 15:45: od 10.10.2026 „późnym popołudniem” (tamże, sekcja „ninhbinh”).
- ośrodek Đảo Tiên (w audycie „Dao Tiến”) czynny codziennie i godziny wizyt: ośrodek jest zamknięty, a dzień w Cát Tiên nie prowadzi do niego od 12.10.2026 (tamże, „Zmiany z planu 2B”).
- zachód słońca z Cannon Fort (audyt go nie szukał): zdanie usunięte 10.10.2026 (tamże, sekcja „catba”).
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
Fakty, które plan 1B dopisał albo zmienił w tekstach miejsc (`site2/src/content/<id>.js`), każdy ze źródłem i datą. Zadanie 7 objęło południe, Hội An i Huế, a zadanie 8 północ. Fakty przeniesione z pierwowzoru bez zmian mają źródła w jego audycie z 9.10.2026 (`notes/audyt-2026-10-09.md` w pierwowzorze), a przeniesie je audyt w etapie 4.

- **Wynik zadania 7:**
```

na:

```markdown
Fakty, które dopisano albo zmieniono w tekstach miejsc (`site2/src/content/<id>.js`) 10–11.10.2026, przy przepisywaniu tekstów z pierwowzoru, każdy ze źródłem i datą: najpierw południe, Hội An i Huế, potem północ. Źródła faktów przeniesionych z pierwowzoru bez zmian, znane z jego audytu z 8–9.10.2026, są w `research/pierwowzor-2026-10.md`.

- **Południe, Hội An i Huế (10.10.2026):**
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
    - jednodniowej wędrówki na Tà Năng nie znalazłem w ofertach na 2026, więc dzień p 3 w Đà Lạt to teraz Lang Biang (decyzja z przeglądu zadania 7; szlak bywa zamknięty, zob. „Do sprawdzenia przed publikacją”);
  - źródła faktów z nowych tekstów Hội An i Huế (zadanie 5).
- **Wynik zadania 8:**
  - jeden trudny dzień: wejście na szczyt Pù Luông w dniu p 2, zgodnie z `research/trudne-dni-2026-10.md`. Cát Bà zostaje bez trudnego dnia (decyzja z przeglądu z 10.10.2026, tamże, sekcja „catba”), a pozostałe pięć miejsc ma tam werdykt „nie”;
```

na:

```markdown
    - jednodniowej wędrówki na Tà Năng nie znalazłem w ofertach na 2026, więc dzień p 3 w Đà Lạt to teraz Lang Biang (decyzja z 10.10.2026; szlak bywa zamknięty, zob. „Do sprawdzenia przed publikacją”);
  - źródła faktów z nowych tekstów Hội An i Huế, napisanych 10.10.2026, gdy oba stały się osobnymi miejscami.
- **Północ (10.10.2026):**
  - jeden trudny dzień: wejście na szczyt Pù Luông w dniu p 2, zgodnie z `research/trudne-dni-2026-10.md`. Cát Bà zostaje bez trudnego dnia (decyzja z 10.10.2026, tamże, sekcja „catba”), a pozostałe pięć miejsc ma tam werdykt „nie”;
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
  - fakt i zmiana względem pierwowzoru albo zadania 5;
```

na:

```markdown
  - fakt i zmiana względem pierwowzoru albo, przy Hội An i Huế, względem pierwszej wersji nowego tekstu;
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
- **Ceny pomijam:** teksty ich nie podają, wrócą w etapie 2.
```

na:

```markdown
- **Ceny pomijam:** teksty ich nie podają; ceny są w `research/ceny-2026-10.md` (od 11.10.2026).
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| `hard` | „nocleg, pozwolenie i przewodnika zarezerwuj z wyprzedzeniem w recepcji parku, bo pokoi jest niewiele” | Pokoje rezerwuje się w recepcji parku, a na stacji są miejsca dla 19 osób. Przewodnik parku jest w ofercie, ale park go nie wymaga, a ścieżkę da się przejść samemu. Tekst każe więc zarezerwować go razem z noclegiem, bo plan wymaga przewodnika (wizja, pkt 5). Poprawka z przeglądu zadania 7. | TD: CT-ceny (od 1.6.2024), CT-VNE (25.5.2026) |
```

na:

```markdown
| `hard` | „nocleg, pozwolenie i przewodnika zarezerwuj z wyprzedzeniem w recepcji parku, bo pokoi jest niewiele” | Pokoje rezerwuje się w recepcji parku, a na stacji są miejsca dla 19 osób. Przewodnik parku jest w ofercie, ale park go nie wymaga, a ścieżkę da się przejść samemu. Tekst każe więc zarezerwować go razem z noclegiem, bo plan wymaga przewodnika (wizja, pkt 5). Poprawki z 10–11.10.2026. | TD: CT-ceny (od 1.6.2024), CT-VNE (25.5.2026) |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| `days` p 3 | „Szczyt Lang Biang” zamiast „Trawiaste wzgórza Tà Năng” | Decyzja z przeglądu zadania 7. Żaden znany operator nie sprzedaje w 2026 jednodniowego wyjścia na Tà Năng: TropiAd ma tylko 2 dni/1 noc i 2 dni/2 noce, a prasa opisuje trasę jako dwudniową. Szlak wolno przejść tylko z organizatorem i przewodnikiem. Tà Năng wypada z planów dni, a wielodniowa trasa Tà Năng–Phan Dũng może wrócić później jako osobny moduł. Wersja `easy` dnia (stara kolej i kwiatowe wioski) zostaje bez zmian. | TD: TROP; SEZ: VNE-2025-02-18 (18.2.2025); TN (8.10.2026) |
```

na:

```markdown
| `days` p 3 | „Szczyt Lang Biang” zamiast „Trawiaste wzgórza Tà Năng” | Decyzja z 10.10.2026. Żaden znany operator nie sprzedaje w 2026 jednodniowego wyjścia na Tà Năng: TropiAd ma tylko 2 dni/1 noc i 2 dni/2 noce, a prasa opisuje trasę jako dwudniową. Szlak wolno przejść tylko z organizatorem i przewodnikiem. Tà Năng wypada z planów dni, a wielodniowa trasa Tà Năng–Phan Dũng może wrócić później jako osobny moduł. Wersja `easy` dnia (stara kolej i kwiatowe wioski) zostaje bez zmian. | TD: TROP; SEZ: VNE-2025-02-18 (18.2.2025); TN (8.10.2026) |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| `days` p 3 | „Przy rezerwacji zapytaj, czy szlak jest otwarty i czy biuro ma zgodę parku.” | Nowe, poprawka z drugiego przeglądu zadania 7. Szlak na szczyt bywa zamykany. Ośrodek Langbiang zamknął go 15.9.2024 po ulewach (powalone drzewa, rozmyte odcinki) i otworzył po ok. miesiącu, pod warunkiem biletu wstępu i wycieczki z przewodnikiem. 31.10.2024 park Bidoup–Núi Bà zawiesił trasę pieszą na Núi Bà (2167 m). Powody: wędrowcy, którzy nie zgłaszali się u zarządcy lasu i szli bez przewodnika, gubili się, od 7.2024 ratowano ich nocą (według Tuổi Trẻ zabłądziło co najmniej 10 osób), a długie ulewy wywołały osuwiska. Park zapowiedział, że otwarcie „rozważy przy sprzyjającej pogodzie”. Wiadomości o otwarciu po 31.10.2024 nie znalazłem (wyszukiwanie 10.10.2026). Przewodniki z 2026 opisują jednak wejście jako czynne, z obowiązkowym przewodnikiem, a biura je sprzedają. Pytanie o zgodę parku wynika z przepisów: organizowanie wycieczek w lesie bez zgody zarządcy jest karane. | LB-VNP (31.10.2024), LB-TTN (1.11.2024), LB-ZING (25.10.2024); LB-MH (30.4.2026), LB-JB (2026); TD („Ramy prawne 2026”, DT-0819) |
```

na:

```markdown
| `days` p 3 | „Przy rezerwacji zapytaj, czy szlak jest otwarty i czy biuro ma zgodę parku.” | Nowe, poprawka z 10.10.2026. Szlak na szczyt bywa zamykany. Ośrodek Langbiang zamknął go 15.9.2024 po ulewach (powalone drzewa, rozmyte odcinki) i otworzył po ok. miesiącu, pod warunkiem biletu wstępu i wycieczki z przewodnikiem. 31.10.2024 park Bidoup–Núi Bà zawiesił trasę pieszą na Núi Bà (2167 m). Powody: wędrowcy, którzy nie zgłaszali się u zarządcy lasu i szli bez przewodnika, gubili się, od 7.2024 ratowano ich nocą (według Tuổi Trẻ zabłądziło co najmniej 10 osób), a długie ulewy wywołały osuwiska. Park zapowiedział, że ponowne otwarcie trasy rozważy, gdy pogoda będzie sprzyjać. Wiadomości o otwarciu po 31.10.2024 nie znalazłem (wyszukiwanie 10.10.2026). Przewodniki z 2026 opisują jednak wejście jako czynne, z obowiązkowym przewodnikiem, a biura je sprzedają. Pytanie o zgodę parku wynika z przepisów: organizowanie wycieczek w lesie bez zgody zarządcy jest karane. | LB-VNP (31.10.2024), LB-TTN (1.11.2024), LB-ZING (25.10.2024); LB-MH (30.4.2026), LB-JB (2026); TD („Ramy prawne 2026”, DT-0819) |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
Zmiany zadania 7:
```

na:

```markdown
Zmiany z 10.10.2026:
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| `rain` dnia p 1 | „warsztaty robienia lampionów, a do tego kryty targ.” (usunięte: „lekcja gotowania albo”) | Bez nowego faktu. Wersja `easy` zaczyna się lekcją gotowania, a plan na deszcz dziedziczy dzień, więc na poziomie 1 lekcja się powtarzała. Decyzja z przeglądu zadania 7. | — |

Źródła faktów z tekstów zadania 5:
```

na:

```markdown
| `rain` dnia p 1 | „warsztaty robienia lampionów, a do tego kryty targ.” (usunięte: „lekcja gotowania albo”) | Bez nowego faktu. Wersja `easy` zaczyna się lekcją gotowania, a plan na deszcz dziedziczy dzień, więc na poziomie 1 lekcja się powtarzała. Decyzja z 10.10.2026. | — |

Źródła faktów z nowego tekstu z 10.10.2026:
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| `days` p 1 | „Cesarskie Miasto (Đại Nội): mury, bramy i dziedzińce dawnej stolicy dynastii Nguyễn” | Źródło do tekstu zadania 5. Hoàng thành, czyli Đại Nội, to królewska część miasta otoczonego murem, a Huế był stolicą za dynastii Nguyễn. Budowę zaczął Gia Long w 1804 roku. Są wały, fosa i główna brama Ngọ Môn. | HUE-WIKI (odczyt 10.10.2026) |
| `days` p 1 | „Zwiedzanie kończy się ok. 17:00, latem ok. 17:30.” | Nowe, bo dzień przyjazdu potrzebuje godziny zamknięcia. Według Vinwonders Đại Nội jest otwarty latem 6:30–17:30, a zimą 7:00–17:00. Vinpearl podaje 6:30–18:00 od 16.3 do 15.10 (kasy do 17:30) i 7:00–17:30 od 16.10 do 15.3 (kasy do 17:00). Źródła różnią się o pół godziny, dlatego „ok.”. | HUE-VW (13.12.2025), HUE-VP† |
| `rain` dnia p 1 | „kryte galerie Cesarskiego Miasta i Muzeum Królewskich Antyków” | Źródło do tekstu zadania 5. Odbudowano 14 odcinków krytych galerii (ok. 760 m), a w pałacu Long An mieści się Muzeum Królewskich Antyków. | HUE-VOV (29.4.2016), HUE-WIKI |
```

na:

```markdown
| `days` p 1 | „Cesarskie Miasto (Đại Nội): mury, bramy i dziedzińce dawnej stolicy dynastii Nguyễn” | Źródło do nowego tekstu z 10.10.2026. Hoàng thành, czyli Đại Nội, to królewska część miasta otoczonego murem, a Huế był stolicą za dynastii Nguyễn. Budowę zaczął Gia Long w 1804 roku. Są wały, fosa i główna brama Ngọ Môn. | HUE-WIKI (odczyt 10.10.2026) |
| `days` p 1 | „Zwiedzanie kończy się ok. 17:00, latem ok. 17:30.” | Nowe, bo dzień przyjazdu potrzebuje godziny zamknięcia. Według Vinwonders Đại Nội jest otwarty latem 6:30–17:30, a zimą 7:00–17:00. Vinpearl podaje 6:30–18:00 od 16.3 do 15.10 (kasy do 17:30) i 7:00–17:30 od 16.10 do 15.3 (kasy do 17:00). Źródła różnią się o pół godziny, dlatego „ok.”. | HUE-VW (13.12.2025), HUE-VP† |
| `rain` dnia p 1 | „kryte galerie Cesarskiego Miasta i Muzeum Królewskich Antyków” | Źródło do nowego tekstu z 10.10.2026. Odbudowano 14 odcinków krytych galerii (ok. 760 m), a w pałacu Long An mieści się Muzeum Królewskich Antyków. | HUE-VOV (29.4.2016), HUE-WIKI |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| `instead` | „Pù Luông, niecałe dwie godziny drogi od Mai Châu.” | Było „ok. dwóch godzin drogi dalej”, czyli licząc od Hà Nội przez Mai Châu. Teraz od Mai Châu, bez założenia, skąd się jedzie. Audyt pierwowzoru podaje 1 h 20 min–2 h. | audyt pierwowzoru (9.10.2026) |
```

na:

```markdown
| `instead` | „Pù Luông, niecałe dwie godziny drogi od Mai Châu.” | Było „ok. dwóch godzin drogi dalej”, czyli licząc od Hà Nội przez Mai Châu. Teraz od Mai Châu, bez założenia, skąd się jedzie. Audyt pierwowzoru podaje 1 h 20 min–2 h. | audyt pierwowzoru (8–9.10.2026, bez adresu źródła; zob. `research/pierwowzor-2026-10.md`) |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| bez `hard` | — | Decyzja z przeglądu (10.10.2026): bez trudnego dnia, bo licencje operatorów wspinaczki i DWS są tylko deklarowane. Do ponownego sprawdzenia w etapie 3. | TD (sekcja „catba”) |
```

na:

```markdown
| bez `hard` | — | Decyzja z 10.10.2026: bez trudnego dnia, bo licencje operatorów wspinaczki i DWS są tylko deklarowane. Ponowne sprawdzenie z 13.10.2026 dało ten sam werdykt. | TD (sekcje „catba” i „Uzupełnienie 13.10.2026”) |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
Zdania zmienione w planie 2A. Wiersze w sekcjach miejsc wyżej cytują teksty z planu 1B. Adresy nowych źródeł otwarto 11.10.2026.
```

na:

```markdown
Zdania zmienione w planie 2A. Wiersze w sekcjach miejsc wyżej cytują teksty sprzed tych zmian. Adresy nowych źródeł otwarto 11.10.2026.
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| puluong `hard` | „Rezerwat sam organizuje wejścia na szczyt z przewodnikami z okolicznych wiosek i ogranicza liczbę uczestników, więc zapisz się u niego z wyprzedzeniem i dopytaj o wersję jednodniową.” | Fakty jak w wierszu z planu 1B, poprawiony styl: „prowadzi trasę” brzmiało jak „wytycza”, a „rezerwat… rezerwatu” i „zapytaj… zapytaj” się powtarzały. | jak w sekcji „puluong” |
| puluong `events` | uwaga od 1.12 do 29.02: chłodna pora | Nowe, z przeglądu trudnego dnia: mgła i zimno zimą to ryzyko z TD, a trudny dzień strona pokazuje od X do IV. Zdanie dotyczy części roku, więc trafia do wydarzeń. | SEZ, „Na stronie: wydarzenia i uwagi sezonowe” |
```

na:

```markdown
| puluong `hard` | „Rezerwat sam organizuje wejścia na szczyt z przewodnikami z okolicznych wiosek i ogranicza liczbę uczestników, więc zapisz się u niego z wyprzedzeniem i dopytaj o wersję jednodniową.” | Fakty jak w wierszu w sekcji „puluong” wyżej, poprawiony styl: „prowadzi trasę” brzmiało jak „wytycza”, a „rezerwat… rezerwatu” i „zapytaj… zapytaj” się powtarzały. | jak w sekcji „puluong” |
| puluong `events` | uwaga od 1.12 do 29.02: chłodna pora | Nowe (zmiana z 11.10.2026): mgła i zimno zimą to ryzyko z TD, a trudny dzień strona pokazuje od X do IV. Zdanie dotyczy części roku, więc trafia do wydarzeń. | SEZ, „Na stronie: wydarzenia i uwagi sezonowe” |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
- **Cát Tiên:** cennik i rezerwacja noclegu nad Bàu Sấu po przejściu parku pod zarząd miasta Đồng Nai (TD, „Uwagi dla zadań 7 i 8”, pkt 7). Sprawdzone 14.10.2026: bez zmian. Strona parku ma ten sam cennik (pliki z 2024 i 2025) i ten sam kontakt, najnowszy wpis jest z 7.8.2026, a w stopce dalej są nazwa parku i logotypy ministerstwa (CT-2026-10-14a, CT-2026-10-14b). Po uchwale 188/NQ-CP z 16.7.2026 nie znalazłem wiadomości o samym przekazaniu parku miastu Đồng Nai ani o nowym cenniku czy kanale rezerwacji (CT-2026-10-14d, CT-2026-10-14e).
```

na:

```markdown
- **Cát Tiên:** cennik i rezerwacja noclegu nad Bàu Sấu po przejściu parku pod zarząd miasta Đồng Nai (TD, „Uwagi do planów dni (10.10.2026)”, pkt 7). Sprawdzone 14.10.2026: bez zmian. Strona parku ma ten sam cennik (pliki z 2024 i 2025) i ten sam kontakt, najnowszy wpis jest z 7.8.2026, a w stopce dalej są nazwa parku i logotypy ministerstwa (CT-2026-10-14a, CT-2026-10-14b). Po uchwale 188/NQ-CP z 16.7.2026 nie znalazłem wiadomości o samym przekazaniu parku miastu Đồng Nai ani o nowym cenniku czy kanale rezerwacji (CT-2026-10-14d, CT-2026-10-14e).
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
- **Cát Bà:** czy Cannon Fort znów przyjmuje turystów i czy zniesiono zawieszenie kajaków (zob. też TD, „Uwagi dla zadań 7 i 8”, pkt 7). Sprawdzone 14.10.2026: fort dalej nie przyjmuje turystów, a zawieszenia kajaków nie zniesiono. Komunikatu o ponownym otwarciu fortu nie znalazłem; najnowsze datowane źródła o jego stanie mówią, że nie przyjmuje turystów i można najwyżej poprosić strażnicę o wejście (CB-VW, CB-NV, CB-2026-10-14d). Portal komercyjny z 30.5.2026 opisuje fort jak czynny punkt widokowy z biletem 40 000 VND, ale tę samą cenę podawały teksty z 2023 r. (CB-2026-10-14e). Urzędowego zniesienia zawieszenia kajaków nie ma: armator pisze, że zawieszenie na podstawie pisma 483/TB-UBND obowiązuje od 1.2.2026 do odwołania w całej zatoce Lan Hạ, z jaskiniami Sáng – Tối (CB-2026-10-14a), a teksty promocyjne, także w prasie, opisują kajaki bez podstawy prawnej (CB-2026-10-14b, CB-2026-10-14c). Urzędowej listy miejsc do pływania kajakiem też nie znalazłem. Dzień p 1 bez fortu i dzień p 2 bez kajaka zostają.
```

na:

```markdown
- **Cát Bà:** czy Cannon Fort znów przyjmuje turystów i czy zniesiono zawieszenie kajaków (zob. też TD, „Uwagi do planów dni (10.10.2026)”, pkt 7). Sprawdzone 14.10.2026: fort dalej nie przyjmuje turystów, a zawieszenia kajaków nie zniesiono. Komunikatu o ponownym otwarciu fortu nie znalazłem; najnowsze datowane źródła o jego stanie mówią, że nie przyjmuje turystów i można najwyżej poprosić strażnicę o wejście (CB-VW, CB-NV, CB-2026-10-14d). Portal komercyjny z 30.5.2026 opisuje fort jak czynny punkt widokowy z biletem 40 000 VND, ale tę samą cenę podawały teksty z 2023 r. (CB-2026-10-14e). Urzędowego zniesienia zawieszenia kajaków nie ma: armator pisze, że zawieszenie na podstawie pisma 483/TB-UBND obowiązuje od 1.2.2026 do odwołania w całej zatoce Lan Hạ, z jaskiniami Sáng – Tối (CB-2026-10-14a), a teksty promocyjne, także w prasie, opisują kajaki bez podstawy prawnej (CB-2026-10-14b, CB-2026-10-14c). Urzędowej listy miejsc do pływania kajakiem też nie znalazłem. Dzień p 1 bez fortu i dzień p 2 bez kajaka zostają.
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
| LB-VNP | VietnamPlus, „Tạm dừng tuyến đi bộ leo núi Lang Biang do không đảm bảo an toàn”: park Bidoup–Núi Bà 31.10.2024 zawiesza trasę pieszą na szlaku Lang Biang na wysokości 2167 m. Powody: wędrowcy bez zgłoszenia u zarządcy lasu i bez przewodnika gubią się (od 7.2024 akcje ratunkowe nocą), osuwiska po długich ulewach. Otwarcie park „sẽ được cân nhắc khi thời tiết thuận lợi”. | https://www.vietnamplus.vn/tam-dung-tuyen-di-bo-leo-nui-lang-biang-do-khong-dam-bao-an-toan-post988612.vnp | prasa (agencja państwowa) | 31.10.2024 |
```

na:

```markdown
| LB-VNP | VietnamPlus, „Tạm dừng tuyến đi bộ leo núi Lang Biang do không đảm bảo an toàn”: park Bidoup–Núi Bà 31.10.2024 zawiesza trasę pieszą na szlaku Lang Biang na wysokości 2167 m. Powody: wędrowcy bez zgłoszenia u zarządcy lasu i bez przewodnika gubią się (od 7.2024 akcje ratunkowe nocą), osuwiska po długich ulewach. Park zapowiedział, że ponowne otwarcie trasy rozważy, gdy pogoda będzie sprzyjać (w oryginale „sẽ được cân nhắc khi thời tiết thuận lợi”). | https://www.vietnamplus.vn/tam-dung-tuyen-di-bo-leo-nui-lang-biang-do-khong-dam-bao-an-toan-post988612.vnp | prasa (agencja państwowa) | 31.10.2024 |
```

W `research/plany-dni-2026-10.md` zamień:

```markdown
Etykiety z innych notatek (SEZ: VT-CanTho, VNnews-2026-09-29, SunPQ, VT-klimat, VTcom-PQ, CT-park, IBST-DL, VNE-2025-02-18, L1, L2, N3, P2, B5, C10; TD: CT-ceny, CT-zał, CT-prog, CT-VNE, TROP, DT-0819, LB†, PL-TT, PL-VNP, PL-VNN, PL-HET, PL-PLT, CB-K1, CB-K2, CB-IS, BB-P2; TN) mają adresy w tamtych plikach. CT-park, CT-prog, VNnews-2026-09-29 i VNE-2025-02-18 otworzyłem znowu 10.10.2026 i cytaty w tabelach są z tego odczytu. To samo dotyczy PL-TT, PL-VNP, PL-VNN, PL-HET, CB-IS, N3 i P2, otwartych znowu w zadaniu 8.
```

na:

```markdown
Etykiety z innych notatek (SEZ: VT-CanTho, VNnews-2026-09-29, SunPQ, VT-klimat, VTcom-PQ, CT-park, IBST-DL, VNE-2025-02-18, L1, L2, N3, P2, B5, C10; TD: CT-ceny, CT-zał, CT-prog, CT-VNE, TROP, DT-0819, LB†, PL-TT, PL-VNP, PL-VNN, PL-HET, PL-PLT, CB-K1, CB-K2, CB-IS, BB-P2; TN) mają adresy w tamtych plikach. CT-park, CT-prog, VNnews-2026-09-29 i VNE-2025-02-18 otworzyłem znowu 10.10.2026 i cytaty w tabelach są z tego odczytu. To samo dotyczy PL-TT, PL-VNP, PL-VNN, PL-HET, CB-IS, N3 i P2, otwartych znowu tego samego dnia przy tekstach północy.
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
| SGN – cattien | 3,75 | [Vietnamtourism.com](https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit) (18.09.2026): ok. 150 km, samochód prywatny ok. 3 h do przystani promu; [Wikivoyage](https://en.wikivoyage.org/wiki/Cat_Tien_National_Park): 150 km, „nawet w 3 h” przy ominięciu korka w Biên Hòa; operatorzy (Vietnam Drive, Exotravel, TIGIT z godziną korka) ok. 4 h †, Mr Linh Adventure 3,5 h †. Mediana wszystkich podanych tu liczb, liczonych tak, jak są wypisane (3; 3; 3,5; 4; 4; 4 h), to 3,75: według reguły z sekcji „Jak czytać” (mediana środków przedziałów) bierze się wartość typową, a nie najbardziej optymistyczną (korekta po przeglądzie, 10.10.2026). (9.10.2026) |
| saigon – cattien | 3,75 | Jak wyżej: [Vietnamtourism.com](https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit) (18.09.2026), ok. 150 km od HCMC. Wartość jak w wierszu SGN – cattien: mediana tamtych liczb to 3,75; według reguły z sekcji „Jak czytać” (mediana środków przedziałów) bierze się wartość typową, a nie najbardziej optymistyczną (korekta po przeglądzie, 10.10.2026). (9.10.2026) |
| cattien – dalat | 4,5 | Daytrip †: 194 km, ok. 4 h 20 min; Vietnam Drive †: 192 km, ponad 4,5 h; [Wikivoyage](https://en.wikivoyage.org/wiki/Cat_Tien_National_Park): „co najmniej 4 h” z Đà Lạt; [Vietnamtourism.com](https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit) (18.09.2026): droga z Đà Lạt jest „dłuższa i wolniejsza, niż wynika z mapy” (autobus 5–6 h przez Bảo Lộc). Audyt pierwowzoru: co najmniej 4 h. 4,5 to typowy czas z przerwą. (9.10.2026) |
```

na:

```markdown
| SGN – cattien | 3,75 | [Vietnamtourism.com](https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit) (18.09.2026): ok. 150 km, samochód prywatny ok. 3 h do przystani promu; [Wikivoyage](https://en.wikivoyage.org/wiki/Cat_Tien_National_Park): 150 km, „nawet w 3 h” przy ominięciu korka w Biên Hòa; operatorzy (Vietnam Drive, Exotravel, TIGIT z godziną korka) ok. 4 h †, biuro Mr Linh's Adventures 3,5 h †. Mediana wszystkich podanych tu liczb, liczonych tak, jak są wypisane (3; 3; 3,5; 4; 4; 4 h), to 3,75: według reguły z sekcji „Jak czytać” (mediana środków przedziałów) bierze się wartość typową, a nie najbardziej optymistyczną (decyzja z 10.10.2026). (9.10.2026) |
| saigon – cattien | 3,75 | Jak wyżej: [Vietnamtourism.com](https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit) (18.09.2026), ok. 150 km od HCMC. Wartość jak w wierszu SGN – cattien: mediana tamtych liczb to 3,75; według reguły z sekcji „Jak czytać” (mediana środków przedziałów) bierze się wartość typową, a nie najbardziej optymistyczną (decyzja z 10.10.2026). (9.10.2026) |
| cattien – dalat | 4,5 | Daytrip †: 194 km, ok. 4 h 20 min; Vietnam Drive †: 192 km, ponad 4,5 h; [Wikivoyage](https://en.wikivoyage.org/wiki/Cat_Tien_National_Park): „co najmniej 4 h” z Đà Lạt; [Vietnamtourism.com](https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit) (18.09.2026): droga z Đà Lạt jest „dłuższa i wolniejsza, niż wynika z mapy” (autobus 5–6 h przez Bảo Lộc). 4,5 to typowy czas z przerwą. (9.10.2026) |
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
| HAN – catba | 4 | [Cat Ba Ocean Cruises](https://catbaoceancruises.com/?p=1093): z Nội Bài ok. 180 km, 4 h samochodem; [GoAsia](https://goasia.cc/en/vietnam/hanoi-to-cat-ba) (8.03.2026): Nội Bài – okolice Hải Phòng 2 h 5 min–3 h 20 min, plus prom; limuzyna z promem 4 h 30 min. Wartość z pierwowzoru (audyt: realnie 4–4,5 h) potwierdzona. (9.10.2026) |
| HAN – puluong | 5,25 | [Vietnam Trail Series](https://vietnamtrailseries.com/jungle-marathon/how-to-get-to-pu-luong/): z Nội Bài 5–5,5 h, ok. 175 km (z centrum Hà Nội 5 h, 160 km); [LocalVietnam](https://localvietnam.com/thanh-hoa/pu-luong/from-hanoi-to-pu-luong/) (2.07.2026) i [Hanoi Eco Tour](https://hanoiecotour.com/hanoi-to-pu-luong/): z centrum ok. 4 h z przerwą. Vietnam Trail Series to jedyne źródło dla samej pary (z Nội Bài): 5–5,5 h i ok. 175 km, środek 5,25 (korekta po przeglądzie, 10.10.2026); pozostałe dwa źródła dotyczą przejazdu z centrum. (9.10.2026) |
```

na:

```markdown
| HAN – catba | 4 | [Cat Ba Ocean Cruises](https://catbaoceancruises.com/?p=1093): z Nội Bài ok. 180 km, 4 h samochodem; [GoAsia](https://goasia.cc/en/vietnam/hanoi-to-cat-ba) (8.03.2026): Nội Bài – okolice Hải Phòng 2 h 5 min–3 h 20 min, plus prom; limuzyna z promem 4 h 30 min. Wartość z pierwowzoru potwierdzona. (9.10.2026) |
| HAN – puluong | 5,25 | [Vietnam Trail Series](https://vietnamtrailseries.com/jungle-marathon/how-to-get-to-pu-luong/): z Nội Bài 5–5,5 h, ok. 175 km (z centrum Hà Nội 5 h, 160 km); [LocalVietnam](https://localvietnam.com/thanh-hoa/pu-luong/from-hanoi-to-pu-luong/) (2.07.2026) i [Hanoi Eco Tour](https://hanoiecotour.com/hanoi-to-pu-luong/): z centrum ok. 4 h z przerwą. Vietnam Trail Series to jedyne źródło dla samej pary (z Nội Bài): 5–5,5 h i ok. 175 km, środek 5,25 (decyzja z 10.10.2026); pozostałe dwa źródła dotyczą przejazdu z centrum. (9.10.2026) |
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
| hanoi – catba | 4 | [Full Moon](https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/): koniec rejsu o 12:00 w Bến Bèo, autobus w Hà Nội o 16:30 (pierwowzór); [Vietnamtourism.com](https://www.vietnamtourism.com/en/how-to-get-to-cat-ba-island-vietnam-the-complete-2026-transport-guide) (1.07.2026): samochód z promem 3–4 h; [LocalVietnam](https://localvietnam.com/hanoi/from-cat-ba-to-hanoi/) (3.07.2026): autobus z promem 3,5–4,5 h, ok. 170 km; GoAsia: limuzyna z promem 4 h 30 min. Audyt pierwowzoru: realnie 4–4,5 h, 3,5 h to wariant optymistyczny. (9.10.2026) |
| hanoi – caobang | 6,5 | [Vietnamtourism.com](https://www.vietnamtourism.com/en/how-to-get-to-cao-bang) (31.05.2026): samochód prywatny 5–6 h, 300–320 km; [North-Vietnam.com](https://north-vietnam.com/halong-bay-to-cao-bang/) (X 2026): samochód do Cao Bằng lub Bản Giốc 5,5–10 h; Vietnam Airlines, przewodnik †: 6–7 h, ok. 280 km; Daytrip †: 270 km, 5–6 h. Audyt pierwowzoru: 6 h to wariant optymistyczny, autostrady nie będzie przed Tết 2027. Pierwowzór miał 6 w jedną stronę i 7 w drugą; biorę środek. (9.10.2026) |
| hanoi – babe | 5,25 | [LocalVietnam](https://localvietnam.com/bac-kan/ba-be/from-hanoi-to-ba-be-lake/) (15.06.2026): ok. 240 km, samochód prywatny 5–5,5 h, wahadło turystyczne ok. 5 h; Frontier Travel †, Kimkim †: ok. 5 h; Discovery DMC †: 5–6 h; North-Vietnam.com †: limuzyna ok. 5 h, autobus lub samochód 6–7 h. Mediana ok. 5,25. (9.10.2026) |
| hanoi – puluong | 4,25 | [LocalVietnam](https://localvietnam.com/thanh-hoa/pu-luong/from-hanoi-to-pu-luong/) (2.07.2026): samochód ok. 4 h, limuzyna 4–4,5 h, 130–180 km; [Hanoi Eco Tour](https://hanoiecotour.com/hanoi-to-pu-luong/): ok. 4 h z przerwą, 177 km; [Baolau](https://www.baolau.com/s/Pu-Luong/Hanoi) (przykładowe odjazdy na 14.10.2026): autobus 4–5 h, limuzyny 4 h 30 min, 145 km; Vietnam Trail Series: 5 h. Mediana 4,25. (9.10.2026) |
| puluong – ninhbinh | 3,5 | [Hanoi Eco Tour](https://hanoiecotour.com/ninh-binh-to-pu-luong-transfer/) (poradnik z 2023): 3 h transferem prywatnym z przerwą na kawę (pierwowzór); [Exotravel](https://www.exotravel.com/tours/vietnam/puluong-ninh-binh-halong/): 130 km, 3,5 h w programie wycieczki; [Baolau](https://www.baolau.com/en/s/pu-luong/ninh-binh/) (przykładowe odjazdy na 14.10.2026): 142 km, autobus 3–4 h, limuzyny 3,5–4 h. Środki czterech podanych liczb (3; 3,5; 3,5; 3,75 h: poradnik z 2023, Exotravel, Baolau autobus, Baolau limuzyny) mają medianę 3,5 h; według reguły z sekcji „Jak czytać” (mediana środków przedziałów) to wartość typowa, a nie najbardziej optymistyczna (korekta po przeglądzie, 10.10.2026). (9.10.2026) |
| puluong – catba | 7,5 | **Szacunek** (brak źródła dla przejazdu bezpośredniego). Metoda: suma puluong – ninhbinh (3,5) i ninhbinh – catba (4,5) to 8, a bez wjazdu w Tam Cốc ok. 7,5 (korekta po przeglądzie, 10.10.2026); przy puluong – ninhbinh równym 3 ta sama metoda dawała 7. Opiera się na: wierszach puluong – ninhbinh i ninhbinh – catba oraz na odległości z [Rome2Rio](https://www.rome2rio.com/s/Pu-Luong/C%C3%A1t-B%C3%A0): 329 km (jego 5 h 18 min z promem to dolna granica); Bookaway †: autobus ok. 8 h. Uwaga: ponad 6 h w jeden dzień. (9.10.2026) |
| ninhbinh – catba | 4,5 | [Geckoroutes](https://vps.geckoroutes.com/vietnam/ninh-binh-to-catba/) (strona z napisem „updated 2 months ago”): samochód prywatny ok. 4 h 30 min, autobus z promem 4–4,5 h; [Hanoi Eco Tour](https://hanoiecotour.com/ninh-binh-to-cat-ba-transfer/) (1.09.2026): 4–4,5 h (3 h do przystani Đồng Bài, prom 0,5 h, 40 min do Bến Bèo); [LocalVietnam](https://localvietnam.com/hai-phong/cat-ba-island/from-ninh-binh-to-cat-ba/) (2.07.2026): 123 km, 4,5–5 h z promem; [Baolau](https://www.baolau.com/s/Cat-Ba/Ninh-Binh) (przykładowe odjazdy na 14.10.2026): autobus 4 h 30 min. Pierwowzór (Geckoroutes i Baolau z 12.08.2026) przyjął 4 h; te same strony podają dziś 4,5. (9.10.2026) |
| ninhbinh – caobang | 9,25 | Opiera się na dwóch źródłach: [Vietnamtourism.com](https://www.vietnamtourism.com/en/how-to-get-to-cao-bang) (31.05.2026): 7–9 h przez Hà Nội (środek 8) i [North-Vietnam.com](https://north-vietnam.com/?p=77286) (VIII 2026): samochód 9–12 h, ok. 370 km przez Hà Nội (środek 10,5). Mediana tych dwóch środków to 9,25 (korekta po przeglądzie, 10.10.2026); wartość nie jest już szacunkiem. Odległość wg [Rome2Rio](https://www.rome2rio.com/s/Cao-B%E1%BA%B1ng/Ninh-B%C3%ACnh): 362 km (jego 4 h 34 min to dolna granica). Uwaga: ponad 9 h w jeden dzień. (9.10.2026) |
```

na:

```markdown
| hanoi – catba | 4 | [Full Moon](https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/): koniec rejsu o 12:00 w Bến Bèo, autobus w Hà Nội o 16:30 (pierwowzór); [Vietnamtourism.com](https://www.vietnamtourism.com/en/how-to-get-to-cat-ba-island-vietnam-the-complete-2026-transport-guide) (1.07.2026): samochód z promem 3–4 h; [LocalVietnam](https://localvietnam.com/hanoi/from-cat-ba-to-hanoi/) (3.07.2026): autobus z promem 3,5–4,5 h, ok. 170 km; GoAsia: limuzyna z promem 4 h 30 min. Środki podanych przedziałów to 3,5–4,5 h, więc 3,5 h to wariant optymistyczny. (9.10.2026) |
| hanoi – caobang | 6,5 | [Vietnamtourism.com](https://www.vietnamtourism.com/en/how-to-get-to-cao-bang) (31.05.2026): samochód prywatny 5–6 h, 300–320 km; [North-Vietnam.com](https://north-vietnam.com/halong-bay-to-cao-bang/) (X 2026): samochód do Cao Bằng lub Bản Giốc 5,5–10 h; Vietnam Airlines, przewodnik †: 6–7 h, ok. 280 km; Daytrip †: 270 km, 5–6 h. Nowej autostrady na tej trasie nie będzie przed Tết 2027 ([komunikat rządu z 29.09.2026](https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/9/506_tb-vpcp_29092026_1-signed.signed.pdf), według nazwy pliku 506/TB-VPCP; znany z audytu pierwowzoru z 8–9.10.2026, pliku nie otwierałem ponownie), więc 6 h to wariant optymistyczny. Pierwowzór miał 6 w jedną stronę i 7 w drugą; biorę środek. (9.10.2026) |
| hanoi – babe | 5,25 | [LocalVietnam](https://localvietnam.com/bac-kan/ba-be/from-hanoi-to-ba-be-lake/) (15.06.2026): ok. 240 km, samochód prywatny 5–5,5 h, wahadło turystyczne ok. 5 h; Frontier Travel †, Kimkim †: ok. 5 h; Discovery DMC †: 5–6 h; North-Vietnam.com †: limuzyna ok. 5 h, autobus lub samochód 6–7 h. Mediana ok. 5,25. (9.10.2026) |
| hanoi – puluong | 4,25 | [LocalVietnam](https://localvietnam.com/thanh-hoa/pu-luong/from-hanoi-to-pu-luong/) (2.07.2026): samochód ok. 4 h, limuzyna 4–4,5 h, 130–180 km; [Hanoi Eco Tour](https://hanoiecotour.com/hanoi-to-pu-luong/): ok. 4 h z przerwą, 177 km; [Baolau](https://www.baolau.com/s/Pu-Luong/Hanoi) (przykładowe odjazdy na 14.10.2026): autobus 4–5 h, limuzyny 4 h 30 min, 145 km; Vietnam Trail Series: 5 h. Mediana 4,25. (9.10.2026) |
| puluong – ninhbinh | 3,5 | [Hanoi Eco Tour](https://hanoiecotour.com/ninh-binh-to-pu-luong-transfer/) (poradnik z 2023): 3 h transferem prywatnym z przerwą na kawę (pierwowzór); [Exotravel](https://www.exotravel.com/tours/vietnam/puluong-ninh-binh-halong/): 130 km, 3,5 h w programie wycieczki; [Baolau](https://www.baolau.com/en/s/pu-luong/ninh-binh/) (przykładowe odjazdy na 14.10.2026): 142 km, autobus 3–4 h, limuzyny 3,5–4 h. Środki czterech podanych liczb (3; 3,5; 3,5; 3,75 h: poradnik z 2023, Exotravel, Baolau autobus, Baolau limuzyny) mają medianę 3,5 h; według reguły z sekcji „Jak czytać” (mediana środków przedziałów) to wartość typowa, a nie najbardziej optymistyczna (decyzja z 10.10.2026). (9.10.2026) |
| puluong – catba | 7,5 | **Szacunek** (brak źródła dla przejazdu bezpośredniego). Metoda: suma puluong – ninhbinh (3,5) i ninhbinh – catba (4,5) to 8, a bez wjazdu w Tam Cốc ok. 7,5 (decyzja z 10.10.2026); przy puluong – ninhbinh równym 3 ta sama metoda dawała 7. Opiera się na: wierszach puluong – ninhbinh i ninhbinh – catba oraz na odległości z [Rome2Rio](https://www.rome2rio.com/s/Pu-Luong/C%C3%A1t-B%C3%A0): 329 km (jego 5 h 18 min z promem to dolna granica); Bookaway †: autobus ok. 8 h. Uwaga: ponad 6 h w jeden dzień. (9.10.2026) |
| ninhbinh – catba | 4,5 | [Geckoroutes](https://vps.geckoroutes.com/vietnam/ninh-binh-to-catba/) (strona z napisem „updated 2 months ago”): samochód prywatny ok. 4 h 30 min, autobus z promem 4–4,5 h; [Hanoi Eco Tour](https://hanoiecotour.com/ninh-binh-to-cat-ba-transfer/) (1.09.2026): 4–4,5 h (3 h do przystani Đồng Bài, prom 0,5 h, 40 min do Bến Bèo); [LocalVietnam](https://localvietnam.com/hai-phong/cat-ba-island/from-ninh-binh-to-cat-ba/) (2.07.2026): 123 km, 4,5–5 h z promem; [Baolau](https://www.baolau.com/s/Cat-Ba/Ninh-Binh) (przykładowe odjazdy na 14.10.2026): autobus 4 h 30 min. Pierwowzór (Geckoroutes i Baolau z 12.08.2026) przyjął 4 h; te same strony podają dziś 4,5. (9.10.2026) |
| ninhbinh – caobang | 9,25 | Opiera się na dwóch źródłach: [Vietnamtourism.com](https://www.vietnamtourism.com/en/how-to-get-to-cao-bang) (31.05.2026): 7–9 h przez Hà Nội (środek 8) i [North-Vietnam.com](https://north-vietnam.com/?p=77286) (VIII 2026): samochód 9–12 h, ok. 370 km przez Hà Nội (środek 10,5). Mediana tych dwóch środków to 9,25 (decyzja z 10.10.2026); wartość nie jest już szacunkiem. Odległość wg [Rome2Rio](https://www.rome2rio.com/s/Cao-B%E1%BA%B1ng/Ninh-B%C3%ACnh): 362 km (jego 4 h 34 min to dolna granica). Uwaga: ponad 9 h w jeden dzień. (9.10.2026) |
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
Dopisać razem z lotami z sekcji „Loty bezpośrednie” (werdykt niżej).
```

na:

```markdown
Te drogi są w danych od 9.10.2026, razem z lotami z sekcji „Loty bezpośrednie” (werdykt niżej).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
Wszystkie 13 tras z listy ma bezpośrednie loty w zimowym rozkładzie 2026/27, więc żadnej nie trzeba usuwać.
```

na:

```markdown
Wszystkie 13 tras ze startowej listy (zob. „Różnice względem wartości startowych”) ma bezpośrednie loty w zimowym rozkładzie 2026/27, więc żadnej nie trzeba usuwać.
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
| DAD – PQC | 1,8 | VJ 2 dziennie w każdą stronę (1 h 45 min; jeden lot powrotny 1 h 35 min). W rozkładzie nie ma lotów VN. Lata też Sun PhuQuoc Airways (spoza listy przewoźników z planu; wg LocalVietnam razem ok. 5 lotów dziennie). | Flightmapper: [DAD→PQC](https://info.flightmapper.net/route/YY_DAD_PQC), [PQC→DAD](https://info.flightmapper.net/route/YY_PQC_DAD) (od 29.03.2026 bez daty końca); [LocalVietnam](https://localvietnam.com/phu-quoc/from-da-nang-to-phu-quoc/) (4.07.2026): ok. 1 h 45 min. (9.10.2026) |
```

na:

```markdown
| DAD – PQC | 1,8 | VJ 2 dziennie w każdą stronę (1 h 45 min; jeden lot powrotny 1 h 35 min). W rozkładzie nie ma lotów VN. Lata też Sun PhuQuoc Airways (spoza trzech przewoźników, których liczę, zob. „Jak czytać”; wg LocalVietnam razem ok. 5 lotów dziennie). | Flightmapper: [DAD→PQC](https://info.flightmapper.net/route/YY_DAD_PQC), [PQC→DAD](https://info.flightmapper.net/route/YY_PQC_DAD) (od 29.03.2026 bez daty końca); [LocalVietnam](https://localvietnam.com/phu-quoc/from-da-nang-to-phu-quoc/) (4.07.2026): ok. 1 h 45 min. (9.10.2026) |
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
Inne bezpośrednie loty z tych lotnisk widoczne w rozkładach, ale rzadkie i poza zakresem planu, więc nie dopisywać bez decyzji: HPH – PQC (VJ 4 razy w tygodniu, 2 h 5 min), HPH – VCA (VJ 3 razy w tygodniu, 2 h 5 min), HPH – DLI (VJ 4 razy w tygodniu od 19.08.2026 wg planu; w rozkładzie zimowym jeszcze bez wierszy). Dla THD – VCA i THD – DLI nie ma stron tras w Flightmapper, więc bez wierszy w rozkładzie ([Flightmapper HPH→PQC](https://info.flightmapper.net/route/YY_HPH_PQC), [HPH→VCA](https://info.flightmapper.net/route/YY_HPH_VCA), [HPH→DLI](https://info.flightmapper.net/route/YY_HPH_DLI)). Lotu THD – DAD w rozkładach nie ma, choć angielska Wikipedia wymienia Đà Nẵng przy Thọ Xuân (przypis z 2020).
```

na:

```markdown
Inne bezpośrednie loty z tych lotnisk widoczne w rozkładach, ale rzadkie i spoza listy tras, więc nie ma ich w danych: HPH – PQC (VJ 4 razy w tygodniu, 2 h 5 min), HPH – VCA (VJ 3 razy w tygodniu, 2 h 5 min), HPH – DLI (VJ 4 razy w tygodniu od 19.08.2026 wg planu; w rozkładzie zimowym jeszcze bez wierszy). Dla THD – VCA i THD – DLI nie ma stron tras w Flightmapper, więc bez wierszy w rozkładzie ([Flightmapper HPH→PQC](https://info.flightmapper.net/route/YY_HPH_PQC), [HPH→VCA](https://info.flightmapper.net/route/YY_HPH_VCA), [HPH→DLI](https://info.flightmapper.net/route/YY_HPH_DLI)). Lotu THD – DAD w rozkładach nie ma, choć angielska Wikipedia wymienia Đà Nẵng przy Thọ Xuân (przypis z 2020).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
- **Cát Bi (HPH): tak, dodać.** Ma bezpośrednie loty z SGN (VJ 7 dziennie, VN 2–3 dziennie, ok. 2 h) i z DAD (VJ 1–2 dziennie, VN 1 dziennie, 1 h 15 min–1 h 20 min) w rozkładzie od 25.10.2026. Dojazd do Cát Bà to 1,75 h, czyli mniej niż 3 h. Dopisać: droga HPH – catba (1,75), loty HPH – SGN (2) i HPH – DAD (1,3).
- **Thọ Xuân (THD): tak, dodać.** Ma bezpośrednie loty z SGN (VJ 6 dziennie, VN 3 dziennie, ok. 2 h), ale nie z DAD. Dojazd: do Pù Luông 2,5 h (przedział 2–3 h, więc górna granica równa limitowi), do Ninh Bình 2 h. Dopisać: drogi THD – puluong (2,5) i THD – ninhbinh (2), lot THD – SGN (2).
```

na:

```markdown
- **Cát Bi (HPH): tak, w danych od 9.10.2026.** Ma bezpośrednie loty z SGN (VJ 7 dziennie, VN 2–3 dziennie, ok. 2 h) i z DAD (VJ 1–2 dziennie, VN 1 dziennie, 1 h 15 min–1 h 20 min) w rozkładzie od 25.10.2026. Dojazd do Cát Bà to 1,75 h, czyli mniej niż 3 h. W danych: droga HPH – catba (1,75), loty HPH – SGN (2) i HPH – DAD (1,3).
- **Thọ Xuân (THD): tak, w danych od 9.10.2026.** Ma bezpośrednie loty z SGN (VJ 6 dziennie, VN 3 dziennie, ok. 2 h), ale nie z DAD. Dojazd: do Pù Luông 2,5 h (przedział 2–3 h, więc górna granica równa limitowi), do Ninh Bình 2 h. W danych: drogi THD – puluong (2,5) i THD – ninhbinh (2), lot THD – SGN (2).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
- **Spoza listy przewoźników z planu:** Sun PhuQuoc Airways lata DAD – PQC, a VASCO (grupa Vietnam Airlines, ATR 72) lata Cần Thơ – Đà Lạt raz dziennie, we wrześniu i październiku 5 razy w tygodniu ([Giáo dục](https://giaoduc.net.vn/cang-hkqt-lien-khuong-mo-cua-tro-lai-sau-hon-5-thang-cac-chuyen-bay-chinh-thuc-duoc-noi-lai-post262255.gd), 19.08.2026). VCA – DLI nie ma na liście z planu, więc go nie dopisuję; czasu lotu nie sprawdzałem.
```

na:

```markdown
- **Spoza trzech liczonych przewoźników:** Sun PhuQuoc Airways lata DAD – PQC, a VASCO (grupa Vietnam Airlines, ATR 72) lata Cần Thơ – Đà Lạt raz dziennie, we wrześniu i październiku 5 razy w tygodniu ([Giáo dục](https://giaoduc.net.vn/cang-hkqt-lien-khuong-mo-cua-tro-lai-sau-hon-5-thang-cac-chuyen-bay-chinh-thuc-duoc-noi-lai-post262255.gd), 19.08.2026). VCA – DLI nie ma na startowej liście 13 tras, więc nie ma go w danych; czasu lotu nie sprawdzałem.
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
Z 31 dróg ze startowej listy zmieniło się 15, z 13 lotów zmieniło się 7. Lotów do usunięcia nie ma.
```

na:

```markdown
Startowa lista to drogi i loty z planu 1A z 9.10.2026 (`notes/plans/2026-10-09-etap-1a-silnik.md`), w większości wzięte z pierwowzoru. Z 31 dróg ze startowej listy zmieniło się 15, z 13 lotów zmieniło się 7. Lotów do usunięcia nie ma.
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
- SGN – cattien: 4 → 3,75. Źródła podają 3–4 h: Vietnamtourism.com (18.09.2026) i Wikivoyage ok. 3 h, Mr Linh Adventure 3,5 h, operatorzy ok. 4 h z korkiem w mieście. Mediana wszystkich tych liczb, liczonych tak, jak są wypisane w wierszu, to 3,75 (korekta po przeglądzie, 10.10.2026).
```

na:

```markdown
- SGN – cattien: 4 → 3,75. Źródła podają 3–4 h: Vietnamtourism.com (18.09.2026) i Wikivoyage ok. 3 h, biuro Mr Linh's Adventures 3,5 h, operatorzy ok. 4 h z korkiem w mieście. Mediana wszystkich tych liczb, liczonych tak, jak są wypisane w wierszu, to 3,75 (decyzja z 10.10.2026).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
- HAN – puluong: 4 → 5,25. Z lotniska 5–5,5 h wg Vietnam Trail Series, jedynego źródła dla samej pary (środek 5,25); z centrum ok. 4 h (korekta po przeglądzie, 10.10.2026).
```

na:

```markdown
- HAN – puluong: 4 → 5,25. Z lotniska 5–5,5 h wg Vietnam Trail Series, jedynego źródła dla samej pary (środek 5,25); z centrum ok. 4 h (decyzja z 10.10.2026).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
- puluong – ninhbinh: 3 → 3,5. Środki czterech podanych liczb (3; 3,5; 3,5; 3,75 h) mają medianę 3,5 h; według reguły z sekcji „Jak czytać” (mediana środków przedziałów) to wartość typowa, a nie najbardziej optymistyczna (korekta po przeglądzie, 10.10.2026). Jedyne 3 h podaje poradnik z 2023 z przerwą na kawę.
- puluong – catba: 6 → 7,5. Suma odcinków 3,5 + 4,5 to 8, bez wjazdu w Tam Cốc ok. 7,5; odległość 329 km (Rome2Rio). Liczone od nowego puluong – ninhbinh, czyli 3,5 h (korekta po przeglądzie, 10.10.2026).
- ninhbinh – catba: 4 → 4,5. Geckoroutes (samochód 4 h 30 min), Hanoi Eco Tour (4–4,5 h), LocalVietnam (4,5–5 h) i Baolau (autobus 4 h 30 min) dają 4,5; strony użyte w pierwowzorze podają dziś 4,5, nie 4.
- ninhbinh – caobang: 8 → 9,25. Przedziały 7–9 h (Vietnamtourism.com) i 9–12 h (North-Vietnam.com); mediana ich środków (8 i 10,5) to 9,25, więc wartość nie jest już szacunkiem (korekta po przeglądzie, 10.10.2026).
```

na:

```markdown
- puluong – ninhbinh: 3 → 3,5. Środki czterech podanych liczb (3; 3,5; 3,5; 3,75 h) mają medianę 3,5 h; według reguły z sekcji „Jak czytać” (mediana środków przedziałów) to wartość typowa, a nie najbardziej optymistyczna (decyzja z 10.10.2026). Jedyne 3 h podaje poradnik z 2023 z przerwą na kawę.
- puluong – catba: 6 → 7,5. Suma odcinków 3,5 + 4,5 to 8, bez wjazdu w Tam Cốc ok. 7,5; odległość 329 km (Rome2Rio). Liczone od nowego puluong – ninhbinh, czyli 3,5 h (decyzja z 10.10.2026).
- ninhbinh – catba: 4 → 4,5. Geckoroutes (samochód 4 h 30 min), Hanoi Eco Tour (4–4,5 h), LocalVietnam (4,5–5 h) i Baolau (autobus 4 h 30 min) dają 4,5; strony użyte w pierwowzorze podają dziś 4,5, nie 4.
- ninhbinh – caobang: 8 → 9,25. Przedziały 7–9 h (Vietnamtourism.com) i 9–12 h (North-Vietnam.com); mediana ich środków (8 i 10,5) to 9,25, więc wartość nie jest już szacunkiem (decyzja z 10.10.2026).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
- SGN – PQC: 1 → 1,1. Średnia z rozkładu ok. 1 h 3 min (VJ 1 h–1 h 5 min, VN 1 h w jedną stronę i 1 h 10 min w drugą), zaokrąglona w górę; strona Vietnam Airlines podaje „ok. 1 h” (drobna korekta, można zostawić 1).
```

na:

```markdown
- SGN – PQC: 1 → 1,1. Średnia z rozkładu ok. 1 h 3 min (VJ 1 h–1 h 5 min, VN 1 h w jedną stronę i 1 h 10 min w drugą), zaokrąglona w górę; strona Vietnam Airlines podaje „ok. 1 h” (drobna korekta).
```

W `research/polaczenia-2026-10.md` zamień:

```markdown
Decyzja z sesji 13.10.2026 (etap 3, partia A, lista ustaleń, pkt 12). Dwie drogi z tabel wyżej były dłuższe niż objazd złożony z innych wierszy, więc silnik ich nie używał: liczył przejazd przez Hà Nội, a droga z lotniska do Pù Luông traciła przez to swój tekst w karcie.
```

na:

```markdown
Decyzja z 13.10.2026 (plan 1 partii A etapu 3, `notes/plans/2026-10-13-etap-3a1-miejsca.md`, ustalenie 12). Dwie drogi z tabel wyżej były dłuższe niż objazd złożony z innych wierszy, więc silnik ich nie używał: liczył przejazd przez Hà Nội, a droga z lotniska do Pù Luông traciła przez to swój tekst w karcie.
```

W `research/sezony-2026-10.md` zamień:

```markdown
- Plik scala dwie połowy researchu z 9.10.2026 (południe i centrum: 7 miejsc, północ: 6 miejsc) i przelicza każdy miesiąc według reguł z sekcji „Zasady oceny”.
- Liczby i źródła pochodzą z połówek. Przy scalaniu dopisano:
  - brakujące godziny słońca, z tych samych tabel Wikipedii;
  - temperaturę morza na Phú Quốc (W2T);
  - noclegi z planów dni pierwowzoru (PR1).
- X nie wystąpiło nigdzie.
- Względem połówek zmieniło się 11 liter, żadna nie dotyczy Z ani X (sekcja „Zmiany przy ujednoliceniu”).
- Względem hipotezy roboczej różni się 12 kodów z 13. Zgodny jest tylko `hanoi` (sekcja „Różnice względem hipotezy”).
```

na:

```markdown
Research zrobiono 9.10.2026 w dwóch połowach (południe i centrum: 7 miejsc, północ: 6 miejsc), każdą z własnymi progami, według skali, stacji i roboczej hipotezy kodów z planu 1A (`notes/plans/2026-10-09-etap-1a-silnik.md`). Ten plik scala obie połowy: liczby i źródła pochodzą z nich, przy scalaniu dopisano brakujące godziny słońca z tych samych tabel Wikipedii, temperaturę morza na Phú Quốc (W2T) i noclegi z planów dni pierwowzoru (PR1), a każdy miesiąc przeliczono według jednego zestawu progów z sekcji „Zasady oceny”. Dlatego po tabelach miejsc stoją dwie sekcje z historią tej metody: „Zmiany przy ujednoliceniu” (11 liter innych niż w połówkach, żadna nie dotyczy Z ani X) i „Różnice względem hipotezy” (różni się 12 kodów z 13, zgodny jest tylko `hanoi`). X nie wystąpiło nigdzie.
```

W `research/sezony-2026-10.md` zamień:

```markdown
Jeden zestaw progów dla wszystkich 13 miejsc i 12 miesięcy. Skala jest ta z briefu:
```

na:

```markdown
Jeden zestaw progów dla wszystkich 13 miejsc i 12 miesięcy. Skala pochodzi z planu 1A:
```

W `research/sezony-2026-10.md` zamień:

```markdown
- **Chłód przy pochmurnym niebie:** to „chłód i mgła” ze skali w briefie.
```

na:

```markdown
- **Chłód przy pochmurnym niebie:** to „chłód i mgła” ze skali w planie 1A.
```

W `research/sezony-2026-10.md` zamień:

```markdown
| ninhbinh | Nam Định (K5); kontrola: Thanh Hóa (K6) | zastępcza; brief dopuszcza obie, Nam Định leży bliżej |
```

na:

```markdown
| ninhbinh | Nam Định (K5); kontrola: Thanh Hóa (K6) | zastępcza; plan 1A dopuszczał obie, Nam Định leży bliżej |
```

W `research/sezony-2026-10.md` zamień:

```markdown
  - Sezony ryżu: sekcja „Do zapamiętania na później”.
```

na:

```markdown
  - Sezony ryżu: sekcja „Pozostałe ustalenia”, „Do planów dni i zdarzeń”.
```

W `research/sezony-2026-10.md` zamień:

```markdown
  - Niska woda nie jest osobnym kryterium. Miesiące z niską wodą mają S za chłód, a pierwowzór pokazuje grudniową niską wodę jako atut (turkusowe baseny). Szczegóły: „Do zapamiętania na później”.
```

na:

```markdown
  - Niska woda nie jest osobnym kryterium. Miesiące z niską wodą mają S za chłód, a pierwowzór pokazuje grudniową niską wodę jako atut (turkusowe baseny). Szczegóły: „Pozostałe ustalenia”, „Do planów dni i zdarzeń”.
```

W `research/sezony-2026-10.md` zamień:

```markdown
## Do zapamiętania na później
```

na:

```markdown
## Pozostałe ustalenia
```

W `research/sezony-2026-10.md` zamień:

```markdown
  - Pierwowzór planuje Bản Giốc „w późnopopołudniowym świetle”, więc przy niskiej wodzie trzeba sprawdzić godziny zrzutu.
  - B1 jest niespójne: FAQ podaje szczyt w lipcu–październiku, a tekst mówi o wrześniu i początku października.
- **Ba Bể:** od lipca 2026 obowiązuje zakaz kajaków, SUP i pływania bez zabezpieczeń, a rejsy pasażerskie pływają (P2). Plan z kajakiem warto zamienić na łódź.
```

na:

```markdown
  - Pierwowzór planował Bản Giốc „w późnopopołudniowym świetle”. Od 10.10.2026 plan dnia stawia wodospad w środku dnia, gdy w porze suchej spada najwięcej wody (`research/plany-dni-2026-10.md`, sekcja „caobang”).
  - B1 jest niespójne: FAQ podaje szczyt w lipcu–październiku, a tekst mówi o wrześniu i początku października.
- **Ba Bể:** od lipca 2026 obowiązuje zakaz kajaków, SUP i pływania bez zabezpieczeń, a rejsy pasażerskie pływają (P2). Od 10.10.2026 plan dnia płynie łodzią (`research/plany-dni-2026-10.md`, sekcja „babe”).
```

W `research/sezony-2026-10.md` zamień:

```markdown
  - Prasa z lipca 2026 (tuoitre.vn, vietnamplus.vn) pisze o przekazaniu parku pod zarząd miasta Đồng Nai, więc komunikaty mogą wkrótce pochodzić z innej strony. Przed publikacją warto je sprawdzić jeszcze raz.
```

na:

```markdown
  - Prasa z lipca 2026 (tuoitre.vn, vietnamplus.vn) pisze o przekazaniu parku pod zarząd miasta Đồng Nai, więc komunikaty mogą wkrótce pochodzić z innej strony.
```

W `research/sezony-2026-10.md` zamień:

```markdown
Litera zmieniłaby się przy niewielkiej zmianie jednej liczby albo przy drugim źródle. To lista do ewentualnej korekty progów:
```

na:

```markdown
Litera zmieniłaby się przy niewielkiej zmianie jednej liczby albo przy drugim źródle, więc w tych miesiącach ocena jest najmniej pewna:
```

W `research/swieta-2026-10.md` zamień:

```markdown
- **Ograniczenie danych:** wiersz ma tylko daty, rodzaj i nazwę, bez znacznika szacunku. Strona pokaże więc szacowane dni tak samo jak ogłoszone (sekcja 5).
```

na:

```markdown
- **Ograniczenie danych:** wiersz ma tylko daty, rodzaj i nazwę, bez znacznika szacunku (ogłoszone wiersze mają tylko komentarz w `site2/src/holidays.js`). Strona pokazuje więc szacowane dni tak samo jak ogłoszone: w ostrzeżeniu o Tết i o każdym święcie, także ogłoszonym, przed datami stoi „ok.” (teksty `alert.tet` i `alert.holiday` w `site2/src/ui.js`).
```

W `research/swieta-2026-10.md` zamień:

```markdown
- **Decyzja:** rząd (wicepremier) wyraził zgodę 2.10.2026 na wniosek ministerstwa (wnioski 10033/TTr-BNV z 11.09.2026 i 10137/TTr-BNV z 14.09.2026), pismo Biura Rządu 10065/VPCP-KGVX. Minister ogłosił to zawiadomieniem 11483/TB-BNV z 9.10.2026.
```

na:

```markdown
- **Strona źródła:** serwis rządowy aktualizuje stronę z zawiadomieniem 11483/TB-BNV w miejscu: jej adres mówi „de-xuat” (propozycja), a 10.10.2026 stała pod nim już treść zawiadomienia, więc tekst pod tym adresem może się jeszcze zmienić.
- **Decyzja:** rząd (wicepremier) wyraził zgodę 2.10.2026 na wniosek ministerstwa (wnioski 10033/TTr-BNV z 11.09.2026 i 10137/TTr-BNV z 14.09.2026), pismo Biura Rządu 10065/VPCP-KGVX. Minister ogłosił to zawiadomieniem 11483/TB-BNV z 9.10.2026.
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
Dane dla zadań 7 i 8 planu 1B (pole `hard` w dniach miejsc): które z 13 miejsc ma dzień wyraźnie trudniejszy od zwykłego, co to za dzień, kto go prowadzi, kiedy go nie ma i ile kosztuje. Adresy otwarto 10.10.2026 (poza oznaczonymi †, zob. „Jak czytać”), późniejsze zmiany nie są uwzględnione. Noc w Hà Nội w drodze (`hanoiStop`) jest poza zakresem.
```

na:

```markdown
Dane do pola `hard` w dniach miejsc, czyli do trudnych dni na poziomie „ekstremalnie”: które z 13 miejsc ma dzień wyraźnie trudniejszy od zwykłego, co to za dzień, kto go prowadzi, kiedy go nie ma i ile kosztuje. Adresy otwarto 10.10.2026 (poza oznaczonymi †, zob. „Jak czytać”). Późniejsze ustalenia mają własną datę, a uzupełnienia z 13 i 14.10.2026 są na końcu pliku. Noc w Hà Nội w drodze (`hanoiStop`) jest poza zakresem.
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
  - **catba:** dzień wspinaczki skałkowej albo deep water soloing z operatorem (`p` 4). Najsłabiej udokumentowany z trzech: uprawnienia operatorów znam tylko z ich własnych stron.
  - **Reszta** dostaje dzień zwykły. Albo nic nie jest trudniejsze od zwykłego dnia (saigon, mekong, phuquoc, hanoi, ninhbinh), albo trudniejsze dni są wielodniowe (dalat, babe), albo nie ma udokumentowanego produktu z uprawnieniami (hoian, caobang). Huế ma tylko Bạch Mã, a to moduł partii B.
- **Najważniejsze znaleziska poza werdyktami:**
  - Kajaki na zatokach Cát Bà są zawieszone od 15.11.2024. Nie znalazłem urzędowej wiadomości o zniesieniu, a źródła komercyjne są sprzeczne. Zwykły dzień `p` 2 w Cát Bà (rejs) mówi o kajaku, więc zadanie 8 musi to sprawdzić (sekcja „catba”).
```

na:

```markdown
  - **catba** (na razie bez trudnego dnia, decyzja z 10.10.2026): dzień wspinaczki skałkowej albo deep water soloing z operatorem (`p` 4). Najsłabiej udokumentowany z trzech: uprawnienia operatorów znam tylko z ich własnych stron.
  - **Reszta** dostaje dzień zwykły. Albo nic nie jest trudniejsze od zwykłego dnia (saigon, mekong, phuquoc, hanoi, ninhbinh), albo trudniejsze dni są wielodniowe (dalat, babe), albo nie ma udokumentowanego produktu z uprawnieniami (hoian, caobang). Huế ma tylko Bạch Mã, a to moduł partii B.
- **Najważniejsze znaleziska poza werdyktami:**
  - Kajaki na zatokach Cát Bà są zawieszone od 15.11.2024. Nie znalazłem urzędowej wiadomości o zniesieniu, a źródła komercyjne są sprzeczne; 14.10.2026 stan był ten sam (sekcja „Uzupełnienie 14.10.2026”). Zwykły dzień `p` 2 w Cát Bà (rejs) mówił w pierwowzorze o kajaku, a od 10.10.2026 płynie bambusową łodzią (sekcja „catba” i `research/plany-dni-2026-10.md`).
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
- **Trudny dzień** (kryteria z planu 1B, zadanie 3):
```

na:

```markdown
- **Trudny dzień** (kryteria z 10.10.2026):
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
  - ustalenie o Tà Năng z 17.5.2026 mówi to samo o wejściu do lasu: 4–6 mln VND (`research/ta-nang-2026-10.md`).
```

na:

```markdown
  - ustalenie o Tà Năng z 17.5.2026 mówi to samo o wejściu do lasu: 4–6 mln VND (`research/ta-nang-2026-10.md`);
  - numer dekretu 146/2026/NĐ-CP znam tylko z artykułu DT-0819, a tekstu dekretu nie czytałem. Artykuł o Bát Xát (TT-0518) podaje przy tych samych kwotach kar (4–6 i 6–10 mln VND) inny przepis: art. 11 dekretu 168/2024/NĐ-CP z 26.12.2024 (odczyt z 13.10.2026 w `research/sapa-2026-10.md`, sekcja „Bezpieczeństwo i przepisy”). Który numer jest właściwy, nie ustaliłem.
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
- **Ryzyka:** pijawki w porze deszczowej (IV–XI), strumienie przelewające się przez ścieżki, ślisko, brak zasięgu, owady przez cały rok (park radzi środek odstraszający) (CT-www, CT-2024, CT-prog, SEZ).
```

na:

```markdown
- **Ryzyka:** pijawki w porze deszczowej (IV–XI), strumienie przelewające się przez ścieżki, ślisko, brak zasięgu, owady przez cały rok (park radzi środek odstraszający) (CT-www, CT-2024, CT-prog, SEZ). Do tego dzikie zwierzęta: w jeziorze żyją na wolności krokodyle syjamskie, od których wzięło nazwę (Bàu Sấu znaczy „Jezioro Krokodyli”); nocą widać przy brzegu ich oczy, a jeziora nie odgradza żaden płot (CT-VNE-CS). Programy parku o zwierzętach nad jeziorem nie piszą (CT-prog). Nad wodą, zwłaszcza po zmroku, trzymaj się strażnika.
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
- **Cena** (cennik parku obowiązujący od 1.6.2024 do wydania nowego, pobrany 10.10.2026; wartości zbiorcze w ostatnim wierszu):
```

na:

```markdown
- **Cena** (cennik parku dla gości krajowych, obowiązujący od 1.6.2024 do wydania nowego, pobrany 10.10.2026; wartości zbiorcze z przewodnikiem w ostatnim wierszu):
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
  | **razem, bez przewodnika i z przewodnikiem w bungalowie** | 1 155 000–1 705 000 VND/os. | **40–59** | |

  Dla jednej osoby auto i przewodnik się nie dzielą: 65–103 EUR. Ceny pokoi, aut i przewodników rosną o 20% w dni świąteczne (Tết, 30.4–1.5, 2.9 i inne dni państwowe). Pokoje w VIII–X są tańsze o 20%, ale nie na Bàu Sấu (CT-ceny).
- **Zastępuje:** `p` 2 „Gibony i Jezioro Krokodyli”. Zwykły `p` 2 ma `early: true` (wyjście przed świtem ze strażnikiem), a trudny dzień wyjeżdża do 14:00, więc musi mieć własne `early: false`. Następnego ranka trzeba przejść 5 km do 9:00, więc dalszy przejazd (do Đà Lạt ok. 4,5 h) zaczyna się koło południa: to zdanie do tekstu. Przy pobycie na jedną noc dzień `p` 1 ma wersję `solo` (przyjazd po południu), która tego dnia nie pomieści, więc trudnego dnia przy jednej nocy nie ma.
```

na:

```markdown
  | **razem z przewodnikiem po angielsku, w pokoju trzyosobowym albo w bungalowie** | 1 580 000–1 705 000 VND/os. | **54–59** | |

  Plan wymaga przewodnika (wizja, pkt 5), więc kwota zbiorcza go zawiera. Bez przewodnika, którego park nie narzuca, dzień kosztuje od 1 155 000 VND/os. (40 EUR), a z przewodnikiem po wietnamsku od 1 480 000 VND/os. (51 EUR). Dla jednej osoby auto, przewodnik i pokój się nie dzielą: z przewodnikiem po angielsku 94–103 EUR (bez przewodnika od 65 EUR). Ceny pokoi, aut i przewodników rosną o 20% w dni świąteczne (Tết, 30.4–1.5, 2.9 i inne dni państwowe). Pokoje w VIII–X są tańsze o 20%, ale nie na Bàu Sấu (CT-ceny).

  CT-ceny to cennik dla gości krajowych, a cen dla cudzoziemców ta notatka nie sprawdzała. Według `research/ceny-2026-10.md` (11.10.2026) cennik parku nie ma osobnych cen dla cudzoziemców, a przewodnik turystyczny Potoo z 1.5.2026 (CT-POT w tamtym pliku) podaje cudzoziemcom te same ceny promu i Bàu Sấu; czy tak samo jest z pokojami, autem, przewodnikiem i posiłkami, nie wiadomo.
- **Zastępuje:** `p` 2 „Gibony i Jezioro Krokodyli”. Zwykły `p` 2 ma `early: true` (wyjście przed świtem ze strażnikiem), a trudny dzień wyjeżdża do 14:00, więc musi mieć własne `early: false`. Następnego ranka trzeba przejść 5 km do 9:00, więc dalszy przejazd (do Đà Lạt ok. 4,5 h) zaczyna się koło południa, i tak mówi tekst dnia („w dalszą podróż ruszysz koło południa”). Przy pobycie na jedną noc dzień `p` 1 ma wersję `solo` (przyjazd po południu), która tego dnia nie pomieści, więc trudnego dnia przy jednej nocy nie ma.
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
- Zmiana z przeglądu zadania 7: dzień `p` 3 w Đà Lạt to teraz Lang Biang zamiast Tà Năng, z zastrzeżeniem, że szlak bywa zamknięty (zob. `research/plany-dni-2026-10.md`).
```

na:

```markdown
- Zmiana z 10.10.2026: dzień `p` 3 w Đà Lạt to teraz Lang Biang zamiast Tà Năng, z zastrzeżeniem, że szlak bywa zamknięty (zob. `research/plany-dni-2026-10.md`).
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
**Decyzja z przeglądu (10.10.2026):** na razie bez trudnego dnia na Cát Bà, bo licencje operatorów wspinaczki i DWS są tylko deklarowane; do ponownego sprawdzenia w etapie 3.
```

na:

```markdown
**Decyzja z 10.10.2026:** na razie bez trudnego dnia na Cát Bà, bo licencje operatorów wspinaczki i DWS są tylko deklarowane. Ponowne sprawdzenie z 13.10.2026 dało ten sam werdykt (sekcja „Uzupełnienie 13.10.2026: Cát Bà, trudny dzień”).
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
  - Quyết định 253/2025/QĐ-UBND (31.12.2025, wg wyników wyszukiwania w mocy od 12.1.2026; tekst decyzji nie otworzył się†) dopuszcza usługi turystyczne na zatokach Cát Bà tylko w miejscach, trasach i punktach dozwolonych przez władze. Nie ustaliłem, czy dozwolono miejsca do DWS (CB-253).
```

na:

```markdown
  - Quyết định 253/2025/QĐ-UBND (31.12.2025, wg wyników wyszukiwania w mocy od 12.1.2026, co 13.10.2026 potwierdził też BHP-0108; tekst decyzji się nie otworzył) dopuszcza usługi turystyczne na zatokach Cát Bà tylko w miejscach, trasach i punktach dozwolonych przez władze. Nie ustaliłem, czy dozwolono miejsca do DWS (CB-253).
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
- **Zastępuje:** `p` 4 „Việt Hải i park narodowy” (wędrówka, jedyny dzień o tempie `hike`). **Uwaga:** `stopDays` bierze `n` planów o najniższym `p`, więc przy 3 nocach wchodzą `p` 1–3, a dnia `p` 4 w planie nie ma. Trudny dzień widać więc tylko przy 4 nocach. Przy trzech nocach można go dopiąć do `p` 3 (po rejsie łódź dobija ok. 12:00, więc zostaje popołudnie na półdniowe DWS). To decyzja zadania 8.
```

na:

```markdown
- **Zastępuje:** `p` 4 „Việt Hải i park narodowy” (wędrówka, jedyny dzień o tempie `hike`). **Uwaga:** `stopDays` bierze `n` planów o najniższym `p`, więc przy 3 nocach wchodzą `p` 1–3, a dnia `p` 4 w planie nie ma. Trudny dzień widać więc tylko przy 4 nocach. Przy trzech nocach można go dopiąć do `p` 3 (po rejsie łódź dobija ok. 12:00, więc zostaje popołudnie na półdniowe DWS). Wybór zostaje na czas, gdy Cát Bà dostanie trudny dzień (na razie go nie ma, decyzja z 10.10.2026).
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
## Uwagi dla zadań 7 i 8

1. **Tylko trzy dni dostają `hard`:** cattien `p` 2 (zadanie 7), puluong `p` 2 i catba `p` 4 (zadanie 8). Pozostałe dziesięć miejsc zostaje bez `hard`, więc na poziomie 3 dostaje dzień zwykły (decyzja z sesji 10.10.2026). Test z zadania 8 („co najmniej jeden dzień z `hard`”) przejdzie.
2. **Pole `off` według propozycji:** cattien `[8, 9, 10]`, puluong `[5, 6, 7, 8, 9]`, catba `[7, 8, 9]`. Tylko dla Cát Bà są udokumentowane zakazy; dla dwóch pozostałych to reguła sezonu opisana w „Jak czytać”.
3. **Teksty trudnych dni:** każdy mówi, z kim się idzie (zarządca albo operator z uprawnieniami), jakie jest pozwolenie i jakie ryzyko, bez cen i linków (to etap 2).
   - **cattien:** park sprzedaje nocleg na stacji strażników; wyjazd z siedziby do 14:00, powrót 5 km pieszo przed 9:00.
   - **puluong:** lokalny przewodnik, najlepiej przez rezerwat; pijawki i błoto w porze deszczowej.
   - **catba:** operator z certyfikatem na wspinaczkę, numer do sprawdzenia; zależność od pływu.
4. **Dziedziczenie:** trudny dzień Cát Tiên musi mieć własne `early: false`, bo zwykły `p` 2 ma `early: true`. Pozostałe dwa nie mają `early`.
5. **Cát Bà `p` 4** wchodzi do planu tylko przy 4 nocach (zob. sekcja „catba”). To rozwiązanie zadania 8.
6. **Kajaki w zwykłych dniach:** `p` 2 w Cát Bà (rejs: „kajaki, wizyta w pływającej wiosce”) i `p` 2 w Ba Bể („łódź albo kajak”) mówią o kajaku, a od 15.11.2024 (Cát Bà) i lipca 2026 (Ba Bể) usługi kajakowe są zawieszone albo zakazane. W Ba Bể zadanie 8 już to ma w liście poprawek. W Cát Bà dodatkowo nie powinno obiecywać kajaka w dniu `p` 2 i ma wpisać tę zmianę do `research/plany-dni-2026-10.md`.
```

na:

```markdown
## Uwagi do planów dni (10.10.2026)

1. **Trzy dni z werdyktem „tak”:** cattien `p` 2, puluong `p` 2 i catba `p` 4 (na razie bez trudnego dnia, decyzja z 10.10.2026). Pozostałe dziesięć miejsc zostaje bez `hard`, więc na poziomie 3 dostaje dzień zwykły (decyzja z sesji 10.10.2026). Test treści (`tests/content.test.js`) sprawdza, że co najmniej jeden dzień ma `hard`.
2. **Pole `off` według propozycji:** cattien `[8, 9, 10]`, puluong `[5, 6, 7, 8, 9]`, catba `[7, 8, 9]`. Tylko dla Cát Bà są udokumentowane zakazy; dla dwóch pozostałych to reguła sezonu opisana w „Jak czytać”.
3. **Teksty trudnych dni:** każdy mówi, z kim się idzie (zarządca albo operator z uprawnieniami), jakie jest pozwolenie i jakie ryzyko, bez cen i linków, które strona podaje osobno, w części „Przed wyjazdem”.
   - **cattien:** park sprzedaje nocleg na stacji strażników, a przewodnika parku rezerwuje się razem z noclegiem, bo plan go wymaga; wyjazd z siedziby do 14:00, powrót 5 km pieszo przed 9:00.
   - **puluong:** lokalny przewodnik, najlepiej przez rezerwat; pijawki i błoto w porze deszczowej.
   - **catba:** operator z certyfikatem na wspinaczkę, numer do sprawdzenia; zależność od pływu.
4. **Dziedziczenie:** trudny dzień Cát Tiên ma własne `early: false`, bo zwykły `p` 2 ma `early: true`. Pozostałe dwa nie mają `early`.
5. **Cát Bà `p` 4** wchodziłby do planu tylko przy 4 nocach (zob. sekcja „catba”). Wróci to razem z trudnym dniem, którego Cát Bà na razie nie ma (decyzja z 10.10.2026).
6. **Kajaki w zwykłych dniach:** w pierwowzorze `p` 2 w Cát Bà (rejs: „kajaki, wizyta w pływającej wiosce”) i `p` 2 w Ba Bể („łódź albo kajak”) mówiły o kajaku, a od 15.11.2024 (Cát Bà) i lipca 2026 (Ba Bể) usługi kajakowe są zawieszone albo zakazane. Od 10.10.2026 oba dni płyną łodzią, a zmiany opisuje `research/plany-dni-2026-10.md` (sekcje „catba” i „babe”).
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
| TT-0518 | Kinh tế Sài Gòn Online w Tuổi Trẻ: zakaz trekkingu bez zezwolenia na szczytach Bát Xát (Lào Cai), Tam Đảo Bắc, Chư Yang Sin, norma TCVN 14602:2026. | https://tuoitre.vn/saigontimes/cam-trekking-tu-phat-loat-dinh-nui-noi-tieng-o-mien-bac-1061229857.htm | prasa | 18.5.2026 |
```

na:

```markdown
| TT-0518 | Kinh tế Sài Gòn Online w Tuổi Trẻ: zakaz trekkingu bez zezwolenia na szczytach Bát Xát (Lào Cai), Tam Đảo Bắc, Chư Yang Sin, norma TCVN 14602:2026; kary 4–6 i 6–10 mln VND według art. 11 dekretu 168/2024/NĐ-CP (odczyt z 13.10.2026 w `research/sapa-2026-10.md`, SP-TT0518). | https://tuoitre.vn/saigontimes/cam-trekking-tu-phat-loat-dinh-nui-noi-tieng-o-mien-bac-1061229857.htm | prasa | 18.5.2026 |
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
| CT-prog | Programy parku z noclegiem w Bàu Sấu (3N2D-TLBO: stacja bez wi-fi, zasięgu i klimatyzacji, kolacja ze strażnikami) i z dniem w Bàu Sấu (2N1D-BS). | https://cattiennationalpark.com.vn/wp-content/uploads/2023/01/3N2D-TLBO.pdf ; https://cattiennationalpark.com.vn/wp-content/uploads/2023/01/2N1D.BS_.pdf | urzędowe (park) | 1.2023 (miesiąc w adresie plików) |
```

na:

```markdown
| CT-VNE-CS | VnExpress: noc na stacji strażników nad Bàu Sấu; w jeziorze żyją na wolności krokodyle syjamskie, nocą przy brzegu świecą setki par ich oczu, bez ogrodzenia; nocleg 200 000 VND od osoby, słaby zasięg telefonu. | https://vnexpress.net/ngu-dem-o-dam-day-ca-sau-4147123.html | prasa | 16.8.2020 (odczyt 14.10.2026) |
| CT-prog | Programy parku z noclegiem w Bàu Sấu (3N2D-TLBO: stacja bez wi-fi, zasięgu i klimatyzacji, kolacja ze strażnikami) i z dniem w Bàu Sấu (2N1D-BS). | https://cattiennationalpark.com.vn/wp-content/uploads/2023/01/3N2D-TLBO.pdf ; https://cattiennationalpark.com.vn/wp-content/uploads/2023/01/2N1D.BS_.pdf | urzędowe (park) | 1.2023 (miesiąc w adresie plików) |
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
| CB-253 | Portal Cát Hải: Quyết định 253/2025/QĐ-UBND o zasadach turystyki na zatokach archipelagu Cát Bà (tekst decyzji nie otworzył się†). | https://cathai.haiphong.gov.vn/thong-tin-du-lich/hai-phong-ban-hanh-quy-che-quan-ly-hoat-dong-du-lich-tren-cac-vinh-thuoc-quan-dao-cat-ba-843442 | urzędowe | brak |
```

na:

```markdown
| CB-253 | Portal Cát Hải: Quyết định 253/2025/QĐ-UBND o zasadach turystyki na zatokach archipelagu Cát Bà. Strona się otworzyła, a tekst decyzji w załączniku nie (zob. CB-253PDF w „Uzupełnieniu 13.10.2026”). | https://cathai.haiphong.gov.vn/thong-tin-du-lich/hai-phong-ban-hanh-quy-che-quan-ly-hoat-dong-du-lich-tren-cac-vinh-thuoc-quan-dao-cat-ba-843442 | urzędowe | brak |
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
| catba | tak: wspinaczka albo DWS z operatorem (warunek: certyfikat) | 4 | VII–IX (zakazy wypłynięć 2023–2026) | CB-CBC, CB-CBV, CB-AO, CB-WC, CB-LS, CB-GCN, CB-253, CB-K1, CB-K2, CB-IS, CB-VT, SEZ |
```

na:

```markdown
| catba | tak (na razie bez trudnego dnia, decyzja z 10.10.2026): wspinaczka albo DWS z operatorem (warunek: certyfikat) | 4 | VII–IX (zakazy wypłynięć 2023–2026) | CB-CBC, CB-CBV, CB-AO, CB-WC, CB-LS, CB-GCN, CB-253, CB-K1, CB-K2, CB-IS, CB-VT, SEZ |
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
| KURS-NBP | Kurs NBP z zadania: 1 EUR = 29 055 VND, 1 USD = 25 901 VND (etykieta KURS w tamtym pliku). | `research/lotniska-2026-10.md` | własne badanie | 11.10.2026 |
```

na:

```markdown
| KURS-NBP | Kurs NBP z tabel A 197/A/NBP/2026 (9.10.2026) i B 040/B/NBP/2026 (7.10.2026): 1 EUR = 29 055 VND, 1 USD = 25 901 VND (etykieta KURS w tamtym pliku). | `research/lotniska-2026-10.md` | własne badanie | 11.10.2026 |
```

W `research/trudne-dni-2026-10.md` zamień:

```markdown
| VNE-0615 | VnExpress: zderzenie statku Minh Anh z łodzią Bảy Hoa w rejonie Vạn Bội 14.6.2026, jedna ofiara, obie jednostki z ważnymi przeglądami. | https://vnexpress.net/nhan-chung-vu-tau-chim-o-vinh-lan-ha-chi-kip-nghe-coi-canh-bao-hai-giay-5085991.html | prasa | 15.6.2026 |
```

na:

```markdown
| VNE-0615 | VnExpress: zderzenie statku Minh Anh z łodzią Bảy Hoa w rejonie Vạn Bội 14.6.2026, jedna ofiara, obie jednostki z ważnymi przeglądami. | https://vnexpress.net/nhan-chung-vu-tau-chim-o-vinh-lan-ha-chi-kip-nghe-coi-canh-bao-hai-giay-5085991.html | prasa | 15.6.2026 |

## Uzupełnienie 14.10.2026: Cát Bà, kajaki i Cannon Fort

Stan na 14.10.2026, sprawdzony przed publikacją (WebSearch i WebFetch, po wietnamsku i angielsku; adresy otwarto 14.10.2026). Względem „Uzupełnienia 13.10.2026” nic się nie zmieniło.

- **Kajaki:** urzędowego zniesienia zawieszenia dalej nie ma. Armator pisze, że zawieszenie na podstawie pisma 483/TB-UBND obowiązuje od 1.2.2026 do odwołania w całej zatoce Lan Hạ, razem z jaskiniami Sáng – Tối (CB-2026-10-14a). Teksty promocyjne, także w prasie, opisują kajaki jak zwykłą atrakcję, bez podstawy prawnej (CB-2026-10-14b, CB-2026-10-14c).
- **Dozwolone miejsca:** urzędowej listy miejsc do pływania kajakiem nie ma. Zatwierdzenia trzech stref zaproponowanych w 2024 roku (Cửa Cái – Minh Tự, Vạn Tà, Ba Đình; BHP-1206) dalej nie widać, a tekstu decyzji 253/2025/QĐ-UBND nadal nie udało się przeczytać (CB-253PDF).
- **Cannon Fort (Pháo đài Thần Công):** komunikatu o ponownym otwarciu nie ma. Najnowsze źródła z datą, które opisują stan, mówią, że fort nie przyjmuje turystów i można najwyżej poprosić strażnicę o wejście (CB-VW i CB-NV w `research/plany-dni-2026-10.md`, CB-2026-10-14d). Portal komercyjny z 30.5.2026 opisuje fort jak czynny punkt widokowy z biletem 40 000 VND (CB-2026-10-14e), ale tę samą cenę podawały teksty z 2023 roku, a ten portal bywa niedokładny (`research/hagiang-2026-10.md`, „Jak czytać”).
- **Skutek:** dzień `p` 1 bez fortu i dzień `p` 2 bez kajaka zostają bez zmian.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| CB-2026-10-14a | Indochina Sails: zawieszenie kajaków na podstawie pisma 483/TB-UBND urzędu Cát Hải, od 1.2.2026 do odwołania, cała zatoka Lan Hạ z jaskiniami Sáng – Tối; zawieszenie dalej obowiązuje; dozwolonych stref brak. | https://www.indochinasails.com/en/blog/kayak-suspension-enhanced-bamboo-boat-experience-in-lan-ha-bay.html | operator | brak (© 1993–2026) |
| CB-2026-10-14b | Bhaya Cruises: kajaki opisane jako dostępne; strefy mogą się zmieniać, trzeba trzymać się tras ustalonych przez władze w 2026 roku; bez decyzji i bez zawieszenia. | https://bhayacruises.com/blog/lan-ha-bay/ | operator | 13.4.2026, aktualizacja 17.7.2026 |
| CB-2026-10-14c | Báo Văn hóa o sezonie 2026 na Cát Bà: kajak o zachodzie słońca na Lan Hạ wśród atrakcji; o zawieszeniu i o forcie nic. | https://baovanhoa.vn/du-lich/dieu-gi-se-tao-nen-con-sot-du-lich-cat-ba-nam-2026-216267.html | prasa | 1.4.2026 |
| CB-2026-10-14d | Lữ hành Việt Nam: fort nie przyjmuje już turystów, można poprosić strażnicę; usług brak; dawny bilet 40 000 VND. | https://luhanhvietnam.com.vn/du-lich/phao-dai-than-cong-cat-ba.html | blog (portal komercyjny) | 18.5.2023 |
| CB-2026-10-14e | vietnamtourism.com (portal komercyjny bez wydawcy): fort jako punkt widokowy z kawiarnią, bilet 40 000 VND; kajaki bez przewodnika po opłacie 40 000 VND w pływających domach, o zawieszeniu nic. | https://www.vietnamtourism.com/vi/nhung-ieu-nen-lam-tren-ao-cat-ba-cam-nang-ay-u-nam-2026 | blog (portal komercyjny) | aktualizacja 30.5.2026 |
```

W `site2/src/costs.js` zamień:

```js
    'cattien.bausau_night': { pp: [15, 15], group: [50, 88], night: true },
```

na:

```js
    'cattien.bausau_night': { pp: [15, 15], group: [79, 88], night: true },
```

- [ ] **Krok 2: Sprawdź**

```bash
bash tests/run.sh
grep -c $'\xc2\xa0' research/*.md | grep -v ":0$"
grep -n -i -E "zadani[eaou] [0-9]|przegląd(u|zie)? zadania|plan[ua]? 1B" research/plany-dni-2026-10.md research/trudne-dni-2026-10.md
git status --short
```

Oczekiwane:
- `ALL PASS`: test danych porównuje `cattien.bausau_night` z tabelą w `research/ceny-2026-10.md`;
- oba grepy nic nie wypisują;
- zmienione są tylko pliki z listy, a nowy jest `research/pierwowzor-2026-10.md`.

- [ ] **Krok 3: Commit**

```bash
git add research/ceny-2026-10.md research/plany-dni-2026-10.md research/polaczenia-2026-10.md research/sezony-2026-10.md research/swieta-2026-10.md research/trudne-dni-2026-10.md research/pierwowzor-2026-10.md site2/src/costs.js
git commit -F - <<'EOF'
Research przed upublicznieniem repo: robocze oznaczenia z planu 1B zastąpione datami decyzji, research połączeń bez odwołań do audytu spoza repo (komunikat rządu o autostradzie do Cao Bằng jako źródło), historia metody na początku researchu sezonów, „ok.” przy świętach i aktualizowana strona 11483/TB-BNV, Cát Tiên z przewodnikiem w cenie, cenami dla cudzoziemców i krokodylami w Bàu Sấu ze źródłem, dekret 146/2026 z jednego źródła, Cát Bà na 14.10.2026; nowy research/pierwowzor-2026-10.md ze źródłami faktów przeniesionych z pierwowzoru; noc nad Bàu Sấu w budżecie z przewodnikiem, którego wymaga tekst dnia (79–88 EUR za grupę zamiast 50–88)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: README, wizja, neutralne zdania i skrypt publikacji

Punkty 1, 4, 6 i 27 listy ustaleń:
- **`README.md`** po polsku:
  - czym jest strona i jej adres;
  - bez kont i liczników odwiedzin;
  - fakty z datą w `research/`;
  - zdjęcia z autorami i licencjami w stopce (obraz podglądu linku z autorem), kontury z Natural Earth, kroje na licencji OFL;
  - linia „©” z wizji;
  - zdanie, że repo nie ma wolnej licencji.

  Bez imienia i nazwiska.
- **`tools/publish.sh`** robi testy i build, a potem kopiuje `site2/out/pages` do `docs/` z `.nojekyll`. Z tego folderu na `main` GitHub Pages podaje stronę, jak przy stronie grudniowej. Skrypt niczego nie wysyła: commit i `git push` to osobne kroki zadania 11.
- **Neutralne zdania** (decyzja 3): w `CLAUDE.md` „planer grudniowego wyjazdu grupy (2026)”, w rozpoznaniu „grupa z niej korzysta”.
- **`CLAUDE.md`, „Jak sprawdzać”:**
  - nowe sondy;
  - `print.sh` na A4 z kodem 1;
  - `tools/licenses.sh` i `tools/publish.sh`;
  - kroje w `site2/fonts/` i flaga Chrome.
- **Wizja przejrzana z tym, co jest na stronie** (14.10.2026). Decyzje podjęte po 9.10.2026 stoją przy punktach, których dotyczą, z datą:
  - start bez wyszukiwarek;
  - „Ekstremalnie” według strony;
  - MSZ i motocykl;
  - ustawienia na pierwsze wejście;
  - „Przed wyjazdem”;
  - PDF;
  - reguły kolejności miejsc;
  - offline i kroje;
  - „Do sprawdzenia w researchu” jako sprawdzone, z linkami.

**Pliki:**
- Utwórz: `README.md`, `tools/publish.sh` (z prawem wykonania)
- Zmień: `CLAUDE.md`, `notes/wizja.md`, `notes/pomysl-planer-dla-znajomych.md`

- [ ] **Krok 1: Zmiany.**

```bash
python3 -I - <<'EOF'
# four lines about the December trip of the organiser and of the group, replaced whole by how they start, so this plan
# does not repeat them (decision 3)
def line(path, start, new):
    lines = open(path, encoding='utf-8').read().split('\n')
    hits = [i for i, l in enumerate(lines) if l.startswith(start)]
    assert len(hits) == 1, (path, start, len(hits))
    lines[hits[0]] = new
    open(path, 'w', encoding='utf-8').write('\n'.join(lines))
line('CLAUDE.md', '- **Pierwowzór: strona „Vietnam in December”,**',
     '- **Pierwowzór: strona „Vietnam in December”,** trójjęzyczny planer grudniowego wyjazdu grupy (2026).')
line('notes/pomysl-planer-dla-znajomych.md', '| Wersja łagodna ',
     '| Wersja łagodna (`e` przy dniu) | poziom przygody: spokojnie / aktywnie / ekstremalnie, na tym samym mechanizmie |')
line('notes/pomysl-planer-dla-znajomych.md', 'Badanie `vietnam-planner/notes/design-research/itinerary-benchmarks.md`',
     'Badanie `vietnam-planner/notes/design-research/itinerary-benchmarks.md` odradzało silnik planowania i suwaki. Dotyczyło jednak grupy, która ma w 10 minut wybrać jedną z kilku tras. Tu odbiorca jest inny: planuje sam i ma własne daty. Wnioski z badania nadal obowiązują:')
line('notes/pomysl-planer-dla-znajomych.md', '- **Strona grudniowa zostaje nietknięta:**',
     '- **Strona grudniowa zostaje nietknięta:** jej linki krążą w WhatsAppie i grupa z niej korzysta.')
print('4 lines')
EOF
```

W `CLAUDE.md` zamień:

```markdown
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`, `before.js`; sonda kończy się kodem 1, gdy któraś kontrola nie przejdzie;
  - `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]`: wydruk do PDF; podaje liczbę stron, prawie puste strony i linie zakryte ramkami;
  - słowo `MIESIAC` w ustawieniach zamienia się na miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu (`site2/src/before.js`) przez curl, bez zapisywania stron; kod 1, gdy któryś adres nie odpowiada 2xx.
```

na:

```markdown
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`, `before.js`, `publish.js` (kroje, `noindex`, podgląd linku), `pdf.js` (przycisk PDF, mapa i link w wydruku); sonda kończy się kodem 1, gdy któraś kontrola nie przejdzie;
  - `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]`: wydruk do PDF na A4; podaje format, liczbę stron, prawie puste strony i linie zakryte ramkami, a przy zakrytych liniach kończy się kodem 1;
  - słowo `MIESIAC` w ustawieniach zamienia się na miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu (`site2/src/before.js`) przez curl, bez zapisywania stron; kod 1, gdy któryś adres nie odpowiada 2xx.
- `bash tools/licenses.sh`: licencje i autorzy zdjęć (`site2/src/photos.js`) porównane z API Wikimedia Commons, tylko odczyt; kod 1 przy innej licencji albo braku pliku.
- `bash tools/publish.sh`: testy, build i kopia `site2/out/pages` w `docs/`, z którego GitHub Pages podaje stronę; commit i `git push` to osobne kroki, push tylko za zgodą użytkownika.
- Kroje (IBM Plex Sans, IBM Plex Mono, Newsreader) leżą w `site2/fonts/` z licencjami OFL; Chrome bez okna czyta je z dysku tylko z flagą `--allow-file-access-from-files`, którą mają `shot.sh`, `print.sh` i `probe.sh`.
```

Utwórz `README.md`:

```markdown
# Wietnam po swojemu

Planer trasy po Wietnamie: https://grzegorzfrskiba-hub.github.io/wietnam/

Ustawiasz termin, lotniska przylotu i wylotu, jedno albo dwa zainteresowania i poziom przygody, a strona układa trasę: miejsca, plan każdego dnia, przejazdy, mapę, sezon i budżet. Trasę możesz poprawić, wysłać linkiem albo zapisać jako PDF.

- Strona działa w przeglądarce, bez serwera, bez kont i bez liczników odwiedzin. Ustawienia trasy są w linku.
- Fakty i ceny pochodzą z notatek w `research/`, każdy ze źródłem i datą sprawdzenia. Rozkłady, ceny, godziny otwarcia i zasady w parkach się zmieniają, więc przed wyjazdem sprawdź je u przewoźnika i na miejscu.
- Linki rezerwacji prowadzą do oficjalnych stron i sprawdzonych operatorów, bez parametrów śledzących.

## Zdjęcia, mapa i kroje

- Zdjęcia pochodzą z Wikimedia Commons, na licencjach CC0, CC BY i CC BY-SA albo z domeny publicznej. Autor, licencja i link do strony każdego zdjęcia stoją w stopce strony i w `site2/src/photos.js`; te licencje obowiązują dalej. Obraz w podglądzie linku to zdjęcie „Łódź wiosłowa pod skałami Tràng An”, autor Jakub Hałun, CC BY 4.0.
- Kontury mapy: Natural Earth, domena publiczna.
- Kroje pisma: IBM Plex Sans, IBM Plex Mono i Newsreader na licencji SIL Open Font License 1.1 (pliki licencji w `site2/fonts/`).

## Prawa

© 2026 Wietnam po swojemu. Wszelkie prawa zastrzeżone.

Repo jest publiczne, ale nie ma wolnej licencji: kod, teksty i notatki można czytać, ale nie wolno ich kopiować ani rozpowszechniać bez zgody. Zdjęcia, kontury mapy i kroje mają własne licencje, opisane wyżej.
```

W `notes/wizja.md` zamień:

```markdown
Ustalona w sesji o wizji 9.10.2026. Tło i rozpoznanie: [pomysl-planer-dla-znajomych.md](pomysl-planer-dla-znajomych.md). Plan prac: [etapy.md](etapy.md).

```

na:

```markdown
Ustalona w sesji o wizji 9.10.2026. Tło i rozpoznanie: [pomysl-planer-dla-znajomych.md](pomysl-planer-dla-znajomych.md). Plan prac: [etapy.md](etapy.md).

Przejrzana z tym, co jest na stronie, 14.10.2026 (etap 4): decyzje podjęte później stoją przy punktach, których dotyczą, z datą.

```

W `notes/wizja.md` zamień:

```markdown
Strona od razu układa trasę po Wietnamie: miejsca, plan dni, przejazdy, mapę, sezon i budżet. Trasę można poprawić i wysłać linkiem. Strona nie podaje konkretnych lotów. Kod pochodzi z planera „Vietnam in December”.
```

na:

```markdown
Strona od razu układa trasę po Wietnamie: miejsca, plan dni, przejazdy, mapę, sezon i budżet. Trasę można poprawić, wysłać linkiem albo zapisać jako PDF. Strona nie podaje konkretnych lotów. Kod pochodzi z planera „Vietnam in December”.
```

W `notes/wizja.md` zamień:

```markdown
- **Docelowo:** każdy, kto planuje Wietnam samodzielnie. Narzędzie jest ogólne: dowolny miesiąc i dowolne daty. Może urosnąć poza grono znajomych, więc decyzje nie zamykają tej drogi (zob. „Otwarte drzwi”).

```

na:

```markdown
- **Docelowo:** każdy, kto planuje Wietnam samodzielnie. Narzędzie jest ogólne: dowolny miesiąc i dowolne daty. Może urosnąć poza grono znajomych, więc decyzje nie zamykają tej drogi (zob. „Otwarte drzwi”).
- **Start (decyzja z 14.10.2026):** najpierw kilka przygodowych osób dostaje sam adres strony i trzy pytania. Do tego czasu strona nie trafia do wyszukiwarek (`noindex`), a otwarcie zapada po ich opiniach.

```

W `notes/wizja.md` zamień:

```markdown
- **Ekstremalnie:** wielodniowe wyprawy z noclegiem w jaskini (Hang Én, Tú Làn), noce w dżungli, Tà Năng–Phan Dũng, Fansipan pieszo.
```

na:

```markdown
- **Ekstremalnie:** wyprawy z noclegiem w jaskini albo w górach (Hang Én na dwa dni, Fansipan pieszo na dwa dni) i noc w dżungli nad Bàu Sấu w Cát Tiên. Stan na 14.10.2026: Tú Làn jest na stronie tylko w jeden dzień, a Tà Năng–Phan Dũng czeka na partię B.
```

W `notes/wizja.md` zamień:

```markdown
  - tylko na pętlach, nie przez całą trasę.
```

na:

```markdown
  - tylko na pętlach, nie przez całą trasę;
  - MSZ odradza samodzielne podróże motocyklem po Wietnamie (Odyseusz, 30.06.2026). Ramka „Samodzielnie” zostaje bez tego zdania, a link do MSZ stoi w „Wjazd i zdrowie” (decyzja z 14.10.2026).
```

W `notes/wizja.md` zamień:

```markdown
- **Ustawienia na wierzchu:** termin, lotnisko przylotu i wylotu, zainteresowania (0–2) i poziom. Do wyboru są przyciski i pola dat, bez suwaków. Ustawienia domyślne na pierwsze wejście ustalimy w etapie 2.
```

na:

```markdown
- **Ustawienia na wierzchu:** termin, lotnisko przylotu i wylotu, zainteresowania (0–2) i poziom. Do wyboru są przyciski i pola dat, bez suwaków. Na pierwsze wejście strona bierze najlepszy miesiąc z 12 następnych (etap 2).
```

W `notes/wizja.md` zamień:

```markdown
- **Zamiany albo–albo** działają wewnątrz modułów, np. motocykl z kierowcą albo samodzielnie.
- **Budżet** opisuje pkt 7. Do tego **ostrzeżenia:** Tết, święta, zamknięcia.
- **Link z ustawieniami** (rozszerzony `variantHash`) i kopiowanie planu do WhatsAppa.
```

na:

```markdown
- **Zamiany albo–albo** działają wewnątrz modułów: motocykl z kierowcą albo samodzielnie w Cao Bằng, na przełęczy Hải Vân i w Hà Giang.
- **Budżet** opisuje pkt 7. Do tego **ostrzeżenia:** Tết, święta, zamknięcia.
- **„Przed wyjazdem”** (etap 2): budżet z podziałem i kwotą w pojedynkę, rezerwacje od najpilniejszej z linkami, wjazd i zdrowie, lista rzeczy do spakowania.
- **Link z ustawieniami** (rozszerzony `variantHash`), kopiowanie planu do WhatsAppa i zapis trasy jako PDF (przycisk „Zapisz trasę jako PDF”, wydruk na A4).
```

W `notes/wizja.md` zamień:

```markdown
  - „Dodaj” wymusza moduł, a „Usuń” go wyklucza.
```

na:

```markdown
  - „Dodaj” wymusza moduł, a „Usuń” go wyklucza;
  - miejsce najwyżej godzinę drogi od miasta lotniska stoi tuż przy nim, a trasa nie robi zygzaków samolotem w okolicy lotniska przylotu i wylotu (etap 3).
```

W `notes/wizja.md` zamień:

```markdown
- **Ryzyko do sprawdzenia na początku etapu 1:** czy prosta oś z odnogami i powrotem na to samo lotnisko daje sensowne trasy. Odnogi to Phú Quốc, Cát Bà, Cao Bằng i Ba Bể, później Hà Giang i Sa Pa. Najpierw mały prototyp na 12 miejscach, dopiero potem zamrażamy model modułu.
```

na:

```markdown
- **Ryzyko do sprawdzenia na początku etapu 1:** czy prosta oś z odnogami i powrotem na to samo lotnisko daje sensowne trasy. Odnogi to Phú Quốc, Cát Bà, Cao Bằng i Ba Bể, później Hà Giang i Sa Pa. Najpierw mały prototyp na 12 miejscach, dopiero potem zamrażamy model modułu. Sprawdzone w etapie 1A (10.10.2026): model zostaje.
```

W `notes/wizja.md` zamień:

```markdown
- **Offline:** PDF z wydruku twojej trasy (pierwowzór to umie) i lekki plik offline z mniejszymi zdjęciami. Decyzja w etapie 4.
```

na:

```markdown
- **Offline (decyzja z 14.10.2026):** PDF trasy z przycisku „Zapisz trasę jako PDF”, bo otworzy go każdy telefon. Lekki plik offline (ok. 6 MB, zdjęcia 640 px) zostaje w buildzie na komputer i Chrome na Androidzie, bez rozsyłania: iPhone pokazuje plik HTML w podglądzie bez skryptów, czyli prawie pusty.
- **Kroje** na własnym hostingu (`site2/fonts/`, licencja OFL): strona nie łączy się z Google Fonts, a plik offline ma kroje w środku.
```

W `notes/wizja.md` zamień:

```markdown
**Na później:** angielski, lotniska Phú Quốc i Cam Ranh, tempo jako ustawienie, podpowiedź „kiedy najlepiej jechać” dla profilu, własna domena.

## Do sprawdzenia w researchu

- daty Tết na lata 2027–2030 (z grubsza 6.02.2027 i 26.01.2028) oraz święta państwowe;
- ile dni Polacy mogą być w Wietnamie bez wizy (prawdopodobnie 45);
- samodzielna jazda motocyklem:
  - czy Wietnam uznaje polskie międzynarodowe prawo jazdy;
  - kategorie prawa jazdy po nowym prawie drogowym;
  - ubezpieczenia;
  - kontrole w Hà Giang;
- noclegi w dżungli: Cúc Phương, Pù Mát, Cát Tiên;
- sezon wypraw jaskiniowych w Phong Nha (według rozpoznania od końca stycznia).
```

na:

```markdown
**Na później:** angielski, lotniska Phú Quốc i Cam Ranh, tempo jako ustawienie, podpowiedź „kiedy najlepiej jechać” dla profilu, własna domena, otwarcie strony dla wyszukiwarek (po opiniach znajomych).

## Sprawdzone w researchu (stan 14.10.2026)

- daty Tết na lata 2027–2031 i święta państwowe: [research/swieta-2026-10.md](../research/swieta-2026-10.md);
- 45 dni bez wizy dla Polaków (uchwała 229/NQ-CP, do 14.08.2028): [research/wjazd-2026-10.md](../research/wjazd-2026-10.md);
- samodzielna jazda motocyklem (prawo jazdy, kategorie, ubezpieczenia, kontrole w Hà Giang): [research/motocykl-2026-10.md](../research/motocykl-2026-10.md) i [research/hagiang-2026-10.md](../research/hagiang-2026-10.md);
- noclegi w dżungli: Cát Tiên nad Bàu Sấu ([research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md)) i Cúc Phương ([research/cucphuong-2026-10.md](../research/cucphuong-2026-10.md)); Pù Mát w partii B;
- sezon wypraw jaskiniowych w Phong Nha: [research/phongnha-2026-10.md](../research/phongnha-2026-10.md).
```

Utwórz `tools/publish.sh`:

```bash
#!/bin/bash
# Prepares the public page for GitHub Pages: runs the tests, builds the page and puts site2/out/pages into docs/ (with
# .nojekyll, so Pages serves the files as they are), the folder Pages serves from the branch main. Nothing is sent: the
# commit of docs/ and git push are steps of their own, the push only with the owner's consent.
#   bash tools/publish.sh          then git add docs && git commit, and git push with consent
set -euo pipefail
cd "$(dirname "$0")/.."
bash tests/run.sh > /dev/null
python3 site2/build.py
rm -rf docs
cp -R site2/out/pages docs
touch docs/.nojekyll
echo "publish.sh: docs/ ready ($(du -sh docs | cut -f1)); next: git add docs && git commit, then git push with consent"
```

Nadaj skryptowi prawo wykonania:

```bash
chmod +x tools/publish.sh
```

- [ ] **Krok 2: Sprawdź**

```bash
bash tests/run.sh
grep -c $'\xc2\xa0' README.md CLAUDE.md notes/wizja.md notes/pomysl-planer-dla-znajomych.md
grep -n "^- \*\*Pierwowzór: strona" CLAUDE.md
grep -n "^- \*\*Strona grudniowa zostaje\|^| Wersja łagodna\|^Badanie \`vietnam-planner" notes/pomysl-planer-dla-znajomych.md
git status --short
```

Oczekiwane:
- `ALL PASS`;
- cztery zera;
- cztery linie z nowym, neutralnym brzmieniem, takim jak w skrypcie z kroku 1;
- zmienione są tylko `CLAUDE.md`, `notes/wizja.md` i `notes/pomysl-planer-dla-znajomych.md`, a nowe `README.md` i `tools/publish.sh`.

Przeczytaj `git diff notes/wizja.md` w całości: każda zmiana mówi, co jest na stronie 14.10.2026, a nic z wizji nie znika bez śladu.

- [ ] **Krok 3: Commit**

```bash
git add README.md tools/publish.sh CLAUDE.md notes/wizja.md notes/pomysl-planer-dla-znajomych.md
git commit -F - <<'EOF'
README z „©” i licencjami zdjęć, map i krojów, tools/publish.sh (testy, build i docs/ dla GitHub Pages, bez wysyłania), neutralne zdania o organizatorze w CLAUDE.md i w rozpoznaniu, nowe sposoby sprawdzania w CLAUDE.md; wizja przejrzana z tym, co jest na stronie 14.10.2026: start bez wyszukiwarek, „Ekstremalnie” według strony, MSZ i motocykl, „Przed wyjazdem”, PDF, reguły kolejności miejsc, offline i kroje, sprawdzony research

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 9: Punkt kontrolny etapu 4

Sprawdzenie całości przed końcowym przeglądem i publikacją. Sprawdzasz:
- pełny test, wszystkie sondy, linki, licencje i wydruk;
- liczby ze wszystkich tras: silnik się nie zmienił, więc mają być takie jak po planie 2 partii A;
- zrzuty i strony PDF;
- ręcznie to, czego Chrome bez okna nie pokaże;
- prawdziwy telefon, z PDF;
- całość razem z użytkownikiem.

Poprawki z przeglądu idą jako osobne commity (test, kod, `ALL PASS`, commit). Wynik przeglądu trafia do notatek w zadaniu 12.

**Pliki:**
- W repo nic nie przybywa, chyba że przegląd coś poprawi.
- Zrzuty, PDF-y i liczby idą do `$TMPDIR/wietnam-4/`.
- Do ręcznego sprawdzenia powstaje na chwilę `.claude/launch.json` (lokalny serwer); krok 7 go usuwa.

- [ ] **Krok 1: Pełny test, build i to, co zobaczy publiczne repo**

```bash
time bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"
grep -c $'\xc2\xa0' README.md CLAUDE.md notes/*.md research/*.md | grep -v ":0$"
grep -rn -i -E "kolegi|organizatora z|\b(VN|VJ|QH|VU|BL)[0-9]{3,4}\b" --include="*.md" --include="*.js" --include="*.py" --include="*.html" . | grep -v "^./site2/out/\|^./docs/\|^./notes/plans/"
```

Oczekiwane:
- `combos: 134784 months and 10368 dates (all)` i `ALL PASS` w ok. 100 s;
- build kończy się `offline file 6.4 MB`;
- trzy ostatnie polecenia nic nie wypisują: żadnej twardej spacji poza `var NB`, żadnej w notatkach i researchu, żadnych spraw prywatnych ani numerów lotów.

- [ ] **Krok 2: Wszystkie sondy**

```bash
bash "$TMPDIR/sondy-4.sh" MIESIAC
bash "$TMPDIR/sondy-4.sh" 2027-10
```

Oczekiwane: dwa razy `sondy (…): 0 z 16 nie przeszło`. Jeśli `$TMPDIR/sondy-4.sh` zniknął (np. po restarcie Maca), utwórz go jeszcze raz z zadania 1, krok 4.

- [ ] **Krok 3: Linki i licencje**

```bash
bash tools/links.sh
bash tools/licenses.sh
```

Oczekiwane:
- `links.sh`: wszystkie adresy z kodem 200 poza stroną Sapa O'Chau (kod 406: serwer odrzuca curla po kilku zapytaniach). Otwórz ją we wbudowanej przeglądarce. Inny adres bez 2xx też otwórz w przeglądarce, a zepsuty link zgłoś użytkownikowi;
- `licenses.sh: 87 photos, 0 licence problem(s), 0 author(s) to check`.

- [ ] **Krok 4: Wydruk trzech tras**

```bash
mkdir -p "$TMPDIR/wietnam-4"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' "$TMPDIR/wietnam-4/d1.pdf"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' "$TMPDIR/wietnam-4/d1-ciemny.pdf" dark
bash tests/print.sh 'od=HAN&do=SGN&miesiac=2027-03&dni=18&co=gory&poziom=3' "$TMPDIR/wietnam-4/d2.pdf"
bash tests/print.sh 'od=HAN&do=SGN&miesiac=2027-03&dni=18&co=gory&poziom=3' "$TMPDIR/wietnam-4/d2-ciemny.pdf" dark
bash tests/print.sh 'od=DAD&do=DAD&miesiac=2027-01&dni=30&co=gory,morze&poziom=3' "$TMPDIR/wietnam-4/d3.pdf"
bash tests/print.sh 'od=DAD&do=DAD&miesiac=2027-01&dni=30&co=gory,morze&poziom=3' "$TMPDIR/wietnam-4/d3-ciemny.pdf" dark
```

Oczekiwane, jak w suchej próbie: wszystkie na `210 x 297 mm`, `covered text lines: 0`, w obu motywach tyle samo stron: d1 12, d2 16, d3 21 (przed etapem 4 na formacie Letter: 13, 17 i 23).

- [ ] **Krok 5: Liczby ze wszystkich tras**

Silnik się nie zmienił, więc liczby mają być takie jak po planie 2 partii A. Skrypt z planu 3A2 (zadanie 7, krok 5) liczy teraz długie dni w obie strony (przyloty i wyloty) i drogi przez lotnisko bez lotu (ok. 60 s):

```bash
mkdir -p "$TMPDIR/wietnam-4"
cat > "$TMPDIR/wietnam-4/przeglad.js" <<'EOF'
// For the checkpoint of stage 4: over every combination of the month mode, how often each place is on a trip (all trips,
// trips with no interest) and its mean nights, and the numbers notes/etapy.md keeps after plan 2 of stage 3: a travel day
// with two flights, Cát Bà for 4 nights, Hà Nội three times, places at most 1.5 h apart by road not next to each other, a
// flight back near an earlier stop (3.5 h by road; not near the departure airport), a round trip that came home by plane
// in the middle and flew out again, a day with a flight of 8 h or more door to door (arrivals and departures alike), and
// a road through an airport without a flight there (Ninh Bình – Hà Giang by Nội Bài, Mekong – Cát Tiên by Tân Sơn Nhất).
var DA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function node(id) { return PLACES[id].node || id; }
var sets = [[]];
INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
var total = 0, plain = 0, on = {}, onPlain = {}, nights = {}, twoFlights = 0, catba = 0, catba4 = 0, hanoi3 = 0, apart = 0, back = 0, home = 0, long8 = 0, viaAir = {};
var R = DA.graph.road;
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
    if (legs.some(function (L) { return L.flights && L.total >= 8; })) long8++;
    var vias = {};
    legs.forEach(function (L) { L.segs.forEach(function (g, k) { var n = L.segs[k + 1]; if (n && g.mode === 'road' && n.mode === 'road' && AIRPORTS[g.to]) vias[[g.from, n.to].sort().join('–') + ' przez ' + g.to] = 1; }); });
    Object.keys(vias).forEach(function (v) { viaAir[v] = (viaAir[v] || 0) + 1; });
  }); }); }); });
function pc(n, of) { return (100 * n / of).toFixed(1).replace('.', ',') + '%'; }
print('Tras: ' + total + ' (bez zainteresowań: ' + plain + ')');
print('| Miejsce | Na trasach | Bez zainteresowań | Średnio nocy |');
print('|---|---|---|---|');
Object.keys(on).sort(function (a, b) { return on[b] - on[a]; }).forEach(function (id) {
  print('| ' + (CONTENT[id] ? CONTENT[id].short : id) + (PLACES[id].node ? ' (noc w drodze)' : '') + ' | ' + pc(on[id], total) + ' | ' + pc(onPlain[id] || 0, plain) + ' | ' + (nights[id] / on[id]).toFixed(2).replace('.', ',') + ' |');
});
print('Dzień z dwoma lotami: ' + pc(twoFlights, total) + ' tras. Cát Bà na 4 noce: ' + pc(catba4, catba) + ' pobytów w Cát Bà. Hà Nội trzy razy: ' + hanoi3 + ' tras. Miejsca do 1,5 h drogi od siebie, nie obok siebie: ' + apart + ' tras.');
print('Lot z powrotem w okolicę wcześniejszego miejsca (zygzak): ' + pc(back, total) + ' tras. Trasa w obie strony, która wróciła samolotem do domu w środku i znów odleciała: ' + home + ' tras.');
print('Dzień z lotem, 8 h i dłużej od drzwi do drzwi (przyloty i wyloty): ' + pc(long8, total) + ' tras.');
print('Droga przez lotnisko bez lotu: ' + Object.keys(viaAir).sort(function (a, b) { return viaAir[b] - viaAir[a]; }).map(function (v) { return v + ' ' + viaAir[v] + ' tras (' + pc(viaAir[v], total) + ')'; }).join('; ') + '.');
EOF
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
P=site2/src
"$J" $P/places.js $P/seasons.js $P/travel.js $P/engine.js $P/content.js $P/content/*.js "$TMPDIR/wietnam-4/przeglad.js" > "$TMPDIR/wietnam-4/przeglad.md"
cat "$TMPDIR/wietnam-4/przeglad.md"
```

Oczekiwane, jak w suchej próbie i w punkcie kontrolnym planu 2:
- Hà Giang na 28,0% tras (22,6% bez zainteresowań, 4,77 nocy), Sa Pa na 20,7% (16,7%, 3,56);
- Đà Nẵng 37,0%, Cát Bà 33,4%, Phong Nha 30,8%, Cúc Phương 19,7%, Pù Luông 9,1%, Ba Bể 8,0%, Cao Bằng 5,6%;
- dzień z dwoma lotami: 10,3%; Cát Bà na 4 noce: 70,9% pobytów;
- Hà Nội trzy razy: 1497 tras; bliskie miejsca nie obok siebie: 0;
- zygzak: 2,4%; powrót do domu w środku trasy: 0 tras;
- dzień z lotem 8 h i dłużej, w obie strony: 12,2%;
- droga przez lotnisko bez lotu: hagiang–ninhbinh przez HAN 7083 trasy (5,3%), cattien–mekong przez SGN 858 (0,6%).

Inna liczba znaczy, że coś zmieniło trasy: zatrzymaj się i znajdź przyczynę.

- [ ] **Krok 6: Zrzuty i strony PDF**

```bash
mkdir -p "$TMPDIR/wietnam-4"
Z1='od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang'
Z2='od=HAN&do=HAN&miesiac=2028-07&dni=30&co=&poziom=2'
bash tests/shot.sh "$Z1" 390 "$TMPDIR/wietnam-4/z1.png" 25000
bash tests/shot.sh "$Z2" 390 "$TMPDIR/wietnam-4/z2.png" 35000
# where the places to look at stand on each page (y from the top of the page, in px); \s also matches the no-break spaces
# the page puts inside names
cat > "$TMPDIR/wietnam-4/miejsca.js" <<'EOF'
setTimeout(function () {
  function y(el) { return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1; }
  var leg = Array.prototype.filter.call(document.querySelectorAll('.leg'), function (l) { return /Ninh\sBình\s→\sHà\sGiang/.test(l.textContent); })[0];
  [['leg', leg], ['copy', document.querySelector('.copy')], ['book', document.getElementById('b-book')],
   ['entry', document.getElementById('b-entry')], ['credits', document.querySelector('footer')]].forEach(function (p) { check('y ' + p[0] + ' ' + y(p[1]), true); });
  done();
}, 1500);
EOF
bash tests/probe.sh "$TMPDIR/wietnam-4/miejsca.js" 390 "$Z1" | grep '^ok   y ' > "$TMPDIR/wietnam-4/z1-y.txt"
bash tests/probe.sh "$TMPDIR/wietnam-4/miejsca.js" 390 "$Z2" | grep '^ok   y ' > "$TMPDIR/wietnam-4/z2-y.txt"
cat "$TMPDIR/wietnam-4/z1-y.txt" "$TMPDIR/wietnam-4/z2-y.txt"
python3 - "$TMPDIR/wietnam-4" <<'EOF'
# the pieces to look at with Read: around each place of each page, and the first pages of two printouts side by side
import os, sys
import fitz
from PIL import Image
d = sys.argv[1]
def pieces(name, wanted):
    im = Image.open(os.path.join(d, name + '.png'))
    for line in open(os.path.join(d, name + '-y.txt')):
        key, y = line.split()[2], int(line.split()[3])
        if key in wanted and y >= 0:
            im.crop((0, max(0, y - 60), im.width, min(im.height, y + wanted[key]))).save(os.path.join(d, '%s-%s.png' % (name, key)))
pieces('z1', {'leg': 420, 'copy': 520, 'book': 1500, 'credits': 1800})
pieces('z2', {'entry': 1100})
def sheet(pdf, pages, out):
    doc = fitz.open(os.path.join(d, pdf))
    ims = []
    for i in pages:
        pix = doc[i].get_pixmap(dpi=60)
        ims.append(Image.frombytes('RGB', (pix.width, pix.height), pix.samples))
    s = Image.new('RGB', (sum(i.width for i in ims) + 10 * (len(ims) - 1), max(i.height for i in ims)), (200, 200, 200))
    x = 0
    for i in ims: s.paste(i, (x, 0)); x += i.width + 10
    s.save(os.path.join(d, out))
sheet('d1.pdf', [0, 1, 2, 3], 'arkusz-d1.png')
sheet('d3.pdf', [0, 1, 2], 'arkusz-d3.png')
print(sorted(f for f in os.listdir(d) if f.endswith('.png') and f[:2] in ('z1', 'z2', 'ar') and '-' in f))
EOF
```

Obejrzyj kawałki i arkusze narzędziem Read i sprawdź:
- **z1** (Hà Nội w obie strony, październik, 14 dni, góry i kultura, Hà Giang „Samodzielnie”, 390 px):
  - karta przejazdu dnia 3: „Ninh Bình → Hà Giang”, jedna linia „Minibus typu limousine albo prywatny samochód”, 8 godz., „Długi dzień w drodze”;
  - pod listą „Nie ma na twojej trasie” dwa przyciski i podpowiedź PDF;
  - w „Zarezerwuj wcześniej” samochód z lotniska tylko do Ninh Bình, bez „w obie strony”;
  - w stopce podpisy zdjęć jako linki, nazwy licencji jako linki, „domena publiczna” po polsku, Natural Earth w „Uwagi”.
- **z2** (Hà Nội w obie strony, lipiec 2028, 30 dni, 390 px): w „Wjazd i zdrowie” zdanie „Twój wyjazd może skończyć się po 14.08.2028…”, a do tego e-wiza z evisa.gov.vn, karta przylotu i e-papierosy.
- **arkusze PDF** (d1, pierwsze cztery strony, i d3, strony z mapą):
  - pierwsza strona z linkiem „Ten plan na stronie: …” i bez „Kliknij dzień…”;
  - mapa w trzech kadrach na szerokość strony;
  - jedno zdjęcie na miejsce;
  - litery wietnamskie (Đồng Văn, Mã Pí Lèng) w kroju strony.

Na wszystkich zrzutach sprawdź też kroje: litery ą, ł, ộ, ữ, Đ w tym samym kroju co reszta tekstu.

- [ ] **Krok 7: Ręcznie w przeglądarce.** Chrome bez okna nie uruchamia IntersectionObserver i nie otwiera okna drukowania, a wbudowana przeglądarka nie otwiera `file://`, więc strona idzie z lokalnego serwera.
  - Utwórz `.claude/launch.json`:

    ```json
    {
      "version": "0.0.1",
      "configurations": [
        { "name": "strona-4", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765", "--directory", "site2/out/pages"], "port": 8765 }
      ]
    }
    ```

  - Uruchom serwer narzędziem `preview_start` (nazwa `strona-4`) i przejdź do `http://localhost:8765/#od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2`.
  - Ustaw widok `mobile` (`resize_window`) i sprawdź, przewijając i robiąc zrzuty ekranu:
    - pasek u góry, „Na górę”, przyciski „Kopiuj plan na WhatsApp” i „Zapisz trasę jako PDF” z podpowiedzią;
    - kroje: tytuł w Newsreader, tekst w IBM Plex Sans, a w narzędziach sieci żadnego zapytania do fonts.googleapis.com ani fonts.gstatic.com (`read_network_requests`).
  - Ustaw widok `desktop` i sprawdź:
    - podświetlanie znacznika na mapie przy przewijaniu;
    - powiększenie mapy: trzy kadry po kliknięciu i Escape, które je zamyka (kopie kadrów robi teraz `panelSvg`, wspólna z wydrukiem).
  - Klikaj po współrzędnych ze świeżego zrzutu, nie po `ref`: kliknięcie po `ref` najpierw przewija element na środek ekranu. Przycisku PDF nie klikaj w tej przeglądarce, bo okno drukowania zatrzymuje stronę; przycisk sprawdzają sonda `pdf.js` i telefon.
  - Zatrzymaj serwer (`preview_stop`) i usuń `.claude/launch.json` (oraz pusty katalog `.claude/`, jeśli nic innego w nim nie ma).

- [ ] **Krok 8: Prawdziwy telefon** (z użytkownikiem, w domowej sieci Wi-Fi). Najpierw zapytaj, czy użytkownik ma teraz telefon pod ręką, w tej samej sieci Wi-Fi co Mac. Jeśli tak:
  - podaj adres Maca i uruchom serwer w tle (narzędziem Bash z `run_in_background`). Serwuje on folder z dowiązaniami do zbudowanej strony i dwiema krótkimi stronami przekierowań, więc w telefonie wpisuje się tylko `<adres>:8766/1` i `<adres>:8766/2`:

    ```bash
    ipconfig getifaddr en0
    T="$TMPDIR/telefon-4"; rm -rf "$T"; mkdir -p "$T/1" "$T/2"
    ln -s "$PWD/site2/out/pages/index.html" "$T/index.html"; ln -s "$PWD/site2/out/pages/img" "$T/img"; ln -s "$PWD/site2/out/pages/fonts" "$T/fonts"
    printf '<meta http-equiv="refresh" content="0; url=/#od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2">' > "$T/1/index.html"
    printf '<meta http-equiv="refresh" content="0; url=/#od=HAN&do=HAN&miesiac=2028-07&dni=30&co=&poziom=2">' > "$T/2/index.html"
    python3 -m http.server 8766 --bind 0.0.0.0 --directory "$T"
    ```

  - macOS może zapytać, czy `python3` ma przyjmować połączenia przychodzące: to decyzja użytkownika.
  - Zanim użytkownik weźmie telefon do ręki, podaj mu od razu oba adresy z `ipconfig` i listę stuknięć:
    1. `<adres>:8766/1`:
       - przewiń pod listę „Nie ma na twojej trasie” i stuknij „Zapisz trasę jako PDF”;
       - na iPhonie w oknie drukowania stuknij Udostępnij u góry, potem „Zachowaj w Plikach”; na Androidzie wybierz u góry „Zapisz jako PDF”;
       - otwórz zapisany PDF (w trybie samolotowym, jeśli się da): na pierwszej stronie link do trasy, potem mapa w trzech kadrach i dni z polskimi i wietnamskimi literami;
       - na stronie karta „Ninh Bình → Hà Giang” z jedną drogą i 8 godz.
    2. `<adres>:8766/2`: w „Przed wyjazdem” → „Wjazd i zdrowie” zdanie o 14.08.2028, e-wiza, karta przylotu i e-papierosy. W stopce stuknięcie nazwy licencji otwiera jej tekst po polsku.

    Od razu uprzedź, że PDF z iPhone'a może mieć nagłówek sam na dole strony albo inny format papieru niż A4. To ograniczenie Safari (zob. „Na co uważać przy przeglądzie”, pkt 1), nie błąd strony; zanotuj, co widać.
  - Porównaj log serwera z listą: jeśli otworzył się tylko jeden adres, zapytaj spokojnie o drugi. Gdy użytkownik zgłosi problem, zapytaj o pozostałe punkty listy jednym pytaniem wielokrotnego wyboru.
  - Po sprawdzeniu zatrzymaj serwer i usuń `$TMPDIR/telefon-4`.

  Jeśli telefon nie łączy się z Makiem (zapora, sieć dla gości), zaproponuj prywatny artifact. Publikacja tylko po wyraźnym „tak” użytkownika: publish z `file_path = site2/out/web/index.html` i `files` = obrazy z `site2/out/web/img/` i kroje z `site2/out/web/fonts/`.

- [ ] **Krok 9: Przegląd z użytkownikiem**
  - Pokaż użytkownikowi w rozmowie:
    - arkusze z kroku 6: zrzuty z1 i z2, strony PDF;
    - liczby z kroku 5 i wynik kroków 1–4;
    - wynik ręcznego sprawdzenia i telefonu.
  - Do decyzji, po jednej sprawie, z rekomendacją: każda rzecz, która wyszła inaczej niż w suchej próbie (poprawić teraz albo zostawić na partię B).
  - Poprawki idą jako osobne commity: test, który nie przechodzi (gdzie się da), kod, `ALL PASS`, sondy, commit z opisem „Poprawka z punktu kontrolnego etapu 4: …”. Zmiana faktu najpierw trafia do researchu.
  - Wynik przeglądu zapisz jednym akapitem w `$TMPDIR/przeglad-4.txt`. Akapit mówi:
    - co przeszło, z liczbami z kroków 1–5;
    - co obejrzał użytkownik;
    - co poprawiono;
    - co przeszło do partii B.

    Zadanie 12 wpisze go do `notes/etapy.md`.

---

### Zadanie 10: Końcowy przegląd przed publikacją

Świeży recenzent na najmocniejszym modelu (Agent z modelem `fable`) patrzy na całość, zanim repo stanie się publiczne. W planach 2B, 3A1 i 3A2 taki przegląd znalazł rzeczy, których nie złapały sucha próba ani punkt kontrolny.

- [ ] **Krok 1: Zlecenie.** Uruchom recenzenta z zadaniem po angielsku, z wynikiem po polsku. Zlecenie podaje:
  - ten plan i `notes/wizja.md`;
  - zakres zmian: `git diff 357b5a6..HEAD` bez `docs/`;
  - sekcję „Na co uważać przy przeglądzie”;
  - zbudowaną stronę w `site2/out/pages` i wydruki z `$TMPDIR/wietnam-4/`.

  Recenzent odpowiada na pytania:
  - czy coś na stronie albo w repo nie powinno stać się publiczne;
  - czy teksty dla czytelnika są po polsku, per „ty”, bez form rodzajowych, i zgodne z researchem;
  - czy wydruk i plik offline działają jak w tym planie;
  - czy coś w kodzie łamie ograniczenia globalne.

  Uwagi dzieli na krytyczne, ważne i drobne, każdą z plikiem i linią. Wynik zapisuje do `$TMPDIR/przeglad-koncowy-4.txt`.
- [ ] **Krok 2: Uwagi jedna po drugiej.**
  - Każdą uwagę sprawdź sam w kodzie, w researchu albo na stronie, zanim cokolwiek zmienisz.
  - Prawdziwa uwaga krytyczna albo ważna to osobny commit „Poprawka z końcowego przeglądu etapu 4: …” (test, kod, `ALL PASS`, sondy). Fakt zmienia się najpierw w researchu.
  - Drobne uwagi bez zmian idą na listę partii B w zadaniu 12.
  - Sprawę produktową (to, co zobaczy odwiedzający) najpierw pokaż użytkownikowi, z rekomendacją.
- [ ] **Krok 3: Wynik.** Dopisz do `$TMPDIR/przeglad-4.txt` drugi akapit: „Końcowy przegląd etapu 4 (…): …”: co recenzent znalazł, co poprawiono i co poszło na listę partii B.

---

### Zadanie 11: Publikacja (każdy krok za wyraźną zgodą użytkownika)

Repo `grzegorzfrskiba-hub/wietnam` staje się publiczne bez wolnej licencji, a strona idzie na GitHub Pages z folderu `docs/` na `main`, jak strona grudniowa. Przed każdym krokiem 3–5 zapytaj użytkownika osobno i czekaj na wyraźne „tak”. Zgoda na jeden krok nie obejmuje następnego.

- [ ] **Krok 1: Drugi rzut oka na komunikaty, tego samego dnia.** Fakty sprawdzone 14.10.2026, które zmieniają się z tygodnia na tydzień (decyzja 4):
  - drogi na Sơn Trà: wstrzymane od 8.10.2026 do odwołania; https://vnexpress.net/tag/ban-dao-son-tra-83776 i Báo Đà Nẵng;
  - Phong Nha: komunikaty parku po ulewach (https://phongnhakebang.vn/);
  - Cúc Phương: wstrzymane noclegi w lesie i zakaz wchodzenia w głąb lasu 19:00–7:00 (https://dulichcucphuong.com.vn/ i prasa);
  - pozwolenie na strefę przygraniczną na płaskowyżu Đồng Văn (10 USD) i otwarcie autostrady Tuyên Quang – Hà Giang (prasa prowincji Tuyên Quang);
  - kolejka na Fansipan: przerwy i godziny (https://sunworld.vn/vi/fansipan);
  - MSZ: poziom ostrzeżenia w Odyseuszu (https://odyseusz.gov.pl/VN, we wbudowanej przeglądarce);
  - zwolnienie z wiz dla Polaków (uchwała 229/NQ-CP do 14.08.2028) i karta przylotu (PAI).

  Szukaj przez WebSearch („standard”, przy świeżych wiadomościach „extended”) i czytaj strony przez WebFetch, bez pobierania plików i bez otwierania PDF-ów.
  - Jeśli fakt się zmienił: najpierw research (źródło, data), potem tekst strony, test i osobny commit „Fakty z dnia publikacji: …”.
  - Zmianę, która zmienia to, co strona radzi (np. otwarte drogi na Sơn Trà), najpierw pokaż użytkownikowi.
  - Wynik, także „bez zmian”, dopisz jednym zdaniem do `$TMPDIR/przeglad-4.txt`.
- [ ] **Krok 2: `docs/` dla GitHub Pages**

```bash
bash tools/publish.sh
du -sh docs
ls docs
git status --short | grep -v "^?? docs/" ; git status --short docs | head -3
```

Oczekiwane: `publish.sh: docs/ ready (…)`, ok. 37 MB. W `docs/` są `index.html`, `img/` i `fonts/` (plik `.nojekyll` jest ukryty). Poza `docs/` drzewo bez zmian.

```bash
git add docs
git commit -F - <<'EOF'
Strona na GitHub Pages: docs/ z build.py (strona z noindex, zdjęcia, kroje z licencjami, .nojekyll)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 3: `git push` (za zgodą).** Zapytaj: „Czy mogę wysłać `main` na GitHuba (`git push origin main`)? Repo jest jeszcze prywatne.” Po „tak”:

```bash
git push origin main
```

- [ ] **Krok 4: Repo publiczne (za zgodą).** Zapytaj osobno. Przypomnij, że publiczna staje się cała historia, także notatki i research, a repo nie ma wolnej licencji (README, „Prawa”). Po „tak”:

```bash
~/.local/bin/gh repo edit grzegorzfrskiba-hub/wietnam --visibility public --accept-visibility-change-consequences
~/.local/bin/gh repo view grzegorzfrskiba-hub/wietnam --json visibility
```

Oczekiwane: `{"visibility":"PUBLIC"}`.

- [ ] **Krok 5: GitHub Pages i opis repo (za zgodą).** Zapytaj osobno o włączenie GitHub Pages z folderu `docs/` na `main`, z wymuszonym HTTPS, i o adres strony w opisie repo. Po „tak”:

```bash
~/.local/bin/gh api -X POST repos/grzegorzfrskiba-hub/wietnam/pages -f "source[branch]=main" -f "source[path]=/docs"
~/.local/bin/gh repo edit grzegorzfrskiba-hub/wietnam --homepage https://grzegorzfrskiba-hub.github.io/wietnam/
```

- [ ] **Krok 6: Budowa strony i HTTPS.** Sprawdzaj co minutę, najwyżej przez 10 minut:

```bash
~/.local/bin/gh api repos/grzegorzfrskiba-hub/wietnam/pages/builds/latest --jq .status
```

Gdy wynik to `built`, wymuś HTTPS (na to też była zgoda w kroku 5) i sprawdź adresy:

```bash
~/.local/bin/gh api -X PUT repos/grzegorzfrskiba-hub/wietnam/pages -F https_enforced=true
for u in "" img/og.jpg fonts/ibm-plex-sans-normal-latin.woff2 fonts/OFL-IBM-Plex.txt; do echo "$(curl -s -o /dev/null -w '%{http_code}' "https://grzegorzfrskiba-hub.github.io/wietnam/$u") $u"; done
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/ | grep -o '<meta name="robots"[^>]*>\|<meta property="og:image" [^>]*>'
```

Oczekiwane: cztery razy `200`, a potem `<meta name="robots" content="noindex">` i `og:image` z adresem `https://grzegorzfrskiba-hub.github.io/wietnam/img/og.jpg`. Jeśli `https_enforced` odpowie błędem, bo certyfikat jeszcze nie jest gotowy, spróbuj ponownie za kilka minut.

- [ ] **Krok 7: Na żywo, z użytkownikiem.**
  - We wbudowanej przeglądarce otwórz `https://grzegorzfrskiba-hub.github.io/wietnam/#od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2`:
    - trasa, zdjęcia i kroje bez zapytań do Google (`read_network_requests`);
    - mapa;
    - przycisk PDF.
  - Poproś użytkownika, żeby na własnym telefonie:
    1. otworzył https://grzegorzfrskiba-hub.github.io/wietnam/, ustawił dowolny termin i stuknął „Kopiuj plan na WhatsApp”: przez https pojawia się „Skopiowano. Wklej plan do czatu.”, a nie zapasowe pole z zaznaczonym tekstem;
    2. wkleił plan w czacie z samym sobą w WhatsAppie: link pokazuje podgląd ze zdjęciem z Tràng An, tytułem „Wietnam po swojemu” i opisem;
    3. stuknął „Zapisz trasę jako PDF” i zapisał PDF, jak w zadaniu 9, krok 8.
  - Wynik dopisz jednym zdaniem do `$TMPDIR/przeglad-4.txt`.

---

### Zadanie 12: Pierwsze linki i notatki

- [ ] **Krok 1: Pierwsze linki (decyzja 2).** Wysyła użytkownik, ze swojego WhatsAppa, do 2–4 przygodowych osób, zaraz po kroku 7 zadania 11. Podaj mu w rozmowie gotową wiadomość do wklejenia:

```text
Hej! Robię planer wyjazdów do Wietnamu: ustawiasz
termin, lotniska, co lubisz i poziom przygody,
a strona sama układa trasę. Zanim pokażę go szerzej,
sprawdź go proszę na telefonie:
https://grzegorzfrskiba-hub.github.io/wietnam/

Trzy pytania:
1. Czy w kilka minut udało się ustawić twój termin
   i dostać trasę?
2. Co w trasie nie pasuje albo dziwi?
3. Czego zabrakło w „Przed wyjazdem”?

Na koniec „Kopiuj plan na WhatsApp” i wklej mi
tutaj, to zobaczę twoją trasę.
```

  - Imiona, numery i linki z terminami osób nie trafiają do repo ani do notatek.
  - Opinie, gdy przyjdą, zapisuje się w notatkach bez imion, punkt po punkcie, z decyzją, co z nimi zrobić (partia B). To już osobna sesja, po tym planie.
- [ ] **Krok 2: Notatki.** Skrypt sprawdzono na kopiach plików z 14.10.2026, po commicie planu i po zadaniu 8. Bierze:
  - dzisiejszą datę;
  - wynik przeglądów z `$TMPDIR/przeglad-4.txt` (zadania 9, 10 i 11).

  Zmienia:
  - `notes/etapy.md`:
    - tabelę etapów: etap 4 zrobiony;
    - sekcję etapu 4: co zrobił;
    - „Następny krok”: pierwsza runda znajomych, potem partia B;
    - wynik przeglądów;
    - listę „Do audytu przed publikacją (etap 4)”: zrobiona; to, co zostało, przechodzi do „Po publikacji, z partią B”;
  - `CLAUDE.md`: status, repo publiczne, adres strony działa.

Uruchom z katalogu repo:

```bash
python3 -I - <<'EOF'
# notes after stage 4, from the repo's folder; each change asserts its old text once. The date is today's, the results of
# the checkpoint, the final review and the publication come from $TMPDIR/przeglad-4.txt (tasks 9, 10 and 11).
import datetime, os
t = datetime.date.today()
D = '%d.%02d.%d' % (t.day, t.month, t.year)
REVIEW = open(os.path.join(os.environ['TMPDIR'], 'przeglad-4.txt'), encoding='utf-8').read().strip()
assert REVIEW, 'the results first: tasks 9, 10 and 11'
PLAN = 'plans/2026-10-14-etap-4-audyt-i-publikacja.md'
URL = 'https://grzegorzfrskiba-hub.github.io/wietnam/'
e = open('notes/etapy.md', encoding='utf-8').read()
c = open('CLAUDE.md', encoding='utf-8').read()
u = open('notes/uwagi-z-przegladow-1b.md', encoding='utf-8').read()
n = 0
def rep(s, a, b):
    global n
    assert s.count(a) == 1, a[:70]
    n += 1
    return s.replace(a, b)
# the table of stages and the section of stage 4
e = rep(e, '| 4. Audyt i publikacja (po partii A) | zaplanowany 14.10.2026: [' + PLAN + '](' + PLAN + '), do wykonania |',
  '| 4. Audyt i publikacja (po partii A) | zrobione @DZIEN@: [' + PLAN + '](' + PLAN + '); strona pod ' + URL + ', na razie bez wyszukiwarek |')
e = rep(e, 'Plan ([' + PLAN + '](' + PLAN + '), sesja decyzji 14.10.2026): ', 'Plan ([' + PLAN + '](' + PLAN + '), sesja decyzji 14.10.2026, zrobiony @DZIEN@): ')
# the next step: the first friends, then batch B; what plan 2 of batch A did moves under its own heading
i = e.index('## Następny krok: etap 4, audyt i publikacja\n')
j = e.index('**Etap 4:** sesja decyzji 14.10.2026 dała plan z suchą próbą')
k = e.index('**Do etapu 3 (partia B i kolejne):**')
old2 = e[i:j].replace('## Następny krok: etap 4, audyt i publikacja\n\n', '').rstrip('\n')
assert old2.startswith('Zrobione 14.10.2026: plan 2 partii A') and old2.count('\n\n') == 2, old2[:80]
n += 1
e = e[:i] + '''## Następny krok: pierwsza runda znajomych, potem partia B

Zrobione @DZIEN@: etap 4 ([''' + PLAN + '''](''' + PLAN + ''')). Strona jest pod ''' + URL + ''', na razie z `noindex`, a repo jest publiczne, bez wolnej licencji. Przed publikacją:
- poprawki z listy audytu: wjazd w trybie miesiąca, droga przez lotnisko jako jedna droga, `esc()` w przełączniku, kurs NBP i adres strony w jednym miejscu, testy świąt i zdjęć;
- PDF jako wersja offline dla podróżnych: przycisk „Zapisz trasę jako PDF” i wydruk na A4 z mapą w trzech kadrach i linkiem do trasy;
- kroje na własnym hostingu (`site2/fonts/`), plik offline 6,4 MB;
- licencje 87 zdjęć sprawdzone w Wikimedia Commons (`tools/licenses.sh`), licencja w stopce prowadzi do swojego tekstu;
- fakty z 14.10.2026 w researchu i na stronie (e-wiza, karta przylotu, e-papierosy, festiwal gryki), porządki w researchu, `research/pierwowzor-2026-10.md`;
- wizja przejrzana z tym, co jest na stronie, README z „©”.

PRZEGLAD-4

**Pierwsza runda:** 2–4 przygodowe osoby dostały sam adres strony i trzy pytania (decyzja 2 z 14.10.2026). Opinie zapisujemy tu bez imion i bez linków, punkt po punkcie, z decyzją, co z nimi zrobić. Potem sesja decyzji partii B: miejsca partii B, otwarcie strony dla wyszukiwarek (`NOINDEX` w `site2/build.py`) i lista „Po publikacji, z partią B” niżej. Każda nowa wersja strony: `bash tools/publish.sh`, commit `docs/` i `git push` za zgodą.

''' + e[k:]
# the audit list: done; what is left goes to batch B
a = e.index('**Do audytu przed publikacją (etap 4):**\n')
b = e.index('\nDrobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)\n\n### Z planu 1 partii A (etap 3)')
assert e[a:b].count('\n- ') == 20, 'the audit list has changed: %d items' % e[a:b].count('\n- ')
n += 1
e = e[:a] + '''**Po publikacji, z partią B:**
- długi ogon researchu: punkty „Do sprawdzenia przed publikacją (etap 4)” i „Czego nie ustaliłem” w notatkach researchu, które po kontroli z 14.10.2026 dalej są otwarte (godziny otwarcia, bilety do ok. 5 EUR, współrzędne, ceny przewodników i noclegów, dni zamknięć); sprawdzić z partią B, a do tego czasu bez zmian na stronie;
- kurs NBP i największe ceny (rejs, auta, loty, Hang Én, Fansipan) odświeżyć z partią B: dziś kurs z 9.10.2026 i ceny z 11–13.10.2026, w jednym miejscu (`costs.js` i wiersz NBP-A w `research/ceny-2026-10.md`);
- otwarcie dla wyszukiwarek: `NOINDEX = False` w `site2/build.py`, gdy pierwsza runda znajomych nie zgłosi poważnych błędów;
- PDF z iPhone'a: Safari ignoruje `break-after: avoid`, więc nagłówek bywa sam na dole strony; jeśli znajomi to zgłoszą, zgrupować nagłówek z pierwszym dniem;
- wydruk: ostatnia strona bywa prawie pusta (sama stopka), a zdanie „Mapa jest w skali, a na dużym ekranie zostaje w widoku przy przewijaniu” drukuje się, choć mówi o ekranie;
- przed publikacją każdej partii drugi rzut oka na komunikaty, jak w zadaniu 11 etapu 4;
- MSZ odradza samodzielne podróże motocyklem, a strona tego nie cytuje (decyzja z 14.10.2026): wrócić do tego, jeśli zapyta o to pierwsza runda.
''' + e[b:]
# what plan 2 of batch A did, under its own heading next to plan 1
e = rep(e, '### Z planu 1 partii A (etap 3)\n', '### Z planu 2 partii A (etap 3)\n\n' + old2 + '\n\n### Z planu 1 partii A (etap 3)\n')
# the notes of the reviews of plan 1B: the part for stage 4 is done
a = u.index('## Do etapu 4 (audyt przed publikacją)\n')
b = u.index('## Utrzymanie danych\n')
assert u[a:b].count('\n- ') == 19, 'the notes for stage 4 have changed: %d items' % u[a:b].count('\n- ')
n += 1
u = u[:a] + '''## Do etapu 4 (audyt przed publikacją)

Zrobione w etapie 4 (@DZIEN@, [plan](''' + PLAN + ''')): wszystkie uwagi z tej sekcji poza jedną, która przechodzi na partię B (lista „Po publikacji, z partią B” w [etapy.md](etapy.md)): ostatnia strona wydruku bywa prawie pusta (sama stopka).

''' + u[b:]
# CLAUDE.md: the status, the public repository and the address that works
c = rep(c, '**Status (14.10.2026):** etap 3, partia A zrobiona: plan 1 (Phong Nha, Cúc Phương, Đà Nẵng z Sơn Trà) i plan 2 (Hà Giang, Sa Pa). Następny krok: etap 4 (audyt i publikacja) według planu [notes/' + PLAN + '](notes/' + PLAN + '), do wykonania w świeżej sesji; zob. [notes/etapy.md](notes/etapy.md).',
  '**Status (@DZIEN@):** etap 4 zrobiony: strona opublikowana pod ' + URL + ', na razie bez wyszukiwarek (`noindex`). Następny krok: pierwsza runda znajomych, potem partia B, zob. [notes/etapy.md](notes/etapy.md).')
c = rep(c, '  - Repo: https://github.com/grzegorzfrskiba-hub/wietnam, prywatne do publikacji w etapie 4.\n  - Adres strony po publikacji: ' + URL + '\n',
  '  - Repo: https://github.com/grzegorzfrskiba-hub/wietnam, publiczne od @DZIEN@, bez wolnej licencji.\n  - Strona: ' + URL + ' (GitHub Pages z `docs/` na `main`; nową wersję przygotowuje `bash tools/publish.sh`, a wysyła commit `docs/` i `git push` za zgodą).\n')
c = rep(c, '- **Repo będzie publiczne od publikacji w etapie 4, bez wolnej licencji:** wszystkie prawa zastrzeżone, nie dodawaj pliku LICENSE. Wszystko, co trafi do commita, także `notes/`, będzie widać w internecie.',
  '- **Repo jest publiczne od @DZIEN@, bez wolnej licencji:** wszystkie prawa zastrzeżone, nie dodawaj pliku LICENSE. Wszystko, co trafi do commita, także `notes/`, widać w internecie.')
e = e.replace('@DZIEN@', D).replace('PRZEGLAD-4', REVIEW)
c = c.replace('@DZIEN@', D)
u = u.replace('@DZIEN@', D)
open('notes/etapy.md', 'w', encoding='utf-8').write(e)
open('CLAUDE.md', 'w', encoding='utf-8').write(c)
open('notes/uwagi-z-przegladow-1b.md', 'w', encoding='utf-8').write(u)
print(n, 'changes')
EOF
```

Oczekiwane: `9 changes`. Jeśli skrypt stanie na `assert`, któryś tekst w notatkach zmienił się od 14.10.2026: przeczytaj komunikat, popraw skrypt pod nowy tekst i opisz to w wyniku zadania.

- [ ] **Krok 3: Sprawdź**

```bash
git status --short
grep -n "@DZIEN@\|PRZEGLAD-4" notes/etapy.md CLAUDE.md
grep -c $'\xc2\xa0' notes/etapy.md CLAUDE.md
```

Oczekiwane:
- zmienione są tylko `notes/etapy.md` i `CLAUDE.md`;
- drugi grep nic nie wypisuje;
- trzeci wypisuje `0` przy obu plikach.

Przeczytaj `git diff` i sprawdź, czy akapit przeglądów brzmi dobrze.

- [ ] **Krok 4: Commit i push**

```bash
git add notes/etapy.md CLAUDE.md
git commit -F - <<'EOF'
Notatki: etap 4 zrobiony (audyt i publikacja), strona pod https://grzegorzfrskiba-hub.github.io/wietnam/ bez wyszukiwarek; następny krok: pierwsza runda znajomych, potem partia B

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

`git push` tylko za zgodą użytkownika. Gałąź suchej próby `sucha-proba-4` usuń (`git branch -D sucha-proba-4`) dopiero po zgodzie użytkownika, na końcu.

---

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` (co 7. kombinacja); `bash tests/run.sh --full` → wszystkie kombinacje i tryb dat, z budżetem, rezerwacjami, pakowaniem i wjazdem każdej trasy, ok. 100 s.
- `python3 site2/build.py`, potem:
  - `bash "$TMPDIR/sondy-4.sh" <miesiąc>`: 16 sond z zadania 1, krok 4 (`MIESIAC` albo `RRRR-MM`), ostatnia linia `sondy (…): 0 z 16 nie przeszło`; jedna sonda: `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`, kończy się `done, all checks ok`;
  - `bash tests/shot.sh '<ustawienia>' 390 plik.png [wysokość]`: zrzut; cała strona to ok. 23 000–32 500 px przy 390 px;
  - `bash tests/print.sh '<ustawienia>' plik.pdf [dark]`: wydruk na A4, 0 zakrytych linii (inaczej kod 1).
- `bash tools/links.sh`: linki rezerwacji i wjazdu odpowiadają 2xx (strona Sapa O'Chau: kod 406 dla curla, w przeglądarce działa).
- `bash tools/licenses.sh`: licencje i autorzy 87 zdjęć zgodni z Wikimedia Commons.
- Liczby ze wszystkich 134 784 tras: skrypt z zadania 9, krok 5, ok. 60 s.
- `bash tools/publish.sh`: `docs/` dla GitHub Pages (zadanie 11).
- Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests tools | grep -v "var NB"` nic nie wypisuje.
