# Wietnam po swojemu: etapy

Plan prac na podstawie [wizja.md](wizja.md). To dokument żywy: po każdym etapie zaktualizuj status i następny krok. Szczegółowe plany wdrożenia trafiają do `notes/plans/`.

| Etap | Status |
|---|---|
| 0. Wizja | zrobione 9.10.2026 |
| 1. Fundament i silnik na 12 miejscach | zrobione 11.10.2026: 1A (silnik) 10.10.2026, 1B (strona) 11.10.2026; raport tras 1A: [notes/raport-tras-2026-10-09.md](raport-tras-2026-10-09.md) |
| 2. Interfejs | zrobione 12.10.2026: 2A (telefon, powody, pogoda, mapa) 11.10.2026, 2B (budżet, „Przed wyjazdem”, motocykl, przejazdy z lotnisk) 12.10.2026 |
| 3. Nowe miejsca, partiami | w toku: partia A, plan 1 (Phong Nha, Cúc Phương, Đà Nẵng) zrobiony 13.10.2026, raport tras: [notes/raport-tras-2026-10-13.md](raport-tras-2026-10-13.md); plan 2 (Hà Giang, Sa Pa) do zaplanowania |
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

Plan 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md), zrobiony 11.10.2026):
- formularz na górze strony, a po przewinięciu pasek z podsumowaniem i „Zmień”; na pierwsze wejście najlepszy miesiąc z 12 następnych;
- „Wybrane, bo…”, „Nie ma na twojej trasie, bo…” i zapowiedź przy „Dodaj”;
- pogoda w karcie miejsca, plan na deszcz zależny od miesiąca, wydarzenia i uwagi sezonowe, ostrzeżenie o złym sezonie zainteresowania;
- mapa w trzech kadrach: kontury ze skryptu `geo/make_basemap.py`, rozmieszczanie etykiet i paleta 20 kolorów;
- krój IBM Plex Sans, twarde spacje, uwagi z przeglądów planu 1B i sondy, które sprawdzają.

Plan 2B ([plans/2026-10-12-etap-2b-budzet.md](plans/2026-10-12-etap-2b-budzet.md), zrobiony 12.10.2026):
- budżet na osobę w złotych jako szósta liczba trasy, a w nowej sekcji „Przed wyjazdem” z podziałem, kwotą w pojedynkę i największymi pozycjami; ceny w `costs.js` z researchu z 11–12.10.2026, sprawdzane testem z tabelami researchu;
- „Przed wyjazdem”: rezerwacje od najpilniejszej z linkami (`before.js`), wjazd i zdrowie, lista rzeczy do spakowania z klimatu, dni i wydarzeń;
- zamiana „Z kierowcą / Samodzielnie” na motocyklu w Cao Bằng i na przełęczy Hải Vân, z warunkiem prawnym, wymaganiami i ryzykiem;
- własne teksty dalekich dróg z lotnisk i uwagi o promie na Cát Bà i do Cát Tiên;
- poprawki z przeglądu 2A, treść poprawiona po researchu i punkt kontrolny etapu 2.

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

- **Partia A, najważniejsza dla przygodowych,** w dwóch planach (sesja decyzji 13.10.2026):
  - plan 1 ([plans/2026-10-13-etap-3a1-miejsca.md](plans/2026-10-13-etap-3a1-miejsca.md), zrobiony 13.10.2026):
    - Phong Nha: łatwe jaskinie, 7 km w Paradise Cave i Tú Làn na jeden dzień, a na „Ekstremalnie” Hang Én na dwa dni;
    - Cúc Phương: naczelne, żółwie i stary las, nocleg w parku (Vân Long zostaje w Ninh Bình);
    - Đà Nẵng z Sơn Trà: duki czerwononogie z dróg półwyspu, plaża Mỹ Khê, Marmurowe Góry;
  - plan 2: Hà Giang (pętla z kierowcą albo samodzielnie, z researchem przepisów o motocyklach) i Sa Pa z Fansipanem.
