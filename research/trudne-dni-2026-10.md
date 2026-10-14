# Trudne dni dla poziomu „ekstremalnie”: 13 miejsc (sprawdzone 10.10.2026)

Dane do pola `hard` w dniach miejsc, czyli do trudnych dni na poziomie „ekstremalnie”: które z 13 miejsc ma dzień wyraźnie trudniejszy od zwykłego, co to za dzień, kto go prowadzi, kiedy go nie ma i ile kosztuje. Adresy otwarto 10.10.2026 (poza oznaczonymi †, zob. „Jak czytać”). Późniejsze ustalenia mają własną datę, a uzupełnienia z 13 i 14.10.2026 są na końcu pliku. Noc w Hà Nội w drodze (`hanoiStop`) jest poza zakresem.

- **Wynik:** trzy miejsca mają trudny dzień, dziesięć nie.
  - **cattien:** noc na stacji strażników nad Bàu Sấu, usługa samego parku (zastępuje dzień `p` 2).
  - **puluong:** szczyt Pù Luông w jeden dzień z lokalnym przewodnikiem, ok. 8–9 godzin (`p` 2).
  - **catba** (na razie bez trudnego dnia, decyzja z 10.10.2026): dzień wspinaczki skałkowej albo deep water soloing z operatorem (`p` 4). Najsłabiej udokumentowany z trzech: uprawnienia operatorów znam tylko z ich własnych stron.
  - **Reszta** dostaje dzień zwykły. Albo nic nie jest trudniejsze od zwykłego dnia (saigon, mekong, phuquoc, hanoi, ninhbinh), albo trudniejsze dni są wielodniowe (dalat, babe), albo nie ma udokumentowanego produktu z uprawnieniami (hoian, caobang). Huế ma tylko Bạch Mã, a to moduł partii B.
- **Najważniejsze znaleziska poza werdyktami:**
  - Kajaki na zatokach Cát Bà są zawieszone od 15.11.2024. Nie znalazłem urzędowej wiadomości o zniesieniu, a źródła komercyjne są sprzeczne; 14.10.2026 stan był ten sam (sekcja „Uzupełnienie 14.10.2026”). Zwykły dzień `p` 2 w Cát Bà (rejs) mówił w pierwowzorze o kajaku, a od 10.10.2026 płynie bambusową łodzią (sekcja „catba” i `research/plany-dni-2026-10.md`).
  - W 2026 wejście do lasu i organizowanie tam wycieczek bez zgody zarządcy jest karane, więc każdy „tak” opiera się na usłudze zarządcy albo na operatorze z uprawnieniami (sekcja „Ramy prawne 2026”).

## Jak czytać

- **Trudny dzień** (kryteria z 10.10.2026):
  - wyraźnie trudniejszy od zwykłego dnia miejsca: 6–10 godzin marszu, wspinaczka, noc w terenie ze strażnikiem albo dłuższa wyprawa łodzią;
  - mieści się w jednym dniu planu, z noclegiem w miejscu albo w terenie;
  - prowadzi go przewodnik albo operator z uprawnieniami (wizja, pkt 5).
- **Nie wpisuję** wypraw wielodniowych (Tà Năng–Phan Dũng, Hang Én, Tú Làn i inne), jazdy motocyklem na własną rękę ani Bạch Mã (moduł partii B). Co znalazłem przy okazji z wypraw wielodniowych, jest w sekcji „Poza zakresem”.
- **„Z uprawnieniami”** znaczy jedno z dwóch:
  - usługa zarządcy lasu, czyli parku albo rezerwatu (przewodnicy i trasy, które sam sprzedaje);
  - operator z licencją albo certyfikatem na ten rodzaj działalności, o numer którego trzeba zapytać przed rezerwacją. Gdzie znam tylko deklarację operatora, piszę to wprost.
- **Kurs do cen:** 1 EUR = 28 994 VND = 1,1206 USD (KURS, aktualizacja 10.10.2026 00:02 UTC). Kwoty w EUR zaokrąglam do pełnych euro, dolne i górne wartości podaję jako przedział.
- **Cena** to koszt samego dnia (opłaty, przewodnik, auto, posiłki), na osobę, przy dwóch osobach dzielących auto, przewodnika i pokój. Nie zawiera dojazdu do miejsca ani zwykłego noclegu w miejscu. W Cát Tiên obejmuje nocleg na stacji strażników, który zastępuje nocleg w siedzibie parku. Przy jednej osobie jest wyższa (podaję, o ile).
- **Miesiące wyłączone** to propozycja pola `off`. Rozróżniam trzy rodzaje, żeby było widać, co jest twardym zakazem:
  - **zakaz albo zamknięcie** ze źródłem urzędowym;
  - **brak oferty** w danym miesiącu u operatora;
  - **sezon**: miesiące, w których sezon miejsca (`research/sezony-2026-10.md`) to Z albo w których źródła operatora odradzają dzień z powodu pogody (błoto, pijawki, wezbrania). To moja reguła, nie zakaz.
- **Numer `p`:** priorytet dnia w planach miejsca z pierwowzoru (`site2/src/data.js`). Dla trzech miejsc z werdyktem „tak” są to:
  - cattien: `p` 1 „W głąb dżungli” (przyjazd, noc w siedzibie parku), `p` 2 „Gibony i Jezioro Krokodyli”;
  - puluong: `p` 1 „W głąb dolin” (przyjazd), `p` 2 „Grzbiety, wioski i wodospad” (całodniowy trekking), `p` 3 „Spokojny dzień w dolinie”;
  - catba: `p` 1 „Na wyspę”, `p` 2 „Noc na Zatoce Lan Hạ” (rejs), `p` 3 „Z powrotem na lądzie, spokojne popołudnie”, `p` 4 „Việt Hải i park narodowy” (wędrówka).
- **Wyszukiwanie:** WebSearch w trybie „extended”, po angielsku i wietnamsku, potem strony parków, urzędów, operatorów i prasy. **†** oznacza stronę, której treść widziałem tylko w wynikach wyszukiwania, bo nie otworzyła się dla narzędzia (403), więc nie czytałem jej w całości.

## Ramy prawne 2026

Dotyczą wszystkich trzech „tak” i wyjaśniają, dlaczego wymagam usługi zarządcy albo operatora z uprawnieniami.

- **Zgoda zarządcy lasu:**
  - 19.8.2026 zarząd obszaru turystycznego Núi Bà Đen (Tây Ninh) przypomniał, że organizowanie trekkingu, biwaków i usług turystycznych w lesie bez zgody zarządcy jest karane: 4–6 mln VND za organizowanie wycieczek, 6–10 mln VND za usługi i działalność, według dekretu 146/2026/NĐ-CP z 6.5.2026 (DT-0819);
  - ustalenie o Tà Năng z 17.5.2026 mówi to samo o wejściu do lasu: 4–6 mln VND (`research/ta-nang-2026-10.md`);
  - numer dekretu 146/2026/NĐ-CP znam tylko z artykułu DT-0819, a tekstu dekretu nie czytałem. Artykuł o Bát Xát (TT-0518) podaje przy tych samych kwotach kar (4–6 i 6–10 mln VND) inny przepis: art. 11 dekretu 168/2024/NĐ-CP z 26.12.2024 (odczyt z 13.10.2026 w `research/sapa-2026-10.md`, sekcja „Bezpieczeństwo i przepisy”). Który numer jest właściwy, nie ustaliłem.
- **Norma:** TCVN 14602:2026 (ISO 3021:2023) to pierwsza krajowa norma dla turystyki przygodowej i trekkingu: wymagania dla organizatorów (prowadzący, ocena ryzyka, ubezpieczenie). Opis w `research/ta-nang-2026-10.md` (VietnamPlus, 23.4.2026).
- **Zawieszenia z 2026 roku** pokazują, że urzędy egzekwują te zasady. Żadne nie dotyczy trzech miejsc z „tak”:
  - Tam Đảo: wspinaczka na trzy szczyty zawieszona od 5.5.2026 do odwołania (TT-0507);
  - Bát Xát (Lào Cai): zakaz trekkingu bez zezwolenia na sześciu szczytach, informacja z 18.5.2026 (TT-0518);
  - Sơn Trà (Đà Nẵng): po wypadku w Mũi Nghê w sierpniu 2026 zarząd odradził 10.9.2026 trekking i obserwację zwierząt bez zgody, bo rezerwat nie ma zatwierdzonego projektu ekoturystyki (TT-0910).

## saigon: Hồ Chí Minh City

**Werdykt: nie.** Plan miejsca to dzień bez planu, namorzyny Cần Giờ (ok. 2 h autem i promem, potem łódź) i Chợ Lớn. Nic w nim ani w okolicy nie daje dnia z 6–10 godzinami marszu, wspinaczką albo nocą w terenie.

- **Cần Giờ:** oferty operatorów to łódź po kanałach i krótkie spacery (ok. 25 minut do bazy Rừng Sác). Dłuższej wyprawy ani noclegu w rezerwacie nie znalazłem (SG-GYG†).
- **Najbliższa góra, Núi Bà Đen** w prowincji Tây Ninh: zarząd ostrzegł 19.8.2026, że trekking i płatne biwakowanie poza zatwierdzonymi trasami są nielegalne. Artykuł nie wymienia żadnej zatwierdzonej oferty trekkingowej (DT-0819).

## mekong: Cần Thơ i Phong Điền

**Werdykt: nie.** Delta jest płaska, a plan stoi na łodziach i rowerach. Najcięższy dzień, jaki znalazłem, to 20–30 km rowerem po płaskich drogach i krótki kajak (30–45 minut) z łodzią asekuracyjną, oceniony przez operatora jako „umiarkowany” (MK-CD). To nie spełnia kryteriów.

## phuquoc: północ Phú Quốc

**Werdykt: nie.** Szlaki w parku narodowym są krótkie: cztery jednodniowe trasy mają 3–9 km, najdłuższa to Thác Thầy Tu (ok. 9 km, z brodzeniem przez strumienie), reszta ok. 4 km (PQ-VNE, 25.11.2024). Operator sprzedaje też 6-godzinny trekking na đỉnh Tiên Sơn (ok. 6 km, wejście do 280 m; PQ-GYG†), czyli 3–4 godziny marszu (moja ocena). To mniej niż zwykły dzień w górach i nie dość, żeby nazwać go trudnym dniem. Wypraw łodzią szukałem osobno: to rejsy po czterech wyspach ze snorkelingiem (ok. 9 godzin) i wersja z biwakiem 2 dni/1 noc (PQ-KK†), czyli wypoczynek albo wyprawa wielodniowa. Wspinaczki na wyspie nie znalazłem.

