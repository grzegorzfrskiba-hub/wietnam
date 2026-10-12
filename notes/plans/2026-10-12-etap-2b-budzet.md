# Etap 2B: budżet, „Przed wyjazdem”, motocykl i przejazdy z lotnisk — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** druga część etapu 2. Strona mówi, ile mniej więcej kosztuje wyjazd i co załatwić przed nim, daje wybór „Z kierowcą / Samodzielnie” na motocyklu i porządnie opisuje dalekie przejazdy z lotnisk. Na końcu punkt kontrolny etapu 2.
- W „W skrócie” szósta liczba trasy to budżet na osobę w złotych. Nowa sekcja „Przed wyjazdem” na końcu strony ma budżet z podziałem i kwotą w pojedynkę, listę „Zarezerwuj wcześniej” od najpilniejszej z linkami, wjazd i zdrowie oraz listę rzeczy do spakowania.
- W karcie Cao Bằng i w karcie przejazdu Hội An–Huế jest przełącznik „Z kierowcą / Samodzielnie” z warunkiem prawnym, wymaganiami i ryzykiem. Trasa się nie zmienia; zmieniają się dni, tekst drogi i budżet.
- Dalekie drogi z lotnisk mają własne teksty, a karty przejazdu na Cát Bà i do Cát Tiên mówią, do której wylądować przed ostatnim promem.
- Do tego poprawki z przeglądu 2A i treść poprawiona po researchu: zamknięty Đảo Tiên i jaskinia w Kho Mường, trasa parku przy Lang Biang, strefa przygraniczna w Cao Bằng, rezerwacja gibonów.

**Architektura:**
- **Dane w nowych plikach:** `costs.js` (ceny w EUR z researchu i kurs NBP) i `before.js` (wyprzedzenie rezerwacji i linki, wjazd, noclegi u gospodarzy). W `content.js` dochodzą `SWAPS` (zamiany), `AIR_KEYS` (teksty dalekich dróg z lotnisk), `FERRY` (promy) i `PACK_CODES`, a w dniach miejsc pola `cost` i `pack` oraz wersje `self`.
- **Czyste funkcje w `page.js`** (testowane w jsc): `tripBudget`, `bookList`, `packList`, `entryNotes`, `ridesOn`, `selfSwaps`, `withSwap`, `shortenedPlaces`, `ferryNotes`, `zlRange`, `money`; do tego rozszerzone `parseLink`, `linkHash`, `settingsFromLink`, `stopDays`, `segKey` i `mapLayout`.
- **`app.js`** rysuje liczbę budżetu, sekcję „Przed wyjazdem” (`renderBefore`) i przełącznik (`swapBlock`, `bindSwaps`).
- **Test danych** porównuje każdą liczbę `costs.js` i `before.js` z tabelami „Zestawienie” w `research/`.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, zrzuty); Chrome bez okna (sondy, zrzuty, wydruk); curl (linki).

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): pkt 5 („Poziom przygody: trzy, plus motocykl”), pkt 7 („Budżet: zgrubnie”), „Jak działa strona”, „Moduł: co ma każde miejsce”, „Treść, bezpieczeństwo, licencje”;
- [notes/etapy.md](../etapy.md): etap 2 i „Następny krok: plan 2B” z uwagami z przeglądu 2A;
- decyzje z sesji 11–12.10.2026, niżej w sekcji „Decyzje z sesji 11–12.10.2026”;
- research z 11–12.10.2026 (commit 97067cb): [ceny](../../research/ceny-2026-10.md), [wjazd](../../research/wjazd-2026-10.md), [motocykl](../../research/motocykl-2026-10.md), [przejazdy z lotnisk](../../research/lotniska-2026-10.md), [rezerwacje](../../research/rezerwacje-2026-10.md).

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS z bloków `:root` (pilnuje tego test `css colours`);
  - `engine.js` i `page.js` bez DOM; dane wchodzą do `page.js` przez argumenty;
  - komentarze w kodzie po angielsku, teksty dla czytelnika po polsku w `ui.js` i `content/`.
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, nigdy sam znak. Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, w `var NB = '…';`. Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie zwraca. Uwaga: narzędzie do zapisu plików bywa, że samo zamienia napis `\u00a0` na znak; ten grep to wyłapie.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - liczebniki przez `countWord`; cudzysłów „…”, półpauza w zakresach, godziny 24-godzinne, spacja przed °C.
- **Ceny i fakty:** każda liczba w `costs.js` i `before.js` stoi w tabeli „Zestawienie” w `research/`, a test danych to sprawdza. Nową albo zmienioną liczbę najpierw wpisz do researchu, ze źródłem i datą.
- **Linki:** tylko z `research/rezerwacje-2026-10.md`: oficjalne strony i sprawdzeni operatorzy, bez parametrów śledzących i partnerskich.
- **Motocykl:** zdania o prawie i ryzyku tylko z `research/motocykl-2026-10.md`, sekcja „Co powiedzieć na stronie”.
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu. Pełny przebieg (`--full`) trwa po tym planie ok. 45 s.
- **Sieć:** `tools/links.sh` pyta adresy przez curl i niczego nie zapisuje. Pobieranie plików tylko po zgodzie użytkownika, z nazwą, źródłem i rozmiarem.
- **Repo będzie publiczne:** bez danych osobowych i bez numerów lotów.
- **Commity:**
  - po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
  - commity po zadaniach są częścią planu;
  - `git push` i publikacja artifactu tylko za zgodą użytkownika.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których strona najłatwiej zawiedzie użytkownika, a których testy czystych funkcji nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Szeroka kwota w wąskiej kolumnie.**
   - Ryzyko: „5 800–13 500 zł” (30 dni z Hồ Chí Minh City i z powrotem, przyroda, listopad) wystaje z kafelka liczb trasy na najwęższym układzie komputerowym.
   - Oczekiwane: kwota mieści się w kafelku przy 901, 1100 i 1400 px, a na telefonie stoi przez całą szerokość.
   - Sprawdzenie: sonda `before.js` przy 390, 901 i 1400 px (zadanie 10).
2. **Wydruk nowej sekcji.**
   - Ryzyko: Chrome drukuje siatkę (grid) łamaną między stronami tak, że późniejsze wiersze zakrywają wcześniejsze (tak było z ramkami rezerwacji w suchej próbie).
   - Oczekiwane: na wydruku żadna linia nie jest zakryta.
   - Sprawdzenie: reguły druku w zadaniach 9 i 10 i `bash tests/print.sh` z 0 zakrytych linii (zadanie 10 i punkt kontrolny).
3. **Przełącznik po zmianie formularza albo z niepełnych ustawień.**
   - Ryzyko: przełącznik bierze ustawienia sprzed zmiany, a `apply` wywołany bez listy `moto` wywraca stronę (tak było w suchej próbie).
   - Oczekiwane: przełącznik buduje na formularzu, jak „Dodaj”; `apply` kopiuje ustawienia z pustymi listami.
   - Sprawdzenie: `apply` z `copySettings` (zadanie 5), sondy `settings.js` i `before.js` (zadania 1 i 10).
4. **Zgodność danych z researchem.**
   - Ryzyko: liczba zmieniona w `costs.js` albo `before.js` bez researchu, albo odwrotnie.
   - Oczekiwane: każda liczba i każdy link danych stoi w tabeli „Zestawienie”.
   - Sprawdzenie: testy `costs` i `booking` w `tests/data.test.js` (zadanie 3).
5. **Linki rezerwacji wygasają.**
   - Ryzyko: operator zmienia adres albo zamyka stronę.
   - Oczekiwane: każdy link odpowiada 2xx przed publikacją.
   - Sprawdzenie: `bash tools/links.sh` (zadanie 3, punkt kontrolny i audyt w etapie 4).

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik (ścieżki od katalogu repo).
- **Python:** jest Pillow i PyMuPDF.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`):
  - pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, IntersectionObserver woła tylko raz, na starcie, a przejścia CSS stoją;
  - Chrome ignoruje `history.replaceState` po ok. 200 wywołaniach w 10 s;
  - słowo `MIESIAC` w ustawieniach sondy, zrzutu i wydruku to miesiąc za pięć miesięcy od dziś;
  - sonda zmienia trasę przez adres (`location.hash = …`), gdy potem klika coś, co buduje na formularzu: samo `__trip.apply` nie przestawia formularza.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - w nowym worktree podlinkuj `photos/` z głównej kopii przed buildem;
  - w nazwach kontroli sond nie używaj prostego cudzysłowu `"`: `probe.sh` ucina na nim linię, więc piszemy „…”.
- **Sucha próba (12.10.2026):**
  - kod zadań 1–10 złożono w osobnym worktree;
  - kroki tego planu wygenerowano z tych samych list zamian i odtworzono na świeżym worktree z `main`, zadanie po zadaniu: po testach z kroku 1 każde zadanie dawało błąd z kroku 2, a po kodzie `ALL PASS`; pliki po zadaniu 10 są identyczne z suchą próbą (razem z bitem wykonywalnym `tools/links.sh`), a skrypt z zadania 4 daje te same pliki treści co zamiany powtórki;
  - po zadaniu 10 przeszły: `bash tests/run.sh --full` (`combos: 134784 (all)`, `ALL PASS`, 45 s), build, sondy `link.js`, `anchors.js`, `changes.js` (dwie trasy), `settings.js` (390, 360, 320 px), `map.js`, `before.js` (390, 901, 1100, 1400 px), `tools/links.sh` (34 adresy, wszystkie 200) i wydruk czterech tras, jasny i ciemny (0 zakrytych linii);
  - sondy przeszły też na commitach powtórki po zadaniach 1, 5 i 9, wydruk po zadaniu 9, a sondy doraźne z zadań 5 i 7 po swoich zadaniach (sonda promów przed zadaniem 7 daje `FAIL`);
  - skrypt notatek z zadania 12 uruchomiono na kopiach plików (9 zmian; wzór nazwy `raport-tras-RRRR-MM-DD` w CLAUDE.md zostaje);
  - nie sprawdzono na sucho: przeglądu z użytkownikiem i telefonu w punkcie kontrolnym (zadanie 11).

## Decyzje z sesji 11–12.10.2026

Pytania do użytkownika i odpowiedzi:
1. **Standard noclegów:** jedna średnia półka. Przedział od „oszczędnie” (pensjonaty, noclegi u gospodarzy, minibusy) do „wygodnie” (hotele 3–4*, prywatne auta), bez nowego ustawienia.
2. **Dla ilu osób:** dla dwóch osób w pokoju i aucie, a pod kwotą zdanie z kwotą w pojedynkę.
3. **Gdzie budżet i rezerwacje:** kwota jako szósta liczba w „W skrócie”, a szczegóły (podział, kwota w pojedynkę, rezerwacje, wjazd, pakowanie) w nowej sekcji „Przed wyjazdem” na końcu strony, z odnośnikiem w pasku u góry.
4. **„Przed wyjazdem”:** zwykła lista w częściach, bez odhaczania; tak samo na ekranie i w druku.
5. **Zamiany:** w 2B tylko motocykl (Cao Bằng i przełęcz Hải Vân), mechanizm ogólny, kolejne zamiany jako dane.
6. **Przełącznik motocykla:** w karcie miejsca i w karcie przejazdu, z wymaganiami i ryzykiem obok; link pamięta wybór.
7. **Linki rezerwacji:** oficjalne strony i sprawdzeni operatorzy, jak w pierwowzorze, z datą sprawdzenia w researchu.

Lista 37 ustaleń, zatwierdzona w całości (tu w skrócie, w grupach):
- **Budżet, dane i liczenie:**
  - `costs.js`: noc w pokoju dwuosobowym w każdym miejscu, dzień na osobę, godzina drogi (od minibusa do prywatnego auta), lot krajowy z bagażem, kurs EUR→PLN z tabeli A NBP z datą;
  - płatne części dni jako pozycje z ceną na osobę i za grupę, wyprzedzeniem i linkami; dzień wskazuje je polem `cost`, osobno w każdej wersji;
  - dwie osoby dzielą pokój i koszty grupy, osoba sama płaci je w całości; jedzenie, bilety i loty zawsze na osobę;
  - czysta funkcja zwraca kwotę dla dwóch i dla jednej osoby, cztery części (noclegi; jedzenie i drobne wydatki; przejazdy i loty krajowe; wycieczki, przewodnicy i rejsy) i pozycje trasy, testy na danych zastępczych;
  - złotówki zaokrąglone do 100 zł, z twardą spacją, bez poprawek sezonowych;
  - test zgodności danych z tabelami researchu, jak test klimatu; test kombinacji sprawdza kwoty każdej trasy.
- **Na stronie:** szósta liczba „X–Y zł na osobę” z odnośnikiem; sekcja „Przed wyjazdem” (`#before`) po „Dzień po dniu”, z odnośnikiem w pasku, w czterech częściach (Budżet, Zarezerwuj wcześniej, Wjazd i zdrowie, Co spakować), drukowana; budżet z podziałem, kwotą w pojedynkę, trzema największymi pozycjami, tym, czego nie liczy, datą cen i kursu, zdaniem o Tết i świętach; rezerwacje od najpilniejszej, z kwotą i linkami, z wyprzedzeniem na Tết; wjazd i zdrowie z urzędowym źródłem i zdaniem „sprawdź aktualne zasady” po końcu zwolnienia z wiz; pakowanie liczone czystą funkcją; linia budżetu w kopii planu na WhatsApp.
- **Zamiana: motocykl:** zamiana to dane (miejsce albo droga, wersje „Z kierowcą” i „Samodzielnie”); klucz `motocykl=` w linku; przełącznik w karcie Cao Bằng przed dniami i w karcie przejazdu Hội An–Huế, z jednym zdaniem o prawie jazdy i ramką po wyborze „Samodzielnie”; wersja samodzielna ma pierwszeństwo przed wersją poziomu; Hải Vân samodzielnie przez przełęcz, bagaż autem; po zmianie karta zostaje na miejscu, fokus wraca na przełącznik.
- **Przejazdy z lotnisk:** własne teksty dróg z lotnisk dłuższych niż 2 h albo z promem, czytelne w obie strony; krótkie zostają przy taksówce; dalekie trafiają do „Zarezerwuj wcześniej”.
- **Research:** pięć plików w `research/` (ceny, wjazd, motocykl, lotniska, rezerwacje), każdy fakt ze źródłem i datą; ceny 2026–2027 bez szczytu świątecznego.
- **Uwagi z przeglądu 2A:** zdanie przy „Dodaj”; „Dodaj” pod powodem na telefonie; „ok.” z liczbą; noc w drodze bez powtórzenia; pasek przy 320 px; etykiety stopni na mapie.
- **Testy i punkt kontrolny:** testy nowych czystych funkcji; sonda `before.js`; `tools/links.sh`; punkt kontrolny z pełnym testem, sondami, wydrukiem, zrzutami, prawdziwym telefonem przez lokalny serwer w domowej sieci Wi-Fi (prywatny artifact tylko za zgodą) i przeglądem z użytkownikiem.
- **Zakres:** poza 2B zostają inne zamiany, Hà Giang (partia A), ceny sezonowe, rezerwacje i płatności na stronie, parametry partnerskie w linkach; plan z suchą próbą, commit po każdym zadaniu, push i publikacja tylko za zgodą.

Zmiany z researchu (zatwierdzone 12.10.2026):
1. **Treść miejsc:** Cát Tiên bez zamkniętego Đảo Tiên (spacer do drzew Tung i Gõ, muzeum przyrody) i z gibonami rezerwowanymi przed przyjazdem; Pù Luông bez zamkniętej jaskini w Kho Mường; Lang Biang z trasą parku na wypadek zamkniętego szlaku; Cao Bằng ze zdaniem o paszporcie i strefie przygranicznej.
2. **Uwagi o promie w kartach przejazdu:** na Cát Bà do której wylądować (Nội Bài, Cát Bi), do Cát Tiên tak samo, a w drugą stronę, kiedy najwcześniej da się być na lotnisku.
3. **Motocykl:** warunek prawny (samo B nie wystarcza), luka w ubezpieczeniu i ryzyko z danych WHO; w Cao Bằng oddanie motocykla w mieście w dniu wyjazdu (ok. 85 km z Khuổi Ky); Hải Vân przez przełęcz, bez tunelu.
4. **Model budżetu:** dopłata osoby jadącej samotnie do kwoty dziennej; loty krótkie i długie według czasu w powietrzu (próg 1,5 h); pozycja z wyborem (auto albo easy rider); rejs i noc nad Bàu Sấu zastępują noc w hotelu; przejazd Hội An–Huế z własną ceną.
5. **Do etapu 3:** czas drogi Thọ Xuân–Pù Luông (2,5 h w danych, jedno źródło ok. 3 h).

Doprecyzowania z suchej próby, do zatwierdzenia razem z planem:
- **Zdanie przy „Dodaj”** wymienia skrócone pobyty: „Zmieści się bez usuwania innych miejsc, ale skróci pobyt w: Hồ Chí Minh City, Huế.” (zamiast ogólnego „skróci inne pobyty”); bez skróceń, np. gdy wypada tylko noc w drodze, zostaje dawne zdanie.
- **Etykiety stopni na mapie** nie są przeszkodami: jako przeszkody przesuwały etykietę Hồ Chí Minh City na nazwę Phú Quốc, która znikała. Linia stopnia jest zawsze, a jej etykieta tylko tam, gdzie nie zakrywa etykiety ani znacznika trasy (na ok. 23% linii jej nie ma).
- **Sonda `settings.js` przy 320 px** pomija kontrolę „pole miesiąca na pierwszym ekranie telefonu 390 × 844”: telefon 320 px i tak jest niższy.
- **Kwota w liczbach trasy:** na komputerze kolumna 1,9 raza szersza od pozostałych i krój 24–32 px; na telefonie kwota przez całą szerokość, a liczba przed nią też, gdy stałaby sama.
- **`apply` kopiuje ustawienia** (`copySettings`), więc wywołanie bez list `add`, `remove` i `moto` nie wywraca strony.
- **Wydruk:** nowa sekcja i przełącznik drukują się jako bloki, nie siatki, a ich ramki się nie dzielą.
- **`AIR_KEYS` z polem `book`:** droga Thọ Xuân–Ninh Bình ma własny tekst, ale nie trafia do rezerwacji, bo taksówki stoją przy terminalu.
- **`HOMESTAYS`** (delta Mekongu, Pù Luông, Ba Bể, Cao Bằng z Khuổi Ky): miejsca, których noclegi u gospodarzy trafiają do „Zarezerwuj wcześniej”.
- **Jedna linia rezerwacji na wybór „auto albo easy rider”** w Cao Bằng: pozycja `caobang.easyrider` rezerwuje się pod kluczem `caobang.car`.
- **Kwota przy dalekich drogach z lotnisk** w rezerwacjach to cena auta z kierowcą; budżet liczy te drogi jak inne, od minibusa do auta.
- **Pakowanie:** ciepła warstwa przy nocach do 15 °C (`PACK_COLD_C`), z nazwami miejsc i najniższą temperaturą.
- **Godziny promów** w `FERRY`: ostatnia przeprawa ok. 18:00, a godzina lądowania i najwcześniejszy czas na lotnisku z rachuby z danych researchu (sekcja „Promy w danych strony” w `research/lotniska-2026-10.md`).
- **Wiersz `day.solo`** w tabeli „Zestawienie” w `research/ceny-2026-10.md`: dopłata osoby jadącej samotnie, do testu danych.
- **Ramka „Samodzielnie”** ma trzy części (wymagania, ryzyko, rady) skrócone z sekcji „Co powiedzieć na stronie” w `research/motocykl-2026-10.md`, z jedną radą dla Cao Bằng i jedną dla Hải Vân.

## Jak działa strona po 2B

1. **Ustawienia i trasa** działają jak w 2A: `apply` → `normSettings` → `planRoute` → `stopDays` (z wersjami samodzielnymi, gdy zamiana miejsca jest ustawiona) → `tripBudget` → render → adres. Link ma nowe pole `motocykl=` (lista zamian ustawionych na „Samodzielnie”).
2. **„W skrócie”:** sześć liczb trasy, ostatnia to budżet na osobę z odnośnikiem do „Przed wyjazdem”.
3. **Karta miejsca:** w Cao Bằng przed dniami przełącznik „Z kierowcą / Samodzielnie”; po wyborze „Samodzielnie” ramka i dni na motocyklu.
4. **Karta przejazdu:** teksty dalekich dróg z lotnisk (`AIR_KEYS`), uwagi o promie (`ferryNotes`), a na drodze Hội An–Huế przełącznik i tekst drogi na motocyklu.
5. **„Przed wyjazdem”** (`renderBefore`): budżet (`tripBudget`), rezerwacje (`bookList`), wjazd i zdrowie (`entryNotes`), pakowanie (`packList`).
6. **Kopia planu na WhatsApp** ma linię z budżetem.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/costs.js` | (nowy) `EUR_PLN`, `COSTS_CHECKED`, `SHORT_FLIGHT_H`, `COSTS`: ceny budżetu |
| `site2/src/before.js` | (nowy) `BOOK`, `ENTRY`, `HOMESTAYS`: rezerwacje, wjazd, noclegi u gospodarzy |
| `site2/src/content.js` | (zmiana) opis pól `cost`, `pack`, `self`; `PACK_CODES`, `SWAPS`, `AIR_KEYS`, `FERRY` |
| `site2/src/content/<id>.js` | (zmiana) `cost` i `pack` w dniach, wersje `self` w Cao Bằng, poprawki treści z researchu |
| `site2/src/page.js` | (zmiana) link i ustawienia z zamianami, `stopDays` z `cost`, `pack` i `self`, budżet, rezerwacje, pakowanie, wjazd, `segKey`, promy, „ok.”, skrócone pobyty, stopnie na mapie |
| `site2/src/app.js` | (zmiana) liczba budżetu, sekcja „Przed wyjazdem”, przełącznik, teksty dróg i promy, kopia planu |
| `site2/src/template.html` | (zmiana) odnośnik w pasku, sekcja, CSS kwoty, sekcji i przełącznika, druk, poprawki z przeglądu 2A |
| `site2/src/ui.js` | (zmiana) nowe teksty interfejsu |
| `site2/build.py`, `tests/run.sh` | (zmiana) `costs.js` i `before.js` w kolejności skryptów |
| `tests/page.test.js`, `tests/data.test.js`, `tests/content.test.js`, `tests/combos.test.js` | (zmiana) testy nowych funkcji i danych |
| `tests/probes/settings.js`, `map.js`, `changes.js` | (zmiana) 320 px, „Dodaj” z dala od „Na górę”, stopnie na mapie, nowe zdania |
| `tests/probes/before.js` | (nowy) budżet, sekcja, przełącznik, najszersza kwota, Tết |
| `tools/links.sh` | (nowy) sprawdzanie linków rezerwacji i wjazdu |
| `research/ceny-2026-10.md`, `research/lotniska-2026-10.md`, `research/plany-dni-2026-10.md` | (zmiana) wiersz `day.solo`, godziny promów w danych, zmiany treści z planu 2B |
| `notes/etapy.md`, `CLAUDE.md` | (zmiana) status, następny krok, sposoby sprawdzania |

**Kolejność:** zadania idą po kolei. Tylko zadania 1, 2 i 3 nie zależą od siebie (zmieniają różne pliki); zadanie 4 potrzebuje 2 (tytuły dni) i 3 (`COSTS`), a każde następne poprzedniego.

---

### Zadanie 1: Porządki z przeglądu 2A

Uwagi z przeglądu zrzutów 2A (`notes/etapy.md`, „Następny krok: plan 2B”) poza budżetem: zdanie przy „Dodaj” mówi, które pobyty się skrócą; „ok.” trzyma się liczby; noc w drodze mówi, co dzieli, zamiast powtarzać trasę; etykiety stopni na mapie stoją tylko tam, gdzie nic nie zakrywają; na telefonie „Dodaj” stoi pod powodem; pasek u góry mieści się przy 320 px.

**Pliki:**
- Zmień: `site2/src/page.js`, `site2/src/app.js`, `site2/src/ui.js`, `site2/src/template.html`, `tests/probes/settings.js`, `tests/probes/map.js`, `tests/probes/changes.js`
- Testy: `tests/page.test.js`

**Interfejsy:**
- Daje:
  - `shortenedPlaces(before, after, places)` → identyfikatory miejsc, które po „Dodaj” zostają z mniejszą liczbą nocy, w kolejności starej trasy (noce miasta odwiedzonego dwa razy się sumują, noc w drodze się nie liczy);
  - w wynikach `whyOff` pole `shorter` (lista z `shortenedPlaces`), a w `ui.js` tekst `off.shorter` z `{list}`;
  - w panelach `mapLayout` pole `grid: [{ lat, y, label }]` (`label`: etykieta stopnia jest rysowana) i `gridBox(g, p)`: ramka etykiety stopnia;
  - `tieShort`: „ok.” przed liczbą trzyma ją twardą spacją.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*„ok.” z liczbą.* W `tests/page.test.js` zamień:

```js
  ['ok. 3–4' + NB + 'km od', '≈' + NB + '5½' + NB + 'godz. drogi', '2' + NB + 'godz. 30' + NB + 'min', 'noce 13' + NB + '°C, 64' + NB + 'mm deszczu, 1700' + NB + 'm n.p.m.'],
  'a number keeps its unit, ≈ keeps its number');
```

na:

```js
  ['ok.' + NB + '3–4' + NB + 'km od', '≈' + NB + '5½' + NB + 'godz. drogi', '2' + NB + 'godz. 30' + NB + 'min', 'noce 13' + NB + '°C, 64' + NB + 'mm deszczu, 1700' + NB + 'm n.p.m.'],
  'a number keeps its unit, ≈ and „ok.” keep their number');
eq([tieShort('jedzie ok. ½ godz.'), tieShort('Ok. 2 h'), tieShort('ok. godziny'), tieShort('bok. 5')],
  ['jedzie ok.' + NB + '½' + NB + 'godz.', 'Ok.' + NB + '2 h', 'ok. godziny', 'bok. 5'], '„ok.” only before a number, and only as a word of its own');