- **Partia B:** Bạch Mã, Pù Mát, Yok Đôn, Tà Năng–Phan Dũng, Mù Cang Chải, Mỹ Sơn (np. jako dzień w module Hội An).
- **Kolejne partie** według potrzeb, np. morze (Côn Đảo).

## Etap 4: audyt i publikacja (po partii A)

- audyt jak 9.10 w pierwowzorze: kombinacje, treść, linki, telefon;
- przegląd [wizja.md](wizja.md) z tym, co jest na stronie: „Kryteria sukcesu”, „Jak działa strona”, „Poza zakresem” i decyzje (budżet, „Przed wyjazdem”, przełącznik motocykla doszły po 9.10.2026). Rozbieżności poprawić w wizji, z datą aktualizacji. Osobnego PRD nie ma i nie piszemy go: jego rolę pełni wizja;
- wersja offline: PDF z wydruku i lekki plik offline, z decyzją o formacie;
- przełączenie repo `wietnam` na publiczne, README z „©”, GitHub Pages pod https://grzegorzfrskiba-hub.github.io/wietnam/;
- pierwsze linki dla znajomych.

Wysłanie na GitHuba i publikacja tylko za zgodą. Partia B i kolejne dochodzą później na żywej stronie, każda z pełnym testem.

## Następny krok: etap 3, partia A, plan 2

Zrobione 13.10.2026: plan 1 partii A ([plans/2026-10-13-etap-3a1-miejsca.md](plans/2026-10-13-etap-3a1-miejsca.md)). Na stronie są trzy nowe miejsca, każde z treścią na trzech poziomach, sezonem, klimatem, drogami, cenami, rezerwacjami i zdjęciami, a research każdego stoi we własnym pliku (`research/<id>-2026-10.md`), którego tabele czyta test danych: Phong Nha z lotniskiem Đồng Hới i wyprawą do Hang Én na dwa dni, Cúc Phương z nocną przejażdżką i Mây Bạc, Đà Nẵng z Sơn Trà i przełęczą Hải Vân także od strony Đà Nẵng. Silnik umie trudną wersję na dwa dni (`hard.next`) i stawia miejsce bliskie miastu lotniska tuż przy nim (`NEAR_H`), a zamiany jadą po liście dróg (`SWAPS.roads`). Testy łapią to, czego wcześniej nie miały czym łapać: sezon każdej nocy, tryb dat, znane lotniska, każde miejsce na jakiejś trasie, rezerwacje, pakowanie i wjazd każdej trasy, bliskie miejsca obok siebie. Kadry mapy są wyższe (środek od 18,4° N, północ do 19,3° N), a etykieta pobytu w ciasnym miejscu skraca się do nazwy. Zrobione są też punkty listy „Do etapu 3”, które nie czekały na Hà Giang i Sa Pa.

