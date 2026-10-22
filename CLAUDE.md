# Route G („Wietnam po swojemu”) — instrukcja dla Claude

**Status (21.10.2026):** etap 6 zrobiony: podstrona zwierząt `…/wietnam/wildlife/` z zakładkami „Na trasie”, „Galeria” i „Przewodnik” (po angielsku i po polsku, 27 zdjęć z Wikimedia Commons) i wejściami ze strony z trasą; od 20.10.2026 z mapą kraju (obok zakładek od 1101 px, węziej pasmo u góry; miejsca zapalają się przy przewijaniu we wszystkich trzech zakładkach), dużymi zdjęciami w „Na trasie” i miniaturkami w przewodniku ([notes/plans/2026-10-19-mapa-zwierzat.md](notes/plans/2026-10-19-mapa-zwierzat.md), z poprawkami z końcowego przeglądu), na żywo pod https://grzegorzfrskiba-hub.github.io/wietnam/, dalej z `noindex`. Wcześniej pierwsza runda poprawek (ogóły zwinięte, koszty schowane z `&koszty=1` w linku, lista „Nie ma na twojej trasie” z miniaturami), poprawka faktów Cúc Phương i poprawki 1–2 następnej rundy (mapa kraju przy liście, mała mapa trasy przy dniach na telefonie). Od 20.10.2026 każdy wiersz i notatka przewodnika ma zdjęcie (14 nowych z Commons). Od 21.10.2026 na żywo z wykończeniami ([notes/plans/2026-10-20-wykonczenia.md](notes/plans/2026-10-20-wykonczenia.md), z poprawkami z końcowego przeglądu): trasa rysuje się sama, nowa trasa wchodzi płynnie, liczby się nabijają, duk na górze podstrony zwierząt, zdjęcia wyłaniają się z koloru, album w podglądzie zdjęć zwierząt, dzień w pasku u góry i zakończenie z Pù Luông. Od 22.10.2026 jest opis projektu etapu 7, atlasu miejsc ([notes/plans/2026-10-22-atlas-projekt.md](notes/plans/2026-10-22-atlas-projekt.md)). Następny krok: plan etapu 7 z suchą próbą w nowej sesji, potem runda nowych zdjęć i następna runda poprawek; linki dla anglojęzycznych testerów niezależnie, zob. [notes/etapy.md](notes/etapy.md).

**Zacznij od** [notes/wizja.md](notes/wizja.md) (decyzje i zasady), potem przeczytaj [notes/etapy.md](notes/etapy.md) (plan etapów i następny krok). Tło: rozpoznanie w [notes/pomysl-planer-dla-znajomych.md](notes/pomysl-planer-dla-znajomych.md).

**Etap 6 (zwierzęta):** zrobiony 17–19.10.2026 według planu [notes/plans/2026-10-16-etap-6-zwierzeta.md](notes/plans/2026-10-16-etap-6-zwierzeta.md): podstrona `…/wietnam/wildlife/` (osobny plik `site2/src/wild.html` z `wildapp.js`, dane w `wild.js` i `en/wild.js`), punkt kontrolny, końcowy przegląd (16 uwag poprawionych przed publikacją) i publikacja; zob. [notes/etapy.md](notes/etapy.md), „Etap 6”.

**Etap 7 (atlas miejsc):** sesja decyzji 22.10.2026, opis projektu [notes/plans/2026-10-22-atlas-projekt.md](notes/plans/2026-10-22-atlas-projekt.md): podstrona „Atlas Wietnamu” `…/wietnam/atlas/` z 20 miejscami puli, dużymi zdjęciami i mapą kraju jak na podstronie zwierząt, makieta w `notes/makieta-atlas/`; plan z suchą próbą w nowej sesji; zob. [notes/etapy.md](notes/etapy.md), „Etap 7”.

## Skąd to się wzięło

- **Pierwowzór: strona „Vietnam in December”,** trójjęzyczny planer grudniowego wyjazdu grupy (2026).
  - Źródła: `~/Desktop/CLAUDE roboczy plik/vietnam-planner/`. Jej `CLAUDE.md` opisuje budowę, testy i publikację.
  - Publicznie: https://grzegorzfrskiba-hub.github.io/vietnam-december/