```

*skrócone pobyty w „Nie ma na twojej trasie”.* W `tests/page.test.js` przed linią zaczynającą się od `var tF = tripOf(Object.assign({}, MARCH, { month: 7 })), oF = byId(offOf(tF, Object.assign({}, MARCH, { mon…` wstaw:

```js
eq([byId(oA).mekong.shorter, byId(oA).catba.drops, byId(oA).catba.shorter], [['saigon', 'hue'], ['hue'], []],
  'the Mekong fits without pushing a place off, but shortens the stays in Hồ Chí Minh City and Huế; Cát Bà pushes Huế off');
```

*shortenedPlaces.* W `tests/page.test.js` przed linią zaczynającą się od `eq(addReport(stopsOf(['saigon', 'dalat', 'hue', 'hanoi'])` wstaw:

```js
function nightsOf(list) { return list.map(function (x) { return { id: x[0], n: x[1] }; }); }
eq(shortenedPlaces(nightsOf([['saigon', 3], ['hue', 3], ['hanoi', 3]]), nightsOf([['saigon', 2], ['mekong', 2], ['hue', 2], ['hanoi', 3]]), PLACES), ['saigon', 'hue'],
  'shortened: the places that stay with fewer nights, in the order of the old trip');
eq(shortenedPlaces(nightsOf([['hanoi', 2], ['catba', 3], ['hanoiStop', 1], ['babe', 2], ['hanoi', 2]]), nightsOf([['hanoi', 1], ['ninhbinh', 2], ['catba', 3], ['babe', 2], ['hanoi', 2]]), PLACES),
  ['hanoi'], 'a city twice counts its nights together and is named once; a night on the way is no place');
```

*stopnie szerokości na mapie.* W `tests/page.test.js` przed linią zaczynającą się od `var mD = mapLayout(tD.r, tD.st, MAPW);   // Cao Bằng on the trip: Bản Giốc` wstaw:

```js
eq(mA.panels.map(function (P) { return P.grid.map(function (g) { return g.lat + (g.label ? '' : '-'); }).join(' '); }), ['20 21 22 23', '16 17', '10 11- 12- 13'],
  'the degrees of latitude: every line, but no label where a label of the trip stands (11° and 12° N by Hồ Chí Minh City and Đà Lạt)');
```

*żadna etykieta nie zakrywa narysowanego stopnia.* W `tests/page.test.js` zamień:

```js
[mA, mH, mD].forEach(function (L, n) {
  L.panels.forEach(function (P) {
    P.labels.forEach(function (l) { ok(l.clear, 'map ' + n + ' ' + P.key + ': ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
  });
});
```

na:

```js
[mA, mH, mD].forEach(function (L, n) {
  L.panels.forEach(function (P) {
    P.labels.forEach(function (l) { ok(l.clear, 'map ' + n + ' ' + P.key + ': ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
    P.grid.filter(function (g) { return g.label; }).forEach(function (g) {
      ok(P.labels.every(function (l) { return overlapArea(l.box, gridBox(g, P.p)) === 0; }), 'map ' + n + ' ' + P.key + ': a label covers ' + g.lat + '°N');
    });
  });
});
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: Error: the Mekong fits without pushing a place off, but shortens the stays in Hồ Chí Minh City and Huế; Cát Bà pushes Huế off: got [null,["hue"],null], want [["saigon","hue"],["hue"],[]]` (`tests/page.test.js`).

- [ ] **Krok 3: `site2/src/page.js`.**

*tieShort: komentarz.* Zamień:

```js
   A number keeps its unit on the line (5 km, 5½ godz., 25 °C, 64 mm), and ≈ keeps its number. */
```

na:

```js
   A number keeps its unit on the line (5 km, 5½ godz., 25 °C, 64 mm), and ≈ and „ok.” keep their number. */
```

*tieShort: „ok.” z liczbą.* Zamień:

```js
  return text.replace(/≈ /g, '≈\u00a0').replace(
```

na:

```js
  return text.replace(/≈ /g, '≈\u00a0').replace(/(^|[\s(„–])([Oo]k\.) (?=[\d½])/g, '$1$2\u00a0').replace(
```

*shortenedPlaces.* Przed linią zaczynającą się od `/* ---------- why a place is on the trip or not ---------- */` wstaw (z pustą linią po wstawce):

```js
/* The places that stay on the trip after Dodaj, but with fewer nights, in the order of the old trip: the nights of a place
   are summed (a city twice on a round trip), and a night on the way is no place to report. before, after: the stops of
   the two trips ({ id, n }); places: PLACES. */
function shortenedPlaces(before, after, places) {
  function nights(stops) { var o = {}; stops.forEach(function (s) { if (!places[s.id].node) o[s.id] = (o[s.id] || 0) + s.n; }); return o; }
  var a = nights(before), b = nights(after), seen = {};
  return before.filter(function (s) {
    if (places[s.id].node || seen[s.id] || !(s.id in b) || b[s.id] >= a[s.id]) return false;
    seen[s.id] = true;
    return true;
  }).map(function (s) { return s.id; });
}
```

*whyOff: komentarz.* Zamień:

```js
   each once. canAdd: Dodaj can put it on the trip (not when it needs a higher level, is closed or does not fit). drops:
   the places that would leave the trip if it were added (droppedPlaces). added: Dodaj asked for it.
   Returns [{ id, reasons, why, canAdd, drops, added }].
```

na:

```js
   each once. canAdd: Dodaj can put it on the trip (not when it needs a higher level, is closed or does not fit). drops:
   the places that would leave the trip if it were added (droppedPlaces); shorter: those that would stay with fewer nights
   (shortenedPlaces). added: Dodaj asked for it.
   Returns [{ id, reasons, why, canAdd, drops, shorter, added }].
```

*whyOff: pole shorter.* Zamień:

```js
      var p = P[id], code = data.seasons[id], x = { id: id, reasons: [], why: [], canAdd: true, drops: [], added: st.add.indexOf(id) > -1 };
```

na:

```js
      var p = P[id], code = data.seasons[id], x = { id: id, reasons: [], why: [], canAdd: true, drops: [], shorter: [], added: st.add.indexOf(id) > -1 };
```

*whyOff: skrócone pobyty.* Zamień:

```js
      else x.drops = droppedPlaces(route.stops, r.stops, P);
```

na:

```js
      else { x.drops = droppedPlaces(route.stops, r.stops, P); x.shorter = shortenedPlaces(route.stops, r.stops, P); }
```

*mapLayout: komentarz.* Zamień:

```js
   Returns { height, panels: [{ key, y, p (panelSize), names, segs, stubs, pins, airports, pois, faint, labels }] }; a name
   is { text, kind, x, y, anchor }, a label { kind: 'stop'|'stub'|'poi'|'faint', key, lines, x, y, anchor, box, clear }. */
```

na:

```js
   The whole degrees of latitude come last: each line is drawn, and its label at the right edge (gridBox) only where it
   covers no label and no marker.
   Returns { height, panels: [{ key, y, p (panelSize), grid, names, segs, stubs, pins, airports, pois, faint, labels }] };
   grid is [{ lat, y, label }] (label: its text is drawn), a name { text, kind, x, y, anchor }, a label { kind:
   'stop'|'stub'|'poi'|'faint', key, lines, x, y, anchor, box, clear }. */
```

*gridBox.* Przed linią zaczynającą się od `// a stub's length (× STUB) and turn in degrees, in the order tried` wstaw:

```js
// the box of a degree's label: "21°N" in 10 px monospace, ending 6 px from the panel's right edge, 4 px over its line (app.js)
function gridBox(g, p) {
  var w = textWidth(g.lat + '°N', SMALL_PX, true);
  return { x: p.w - 6 - w, y: g.y - 14.5, w: w, h: 13.5 };
}
```

*mapLayout: pole grid.* Zamień:

```js
    var p = panelSize(m.panels[key]), P = { key: key, y: top, p: p, names: [], segs: [], stubs: [], pins: [], airports: [], pois: [], faint: [], labels: [] };
```

na:

```js
    var p = panelSize(m.panels[key]), P = { key: key, y: top, p: p, grid: [], names: [], segs: [], stubs: [], pins: [], airports: [], pois: [], faint: [], labels: [] };
```

*mapLayout: stopnie na końcu.* Zamień:

```js
    placeLabels(faint, taken, p).forEach(function (l, i) { if (l) P.labels.push(Object.assign({}, faint[i].what, l)); });
    out.push(P);
```

na:

```js
    placeLabels(faint, taken, p).forEach(function (l, i) { if (l) { P.labels.push(Object.assign({}, faint[i].what, l)); taken.push(l.box); } });
    for (var lat = Math.ceil(p.lat0 - p.h / p.s); lat <= Math.floor(p.lat0); lat++) {
      var g = { lat: lat, y: (p.lat0 - lat) * p.s }, gb = gridBox(g, p);
      g.label = !taken.some(function (o) { return overlapArea(gb, o) > 0; });
      P.grid.push(g);
    }
    out.push(P);
```


- [ ] **Krok 4: `site2/src/app.js`.**

*lista poza trasą: skrócone pobyty.* Zamień:

```js
        (x.canAdd ? '<p class="off-drops">' + esc(x.drops.length ? T('off.drops', { list: names(x.drops) }) : T('off.nodrops')) + '</p>' : '') + '</div>' +
```

na:

```js
        (x.canAdd ? '<p class="off-drops">' + esc(x.drops.length ? T('off.drops', { list: names(x.drops) })
          : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops')) + '</p>' : '') + '</div>' +
```

*mapa: stopnie z mapLayout.* Zamień:

```js
      // whole degrees: the latitudes across, labelled on the right, the longitudes dashed
      for (var lat = Math.ceil(p.lat0 - p.h / p.s); lat <= Math.floor(p.lat0); lat++) {
        var gy = r1((p.lat0 - lat) * p.s);
        grid.push('<line class="m-grid" x1="0" x2="' + p.w + '" y1="' + gy + '" y2="' + gy + '"/><text class="m-gridlabel" x="' + (p.w - 6) + '" y="' + r1(gy - 4) + '" text-anchor="end">' + lat + '°N</text>');
      }
```

na:

```js
      // whole degrees: the latitudes across, labelled on the right where no label of the trip stands (mapLayout), the longitudes dashed
      P.grid.forEach(function (q) {
        grid.push('<line class="m-grid" x1="0" x2="' + p.w + '" y1="' + r1(q.y) + '" y2="' + r1(q.y) + '"/>' +
          (q.label ? '<text class="m-gridlabel" x="' + (p.w - 6) + '" y="' + r1(q.y - 4) + '" text-anchor="end">' + q.lat + '°N</text>' : ''));
      });
```


- [ ] **Krok 5: `site2/src/ui.js`.**

*tekst: skrócone pobyty.* Po:

```js
  'off.drops': 'Po dodaniu wypadnie: {list}.', 'off.nodrops': 'Zmieści się bez usuwania innych miejsc.',
```

dopisz w następnych liniach:

```js
  'off.shorter': 'Zmieści się bez usuwania innych miejsc, ale skróci pobyt w: {list}.',
```

*tekst: noc w drodze.* Zamień:

```js
'why.night': 'Noc w drodze z {a} do {b}.',
```

na:

```js
'why.night': 'Dzieli drogę z {a} do {b} na dwa krótsze dni.',
```


- [ ] **Krok 6: `site2/src/template.html`.** Trzy poprawki z przeglądu: na telefonie „Dodaj” pod powodem, w pasku podsumowanie ucinane wielokropkiem, a „Zmień” zawsze w całości.

*telefon: Dodaj pod powodem.* Zamień:

```html
  .leg-total { margin-left: 0; width: 100%; }
}
```

na:

```html
  .leg-total { margin-left: 0; width: 100%; }
  /* Dodaj under its reason, at the left: the button "Na górę" (bottom right) cannot cover it */
  .off-list li { grid-template-columns: 10px minmax(0, 1fr); }
  .off-list li > .btn-small { grid-column: 2; justify-self: start; }
}
```

*pasek: podsumowanie ucinane.* Zamień:

```html
.secnav-sum { display: none; margin: 0 0 0 auto; align-items: center; gap: 4px 12px; font-size: 14px; color: var(--ink); white-space: nowrap; }
```

na:

```html
.secnav-sum { display: none; margin: 0 0 0 auto; min-width: 0; align-items: center; gap: 4px 12px; font-size: 14px; color: var(--ink); white-space: nowrap; }
/* on the narrowest phones the summary is cut short (…), and "Zmień" stays whole */
#sum-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
```

*pasek: Zmień zawsze cały.* Zamień:

```html
.secnav .sum-change { color: var(--accent); font-weight: 600; padding: 12px 0 12px 8px; }
```

na:

```html
.secnav .sum-change { flex: none; color: var(--accent); font-weight: 600; padding: 12px 0 12px 8px; }
```


- [ ] **Krok 7: `tests/probes/settings.js`.** Sonda działa też przy 320 px: kontrola pierwszego ekranu tylko od 360 px (telefon 320 px i tak jest niższy), „Dodaj” nie wchodzi pod „Na górę”, a pasek mieści się z datami i poziomem „Ekstremalnie”.

*settings.js: 320 px.* Zamień:

```js
// and at 360 px, the narrowest common phone (the two date fields side by side must fit):
// tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

na:

```js
// and at 360 px, the narrowest common phone (the two date fields side by side must fit), and at 320 px (the bar at the top):
// tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

*settings.js: pierwszy ekran od 360 px.* Zamień:

```js
  check('the month field ends on the first screen of a 390 × 844 phone (bottom at most 760 px)', box(f.month).bottom - top <= 760, Math.round(box(f.month).bottom - top));
```

na:

```js
  // a phone of 360 px or more is at least 640 px high; the first screen of a 390 × 844 phone is the goal
  if (window.innerWidth >= 360) check('the month field ends on the first screen of a 390 × 844 phone (bottom at most 760 px)', box(f.month).bottom - top <= 760, Math.round(box(f.month).bottom - top));
```

*settings.js: Dodaj z dala od „Na górę”.* Przed linią zaczynającą się od `var gap = box(document.querySelector('.facts')).top - box(document.getElementById('settings-msg')).bottom;` wstaw:

```js
  // Dodaj in the list of places off the trip stands at the left, clear of the button „Na górę” (44 px, 16 px from the right edge)
  var adds = document.querySelectorAll('#offroute-list [data-add]'), right = Math.max.apply(null, Array.prototype.map.call(adds, function (b) { return box(b).right; }));
  check('Dodaj stays clear of the button „Na górę” (right edge at most the screen width less 60 px)', adds.length > 0 && right <= document.documentElement.clientWidth - 60,
    Math.round(right) + ' of ' + document.documentElement.clientWidth);
```

*settings.js: pasek przy 320 px.* Zamień:

```js
    check('and the message under the form is empty', textOf('#settings-msg') === '', textOf('#settings-msg'));
    done();
```

na:

```js
    check('and the message under the form is empty', textOf('#settings-msg') === '', textOf('#settings-msg'));
    // the bar at the top with its longest summary (dates, Ekstremalnie): headless Chrome runs IntersectionObserver only
    // once, so the bar gets its class here; the summary may be cut short (…), and „Zmień” stays whole on the screen
    var at = soon(), start = new Date(Date.UTC(at.year, at.month - 1, 28)), end = new Date(start.getTime() + 17 * 864e5);
    window.__trip.apply({ from: 'SGN', to: 'HAN', start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10), interests: [], level: 3, add: [], remove: [] });
    var nav = document.getElementById('secnav'), W = document.documentElement.clientWidth;
    nav.classList.add('away');
    var change = nav.querySelector('.sum-change').getBoundingClientRect();
    check('the bar with the summary fits: „Zmień” whole on the screen, nothing sticks out', change.left >= 0 && change.right <= W + 0.5 && nav.scrollWidth <= W,
      Math.round(change.left) + '–' + Math.round(change.right) + ' of ' + W + ', bar ' + nav.scrollWidth);
    nav.classList.remove('away');
    done();
```


- [ ] **Krok 8: `tests/probes/map.js`.** Narysowane etykiety stopni są dla sondy znacznikami, których nic nie może zakryć.

*map.js: komentarz.* Zamień:

```js
// The map, measured as Chrome draws it: on a few crowded trips no label covers another label, a pin or an airport's box,
// and each stays inside its panel (page.js places them from estimated widths; this checks the real text); then the
```

na:

```js
// The map, measured as Chrome draws it: on a few crowded trips no label covers another label, a pin, an airport's box or a
// degree's label, and each stays inside its panel (page.js places them from estimated widths; this checks the real text); then the
```

*map.js: stopnie jako znaczniki.* Zamień:

```js
      var marks = Array.prototype.map.call(g.querySelectorAll('.pin rect, .m-airport'), function (e) { return e.getBoundingClientRect(); });
```

na:

```js
      var marks = Array.prototype.map.call(g.querySelectorAll('.pin rect, .m-airport, .m-gridlabel'), function (e) { return e.getBoundingClientRect(); });
```

*map.js: komunikat.* Zamień:

```js
        marks.forEach(function (m) { if (inter(l.r, m) > 1) bad.push(l.name + ' over a marker'); });
```

na:

```js
        marks.forEach(function (m) { if (inter(l.r, m) > 1) bad.push(l.name + ' over a marker or a degree'); });
```

*map.js: nazwa kontroli.* Zamień:

```js
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker or the edge', !bad.length, bad.join('; '));
```

na:

```js
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker, a degree or the edge', !bad.length, bad.join('; '));
```


- [ ] **Krok 9: `tests/probes/changes.js`.** Nowe zdania: noc w drodze i zdanie przy „Dodaj”.

*changes.js: nowy tekst nocy w drodze.* Zamień:

```js
    whys.every(function (t) { return /^(Wybrane, bo: .+ sezon\.|Noc w drodze z .+ do .+\.)$/.test(t.replace(/\s+/g, ' ')); }), whys.join(' | '));
```

na:

```js
    whys.every(function (t) { return /^(Wybrane, bo: .+ sezon\.|Dzieli drogę z .+ do .+ na dwa krótsze dni\.)$/.test(t.replace(/\s+/g, ' ')); }), whys.join(' | '));
```

*changes.js: zdanie przy Dodaj.* Zamień:

```js
  check('Dodaj does what its line said would leave the trip', said === 'Zmieści się bez usuwania innych miejsc.' ? !left : !!left && said === 'Po dodaniu wypadnie: ' + left[1] + '.',
    said + ' | ' + textOf('#dropped'));
```

na:

```js
  // „Zmieści się bez usuwania innych miejsc” (maybe „…, ale skróci pobyt w: …”) and nothing left; or „Po dodaniu wypadnie: X” and X left
  check('Dodaj does what its line said would leave the trip', /^Zmieści się bez usuwania innych miejsc[.,]/.test(said) ? !left : !!left && said === 'Po dodaniu wypadnie: ' + left[1] + '.',
    said + ' | ' + textOf('#dropped'));
```


- [ ] **Krok 10: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 11: Build i sondy**

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
```

Oczekiwane: każda sonda kończy się linią `done, all checks ok` i kodem 0 (`echo $?`).

- [ ] **Krok 12: Commit**

```bash
git add tests/page.test.js site2/src/page.js site2/src/app.js site2/src/ui.js site2/src/template.html tests/probes/settings.js tests/probes/map.js tests/probes/changes.js
git commit -F - <<'EOF'
Porządki z przeglądu 2A: zdanie przy „Dodaj” wymienia skrócone pobyty, „ok.” z liczbą, noc w drodze bez powtórzenia, etykiety stopni na mapie tylko w wolnych miejscach, „Dodaj” pod powodem na telefonie, pasek przy 320 px

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Treść z researchu 2B

Poprawki treści z researchu (decyzje, „Zmiany z researchu”, pkt 1): Đảo Tiên w Cát Tiên jest zamknięty, wyjście do gibonów rezerwuje się przed przyjazdem, jaskinia w Kho Mường (Pù Luông) jest zamknięta, szlak na Lang Biang bywa zamknięty, a pętla w Cao Bằng prowadzi przez strefę przygraniczną. Źródła zmian trafiają do `research/plany-dni-2026-10.md`. Zadanie nie ma nowego testu: nowe zdania sprawdzają dotychczasowe testy treści i stylu (`tests/content.test.js`).

**Pliki:**
- Zmień: `site2/src/content/cattien.js`, `site2/src/content/puluong.js`, `site2/src/content/dalat.js`, `site2/src/content/caobang.js`, `research/plany-dni-2026-10.md`

**Interfejsy:**
- Nie zmienia nazw ani pól; zmieniają się tylko teksty dni (`t`, `d`) w czterech miejscach.

- [ ] **Krok 1: `site2/src/content/cattien.js`.**

*Cát Tiên, plan jednej nocy: gibony przed przyjazdem.* Zamień:

```js
spacer o świcie zarezerwuj w siedzibie parku przy zameldowaniu.
```

na:

```js
spacer o świcie do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele.
```

*Cát Tiên, dzień p 2: rezerwacje.* Zamień:

```js
Wędrówkę i pozwolenie zarezerwuj dzień wcześniej w siedzibie parku.
```

na:

```js
Wyjście do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele, a wędrówkę do Bàu Sấu i pozwolenie najpóźniej dzień wcześniej w siedzibie parku.
```

*Cát Tiên, spokojny dzień p 2 bez zamkniętego Đảo Tiên.* Zamień:

```js
d: 'Krótki spacer z przewodnikiem do olbrzymich drzew niedaleko siedziby parku, potem łodzią przez rzekę Đồng Nai do ośrodka ratowania naczelnych Dao Tiến, gdzie uratowane gibony i langury przygotowuje się do powrotu na wolność.', early: false }
```

na:

```js
d: 'Rano spacer z przewodnikiem parku do olbrzymich drzew Tung i Gõ, ok. 2 godzin leśną ścieżką. Po południu muzeum przyrody i ośrodek ratowania dzikich zwierząt tuż obok siedziby parku.', early: false }
```


- [ ] **Krok 2: `site2/src/content/puluong.js`.**

*Pù Luông: bez zamkniętej jaskini.* Zamień:

```js
wioska Kho Mường z jaskinią i grzbiety między dolinami.
```

na:

```js
wioska Kho Mường i grzbiety między dolinami.
```


- [ ] **Krok 3: `site2/src/content/dalat.js`.**

*Đà Lạt, Lang Biang: trasa parku, gdy szlak zamknięty.* Zamień:

```js
Przy rezerwacji zapytaj, czy szlak jest otwarty i czy biuro ma zgodę parku.', easy: {
```

na:

```js
Przy rezerwacji zapytaj, czy szlak jest otwarty i czy biuro ma zgodę parku. Gdy jest zamknięty, park prowadzi własną całodniową trasę z przewodnikiem i obiadem: 10 km od wodospadu Thiên Thai do stacji strażników Đưng Jar Giêng.', easy: {
```


- [ ] **Krok 4: `site2/src/content/caobang.js`.**

*Cao Bằng, p 1: paszport i strefa przygraniczna.* Zamień:

```js
Na kolejne dni załatw samochód z kierowcą albo przewodnika na motocyklu (easy rider).',
      easy:
```

na:

```js
Na kolejne dni załatw samochód z kierowcą albo przewodnika na motocyklu (easy rider). Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.',
      easy:
```

*Cao Bằng, p 1 easy: to samo.* Zamień:

```js
Na kolejne dni zarezerwuj wygodny samochód z kierowcą.' } },
```

na:

```js
Na kolejne dni zarezerwuj wygodny samochód z kierowcą. Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.' } },
```


- [ ] **Krok 5: `research/plany-dni-2026-10.md`.**

*research: odsyłacz.* Zamień:

```markdown
- **Plan 2A (11.10.2026)** zmienił część tych zdań: zob. sekcję „Zmiany z planu 2A” przed listą „Do sprawdzenia”.
```

na:

```markdown
- **Plany 2A (11.10.2026) i 2B (12.10.2026)** zmieniły część tych zdań: zob. sekcje „Zmiany z planu 2A” i „Zmiany z planu 2B” przed listą „Do sprawdzenia”.
```

*research: sekcja „Zmiany z planu 2B”.* Zamień:

```markdown
## Do sprawdzenia przed publikacją (etap 4)
```

na:

```markdown
## Zmiany z planu 2B (12.10.2026)

Zdania zmienione w planie 2B po researchu z 11–12.10.2026. Źródła są w plikach researchu planu 2B, pod podanymi etykietami.

| miejsce i pole | zdanie teraz | co się zmieniło i dlaczego | źródło (data) |
|---|---|---|---|
| cattien p 2, wersja `easy` | „Rano spacer z przewodnikiem parku do olbrzymich drzew Tung i Gõ, ok. 2 godzin leśną ścieżką. Po południu muzeum przyrody i ośrodek ratowania dzikich zwierząt tuż obok siedziby parku.” | Było: spacer do drzew i łodzią do ośrodka ratowania naczelnych „Dao Tiến”. Ośrodek Đảo Tiên (tak brzmi poprawna nazwa) jest zamknięty bez daty otwarcia. Spacer do drzew Tung i Gõ to usługa parku (A1, 2–2,5 h), a muzeum przyrody i ośrodek ratowania zwierząt leżą 100–150 m od siedziby parku. | `research/rezerwacje-2026-10.md`, „Cát Tiên: Đảo Tiên i gibony”: CT-VNE (aktualizacja 25.5.2026); `research/ceny-2026-10.md`, „Wycieczki i przewodnicy”: W-CT-zał |
| cattien p 1 `solo` i p 2 | „spacer o świcie do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele”; „Wyjście do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele, a wędrówkę do Bàu Sấu i pozwolenie najpóźniej dzień wcześniej w siedzibie parku.” | Było: rezerwacja przy zameldowaniu albo dzień wcześniej. Cennik parku podaje dwa wyjścia dziennie po pięć osób, a przewodniki z 2026 jedno wyjście o 4:45. | `research/ceny-2026-10.md`: W-CT-zał; `research/rezerwacje-2026-10.md`: CT-VT (18.9.2026), CT-POTOO (1.5.2026) |
| puluong p 2 | „…wioska Kho Mường i grzbiety między dolinami.” | Było „wioska Kho Mường z jaskinią”. Jaskinię Hang Dơi zamknięto 12.9.2026 z powodu spadających skał, a wizyty i wcześniej nie miały zgody władz. | `research/rezerwacje-2026-10.md`: PL-HD (12.9.2026), „Pù Luông: Hang Dơi” |
| dalat p 3 | dopisane: „Gdy jest zamknięty, park prowadzi własną całodniową trasę z przewodnikiem i obiadem: 10 km od wodospadu Thiên Thai do stacji strażników Đưng Jar Giêng.” | Szlak na szczyt park zawiesił 31.10.2024 i nie ogłosił otwarcia, choć gazeta prowincji opisuje wejścia w 2026. Trasa Thiên Thai – Đưng Jar Giêng jest w cenniku parku: 1 dzień, 10 km, z przewodnikiem i obiadem. | `research/rezerwacje-2026-10.md`, „Lang Biang: stan szlaku”: LB-BLD (6.3.2026), LB-CENY, LB-PARK |
| caobang p 1 i jego `easy` | dopisane: „Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.” | Od 17.11.2025 cudzoziemiec nie potrzebuje zezwolenia w obszarach turystycznych strefy przygranicznej; Bản Giốc, Ngườm Ngao i kamienne domy w Khuổi Ky należą do obszaru turystycznego wodospadu. Poza nim zezwolenie jest wymagane: 22.9.2026 policja spisała wykroczenie turyście bez zezwolenia. | `research/motocykl-2026-10.md`, „Strefa przygraniczna w Cao Bằng”: SP-LSVN, SP-QD248 (26.2.2025), SP-VNS (22.9.2026) |

## Do sprawdzenia przed publikacją (etap 4)
```


- [ ] **Krok 6: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 7: Commit**

```bash
git add site2/src/content/cattien.js site2/src/content/puluong.js site2/src/content/dalat.js site2/src/content/caobang.js research/plany-dni-2026-10.md
git commit -F - <<'EOF'
Treść po researchu 2B: Cát Tiên bez zamkniętego Đảo Tiên i z gibonami rezerwowanymi wcześniej, Pù Luông bez zamkniętej jaskini, trasa parku przy Lang Biang, strefa przygraniczna w Cao Bằng

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Dane cen i rezerwacji

Ceny i rezerwacje z researchu jako dane strony, w dwóch nowych plikach. Test danych czyta tabele „Zestawienie” z `research/` i porównuje z nimi każdą liczbę i każdy link, jak test klimatu w 2A. Do tego wiersz `day.solo` w researchu (dopłata osoby jadącej samotnie, decyzje, „Zmiany z researchu”, pkt 4) i skrypt `tools/links.sh`.

**Pliki:**
- Utwórz: `site2/src/costs.js`, `site2/src/before.js`, `tools/links.sh`
- Zmień: `tests/run.sh`, `site2/build.py`, `research/ceny-2026-10.md`
- Testy: `tests/data.test.js`

**Interfejsy:**
- Daje (`site2/src/costs.js`, kwoty w EUR jako `[od, do]`):
  - `EUR_PLN = 4.3775` (tabela A NBP z 9.10.2026), `COSTS_CHECKED = '2026-10-12'`, `SHORT_FLIGHT_H = 1.5`;
  - `COSTS.night[<miejsce>]`: pokój dwuosobowy za noc; `COSTS.day`, `COSTS.daySolo`: osoba za dzień i dopłata osoby samej; `COSTS.shared`, `COSTS.car`: godzina drogi (miejsce w minibusie, auto z kierowcą); `COSTS.flight.short`, `COSTS.flight.long`: lot krajowy z bagażem;
  - `COSTS.items[<klucz>] = { pp, group, night?, book? }`: `pp` na osobę, `group` za pokój, auto, łódź albo przewodnika dwóch osób; `night: true`, gdy pozycja ma własny nocleg (rejs, noc nad Bàu Sấu); `book`: klucz `BOOK`, gdy inny niż klucz pozycji.
- Daje (`site2/src/before.js`):
  - `BOOK[<klucz>] = { ahead, links: [{ name, url }] }`: dni wyprzedzenia poza szczytem (0: na miejscu, poza listą) i linki;
  - `ENTRY = { visaFreeDays: 45, visaFreeUntil: '2028-08-14', checked, links }`, `HOMESTAYS`: miejsca z noclegami u gospodarzy.
- `tools/links.sh`: kod 0 i ostatnia linia `links.sh: all addresses answer`, gdy każdy adres z `before.js` odpowiada 2xx.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*testy danych: ceny, rezerwacje, wjazd.* W `tests/data.test.js` na końcu dopisz (po pustej linii):

```js
/* The prices (costs.js) and what to book ahead (before.js) against their research notes. Every number of COSTS stands in
   the tables „Zestawienie” and „Zestawienie wycieczek” of research/ceny-2026-10.md or „Zestawienie” of
   research/motocykl-2026-10.md (there a car is the group's part, a person or a motorbike the person's); every entry of
   BOOK in „Zestawienie” of research/rezerwacje-2026-10.md; ENTRY in „Zestawienie” of research/wjazd-2026-10.md. An item
   costs no less at to than at from, for two people (pp + group / 2) and for one (pp + group). */
function researchRows(path, head) {
  var s = readFile(path), i = s.indexOf(head), out = [];
  if (i < 0) return out;
  s.slice(i).split('\n').slice(1).some(function (line) {
    if (/^#/.test(line)) return true;
    if (/^\|/.test(line) && !/^\|-/.test(line)) out.push(line.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }));
    return false;
  });
  return out.slice(1);   // without the row of the column names
}
dataCheck('costs', function (need) {
  function n(c) { return c === '' ? 0 : +c.replace(',', '.'); }
  var base = {}, items = {};
  researchRows('research/ceny-2026-10.md', '## Zestawienie\n').forEach(function (r) { base[r[0]] = [n(r[2]), n(r[3])]; });
  researchRows('research/ceny-2026-10.md', '### Zestawienie wycieczek').forEach(function (r) {
    items[r[0].replace(/`/g, '')] = { pp: [n(r[2]), n(r[3])], group: [n(r[4]), n(r[5])] };
  });
  researchRows('research/motocykl-2026-10.md', '## Zestawienie\n').forEach(function (r) {
    var v = [n(r[2]), n(r[3])], car = /^auto/.test(r[1]);
    items[r[0]] = { pp: car ? [0, 0] : v, group: car ? v : [0, 0] };
  });
  function same(a, b, what) { need(JSON.stringify(a) === JSON.stringify(b), what + ': ' + JSON.stringify(a) + ' in costs.js, ' + JSON.stringify(b) + ' in the research'); }
  Object.keys(PLACES).forEach(function (id) { if (!PLACES[id].node) same(COSTS.night[id], base['night.' + id], 'night.' + id); });
  Object.keys(COSTS.night).forEach(function (id) { need(PLACES[id] && !PLACES[id].node, 'a night price for no place: ' + id); });
  [['day', 'day'], ['daySolo', 'day.solo'], ['shared', 'road.shared'], ['car', 'road.private']].forEach(function (k) { same(COSTS[k[0]], base[k[1]], k[1]); });
  same(COSTS.flight.short, base['flight.short'], 'flight.short');
  same(COSTS.flight.long, base['flight.long'], 'flight.long');
  Object.keys(COSTS.items).forEach(function (k) {
    var it = COSTS.items[k], r = items[k];
    need(r, k + ': no row in the research');
    if (r) { same(it.pp, r.pp, k + ' pp'); same(it.group, r.group, k + ' group'); }
    need(it.pp[0] + it.group[0] / 2 <= it.pp[1] + it.group[1] / 2 && it.pp[0] + it.group[0] <= it.pp[1] + it.group[1], k + ': from costs more than to');
    need(it.night === undefined || it.night === true, k + ': night is true or left out');
    need(it.book === undefined || BOOK[it.book], k + ': book ' + it.book + ' is no key of BOOK');
  });
  need(EUR_PLN === 4.3775 && /^\d{4}-\d{2}-\d{2}$/.test(COSTS_CHECKED), 'the NBP rate of 9.10.2026 and the day the prices were checked');
});
dataCheck('booking', function (need) {
  var rows = {};
  researchRows('research/rezerwacje-2026-10.md', '## Zestawienie\n').forEach(function (r) { rows[r[0]] = r; });
  Object.keys(BOOK).forEach(function (k) {
    var b = BOOK[k], r = rows[k];
    need(r, k + ': no row in the research');
    if (!r) return;
    need(b.ahead === +r[4], k + ': ahead ' + b.ahead + ' days, the research says ' + r[4]);
    var links = /^—/.test(r[5]) ? [] : r[5].split('; ').map(function (p) { var i = p.lastIndexOf(': http'); return { name: p.slice(0, i), url: p.slice(i + 2) }; });
    need(JSON.stringify(b.links) === JSON.stringify(links), k + ': the links as in the research');
    b.links.forEach(function (l) { need(/^https:\/\//.test(l.url) && !/[?&](utm_|ref=|aff|partner)/i.test(l.url), k + ': ' + l.url + ' is https and has no tracking'); });
  });
  Object.keys(rows).forEach(function (k) { need(BOOK[k], k + ': in the research, not in BOOK'); });
  var entry = {};
  researchRows('research/wjazd-2026-10.md', '## Zestawienie\n').forEach(function (r) { entry[r[0]] = r[1]; });
  need(/^45 dni/.test(entry.bez_wizy_dni || '') && ENTRY.visaFreeDays === 45, 'ENTRY: 45 days without a visa');
  need(/14\.8\.2028/.test(entry.bez_wizy_do || '') && ENTRY.visaFreeUntil === '2028-08-14', 'ENTRY: the exemption ends on 14.8.2028');
  var wjazd = readFile('research/wjazd-2026-10.md');
  ENTRY.links.forEach(function (l) { need(/^https:\/\//.test(l.url) && wjazd.indexOf(l.url) > -1, 'ENTRY: ' + l.url + ' is a source of research/wjazd-2026-10.md'); });
  HOMESTAYS.forEach(function (id) { need(PLACES[id] && /gospodarzy|Khuổi Ky/.test(JSON.stringify(CONTENT[id].days)), 'HOMESTAYS: ' + id + ' is a place whose plans sleep with hosts'); });
});
```

*run.sh: nowe pliki danych.* W `tests/run.sh` zamień:

```bash
site2/src/panels.js site2/src/page.js"
```

na:

```bash
site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/page.js"
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `tests/run.sh: missing file site2/src/costs.js`.

- [ ] **Krok 3: `site2/src/costs.js`.** Liczby z tabel „Zestawienie” i „Zestawienie wycieczek” w `research/ceny-2026-10.md` oraz „Zestawienie” w `research/motocykl-2026-10.md`. Dwóch pozycji z researchu nie ma: `cattien.entry` mieści się w kwocie dziennej (tak mówi tabela), a `haivan.easyrider` nie jest wyborem na stronie, bo przełącznik ma tylko „Z kierowcą” i „Samodzielnie”.

*nowy plik: ceny.* Cały plik:

```js
/* The prices of the budget (plan 2B), in euros, each as [from, to]: from is the thrifty end of the middle range, to the
   comfortable end. Sources and dates: the tables „Zestawienie” and „Zestawienie wycieczek” in research/ceny-2026-10.md
   and „Zestawienie” in research/motocykl-2026-10.md; tests/data.test.js checks every number against them.
   EUR_PLN: the NBP rate the page converts with (table A, 9.10.2026). */
var EUR_PLN = 4.3775;
var COSTS_CHECKED = '2026-10-12';   // the day the prices were checked last (11–12.10.2026)
var SHORT_FLIGHT_H = 1.5;           // a flight with at most this many hours in the air is a short one
var COSTS = {
  // a double room for a night: two people share it, one person alone pays all of it
  night: { saigon: [28, 69], mekong: [20, 42], phuquoc: [28, 80], cattien: [14, 40], dalat: [17, 53], hoian: [17, 52], hue: [14, 52],
    puluong: [14, 62], ninhbinh: [15, 62], catba: [14, 52], hanoi: [21, 69], babe: [12, 64], caobang: [14, 48] },
  day: [13, 28],         // a person a day, two travelling together: food, Grab, water and coffee, tickets up to about 5 EUR
  daySolo: [2, 5],       // more a day for one person alone, who pays each Grab ride in full
  shared: [2.5, 3.5],    // a seat in a limousine van or a bus, a person an hour on the road
  car: [17.5, 19.5],     // a car with its driver, fuel and tolls, an hour on the road
  flight: { short: [34, 62], long: [45, 79] },   // a domestic flight with a checked bag, a person
  /* The paid parts of the days (the field cost of a day in content/) and of the road over the Hải Vân pass (SWAPS in
     content.js): pp a person, group the car, boat, guide, cabin or room of the two. Two people pay pp + group / 2 each,
     one person alone pp + group; from and to are two cases of the same thing, so a part of from may be over its to
     (dalat.langbiang: a guide for the group or a tour sold a person). night: the item has its own room (a cabin on the
     boat, a room at the rangers' station), so the stay counts a night less. book: the key in BOOK (before.js) where it is
     booked, when not its own. */
  items: {
    'saigon.cangio': { pp: [4, 4], group: [56, 111] },
    'mekong.sampan': { pp: [0, 0], group: [10, 17] },
    'mekong.market': { pp: [0, 0], group: [28, 41] },
    'mekong.conson': { pp: [0, 0], group: [14, 21] },
    'phuquoc.north': { pp: [0, 0], group: [52, 69] },
    'phuquoc.east': { pp: [0, 0], group: [52, 69] },
    'cattien.safari': { pp: [6, 6], group: [0, 22], book: 'cattien.park' },
    'cattien.gibbons': { pp: [31, 33], group: [0, 0], book: 'cattien.park' },
    'cattien.bausau_day': { pp: [9, 9], group: [24, 46], book: 'cattien.park' },
    'cattien.trees': { pp: [0, 0], group: [14, 15] },
    'cattien.bausau_night': { pp: [15, 15], group: [50, 88], night: true },
    'dalat.bidoup': { pp: [10, 10], group: [42, 70] },
    'dalat.cablecar': { pp: [3, 14], group: [2, 6] },
    'dalat.langbiang': { pp: [2, 44], group: [24, 0] },
    'dalat.train': { pp: [5, 5], group: [2, 6] },
    'dalat.caudat': { pp: [0, 0], group: [36, 53] },
    'hoian.cooking': { pp: [25, 47], group: [5, 10] },
    'hue.citadel': { pp: [7, 7], group: [0, 0] },
    'hue.tombs': { pp: [9, 13], group: [0, 0] },
    'hue.boatcar': { pp: [10, 13], group: [36, 45] },
    'hue.lagoon': { pp: [0, 0], group: [23, 45] },
    'puluong.guide': { pp: [28, 53], group: [0, 0] },
    'puluong.car': { pp: [0, 0], group: [36, 53] },
    'puluong.summit': { pp: [5, 46], group: [40, 17] },
    'ninhbinh.vanlong': { pp: [0, 0], group: [7, 32] },
    'ninhbinh.trangan': { pp: [11, 13], group: [0, 0] },
    'ninhbinh.car': { pp: [9, 11], group: [17, 36] },
    'catba.cruise': { pp: [85, 120], group: [62, 103], night: true },
    'catba.viethai': { pp: [4, 11], group: [0, 0] },
    'catba.viethai_boat': { pp: [10, 21], group: [0, 0] },
    'hanoi.duonglam': { pp: [1, 1], group: [41, 52] },
    'hanoi.battrang': { pp: [0, 0], group: [10, 21] },
    'babe.boat': { pp: [0, 0], group: [21, 34] },
    'babe.guide': { pp: [9, 14], group: [0, 0] },
    'babe.cooking': { pp: [5, 10], group: [10, 10] },
    'caobang.car': { pp: [0, 0], group: [34, 55] },
    'caobang.easyrider': { pp: [17, 28], group: [0, 0], book: 'caobang.car' },
    'caobang.moto': { pp: [7, 13], group: [0, 0] },
    'haivan.car': { pp: [0, 0], group: [50, 98] },
    'haivan.moto': { pp: [22, 29], group: [0, 0] }
  }
};
```


- [ ] **Krok 4: `site2/src/before.js`.** Wyprzedzenie i linki z tabeli „Zestawienie” w `research/rezerwacje-2026-10.md`, wjazd z `research/wjazd-2026-10.md`.

*nowy plik: rezerwacje, wjazd, noclegi u gospodarzy.* Cały plik:

```js
/* Before the trip (plan 2B). BOOK: what to book ahead and where, by key: ahead, the days ahead outside the peak (0: on the
   spot, not on the list), and the links, official pages and checked operators without tracking or partner parameters.
   From the table „Zestawienie” in research/rezerwacje-2026-10.md (tests/data.test.js checks them against it); tools/links.sh
   checks that the links answer. ENTRY: entry for Polish citizens, from research/wjazd-2026-10.md: days without a visa and
   the last day of the exemption (Nghị quyết 229/NQ-CP; a trip that ends later is told to check the rules), and the official
   pages to check before the trip. */
var BOOK = {
  'cattien.bausau_night': { ahead: 28, links: [{ name: 'Park Cát Tiên, kontakt', url: 'https://cattiennationalpark.com.vn/lien-he/' }, { name: 'Park Cát Tiên, cennik', url: 'https://cattiennationalpark.com.vn/bang-gia-dich-vu/' }] },
  'flights': { ahead: 21, links: [{ name: 'Vietnam Airlines', url: 'https://www.vietnamairlines.com/' }, { name: 'Vietjet', url: 'https://www.vietjetair.com/' }, { name: 'Vietravel Airlines', url: 'https://www.vietravelairlines.com/' }] },
  'catba.cruise': { ahead: 14, links: [{ name: 'Full Moon Travel Asia', url: 'https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/' }, { name: 'Cat Ba Ventures', url: 'https://catbaventures.com/cat-ba-tours/lan-ha-bay-ha-long-bay-bai-tu-long-bay-boat-trip-kayaking-2-days-1-night.html' }] },
  'homestay': { ahead: 14, links: [] },
  'puluong.summit': { ahead: 7, links: [{ name: 'Rezerwat Pù Luông, formularz', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform' }] },
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
  'caobang.easyrider': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/tours' }] },
  'transfer': { ahead: 3, links: [{ name: 'Baolau', url: 'https://www.baolau.com/en/destinations/vietnam' }, { name: 'Vexere', url: 'https://vexere.com/en-US' }, { name: 'FUTA (Phương Trang)', url: 'https://futabus.vn/' }] },
  'airport': { ahead: 3, links: [{ name: 'Baolau', url: 'https://www.baolau.com/en/destinations/vietnam' }, { name: 'Green SM Liên Tỉnh', url: 'https://www.greensm.com/vn-vi/green-lien-tinh' }] },
  'dalat.bidoup': { ahead: 3, links: [{ name: 'Park Bidoup–Núi Bà, kontakt', url: 'https://bidoupnuiba.gov.vn/lien-he/' }, { name: 'Park Bidoup–Núi Bà, formularz', url: 'https://bidoupnuiba.gov.vn/dat-tour' }, { name: 'Park Bidoup–Núi Bà, cennik', url: 'https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/' }] },
  'dalat.langbiang': { ahead: 3, links: [{ name: 'Park Bidoup–Núi Bà, kontakt', url: 'https://bidoupnuiba.gov.vn/lien-he/' }] },
  'caobang.moto': { ahead: 3, links: [{ name: 'Cao Bang Green Riders, cennik', url: 'https://caobanggreenriders.com/rental' }, { name: 'Cao Bang Eco Travel, cennik', url: 'https://caobangecotravel.com/motorbike/' }] },
  'haivan.car': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/hoi-an-hue-private-car/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
  'haivan.moto': { ahead: 3, links: [{ name: 'Hidden Land Travel', url: 'https://hiddenlandtravel.com/rental/hoi-an-to-hue-motorbike-rental/' }, { name: 'Tigit Motorbikes (start w Đà Nẵng)', url: 'https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike' }] },
  'saigon.cangio': { ahead: 2, links: [{ name: 'Green SM Green Tour', url: 'https://www.greensm.com/vn-vi/green-tour' }, { name: 'Saigontourist', url: 'https://xedulich.saigontourist.net/' }, { name: 'Grab, wynajem na godziny', url: 'https://www.grab.com/vn/transport/rent/' }] },
  'hanoi.duonglam': { ahead: 2, links: [{ name: 'Green SM Green Tour', url: 'https://www.greensm.com/vn-vi/green-tour' }] },
  'hoian.cooking': { ahead: 2, links: [{ name: 'Tra Que Water Wheel', url: 'https://traquewaterwheel.com/' }] },
  'cattien.park': { ahead: 1, links: [{ name: 'Park Cát Tiên, kontakt', url: 'https://cattiennationalpark.com.vn/lien-he/' }, { name: 'Park Cát Tiên, nocne safari', url: 'https://cattiennationalpark.com.vn/xem-thu-dem/' }] },
  'puluong.guide': { ahead: 1, links: [] },
  'babe.boat': { ahead: 0, links: [] },
  'hue.citadel': { ahead: 0, links: [{ name: 'Bilety elektroniczne', url: 'https://eticket.hueworldheritage.org.vn/' }, { name: 'Cennik', url: 'https://hueworldheritage.org.vn/Thong-tin-tham-quan/Gia-ve' }] }
};
var ENTRY = { visaFreeDays: 45, visaFreeUntil: '2028-08-14', checked: '2026-10-12',
  links: [{ name: 'Ambasada RP w Hanoi: bez wizy do 45 dni', url: 'https://www.gov.pl/web/wietnam/zwolnienie-z-obowiazku-posiadania-wizy-dla-pobytow-w-celach-turystycznych-nie-dluzszych-niz-45-dni' },
    { name: 'MSZ: Wietnam w serwisie Odyseusz', url: 'https://odyseusz.gov.pl/VN' },
    { name: 'GIS: szczepienia dla podróżujących', url: 'https://www.gov.pl/web/gis/zalecane-szczepienia-dla-podrozujacych' }] };
// the places where a stay sleeps with hosts (the plans of their first day say so): their rooms go on the list of what to book
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang'];
```


- [ ] **Krok 5: `site2/build.py`.**

*build.py: nowe pliki danych.* Zamień:

```python
+ ["photos.js", "ui.js", "panels.js", "page.js", "basemap.js"])
```

na:

```python
+ ["photos.js", "ui.js", "panels.js", "costs.js", "before.js", "page.js", "basemap.js"])
```


- [ ] **Krok 6: `research/ceny-2026-10.md`.**

*research: wiersz day.solo.* Zamień:

```markdown
| day | osoba/dzień | 13 | 28 | 365 000–810 000 VND; osoba sama +2–5 EUR za Grab; Phú Quốc i Hội An bliżej górnej granicy |
```

na:

```markdown
| day | osoba/dzień | 13 | 28 | 365 000–810 000 VND; Phú Quốc i Hội An bliżej górnej granicy |
| day.solo | osoba/dzień | 2 | 5 | dopłata osoby jadącej samotnie, która płaci cały kurs Grab: +60 000 i +140 000 VND (sekcja „Dzień na osobę”) |
```


- [ ] **Krok 7: `tools/links.sh`.**

*nowy skrypt: sprawdzanie linków.* Cały plik:

```bash
#!/bin/bash
# Checks the booking and entry links of the page (BOOK and ENTRY in site2/src/before.js): asks each address once with curl,
# as a browser would (redirects followed), and prints its answer. Nothing is saved: the pages go to /dev/null.
#   bash tools/links.sh            every link, one line each: the final status and the address
# Exit 1 when an address does not answer 2xx. A site may refuse curl although a browser opens it (a firewall, 403 or 202):
# open such an address in a browser before you count it as broken (research/rezerwacje-2026-10.md, "Jak czytać").
set -uo pipefail
cd "$(dirname "$0")/.."
bad=0
for url in $(grep -o "url: 'https://[^']*'" site2/src/before.js | sed "s/^url: '//; s/'$//" | sort -u); do
  code=$(curl -s -o /dev/null -w '%{http_code}' -L -A 'Mozilla/5.0' --max-time 25 "$url")
  echo "$code $url"
  case "$code" in 2*) ;; *) bad=$((bad + 1)) ;; esac
done
if [ "$bad" -gt 0 ]; then echo "links.sh: $bad address(es) did not answer 2xx" >&2; exit 1; fi
echo "links.sh: all addresses answer"
```

Potem:

```bash
chmod +x tools/links.sh
```


- [ ] **Krok 8: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 9: Linki**

Skrypt pyta przez curl każdy adres z `before.js` (34) i niczego nie zapisuje:

```bash
bash tools/links.sh
```

Oczekiwane: każda linia zaczyna się od `200`, ostatnia to `links.sh: all addresses answer`, kod 0. Gdy któryś adres nie odpowiada 2xx, otwórz go w przeglądarce (część stron odrzuca curl). Link, który naprawdę nie działa, zgłoś użytkownikowi: nowy link trafia najpierw do researchu.

- [ ] **Krok 10: Commit**

```bash
git add tests/data.test.js tests/run.sh site2/src/costs.js site2/src/before.js site2/build.py research/ceny-2026-10.md tools/links.sh
git commit -F - <<'EOF'
Dane: ceny (costs.js) i rezerwacje, wjazd, noclegi u gospodarzy (before.js) z tabel researchu, test zgodności z researchem, wiersz day.solo, tools/links.sh

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Płatne pozycje i rzeczy do spakowania w treści dni

Dni wskazują swoje płatne części polem `cost` (klucze `COSTS.items`; wybór, np. auto albo easy rider, to lista w liście), a rzeczy do spakowania polem `pack` (`PACK_CODES`). `stopDays` przenosi oba pola do dni trasy; pola wersji (łatwej, trudnej) mają pierwszeństwo, a wersja bez nich bierze pola dnia.

**Pliki:**
- Zmień: `site2/src/content.js`, `site2/src/page.js`, `site2/src/content/<id>.js` (13 plików)
- Testy: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Korzysta: `COSTS.items` (zadanie 3).
- Daje:
  - pola dnia `cost: [klucz | [klucz, klucz]]` i `pack: [kod]`, także w wersjach `easy` i `hard`; `pack` także w wydarzeniach (`events`);
  - `PACK_CODES = ['leeches', 'torch']` w `content.js`;
  - każdy dzień z `stopDays(…)` ma `cost` i `pack` (zawsze tablice; plan na jedną noc i plan powrotu tylko z własnym `cost`).

- [ ] **Krok 1: Testy, które nie przechodzą.**

*dane zastępcze dni z cost i pack.* W `tests/page.test.js` zamień:

```js
    { p: 1, o: 1, pace: 'travel', t: 'A1', d: 'a1', solo: { pace: 'boat', t: 'A1s', d: 'a1s', early: true } },
    { p: 3, o: 2, pace: 'rest', t: 'A3', d: 'a3' },
    { p: 2, o: 3, pace: 'hike', t: 'A2', d: 'a2', early: true, rain: 'r2',
      easy: { pace: 'nature', t: 'A2e', d: 'a2e', early: false }, hard: { pace: 'hike', t: 'A2h', d: 'a2h', off: [7, 8] } }
```

na:

```js
    { p: 1, o: 1, pace: 'travel', t: 'A1', d: 'a1', cost: ['x.a1'], solo: { pace: 'boat', t: 'A1s', d: 'a1s', early: true } },
    { p: 3, o: 2, pace: 'rest', t: 'A3', d: 'a3' },
    { p: 2, o: 3, pace: 'hike', t: 'A2', d: 'a2', early: true, rain: 'r2', cost: ['x.a2', ['x.car', 'x.rider']], pack: ['leeches'],
      easy: { pace: 'nature', t: 'A2e', d: 'a2e', early: false, cost: ['x.a2e'] }, hard: { pace: 'hike', t: 'A2h', d: 'a2h', off: [7, 8], cost: [] } }
```

*test: cost i pack w planach dni.* W `tests/page.test.js` po:

```js
eq([dH.early, dH.rain, dH.variant], [true, 'r2', 'hard'], 'the hard version keeps the day\'s early start and rain plan');
```

dopisz w następnych liniach:

```js
eq([dU.cost, dU.pack, dE.cost, dE.pack, dH.cost], [['x.a2', ['x.car', 'x.rider']], ['leeches'], ['x.a2e'], ['leeches'], []],
  'cost and pack: the day\'s; a version\'s own cost wins, one without keeps the day\'s (pack too), [] means none');
eq([stopDays(FC, { n: 1, start: 1 }, 0, 2, JAN)[0].cost, stopDays(FC, { n: 2, start: 8 }, 1, 2, JAN)[0].cost], [[], []], 'a solo plan and again: their own cost only');
```

*test treści: pola cost i pack.* W `tests/content.test.js` zamień:

```js
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'easy', 'hard', 'solo'];
  // a plan or a version of one: pace, title, text, maybe an early start
  function plan(w, d, keys) {
    Object.keys(d).forEach(function (k) { need(keys.indexOf(k) > -1, w + ': unknown field ' + k); });
    need(PACES.indexOf(d.pace) > -1, w + ': pace one of ' + PACES.join(', '));
    need(isText(d.t) && isText(d.d), w + ': title t and text d');
    if (d.early != null) need(typeof d.early === 'boolean', w + ': early is true or false');
  }
```

na:

```js
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'cost', 'pack', 'easy', 'hard', 'solo'];
  // the paid parts of a plan (keys of COSTS.items, or a list of two or more to pick from) and what it adds to the packing
  function costAndPack(w, d) {
    if (d.cost != null) {
      need(Array.isArray(d.cost), w + ': cost is a list');
      (Array.isArray(d.cost) ? d.cost : []).forEach(function (e) {
        var keys = Array.isArray(e) ? e : [e];
        need(!Array.isArray(e) || e.length >= 2, w + ': a choice in cost names two things or more');
        keys.forEach(function (k) { need(COSTS.items[k], w + ': cost ' + k + ' is no item of COSTS'); });
      });
    }
    if (d.pack != null) need(Array.isArray(d.pack) && d.pack.every(function (k) { return PACK_CODES.indexOf(k) > -1; }), w + ': pack lists codes of PACK_CODES');
  }
  // a plan or a version of one: pace, title, text, maybe an early start
  function plan(w, d, keys) {
    Object.keys(d).forEach(function (k) { need(keys.concat(['cost', 'pack']).indexOf(k) > -1, w + ': unknown field ' + k); });
    need(PACES.indexOf(d.pace) > -1, w + ': pace one of ' + PACES.join(', '));
    need(isText(d.t) && isText(d.d), w + ': title t and text d');
    if (d.early != null) need(typeof d.early === 'boolean', w + ': early is true or false');
    costAndPack(w, d);
  }
```

*test treści: pack w wydarzeniach.* W `tests/content.test.js` zamień:

```js
      Object.keys(e).forEach(function (k) { need(['from', 'to', 't', 'warn'].indexOf(k) > -1, w + ': unknown field ' + k); });
```

na:

```js
      Object.keys(e).forEach(function (k) { need(['from', 'to', 't', 'warn', 'pack'].indexOf(k) > -1, w + ': unknown field ' + k); });
      costAndPack(w, { pack: e.pack });
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: Error: cost and pack: the day's; a version's own cost wins, one without keeps the day's (pack too), [] means none: got [null,null,null,null,null], want [["x.a2",["x.car","x.rider"]],["leeches"],["x.a2e"],["leeches"],[]]` (`tests/page.test.js`).

- [ ] **Krok 3: `site2/src/content.js`.**

*opis pól: cost, pack.* Zamień:

```js
   - days: one plan per night of the longest stay (nights[2] in places.js),
     { p, o, pace, t, d, early?, rain?, easy?, hard?, solo? }:
```

na:

```js
   - days: one plan per night of the longest stay (nights[2] in places.js),
     { p, o, pace, t, d, early?, rain?, cost?, pack?, easy?, hard?, solo? }:
```

*opis pól: cost, pack.* Po:

```js
     a version keeps the day's early start unless it sets its own, and the day's rain plan;
```

dopisz w następnych liniach:

```js
     cost: the paid parts of the plan, keys of COSTS.items (costs.js), for the budget and the list of what to book; an entry
     that is a list names things to pick from (a car with a driver or an easy rider): the budget takes the cheapest and the
     dearest of them; a version keeps the day's cost unless it sets its own ([] for none); a solo plan has its own only;
     pack: codes of PACK_CODES for the list of what to pack, as cost (also on an event);
```

*opis pól: pack w wydarzeniu.* Zamień:

```js
     [{ from, to, t, warn? }], from and to as [month, day] (a window may run over the new year); t: what to know, in a sentence or
     two; warn: true for a caution (high water, floods, leeches) rather than an event; sources in research/sezony-2026-10.md;
```

na:

```js
     [{ from, to, t, warn?, pack? }], from and to as [month, day] (a window may run over the new year); t: what to know, in a
     sentence or two; warn: true for a caution (high water, floods, leeches) rather than an event; sources in
     research/sezony-2026-10.md;
```

*PACK_CODES.* Po:

```js
var CONTENT = {};
var PACES = ['travel', 'hike', 'nature', 'boat', 'culture', 'rest'];
```

dopisz w następnych liniach:

```js
// what a day or an event adds to the list of what to pack (UI keys p.<code>): socks against leeches, a torch
var PACK_CODES = ['leeches', 'torch'];
```


- [ ] **Krok 4: `site2/src/page.js`.**

*variantOf i plainDay: cost, pack.* Zamień:

```js
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: day.rain || null, variant: v };
}
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay
function plainDay(x) { return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: null }; }
```

na:

```js
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: day.rain || null, variant: v,
    cost: (src.cost || day.cost || []).slice(), pack: (src.pack || day.pack || []).slice() };
}
// a plan that has no versions: the solo plan of one night, the arrival day of a second stay
function plainDay(x) { return { pace: x.pace, t: x.t, d: x.d, early: !!x.early, rain: null, variant: null, cost: (x.cost || []).slice(), pack: (x.pack || []).slice() }; }
```

*variantOf: komentarz.* Zamień:

```js
   version keeps the day's early start unless it sets its own, and the day's rain plan.
   Returns { pace, t, d, early, rain, variant }, variant 'easy', 'hard' or null. */
```

na:

```js
   version keeps the day's early start unless it sets its own, and the day's rain plan; its cost and pack, see content.js.
   Returns { pace, t, d, early, rain, variant, cost, pack }, variant 'easy', 'hard' or null. */
```

*stopDays: komentarz.* Zamień:

```js
/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant }], one per night, from the stay's first day.
```

na:

```js
/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant, cost, pack }], one per night, from the stay's first day.
```


- [ ] **Krok 5: `cost` i `pack` w dniach miejsc.** Wstawki są mechaniczne, więc robi je skrypt (sprawdzony: daje te same pliki co sucha próba). Wstawia `cost` (i `pack`) przed tytułem `t` dnia o danym tytule; trzecia liczba mówi, który z dni o tym samym tytule (od 0). W Cát Tiên dochodzi `pack` w wydarzeniu pory deszczowej. Uruchom z katalogu repo:

```bash
python3 -I - <<'EOF'
# cost (and pack) before the title t of the days: (place, title, which day with that title, counting from 0, cost, pack)
SPEC = [
 ('saigon', 'Namorzyny Cần Giờ', 0, ['saigon.cangio'], None),
 ('mekong', 'Kanały Phong Điền', 0, ['mekong.sampan'], None),
 ('mekong', 'Delta o zmierzchu i o świcie', 0, ['mekong.sampan', 'mekong.market'], None),
 ('mekong', 'Pływający targ o świcie', 0, ['mekong.market'], None),
 ('mekong', 'Pływający targ o świcie', 1, ['mekong.market', 'mekong.conson'], None),
 ('phuquoc', 'Rozgwiazdy na płyciźnie i las', 0, ['phuquoc.north'], None),
 ('phuquoc', 'Wioski rybackie i pusta plaża', 0, ['phuquoc.east'], None),
 ('cattien', 'W głąb dżungli', 0, ['cattien.safari'], None),
 ('cattien', 'Dżungla nocą i o świcie', 0, ['cattien.safari', 'cattien.gibbons'], None),
 ('cattien', 'Gibony i Jezioro Krokodyli', 0, ['cattien.gibbons', 'cattien.bausau_day'], None),
 ('cattien', 'Cát Tiên na spokojnie', 0, ['cattien.trees'], None),
 ('cattien', 'Noc nad Jeziorem Krokodyli', 0, ['cattien.bausau_night'], ['torch']),
 ('dalat', 'Las mglisty Bidoup–Núi Bà', 0, ['dalat.bidoup'], None),
 ('dalat', 'Las sosnowy i klasztor nad jeziorem', 0, ['dalat.cablecar'], None),
 ('dalat', 'Szczyt Lang Biang', 0, ['dalat.langbiang'], None),
 ('dalat', 'Stara kolej i kwiatowe wioski', 0, ['dalat.train'], None),
 ('dalat', 'Herbaciane wzgórza i plantacja kawy', 0, ['dalat.caudat'], None),
 ('hoian', 'Hội An bez pośpiechu', 0, ['hoian.cooking'], None),
 ('hue', 'Cesarskie Miasto', 0, ['hue.citadel'], None),
 ('hue', 'Huế na rowerze', 0, ['hue.tombs'], None),
 ('hue', 'Huế łodzią i samochodem', 0, ['hue.boatcar'], None),
 ('hue', 'Okolice Huế', 0, ['hue.lagoon'], None),
 ('puluong', 'Grzbiety, wioski i wodospad', 0, ['puluong.guide'], None),
 ('puluong', 'Doliny widziane z drogi', 0, ['puluong.car'], None),
 ('puluong', 'Na szczyt Pù Luông', 0, ['puluong.summit'], ['leeches']),
 ('ninhbinh', 'Między krasowe wzgórza', 0, ['ninhbinh.vanlong'], None),
 ('ninhbinh', 'Krasowe wzgórza wieczorem i rano', 0, ['ninhbinh.vanlong', 'ninhbinh.trangan'], None),
 ('ninhbinh', 'Tràng An o 7:00', 0, ['ninhbinh.trangan'], None),
 ('ninhbinh', 'Tràng An o 7:00', 1, ['ninhbinh.trangan', 'ninhbinh.car'], None),
 ('catba', 'Noc na Zatoce Lan Hạ', 0, ['catba.cruise'], None),
 ('catba', 'Việt Hải i park narodowy', 0, ['catba.viethai'], None),
 ('catba', 'Việt Hải bez wspinaczki', 0, ['catba.viethai_boat'], None),
 ('hanoi', 'Wioska Đường Lâm', 0, ['hanoi.duonglam'], None),
 ('hanoi', 'Ceramika i rzeka', 0, ['hanoi.battrang'], None),
 ('babe', 'Jezioro w jedno popołudnie', 0, ['babe.boat'], None),
 ('babe', 'Na wodzie', 0, ['babe.boat'], None),
 ('babe', 'Wioski wysoko nad jeziorem', 0, ['babe.guide'], None),
 ('babe', 'Spokojny poranek nad jeziorem', 0, ['babe.cooking'], None),
 ('caobang', 'Oko Anioła i Pác Bó', 0, [['caobang.car', 'caobang.easyrider']], None),
 ('caobang', 'Jeziora, przełęcz, wodospad i jaskinia', 0, [['caobang.car', 'caobang.easyrider']], None),
]
def jsval(v):
    return '[' + ', '.join(jsval(x) for x in v) + ']' if isinstance(v, list) else "'" + v + "'"
for place in sorted(set(r[0] for r in SPEC)):
    path = 'site2/src/content/' + place + '.js'
    s = open(path, encoding='utf-8').read()
    for p, title, occ, cost, pack in SPEC:
        if p != place: continue
        assert s.count("t: '" + title + "'") > occ, (place, title)
        pos = -1
        for _ in range(occ + 1):
            pos = s.index("t: '" + title + "'", pos + 1)
        s = s[:pos] + 'cost: ' + jsval(cost) + ', ' + ('pack: ' + jsval(pack) + ', ' if pack else '') + s[pos:]
    if place == 'cattien':
        old = "warn: true, t: 'Pora deszczowa w parku"
        assert s.count(old) == 1
        s = s.replace(old, "warn: true, pack: ['leeches'], t: 'Pora deszczowa w parku")
    open(path, 'w', encoding='utf-8').write(s)
print('cost and pack: %d days' % len(SPEC))
EOF
```

Oczekiwane: `cost and pack: 40 days`.

- [ ] **Krok 6: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 7: Commit**

```bash
git add tests/page.test.js tests/content.test.js site2/src/content.js site2/src/page.js site2/src/content/babe.js site2/src/content/caobang.js site2/src/content/catba.js site2/src/content/cattien.js site2/src/content/dalat.js site2/src/content/hanoi.js site2/src/content/hoian.js site2/src/content/hue.js site2/src/content/mekong.js site2/src/content/ninhbinh.js site2/src/content/phuquoc.js site2/src/content/puluong.js site2/src/content/saigon.js
git commit -F - <<'EOF'
Treść: płatne pozycje (cost) i rzeczy do spakowania (pack) w dniach miejsc; stopDays przenosi je do dni trasy

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Zamiana motocykla: dane, link, wersje dni, tekst przejazdu

Zamiana to dane (`SWAPS`): miejsce, którego dni mają wersje `self` (Cao Bằng), albo droga z własnym tekstem i ceną (Hội An–Huế przez przełęcz Hải Vân). Ustawienia mają listę `moto` zamian ustawionych na „Samodzielnie”, a link klucz `motocykl=`. Przełącznik na stronie dochodzi w zadaniu 10; po tym zadaniu działa już link.

**Pliki:**
- Zmień: `site2/src/content.js`, `site2/src/content/caobang.js`, `site2/src/page.js`, `site2/src/app.js`, `site2/src/ui.js`
- Testy: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Korzysta: pozycje `caobang.*` i `haivan.*` w `COSTS.items` (zadanie 3), `cost` w dniach (zadanie 4).
- Daje:
  - `SWAPS = { caobang: { place: 'caobang' }, haivan: { road: 'hoian-hue', text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } } }`;
  - w ustawieniach `moto: [id]` (domyślnie `[]`), w linku `motocykl=caobang,haivan`; `settingsFromLink(link, defaults, places, hubs, rejected, swaps)` zostawia tylko zamiany z `SWAPS`;
  - `selfSwaps(moto, swaps)` → `{ places: [id], roads: { '<a>-<b>': { text, cost } } }` (drogi po dwóch miejscach w kolejności alfabetycznej); `withSwap(s, id, self)` → kopia ustawień z zamianą włączoną albo wyłączoną;
  - `variantOf(day, level, month, notLate, self)` i `stopDays(c, stop, done, level, months, next, self)`: przy `self` wersja `self` dnia ma pierwszeństwo przed wersją poziomu;
  - `segKey(g, airports, roadKeys, selfRoads)`: droga ujechana samodzielnie ma własny tekst;
  - `apply` w `app.js` zaczyna od `copySettings(s)`, więc ustawienia bez list `add`, `remove` i `moto` nie wywracają strony.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*test: swaps w linku.* W `tests/page.test.js` przed linią zaczynającą się od `print('link ok');` wstaw:

```js
// the swaps set to „Samodzielnie”: a list of small letters, written only when there are any
var badM = [];
eq([parseLink('#od=SGN&motocykl=caobang,haivan').moto, parseLink('#motocykl=Cao', badM), badM], [['caobang', 'haivan'], {}, ['moto']], 'motocykl: the swaps, small letters only');
var roundM = Object.assign({}, round, { moto: ['caobang'] });
eq(linkHash(roundM), linkHash(round) + '&motocykl=caobang', 'linkHash: the swaps last, only when there are any');
eq(parseLink(linkHash(roundM)), roundM, 'linkHash, then parseLink: the same settings (with a swap)');
```

*test: swaps w ustawieniach.* W `tests/page.test.js` przed linią zaczynającą się od `print('settings ok');` wstaw:

```js
var gM = settingsFromLink(parseLink('#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2&motocykl=caobang,xyz,caobang'), DEF, PLACES, HUBS, [], SWAPS);
eq([gM.settings.moto, gM.dropped], [['caobang'], ['moto']], 'a link: known swaps, each once; an unknown one is dropped and reported');
eq([opened('#od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2').settings.moto, DEF.moto], [[], []], 'no swap in the link or the defaults: none');
eq([withSwap(DEF, 'caobang', true).moto, withSwap(withSwap(DEF, 'caobang', true), 'caobang', false).moto, withAdded(withSwap(DEF, 'haivan', true), 'mekong').moto,
  withoutChanges(withSwap(DEF, 'haivan', true)).moto], [['caobang'], [], ['haivan'], ['haivan']], 'withSwap sets a swap and takes it back; Dodaj and „Wróć do trasy” keep it');
eq(selfSwaps(['caobang', 'haivan'], SWAPS), { places: { caobang: true }, roads: { 'hoian-hue': { text: 'r.haivan_self', cost: 'haivan.moto' } } },
  'selfSwaps: the place whose days go self, the road with its text and cost');
```

*test: wersje samodzielne w Cao Bằng.* W `tests/page.test.js` przed linią zaczynającą się od `eq(stopDays(FC, { n: 4, start: 1 }, 0, 2, JAN), null, 'more nights than plans');` wstaw:

```js
function cb(level, self) { return stopDays(CONTENT.caobang, { n: 3, start: 1 }, 0, level, JAN, null, self).map(function (d) { return [d.variant, d.cost]; }); }
eq([cb(2, false), cb(1, false), cb(1, true), cb(3, true)],
  [[[null, []], [null, [['caobang.car', 'caobang.easyrider']]], [null, [['caobang.car', 'caobang.easyrider']]]],
   [['easy', []], [null, [['caobang.car', 'caobang.easyrider']]], [null, [['caobang.car', 'caobang.easyrider']]]],
   [['self', []], ['self', ['caobang.moto']], ['self', ['caobang.moto']]], [['self', []], ['self', ['caobang.moto']], ['self', ['caobang.moto']]]],
  'Cao Bằng ridden yourself: every day of the loop takes its self version, at every level, with the motorbike as its cost');
```

*test: tekst przejazdu przez Hải Vân.* W `tests/page.test.js` po:

```js
eq([road('hue', 'hoian'), road('hoian', 'hue')], [['r.haivan', {}], ['r.haivan', {}]], 'the Hải Vân pass, either way');
```

dopisz w następnych liniach:

```js
var selfR = selfSwaps(['haivan'], SWAPS).roads;
eq([segKey({ mode: 'road', from: 'hue', to: 'hoian', h: 3.25 }, AIRPORTS, ROAD_KEYS, selfR), segKey({ mode: 'road', from: 'hoian', to: 'hue', h: 3.25 }, AIRPORTS, ROAD_KEYS, selfR),
  segKey({ mode: 'road', from: 'cattien', to: 'dalat', h: 4.5 }, AIRPORTS, ROAD_KEYS, selfR)], [['r.haivan_self', {}], ['r.haivan_self', {}], ['r.car_baoloc', {}]],
  'the Hải Vân pass ridden yourself, either way; other roads as before');
```

*test treści: pole self.* W `tests/content.test.js` zamień:

```js
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'cost', 'pack', 'easy', 'hard', 'solo'];
```

na:

```js
  var DAY_KEYS = ['p', 'o', 'pace', 't', 'd', 'early', 'rain', 'cost', 'pack', 'easy', 'hard', 'solo', 'self'];
```

*test treści: wersja self.* W `tests/content.test.js` zamień:

```js
      if (d.solo) {
        plan(w + ' solo', d.solo, ['pace', 't', 'd', 'early']);
        need(d.p === 1, w + ': solo only on the p 1 day');
      }
```

na:

```js
      if (d.solo) {
        plan(w + ' solo', d.solo, ['pace', 't', 'd', 'early']);
        need(d.p === 1, w + ': solo only on the p 1 day');
      }
      if (d.self) {
        plan(w + ' self', d.self, ['pace', 't', 'd', 'early']);
        need(Object.keys(SWAPS).some(function (k) { return SWAPS[k].place === id; }), w + ': a self version only in a place of SWAPS');
      }
```

*test treści: SWAPS i ceny w użyciu.* W `tests/content.test.js` zamień:

```js
  Object.keys(ROAD_KEYS).forEach(function (k) {
    need(k === k.split('-').sort().join('-') && k.split('-').every(function (id) { return PLACES[id]; }), 'ROAD_KEYS ' + k + ': two places in alphabetical order');
  });
});
```

na:

```js
  Object.keys(ROAD_KEYS).forEach(function (k) {
    need(k === k.split('-').sort().join('-') && k.split('-').every(function (id) { return PLACES[id]; }), 'ROAD_KEYS ' + k + ': two places in alphabetical order');
  });
  // the swaps: a place with self versions of its days, or a road of ROAD_KEYS with a self text and a cost for each way
  Object.keys(SWAPS).forEach(function (k) {
    var w = SWAPS[k];
    if (w.place) need(CONTENT[w.place] && CONTENT[w.place].days.some(function (d) { return d.self; }), 'SWAPS.' + k + ': ' + w.place + ' has days with a self version');
    if (w.road) need(ROAD_KEYS[w.road] && UI.pl[w.text] && COSTS.items[w.cost.driver] && COSTS.items[w.cost.self], 'SWAPS.' + k + ': a road of ROAD_KEYS, its self text and the cost of each way');
    need(!!w.place !== !!w.road, 'SWAPS.' + k + ': a place or a road');
  });
  // every item of COSTS is the cost of some plan or of a swap's road
  var paid = {};
  Object.keys(CONTENT).forEach(function (id) {
    CONTENT[id].days.forEach(function (d) {
      [d, d.easy, d.hard, d.solo, d.self].forEach(function (v) { ((v && v.cost) || []).forEach(function (e) { [].concat(e).forEach(function (x) { paid[x] = true; }); }); });
    });
  });
  Object.keys(SWAPS).forEach(function (k) { if (SWAPS[k].cost) { paid[SWAPS[k].cost.driver] = true; paid[SWAPS[k].cost.self] = true; } });
  Object.keys(COSTS.items).forEach(function (k) { need(paid[k], 'COSTS.items ' + k + ' is no cost of any plan or swap'); });
});
```

*test tekstów: tekst zamiany.* W `tests/content.test.js` po:

```js
  Object.keys(ROAD_KEYS).forEach(function (k) { wants(ROAD_KEYS[k], 'ROAD_KEYS'); });
```

dopisz w następnych liniach:

```js
  Object.keys(SWAPS).forEach(function (k) { if (SWAPS[k].text) wants(SWAPS[k].text, 'SWAPS'); });
```

*test tekstów: znaczek self.* W `tests/content.test.js` zamień:

```js
'badge.': ['easy', 'hard'],
```

na:

```js
'badge.': ['easy', 'hard', 'self'],
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: Error: motocykl: the swaps, small letters only: got [null,{},[]], want [["caobang","haivan"],{},["moto"]]` (`tests/page.test.js`).

- [ ] **Krok 3: `site2/src/content.js`.**

*opis pola self.* Po:

```js
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off?, late? }; off: the months 1–12 it is not offered;
```

dopisz w następnych liniach:

```js
     self: the plan when the place's swap (SWAPS) is set to „Samodzielnie”, { pace, t, d, early? }, at every level;
```

*SWAPS.* Po:

```js
/* Roads with a text of their own (UI keys), by their two places in alphabetical order; see segKey in page.js. */
var ROAD_KEYS = { 'cattien-dalat': 'r.car_baoloc', 'hoian-hue': 'r.haivan' };
```

dopisz w następnych liniach, po pustej linii:

```js
/* Either-or choices inside a trip (plan 2B): for now riding a motorbike yourself instead of being driven, on the loop around
   Cao Bằng and on the road over the Hải Vân pass. A link lists the swaps set to „Samodzielnie” (motocykl=caobang,haivan);
   the trip does not change. place: the place whose days take their self versions (the days of the loop); road: a road of
   ROAD_KEYS, with text, its UI key when ridden yourself, and cost, the item of COSTS (costs.js) for each way: driver (with
   a driver, the usual) and self. */
var SWAPS = {
  caobang: { place: 'caobang' },
  haivan: { road: 'hoian-hue', text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } }
};
```


- [ ] **Krok 4: `site2/src/content/caobang.js`.**

*Cao Bằng p 1: wersja self.* Zamień:

```js
z kierowcą. Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.' } },
```

na:

```js
z kierowcą. Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.' },
      self: { pace: 'travel', t: 'Wieczór w Cao Bằng', d: 'Nocleg w mieście Cao Bằng, a na kolację kaczka pieczona z siedmioma przyprawami (vịt quay 7 vị), specjalność regionu. Wypożyczony motocykl odbierz jeszcze wieczorem: sprawdź hamulce, opony i światła, zrób zdjęcia rys i weź kask z atestem. Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.' } },
```

*Cao Bằng p 3: wersja self.* Zamień:

```js
Pác Bó przy granicy.' },
```

na:

```js
Pác Bó przy granicy.',
      self: { pace: 'nature', cost: ['caobang.moto'], t: 'Oko Anioła i Pác Bó motocyklem', d: 'Motocyklem do Núi Mắt Thần – góry z otworem na wylot w szczycie, wznoszącej się nad trawiastą doliną – i nad czysty, zielony strumień w Pác Bó przy granicy. Wróć przed zmrokiem: górskie drogi nie mają oświetlenia.' } },