Punkt kontrolny planu 1 (13.10.2026): pełny test (134 784 kombinacje miesięcy i 10 368 dat, ok. 75 s), 14 sond (także dla kwietnia i maja 2027), 46 linków z kodem 200 i wydruk trzech tras w obu motywach (22, 14 i 14 stron, 0 zakrytych linii) przeszły; ręcznie w przeglądarce działają pasek u góry (trzy odnośniki w całości od 320 px), „Na górę”, podświetlanie na mapie, powiększenie mapy z Escape i przełącznik Hải Vân z klawiatury, a na prawdziwym telefonie w domowej sieci Wi-Fi pasek, powiększenie mapy, dwa dni Hang Én, link Oxalis z „Zarezerwuj wcześniej”, „Na górę”, przełącznik Hải Vân dotykiem i „Kopiuj plan na WhatsApp” z linią budżetu (przez zwykłe http przycisk pokazuje zapasowe pole z zaznaczonym tekstem, bo schowek działa tylko na stronie https; do sprawdzenia na opublikowanej stronie w etapie 4). Obejrzane razem: zrzuty sześciu tras (liczby trasy z „7½ godz.”, mapa z wyższymi kadrami, Mây Bạc i dwa dni Hang Én, przełęcz od strony Đà Nẵng, Sơn Trà ze zdaniem o zamykaniu dróg, Đà Nẵng na jedną noc, zygzak, najwyższa kwota 7 500–14 700 zł w kafelku) i liczby ze wszystkich 134 784 tras przed planem 1 i po nim. Poprawione od razu: ocena przyrody Đà Nẵng 1 zamiast 2 (research, `places.js` i test danych, który porównuje oceny miejsc etapu 3 z ich researchem), bo Đà Nẵng był na 50% tras z przyrodą, tak często jak parki narodowe, i na 54% tras bez zainteresowań; po zmianie jest na 34% wszystkich tras, 41% tras bez zainteresowań i ok. 30% tras z przyrodą. Liczby po poprawce: Phong Nha na 35,9% tras, Cúc Phương na 25,1%, dzień z dwoma lotami na 12,4% tras (przed planem 1 8,6%), Cát Bà na 4 noce w 73,7% pobytów (77,9%), Hà Nội trzy razy na 435 trasach (1257), bliskie miejsca nie obok siebie na 0 trasach. Zostają bez zmian dni z dwoma lotami: nowa para Đà Lạt ↔ Đồng Hới przez Hồ Chí Minh City (ok. 6% tras, 7½ h od drzwi do drzwi, z ostrzeżeniem „Długi dzień w drodze”) to najkrótsze połączenie, bo bezpośredniego lotu nie ma. Do planu 2 przeszły: Cao Bằng i Ba Bể na ok. 6% tras (przed planem 1 ok. 12%), do sprawdzenia po pętli północy Sa Pa → Hà Giang → Cao Bằng → Ba Bể; zygzak w silniku, taki sam jak przed planem 1 (`#od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1`: Hội An, lot do Hà Nội, lot z powrotem do Huế; podobne zygzaki wokół Hội An i Huế są na ok. 3,8% tras), do poprawy z testem na tej trasie i z przeglądem liczb; znaczniki Cúc Phương i Ninh Bình nachodzą na siebie na mapie (punkty 12 px od siebie, znacznik ma 20 px, ok. 22% tras), do rozsuwania znaczników w kadrze z testem w `tests/page.test.js` i kontrolą w sondzie `map.js`.

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

**Do etapu 3 (nowe miejsca):**
- każde nowe miejsce dostaje też dane z planu 2B: cenę noclegu w `COSTS.night`, płatne części dni jako pozycje `COSTS.items` wskazane polem `cost` w dniach, wpisy w `BOOK` z wyprzedzeniem i linkami, miejsce w `HOMESTAYS`, gdy nocuje się u gospodarzy, i teksty dalekich dróg z lotnisk w `AIR_KEYS`; liczby stoją w tabelach „Zestawienie” pliku researchu miejsca (`research/<id>-2026-10.md`), a test danych czyta je stamtąd;
- Hà Giang: zamiana motocykla w `SWAPS`, z przeglądem kontroli policji na pętli (`research/motocykl-2026-10.md`, `research/hagiang-2026-10.md`);
- najszersza kwota budżetu ma postać „d ddd–dd ddd zł” (najwyższa po planie 1: 7 500–14 700 zł, 30 dni z Đà Nẵng do Hồ Chí Minh City, przyroda, „Ekstremalnie”, grudzień, z Hang Én); cyfry kroju mają jedną szerokość, więc kafelek mieści każdą kwotę tej postaci, ale kwota z pięcioma cyframi na obu końcach byłaby szersza: po każdej partii sonda `before.js` przy 641, 768 i 901 px;
- nowe miejsca dostają trudne dni według zasad z [research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md) (dziś trudny dzień mają Cát Tiên, Pù Luông, Phong Nha i Cúc Phương); wyprawa na dwa dni to trudna wersja z polem `next`;
- każde nowe miejsce dostaje numer koloru (`color` w treści) i musi leżeć w kadrze mapy (`site2/src/panels.js`). Paleta ma 20 kolorów, a zajętych jest 16; partie A i B dają razem 24 miejsca, więc przed partią B paletę trzeba rozszerzyć. Pù Mát (partia B) leży poza kadrami: trzeba przesunąć kadr i wygenerować kontury od nowa (`geo/make_basemap.py`);
- wielowyrazowe nazwy z nowych tekstów bez wietnamskich liter (jak Lang Biang, Paradise Cave) dopisać do `KEEP_TOGETHER` w `site2/src/content.js`; nazwy z takimi literami wiąże reguła `tieVietnamese`, a krótkie nazwy miejsc strona wiąże sama. Sonda `changes.js` łapie tylko nazwy z literą wietnamską, więc nazwy bez niej trzeba wypatrzyć samemu;
- przed dodaniem czwartego kadru: `site2/src/basemap.js` do testów (`SOURCES` w `tests/run.sh`) i test, że `BASEMAP` ma kontury każdego kadru z `MAP_PANELS`; bez nowych konturów strona by się wywróciła;
- po planie 2 obejrzeć jeszcze raz, jak w punkcie kontrolnym planu 1: na ilu trasach jest każde miejsce, dni z dwoma lotami, Cát Bà na 4 noce, Hà Nội trzy razy na jednej trasie i bliskie miejsca obok siebie.

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

