# Etap 6: podstrona zwierząt (…/wildlife/) — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Zadania mają nagłówki „### Zadanie N:”, a nie „Task N”, więc pomocnicze skrypty `task-start` i `task-brief` ich nie znajdą: wycinaj zadanie od „### Zadanie N:” do następnego „### Zadanie” albo do „## Jak sprawdzać”, nigdy do pierwszego „## ” (kroki mają nagłówki Markdown w blokach kodu).

**Cel:** etap 6 według sesji decyzji z 16.10.2026 (`notes/etapy.md`, „## Etap 6”): Route G dostaje podstronę „Zwierzęta Wietnamu” / “Wildlife of Vietnam” pod `…/wietnam/wildlife/`, z trzema zakładkami. Kolejno:
- **pomiary przed planem** (bez commita): liczby wszystkich tras, strony PDF trzech tras, sondy w obu językach;
- **funkcje podstrony:** adres z zakładką i trasą, link z powrotem, to, co trasa znaczy dla spotkania (na trasie, w planie dnia, w terminie), kolejność kart i wiersze przewodnika;
- **dane i teksty:** 29 gatunków (16 na kartach „Na trasie”, 25 w galerii, z nich 5 legend), przewodnik po 10 miejscach, „Czego unikać”, „Poza Route G”, po polsku i po angielsku; 27 zdjęć z Wikimedia Commons;
- **podstrona:** osobny plik obok strony z trasą, z przełącznikiem EN · PL i `noindex`, zakładki „Na trasie”, „Galeria” i „Przewodnik”;
- **wejścia na stronie z trasą:** „Zwierzęta” pod tytułem i w pasku u góry, „Zwierzęta tutaj →” przy miejscach z wpisem w przewodniku;
- na końcu punkt kontrolny, końcowy przegląd świeżego recenzenta, publikacja za zgodą i notatki.

**Architektura:**
- **Silnik bez zmian.** `stopDays` w `page.js` dopisuje przy każdym dniu pole `plan` (`{ p, v }`: z którego planu tekstów miejsca jest dzień i z jakiej wersji), nic więcej; trasy i liczby z `tools/liczby.sh` są po planie takie same jak przed nim.
- **Podstrona to osobny plik** `site2/out/pages/wildlife/index.html`, który `site2/build.py` buduje z `site2/src/wild.html`: tokeny kolorów (z ciemnym motywem) wycina z `template.html`, kroje i obrazy bierze z folderu wyżej (`../fonts/`, `../img/`), a swoje zdjęcia zapisuje w `img/wild/` z kopiami 480 i 960 px. Skrypty: te same, którymi strona z trasą planuje trasę i nazywa miejsca (`WILD_SCRIPTS`), potem `wildpage.js` (czyste funkcje), `wild.js` z `en/wild.js` (dane i teksty), `wildphotos.js` z `en/wildphotos.js`, `wildui.js` z `en/wildui.js` (interfejs) i na końcu `wildapp.js` (logika z DOM). Podstrony nie ma w pliku offline ani w `out/web`.
- **Adres:** `#route`, `#gallery`, `#guide` albo `#guide-<miejsce>`, za nim ustawienia trasy jak na stronie z trasą (`pageHash`: `&koszty=1`, `&lang=pl` na końcu); `parseLink` pomija zakładkę. Z trasą w linku podstrona planuje tę samą trasę tym samym silnikiem, a `whyOff` mówi przy „Dodaj”, co wypadnie.
- **Strona z trasą** dostaje tylko wejścia (`wildLink` i `wildHere` w `app.js`, `WILD_GUIDE_PLACES` w `content.js`), schowane w druku.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, zrzuty); Chrome bez okna (sondy, zrzuty, wydruk); natywne okno `<dialog>` przeglądarki dla podglądu zdjęcia.

**Specyfikacja:**
- [notes/etapy.md](../etapy.md), „## Etap 6” i „Z sesji decyzji etapu 6 (16.10.2026)”: 10 decyzji i 27 ustaleń;
- [research/zwierzeta-2026-10.md](../../research/zwierzeta-2026-10.md): gatunki przy miejscach Route G, ośrodki, etyka, poza Route G, legendy, fakty galerii (sekcja „Galeria: pięć gatunków…”) i trzy fakty sprawdzone przed planem (EPRC, Núi Đôi, Đảo Tiên);
- [research/zwierzeta-zdjecia-2026-10.md](../../research/zwierzeta-zdjecia-2026-10.md): kandydaci z Commons i wybór 27 zdjęć z sumami SHA-256 (sekcja „Wybór do podstrony (16.10.2026)”);
- [notes/makieta-zwierzeta.html](../makieta-zwierzeta.html): makieta przyjęta w sesji decyzji;
- ustalenia z sesji planowania (niżej), zatwierdzone przez użytkownika razem z arkuszem wszystkich tekstów PL | EN i dwoma arkuszami zrzutów (390 i 1400 px, po angielsku i po polsku).

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS (podstrona bierze tokeny strony z trasą);
  - `engine.js`, `page.js` i `wildpage.js` bez DOM; dane wchodzą przez argumenty;
  - komentarze w kodzie po angielsku; teksty dla czytelnika po polsku w `wild.js`, `wildphotos.js`, `wildui.js` i `ui.js`, po angielsku w `en/`.
- **Silnik bez zmian:** `engine.js`, `places.js`, `seasons.js`, `climate.js`, `travel.js`, `costs.js`, `before.js` i `holidays.js` się nie zmieniają; `tools/liczby.sh` daje po planie dokładnie to samo co przed nim (zadanie 6, krok 3).
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, a łącznik bez szerokości `\u2060`, nigdy same znaki. Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, w `var NB = '…';`. Po każdym zadaniu `grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"` nic nie wypisuje.
- **Grep w planie:** w narzędziu Bash `grep` to nakładka zsh, która pomija pliki binarne i pisze ścieżki bez `./`, a bloki uruchamiane przez `bash -c` biorą `/usr/bin/grep`. Dlatego każdy grep po katalogach ma `-I`.
- **Teksty:** każdy tekst od razu w obu językach, z tymi samymi faktami (testy `wildlife in two languages`, `wildlife interface`); po polsku do czytelnika per „ty”, bez form rodzajowych (także w etykietach opcji w rozmowie z użytkownikiem), wietnamskie nazwy z diakrytykami, cudzysłów „…”, półpauza w zakresach; po angielsku brytyjski, typograficzne “ ” i ’; dla każdego paszportu, ceny tylko w dongach. Zasada podstrony (`notes/wizja.md`, „Podstrona zwierząt”): zdanie zostaje, gdy jest prawdziwe, ma źródło i datę w `research/` i pomaga zobaczyć zwierzę albo pokazuje, czym jest wyjątkowe; przy legendach stoi wprost, że turysta ich nie zobaczy. Nowe fakty tylko z `research/zwierzeta-2026-10.md`.
- **Zdjęcia:** 27 zdjęć podstrony leży w `photos/wild/` głównej kopii repo (`photos/` nie jest w gicie), sumy SHA-256 w `research/zwierzeta-zdjecia-2026-10.md`; nic się nie pobiera. Licencje tylko CC0, CC BY, CC BY-SA albo domena publiczna (`tools/licenses.sh`).
- **Strona z trasą:** poza wejściami bez zmian: trasy, liczby, wydruk i PDF (tyle samo stron trzech tras), sondy jak przed planem; na telefonie pole miesiąca dalej na pierwszym ekranie (sonda `settings.js`).
- **`noindex` zostaje** na obu stronach (`NOINDEX = True` w `site2/build.py`).
- **Testy:** `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu; pełny test (`--full`) w punkcie kontrolnym. `tests/run.sh` zatrzymuje się na pierwszym pliku testów z błędem, więc krok 2 pokazuje pierwszy błąd.
- **Commity:** jeden na zadanie 2–5, pliki po nazwie (`git add <pliki>`), opis po polsku, na końcu `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. `git push` tylko za zgodą użytkownika (zadania 8 i 9).
- **Repo jest publiczne:** do commita nie trafiają dane osobowe ani linki z terminami znajomych.

## Na co uważać przy przeglądzie

Pięć sytuacji, w których podstrona najłatwiej zawiedzie odwiedzającego, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Link z trasą, której nie da się ułożyć, albo z błędnym polem.**
   - Ryzyko: podstrona się wysypuje albo pokazuje ✓ i ✗ dla innej trasy niż ta, z której ktoś przyszedł.
   - Oczekiwane: podstrona liczy trasę tak jak strona z trasą (`settingsFromLink` z tymi samymi ustawieniami domyślnymi), a gdy trasy nie ma, zachowuje się jak bez trasy: bez ✓ i ✗, „Dodaj” otwiera planer.
   - Sprawdzenie: sonda `wild.js` na linkach z trasą i bez (zadanie 4), ręcznie w zadaniu 6, krok 6 (link z `dni=3`).
2. **Plan dnia, poziom i termin.**
   - Ryzyko: „W planie dnia” przy pobycie na jedną noc, przy poziomie, na którym wersja dnia mówi co innego, albo poza porą zwierzęcia (świetliki w lutym).
   - Oczekiwane: spotkanie jest w planie dnia tylko wtedy, gdy dzień trasy pochodzi z jednego z planów spotkania (`plan: [[p, wersja]]`) i wypada w miesiącu zwierzęcia; przy złym miesiącu „✗ Nie w twoim terminie, tylko …”.
   - Sprawdzenie: `tests/wild.test.js` na prawdziwych trasach (zadanie 2) i sonda `wild.js` dla maja i lutego 2027 (zadanie 4).
3. **„Dodaj” i powrót na stronę z trasą.**
   - Ryzyko: link gubi język, koszty albo zmiany trasy (dodane i usunięte miejsca, motocykl); zapowiedź „Po dodaniu wypadnie” mówi co innego niż lista na stronie z trasą.
   - Oczekiwane: `tripLink` to `pageHash` ustawień z linku z dopisanym miejscem; zapowiedź z tego samego `whyOff` co lista „Nie ma na twojej trasie”.
   - Sprawdzenie: `tests/wild.test.js` (zadanie 2), sonda `wild.js` (zadanie 4), ręcznie w zadaniu 6, krok 6 (kliknięcie „Dodaj” i porównanie z listą).
4. **Telefon i szerokości.**
   - Ryzyko: poziome przewijanie przy 320 px, za małe przyciski, link „Zwierzęta” spychający formularz strony z trasą pod pierwszy ekran albo niemieszczący się w pasku.
   - Oczekiwane: bez poziomego przewijania od 320 px, przyciski i zakładki co najmniej 44 px; „Zwierzęta” na telefonie w rogu zdjęcia, w pasku od 641 px.
   - Sprawdzenie: sondy `wild.js` przy 320–1400 px, `wildlink.js` i `settings.js` (zadania 4 i 5), zrzuty w zadaniu 6.
5. **Zdjęcia i podpisy.**
   - Ryzyko: zdjęcie bez autora albo z licencją NC/ND; podpis, który nie mówi, że zdjęcie jest z zoo albo spoza Wietnamu; brak zdjęcia bez słowa.
   - Oczekiwane: każde zdjęcie z autorem, licencją i stroną na Commons (stopka, podgląd), podpis z miejscem; saola i gibboniec reliktowy z napisem, że dobrego zdjęcia nie ma.
   - Sprawdzenie: test `wildlife` (zadanie 3), `tools/licenses.sh` (zadanie 3 i 6).

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest publiczne, strona działa pod https://grzegorzfrskiba-hub.github.io/wietnam/ z `docs/` na `main`. Strona grudniowa (`grzegorzfrskiba-hub/vietnam-december`) zostaje nietknięta.
- **Jedna sesja naraz:** 16.10.2026 druga sesja pracowała w repo w trakcie planu; przed zadaniem 1 sprawdź `git status` i `git log`, czy `main` stoi na commicie tego planu i czy nikt nie zostawił zmian.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik.
- **Python:** skrypty bez Pillow uruchamiaj z `-I`; build i zrzuty potrzebują Pillow, więc bez `-I`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`): kroje czyta z dysku z flagą `--allow-file-access-from-files`; słowo `MIESIAC` w ustawieniach to miesiąc za pięć miesięcy od dziś; `PAGE=wildlife` przed `probe.sh` albo `shot.sh` (od zadania 4) uruchamia podstronę; zrzuty wychodzą w ciemnym motywie systemu.
- **Pułapki:**
  - nie przebudowuj strony (`python3 site2/build.py`), gdy w tle chodzą sondy: build kasuje `site2/out`, a sondy padają hurtem (w suchej próbie raz: 30 z 41);
  - narzędzie Bash działa w zsh: niecytowana zmienna z listą plików nie dzieli się na słowa, więc wywołania `jsc` z wieloma plikami idą przez `bash`;
  - sonda `changes.js` zakłada link bez „dodaj”, `before.js` trasę z Cao Bằng i `&koszty=1`, `map.js` szerokość od 901 px;
  - podgląd zdjęcia to `<dialog>`: zdarzenie `close` przychodzi po `close()` asynchronicznie, więc sonda sprawdza powrót fokusu po chwili, i tylko na widocznej galerii;
  - sonda `publish.js` sprawdza, że kroje się wczytały; na obciążonym Macu Chrome bywa, że nie zdąży: powtórz ją osobno, zanim uznasz błąd;
  - `tools/licenses.sh` wypisuje dwie linie `AUTHOR wild:kisciec` i `wild:niedzwm`: przy zdjęciach z serwisu Thai National Parks autor prosi w opisie pliku o dopisek „Thai National Parks”, którego nie ma w polu Artist; to oczekiwane.
- **Sucha próba (16.10.2026):**
  - kod i treść zadań 2–5 złożono w osobnym worktree na gałęzi `sucha-proba-6`, commit po commicie od commitu researchu `7da8622`: zadanie 2 `6925d31`, zadanie 3 `e6d5255`, zadanie 4 `7345ef1`, zadanie 5 `4bf162a`;
  - kroki tego planu wygenerowano z tych commitów i odtworzono z gotowego tekstu planu na świeżym worktree, zadanie po zadaniu: po krokach testów zadania 2–5 dawały błędy z kroku 2, a po kodzie `ALL PASS` i sondy bez błędów; commit z ostatniego kroku, wykonany dosłownie, brał wszystkie zmienione pliki; drzewa plików i opisy commitów po każdym zadaniu są identyczne z suchą próbą;
  - skrypty z tekstu planu chodziły z `TMPDIR` w schowku sesji planu, więc w `$TMPDIR` wykonawcy nie ma `wietnam-6/` ani `sondy-6.sh`;
  - po zadaniu 5 sondy w obu językach: `sondy (MIESIAC): 0 z 53 nie przeszło` i `sondy (MIESIAC, pl): 0 z 51 nie przeszło`;
  - nie sprawdzono na sucho: kroku 6 zadania 6 (ręcznie w przeglądarce), telefonu, końcowego przeglądu i publikacji (zadania 7–8).

## Ustalenia z sesji planowania (16.10.2026, zatwierdzone)

Sesja planu sprawdziła trzy fakty z ustalenia 23 (`research/zwierzeta-2026-10.md`, „Sprawdzone przed planem etapu 6”), wybrała zdjęcia (108 miniatur i 7 dla czterech brakujących grup, arkusze kontaktowe, 27 kopii, każdy krok za zgodą; użytkownik wybrał przy pawiu i sędziole piękniejsze zdjęcia z wolności za granicą), a w tle agenty napisały fakty pięciu gatunków galerii i teksty danych z makiety i researchu. Całość złożono w suchej próbie. Użytkownik zatwierdził arkusz wszystkich tekstów PL | EN, dwa arkusze zrzutów (390 i 1400 px, po angielsku i po polsku: góra strony z trasą z wejściem i trzy zakładki dla trasy z maja 2027) i listę 20 ustaleń:

- **Adres i wygląd (1–3):**
  1. zakładki `#route`, `#gallery`, `#guide`, `#guide-<miejsce>`, za nimi ustawienia trasy jak na stronie z trasą (`&koszty=1`, `&lang=pl` na końcu); link bez zakładki: z trasą „Na trasie”, bez trasy „Galeria”;
  2. nagłówek bez dużego zdjęcia: „← Twoja trasa” (bez trasy „← Zaplanuj trasę”), EN · PL, nazwa, zdanie i trzy zakładki jako linki; kolory, kroje i ciemny motyw wspólne ze stroną z trasą (build kopiuje jej tokeny);
  3. zdjęcia 1400 px z kopiami 480 i 960 px w `img/wild/`; podgląd linku z dukiem (`og-wild.jpg`).
- **„Na trasie” (4–7):**
  4. karta: zdjęcie (kliknięcie otwiera podgląd), nazwa, druga nazwa, wietnamska i łacińska, IUCN, zdanie; spotkania z rodzajem, miejscem, kropkami szansy, „gdzie i jak” i „kiedy”;
  5. przy trasie: „✓ Na twojej trasie: X, dni a–b.” i „✓ W planie dnia.”, „W planie dnia przy innym poziomie albo przy dłuższym pobycie.” albo „Poza planem dnia.”; przy złym miesiącu „✗ Nie w twoim terminie, tylko …”; plan dnia liczy się tylko w porze zwierzęcia;
  6. „Dodaj X do trasy” to link na stronę z trasą z `dodaj=X`, przed nim „Po dodaniu wypadnie: …” z `whyOff`; przy złym terminie zamiast niego pora zwierzęcia, a gdy miejsca nie da się dodać, zdanie, że się nie zmieści; bez trasy planer z ustawieniami domyślnymi i tym miejscem;
  7. w grupie najpierw największa szansa, potem kolejność danych.
- **„Galeria” i „Przewodnik” (8–10):**
  8. grupy: naczelne, inne ssaki, ptaki, gady i płazy, owady, legendy (przerywana ramka, na końcu); saola i gibboniec reliktowy z napisem o braku zdjęcia; podgląd w natywnym `<dialog>` (Escape zamyka, fokus wraca);
  9. przewodnik z południa na północ według osi miejsc: delta Mekongu przed Hồ Chí Minh City (makieta miała odwrotnie);
  10. wiersze przewodnika: spotkania gatunków w tym miejscu (nazwa prowadzi do karty), potem jego własne wiersze; uwagi bez szansy; Núi Đôi i Đảo Tiên jako uwagi, EPRC bez godzin.
- **Treść (11–13):**
  11. Troides aeacus pod nazwą łacińską (polskiej nie ma), „żaba mszysta” (propozycja), „Czaple” zamiast „Czaple i bociany” (bociany w wierszu Vân Long);
  12. fakty makiety bez źródła w researchu wypadły (m.in. „azjatycki jednorożec”, „jeden z niewielu jadowitych ssaków”, liczby żółwi);
  13. azyl niedźwiedzi Four Paws przy Cúc Phương (ok. 8 km od parku), jak w makiecie.
- **Strona z trasą (14–17):**
  14. „Zwierzęta” pod tytułem jako trzeci przycisk; na telefonie w górnym rogu zdjęcia, naprzeciw EN · PL, bo trzeci przycisk spychał pole miesiąca pod pierwszy ekran (sonda `settings.js`);
  15. w pasku u góry od 641 px; przy 320 px się nie mieści (360 px treści na 288 px miejsca);
  16. „Zwierzęta tutaj →” pod wskazówkami przy 10 miejscach przewodnika; link zawsze na publiczny adres (działa też z pliku offline); w druku nic z tego;
  17. `stopDays` dopisuje pole `plan` (plan i wersja dnia); trasy bez zmian.
- **Sprawdzanie i proces (18–20):**
  18. testy `wild.test.js` i testy treści (dane, dwa języki, interfejs); sondy `wild.js` (320–1400 px, oba języki, z trasą i bez) i `wildlink.js`; `probe.sh` i `shot.sh` z `PAGE=wildlife`; `licenses.sh` także zdjęcia podstrony;
  19. jeden plan, nie dwa: sucha próba ma cztery zadania kodu (ustalenie 24 dopuszczało dwa plany);
  20. wykonanie w świeżej sesji, z punktem kontrolnym, końcowym przeglądem na najmocniejszym modelu i publikacją za zgodą.

## Jak działa strona po planie

- **Strona z trasą:** pod tytułem trzeci przycisk „Zwierzęta” (na telefonie link w górnym rogu zdjęcia), w pasku u góry od 641 px link „Zwierzęta”, a przy miejscach z wpisem w przewodniku „Zwierzęta tutaj →”; wszystkie niosą trasę z linku.
- **Podstrona `…/wildlife/`:** „Na trasie” (16 kart z ✓ i ✗ dla trasy i terminu, „Dodaj” z zapowiedzią, co wypadnie), „Galeria” (25 kafelków w grupach, legendy na końcu, podgląd zdjęcia z dwoma zdaniami i nazwami) i „Przewodnik” (10 miejsc z południa na północ, „Czego unikać”, „Poza Route G”); stopka z autorami i licencjami 27 zdjęć.
- **Wydruk i PDF trasy:** bez wejść, jak przed planem.

## Struktura plików

- Utwórz: `site2/src/wildpage.js`, `site2/src/wild.js`, `site2/src/en/wild.js`, `site2/src/wildphotos.js`, `site2/src/en/wildphotos.js`, `site2/src/wildui.js`, `site2/src/en/wildui.js`, `site2/src/wildapp.js`, `site2/src/wild.html`, `tests/wild.test.js`, `tests/probes/wild.js`, `tests/probes/wildlink.js`.
- Zmień:
  - kod i szablon: `site2/src/page.js` (pole `plan` w `stopDays`), `site2/src/content.js` (`WILD_GUIDE_PLACES`), `site2/src/app.js`, `site2/src/template.html`, `site2/build.py`;
  - teksty: `site2/src/ui.js`, `site2/src/en/ui.js`, `README.md`;
  - testy i narzędzia: `tests/run.sh`, `tests/content.test.js`, `tests/probe.sh`, `tests/shot.sh`, `tools/licenses.sh`;
  - notatki (zadanie 9): `notes/etapy.md`, `CLAUDE.md`; strona w `docs/` (zadanie 8).
- Bez zmian: silnik (`engine.js` i dane tras), `photos.js`, research (zmieniony w commicie researchu przed planem).

---

### Zadanie 1: Stan przed planem (bez commita)

Liczby wszystkich tras, strony PDF trzech tras w obu językach i sondy w obu językach, do porównania w punkcie kontrolnym. Bez commita.

- [ ] **Krok 1: Skrypt sond i pomiary** (ok. 15 min)

```bash
rm -rf "$TMPDIR/wietnam-6"; mkdir -p "$TMPDIR/wietnam-6"
cat > "$TMPDIR/sondy-6.sh" <<'SONDYEOF'
#!/bin/bash
# The probes of stage 6 for one month (MIESIAC: five months from today) and one language: those of the first round of fixes
# and the next one (minimap.js), each on a link without lang= (the page in English) or, with the second argument pl, on the
# same link with &lang=pl (Polish), the settings once more as a first visit; in English also the probe of the language
# switch; and, once the plan has made them, the probes of the ways into the wildlife subpage (wildlink.js, task 5) and of
# the subpage itself (wild.js with PAGE=wildlife, task 4), on links with a trip and without, and on trips in May and February
# 2027. Prints a line for each failure and the count at the end. Run from the repository's folder after python3
# site2/build.py, and do not build again while it runs.
M=${1:-MIESIAC}; L=${2:-}
X=""; [ "$L" = "pl" ] && X="&lang=pl"
A="od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang"
B="od=SGN&do=HAN&miesiac=$M&dni=15&co=&poziom=2"
bad=0; n=0
run() {
  n=$((n+1))
  PAGE="${PAGE:-}" bash tests/probe.sh "tests/probes/$1" "$2" "$3" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL $1 $2 $3"; grep -iE "fail|error|stopped" "$TMPDIR/sonda.txt" | head -5; }
}
for w in 390 641 768 901 1100 1400; do run before.js $w "$A&koszty=1$X"; done
for w in 390 360 320; do run settings.js $w "$B$X"; done
run settings.js 390 "${X#&}"
run map.js 1400 "$B$X"
run map.js 1400 "od=SGN&do=SGN&miesiac=$M&dni=10&co=przyroda&poziom=2&dodaj=yokdon$X"
run map.js 1400 "od=DAD&do=SGN&miesiac=$M&dni=16&co=przyroda,kultura&poziom=3&dodaj=yokdon$X"
run map.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=16&co=gory,przyroda&poziom=2&dodaj=mucangchai,sapa$X"
run changes.js 1400 "$B$X"
run changes.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2$X"
run anchors.js 390 "$B$X"
run link.js 1400 "od=HAN&do=DAD&miesiac=$M&dni=12&co=kultura&poziom=3$X"
run publish.js 1400 "$B$X"
run pdf.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=gory,kultura&poziom=2$X"
if [ -z "$L" ]; then run lang.js 390 "$B"; run lang.js 1400 "$A"; fi
if [ -f tests/probes/fold.js ]; then for w in 390 641 901 1400; do run fold.js $w "$A$X"; done; fi
if [ -f tests/probes/costs.js ]; then for w in 390 641 768 901 1400; do run costs.js $w "$B$X"; done; fi
if [ -f tests/probes/offroute.js ]; then for w in 390 641 901 1400; do run offroute.js $w "$B$X"; done; fi
if [ -f tests/probes/minimap.js ]; then for w in 390 641 901; do run minimap.js $w "$B$X"; done; fi
if [ -f tests/probes/wildlink.js ]; then for w in 320 390 641 1400; do run wildlink.js $w "$B$X"; done; run wildlink.js 1400 "$A&koszty=1$X"; fi
if [ -f site2/out/pages/wildlife/index.html ]; then
  for w in 320 390 641 901 1400; do PAGE=wildlife run wild.js $w "route&$B$X"; done
  PAGE=wildlife run wild.js 390 "gallery$X"; PAGE=wildlife run wild.js 1400 "${X#&}"; PAGE=wildlife run wild.js 768 "guide-cucphuong&$A&koszty=1$X"
  PAGE=wildlife run wild.js 1400 "route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2$X"; PAGE=wildlife run wild.js 390 "route&od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2$X"
fi
echo "sondy ($M${L:+, $L}): $bad z $n nie przeszło"
SONDYEOF
cat > "$TMPDIR/wietnam-6/jsc.sh" <<'JSCEOF'
#!/bin/bash
# One test file in JavaScriptCore with the page's sources as before the plan and the new sources given after it, so a red
# step shows the test's own failure where tests/run.sh stops at a missing file:
#   bash "$TMPDIR/wietnam-6/jsc.sh" <test> [source…]   (from the repository's folder)
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
T="$1"; shift
S="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $(ls site2/src/content/*.js) $(ls site2/src/en/content/*.js) site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js"
"$J" $S "$@" tests/assert.js "$T"
JSCEOF
python3 site2/build.py > /dev/null
bash tools/liczby.sh > "$TMPDIR/wietnam-6/liczby-przed.md"
for l in en pl; do X=""; [ $l = pl ] && X="&lang=pl"
  for t in "od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2&koszty=1" "od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=gory,kultura&poziom=2&koszty=1" "od=HAN&do=SGN&miesiac=MIESIAC&dni=21&co=przyroda,gory&poziom=3&koszty=1"; do
    bash tests/print.sh "$t$X" "$TMPDIR/wietnam-6/przed.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //" ; done; done > "$TMPDIR/wietnam-6/pdf-przed.txt"
bash "$TMPDIR/sondy-6.sh" MIESIAC > "$TMPDIR/wietnam-6/sondy-przed-en.txt" 2>&1
bash "$TMPDIR/sondy-6.sh" MIESIAC pl > "$TMPDIR/wietnam-6/sondy-przed-pl.txt" 2>&1
tail -n 1 "$TMPDIR/wietnam-6/sondy-przed-en.txt" "$TMPDIR/wietnam-6/sondy-przed-pl.txt"; cat "$TMPDIR/wietnam-6/pdf-przed.txt"
```