```

*Cao Bằng p 2: wersja self.* Zamień:

```js
kamiennymi domami.' }
  ],
```

na:

```js
kamiennymi domami.',
      self: { pace: 'nature', cost: ['caobang.moto'], t: 'Jeziora, przełęcz, wodospad i jaskinia motocyklem', d: 'Rano łańcuch krasowych jezior Thang Hen i serpentyny przełęczy Mã Phục: zjeżdżaj powoli, bo na zakrętach bywa żwir, a zza nich wyjeżdżają ciężarówki. W środku dnia wodospad Bản Giốc, a po południu jaskinia Ngườm Ngao. Do wodospadu dojedziesz w środku dnia, bo w porze suchej, od końca listopada do początku maja, elektrownie w górze rzeki potrafią rano zatrzymywać wodę, a najwięcej jej spada ok. 11:00–14:30. Nocleg w Khuổi Ky, wiosce ludu Tày z kamiennymi domami, a następnego ranka ok. 85 km do miasta Cao Bằng, gdzie oddasz motocykl.' } }
  ],
```


- [ ] **Krok 5: `site2/src/page.js`.**

*link: klucz motocykl.* Zamień:

```js
var LINK_KEYS = { od: 'from', 'do': 'to', start: 'start', koniec: 'end', miesiac: 'month', dni: 'days', co: 'interests', poziom: 'level', dodaj: 'add', usun: 'remove' };
var SETTINGS_ORDER = ['from', 'to', 'start', 'end', 'year', 'month', 'days', 'interests', 'level', 'add', 'remove'];
```

na:

```js
var LINK_KEYS = { od: 'from', 'do': 'to', start: 'start', koniec: 'end', miesiac: 'month', dni: 'days', co: 'interests', poziom: 'level', dodaj: 'add', usun: 'remove',
  motocykl: 'moto' };
