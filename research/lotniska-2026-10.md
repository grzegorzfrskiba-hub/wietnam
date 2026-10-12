# Przejazdy z lotnisk (sprawdzone 11.10.2026)

**Do czego:** dane do planu 2B. Dziś każdy odcinek drogi z lotniska i na lotnisko ma na karcie przejazdu ten sam tekst: „Taksówka albo transfer z lotniska {x}” albo „Taksówka na lotnisko {x}” (klucze `r.taxi_from` i `r.taxi_to` w `site2/src/ui.js`). Tak jest też wtedy, gdy droga trwa 4–6 h albo wymaga promu. Ten plik mówi, jak naprawdę dojechać z każdego lotniska do miejsca z `site2/src/travel.js`, ile to trwa i kosztuje, gdzie to zamówić i co jest najprostsze z bagażem po długim locie. Do każdej drogi proponuje tekst karty. Drogi długie albo z promem trafią do listy „Zarezerwuj wcześniej”, a ceny do budżetu. Godzin z `research/polaczenia-2026-10.md` nie zmieniam, tylko sprawdzam, czy się zgadzają.

**Najważniejsze:**
- Na każdej długiej drodze najprostszy jest samochód z kierowcą zamówiony wcześniej. Kierowca czeka w hali przylotów, a w drodze na Cát Bà ma w cenie bilet na prom. Wyjątek to Thọ Xuân – Ninh Bình: tam taksówki stoją przy terminalu.
- O godzinie lądowania decydują promy (rachuba w sekcjach):
  - Cát Bà: ostatni prom z Đồng Bài odpływa ok. 18:00–18:30, latem później. Lądowanie najpóźniej ok. 16:00 w Cát Bi albo ok. 13:30 na Nội Bài.
  - Cát Tiên: łódź przez rzekę Đồng Nai pływa tylko za dnia, mniej więcej 6:00–19:00. Lądowanie na Tân Sơn Nhất najpóźniej ok. 13:30–14:00. W drugą stronę na lotnisku najwcześniej ok. 10:00.
  - Latem 2025 i 2026 auta osobowe nie wjeżdżały na prom w stronę Cát Bà w weekendy od 9:00 do 13:00.
- Samochód z kierowcą kosztuje od 29–48 EUR za auto (Đà Nẵng – Huế tunelem) do 86–255 EUR (Nội Bài – Cao Bằng). Pełne zestawienie jest na końcu.
- Dzisiejszy tekst jest naprawdę mylący przy Cát Bà i Cát Tiên, bo nie wspomina o promie, oraz na drogach 5–6 h (Cao Bằng, Ba Bể, Pù Luông z Nội Bài), gdzie taksówka spod terminalu nie jest realnym sposobem.
- Do listy „Zarezerwuj wcześniej” pasują wszystkie drogi długie poza Thọ Xuân – Ninh Bình.

## Jak czytać

- **Drogi** to pary z `ROADS` w `site2/src/travel.js`: kod lotniska i punkt, w obie strony. Punkty są jak w `research/polaczenia-2026-10.md` (PR): `ninhbinh` to Tam Cốc, `hue` to centrum Huế, `catba` to miasteczko Cát Bà, `mekong` to Phong Điền koło Cần Thơ, `cattien` to siedziba parku za rzeką Đồng Nai, `caobang` to miasto Cao Bằng, `babe` to Pác Ngòi nad jeziorem, `puluong` to wioski rezerwatu.
- **Długie** to drogi od 1,75 h wzwyż albo z promem. Każda ma własną sekcję, w kolejności ze zlecenia. **Krótkie** (do 1 h) są w jednej wspólnej sekcji.
- **Udział tras:** na ilu trasach pojawia się droga, policzone na co 7. kombinacji ustawień (liczby ze zlecenia).
- **Godziny** są z PR i ich tu nie zmieniam. Przy każdej drodze piszę, co o samym dojeździe z lotniska mówią źródła, i zaznaczam rozbieżności.
- **Najprościej** znaczy: najmniej przesiadek i noszenia bagażu po długim locie, przy rozsądnej cenie.
- **Ceny** to typowe ceny poza szczytem, ze stron z lat 2025–2026, bez dopłat świątecznych. W Tết, w długie weekendy i latem bywa drożej. Podaję cenę surową (VND albo USD) i EUR według kursów NBP: 1 EUR = 29 055 VND, 1 USD = 25 901 VND, 1 EUR = 1,1218 USD (tabela A 197/A/NBP/2026 z 9.10.2026, tabela B 040/B/NBP/2026 z 7.10.2026; KURS). Kwoty w EUR zaokrąglam do pełnych euro, a kwoty poniżej 0,5 EUR opisuję jako „poniżej 1 EUR”.
- **Za auto** znaczy cały samochód z kierowcą, paliwem i opłatami drogowymi, o ile źródło nie mówi inaczej. Przy dwóch osobach koszt na osobę to połowa.
- **Agregatory:** 12Go (jego oferty pokazują GoAsia i North-Vietnam.com) i Geckoroutes podają ceny „od”, zwykle w USD, różnych firm. To punkt odniesienia, a nie cennik przewoźnika.
- **Szacunek** to wartość bez źródła dla samej pary. Przy każdym podaję metodę.
- **Rachuba** godzin lądowania to moje wyliczenie: ok. 0,5–0,75 h na wyjście z lotniska plus czas jazdy ze źródeł, porównane z godziną ostatniego promu.
- **Źródła** mają etykiety w nawiasach, a adresy i daty stron są w sekcji „Źródła”. Wszystkie sprawdzone 11.10.2026. **†** oznacza treść widzianą tylko w wynikach wyszukiwania, bo strona nie otworzyła się dla narzędzia.
- **Wyszukiwanie:** WebSearch w trybie „standard”, po angielsku i po wietnamsku. W połowie pracy skończył się limit wyszukiwań na tę turę. Dalej czytałem tylko strony o znanych adresach, więc część rzeczy zostaje do sprawdzenia (punkty „Nie ustaliłem” w sekcjach).

## HAN – ninhbinh: Nội Bài – Tam Cốc

2,25 h, 48% tras.

- **Godziny:** w danych 2,25 h (PR). Samochód z Nội Bài jedzie 2–2,5 h (NB-GA), a u firm z tabeli NB-NV 1 h 30 min–2 h 30 min. Zgodne. Minibus typu limousine z lotniska jedzie 3–4 h, bo zbiera pasażerów (NB-GA), czyli o ok. 0,75–1,75 h dłużej niż w danych.
- **Sposoby prosto z lotniska:**
  - **Samochód z kierowcą zamówiony wcześniej.** Ceny „od” u 17 firm wynoszą 34–130 USD za auto (30–116 EUR), a połowa ofert jest do 70 USD (62 EUR) (NB-NV). GoAsia podaje 37,41–137,50 USD za auto, od samochodu na 3 osoby do busa na 15 (33–123 EUR) (NB-GA). Zamawia się przez 12Go (strony NB-GA i NB-NV kierują do niego) albo przez hotel w Tam Cốc.
  - **Minibus typu limousine z lotniska:** 11 miejsc, 16,32–24,20 USD na osobę (15–22 EUR), odjazdy co 15 min od 6:00 do 18:45, 3–4 h. Wolniejszy minibus kosztuje 14,57–19,47 USD (13–17 EUR), odjazdy co godzinę od 7:00 do 19:00, 3–3,5 h (NB-GA). Strona nie nazywa przewoźników.
  - **Przez centrum Hà Nội:** autobus 86 albo Grab na Stare Miasto (zob. drogi krótkie), potem minibus typu limousine od 8 USD (7 EUR), np. Duy Khang co godzinę od 5:30 do 19:30 (NB-NV).
- **Najprościej:** samochód z kierowcą zamówiony dzień–dwa wcześniej. Przy jednej osobie minibus z lotniska kosztuje dwa–trzy razy mniej, ale jedzie dłużej.
- **Nie ustaliłem:** ceny taksówki albo Graba spod terminalu do Ninh Bình. Żadne przeczytane źródło jej nie podaje.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hà Nội”): mało mylący. Pomija minibus z lotniska i to, że auto trzeba zamówić.
- **Tekst karty:** „Samochód z kierowcą albo minibus typu limousine, oba do zamówienia wcześniej”.

## DAD – hue: Đà Nẵng – Huế

2,5 h, 29% tras.

- **Godziny:** w danych 2,5 h, wariant tunelem Hải Vân (PR). Samochód tunelem jedzie 2–2,5 h (HUE-LV), autobus 2 h 15 min–2 h 30 min (HUE-GA). Zgodne. Przez przełęcz Hải Vân z postojami to 3–5 h (HUE-LV), czyli inna droga, taka jak w tekście `r.haivan` dla Hội An – Huế.
- **Sposoby:**
  - **Samochód z kierowcą tunelem:** sedan ok. 1 200 000–1 400 000 VND za auto (41–48 EUR) (HUE-LV). W ofertach z 12Go najmniejsze auto kosztuje od 33 USD (29 EUR), a duże busy do 290–306 USD (HUE-GA). Zamawia się przez hotel w Huế albo firmę transferową. Lotnisko leży w mieście, 8–14 min od rzeki Hàn (DAD-LV), więc kierowca odbiera z hali przylotów.
  - **Przez przełęcz z postojami:** 60–110 USD za dzień (53–98 EUR) (HUE-LV).
  - **Autobus albo minibus z Đà Nẵng:** odjeżdża z punktów w mieście, nie z lotniska. Autobus publiczny kosztuje ok. 80 000 VND (3 EUR), minibusy turystyczne i limousine 120 000–250 000 VND (4–9 EUR), np. The Sinh Tourist, Hạnh Cafe, Hai Van Limousine (HUE-LV). W 12Go 9,77–12,22 USD (9–11 EUR) (HUE-GA). Najpierw taksówka albo Grab z lotniska, w mieście 80 000–150 000 VND (DAD-LV).
  - **Pociąg z dworca Đà Nẵng:** 6,70–26,06 USD (6–23 EUR), 2 h 29 min–3 h 47 min (HUE-GA).