**Do audytu przed publikacją (etap 4):**
- research planu 1 partii A: punkty „Nie ustaliłem” i „Do sprawdzenia” w `research/phongnha-2026-10.md`, `research/cucphuong-2026-10.md` i `research/danang-2026-10.md`, a tuż przed publikacją komunikaty parków: drogi na Sơn Trà zamknięte od 8.10.2026 „do odwołania”, w Cúc Phương wstrzymane noclegi w lesie (od 16.09.2026) i zakaz wchodzenia w głąb lasu między 19:00 a 7:00 (od 1.09.2026), terminy wypraw Oxalis do Hang Én i Tú Làn;
- licencje i autorzy 15 nowych zdjęć (`phongnha_0`–`4`, `cucphuong_0`–`4`, `danang_0`–`4`), razem z resztą przy publikacji;
- research planu 2B, punkty niepewne i „Do sprawdzenia”: poziom ostrzeżenia MSZ dla Wietnamu (serwis Odyseusz trzeba otworzyć w przeglądarce), stan szlaku na Lang Biang, liczba wyjść do gibonów w Cát Tiên, most przy Cát Tiên, cena Hidden Land (widoczna tylko w wynikach wyszukiwania), autobus z lotniska Cát Bi;
- ceny sprawdzone 11–12.10.2026: przed publikacją odświeżyć kurs NBP w `costs.js` i największe pozycje (rejs, auta, loty), razem z tabelami researchu; data cen i kursu w `bud.note` (`site2/src/ui.js`) jest wpisana na sztywno, `COSTS_CHECKED` nie jest nigdzie użyte, a test danych sprawdza `EUR_PLN === 4.3775` zamiast wiersza NBP w researchu: poprawić wszystkie trzy naraz albo połączyć je w jedno źródło;
- wjazd: w trybie miesiąca wyjazd w lipcu 2028 na 30 dni nie dostaje zdania „Sprawdź aktualne zasady wjazdu”, bo koniec terminu liczy się jako koniec miesiąca, choć taki wyjazd może skończyć się po 14.08.2028 (linia o wizie podaje tę datę zawsze);
- `bash tools/links.sh`: wszystkie linki rezerwacji i wjazdu odpowiadają 2xx;
- research połączeń: robocze dopiski, odwołania do audytu pierwowzoru (dokument spoza repo), twierdzenie bez źródła o autostradzie przed Tết 2027, nazwa firmy z imieniem;
- research sezonów: tabelę zmian i „połówki” opisać jako historię metody, usunąć robocze dopiski;
- źródła faktów w planach dni przeniesionych z pierwowzoru bez zmian są w jego audycie z 9.10.2026 (`notes/audyt-2026-10-09.md` w pierwowzorze), trzeba je przenieść do `research/`;
- przy publikacji sprawdzić licencje nowych zdjęć: `hoian_4` i `hoian_5` (wymienione w planie 2A na ulicę Trần Phú i plażę An Bàng; `hue_6` to zdjęcie z pierwowzoru pod nową nazwą);
- lista „Do sprawdzenia przed publikacją” w [research/plany-dni-2026-10.md](../research/plany-dni-2026-10.md): m.in. wznowienie szlaku na Lang Biang, godziny Đại Nội, ceny w Cát Tiên, bilety w Hội An;
- robocze oznaczenia z procesu planu 1B w researchu (numery zadań i przeglądów, ok. 30 linii w `research/plany-dni-2026-10.md` i `research/trudne-dni-2026-10.md`) zastąpić opisem źródła albo usunąć;
- wydruk: mapy drukują się małe (ok. 220 px) z pustym miejscem obok, a w środku stron zostają puste pasy; do decyzji o formacie wersji offline;
- plik offline bez internetu dostaje krój zastępczy, więc etykiety mapy mogą się w nim zetknąć; rozstrzygnąć razem z czcionkami na własnym hostingu;
- źródło konturów mapy (Natural Earth, domena publiczna) w stopce albo w README.

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