## cattien: Park Narodowy Cát Tiên

**Werdykt: tak.** Park sam sprzedaje nocleg w głębi lasu, na stacji strażników nad Bàu Sấu. To jedyny z trzech trudnych dni z oficjalnym cennikiem i programem zarządcy, a noc w terenie ze strażnikami to wprost kryterium z planu.

- **Co i gdzie:**
  - po południu 9 km autem albo rowerem od siedziby parku do końca drogi, potem 5 km pieszo leśną ścieżką do Bàu Sấu (Jezioro Krokodyli, obszar Ramsar, 14 km od siedziby);
  - kolacja na stacji (jedzenie przygotowują strażnicy), wieczorna rozmowa ze strażnikami o ochronie lasu, w programie parku także zachód słońca nad jeziorem i, za opłatą, rejs łódką ze strażnikiem;
  - noc na stacji: pokoje podstawowe, wspólne toalety, wentylatory, bez klimatyzacji, wi-fi i zasięgu telefonu, bez namiotów (park zabrania biwakowania w Bàu Sấu);
  - rano 5 km z powrotem do drogi;
  - wyjazd z siedziby do 14:00 autem (rowerem do 13:00), wyjście z Bàu Sấu następnego dnia do 9:00 (do 9:30 według prasy) (CT-ceny, CT-prog, CT-VNE).
- **Kto prowadzi:**
  - **Vườn quốc gia Cát Tiên** (Trung tâm Giáo dục Môi trường và Dịch vụ): oficjalna usługa „Tham quan Bàu Sấu (nghỉ đêm tại Bàu Sấu)”, ok. 20 godzin, przewodnik parku opcjonalny (CT-ceny). W załącznikach do decyzji o cenniku jest też „tour przygodowy z przejściem przez las, 2 dni/1 noc” (MH1, przewodnik 1,4–1,7 mln VND) i opłata za „nocleg w lesie” (300 000 VND/os.), bez opisu trasy (CT-zał). Warto zapytać w parku, co to za produkt;
  - **Katien Safari** (marka Oxalis Company Limited, licencja turystyczna międzynarodowa nr 44-002/2014/TCDL-GPLHQT z 10.3.2014) prowadzi w parku „Katien Ranger Patrol”: patrol ze strażnikami ze stacji Núi Tượng, noc w hamakach przy strumieniu, a według Tuổi Trẻ trasę pomagała ustawić dyrekcja parku. To 4 dni i 3 noce, do 4 osób, ok. 40 mln VND (ok. 1 400 EUR) za osobę, więc poza zakresem (KS-patrol, OX, CT-patrolTT, CT-patrolVNE).
- **Długość i trudność:** 10 km pieszo w dwóch odcinkach (5 km tam i 5 km z powrotem), bez zamiennika pieszego odcinka. Program parku jest dla gości w dobrej kondycji i odradza go rodzinom ze starszymi osobami i małymi dziećmi. Ścieżka jest oznakowana, a park pisze, że można nią iść samemu, bo jest łatwa. Trudność to więc głównie noc w lesie bez zasięgu.
- **Pozwolenia:**
  - bilet do parku 60 000 VND (z promem) i opłata za Bàu Sấu 250 000 VND/os.;
  - pokoje trzeba zarezerwować w recepcji parku. Na stacji jest ich razem na 19 osób (trzy pokoje trzyosobowe, jeden czteroosobowy, bungalow dwuosobowy i rodzinny);
  - plan wymaga przewodnika (wizja), a park go oferuje, choć nie narzuca.
- **Ryzyka:** pijawki w porze deszczowej (IV–XI), strumienie przelewające się przez ścieżki, ślisko, brak zasięgu, owady przez cały rok (park radzi środek odstraszający) (CT-www, CT-2024, CT-prog, SEZ). Do tego dzikie zwierzęta: w jeziorze żyją na wolności krokodyle syjamskie, od których wzięło nazwę (Bàu Sấu znaczy „Jezioro Krokodyli”); nocą widać przy brzegu ich oczy, a jeziora nie odgradza żaden płot (CT-VNE-CS). Programy parku o zwierzętach nad jeziorem nie piszą (CT-prog). Nad wodą, zwłaszcza po zmroku, trzymaj się strażnika.
- **Miesiące wyłączone:**
  - **zakazu ani zamknięcia nie ma**: park jest otwarty cały rok, w lipcu 2024 prasa nie opisywała zamkniętych tras w porze deszczowej (CT-2024), a przewodnik z 2026 nie wspomina o zamknięciach (CT-VNE);
  - **sezon, propozycja `off`: VIII–X** (`[8, 9, 10]`): w danych to miesiące Z (coroczne wezbranie Đồng Nai, strumienie przez ścieżki; `research/sezony-2026-10.md`). VI–VII i XI zostają z ostrzeżeniem o pijawkach.
- **Cena** (cennik parku dla gości krajowych, obowiązujący od 1.6.2024 do wydania nowego, pobrany 10.10.2026; wartości zbiorcze z przewodnikiem w ostatnim wierszu):

  | pozycja | cena | EUR/os. przy 2 osobach | źródło |
  |---|---|---|---|
  | opłata za Bàu Sấu | 250 000 VND/os. | 9 | CT-ceny |
  | auto 9 km w obie strony (poziom 1: 1–7 osób) | 700 000 VND za grupę | 12 | CT-ceny |
  | przewodnik parku (opcjonalny), tour z autem i noclegiem | 650 000–850 000 VND za tour (zał. 3: 650 000 po wietnamsku, 850 000 po angielsku; streszczenie cennika: 800 000) | 11–15 | CT-zał, CT-ceny |
  | pokój na stacji: trzyosobowy podstawowy albo bungalow dwuosobowy | 750 000 albo 1 000 000 VND za pokój | 13–17 | CT-ceny |
  | kolacja i śniadanie | od 150 000 i od 30 000 VND/os. | 5 i 1 | CT-ceny |
  | **razem z przewodnikiem po angielsku, w pokoju trzyosobowym albo w bungalowie** | 1 580 000–1 705 000 VND/os. | **54–59** | |

  Plan wymaga przewodnika (wizja, pkt 5), więc kwota zbiorcza go zawiera. Bez przewodnika, którego park nie narzuca, dzień kosztuje od 1 155 000 VND/os. (40 EUR), a z przewodnikiem po wietnamsku od 1 480 000 VND/os. (51 EUR). Dla jednej osoby auto, przewodnik i pokój się nie dzielą: z przewodnikiem po angielsku 94–103 EUR (bez przewodnika od 65 EUR). Ceny pokoi, aut i przewodników rosną o 20% w dni świąteczne (Tết, 30.4–1.5, 2.9 i inne dni państwowe). Pokoje w VIII–X są tańsze o 20%, ale nie na Bàu Sấu (CT-ceny).

  CT-ceny to cennik dla gości krajowych, a cen dla cudzoziemców ta notatka nie sprawdzała. Według `research/ceny-2026-10.md` (11.10.2026) cennik parku nie ma osobnych cen dla cudzoziemców, a przewodnik turystyczny Potoo z 1.5.2026 (CT-POT w tamtym pliku) podaje cudzoziemcom te same ceny promu i Bàu Sấu; czy tak samo jest z pokojami, autem, przewodnikiem i posiłkami, nie wiadomo.
- **Zastępuje:** `p` 2 „Gibony i Jezioro Krokodyli”. Zwykły `p` 2 ma `early: true` (wyjście przed świtem ze strażnikiem), a trudny dzień wyjeżdża do 14:00, więc musi mieć własne `early: false`. Następnego ranka trzeba przejść 5 km do 9:00, więc dalszy przejazd (do Đà Lạt ok. 4,5 h) zaczyna się koło południa, i tak mówi tekst dnia („w dalszą podróż ruszysz koło południa”). Przy pobycie na jedną noc dzień `p` 1 ma wersję `solo` (przyjazd po południu), która tego dnia nie pomieści, więc trudnego dnia przy jednej nocy nie ma.

## dalat: Đà Lạt

**Werdykt: nie.** Sprawdziłem Lang Biang, Bidoup–Núi Bà, Tà Năng i dodatkowo canyoning. Jednodniowe trasy są równie wymagające jak zwykłe dni `p` 2 i `p` 3, a trudniejsze są wielodniowe.

- **Bidoup–Núi Bà (park narodowy, cennik od 1.1.2024):**
  - Hòn Giao jeden dzień: 290 000 VND (bilet, przewodnik, lunch, woda, ubezpieczenie). To zwykły dzień `p` 2;
  - trasa jednodniowa Thiên Thai – stacja strażników Đưng Jar Giêng, 10 km, 250 000 VND: żadne źródło nie podaje jej godzin ani stopnia trudności, więc nie mogę jej uznać za wyraźnie trudniejszą;
  - Bidoup 2 dni/1 noc 1 950 000 VND (z namiotem) i Hòn Giao 2 dni/1 noc 1 590 000 VND to wyprawy wielodniowe (BNB-ceny).
- **Tà Năng:** operator TropiAd sprzedaje wyłącznie wyjścia 2 dni/1 noc i 2 dni/2 noce (ok. 31 km na pełną trasę), jednodniowej wersji nie ma (TROP). Wielodniowe odcinki to moduł etapu 3. Dzień `p` 3 w planach zostaje z ustaleniem z `research/ta-nang-2026-10.md`.
- **Lang Biang:** oferta całodniowa z przewodnikiem, ok. 7 godzin, od 49 USD (LB†). Moja ocena: wysiłek podobny do `p` 2, a źródła nie podają wymogu uprawnień.
- Zmiana z 10.10.2026: dzień `p` 3 w Đà Lạt to teraz Lang Biang zamiast Tà Năng, z zastrzeżeniem, że szlak bywa zamknięty (zob. `research/plany-dni-2026-10.md`).
- **Canyoning w Datanla** (liny, skoki do wody, ok. 7 godzin): zbadałem dodatkowo i **nie wpisuję**. 26.2.2016 zginęło tam trzech turystów na wycieczce prywatnej firmy, którą zarządca wodospadu nazwał prowadzoną „na dziko”, bez biletów i sprzętu ośrodka (TT-2016). 22.9.2018 zginął jeden turysta na wycieczce licencjonowanej firmy, po czym Lâm Đồng, według powiązanego artykułu, zawiesił tury przygodowe w Datanla (TN-2018). Aktualnego rejestru operatorów nie znalazłem. To sport, nie wyprawa, i wymaga osobnej decyzji (etap 2 albo 3).

