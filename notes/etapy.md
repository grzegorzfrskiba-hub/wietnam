# Wietnam po swojemu: etapy

Plan prac na podstawie [wizja.md](wizja.md). To dokument żywy: po każdym etapie zaktualizuj status i następny krok. Szczegółowe plany wdrożenia trafiają do `notes/plans/`.

| Etap | Status |
|---|---|
| 0. Wizja | zrobione 9.10.2026 |
| 1. Fundament i silnik na 12 miejscach | zrobione 11.10.2026: 1A (silnik) 10.10.2026, 1B (strona) 11.10.2026; raport tras 1A: [notes/raport-tras-2026-10-09.md](raport-tras-2026-10-09.md) |
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

- panel ustawień pod telefon i właściwe ustawienia domyślne na pierwsze wejście (dziś robocze: Sajgon → Hà Nội, następny miesiąc, 15 dni, bez zainteresowań, poziom 2; `defaultSettings` w `site2/src/page.js`); od planu 1B trasa przelicza się od razu;
- „Wybrane, bo…” przy miejscach trasy i „Nie ma na twojej trasie, bo…” w miejsce grudniowego „Celowo pominięte” (od planu 1B są proste przyciski „Dodaj” i „Usuń” oraz lista „Poza trasą”);
- zamiany albo–albo wewnątrz modułów;
- mapa z nowymi kadrami, od razu z miejscem na partię A: Sa Pa i Hà Giang leżą poza dzisiejszym panelem północy, a Phong Nha w środku kraju. Thọ Xuân leży tuż pod kadrem północy. W pierwowzorze nie ma skryptu `geo/make_basemap.py`, jest tylko jego wynik w `basemap.js`, więc skrypt trzeba napisać od nowa. Do tego paleta kolorów dla nowych miejsc;
- sezon i pogoda dla dni trasy, ostrzeżenia o zamknięciach (o Tết i świętach strona ostrzega od planu 1B);
- budżet: przedział w złotych, najdroższe pozycje, wyprzedzenie rezerwacji. Koszty z pierwowzoru (`pp` i `COSTS` w jego `site2/src/data.js`, źródła w jego `research/budget-2026-10.md`) są w EUR i na grudzień, więc etap 2 robi własny research cen;
- sprawdzenie na szerokości telefonu narzędziami z planu 1B (`shot.sh`, `probe.sh`).

Dalsze punkty etapu 2 (uwagi z przeglądów i rzeczy z planu 1B) są w sekcji „Następny krok”, w liście „Do etapu 2”.

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

## Następny krok: etap 2 (interfejs)

Zrobione 11.10.2026: plan 1B ([plans/2026-10-10-etap-1b-strona.md](plans/2026-10-10-etap-1b-strona.md)), prace 10–11.10.2026. Strona działa na nowym silniku: ustawienia są w linku, a trasa przelicza się od razu. Plany dni zależą od poziomu przygody, łącznie z trudnymi dniami na poziomie 3 (dziś tylko w Cát Tiên i Pù Luông). Strona ostrzega o Tết i świętach państwowych, a przy terminie, który już minął, o tym, że minął. Ma też mapę, przyciski „Dodaj” i „Usuń” (po „Dodaj” mówi, co wypadło z trasy), listę „Poza trasą” i kopiowanie planu z linkiem.

Punkt kontrolny etapu 1 (11.10.2026): przegląd zrzutów pięciu ustawień i strony zbudowanej lokalnie. Decyzje:
- trasy są sensowne, etap 1 zamknięty;
- opis poziomu 3 mówi uczciwie, że trudne dni są tam, gdzie się da, a w pozostałych miejscach dni są jak przy „Aktywnie”;
- link z terminem, który już minął, dalej pokazuje swoją trasę, a pierwsze ostrzeżenie mówi, że termin minął (plan zakładał powrót do terminu domyślnego).

Drobniejsze uwagi z przeglądów planu 1B są w [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md).

**Do etapu 2 (interfejs):**
- komunikat, gdy wybrane zainteresowanie ma na trasie zły sezon, np. morze we wrześniu (raport, trasa 13);
- do obejrzenia po dodaniu nowych miejsc: zygzaki przy trasie tam i z powrotem i przy przylocie do Đà Nẵng (raport, trasy 6, 8 i 11), dzień z dwoma lotami (ok. 9% tras, głównie Phú Quốc ↔ Đà Lạt przez Sajgon), Cát Bà często na 4 noce, Hà Nội trzy razy na 30-dniowej trasie z Hà Nội. Przykład zygzaka: `#od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1` (Hội An, lot do Hà Nội, lot do Huế, potem na południe);
- sekcja „Przed wyjazdem” (rezerwacje, pakowanie): przebudować pod dowolny termin i bez konkretnych lotów z pierwowzoru;
- etykiety na mapie nachodzą na siebie przy dłuższych trasach, głównie na południu (w próbce ok. 40% tras), a etykieta Hà Nội chowa się pod znacznikiem z kilkoma numerami; nowe kadry mapy w etapie 2 dostaną rozmieszczanie etykiet;
- wydarzenia przypięte do miesięcy, np. złote tarasy w Pù Luông (dwa okna rocznie: koniec maja–połowa czerwca i koniec września–początek października; zob. `research/sezony-2026-10.md`, „Do planów dni i zdarzeń”);
- plan na deszcz zależny od miesiąca;
- przejazdy między lotniskiem a Cát Bà, Cát Tiên i deltą Mekongu strona opisuje tylko jako taksówkę albo transfer z lotniska lub na lotnisko, bez promu i autobusu; do opisania przy researchu przejazdów (dotyczy wielu tras);
- uwagi o wyglądzie ze zrzutów:
  - liczba i jednostka rozdzielone na końcu wiersza („≈ 4 / godz.”, „12 / km”): wiązać twardą spacją;
  - na telefonie rząd liczb trasy łamie „5½ godz.” na dwa wiersze, a piąta komórka („najdłuższy dzień w drodze”) ma cztery wiersze;
  - data pod numerem dnia łamie się na komputerze („czw., 28 / sty”);
  - w kroju Be Vietnam Pro „ą” przy skali 1x wygląda jak „q” (na ekranach 2x jest dobrze); sprawdzić przy wyborze kroju.

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