### Z planu 2B

Zrobione 12.10.2026: plan 2B ([plans/2026-10-12-etap-2b-budzet.md](plans/2026-10-12-etap-2b-budzet.md)). Strona mówi, ile mniej więcej kosztuje wyjazd: szósta liczba trasy to budżet na osobę w złotych, a sekcja „Przed wyjazdem” na końcu strony ma budżet z podziałem i kwotą w pojedynkę, rezerwacje od najpilniejszej z linkami, wjazd i zdrowie oraz listę rzeczy do spakowania. W karcie Cao Bằng i w karcie przejazdu przez przełęcz Hải Vân jest przełącznik „Z kierowcą / Samodzielnie”. Dalekie drogi z lotnisk mają własne teksty, a karty przejazdu mówią, do której wylądować przed ostatnim promem. Poprawione są też wszystkie uwagi z przeglądu zrzutów 2A.

Punkt kontrolny etapu 2 (12.10.2026): pełny test (134 784 kombinacje), 12 sond, 34 linki z kodem 200 i wydruk czterech tras w obu motywach (0 zakrytych linii) przeszły; ręcznie w przeglądarce działają pasek u góry, „Na górę”, podświetlanie na mapie, odnośnik kwoty i przełącznik z klawiatury, a na prawdziwym telefonie w domowej sieci Wi-Fi kwota i stuknięcie w nią, sekcja „Przed wyjazdem”, przełącznik dotykiem, link rezerwacji i „Kopiuj plan na WhatsApp” z linią budżetu. Po obejrzeniu zrzutów sześciu tras (kwota w „W skrócie”, sekcja „Przed wyjazdem”, Cao Bằng na motocyklu, promy, najszersza kwota, Tết) wybrano dwie poprawki, zrobione od razu: zakresy liczb („1–3 dni”, „140–260 zł”, „11:00–14:30”) nie łamią się po półpauzie, a na telefonie tekst drogi w karcie przejazdu ma całą szerokość karty, z czasem jazdy pod nim. Do etapu 3 przeszły: ucięty odnośnik „Przed wyjazdem” w pasku na telefonie (działa przez przesunięcie paska w bok; ścisnąć pasek albo skrócić nazwy) i zbyt ogólne zdania w „Zarezerwuj wcześniej” (dopisek o Pù Luông w linii noclegów u gospodarzy także bez Pù Luông na trasie, trzy rzeczy naraz w linii parku Cát Tiên). Ostatnia strona wydruku niektórych tras, z samą stopką, zostaje bez zmian.

