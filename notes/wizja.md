# Wietnam po swojemu: wizja (9.10.2026)

Ustalona w sesji o wizji 9.10.2026. Tło i rozpoznanie: [pomysl-planer-dla-znajomych.md](pomysl-planer-dla-znajomych.md). Plan prac: [etapy.md](etapy.md).

## W skrócie

Każdy ustawia sobie:
- termin: daty albo miesiąc i długość;
- lotniska przylotu i wylotu;
- jedno lub dwa zainteresowania;
- poziom przygody.

Strona od razu układa trasę po Wietnamie: miejsca, plan dni, przejazdy, mapę, sezon i budżet. Trasę można poprawić i wysłać linkiem. Strona nie podaje konkretnych lotów. Kod pochodzi z planera „Vietnam in December”.

## Dla kogo

- **Pierwsi odbiorcy:** przygodowi znajomi. Każdy przyjeżdża w innym terminie i z innym akcentem: kultura, jedzenie albo przyroda i naczelne.
- **Docelowo:** każdy, kto planuje Wietnam samodzielnie. Narzędzie jest ogólne: dowolny miesiąc i dowolne daty. Może urosnąć poza grono znajomych, więc decyzje nie zamykają tej drogi (zob. „Otwarte drzwi”).

## Kryteria sukcesu

- Na telefonie, bez instrukcji, w kilka minut da się ustawić swój termin i zainteresowania i dostać sensowną trasę.
- Każda kombinacja ustawień daje poprawną trasę. Pilnuje tego test wszystkich kombinacji.
- Każde miejsce ma wyjaśnienie: dlaczego jest na trasie albo dlaczego go nie ma.
- Każdy fakt i każda cena mają źródło i datę w `research/`.

## Decyzje

### 1. Kto ustawia trasę: hybryda

- Strona działa w pełni samodzielnie.
- Organizator może wysłać gotowy link z ustawieniami. Odbiorca zmienia, co chce, i odsyła link.
- Bez linku strona od razu pokazuje sensowną trasę na ustawieniach domyślnych.
- Ustawienia są na wierzchu, nie ma ukrytego trybu organizatora.

### 2. Język: tylko polski

- Treść i interfejs są po polsku.
- Polski staje się językiem bazowym. W pierwowzorze bazą był angielski, a polski nakładką.
- Mechanizm kluczy i test kompletności zostają, więc angielski można dodać później jako osobny etap.

### 3. Miesiące: wszystkie

- Strona obsługuje dowolny miesiąc i dowolne daty.
- Sezon każdego miejsca we wszystkich 12 miesiącach to część etapu 1.
- Teksty piszemy raz, niezależnie od miesiąca. Od miesiąca zależą tylko dane (zob. „Miesiąc w danych, nie w tekstach”).

### 4. Zainteresowania: pięć, wybór 0–2

- **Kultura i historia**, **Jedzenie**, **Dzika przyroda**, **Góry i jaskinie**, **Morze i wyspy**.
- Bez wyboru wychodzi „po trochu wszystkiego”: wszystkie pięć zainteresowań liczy się po równo. Dwa wybrane też liczą się po równo. Razem daje to 16 zestawów.
- Zainteresowania wybierają miejsca, a poziom przygody (pkt 5) decyduje, jak intensywne są dni.

### 5. Poziom przygody: trzy, plus motocykl

- **Spokojnie:** spacery, wycieczki jednodniowe, hotele i noclegi u gospodarzy, tylko łatwe jaskinie.
- **Aktywnie (domyślny):** całodniowe trekkingi, noc u gospodarzy w górach albo w lodge'u przy parku, kajaki, pętla motocyklowa z kierowcą.
- **Ekstremalnie:** wielodniowe wyprawy z noclegiem w jaskini (Hang Én, Tú Làn), noce w dżungli, Tà Năng–Phan Dũng, Fansipan pieszo.
- **Jak działa poziom:** wybiera warianty dni (łatwy / zwykły / trudny), tak jak dziś wersja łagodna. Odblokowuje też moduły, które wymagają danego poziomu. Moduł jest dostępny od swojego poziomu wzwyż.
- **Wyprawy** (jaskinie, dżungla, wielodniowe trekkingi) tylko z licencjonowanym operatorem lub przewodnikiem.
- **Motocykl:**
  - domyślnie z kierowcą;
  - samodzielna jazda to zamiana albo–albo w modułach z pętlą (Hà Giang, Cao Bằng, przełęcz Hải Vân), a obok są wymagania i uczciwa informacja o ryzyku;
  - nie zależy od poziomu przygody, bo chodzi o prawo jazdy, nie o kondycję;
  - tylko na pętlach, nie przez całą trasę.
- **Sơn Đoòng** tylko jako wzmianka, bo jest wyprzedana do 2027. Nie jest modułem.

### 6. Długość i lotniska

