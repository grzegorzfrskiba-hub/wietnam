# Atlas Wietnamu: opis projektu

Sesja decyzji 22.10.2026 (pytania i odpowiedzi z klikalną makietą). Opis do zaplanowania (superpowers:writing-plans, plan z suchą próbą) i wykonania w osobnych sesjach. Decyzje 1–10 podjął użytkownik (wszystkie według rekomendacji); ustalenia 1–26 to dopowiedzenia sesji, przyjęte przez użytkownika w jednym kroku. Rzeczy oznaczone *(dla wykonawcy)* zostają do ustalenia w planie.

## Po co

Słowa użytkownika: Route G ma służyć nie tylko do zaplanowania trasy, ale też jako „piękny ilustrowany atlas”. Potrzebna jest podstrona z przeglądem wszystkich miejsc z puli, z której planer układa trasy, działająca jak podstrona zwierząt `…/wietnam/wildlife/` (etap 6, `site2/src/wild.html`, `wildapp.js`): przy przewijaniu miejsce zapala się na mapie, po jednej stronie stoi mapa, po drugiej duże zdjęcia.

Atlas jest drugim sposobem korzystania ze strony, obok planera: do oglądania przed ustawieniem czegokolwiek (inspiracja) i do obejrzenia miejsc swojej trasy i tych, których na niej nie ma. Wskazówki z wcześniejszych sesji, które tu obowiązują: przy każdej pozycji obraz, nigdy sam suchy tekst; mapy są bardzo ważne, czytelnik ma zawsze wiedzieć, gdzie jest to, o czym czyta; strona ma się ruszać przy przewijaniu, łagodnie i z wyłączeniem przy „ogranicz ruch”.

## Cele

1. Nowa podstrona `…/wietnam/atlas/`, „Atlas Wietnamu” / “Atlas of Vietnam”, z 20 miejscami puli w trzech regionach, z północy na południe.
2. Każde miejsce to karta z jednym dużym zdjęciem na całą kolumnę i paskiem pozostałych zdjęć, który otwiera album miejsca, a pod zdjęciem krótkie hasła i obrazki z danych, które już są (bez nowych tekstów miejsc).
3. Obok przyklejona mapa całego kraju (na telefonie pasmo u góry), na której zapala się miejsce ze środka ekranu, jak na podstronie zwierząt.
4. Atlas zna trasę z linku: przy miejscach trasy ✓ i dni, przy pozostałych powód, „Po dodaniu wypadnie: …” i „Dodaj do trasy”.
5. Wejścia ze strony z trasą (nagłówek, pasek, każde miejsce) i z podstrony zwierząt.

## Poza zakresem

- Nowe teksty miejsc i nowy research faktów (decyzja 2). Jedyne nowe teksty to interfejs atlasu (ustalenie 10).
- Nowe zdjęcia z Commons: to osobny krok po atlasie (decyzja 6, ustalenie 22). W planie atlasu tylko zmiana kolejności zdjęć dwóch miejsc (ustalenie 21).
- Przybliżanie mapy do regionu (decyzja 4: zawsze cały kraj).
- Zakładki: atlas to jedna strona do przewijania; linki do regionów pod nagłówkiem tylko przewijają (ustalenie 3).
- Wydarzenia i ostrzeżenia z kart miejsc (ustalenie 9), wersje łatwe dni, plan na jedną noc, „do pominięcia” i „zamiast tego” (ustalenie 8).
- Silnik, trasy i liczby wszystkich tras bez zmian; strona z trasą bez zmian poza nowymi linkami i kolejnością zdjęć dwóch miejsc (ustalenia 19–21).
- Plik offline i fragment `out/web`: atlasu w nich nie ma, jak podstrony zwierząt.

## Czego nie chcemy (anty-cele)

