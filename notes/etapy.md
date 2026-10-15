# Wietnam po swojemu: etapy

Plan prac na podstawie [wizja.md](wizja.md). To dokument żywy: po każdym etapie zaktualizuj status i następny krok. Szczegółowe plany wdrożenia trafiają do `notes/plans/`.

| Etap | Status |
|---|---|
| 0. Wizja | zrobione 9.10.2026 |
| 1. Fundament i silnik na 12 miejscach | zrobione 11.10.2026: 1A (silnik) 10.10.2026, 1B (strona) 11.10.2026; raport tras 1A: [notes/raport-tras-2026-10-09.md](raport-tras-2026-10-09.md) |
| 2. Interfejs | zrobione 12.10.2026: 2A (telefon, powody, pogoda, mapa) 11.10.2026, 2B (budżet, „Przed wyjazdem”, motocykl, przejazdy z lotnisk) 12.10.2026 |
| 3. Nowe miejsca, partiami | partia A zrobiona 14.10.2026: plan 1 (Phong Nha, Cúc Phương, Đà Nẵng) 13.10.2026, raport tras: [notes/raport-tras-2026-10-13.md](raport-tras-2026-10-13.md); plan 2 (Hà Giang, Sa Pa) 14.10.2026, raport tras: [notes/raport-tras-2026-10-13-3a2.md](raport-tras-2026-10-13-3a2.md); partia B zrobiona 15.10.2026: plan B1 (Yok Đôn, Mù Cang Chải, Tà Năng w Đà Lạt, Mỹ Sơn w Hội An) zrobiony 15.10.2026: [plans/2026-10-14-etap-3b1-miejsca.md](plans/2026-10-14-etap-3b1-miejsca.md), raport tras: [notes/raport-tras-2026-10-14.md](raport-tras-2026-10-14.md); plan B2 (treść dla podróżnych z całego świata: skróty, dongi, przesiew researchu; sesja decyzji 15.10.2026) zrobiony 15.10.2026: [plans/2026-10-15-etap-3b2-tresc.md](plans/2026-10-15-etap-3b2-tresc.md) |
| 4. Audyt i publikacja (po partii A) | zrobione 14.10.2026: [plans/2026-10-14-etap-4-audyt-i-publikacja.md](plans/2026-10-14-etap-4-audyt-i-publikacja.md); strona pod https://grzegorzfrskiba-hub.github.io/wietnam/, na razie bez wyszukiwarek |
| 5. Angielski | w toku: sesja decyzji 15.10.2026 zrobiona (nazwa „Route G”, angielski domyślny z przełącznikiem EN · PL na tym samym adresie, `noindex` do samego końca); następny krok: plan z suchą próbą |

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

Plan 2B ([plans/2026-10-12-etap-2b-budzet.md](plans/2026-10-12-etap-2b-budzet.md), zrobiony 12.10.2026):
- budżet na osobę w złotych jako szósta liczba trasy, a w nowej sekcji „Przed wyjazdem” z podziałem, kwotą w pojedynkę i największymi pozycjami; ceny w `costs.js` z researchu z 11–12.10.2026, sprawdzane testem z tabelami researchu;
- „Przed wyjazdem”: rezerwacje od najpilniejszej z linkami (`before.js`), wjazd i zdrowie, lista rzeczy do spakowania z klimatu, dni i wydarzeń;
- zamiana „Z kierowcą / Samodzielnie” na motocyklu w Cao Bằng i na przełęczy Hải Vân, z warunkiem prawnym, wymaganiami i ryzykiem;
- własne teksty dalekich dróg z lotnisk i uwagi o promie na Cát Bà i do Cát Tiên;
- poprawki z przeglądu 2A, treść poprawiona po researchu i punkt kontrolny etapu 2.

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

- **Partia A, najważniejsza dla przygodowych,** w dwóch planach (sesja decyzji 13.10.2026):
  - plan 1 ([plans/2026-10-13-etap-3a1-miejsca.md](plans/2026-10-13-etap-3a1-miejsca.md), zrobiony 13.10.2026):
    - Phong Nha: łatwe jaskinie, 7 km w Paradise Cave i Tú Làn na jeden dzień, a na „Ekstremalnie” Hang Én na dwa dni;
    - Cúc Phương: naczelne, żółwie i stary las, nocleg w parku (Vân Long zostaje w Ninh Bình);
    - Đà Nẵng z Sơn Trà: duki czerwononogie z dróg półwyspu, plaża Mỹ Khê, Marmurowe Góry;
  - plan 2 ([plans/2026-10-13-etap-3a2-miejsca.md](plans/2026-10-13-etap-3a2-miejsca.md), zrobiony 14.10.2026): Hà Giang z pętlą na 3 albo 4 dni, z kierowcą albo samodzielnie, i Sa Pa z Fansipanem pieszo na dwa dni; w silniku reguła regionu lotniska, która usuwa zygzaki, a na mapie rozsuwane znaczniki.
- **Partia B** (sesja decyzji 14.10.2026), w dwóch planach:
  - plan B1 ([plans/2026-10-14-etap-3b1-miejsca.md](plans/2026-10-14-etap-3b1-miejsca.md), zrobiony 15.10.2026): Yok Đôn z lotniskiem Buôn Ma Thuột, Mù Cang Chải za Sa Pa, szlak Tà Năng–Phan Dũng jako trudna wersja dni 2 i 3 w Đà Lạt i Mỹ Sơn jako trzeci dzień Hội An; drobne uwagi z przeglądu etapu 4;
  - plan B2 ([plans/2026-10-15-etap-3b2-tresc.md](plans/2026-10-15-etap-3b2-tresc.md), zrobiony 15.10.2026; sesja decyzji 15.10.2026, niżej): treść dla podróżnych z całego świata, czyli skrócone „Przed wyjazdem”, ogólne zasady motocykla, dongi zamiast złotówek, skrócone najdłuższe opisy dni i przesiew otwartych punktów researchu;
  - odłożone, z researchem w repo: Bạch Mã (droga na szczyt przerwana od 27.10.2025, [research/bachma-2026-10.md](../research/bachma-2026-10.md)) i Pù Mát (noc w lesie niepotwierdzona na 2026, [research/pumat-2026-10.md](../research/pumat-2026-10.md)).
- **Kolejne partie** według potrzeb, np. morze (Côn Đảo).

## Etap 4: audyt i publikacja (po partii A)

- audyt jak 9.10 w pierwowzorze: kombinacje, treść, linki, telefon;
- przegląd [wizja.md](wizja.md) z tym, co jest na stronie: „Kryteria sukcesu”, „Jak działa strona”, „Poza zakresem” i decyzje (budżet, „Przed wyjazdem”, przełącznik motocykla doszły po 9.10.2026). Rozbieżności poprawić w wizji, z datą aktualizacji. Osobnego PRD nie ma i nie piszemy go: jego rolę pełni wizja;
- wersja offline: PDF z wydruku i lekki plik offline, z decyzją o formacie;
- przełączenie repo `wietnam` na publiczne, README z „©”, GitHub Pages pod https://grzegorzfrskiba-hub.github.io/wietnam/;
- pierwsze linki dla znajomych.

Wysłanie na GitHuba i publikacja tylko za zgodą. Partia B i kolejne dochodzą później na żywej stronie, każda z pełnym testem.

Plan ([plans/2026-10-14-etap-4-audyt-i-publikacja.md](plans/2026-10-14-etap-4-audyt-i-publikacja.md), sesja decyzji 14.10.2026, zrobiony 14.10.2026): poprawki z listy audytu, PDF jako wersja offline dla podróżnych (przycisk i wydruk na A4), kroje na własnym hostingu i lżejszy plik offline, licencje zdjęć i stopka, fakty z 14.10.2026 i porządki w researchu, wizja i README; potem punkt kontrolny, końcowy przegląd, publikacja z `docs/` z `noindex` (każdy krok za zgodą) i pierwsza runda znajomych.

## Etap 5: angielski (po partii B)

Decyzja z 14.10.2026: większość pierwszych testerów mówi po angielsku, więc po partii B strona dostaje angielski jako język przewodni, a polski zostaje drugim. Mechanizm kluczy tekstów i test kompletności już są (wizja, pkt 2). Zakres etapu (teksty miejsc, przełącznik języka, adres, `noindex`) ustali jego sesja decyzji. Decyzja z 15.10.2026: etap 5 przychodzi po planie B2 i tłumaczy już skróconą treść, a polski zostaje tłumaczeniem angielskiego, z tymi samymi faktami; sesja decyzji etapu ustali też nazwę strony. Sesja decyzji (15.10.2026): nazwa „Route G”, jeden adres z przełącznikiem EN · PL i angielskim domyślnym, `&lang=pl` w linku przy polskim, adres bez zmian, `noindex` do samego końca, tłumaczenie wszystkiego, co widzi czytelnik; decyzje i 31 ustaleń w „Z sesji decyzji etapu 5” niżej.

## Następny krok: plan etapu 5 (angielski)

Sesja decyzji etapu 5 zrobiona 15.10.2026 (niżej). Następny krok: plan etapu 5 z suchą próbą, jak B1 i B2, w osobnej sesji; wykonanie w świeżej sesji (ustalenie 28). Sesja planu tłumaczy w suchej próbie skróconą treść i przed oddaniem planu pokazuje arkusz PL | EN (ustalenie 29). Plan wprowadza nazwę „Route G”, angielski domyślny z przełącznikiem EN · PL na tym samym adresie i `&lang=pl` w linku przy polskim; `noindex` zostaje do samego końca.

### Z sesji decyzji etapu 5 (15.10.2026)

