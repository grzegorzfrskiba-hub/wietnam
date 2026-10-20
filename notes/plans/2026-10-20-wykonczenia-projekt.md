# Wykończenia strony („efekt wow”): opis projektu

Sesja decyzji 20.10.2026. Opis do zaplanowania (superpowers:writing-plans, plan z suchą próbą) i wykonania w osobnej sesji. Decyzje użytkownika są zaznaczone jako jego; rzeczy oznaczone *(decyzja sesji)* przyjął z rekomendacji na jednej liście (ustalenia 1–18, przyjęte w jednym kroku), a *(dla wykonawcy)* zostają do ustalenia w planie.

## Po co

Słowa użytkownika: osoby, które wejdą na stronę, mają „nie móc oderwać oczu”: od flow, od estetyki, od tego, że to „masterpiece, na które aż miło popatrzeć”, i to niskim kosztem. Mapy z trasą i zdjęcia zwierząt już robią dużo; brakuje ruchu i wykończeń. Sesja przeszła przez zbudowaną stronę (1366 px i telefon) i zaproponowała dziewięć rzeczy; użytkownik przyjął wszystkie („wprowadzamy wszystko”), potem trzy decyzje i listę ustaleń.

**Kolejność (decyzja użytkownika):** osobny plan teraz, przed linkami dla anglojęzycznych testerów, bo wykończenia są na pierwsze wrażenie. Lista „Następna runda poprawek (po etapie 6)” w [../etapy.md](../etapy.md) zostaje osobno, po tym planie. Zdjęcia z Commons do 7 wierszy i 7 notatek przewodnika zrobiła w tym czasie równoległa sesja (20.10.2026, opublikowane w `1db4ad5`); sucha próba i plan stoją na tym stanie.

## Cele

1. Trasa na dużej mapie rysuje się sama, w kolejności podróży.
2. Zmiana ustawień płynnie przebudowuje stronę zamiast podmieniać ją skokiem.
3. Liczby w kafelkach nabijają się.
4. Podstrona zwierząt zaczyna się dużym zdjęciem, jak strona z trasą; zdjęcia na górze obu stron powoli się przybliżają.
5. Zdjęcia się wyłaniają, zamiast wyskakiwać.
6. Podgląd zdjęć na podstronie zwierząt przegląda się jak album.
7. Pasek u góry w „Dzień po dniu” mówi, gdzie jesteś.
8. Strona z trasą kończy się kadrem z emocją i działaniem, a nie przypisami.
9. Drobna typografia.

## Poza zakresem

- Zmiany tras, silnika i danych miejsc; liczby z `tools/liczby.sh` mają zostać takie same.
- Animacje na małej mapie przy dniach na telefonie (`.minimap`) i na mapach kraju (lista „Nie ma na twojej trasie”, podstrona zwierząt): zostają jak dziś *(decyzja sesji)*.
- Zakończenie na podstronie zwierząt *(decyzja sesji)*.
- Nowe zdjęcia z Commons: wszystkie potrzebne zdjęcia już są (`duk` w `photos/wild/`, `puluong_1` w `photos/`).
- Gałąź `pasek-strzalka` (strzałka „Na górę” w pasku na telefonie): do decyzji w następnej rundzie, jak w [../etapy.md](../etapy.md); ten plan jej nie wciąga.
- Podgląd linku (`og:*`), `noindex`, kroje (bez nowych plików), przełącznik EN · PL.

## Czego nie chcemy (anty-cele)

- Tanie triki: kursor z ogonem, paralaksa całych sekcji, cząsteczki, dźwięki (z sesji, przyjęte przez użytkownika).
- Szarpanie na iPhonie: animujemy tylko `transform`, `opacity` i maski/`stroke-dashoffset` na SVG, bez animowania wymiarów i cieni.
- Ruch, którego nie da się wyłączyć: przy `prefers-reduced-motion: reduce` wszystko od razu w stanie końcowym (jak dziś `.bm-halo`, `mini-pulse`, `w-in`).
- Strona, która bez nowych funkcji przeglądarki działa gorzej niż dziś: każdy efekt ma stan końcowy jako punkt wyjścia (bez JavaScriptu, w druku, w Chrome bez okna i w starszej przeglądarce widać od razu wszystko).
- Przycięcie zdjęcia zwierzęcia, przy którym ucierpi jego widok (anty-cel z poprawki 3).

## Ograniczenia projektu