- **Długość:** 5–30 dni. Liczymy jak w pierwowzorze: dni od przylotu do wylotu włącznie, czyli noce = dni − 1. Limit to jedna stała, którą podniesiemy, gdy przybędzie miejsc.
- **Lotniska:** przylot i wylot z Hồ Chí Minh City, Hà Nội albo Đà Nẵng, w dowolnym układzie, także to samo lotnisko w obie strony. W tym drugim przypadku silnik dokłada na koniec lot krajowy.
- **Termin podaje się na dwa sposoby:**
  - daty przylotu i wylotu: sezon liczy się dla każdego dnia osobno, więc wyjazd na przełomie miesięcy dostaje sezon obu;
  - miesiąc z rokiem (np. luty 2027) i długość: wszystkie dni dostają sezon tego miesiąca, a ostrzeżenie o Tết pojawia się, gdy Tết wypada w tym miesiącu.
- **Pierwszy i ostatni dzień są lekkie,** bo nie znamy godzin lotów.

### 7. Budżet: zgrubnie

- Przedział na osobę w złotych, bez lotów do Wietnamu.
- Ceny w danych są w EUR, a kurs przeliczenia ma datę sprawdzenia.
- Pod przedziałem są najdroższe pozycje trasy z informacją, z jakim wyprzedzeniem rezerwować: wyprawy, przewodnicy, kierowca albo wynajem motocykla, loty krajowe.
- Kwoty nie mają poprawek sezonowych. Gdy termin obejmuje Tết albo święta, strona ostrzega o wyższych cenach.

### 8. Nazwa i adres

- Nazwa: „Wietnam po swojemu”.
- Repo `wietnam`, adres https://grzegorzfrskiba-hub.github.io/wietnam/
- Własną domenę można później podpiąć do GitHub Pages bez zmian w kodzie.

### 9. Repo i licencja

- Repo publiczne, bez pliku LICENSE, czyli wszystkie prawa zastrzeżone.
- W README i stopce strony: „© 2026 Wietnam po swojemu. Wszelkie prawa zastrzeżone.” Bez imienia i nazwiska.
- Zdjęcia zachowują własne licencje i atrybucję.

## Jak działa strona

- **Ustawienia na wierzchu:** termin, lotnisko przylotu i wylotu, zainteresowania (0–2) i poziom. Do wyboru są przyciski i pola dat, bez suwaków. Ustawienia domyślne na pierwsze wejście ustalimy w etapie 2.
- **Trasa przelicza się od razu** przy każdej zmianie, bez przycisku „generuj”.
- **Trasa wygląda jak w pierwowzorze:** pasek dni, mapa, miejsca z galeriami, plan dnia, przejazdy, sezon i pogoda, logistyka.
- **„Wybrane, bo…”** stoi przy każdym miejscu na trasie, np. „przyroda + w marcu dobry sezon”. Obok jest przycisk „Usuń”.
- **„Nie ma na twojej trasie, bo…”** podaje powód: poza sezonem, za daleko na tyle dni, nie twój profil albo tylko na poziomie ekstremalnie.
  - Przy każdym miejscu jest przycisk „Dodaj”. Silnik układa wtedy trasę na nowo z tym miejscem i mówi, co wypadło.
  - Tak poprawia się gotową trasę. Nie jest to panel przełączników na start, przed którym ostrzegało badanie z 8.10.
- **Zamiany albo–albo** działają wewnątrz modułów, np. motocykl z kierowcą albo samodzielnie.
- **Budżet** opisuje pkt 7. Do tego **ostrzeżenia:** Tết, święta, zamknięcia.
- **Link z ustawieniami** (rozszerzony `variantHash`) i kopiowanie planu do WhatsAppa.
- **Tempo nie jest ustawieniem** w pierwszej wersji. Silnik ma stałe zasady: minimum nocy zapisane w module i karę za przeprowadzki. Tempo dodamy, jeśli okaże się potrzebne.

## Silnik

- **Podejście 2 z rozpoznania:** moduły, punktacja i programowanie dynamiczne wzdłuż osi południe–północ z odnogami.
- **Punktacja:** wartość modułu to dopasowanie do zainteresowań razy sezon w dniach pobytu. Każda kolejna noc w tym samym miejscu jest warta trochę mniej. Od tego odejmujemy kary za godziny w drodze i liczbę przeprowadzek.
- **Twarde reguły:**
  - suma nocy jest równa długości;
  - nic zamkniętego w dniu pobytu;
  - moduły tylko od swojego poziomu wzwyż;
  - trasa kończy się na lotnisku wylotu;
  - „Dodaj” wymusza moduł, a „Usuń” go wyklucza.
- **Gdy wymuszonego miejsca nie da się zmieścić,** np. przy za małej liczbie dni, strona mówi dlaczego i zostawia resztę trasy bez zmian.
- **Powtarzalność:** te same ustawienia zawsze dają tę samą trasę, bo remisy rozstrzygamy zawsze tak samo.
- **Działa w przeglądarce,** bez serwera i bez AI. AI pomaga tylko pisać treść, a każdy fakt ma źródło.
- **Ryzyko do sprawdzenia na początku etapu 1:** czy prosta oś z odnogami i powrotem na to samo lotnisko daje sensowne trasy. Odnogi to Phú Quốc, Cát Bà, Cao Bằng i Ba Bể, później Hà Giang i Sa Pa. Najpierw mały prototyp na 12 miejscach, dopiero potem zamrażamy model modułu.