Sesja ustaliła nazwę, adres, przełącznik języka, `noindex`, zakres tłumaczenia, sposób sprawdzania i testy dwóch języków (ustalenie 25 z sesji decyzji planu B2), a przy okazji zdanie pod przełącznikiem motocykla (umowa ASEAN z listy „Po publikacji”) i drobne uwagi z przeglądów B2 i B1, które dotyczą tłumaczonych tekstów. W tle działały agenty: umowa ASEAN o prawach jazdy (tylko strony HTML; wynik w [research/motocykl-2026-10.md](../research/motocykl-2026-10.md), „Umowa ASEAN o prawach jazdy (15.10.2026)”) i dwa sprawdzenia kolizji nazw (wyszukiwarka, sklepy z aplikacjami, znaki towarowe z wyników wyszukiwania, strony pod adresami .com i .vn). Do przetłumaczenia jest ok. 1030 tekstów, razem ok. 12 000 słów: interfejs ok. 3000, teksty miejsc ok. 8000, podpisy zdjęć ok. 660.

Decyzje (osiem; język i kierunek nazwy to wybory użytkownika, reszta według rekomendacji):
1. Język: jeden adres i mały przełącznik EN · PL w prawym górnym rogu, domyślnie angielski. Wybór użytkownika; rekomendacja była: dwa adresy, angielski pod `/wietnam/` i polski pod `/wietnam/pl/`, z podglądem linku w języku adresu. Skutki: podgląd linku w WhatsAppie jest zawsze po angielsku (WhatsApp czyta plik HTML bez skryptów), a wyszukiwarki zobaczą tylko wersję angielską; osobny adres `/pl/` można dodać później bez psucia linków.
2. Język w linku: wybór polskiego dopisuje `&lang=pl` do adresu, więc link z paska, plan na WhatsApp i link w PDF otwierają u odbiorcy polską wersję; link bez `lang=`, także każdy, który już krąży, otwiera się po angielsku. Bez pamięci w przeglądarce i bez języka przeglądarki.
3. Nazwa: „Route G”, jedna dla obu wersji, z podpisem „Vietnam, up to you” po angielsku i „Wietnam po swojemu” po polsku. Kierunek użytkownika: pierwsi kandydaci (m.in. rekomendowane „Vietnam on Your Terms”) byli zbyt generyczni, z drugiej rundy rekomendacja była „Tùy Bạn” („jak chcesz” po wietnamsku), a użytkownik zaproponował nazwę w stylu „G-Routes”; z nazw z G rekomendacja „Route G”, jedyna bez kolizji. Sprawdzone 15.10.2026: nazwy z „your way” to hasło państwowej aplikacji „Visit Vietnam: Travel your way” z planerem tras AI i aplikacji JoyTime, a vietnamyourway.com jest zajęta; „Đi Đâu?” to planer podróży didau.vn; „Phượt” mają serwisy i firma, a w prasie „phượt thủ” kojarzy się z brawurą; „G-Routes” czyta się jak usługa Google (Routes API w Google Maps Platform), a w bazie znaków towarowych jest „G GRAND ROUTES” na usługi biur podróży; routeg.com jest wystawiona na sprzedaż.
4. Adres: zostaje https://grzegorzfrskiba-hub.github.io/wietnam/ (repo `wietnam`). Według dokumentacji GitHuba po zmianie nazwy repo stary adres strony nie przekierowuje. Własna domena przy otwarciu dla wyszukiwarek.
5. `noindex` zostaje także po etapie 5: otwarcie dla wyszukiwarek na sam koniec, po opiniach znajomych i wszystkich poprawkach (według rekomendacji; „na sam koniec” to doprecyzowanie użytkownika).
6. Zakres: tłumaczymy wszystko, co widzi czytelnik (interfejs, teksty miejsc, podpisy zdjęć, święta, nazwy linków, plan na WhatsApp, PDF, podgląd linku, zdanie bez JavaScriptu, plik offline) oraz README; notatki, research, plany i CLAUDE.md zostają po polsku, a identyfikatory w linku (`od`, `do`, `miesiac`, `co=gory`…) bez zmian, żeby stare linki działały.
7. Sprawdzanie: testy (ustalenia 13–19), arkusz PL | EN w sesji planu do przejrzenia wyrywkowo, przy wykonaniu świeży recenzent na najmocniejszym modelu, który czyta każdy angielski tekst obok polskiego (fakty, zdania o bezpieczeństwie, naturalny angielski), a po publikacji opinie anglojęzycznych testerów.
8. Motocykl: zasada pod przełącznikiem zostaje, a na końcu dochodzi wyjątek z umów, po polsku „Wyjątki z umów: prawo jazdy z państwa ASEAN i międzynarodowe prawo jazdy z Korei Płd., choć policja przy kontroli może ich nie uznać od ręki.”, po angielsku “Exceptions by agreement: a licence from an ASEAN country and a South Korean permit, though police at a check may not accept them straight away.” (całe zdanie w obu językach: research motocykla, „Co powiedzieć na stronie”). Research z 15.10.2026: Wietnam przystąpił do umowy ASEAN z 1985 r. 22.01.1997, ustawa uznaje takie prawa jazdy bez międzynarodowego, a prawnik w Tuổi Trẻ News (3.06.2026) potwierdza jazdę przy krótkim pobycie; w jedynej znalezionej relacji z kontroli (Nha Trang, 13.05.2026) policja zabrała na posterunek kierowcę z indonezyjskim prawem jazdy bez międzynarodowego; od 23.07.2023 Wietnam uznaje koreańskie międzynarodowe prawo jazdy, choć jest wydane według konwencji z 1949 r., więc dzisiejsze zdanie „wzór z 1949 r. w Wietnamie nie działa” jest dla Koreańczyków nieprawdziwe.

Ustalenia (31, przyjęte w jednym kroku):
- Przełącznik i link:
  1. „EN · PL” w prawym górnym rogu zdjęcia na górze strony, na telefonie wygodny do stuknięcia (co najmniej 44 px); przewija się razem ze stroną, aktywny język wyróżniony, w druku ukryty;
  2. przełączenie od razu zmienia teksty, bez przeładowania; trasa, ustawienia i zmiany „Dodaj/Usuń” zostają, a adres dostaje albo traci `&lang=pl` na końcu;
  3. `lang=` z inną wartością albo bez wartości: strona po angielsku, bez ostrzeżenia o błędnym linku (język to nie ustawienie trasy);
  4. plik HTML ma `lang="en"`, a podgląd linku jest po angielsku („Route G · Vietnam, up to you”, opis, `og:locale` en_GB); zdanie dla przeglądarki bez JavaScriptu w obu językach, jedno pod drugim;
  5. plik offline jeden, z przełącznikiem, pod nazwą `Route-G.html`.
- Nazwa:
  6. „Route G” w nagłówku, tytule karty, planie na WhatsApp („Route G: 14 days, March 2027”), w PDF i w stopce („© 2026 Route G. All rights reserved.” / „© 2026 Route G. Wszelkie prawa zastrzeżone.”); pod nazwą podpis „Vietnam, up to you” / „Wietnam po swojemu”; nadtytuł „Vietnam trip planner” / „Planer podróży po Wietnamie”;
  7. repo zostaje `wietnam`; README po angielsku z akapitem po polsku; opis repo na GitHubie po angielsku przy publikacji, za zgodą.
- Kod i dane:
  8. angielskie teksty jako nakładka o tej samej budowie co polskie: `UI.en` z tymi samymi kluczami co `UI.pl`, teksty miejsc w osobnych plikach (po jednym na miejsce, tylko pola tekstowe), podpisy zdjęć, nazwy świąt, nazwy linków rezerwacji i teksty z `build.py`; polskie teksty zostają, gdzie są, więc testy polskiego stylu działają jak dziś;
  9. zapis zależny od języka: liczba mnoga (1 night, 2 nights), „in March”, daty w pasku dni „Thu 28 Jan”, godziny jak dziś (6:00, 13:30), kropka dziesiętna i przecinek tysięcy, „cc” zamiast „cm³”; nazwy wietnamskie i wielowyrazowe nierozdzielne w obu językach, jednoliterowe wyrazy wiązane tylko po polsku;
  10. kwoty po angielsku: „17–39M VND”, „0.8–1.5M VND”, „260,000 VND”, „up to 2.2M VND”; pomiar z sesji: „57–114 million VND” nie mieści się w kafelku przy 901 i 1400 px (216 px na 197 px), a „57–114M VND” mieści się przy 360, 390, 641, 768, 901 i 1400 px;
  11. angielski brytyjski (colour, travellers, centre), jak w planerze grudniowym i w komentarzach kodu; typograficzne cudzysłowy i apostrof (“ ” ’);
  12. słowniczek (sucha próba może go doszlifować): poziomy Relaxed / Active / Extreme; zainteresowania Culture & history, Food, Wildlife, Mountains & caves, Sea & islands; motocykl With a driver / Ride yourself; sekcje Your trip, At a glance, Day by day, Before you go, Good to know; Picked because… / Not on your route because…, Add / Remove; Copy plan for WhatsApp, Save route as PDF; homestay (po polsku dalej „u gospodarzy”); sezon good / fair / poor; na mapie South China Sea i Gulf of Tonkin, jak polskie nazwy.
- Testy dwóch języków:
  13. kompletność: `UI.en` ma dokładnie klucze `UI.pl`, każdy tekst ma wersję angielską, a nakładka nie ma pól spoza tekstów;
  14. te same fakty: w każdej parze tekstów te same liczby (po sprowadzeniu zapisu: rzymskie miesiące i wieki, nazwy miesięcy, separatory) i te same wietnamskie nazwy; wyjątki na liście w teście, każdy z powodem;
  15. styl angielski: bez polskich liter i polskich cudzysłowów, bez amerykańskiej pisowni z krótkiej listy (color, center, traveler…), zakresy z półpauzą;
  16. `for every passport` w obu językach, z uwagą z przeglądu B2: łapie też „euro”, „dolar” i „złotówk”, a po angielsku „dollar”, „zloty”, „Poland” i „Polish”;
  17. długość opisu dnia: po polsku dalej najwyżej 70 słów, po angielsku limit z pomiaru w suchej próbie, żeby teksty nie urosły (przykład Mỹ Sơn: 63 → 80 słów, ok. +25%);
  18. sondy w Chrome bez okna w obu językach i nowa sonda języka: przełącznik zachowuje trasę i dopisuje albo zdejmuje `&lang=pl`, plan na WhatsApp i link w PDF niosą język, stary link bez `lang=` otwiera tę samą trasę po angielsku; kwota w kafelku przy 641, 768 i 901 px; wydruk trzech tras w obu językach;
  19. silnik bez zmian: pełny test `ALL PASS`, liczby z `tools/liczby.sh` takie same przed i po.
