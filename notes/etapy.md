# Wietnam po swojemu: etapy

Plan prac na podstawie [wizja.md](wizja.md). To dokument żywy: po każdym etapie zaktualizuj status i następny krok. Szczegółowe plany wdrożenia trafiają do `notes/plans/`.

| Etap | Status |
|---|---|
| 0. Wizja | zrobione 9.10.2026 |
| 1. Fundament i silnik na 12 miejscach | zrobione 11.10.2026: 1A (silnik) 10.10.2026, 1B (strona) 11.10.2026; raport tras 1A: [notes/raport-tras-2026-10-09.md](raport-tras-2026-10-09.md) |
| 2. Interfejs | w toku: 2A (telefon, powody, pogoda, mapa) zrobione 11.10.2026, 2B do zaplanowania |
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

Plan 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md), zrobiony 11.10.2026):
- formularz na górze strony, a po przewinięciu pasek z podsumowaniem i „Zmień”; na pierwsze wejście najlepszy miesiąc z 12 następnych;
- „Wybrane, bo…”, „Nie ma na twojej trasie, bo…” i zapowiedź przy „Dodaj”;
- pogoda w karcie miejsca, plan na deszcz zależny od miesiąca, wydarzenia i uwagi sezonowe, ostrzeżenie o złym sezonie zainteresowania;
- mapa w trzech kadrach: kontury ze skryptu `geo/make_basemap.py`, rozmieszczanie etykiet i paleta 20 kolorów;
- krój IBM Plex Sans, twarde spacje, uwagi z przeglądów planu 1B i sondy, które sprawdzają.

Plan 2B (zarys na końcu planu 2A):
- budżet: przedział w złotych, najdroższe pozycje, wyprzedzenie rezerwacji; koszty pierwowzoru są w EUR i na grudzień, więc z własnym researchem cen;
- „Przed wyjazdem”: rezerwacje według trasy, pakowanie według miesięcy, wjazd;
- zamiany albo–albo w modułach, najpierw samodzielny motocykl;
- przejazdy z lotnisk do Cát Bà, Cát Tiên i delty Mekongu;
- punkt kontrolny etapu 2.

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
- przełączenie repo `wietnam` na publiczne, README z „©”, GitHub Pages pod https://grzegorzfrskiba-hub.github.io/wietnam/;
- pierwsze linki dla znajomych.

Wysłanie na GitHuba i publikacja tylko za zgodą. Partia B i kolejne dochodzą później na żywej stronie, każda z pełnym testem.

## Następny krok: plan 2B

Zrobione 11.10.2026: plan 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md)). Strona jest wygodna na telefonie i tłumaczy swoją trasę. Formularz stoi na górze, a po przewinięciu pasek u góry pokazuje podsumowanie i „Zmień”. Przy każdym miejscu jest „Wybrane, bo…”, pogoda w miesiącu pobytu i wydarzenia, a pod trasą „Nie ma na twojej trasie, bo…” z zapowiedzią przy „Dodaj”. Mapa ma trzy kadry, a jej etykiety nie nachodzą na siebie.

Przegląd zrzutów 2A (11.10.2026): poprawione od razu trzy rzeczy: na telefonie podpis zdjęcia nie dotyka przycisku „Zobacz trasę”, w pogodzie liczba dni z deszczem nie zostaje sama na końcu linii, a wielowyrazowe nazwy wietnamskie w opisach dni (Thảo Điền, Chợ Lớn, Hà Tôn Quyền) nie łamią się w środku: wiąże je reguła `tieVietnamese` w `site2/src/page.js`, a nazwy bez wietnamskich liter (Lang Biang) lista `KEEP_TOGETHER` w `site2/src/content.js`. Prywatnego artifactu do sprawdzenia na telefonie nie publikowano: stronę na prawdziwym telefonie sprawdzi punkt kontrolny etapu 2 na końcu planu 2B.

