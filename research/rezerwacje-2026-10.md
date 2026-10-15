# Rezerwacje: wyprzedzenie i linki (sprawdzone 11.10.2026)

**Do czego:** dane do listy „Zarezerwuj wcześniej” w sekcji „Przed wyjazdem” (plan 2B). Dla każdej rzeczy z trasy plik mówi, z jakim wyprzedzeniem ją zarezerwować poza szczytem i w szczycie oraz gdzie to zrobić. Klucze (`flights`, `catba.cruise` i inne) to nazwy pozycji listy. Wszystkie linki są zebrane w jednym miejscu, w tabeli „Zestawienie”. Adresy otwarto 11.10.2026 (poza oznaczonymi †, zob. „Jak czytać”), późniejsze zmiany nie są uwzględnione. Ceny podaję tylko tam, gdzie pomagają wybrać operatora. Budżet ma osobny research.

- **Wynik:**
  - **Najwcześniej trzeba zarezerwować:**
    - noc nad Bàu Sấu: 2–4 tygodnie, w święta co najmniej miesiąc;
    - loty krajowe: ok. 3 tygodnie. Bilety na Tết 2027 przewoźnicy sprzedają od 25.08 i 28.08.2026;
    - rejs z Cát Bà i noclegi u gospodarzy: 1–2 tygodnie, w szczycie 3–6 tygodni, a rejs na Tết 1–2 miesiące.
  - **Bez rezerwacji:**
    - bilet do Đại Nội: kasa albo bilet elektroniczny w dniu wizyty;
    - łódź na jeziorze Ba Bể: na przystani albo przez gospodarzy.
  - **Linki:** w zestawieniu jest 31 adresów i wszystkie odpowiadają kodem 200.
    - Google Flights i 12Go nie wchodzą na listę (sekcje `flights` i `transfer`).
    - Trzy rzeczy zostają bez linku, bo załatwiają je gospodarze: przewodnik w Pù Luông, łódź na Ba Bể i noclegi u gospodarzy.
    - Lang Biang ma tylko kontakt do parku, bo nie wiadomo, czy szlak na szczyt jest otwarty.
- **Znaleziska do tekstów miejsc:**
  - **Cát Tiên:** ośrodek ratowania naczelnych Dao Tiến jest zamknięty i nie ma daty otwarcia (CT-VNE, aktualizacja 25.05.2026). Spokojna wersja dnia p 2 w Cát Tiên prowadzi właśnie tam.
  - **Pù Luông:** jaskinię Hang Dơi w Kho Mường zamknięto 12.09.2026, bo spadają w niej kamienie (PL-HD). Dzień p 2 w Pù Luông mówi o „wiosce Kho Mường z jaskinią”.
  - **Huế:** oficjalna strona Centrum Ochrony Zabytków Huế potwierdza godziny kas Đại Nội podane w dniu p 1 (sekcja `hue.citadel`).
  - **Cát Bà:** programy obu sprawdzonych rejsów nadal obiecują kajaki, choć kajaki na zatokach są zawieszone.
- **Ograniczenie:** w trakcie pracy skończył się limit wyszukiwań tej sesji, wspólny dla wszystkich równoległych zadań. Późniejsze ustalenia pochodzą z otwierania znanych adresów. Przez to nie wszystko udało się ustalić, zob. „Jak czytać”.

## Jak czytać

- **Wyprzedzenie** to czas przed dniem usługi, w którym warto już mieć rezerwację. Wtedy miejsce będzie z dużym prawdopodobieństwem, a przy lotach także rozsądna cena. Podaję dwie wartości:
  - **poza szczytem**;
  - **w szczycie**, z nazwami szczytów, których dotyczy.
- **Szczyty w tym pliku:**
  - Tết: w 2027 dni wolne 4–10.02, sam Tết 6.02; ruch rośnie ok. tydzień przed i po (SW);
  - Boże Narodzenie i Nowy Rok: ok. 20.12–2.01;
  - wakacje wietnamskie VI–VIII nad morzem;
  - złote tarasy w Pù Luông, IX–X i V–VI (w danych strony ok. 25.09–10.10 i 25.05–15.06);
  - długie weekendy 30.04–1.05 i 2.09.

  Gdy źródła wskazują własny szczyt miejsca (np. IX–XI w Cao Bằng), dopisuję go.
- **Źródło wyprzedzenia:** zalecenie przewoźnika, operatora, parku albo rzetelnego przewodnika. Gdzie go nie ma, piszę „szacunek” i metodę, np. liczbę miejsc, obłożenie w święta albo próg „późnej rezerwacji” u operatora.
- **Kolumna „dni”** w zestawieniu to jedna liczba do sortowania listy od najpilniejszej. To wyprzedzenie poza szczytem w dniach, a przy przedziale jego górna granica (np. 1–2 tygodnie = 14). 0 znaczy: na miejscu, bez rezerwacji.
- **Wybór operatora** (kryteria z pierwowzoru):
  - siedziba na miejscu, czyli adres biura w danym mieście;
  - własna strona z rezerwacją albo kontaktem;
  - świeże dobre opinie: liczba i daty najnowszych, ze źródłem;
  - licencja turystyczna, jeśli operator ją podaje. Numery przepisuję ze stron operatorów. Rejestru urzędu turystyki nie dało się przeszukać tym narzędziem.

  Wybieram 1–2 operatorów na rzecz, z uzasadnieniem i z listą odrzuconych. Pośrednik (Baolau, Vexere) wchodzi tylko tam, gdzie nie ma lepszej drogi: przy autobusach, limuzynach i transferach.
- **Linki:**
  - Są bez parametrów śledzących i partnerskich, w wersji kanonicznej.
  - Kod odpowiedzi sprawdziłem 11.10.2026 jednym poleceniem: `curl -s -o /dev/null -w '%{http_code}' -L -A 'Mozilla/5.0' URL`.
  - Kody 202 i 403 znaczą, że serwer odrzuca klienta bez przeglądarki. Nie mówią więc, czy strona działa.
  - Kod 302 znaczy przekierowanie w kółko, np. na stronie głównej zabytków Huế. Dlatego linkuję tam podstrony.
  - Kod 000 znaczy brak połączenia, np. przy wygasłym certyfikacie.
  - Przy aplikacjach JavaScript (Google Flights, sklep z biletami w Huế) kod 200 mówi tylko, że adres odpowiada. Treści narzędzie nie odczytało.
- **Źródła:**
  - Etykieta w nawiasie, np. FL-VTC, prowadzi do sekcji „Źródła”.
  - SW, TD i PD to własne notatki: `research/swieta-2026-10.md`, `research/trudne-dni-2026-10.md` i `research/plany-dni-2026-10.md`. Zapis „PD: LB-VNP” oznacza źródło LB-VNP z tamtej notatki.
  - **†** oznacza treść widoczną tylko w wynikach wyszukiwania, bo strona nie otworzyła się dla narzędzia (403).
- **Ograniczenie tej sesji:** limit wyszukiwań skończył się w trakcie pracy, więc część rzeczy jest słabiej udokumentowana. Szczegóły są przy rzeczach. Do uzupełnienia w kolejnej sesji:
  - Đường Lâm: biura z wycieczką i obiadem u rodziny, bilet wstępu do wsi;
  - lekcje gotowania w Trà Quế: porównanie szkół i opinie;
  - noclegi u gospodarzy w Phong Điền i Khuổi Ky: liczba domów i rezerwacja online;
  - ceny łodzi na Ba Bể;
  - Lang Biang: wyszukiwanie po wietnamsku o otwarciu szlaku na szczyt;
  - opinie z TripAdvisora (403 dla narzędzia);
  - Daytrip (403) i rezerwacja przejazdu z wyprzedzeniem w Grab;
  - termin sprzedaży biletów FUTA na Tết 2027;
  - druga wypożyczalnia motocykli Hội An → Huế;
  - adres strony Sun PhuQuoc Airways.

## Od planu B2 (decyzja z 15.10.2026)

Linie „Zarezerwuj wcześniej” mówią tylko, co zarezerwować, z jakim wyprzedzeniem (i w szczycie), ile to kosztuje i gdzie (linki z tabeli „Zestawienie”). Z dodatków zostały te, które chronią albo zmieniają plan: licencja biura przy Fansipanie, szlaku Tà Năng–Phan Dũng i pętli Hà Giang, pierwszeństwo nocujących na nocnej przejażdżce w Cúc Phương i drugi termin przy paralotni. Poza stroną zostają tu i w notatkach miejsc:
- kanały kontaktu: telefon, Zalo, e-mail, WhatsApp, formularz rezerwatu Pù Luông, „w ośrodku Paradise Cave”, „przez gospodarzy”, „przez hotel”, „przez park albo nocleg”, „w wypożyczalni w mieście”, „odbierasz go w biurze wypożyczalni”, „bezpośrednio u gospodarzy”;
- liczba pokoi i miejsc: 13 pokoi w domu gościnnym parku Yok Đôn, ok. 19 miejsc nad Bàu Sấu, grupy do 10 osób przy słoniach i to, że miejsc jest tyle, ile słoni w programie;
- dane o zdrowiu, które Oxalis zbiera 45 dni przed wyprawą do Hang Én;
- „Bilet kupisz w kasie albo online” przy Mỹ Sơn;
- szczyt „30.04–1.05, 2.09” przy szlaku Tà Năng–Phan Dũng, który w V–X jest wyłączony (zostają weekendy I–IV, Tết i 30.04).

Linia aut z lotnisk mówi „z lotniska albo na lotnisko” zamiast „na dalekie drogi z lotnisk”, bo obejmuje też krótkie drogi, np. Buôn Ma Thuột – Yok Đôn (1,25 h).

## flights: loty krajowe

- **Wyprzedzenie poza szczytem:** ok. 3 tygodnie, żeby trafić dobrą cenę. Wolne miejsca są zwykle jeszcze kilka dni przed lotem. **Szacunek.** Metoda:
  - eksperci radzą rezerwować 3–6 tygodni przed lotem, a na trasach ponad 1000 km co najmniej 3 tygodnie (FL-BVH1, rada na lato);
  - poza szczytem popyt jest mniejszy. Nawet 11 dni przed długim weekendem 2.09.2026 główne trasy były zajęte w 42–69%, a Hà Nội–TP.HCM poniżej 39% (dane Cục Hàng không, FL-VNE2).
- **Wyprzedzenie w szczycie:**
  - **Tết 2027:** od razu, 2–3 miesiące przed. Tę liczbę wyciągam z danych, przewoźnicy jej nie podają.
    - Grupa Vietnam Airlines sprzedaje bilety na Tết od 25.08.2026: ok. 3,7 mln miejsc, szczyt od 22.01 do 20.02.2027. Przewoźnik zaleca rezerwować wcześnie (FL-VTC).
    - Vietjet sprzedaje od 28.08.2026 ok. 3,1 mln miejsc, w tym ok. 2 mln na trasach krajowych (FL-TP).
    - Tết 2026 dla porównania: 11.12.2025, ok. 10 tygodni przed świętem, loty były zajęte w 70–80%. Vietjet nie miał już miejsc na 12–15.02 (FL-VNEC).
    - Ruch skupia się w ok. 7 dniach przed Tết i po nim. Przed świętem ludzie lecą na północ, po nim na południe (FL-VNE1).
  - **30.04–1.05:** co najmniej 6 tygodni. W 2026, 40 dni przed długim weekendem, kończyły się bilety w dobrych godzinach do Phú Quốc, Nha Trang i Đà Nẵng. Część tras Vietnam Airlines była zajęta w 50–70% (FL-BVH2). Liczbę wyciągam z danych.
  - **VI–VIII:** 3–6 tygodni (FL-BVH1). Latem 2026 bilety na popularnych trasach były o 10–30% droższe niż rok wcześniej.
  - **2.09:** 2–4 tygodnie na głównych trasach, wcześniej na małe lotniska. 11 dni przed długim weekendem 2026 Hà Nội–Chu Lai była zajęta w 100%, TP.HCM–Tuy Hòa w 99%, a TP.HCM–Côn Đảo w 98% (FL-VNE2). **Szacunek** z tych danych.
  - **Nowy Rok:** 4–6 tygodni. **Szacunek.** Metoda: rada 3–6 tygodni (FL-BVH1) i wyprzedany lot z Phú Quốc do Hà Nội na 4.01.2026. Vietnam Airlines dołożył wtedy prawie 270 lotów (FL-TBTC). O dniach 24–26.12 danych nie mam.
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://www.vietnamairlines.com/ | loty Vietnam Airlines oraz Pacific Airlines i VASCO z tej samej grupy (FL-VTC) | oficjalny (przewoźnik) | 200 |
  | https://www.vietjetair.com/ | loty Vietjet | oficjalny (przewoźnik) | 200 |
  | https://www.vietravelairlines.com/ | loty Vietravel Airlines | oficjalny (przewoźnik) | 200 |

  Adres Vietnam Airlines przekierowuje według kraju i języka. Przy stronie Vietravel Airlines curl dał 200, ale WebFetch odrzucił jej certyfikat. Przed publikacją warto ją otworzyć w przeglądarce.
- **Porównywarka (Google Flights): nie.**
  - Google pisze, że nie pokazuje wszystkich linii i lotów, bo wymaga partnerstwa z przewoźnikiem (FL-GH). Vietjet sprzedaje tam od 2019 roku (FL-VOV). Obecności Vietravel Airlines nie potwierdziłem.
  - Kliknięcie prowadzi zwykle na stronę linii albo biura podróży (FL-GH), czyli czasem do pośrednika. Linków wyjściowych nie da się sprawdzić bez przeglądarki.
  - Sam adres https://www.google.com/travel/flights jest czysty i daje 200. To jednak aplikacja JavaScript, więc kod nie dowodzi, że wyszukiwarka działa.
  - Trzy linki przewoźników pokrywają prawie cały rynek lotów rozkładowych. Do porównania godzin wystarczy wzmianka w tekście, bez linku. Pierwowzór miał Google Flights na liście (PIERW).
- **Uwagi:**
  - **Vietravel Airlines** sprzedaje bilety na własnej stronie (FL-VU2). Lata krajowo m.in.:
    - Hà Nội–TP.HCM, do 5 lotów dziennie;
    - TP.HCM–Đà Nẵng i Hà Nội–Đà Nẵng, po 2 dziennie (FL-VU1);
    - Hà Nội–Đà Lạt od 15.09.2026, raz dziennie (FL-VU2).
  - **Bamboo Airways** od 1.08.2026 nie ma na stronie lotów rozkładowych i lata tylko czartery (FL-QH1, FL-QH2). To potwierdza ustalenie z `research/polaczenia-2026-10.md`.
  - **Sun PhuQuoc Airways** to nowy przewoźnik. Sprzedawał już bilety na 30.04–1.05.2026, m.in. na trasach do Phú Quốc (FL-BVH2). Adresu strony nie potwierdziłem: sunphuquocairways.com daje 403.

## transfer: autobusy i minibusy typu limousine

- **Wyprzedzenie poza szczytem:** 1–2 dni. Na trasach z 3–4 kursami dziennie 2–3 dni: Hà Nội–Pù Luông, Pù Luông–Ninh Bình, Ninh Bình–Cát Bà i Hà Nội–Cao Bằng. **Szacunek.** Metoda:
  - liczba kursów w Baolau na 16.10.2026 (TR-BL4). Hà Nội–Ninh Bình ma kurs co ok. 30 minut, a Hà Nội–Cát Bà ok. 9 kursów dziennie;
  - sprzedaż online kończy się 2–24 h przed odjazdem, zależnie od przewoźnika (TR-BL1).
- **Wyprzedzenie w szczycie:**
  - **Tết:** w dniu otwarcia sprzedaży.
    - Na Tết 2026 przewoźnik z Hà Nội do Hà Tĩnh otworzył sprzedaż miesiąc wcześniej. Bilety na ostatni tydzień przed Tết zniknęły pierwszego dnia (FL-VNE1).
    - Część kursów z TP.HCM do środkowego Wietnamu wyprzedała się w kilka godzin (FL-VNE1).
    - 6.02.2026 Phương Trang i Chín Nghĩa nie miały już biletów do środkowego Wietnamu na ostatnie dni przed Tết. Ceny w szczycie wolno było podnieść o 40–60% (TR-TT).
    - 11.10.2026 sprzedaży na Tết 2027 jeszcze nie ogłoszono (TR-VXR1). Baolau przyjmuje rezerwacje 30–90 dni naprzód, zależnie od przewoźnika (TR-BL1).
  - **VI–VIII (zwłaszcza do Cát Bà), 30.04–1.05, 2.09 i 20.12–2.01:** ok. tydzień. **Szacunek.** Metoda:
    - z Hà Nội do Cát Bà jest ok. 9 kursów dziennie (TR-BL4);
    - przewodnik po wyspie pisze, że w weekendy i święta wyprzedają się bilety na promy kupowane na miejscu (CB-VTW).

    Źródeł o wyprzedanych busach w te dni nie znalazłem.
  - **Złote tarasy w Pù Luông:** 1–2 tygodnie. **Szacunek.** Metoda: z Hà Nội są 3 kursy dziennie, minibusami na 7–8 osób (TR-BL4).
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://www.baolau.com/en/destinations/vietnam | bilety po angielsku; trasy mają stałe adresy bez parametrów, np. https://www.baolau.com/en/s/Hanoi/Cat-Ba/bus | pośrednik | 200 |
  | https://vexere.com/en-US | trasy, których nie ma w Baolau | pośrednik (wietnamski) | 200 |
  | https://futabus.vn/ | TP.HCM–Cần Thơ oraz TP.HCM–Đà Lạt z wysiadaniem w Phú Lâm, ok. 25 km od Cát Tiên | operator (przewoźnik Phương Trang) | 200 |

