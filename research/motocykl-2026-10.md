# Motocykl: przepisy, ryzyko i ceny (sprawdzone 11.10.2026)

**Do czego.** Dane dla planu 2B: zamiana albo–albo „Z kierowcą / Samodzielnie” w dwóch miejscach. Pierwsze to pętla po Cao Bằng (`site2/src/content/caobang.js`), drugie przejazd Hội An–Huế przez przełęcz Hải Vân (tekst `r.haivan` w `site2/src/ui.js`, klucz `hoian-hue` w `site2/src/content.js`). Plik daje: warunek prawny do jednego zdania pod przełącznikiem, fakty do ramki „Samodzielnie” (wymagania, ryzyko, rady) i kwoty do budżetu (klucze `caobang.*` i `haivan.*`). Adresy otwarto 11.10.2026, późniejsze zmiany nie są uwzględnione.

- **Wynik w skrócie:**
  - **Legalnie można, ale tylko z kategorią motocyklową.** Potrzebne jest polskie prawo jazdy z kategorią A1 (do 125 cm³), A2 albo A oraz międzynarodowe prawo jazdy według konwencji wiedeńskiej z 1968 r. Oba dokumenty trzeba mieć przy sobie (VN-LUAT art. 57 ust. 6 i 8; PL-UKP art. 5 ust. 3).
  - **Samo B nie wystarcza**, także na skuter 110–125 cm³. W Wietnamie to motocykl kategorii A1. Polskie B po 3 latach daje prawo do motocykla 125 cm³ tylko na terytorium Polski (PL-UKP art. 6 ust. 3 pkt 4, dodany przez PL-2014). Bez kategorii A1, A2 albo A legalny jest tylko motorower do 50 cm³, który w górach się nie sprawdzi.
  - **Mandat za jazdę bez uprawnień** wynosi 2–4 mln VND (69–138 EUR) do 125 cm³ i 6–8 mln VND (207–275 EUR) powyżej. Możliwe jest też zatrzymanie motocykla. Brak kasku kosztuje 400 000–600 000 VND (14–21 EUR) od osoby. Kwoty pochodzą z omówień, bo urzędowego tekstu dekretu 168/2024/NĐ-CP nie otworzyłem (sekcja „Kary”).
  - **Ubezpieczenie.** OWU Warta Travel wyłączają zdarzenia przy prowadzeniu pojazdu bez uprawnień wymaganych w danym kraju i przy działaniu wbrew miejscowemu prawu. Do tego OC w życiu prywatnym nie obejmuje szkód z kierowania pojazdami, więc nawet z uprawnieniami szkody wyrządzone innym zostają poza polisą (OWU-WARTA § 11 i § 14).
  - **Ryzyko.** WHO szacuje śmiertelność na drogach w Wietnamie na 17,7 na 100 000 mieszkańców, a w Polsce na 6,5 (2021). To ok. 2,7 raza więcej (WHO-GHO).
  - **MSZ RP** odradza samodzielne podróże motocyklem po Wietnamie, zwłaszcza poza największymi ośrodkami, ale strona celowo nie cytuje tej rady w ramce „Samodzielnie”, a przełącznik „Z kierowcą / Samodzielnie” zostaje bez zmian (decyzja z 14.10.2026; WJ-2026-10-14p w `research/wjazd-2026-10.md`).

## Jak czytać

- **Etykiety źródeł** stoją w nawiasach, np. (VN-LUAT art. 57). Pełna lista z adresami i datami jest w sekcji „Źródła”. **†** oznacza stronę, której treść widziałem tylko w wynikach wyszukiwania, bo dla narzędzia zwraca 403.
- **Rodzaje źródeł:** urzędowe (ustawy, ministerstwa, ONZ, WHO, MSZ, FCDO), prasa, operator (wypożyczalnia, biuro), przewodnik komercyjny, blog i komentarze czytelników (tylko jako uzupełnienie).
- **Przepisy wietnamskie** czytałem z tekstu ujednoliconego ustawy (VN-LUAT, z nowelizacją od 1.07.2026), a brzmienie z 2024 r. porównałem z VN-LUAT24. Kary z dekretu 168/2024/NĐ-CP znam tylko z omówień (sekcja „Kary”).
- **Kurs:** 1 EUR = 29 055 VND, 1 USD = 25 901 VND, 1 EUR = 1,1218 USD, 1 EUR = 4,3775 zł (NBP: tabela A 197/A/NBP/2026 z 9.10.2026, tabela B 040/B/NBP/2026 z 7.10.2026; kursy podane w zadaniu). EUR zaokrąglam do pełnych euro.
- **Ceny** pochodzą ze stron z 2026 r. i są typowe poza szczytem, bez dopłat świątecznych. Podaję cenę surową (VND albo USD) i EUR.
- **Szacunek** oznacza wartość wyliczoną, a nie podaną przez źródło. Przy każdym szacunku podaję metodę.
- **Wyszukiwanie:** WebSearch w trybie standardowym, po wietnamsku, angielsku i polsku (17 zapytań). Potem wyczerpał się limit wyszukiwań w tej sesji. Resztę czytałem przez WebFetch: z adresów znalezionych wcześniej i z linków na otwartych stronach. Dlatego nie sprawdziłem wietnamskiej prasy o kontrolach w latach 2024–2026 (sekcja „Czego nie ustaliłem”).

## Prawo: kto może prowadzić motocykl w Wietnamie

### Konwencja wiedeńska o ruchu drogowym (1968)

- **Polska:** podpis 8.11.1968, ratyfikacja 23.08.1984. Zastrzeżenie do art. 52 (spory przed MTS) Polska wycofała 16.10.1997 (UN-1968).
- **Wietnam:** przystąpienie 20.08.2014, z zastrzeżeniem, że nie wiąże go art. 52 (UN-1968).
- Strona ONZ podaje daty złożenia dokumentów, a nie daty wejścia w życie dla obu państw. Tych dat nie ustaliłem.
- **Wietnam nie jest stroną konwencji genewskiej z 1949 r.** Na liście gov.pl jest tylko wśród państw konwencji wiedeńskiej (GOV-MPJ), to samo pisze Tigit (TIGIT-IDP). Wypożyczalnia Tigit pisze, że od 30.11.2025 część jeźdźców zawrócono z Hà Giang za „złą wersję” IDP (TIGIT-IDP). Zastrzeżenie z 15.10.2026: Zbiór traktatów ONZ wymienia „Viet Nam” wśród stron konwencji z 1949 r., z przystąpieniem Republiki Wietnamu z 2.11.1953 (MOTO-2026-10-15a), ale prawo wietnamskie uznaje tylko IDP z 1968 r. (sekcja „Międzynarodowe prawo jazdy w innych krajach (15.10.2026)”).

### Ustawa wietnamska z 2024 r. i akty wykonawcze

- **Ustawa:** Luật Trật tự, an toàn giao thông đường bộ nr 36/2024/QH15 z 27.06.2024, w mocy od 1.01.2025. Znowelizowała ją ustawa 118/2025/QH15 z 10.12.2025, w mocy od 1.07.2026 (VN-LUAT, nagłówek).
- **Które prawa jazdy są ważne w Wietnamie** (art. 57 ust. 6): wietnamskie; **międzynarodowe prawo jazdy (IDP) razem z krajowym prawem jazdy odpowiednim do rodzaju pojazdu, wydane przez państwo konwencji wiedeńskiej**; prawa jazdy państw, z którymi Wietnam ma umowę o wzajemnym uznawaniu; prawa jazdy uznane na podstawie umów międzynarodowych (VN-LUAT).
- **IDP** (art. 57 ust. 8):
  - wydaje je państwo konwencji wiedeńskiej, według jednolitego wzoru, na najwyżej 3 lata i nie dłużej niż ważność krajowego prawa jazdy (lit. a);
  - posiadacz IDP prowadzący w Wietnamie **musi mieć przy sobie IDP i krajowe prawo jazdy właściwe dla kategorii pojazdu, oba ważne**, i przestrzegać prawa wietnamskiego (lit. b);
  - zakaz używania IDP orzeczony w Wietnamie nie może trwać dłużej niż dozwolony pobyt (lit. c);
  - Wietnam wydaje IDP tylko Wietnamczykom i cudzoziemcom z kartą pobytu (lit. d). Turysta musi więc załatwić IDP w Polsce przed wyjazdem (VN-LUAT; tak samo RAB-LEGAL).
- **Dokumenty przy sobie** (art. 56 ust. 1): dowód rejestracyjny, prawo jazdy właściwe dla pojazdu, zaświadczenie o badaniu technicznym (według przepisów), polisa obowiązkowego OC posiadacza pojazdu. Dokumenty zintegrowane z kontem identyfikacji elektronicznej można pokazać w nim (ust. 3) (VN-LUAT).
- **Kto wydaje przepisy o IDP:** od 1.07.2026 minister bezpieczeństwa publicznego (Bộ Công an) określa wzory praw jazdy i IDP oraz zasady ich używania (art. 57 ust. 9 w brzmieniu ustawy 118/2025/QH15; VN-LUAT, przypis 25).
- **Obowiązujący okólnik:** 108/2026/TT-BCA z 29.06.2026, w mocy od 1.07.2026. Reguluje egzaminy, wydawanie i używanie praw jazdy oraz wydawanie i używanie IDP (TT108-CT, TT108-TVND). Zastąpił okólnik 12/2025/TT-BCA z 28.02.2025 (w mocy od 1.03.2025), z którym resort bezpieczeństwa publicznego przejął prawa jazdy (TT108-LSVN, TT12-LV†). Część przepisów i załączników okólnika 12/2025 obowiązuje do 28.02.2027 (TT108-TVPL†).
  - **Treści przepisu okólnika o używaniu zagranicznego IDP nie odczytałem.** Pełny tekst jest na stronach, które zwracają 403. Zasada „IDP plus krajowe prawo jazdy” wynika jednak wprost z ustawy (art. 57 ust. 8 lit. b), która stoi wyżej.
- **Wiek** (art. 59 ust. 1): motorower od 16 lat, kategorie A1, A i B od 18 lat (VN-LUAT).
- **Punkty karne** (art. 58): wietnamskie prawo jazdy ma 12 punktów w bazie danych. Dla posiadacza IDP ustawa przewiduje zamiast tego zakaz używania IDP na czas nie dłuższy niż pobyt (art. 57 ust. 8 lit. c) (VN-LUAT). Za brak kasku punktów się nie odejmuje (MOMO-KASK).

### Kategorie: Wietnam a Polska

| Wietnam | co obejmuje | czego to wymaga od turysty z Polski |
|---|---|---|
| motorower (xe gắn máy) | 2 albo 3 koła, prędkość konstrukcyjna do 50 km/h, silnik spalinowy do 50 cm³ albo elektryczny do 4 kW (art. 34 ust. 1 lit. g) | bez prawa jazdy, od 16 lat; kierujący musi znać przepisy i umieć prowadzić (art. 56 ust. 1 i 4, art. 59 ust. 1 lit. a) (VN-LUAT; RAB-LEGAL: 50 cm³ od 16 lat) |
| A1 | motocykl dwukołowy do 125 cm³ albo elektryczny do 11 kW (art. 57 ust. 1 lit. a) | polskie A1 (do 125 cm³, 11 kW i 0,1 kW/kg; PL-UKP art. 6 ust. 1 pkt 2) albo A2 lub A, plus IDP |
| A | motocykl dwukołowy powyżej 125 cm³ albo powyżej 11 kW oraz pojazdy A1 (art. 57 ust. 1 lit. b) | polskie A2 (do 35 kW i 0,2 kW/kg) albo A (PL-UKP art. 6 ust. 1 pkt 3 i 4), plus IDP |
| B | samochód osobowy do 8 miejsc bez kierowcy, ciężarowy do 3 500 kg (art. 57 ust. 1 lit. d) | nie obejmuje motocykli; polskie B też ich nie obejmuje (PL-UKP art. 6 ust. 1 pkt 6 lit. a) |

- **Skutery i półautomaty z wypożyczalni mają zwykle 110–125 cm³**, czyli kategorię A1: Honda Wave i Yamaha Sirius (VT-LOOP), Honda Blade 110 (TIGIT-WWW), Honda Future 125 (RAB-RENT), Yamaha Nouvo i Honda Master 125 (HMA). **Manualne 150 cm³** (Honda XR150, Winner 150, Yamaha Exciter; VT-LOOP, TIGIT-WWW) to kategoria A (VN-LUAT art. 57 ust. 1 lit. b). To samo pisze Loop Tours: A1 na półautomat 110 cm³, A na manual 150 cm³ (LOOP-FAQ).
- **Polskie B od 3 lat:** ustawa z 26.06.2014 dodała do art. 6 ust. 3 punkt 4: B uprawnia do motocykla do 125 cm³, 11 kW i 0,1 kW/kg, jeśli ktoś ma B od co najmniej 3 lat (PL-2014). Ustęp 3 zaczyna się od słów „Na terytorium Rzeczypospolitej Polskiej prawo jazdy:” (PL-UKP). **To uprawnienie działa więc tylko w Polsce.** W Wietnamie IDP i krajowe prawo jazdy muszą odpowiadać kategorii pojazdu (VN-LUAT art. 57 ust. 8 lit. b), a samo B jej nie daje. Podobnie piszą przewodnik i wypożyczalnia: prawo jazdy na samochód nie obejmuje skutera 110 cm³ (VT-LEGAL), potrzebne jest prawo jazdy na rodzaj pojazdu, którym się jedzie (RAB-LEGAL).
- **Motorower do 50 cm³** to jedyny legalny jednoślad bez kategorii A1, A2 albo A. W wypożyczalniach bywa rzadko (Tigit ma SYM Shark 50; TIGIT-WWW). Na górskie pętle się nie nadaje. To moja ocena: VT-LOOP odradza w Cao Bằng nawet automaty 110 cm³ i zaleca co najmniej 125 cm³.
- **Polskie A2 w IDP:** konwencja zna kategorię A i podkategorię A1. Jak starostwo wpisuje polskie A2 do IDP, nie ustaliłem. Przy A2 trzeba to sprawdzić w starostwie.

### Polskie międzynarodowe prawo jazdy

- **Konwencja:** starostwo wydaje IDP według wzoru wiedeńskiego albo genewskiego, a na życzenie oba (GOV-MPJ). **Do Wietnamu potrzebny jest wzór wiedeński** (Wietnam jest tylko na liście konwencji wiedeńskiej; GOV-MPJ). Ustawa mówi, że polskie IDP potwierdza uprawnienia w ruchu międzynarodowym w państwach obu konwencji i jest **ważne łącznie z krajowym prawem jazdy** (PL-UKP art. 5 ust. 3, brzmienie pierwotne).
- **Ważność:** 3 lata, nie dłużej niż krajowe prawo jazdy (PL-UKP art. 10 ust. 2, brzmienie pierwotne); gov.pl podaje „do 3 lat” (GOV-MPJ). Tekstu jednolitego z 2025 r. (Dz.U. 2025 poz. 1226) nie czytałem, bo jest tylko w PDF (PL-ELI).
- **Koszt:** 35 zł (8 EUR), oba wzory 70 zł (16 EUR) (GOV-MPJ).
- **Gdzie i jak:** w dowolnym starostwie, osobiście albo pocztą. Potrzebne są wniosek, aktualne zdjęcie (dwa przy obu wzorach), ważne polskie prawo jazdy i potwierdzenie opłaty (GOV-MPJ).
- **Jak szybko:** do 3 dni roboczych od dnia, w którym urząd dostanie potwierdzenie opłaty, zwykle od ręki (GOV-MPJ).

### Międzynarodowe prawo jazdy w innych krajach (15.10.2026)

Pytanie z planu B2 (ustalenie 14): ramka „Samodzielnie” poda wymagania dla każdego paszportu, bez polskich kategorii i starostwa. Czy każdy kraj wydaje IDP według konwencji z 1968 r.? Źródła MOTO-2026-10-15… są w „Źródłach”, w podsekcji „Przesiew i sprawdzenie (15.10.2026)”.

- **Wietnam uznaje tylko IDP z 1968 r.** Ustawa wymaga IDP wydanego przez państwo konwencji wiedeńskiej i krajowego prawa jazdy właściwego dla kategorii, obu przy sobie (VN-LUAT art. 57 ust. 6 i 8). To samo mówi urzędowy tekst dekretu o karach: art. 18 ust. 5 lit. b karze 2–4 mln VND kogoś, kto ma „giấy phép lái xe quốc tế do các nước tham gia Công ước của Liên hợp quốc về Giao thông đường bộ năm 1968 cấp”, ale nie wiezie krajowego prawa jazdy (MOTO-2026-10-15i). Prasa z 2026 r. pisze, że Wietnam uznaje IDP z 1968 r., a z 1949 r. nie (MOTO-2026-10-15c, MOTO-2026-10-15d); tak samo przewodniki po Hà Giang z 2026 r. (HG-BIL, HG-VTH w `research/hagiang-2026-10.md`).
- **Okólnik 108/2026/TT-BCA:** zmiany w tej sprawie nie znalazłem. Przepisu o używaniu zagranicznego IDP dalej nie odczytałem, bo pełny tekst jest tylko na stronach z 403. Omówienia z VII 2026 opisują tylko wydawanie IDP posiadaczom wietnamskiego prawa jazdy (art. 29 ust. 1) i wymianę praw jazdy (art. 21) (MOTO-2026-10-15h, TT108-CT). Okólnik wykonuje ustawę, więc wymogu IDP z 1968 r. z art. 57 nie zmienia.
- **Wietnam a konwencja z 1949 r.:** Zbiór traktatów ONZ wymienia „Viet Nam” wśród jej stron, z przystąpieniem 2.11.1953, którego dokonała Republika Wietnamu (przypis 3; MOTO-2026-10-15a). Dla prowadzącego w Wietnamie liczy się prawo wietnamskie, a ono uznaje tylko IDP z 1968 r.
- **Kto wydaje IDP ważne w Wietnamie:** tylko państwo, które jest stroną konwencji z 1968 r. (VN-LUAT art. 57 ust. 6 i ust. 8 lit. a). Według ONZ (stan na 14.10.2026) konwencja z 1949 r. ma 103 strony, a z 1968 r. 91 stron (MOTO-2026-10-15a, MOTO-2026-10-15b). Kraje, z których przyjeżdża wielu turystów:

| państwo | konwencja z 1949 r. | konwencja z 1968 r. | IDP ważne w Wietnamie |
|---|---|---|---|
| USA | ratyfikacja 30.08.1950 | nie | nie |
| Kanada | przystąpienie 23.12.1965 | nie | nie |
| Australia | przystąpienie 7.12.1954 | nie | nie |
| Nowa Zelandia | przystąpienie 12.02.1958 | nie | nie |
| Japonia | przystąpienie 7.08.1964 | nie | nie |
| Korea Płd. | sukcesja 14.06.1971 | tylko podpis 29.12.1969 | nie |
| Indie | ratyfikacja 9.03.1962 | nie | nie |
| Singapur, Malezja, Irlandia | tak | nie | nie |
| Hiszpania | przystąpienie 13.02.1958 | tylko podpis 8.11.1968 | nie |
| Chiny | nie | nie | nie |
| Wielka Brytania | ratyfikacja 8.07.1957 | ratyfikacja 28.03.2018 | tak, wzór z 1968 r. |
| Francja | ratyfikacja 15.09.1950 | ratyfikacja 9.12.1971 | tak, wzór z 1968 r. |
| Niemcy | nie | ratyfikacja 3.08.1978 | tak |
| Polska | przystąpienie 29.10.1958 | ratyfikacja 23.08.1984 | tak, wzór wiedeński (GOV-MPJ) |
| Włochy, Holandia, Rosja, Tajlandia, Filipiny, Izrael, RPA | tak | tak | tak, wzór z 1968 r. |

- **Państwa obu konwencji** mogą wydawać oba wzory (Polska na życzenie oba, GOV-MPJ), więc trzeba wybrać wzór z 1968 r.
- **USA:** AAA pisze, że Departament Stanu wyznacza wydawców IDP na podstawie art. 24 konwencji z 1949 r. (MOTO-2026-10-15e). Podręcznik Departamentu Stanu (7 FAM 1430) i USA.gov wymieniają jako jedynych wydawców AAA i AATA (MOTO-2026-10-15f†, MOTO-2026-10-15g†). Strona travel.state.gov o jeździe za granicą zwraca 403. Wniosek z tabeli i ustawy: w USA nie da się dostać IDP ważnego w Wietnamie.
- **Wyjątek z ustawy:** prawa jazdy uznawane na podstawie umów międzynarodowych (VN-LUAT art. 57 ust. 6), np. umowy państw ASEAN, o której pisze MOTO-2026-10-15c. Czy obejmuje turystów na motocyklu, nie sprawdzałem.
- **Relacje z 2025–2026:** od 30.11.2025 część jeźdźców zawrócono z Hà Giang za „złą wersję” IDP (TIGIT-IDP); przewodniki po Hà Giang z 2026 r. piszą, że IDP z 1949 r. nie działa (HG-BIL, HG-VTH). Prasa z 2026 r. pisze o tym ogólnie (MOTO-2026-10-15c, MOTO-2026-10-15d) i nie opisuje konkretnego przypadku ukarania. Jazda z samym IDP z 1949 r. to według dekretu jazda bez ważnego prawa jazdy, 2–4 mln VND do 125 cm³ (art. 18 ust. 5 lit. a; MOTO-2026-10-15i). To moja interpretacja, bo dekret nie wymienia IDP z 1949 r. wprost.
- **Wniosek:** zdanie „sprawdź, według której konwencji wydaje je twój kraj” jest potrzebne, bo USA, Kanada, Australia, Nowa Zelandia, Japonia, Korea Płd., Indie, Hiszpania i Irlandia nie są stronami konwencji z 1968 r., więc ich IDP w Wietnamie nie działa.

## Kary

Dekret 168/2024/NĐ-CP obowiązuje od 1.01.2025 (NNMT). Dekret 238/2026/NĐ-CP z 26.06.2026, w mocy od 15.08.2026, zmienił część przepisów. Policja drogowa (Cục CSGT) mówi, że w przepisie o kierujących w wieku 16–18 lat zmienił tylko słownictwo, a kary pozostały równoważne (TP-238, CAFEF-238). Żadne z omówień nie wspomina o zmianie kar za brak uprawnień ani za brak kasku.

| wykroczenie | przepis (według omówień) | VND | EUR | źródła |
|---|---|---|---|---|
| brak uprawnień, motocykl do 125 cm³ albo do 11 kW | art. 18 ust. 5 | 2 000 000–4 000 000 | 69–138 | RAB-LEGAL, MOMO-GPLX, VT-LEGAL, TVPL-GPLX† |
| brak uprawnień, motocykl powyżej 125 cm³ albo powyżej 11 kW | art. 18 ust. 7 | 6 000 000–8 000 000 | 207–275 | RAB-LEGAL, MOMO-GPLX; LOOP-FAQ: „do 8 mln” |
| uprawnienia są, ale prawo jazdy zostało w hotelu | art. 18 ust. 2 | 200 000–300 000 | 7–10 | RAB-LEGAL, MOMO-GPLX; według NNMT lit. d tego ustępu dotyczy motocykli w przewozie zarobkowym, więc przepis dla turysty nie jest pewny |
| brak ważnej polisy obowiązkowego OC | art. 18 ust. 2 lit. a i b | 200 000–300 000 | 7–10 | LSVN-BH (wcześniej 100 000–200 000) |
| kierujący bez kasku albo z niezapiętym kaskiem; osobno kierujący za pasażera bez kasku i sam pasażer | art. 7 lit. h i i (kierujący), art. 12 ust. 5 (pasażer) | 400 000–600 000 od osoby | 14–21 | MOMO-KASK, VT-LEGAL |

- **IDP bez krajowego prawa jazdy** to brak ważnych uprawnień, bo IDP działa tylko razem z krajowym prawem jazdy (VN-LUAT art. 57 ust. 6 lit. b). Tekst dekretu na hoatieu.vn wymienia ten przypadek w tym samym ustępie co brak prawa jazdy (art. 18 ust. 5 lit. b) (HOATIEU).
- **Różnica w źródłach:** tekst dekretu na hoatieu.vn podaje 1–2 mln VND dla motocykli „poniżej 125 cm³” i 4–5 mln VND „od 125 cm³”, a za brak OC 100 000–200 000 VND (HOATIEU). Progi nie zgadzają się z kategoriami ustawy (A1 to „do 125 cm³”), a kwota za OC zgadza się z poprzednim dekretem 100/2019 (LSVN-BH). To najpewniej starsza wersja tekstu. Cztery inne źródła podają 2–4 i 6–8 mln VND. Urzędowego tekstu dekretu nie otworzyłem. Sprawdzone 15.10.2026: urzędowy tekst na portalu rządu podaje 2–4 mln VND (ust. 5) i 6–8 mln VND (ust. 7), a ust. 2 lit. d dotyczy tylko przewozu zarobkowego (MOTO-2026-10-15i).
- **Zatrzymanie motocykla:** art. 48 ust. 3 lit. a dekretu mówi o protokole wobec właściciela pojazdu i o zatrzymaniu pojazdu (tạm giữ phương tiện) „według przepisów” (NNMT). MOMO-GPLX pisze o 7 dniach do 2 miesięcy, VT-LEGAL o 7 dniach. Przepisu o czasie zatrzymania nie odczytałem.
- **Kary w praktyce:** czytelnicy przewodnika po Hà Giang zapłacili w 2025 r. po 3 mln VND (103 EUR) (COR-HG). Tigit podaje dla Hà Giang ok. 3 mln VND od osoby (TIGIT-IDP). To mieści się w przedziale 2–4 mln VND.
- **Wypożyczalnie i biura:** Loop Tours pisze o karach do 20 mln VND dla biur, które wypuszczają ludzi bez uprawnień, z ryzykiem utraty licencji. Nie podaje przepisu (LOOP-FAQ). Nie sprawdziłem tego.

## Kontrole

- **Hà Giang** (od uchwały 202/2025/QH15 z 12.06.2025 w prowincji Tuyên Quang; WIKI-HG):
  - przewodnik Vietnam Coracle (aktualizacja z I 2024) pisze o rosnącej liczbie zmieniających się punktów kontroli na pętli. Policjanci żądają prawa jazdy, a cudzoziemiec na motocyklu „na pewno” zostanie zatrzymany, może kilka razy. Możliwe jest też zatrzymanie motocykla (COR-HG);
  - komentarze z 2025 r. (fora, tylko jako uzupełnienie): w V 2025 dużo punktów kontroli, w tym jeden zatrzymujący wszystkich samodzielnie jadących cudzoziemców na drodze QL4C; w VI 2025 mandat 3 mln VND, przy kolejnych kontrolach już bez płacenia; w XI 2025 trzy kontrole w pierwszych dwóch godzinach od miasta Hà Giang i mandat 3 mln VND załatwiony przez wypożyczalnię; w IV 2025 bez IDP „prawie nie da się” wypożyczyć motocykla (COR-HG);
  - Tigit (wpis aktualizowany do III 2026): policja „bardzo surowa”, mandat ok. 3 mln VND od osoby, od 30.11.2025 część jeźdźców zawrócono za złą wersję IDP, ukryte fotoradary, trzymać się 50 km/h (TIGIT-IDP).
- **Cao Bằng:** kontrole zdarzają się koło miasta Cao Bằng (VT-LOOP). Loop Tours pisze, że w Cao Bằng przepisy egzekwuje się łagodniej niż w Hà Giang, ale nie podaje źródła (LOOP-FAQ). Czytelnik w komentarzu pod przewodnikiem (data nieznana) pisze, że policja była uprzejma wobec osób z właściwym IDP (COR-NE).
- **Inne miejsca:** VT-LEGAL wymienia punkty kontroli w Đà Nẵng, Hội An, Hà Giang, Mũi Né, Sa Pa i Phong Nha i pisze, że policja wypatruje cudzoziemców. Nie podaje źródła ani częstotliwości.
- **Co sprawdzają:** prawo jazdy i IDP, czasem alkomatem (RAB-LEGAL, COR-HG). Policja zatrzymuje zarówno miejscowych, jak i cudzoziemców, zwłaszcza po wykroczeniu (RAB-LEGAL).
- **Jak często:** urzędowych danych nie znalazłem. Relacje z Hà Giang mówią o kilku kontrolach dziennie (COR-HG).
- **Wypożyczalnie często nie sprawdzają uprawnień:** Tigit nie sprawdza prawa jazdy przy motocyklach poniżej 150 cm³ (TIGIT-IDP), a w Cao Bằng „wiele wypożyczalni” nie pyta o IDP (VT-LOOP). Nie zmienia to ani prawa, ani warunków polisy.

## Ubezpieczenie i kask

### Obowiązkowe OC w Wietnamie

- **Polisa obowiązkowego OC posiadacza pojazdu** (bảo hiểm bắt buộc trách nhiệm dân sự) to jeden z dokumentów, które kierujący wozi przy sobie (VN-LUAT art. 56 ust. 1 lit. d). FCDO: jazda bez OC jest nielegalna (FCDO). Mandat za brak: 200 000–300 000 VND (LSVN-BH).
- **Czy wypożyczalnia ją zapewnia:** Rentabike pisze, że zapewnia obowiązkowe OC, ale nie ma ubezpieczenia autocasco. Szkody w motocyklu i kradzież pokrywa najemca, a „damage waiver” to nie ubezpieczenie (RAB-RENT).
- **Ile to OC jest warte dla turysty:** według Rentabike polisa działa tylko wtedy, gdy kierujący ma ważne wietnamskie prawo jazdy, a motocykl jest zarejestrowany na niego; wypłaty są rzadkie (RAB-LEGAL, RAB-RENT). Tigit pisze, że miejscowe „żółte” papiery OC „nic nie dają” cudzoziemcom (TIGIT-IDP). To twierdzenia wypożyczalni. Warunków i wyłączeń z dekretu o OC (67/2023/NĐ-CP) nie sprawdziłem.

### Kask

- Kierujący i pasażer motocykla i motoroweru muszą mieć kask zgodny z krajową normą techniczną, z zapiętym paskiem (VN-LUAT art. 33 ust. 2). FCDO: jazda bez kasku jest nielegalna dla kierującego i pasażera, warto mieć dobry kask (FCDO).
- Mandat: 400 000–600 000 VND od każdej osoby; niezapięty pasek karze się jak brak kasku (MOMO-KASK).
- Za kask bez znaku CR, ale założony i zapięty, nie ma osobnej kary (MOMO-KASK). Słaby kask z wypożyczalni lepiej wymienić na kupiony, za ok. 400 000–800 000 VND (14–28 EUR) (VT-LEGAL).

### Polskie ubezpieczenia podróżne

- **Warta Travel** (OWU C0517, obowiązują od 17.05.2026; dokument jest w sekcji „Przydatne dokumenty” na WARTA-WWW) (OWU-WARTA):
  - § 11 ust. 1 pkt 5: Warta nie odpowiada za zdarzenia i koszty powstałe w wyniku prowadzenia przez ubezpieczonego środka transportu „bez wymaganych prawem danego kraju uprawnień”, chyba że nie miało to wpływu na szkodę. Dotyczy całej polisy, także kosztów leczenia;
  - § 11 ust. 1 pkt 6: to samo przy działaniu wbrew miejscowemu prawu i zakazom władz. Jazda bez kasku łamie prawo wietnamskie, więc może dać podstawę do odmowy. To moja interpretacja, OWU nie wymieniają kasku wprost;
  - § 14 pkt 1: OC w życiu prywatnym nie obejmuje szkód z użytkowania i kierowania pojazdami. Szkody wyrządzone innym na motocyklu są więc poza polisą także przy ważnych uprawnieniach;
  - § 17: zniesienie udziału własnego w wynajętym pojeździe nie obejmuje motocykli, motorowerów i skuterów;
  - zwykła jazda motocyklem nie jest „sportem ekstremalnym” (lista w § 3 pkt 18 wymienia rajdy, motocross i żużel);
  - wyłączenie z pkt 5 dotyczy prowadzenia przez ubezpieczonego, więc nie obejmuje pasażera na tylnym siodełku (easy rider). To moja interpretacja.
- **UNIQA Supertravel:** strona produktu obiecuje zwrot kosztów naprawy wynajętego pojazdu, także motocykla albo skutera, po wypadku drogowym, do 4 000 zł. Szczegóły są w OWU na s. 35 (UNIQA-WWW). OWU (UNIQA-OWU) nie czytałem, więc nie wiem, czy wymagają uprawnień.
- **TU Europa Travel World:** „sporty motorowe” są na liście sportów ekstremalnych, które wariant Standard Plus wyłącza, a VIP i VIP Plus obejmują za dopłatą (TUE-WWW). Czy zwykła jazda motocyklem to „sport motorowy”, wyjaśniają dopiero OWU (TUE-OWU), których nie czytałem.
- **ERGO Hestia (ERGO Podróż), PZU (ubezpieczenie wyjazdu turystycznego, OWU od 1.12.2025), Generali (OWU od 28.11.2024):** strony produktów nie mówią nic o motocyklach ani uprawnieniach. ERGO zwraca udział własny w szkodzie wynajętego pojazdu do 2 000 zł, bez wskazania rodzaju pojazdu (ERGO-WWW, PZU-WWW, GEN-WWW). OWU są w PDF i ich nie czytałem. Linki są w „Źródłach”.
- **Wypożyczalnie i przewodniki** piszą to samo co OWU Warty: ubezpieczenia nie pokrywają jazdy bez uprawnień (RAB-LEGAL, TIGIT-IDP, VT-CB, VT-LEGAL). FCDO radzi sprawdzić, czy polisa obejmuje planowaną aktywność (FCDO).

## Ryzyko

- **Śmiertelność:** WHO szacuje dla Wietnamu 17 229 zgonów na drogach w 2021 r. (przedział 15 364–19 093), czyli 17,7 na 100 000 mieszkańców. Dla Polski to 2 474 zgony i 6,5 na 100 000 (WHO-GHO, dane z 15.04.2024). Ryzyko na mieszkańca jest ok. 2,7 raza wyższe.
- **Sprawdzone 15.10.2026: ryzyko bez porównania z Polską** (ustalenie 15 planu B2):
  - szacunek WHO dla samego Wietnamu jak wyżej: 17 229 zgonów na drogach w 2021 r., 17,7 na 100 000 mieszkańców (WHO-GHO; nowszego szacunku WHO nie szukałem);
  - ponad 90% zabitych na drogach w 2023 r. zginęło w wypadkach z udziałem motocykla, według Instytutu Strategii i Rozwoju Transportu; motocykle biorą udział w ok. 65–70% wypadków, według wiceprzewodniczącego Narodowego Komitetu Bezpieczeństwa Ruchu (oba w Nhân Dân z 12.02.2025; MOTO-2026-10-15j). WHO: motocykle to ponad 90% pojazdów i biorą udział w ponad 60% wypadków (MOTO-2026-10-15k†);
  - udziału samych jadących motocyklem (kierujących i pasażerów) wśród zabitych w Wietnamie w źródle HTML nie znalazłem: profil Wietnamu w raporcie WHO z 2023 r. jest w PDF, a przemówienie WHO z 2026 r. (motocykliści i pasażerowie to prawie połowa zabitych na drogach w Azji) zwraca 403 (MOTO-2026-10-15l†);
  - propozycja zdania do ramki: „Na drogach Wietnamu ginie według WHO ok. 17 000 osób rocznie, a ponad 90% z nich w wypadkach z udziałem motocykla.” (WHO-GHO, MOTO-2026-10-15j)