- **Najprościej:** samochód z kierowcą tunelem, zamówiony wcześniej. Przy dwóch osobach ok. 21–24 EUR na osobę.
- **Nie ustaliłem:** czy Grab bierze kursy do Huế i za ile.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Đà Nẵng”): w porządku, ale nie mówi, którędy. Od wyboru tunelu albo przełęczy zależy czas.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej, tunelem pod przełęczą Hải Vân”.

## HPH – catba: Cát Bi – Cát Bà

1,75 h, 18% tras.

- **Godziny:** w danych 1,75 h (PR). Źródła: 1,5–2 h (CB-LVCATBI), ok. 1,5 h (CB-OCEAN), ok. 2 h od lądowania (CB-VT). Autobus z lotniska jedzie ok. 2 h (CB-VTGRAB). Zgodne.

### Prom Đồng Bài – Cái Viềng (także dla HAN – catba)

- **Przystań:** stara przystań Gót przestała działać 1.03.2024. Zastąpiła ją przystań Đồng Bài, nazywana „nową Gót”, ok. 4 km dalej (CB-MIA). Przeprawa „Bến Gót – Cái Viềng” i „Đồng Bài – Cái Viềng” to więc dziś ta sama linia, a wiele przewodników dalej mówi „Gót”.
- **Przewoźnik:** konsorcjum Công ty CP Đảm bảo giao thông đường thủy Hải Phòng i Công ty TNHH Bayview Cát Bà, 7 promów (CB-MOC†).
- **Kursy:** poza latem ok. 23 dziennie, latem 2026 (IV–VIII) do 38 (CB-VNE). Co 30–60 min (CB-VW), w szczycie co 10–15 min (CB-MIA).
- **Godziny:** z Đồng Bài pierwszy kurs ok. 5:30, ostatni ok. 18:30. Z Cái Viềng pierwszy ok. 5:00, ostatni ok. 18:00 (CB-MIA, CB-VW). CB-MIA podaje też godziny pracy przystani: zimą 5:00–18:00, latem 4:30–18:30, więc zimą ostatni kurs z Đồng Bài może być już ok. 18:00. Tabela z 2025 roku ma kursy co 30 min do 19:30, ale to prawdopodobnie rozkład szczytu (CB-SPL1). W dni szczytu pierwszy kurs rusza nawet o 5:00, 20 min przed rozkładem (CB-VNE).
- **Przeprawa:** 15–35 min (CB-SPL1, CB-VW, CB-MIA). Potem ok. 22–25 km drogą do miasteczka (CB-LVCATBI, CB-OCEAN).
- **Ceny w jedną stronę:** pieszo 10 000–12 000 VND (poniżej 1 EUR), auto do 9 miejsc 190 000 VND (7 EUR), od 9 do 24 miejsc 210 000 VND (7 EUR) (CB-MIA, CB-VW). Urzędowego cennika nie znalazłem. Ceny ustala przewoźnik, a miasto reguluje tylko zniżki dla mieszkańców (CB-LSVN2).
- **Bez aut latem:** miasto nie wpuszcza na prom aut osobowych i ciężarowych w stronę Cát Bà w godz. 9:00–13:00. W 2025 roku obowiązywało to 26.04–4.05 i w weekendy 10.05–30.07 (CB-LSVN1), w 2026 roku 25.04–3.05 i w weekendy 9.05–30.09 (CB-VNE). Wtedy pasażerowie przechodzą przez prom pieszo albo jadą kolejką linową. Kolejka aut w szczycie miała 30.04.2026 ponad 1,5 km (CB-VNE). Decyzji na 2027 rok nie znalazłem.
- **Sztormy:** przy ostrzeżeniach sztormowych prom staje, np. 24.08.2025 i 22.08.2026 (SEZ).
- **Kolejka linowa Cát Hải – Phù Long:** dla pieszych, ok. 3 955 m, 8–10 min. Cena w jedną stronę to 50 000 VND (2 EUR) według CB-SPL3, ok. 100 000 VND (3 EUR) według CB-NVHP albo 150 000 VND (5 EUR) według CB-SPL2; źródła się różnią. Według CB-SPL2 kursuje w godz. 9:00–11:00 i 13:00–17:00, a we wtorki stoi. Z Phù Long do miasteczka jest ok. 17 km, 20–30 min autobusem albo taksówką (CB-SPL3).
- **Drugi prom, od strony Hạ Long:** Tuần Châu – Gia Luận, ok. 50 min, 3–5 kursów dziennie, tylko przy dobrej pogodzie i co najmniej 30 pasażerach (CB-VW), 40 000 VND (1 EUR) (CB-VT).

### Sposoby z lotniska Cát Bi

- **Samochód z kierowcą zamówiony wcześniej, z promem.** Firma kupuje bilet na prom i w razie potrzeby przesiada pasażerów do drugiego auta na wyspie (CB-LVCATBI). Auto do 4–6 osób kosztuje 47–90 USD (42–80 EUR), bus na 9–19 osób 94–130 USD (84–116 EUR) (CB-NVHP); GoAsia podaje 47–131 USD (CB-GAHP). Zamawia się przez hotel na Cát Bà albo firmę transferową.
- **Autobus z lotniska na Cát Bà:** 300 000 VND (10 EUR) na osobę, ok. 2 h (CB-VTGRAB). Strona nie podaje przewoźnika ani godzin.
- **Taksówka albo Grab do przystani Đồng Bài:** ok. 25 km (CB-LVCATBI), 20–40 min (CB-VT, CB-NVHP). Potem prom pieszo i autobus albo taksówka po wyspie. Grab działa po stronie Hải Phòng, ale nie przewiezie przez cieśninę, a na wyspie bywa niedostępny (CB-VTGRAB). CB-VTGRAB wycenia taksówkę z Hải Phòng na Cát Bà na 620 000 VND (21 EUR), ok. 1,5 h, ale nie mówi, czy z biletem na prom.
- **Taksówka do przystani Bính w centrum Hải Phòng i szybka łódź:** taksówka 20 min, 150 000–250 000 VND (5–9 EUR); łódź 45 min, 200 000–300 000 VND (7–10 EUR) na osobę, kursy co 1,5–2 h od 6:00 do 17:00 (CB-VT). Rozkłady w źródłach się różnią: z Hải Phòng o 7:00, 9:00, 13:00 i 15:00 (CB-SPL1); autobus z promem spod przystani Bính o 6:00–15:50 (CB-NVHP). Po ok. 16:00 zostaje tylko prom samochodowy (CB-VT).

### Podsumowanie drogi

- **Najprościej:** samochód z kierowcą z promem w cenie, zamówiony wcześniej. Rachuba: lądowanie o 16:00, wyjście z lotniska do 16:30, ok. 40 min do Đồng Bài, czyli przystań ok. 17:10, przed ostatnim promem o 18:00–18:30. Lądowanie później jest ryzykowne.
- **Rezerwacja:** latem i w weekendy dzień–dwa wcześniej (CB-LVHAN).
- **Nie ustaliłem:** urzędowego rozkładu promu na zimę 2026/27 i przewoźnika autobusu z lotniska Cát Bi.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hải Phòng (Cát Bi)”): mylący. Pomija prom, a od niego zależy, czy się dojedzie: ostatni kurs wieczorem, przerwy przy sztormach, latem w weekendy bez aut przed południem. Grab nie przewiezie przez cieśninę.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej i krótki prom Đồng Bài – Cái Viềng”.

## SGN – mekong: Tân Sơn Nhất – Phong Điền

3,5 h, 18% tras.