Oczekiwane: `sondy (MIESIAC): 0 z 38 nie przeszło` i `sondy (MIESIAC, pl): 0 z 36 nie przeszło`, potem sześć linii PDF, każda kończy się `under 45% (not counting the last): none` (w suchej próbie, przy `MIESIAC` = 2027-03: po angielsku 13, 11 i 15 stron, po polsku 13, 10 i 16; w innym miesiącu liczby stron mogą być inne, ważne, żeby punkt kontrolny dał te same); w `liczby-przed.md` liczby wszystkich tras.

---

### Zadanie 2: Funkcje podstrony: adres, powrót, spotkania na trasie

Ustalenia 2, 3, 9–11 i 14 sesji decyzji, ustalenia 1, 5–7, 10 i 17 sesji planowania. Czyste funkcje w `site2/src/wildpage.js` (bez DOM): `hasTrip`, `wildView` (zakładka z adresu), `wildHash` (adres widoku), `tripLink` (powrót na stronę z trasą, z `dodaj=` przy „Dodaj”), `tripStays` (pobyty trasy z dniami), `meetOnTrip` (miejsce na trasie, dni, plan dnia, miesiąc), `meetInTerm`, `termMonths`, `routeOrder` (kolejność kart) i `guideRows` (wiersze przewodnika), do tego `WILD_TABS` i `WILD_GROUPS`. `stopDays` w `page.js` dopisuje przy każdym dniu pole `plan` (`{ p, v }`: plan tekstów miejsca i wersja: `''` zwykła, `easy`, `hard`, `self`, `solo` albo `again` z p 0); nic więcej się w nim nie zmienia.

**Pliki:**
- Utwórz: `site2/src/wildpage.js`
- Zmień: `site2/src/page.js`
- Testy: `tests/run.sh`, `tests/wild.test.js`

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/run.sh` zamień:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js"
TESTS="tests/engine.test.js tests/page.test.js tests/data.test.js tests/content.test.js tests/combos.test.js"
```

na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js site2/src/wildpage.js"
TESTS="tests/engine.test.js tests/page.test.js tests/wild.test.js tests/data.test.js tests/content.test.js tests/combos.test.js"
```

Utwórz `tests/wild.test.js`:

```js
/* The wildlife subpage's pure helpers (wildpage.js, stage 6), on made-up encounters and real trips of the engine. */
var GUIDE_T = { cattien: {}, cucphuong: {} };

/* ---------- the address (findings 2 and 3) ---------- */
eq([hasTrip('#route&od=SGN&do=HAN&miesiac=2027-02&dni=15&co=&poziom=2'), hasTrip('#od=SGN&do=HAN'), hasTrip('#gallery&lang=pl'), hasTrip(''), hasTrip('#gallery&do=HAN')],
  [true, true, false, false, false], 'hasTrip: a trip is a link with od=');
eq([wildView('#route', GUIDE_T), wildView('#gallery&od=SGN&do=HAN', GUIDE_T), wildView('#guide', GUIDE_T), wildView('#guide-cattien&lang=pl', GUIDE_T)],
  [{ tab: 'route', place: null }, { tab: 'gallery', place: null }, { tab: 'guide', place: null }, { tab: 'guide', place: 'cattien' }], 'wildView: the tab first, a place of the guide');
eq([wildView('', GUIDE_T), wildView('#lang=pl', GUIDE_T), wildView('#od=SGN&do=HAN&dni=15', GUIDE_T), wildView('#guide-hue', GUIDE_T), wildView('#zoo&od=SGN', GUIDE_T), wildView('#guide-constructor', GUIDE_T)],
  [{ tab: 'gallery', place: null }, { tab: 'gallery', place: null }, { tab: 'route', place: null }, { tab: 'gallery', place: null }, { tab: 'route', place: null }, { tab: 'gallery', place: null }],
  'wildView: without a known tab, the gallery, or with a trip the route; a place without a guide entry is none');
var S = { from: 'SGN', to: 'HAN', year: 2027, month: 2, days: 15, interests: ['przyroda'], level: 2, add: [], remove: [], moto: [] };
eq([wildHash({ tab: 'gallery', place: null }, null, 'en', false), wildHash({ tab: 'gallery', place: null }, null, 'pl', true), wildHash({ tab: 'guide', place: 'cattien' }, null, 'en', false)],
  ['#gallery', '#gallery&lang=pl', '#guide-cattien'], 'wildHash without a trip: the tab and lang=pl, no koszty');
eq(wildHash({ tab: 'route', place: null }, S, 'pl', true), '#route&od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2&koszty=1&lang=pl', 'wildHash with a trip: as pageHash');
eq(wildView(wildHash({ tab: 'guide', place: 'cucphuong' }, S, 'pl', false), GUIDE_T), { tab: 'guide', place: 'cucphuong' }, 'wildView reads wildHash back');
eq(parseLink(wildHash({ tab: 'route', place: null }, S, 'en', false)), parseLink(linkHash(S)), 'parseLink skips the tab');
eq([tripLink(S, 'en', false, null), tripLink(S, 'pl', true, 'yokdon')],
  ['../#od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2', '../#od=SGN&do=HAN&miesiac=2027-02&dni=15&co=przyroda&poziom=2&dodaj=yokdon&koszty=1&lang=pl'],
  'tripLink: the trip back, with dodaj= for Dodaj (finding 10)');
eq([tripLink(null, 'en', false, null), tripLink(null, 'pl', false, null), tripLink(null, 'en', false, 'cattien'), tripLink(null, 'pl', true, 'cattien')],
  ['../', '../#lang=pl', '../#dodaj=cattien', '../#dodaj=cattien&lang=pl'], 'tripLink without a trip: the page with its defaults');
eq(S.add, [], 'tripLink leaves the settings as they were');
print('address ok');

/* ---------- the trip and its encounters (finding 9) ---------- */
var DATA_W = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function tripOf(s) {
  var st = normSettings(s, PLACES, HUBS), r = planRoute(st, DATA_W);
  ok(st.ok && r.ok, 'a trip for ' + linkHash(s));
  return { st: st, route: r, stays: tripStays(r, st, CONTENT, FERRY) };
}
// a trip of 15 days in May 2027 from Hồ Chí Minh City to Hà Nội, with nature and Cúc Phương added at each level
function mayTrip(level, days) { return tripOf({ from: 'SGN', to: 'HAN', year: 2027, month: 5, days: days || 15, interests: ['przyroda'], level: level, add: ['cucphuong', 'cattien'], remove: [], moto: [] }); }
var T2 = mayTrip(2), T1 = mayTrip(1);
ok(T2.stays.cattien && T2.stays.cucphuong, 'the May trip has Cát Tiên and Cúc Phương');
var cat = T2.stays.cattien[0];
eq([cat.last - cat.first + 1, cat.days.length, cat.days.map(function (d) { return d.day; })[0]], [cat.days.length, cat.days.length, cat.first], 'tripStays: the days of the stay, from its first day');
eq(T2.stays.cattien[0].days.map(function (d) { return d.plan.p; }).sort(), cat.days.map(function (d, i) { return i + 1; }).sort(), 'stopDays: each day says its plan p');
// made-up encounters at Cát Tiên: one in the usual version of plan 2, one only in the hard version, one without a plan,
// one in May only (in the term) and one in August only (not)
var M = {
  usual: { place: 'cattien', months: null, plan: [[2, '']] },
  hard: { place: 'cattien', months: null, plan: [[2, 'hard']] },
  none: { place: 'cattien', months: null, plan: null },
  may: { place: 'cattien', months: [5], plan: [[2, ''], [2, 'hard']] },
  aug: { place: 'cattien', months: [8], plan: [[2, '']] },
  off: { place: 'phuquoc', months: null, plan: [[1, '']] }
};
if (cat.days.length >= 2) {
  eq(['usual', 'hard', 'none', 'may', 'aug'].map(function (k) { var o = meetOnTrip(M[k], T2.stays, T2.st.months); return [o.plan, o.month]; }),
    [[true, null], [false, null], [false, null], [true, true], [false, false]], 'meetOnTrip at level 2: the usual version is in the plan, the hard one is not; the month');
  var o1 = meetOnTrip(M.usual, T1.stays, T1.st.months);
  eq(o1.plan, !T1.stays.cattien[0].days.some(function (d) { return d.plan.p === 2 && d.plan.v === 'easy'; }), 'meetOnTrip at level 1: the easy version takes the place of the usual one');
}
eq(meetOnTrip(M.off, T2.stays, T2.st.months) === null || !!T2.stays.phuquoc, true, 'meetOnTrip: null for a place off the trip');
var o = meetOnTrip(M.none, T2.stays, T2.st.months);
eq([o.first, o.last], [cat.first, cat.last], 'meetOnTrip: the days of the stay');
// one night in Cát Tiên: its solo plan
var solo = { cattien: [{ first: 3, last: 3, days: [{ day: 3, plan: { p: 1, v: 'solo' } }] }] };
eq([meetOnTrip({ place: 'cattien', months: null, plan: [[1, 'solo']] }, solo, [4, 4, 4, 4]).plan, meetOnTrip({ place: 'cattien', months: null, plan: [[1, '']] }, solo, [4, 4, 4, 4]).plan],
  [true, false], 'meetOnTrip: a one-night stay has the solo version only');
// a plan in a month outside the encounter's months is no plan (fireflies on a night ride in February)
eq(meetOnTrip({ place: 'cattien', months: [4], plan: [[1, 'solo']] }, solo, [4, 4, 4, 4]), { first: 3, last: 3, plan: false, month: false }, 'meetOnTrip: out of season, neither');
eq(meetOnTrip({ place: 'cattien', months: [5], plan: [[1, 'solo']] }, solo, [4, 4, 4, 4]), { first: 3, last: 3, plan: true, month: true }, 'meetOnTrip: in season, both');
eq([meetInTerm({ months: null }, [2]), meetInTerm({ months: [4, 5, 6] }, [2, 3]), meetInTerm({ months: [4, 5, 6] }, [3, 4])], [true, false, true], 'meetInTerm (finding 10)');
eq(termMonths({ months: [0, 0, 1, 1, 1] }), [1, 2], 'termMonths: once each, 1–12');
print('encounters ok');

/* ---------- the order of On your route (finding 11) and the rows of the guide (finding 14) ---------- */
var W = {
  a: { route: true, meet: [{ place: 'cattien', chance: 1 }] },
  b: { route: true, meet: [{ place: 'danang', chance: 3 }] },
  c: { route: true, meet: [{ place: 'cattien', chance: 2 }, { place: 'hue', chance: 3 }] },
  d: { route: false, gallery: true },
  e: { route: true, meet: [{ place: 'yokdon', chance: 2 }] }
};
eq(routeOrder(W, null), { on: [], off: ['b', 'c', 'e', 'a'] }, 'routeOrder without a trip: one group by chance, then the order of WILD');
eq(routeOrder(W, function (id) { return W[id].meet.some(function (m) { return m.place === 'cattien'; }); }), { on: ['c', 'a'], off: ['b', 'e'] }, 'routeOrder with a trip: on it first');
eq(guideRows(W, { cattien: { rows: [{ name: 'x' }] } }, 'cattien'), [{ id: 'a', i: 0 }, { id: 'c', i: 0 }, { row: { name: 'x' } }], 'guideRows: the encounters, then the guide’s rows');
print('order ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
bash "$TMPDIR/wietnam-6/jsc.sh" tests/wild.test.js 2>&1 | head -n 1
```

Oczekiwane: `tests/run.sh: missing file site2/src/wildpage.js` i `Exception: ReferenceError: Can't find variable: hasTrip`.

- [ ] **Krok 3: Kod**

W `site2/src/page.js` zamień:

```js
/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant, cost, pack }], one per night, from the stay's first day.
```

na:

```js
/* The day plans of one stay: [{ day, pace, t, d, early, rain, variant, cost, pack, plan }], one per night, from the stay's first day;
   plan: { p, v }, the plan of the place's texts the day comes from and its version ('' the usual one, 'easy', 'hard', 'self',
   'solo', or 'again' with p 0), which the wildlife subpage reads to say whether an encounter is in the day's plan (stage 6).
```

W `site2/src/page.js` zamień:

```js
  } else {
```

na:

```js
    out[0].plan = { p: 0, v: 'again' };
  } else {
```

W `site2/src/page.js` zamień:

```js
    if (stop.n === 1 && d.solo) { out.push(plainDay(d.solo)); return; }
```

na:

```js
    if (stop.n === 1 && d.solo) { out.push(plainDay(d.solo)); out[out.length - 1].plan = { p: d.p, v: 'solo' }; return; }
```

W `site2/src/page.js` zamień:

```js
    if (two && v.variant === 'hard') second = plainDay(d.hard.next, 'hard');
```

na:

```js
    v.plan = { p: d.p, v: v.variant || '' };
    if (two && v.variant === 'hard') { second = plainDay(d.hard.next, 'hard'); second.plan = { p: d.p, v: 'hard' }; }
```

Utwórz `site2/src/wildpage.js`:

```js
/* Pure helpers of the wildlife subpage (stage 6, …/wildlife/), shared with the tests: its address, the trip it was opened
   with and what that trip means for each encounter. No DOM here. Calls page.js (parseLink, linkHash, pageHash, stopDays,
   legAfter) and engine.js (normSettings, planRoute); the data comes in through arguments. */

/* ---------- the address ---------- */
// the tabs, in their order on the page (finding 1 of stage 6): On your route, Gallery, Field guide
var WILD_TABS = ['route', 'gallery', 'guide'];
// the groups of the gallery, in their order (finding 12): the legends last
var WILD_GROUPS = ['primates', 'mammals', 'birds', 'reptiles', 'insects', 'legends'];

/* Whether the address carries a trip: the settings of the page with the route, as its link writes them (od=… first). */
function hasTrip(hash) { return /(?:^#?|&)od=/.test(String(hash || '')); }

/* The tab of the address after #: route, gallery or guide, or guide-<place> for a place of the field guide (the link „Zwierzęta
   tutaj →” of a stay, finding 5); the first part of the address, before the settings. Without one, or with an unknown one,
   a link with a trip opens On your route and one without opens the Gallery (finding 3).
   Returns { tab, place }, place an id of guide or null. guide: the field guide's places (WILD_GUIDE). */
function wildView(hash, guide) {
  var first = String(hash || '').replace(/^#/, '').split('&')[0], m = /^guide-([a-z]+)$/.exec(first);
  if (WILD_TABS.indexOf(first) > -1) return { tab: first, place: null };
  if (m && guide.hasOwnProperty(m[1])) return { tab: 'guide', place: m[1] };
  return { tab: hasTrip(hash) ? 'route' : 'gallery', place: null };
}

/* The subpage's address for a view: the tab (guide-<place> with a place), the trip's settings when there is one, then
   koszty=1 and lang=pl as on the page with the route (pageHash), so its links back open the trip as it was. */
function wildHash(view, settings, lang, costs) {
  var tab = '#' + view.tab + (view.place ? '-' + view.place : '');
  if (settings) return tab + '&' + pageHash(settings, lang, costs).slice(1);
  return tab + (lang === 'pl' ? '&lang=pl' : '');
}

/* The address of the page with the route from the subpage: the trip as it was (pageHash), or the page's own defaults when
   the subpage knows no trip ('' opens them, in English; lang=pl in Polish). add: a place to put on the trip (Dodaj, finding
   10): the page reads it from dodaj= and plans the trip again. Relative, as the subpage lives one folder down. */
function tripLink(settings, lang, costs, add) {
  if (settings) return '../' + pageHash(add ? withAdded(settings, add) : settings, lang, costs);
  var parts = (add ? ['dodaj=' + add] : []).concat(lang === 'pl' ? ['lang=pl'] : []);
  return '../' + (parts.length ? '#' + parts.join('&') : '');
}

/* ---------- the trip ---------- */
/* The stays of a trip by place, with their trip days and day plans (stopDays): { id: [{ first, last, days }] }, a city twice
   on a round trip with both stays. route: planRoute's trip; st: its normSettings' result; content: the places' texts (their
   days); ferry: FERRY of travel.js (legAfter). */
function tripStays(route, st, content, ferry) {
  var out = {}, done = {};
  route.stops.forEach(function (x, i) {
    if (!content[x.id]) return;   // a night on the way has no plans
    var days = stopDays(content[x.id], x, done[x.id] || 0, st.level, st.months, legAfter(route, i, ferry)) || [];
    done[x.id] = (done[x.id] || 0) + x.n;
    (out[x.id] = out[x.id] || []).push({ first: x.start, last: x.start + x.n - 1, days: days });
  });
  return out;
}

/* What the trip means for one encounter (findings 9 and 11): null when its place is not on the trip; else
   { first, last, plan, month }: the trip days of the place's stays; plan, whether a day of the trip comes from a plan whose
   text names the encounter (meet.plan: [[p, version]], the plans of the place's texts, '' for the usual version); month,
   whether a day of those stays falls in a month of meet.months, or null for an animal of the whole year. A plan counts
   only in a month of the encounter, as fireflies on a night ride in February are no plan of seeing them.
   stays: tripStays; months: st.months, the month (0–11) of each trip day. */
function meetOnTrip(meet, stays, months) {
  var list = stays[meet.place];
  if (!list) return null;
  var inMonth = function (day) { return !meet.months || meet.months.indexOf(months[day - 1] + 1) > -1; }, month = false, plan = false;
  list.forEach(function (s) {
    for (var d = s.first; d <= s.last; d++) if (inMonth(d)) month = true;
    s.days.forEach(function (d) {
      if ((meet.plan || []).some(function (x) { return d.plan && d.plan.p === x[0] && d.plan.v === x[1]; }) && inMonth(d.day)) plan = true;
    });
  });
  return { first: list[0].first, last: list[list.length - 1].last, plan: plan, month: meet.months ? month : null };
}

/* Whether an encounter's animal can be seen in a term at all (finding 10): true for one of the whole year, else whether a
   month of the term is one of meet.months. termMonths: the months (1–12) of the trip, once each. */
function meetInTerm(meet, termMonths) {
  return !meet.months || termMonths.some(function (m) { return meet.months.indexOf(m) > -1; });
}

/* The months (1–12) of a trip, once each, in the order of the trip: st.months is the month (0–11) of each day. */
function termMonths(st) {
  var out = [];
  st.months.forEach(function (m) { if (out.indexOf(m + 1) < 0) out.push(m + 1); });
  return out;
}

/* The species of On your route in their order (finding 11): with a trip, first the ones with an encounter on it, then the
   rest; in each group the biggest chance of any of their encounters first, then the order of WILD. Without a trip (onTrip
   null) one group by chance. Returns { on: [ids], off: [ids] }. wild: WILD; onTrip(id): whether the species meets the trip. */
function routeOrder(wild, onTrip) {
  var ids = Object.keys(wild).filter(function (id) { return wild[id].route; });
  var best = function (id) { return Math.max.apply(null, wild[id].meet.map(function (m) { return m.chance; })); };
  var sorted = function (list) { return list.map(function (id, i) { return [id, i]; }).sort(function (a, b) { return best(b[0]) - best(a[0]) || a[1] - b[1]; }).map(function (x) { return x[0]; }); };
  if (!onTrip) return { on: [], off: sorted(ids) };
  return { on: sorted(ids.filter(onTrip)), off: sorted(ids.filter(function (id) { return !onTrip(id); })) };
}

/* The encounters of the field guide's place p (finding 14): every encounter of a species there, in the order of WILD, then
   the guide's own rows. Returns [{ id, i } | { row }]: id and the index of its encounter, or the row of WILD_GUIDE. */
function guideRows(wild, guide, p) {
  var out = [];
  Object.keys(wild).forEach(function (id) { (wild[id].meet || []).forEach(function (m, i) { if (m.place === p) out.push({ id: id, i: i }); }); });
  (guide[p].rows || []).forEach(function (r) { out.push({ row: r }); });
  return out;
}
```

- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
```

Oczekiwane: `ALL PASS`; grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/page.js site2/src/wildpage.js tests/run.sh tests/wild.test.js
git commit -q -F - <<'EOF'
Etap 6, zadanie 2 (podstrona zwierząt, funkcje): wildpage.js z adresem podstrony (zakładki route, gallery, guide i guide-<miejsce>; link z trasą otwiera „Na trasie”, bez trasy „Galerię”), linkiem do strony z trasą (z dodaj= przy „Dodaj”) i tym, co trasa znaczy dla spotkania: miejsce na trasie, dni pobytu, spotkanie w planie dnia (plany dnia z wersjami, w porze zwierzęcia) i w terminie; kolejność kart i wiersze przewodnika; stopDays mówi przy każdym dniu, z którego planu i wersji pochodzi (pole plan), bez zmiany tras; testy wild.test.js (ustalenia 2, 3, 9–11, 14)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 6925d31 HEAD -- site2 tests tools README.md` nic nie wypisuje.

---

### Zadanie 3: Dane i teksty podstrony, zdjęcia, testy treści

Ustalenia 7, 8, 12–20 i 22 sesji decyzji, ustalenia 9–13 i 18 sesji planowania. `site2/src/wild.js`: `WILD` (29 gatunków: `name`, `alt`, `vn`, `lat`, `iucn`, `group`, `route`, `gallery`, `why`, `meet`, przy saoli i gibbońcu reliktowym `nophoto`; spotkanie: `place`, `kind`, `where`, `chance` 1–3, `chanceNote`, `when`, `months`, `season`, `plan` jako lista `[p, wersja]`), `WILD_GUIDE` (10 miejsc z południa na północ: `where`, `rows`), `WILD_AVOID` i `WILD_OUTSIDE` (po pięć); angielskie teksty w `site2/src/en/wild.js` (`WILD_EN`, `WILD_GUIDE_EN`, `WILD_AVOID_EN`, `WILD_OUTSIDE_EN`); zdjęcia w `site2/src/wildphotos.js` (`WILD_PHOTOS`: podpis, autor, licencja, strona na Commons) i ich angielskie podpisy w `site2/src/en/wildphotos.js` (`WILD_CAPS_EN`); `WILD_GUIDE_PLACES` w `content.js` (miejsca przewodnika dla strony z trasą, test pilnuje zgodności z `WILD_GUIDE`); `tools/licenses.sh` czyta też `wildphotos.js`. Testy treści: `wildlife` (pola, miejsca, miesiące, plany dni, zdjęcia, licencje, przewodnik) i `wildlife in two languages` (każdy tekst w obu językach, te same liczby i nazwy wietnamskie, styl, długości: zdanie gatunku do 32 słów, „gdzie i jak”, „kiedy” i wiersz przewodnika do 30, po angielsku o 6 więcej). Pięć rzeczowników z tekstów (`duecie`, `powrocie`, `rezerwacie`, `delcie`, `pobycie`) dochodzi do `NOT_PLURAL`.

**Pliki:**
- Utwórz: `site2/src/en/wild.js`, `site2/src/en/wildphotos.js`, `site2/src/wild.js`, `site2/src/wildphotos.js`
- Zmień: `site2/src/content.js`, `tools/licenses.sh`
- Testy: `tests/content.test.js`, `tests/run.sh`

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/content.test.js` zamień:

```js
var NOT_PLURAL = ['aucie', 'nakrycie', 'mieście', 'moście', 'liście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
```

na:

```js
var NOT_PLURAL = ['duecie', 'powrocie', 'rezerwacie', 'delcie', 'pobycie', 'aucie', 'nakrycie', 'mieście', 'moście', 'liście', 'świcie', 'szczycie', 'otwarcie', 'wejście', 'wyjście', 'przejście', 'zejście', 'podejście', 'dojście',
```

W `tests/content.test.js` zamień:

```js
  need(ENTRY.links.length === 2 && ENTRY.links.every(function (l) { return /^https:\/\/[a-z.]+\.gov\.vn\/$/.test(l.url); }), 'ENTRY.links: the two sites of the government (.gov.vn)');
});
```

na:

```js
  need(ENTRY.links.length === 2 && ENTRY.links.every(function (l) { return /^https:\/\/[a-z.]+\.gov\.vn\/$/.test(l.url); }), 'ENTRY.links: the two sites of the government (.gov.vn)');
});

/* ---------- the wildlife subpage (stage 6, decisions of 16.10.2026) ---------- */
/* Its data (wild.js, finding 22): every species in a group, with a card On your route (route, finding 7) and its
   encounters, or a tile in the Gallery (gallery, finding 12), or both; an encounter at a place of the planner, its kind,
   a chance of 1–3, its months 1–12 or the whole year, and the day plans whose text names it among the place's plans;
   a photo for every species but one with none (nophoto), and no photo of no species (wildphotos.js). */