## hoian: Hội An

**Werdykt: nie.** Plan to rowery po wsiach i stare miasto o 6:00, a przełęcz Hải Vân to przejazd do Huế. W okolicy nie znalazłem trudnego dnia z operatorem z uprawnieniami.

- Najtrudniejsza trasa wskazywana w okolicy to Núi Chúa i wodospad Ba Đờ Phốt, ok. 10 km przez gęsty las, strumienie i skały, bez zasięgu i bez podanych godzin. Opisuje ją blog hotelu, który zaleca lokalnego przewodnika, ale nie wymienia operatora ani zezwolenia (HA-PULL).
- Sơn Trà: po wypadku w Mũi Nghê w sierpniu 2026 obowiązuje zakaz wchodzenia w strefy zakazane, m.in. Mũi Nghê, a zarząd odradza trekking bez zgody (TT-0910).
- Szukałem też trekkingu na Cù Lao Chàm i na Bàn Cờ i nie znalazłem żadnego.

## hue: Huế

**Werdykt: nie.** Jedyny wyraźnie trudniejszy dzień w okolicy to Bạch Mã, a to moduł partii B (`notes/etapy.md`). Poza nim szukałem trekkingu w rezerwacie Phong Điền, na Hòn Vọng Phu i w Truồi i znalazłem tylko wycieczki krajoznawcze. Przełęcz Hải Vân to przejazd do Hội An, nie wędrówka.

## puluong: Pù Luông

**Werdykt: tak.** Najwyższy szczyt rezerwatu da się zrobić w jeden dzień z lokalnym przewodnikiem: stałe, strome podejście przez las, 8–9 godzin z lunchem. Rezerwat sam otworzył do tego oficjalną trasę.

- **Co i gdzie:**
  - szczyt Pù Luông (rezerwat podaje 1 700 m, jeden operator 1 500 m), gmina Pù Luông, prowincja Thanh Hóa;
  - oficjalna trasa rezerwatu „Chinh phục đỉnh Pù Luông” (ogłoszona 7.12.2024): ok. 11 km z bản Pù Luông do bản Báng, przez tarasy, las hoàng đàn, jaskinie Khoai i Thắm Mớ, skałę Lưỡi Hổ, las bambusowy i polanę Pù Día. Prawie 2 km to „odcinek przygodowy” o nachyleniu ponad 35°;
  - wersja z noclegiem na szczycie (2 dni/1 noc): dzień 1 od 7:00 do 15:30 do znaku szczytu, dzień 2 od 6:00 (wschód słońca) do 15:00 w Báng (PL-TT, PL-VNN). VietnamPlus pisze o wersji jednodniowej, Tuổi Trẻ podaje tylko dwudniową (PL-VNP, PL-TT);
  - jednodniowa wersja u operatora: ok. 9 godzin z pikniowym lunchem, po krótkim dojeździe z noclegu do podnóża szczytu, polecana na ostatni dzień pobytu, bo następnego dnia jesteś bardzo zmęczony (PL-HET, aktualizacja 10.9.2026). Inny operator pisze o całodniowej wycieczce na szczyt trwającej ok. 12 godzin (PL-PLE).
- **Kto prowadzi:**
  - **Ban Quản lý Khu bảo tồn thiên nhiên Pù Luông** (przez Trung tâm Bảo tồn, phát triển sinh vật và dịch vụ môi trường rừng): przewodnicy i tragarze to mieszkańcy okolicznych wsi, liczba gości w grupie jest ograniczona, zapisy na miejscu, telefonicznie i przez formularz online (PL-TT, PL-VNP);
  - **Hanoi Eco Tour**: jednodniowy dzień na szczyt, tylko z przewodnikiem (PL-HET);
  - **Pu Luong Trekking**: wyjście dwudniowe, ok. 24 km, nocleg w namiotach w lesie, przewodnik i tragarze w cenie, jednodniowej wersji nie oferuje (PL-PLT);
  - **Pu Luong Excursions**: wycieczka całodniowa na szczyt (PL-PLE).
- **Długość i trudność:** HET nazywa trasę „trudną” i „bardzo wymagającą”: stałe podejście, pijawki, ślisko po deszczu. PLT: trudna, dla osób w dobrej kondycji z doświadczeniem w trekkingu wielodniowym, 5–6 godzin w górę przy dwudniowym wariancie. Lżejsza i krótsza niż wyprawa wielodniowa, ale wyraźnie cięższa niż zwykły dzień `p` 2. Jeszcze trudniejsza jest trasa na szczyt Sơn Bá Mười (cały dzień, „niezwykle wymagająca”, prawie pionowe odcinki wapienia i odsłonięte grzbiety, dla doświadczonych alpinistów; PL-AMA). Strona nie podaje przewodnika, pozwolenia ani operatora, więc jej **nie wpisuję**.
- **Pozwolenia:**
  - opłaty za szczyt, ceny ani przepisu nakazującego przewodnika nie znalazłem; plan i HET wymagają przewodnika;
  - zgodę zarządcy mają produkty samego rezerwatu. Hanoi Eco Tour i Pu Luong Trekking nie podają na stronach numeru licencji turystycznej, więc u operatora prywatnego zapytaj o licencję i o zgodę rezerwatu (kary za wycieczki leśne bez zgody, zob. „Ramy prawne 2026”).
- **Ryzyka:** pijawki, ślisko po deszczu, stromo (ponad 35°), mgła i zimno w zimie, nagłe wezbrania w porze deszczowej (biuletyn NCHMF z 10.9.2026 wymienia gminę Pù Luông, najniższy poziom ryzyka; `research/sezony-2026-10.md`). HET zaleca wyjście wyłącznie z przewodnikiem (PL-HET).
- **Miesiące wyłączone:**
  - **zakazu ani zamknięcia nie znalazłem**;
  - **sezon, propozycja `off`: V–IX** (`[5, 6, 7, 8, 9]`): operator pisze, że X–IV to „najbardziej stabilny i bezpieczny” okres, a V–IX pora deszczowa z błotem i pijawkami (PL-PLT), HET odradza wyjście w deszczu (PL-HET), a w danych V–IX mają 244–325 mm opadów miesięcznie. W lutym–kwietniu na trasie kwitnie las różaneczników (PL-TT).
- **Cena:** oficjalnej ceny rezerwatu nie znalazłem. **Szacunek: 25–55 EUR/os.** Dolna granica to przewodnik od gospodarzy (0,8–1,2 mln VND za dzień, strona HDV Local nie mówi, czy za osobę, czy za grupę; PL-HDV) dzielony na dwie osoby, plus lunch i dojazd. Górna to przewodnik liczony na osobę z lunchem. Cena sprawdzona 10.10.2026.
- **Zastępuje:** `p` 2 „Grzbiety, wioski i wodospad”. Nocleg u gospodarzy zostaje, więc dzień mieści się w planie. Zwykły `p` 2 nie ma `early`, trudny też nie (start ok. 7:00).

## ninhbinh: Ninh Bình

**Werdykt: nie.** Plan to rejs łodzią wiosłową w Tràng An o 7:00, rowery i Hoa Lư. Najbliższy „trudny” punkt to Hang Múa: 500 stromych kamiennych schodów na szczyt, czyli schody, nie wspinaczka (NB-NBTC). Wspinaczki skałkowej z operatorem w Ninh Bình nie znalazłem. Trekking w dżungli z naczelnymi to Cúc Phương, moduł partii A (`notes/etapy.md`).

## catba: Cát Bà i zatoka Lan Hạ

**Decyzja z 10.10.2026:** na razie bez trudnego dnia na Cát Bà, bo licencje operatorów wspinaczki i DWS są tylko deklarowane. Ponowne sprawdzenie z 13.10.2026 dało ten sam werdykt (sekcja „Uzupełnienie 13.10.2026: Cát Bà, trudny dzień”).

**Werdykt: tak.** Dzień wspinaczki skałkowej albo deep water soloing (DWS, wspinaczka nad wodą ze skokiem do morza) z operatorem z miasta Cát Bà. **Warunek:** operator ma certyfikat na ten rodzaj działalności, o numer którego pytasz przed rezerwacją. To najsłabiej udokumentowany z trzech trudnych dni: uprawnienia operatorów znam tylko z ich własnych stron (poniżej).

- **Co i gdzie:**
  - **Cat Ba Climbing**, całodniowa wspinaczka na skałach wyspy (Hidden Valley i Fisher Valley albo Buddha Cave), 7:30–17:30, 3–10 osób; półdniowe DWS; wieloodcinkowa wspinaczka na Tiger Beach (dla średniozaawansowanych i zaawansowanych) (CB-CBC);
  - **Cat Ba Ventures Co., Ltd.**, cały dzień DWS łodzią z miasta Cát Bà, 8:00–17:30: cztery skały z trasami 4a–7c+, lunch na łodzi, a przy niskim pływie kajak do lagun Ho Ba Ham (pisownia źródła). Skakanie i lądowanie ćwiczy się z przewodnikiem, początkujący zaczynają od łatwych tras (CB-CBV);
  - **Asia Outdoors** (biuro w Cát Bà) prowadzi DWS i wspinaczkę i pisze o sobie, że ma licencję parku narodowego Cát Bà na DWS (CB-AO). Przewodnik wspinaczkowy z 2019 roku pisze, że firma się zamknęła (CB-WC), a jej strona działa 10.10.2026 i odsyła do jesiennych wyjazdów DWS (listopad 2026).
- **Długość i trudność:** pełny dzień, ok. 10 godzin z łodzią, trasy od 4 do 7c+. DWS jest „dla początkujących i zaawansowanych”, wieloodcinkowa wspinaczka tylko dla średniozaawansowanych (CB-CBC). Operator wymaga umiejętności pływania, zdrowia (bez nadciśnienia i chorób serca) i 18 lat albo opieki rodzica (CB-LS, 22.8.2024).
- **Pozwolenia i uprawnienia:**
  - Hải Phòng ma procedurę wydawania „Giấy chứng nhận đủ điều kiện kinh doanh hoạt động thể thao” dla wspinaczki sportowej. Wymaga ona instruktorów (trener albo zawodnik klasy 2 i wyżej, dyplom sportowy albo przeszkolenie), ratownika i, przy sportach przygodowych, ustaleń z placówką medyczną (CB-GCN; dekrety 36/2019/NĐ-CP i 31/2024/NĐ-CP, rozporządzenie 28/2018/TT-BVHTTDL). DWS to odmiana wspinaczki sportowej, osobnego przepisu nie znalazłem;
  - Cat Ba Climbing podaje „Fully licensed” bez numeru i organu, ubezpieczenie do 100 mln VND na przypadek i instruktora w cenie (CB-CBC); Asia Outdoors deklaruje licencję parku (CB-AO); Cat Ba Ventures nie podaje żadnej informacji o licencji (CB-CBV). **Żadnego numeru certyfikatu ani urzędowej listy operatorów nie znalazłem**;
  - Quyết định 253/2025/QĐ-UBND (31.12.2025, wg wyników wyszukiwania w mocy od 12.1.2026, co 13.10.2026 potwierdził też BHP-0108; tekst decyzji się nie otworzył) dopuszcza usługi turystyczne na zatokach Cát Bà tylko w miejscach, trasach i punktach dozwolonych przez władze. Nie ustaliłem, czy dozwolono miejsca do DWS (CB-253).
