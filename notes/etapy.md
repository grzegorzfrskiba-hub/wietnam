# Wietnam po swojemu: etapy

Plan prac na podstawie [wizja.md](wizja.md). To dokument żywy: po każdym etapie zaktualizuj status i następny krok. Szczegółowe plany wdrożenia trafiają do `notes/plans/`.

| Etap | Status |
|---|---|
| 0. Wizja | zrobione 9.10.2026 |
| 1. Fundament i silnik na 12 miejscach | w toku: 1A (silnik) zrobione 10.10.2026, raport: [notes/raport-tras-2026-10-09.md](raport-tras-2026-10-09.md); dalej plan 1B (strona) |
| 2. Interfejs | |
| 3. Nowe miejsca, partiami | |
| 4. Audyt i publikacja (po partii A) | |

## Etap 1: fundament i silnik na 12 dzisiejszych miejscach

**Cel:** dowolny termin i zestaw ustawień dają sensowną trasę z 12 miejsc pierwowzoru, a test wszystkich kombinacji to potwierdza.

- **Prototyp silnika jako pierwsze zadanie.** Sprawdza na 12 miejscach oś z odnogami i powrót na to samo lotnisko. Model modułu zamrażamy dopiero po nim.
- **Kopia z pierwowzoru:** `site2/`, `tests/`, `site2/build.py`. Pierwowzór zostaje nietknięty.
- **Polski jako baza:**
  - treść z `I18N_PL` przechodzi do danych;
  - EN i DE znikają;
  - mechanizm kluczy i test kompletności zostają.
- **Model modułu** (zob. wizja) i przepisanie 12 miejsc na moduły:
  - teksty neutralne wobec miesiąca;
  - warianty dni według poziomu, z dzisiejszą wersją łagodną jako punktem wyjścia.
- **Research do `research/`:**
  - sezon 12 miejsc × 12 miesięcy: ocena, powód, temperatura, opady;
  - zamknięcia;
  - Tết i święta na lata 2027–2030.
- **Zdjęcia 12 miejsc:** kopia ze sprawdzeniem licencji w `photos/meta.json`. Brakujące uzupełniamy.
- **Silnik:**
  - daty albo miesiąc z długością (5–30 dni);
  - lotniska HCMC, Hà Nội, Đà Nẵng w dowolnym układzie;
  - 0–2 zainteresowania i 3 poziomy;
  - moduły wymuszone i wykluczone;
  - ten sam wynik dla tych samych ustawień.
- **Prosty pasek ustawień,** żeby zobaczyć trasę w przeglądarce, i rozszerzony link z ustawieniami.
- **Testy:** wszystkie kombinacje, przypadki dat, twarde reguły z wizji.

**Punkt kontrolny:** `bash tests/run.sh` kończy się `ALL PASS`, a lokalnie zbudowana strona daje sensowne trasy dla kilku ręcznie sprawdzonych ustawień.

## Etap 2: interfejs

**Cel:** pełne doświadczenie na 12 miejscach, wygodne na telefonie.

- panel ustawień pod telefon i ustawienia domyślne na pierwsze wejście, trasa przelicza się od razu;
- „Wybrane, bo…”, „Nie ma na twojej trasie, bo…”, przyciski „Dodaj” i „Usuń”;
- zamiany albo–albo wewnątrz modułów;
- mapa z nowymi kadrami, od razu z miejscem na partię A: Sa Pa i Hà Giang leżą poza dzisiejszym panelem północy, a Phong Nha w środku kraju. W pierwowzorze nie ma skryptu `geo/make_basemap.py`, jest tylko jego wynik w `basemap.js`, więc skrypt trzeba napisać od nowa;
- sezon i pogoda dla dni trasy, ostrzeżenia o Tết, świętach i zamknięciach;
- budżet: przedział w złotych, najdroższe pozycje, wyprzedzenie rezerwacji;
- kopiowanie planu i link;
- sprawdzenie na szerokości telefonu (`shot.sh`, `probe.sh`).

**Punkt kontrolny:** zrzuty z telefonu dla kilku profili i terminów wyglądają dobrze, a test wszystkich kombinacji dalej przechodzi.

## Etap 3: nowe miejsca, partiami

Każde nowe miejsce dostaje:
- research ze źródłami i datą;
- 3–5 zdjęć na licencji komercyjnej;
- dni w wariantach poziomu i, gdzie trzeba, na deszcz;
- sezon na 12 miesięcy;
- koszty i wyprzedzenie rezerwacji;
- zasady bezpieczeństwa.

Każda partia kończy się pełnym testem kombinacji.

- **Partia A, najważniejsza dla przygodowych:**
  - Phong Nha: łatwe jaskinie, Hang Én, Tú Làn;
  - Cúc Phương z Vân Long: naczelne;
  - Đà Nẵng z Sơn Trà: red-shanked douc;
  - Hà Giang: pętla z kierowcą albo samodzielnie, z researchem przepisów o motocyklach;
  - Sa Pa z Fansipan.
- **Partia B:** Bạch Mã, Pù Mát, Yok Đôn, Tà Năng–Phan Dũng, Mù Cang Chải, Mỹ Sơn (np. jako dzień w module Hội An).
- **Kolejne partie** według potrzeb, np. morze (Côn Đảo).

## Etap 4: audyt i publikacja (po partii A)