var WILD_KINDS = ['wild', 'rescue', 'program'], WILD_IUCN = ['CR', 'EN', 'VU', 'NT', 'LC'];
contentCheck('wildlife', function (need) {
  var route = 0, gallery = 0;
  Object.keys(WILD).forEach(function (id) {
    var x = WILD[id], w = 'WILD.' + id;
    Object.keys(x).forEach(function (k) { need(['name', 'alt', 'vn', 'lat', 'iucn', 'group', 'route', 'gallery', 'why', 'meet', 'nophoto'].indexOf(k) > -1, w + ': unknown field ' + k); });
    ['name', 'vn', 'lat', 'why'].forEach(function (k) { need(isText(x[k]), w + ': ' + k); });
    need(x.alt == null || isText(x.alt), w + ': alt');
    need(x.iucn == null || WILD_IUCN.indexOf(x.iucn) > -1, w + ': iucn ' + x.iucn);
    need(WILD_GROUPS.indexOf(x.group) > -1, w + ': group ' + x.group);
    need(x.route === true || x.gallery === true, w + ': a card On your route, a tile in the Gallery or both');
    need(!!x.route === Array.isArray(x.meet) && (!x.meet || x.meet.length > 0), w + ': encounters exactly with a card On your route');
    need(x.group !== 'legends' || (!x.route && x.gallery), w + ': a legend is in the Gallery only (finding 12)');
    need(x.nophoto ? !WILD_PHOTOS[id] : !!WILD_PHOTOS[id], w + ': a photo in wildphotos.js, or nophoto');
    if (x.route) route++;
    if (x.gallery) gallery++;
    (x.meet || []).forEach(function (m, i) {
      var mw = w + '.meet.' + i;
      Object.keys(m).forEach(function (k) { need(['place', 'kind', 'where', 'chance', 'chanceNote', 'when', 'months', 'season', 'plan'].indexOf(k) > -1, mw + ': unknown field ' + k); });
      need(PLACES[m.place] && !PLACES[m.place].node, mw + ': a place of the planner, not ' + m.place);
      need(WILD_KINDS.indexOf(m.kind) > -1, mw + ': kind ' + m.kind);
      need([1, 2, 3].indexOf(m.chance) > -1, mw + ': a chance of 1–3');
      ['where', 'when'].forEach(function (k) { need(isText(m[k]), mw + ': ' + k); });
      need(m.chanceNote == null || isText(m.chanceNote), mw + ': chanceNote');
      need(m.months === null || (Array.isArray(m.months) && m.months.length > 0 && m.months.length < 12 && m.months.every(function (k) { return k % 1 === 0 && k >= 1 && k <= 12; })), mw + ': months null or 1–12');
      need(m.months ? isText(m.season) : m.season === undefined, mw + ': season exactly with months');
      need(m.plan === null || (Array.isArray(m.plan) && m.plan.length > 0), mw + ': plan null or [[p, version]]');
      (m.plan || []).forEach(function (x) {
        var d = CONTENT[m.place] && CONTENT[m.place].days.filter(function (y) { return y.p === x[0]; })[0];
        need(d && ['', 'easy', 'hard', 'solo'].indexOf(x[1]) > -1 && (x[1] === '' || d[x[1]]), mw + ': no plan ' + x[0] + ' ' + x[1] + ' in ' + m.place);
      });
    });
  });
  need(route === 16, route + ' species On your route, the 16 of finding 7');
  need(gallery >= 20 && gallery <= 30, gallery + ' species in the Gallery, about 25 (finding 12)');
  Object.keys(WILD_PHOTOS).forEach(function (id) {
    var p = WILD_PHOTOS[id];
    need(WILD[id], 'WILD_PHOTOS.' + id + ': no such species');
    need(isText(p.cap) && isText(p.artist) && /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(p.page), 'WILD_PHOTOS.' + id + ': caption, author and the file page on Commons');
    need(/^(CC0|CC BY(-SA)? \d\.\d|Public domain)$/.test(p.license), 'WILD_PHOTOS.' + id + ': a licence allowing changes and commercial use (CC0, CC BY, CC BY-SA, public domain), not ' + p.license);
  });
  // the field guide (finding 14): its places, from south to north, the same as the page with the route links to
  need(JSON.stringify(Object.keys(WILD_GUIDE)) === JSON.stringify(WILD_GUIDE_PLACES), 'WILD_GUIDE: the places of WILD_GUIDE_PLACES (content.js), in that order');
  var axis = Object.keys(WILD_GUIDE).map(function (p) { return PLACES[p] && PLACES[p].axis; });
  need(axis.every(function (a, i) { return a != null && (i === 0 || a >= axis[i - 1]); }), 'WILD_GUIDE: from south to north (the axis of places.js)');
  Object.keys(WILD_GUIDE).forEach(function (p) {
    var g = WILD_GUIDE[p];
    need(isText(g.where) && Array.isArray(g.rows), 'WILD_GUIDE.' + p + ': where and rows');
    need(g.rows.length || Object.keys(WILD).some(function (id) { return (WILD[id].meet || []).some(function (m) { return m.place === p; }); }), 'WILD_GUIDE.' + p + ': rows or encounters');
    g.rows.forEach(function (r, i) {
      need(['wild', 'rescue', 'note'].indexOf(r.kind) > -1 && isText(r.name) && isText(r.how), 'WILD_GUIDE.' + p + '.rows.' + i + ': kind, name and how');
      need(r.kind === 'note' ? r.chance === undefined && r.when === undefined : [0, 1, 2, 3].indexOf(r.chance) > -1, 'WILD_GUIDE.' + p + '.rows.' + i + ': a chance 0–3, none for a note');
    });
  });
  Object.keys(WILD).forEach(function (id) { (WILD[id].meet || []).forEach(function (m) { need(WILD_GUIDE[m.place], 'WILD.' + id + ': ' + m.place + ' has no section in the field guide'); }); });
  need(WILD_AVOID.length === 5 && WILD_AVOID.every(isText), 'WILD_AVOID: five points (finding 15)');
  need(WILD_OUTSIDE.length === 5 && WILD_OUTSIDE.every(function (o) { return isText(o.name) && isText(o.text); }), 'WILD_OUTSIDE: five places (finding 15)');
});

/* Its texts in both languages (finding 19): every text of wild.js and wildphotos.js in English (en/wild.js, en/wildphotos.js),
   with the same numbers and Vietnamese names, in British English for every passport, in Polish to one reader without a
   gendered form; the sentences short: a species' sentence of at most WILD_WHY_WORDS words, an encounter's where and when
   and a row of the guide of at most WILD_LINE_WORDS (the longest of the dry run), in English 6 more. */
var WILD_WHY_WORDS = 32, WILD_LINE_WORDS = 30;
function wildPairs() {
  var out = [];
  function add(path, pl, en, max) { out.push([path, pl, en, max]); }
  Object.keys(WILD).forEach(function (id) {
    var x = WILD[id], e = WILD_EN[id] || {}, w = 'WILD.' + id;
    add(w + '.name', x.name, e.name);
    if (x.alt != null || e.alt != null) add(w + '.alt', x.alt, e.alt);
    add(w + '.why', x.why, e.why, WILD_WHY_WORDS);
    (x.meet || []).forEach(function (m, i) {
      var me = (e.meet || [])[i] || {};
      ['where', 'when', 'chanceNote', 'season'].forEach(function (k) { if (m[k] != null || me[k] != null) add(w + '.meet.' + i + '.' + k, m[k], me[k], WILD_LINE_WORDS); });
    });
  });
  Object.keys(WILD_GUIDE).forEach(function (p) {
    var g = WILD_GUIDE[p], ge = WILD_GUIDE_EN[p] || {};
    add('WILD_GUIDE.' + p + '.where', g.where, ge.where, WILD_LINE_WORDS);
    g.rows.forEach(function (r, i) {
      var re = (ge.rows || [])[i] || {};
      ['name', 'how', 'when'].forEach(function (k) { if (r[k] != null || re[k] != null) add('WILD_GUIDE.' + p + '.rows.' + i + '.' + k, r[k], re[k], WILD_LINE_WORDS); });
    });
  });
  WILD_AVOID.forEach(function (t, i) { add('WILD_AVOID.' + i, t, WILD_AVOID_EN[i], WILD_LINE_WORDS); });
  WILD_OUTSIDE.forEach(function (o, i) { var oe = WILD_OUTSIDE_EN[i] || {}; add('WILD_OUTSIDE.' + i + '.name', o.name, oe.name); add('WILD_OUTSIDE.' + i + '.text', o.text, oe.text, WILD_LINE_WORDS); });
  Object.keys(WILD_PHOTOS).forEach(function (id) { add('WILD_PHOTOS.' + id + '.cap', WILD_PHOTOS[id].cap, WILD_CAPS_EN[id]); });
  return out;
}
contentCheck('wildlife in two languages', function (need) {
  wildPairs().forEach(function (x) {
    need(isText(x[1]) && isText(x[2]), x[0] + ': a text in both languages');
    if (!isText(x[1]) || !isText(x[2])) return;
    englishProblems(x[0] + ' (en)', x[2]).concat(factProblems(x[0], x[1], x[2])).forEach(function (p) { need(false, p); });
    if (x[3]) {
      need(wordCount(x[1]) <= x[3], x[0] + ': ' + wordCount(x[1]) + ' words, at most ' + x[3]);
      need(wordCount(x[2]) <= x[3] + 6, x[0] + ' (en): ' + wordCount(x[2]) + ' words, at most ' + (x[3] + 6));
    }
    need(!/(^|[^\p{L}])(zł|PLN|EUR|USD)(?!\p{L})|[€$]|(^|[^\p{L}])(euro(?!p)|dolar|złotówk)/iu.test(x[1]), x[0] + ': money other than dong');
    need(!/[Pp]olsk|Polak|Polsce/.test(x[1]), x[0] + ': no advice for the citizens of one country');
  });
  styleOk(need, wildPairs().filter(function (x) { return isText(x[1]); }).map(function (x) { return [x[0], x[1]]; }));
  Object.keys(WILD_EN).forEach(function (id) { need(WILD[id], 'WILD_EN.' + id + ': no such species'); });
  Object.keys(WILD_GUIDE_EN).forEach(function (p) { need(WILD_GUIDE[p], 'WILD_GUIDE_EN.' + p + ': no such place'); });
  Object.keys(WILD_CAPS_EN).forEach(function (id) { need(WILD_PHOTOS[id], 'WILD_CAPS_EN.' + id + ': no such photo'); });
  need(WILD_AVOID_EN.length === WILD_AVOID.length && WILD_OUTSIDE_EN.length === WILD_OUTSIDE.length, 'WILD_AVOID_EN and WILD_OUTSIDE_EN: as many as in Polish');
});
```

W `tests/run.sh` zamień:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js site2/src/wildpage.js"
```

na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js site2/src/wildpage.js site2/src/wild.js site2/src/en/wild.js site2/src/wildphotos.js site2/src/en/wildphotos.js"
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
bash "$TMPDIR/wietnam-6/jsc.sh" tests/content.test.js site2/src/wildpage.js 2>&1 | grep -m 1 'the check stopped'
```

Oczekiwane: `tests/run.sh: missing file site2/src/wild.js` i `  wildlife: the check stopped: ReferenceError: Can't find variable: WILD`.

- [ ] **Krok 3: Kod**

W `site2/src/content.js` zamień:

```js
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long', 'Paradise Cave', 'La Dao'];
```

na:

```js
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long', 'Paradise Cave', 'La Dao'];

/* The places with a section in the field guide of the wildlife subpage (WILD_GUIDE in wild.js, stage 6): their stays get
   „Zwierzęta tutaj →” on the page with the route (finding 5), which does not load the subpage's data. */
var WILD_GUIDE_PLACES = ['mekong', 'saigon', 'cattien', 'yokdon', 'danang', 'phongnha', 'cucphuong', 'ninhbinh', 'catba', 'babe'];
```

Utwórz `site2/src/en/wild.js`:

```js
/* The English texts of the wildlife subpage (stage 6), the same fields and order as site2/src/wild.js where it has a text. */
var WILD_EN = {
  duk: { name: 'Red-shanked douc', alt: 'douc langur',
    why: 'Called the “queen of primates”. Doucs share food by passing leaves to one another, which is rare among Old World monkeys.',
    meet: [
      { where: 'the Sơn Trà peninsula: from the roads, in the treetops, in groups of 5–7; a car with a driver, stops and binoculars', chanceNote: 'high to medium',
        when: 'all year, 7:30–17:30 (March–September until 18:30), best early and late in the afternoon; from late March to June they come down for flowers; roads sometimes close in October–November' }
    ] },
  gibbon: { name: 'Yellow-cheeked gibbon', alt: 'yellow-cheeked crested gibbon',
    why: 'Pairs sing duets at dawn. Males are black with golden cheeks; females are born pale, darken, and turn golden again when they mature.',
    meet: [
      { where: 'the park’s dawn trip: a boat from the jetty at about 4:45, back at about 7:30; if it fails, a second try is free', chanceNote: 'medium to see, high to hear',
        when: 'all year, before dawn; without the trip, at about 7:00 you can hear and sometimes see them from the paved road by the visitor centre' }
    ] },
  dukc: { name: 'Black-shanked douc',
    why: 'A bluish face with large yellow rings around the eyes.',
    meet: [
      { where: 'high in the treetops: by the road about 3 km past the bicycle hire and by the road to Bàu Sấu', chanceNote: 'medium to high',
        when: 'all year, mostly in the morning' }
    ] },
  lutungb: { name: 'Delacour’s langur', alt: 'Delacour’s lutung',
    why: 'Creamy fur on the rump and thighs looks like white shorts, hence its Vietnamese name. About 570 live in the world, about 250 of them at Vân Long.',
    meet: [
      { where: 'Vân Long: by rowing boat across the wetland below the limestone peaks; say “monkey” and the boatman heads where they are usually seen', chanceNote: 'medium, a lottery',
        when: 'all year, in the 2 hours after dawn or the 2 hours before sunset' },
      { where: 'the EPRC primate rescue centre by the park gate: 19 of them (2026)',
        when: 'by day, with a park guide booked through its tourism office; the EPRC does not publish its hours' }
    ] },
  slon: { name: 'Asian elephant',
    why: 'At Yok Đôn the females, which have carried no one since 2018, roam the forest and find their own food. The park was the first in Vietnam to commit to tourism without rides or contact.',
    meet: [
      { where: 'on foot behind the elephants with a park guide, morning or afternoon; no riding, bathing or touching',
        when: 'all year, 8:00–11:00 or 13:30–16:30; from May to October the morning is better' }
    ] },
  kroko: { name: 'Siamese crocodile',
    why: 'The Cát Tiên population was rebuilt from 60 animals released in 2004. Today it is counted at night by the shine of their eyes: about 500 on average.',
    meet: [
      { where: 'Bàu Sấu, Crocodile Lake, 9 km by car and 5 km on foot from the headquarters; by day from the watchtower or a small boat', chanceNote: 'medium by day, high at night by the lake',
        when: 'all year; at night hundreds of pairs of eyes shine by the shore, and the night by the lake runs outside August–October, at the Extreme level' }
    ] },
  luskowiec: { name: 'Sunda pangolin',
    why: 'In January 2025 Cúc Phương park and Save Vietnam’s Wildlife released into the forest 12 pangolins taken from smugglers and poachers.',
    meet: [
      { where: 'the Save Vietnam’s Wildlife centre by the park gate, also on one version of the night ride; animals that cannot return to the wild',
        when: 'daily 9:00–11:00 and 14:00–20:00, best after 15:00' }
    ] },
  swietliki: { name: 'Fireflies',
    why: 'At Cúc Phương they glow for only a few weeks a year; in 2026 they came 2–3 weeks earlier than usual.',
    meet: [
      { where: 'the park’s night ride by electric buggy: the Chò chỉ forest; in silence, with no flash and no torches', chanceNote: 'high in season',
        when: 'from late April to early June, 19:00–22:00', season: 'from late April to early June' }
    ] },
  motyle: { name: 'Butterflies',
    why: 'Nearly 400 species of butterfly live at Cúc Phương.',
    meet: [
      { where: 'the park’s roads and paths, the botanical garden and around the gate', chanceNote: 'high in season',
        when: 'from the second week of April to the end of May, most at 10:00–14:00 on sunny days after rain', season: 'from the second week of April to the end of May' },
      { where: 'thousands along the park’s forest roads', chanceNote: 'high in season',
        when: 'from May to July', season: 'from May to July' }
    ] },
  niedzwiedz: { name: 'Bears: sun bear and Asiatic black bear',
    why: 'The sun bear is the world’s smallest bear, about 70 cm at the shoulder; it eats insects and honey with its very long tongue.',
    meet: [
      { where: 'Four Paws’ BEAR SANCTUARY Ninh Bình, about 8 km from Cúc Phương on the road to Bái Đính: 49 bears (May 2026), free entry',
        when: 'daily 9:00–17:00' },
      { where: 'the Free the Bears sanctuary: a tour of about 3 hours for a donation from 1,300,000 VND per person; preparing treats, no contact with the animals',
        when: 'daily 8:30–11:30 or 13:00–16:00' }
    ] },
  lutungj: { name: 'Golden-headed langur', alt: 'Cát Bà langur',
    why: 'About 80 live on Cát Bà island. They can safely drink salt water, as the island has little fresh water.',
    meet: [
      { where: 'the EPRC primate rescue centre by the park gate',
        when: 'by day, with a park guide booked through its tourism office; the EPRC does not publish its hours' },
      { where: 'limestone hills above the sea; there are no tours to see them, at most a chance sighting from a boat or kayak',
        when: 'all year; primate watchers recommend late September to early November' }
    ] },
  kisciec: { name: 'Siamese fireback',
    why: 'The national bird of Thailand.',
    meet: [
      { where: 'the park roads: to Thác Trời, and the tree-lined road by the bird hide', chanceNote: 'medium, “50–50”',
        when: 'about 6:00–7:00 and after 17:00' }
    ] },
  jelenie: { name: 'Sambar and deer',
    why: 'On the Cát Tiên night safari most nights bring deer and civets. At Cúc Phương the park is releasing about 60 deer and sambar into the forest in stages.',
    meet: [
      { where: 'the park’s night safari: about 1 hour, 12 km in an open vehicle; also civets, porcupines and muntjacs',
        when: 'all year, from 18:30' },
      { where: 'the night ride by electric buggy: the semi-wild forest by the gate; in silence and without torches',
        when: 'all year, 19:00–22:00' }
    ] },
  paw: { name: 'Green peafowl', alt: 'green peacock',
    why: 'The male’s tail feathers grow to about 2 m. Vietnam’s largest population lives at Yok Đôn and Cát Tiên.',
    meet: [
      { where: 'the grasslands by the reservoirs; the birds are shy', chanceNote: 'low to medium',
        when: 'in the morning, best in the dry season' },
      { where: 'the park’s grasslands', chanceNote: 'low to medium',
        when: 'in the morning, in the dry season' }
    ] },
  gaur: { name: 'Gaur',
    why: 'The largest wild cattle: bulls weigh up to about 1,500 kg.',
    meet: [
      { where: 'the grasslands by the reservoirs, sometimes from the night safari',
        when: 'in the dry season, in the evening' }
    ] },
  czaple: { name: 'Egrets and herons',
    why: 'At the height of the season tens of thousands of birds return to their nests in a single garden at dusk.',
    meet: [
      { where: 'the Bằng Lăng bird garden in Thốt Nốt, about 50 km from central Cần Thơ; from an 8-metre tower', chanceNote: 'high in season',
        when: 'from August to January, the breeding season; from about 16:00 until dusk', season: 'from August to January' }
    ] },
  kukang: { name: 'Pygmy slow loris', alt: 'pygmy loris',
    why: 'Its bite is venomous: a secretion from glands on its elbows mixes with its saliva.' },
  niedzwm: { name: 'Sun bear',
    why: 'The world’s smallest bear, about 70 cm at the shoulder. It eats insects and honey with its very long tongue.' },
  kurtaczek: { name: 'Bar-bellied pitta',
    why: 'The male has a dark green back, yellow-and-black barred underparts and a dark blue belly patch. It lives only in Vietnam, Laos, Cambodia and south-eastern Thailand, foraging in the leaf litter.' },
  wieloszpon: { name: 'Germain’s peacock-pheasant',
    why: 'It lives only in southern Indochina.' },
  sedziol: { name: 'Red-headed trogon',
    why: 'The male has a crimson head and breast with a narrow white band, the female an olive-brown head. Vietnam’s forests seem to be its stronghold; at Cúc Phương it may appear on the trail to the Đăng tree.' },
  dzioborozec: { name: 'Great hornbill',
    why: 'Its wings span about 1.5 m and its bill carries a yellow-and-black casque; its wingbeats can be heard from far away. The female sits in a sealed tree hole while the male feeds her through a slit.' },
  zaba: { name: 'Vietnamese mossy frog',
    why: 'Its green-and-brown, warty skin looks like moss on rock. When frightened, it curls into a ball and plays dead; at Cúc Phương it is one of nearly 50 amphibian species.' },
  troides: { name: 'Golden birdwing',
    why: 'In India and China it is the largest butterfly: a wingspan of usually 15–17 cm, with a record of 19.4 cm. The male has black forewings and bright yellow hindwings, and the CITES convention restricts trade in it.' },
  rokselana: { name: 'Tonkin snub-nosed monkey',
    why: 'It has a blue face and an upturned nose. An estimated 104–130 live at Khau Ca in two groups (late 2025); a traveller will practically never see one.' },
  saola: { name: 'Saola',
    why: 'Described only in 1993. Scientists have never seen one in the wild, and the last sure trace is a camera-trap photo from 2013.' },
  gibbonr: { name: 'Cao vit gibbon', alt: 'eastern black crested gibbon',
    why: 'Thought extinct, rediscovered in 2002 in Trùng Khánh. Today about 74 live in 11 groups on the Chinese border; there are no tours to see them.' },
  kisciecann: { name: 'Edwards’s pheasant',
    why: 'BirdLife lists it as possibly extinct in the wild. At Bạch Mã the park releases captive-bred birds, but a traveller has little chance of seeing one.' },
  skamielinowiec: { name: 'Laotian rock rat',
    why: 'A “living fossil” from a family thought to have died out 11 million years ago. At Phong Nha camera traps catch it more than any other animal, but no traveller will see it.' }
};

var WILD_GUIDE_EN = {
  mekong: { where: 'around Cần Thơ', rows: [] },
  saigon: { where: 'Cần Giờ, the mangroves south of the city', rows: [
    { name: 'Flying foxes', how: 'at Đầm Dơi in Vàm Sát, by boat around the mangroves; thousands hang upside down on one small island of trees', when: 'all year, by day' },
    { name: 'Macaques on Đảo Khỉ', how: 'over 1,000 free-living long-tailed macaques, fed by visitors; they snatch cameras, bags and food' } ] },
  cattien: { where: 'jungle, the best place on Route G for animals in the wild', rows: [
    { name: 'Pygmy slow loris', how: 'in the evening, in the bamboo by the road on the west side of the river', when: 'not before 20:00' },
    { name: 'Birds along the roads', how: 'hornbills, rollers, bee-eaters, barbets and pigeons; Germain’s peacock-pheasant mostly from local bird guides’ hides', when: 'about 7:00 by the visitor centre' },
    { name: 'King cobras', how: 'they live in the tall grass by the watchtowers: do not walk through the grass' },
    { name: 'Đảo Tiên', how: 'the island with the primate centre is closed, with no reopening date (as of May 2026)' } ] },
  yokdon: { where: 'dry forest with a no-riding elephant programme', rows: [
    { name: 'Dry-forest birds', how: 'over 300 species, including woodpeckers and falconets; with the park’s bird guide, as no one may enter the forest without a guide', when: '5:00–8:00 and 15:00–18:00' },
    { name: 'Banteng', how: 'only the park’s camera traps have seen a herd (April 2026)' } ] },
  danang: { where: 'the Sơn Trà peninsula', rows: [
    { name: 'The Sơn Trà forest', how: 'closed to trekking and wildlife watching, and night walks are banned: the doucs are watched from the roads only' },
    { name: 'Macaques at Linh Ứng pagoda', how: 'these are not doucs: do not feed them, and keep hold of your bag' } ] },
  phongnha: { where: 'forest full of rare animals, almost never seen by visitors', rows: [
    { name: 'Monkeys in the botanical garden', how: 'in the treetops; the park does not name the species, and the primate its camera traps catch most is the stump-tailed macaque', when: 'by day' },
    { name: 'Hatinh langur, red-shanked douc, Laotian rock rat', how: 'they live in the park, but only camera traps see them' },
    { name: 'The Núi Đôi enclosure', how: 'the semi-wild enclosure of the park’s rescue centre still took visitors in 2021; whether it does today, ask the park' } ] },
  cucphuong: { where: 'three rescue centres by the gate and the forest at night', rows: [
    { name: 'Turtle centre', how: 'land and freshwater turtles, next to the EPRC; a visit takes about 20 minutes', when: 'by day' },
    { name: 'Birds', how: 'over 300 species; on the trail to the Đăng tree, among others, the red-headed trogon, woodpeckers and the silver pheasant' },
    { name: 'Giant flying squirrels', how: 'on the path to the Chò tree and at night by the road near the restaurant in the park centre' } ] },
  ninhbinh: { where: 'the Vân Long wetland below the limestone peaks', rows: [
    { name: 'Vân Long waterbirds', how: 'kingfishers, egrets and storks; the storks return to their nests in the late afternoon', when: 'all year, with migrants in winter' } ] },
  catba: { where: 'the island and Lan Hạ Bay', rows: [
    { name: 'Macaques on Monkey Island', how: 'these are not langurs: they snatch food, phones and bags, and visitors report bites' } ] },
  babe: { where: 'Ba Bể lake and Puông cave', rows: [
    { name: 'Bats in Puông cave', how: '5–10 thousand bats of 18 species; from the boat you hear and smell them, but they are hard to spot on the high ceiling', when: 'all year, by day' } ] }
};

var WILD_AVOID_EN = [
  'Bushmeat (“thịt rừng”) in restaurants, “cao” from bones, bear bile and pangolin “medicines”: you cannot tell a legally farmed animal from a poached one.',
  'Souvenirs from protected species: ivory, rhino horn, turtle shell (“đồi mồi”) and snake wine; customs officers confiscate wine with a cobra listed by CITES even back home.',
  'Feeding or touching monkeys on Sơn Trà, on Monkey Island near Cát Bà and on Đảo Khỉ in Cần Giờ: macaques snatch food, phones and bags, and sometimes bite.',
  'Coffee from caged civets (“cà phê chồn”) in Đà Lạt, and elephant rides at Lắk.',
  'Places that let you cuddle animals, hand-feed them or take photos with them: real rescue centres do not let you touch them.'
];

var WILD_OUTSIDE_EN = [
  { name: 'Khau Ca', text: 'Tonkin snub-nosed monkeys, an estimated 104–130 in two groups (late 2025); only on an expedition with a permit and a 2–3 hour walk, and even then almost no chance.' },
  { name: 'Trùng Khánh', text: 'Cao vit gibbons near Bản Giốc in Cao Bằng, about 74 in 11 groups; there are no tours to see them.' },
  { name: 'Bạch Mã', text: '363 bird species, captive-bred Edwards’s pheasants released into the forest and about 6 groups of doucs; the road to the summit has been cut since October 2025.' },
  { name: 'Côn Đảo', text: 'green turtles lay their eggs from April to October, most from June to October; only on a trip with the turtle station staff, in small groups.' },
  { name: 'Tràm Chim', text: 'sarus cranes from Thailand in breeding pens (2026); the sources are silent on wild ones, and it is unclear whether visitors can see the birds in the pens.' }
];
```

