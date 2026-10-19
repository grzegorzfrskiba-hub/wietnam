# Mapa kraju na podstronie zwierząt: opis projektu

Sesja decyzji 19.10.2026. Opis do zaplanowania (superpowers:writing-plans) i wykonania w osobnej sesji. Decyzje użytkownika są zaznaczone jako jego; rzeczy oznaczone *(decyzja sesji)* zostawił do decyzji albo przyjął z rekomendacji, a *(dla wykonawcy)* zostają do ustalenia w planie.

## Po co

Mapy pełnią na stronie Route G bardzo ważną rolę: czytelnik ma cały czas wiedzieć, gdzie w Wietnamie jest to, o czym właśnie czyta. Strona z trasą ma to od poprawki 1 następnej rundy (16.10.2026): przy liście „Nie ma na twojej trasie” stoi przyklejona mapa kraju, a przy przewijaniu i najechaniu kursorem zapalają się kropki kolejnych miejsc (`renderBigMap`, `lightBig`, `bindBigMap` w `site2/src/app.js`, `countryMapAll` w `site2/src/page.js`, style `.off-big` i `.bm-*` w `site2/src/template.html`; opis w [../etapy.md](../etapy.md), „Następna runda poprawek”, poprawka 1). Użytkownik chce **ten sam mechanizm** na podstronie zwierząt `…/wietnam/wildlife/` (etap 6, `site2/src/wild.html`, `wildapp.js`).

Dwie różnice wobec listy ze strony z trasą (słowa użytkownika):
- **Zdjęcia są tu najważniejsze i mają być duże**, więc przewijania jest więcej niż przy liście miejsc.
- **Strona ma przyciągać tym, że nie jest nudna, tylko dynamiczna:** przy przewijaniu coś się cały czas rusza i zmienia. To ogólna wskazówka dla wszystkich trzech zakładek.

## Cele

1. We wszystkich trzech zakładkach („Na trasie”, „Galeria”, „Przewodnik”) obok listy stoi przyklejona mapa kraju; przy przewijaniu zapalają się płynnie miejsca tego, co jest na środku ekranu (decyzja użytkownika: wszystkie trzy).
2. W „Na trasie” duże zdjęcia: jedna kolumna kart, zdjęcie na całą szerokość kolumny.
3. Ruch przy przewijaniu: mapa zmienia się płynnie, a karty i zdjęcia łagodnie pojawiają się przy wjeździe na ekran *(decyzja sesji, na podstawie wskazówki użytkownika o dynamice)*.
4. Telefon i wąski ekran też mają mapę: pasmo przyklejone nad listą, jak przy liście „Nie ma na twojej trasie” poniżej 1101 px.

## Poza zakresem

- Zasięgi zwierząt na mapie (plamy, obszary). Nie ma ich w danych ani w źródłach; mapa pokazuje tylko kropki miejsc Route G.
- Nowe zdjęcia z Commons. Oryginały w `photos/wild/` mają do 1920 px, strona dostaje wersję 1400 px (`build.py`, `encode(im, 1400, 74)`); to wystarcza na duże zdjęcie.
- Przybliżanie mapy do regionu: mapa zawsze pokazuje cały kraj (decyzja użytkownika, C9).
- Rola mapy w decyzji „dodaj do trasy”: mapa służy orientacji, decyzję obsługuje istniejący przycisk „Dodaj” w karcie (decyzja użytkownika, E16).
- Strona z trasą i jej lista „Nie ma na twojej trasie” bez zmian zachowania. Wspólny kod można wydzielić, byle sondy `offroute.js` i `minimap.js` przechodziły jak dziś.

## Czego nie chcemy (anty-cele)

- **Przycięcie, przy którym ucierpi widok zwierzęcia.** Lepiej różne proporcje zdjęć niż ucięty pysk, ogon czy ptak przy krawędzi (słowa użytkownika: „w najgorszym wypadku mogą być inne formaty zdjęć”).
- Mapa, która skacze, przybliża albo przesuwa się przy każdym przewinięciu.
- Ruch, którego nie da się wyłączyć: przy `prefers-reduced-motion: reduce` wszystko jest od razu na miejscu, bez animacji (jak dziś pulsująca otoczka `.bm-halo`).
- Ruch, który spowalnia przewijanie albo zaśmieca stronę (np. skaczące kafelki, paralaksa zdjęć).

## Ograniczenia projektu

