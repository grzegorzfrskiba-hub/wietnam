# Pomysł: planer Wietnamu dla znajomych — wstępne rozpoznanie (9.10.2026)

> **Wizja ustalona 9.10.2026:** [wizja.md](wizja.md) i [etapy.md](etapy.md). Ta notatka zostaje jako tło. Część propozycji zmieniła się w sesji o wizji.

Status: tylko rozpoznanie, czy to wykonalne i jak to ugryźć. Wizję i plan budowy robimy w osobnej sesji. Fakty oznaczone „do sprawdzenia” nie są jeszcze zweryfikowane.

To kopia robocza. Oryginał leży w repo planera grudniowego (`vietnam-planner/notes/`). Ścieżki w tej notatce (`site2/`, `tests/`, `research/`, `geo/`, `design-research/`) odnoszą się do `~/Desktop/CLAUDE roboczy plik/vietnam-planner/`.

## Pomysł w skrócie

- **Odbiorcy:** znajomi bardziej przygodowi (dżungla, dzikie zwierzęta, ekstremalne wyprawy). Każdy przyjeżdża w innym terminie i z innym akcentem: kultura, jedzenie albo małpy i przyroda.
- **Zamiast stałych dat i lotów:** każdy ustawia datę przyjazdu i wyjazdu albo samą długość, wybiera profil, a strona sama układa trasę.
- **Podstawa:** kod strony „Vietnam in December”.

## Werdykt: wykonalne

- **Ok. dwie trzecie kodu da się przenieść:**
  - pasek dni, mapa, miejsca z galeriami, plan dnia, pogoda, logistyka, kopiowanie planu z linkiem;
  - trzy języki;
  - build (artifact, Pages, plik offline);
  - testy i narzędzia (`shot.sh`, `print.sh`, `probe.sh`).
- **Trasa układa się wzdłuż jednej osi.** Wietnam jest długi i wąski, więc trasa to prawie zawsze ścieżka z południa na północ albo odwrotnie, z kilkoma odnogami (Phú Quốc, Cao Bằng, Hà Giang). Wybór miejsc na takiej osi to proste programowanie dynamiczne na kilkudziesięciu modułach. Przeglądarka policzy to w milisekundach.
- **Skracanie pobytu już działa.** Dni mają priorytet `p` i kolejność `o`, a `buildRoute` bierze `n` najważniejszych dni i układa je po kolei.
- **Test wszystkich kombinacji się skaluje.** Dziś `tests/routes.test.js` sprawdza 106 kombinacji. W nowej wersji będzie ich kilkanaście tysięcy (profil × miesiąc × długość × przylot i wylot), a JavaScriptCore przejdzie je w kilka sekund. Dzięki temu automatyczne układanie da się uczciwie sprawdzić.

Najwięcej pracy pochłonie treść, a nie kod: research, zdjęcia i tłumaczenia każdego miejsca, do tego sezony na każdy miesiąc.

## Co się zmienia względem strony grudniowej

| Dziś | W nowej |
|---|---|
| 15 dni, 14 nocy (`DAYS = 15`) | długość od ok. 5 do ok. 30 dni albo konkretne daty |
| Grudzień: pogoda, deszcz na wybrzeżu, teksty „w grudniu” | 12 miesięcy: pogoda i sezon każdego miejsca w każdym miesiącu, Tết, święta, sezony wypraw |
| 5 tras ułożonych ręcznie + zamiany | biblioteka modułów (miejsce + kilka dni planu) układana automatycznie, potem zamiany jak dziś |
| Przylot do HCMC, wylot z Hà Nội, konkretne loty | wybór lotniska przylotu i wylotu (HCMC, Hà Nội, Đà Nẵng), bez numerów lotów |
| Wersja łagodna (`e` przy dniu) | poziom przygody: spokojnie / aktywnie / ekstremalnie, na tym samym mechanizmie |
| „Left out on purpose”: stała lista | „Nie ma na twojej trasie, bo…”: poza sezonem, za daleko na tyle dni, nie twój profil |
| Mapa: dwa panele (cały kraj + północ) | inne kadry albo trzeci panel, bo Sa Pa i Mù Cang Chải leżą na zachód od dzisiejszego panelu północy, a Phong Nha w środku kraju; kontury trzeba przeliczyć (`geo/make_basemap.py`) |

## Jak układać trasę: trzy podejścia