Utwórz `site2/src/en/wildphotos.js`:

```js
/* The captions of the wildlife subpage's photos in English (stage 6), the same facts as site2/src/wildphotos.js. */
var WILD_CAPS_EN = {
  duk: 'A red-shanked douc in the wild on the Sơn Trà peninsula in Đà Nẵng',
  dukc: 'A female black-shanked douc with her young in Cát Tiên National Park',
  lutungb: 'A Delacour’s langur on a limestone rock in the Vân Long reserve, in the wild',
  lutungj: 'A Cát Bà langur in the wild on Cát Bà island',
  gibbon: 'A female yellow-cheeked gibbon in Cát Tiên National Park',
  rokselana: 'Two Tonkin snub-nosed monkeys in the wild in north-eastern Vietnam',
  kukang: 'A pygmy slow loris in the Seima protected area in Cambodia',
  slon: 'A female elephant with her calf in the wild in Minneriya National Park, Sri Lanka',
  niedzwm: 'A sun bear in the wild in Kaeng Krachan National Park, Thailand',
  niedzwiedz: 'An Asian black bear outside Vietnam; the photographer does not give the place',
  gaur: 'A gaur in the wild at Valparai in southern India',
  luskowiec: 'A Sunda pangolin in a tree on Sumatra',
  jelenie: 'A male sambar in the wild in Kanha National Park, India',
  paw: 'A male green peafowl spreads its train in the wild in Baluran National Park, Java',
  wieloszpon: 'A Germain’s peacock-pheasant in the wild in Cát Tiên National Park',
  kisciec: 'A Siamese fireback in the wild in Khao Yai National Park, Thailand',
  kurtaczek: 'A bar-bellied pitta in the wild in Cát Tiên National Park',
  dzioborozec: 'A great hornbill in the wild in Bardiya National Park, Nepal',
  sedziol: 'A male red-headed trogon in the wild in Khao Yai National Park, Thailand',
  kroko: 'A Siamese crocodile; the photographer does not give the place',
  zaba: 'A Vietnamese mossy frog in Cúc Phương National Park',
  swietliki: 'Fireflies in a tree by the Abatan river on Bohol in the Philippines',
  motyle: 'A Paris peacock swallowtail in the wild in Arunachal Pradesh, India',
  troides: 'A male golden birdwing in the wild in Bạch Mã National Park',
  czaple: 'A colony of egrets in a bird sanctuary near Cần Thơ in the Mekong delta',
  kisciecann: 'A male Edwards’s pheasant at the zoo in Hồ Chí Minh City, in captivity',
  skamielinowiec: 'A young Laotian rock rat in a researchers’ cage; the source does not give the place'
};
```

Utwórz `site2/src/wild.js`:

```js
/* The wildlife subpage (stage 6): one list of the species for its three tabs, the Field guide by place, what to avoid and
   the places off Route G. Written in Polish, to one reader (ty), without gendered forms (notes/wizja.md).
   A species: name, alt (the name known from guidebooks), vn, lat, iucn, group, route (a card in "On your route"),
   gallery (a tile in the Gallery), why, meet (only with route): { place, kind, where, chance, chanceNote?, when, months,
   season?, plan }; plan: the day plans of the place, as [p, version] ('' the usual one, 'easy', 'hard', 'solo'), whose
   text names the encounter, or null.
   Facts and sources: research/zwierzeta-2026-10.md; the bar-bellied pitta, the red-headed trogon, the great hornbill, the mossy
   frog and the golden birdwing: the gallery research of 16.10.2026. */
var WILD = {
  duk: { name: 'Duk wspaniały', alt: 'duk czerwononogi', vn: 'voọc chà vá chân nâu', lat: 'Pygathrix nemaeus', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Nazywany „królową naczelnych”. Duki dzielą się jedzeniem, podając sobie liście, co wśród małp Starego Świata zdarza się rzadko.',
    meet: [
      { place: 'danang', kind: 'wild', where: 'półwysep Sơn Trà: z dróg, w koronach drzew, w grupach po 5–7; auto z kierowcą, postoje i lornetka', chance: 3, chanceNote: 'duża do średniej',
        when: 'cały rok, 7:30–17:30 (III–IX do 18:30), najlepiej rano i późnym popołudniem; od końca III do VI schodzą po kwiaty; w X–XI drogi bywają zamknięte', months: null, plan: [[2, ''], [1, 'solo']] }
    ] },
  gibbon: { name: 'Gibboniec żółtolicy', alt: 'gibon złotolicy', vn: 'vượn đen má vàng', lat: 'Nomascus gabriellae', iucn: 'EN', group: 'primates', route: true, gallery: true,
    why: 'Pary śpiewają o świcie w duecie. Samce są czarne ze złotymi policzkami, a samice rodzą się jasne, ciemnieją i w dojrzałości znów stają się złociste.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'wycieczka parku o świcie: łódź z przystani ok. 4:45, koniec ok. 7:30; gdy się nie uda, druga próba gratis', chance: 2, chanceNote: 'zobaczyć średnia, usłyszeć duża',
        when: 'cały rok, przed świtem; bez wycieczki ok. 7:00 z asfaltowej drogi przy centrum dla zwiedzających słychać je i czasem widać', months: null, plan: [[2, ''], [1, 'solo']] }
    ] },
  dukc: { name: 'Duk czarnonogi', vn: 'chà vá chân đen', lat: 'Pygathrix nigripes', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Niebieskawa twarz z dużymi żółtymi obwódkami oczu.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'wysoko w koronach: przy drodze ok. 3 km za wypożyczalnią rowerów i przy drodze do Bàu Sấu', chance: 2, chanceNote: 'średnia do dużej',
        when: 'cały rok, głównie rano', months: null, plan: null }
    ] },
  lutungb: { name: 'Lutung białozady', alt: 'langur Delacoura', vn: 'voọc mông trắng', lat: 'Trachypithecus delacouri', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Kremowe futro na zadzie i udach wygląda jak białe szorty, stąd wietnamska nazwa. Na świecie żyje ok. 570 osobników, z tego ok. 250 w Vân Long.',
    meet: [
      { place: 'ninhbinh', kind: 'wild', where: 'Vân Long: łodzią wiosłową po mokradłach pod wapiennymi turniami; na słowo „monkey” przewoźnik płynie tam, gdzie zwykle je widać', chance: 2, chanceNote: 'średnia, to loteria',
        when: 'cały rok, 2 h po świcie albo 2 h przed zachodem', months: null, plan: [[1, ''], [1, 'solo']] },
      { place: 'cucphuong', kind: 'rescue', where: 'ośrodek ratowania naczelnych EPRC przy bramie parku: 19 lutungów (2026)', chance: 3,
        when: 'w dzień, z przewodnikiem parku przez jego biuro turystyki; godzin EPRC nie publikuje', months: null, plan: [[1, ''], [1, 'solo']] }
    ] },
  slon: { name: 'Słoń azjatycki', vn: 'voi châu Á', lat: 'Elephas maximus', iucn: 'EN', group: 'mammals', route: true, gallery: true,
    why: 'W Yok Đôn samice, które od 2018 r. nikogo nie wożą, chodzą wolno po lesie i same szukają jedzenia. Park jako pierwszy w Wietnamie zobowiązał się do turystyki bez jazdy i kontaktu.',
    meet: [
      { place: 'yokdon', kind: 'program', where: 'pieszo za słoniami z przewodnikiem parku, rano albo po południu; bez jazdy, kąpieli i dotykania', chance: 3,
        when: 'cały rok, 8:00–11:00 albo 13:30–16:30; w V–X lepiej rano', months: null, plan: [[2, ''], [2, 'easy'], [1, 'solo']] }
    ] },
  kroko: { name: 'Krokodyl syjamski', vn: 'cá sấu Xiêm', lat: 'Crocodylus siamensis', iucn: 'CR', group: 'reptiles', route: true, gallery: true,
    why: 'Populację w Cát Tiên odtworzono od zera z 60 zwierząt wypuszczonych w 2004 r. Dziś liczy się ją nocą po odblasku oczu: średnio ok. 500.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'Bàu Sấu, Jezioro Krokodyli, 9 km autem i 5 km pieszo od siedziby; za dnia z wieży obserwacyjnej albo z łódki', chance: 2, chanceNote: 'za dnia średnia, nocą nad jeziorem duża',
        when: 'cały rok; nocą przy brzegu świecą setki par oczu, a nocleg nad jeziorem jest poza VIII–X, na poziomie Ekstremalnie', months: null, plan: [[2, ''], [2, 'hard']] }
    ] },
  luskowiec: { name: 'Łuskowiec jawajski', vn: 'tê tê Java', lat: 'Manis javanica', iucn: 'CR', group: 'mammals', route: true, gallery: true,
    why: 'W styczniu 2025 r. park Cúc Phương razem z Save Vietnam’s Wildlife wypuścił do lasu 12 łuskowców odebranych przemytnikom i kłusownikom.',
    meet: [
      { place: 'cucphuong', kind: 'rescue', where: 'ośrodek Save Vietnam’s Wildlife przy bramie parku, też w jednym z wariantów nocnej przejażdżki; zwierzęta, które nie wrócą na wolność', chance: 3,
        when: 'codziennie 9:00–11:00 i 14:00–20:00, najlepiej po 15:00', months: null, plan: [[1, ''], [1, 'solo']] }
    ] },
  swietliki: { name: 'Świetliki', vn: 'đom đóm', lat: 'Lampyridae', group: 'insects', route: true, gallery: true,
    why: 'W Cúc Phương świecą tylko kilka tygodni w roku; w 2026 r. pojawiły się o 2–3 tygodnie wcześniej niż zwykle.',
    meet: [
      { place: 'cucphuong', kind: 'wild', where: 'nocna przejażdżka parku melexem: las Chò chỉ; w ciszy, bez flesza i bez świecenia', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od końca IV do początku VI, 19:00–22:00', months: [4, 5, 6], season: 'od końca IV do początku VI', plan: [[1, ''], [1, 'solo']] }
    ] },
  motyle: { name: 'Motyle', vn: 'bướm', lat: 'Lepidoptera', group: 'insects', route: true, gallery: false,
    why: 'W Cúc Phương żyje prawie 400 gatunków motyli.',
    meet: [
      { place: 'cucphuong', kind: 'wild', where: 'drogi i ścieżki parku, ogród botaniczny i okolice bramy', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od drugiego tygodnia IV do końca V, najwięcej 10:00–14:00 w słoneczne dni po deszczu', months: [4, 5], season: 'od drugiego tygodnia IV do końca V', plan: null },
      { place: 'cattien', kind: 'wild', where: 'tysiące przy leśnych drogach parku', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od V do VII', months: [5, 6, 7], season: 'od V do VII', plan: null }
    ] },
  niedzwiedz: { name: 'Niedźwiedzie: malajski i himalajski', vn: 'gấu chó, gấu ngựa', lat: 'Helarctos malayanus, Ursus thibetanus', iucn: 'VU', group: 'mammals', route: true, gallery: false,
    why: 'Niedźwiedź malajski to najmniejszy niedźwiedź świata, ok. 70 cm w kłębie; bardzo długim językiem wyjada owady i miód.',
    meet: [
      { place: 'cucphuong', kind: 'rescue', where: 'BEAR SANCTUARY Ninh Bình fundacji Four Paws, ok. 8 km od Cúc Phương przy drodze do Bái Đính: 49 niedźwiedzi (V 2026), wstęp wolny', chance: 3,
        when: 'codziennie 9:00–17:00', months: null, plan: null },
      { place: 'cattien', kind: 'rescue', where: 'ośrodek Free the Bears: wycieczka ok. 3 h za datek od 1 300 000 VND od osoby; przygotowanie smakołyków, bez kontaktu ze zwierzętami', chance: 3,
        when: 'codziennie 8:30–11:30 albo 13:00–16:00', months: null, plan: null }
    ] },
  lutungj: { name: 'Lutung jasnogłowy', alt: 'langur z Cát Bà', vn: 'voọc Cát Bà', lat: 'Trachypithecus poliocephalus', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Na wyspie Cát Bà żyje ich ok. 80. Potrafią bezpiecznie pić słoną wodę, bo słodkiej jest na wyspie mało.',
    meet: [
      { place: 'cucphuong', kind: 'rescue', where: 'ośrodek ratowania naczelnych EPRC przy bramie parku', chance: 3,
        when: 'w dzień, z przewodnikiem parku przez jego biuro turystyki; godzin EPRC nie publikuje', months: null, plan: [[1, '']] },
      { place: 'catba', kind: 'wild', where: 'wapienne wzgórza nad morzem; wycieczek do lutungów nie ma, najwyżej przypadkiem z łodzi albo kajaka', chance: 1,
        when: 'cały rok; obserwatorzy naczelnych polecają koniec IX – początek XI', months: null, plan: null }
    ] },
  kisciec: { name: 'Kiściec syjamski', vn: 'gà lôi hông tía', lat: 'Lophura diardi', iucn: 'LC', group: 'birds', route: true, gallery: true,
    why: 'Ptak narodowy Tajlandii.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'drogi parku: do Thác Trời i droga z rzędem drzew przy kryjówce ptasiej', chance: 2, chanceNote: 'średnia, „50 na 50”',
        when: 'ok. 6:00–7:00 i po 17:00', months: null, plan: null }
    ] },
  jelenie: { name: 'Sambary i jelenie', vn: 'nai, hươu', lat: 'Rusa unicolor i inne', iucn: 'VU', group: 'mammals', route: true, gallery: false,
    why: 'Na nocnym safari w Cát Tiên większość nocy daje jelenie i cywety. W Cúc Phương park wypuszcza do lasu w etapach ok. 60 jeleni i sambarów.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'nocne safari parku: ok. 1 h, 12 km odkrytym autem; też cywety, jeżozwierze i mundżaki', chance: 3,
        when: 'cały rok, od 18:30', months: null, plan: [[1, ''], [1, 'solo']] },
      { place: 'cucphuong', kind: 'wild', where: 'nocna przejażdżka melexem: półdziki las przy bramie; w ciszy i bez świecenia', chance: 3,
        when: 'cały rok, 19:00–22:00', months: null, plan: [[1, ''], [1, 'solo']] }
    ] },
  paw: { name: 'Paw złoty', alt: 'paw zielony', vn: 'công lục', lat: 'Pavo muticus', iucn: 'EN', group: 'birds', route: true, gallery: true,
    why: 'Pióra ogona samca mają do ok. 2 m. Największa populacja Wietnamu żyje w Yok Đôn i Cát Tiên.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'trawiaste tereny przy zbiornikach wodnych; ptaki są płochliwe', chance: 1, chanceNote: 'mała do średniej',
        when: 'rano, najlepiej w porze suchej', months: null, plan: null },
      { place: 'yokdon', kind: 'wild', where: 'trawiaste tereny parku', chance: 1, chanceNote: 'mała do średniej',
        when: 'rano, w porze suchej', months: null, plan: null }
    ] },
  gaur: { name: 'Gaur', vn: 'bò tót', lat: 'Bos gaurus', iucn: 'VU', group: 'mammals', route: true, gallery: true,
    why: 'Największe dzikie bydło: byki ważą do ok. 1 500 kg.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'trawiaste tereny przy zbiornikach, czasem z nocnego safari', chance: 1,
        when: 'w porze suchej, wieczorem', months: null, plan: null }
    ] },
  czaple: { name: 'Czaple', vn: 'cò', lat: 'Ardeidae', group: 'birds', route: true, gallery: false,
    why: 'W szczycie sezonu o zmierzchu dziesiątki tysięcy ptaków wracają do gniazd w jednym ogrodzie.',
    meet: [
      { place: 'mekong', kind: 'wild', where: 'ogród ptaków Bằng Lăng w Thốt Nốt, ok. 50 km od centrum Cần Thơ; z 8-metrowej wieży', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od VIII do I, w porze lęgów; od ok. 16:00 do zmierzchu', months: [8, 9, 10, 11, 12, 1], season: 'od VIII do I', plan: null }
    ] },
  // only in the Gallery
  kukang: { name: 'Kukang mały', alt: 'lori mały', vn: 'cu li nhỏ', lat: 'Xanthonycticebus pygmaeus', iucn: 'EN', group: 'primates', route: false, gallery: true,
    why: 'Ma jadowite ugryzienie: wydzielina z gruczołów na łokciach miesza się ze śliną.' },
  niedzwm: { name: 'Niedźwiedź malajski', vn: 'gấu chó', lat: 'Helarctos malayanus', iucn: 'VU', group: 'mammals', route: false, gallery: true,
    why: 'Najmniejszy niedźwiedź świata, ok. 70 cm w kłębie. Bardzo długim językiem wyjada owady i miód.' },
  kurtaczek: { name: 'Kurtaczek prążkowany', vn: 'đuôi cụt bụng vằn', lat: 'Hydrornis elliotii', iucn: 'LC', group: 'birds', route: false, gallery: true,
    why: 'Samiec ma ciemnozielony grzbiet, żółto-czarne prążki od spodu i granatową plamę na brzuchu. Żyje tylko w Wietnamie, Laosie, Kambodży i południowo-wschodniej Tajlandii, a pokarmu szuka w leśnej ściółce.' },
  wieloszpon: { name: 'Wieloszpon wietnamski', vn: 'gà tiền mặt đỏ', lat: 'Polyplectron germaini', iucn: 'VU', group: 'birds', route: false, gallery: true,
    why: 'Żyje tylko na południu Indochin.' },
  sedziol: { name: 'Sędzioł czerwonogłowy', vn: 'nuốc bụng đỏ', lat: 'Harpactes erythrocephalus', iucn: 'LC', group: 'birds', route: false, gallery: true,
    why: 'Samiec ma karminową głowę i pierś z wąskim białym paskiem, samica oliwkowobrązową głowę. Lasy Wietnamu wydają się jego ostoją, a w Cúc Phương można go spotkać na szlaku do drzewa Đăng.' },
  dzioborozec: { name: 'Dzioborożec wielki', vn: 'hồng hoàng', lat: 'Buceros bicornis', iucn: 'VU', group: 'birds', route: false, gallery: true,
    why: 'Ma ok. 1,5 m rozpiętości skrzydeł i żółto-czarny hełm na dziobie; łopot jego skrzydeł słychać z daleka. Samica siedzi w zamurowanej dziupli, a samiec karmi ją przez szczelinę.' },
  zaba: { name: 'Żaba mszysta', vn: 'ếch cây sần Bắc Bộ', lat: 'Theloderma corticale', iucn: 'LC', group: 'reptiles', route: false, gallery: true,
    why: 'Zielono-brązowa, guzowata skóra wygląda jak mech na skale. Przestraszona zwija się w kulkę i udaje martwą; w Cúc Phương to jeden z prawie 50 gatunków płazów.' },
  troides: { name: 'Troides aeacus', vn: 'bướm cánh chim vàng', lat: 'Troides aeacus', iucn: 'LC', group: 'insects', route: false, gallery: true,
    why: 'W Indiach i Chinach to największy motyl: rozpiętość skrzydeł zwykle 15–17 cm, rekord 19,4 cm. Samiec ma czarne przednie skrzydła i jaskrawożółte tylne, a handel nim ogranicza konwencja CITES.' },
  // the legends: in the Gallery, with a plain word that a traveller will not see them
  rokselana: { name: 'Rokselana zadartonosa', vn: 'voọc mũi hếch', lat: 'Rhinopithecus avunculus', iucn: 'CR', group: 'legends', route: false, gallery: true,
    why: 'Ma niebieską twarz i zadarty nos. W Khau Ca żyje szacunkowo 104–130 osobników w dwóch grupach (koniec 2025); turysta praktycznie jej nie zobaczy.' },
  saola: { name: 'Saola', vn: 'sao la', lat: 'Pseudoryx nghetinhensis', iucn: 'CR', group: 'legends', route: false, gallery: true, nophoto: true,
    why: 'Opisana dopiero w 1993 r. Naukowcy nigdy nie widzieli jej na wolności, a ostatni pewny ślad to zdjęcie z fotopułapki z 2013 r.' },
  gibbonr: { name: 'Gibboniec reliktowy', alt: 'gibon Cao vit', vn: 'vượn Cao vít', lat: 'Nomascus nasutus', iucn: 'CR', group: 'legends', route: false, gallery: true, nophoto: true,
    why: 'Uznany za wymarły, odnaleziony w 2002 r. w Trùng Khánh. Dziś ok. 74 osobniki w 11 grupach przy granicy z Chinami; wycieczek do nich nie ma.' },
  kisciecann: { name: 'Kiściec annamski', vn: 'gà lôi lam mào trắng', lat: 'Lophura edwardsi', iucn: 'CR', group: 'legends', route: false, gallery: true,
    why: 'BirdLife uznaje go za możliwie wymarłego na wolności. W Bạch Mã park wypuszcza ptaki z hodowli, ale szansa, że zobaczy je turysta, jest mała.' },
  skamielinowiec: { name: 'Skamielinowiec laotański', vn: 'chuột đá Trường Sơn', lat: 'Laonastes aenigmamus', group: 'legends', route: false, gallery: true,
    why: '„Żywa skamieniałość” z rodziny uznanej za wymarłą 11 mln lat temu. W Phong Nha to najczęstsze zwierzę na fotopułapkach, ale turysta go nie zobaczy.' }
};

// the Field guide: the places from south to north, each with a short line where it is and the rows that only the guide has
var WILD_GUIDE = {
  mekong: { where: 'okolice Cần Thơ', rows: [] },
  saigon: { where: 'Cần Giờ, namorzyny na południe od miasta', rows: [
    { name: 'Rudawki', kind: 'wild', how: 'nad Đầm Dơi w Vàm Sát, łodzią wokół namorzyn; tysiące wiszą głową w dół na jednej małej wysepce drzew', when: 'cały rok, za dnia', chance: 3 },
    { name: 'Makaki na Đảo Khỉ', kind: 'note', how: 'ponad 1 000 wolno żyjących makaków krabożernych, karmionych przez turystów; wyrywają aparaty, torby i jedzenie' } ] },
  cattien: { where: 'dżungla, najlepsze miejsce Route G na zwierzęta na wolności', rows: [
    { name: 'Kukang mały', kind: 'wild', how: 'wieczorem w bambusach przy drodze po zachodniej stronie rzeki', when: 'nie przed 20:00', chance: 1 },
    { name: 'Ptaki przy drogach', kind: 'wild', how: 'dzioborożce, kraski, żołny, brodacze i gołębie; wieloszpon wietnamski głównie z kryjówek przewodników ptasich', when: 'ok. 7:00 przy centrum dla zwiedzających', chance: 3 },
    { name: 'Kobry królewskie', kind: 'note', how: 'żyją w wysokiej trawie przy wieżach obserwacyjnych: przez trawę nie chodź' },
    { name: 'Đảo Tiên', kind: 'note', how: 'wyspa z ośrodkiem naczelnych jest zamknięta i nie ma daty otwarcia (stan z V 2026)' } ] },
  yokdon: { where: 'suchy las z programem słoni bez jazdy', rows: [
    { name: 'Ptaki suchego lasu', kind: 'wild', how: 'ponad 300 gatunków, m.in. dzięcioły i sokoliki; z przewodnikiem ptasim parku, bo bez przewodnika do lasu wejść nie wolno', when: '5:00–8:00 i 15:00–18:00', chance: 2 },
    { name: 'Bantengi', kind: 'wild', how: 'stado widziały tylko fotopułapki parku (IV 2026)', chance: 0 } ] },
  danang: { where: 'półwysep Sơn Trà', rows: [
    { name: 'Las Sơn Trà', kind: 'note', how: 'zamknięty dla trekkingu i obserwacji zwierząt, a nocne wyjścia są zakazane: duki ogląda się tylko z dróg' },
    { name: 'Makaki przy pagodzie Linh Ứng', kind: 'note', how: 'to nie duki: nie karm ich i pilnuj torby' } ] },
  phongnha: { where: 'las pełen rzadkich zwierząt, prawie niewidocznych dla turysty', rows: [
    { name: 'Małpy w ogrodzie botanicznym', kind: 'wild', how: 'w koronach drzew; gatunku park nie podaje, a najczęstszy naczelny na jego fotopułapkach to makak niedźwiedzi', when: 'w dzień', chance: 1 },
    { name: 'Lutung pręgogłowy, duk wspaniały, skamielinowiec laotański', kind: 'wild', how: 'żyją w parku, ale widzą je tylko fotopułapki', chance: 0 },
    { name: 'Wybieg Núi Đôi', kind: 'note', how: 'półdziki wybieg ośrodka ratowania parku przyjmował turystów jeszcze w 2021 r.; czy przyjmuje dziś, trzeba zapytać w parku' } ] },
  cucphuong: { where: 'trzy ośrodki ratowania przy bramie i las nocą', rows: [
    { name: 'Ośrodek żółwi', kind: 'rescue', how: 'żółwie lądowe i słodkowodne, obok EPRC; zwiedzanie trwa ok. 20 min', when: 'w dzień', chance: 3 },
    { name: 'Ptaki', kind: 'wild', how: 'ponad 300 gatunków; na szlaku do drzewa Đăng m.in. sędzioł czerwonogłowy, dzięcioły i kiściec srebrzysty', chance: 2 },
    { name: 'Wielkoloty', kind: 'wild', how: 'duże latające wiewiórki: na ścieżce do drzewa Chò i nocą przy drodze koło restauracji w centrum parku', chance: 1 } ] },
  ninhbinh: { where: 'mokradła Vân Long pod wapiennymi turniami', rows: [
    { name: 'Ptaki wodne Vân Long', kind: 'wild', how: 'zimorodki, czaple i bociany; bociany wracają do gniazd późnym popołudniem', when: 'cały rok, zimą też ptaki przelotne', chance: 3 } ] },
  catba: { where: 'wyspa i zatoka Lan Hạ', rows: [
    { name: 'Makaki na Monkey Island', kind: 'note', how: 'to nie lutungi: wyrywają jedzenie, telefony i torby, a relacje mówią o ugryzieniach' } ] },
  babe: { where: 'jezioro Ba Bể i jaskinia Puông', rows: [
    { name: 'Nietoperze w jaskini Puông', kind: 'wild', how: '5–10 tys. nietoperzy z 18 gatunków; z łodzi słychać je i czuć, ale na wysokim stropie trudno je wypatrzyć', when: 'cały rok, w dzień', chance: 2 } ] }
};

// "Czego unikać": five points, each the object of "avoid" (in Polish in the genitive)
var WILD_AVOID = [
  'Dziczyzny („thịt rừng”) w restauracjach, „cao” z kości, żółci niedźwiedzia i „lekarstw” z łuskowca: zwierzęcia z legalnej hodowli nie odróżnisz od kłusowniczego.',
  'Pamiątek z gatunków chronionych: kości słoniowej, rogu nosorożca, skorup żółwi („đồi mồi”) i wina z wężem; wino z kobrą z listy CITES celnicy zabierają też po powrocie.',
  'Karmienia i dotykania małp na Sơn Trà, na Monkey Island koło Cát Bà i na Đảo Khỉ w Cần Giờ: makaki wyrywają jedzenie, telefony i torby, a bywa, że gryzą.',
  'Kawy z cywet trzymanych w klatkach („cà phê chồn”) w Đà Lạt i jazdy na słoniach w Lắk.',
  'Miejsc, które pozwalają przytulać zwierzęta, karmić je z ręki albo robić sobie z nimi zdjęcia: prawdziwe ośrodki ratowania nie pozwalają ich dotykać.'
];

// "Poza Route G": five places, one sentence each, shown after the name and a colon
var WILD_OUTSIDE = [
  { name: 'Khau Ca', text: 'rokselany zadartonose, szacunkowo 104–130 w dwóch grupach (koniec 2025); tylko wyprawa z pozwoleniem i 2–3 h marszu, a szansa i tak prawie żadna.' },
  { name: 'Trùng Khánh', text: 'gibbońce reliktowe przy Bản Giốc w Cao Bằng, ok. 74 w 11 grupach; wycieczek do nich nie ma.' },
  { name: 'Bạch Mã', text: '363 gatunki ptaków, kiściec annamski z hodowli wypuszczany do lasu i ok. 6 grup duków; droga na szczyt jest przerwana od X 2025.' },
  { name: 'Côn Đảo', text: 'żółwie zielone składają jaja w IV–X, najwięcej w VI–X; tylko na wycieczce z pracownikami stacji ochrony żółwi, w małych grupach.' },
  { name: 'Tràm Chim', text: 'żurawie indyjskie z Tajlandii w zagrodach do rozrodu (2026); o dzikich źródła milczą, a czy turysta zobaczy ptaki w zagrodach, nie wiadomo.' }
];
```