- **Ten projekt: ogólny planer „Route G”, po angielsku i po polsku.** Każdy ustawia termin, lotniska, 0–2 z pięciu zainteresowań i poziom przygody, a strona sama układa trasę. Pierwsi odbiorcy to przygodowi znajomi.
  - Kod został wzięty z pierwowzoru (`site2/`, `tests/`, `site2/build.py`) jako kopia w planach 1A i 1B.
  - Repo: https://github.com/grzegorzfrskiba-hub/wietnam, publiczne od 14.10.2026, bez wolnej licencji.
  - Strona: https://grzegorzfrskiba-hub.github.io/wietnam/ (GitHub Pages z `docs/` na `main`; nową wersję przygotowuje `bash tools/publish.sh`, a wysyła commit `docs/` i `git push` za zgodą).
- **Strony grudniowej nie zmieniaj.** Jej linki krążą w WhatsAppie i grupa z niej korzysta.

## Zasady

Przeniesione z planera grudniowego i potwierdzone w sesji o wizji 9.10.2026.

- **Odpowiadaj po polsku.**
- **Jedna sesja naraz** w tym repo.
- **Bez zgody użytkownika nie rób:** `git push`, publikacji artifactu, wysyłania plików. Commituj, gdy użytkownik o to prosi.
- **Repo jest publiczne od 14.10.2026, bez wolnej licencji:** wszystkie prawa zastrzeżone, nie dodawaj pliku LICENSE. Wszystko, co trafi do commita, także `notes/`, widać w internecie. Nie dopisuj danych osobowych ani konkretnych lotów.
- **Język strony:** od etapu 5 angielski domyślny i polski drugi, z tymi samymi faktami, na jednym adresie z przełącznikiem EN · PL i `&lang=pl` w linku (decyzje z 15.10.2026 w [notes/etapy.md](notes/etapy.md), „Z sesji decyzji etapu 5”); każdy nowy tekst od razu w obu językach: polski w `site2/src/ui.js` i `content/`, angielski w `site2/src/en/`, a testy dwóch języków pilnują tych samych faktów. Styl tekstów opisuje [notes/wizja.md](notes/wizja.md), sekcja „Treść, bezpieczeństwo, licencje”.
- **Treść dla podróżnych z całego świata** (decyzja z 15.10.2026): bez porad zależnych od obywatelstwa i bez ogólnej wiedzy podróżniczej, ceny w dongach (od planu B2). Każde nowe zdanie przechodzi test z wizji, sekcja „Treść, bezpieczeństwo, licencje”. Pilnują tego testy treści `for every passport` (bez złotych, euro, dolarów, NBP i polskich urzędów) i `day texts` (opis dnia najwyżej 70 słów).
- **Zdjęcia tylko na licencjach dopuszczających użytek komercyjny i zmiany** (CC0, CC BY, CC BY-SA, domena publiczna; bez NC i ND), z autorem i licencją przy zdjęciu.
- **Fakty i ceny** zapisuj ze źródłem i datą w `research/`. Nowe miejsce etapu 3 ma własny plik `research/<id>-2026-10.md`, którego tabele „Zestawienie” czyta test danych. Notatki, plany i audyty zapisuj w `notes/`. Po skończonej pracy zaktualizuj status w [notes/etapy.md](notes/etapy.md).
- **Narzędzia na tym Macu:**
  - `gh` jest w `~/.local/bin/gh`, zalogowany;
  - node nie ma: testy pierwowzoru działają w JavaScriptCore (`tests/run.sh`);
  - `python3` jest;
  - `brew install` nie działa z tego konta, bo Homebrew należy do innego użytkownika.

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS`. Testy działają w JavaScriptCore, bo node nie ma. Test kombinacji sprawdza co 7. ustawienie; `bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 2,5 min).
- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.
- `bash tools/liczby.sh [katalog źródeł]`: liczby ze wszystkich 134 784 tras do punktu kontrolnego (udział miejsc, noce, długie dni z lotem, zygzaki); ze starą kopią źródeł z `git archive` daje liczby „przed”.
- `python3 site2/build.py` → `site2/out/web` (fragment do artifactu), `site2/out/pages` (GitHub Pages), `site2/out/offline/Route-G.html`.
- Narzędzia Chrome bez okna działają na zbudowanej stronie z `site2/out/pages`:
  - `bash tests/shot.sh '<ustawienia z linku>' <szerokość> <plik.png> [wysokość]`: zrzut, domyślnie 2600 px wysokości;
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`, `before.js`, `publish.js` (kroje, `noindex`, podgląd linku), `pdf.js` (przycisk PDF, mapa i link w wydruku), `lang.js` (przełącznik EN · PL i język w linku, na linku bez `lang=`), `fold.js` (zwinięte dni, przejazdy, „Przed wyjazdem”, autorzy zdjęć i formularz), `costs.js` (koszty schowane i `koszty=1`), `offroute.js` (wiersze listy „Nie ma na twojej trasie” i mapa kraju: od 1101 px obok listy, węziej pasmo nad listą), `minimap.js` (mała mapa trasy przy dniach na telefonie, do 900 px, i powiększenie jednego kadru), `wildlink.js` (wejścia do podstrony zwierząt na stronie z trasą), `polish.js` (wykończenia strony z trasą: zdjęcia, typografia, pasek w dniach, zakończenie, rysowanie trasy i ruch nowej trasy w stanie końcowym), a z `PAGE=wildlife` przed poleceniem `wild.js` (podstrona zwierząt: zakładki, ✓ i ✗, „Dodaj”, galeria i podgląd, przewodnik z miniaturkami, duże karty, druk) i `wildmap.js` (mapa podstrony: obok zakładek od 1101 px, pasmo węziej, zapalanie w trzech zakładkach, link do miejsca przewodnika, tknięcie kropki, koniec zakładki, wydruk); `H=768` przed poleceniem ustawia wysokość okna (bez tego 900 px); każda sonda działa w obu językach, a ustawienia z `&lang=pl` na końcu sprawdzają polską wersję; sonda kończy się kodem 1, gdy któraś kontrola nie przejdzie;
  - `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]`: wydruk do PDF na A4; podaje format, liczbę stron, prawie puste strony i linie zakryte ramkami, a przy zakrytych liniach kończy się kodem 1;
  - `PAGE=wildlife` przed `probe.sh`, `shot.sh` albo `print.sh` uruchamia podstronę zwierząt (`site2/out/pages/wildlife/index.html`) zamiast strony z trasą;
  - słowo `MIESIAC` w ustawieniach zamienia się na miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu (`site2/src/before.js`) przez curl, bez zapisywania stron; kod 1, gdy któryś adres nie odpowiada 2xx.
- `bash tools/licenses.sh`: licencje i autorzy zdjęć (`site2/src/photos.js`) porównane z API Wikimedia Commons, tylko odczyt; kod 1 przy innej licencji albo braku pliku.
- `bash tools/publish.sh`: testy, build i kopia `site2/out/pages` w `docs/`, z którego GitHub Pages podaje stronę; commit i `git push` to osobne kroki, push tylko za zgodą użytkownika.
- Kroje (IBM Plex Sans, IBM Plex Mono, Newsreader) leżą w `site2/fonts/` z licencjami OFL; Chrome bez okna czyta je z dysku tylko z flagą `--allow-file-access-from-files`, którą mają `shot.sh`, `print.sh` i `probe.sh`.
- `python3 -I geo/make_basemap.py <katalog z danymi Natural Earth>`: kontury mapy (`site2/src/basemap.js`) po zmianie kadrów w `site2/src/panels.js`. Dane (ok. 20 MB) leżą poza repo i pobiera się je za zgodą użytkownika (plan 2A, zadanie 11).
- Pułapki: wbudowana przeglądarka nie otwiera `file://`; w nowym worktree podlinkuj `photos/` z głównej kopii; sonda `before.js` wymaga `&koszty=1` w linku, `fold.js` i `before.js` trasy z Cao Bằng, a `changes.js` linku bez `dodaj`; pasek u góry, „Na górę” i podświetlanie na mapie działają na IntersectionObserver, którego Chrome bez okna nie uruchamia, więc sprawdza się je ręcznie przez lokalny serwer (plan 2A, zadanie 13); ruch strony (rysowanie trasy, fala, liczby, napis w pasku) idzie tylko z rąk odwiedzającego (`isTrusted`, dotyk, kółko, klawisz), więc ręcznie przewija się kółkiem albo palcem, a nie `scrollTo` z konsoli, a Chrome bez okna woła IntersectionObserver raz i nie odtwarza animacji (sondy widzą stan końcowy; „ogranicz ruch” sprawdza kopia `probe.sh` z `--force-prefers-reduced-motion` poza repo); narzędzie do zapisu plików bywa, że zamienia napis \u00a0 na sam znak twardej spacji, więc po każdej zmianie kodu grep z „Jak sprawdzać” w planach.