- Zasady z `CLAUDE.md`: każdy nowy tekst od razu po polsku (`site2/src/wildui.js`) i po angielsku (`site2/src/en/wildui.js`), testy dwóch języków; treść „dla podróżnych z całego świata”; bez `git push` i publikacji bez zgody.
- Bez node: testy w JavaScriptCore (`tests/run.sh`), sondy w Chrome bez okna (`PAGE=wildlife bash tests/probe.sh …`).
- **Chrome bez okna nie uruchamia IntersectionObserver.** Mechanizm zapalania przy przewijaniu ma iść na zdarzeniu `scroll`, jak `lightBig` na stronie z trasą, żeby sonda mogła go sprawdzić. Łagodne pojawianie się kart może iść na IntersectionObserver, ale wtedy bez niego (i w sondzie) wszystko ma być widoczne od razu, a sprawdza się je ręcznie przez lokalny serwer (pułapka z „Jak sprawdzać” w `CLAUDE.md`).
- Podstrona ładuje dziś `places.js` … `page.js` (lista `WILD_SCRIPTS` w `site2/build.py`), ale nie `panels.js` (`COUNTRY_MAP`) ani `basemap.js` (`OUTLINE`); mapa ich potrzebuje.
- Mapa ukryta przed czytnikiem ekranu (`aria-hidden`), bo powtarza to, co jest w liście, jak na stronie z trasą; żadnych nowych tekstów poza napisem przy gatunkach bez miejsca (niżej).

## Co ustalono

### Mapa (wspólna dla trzech zakładek)

1. **Co stale widać** (C8): cały kraj w ramce `COUNTRY_MAP` (340 px), zarys `OUTLINE`, twoja trasa jak na mapie przy liście „Nie ma na twojej trasie” (drogi linią, loty przerywaną, postoje małymi punktami) i kropka każdego miejsca ze zwierzętami w kolorze tego miejsca ze strony z trasą (`--pal-…`). Miejsca ze zwierzętami to dziesięć miejsc „Przewodnika” (klucze `GD` w `wild.js`: mekong, saigon, cattien, yokdon, danang, phongnha, cucphuong, ninhbinh, catba, babe); które z nich dostają kropkę w danej zakładce, ustala wykonawca *(dla wykonawcy; rozsądnie: w „Przewodniku” każde z sekcją, w „Na trasie” i „Galerii” każde z co najmniej jednym spotkaniem `meet`)*.
2. **Bez trasy w linku** (C13): mapa bez linii trasy i bez postojów, same kropki miejsc.
3. **Miejsce na trasie i poza nią** (C10): rozróżnione na mapie (np. kropka pełna i pusta, albo pełna i z obwódką; *dla wykonawcy*), a przy nazwie zapalonego miejsca na trasie dni pobytu, np. „Cát Tiên · dni 5–6” (z `trip.stays`, jak `w.on` w karcie; nowy tekst w obu językach, jeśli obecne `w.on` nie pasuje).
4. **Zapalenie** (C9): kropka rośnie, pojawia się pulsująca otoczka i nazwa, reszta kropek przygasa; przejście ok. 0,3 s. Bez przybliżania i przesuwania mapy. To ten sam wygląd co `.bm-pt.on` na stronie z trasą; zapalonych może być kilka kropek naraz (zwierzę w dwóch miejscach, rząd kafelków w Galerii).
5. **Kliknięcie kropki** (C12): przewija do pierwszej pozycji z tego miejsca w otwartej zakładce, na środek ekranu, jak kliknięcie kropki przy liście „Nie ma na twojej trasie”. Najechanie na kropkę obwodzi pozycje z tego miejsca *(decyzja sesji, za decyzją 1 poprawki 1 strony z trasą)*.
6. **Co się zapala bez kursora:** pozycja, przez którą idzie środek ekranu (na komputerze środek okna, na telefonie środek części pod pasmem z mapą), jak `scrollRow` i `middleLine` w `app.js`; zanim lista tam dojedzie, pierwsza pozycja, za nią ostatnia. Najechanie myszą albo Tab na pozycji zapala jej miejsca, a po wyjściu kursora wraca zapalenie według przewijania *(decyzja sesji)*.
7. **Gatunki Galerii bez spotkania (`meet`)**: 13 z 25 (sprawdzone po przeglądzie opisu; wcześniej błędnie 9). Decyzje użytkownika po przeglądzie opisu (19.10.2026):
   - **8 zwykłych gatunków** (kukang, niedźwiedź malajski, kurtaczek, wieloszpon, sędzioł, dzioborożec, żaba mszysta, Troides): **dopisać miejsca Route G** tam, gdzie potwierdza to `research/` (źródło i data; Przewodnik wymienia już np. kukanga i wieloszpona w Cát Tiên, sędzioła w Cúc Phương, a `why` żaby Cúc Phương). Mapa zapala to miejsce jak przy karcie. Gatunek bez potwierdzenia dostaje napis „bez stałego miejsca na trasie G” (w obu językach) i przygaszone kropki. Nowe pole w danych (np. `home: ['cattien']`) zamiast `meet`, bo `meet` niesie szansę, porę i plan dnia, a od niego zależą karty „Na trasie” i „Dodaj” *(decyzja sesji; nazwa pola dla wykonawcy)*. Jeśli research nie ma potwierdzenia, wykonawca dopisuje je w `research/zwierzeta-2026-10.md` ze źródłem i datą, w osobnym zadaniu przed kodem.
   - **5 legend** (rokselana, saola, gibboniec reliktowy, kiściec annamski, skamielinowiec): **szara kropka poza trasą** w miejscu, gdzie żyją (np. Khau Ca dla rokselany, Trùng Khánh dla gibbońca reliktowego, Bạch Mã dla kiśćca annamskiego, jak w sekcji „Poza Route G” Przewodnika), z nazwą i dopiskiem „poza Route G”. Szare kropki widać tylko wtedy, gdy są zapalone, żeby nie mieszały się z miejscami trasy *(decyzja sesji)*. Współrzędne ze źródłem i datą w `research/`. Gdzie miejsca nie da się podać rzetelnie (np. saola, bez stałego miejsca do pokazania), zostaje napis „poza trasą G” i przygaszone kropki.
   - **Jak wyszło w planie** (research „Mapa podstrony”, 19.10.2026; plan [2026-10-19-mapa-zwierzat.md](2026-10-19-mapa-zwierzat.md)): 7 z 8 zwykłych gatunków ma potwierdzone miejsce Route G (kukang i niedźwiedź malajski: Cát Tiên i Cúc Phương; kurtaczek, wieloszpon i dzioborożec: Cát Tiên; sędzioł i żaba mszysta: Cúc Phương); Troides nie ma żadnego. Z legend rokselana, gibboniec reliktowy i kiściec annamski dostają szare punkty (Khau Ca, Trùng Khánh, Bạch Mã), a skamielinowiec żyje w Phong Nha, więc zapala zwykłą kropkę tego miejsca; saola nie ma rzetelnego punktu. Przy Troides i saoli jeden napis zamiast dwóch: „Bez potwierdzonego miejsca do pokazania na mapie.” / “No confirmed place to show on the map.” *(decyzja sesji planu)*. Punkty „Poza Route G” dostały też Côn Đảo i Tràm Chim (Wikipedia, ze współrzędnymi), więc ramka „Poza Route G” zapala wszystkie pięć.
   - Karta i kafelek gatunku z `meet` zapalają tylko miejsca z `meet`, nie miejsca, przy których gatunek pada w tekście Przewodnika z szansą 0 (np. duk wspaniały w Phong Nha na fotopułapkach) *(decyzja sesji)*.
