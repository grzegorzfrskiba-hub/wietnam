# Uwagi z przeglądów planu 1B, odłożone na później

Przeglądy planu 1B zostawiły te drobniejsze uwagi: każda mówi, gdzie leży i dlaczego ma znaczenie, a sekcja mówi, do którego etapu należy.

## Do etapu 2

Strona i jej wygląd:
- `site2/src/template.html`, `#settings-msg`: komunikat o błędzie w linku jest w ustawieniach, ok. 1,5 ekranu telefonu pod górą strony, więc odbiorca zepsutego linku może go nie zauważyć; pokazać go też przy liczbach trasy.
- `site2/src/app.js` (przyciski „Dodaj” i „Wróć do trasy bez zmian”): po zmianie, która nie daje trasy, działają na ostatnich poprawnych ustawieniach, a nie na tym, co pokazuje formularz, więc nowy wybór lotniska przepada.
- `site2/src/app.js` (`syncForm`): przy dwóch wybranych zainteresowaniach i odrzuconej zmianie wyszarzone pola odświeżają się dopiero przy następnej poprawnej zmianie.
- `site2/src/template.html`: nakładki na zdjęcia (górna część strony, przyciski galerii, przeglądarka zdjęć) mają kolory wpisane na stałe, a zasada projektu każe używać zmiennych CSS.
- `site2/src/template.html`: `:empty { display: none }` na regionach `role="status"` (`.set-msg`, `.missing`); niektóre czytniki ekranu mogą pominąć pierwszą wiadomość. Wiersz `.dropped` jest zrobiony bez tego.
- `site2/src/template.html`: kolor `.day-rain` nie działa (przebija go `.day p`), a reguły `.strip-note`, `.tip-warn`, `.m-start rect` i `.m-start .m-label` nie są nigdzie używane.
- `site2/src/template.html`: przyciski „Dodaj” i „Usuń” (`.btn-small`, `.stop-remove`) mają ok. 40 px wysokości, poniżej celu dotyku 44 px.
- `site2/src/template.html`: odstępy w druku (18 px i 10 px) powtarzają wartości ekranowe z innego miejsca pliku.
- Mapa, przy nowych kadrach: podpis z numerami dni pod nazwą miejsca bywa ucięty na trasie Hà Nội → Hà Nội.
- Mapa, przy nowych kadrach: ramka lotniska (19 px) jest przy Đà Nẵng częściowo zasłonięta (znacznik Hội An ok. 3 px od punktu lotniska, znacznik Huế dotyka rogu) i węższa niż znacznik „1·6” na trasie tam i z powrotem (23 px); przy Đà Nẵng → Đà Nẵng, na poziomie 1 i przy 30 dniach, widać z niej tylko ok. 25%.

Testy i narzędzia:
- Sondy w `tests/probes/` wypisują wyniki, a nie sprawdzają ich; zamienić na kontrole z kodem wyjścia.
- `tests/probes/changes.js`: sonda dochodzi do przypadku bez trasy przez `apply()`, a nie kliknięciem, i w linii o trasie tam i z powrotem nie wypisuje wyniku `apply()`; `tests/probes/anchors.js` nie klika „Na górę”.
- Sondy: długa sonda trafia na ograniczenie `history.replaceState` w Chrome, a wszystkie mają wpisany na stałe miesiąc (marzec 2027).
- `tests/probe.sh`, `tests/shot.sh`, `tests/print.sh`: nic nie pilnuje, żeby znów nie ładowały fragmentu bez doctype (tryb quirks z marginesem 8 px); dodać do sond `document.compatMode` albo sprawdzenie doctype w skryptach.
- `tests/page.test.js`: test straży własnych kluczy w `parseLink` (`bad2`) używa `constructor=x`, który przechodzi też bez straży; użyć `constructor=%zz`. Brakuje też testów zepsutego `start` i `koniec` oraz jednokrotnego zgłaszania pola (`dni=x&dni=y`).
- `tests/page.test.js`: brakujące przypadki: `tripAlerts` dla wyjazdu sprzed początku listy świąt, progi `legNotes` (2, 6 i 7 godz.), `stopDays` z miesiącem zmieniającym się w trakcie pobytu, filtr poziomu w `offRoute`, miesiąc z przeszłości zostający w ustawieniach, `koniec` bez `start`.
- `tests/engine.test.js` (`normSettings`): brak wiersza, który przypina kontrolę typu `end` (np. `end` jako lista → `date`); „brak roku daje `null`” jest sprawdzane w tablicy, gdzie `JSON.stringify` zlewa `null` z `undefined`; brak testu skrajnych dopuszczonych lat, 2000 i 2100.
- `site2/src/engine.js` (`normSettings`): granice roku 2000 i 2100 to gołe liczby, a granice dni mają nazwy (`MIN_DAYS`, `MAX_DAYS`).
- `site2/src/page.js` (`parseLink`): znany klucz bez `=` (ucięty link) jest czytany jak kotwica i nie jest zgłaszany jako błąd.
- `site2/src/page.js` (`settingsFromLink`): ustawienia zachowują nieużywane pola (samo `koniec`, `dni` obok dat), a `dropped` zgłasza je niespójnie; nieszkodliwe, bo formularz czyta ustawienia od nowa.
- `site2/src/page.js`: nagłówek pliku mówi, że używa `holidays.js` i `content.js`, a dostaje ich dane tylko przez argumenty.