- **Wybór:**
  - **Pośrednik zamiast przewoźnika:** na północy busy wożą małe firmy, m.in. Trang An Limousine, The Long Travel i Expats Way Travel (TR-BLD). Ich własnych stron nie sprawdzałem. Pośrednik zbiera je w jednym miejscu i sprzedaje bilety po angielsku, więc tu jest najlepszą drogą.
  - **Baolau:**
    - strona po angielsku, opłata 35 000 VND (ok. 5%) za bilet autobusowy;
    - karty Visa, Mastercard, American Express, JCB i UnionPay (TR-BL1);
    - ma 8 z 12 naszych tras. Brakuje Hà Nội–Ba Bể, Cao Bằng–Ba Bể i dojazdów do Cát Tiên. Ich adresy dają 200, ale pokazują stronę główną, więc kod nie dowodzi, że trasa istnieje.
  - **Vexere:**
    - wersja angielska;
    - płatność kartą Visa, Mastercard albo JCB, portfelem elektronicznym albo w biurze przewoźnika (TR-VXR2);
    - 10 przewoźników na trasie do Cát Bà (TR-VXR1). Pokrycia Ba Bể i Cát Tiên nie sprawdziłem.
  - **FUTA (Phương Trang):** jedyny przewoźnik z własną sprzedażą online na naszych trasach na południu.
    - Strona jest tylko po wietnamsku, a metod płatności nie ustaliłem.
    - Dowóz z Phú Lâm do Cát Tiên trzeba zgłosić przy zakupie biletu (TR-CT).
- **Odrzuceni:**
  - **12Go:** strona https://12go.asia/en/vietnam/transport daje 200, ale nie pokazuje naszych tras. Strona https://12go.asia/en/travel/vietnam i strony tras dają 202, czyli wyzwanie zapory. Pokrycia nie da się więc sprawdzić. Pierwowzór używał 12Go (PIERW).
  - **The Sinh Tourist:** online sprzedaje tylko kierunek Huế → Hội An i tylko co najmniej 3 dni przed odjazdem. Bilety Open Bus są wyłącznie w biurach (TR-SINH1, TR-SINH2).
- **Uwagi:**
  - Green SM Liên Tỉnh wozi wspólnymi autami na trasach Hà Nội–Ninh Bình, Huế–Hội An i TP.HCM–Cần Thơ, za 150 000–250 000 VND od osoby (AP-GSM1). Opis jest w sekcji `airport`.
  - Do Cát Tiên z TP.HCM jeżdżą lokalni przewoźnicy pod bramę parku. Z Đà Lạt jedzie się autobusem do Tân Phú i dalej taksówką albo autobusem pod sam park (TR-CT).

## airport: długie transfery z lotnisk samochodem z kierowcą

Odcinki w danych: Nội Bài–Cát Bà (4 h), Nội Bài–Ninh Bình (2,25 h), Tân Sơn Nhất–Cát Tiên (3,75 h), Tân Sơn Nhất–Phong Điền (3,5 h), a także Nội Bài–Pù Luông, Nội Bài–Ba Bể i Nội Bài–Cao Bằng (`research/polaczenia-2026-10.md`).

- **Wyprzedzenie poza szczytem:** 2–3 dni. **Szacunek.** Metoda:
  - sprzedaż online w Baolau kończy się 2–24 h przed przejazdem (TR-BL1);
  - Green SM potwierdza przejazd w 15 minut do godziny (AP-GSM1);
  - nocleg zamawia auto razem z rezerwacją, np. Pù Luông Retreat pyta o transport w formularzu rezerwacji (AP-PLR).
- **Wyprzedzenie w szczycie:** w Tết 3–4 tygodnie, w innych szczytach ok. tydzień. **Szacunek.** Metoda:
  - autobusy na Tết wyprzedają się w dniu otwarcia sprzedaży (FL-VNE1, TR-TT);
  - w święta i Tết nie obowiązują pakiety cenowe Green SM (GSM-TOUR);
  - Saigontourist radzi rezerwować auto z kierowcą 1–2 tygodnie przed świętami, Tết i latem (CG-SGT).
- **Najlepsza droga: przez nocleg.** Hotel albo gospodarze zamawiają auto z lotniska. To pierwsza droga dla Cát Bà, Pù Luông, Ba Bể, Cao Bằng, Cát Tiên i Phong Điền. Przykład: Pù Luông Retreat pyta w formularzu rezerwacji o transport i odbiera gości z lotniska Thọ Xuân (AP-PLR). Park Cát Tiên sam transferu nie organizuje (TR-CT). Ta droga nie ma linku.
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://www.baolau.com/en/destinations/vietnam | prywatne przejazdy autem z rezerwacją po angielsku, m.in. Hà Nội–Ninh Bình i TP.HCM–Cần Thơ | pośrednik | 200 |
  | https://www.greensm.com/vn-vi/green-lien-tinh | całe auto na 6 miejsc: Hà Nội–Ninh Bình 1 080 000 VND, TP.HCM–Cần Thơ 1 240 000 VND | operator (dawne Xanh SM) | 200 |

- **Zastrzeżenia:**
  - **Baolau:** strona Wietnamu nie pokazuje odbioru z lotniska (TR-BLD). Trzeba go sprawdzić przy rezerwacji.
  - **Green SM Liên Tỉnh** (AP-GSM1):
    - trasy nie obejmują lotnisk;
    - odbiór do 5 km od punktu zbiórki jest w cenie, za dalszy odcinek dolicza się taksometr;
    - rezerwacja w aplikacji, przez infolinię 1555 albo Zalo;
    - płatność po przejeździe, strona tylko po wietnamsku.

    Adres xanhsm.com przekierowuje na greensm.com.
- **Odrzuceni:**
  - **Grab:** strony Grab w Wietnamie nie opisują rezerwacji z wyprzedzeniem ani przejazdów do innej prowincji (AP-GR1). Wynajem na godziny działa bez rezerwacji i musi skończyć się w mieście odbioru (GRAB-RENT).
  - **Green SM Green Tour:** można go zamówić do 30 dni naprzód, ale przejazd do innej prowincji musi być w obie strony (GSM-TOUR).
  - **Green SM Green Airport:** strona nie podaje zasad rezerwacji z wyprzedzeniem (AP-GSM2).
  - **Daytrip** (daytrip.com, mydaytrip.com): curl i WebFetch dostają 403, więc oferty nie da się sprawdzić.
  - **Lokalne firmy transferowe z własną stroną** na Nội Bài–Cát Bà i Tân Sơn Nhất–Cát Tiên: nie znalazłem żadnej (limit wyszukiwań).

## catba.cruise: rejs 2 dni/1 noc z Cát Bà

- **Wyprzedzenie poza szczytem:** 1–2 tygodnie. **Szacunek.** Metoda:
  - Cat Ba Ventures uznaje rezerwację na mniej niż tydzień przed rejsem za późną i żąda wtedy pełnej płatności (CB-CBVW);
  - przewodnik po rejsach z Cát Bà pisze, że w niskim sezonie (V–IX) wystarczy tydzień, a w X–IV na popularne łodzie radzi 2–4 tygodnie (CB-VTR);
  - łodzie są małe: Cat Ba Ventures bierze grupy do 18 osób (CB-CBV2D).
- **Wyprzedzenie w szczycie:**
  - **Weekendy VI–VIII, 30.04–1.05, 2.09 i 20.12–2.01:** 3–4 tygodnie. **Szacunek.** Metoda:
    - przewodnik po rejsach radzi w sezonie 2–4 tygodnie (CB-VTR);
    - przewodnik po wyspie pisze, że latem wyspa jest pełna turystów krajowych, a w Tết, 30.04 i 2.09 promy są zatłoczone i noclegi drożeją dwukrotnie (CB-VTW).
  - **Tết:** 1–2 miesiące (CB-VTR).
  - VII–IX to też pora zakazów wypłynięć przy sztormach (TD, sekcja „catba”).
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/ | rejs, który zawija do Việt Hải; formularz „Book Now” | operator | 200 |
  | https://catbaventures.com/cat-ba-tours/lan-ha-bay-ha-long-bay-bai-tu-long-bay-boat-trip-kayaking-2-days-1-night.html | program 2 dni/1 noc, cena, kontakt | operator | 200 |

  Full Moon stoi pierwszy, bo tylko on zawija do Việt Hải (`gem` w tekście Cát Bà). Pierwowzór linkował u Cat Ba Ventures ogólną stronę rejsów z kajakami (PIERW). Ten adres nadal daje 200, ale nowy prowadzi wprost do programu 2 dni/1 noc.
- **Operatorzy:**
  1. **Full Moon Travel Asia:**
     - **biuro:** miasteczko Cát Bà, 213 Một Tháng Tư; drugie biuro jest w Hà Nội (CB-FM);
     - **program:** odbiór o 11:30 z biura i łódź z przystani Bến Bèo. Drugiego dnia o 8:00 jazda rowerem 5 km do Việt Hải, a o 12:00 zejście na ląd. Cena 130 USD (przekreślone 155), dopłata do jedynki 35 USD za kabinę za noc (CB-FM);
     - **opinie:** na stronie wycieczki 7 opinii, średnio 5,0, najnowsze z 29.08.2026 i 8.01.2026 (CB-FM). Na TripAdvisorze ok. 560 opinii i ocena 4,8, stan z 2025 roku (CB-TA-FM†). Liczba 1269 z pierwowzoru to licznik w stopce całej strony, nie tej wycieczki;
     - **licencja:** strona podaje tylko numer rejestracji firmy 0201897823, to nie jest licencja turystyczna;
     - **zwroty:** przy rezygnacji ponad 48 h przed wyjazdem 75% minus opłaty. Pełny zwrot, gdy zarząd zatoki odwoła rejsy przed wyjazdem (CB-FM).
  2. **Cat Ba Ventures:**
     - **biuro:** 223 Một Tháng Tư w miasteczku Cát Bà (CB-CBV2D);
     - **program:** zbiórka o 11:30 w biurze, koniec o 12:00 drugiego dnia. Trasa przez Đầu Bê, bez Việt Hải. Cena 142 USD za osobę, dopłata do jedynki 65 USD (CB-CBV2D);
     - **opinie:** TripAdvisor daje 403. W wynikach wyszukiwania widać ocenę 4,9 i opinie z IV i IX 2026 (CB-TA-CBV†). Liczby ok. 3,7 tys. opinii z pierwowzoru nie potwierdziłem;
     - **licencja:** strona jej nie podaje;
     - **warunki** (CB-CBVW):
       - zaliczka 30–50%;
       - przy rezygnacji klienta zwrot zaliczki 70%, 50% albo 30%, gdy do rejsu zostaje ponad 25, 15 albo 7 dni; później bez zwrotu;
       - gdy firma odwoła rejs z powodu pogody albo stanu morza, klient wybiera nowy termin albo pełny zwrot.

  Żaden z nich nie pisze osobno o mgle ani o zakazie wypłynięć.
- **Odrzuceni:**
  - **Asia Outdoors:** według wyników wyszukiwania prowadzi tylko rejsy jednodniowe (CB-AO†), a strona nie odpowiada (000);
  - **Hanoi Eco Tour:** biuro w Hà Nội, sprzedaje rejsy innych firm (CB-HET†);
  - **łodzie Sunlight i Jewel Island z Bến Bèo:** jest tylko opis z 2019 roku (CB-AUT†);
  - **Amanda Cruise i Le Journey:** duże statki z wyższej półki; skąd wypływają, nie sprawdzałem;
  - **z pierwowzoru, bez ponownego sprawdzenia:** Cat Ba Du Ky (3 opinie), GetYourGuide i Viator (pośrednicy), Cat Ba Panorama (tylko wycieczki jednodniowe).
- **Kajaki:** usługi kajakowe na zatokach archipelagu Cát Bà są zawieszone od 15.11.2024 (TD). 27.11.2025 Amanda Cruise pisze, powołując się na pismo 483/TB-UBND, że zawieszenie trwa (CB-AM). Komunikatu o wznowieniu nie znalazłem. Mimo to oba programy wciąż mają kajaki:
  - Cat Ba Ventures: 1,5–2 h pierwszego dnia (CB-CBV2D);
  - Full Moon: o 14:00 przez jaskinie Sáng–Tối (CB-FM).

  Tekst dnia p 2 kajaków nie obiecuje. Przy rezerwacji warto zapytać, co je zastępuje.

## Cát Tiên

### cattien.bausau_night: noc na stacji strażników nad Bàu Sấu

- **Wyprzedzenie poza szczytem:** 2–4 tygodnie, w dni robocze bywa krócej, 1–2 tygodnie. **Szacunek.** Metoda:
  - na stacji jest miejsce dla ok. 19 osób (TD);
  - park przyjmuje rezerwacje tylko telefonicznie, przez Zalo i e-mailem (CT-KONT);
  - w weekendy w parku jest tłoczno (CT-VT);
  - jedyna wprost podana rada to „co najmniej miesiąc wcześniej”, bez podziału na sezony (CT-MIA, 2023).
- **Wyprzedzenie w szczycie:** co najmniej miesiąc na Tết, 30.04–1.05 i 2.09 (CT-MIA i szacunek).
  - W te dni pokoje, auta i przewodnicy w parku są droższe o 20% (TD, cennik parku).
  - Według operatora wycieczek w święta brakuje aut i przewodników (CT-JB).
  - O 20.12–2.01 danych nie ma. **Szacunek:** też miesiąc, bo to pora sucha, czyli główny sezon parku.
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://cattiennationalpark.com.vn/lien-he/ | rezerwacja telefonem, przez Zalo albo e-mailem | oficjalny (park) | 200 |
  | https://cattiennationalpark.com.vn/bang-gia-dich-vu/ | cennik noclegów i usług (PDF) | oficjalny (park) | 200 |

- **Kontakt (CT-KONT):** tel. (+84) 2513 669 228, Zalo (+84) 856 669 228, cattienvietnam@gmail.com. Strona nie ma formularza rezerwacji ani godzin pracy.
- **Zasady noclegu (CT-VNE, aktualizacja 25.05.2026):**
  - wyjazd z siedziby do 13:00 rowerem albo do 14:00 autem;
  - wyjazd znad Bàu Sấu następnego dnia do 9:30;
  - namioty są zabronione;
  - nocleg kosztuje według cennika pokoi parku.

  Limitu, zaliczki ani wymaganego wyprzedzenia park nie publikuje.
- **Zarządca:**
  - uchwała rządu 188/NQ-CP z 16.07.2026 przekazuje park z ministerstwa rolnictwa i środowiska pod władze miasta Đồng Nai, bez zmian w strukturze i kadrach (CT-188a, CT-188b);
  - daty przekazania nie znalazłem;
  - domena strony się nie zmieniła, a w stopce nadal jest logo ministerstwa;
  - adres parku na stronie występuje w trzech różnych wersjach (CT-KONT).

### cattien.park: gibony o świcie, wędrówka do Bàu Sấu, nocne safari

- **Wyprzedzenie poza szczytem:** przy zameldowaniu, najpóźniej dzień wcześniej.
  - **Gibony:** zapis w centrum dla zwiedzających, przeprawa łodzią ok. 4:45 (CT-VT), więc najpóźniej dzień wcześniej (**szacunek**).
  - **Wędrówka do Bàu Sấu:** wyjazd autem przed 11:00, rowerem przed 10:00 (CT-VNE). Zapis i bilet trzeba załatwić przed wejściem (CT-MIA). **Szacunek:** dzień wcześniej, bo park musi przydzielić auto i przewodnika.
  - **Nocne safari:** park radzi zapisać się wcześnie, bo miejsc jest mało (CT-VNE). **Szacunek:** wystarczy przy zameldowaniu.
- **Wyprzedzenie w szczycie:** w weekendy, w Tết, 30.04–1.05 i 2.09 zgłoś wszystkie trzy usługi razem z noclegiem, 1–2 tygodnie wcześniej, przez Zalo albo e-mailem. **Szacunek.** Metoda: w święta brakuje aut i przewodników (CT-JB), a w weekendy i w Tết jest tłoczno (CT-VT).
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://cattiennationalpark.com.vn/lien-he/ | rezerwacja telefonem, przez Zalo albo e-mailem | oficjalny (park) | 200 |
  | https://cattiennationalpark.com.vn/xem-thu-dem/ | opis nocnego safari | oficjalny (park) | 200 |

- **Rezerwuj w parku, nie w hotelu:**
  - niektóre hotele biorą za spacer do gibonów 1,2 mln VND, a w parku kosztuje on 650 000 VND (CT-VT);
  - gdy pierwsza próba się nie uda, park daje drugą bez opłaty (CT-VT);
  - to źródło jest słabe: podaje nieaktualną opłatę za Bàu Sấu (60 000 zamiast 250 000 VND), a spaceru do gibonów nie ma na stronie parku.
- **Ceny (CT-VNE):**
  - Bàu Sấu: wstęp 250 000 VND za osobę, auto 640 000 VND dla 1–7 osób, przewodnik 450 000 VND za 5 h;
  - nocne safari: 150 000 VND za osobę przy co najmniej 4 osobach, 200 000 VND przy 3 osobach i 500 000 VND dla jednej osoby.

  Według strony parku safari jedzie codziennie od 18:30, trwa ok. godziny, ma 12 km i odbywa się odkrytym autem (CT-SAF, 1.02.2023).
- **Dao Tiến:** ośrodek ratowania naczelnych na wyspie Tiên jest zamknięty i nie ma daty otwarcia („hiện đóng cửa và chưa có thời điểm mở trở lại”, CT-VNE, aktualizacja 25.05.2026). Spokojna wersja dnia p 2 w Cát Tiên prowadzi do niego łodzią, więc trzeba ją zmienić.

## Đà Lạt

### dalat.bidoup: przewodnik w parku Bidoup–Núi Bà

- **Wyprzedzenie poza szczytem:** 2–3 dni. **Szacunek.** Metoda:
  - park nie podaje terminu, ale formularz pyta o datę przyjazdu (DL-FORM);
  - transport na trasę trzeba zgłosić wcześniej, a wyjście jest o 8:00–8:30 z centrum dla zwiedzających (DL-HG).
- **Wyprzedzenie w szczycie:** 1–2 tygodnie na Tết, 30.04–1.05, 2.09, VI–VIII i 20.12–2.01. **Szacunek.** Metoda: rada Saigontourist dla aut z kierowcą w szczycie (CG-SGT). O limitach parku danych nie ma.
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://bidoupnuiba.gov.vn/lien-he/ | telefony i e-maile parku i jego centrum turystyki | oficjalny (park) | 200 |
  | https://bidoupnuiba.gov.vn/dat-tour | formularz zapytania o termin (z CAPTCHA) | oficjalny (park) | 200 |
  | https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/ | cennik | oficjalny (park) | 200 |

- **Kontakt (DL-KONT):**
  - siedziba: tel. (0263) 3502005, vqgbdnb@lamdong.gov.vn;
  - Zalo i infolinia: 0947 047 449;
  - centrum turystyki parku, „Trung tâm Dịch vụ Du lịch và Khoa học”: tel. (0263) 3747449, bidouptour@gmail.com, Tiểu khu 97, xã Lạc Dương;
  - biuro w Đà Lạt: 22 Pasteur, phường Xuân Hương.