Utwórz `site2/src/wildphotos.js`:

```js
/* The photos of the wildlife subpage (stage 6): one per species, in the order of the gallery, from Wikimedia Commons, the
   caption saying where it was taken (decision 6 of stage 6: the wild in Vietnam first, then the wild elsewhere, captivity only
   when nothing else; notes/wizja.md). Licences as in photos.js: CC0, CC BY, CC BY-SA or public domain, never NC or ND.
   The files are photos/wild/<id>.jpg (not in git; see notes/etapy.md); sources: research/zwierzeta-zdjecia-2026-10.md. */
var WILD_PHOTOS = {
  duk: { cap: 'Duk wspaniały na wolności na półwyspie Sơn Trà w Đà Nẵng', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Red-shanked_douc_langur_(Pygathrix_nemaeus)_head_Son_Tra.jpg' },
  dukc: { cap: 'Samica duka czarnonogiego z młodym w Parku Narodowym Cát Tiên', artist: 'Broobas', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Black-shanked_douc.jpg' },
  lutungb: { cap: 'Lutung białozady na wapiennej skale w rezerwacie Vân Long, na wolności', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Delacour%27s_langur_(Trachypithecus_delacouri)_Van_Long_2.jpg' },
  lutungj: { cap: 'Lutung jasnogłowy na wolności na wyspie Cát Bà', artist: 'ALOnIShOnETH', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Cat_Ba_Langur_6_(cropped).jpg' },
  gibbon: { cap: 'Samica gibbońca żółtolicego w Parku Narodowym Cát Tiên', artist: 'Roy Bateman', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Golden-cheeked_gibbon_female_CTNP.jpg' },
  rokselana: { cap: 'Dwie rokselany na wolności w północno-wschodnim Wietnamie', artist: 'Quyet Le', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Tonkin_snub-nosed_monkeys_(Rhinopithecus_avunculus).jpg' },
  kukang: { cap: 'Kukang mały na obszarze chronionym Seima w Kambodży', artist: 'Dr. K.A.I. Nekaris', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Nycticebus_pygmaeus_010.jpg' },
  slon: { cap: 'Słonica ze słoniątkiem na wolności w Parku Narodowym Minneriya na Sri Lance', artist: 'Carlos Delgado', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Elephas_maximus_maximus_-_01.jpg' },
  niedzwm: { cap: 'Niedźwiedź malajski na wolności w Parku Narodowym Kaeng Krachan w Tajlandii', artist: 'Rushen, Thai National Parks', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Helarctos_malayanus,_Sun_bear_-_Kaeng_Krachan_National_Park_(50770053781).jpg' },
  niedzwiedz: { cap: 'Niedźwiedź himalajski poza Wietnamem; miejsca autor nie podaje', artist: 'Shiv\'s fotografia', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Moon_bear.jpg' },
  gaur: { cap: 'Gaur na wolności w Valparai w południowych Indiach', artist: 'Timothy A. Gonsalves', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Head_Gaur_Sheikalmudi_Valparai_Feb26_A7CR_10338.jpg' },
  luskowiec: { cap: 'Łuskowiec jawajski na drzewie na Sumatrze', artist: 'Frendi Apen Irawan', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Trenggiling_Sunda_Sunda_Pangolin_Manis_javanica.jpg' },
  jelenie: { cap: 'Samiec sambara na wolności w Parku Narodowym Kanha w Indiach', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sambar_(Cervus_unicolor_unicolor)_male.jpg' },
  paw: { cap: 'Samiec pawia złotego rozkłada tren na wolności w Parku Narodowym Baluran na Jawie', artist: 'Panji Gusti Akbar', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Javan_Green_Peafowl_in_Baluran_National_Park.jpg' },
  wieloszpon: { cap: 'Wieloszpon wietnamski na wolności w Parku Narodowym Cát Tiên', artist: 'JJ Harrison', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Germain%27s_Peacock-Pheasant_(male)_IMG_7861_copy.jpg' },
  kisciec: { cap: 'Kiściec syjamski na wolności w Parku Narodowym Khao Yai w Tajlandii', artist: 'Rushenb, Thai National Parks', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Siamese-fireback-Lophura-diardi-khao-yai-national-park.jpg' },
  kurtaczek: { cap: 'Kurtaczek prążkowany na wolności w Parku Narodowym Cát Tiên', artist: 'JJ Harrison', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Bar-bellied_Pitta.jpg' },
  dzioborozec: { cap: 'Dzioborożec wielki na wolności w Parku Narodowym Bardiya w Nepalu', artist: 'Dasrath Shrestha Beejukchhen (Bablu)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Great_hornbill_in_bardiya.jpg' },
  sedziol: { cap: 'Samiec sędzioła czerwonogłowego na wolności w Parku Narodowym Khao Yai w Tajlandii', artist: 'JJ Harrison', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Harpactes_erythrocephalus_-_Khao_Yai.jpg' },
  kroko: { cap: 'Krokodyl syjamski; miejsca zdjęcia autor nie podaje', artist: 'Marco Almbauer', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Crocodylus_siamensis_(Siam-Krokodil).jpg' },
  zaba: { cap: 'Żaba mszysta w Parku Narodowym Cúc Phương', artist: 'Caitlin 0000', license: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Theloderma_corticale_C%C3%BAc_Ph%C6%B0%C6%A1ng_06.jpg' },
  swietliki: { cap: 'Świetliki na drzewie nad rzeką Abatan na wyspie Bohol na Filipinach', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Fireflies_(Pteroptyx_mcdermotti)_Bohol.jpg' },
  motyle: { cap: 'Paź Papilio paris na wolności w Arunachal Pradesh w Indiach', artist: 'MaheshBaruahwildlife', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Open_wing_moisture_sucking_position_of_Papilio_paris_Linnaeus,_1758_-_Paris_Peacock_1.jpg' },
  troides: { cap: 'Samiec Troides aeacus na wolności w Parku Narodowym Bạch Mã', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Golden_birdwing_(Troides_aeacus)_male_Bach_Ma.jpg' },
  czaple: { cap: 'Kolonia czapli w ogrodzie ptaków koło Cần Thơ w delcie Mekongu', artist: 'Isabell Schulz', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Stork_sanctuary,_Mekong_Delta_(45199906095).jpg' },
  kisciecann: { cap: 'Samiec kiśćca annamskiego w zoo w Hồ Chí Minh City, w niewoli', artist: 'Hà Nghĩa VN', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Vietnam_Pheasant.jpg' },
  skamielinowiec: { cap: 'Młody skamielinowiec laotański w klatce badaczy; miejsca źródło nie podaje', artist: 'Jean-Pierre Hugot', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Laonastes_aenigmamus_-_young_male_JP_Hugot_PLOS_ONE.jpg' }
};
```

W `tools/licenses.sh` zamień:

```bash
# Checks the photos of the page (PHOTO_META in site2/src/photos.js) against Wikimedia Commons: asks the Commons API for each
```

na:

```bash
# Checks the photos of the page (PHOTO_META in site2/src/photos.js) and of the wildlife subpage (WILD_PHOTOS in
# site2/src/wildphotos.js, stage 6) against Wikimedia Commons: asks the Commons API for each
```

W `tools/licenses.sh` zamień:

```bash
src = open('site2/src/photos.js', encoding='utf-8').read()
meta = {}
```

na:

```bash
meta = {}
```

W `tools/licenses.sh` zamień:

```bash
for m in re.finditer(r"^  ([a-z]+_\d+): \{ cap: '((?:[^'\\]|\\.)*)', artist: '((?:[^'\\]|\\.)*)', license: '([^']*)', page: '([^']*)' \}", src, re.M):
    meta[m.group(1)] = {'artist': m.group(3).replace("\\'", "'"), 'license': m.group(4), 'title': urllib.parse.unquote(m.group(5).split('/wiki/', 1)[1]).replace('_', ' ')}
n_src = len(re.findall(r"^  [a-z]+_\d+: \{", src, re.M))
if len(meta) != n_src:
    print('licenses.sh: read %d of %d entries of photos.js' % (len(meta), n_src)); sys.exit(1)
```

na:

```bash
for name, idre, prefix in (('photos.js', r'[a-z]+_\d+', ''), ('wildphotos.js', r'[a-z]+', 'wild:')):
    src = open('site2/src/' + name, encoding='utf-8').read()
    n = 0
    for m in re.finditer(r"^  (" + idre + r"): \{ cap: '((?:[^'\\]|\\.)*)', artist: '((?:[^'\\]|\\.)*)', license: '([^']*)', page: '([^']*)' \}", src, re.M):
        meta[prefix + m.group(1)] = {'artist': m.group(3).replace("\\'", "'"), 'license': m.group(4), 'title': urllib.parse.unquote(m.group(5).split('/wiki/', 1)[1]).replace('_', ' ')}
        n += 1
    n_src = len(re.findall(r"^  " + idre + r": \{", src, re.M))
    if n != n_src:
        print('licenses.sh: read %d of %d entries of %s' % (n, n_src, name)); sys.exit(1)
```

- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
bash tools/licenses.sh | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
```

Oczekiwane: `ALL PASS` i `licenses.sh: 124 photos, 0 licence problem(s), 2 author(s) to check` (dwie linie `AUTHOR`, zob. pułapki); grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/content.js site2/src/en/wild.js site2/src/en/wildphotos.js site2/src/wild.js site2/src/wildphotos.js tests/content.test.js tests/run.sh tools/licenses.sh
git commit -q -F - <<'EOF'
Etap 6, zadanie 3 (podstrona zwierząt, dane): wild.js z 29 gatunkami (16 na kartach „Na trasie” ze spotkaniami, 25 w galerii, z nich 5 legend), przewodnikiem po 10 miejscach z południa na północ, pięcioma punktami „Czego unikać” i pięcioma miejscami „Poza Route G”, teksty po angielsku w en/wild.js z tymi samymi faktami; 27 zdjęć z Wikimedia Commons z podpisem, gdzie je zrobiono (wildphotos.js, en/wildphotos.js; pliki w photos/wild/), saola i gibboniec reliktowy bez zdjęcia; WILD_GUIDE_PLACES w content.js dla wejść ze strony z trasą; licenses.sh sprawdza też zdjęcia podstrony; testy treści: pola, miejsca, miesiące, plany dni, zdjęcia i licencje, oba języki z tymi samymi liczbami i nazwami wietnamskimi, długości zdań (ustalenia 7, 8, 12–20, 22)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff e6d5255 HEAD -- site2 tests tools README.md` nic nie wypisuje.

---

### Zadanie 4: Podstrona …/wildlife/: szablon, logika, build, sonda

Ustalenia 1–4, 9–15, 22 i 27 sesji decyzji, ustalenia 1–10 i 18 sesji planowania. `site2/src/wild.html`: nagłówek („← Twoja trasa” albo „← Zaplanuj trasę”, EN · PL, nazwa, zdanie, zakładki jako linki), trzy panele, stopka z autorami zdjęć, `<dialog>` podglądu; `/* __TOKENS__ */` dostaje z `build.py` tokeny kolorów strony z trasą. `site2/src/wildapp.js`: trasa z linku (`settingsFromLink`, `planRoute`, `whyOff`, `tripStays`), karty z ✓ i ✗, „Dodaj” z zapowiedzią, galeria i podgląd, przewodnik, przełącznik EN · PL i zakładki (`hashchange`; trasa liczy się na nowo tylko, gdy zmieniła się część linku poza zakładką). Teksty interfejsu w `site2/src/wildui.js` i `site2/src/en/wildui.js` (`WUI`; słowa wspólne ze stroną z trasą, np. miesiące, poziomy i „Po dodaniu wypadnie”, z `UI`). `site2/build.py`: `WILD_SCRIPTS`, `wild_page()` (zdjęcia z `photos/wild/` do `img/wild/` w 1400 px i kopiach 480 i 960 px, `og-wild.jpg` z duka), `head_extras` z podglądem linku jako argumentem (`PREVIEW` dostaje `url` i `image`; strona z trasą bez zmian), `og_image()`. `tests/probe.sh` i `tests/shot.sh` z `PAGE=wildlife`, sonda `tests/probes/wild.js`, test treści `wildlife interface`.

**Pliki:**
- Utwórz: `site2/src/en/wildui.js`, `site2/src/wild.html`, `site2/src/wildapp.js`, `site2/src/wildui.js`
- Zmień: `site2/build.py`
- Testy: `tests/content.test.js`, `tests/probe.sh`, `tests/probes/wild.js`, `tests/run.sh`, `tests/shot.sh`

- [ ] **Krok 1: Testy, które nie przechodzą**

W `tests/content.test.js` zamień:

```js
  need(WILD_AVOID_EN.length === WILD_AVOID.length && WILD_OUTSIDE_EN.length === WILD_OUTSIDE.length, 'WILD_AVOID_EN and WILD_OUTSIDE_EN: as many as in Polish');
});
```

na:

```js
  need(WILD_AVOID_EN.length === WILD_AVOID.length && WILD_OUTSIDE_EN.length === WILD_OUTSIDE.length, 'WILD_AVOID_EN and WILD_OUTSIDE_EN: as many as in Polish');
});

/* The subpage's interface (wildui.js, finding 19): the same keys in both languages and in the same order, British English,
   Polish to one reader; each key used by the subpage (wildapp.js, wild.html), and each key the subpage asks for there, in
   WUI or, for the words both pages share, in UI. */
contentCheck('wildlife interface', function (need) {
  styleOk(need, strings(WUI.pl, 'WUI.pl', []));
  need(JSON.stringify(Object.keys(WUI.pl)) === JSON.stringify(Object.keys(WUI.en)), 'WUI.en: the keys of WUI.pl in the same order');
  Object.keys(WUI.en).forEach(function (k) {
    need(isText(WUI.pl[k]) && isText(WUI.en[k]), 'WUI: ' + k + ' in both languages');
    if (isText(WUI.en[k])) englishProblems('WUI.en.' + k, WUI.en[k]).forEach(function (p) { need(false, p); });
  });
  var app = readFile('site2/src/wildapp.js'), tpl = readFile('site2/src/wild.html'), used = {};
  (app.match(/\bT\('[^']+'/g) || []).forEach(function (m) { used[m.slice(3, -1)] = true; });
  (app.match(/\bT\([^'()]{1,80}\? *'[^']+' *: *'[^']+'/g) || []).forEach(function (m) { m.match(/'[^']+'/g).forEach(function (q) { used[q.slice(1, -1)] = true; }); });
  (tpl.match(/data-i18n(?:-aria)?="[^"]+"/g) || []).forEach(function (m) { used[m.split('"')[1]] = true; });
  Object.keys(used).forEach(function (k) { need(/\.$/.test(k) || k in WUI.pl || k in UI.pl, 'the subpage asks for the missing key ' + k); });
  // keys built from a prefix: w.kind., w.chance., w.iucn., w.g.
  Object.keys(WUI.pl).forEach(function (k) {
    var prefix = /^w\.(kind|chance|iucn|g)\./.test(k);
    need(used[k] || prefix, 'WUI.pl[\'' + k + '\'] is used nowhere');
  });
});
```

W `tests/probe.sh` zamień:

```bash
# Pitfalls: the page scrolls smoothly, so set document.documentElement.style.scrollBehavior = 'auto' before scrollTo;
```

na:

```bash
# PAGE=wildlife runs the wildlife subpage instead (stage 6, site2/out/pages/wildlife/index.html, its images one folder up):
#   PAGE=wildlife tests/probe.sh tests/probes/wild.js 390 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2'
# Pitfalls: the page scrolls smoothly, so set document.documentElement.style.scrollBehavior = 'auto' before scrollTo;
```

W `tests/probe.sh` zamień:

```bash
[ -s site2/out/pages/index.html ] || { echo "probe.sh: run python3 site2/build.py first" >&2; exit 1; }
D="${TMPDIR:-/tmp}/vn-probe"; rm -rf "$D"; mkdir -p "$D"
```

na:

```bash
PAGE="${PAGE:-}"; SUB="${PAGE:+$PAGE/}"
[ -s "site2/out/pages/${SUB}index.html" ] || { echo "probe.sh: run python3 site2/build.py first" >&2; exit 1; }
D="${TMPDIR:-/tmp}/vn-probe"; rm -rf "$D"; mkdir -p "$D${SUB:+/$PAGE}"
```

W `tests/probe.sh` zamień:

```bash
{ cat site2/out/pages/index.html; echo "<script>window.__probeHash = '#$HASH';"; cat tests/probes/lib.js "$1"; echo "</script>"; } > "$D/index.html"
printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0}iframe{border:0;display:block}</style><iframe src="index.html#%s" width="%s" height="900"></iframe>' "$HASH" "$2" > "$D/wrap.html"
```

na:

```bash
{ cat "site2/out/pages/${SUB}index.html"; echo "<script>window.__probeHash = '#$HASH';"; cat tests/probes/lib.js "$1"; echo "</script>"; } > "$D/${SUB}index.html"
printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0}iframe{border:0;display:block}</style><iframe src="%sindex.html#%s" width="%s" height="900"></iframe>' "$SUB" "$HASH" "$2" > "$D/wrap.html"
```

Utwórz `tests/probes/wild.js`:

```js
/* The wildlife subpage (stage 6, finding 22): run with PAGE=wildlife, in both languages (&lang=pl at the end), at 320–1400
   px, on a link with a trip and on one without:
     PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 390 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2'
     PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 1400 'gallery&lang=pl'
   The tabs and their addresses; ✓ and ✗ only with a trip; fireflies in the day's plan in May and out of the term in
   February (the probe checks the trip's month); Dodaj with what would leave the trip; the switch EN · PL keeping the tab and
   the trip; the photo viewer; a place of the field guide; no sideways scroll; noindex and the link preview. */
(function () {
  var W = window.__wild, trip = W.trip(), hash = window.__probeHash, pl = LANG === 'pl';
  var vis = function (sel) { var e = document.querySelector(sel); return !!e && e.checkVisibility(); };
  check('the page language from the link', document.documentElement.lang === (/(&|#)lang=pl(&|$)/.test(hash) ? 'pl' : 'en'));
  check('noindex and its own link preview', !!document.querySelector('meta[name="robots"][content="noindex"]') &&
    /\/wildlife\/$/.test((document.querySelector('meta[property="og:url"]') || {}).content || '') && /og-wild\.jpg$/.test((document.querySelector('meta[property="og:image"]') || {}).content || ''));
  // the tab of the link (finding 3): with a trip On your route, without one the Gallery, unless the link names one
  var named = (hash.replace(/^#/, '').split('&')[0].match(/^(route|gallery|guide)/) || [])[1];
  var want = named || (trip ? 'route' : 'gallery');
  check('the tab of the link: ' + want, W.view().tab === want && vis('#p-' + want) && ['route', 'gallery', 'guide'].filter(function (t) { return vis('#p-' + t); }).length === 1);
  check('the tab is marked', document.querySelector('#tab-' + want).getAttribute('aria-current') === 'page');
  check('each tab has its own address, with the trip', ['route', 'gallery', 'guide'].every(function (t) {
    var h = document.querySelector('#tab-' + t).getAttribute('href');
    return h.indexOf('#' + t) === 0 && (!trip || h.indexOf('&od=') > 0) && (h.indexOf('lang=pl') > 0) === pl;
  }));
  check('the way back: the trip or the planner', document.querySelector('#w-back').getAttribute('href') === (trip ? '../' + pageHash(trip.settings, LANG, /(&|#)koszty=1(&|$)/.test(hash)) : '../' + (pl ? '#lang=pl' : '')));
  check('no sideways scroll', document.documentElement.scrollWidth <= window.innerWidth, document.documentElement.scrollWidth + ' > ' + window.innerWidth);

  // On your route: 16 cards; with a trip in two groups, the ✓ lines only with a trip
  var cards = document.querySelectorAll('#p-route .w-card');
  check('16 cards On your route', cards.length === 16, cards.length);
  check(trip ? 'two groups, on the trip and to add' : 'one group, no ✓ and ✗', trip ? document.querySelectorAll('#p-route .w-group').length === 2 : document.querySelectorAll('#p-route .w-group').length === 0 && !/[✓✗]/.test(document.querySelector('#p-route .w-cards').textContent));
  if (trip) {
    var month = trip.st.months[0] + 1, ff = document.querySelector('#sp-swietliki'), cz = document.querySelector('#sp-czaple');
    var onCP = !!trip.stays.cucphuong;
    if (onCP && month === 5) check('fireflies in May: on the trip and in the day’s plan', /✓/.test(ff.textContent) && ff.textContent.indexOf(L({ en: 'In the day’s plan', pl: 'W planie dnia' })) > -1);
    if (onCP && month === 2) check('fireflies in February: out of the term', ff.querySelector('.w-no') && /✗/.test(ff.querySelector('.w-no').textContent));
    if (!trip.stays.mekong && [2, 3, 4, 5, 6, 7].indexOf(month) > -1) check('egrets out of the term instead of Dodaj (finding 10)', !!cz.querySelector('.w-no') && !cz.querySelector('.w-add'));
    // Dodaj (finding 27): a link back with dodaj=, and what would leave the trip before it
    var add = document.querySelector('#p-route .w-add');
    if (add) check('Dodaj: back to the trip with dodaj=, after what would leave it', /^\.\.\/#od=.*&dodaj=[a-z]+/.test(add.getAttribute('href')) && /dodaj=[a-z]+/.test(add.getAttribute('href')) &&
      !!add.previousElementSibling && add.previousElementSibling.className === 'w-drops');
  } else {
    var a0 = document.querySelector('#p-route .w-add');
    check('Dodaj without a trip: the planner with the place', !!a0 && /^\.\.\/#dodaj=[a-z]+(&lang=pl)?$/.test(a0.getAttribute('href')), a0 && a0.getAttribute('href'));
  }

  // the Gallery (findings 12 and 13): about 25 tiles in groups, the legends last, two without a photo
  var tiles = document.querySelectorAll('#p-gallery .w-tile');
  check('the gallery: 25 tiles, the legends last', tiles.length === 25 && document.querySelectorAll('#p-gallery .w-legend-tile').length === 5 &&
    tiles[tiles.length - 1].classList.contains('w-legend-tile'), tiles.length);
  check('two species without a photo say so', document.querySelectorAll('#p-gallery .w-nophoto').length === 2);
  // the viewer: a tile opens it with the name and the two sentences; Escape closes it and gives the focus back
  var b = document.querySelector('#p-gallery .w-tile-name');
  b.focus(); b.click();
  var d = document.querySelector('#w-viewer');
  check('a tile opens the viewer with its species', d.open && document.querySelector('#wv-name').textContent.indexOf(b.querySelector('b').textContent) === 0 && document.querySelector('#wv-why').textContent.length > 20);
  d.close();

  // the field guide (finding 14): the places from south to north, each on the trip or with Dodaj; what to avoid, beyond
  var places = document.querySelectorAll('#p-guide .w-place');
  check('the field guide: 10 places, what to avoid and beyond Route G', places.length === 10 && document.querySelectorAll('#p-guide .w-box').length === 2 && document.querySelectorAll('#p-guide .w-avoid li').length === 5);
  check('each place of the guide: on the trip, or Dodaj', Array.prototype.every.call(places, function (p) { return !!p.querySelector('.w-ok, .w-add, .w-muted'); }));

  // a place of the guide in the address: its section on the screen
  if (W.view().place) {
    var sec = document.querySelector('#guide-' + W.view().place);
    check('the place of the guide on the screen', Math.abs(sec.getBoundingClientRect().top) < 60, sec.getBoundingClientRect().top);
  }
  // EN · PL: the other language, the same tab and trip, lang=pl in the address or not
  var other = pl ? 'en' : 'pl', tab = W.view().tab;
  document.querySelector('#lang-switch [data-lang="' + other + '"]').click();
  check('EN · PL: the other language, the same tab and trip', document.documentElement.lang === other && W.view().tab === tab && !!W.trip() === !!trip &&
    (/(&|#)lang=pl(&|$)/.test(location.hash)) === (other === 'pl') && document.title === WUI[other]['w.doc.title']);
  // a click on another tab: its panel, its address
  var to = tab === 'gallery' ? 'guide' : 'gallery';
  location.hash = document.querySelector('#tab-' + to).getAttribute('href');
  setTimeout(function () {
    check('a tab link shows its tab', W.view().tab === to && vis('#p-' + to));
    if (to !== 'gallery') { done(); return; }
    // on the Gallery: Escape-like close gives the focus back to the tile that opened the viewer
    var t = document.querySelector('#p-gallery .w-tile-name');
    t.focus(); t.click(); d.close();
    setTimeout(function () { check('closing the viewer gives the focus back', document.activeElement === t); done(); }, 100);
  }, 300);
})();
```