- audyt jak 9.10 w pierwowzorze: kombinacje, treść, linki, telefon;
- wersja offline: PDF z wydruku i lekki plik offline, z decyzją o formacie;
- przełączenie repo `wietnam` na publiczne, README z „©”, GitHub Pages pod https://grzegorzfrskiba-hub.github.io/wietnam/;
- pierwsze linki dla znajomych.

Wysłanie na GitHuba i publikacja tylko za zgodą. Partia B i kolejne dochodzą później na żywej stronie, każda z pełnym testem.

## Następny krok: plan 1B, strona na nowym silniku

Zrobione 10.10.2026: plan 1A ([plans/2026-10-09-etap-1a-silnik.md](plans/2026-10-09-etap-1a-silnik.md)). Silnik tras, dane 12 miejsc (14 pozycji: Hội An i Huế osobno, noc w Hà Nội w drodze), research połączeń i sezonów, test wszystkich 134 784 kombinacji i [raport tras](raport-tras-2026-10-09.md). Zmiany względem tekstu planu są w aneksie na końcu planu.

Decyzje z punktu kontrolnego (10.10.2026):
- model tras zostaje;
- noc w złym sezonie (Z) jest warta 0,2 zamiast 0,35;
- dzień przylotu i wylotu: najwyżej 4 h drogą, bez zmian;
- Huế co najmniej 2 noce, reszta ocen i nocy bez zmian;
- sezony z researchu przyjęte, z jednym zestawem progów dla wszystkich miejsc;
- cztery czasy przejazdu podniesione do typowych (Cát Tiên, Pù Luông–Ninh Bình, Ninh Bình–Cao Bằng, lotnisko Hà Nội–Pù Luông), a z nimi szacunek Pù Luông–Cát Bà 7,5 h.

Plan 1B (strona) powstanie teraz; zarys jest na końcu planu 1A. Uwagi z przeglądu, które dotyczą strony:
- **Link z ustawieniami:** parser podaje silnikowi liczby (miesiąc, długość, poziom) i listy (zainteresowania, Dodaj, Usuń); inne typy silnik odrzuca błędem.
- **Termin w trybie miesiąca:** wizja chce miesiąca z rokiem (ostrzeżenie o Tết), a silnik nie ma jeszcze pola roku; dodać je w planie 1B.
- **„Nie zmieściło się” i „Nie ma na twojej trasie, bo…”:** silnik podaje tylko listę brakujących miejsc, powód liczy strona.
- **Noc w Hà Nội w drodze** nie jest pozycją do „Dodaj” i „Usuń” na stronie; „Usuń Hà Nội” usuwa też ją.
- **Poziom przygody:** wszystkie 12 miejsc ma poziom 1, więc na razie poziom wybiera tylko warianty dni. Miejsca od poziomu 2 i 3 dojdą w etapie 3.
- **Plany dni:** złote tarasy w Pù Luông to dwa okna, koniec maja–połowa czerwca i koniec września–początek października. Woda na Bản Giốc w suche lata płynie głównie ok. 11:00–14:30, a plan dnia w pierwowzorze mówi o późnym popołudniu.
- **Research sezonów:** po przeniesieniu planów dni do repo wskazać je zamiast plików pierwowzoru; ustalenie o Tà Năng podać z własnym źródłem.
- **Lista testów:** `tests/run.sh` nie zauważy nowego pliku testu, którego nie dopisano do jego listy. Każdy nowy test dopisać do listy albo dodać sprawdzenie, że lista obejmuje wszystkie `tests/*.test.js`.
- **Lotniska i daty z linku:** `from`, `to`, `start` i `end` nie mają jeszcze kontroli typu w silniku. Parser linku podaje je jako tekst.

Do etapu 2 (interfejs):
- komunikat, gdy wybrane zainteresowanie ma na trasie zły sezon, np. morze we wrześniu (raport, trasa 13);
- do obejrzenia po dodaniu nowych miejsc: zygzaki przy trasie tam i z powrotem i przy przylocie do Đà Nẵng (raport, trasy 6, 8 i 11), dzień z dwoma lotami (ok. 9% tras, głównie Phú Quốc ↔ Đà Lạt przez Sajgon), Cát Bà często na 4 noce, Hà Nội trzy razy na 30-dniowej trasie z Hà Nội.

Do etapu 3 (nowe miejsca):
- włączyć testy, które dziś nie mają czego łapać, bo wszystkie miejsca mają poziom 1, a w sezonach nie ma X: niezależne przeliczenie sezonu każdej nocy, przegląd trybu dat, lista znanych lotnisk w danych i wymóg, żeby każde miejsce trafiło na jakąś trasę;
- dwie drogi po korekcie silnik omija przez Hà Nội: lotnisko Hà Nội – Pù Luông (5,25 h w danych, efektywnie 5 h) i Ninh Bình – Cao Bằng (9,25 h w danych, efektywnie 8,5 h). Do decyzji przy przeglądzie danych: zostawić albo poprawić drogi przez Hà Nội.

Do audytu przed publikacją (etap 4):
- research połączeń: robocze dopiski, odwołania do audytu pierwowzoru (dokument spoza repo), twierdzenie bez źródła o autostradzie przed Tết 2027, nazwa firmy z imieniem;
- research sezonów: tabelę zmian i „połówki” opisać jako historię metody, usunąć robocze dopiski.