- Sam suchy tekst przy miejscu: każda karta zaczyna się dużym zdjęciem, a pora roku jest obrazkiem, nie zdaniem.
- Druga kopia treści miejsc do pilnowania: atlas czyta teksty z `site2/src/content/` i `site2/src/en/content/`, nie z własnych plików.
- Ślepa uliczka: z każdego miejsca da się wrócić do planera (✓ z dniami albo „Dodaj”), z trasą z linku.
- Ruch, którego nie da się wyłączyć: przy `prefers-reduced-motion: reduce` wszystko stoi od razu na miejscu.
- Zmiana tras albo wyglądu strony z trasą poza ustaleniami 19–21.

## Ograniczenia

- Zasady z `CLAUDE.md`: każdy nowy tekst od razu po polsku i po angielsku, te same fakty; treść dla podróżnych z całego świata; zdjęcia tylko na licencjach CC0, CC BY, CC BY-SA albo z domeny publicznej; bez `git push` i publikacji bez zgody; repo publiczne.
- Bez node: testy w JavaScriptCore (`tests/run.sh`), sondy w Chrome bez okna (`tests/probe.sh`); Chrome bez okna woła IntersectionObserver raz i nie odtwarza animacji, a ruch idzie tylko z rąk odwiedzającego (pułapki w „Jak sprawdzać” w `CLAUDE.md`). Zapalanie mapy musi iść na zdarzeniu `scroll`, jak na podstronie zwierząt, żeby sonda mogła je sprawdzić.
- **Druga sesja (22.10.2026) zmienia podstronę zwierząt**: „Galeria po kolei” z przełącznikiem „Po kolei · Mozaika” (`wildapp.js`, `wild.html`, `wildui.js`, sondy `wild.js` i `wildmap.js`, `tests/content.test.js`, `notes/etapy.md`), zacommitowane i opublikowane jeszcze w czasie tej sesji (`0c72bd7`–`9e8b821`); `wildapp.js` dostał `renderGallery` z widokiem po kolei, `mapEls` i `elPlaces` czytają gatunek z `data-sp`, lista funkcji z ustalenia 14 się nie zmienia. Ta sama sesja pracowała potem dalej (m.in. `photos.js`, `content/hagiang.js`, `template.html`), więc plan atlasu powstaje na `main` po jej zakończeniu (ustalenie 25), a te notatki czekają na gałęzi `atlas-projekt`.

## Decyzje użytkownika (22.10.2026)

1. **Trasa z linku:** atlas zna trasę, jak podstrona zwierząt. Bez linku zwykły atlas; z linku przy miejscach trasy ✓ i dni pobytu, a przy pozostałych „Dodaj do trasy” z zapowiedzią „Po dodaniu wypadnie: …” (odrzucone: same znaczki bez „Dodaj”; atlas bez trasy).
2. **Treść miejsca:** to, co już jest na stronie, plus obrazki z danych: linijka z charakterem, „czym to jest”, ukryta perełka, „Co tu robić” z tytułów dni, pasek 12 miesięcy i liczba nocy, przy 10 miejscach „Zwierzęta tutaj →”; bez nowych tekstów do researchu (odrzucone: nowy opis miejsca, 60–90 słów, 20 tekstów w dwóch językach; same zdjęcia z podpisami).
3. **Układ miejsca: A, karta i album** (jak karty zwierząt): jedno duże zdjęcie na całą kolumnę, pod nim pasek pozostałych, które otwierają album (odrzucone: C, mozaika, zdjęcie na 2/3 szerokości i dwa obok; B, każde zdjęcie duże jedno pod drugim). Pomiar w makiecie (22.10.2026): przy 1400 × 900 px ok. 1350 px na miejsce, cały atlas ok. 27 900 px, 31 ekranów (C: 24 ekrany, B: 76); przy 375 × 812 px ok. 1115 px na miejsce, 29 ekranów (C: 30, B: 54).
4. **Mapa:** zawsze cały kraj, jak na podstronie zwierząt; zapalona kropka jedzie w dół kraju razem z przewijaniem (odrzucone: przybliżanie regionu).
5. **Kolejność:** z północy na południe; przewijanie w dół przesuwa kropkę w dół mapy (odrzucone: z południa na północ, jak przewodnik zwierząt).
6. **Zdjęcia: dwa kroki.** Najpierw atlas z istniejących 96 zdjęć miejsc, a lepsze z nich idą na pierwsze miejsce (Yok Đôn, Cúc Phương); potem osobna runda nowych zdjęć z Commons dla najsłabszych miejsc, każdy krok za zgodą (odrzucone: najpierw nowe zdjęcia dla wszystkich miejsc; tylko to, co jest).
7. **Nazwa:** „Atlas Wietnamu”, po angielsku “Atlas of Vietnam”, adres `…/wietnam/atlas/` (odrzucone: „Miejsca Wietnamu” / “Places of Vietnam”; „Atlas Route G”).
8. **Zdjęcie na górze:** tarasy pod przełęczą Khau Phạ, Mù Cang Chải (`mucangchai_1`), także w podglądzie linku (odrzucone: przełęcz Mã Pí Lèng o zachodzie, `hagiang_0`; dżonki na Zatoce Lan Hạ, `catba_0`).
9. **Wejścia:** jak do zwierząt, plus przy miejscach: „Atlas” obok „Zwierzęta” pod tytułem (na telefonie w rogu zdjęcia) i w pasku u góry; „W atlasie →” w każdej karcie miejsca i w każdym wierszu „Nie ma na twojej trasie” (odrzucone: tylko na górze strony; na górze i jedna linijka przy liście).
10. **Kolejność prac:** atlas teraz, potem runda nowych zdjęć i następna runda poprawek (odrzucone: najpierw runda poprawek). Linki dla anglojęzycznych testerów niezależnie, w każdej chwili.