var SETTINGS_ORDER = ['from', 'to', 'start', 'end', 'year', 'month', 'days', 'interests', 'level', 'add', 'remove', 'moto'];
```

*parseLink: komentarz.* Zamień:

```js
   #od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian, or with dates
   #od=SGN&do=HAN&start=2027-02-01&koniec=2027-02-15&co=&poziom=2. Returns the well-formed fields typed for normSettings:
   from, to, start, end as texts; year, month, days, level as numbers; interests, add, remove as lists. A malformed field is
```

na:

```js
   #od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda,gory&poziom=2&dodaj=phuquoc&usun=hoian&motocykl=caobang, or with dates
   #od=SGN&do=HAN&start=2027-02-01&koniec=2027-02-15&co=&poziom=2. Returns the well-formed fields typed for normSettings:
   from, to, start, end as texts; year, month, days, level as numbers; interests, add, remove, moto as lists (moto: the
   swaps set to „Samodzielnie”, SWAPS in content.js). A malformed field is
```

*parseLink: lista zamian.* Zamień:

```js
      if (list.every(function (x) { return (field === 'interests' ? /^[a-z]+$/ : /^[A-Za-z]+$/).test(x); })) got[field] = list;
```

na:

```js
      if (list.every(function (x) { return (field === 'add' || field === 'remove' ? /^[A-Za-z]+$/ : /^[a-z]+$/).test(x); })) got[field] = list;
```

*linkHash: komentarz.* Zamień:

```js
   none (co=), so a link keeps meaning "no interest" if the defaults ever change; Dodaj and Usuń only when there are any. */
```

na:

```js
   none (co=), so a link keeps meaning "no interest" if the defaults ever change; Dodaj, Usuń and the swaps only when there
   are any. */
```

*linkHash: zamiany.* Zamień:

```js
  if (s.remove && s.remove.length) parts.push('usun=' + s.remove.join(','));
  return '#' + parts.join('&');
```

na:

```js
  if (s.remove && s.remove.length) parts.push('usun=' + s.remove.join(','));
  if (s.moto && s.moto.length) parts.push('motocykl=' + s.moto.join(','));
  return '#' + parts.join('&');
```

*copySettings: moto.* Zamień:

```js
/* A copy of the settings with lists of its own; add and remove are never missing. */
function copySettings(s) {
  var o = {};
  Object.keys(s).forEach(function (k) { o[k] = Array.isArray(s[k]) ? s[k].slice() : s[k]; });
  o.add = o.add || [];
  o.remove = o.remove || [];
  return o;
}
```

na:

```js
/* A copy of the settings with lists of its own; add, remove and moto are never missing. */
function copySettings(s) {
  var o = {};
  Object.keys(s).forEach(function (k) { o[k] = Array.isArray(s[k]) ? s[k].slice() : s[k]; });
  o.add = o.add || [];
  o.remove = o.remove || [];
  o.moto = o.moto || [];
  return o;
}
```

*settingsFromLink: swaps.* Zamień:

```js
   Returns { settings, st, dropped }: the settings to show, normSettings' result, and the link fields not used.
   The optional rejected (the malformed fields from parseLink) starts dropped, so they are reported too. */