- **Ceny (DL-CENY, od 1.01.2024):** Hòn Giao, 1 dzień: 290 000 VND, w cenie bilet, przewodnik, obiad, woda i ubezpieczenie. Pół dnia: 150 000 VND.
- **Zmiany w 2026:** w wiadomościach parku do 9.10.2026 nie ma zamknięć tras ani nowych cen (DL-NEWS). Minimalnej grupy strona nie podaje.

### dalat.langbiang: przewodnik na Lang Biang

- **Czy szlak na szczyt jest otwarty w X 2026:** nie da się ustalić.
  - **Formalnie zawieszony:** park Bidoup–Núi Bà zawiesił trasę pieszą na Núi Bà (2167 m) 31.10.2024. Otwarcie zapowiedział „przy sprzyjającej pogodzie” (PD: LB-VNP; LB-TT24).
  - **Brak komunikatu o otwarciu:** nie ma go w wiadomościach parku z VIII–X 2026 (DL-NEWS) ani w indeksie tematu „Langbiang” w Tuổi Trẻ, którego najnowszy wpis jest z 12.07.2026 (LB-TTtag).
  - **Sygnały niejednoznaczne:**
    - Tuổi Trẻ 12.07.2026 opisuje rodzinę, która latem 2026 „zdobyła” drogę na szczyt Langbiang, długą na prawie 12 km. Artykuł nie mówi, czy chodzi o leśną ścieżkę na Núi Bà, czy o drogę na punkt widokowy (LB-TT26);
    - przewodniki z 2026 opisują wejście jako czynne, z obowiązkowym przewodnikiem (PD: LB-MH, LB-JB).
  - **Trasa parku „Tuyến LANGBIANG 1 ngày”** to wędrówka do wodospadu Thiên Thai z centrum dla zwiedzających, 36 km od Đà Lạt, a nie wejście na szczyt (LB-PARK).
- **Wyprzedzenie:** jak przy Bidoup, 2–3 dni, ale dopiero gdy park potwierdzi, że szlak jest otwarty. W szczycie 1–2 tygodnie. **Szacunek.**
- **Link:** tylko kontakt do parku, żeby zapytać o szlak: https://bidoupnuiba.gov.vn/lien-he/ (oficjalny, 200). Linku do biura nie daję, bo nie ustaliłem, kto ma zgodę parku na tę trasę. Organizowanie wycieczek w lesie bez zgody zarządcy jest karane (TD, „Ramy prawne 2026”).
- **Do zrobienia:** wyszukiwań po wietnamsku o otwarciu szlaku („mở lại tuyến leo núi Langbiang”) nie wykonałem, bo skończył się limit.

## Pù Luông

### puluong.summit: wejście na szczyt Pù Luông

- **Wyprzedzenie poza szczytem:** 3–7 dni. **Szacunek.** Metoda: formularz obiecuje kontakt w 30 minut (PL-FORM), ale rezerwat musi zorganizować przewodnika i tragarzy z wioski, jedzenie i namiot, a liczbę gości ogranicza (PL-TT, PL-VNP).
- **Wyprzedzenie w szczycie:** 2–3 tygodnie na złote tarasy, 30.04–1.05, 2.09 i weekendy. **Szacunek.** Metoda: limit gości i pełne obłożenie noclegów w Pù Luông w te święta (HS-PL24, HS-PL26).
- **Link:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform | zgłoszenie wejścia: cel (m.in. szczyt Pù Luông i wzgórze Pú Dia), brama wejścia (bản Pù Luông albo bản Báng), daty, przewodnik, posiłki, namiot | oficjalny (formularz rezerwatu) | 200 |

- **Dlaczego to formularz rezerwatu:**
  - Tuổi Trẻ podaje krótki adres https://forms.gle/hPYKNzFEqQEseeKGA jako zapis na trasę. Obok wymienia zapis na miejscu w centrum ochrony przyrody rezerwatu i telefon 0968 123 336 (PL-TT);
  - krótki adres przekierowuje na ten formularz i dokleja parametr `usp`, którego w linku wyżej nie ma;
  - formularz wskazuje stronę baotonpuluong.vn i tę samą infolinię, czynną codziennie 7:00–17:00 (PL-FORM);
  - pyta o narodowość, więc przyjmuje też cudzoziemców (PL-FORM).
- **Nie linkować:** https://baotonpuluong.vn/ ma wygasły certyfikat (curl 000).
- **Czego nie ustaliłem:**
  - opłat i wielkości grupy;
  - czy wersja jednodniowa z VietnamPlus (PL-VNP) nadal działa. Tuổi Trẻ opisuje tylko 2 dni/1 noc (PL-TT).

  W 2026 nie było nowych artykułów o trasie w indeksach Tuổi Trẻ i VietnamPlus.

### puluong.guide: przewodnik od gospodarzy

- **Wyprzedzenie poza szczytem:** najpóźniej dzień wcześniej, u gospodarzy. **Szacunek.** Metoda: noclegi sprzedają wędrówki jako dodatek ze stałą godziną startu. Przykład: wyjście o 8:30 spod domu, z lokalnym przewodnikiem, obiadem, transportem i biletami w cenie (PL-EG). Żaden nocleg nie podaje minimalnego wyprzedzenia.
- **Wyprzedzenie w szczycie:** razem z rezerwacją noclegu, na złote tarasy, weekendy, 30.04–1.05 i 2.09. **Szacunek:** noclegi są wtedy pełne (HS-PL24, HS-PL26). O braku przewodników źródła nie piszą.
- **Link:** bez linku. Przewodnika załatwia się tym samym kanałem co nocleg.
- **Ceny „od”, dla orientacji:**
  - Pù Luông Natura w Bản Đôn: wodospad Hiêu 19 USD, Hiêu ze spływem bambusową tratwą 22 USD (PL-NAT);
  - Pù Luông Boutique Garden: pół dnia prywatnie, z przewodnikiem mówiącym po angielsku, 25 USD (PL-BG);
  - Pù Luông Retreat: długa wędrówka 15–20 km, ok. 8 h (PL-RET).
- **Hang Dơi:** jaskinia w Kho Mường jest zamknięta od rana 12.09.2026 do odwołania, bo spadają w niej kamienie i ziemia. Zamknęła ją gmina Pù Luông na wniosek zarządu rezerwatu (PL-HD). Natura i Eco Garden wciąż mają ją w ofercie (PL-NAT, PL-EG). Dzień p 2 mówi o „wiosce Kho Mường z jaskinią”.

## babe.boat: łódź i przewodnik nad jeziorem Ba Bể

- **Wyprzedzenie poza szczytem:** bez rezerwacji: na przystani albo przez gospodarzy dzień wcześniej. **Szacunek.** Metoda: do ruchu dopuszczono 144 łodzie (BB-144), pływają nimi miejscowi (BB-PN), a żadne źródło nie mówi o rezerwacji z wyprzedzeniem.
- **Wyprzedzenie w szczycie:** przez gospodarzy przy rezerwacji noclegu, najpóźniej 1–3 dni wcześniej: latem, na 30.04–1.05, 2.09 i Tết. Wikivoyage podaje VIII–IX jako najbardziej zatłoczone miesiące (BB-WV). **Szacunek**, ta sama metoda.
- **Link:** bez linku. Łódź i przewodnika załatwiają gospodarze. Oficjalnej strony parku nie znalazłem. Odrzucone adresy:
  - https://babenationalpark.com.vn/ (200): prywatne biuro Ba Be National Park Travel Co., Ltd. (licencja 06-001/2022/TCDL-GP) na domenie, która wygląda jak strona parku. Nadal sprzedaje kajaki i kąpiel (BB-ML);
  - https://babenationalparktour.com/ (200): wietnamska Wikipedia podaje ją jako stronę parku (BB-WIKI), a to strona z tekstem zastępczym „lorem ipsum” i linkami do kasyn (BB-FAKE).
- **Kto prowadzi łodzie** (BB-BEN):
  - sześć przystani: Đầu Đẳng, Kéo Slưu, Buốc Lốm, brzeg południowy, brzeg północny i Pác Ngòi;
  - zgoda obowiązuje od 21.08.2026 do 10.01.2028;
  - działalność nadzoruje zarząd parku narodowego, a łodzie mieszczą do 12 pasażerów.

  Spółdzielni przewoźników nie znalazłem.
- **Zakaz:** od 7.07.2026 do odwołania na jeziorze nie wolno:
  - pływać kajakami, deskami SUP, łodziami dmuchanymi i tratwami;
  - kąpać się ani skakać do wody.

  Łodzie pasażerskie pływają, poza złą pogodą (BB-ZAK, BB-GM).
- **Czego nie ustaliłem:** cen łodzi i przewodnika w 2026 oraz telefonu parku po połączeniu prowincji Bắc Kạn z Thái Nguyên.

## Cao Bằng

### caobang.car: samochód z kierowcą na pętlę

- **Wyprzedzenie poza szczytem:** 3–7 dni. **Szacunek.** Metoda: w mieście tylko jedno biuro ma w ofercie auto z ceną (CAO-ECO2), a drugie wycenia auto na zapytanie (CAO-GR3). Żadne źródło nie podaje liczby dni.
- **Wyprzedzenie w szczycie:** 2–4 tygodnie. **Szacunek.**
  - Dotyczy sezonów w Cao Bằng: od połowy IX do połowy XI i od III do połowy V (CAO-GR3). Do tego 30.04–1.05, 2.09 i Tết.
  - Green Riders zaleca wtedy wczesną rezerwację, bez liczby dni (CAO-GR3). LocalVietnam radzi rezerwować wcześniej w sezonie i w święta (CAO-LV2).
  - Dla VI–VIII i 20.12–2.01 źródła nie wskazują szczytu w Cao Bằng.
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://caobangecotravel.com/3-days-2-nights-tour/ | pętla 3 dni z autem (wariant „Car”), formularz rezerwacji | operator | 200 |
  | https://caobanggreenriders.com/ | auto albo van na zapytanie | operator | 200 |

- **Cena w Eco Travel (CAO-ECO2):**
  - pętla 3 dni z autem, za osobę: 7 210 000 VND przy 1 osobie, 4 960 000 przy 2, 4 210 000 przy 3 i 3 835 000 przy 4;
  - w cenie posiłki, 2 noclegi u gospodarzy w sali wieloosobowej, bilety i lokalny przewodnik; bez ubezpieczenia.

  Strona jest niespójna. Obok „Incl. vehicle rental” wśród dodatkowych opłat stoi „Car: 60$/day”. Przewodnik mówiący po angielsku kosztuje dodatkowo 15 USD dziennie. Przy rezerwacji trzeba zapytać, co jest w cenie.
- **Green Riders:** auto albo van są dostępne, ale „relatively costly”, bez ceny na stronie (CAO-GR3).

### caobang.easyrider: przewodnik na motocyklu (easy rider)

- **Start:** w mieście Cao Bằng, nie w Hà Nội. Oba lokalne biura zaczynają pętlę w mieście (CAO-ECO2, CAO-GR5).
- **Wyprzedzenie poza szczytem:** 3–7 dni. **Szacunek.** Metoda: liczba kierowców nie jest znana, Eco Travel bierze grupy do 8 osób (CAO-ECO4), a operatorzy nie podają liczby dni (CAO-GR3, CAO-LV1).
- **Wyprzedzenie w szczycie:** 2–3 tygodnie, w tych samych okresach co przy aucie. **Szacunek.**
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://caobangecotravel.com/3-days-2-nights-tour/ | pętla 3 dni z easy riderem (wariant „Easyrider”) | operator | 200 |
  | https://caobanggreenriders.com/tours | wycieczki 1–8 dni za kierowcą motocykla albo samodzielnie | operator | 200 |

- **Ceny:**
  - Eco Travel: 4 810 000 VND za osobę za 3 dni, z paliwem, posiłkami, noclegami, biletami i przewodnikiem, bez ubezpieczenia (CAO-ECO2);
  - Green Riders: ceny ustalane na miejscu (CAO-GR1).

### caobang.moto: wypożyczalnia motocykli w Cao Bằng

- **Wyprzedzenie poza szczytem:** 1–3 dni. **Szacunek.** Metoda: Eco Travel ma ponad 200 motocykli z 2024 roku i nowszych (CAO-ECO4). Green Riders ma 12 modeli i nie bierze przedpłaty (CAO-GR2, CAO-GR3).
- **Wyprzedzenie w szczycie:** 1–2 tygodnie. **Szacunek.** Green Riders zaleca wczesną rezerwację od połowy IX do połowy XI i od III do połowy V, bez liczby dni (CAO-GR3).
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://caobanggreenriders.com/rental | cennik i wyposażenie | operator | 200 |
  | https://caobangecotravel.com/motorbike/ | cennik, oddanie w innym mieście | operator | 200 |

- **Ceny za dzień:**
  - Green Riders: Wave 110 180 000 VND, Future 125 270 000 VND, Winner 150 300 000 VND, XR150 550 000 VND. Ubezpieczenie kosztuje 80 000–350 000 VND dziennie. Pokrywa szkody motocykla i transport do Cao Bằng, ale nie leczenie ani szkody wobec innych (CAO-GR2, CAO-GR3);
  - Eco Travel: Wave 180 000 VND, Future 280 000 VND, XR150L 550 000 VND, XR190L 700 000 VND. Ubezpieczenie kosztuje 50% stawki. Motocykl można oddać w Hà Giang, Hà Nội albo Sa Pa za dopłatą, a bagaż firma wysyła osobno (CAO-ECO3).
- **Prawo jazdy według operatorów** (przepisy bada osobny research planu 2B):
  - Green Riders wymaga prawa jazdy na motocykl z kraju pochodzenia i międzynarodowego prawa jazdy, ale pisze, że tego nie egzekwuje (CAO-GR3);
  - Eco Travel chce dowodu osobistego, prawa jazdy albo paszportu (CAO-ECO1).

### Operatorzy w Cao Bằng

1. **Cao Bang Eco Travel Co., Ltd.** (auto, easy rider, motocykle):
   - **biuro:** 234 tổ 30, phường Nùng Trí Cao, Cao Bằng. Strona ma formularz rezerwacji, telefon, WhatsApp i e-mail (CAO-ECO2, CAO-ECO4);
   - **licencja:** na turystykę międzynarodową nr 04-0009/2026/CDLQGVN-GP LHQT z 11.03.2026. Rejestracja firmy: 4800951065 z 6.01.2026 (CAO-ECO4);
   - **historia:** działa od 2015 roku, gdy założyciele otworzyli u siebie nocleg (CAO-ECO4);
   - **opinie:** TripAdvisor daje 403. Ich nocleg w Hostelworld ma 185 opinii, ocenę 8,7 i najnowsze opinie z VII i VIII 2026 (CAO-ECO5);
   - **pętla 3 dni** obejmuje wszystkie punkty z naszych dni: Mã Phục, Ngườm Ngao, nocleg w Khuổi Ky, Bản Giốc, Pác Bó, Núi Mắt Thần i Thang Hen (CAO-ECO2);
   - **rezygnacja:** strona obiecuje „48 hour no hassle cancellation”, bez szczegółów (CAO-ECO2).
2. **Cao Bang Green Riders Co., Ltd.** (easy rider, motocykle, auto na zapytanie):
   - **biuro:** nr 260, tổ 30, phường Nùng Trí Cao (Nà Can); zbiórka w Green Riders House, 35 tổ 23 (CAO-GR4, CAO-PT). Strona ma przycisk „Book Now”;
   - **licencja:** nr 04-0011/2026/CDLQGVN-GP LHQT z 27.08.2026. Rejestracja firmy: 4800653972 z 15.04.2026 (CAO-GR4);
   - **opinie:** na stronie 18 opinii z Google, bez dat (CAO-GR1). Strona z linkami partnerskimi podaje dla wycieczki z easy riderem ocenę 5,0, raz przy 11, a raz przy 51 opiniach (CAO-PT);
   - **płatność:** bez przedpłaty, płaci się w dniu startu (CAO-GR3).
- **Odrzuceni:**
  - **LocalVietnam** (localvietnam.com): ma prywatną wycieczkę z lokalnym kierowcą, ocenę 4,8/5 ze 183 opinii i odznakę Travellers' Choice 2025 na własnej stronie. Nie ma jednak biura w Cao Bằng ani podanego adresu i licencji (CAO-LV1, CAO-LV2). Zostaje jako zapas na auto;
  - **Lokalee:** pośrednik, nie podaje operatora, start autobusem z Hà Nội, bez zwrotów (CAO-LOK);
  - **The Loop Tours** (Loop Hostel w Cao Bằng): jeździ inną trasą, na zachód przez Bảo Lạc. Sprzedaje przez Expedię, a własnej strony nie znalazłem (CAO-EXP†);
  - **biuro z Ba Bể** (mrlinhadventure.com, 403), **The Loop Cao Bang** i **Bong Backpacker Hostel:** wymienia je tylko przewodnik bez wydawcy, bez adresów (CAO-VT).

## Przełęcz Hải Vân

### haivan.car: samochód z kierowcą Hội An → Huế przez przełęcz

- **Wyprzedzenie poza szczytem:** 1–3 dni. **Szacunek.** Metoda: trasę ma w ofercie co najmniej pięć firm z własną stroną. Hoi An Transport Service przyjmuje rezerwacje w ostatniej chwili, gdy ma wolne auto, ale radzi rezerwować wcześniej (HV-HTS2).
- **Wyprzedzenie w szczycie:** 1–2 tygodnie na Tết, 30.04–1.05 i 2.09. W święta Hoi An Day Trip dolicza 100 000 VND od osoby (HV-HDT1). Dla 20.12–2.01 i VI–VIII źródła nie mam. **Szacunek.**
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://hoiantransportservice.com/hoi-an-hue-private-car/ | stała cena za auto, postoje w Lăng Cô i na przełęczy | operator | 200 |
  | https://hoiandaytrip.com/da-nang-to-hue-private-transfer/ | przejazd przez przełęcz; start w Đà Nẵng, odbiór z Hội An na zapytanie | operator | 200 |

