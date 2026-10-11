# Uwagi z przeglądów planu 1B, odłożone na później

Przeglądy planu 1B zostawiły te drobniejsze uwagi: każda mówi, gdzie leży i dlaczego ma znaczenie, a sekcja mówi, do którego etapu należy.

## Do etapu 2

Zrobione w planie 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md), 11.10.2026): wszystkie uwagi z tej sekcji. Przy okazji odpadła uwaga o `NLAB` i `CLAB` z „Do etapu 3”: etykiety mapy rozmieszcza teraz czysta funkcja, test treści pilnuje koloru każdego miejsca, a test kombinacji jego etykiety w kadrze.

## Do etapu 3

- `site2/src/places.js` i `site2/src/content/*.js`: `name` w danych i `short` w treściach trzymają krótką nazwę miejsca i już się różnią (Mekong, noc w Hà Nội w drodze); zostawić jedno (`tools/report.js` czyta `PLACES.name`).
- `site2/src/content/dalat.js`, galeria: dwa zdjęcia z Tà Năng, których żaden plan dnia nie odwiedza; pierwsze zdjęcie (Lang Biang) pasuje do dnia p 3, a ten jest dopiero od trzech nocy; rozstrzygnąć przy module Tà Năng–Phan Dũng.
- `tests/content.test.js`: kontrola tekstu trudnego dnia szuka słowa „przewodnik” albo „operator”, więc przyjmie też „bez przewodnika”; zaostrzyć.
- `site2/src/travel.js`, `site2/src/content/caobang.js`: czasy dojazdu z Cao Bằng są liczone z miasta, a ostatni dzień pobytu (plan p 2) kończy się w Khuổi Ky; sprawdzić względem tego, gdzie jest nocleg.

## Do etapu 4 (audyt przed publikacją)

- `site2/src/page.js` i `site2/build.py`: `SITE_URL` jest wpisany w dwóch miejscach.
- `site2/src/template.html`: czcionki z Google Fonts to prywatność odwiedzających, a plik offline potrzebuje internetu do kroju; zdecydować, czy czcionki trafią na własny hosting.
- `site2/build.py` i `site2/src/app.js` (`renderCredits`): obraz podglądu linku (og:image) jest bez podpisu autora zdjęcia, a podpisy w stopce prowadzą do strony zdjęcia na Commons, nie do tekstu licencji.
- `CLAUDE.md`, „Skąd to się wzięło”: linie o grudniowym wyjeździe organizatora; zdecydować przed upublicznieniem repo, co w nich zostaje.
- `tests/data.test.js`: test danych świąt sprawdza tylko kształt, nie fakty (przesunięcie Tết 2030 na chińską datę, usunięcie wiersza Dnia Królów Hùng albo Dnia Kultury i zmiana Tết 2027 przechodzą); dodać test z datami z researchu.
- `research/swieta-2026-10.md`: odwołanie „(sekcja 5)” jest nieaktualne, a strona pokazuje przy każdym święcie „ok.”; dopasować opis.
- `research/swieta-2026-10.md`: źródło 11483/TB-BNV to strona rządowa aktualizowana w miejscu (w adresie jest „proposal”); dopisać zdanie o aktualizacji.
- `research/trudne-dni-2026-10.md`, Cát Tiên: cena w nagłówku zaczyna się od dolnej granicy bez przewodnika, a plan go wymaga; w uwagach na końcu pliku punkt o cenie pomija przewodnika.
- `research/trudne-dni-2026-10.md`, Cát Tiên: cennik parku, z którego policzono ceny, dotyczy gości krajowych; sprawdzić ceny dla cudzoziemców.
- `research/trudne-dni-2026-10.md`, Cát Tiên: lista ryzyk pomija dziką zwierzynę nad Bàu Sấu.
- `research/trudne-dni-2026-10.md` (ramy prawne): dekret 146/2026/NĐ-CP jest znany z jednego artykułu, a notatka nie wspomina o sprzecznym numerze z innego źródła.
- `research/trudne-dni-2026-10.md`, Cát Bà: opis źródła CB-253 ma †, a jego etykieta nie ma; liczba † w pliku się nie zgadza.
- `research/trudne-dni-2026-10.md` (początek i tabela końcowa): wciąż mowa o trzech miejscach z trudnym dniem i o „catba | tak”; dopisać „(na razie bez trudnego dnia, decyzja z 10.10.2026)”.
- `research/plany-dni-2026-10.md`, szlak na Lang Biang: w wierszu o dniu p 3 w Đà Lạt „otwarcie „rozważy…”” jest dwuznaczne i cytuje polskie tłumaczenie, a w opisie źródła LB-VNP „Otwarcie park „…”” jest telegraficzne.
- `tests/data.test.js` i `site2/build.py` (`photo_ids()`): brak kontroli powtórzonego identyfikatora zdjęcia i autora zastępczego „autor nieznany”.
- `site2/src/photos.js`: w podpisach dwóch zdjęć imię autora i jego login na Commons są zlane w jeden napis (przeniesione z pierwowzoru); podpis `hue_2` wymienia tylko grobowiec, a na zdjęciu jest pawilon nad stawem z lotosami.
- Wydruk: zdanie „Kliknij dzień, żeby do niego przejść” (`shape.p`) nadal się drukuje.
- Wydruk: ostatnia strona PDF bywa prawie pusta (sama linia ©, albo koniec „Uwag” i ©); do decyzji o formacie wersji offline.
- `tests/print.sh`: nagłówek mówi „A4”, a headless Chrome drukuje na US Letter (brak reguły `@page`); skrypt kończy się kodem 0 także przy zakrytych liniach tekstu, bo tylko raportuje.

## Utrzymanie danych

- `site2/src/app.js` (`TODAY`, `clampToday` w `site2/src/page.js`): dzisiejsza data jest przycinana do zakresu danych, najpóźniej do 1.12.2030; po tej dacie lista miesięcy i ostrzeżenie o minionym terminie przestają się zgadzać. Przed końcem 2030 dopisać święta na kolejne lata i przesunąć `PLAN_LAST_YEAR` w `site2/src/holidays.js`.