function settingsFromLink(link, defaults, places, hubs, rejected) {
```

na:

```js
   The swaps (moto) keep the ids of swaps (SWAPS) only, each once; an unknown one is dropped and reported.
   Returns { settings, st, dropped }: the settings to show, normSettings' result, and the link fields not used.
   The optional rejected (the malformed fields from parseLink) starts dropped, so they are reported too. */
function settingsFromLink(link, defaults, places, hubs, rejected, swaps) {
```

*settingsFromLink: tylko znane zamiany.* Zamień:

```js
      (st.start ? ['year', 'month', 'days'] : ['start', 'end']).forEach(function (k) {
        if (k in link && dropped.indexOf(k) < 0) dropped.push(k);
        delete s[k];
      });
      return { settings: s, st: st, dropped: dropped };
```

na:

```js
      (st.start ? ['year', 'month', 'days'] : ['start', 'end']).forEach(function (k) {
        if (k in link && dropped.indexOf(k) < 0) dropped.push(k);
        delete s[k];
      });
      var moto = s.moto.filter(function (id, i) { return swaps && swaps.hasOwnProperty(id) && s.moto.indexOf(id) === i; });
      if (moto.length !== s.moto.length && dropped.indexOf('moto') < 0) dropped.push('moto');
      s.moto = moto;
      return { settings: s, st: st, dropped: dropped };
```

*defaultSettings: bez zamian.* Zamień:

```js
    var s = { from: 'SGN', to: 'HAN', year: yy, month: mm, days: 15, interests: [], level: 2, add: [], remove: [] };
```

na:

```js
    var s = { from: 'SGN', to: 'HAN', year: yy, month: mm, days: 15, interests: [], level: 2, add: [], remove: [], moto: [] };
```

*variantOf: wersja self.* Zamień:

```js
/* One day at an adventure level: level 1 takes the easy version, level 3 the hard one unless month (1–12) is one of its
   months off, or unless it is late (its night ends away from the stay) and notLate is true; otherwise the usual day. A
   version keeps the day's early start unless it sets its own, and the day's rain plan; its cost and pack, see content.js.
   Returns { pace, t, d, early, rain, variant, cost, pack }, variant 'easy', 'hard' or null. */
function variantOf(day, level, month, notLate) {
  var hard = level === 3 && day.hard && (day.hard.off || []).indexOf(month) < 0 && !(notLate && day.hard.late);
  var v = level === 1 && day.easy ? 'easy' : hard ? 'hard' : null;
```

na:

```js
/* One day at an adventure level: with self (the place's swap set to „Samodzielnie”) the self version, at every level;
   else level 1 takes the easy version, level 3 the hard one unless month (1–12) is one of its months off, or unless it is
   late (its night ends away from the stay) and notLate is true; otherwise the usual day. A version keeps the day's early
   start unless it sets its own, and the day's rain plan; its cost and pack, see content.js.
   Returns { pace, t, d, early, rain, variant, cost, pack }, variant 'self', 'easy', 'hard' or null. */
function variantOf(day, level, month, notLate, self) {
  var hard = level === 3 && day.hard && (day.hard.off || []).indexOf(month) < 0 && !(notLate && day.hard.late);
  var v = self && day.self ? 'self' : level === 1 && day.easy ? 'easy' : hard ? 'hard' : null;
```

*stopDays: self.* Zamień:

```js
   morning goes on the walk out, so the journey would start around noon) gives way to the usual day. */
function stopDays(c, stop, done, level, months, next) {
```

na:

```js
   morning goes on the walk out, so the journey would start around noon) gives way to the usual day.
   self: the place's swap is set to „Samodzielnie”, so the days with a self version take it (selfSwaps). */
function stopDays(c, stop, done, level, months, next, self) {
```

*stopDays: przekazuje self.* Zamień:

```js
    out.push(stop.n === 1 && d.solo ? plainDay(d.solo) : variantOf(d, level, months[stop.start - 1 + out.length] + 1, notLate && out.length === stop.n - 1));
```

na:

```js
    out.push(stop.n === 1 && d.solo ? plainDay(d.solo) : variantOf(d, level, months[stop.start - 1 + out.length] + 1, notLate && out.length === stop.n - 1, self));
```

*selfSwaps, withSwap.* Przed linią zaczynającą się od `/* Dodaj and Usuń on a copy of the settings: adding takes the place off the removed list, removing off the …` wstaw (z pustą linią po wstawce):

```js
/* The swaps (SWAPS in content.js) set to „Samodzielnie” in the settings, as the other functions take them: places, the
   places whose days take their self versions (stopDays); roads, by the two places in alphabetical order, the road's self
   text and the item of its cost (segKey, tripBudget). moto: the settings' list of swap ids. */
function selfSwaps(moto, swaps) {
  var out = { places: {}, roads: {} };
  (moto || []).forEach(function (id) {
    var w = swaps[id];
    if (w && w.place) out.places[w.place] = true;
    if (w && w.road) out.roads[w.road] = { text: w.text, cost: w.cost.self };
  });
  return out;
}
/* A copy of the settings with swap id set to „Samodzielnie” (self true) or back to the usual way with a driver. */
function withSwap(s, id, self) {
  var o = copySettings(s);
  o.moto = o.moto.filter(function (x) { return x !== id; });
  if (self) o.moto.push(id);
  return o;
}
```

*segKey: droga ujechana samodzielnie.* Zamień:

```js
   form for going there and one for leaving. g: a segment of planRoute's legs; airports: AIRPORTS. */
function segKey(g, airports, roadKeys) {
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
  if (airports[g.to]) return ['r.taxi_to', { x: airports[g.to].name }];
  var pair = [g.from, g.to].sort().join('-');
  if (roadKeys[pair]) return [roadKeys[pair], {}];
```

na:

```js
   form for going there and one for leaving. g: a segment of planRoute's legs; airports: AIRPORTS; selfRoads: the roads
   ridden yourself (selfSwaps(…).roads), whose own text wins. */
function segKey(g, airports, roadKeys, selfRoads) {
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
  if (airports[g.to]) return ['r.taxi_to', { x: airports[g.to].name }];
  var pair = [g.from, g.to].sort().join('-');
  if (selfRoads && selfRoads[pair]) return [selfRoads[pair].text, {}];
  if (roadKeys[pair]) return [roadKeys[pair], {}];
```


- [ ] **Krok 6: `site2/src/app.js`.**

*apply: kopia ustawień.* Zamień:

```js
     last trip and say why under the settings. linkWarn: the settings come from a link that was partly wrong.
     Returns whether the trip changed. */
  function apply(s, linkWarn) {
    var st = normSettings(s, PLACES, HUBS), r = st.ok ? planRoute(st, DATA) : null;
```

na:

```js
     last trip and say why under the settings. linkWarn: the settings come from a link that was partly wrong. The settings
     are copied with their lists (copySettings), so a caller may leave out add, remove and moto.
     Returns whether the trip changed. */
  function apply(s, linkWarn) {
    s = copySettings(s);
    var st = normSettings(s, PLACES, HUBS), r = st.ok ? planRoute(st, DATA) : null;
```

*apply: dni samodzielne.* Zamień:

```js
    state.plans = r.stops.map(function (x, i) {
      var days = stopDays(C(x.id), x, done[x.id] || 0, st.level, st.months, legAfter(r, i));
```

na:

```js
    var self = selfSwaps(s.moto, SWAPS);
    state.plans = r.stops.map(function (x, i) {
      var days = stopDays(C(x.id), x, done[x.id] || 0, st.level, st.months, legAfter(r, i), !!self.places[x.id]);
```

*fromLink: SWAPS.* Zamień:

```js
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), DEFAULTS, PLACES, HUBS, bad);
```

na:

```js
    var bad = [], got = settingsFromLink(parseLink(location.hash, bad), DEFAULTS, PLACES, HUBS, bad, SWAPS);
```

*readForm: zamiany.* Zamień:

```js
    var s = { from: F.from.value, to: F.to.value, interests: [], level: +F.level.value,
      add: state.settings.add.slice(), remove: state.settings.remove.slice() };
```

na:

```js
    var s = { from: F.from.value, to: F.to.value, interests: [], level: +F.level.value,
      add: state.settings.add.slice(), remove: state.settings.remove.slice(), moto: state.settings.moto.slice() };
```

*karta przejazdu: tekst samodzielnej drogi.* Zamień:

```js
        var text = g.mode === 'fly' ? T('fly') + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name : T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS));
```

na:

```js
        var text = g.mode === 'fly' ? T('fly') + ' ' + AIRPORTS[g.from].name + ' → ' + AIRPORTS[g.to].name : T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS, selfSwaps(state.settings.moto, SWAPS).roads));
```


- [ ] **Krok 7: `site2/src/ui.js`.**

*tekst: Hải Vân samodzielnie.* Po:

```js
  'r.haivan': 'Samochód z kierowcą przez przełęcz Hải Vân, z postojem nad laguną Lăng Cô; gdy przełęcz tonie w chmurach, kierowca jedzie tunelem',
```

dopisz w następnych liniach:

```js
  'r.haivan_self': 'Motocykl wypożyczony w jedną stronę, przez przełęcz Hải Vân z postojem nad laguną Lăng Cô; bagaż jedzie autem, a do tunelu motocykle nie wjeżdżają, więc we mgle zwolnij albo przeczekaj',
```

*tekst: znaczek dnia.* Zamień:

```js
  'badge.easy': 'Wersja spokojna', 'badge.hard': 'Trudny dzień',
```

na:

```js
  'badge.easy': 'Wersja spokojna', 'badge.hard': 'Trudny dzień', 'badge.self': 'Motocykl samodzielnie',
```


- [ ] **Krok 8: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 9: Build, sondy i link z motocyklem**

Sonda z pliku tymczasowego sprawdza, że link z `motocykl=caobang` prowadzi pętlę Cao Bằng na motocyklu:

```bash
python3 site2/build.py
cat > "$TMPDIR/moto.js" <<'EOF'
// the link with motocykl=caobang rides the Cao Bằng loop yourself
setTimeout(function () {
  var card = document.querySelector('#stops .stop[data-pin="caobang"]');
  var titles = card ? Array.prototype.map.call(card.querySelectorAll('.day h4'), function (h) { return h.textContent; }).join(' | ') : '';
  check('the link keeps motocykl=caobang', /motocykl=caobang/.test(location.hash), location.hash);
  check('the days of the loop ride the motorbike', /motocyklem/.test(titles), titles);
  check('the first evening: pick up the motorbike', !!card && /Wypożyczony motocykl odbierz/.test(card.textContent));
  done();
}, 500);
EOF
bash tests/probe.sh "$TMPDIR/moto.js" 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&motocykl=caobang'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
```

Oczekiwane: każda sonda kończy się linią `done, all checks ok` i kodem 0 (`echo $?`).

- [ ] **Krok 10: Commit**

```bash
git add tests/page.test.js tests/content.test.js site2/src/content.js site2/src/content/caobang.js site2/src/page.js site2/src/app.js site2/src/ui.js
git commit -F - <<'EOF'
Zamiana motocykla: SWAPS, klucz motocykl= w linku, wersje samodzielne dni w Cao Bằng, tekst drogi przez przełęcz Hải Vân; apply kopiuje ustawienia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Budżet: czysta funkcja

Budżet na osobę z `costs.js`, trasy i planów dni (zasady w komentarzu nad funkcją). Testy na danych zastępczych liczą kwoty ręcznie, test na prawdziwej trasie marcowej sprawdza pozycje, a test kombinacji sprawdza budżet każdej trasy z zamianami i bez.

**Pliki:**
- Zmień: `site2/src/page.js`
- Testy: `tests/page.test.js`, `tests/combos.test.js`

**Interfejsy:**
- Korzysta: `COSTS`, `SHORT_FLIGHT_H`, `EUR_PLN` (zadanie 3), `cost` w dniach (zadanie 4), `SWAPS`, `selfSwaps` (zadanie 5).
- Daje:
  - `tripBudget(route, plans, moto, data)` → `{ two, one, parts: { nights, day, travel, trips }, items: [{ key, two, one }] }`, kwoty w EUR jako `[od, do]` na osobę: `two` dla każdej z dwóch osób, `one` dla osoby samej; `data = { costs, places, swaps, shortFlightH }`; `items` od najdroższej, loty krajowe jako `flights`;
  - `itemCost(it)`, `entryCost(e, items)` → `{ two, one }`: koszt pozycji i wyboru na osobę;
  - `zlRange(eur, rate, step)` → `[od, do]` w złotych, zaokrąglone do `step` (nigdy mniej niż `step`); `money(n)` → tysiące oddzielone twardą spacją.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*testy budżetu.* W `tests/page.test.js` przed linią zaczynającą się od `/* ---------- the map ---------- */` wstaw (z pustą linią po wstawce):

```js
/* ---------- the budget ---------- */
// made-up prices, places and a trip: two stays and three ways, a choice, an item with its own room, a road of a swap
var COSTS_T = { night: { a: [10, 20], b: [30, 50] }, day: [10, 20], daySolo: [1, 2], shared: [2, 3], car: [10, 16], flight: { short: [30, 60], long: [40, 80] },
  items: { 'a.boat': { pp: [0, 0], group: [10, 20] }, 'b.night': { pp: [8, 8], group: [20, 30], night: true }, 'x.car': { pp: [0, 0], group: [20, 40] },
    'x.rider': { pp: [12, 18], group: [0, 0] }, 'r.car': { pp: [0, 0], group: [30, 50] }, 'r.moto': { pp: [15, 20], group: [0, 0] } } };
var BUD = { costs: COSTS_T, places: { a: {}, b: {} }, swaps: { w: { road: 'a-b', text: 'r.t', cost: { driver: 'r.car', self: 'r.moto' } } }, shortFlightH: 1.5 };
var RT = { days: 5, stops: [{ id: 'a', n: 2, leg: { segs: [{ mode: 'road', from: 'XA', to: 'a', h: 1 }] } }, { id: 'b', n: 2, leg: { segs: [{ mode: 'road', from: 'a', to: 'b', h: 3 }] } }],
  home: { segs: [{ mode: 'road', from: 'b', to: 'XB', h: 0.5 }, { mode: 'fly', from: 'XB', to: 'XC', h: 2 }] } };
var PL = [[{ cost: ['a.boat'] }, { cost: [] }], [{ cost: [['x.car', 'x.rider']] }, { cost: ['b.night'] }]];
var bT = tripBudget(RT, PL, [], BUD);
eq([bT.parts.nights, bT.parts.day], [{ two: [25, 45], one: [50, 90] }, { two: [50, 100], one: [55, 110] }],
  'nights: a room shared by two or paid in full; the night with its own room is not paid twice; each day, a person alone pays more');
eq(bT.parts.trips, { two: [33, 53], one: [50, 98] }, 'the paid parts: pp + group / 2 for two, pp + group for one; a choice from its cheapest to its dearest');
eq(bT.parts.travel, { two: [58, 117], one: [73, 154] }, 'travel: a seat in a van to a car of one\'s own by the hour, the road of the swap by its item, a long flight');
eq([bT.two, bT.one], [[166, 315], [228, 452]], 'the whole budget: the sum of the parts');
eq(bT.items.map(function (x) { return x.key; }), ['flights', 'r.car', 'b.night', 'x.car', 'a.boat'], 'the paid things, dearest first; a choice under its first name');
var bS = tripBudget(RT, PL, ['w'], BUD);
eq([bS.two, bS.one, bS.items.map(function (x) { return x.key; })], [[166, 310], [213, 422], ['flights', 'b.night', 'r.moto', 'x.car', 'a.boat']],
  'the swap ridden yourself: its road costs the motorbike; a tie keeps the order of the trip');
eq([zlRange([166, 315], 4.3775, 100), zlRange([0.5, 2], 4.3775, 10), money(500), money(12400), money(1234567)],
  [[700, 1400], [10, 10], '500', '12\u00a0400', '1\u00a0234\u00a0567'], 'złoty: rounded to the step, never 0; thousands apart (NB is set further down)');
// the real data: the March trip (Hồ Chí Minh City, Đà Lạt, Hội An, Huế, Hà Nội) and the Cao Bằng loop ridden yourself
var BUDR = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
function plansOf(t, self) {
  var done = {};
  return t.r.stops.map(function (x, i) {
    var d = stopDays(CONTENT[x.id], x, done[x.id] || 0, t.st.level, t.st.months, legAfter(t.r, i), !!self);
    done[x.id] = (done[x.id] || 0) + x.n;
    return d;
  });
}
var bA = tripBudget(tA.r, plansOf(tA), [], BUDR);
eq(bA.items.map(function (x) { return x.key; }), ['flights', 'saigon.cangio', 'haivan.car', 'dalat.bidoup', 'dalat.langbiang', 'hanoi.duonglam', 'hue.lagoon', 'hue.tombs', 'hue.citadel'],
  'the March trip: the two flights first, then the day in Cần Giờ and the car over the Hải Vân pass; three nights in Đà Lạt and Hà Nội leave out their fourth days');
ok(bA.two[0] > 0 && bA.two[0] <= bA.two[1] && bA.one[0] >= bA.two[0] && bA.one[1] >= bA.two[1], 'the March trip: from up to to, alone no cheaper');
var tCB = tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 10, interests: ['gory'], level: 3, add: ['caobang'] });
var bDriver = tripBudget(tCB.r, plansOf(tCB, false), [], BUDR), bSelf = tripBudget(tCB.r, plansOf(tCB, true), ['caobang'], BUDR);
eq([bDriver.items.some(function (x) { return x.key === 'caobang.car'; }), bSelf.items.some(function (x) { return x.key === 'caobang.moto'; }), bSelf.two[1] < bDriver.two[1]],
  [true, true, true], 'Cao Bằng: a car with a driver or an easy rider, or the motorbike ridden yourself, which costs less');
print('budget ok');
```

*kombinacje: plany dni do budżetu.* W `tests/combos.test.js` zamień:

```js
    var done = {};
    r.stops.forEach(function (x, i) {
      var next = legAfter(r, i), days = stopDays(CONTENT[x.id], x, done[x.id] || 0, s.level, st.months, next);
```

na:

```js
    var done = {}, plans = [];
    r.stops.forEach(function (x, i) {
      var next = legAfter(r, i), days = stopDays(CONTENT[x.id], x, done[x.id] || 0, s.level, st.months, next);
      plans.push(days || []);
```

*kombinacje: budżet każdej trasy.* W `tests/combos.test.js` przed linią zaczynającą się od `need(nights === s.days - 1, nights + ' nights, want ' + (s.days - 1));` wstaw:

```js
    // the budget (tripBudget in page.js), with a driver and with every swap ridden yourself: numbers, from up to to, a person
    // alone pays no less, the parts add up to the whole, the paid things dearest first
    [[], Object.keys(SWAPS)].forEach(function (moto) {
      var self = selfSwaps(moto, SWAPS), donS = {}, pl = moto.length ? r.stops.map(function (x, i) {
        var d = stopDays(CONTENT[x.id], x, donS[x.id] || 0, s.level, st.months, legAfter(r, i), !!self.places[x.id]);
        donS[x.id] = (donS[x.id] || 0) + x.n;
        return d || [];
      }) : plans;
      var b = tripBudget(r, pl, moto, BUDGET_DATA), sum = [0, 0];
      Object.keys(b.parts).forEach(function (p) { sum[0] += b.parts[p].two[0]; sum[1] += b.parts[p].two[1]; });
      need(isFinite(b.two[0]) && isFinite(b.one[1]) && b.two[0] > 0 && b.two[0] <= b.two[1] && b.one[0] >= b.two[0] && b.one[1] >= b.two[1],
        'budget ' + (moto.length ? 'ridden yourself' : 'with a driver') + ': ' + JSON.stringify([b.two, b.one]));
      need(Math.abs(sum[0] - b.two[0]) < 1e-6 && Math.abs(sum[1] - b.two[1]) < 1e-6, 'budget: the parts add up to the whole');
      need(b.items.every(function (x, i) { return !i || b.items[i - 1].two[1] >= x.two[1]; }), 'budget: the paid things dearest first');
    });
```

*kombinacje: dane budżetu.* W `tests/combos.test.js` po:

```js
  var MAP_WORDS = { panels: MAP_PANELS, places: PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
```

dopisz w następnych liniach:

```js
  var BUDGET_DATA = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: tripBudget` (`tests/page.test.js`).

- [ ] **Krok 3: `site2/src/page.js`.**

*budżet: itemCost, entryCost, tripBudget, zlRange, money.* Przed linią zaczynającą się od `/* ---------- travel texts ---------- */` wstaw (z pustą linią po wstawce):

```js
/* ---------- the budget ---------- */
/* A rough budget for a person, in euros, without the flights to Vietnam: { two, one, parts, items }. two is [from, to] for
   each of two people who share a room, a car, a boat and a guide; one for a person alone, who pays all of them. parts: the
   same split into nights, day (food, Grab, small tickets), travel (roads and domestic flights) and trips (the paid parts of
   the plans); items: the paid things of the trip, each key once with its cost over the whole trip, the domestic flights as
   'flights', dearest first (by to for two; a tie keeps the order of the trip). The rules:
   - a stay's nights cost the room of its place (a night on the way: its node's); an item with night: true (the cruise, the
     night at the rangers' station) has its own room, so its stay counts a night less;
   - each day of the trip costs day, and a person alone pays daySolo more;
   - a road segment costs from a seat in a van (shared) to a car with its driver (car) for its hours; the road of a swap
     (SWAPS: the Hải Vân pass) costs the item of the chosen way instead;
   - a flight costs flight.short up to shortFlightH hours in the air, else flight.long;
   - a plan's cost entry: an item costs pp + group / 2 for two, pp + group for one; a choice (a list) from its cheapest to its
     dearest, under the name of its first item.
   route: planRoute's trip; plans: stopDays of each stay; moto: the swaps set to „Samodzielnie”; data: { costs: COSTS,
   places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H }. */
// what an item of COSTS costs a person: pp + group / 2 for each of two, pp + group for one alone
function itemCost(it) { return { two: [it.pp[0] + it.group[0] / 2, it.pp[1] + it.group[1] / 2], one: [it.pp[0] + it.group[0], it.pp[1] + it.group[1]] }; }
// a plan's cost entry (content.js): an item, or a choice (a list) from its cheapest to its dearest item; items: COSTS.items
function entryCost(e, items) {
  var cs = [].concat(e).map(function (k) { return itemCost(items[k]); });
  function lo(w) { return Math.min.apply(null, cs.map(function (c) { return c[w][0]; })); }
  function hi(w) { return Math.max.apply(null, cs.map(function (c) { return c[w][1]; })); }
  return { two: [lo('two'), hi('two')], one: [lo('one'), hi('one')] };
}
function tripBudget(route, plans, moto, data) {
  var C = data.costs, self = selfSwaps(moto, data.swaps), parts = {}, items = {}, order = [], total = { two: [0, 0], one: [0, 0] };
  ['nights', 'day', 'travel', 'trips'].forEach(function (k) { parts[k] = { two: [0, 0], one: [0, 0] }; });
  function add(part, c, key) {
    [0, 1].forEach(function (i) {
      parts[part].two[i] += c.two[i]; parts[part].one[i] += c.one[i];
      total.two[i] += c.two[i]; total.one[i] += c.one[i];
    });
    if (!key) return;
    if (!items[key]) { items[key] = { key: key, two: [0, 0], one: [0, 0] }; order.push(key); }
    [0, 1].forEach(function (i) { items[key].two[i] += c.two[i]; items[key].one[i] += c.one[i]; });
  }
  var roadOf = {};   // the roads of the swaps: their cost each way
  Object.keys(data.swaps).forEach(function (id) { if (data.swaps[id].road) roadOf[data.swaps[id].road] = data.swaps[id].cost; });
  function leg(L) {
    L.segs.forEach(function (g) {
      if (g.mode === 'fly') {
        var f = g.h <= data.shortFlightH ? C.flight.short : C.flight.long;
        add('travel', { two: f.slice(), one: f.slice() }, 'flights');
        return;
      }
      var pair = [g.from, g.to].sort().join('-');
      if (roadOf[pair]) {
        var k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].driver;
        add('travel', itemCost(C.items[k]), k);
        return;
      }
      add('travel', { two: [C.shared[0] * g.h, C.car[1] * g.h / 2], one: [C.shared[0] * g.h, C.car[1] * g.h] });
    });
  }
  // in the order of the trip: each stay after the leg that leads to it, then the way home
  route.stops.forEach(function (s, i) {
    var nights = s.n, room = C.night[data.places[s.id].node || s.id];
    leg(s.leg);
    (plans[i] || []).forEach(function (d) {
      d.cost.forEach(function (e) {
        var list = [].concat(e);
        add('trips', entryCost(e, C.items), list[0]);
        if (list.length === 1 && C.items[list[0]].night) nights--;
      });
    });
    add('nights', { two: [room[0] * nights / 2, room[1] * nights / 2], one: [room[0] * nights, room[1] * nights] });
  });
  leg(route.home);
  add('day', { two: [C.day[0] * route.days, C.day[1] * route.days],
    one: [(C.day[0] + C.daySolo[0]) * route.days, (C.day[1] + C.daySolo[1]) * route.days] });
  var list = order.map(function (k, i) { return { k: items[k], i: i }; })
    .sort(function (a, b) { return b.k.two[1] - a.k.two[1] || a.i - b.i; }).map(function (x) { return x.k; });
  return { two: total.two, one: total.one, parts: parts, items: list };
}

/* An amount in euros, [from, to], in złoty: each end at rate and rounded to step złoty (100 for the budget, 10 for one
   item); a from that would round to 0 becomes step. */
function zlRange(eur, rate, step) {
  return eur.map(function (v) { return Math.max(step, Math.round(v * rate / step) * step); });
}
/* A number with its thousands apart (no-break spaces), as Polish writes money: 12400 → '12 400'. */
function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); }
```


- [ ] **Krok 4: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 5: Pełny test kombinacji**

```bash
bash tests/run.sh --full
```

Oczekiwane: `combos: 134784 (all)` i `ALL PASS` w ok. 45 s; test kombinacji liczy budżet każdej trasy z zamianami i bez.

- [ ] **Krok 6: Commit**

```bash
git add tests/page.test.js tests/combos.test.js site2/src/page.js
git commit -F - <<'EOF'
Budżet: tripBudget (dla dwóch osób i w pojedynkę, cztery części, pozycje), złotówki; test kombinacji liczy budżet każdej trasy

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Przejazdy z lotnisk i promy

Dalekie drogi z lotnisk (ponad 2 h albo z promem) dostają własne teksty (`AIR_KEYS`, z `research/lotniska-2026-10.md`), czytelne w obie strony. Karty przejazdu na Cát Bà i do Cát Tiên mówią, do której wylądować przed ostatnią przeprawą, a w drugą stronę, kiedy najwcześniej da się być na lotnisku (`FERRY`).

**Pliki:**
- Zmień: `site2/src/content.js`, `site2/src/page.js`, `site2/src/ui.js`, `site2/src/app.js`, `research/lotniska-2026-10.md`
- Testy: `tests/page.test.js`, `tests/content.test.js`

**Interfejsy:**
- Daje:
  - `AIR_KEYS = { '<lotnisko>-<miejsce>': { text: 'r.air_…', book } }`; `book: false` (Thọ Xuân–Ninh Bình): tekst jest, ale droga nie trafia do rezerwacji (zadanie 8);
  - `FERRY = { <miejsce>: { last, land: { <lotnisko>: godzina }, first, at: { <lotnisko>: godzina } } }`;
  - `segKey(g, airports, roadKeys, selfRoads, airKeys)`: tekst z `AIR_KEYS` ma pierwszeństwo przed taksówką;
  - `ferryNotes(leg, ferry, airports)` → `[{ key: 'n.ferry_in', place, last, land } | { key: 'n.ferry_out', place, first, at }]`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*testy: teksty dróg z lotnisk, promy.* W `tests/page.test.js` przed linią zaczynającą się od `var selfR = selfSwaps` wstaw:

```js
function air(a, b) { return segKey({ mode: 'road', from: a, to: b, h: 2 }, AIRPORTS, ROAD_KEYS, null, AIR_KEYS); }
eq([air('HAN', 'catba'), air('catba', 'HPH'), air('SGN', 'cattien'), air('mekong', 'SGN'), air('HAN', 'hanoi'), air('dalat', 'DLI')],
  [['r.air_catba', {}], ['r.air_catba', {}], ['r.air_cattien', {}], ['r.air_mekong', {}], ['r.taxi_from', { x: 'Hà Nội' }], ['r.taxi_to', { x: 'Đà Lạt' }]],
  'a long road of an airport has its own text both ways (AIR_KEYS); a short one keeps the taxi');
var arrive = { segs: [{ mode: 'road', from: 'HAN', to: 'catba', h: 4 }] }, leave = { segs: [{ mode: 'road', from: 'cattien', to: 'SGN', h: 3.75 }, { mode: 'fly', from: 'SGN', to: 'HAN', h: 2.2 }] };
eq([ferryNotes(arrive, FERRY, AIRPORTS), ferryNotes(leave, FERRY, AIRPORTS), ferryNotes({ segs: [{ mode: 'road', from: 'ninhbinh', to: 'catba', h: 4.5 }] }, FERRY, AIRPORTS)],
  [[{ key: 'n.ferry_in', place: 'catba', last: '18:00', land: '13:30' }], [{ key: 'n.ferry_out', place: 'cattien', first: '6:00', at: '10:00' }], []],
  'the ferry: from an airport the latest landing, toward an airport the earliest time there; a road between places says nothing');
```

*test treści: AIR_KEYS i FERRY.* W `tests/content.test.js` przed linią zaczynającą się od `// the swaps: a place with self versions of its days` wstaw:

```js
  // the long roads of an airport: an airport's code and a place joined by a road of ROADS, each text a UI key; the ferries
  Object.keys(AIR_KEYS).forEach(function (k) {
    var p = k.split('-');
    need(AIRPORTS[p[0]] && PLACES[p[1]] && ROADS.some(function (r) { return (r[0] === p[0] && r[1] === p[1]) || (r[0] === p[1] && r[1] === p[0]); }) &&
      UI.pl[AIR_KEYS[k].text] && typeof AIR_KEYS[k].book === 'boolean', 'AIR_KEYS ' + k + ': an airport, a place, a road between them, a text and book');
  });
  Object.keys(FERRY).forEach(function (id) {
    var f = FERRY[id], t = /^\d{1,2}:\d{2}$/;
    need(PLACES[id] && t.test(f.last) && t.test(f.first), 'FERRY.' + id + ': a place and the times of its crossings');
    Object.keys(f.land).concat(Object.keys(f.at)).forEach(function (code) {
      need(AIRPORTS[code] && ROADS.some(function (r) { return (r[0] === code && r[1] === id) || (r[0] === id && r[1] === code); }), 'FERRY.' + id + ': ' + code + ' is an airport with a road to it');
    });
    Object.keys(f.land).forEach(function (code) { need(t.test(f.land[code]) && t.test(f.at[code] || ''), 'FERRY.' + id + ': the landing and the time at ' + code); });
  });
```

*test tekstów: teksty dróg z lotnisk.* W `tests/content.test.js` po:

```js
  Object.keys(SWAPS).forEach(function (k) { if (SWAPS[k].text) wants(SWAPS[k].text, 'SWAPS'); });
```

dopisz w następnych liniach:

```js
  Object.keys(AIR_KEYS).forEach(function (k) { wants(AIR_KEYS[k].text, 'AIR_KEYS'); });
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: AIR_KEYS` (`tests/page.test.js`).

- [ ] **Krok 3: `site2/src/content.js`.**

*AIR_KEYS i FERRY.* Przed linią zaczynającą się od `/* Either-or choices inside a trip (plan 2B)` wstaw (z pustą linią po wstawce):

```js
/* The roads between an airport and a place that need more than a taxi (plan 2B, research/lotniska-2026-10.md): two hours
   or more, or a ferry. By the airport's code and the place: text, a UI key that reads right both ways (segKey in page.js;
   the other roads of an airport keep the taxi); book: the car is booked ahead, so the road goes on the list of what to
   book (not from Thọ Xuân to Ninh Bình, where taxis wait at the terminal). */
var AIR_KEYS = {
  'HAN-ninhbinh': { text: 'r.air_ninhbinh', book: true }, 'DAD-hue': { text: 'r.air_hue', book: true },
  'HPH-catba': { text: 'r.air_catba', book: true }, 'HAN-catba': { text: 'r.air_catba', book: true },
  'SGN-mekong': { text: 'r.air_mekong', book: true }, 'SGN-cattien': { text: 'r.air_cattien', book: true },
  'HAN-caobang': { text: 'r.air_car', book: true }, 'HAN-babe': { text: 'r.air_car', book: true }, 'HAN-puluong': { text: 'r.air_car', book: true },
  'THD-ninhbinh': { text: 'r.air_thd', book: false }, 'THD-puluong': { text: 'r.air_puluong', book: true }
};
/* The places behind a ferry that runs by day (research/lotniska-2026-10.md): last, about when the last crossing toward the
   place goes in the evening; land, by airport, the latest landing that still makes it by car; first, the first crossing
   back in the morning; at, by airport, the earliest time there after it. The journey's card says so (ferryNotes in page.js). */
var FERRY = {
  catba: { last: '18:00', land: { HAN: '13:30', HPH: '16:00' }, first: '5:00', at: { HAN: '9:00', HPH: '6:30' } },
  cattien: { last: '18:00', land: { SGN: '13:30' }, first: '6:00', at: { SGN: '10:00' } }
};
```


- [ ] **Krok 4: `site2/src/page.js`.**

*segKey: długie drogi z lotnisk.* Zamień:

```js
   ridden yourself (selfSwaps(…).roads), whose own text wins. */
function segKey(g, airports, roadKeys, selfRoads) {
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
```

na:

```js
   ridden yourself (selfSwaps(…).roads), whose own text wins; airKeys: AIR_KEYS, the long roads of an airport with a text
   of their own, which wins over the taxi. */
function segKey(g, airports, roadKeys, selfRoads, airKeys) {
  var code = airports[g.from] ? g.from : airports[g.to] ? g.to : null, air = code && airKeys && airKeys[code + '-' + (code === g.from ? g.to : g.from)];
  if (air) return [air.text, {}];
  if (airports[g.from]) return ['r.taxi_from', { x: airports[g.from].name }];
```

*ferryNotes.* Przed linią zaczynającą się od `var LONG_LEG_H = 7;` wstaw (z pustą linią po wstawce):

```js
/* The ferries of a journey (FERRY in content.js): a road from an airport to a place behind a ferry, with the last crossing
   and the latest landing that makes it; a road from such a place to an airport, with the first crossing and the earliest
   time at the airport. Returns [{ key: 'n.ferry_in', place, last, land } or { key: 'n.ferry_out', place, first, at }].
   leg: a leg of planRoute; ferry: FERRY; airports: AIRPORTS. */
function ferryNotes(leg, ferry, airports) {
  var out = [];
  leg.segs.forEach(function (g) {
    if (g.mode !== 'road') return;
    if (airports[g.from] && ferry[g.to] && ferry[g.to].land[g.from]) out.push({ key: 'n.ferry_in', place: g.to, last: ferry[g.to].last, land: ferry[g.to].land[g.from] });
    if (airports[g.to] && ferry[g.from] && ferry[g.from].at[g.to]) out.push({ key: 'n.ferry_out', place: g.from, first: ferry[g.from].first, at: ferry[g.from].at[g.to] });
  });
  return out;
}
```


- [ ] **Krok 5: `site2/src/ui.js`.**

*teksty dróg z lotnisk.* Przed linią zaczynającą się od `'r.haivan_self'` wstaw:

```js
  'r.air_ninhbinh': 'Samochód z kierowcą albo minibus typu limousine, oba do zamówienia wcześniej',
  'r.air_hue': 'Samochód z kierowcą zamówiony wcześniej, tunelem pod przełęczą Hải Vân',
  'r.air_catba': 'Samochód z kierowcą zamówiony wcześniej i krótki prom Đồng Bài – Cái Viềng',
  'r.air_mekong': 'Samochód z kierowcą zamówiony wcześniej albo, dłużej, autobus przez dworzec Miền Tây i Cần Thơ',
  'r.air_cattien': 'Samochód z kierowcą zamówiony wcześniej, a przy parku prom przez rzekę Đồng Nai, który pływa tylko za dnia',
  'r.air_car': 'Samochód z kierowcą zamówiony wcześniej',
  'r.air_thd': 'Taksówka albo samochód z kierowcą zamówiony wcześniej',
  'r.air_puluong': 'Samochód z kierowcą zamówiony wcześniej, najlepiej przez gospodarzy w Pù Luông',
```

*teksty o promie.* Przed linią zaczynającą się od `'n.solo_long'` wstaw:

```js
  'n.ferry_in': 'Ostatnia przeprawa do {x} jest ok. {last}: wybierz lot, który ląduje najpóźniej ok. {land}.',
  'n.ferry_out': 'Pierwsza przeprawa z {x} jest ok. {first}, więc na lotnisku będziesz najwcześniej ok. {at}.',
```


- [ ] **Krok 6: `site2/src/app.js`.**

*karta przejazdu: uwagi o promie.* Zamień:

```js
    var notes = legNotes(L, prev, !!(prev && C(prev.id).days.some(function (d) { return d.solo; })));
```

na:

```js
    var notes = legNotes(L, prev, !!(prev && C(prev.id).days.some(function (d) { return d.solo; }))).map(function (k) { return T(k); })
      .concat(ferryNotes(L, FERRY, AIRPORTS).map(function (n) { return T(n.key, { x: C(n.place).short, last: n.last, land: n.land, first: n.first, at: n.at }); }));
```

*karta przejazdu: uwagi już jako teksty.* Zamień:

```js
        esc(notes.map(function (k) { return T(k); }).join(' ')) +
```

na:

```js
        esc(notes.join(' ')) +
```

*karta przejazdu: AIR_KEYS.* Zamień:

```js
T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS, selfSwaps(state.settings.moto, SWAPS).roads));
```

na:

```js
T.apply(null, segKey(g, AIRPORTS, ROAD_KEYS, selfSwaps(state.settings.moto, SWAPS).roads, AIR_KEYS));
```


- [ ] **Krok 7: `research/lotniska-2026-10.md`.**

*research: godziny promów w danych strony.* Zamień:

```markdown
## Zestawienie
```

na:

```markdown
## Promy w danych strony (uzupełnienie 12.10.2026)

Godziny do `FERRY` w `site2/src/content.js`. Karta przejazdu mówi z nich, do której wylądować i kiedy najwcześniej da się być na lotnisku. To rachuba z danych tego pliku, bez nowych źródeł:

| miejsce | lotnisko | ostatnia przeprawa | najpóźniejsze lądowanie | pierwsza przeprawa | najwcześniej na lotnisku | rachuba |
|---|---|---|---|---|---|---|
| catba | HAN | 18:00 | 13:30 | 5:00 | 9:00 | Lądowanie z sekcji „HAN – catba”. W drugą stronę: prom z Cái Viềng ok. 5:00 (CB-MIA, CB-VW), przeprawa 15–35 min, czyli Đồng Bài ok. 5:20–5:35, potem 2 h 5 min–3 h 20 min do Nội Bài (CB-GAHAN): ok. 7:25–8:55, zaokrąglone do 9:00. |
| catba | HPH | 18:00 | 16:00 | 5:00 | 6:30 | Lądowanie z sekcji „HPH – catba”. W drugą stronę: Đồng Bài ok. 5:20–5:35, potem 20–40 min do Cát Bi (CB-VT, CB-NVHP): ok. 5:40–6:15, zaokrąglone do 6:30. |
| cattien | SGN | 18:00 | 13:30 | 6:00 | 10:00 | Z sekcji „SGN – cattien”: ostatnia przeprawa o 18:00–19:30 zależnie od źródła, więc liczę od 18:00; pierwsza o 6:00–6:30 i 3–3,5 h jazdy, czyli lotnisko najwcześniej ok. 10:00. |

Strona podaje ostatnią przeprawę jako „ok. 18:00”, bo zimą przystań Đồng Bài kończy pracę o 18:00 (CB-MIA), a łódź w Cát Tiên według jednego źródła pływa tylko do ok. 18:00 (CT-VT).

## Zestawienie
```


- [ ] **Krok 8: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 9: Build i promy na stronie**

Trasa z Hà Nội do Hồ Chí Minh City na 10 dni w marcu 2027 zaczyna się na Cát Bà i kończy w Cát Tiên:

```bash
python3 site2/build.py
cat > "$TMPDIR/ferry.js" <<'EOF'
// the cards of the roads from Nội Bài to Cát Bà and from Cát Tiên to Tân Sơn Nhất say when the ferry goes
setTimeout(function () {
  var t = document.getElementById('stops').textContent.replace(/\s+/g, ' ');
  check('to Cát Bà: the last crossing and the latest landing', /Ostatnia przeprawa do Cát Bà jest ok\. 18:00: wybierz lot, który ląduje najpóźniej ok\. 13:30\./.test(t));
  check('from Cát Tiên: the first crossing and the earliest time at the airport', /Pierwsza przeprawa z Cát Tiên jest ok\. 6:00, więc na lotnisku będziesz najwcześniej ok\. 10:00\./.test(t));
  done();
}, 500);
EOF
bash tests/probe.sh "$TMPDIR/ferry.js" 390 'od=HAN&do=SGN&miesiac=2027-03&dni=10&co=przyroda&poziom=2'
```

Oczekiwane: każda sonda kończy się linią `done, all checks ok` i kodem 0 (`echo $?`). Przed tym zadaniem obie kontrole dawały `FAIL`.

- [ ] **Krok 10: Commit**

```bash
git add tests/page.test.js tests/content.test.js site2/src/content.js site2/src/page.js site2/src/ui.js site2/src/app.js research/lotniska-2026-10.md
git commit -F - <<'EOF'
Przejazdy z lotnisk: własne teksty dalekich dróg (AIR_KEYS) i uwagi o promie na Cát Bà i do Cát Tiên (FERRY, ferryNotes)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 8: Przed wyjazdem: rezerwacje, pakowanie i wjazd (czyste funkcje)

Trzy listy sekcji „Przed wyjazdem” jako czyste funkcje: co zarezerwować wcześniej (od najpilniejszej, z kwotą), co spakować (z klimatu, dni i wydarzeń) i co sprawdzić przy wjeździe.

**Pliki:**
- Zmień: `site2/src/page.js`
- Testy: `tests/page.test.js`

**Interfejsy:**
- Korzysta: `BOOK`, `ENTRY`, `HOMESTAYS` (zadanie 3), `cost` i `pack` (zadanie 4), `SWAPS`, `selfSwaps` (zadanie 5), `itemCost`, `entryCost` (zadanie 6), `AIR_KEYS` (zadanie 7), `CLIMATE`, `SEASONS`, `rainyMonth` (2A).
- Daje:
  - `ridesOn(route, moto, swaps)` → `true`, gdy zamiana ustawiona na „Samodzielnie” jest na trasie;
  - `bookList(route, plans, moto, data)` → `[{ key, ahead, links, two, one, list }]`, od najpilniejszej; `data = { costs, book, swaps, places, airports, airKeys, homestays, shortFlightH }`;
  - `PACK_COLD_C = 15`; `packList(route, plans, st, moto, data)` → `[{ code, places, t }]` dla kluczy `p.<code>`; `data = { climate, seasons, content, places, swaps }`;
  - `entryNotes(st, riding, entry)` → `[{ code, vars }]` dla kluczy `e.<code>`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*testy: rezerwacje, pakowanie, wjazd.* W `tests/page.test.js` po:

```js
print('budget ok');
```

dopisz w następnych liniach, po pustej linii:

```js
/* ---------- before the trip ---------- */
var BOOKD = { costs: COSTS, book: BOOK, swaps: SWAPS, places: PLACES, airports: AIRPORTS, airKeys: AIR_KEYS, homestays: HOMESTAYS, shortFlightH: SHORT_FLIGHT_H };
var PACKD = { climate: CLIMATE, seasons: SEASONS, content: CONTENT, places: PLACES, swaps: SWAPS };
function keysOf(list) { return list.map(function (e) { return e.key; }); }
var kA = bookList(tA.r, plansOf(tA), [], BOOKD);
eq([keysOf(kA), kA[0].list, kA[0].two], [['flights', 'dalat.bidoup', 'dalat.langbiang', 'haivan.car', 'saigon.cangio', 'hanoi.duonglam'],
  [['SGN', 'DLI'], ['DLI', 'DAD'], ['HUI', 'HAN']], [102, 186]], 'the March trip: three short flights first (3 weeks ahead), then the guides, the car over the pass and the day trips');
var tBk = tripOf(Object.assign({}, MARCH, { interests: ['przyroda'], level: 3 })), kB = bookList(tBk.r, plansOf(tBk), [], BOOKD);
eq([keysOf(kB), kB.filter(function (e) { return e.key === 'airport'; })[0].list, kB.filter(function (e) { return e.key === 'transfer'; })[0].two],
  [['cattien.bausau_night', 'flights', 'catba.cruise', 'transfer', 'dalat.bidoup', 'dalat.langbiang', 'airport', 'saigon.cangio', 'cattien.park'], [['HAN', 'ninhbinh'], ['HAN', 'catba']], null],
  'nature at level 3: the night at Bàu Sấu first (4 weeks), the cruise; the cars from Nội Bài; vans between places, priced with the travel');
var tCk = tripOf({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 14, interests: ['przyroda', 'gory'], level: 2 }), kC = bookList(tCk.r, plansOf(tCk, ['caobang']), ['caobang'], BOOKD);
eq([keysOf(kC), kC[1].list], [['catba.cruise', 'homestay', 'airport', 'transfer', 'caobang.moto'], ['babe', 'caobang']],
  'Cao Bằng ridden yourself: the motorbike to rent; the hosts of Ba Bể and Khuổi Ky');
var tDk = tripOf({ from: 'SGN', to: 'SGN', start: '2028-08-01', end: '2028-08-20', interests: ['morze'], level: 1 }), kD = bookList(tDk.r, plansOf(tDk), [], BOOKD);
eq(kD.filter(function (e) { return e.key === 'airport'; })[0].list, [['SGN', 'mekong'], ['HPH', 'catba']], 'a road from an airport used both ways is named once');
eq([packList(tA.r, plansOf(tA), tA.st, [], PACKD).map(function (p) { return p.code + (p.places.length ? ':' + p.places.join(',') : '') + (p.t !== null ? ':' + p.t : ''); }),
  packList(tBk.r, plansOf(tBk), tBk.st, [], PACKD).map(function (p) { return p.code; }), packList(tCk.r, plansOf(tCk, ['caobang']), tCk.st, ['caobang'], PACKD).map(function (p) { return p.code; })],
  [['warm:dalat:13', 'rain:hue,hanoi', 'boots', 'sun', 'mosquito', 'cash', 'apps'], ['warm', 'rain', 'boots', 'torch', 'swim', 'sun', 'mosquito', 'cash', 'apps'],
   ['rain', 'boots', 'swim', 'moto', 'sun', 'mosquito', 'cash', 'apps']],
  'packing: cold nights in Đà Lạt (13 °C), rain in Huế and Hà Nội in March, boots for the hikes; a torch for the night at Bàu Sấu, swimming at Cát Bà; the motorbike');
var tEk = tripOf({ from: 'DAD', to: 'HAN', year: 2027, month: 7, days: 12, interests: ['przyroda'], level: 3 });
eq(packList(tEk.r, plansOf(tEk), tEk.st, [], PACKD).filter(function (p) { return p.code === 'leeches'; })[0].places, ['cattien'], 'July in Cát Tiên: the leeches of the rainy season (an event)');
eq([entryNotes(tA.st, false, ENTRY).map(function (e) { return e.code; }), entryNotes(tDk.st, false, ENTRY).map(function (e) { return e.code; }), entryNotes(tA.st, true, ENTRY)[0].vars],
  [['visa', 'passport', 'insurance', 'doctor'], ['visa', 'visa_end', 'passport', 'insurance', 'doctor'], { days: 45, until: '14.08.2028' }],
  'entry: a trip that ends after the exemption is told to check the rules; the visa line names the days and the last day');
eq([ridesOn(tCk.r, ['caobang'], SWAPS), ridesOn(tCk.r, ['haivan'], SWAPS), ridesOn(tA.r, ['haivan'], SWAPS), entryNotes(tA.st, true, ENTRY).map(function (e) { return e.code; }).indexOf('insurance_moto') > -1],
  [true, false, true, true], 'riding yourself on the trip: Cao Bằng on the loop, the pass on the March trip (Hội An → Huế); the insurance line for it');
print('before ok');
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: ReferenceError: Can't find variable: bookList` (`tests/page.test.js`).

- [ ] **Krok 3: `site2/src/page.js`.**

*ridesOn, bookList, packList, entryNotes.* Przed linią zaczynającą się od `/* An amount in euros, [from, to], in złoty:` wstaw (z pustą linią po wstawce):

```js
/* ---------- before the trip ---------- */
/* Whether a swap set to „Samodzielnie” is on the trip: its place is a stay, or its road a road of a leg. */
function ridesOn(route, moto, swaps) {
  var self = selfSwaps(moto, swaps), legs = route.stops.map(function (s) { return s.leg; }).concat([route.home]);
  return route.stops.some(function (s) { return self.places[s.id]; }) ||
    legs.some(function (L) { return L.segs.some(function (g) { return g.mode === 'road' && !!self.roads[[g.from, g.to].sort().join('-')]; }); });
}

/* What to book ahead on this trip, the most urgent first (by ahead in BOOK; a tie keeps the order of the trip):
   [{ key, ahead, links, two, one, list }], key a key of BOOK with ahead over 0. two, one: what it costs a person, as
   tripBudget counts it (a long road from an airport: the car), or null when its cost is part of the stays or the travel
   (homestay, transfer); list: what it is about: the flights as [from, to] codes, the roads from airports as [code, place]
   (each road once, though its cost counts every ride), the homestays as places. The keys: flights (any domestic flight);
   airport (a road of AIR_KEYS with book); transfer (a road between two places, but the road of a swap); homestay (a stay
   in a place of homestays); and the book key of each item of the plans and of a swap's road (item.book, or the item's own
   key). route, plans, moto: as for tripBudget; data: { costs, book, swaps, places, airports, airKeys, homestays,
   shortFlightH }. */
function bookList(route, plans, moto, data) {
  var C = data.costs, self = selfSwaps(moto, data.swaps), out = {}, order = [], roadOf = {};
  Object.keys(data.swaps).forEach(function (id) { if (data.swaps[id].road) roadOf[data.swaps[id].road] = data.swaps[id].cost; });
  function entry(key) {
    var b = data.book[key];
    if (!b || !(b.ahead > 0)) return null;
    if (!out[key]) { out[key] = { key: key, ahead: b.ahead, links: b.links, two: null, one: null, list: [] }; order.push(key); }
    return out[key];
  }
  function cost(e, c) {
    if (!e) return;
    if (!e.two) { e.two = [0, 0]; e.one = [0, 0]; }
    [0, 1].forEach(function (i) { e.two[i] += c.two[i]; e.one[i] += c.one[i]; });
  }
  function leg(L) {
    L.segs.forEach(function (g) {
      var e, k;
      if (g.mode === 'fly') {
        var f = g.h <= data.shortFlightH ? C.flight.short : C.flight.long;
        e = entry('flights');
        cost(e, { two: f, one: f });
        if (e) e.list.push([g.from, g.to]);
        return;
      }
      var code = data.airports[g.from] ? g.from : data.airports[g.to] ? g.to : null, pair = [g.from, g.to].sort().join('-');
      if (code) {
        var place = code === g.from ? g.to : g.from, air = data.airKeys[code + '-' + place];
        if (!air || !air.book) return;
        e = entry('airport');
        cost(e, { two: [C.car[0] * g.h / 2, C.car[1] * g.h / 2], one: [C.car[0] * g.h, C.car[1] * g.h] });
        if (e && !e.list.some(function (x) { return x[0] === code && x[1] === place; })) e.list.push([code, place]);   // a road both ways: named once
      } else if (roadOf[pair]) {
        k = self.roads[pair] ? self.roads[pair].cost : roadOf[pair].driver;
        cost(entry(C.items[k].book || k), itemCost(C.items[k]));
      } else entry('transfer');
    });
  }
  route.stops.forEach(function (s, i) {
    var node = data.places[s.id].node || s.id, h;
    leg(s.leg);
    if (data.homestays.indexOf(node) > -1 && (h = entry('homestay')) && h.list.indexOf(node) < 0) h.list.push(node);
    (plans[i] || []).forEach(function (d) {
      d.cost.forEach(function (e) {
        var k = [].concat(e)[0];
        cost(entry(C.items[k].book || k), entryCost(e, C.items));
      });
    });
  });
  leg(route.home);
  return order.map(function (k, i) { return { e: out[k], i: i }; })
    .sort(function (a, b) { return b.e.ahead - a.e.ahead || a.i - b.i; }).map(function (x) { return x.e; });
}

var PACK_COLD_C = 15;   // a night this cold or colder (the mean low of a month, as the page rounds it) asks for a warm layer
/* What to pack for this trip: [{ code, places, t }] for the UI keys p.<code>, in this order: warm, the stays with a month
   whose nights are PACK_COLD_C °C or colder (t: the coldest); rain, the stays in a month of rain (rainyMonth); boots for a
   trip with a hike, else shoes; leeches and torch, the stays whose plans or events met ask for them (pack, content.js);
   swim, the stays by the sea (fit morze 2 or more); moto, when a swap ridden yourself is on the trip; then sun, mosquito,
   cash and apps on every trip. places: the places, each once, in the order of the trip (a night on the way as its node).
   route, plans, moto: as for tripBudget; st: normSettings' result; data: { climate, seasons, content, places, swaps }. */
function packList(route, plans, st, moto, data) {
  var lists = { warm: [], rain: [], leeches: [], torch: [], swim: [] }, cold = null, hike = false, out = [];
  function put(code, id) { if (lists[code].indexOf(id) < 0) lists[code].push(id); }
  route.stops.forEach(function (s, i) {
    var id = data.places[s.id].node || s.id;
    stayWeather(s, st.months, data.climate, data.seasons).forEach(function (w) {
      if (w.t[0] > PACK_COLD_C) return;
      put('warm', id);
      cold = cold === null ? w.t[0] : Math.min(cold, w.t[0]);
    });
    for (var d = s.start; d < s.start + s.n; d++) if (rainyMonth(data.climate[s.id], st.months[d - 1] + 1)) put('rain', id);
    (plans[i] || []).forEach(function (p) {
      if (p.pace === 'hike') hike = true;
      p.pack.forEach(function (k) { put(k, id); });
    });
    stayEvents(data.content[s.id], s, st).forEach(function (e) { (e.pack || []).forEach(function (k) { put(k, id); }); });
    if ((data.places[s.id].fit.morze || 0) >= 2) put('swim', id);
  });
  ['warm', 'rain'].forEach(function (k) { if (lists[k].length) out.push({ code: k, places: lists[k], t: k === 'warm' ? cold : null }); });
  out.push({ code: hike ? 'boots' : 'shoes', places: [], t: null });
  ['leeches', 'torch', 'swim'].forEach(function (k) { if (lists[k].length) out.push({ code: k, places: lists[k], t: null }); });
  if (ridesOn(route, moto, data.swaps)) out.push({ code: 'moto', places: [], t: null });
  ['sun', 'mosquito', 'cash', 'apps'].forEach(function (k) { out.push({ code: k, places: [], t: null }); });
  return out;
}

/* Entry and health for this trip, from ENTRY (before.js): [{ code, vars }] for the UI keys e.<code>: visa (days without a
   visa, the last day of the exemption); visa_end when the trip may end after it (the month mode counts the whole month);
   passport; insurance, and insurance_moto when riding a motorbike yourself; doctor. st: normSettings' result; riding: a
   swap ridden yourself is on the trip (ridesOn); entry: ENTRY. */
function entryNotes(st, riding, entry) {
  var span = tripSpan(st), until = fmtSpan(entry.visaFreeUntil, entry.visaFreeUntil);
  var out = [{ code: 'visa', vars: { days: entry.visaFreeDays, until: until } }];
  if (!span || span[1] > entry.visaFreeUntil) out.push({ code: 'visa_end', vars: { until: until } });
  out.push({ code: 'passport', vars: {} }, { code: 'insurance', vars: {} });
  if (riding) out.push({ code: 'insurance_moto', vars: {} });
  out.push({ code: 'doctor', vars: {} });
  return out;
}
```


- [ ] **Krok 4: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 5: Commit**

```bash
git add tests/page.test.js site2/src/page.js
git commit -F - <<'EOF'
Przed wyjazdem: rezerwacje (bookList), pakowanie (packList) i wjazd (entryNotes) jako czyste funkcje

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 9: Strona: budżet w „W skrócie” i sekcja „Przed wyjazdem”

Budżet jako szósta liczba w „W skrócie” (z odnośnikiem do sekcji) i sekcja „Przed wyjazdem” po „Dzień po dniu”, w czterech częściach: Budżet, Zarezerwuj wcześniej, Wjazd i zdrowie, Co spakować. Do tego linia budżetu w kopii planu na WhatsApp i style ekranu, telefonu i druku.

**Pliki:**
- Zmień: `site2/src/ui.js`, `site2/src/app.js`, `site2/src/template.html`
- Testy: `tests/content.test.js`

**Interfejsy:**
- Korzysta: `tripBudget`, `zlRange`, `money` (zadanie 6), `bookList`, `packList`, `entryNotes`, `ridesOn` (zadanie 8), `EUR_PLN`, `COSTS_CHECKED` (zadanie 3).
- Daje:
  - `state.budget` (wynik `tripBudget`), liczony w `apply`;
  - `zl(eur, step)` i `andList(list)` w `app.js`; `renderBefore()` rysuje sekcję;
  - w HTML: `#before` z częściami `#b-budget`, `#b-book`, `#b-entry`, `#b-pack` (klasy `.before`, `.b-part`, `.b-sum`, `.b-warn`, `.b-book`); liczba `.f-budget` w `#facts` z linkiem `#before`; odnośnik do sekcji w pasku;
  - teksty `nav.before`, `f.budget`, `f.budget.aria`, `zl`, `pt.budget` i rodziny `before.*`, `bud.*`, `cost.*`, `book.*`, `b.*`, `entry.*`, `e.*`, `p.*`, `pack.h3`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*test tekstów: rodziny kluczy budżetu i „Przed wyjazdem”.* W `tests/content.test.js` po:

```js
    'alert.': ['tet', 'holiday', 'nodata'],
```

dopisz w następnych liniach:

```js
    'bud.': ['nights', 'day', 'travel', 'trips'], 'cost.': Object.keys(COSTS.items).concat(['flights']),
    'b.': Object.keys(BOOK).filter(function (k) { return BOOK[k].ahead > 0; }),
    'e.': ['visa', 'visa_end', 'passport', 'insurance', 'insurance_moto', 'doctor'],
    'p.': ['warm', 'rain', 'boots', 'shoes', 'leeches', 'torch', 'swim', 'moto', 'sun', 'mosquito', 'cash', 'apps'],
```

*test stylu: dwa rzeczowniki na -cie.* W `tests/content.test.js` zamień:

```js
var NOT_PLURAL = ['mieście', 
```

na:

```js
var NOT_PLURAL = ['aucie', 'nakrycie', 'mieście', 
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: Error: 87 problem(s) in ui, listed above` (`tests/content.test.js`); nad nim lista brakujących kluczy, od `ui: app.js never builds a key bud.…`.

- [ ] **Krok 3: `site2/src/ui.js`.**

*tekst: odnośnik w pasku.* Zamień:

```js
  'nav.aria': 'Sekcje', 'nav.settings': 'Ustawienia', 'nav.shape': 'W skrócie', 'nav.days': 'Dzień po dniu', 'nav.top': 'Na górę', 'nav.change': 'Zmień',
```

na:

```js
  'nav.aria': 'Sekcje', 'nav.settings': 'Ustawienia', 'nav.shape': 'W skrócie', 'nav.days': 'Dzień po dniu', 'nav.before': 'Przed wyjazdem',
  'nav.top': 'Na górę', 'nav.change': 'Zmień',
```

*teksty: kwota w liczbach trasy.* Po:

```js
  'f.longest': 'najdłuższy dzień w drodze',
```

dopisz w następnych liniach:

```js
  'f.budget': 'na osobę, orientacyjnie', 'f.budget.aria': 'Budżet: {x} na osobę, orientacyjnie. Szczegóły w części Przed wyjazdem',
  'zl': '{a}–{b}\u00a0zł',
```

*tekst: budżet w kopii planu.* Po:

```js
  'pt.flights': 'Loty krajowe: ',
```

dopisz w następnych liniach:

```js
  'pt.budget': 'Budżet na osobę, bez lotów do Wietnamu: ok. {x}.',
```

*teksty: sekcja „Przed wyjazdem”.* Przed linią zaczynającą się od `'ft.photos'` wstaw (z pustą linią po wstawce):

```js
  'before.eyebrow': 'Przed wyjazdem', 'before.h2': 'Budżet, rezerwacje i pakowanie',
  'before.p': 'Wszystko policzone dla tej trasy. Ceny i terminy rezerwacji sprawdź jeszcze u przewoźników i operatorów.',
  'bud.h3': 'Budżet', 'bud.two': 'na osobę, przy dwóch osobach w pokoju i aucie.', 'bud.one': 'W pojedynkę: {x}.',
  'bud.nights': 'Noclegi', 'bud.day': 'Jedzenie i drobne wydatki', 'bud.travel': 'Przejazdy i loty krajowe', 'bud.trips': 'Wycieczki, przewodnicy i rejsy',
  'bud.top': 'Najwięcej kosztują: {x}.', 'bud.item': '{name} ({x})',
  'bud.note': 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w październiku 2026 i przeliczone z euro po kursie NBP z 9.10.2026.',
  'bud.tet': 'Ten termin obejmuje Tết: noclegi drożeją zwykle o 20–50%, autobusy o 40–60%, a loty krajowe kosztują 2–3 razy więcej, więc kwoty będą wyższe.',
  'bud.holiday': 'Ten termin obejmuje długi weekend ({x}): ceny bywają wyższe, a miejsc mniej.',
  'cost.flights': 'loty krajowe', 'cost.saigon.cangio': 'dzień w Cần Giờ', 'cost.mekong.sampan': 'sampan po kanałach Phong Điền', 'cost.mekong.market': 'łódź na targ Cái Răng',
  'cost.mekong.conson': 'łódź na Cồn Sơn', 'cost.phuquoc.north': 'auto na północy Phú Quốc', 'cost.phuquoc.east': 'auto na wschodnim wybrzeżu Phú Quốc',
  'cost.cattien.safari': 'nocne safari w Cát Tiên', 'cost.cattien.gibbons': 'gibony o świcie', 'cost.cattien.bausau_day': 'wędrówka do Bàu Sấu',
  'cost.cattien.trees': 'spacer do olbrzymich drzew', 'cost.cattien.bausau_night': 'noc nad Bàu Sấu', 'cost.dalat.bidoup': 'przewodnik w Bidoup–Núi Bà',
  'cost.dalat.cablecar': 'kolejka do Trúc Lâm', 'cost.dalat.langbiang': 'wejście na Lang Biang', 'cost.dalat.train': 'stara kolej do Trại Mát',
  'cost.dalat.caudat': 'auto na wzgórza Cầu Đất', 'cost.hoian.cooking': 'lekcja gotowania w Trà Quế', 'cost.hue.citadel': 'Cesarskie Miasto w Huế',
  'cost.hue.tombs': 'grobowce cesarzy', 'cost.hue.boatcar': 'smocza łódź i grobowce', 'cost.hue.lagoon': 'Thanh Toàn i laguna Tam Giang',
  'cost.puluong.guide': 'przewodnik w Pù Luông', 'cost.puluong.car': 'auto w dolinach Pù Luông', 'cost.puluong.summit': 'wejście na szczyt Pù Luông',
  'cost.ninhbinh.vanlong': 'łódź po Vân Long', 'cost.ninhbinh.trangan': 'łódź w Tràng An', 'cost.ninhbinh.car': 'auto do Hoa Lư',
  'cost.catba.cruise': 'rejs po Zatoce Lan Hạ', 'cost.catba.viethai': 'rowerem do Việt Hải', 'cost.catba.viethai_boat': 'łodzią do Việt Hải',
  'cost.hanoi.duonglam': 'wycieczka do Đường Lâm', 'cost.hanoi.battrang': 'wycieczka do Bát Tràng', 'cost.babe.boat': 'łódź po jeziorze Ba Bể',
  'cost.babe.guide': 'przewodnik nad jeziorem Ba Bể', 'cost.babe.cooking': 'lekcja gotowania u gospodarzy', 'cost.caobang.car': 'kierowca na pętli Cao Bằng',
  'cost.caobang.easyrider': 'easy rider na pętli Cao Bằng', 'cost.caobang.moto': 'motocykl na pętli Cao Bằng', 'cost.haivan.car': 'auto przez przełęcz Hải Vân',
  'cost.haivan.moto': 'motocykl przez przełęcz Hải Vân',
  'book.h3': 'Zarezerwuj wcześniej', 'book.p': 'Od najpilniejszego. Kwoty na osobę przy dwóch osobach.', 'book.cost': 'ok. {x} na osobę',
  'book.tet': 'Na Tết rezerwuj z dużym zapasem: loty krajowe 2–3 miesiące wcześniej, rejsy i noclegi u gospodarzy 1–2 miesiące, samochody z kierowcą 3–4 tygodnie.',
  'book.none': 'Na tej trasie nic nie trzeba rezerwować z dużym wyprzedzeniem. Noclegi zarezerwuj tydzień–dwa wcześniej.',
  'b.flights': 'Loty krajowe ({x}): ok. 3 tygodnie wcześniej.',
  'b.cattien.bausau_night': 'Noc nad Bàu Sấu: telefonem, przez Zalo albo e-mailem w parku Cát Tiên, 2–4 tygodnie wcześniej, w święta co najmniej miesiąc; miejsc jest ok. 19.',
  'b.catba.cruise': 'Rejs po Zatoce Lan Hạ z noclegiem na statku, z wypłynięciem z Cát Bà: 1–2 tygodnie wcześniej, od października do kwietnia 2–4 tygodnie.',
  'b.homestay': 'Noclegi u gospodarzy ({x}): 1–2 tygodnie wcześniej, bezpośrednio u gospodarzy; w Pù Luông w porze złotych tarasów i w długie weekendy 4–6 tygodni.',
  'b.puluong.summit': 'Wejście na szczyt Pù Luông: formularzem rezerwatu 3–7 dni wcześniej, w szczycie 2–3 tygodnie.',
  'b.caobang.car': 'Samochód z kierowcą albo przewodnik na motocyklu (easy rider) na pętlę Cao Bằng: 3–7 dni wcześniej, w szczycie 2–4 tygodnie.',
  'b.caobang.easyrider': 'Przewodnik na motocyklu (easy rider) na pętlę Cao Bằng: 3–7 dni wcześniej.',
  'b.caobang.moto': 'Motocykl na pętlę Cao Bằng, w wypożyczalni w mieście: 1–3 dni wcześniej, w szczycie 1–2 tygodnie.',
  'b.haivan.car': 'Samochód z kierowcą przez przełęcz Hải Vân: 1–3 dni wcześniej.',
  'b.haivan.moto': 'Motocykl w jedną stronę przez przełęcz Hải Vân, z przewozem bagażu: 2–3 dni wcześniej.',
  'b.transfer': 'Minibusy typu limousine i autobusy między miastami: 1–2 dni wcześniej.',
  'b.airport': 'Samochód z kierowcą na dalekie drogi z lotnisk ({x}): 2–3 dni wcześniej.',
  'b.dalat.bidoup': 'Przewodnik w parku Bidoup–Núi Bà: 2–3 dni wcześniej.',
  'b.dalat.langbiang': 'Przewodnik na Lang Biang: 2–3 dni wcześniej, gdy park potwierdzi, że szlak jest otwarty.',
  'b.saigon.cangio': 'Samochód z kierowcą na dzień do Cần Giờ: 1–2 dni wcześniej.',
  'b.hanoi.duonglam': 'Wycieczka do Đường Lâm: 1–2 dni wcześniej.',
  'b.hoian.cooking': 'Lekcja gotowania w Trà Quế: 1–2 dni wcześniej.',
  'b.cattien.park': 'Gibony o świcie, wędrówka do Bàu Sấu i nocne safari w parku Cát Tiên: najpóźniej dzień wcześniej, gibony najlepiej przed przyjazdem.',
  'b.puluong.guide': 'Przewodnik w Pù Luông: przez gospodarzy, najpóźniej dzień wcześniej.',
  'entry.h3': 'Wjazd i zdrowie', 'entry.check': 'Sprawdź przed wyjazdem: ',
  'e.visa': 'Wiza: obywatele Polski mogą być w Wietnamie bez wizy do {days} dni, w celach turystycznych. Ta zasada obowiązuje do {until}.',
  'e.visa_end': 'Twój wyjazd może skończyć się po {until}, a obecne zwolnienie z wiz trwa do tego dnia. Sprawdź aktualne zasady wjazdu.',
  'e.passport': 'Paszport: ważny co najmniej 6 miesięcy, najlepiej licząc od dnia powrotu, z dwiema wolnymi stronami.',
  'e.insurance': 'Ubezpieczenie: przy wjeździe nikt go nie sprawdza, ale weź polisę z kosztami leczenia i transportem medycznym. EKUZ działa tylko w Unii Europejskiej i EFTA.',
  'e.insurance_moto': 'Motocykl: sprawdź w warunkach polisy, czy obejmuje jazdę motocyklem. Szkody wyrządzone innym na motocyklu zwykle nie są ubezpieczone.',
  'e.doctor': 'Zdrowie: lekarz medycyny podróży 6–8 tygodni przed wyjazdem. Zwykle zaleca szczepienia przeciw WZW A, WZW B, durowi brzusznemu i tężcowi.',
  'pack.h3': 'Co spakować',
  'p.warm': 'Ciepłą warstwę i czapkę: noce w {x} bywają chłodne, do ok. {t}\u00a0°C.',
  'p.rain': 'Kurtkę przeciwdeszczową albo poncho: w {x} często pada w tym terminie.',
  'p.boots': 'Buty trekkingowe z dobrą przyczepnością i szybkoschnące ubrania na dni z wędrówką.',
  'p.shoes': 'Wygodne buty do chodzenia, z dobrą przyczepnością.',
  'p.leeches': 'Skarpety przeciw pijawkom na leśne ścieżki: {x}.', 'p.torch': 'Czołówkę na noc w lesie: {x}.', 'p.swim': 'Strój kąpielowy: {x}.',
  'p.moto': 'Na motocykl własne rękawiczki i kurtkę przeciwdeszczową, a kask z atestem sprawdź przy wypożyczeniu.',
  'p.sun': 'Krem z filtrem, okulary przeciwsłoneczne i nakrycie głowy.',
  'p.mosquito': 'Środek na komary z DEET i ubranie z długimi rękawami: denga jest w całym kraju, a komary gryzą głównie w dzień.',
  'p.cash': 'Gotówkę w drobnych nominałach: u gospodarzy, na łodziach i na targach rzadko zapłacisz kartą.',
  'p.apps': 'W telefonie Grab i mapy offline.',
```


- [ ] **Krok 4: `site2/src/app.js`.**

*zl, andList.* Przed linią zaczynającą się od `function termText(st) {` wstaw:

```js
  // an amount in euros, [from, to], in złoty: rounded to 100 zł (or step), thousands apart: "2 600–5 900 zł"; nothing is "0 zł"
  function zl(eur, step) {
    if (eur[1] <= 0) return '0\u00a0zł';
    var r = zlRange(eur, EUR_PLN, step || 100);
    return T('zl', { a: money(r[0]), b: money(r[1]) });
  }
  // names for a sentence: "A", "A i B", "A, B i C"
  function andList(list) { return list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' i ' + list[list.length - 1]; }
```

*dane dla czystych funkcji.* Po:

```js
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
```

dopisz w następnych liniach:

```js
  var BUDGET_DATA = { costs: COSTS, places: PLACES, swaps: SWAPS, shortFlightH: SHORT_FLIGHT_H };
  var BOOK_DATA = { costs: COSTS, book: BOOK, swaps: SWAPS, places: PLACES, airports: AIRPORTS, airKeys: AIR_KEYS, homestays: HOMESTAYS, shortFlightH: SHORT_FLIGHT_H };
  var PACK_DATA = { climate: CLIMATE, seasons: SEASONS, content: CONTENT, places: PLACES, swaps: SWAPS };
```

*stan: budżet.* Zamień:

```js
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay;
  // linkWarn: the link that opened the page was partly wrong (said in the warnings until the next change)
  var state = { settings: null, st: null, route: null, plans: null, linkWarn: false };
```

na:

```js
  // settings: as in the link; st: checked by normSettings; route: planRoute's trip; plans: the day plans of each stay;
  // budget: tripBudget of the trip; linkWarn: the link that opened the page was partly wrong (said in the warnings until the next change)
  var state = { settings: null, st: null, route: null, plans: null, budget: null, linkWarn: false };
```

*apply: budżet trasy.* Zamień:

```js
      done[x.id] = (done[x.id] || 0) + x.n;
      return days;
    });
    msg('');
```

na:

```js
      done[x.id] = (done[x.id] || 0) + x.n;
      return days;
    });
    state.budget = tripBudget(r, state.plans, s.moto, BUDGET_DATA);
    msg('');
```

*render: sekcja „Przed wyjazdem”.* Zamień:

```js
    renderStops();
    $('#copy-status').textContent = '';
```

na:

```js
    renderStops();
    renderBefore();
    $('#copy-status').textContent = '';
```

*liczby trasy: budżet.* Zamień:

```js
      '<li><b>' + approx(k.longest).replace('≈ ', '') + '</b><span>' + T('f.longest') + '</span></li>';
```

na:

```js
      '<li><b>' + approx(k.longest).replace('≈ ', '') + '</b><span>' + T('f.longest') + '</span></li>' +
      '<li class="f-budget"><a href="#before" aria-label="' + esc(T('f.budget.aria', { x: zl(state.budget.two) })) + '"><b>' + zl(state.budget.two) + '</b><span>' + T('f.budget') + '</span></a></li>';
```

*renderBefore.* Przed linią zaczynającą się od `/* ---------- the plan as text, for WhatsApp ---------- */` wstaw (z pustą linią po wstawce):

```js
  /* ---------- before the trip: the budget, what to book (bookList), entry and health (entryNotes), what to pack (packList) ---------- */
  function linksOf(list) { return list.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.name) + '</a>'; }).join(' · '); }
  function placesOf(ids) { return andList(ids.map(function (id) { return C(id).short; })); }
  function renderBefore() {
    var b = state.budget, r = state.route, st = state.st, moto = state.settings.moto;
    var hits = tripAlerts(st, HOLIDAYS, HOLIDAYS_FROM, HOLIDAYS_UNTIL, TET_MARGIN_DAYS).hits, tet = hits.some(function (h) { return h.kind === 'tet'; });
    var holidays = hits.filter(function (h) { return h.kind === 'holiday'; }).map(function (h) { return h.name; });
    var top = b.items.slice(0, 3).map(function (x) { return T('bud.item', { name: T('cost.' + x.key), x: zl(x.two, 10) }); });
    $('#b-budget').innerHTML = '<h3>' + T('bud.h3') + '</h3><p class="b-sum"><b>' + zl(b.two) + '</b> ' + esc(T('bud.two')) + '</p>' +
      '<p>' + esc(T('bud.one', { x: zl(b.one) })) + '</p>' +
      '<ul class="b-parts">' + ['nights', 'day', 'travel', 'trips'].map(function (k) {
        return '<li><span>' + T('bud.' + k) + '</span><span class="mono">' + zl(b.parts[k].two) + '</span></li>';
      }).join('') + '</ul>' +
      (top.length ? '<p>' + esc(T('bud.top', { x: andList(top) })) + '</p>' : '') +
      (tet ? '<p class="b-warn">' + esc(T('bud.tet')) + '</p>' : holidays.length ? '<p class="b-warn">' + esc(T('bud.holiday', { x: holidays.join(', ') })) + '</p>' : '') +
      '<p class="b-note">' + esc(T('bud.note')) + '</p>';
    var books = bookList(r, state.plans, moto, BOOK_DATA);
    $('#b-book').innerHTML = '<h3>' + T('book.h3') + '</h3><p class="b-note">' + T('book.p') + '</p>' +
      (tet ? '<p class="b-warn">' + esc(T('book.tet')) + '</p>' : '') +
      (books.length ? '<ol class="b-book">' + books.map(function (e) {
        var x = e.key === 'flights' ? e.list.map(function (f) { return AIRPORTS[f[0]].name + ' → ' + AIRPORTS[f[1]].name; }).join(', ')
          : e.key === 'airport' ? e.list.map(function (a) { return AIRPORTS[a[0]].name + ' – ' + C(a[1]).short; }).join(', ')
          : e.key === 'homestay' ? placesOf(e.list) : '';
        var meta = [e.two ? esc(T('book.cost', { x: zl(e.two, 10) })) : '', linksOf(e.links)].filter(Boolean);
        return '<li><p>' + esc(T('b.' + e.key, { x: x })) + '</p>' + (meta.length ? '<p class="b-meta">' + meta.join(' · ') + '</p>' : '') + '</li>';
      }).join('') + '</ol>' : '<p>' + esc(T('book.none')) + '</p>');
    $('#b-entry').innerHTML = '<h3>' + T('entry.h3') + '</h3><ul class="b-list">' + entryNotes(st, ridesOn(r, moto, SWAPS), ENTRY).map(function (e) {
      return '<li>' + esc(T('e.' + e.code, e.vars)) + '</li>';
    }).join('') + '</ul><p class="b-meta">' + T('entry.check') + linksOf(ENTRY.links) + '</p>';
    $('#b-pack').innerHTML = '<h3>' + T('pack.h3') + '</h3><ul class="b-list">' + packList(r, state.plans, st, moto, PACK_DATA).map(function (p) {
      return '<li>' + esc(T('p.' + p.code, { x: placesOf(p.places), t: p.t })) + '</li>';
    }).join('') + '</ul>';
  }
```

*kopia planu: budżet.* Zamień:

```js
    if (flights.length) lines.push(T('pt.flights') + flights.join('; '));
    lines.push(T('pt.link') + SITE_URL + linkHash(state.settings));
```

na:

```js
    if (flights.length) lines.push(T('pt.flights') + flights.join('; '));
    lines.push(T('pt.budget', { x: zl(state.budget.two) }));
    lines.push(T('pt.link') + SITE_URL + linkHash(state.settings));
```


- [ ] **Krok 5: `site2/src/template.html`.**

*pasek: odnośnik.* Zamień:

```html
    <a href="#days" data-i18n="nav.days"></a>
  </div>
```

na:

```html
    <a href="#days" data-i18n="nav.days"></a>
    <a href="#before" data-i18n="nav.before"></a>
  </div>
```

*sekcja „Przed wyjazdem”.* Przed linią zaczynającą się od `</main>` wstaw (z pustą linią przed wstawką):

```html
  <section class="block wrap" id="before">
    <div class="block-head">
      <p class="eyebrow" data-i18n="before.eyebrow"></p>
      <h2 data-i18n="before.h2"></h2>
      <p data-i18n="before.p"></p>
    </div>
    <div class="before">
      <div class="b-part" id="b-budget"></div>
      <div class="b-part" id="b-book"></div>
      <div class="b-part" id="b-entry"></div>
      <div class="b-part" id="b-pack"></div>
    </div>
  </section>
```

*CSS: kwota i sekcja.* Przed linią zaczynającą się od `/* Changes to the trip: Dodaj, Usuń` wstaw (z pustą linią po wstawce):

```html
/* The budget as the last figure of the facts, a link to its part of "Przed wyjazdem" */
.facts .f-budget a { display: grid; gap: 2px; color: inherit; text-decoration: none; }
.facts .f-budget b { font-size: clamp(24px, 2.5vw, 32px); }   /* the widest, 5 800–13 500 zł, fits its column (tests/probes/before.js) */
.facts .f-budget span { text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; }
/* Before the trip: the budget, what to book, entry and health, what to pack; two columns on a wide screen */
.before { display: grid; gap: 28px; }
@media (min-width: 900px) { .before { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 48px; } }
.b-part { display: grid; gap: 10px; align-content: start; }
.b-part h3 { font-size: 24px; }
.b-sum b { font-family: var(--display); font-weight: 500; font-size: clamp(26px, 3vw, 34px); white-space: nowrap; }
.b-parts { display: grid; }
.b-parts li { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--line); padding: 5px 0; font-size: 15px; }
.b-note, .b-meta { font-size: 13.5px; color: var(--muted); }
.b-warn { font-size: 14px; background: var(--warm-soft); border-left: 3px solid var(--warm); padding: 8px 12px; border-radius: 4px; }
.b-book { display: grid; gap: 8px; }
.b-book li { display: grid; gap: 4px; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; font-size: 15px; }
.b-list { display: grid; gap: 6px; }
.b-list li { position: relative; padding-left: 18px; font-size: 15px; }
.b-list li::before { content: ""; position: absolute; left: 4px; top: 0.65em; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
```

*liczby trasy: szósta, szersza kolumna.* Zamień:

```html
.facts ul { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
```

na:

```html
.facts ul { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)) minmax(0, 1.9fr); }
```

*telefon: budżet przez całą szerokość.* Zamień:

```html
  /* the figures in two columns, the last one across both when it is alone in its row */
  .facts ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  #facts li:nth-child(odd) { border-left: 0; padding-left: 0; }
  #facts li:nth-child(n+3) { border-top: 1px solid var(--line); }
  #facts li:last-child:nth-child(odd) { grid-column: 1 / -1; }
```

na:

```html
  /* the figures in two columns; the budget, last, across both, and the one before it too when it would stand alone */
  .facts ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  #facts li:nth-child(odd), #facts .f-budget { border-left: 0; padding-left: 0; }
  #facts li:nth-child(n+3) { border-top: 1px solid var(--line); }
  #facts li:nth-last-child(2):nth-child(odd), #facts .f-budget { grid-column: 1 / -1; }
```

*druk: sekcja bez siatek.* Zamień:

```html
  .leg, .day, .tip { break-inside: avoid; }
  .credits { columns: 3;
```

na:

```html
  .leg, .day, .tip { break-inside: avoid; }
  /* "Przed wyjazdem": blocks, not grids (as .stop above), and each of its items whole */
  .before, .b-part, .b-book, .b-list, .b-parts { display: block !important; }
  .before > * + * { margin-top: 24px; }
  .b-part > * + *, .b-book li + li, .b-list li + li { margin-top: 8px; }
  .b-book li, .b-list li, .b-parts li { break-inside: avoid; }
  .credits { columns: 3;
```


- [ ] **Krok 6: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 7: Build, sondy, zrzuty i wydruk**

Zrzuty: góra strony z liczbami trasy, a sekcję „Przed wyjazdem” (na dole strony) pokazuje zrzut sondy, która do niej przewija (`probe.sh` zapisuje ostatni stan w `$TMPDIR/vn-probe/shot.png`):

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/changes.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2'
bash tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
bash tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
bash tests/shot.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 390 "$TMPDIR/t9-390.png" 3000
bash tests/shot.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 1400 "$TMPDIR/t9-1400.png" 2000
cat > "$TMPDIR/at-before.js" <<'EOF'
// scrolls to „Przed wyjazdem”, so that the probe's screenshot ($TMPDIR/vn-probe/shot.png) shows it
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  document.getElementById('before').scrollIntoView();
  check('„Przed wyjazdem” is at the top of the screen', Math.abs(document.getElementById('before').getBoundingClientRect().top) < 80, Math.round(document.getElementById('before').getBoundingClientRect().top));
  done();
}, 500);
EOF
bash tests/probe.sh "$TMPDIR/at-before.js" 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' && cp "$TMPDIR/vn-probe/shot.png" "$TMPDIR/t9-sekcja-390.png"
bash tests/probe.sh "$TMPDIR/at-before.js" 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' && cp "$TMPDIR/vn-probe/shot.png" "$TMPDIR/t9-sekcja-1400.png"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/t9.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/t9-ciemny.pdf" dark
```

Oczekiwane: każda sonda kończy się linią `done, all checks ok` i kodem 0 (`echo $?`). Obejrzyj zrzuty (narzędziem Read; zrzut sondy ma 1400 px szerokości, a strona przy 390 px zajmuje jego lewą część):
- `t9-390.png`: kwota „2 600–5 900 zł” (sucha próba, marzec 2027) jako ostatnia liczba trasy, przez całą szerokość karty, z podpisem „na osobę, orientacyjnie”;
- `t9-1400.png`: sześć liczb w jednym rzędzie, kwota w szerszej kolumnie;
- `t9-sekcja-*.png`: „Budżet, rezerwacje i pakowanie”, kwota z podziałem na cztery części, kwota w pojedynkę, trzy największe pozycje, a na 1400 px obok „Zarezerwuj wcześniej”.

Wydruki: `covered text lines: 0` (sucha próba: 12 stron).

- [ ] **Krok 8: Commit**

```bash
git add tests/content.test.js site2/src/ui.js site2/src/app.js site2/src/template.html
git commit -F - <<'EOF'
Strona: budżet jako szósta liczba w „W skrócie” i sekcja „Przed wyjazdem” (budżet, rezerwacje, wjazd i zdrowie, pakowanie), linia budżetu w kopii planu, druk bez siatek

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 10: Przełącznik motocykla w kartach i sonda before.js

Przełącznik „Z kierowcą / Samodzielnie” w karcie Cao Bằng (przed dniami) i w karcie przejazdu Hội An–Huế, ze zdaniem o prawie jazdy i ramką po wyborze „Samodzielnie” (wymagania, ryzyko, rady). Zmiana buduje na formularzu, jak „Dodaj”: zapisuje link, zostawia kartę na miejscu i fokus na przełączniku. Sonda `before.js` sprawdza w Chrome budżet, sekcję i oba przełączniki.

**Pliki:**
- Utwórz: `tests/probes/before.js`
- Zmień: `site2/src/ui.js`, `site2/src/app.js`, `site2/src/template.html`
- Testy: `tests/content.test.js`

**Interfejsy:**
- Korzysta: `SWAPS`, `withSwap`, `selfSwaps` (zadanie 5), `state.budget`, `renderBefore` (zadanie 9), `readForm`, `apply`, `syncForm` (`app.js`).
- Daje:
  - `swapBlock(id)` (HTML przełącznika i ramki), `swapOfPlace(id)`, `swapOfLeg(L)`, `bindSwaps()` w `app.js`;
  - pola `input[name="swap-<id>"]` z wartościami `driver` i `self`, kontener `.swap[data-swap="<id>"]`, zdanie `.swap-note`, ramka `.swap-box`;
  - teksty `sw.*` (z `sw.tips.<id>`);
  - sonda `tests/probes/before.js`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

*test tekstów: rodziny kluczy przełącznika.* W `tests/content.test.js` po:

```js
    'bud.': ['nights', 'day', 'travel', 'trips'], 'cost.': Object.keys(COSTS.items).concat(['flights']),
```

dopisz w następnych liniach:

```js
    'sw.': Object.keys(SWAPS).concat(['driver', 'self']), 'sw.tips.': Object.keys(SWAPS),
```


- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

Uruchom: `bash tests/run.sh`
Oczekiwane: `Exception: Error: 8 problem(s) in ui, listed above` (`tests/content.test.js`); nad nim brakujące klucze, od `ui: app.js never builds a key sw.…`.

- [ ] **Krok 3: `site2/src/ui.js`.**

*teksty przełącznika.* Przed linią zaczynającą się od `'stop.remove'` wstaw:

```js
  'sw.caobang': 'Pętla po Cao Bằng', 'sw.haivan': 'Przez przełęcz Hải Vân', 'sw.driver': 'Z kierowcą', 'sw.self': 'Samodzielnie',
  'sw.note': 'Samodzielnie tylko z polskim prawem jazdy kategorii A1, A2 albo A i międzynarodowym prawem jazdy według konwencji wiedeńskiej, oba przy sobie. Samo B nie wystarcza nawet na skuter 110–125 cm³.',
  'sw.req.h': 'Wymagania. ', 'sw.risk.h': 'Ryzyko. ', 'sw.tips.h': 'Rady. ',
  'sw.req': 'Międzynarodowe prawo jazdy wydaje starostwo: 35 zł, zwykle od ręki, ważne do 3 lat. W motocyklu muszą być dowód rejestracyjny i polisa obowiązkowego OC, a kask zgodny z normą trzeba zapiąć, także pasażerowi. Sprawdź w warunkach swojej polisy, czy obejmuje jazdę motocyklem.',
  'sw.risk': 'Na drogach Wietnamu ginie na mieszkańca ok. 2,7 raza więcej osób niż w Polsce. Po wypadku grozi odpowiedzialność karna, odszkodowanie i zakaz wyjazdu do końca dochodzenia. Bez uprawnień grozi mandat 2–4 mln VND i zatrzymanie motocykla, a polisa może nie zapłacić. Policja kontroluje cudzoziemców.',
  'sw.tips': 'Przy odbiorze obejrzyj motocykl i zrób zdjęcia rys. Paszportu nie zostawiaj w zastaw, zapytaj o kaucję gotówką. Nie jedź po zmroku, w deszczu i mgle zwolnij, a na serpentynach uważaj na żwir i ciężarówki.',
  'sw.tips.caobang': 'Na pętli rozsądnie jest 80–100 km dziennie. Tankuj przy każdej okazji, bo za miastem stacji jest mało.',
  'sw.tips.haivan': 'Przez przełęcz jedzie się tylko górą, bo motocykle nie wjeżdżają do tunelu. Wyjedź rano, przed ruchem i mgłą.',
```


- [ ] **Krok 4: `site2/src/app.js`.**

*swapBlock, swapOfPlace, swapOfLeg.* Przed linią zaczynającą się od `/* The journey on a given day: L is a stay` wstaw (z pustą linią po wstawce):

```js
  /* The either-or choice of a swap (SWAPS in content.js) inside a card: „Z kierowcą” or „Samodzielnie” as two radio buttons,
     the legal condition under them and, when ridden yourself, what it takes, the risk and the advice. */
  function swapBlock(id) {
    var self = state.settings.moto.indexOf(id) > -1;
    return '<div class="swap" data-swap="' + id + '"><p class="swap-h">' + T('sw.' + id) + '</p>' +
      '<div class="seg swap-seg" role="radiogroup" aria-label="' + esc(T('sw.' + id)) + '">' + ['driver', 'self'].map(function (v) {
        return '<label><input type="radio" name="swap-' + id + '" value="' + v + '"' + ((v === 'self') === self ? ' checked' : '') + '><span>' + T('sw.' + v) + '</span></label>';
      }).join('') + '</div><p class="swap-note">' + esc(T('sw.note')) + '</p>' +
      (self ? '<div class="swap-box"><p><b>' + T('sw.req.h') + '</b>' + esc(T('sw.req')) + '</p><p><b>' + T('sw.risk.h') + '</b>' + esc(T('sw.risk')) + '</p>' +
        '<p><b>' + T('sw.tips.h') + '</b>' + esc(T('sw.tips') + ' ' + T('sw.tips.' + id)) + '</p></div>' : '') + '</div>';
  }
  // the swap of a place (its days), or of a road of the leg L (SWAPS), or undefined
  function swapOfPlace(id) { return Object.keys(SWAPS).filter(function (k) { return SWAPS[k].place === id; })[0]; }
  function swapOfLeg(L) {
    return Object.keys(SWAPS).filter(function (k) {
      return SWAPS[k].road && L.segs.some(function (g) { return g.mode === 'road' && [g.from, g.to].sort().join('-') === SWAPS[k].road; });
    })[0];
  }
```

*karta przejazdu: zamiana drogi.* Zamień:

```js
    var long = L.total >= LONG_LEG_H, maps = L.flights ? '' : mapsLink(L.from, L.to);
```

na:

```js
    var long = L.total >= LONG_LEG_H, maps = L.flights ? '' : mapsLink(L.from, L.to), sw = swapOfLeg(L);
```

*karta przejazdu: przełącznik.* Zamień:

```js
        (maps ? ' <a href="' + esc(maps) + '" target="_blank" rel="noopener">' + T('maps') + '</a>' : '') + '</p>' : '') +
      '</div>';
```

na:

```js
        (maps ? ' <a href="' + esc(maps) + '" target="_blank" rel="noopener">' + T('maps') + '</a>' : '') + '</p>' : '') +
      (sw ? swapBlock(sw) : '') + '</div>';
```

*karta miejsca: zamiana.* Zamień:

```js
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; }), compact = !c.photos.length || again;
```

na:

```js
      var c = C(s.id), again = r.stops.slice(0, i).some(function (x) { return x.id === s.id; }), compact = !c.photos.length || again, sw = swapOfPlace(s.id);
```

*karta miejsca: przełącznik przed dniami.* Zamień:

```js
        (again ? '' : gallery(s.id)) + '<ol class="days">' + state.plans[i].map(function (d) {
```

na:

```js
        (again ? '' : gallery(s.id)) + (sw ? swapBlock(sw) : '') + '<ol class="days">' + state.plans[i].map(function (d) {
```

*bindSwaps.* Przed linią zaczynającą się od `/* ---------- the plan as text, for WhatsApp ---------- */` wstaw (z pustą linią po wstawce):

```js
  /* „Z kierowcą” or „Samodzielnie” in a card: the trip stays, its days, texts and budget follow; the choice builds on the
     form as it stands (as Dodaj does), and the focus goes back to the chosen button of the new card. */
  function bindSwaps() {
    document.addEventListener('change', function (e) {
      var name = e.target.name || '';
      if (name.indexOf('swap-') !== 0) return;
      var id = name.slice(5);
      if (apply(withSwap(readForm(), id, e.target.value === 'self'))) {
        syncForm();
        var again = document.querySelector('input[name="' + name + '"]:checked');
        if (again) again.focus({ preventScroll: true });
      }
    });
  }
```

*podpięcie bindSwaps.* Zamień:

```js
  bindChanges();
  bindSummary();
```

na:

```js
  bindChanges();
  bindSwaps();
  bindSummary();
```


- [ ] **Krok 5: `site2/src/template.html`.**

*CSS przełącznika.* Przed linią zaczynającą się od `/* The budget as the last figure of the facts` wstaw:

```html
/* The either-or choice in a card (SWAPS): Z kierowcą or Samodzielnie, the condition under it, the box when ridden yourself */
.swap { display: grid; gap: 8px; margin: 14px 0 6px; padding: 12px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); }
.leg .swap { margin: 4px 0 0; }
.swap-h { font-weight: 600; }
.swap-seg { max-width: 360px; }
.swap-note { font-size: 13.5px; color: var(--muted); }
.swap-box { display: grid; gap: 6px; font-size: 14px; border-left: 3px solid var(--warm); padding: 4px 0 4px 12px; }
```

*druk: przełącznik bez siatki.* Zamień:

```html
  /* "Przed wyjazdem": blocks, not grids (as .stop above), and each of its items whole */
  .before, .b-part, .b-book, .b-list, .b-parts { display: block !important; }
  .before > * + * { margin-top: 24px; }
  .b-part > * + *, .b-book li + li, .b-list li + li { margin-top: 8px; }
  .b-book li, .b-list li, .b-parts li { break-inside: avoid; }
```

na:

```html
  /* "Przed wyjazdem" and the motorbike's choice: blocks, not grids (as .stop above), and each of their items whole */
  .before, .b-part, .b-book, .b-list, .b-parts, .swap { display: block !important; }
  .before > * + * { margin-top: 24px; }
  .b-part > * + *, .b-book li + li, .b-list li + li, .swap > * + * { margin-top: 8px; }
  .b-book li, .b-list li, .b-parts li, .swap { break-inside: avoid; }
```


- [ ] **Krok 6: `tests/probes/before.js`.** Sonda (cały plik). Trasę zmienia przez adres (`location.hash`), bo przełącznik buduje na formularzu.

*nowa sonda before.js.* Cały plik:

```js
// The budget and "Przed wyjazdem", and the motorbike swaps: the budget figure leads to its part; the section has its four
// parts; „Samodzielnie” in the Cao Bằng card and in the card of the road over the Hải Vân pass writes the link, changes the
// days or the road's text and the budget, shows what it takes, keeps the trip, and leaves the focus on the choice; the plan
// for WhatsApp says the budget; the widest budget fits its figure; a term with Tết warns in both parts.
// tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
// and at 901 px, the narrowest screen with the facts in one row, and at 1400 px
setTimeout(function () {
  var t = window.__trip;
  function ids() { return t.state.route.stops.map(function (s) { return s.id; }).join(','); }
  var fig = document.querySelector('#facts .f-budget a');
  check('the budget is the last figure of the facts, a link to „Przed wyjazdem”', fig && fig.getAttribute('href') === '#before' && /zł/.test(fig.textContent), fig && fig.textContent);
  var parts = Array.prototype.map.call(document.querySelectorAll('#before .b-part h3'), function (h) { return h.textContent.replace(/\s+/g, ' '); });
  check('„Przed wyjazdem” has its four parts', parts.join(' | ') === 'Budżet | Zarezerwuj wcześniej | Wjazd i zdrowie | Co spakować', parts.join(' | '));
  check('the figure and the budget part say the same amount', textOf('#b-budget .b-sum b') === textOf('#facts .f-budget b'), textOf('#b-budget .b-sum b'));
  check('the list of what to book has its items, each with a sentence', document.querySelectorAll('#b-book .b-book li').length > 0);
  // Cao Bằng ridden yourself
  var before = ids(), money = fig.querySelector('b').textContent, self = document.querySelector('input[name="swap-caobang"][value="self"]');
  check('the Cao Bằng card offers „Z kierowcą” and „Samodzielnie”, with the legal condition', self && /A1, A2 albo A/.test(textOf('#stops .swap[data-swap="caobang"] .swap-note')));
  self.click();
  setTimeout(function () {
    var card = document.querySelector('#stops .swap[data-swap="caobang"]').closest('.stop');
    check('„Samodzielnie” writes motocykl=caobang into the link', /motocykl=caobang/.test(location.hash), location.hash);
    check('and the trip stays the same', ids() === before, ids());
    check('the days of the loop ride the motorbike', Array.prototype.some.call(card.querySelectorAll('.day h4'), function (h) { return /motocyklem/.test(h.textContent); }));
    check('what it takes, the risk and the advice show', !!card.querySelector('.swap-box') && /starostwo/.test(card.querySelector('.swap-box').textContent));
    check('the budget follows', document.querySelector('#facts .f-budget b').textContent !== money, money + ' → ' + document.querySelector('#facts .f-budget b').textContent);
    check('the focus stays on the choice', document.activeElement && document.activeElement.name === 'swap-caobang' && document.activeElement.value === 'self');
    check('„Przed wyjazdem” books the motorbike', /Motocykl na pętlę Cao Bằng/.test(textOf('#b-book')));
    document.querySelector('input[name="swap-caobang"][value="driver"]').click();
    setTimeout(function () {
      check('„Z kierowcą” takes it back: no swap in the link, no box', !/motocykl=/.test(location.hash) && !document.querySelector('#stops .swap-box'), location.hash);
      // the road over the Hải Vân pass, on a trip from Hồ Chí Minh City to Hà Nội: a new link, so the form follows (a swap
      // builds on the form, as Dodaj does)
      var at = soon();
      location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2';
      setTimeout(function () {
      var road = document.querySelector('input[name="swap-haivan"][value="self"]');
      check('the card of the road between Hội An and Huế offers the swap', !!road && !!road.closest('.leg'));
      if (!road) { done(); return; }
      road.click();
      setTimeout(function () {
        var leg = document.querySelector('input[name="swap-haivan"]').closest('.leg');
        check('the road is ridden yourself: its text says so, the link too', /Motocykl wypożyczony w jedną stronę/.test(leg.textContent.replace(/\s+/g, ' ')) && /motocykl=haivan/.test(location.hash), location.hash);
        document.getElementById('copy-plan').click();
        setTimeout(function () {
          var box = document.getElementById('copy-fallback');
          check('the plan for WhatsApp says the budget', box.hidden || /Budżet na osobę/.test(box.value), box.value.split('\n').slice(-3).join(' / '));
          // the widest budget of all the settings (30 days from and to Hồ Chí Minh City, nature, November 2027): it fits its figure
          location.hash = '#od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2';
          setTimeout(function () {
            var b = document.querySelector('#facts .f-budget b'), li = document.querySelector('#facts .f-budget');
            check('the widest budget fits its figure: ' + textOf('#facts .f-budget b'), b.getBoundingClientRect().right <= document.getElementById('facts').getBoundingClientRect().right + 0.5 &&
              b.scrollWidth <= Math.ceil(li.getBoundingClientRect().width) + 1, Math.round(b.getBoundingClientRect().right) + ', ' + b.scrollWidth + ' of ' + Math.round(li.getBoundingClientRect().width));
            // a term with Tết (January 2028): the budget says prices go up, the list of what to book says how far ahead
            location.hash = '#od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2';
            setTimeout(function () {
              check('Tết: the budget warns that prices go up', /Tết/.test(textOf('#b-budget .b-warn')), textOf('#b-budget .b-warn'));
              check('Tết: the list of what to book says how far ahead', /Tết/.test(textOf('#b-book .b-warn')), textOf('#b-book .b-warn'));
              done();
            }, 500);
          }, 500);
        }, 300);
      }, 400);
      }, 500);
    }, 400);
  }, 400);
}, 1500);
```


- [ ] **Krok 7: Uruchom testy**

Uruchom: `bash tests/run.sh`
Oczekiwane: `ALL PASS`.

- [ ] **Krok 8: Build i sondy**

```bash
python3 site2/build.py
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
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

Oczekiwane: każda sonda kończy się linią `done, all checks ok` i kodem 0 (`echo $?`).

- [ ] **Krok 9: Wydruk czterech tras**

Zwykła trasa, Cao Bằng na motocyklu, najszerszy budżet i termin z Tết, w jasnym i ciemnym motywie:

```bash
mkdir -p "$TMPDIR/wietnam-2b"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u1.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u1-ciemny.pdf" dark
bash tests/print.sh 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&motocykl=caobang' "$TMPDIR/wietnam-2b/u2.pdf"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&motocykl=caobang' "$TMPDIR/wietnam-2b/u2-ciemny.pdf" dark
bash tests/print.sh 'od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2' "$TMPDIR/wietnam-2b/u3.pdf"
bash tests/print.sh 'od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2' "$TMPDIR/wietnam-2b/u3-ciemny.pdf" dark
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u4.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u4-ciemny.pdf" dark
```

Oczekiwane: przy każdym pliku `covered text lines: 0`.

- [ ] **Krok 10: Commit**

```bash
git add tests/content.test.js site2/src/ui.js site2/src/app.js site2/src/template.html tests/probes/before.js
git commit -F - <<'EOF'
Strona: przełącznik „Z kierowcą / Samodzielnie” w karcie Cao Bằng i w karcie przejazdu przez Hải Vân, sonda before.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 11: Punkt kontrolny etapu 2

Sprawdzenie całości przed zamknięciem etapu 2: pełny test, wszystkie sondy, linki, wydruk, zrzuty sześciu ustawień, ręczne sprawdzenie tego, czego Chrome bez okna nie pokaże, prawdziwy telefon i przegląd z użytkownikiem. Poprawki z przeglądu idą jako osobne commity (test, kod, `ALL PASS`, commit), a wynik przeglądu trafia do notatek w zadaniu 12.

**Pliki:** bez zmian w repo, jeśli przegląd niczego nie wykaże. Zrzuty i PDF-y idą do `$TMPDIR/wietnam-2b/`. Do ręcznego sprawdzenia powstaje na chwilę `.claude/launch.json` (lokalny serwer), usuwany w kroku 6.

- [ ] **Krok 1: Pełny test i build**

```bash
time bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `combos: 134784 (all)` i `ALL PASS` w ok. 45 s; build bez błędów; grep nic nie wypisuje.

- [ ] **Krok 2: Wszystkie sondy**

```bash
bash tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
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

Oczekiwane: ostatnia linia `links.sh: all addresses answer`, kod 0. Adres, który nie odpowiada 2xx, otwórz w przeglądarce; zepsuty link zgłoś użytkownikowi (nowy link trafia najpierw do researchu).

- [ ] **Krok 4: Wydruk czterech tras**

```bash
mkdir -p "$TMPDIR/wietnam-2b"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u1.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u1-ciemny.pdf" dark
bash tests/print.sh 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&motocykl=caobang' "$TMPDIR/wietnam-2b/u2.pdf"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&motocykl=caobang' "$TMPDIR/wietnam-2b/u2-ciemny.pdf" dark
bash tests/print.sh 'od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2' "$TMPDIR/wietnam-2b/u3.pdf"
bash tests/print.sh 'od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2' "$TMPDIR/wietnam-2b/u3-ciemny.pdf" dark
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u4.pdf"
bash tests/print.sh 'od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2' "$TMPDIR/wietnam-2b/u4-ciemny.pdf" dark
```

Oczekiwane: przy każdym pliku `covered text lines: 0` (sucha próba: 12, 14, 19 i 13 stron, w obu motywach tyle samo). W suchej próbie ostatnia strona trasy z Cao Bằng i trasy z Tết była prawie pusta (5% wysokości): pokaż to użytkownikowi w kroku 8.

- [ ] **Krok 5: Zrzuty sześciu ustawień** na 390 px (i trzech na 1400 px), na całą wysokość strony, pocięte na kawałki do oglądania:

```bash
mkdir -p "$TMPDIR/wietnam-2b"
i=1
for s in \
  'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' \
  'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2&motocykl=haivan' \
  'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang&motocykl=caobang' \
  'od=HAN&do=SGN&miesiac=2027-03&dni=10&co=przyroda&poziom=2' \
  'od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2' \
  'od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2'; do
  bash tests/shot.sh "$s" 390 "$TMPDIR/wietnam-2b/z$i-390.png" 29000
  case $i in 1|3|5) bash tests/shot.sh "$s" 1400 "$TMPDIR/wietnam-2b/z$i-1400.png" 21000 ;; esac
  i=$((i+1))
done
python3 - "$TMPDIR/wietnam-2b" <<'EOF'
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

Strona przy 390 px ma ok. 19 500 px (15 dni) do 28 200 px (30 dni) wysokości, a sekcja „Przed wyjazdem” zaczyna się 5000–6000 px przed końcem; białe kawałki pod końcem strony pomiń. Obejrzyj kawałki (narzędziem Read) i sprawdź:
- **z1** (Hồ Chí Minh City–Hà Nội, 15 dni): kwota jako szósta liczba „W skrócie” (na 390 px przez całą szerokość, na 1400 px w szerszej kolumnie, z odnośnikiem); w karcie przejazdu Hội An–Huế przełącznik „Z kierowcą / Samodzielnie” ze zdaniem o prawie jazdy; sekcja „Przed wyjazdem” z czterema częściami: budżet z podziałem, kwotą w pojedynkę, trzema największymi pozycjami i tym, czego nie liczy; rezerwacje od najpilniejszej, z kwotami i linkami; wjazd i zdrowie; pakowanie;
- **z2** (to samo, Hải Vân samodzielnie): tekst drogi „Motocykl wypożyczony w jedną stronę…”, ramka z wymaganiami, ryzykiem i radą; w rezerwacjach motocykl na przełęcz, w pakowaniu rzeczy na motocykl, we wjeździe zdanie o ubezpieczeniu przy jeździe motocyklem;
- **z3** (Cao Bằng na motocyklu): przełącznik przed dniami, ramka, dni pętli „…motocyklem”, pierwszy wieczór z odbiorem motocykla i zdaniem o strefie przygranicznej, w rezerwacjach „Motocykl na pętlę Cao Bằng”;
- **z4** (Cát Bà i Cát Tiên): w pierwszej karcie przejazdu tekst dalekiej drogi z Nội Bài i zdanie o ostatnim promie, w ostatniej zdanie o pierwszym promie z Cát Tiên; dni w Cát Tiên bez Đảo Tiên;
- **z5** (30 dni, przyroda, listopad): najszersza kwota („5 800–13 500 zł” w suchej próbie) mieści się w kafelku;
- **z6** (Tết, styczeń 2028): w budżecie zdanie o wyższych cenach w Tết, w rezerwacjach zdanie o wyprzedzeniu na Tết.

Na wszystkich zrzutach: kwoty z twardą spacją w tysiącach („5 800”) i przed „zł”, „ok.” nie zostaje sam na końcu linii, teksty po polsku i per „ty”, linki rezerwacji z nazwą operatora.

- [ ] **Krok 6: Ręcznie w przeglądarce: pasek u góry, „Na górę”, mapa, odnośnik kwoty i przełącznik z klawiatury.** Chrome bez okna nie uruchamia IntersectionObserver, a wbudowana przeglądarka nie otwiera `file://`, więc strona idzie z lokalnego serwera.
  - Utwórz `.claude/launch.json`:

    ```json
    {
      "version": "0.0.1",
      "configurations": [
        { "name": "strona-2b", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765", "--directory", "site2/out/pages"], "port": 8765 }
      ]
    }
    ```

  - Uruchom serwer narzędziem `preview_start` (nazwa `strona-2b`), przejdź do `http://localhost:8765/#od=SGN&do=HAN&miesiac=…&dni=15&co=&poziom=2` z miesiącem za pięć miesięcy (`date -v+5m +%Y-%m`) i ustaw widok `mobile` (`resize_window`).
  - Sprawdź na telefonie, przewijając i robiąc zrzuty ekranu:
    - pasek u góry ma odnośnik „Przed wyjazdem”, a gdy formularz zniknie u góry ekranu, pokazuje podsumowanie i „Zmień”;
    - stuknięcie kwoty w „W skrócie” przewija do „Przed wyjazdem”;
    - „Na górę” pojawia się po przewinięciu i wraca na górę strony;
    - przełącznik w karcie przejazdu Hội An–Huế: po „Samodzielnie” karta zostaje w tym samym miejscu ekranu, pokazuje się ramka, a kwota w „W skrócie” się zmienia;
    - pasek z czterema odnośnikami nie mieści się przy 390 px: „Przed wyjazdem” jest ucięty i wygaszony, a pasek przesuwa się w bok (tak działa od 2A); sprawdź, że przesunięcie odsłania odnośnik, i pokaż to użytkownikowi w kroku 8.
  - Ustaw widok `desktop` i sprawdź:
    - przy przewijaniu „Dzień po dniu” mapa podświetla znacznik miejsca, które jest na ekranie;
    - przełącznik działa z klawiatury: Tab dochodzi do niego, strzałki zmieniają wybór, a fokus zostaje na przełączniku po przebudowie strony.
  - Zatrzymaj serwer (`preview_stop`) i usuń `.claude/launch.json` (oraz pusty katalog `.claude/`, jeśli nic innego w nim nie ma).

- [ ] **Krok 7: Prawdziwy telefon** (z użytkownikiem, w domowej sieci Wi-Fi). Najpierw zapytaj, czy użytkownik ma teraz telefon pod ręką w tej samej sieci Wi-Fi co Mac. Jeśli tak:
  - podaj adres Maca i uruchom serwer w tle (narzędziem Bash z `run_in_background`):

    ```bash
    ipconfig getifaddr en0
    python3 -m http.server 8766 --bind 0.0.0.0 --directory site2/out/pages
    ```

  - macOS może zapytać, czy `python3` ma przyjmować połączenia przychodzące: to decyzja użytkownika;
  - użytkownik otwiera na telefonie `http://<adres Maca>:8766/#od=SGN&do=HAN&miesiac=…&dni=15&co=&poziom=2` (adres z `ipconfig`, miesiąc z `date -v+5m +%Y-%m`; podaj użytkownikowi gotowy link) i sprawdza: kwotę w „W skrócie” i stuknięcie w nią, sekcję „Przed wyjazdem”, przełącznik dotykiem, link rezerwacji (otwiera się w nowej karcie), „Skopiuj plan” z linią budżetu;
  - po sprawdzeniu zatrzymaj serwer.

  Jeśli telefon nie łączy się z Makiem (zapora, sieć dla gości), zaproponuj prywatny artifact; publikacja tylko po wyraźnym „tak” użytkownika: publish z `file_path = site2/out/web/index.html` i `files` = obrazy z `site2/out/web/img/`.

- [ ] **Krok 8: Przegląd z użytkownikiem**
  - Wyślij kawałki zrzutów z kroku 5, które pokazują: kwotę w „W skrócie” (z1, 390 i 1400 px), sekcję „Przed wyjazdem” (z1, 390 px), Cao Bằng na motocyklu (z3), promy (z4), najszerszą kwotę (z5) i Tết (z6), oraz uwagi o prawie pustej ostatniej stronie wydruku (krok 4) i o uciętym odnośniku „Przed wyjazdem” w pasku na telefonie (krok 6).
  - Zbierz uwagi: po jednej sprawie naraz, z rekomendacją, co poprawić teraz, a co przenieść do etapu 3.
  - Poprawki idą jako osobne commity: test, który nie przechodzi (gdzie się da), kod, `ALL PASS`, sondy, commit z opisem „Poprawka z punktu kontrolnego 2B: …”.
  - Wynik przeglądu zapisz jednym akapitem w `$TMPDIR/przeglad-2b.txt` (co użytkownik obejrzał, co poprawiono, co przeszło do etapu 3); zadanie 12 wpisze go do `notes/etapy.md`.

---

### Zadanie 12: Notatki: status, następny krok i sposoby sprawdzania

**Pliki:**
- Zmień: `notes/etapy.md`, `CLAUDE.md`

- [ ] **Krok 1: Zmiany w notatkach** (skrypt sprawdzony na kopiach plików z 12.10.2026). Bierze dzisiejszą datę i wynik przeglądu z `$TMPDIR/przeglad-2b.txt` (zadanie 11, krok 8):
  - `notes/etapy.md`:
    - tabela etapów: etap 2 zrobiony, z datami 2A i 2B;
    - w sekcji etapu 2 co zrobił plan 2B, w miejsce zarysu;
    - „Następny krok” to etap 3, partia A: co zrobił plan 2B i wynik punktu kontrolnego; opis planu 2A z uwagami z przeglądu przechodzi pod nagłówek „Z planu 2A”, obok „Z planu 1B”;
    - do etapu 3 dochodzą: dane 2B dla nowych miejsc, Hà Giang jako zamiana motocykla, czas drogi Thọ Xuân–Pù Luông i szerokość najszerszej kwoty;
    - do audytu przed publikacją (etap 4) dochodzą: niepewne punkty researchu 2B, odświeżenie kursu NBP i największych cen, `tools/links.sh`;
  - `CLAUDE.md`: status, sonda `before.js`, `tools/links.sh` i uwaga o narzędziu, które zamienia napis `\u00a0` na znak twardej spacji.

Uruchom z katalogu repo:

```bash
python3 -I - <<'EOF'
# notes after plan 2B, from the repo's folder; each change asserts its old text once. The date is today's, and the result
# of the review comes from $TMPDIR/przeglad-2b.txt (task 11, step 8).
import datetime, os
t = datetime.date.today()
D = '%d.%02d.%d' % (t.day, t.month, t.year)
REVIEW = open(os.path.join(os.environ['TMPDIR'], 'przeglad-2b.txt'), encoding='utf-8').read().strip()
assert REVIEW, 'the review first: task 11, step 8'
e = open('notes/etapy.md', encoding='utf-8').read()
c = open('CLAUDE.md', encoding='utf-8').read()
n = 0
def rep(s, a, b):
    global n
    assert s.count(a) == 1, a[:70]
    n += 1
    return s.replace(a, b)
e = rep(e, '| 2. Interfejs | w toku: 2A (telefon, powody, pogoda, mapa) zrobione 11.10.2026, 2B do zaplanowania |',
  '| 2. Interfejs | zrobione @DZIEN@: 2A (telefon, powody, pogoda, mapa) 11.10.2026, 2B (budżet, „Przed wyjazdem”, motocykl, przejazdy z lotnisk) @DZIEN@ |')
e = rep(e, '''Plan 2B (zarys na końcu planu 2A):
- budżet: przedział w złotych, najdroższe pozycje, wyprzedzenie rezerwacji; koszty pierwowzoru są w EUR i na grudzień, więc z własnym researchem cen;
- „Przed wyjazdem”: rezerwacje według trasy, pakowanie według miesięcy, wjazd;
- zamiany albo–albo w modułach, najpierw samodzielny motocykl;
- przejazdy z lotnisk do Cát Bà, Cát Tiên i delty Mekongu;
- punkt kontrolny etapu 2.''', '''Plan 2B ([plans/2026-10-12-etap-2b-budzet.md](plans/2026-10-12-etap-2b-budzet.md), zrobiony @DZIEN@):
- budżet na osobę w złotych jako szósta liczba trasy, a w nowej sekcji „Przed wyjazdem” z podziałem, kwotą w pojedynkę i największymi pozycjami; ceny w `costs.js` z researchu z 11–12.10.2026, sprawdzane testem z tabelami researchu;
- „Przed wyjazdem”: rezerwacje od najpilniejszej z linkami (`before.js`), wjazd i zdrowie, lista rzeczy do spakowania z klimatu, dni i wydarzeń;
- zamiana „Z kierowcą / Samodzielnie” na motocyklu w Cao Bằng i na przełęczy Hải Vân, z warunkiem prawnym, wymaganiami i ryzykiem;
- własne teksty dalekich dróg z lotnisk i uwagi o promie na Cát Bà i do Cát Tiên;
- poprawki z przeglądu 2A, treść poprawiona po researchu i punkt kontrolny etapu 2.''')
i = e.index('## Następny krok: plan 2B')
j = e.index('**Plan 2B:** najpierw sesja decyzji')
k = e.index('**Do etapu 3 (nowe miejsca):**')
old2a = e[i:j].replace('## Następny krok: plan 2B\n\n', '')
e = e[:i] + '''## Następny krok: etap 3, partia A

Zrobione @DZIEN@: plan 2B ([plans/2026-10-12-etap-2b-budzet.md](plans/2026-10-12-etap-2b-budzet.md)). Strona mówi, ile mniej więcej kosztuje wyjazd: szósta liczba trasy to budżet na osobę w złotych, a sekcja „Przed wyjazdem” na końcu strony ma budżet z podziałem i kwotą w pojedynkę, rezerwacje od najpilniejszej z linkami, wjazd i zdrowie oraz listę rzeczy do spakowania. W karcie Cao Bằng i w karcie przejazdu przez przełęcz Hải Vân jest przełącznik „Z kierowcą / Samodzielnie”. Dalekie drogi z lotnisk mają własne teksty, a karty przejazdu mówią, do której wylądować przed ostatnim promem. Poprawione są też wszystkie uwagi z przeglądu zrzutów 2A.

Punkt kontrolny etapu 2 (@DZIEN@): DECYZJE-Z-PRZEGLADU

**Etap 3, partia A:** najpierw sesja decyzji (po jednym pytaniu, z rekomendacją), potem research i plan z suchą próbą, jak w 2A i 2B. Zakres: „Partia A” w sekcji „Etap 3” wyżej i lista „Do etapu 3” niżej.

''' + e[k:]
e = rep(e, '**Do etapu 3 (nowe miejsca):**\n', '''**Do etapu 3 (nowe miejsca):**
- każde nowe miejsce dostaje też dane z planu 2B: cenę noclegu w `research/ceny-2026-10.md` i w `COSTS.night` (test danych tego pilnuje), płatne części dni jako pozycje `COSTS.items` wskazane polem `cost` w dniach, wpisy w `BOOK` z wyprzedzeniem i linkami, miejsce w `HOMESTAYS`, gdy nocuje się u gospodarzy, i teksty dalekich dróg z lotnisk w `AIR_KEYS`;
- Hà Giang: zamiana motocykla w `SWAPS`, z przeglądem kontroli policji na pętli (`research/motocykl-2026-10.md`);
- droga Thọ Xuân – Pù Luông: w danych 2,5 h, jedno źródło podaje ok. 3 h (`research/lotniska-2026-10.md`); do decyzji przy przeglądzie danych;
- najszerszy budżet (30 dni z Hồ Chí Minh City i z powrotem, przyroda, listopad: 5 800–13 500 zł) mieści się w kafelku; nowe miejsca mogą go poszerzyć, więc po każdej partii sonda `before.js` także przy 901 px;
''')
e = rep(e, '**Do audytu przed publikacją (etap 4):**\n', '''**Do audytu przed publikacją (etap 4):**
- research planu 2B, punkty niepewne i „Do sprawdzenia”: poziom ostrzeżenia MSZ dla Wietnamu (serwis Odyseusz trzeba otworzyć w przeglądarce), stan szlaku na Lang Biang, liczba wyjść do gibonów w Cát Tiên, most przy Cát Tiên, cena Hidden Land (widoczna tylko w wynikach wyszukiwania), autobus z lotniska Cát Bi;
- ceny sprawdzone 11–12.10.2026: przed publikacją odświeżyć kurs NBP w `costs.js` i największe pozycje (rejs, auta, loty), razem z tabelami researchu;
- `bash tools/links.sh`: wszystkie linki rezerwacji i wjazdu odpowiadają 2xx;
''')
e = rep(e, '### Z planu 1B\n', '### Z planu 2A\n\n' + old2a.rstrip('\n') + '\n\nUwagi z przeglądu zrzutów 2A poprawił plan 2B (zadanie 1).\n\n### Z planu 1B\n')
c = rep(c, '**Status (11.10.2026):** etap 2 w toku: plan 2A (telefon, powody, pogoda, mapa) zrobiony. Następny krok: plan 2B (budżet, „Przed wyjazdem”, zamiany albo–albo, przejazdy z lotnisk), zob. [notes/etapy.md](notes/etapy.md).',
  '**Status (@DZIEN@):** etap 2 zrobiony: plany 2A (telefon, powody, pogoda, mapa) i 2B (budżet, „Przed wyjazdem”, motocykl, przejazdy z lotnisk). Następny krok: etap 3, partia A (nowe miejsca), zob. [notes/etapy.md](notes/etapy.md).')
c = rep(c, 'sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`;', 'sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`, `before.js`;')
c = rep(c, '- `python3 -I geo/make_basemap.py', '- `bash tools/links.sh`: linki rezerwacji i wjazdu (`site2/src/before.js`) przez curl, bez zapisywania stron; kod 1, gdy któryś adres nie odpowiada 2xx.\n- `python3 -I geo/make_basemap.py')
c = rep(c, 'więc sprawdza się je ręcznie przez lokalny serwer (plan 2A, zadanie 13).', 'więc sprawdza się je ręcznie przez lokalny serwer (plan 2A, zadanie 13); narzędzie do zapisu plików bywa, że zamienia napis \\u00a0 na sam znak twardej spacji, więc po każdej zmianie kodu grep z „Jak sprawdzać” w planach.')
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
git diff --stat
grep -n "@DZIEN@\|DECYZJE-Z-PRZEGLADU" notes/etapy.md CLAUDE.md
grep -c $'\xc2\xa0' notes/etapy.md CLAUDE.md
```

Oczekiwane: zmienione tylko `notes/etapy.md` i `CLAUDE.md`; drugi grep nic nie wypisuje; trzeci wypisuje `0` przy obu plikach. Przeczytaj `git diff`: akapit przeglądu ma brzmieć dobrze po „Punkt kontrolny etapu 2 (…):”, a linia `notes/raport-tras-RRRR-MM-DD.md` w CLAUDE.md zostaje bez zmian (to wzór nazwy pliku).

- [ ] **Krok 3: Commit**

```bash
git add notes/etapy.md CLAUDE.md
git commit -F - <<'EOF'
Notatki: plan 2B zrobiony i punkt kontrolny etapu 2; następny krok: etap 3, partia A; sposoby sprawdzania (before.js, links.sh)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

`git push` tylko za zgodą użytkownika.

---

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` (co 7. kombinacja); `bash tests/run.sh --full` → wszystkie kombinacje, z budżetem każdej trasy, ok. 45 s.
- `python3 site2/build.py`, potem:
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js` i `before.js` (polecenia w zadaniu 11, krok 2); każda kończy się `done, all checks ok`;
  - `bash tests/shot.sh '<ustawienia>' 390 plik.png [wysokość]`: zrzut; cała strona to ok. 19 500–28 200 px przy 390 px;
  - `bash tests/print.sh '<ustawienia>' plik.pdf [dark]`: wydruk, 0 zakrytych linii;
  - w ustawieniach słowo `MIESIAC` to miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu odpowiadają 2xx (curl, bez zapisywania stron).
- Ręcznie przez lokalny serwer: pasek u góry, „Na górę”, podświetlanie na mapie, odnośnik kwoty i przełącznik z klawiatury (zadanie 11, krok 6).
- Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie wypisuje.