**Plan 2B:** najpierw sesja decyzji (po jednym pytaniu, z rekomendacją), potem research i plan z suchą próbą. Zakres i pytania: „Zarys planu 2B” na końcu planu 2A.

Uwagi z przeglądu zrzutów 2A na plan 2B:
- zdanie przy „Dodaj”: „Przy 15 dniach wygrały inne miejsca” i zaraz pod nim „Zmieści się bez usuwania innych miejsc” brzmią sprzecznie; propozycja: „Zmieści się bez usuwania innych miejsc, ale skróci inne pobyty.” (`off.nodrops` w `site2/src/ui.js`);
- przycisk „Na górę” na telefonie czasem zasłania „Dodaj” przy prawej krawędzi listy „Nie ma na twojej trasie”;
- „ok.” przed liczbą zostaje w opisach dni na końcu linii („ok. / 2 godz.”);
- karta nocy w drodze dwa razy mówi „Noc w drodze”: w podtytule i w powodzie „Noc w drodze z … do …”.

**Do etapu 3 (nowe miejsca):**
- włączyć testy, które dziś nie mają czego łapać, bo wszystkie miejsca mają poziom 1, a w sezonach nie ma X: niezależne przeliczenie sezonu każdej nocy, przegląd trybu dat, lista znanych lotnisk w danych i wymóg, żeby każde miejsce trafiło na jakąś trasę;
- dwie drogi po korekcie silnik omija przez Hà Nội: lotnisko Hà Nội – Pù Luông (5,25 h w danych, efektywnie 5 h) i Ninh Bình – Cao Bằng (9,25 h w danych, efektywnie 8,5 h). Do decyzji przy przeglądzie danych: zostawić albo poprawić drogi przez Hà Nội;
- nowe miejsca dostają trudne dni według zasad z [research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md) (dziś trudny dzień mają tylko Cát Tiên i Pù Luông);
- Cát Bà: sprawdzić jeszcze raz trudny dzień (licencje operatorów i legalność deep-water soloingu); dziś Cát Bà celowo go nie ma;
- każde nowe miejsce dostaje numer koloru (`color` w treści) i musi leżeć w kadrze mapy (`site2/src/panels.js`). Paleta ma 20 kolorów, a partie A i B dają razem 24 miejsca, więc paletę trzeba rozszerzyć. Pù Mát (partia B) leży poza kadrami: trzeba przesunąć kadr i wygenerować kontury od nowa (`geo/make_basemap.py`);
- wielowyrazowe nazwy z nowych tekstów bez wietnamskich liter (jak Lang Biang) dopisać do `KEEP_TOGETHER` w `site2/src/content.js`; nazwy z takimi literami wiąże reguła `tieVietnamese`;
- do obejrzenia po dodaniu nowych miejsc: zygzaki przy trasie tam i z powrotem i przy przylocie do Đà Nẵng (raport tras 1A, trasy 6, 8 i 11), dzień z dwoma lotami (ok. 9% tras, głównie Phú Quốc ↔ Đà Lạt przez Sajgon), Cát Bà często na 4 noce, Hà Nội trzy razy na 30-dniowej trasie z Hà Nội. Przykład zygzaka: `#od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1` (Hội An, lot do Hà Nội, lot do Huế, potem na południe).

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