- **Kajaki są poza dniem:**
  - od 15.11.2024 urząd powiatu Cát Hải (zawiadomienie 1213/TB-UBND) kazał zawiesić usługi kajakowe na zatokach archipelagu do czasu spełnienia warunków prawnych (CB-K1, CB-K2);
  - nie znalazłem urzędowego komunikatu o zniesieniu. Operator rejsów pisze bez daty, że zawieszenie nadal obowiązuje: od 1.2.2026 do odwołania, na podstawie pisma 483/TB-UBND, dla całej zatoki Lan Hạ (CB-IS); numeru nie potwierdziłem u źródła urzędowego;
  - strona o atrakcjach z 31.5.2026 opisuje wynajem kajaków bez słowa o zawieszeniu (CB-VT). Sygnały są sprzeczne, więc **dzień w kajaku nie wchodzi**, a część kajakową w ofercie Cat Ba Ventures trzeba potwierdzić u operatora.
- **Ryzyka:**
  - pływy: DWS zależy od pływu („bez pływu nie możemy go zorganizować”, CB-CBC; wg przewodnika wspinaczkowego z 2019 trasy idą w dni z pływem ponad 2 m, a zimą pływy są niekorzystne, CB-WC);
  - mokra skała po ulewach (tufy w Buddha Cave schną kilka dni, CB-CBC); kask jest konieczny w Butterfly Valley (CB-WC);
  - zakazy wypłynięć przy sztormach (lipiec–wrzesień, `research/sezony-2026-10.md`);
  - sprawdź, czy twoja polisa obejmuje wspinaczkę i skoki do wody.
- **Miesiące wyłączone:**
  - **zakaz:** zakazy wypłynięć statków turystycznych w Hải Phòng i Quảng Ninh w lipcu każdego z lat 2023–2026, w sierpniu 2025 i 2026, we wrześniu 2024 i 2025 (dziennik w `research/sezony-2026-10.md`, C1–C9);
  - **propozycja `off`: VII–IX** (`[7, 8, 9]`). Grudzień–marzec ma zimne morze (21–23 °C; `research/sezony-2026-10.md`), a według przewodnika wspinaczkowego grudzień–luty to najlepszy sezon na wspinaczkę na lądzie, tylko DWS bywa wtedy ograniczony pływami (CB-WC). Tych miesięcy nie wyłączam, w tekście wystarczy ostrzeżenie.
- **Cena** (cennik Cat Ba Climbing i Cat Ba Ventures, 10.10.2026, przy minimum 3 osobach):

  | pozycja | cena | EUR/os. | źródło |
  |---|---|---|---|
  | całodniowa wspinaczka na skałach wyspy | 2 585 000 VND | 89 | CB-CBC |
  | cały dzień DWS (z kajakiem do lagun) | 98 USD | 87 | CB-CBV |
  | półdniowe DWS | 1 150 000 VND | 40 | CB-CBC |
  | wieloodcinkowa wspinaczka na Tiger Beach (cały dzień) | 4 748 000 VND | 164 | CB-CBC |

  **Dzień: ok. 85–90 EUR/os.** Ceny dotyczą grup od 3 osób; Cat Ba Ventures wycenia grupy prywatne na zapytanie.
- **Zastępuje:** `p` 4 „Việt Hải i park narodowy” (wędrówka, jedyny dzień o tempie `hike`). **Uwaga:** `stopDays` bierze `n` planów o najniższym `p`, więc przy 3 nocach wchodzą `p` 1–3, a dnia `p` 4 w planie nie ma. Trudny dzień widać więc tylko przy 4 nocach. Przy trzech nocach można go dopiąć do `p` 3 (po rejsie łódź dobija ok. 12:00, więc zostaje popołudnie na półdniowe DWS). Wybór zostaje na czas, gdy Cát Bà dostanie trudny dzień (na razie go nie ma, decyzja z 10.10.2026).

## hanoi: Hà Nội

**Werdykt: nie.** To miasto z programem miejskim (spacery, muzea, jedzenie, Đường Lâm, Bát Tràng). Wycieczki w góry z Hà Nội nie dają trudnego dnia z uprawnieniami:

- Tam Đảo: wspinaczka na trzy szczyty zawieszona od 5.5.2026 do odwołania z powodu stromych i śliskich ścieżek (TT-0507); trasy Tam Đảo Bắc park nie otworzył po tym, jak student zaginął tam na 36 godzin (TT-0518);
- Ba Vì: nie znalazłem trudnego produktu z przewodnikiem i zasadami parku.

## babe: Ba Bể

**Werdykt: nie.** Sprawdziłem długie trekkingi: trudne są wielodniowe, jednodniowe są łatwe albo nieopisane, a kajaki są zakazane.

- **Wielodniowe:** trasa dwudniowa przez wsie Coc Toc i Na Nghe do wodospadu Đầu Đẳng (pisownia nazw wsi jak w źródle) jest „jeszcze bardziej wymagająca”, a trekkingi „umiarkowane i trudne” trwają 3–4 dni (BB-HV, BB-ML). To moduły etapu 3.
- **Jednodniowe** trasy mają 5–15 km (Khau Quan – Nam Dai 12–15 km, w praktyce z lokalnym przewodnikiem), bez podanych godzin i stopnia trudności (BB-ML), a oferta jednodniowa operatora jest oceniona na 2 z 5 i opisana jako odpowiednia dla początkujących (BB-TC). To mniej niż albo mniej więcej tyle, co zwykły dzień `p` 3.
- **Park:** 22.7.2026 dyrekcja pokazała tylko „dobrze znaną” trasę trekkingową i pisze, że „buduje” trasy i wycieczki (BB-0722). 10.10.2026 prasa pisze, że turystyka przygodowa „ma jeszcze dużo miejsca do rozwoju” (BB-1010). Oficjalnych produktów przygodowych jeszcze nie ma.
- **Kajaki:** od lipca 2026 zakaz kajaków, SUP i kąpieli bez zabezpieczeń; rejsy pasażerskie pływają (BB-P2; `research/sezony-2026-10.md`). Zwykły dzień `p` 2 mówi o „łodzi albo kajaku”.

## caobang: Cao Bằng

**Werdykt: nie.** Kandydat z planu, wędrówka pod szczyt Núi Mắt Thần, nie jest wspinaczką.

- **Núi Mắt Thần:** dojście od jeziora Thang Hen to ok. 1,5–2 km pieszo do góry z naturalnym otworem o średnicy do 50 m. Wstęp jest bezpłatny, bez operatora (CAO-wetrek, aktualizacja 20.3.2025; CAO-bao, 22.3.2023).
- **Phja Oắc** (1 931 m, najwyższy szczyt prowincji) leży w powiecie Nguyên Bình, po przeciwnej stronie niż Bản Giốc i Mắt Thần. Operator opisuje przykładowy dzień trekkingowy ok. 8 godzin (7:00–15:30) z radą wzięcia lokalnego przewodnika, bez ceny i bez zasad parku (CAO-loop), a całodniowa oferta w serwisie Viator zaczyna się od ok. 4 godzin jazdy z Cao Bằng i nie opisuje trekkingu, tylko jazdę i podejścia na szczyt (CAO-viator). Udokumentowanego produktu z przewodnikiem, ceną i zasadami parku nie znalazłem.
- **Bản Giốc** zamykano po powodziach (7.10.2025; `research/sezony-2026-10.md`).

## Poza zakresem

Wyprawy wielodniowe, które znalazłem przy okazji. Nie są trudnymi dniami, ale pomogą w etapie 3:

- **Cát Tiên:** „Katien Ranger Patrol” (Oxalis), 4 dni/3 noce, ok. 40 mln VND (ok. 1 400 EUR) za osobę, do 4 osób, nocleg w hamakach przy strumieniu; w finale International Tourism Awards 2026 (CT-patrolVNE, KS-patrol). Także tour przygodowy parku „2 dni/1 noc” (MH1) z cennika (CT-zał).
- **Pù Luông:** oficjalna dwudniowa trasa na szczyt z noclegiem na szczycie (cena nieznana; PL-TT) i dwudniowe wyjście Pu Luong Trekking z namiotami (PL-PLT).
- **Đà Lạt:** Bidoup 2 dni/1 noc (1 950 000 VND, ok. 67 EUR), Hòn Giao 2 dni/1 noc (1 590 000 VND, ok. 55 EUR), Tà Năng–Phan Dũng 2 dni/2 noce (BNB-ceny, TROP).
- **Ba Bể:** trekkingi 2–4-dniowe (BB-HV).

## Uwagi do planów dni (10.10.2026)

1. **Trzy dni z werdyktem „tak”:** cattien `p` 2, puluong `p` 2 i catba `p` 4 (na razie bez trudnego dnia, decyzja z 10.10.2026). Pozostałe dziesięć miejsc zostaje bez `hard`, więc na poziomie 3 dostaje dzień zwykły (decyzja z sesji 10.10.2026). Test treści (`tests/content.test.js`) sprawdza, że co najmniej jeden dzień ma `hard`.
2. **Pole `off` według propozycji:** cattien `[8, 9, 10]`, puluong `[5, 6, 7, 8, 9]`, catba `[7, 8, 9]`. Tylko dla Cát Bà są udokumentowane zakazy; dla dwóch pozostałych to reguła sezonu opisana w „Jak czytać”.
3. **Teksty trudnych dni:** każdy mówi, z kim się idzie (zarządca albo operator z uprawnieniami), jakie jest pozwolenie i jakie ryzyko, bez cen i linków, które strona podaje osobno, w części „Przed wyjazdem”.
   - **cattien:** park sprzedaje nocleg na stacji strażników, a przewodnika parku rezerwuje się razem z noclegiem, bo plan go wymaga; wyjazd z siedziby do 14:00, powrót 5 km pieszo przed 9:00.
   - **puluong:** lokalny przewodnik, najlepiej przez rezerwat; pijawki i błoto w porze deszczowej.
   - **catba:** operator z certyfikatem na wspinaczkę, numer do sprawdzenia; zależność od pływu.
