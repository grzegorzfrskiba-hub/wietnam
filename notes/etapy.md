# Wietnam po swojemu: etapy

Plan prac na podstawie [wizja.md](wizja.md). To dokument żywy: po każdym etapie zaktualizuj status i następny krok. Szczegółowe plany wdrożenia trafiają do `notes/plans/`.

| Etap | Status |
|---|---|
| 0. Wizja | zrobione 9.10.2026 |
| 1. Fundament i silnik na 12 miejscach | następny |
| 2. Interfejs | |
| 3. Nowe miejsca, partiami | |
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

- panel ustawień pod telefon i ustawienia domyślne na pierwsze wejście, trasa przelicza się od razu;
- „Wybrane, bo…”, „Nie ma na twojej trasie, bo…”, przyciski „Dodaj” i „Usuń”;
- zamiany albo–albo wewnątrz modułów;
- mapa z nowymi kadrami (`geo/make_basemap.py`), od razu z miejscem na partię A: Sa Pa i Hà Giang leżą poza dzisiejszym panelem północy, a Phong Nha w środku kraju;
- sezon i pogoda dla dni trasy, ostrzeżenia o Tết, świętach i zamknięciach;
- budżet: przedział w złotych, najdroższe pozycje, wyprzedzenie rezerwacji;
- kopiowanie planu i link;
- sprawdzenie na szerokości telefonu (`shot.sh`, `probe.sh`).

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

- **Partia A, najważniejsza dla przygodowych:**
  - Phong Nha: łatwe jaskinie, Hang Én, Tú Làn;
  - Cúc Phương z Vân Long: naczelne;
  - Đà Nẵng z Sơn Trà: red-shanked douc;
  - Hà Giang: pętla z kierowcą albo samodzielnie, z researchem przepisów o motocyklach;
  - Sa Pa z Fansipan.
- **Partia B:** Bạch Mã, Pù Mát, Yok Đôn, Tà Năng–Phan Dũng, Mù Cang Chải, Mỹ Sơn (np. jako dzień w module Hội An).
- **Kolejne partie** według potrzeb, np. morze (Côn Đảo).

## Etap 4: audyt i publikacja (po partii A)

- audyt jak 9.10 w pierwowzorze: kombinacje, treść, linki, telefon;
- wersja offline: PDF z wydruku i lekki plik offline, z decyzją o formacie;
- repo `wietnam` publiczne, README z „©”, GitHub Pages pod https://grzegorzfrskiba-hub.github.io/wietnam/;
- pierwsze linki dla znajomych.

Wysłanie na GitHuba i publikacja tylko za zgodą. Partia B i kolejne dochodzą później na żywej stronie, każda z pełnym testem.

## Następny krok: sesja „plan etapu 1”

1. `git init` i pierwszy commit (CLAUDE.md, `notes/`), za zgodą. Do decyzji: czy od razu zakładamy repo na GitHubie (prywatne do publikacji, jako kopia zapasowa), czy dopiero w etapie 4.
2. Plan wdrożenia etapu 1 w `notes/plans/`: zadania po kolei, każde z testem. Pierwsze zadanie to prototyp silnika na 12 miejscach.
3. Research sezonów (12 miejsc × 12 miesięcy) nie zależy od kodu, więc może iść równolegle.