- Zasady z `CLAUDE.md`: każdy nowy tekst od razu po polsku (`site2/src/ui.js`, `site2/src/wildui.js`) i po angielsku (`site2/src/en/`), testy dwóch języków; treść „dla podróżnych z całego świata”; bez `git push` i publikacji bez zgody; po zmianie kodu grep z „Jak sprawdzać” na twarde spacje.
- Bez node: testy w JavaScriptCore (`tests/run.sh`), sondy w Chrome bez okna (`tests/probe.sh`).
- **Chrome bez okna nie uruchamia IntersectionObserver ani przejść CSS** (pułapki w `CLAUDE.md`, sondy `map.js` i `minimap.js` czytają docelowe style). Sondy sprawdzają stan końcowy i klasy; ruch ogląda się ręcznie przez lokalny serwer i na telefonie.
- Bez nowych bibliotek; wszystko w obecnych plikach (`template.html`, `app.js`, `page.js`, `wild.html`, `wildapp.js`, `build.py`).

## Co ustalono

### Ruch na mapie i przy zmianach

1. **Rysowanie trasy** *(decyzja sesji)*. Na dużej mapie trasy (trzy kadry, `renderMap` w `site2/src/app.js`) linia przebiega w kolejności podróży przez kadry, łącznie ok. 2 s; punkty postojów zapalają się, gdy linia do nich dojdzie. Drogi przez `stroke-dasharray`/`stroke-dashoffset`; loty (linia przerywana `.m-fly`) maską odsłanianą tą samą techniką, bo przerywanej linii nie da się narysować samym `dashoffset`. Start: gdy mapa pierwszy raz wjedzie na ekran i po każdej zmianie trasy (ustawienia, „Dodaj”, „Usuń”); jeśli mapy nie widać w chwili zmiany, rysowanie czeka, aż wjedzie. Wjazd na ekran może iść na IntersectionObserver; bez niego linia od razu cała. Rysowanie od nowa **tylko przy innej trasie** (inny zestaw postojów i odcinków, np. porównanie klucza trasy), a nie przy każdej przebudowie mapy: przełącznik kosztów, EN · PL i zmiana ustawień, po której trasa wychodzi ta sama, nie rysują jej ponownie *(decyzja sesji, po pytaniu recenzenta opisu)*. Kopie dużej mapy (mała mapa na telefonie, wydruk, powiększenie kadru; dziś przez `outerHTML`/`panelSvg`) zawsze w stanie końcowym, bez połowy rysunku.
2. **Płynna przebudowa** *(decyzja sesji)*. Zmiana ustawień, „Dodaj” i „Usuń” idą przez `document.startViewTransition`, jeśli przeglądarka je ma: kafelki paska dni („All 15 days”, `renderShape`) przesuwają się na nowe miejsca (własne `view-transition-name`), reszta przenika, ok. 0,35 s. Przełącznik EN · PL bez przejścia. Bez `startViewTransition` render jak dziś. Przewijanie po „Dodaj” i „Usuń” jak dziś; przejście nie zmienia, gdzie ląduje ekran (gdy paska dni nie widać, zostaje samo przenikanie tego, co jest na ekranie) *(decyzja sesji, po pytaniu recenzenta opisu)*.
3. **Liczby w kafelkach** *(decyzja sesji)*. `renderFacts` (15 dni, 6 miejsc, 3 loty, …): przy pierwszym wjeździe na ekran liczby nabijają się od zera, ok. 0,8 s; po zmianie trasy od starej wartości do nowej. Tekst w DOM od razu końcowy dla czytnika ekranu (animacja tylko w warstwie widocznej, np. `aria-hidden` kopia albo `aria-live` wyłączone) *(sposób dla wykonawcy)*; jednostki („4 h”, `small`) i kwota budżetu bez nabijania, jeśli nie są liczbą całkowitą *(dla wykonawcy)*.

### Zdjęcia