W `tests/run.sh` zamień:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js site2/src/wildpage.js site2/src/wild.js site2/src/en/wild.js site2/src/wildphotos.js site2/src/en/wildphotos.js"
```

na:

```bash
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js site2/src/wildpage.js site2/src/wild.js site2/src/en/wild.js site2/src/wildphotos.js site2/src/en/wildphotos.js site2/src/wildui.js site2/src/en/wildui.js"
```

W `tests/shot.sh` zamień:

```bash
# Headless Chrome writes the PNG but never exits here, so we poll for the file and kill Chrome.
```

na:

```bash
# PAGE=wildlife shoots the wildlife subpage instead (stage 6, site2/out/pages/wildlife/index.html), e.g.
#   PAGE=wildlife tests/shot.sh 'gallery&lang=pl' 390 /tmp/g.png 4000
# Headless Chrome writes the PNG but never exits here, so we poll for the file and kill Chrome.
```

W `tests/shot.sh` zamień:

```bash
[ -s site2/out/pages/index.html ] || { echo "shot.sh: run python3 site2/build.py first" >&2; exit 1; }
head -c 15 site2/out/pages/index.html | grep -qi '^<!doctype html>' || { echo "shot.sh: site2/out/pages/index.html has no doctype, so Chrome would use quirks mode" >&2; exit 1; }
```

na:

```bash
P="site2/out/pages/${PAGE:+$PAGE/}index.html"
[ -s "$P" ] || { echo "shot.sh: run python3 site2/build.py first" >&2; exit 1; }
head -c 15 "$P" | grep -qi '^<!doctype html>' || { echo "shot.sh: $P has no doctype, so Chrome would use quirks mode" >&2; exit 1; }
```

W `tests/shot.sh` zamień:

```bash
URL="file://$PWD/site2/out/pages/index.html#${1//MIESIAC/$(date -v+5m +%Y-%m)}"
```

na:

```bash
URL="file://$PWD/$P#${1//MIESIAC/$(date -v+5m +%Y-%m)}"
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
bash "$TMPDIR/wietnam-6/jsc.sh" tests/content.test.js site2/src/wildpage.js site2/src/wild.js site2/src/en/wild.js site2/src/wildphotos.js site2/src/en/wildphotos.js 2>&1 | grep -m 1 'the check stopped'
```

Oczekiwane: `tests/run.sh: missing file site2/src/wildui.js` i `  wildlife interface: the check stopped: ReferenceError: Can't find variable: WUI`.

- [ ] **Krok 3: Kod**

W `site2/build.py` zamień:

```python
the fonts inside (out/offline), for a computer or Chrome on Android (an iPhone does not run its scripts)."""
```

na:

```python
the fonts inside (out/offline), for a computer or Chrome on Android (an iPhone does not run its scripts). Next to the page,
for GitHub Pages only, the wildlife subpage (stage 6): out/pages/wildlife/index.html, its photos in out/pages/img/wild/."""
```

W `site2/build.py` zamień:

```python
# Smaller copies for the hosted page (srcset): phones and thumbnails pick these instead of the full photo; 160 px for the
```

na:

```python
# The wildlife subpage's scripts (stage 6): those of the page that plan a trip and name its places, then its own helpers,
# data and texts (English after Polish); its logic, wildapp.js, comes after them, as app.js does. Not in the offline file
# and not in out/web (finding 4 of stage 6).
WILD_SCRIPTS = (["places.js", "seasons.js", "climate.js", "travel.js", "engine.js", "holidays.js", "content.js"]
                + [n for n in SCRIPTS if n.startswith(("content/", "en/content/"))]
                + ["ui.js", "en/ui.js", "page.js", "wildpage.js", "wild.js", "en/wild.js", "wildphotos.js", "en/wildphotos.js", "wildui.js", "en/wildui.js"])
WILD_PHOTO_DIR = os.path.join(PHOTO_DIR, "wild")
WILD_SMALLER = (480, 960)   # srcset of a wildlife photo: the gallery's tiles and a phone pick these
# Smaller copies for the hosted page (srcset): phones and thumbnails pick these instead of the full photo; 160 px for the
```

W `site2/build.py` zamień:

```python
    "title": "Route G · Vietnam, up to you",
```

na:

```python
    "url": SITE_URL, "image": SITE_URL + "img/og.jpg",
    "title": "Route G · Vietnam, up to you",
```

W `site2/build.py` zamień:

```python
OG_SIZE = (1200, 630)
```

na:

```python
# the wildlife subpage's own link preview, in English, with the red-shanked douc (finding 2 of stage 6)
WILD_PREVIEW = {
    "url": SITE_URL + "wildlife/", "image": SITE_URL + "img/og-wild.jpg",
    "title": "Wildlife of Vietnam · Route G",
    "description": "The animals you can really see on a route around Vietnam, where, when and how likely, a gallery of the most beautiful species and a field guide to the places.",
    "alt": "A red-shanked douc in the wild on the Sơn Trà peninsula in Đà Nẵng",
}
WILD_OG = "duk"
OG_SIZE = (1200, 630)
```

W `site2/build.py` zamień:

```python
    """Tab icon for every full document; the link preview tags and, while NOINDEX, the robots tag only for the public page."""
```

na:

```python
    """Tab icon for every full document; the link preview tags (preview: PREVIEW or WILD_PREVIEW) and, while NOINDEX, the
    robots tag only for the public pages."""
```

W `site2/build.py` zamień:

```python
        out += ('<meta name="description" content="%s">\n' % esc(PREVIEW["description"])
```

na:

```python
        out += ('<meta name="description" content="%s">\n' % esc(preview["description"])
```

W `site2/build.py` zamień:

```python
                + '<meta property="og:url" content="%s">\n' % SITE_URL
                + '<meta property="og:title" content="%s">\n' % esc(PREVIEW["title"])
                + '<meta property="og:description" content="%s">\n' % esc(PREVIEW["description"])
                + '<meta property="og:image" content="%simg/og.jpg">\n' % SITE_URL
```

na:

```python
                + '<meta property="og:url" content="%s">\n' % preview["url"]
                + '<meta property="og:title" content="%s">\n' % esc(preview["title"])
                + '<meta property="og:description" content="%s">\n' % esc(preview["description"])
                + '<meta property="og:image" content="%s">\n' % preview["image"]
```

W `site2/build.py` zamień:

```python
                + '<meta property="og:image:alt" content="%s">\n' % esc(PREVIEW["alt"])
```

na:

```python
                + '<meta property="og:image:alt" content="%s">\n' % esc(preview["alt"])
```

W `site2/build.py` zamień:

```python
def full_document(fragment, preview=False):
```

na:

```python
def full_document(fragment, preview=None):
```

W `site2/build.py` zamień:

```python
def photo_ids():
```

na:

```python
def og_image(im, path, low):
    """A link preview image: the photo cut to OG_SIZE, the cut taken at the height low (0 top, 1 bottom)."""
    ow, oh = OG_SIZE
    k = max(ow / im.width, oh / im.height)
    big = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    top = round((big.height - oh) * low)
    left = (big.width - ow) // 2
    big.crop((left, top, left + ow, top + oh)).save(path, "JPEG", quality=78, optimize=True, progressive=True)


def wild_photo_ids():
    """The photo ids of the wildlife subpage in wildphotos.js (one entry per line, '  id: { cap: …'); each needs its file in
    photos/wild/."""
    text = open(os.path.join(SRC, "wildphotos.js"), encoding="utf-8").read()
    ids = re.findall(r"^  ([a-z]+): \{ cap: ", text, re.M)
    assert len(ids) == len(set(ids)), "an id twice in wildphotos.js"
    missing = [p for p in ids if not os.path.exists(os.path.join(WILD_PHOTO_DIR, p + ".jpg"))]
    assert not missing, "no file in photos/wild/ for %s" % missing
    return ids


def wild_page(template, fonts):
    """The wildlife subpage for GitHub Pages: out/pages/wildlife/index.html, with the colours of the page with the route (its
    :root tokens and their dark versions, cut from template.html), the fonts and images one folder up, and its photos in
    out/pages/img/wild/ with smaller copies for the tiles."""
    ids = wild_photo_ids()
    os.makedirs(os.path.join(OUT_PAGES, "img", "wild"))
    pics = {}
    for pid in ids:
        im = Image.open(os.path.join(WILD_PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1400, 74)
        open(os.path.join(OUT_PAGES, "img", "wild", pid + ".jpg"), "wb").write(b)
        pics[pid] = dict(src="../img/wild/%s.jpg" % pid, w=w, h=h)
        srcset = []
        for sw in WILD_SMALLER:
            if sw < w:
                (vw, _), vb = encode(im, sw, 74)
                open(os.path.join(OUT_PAGES, "img", "wild", "%s-%d.jpg" % (pid, vw)), "wb").write(vb)
                srcset.append("../img/wild/%s-%d.jpg %dw" % (pid, vw, vw))
        if srcset:
            pics[pid]["srcset"] = ", ".join(srcset + ["../img/wild/%s.jpg %dw" % (pid, w)])
        if pid == WILD_OG:
            og_image(im, os.path.join(OUT_PAGES, "img", "og-wild.jpg"), 0.3)
    page_tpl = open(os.path.join(SRC, "template.html"), encoding="utf-8").read()
    tokens = page_tpl[page_tpl.index(":root {"):page_tpl.index("\n* { box-sizing")]
    js = "\n".join(open(os.path.join(SRC, name), encoding="utf-8").read() for name in WILD_SCRIPTS)
    script = (js + "\nvar WILD_PICS = " + json.dumps(pics, ensure_ascii=False) + ";\n"
              + open(os.path.join(SRC, "wildapp.js"), encoding="utf-8").read()).replace("</script", "<\\/script")
    page = (template.replace("/* __FONTS__ */", fonts.replace("url(fonts/", "url(../fonts/")).replace("/* __TOKENS__ */", tokens)
            .replace("__NOSCRIPT__", "".join('<p class="noscript" lang="%s">%s</p>' % x for x in NOSCRIPT["page"])).replace("__SCRIPT__", script))
    os.makedirs(os.path.join(OUT_PAGES, "wildlife"))
    open(os.path.join(OUT_PAGES, "wildlife", "index.html"), "w", encoding="utf-8").write(full_document(page, preview=WILD_PREVIEW))
    return len(ids)


def photo_ids():
```

W `site2/build.py` zamień:

```python
            ow, oh = OG_SIZE
            k = max(ow / im.width, oh / im.height)
            big = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
            top = round((big.height - oh) * 0.95)
            left = (big.width - ow) // 2
            big.crop((left, top, left + ow, top + oh)).save(os.path.join(OUT_WEB, "img", "og.jpg"), "JPEG", quality=78, optimize=True, progressive=True)
```

na:

```python
            og_image(im, os.path.join(OUT_WEB, "img", "og.jpg"), 0.95)
```

W `site2/build.py` zamień:

```python
    open(os.path.join(OUT_PAGES, "index.html"), "w", encoding="utf-8").write(full_document(web_page, preview=True))
```

na:

```python
    open(os.path.join(OUT_PAGES, "index.html"), "w", encoding="utf-8").write(full_document(web_page, preview=PREVIEW))
```

W `site2/build.py` zamień:

```python
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off, fonts_css(True), "offline")))
```

na:

```python
    n_wild = wild_page(open(os.path.join(SRC, "wild.html"), encoding="utf-8").read(), fonts_css(False))
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off, fonts_css(True), "offline")))
```

W `site2/build.py` zamień:

```python
    print("offline file %.1f MB" % size(os.path.join(OUT_OFF, OFFLINE_NAME)))
```

na:

```python
    print("wildlife subpage %.2f MB + %d photos" % (size(os.path.join(OUT_PAGES, "wildlife", "index.html")), n_wild))
    print("offline file %.1f MB" % size(os.path.join(OUT_OFF, OFFLINE_NAME)))
```

Utwórz `site2/src/en/wildui.js`:

```js
/* The interface texts of the wildlife subpage in English (stage 6): exactly the keys of WUI.pl (site2/src/wildui.js), in the
   same order; {name} marks a value the subpage fills in. British English, to one reader (you). */
WUI.en = {
  'w.doc.title': 'Wildlife of Vietnam · Route G',
  'w.eyebrow': 'Route G', 'w.h1': 'Wildlife of Vietnam',
  'w.lead': 'Who you can meet in Vietnam’s forests and jungles: the animals on your route, a gallery of the most beautiful species and a field guide to the places.',
  'w.tabs.aria': 'Tabs', 'w.tab.route': 'On your route', 'w.tab.gallery': 'Gallery', 'w.tab.guide': 'Field guide',
  'w.back.trip': '← Your route', 'w.back.plan': '← Plan a route',
  'w.route.h': 'Who you will meet on Route G',
  'w.route.lead': 'Animals you can really see at the planner’s places, in the wild or at a rescue centre: where, when and how likely.',
  'w.trip.h': 'Your route:', 'w.trip': '{term} · {days} days · {level}', 'w.trip.places': 'Places: {list}.',
  'w.notrip.h': 'No route:', 'w.notrip': 'the page shows every place without ✓ and ✗, and “Add” opens the planner with that place.',
  'w.legend': 'Chance: ●●● high · ●●○ medium · ●○○ low.',
  'w.kind.wild': 'in the wild', 'w.kind.rescue': 'at a rescue centre', 'w.kind.program': 'on a no-riding programme',
  'w.chance.3': 'high chance', 'w.chance.2': 'medium chance', 'w.chance.1': 'low chance', 'w.chance.0': 'almost no chance',
  'w.iucn': 'IUCN: {cat}', 'w.iucn.CR': 'critically endangered', 'w.iucn.EN': 'endangered', 'w.iucn.VU': 'vulnerable', 'w.iucn.NT': 'near threatened', 'w.iucn.LC': 'least concern',
  'w.when': 'When: {when}', 'w.day': 'day {n}', 'w.days': 'days {a}–{b}',
  'w.on': '✓ On your route: {x}, {days}.',
  'w.plan.yes': '✓ In the day’s plan.',
  'w.plan.level': 'In the day plan at another level or on a longer stay.',
  'w.plan.no': 'Not in the day plans.',
  'w.term.no': '✗ Not in your dates, only {when}.',
  'w.add': 'Add {x} to the route', 'w.cannot': '{x} will not fit into this route.',
  'w.group.on': 'On your route', 'w.group.off': 'Add a place to see them',
  'w.gallery.h': 'Gallery',
  'w.gallery.lead': 'The most beautiful animals of Vietnam’s forests, including some that almost nobody has seen. Tap a photo to enlarge it.',
  'w.g.primates': 'Primates', 'w.g.mammals': 'Other mammals', 'w.g.birds': 'Birds', 'w.g.reptiles': 'Reptiles and amphibians', 'w.g.insects': 'Insects',
  'w.g.legends': 'Legends: almost nobody has seen them',
  'w.guide.h': 'Field guide to the places',
  'w.guide.lead': 'What lives at the places of Route G, from south to north: where and when to look, with a guide or without. Birds and smaller animals too.',
  'w.place.on': '✓ On your route', 'w.avoid.h': 'What to avoid', 'w.outside.h': 'Beyond Route G',
  'w.nophoto': 'There is not a single good photo of this species.', 'w.view.aria': 'Enlarge the photo: {x}', 'w.close': 'Close',
  'w.credits.h': 'Photos: authors and licences ({n})',
  'w.credits.note': 'Photos from Wikimedia Commons, under CC0, CC BY or CC BY-SA or in the public domain; each caption says where it was taken.'
};
```

Utwórz `site2/src/wild.html`:

```html
<title>Wildlife of Vietnam · Route G</title>
<style>
/* __FONTS__ */
/* The wildlife subpage (stage 6): the colours, the fonts and the base rules of the page with the route (build.py copies its
   :root tokens here), then its own: a heading with the switch EN · PL, three tabs, cards, tiles and the field guide. */
/* __TOKENS__ */
* { box-sizing: border-box; }
[hidden] { display: none !important; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
body { background: var(--paper); color: var(--ink); font-family: var(--body); font-size: 16px; line-height: 1.6; }
img { display: block; max-width: 100%; height: auto; }
a { color: var(--accent); text-underline-offset: 2px; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
h1, h2, h3 { margin: 0; font-family: var(--display); font-weight: 500; line-height: 1.1; text-wrap: balance; }
p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
.wrap { max-width: 1200px; margin: 0 auto; padding-inline: var(--gutter); }
.btn-small { display: inline-flex; align-items: center; min-height: 44px; padding: 8px 14px; border-radius: 6px; background: var(--accent); color: var(--surface); font: 500 14px var(--body); text-decoration: none; }
.btn-small:hover { filter: brightness(1.08); }

/* heading and tabs */
.w-head { background: var(--surface); border-bottom: 1px solid var(--line); }
.w-head .wrap { position: relative; padding-block: 18px 0; }
.w-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 44px; }
.w-top a { font-size: 15px; }
.lang-switch { display: flex; align-items: center; font: 500 13px var(--mono); letter-spacing: 0.08em; color: var(--muted); }
.lang-switch button { min-width: 44px; min-height: 44px; padding: 0 8px; border: 0; background: none; color: inherit; font: inherit; letter-spacing: inherit; cursor: pointer; }
.lang-switch button[aria-pressed="true"] { color: var(--ink); text-decoration: underline 2px; text-underline-offset: 5px; }
.w-eyebrow { margin-top: 8px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.w-head h1 { font-size: clamp(34px, 6vw, 56px); margin-top: 4px; }
.w-lead { max-width: 62ch; margin-top: 10px; color: var(--muted); }
.w-tabs { display: flex; gap: 4px; margin-top: 18px; overflow-x: auto; }
.w-tabs a { display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-bottom: 3px solid transparent; color: var(--muted); font-weight: 500; text-decoration: none; white-space: nowrap; }
.w-tabs a[aria-current="page"] { color: var(--ink); border-bottom-color: var(--accent); }

main { padding-block: 28px 48px; }
.w-intro h2 { font-size: clamp(26px, 4vw, 36px); }
.w-intro p { max-width: 70ch; margin-top: 8px; color: var(--muted); }
.w-tripbox { margin-top: 18px; padding: 12px 16px; border-radius: 8px; background: var(--accent-soft); }
.w-legend { margin-top: 14px; font-size: 14px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.w-group { margin-top: 34px; font-size: 24px; }
.w-group small { font: 500 14px var(--mono); color: var(--muted); }
.w-muted { color: var(--muted); }
.w-ok { color: var(--accent); font-weight: 500; }
.w-no { color: var(--wet); font-weight: 500; }
.w-kind { display: inline-block; padding: 1px 8px; border-radius: 999px; font-size: 12.5px; background: var(--accent-soft); color: var(--ink); }
.w-kind-rescue { background: var(--warm-soft); }
.w-kind-program { background: var(--cool-soft); }
.w-dots { font-family: var(--mono); letter-spacing: 1px; color: var(--accent); }
.w-iucn { display: inline-block; align-self: flex-start; margin-top: 6px; padding: 1px 8px; border-radius: 4px; font: 500 12px var(--mono); background: var(--line); }
.w-iucn-cr { background: var(--wet-soft); color: var(--wet); }
.w-iucn-en { background: var(--warm-soft); color: var(--warm); }

/* On your route: cards */
.w-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 18px; margin-top: 16px; }
.w-card { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.w-photo { display: block; width: 100%; padding: 0; border: 0; background: var(--photo-bg); cursor: zoom-in; }
.w-card-photo img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; }
.w-nophoto { display: flex; align-items: center; justify-content: center; aspect-ratio: 3 / 2; padding: 16px; background: var(--land-o); color: var(--muted); text-align: center; font-size: 14px; }
.w-card-body { padding: 14px 16px 18px; display: flex; flex-direction: column; gap: 6px; }
.w-card h3 { font-size: 24px; }
.w-alt, .w-sci { font-size: 14px; color: var(--muted); }
.w-why { margin-top: 4px; }
.w-meets { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.w-meet { padding-top: 10px; border-top: 1px solid var(--line); font-size: 15px; }
.w-meet-top { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
.w-chance { font-size: 14px; }
.w-addbox { margin-top: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; font-size: 15px; }

/* Gallery: tiles */
.w-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(46%, 220px), 1fr)); gap: 14px; margin-top: 14px; }
.w-tile { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.w-tile-photo img, .w-tile .w-nophoto { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.w-tile-name { display: flex; flex-direction: column; width: 100%; padding: 10px 12px 12px; border: 0; background: none; color: var(--ink); font: inherit; text-align: left; cursor: pointer; }
.w-tile-name i { font-size: 13px; color: var(--muted); }
.w-legend-tile { border-style: dashed; }

/* Field guide */
.w-place:focus, .w-card:focus { outline: none; }
.w-place { margin-top: 26px; padding: 16px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; scroll-margin-top: 16px; }
.w-place-h { display: flex; flex-direction: column; gap: 4px; }
.w-place h3 { font-size: 26px; }
.w-rows { margin-top: 12px; display: flex; flex-direction: column; }
.w-row { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 2fr) auto; gap: 4px 16px; padding: 10px 0; border-top: 1px solid var(--line); font-size: 15px; }
.w-row.w-note { grid-template-columns: 1fr; color: var(--muted); }
@media (max-width: 640px) { .w-row { grid-template-columns: 1fr; } }
.w-box { margin-top: 26px; padding: 16px; border-radius: 10px; background: var(--surface); border: 1px solid var(--line); }
.w-avoid { background: var(--wet-soft); border-color: transparent; }
.w-box h3 { font-size: 24px; }
.w-box ul { margin-top: 10px; padding-left: 20px; list-style: disc; display: flex; flex-direction: column; gap: 6px; }

/* the photo viewer */
.w-viewer { width: min(940px, 100vw - 24px); max-height: calc(100vh - 24px); padding: 0; border: 0; border-radius: 10px; background: var(--surface); color: var(--ink); }
.w-viewer::backdrop { background: rgba(var(--scrim), 0.82); }
.w-viewer img { width: 100%; max-height: 70vh; object-fit: contain; background: var(--photo-bg); }
.wv-text { padding: 14px 18px 18px; display: flex; flex-direction: column; gap: 6px; }
.wv-text h2 { font-size: 26px; padding-right: 50px; }
.wv-sci, .wv-cap { font-size: 14px; color: var(--muted); }
.wv-close { position: absolute; top: 8px; right: 8px; min-width: 44px; min-height: 44px; border: 0; border-radius: 22px; background: var(--ctl-bg); color: var(--ctl-ink); font-size: 22px; cursor: pointer; }

footer { border-top: 1px solid var(--line); background: var(--surface); padding-block: 22px 32px; font-size: 14px; color: var(--muted); }
footer summary { cursor: pointer; min-height: 44px; display: flex; align-items: center; color: var(--ink); }
footer ul { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
footer p { margin-top: 8px; }
.noscript { padding: 16px var(--gutter); }
@media print { .w-tabs, .lang-switch, .w-add, .w-viewer { display: none !important; } [hidden] { display: block !important; } }
</style>
<noscript>__NOSCRIPT__</noscript>
<header class="w-head">
  <div class="wrap">
    <div class="w-top"><a id="w-back" href="../"></a>
      <div class="lang-switch" id="lang-switch" role="group" data-i18n-aria="lang.aria"><button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button><span aria-hidden="true">·</span><button type="button" data-lang="pl" lang="pl" aria-pressed="false">PL</button></div>
    </div>
    <p class="w-eyebrow" data-i18n="w.eyebrow"></p>
    <h1 data-i18n="w.h1"></h1>
    <p class="w-lead" data-i18n="w.lead"></p>
    <nav class="w-tabs" data-i18n-aria="w.tabs.aria"><a id="tab-route" href="#route" data-i18n="w.tab.route"></a><a id="tab-gallery" href="#gallery" data-i18n="w.tab.gallery"></a><a id="tab-guide" href="#guide" data-i18n="w.tab.guide"></a></nav>
  </div>
</header>
<main class="wrap">
  <section id="p-route" hidden></section>
  <section id="p-gallery" hidden></section>
  <section id="p-guide" hidden></section>
</main>
<footer>
  <div class="wrap">
    <details><summary id="w-credits-h"></summary><ul id="w-credits"></ul></details>
    <p data-i18n="w.credits.note"></p>
    <p data-i18n="ft.copy"></p>
  </div>
</footer>
<dialog class="w-viewer" id="w-viewer">
  <div id="wv-photo"></div>
  <div class="wv-text"><h2 id="wv-name"></h2><p class="wv-sci" id="wv-sci"></p><p id="wv-why"></p><p class="wv-cap" id="wv-cap"></p></div>
  <button type="button" class="wv-close" id="wv-close" data-i18n-aria="w.close">×</button>
</dialog>
<script>
__SCRIPT__
</script>
```