8. **Rozmiar i miejsce na komputerze** jak przy liście „Nie ma na twojej trasie”: od 1101 px mapa po prawej, do 340 px szerokości, przyklejona pod paskiem u góry, nigdy wyższa niż okno *(decyzja sesji; dokładne szerokości kolumn dla wykonawcy, bo lista zwierząt ma inne treści)*.

### Zakładka „Na trasie”

9. **Jedna kolumna dużych kart** (B4, decyzja sesji). Dziś `.w-cards` to siatka kart ok. 340 px (`wild.html`); teraz jedna kolumna obok mapy, a zdjęcie na całą szerokość kolumny (na komputerze ok. 700–800 px). Zdjęcie dostaje `sizes` dopasowane do nowej szerokości, żeby przeglądarka brała wersję 1400 px tam, gdzie trzeba.
10. **Kadr** (B5, anty-cel): wspólne proporcje (np. 3:2) tam, gdzie zwierzę mieści się w kadrze; przy każdym zdjęciu, gdzie przycięcie ucina zwierzę, albo ręcznie ustawiony punkt kadru (`object-position`, w danych zdjęcia), albo własne proporcje zdjęcia. Wykonawca przegląda wszystkie 16 zdjęć kart (np. arkusz miniatur w kadrze) i decyzję przy każdym zapisuje w planie; arkusz pokazuje użytkownikowi w punkcie kontrolnym.
11. **Co od razu, co po rozwinięciu** (B6): od razu zdjęcie, nazwa (i `alt`, nazwy wietnamska i łacińska, IUCN jak dziś), „dlaczego”, miejsca z szansą (kropki ●●○) i „na trasie / poza trasą” (dni, jak `w.on`); po rozwinięciu „gdzie dokładnie” (`m.where`), „kiedy” (`m.when`), uwagi o planie dnia i o terminie. „Dodaj” *(decyzja sesji)* zostaje widoczne bez rozwijania, bo to jedyne działanie karty. Rozwijanie jak `details` na stronie z trasą (spójne z sondą `fold.js`).
12. **Kliknięcie zdjęcia** (B7) dalej otwiera powiększenie (obecny podgląd `data-view`).
13. **Jedna pozycja przewijania to zwierzę** (A3); karta zapala wszystkie swoje miejsca (sześć gatunków ma dwa: lutung białozady, motyle, niedźwiedź, lutung jasnolicy, jelenie, paw).
14. Grupy „Na twojej trasie” i „Poza trasą” zostają jak dziś.