4. **Dziedziczenie:** trudny dzień Cát Tiên ma własne `early: false`, bo zwykły `p` 2 ma `early: true`. Pozostałe dwa nie mają `early`.
5. **Cát Bà `p` 4** wchodziłby do planu tylko przy 4 nocach (zob. sekcja „catba”). Wróci to razem z trudnym dniem, którego Cát Bà na razie nie ma (decyzja z 10.10.2026).
6. **Kajaki w zwykłych dniach:** w pierwowzorze `p` 2 w Cát Bà (rejs: „kajaki, wizyta w pływającej wiosce”) i `p` 2 w Ba Bể („łódź albo kajak”) mówiły o kajaku, a od 15.11.2024 (Cát Bà) i lipca 2026 (Ba Bể) usługi kajakowe są zawieszone albo zakazane. Od 10.10.2026 oba dni płyną łodzią, a zmiany opisuje `research/plany-dni-2026-10.md` (sekcje „catba” i „babe”).
7. **Do sprawdzenia przed publikacją (etap 4):**
   - cennik parku Cát Tiên (obowiązuje od 1.6.2024, a park ma przejść pod zarząd miasta Đồng Nai, więc adres strony może się zmienić; `research/sezony-2026-10.md`);
   - czy rezerwat Pù Luông sprzedaje wersję jednodniową i za ile;
   - czy zniesiono zawieszenie kajaków w Cát Bà i czy ogłoszono miejsca do DWS;
   - numery certyfikatów operatorów w Cát Bà.

## Źródła

Adresy sprawdzone 10.10.2026: 54 otwiera się, a cztery oznaczone † zwracają 403 dla narzędzia. Data w ostatniej kolumnie to data publikacji albo aktualizacji strony, a „brak” znaczy, że strona jej nie podaje. Rodzaj źródła: urzędowe (organ państwa, park, rezerwat, urząd miasta), prasa, operator, blog albo komercyjne. **†** oznacza stronę, której treść widziałem tylko w wynikach wyszukiwania (nie otworzyła się dla narzędzia).

### Wspólne

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| KURS | Kursy walut open.er-api.com: 1 EUR = 28 993,89 VND, 1,1206 USD. | https://open.er-api.com/v6/latest/EUR | komercyjne (dane kursowe) | 10.10.2026 00:02 UTC |
| DT-0819 | Dân Trí: ostrzeżenie zarządu Núi Bà Đen przed trekkingiem i biwakowaniem bez zgody zarządcy lasu; dekret 146/2026/NĐ-CP, kary 4–6 i 6–10 mln VND. | https://dantri.com.vn/du-lich/tay-ninh-canh-bao-viec-trekking-cam-trai-tu-phat-o-nui-ba-den-20260819221637352.htm | prasa | 19.8.2026 |
| TT-0518 | Kinh tế Sài Gòn Online w Tuổi Trẻ: zakaz trekkingu bez zezwolenia na szczytach Bát Xát (Lào Cai), Tam Đảo Bắc, Chư Yang Sin, norma TCVN 14602:2026; kary 4–6 i 6–10 mln VND według art. 11 dekretu 168/2024/NĐ-CP (odczyt z 13.10.2026 w `research/sapa-2026-10.md`, SP-TT0518). | https://tuoitre.vn/saigontimes/cam-trekking-tu-phat-loat-dinh-nui-noi-tieng-o-mien-bac-1061229857.htm | prasa | 18.5.2026 |
| TT-0507 | Tuổi Trẻ: park narodowy Tam Đảo zawiesza wspinaczkę na trzy szczyty od 5.5.2026. | https://tuoitre.vn/tam-dung-hoat-dong-leo-nui-tuyen-3-dinh-tam-dao-2026050711485508.htm | prasa | 7.5.2026 |
| TT-0910 | Tuổi Trẻ: zarząd Sơn Trà ostrzega przed trekkingiem bez zgody po wypadku w Mũi Nghê, 10.9.2026. | https://tuoitre.vn/sau-tai-nan-o-mui-nghe-da-nang-khuyen-cao-viec-khach-mua-tour-trekking-tu-phat-tai-son-tra-100260910172459945.htm | prasa | 10.9.2026 |
| TaNang | Kopia ustalenia o Tà Năng–Phan Dũng (norma TCVN 14602:2026, kara 4–6 mln VND za wejście do lasu, oferta operatorów). | `research/ta-nang-2026-10.md` | własne badanie | 8.10.2026, kopia 10.10.2026 |
| SEZ | Sezony 13 miejsc, dziennik zakazów Cát Bà, Bản Giốc, Cát Tiên, Ba Bể (P2), Pù Luông (L3). | `research/sezony-2026-10.md` | własne badanie | 9.10.2026 |
| ETAPY | Plan etapów: Bạch Mã w partii B, Cúc Phương w partii A. | `notes/etapy.md` | własne | 10.10.2026 |

### Cát Tiên

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CT-ceny | Cennik parku dla gości krajowych: bilet, pokoje na stacji w Bàu Sấu, „Tham quan Bàu Sấu (nghỉ đêm tại Bàu Sấu)”, auto, przewodnik, posiłki, zasady (decyzja 27/QĐ-TTGDMT z 20.5.2024, od 1.6.2024). | https://cattiennationalpark.com.vn/wp-content/uploads/2024/06/bang-gia-khach-noi-dia-2025.pdf | urzędowe (park) | od 1.6.2024 |
| CT-zał | Ta sama decyzja ze skanu z pieczęcią: załączniki 2 (opłaty) i 3 (przewodnicy: tour Bàu Sấu 2 dni/1 noc BS2/BS3, tour przygodowy MH1/MH2). | https://cattiennationalpark.com.vn/wp-content/uploads/2025/07/Bang-gia-2024-co-moc-dau.pdf | urzędowe (park) | 20.5.2024, plik z lipca 2025 |
| CT-VNE-CS | VnExpress: noc na stacji strażników nad Bàu Sấu; w jeziorze żyją na wolności krokodyle syjamskie, nocą przy brzegu świecą setki par ich oczu, bez ogrodzenia; nocleg 200 000 VND od osoby, słaby zasięg telefonu. | https://vnexpress.net/ngu-dem-o-dam-day-ca-sau-4147123.html | prasa | 16.8.2020 (odczyt 14.10.2026) |
| CT-prog | Programy parku z noclegiem w Bàu Sấu (3N2D-TLBO: stacja bez wi-fi, zasięgu i klimatyzacji, kolacja ze strażnikami) i z dniem w Bàu Sấu (2N1D-BS). | https://cattiennationalpark.com.vn/wp-content/uploads/2023/01/3N2D-TLBO.pdf ; https://cattiennationalpark.com.vn/wp-content/uploads/2023/01/2N1D.BS_.pdf | urzędowe (park) | 1.2023 (miesiąc w adresie plików) |
| CT-www | Strona parku: tours 2 dni/1 noc i 3 dni/2 noce, brak komunikatu o zamknięciu, artykuł o porze deszczowej (pijawki, IV–XI). | https://cattiennationalpark.com.vn/thong-tin-tour-du-lich/ ; https://cattiennationalpark.com.vn/luu-y-tham-quan-rung-cat-tien-mua-mua/ | urzędowe (park) | 30.12.2022 (artykuł), strona 10.10.2026 |
| CT-VNE | VnExpress, „Cẩm nang Du lịch VQG Cát Tiên 2026”: Bàu Sấu 9 km + 5 km, nocleg (wyjazd przed 14:00, powrót przed 9:30, bez namiotów), ceny. | https://vnexpress.net/cam-nang-du-lich-vuon-quoc-gia-cat-tien-4775984.html | prasa | 9.8.2024, aktualizacja 25.5.2026 |
| CT-2024 | VnExpress, „Đông khách đổ về rừng Cát Tiên mùa mưa”: w porze deszczowej brak zamkniętych tras, strumienie przelewają się przez ścieżki. | https://vnexpress.net/dong-khach-do-ve-rung-cat-tien-mua-mua-4773163.html | prasa | 23.7.2024 |
| CT-patrolTT | Tuổi Trẻ: patrol ze strażnikami w Cát Tiên, noc w hamakach, ok. 10–13 km dziennie. | https://tuoitre.vn/tour-la-o-cat-tien-du-khach-theo-kiem-lam-tuan-tra-ngu-giua-rung-sau-20260527195616524.htm | prasa | 28.5.2026 |
| CT-patrolVNE | VnExpress: „Katien Ranger Patrol” (Oxalis), 4 dni/3 noce, ok. 40 mln VND, do 4 osób, finał International Tourism Awards 2026. | https://vnexpress.net/tour-cung-kiem-lam-xuyen-rung-cat-tien-duoc-de-cu-giai-du-lich-the-gioi-5126696.html | prasa | 30.9.2026 |
| KS-patrol | Katien Safari (marka Oxalis Company Limited): „Patrol with Cat Tien Ranger”, 4 dni/3 noce, ok. 1 500 USD (39,8 mln VND) bez daty; nocleg w hamakach. | https://katiensafari.com/tour/patrol-with-rangers/ | operator | brak |
| OX | Oxalis: licencja turystyczna międzynarodowa nr 44-002/2014/TCDL-GPLHQT z 10.3.2014 (strona rekrutacyjna). | https://oxalisadventure.com/tour-guide-katien-ranger-patrol/ | operator | brak |

### Đà Lạt

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| BNB-ceny | Park narodowy Bidoup–Núi Bà, cennik: Hòn Giao pół dnia/1 dzień/2 dni, Thiên Thai – Đưng Jar Giêng 10 km, trasy 2 dni/1 noc. | https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/ | urzędowe (park) | od 1.1.2024 |
| TROP | TropiAd: oferta Tà Năng (2 dni/2 noce ok. 31 km, 2 dni/1 noc), bez jednodniowych. | https://tropiad.com/en/activity/ta-nang-phan-dung/ | operator | brak |
| LB† | Oferta „DaLat: Trek on Langbiang Mountain”, 7 godzin, od 49 USD (wyniki wyszukiwania). | https://www.getyourguide.com/dalat-l976/trekking-on-lang-biang-mountain-t590260/ | komercyjne | brak |
| TT-2016 | Tuổi Trẻ: trzech Brytyjczyków zginęło 26.2.2016 w Datanla na wycieczce prywatnej firmy prowadzonej, wg zarządcy wodospadu, „na dziko”. | https://tuoitre.vn/du-lich/3-du-khach-nuoc-ngoai-tu-nan-tai-thac-datanla-da-lat-1057687.htm | prasa | 26.2.2016 |
| TN-2018 | Thanh Niên: śmierć turysty 22.9.2018 w Datanla na wycieczce licencjonowanej firmy, zawieszenie tur przygodowych. | https://thanhnien.vn/du-khach-han-quoc-tu-vong-o-thac-datanla-du-lich-mao-hiem-nhung-dieu-phai-nho-185791169.htm | prasa | 25.9.2018 |