## Ustalenia (przyjęte w jednym kroku)

### Podstrona i adres

1. Osobne pliki jak przy zwierzętach: `site2/src/atlas.html`, `site2/src/atlasapp.js`, teksty interfejsu w `site2/src/atlasui.js` i `site2/src/en/atlasui.js` (nazwy *dla wykonawcy*). `site2/build.py` buduje je do `out/pages/atlas/index.html`, z tymi samymi krojami, kolorami (jasny i ciemny motyw, tokeny `:root` jak w `wild_page`), przełącznikiem EN · PL (`&lang=pl`) i `noindex`; bez pliku offline i bez `out/web`.
2. Nagłówek: „Route G”, „Atlas Wietnamu” / “Atlas of Vietnam” i jedno zdanie pod tytułem (nowy tekst w obu językach; szkic z makiety: „Dwadzieścia miejsc, z których Route G układa trasy, od gór na północy po wyspy na południu: jak wyglądają, kiedy jechać i co tam robić.”). Zdjęcie `mucangchai_1` powoli się przybliża, jak na innych stronach, a na szerokim ekranie stoi w prawych dwóch trzecich, jak duk na podstronie zwierząt (kadr *dla wykonawcy*; w makiecie 72% szerokości i `object-position: 50% 60%`). Własny podgląd linku po angielsku z tym zdjęciem (jak `WILD_PREVIEW` i `og-wild.jpg`).
3. Pod nagłówkiem trzy linki: Północ · Środek · Południe, które przewijają do nagłówka regionu (to nie zakładki). W nagłówku „← Twoja trasa” albo „← Zaplanuj trasę” (jak `w.back.trip` i `w.back.plan`) i link „Zwierzęta”; podstrona zwierząt dostaje w nagłówku link „Atlas”. Oba niosą trasę z linku.
4. Adres z miejscem, np. `…/atlas/#hoian` (z ustawieniami trasy po nim, jak `#guide-<miejsce>` w `wildView` i `wildHash`), otwiera atlas na tym miejscu i zapala je, dopóki strona się nie przesunie (jak link do miejsca przewodnika po końcowym przeglądzie mapy zwierząt). Tam prowadzą „W atlasie →” ze strony z trasą (ustalenie 19).

### Miejsce (układ A)