- **Godziny:** w danych 3,5 h, samochodem (PR). Samochód do Cần Thơ jedzie ok. 3 h (MK-LV), do tego ok. 0,5 h do Phong Điền (PR). Zgodne. Autobusem jest dłużej. Szacunek: ok. 4,25–6,25 h. Metoda: 0,5–0,75 h na dworzec Miền Tây (13,7 km; MK-R2R), 0,25–0,5 h czekania, 3–4,5 h jazdy (MK-GA) i ok. 0,5 h z Cần Thơ do Phong Điền (PR).
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej, prosto z hali przylotów do Phong Điền:** 1 700 000–2 500 000 VND za auto do Cần Thơ (59–86 EUR) (MK-LV). W 12Go sedan i SUV kosztują 49–90 USD (44–80 EUR), busy do 265 USD (MK-GA). Dopłaty za ok. 17 km z Cần Thơ do Phong Điền źródła nie podają. Zamawia się przez gospodarzy w Phong Điền, hotel albo 12Go.
  - **Taksówka na dworzec Miền Tây, autobus do Cần Thơ i taksówka do Phong Điền:**
    - Taksówka albo Grab na dworzec: szacunek 220 000–330 000 VND (8–11 EUR). Metoda: cena kursu do centrum, ok. 6 km (Grab 130 000–170 000 VND, taksówka 150 000–200 000 VND plus 10 000 VND opłaty; MK-VNA), i ok. 8 km więcej po 12 000–15 000 VND/km (stawka taksówek z MK-VNB). Dworzec leży 13,7 km od lotniska (MK-R2R).
    - Autobus: w 12Go 9,18–17,64 USD (8–16 EUR), odjazdy przez całą dobę (MK-GA). Minibusy typu limousine 260 000–300 000 VND (9–10 EUR), np. Meko Limousine, Vietnam Travel Bus, GoEz (MK-LV). Phương Trang (FUTA) wozi w Cần Thơ za darmo pod adres w mieście (MK-WV), ale ceny na tej stronie są z 12.2019.
    - Z Cần Thơ do Phong Điền taksówką: szacunek 200 000–260 000 VND (7–9 EUR). Metoda: ok. 17 km (PR) po 12 000–15 000 VND/km (MK-VNB). Taniej jedzie autobus miejski Cần Thơ – Phong Điền, 7 000–15 000 VND (MK-VNB).
  - **Autobusy miejskie z lotniska na dworzec Miền Tây:** linie 49 i 14 z przesiadką, ok. 1 h 16 min (MK-R2R). Z bagażem niewygodne.
- **Najprościej:** samochód z kierowcą zamówiony wcześniej, prosto do Phong Điền. Przy dwóch osobach 22–43 EUR na osobę. Autobusem wychodzi ok. 15–26 EUR na osobę, ale ok. 0,75–2,75 h dłużej i z dwiema przesiadkami.
- **Nie ustaliłem:** aktualnej ceny Phương Trang (strona przewoźnika ładuje rozkład skryptem) i tego, czy jakiś minibus jeździ prosto z lotniska do Cần Thơ.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hồ Chí Minh City”): średnio mylący. „Taksówka” na 3,5 h to w praktyce samochód zamówiony wcześniej, a tańszy wariant to autobus z dworca Miền Tây. Inne drogi do Phong Điền mają już tekst „Autobus albo prywatny samochód do Phong Điền”, więc droga z lotniska odstaje.
- **Tekst karty**, jedno zdanie w obie strony: „Samochód z kierowcą zamówiony wcześniej albo, dłużej, autobus przez dworzec Miền Tây i Cần Thơ”. Albo dwa warianty, jak przy `r.bus_mekong`:
  - do miejsca: „Samochód z kierowcą prosto do Phong Điền albo taksówka na dworzec Miền Tây i autobus do Cần Thơ”;
  - do lotniska: „Samochód z kierowcą z Phong Điền albo autobus z Cần Thơ na dworzec Miền Tây i taksówka”.

## HAN – catba: Nội Bài – Cát Bà

4 h, 12% tras.

- **Godziny:** w danych 4 h (PR). Samochód z Hà Nội z promem jedzie 3–4 h (CB-VT). Z Nội Bài do przystani jest 2 h 5 min–3 h 20 min (CB-GAHAN), potem prom i ok. 25 km po wyspie (CB-OCEAN). Autobus z lotniska jedzie 4 h 30 min (CB-GECKO). Zgodne, a przy korkach górna granica to ok. 4,5 h.
- **Prom:** jak w sekcji HPH – catba (godziny, ograniczenia dla aut latem, sztormy, kolejka linowa).
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej, z promem:** 1 500 000–2 500 000 VND za auto z Hà Nội, z biletem na prom (52–86 EUR) (CB-VT). Grab z Nội Bài kosztuje ok. 2 000 000 VND (69 EUR) (CB-VT). SUV od Good Morning Cat Ba z hotelu w Hà Nội kosztuje 2 800 000 VND (96 EUR) (CB-GECKO). W 12Go firmy biorą 69–253 USD za auto (62–226 EUR), zależnie od wielkości (CB-NVHAN). CB-VT radzi nie brać kierowców, którzy zaczepiają w hali przylotów.
  - **Autobus z lotniska:** Good Morning Cat Ba, 22 USD (20 EUR), odjazdy z Nội Bài o 6:30, 9:30 i 13:00, 4 h 30 min (CB-GECKO). Na stronie przewoźnika tej linii nie ma (CB-GMCB), więc to do potwierdzenia. CB-LVHAN pisze ogólnie, że niektórzy przewoźnicy jeżdżą prosto na Nội Bài.
  - **Przez centrum Hà Nội:** autobus 86 albo Grab na Stare Miasto (zob. drogi krótkie), potem autobus z promem za 230 000–350 000 VND (8–12 EUR) z biletem na prom, 4–5,5 h (CB-VT). Przykłady: Cat Ba Express od 13 USD (12 EUR), odjazdy o 6:00, 7:45, 10:45 i 14:00 (CB-CBE); minibusy typu limousine 16–17 USD (14–15 EUR) (CB-GECKO).
- **Najprościej:** samochód z kierowcą z promem w cenie, zamówiony wcześniej. Rachuba: lądowanie o 13:30, wyjście z lotniska do ok. 14:15, do przystani 2 h 5 min–3 h 20 min, czyli Đồng Bài ok. 16:20–17:35, przed ostatnim promem o 18:00–18:30. Przy późniejszym lądowaniu lepiej nocleg w Hà Nội.
- **W stronę lotniska:** autobusy z promem spóźniają się zwykle o godzinę, czasem o dwie. CB-LVHAN radzi duży zapas czasu albo przejazd dzień przed lotem.
- **Rezerwacja:** latem i w weekendy dzień–dwa wcześniej (CB-LVHAN).
- **Nie ustaliłem:** czy autobus Good Morning Cat Ba z Nội Bài kursuje w zimie 2026/27.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hà Nội”): mylący, z tych samych powodów co przy Cát Bi. Do tego „taksówka” na 4 h to w praktyce auto zamówione wcześniej.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej i krótki prom Đồng Bài – Cái Viềng”.

## SGN – cattien: Tân Sơn Nhất – Park Narodowy Cát Tiên

3,75 h, 11% tras.

- **Godziny:** w danych 3,75 h od drzwi do drzwi, z promem (PR). Samochód jedzie do przystani ok. 3 h (CT-VT), ok. 3,5 h (CT-WV), 3–4 h (CT-JB). Zgodne. Autobusem jest dłużej: FUTA jedzie ok. 3,5–5 h do Tân Phú albo Phương Lâm (CT-VT, CT-POTOO), potem jeszcze 24–25 km do przystani, 30–40 min (CT-WWW). Szacunek dla autobusu: ok. 4,75–6,75 h bez czekania na odjazd. Metoda: 0,5–0,75 h na dworzec (jak do dworca Miền Tây w sekcji SGN – mekong), 3,5–5 h jazdy, 0,5–0,67 h do przystani i ok. 0,25 h na przeprawę.
- **Prom przez rzekę Đồng Nai:**
  - Mała łódź, 5 min przeprawy (CT-POTOO). Samochód zostaje przy przystani (CT-VT), a siedziba parku jest po drugiej stronie.
  - Bilet za 60 000 VND (2 EUR) obejmuje przeprawę w obie strony i wstęp do parku (CT-WV, stan z 4.2026; CT-POTOO; CT-VT; cennik parku w TD).
  - Godziny: od ok. 6:00–6:30 do ok. 18:00–19:30, źródła się różnią: 6:30–19:00 (CT-WV), 6:30–19:30, po 18:00 co 30 min (CT-POTOO), do ok. 18:00 (CT-VT). Nocą łódź nie pływa, z możliwymi wyjątkami (CT-WV). Na wyprawę do gibonów park przeprawia ok. 4:45 (CT-VT).
  - Most: dwa przewodniki piszą, że most przez rzekę jest w budowie i ma być gotowy w 2026 roku (CT-VT, 18.09.2026; CT-POTOO, stan z 4.2026). W prasie wietnamskiej tego nie potwierdziłem, więc w tekstach zostaje prom.
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej, do przystani promu:** 1 500 000–2 000 000 VND za auto (52–69 EUR) (CT-VT), 1 800 000–3 000 000 VND zależnie od auta (62–103 EUR) (CT-POTOO). Park odbiera gości z HCMC przez firmy z wynajmem aut (CT-WWW). Grab z centrum kosztował ok. 1 200 000 VND (41 EUR, stan z 12.2024), o ile kierowca zgodził się jechać (CT-WV). Z lotniska to niepewne.
  - **Autobus „Bé” z dworca Ngã Tư Ga prosto do kasy parku przy przystani:** 150 000 VND (5 EUR, stan z 1.2026), odjazdy o 8:30, 10:20, 12:50, 14:50 i 16:20, bez rezerwacji (CT-WV); CT-POTOO podaje 110 000–150 000 VND. Ngã Tư Ga leży na północy miasta, więc najpierw taksówka z lotniska. Rachuba: lokalny autobus jedzie ok. 4 h (CT-VT), więc odjazdy o 14:50 i 16:20 dojeżdżają przy ostatniej przeprawie albo po niej.
  - **FUTA (Phương Trang) w stronę Đà Lạt:** 150 000–200 000 VND (5–7 EUR) (CT-VT); 200 000 VND, stan z 12.2024 (CT-WV). Odjazdy z dworca Miền Đông, z biura przy 272 Đề Thám albo z Ngã Tư Ga (CT-VT, CT-WV, CT-POTOO). Wysiada się w Tân Phú, przy skrzyżowaniu na 125. km drogi krajowej 20, albo w biurze FUTA w Phương Lâm (CT-JB, CT-WWW). Stamtąd do przystani jest 24–25 km (CT-JB, CT-WWW, CT-WV). Biuro w Phương Lâm dowozi do parku, jeśli zgłosi się to przy kupnie biletu (CT-WWW); od 2025 roku jeździ tam minibus (CT-POTOO). Z Tân Phú jeżdżą też taksówki i Xanh SM (CT-WWW). Za mototaksówkę miejscowi płacą 150 000 VND, a turystom zdarza się zapłacić do 1 000 000 VND (CT-WV, bez daty). CT-VT podaje z Tân Phú 12 km, co przeczy trzem innym źródłom.
  - **Lokalne autobusy do bramy parku** (Bé, Kim Hoàn, Mạnh Hồng): 120 000–150 000 VND (4–5 EUR) (CT-WWW).