### Zakładka „Galeria”

15. **Siatka zostaje, węższa, z mapą obok** (A2, słowa użytkownika: „zachować siatkę i jedynie ją nieco ścisnąć i z boku dać mapkę”); np. 3 kolumny zamiast 4 *(decyzja sesji; dokładnie dla wykonawcy)*.
16. Przy przewijaniu zapalają się miejsca wszystkich kafelków rzędu, przez który idzie środek ekranu; najechanie na kafelek zapala miejsca tego jednego kafelka. Rząd z legendą zapala też jej szarą kropkę; rząd samych gatunków bez miejsca pokazuje napis (ustalenie 7).

### Zakładka „Przewodnik”

17. Sekcja miejsca (`.w-place`), przez którą idzie środek ekranu, zapala swoje miejsce; ramka „Czego unikać” nie zapala nic (kropki przygaszone), a ramka „Poza Route G” zapala szare kropki swoich miejsc, które mają współrzędne (ustalenie 7) *(decyzja sesji)*.

### Ruch przy przewijaniu

18. Mapa: płynne przejścia kropek i nazwy (ustalenie 4).
19. Karty w „Na trasie”, kafelki w „Galerii” i sekcje w „Przewodniku” łagodnie się pojawiają, gdy wjeżdżają na ekran (np. przejście z przezroczystości i lekkiego przesunięcia w górę, ok. 0,4 s, raz na pozycję) *(decyzja sesji, przyjęta przez użytkownika)*. Wszystko, co jest na ekranie przy otwarciu strony albo po przejściu z linku z `place`, widać od razu; bez JavaScriptu, w druku i przy `prefers-reduced-motion` też od razu.
20. Inne pomysły na ruch wykonawca może zaproponować w punkcie kontrolnym, w granicach anty-celów.

### Telefon i wąski ekran (poniżej 1101 px)

21. **Pasmo z małą mapą przyklejone u góry nad listą** (D14), jak przy liście „Nie ma na twojej trasie” na telefonie: mapa ok. 180 px wysoka po lewej, obok kropka i nazwa zapalonego miejsca (albo miejsc), tło strony i cienka linia u dołu. Pasmo pod zakładkami; to, czy zakładki też się przyklejają, ustala wykonawca tak, żeby pasmo i zakładki razem nie zabrały więcej niż ok. 1/3 wysokości telefonu.
22. Tknięcie kropki działa jak kliknięcie (ustalenie 5).

### Wydruk

23. Mapa raz na początku drukowanej zakładki (D15), bez animacji, z wszystkimi kropkami i nazwami (nic nie jest „zapalone”); karty w druku rozwinięte *(decyzja sesji: druk pokazuje wszystko, jak dziś)*. Wydruk dalej na A4, `PAGE=wildlife bash tests/print.sh` bez zakrytych linii.

### Sprawdzanie

24. Sonda `wild.js` (`PAGE=wildlife`) rozszerzona o: mapę obok listy od 1101 px w każdej zakładce, tyle kropek co miejsc, zapalenie właściwych kropek przy przewinięciu (karta z dwoma miejscami → dwie kropki), najechanie, kliknięcie kropki, szarą kropkę legendy, napis przy gatunku bez miejsca, pasmo poniżej 1101 px, oba języki. Wykonawca może dać mapie osobną sondę.
25. Zrzuty w jasnym i ciemnym motywie przy 390, 1024, 1400 i 1920 px; przyklejenie i łagodne pojawianie się ręcznie w przeglądarce przez lokalny serwer.
26. **Punkt kontrolny z użytkownikiem przed końcem:** klikalna kopia podstrony na lokalnym serwerze (jak makieta poprawki 1, `notes/makieta-mapa-listy.py`) i arkusz kadrów zdjęć; na telefonie przez Wi-Fi albo po publikacji (pamięć „Phone check on LAN”).

## Zostaje dla wykonawcy

- Wspólny kod mapy dla strony z trasą i podstrony (np. przeniesienie rysowania i zapalania do `page.js` albo nowego pliku) albo osobna kopia w `wildapp.js`.
- Dokładne szerokości kolumn, odstępy, liczba kolumn Galerii, wygląd „na trasie / poza trasą” na mapie.
- Proporcje i punkt kadru każdego zdjęcia (ustalenie 10) z arkuszem do pokazania.
- Czasy i krzywe przejść w granicach „płynnie, ok. 0,3–0,4 s”.
- Podział na zadania, kolejność, sucha próba planu (pamięć „Dry-run plan method”) i zapis w [../etapy.md](../etapy.md) po skończonej pracy.