Końcowy przegląd 2B (13.10.2026, świeży recenzent): poprawione trzy rzeczy: między 641 a 900 px (tablet w pionie) kwota stoi we własnym wierszu pod pięcioma liczbami trasy, bo wcześniej wystawała z kafelka (przy 641–700 px wystawało też „9 godz.”); kwota o równych końcach stoi jako jedna liczba („30 zł”, „ok. 70 zł na osobę” zamiast „30–30 zł”); przełącznik motocykla przy formularzu, z którego nie wychodzi trasa, wraca na poprzedni wybór, a komunikat stoi też w karcie, jak przy „Dodaj”. Wszystko to sprawdza sonda `before.js`, także przy 641 i 768 px. Drobniejsze uwagi recenzenta są w listach wyżej, w „Następny krok”.

### Z planu 2A

Zrobione 11.10.2026: plan 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md)). Strona jest wygodna na telefonie i tłumaczy swoją trasę. Formularz stoi na górze, a po przewinięciu pasek u góry pokazuje podsumowanie i „Zmień”. Przy każdym miejscu jest „Wybrane, bo…”, pogoda w miesiącu pobytu i wydarzenia, a pod trasą „Nie ma na twojej trasie, bo…” z zapowiedzią przy „Dodaj”. Mapa ma trzy kadry, a jej etykiety nie nachodzą na siebie.

Przegląd zrzutów 2A (11.10.2026): poprawione od razu trzy rzeczy: na telefonie podpis zdjęcia nie dotyka przycisku „Zobacz trasę”, w pogodzie liczba dni z deszczem nie zostaje sama na końcu linii, a wielowyrazowe nazwy wietnamskie w opisach dni (Thảo Điền, Chợ Lớn, Hà Tôn Quyền) nie łamią się w środku: wiąże je reguła `tieVietnamese` w `site2/src/page.js`, a nazwy bez wietnamskich liter (Lang Biang) lista `KEEP_TOGETHER` w `site2/src/content.js`. Prywatnego artifactu do sprawdzenia na telefonie nie publikowano: stronę na prawdziwym telefonie sprawdzi punkt kontrolny etapu 2 na końcu planu 2B.

Końcowy przegląd 2A (11.10.2026, świeży recenzent): poprawione dwie rzeczy: powiększona mapa znów przycina kontury do ramek kadrów, a w trybie dat na telefonie 360 px dwa pola dat mieszczą się obok siebie i strona nie przewija się na boki (sonda `settings.js` jest teraz uruchamiana też przy 360 px).

Uwagi z przeglądu zrzutów 2A poprawił plan 2B (zadanie 1).

### Z planu 1B

Zrobione 11.10.2026: plan 1B ([plans/2026-10-10-etap-1b-strona.md](plans/2026-10-10-etap-1b-strona.md)), prace 10–11.10.2026. Strona działa na nowym silniku: ustawienia są w linku, a trasa przelicza się od razu. Plany dni zależą od poziomu przygody, łącznie z trudnymi dniami na poziomie 3 (dziś tylko w Cát Tiên i Pù Luông). Strona ostrzega o Tết i świętach państwowych, a przy terminie, który już minął, o tym, że minął. Ma też mapę, przyciski „Dodaj” i „Usuń” (po „Dodaj” mówi, co wypadło z trasy), listę „Poza trasą” i kopiowanie planu z linkiem.

Punkt kontrolny etapu 1 (11.10.2026): przegląd zrzutów pięciu ustawień i strony zbudowanej lokalnie. Decyzje:
- trasy są sensowne, etap 1 zamknięty;
- opis poziomu 3 mówi uczciwie, że trudne dni są tam, gdzie się da, a w pozostałych miejscach dni są jak przy „Aktywnie”;
- link z terminem, który już minął, dalej pokazuje swoją trasę, a pierwsze ostrzeżenie mówi, że termin minął (plan zakładał powrót do terminu domyślnego).

Drobniejsze uwagi z przeglądów planu 1B są w [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md).

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