- **FCDO** (aktualne na 11.10.2026):
  - przepisy drogowe są słabo przestrzegane;
  - podróż motocyklem jest „dużo bardziej ryzykowna” niż w Wielkiej Brytanii, wypadki są częste i zabijały Brytyjczyków;
  - nie należy wypożyczać motocykla bez doświadczenia;
  - uczestnik wypadku może odpowiadać karnie, zapłacić odszkodowanie i dostać zakaz wyjazdu na czas dochodzenia;
  - drogi blokują osuwiska błota i ziemi; na północy pada od czerwca do września (FCDO).
- **Zagrożenia na górskich pętlach:**
  - **jazda po zmroku:** przewodniki odradzają ją na pętli Cao Bằng i na przełęczy Hải Vân (VT-LOOP, LV-HUE);
  - **deszcz i mgła:** nagła mgła ogranicza widoczność do 10 m, a deszcz zamienia pył na nieutwardzonych odcinkach w maź (VT-LOOP). Przełęcz Hải Vân bywa w chmurach i mokra, ma wiele serpentyn (COR-HV), a po ulewie lepiej na nią nie jechać (LV-HUE). Po ulewach zdarzają się osuwiska (COR-NE, FCDO), a przewodnik radzi po ulewie sprawdzić stan drogi (NV-CB);
  - **ciężarówki na zakrętach:** z Chin jeżdżą tędy o każdej porze (VT-LOOP), kontenerowce wspinają się po serpentynach i ledwie mieszczą się w ciasnych zakrętach (COR-NE);
  - **żwir:** luźny żwir na zakrętach, zwłaszcza na drodze TL207 (VT-LOOP); droga wzdłuż granicy miejscami żwirowa i dziurawa (COR-NE);
  - **zmęczenie:** źródła nie piszą o nim wprost. Typowe dzienne odcinki to 80–95 km i 3–4 godziny jazdy (VT-LOOP), a pętla Hà Giang wymaga co najmniej 3 dni (COR-HG).

## Cao Bằng

### Pętla: długość i dni

- **Źródła:** pętla Cao Bằng ma 250–300 km i zajmuje 3–4 dni, dzienne odcinki to 80–95 km (VT-LOOP). Vietnam Coracle opisuje pętlę z Bản Giốc (165–190 km, 1–2 dni) i pętlę przygraniczną przez Pác Bó, Thang Hen i przełęcz Mã Phục (285 km, 2–3 dni) (COR-NE).
- **Odległości z miasta Cao Bằng:** Bản Giốc ok. 80 km (NV-CB), 85 km i 2,5–3 h motocyklem (VT-LOOP); Pác Bó ok. 50 km; jezioro Thang Hen ok. 20 km (NV-CB). Núi Mắt Thần leży 1,5–2 km pieszo od Thang Hen (`research/trudne-dni-2026-10.md`, CAO-wetrek).
- **Trasa z planu** (szacunek, suma odległości ze źródeł powyżej):
  - dzień „Jeziora, przełęcz, wodospad i jaskinia” (`p: 2` w CAO-JS): Cao Bằng – Thang Hen – Mã Phục – Bản Giốc – Ngườm Ngao – Khuổi Ky, ok. 90 km;
  - powrót z Khuổi Ky do Cao Bằng: ok. 85 km, 2,5–3 h (VT-LOOP);
  - dzień „Oko Anioła i Pác Bó” (`p: 3` w CAO-JS, tylko przy 3 nocach): Cao Bằng – Pác Bó – Trà Lĩnh (Mắt Thần) – Cao Bằng, ok. 115–125 km. Odcinek Trà Lĩnh – Pác Bó – Cao Bằng ma 95 km (VT-LOOP), a dojazd z Cao Bằng do Mắt Thần szacuję na 20–30 km (Thang Hen leży ok. 20 km od miasta; NV-CB);
  - razem ok. 175 km przy 2 nocach i ok. 290–300 km przy 3 nocach.

### Wypożyczenie motocykla w mieście Cao Bằng

- **Wypożyczalnie:** The Loop Cao Bang, Mr Linh's Adventure i Bong Backpacker Hostel (tylko dla gości) (VT-LOOP). W 2020 r. swój punkt miała tu QT Motorbikes (COR-NE). Aktualnych stron tych wypożyczalni nie otworzyłem.
- **Typy i ceny za dzień:**
  - półautomat 110 cm³ (Honda Wave, Yamaha Sirius): 150 000–200 000 VND (5–7 EUR);
  - manual 150 cm³ (Honda XR150, Yamaha Exciter): 200 000–300 000 VND (7–10 EUR);
  - automat 110 cm³: przewodnik go odradza i zaleca co najmniej 125 cm³ (VT-LOOP).
  - Inna strona tej samej witryny podaje ogólnie 150 000–250 000 VND za dzień (VT-CB).
  - Dla porównania w Hà Nội: Honda Future 10 USD (9 EUR), Honda XR150 20 USD (18 EUR) za dzień (RAB-RENT).
- **Kaucja:** 5–10 mln VND gotówką (172–344 EUR). Część wypożyczalni bierze paszport, przewodnik radzi go nie zostawiać (VT-LOOP).
- **Paszport w zastaw:** FCDO odradza zostawianie paszportu jako kaucji za pojazd i jako gwarancji zapłaty mandatu (FCDO). Paszport jest potrzebny w drodze (COR-HG). VT-LEGAL pisze, że to „technicznie nielegalne”, ale nie podaje przepisu. Wietnamskiego przepisu o tym nie ustaliłem.

### Paliwo

- **Cena:** od 8.10.2026, 15:00 maksymalna cena detaliczna benzyny E10 RON95-III to 28 254 VND/l (ok. 1 EUR), a E5 RON92 27 703 VND/l (MOIT-0810). Ministerstwo nie podaje już osobnej ceny czystej RON95. Ceny zmieniają się często, ostatnio 1.10 i 8.10.2026 (PLX-0810).
- **Zużycie według Hondy:** Vision 110 cm³ 1,82 l/100 km (bak 4,8 l), Blade 110 cm³ 1,85 l/100 km (bak 3,7 l), Future 125 cm³ 1,47 l/100 km (bak 4,6 l) (HONDA).
- **Szacunek dla gór:** 2–3 l/100 km. Metoda: wartości Hondy z cyklu pomiarowego (1,5–1,9 l/100 km) plus zapas na podjazdy, bagaż i motocykl 150 cm³. Na całą pętlę (ok. 300 km) daje to 6–9 l, czyli 170 000–254 000 VND (6–9 EUR). Przewodnik podaje 150 000–200 000 VND na pętlę (VT-LOOP).
- **Stacje:** Petrolimex na północnym skraju miasta Cao Bằng to ostatnia pewna stacja przed Bản Giốc, mała stacja jest w Trà Lĩnh (VT-LOOP). Pełny bak (3,7–4,8 l) przy 2–3 l/100 km starcza na ok. 120–240 km (szacunek z danych HONDA).

### Dla porównania: samochód z kierowcą i easy rider

- **Samochód z kierowcą:**
  - taksówka na dzień z Cao Bằng do Bản Giốc i z powrotem: 1 000 000–1 500 000 VND (34–52 EUR) (VT-CB);
  - pakiet 3 dni samochodem prywatnym Hà Nội – Cao Bằng: 282 USD za auto 4-miejscowe i 298 USD za 7-miejscowe, z paliwem, opłatami drogowymi i parkingami. Daje to 94–99 USD (84–89 EUR) za dzień, ale z długimi przejazdami z Hà Nội i z powrotem. Strona nie mówi o noclegu kierowcy (HET-CB);
  - przejazd samochodem w jedną stronę Hà Nội – Cao Bằng: 2 500 000–4 000 000 VND (86–138 EUR) (VT-CB), 120–350 USD (107–312 EUR) (NV-HCB), 148–168 USD (132–150 EUR) za auto 4–7-miejscowe (HET-CB);
  - cennika auta z kierowcą na samą pętlę, z noclegiem kierowcy w Khuổi Ky, nie znalazłem.
- **Easy rider** (motocykl z kierowcą-przewodnikiem):
  - 500 000–800 000 VND (17–28 EUR) za dzień (VT-CB); inny tekst tej samej witryny podaje 300 000–500 000 VND (10–17 EUR) (VT-LOOP);
  - pakiet Loop Tours „Cao Bang 3 Days”: easy rider 179 USD, samodzielna jazda z grupą i przewodnikiem 129 USD, dżip 1 178 USD (cena za dżipa), plus 8% VAT. W cenie są motocykl z paliwem, noclegi u gospodarzy (także noc przed startem), posiłki, przewodnik po angielsku i bilety. Trasa różni się od naszej (przez Bảo Lạc i Khau Cốc Chà). Easy rider wychodzi ok. 57 EUR za dzień ze wszystkim, samodzielna jazda ok. 41 EUR. Różnica, czyli sam kierowca, to ok. 15 EUR za dzień (LOOP-CB3);
  - pasażer na tylnym siodełku nie potrzebuje prawa jazdy, tylko zapiętego kasku. Warunki z ustawy dotyczą kierującego (VN-LUAT art. 33 ust. 2, art. 56 ust. 1).

## Przełęcz Hải Vân (Hội An–Huế)

- **Tunel:** motocykle nie mogą jechać tunelem Hải Vân i jadą przez przełęcz (LV-HUE, COR-HV). Good Morning Hội An pisze o przewozie skutera przez tunel za ok. 30 000 VND od skutera i 8 000 VND od osoby (GMHA). Obecny tekst `r.haivan` mówi, że przy chmurach kierowca jedzie tunelem. W wersji motocyklowej takiego objazdu nie ma, chyba że ten przewóz działa (nie sprawdziłem).
- **Odległość i czas:** Hội An – Huế ma 130 km najszybszą drogą i 165 km drogą widokową; Vietnam Coracle liczy na to jeden dzień w jedną stronę (COR-HV). Huế – Đà Nẵng przez przełęcz samodzielnie: 3–4 h albo więcej z postojami (LV-HUE). Easy rider jedzie 3 h 30 min (GMHA), a wycieczka z postojami trwa od 8:30 do 16:30 (HMA). **Szacunek:** Hội An – Huế motocyklem z postojami to 4–6 h (3–4 h na odcinek Đà Nẵng – Huế plus ok. 1 h z Hội An do Đà Nẵng). Samochodem ta trasa zajmuje 3,25 h (POL).
- **Wypożyczenie w jedną stronę z przewozem bagażu:**
  - skuter z automatem, kaskami, uchwytem na telefon i bagażnikiem w jedną stronę z Huế do Đà Nẵng: 600 000–750 000 VND (21–26 EUR), paliwo osobno, ok. 90 000 VND (3 EUR) za bak. Wypożyczalnie często wysyłają główny bagaż drogą, a dokumenty i cenne rzeczy trzeba mieć przy sobie (LV-HUE). Czy przewóz bagażu jest w cenie, strona nie mówi;
  - Hội An – Huế: Motorvina i Style Motorbikes mają biura w Huế, skutery od ok. 150 000 VND, motocykle 300 000–1 000 000 VND (GMHA); jedną stronę oferują też Style Motorbikes, Rent A Bike i Tigit (COR-HV). Tigit przyjmuje zwrot w dowolnym hotelu w Hội An i Huế i odbiera motocykl ciężarówką. Dopłatę pokazuje dopiero przy rezerwacji, a blokuje na karcie 100 USD przy rezerwacji i 50 USD przy odbiorze (TIGIT-WWW). Rentabike wysyła bagaż kurierem do hotelu, a opłata za zwrot w innym mieście to 75–200 USD, ale ta firma nie ma punktu w Hội An ani w Huế (RAB-RENT);
  - ceny wynajmu Hội An – Huế z przewozem bagażu nie ustaliłem. W zestawieniu biorę ceny z LV-HUE dla odcinka Huế – Đà Nẵng.
- **Samochód z kierowcą przez przełęcz:**
  - z Hội An do Huế bezpośrednio przez przełęcz: 1 550 000 VND (53 EUR) za auto 4-miejscowe i 1 650 000 VND (57 EUR) za 7-miejscowe; w tabeli tej samej strony 1 450 000 VND (50 EUR). Z Marmurowymi Górami i posągiem Lady Buddha: 1 750 000–1 850 000 VND (60–64 EUR), ok. 6 h (GMHA);
  - Huế – Đà Nẵng z postojami: 60–110 USD (53–98 EUR) za dzień, zależnie od auta i trasy (LV-HUE). Tunelem bez postojów 1 200 000–1 400 000 VND (41–48 EUR) (LV-HUE).
- **Easy rider:**
  - Hoi An Motorbike Adventures: 48 USD (43 EUR) od osoby z Hội An do Huế, 8:30–16:30, z postojami w Marmurowych Górach, Lăng Cô i na przełęczy. W cenie są kierowca-przewodnik po angielsku, motocykl, paliwo, kask, bilety i przewóz bagażu bez dopłaty; lunch i ubezpieczenie osobno. Samodzielna jazda z przewodnikiem jest możliwa dla doświadczonych, cena na zapytanie (HMA);
  - ok. 1 500 000 VND (52 EUR) od osoby, z małym bagażem (GMHA); 50–90 USD (45–80 EUR) od osoby, zależnie od firmy (LV-HUE).

## Uwagi dla planu 2B

1. **Numery `p` w `caobang.js`:** dzień „Jeziora, przełęcz, wodospad i jaskinia” ma `p: 2` (`o: 3`), a „Oko Anioła i Pác Bó” ma `p: 3` (`o: 2`) (CAO-JS). Przy 2 nocach motocykl obsługuje więc tylko dzień z wodospadem i nocą w Khuổi Ky.
2. **Powrót z Khuổi Ky:** motocykl oddaje się w Cao Bằng, więc w dniu wyjazdu rano trzeba wrócić ok. 85 km (2,5–3 h; VT-LOOP), zanim zacznie się dalszy przejazd. Miasto Cao Bằng jest punktem przejazdów w `travel.js` (POL). W wersji z kierowcą auto może jechać dalej prosto z Khuổi Ky.
3. **Hải Vân bez tunelu:** zdanie o tunelu przy chmurach nie pasuje do wersji „Samodzielnie” (sekcja „Przełęcz Hải Vân”).
4. **Strefa przygraniczna:** w rezerwacji Loop Tours jest „Border Permit Fee” bez kwoty (LOOP-CB3). Nie sprawdziłem, czy cudzoziemiec na własnym motocyklu potrzebuje zezwolenia przy Bản Giốc.
5. **Budżet:** stawki easy ridera w Cao Bằng (VT-CB) nie obejmują noclegu i jedzenia, a pakiety Loop Tours je obejmują. Przy Hải Vân stawki easy ridera zawierają przewóz bagażu (HMA).

## Czego nie ustaliłem