Utwórz `site2/src/wildapp.js`:

```js
/* The wildlife subpage (stage 6, …/wildlife/): three tabs, On your route, Gallery and Field guide, each with its own address
   (wildView in wildpage.js). With the settings of a trip in the address it plans the same trip as the page with the route
   (engine.js) and says for each encounter whether its place is on the trip, in the day's plan and in the term; Dodaj goes
   back to that page with the place added (dodaj=), saying first what would leave the trip (whyOff in page.js).
   Texts: wild.js and wildui.js, in English en/wild.js and en/wildui.js; the page's language as on the page with the route. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- texts ---------- */
  var lang = 'en', costs = false;
  var VIEW = CONTENT, SP = WILD, GD = WILD_GUIDE, AVOID = WILD_AVOID, OUTSIDE = WILD_OUTSIDE;
  // a text of the subpage (WUI) or, for the words both pages share (months, levels), of the page with the route (UI)
  function T(k, vars) {
    var own = WUI[lang], t = own.hasOwnProperty(k) ? own[k] : UI[lang][k];
    if (t == null) throw new Error('no text ' + k);
    return vars ? t.replace(/\{(\w+)\}/g, function (m, n) { return vars[n]; }) : t;
  }
  // the multi-word names a line may not break inside, as on the page with the route (app.js), and the no-break spaces of
  // the language's typography (page.js)
  var TIED_NAMES = Object.keys(CONTENT).map(function (id) { return CONTENT[id].short; })
    .concat(Object.keys(CONTENT_EN).map(function (id) { return CONTENT_EN[id].short; }), Object.keys(AIRPORTS).map(function (code) { return AIRPORTS[code].name; }), KEEP_TOGETHER)
    .filter(function (n, i, all) { return n.indexOf(' ') > -1 && all.indexOf(n) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  function tied(text) { return tieNames(tieVietnamese(lang === 'pl' ? tieShort(text) : tieEnglish(text)), TIED_NAMES); }
  function short(id) { return VIEW[id].short; }
  function caption(id) { return lang === 'en' ? WILD_CAPS_EN[id] : WILD_PHOTOS[id].cap; }
  function names(ids) { return ids.map(short).join(', '); }
  function capFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function dayRange(a, b) { return a === b ? T('w.day', { n: a }) : T('w.days', { a: a, b: b }); }

  /* ---------- the trip from the address ---------- */
  var DATA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
  var TODAY = clampToday(new Date().toISOString().slice(0, 10), HOLIDAYS_FROM, PLAN_LAST_YEAR);
  // trip: { settings, st, route, stays, months, off } or null (no trip in the address, or one that gives no trip)
  var trip = null, view = { tab: 'gallery', place: null };
  function readTrip() {
    trip = null;
    if (!hasTrip(location.hash)) return;
    var defaults = defaultSettings(TODAY, DATA, { list: HOLIDAYS, from: HOLIDAYS_FROM, until: HOLIDAYS_UNTIL, tetMargin: TET_MARGIN_DAYS });
    var got = settingsFromLink(parseLink(location.hash), defaults, PLACES, HUBS, [], SWAPS), r = planRoute(got.st, DATA);
    if (!r.ok) return;
    var off = {};
    whyOff(r, got.settings, got.st, DATA, CLIMATE).forEach(function (x) { off[x.id] = x; });
    trip = { settings: got.settings, st: got.st, route: r, stays: tripStays(r, got.st, CONTENT, FERRY), months: termMonths(got.st), off: off };
  }
  // the trip in one line, as in the summary of the page with the route: the term, the days and the level
  function tripLine() {
    var st = trip.st, term = st.start ? fmtSpan(st.start, tripDate(st.start, st.days), lang === 'en' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (m) { return T('mon3.' + m); }) : null)
      : T('term.month', { month: T('mon.' + st.month), year: st.year });
    return T('w.trip', { term: term, days: st.days, level: T('lvl.' + st.level) });
  }
  function onTrip(id) { return trip && SP[id].meet.some(function (m) { return trip.stays[m.place]; }); }

  /* ---------- pieces ---------- */
  var DOTS = { 3: '●●●', 2: '●●○', 1: '●○○', 0: '○○○' };
  function img(id, sizes) {
    var p = WILD_PICS[id];
    return '<img src="' + esc(p.src) + '"' + (p.srcset ? ' srcset="' + esc(p.srcset) + '" sizes="' + sizes + '"' : '') + ' width="' + p.w + '" height="' + p.h +
      '" alt="' + esc(caption(id)) + '" loading="lazy" decoding="async">';
  }
  function photoBox(id, cls) {
    if (SP[id].nophoto) return '<div class="w-nophoto ' + cls + '"><span>' + esc(T('w.nophoto')) + '</span></div>';
    return '<button type="button" class="w-photo ' + cls + '" data-view="' + id + '" aria-label="' + esc(T('w.view.aria', { x: SP[id].name })) + '">' +
      img(id, cls === 'w-tile-photo' ? '(max-width: 640px) 50vw, 240px' : '(max-width: 640px) 100vw, 380px') + '</button>';
  }
  function kind(k) { return '<span class="w-kind w-kind-' + k + '">' + esc(T('w.kind.' + k)) + '</span>'; }
  function chance(c, note) { return '<span class="w-dots" aria-hidden="true">' + DOTS[c] + '</span> <span>' + esc(note || T('w.chance.' + c)) + '</span>'; }
  function iucn(x) { return x.iucn ? '<span class="w-iucn w-iucn-' + x.iucn.toLowerCase() + '">' + esc(T('w.iucn', { cat: T('w.iucn.' + x.iucn) })) + '</span>' : ''; }
  function namesLine(x) { return '<p class="w-sci">' + esc(x.vn) + ' · <i>' + esc(x.lat) + '</i></p>'; }

  /* Dodaj for a place off the trip (findings 10 and 27): a link back to the page with the route and the place added, and
     before it what would leave the trip, from the same whyOff as the list „Nie ma na twojej trasie”; with the term wrong for
     the animal, when it can be seen instead of the link; a place that cannot be added says so. Without a trip, Dodaj opens
     the page with its own defaults and the place. */
  function addBlock(p, meet) {
    if (!trip) return '<a class="btn-small w-add" href="' + esc(tripLink(null, lang, costs, p)) + '">' + esc(T('w.add', { x: short(p) })) + '</a>';
    if (meet && !meetInTerm(meet, trip.months)) return '<p class="w-no">' + esc(T('w.term.no', { when: meet.season })) + '</p>';
    var x = trip.off[p];
    if (!x || !x.canAdd) return '<p class="w-muted">' + esc(T('w.cannot', { x: short(p) })) + '</p>';
    var what = x.drops.length ? T('off.drops', { list: names(x.drops) }) : x.shorter.length ? T('off.shorter', { list: names(x.shorter) }) : T('off.nodrops');
    return '<p class="w-drops">' + esc(tied(what)) + '</p><a class="btn-small w-add" href="' + esc(tripLink(trip.settings, lang, costs, p)) + '">' + esc(T('w.add', { x: short(p) })) + '</a>';
  }
  // one encounter of a card: where and how, the chance, when; with a trip, what the trip means for it (finding 9)
  function meetBlock(m) {
    var h = '<li class="w-meet"><p class="w-meet-top">' + kind(m.kind) + ' <b>' + esc(short(m.place)) + '</b> <span class="w-chance">' + chance(m.chance, m.chanceNote) + '</span></p>' +
      '<p>' + esc(tied(capFirst(m.where))) + '</p><p class="w-muted">' + esc(T('w.when', { when: tied(m.when) })) + '</p>';
    if (trip) {
      var o = meetOnTrip(m, trip.stays, trip.st.months);
      if (o) {
        h += '<p class="w-ok">' + esc(T('w.on', { x: short(m.place), days: dayRange(o.first, o.last) })) + '</p>';
        if (o.month === false) h += '<p class="w-no">' + esc(T('w.term.no', { when: m.season })) + '</p>';
        else if (o.plan) h += '<p class="w-ok">' + esc(T('w.plan.yes')) + '</p>';
        else h += '<p class="w-muted">' + esc(m.plan ? T('w.plan.level') : T('w.plan.no')) + '</p>';
      }
    }
    return h + '</li>';
  }
  function card(id) {
    var x = SP[id], places = [];
    x.meet.forEach(function (m) { if (places.indexOf(m.place) < 0) places.push(m.place); });
    var adds = trip ? places.filter(function (p) { return !trip.stays[p]; }) : places;
    var h = '<article class="w-card" id="sp-' + id + '" tabindex="-1">' + photoBox(id, 'w-card-photo') + '<div class="w-card-body"><h3>' + esc(x.name) + '</h3>' +
      (x.alt ? '<p class="w-alt">' + esc(x.alt) + '</p>' : '') + namesLine(x) + iucn(x) + '<p class="w-why">' + esc(tied(x.why)) + '</p>' +
      '<ul class="w-meets">' + x.meet.map(meetBlock).join('') + '</ul>';
    // Dodaj only when the species is not on the trip yet: one per place, at the encounter of that place
    if (!onTrip(id)) h += adds.map(function (p) { return '<div class="w-addbox">' + addBlock(p, x.meet.filter(function (m) { return m.place === p; })[0]) + '</div>'; }).join('');
    return h + '</div></article>';
  }

  /* ---------- the tabs ---------- */
  function renderRoute() {
    var o = routeOrder(SP, trip ? onTrip : null), h = '<div class="w-intro"><h2>' + esc(T('w.route.h')) + '</h2><p>' + esc(T('w.route.lead')) + '</p></div>';
    h += trip ? '<div class="w-tripbox"><p><b>' + esc(T('w.trip.h')) + '</b> ' + esc(tripLine()) + '</p><p class="w-muted">' + esc(T('w.trip.places', { list: names(trip.route.stops.filter(function (s) { return !PLACES[s.id].node; }).map(function (s) { return s.id; }).filter(function (id, i, a) { return a.indexOf(id) === i; })) })) + '</p></div>'
      : '<div class="w-tripbox"><p><b>' + esc(T('w.notrip.h')) + '</b> ' + esc(T('w.notrip')) + '</p></div>';
    h += '<p class="w-legend">' + esc(T('w.legend')) + ' ' + kind('wild') + ' ' + kind('rescue') + ' ' + kind('program') + '</p>';
    if (trip) {
      h += '<h2 class="w-group">' + esc(T('w.group.on')) + ' <small>' + o.on.length + '</small></h2><div class="w-cards">' + o.on.map(card).join('') + '</div>';
      h += '<h2 class="w-group">' + esc(T('w.group.off')) + ' <small>' + o.off.length + '</small></h2><div class="w-cards">' + o.off.map(card).join('') + '</div>';
    } else h += '<div class="w-cards">' + o.off.map(card).join('') + '</div>';
    $('#p-route').innerHTML = h;
  }
  function renderGallery() {
    var h = '<div class="w-intro"><h2>' + esc(T('w.gallery.h')) + '</h2><p>' + esc(T('w.gallery.lead')) + '</p></div>';
    WILD_GROUPS.forEach(function (g) {
      var ids = Object.keys(SP).filter(function (id) { return SP[id].gallery && SP[id].group === g; });
      if (!ids.length) return;
      h += '<h2 class="w-group">' + esc(T('w.g.' + g)) + ' <small>' + ids.length + '</small></h2><ul class="w-tiles">' + ids.map(function (id) {
        return '<li class="w-tile' + (g === 'legends' ? ' w-legend-tile' : '') + '">' + photoBox(id, 'w-tile-photo') +
          '<button type="button" class="w-tile-name" data-view="' + id + '"><b>' + esc(SP[id].name) + '</b><i>' + esc(SP[id].lat) + '</i></button></li>';
      }).join('') + '</ul>';
    });
    $('#p-gallery').innerHTML = h;
  }
  function guideRow(r) {
    if (r.row) {
      var x = r.row;
      if (x.kind === 'note') return '<li class="w-row w-note"><p><b>' + esc(x.name) + ':</b> ' + esc(tied(x.how)) + '</p></li>';
      return '<li class="w-row"><p class="w-row-name"><b>' + esc(x.name) + '</b> ' + kind(x.kind) + '</p><div><p>' + esc(tied(capFirst(x.how))) + '</p>' +
        (x.when ? '<p class="w-muted">' + esc(T('w.when', { when: tied(x.when) })) + '</p>' : '') + '</div><p class="w-chance">' + chance(x.chance) + '</p></li>';
    }
    var s = SP[r.id], m = s.meet[r.i];
    return '<li class="w-row"><p class="w-row-name"><a href="' + esc(wildHash({ tab: 'route', place: null }, trip && trip.settings, lang, costs)) + '" data-card="' + r.id + '"><b>' + esc(s.name) + '</b></a> ' + kind(m.kind) + '</p>' +
      '<div><p>' + esc(tied(capFirst(m.where))) + '</p><p class="w-muted">' + esc(T('w.when', { when: tied(m.when) })) + '</p></div><p class="w-chance">' + chance(m.chance, m.chanceNote) + '</p></li>';
  }
  function renderGuide() {
    var h = '<div class="w-intro"><h2>' + esc(T('w.guide.h')) + '</h2><p>' + esc(T('w.guide.lead')) + '</p></div>';
    Object.keys(GD).forEach(function (p) {
      var on = trip && trip.stays[p];
      h += '<section class="w-place" id="guide-' + p + '" tabindex="-1"><div class="w-place-h"><h3>' + esc(VIEW[p].name) + '</h3><p class="w-muted">' + esc(GD[p].where) + '</p>' +
        (on ? '<p class="w-ok">' + esc(T('w.place.on')) + '</p>' : '<div class="w-addbox">' + addBlock(p, null) + '</div>') + '</div>' +
        '<ul class="w-rows">' + guideRows(SP, GD, p).map(guideRow).join('') + '</ul></section>';
    });
    h += '<section class="w-box w-avoid"><h3>' + esc(T('w.avoid.h')) + '</h3><ul>' + AVOID.map(function (t) { return '<li>' + esc(tied(t)) + '</li>'; }).join('') + '</ul></section>';
    h += '<section class="w-box"><h3>' + esc(T('w.outside.h')) + '</h3><ul>' + OUTSIDE.map(function (o) { return '<li><b>' + esc(o.name) + '</b>: ' + esc(tied(o.text)) + '</li>'; }).join('') + '</ul></section>';
    $('#p-guide').innerHTML = h;
  }
  function renderCredits() {
    $('#w-credits-h').textContent = T('w.credits.h', { n: Object.keys(WILD_PHOTOS).length });
    $('#w-credits').innerHTML = Object.keys(WILD_PHOTOS).map(function (id) {
      var m = WILD_PHOTOS[id], lic = licenceUrl(m.license, lang);
      return '<li><a href="' + esc(m.page) + '" target="_blank" rel="noopener">' + esc(caption(id)) + '</a>: ' + esc(m.artist) + ', ' +
        (lic ? '<a href="' + esc(lic) + '" target="_blank" rel="noopener">' + esc(m.license === 'Public domain' ? UI[lang]['ft.pd'] : m.license) + '</a>' : esc(m.license)) + '</li>';
    }).join('');
  }

  /* ---------- the view ---------- */
  function showTab() {
    WILD_TABS.forEach(function (t) {
      var a = $('#tab-' + t);
      a.href = wildHash({ tab: t, place: null }, trip && trip.settings, lang, costs);
      if (t === view.tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      $('#p-' + t).hidden = t !== view.tab;
    });
    $('#w-back').href = tripLink(trip && trip.settings, lang, costs, null);
    $('#w-back').textContent = T(trip ? 'w.back.trip' : 'w.back.plan');
  }
  function render() {
    renderRoute(); renderGallery(); renderGuide(); showTab();
  }
  /* The address: the trip (only when it changed, as planning takes a moment), the language, the tab. An address of a place
     of the guide moves to its section. */
  function fromHash() {
    var parts = location.hash.replace(/^#/, '').split('&'), key = (parts[0].indexOf('=') < 0 ? parts.slice(1) : parts).join('&');
    if (key !== fromHash.key) { fromHash.key = key; costs = costsOf(location.hash); readTrip(); setLang(langOf(location.hash)); render(); }
    var was = view.tab;
    view = wildView(location.hash, GD);
    showTab();
    // another tab starts at its top, under the tabs, when the page had scrolled past them
    var head = $('.w-head').getBoundingClientRect().bottom + window.scrollY;
    if (was !== view.tab && !view.place && window.scrollY > head) window.scrollTo(0, head);
    if (view.place) { var s = $('#guide-' + view.place); if (s) { s.scrollIntoView(); s.focus({ preventScroll: true }); } }
  }
  function setLang(l) {
    lang = l;
    VIEW = localContent(CONTENT, lang === 'en' ? CONTENT_EN : null);
    SP = localContent(WILD, lang === 'en' ? WILD_EN : null);
    GD = localContent(WILD_GUIDE, lang === 'en' ? WILD_GUIDE_EN : null);
    AVOID = lang === 'en' ? WILD_AVOID_EN : WILD_AVOID;
    OUTSIDE = lang === 'en' ? WILD_OUTSIDE_EN : WILD_OUTSIDE;
    document.documentElement.lang = lang;
    document.title = T('w.doc.title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
    Array.prototype.forEach.call(document.querySelectorAll('#lang-switch [data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    renderCredits();
  }

  /* ---------- the photo viewer (finding 13): the photo, two sentences, the names and the photo's caption ---------- */
  var opener = null;
  function openViewer(id, from) {
    var x = SP[id], d = $('#w-viewer');
    opener = from;
    $('#wv-photo').innerHTML = x.nophoto ? '<div class="w-nophoto"><span>' + esc(T('w.nophoto')) + '</span></div>' : img(id, '(max-width: 900px) 100vw, 900px');
    $('#wv-name').textContent = x.name + (x.alt ? ' (' + x.alt + ')' : '');
    $('#wv-sci').innerHTML = esc(x.vn) + ' · <i>' + esc(x.lat) + '</i>' + (x.iucn ? ' · ' + esc(T('w.iucn', { cat: T('w.iucn.' + x.iucn) })) : '');
    $('#wv-why').textContent = tied(x.why);
    $('#wv-cap').innerHTML = x.nophoto ? '' : esc(caption(id)) + ' · ' + esc(WILD_PHOTOS[id].artist) + ' · <a href="' + esc(WILD_PHOTOS[id].page) + '" target="_blank" rel="noopener">' + esc(WILD_PHOTOS[id].license === 'Public domain' ? UI[lang]['ft.pd'] : WILD_PHOTOS[id].license) + '</a>';
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  }
  function closeViewer() {
    var d = $('#w-viewer');
    if (d.close) d.close(); else d.removeAttribute('open');
  }

  /* ---------- wiring ---------- */
  document.addEventListener('click', function (e) {
    var v = e.target.closest ? e.target.closest('[data-view]') : null;
    if (v) { openViewer(v.getAttribute('data-view'), v); return; }
    var c = e.target.closest ? e.target.closest('[data-card]') : null;
    if (c) {   // a species of the guide: its card in On your route
      e.preventDefault();
      try { history.pushState(null, '', c.getAttribute('href')); } catch (err) { location.hash = c.getAttribute('href'); }
      fromHash();
      var el = $('#sp-' + c.getAttribute('data-card'));
      if (el) { el.scrollIntoView(); el.focus({ preventScroll: true }); }
      return;
    }
    if (e.target.id === 'wv-close' || e.target.id === 'w-viewer') closeViewer();
  });
  $('#w-viewer').addEventListener('close', function () { if (opener) opener.focus(); opener = null; });
  $('#lang-switch').addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (!b || b.getAttribute('data-lang') === lang) return;
    var h = wildHash(view, trip && trip.settings, b.getAttribute('data-lang'), costs);
    try { history.replaceState(null, '', h); } catch (err) { location.replace(h); }
    fromHash();
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();
  /* for the probes in tests/probes/ */
  window.__wild = { trip: function () { return trip; }, view: function () { return view; }, today: TODAY };
})();
```

Utwórz `site2/src/wildui.js`:

```js
/* The interface texts of the wildlife subpage (stage 6): Polish; English is WUI.en in site2/src/en/wildui.js, with exactly
   these keys. {name} marks a value the subpage fills in. The words both pages share (months, levels, what Dodaj drops, the
   language switch) are those of UI (ui.js). */
var WUI = {};
WUI.pl = {
  'w.doc.title': 'Zwierzęta Wietnamu · Route G',
  'w.eyebrow': 'Route G', 'w.h1': 'Zwierzęta Wietnamu',
  'w.lead': 'Kogo da się spotkać w wietnamskich lasach i dżunglach: zwierzęta na trasie, galeria najpiękniejszych gatunków i przewodnik po miejscach.',
  'w.tabs.aria': 'Zakładki', 'w.tab.route': 'Na trasie', 'w.tab.gallery': 'Galeria', 'w.tab.guide': 'Przewodnik',
  'w.back.trip': '← Twoja trasa', 'w.back.plan': '← Zaplanuj trasę',
  'w.route.h': 'Kogo spotkasz na Route G',
  'w.route.lead': 'Zwierzęta, które naprawdę da się zobaczyć w miejscach planera, na wolności albo w ośrodku ratowania: gdzie, kiedy i z jaką szansą.',
  'w.trip.h': 'Twoja trasa:', 'w.trip': '{term} · {days} dni · {level}', 'w.trip.places': 'Miejsca: {list}.',
  'w.notrip.h': 'Bez trasy:', 'w.notrip': 'strona pokazuje wszystkie miejsca bez ✓ i ✗, a „Dodaj” otwiera planer z tym miejscem.',
  'w.legend': 'Szansa: ●●● duża · ●●○ średnia · ●○○ mała.',
  'w.kind.wild': 'na wolności', 'w.kind.rescue': 'w ośrodku ratowania', 'w.kind.program': 'w programie bez jazdy',
  'w.chance.3': 'szansa duża', 'w.chance.2': 'szansa średnia', 'w.chance.1': 'szansa mała', 'w.chance.0': 'szansa prawie żadna',
  'w.iucn': 'IUCN: {cat}', 'w.iucn.CR': 'krytycznie zagrożony', 'w.iucn.EN': 'zagrożony', 'w.iucn.VU': 'narażony', 'w.iucn.NT': 'bliski zagrożenia', 'w.iucn.LC': 'najmniejszej troski',
  'w.when': 'Kiedy: {when}', 'w.day': 'dzień {n}', 'w.days': 'dni {a}–{b}',
  'w.on': '✓ Na twojej trasie: {x}, {days}.',
  'w.plan.yes': '✓ W planie dnia.',
  'w.plan.level': 'W planie dnia przy innym poziomie albo przy dłuższym pobycie.',
  'w.plan.no': 'Poza planem dnia.',
  'w.term.no': '✗ Nie w twoim terminie, tylko {when}.',
  'w.add': 'Dodaj {x} do trasy', 'w.cannot': '{x} nie zmieści się w tej trasie.',
  'w.group.on': 'Na twojej trasie', 'w.group.off': 'Dodaj miejsce, żeby je zobaczyć',
  'w.gallery.h': 'Galeria',
  'w.gallery.lead': 'Najpiękniejsze zwierzęta wietnamskich lasów, także te, których prawie nikt nie widział. Stuknij zdjęcie, żeby je powiększyć.',
  'w.g.primates': 'Naczelne', 'w.g.mammals': 'Inne ssaki', 'w.g.birds': 'Ptaki', 'w.g.reptiles': 'Gady i płazy', 'w.g.insects': 'Owady',
  'w.g.legends': 'Legendy: prawie nikt ich nie widział',
  'w.guide.h': 'Przewodnik po miejscach',
  'w.guide.lead': 'Co żyje w miejscach Route G, z południa na północ: gdzie i kiedy szukać, z przewodnikiem czy bez. Także ptaki i drobniejsze zwierzęta.',
  'w.place.on': '✓ Na twojej trasie', 'w.avoid.h': 'Czego unikać', 'w.outside.h': 'Poza Route G',
  'w.nophoto': 'Nie ma ani jednego dobrego zdjęcia tego gatunku.', 'w.view.aria': 'Powiększ zdjęcie: {x}', 'w.close': 'Zamknij',
  'w.credits.h': 'Zdjęcia: autorzy i licencje ({n})',
  'w.credits.note': 'Zdjęcia z Wikimedia Commons, na licencjach CC0, CC BY albo CC BY-SA albo w domenie publicznej; podpis mówi, gdzie je zrobiono.'
};
```

- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py | grep wildlife
PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 390 'route&od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2' | tail -n 1
PAGE=wildlife bash tests/probe.sh tests/probes/wild.js 1400 'gallery&lang=pl' | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
```

Oczekiwane: `ALL PASS`, `wildlife subpage 0.44 MB + 27 photos` i dwa razy `done, all checks ok`; grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add site2/build.py site2/src/en/wildui.js site2/src/wild.html site2/src/wildapp.js site2/src/wildui.js tests/content.test.js tests/probe.sh tests/probes/wild.js tests/run.sh tests/shot.sh
git commit -q -F - <<'EOF'
Etap 6, zadanie 4 (podstrona zwierząt, strona): …/wildlife/ jako osobny plik GitHub Pages obok strony z trasą (build.py: wild.html z kolorami i krojami strony z trasą, zdjęcia w img/wild/ z mniejszymi kopiami, noindex i własny podgląd linku ze zdjęciem duka; nie w pliku offline), wildapp.js: trzy zakładki z własnymi adresami, karty z ✓ i ✗ dla trasy i terminu z linku, „Dodaj” z zapowiedzią, co wypadnie (whyOff), a przy złym terminie zamiast niego pora zwierzęcia, galeria z podglądem zdjęcia, dwoma zdaniami i nazwami, przewodnik z miejscami na trasie albo „Dodaj”, przełącznik EN · PL; teksty interfejsu wildui.js w obu językach; probe.sh z PAGE=wildlife i sonda wild.js (ustalenia 1–4, 9–15, 22, 27)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 7345ef1 HEAD -- site2 tests tools README.md` nic nie wypisuje.