- **Wybrany: Hoi An Transport Service.**
  - **adres:** Cẩm Sơn, Hội An, bez numeru domu (HV-HTS1, HV-HTS4). Rezerwacja przez stronę i WhatsApp;
  - **opinie:** licznik na własnej stronie pokazuje 162 opinie w Google i ocenę 5,0, bez dat (HV-HTS4). Good Morning Hội An poleca firmę, ale ma na stronie jej reklamę (HV-GMH);
  - **licencja:** strona nie podaje licencji ani numeru rejestracji;
  - **cena** (HV-HTS1):
    - 1 650 000 VND za auto na 4 miejsca (do 3 osób), 1 750 000 VND za auto na 7 miejsc (do 5 osób);
    - w cenie opłaty drogowe, paliwo, parking, woda, kierowca mówiący po angielsku i odbiór z hotelu;
    - bez zaliczki, płatność w dniu przejazdu.

    Na innej podstronie ten sam przejazd kosztuje 1 350 000 albo 1 450 000 VND (HV-HTS3), więc cenę trzeba potwierdzić;
  - **postoje:** w Lăng Cô i przy Hải Vân Quan, po 20–30 minut. Z postojami przejazd trwa ok. 5–6 h (HV-HTS1);
  - **rada operatora:** przejechać przełęcz przed 11:00, bo po południu częściej wisi nad nią chmura (HV-HTS1).
- **Drugi: Hoi An Day Trip.**
  - **za:** biuro przy 03 Nguyễn Tri Phương w Hội An, licencja 49-136/2024/CDLQGVN-GP LHQT, rejestracja 4001274508 z 26.10.2023 (HV-HDT2);
  - **przeciw:**
    - przejazd startuje w Đà Nẵng, a odbiór z Hội An nie ma ceny;
    - wycieczki przez przełęcz mają cenę „From $0”, a przy produkcie nie ma opinii;
    - lista świąt z dopłatą podaje daty Tết 2025, więc strona nie jest aktualizowana (HV-HDT1, HV-HDT3).
- **Odrzuceni:**
  - Hidden Land Travel: auto z Huế, cena „from 65” USD tylko na liście, bez licencji. Zostaje jako zapas (HV-HL3);
  - Hoi An Private Car: bez adresu, licencji i opinii (HV-HPC);
  - Go365: biuro internetowe z Nha Trang (HV-G365).
- **Uwaga do tekstu przejazdu:** żaden operator nie pisze, że przy chmurach kierowca jedzie tunelem. HTS opisuje tunel tylko jako szybszą drogę, która omija górę (HV-HTS1).

### haivan.moto: motocykl w jedną stronę Hội An → Huế

- **Wyprzedzenie poza szczytem:** 2–3 dni. **Szacunek.** Metoda: jedyna potwierdzona wypożyczalnia z oddaniem w Huế przywozi motocykl do hotelu i przewozi bagaż, a terminu nie podaje (HV-HL1).
- **Wyprzedzenie w szczycie:** 1–2 tygodnie na 20.12–2.01, 30.04–1.05, 2.09 i VI–VIII. Na Tết 2–3 tygodnie, z potwierdzeniem, że wypożyczalnia wtedy pracuje. **Szacunek.**
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://hiddenlandtravel.com/rental/hoi-an-to-hue-motorbike-rental/ | wynajem w jedną stronę z dowozem motocykla do hotelu | operator | 200 |
  | https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike | wynajem w jedną stronę Đà Nẵng–Huế | operator | 200 |

- **Wybrany: Hidden Land Travel.**
  - **biura:**
    - Huế: 24A kiệt 11 Lý Thường Kiệt; w nagłówku strony inny adres, 35D Chu Văn An;
    - Đà Nẵng: 54/43 Lê Hữu Trác;
    - Hội An: strona pisze tylko „Plz contact” (HV-HL1, HV-HL2). Przewodnik komercyjny podaje adres 200 Lê Thánh Tông i pisze, że firma specjalizuje się w wynajmie w jedną stronę (HV-MIA, 6.08.2026);
  - **licencja i opinie:** licencji nie podaje. TripAdvisor daje 403, a na stronie są zrzuty opinii bez dat;
  - **warunki** (HV-HL1):
    - motocykl przywożą do hotelu w Hội An, zwrot jest w biurze w Huế;
    - bagaż kosztuje 50 000 VND za sztukę i jedzie do biura w Huế, nie do hotelu;
    - kaucja: 300 USD za motocykl albo paszport lub bagaż;
    - „No renting to the first time rider”;
    - paliwo płaci się osobno;
    - o prawie jazdy i ubezpieczeniu strona nie pisze;
    - cennik jest w obrazkach, których narzędzie nie odczytało. Przewodnik podaje 120 000–200 000 VND za dzień (HV-MIA).
- **Warunkowo: Tigit Motorbikes.**
  - biuro w Đà Nẵng (113 Lê Văn Duyệt), wynajem w jedną stronę Đà Nẵng–Huế;
  - w Huế jest tylko hotel partnerski i „service is limited” (HV-TG1, artykuł z 18.08.2018);
  - dopłata za oddanie w innym miejscu nie ma podanej kwoty;
  - kaucja: blokada 100 USD na karcie i 50 USD przy odbiorze (HV-TG2).

  Start jest w Đà Nẵng, nie w Hội An.
- **Odrzuceni:**
  - **Style Motorbikes** (Hội An, 171 Cửa Đại): wynajem w jedną stronę tylko między własnymi sklepami, a Huế nie ma na ich liście (HV-ST1, HV-ST2). Przewodnik pisze jednak o biurze w Huế (HV-GMH);
  - **Motorvina:** wygasły certyfikat, strona się nie otwiera (000; HV-MV);
  - **Hoi An Day Trip i Le Family Riders:** tylko jazda z kierowcą;
  - **Viator:** pośrednik, a oferta jedzie tylko z Huế do Hội An (HV-VIA†).
- **Prawo jazdy według Style Motorbikes**, gdyby firma weszła w grę (HV-ST1):
  - powyżej 50 cm³ wymaga wietnamskiego prawa jazdy, krajowego z międzynarodowym według konwencji z 1968 roku albo prawa jazdy z kraju ASEAN;
  - do 150 cm³ firma sprawdza to „not strict”.

  Przepisy bada osobny research planu 2B.

## homestay: noclegi u gospodarzy

- **Pù Luông (Bản Đôn, Kho Mường):**
  - **pojemność i obłożenie:**
    - w gminie jest 67 obiektów na ok. 2800 miejsc (PL-VNP);
    - w długi weekend 30.04–1.05.2024 noclegi były zajęte przez 5 dni, przy ok. 3200 gościach na dobę (HS-PL24);
    - 2.09.2026 obłożenie w Pù Luông wyniosło 100% (HS-PL26);
  - **wyprzedzenie:** poza szczytem w dni robocze kilka dni, na weekend 1–2 tygodnie. W szczycie, czyli na złote tarasy, 30.04–1.05, 2.09 i weekendy w tym czasie: 4–6 tygodni. **Szacunek** z pełnego obłożenia w święta przy znanej pojemności;
  - **online:** noclegi w Bản Đôn mają własne formularze, WhatsApp i Zalo, a Pù Luông Natura pokazuje opinie z Booking.com i Agody (PL-EG, PL-NAT, PL-RET). Dla Kho Mường tego nie ustaliłem.
- **Ba Bể (Pác Ngòi):**
  - **pojemność:**
    - ponad 30 z ok. 90 domów we wsi przyjmuje gości (BB-PN);
    - nad jeziorem jest ok. 78 noclegów, głównie u gospodarzy;
    - w I kwartale 2026 przyjechało ok. 16 600 gości (BB-144);
  - **wyprzedzenie:** poza szczytem kilka dni, w szczycie (lato, długie weekendy, Tết) 2–3 tygodnie. **Szacunek:** dużo miejsc wobec ruchu, ok. 180 gości dziennie w I kwartale;
  - **online:** rezerwacji online nie ustaliłem.
- **Phong Điền:** wyprzedzenia nie ustaliłem. Oficjalny portal turystyczny Cần Thơ ma listę 18 noclegów, ale bez tych w Phong Điền (HS-CT). Na Tết **szacunek** 4–6 tygodni, przez analogię do Pù Luông. To słaba podstawa.
- **Khuổi Ky:**
  - liczby domów nie ustaliłem;
  - według Wikivoyage przy wodospadzie są tylko proste noclegi, często ze wspólną łazienką. To strefa przygraniczna, więc paszport trzeba mieć przy sobie (HS-WV);
  - portal turystyczny Cao Bằng z 2019 roku wymienia wieś jako planowany punkt turystyki wiejskiej (HS-CB);
  - na weekendy w sezonie (IX–XI) i na święta **szacunek** 2–4 tygodnie, bo to mała wieś z niewieloma miejscami;
  - pętla Eco Travel ma nocleg w Khuổi Ky (CAO-ECO2). Przy pętli z biurem nocleg załatwia biuro.
- **Wyprzedzenie zbiorczo** (do zestawienia):
  - poza szczytem 1–2 tygodnie, a w dni robocze w Pù Luông i Ba Bể wystarczy kilka dni;
  - w szczycie: Pù Luông 4–6 tygodni, Ba Bể i Khuổi Ky 2–4 tygodnie.
- **Linki:** bez linków. Urzędowe listy nie obejmują tych noclegów, a platform rezerwacyjnych nie polecam jako jedynej drogi. Tekst na stronie: rezerwuj bezpośrednio u gospodarzy (strona, WhatsApp, Zalo), a w Pù Luông od razu z przewodnikiem.

## saigon.cangio: samochód z kierowcą na dzień do Cần Giờ

- **Wyprzedzenie poza szczytem:** 1–2 dni, na weekend 2–3 dni. Saigontourist wymaga co najmniej 2 dni (CG-SGT). Green SM pozwala zamówić auto od ręki albo do 30 dni naprzód (GSM-TOUR). Wartość na weekend to **szacunek**.
- **Wyprzedzenie w szczycie:** 1–2 tygodnie na święta, Tết i lato (CG-SGT: „Mùa cao điểm (lễ, Tết, hè) nên đặt trước 1 – 2 tuần”).
  - O 20.12–2.01 danych nie ma. **Szacunek:** tydzień.
  - W święta i Tết pakiety cenowe Green SM nie obowiązują i płaci się według licznika (GSM-TOUR).
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://www.greensm.com/vn-vi/green-tour | auto z kierowcą w pakietach godzin i kilometrów, rezerwacja w aplikacji do 30 dni naprzód | operator | 200 |
  | https://xedulich.saigontourist.net/ | wycena auta z kierowcą, odpowiedź w 30 minut | operator | 200 |
  | https://www.grab.com/vn/transport/rent/ | wynajem na godziny bez rezerwacji, zapas w dniu wyjazdu | operator | 200 |

- **Wybrani:**
  1. **Green SM** (dawne Xanh SM), GSM-TOUR:
     - jawny cennik dla auta podstawowego: 10 h i 125 km za 1 500 000 VND, 12 h i 150 km za 1 800 000 VND, plus opłaty drogowe;
     - czas ponad pakiet kosztuje 1000 VND za minutę, a każde 25 km liczy się jak godzina;
     - infolinia 1555;
     - strona nie mówi, którego miasta dotyczy tabela cen.

     Cần Giờ leży w granicach TP.HCM, więc reguła „do innej prowincji tylko w obie strony” go nie dotyczy.
  2. **Saigontourist** (Lữ hành Saigontourist, 08 Đồng Khởi, TP.HCM), CG-SGT:
     - auta na 4–45 miejsc;
     - umowa z warunkami rezygnacji przed wpłatą zaliczki;
     - cena na zapytanie, infolinia 1900 1808.
  - **Grab jako zapas:** wynajem na godziny działa bez rezerwacji. Kurs musi skończyć się w mieście odbioru, a Cần Giờ należy do TP.HCM. Przedłużyć można najwyżej o 4 h (GRAB-RENT).
- **Odrzuceni:**
  - Mai Linh: strona nie podaje szczegółów ani cen wynajmu (CG-ML);
  - Vinasun: strona nie odpowiada (000);
  - wycieczki grupowe Saigontourist: 11.10.2026 nie ma w nich Cần Giờ;
  - pośrednicy: niepotrzebni, bo operatorzy sprzedają bezpośrednio.
- **Prom i most:**
  - prom Bình Khánh kursuje, a przeprawa trwa 15–20 minut (CG-PROM, 24.03.2026);
  - w święta i Tết na prom czeka nawet ok. 50 tys. osób dziennie, ponad dwa razy więcej, niż prom przewozi (CG-PROM23, 2023). Wtedy trzeba wyjechać wcześnie rano;
  - most Cần Giờ: budowę symbolicznie zaczęto w styczniu 2026. 13.09.2026 studium wykonalności było poprawiane, a daty otwarcia nie ma (CG-MOST).

## hanoi.duonglam: wycieczka do Đường Lâm

- **Co jest do zarezerwowania:** auto z kierowcą na dzień albo wycieczka z biurem. Wieś leży ok. 50 km na zachód od Hà Nội, w okręgu Sơn Tây, czyli w granicach miasta (DLM-WIKI, ostatnia edycja 5.10.2026).
- **Wyprzedzenie poza szczytem:** 1–2 dni. **Szacunek.** Metoda: to ta sama usługa co w Cần Giờ. Saigontourist wymaga co najmniej 2 dni na auto z kierowcą (CG-SGT), a Green SM przyjmuje zamówienia od ręki albo do 30 dni naprzód (GSM-TOUR).
- **Wyprzedzenie w szczycie:** 1–2 tygodnie na święta, Tết i lato. **Szacunek** z rady Saigontourist dla aut z kierowcą (CG-SGT).
- **Link:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://www.greensm.com/vn-vi/green-tour | auto z kierowcą na pakiet godzin i kilometrów; droga tam i z powrotem to ok. 100 km, więc mieści się w pakiecie 10 h/125 km | operator | 200 |

- **Odrzucone:** duonglamvillage.com (200) nazywa się „oficjalną stroną informacji i usług” wsi (DLM-SITE). Nie podaje jednak, kto ją prowadzi. Link do biletów online ma parametr śledzący (`utm_source`). Strona ma też nieaktualny baner o COVID i promocje z 2021 roku.
- **Czego nie ustaliłem:**
  - biur z wycieczką do Đường Lâm i obiadem u rodziny oraz ich opinii i licencji;
  - biletu wstępu do wsi.

  Powód: limit wyszukiwań. Obiadu u rodziny nie da się dziś zarezerwować przez żadne sprawdzone źródło.

## hoian.cooking: lekcja gotowania w Trà Quế

- **Wyprzedzenie poza szczytem:** 1–2 dni. **Szacunek.** Metoda: lekcje w Trà Quế odbywają się w małych grupach, dwa razy dziennie. W serwisie z lekcjami gotowania przy kilku z nich widać „Next class: Tomorrow” albo „In 2 Days” i natychmiastowe potwierdzenie (HA-CKL, HA-CK1).
- **Wyprzedzenie w szczycie:** 3–7 dni na Tết, 20.12–2.01 i VI–VIII. **Szacunek.** W Tết małe firmy i atrakcje zamykają się na kilka dni (SW, sekcja 3.4), więc trzeba zapytać, czy lekcja się odbędzie.
- **Link:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://traquewaterwheel.com/ | kontakt przez WhatsApp, opis lekcji z wizytą w ogrodzie z ziołami | operator | 200 |

- **Wybór tymczasowy: Tra Que Water Wheel.**
  - **siedziba:** w Trà Quế. Dane ogłoszenia podają adres „Tra Que Herb Village” (HA-CK1). Własna strona daje kontakt przez WhatsApp (HA-TQWW);
  - **opinie:** w serwisie Cookly 17 opinii, ocena 5,0, najnowsza z 15.12.2025 (HA-CK1). Na stronie firmy jest odznaka TripAdvisor Travellers' Choice z 2021 roku, a TripAdvisor daje 403;
  - **lekcja:** start o 8:30 albo 13:30, 5,5 h, 53 USD za dorosłego, bezpłatna rezygnacja do 48 h przed (HA-CK1);
  - **słabe strony:** strona firmy jest nieaktualna (prawa autorskie z 2022 roku, wpisy z X 2021) i nie podaje licencji (HA-TQWW).
- **Inna lekcja w Trà Quế:** Tra Que Garden Restaurant & Vietnamese Cooking Class (HA-CK2):
  - 2,5 h, start o 10:00 albo 15:00, 33 USD;
  - 8 opinii, najnowsza z 9.09.2026.

  Własnej strony nie znalazłem. Jedyna droga to pośrednik, więc linku nie daję.
- **Wioska:** Trà Quế leży ok. 2,5 km na północ od starego miasta. Centrum zabytków Hội An opisuje jako atrakcje pracę w ogrodzie warzywnym i napój z nasion bazylii. Lekcji gotowania nie wymienia (HA-TQ).
- **Czego nie ustaliłem:** porównania szkół w Trà Quế, bo TripAdvisor daje 403, a wyszukiwarka była niedostępna.

## hue.citadel: bilety do Đại Nội

- **Wyprzedzenie poza szczytem:** 0 dni. Bilet kupuje się na miejscu albo elektronicznie w dniu wizyty.
- **Wyprzedzenie w szczycie:** na 30.04–1.05, 2.09 i Tết kup bilet elektroniczny przed przyjazdem. W długi weekend 30.04–1.05.2023 przy kasach stały długie kolejki. W 2024 Centrum Ochrony Zabytków radziło kupić bilet elektroniczny wcześniej, na stronie albo przez kod QR (HUE-BVH).
- **Czy da się kupić online: tak.**
  - Centrum Ochrony Zabytków Huế (Trung tâm Bảo tồn Di tích Cố đô Huế) sprzedaje bilety na stronie eticket.hueworldheritage.org.vn od 20.12.2022. Bilet ma kod QR skanowany przy bramce (HUE-VNN).
  - Na stronie cennika jest przycisk „Đặt vé ngay”, który prowadzi do tego sklepu (HUE-GV).
  - Sklep działa w JavaScript i narzędzie nie odczytało jego treści. Nie sprawdziłem więc, jakie karty przyjmuje.
  - Infolinia do biletów elektronicznych: 0935 966 201 (HUE-BVH, 2024).
- **Linki:**

  | link | po co | kto | kod (11.10.2026) |
  |---|---|---|---|
  | https://eticket.hueworldheritage.org.vn/ | sklep z biletami elektronicznymi | oficjalny (Centrum Ochrony Zabytków Huế) | 200 |
  | https://hueworldheritage.org.vn/Thong-tin-tham-quan/Gia-ve | oficjalny cennik | oficjalny | 200 |

  Strona główna https://hueworldheritage.org.vn/ daje 302 (przekierowanie w kółko), dlatego linkuję podstrony.