4. **Zdjęcie na górze podstrony zwierząt** (decyzja użytkownika: duk wspaniały z Sơn Trà, `duk` w `site2/src/wildphotos.js`, to samo zdjęcie co w podglądzie linku). Arkusz kandydatów był obejrzany w przeglądarce (kadr komputera i telefonu). Na całą szerokość, jak `.hero` na stronie z trasą: na zdjęciu „← Plan a route”, EN · PL, tytuł i opis z dzisiejszego `.w-head`, w rogu podpis „Sơn Trà, Đà Nẵng”; zakładki pod zdjęciem. Zdjęcie trochę niższe niż na stronie z trasą, tak by zakładki wystawały nad dolną krawędź ekranu laptopa 1366 × 860 *(decyzja sesji)*. Punkt kadru tak, by twarz duka nie wpadała pod tytuł ani nie ucinała się u góry, przy 390, 1024, 1366 i 1920 px *(dla wykonawcy, z zrzutami)*. Oryginał ma 1920 × 1920 px; podstrona koduje dziś zdjęcia do 1400 px, więc wykonawca daje zdjęciu na górze wersję szerszą, jak `HERO_PHOTO` strony z trasą (`SMALLER["hero"]`) *(dla wykonawcy)*. Mapa podstrony zostaje jak dziś: od 1101 px obok zakładek, węziej pasmem u góry, które przykleja się dopiero przy zakładkach. Tekst alternatywny zdjęcia w obu językach. Do druku nie idzie, jak `.hero > img`.
5. **Powolne przybliżanie** *(decyzja sesji)*: zdjęcie na górze obu stron skaluje się z 1,0 do 1,08 przez ok. 24 s, raz (`animation-fill-mode: forwards`), bez zapętlenia; tylko `transform`.
6. **Wyłanianie zdjęć** *(decyzja sesji)*. Wszystkie doczytywane zdjęcia (`img` w `app.js`: galerie dni i lista „Nie ma na twojej trasie”; `img`/`photoBox` w `wildapp.js`: karty, Galeria, przewodnik, podgląd) zaczynają od przezroczystości i pojawiają się w ok. 0,4 s po `load` (także gdy już były w pamięci podręcznej: `img.complete`). Do tego czasu ramka ma tło w średnim kolorze zdjęcia, policzonym w `build.py` (PIL już tam jest) i podanym w danych zdjęcia *(decyzja sesji: średni kolor, bez rozmytej miniaturki)*. Bez JavaScriptu i w druku zdjęcia widać od razu.
7. **Podgląd zdjęć na podstronie zwierząt** *(decyzja sesji)*. `openViewer`/`closeViewer` w `wildapp.js`: strzałki ‹ ›, klawisze ← →, przesunięcie palcem, licznik „3 / 27”. Zestaw to zdjęcia otwartej zakładki w kolejności na stronie („Na trasie”: zdjęcia kart; „Galeria”: kafelki; „Przewodnik”: same miniaturki). Escape i × jak dziś; fokus wraca na zdjęcie, z którego otwarto. Nowe teksty (np. „Następne zdjęcie”, „Poprzednie zdjęcie”, licznik) w obu językach; można wziąć istniejące z podglądu strony z trasą (`lbShow`, `bindLightbox`), jeśli są w `ui.js`. Kafelki Galerii przy najechaniu myszą lekko się przybliżają (ok. 1,04, 0,4 s), tylko przy `@media (hover: hover)`.

### Pasek i zakończenie