- **Najprościej:** samochód z kierowcą zamówiony wcześniej, najlepiej razem z noclegiem w parku. Rachuba: lądowanie najpóźniej ok. 13:30–14:00, potem ok. 0,75 h na wyjście z lotniska i 3–3,5 h jazdy, czyli przystań ok. 17:15–18:15. Ostatnia przeprawa jest o 18:00–19:30, zależnie od źródła, więc później robi się ryzykownie. W drugą stronę pierwsza przeprawa jest o 6:00–6:30, a potem 3–3,5 h jazdy, więc lotnisko najwcześniej ok. 10:00.
- **Rezerwacja:** auto razem z noclegiem, kilka dni wcześniej. W dni świąteczne park dolicza 20% do aut i pokoi (TD).
- **Na przyszłość:** lotnisko Long Thành ma ruszyć pod koniec 2026 roku (CT-JB). Gdy przejmie loty, dojazd do Cát Tiên się zmieni.
- **Nie ustaliłem:** stanu budowy mostu, ceny taksówki z lotniska na dworzec Ngã Tư Ga i aktualnego cennika FUTA do Tân Phú.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hồ Chí Minh City”, w drugą stronę „Taksówka na lotnisko Hồ Chí Minh City”): mylący. Pomija łódź, która pływa tylko za dnia. Taksówki spod terminalu na 3,75 h nie da się zakładać, a w parku żadna taksówka nie czeka. Inne drogi do Cát Tiên mają już tekst z promem (`r.car_cattien`).
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej, a przy parku prom przez rzekę Đồng Nai, który pływa tylko za dnia”.

## HAN – caobang: Nội Bài – Cao Bằng

6,25 h, 2% tras.

- **Godziny:** w danych 6,25 h, to szacunek (PR). Samochód z Hà Nội jedzie 5–6 h (CAO-VT), w ofertach 5 h 30 min–5 h 40 min (CAO-NV); minibus 6–7 h, autobus nocny 7–9 h (CAO-VT). Zgodne. Oferty „z Nội Bài” w agregatorach mają 10 h jazdy (CAO-NV, CAO-GA). Wygląda to na błąd albo na trasę do Bản Giốc, więc tego nie biorę.
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej:** 2 500 000–4 000 000 VND (86–138 EUR), z kierowcą, paliwem i opłatami (CAO-VT). W agregatorach z Hà Nội 160–286 USD (143–255 EUR) (CAO-NV, CAO-GA), z Nội Bài 253–367 USD (226–327 EUR) (CAO-NV, CAO-GA). Zamawia się przez hotel albo Klook (CAO-VT).
  - **Minibus typu limousine z Hà Nội:** 400 000–600 000 VND (14–21 EUR), 6–7 h (CAO-VT). Odjazdy z dworca Mỹ Đình albo spod Opery, np. Trung Khanh od 5:45 do 12:10, 5 h 30 min, od 17 USD (15 EUR) (CAO-NV).
  - **Z lotniska:** autobusy rano (6:45, 7:00) i nocą (ok. 22:00) za 26,89–35,68 USD (24–32 EUR) oraz minibus 11-osobowy z odjazdami od 6:30 do 15:45 za 25,18 USD (22 EUR), który jedzie jednak 8 h 20 min (CAO-GA).
  - **Przez centrum:** autobus 86 na Stare Miasto i nocny autobus za 250 000–400 000 VND (9–14 EUR), 7–9 h, z przyjazdem ok. 4:00–6:00 (CAO-VT).
- **Najprościej:** samochód z kierowcą zamówiony wcześniej, po porannym albo południowym lądowaniu. Przy dwóch osobach i cenie lokalnej 43–69 EUR na osobę.
- **Rezerwacja:** w sezonie (X–IV) co najmniej dzień wcześniej (CAO-VT).
- **Nie ustaliłem:** ceny auta z Nội Bài poza agregatorami.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hà Nội”): mylący. 6,25 h to nie jest kurs taksówki spod terminalu.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej”.

## THD – ninhbinh: Thọ Xuân – Tam Cốc

2 h, 1% tras.

- **Godziny:** w danych 2 h (PR). 1 h 40 min–2 h, 105–120 km (THD-SPL). Zgodne.
- **Sposoby:**
  - **Taksówka spod hali przylotów** (Mai Linh, Vinasun, Le Gia; pisownia źródła) **albo auto zamówione wcześniej** przez aplikację G5 Car: 1 200 000–1 600 000 VND za auto (41–55 EUR), zależnie od auta (THD-SPL).
  - **Transport publiczny:** taksówka albo autobus lotniskowy do Thanh Hóa (40–45 km), potem autobus do Ninh Bình za 80 000–120 000 VND (3–4 EUR), 1,5–2 h, albo pociąg za 50 000–250 000 VND (2–9 EUR), 1–1,5 h. Razem 3–4 h z jedną albo dwiema przesiadkami (THD-SPL). Ceny autobusu lotniskowego strona nie podaje.
- **Najprościej:** taksówka spod terminalu albo auto zamówione wcześniej.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Thanh Hóa (Thọ Xuân)”): w porządku, bo taksówki stoją przy lotnisku.
- **Tekst karty:** „Taksówka albo samochód z kierowcą zamówiony wcześniej”.

## THD – puluong: Thọ Xuân – Pù Luông

2,5 h, 1% tras.

- **Godziny:** w danych 2,5 h, środek przedziału 2–3 h (PR, PL-MT). Pu Luong Excursions podaje ok. 3 h taksówką (PL-PLE). **Rozbieżność:** typowy czas może być bliżej 2,75–3 h niż 2,5 h. Do decyzji, bo godzin tu nie zmieniam.
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej** przez gospodarzy albo biuro w Pù Luông (PL-PLE) **albo auto wynajęte na lotnisku** (PL-MT). Cena: szacunek 1 000 000–1 600 000 VND (34–55 EUR) za auto. Metoda: stawka za kilometr z dwóch cen razy ok. 100 km (PL-MT). Taksówka Thọ Xuân – Ninh Bình kosztuje 1 200 000–1 600 000 VND za 105–120 km (THD-SPL), czyli 10 000–15 000 VND/km. Auto Ninh Bình – Pù Luông kosztuje 80 USD za ok. 130–142 km (PL-HET2, odległość z PR), czyli ok. 14 600–15 900 VND/km.
  - **Taksówka spod terminalu:** taksówki stoją przy lotnisku (THD-SPL), ale kursu do Pù Luông nikt nie wycenia.
  - Bezpośredniego autobusu z lotniska nie znalazłem.
- **Najprościej:** auto zamówione przez gospodarzy w Pù Luông.
- **Nie ustaliłem:** ceny przejazdu z tego lotniska u żadnego przewoźnika.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Thanh Hóa (Thọ Xuân)”): trochę mylący. Na 2,5–3 h w góry auto trzeba zamówić.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej, najlepiej przez gospodarzy w Pù Luông”.

## HAN – babe: Nội Bài – Pác Ngòi nad jeziorem Ba Bể

5 h, 0,2% tras.

- **Godziny:** w danych 5 h, to szacunek (PR). Samochód z Hà Nội jedzie 5–5,5 h (BB-LV). Zgodne, a lotnisko leży bliżej, przy drodze na Thái Nguyên (PR).
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej**, od hotelu do noclegu nad jeziorem: sedan dla 2–3 osób ok. 90–120 USD (80–107 EUR), SUV albo bus dla 4–7 osób 110–150 USD (98–134 EUR) (BB-LV). Ceny z Nội Bài nie podaje żadne źródło. Lotnisko leży przy drodze na Thái Nguyên (PR), więc to szacunek: ta sama cena.
  - **Przez centrum:** minibus wahadłowy spod Opery w Hà Nội o 12:30, ok. 5 h, 463 750 VND (16 EUR) na osobę, do Ba Be Lake View Homestay (BB-LV).
  - **Autobus z dworca Mỹ Đình do Chợ Rã:** 7–8 h z przesiadką, potem ok. 20 km mototaksówką albo z odbiorem od gospodarzy (BB-LV).