- **Cennik (HUE-GV):**
  - Đại Nội: 200 000 VND dla dorosłych, 40 000 VND dla dzieci w wieku 7–12 lat. Ceny za pojedyncze miejsca obowiązują od 2.06.2026;
  - bilety łączone z grobowcami: 420 000–600 000 VND, od 4.01.2026.
- **Godziny (HUE-TG, strona z 12.03.2024):**
  - kasy od 16.03 do 15.10: 6:30–17:30;
  - kasy od 16.10 do 15.03: 7:00–17:00;
  - zwiedzanie kończy się 60 minut po zamknięciu kas.

  To potwierdza zdanie z dnia p 1: „Kasy zamykają ok. 17:00, a od połowy marca do połowy października ok. 17:30.”. Dotąd opierało się ono na stronach Vingroup (PD, „Do sprawdzenia przed publikacją”).

## Cát Tiên: Đảo Tiên i gibony (uzupełnienie 12.10.2026)

Uzupełnia sekcję „Cát Tiên” wyżej (`cattien.park`, akapit o ośrodku naczelnych) i zdanie o moście w `research/lotniska-2026-10.md`. Adresy otwarto 12.10.2026 (poza oznaczonymi †). Wyszukiwanie 12.10.2026: WebSearch w trybie standardowym, po wietnamsku i angielsku, 16 zapytań, w tym 4 o moście. Poprawna pisownia nazwy wyspy to Đảo Tiên. Wyżej i w `cattien.js` stoi „Dao Tiến”.

**Stan 14.10.2026: bez zmian** dla noclegu nad Bàu Sấu, Đảo Tiên i gibonów. Strona parku ma ten sam cennik (pliki z 2024 i 2025 roku) i ten sam kontakt, najnowszy wpis jest z 7.08.2026, a w stopce dalej są nazwa parku i logotypy ministerstwa (CT-2026-10-14a, CT-2026-10-14b). VnExpress (aktualizacja 25.05.2026) dalej pisze, że Đảo Tiên jest zamknięty, bez daty i powodu (CT-2026-10-14c); opinia o wycieczce o 8:30 jest ze stycznia 2026, czyli sprzed tej aktualizacji, a jej datę znam tylko z wyników wyszukiwania (CT-2026-10-14h†). O gibonach nowych źródeł nie ma. Wiadomości o samym przekazaniu parku miastu Đồng Nai po uchwale 188/NQ-CP ani o nowym cenniku czy kanale rezerwacji nie znalazłem (CT-2026-10-14d, CT-2026-10-14e). Most: niżej, „Most przez Đồng Nai”.

### Đảo Tiên

- **Stan: zamknięty, bez daty otwarcia.** VnExpress (aktualizacja 25.05.2026): „Điểm tham quan gần trụ sở vườn còn có Trung tâm cứu hộ linh trưởng - đảo Tiên và khu nghiên cứu nấm. Tuy nhiên, những nơi này hiện đóng cửa và chưa có thời điểm mở trở lại.” Zamknięty jest więc ośrodek ratowania naczelnych na wyspie Tiên i ośrodek badań grzybów. Gazeta radzi zapytać park przed przyjazdem (CT-VNE).
- **Od kiedy:** nie ustaliłem. Grupa szkolna z Hồ Chí Minh City była na Đảo Tiên 13–15.02.2025 (CT-BVIS). Przewodnik VnExpress ukazał się 9.08.2024, a zdanie o zamknięciu jest w wersji z 25.05.2026. Kiedy je dopisano, strona nie mówi (CT-VNE).
- **Dlaczego:** nie ustaliłem. VnExpress nie podaje powodu. Strona parku nie ma komunikatu o Đảo Tiên, a najnowszy wpis na stronie głównej jest z 7.08.2026 (CT-HOME).
- **Kto prowadzi ośrodek:** brytyjska fundacja EAST (Endangered Asian Species Trust), którą założyły Monkey World i Pingtung Rescue Centre. Ośrodek powstał w 2008 r. razem z parkiem i służbą ochrony lasów (WIKI-MW).
  - Strona fundacji go-east.org zwraca 401. W wynikach wyszukiwania widać tylko niedatowany wpis o ponownym otwarciu dla zwiedzających po ponad dwóch latach przerwy (CT-EAST†).
  - Fundacja nadal figuruje w rejestrze organizacji charytatywnych Anglii i Walii, a ostatnie sprawozdanie dotyczy roku do 28.02.2025 (CT-CC†).
- **Przeniesienie zwierząt:** wiadomości o nim nie znalazłem. Việt Nam News (8.09.2025) pisze, że w ośrodku na wyspie Tiên uratowano i wypuszczono na wolność ponad 140 naczelnych, m.in. lorisy, gibony i langury duk. O zamknięciu nie wspomina (CT-VNS).
- **Słabe źródło przeciwne:** vietnamtourism.com (aktualizacja 18.09.2026) opisuje wyspę jako ośrodek z wizytami z przewodnikiem. Nie podaje godzin ani ceny i nie pisze, czy ośrodek jest otwarty (CT-VT). To słabsze źródło niż VnExpress (zob. „Rezerwuj w parku, nie w hotelu” wyżej).

### Spokojne pół dnia zamiast Đảo Tiên

- **Muzeum przyrody i ośrodek ratowania dzikich zwierząt** („Bảo tàng thiên nhiên và Trung tâm cứu hộ động vật hoang dã”), 100–150 m od siedziby parku: zwiedzanie 20–30 minut, bilet 20 000–30 000 VND dla dorosłych, dzieci za pół ceny (CT-VNE). Vietnamtourism.com poleca stację ratowania niedźwiedzi i małe muzeum przyrody także na deszczowy dzień (CT-VT).
- **Ośrodek ratowania, ochrony i rozwoju gatunków parku:** 66 ha, części dla niedźwiedzi, naczelnych i innych gatunków, pod opieką prawie 50 naczelnych (CT-VNS). Czy to ten sam ośrodek, który zwiedza się za bilet z punktu wyżej, źródła nie mówią.
- **Trasa drzew lasu tropikalnego** („tuyến cây rừng nhiệt đới”; CT-VNE):
  - przejazd po drodze parku, na każdym przystanku 100–300 m pieszo. Przystanki leżą co 3–16 km, grupy liczą do 20 osób;
  - przystanki: drzewo Tung (według podpisu zdjęcia ma 400 lat), bystrza Bến Cự, „cây gõ Bác Đồng”, „cây đa Lộc giao”, wodospad Thác Trời, las bằng lăng Đà Cộ, jezioro „Cây si trăm thân” (jedyne miejsce, gdzie wolno się kąpać, zależnie od pory), wieś mniejszości i pola ryżowe Tà Lài;
  - ceny przejazdu autem parku gazeta nie podaje. Rower kosztuje 100 000 VND za 4 h i 150 000 VND za 8 h, przewodnik na rowerze 350 000 VND za najwyżej 3 h (CT-VNE). Potoo podaje te same ceny rowerów i kaucję 200 000 VND (CT-POTOO);
  - według vietnamtourism.com drzewo Tung, figowiec o sześciu korzeniach, bystrza Bến Cự i Thác Trời wystarczą na pół dnia (CT-VT).
- **Łódź po rzece Đồng Nai:** w ofercie parku jej nie znalazłem. Strona parku wymienia programy 2 dni/1 noc i 3 dni/2 noce, nocne safari i mapę tras (CT-TOUR). Przewodniki z 2026 piszą tylko o promie: 60 000 VND w obie strony razem ze wstępem (CT-VT, CT-POTOO).
- **Cennik parku:** plik PDF z cennikiem (CT-CENY) narzędzie pobrało, ale go nie odczytało. Ceny wyżej pochodzą z przewodnika VnExpress z 25.05.2026 (CT-VNE).

### Gibony o świcie

- **Ile wyjść dziennie:** jedno, przed świtem. Zbiórka jest w centrum dla zwiedzających, łódź płynie ok. 4:45, potem przejście do punktu nasłuchu (CT-VT). Według Potoo łódź odpływa z przystani o 4:45, wycieczka kończy się ok. 7:30 i odbywa się codziennie (CT-POTOO). Drugiego wyjścia w ciągu dnia żadne źródło nie wymienia.
- **Ile osób:** limitu grupy nie podaje żadne źródło.
- **Cena:** 650 000 VND w parku, w niektórych hotelach 1,2 mln VND (CT-VT); ok. 25 USD od dorosłego (CT-POTOO). Gdy za pierwszym razem gibonów nie widać, park daje drugą próbę bez opłaty (CT-VT).
- **Jak i z jakim wyprzedzeniem:** w centrum dla zwiedzających parku (CT-VT, CT-POTOO). Wyprzedzenia nie podaje żadne źródło, a strona parku nie ma osobnej strony o tym spacerze (CT-TOUR). Zostaje szacunek z `cattien.park`: przy zameldowaniu, najpóźniej dzień wcześniej, a w szczycie razem z noclegiem 1–2 tygodnie wcześniej, przez Zalo albo e-mailem (CT-KONT).

### Most przez Đồng Nai

- Dwa przewodniki z 2026 piszą o budowie mostu przez rzekę przy wejściu do parku:
  - vietnamtourism.com (aktualizacja 18.09.2026): most jest w budowie i ma być gotowy w 2026. Po otwarciu może zastąpić prom, więc trzeba to sprawdzić na miejscu (CT-VT);
  - Potoo (1.05.2026): w kwietniu 2026 most był w budowie, a koniec przewidziano „w tym roku” (CT-POTOO).
- Wiadomości prasy wietnamskiej ani urzędów o tym moście nie znalazłem. Cztery wyszukiwania 12.10.2026, po wietnamsku i angielsku, zwróciły tylko inne mosty na Đồng Nai. Strona parku nie ma komunikatu o moście (CT-HOME).
- **Sprawdzenie 14.10.2026: prasa o moście jest.** Budowę mostu przez Đồng Nai do parku rozpoczęto na początku kwietnia 2025: ponad 156 m, 5 przęseł, szerokość 7 m (6 m wspólnego pasa dla aut i pieszych), nacisk 10 t na oś, 50 mld VND (45 mld z budżetu przez ministerstwo rolnictwa i środowiska, 5 mld z parku); zakończenie planowano na początek 2026 r. (CT-2026-10-14f, CT-2026-10-14g). Wiadomości o otwarciu do 14.10.2026 nie znalazłem, a przewodnik VnExpress (aktualizacja 25.05.2026) liczy prom w cenie biletu (CT-2026-10-14c).
- **Wniosek (14.10.2026):** stan budowy i data otwarcia dalej są nieznane, choć otwarcie planowano na początek 2026 r. W tekstach zostaje prom.

### Co z tego wynika dla treści miejsca

- `cattien.js`, dzień `p: 2`, wersja `easy` („Cát Tiên na spokojnie”) trzeba przepisać, bez Đảo Tiên i bez łodzi. Propozycja: rano trasa olbrzymich drzew (Tung, Bến Cự, Thác Trời) rowerem albo z przewodnikiem parku, z krótkimi spacerami, a potem muzeum przyrody i ośrodek ratowania zwierząt przy siedzibie parku (CT-VNE, CT-VT).
- Zdanie o promie w dniu `p: 1` zostaje.

## Lang Biang: stan szlaku (uzupełnienie 12.10.2026)

Uzupełnia sekcję `dalat.langbiang` (punkt „Do zrobienia”). Adresy otwarto 12.10.2026. Wyszukiwanie 12.10.2026: WebSearch w trybie standardowym, po wietnamsku, 6 zapytań.

- **Komunikatu o otwarciu nie znalazłem.** Wyszukiwania (m.in. „mở lại tuyến đi bộ leo núi Langbiang”, „hoạt động trở lại”, Báo Lâm Đồng) zwróciły tylko wiadomości o zawieszeniu z 31.10.2024 (LB-TT24; PD: LB-VNP). W wiadomościach parku do 9.10.2026 też go nie ma (DL-NEWS, stan z 11.10.2026).
- **Szlak jest jednak używany.** Báo Lâm Đồng, gazeta prowincji, 6.03.2026 opisuje wejście na Núi Bà (2167 m) w porze suchej 2026 (LB-BLD):
  - ok. 12 km w górę i w dół, start u stóp Lang Biang w dzielnicy Lang Biang – Đà Lạt;
  - ścieżkę zaprojektował i zbudował park Bidoup–Núi Bà w latach 2008–2009, a „Khu Du lịch Lang Biang và Vườn Quốc gia Bidoup - Núi Bà đã hợp tác để khai thác con đường này”;
  - na trasie są tablice z oznaczeniami, a przy stromych schodach pod szczytem liny do trzymania;
  - ośrodek turystyczny Lang Biang współpracuje z biurami, które prowadzą tam wycieczki. Artykuł opisuje grupę 66 osób z przewodnikiem, grupę kolegów zorganizowaną samodzielnie i turystkę z Izraela, która szła sama;
  - artykuł nie wspomina o zawieszeniu z 2024 r., o biletach na szlak ani o obowiązku przewodnika.
- **Cennik parku** (od 1.01.2024) nie ma trasy na szczyt Lang Biang (LB-CENY).
- **Wniosek:** formalny stan szlaku jest nieznany. W porze suchej 2026 ludzie wchodzą na szczyt, a gazeta prowincji opisuje to bez zastrzeżeń, ale urzędowego komunikatu o otwarciu nie ma. Organizowanie wycieczek w lesie bez zgody zarządcy jest karane (TD, „Ramy prawne 2026”). Zostaje więc rada: zapytać park albo ośrodek Lang Biang, czy szlak jest otwarty, i iść z biurem, które ma zgodę parku albo współpracuje z ośrodkiem.
- **Pewna, legalna całodniowa wędrówka z przewodnikiem w masywie Lang Biang** to usługa samego parku:
  - na stronie parku nazywa się „Tuyến LANGBIANG 1 ngày”. Prowadzi z centrum dla zwiedzających do wodospadu Thiên Thai w gminie Đa Nhim, 36 km od Đà Lạt, przez las sosnowy, plantacje kawy i strumienie, z opowieścią o ludzie K’Ho. Start o 8:00 albo 8:30, koniec 14:00–15:00. Transport trzeba zgłosić wcześniej w centrum turystyki parku (LB-PARK, odczyt 12.10.2026);
  - w cenniku odpowiada jej najpewniej „Tuyến Thiên Thai – Trạm Kiểm lâm Đưng jar Giêng”: 1 dzień, 10 km, 250 000 VND od dorosłego, w cenie bilet, przewodnik i obiad piknikowy. Wersja na pół dnia do Thiên Thai (3,5 km) kosztuje tyle samo (LB-CENY). Że to ta sama trasa, to mój wniosek z nazw;
  - rezerwacja przez formularz „Đặt Tour” albo infolinię i Zalo 0947 047 449 (LB-PARK, DL-FORM).
- **Co z tego wynika dla `dalat.js`, dzień `p: 3` („Szczyt Lang Biang”):**
  - wariant A: zostawić szczyt. Zdanie „Przy rezerwacji zapytaj, czy szlak jest otwarty i czy biuro ma zgodę parku” nadal pasuje. Można dopisać, że na szlaku są tablice i liny (LB-BLD);
  - wariant B: zamienić na trasę parku Thiên Thai – Đưng Jar Giêng. Jej status jest pewny, ale to drugi dzień w lesie parku obok Hòn Giao (`p: 2`), 36 km od miasta;
  - lista rezerwacji bez zmian: link tylko do kontaktu z parkiem.

## Pù Luông: Hang Dơi (uzupełnienie 12.10.2026)

Uzupełnia akapit „Hang Dơi” w sekcji `puluong.guide`. Adresy otwarto 12.10.2026. Wyszukiwanie 12.10.2026: WebSearch w trybie standardowym, po wietnamsku, 3 zapytania.

- **Nowszych wiadomości nie ma.** Wyszukiwania zwróciły tylko artykuły z 12.09.2026. O otwarciu, wynikach kontroli ani pracach zabezpieczających nikt nie pisał.
- **Szczegóły z 12.09.2026:**
  - 10.09.2026 zarząd rezerwatu dostał zgłoszenie, że w jaskini spadają ziemia i kamienie. Dyrektor zarządu wystąpił do władz gminy o wstrzymanie wizyt (PL-HDVNP);
  - przewodniczący gminy Pù Luông polecił 12.09 rano ustawić tablice ostrzegawcze przy drodze do jaskini i przy samej jaskini oraz kontrolować wejścia (PL-HDVNP);
  - wspólny zespół ma zbadać geologię, osuwiska i miejsca groźne, a potem zaproponować zamknięcie stref, ograniczenie dostępu albo umocnienia. Dopiero wtedy władze rozważą wznowienie wizyt (PL-HDVNP);
  - wizyty są wstrzymane do zakończenia kontroli przez gminę. Jaskinia ma ok. 2,5 km, wejście wyższe niż 10 m i łączy się z podziemną rzeką (PL-HDLC).
- **Wizyty nie miały zgody już przed zamknięciem:**
  - „Hoạt động tham quan, khai thác du lịch tại Hang Dơi chưa được cấp có thẩm quyền cho phép theo quy định”, a wizyty były „hoàn toàn tự phát”, czyli całkowicie spontaniczne. Gmina ma wstrzymać pobieranie opłat przez wieś Kho Mường (PL-HDVNP);
  - jaskinia leży w lesie specjalnego przeznaczenia, którym zarządza rezerwat, a gości przyjmowała i opłaty pobierała wieś, bez zezwolenia (PL-HDLC).
- **Co z tego wynika dla `puluong.js`:** w dniu `p: 2` zdanie „wioska Kho Mường z jaskinią” trzeba zmienić na samą wioskę Kho Mường. Jaskini nie wpisywać także po otwarciu, dopóki władze nie zezwolą na wizyty. Wersja `easy` tego dnia i dzień `p: 1` nie mówią o jaskini i mogą zostać.

## Zestawienie

Kolejność od najpilniejszej, według kolumny „dni”.