1. **Więcej gotowych tras**, na każdy profil i kilka długości, tak jak dziś. To najbezpieczniejsze, ale każda nowa długość, miesiąc czy lotnisko to ręczna praca, a dowolnych dat to nie obsłuży.
2. **Moduły, punktacja i optymalizacja (polecane).**
   - **Co ma każdy moduł:**
     - region i pozycję na osi południe–północ, najbliższe lotnisko;
     - noce: minimum, ideał i maksimum;
     - dni planu z priorytetem;
     - tagi zainteresowań: kultura, jedzenie, przyroda, naczelne, dżungla, trekking, jaskinie, plaża, motocykl;
     - poziom trudności;
     - sezon w każdym miesiącu (dobry / średni / zły / zamknięte, z powodem);
     - koszt dnia i to, z jakim wyprzedzeniem trzeba rezerwować.
   - **Jak liczy algorytm:** wartość modułu to dopasowanie do profilu razy sezon, a każda kolejna noc w tym samym miejscu jest warta trochę mniej. Od tego odejmuje kary za godziny w drodze i liczbę przeprowadzek. Moduły są wybierane w kolejności geograficznej tak, żeby suma dni dała długość wyjazdu.
   - **Dlaczego to podejście:**
     - wynik jest powtarzalny: ten sam link daje tę samą trasę;
     - każdy wybór da się wyjaśnić („wybrane, bo…”);
     - całość da się przetestować.
3. **Trasę na żywo układa model AI**, np. Claude. To najbardziej elastyczne, ale odpada jako rdzeń strony:
   - strona na GitHub Pages nie może trzymać klucza API;
   - każde zapytanie kosztuje;
   - nie działa offline;
   - zmyślone fakty (godziny, zamknięte szlaki) to dokładnie to, przed czym dzisiejsza strona chroni.

   AI przydaje się przy pisaniu treści modułów, nie w działaniu strony.

## Zgodność z badaniem z 8.10

Badanie `vietnam-planner/notes/design-research/itinerary-benchmarks.md` odradzało silnik planowania i suwaki. Dotyczyło jednak grupy, która ma w 10 minut wybrać jedną z kilku tras. Tu odbiorca jest inny: planuje sam i ma własne daty. Wnioski z badania nadal obowiązują:

- **Profile jako gotowe ustawienia, bez suwaków.** Suwaki źle działają na telefonie.
- **Trasa przelicza się od razu przy każdej zmianie.** Nie ma przycisku „generuj”: w podobnych narzędziach najwięcej skarg dotyczy właśnie ponownego generowania.
- **Ułożoną trasę da się poprawić** zamianami „albo–albo” jak dziś, bez psucia reszty.
- **Jeden link z ustawieniami,** czyli rozszerzony dzisiejszy `variantHash`. Każdy znajomy dostaje go albo sam go wysyła.

## Miesiąc i daty to rdzeń, nie dodatek

Przykłady, z grubsza, do sprawdzenia:

- **Tết:** ok. 6.02.2027, w 2028 ok. 26.01. Przez kilka dni wiele rzeczy jest zamkniętych, transport wyprzedany, a ceny wyższe. Strona powinna ostrzegać, gdy termin obejmuje Tết.
- **Wybrzeże centralne:** pora deszczowa i powodzie mniej więcej od września do grudnia.
- **Północ:** chłodno i mglisto w styczniu i lutym, w górach (Sa Pa, Hà Giang) noce bywają bardzo zimne.
- **Południe:** sucho mniej więcej od grudnia do kwietnia, deszcz od maja do października.
- **Jaskinie w Phong Nha:** wyprawy od końca stycznia (`vietnam-planner/research/facts-2026-10.md`), Sơn Đoòng wyprzedana do 2027.

## Kandydaci na moduły dla „dzikich” profili (do sprawdzenia)

Dziś strona ma 12 miejsc: Hồ Chí Minh City, Đà Lạt, Cát Tiên, Mekong, Phú Quốc, Hội An i Huế, Pù Luông, Ninh Bình, Cát Bà, Cao Bằng, Ba Bể, Hà Nội.