- **Najprościej:** samochód z kierowcą zamówiony wcześniej.
- **Nie ustaliłem:** ceny w VND u lokalnych firm.
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hà Nội”): mylący, bo to 5 h jazdy.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej”.

## HAN – puluong: Nội Bài – Pù Luông

5,25 h, dziś na żadnej trasie: silnik wybiera drogę przez Hà Nội (ETAPY).

- **Godziny:** w danych 5,25 h (PR). Z Nội Bài 5–5,5 h, ok. 175 km (PL-VTS). Zgodne.
- **Sposoby:**
  - **Samochód z kierowcą zamówiony wcześniej**, z odbiorem na Nội Bài. Taki odbiór da się zamówić (PL-PLE), ale bez podanej ceny. Cena: szacunek 100–135 USD (89–120 EUR) za auto od 4 do 16 miejsc, według tabeli Hanoi Eco Tour na stronie o przejeździe Hà Nội – Pù Luông (PL-HET1). Wiersz tej tabeli ma podpis „Ninh Binh to Halong Bay”, więc cena jest niepewna.
  - **Przez centrum Hà Nội:** minibusy typu limousine odjeżdżają tylko rano, ok. 7:00 spod Opery, za 300 000–499 000 VND (10–17 EUR) (PL-HET1, PL-PLE, PL-PLX), 4–4,5 h (PL-LV). Po locie zwykle trzeba więc przenocować w Hà Nội. Taksówka z Nội Bài do centrum kosztuje ok. 400 000 VND za auto (PL-VTS).
- **Najprościej:** samochód z kierowcą zamówiony wcześniej albo nocleg w Hà Nội i poranny minibus.
- **Rezerwacja:** minibus 3–5 dni wcześniej (PL-PLX).
- **Dzisiejszy tekst** („Taksówka albo transfer z lotniska Hà Nội”): mylący, bo to ponad 5 h jazdy.
- **Tekst karty:** „Samochód z kierowcą zamówiony wcześniej”.

## Drogi krótkie

Wszędzie poniżej działa przynajmniej jedna oficjalna taksówka albo aplikacja (Grab, Be, Xanh SM). Dzisiejszy tekst („Taksówka albo transfer z lotniska {x}”) jest tu poprawny. Propozycje tylko go doprecyzowują.

- **DAD – hoian** (0,75 h, 28–30 km; DAD-LV, DAD-NV):
  - Grab: 12–20 USD za auto (11–18 EUR), 40–60 min (DAD-NV). Strona podaje też „3–10 USD”, co przeczy tej liczbie.
  - Taksówki: Mai Linh, Vinasun i stanowiska ze stałą ceną (DAD-LV); auto zamówione wcześniej od 12 USD (11 EUR) (DAD-NV).
  - Wspólne minibusy z lotniska: 4,30–7 USD (4–6 EUR) na osobę, np. Hoi An Express co godzinę od 5:00 do 21:00 (DAD-NV).
  - Autobus publiczny nr 1 z przesiadką, 75–90 min (DAD-NV).
  - Tekst karty: „Taksówka, Grab albo wspólny minibus”.
- **SGN – saigon** (0,5 h, ok. 6 km; MK-VNA):
  - Grab, Be, Xanh SM: 130 000–170 000 VND (4–6 EUR).
  - Taksówka z postoju: 150 000–200 000 VND plus 10 000 VND opłaty (5–7 EUR).
  - Autobusy 109 i 152: 10 000–20 000 VND (poniżej 1 EUR), od 5:30 do 23:00, co 15–20 min.
  - Tekst karty: „Taksówka, Grab albo autobus lotniskowy 109”.
- **HAN – hanoi** (0,75 h, 27–30 km; HAN-NV):
  - Grab, Be, Xanh SM: 250 000–350 000 VND (9–12 EUR), 30–45 min.
  - Taksówka: 300 000–400 000 VND (10–14 EUR).
  - Autobus 86: 45 000 VND (2 EUR), ok. 5:15–22:10, co 20–50 min, 50–60 min. Minibus Vietnam Airlines: 40 000 VND (1 EUR), co 30 min od 5:00 do 22:00.
  - Tekst karty: „Taksówka, Grab albo autobus lotniskowy 86”.
- **DLI – dalat** (0,75 h, ok. 28 km; DLI-EXP, stan z 21.10.2023):
  - Taksówki Mai Linh, Thắng Lợi, Dalat Taxi: 250 000–300 000 VND (9–10 EUR).
  - Auto zamówione wcześniej: 9 USD (8 EUR).
  - Autobus lotniskowy: 40 000 VND (1 EUR), od 6:00 do 18:00.
  - Grab w tym źródle się nie pojawia. Lotnisko było zamknięte 4.03–19.08.2026 (PR); czy autobus lotniskowy wrócił, nie sprawdziłem.
  - Tekst karty: „Taksówka albo samochód z kierowcą”.
- **HUI – hue** (0,5 h, ok. 15 km; HUI-GMHA):
  - Taksówki z licznikiem przy terminalu; ceny strona nie podaje.
  - Auto dla 4 osób zamówione wcześniej: 250 000–350 000 VND (9–12 EUR), kierowca czeka z kartką.
  - Autobus lotniskowy: 50 000 VND (2 EUR) na osobę, rusza, gdy się zapełni.
  - Grab: źródło go nie wymienia.
  - Tekst karty: „Taksówka, samochód z kierowcą albo autobus lotniskowy”.
- **PQC – phuquoc** (1 h, ok. 40–45 km na północ wyspy; PR, PQC-VPQ):
  - Taksówki, Grab (odbiór poza strefą przed terminalem), Xanh SM z pakietem lotniskowym w aplikacji, mototaksówki. VinBus jeździ do Dương Đông, Ông Lang i Grand World; od 2026 roku jest płatny, ale taryfy nie opublikowano (PQC-PQIG).
  - Cennika kursów nikt nie publikuje (PQC-PQIG). Szacunek: 400 000–675 000 VND (14–23 EUR) za auto. Metoda: 40–45 km po 10 000–15 000 VND/km. Stawki z innych dróg w tym pliku: Grab Nội Bài – Stare Miasto ok. 8 300–13 000 VND/km (HAN-NV), Grab Đà Nẵng – Hội An ok. 10 400–17 300 VND/km (DAD-NV), taksówki w Cần Thơ 12 000–15 000 VND/km (MK-VNB).
  - Resorty Vinpearl na Bãi Dài wożą gości za darmo do swoich parków (PQC-GD); o odbiorze z lotniska ta strona nie pisze.
  - Tekst karty: „Taksówka, Grab albo Xanh SM”.
- **VCA – mekong** (0,75 h, ok. 25 km do Phong Điền; PR):
  - Autobusu lotniskowego nie ma (MK-LVVCA, MK-VNB).
  - Grab do centrum Cần Thơ (8 km): 70 000–100 000 VND. Taksówka do centrum: 150 000–200 000 VND (Mai Linh, Khánh Cường, Vinasun) (MK-LVVCA). Stawka taksówek: 12 000–15 000 VND/km (MK-VNB).
  - Do Phong Điền szacunek 220 000–375 000 VND (8–13 EUR) za auto. Metoda: 25 km po 8 750–12 500 VND/km (Grab, z ceny do centrum) do 12 000–15 000 VND/km (taksówka).
  - Hotele i gospodarze odbierają z lotniska na życzenie (MK-LVVCA).
  - Tekst karty: „Taksówka albo samochód od gospodarzy”.

## Promy w danych strony (uzupełnienie 12.10.2026)

Godziny do `FERRY` w `site2/src/content.js`. Karta przejazdu mówi z nich, do której wylądować i kiedy najwcześniej da się być na lotnisku. To rachuba z danych tego pliku, bez nowych źródeł:

| miejsce | lotnisko | ostatnia przeprawa | najpóźniejsze lądowanie | pierwsza przeprawa | najwcześniej na lotnisku | rachuba |
|---|---|---|---|---|---|---|
| catba | HAN | 18:00 | 13:30 | 5:00 | 9:00 | Lądowanie z sekcji „HAN – catba”. W drugą stronę: prom z Cái Viềng ok. 5:00 (CB-MIA, CB-VW), przeprawa 15–35 min, czyli Đồng Bài ok. 5:20–5:35, potem 2 h 5 min–3 h 20 min do Nội Bài (CB-GAHAN): ok. 7:25–8:55, zaokrąglone do 9:00. |
| catba | HPH | 18:00 | 16:00 | 5:00 | 6:30 | Lądowanie z sekcji „HPH – catba”. W drugą stronę: Đồng Bài ok. 5:20–5:35, potem 20–40 min do Cát Bi (CB-VT, CB-NVHP): ok. 5:40–6:15, zaokrąglone do 6:30. |
| cattien | SGN | 18:00 | 13:30 | 6:00 | 10:00 | Z sekcji „SGN – cattien”: ostatnia przeprawa o 18:00–19:30 zależnie od źródła, więc liczę od 18:00; pierwsza o 6:00–6:30 i 3–3,5 h jazdy, czyli lotnisko najwcześniej ok. 10:00. |

Strona podaje ostatnią przeprawę jako „ok. 18:00”, bo zimą przystań Đồng Bài kończy pracę o 18:00 (CB-MIA), a łódź w Cát Tiên według jednego źródła pływa tylko do ok. 18:00 (CT-VT).