5. Karta: duże zdjęcie 3:2 (do 780 px, na telefonie cała szerokość) z podpisem na zdjęciu, pod nim pasek pozostałych zdjęć miejsca (3–4 miniatury). Zdjęcie i miniatury otwierają album miejsca: jego zdjęcia w kolejności `photos`, strzałki, klawisze ← →, przesunięcie palcem i licznik, jak album podstrony zwierząt; pod zdjęciem podpis, nazwa miejsca, autor i licencja (`PHOTO_META` w `site2/src/photos.js`, podpisy angielskie w `site2/src/en/photos.js`).
6. Kolejność w karcie: region; nazwa (`name`); linijka z charakterem (`sub`); zainteresowania z dopasowaniem 2–3 (`fit` w `places.js`, nazwy z `int.*` w `ui.js`, od najlepiej dopasowanego); ✓ z dniami pobytu, gdy miejsce jest na trasie (dwa pobyty przy trasie w kółko); „czym to jest” (`what`); „Kiedy jechać” (ustalenie 7); „Co tu robić” (ustalenie 8); ukryta perełka (`gem`, etykieta `t.gem`); na końcu ramka trasy (ustalenie 17) i „Zwierzęta tutaj →” przy 10 miejscach z `WILD_GUIDE_PLACES` (do `…/wildlife/#guide-<miejsce>`).
7. „Kiedy jechać”: 12 pól z krótkimi nazwami miesięcy (`mon3.*`) w kolorach dobrej, średniej i złej pory (`SEASONS`; zamknięte szare). Przy trasie z linku jej miesiące stoją w ramce. Przy średnich i złych miesiącach powód z danych pogody (`CLIMATE[id].why`, teksty `wx.*`, np. „pora deszczowa”, „powodzie”) po najechaniu i w opisie dla czytnika ekranu (np. etykieta paska wymieniająca miesiące według pory; *dla wykonawcy*). Legenda raz, we wstępie. Kolory czytelne w obu motywach (nowe tokeny w jasnym i ciemnym). Na telefonie nie ma najechania, więc tknięcie pola (i najechanie albo fokus na komputerze) pokazuje pod paskiem jedną linijkę, np. „listopad: zła pora, powodzie”; bez tknięcia pasek jest sam *(decyzja sesji po przeglądzie opisu)*.
8. „Co tu robić”: tytuły dni ze zwykłych planów (`days[].t`) w kolejności pobytu (`o`), bez powtórek, i „Ekstremalnie: …” przy trudnych wersjach (`hard.t`); bez wersji łatwych, planu na jedną noc (`solo`), drugiego pobytu (`again`), „do pominięcia” i „zamiast tego”. Liczba nocy z `nights` w `places.js` jako „od–do” z właściwą odmianą („1–3 noce”, „4–5 nocy”; po angielsku “nights”), np. „Co tu robić · 2–4 noce na trasie”.
9. Bez wydarzeń i ostrzeżeń (`events`): zostają na stronie z trasą, gdzie są przypięte do dat; porę roku pokazuje pasek.
10. Nowe teksty tylko interfejsu, ok. 25 kluczy, w obu językach (tytuł, zdanie pod tytułem, wstęp, regiony z liczbą miejsc z polską odmianą „10 miejsc”, „4 miejsca”, legenda pory roku, „Co tu robić”, noce, „W atlasie →”, „Atlas”, etykiety dostępności). Testy dwóch języków pilnują tych samych kluczy; teksty miejsc z `content/` i `en/content/` bez zmian. Reszta słów jak na podstronie zwierząt i liście „Nie ma na twojej trasie” (`off.*`, `lvl.*`, `mon.*`, `term.month`).

### Kolejność i mapa