| klucz | co | wyprzedzenie poza szczytem | wyprzedzenie w szczycie | dni | linki |
|---|---|---|---|---|---|
| cattien.bausau_night | noc na stacji strażników nad Bàu Sấu | 2–4 tygodnie, w dni robocze 1–2 tygodnie (szacunek) | co najmniej miesiąc: Tết, 30.04–1.05, 2.09; 20.12–2.01 (szacunek) | 28 | Park Cát Tiên, kontakt: https://cattiennationalpark.com.vn/lien-he/; Park Cát Tiên, cennik: https://cattiennationalpark.com.vn/bang-gia-dich-vu/ |
| flights | loty krajowe | ok. 3 tygodnie, dla ceny (szacunek) | Tết 2027: 2–3 miesiące, sprzedaż od 25.08 i 28.08.2026; 30.04–1.05: co najmniej 6 tygodni; VI–VIII: 3–6 tygodni; 2.09: 2–4 tygodnie; Nowy Rok: 4–6 tygodni (szacunek) | 21 | Vietnam Airlines: https://www.vietnamairlines.com/; Vietjet: https://www.vietjetair.com/; Vietravel Airlines: https://www.vietravelairlines.com/ |
| catba.cruise | rejs 2 dni/1 noc z Cát Bà | 1–2 tygodnie; w X–IV na popularne łodzie 2–4 tygodnie (szacunek) | weekendy VI–VIII, 30.04–1.05, 2.09, 20.12–2.01: 3–4 tygodnie (szacunek); Tết: 1–2 miesiące | 14 | Full Moon Travel Asia: https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/; Cat Ba Ventures: https://catbaventures.com/cat-ba-tours/lan-ha-bay-ha-long-bay-bai-tu-long-bay-boat-trip-kayaking-2-days-1-night.html |
| homestay | noclegi u gospodarzy: Pù Luông, Ba Bể, Phong Điền, Khuổi Ky | 1–2 tygodnie; w dni robocze w Pù Luông i Ba Bể kilka dni (szacunek) | Pù Luông: 4–6 tygodni (złote tarasy, 30.04–1.05, 2.09); Ba Bể i Khuổi Ky: 2–4 tygodnie; Phong Điền na Tết: 4–6 tygodni (szacunki) | 14 | — (rezerwacja bezpośrednio u gospodarzy) |
| puluong.summit | wejście na szczyt Pù Luông | 3–7 dni (szacunek) | 2–3 tygodnie: złote tarasy, 30.04–1.05, 2.09, weekendy (szacunek) | 7 | Rezerwat Pù Luông, formularz: https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform |
| caobang.car | samochód z kierowcą na pętlę Cao Bằng | 3–7 dni (szacunek) | 2–4 tygodnie: połowa IX–połowa XI, III–połowa V, 30.04–1.05, 2.09, Tết (szacunek) | 7 | Cao Bang Eco Travel: https://caobangecotravel.com/3-days-2-nights-tour/; Cao Bang Green Riders: https://caobanggreenriders.com/ |
| caobang.easyrider | easy rider na pętli Cao Bằng | 3–7 dni (szacunek) | 2–3 tygodnie, te same okresy (szacunek) | 7 | Cao Bang Eco Travel: https://caobangecotravel.com/3-days-2-nights-tour/; Cao Bang Green Riders: https://caobanggreenriders.com/tours |
| transfer | autobusy i minibusy typu limousine | 1–2 dni; przy 3–4 kursach dziennie 2–3 dni (szacunek) | Tết: w dniu otwarcia sprzedaży; VI–VIII (Cát Bà), 30.04–1.05, 2.09, 20.12–2.01: ok. tydzień; złote tarasy (Pù Luông): 1–2 tygodnie (szacunki) | 3 | Baolau: https://www.baolau.com/en/destinations/vietnam; Vexere: https://vexere.com/en-US; FUTA (Phương Trang): https://futabus.vn/ |
| airport | długie transfery z lotnisk samochodem z kierowcą | 2–3 dni (szacunek) | Tết: 3–4 tygodnie; inne szczyty: ok. tydzień (szacunek) | 3 | Baolau: https://www.baolau.com/en/destinations/vietnam; Green SM Liên Tỉnh: https://www.greensm.com/vn-vi/green-lien-tinh |
| dalat.bidoup | przewodnik w parku Bidoup–Núi Bà | 2–3 dni (szacunek) | 1–2 tygodnie: Tết, 30.04–1.05, 2.09, VI–VIII, 20.12–2.01 (szacunek) | 3 | Park Bidoup–Núi Bà, kontakt: https://bidoupnuiba.gov.vn/lien-he/; Park Bidoup–Núi Bà, formularz: https://bidoupnuiba.gov.vn/dat-tour; Park Bidoup–Núi Bà, cennik: https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/ |
| dalat.langbiang | przewodnik na Lang Biang | 2–3 dni, gdy park potwierdzi otwarcie szlaku (szacunek) | 1–2 tygodnie (szacunek) | 3 | Park Bidoup–Núi Bà, kontakt: https://bidoupnuiba.gov.vn/lien-he/ |
| caobang.moto | wypożyczalnia motocykli w Cao Bằng | 1–3 dni (szacunek) | 1–2 tygodnie: połowa IX–połowa XI, III–połowa V, święta (szacunek) | 3 | Cao Bang Green Riders, cennik: https://caobanggreenriders.com/rental; Cao Bang Eco Travel, cennik: https://caobangecotravel.com/motorbike/ |
| haivan.car | samochód z kierowcą Hội An → Huế przez przełęcz Hải Vân | 1–3 dni (szacunek) | 1–2 tygodnie: Tết, 30.04–1.05, 2.09 (szacunek) | 3 | Hoi An Transport Service: https://hoiantransportservice.com/hoi-an-hue-private-car/; Hoi An Day Trip: https://hoiandaytrip.com/da-nang-to-hue-private-transfer/ |
| haivan.moto | motocykl w jedną stronę Hội An → Huế | 2–3 dni (szacunek) | 1–2 tygodnie; Tết: 2–3 tygodnie (szacunek) | 3 | Hidden Land Travel: https://hiddenlandtravel.com/rental/hoi-an-to-hue-motorbike-rental/; Tigit Motorbikes (start w Đà Nẵng): https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike |
| saigon.cangio | samochód z kierowcą na dzień do Cần Giờ | 1–2 dni; Saigontourist: co najmniej 2 dni | 1–2 tygodnie: święta, Tết, lato (Saigontourist) | 2 | Green SM Green Tour: https://www.greensm.com/vn-vi/green-tour; Saigontourist: https://xedulich.saigontourist.net/; Grab, wynajem na godziny: https://www.grab.com/vn/transport/rent/ |
| hanoi.duonglam | wycieczka do Đường Lâm | 1–2 dni (szacunek) | 1–2 tygodnie: święta, Tết, lato (szacunek) | 2 | Green SM Green Tour: https://www.greensm.com/vn-vi/green-tour |
| hoian.cooking | lekcja gotowania w Trà Quế | 1–2 dni (szacunek) | 3–7 dni: Tết, 20.12–2.01, VI–VIII (szacunek) | 2 | Tra Que Water Wheel: https://traquewaterwheel.com/ |
| cattien.park | gibony o świcie, wędrówka do Bàu Sấu, nocne safari | przy zameldowaniu, najpóźniej dzień wcześniej (szacunek) | 1–2 tygodnie, razem z noclegiem: weekendy, Tết, 30.04–1.05, 2.09 (szacunek) | 1 | Park Cát Tiên, kontakt: https://cattiennationalpark.com.vn/lien-he/; Park Cát Tiên, nocne safari: https://cattiennationalpark.com.vn/xem-thu-dem/ |
| puluong.guide | przewodnik od gospodarzy w Pù Luông | najpóźniej dzień wcześniej (szacunek) | razem z noclegiem (szacunek) | 1 | — (przez gospodarzy) |
| babe.boat | łódź i przewodnik nad jeziorem Ba Bể | na przystani albo dzień wcześniej przez gospodarzy (szacunek) | 1–3 dni przez gospodarzy: lato, 30.04–1.05, 2.09, Tết (szacunek) | 0 | — (przez gospodarzy) |
| hue.citadel | bilety do Đại Nội | na miejscu albo online w dniu wizyty | bilet elektroniczny przed przyjazdem: 30.04–1.05, 2.09, Tết | 0 | Bilety elektroniczne: https://eticket.hueworldheritage.org.vn/; Cennik: https://hueworldheritage.org.vn/Thong-tin-tham-quan/Gia-ve |

## Źródła

Adresy otwarto 11.10.2026. Źródła oznaczone † znam tylko z wyników wyszukiwania (zob. „Jak czytać”). Data w ostatniej kolumnie to data publikacji albo aktualizacji strony, a „brak” znaczy, że strona jej nie podaje. Rodzaj źródła: urzędowe (organ państwa, park, rezerwat, zarząd zabytków), przewoźnik, operator, pośrednik, prasa, komercyjne, wiki, blog albo własne badanie.

### Własne notatki

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| SW | Tết i święta 2026–2031: dni wolne na Tết 2027 (4–10.02), ruch ok. tydzień przed i po, zamknięcia małych firm w Tết (sekcja 3.4) | `research/swieta-2026-10.md` | własne badanie | 10.10.2026 |
| TD | Trudne dni: noc nad Bàu Sấu (ok. 19 miejsc, dopłata 20% w święta według cennika parku), zawieszenie kajaków na Cát Bà od 15.11.2024, zakazy wypłynięć, ramy prawne 2026 | `research/trudne-dni-2026-10.md` | własne badanie | 10.10.2026 |
| PD | Plany dni: zawieszenie szlaku na Lang Biang (LB-VNP), przewodniki z 2026 (LB-MH, LB-JB), godziny Đại Nội na liście „Do sprawdzenia” | `research/plany-dni-2026-10.md` | własne badanie | 10–11.10.2026 |
| PIERW | Pierwowzór: linki do rezerwacji sprawdzone 8–9.10.2026 (Cat Ba Ventures, Full Moon, 12Go, Google Flights, Bidoup) | `research/booking-links-2026-10.md` w repo pierwowzoru, poza tym repo | własne badanie | 8–9.10.2026 |

### Loty

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| FL-VTC | VTC News: grupa Vietnam Airlines sprzedaje bilety na Tết 2027 od 25.08, ok. 3,7 mln miejsc, szczyt 22.01–20.02.2027; „khuyến nghị hành khách đặt vé sớm” | https://vtcnews.vn/hang-khong-bat-dau-ban-ve-may-bay-tet-dinh-mui-2027-ar1035350.html | prasa | 20.08.2026 |
| FL-TP | Tiền Phong: Vietjet otwiera sprzedaż 3,1 mln miejsc na Tết 2027, w tym ok. 2 mln krajowych | https://tienphong.vn/vietjet-mo-ban-31-trieu-ve-tet-dinh-mui-2027-them-lua-chon-cho-hanh-trinh-doan-vien-post1872076.tpo | prasa | 28.08.2026 |
| FL-VNEC | VnEconomy: loty na Tết 2026 zajęte w 70–80%, TP.HCM–Hà Nội ponad 80%, Vietjet bez miejsc na 12–15.02 | https://vneconomy.vn/nhieu-chuyen-bay-tet-da-lap-day-cho-70-80.htm | prasa | 11.12.2025 |
| FL-VNE1 | VnExpress: ruch w ok. 7 dniach przed Tết i po nim, autobusy wyprzedane w dniu otwarcia sprzedaży, ponad 36 900 lotów według Cục Hàng không | https://vnexpress.net/cuoc-dua-san-ve-tau-xe-tet-5032139.html | prasa | 10.02.2026 |
| FL-TBTC | Thời báo Tài chính Việt Nam: Nowy Rok 2026 (1–4.01), lot Phú Quốc–Hà Nội na 4.01 wyprzedany, Vietnam Airlines dokłada prawie 270 lotów | https://thoibaotaichinhvietnam.vn/gia-ve-may-bay-tang-vot-nhieu-chang-chay-ve-dip-nghi-tet-duong-lich-2026-189710.html | prasa | 29.12.2025 |
| FL-BVH1 | Báo Văn hóa, bilety na lato 2026: eksperci radzą 3–6 tygodni, na trasach ponad 1000 km co najmniej 3 tygodnie; ceny o 10–30% wyższe | https://baovanhoa.vn/doi-song/ve-may-bay-he-2026-tang-cao-lam-sao-de-mua-duoc-gia-re-227850.html | prasa | 14.05.2026 |
| FL-BVH2 | Báo Văn hóa: 40 dni przed 30.04 kończą się bilety w dobrych godzinach, część tras Vietnam Airlines zajęta w 50–70%; Sun PhuQuoc Airways bez tanich biletów | https://baovanhoa.vn/doi-song/cuoc-dua-dat-ve-truoc-khi-gia-cham-dinh-251199.html | prasa | 21.03.2026 |
| FL-VNE2 | VnExpress: dane Cục Hàng không z 18.08.2026 o zajętości lotów na długi weekend 2.09 (42–69%, Hà Nội–Chu Lai 100%) | https://vnexpress.net/ve-may-bay-dip-2-9-ha-nhiet-5110204.html | prasa (dane urzędowe) | 18.08.2026 |
| FL-GH | Pomoc Google Travel: nie wszystkie linie i loty, bo potrzebne partnerstwo; rezerwacja zwykle u linii albo w biurze podróży | https://support.google.com/travel/answer/2475306 | komercyjne | brak |
| FL-VOV | VOV: Vietjet współpracuje z Google, sprzedaż przez Google Flights | https://english.vov.vn/en/travel/vietjet-cooperates-with-google-to-double-utility-for-travellers-400514.vov | prasa | 24.07.2019 |
| FL-VU1 | VnEconomy: trasy krajowe Vietravel Airlines latem 2026 | https://vneconomy.vn/vietravel-airlines-mo-rong-mang-duong-bay-noi-dia-va-quoc-te-trong-dip-he-2026.htm | prasa | 15.06.2026 |
| FL-VU2 | Đại biểu Nhân dân: Vietravel Airlines wraca na trasę Hà Nội–Đà Lạt od 15.09.2026, bilety na własnej stronie | https://daibieunhandan.vn/vietravel-airlines-dua-vao-khai-thac-tro-lai-duong-bay-noi-dia-ket-noi-ha-noi-va-da-lat-10430756.html | prasa | 16.09.2026 |
| FL-QH1 | CafeF: strona Bamboo Airways bez lotów na sierpień 2026 | https://cafef.vn/website-bamboo-airways-khong-con-hien-thi-chuyen-bay-kha-dung-trong-thang-8-tren-nhieu-duong-bay-18826080112160055.chn | prasa | 1.08.2026 |
| FL-QH2 | Flymag: Bamboo Airways wycofuje loty rozkładowe, flota 3 samolotów | https://flymag.com/bamboo-airways-pulls-scheduled-flights-from-sale-as-fleet-shrinks-to-three-aircraft/ | prasa | 2.08.2026 |

### Przejazdy i transfery

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| TR-BL1 | Baolau, pomoc: rezerwacje 30–90 dni naprzód, koniec sprzedaży 24–2 h przed odjazdem, opłata 35 000 VND za bilet autobusowy, metody płatności | https://www.baolau.com/en/help | pośrednik | brak |
| TR-BL4 | Baolau, strony tras z odjazdami na 16.10.2026, m.in. Hà Nội–Cát Bà | https://www.baolau.com/en/s/Hanoi/Cat-Ba/bus (i 7 innych tras) | pośrednik | brak |
| TR-BLD | Baolau, Wietnam: prywatne przejazdy autem (m.in. Hà Nội–Ninh Bình, TP.HCM–Cần Thơ) i przewoźnicy busów | https://www.baolau.com/en/destinations/vietnam | pośrednik | brak |
| TR-VXR1 | Vexere, Hà Nội–Hải Phòng: przewoźnicy do Cát Bà; sprzedaż na Tết 2027 jeszcze nieogłoszona | https://vexere.com/en-US/bus-ticket-booking-from-ha-noi-to-hai-phong-124t1271.html | pośrednik | brak |
| TR-VXR2 | Vexere: metody płatności | https://vexere.com/en-US/guide-on-making-payment.html | pośrednik | brak |
| TR-TT | Tuổi Trẻ: bilety autobusowe na Tết 2026 do środkowego Wietnamu wyprzedane, dopłaty 40–60% | https://tuoitre.vn/ve-xe-ve-mien-trung-chay-som-ben-tang-cuong-xe-gia-tang-40-60-20260206080847833.htm | prasa | 6.02.2026 |
| TR-SINH1 | The Sinh Tourist: lista tras autobusowych, sprzedaż online co najmniej 3 dni przed | https://thesinhtourist.vn/tourlist/bt | przewoźnik | brak |
| TR-SINH2 | The Sinh Tourist: bilety Open Bus tylko w biurach | https://thesinhtourist.vn/openbus/vcvx/open-bus/all | przewoźnik | brak |
| TR-CT | Park Cát Tiên: jak dojechać (autobusy z TP.HCM i z Đà Lạt, wysiadanie w Phú Lâm) | https://cattiennationalpark.com.vn/huong-dan-duong-di-vuon-quoc-gia-cat-tien/ | urzędowe (park) | brak |
| AP-GSM1 | Green SM Liên Tỉnh: trasy, ceny za miejsce i za całe auto, odbiór do 5 km od punktu zbiórki, infolinia 1555, płatność po przejeździe | https://www.greensm.com/vn-vi/green-lien-tinh | operator | brak (© 2026) |
| AP-GSM2 | Green SM Green Airport | https://www.greensm.com/vn-vi/green-airport | operator | brak |
| GSM-TOUR | Green SM Green Tour: auto z kierowcą w pakietach (10 h/125 km, 12 h/150 km), rezerwacja do 30 dni naprzód, do innej prowincji tylko w obie strony, w święta bez pakietów | https://www.greensm.com/vn-vi/green-tour | operator | brak |
| AP-GR1 | Grab, GrabCar w Wietnamie: przejazdy w obrębie miasta | https://www.grab.com/vn/transport/car/ | operator | brak |
| GRAB-RENT | Grab, wynajem na godziny: bez rezerwacji, kurs kończy się w mieście odbioru, przedłużenie najwyżej o 4 h | https://www.grab.com/vn/transport/rent/ | operator | brak |
| AP-PLR | Pù Luông Retreat: dojazd i transfery, odbiór z lotniska Thọ Xuân (curl 406) | https://puluongretreat.com/discover/11-cach-di-den | operator (nocleg) | brak |