**Do audytu przed publikacją (etap 4):**
- research połączeń: robocze dopiski, odwołania do audytu pierwowzoru (dokument spoza repo), twierdzenie bez źródła o autostradzie przed Tết 2027, nazwa firmy z imieniem;
- research sezonów: tabelę zmian i „połówki” opisać jako historię metody, usunąć robocze dopiski;
- źródła faktów w planach dni przeniesionych z pierwowzoru bez zmian są w jego audycie z 9.10.2026 (`notes/audyt-2026-10-09.md` w pierwowzorze), trzeba je przenieść do `research/`;
- przy publikacji sprawdzić licencje nowych zdjęć: `hoian_4` i `hoian_5` (wymienione w planie 2A na ulicę Trần Phú i plażę An Bàng; `hue_6` to zdjęcie z pierwowzoru pod nową nazwą);
- lista „Do sprawdzenia przed publikacją” w [research/plany-dni-2026-10.md](../research/plany-dni-2026-10.md): m.in. wznowienie szlaku na Lang Biang, godziny Đại Nội, ceny w Cát Tiên, bilety w Hội An;
- robocze oznaczenia z procesu planu 1B w researchu (numery zadań i przeglądów, ok. 30 linii w `research/plany-dni-2026-10.md` i `research/trudne-dni-2026-10.md`) zastąpić opisem źródła albo usunąć;
- wydruk: mapy drukują się małe (ok. 220 px) z pustym miejscem obok, a w środku stron zostają puste pasy; do decyzji o formacie wersji offline;
- plik offline bez internetu dostaje krój zastępczy, więc etykiety mapy mogą się w nim zetknąć; rozstrzygnąć razem z czcionkami na własnym hostingu;
- źródło konturów mapy (Natural Earth, domena publiczna) w stopce albo w README.

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

### Z planu 1B

Zrobione 11.10.2026: plan 1B ([plans/2026-10-10-etap-1b-strona.md](plans/2026-10-10-etap-1b-strona.md)), prace 10–11.10.2026. Strona działa na nowym silniku: ustawienia są w linku, a trasa przelicza się od razu. Plany dni zależą od poziomu przygody, łącznie z trudnymi dniami na poziomie 3 (dziś tylko w Cát Tiên i Pù Luông). Strona ostrzega o Tết i świętach państwowych, a przy terminie, który już minął, o tym, że minął. Ma też mapę, przyciski „Dodaj” i „Usuń” (po „Dodaj” mówi, co wypadło z trasy), listę „Poza trasą” i kopiowanie planu z linkiem.

Punkt kontrolny etapu 1 (11.10.2026): przegląd zrzutów pięciu ustawień i strony zbudowanej lokalnie. Decyzje:
- trasy są sensowne, etap 1 zamknięty;
- opis poziomu 3 mówi uczciwie, że trudne dni są tam, gdzie się da, a w pozostałych miejscach dni są jak przy „Aktywnie”;
- link z terminem, który już minął, dalej pokazuje swoją trasę, a pierwsze ostrzeżenie mówi, że termin minął (plan zakładał powrót do terminu domyślnego).

Drobniejsze uwagi z przeglądów planu 1B są w [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md).

### Z planu 1A

Zrobione 10.10.2026: plan 1A ([plans/2026-10-09-etap-1a-silnik.md](plans/2026-10-09-etap-1a-silnik.md)). Silnik tras, dane 12 miejsc (14 pozycji: Hội An i Huế osobno, noc w Hà Nội w drodze), research połączeń i sezonów, test wszystkich 134 784 kombinacji i [raport tras](raport-tras-2026-10-09.md). Zmiany względem tekstu planu są w aneksie na końcu planu.

Decyzje z punktu kontrolnego 1A (10.10.2026):
- model tras zostaje;
- noc w złym sezonie (Z) jest warta 0,2 zamiast 0,35;
- dzień przylotu i wylotu: najwyżej 4 h drogą, bez zmian;
- Huế co najmniej 2 noce, reszta ocen i nocy bez zmian;
- sezony z researchu przyjęte, z jednym zestawem progów dla wszystkich miejsc;
- cztery czasy przejazdu podniesione do typowych (Cát Tiên, Pù Luông–Ninh Bình, Ninh Bình–Cao Bằng, lotnisko Hà Nội–Pù Luông), a z nimi szacunek Pù Luông–Cát Bà 7,5 h.

Uwagi z przeglądu 1A, które dotyczyły strony, uwzględnił plan 1B: typy w parserze linku, pole roku w trybie miesiąca, „Nie zmieściło się”, noc w Hà Nội w drodze, wybór wariantów dni według poziomu, plany dni Pù Luông i Bản Giốc, odwołania w researchu sezonów, kontrola listy testów oraz typy lotnisk i dat z linku.