---

### Zadanie 5: Wejścia na stronie z trasą

Ustalenia 5 i 6 sesji decyzji, ustalenia 14–17 sesji planowania. `site2/src/template.html`: trzeci przycisk `#wild-hero` w `.hero-cta`, na telefonie zamiast niego `#wild-top` w górnym rogu zdjęcia (`.hero-wild`), `#wild-nav` na końcu paska (schowany do 640 px), `.stop-wild` dla „Zwierzęta tutaj →”, wszystko schowane w druku. `site2/src/app.js`: `wildLink(tab)` (publiczny adres podstrony z zakładką i trasą w widoku strony) i `wildHere(id)` (link pod wskazówkami pobytu miejsca z `WILD_GUIDE_PLACES`); `render()` ustawia adresy trzech linków. Teksty `nav.wild` i `stop.wild` w `ui.js` i `en/ui.js`; `README.md` mówi o podstronie. Sonda `tests/probes/wildlink.js`.

**Pliki:**
- Zmień: `README.md`, `site2/src/app.js`, `site2/src/en/ui.js`, `site2/src/template.html`, `site2/src/ui.js`
- Testy: `tests/probes/wildlink.js`

- [ ] **Krok 1: Testy, które nie przechodzą**

Utwórz `tests/probes/wildlink.js`:

```js
/* The ways into the wildlife subpage on the page with the route (stage 6, finding 5): „Zwierzęta” under the title and, from
   641 px, in the bar at the top, both to its tab On your route with this trip; „Zwierzęta tutaj →” under the tips of every
   stay of a place in the field guide (WILD_GUIDE_PLACES), to its section; none in print (the printout's own probe, pdf.js,
   and the number of pages stay as before). In both languages:
     bash tests/probe.sh tests/probes/wildlink.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=przyroda&poziom=2&lang=pl' */
(function () {
  var s = window.__trip.state, h = pageHash(s.settings, LANG, COSTS).slice(1);
  var want = SITE_URL + 'wildlife/#route&' + h;
  check('„Zwierzęta” under the title: the subpage with this trip', document.querySelector('#wild-hero').href === want, document.querySelector('#wild-hero').href);
  check('… on a phone in the photo\u2019s top corner instead, the same address', document.querySelector('#wild-top').href === want &&
    document.querySelector('#wild-top').checkVisibility() === (window.innerWidth <= 640) && document.querySelector('#wild-hero').checkVisibility() === (window.innerWidth > 640));
  check('„Zwierzęta” in the bar: the same address', document.querySelector('#wild-nav').href === want);
  check('„Zwierzęta” in the bar only from 641 px', document.querySelector('#wild-nav').checkVisibility() === (window.innerWidth >= 641));
  check('„Zwierzęta” in the language of the page', document.querySelector('#wild-hero').textContent === UI[LANG]['nav.wild']);
  var seen = {}, stays = s.route.stops.filter(function (x) { if (seen[x.id]) return false; seen[x.id] = true; return WILD_GUIDE_PLACES.indexOf(x.id) > -1; });
  var links = document.querySelectorAll('#stops .stop-wild a');
  check('„Zwierzęta tutaj →” at every stay of a place of the field guide', links.length === stays.length, links.length + ' / ' + stays.length);
  check('… to the place’s section, with the trip', Array.prototype.every.call(links, function (a, i) { return a.href === SITE_URL + 'wildlife/#guide-' + stays[i].id + '&' + h; }));
  check('no sideways scroll', document.documentElement.scrollWidth <= window.innerWidth);
  done();
})();
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py > /dev/null
bash tests/probe.sh tests/probes/wildlink.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=przyroda&poziom=2' 2>&1 | tail -n 1
```

Oczekiwane: `ALL PASS` (testy w `jsc` nie widzą wejść) i `probe.sh: the probe stopped before done() (see …/vn-probe/log.txt)`: na starej stronie nie ma `#wild-hero`.

- [ ] **Krok 3: Kod**

W `README.md` zamień:

```markdown
You set your dates, the airports you fly into and out of, one or two interests and an adventure level, and the page plans a route: the places, a plan for each day, the journeys, a map, the season and, once you tick “Show estimated costs”, a budget. You can change the route, send it as a link or save it as a PDF.
```

na:

```markdown
You set your dates, the airports you fly into and out of, one or two interests and an adventure level, and the page plans a route: the places, a plan for each day, the journeys, a map, the season and, once you tick “Show estimated costs”, a budget. You can change the route, send it as a link or save it as a PDF.

The subpage Wildlife of Vietnam, https://grzegorzfrskiba-hub.github.io/wietnam/wildlife/, shows the animals you can really see at the planner’s places, in the wild or at a rescue centre, with where, when and how likely, and says for the route you came with whether they are on it, in the day’s plan and in your dates; a gallery of the most beautiful species, legends included; and a field guide to the places.
```

W `README.md` zamień:

```markdown
- The photos come from Wikimedia Commons, under CC0, CC BY and CC BY-SA or in the public domain. The author, the licence and a link to each photo’s page are in the page’s footer and in `site2/src/photos.js`; those licences still apply. The image in the link preview is the photo “A rowing boat below the cliffs of Tràng An” by Jakub Hałun, CC BY 4.0.
```

na:

```markdown
- The photos come from Wikimedia Commons, under CC0, CC BY and CC BY-SA or in the public domain. The author, the licence and a link to each photo’s page are in the page’s footer and in `site2/src/photos.js` (the wildlife subpage: its footer and `site2/src/wildphotos.js`); those licences still apply. The image in the link preview is the photo “A rowing boat below the cliffs of Tràng An” by Jakub Hałun, CC BY 4.0.
```

W `README.md` zamień:

```markdown
Route G („Wietnam po swojemu”) to planer trasy po Wietnamie, po angielsku i po polsku: polską wersję otwiera przełącznik EN · PL albo `&lang=pl` na końcu linku. Ustawiasz termin, lotniska, zainteresowania i poziom przygody, a strona układa trasę z planem dni, przejazdami, mapą i sezonem, a po zaznaczeniu „Pokaż szacowane koszty” także z budżetem. Notatki, research i plany w repo są po polsku. © 2026 Route G. Wszelkie prawa zastrzeżone; zdjęcia, kontury mapy i kroje mają własne licencje, opisane wyżej.
```

na:

```markdown
Route G („Wietnam po swojemu”) to planer trasy po Wietnamie, po angielsku i po polsku: polską wersję otwiera przełącznik EN · PL albo `&lang=pl` na końcu linku. Ustawiasz termin, lotniska, zainteresowania i poziom przygody, a strona układa trasę z planem dni, przejazdami, mapą i sezonem, a po zaznaczeniu „Pokaż szacowane koszty” także z budżetem. Podstrona „Zwierzęta Wietnamu” (`…/wildlife/`) pokazuje zwierzęta, które naprawdę da się zobaczyć na trasie, galerię najpiękniejszych gatunków i przewodnik po miejscach. Notatki, research i plany w repo są po polsku. © 2026 Route G. Wszelkie prawa zastrzeżone; zdjęcia, kontury mapy i kroje mają własne licencje, opisane wyżej.
```

W `site2/src/app.js` zamień:

```js
    tieShortWords(document.body);
```

na:

```js
    $('#wild-hero').href = $('#wild-top').href = $('#wild-nav').href = wildLink('route');
    tieShortWords(document.body);
```

W `site2/src/app.js` zamień:

```js
  // the printout names this route's address on the public page, in the page's view (as the copied plan does)
```

na:

```js
  /* The wildlife subpage (stage 6, finding 5) with this trip: its tab (route, or guide-<place> for a stay's „Zwierzęta
     tutaj →”), then the trip in the page's view (pageHash), so the subpage plans the same trip; always the public page's
     address, so the link works from the offline file too. */
  function wildLink(tab) { return SITE_URL + 'wildlife/#' + tab + '&' + pageHash(state.settings, lang, costs).slice(1); }
  function wildHere(id) {
    return WILD_GUIDE_PLACES.indexOf(id) > -1 ? '<p class="stop-wild"><a href="' + esc(wildLink('guide-' + id)) + '">' + T('stop.wild') + '</a></p>' : '';
  }
  // the printout names this route's address on the public page, in the page's view (as the copied plan does)
```

W `site2/src/app.js` zamień:

```js
        }).join('') + '</ol>' + (again ? '' : tips(c)) + '</section>';
```

na:

```js
        }).join('') + '</ol>' + (again ? '' : tips(c) + wildHere(s.id)) + '</section>';
```

W `site2/src/en/ui.js` zamień:

```js
  'hero.cta1': 'Set up your trip', 'hero.cta2': 'See the route',
```

na:

```js
  'hero.cta1': 'Set up your trip', 'hero.cta2': 'See the route', 'nav.wild': 'Wildlife', 'stop.wild': 'Wildlife here →',
```

W `site2/src/template.html` zamień:

```html
.hero-where { position: absolute; z-index: 1; right: var(--gutter); bottom: 12px; font: 12px var(--mono); color: var(--on-photo); opacity: 0.85; }
```

na:

```html
/* „Zwierzęta” (stage 6, finding 5): the third button under the title; on a phone it would push the form below the first
   screen, so there it stands in the photo's top corner, opposite the switch EN · PL */
.hero-wild { display: none; position: absolute; z-index: 2; top: 4px; left: calc(var(--gutter) - 4px); min-height: 44px; align-items: center; padding: 0 4px; color: var(--on-photo); font: 500 13px var(--mono); letter-spacing: 0.08em; text-shadow: 0 1px 10px rgba(var(--black), 0.45); text-underline-offset: 5px; }
@media (max-width: 640px) { .hero-wild { display: inline-flex; } .hero-cta .wild-link { display: none; } }
.hero-where { position: absolute; z-index: 1; right: var(--gutter); bottom: 12px; font: 12px var(--mono); color: var(--on-photo); opacity: 0.85; }
```

W `site2/src/template.html` zamień:

```html
.tip { font-size: 14px; line-height: 1.5; background: var(--accent-soft); padding: 10px 12px; border-radius: 6px; }
```

na:

```html
/* the way into the wildlife subpage's field guide for this place (stage 6, finding 5) */
.stop-wild a { display: inline-flex; align-items: center; min-height: 44px; font-weight: 500; }
.tip { font-size: 14px; line-height: 1.5; background: var(--accent-soft); padding: 10px 12px; border-radius: 6px; }
```

W `site2/src/template.html` zamień:

```html
  .secnav-links a[href="#settings"] { display: none; }
}
```

na:

```html
  .secnav-links a[href="#settings"] { display: none; }
  /* „Zwierzęta” does not fit beside them down to 320 px (stage 6, finding 5): on a phone the hero and the stays lead there */
  .secnav-links .wild-link { display: none; }
}
```

W `site2/src/template.html` zamień:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .lang-switch, .hero-cta, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .minimap, .shape-click, .fold-arrow, .days-all, .days-click, .b-gist, .b-off { display: none !important; }
```

na:

```html
  .secnav, .totop, .hero > img, .hero::after, .hero-where, .lang-switch, .hero-cta, .hero-wild, .stop-wild, .copy, #settings, .offroute, .dropped, .stop-remove, .gal-btn, .gal-full, .gal-count, .gal-thumbs, .map-hint, .days-map, .lightbox, .mapzoom, .minimap, .shape-click, .fold-arrow, .days-all, .days-click, .b-gist, .b-off { display: none !important; }
```

W `site2/src/template.html` zamień:

```html
  <div class="hero-text">
```

na:

```html
  <a class="hero-wild" id="wild-top" href="wildlife/" data-i18n="nav.wild"></a>
  <div class="hero-text">
```

W `site2/src/template.html` zamień:

```html
      <div class="hero-cta"><a class="primary" href="#settings" data-i18n="hero.cta1"></a><a class="ghost" href="#shape" data-i18n="hero.cta2"></a></div>
```

na:

```html
      <div class="hero-cta"><a class="primary" href="#settings" data-i18n="hero.cta1"></a><a class="ghost" href="#shape" data-i18n="hero.cta2"></a><a class="ghost wild-link" id="wild-hero" href="wildlife/" data-i18n="nav.wild"></a></div>
```

W `site2/src/template.html` zamień:

```html
    <a href="#before" data-i18n="nav.before"></a>
  </div>
```

na:

```html
    <a href="#before" data-i18n="nav.before"></a>
    <a class="wild-link" id="wild-nav" href="wildlife/" data-i18n="nav.wild"></a>
  </div>
```

W `site2/src/ui.js` zamień:

```js
  'hero.cta1': 'Ustaw swój wyjazd', 'hero.cta2': 'Zobacz trasę',
```

na:

```js
  'hero.cta1': 'Ustaw swój wyjazd', 'hero.cta2': 'Zobacz trasę', 'nav.wild': 'Zwierzęta', 'stop.wild': 'Zwierzęta tutaj →',
```

- [ ] **Krok 4: Uruchom i sprawdź, że testy przechodzą**

```bash
bash tests/run.sh 2>&1 | tail -n 1
python3 site2/build.py > /dev/null
for w in 320 641 1400; do bash tests/probe.sh tests/probes/wildlink.js $w 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=przyroda&poziom=2&lang=pl' | tail -n 1; done
bash tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' | tail -n 1
grep -rnIe $'\xc2\xa0' -e $'\xe2\x81\xa0' site2/src tests tools research | grep -v "var NB"
```

Oczekiwane: `ALL PASS` i cztery razy `done, all checks ok` (trzy szerokości `wildlink.js` i `settings.js`, czyli pole miesiąca dalej na pierwszym ekranie telefonu); grep nic nie wypisuje.

- [ ] **Krok 5: Commit**

```bash
git add README.md site2/src/app.js site2/src/en/ui.js site2/src/template.html site2/src/ui.js tests/probes/wildlink.js
git commit -q -F - <<'EOF'
Etap 6, zadanie 5 (wejścia na stronie z trasą): „Zwierzęta” pod tytułem jako trzeci przycisk (na telefonie w górnym rogu zdjęcia, naprzeciw EN · PL, żeby formularz został na pierwszym ekranie) i w pasku u góry od 641 px (na telefonie się nie mieści), wszystkie do „Na trasie” z tą trasą, i „Zwierzęta tutaj →” pod wskazówkami przy każdym miejscu z wpisem w przewodniku, do jego sekcji; w druku ukryte, trasy, liczby i PDF bez zmian; sonda wildlink.js; README mówi o podstronie (ustalenia 5 i 6)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git status --short
```

Oczekiwane: `git status --short` nic nie wypisuje. Porównaj z suchą próbą: `git diff 4bf162a HEAD -- site2 tests tools README.md` nic nie wypisuje.


### Zadanie 6: Punkt kontrolny etapu 6

Wszystko w porównaniu z zadaniem 1 i z suchą próbą. Wyniki do `$TMPDIR/wietnam-6/punkt.md`, z którego zadanie 9 bierze akapit do notatek.

- [ ] **Krok 1: Pełny test** (ok. 3 min)

```bash
bash tests/run.sh --full 2>&1 | grep -E "^combos:|^ALL PASS"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS` (ok. 2,5–3 min).

- [ ] **Krok 2: Sondy w obu językach, dla dwóch miesięcy** (ok. 40 min; w tle, bez przebudowy strony w tym czasie)

```bash
python3 site2/build.py > /dev/null
for m in MIESIAC 2027-07; do for l in "" pl; do bash "$TMPDIR/sondy-6.sh" $m $l 2>&1 | tail -n 3; done; done
```

Oczekiwane: cztery linie `sondy (…): 0 z N nie przeszło` (po angielsku 53, po polsku 51 sond na miesiąc).

- [ ] **Krok 3: Liczby tras i PDF jak przed planem**

```bash
bash tools/liczby.sh > "$TMPDIR/wietnam-6/liczby-po.md"
diff "$TMPDIR/wietnam-6/liczby-przed.md" "$TMPDIR/wietnam-6/liczby-po.md" && echo "liczby: bez zmian"
for l in en pl; do X=""; [ $l = pl ] && X="&lang=pl"
  for t in "od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2&koszty=1" "od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=gory,kultura&poziom=2&koszty=1" "od=HAN&do=SGN&miesiac=MIESIAC&dni=21&co=przyroda,gory&poziom=3&koszty=1"; do
    bash tests/print.sh "$t$X" "$TMPDIR/wietnam-6/po.pdf" | grep -E "pages of" | sed "s/^.*\.pdf: //" ; done; done > "$TMPDIR/wietnam-6/pdf-po.txt"
diff "$TMPDIR/wietnam-6/pdf-przed.txt" "$TMPDIR/wietnam-6/pdf-po.txt" && echo "PDF: bez zmian"
```

Oczekiwane: `liczby: bez zmian` i `PDF: bez zmian`.

- [ ] **Krok 4: Zdjęcia, licencje i linki**

```bash
for f in photos/wild/*.jpg; do printf '%s %s\n' "$(shasum -a 256 "$f" | cut -c1-64)" "$(basename "$f" .jpg)"; done > "$TMPDIR/wietnam-6/sumy.txt"
grep -o '^| `[a-z]*` |.*`[0-9a-f]\{64\}` |$' research/zwierzeta-zdjecia-2026-10.md | sed -E 's/^\| `([a-z]+)` \|.*`([0-9a-f]{64})` \|$/\2 \1/' | sort > "$TMPDIR/wietnam-6/sumy-research.txt"
sort "$TMPDIR/wietnam-6/sumy.txt" | diff - "$TMPDIR/wietnam-6/sumy-research.txt" && echo "zdjęcia: 27, sumy jak w researchu"
bash tools/licenses.sh | tail -n 3
ls site2/out/pages/img/wild/*.jpg | wc -l
```

Oczekiwane: `zdjęcia: 27, sumy jak w researchu`; z `licenses.sh` dwie linie `AUTHOR wild:kisciec …` i `AUTHOR wild:niedzwm …` (zob. pułapki) i `licenses.sh: 124 photos, 0 licence problem(s), 2 author(s) to check`; 80 plików w `img/wild/`.

- [ ] **Krok 5: Zrzuty do przeglądu z użytkownikiem** (ok. 8 min)

```bash
mkdir -p "$TMPDIR/wietnam-6/zrzuty"; T="od=SGN&do=HAN&miesiac=2027-05&dni=15&co=przyroda&poziom=2"
for l in en pl; do X=""; [ $l = pl ] && X="&lang=pl"; for w in 390 1400; do H=3400; [ $w = 1400 ] && H=2300
  for v in route gallery guide; do PAGE=wildlife bash tests/shot.sh "$v&$T$X" $w "$TMPDIR/wietnam-6/zrzuty/$v-$l-$w.png" $H > /dev/null; done
  bash tests/shot.sh "$T$X" $w "$TMPDIR/wietnam-6/zrzuty/trasa-$l-$w.png" 1000 > /dev/null; done; done
ls "$TMPDIR/wietnam-6/zrzuty" | wc -l
```

Oczekiwane: `16`. Złóż z nich dwa arkusze (390 i 1400 px; kolumny EN i PL, wiersze: strona z trasą, „Na trasie”, „Galeria”, „Przewodnik”), porównaj z arkuszami z sesji planu (te same treści, układ i zdjęcia; duże zdjęcie bywa szare w Chrome bez okna, wtedy powtórz ten zrzut) i wyślij użytkownikowi.

- [ ] **Krok 6: Ręcznie w przeglądarce** (lokalny serwer z `site2/out/pages`, wbudowana przeglądarka nie otwiera `file://`)

Sprawdź i zapisz wynik w `$TMPDIR/wietnam-6/punkt.md`:
- klawiatura: Tab po zakładkach, Enter otwiera zakładkę; Tab na zdjęciu karty i kafelku, Enter otwiera podgląd, Escape zamyka i fokus wraca;
- „Dodaj X do trasy” na karcie z trasą z linku: strona z trasą otwiera się z tym miejscem, a to, co wypadło, zgadza się z zapowiedzią na podstronie i z listą „Nie ma na twojej trasie” sprzed kliknięcia;
- „Zwierzęta tutaj →” przy Cát Tiên prowadzi do jego sekcji przewodnika (przy lokalnym serwerze link idzie na adres publiczny, więc porównaj tylko `#guide-cattien&…`);
- link z trasą, której nie da się ułożyć (`#route&od=SGN&do=HAN&miesiac=2027-05&dni=3&co=&poziom=2`): podstrona jak bez trasy, bez błędu w konsoli;
- jasny i ciemny motyw (ustawienia systemu): kontrast plakietek IUCN i kropek szansy;
- telefon (opcjonalnie, za zgodą użytkownika na żywej stronie po publikacji).

### Zadanie 7: Końcowy przegląd przed publikacją

- [ ] **Krok 1: Świeży recenzent na najmocniejszym modelu** (Agent z `model: fable`, w tle)

Zadanie dla recenzenta: przeczytaj cały diff od commitu planu do `HEAD`, ten plan, `notes/etapy.md` („## Etap 6”), `notes/wizja.md` („Podstrona zwierząt”), oba pliki researchu zwierząt i dowody z punktu kontrolnego (`$TMPDIR/wietnam-6/`); przeczytaj każdy tekst podstrony po polsku obok angielskiego (`wild.js`, `en/wild.js`, `wildphotos.js`, `en/wildphotos.js`, `wildui.js`, `en/wildui.js`) i każdy fakt porównaj z researchem; własnymi sondami sprawdź to, czego sondy planu nie badają; oceń „Gotowe do publikacji: Tak / Po poprawkach / Nie”, z uwagami krytycznymi, ważnymi i drobnymi. Wynik do `$TMPDIR/przeglad-6.txt`.

- [ ] **Krok 2: Uwagi z użytkownikiem**

Każdą uwagę krytyczną i ważną sprawdź sam (research, kod, sonda), potem pokaż użytkownikowi z rekomendacją; poprawki w osobnych commitach „Poprawka z końcowego przeglądu etapu 6: …”, każda z testami i sondami; drobne na listę następnej rundy albo do poprawki, według wyboru użytkownika.

### Zadanie 8: Publikacja (każdy krok za wyraźną zgodą użytkownika)

- [ ] **Krok 1: Strona do `docs/`** (za zgodą)

```bash
bash tools/publish.sh
git status --short docs | wc -l
test -s docs/wildlife/index.html && grep -c 'name="robots" content="noindex"' docs/index.html docs/wildlife/index.html
```

Oczekiwane: `publish.sh: docs/ ready (…)`, zmienione pliki w `docs/` (strona, podstrona, 80 zdjęć w `docs/img/wild/` i `og-wild.jpg`), `noindex` w obu stronach.

- [ ] **Krok 2: Commit `docs/`** (za zgodą)

```bash
git add docs
git commit -q -F - <<'EOF'
Strona na GitHub Pages z podstroną zwierząt …/wildlife/ (zakładki „Na trasie”, „Galeria” i „Przewodnik”, po angielsku i po polsku, 27 zdjęć z Wikimedia Commons) i wejściami ze strony z trasą; dalej z noindex

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Krok 3: `git push`** (za osobną zgodą), potem sprawdzenie żywej strony

```bash
git push origin main
for u in wildlife/ "wildlife/#gallery" img/og-wild.jpg img/wild/duk.jpg; do curl -s -o /dev/null -w "%{http_code} $u\n" "https://grzegorzfrskiba-hub.github.io/wietnam/$u"; done
curl -s https://grzegorzfrskiba-hub.github.io/wietnam/wildlife/ | grep -c 'content="noindex"'
```

Oczekiwane po zbudowaniu GitHub Pages (`gh api repos/grzegorzfrskiba-hub/wietnam/pages/builds/latest --jq .status` → `built`): cztery razy `200` i `1`.

### Zadanie 9: Notatki: status i następny krok

- [ ] **Krok 1: `notes/etapy.md` i `CLAUDE.md`**

Wpisz w `notes/etapy.md`: w tabeli wiersz etapu 6 („zrobione <data>: [notes/plans/2026-10-16-etap-6-zwierzeta.md](plans/2026-10-16-etap-6-zwierzeta.md); podstrona …/wildlife/ …”); w „## Etap 6” po „Stan (16.10.2026)” akapit „Zrobione <data>: …” (co jest na stronie), „Punkt kontrolny etapu 6 (<data>): …” (z `$TMPDIR/wietnam-6/punkt.md`), „Końcowy przegląd etapu 6 (<data>, świeży recenzent): …” (z `$TMPDIR/przeglad-6.txt` i decyzji użytkownika) i „Publikacja (<data>): …”; w „## Następny krok” zamiast punktu 2 („Równolegle plan etapu 6…”) następną rundę poprawek („Następna runda poprawek (po etapie 6)” z jej listą i uwagami z przeglądu) i opinie testerów. W `CLAUDE.md`: linia `**Status (…)**` z podstroną zwierząt, linia `**Etap 6 (zwierzęta):**` ze stanem „zrobiony”, a w „Jak sprawdzać” przy sondach `wild.js` (podstrona, z `PAGE=wildlife`) i `wildlink.js` (wejścia na stronie z trasą) oraz zdanie, że `PAGE=wildlife` działa też z `shot.sh`.

- [ ] **Krok 2: Commit notatek** (za zgodą), push za osobną zgodą

```bash
git add notes/etapy.md CLAUDE.md
git commit -q -F - <<'EOF'
Notatki: etap 6 zrobiony (podstrona zwierząt …/wildlife/ z zakładkami „Na trasie”, „Galeria” i „Przewodnik”, wejścia ze strony z trasą), punkt kontrolny, końcowy przegląd i publikacja; następny krok: następna runda poprawek i opinie testerów

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

Na koniec zapytaj użytkownika o `git push` i o usunięcie gałęzi `sucha-proba-6` (`git branch -D`, bo jej commity mają inne SHA niż `main`).

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` po każdym zadaniu; `--full` w punkcie kontrolnym.
- Sondy: `bash "$TMPDIR/sondy-6.sh" MIESIAC [pl]` (zadanie 1, krok 1), pojedynczo `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`, podstrona z `PAGE=wildlife`.
- Każde zadanie 2–5 porównaj z jego commitem na gałęzi `sucha-proba-6` (`git diff <commit suchej próby> HEAD -- site2 tests tools README.md` nic nie wypisuje).
- Grep twardych spacji z „Ograniczeń globalnych” po każdym zadaniu.
