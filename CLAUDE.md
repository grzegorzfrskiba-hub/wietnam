# „Wietnam po swojemu” — instrukcja dla Claude

**Status (13.10.2026):** etap 3 w toku: partia A, plan 1 (Phong Nha, Cúc Phương, Đà Nẵng z Sơn Trà) zrobiony. Następny krok: plan 2 partii A (Hà Giang, Sa Pa), zob. [notes/etapy.md](notes/etapy.md).

**Zacznij od** [notes/wizja.md](notes/wizja.md) (decyzje i zasady), potem przeczytaj [notes/etapy.md](notes/etapy.md) (plan etapów i następny krok). Tło: rozpoznanie w [notes/pomysl-planer-dla-znajomych.md](notes/pomysl-planer-dla-znajomych.md).

## Skąd to się wzięło

- **Pierwowzór: strona „Vietnam in December”,** trójjęzyczny planer wyjazdu organizatora z rodziną kolegi (11–25.12.2026).
  - Źródła: `~/Desktop/CLAUDE roboczy plik/vietnam-planner/`. Jej `CLAUDE.md` opisuje budowę, testy i publikację.
  - Publicznie: https://grzegorzfrskiba-hub.github.io/vietnam-december/
- **Ten projekt: ogólny planer po polsku.** Każdy ustawia termin, lotniska, 0–2 z pięciu zainteresowań i poziom przygody, a strona sama układa trasę. Pierwsi odbiorcy to przygodowi znajomi.
  - Kod został wzięty z pierwowzoru (`site2/`, `tests/`, `site2/build.py`) jako kopia w planach 1A i 1B.
  - Repo: https://github.com/grzegorzfrskiba-hub/wietnam, prywatne do publikacji w etapie 4.
  - Adres strony po publikacji: https://grzegorzfrskiba-hub.github.io/wietnam/
- **Strony grudniowej nie zmieniaj.** Jej linki krążą w WhatsAppie i grupa z niej korzysta.

## Zasady

Przeniesione z planera grudniowego i potwierdzone w sesji o wizji 9.10.2026.

- **Odpowiadaj po polsku.**
- **Jedna sesja naraz** w tym repo.
- **Bez zgody użytkownika nie rób:** `git push`, publikacji artifactu, wysyłania plików. Commituj, gdy użytkownik o to prosi.
- **Repo będzie publiczne od publikacji w etapie 4, bez wolnej licencji:** wszystkie prawa zastrzeżone, nie dodawaj pliku LICENSE. Wszystko, co trafi do commita, także `notes/`, będzie widać w internecie. Nie dopisuj danych osobowych ani konkretnych lotów.
- **Strona tylko po polsku.** Mechanizm kluczy tekstów i test kompletności zostają na przyszły angielski. Styl tekstów opisuje [notes/wizja.md](notes/wizja.md), sekcja „Treść, bezpieczeństwo, licencje”.
- **Zdjęcia tylko na licencjach dopuszczających użytek komercyjny i zmiany** (CC0, CC BY, CC BY-SA, domena publiczna; bez NC i ND), z autorem i licencją przy zdjęciu.
- **Fakty i ceny** zapisuj ze źródłem i datą w `research/`. Nowe miejsce etapu 3 ma własny plik `research/<id>-2026-10.md`, którego tabele „Zestawienie” czyta test danych. Notatki, plany i audyty zapisuj w `notes/`. Po skończonej pracy zaktualizuj status w [notes/etapy.md](notes/etapy.md).
- **Narzędzia na tym Macu:**
  - `gh` jest w `~/.local/bin/gh`, zalogowany;
  - node nie ma: testy pierwowzoru działają w JavaScriptCore (`tests/run.sh`);
  - `python3` jest;
  - `brew install` nie działa z tego konta, bo Homebrew należy do innego użytkownika.

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS`. Testy działają w JavaScriptCore, bo node nie ma. Test kombinacji sprawdza co 7. ustawienie; `bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 70 s).
- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.
- `python3 site2/build.py` → `site2/out/web` (fragment do artifactu), `site2/out/pages` (GitHub Pages), `site2/out/offline/Wietnam-po-swojemu.html`.
- Narzędzia Chrome bez okna działają na zbudowanej stronie z `site2/out/pages`:
  - `bash tests/shot.sh '<ustawienia z linku>' <szerokość> <plik.png> [wysokość]`: zrzut, domyślnie 2600 px wysokości;
  - `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`: sondy `link.js`, `anchors.js`, `changes.js`, `settings.js`, `map.js`, `before.js`; sonda kończy się kodem 1, gdy któraś kontrola nie przejdzie;
  - `bash tests/print.sh '<ustawienia>' <plik.pdf> [dark]`: wydruk do PDF; podaje liczbę stron, prawie puste strony i linie zakryte ramkami;
  - słowo `MIESIAC` w ustawieniach zamienia się na miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu (`site2/src/before.js`) przez curl, bez zapisywania stron; kod 1, gdy któryś adres nie odpowiada 2xx.
- `python3 -I geo/make_basemap.py <katalog z danymi Natural Earth>`: kontury mapy (`site2/src/basemap.js`) po zmianie kadrów w `site2/src/panels.js`. Dane (ok. 20 MB) leżą poza repo i pobiera się je za zgodą użytkownika (plan 2A, zadanie 11).
- Pułapki: wbudowana przeglądarka nie otwiera `file://`; w nowym worktree podlinkuj `photos/` z głównej kopii; pasek u góry, „Na górę” i podświetlanie na mapie działają na IntersectionObserver, którego Chrome bez okna nie uruchamia, więc sprawdza się je ręcznie przez lokalny serwer (plan 2A, zadanie 13); narzędzie do zapisu plików bywa, że zamienia napis \u00a0 na sam znak twardej spacji, więc po każdej zmianie kodu grep z „Jak sprawdzać” w planach.