- Treść przepisu okólnika 108/2026/TT-BCA o używaniu zagranicznego IDP (znam tylko daty i zakres okólnika). Sprawdzone 15.10.2026: przepisu dalej nie odczytałem (pełny tekst tylko na stronach z 403, a omówienia z VII 2026 opisują wydawanie IDP i wymianę praw jazdy); wymóg IDP z 1968 r. razem z krajowym prawem jazdy stoi w ustawie, a potwierdza go urzędowy tekst dekretu 168/2024, art. 18 ust. 5 lit. b (VN-LUAT, MOTO-2026-10-15h, MOTO-2026-10-15i).
- Urzędowy tekst dekretu 168/2024/NĐ-CP (kwoty kar mam z omówień, a hoatieu.vn podaje inne) i dokładny czas zatrzymania motocykla. Sprawdzone 15.10.2026: urzędowy tekst na portalu rządu potwierdza 2–4 mln VND do 125 cm³ (art. 18 ust. 5: brak prawa jazdy, prawo jazdy niewłaściwe dla pojazdu, IDP z 1968 r. bez krajowego prawa jazdy) i 6–8 mln VND powyżej 125 cm³ (ust. 7), a 200 000–300 000 VND za prawo jazdy zostawione w hotelu dotyczy tylko przewozu zarobkowego (ust. 2 lit. d); hoatieu.vn ma starszą wersję. Czasu zatrzymania motocykla nie odczytałem, a strona go nie podaje (MOTO-2026-10-15i).
- Warunki i wyłączenia obowiązkowego OC z dekretu 67/2023/NĐ-CP, w tym to, czy płaci, gdy kierujący nie ma uprawnień. Poza stroną (decyzja z 15.10.2026): ramka mówi tylko, że bez uprawnień polisa może nie zapłacić, a warunki wietnamskiego OC tego zdania nie zmieniają.
- Czy prawo wietnamskie zabrania brania paszportu w zastaw. Poza stroną (decyzja z 15.10.2026): rada „paszportu nie zostawiaj w zastaw” zostaje bez względu na przepis, a strona nie mówi, że to nielegalne.
- Jak starostwo wpisuje polskie A2 do IDP. Poza stroną (decyzja z 15.10.2026): porada zależna od obywatelstwa (polskie kategorie i starostwo wypadają ze strony, ustalenie 14).
- Daty wejścia konwencji wiedeńskiej w życie dla Polski i Wietnamu (znam daty złożenia dokumentów). Poza stroną (decyzja z 15.10.2026): strona tych dat nie podaje, a oba państwa są stronami konwencji (MOTO-2026-10-15b).
- Informacje MSZ dla podróżujących do Wietnamu. Od 30.06.2026 MSZ publikuje je w portalu Odyseusz (MSZ-NEWS), a strona odyseusz.gov.pl/VN to aplikacja, której treści narzędzie nie odczytało (MSZ-ODY). Poza stroną (decyzja z 15.10.2026): porada zależna od obywatelstwa (MSZ RP); profil Wietnamu w Odyseuszu odczytano ręcznie 14.10.2026 (WJ-2026-10-14p w `research/wjazd-2026-10.md`).
- Doniesienia prasy wietnamskiej z lat 2024–2026 o kontrolach cudzoziemców w Hà Giang (Tuyên Quang) i Cao Bằng. Po wyczerpaniu limitu wyszukiwań zostały mi przewodniki, wypożyczalnie i komentarze. Sprawdzone 15.10.2026: Hà Giang: prasa z IV–VI 2026 o kontrolach od 12.04.2026 jest w `research/hagiang-2026-10.md` (HG-ND-0415, HG-2026-10-14h); Khánh Hòa: policja drogowa kontrolowała turystów na motocyklach (MOTO-2026-10-15c, V 2026); Cao Bằng: doniesień o drogowych kontrolach cudzoziemców z 2025–2026 w jednym zapytaniu po wietnamsku nie znalazłem, jest tylko sprawa Amerykanina w strefie przygranicznej z 22.09.2026 (SP-VNS). Zdanie ramki o kontrolach cudzoziemców ma więc pokrycie.
- OWU PZU, ERGO Hestia, UNIQA, Generali i TU Europa (PDF, nie czytałem). Do strony wystarczy przykład Warty i zdanie „sprawdź OWU”, ale przed publikacją warto przeczytać 2–3 z nich. Poza stroną (decyzja z 15.10.2026): porada zależna od obywatelstwa (polskie polisy); ramka mówi tylko, że polisa może nie zapłacić.
- Cena wynajmu w jedną stronę Hội An – Huế z przewozem bagażu i cena auta z kierowcą na samą pętlę Cao Bằng (z noclegiem kierowcy). Poza stroną (decyzja z 15.10.2026): obie ceny ustalono 12.10.2026 („Uzupełnienie 12.10.2026: ceny”), a otwarty zostaje tylko nocleg kierowcy, pozycja poniżej ok. 20 EUR na osobę.
- Aktualne strony wypożyczalni w Cao Bằng (znam je tylko z przewodnika). Poza stroną (decyzja z 15.10.2026): strona linkuje tylko dwie wypożyczalnie z `research/rezerwacje-2026-10.md` (`caobang.moto`), a ich adresy sprawdza `tools/links.sh`.

## Co powiedzieć na stronie

**Od planu B2 (decyzja z 15.10.2026):** strona jest dla podróżnych z całego świata, więc zdanie pod przełącznikiem i ramka „Samodzielnie” podają ogólne wymagania, bez polskich procedur. Na stronie:
- pod przełącznikiem: „Samodzielnie tylko z prawem jazdy na motocykl i międzynarodowym prawem jazdy według konwencji z 1968 r., oba przy sobie. Samo prawo jazdy na samochód nie wystarcza nawet na skuter 110–125 cm³. Sprawdź, według której konwencji wydaje je twój kraj, bo międzynarodowe prawo jazdy według konwencji z 1949 r. w Wietnamie nie działa.” (VN-LUAT art. 57 ust. 1, 6 i 8; MOTO-2026-10-15i; MOTO-2026-10-15a, MOTO-2026-10-15b, MOTO-2026-10-15e; sekcja „Międzynarodowe prawo jazdy w innych krajach (15.10.2026)”);
- wymagania: „W motocyklu muszą być dowód rejestracyjny i polisa obowiązkowego OC, a kask zgodny z normą trzeba zapiąć, także pasażerowi. Sprawdź w warunkach swojej polisy, czy obejmuje jazdę motocyklem.” (VN-LUAT art. 33 ust. 2, art. 56 ust. 1; FCDO);
- ryzyko: „Na drogach Wietnamu ginie ok. 17 000 osób rocznie (szacunek WHO), a ponad 90% z nich w wypadkach z udziałem motocykla. Po wypadku grozi odpowiedzialność karna, odszkodowanie i zakaz wyjazdu do końca dochodzenia. Bez uprawnień grozi mandat 2–4 mln VND i zatrzymanie motocykla, a polisa może nie zapłacić. Policja kontroluje cudzoziemców.” (WHO-GHO, MOTO-2026-10-15j, FCDO, RAB-LEGAL, MOMO-GPLX, NNMT, COR-HG, TIGIT-IDP, VT-LOOP);
- rady: „Paszportu nie zostawiaj w zastaw, zapytaj o kaucję gotówką. Nie jedź po zmroku, w deszczu i mgle zwolnij, a na serpentynach uważaj na żwir i ciężarówki.” (FCDO, VT-LOOP, LV-HUE, COR-NE);
- w Hà Giang pozwolenie „za ok. 230 000–300 000 VND” zamiast „za 10 USD” (ustalenie 9; obie kwoty są w research/hagiang-2026-10.md).

Poza stroną zostają tu: polskie kategorie A1, A2 i A i uprawnienie z B tylko w Polsce, międzynarodowe prawo jazdy ze starostwa (35 zł, do 3 lat), porównanie śmiertelności z Polską, warunki polisy Warty, oględziny i zdjęcia rys przy odbiorze. Zdanie o polisie stoi tylko w ramce, bez powtórki w „Warto wiedzieć”. Propozycje niżej są z 11.10.2026.

**Zdanie pod przełącznikiem** (warunek prawny):
- „Samodzielnie tylko z polskim prawem jazdy kategorii A1, A2 albo A i międzynarodowym prawem jazdy według konwencji wiedeńskiej, oba przy sobie. Samo B nie wystarcza nawet na skuter 110–125 cm³.” (VN-LUAT art. 57 ust. 1, 6 i 8; PL-UKP art. 6; PL-2014; GOV-MPJ)

**Ramka „Samodzielnie”: wymagania**
- Polskie prawo jazdy z kategorią A1 (skutery i półautomaty do 125 cm³) albo A2 lub A (także manualne 150 cm³) (VN-LUAT art. 57 ust. 1; VT-LOOP; LOOP-FAQ).
- Uprawnienie z B na motocykl 125 cm³ (po 3 latach) działa tylko w Polsce (PL-UKP art. 6 ust. 3; PL-2014).
- Międzynarodowe prawo jazdy według konwencji wiedeńskiej, załatwione w Polsce przed wyjazdem: w starostwie, 35 zł, zwykle od ręki, najpóźniej w 3 dni robocze, ważne do 3 lat (GOV-MPJ; VN-LUAT art. 57 ust. 8 lit. d).
- Przy sobie prawo jazdy i IDP, a w motocyklu dowód rejestracyjny i polisa obowiązkowego OC (VN-LUAT art. 56 ust. 1, art. 57 ust. 8 lit. b).
- Kask zgodny z normą, zapięty, także dla pasażera (VN-LUAT art. 33 ust. 2; FCDO).
- Sprawdź OWU swojej polisy. Na przykład Warta Travel nie odpowiada za zdarzenia przy prowadzeniu bez uprawnień wymaganych w danym kraju, a jej OC nie obejmuje szkód z jazdy pojazdem (OWU-WARTA § 11 ust. 1 pkt 5, § 14 pkt 1).

**Ramka „Samodzielnie”: ryzyko**
- W Wietnamie na drogach ginie na mieszkańca ok. 2,7 raza więcej osób niż w Polsce (WHO-GHO).
- Brytyjski MSZ: motocykl jest tu dużo bardziej ryzykowny niż w Wielkiej Brytanii, wypadki są częste, a bez doświadczenia lepiej go nie wypożyczać (FCDO).
- Po wypadku grozi odpowiedzialność karna, odszkodowanie i zakaz wyjazdu do końca dochodzenia (FCDO).
- Bez uprawnień grozi mandat 2–4 mln VND (do 125 cm³) albo 6–8 mln VND (powyżej) i zatrzymanie motocykla, a polisa może nie zapłacić (RAB-LEGAL, MOMO-GPLX, NNMT, OWU-WARTA).
- Policja kontroluje cudzoziemców, zwłaszcza na pętli Hà Giang (relacje z 2025 r.: kilka kontroli dziennie, mandaty ok. 3 mln VND). Koło Cao Bằng kontrole też się zdarzają (COR-HG, TIGIT-IDP, VT-LOOP).
- Na pętli: ciężarówki na serpentynach, żwir na zakrętach, nagła mgła, śliska nawierzchnia po deszczu, osuwiska po ulewach (VT-LOOP, COR-NE, FCDO).

**Ramka „Samodzielnie”: rady**
- Przy odbiorze obejrzyj motocykl i zrób zdjęcia i film wszystkich rys. Szkody i kradzież pokrywa najemca, a kaucja wraca tylko za motocykl w tym samym stanie (RAB-RENT; rada wynika z tych warunków).
- Nie zostawiaj paszportu w zastaw, zapytaj o kaucję gotówką (FCDO; VT-LOOP).
- Nie jedź po zmroku (VT-LOOP, LV-HUE).
- W deszczu i mgle zwolnij, a po ulewie zapytaj o stan drogi i osuwiska (VT-LOOP, NV-CB, COR-NE).
- Na pętli Cao Bằng rozsądnie jest 80–100 km dziennie, czyli 3–4 godziny jazdy (VT-LOOP).
- Tankuj przy każdej okazji: za Cao Bằng stacji jest mało, a bak skutera starcza na ok. 120–240 km (VT-LOOP; szacunek z HONDA).
- Przez Hải Vân tylko górą, bo motocykle nie wjeżdżają do tunelu. Wyjedź rano, przed ruchem i mgłą (LV-HUE, COR-HV).
- Jeśli kask z wypożyczalni jest słaby, kup własny za ok. 400 000–800 000 VND (VT-LEGAL; FCDO).
- Na tylnym siodełku (easy rider) prawo jazdy nie jest potrzebne, tylko kask (VN-LUAT art. 33 ust. 2, art. 56 ust. 1).

## Uzupełnienie 12.10.2026: ceny

Uzupełnia dwie pozycje z sekcji „Czego nie ustaliłem”: wynajem motocykla w jedną stronę Hội An → Huế z przewozem bagażu oraz ceny auta z kierowcą i easy ridera u lokalnego operatora w Cao Bằng. Adresy otwarto 12.10.2026. Kurs i zaokrąglenia jak w „Jak czytać”. Wyszukiwanie: WebSearch w trybie standardowym, po wietnamsku i angielsku. Przy wynajmie Hội An → Huế jedno zapytanie było w trybie extended, bo wyniki standardowe były cienkie. Potem WebFetch.

- **Wynik:**
  - `haivan.moto`: 22–29 EUR zamiast 24–29 EUR, teraz z cen Hội An → Huế, z przewozem bagażu i paliwem;
  - `caobang.car`: 34–55 EUR zamiast 34–89 EUR;
  - `caobang.easyrider`: bez zmian, 17–28 EUR. Drugi wydawca nie podaje samej stawki za easy ridera, ale szacunek z jego cennika (22–25 EUR) mieści się w przedziale.

### Hội An → Huế: motocykl w jedną stronę z przewozem bagażu

| firma | oferta | cena | EUR | źródło |
|---|---|---|---|---|
| Anh Khoa (hoianit.com), biuro w Hội An przy 84 Phan Châu Trinh | skuter z automatem 50–125 cm³ (Honda Vision 110, Air Blade 125, Yamaha Grande 125); zwrot w Huế w hotelu albo w biurze partnera przy 201 Trần Phú; w cenie przewóz 2 sztuk bagażu do hotelu w Huế | 750 000 VND | 26 | HV-AK1, HV-AK2 |
| Anh Khoa | Honda Winner 150; motorower 50 cm³ bez prawa jazdy | 850 000; 900 000 VND | 29; 31 | HV-AK2; HV-AK1 |
| Anh Khoa | trzecia i każda następna sztuka bagażu, do 20 kg na osobę | 50 000 VND za sztukę | 2 | HV-AK2 |
| Trace Travel Vietnam, Hội An | Honda Wave 110 albo Air Blade 125 na 1 dzień; dowóz do hotelu w Hội An, zwrot w Huế w biurze Hidden Land (24A/11 Lý Thường Kiệt) | 19 USD | 17 | HV-TT1 |
| Trace Travel Vietnam | bagaż, płatny osobno | 50 000 VND za sztukę | 2 | HV-TT1 |
| Hidden Land Travel, biura w Huế i Đà Nẵng | dowóz motocykla do hotelu w Hội An, zwrot w biurze w Huế; cennik tylko na obrazkach, których narzędzie nie odczytało; „from 22 USD” tylko w wynikach wyszukiwania | 22 USD † | 20 | HV-HL |
| Hidden Land Travel | bagaż, płatny osobno | 50 000 VND za sztukę | 2 | HV-HL |
| Tigit Motorbikes, Đà Nẵng | cennik 2026 bez nazw modeli; trzecia tabela (według kolejności modeli na stronie zapewne Honda Blade 110): 1 dzień 13 USD przy zwrocie w tym samym biurze, 63 USD w innym biurze; za zwrot w Huế i Hội An dopłata widoczna dopiero przy rezerwacji; o bagażu nic | 13; 63 USD | 12; 56 | TIGIT-WWW |

- **Paliwo:** Anh Khoa liczy na całą trasę skuterem ok. 100 000 VND (3 EUR), płatne osobno. Pełny bak jako dodatek kosztuje 200 000 VND (HV-AK1, HV-AK2). LV-HUE podaje ok. 90 000 VND za bak. Trace Travel radzi potwierdzić zasady paliwa przed rezerwacją (HV-TT1).
- **Inne koszty:** bilet do Hải Vân Quan na szczycie przełęczy, 70 000 VND (2 EUR) od osoby, nie jest w cenie u Anh Khoa (HV-AK1). To drobny wstęp.
- **Kaucja:** Anh Khoa 2 000 000 VND (69 EUR) albo kopia paszportu (HV-AK2). Trace Travel zwykle bez kaucji (HV-TT1). Hidden Land 300 USD za motocykl albo paszport lub bagaż (HV-HL).
- **Prawo jazdy:** Anh Khoa wymaga prawa jazdy na motocykl i międzynarodowego prawa jazdy według konwencji z 1968 r., a przy 50 cm³ nie wymaga żadnego (HV-AK1). To zgadza się z sekcją „Prawo”.
- **W drugą stronę:** Trace Travel bierze za Huế → Hội An 20 USD (18 EUR) i 50 000 VND za sztukę bagażu (HV-TT2).

**Wynik dla `haivan.moto`** (jedna osoba na motocyklu, z paliwem i bagażem): **22–29 EUR.**

- **od:** Trace Travel: 19 USD + 1 sztuka bagażu 50 000 VND + paliwo ok. 100 000 VND = 642 119 VND = 22,10 EUR, czyli 22 EUR (HV-TT1, HV-AK1);
- **do:** Anh Khoa: 750 000 VND z 2 sztukami bagażu + paliwo ok. 100 000 VND = 850 000 VND = 29,25 EUR, czyli 29 EUR (HV-AK1, HV-AK2);
- Hidden Land z ceną „from 22 USD” (†), jedną sztuką bagażu i paliwem daje ok. 25 EUR, w środku przedziału. Tigit nie wchodzi do przedziału, bo startuje w Đà Nẵng, a dopłata za Huế jest nieznana.
- Dawny przedział 24–29 EUR był z cen odcinka Huế – Đà Nẵng bez bagażu (LV-HUE).

### Cao Bằng: auto z kierowcą i easy rider u lokalnego operatora

Ceny publikuje Cao Bang Eco Travel, biuro w mieście Cao Bằng z licencją na turystykę międzynarodową. Cao Bang Green Riders cen na stronie nie podaje (oba biura opisuje `research/rezerwacje-2026-10.md`).

| oferta | cena | EUR | źródło |
|---|---|---|---|
| wycieczka 1 dzień (7:15–18:00: Mã Phục, Bản Giốc, Ngườm Ngao, Mắt Thần), za osobę: easy rider; samodzielnie. W cenie obiad, bilety do Ngườm Ngao, Bản Giốc i Mắt Thần, woda, lokalny przewodnik, motocykl z paliwem | 1 490 000; 1 090 000 VND | 51; 38 | ECO-1D |
| ta sama wycieczka autem, za osobę przy 1; 2; 3; 4 osobach („z wynajmem auta, dzielone na osoby”) | 2 399 000; 1 599 000; 1 333 000; 1 199 000 VND | 83; 55; 46; 41 | ECO-1D |
| pętla 3 dni/2 noce, za osobę: easy rider; samodzielnie. W cenie noclegi w sali wieloosobowej, posiłki, bilety, przewodnik, motocykl z paliwem | 4 810 000; 3 410 000 VND | 166; 117 | ECO-3D |
| pętla 3 dni/2 noce autem, za osobę przy 1; 2; 3; 4 osobach | 7 210 000; 4 960 000; 4 210 000; 3 835 000 VND | 248; 171; 145; 132 | ECO-3D |
| na liście rzeczy „nie wliczonych” obu wycieczek: auto; przewodnik mówiący po angielsku | 60 USD; 15 USD za dzień | 53; 13 | ECO-1D, ECO-3D |
| wynajem motocykla w Eco Travel, za dzień | 180 000–550 000 VND | 6–19 | ECO-WWW |
| dla porównania: 1 dzień z easy riderem do Bản Giốc i Mắt Thần ze zbiórką w Green Riders House, za osobę, z obiadem, biletami, kaskiem i ubezpieczeniem | od 76 USD | 68 | CAO-PT |