- Uwagi z przeglądów (poprawka w obu językach):
  20. zdanie o ryzyku: szacunek WHO (ok. 17 000 zabitych rocznie) i dane krajowe (ponad 90% zabitych w 2023 r. w wypadkach z udziałem motocykla) jako dwa osobne fakty, bez „z nich” (WHO-GHO, MOTO-2026-10-15j w researchu motocykla);
  21. `b.dalat.tanang`: bez dwóch liczb obok siebie („3–4 tygodnie wcześniej na Tết i 30.04”);
  22. etykieta `know.links` przez `esc()`, jak każdy tekst; stary komentarz „entry and health” w `site2/src/template.html` poprawiony, bo plik i tak się zmienia;
  23. pozwolenia w Cát Tiên i przy Lang Biang: według researchu treść jest dobra (w Cát Tiên poza biletem i opłatą za Bàu Sấu, z pokojem z recepcji parku, pozwolenia nie ma; przy Lang Biang liczą się przewodnik i otwarty szlak), więc bez zmian, a uwaga schodzi z listy;
  24. z listy uwag B1, bo te teksty i tak tłumaczymy: plan na deszcz dnia 2 w Yok Đôn bez „zamiast lasu” i z „700 m”, plan na deszcz dnia 2 w Mù Cang Chải bez „zamiast wędrówki” (oba pasują wtedy też do wersji „Spokojnie”), w zimnej porze w Mù Cang Chải „w XII–I kwitnie tớ dày”, jak w researchu.
- Research i notatki:
  25. research motocykla: wiersz „Korea Płd.” w tabeli i wniosek poprawione, nowe brzmienie zdania w „Co powiedzieć na stronie” (PL i EN); commit researchu razem z notatkami;
  26. wizja (pkt 2, 5, 8, 9, „Dla kogo”, „Jak działa strona”, „Treść”, „Otwarte drzwi”, „Technika”, „Na później”) i CLAUDE.md (tytuł, status, zasada języka) zaktualizowane;
  27. lista „Po publikacji”: punkt o umowie ASEAN schodzi, uwagi z ustaleń 20–24 przechodzą do etapu 5, a otwarcie dla wyszukiwarek idzie na sam koniec, razem z decyzją o domenie (routeg.com wystawiona na sprzedaż 15.10.2026), odświeżeniem cen i ewentualnym osobnym adresem `/pl/`.
- Proces:
  28. jeden plan z suchą próbą (jak B1 i B2), wykonanie w świeżej sesji; na końcu jak wcześniej: punkt kontrolny, końcowy przegląd na najmocniejszym modelu (tłumaczenie i kod), publikacja za zgodą, notatki;
  29. arkusz PL | EN powstaje w sesji planu z suchej próby i idzie do przejrzenia przed oddaniem planu;
  30. polskie teksty bez zmian treści poza ustaleniami 20–24 i nazwą; jeśli tłumaczenie odkryje niejasność po polsku, poprawka w obu językach z notką w planie;
  31. commit notatek teraz (notatki, wizja, CLAUDE.md, research motocykla), `git push` razem z planem etapu 5, za zgodą.

### Z planu B2 partii B

Zrobione 15.10.2026: plan B2 partii B ([plans/2026-10-15-etap-3b2-tresc.md](plans/2026-10-15-etap-3b2-tresc.md)), a z nim cała partia B. Strona jest dla samodzielnych podróżnych z całego świata: ramka motocykla podaje prawo jazdy na motocykl i międzynarodowe prawo jazdy według konwencji z 1968 r., ze zdaniem, żeby sprawdzić konwencję swojego kraju, i ryzyko bez porównań z Polską; „Warto wiedzieć” zamiast „Wjazd i zdrowie” ma dwa zdania (wiza według paszportu, e-wiza i karta przylotu tylko na stronach rządowych; e-papierosy) i dwa linki rządowe; rezerwacje mówią, co, kiedy, ile i gdzie; pakowanie wynika tylko z trasy; 25 z 28 najdłuższych opisów dni skrócono do ok. 60 słów (opisy dni razem 5529 → 4874 słów, najdłuższy 66); kwoty są w dongach po kursie researchu (najszersza 57–114 mln VND); z przesiewu researchu doszły fakty: auto na Sơn Trà od 24 EUR, 7 km w Paradise Cave w porze deszczowej zawraca po ok. 4 km, strumienie na szlaku Tà Năng wzbierają nagle, Pác Bó bez zezwolenia, podpis zdjęcia `mucangchai_2`. Testy pilnują długości opisów dni (najwyżej 70 słów) i tekstów dla każdego paszportu. Trasy i silnik bez zmian: liczby z `tools/liczby.sh` są takie same jak przed planem.