## Zestawienie

Jeden wiersz na drogę: najprostszy sposób, a po średniku drugi. Cena dotyczy najprostszego sposobu.

| droga | godziny | sposób | cena | za co (auto/osoba) | gdzie kupić | tekst karty |
|---|---|---|---|---|---|---|
| HAN – ninhbinh | 2,25 | samochód z kierowcą zamówiony wcześniej; minibus typu limousine z lotniska (15–22 EUR/os.) | 30–62 | auto dla 2–3 osób | 12Go, hotel w Tam Cốc | Samochód z kierowcą albo minibus typu limousine, oba do zamówienia wcześniej |
| DAD – hue | 2,5 | samochód z kierowcą tunelem Hải Vân; taksówka do miasta i autobus albo pociąg do Huế | 29–48 | auto | hotel w Huế, firma transferowa, 12Go | Samochód z kierowcą zamówiony wcześniej, tunelem pod przełęczą Hải Vân |
| HPH – catba | 1,75 | samochód z kierowcą z biletem na prom; autobus z lotniska (10 EUR/os.) | 42–80 | auto do 4–6 osób | hotel na Cát Bà, firma transferowa, 12Go | Samochód z kierowcą zamówiony wcześniej i krótki prom Đồng Bài – Cái Viềng |
| SGN – mekong | 3,5 | samochód z kierowcą prosto do Phong Điền; taksówka na dworzec Miền Tây, autobus do Cần Thơ i taksówka | 44–86 | auto (do Cần Thơ) | gospodarze w Phong Điền, hotel, 12Go | Samochód z kierowcą zamówiony wcześniej albo, dłużej, autobus przez dworzec Miền Tây i Cần Thơ |
| HAN – catba | 4 | samochód z kierowcą z biletem na prom; autobus 86 do centrum i autobus z promem (8–12 EUR/os.) | 52–96 | auto | hotel na Cát Bà, firma transferowa, 12Go | Samochód z kierowcą zamówiony wcześniej i krótki prom Đồng Bài – Cái Viềng |
| SGN – cattien | 3,75 | samochód z kierowcą do przystani, potem łódź (2 EUR/os. z wstępem); autobus Bé z Ngã Tư Ga albo FUTA do Tân Phú i taksówka | 52–103 | auto | nocleg w parku, hotel, wypożyczalnia aut w HCMC | Samochód z kierowcą zamówiony wcześniej, a przy parku prom przez rzekę Đồng Nai, który pływa tylko za dnia |
| HAN – caobang | 6,25 | samochód z kierowcą; minibus typu limousine z centrum Hà Nội (14–21 EUR/os.) | 86–255 | auto | hotel, Klook, 12Go | Samochód z kierowcą zamówiony wcześniej |
| THD – ninhbinh | 2 | taksówka spod terminalu albo auto zamówione; taksówka do Thanh Hóa i autobus albo pociąg | 41–55 | auto | postój taksówek, aplikacja G5 Car | Taksówka albo samochód z kierowcą zamówiony wcześniej |
| THD – puluong | 2,5 | samochód z kierowcą przez gospodarzy; auto wynajęte na lotnisku | 34–55 (szacunek) | auto | gospodarze w Pù Luông | Samochód z kierowcą zamówiony wcześniej, najlepiej przez gospodarzy w Pù Luông |
| HAN – babe | 5 | samochód z kierowcą; minibus spod Opery w Hà Nội o 12:30 (16 EUR/os.) | 80–107 | auto dla 2–3 osób | hotel, firma transferowa | Samochód z kierowcą zamówiony wcześniej |
| HAN – puluong | 5,25 | samochód z kierowcą; nocleg w Hà Nội i poranny minibus (10–17 EUR/os.) | 89–120 (szacunek) | auto | gospodarze albo biuro w Pù Luông | Samochód z kierowcą zamówiony wcześniej |
| DAD – hoian | 0,75 | Grab albo taksówka; wspólny minibus (4–6 EUR/os.) | 11–18 | auto | aplikacja, postój taksówek | Taksówka, Grab albo wspólny minibus |
| SGN – saigon | 0,5 | Grab, Be albo Xanh SM; autobus 109 (poniżej 1 EUR/os.) | 4–6 | auto | aplikacja | Taksówka, Grab albo autobus lotniskowy 109 |
| HAN – hanoi | 0,75 | Grab, Be albo Xanh SM; autobus 86 (2 EUR/os.) | 9–12 | auto | aplikacja | Taksówka, Grab albo autobus lotniskowy 86 |
| DLI – dalat | 0,75 | taksówka; autobus lotniskowy (stan z 2023) | 9–10 | auto | postój taksówek | Taksówka albo samochód z kierowcą |
| HUI – hue | 0,5 | auto zamówione albo taksówka; autobus lotniskowy (2 EUR/os.) | 9–12 | auto | hotel, firma transferowa, postój taksówek | Taksówka, samochód z kierowcą albo autobus lotniskowy |
| PQC – phuquoc | 1 | taksówka, Grab albo Xanh SM; VinBus do Grand World | 14–23 (szacunek) | auto | aplikacja, postój taksówek | Taksówka, Grab albo Xanh SM |
| VCA – mekong | 0,75 | taksówka albo Grab; odbiór przez gospodarzy | 8–13 (szacunek) | auto | postój taksówek, aplikacja, gospodarze | Taksówka albo samochód od gospodarzy |

## Źródła

Adresy sprawdzone 11.10.2026: 57 z 58 zwraca kod 200. Rome2Rio (MK-R2R) zwraca 403 dla curl, ale otworzył się w narzędziu do czytania stron. Strona CB-MOC† zwraca 200, ale narzędzie do czytania stron jej nie otworzyło (błąd certyfikatu), więc jej treść znam tylko z wyników wyszukiwania. Stronę NBP (KURS) sprawdziłem tylko kodem odpowiedzi. Data w ostatniej kolumnie to data publikacji albo aktualizacji strony; „brak” znaczy, że strona jej nie podaje.

### Wspólne

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| KURS | Kursy NBP podane w zleceniu: tabela A 197/A/NBP/2026 (EUR, USD) i tabela B 040/B/NBP/2026 (VND); tabel nie otwierałem. | https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/ | urzędowe | 9.10.2026 i 7.10.2026 |
| PR | Godziny dróg, punkty i odległości (Phong Điền 17 km od Cần Thơ, lotnisko Cần Thơ – Phong Điền ok. 25 km, Phú Quốc – Gành Dầu 40–45 km, zamknięcie lotniska Liên Khương). | `research/polaczenia-2026-10.md` | własne badanie | 9.10.2026 |
| SEZ | Dziennik zakazów żeglugi w Hải Phòng, w tym postoje promu Đồng Bài – Cái Viềng 24.08.2025 i 22.08.2026. | `research/sezony-2026-10.md` | własne badanie | 9.10.2026 |
| TD | Cennik parku Cát Tiên: bilet 60 000 VND z promem, dopłata 20% w dni świąteczne. | `research/trudne-dni-2026-10.md` | własne badanie | 10.10.2026 |
| ETAPY | Droga Nội Bài – Pù Luông omijana przez silnik (trasa przez Hà Nội). | `notes/etapy.md` | własne | 11.10.2026 |