### Pù Luông

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| PL-TT | Tuổi Trẻ: rezerwat otwiera trasę „Chinh phục đỉnh Pù Luông”: 11 km, 2 dni/1 noc, nocleg na szczycie, harmonogram, przewodnicy z wsi, zapisy; ogłoszona 7.12.2024. | https://tuoitre.vn/mo-tuyen-chinh-phuc-dinh-pu-luong-don-du-khach-thich-du-lich-mao-hiem-ve-voi-xu-thanh-20251110160250925.htm | prasa | 10.11.2025 |
| PL-VNP | VietnamPlus: ta sama trasa, wersja 1-dniowa albo 2 dni/1 noc, ponad 35°, grupy ograniczone. | https://www.vietnamplus.vn/danh-thuc-tiem-nang-du-lich-sinh-thai-rung-dac-dung-pu-luong-post1080094.vnp | prasa | 30.11.2025 |
| PL-VNN | VietNamNet: ok. 2 km „odcinka przygodowego” ponad 35°, harmonogram dnia 1. | https://vietnamnet.vn/kham-pha-gan-2km-duong-rung-mao-hiem-chinh-phuc-dinh-pu-luong-o-thanh-hoa-2461499.html | prasa | 16.11.2025 |
| PL-HET | Hanoi Eco Tour: wejście na szczyt 1 500 m, 8–9 godzin z lunchem, tylko z przewodnikiem. | https://hanoiecotour.com/pu-luong-off-the-beaten-track/ | operator | aktualizacja 10.9.2026 |
| PL-PLT | Pu Luong Trekking: szczyt 1 700 m, 2 dni, ok. 24 km, namioty, pora sucha X–IV. | https://puluongtrekking.com/mt-pu-luong/ | operator | brak |
| PL-PLE | Pu Luong Excursions: „całodniowa wycieczka na szczyt trwająca 12 godzin”. | https://puluongexcursions.com/pu-luong-travel-guide/ | operator | brak |
| PL-HDV | HDV Local: platforma przewodników, ceny jednodniowych tras (średnia 800 000–1 200 000 VND). | https://hdvlocal.com/products/trekking-tour-guide-in-vietnam | komercyjne | brak (© 2026) |
| PL-AMA | Ama Journey: trasa Sơn Bá Mười „niezwykle wymagająca”, cały dzień. | https://amajourneyasia.com/vietnam-travel-blogs/pu-luong-trekking-guide | komercyjne | 5.12.2025 |

### Cát Bà

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CB-CBC | Cat Ba Climbing: cennik, całodniowa wspinaczka, DWS, wieloodcinkowa, „Fully licensed”, pływy. | https://catbaclimbing.com/ | operator | brak |
| CB-CBV | Cat Ba Ventures Co., Ltd.: cały dzień DWS i kajaki, 98 USD, harmonogram i skały. | https://catbaventures.com/cat-ba-tours/full-day-deep-water-soloing-kayaking-in-cat-ba-ha-long-bay.html | operator | brak |
| CB-AO | Asia Outdoors: DWS i wspinaczka, deklaracja licencji parku narodowego Cát Bà. | https://asiaoutdoors.vn/ | operator | brak |
| CB-WC | The Wandering Climber: sezon wspinaczkowy, pływy i DWS, rady. | https://www.thewanderingclimber.com/cat-ba-climbing-guide/ | blog | 5.10.2019, aktualizacja 2.9.2022 |
| CB-LS | Báo Lạng Sơn: DWS w Cát Bà, wymagania wobec uczestników (Cat Ba Climbing). | https://langsontv.vn/news/460/74284/khach-tay-thich-thu-trai-nghiem-leo-nui-roi-tha-minh-xuong-bien-o-cat-ba | prasa | 22.8.2024 |
| CB-GCN | Sở Văn hóa và Thể thao Hải Phòng: procedura „Giấy chứng nhận đủ điều kiện kinh doanh hoạt động thể thao đối với môn Leo núi thể thao”. | https://cdn.haiphong.gov.vn/gov-hpg/SiteFolders/sovhtt/6329/tintuc/2024/5/gcn_leo-nui-the-thao.pdf | urzędowe | 5.2024 (miesiąc w adresie pliku) |
| CB-253 | Portal Cát Hải: Quyết định 253/2025/QĐ-UBND o zasadach turystyki na zatokach archipelagu Cát Bà. Strona się otworzyła, a tekst decyzji w załączniku nie (zob. CB-253PDF w „Uzupełnieniu 13.10.2026”). | https://cathai.haiphong.gov.vn/thong-tin-du-lich/hai-phong-ban-hanh-quy-che-quan-ly-hoat-dong-du-lich-tren-cac-vinh-thuoc-quan-dao-cat-ba-843442 | urzędowe | brak |
| CB-K1 | Tuổi Trẻ: zawieszenie kajaków na zatokach Cát Bà od 15.11.2024. | https://tuoitre.vn/cat-ba-dung-hoat-dong-cheo-thuyen-kayak-tren-vinh-20241120214249607.htm | prasa | 20.11.2024 |
| CB-K2 | Dân Trí: to samo, zawiadomienie 1213/TB-UBND powiatu Cát Hải. | https://dantri.com.vn/du-lich/dung-cheo-thuyen-kayak-o-lan-ha-khach-tay-tiec-nuoi-doanh-nghiep-boi-roi-20241120174714373.htm | prasa | 21.11.2024 |
| CB-IS | Indochina Sails: zawieszenie kajaków „od 1.2.2026 do odwołania”, pismo 483/TB-UBND (strona bez daty, numeru nie potwierdziłem). | https://www.indochinasails.com/en/blog/kayak-suspension-enhanced-bamboo-boat-experience-in-lan-ha-bay.html | operator | brak |
| CB-VT | Vietnamtourism.com, przewodnik po Cát Bà: wynajem kajaków, bez słowa o zawieszeniu. | https://www.vietnamtourism.com/en/cat-ba-island-things-to-do-the-complete-2026-guide | komercyjne | 31.5.2026 |

### Pozostałe miejsca

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| SG-GYG† | Oferta Cần Giờ: trek do bazy Rừng Sác (ok. 25 minut) i Monkey Island (wyniki wyszukiwania). | https://www.getyourguide.com/ho-chi-minh-city-l272/private-or-group-tour-can-gio-mangrove-monkey-island-trek-t695758/ | komercyjne | brak |
| MK-CD | Countryside Adventures: dzień rowerem (20–30 km) i kajakiem po delcie, „umiarkowany”. | https://www.countrysidediscovery.com/tour/mekong-countryside-by-kayak-bike-one-day/ | operator | brak (promocje z 12.2024) |
| PQ-VNE | VnExpress: cztery jednodniowe szlaki w parku Phú Quốc (3–9 km). | https://vnexpress.net/4-cung-trekking-rung-phu-quoc-trong-ngay-4818851.html | prasa | 25.11.2024 |
| PQ-GYG† | Hornbill Adventures: 6-godzinny trek na Tien Son Dinh (đỉnh Tiên Sơn), 66 USD (wyniki wyszukiwania). | https://www.getyourguide.com/phu-quoc-l1219/phu-quoc-tien-son-dinh-6-hour-jungle-trekking-adventure-t967153/ | komercyjne | brak |
| PQ-KK† | KKday: wyprawa po wyspach Phú Quốc z biwakiem 2 dni/1 noc (wyniki wyszukiwania); rejsy po czterech wyspach ze snorkelingiem są w tych samych wynikach. | https://www.kkday.com/en/product/36420-2d1n-phu-quoc-island-hopping-and-overnight-camping | komercyjne | brak |
| HA-PULL | Pullman Đà Nẵng, przewodnik po trekkingu: Núi Chúa i Ba Đờ Phốt, ok. 10 km. | https://www.pullman-danang.com/discovery/destination/da-nang-trekking/ | komercyjne | brak (© 2026) |
| NB-NBTC | Ninh Binh Tourist Center: Hang Múa, 500 kamiennych schodów. | https://ninhbinhtouristcenter.com/climbing-hang-mua-mua-cave-the-best-views-and-hiking-tips-in-ninh-binh/ | operator | brak |
| BB-P2 | Báo Văn hóa: zawiadomienie 120/TB-UBND gminy Ba Bể, zakaz kajaków, SUP, kąpieli; rejsy pasażerskie legalne. | https://baovanhoa.vn/du-lich/xa-ba-be-len-tieng-ve-thong-tin-dung-dich-vu-du-lich-tren-ho-245686.html | prasa | 14.7.2026 |
| BB-ML | Mr Linh's Adventures (Ba Be National Park Travel Co., Ltd.): pięć tras, Khau Quan – Nam Dai 12–15 km. | https://babenationalpark.com.vn/en/vietnam/travel-blog/mrlinh-adventures/1034-top-5-trekking-routes-in-ba-be-national-park.aspx | operator | brak (© 2012–2025) |
| BB-HV | Hiking Vietnam: trekking 2-dniowy „bardziej wymagający”, 3–4-dniowe trasy, pora sucha. | https://hikingvietnam.com/vietnam-hiking-trails/ba-be-national-park-trekking/ | komercyjne | brak (© 2026) |
| BB-TC | Trekking-Camping: wycieczka 1-dniowa po Ba Bể, 2 z 5, dla początkujących. | https://trekking-camping.com/tour/tour-trekking-1-ngay-kham-pha-vuon-quoc-gia-ba-be/ | operator | brak |
| BB-0722 | Việt Giải Trí: spacer trekkingowy z dyrekcją i strażnikami, park „buduje” trasy. | https://vietgiaitri.com/theo-dau-rung-xanh-ba-be-20260722i7739273 | prasa | 22.7.2026 |
| BB-1010 | Việt Giải Trí: turystyka przygodowa w Ba Bể „ma dużo miejsca do rozwoju”. | https://vietgiaitri.com/danh-thuc-du-dia-du-lich-trai-nghiem-giua-dai-ngan-viet-bac-20261010i7789858/ | prasa | 10.10.2026 |
| CAO-wetrek | WeTrek: Núi Mắt Thần, dojście 1,5–2 km od jeziora Thang Hen. | https://wetrek.vn/bai-viet-thanh-vien/kinh-nghiem-trekking-nui-mat-than-tuyet-tac-cua-thien-nhien-cao-bang.htm | blog | 20.3.2025 |
| CAO-bao | Báo Cao Bằng: Núi Mắt Thần, otwór do 50 m, najlepsza pora IX–X. | https://baocaobang.vn/Kham-pha-nui-Mat-than-4254.html | prasa | 22.3.2023 |
| CAO-loop | The Loop Tours: dzień trekkingowy na Phja Oắc, 8 godzin. | https://thelooptours.com/news/phia-oac-trekking-trail-a-complete-guide-to-cao-bangs-cloudy-peak-adventure | operator | brak (© 2026) |
| CAO-viator | Opis oferty Viator na travelersuniverse.com: całodniowa wycieczka na Phja Oắc z Cao Bằng, ok. 4 godzin jazdy, od 79 USD. | https://www.travelersuniverse.com/full-day-tour-exploring-in-phia-oac-mountain-ancient-french-villa/ | komercyjne | brak |