11. 20 miejsc puli, bez nocy w drodze (`hanoiStop`, ma `node`), z północy na południe według `axis` w `places.js` (malejąco): północ: Mù Cang Chải, Sa Pa, Hà Giang, Cao Bằng, Ba Bể, Hà Nội, Cát Bà, Ninh Bình, Cúc Phương, Pù Luông; środek: Phong Nha, Huế, Đà Nẵng, Hội An; południe: Yok Đôn, Đà Lạt, Cát Tiên, Hồ Chí Minh City, Phú Quốc, delta Mekongu. Region z pola `region` w treści miejsca.
12. Nagłówki regionów z liczbą miejsc („Północ · 10 miejsc”, „Środek · 4 miejsca”, „Południe · 6 miejsc”). Nagłówek regionu na środku ekranu zapala na mapie wszystkie miejsca regionu (bez nazw przy kropkach, w podpisie mapy nazwa regionu z liczbą miejsc). Zapala się tylko na chwilę, gdy nagłówek mija środek ekranu, jak w przyjętej makiecie; nie trzymamy go dłużej *(decyzja sesji po przeglądzie opisu)*.
13. Mapa jak na podstronie zwierząt: cały kraj w ramce `COUNTRY_MAP` z zarysem `OUTLINE`; od 1101 px przyklejona obok kart, węziej pasmo u góry (mapa 180 px wysoka i podpis obok). Kropki 20 miejsc w kolorach miejsc (`--pal-<color>`); z trasą linie dróg i lotów, postoje i pierścienie miejsc spoza trasy, z kluczem „● na twojej trasie · ○ poza nią”. Zapala się karta, przez którą idzie środek ekranu (poniżej 1101 px środek części pod pasmem), karta pod myszą albo z fokusem; podpis: nazwa i dni na trasie. Kropka pod myszą obwodzi swoją kartę, kliknięta (tknięta) przewija do niej. Mapa ukryta przed czytnikiem ekranu; przy „ogranicz ruch” bez pulsowania. Wydruk w ustaleniu 23.
14. Kod mapy, pasma, zapalania, albumu, wjeżdżania kart i zdjęć z koloru jest wspólny z podstroną zwierząt (dziś w `wildapp.js`: `renderMap`, `light`, `lightNow`, `mapItems`, `middleLine`, `prepRise`, `rise`, album; w `wildpage.js`: `wildMapData`, `midItem`, `labelSides`, `tripStays`, `termMonths`, `tripLink`, `wildHash`). Czy wydzielić go do wspólnego pliku, czy wziąć kopię, decyduje plan *(dla wykonawcy)*; sondy podstrony zwierząt (`wild.js`, `wildmap.js`) mają przechodzić jak przed planem. Uwagi z listy następnej rundy o mapie podstrony zwierząt (pasmo na niskim ekranie, szerokość mapy przy 1101–1250 px, obwódki po tknięciu kropki) dotyczą wtedy obu stron.
15. Karty łagodnie wjeżdżają na ekran, a zdjęcia doczytane później wyłaniają się ze swojego średniego koloru (`data-ph` z `build.py`), jak na podstronie zwierząt; bez ruchu przy „ogranicz ruch”, bez JavaScriptu i w druku.

### Trasa z linku

16. Ta sama trasa co na stronie z trasą: te same funkcje co na podstronie zwierząt (`settingsFromLink`, `planRoute`, `whyOff`, `tripStays`, `selfSwaps`). We wstępie ramka „Twoja trasa: marzec 2027 · 15 dni · Aktywnie. Miejsca: …” (jak `w.trip` i `w.trip.places`), a legenda pory roku mówi, że w ramce jest miesiąc trasy.
17. Przy miejscu spoza trasy: powód jak na liście „Nie ma na twojej trasie” (`off.r.*` z `whyOff`, np. „przy 15 dniach wygrały inne miejsca”), potem „Po dodaniu wypadnie: …”, „Zmieści się bez usuwania innych miejsc, ale skróci pobyt w: …” albo „Zmieści się bez usuwania innych miejsc.” (`off.drops`, `off.shorter`, `off.nodrops`) i przycisk „Dodaj X do trasy”, który wraca do strony z trasą z `dodaj=X` (`tripLink`). Miejsce, którego nie da się dodać, mówi to z powodem. Bez trasy „Dodaj X do trasy” otwiera planer z tym miejscem, jak na podstronie zwierząt. Przykład z makiety (silnik, 22.10.2026): trasa z Hồ Chí Minh City do Hà Nội, 15 dni, marzec 2027, przyroda, Aktywnie: Cát Tiên dni 1–2, Đà Lạt 3–5, Yok Đôn 6–7, Đà Nẵng 8–9, Phong Nha 10–12, Cúc Phương 13–14; Hội An: „nie pasuje do tego, co lubisz”, po dodaniu wypadnie Đà Nẵng; Hà Giang: wypadną Đà Lạt, Đà Nẵng, Phong Nha i Cúc Phương.
18. Linki z atlasu (powrót, „Dodaj”, „Zwierzęta tutaj →”, „Zwierzęta” w nagłówku) niosą trasę, koszty (`koszty=1`) i język, jak linki podstrony zwierząt.