**Auto z kierowcą (`caobang.car`): 34–55 EUR za auto i dzień.**

- **Szacunek z cennika Eco Travel.** W wariancie autem każda kolejna osoba dokłada ok. 800 000 VND przy wycieczce 1-dniowej (799 000–801 000) i 2 710 000 VND przy 3-dniowej. Po odjęciu tej kwoty od ceny dla jednej osoby zostaje część stała, czyli auto z kierowcą: 1 600 000 VND za 1 dzień oraz 4 500 000 VND za 3 dni, czyli 1 500 000 VND dziennie. To 52–55 EUR za dzień, tyle co „Car: 60$/day” z listy rzeczy nie wliczonych (53 EUR).
- Strona nie mówi, co obejmuje wynajem auta (paliwo, opłaty, nocleg kierowcy).
- **od** bez zmian: taksówka na dzień Cao Bằng – Bản Giốc – Cao Bằng za 1 000 000–1 500 000 VND (VT-CB).
- **do:** 55 EUR (ECO-1D). Dawna górna granica, 89 EUR, była średnią dzienną 3-dniowego pakietu z Hà Nội z dwoma długimi przejazdami (HET-CB). Przejazd z Hà Nội budżet liczy osobno (`road.private`), więc ta średnia nie pasuje do dnia na pętli.

**Easy rider (`caobang.easyrider`): bez zmian, 17–28 EUR za osobę i dzień.**

- **Dopłata za kierowcę** w Eco Travel to różnica między easy riderem a samodzielną jazdą: 400 000 VND przy wycieczce 1-dniowej i 1 400 000 VND przy 3-dniowej, czyli 400 000–466 667 VND, 14–16 EUR dziennie (ECO-1D, ECO-3D). W Loop Tours to ok. 15 EUR dziennie (LOOP-CB3).
- **Szacunek dla kierowcy z motocyklem, bez jedzenia i biletów:** 637 000–731 667 VND, czyli 22–25 EUR. Metoda: dopłata za kierowcę plus najtańszy motocykl w Eco Travel, 180 000 VND (ECO-WWW), plus paliwo 57 000–85 000 VND jak w `caobang.moto`. Wynik mieści się w przedziale z VT-CB, więc przedział zostaje.
- **Dzień z biurem kosztuje więcej**, bo zawiera obiad, bilety i przewodnika: 1 490 000 VND, czyli 51 EUR (ECO-1D), a ze zbiórką w Green Riders House od 76 USD, czyli 68 EUR (CAO-PT). Obiad i drobne bilety budżet liczy w `day` (`research/ceny-2026-10.md`).

### Co zostaje szacunkiem albo nieustalone

- paliwo na trasie Hội An → Huế: ok. 100 000 VND to ocena wypożyczalni;
- cena Hidden Land (tylko w wynikach wyszukiwania) i dopłata Tigit za zwrot w Huế;
- auto z kierowcą: część stała wyliczona z cennika Eco Travel; dolna granica nadal z jednego portalu (VT-CB); nocleg kierowcy niepotwierdzony;
- easy rider: sama stawka za kierowcę z motocyklem jest tylko na vietnamtourism.com; drugi wydawca podaje tylko ceny wycieczek.

## Zestawienie

| klucz | jednostka | od | do | uwagi |
|---|---|---|---|---|
| caobang.car | auto z kierowcą/dzień | 34 | 55 | Dolna granica: taksówka na dzień Cao Bằng – Bản Giốc – Cao Bằng, 1 000 000–1 500 000 VND (VT-CB). Górna: lokalny operator Cao Bang Eco Travel, auto z kierowcą ok. 1 600 000 VND za dzień, szacunek z cen wycieczki autem; na liście rzeczy nie wliczonych „Car: 60$/day”, czyli 53 EUR (ECO-1D, ECO-3D). Zmiana 12.10.2026: było 34–89; 89 to średnia pakietu z Hà Nội z długimi przejazdami (HET-CB). Nocleg kierowcy niepotwierdzony. |
| caobang.easyrider | osoba/dzień | 17 | 28 | 500 000–800 000 VND: kierowca-przewodnik z motocyklem, bez noclegu i jedzenia (VT-CB). Ta sama witryna w innym tekście: 300 000–500 000 VND, czyli 10–17 EUR (VT-LOOP). Pakiet z noclegami, posiłkami i paliwem: ok. 57 EUR/dzień (LOOP-CB3). |
| caobang.moto | motocykl/dzień, z paliwem | 7 | 13 | Wynajem 150 000–300 000 VND (półautomat 110 cm³ albo manual 150 cm³; VT-LOOP) plus paliwo ok. 57 000–85 000 VND przy 100 km dziennie (szacunek: 2–3 l/100 km, 28 254 VND/l; HONDA, MOIT-0810). Kaucja 5–10 mln VND zwrotna. |
| haivan.car | auto z kierowcą/przejazd | 50 | 98 | 1 450 000–1 850 000 VND za auto 4–7-miejscowe Hội An – Huế przez przełęcz, z postojami albo bez (GMHA); 60–110 USD za dzień z postojami na odcinku Huế – Đà Nẵng (LV-HUE). |
| haivan.easyrider | osoba/przejazd | 43 | 80 | 48 USD z przewozem bagażu, paliwem i biletami (HMA); ok. 1 500 000 VND (GMHA); 50–90 USD (LV-HUE). |
| haivan.moto | osoba/przejazd | 22 | 29 | Hội An → Huế, jedna osoba na motocyklu, z bagażem i paliwem ok. 100 000 VND (HV-AK1). Od: Trace Travel, skuter 19 USD plus 50 000 VND za 1 sztukę bagażu (HV-TT1). Do: Anh Khoa, skuter 750 000 VND z przewozem 2 sztuk bagażu (HV-AK2). Zmiana 12.10.2026: było 24–29 z cen odcinka Huế – Đà Nẵng bez bagażu (LV-HUE). |

## Strefa przygraniczna w Cao Bằng (uzupełnienie 12.10.2026)

Uzupełnia punkt 4 w „Uwagi dla planu 2B”. Pytania: czy cudzoziemiec potrzebuje zezwolenia albo zgłoszenia na policji, żeby wjechać do strefy przygranicznej, zwiedzić Bản Giốc i Ngườm Ngao i przenocować u gospodarzy w Khuổi Ky; to samo krótko dla Ba Bể. Adresy otwarto 12.10.2026 (poza oznaczonymi †). Wyszukiwanie 12.10.2026: WebSearch w trybie standardowym, po wietnamsku i angielsku, 19 zapytań. Źródła z przedrostkiem SP- są w „Źródłach”, w podsekcji „Strefa przygraniczna (uzupełnienie 12.10.2026)”.

- **Wynik w skrócie:**
  - **Bản Giốc, Ngườm Ngao i Khuổi Ky: zezwolenie nie jest potrzebne.** Wszystkie trzy leżą w obszarze turystycznym wodospadu Bản Giốc (SP-QD248). Od 17.11.2025 cudzoziemiec nie potrzebuje zezwolenia na wjazd do strefy przygranicznej w obszarach turystycznych, usługowych i ekonomicznych (dekret 299/2025/NĐ-CP; SP-LSVN, SP-VBHN†). Zastrzeżenie: decyzji o formalnym uznaniu Bản Giốc za obszar turystyczny nie znalazłem (sekcja „Przepisy”).
  - **Paszport trzeba mieć przy sobie.** Straż graniczna przy wodospadzie może o niego poprosić (SP-VT), a gospodarz potrzebuje go do meldunku (VN-L23).
  - **Nocleg melduje gospodarz** na policji gminnej, tak jak w całym kraju (VN-L23). Przy noclegu w pasie przygranicznym, czyli 100–1000 m od linii granicy, trzeba też pisemnie zawiadomić placówkę straży granicznej (SP-ND34). Czy domy w Khuổi Ky leżą w tym pasie, nie ustaliłem.
  - **Poza obszarem turystycznym zezwolenie jest potrzebne.** Wydaje je policja prowincji. 22.09.2026 policja w gminie Lũng Nặm spisała wykroczenie Amerykaninowi, który był w strefie przygranicznej bez zezwolenia (SP-VNS).
  - **Ba Bể nie leży w strefie przygranicznej** (SP-VNN). Wystarczy zwykły meldunek przez gospodarza.

### Przepisy

- **Dekret 34/2014/NĐ-CP** o strefie przygranicznej na lądzie, z 29.04.2014, w mocy od 15.06.2014 (SP-ND34):
  - strefa przygraniczna to gminy, których granica administracyjna częściowo pokrywa się z granicą państwa. Ich listę zawiera załącznik (art. 3 ust. 1);
  - pas przygraniczny (vành đai biên giới) biegnie od linii granicy w głąb kraju i ma od 100 m do najwyżej 1000 m szerokości (art. 3 ust. 2);
  - w brzmieniu z 2014 r. cudzoziemiec, który mieszka albo przebywa czasowo w Wietnamie („thường trú, tạm trú”), potrzebuje na wjazd do strefy zezwolenia policji prowincji (art. 6 ust. 2 lit. a);
  - kto nocuje w strefie, rejestruje pobyt na policji gminnej. Przy noclegu w pasie przygranicznym trzeba też pisemnie zawiadomić placówkę straży granicznej (Đồn Biên phòng) (art. 7 ust. 1);
  - działalność w obszarach turystycznych, usługowych, handlowych i ekonomicznych w strefie podlega przepisom dla tych obszarów (art. 7 ust. 3).
- **Dekret 299/2025/NĐ-CP** z 17.11.2025, w mocy od tego dnia, zmienia kilka dekretów o ochronie granicy (SP-ND299). Według omówienia w Báo Luật sư (SP-LSVN):
  - zmienia art. 6 ust. 1 i 2 dekretu 34/2014. Nowe brzmienie dla cudzoziemców: „Người nước ngoài thường trú, tạm trú ở Việt Nam vào khu vực biên giới đất liền (trừ khu du lịch, dịch vụ, khu kinh tế) phải có giấy phép…”. Zezwolenie wydaje policja prowincji, w której cudzoziemiec mieszka albo przebywa, albo policja prowincji przygranicznej, do której jedzie. Paszport trzeba mieć przy sobie i pokazać na żądanie. To samo brzmienie ma tekst ujednolicony ministerstwa obrony 12/VBHN-BQP (SP-VBHN†). Brzmienie z 2014 r. tego wyjątku nie ma (SP-ND34);
  - wprowadza nową listę gmin strefy przygranicznej, dostosowaną do likwidacji powiatów (załącznik I). Listy nie odczytałem: podpisany PDF na portalu Nghệ An to skan bez warstwy tekstowej (SP-ND299), a omówienie z listą w Thư viện Pháp luật zwraca 403;
  - omówienie nie wspomina o zmianie art. 7, czyli zasad noclegu.
- **Przepis dotyczy też turystów.** 22.09.2026 ok. 15:30 patrol w osadzie Nặm Sấn w gminie Lũng Nặm zatrzymał obywatela USA (rocznik 1997), który nie miał zezwolenia na wjazd do strefy przygranicznej. Policja gminna spisała wykroczenie administracyjne i przekazała sprawę wydziałowi imigracyjnemu policji prowincji Cao Bằng. Artykuł nie podaje kary (SP-VNS).
- **Obszar turystyczny wodospadu Bản Giốc.** Regulamin zarządzania obszarem wydał komitet ludowy prowincji Cao Bằng decyzją 248/QĐ-UBND z 26.02.2025, w mocy od podpisania (SP-QD248):
  - obszar ma ok. 1000 ha w gminie Đàm Thủy (adres w decyzji: xã Đàm Thủy, huyện Trùng Khánh) i od północnego wschodu graniczy z Chinami;
  - strefa 1, ścisłej ochrony (658 ha), obejmuje koryto rzeki Quây Sơn, wodospad Bản Giốc, jaskinię Ngườm Ngao i „khu vực nhà sàn đá Khuổi Ky”, czyli kamienne domy na palach w Khuổi Ky;
  - biura z gośćmi z zagranicy muszą przestrzegać przepisów o wjeździe, pobycie i poruszaniu się (art. 11). Osobnego zezwolenia na wjazd regulamin nie wymienia;
  - wycieczki na chińską stronę prowadzą tylko licencjonowane biura z partnerem po stronie chińskiej (art. 12).
- **Status „obszaru turystycznego”:** prowincja nazywa to miejsce „Khu du lịch thác Bản Giốc” i ma dla niego zarząd i regulamin (SP-QD248). Decyzji o uznaniu go za obszar turystyczny prowincji albo kraju według ustawy o turystyce nie znalazłem. Czy wyjątek z dekretu 299/2025 obejmuje tylko obszary uznane formalnie, nie wiem.
- **Gmina Đàm Thủy** graniczy z Chinami (SP-QD248), więc według definicji z art. 3 ust. 1 należy do strefy przygranicznej. To wniosek z definicji, bo listy gmin nie odczytałem.

### Meldunek

- Cudzoziemca melduje osoba prowadząca obiekt noclegowy, także dom gospodarzy. Obiekt sprawdza paszport przed przyjęciem gościa i zgłasza go policji gminnej w 12 godzin, a w odległych rejonach w 24 godziny (VN-L23, art. 33 w brzmieniu ustawy 23/2023/QH15). W strefie przygranicznej to ten sam meldunek: dekret każe zarejestrować nocleg na policji gminnej (SP-ND34, art. 7 ust. 1).
- W pasie przygranicznym dochodzi pisemne zawiadomienie placówki straży granicznej (SP-ND34, art. 7 ust. 1). Kto ma je wysłać, gospodarz czy gość, przepis nie mówi.
- Khuổi Ky leży „kilka kilometrów” od Bản Giốc (SP-COR). Odległości wsi od samej linii granicy nie znam.

### Praktyka 2024–2026

- **Przewodniki:**
  - Vietnam Coracle (aktualizacja II 2025): dawniej cudzoziemcy potrzebowali specjalnego zezwolenia na okolice wodospadu. Dziś kupuje się bilet za 45 000 VND w kasie, „without any documents at all”. Wstęp do Ngườm Ngao też kosztuje 45 000 VND (SP-COR).
  - Vietnamtourism.com (aktualizacja 14.09.2026, wydawca nieustalony): większość prowincji, w tym Bản Giốc, Pác Bó i miasto Cao Bằng, jest dostępna bez specjalnego zezwolenia. Niektóre odległe gminy przygraniczne i punkty widokowe wymagają zgody miejscowych władz. Straż graniczna może poprosić o paszport, więc trzeba mieć oryginał, nie kopię. Na drogach koło Tà Lùng i Trà Lĩnh zdarzają się wyrywkowe kontrole paszportów i dokumentów pojazdu. Drony przy granicy wymagają wcześniejszej zgody (SP-VT).
  - Lonely Planet (opis bez daty): posterunek policji przy wodospadzie czasem żąda od cudzoziemców zezwolenia za 200 000 VND dla grupy do 10 osób. Autora o nie nie poproszono (SP-LP†).
  - Wpis biura podróży na forum Fodor's (bez daty): przy Bản Giốc i w strefach przygranicznych są kontrole policji i potrzebne jest zezwolenie. W wycieczce biura załatwia je przewodnik, a podróżujący samodzielnie muszą je dostać w urzędzie imigracyjnym w mieście Cao Bằng (SP-FOD†). Autor ma interes handlowy.
- **Biura:**
  - Loop Tours ma w formularzu rezerwacji pozycję „Border Permit Fee” z kwotą 0. Nie ma jej ani na liście tego, co jest w cenie, ani na liście tego, czego w cenie nie ma (LOOP-CB3, odczyt 12.10.2026).
  - Cao Bang Eco Travel (pętla 3 dni) i Cao Bang Green Riders (FAQ) nie piszą o zezwoleniu ani o opłacie za nie (SP-ECO, SP-GR).
- **Wniosek:** relacje o zezwoleniu przy Bản Giốc są bez daty. Przewodniki z II 2025 i IX 2026 piszą, że zezwolenie nie jest potrzebne, a od 17.11.2025 zgadza się to z dekretem. Urzędowego komunikatu prowincji Cao Bằng o zezwoleniach dla turystów z lat 2024–2026 nie znalazłem.
- **Chińska strona wodospadu:** obszar krajobrazowy Bản Giốc–Đức Thiên działa oficjalnie od 15.10.2024, ale „Tạm thời chưa cho phép công dân nước thứ 3 qua lại Khu cảnh quan của hai bên”, czyli na razie bez obywateli państw trzecich. Grupa może być po drugiej stronie najwyżej 6 godzin (SP-BVH). Turysta z Polski nie przejdzie więc na chińską stronę.

### Ba Bể

- Jezioro leżało w prowincji Bắc Kạn, a od połączenia prowincji w 2025 r. należy do Thái Nguyên. Bắc Kạn nie było wśród 25 prowincji z granicą lądową, a wśród prowincji przygranicznych po połączeniu nie ma Thái Nguyên (SP-VNN).
- Ba Bể nie leży więc w strefie przygranicznej. Zezwolenie ani zawiadomienie straży granicznej nie są potrzebne, a nocleg melduje gospodarz, jak wszędzie (VN-L23).