### Cát Bà

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CB-MIA | MIA.vn, „Bến phà Gót – Phà Đồng Bài”: stara przystań Gót zamknięta 1.03.2024, nowa 4 km dalej; godziny lato i zima; 30–35 min; ceny pieszo, motocykl, auta. | https://mia.vn/cam-nang-du-lich/ben-pha-got-pha-dong-bai-20115 | przewodnik (sklep) | 9.03.2026 |
| CB-VW | VinWonders, „Phà Cát Bà Hải Phòng”: prom Đồng Bài – Cái Viềng (5:30–18:30 i 5:00–18:00, co 30–60 min, 25–33 min, ceny) i prom Tuần Châu – Cát Bà. | https://vinwonders.com/vi/wonderpedia/news/pha-cat-ba-hai-phong/ | przewodnik (Vingroup) | 18.07.2025 |
| CB-SPL1 | Sun Paradise Land: tabela kursów promu co 30 min do 19:30, mniej kursów w XI–III, ceny; łodzie z przystani Bính (7:00, 9:00, 13:00, 15:00; 200 000–250 000 VND). | https://sunparadiseland.com/SunParadiseLandCatBa/tin-tuc/vi-vu-cat-ba-voi-lich-pha-chay-2025-meo-tranh-tac-pha-6792 | przewodnik (deweloper) | 24.07.2025 |
| CB-SPL2 | Sun Paradise Land: kolejka linowa Cát Hải – Phù Long, 150 000 VND, 9:00–11:00 i 13:00–17:00, nieczynna we wtorki, 3 955 m. | https://sunparadiseland.com/SunParadiseLandCatBa/tin-tuc/ga-cap-treo-cat-hai-hanh-trinh-kham-pha-dao-cat-ba-nhanh-chong-16929 | przewodnik (deweloper) | 15.02.2026 |
| CB-SPL3 | Sun Paradise Land: kolejka 50 000 VND w jedną stronę, ok. 10 min; łodzie 200 000–300 000 VND; Phù Long – miasteczko 17 km. | https://sunparadiseland.com/SunParadiseLandCatBa/tin-tuc/cach-di-chuyen-tu-hai-phong-di-cat-ba-nhanh-thuan-tien-2026-27880 | przewodnik (deweloper) | 11.09.2026 |
| CB-VNE | VnExpress, „Phà ra Cát Bà ùn tắc từ rạng sáng đến chiều”: latem 2026 z 23 do 38 kursów dziennie, zakaz aut 25.04–3.05 i w weekendy 9.05–30.09 w godz. 9:00–13:00, kolejka 1,5 km. | https://vnexpress.net/pha-ra-cat-ba-un-tac-tu-3h-5068645.html | prasa | 30.04.2026 |
| CB-LSVN1 | LSVN: zakaz aut na promie w stronę Cát Bà 26.04–4.05 i w weekendy 10.05–30.07.2025, 9:00–13:00; zamienniki (prom Tuần Châu – Gia Luận, kolejka). | https://lsvn.vn/hai-phong-han-che-xe-o-to-sang-dao-cat-ba-dip-nghi-le-cuoi-tuan-a156849.html | prasa | 24.04.2025 |
| CB-LSVN2 | LSVN: decyzja 20/2026/QĐ-UBND o zniżkach na promie dla mieszkańców Cát Hải od 1.04.2026, bez cennika. | https://lsvn.vn/hai-phong-mien-giam-gia-ve-qua-pha-sang-dao-cat-ba-va-nguoc-lai-a170511.html | prasa | 23.03.2026 |
| CB-MOC† | Ministerstwo Budownictwa: przewoźnik na promie (konsorcjum Công ty CP Đảm bảo giao thông đường thủy Hải Phòng i Công ty TNHH Bayview Cát Bà), 7 promów (wyniki wyszukiwania). | https://moc.gov.vn/vn/tin-tuc/1184/93210/hai-phong-yeu-cau-trien-khai-dong-bo-cac-giai-phap-bao-dam-an-toan-tuyen-pha-dong-bai---cai-vieng.aspx | urzędowe | IV 2026 (wg wyników wyszukiwania) |
| CB-VT | Vietnamtourism.com, przewodnik po dojazdach na Cát Bà 2026: Grab z Nội Bài ok. 2 000 000 VND, auto z Hà Nội 1 500 000–2 500 000 VND z promem, taksówka z Cát Bi, łodzie z przystani Bính, autobusy z promem. | https://www.vietnamtourism.com/en/how-to-get-to-cat-ba-island-vietnam-the-complete-2026-transport-guide | przewodnik (komercyjny) | 1.07.2026 |
| CB-VTGRAB | Vietnamtourism.com, „Grab có hoạt động ở đảo Cát Bà không”: Grab na wyspie z przerwami, nie przez prom; taksówka Hải Phòng – Cát Bà 620 000 VND; autobus z lotniska Cát Bi 300 000 VND, ok. 2 h. | https://www.vietnamtourism.com/vi/grab-co-hoat-ong-o-ao-cat-ba-khong-huong-dan-toan-dien-ve-di | przewodnik (komercyjny) | 30.05.2026 |
| CB-LVCATBI | LocalVietnam, lotnisko Cát Bi: na Cát Bà 1,5–2 h, transfer z biletem na prom i przesiadką, do przystani Đồng Bài ok. 25 km, po wyspie ok. 22 km. | https://localvietnam.com/hai-phong/cat-bi-airport/ | przewodnik (biuro podróży) | 18.06.2026 |
| CB-NVHP | North-Vietnam.com, Hải Phòng – Cát Bà: autobus z promem spod przystani Bính, katamaran, ceny aut z lotniska Cát Bi u 4 firm (47–130 USD). | https://north-vietnam.com/?p=18387 | przewodnik z ofertami 12Go | VIII 2026 |
| CB-NVHAN | North-Vietnam.com, Hà Nội – Cát Bà: auta z promem 69–253 USD, odbiór z Nội Bài, minibusy z promem 11–17 USD. | https://north-vietnam.com/how-to-get-from-hanoi-to-cat-ba-island/ | przewodnik z ofertami 12Go | VIII 2026 |
| CB-GAHAN | GoAsia, Hà Nội – Cát Bà: transfer z Nội Bài do przystani 61–339 USD, 2 h 5 min–3 h 20 min. | https://goasia.cc/en/vietnam/hanoi-to-cat-ba | agregator (12Go) | 8.03.2026 |
| CB-GAHP | GoAsia, Hải Phòng – Cát Bà: minibus z promem 19 USD, auta 47–131 USD. | https://goasia.cc/en/vietnam/hai-phong-to-cat-ba | agregator (12Go) | 8.03.2026 |
| CB-GECKO | Geckoroutes, Hà Nội – Cát Bà: autobus Good Morning Cat Ba z Nội Bài (22 USD, 6:30, 9:30, 13:00, 4 h 30 min), SUV 2 800 000 VND, minibusy 16–17 USD. | https://www.geckoroutes.com/vietnam/hanoi-to-catba/ | agregator | brak (© 2026) |
| CB-GMCB | Good Morning Cat Ba: Hà Nội – Cát Bà od 11 USD, 3–3,5 h; artykuł o dojeździe z lotniska bez ceny. | https://goodmorningcatba.com/ | przewoźnik | wpis z 6.09.2026 |
| CB-CBE | Cat Ba Express: Hà Nội – Cát Bà od 13 USD (6:00, 7:45, 10:45, 14:00), z powrotem 9:30, 12:30, 15:30, 17:00. | https://catbaexpress.com/ | przewoźnik | brak (artykuł z 27.11.2025) |
| CB-LVHAN | LocalVietnam, Cát Bà – Hà Nội: autobus z promem od ok. 265 000 VND, 3,5–4,5 h, spóźnienia 1–2 h, rezerwacja 1–2 dni wcześniej latem i w weekendy. | https://localvietnam.com/hanoi/from-cat-ba-to-hanoi/ | przewodnik (biuro podróży) | 3.07.2026 |
| CB-OCEAN | Cat Ba Ocean Cruises: Nội Bài ok. 180 km i 4 h, Cát Bi ok. 30 km do Đồng Bài, prom ok. 20 min, 25 km po wyspie. | https://catbaoceancruises.com/?p=1093 | biuro podróży | brak |

### Cát Tiên

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CT-WV | Wikivoyage, Cat Tien National Park: FUTA, autobus Bé (150 000 VND, 1.2026), Tân Phú – przystań 25 km, prom 6:30–19:00 za 60 000 VND (4.2026), zakaz przepraw nocą, Grab ok. 1 200 000 VND (12.2024). | https://en.wikivoyage.org/wiki/Cat_Tien_National_Park | przewodnik (wiki) | brak (ceny datowane 2.2016–4.2026) |
| CT-POTOO | Potoo, przewodnik po Cát Tiên 2026: FUTA 200 000 VND i minibus z Phương Lâm, autobus Bé, auto 1 800 000–3 000 000 VND, prom 6:30–19:30 za 60 000 VND, most w budowie. | https://potoo.is/cat-tien-national-park-2026-visitor-guide-in-english/ | blog | 1.05.2026 |
| CT-VT | Vietnamtourism.com, Cát Tiên: auto 1 500 000–2 000 000 VND, ok. 3 h; FUTA 150 000–200 000 VND; prom do ok. 18:00 za 60 000 VND; przeprawa ok. 4:45; most w budowie. | https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit | przewodnik (komercyjny) | 18.09.2026 |
| CT-WWW | Park Narodowy Cát Tiên, „Hướng dẫn đường đi”: 150 km z HCMC, Phương Trang do Tân Phú, biuro w Phương Lâm ok. 25 km od parku i dowóz, lokalne autobusy do bramy 120 000–150 000 VND, Xanh SM. | https://cattiennationalpark.com.vn/huong-dan-duong-di/ | urzędowe (park) | brak (zdjęcia z VII–VIII 2025) |
| CT-JB | Jungle Boss Tours, przewodnik po Cát Tiên 2026: skrzyżowanie na 125. km, 24 km do bramy, 3–4 h, autobusy 100 000–150 000 VND, bilet z promem, lotnisko Long Thành pod koniec 2026. | https://junglebosstours.com/vi/kham-pha/blog-du-lich/vuon-quoc-gia-cat-tien | biuro podróży | brak (© 2026, odnośniki z 25.05.2026) |