### Wejścia

19. Strona z trasą: „Atlas” obok „Zwierzęta” pod tytułem, na telefonie w rogu zdjęcia, obok „Zwierzęta” (pomiar 22.10.2026 przy 320 px: „Zwierzęta” zajmuje x 12–100 px, EN · PL x 219–316 px, wolne ok. 119 px, „Atlas” ok. 55 px; sonda `settings.js` pilnuje, że pole miesiąca zostaje na pierwszym ekranie telefonu); w pasku u góry od szerokości, przy której się mieści (*dla wykonawcy*, z sondą). „W atlasie →” obok „Zwierzęta tutaj →” w karcie miejsca (`wildHere` w `app.js`, przy pierwszym pobycie, jak tam) i w rozwiniętym wierszu „Nie ma na twojej trasie”; oba do `…/atlas/#<miejsce>` z trasą. W druku ukryte, jak linki do zwierząt. Wygląd (decyzja użytkownika z 22.10.2026, po zmianie „Zwierzęta”): na zdjęciu pod tytułem oba z obrysem jak „Zobacz trasę” (`ghost`), w pasku u góry oba wypełnione: „Zwierzęta” w jadeicie (`--accent`), „Atlas” w niebieskim (`--cool`: #23558a, w trybie ciemnym #8ab8ec; napis w `--surface`, kontrast 6,6:1 i 8,2:1); w pasku oba dopiero po zniknięciu zdjęcia (`at-hero`).
20. Poza tym strona z trasą bez zmian: trasy, liczby z `tools/liczby.sh`, wydruk i PDF (tyle samo stron, bez zakrytych linii).

### Zdjęcia

21. Krok 1 (w planie atlasu): 96 zdjęć miejsc, które już są (`photos` w treści miejsc, kopie stron z `build.py`). Na pierwsze miejsce w `photos` idą rzeka Sêrêpốk w Yok Đôn (`yokdon_1` zamiast zamglonego widoku `yokdon_0`) i leśna ścieżka w Cúc Phương (`cucphuong_1` zamiast duka za siatką ośrodka ratowania, `cucphuong_0`); to zmienia też stronę z trasą (miniatura i zdjęcie w liście „Nie ma na twojej trasie”, karta miejsca), za zgodą użytkownika.
22. Krok 2 (po atlasie, osobno): nowe zdjęcia z Wikimedia Commons dla najsłabszych miejsc, na start Sa Pa (żadne z pięciu nie jest mocne), Đà Nẵng (sala muzeum i droga), Yok Đôn i Cúc Phương, zwykłą drogą (pamięć „Photo selection process”): kandydaci, miniatury za zgodą, arkusz, kopie 1920 px za zgodą, wpisy w `photos.js`, `en/photos.js` i `photos/meta.json`; trafiają na obie strony.

### Druk, sprawdzanie, proces

23. Wydruk na A4 jak na podstronie zwierząt: mapa raz, ze wszystkimi miejscami, karty po dwie w rzędzie z dużym zdjęciem, bez paska miniatur, przycisków i linków; `tests/print.sh` bez zakrytych linii. 20 nazw nie zmieści się na mapie 70 mm (Ninh Bình, Cúc Phương i Pù Luông leżą w pasie ok. 3 px, cztery miejsca północy w ok. 12 px), więc w druku kropki mają numery 1–20 w kolejności atlasu, a każda karta w druku ten sam numer przed nazwą *(decyzja sesji po przeglądzie opisu)*.
24. Testy: czyste funkcje atlasu (kolejność według `axis`, regiony i ich liczby, noce z odmianą, dane paska pory roku z powodami, kolejność zdjęć Yok Đôn i Cúc Phương) w nowym pliku testów w `tests/run.sh`; teksty interfejsu w obu językach. Nowa sonda `tests/probes/atlas.js` z `PAGE=atlas` (przyjmą go też `shot.sh` i `print.sh`): 20 kart w kolejności, trzy regiony, 20 kropek, zapalanie przy przewinięciu i najechaniu, nagłówek regionu, pasmo poniżej 1101 px, ✓ i „Dodaj” z zapowiedzią na prawdziwej trasie, adres z miejscem, album, EN · PL, 320–1400 px bez przewijania w bok, druk. Sonda wejść na stronie z trasą (rozszerzona `wildlink.js` albo nowa) i `settings.js` przy 320 px.
25. Proces jak przy etapie 6: plan z suchą próbą w nowej sesji, gdy druga sesja zacommituje „Galerię po kolei” na `main`; wykonanie w kolejnej świeżej sesji; punkt kontrolny z użytkownikiem (zrzuty i przeglądarka, telefon przez Wi-Fi), końcowy przegląd na modelu Fable, publikacja za zgodą, każdy krok osobno.
26. Notatki: ten opis; etap 7 w `notes/etapy.md` z decyzjami i ustaleniami; krótko w `notes/wizja.md`; wskaźnik w `CLAUDE.md`; skrypt makiety w `notes/makieta-atlas/`.

## Makieta

Klikalna makieta z sesji: `notes/makieta-atlas/` (`make.py`, `body.html`, `atlas.css`, `atlas.js`), do wyrzucenia, nie wzór kodu. Czyta prawdziwe źródła (`site2/src/`), zdjęcia ze zbudowanej strony (`site2/out/pages/img`) i kod mapy podstrony zwierząt; ramka „Tylko w makiecie” przełącza układ (A, B, C), mapę (cały kraj, przybliżanie regionu), kolejność i trasę z linku. Uruchomienie: `python3 site2/build.py`, potem `python3 -I notes/makieta-atlas/make.py . <katalog poza repo>` i lokalny serwer z tego katalogu (`python3 -m http.server … --directory <katalog>`), adres `…/atlas/`. Przybliżanie regionu było tylko powiększeniem konturu kraju (kanciaste brzegi); odrzucone (decyzja 4).

## Przegląd opisu (22.10.2026)

Świeży recenzent (model Fable) przeczytał opis, kod podstrony zwierząt, strony z trasą, `build.py`, dane, testy i makietę jako wykonawca. Trzy pytania, rozstrzygnięte przez sesję (ustalenia 7, 12 i 23, oznaczone): nazwy na mapie w druku, powód pory roku na telefonie, czas zapalenia nagłówka regionu. Potwierdził, że „Galeria po kolei” jest już na `main` i nie zmienia ustalenia 14.

## Zostaje dla wykonawcy

- Nazwy plików i podział kodu (ustalenie 14), z warunkiem, że sondy podstrony zwierząt przechodzą jak przed planem.
- Ostateczne brzmienie nowych tekstów interfejsu po polsku i po angielsku, w granicach zasad z `notes/wizja.md`.
- Kadr zdjęcia na górze przy 390, 1024 i 1400 px, kolory pory roku w obu motywach (kontrast), odstępy i wielkości.
- Szerokość, od której „Atlas” mieści się w pasku u góry strony z trasą.
- Podział na zadania, sucha próba (pamięć „Dry-run plan method”) i zapis w `notes/etapy.md` po skończonej pracy.
