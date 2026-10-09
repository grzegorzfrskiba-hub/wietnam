# „Wietnam po swojemu” — instrukcja dla Claude

**Status (9.10.2026):** wizja ustalona, kodu jeszcze nie ma. Następny krok: plan wdrożenia etapu 1, czyli fundamentu i silnika (zob. [notes/etapy.md](notes/etapy.md)).

**Zacznij od** [notes/wizja.md](notes/wizja.md) (decyzje i zasady), potem przeczytaj [notes/etapy.md](notes/etapy.md) (plan etapów i następny krok). Tło: rozpoznanie w [notes/pomysl-planer-dla-znajomych.md](notes/pomysl-planer-dla-znajomych.md).

## Skąd to się wzięło

- **Pierwowzór: strona „Vietnam in December”,** trójjęzyczny planer wyjazdu organizatora z rodziną kolegi (11–25.12.2026).
  - Źródła: `~/Desktop/CLAUDE roboczy plik/vietnam-planner/`. Jej `CLAUDE.md` opisuje budowę, testy i publikację.
  - Publicznie: https://grzegorzfrskiba-hub.github.io/vietnam-december/
- **Ten projekt: ogólny planer po polsku.** Każdy ustawia termin, lotniska, 0–2 z pięciu zainteresowań i poziom przygody, a strona sama układa trasę. Pierwsi odbiorcy to przygodowi znajomi.
  - Kod ma być wzięty z pierwowzoru (`site2/`, `tests/`, `site2/build.py`) jako kopia.
  - Adres docelowy: https://grzegorzfrskiba-hub.github.io/wietnam/ (repo `wietnam`).
- **Strony grudniowej nie zmieniaj.** Jej linki krążą w WhatsAppie i grupa z niej korzysta.

## Zasady

Przeniesione z planera grudniowego i potwierdzone w sesji o wizji 9.10.2026.

- **Odpowiadaj po polsku.**
- **Jedna sesja naraz** w tym repo.
- **Bez zgody użytkownika nie rób:** `git push`, publikacji artifactu, wysyłania plików. Commituj, gdy użytkownik o to prosi.
- **Repo będzie publiczne, bez wolnej licencji:** wszystkie prawa zastrzeżone, nie dodawaj pliku LICENSE. Wszystko, co trafi do commita, także `notes/`, będzie widać w internecie. Nie dopisuj danych osobowych ani konkretnych lotów.
- **Strona tylko po polsku.** Mechanizm kluczy tekstów i test kompletności zostają na przyszły angielski. Styl tekstów opisuje [notes/wizja.md](notes/wizja.md), sekcja „Treść, bezpieczeństwo, licencje”.
- **Zdjęcia tylko na licencjach dopuszczających użytek komercyjny i zmiany** (CC0, CC BY, CC BY-SA, domena publiczna; bez NC i ND), z autorem i licencją przy zdjęciu.
- **Fakty i ceny** zapisuj ze źródłem i datą w `research/`. Notatki, plany i audyty zapisuj w `notes/`. Po skończonej pracy zaktualizuj status w [notes/etapy.md](notes/etapy.md).
- **Narzędzia na tym Macu:**
  - `gh` jest w `~/.local/bin/gh`, zalogowany;
  - node nie ma: testy pierwowzoru działają w JavaScriptCore (`tests/run.sh`);
  - `python3` jest;
  - `brew install` nie działa z tego konta, bo Homebrew należy do innego użytkownika.