## Podsumowanie

| miejsce | werdykt | zastępuje dzień `p` | miesiące wyłączone | źródła |
|---|---|---|---|---|
| saigon | nie | — | — | DT-0819, SG-GYG† |
| mekong | nie | — | — | MK-CD |
| phuquoc | nie | — | — | PQ-VNE, PQ-GYG†, PQ-KK† |
| cattien | tak: noc na stacji strażników przy Bàu Sấu | 2 | VIII–X (propozycja z sezonu; zakazu nie ma) | CT-ceny, CT-zał, CT-prog, CT-www, CT-VNE, CT-2024, SEZ |
| dalat | nie | — | — | BNB-ceny, TROP, LB†, TT-2016, TN-2018, TaNang |
| hoian | nie | — | — | HA-PULL, TT-0910 |
| hue | nie | — | — | ETAPY |
| puluong | tak: szczyt Pù Luông w jeden dzień | 2 | V–IX (propozycja z sezonu; zakazu nie ma) | PL-TT, PL-VNP, PL-VNN, PL-HET, PL-PLT, PL-PLE, PL-HDV, SEZ |
| ninhbinh | nie | — | — | NB-NBTC, ETAPY |
| catba | tak (na razie bez trudnego dnia, decyzja z 10.10.2026): wspinaczka albo DWS z operatorem (warunek: certyfikat) | 4 | VII–IX (zakazy wypłynięć 2023–2026) | CB-CBC, CB-CBV, CB-AO, CB-WC, CB-LS, CB-GCN, CB-253, CB-K1, CB-K2, CB-IS, CB-VT, SEZ |
| hanoi | nie | — | — | TT-0507, TT-0518 |
| babe | nie | — | — (kajaki zakazane od lipca 2026) | BB-P2, BB-ML, BB-HV, BB-TC, BB-0722, BB-1010 |
| caobang | nie | — | — | CAO-wetrek, CAO-bao, CAO-loop, CAO-viator |

## Uzupełnienie 13.10.2026: Cát Bà, trudny dzień

Ponowne sprawdzenie z listy „Do etapu 3” w `notes/etapy.md`: czy Cát Bà dostaje w 2026 roku trudny dzień (wspinaczka albo DWS z operatorem, jak w sekcji „catba” wyżej). Adresy otwarto 13.10.2026. Wyszukiwanie: WebSearch najpierw w trybie „standard”, potem „extended”, po wietnamsku i angielsku; strony miasta Hải Phòng i strefy Cát Hải, parku narodowego, operatorów i prasy. Limit wyszukiwań się nie skończył. Kurs: 1 EUR = 29 055 VND, 1 USD = 25 901 VND (KURS-NBP).

**Werdykt: nie.** Decyzja z 10.10.2026 zostaje: Cát Bà nie ma trudnego dnia, a `p` 4 „Việt Hải i park narodowy” zostaje bez zmian. Ten werdykt zastępuje „tak” z sekcji „catba” i z „Podsumowania” (stan z 10.10.2026). Warunku „operator z uprawnieniami” (sekcja „Jak czytać”) dalej nie da się udokumentować, a przepisy z 2026 roku dopuszczają usługi na zatokach tylko w miejscach dozwolonych przez władze. Czy miejsca do DWS są wśród nich, nie ustaliłem.

- **Uprawnienia operatorów** (strony z 13.10.2026):
  - Cat Ba Climbing: dalej „Fully licensed” bez numeru i organu, ubezpieczenie do 100 mln VND na przypadek (CB-CBC);
  - Asia Outdoors działa (© 2026, jesienne wyjazdy DWS) i pisze, że ma licencję parku narodowego Cát Bà na DWS, bez numeru i daty (CB-AO);
  - Cat Ba Ventures Co., Ltd. sprzedaje cały dzień DWS bez słowa o licencji (CB-CBV);
  - przewodnik komercyjny z 29.8.2026 nazywa Asia Outdoors i Cat Ba Climbing głównymi operatorami, ale nie podaje żadnej licencji (CB-VTCL);
  - **numeru certyfikatu na „leo núi thể thao” (procedura Hải Phòng, CB-GCN), organu ani urzędowej listy firm dalej nie znalazłem.**
- **Przepisy na zatokach od 12.1.2026:** Quyết định 253/2025/QĐ-UBND z 31.12.2025 (CB-253, BHP-0108). Według streszczeń usługi turystyczne na zatokach, także „vui chơi giải trí, thể thao”, wolno prowadzić tylko na trasach, w punktach i obszarach dozwolonych przez władze, a firma musi być legalnie zarejestrowana i spełniać warunki danej usługi. Nadzór ma Ban Quản lý các vịnh thuộc quần đảo Cát Bà (BHP-0108). Przepisy z 2018 roku zaliczały wspinaczkę („leo núi”) i kajaki do usług sportowych na zatokach (CB-QD32).
  - Tekstu decyzji nie przeczytałem: załącznik na portalu Cát Hải ma ponad 10 MB i narzędzie go nie otworzyło (CB-253PDF), thuvienphapluat.vn zwraca 403, a luatvietnam.vn pokazuje treść dopiero po zalogowaniu.
  - Zakazu DWS ani listy miejsc dozwolonych do wspinaczki nie znalazłem.
- **Przewodnik wspinaczkowy:** na prawie wszystkie rejony wokół Cát Bà trzeba mieć przepustkę (1–3 USD od osoby dziennie), a wspinaczka „nie zawsze jest dozwolona” (CB-TOPO).
- **Park narodowy** na swojej stronie nie wymienia wspinaczki ani DWS. Jego długie trasy, np. Mây Bầu – Ao Ếch – Áng Phay – Việt Hải, to 4–5 h marszu (CB-VQG), czyli mniej niż 6–10 h z kryteriów i mniej więcej tyle, co dzisiejszy `p` 4.
- **TCVN 14602:2026** dotyczy tylko hikingu i trekkingu (VNS-0504), więc o wspinaczce i DWS nic nie mówi.
- **Kajaki (zawieszenie od 15.11.2024):**
  - urzędowego komunikatu o zniesieniu dalej nie znalazłem. W wątku „chèo thuyền kayak” w Tuổi Trẻ ostatni tekst o Cát Bà jest z 21.11.2024 (TT-KAYAK). Park zaproponował jesienią 2024 trzy strefy na wodzie dla kajaków i innych usług (Cửa Cái – Minh Tự, Vạn Tà, Ba Đình; BHP-1206), a ich zatwierdzenia nie znalazłem;
  - Indochina Sails dalej pisze, że zawieszenie obowiązuje „od 1.2.2026 do odwołania” na podstawie pisma 483/TB-UBND urzędu powiatu Cát Hải (CB-IS). Powiatu w 2026 roku już nie ma, bo od 2025 roku jest specjalna strefa Cát Hải (uchwała 1669/NQ-UBTVQH15 z 16.6.2025; CB-DK), więc pismo mógł wydać tylko jej urząd. Numeru u źródła urzędowego dalej nie potwierdziłem;
  - operatorzy mimo to sprzedają kajaki: Cat Ba Climbing ma dzień z kajakiem na Lan Hạ i planktonem za 1 500 000 VND (52 EUR; CB-CBC), a Cat Ba Ventures kajak w dniu DWS (CB-CBV). Przewodnik z 11.5.2026 pisze bez źródła, że na Lan Hạ wolno pływać kajakiem samemu (CB-DTV), a wideo z czerwca 2026 pokazuje na zatoce kajaki i SUP, bez słowa o zawieszeniu (AF-0616);
  - **wniosek:** o ile mogę to ustalić, zawieszenie formalnie trwa, a oferty operatorów mu przeczą. To osłabia też ich deklaracje o licencjach. Dzień `p` 2 w `site2/src/content/catba.js` nie obiecuje już kajaka (bambusowa łódź z wioślarzem), więc może zostać.
- **Co zmieniłoby werdykt na „tak”:** operator pokazuje certyfikat miasta Hải Phòng na „leo núi thể thao” z miejscem w Cát Bà (CB-GCN) albo pisemną zgodę parku lub zarządu zatok na miejsca DWS, a tekst decyzji 253/2025 te miejsca dopuszcza. Dzień wyglądałby wtedy jak w sekcji „catba” wyżej: zastępuje `p` 4, więc wchodzi tylko przy 4 nocach, z `off` VII–IX (zakazy wypłynięć, SEZ).
  - Ceny od osoby w 2026 roku: półdniowe DWS 1 150 000 VND (40 EUR) i cały dzień wspinaczki na wyspie 2 585 000 VND (89 EUR) (CB-CBC). Cały dzień DWS obaj operatorzy sprzedają tylko z kajakiem: 2 000 000 VND (69 EUR; CB-CBC) albo 98 USD (87 EUR; CB-CBV).
  - Do ryzyk z sekcji „catba” dochodzą kask przy DWS, minimalny wiek (14 lat według CB-VTCL, 18 albo z rodzicem według CB-LS) i to, że większość zwykłych polis nie obejmuje wspinaczki (CB-VTCL).