### Cát Bà

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CB-FM | Full Moon Travel Asia, rejs z Việt Hải: 130 USD, odbiór 11:30, kajaki w programie, zwroty, numer rejestracji firmy, 7 opinii | https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/ | operator | brak (opinie do 29.08.2026) |
| CB-CBV2D | Cat Ba Ventures, rejs 2 dni/1 noc: 142 USD, Đầu Bê, kajaki 1,5–2 h, grupy do 18 osób | https://catbaventures.com/cat-ba-tours/lan-ha-bay-ha-long-bay-bai-tu-long-bay-boat-trip-kayaking-2-days-1-night.html | operator | brak |
| CB-CBVW | Cat Ba Ventures, warunki: rezerwacja poniżej tygodnia jest „późna”, zaliczka 30–50%, zwroty, odwołanie z powodu pogody | https://catbaventures.com/conditions.html | operator | brak |
| CB-TA-CBV† | TripAdvisor, Cat Ba Ventures: ocena 4,9, opinie z IV i IX 2026 (wyniki wyszukiwania; strona daje 403) | https://www.tripadvisor.com/Attraction_Review-g737051-d1368569-Reviews-Cat_Ba_Ventures-Cat_Ba_Hai_Phong.html | komercyjne | brak |
| CB-TA-FM† | TripAdvisor, Full Moon Travel Asia: ok. 560 opinii, ocena 4,8, stan z 2025 roku (wyniki wyszukiwania; strona daje 403) | https://www.tripadvisor.com/Attraction_Review-g26785533-d12909788-Reviews-Full_Moon_Travel_Asia_Cat_Ba-Cat_Ba_Town_Cat_Ba_Hai_Phong.html | komercyjne | brak |
| CB-VTR | vietnamtourism.com (wydawca nieustalony, to nie urząd turystyki), rejsy po Lan Hạ z Cát Bà: w X–IV 2–4 tygodnie, na Tết 1–2 miesiące, w niskim sezonie tydzień | https://www.vietnamtourism.com/vi/tour-du-thuyen-vinh-lan-ha-khoi-hanh-tu-cat-ba | komercyjne | aktualizacja 31.05.2026 |
| CB-VTW | vietnamtourism.com, przewodnik po Cát Bà 2026: latem tłum turystów krajowych, bilety na promy w weekendy i święta, noclegi dwa razy droższe w Tết, 30.04 i 2.09 | https://www.vietnamtourism.com/en/cat-ba-island-things-to-do-the-complete-2026-guide | komercyjne | aktualizacja 31.05.2026 |
| CB-AM | Amanda Cruise: zawieszenie kajaków na zatokach archipelagu Cát Bà trwa (pismo 483/TB-UBND) | https://amandacruise.com.vn/news-promotions/notice-regarding-temporary-suspension-of-kayak-services/ | operator | 27.11.2025 |
| CB-AO† | Saigoneer o Asia Outdoors: rejsy jednodniowe (wyniki wyszukiwania) | https://saigoneer.com/vietnam-travel/9184-photos-saigoneer-getaways-outdoor-adventures-abound-on-cat-ba-island | prasa | brak |
| CB-HET† | Hanoi Eco Tour: rejs 2 dni/1 noc z Cát Bà (wyniki wyszukiwania) | https://hanoiecotour.com/lan-ha-bay-itinerary/ | pośrednik | brak |
| CB-AUT† | Authentik Travel: łodzie z przystani Bến Bèo (wyniki wyszukiwania) | https://authentiktravel.com/recommended-overnight-boats-in-cat-ba-island | blog | 2019 według wyników wyszukiwania |

### Cát Tiên

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CT-KONT | Park Narodowy Cát Tiên, kontakt: telefon, Zalo, e-mail, trzy wersje adresu parku | https://cattiennationalpark.com.vn/lien-he/ | urzędowe (park) | brak |
| CT-CENY | Park, cennik usług z odnośnikami do plików PDF z 2024 i 2025 roku | https://cattiennationalpark.com.vn/bang-gia-dich-vu/ | urzędowe (park) | wpis 20.03.2023, PDF z 07.2025 |
| CT-SAF | Park, nocne safari: od 18:30, ok. 1 h, 12 km, odkryte auto | https://cattiennationalpark.com.vn/xem-thu-dem/ | urzędowe (park) | 1.02.2023 |
| CT-VNE | VnExpress, przewodnik po parku Cát Tiên 2026: ceny Bàu Sấu i safari, zasady noclegu, Dao Tiến zamknięte | https://vnexpress.net/cam-nang-du-lich-vuon-quoc-gia-cat-tien-4775984.html | prasa | 9.08.2024, aktualizacja 25.05.2026 |
| CT-188a | VietnamPlus: uchwała 188/NQ-CP, park przechodzi pod władze miasta Đồng Nai | https://www.vietnamplus.vn/chuyen-giao-vuon-quoc-gia-cat-tien-ve-ubnd-thanh-pho-dong-nai-quan-ly-post1124758.vnp | prasa | 17.07.2026 |
| CT-188b | Báo Đấu thầu: przekazanie parku bez zmian w strukturze i kadrach | https://baodauthau.vn/chuyen-giao-vuon-quoc-gia-cat-tien-ve-ubnd-thanh-pho-dong-nai-quan-ly-post203032.html | prasa | 18.07.2026 |
| CT-VT | vietnamtourism.com, gibony i nocne safari: spacer 650 000 VND w parku, w hotelach 1,2 mln VND, zapis w centrum dla zwiedzających, tłok w weekendy i Tết; podaje nieaktualną opłatę za Bàu Sấu | https://www.vietnamtourism.com/en/cat-tien-national-park-gibbons-night-safaris-and-how-to-visit | komercyjne | aktualizacja 18.09.2026 |
| CT-JB | Jungle Boss, przewodnik po parku: safari z zaliczką, w święta brak aut i przewodników | https://junglebosstours.com/vi/kham-pha/blog-du-lich/vuon-quoc-gia-cat-tien | operator (blog) | brak |
| CT-MIA | mia.vn o Bàu Sấu: nocleg zarezerwuj co najmniej miesiąc wcześniej, bo pokoi jest mało | https://mia.vn/cam-nang-du-lich/du-lich-bau-sau-13064 | blog | 9.10.2023 |

### Đà Lạt

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| DL-KONT | Park Bidoup–Núi Bà, kontakt: siedziba, centrum turystyki „Trung tâm Dịch vụ Du lịch và Khoa học”, biuro w Đà Lạt, Zalo, infolinia | https://bidoupnuiba.gov.vn/lien-he/ | urzędowe (park) | brak |
| DL-CENY | Park, cennik: Hòn Giao 1 dzień 290 000 VND, pół dnia 150 000 VND | https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/ | urzędowe (park) | od 1.01.2024 |
| DL-HG | Park, trasa Hòn Giao – Giang Ly: start 8:00–8:30 z centrum dla zwiedzających, transport do zgłoszenia wcześniej | https://bidoupnuiba.gov.vn/dich-vu/tour-tuyen-du-lich-sinh-thai/tuyen-sinh-thai-hon-giao-giang-ly | urzędowe (park) | brak |
| DL-FORM | Park, formularz „Đặt Tour” | https://bidoupnuiba.gov.vn/dat-tour | urzędowe (park) | brak |
| DL-NEWS | Park, wiadomości: bez komunikatów o zamknięciach tras i nowych cenach | https://bidoupnuiba.gov.vn/tin-tuc/ | urzędowe (park) | najnowsza 9.10.2026 |
| LB-PARK | Park, „Tuyến LANGBIANG 1 ngày”: wędrówka do wodospadu Thiên Thai z centrum dla zwiedzających, nie na szczyt | https://bidoupnuiba.gov.vn/dich-vu/tour-tuyen-du-lich-sinh-thai/tuyen-langbiang-1-ngay | urzędowe (park) | brak |
| LB-TT24 | Tuổi Trẻ: wstrzymanie trasy pieszej na szczyt Langbiang | https://tuoitre.vn/dung-tuyen-di-bo-len-dinh-langbiang-vi-nguy-co-tai-nan-20241031104040017.htm | prasa | 31.10.2024 |
| LB-TTtag | Tuổi Trẻ, indeks tematu „Langbiang”: bez komunikatu o otwarciu szlaku | https://tuoitre.vn/langbiang.html | prasa | najnowszy wpis 12.07.2026 |
| LB-TT26 | Tuổi Trẻ: rodziny w górach i nad morzem latem 2026; droga na szczyt Langbiang ma prawie 12 km | https://tuoitre.vn/mua-he-cung-con-len-rung-xuong-bien-trai-nghiem-thay-vi-dan-mat-vao-dien-thoai-100260712150325722.htm | prasa | 12.07.2026 |

### Pù Luông

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| PL-TT | Tuổi Trẻ: rezerwat otwiera trasę na szczyt; zapis w centrum ochrony przyrody rezerwatu, pod numerem 0968.123336 i przez formularz forms.gle | https://tuoitre.vn/mo-tuyen-chinh-phuc-dinh-pu-luong-don-du-khach-thich-du-lich-mao-hiem-ve-voi-xu-thanh-20251110160250925.htm | prasa | 10.11.2025 |
| PL-VNP | VietnamPlus: wersje 1-dniowa i 2 dni/1 noc, limit gości, 67 obiektów na ok. 2800 miejsc | https://www.vietnamplus.vn/danh-thuc-tiem-nang-du-lich-sinh-thai-rung-dac-dung-pu-luong-post1080094.vnp | prasa | 30.11.2025 |
| PL-FORM | Formularz „Đăng ký tham quan KBTTN Pù Luông”: cele, bramy, usługi, infolinia 7:00–17:00, kontakt w 30 minut, pytanie o narodowość | https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform | urzędowe (formularz rezerwatu) | brak |
| PL-HD | Tuổi Trẻ: jaskinia Hang Dơi w Kho Mường zamknięta od 12.09.2026 z powodu spadających skał | https://tuoitre.vn/tam-dung-tham-quan-hang-doi-o-pu-luong-vi-da-roi-nguy-hiem-100260912115500968.htm | prasa | 12.09.2026 |
| PL-EG | Pù Luông Eco Garden: wędrówka do wodospadu Hiêu z lokalnym przewodnikiem, start o 8:30 | https://puluongecogarden.com/products/hieu-waterfal-1-day-trek-8kms-medium-trek/ | operator (nocleg) | brak |
| PL-NAT | Pù Luông Natura: wędrówki i ceny, m.in. Kho Mường z Hang Dơi | https://puluongnatura.com/tour/ | operator (nocleg) | brak |
| PL-BG | Pù Luông Boutique Garden: wycieczki prywatne | https://puluongboutiquegarden.com/ | operator (nocleg) | brak |
| PL-RET | Pù Luông Retreat: trasy piesze (curl 406) | https://puluongretreat.com/experience/21-di-bo | operator (nocleg) | brak |
| HS-PL24 | Tuổi Trẻ: w Pù Luông brak wolnych pokoi przez 5 dni długiego weekendu 30.04–1.05.2024, ok. 3200 gości na dobę | https://tuoitre.vn/bien-sam-son-chat-cung-nguoi-pu-luong-khong-con-phong-nghi-20240427191329134.htm | prasa | 27.04.2024 |
| HS-PL26 | Tuổi Trẻ: na 2.09.2026 obłożenie w Pù Luông 100% | https://tuoitre.vn/du-lich-thanh-hoa-don-485-ngan-khach-dip-le-thu-873-ti-dong-100260902121014077.htm | prasa | 2.09.2026 |

### Ba Bể

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| BB-ZAK | Báo Văn hóa: zakaz zabaw na wodzie na jeziorze od 7.07.2026 | https://baovanhoa.vn/du-lich/tam-dung-moi-hoat-dong-vui-choi-giai-tri-tren-mat-nuoc-ho-ba-be-245299.html | prasa | 13.07.2026 |
| BB-GM | Báo Văn hóa: wyjaśnienie gminy Ba Bể (pismo 120/TB-UBND), legalne łodzie pływają | https://baovanhoa.vn/du-lich/xa-ba-be-len-tieng-ve-thong-tin-dung-dich-vu-du-lich-tren-ho-245686.html | prasa | 14.07.2026 |
| BB-144 | Báo Văn hóa: 144 łodzie dopuszczone do ruchu, ok. 78 noclegów, ok. 16 600 gości w I kwartale 2026 | https://baovanhoa.vn/du-lich/ho-ba-be-mo-loi-phat-trien-du-lich-xanh-vung-trung-du-mien-nui-phia-bac-225078.html | prasa | 5.05.2026 |
| BB-PN | Báo Văn hóa: Pác Ngòi, noclegi u gospodarzy i przewoźnicy | https://baovanhoa.vn/dan-toc-ton-giao/khi-di-san-la-chia-khoa-mo-canh-cua-thinh-vuong-190401.html | prasa | 21.12.2025 |
| BB-BEN | Báo Văn hóa: sześć przystani działa znowu, zgoda do 10.01.2028, nadzór zarządu parku, łodzie do 12 osób | https://baovanhoa.vn/du-lich/loat-ben-thuy-phuc-vu-khach-tham-quan-hoat-dong-tro-lai-tai-ho-ba-be-258328.html | prasa | 22.08.2026 |
| BB-ML | babenationalpark.com.vn: prywatne biuro Ba Be National Park Travel Co., Ltd., rezerwacja i płatność | https://babenationalpark.com.vn/en/guide/booking-and-payment.aspx | operator | brak (© 2012–2025) |
| BB-FAKE | babenationalparktour.com: strona z tekstem zastępczym i linkami do kasyn | https://babenationalparktour.com/ | komercyjne | brak |
| BB-WV | Wikivoyage, Ba Be National Park: najwięcej ludzi w VIII–IX | https://en.wikivoyage.org/wiki/Ba_Be_National_Park | wiki | brak |
| BB-WIKI | Wikipedia po wietnamsku, „Vườn quốc gia Ba Bể”: podaje babenationalparktour.com jako stronę parku | https://vi.wikipedia.org/wiki/V%C6%B0%E1%BB%9Dn_qu%E1%BB%91c_gia_Ba_B%E1%BB%83 | wiki | brak |

### Noclegi u gospodarzy (pozostałe)

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| HS-CT | Portal turystyczny Cần Thơ: lista 18 noclegów, bez noclegów u gospodarzy w Phong Điền | https://canthotourism.vn/vi/hotels | urzędowe (portal) | brak |
| HS-WV | Wikivoyage, Ban Gioc Waterfall: proste noclegi, strefa przygraniczna | https://en.wikivoyage.org/wiki/Ban_Gioc_Waterfall | wiki | brak |
| HS-CB | Portal turystyczny Cao Bằng: punkty turystyki wiejskiej, w tym Khuổi Ky | https://dukhach.caobang.gov.vn/danh-lam-thang-canh/hap-dan-nhung-diem-du-lich-cong-dong-620534 | urzędowe (portal) | 2.08.2019 |

### Cao Bằng

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CAO-ECO1 | Cao Bang Eco Travel, strona główna: przy wynajmie dowód osobisty, prawo jazdy albo paszport | https://caobangecotravel.com/ | operator | brak |
| CAO-ECO2 | Eco Travel, pętla 3 dni/2 noce: warianty Car, Easyrider i samodzielnie, ceny, trasa, rezygnacja 48 h | https://caobangecotravel.com/3-days-2-nights-tour/ | operator | brak |
| CAO-ECO3 | Eco Travel, cennik motocykli: oddanie w innym mieście za dopłatą | https://caobangecotravel.com/motorbike/ | operator | brak |
| CAO-ECO4 | Eco Travel, o firmie: licencja 04-0009/2026/CDLQGVN-GP LHQT, adres, od 2015 roku, ponad 200 motocykli, grupy do 8 osób | https://caobangecotravel.com/about-us/ | operator | brak |
| CAO-ECO5 | Hostelworld, Cao Bang Eco Homestay: 185 opinii, ocena 8,7 | https://www.hostelworld.com/hostels/p/286788/cao-bang-eco-homestay/ | komercyjne | brak |
| CAO-GR1 | Cao Bang Green Riders, strona główna: ceny ustalane na miejscu, 18 opinii z Google | https://caobanggreenriders.com/ | operator | brak |
| CAO-GR2 | Green Riders, cennik wynajmu motocykli | https://caobanggreenriders.com/rental | operator | brak |
| CAO-GR3 | Green Riders, FAQ: sezony (połowa IX–połowa XI, III–połowa V), rada wczesnej rezerwacji, prawo jazdy, bez przedpłaty, ubezpieczenie, auto „relatively costly” | https://caobanggreenriders.com/faq | operator | brak (© 2023) |
| CAO-GR4 | Green Riders, o firmie: licencja 04-0011/2026/CDLQGVN-GP LHQT z 27.08.2026, adres | https://caobanggreenriders.com/about-us | operator | brak |
| CAO-GR5 | Green Riders, wycieczki 1–8 dni za kierowcą motocykla albo samodzielnie | https://caobanggreenriders.com/tours | operator | brak |
| CAO-PT | Power Traveller: wycieczka z easy riderem Green Riders, ocena 5,0 przy 11 albo 51 opiniach (strona z linkami partnerskimi) | https://powertraveller.com/ban-gioc-waterfall-mt-angel-eye-full-day-trip-with-easy-rider/ | komercyjne | brak |
| CAO-LV1 | LocalVietnam, prywatna wycieczka po Cao Bằng: dostępność kierowców i przewodników bywa różna | https://localvietnam.com/tour/private-cao-bang-tour-itinerary/ | operator | brak |
| CAO-LV2 | LocalVietnam, mała pętla Cao Bằng: rada rezerwacji z wyprzedzeniem w sezonie i w święta | https://localvietnam.com/tour/cao-bang-small-loop-tour/ | operator | brak |
| CAO-VT | vietnamtourism.com (wydawca nieustalony), pętla Cao Bằng samodzielnie: lista wypożyczalni bez adresów | https://www.vietnamtourism.com/en/cao-bang-loop-self-drive-the-complete-2026-guide | komercyjne | 30.05.2026 |
| CAO-EXP† | Expedia, The Loop Tours: pętla z easy riderem z Loop Hostel w Cao Bằng (wyniki wyszukiwania) | https://www.expedia.com/things-to-do/loop-tours-cao-bang-loop-3-days-3-nights-easy-rider.a50105363.activity-details | pośrednik | brak |
| CAO-LOK | Lokalee: wycieczka 2 dni/1 noc z kierowcą, bez zwrotów | https://www.lokalee.app/tours/cao-bang-adventure-tour-2d1n-with-driver | pośrednik | brak |