### Czego nie ustaliłem

- Listy gmin strefy przygranicznej w Cao Bằng po 17.11.2025 (załącznik I do dekretu 299/2025). Sprawdzone 15.10.2026: listy dalej nie odczytałem, bo załącznik I jest w PDF, a omówienie z listą (248 gmin i dzielnic w całym kraju) jest na stronie z 403 (MOTO-2026-10-15m†). Według definicji strefy (SP-ND34 art. 3 ust. 1) należą do niej gminy z planu: Trà Lĩnh, od 2025 r. razem z dawnymi gminami Quốc Toản i Cao Chương, z 9,2 km granicy (MOTO-2026-10-15n†, MOTO-2026-10-15q†); Trường Hà z Pác Bó, gmina przygraniczna w strefie ekonomicznej przy przejściach (MOTO-2026-10-15o); Đàm Thủy z Bản Giốc (SP-QD248).
- Czy domy gospodarzy w Khuổi Ky leżą w pasie przygranicznym. Poza stroną (decyzja z 15.10.2026): strona nie opisuje meldunku ani zawiadomień przy noclegu u gospodarzy.
- Czy Thang Hen, przełęcz Mã Phục, Núi Mắt Thần i Pác Bó leżą w gminach strefy przygranicznej, a jeśli tak, czy któreś z tych miejsc ma status obszaru turystycznego. Pác Bó leży przy samej granicy (COR-NE). Przewodnik pisze, że jest dostępne bez specjalnego zezwolenia (SP-VT), ale urzędowego potwierdzenia nie mam. Sprawdzone 15.10.2026: Pác Bó leży w strefie, ale też w strefie ekonomicznej przy przejściach granicznych Cao Bằng: jej plan ogólny (decyzja 295/QĐ-TTg) ma w niej obszar turystyczny przy zabytku Pác Bó, ok. 1137 ha w gminie Trường Hà, obok obszaru Bản Giốc–Ngườm Ngao, ok. 1000 ha (MOTO-2026-10-15o). Dekret 299/2025 zwalnia z zezwolenia obszary turystyczne, usługowe i strefy ekonomiczne (MOTO-2026-10-15s), więc do Pác Bó zezwolenie nie jest potrzebne; to moja interpretacja, zgodna z przewodnikiem (MOTO-2026-10-15r). Thang Hen i Núi Mắt Thần leżą w dawnej gminie Quốc Toản, czyli od 2025 r. w gminie przygranicznej Trà Lĩnh (MOTO-2026-10-15q†, MOTO-2026-10-15n†). Statusu obszaru turystycznego ani położenia w strefie ekonomicznej dla nich nie znalazłem: plan strefy ich nie wymienia (MOTO-2026-10-15o), a Pác Bó jest w nim tylko jako zabytek z obszarem turystycznym. Przewodnik z 14.09.2026 wymienia Thang Hen i główne drogi pętli wśród miejsc dostępnych bez zezwolenia, o Mắt Thần w tej sprawie nie pisze, a zezwolenia wymagają według niego niektóre punkty widokowe przy Trà Lĩnh (MOTO-2026-10-15r). Gminy przełęczy Mã Phục nie ustaliłem.
- Jak przepis traktuje dojazd do obszaru turystycznego przez inne gminy strefy. Źródła praktyczne wspominają tylko wyrywkowe kontrole dokumentów (SP-VT). Sprawdzone 15.10.2026: przepis tego nie reguluje. Nowe brzmienie art. 6 wyłącza z obowiązku zezwolenia obszary turystyczne, usługowe i strefy ekonomiczne, każe mieć przy sobie paszport, a wietnamskie urzędy i organizacje, które wprowadzają cudzoziemców do strefy, zawiadamiają dowództwo straży granicznej i policję prowincji co najmniej 24 godziny wcześniej; o przejeździe przez inne gminy strefy i o biurach podróży omówienie nic nie mówi (MOTO-2026-10-15s). Część dróg leży w strefie ekonomicznej (część albo całość 31 gmin i 3 miasteczek przy granicy, ok. 30 130 ha; MOTO-2026-10-15o), ale jej dokładnych granic nie ustaliłem, bo decyzja o jej utworzeniu jest tylko w PDF (MOTO-2026-10-15p†). W praktyce główne drogi pętli są dostępne bez zezwolenia, a na drogach koło Tà Lùng i Trà Lĩnh zdarzają się kontrole paszportów i dokumentów pojazdu (MOTO-2026-10-15r); jedyna znana sprawa z 2026 r. dotyczy osady Nặm Sấn w gminie Lũng Nặm, poza miejscami z planu (SP-VNS).
- Kary za wjazd do strefy bez zezwolenia i to, jak policja w Cao Bằng wydaje zezwolenie (dokumenty, czas, opłata). Poza stroną (decyzja z 15.10.2026): strona radzi tylko nie zbaczać ku granicy, bez kar i procedury, bo wskazówki „jak” wypadają z opisów dni.

### Co z tego wynika dla strony

- Dzień „Jeziora, przełęcz, wodospad i jaskinia” (`p: 2` w CAO-JS) nie wymaga zmian w planie. Zezwolenie nie jest potrzebne ani w wersji z kierowcą, ani na własnym motocyklu.
- Propozycja zdania do dnia albo do ramki „Samodzielnie”: „Bản Giốc, Ngườm Ngao i Khuổi Ky leżą przy granicy z Chinami, ale w obszarze turystycznym, więc zezwolenie nie jest potrzebne. Miej przy sobie paszport, a gospodarz zamelduje cię na policji. Nie zbaczaj na boczne drogi ku granicy: poza obszarem turystycznym cudzoziemiec potrzebuje zezwolenia policji prowincji. Na chińską stronę wodospadu turyści z Polski nie mogą przejść.” (SP-QD248, SP-LSVN, SP-VNS, SP-BVH)
- Dzień „Oko Anioła i Pác Bó” (`p: 3`): to samo zdanie o paszporcie. Status Pác Bó jest niepewny (wyżej).
- **Sprawdzone 15.10.2026 (plan B2):** skrócony opis dnia 1 mówi: „Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky zezwolenie nie jest potrzebne, ale gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji: nie zbaczaj w boczne drogi ku granicy.” To zdanie jest prawdziwe, ale dzień „Oko Anioła i Pác Bó” prowadzi do Pác Bó „przy granicy”, gdzie zezwolenie nie jest potrzebne (obszar turystyczny w strefie ekonomicznej, „Czego nie ustaliłem” wyżej). Od planu B2 na stronie: „Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao, w Khuổi Ky i w Pác Bó zezwolenie nie jest potrzebne, ale gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji: nie zbaczaj w boczne drogi ku granicy.” (MOTO-2026-10-15o, MOTO-2026-10-15r, MOTO-2026-10-15s, SP-QD248)
- **Thang Hen i Núi Mắt Thần (15.10.2026):** od 2025 r. leżą w gminie przygranicznej Trà Lĩnh, bez znanego statusu obszaru turystycznego, więc zdanie z 12.10.2026, że w dniu z Thang Hen zezwolenie nie jest potrzebne, ma tylko oparcie w praktyce: przewodnik z 14.09.2026 podaje Thang Hen i główne drogi pętli jako dostępne bez zezwolenia, a lokalne biuro sprzedaje dzień z Mắt Thần bez wzmianki o nim (MOTO-2026-10-15r, ECO-1D, SP-ECO). Strona nie powinna obiecywać, że przy Thang Hen i Mắt Thần zezwolenie nie jest potrzebne.

## Źródła

Adresy sprawdzone 11.10.2026: z 65 adresów 62 otwierają się, a trzy oznaczone † zwracają 403 dla narzędzia. Data w ostatniej kolumnie to data publikacji albo aktualizacji strony; „brak” znaczy, że strona jej nie podaje. Rodzaj: urzędowe, prasa, operator, komercyjne (przewodniki i serwisy), blog, encyklopedia. Przy PDF-ach zaznaczam, które przeczytałem.

### Prawo wietnamskie i konwencja

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| UN-1968 | Zbiór traktatów ONZ, Konwencja o ruchu drogowym (Wiedeń, 8.11.1968): Polska ratyfikacja 23.08.1984, Wietnam przystąpienie 20.08.2014, zastrzeżenia do art. 52. | https://treaties.un.org/Pages/ViewDetailsIII.aspx?src=TREATY&mtdsg_no=XI-B-19&chapter=11&Temp=mtdsg3&clang=_en | urzędowe (ONZ) | stan na 11.10.2026 |
| VN-LUAT | Tekst ujednolicony 55/VBHN-VPQH ustawy 36/2024/QH15 z nowelizacją 118/2025/QH15 (od 1.07.2026): art. 33, 34, 56, 57, 58, 59 (PDF, przeczytany). | https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/55-vbhn-vpqh.pdf | urzędowe (portal rządu) | 2026 (plik z III 2026 według adresu) |
| VN-LUAT24 | Pełny tekst ustawy 36/2024/QH15 na portalu prowincji Nghệ An (do porównania z VN-LUAT). | https://hcc.nghean.gov.vn/tin-tong-hop/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-1545.html | urzędowe (portal prowincji) | 9.09.2024 |
| TT108-CT | Departament Sprawiedliwości Cần Thơ: okólnik 108/2026/TT-BCA z 29.06.2026, w mocy od 1.07.2026, obejmuje wydawanie i używanie IDP. | https://pbgdpl.cantho.gov.vn/cac-truong-hop-doi-giay-phep-lai-xe-tu-thang-72026 | urzędowe | 9.07.2026 |
| TT108-LSVN | Báo Luật sư (gazeta adwokatury): artykuły o okólniku 108/2026/TT-BCA, „zastępuje okólnik 12/2025/TT-BCA”. | https://lsvn.vn/tag/thong-tu-1082026ttbca.html | prasa | brak |
| TT108-TVND | Thư viện Nhà đất: metryka okólnika 108/2026/TT-BCA (wydał minister bezpieczeństwa publicznego, podpis Lương Tam Quang, 29.06.2026), bez treści. | https://thuviennhadat.vn/vbpl/thong-tu-108-2026-tt-bca-sat-hach-cap-giay-phep-lai-xe-704772.html | komercyjne (baza przepisów) | 29.06.2026 (data aktu) |
| TT108-TVPL† | Thư viện Pháp luật: pełny tekst okólnika 108/2026/TT-BCA; część przepisów okólnika 12/2025 obowiązuje do 28.02.2027 (wyniki wyszukiwania). | https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/toan-van-thong-tu-1082026ttbca-ve-sat-hach-cap-giay-phep-lai-xe-thay-the-thong-tu-122025ttbca-ra-sa-277435.html | komercyjne (baza przepisów) | brak |
| TT12-LV† | LuatVietnam: okólnik 12/2025/TT-BCA o prawach jazdy od 1.03.2025 (wyniki wyszukiwania). | https://luatvietnam.vn/tin-van-ban-moi/da-co-thong-tu-12-2025-tt-bca-ve-cap-giay-phep-lai-xe-tu-ngay-01-3-2025-186-101206-article.html | komercyjne (baza przepisów) | brak |
| WIKI-HG | Wikipedia, Hà Giang province: włączenie do Tuyên Quang, uchwała 202/2025/QH15 z 12.06.2025. | https://en.wikipedia.org/wiki/H%C3%A0_Giang_province | encyklopedia | edycja 5.10.2026 |

### Kary

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| RAB-LEGAL | Rentabike Vietnam, FAQ prawne: IDP 1968 i prawo jazdy na rodzaj pojazdu, 50 cm³ od 16 lat, kary 2–4 i 6–8 mln VND, 200 000–300 000 VND, OC, ubezpieczenie a jazda bez uprawnień. | https://rentabikevn.com/faq/legal/ | operator | brak (© 2026) |
| MOMO-GPLX | MoMo, blog o mandatach: brak prawa jazdy 2–4 mln VND (do 125 cm³) i 6–8 mln VND (powyżej), zatrzymanie 7 dni–2 miesiące. | https://www.momo.vn/phat-nguoi/blog/loi-khong-giay-phep-lai-xe-muc-phat-va-cach-momo-giup-ban-giai-quyet-77 | komercyjne | brak |
| MOMO-KASK | MoMo, blog o mandatach za kask: 400 000–600 000 VND od osoby, bez punktów, kask bez znaku CR. | https://www.momo.vn/phat-nguoi/blog/muc-phat-loi-khong-mu-bao-hiem-80 | komercyjne | 7.06.2026 |
| VT-LEGAL | Vietnamtourism.com, „Renting a motorbike in Vietnam”: IDP 1968, prawo jazdy na samochód nie wystarcza, kary, kontrole, paszport, kask, ubezpieczenie. | https://www.vietnamtourism.com/en/renting-a-motorbike-in-vietnam-the-legal-truth-nobody-tells-tourists | komercyjne | aktualizacja 11.10.2026 |
| TVPL-GPLX† | Thư viện Pháp luật, „Không có giấy phép lái xe phạt bao nhiêu 2025?”: art. 18 ust. 5 dekretu 168/2024 dosłownie, 2–4 mln VND (wyniki wyszukiwania). | https://thuvienphapluat.vn/hoi-dap-phap-luat/khong-co-giay-phep-lai-xe-phat-bao-nhieu-2025-138041735.html | komercyjne (baza przepisów) | brak |
| HOATIEU | Hoatieu.vn, tekst dekretu 168/2024/NĐ-CP z inną wersją kwot (1–2 i 4–5 mln VND, OC 100 000–200 000 VND). | https://hoatieu.vn/phap-luat/nghi-dinh-168-2024-nd-cp-227922 | komercyjne | nagłówek tekstu 27.12.2024 |
| LSVN-BH | Báo Luật sư: kara za brak OC według dekretu 168/2024 (art. 18 ust. 2) 200 000–300 000 VND, wcześniej 100 000–200 000 VND. | https://lsvn.vn/tang-muc-phat-doi-voi-hanh-vi-khong-co-bao-hiem-xe-may-bat-buoc-tu-nam-2025-a152421.html | prasa | 10.01.2025 |
| NNMT | Báo Nông nghiệp và Môi trường: dekret 168/2024 od 1.01.2025, art. 18 ust. 2 lit. d (przewóz zarobkowy), zatrzymanie pojazdu (art. 48 ust. 3). | https://nongnghiepmoitruong.vn/khong-mang-giay-phep-lai-xe-se-bi-phat-the-nao-tu-1-1-2025-d415887.html | prasa | 2.01.2025 |
| CAFEF-238 | CafeF: dekret 238/2026/NĐ-CP zmienia dekret 168, w mocy od 15.08.2026. | https://cafef.vn/quy-dinh-moi-ve-xu-phat-vi-pham-giao-thong-ap-dung-tu-ngay-15-8-tat-ca-nguoi-dan-chu-y-188260730065435832.chn | prasa | 30.07.2026 |
| TP-238 | Tiền Phong: Cục CSGT o dekrecie 238/NĐ-CP z 26.06.2026, kary równoważne z dekretem 168. | https://tienphong.vn/cuc-csgt-bac-bo-thong-tin-nguoi-tu-16-den-duoi-18-tuoi-di-moi-loai-xe-may-deu-bi-phat-post1856991.tpo | prasa | 5.07.2026 |

### Prawo polskie i MSZ

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| PL-UKP | Ustawa z 5.01.2011 o kierujących pojazdami, tekst pierwotny w API Sejmu (ELI): art. 4 ust. 1, art. 5 ust. 3, art. 6 ust. 1 i 3, art. 10 ust. 2. | https://api.sejm.gov.pl/eli/acts/DU/2011/151/text.html | urzędowe | Dz.U. 2011 nr 30 poz. 151 |
| PL-2014 | Ustawa z 26.06.2014 o zmianie ustawy o kierujących pojazdami: art. 6 ust. 3 pkt 4 (B od 3 lat a motocykl 125 cm³). | https://api.sejm.gov.pl/eli/acts/DU/2014/970/text.html | urzędowe | Dz.U. 2014 poz. 970 (ELI: 24.08.2014) |
| PL-ELI | Metryki ELI: ustawa obowiązuje, ostatni tekst jednolity Dz.U. 2025 poz. 1226 (obwieszczenie z 1.09.2025, tylko PDF, nie czytany). | https://api.sejm.gov.pl/eli/acts/DU/2011/151 ; https://api.sejm.gov.pl/eli/acts/DU/2025/1226 | urzędowe | zmiana metryki 1.10.2026 |
| GOV-MPJ | gov.pl, „Uzyskaj międzynarodowe prawo jazdy”: wzór wiedeński albo genewski, 35 zł, do 3 dni roboczych, do 3 lat, listy państw konwencji. | https://www.gov.pl/web/gov/uzyskaj-miedzynarodowe-prawo-jazdy | urzędowe | aktualizacja 28.07.2026 |
| MSZ-NEWS | Ambasada RP w Hà Nội: od 30.06 MSZ publikuje informacje dla podróżujących w portalu Odyseusz. | https://www.gov.pl/web/wietnam/odyseusz---podrozuj-bezpiecznie-z-msz | urzędowe | 3.08.2026 |
| MSZ-ODY | MSZ, Odyseusz, profil Wietnamu (tu przekierowuje gov.pl/web/wietnam/informacje-dla-podrozujacych); aplikacja, treść nie odczytana. | https://odyseusz.gov.pl/VN | urzędowe | brak |