- **Przy okazji:** 14.6.2026 na Lan Hạ, w rejonie Vạn Bội, stalowy statek wycieczkowy zderzył się z małą drewnianą łodzią. Jedna osoba zginęła, a obie jednostki miały ważne przeglądy (VNE-0615). To ryzyko każdego dnia na łodzi, także rejsu `p` 2.

Etykiety CB-CBC, CB-CBV, CB-AO, CB-IS i CB-253 są w tabeli „Cát Bà” wyżej. Te strony otworzyłem ponownie 13.10.2026 (strona CB-253 ma datę 10.1.2026). CB-GCN, CB-LS i SEZ są tam bez zmian. Nowe źródła:

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| KURS-NBP | Kurs NBP z tabel A 197/A/NBP/2026 (9.10.2026) i B 040/B/NBP/2026 (7.10.2026): 1 EUR = 29 055 VND, 1 USD = 25 901 VND (etykieta KURS w tamtym pliku). | `research/lotniska-2026-10.md` | własne badanie | 11.10.2026 |
| BHP-0108 | Báo Hải Phòng: nowe zasady turystyki na zatokach Cát Bà od 12.1.2026: usługi tylko w ogłoszonych obszarach i punktach, legalna rejestracja i warunki każdej usługi, nadzór Ban Quản lý các vịnh. | https://baohaiphong.vn/tang-cuong-bao-dam-an-toan-bao-ve-moi-truong-tai-di-san-thien-nhien-the-gioi-cat-ba-532789.html | prasa | 8.1.2026 |
| CB-253PDF | Załącznik do strony CB-253 „QUYET DINH (Ban hanh Quy che quan ly hoat dong du lich tren vinh) 2026-01-06”, prawdopodobnie tekst decyzji 253/2025; plik ma ponad 10 MB i narzędzie go nie otworzyło. | https://cdn.haiphong.gov.vn/gov-hpg/5889/tintuc/2026/1/quyet-dinh-ban-hanh-quy-che-quan-ly-hoat-dong-du-lich-tren-vinh-2026-01-06-41-.signed639036577419825053.pdf | urzędowe | 6.1.2026 (w nazwie załącznika) |
| CB-QD32 | Caselaw.vn, tekst Quyết định 32/2018/QĐ-UBND (zasady turystyki na zatokach Cát Bà): art. 3 ust. 4 zalicza „chèo thuyền kayak, leo núi” do usług sportowych. | https://caselaw.vn/van-ban-phap-luat/319800-quyet-dinh-32-2018-qd-ubnd-ve-quy-che-quan-ly-hoat-dong-du-lich-tren-cac-vinh-thuoc-quan-dao-cat-ba-huyen-cat-hai-thanh-pho-hai-phong | komercyjne (baza przepisów) | 2018, nie obowiązuje od 15.10.2020 |
| BHP-1206 | Báo Hải Phòng: kajaki zawieszone; trzy proponowane strefy na wodzie (Cửa Cái – Minh Tự, Vạn Tà, Ba Đình), wniosek parku w ocenie; bez słowa o wspinaczce. | https://baohaiphong.vn/quan-ly-hoat-dong-vui-choi-giai-tri-duoi-nuoc-tai-khu-du-lich-cat-ba-bao-dam-an-toan-du-khach-507382.html | prasa | 6.12.2024 |
| TT-KAYAK | Tuổi Trẻ, wątek „chèo thuyền kayak”: ostatni tekst o kajakach na Cát Bà z 21.11.2024. | https://tuoitre.vn/cheo-thuyen-kayak.html | prasa | stan z 13.10.2026 |
| CB-DK | Portal Cát Hải, „Giới thiệu đặc khu Cát Hải”: specjalna strefa utworzona uchwałą 1669/NQ-UBTVQH15 z 16.6.2025. | https://cathai.haiphong.gov.vn/dac-khu-cat-hai/gioi-thieu-dac-khu-cat-hai-767181 | urzędowe | 28.7.2025 |
| CB-DTV | Day Trips Vietnam, kajaki na Lan Hạ: „Lan Ha allows independent kayaking”, bez źródła. | https://daytripsvietnam.com/destinations/cat-ba/day-trips/lan-ha-bay-kayaking/ | komercyjne | 11.5.2026 |
| AF-0616 | Afamily (za Đời sống Pháp luật): wideo z tłumem kajaków i SUP na zatoce Lan Hạ, bez słowa o zawieszeniu. | https://afamily.vn/canh-tuong-o-vinh-lan-ha-cat-ba-khien-nhieu-nguoi-bat-ngo-thot-len-khong-tin-vao-mat-minh-236260616161347516.chn | prasa | 16.6.2026 |
| CB-VTCL | Vietnamtourism.com, wspinaczka w Hạ Long i na Cát Bà: operatorzy, ceny, sezon XI–IV, kask przy DWS, DWS od 14 lat, większość zwykłych polis nie obejmuje wspinaczki; bez licencji. | https://www.vietnamtourism.com/en/rock-climbing-in-vietnam-ha-long-bay-cat-ba-and-where-to-book | komercyjne | 29.8.2026 |
| CB-TOPO | TheTopo (dawniej 27Crags), Butterfly Valley: przepustki na prawie wszystkie rejony wokół Cát Bà, 1–3 USD dziennie, „Climbing is dangerous and not always permitted”. | https://www.thetopo.com/crags/butterfly-valley-cat-ba-vietnam | przewodnik wspinaczkowy (serwis społeczności) | brak (© 2026) |
| CB-VQG | Park Narodowy Cát Bà, „Các hoạt động du lịch”: trasy 1–2 h i 4–5 h (Mây Bầu – Ao Ếch – Áng Phay – Việt Hải); bez wspinaczki, DWS i kajaków. | https://vuonquocgiacatba.com.vn/cac-hoat-dong-du-lich | urzędowe (park) | 23.4.2026 |
| VNS-0504 | Viet Nam News: norma TCVN 14602:2026 „Adventure tourism – Hiking and trekking activities – Requirements and recommendations”. | https://vietnamnews.vn/life-style/1780612/new-national-standard-aims-to-rein-in-risks-in-adventure-tourism.html | prasa | 4.5.2026 |
| VNE-0615 | VnExpress: zderzenie statku Minh Anh z łodzią Bảy Hoa w rejonie Vạn Bội 14.6.2026, jedna ofiara, obie jednostki z ważnymi przeglądami. | https://vnexpress.net/nhan-chung-vu-tau-chim-o-vinh-lan-ha-chi-kip-nghe-coi-canh-bao-hai-giay-5085991.html | prasa | 15.6.2026 |

## Uzupełnienie 14.10.2026: Cát Bà, kajaki i Cannon Fort

Stan na 14.10.2026, sprawdzony przed publikacją (WebSearch i WebFetch, po wietnamsku i angielsku; adresy otwarto 14.10.2026). Względem „Uzupełnienia 13.10.2026” nic się nie zmieniło.

- **Kajaki:** urzędowego zniesienia zawieszenia dalej nie ma. Armator pisze, że zawieszenie na podstawie pisma 483/TB-UBND obowiązuje od 1.2.2026 do odwołania w całej zatoce Lan Hạ, razem z jaskiniami Sáng – Tối (CB-2026-10-14a). Teksty promocyjne, także w prasie, opisują kajaki jak zwykłą atrakcję, bez podstawy prawnej (CB-2026-10-14b, CB-2026-10-14c).
- **Dozwolone miejsca:** urzędowej listy miejsc do pływania kajakiem nie ma. Zatwierdzenia trzech stref zaproponowanych w 2024 roku (Cửa Cái – Minh Tự, Vạn Tà, Ba Đình; BHP-1206) dalej nie widać, a tekstu decyzji 253/2025/QĐ-UBND nadal nie udało się przeczytać (CB-253PDF).
- **Cannon Fort (Pháo đài Thần Công):** komunikatu o ponownym otwarciu nie ma. Najnowsze źródła z datą, które opisują stan, mówią, że fort nie przyjmuje turystów i można najwyżej poprosić strażnicę o wejście (CB-VW i CB-NV w `research/plany-dni-2026-10.md`, CB-2026-10-14d). Portal komercyjny z 30.5.2026 opisuje fort jak czynny punkt widokowy z biletem 40 000 VND (CB-2026-10-14e), ale tę samą cenę podawały teksty z 2023 roku, a ten portal bywa niedokładny (`research/hagiang-2026-10.md`, „Jak czytać”).
- **Skutek:** dzień `p` 1 bez fortu i dzień `p` 2 bez kajaka zostają bez zmian.

| etykieta | opis | adres | rodzaj | data |
|---|---|---|---|---|
| CB-2026-10-14a | Indochina Sails: zawieszenie kajaków na podstawie pisma 483/TB-UBND urzędu Cát Hải, od 1.2.2026 do odwołania, cała zatoka Lan Hạ z jaskiniami Sáng – Tối; zawieszenie dalej obowiązuje; dozwolonych stref brak. | https://www.indochinasails.com/en/blog/kayak-suspension-enhanced-bamboo-boat-experience-in-lan-ha-bay.html | operator | brak (© 1993–2026) |
| CB-2026-10-14b | Bhaya Cruises: kajaki opisane jako dostępne; strefy mogą się zmieniać, trzeba trzymać się tras ustalonych przez władze w 2026 roku; bez decyzji i bez zawieszenia. | https://bhayacruises.com/blog/lan-ha-bay/ | operator | 13.4.2026, aktualizacja 17.7.2026 |
| CB-2026-10-14c | Báo Văn hóa o sezonie 2026 na Cát Bà: kajak o zachodzie słońca na Lan Hạ wśród atrakcji; o zawieszeniu i o forcie nic. | https://baovanhoa.vn/du-lich/dieu-gi-se-tao-nen-con-sot-du-lich-cat-ba-nam-2026-216267.html | prasa | 1.4.2026 |
| CB-2026-10-14d | Lữ hành Việt Nam: fort nie przyjmuje już turystów, można poprosić strażnicę; usług brak; dawny bilet 40 000 VND. | https://luhanhvietnam.com.vn/du-lich/phao-dai-than-cong-cat-ba.html | blog (portal komercyjny) | 18.5.2023 |
| CB-2026-10-14e | vietnamtourism.com (portal komercyjny bez wydawcy): fort jako punkt widokowy z kawiarnią, bilet 40 000 VND; kajaki bez przewodnika po opłacie 40 000 VND w pływających domach, o zawieszeniu nic. | https://www.vietnamtourism.com/vi/nhung-ieu-nen-lam-tren-ao-cat-ba-cam-nang-ay-u-nam-2026 | blog (portal komercyjny) | aktualizacja 30.5.2026 |