### Przełęcz Hải Vân

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| HV-HTS1 | Hoi An Transport Service, Hội An–Huế: ceny za auto, postoje, przejazd przed 11:00, tunel jako szybsza droga | https://hoiantransportservice.com/hoi-an-hue-private-car/ | operator | brak |
| HV-HTS2 | Hoi An Transport Service, FAQ: rezerwacja w ostatniej chwili możliwa, ale radzą wcześniej | https://hoiantransportservice.com/f-a-q/ | operator | brak |
| HV-HTS3 | Hoi An Transport Service, przejazdy z Hội An: inna cena tego samego przejazdu | https://hoiantransportservice.com/private-car-with-driver-from-hoi-an/ | operator | brak |
| HV-HTS4 | Hoi An Transport Service, strona główna: adres, licznik 162 opinii w Google | https://hoiantransportservice.com/ | operator | brak |
| HV-HDT1 | Hoi An Day Trip, Đà Nẵng–Huế: dopłata 100 000 VND od osoby w święta | https://hoiandaytrip.com/da-nang-to-hue-private-transfer/ | operator | brak |
| HV-HDT2 | Hoi An Day Trip, strona główna: adres, licencja 49-136/2024/CDLQGVN-GP LHQT | https://hoiandaytrip.com/ | operator | brak |
| HV-HDT3 | Hoi An Day Trip, wycieczki przez przełęcz z ceną „From $0” | https://hoiandaytrip.com/hai-van-pass-tours/ | operator | brak |
| HV-HL1 | Hidden Land Travel, wynajem Hội An → Huế: dowóz do hotelu, zwrot w Huế, bagaż, kaucja | https://hiddenlandtravel.com/rental/hoi-an-to-hue-motorbike-rental/ | operator | brak |
| HV-HL2 | Hidden Land Travel, kontakt i adresy biur | https://hiddenlandtravel.com/why-us/ | operator | brak |
| HV-HL3 | Hidden Land Travel, auta prywatne z Huế, „From 65” | https://hiddenlandtravel.com/tour-category/hue-private-car | operator | brak |
| HV-MIA | mia.vn, wypożyczalnie motocykli w Hội An: Hidden Land specjalizuje się w wynajmie w jedną stronę | https://mia.vn/cam-nang-du-lich/top-dia-chi-thue-xe-may-hoi-an-uy-tin-21235 | komercyjne | 6.08.2026 |
| HV-TG1 | Tigit Motorbikes: wynajem w jedną stronę Đà Nẵng–Huế, „service is limited” | https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike | operator | 18.08.2018 |
| HV-TG2 | Tigit Motorbikes, cennik i kaucja | https://www.tigitmotorbikes.com/prices/ | operator | brak |
| HV-ST1 | Style Motorbikes, FAQ: wynajem w jedną stronę między własnymi sklepami, wymagania co do prawa jazdy | https://stylemotorbikes.com/faq/ | operator | brak |
| HV-ST2 | Style Motorbikes, kontakt: 171 Cửa Đại, Hội An | https://stylemotorbikes.com/contact/ | operator | brak |
| HV-GMH | Good Morning Hội An, Hội An–Huế: poleca Hoi An Transport Service (z reklamą firmy), pisze o biurach wypożyczalni w Huế | https://goodmorning-hoian.com/en/how-to-get-from-hoi-an-to-hue/ | blog z reklamą | 21.04.2026, wpis 2.10.2026 |
| HV-MV | Motorvina: strona się nie otwiera (wygasły certyfikat) | https://motorvina.com/ | operator | brak |
| HV-HPC | Hoi An Private Car: bez adresu, licencji i opinii | https://hoian-private-car.com/ | operator | brak |
| HV-G365 | Go365: biuro internetowe z Nha Trang, przejazd Hội An–Huế | https://go365.vn/en/blog/xe-hoi-an-di-hue-deo-hai-van | pośrednik | 14.06.2026 |
| HV-VIA† | Viator: wynajem w jedną stronę Huế → Hội An (wyniki wyszukiwania) | https://www.viator.com/tours/Hue/1-Way-rental-Hue-to-Hoi-An-via-Hai-Van-Pass/d5219-196903P2 | pośrednik | brak |

### Hồ Chí Minh City, Hà Nội, Hội An i Huế

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CG-SGT | Saigontourist, wynajem aut z kierowcą: co najmniej 2 dni wcześniej, w szczycie 1–2 tygodnie, odpowiedź w 30 minut, infolinia 1900 1808 | https://xedulich.saigontourist.net/ | operator | brak (© 2026) |
| CG-ML | Mai Linh, wynajem aut: bez szczegółów i cen | https://mailinh.vn/dich-vu/xe-cho-thue-mai-linh.html | operator | brak |
| CG-MOST | Tuổi Trẻ: harmonogram mostu Cần Giờ zamiast promu Bình Khánh | https://tuoitre.vn/du-an-cau-can-gio-thay-pha-binh-khanh-do-masterise-lam-nha-dau-tu-tien-do-ra-sao-100260913110614374.htm | prasa | 13.09.2026 |
| CG-PROM | Tuổi Trẻ: prom Bình Khánh | https://tuoitre.vn/pha-binh-khanh-20260324154309032.htm | prasa | 24.03.2026 według adresu |
| CG-PROM23 | Tuổi Trẻ: przeciążenie promu Bình Khánh w święta | https://tuoitre.vn/tp-hcm-thue-them-pha-giam-tai-cho-ben-binh-khanh-20230821093450438.htm | prasa | 21.08.2023 |
| DLM-WIKI | Wikipedia po wietnamsku, „Làng cổ Đường Lâm”: ok. 50 km na zachód od Hà Nội, okręg Sơn Tây, dom wspólnoty Mông Phụ z 1684 roku | https://vi.wikipedia.org/wiki/L%C3%A0ng_c%E1%BB%95_%C4%90%C6%B0%E1%BB%9Dng_L%C3%A2m | wiki | ostatnia edycja 5.10.2026 |
| DLM-SITE | duonglamvillage.com: „oficjalna strona informacji i usług” wsi bez podanego prowadzącego; link do biletów z `utm_source` | https://duonglamvillage.com/ | komercyjne | brak (© 2026, promocje z 2021) |
| HA-TQ | Centrum zabytków Hội An, „Điểm tham quan làng rau Trà Quế”: 2,5 km od starego miasta, praca w ogrodzie, napój z nasion bazylii | http://www.hoianworldheritage.org.vn/vi/news/Lang-nghe/diem-tham-quan-lang-rau-tra-que-1902.hwh | urzędowe (zarząd zabytków) | 3.01.2020 |
| HA-TQWW | Tra Que Water Wheel, strona firmy: kontakt przez WhatsApp, opis lekcji | https://traquewaterwheel.com/ | operator | brak (© 2022, wpisy z 10.2021) |
| HA-CK1 | Cookly, lekcja w Tra Que Water Wheel: 53 USD, 8:30 i 13:30, rezygnacja do 48 h, 17 opinii | https://www.cookly.me/do/1241-authentic-vietnamese-cooking-class-with-organic-herb-garden-visits-at-tra-que-water-wheel/in/hoi-an | pośrednik | brak (najnowsza opinia 15.12.2025) |
| HA-CK2 | Cookly, lekcja w Tra Que Garden Restaurant & Vietnamese Cooking Class: 33 USD, 10:00 i 15:00, 8 opinii | https://www.cookly.me/do/4186-family-run-vietnamese-cooking-experience-in-tra-que-village/in/hoi-an | pośrednik | brak (najnowsza opinia 9.09.2026) |
| HA-CKL | Cookly, lekcje gotowania w Hội An: pięć lekcji w Trà Quế, najbliższe terminy „Tomorrow” i „In 2 Days” | https://www.cookly.me/cooking-class/hoi-an | pośrednik | brak |
| HUE-ET | Centrum Ochrony Zabytków Huế, sklep z biletami elektronicznymi (aplikacja JavaScript) | https://eticket.hueworldheritage.org.vn/ | urzędowe (zarząd zabytków) | brak |
| HUE-GV | Centrum, cennik: Đại Nội 200 000 i 40 000 VND od 2.06.2026, bilety łączone od 4.01.2026, przycisk „Đặt vé ngay” | https://hueworldheritage.org.vn/Thong-tin-tham-quan/Gia-ve | urzędowe (zarząd zabytków) | brak |
| HUE-TG | Centrum, godziny: kasy 6:30–17:30 (16.03–15.10) i 7:00–17:00 (16.10–15.03), zwiedzanie do 60 minut po zamknięciu kas | https://hueworldheritage.org.vn/Thong-tin-tham-quan/Thoi-gian-tham-quan | urzędowe (zarząd zabytków) | 12.03.2024 |
| HUE-VNN | VietNamNet: bilety elektroniczne od 20.12.2022, kod QR przy bramce, Đại Nội i trzy grobowce | https://vietnamnet.vn/du-khach-den-quan-the-di-tich-co-do-hue-quet-ma-qr-de-thanh-toan-phi-tham-quan-i5010716.html | prasa | 22.12.2022 |
| HUE-BVH | Báo Văn hóa: przed 30.04–1.05.2024 Centrum radzi kupić bilet elektroniczny wcześniej, po kolejkach z 2023; infolinia 0935 966 201 | https://baovanhoa.vn/du-lich/di-san-hue-tang-cuong-nhan-luc-don-khach-tham-quan-dip-nghi-le-304-va-15-91799.html | prasa | 25.04.2024 |

### Uzupełnienie 12.10.2026

Adresy otwarto 12.10.2026: z 12 nowych adresów 10 otwiera się, a dwa oznaczone † nie otworzyły się dla narzędzia (kod w opisie). Ponownie otwarte 12.10.2026: CT-VNE, CT-VT, LB-PARK, LB-TT24 i PL-HD (wszystkie kod 200). Plik PDF z cennikiem Cát Tiên (CT-CENY) narzędzie pobrało, ale go nie odczytało.

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CT-POTOO | Potoo, przewodnik po Cát Tiên 2026: gibony (łódź 4:45, koniec ok. 7:30, ok. 25 USD, rezerwacja w centrum dla zwiedzających), rowery 100 000 i 150 000 VND plus kaucja 200 000 VND, prom 60 000 VND, most w budowie w IV 2026 | https://potoo.is/cat-tien-national-park-2026-visitor-guide-in-english/ | blog | 1.05.2026 |
| CT-BVIS | British Vietnamese International School HCMC (Nord Anglia), aktualności: klasa 13 w Cát Tiên 13–15.02.2025, wizyta na Đảo Tiên | https://www.nordangliaeducation.com/vi/bvis-hcmc/news/2025/02/15/year-13-biology-students-explore-conservation-at-cat-tien-national-park | blog (aktualności szkoły) | 15.02.2025 |
| CT-VNS | Việt Nam News, „Cát Tiên: a sanctuary for endangered wildlife”: ośrodek na wyspie Tiên (ponad 140 naczelnych uratowanych i wypuszczonych), ośrodek ratowania, ochrony i rozwoju gatunków parku (66 ha, prawie 50 naczelnych) | https://vietnamnews.vn/life-style/1724742/cat-tien-a-sanctuary-for-endangered-wildlife.html | prasa | 8.09.2025 |
| CT-EAST† | EAST, „The re-opening of Dao Tien to visitors”: otwarcie po ponad dwóch latach przerwy, bez daty (wyniki wyszukiwania; kod 401) | https://www.go-east.org/the-re-opening-of-dao-tien-to-visitors/ | operator (fundacja) | brak |
| CT-CC† | Rejestr organizacji charytatywnych Anglii i Walii: Endangered Asian Species Trust, nr 1115350, sprawozdania składane na czas, ostatnie za rok do 28.02.2025 (wyniki wyszukiwania; kod 000, przy WebFetch 403) | https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/4022324 | urzędowe (Wielka Brytania) | brak |
| WIKI-MW | Wikipedia, „Monkey World”: Đảo Tiên założony w 2008 r. przez Monkey World, Pingtung Rescue Centre, park Cát Tiên i służbę ochrony lasów; prowadzi go EAST | https://en.wikipedia.org/wiki/Monkey_World | wiki | edycja 7.07.2026 |
| CT-HOME | Park Cát Tiên, strona główna: brak komunikatów o Đảo Tiên, gibonach i moście | https://cattiennationalpark.com.vn/ | urzędowe (park) | najnowszy wpis 7.08.2026 |
| CT-TOUR | Park, „Tour thăm quan”: programy 2 dni/1 noc i 3 dni/2 noce, nocne safari, mapa tras; bez spaceru do gibonów i bez Đảo Tiên | https://cattiennationalpark.com.vn/thong-tin-tour-du-lich/ | urzędowe (park) | wpisy z 2.01.2023 i 20.03.2023 |
| LB-BLD | Báo Lâm Đồng, „Khám phá cung đường leo núi xuyên rừng đẹp nhất Đà Lạt”: wejście na Núi Bà (2167 m) w porze suchej 2026, ok. 12 km, tablice i liny, ścieżka parku z lat 2008–2009, współpraca ośrodka Lang Biang z parkiem | https://baolamdong.vn/kham-pha-cung-duong-leo-nui-xuyen-rung-dep-nhat-da-lat-428005.html | prasa | 6.03.2026 |
| LB-CENY | Park Bidoup–Núi Bà, cennik (ten sam adres co DL-CENY): Thiên Thai pół dnia 3,5 km i Thiên Thai – Trạm Kiểm lâm Đưng jar Giêng 1 dzień 10 km, po 250 000 VND od dorosłego (bilet, przewodnik, obiad piknikowy); bez trasy na szczyt Lang Biang | https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/ | urzędowe (park) | od 1.01.2024 |
| PL-HDVNP | VietnamPlus: zarząd rezerwatu wnosi o wstrzymanie wizyt w Hang Dơi po zgłoszeniu z 10.09.2026; tablice, kontrola wejść, zespół kontrolny; wizyty bez zgody władz, „hoàn toàn tự phát”, wstrzymanie opłat | https://www.vietnamplus.vn/thanh-hoa-de-nghi-dung-tham-quan-hang-da-250-trieu-nam-de-dam-bao-an-toan-post1135691.vnp | prasa (agencja państwowa) | 12.09.2026 |
| PL-HDLC | Báo Lào Cai za VnExpress: Hang Dơi zamknięta do zakończenia kontroli przez gminę; ok. 2,5 km, wejście wyższe niż 10 m; wieś pobierała opłaty bez zezwolenia | https://baolaocai.vn/dung-tham-quan-hang-250-trieu-nam-tuoi-o-thanh-hoa-vi-da-roi-post909263.html | prasa | 12.09.2026 |

### Sprawdzenie przed publikacją (14.10.2026)

Sprawdzenie punktów do etapu 4 o Cát Tiên: adresy otwarto 14.10.2026 (WebSearch i WebFetch, bez zapisywania stron), poza oznaczonym † (treść znana tylko z wyników wyszukiwania). CT-2026-10-14a, b i c to te same strony co CT-HOME, CT-CENY i CT-VNE, otwarte znowu 14.10.2026.

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| CT-2026-10-14a | Park Cát Tiên, strona główna: najnowsze wpisy z 3.07 i 7.08.2026; nic o noclegu nad Bàu Sấu, nowym cenniku, przekazaniu miastu, Đảo Tiên, gibonach, moście i promie; w stopce nazwa parku i logotypy ministerstwa | https://cattiennationalpark.com.vn/ | urzędowe (park) | najnowszy wpis 7.08.2026 |
| CT-2026-10-14b | Park, cennik: te same pliki PDF (decyzja z 2024 w folderze 2025/07 i cennik dla gości krajowych w folderze 2024/06), wpis z 20.03.2023; bez nowej daty | https://cattiennationalpark.com.vn/bang-gia-dich-vu/ | urzędowe (park) | wpis 20.03.2023 (odczyt 14.10.2026) |
| CT-2026-10-14c | VnExpress, przewodnik po parku: nocleg nad Bàu Sấu (wyjazd do 13:00 rowerem albo 14:00 autem, powrót do 9:30, bez namiotów), opłata 250 000 VND, auto 640 000 VND, przewodnik 450 000 VND; Đảo Tiên zamknięte bez daty i powodu; prom w cenie biletu; o moście nic | https://vnexpress.net/cam-nang-du-lich-vuon-quoc-gia-cat-tien-4775984.html | prasa | 9.08.2024, aktualizacja 25.05.2026 |
| CT-2026-10-14d | Thanh Niên: uchwała 188/NQ-CP z 16.07.2026 o przekazaniu parku miastu Đồng Nai; ok. 44 000 ha w Đồng Nai i 27 300 ha w Lâm Đồng; o usługach turystycznych nic | https://thanhnien.vn/kham-pha-vuon-quoc-gia-cat-tien-canh-rung-nguyen-sinh-hon-71000-ha-ben-song-dong-nai-185260720202522645.htm | prasa | 21.07.2026 |
| CT-2026-10-14e | VietnamPlus: plan ekoturystyki parku 2025–2030 (19 miejsc, 15 tras, 142 km); o Bàu Sấu, Đảo Tiên, gibonach, promie i moście nic | https://www.vietnamplus.vn/vuon-quoc-gia-cat-tien-la-phoi-xanh-cua-the-gioi-tai-viet-nam-post1135557.vnp | prasa (agencja państwowa) | 26.09.2026 |
| CT-2026-10-14f | Báo Đồng Nai: początek budowy mostu przez Đồng Nai do parku, ponad 156 m, 5 przęseł, szerokość 7 m, 10 t na oś, 50 mld VND (45 z budżetu, 5 z parku), zakończenie planowane na początek 2026; dotąd do parku tylko promem | https://baodongnai.com.vn/tin-moi/202504/khoi-cong-cau-qua-song-vao-vuon-quoc-gia-cat-tien-c8c019f/ | prasa (dziennik prowincji) | 4.04.2025 |
| CT-2026-10-14g | Nông nghiệp và Môi trường: to samo, w dzienniku ministerstwa rolnictwa i środowiska; prom nazwany niewygodnym i niebezpiecznym | https://nongnghiepmoitruong.vn/khoi-cong-xay-dung-cau-vao-vuon-quoc-gia-cat-tien-d746637.html | prasa (dziennik ministerstwa) | 4.04.2025 |
| CT-2026-10-14h† | Wanderlog (zestawienie opinii Google): codzienne wycieczki na Đảo Tiên o 8:30 z centrum dla zwiedzających, 400 000 VND; strona nie pokazuje dat opinii, a datę opinii (styczeń 2026) znam tylko z wyników wyszukiwania | https://wanderlog.com/place/details/30765/dao-tien-endangered-primate-species-centre | blog | brak (opinia z I 2026†) |