- **Naczelne:**
  - Sơn Trà w Đà Nẵng (red-shanked douc);
  - Cát Tiên (gibony, ośrodek Dao Tiến);
  - Cúc Phương (Endangered Primate Rescue Center);
  - Vân Long obok Ninh Bình (Delacour's langur);
  - Cát Bà (Cat Ba langur);
  - Khau Ca w Hà Giang (Tonkin snub-nosed monkey, trudno zobaczyć).
- **Dżungla i zwierzęta:** Cát Tiên, Yok Đôn, Bù Gia Mập, Pù Mát, Bạch Mã, Cúc Phương.
- **Ekstremalnie:**
  - jaskinie w Phong Nha (Hang Én, Tú Làn);
  - Tà Năng–Phan Dũng na kilka dni, tylko z przewodnikiem;
  - Fansipan pieszo;
  - pętla w Hà Giang z kierowcą motocykla (prawo jazdy i ubezpieczenie przy jeździe samemu do sprawdzenia);
  - Ba Bể i Cao Bằng, które już są na stronie.
- **Kultura:** Huế, Hội An, Mỹ Sơn, Hà Nội, Hoa Lư, targi mniejszości na północy.
- **Jedzenie:** Sajgon, Mekong, Hội An, Huế, Hà Nội (jedzenie uliczne z przewodnikiem, kurs gotowania).

## Ryzyka

- **Treść:** każde nowe miejsce to research ze źródłami (jak `research/`), zdjęcia z Wikimedia Commons i tłumaczenia. Przy 12 miesiącach dochodzą sezony. To największy koszt.
- **Teksty „pod grudzień”:** dzisiejsze opisy (Đà Lạt, Cát Bà, Hội An w deszczu) trzeba przepisać na wersje zależne od miesiąca.
- **Bezpieczeństwo i przepisy:** wyprawy tylko z licencjonowanymi przewodnikami, pozwolenia w strefach przygranicznych, motocykl. Trzeba jasno pisać, co wolno robić samemu.
- **Kombinacje:** wariantów będą tysiące, więc reguły muszą być sprawdzane w testach jak dziś „Cát Bà ≥ 3 noce”. Inaczej wrócą błędy takie jak 28 złamanych kombinacji z audytu 9.10.
- **Aktualność:** ceny i rozkłady się zmieniają, więc przy każdym fakcie data sprawdzenia, a na stronie notka „sprawdźcie u przewoźnika” (już jest).
- **Plik offline:** dziś ma 13 MB przy 12 miejscach, przy ok. 35 miejscach wyjdzie 35–40 MB. Rozwiązania: mniejsze zdjęcia w pliku albo plik tylko z wybraną trasą.
- **Strona grudniowa zostaje nietknięta:** jej linki krążą w WhatsAppie i grupa z niej korzysta.

## Organizacja

- **Osobny projekt** z osobnym publicznym repo na GitHub Pages. Start od kopii `site2/`, `tests/` i `site2/build.py`.
- **Repo jest publiczne,** więc bez danych osobowych i konkretnych lotów.

## Proponowane etapy (do potwierdzenia w sesji o wizji)

0. **Wizja:** odpowiedzi na pytania niżej, lista profili i miejsc, zakres pierwszej wersji.
1. **Silnik i dane:**
   - model modułów, miesiące, dowolna długość, przylot i wylot;
   - na początek tylko dzisiejsze 12 miejsc;
   - test wszystkich kombinacji.
2. **Interfejs:**
   - wybór dat albo długości, lotnisk, profilu i poziomu przygody;
   - mapa z nowymi kadrami;
   - sekcja „nie ma na trasie, bo…”.
3. **Nowe miejsca dla dzikich profili,** partiami po kilka, każde z researchem.
4. **Audyt** jak 9.10, potem linki dla znajomych i plik offline.

## Pytania na sesję o wizji

1. Kto ustawia trasę: każdy znajomy sam czy organizator ustawia i wysyła gotowy link?
2. Języki: tylko PL czy PL + EN? Każdy język to kopia całej treści.
3. Które miesiące są naprawdę potrzebne, czyli kiedy przyjeżdżają znajomi? Obsługa tylko tych miesięcy mocno skraca research.
4. Lista profili i czy można je łączyć, np. „przyroda + jedzenie”.
5. Jak ekstremalnie: noclegi w dżungli i jaskiniach, motocykl samemu czy tylko z kierowcą?
6. Zakres długości (np. 5–30 dni) i lotniska (HCMC, Hà Nội, Đà Nẵng, może Phú Quốc).
7. Czy pokazywać budżet?
8. Nazwa i adres strony.