### Ryzyko i kontrole

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| WHO-GHO | WHO Global Health Observatory (API): szacowana liczba zgonów na drogach (RS_196) i wskaźnik na 100 000 (RS_198) dla Wietnamu i Polski, 2021. | https://ghoapi.azureedge.net/api/RS_198?$filter=SpatialDim%20eq%20%27VNM%27 ; https://ghoapi.azureedge.net/api/RS_198?$filter=SpatialDim%20eq%20%27POL%27 ; https://ghoapi.azureedge.net/api/RS_196?$filter=SpatialDim%20eq%20%27VNM%27%20or%20SpatialDim%20eq%20%27POL%27 | urzędowe (WHO) | dane z 15.04.2024 |
| FCDO | UK Foreign Travel Advice, Vietnam, „Safety and security”: IDP 1968 i krajowe prawo jazdy, OC, kask, motocykle, paszport w zastaw, skutki wypadku, osuwiska. | https://www.gov.uk/foreign-travel-advice/vietnam/safety-and-security ; https://www.gov.uk/foreign-travel-advice/vietnam | urzędowe (UK) | aktualizacja 21.09.2026, aktualne na 11.10.2026 |
| COR-HG | Vietnam Coracle, przewodnik po pętli Hà Giang: punkty kontroli, prawo jazdy, paszport, odcinki dzienne; komentarze czytelników z 2025 r. | https://vietnamcoracle.com/ha-giang-extreme-north-motorbike-loop/ | blog (komentarze jako forum) | aktualizacja I 2024, komentarze do I 2026 |
| TIGIT-IDP | Tigit Motorbikes, „Riding in Vietnam: International drivers license info”: IDP 1968, brak kontroli prawa jazdy poniżej 150 cm³, kary i kontrole w Hà Giang, ubezpieczenie. | https://www.tigitmotorbikes.com/blogs/international-drivers-license.html | operator | 28.11.2019, aktualizacje do III 2026 |
| LOOP-FAQ | Loop Tours, FAQ na stronie głównej: A1 i A w Hà Giang, kary do 8 mln i 20 mln VND, łagodniejsze egzekwowanie w Cao Bằng (bez źródeł). | https://thelooptours.com/ | operator | brak (© 2026) |

### Ubezpieczenia

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| OWU-WARTA | OWU Warta Travel C0517 z kartą produktu: § 3 pkt 18, § 11 ust. 1 pkt 5 i 6, § 14 pkt 1, § 17 (PDF, przeczytany). | https://www.warta.pl/documents/oferta_dla_ciebie/OWU_WARTA_Travel_C0517.pdf | ubezpieczyciel | obowiązują od 17.05.2026 |
| WARTA-WWW | Warta Travel, strona produktu z dokumentami. | https://www.warta.pl/ubezpieczenie-turystyczne-zagraniczne-warta-travel/ | ubezpieczyciel | brak |
| UNIQA-WWW | UNIQA, ubezpieczenie turystyczne Świat i Europa: udział własny w wynajętym samochodzie, motocyklu albo skuterze do 4 000 zł. | https://www.uniqa.pl/ubezpieczenie-turystyczne-swiat-europa/ | ubezpieczyciel | brak |
| UNIQA-OWU | OWU Ubezpieczenie podróży Supertravel (PDF, nie czytany). | https://www.uniqa.pl/dokumenty/2510_OWU_Ubezpieczenie_podrozy_Supertravel.pdf | ubezpieczyciel | brak |
| TUE-WWW | TU Europa, Travel World: „sporty motorowe” wśród sportów ekstremalnych, warianty Standard Plus, VIP, VIP Plus. | https://tueuropa.pl/ubezpieczenia-turystyczne.htm | ubezpieczyciel | brak |
| TUE-OWU | OWU Travel World (PDF, nie czytany). | https://tueuropa.pl/doclib/OWU-Travel-World.pdf | ubezpieczyciel | brak |
| ERGO-WWW | ERGO Hestia, ERGO Podróż: udział własny w wynajętym pojeździe do 2 000 zł; OWU C-EP-01/25 (PDF, nie czytany). | https://www.ergohestia.pl/ubezpieczenie-podrozy/ ; https://cdn.bsbox.pl/files/hestia/NDE7MDA_/9a54317b4cb039a621bf29e0f550973a_documents.pdf | ubezpieczyciel | brak |
| PZU-WWW | PZU, ubezpieczenie wyjazdu turystycznego; OWU od 1.12.2025 (PDF, nie czytany). | https://www.pzu.pl/dla-ciebie-i-rodziny/majatek-podroze-oc/podroze/ubezpieczenie-wyjazdu-turystycznego ; https://www.pzu.pl/_fileserver/item/1565294 | ubezpieczyciel | OWU od 1.12.2025 |
| GEN-WWW | Generali, podróże zagraniczne; OWU „Generali z myślą o podróży” (PDF, nie czytany). | https://www.generali.pl/dla-ciebie/majatek/podroze-zagraniczne ; https://www.generali.pl/media/Ogolne_Warunki_Ubezpieczenia_Generali_z_mysla_o_podrozy_obowiazujace_od_28_11_2024_r_PDF_502d78a0d0.pdf | ubezpieczyciel | OWU od 28.11.2024 |
| RAB-RENT | Rentabike Vietnam, FAQ wynajmu: kaucja (także paszport), obowiązkowe OC, brak autocasco, szkody po stronie najemcy, bagaż kurierem, opłata za zwrot w innym mieście 75–200 USD, ceny dzienne. | https://rentabikevn.com/faq/rentals/ | operator | brak (© 2026) |

### Cao Bằng

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| VT-CB | Vietnamtourism.com, „How to get to Cao Bang”: wynajem 150 000–250 000 VND/dzień, easy rider 500 000–800 000 VND/dzień, taksówka do Bản Giốc, auto z Hà Nội. | https://www.vietnamtourism.com/en/how-to-get-to-cao-bang | komercyjne | aktualizacja 31.05.2026 |
| VT-LOOP | Vietnamtourism.com, „Cao Bang Loop self drive”: 250–300 km, odcinki dzienne, wypożyczalnie, typy i ceny, kaucja, paliwo, stacje, zagrożenia, kontrole. | https://www.vietnamtourism.com/en/cao-bang-loop-self-drive-the-complete-2026-guide | komercyjne | aktualizacja 30.05.2026 |
| LOOP-CB3 | Loop Tours, „Cao Bang 3 Days”: Self Ride 129 USD, Easy Rider 179 USD, Jeep 1 178 USD, plus 8% VAT; zakres, trasa, „Border Permit Fee”. | https://thelooptours.com/tour/cao-bang-3-days | operator | brak (© 2026) |
| COR-NE | Vietnam Coracle, „The Northeast by Motorbike”: pętla Bản Giốc 165–190 km, pętla przygraniczna 285 km, ciężarówki, osuwiska, QT Motorbikes w Cao Bằng. | https://vietnamcoracle.com/the-northeast-by-motorbike-5-routes-loops/ | blog | aktualizacja VIII 2020 |
| NV-CB | North-Vietnam.com, Cao Bằng: odległości z miasta (Bản Giốc 80 km, Pác Bó 50 km, Thang Hen 20 km), rady na drogę. | https://north-vietnam.com/cao-bang/ | komercyjne | aktualizacja VII 2026 |
| NV-HCB | North-Vietnam.com, Hà Nội – Cao Bằng: auto prywatne 120–350 USD. | https://north-vietnam.com/hanoi-to-cao-bang-ban-gioc-waterfall-bus-car/ | komercyjne | aktualizacja VIII 2026 |
| HET-CB | Hanoi Eco Tour, Hà Nội – Cao Bằng: auto 148–168 USD w jedną stronę, pakiet 3 dni 282/298/379 USD (z paliwem, opłatami i parkingami). | https://hanoiecotour.com/hanoi-to-cao-bang/ | operator | brak (© 2023, wpisy z 2026) |
| MOIT-0810 | Ministerstwo Przemysłu i Handlu: ceny maksymalne paliw od 15:00 8.10.2026 (E10 RON95-III 28 254 VND/l, E5 RON92 27 703 VND/l). | https://moit.gov.vn/tin-tuc/thong-tin-dieu-hanh-gia-xang-dau-ngay-8-10-2026.html | urzędowe | 8.10.2026 |
| PLX-0810 | Petrolimex: zmiana cen od 15:00 8.10.2026 (ceny tylko na obrazku). | https://www.petrolimex.com.vn/ndi/thong-cao-bao-chi/petrolimex-dieu-chinh-gia-xang-dau-tu-15-gio-00-phut-ngay-08-10-2026.html | operator | 8.10.2026 |
| HONDA | Honda Vietnam: dane techniczne Vision, Blade 110 i Future 125 FI (pojemność, zużycie paliwa, bak). | https://www.honda.com.vn/xe-may/san-pham/vision ; https://www.honda.com.vn/xe-may/san-pham/blade ; https://www.honda.com.vn/xe-may/san-pham/future-125-fi | producent | brak |
| CAO-JS | Treść miejsca Cao Bằng: dni planu i ich numery `p`. | `site2/src/content/caobang.js` | własne | 11.10.2026 |
| CAO-wetrek | Núi Mắt Thần 1,5–2 km od Thang Hen (za `research/trudne-dni-2026-10.md`). | `research/trudne-dni-2026-10.md` | własne badanie | 10.10.2026 |
| POL | Czasy przejazdów: hoian – hue 3,25 h, punkt `caobang` to miasto Cao Bằng. | `research/polaczenia-2026-10.md` | własne badanie | 9.10.2026 |

### Przełęcz Hải Vân

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| GMHA | Good Morning Hội An, „How to get from Hoi An to Hue”: auto przez przełęcz, easy rider, wypożyczalnie w jedną stronę, przewóz skutera przez tunel. | https://goodmorning-hoian.com/en/how-to-get-from-hoi-an-to-hue/ | komercyjne | 2.10.2025, aktualizacja 21.04.2026 |
| LV-HUE | LocalVietnam, „From Hue to Da Nang”: zakaz wjazdu motocykli do tunelu, wynajem w jedną stronę 600 000–750 000 VND, easy rider 50–90 USD, auto 60–110 USD, czasy, rady. | https://localvietnam.com/da-nang/from-hue-to-da-nang/ | komercyjne | aktualizacja 4.07.2026 |
| COR-HV | Vietnam Coracle, „Hai Van Pass”: tunel zamknięty dla motocykli, 130 i 165 km, wypożyczalnie w jedną stronę, zagrożenia. | https://vietnamcoracle.com/hai-van-the-pass-of-ocean-mist-5/ | blog | aktualizacja X 2024 |
| HMA | Hoi An Motorbike Adventures, „Hoi An to Hue via Hai Van Pass”: 48 USD od osoby, zakres, przewóz bagażu. | https://hoianmotorbikeadventures.com/hoi-an-to-hue-via-hai-van-pass-1-day-motorbike-tour/ | operator | brak |
| TIGIT-WWW | Tigit Motorbikes: modele, zwrot w Hội An i Huế, blokada 100 i 50 USD, cennik 2026. | https://www.tigitmotorbikes.com/ ; https://www.tigitmotorbikes.com/prices/ | operator | brak (cennik „2026”) |

### Uzupełnienie 12.10.2026: ceny

Adresy sprawdzone 12.10.2026: wszystkie odpowiadają kodem 200. Cenę oznaczoną † (HV-HL) widać tylko w wynikach wyszukiwania; sama strona się otwiera, ale cennik ma na obrazkach.

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| HV-AK1 | Anh Khoa (hoianit.com), Hội An → Huế w jedną stronę: 750 000 VND z przewozem bagażu, motorower 50 cm³ za 900 000 VND, paliwo ok. 100 000 VND osobno, bilet do Hải Vân Quan 70 000 VND, zwrot przy 201 Trần Phú w Huế, prawo jazdy na motocykl i IDP z 1968 r. | https://hoianit.com/motorbike-hue-to-hoi-an-one-way/ | operator | aktualizacja VIII 2026 |
| HV-AK2 | Anh Khoa, „Hoi An to Hue Motorbike Rental 2026”: modele i ceny (750 000–850 000 VND), 2 sztuki bagażu w cenie, następna 50 000 VND, do 20 kg na osobę, pełny bak +200 000 VND, kaucja 2 000 000 VND albo kopia paszportu. | https://hoianit.com/san-pham/hoi-an-to-hue-motorbike-rental/ | operator | brak („2026” w tytule) |
| HV-TT1 | Trace Travel Vietnam (Hội An), Hội An → Huế: Honda Wave 110 i Air Blade 125 za 19 USD na 1 dzień, bagaż 50 000 VND za sztukę, zwrot w biurze Hidden Land w Huế, zwykle bez kaucji. | https://tracetravelvietnam.com/product/hoi-an-to-hue/ | operator | brak (© 2026) |
| HV-TT2 | Trace Travel Vietnam, Huế → Hội An: Honda Wave 110 i Air Blade 125 za 20 USD na 1 dzień, bagaż 50 000 VND za sztukę. | https://tracetravelvietnam.com/product/hue-to-hoi-an/ | operator | brak (© 2026) |
| HV-HL | Hidden Land Travel, Hội An → Huế: dowóz do hotelu w Hội An, zwrot w biurze w Huế, cennik w obrazkach, bagaż 50 000 VND za sztukę, kaucja 300 USD albo paszport lub bagaż; „from 22 USD” tylko w wynikach wyszukiwania (†). | https://hiddenlandtravel.com/rental/hoi-an-to-hue-motorbike-rental/ | operator | brak |
| ECO-1D | Cao Bang Eco Travel, wycieczka 1 dzień: easy rider 1 490 000 VND, samodzielnie 1 090 000 VND, autem 1 199 000–2 399 000 VND za osobę; nie wliczone: auto 60 USD i przewodnik po angielsku 15 USD za dzień. | https://caobangecotravel.com/tour-full-day/ | operator | brak |
| ECO-3D | Cao Bang Eco Travel, pętla 3 dni/2 noce: easy rider 4 810 000 VND, samodzielnie 3 410 000 VND, autem 3 835 000–7 210 000 VND za osobę; „Car: 60$/day” wśród rzeczy nie wliczonych. Ten sam adres co SP-ECO. | https://caobangecotravel.com/3-days-2-nights-tour/ | operator | brak (© 2024) |
| ECO-WWW | Cao Bang Eco Travel, strona główna: wynajem motocykla 180 000–550 000 VND za dzień. | https://caobangecotravel.com/ | operator | brak |
| CAO-PT | Power Traveller (strona z linkami partnerskimi): 1 dzień z easy riderem do Bản Giốc i Mắt Thần, zbiórka w Green Riders House, od 76 USD za osobę z obiadem, biletami, kaskiem i ubezpieczeniem. | https://powertraveller.com/ban-gioc-waterfall-mt-angel-eye-full-day-trip-with-easy-rider/ | komercyjne | brak (© 2026) |

### Strefa przygraniczna (uzupełnienie 12.10.2026)