Treść miejsc:
- `site2/src/content/hue.js`: plan na deszcz dnia p 2 („grobowce samochodem zamiast rowerem”) powtarza wersję spokojną (łódź i samochód).
- Đà Lạt: granice pory suchej i deszczowej są w plikach różne: `content/dalat.js` mówi o porze suchej od grudnia do kwietnia, `research/sezony-2026-10.md` o XI–IV (deszczowa V–X), a źródło LB-VNE w `research/plany-dni-2026-10.md` o XI–III; wybrać jedną definicję.
- `site2/src/content/puluong.js`, trudny dzień: dopisać ryzyko mgły i zimna zimą (dzień działa tylko w X–IV, a zdanie wymaga źródła w `research/`) i zamienić „8–9 godzin marszu” na „8–9 godzin w drodze”.
- Drobne poprawki stylistyczne: `cattien.js` (trudny dzień: „do drogi … dalsza droga”), `mekong.js` (plan jednej nocy: „gospodarzy” trzy razy; miejsce zdania o przypływie), `dalat.js` (tytuł dnia 1 powtarza „sosnowe wzgórza”; sformułowanie o nagłych powodziach), `hoian.js` (uwaga o odległości przy dniu ponownego pobytu), `hue.js` („latem ok. 17:30” jest niejasne).
- Drobne poprawki stylistyczne: `caobang.js` („Taka kolejność, bo …”), `ninhbinh.js` („bywa zamykana albo zmieniana” przy trasach), `puluong.js` („organizuje wejścia… dopytaj”), `catba.js` (powtórzenia i wielokropek), `hanoi.js` (kolejność objaśnienia phở cuốn).
- `site2/src/photos.js`: zdjęcia `hoian_4` i `hoian_5` są ciemnymi zdjęciami z telefonu; zamienić na ostrzejsze na licencji CC BY-SA 4.0.

## Do etapu 3

- `site2/src/places.js` i `site2/src/content/*.js`: `name` w danych i `short` w treściach trzymają krótką nazwę miejsca i już się różnią (Mekong, noc w Hà Nội w drodze); zostawić jedno (`tools/report.js` czyta `PLACES.name`).
- `site2/src/content/dalat.js`, galeria: dwa zdjęcia z Tà Năng, których żaden plan dnia nie odwiedza; pierwsze zdjęcie (Lang Biang) pasuje do dnia p 3, a ten jest dopiero od trzech nocy; rozstrzygnąć przy module Tà Năng–Phan Dũng.
- `tests/content.test.js`: kontrola tekstu trudnego dnia szuka słowa „przewodnik” albo „operator”, więc przyjmie też „bez przewodnika”; zaostrzyć.
- `site2/src/app.js` (`renderMap`): miejsce bez wpisu w `NLAB` albo `CLAB` wywraca rysowanie mapy (dziś są wszystkie); dopisywanie wpisów jest na liście w [etapy.md](etapy.md), tu chodzi o to, żeby brak wpisu nie zabijał strony.
- `site2/src/travel.js`, `site2/src/content/caobang.js`: czasy dojazdu z Cao Bằng są liczone z miasta, a plan drugiego dnia kończy się w Khuổi Ky; sprawdzić względem tego, gdzie jest nocleg.

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