### Delta Mekongu

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| MK-LV | LocalVietnam, HCMC – Cần Thơ: minibusy 260 000–300 000 VND, ok. 3 h; auto 1 700 000–2 500 000 VND za auto. | https://localvietnam.com/?p=134883 | przewodnik (biuro podróży) | 7.07.2026 |
| MK-GA | GoAsia, HCMC – Cần Thơ: autobusy 9,18–17,64 USD z dworca Miền Tây przez całą dobę, 3–4,5 h; auta 49–265 USD, odbiór w hali przylotów. | https://goasia.cc/en/vietnam/ho-chi-minh-to-can-tho | agregator (12Go) | 3.10.2026 |
| MK-WV | Wikivoyage, Can Tho: autobusy co 1–2 h przez całą dobę z Miền Tây, FUTA z darmowym dowozem w Cần Thơ, ceny z 2014–2019. | https://en.wikivoyage.org/wiki/Can_Tho | przewodnik (wiki) | brak (ceny z 12.2019 i starsze) |
| MK-R2R | Rome2Rio: lotnisko Tân Sơn Nhất – dworzec Miền Tây 13,7 km, autobusy 49 i 14. | https://www.rome2rio.com/s/Tan-Son-Nhat-International-Airport-SGN/Mien-Tay-Bus-Station | agregator | brak |
| MK-VNA | Vietnam Airlines, z lotniska Tân Sơn Nhất do centrum: autobusy 109 i 152, taksówka, Grab, Be, Xanh SM, odbiór hotelowy. | https://www.vietnamairlines.com/en/useful-information/travel-guide/airport-ho-chi-minh-to-city | przewoźnik (linia lotnicza) | brak |
| MK-LVVCA | LocalVietnam, lotnisko Cần Thơ: bez autobusu, Grab 70 000–100 000 VND, taksówka 150 000–200 000 VND do centrum, odbiór hotelowy. | https://localvietnam.com/mekong-delta/can-tho/can-tho-airport/ | przewodnik (biuro podróży) | 15.06.2026 |
| MK-VNB | Vietnambooking, lotnisko Cần Thơ: 8 km do centrum, taksówki 12 000–15 000 VND/km, bez autobusu lotniskowego, autobus Cần Thơ – Phong Điền 7 000–15 000 VND. | https://www.vietnambooking.com/ve-may-bay/faqs/san-bay-can-tho-cach-trung-tam-bao-xa.html | biuro podróży | 28.08.2026 |

### Północ i Huế

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| NB-GA | GoAsia, Hà Nội – Ninh Bình: auta z Nội Bài 37,41–137,50 USD, minibusy z Nội Bài 14,57–24,20 USD, odjazdy i czasy. | https://goasia.cc/en/vietnam/hanoi-to-ninh-binh | agregator (12Go) | 8.03.2026 |
| NB-NV | North-Vietnam.com, Hà Nội – Tam Cốc: ceny „od” u 17 firm (34–130 USD za auto), minibusy z Hà Nội od 8 USD, pociąg. | https://north-vietnam.com/how-to-get-from-hanoi-to-tam-coc/ | przewodnik z ofertami 12Go | VIII 2026 |
| HUE-LV | LocalVietnam, Huế – Đà Nẵng: auto tunelem 1 200 000–1 400 000 VND, 2–2,5 h; przełęcz 60–110 USD; autobusy 80 000–250 000 VND. | https://localvietnam.com/da-nang/from-hue-to-da-nang/ | przewodnik (biuro podróży) | 4.07.2026 |
| HUE-GA | GoAsia, Đà Nẵng – Huế: pociąg 6,70–26,06 USD, autobus 9,77–12,22 USD, auta 31,33–290,03 USD. | https://goasia.cc/en/vietnam/da-nang-to-hue | agregator (12Go) | 8.03.2026 |
| CAO-VT | Vietnamtourism.com, dojazd do Cao Bằng: auto 2 500 000–4 000 000 VND, 5–6 h; minibus 400 000–600 000 VND; autobus nocny 250 000–400 000 VND; rezerwacja w X–IV. | https://www.vietnamtourism.com/en/how-to-get-to-cao-bang | przewodnik (komercyjny) | 31.05.2026 |
| CAO-GA | GoAsia, Hà Nội – Cao Bằng: z Nội Bài autobusy 26,89–35,68 USD (6:45, 7:00, ok. 22:00) i auta 263,54–366,66 USD; z Hà Nội auta 167,30–286,45 USD. | https://goasia.cc/en/vietnam/hanoi-to-cao-bang | agregator (12Go) | 8.03.2026 |
| CAO-NV | North-Vietnam.com, Hà Nội – Cao Bằng: auta z Nội Bài 253–352 USD, z Hà Nội 160–275 USD; autobusy 16–23 USD z rozkładem. | https://north-vietnam.com/hanoi-to-cao-bang-ban-gioc-waterfall-bus-car/ | przewodnik z ofertami 12Go | VIII 2026 |
| BB-LV | LocalVietnam, Hà Nội – Ba Bể: minibus o 12:30 za 463 750 VND, autobus do Chợ Rã, auto 90–150 USD. | https://localvietnam.com/bac-kan/ba-be/from-hanoi-to-ba-be-lake/ | przewodnik (biuro podróży) | 15.06.2026 |
| PL-LV | LocalVietnam, Hà Nội – Pù Luông: minibusy 250 000–450 000 VND, 4–4,5 h, odbiór na Starym Mieście. | https://localvietnam.com/thanh-hoa/pu-luong/from-hanoi-to-pu-luong/ | przewodnik (biuro podróży) | 2.07.2026 |
| PL-VTS | Vietnam Trail Series, dojazd do Pù Luông: z Nội Bài 5–5,5 h i ok. 175 km, taksówka do centrum ok. 400 000 VND, Thọ Xuân ok. 100 km. | https://vietnamtrailseries.com/jungle-marathon/how-to-get-to-pu-luong/ | organizator biegu | brak |
| PL-PLX | Pu Luong Express Bus: Hà Nội – Pù Luông 420 000–450 000 VND, o 7:00 spod Opery, rezerwacja 3–5 dni wcześniej. | https://puluongexpressbus.com/en/ | przewoźnik | brak |
| PL-PLE | Pu Luong Excursions, minibus do Pù Luông: 389 000–499 000 VND, o 7:00; odbiór z Nội Bài na zamówienie; z lotniska Thanh Hóa ok. 3 h taksówką. | https://puluongexcursions.com/shuttle-bus-to-pu-luong/ | biuro podróży | brak (zdjęcie z 3.2026) |
| PL-HET1 | Hanoi Eco Tour, Hà Nội – Pù Luông: minibusy 300 000–400 000 VND; tabela aut 100, 115, 135 USD z podpisem „Ninh Binh to Halong Bay”. | https://hanoiecotour.com/hanoi-to-pu-luong/ | biuro podróży | brak |
| PL-HET2 | Hanoi Eco Tour, Ninh Bình – Pù Luông: auto 80, 90, 120 USD, ok. 3 h. | https://hanoiecotour.com/ninh-binh-to-pu-luong-transfer/ | biuro podróży | brak |
| PL-MT | MyTour, Pù Luông: z lotniska Thọ Xuân ok. 100 km, 2–3 h drogą krajową 15, wynajem auta na lotnisku. | https://mytour.vn/vi/blog/bai-viet/bi-quyet-du-lich-pu-luong-thanh-hoa-cap-nhat-nhat.html | biuro podróży (portal) | 15.09.2026 |
| THD-SPL | Sun Paradise Land, z lotniska Thanh Hóa do Ninh Bình: taksówka 1 200 000–1 600 000 VND, 1 h 40 min–2 h, firmy na lotnisku, autobusy i pociąg z Thanh Hóa. | https://sunparadiseland.com/en/SunParadiseLandHaNam/tin-tuc/huong-dan-tu-san-bay-thanh-hoa-di-ninh-binh-day-du-nhat-19067 | przewodnik (deweloper) | 14.05.2026 |

### Drogi krótkie

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| HAN-NV | North-Vietnam.com, Nội Bài – Stare Miasto: autobus 86, minibus Vietnam Airlines, taksówka, Grab, Be, Xanh SM. | https://north-vietnam.com/?p=188534 | przewodnik | VIII 2026 |
| DAD-LV | LocalVietnam, lotnisko Đà Nẵng: taksówki do miasta 80 000–150 000 VND, Hội An 28 km, ok. 45–50 min. | https://localvietnam.com/da-nang/da-nang-airport/ | przewodnik (biuro podróży) | 22.05.2025 |
| DAD-NV | North-Vietnam.com, lotnisko Đà Nẵng – Hội An: Grab 12–20 USD, auta od 12 USD, wspólne minibusy 4,30–7 USD, autobus nr 1. | https://north-vietnam.com/?p=148488 | przewodnik z ofertami 12Go | VIII 2026 |
| HUI-GMHA | Good Morning Hoi An, lotnisko Phú Bài: autobus 50 000 VND, auto 250 000–350 000 VND, taksówki z licznikiem. | https://goodmorning-hoian.com/en/phu-bai-airport-hue/ | biuro podróży | 3.03.2026, aktualizacja 5.03.2026 |
| DLI-EXP | Expatolife, lotnisko Liên Khương – Đà Lạt: autobus 40 000 VND, taksówka 250 000–300 000 VND, auto 9 USD. | https://www.expatolife.com/lien-khuong-dalat-airport-to-city-center-vietnam | blog | 21.10.2023 |
| PQC-PQIG | Phu Quoc Island Guide, lotnisko Phú Quốc: brak cennika kursów, Grab, Xanh SM, VinBus płatny od 2026. | https://www.phuquocislandguide.com/phu-quoc-airport/ | przewodnik | VIII 2026 (sprawdzone przez autora 11.08.2026) |
| PQC-VPQ | Visit Phu Quoc, Gành Dầu: z lotniska ok. 40 km, ok. 1 h. | https://visitphuquoc.com.vn/en/ganh-dau-phu-quoc-super-hot-photo-spot-on-pearl-island-5847 | przewodnik | 8.11.2025 |
| PQC-GD | Phu Quoc Island Guide, Gành Dầu: 30 km od Dương Đông, darmowe busy resortów Vinpearl do ich parków. | https://phuquocislandguide.com/regions/ganh-dau/ | przewodnik | X 2026 |