8. **Pasek w „Dzień po dniu”** (decyzja użytkownika). W pasku u góry (`.secnav-sum`, `#sum-text`, `summaryText`) w czasie przewijania „Dzień po dniu” podsumowanie „Mar 2027 · 15 days · Active” zamienia się na kropkę w kolorze miejsca i dzień z miejscem: „Day 6 · Hội An”; przy przejeździe „Day 3 · Hồ Chí Minh City → Đà Lạt” *(decyzja sesji)*. Liczy się dzień (wiersz dnia albo przejazdu), przez który idzie środek widocznej części pod paskiem (na telefonie pod paskiem i małą mapą), na zdarzeniu `scroll`, jak `syncMini`, żeby sonda mogła to sprawdzić. Gdy środek wypada na nagłówku postoju, galerii, wyborze motocykla albo notatkach, pasek pokazuje dzień, do którego blok należy: w nagłówku i galerii postoju jego pierwszy dzień, dalej ostatni miniony wiersz dnia; podsumowanie wraca dopiero nad pierwszym i pod ostatnim wierszem „Dzień po dniu”, żeby napis nie migał *(decyzja sesji, po pytaniu recenzenta opisu)*. „Change” zostaje. Napis zmienia się krótkim przenikaniem. Nad dniami i pod nimi pasek jak dziś. Tak samo na komputerze i telefonie. Teksty z istniejących (`dayRange`, nazwy miejsc), w obu językach; dla czytnika ekranu bez ogłaszania każdej zmiany.
9. **Zakończenie strony z trasą** (decyzja użytkownika: stałe zdjęcie zachodu słońca nad doliną Pù Luông, `puluong_1`; arkusz obejrzany w przeglądarce). Pod „Przed wyjazdem”, przed stopką: zdjęcie na całą szerokość, podpis „Pù Luông” w rogu, nad tytułem linijka z trasy o ostatnim dniu, np. „Day 15 · Hà Nội · Departure” (z istniejących tekstów dnia wylotu), tytuł, zdanie i trzy przyciski: „Copy plan for WhatsApp” (to samo działanie co `#copy-plan`, `bindCopy`), „Save as PDF” (jak `#pdf-plan`) i „Change the route” (do `#settings`). Komunikat po skopiowaniu widać przy przyciskach zakończenia *(dla wykonawcy: wspólny `#copy-status` albo drugi)*. Autor zdjęcia jest już na liście zdjęć, bo `puluong_1` należy do galerii Pù Luông. Do druku nie idzie (PDF ma własny koniec). Plik offline `Route-G.html` i fragment `out/web` dostają zakończenie tak samo; w pliku offline zdjęcie zakończenia w rozmiarze zdjęcia z góry strony (`OFFLINE["hero"]`, 1280 px), a nie 640 px, żeby nie było rozmyte; wykonawca podaje rozmiar pliku offline przed i po (dziś 7,1 MB, zmierzone w suchej próbie; wzrost rzędu 0,1–0,2 MB jest w porządku). Efekty z ustaleń 1–8 działają też w pliku offline (ten sam kod); sondy i zrzuty sprawdzają stronę z `out/pages`, plik offline tylko otwarcie i rozmiar *(decyzja sesji, po pytaniu recenzenta opisu)*.
10. **Teksty zakończenia** *(decyzja sesji, przyjęte z listą)*:
    - EN: „That’s your Vietnam.” / „Send it to whoever is coming with you, or keep it as a PDF.” / przycisk „Change the route”;
    - PL: „To twój Wietnam.” / „Wyślij trasę tym, którzy jadą z tobą, albo zapisz ją jako PDF.” / przycisk „Zmień trasę”;
    - pozostałe przyciski z istniejącymi napisami; tekst alternatywny zdjęcia w obu językach. Test treści `for every passport` musi przechodzić.
11. Podstrona zwierząt bez osobnego zakończenia *(decyzja sesji)*.

### Typografia

12. *(decyzja sesji)* `text-wrap: pretty` w akapitach obu stron; `::selection` w kolorze akcentu (`--accent-soft` tło, `--ink` tekst albo odwrotnie, czytelnie w obu motywach); cyfry nautyczne (`font-variant-numeric: oldstyle-nums`) w nagłówkach krojem Newsreader, jeśli pliki `site2/fonts/newsreader-*.woff2` mają funkcję `onum` (wykonawca sprawdza; jeśli nie, ta część odpada, bez nowych plików kroju). Nie w kafelkach liczb ani w krojach mono.

### Zasady dla wszystkiego

13. **„Ogranicz ruch”** (`prefers-reduced-motion: reduce`) wyłącza wszystko z ustaleń 1–8: stan końcowy od razu.
14. **Wydruk i PDF** w stanie końcowym; zakończenie (ustalenie 9) i zdjęcie na górze podstrony (ustalenie 4) poza drukiem. Liczba stron PDF jak przed planem: wykonawca mierzy ją przed zmianami (`tests/print.sh` dla strony z trasą z kosztami i bez, `PAGE=wildlife` dla trzech zakładek) i porównuje po.
15. **Telefon**: tylko `transform`, `opacity`, `stroke-dashoffset` i maski; ostateczna kontrola na iPhonie użytkownika przez domowe Wi-Fi (pamięć „Phone check on LAN”: lista do sprawdzenia tknięcie po tknięciu przed startem).
16. Bez nowych bibliotek, bez zmian tras, podglądu linku i `noindex`.
17. **Sprawdzanie**: nowa sonda (np. `tests/probes/polish.js`, nazwa dla wykonawcy) na stronie z trasą: zakończenie (jest pod „Przed wyjazdem”, linijka ostatniego dnia, trzy przyciski działają, poza drukiem), pasek w dniach (napis dnia ze środka przy kilku przewinięciach, powrót podsumowania nad i pod dniami, przy 390 i 1400 px), liczby w kafelkach (stan końcowy równy dzisiejszym liczbom), rysowanie trasy (elementy z długością kreski i stan końcowy bez przesunięcia), średni kolor ramek; `wild.js` rozszerzona o zdjęcie na górze (jest, z podpisem, zakładki pod nim, mapa dalej obok albo pasmem) i podgląd (strzałki, ← →, licznik, zestaw zakładki). Wszystko w obu językach, z `&lang=pl`. Ruch ręcznie w przeglądarce przez lokalny serwer, z zrzutami w jasnym i ciemnym motywie.
18. **Kolejność**: ten opis → plan z suchą próbą na gałęzi, obejrzany przez użytkownika w przeglądarce (jak `sucha-proba-mapa`) → wykonanie w świeżej sesji → punkt kontrolny (z telefonem) → końcowy przegląd na najmocniejszym modelu → publikacja za zgodą → notatki w [../etapy.md](../etapy.md) i `CLAUDE.md`. Testerzy dostają link po publikacji.