Punkt kontrolny planu B2 (15.10.2026): pełny test `ALL PASS` (134 784 ustawienia miesięcy i 10 368 dat, ok. 2¼ min); sondy: 0 z 19 nie przeszło dla miesiąca za pięć miesięcy i dla lipca 2027; linki 62 z 66 z kodem 200 (Sapa O'Chau 406; Sapa Sisters, Hoi An Day Trip i Full Moon Travel Asia 403 za filtrem antybotowym; strona Full Moon Travel Asia, która w suchej próbie dawała 403 także w przeglądarce, otwiera się w niej normalnie, więc link zostaje); licencje: 97 zdjęć bez problemów; liczby ze wszystkich 134 784 tras identyczne przed planem i po nim; słowa na stronie i strony PDF trzech tras jak w suchej próbie: d1 4745 → 4433 słów i 15 → 14 stron A4, d2 5067 → 4821 i 14 → 13, d3 6224 → 5878 i 21 → 20, w obu motywach, bez zakrytych linii, a „Przed wyjazdem” krótsze o 21–28%; arkusz skrótów: 83 zmienione teksty, opisy dni razem 5529 → 4874 słów, najdłuższy 66; najszersza kwota 57–114 mln VND mieści się w kafelku przy 641, 768 i 901 px. Użytkownik obejrzał arkusz skrótów i kawałki zrzutów (ramka motocykla w Hà Giang, „Przed wyjazdem”, kafelek kwoty). Nazwy `maps` sprawdzone ręcznie w Mapach Google: Yok Đôn prowadzi do siedziby parku (ok. 40 m od pinezki z researchu), a pod nazwą „Mu Cang Chai, Lao Cai, Vietnam” Mapy pokazują całą gminę Mù Cang Chải i kończą trasę ok. 2 km za miasteczkiem, więc według rekomendacji link „Trasa w Mapach Google” prowadzi teraz do targu Chợ Mù Cang Chải w środku miasteczka (poprawka z punktu kontrolnego, z testem danych: pole `maps` miejsca jak w wierszu „maps” jego notatki researchu).

Końcowy przegląd planu B2 (15.10.2026, świeży recenzent): „Gotowe do publikacji: po poprawkach”, bez uwag krytycznych. Recenzent sam powtórzył pełny test i sondy, policzył od nowa arkusz skrótów, sprawdził kwoty na 12 096 trasach, tekst wydruków i całe repo pod kątem danych osobowych; potwierdził, że zdania o bezpieczeństwie przetrwały skróty, a nowe fakty mają pokrycie w researchu. Znalazł dwie ważne sprawy. Pozycje, które mogą nic nie kosztować (lot paralotnią nad Khau Phạ, zjazd kolejką z Fansipanu), pisały dolny koniec zaokrąglony w górę do ceny („0,1–2,2 mln VND” w 5640 liniach rezerwacji i 4376 listach „Najwięcej kosztują”, „10 000–840 000 VND” na 129 trasach); według wyboru użytkownika podają teraz sam górny koniec, „do 2,2 mln VND” i „do 840 000 VND” (poprawka z końcowego przeglądu, z testem `vndText` i sondą `before.js`). Zdanie pod przełącznikiem motocykla („tylko z … międzynarodowym prawem jazdy według konwencji z 1968 r.”) może być za ostre dla obywateli państw ASEAN, bo ustawa uznaje też prawa jazdy z umów międzynarodowych; to błąd po bezpiecznej stronie, więc według rekomendacji poszło na listę „Po publikacji”, razem z drobnymi uwagami recenzenta.

Publikacja (15.10.2026): za zgodą użytkownika strona po planie B2 poszła na GitHub Pages (https://grzegorzfrskiba-hub.github.io/wietnam/, dalej z `noindex`); na żywo są „Warto wiedzieć”, kwoty w dongach i „do 2,2 mln VND” przy locie paralotnią. Drugi rzut oka na komunikaty tego dnia (tylko strony HTML): e-wiza i karta przylotu dalej tylko na stronach rządowych, dekret 90/2026 o e-papierosach bez zmian, półwysep Sơn Trà otwarty (prasa zapowiada ulewy 20–22.10, a strona każe dzień wcześniej sprawdzić komunikat zarządu), szlak na Lang Biang dalej zawieszony, festiwal gryki od 25.10.2026 bez ogłoszonych zasad ruchu, paralotnia Mebayluon lata według cennika na 2026; strona bez zmian.

### Z planu B1 partii B

Zrobione 15.10.2026: plan B1 partii B ([plans/2026-10-14-etap-3b1-miejsca.md](plans/2026-10-14-etap-3b1-miejsca.md)). Na stronie są dwa nowe miejsca i dwa nowe dni: Yok Đôn (park suchego lasu na 1–2 noce, pieszo za słoniami bez jazdy z przewodnikiem parku, na „Ekstremalnie” noc w lesie przy Thác Phật, wyłączona w V–X) z lotniskiem Buôn Ma Thuột, w którego karcie przejazdu stoi, że lot z Đà Nẵng jest tylko we wtorki, czwartki i soboty; Mù Cang Chải za Sa Pa (tarasy Hmông na 2–3 noce u gospodarzy, sezon z wyjątkiem XI–III, bo tarasy stoją po żniwach, paralotnia nad Khau Phạ jako opcja); szlak Tà Năng–Phan Dũng jako trudna wersja dni 2 i 3 w Đà Lạt (od 3 nocy, z biurem i przewodnikiem, wyłączony w V–X); Mỹ Sơn jako dzień 3 w Hội An (Hội An na 1–3 noce). Do tego drobne uwagi z przeglądu etapu 4 (krótkie zdanie bez JavaScriptu na stronie, zdanie o mapie bez druku, `tools/publish.sh` z wyjściem testów) i `tools/liczby.sh` na liczby ze wszystkich tras.

Punkt kontrolny planu B1 (15.10.2026): pełny test `ALL PASS` (134 784 ustawienia miesięcy i 10 368 dat, ok. 2,5 min); sondy: 0 z 19 nie przeszło dla miesiąca za pięć miesięcy i dla lipca 2027; linki 66 z 67 z kodem 200 (Sapa O'Chau 406, w przeglądarce działa); licencje: 97 zdjęć bez problemów; wydruki trzech tras: 15, 13 i 21 stron A4 w obu motywach, bez zakrytych linii; liczby ze wszystkich tras jak w suchej próbie (w nawiasie przed planem): Yok Đôn na 19,6% tras (3,2% bez zainteresowań, 79,1% przy samej przyrodzie, tyle co inne parki z przyrodą 3), Mù Cang Chải na 5,9%, Hội An na 72,0% tras ze średnio 2,50 nocy (1,88; 3 noce w 51,7% pobytów), dzień z dwoma lotami 9,4% (10,3%), dzień z lotem 8 h i dłużej 11,0% (12,2%), zygzaki 2,0% (2,4%), najszersza kwota 8 600–17 200 zł mieści się w kafelku przy 641, 768 i 901 px; ręcznie w przeglądarce: podświetlanie znaczników Yok Đôn i Mù Cang Chải, powiększenie mapy z Escape, pasek u góry i „Na górę”. Użytkownik obejrzał arkusze zrzutów (Đà Lạt ze szlakiem Tà Năng, Yok Đôn z nocą w lesie, Hội An z Mỹ Sơn, Mù Cang Chải z mapą północy, uwaga o dniach lotu, kwota) i zostawił, według rekomendacji, trzecią noc w Hội An na trasach z samym morzem (69% pobytów; noce po trochu z Hà Nội, Ninh Bình, Phong Nha i Huế, miejsca nad morzem bez zmian) i Yok Đôn na trasach z przyrodą; prawdziwego telefonu tym razem nie sprawdzano. Punkt kontrolny nie dał poprawek; poprawki z końcowego przeglądu niżej.

Końcowy przegląd planu B1 (15.10.2026, świeży recenzent): „Gotowe do publikacji: po poprawkach”, bez uwag krytycznych. Recenzent potwierdził, że zdania o bezpieczeństwie, przewodnikach i cenach mają pokrycie w researchu, i sześć punktów „Na co uważać”, a znalazł trzy ważne sprawy, poprawione przed publikacją w osobnych commitach „Poprawka z końcowego przeglądu planu B1”: forma rodzajowa „Sam do lasu nie wejdziesz” w Yok Đôn (test stylu łapie teraz „Sam”, „Sama” na początku zdania); na trasach z Đà Nẵng w obie strony powrót do Hội An po pierwszej nocy powtarzał stare miasto o 6:00, a Mỹ Sơn nie było wcale (4683 trasy; plan solo Hội An ma `covers: 2`, więc powrót idzie dalej Mỹ Sơn, który jest teraz na 60 063 trasach zamiast 55 380); noc w lesie Yok Đôn przed 6 h drogi do Cát Tiên kończyła się na ostatnim promie przez Đồng Nai (55 tras; `legAfter` mówi teraz, że droga prowadzi do miejsca za promem, i późna noc wtedy ustępuje, więc noc w lesie jest na 4654 trasach zamiast 4709). Do tego plan na deszcz szlaku Tà Năng brzmi jak w researchu („przy złej prognozie przełóż wyjście”), a źródło LI-2026 w researchu Yok Đôn nie ma już linku do profilu osoby prywatnej. Trasy, liczby, raport tras i najszersza kwota bez zmian. Drobne uwagi i sprawy do sprawdzenia poszły na listę „Po publikacji, z partią B”.

### Z sesji decyzji planu B2 (15.10.2026)

Po planie B1 użytkownik uznał, że strona za bardzo prowadzi za rękę i ma polskie szczegóły: wizę dla Polaków, Odyseusza, międzynarodowe prawo jazdy ze starostwa, złotówki po kursie NBP. Znajomi są w większości z innych krajów, a strona ma dawać inspirację i trasę dopasowaną do profilu ludziom, którzy umieją się zorganizować. Plan B2 nie jest więc długim ogonem researchu z kursem NBP, tylko treścią dla podróżnych z całego świata.

Decyzje (sześć według rekomendacji, waluta to wybór użytkownika):
1. Zasada: zdanie zostaje, gdy zmienia trasę albo plan dnia w Wietnamie albo chroni przed czymś, czego doświadczony podróżny może nie wiedzieć, i jest prawdziwe dla każdego paszportu (wizja, „Treść, bezpieczeństwo, licencje”).
2. Waluta: same dongi, bez przeliczeń na inne waluty. Wybór użytkownika; rekomendacja była: dongi, a przy sumie wyjazdu orientacyjnie USD.
3. Polska wersja po etapie 5: ta sama treść co angielska, czyli tłumaczenie z tymi samymi faktami.
4. Kolejność: najpierw skróty po polsku (plan B2), potem etap 5. Skróty łatwiej ocenić po polsku, a etap 5 tłumaczy gotową treść.
5. „Przed wyjazdem”: cztery części, odchudzone: budżet; rezerwacje (co, kiedy, ile, link); „Warto wiedzieć” z dwoma zdaniami zamiast „Wjazd i zdrowie”; pakowanie tylko z trasy.
6. Opisy dni: 28 opisów z 60 słowami i więcej skrócić do ok. 60. Zostaje to, co w dniu wyjątkowe, i ograniczenia (godziny, przewodnik, sezon, pogoda), a wypadają wskazówki „jak” (ulice, godziny odbioru, kanały kontaktu). Krótsze opisy bez zmian. Przykład z sesji: dzień w Đà Nẵng ze 110 do 58 słów.
7. Research: ok. 100 otwartych punktów przesiać i sprawdzić tylko ważne (ustalenie 22).

Ustalenia (25, przyjęte w jednym kroku):
- Notatki:
  1. wizja, „Dla kogo”: pierwsi odbiorcy to znajomi z różnych krajów, docelowo samodzielni podróżni z całego świata; strona daje inspirację i trasę dopasowaną do profilu, a nie instrukcję organizacji wyjazdu;
  2. wizja, „Treść”: zasada z decyzji 1 dla każdego nowego zdania;
  3. wizja, „Poza zakresem”: porady zależne od obywatelstwa (wiza, prawo jazdy, ubezpieczenie, szczepienia, rejestracja podróży), ogólna wiedza podróżnicza i przeliczanie na waluty czytelników;
  4. wizja, język: po etapie 5 polski jest tłumaczeniem angielskiego, z tymi samymi faktami;
  5. research zostaje pełny: fakty, które wypadną ze strony, zostają w notatkach researchu z adnotacją;
  6. z listy „Po publikacji” wypada punkt o poradzie MSZ dla motocyklistów, bo to porada zależna od obywatelstwa.
- Waluta:
  7. ceny w danych zostają w euro; na dongi przelicza je ten sam kurs, po którym research przeliczał ceny ze źródeł (1 EUR = 29 055 VND, `research/ceny-2026-10.md`), więc kwoty wracają do cen ze źródeł; na stronie kursu nie ma;
  8. zapis: suma w pełnych milionach („17–39 mln VND”), pozycje od 1 mln z jednym miejscem po przecinku („0,8–1,5 mln VND”), mniejsze zaokrąglone do 10 000 („260 000 VND”); pod budżetem tylko „Ceny sprawdzone w {miesiąc} {rok}”;
  9. kwoty w tekstach też w dongach: pozwolenie w Hà Giang „ok. 230 000–300 000 VND” zamiast „10 USD” (obie kwoty są w researchu);
  10. sonda kafelka sprawdza nową najszerszą kwotę (ok. „57–114 mln VND”).
- „Przed wyjazdem”:
  11. „Wjazd i zdrowie” zmienia się w „Warto wiedzieć” z dwoma zdaniami: wiza (sprawdź, czy twój paszport jej wymaga; e-wizę i kartę przylotu załatwiaj tylko na stronach rządowych, oba linki) oraz e-papierosy i podgrzewany tytoń nielegalne; wypadają zwolnienie z wiz dla Polaków z ostrzeżeniem o jego końcu, paszport, ubezpieczenie, lekarz i trzy polskie linki;
  12. rezerwacje: co, z jakim wyprzedzeniem (i w szczycie), kwota i linki; z dodatków zostają tylko te, które chronią albo zmieniają plan: licencja biura przy Fansipanie, szlaku Tà Năng i pętli Hà Giang oraz zapasowy dzień przy paralotni; wypadają kanały kontaktu, liczba pokoi i miejsc, dane o zdrowiu i „bilet kupisz w kasie”;
  13. pakowanie: zostają ciepła warstwa, deszcz, pijawki, czołówka, strój kąpielowy, rzeczy na motocykl (przy „Samodzielnie”) i środek na komary z dengą; wypadają buty, krem z filtrem, gotówka i aplikacje.
- Motocykl:
  14. wymagania: prawo jazdy na motocykl i międzynarodowe według konwencji z 1968 r.; samo prawo jazdy na samochód nie wystarcza; research sprawdzi, czy są kraje, które takiego dokumentu nie wydają (np. USA tylko według konwencji z 1949 r.), i jeśli tak, dochodzi zdanie „sprawdź, według której konwencji wydaje je twój kraj”; wypadają starostwo, 35 zł i polskie kategorie;
  15. ryzyko bez porównania z Polską; skutki prawne, mandat, zatrzymanie motocykla, polisa i kontrole zostają; zdanie o polisie tylko w ramce, bez powtórki w „Warto wiedzieć”;
  16. rady: zostają „paszportu nie zostawiaj w zastaw”, jazda tylko za dnia, żwir i ciężarówki na serpentynach; wypadają oględziny i zdjęcia rys; rady dla pętli bez zmian.
- Opisy dni:
  17. 28 opisów z 60 słowami i więcej skrócić do ok. 60 według decyzji 6; plany na deszcz i krótsze opisy bez zmian;
  18. drobne uwagi z końcowego przeglądu B1, które dotyczą skracanych tekstów, poprawić przy okazji (np. „8 kilometrów” obok „2 km”); reszta zostaje na liście.
- Testy:
  19. test stylu: w tekstach strony nie ma złotówek, NBP ani polskich urzędów (Odyseusz, starostwo, EKUZ, GIS, ambasada RP);
  20. test długości: opis dnia ma najwyżej 70 słów (cel ok. 60), żeby teksty nie urosły z powrotem;
  21. silnik bez zmian: trasy i liczby z `tools/liczby.sh` takie same przed i po; zmienia się tylko waluta kwoty.
- Research i ceny:
  22. przesiew otwartych punktów: do sprawdzenia zostają te, które po skróceniu dalej są na stronie i zmieniają trasę, dzień, bezpieczeństwo, cenę noclegu albo pozycję od ok. 20 EUR na osobę; reszta dostaje adnotację „poza stroną (decyzja z 15.10.2026)”; Bạch Mã i Pù Mát pomijamy, bo są odłożone;
  23. cen w planie B2 nie odświeżamy (sprawdzone 11–13.10.2026), poza punktami z przesiewu; następne odświeżenie przed otwarciem dla wyszukiwarek.
- Proces:
  24. plan B2 z suchą próbą, jak B1, wykonanie w świeżej sesji; na punkt kontrolny arkusz skrótów (każdy skrócony tekst przed i po, do przejrzenia po polsku) oraz liczba słów na stronie i liczba stron PDF trzech tras, przed i po;
  25. po B2 etap 5 (angielski) z własną sesją decyzji: nazwa strony, adres, przełącznik języka i `noindex`.

Notatki z tej sesji idą na GitHuba razem z planem B2.

### Z sesji decyzji partii B (14.10.2026)

Sesja decyzji partii B (14.10.2026): opinii pierwszej rundy jeszcze nie ma, a większość testerów będzie anglojęzyczna, więc po partii B przychodzi etap angielski (etap 5), a `noindex` zostaje do niego i do opinii. Partia B ma dwa plany: B1 z miejscami ([plans/2026-10-14-etap-3b1-miejsca.md](plans/2026-10-14-etap-3b1-miejsca.md): Yok Đôn, Mù Cang Chải, Tà Năng–Phan Dũng w Đà Lạt, Mỹ Sơn w Hội An, drobne uwagi etapu 4) i B2 z długim ogonem researchu, kursem NBP i cenami, w osobnej sesji. Bạch Mã i Pù Mát są odłożone; ich research jest w repo. Decyzje i 23 ustalenia stoją w planie B1. Wykonanie w świeżej sesji, z suchą próbą na gałęzi `sucha-proba-b1`.

### Z etapu 4

Zrobione 14.10.2026: etap 4 ([plans/2026-10-14-etap-4-audyt-i-publikacja.md](plans/2026-10-14-etap-4-audyt-i-publikacja.md)). Strona jest pod https://grzegorzfrskiba-hub.github.io/wietnam/, na razie z `noindex`, a repo jest publiczne, bez wolnej licencji. Przed publikacją:
- poprawki z listy audytu: wjazd w trybie miesiąca, droga przez lotnisko jako jedna droga, `esc()` w przełączniku, kurs NBP i adres strony w jednym miejscu, testy świąt i zdjęć;
- PDF jako wersja offline dla podróżnych: przycisk „Zapisz trasę jako PDF” i wydruk na A4 z mapą w trzech kadrach i linkiem do trasy;
- kroje na własnym hostingu (`site2/fonts/`), plik offline 6,4 MB;
- licencje 87 zdjęć sprawdzone w Wikimedia Commons (`tools/licenses.sh`), licencja w stopce prowadzi do swojego tekstu;
- fakty z 14.10.2026 w researchu i na stronie (e-wiza, karta przylotu, e-papierosy, festiwal gryki), porządki w researchu, `research/pierwowzor-2026-10.md`;
- wizja przejrzana z tym, co jest na stronie, README z „©”.

Punkt kontrolny etapu 4 (14.10.2026): pełny test (134 784 kombinacje miesięcy i 10 368 dat, 107 s), 16 sond dla dwóch miesięcy, linki (52 z 53 z kodem 200, a strona Sapa O'Chau z kodem 406 otwiera się w przeglądarce normalnie), licencje 87 zdjęć zgodne z Wikimedia Commons i wydruk trzech tras w obu motywach (12, 16 i 21 stron A4, przed etapem 4 na formacie Letter 13, 17 i 23; 0 zakrytych linii) przeszły; ręcznie w przeglądarce działają pasek u góry, „Na górę”, oba przyciski z podpowiedzią PDF, kroje bez zapytań do Google, podświetlanie na mapie i powiększenie mapy z Escape (kopie kadrów z `panelSvg`), a na prawdziwym telefonie (iPhone, Safari) PDF z przycisku „Zapisz trasę jako PDF” zapisuje się w Plikach i otwiera bez internetu, z linkiem do trasy i mapą w trzech kadrach; przycisk działa też na stronie otwartej z linku w czacie WhatsAppa. Liczby ze wszystkich 134 784 tras są takie jak po planie 2 partii A: Hà Giang na 28,0% tras, Sa Pa na 20,7%, dzień z dwoma lotami na 10,3%, zygzak na 2,4%, dzień z lotem 8 h i dłużej na 12,2%, droga przez lotnisko bez lotu Ninh Bình – Hà Giang na 7083 trasach (5,3%) i Mekong – Cát Tiên na 858 (0,6%). Obejrzane razem: karta jednej drogi Ninh Bình → Hà Giang, przyciski PDF z podpowiedzią, „Zarezerwuj wcześniej” bez „w obie strony”, „Wjazd i zdrowie” z trzema nowymi zdaniami i zdaniem o 14.08.2028, stopka z linkami licencji i Natural Earth, pierwsze strony PDF z linkiem i mapą w trzech kadrach. Nic nie wyszło inaczej niż w suchej próbie, więc bez poprawek.

Końcowy przegląd etapu 4 (14.10.2026, świeży recenzent): bez uwag krytycznych, z oceną „gotowe do publikacji”; recenzent sam powtórzył pełny test i sondy `publish.js` i `pdf.js`, przeszukał całą historię gita (adresy e-mail, ścieżki, numery lotów, linki, tokeny, imiona) i obejrzał strony wydruków z listą osadzonych krojów. Jedyna uwaga ważna: przycisk „Zapisz trasę jako PDF” w przeglądarce wbudowanej w komunikator może nic nie zrobić, a podpowiedź obiecuje okno drukowania; sprawdzone na telefonie z linku w czacie WhatsAppa, którym pójdą pierwsze linki: okno drukowania się otwiera, więc bez zmian. Nic nie poprawiano. Drobniejsze uwagi recenzenta są na liście „Po publikacji, z partią B” niżej; ścieżka folderu pierwowzoru na Macu (bez nazwy użytkownika) zostaje w CLAUDE.md i w dawnych planach.

Fakty z dnia publikacji (14.10.2026, po południu): półwysep Sơn Trà jest znowu otwarty od 14.10.2026 (research Đà Nẵng; strona bez zmian, bo każe dzień wcześniej sprawdzić komunikat zarządu), a zdanie o karcie przylotu liczy 3 dni przed przylotem, jak urząd imigracyjny, a nie przed lotem; Phong Nha, Cúc Phương, kolejka na Fansipan, MSZ (poziom 1), 45 dni bez wizy, karta przylotu, deklaracja zdrowotna, pozwolenie w Hà Giang i autostrada do Hà Giang bez zmian.

Publikacja (14.10.2026): repo jest publiczne, a strona działa pod https://grzegorzfrskiba-hub.github.io/wietnam/ (GitHub Pages z `docs/`, HTTPS wymuszony, `noindex`); strona, zdjęcia i kroje idą przez https, bez zapytań do Google, a na telefonie „Kopiuj plan na WhatsApp” kopiuje do schowka, link w WhatsAppie pokazuje podgląd ze zdjęciem z Tràng An, tytułem i opisem, a PDF z przycisku się zapisuje.

**Pierwsza runda:** 2–4 przygodowe osoby dostały sam adres strony i trzy pytania (decyzja 2 z 14.10.2026). Do sesji decyzji partii B (14.10.2026) opinii nie było; większość testerów będzie anglojęzyczna. Opinie zapisujemy tu bez imion i bez linków, punkt po punkcie, z decyzją, co z nimi zrobić. Każda nowa wersja strony: `bash tools/publish.sh`, commit `docs/` i `git push` za zgodą.

**Do etapu 3 (partia B i kolejne):**
- nowe teksty przechodzą test zdania z wizji (decyzja z 15.10.2026: prawdziwe dla każdego paszportu, bez ogólnej wiedzy podróżniczej); opis dnia ma ok. 60 słów, najwyżej 70 (test `day texts`), a kwoty w tekstach są w dongach (test `for every passport`); fakty, które wypadają ze strony, zostają w researchu z adnotacją;
- po etapie 5 każdy nowy tekst od razu w obu językach, z tymi samymi liczbami i nazwami (testy kompletności i tych samych faktów, ustalenia 13–14 z sesji etapu 5); nowe miejsce dostaje też angielski plik tekstów;
- każde nowe miejsce dostaje też dane z planu 2B: cenę noclegu w `COSTS.night`, płatne części dni jako pozycje `COSTS.items` wskazane polem `cost` w dniach, wpisy w `BOOK` z wyprzedzeniem i linkami, miejsce w `HOMESTAYS`, gdy nocuje się u gospodarzy, i teksty dalekich dróg z lotnisk w `AIR_KEYS`; liczby stoją w tabelach „Zestawienie” pliku researchu miejsca (`research/<id>-2026-10.md`), a test danych czyta je stamtąd (w wierszu `fit` zainteresowanie „gory” bez „ó”);
- najszersza kwota budżetu ma postać „dd–ddd mln VND” (najwyższa po planie B2: 57–114 mln VND, 30 dni z Đà Nẵng w obie strony, góry i morze, „Ekstremalnie”, kwiecień); cyfry kroju mają jedną szerokość, więc kafelek mieści każdą kwotę tej postaci, ale kwota z trzema cyframi na obu końcach byłaby szersza: po każdej partii sonda `before.js` przy 641, 768 i 901 px, która od planu B2 bierze właśnie tę trasę;
- nowe miejsca dostają trudne dni według zasad z [research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md) (dziś trudny dzień mają Cát Tiên, Pù Luông, Phong Nha, Cúc Phương, Sa Pa, Đà Lạt ze szlakiem Tà Năng–Phan Dũng i Yok Đôn); wyprawa na dwa dni to trudna wersja z polem `next` i własnym planem na deszcz (`hard.rain`);
- każde nowe miejsce dostaje numer koloru (`color` w treści) i musi leżeć w kadrze mapy (`site2/src/panels.js`). Paleta ma 20 kolorów i po planie B1 wszystkie są zajęte (Yok Đôn 18, Mù Cang Chải 20), więc przed kolejnym miejscem (Bạch Mã, Pù Mát) paletę trzeba rozszerzyć. Pù Mát leży poza kadrami: trzeba przesunąć kadr północy do 18,6° N (z lotniskiem Vinh) i wygenerować kontury od nowa (`geo/make_basemap.py`);
- wielowyrazowe nazwy z nowych tekstów bez wietnamskich liter (jak Lang Biang, Paradise Cave, La Dao) dopisać do `KEEP_TOGETHER` w `site2/src/content.js`; nazwy z takimi literami wiąże reguła `tieVietnamese`, a krótkie nazwy miejsc strona wiąże sama. Sonda `changes.js` łapie tylko nazwy z literą wietnamską, więc nazwy bez niej trzeba wypatrzyć samemu;
- przed dodaniem czwartego kadru: `site2/src/basemap.js` do testów (`SOURCES` w `tests/run.sh`) i test, że `BASEMAP` ma kontury każdego kadru z `MAP_PANELS`; bez nowych konturów strona by się wywróciła;
- powód „zamknięte w części tego terminu” (`whyOff`) zasłania „za daleko”, gdy miejsce z X w części terminu nie zmieściłoby się też z odległości; dziś żadne miejsce nie ma X, więc wrócić do tego przy pierwszych danych z X;
- drogi Sa Pa – Ba Bể (ok. 9 h) i Sa Pa – Pù Luông (ok. 9,75 h) to szacunki bez źródła i zostały poza danymi (silnik i tak ich nie używał); dopisać, gdy research znajdzie źródło (`research/sapa-2026-10.md`);
- reguła regionu lotniska (`REGION_H`, 6,5 h drogą od lotniska) zależy od tego, które miejsca leżą blisko lotnisk: po każdej partii policzyć zygzaki i powroty do domu w środku trasy skryptem `bash tools/liczby.sh` (liczby przed partią: z kopią źródeł z `git archive`);
- dni z lotem 8–10 h od drzwi do drzwi stoją na 11,0% tras (przed planem B1: 12,2%, przed planem 2 partii A: 3,6%), prawie wszystkie do albo z Sa Pa, Hà Giang i Mù Cang Chải (najczęściej Sa Pa → ✈ Hội An), z ostrzeżeniem „Długi dzień w drodze” (punkt kontrolny planu 2: zostają). Do zrobienia silnik, który po pętli północy wstawia noc w Hà Nội przed lotem: dziś układa trasę jednym przejazdem wzdłuż kraju, a limit 8 h dla dnia z lotem wyciąłby pętlę (Sa Pa z 20,7% do 11,5% tras, Hà Giang z 28,0% do 17,0%). Liczy je `bash tools/liczby.sh`, w obie strony;
- dzień w cudzym module (Mỹ Sơn w Hội An, Tà Năng–Phan Dũng w Đà Lạt) ma research we własnym pliku, a test danych czyta jego tabele z listy `DAY_NOTES` w `tests/data.test.js`; lot, który nie lata codziennie, dostaje wpis w `FLIGHT_DAYS` (`content.js`), a karta przejazdu mówi, w które dni lata;
- gdy w danych pojawi się lotnisko w regionie innego lotniska (np. Phú Quốc albo Cam Ranh z listy „Na później” w wizji), sprawdzić `zigzag()` w `site2/src/engine.js`: zabrania każdego lotu, który ląduje w regionie lotniska przylotu albo startuje w regionie lotniska wylotu, także lotu wewnątrz regionu (dziś takich lotów nie ma).

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

**Po publikacji (po partii B):**
- research po przesiewie z 15.10.2026 (plan B2): otwarte punkty mają wynik sprawdzenia albo adnotację „Poza stroną (decyzja z 15.10.2026)”. Zostają: Sa Pa (od III 2026 prowincja Lào Cai zakazuje sprzedaży wycieczek bez licencji, a Sapa O'Chau i Sapa Sisters nie podają jej numeru; `b.sapa.trek` bez dopisku o licencji, decyzja z 15.10.2026), paralotnia w Mù Cang Chải w 2027 (umowa Mebayluon z gminą Tú Lệ do końca 2026; sprawdzić na początku 2027), droga Hà Giang – Mù Cang Chải 7 h i wyjazd koło południa po nocy w lesie Yok Đôn (dalej szacunki);
- ceny: największe pozycje (rejs, auta, loty, Hang Én, Fansipan) i przedziały z przesiewu z 15.10.2026 (`mekong.market` na progu, trasa zastępcza Lang Biang dla osoby samej, dolna granica noclegu na Phú Quốc w porze suchej) odświeżyć przed otwarciem dla wyszukiwarek, w jednym miejscu (`costs.js` i research), a przy tym kurs 1 EUR = 29 055 VND (wiersz EUR-VND w `research/ceny-2026-10.md`);
- otwarcie dla wyszukiwarek: na sam koniec, po opiniach znajomych i wszystkich poprawkach (decyzja 5 z sesji etapu 5, 15.10.2026; wcześniej: do etapu angielskiego i do opinii pierwszej rundy), razem z decyzją o własnej domenie (routeg.com wystawiona na sprzedaż 15.10.2026), odświeżeniem cen i ewentualnym osobnym adresem `/pl/` dla polskiej wersji; wtedy `NOINDEX = False` w `site2/build.py`;
- PDF z iPhone'a: Safari ignoruje `break-after: avoid`, więc nagłówek bywa sam na dole strony; jeśli znajomi to zgłoszą, zgrupować nagłówek z pierwszym dniem;
- wydruk: ostatnia strona bywa prawie pusta (sama stopka);
- przed publikacją każdej partii drugi rzut oka na komunikaty, jak w zadaniu 11 etapu 4;
- uwagi drobne z końcowego przeglądu etapu 4:
  - PDF w przeglądarce wbudowanej w komunikator: z czatu WhatsAppa przycisk otwiera okno drukowania (sprawdzone na telefonie 14.10.2026), ale w innych komunikatorach (np. Messenger, Instagram) `window.print()` może nic nie zrobić; jeśli znajomi to zgłoszą, dopisać do podpowiedzi zdanie o otwarciu strony w Safari albo Chrome;
  - podzbiory krojów z Google Fonts nie mają strzałki →, znaku ≈ ani samolotu ✈, więc te znaki idą z kroju zastępczego, tak jak przed etapem 4: pełne pliki krojów albo bez zmian;
  - wydruk: na pierwszej stronie zostaje luka, bo nagłówek „Trasa” przechodzi razem z mapą na drugą stronę;
- uwagi drobne z końcowego przeglądu planu B1 (15.10.2026):
  - lot Đà Nẵng – Buôn Ma Thuột (`FLIGHT_DAYS`, dni w obie strony potwierdzone 15.10.2026 w researchu Yok Đôn): w trybie dat strona mogłaby powiedzieć, czy lot wypada we wtorek, czwartek albo sobotę; obok stoi „wybierz lot po południu”, a tekst „Kopiuj plan na WhatsApp” tej uwagi nie ma;
  - tớ dày w zimnej porze Mù Cang Chải, plany na deszcz z „zamiast” przy wersji „Spokojnie” (Yok Đôn i Mù Cang Chải, dzień 2) i „700 metrów” w Yok Đôn: poprawka w etapie 5, przy tłumaczeniu (ustalenie 24 z sesji etapu 5);
- uwagi z końcowego przeglądu planu B2 (15.10.2026):
  - umowa ASEAN (zdanie pod przełącznikiem motocykla), zdanie o ryzyku, słowa w teście `for every passport`, komentarz w `template.html`, `b.dalat.tanang` i `know.links`: rozstrzygnięte w sesji etapu 5 (15.10.2026), poprawka w etapie 5 (decyzja 8, ustalenia 16 i 20–22); pozwolenia w Cát Tiên i przy Lang Biang sprawdzone w researchu, bez zmian (ustalenie 23);
  - research wjazdu: słowo „bezpłatnie” przy karcie przylotu nie ma pokrycia w WJ-2026-10-14c i WJ-2026-10-14d (strona go nie używa); nowe źródła z 15.10.2026 do dopisania: dekret 292/2026/NĐ-CP (od 5.09.2026 e-papierosy i podgrzewany tytoń na liście towarów zakazanych w imporcie) i komunikat ambasady Wietnamu w Bangkoku z 18.06.2026 (karta przylotu na Tân Sơn Nhất nieobowiązkowa).

Drobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)

### Z planu 2 partii A (etap 3)

Zrobione 14.10.2026: plan 2 partii A ([plans/2026-10-13-etap-3a2-miejsca.md](plans/2026-10-13-etap-3a2-miejsca.md)), a z nim cała partia A. Na stronie są Hà Giang i Sa Pa, każde z treścią na trzech poziomach, sezonem, klimatem, drogami, cenami, rezerwacjami i pięcioma zdjęciami: Hà Giang z pętlą przez płaskowyż Đồng Văn na 3 albo 4 dni, przełącznikiem „Z kierowcą / Samodzielnie” z ramką o kontrolach od kwietnia 2026 i pozwoleniem na strefę przygraniczną; Sa Pa z doliną Mường Hoa, kolejką i Fansipanem pieszo na dwa dni, wyłączonym w V–IX. Silnik nie robi już zygzaków: trasa nie wraca samolotem w okolicę lotniska przylotu (6,5 h drogą), nie odlatuje z okolicy lotniska wylotu, żeby do niej wrócić, a trasa w obie strony po powrocie samolotem do domu już stamtąd nie odlatuje (`REGION_H`, obok `NEAR_H`). Na mapie znaczniki, które zachodzą na siebie, odsuwają się z kreską do prawdziwego punktu, wyprawa na dwa dni ma własny plan na deszcz (`hard.rain`), a Phong Nha ma drogi z lotnisk Đà Nẵng i Huế.

Punkt kontrolny planu 2 (14.10.2026): pełny test (134 784 kombinacje miesięcy i 10 368 dat; 208 s na obciążonym Macu, na którym test sprzed planu trwał 142 s zamiast ok. 75 s, czyli na wolnym Macu ok. 100–110 s), 14 sond dla dwóch miesięcy, linki (52 z 53 z kodem 200, a strona Sapa O'Chau z kodem 406 otwiera się w przeglądarce normalnie) i wydruk trzech tras w obu motywach (13, 17 i 23 strony, 0 zakrytych linii) przeszły; ręcznie w przeglądarce działają pasek u góry (trzy odnośniki w całości od 320 px), „Na górę”, podświetlanie na mapie (także Hà Giang i Sa Pa), powiększenie mapy z Escape i przełącznik Hà Giang z klawiatury, a na prawdziwym telefonie w domowej sieci Wi-Fi ramka „Samodzielnie” w Hà Giang z plakietkami dni pętli, dwa dni Fansipanu, link Sapa O'Chau w nowej karcie i „Kopiuj plan na WhatsApp” z linią budżetu. Powiększenia mapy na telefonie nie ma z założenia (działa od 901 px), więc zapis o nim w punkcie kontrolnym planu 1 był nieścisły. Liczby ze wszystkich 134 784 tras są takie jak w suchej próbie (w nawiasie po planie 1): Hà Giang na 28,0% tras (22,6% tras bez zainteresowań, średnio 4,77 nocy), Sa Pa na 20,7% (16,7%, 3,56 nocy), zygzaki na 2,4% tras (7,8%; reszta to w całości wypad na Phú Quốc między Hồ Chí Minh City a deltą Mekongu), powrót samolotem do domu w środku trasy w obie strony na 0 trasach (6423), dzień z dwoma lotami na 10,3% tras (12,4%), Cát Bà na 4 noce w 70,9% pobytów (73,7%), bliskie miejsca nie obok siebie na 0 trasach (0). Obejrzane razem: zrzuty sześciu tras (Hà Giang „Samodzielnie” z ramką, pięcioma dniami pętli i mapą z Đồng Văn; Fansipan i Hang Én z własnymi planami na deszcz i rezerwacjami; dawny zygzak z Đà Nẵng do Hồ Chí Minh City i trasa w obie strony z Đà Nẵng bez zygzaków, obok tras sprzed planu; znaczniki Cúc Phương i Ninh Bình obok siebie; najwyższa kwota 7 900–16 200 zł i długi dzień Sa Pa → Hội An) i liczby przed planem i po nim. Zostają bez zmian: Hà Nội trzy razy na jednej trasie na 1497 trasach (435), bo pętla północy wraca przez Hà Nội; Pù Luông na 9,1% tras (11,2%), Cát Bà na 33,4% (43,2%) i Cúc Phương na 19,7% (25,1%), ze spadkami głównie na trasach z górami (Cát Bà 41,4% → 20,4%), a przy przyrodzie i morzu małymi, do przejrzenia po pierwszych opiniach znajomych; Cao Bằng na 5,6% tras i Ba Bể na 8,0%, obie w ok. 96% swoich tras z Hà Giang, a cała pętla Ba Bể → Cao Bằng → Hà Giang → Sa Pa na 2,8% tras; Đà Nẵng na 37,0% tras (34,2%; z przyrodą 30,8%, z morzem 59,1%); dni z lotem 8–10 h od drzwi do drzwi na 12,2% tras (przed planem 3,6%), z ostrzeżeniem „Długi dzień w drodze”. Plan podawał tu 3,3%, bo liczył tylko przyloty do Sa Pa i Hà Giang; z wylotami (najczęściej Sa Pa → ✈ Hội An, 8,65 h) to 11,6% tras. Limit 8 h dla dnia z lotem usunąłby te dni, ale zmieniłby 16 389 tras: Sa Pa spadłaby z 20,7% do 11,5% tras, a Hà Giang z 28,0% do 17,0%, bo silnik zamiast nocy w Hà Nội wycina pętlę północy. Nic nie poprawiano. Na później przeszły: noc w Hà Nội po pętli północy przed lotem (lista „Do etapu 3”) i przejazd drogą przez węzeł lotniska (lista audytu przed publikacją): Ninh Bình ↔ Hà Giang przez Nội Bài na 5,3% tras, a od planu 1 Mekong ↔ Cát Tiên przez lotnisko Sajgonu na 0,6%.

Końcowy przegląd planu 2 (14.10.2026, świeży recenzent): bez uwag krytycznych i ważnych; recenzent odtworzył niezależnie wszystkie liczby z notatek. Poprawione od razu: ramka „Samodzielnie” w Hà Giang mówi, że zobowiązanie o niewydawaniu motocykla bez uprawnień podpisała część wypożyczalni i biur (ok. 30), a nie wszystkie (najpierw research, który podaje 111 wynajmujących w prowincji); Sa Pa mówi, że kolejka na Fansipan staje na przegląd na tydzień albo dłużej (w 2025 na trzy tygodnie), a samochód z kierowcą w szczycie rezerwuje się 2–3 dni wcześniej; research Hà Giang podaje tekst karty drogi z lotniska taki, jaki jest w danych (`r.air_ninhbinh`); komentarz `zigzag()` w silniku mówi dokładnie, czego reguła zabrania. Zostaje: trasa w jedną stronę może po wylocie z regionu lotniska przylotu wrócić do niego drogą (3348 z 89 856 tras w jedną stronę, 3,7%, np. Hội An, ✈ Hà Nội, Pù Luông, Phong Nha, Huế, ✈ Đà Lạt), bo reguła dotyczy lotów, a to jedno zejście wzdłuż kraju; nagłówki „Pętla Hà Giang” i „Pętla po Cao Bằng” zostają w dwóch formach, bo „pętla Hà Giang” to utarta nazwa trasy. Drobniejsze uwagi recenzenta są na listach niżej.

### Z planu 1 partii A (etap 3)

Zrobione 13.10.2026: plan 1 partii A ([plans/2026-10-13-etap-3a1-miejsca.md](plans/2026-10-13-etap-3a1-miejsca.md)). Na stronie są trzy nowe miejsca, każde z treścią na trzech poziomach, sezonem, klimatem, drogami, cenami, rezerwacjami i zdjęciami, a research każdego stoi we własnym pliku (`research/<id>-2026-10.md`), którego tabele czyta test danych: Phong Nha z lotniskiem Đồng Hới i wyprawą do Hang Én na dwa dni, Cúc Phương z nocną przejażdżką i Mây Bạc, Đà Nẵng z Sơn Trà i przełęczą Hải Vân także od strony Đà Nẵng. Silnik umie trudną wersję na dwa dni (`hard.next`) i stawia miejsce bliskie miastu lotniska tuż przy nim (`NEAR_H`), a zamiany jadą po liście dróg (`SWAPS.roads`). Testy łapią to, czego wcześniej nie miały czym łapać: sezon każdej nocy, tryb dat, znane lotniska, każde miejsce na jakiejś trasie, rezerwacje, pakowanie i wjazd każdej trasy, bliskie miejsca obok siebie. Kadry mapy są wyższe (środek od 18,4° N, północ do 19,3° N), a etykieta pobytu w ciasnym miejscu skraca się do nazwy. Zrobione są też punkty listy „Do etapu 3”, które nie czekały na Hà Giang i Sa Pa.

Punkt kontrolny planu 1 (13.10.2026): pełny test (134 784 kombinacje miesięcy i 10 368 dat, ok. 75 s), 14 sond (także dla kwietnia i maja 2027), 46 linków z kodem 200 i wydruk trzech tras w obu motywach (22, 14 i 14 stron, 0 zakrytych linii) przeszły; ręcznie w przeglądarce działają pasek u góry (trzy odnośniki w całości od 320 px), „Na górę”, podświetlanie na mapie, powiększenie mapy z Escape i przełącznik Hải Vân z klawiatury, a na prawdziwym telefonie w domowej sieci Wi-Fi pasek, powiększenie mapy, dwa dni Hang Én, link Oxalis z „Zarezerwuj wcześniej”, „Na górę”, przełącznik Hải Vân dotykiem i „Kopiuj plan na WhatsApp” z linią budżetu (przez zwykłe http przycisk pokazuje zapasowe pole z zaznaczonym tekstem, bo schowek działa tylko na stronie https; do sprawdzenia na opublikowanej stronie w etapie 4). Obejrzane razem: zrzuty sześciu tras (liczby trasy z „7½ godz.”, mapa z wyższymi kadrami, Mây Bạc i dwa dni Hang Én, przełęcz od strony Đà Nẵng, Sơn Trà ze zdaniem o zamykaniu dróg, Đà Nẵng na jedną noc, zygzak, najwyższa kwota 7 500–14 700 zł w kafelku) i liczby ze wszystkich 134 784 tras przed planem 1 i po nim. Poprawione od razu: ocena przyrody Đà Nẵng 1 zamiast 2 (research, `places.js` i test danych, który porównuje oceny miejsc etapu 3 z ich researchem), bo Đà Nẵng był na 50% tras z przyrodą, tak często jak parki narodowe, i na 54% tras bez zainteresowań; po zmianie jest na 34% wszystkich tras, 41% tras bez zainteresowań i ok. 30% tras z przyrodą. Liczby po poprawce: Phong Nha na 35,9% tras, Cúc Phương na 25,1%, dzień z dwoma lotami na 12,4% tras (przed planem 1 8,6%), Cát Bà na 4 noce w 73,7% pobytów (77,9%), Hà Nội trzy razy na 435 trasach (1257), bliskie miejsca nie obok siebie na 0 trasach. Zostają bez zmian dni z dwoma lotami: nowa para Đà Lạt ↔ Đồng Hới przez Hồ Chí Minh City (ok. 6% tras, 7½ h od drzwi do drzwi, z ostrzeżeniem „Długi dzień w drodze”) to najkrótsze połączenie, bo bezpośredniego lotu nie ma. Do planu 2 przeszły: Cao Bằng i Ba Bể na ok. 6% tras (przed planem 1 ok. 12%), do sprawdzenia po pętli północy Sa Pa → Hà Giang → Cao Bằng → Ba Bể; zygzak w silniku, taki sam jak przed planem 1 (`#od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1`: Hội An, lot do Hà Nội, lot z powrotem do Huế; podobne zygzaki wokół Hội An i Huế są na ok. 3,8% tras), do poprawy z testem na tej trasie i z przeglądem liczb; znaczniki Cúc Phương i Ninh Bình nachodzą na siebie na mapie (punkty 12 px od siebie, znacznik ma 20 px, ok. 22% tras), do rozsuwania znaczników w kadrze z testem w `tests/page.test.js` i kontrolą w sondzie `map.js`.

Końcowy przegląd planu 1 (13.10.2026, świeży recenzent): bez uwag krytycznych. Poprawione od razu: plany na Sơn Trà (dzień 2 i plan na jedną noc) każą dzień wcześniej sprawdzić komunikat zarządu, a test treści tego pilnuje; test tekstów interfejsu sprawdza też klucze wybierane warunkiem (`T(warunek ? 'a' : 'b')`); ramka tytułu kadru mapy ma szerokość, jaką rysuje Chrome (0,7 em litery), a sonda `map.js` sprawdza, że żadna etykieta nie zakrywa tytułu. Reguła `NEAR_H` zostaje do decyzji w planie 2, razem z zygzakiem, bo obie to kolejność miejsc w silniku i obie ruszają te same liczby: reguła zmienia 39 765 tras (29,5%), na 34 968 z nich Đà Nẵng znika, a tylko na 4 797 staje tuż przy Hội An (trasa traci średnio 1,2 punktu oceny silnika, 7 443 trasy ponad 2). Dziś Đà Nẵng jest na 34% tras (41% bez zainteresowań, 55% z morzem); reguła zawężona do powrotu samolotem (droga z Huế przez Hải Vân dozwolona) dałaby 49% (57%, 72%), czyli więcej niż przed obniżeniem oceny przyrody, a bez reguły 60% (65%, 84%) i 38 277 tras z lotem między Hội An a Đà Nẵng. Przykład: `#od=DAD&do=SGN&miesiac=2027-05&dni=28&co=morze&poziom=1`: bez reguły po Huế 2 noce w Đà Nẵng drogą przez Hải Vân, z regułą zamiast nich Đà Lạt. Drobniejsze uwagi recenzenta są na liście niżej.

### Z planu 2B

Zrobione 12.10.2026: plan 2B ([plans/2026-10-12-etap-2b-budzet.md](plans/2026-10-12-etap-2b-budzet.md)). Strona mówi, ile mniej więcej kosztuje wyjazd: szósta liczba trasy to budżet na osobę w złotych, a sekcja „Przed wyjazdem” na końcu strony ma budżet z podziałem i kwotą w pojedynkę, rezerwacje od najpilniejszej z linkami, wjazd i zdrowie oraz listę rzeczy do spakowania. W karcie Cao Bằng i w karcie przejazdu przez przełęcz Hải Vân jest przełącznik „Z kierowcą / Samodzielnie”. Dalekie drogi z lotnisk mają własne teksty, a karty przejazdu mówią, do której wylądować przed ostatnim promem. Poprawione są też wszystkie uwagi z przeglądu zrzutów 2A.

Punkt kontrolny etapu 2 (12.10.2026): pełny test (134 784 kombinacje), 12 sond, 34 linki z kodem 200 i wydruk czterech tras w obu motywach (0 zakrytych linii) przeszły; ręcznie w przeglądarce działają pasek u góry, „Na górę”, podświetlanie na mapie, odnośnik kwoty i przełącznik z klawiatury, a na prawdziwym telefonie w domowej sieci Wi-Fi kwota i stuknięcie w nią, sekcja „Przed wyjazdem”, przełącznik dotykiem, link rezerwacji i „Kopiuj plan na WhatsApp” z linią budżetu. Po obejrzeniu zrzutów sześciu tras (kwota w „W skrócie”, sekcja „Przed wyjazdem”, Cao Bằng na motocyklu, promy, najszersza kwota, Tết) wybrano dwie poprawki, zrobione od razu: zakresy liczb („1–3 dni”, „140–260 zł”, „11:00–14:30”) nie łamią się po półpauzie, a na telefonie tekst drogi w karcie przejazdu ma całą szerokość karty, z czasem jazdy pod nim. Do etapu 3 przeszły: ucięty odnośnik „Przed wyjazdem” w pasku na telefonie (działa przez przesunięcie paska w bok; ścisnąć pasek albo skrócić nazwy) i zbyt ogólne zdania w „Zarezerwuj wcześniej” (dopisek o Pù Luông w linii noclegów u gospodarzy także bez Pù Luông na trasie, trzy rzeczy naraz w linii parku Cát Tiên). Ostatnia strona wydruku niektórych tras, z samą stopką, zostaje bez zmian.

Końcowy przegląd 2B (13.10.2026, świeży recenzent): poprawione trzy rzeczy: między 641 a 900 px (tablet w pionie) kwota stoi we własnym wierszu pod pięcioma liczbami trasy, bo wcześniej wystawała z kafelka (przy 641–700 px wystawało też „9 godz.”); kwota o równych końcach stoi jako jedna liczba („30 zł”, „ok. 70 zł na osobę” zamiast „30–30 zł”); przełącznik motocykla przy formularzu, z którego nie wychodzi trasa, wraca na poprzedni wybór, a komunikat stoi też w karcie, jak przy „Dodaj”. Wszystko to sprawdza sonda `before.js`, także przy 641 i 768 px. Drobniejsze uwagi recenzenta są w listach wyżej, w „Następny krok”.

### Z planu 2A

Zrobione 11.10.2026: plan 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md)). Strona jest wygodna na telefonie i tłumaczy swoją trasę. Formularz stoi na górze, a po przewinięciu pasek u góry pokazuje podsumowanie i „Zmień”. Przy każdym miejscu jest „Wybrane, bo…”, pogoda w miesiącu pobytu i wydarzenia, a pod trasą „Nie ma na twojej trasie, bo…” z zapowiedzią przy „Dodaj”. Mapa ma trzy kadry, a jej etykiety nie nachodzą na siebie.

Przegląd zrzutów 2A (11.10.2026): poprawione od razu trzy rzeczy: na telefonie podpis zdjęcia nie dotyka przycisku „Zobacz trasę”, w pogodzie liczba dni z deszczem nie zostaje sama na końcu linii, a wielowyrazowe nazwy wietnamskie w opisach dni (Thảo Điền, Chợ Lớn, Hà Tôn Quyền) nie łamią się w środku: wiąże je reguła `tieVietnamese` w `site2/src/page.js`, a nazwy bez wietnamskich liter (Lang Biang) lista `KEEP_TOGETHER` w `site2/src/content.js`. Prywatnego artifactu do sprawdzenia na telefonie nie publikowano: stronę na prawdziwym telefonie sprawdzi punkt kontrolny etapu 2 na końcu planu 2B.

Końcowy przegląd 2A (11.10.2026, świeży recenzent): poprawione dwie rzeczy: powiększona mapa znów przycina kontury do ramek kadrów, a w trybie dat na telefonie 360 px dwa pola dat mieszczą się obok siebie i strona nie przewija się na boki (sonda `settings.js` jest teraz uruchamiana też przy 360 px).

Uwagi z przeglądu zrzutów 2A poprawił plan 2B (zadanie 1).

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