**Do etapu 3 (nowe miejsca):**
- włączyć testy, które dziś nie mają czego łapać, bo wszystkie miejsca mają poziom 1, a w sezonach nie ma X: niezależne przeliczenie sezonu każdej nocy, przegląd trybu dat, lista znanych lotnisk w danych i wymóg, żeby każde miejsce trafiło na jakąś trasę;
- dwie drogi po korekcie silnik omija przez Hà Nội: lotnisko Hà Nội – Pù Luông (5,25 h w danych, efektywnie 5 h) i Ninh Bình – Cao Bằng (9,25 h w danych, efektywnie 8,5 h). Do decyzji przy przeglądzie danych: zostawić albo poprawić drogi przez Hà Nội;
- nowe miejsca dostają trudne dni według zasad z [research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md) (dziś trudny dzień mają tylko Cát Tiên i Pù Luông);
- Cát Bà: sprawdzić jeszcze raz trudny dzień (licencje operatorów i legalność deep-water soloingu); dziś Cát Bà celowo go nie ma;
- etykiety mapy (`NLAB`, `CLAB` w `site2/src/app.js`) i kolory w szablonie (`site2/src/template.html`).

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

**Do audytu przed publikacją (etap 4):**
- research połączeń: robocze dopiski, odwołania do audytu pierwowzoru (dokument spoza repo), twierdzenie bez źródła o autostradzie przed Tết 2027, nazwa firmy z imieniem;
- research sezonów: tabelę zmian i „połówki” opisać jako historię metody, usunąć robocze dopiski;
- źródła faktów w planach dni przeniesionych z pierwowzoru bez zmian są w jego audycie z 9.10.2026 (`notes/audyt-2026-10-09.md` w pierwowzorze), trzeba je przenieść do `research/`;
- przy publikacji sprawdzić licencje nowych zdjęć: `hoian_4` i `hoian_5` (`hue_6` to zdjęcie z pierwowzoru pod nową nazwą);
- lista „Do sprawdzenia przed publikacją” w [research/plany-dni-2026-10.md](../research/plany-dni-2026-10.md): m.in. wznowienie szlaku na Lang Biang, godziny Đại Nội, ceny w Cát Tiên, bilety w Hội An;
- robocze oznaczenia z procesu planu 1B w researchu (numery zadań i przeglądów, ok. 30 linii w `research/plany-dni-2026-10.md` i `research/trudne-dni-2026-10.md`) zastąpić opisem źródła albo usunąć;
- wydruk: mapy drukują się małe (ok. 220 px) z pustym miejscem obok, a w środku stron zostają puste pasy; do decyzji o formacie wersji offline.

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

### Z planu 1A

Zrobione 10.10.2026: plan 1A ([plans/2026-10-09-etap-1a-silnik.md](plans/2026-10-09-etap-1a-silnik.md)). Silnik tras, dane 12 miejsc (14 pozycji: Hội An i Huế osobno, noc w Hà Nội w drodze), research połączeń i sezonów, test wszystkich 134 784 kombinacji i [raport tras](raport-tras-2026-10-09.md). Zmiany względem tekstu planu są w aneksie na końcu planu.

Decyzje z punktu kontrolnego 1A (10.10.2026):
- model tras zostaje;
- noc w złym sezonie (Z) jest warta 0,2 zamiast 0,35;
- dzień przylotu i wylotu: najwyżej 4 h drogą, bez zmian;
- Huế co najmniej 2 noce, reszta ocen i nocy bez zmian;
- sezony z researchu przyjęte, z jednym zestawem progów dla wszystkich miejsc;
- cztery czasy przejazdu podniesione do typowych (Cát Tiên, Pù Luông–Ninh Bình, Ninh Bình–Cao Bằng, lotnisko Hà Nội–Pù Luông), a z nimi szacunek Pù Luông–Cát Bà 7,5 h.

Uwagi z przeglądu 1A, które dotyczyły strony, uwzględnił plan 1B: typy w parserze linku, pole roku w trybie miesiąca, „Nie zmieściło się”, noc w Hà Nội w drodze, wybór wariantów dni według poziomu, plany dni Pù Luông i Bản Giốc, odwołania w researchu sezonów, kontrola listy testów oraz typy lotnisk i dat z linku.