## Zmiany przy suchej próbie (20.10.2026)

Plan powstał z suchej próby na gałęzi `sucha-proba-wykonczenia` ([2026-10-20-wykonczenia.md](2026-10-20-wykonczenia.md)). Pięć rzeczy wyszło inaczej, niż zakłada opis wyżej. Wygląd dla odwiedzającego jest ten sam albo lepszy:

1. **Cyfry nautyczne odpadają** (ustalenie 12): kroje Newsreader w `site2/fonts/` nie mają funkcji `onum`; zrzut z `oldstyle-nums` i bez niego wygląda tak samo. Zostają `text-wrap: pretty` i kolor zaznaczenia.
2. **Zamiast View Transitions animacje po przebudowie** (ustalenie 2): `document.startViewTransition` podmienia stronę w następnej klatce, a strona (`syncForm`, `reportAdd`) i wszystkie sondy czytają nową trasę zaraz po `apply`. Kafelki paska wchodzą więc falą (Web Animations), a lista, dni i „Przed wyjazdem” płynnie się pojawiają. Kafelki nie przesuwają się na nowe miejsca, bo przy tej samej liczbie dni stoją tam, gdzie stały.
3. **Duk na szerokim ekranie** (ustalenie 4): kwadratowe zdjęcie na całą szerokość pokazywało przy 1366 i 1920 px same oczy i nos, z tytułem na pysku (anty-cel „przycięcie, przy którym ucierpi widok zwierzęcia”). Od 1101 px zdjęcie stoi więc w prawych dwóch trzecich, z maską przechodzącą w ciemne tło po lewej, a tytuł obok. Na telefonie zdjęcie jest na całą szerokość.
4. **Ruch tylko z rąk odwiedzającego** (ustalenia 1–3 i 8): Chrome bez okna woła IntersectionObserver raz, zaraz po otwarciu strony (i czasem po przewinięciu przez sondę), a animacje stoją w nim w miejscu. Ruch w JavaScripcie (rysowanie, fala, przenikanie, liczby, przenikanie napisu w pasku z dnia na dzień) idzie więc tylko po zmianie, którą zrobił odwiedzający (zdarzenie `isTrusted`), albo przy pierwszym pokazaniu po jego dotyku, kółku myszy lub klawiszu. Zmiana skryptem, jak w sondach, podmienia trasę od razu. Trasa rysuje się, gdy na ekranie jest ok. 45% mapy, a od pierwszego brzegu mapy czeka schowana. Dzięki temu na telefonie, gdzie mapa jest wyższa niż ekran, nie zaczyna się rysować, zanim widać południe. Klasa `live` (od IntersectionObservera) włącza tylko ruch w CSS: przybliżanie i wyłanianie zdjęć.
5. **Zdjęcie zakończenia ma też małe kopie** (ustalenie 9): `puluong_1` jest pierwszym zdjęciem galerii Pù Luông i wiersza listy „Nie ma na twojej trasie”, więc zachowuje kopie 160, 480 i 960 px i dostaje 1400 i 1920 px. Sonda `offroute.js` złapała to w suchej próbie. Plik offline ma 7,2 MB zamiast 7,1.

## Zostaje dla wykonawcy

- Dokładne czasy i krzywe w granicach podanych wyżej; kolejność rysowania odcinków między kadrami (kadr, w którym trasa się zaczyna, potem następne według dni).
- Sposób nabijania liczb bez szkody dla czytnika ekranu.
- Wysokość i punkt kadru zdjęcia na górze podstrony, rozmiary kopii zdjęcia w `build.py`.
- Gdzie trzymać średni kolor (dane w `photos.js`/`wildphotos.js` generowane przez build albo osobna mapa w skrypcie strony).
- Podział na zadania, sucha próba planu (pamięć „Dry-run plan method”) i zapis w [../etapy.md](../etapy.md) po skończonej pracy.