## Moduł: co ma każde miejsce

- region, pozycja na osi, najbliższe lotnisko, czasy przejazdów do sąsiadów;
- noce: minimum, ideał, maksimum;
- dni planu z priorytetem i wariantami: poziomu (łatwy / zwykły / trudny) i pogody (zwykły / na deszcz);
- tagi (kultura, jedzenie, przyroda, naczelne, dżungla, trekking, jaskinie, plaża, motocykl) przypisane do pięciu zainteresowań;
- minimalny poziom przygody, jeśli moduł go wymaga;
- sezon w każdym z 12 miesięcy: dobry / średni / zły / zamknięte, z powodem, do tego temperatura i opady;
- wydarzenia przypięte do miesięcy, np. złote tarasy ryżowe we wrześniu i październiku;
- koszty w EUR, wyprzedzenie rezerwacji, linki rezerwacji;
- 3–5 zdjęć z autorem i licencją;
- zasady bezpieczeństwa: przewodnik, pozwolenia, ryzyka.

## Miesiąc w danych, nie w tekstach

- Teksty piszemy raz, niezależnie od miesiąca.
- Od miesiąca zależą:
  - sezon;
  - zamknięcia;
  - święta, w tym Tết na kilka lat naprzód;
  - wydarzenia przypięte do miesięcy;
  - wybór wariantu dnia: zwykły albo na deszcz.
- Teksty pisane pod grudzień w pierwowzorze (Đà Lạt, Cát Bà, Hội An w deszczu) przepisujemy na neutralne.

## Treść, bezpieczeństwo, licencje

- **Styl:**
  - do czytelnika per „ty”, bez form rodzajowych: nie „byłeś/byłaś”, tylko np. „zobaczysz”, „jeśli masz”;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - liczebniki przez `countWord`/`nightForm`, jednoliterowe wyrazy wiąże `tieShortWords`.
- **Fakty i ceny:** źródło i data w `research/`. Na stronie przypominamy, żeby sprawdzić u przewoźnika.
- **Bezpieczeństwo:** zasady z pkt 5. Do tego pozwolenia w strefach przygranicznych opisane przy module.
- **Zdjęcia:**
  - 3–5 na miejsce, podpis z dokładnym miejscem;
  - tylko licencje dopuszczające użytek komercyjny i zmiany: CC0, CC BY, CC BY-SA, domena publiczna; bez NC i ND;
  - autor i licencja zapisane przy zdjęciu.

## Otwarte drzwi

Dziś nie budujemy produktu, ale nic nie zamyka drogi do większego projektu:
- licencje zdjęć jak wyżej;
- treść w plikach danych, oddzielona od kodu;
- linki rezerwacji w jednym miejscu w danych;
- zachowany mechanizm tłumaczeń;
- nazwa niezwiązana z gronem znajomych;
- repo publiczne, ale bez wolnej licencji.

## Technika

- **Z pierwowzoru:** ES5 (`var`, `function`), bez zewnętrznych zależności, każdy tekst przez `esc()`, kolory przez zmienne CSS z `:root`. Testy działają w JavaScriptCore (`tests/run.sh`), bo node nie ma.
- **Build** (`site2/build.py`) daje wersję na GitHub Pages i plik offline.
- **Testy:**
  - każda kombinacja ustawień, czyli ok. 135 tys. tras: 16 zestawów zainteresowań × 3 poziomy × 12 miesięcy × 26 długości × 9 par lotnisk;
  - przypadki dat: Tết, przełom miesięcy;
  - próbka „Dodaj/Usuń” i zamian;
  - na co dzień szybki przebieg, pełny przed publikacją.
- **Offline:** PDF z wydruku twojej trasy (pierwowzór to umie) i lekki plik offline z mniejszymi zdjęciami. Decyzja w etapie 4.

## Poza zakresem

- konkretne loty i godziny;
- AI układające trasy na stronie;
- suwaki;
- trasa całego wyjazdu na motocyklu;
- Sơn Đoòng jako moduł;
- konta, komentarze, opinie, podział kosztów.

**Na później:** angielski, lotniska Phú Quốc i Cam Ranh, tempo jako ustawienie, podpowiedź „kiedy najlepiej jechać” dla profilu, własna domena.

## Do sprawdzenia w researchu

- daty Tết na lata 2027–2030 (z grubsza 6.02.2027 i 26.01.2028) oraz święta państwowe;
- ile dni Polacy mogą być w Wietnamie bez wizy (prawdopodobnie 45);
- samodzielna jazda motocyklem:
  - czy Wietnam uznaje polskie międzynarodowe prawo jazdy;
  - kategorie prawa jazdy po nowym prawie drogowym;
  - ubezpieczenia;
  - kontrole w Hà Giang;
- noclegi w dżungli: Cúc Phương, Pù Mát, Cát Tiên;
- sezon wypraw jaskiniowych w Phong Nha (według rozpoznania od końca stycznia).