Adresy sprawdzone 12.10.2026: z 16 adresów 13 otwiera się, a trzy oznaczone † nie otworzyły się dla narzędzia (kod w opisie). LOOP-CB3 otworzyłem ponownie 12.10.2026 (kod 200).

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| SP-ND34 | Dekret 34/2014/NĐ-CP o strefie przygranicznej na lądzie, brzmienie z 2014 r. w bazie Hệ thống pháp luật: art. 3 (definicje, pas 100–1000 m), art. 6 (zezwolenie dla cudzoziemców), art. 7 (nocleg, zawiadomienie straży granicznej, obszary turystyczne). | https://hethongphapluat.com/nghi-dinh-34-2014-nd-cp-ve-quy-che-khu-vuc-bien-gioi-dat-lien-nuoc-viet-nam/chuong-1 ; https://hethongphapluat.com/nghi-dinh-34-2014-nd-cp-ve-quy-che-khu-vuc-bien-gioi-dat-lien-nuoc-viet-nam/chuong-2 | komercyjne (baza przepisów) | akt z 29.04.2014, w mocy od 15.06.2014 |
| SP-ND299 | Portal administracji prowincji Nghệ An: metryka dekretu 299/2025/NĐ-CP (zmiany w dekretach o ochronie granicy), wydany i w mocy od 17.11.2025. Załączony podpisany PDF to skan bez warstwy tekstowej, nieodczytany. | https://hcc.nghean.gov.vn/laws/detail/Nghi-dinh-so-299-2025-ND-CP-cua-Chinh-phu-Sua-doi-bo-sung-mot-so-dieu-cac-Nghi-dinh-cua-Chinh-phu-ve-bien-phong-bien-gioi-quoc-gia-1974/ | urzędowe (portal prowincji) | akt z 17.11.2025 |
| SP-LSVN | Báo Luật sư: omówienie dekretu 299/2025/NĐ-CP, nowe brzmienie art. 6 ust. 1 i 2 dekretu 34/2014 („trừ khu du lịch, dịch vụ, khu kinh tế”), nowa lista gmin strefy. | https://lsvn.vn/quy-dinh-moi-lien-quan-den-viec-quan-ly-khu-vuc-bien-gioi-dat-lien-a166199.html | prasa | 27.11.2025 |
| SP-VBHN† | Tekst ujednolicony 12/VBHN-BQP ministerstwa obrony (dekret 34/2014 ze zmianami): art. 6 ust. 2 lit. a z wyjątkiem dla obszarów turystycznych, usługowych i ekonomicznych (wyniki wyszukiwania; adres nie odpowiada, kod 000). | https://vbpl.moj.gov.vn/TW/Lists/vbpq/Attachments/187567/12.VBHN-BQP.doc | urzędowe | brak |
| SP-QD248 | Decyzja 248/QĐ-UBND komitetu ludowego prowincji Cao Bằng z 26.02.2025, regulamin zarządzania obszarem turystycznym wodospadu Bản Giốc: ok. 1000 ha w gminie Đàm Thủy, strefa 1 z Bản Giốc, Ngườm Ngao i kamiennymi domami Khuổi Ky, art. 11 i 12. | https://hethongphapluat.com/quyet-dinh-248-qd-ubnd-nam-2025-ve-quy-che-quan-ly-khu-du-lich-thac-ban-gioc-tinh-cao-bang.html | komercyjne (baza przepisów) | akt z 26.02.2025 |
| VN-L23 | Pełny tekst ustawy 23/2023/QH15 zmieniającej ustawę o wjeździe cudzoziemców: art. 33 w nowym brzmieniu (meldunek przez obiekt noclegowy na policji gminnej w 12 godzin, w odległych rejonach w 24). Ten sam adres co VN-L23 w `research/wjazd-2026-10.md`. | https://xaydungchinhsach.chinhphu.vn/toan-van-luat-so-23-2023-qh15-sua-doi-mot-so-dieu-cua-luat-xuat-canh-nhap-canh-119230726100202115.htm | urzędowe (rząd) | 26.07.2023 |
| SP-VNS | Việt Nam News: obywatel USA bez zezwolenia w strefie przygranicznej, osada Nặm Sấn, gmina Lũng Nặm, 22.09.2026; wykroczenie spisane, sprawa w wydziale imigracyjnym policji prowincji. | https://vietnamnews.vn/society/1800599/american-tourist-investigated-for-entering-border-area-without-authorisation.html | prasa | 25.09.2026 |
| SP-VT | Vietnamtourism.com (wydawca nieustalony), „Cao Bang province geography and the China border guide”: Bản Giốc, Pác Bó i miasto bez specjalnego zezwolenia, zgoda władz w odległych gminach, paszport w oryginale, kontrole koło Tà Lùng i Trà Lĩnh, drony. | https://www.vietnamtourism.com/en/cao-bang-province-geography-and-the-china-border-guide | komercyjne | aktualizacja 14.09.2026 |
| SP-COR | Vietnam Coracle, „Ban Gioc Waterfall”: dawniej zezwolenie, dziś bilet 45 000 VND „without any documents at all”; Ngườm Ngao 45 000 VND; Khuổi Ky kilka kilometrów od wodospadu. | https://www.vietnamcoracle.com/ban-gioc-waterfall-an-illustrated-guide/ | blog | aktualizacja II 2025 |
| SP-LP† | Lonely Planet, Ban Gioc Waterfall: policja przy wodospadzie czasem żąda zezwolenia, 200 000 VND dla grupy do 10 osób (wyniki wyszukiwania; kod 503). | https://www.nonprod.lonelyplanet.com/points-of-interest/ban-gioc-waterfall/1142473 | komercyjne | brak |
| SP-FOD† | Fodor's, forum: relacja biura podróży z pętli Cao Bằng; kontrole i zezwolenie przy Bản Giốc, samodzielni po zezwolenie do urzędu imigracyjnego w Cao Bằng (wyniki wyszukiwania; kod 403). | https://www.fodors.com/community/sitemap/t-1734242.html | blog (forum, wpis biura) | brak |
| SP-ECO | Cao Bang Eco Travel, pętla 3 dni/2 noce: bez wzmianki o zezwoleniu na strefę przygraniczną. | https://caobangecotravel.com/3-days-2-nights-tour/ | operator | brak |
| SP-GR | Cao Bang Green Riders, FAQ: bez wzmianki o zezwoleniu na strefę przygraniczną. | https://caobanggreenriders.com/faq | operator | brak (© 2023) |
| SP-BVH | Báo Văn hóa: oficjalne otwarcie obszaru krajobrazowego Bản Giốc–Đức Thiên 15.10.2024; obywatele państw trzecich na razie bez wstępu; grupa najwyżej 6 godzin po drugiej stronie. | https://baovanhoa.vn/diem-den/van-hanh-chinh-thuc-khu-canh-quan-thac-ban-gioc-viet-nam-duc-thien-trung-quoc-108441.html | prasa | 15.10.2024 |
| SP-VNN | VietNamNet: 25 prowincji z granicą lądową przed połączeniem prowincji (bez Bắc Kạn) i ich odpowiedniki po połączeniu (bez Thái Nguyên). | https://vietnamnet.vn/15-tinh-bien-gioi-sau-sap-nhap-thay-doi-ra-sao-2400214.html | prasa | 14.05.2025 |

### Przesiew i sprawdzenie (15.10.2026)

Sprawdzenie z 15.10.2026 dla planu B2: WebSearch i WebFetch, bez zapisywania stron.

| etykieta | co to jest | adres | rodzaj | data |
|---|---|---|---|---|
| MOTO-2026-10-15a | Zbiór traktatów ONZ, Konwencja o ruchu drogowym (Genewa, 19.09.1949), XI.B-1: 103 strony i 19 sygnatariuszy; m.in. USA (ratyfikacja 30.08.1950), Kanada (przystąpienie 23.12.1965), Australia (7.12.1954), Nowa Zelandia (12.02.1958), Japonia (7.08.1964), Indie (ratyfikacja 9.03.1962), Korea Płd. (sukcesja 14.06.1971), Wielka Brytania (8.07.1957), Francja (15.09.1950), Hiszpania (13.02.1958), Polska (29.10.1958), Singapur, Malezja, Irlandia; „Viet Nam” z przystąpieniem 2.11.1953, którego według przypisu 3 dokonała Republika Wietnamu; Niemiec i Chin nie ma. | https://treaties.un.org/Pages/ViewDetailsIII.aspx?src=TREATY&mtdsg_no=XI-B-1&chapter=11&Temp=mtdsg3&clang=_en | urzędowe (ONZ) | stan na 14.10.2026 |
| MOTO-2026-10-15b | Zbiór traktatów ONZ, Konwencja o ruchu drogowym (Wiedeń, 8.11.1968), XI.B-19, ten sam adres co UN-1968: 91 stron i 36 sygnatariuszy; strony m.in. Wielka Brytania (ratyfikacja 28.03.2018), Niemcy (3.08.1978), Francja (9.12.1971), Polska (23.08.1984), Wietnam (przystąpienie 20.08.2014), Tajlandia (1.05.2020), Włochy, Holandia, Rosja, Filipiny, Izrael, RPA; tylko podpis: Korea Płd. (29.12.1969) i Hiszpania (8.11.1968); nie ma USA, Kanady, Australii, Nowej Zelandii, Japonii, Indii, Chin, Singapuru, Malezji, Irlandii, Kambodży, Laosu i Argentyny. | https://treaties.un.org/Pages/ViewDetailsIII.aspx?src=TREATY&mtdsg_no=XI-B-19&chapter=11&Temp=mtdsg3&clang=_en | urzędowe (ONZ) | stan na 14.10.2026 |
| MOTO-2026-10-15c | Việt Nam News, felieton autora spoza redakcji „Using the roads in Việt Nam as a foreigner”: w Wietnamie działa tylko IDP z 1968 r., a Wietnam nie podpisał konwencji z 1949 r. (por. MOTO-2026-10-15a); USA, Kanada, Australia, Nowa Zelandia, RPA i Izrael „cannot issue an IDP that is valid” w Wietnamie (RPA i Izrael są według MOTO-2026-10-15b stronami konwencji z 1968 r., więc tu felieton się myli); umowa ASEAN o prawach jazdy; kontrole turystów na motocyklach w Khánh Hòa. | https://vietnamnews.vn/life-style/1781747/using-the-roads-in-viet-nam-as-a-foreigner.html | prasa | 21.05.2026 |
| MOTO-2026-10-15d | Vietcetera, „Why many foreigners ride illegally in Vietnam without realizing it”: Wietnam uznaje IDP z 1968 r.; USA i Kanada wydają głównie IDP z 1949 r., którego Wietnam nie uznaje; ubezpieczyciele odmawiają wypłaty bez prawa jazdy ważnego w Wietnamie. | https://vietcetera.com/amp/en/why-many-foreigners-ride-illegally-in-vietnam-without-realizing-it | prasa | 28.06.2026 |
| MOTO-2026-10-15e | AAA, „International Driving Permit”: art. 24 konwencji ONZ o ruchu drogowym z 1949 r. upoważnia Departament Stanu do wyznaczania wydawców IDP; AAA jest wyznaczonym wydawcą; IDP honorowane w ponad 150 państwach; o konwencji z 1968 r. nic. | https://www.aaa.com/international/idp.html | operator (wydawca IDP) | brak |
| MOTO-2026-10-15f† | Departament Stanu USA, Foreign Affairs Manual, 7 FAM 1430 „Driver's Licenses”: na podstawie art. 24 konwencji Departament upoważnia AAA i AATA jako jedynych wydawców IDP (wyniki wyszukiwania; narzędzie zgłasza błąd certyfikatu). | https://fam.state.gov/fam/07fam/07fam1430.html | urzędowe (USA) | brak |
| MOTO-2026-10-15g† | USA.gov, „International driver's license for U.S. citizens”: IDP wydają AAA i AATA (wyniki wyszukiwania; nie otwierałem). | https://www.usa.gov/international-drivers-license | urzędowe (USA) | brak |
| MOTO-2026-10-15h | Vietbao, „Quy định mới nhất về cấp giấy phép lái xe quốc tế”: okólnik 108/2026/TT-BCA w mocy od 1.07.2026; art. 29 ust. 1 o wydawaniu IDP posiadaczom wietnamskiego prawa jazdy, Wietnamczykom i cudzoziemcom; o używaniu zagranicznego IDP nic. | https://vietbao.vn/quy-dinh-moi-nhat-ve-cap-giay-phep-lai-xe-quoc-te-599090.html | prasa | 16.07.2026 |
| MOTO-2026-10-15i | Portal rządu „Xây dựng chính sách, pháp luật”: pełny tekst dekretu 168/2024/NĐ-CP z 26.12.2024; art. 18 ust. 2 lit. d (200 000–300 000 VND za niewzięte prawo jazdy, tylko przewóz zarobkowy), ust. 5 (2 000 000–4 000 000 VND, motocykle do 125 cm³; lit. a: brak prawa jazdy albo prawo jazdy niewłaściwe dla pojazdu; lit. b: IDP z państwa konwencji z 1968 r. bez krajowego prawa jazdy), ust. 7 (6 000 000–8 000 000 VND, powyżej 125 cm³; lit. a: prawo jazdy niewłaściwe dla pojazdu; lit. b: brak prawa jazdy). Dalszej części tekstu, od ok. 200 000 znaku, nie czytałem. | https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm | urzędowe (portal rządu) | 3.04.2025 (strona), akt z 26.12.2024 |
| MOTO-2026-10-15j | Nhân Dân, „Nâng cao an toàn giao thông cho người đi xe máy”: ok. 77 mln zarejestrowanych motocykli na koniec 2024 r.; motocykle biorą udział w ok. 65–70% wypadków (wiceprzewodniczący Narodowego Komitetu Bezpieczeństwa Ruchu); ponad 90% zabitych na drogach w 2023 r. zginęło w wypadkach z udziałem motocykla (Instytut Strategii i Rozwoju Transportu). | https://nhandan.vn/nang-cao-an-toan-giao-thong-cho-nguoi-di-xe-may-post859663.html | prasa | 12.02.2025 |
| MOTO-2026-10-15k† | WHO, „WHO convenes global motorcycle safety experts in Viet Nam”: w Wietnamie 74 mln motocykli, ponad 90% pojazdów, udział w ponad 60% wypadków (wyniki wyszukiwania; nie otwierałem). | https://www.who.int/news/item/25-11-2024-who-convenes-global-motorcycle-safety-experts-in-viet-nam | urzędowe (WHO) | 25.11.2024 |
| MOTO-2026-10-15l† | WHO w Wietnamie, przemówienie na szczycie Safe Helmets for Asia Pacific 2026: motocykliści i pasażerowie to prawie połowa zabitych na drogach w Azji; w Wietnamie prawie 80 mln motocykli, ok. 90% pojazdów (wyniki wyszukiwania; kod 403). | https://www.who.int/vietnam/news/speeches/speech/speech-of-dr-angela-pratt-at-the-safe-helmets-for-asia-pacific-(shap)-summit-2026 | urzędowe (WHO) | 2026 |
| MOTO-2026-10-15m† | Thư viện Pháp luật, „Chi tiết 248 xã phường khu vực biên giới đất liền từ ngày 17/11/2025?”: 248 gmin i dzielnic strefy przygranicznej na lądzie według załącznika I do dekretu 299/2025 (wyniki wyszukiwania; nie otwierałem, strony tej bazy zwracają 403). | https://thuvienphapluat.vn/phap-luat-nha-dat/chi-tiet-248-xa-phuong-khu-vuc-bien-gioi-dat-lien-tu-ngay-17112025-11797.html | komercyjne (baza przepisów) | brak |
| MOTO-2026-10-15n† | Báo Pháp luật, „Cao Bằng: Ngày hội Biên phòng toàn dân năm 2026 tại xã Trà Lĩnh”: Trà Lĩnh to gmina przygraniczna z 9,2 km granicy i 40 znakami granicznymi (wyniki wyszukiwania; nie otwierałem). | https://baophapluat.vn/cao-bang-ngay-hoi-bien-phong-toan-dan-nam-2026-tai-xa-tra-linh.html | prasa | 2026† |
| MOTO-2026-10-15o | Ministerstwo Przemysłu i Handlu: plan ogólny strefy ekonomicznej przy przejściach granicznych Cao Bằng, zatwierdzony decyzją premiera 295/QĐ-TTg: część albo całość 31 gmin i 3 miasteczek przy granicy, od gminy Cần Nông do Đức Long, ok. 30 130 ha, 4 strefy (centra: Sóc Giang, Trà Lĩnh, Lý Vạn, Tà Lùng); wśród obszarów turystycznych „Khu du lịch gắn với di tích lịch sử Pác Bó và di tích Kim Đồng”, ok. 1137 ha w gminie Trường Hà, i obszar wodospadu Bản Giốc z jaskinią Ngườm Ngao, ok. 1000 ha; bez Thang Hen, Quốc Toản i Mắt Thần. | https://moit.gov.vn/tin-tuc/dia-phuong/phe-duyet-quy-hoach-chung-xay-dung-khu-kinh-te-cua-khau-tinh-cao-bang.html | urzędowe (ministerstwo) | 3.03.2022 |
| MOTO-2026-10-15p† | Tạp chí Công Thương, „Phê duyệt Quy hoạch chung xây dựng Khu kinh tế cửa khẩu tỉnh Cao Bằng”: plan obejmuje strefę w granicach z decyzji premiera 20/2014/QĐ-TTg z 11.03.2014 o jej utworzeniu (wyniki wyszukiwania; nie otwierałem; tekst decyzji tylko w PDF). | https://tapchicongthuong.vn/phe-duyet-quy-hoach-chung-xay-dung-khu-kinh-te-cua-khau-tinh-cao-bang-101727.htm | prasa | brak† |
| MOTO-2026-10-15q† | Luật Dương Gia, „Danh sách 56 xã, phường của Cao Bằng (mới) sau sáp nhập”: nowa gmina Trà Lĩnh z miasteczka Trà Lĩnh i gmin Cao Chương i Quốc Toản; przewodniki w tych samych wynikach podają Thang Hen i Núi Mắt Thần w gminie Quốc Toản (wyniki wyszukiwania; nie otwierałem). | https://luatduonggia.vn/ban-can-biet/danh-sach-56-xa-phuong-cua-cao-bang-moi-sau-sap-nhap/ | komercyjne (kancelaria) | brak† |
| MOTO-2026-10-15r | Vietnamtourism.com (wydawca nieustalony), „Cao Bang province geography and the China border guide”, ten sam adres co SP-VT, odczyt 15.10.2026: miasto Cao Bằng, Bản Giốc, Ngườm Ngao, Pác Bó, jezioro Thang Hen, Phia Oắc i główne drogi pętli dostępne bez zezwolenia; zgody wymagają niektóre ścieżki przy granicy, punkty widokowe przy Trà Lĩnh i podejście do znaków granicznych poza wyznaczonymi miejscami; kontrole paszportów i dokumentów pojazdu na drogach koło Tà Lùng i Trà Lĩnh; o Mắt Thần i Mã Phục w sprawie zezwoleń nic. | https://www.vietnamtourism.com/en/cao-bang-province-geography-and-the-china-border-guide | przewodnik komercyjny | aktualizacja 14.09.2026 |
| MOTO-2026-10-15s | Báo Luật sư, omówienie dekretu 299/2025/NĐ-CP, ten sam adres co SP-LSVN, odczyt 15.10.2026: art. 6 w nowym brzmieniu: cudzoziemiec mieszkający albo przebywający czasowo w Wietnamie potrzebuje zezwolenia policji prowincji na wjazd do strefy, poza obszarami turystycznymi, usługowymi i strefami ekonomicznymi; paszport przy sobie; wietnamskie urzędy i organizacje wprowadzające cudzoziemców zawiadamiają dowództwo straży granicznej i policję prowincji co najmniej 24 godziny wcześniej; o przejeździe przez inne gminy strefy, o biurach podróży i o art. 7 nic. | https://lsvn.vn/quy-dinh-moi-lien-quan-den-viec-quan-ly-khu-vuc-bien-gioi-dat-lien-a166199.html | prasa | 27.11.2025 |
