# Etap 3, partia A, plan 2: Hà Giang i Sa Pa — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Cel:** druga połowa partii A, a z nią koniec etapu 3 przed publikacją. Na końcu punkt kontrolny planu 2.
- **Dwa nowe miejsca.** Każde ma treść na trzech poziomach, sezon, klimat, drogi, ceny, rezerwacje, kolor na mapie i pięć zdjęć:
  - Hà Giang (4–5 nocy): pętla przez płaskowyż Đồng Văn na 3 albo 4 dni (Lũng Cú przy 5 nocach), autem z kierowcą albo z przewodnikiem na motocyklu, a z przełącznikiem „Samodzielnie” motocyklem z miasta Hà Giang i z powrotem; pozwolenie na strefę przygraniczną w treści i w budżecie;
  - Sa Pa (2–4 noce): wędrówka doliną Mường Hoa, kolejka na Fansipan i wioska Cát Cát, wodospady pod przełęczą Ô Quy Hồ, a na „Ekstremalnie” Fansipan pieszo na dwa dni, wyłączony w V–IX.
- **Silnik bez zygzaków:** reguła regionu lotniska (`REGION_H`, 6,5 h drogą od lotniska), obok `NEAR_H`.
- **Odłożone z planu 1:** rozsuwanie znaczników, które na mapie zachodzą na siebie; własny plan „Gdy pada” wyprawy na dwa dni (`hard.rain`); dwie drogi Phong Nha z lotnisk.

**Architektura:**
- **Dane miejsca w tych samych plikach co w planie 1:**
  - `places.js`, `seasons.js`, `climate.js`, `travel.js`;
  - `content.js` (`SWAPS`, `AIR_KEYS`, `KEEP_TOGETHER`), `costs.js`, `before.js`, `photos.js`, `ui.js`;
  - treść w `site2/src/content/<id>.js`.

  Research każdego miejsca stoi we własnym pliku (`research/hagiang-2026-10.md`, `research/sapa-2026-10.md`). Test danych czyta z niego sezon, ocenę `fit` i tabele „Zestawienie”.
- **Silnik tras (`engine.js`):**
  - `travelGraph` zapisuje dla każdej pary punktów, czy najszybsza droga leci samolotem (`fly`);
  - `planRoute` odrzuca ruch, który leci z powrotem w region lotniska przylotu albo wylatuje z regionu lotniska wylotu, żeby do niego wrócić;
  - trasa w obie strony ma drugą warstwę tabeli: po powrocie samolotem do domu nie wylatuje już z jego regionu (drogą wyjechać może).
- **Czyste funkcje w `page.js`:** `spreadPins` (rozsuwanie znaczników), `variantOf` z planem na deszcz trudnej wersji (`hard.rain`).
- **`app.js`:** kreska od rozsuniętego znacznika do prawdziwego punktu; w ramce „Samodzielnie” zdanie o ryzyku miejsca, gdy `SWAPS.<id>.risk`.
- **Mapa:** kadry bez zmian. Hà Giang, punkt Đồng Văn i Sa Pa mieszczą się w kadrze północy, więc `geo/make_basemap.py` nie jest potrzebny.
- **Testy strony (`tests/page.test.js`) zostają na 14 dawnych pozycjach** (`OLD_IDS`), a testy etapu 3 liczą na pełnych danych (`DATA_ALL`), jak w planie 1.

**Technologie:** JavaScript w stylu ES5, bez zależności; testy w JavaScriptCore (`jsc`); Python 3 (build, zrzuty); Chrome bez okna (sondy, zrzuty, wydruk); curl (linki).

**Specyfikacja:**
- [notes/wizja.md](../wizja.md): pkt 5 („Poziom przygody: trzy, plus motocykl”: zamiana albo–albo w modułach z pętlą, Fansipan pieszo na „Ekstremalnie”), „Moduł: co ma każde miejsce”, „Treść, bezpieczeństwo, licencje”;
- [notes/etapy.md](../etapy.md): „Następny krok: etap 3, partia A, plan 2” i lista „Do etapu 3”;
- decyzje z sesji 13.10.2026, niżej w sekcji „Decyzje z sesji 13.10.2026”;
- research: [Hà Giang](../../research/hagiang-2026-10.md) i [Sa Pa](../../research/sapa-2026-10.md), z uzupełnieniem o stan z 2026 r. (13.10.2026, w commicie razem z tym planem).

## Ograniczenia globalne

Dotyczą każdego zadania.

- **Kod:**
  - styl jak dotąd: `var`, `function`, bez zewnętrznych zależności;
  - każdy tekst wstawiany do HTML przechodzi przez `esc()`;
  - kolory tylko przez zmienne CSS z bloków `:root` (pilnuje tego test `css colours`);
  - `engine.js` i `page.js` bez DOM; dane wchodzą do `page.js` przez argumenty;
  - komentarze w kodzie po angielsku, teksty dla czytelnika po polsku w `ui.js` i `content/`.
- **Twarda spacja w kodzie** to zawsze zapis `\u00a0`, nigdy sam znak.
  - Jedyny znak twardej spacji w repo stoi w `tests/page.test.js`, w `var NB = '…';`.
  - Po każdym zadaniu `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie zwraca.
  - Narzędzie do zapisu plików bywa, że samo zamienia napis `\u00a0` na znak; ten grep to wyłapie.
- **Teksty:**
  - do czytelnika per „ty”, bez form rodzajowych;
  - „miejsce”, nie „przystanek”; „u gospodarzy”, nie „homestay”;
  - wietnamskie nazwy z diakrytykami i bez odmiany;
  - wielowyrazowe nazwy bez wietnamskich liter (La Dao) w `KEEP_TOGETHER`;
  - liczebniki przez `countWord`; cudzysłów „…”, półpauza w zakresach, godziny 24-godzinne, spacja przed °C.
- **Ceny i fakty:**
  - każda liczba w `costs.js`, `before.js`, `seasons.js`, `climate.js` i `travel.js` stoi w tabeli researchu, a test danych to sprawdza;
  - dla Hà Giang i Sa Pa tą tabelą jest „Zestawienie” we własnym pliku miejsca;
  - bilety do ok. 5 EUR (pałac Vương, Lũng Cú, łódź w Tu Sản, Cát Cát) liczą się w kwocie dziennej (`COSTS.day`), bez pozycji w `COSTS.items`;
  - nową albo zmienioną liczbę najpierw wpisz do researchu, ze źródłem i datą.
- **Bezpieczeństwo w treści:** zdania o przepisach, kontrolach policji, pozwoleniu na strefę przygraniczną, wypadkach i zgodzie parku Hoàng Liên tylko z researchu miejsc (sekcje „Bezpieczeństwo i przepisy”, „Motocykl samodzielnie w Hà Giang”, „Trudny dzień”). Bez nazwisk ofiar, kierowców i gospodarzy.
- **Linki:** tylko z tabel „Zestawienie: rezerwacje” researchu miejsc: oficjalne strony i sprawdzeni operatorzy, bez parametrów śledzących i partnerskich.
- **Zdjęcia:**
  - tylko 10 plików, które już leżą w `photos/` głównej kopii repo: `hagiang_0`–`4` i `sapa_0`–`4`;
  - pobrane 13.10.2026 za zgodą użytkownika, na licencjach CC0, CC BY i CC BY-SA; autorów i licencje sprawdzono tego dnia w API Wikimedia Commons;
  - autor i licencja stoją w `photos.js` (i w `photos/meta.json`, poza gitem);
  - nowych zdjęć nie pobieraj bez zgody.
- **Testy:**
  - `bash tests/run.sh` kończy się `ALL PASS` po każdym zadaniu;
  - pełny przebieg (`--full`) trwa po tym planie ok. 100 s (przed planem ok. 75 s): reguła regionu lotniska kosztuje ok. 30% czasu silnika.
- **Sieć:** `tools/links.sh` pyta adresy przez curl i niczego nie zapisuje. Każde pobieranie plików tylko po zgodzie użytkownika, z nazwą, źródłem i rozmiarem.
- **Repo będzie publiczne:** bez danych osobowych i bez numerów lotów.
- **Commity:**
  - po polsku, każdy kończy się linią `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
  - commity po zadaniach są częścią planu;
  - `git push` i publikacja artifactu tylko za zgodą użytkownika.

## Na co uważać przy przeglądzie

Sześć sytuacji, w których strona najłatwiej zawiedzie użytkownika, a których testy czystych funkcji same nie widzą. Każda ma sprawdzenie w zadaniu, które ją obsługuje.

1. **Zygzaki i to, co reguła zabiera.**
   - Ryzyko: reguła regionu lotniska usuwa zygzak (Hội An, ✈ Hà Nội, ✈ Huế), ale silnik układa trasę jednym przejazdem wzdłuż kraju, więc zamiast przestawić miejsca często któreś odrzuca. Trasa z listy (Đà Nẵng → Hồ Chí Minh City, 28.01–14.02.2027, kultura i jedzenie) traci Đà Lạt i deltę Mekongu.
   - Oczekiwane: żadnego lotu z powrotem w okolicę lotniska przylotu i żadnego wylotu z okolicy lotniska wylotu przed końcem; trasa w obie strony nie wraca samolotem do domu w środku. Koszt jak w sekcji „Koszt reguły silnika”.
   - Sprawdzenie: test silnika na danych zastępczych `ZG`, test kombinacji (każda trasa) i test strony z dwiema trasami (zadanie 1), liczby i zrzuty z3, z4 w punkcie kontrolnym (zadanie 7).
2. **Udział miejsc po zmianach.**
   - Ryzyko: Hà Giang i Sa Pa biorą noce innym miejscom północy. Po suchej próbie Pù Luông stoi na 9,1% tras (przed planem 11,2%), Cát Bà na 33,4% (43,2%), Cúc Phương na 19,7% (25,1%), a Đà Nẵng na 37,0% (34,2%). Hà Nội trzy razy na jednej trasie jest na 1497 trasach (435), bo pętla północy wraca przez Hà Nội.
   - Oczekiwane: liczby jak w zadaniu 7, krok 5; każda zmiana ma powód.
   - Sprawdzenie: zadanie 7, kroki 5 i 9 (decyzje z użytkownikiem).
3. **Długie dni po locie do Sa Pa i Hà Giang.**
   - Ryzyko: lot do Hà Nội i 5–5,75 h drogi to 8,65 h od drzwi do drzwi (z Hội An do Sa Pa). Takich tras jest 3,3%.
   - Oczekiwane: karta przejazdu ostrzega „Długi dzień w drodze”, a dzień przed nim nie ma planu na rano.
   - Sprawdzenie: zrzut z6 (zadanie 7).
4. **Fansipan pieszo.**
   - Ryzyko: wyprawa w miesiącu wyłączonym albo bez drugiego dnia; tekst bez firmy ze zgodą parku i przewodnika z kartą; pod wyprawą plan na deszcz wędrówki doliną.
   - Oczekiwane: oba dni albo żaden, decyduje miesiąc pierwszego dnia (wyłączone V–IX); tekst mówi, kto prowadzi i że samemu nie wolno; własny plan „Gdy pada”; nocleg w obozie liczy się w cenie wyprawy (`night: true`).
   - Sprawdzenie: testy w zadaniach 3 i 6, test treści (wyprawa na dwa dni ma własny plan na deszcz), zrzut z2.
5. **Hà Giang: pozwolenie i jazda samemu.**
   - Ryzyko: tekst mówi, że pozwolenie nie jest potrzebne; ramka „Samodzielnie” powtarza wspólne rady albo gubi kontrole od kwietnia 2026.
   - Oczekiwane: dzień przyjazdu we wszystkich wersjach mówi o pozwoleniu za 10 USD (Đồng Văn, Mã Pí Lèng, Lũng Cú), budżet ma 9 EUR na osobę; ramka ma własne zdanie o ryzyku i własne rady.
   - Sprawdzenie: testy w zadaniu 5, zrzut z1 z `motocykl=hagiang`.
6. **Mapa.**
   - Ryzyko: znaczniki Cúc Phương i Ninh Bình (12 px od siebie, znacznik ma 20 px) zachodzą na siebie; punkt Đồng Văn leży ok. 10 px pod górną krawędzią kadru północy, a Sa Pa ok. 25 px od lewej.
   - Oczekiwane: żadne dwa znaczniki nie zachodzą na siebie, a przesunięty ma kreskę do prawdziwego punktu; żadna etykieta nie zakrywa innej, znacznika, tytułu ani krawędzi.
   - Sprawdzenie: test kombinacji (etykiety i znaczniki każdej trasy), sonda `map.js` przy 1400 px, zrzuty z1, z5 i z6.

## Kontekst dla wykonawcy

- **Repo:** `~/Projects/vietnam-trips`, gałąź `main`; zdalne repo `grzegorzfrskiba-hub/wietnam` jest prywatne.
- **JavaScriptCore:** `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`. Pliki z jednego wywołania dzielą zasięg globalny; `print()` wypisuje, `readFile()` czyta plik (ścieżki od katalogu repo).
- **Python:** 3.9, z Pillow i PyMuPDF w katalogu użytkownika. Skrypt, który nie potrzebuje Pillow (skrypt notatek), uruchamiaj z `-I`; cięcie zrzutów potrzebuje Pillow, więc bez `-I`.
- **Chrome bez okna** (`tests/shot.sh`, `tests/probe.sh`, `tests/print.sh`):
  - pod wirtualnym czasem nie przychodzą zdarzenia `scroll`, IntersectionObserver woła tylko raz, na starcie, a przejścia CSS stoją;
  - słowo `MIESIAC` w ustawieniach sondy, zrzutu i wydruku to miesiąc za pięć miesięcy od dziś;
  - sondy przeszły w suchej próbie dla miesięcy 2027-03, 2027-05 i 2027-10.
- **Pułapki:**
  - wbudowana przeglądarka Claude nie otwiera `file://`;
  - w nowym worktree podlinkuj `photos/` z głównej kopii przed buildem i dopisz `/photos` do `$(git rev-parse --git-path info/exclude)`, żeby link nie trafił do commita;
  - commity dodają pliki po nazwie (`git add <pliki>`), nie `git add -A`;
  - w nazwach kontroli sond nie używaj prostego cudzysłowu `"`: `probe.sh` ucina na nim linię, więc piszemy „…”;
  - narzędzie Bash działa w zsh: niecytowana zmienna z listą plików nie dzieli się na słowa, więc wywołania `jsc` z wieloma plikami pisz wprost albo w małym skrypcie bash;
  - `tools/links.sh` dostaje od strony Sapa O'Chau kod 406: serwer odrzuca curla po kilku zapytaniach, a w przeglądarce strona otwiera się normalnie (13.10.2026).
- **Zdjęcia nowych miejsc** leżą już w `photos/` głównej kopii (10 plików z 13.10.2026; `photos/` nie jest w gicie). Build bierze je stamtąd.
- **Sucha próba (13.10.2026):**
  - kod zadań 1–6 złożono w osobnym worktree na gałęzi `sucha-proba-3a2`, commit po commicie, na researchu z tego samego dnia;
  - kroki tego planu wygenerowano z tych commitów i odtworzono z gotowego tekstu planu na świeżym worktree, zadanie po zadaniu: po krokach testów każde zadanie dawało błąd z kroku 2, a po kodzie `ALL PASS`; commit z kroku 5, wykonany dosłownie, brał wszystkie zmienione pliki, a pliki i opis commitu po każdym zadaniu są identyczne z suchą próbą;
  - po zadaniach 1, 2, 5 i 6 przeszedł pełny test (po zadaniu 6: `combos: 134784 months and 10368 dates (all)`, `ALL PASS`, 101 s), a po każdym zadaniu 14 sond z zadania 1, krok 4 (po zadaniach 1, 5 i 6 także dla miesięcy 2027-05 i 2027-10);
  - `tools/links.sh`: 52 z 53 adresów z kodem 200; Sapa O'Chau z kodem 406, a we wbudowanej przeglądarce strona otworzyła się normalnie;
  - obejrzano zrzuty: karta Hà Giang z „Samodzielnie” (ramka, pięć dni pętli), karta Sa Pa na „Ekstremalnie” w październiku (dwa dni Fansipanu), mapa północy z pętlą Ba Bể → Cao Bằng → Hà Giang → Sa Pa, znaczniki Cúc Phương i Ninh Bình obok siebie;
  - skrypty wzięte z tekstu planu przeszły na kodzie po zadaniu 6: sondy z zadania 1, krok 4 (0 z 14 nie przeszło), liczby z zadania 7, krok 5 (te same co w suchej próbie, 57 s), a skrypt notatek z zadania 8 na kopiach plików (8 zmian);
  - wysokości stron do zrzutów zmierzono (zadanie 7, krok 6);
  - nie sprawdzono na sucho: wydruku, ręcznego sprawdzenia w przeglądarce, telefonu i przeglądu z użytkownikiem (zadanie 7).

## Decyzje z sesji 13.10.2026

Pytania do użytkownika i odpowiedzi:
1. **Sezon Hà Giang:** `SSSDSZSSSDDS` ze stacji w mieście, jak każe metoda (rozstrzyga stacja, model NASA dla płaskowyżu tylko zaznacza miesiące graniczne), z ostrzeżeniem o zimnej porze XII–II w karcie. Model dla płaskowyżu dałby S w czerwcu, choć w czerwcu 2024 woda zalała QL4C, a S w X–XI, w szczycie gryki.
2. **Noce Hà Giang:** [4, 4, 5]. Przy idealnych 4 silnik i tak bierze 5 nocy w 76% pobytów.
3. **Kolejność miejsc w silniku:** reguła regionu lotniska plus dzisiejsza `NEAR_H`. Liczby przy pytaniu i po suchej próbie: sekcja „Koszt reguły silnika”.
4. **Jazda samemu w Hà Giang:** przełącznik jak w Cao Bằng; motocykl z miasta Hà Giang i z powrotem; ramka z wymaganiami, kontrolami od 12.04.2026, pozwoleniem i oboma wypadkami z 2026 r.
5. **Sezon Sa Pa:** `SSDSZZZZZSSS` z progów, bez wyjątku na złote tarasy (wydarzenie w karcie; złote tarasy to sedno Mù Cang Chải z partii B).
6. **Fansipan pieszo wyłączony w V–IX** (użytkownik zostawił wybór; zgodnie z sezonem Sa Pa).
7. **Trasa w obie strony nie wraca samolotem do domu w środku** (pytanie zadane w trakcie suchej próby, rozszerzenie punktu 3): po powrocie samolotem w okolicę lotniska trasa nie wylatuje już stamtąd samolotem.

Lista 28 ustaleń, zatwierdzona w całości (tu w skrócie, w grupach):
- **Silnik (1–3):** `REGION_H = 6.5` (region Đà Nẵng: Hội An, Đà Nẵng, Huế, Phong Nha; Hà Nội: cała północ; Hồ Chí Minh City: Sajgon, delta Mekongu, Cát Tiên); testy na danych zastępczych, każdej kombinacji i dwóch trasach; koszt w planie i w punkcie kontrolnym.
- **Hà Giang (4–12):**
  - dane z researchu: oś 22,83, poziom 1, `fit` kultura 2, jedzenie 0, przyroda 2, góry 3, morze 0; klimat ze stacji w mieście; nocleg u gospodarzy;
  - pięć planów dni, bez trudnego dnia; „Spokojnie” autem, „Aktywnie” i „Ekstremalnie” autem albo z easy riderem;
  - `SWAPS.hagiang` i ramka z własnym ryzykiem i radami;
  - pozwolenie na strefę przygraniczną w dniu przyjazdu i `hagiang.permit` (9 EUR);
  - wydarzenia, perełka i rada „zamiast” z researchu;
  - ceny (noc 14–52, auto 88–133 za dzień, easy rider 18–34, motocykl 8–23 EUR), rezerwacje (ZingHome), drogi (Hà Nội 6,5 h, lotnisko Hà Nội 5,75 h, Cao Bằng 8 h, Ba Bể 7 h, Sa Pa 6 h);
  - kolor 19, punkt Đồng Văn.
- **Sa Pa (13–18):**
  - oś 22,9, noce [2, 3, 4], `fit` jak Hà Giang, bez noclegu u gospodarzy, kolor 17;
  - dni z researchu, Fansipan pieszo jako trudna wersja dnia 2 z `next`;
  - ceny (noc 24–60, przewodnik 17–31 + 5–18 za grupę, kolejka 28–45, auto 36–53, Fansipan 86–95 + 0–71 za grupę z nocą w obozie, zejście 0–29 EUR), rezerwacje (Sapa O'Chau, Sapa Sisters, Sun World);
  - wydarzenia; drogi Hà Nội 5,5 h, lotnisko Hà Nội 5 h, Ninh Bình 6,5 h, Hà Giang 6 h; Ba Bể (9 h) i Pù Luông (9,75 h) poza danymi (szacunki bez źródła, silnik ich nie używał), Cao Bằng (ok. 11 h) też.
- **Mapa (19–20):** kadr północy bez zmian; rozsuwanie znaczników z testem w `tests/page.test.js` i kontrolą w sondzie `map.js`.
- **Odłożone z planu 1 (21–23):** `hard.rain` z tekstami z researchu i testem treści; dwie drogi Phong Nha z lotnisk; Cao Bằng i Ba Bể bez zmian, do przeglądu w punkcie kontrolnym.
- **Research, plan, zdjęcia (24–28):** research uzupełniony o stan z 2026 r.; osiem zadań; sucha próba jak w planie 1; punkt kontrolny z liczbami; zdjęcia za dwiema zgodami (zrobione 13.10.2026: miniatury, arkusze, 10 kopii 1920 px).

Doprecyzowania z suchej próby, do zatwierdzenia razem z planem:
- **Szybsza reguła.** Pierwsza wersja pytała o lot przy każdym ruchu (`legBetween`) i liczyła wszystkie ustawienia w 62 s zamiast 33 s. Teraz `travelGraph` zapisuje to raz dla całej sieci (`fly`), a druga warstwa tabeli działa tylko w trasie w obie strony: 43 s, te same trasy.
- **Zdanie o ryzyku miejsca w ramce:** pole `risk: true` w `SWAPS` i klucz `sw.risk.<id>`; ramki Cao Bằng i Hải Vân bez zmian.
- **Drogi z lotniska Hà Nội do Hà Giang i Sa Pa** mają tekst karty jak do Ninh Bình (`r.air_ninhbinh`: samochód z kierowcą albo minibus typu limousine).
- **Wiersz `fit` w researchu Hà Giang i Sa Pa** ma „gory 3” (bez „ó”), bo tak czyta go test danych (jak w notatce o Phong Nha); poprawione w researchu.
- **Test treści:** słowo „remoncie” na liście `NOT_PLURAL`, a płatne pozycje liczy się też w drugim dniu wyprawy (`hard.next`), gdzie stoi zejście z Fansipanu.
- **Sa Pa bez „Do pominięcia”:** research zostawił tę radę (nocny autobus) do decyzji, a sesja jej nie podjęła.
- **Opis strony w `tools/links.sh` bez zmian:** kod 406 od Sapa O'Chau nie zależy od nagłówków, tylko od liczby zapytań (zapora serwera).

## Koszt reguły silnika

Wszystkie 134 784 ustawienia miesięcy, liczone na danych po zadaniu 6, z regułą i bez niej (`REGION_H = 0`):

| | bez reguły | z regułą |
|---|---|---|
| lot z powrotem w okolicę wcześniejszego miejsca (do 3,5 h drogą, poza okolicą lotniska wylotu) | 6,6% tras | 2,4% |
| to samo do 6,5 h drogą (łapie lądowanie tuż za granicą regionu, w Phong Nha) | 11,0% | 3,1% |
| trasa w obie strony wraca samolotem do domu w środku i znowu odlatuje | 4,7% (6384 trasy, wszystkie przez Đà Nẵng) | 0 |
| lotów na trasę | 2,89 | 2,58 |
| dzień z dwoma lotami | 12,0% tras | 10,3% |
| Đà Nẵng: wszystkie trasy / bez zainteresowań / z morzem / z przyrodą | 32,2% / 42,6% / 55,3% / 27,5% | 37,0% / 48,2% / 59,1% / 30,8% |

- **Zmienia się 29 256 tras (21,7%).** Zmieniona trasa ma średnio o 0,99 punktu mniejszą wartość nocy (sezon razy dopasowanie, bez kosztu drogi); 7689 tras traci ponad 2 punkty, a 7161 zyskuje.
- **Z tras znikają** głównie miejsca zbierane zygzakiem: Đà Lạt (7815 tras), Huế (7695), Phong Nha (3543), Hồ Chí Minh City (3234). **Dochodzą** Pù Luông (7380), Đà Nẵng (6546), Ninh Bình (3600), Cúc Phương (2871), Sa Pa (2703) i Hà Giang (2391).
- **Reszta lotów z powrotem** (2,4%, 3210 tras) to w całości wypad z delty Mekongu na Phú Quốc i lot do Hồ Chí Minh City, 3,5 h drogi od delty; to nie zygzak, tylko wyspa po drodze.
- **Przykłady:**
  - zygzak z listy (Đà Nẵng → Hồ Chí Minh City, 28.01–14.02.2027, kultura i jedzenie, „Spokojnie”): bez reguły Hội An 2, ✈ Hà Nội 4, ✈ Huế 3, ✈ Đà Lạt 3, ✈ Mekong 2, Hồ Chí Minh City 3; z regułą Hội An 2, Huế 3, ✈ Ninh Bình 2, Cát Bà 3, Hà Nội 4, ✈ Hồ Chí Minh City 3;
  - trasa w obie strony (Đà Nẵng, styczeń, 18 dni, bez zainteresowań, „Spokojnie”): bez reguły Hội An 1, ✈ Phú Quốc 3, ✈ Hồ Chí Minh City 2, ✈ Đà Lạt 3, ✈ Huế 2, Phong Nha 3, ✈ Hà Nội 2, ✈ Hội An 1; z regułą Hội An 2, ✈ Phú Quốc 3, ✈ Hồ Chí Minh City 3, Cát Tiên 2, Đà Lạt 4, ✈ Huế 3, a z Huế drogą na lotnisko;
  - przykład recenzenta planu 1 (Đà Nẵng → Hồ Chí Minh City, maj 2027, 28 dni, morze): z `NEAR_H` Đà Nẵng dalej odpada, bo nie może stać na końcu trasy po powrocie drogą.
- **Ograniczenie:** silnik układa trasę jednym przejazdem wzdłuż kraju, więc nie umie „Hội An → Huế → ✈ Hà Nội → ✈ Đà Lạt”. Rozszerzenie o trasy w dwie strony od Đà Nẵng to osobna, większa zmiana (pełny test trwałby ok. 2,5 raza dłużej); nie ma jej w tym planie.
- **Czas:** silnik na wszystkich ustawieniach 43 s zamiast 33 s; pełny test ok. 100 s zamiast ok. 75 s.

## Jak działa strona po planie 2

1. **Ustawienia i trasa** działają jak dotąd: `apply` → `normSettings` → `planRoute` → `stopDays` → `tripBudget` → render → adres. Silnik ma regułę regionu lotniska, a dane dwa miejsca więcej.
2. **Dni pobytu:**
   - Hà Giang: pętla na 3 albo 4 dni; z przełącznikiem „Samodzielnie” wszystkie dni pętli mają wersję na motocyklu;
   - Sa Pa: na „Ekstremalnie” dwa dni Fansipanu z plakietką „Trudny dzień” i własnym planem „Gdy pada”;
   - Hang Én też ma własny plan na deszcz.
3. **Karty przejazdu:** drogi z lotniska Hà Nội do Hà Giang i Sa Pa oraz z lotnisk Đà Nẵng i Huế do Phong Nha mają własne teksty.
4. **Ramka „Samodzielnie”** w Hà Giang ma własne zdanie o ryzyku (kontrole od kwietnia 2026, wypadki) i własne rady (pozwolenie, zwrot motocykla w mieście).
5. **„Przed wyjazdem”:** Fansipan pieszo (7 dni wcześniej, z prośbą o numer licencji), pętla Hà Giang (auto albo easy rider), motocykl w Hà Giang, przewodnik w dolinie Mường Hoa, auto w Sa Pa; Đồng Văn i Du Già w linii noclegów u gospodarzy, z własnym zdaniem o porze gryki; pozwolenie na strefę przygraniczną w budżecie.
6. **Mapa:** Hà Giang z punktem Đồng Văn i Sa Pa w kadrze północy; znaczniki, które zachodziłyby na siebie, stoją obok siebie, a od przesuniętego biegnie kreska do kropki w prawdziwym miejscu.

## Struktura plików

| Plik | Odpowiada za |
|---|---|
| `site2/src/engine.js` | (zmiana) `REGION_H`, `fly` w `travelGraph`, reguła w `planRoute`, druga warstwa tabeli w trasie w obie strony |
| `site2/src/page.js` | (zmiana) `spreadPins` i jego miejsce w `mapLayout`; `variantOf` z `hard.rain` |
| `site2/src/app.js`, `template.html` | (zmiana) kreska do prawdziwego punktu przy przesuniętym znaczniku; zdanie o ryzyku miejsca w ramce „Samodzielnie” |
| `site2/src/content/hagiang.js`, `sapa.js` | (nowe) treść miejsc: dni na trzech poziomach, wersje „Samodzielnie” (Hà Giang), Fansipan (Sa Pa), wydarzenia |
| `site2/src/content/phongnha.js` | (zmiana) plan na deszcz wyprawy do Hang Én |
| `site2/src/places.js`, `seasons.js`, `climate.js`, `travel.js` | (zmiana) dwa miejsca, sezony, klimat, drogi; dwie drogi Phong Nha z lotnisk |
| `site2/src/content.js` | (zmiana) opis `hard.rain` i `risk`, `SWAPS.hagiang`, `AIR_KEYS`, `KEEP_TOGETHER` |
| `site2/src/costs.js`, `before.js`, `photos.js`, `ui.js` | (zmiana) ceny, rezerwacje, `HOMESTAYS`, zdjęcia i teksty nowych miejsc |
| `tests/*.test.js`, `tests/probes/map.js` | (zmiana) testy nowych mechanizmów, miejsc i danych |
| `notes/etapy.md`, `CLAUDE.md`, `notes/raport-tras-RRRR-MM-DD.md` | (zmiana, nowy) status, następny krok (etap 4), raport tras po planie 2 |

**Kolejność:**
- zadania idą po kolei; każde zakłada pliki po poprzednim, bo kroki zamieniają dokładny tekst;
- zadania 1–4 nie dotykają danych nowych miejsc, ale kroki zadań 5 i 6 zakładają je wszystkie (np. test drogi z lotniska Hà Nội stoi zaraz po teście dróg Phong Nha).

---

### Zadanie 1: Reguła regionu lotniska (`REGION_H`)

Zygzak z listy po planie 1 (Hội An, ✈ Hà Nội, ✈ Huế) i powroty do domu w środku trasy w obie strony (pytania 3 i 7). Region lotniska to miejsca najwyżej `REGION_H` = 6,5 h drogą od niego. Ruch między dwoma miejscami trasy:
- nie leci w region lotniska przylotu, chyba że miejsce leży też w regionie lotniska wylotu;
- nie wylatuje z regionu lotniska wylotu, chyba że miejsce leży też w regionie lotniska przylotu;
- w trasie w obie strony, po locie z zewnątrz w region domu, nie wylatuje już z tego regionu; drogą wyjechać może.

`NEAR_H` zostaje. „Najszybsza droga leci samolotem” znaczy to samo co na karcie przejazdu (`legBetween`), więc `travelGraph` zapisuje to raz dla każdej pary punktów (`fly`). Trzecia zasada potrzebuje drugiej warstwy tabeli w `planRoute` (`score[L]`, L = 1 po powrocie samolotem do domu), tylko w trasie w obie strony.

**Pliki:**
- Zmień: `site2/src/engine.js` (`REGION_H`, `travelGraph`, `planRoute`)
- Testy: `tests/engine.test.js` (dane zastępcze `ZG`), `tests/combos.test.js`, `tests/page.test.js`

**Interfejsy:**
- Daje:
  - `REGION_H = 6.5` (zmienna globalna; test ustawia 0, żeby wyłączyć regułę);
  - `travelGraph(roads, flights).fly[a][b]`: czy najszybsza droga z a do b leci samolotem;
  - `planRoute(st, data)` bez zmiany sygnatury.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/combos.test.js` zamień:

```js
    need(nights === st.days - 1, nights + ' nights, want ' + (st.days - 1));
```

na:

```js
    // no zigzag by plane around the airports' regions (REGION_H by road, see planRoute): no flight back into the region of
    // the arrival airport or out of the region of the departure airport, and on a round trip no flight out of the home
    // region after a flight back into it
    var homeAgain = false;
    function inRegion(x, airport) { return DATA.graph.road[airport][node(x.id)] <= REGION_H; }
    r.stops.forEach(function (x, i) {
      if (!i || !x.leg.flights) return;
      var y = r.stops[i - 1];
      need(!(inRegion(x, s.from) && !inRegion(x, s.to)), x.id + ': a flight back into the region of ' + s.from);
      need(!(inRegion(y, s.to) && !inRegion(y, s.from)), y.id + ': a flight out of the region of ' + s.to);
      if (s.from !== s.to) return;
      need(!(homeAgain && inRegion(y, s.from) && !inRegion(x, s.from)), y.id + ': a flight out of the home region after coming home by plane');
      if (inRegion(x, s.from) && !inRegion(y, s.from)) homeAgain = true;
    });
    need(nights === st.days - 1, nights + ' nights, want ' + (st.days - 1));
```

W `tests/engine.test.js` zamień:

```js
print('planning ok');
```

na:

```js

/* An airport's region (REGION_H by road) keeps a trip from zigzagging by plane: it never flies back into the region of
   its arrival airport nor out of the region of its departure airport to come back, and a round trip that came home by
   plane does not fly out again; by road it may (REGION_H 0 turns the rule off). a is the city of airport XA, b lies
   3 h from it by road; c lies far north by airport XC, e and d far south by airport XD, d its city; road: a road
   from c to b, 5 h, shorter than the way by plane. */
var ZG_D = 'DDDDDDDDDDDD';
var ZG_PLACES = {
  a: { axis: 5, nights: [1, 2, 2], level: 1, fit: { kultura: 3 } },
  b: { axis: 5.5, nights: [1, 2, 2], level: 1, fit: { przyroda: 3 } },
  c: { axis: 9, nights: [2, 3, 3], level: 1, fit: { przyroda: 3 } },
  e: { axis: 2, nights: [2, 2, 3], level: 1, fit: { przyroda: 3 } },
  d: { axis: 1, nights: [1, 2, 2], level: 1, fit: { kultura: 1 } }
};
function zgPlan(to, rule, road) {
  var roads = [['XA', 'a', 0.5], ['a', 'b', 3], ['XC', 'c', 0.5], ['XD', 'e', 1], ['XD', 'd', 0.5]].concat(road ? [['b', 'c', 5]] : []);
  var data = { places: ZG_PLACES, seasons: { a: ZG_D, b: ZG_D, c: ZG_D, e: ZG_D, d: ZG_D }, hubs: { XA: 'a', XD: 'd' },
    graph: travelGraph(roads, [['XA', 'XC', 1], ['XC', 'XD', 1.5], ['XA', 'XD', 1]]) };
  var keep = REGION_H, st = normSettings({ from: 'XA', to: to, month: 3, days: 10, interests: ['przyroda'] }, data.places, data.hubs);
  if (!rule) REGION_H = 0;
  var r = planRoute(st, data);
  REGION_H = keep;
  return r.ok ? r.stops.map(function (x) { return (x.leg.flights ? '✈' : '') + x.id + x.n; }).join(' ') : r.error;
}
eq([zgPlan('XD', false), zgPlan('XD', true), zgPlan('XD', true, true)], ['a1 ✈c3 ✈b2 ✈e3', 'a2 ✈c3 ✈e3 d1', 'a1 ✈c3 b2 ✈e3'],
  'from XA to XD: without the rule a flight from c back to b, by XA; with it b stays off, or comes by road');
eq([zgPlan('XA', false), zgPlan('XA', true), zgPlan('XA', true, true)], ['a1 ✈e2 ✈b2 ✈c3 ✈a1', 'a1 ✈d1 e3 ✈c3 ✈a1', 'a1 ✈e2 ✈b2 c3 ✈a1'],
  'a round trip from XA: without the rule home to b by plane and out again to c by plane; with it not, but out by road');
print('planning ok');
```

W `tests/page.test.js` zamień:

```js
print('stage 3 ok');
```

na:

```js
// no zigzag by plane around the airports' regions (REGION_H, plan 2): the zigzag from the list after plan 1 (Đà Nẵng to
// Hồ Chí Minh City, 28.01–14.02.2027, culture and food, level 1: Hội An, ✈ Hà Nội, ✈ Huế) and a round trip from Đà Nẵng
// that came home by plane in the middle and flew out again (January, 18 days: ✈ Đà Lạt, ✈ Huế, Phong Nha, ✈ Hà Nội)
function inRegionAll(id, airport) { return DATA_ALL.graph.road[airport][id] <= REGION_H; }
// the stops reached by a flight into the airport's region, and those left by a flight out of it after one came in
function flownInto(t, airport) {
  return t.r.stops.filter(function (x, i) { return i > 0 && x.leg.flights && inRegionAll(x.id, airport) && !inRegionAll(t.r.stops[i - 1].id, airport); })
    .map(function (x) { return x.id; });
}
function flownOutAgain(t, airport) {
  var home = false, out = [];
  t.r.stops.forEach(function (x, i) {
    if (!i || !x.leg.flights) return;
    var y = t.r.stops[i - 1].id;
    if (home && inRegionAll(y, airport) && !inRegionAll(x.id, airport)) out.push(y);
    if (inRegionAll(x.id, airport) && !inRegionAll(y, airport)) home = true;
  });
  return out;
}
var tZZ = tripAll({ from: 'DAD', to: 'SGN', start: '2027-01-28', end: '2027-02-14', interests: ['kultura', 'jedzenie'], level: 1 });
var tRT = tripAll({ from: 'DAD', to: 'DAD', month: 1, days: 18, interests: [], level: 1 });
eq([tZZ.r.stops[0].id, flownInto(tZZ, 'DAD'), flownInto(tRT, 'DAD').length > 0, flownOutAgain(tRT, 'DAD')], ['hoian', [], true, []],
  'Đà Nẵng to Hồ Chí Minh City: Hội An first, no flight back near Đà Nẵng; a round trip from Đà Nẵng comes home by plane and flies out no more');
print('stage 3 ok');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/engine.test.js`, ostatnie linie wyniku:

```
Exception: ReferenceError: Can't find variable: REGION_H
```

- [ ] **Krok 3: Kod.**

W `site2/src/engine.js` zamień:

```js
   its hours in the air plus AIRPORT_H. h: fastest door-to-door hours; road: fastest by road only. */
```

na:

```js
   its hours in the air plus AIRPORT_H. h: fastest door-to-door hours; road: fastest by road only; fly: whether the
   fastest way takes a plane (as legBetween walks it). */
```

W `site2/src/engine.js` zamień:

```js
  return { nodes: nodes, h: h, road: road, next: next, nextRoad: nextRoad, edge: edge };
```

na:

```js
  var g = { nodes: nodes, h: h, road: road, next: next, nextRoad: nextRoad, edge: edge, fly: {} };
  nodes.forEach(function (a) {
    g.fly[a] = {};
    nodes.forEach(function (b) { var l = legBetween(g, a, b); g.fly[a][b] = !!l && l.flights > 0; });
  });
  return g;
```

W `site2/src/engine.js` zamień:

```js
var NEAR_H = 1;           // a place this close by road to an airport's city (Đà Nẵng to Hội An) goes right next to it

```

na:

```js
var NEAR_H = 1;           // a place this close by road to an airport's city (Đà Nẵng to Hội An) goes right next to it
var REGION_H = 6.5;       // an airport's region: the places this close to it by road (from Đà Nẵng: Hội An, Huế, Phong Nha)

```

W `site2/src/engine.js` zamień:

```js
   (Hội An, a flight away, then Đà Nẵng).
```

na:

```js
   (Hội An, a flight away, then Đà Nẵng). Nor does a trip zigzag by plane around its airports' regions (the places
   within REGION_H by road of an airport): it never flies back into the region of its arrival airport, nor out of the
   region of its departure airport to come back to it (Hội An, a flight to Hà Nội, a flight back to Huế), and a round
   trip that came home by plane does not fly out again (Hội An, a flight south, a flight back to Huế, a flight north).
```

W `site2/src/engine.js` zamień:

```js
  function nightsOf(id) { var out = []; for (var n = P[id].nights[0]; n <= P[id].nights[2]; n++) out.push(n); return out; }

```

na:

```js
  function nightsOf(id) { var out = []; for (var n = P[id].nights[0]; n <= P[id].nights[2]; n++) out.push(n); return out; }
  function flies(a, b) { return G.fly[node(a)][node(b)]; }   // the fastest way from a to b takes a plane
  function inRegion(id, airport) { return G.road[airport][node(id)] <= REGION_H; }
  // a move from a to b that flies back into the arrival airport's region or out of the departure airport's region
  // (never on a round trip, whose two regions are one: see homeBy and awayBy)
  function zigzag(a, b) {
    return flies(a, b) && (inRegion(b, st.from) && !inRegion(b, st.to) || inRegion(a, st.to) && !inRegion(a, st.from));
  }
  // on a round trip: a flight from outside into the home region (the airport's), and a flight out of it
  var round = st.from === st.to;
  function homeBy(a, b) { return round && flies(a, b) && inRegion(b, st.from) && !inRegion(a, st.from); }
  function awayBy(a, b) { return round && flies(a, b) && inRegion(a, st.from) && !inRegion(b, st.from); }

```

W `site2/src/engine.js` zamień:

```js
    var m = order.length, score = [], back = [], i, j, t, k;
    for (i = 0; i < m; i++) { score.push([]); back.push([]); for (t = 0; t <= N; t++) { score[i].push(-Infinity); back[i].push(null); } }
```

na:

```js
    // score[L][i][t]: the best trip to the stop at order[i] that ends its night t; L is 1 once a round trip came home by plane
    var m = order.length, layers = round ? 2 : 1, score = [[], []], back = [[], []], i, j, t, k, L;
    for (L = 0; L < layers; L++) for (i = 0; i < m; i++) {
      score[L].push([]); back[L].push([]);
      for (t = 0; t <= N; t++) { score[L][i].push(-Infinity); back[L][i].push(null); }
    }
```

W `site2/src/engine.js` zamień:

```js
    function better(i, t, v, how) { if (v > score[i][t] + 1e-9) { score[i][t] = v; back[i][t] = how; } }
```

na:

```js
    function better(L, i, t, v, how) { if (v > score[L][i][t] + 1e-9) { score[L][i][t] = v; back[L][i][t] = how; } }
```

W `site2/src/engine.js` zamień:

```js
        if (aj !== null && g1 !== null) better(j, n, g1 - aj, { kind: 'start' });
```

na:

```js
        if (aj !== null && g1 !== null) better(0, j, n, g1 - aj, { kind: 'start' });
```

W `site2/src/engine.js` zamień:

```js
          if (g !== null) better(j, k + n, ov + g - hj, { kind: 'open', k: k });
```

na:

```js
          if (g !== null) better(0, j, k + n, ov + g - hj, { kind: 'open', k: k });
```

W `site2/src/engine.js` zamień:

```js
        var c = hop(order[i], id);
```

na:

```js
        if (zigzag(order[i], id)) continue;
        var c = hop(order[i], id);
```

W `site2/src/engine.js` zamień:

```js
        for (t = 1; t < N; t++) {
          if (score[i][t] === -Infinity) continue;
          for (k = 0; k < nj.length; k++) {
            var g2 = val(id, t + 1, nj[k]);
            if (g2 !== null) better(j, t + nj[k], score[i][t] + g2 - c, { kind: 'stop', i: i, t: t });
```

na:

```js
        for (L = 0; L < layers; L++) {
          if (L && awayBy(order[i], id)) continue;   // a round trip that came home by plane does not fly out again
          var L2 = L || homeBy(order[i], id) ? 1 : 0;
          for (t = 1; t < N; t++) {
            if (score[L][i][t] === -Infinity) continue;
            for (k = 0; k < nj.length; k++) {
              var g2 = val(id, t + 1, nj[k]);
              if (g2 !== null) better(L2, j, t + nj[k], score[L][i][t] + g2 - c, { kind: 'stop', i: i, t: t, L: L });
            }
```

W `site2/src/engine.js` zamień:

```js
    for (i = 0; i < m; i++) {
      if (score[i][N] > -Infinity && depart(order[i]) !== null) end(score[i][N] - depart(order[i]), { i: i, t: N });
```

na:

```js
    for (L = 0; L < layers; L++) for (i = 0; i < m; i++) {
      if (score[L][i][N] > -Infinity && depart(order[i]) !== null) end(score[L][i][N] - depart(order[i]), { L: L, i: i, t: N });
```

W `site2/src/engine.js` zamień:

```js
        if (score[i][t] === -Infinity) continue;
        var vl = close(t);
        if (vl !== null) end(score[i][t] + vl - cl, { i: i, t: t, last: N - t });
```

na:

```js
        if (score[L][i][t] === -Infinity) continue;
        var vl = close(t);
        if (vl !== null) end(score[L][i][t] + vl - cl, { L: L, i: i, t: t, last: N - t });
```

W `site2/src/engine.js` zamień:

```js
      i = how.i; t = how.t;
```

na:

```js
      L = how.L; i = how.i; t = how.t;
```

W `site2/src/engine.js` zamień:

```js
        var b = back[i][t], prevT = b.kind === 'stop' ? b.t : b.kind === 'open' ? b.k : 0;
```

na:

```js
        var b = back[L][i][t], prevT = b.kind === 'stop' ? b.t : b.kind === 'open' ? b.k : 0;
```

W `site2/src/engine.js` zamień:

```js
        i = b.i; t = b.t;
```

na:

```js
        L = b.L; i = b.i; t = b.t;
```

- [ ] **Krok 4: Testy, build i sondy**

Pełny test, build i grep:

```bash
bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`; build bez błędów; grep nic nie wypisuje.

Sondy, czyli 14 sprawdzeń zbudowanej strony w Chrome bez okna. Plik `$TMPDIR/sondy-3a2.sh` powstaje tutaj, a kolejne zadania tylko go uruchamiają; argument to miesiąc (`MIESIAC` albo `RRRR-MM`):

```bash
cat > "$TMPDIR/sondy-3a2.sh" <<'EOF'
#!/bin/bash
# The 14 probes of the checkpoint for one month (MIESIAC: five months from today); prints a line for each failure.
M=${1:-MIESIAC}
A="od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang"
B="od=SGN&do=HAN&miesiac=$M&dni=15&co=&poziom=2"
bad=0
run() { bash tests/probe.sh "tests/probes/$1" "$2" "$3" > "$TMPDIR/sonda.txt" 2>&1 && grep -q "done, all checks ok" "$TMPDIR/sonda.txt" || { bad=$((bad+1)); echo "FAIL $1 $2 $3"; grep -iE "fail|error" "$TMPDIR/sonda.txt" | head -5; }; }
for w in 390 641 768 901 1100 1400; do run before.js $w "$A"; done
for w in 390 360 320; do run settings.js $w "$B"; done
run map.js 1400 "$B"
run changes.js 1400 "$B"
run changes.js 1400 "od=HAN&do=HAN&miesiac=$M&dni=14&co=przyroda,gory&poziom=2"
run anchors.js 390 "$B"
run link.js 1400 "od=HAN&do=DAD&miesiac=$M&dni=12&co=kultura&poziom=3"
echo "sondy ($M): $bad z 14 nie przeszło"
EOF
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
bash "$TMPDIR/sondy-3a2.sh" 2027-05
bash "$TMPDIR/sondy-3a2.sh" 2027-10
```

Oczekiwane: trzy razy ostatnia linia `sondy (…): 0 z 14 nie przeszło`.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/engine.js tests/combos.test.js tests/engine.test.js tests/page.test.js
git commit -F - <<'EOF'
Silnik: reguła regionu lotniska. Trasa nie wraca samolotem w okolicę lotniska przylotu (6,5 h drogą), nie odlatuje z okolicy lotniska wylotu, żeby do niej wrócić, a trasa w obie strony po powrocie samolotem do domu już stamtąd nie odlatuje; NEAR_H zostaje. Testy: mapa zastępcza, każda kombinacja, zygzak z listy i trasa w obie strony przez Đà Nẵng

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 2: Znaczniki, które zachodzą na siebie (`spreadPins`)

Cúc Phương i Ninh Bình leżą na mapie 12 px od siebie, a znacznik ma 20 px, więc na ok. 22% tras zachodzą na siebie (punkt kontrolny planu 1). Znaczniki, które zachodzą, odsuwają się wzdłuż linii między nimi, każdy o połowę, aż dzieli je `PIN_GAP` = 2 px. Każdy pamięta prawdziwy punkt (`px`, `py`), a strona rysuje do niego cienką kreskę z kropką, jak przy lotnisku zsuniętym ze znacznika. Znacznik rusza się tylko wewnątrz kadru, a to, czego jeden nie może, robi drugi. Etykiety idą za znacznikiem. Przy przesunięciu o 5 px kreska i kropka chowają się pod znacznikiem; to w porządku.

**Pliki:**
- Zmień: `site2/src/page.js` (`spreadPins`, `mapLayout`), `site2/src/app.js` (`renderMap`), `site2/src/template.html` (`.m-pin-dot`)
- Testy: `tests/page.test.js`, `tests/combos.test.js`, `tests/probes/map.js`

**Interfejsy:**
- Daje:
  - `spreadPins(pins, p)`: przesuwa znaczniki w miejscu i je zwraca; `PIN_GAP = 2`;
  - znacznik z `mapLayout` ma `px`, `py` (prawdziwy punkt) obok `x`, `y` (gdzie stoi).

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/combos.test.js` zamień:

```js
      P.labels.forEach(function (l) { need(l.kind === 'faint' || l.clear, 'map ' + P.key + ': the label of ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
    });
```

na:

```js
      P.labels.forEach(function (l) { need(l.kind === 'faint' || l.clear, 'map ' + P.key + ': the label of ' + l.kind + ' ' + l.key + ' covers another label, a marker or the edge'); });
      // no two pins overlap (spreadPins)
      P.pins.forEach(function (a, i) {
        P.pins.slice(i + 1).forEach(function (b) {
          need(overlapArea({ x: a.x - a.w / 2, y: a.y - PIN_H / 2, w: a.w, h: PIN_H }, { x: b.x - b.w / 2, y: b.y - PIN_H / 2, w: b.w, h: PIN_H }) === 0,
            'map ' + P.key + ': the pins of ' + a.key + ' and ' + b.key + ' overlap');
        });
      });
    });
```

W `tests/page.test.js` zamień:

```js
var MAPW = { panels: MAP_PANELS, places: OLD_PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
```

na:

```js
// pins that overlap move apart along the line between them, just enough for PIN_GAP px, and keep their points
function spread(pins) {
  return spreadPins(pins.map(function (q) { return { x: q[0], y: q[1], w: q[2] || PIN_H }; }), { w: 270, h: 270 })
    .map(function (pn) { return [Math.round(pn.x * 100) / 100, Math.round(pn.y * 100) / 100, pn.px, pn.py]; });
}
eq([spread([[100, 100], [112, 100]]), spread([[100, 100], [100, 110]]), spread([[100, 100], [130, 100]]), spread([[100, 100], [100, 100]]), spread([[5, 100], [10, 100]])],
  [[[95, 100, 100, 100], [117, 100, 112, 100]], [[100, 94, 100, 100], [100, 116, 100, 110]], [[100, 100, 100, 100], [130, 100, 130, 100]],
   [[89, 100, 100, 100], [111, 100, 100, 100]], [[10, 100, 5, 100], [32, 100, 10, 100]]],
  'pins 12 px apart in a row move to 22 px, one above the other to 22 px; pins apart stay; two on one point go sideways; at the edge the other pin moves');
var MAPW = { panels: MAP_PANELS, places: OLD_PLACES, content: CONTENT, airports: AIRPORTS, say: function (k) { return UI.pl[k]; } };
```

W `tests/page.test.js` zamień:

```js
print('stage 3 ok');
```

na:

```js
// Cúc Phương and Ninh Bình on one trip: their pins move apart on the map, each with its point where the place is
var tCN = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 10, interests: ['przyroda'], level: 2, add: ['cucphuong', 'ninhbinh'] });
var pCN = mapLayout(tCN.r, tCN.st, MAPW_ALL).panels[0].pins.filter(function (pn) { return pn.key === 'cucphuong' || pn.key === 'ninhbinh'; });
function pinBoxOf(pn) { return { x: pn.x - pn.w / 2, y: pn.y - PIN_H / 2, w: pn.w, h: PIN_H }; }
var nP = panelSize(MAP_PANELS.north);
eq([pCN.length, overlapArea(pinBoxOf(pCN[0]), pinBoxOf(pCN[1])), pCN.map(function (pn) { return [pn.px, pn.py]; }),
  pCN.every(function (pn) { return pn.x !== pn.px; })],
  [2, 0, pCN.map(function (pn) { var c = CONTENT[pn.key].pt; return [(c[1] - nP.lon0) * nP.s, (nP.lat0 - c[0]) * nP.s]; }), true],
  'Cúc Phương and Ninh Bình: two pins apart, each moved off its point, which it keeps');
print('stage 3 ok');
```

W `tests/probes/map.js` zamień:

```js
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker, a degree, the title or the edge', !bad.length, bad.join('; '));
  });
```

na:

```js
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker, a degree, the title or the edge', !bad.length, bad.join('; '));
    // no two pins overlap as Chrome draws them (pins that would overlap move apart: spreadPins in page.js)
    var touch = [];
    Array.prototype.forEach.call(panels, function (g) {
      var pins = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) { return { key: p.getAttribute('data-pin'), r: p.querySelector('rect').getBoundingClientRect() }; });
      pins.forEach(function (a, i) { pins.slice(i + 1).forEach(function (b) { if (inter(a.r, b.r) > 1) touch.push(a.key + ' / ' + b.key); }); });
    });
    check(x.from + '→' + x.to + ', ' + x.days + ' days: no two pins overlap', !touch.length, touch.join('; '));
  });
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: ReferenceError: Can't find variable: spreadPins
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
      // the pins last, each with its label in one group, so the stay being read lights up both (observeStops)
```

na:

```js
      // a pin moved off its point (spreadPins in page.js): a line to the point
      P.pins.forEach(function (pn) {
        if (Math.abs(pn.x - pn.px) + Math.abs(pn.y - pn.py) <= 0.5) return;
        g.push('<line class="m-lead" x1="' + r1(pn.px) + '" y1="' + r1(pn.py) + '" x2="' + r1(pn.x) + '" y2="' + r1(pn.y) + '"/><circle class="m-pin-dot" cx="' + r1(pn.px) + '" cy="' + r1(pn.py) + '" r="2"/>');
      });
      // the pins last, each with its label in one group, so the stay being read lights up both (observeStops)
```

W `site2/src/page.js` zamień:

```js
function overlapArea(a, b) {
```

na:

```js
/* Pins that overlap move apart along the line between them, each half the way, just enough to leave PIN_GAP px between
   them (Cúc Phương and Ninh Bình lie 12 px apart on the map, a pin is 20 px wide): each keeps its point as px, py, for a
   line to it. A pin moves only inside the panel, and what one cannot move the other does. Pins in a cluster are pushed
   pair by pair, a few rounds. pins: [{ x, y, w }] (mapLayout's), changed in place; p: the panel (panelSize). */
var PIN_GAP = 2;
function spreadPins(pins, p) {
  function shift(pn, dx, dy) {   // moves a pin, kept inside the panel; returns the move it made
    var x = Math.min(Math.max(pn.x + dx, pn.w / 2), p.w - pn.w / 2), y = Math.min(Math.max(pn.y + dy, PIN_H / 2), p.h - PIN_H / 2);
    var made = [x - pn.x, y - pn.y];
    pn.x = x; pn.y = y;
    return made;
  }
  pins.forEach(function (pn) { pn.px = pn.x; pn.py = pn.y; });
  for (var round = 0; round < 10; round++) {
    var moved = false;
    pins.forEach(function (a, i) {
      pins.slice(i + 1).forEach(function (b) {
        var dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy), W = (a.w + b.w) / 2 + PIN_GAP, H = PIN_H + PIN_GAP;
        if (Math.abs(dx) >= W - 1e-9 || Math.abs(dy) >= H - 1e-9) return;   // apart already
        var ux = d < 0.5 ? 1 : dx / d, uy = d < 0.5 ? 0 : dy / d;
        var need = Math.min(Math.abs(ux) > 1e-9 ? W / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-9 ? H / Math.abs(uy) : Infinity) - (d < 0.5 ? 0 : d);
        var made = shift(a, -ux * need / 2, -uy * need / 2);
        shift(b, ux * need + made[0], uy * need + made[1]);
        moved = true;
      });
    });
    if (!moved) break;
  }
  return pins;
}
function overlapArea(a, b) {
```

W `site2/src/page.js` zamień:

```js
   one pin); the legs inside it; a stub for the legs to another panel, one per point, toward where they go, with the names
```

na:

```js
   one pin; pins that would overlap move apart, spreadPins); the legs inside it; a stub for the legs to another panel, one per point, toward where they go, with the names
```

W `site2/src/page.js` zamień:

```js
   grid is [{ lat, y, label }] (label: its text is drawn), a name { text, kind, x, y, anchor }, a label { kind:
```

na:

```js
   a pin is { key, x, y, w, nums, px, py }: px, py its point, x, y where it is drawn;
   grid is [{ lat, y, label }] (label: its text is drawn), a name { text, kind, x, y, anchor }, a label { kind:
```

W `site2/src/page.js` zamień:

```js
    P.pins.forEach(function (pn) { obstacles.push(pinBox(pn)); });
```

na:

```js
    spreadPins(P.pins, p);   // pins that would overlap move apart, and their labels with them
    P.pins.forEach(function (pn, i) { items[i].x = pn.x; items[i].y = pn.y; });
    P.pins.forEach(function (pn) { obstacles.push(pinBox(pn)); });
```

W `site2/src/template.html` zamień:

```html
.m-apt-dot { fill: var(--ink); }
```

na:

```html
.m-apt-dot, .m-pin-dot { fill: var(--ink); }
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`; build bez błędów; grep nic nie wypisuje; przy każdym miesiącu ostatnia linia sond `sondy (…): 0 z 14 nie przeszło` (plik sond z zadania 1, krok 4).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/app.js site2/src/page.js site2/src/template.html tests/combos.test.js tests/page.test.js tests/probes/map.js
git commit -F - <<'EOF'
Mapa: znaczniki, które zachodzą na siebie (Cúc Phương i Ninh Bình), odsuwają się wzdłuż łączącej je linii, aż dzielą je 2 px, z kreską do prawdziwego punktu; test czystej funkcji, trasy z obu miejscami, każdej kombinacji i kontrola w sondzie map.js

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 3: Własny plan na deszcz wyprawy (`hard.rain`)

Wyprawa na dwa dni zastępuje inny dzień, więc plan „Gdy pada” tamtego dnia mówi o czymś innym: pod Hang Én stała kładka i trasa 7 km w Paradise Cave (lista „Do etapu 3”). Trudna wersja może mieć własny plan na deszcz i wtedy nie bierze planu dnia; wyprawa na dwa dni musi go mieć (test treści). Hang Én mówi, co robi Oxalis przy ulewach (`research/phongnha-2026-10.md`: JB-HE, VNS-2018). Drugi dzień wyprawy, jak dotąd, nie ma planu na deszcz. Fansipan dostaje swój w zadaniu 6.

**Pliki:**
- Zmień: `site2/src/page.js` (`variantOf`), `site2/src/content.js` (opis pól dnia), `site2/src/content/phongnha.js`
- Testy: `tests/content.test.js`, `tests/page.test.js`

**Interfejsy:**
- Daje: w treści dnia `hard.rain` (tekst po „Gdy pada: ”, od małej litery); `variantOf` daje go trudnej wersji zamiast `rain` dnia.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off', 'late', 'next']);
```

na:

```js
        plan(w + ' hard', d.hard, ['pace', 't', 'd', 'early', 'off', 'late', 'next', 'rain']);
        if (d.hard.rain != null) need(isText(d.hard.rain), w + ' hard: rain is a text');
```

W `tests/content.test.js` zamień:

```js
          need(d.hard.late === true, w + ' hard: a version over two days spends its night away (late: true)');
        }
```

na:

```js
          need(d.hard.late === true, w + ' hard: a version over two days spends its night away (late: true)');
          // the day's rain plan is for another day: an expedition says what its operator does in heavy rain
          need(isText(d.hard.rain), w + ' hard: a version over two days has its own rain plan (hard.rain)');
        }
```

W `tests/page.test.js` zamień:

```js
// a stay of a place on a trip found with Dodaj (the place asked for), so that later places do not move the check
```

na:

```js
// an expedition has its own rain plan, not that of the day it replaces; its second day has none; the usual day keeps its own
var rainPN = function (level) { return stopDays(CONTENT.phongnha, { n: 3, start: 1 }, 0, level, [2, 2, 2]).map(function (d) { return d.rain; }); };
eq([rainPN(3)[1] === CONTENT.phongnha.days[1].hard.rain, rainPN(3)[2], rainPN(2)[1] === CONTENT.phongnha.days[1].rain], [true, null, true],
  'Phong Nha in March: Hang Én with its own rain plan, none on its second day; at level 2 the day of Paradise Cave keeps its own');
// a stay of a place on a trip found with Dodaj (the place asked for), so that later places do not move the check
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: Phong Nha in March: Hang Én with its own rain plan, none on its second day; at level 2 the day of Paradise Cave keeps its own: got [false,null,true], want [true,null,true]
```

- [ ] **Krok 3: Kod.**

W `site2/src/content.js` zamień:

```js
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off?, late?, next? }; off: the months 1–12 it is not offered;
```

na:

```js
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off?, late?, next?, rain? }; off: the months 1–12 it is not offered;
     rain: its own plan for a wet day, which a version over two days (next) has, as the day's rain plan is for another day;
```

W `site2/src/content.js` zamień:

```js
     a version keeps the day's early start unless it sets its own, and the day's rain plan;
```

na:

```js
     a version keeps the day's early start unless it sets its own, and the day's rain plan unless a hard version has its own;
```

W `site2/src/content/phongnha.js` zamień:

```js
      hard: { pace: 'hike', late: true, off: [9, 10, 11], cost: ['phongnha.hangen'], pack: ['swim'], t: 'Hang Én: w dół do Rào Thương i noc w jaskini', d: 'Dwudniowa wyprawa z Oxalis, jedynym operatorem z pozwoleniem prowincji na tę trasę; prowadzą przewodnicy z asystentami bezpieczeństwa. Odbiór z hotelu o 7:30–8:00, strome zejście do potoku Rào Thương, brody, obiad w wiosce Đoòng, dalej dżunglą do jaskini Nước Lạnh, a nocleg w obozie w Hang Én. Wieczorem kąpiel w jeziorku i kolacja w jaskini. Oxalis wymaga dobrej kondycji (w ostatnim roku wędrówki po co najmniej 6 km i 500 m w górę) i wieku 16–70 lat, a dane o zdrowiu zbiera 45 dni przed wyjściem, więc zarezerwuj ok. 2 miesiące wcześniej. Ten sam operator prowadzi dłuższe wyprawy, np. Tú Làn na 4–5 dni i Hang Va z linami, a Sơn Đoòng, największa jaskinia świata, jest wyprzedana na kilka lat naprzód.',
```

na:

```js
      hard: { pace: 'hike', late: true, off: [9, 10, 11], cost: ['phongnha.hangen'], pack: ['swim'], t: 'Hang Én: w dół do Rào Thương i noc w jaskini',
        rain: 'przy ulewach Oxalis odwołuje wyprawę, a woda w Hang Én opada dopiero po kilku dniach: zostaje kilometr kładki w Paradise Cave, która leży wysoko i działa prawie zawsze.', d: 'Dwudniowa wyprawa z Oxalis, jedynym operatorem z pozwoleniem prowincji na tę trasę; prowadzą przewodnicy z asystentami bezpieczeństwa. Odbiór z hotelu o 7:30–8:00, strome zejście do potoku Rào Thương, brody, obiad w wiosce Đoòng, dalej dżunglą do jaskini Nước Lạnh, a nocleg w obozie w Hang Én. Wieczorem kąpiel w jeziorku i kolacja w jaskini. Oxalis wymaga dobrej kondycji (w ostatnim roku wędrówki po co najmniej 6 km i 500 m w górę) i wieku 16–70 lat, a dane o zdrowiu zbiera 45 dni przed wyjściem, więc zarezerwuj ok. 2 miesiące wcześniej. Ten sam operator prowadzi dłuższe wyprawy, np. Tú Làn na 4–5 dni i Hang Va z linami, a Sơn Đoòng, największa jaskinia świata, jest wyprzedana na kilka lat naprzód.',
```

W `site2/src/page.js` zamień:

```js
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: day.rain || null, variant: v,
```

na:

```js
  return { pace: src.pace, t: src.t, d: src.d, early: !!(src.early != null ? src.early : day.early), rain: (v === 'hard' && day.hard.rain ? day.hard.rain : day.rain) || null, variant: v,
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; przy każdym miesiącu ostatnia linia sond `sondy (…): 0 z 14 nie przeszło` (plik sond z zadania 1, krok 4).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/content.js site2/src/content/phongnha.js site2/src/page.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Trudna wersja z własnym planem na deszcz (hard.rain): wyprawa na dwa dni nie bierze planu „Gdy pada” dnia, który zastępuje; Hang Én mówi, co robi Oxalis przy ulewach; test treści wymaga takiego planu przy każdej wyprawie na dwa dni

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 4: Drogi Phong Nha z lotnisk Đà Nẵng i Huế

Dwie drogi z researchu Phong Nha bez odpowiednika w danych (lista „Do etapu 3”): z lotniska Đà Nẵng 5,5 h (dziś strona liczy 6 h przez miasto) i z lotniska Huế 3,75 h (szacunek researchu: droga z Huế plus 15 min, bez przejazdu przez miasto; dziś 4 h). Każda ma tekst karty z tabeli „Zestawienie: drogi z lotnisk” i samochód na liście rezerwacji. Na wszystkich 134 784 ustawieniach żadna trasa się nie zmienia; krótsze są tylko te przejazdy.

**Pliki:**
- Zmień: `site2/src/travel.js`, `site2/src/content.js` (`AIR_KEYS`), `site2/src/ui.js`
- Testy: `tests/page.test.js`

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/page.test.js` zamień:

```js
var arrive = { segs: [{ mode: 'road', from: 'HAN', to: 'catba', h: 4 }] }, leave = { segs: [{ mode: 'road', from: 'cattien', to: 'SGN', h: 3.75 }, { mode: 'fly', from: 'SGN', to: 'HAN', h: 2.2 }] };
```

na:

```js
// Phong Nha from the airports of Đà Nẵng and Huế (plan 2): its own roads, on the expressway, each with its text
eq([air('DAD', 'phongnha'), air('phongnha', 'HUI'), legBetween(DATA_ALL.graph, 'DAD', 'phongnha', true).total, legBetween(DATA_ALL.graph, 'HUI', 'phongnha', true).total],
  [['r.air_phongnha_dad', {}], ['r.air_phongnha_hui', {}], 5.5, 3.75], 'Phong Nha from Đà Nẵng airport (5½ h) and from Huế airport (3¾ h): roads of their own, with their texts');
var arrive = { segs: [{ mode: 'road', from: 'HAN', to: 'catba', h: 4 }] }, leave = { segs: [{ mode: 'road', from: 'cattien', to: 'SGN', h: 3.75 }, { mode: 'fly', from: 'SGN', to: 'HAN', h: 2.2 }] };
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: Error: Phong Nha from Đà Nẵng airport (5½ h) and from Huế airport (3¾ h): roads of their own, with their texts: got [["r.taxi_from",{"x":"Đà Nẵng"}],["r.taxi_to",{"x":"Huế"}],6,4], want [["r.air_phongnha_dad",{}],["r.air_phongnha_hui",{}],5.5,3.75]
```

- [ ] **Krok 3: Kod.**

W `site2/src/content.js` zamień:

```js
  // Cúc Phương: a car from Nội Bài; from Thọ Xuân a taxi, but the way back is booked through the park
```

na:

```js
  // Phong Nha: a car from the airports of Đà Nẵng and Huế, on the expressway
  'DAD-phongnha': { text: 'r.air_phongnha_dad', book: true }, 'HUI-phongnha': { text: 'r.air_phongnha_hui', book: true },
  // Cúc Phương: a car from Nội Bài; from Thọ Xuân a taxi, but the way back is booked through the park
```

W `site2/src/travel.js` zamień:

```js
  ['VDH', 'phongnha', 1], ['hue', 'phongnha', 3.5], ['hoian', 'phongnha', 6.25], ['ninhbinh', 'phongnha', 6.5], ['puluong', 'phongnha', 8.25],
```

na:

```js
  ['VDH', 'phongnha', 1], ['DAD', 'phongnha', 5.5], ['HUI', 'phongnha', 3.75], ['hue', 'phongnha', 3.5], ['hoian', 'phongnha', 6.25], ['ninhbinh', 'phongnha', 6.5], ['puluong', 'phongnha', 8.25],
```

W `site2/src/ui.js` zamień:

```js
  'r.haivan_self': 'Motocykl wypożyczony w jedną stronę, przez przełęcz Hải Vân z postojem nad laguną Lăng Cô; bagaż jedzie autem, a do tunelu motocykle nie wjeżdżają, więc we mgle zwolnij albo przeczekaj',
```

na:

```js
  'r.air_phongnha_dad': 'Samochód z kierowcą zamówiony wcześniej, autostradą, bez przełęczy Hải Vân',
  'r.air_phongnha_hui': 'Samochód z kierowcą zamówiony wcześniej, autostradą na północ',
  'r.haivan_self': 'Motocykl wypożyczony w jedną stronę, przez przełęcz Hải Vân z postojem nad laguną Lăng Cô; bagaż jedzie autem, a do tunelu motocykle nie wjeżdżają, więc we mgle zwolnij albo przeczekaj',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
```

Oczekiwane: `ALL PASS`; build bez błędów; grep nic nie wypisuje; przy każdym miesiącu ostatnia linia sond `sondy (…): 0 z 14 nie przeszło` (plik sond z zadania 1, krok 4).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/content.js site2/src/travel.js site2/src/ui.js tests/page.test.js
git commit -F - <<'EOF'
Dwie drogi Phong Nha z researchu w danych: z lotniska Đà Nẵng 5,5 h i z lotniska Huế 3,75 h, każda z tekstem karty przejazdu; żadna trasa się nie zmienia, krótsze są tylko te przejazdy

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 5: Hà Giang

Pierwsze z dwóch miejsc, z `research/hagiang-2026-10.md` i pytań 1, 2 i 4:
- **dane:**
  - `hagiang` na osi 22,83, noce [4, 4, 5], poziom 1, `fit`: kultura 2, jedzenie 0, przyroda 2, góry 3, morze 0;
  - sezon `SSSDSZSSSDDS` i klimat ze stacji w mieście Hà Giang;
  - drogi: Hà Nội 6,5 h, lotnisko Hà Nội 5,75 h (tekst karty jak do Ninh Bình), Cao Bằng 8 h, Ba Bể 7 h;
- **treść:** pięć planów dni (wieczór w mieście; Quản Bạ i Yên Minh do Đồng Văn; Lũng Cú tylko przy 5 nocach; Mã Pí Lèng, kanion Nho Quế i Du Già; powrót), każdy z wersją „Spokojnie” (auto), „Samodzielnie” (motocykl) i planem na deszcz; bez trudnego dnia; perełka, „Do pominięcia” i pięć wydarzeń (zimna pora i pora deszczowa jako ostrzeżenia);
- **przełącznik:** `SWAPS.hagiang = { place: 'hagiang', risk: true }`; ramka „Samodzielnie” dokłada własne zdanie o ryzyku (`sw.risk.hagiang`: kontrole od 12.04.2026, dwa wypadki z 2026 r.) i własne rady (`sw.tips.hagiang`: motocykl z miasta i z powrotem, pozwolenie);
- **pozwolenie na strefę przygraniczną:** zdanie w dniu przyjazdu, we wszystkich wersjach, i pozycja `hagiang.permit` (9 EUR na osobę);
- **ceny i rezerwacje:** noc 14–52 EUR, auto 88–133 EUR za dzień, easy rider 18–34, motocykl 8–23; ZingHome do linków; Hà Giang w `HOMESTAYS` i `HOMESTAY_NOTES` (Đồng Văn i Du Già w porze gryki 2–3 tygodnie wcześniej);
- **mapa:** kolor 19, punkt Đồng Văn; kadr północy bez zmian;
- **zdjęcia:** `hagiang_0`–`4`.

**Pliki:**
- Utwórz: `site2/src/content/hagiang.js`
- Zmień: `site2/src/places.js`, `site2/src/seasons.js`, `site2/src/climate.js`, `site2/src/travel.js`, `site2/src/content.js` (`SWAPS`, `AIR_KEYS`), `site2/src/costs.js`, `site2/src/before.js`, `site2/src/photos.js`, `site2/src/ui.js`, `site2/src/app.js` (zdanie o ryzyku w ramce)
- Testy: `tests/content.test.js` (rodzina kluczy `sw.risk.`, pole `risk`, „remoncie” w `NOT_PLURAL`), `tests/page.test.js`

**Interfejsy:**
- Bierze: regułę regionu lotniska z zadania 1 (Hà Giang leży w regionie Hà Nội, 5,75 h drogą od lotniska).
- Daje: pole `risk` w `SWAPS` i klucze `sw.risk.<id>`; `AIR_KEYS['HAN-hagiang']`; `COSTS.items` `hagiang.car`, `hagiang.easyrider` (rezerwowany pod `hagiang.car`), `hagiang.moto`, `hagiang.permit`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
    need(!!w.place !== !!(w.roads && Object.keys(w.roads).length), 'SWAPS.' + k + ': a place or roads');
  });
```

na:

```js
    need(!!w.place !== !!(w.roads && Object.keys(w.roads).length), 'SWAPS.' + k + ': a place or roads');
    need(w.risk === undefined || w.risk === true, 'SWAPS.' + k + ': risk is true or left out');
  });
```

W `tests/content.test.js` zamień:

```js
  'porcie', 'świecie'];
```

na:

```js
  'porcie', 'świecie', 'remoncie'];
```

W `tests/content.test.js` zamień:

```js
    'b.': Object.keys(BOOK).filter(function (k) { return BOOK[k].ahead > 0; }), 'b.homestay.': HOMESTAY_NOTES,
```

na:

```js
    'sw.risk.': Object.keys(SWAPS).filter(function (k) { return SWAPS[k].risk; }),
    'b.': Object.keys(BOOK).filter(function (k) { return BOOK[k].ahead > 0; }), 'b.homestay.': HOMESTAY_NOTES,
```

W `tests/page.test.js` zamień:

```js
// Cúc Phương and Ninh Bình on one trip: their pins move apart on the map, each with its point where the place is
```

na:

```js
// Hà Giang: the loop over three days, with five nights over four (Lũng Cú on day 3); no hard day, so level 3 is level 2;
// ridden yourself, every day of the loop on the motorbike; the permit for the border zone on the first day, at level 1 too
function hg(n, level, self) { return stopDays(CONTENT.hagiang, { n: n, start: 1 }, 0, level, [9, 9, 9, 9, 9], null, self); }
eq([hg(4, 2).map(function (d) { return d.t; }), hg(5, 2)[2].t, JSON.stringify(hg(5, 3)) === JSON.stringify(hg(5, 2)),
  hg(4, 2, true).map(function (d) { return d.variant; }), hg(4, 1)[0].cost],
  [['Wieczór w Hà Giang', 'Przez Quản Bạ i Yên Minh do Đồng Văn', 'Mã Pí Lèng, kanion Nho Quế i Du Già', 'Z Du Già z powrotem do Hà Giang'],
    'Lũng Cú i wieś pod masztem', true, ['self', 'self', 'self', 'self'], ['hagiang.permit']],
  'Hà Giang: four nights, the loop over three days; five, Lũng Cú on day 3; level 3 as level 2; ridden yourself every day; the permit at level 1 too');
var tHG = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 10, days: 12, interests: ['gory'], level: 2, add: ['hagiang'] });
var bHGd = tripBudget(tHG.r, plansOf(tHG, false), [], BUDR), bHGs = tripBudget(tHG.r, plansOf(tHG, true), ['hagiang'], BUDR), kHG = bookList(tHG.r, plansOf(tHG, false), [], BOOKD);
function hgItems(b) { return b.items.map(function (x) { return x.key; }).filter(function (k) { return /^hagiang/.test(k); }).sort(); }
eq([stayOf(tHG, 'hagiang').n >= 4, hgItems(bHGd), hgItems(bHGs), bHGs.two[1] < bHGd.two[1], keysOf(kHG).indexOf('hagiang.car') > -1,
  kHG.filter(function (e) { return e.key === 'homestay'; })[0].list.indexOf('hagiang') > -1],
  [true, ['hagiang.car', 'hagiang.permit'], ['hagiang.moto', 'hagiang.permit'], true, true, true],
  'mountains in October with Hà Giang: the car or the easy rider and the permit; ridden yourself the motorbike, for less; the car on the list of what to book, Hà Giang with the hosts');
// Cúc Phương and Ninh Bình on one trip: their pins move apart on the map, each with its point where the place is
```

W `tests/page.test.js` zamień:

```js
var arrive = { segs: [{ mode: 'road', from: 'HAN', to: 'catba', h: 4 }] }, leave = { segs: [{ mode: 'road', from: 'cattien', to: 'SGN', h: 3.75 }, { mode: 'fly', from: 'SGN', to: 'HAN', h: 2.2 }] };
```

na:

```js
eq(air('HAN', 'hagiang'), ['r.air_ninhbinh', {}], 'Hà Giang from Nội Bài: a car or a limousine van booked ahead, as to Ninh Bình');
var arrive = { segs: [{ mode: 'road', from: 'HAN', to: 'catba', h: 4 }] }, leave = { segs: [{ mode: 'road', from: 'cattien', to: 'SGN', h: 3.75 }, { mode: 'fly', from: 'SGN', to: 'HAN', h: 2.2 }] };
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: TypeError: undefined is not an object (evaluating 'c.days')
```

- [ ] **Krok 3: Kod.**

W `site2/src/app.js` zamień:

```js
      (self ? '<div class="swap-box"><p><b>' + T('sw.req.h') + '</b>' + esc(T('sw.req')) + '</p><p><b>' + T('sw.risk.h') + '</b>' + esc(T('sw.risk')) + '</p>' +
```

na:

```js
      (self ? '<div class="swap-box"><p><b>' + T('sw.req.h') + '</b>' + esc(T('sw.req')) + '</p><p><b>' + T('sw.risk.h') + '</b>' + esc(T('sw.risk') + (SWAPS[id].risk ? ' ' + T('sw.risk.' + id) : '')) + '</p>' +
```

W `site2/src/before.js` zamień:

```js
  'transfer': { ahead: 3, links: [{ name: 'Baolau', url: 'https://www.baolau.com/en/destinations/vietnam' }, { name: 'Vexere', url: 'https://vexere.com/en-US' }, { name: 'FUTA (Phương Trang)', url: 'https://futabus.vn/' }] },
```

na:

```js
  'hagiang.car': { ahead: 7, links: [{ name: 'ZingHome Ha Giang', url: 'https://zinghomehagiang.com/' }] },
  'hagiang.easyrider': { ahead: 7, links: [{ name: 'ZingHome Ha Giang, pętla 3 dni', url: 'https://zinghomehagiang.com/tour/ha-giang-loop-3-days-2-nights/' }, { name: 'ZingHome Ha Giang, pętla 4 dni', url: 'https://zinghomehagiang.com/tour/ha-giang-loop-4-days-3-nights/' }] },
  'transfer': { ahead: 3, links: [{ name: 'Baolau', url: 'https://www.baolau.com/en/destinations/vietnam' }, { name: 'Vexere', url: 'https://vexere.com/en-US' }, { name: 'FUTA (Phương Trang)', url: 'https://futabus.vn/' }] },
```

W `site2/src/before.js` zamień:

```js
  'haivan.car': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/hoi-an-hue-private-car/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
```

na:

```js
  'hagiang.moto': { ahead: 3, links: [{ name: 'ZingHome Ha Giang, cennik', url: 'https://zinghomehagiang.com/ha-giang-motorbike-rental/' }] },
  'haivan.car': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/hoi-an-hue-private-car/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
```

W `site2/src/before.js` zamień:

```js
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang'];
```

na:

```js
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang', 'hagiang'];
```

W `site2/src/before.js` zamień:

```js
var HOMESTAY_NOTES = ['puluong'];
```

na:

```js
var HOMESTAY_NOTES = ['puluong', 'hagiang'];
```

W `site2/src/climate.js` zamień:

```js
  }
```

na:

```js
  },
  hagiang: {
    t: [[13.3, 19.5], [14.9, 21.1], [17.9, 24.3], [21.2, 28.3], [23.4, 31.5], [24.6, 32.3], [24.7, 32.6], [24.5, 32.8], [23.3, 31.8], [21, 28.9], [17.2, 25.3], [14, 21.6]],
    rain: [[40.1, 11.4], [38.8, 10.4], [64.6, 12], [106.2, 14.8], [294.6, 17.9], [430.2, 20.8], [545.3, 24.1], [414.7, 21.5], [240.9, 15.6], [153.6, 13.5], [84.1, 10.1], [42.2, 8.3]],
    why: { 1: ['chlod', 'szaro'], 2: ['chlod', 'szaro'], 3: ['szaro'], 5: ['deszcz'], 6: ['ulewy'], 7: ['deszcz'], 8: ['deszcz'], 9: ['deszcz'], 12: ['chlod'] }
  }
```

W `site2/src/content.js` zamień:

```js
  'THD-ninhbinh': { text: 'r.air_thd', book: false }, 'THD-puluong': { text: 'r.air_puluong', book: true },
```

na:

```js
  // Hà Giang: a car or a limousine van from Nội Bài, as to Ninh Bình
  'HAN-hagiang': { text: 'r.air_ninhbinh', book: true },
  'THD-ninhbinh': { text: 'r.air_thd', book: false }, 'THD-puluong': { text: 'r.air_puluong', book: true },
```

W `site2/src/content.js` zamień:

```js
/* Either-or choices inside a trip (plan 2B): for now riding a motorbike yourself instead of being driven, on the loop around
   Cao Bằng and on the roads over the Hải Vân pass. A link lists the swaps set to „Samodzielnie” (motocykl=caobang,haivan);
   the trip does not change. place: the place whose days take their self versions (the days of the loop); roads: the roads
   of ROAD_KEYS the swap rides, by their two places in alphabetical order, each with text, its UI key when ridden yourself,
   and cost, the item of COSTS (costs.js) for each way: driver (with a driver, the usual) and self. */
```

na:

```js
/* Either-or choices inside a trip (plan 2B): for now riding a motorbike yourself instead of being driven, on the loops around
   Cao Bằng and Hà Giang and on the roads over the Hải Vân pass. A link lists the swaps set to „Samodzielnie”
   (motocykl=caobang,haivan); the trip does not change. place: the place whose days take their self versions (the days of
   the loop); roads: the roads of ROAD_KEYS the swap rides, by their two places in alphabetical order, each with text, its
   UI key when ridden yourself, and cost, the item of COSTS (costs.js) for each way: driver (with a driver, the usual) and
   self; risk: true when the place has a sentence of its own about the risk (UI key sw.risk.<id>), after the common one. */
```

W `site2/src/content.js` zamień:

```js
  haivan: { roads: { 'hoian-hue': { text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } },
```

na:

```js
  hagiang: { place: 'hagiang', risk: true },
  haivan: { roads: { 'hoian-hue': { text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } },
```

Utwórz `site2/src/content/hagiang.js`:

```js
/* Hà Giang and the loop over the Đồng Văn plateau: texts of the place (stage 3, batch A, plan 2). Facts and sources:
   research/hagiang-2026-10.md. Fields: see site2/src/content.js. */
CONTENT.hagiang = {
  name: 'Hà Giang i płaskowyż Đồng Văn', short: 'Hà Giang',
  sub: 'Pętla przez płaskowyż Đồng Văn i przełęcz Mã Pí Lèng',
  region: 'north', maps: 'Ha Giang, Vietnam', pt: [22.83, 104.99], color: 19,
  poi: { name: 'Đồng Văn', pt: [23.29, 105.36] },
  photos: ['hagiang_0', 'hagiang_1', 'hagiang_2', 'hagiang_3', 'hagiang_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['hagiang.permit'], t: 'Wieczór w Hà Giang', d: 'Nocleg w mieście Hà Giang, skąd rano ruszysz na pętlę. Na trzy albo cztery dni zarezerwuj samochód z kierowcą albo przewodnika na motocyklu (easy rider) w biurze z licencją, z umową, która wymienia kierowcę, pojazd, trasę i postoje. Đồng Văn, Mã Pí Lèng i Lũng Cú leżą w strefie przygranicznej, więc potrzebne jest pozwolenie za 10 USD, które załatwia biuro. Paszport miej zawsze przy sobie.',
      rain: 'nic nie zmieniaj, ale zapytaj biuro o prognozę i stan drogi QL4C.',
      easy: { pace: 'travel', t: 'Wieczór w Hà Giang', d: 'Nocleg w mieście Hà Giang, skąd rano ruszysz na pętlę. Na trzy albo cztery dni zarezerwuj samochód z kierowcą w biurze z licencją, z umową, która wymienia kierowcę, pojazd, trasę i postoje. Đồng Văn, Mã Pí Lèng i Lũng Cú leżą w strefie przygranicznej, więc potrzebne jest pozwolenie za 10 USD, które załatwia biuro. Paszport miej zawsze przy sobie.' },
      self: { pace: 'travel', t: 'Wieczór w Hà Giang', d: 'Nocleg w mieście Hà Giang. Motocykl odbierz wieczorem w wypożyczalni, w której oddasz go po pętli: sprawdź hamulce, opony i światła, zrób zdjęcia rys i weź kask z atestem. Đồng Văn, Mã Pí Lèng i Lũng Cú leżą w strefie przygranicznej: pozwolenie za 10 USD wydaje urząd imigracyjny policji w mieście, a załatwia je też hotel. Paszport, prawo jazdy i międzynarodowe prawo jazdy miej zawsze przy sobie.' } },
    { p: 2, o: 2, pace: 'nature', cost: [['hagiang.car', 'hagiang.easyrider']], t: 'Przez Quản Bạ i Yên Minh do Đồng Văn', d: 'Samochodem z kierowcą albo na tylnym siodełku za przewodnikiem na motocyklu przez przełęcz Bắc Sum i Bramę Niebios w Quản Bạ, z widokiem na dwie stożkowe góry Cô Tiên, potem przez Yên Minh i serpentyny Thẩm Mã i Chín Khoanh. Po drodze pałac rodu Vương w Sà Phìn. Razem ok. 150 km, 4–5 godzin samej jazdy. Nocleg w Đồng Văn, a wieczorem spacer po starej dzielnicy.',
      rain: 'jedź wolniej i na przełęczach licz się z mgłą, a przy ulewie albo ostrzeżeniu przed osuwiskami zapytaj biuro o stan drogi QL4C.',
      easy: { pace: 'nature', cost: ['hagiang.car'], t: 'Przez Quản Bạ i Yên Minh do Đồng Văn', d: 'Samochodem z kierowcą przez przełęcz Bắc Sum i Bramę Niebios w Quản Bạ, z widokiem na dwie stożkowe góry Cô Tiên, potem przez Yên Minh i serpentyny Thẩm Mã i Chín Khoanh. Po drodze pałac rodu Vương w Sà Phìn. Razem ok. 150 km, 4–5 godzin samej jazdy. Nocleg w Đồng Văn, a wieczorem spacer po starej dzielnicy.' },
      self: { pace: 'nature', cost: ['hagiang.moto'], t: 'Przez Quản Bạ i Yên Minh do Đồng Văn motocyklem', d: 'Motocyklem ok. 140–150 km, 4–5 godzin samej jazdy: ruszaj o 8:00, żeby dojechać przed zmrokiem. Przez przełęcz Bắc Sum i Bramę Niebios w Quản Bạ, Yên Minh, serpentyny Thẩm Mã i Chín Khoanh i obok pałacu rodu Vương w Sà Phìn do Đồng Văn. Na przełęczy Bắc Sum są ostre zakręty, a z naprzeciwka jadą ciężarówki. Policja kontroluje tę drogę, zwłaszcza cudzoziemców na wypożyczonych motocyklach.' } },
    { p: 5, o: 3, pace: 'culture', cost: [['hagiang.car', 'hagiang.easyrider']], t: 'Lũng Cú i wieś pod masztem', d: 'Krótki dzień, ok. 50–60 km: samochodem albo z przewodnikiem na motocyklu do Lũng Cú, na maszt z flagą na najdalej wysuniętym na północ krańcu Wietnamu, po schodach albo wózkiem elektrycznym. Potem wieś Lô Lô Chải pod masztem i powrót do Đồng Văn na drugą noc. Nie zbaczaj w drogi ku granicy.',
      rain: 'przy mgle widok z masztu znika, więc zostań dłużej w starej dzielnicy Đồng Văn i jedź do Lũng Cú, gdy się przejaśni.',
      easy: { pace: 'culture', cost: ['hagiang.car'], t: 'Lũng Cú i wieś pod masztem', d: 'Krótki dzień, ok. 50–60 km: samochodem z kierowcą do Lũng Cú, na maszt z flagą na najdalej wysuniętym na północ krańcu Wietnamu, na górę wózkiem elektrycznym. Potem wieś Lô Lô Chải pod masztem i powrót do Đồng Văn na drugą noc.' },
      self: { pace: 'culture', cost: ['hagiang.moto'], t: 'Lũng Cú i wieś pod masztem motocyklem', d: 'Motocyklem 26 km do Lũng Cú i z powrotem, razem ok. 50–60 km wąskimi drogami przy granicy: jedź wolno i nie zbaczaj w drogi ku granicy. Na maszt z flagą na północnym krańcu Wietnamu po schodach albo wózkiem elektrycznym, potem wieś Lô Lô Chải pod masztem i druga noc w Đồng Văn.' } },
    { p: 3, o: 4, pace: 'nature', cost: [['hagiang.car', 'hagiang.easyrider']], t: 'Mã Pí Lèng, kanion Nho Quế i Du Già', d: 'Przez przełęcz Mã Pí Lèng, drogą wykutą w zboczu nad kanionem rzeki Nho Quế, do Mèo Vạc. Jeśli pogoda pozwala, łodzią przez kanion Tu Sản. Po południu przez Mậu Duệ do Du Già, razem ok. 100 km, na nocleg u gospodarzy w dolinie z wodospadem.',
      rain: 'przy ulewie zrezygnuj z łodzi, bo w czasie burz nie pływa, a na przełęczy jedź powoli i nie zatrzymuj się pod skarpą.',
      easy: { pace: 'nature', cost: ['hagiang.car'], t: 'Mã Pí Lèng, kanion Nho Quế i Du Già', d: 'Samochodem z kierowcą przez przełęcz Mã Pí Lèng, drogą wykutą w zboczu nad kanionem rzeki Nho Quế, do Mèo Vạc. Jeśli pogoda pozwala, łodzią przez kanion Tu Sản. Po południu przez Mậu Duệ do Du Già, razem ok. 100 km, na nocleg u gospodarzy w dolinie z wodospadem.' },
      self: { pace: 'nature', cost: ['hagiang.moto'], t: 'Mã Pí Lèng, kanion Nho Quế i Du Già motocyklem', d: 'Motocyklem ok. 100 km: przez przełęcz Mã Pí Lèng nad kanionem rzeki Nho Quế do Mèo Vạc, a po południu przez Mậu Duệ do Du Già, na nocleg u gospodarzy. Na Mã Pí Lèng jeżdżą ciężarówki i maszyny budowy, a za Mèo Vạc droga bywa w remoncie, więc ruszaj z Đồng Văn rano i jedź powoli. Łodzią przez kanion Tu Sản płyń tylko w kamizelce.' } },
    { p: 4, o: 5, pace: 'nature', cost: [['hagiang.car', 'hagiang.easyrider']], t: 'Z Du Già z powrotem do Hà Giang', d: 'Rano spacer do wodospadu w Du Già, potem doliną Lũng Hồ i przez Thái An z powrotem do miasta Hà Giang, ok. 100 km. Nocleg w mieście.',
      rain: 'po ulewie wodospad jest wezbrany i śliski, więc oglądaj go tylko z brzegu, a z Du Già wyjedź wcześniej, żeby wrócić przed zmrokiem.',
      easy: { pace: 'nature', cost: ['hagiang.car'], t: 'Z Du Già z powrotem do Hà Giang', d: 'Rano spacer do wodospadu w Du Già, potem samochodem z kierowcą doliną Lũng Hồ i przez Thái An z powrotem do miasta Hà Giang, ok. 100 km. Nocleg w mieście.' },
      self: { pace: 'nature', cost: ['hagiang.moto'], t: 'Z Du Già z powrotem do Hà Giang motocyklem', d: 'Rano spacer do wodospadu w Du Già, potem motocyklem ok. 100 km z powrotem do Hà Giang, doliną Lũng Hồ i przez Thái An; odcinek drogi na południe od Du Già bywa w złym stanie. Motocykl oddaj w mieście przed zmrokiem.' } }
  ],
  gem: 'Łódź przez kanion Tu Sản pod przełęczą Mã Pí Lèng.',
  skip: 'Skalny występ „Mỏm đá sống ảo” na Mã Pí Lèng: zamknięty od lipca 2026, a zdjęcia na krawędzi przepaści są niebezpieczne.',
  instead: 'punkt widokowy przy drodze na przełęczy albo łódź w kanionie Tu Sản.',
  events: [
    { from: [12, 1], to: [2, 28], warn: true, t: 'Zimna pora: od grudnia do lutego noce na płaskowyżu są zimne, średnio ok. 4–7 °C; bywa przymrozek, marznący deszcz, a nawet śnieg, a na przełęczach gęsta mgła. Weź ciepłą kurtkę, czapkę i rękawiczki, a przy oblodzeniu przeczekaj.' },
    { from: [2, 1], to: [3, 31], t: 'Wiosną kwitną brzoskwinie, śliwy i rzepak; na płaskowyżu brzoskwinie i rzepak kwitną jeszcze w marcu.' },
    { from: [4, 20], to: [5, 20], t: 'Targ w Khâu Vai koło Mèo Vạc: raz w roku, 27. dnia trzeciego miesiąca księżycowego, z festiwalem przez 2–3 dni. W kalendarzu wypada między końcem kwietnia a połową maja (2025: 22–24.04, 2026: 12–13.05), więc sprawdź datę w danym roku.' },
    { from: [6, 1], to: [9, 30], warn: true, t: 'Pora deszczowa: ulewy, mgła, osuwiska i obrywy skał na drodze QL4C (2024, 2026). Wyjeżdżaj rano, po ulewie pytaj o stan drogi, a przy ostrzeżeniu przed osuwiskami przeczekaj.' },
    { from: [10, 1], to: [12, 31], t: 'Kwitnie gryka (tam giác mạch): różowe i białe pola na płaskowyżu. Festiwal w Đồng Văn ma co roku inną datę (2025: 29.11, 2026: 6.11); wtedy noclegi i drogi są zatłoczone, a ruch przez Đồng Văn bywa wstrzymany.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58] },
```

na:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52] },
```

W `site2/src/costs.js` zamień:

```js
    'haivan.moto_dn': { pp: [25, 32], group: [0, 0] }
```

na:

```js
    'haivan.moto_dn': { pp: [25, 32], group: [0, 0] },
    'hagiang.car': { pp: [0, 0], group: [88, 133] },
    'hagiang.easyrider': { pp: [18, 34], group: [0, 0], book: 'hagiang.car' },
    'hagiang.moto': { pp: [8, 23], group: [0, 0] },
    'hagiang.permit': { pp: [9, 9], group: [0, 0] }
```

W `site2/src/photos.js` zamień:

```js
  danang_4: { cap: 'Sala Muzeum Rzeźby Czamskiej w Đà Nẵng', artist: 'Daderot', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Interior_view_-_Museum_of_Cham_Sculpture_-_Danang,_Vietnam_-_DSC01931.JPG' }
```

na:

```js
  danang_4: { cap: 'Sala Muzeum Rzeźby Czamskiej w Đà Nẵng', artist: 'Daderot', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Interior_view_-_Museum_of_Cham_Sculpture_-_Danang,_Vietnam_-_DSC01931.JPG' },
  hagiang_0: { cap: 'Przełęcz Mã Pí Lèng nad kanionem rzeki Nho Quế', artist: 'Hoach Le Dinh', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:M%C3%A3_P%C3%AD_L%C3%A8ng,_Vietnam.jpg' },
  hagiang_1: { cap: 'Kanion Tu Sản i rzeka Nho Quế', artist: 'NKSTTSSHNVN', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:TuSan2-2022.jpg' },
  hagiang_2: { cap: 'Droga i tarasy w Quản Bạ', artist: 'Benjamin Smith', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Qu%E1%BA%A3n_B%E1%BA%A1,_Vietnam_-_1.jpg' },
  hagiang_3: { cap: 'Dwie stożkowe góry Cô Tiên w Quản Bạ', artist: 'Sketyl none', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:N%C3%BAi_C%C3%B4_Ti%C3%AAn,_Qu%E1%BA%A3n_B%E1%BA%A1_(47742798901).jpg' },
  hagiang_4: { cap: 'Brama pałacu rodu Vương w Sà Phìn', artist: 'Velvet', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sa_Phin_palais_hmong_entree.jpg' }
```

W `site2/src/places.js` zamień:

```js
  caobang:   { axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } }
```

na:

```js
  caobang:   { axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  hagiang:   { axis: 22.83, nights: [4, 4, 5], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } }
```

W `site2/src/seasons.js` zamień:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS'
```

na:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS', hagiang: 'SSSDSZSSSDDS'
```

W `site2/src/travel.js` zamień:

```js
  // Cúc Phương, between Pù Luông and Ninh Bình
```

na:

```js
  // Hà Giang, the loop over the Đồng Văn plateau, beyond Cao Bằng and Ba Bể
  ['hanoi', 'hagiang', 6.5], ['HAN', 'hagiang', 5.75], ['hagiang', 'caobang', 8], ['hagiang', 'babe', 7],
  // Cúc Phương, between Pù Luông and Ninh Bình
```

W `site2/src/ui.js` zamień:

```js
  'sw.caobang': 'Pętla po Cao Bằng', 'sw.haivan': 'Przez przełęcz Hải Vân', 'sw.driver': 'Z kierowcą', 'sw.self': 'Samodzielnie',
```

na:

```js
  'sw.caobang': 'Pętla po Cao Bằng', 'sw.hagiang': 'Pętla Hà Giang', 'sw.haivan': 'Przez przełęcz Hải Vân', 'sw.driver': 'Z kierowcą', 'sw.self': 'Samodzielnie',
```

W `site2/src/ui.js` zamień:

```js
  'sw.tips.haivan': 'Przez przełęcz jedzie się tylko górą, bo motocykle nie wjeżdżają do tunelu. Wyjedź rano, przed ruchem i mgłą.',
```

na:

```js
  'sw.tips.hagiang': 'Motocykl weź i oddaj w mieście Hà Giang. Na pętli rozsądnie jest 100–150 km dziennie, więc ruszaj rano; najostrzejsze zakręty i najwięcej ciężarówek są na przełęczach Bắc Sum i Mã Pí Lèng. Đồng Văn, Mã Pí Lèng i Lũng Cú leżą w strefie przygranicznej: pozwolenie za 10 USD wydaje urząd imigracyjny policji w mieście Hà Giang, a załatwia je też hotel. Nie zbaczaj w drogi ku granicy.',
  'sw.risk.hagiang': 'Od 12 kwietnia 2026 drogę do Đồng Văn sprawdza policja prowincji, zwłaszcza cudzoziemców na wypożyczonych motocyklach, a wypożyczalnie zobowiązały się nie wydawać motocykla bez wymaganych uprawnień. W 2026 na pętli zginęły dwie turystki, obie na tylnym siodełku motocykla miejscowego kierowcy.',
  'sw.tips.haivan': 'Przez przełęcz jedzie się tylko górą, bo motocykle nie wjeżdżają do tunelu. Wyjedź rano, przed ruchem i mgłą.',
```

W `site2/src/ui.js` zamień:

```js
  'cost.caobang.easyrider': 'easy rider na pętli Cao Bằng', 'cost.caobang.moto': 'motocykl na pętli Cao Bằng', 'cost.haivan.car': 'auto przez przełęcz Hải Vân',
```

na:

```js
  'cost.caobang.easyrider': 'easy rider na pętli Cao Bằng', 'cost.caobang.moto': 'motocykl na pętli Cao Bằng',
  'cost.hagiang.car': 'kierowca na pętli Hà Giang', 'cost.hagiang.easyrider': 'easy rider na pętli Hà Giang', 'cost.hagiang.moto': 'motocykl na pętli Hà Giang',
  'cost.hagiang.permit': 'pozwolenie na strefę przygraniczną w Hà Giang', 'cost.haivan.car': 'auto przez przełęcz Hải Vân',
```

W `site2/src/ui.js` zamień:

```js
  'b.puluong.summit': 'Wejście na szczyt Pù Luông: formularzem rezerwatu 3–7 dni wcześniej, w szczycie 2–3 tygodnie.',
```

na:

```js
  'b.homestay.hagiang': 'W Đồng Văn i Du Già w porze kwitnienia gryki (X–XII) 2–3 tygodnie wcześniej.',
  'b.puluong.summit': 'Wejście na szczyt Pù Luông: formularzem rezerwatu 3–7 dni wcześniej, w szczycie 2–3 tygodnie.',
```

W `site2/src/ui.js` zamień:

```js
  'b.haivan.car': 'Samochód z kierowcą przez przełęcz Hải Vân: 1–3 dni wcześniej.',
```

na:

```js
  'b.hagiang.car': 'Samochód z kierowcą albo przewodnik na motocyklu (easy rider) na pętlę Hà Giang, w biurze z licencją: 3–7 dni wcześniej, w szczycie 3–4 tygodnie.',
  'b.hagiang.easyrider': 'Przewodnik na motocyklu (easy rider) na pętlę Hà Giang, w biurze z licencją: 3–7 dni wcześniej.',
  'b.hagiang.moto': 'Motocykl na pętlę Hà Giang, w wypożyczalni w mieście Hà Giang: 1–3 dni wcześniej, w szczycie 1–2 tygodnie.',
  'b.haivan.car': 'Samochód z kierowcą przez przełęcz Hải Vân: 1–3 dni wcześniej.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
bash "$TMPDIR/sondy-3a2.sh" 2027-05
bash "$TMPDIR/sondy-3a2.sh" 2027-10
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`; build bez błędów; grep nic nie wypisuje; przy każdym miesiącu ostatnia linia sond `sondy (…): 0 z 14 nie przeszło` (plik sond z zadania 1, krok 4).

- [ ] **Krok 5: Commit**

```bash
git add site2/src/app.js site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/hagiang.js site2/src/costs.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/ui.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Hà Giang: pętla przez płaskowyż Đồng Văn na 4–5 nocy (3 albo 4 dni, Lũng Cú przy 5 nocach), sezon ze stacji w mieście z ostrzeżeniem o zimnej porze, przełącznik „Z kierowcą / Samodzielnie” z ramką o kontrolach od kwietnia 2026 i pozwoleniu na strefę przygraniczną, ceny, rezerwacje, nocleg u gospodarzy, kolor 19 i pięć zdjęć

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 6: Sa Pa z Fansipanem

Drugie miejsce, z `research/sapa-2026-10.md` i pytań 5 i 6:
- **dane:**
  - `sapa` na osi 22,9 (choć leży na 22,34° N), żeby pętla Ba Bể → Cao Bằng → Hà Giang → Sa Pa szła w jednym kierunku osi; noce [2, 3, 4], poziom 1, `fit` jak Hà Giang;
  - sezon `SSDSZZZZZSSS` i klimat ze stacji Sa Pa;
  - drogi: Hà Nội 5,5 h, lotnisko Hà Nội 5 h (tekst karty jak do Ninh Bình), Hà Giang 6 h, Ninh Bình 6,5 h; Ba Bể, Pù Luông i Cao Bằng poza danymi;
- **treść:** cztery plany dni (przyjazd; wioski doliny Mường Hoa z przewodnikiem; kolejka na Fansipan i Cát Cát; wodospady pod przełęczą Ô Quy Hồ); na „Spokojnie” kolejka zamiast wędrówki i dolina autem zamiast kolejki; na „Ekstremalnie” Fansipan pieszo jako trudna wersja dnia 2 z `next` (obóz na 2800 m, potem szczyt i powrót), wyłączony w V–IX, z latarką na liście do spakowania i własnym planem na deszcz; bez noclegu u gospodarzy (baza w miasteczku); perełka i cztery wydarzenia (pora ulew i mroźna pora jako ostrzeżenia, pijawki w porze ulew);
- **ceny i rezerwacje:** noc 24–60 EUR; przewodnik 17–31 EUR na osobę i 5–18 za grupę; kolejka 28–45; auto 36–53 za grupę; Fansipan 86–95 na osobę i 0–71 za grupę, z nocą w obozie (`night: true`); zejście 0–29; Sapa O'Chau (tekst każe zapytać o numer licencji i kartę przewodnika), Sapa Sisters, Sun World;
- **mapa:** kolor 17; kadr północy bez zmian;
- **`KEEP_TOGETHER`:** La Dao;
- **zdjęcia:** `sapa_0`–`4`.

**Pliki:**
- Utwórz: `site2/src/content/sapa.js`
- Zmień: `site2/src/places.js` (opis osi), `site2/src/seasons.js`, `site2/src/climate.js`, `site2/src/travel.js`, `site2/src/content.js` (`KEEP_TOGETHER`, `AIR_KEYS`), `site2/src/costs.js`, `site2/src/before.js`, `site2/src/photos.js`, `site2/src/ui.js`
- Testy: `tests/content.test.js` (płatne pozycje także w `hard.next`), `tests/page.test.js`

**Interfejsy:**
- Bierze: `hard.next` (plan 1), `hard.rain` (zadanie 3), `REGION_H` (zadanie 1: Sa Pa leży w regionie Hà Nội, 5 h).
- Daje: `AIR_KEYS['HAN-sapa']`; `COSTS.items` `sapa.trek`, `sapa.cablecar`, `sapa.car`, `sapa.fansipan`, `sapa.descent`.

- [ ] **Krok 1: Testy, które nie przechodzą.**

W `tests/content.test.js` zamień:

```js
      [d, d.easy, d.hard, d.solo, d.self].forEach(function (v) { ((v && v.cost) || []).forEach(function (e) { [].concat(e).forEach(function (x) { paid[x] = true; }); }); });
```

na:

```js
      [d, d.easy, d.hard, d.hard && d.hard.next, d.solo, d.self].forEach(function (v) { ((v && v.cost) || []).forEach(function (e) { [].concat(e).forEach(function (x) { paid[x] = true; }); }); });
```

W `tests/page.test.js` zamień:

```js
// Cúc Phương and Ninh Bình on one trip: their pins move apart on the map, each with its point where the place is
```

na:

```js
// Sa Pa: Fansipan on foot over two days at level 3, from three nights, not in May–September (its months of downpours) nor
// with two nights; at level 1 the cable car and the valley by car; the expedition has its own rain plan and sleeps in the camp
function sp(n, level, months) { return stopDays(CONTENT.sapa, { n: n, start: 1 }, 0, level, months).map(function (d) { return d.variant || '-'; }); }
eq([sp(3, 3, [2, 2, 2]), sp(3, 3, [6, 6, 6]), sp(2, 3, [2, 2]), sp(3, 1, [2, 2, 2]),
  stopDays(CONTENT.sapa, { n: 3, start: 1 }, 0, 3, [2, 2, 2])[1].rain === CONTENT.sapa.days[1].hard.rain, COSTS.items['sapa.fansipan'].night],
  [['-', 'hard', 'hard'], ['-', '-', '-'], ['-', '-'], ['-', 'easy', 'easy'], true, true],
  'Sa Pa: Fansipan on foot on days 2 and 3 at level 3 in March, not in July nor in two nights; at level 1 the cable car and the valley by car; its own rain plan, a night in the camp');
var tSP = tripAll({ from: 'HAN', to: 'HAN', year: 2027, month: 3, days: 10, interests: ['gory'], level: 3, add: ['sapa'] });
eq([stayOf(tSP, 'sapa').days.slice(1, 3), keysOf(bookList(tSP.r, plansAll(tSP), [], BOOKD)).indexOf('sapa.fansipan') > -1], [['hard', 'hard'], true],
  'mountains in March at level 3 with Sa Pa: Fansipan on foot, on the list of what to book');
// Cúc Phương and Ninh Bình on one trip: their pins move apart on the map, each with its point where the place is
```

W `tests/page.test.js` zamień:

```js
eq(air('HAN', 'hagiang'), ['r.air_ninhbinh', {}], 'Hà Giang from Nội Bài: a car or a limousine van booked ahead, as to Ninh Bình');
```

na:

```js
eq([air('HAN', 'hagiang'), air('sapa', 'HAN')], [['r.air_ninhbinh', {}], ['r.air_ninhbinh', {}]], 'Hà Giang and Sa Pa from Nội Bài: a car or a limousine van booked ahead, as to Ninh Bình');
```

- [ ] **Krok 2: Uruchom i sprawdź, że testy nie przechodzą**

```bash
bash tests/run.sh
```

Oczekiwane: przerwanie na `tests/page.test.js`, ostatnie linie wyniku:

```
Exception: TypeError: undefined is not an object (evaluating 'c.days')
```

- [ ] **Krok 3: Kod.**

W `site2/src/before.js` zamień:

```js
  'phongnha.paradise7': { ahead: 7, links: [{ name: 'Park Phong Nha–Kẻ Bàng, Paradise Cave', url: 'https://phongnhakebang.vn/du-lich/dong-thien-duong13' }, { name: 'Paradise Cave', url: 'https://dongthienduong.com/' }] },
```

na:

```js
  'sapa.fansipan': { ahead: 7, links: [{ name: "Sapa O'Chau, Fansipan w 2 dni", url: 'https://sapaochau.org/index.php/sapa-trekking-and-homestay/sapa-trek-and-tour/fansipan-tours/mount-fansipan-trek-2-day/' }] },
  'phongnha.paradise7': { ahead: 7, links: [{ name: 'Park Phong Nha–Kẻ Bàng, Paradise Cave', url: 'https://phongnhakebang.vn/du-lich/dong-thien-duong13' }, { name: 'Paradise Cave', url: 'https://dongthienduong.com/' }] },
```

W `site2/src/before.js` zamień:

```js
  'babe.boat': { ahead: 0, links: [] },
```

na:

```js
  'sapa.trek': { ahead: 2, links: [{ name: 'Sapa Sisters', url: 'https://sapasisters.com/sapa-tour-booking/' }] },
  'sapa.car': { ahead: 1, links: [] },
  'sapa.cablecar': { ahead: 0, links: [{ name: 'Sun World Fansipan Legend', url: 'https://sunworld.vn/vi/fansipan' }] },
  'babe.boat': { ahead: 0, links: [] },
```

W `site2/src/climate.js` zamień:

```js
  }
```

na:

```js
  },
  sapa: {
    t: [[6.2, 12.3], [7.8, 14.3], [10.8, 18.2], [14, 21.3], [16.3, 22.4], [17.6, 22.9], [17.7, 23], [17.4, 23], [15.9, 21.7], [13.7, 19], [10.2, 16.1], [7, 13.2]],
    rain: [[70.2, 16.3], [73.5, 16.3], [104.5, 15.7], [213.4, 17.9], [340.6, 22.2], [381.4, 24.4], [461, 25.6], [451.9, 23.4], [303.1, 19.8], [201.3, 18.6], [106.3, 13.8], [65.7, 13.5]],
    why: { 1: ['chlod'], 2: ['chlod'], 4: ['deszcz'], 5: ['ulewy'], 6: ['ulewy'], 7: ['ulewy'], 8: ['ulewy'], 9: ['ulewy'], 10: ['deszcz', 'chlod'], 11: ['chlod'], 12: ['chlod'] }
  }
```

W `site2/src/content.js` zamień:

```js
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long', 'Paradise Cave', 'Hang Va'];
```

na:

```js
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long', 'Paradise Cave', 'Hang Va', 'La Dao'];
```

W `site2/src/content.js` zamień:

```js
  'HAN-hagiang': { text: 'r.air_ninhbinh', book: true },
```

na:

```js
  'HAN-hagiang': { text: 'r.air_ninhbinh', book: true }, 'HAN-sapa': { text: 'r.air_ninhbinh', book: true },
```

Utwórz `site2/src/content/sapa.js`:

```js
/* Sa Pa and Fansipan: texts of the place (stage 3, batch A, plan 2). Facts and sources: research/sapa-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.sapa = {
  name: 'Sa Pa i Fansipan', short: 'Sa Pa',
  sub: "Tarasy doliny Mường Hoa, wioski H'Mông i Giáy i Fansipan, dach Indochin",
  region: 'north', maps: 'Sa Pa, Lao Cai, Vietnam', pt: [22.34, 103.84], color: 17,
  photos: ['sapa_0', 'sapa_1', 'sapa_2', 'sapa_3', 'sapa_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Miasteczko na zboczu', d: 'Zamelduj się w Sa Pa, ok. 1500 m nad morzem, w dawnym francuskim letnisku. Wieczorem spacer po miasteczku. Nawet latem noce są tu chłodne, więc miej pod ręką ciepłą warstwę.' },
    { p: 2, o: 2, pace: 'hike', cost: ['sapa.trek'], t: 'Wioski doliny Mường Hoa', d: "Całodniowa wędrówka z lokalnym przewodnikiem: z Sa Pa w dół do Ý Linh Hồ i Lao Chải, a potem wzdłuż potoku Mường Hoa do Tả Van, między tarasami ryżowymi ludu H'Mông i Giáy. To ok. 10 km, głównie w dół, z obiadem u rodziny w wiosce. Z Tả Van wrócisz samochodem, a jeśli chcesz zostać dłużej, przenocuj tam u gospodarzy.",
      rain: 'wybierz krótszy odcinek doliną albo przełóż wędrówkę, bo ścieżki między tarasami są wtedy śliskie, a w gęstej mgle lepiej przeczekać.',
      easy: { pace: 'nature', cost: ['sapa.cablecar'], t: 'Fansipan kolejką i wioska Cát Cát', d: 'Rano kolejką linową nad doliną Mường Hoa na Fansipan, 3143 m: z centrum kolejką szynową do dolnej stacji, potem wagonikiem pod szczyt i schodami albo krótką kolejką na sam wierzchołek. Jedź z samego rana, zanim przyjdą chmury, i weź ciepłą kurtkę, czapkę i rękawiczki. Kolejka co roku staje na kilka dni przeglądu, więc sprawdź jej komunikat przed przyjazdem. Po południu spacer w dół do wioski Cát Cát z wodospadem i taksówką z powrotem do miasteczka.' },
      hard: { pace: 'hike', late: true, off: [5, 6, 7, 8, 9], cost: ['sapa.fansipan'], pack: ['torch'], t: 'Fansipan pieszo: do obozu na 2800 m', d: 'Pierwszy dzień dwudniowego wejścia na Fansipan, 3143 m, szlakiem z Trạm Tôn. Ok. 9:00 samochodem 15 km do stacji strażników parku Hoàng Liên na przełęczy Trạm Tôn, potem w górę przez las: obiad na 2200 m, a po południu nocleg w obozie na 2800 m, bez prądu. Idź tylko z firmą, która załatwi zgodę parku, i z przewodnikiem z kartą wejścia do lasu: samemu wchodzić do lasu nie wolno. Szlak jest stromy i śliski, dla osób w dobrej kondycji.',
        rain: 'przy ulewie albo burzy firma przekłada wejście, a w czasie sztormów urząd turystyki prowincji każe wstrzymać wyjścia w góry: zostań w Sa Pa i wjedź na szczyt kolejką, gdy się przejaśni.',
        next: { pace: 'hike', cost: ['sapa.descent'], t: 'Fansipan pieszo: szczyt i powrót', d: 'Rano podejście na szczyt, na którym będziesz ok. 10:00–10:30, potem zejście do obozu na obiad i dalej do Trạm Tôn, skąd samochód zawiezie cię do Sa Pa ok. 17:00. Krótsza droga powrotna to kolejka z górnej stacji pod szczytem: bilet kupisz na miejscu, kosztuje tyle co w obie strony, a w Sa Pa będziesz ok. 12:00–13:00. Od końca listopada do lutego na szczycie bywa lód, więc weź rękawiczki i ciepłą kurtkę.' } } },
    { p: 3, o: 3, pace: 'nature', cost: ['sapa.cablecar'], t: 'Fansipan kolejką i wioska Cát Cát', d: 'Rano kolejką linową nad doliną Mường Hoa na Fansipan, 3143 m: z centrum kolejką szynową do dolnej stacji, potem wagonikiem pod szczyt i schodami albo krótką kolejką na sam wierzchołek. Jedź z samego rana, zanim przyjdą chmury, i weź ciepłą kurtkę, czapkę i rękawiczki. Kolejka co roku staje na kilka dni przeglądu, więc sprawdź jej komunikat przed przyjazdem. Po południu spacer w dół do wioski Cát Cát z wodospadem i taksówką z powrotem do miasteczka.',
      rain: 'kolejka kursuje też w deszczu, ale szczyt bywa wtedy w chmurach: jeśli prognoza jest zła, zamień ten dzień z innym.',
      easy: { pace: 'culture', cost: ['sapa.car'], t: 'Dolina Mường Hoa bez wędrówki', d: 'Samochodem z kierowcą w dół doliny Mường Hoa przez Ý Linh Hồ i Lao Chải do Tả Van, z krótkimi spacerami między tarasami i nad potokiem. Obiad u rodziny w Tả Van, a po południu, jeśli masz ochotę, kąpiel w ziołach ludu Dao w La Dao.' } },
    { p: 4, o: 4, pace: 'nature', cost: ['sapa.car'], t: 'Wodospady pod przełęczą Ô Quy Hồ', d: 'Samochodem z kierowcą drogą na przełęcz Ô Quy Hồ: najpierw wodospad Thác Bạc, kilkaset schodów od drogi, potem przy bramie parku Hoàng Liên ok. 30 minut leśną ścieżką do Thác Tình Yêu, czyli Wodospadu Miłości. Na koniec przełęcz, prawie 2000 m nad morzem, z widokiem na pasmo Hoàng Liên, jeśli nie ma mgły.',
      rain: 'po ulewie ścieżka do Thác Tình Yêu jest śliska, więc zostań przy wodospadzie Thác Bạc obok drogi albo przełóż wycieczkę.' }
  ],
  gem: "Wędrówka doliną Mường Hoa z Lao Chải do Tả Van, między tarasami ludu H'Mông i Giáy.",
  events: [
    { from: [5, 1], to: [6, 15], t: 'Tarasy pełne wody: w maju i na początku czerwca pola w dolinie Mường Hoa stoją w wodzie, a w wioskach sadzi się ryż.' },
    { from: [6, 1], to: [9, 30], warn: true, pack: ['leeches'], t: 'Pora ulew: szlaki są błotniste, w lesie są pijawki, a osuwiska potrafią zamknąć drogi i atrakcje, jak we wrześniu 2024, gdy tajfun Yagi zamknął je na sześć dni. Weź skarpety przeciw pijawkom i kurtkę przeciwdeszczową.' },
    { from: [8, 15], to: [9, 30], t: 'Złote tarasy: ryż dojrzewa zwykle od połowy sierpnia do końca września, w Lao Chải i Tả Van najczęściej pod koniec sierpnia i na początku września. Termin przesuwa się z roku na rok i różni się między wioskami, więc zapytaj gospodarzy.' },
    { from: [11, 20], to: [2, 29], warn: true, t: 'Mroźna pora: od końca listopada do lutego na szczycie Fansipan bywa lód, a czasem śnieg, a w samym Sa Pa noce mają średnio 6–8 °C. Weź czapkę, rękawiczki i ciepłą kurtkę.' }
  ]
};
```

W `site2/src/costs.js` zamień:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52] },
```

na:

```js
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52], sapa: [24, 60] },
```

W `site2/src/costs.js` zamień:

```js
    'hagiang.permit': { pp: [9, 9], group: [0, 0] }
```

na:

```js
    'hagiang.permit': { pp: [9, 9], group: [0, 0] },
    'sapa.trek': { pp: [17, 31], group: [5, 18] },
    'sapa.cablecar': { pp: [28, 45], group: [0, 0] },
    'sapa.car': { pp: [0, 0], group: [36, 53] },
    'sapa.fansipan': { pp: [86, 95], group: [0, 71], night: true },
    'sapa.descent': { pp: [0, 29], group: [0, 0] }
```

W `site2/src/photos.js` zamień:

```js
  hagiang_4: { cap: 'Brama pałacu rodu Vương w Sà Phìn', artist: 'Velvet', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sa_Phin_palais_hmong_entree.jpg' }
```

na:

```js
  hagiang_4: { cap: 'Brama pałacu rodu Vương w Sà Phìn', artist: 'Velvet', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sa_Phin_palais_hmong_entree.jpg' },
  sapa_0: { cap: 'Tarasy ryżowe Hầu Thào i Tả Van nad rzeką Mường Hoa', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:M%C6%B0%E1%BB%9Dng_Hoa_Valley_01.jpg' },
  sapa_1: { cap: 'Znak na szczycie Fansipan, 3143 m (2024)', artist: 'MinhVN1863', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Fansipan_Summit_Mark_2024.jpg' },
  sapa_2: { cap: 'Obóz na 2800 m na szlaku na Fansipan', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Base_camp_of_the_Fansipan.jpg' },
  sapa_3: { cap: 'Pasmo Hoàng Liên Sơn ze stacji strażników Núi Xẻ', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Ho%C3%A0ng_Li%C3%AAn_S%C6%A1n_mountains_01.jpg' },
  sapa_4: { cap: 'Sa Pa widziana ze zboczy gór Hoàng Liên Sơn', artist: 'Christophe95', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:View_of_Sa_Pa_from_the_Ho%C3%A0ng_Li%C3%AAn_S%C6%A1n_mountains.jpg' }
```

W `site2/src/places.js` zamień:

```js
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà, and Cúc Phương between them). nights: [min, ideal, max]; the
```

na:

```js
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà, and Cúc Phương between them; Sa Pa, at
   22.34° N, sits past Hà Giang so the north runs Ba Bể → Cao Bằng → Hà Giang → Sa Pa). nights: [min, ideal, max]; the
```

W `site2/src/places.js` zamień:

```js
  hagiang:   { axis: 22.83, nights: [4, 4, 5], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } }
```

na:

```js
  hagiang:   { axis: 22.83, nights: [4, 4, 5], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
  sapa:      { axis: 22.9, nights: [2, 3, 4], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } }
```

W `site2/src/seasons.js` zamień:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS', hagiang: 'SSSDSZSSSDDS'
```

na:

```js
  phongnha: 'DSDDDSDDZZZS', cucphuong: 'SSSDSSSSSDDS', danang: 'SSDDDSSDSZZS', hagiang: 'SSSDSZSSSDDS', sapa: 'SSDSZZZZZSSS'
```

W `site2/src/travel.js` zamień:

```js
  // Cúc Phương, between Pù Luông and Ninh Bình
```

na:

```js
  // Sa Pa, on the expressway from Hà Nội; to Cao Bằng it is over 10 h (through Hà Giang)
  ['hanoi', 'sapa', 5.5], ['HAN', 'sapa', 5], ['hagiang', 'sapa', 6], ['ninhbinh', 'sapa', 6.5],
  // Cúc Phương, between Pù Luông and Ninh Bình
```

W `site2/src/ui.js` zamień:

```js
  'cost.hagiang.permit': 'pozwolenie na strefę przygraniczną w Hà Giang', 'cost.haivan.car': 'auto przez przełęcz Hải Vân',
```

na:

```js
  'cost.hagiang.permit': 'pozwolenie na strefę przygraniczną w Hà Giang',
  'cost.sapa.trek': 'przewodnik w dolinie Mường Hoa', 'cost.sapa.cablecar': 'kolejka na Fansipan', 'cost.sapa.car': 'auto z kierowcą w okolicy Sa Pa',
  'cost.sapa.fansipan': 'wejście na Fansipan w dwa dni', 'cost.sapa.descent': 'zejście z Fansipanu albo zjazd kolejką', 'cost.haivan.car': 'auto przez przełęcz Hải Vân',
```

W `site2/src/ui.js` zamień:

```js
  'b.flights': 'Loty krajowe: {x}. Kupuj ok. 3 tygodnie wcześniej.',
```

na:

```js
  'b.sapa.fansipan': 'Fansipan pieszo w dwa dni, z firmą, która załatwi zgodę parku: 3–7 dni wcześniej, w szczycie 1–2 tygodnie. Zapytaj o numer licencji firmy i o to, czy przewodnik ma kartę wejścia wydaną przez park.',
  'b.sapa.trek': 'Przewodnik na wędrówkę przez Lao Chải i Tả Van: 1–2 dni wcześniej, w porze złotych tarasów i w święta ok. tygodnia.',
  'b.sapa.car': 'Samochód z kierowcą na dzień w okolicy Sa Pa: dzień wcześniej, przez hotel.',
  'b.flights': 'Loty krajowe: {x}. Kupuj ok. 3 tygodnie wcześniej.',
```

- [ ] **Krok 4: Testy, build i sondy**

```bash
bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
bash "$TMPDIR/sondy-3a2.sh" 2027-05
bash "$TMPDIR/sondy-3a2.sh" 2027-10
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS`; build bez błędów; grep nic nie wypisuje; przy każdym miesiącu ostatnia linia sond `sondy (…): 0 z 14 nie przeszło` (plik sond z zadania 1, krok 4).

Linki nowych miejsc:

```bash
bash tools/links.sh
```

Oczekiwane: wszystkie adresy z kodem 200 poza stroną Sapa O'Chau (`https://sapaochau.org/…/mount-fansipan-trek-2-day/`), której serwer odrzuca curla kodem 406 po kilku zapytaniach (w suchej próbie 52 z 53 adresów z kodem 200). Otwórz ją we wbudowanej przeglądarce (`navigate`, potem `get_page_text`): ma tytuł „Mount Fansipan Trek - 2 Day” i program dwóch dni. Inny adres bez 2xx zgłoś użytkownikowi.

- [ ] **Krok 5: Commit**

```bash
git add site2/src/before.js site2/src/climate.js site2/src/content.js site2/src/content/sapa.js site2/src/costs.js site2/src/photos.js site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/ui.js tests/content.test.js tests/page.test.js
git commit -F - <<'EOF'
Sa Pa z Fansipanem: 2–4 noce, oś 22,9 (pętla Ba Bể → Cao Bằng → Hà Giang → Sa Pa w jednym kierunku), sezon z progów, na „Ekstremalnie” Fansipan pieszo na dwa dni z firmą i przewodnikiem z kartą parku, wyłączony w V–IX, z własnym planem na deszcz; ceny, rezerwacje, drogi do Hà Nội, Ninh Bình i Hà Giang, kolor 17 i pięć zdjęć

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Zadanie 7: Punkt kontrolny planu 2

Sprawdzenie całości przed etapem 4 (ustalenie 27). Sprawdzasz:
- pełny test, wszystkie sondy, linki i wydruk;
- raport tras i liczby: udział miejsc, zygzaki, powroty do domu w środku trasy, dni z dwoma lotami, Cát Bà na 4 noce, Hà Nội trzy razy, bliskie miejsca obok siebie, długie dni po locie do Sa Pa i Hà Giang;
- zrzuty sześciu ustawień;
- ręcznie to, czego Chrome bez okna nie pokaże;
- prawdziwy telefon;
- całość razem z użytkownikiem.

Poprawki z przeglądu idą jako osobne commity (test, kod, `ALL PASS`, commit), a wynik przeglądu trafia do notatek w zadaniu 8.

**Pliki:**
- Jeśli przegląd niczego nie wykaże, w repo przybywa tylko raport tras `notes/raport-tras-RRRR-MM-DD.md`; commit razem z notatkami w zadaniu 8.
- Zrzuty, PDF-y i liczby idą do `$TMPDIR/wietnam-3a2/`.
- Do ręcznego sprawdzenia powstaje na chwilę `.claude/launch.json` (lokalny serwer); krok 7 go usuwa.

- [ ] **Krok 1: Pełny test i build**

```bash
time bash tests/run.sh --full
python3 site2/build.py
grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"
```

Oczekiwane: `combos: 134784 months and 10368 dates (all)` i `ALL PASS` w ok. 100 s; build bez błędów; grep nic nie wypisuje.

- [ ] **Krok 2: Wszystkie sondy**

```bash
bash "$TMPDIR/sondy-3a2.sh" MIESIAC
bash "$TMPDIR/sondy-3a2.sh" 2027-10
```

Oczekiwane: dwa razy `sondy (…): 0 z 14 nie przeszło`. Jeśli `$TMPDIR/sondy-3a2.sh` zniknął (np. po restarcie Maca), utwórz go jeszcze raz z zadania 1, krok 4.

- [ ] **Krok 3: Linki**

```bash
bash tools/links.sh
```

Oczekiwane: wszystkie adresy z kodem 200 poza stroną Sapa O'Chau (kod 406: serwer odrzuca curla po kilku zapytaniach; w suchej próbie 52 z 53 adresów z kodem 200). Stronę Sapa O'Chau otwórz we wbudowanej przeglądarce. Inny adres bez 2xx też otwórz w przeglądarce, a zepsuty link zgłoś użytkownikowi. Nowy link trafia najpierw do researchu.

- [ ] **Krok 4: Wydruk trzech tras**

```bash
mkdir -p "$TMPDIR/wietnam-3a2"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' "$TMPDIR/wietnam-3a2/d1.pdf"
bash tests/print.sh 'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' "$TMPDIR/wietnam-3a2/d1-ciemny.pdf" dark
bash tests/print.sh 'od=HAN&do=SGN&miesiac=2027-03&dni=18&co=gory&poziom=3' "$TMPDIR/wietnam-3a2/d2.pdf"
bash tests/print.sh 'od=HAN&do=SGN&miesiac=2027-03&dni=18&co=gory&poziom=3' "$TMPDIR/wietnam-3a2/d2-ciemny.pdf" dark
bash tests/print.sh 'od=DAD&do=DAD&miesiac=2027-01&dni=30&co=gory,morze&poziom=3' "$TMPDIR/wietnam-3a2/d3.pdf"
bash tests/print.sh 'od=DAD&do=DAD&miesiac=2027-01&dni=30&co=gory,morze&poziom=3' "$TMPDIR/wietnam-3a2/d3-ciemny.pdf" dark
```

Oczekiwane: przy każdym pliku `covered text lines: 0`, w obu motywach tyle samo stron. Wydruku nie robiono w suchej próbie: liczbę stron zapisz w wyniku przeglądu (krok 9).

- [ ] **Krok 5: Raport tras i liczby do przeglądu**

Raport przykładowych tras (16 ustawień z `tools/report.js`) trafia do `notes/` i do commita w zadaniu 8. Plan 1 zapisał już `notes/raport-tras-2026-10-13.md`, więc tego samego dnia raport planu 2 dostaje końcówkę `-3a2`; ścieżka trafia do `$TMPDIR/raport-3a2.txt`, skąd czyta ją zadanie 8:

```bash
R="notes/raport-tras-$(date +%Y-%m-%d).md"
[ -e "$R" ] && R="notes/raport-tras-$(date +%Y-%m-%d)-3a2.md"
bash tools/report.sh > "$R"
echo "$R" > "$TMPDIR/raport-3a2.txt"
cat "$TMPDIR/raport-3a2.txt"
```

Liczby ze wszystkich 134 784 kombinacji (ok. 60 s):

```bash
mkdir -p "$TMPDIR/wietnam-3a2"
cat > "$TMPDIR/wietnam-3a2/przeglad.js" <<'EOF'
// For the review at the checkpoint of plan 2: over every combination, how often each place is on a trip (all trips, trips
// with no interest), its mean nights, and the things notes/etapy.md asks to look at: a travel day with two flights, Cát Bà
// for 4 nights, Hà Nội three times on one trip, two places at most 1.5 h apart by road that are not next to each other; and
// for the rule of the airports' regions: a flight back near an earlier stop (3.5 h by road; not near the departure airport),
// a round trip that came home by plane in the middle and flew out again, a day of 8 h or more by plane into Sa Pa or Hà Giang.
var DA = { places: PLACES, seasons: SEASONS, graph: travelGraph(ROADS, FLIGHTS), hubs: HUBS };
function node(id) { return PLACES[id].node || id; }
var sets = [[]];
INTERESTS.forEach(function (a, i) { sets.push([a]); INTERESTS.slice(i + 1).forEach(function (b) { sets.push([a, b]); }); });
var total = 0, plain = 0, on = {}, onPlain = {}, nights = {}, twoFlights = 0, catba = 0, catba4 = 0, hanoi3 = 0, apart = 0, back = 0, home = 0, longNorth = 0;
var R = DA.graph.road;
sets.forEach(function (interests) { LEVELS.forEach(function (level) { for (var month = 1; month <= 12; month++) for (var days = MIN_DAYS; days <= MAX_DAYS; days++)
  Object.keys(HUBS).forEach(function (from) { Object.keys(HUBS).forEach(function (to) {
    var st = normSettings({ from: from, to: to, month: month, days: days, interests: interests, level: level }, PLACES, HUBS), r = planRoute(st, DA);
    if (!r.ok) return;
    total++; if (!interests.length) plain++;
    var seen = {}, legs = r.stops.map(function (x) { return x.leg; }).concat([r.home]), ids = r.stops.map(function (x) { return node(x.id); });
    r.stops.forEach(function (x) {
      nights[x.id] = (nights[x.id] || 0) + x.n;
      if (x.id === 'catba') { catba++; if (x.n === 4) catba4++; }
      if (seen[x.id]) return;
      seen[x.id] = true; on[x.id] = (on[x.id] || 0) + 1; if (!interests.length) onPlain[x.id] = (onPlain[x.id] || 0) + 1;
    });
    if (legs.some(function (L) { return L.flights >= 2; })) twoFlights++;
    if (ids.filter(function (id) { return id === 'hanoi'; }).length >= 3) hanoi3++;
    if (ids.some(function (a, i) { return ids.some(function (b, j) { return j > i + 1 && a !== b && R[a][b] <= 1.5; }); })) apart++;
    if (r.stops.some(function (x, j) {
      return x.leg.flights && R[to][ids[j]] > 3.5 && ids.slice(0, Math.max(0, j - 1)).some(function (a) { return a !== ids[j] && R[a][ids[j]] <= 3.5; });
    })) back++;
    if (from === to) {
      var came = false;
      if (r.stops.some(function (x, j) {
        if (!j || !x.leg.flights) return false;
        var inX = R[from][ids[j]] <= REGION_H, inY = R[from][ids[j - 1]] <= REGION_H;
        if (came && inY && !inX) return true;
        if (inX && !inY) came = true;
        return false;
      })) home++;
    }
    if (r.stops.some(function (x) { return (x.id === 'sapa' || x.id === 'hagiang') && x.leg.flights && x.leg.total >= 8; })) longNorth++;
  }); }); }); });
function pc(n, of) { return (100 * n / of).toFixed(1).replace('.', ',') + '%'; }
print('Tras: ' + total + ' (bez zainteresowań: ' + plain + ')');
print('| Miejsce | Na trasach | Bez zainteresowań | Średnio nocy |');
print('|---|---|---|---|');
Object.keys(on).sort(function (a, b) { return on[b] - on[a]; }).forEach(function (id) {
  print('| ' + (CONTENT[id] ? CONTENT[id].short : id) + (PLACES[id].node ? ' (noc w drodze)' : '') + ' | ' + pc(on[id], total) + ' | ' + pc(onPlain[id] || 0, plain) + ' | ' + (nights[id] / on[id]).toFixed(2).replace('.', ',') + ' |');
});
print('Dzień z dwoma lotami: ' + pc(twoFlights, total) + ' tras. Cát Bà na 4 noce: ' + pc(catba4, catba) + ' pobytów w Cát Bà. Hà Nội trzy razy: ' + hanoi3 + ' tras. Miejsca do 1,5 h drogi od siebie, nie obok siebie: ' + apart + ' tras.');
print('Lot z powrotem w okolicę wcześniejszego miejsca (zygzak): ' + pc(back, total) + ' tras. Trasa w obie strony, która wróciła samolotem do domu w środku i znów odleciała: ' + home + ' tras. Dzień z lotem do Sa Pa albo Hà Giang, 8 h i dłużej: ' + pc(longNorth, total) + ' tras.');
EOF
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
P=site2/src
"$J" $P/places.js $P/seasons.js $P/travel.js $P/engine.js $P/content.js $P/content/*.js "$TMPDIR/wietnam-3a2/przeglad.js" > "$TMPDIR/wietnam-3a2/przeglad.md"
cat "$TMPDIR/wietnam-3a2/przeglad.md"
```

Oczekiwane, jak w suchej próbie (w nawiasie po planie 1):
- Hà Giang na 28,0% tras (22,6% tras bez zainteresowań, średnio 4,77 nocy), Sa Pa na 20,7% (16,7%, 3,56 nocy);
- Đà Nẵng na 37,0% (34,2%), Pù Luông na 9,1% (11,2%), Cát Bà na 33,4% (43,2%), Cúc Phương na 19,7% (25,1%), Phong Nha na 30,8% (35,9%), Cao Bằng na 5,6% (5,9%), Ba Bể na 8,0% (6,3%);
- dzień z dwoma lotami: 10,3% tras (12,4%);
- Cát Bà na 4 noce: 70,9% pobytów (73,7%);
- Hà Nội trzy razy: 1497 tras (435);
- miejsca najwyżej 1,5 h drogi od siebie, a nie obok siebie: 0 tras (0);
- lot z powrotem w okolicę wcześniejszego miejsca: 2,4% tras (7,8%), w całości wypad z delty Mekongu na Phú Quốc;
- trasa w obie strony, która wróciła samolotem do domu w środku i znów odleciała: 0 tras (6423);
- dzień z lotem do Sa Pa albo Hà Giang, 8 h i dłużej: 3,3% tras (przed planem 2 tych miejsc nie było).

Jeśli poprawki z kroku 9 zmienią dane albo silnik, policz liczby jeszcze raz i opisz zmianę w wyniku przeglądu.

- [ ] **Krok 6: Zrzuty sześciu ustawień**

Zrzuty idą na 390 px (trzy także na 1400 px), na całą wysokość strony, i są cięte na kawałki do oglądania. W suchej próbie strony miały 21 100–26 300 px przy 390 px i 13 900–17 500 px przy 1400 px, a z6 (30 dni) 34 300 i 23 800 px; wysokości zrzutów mają zapas:

```bash
mkdir -p "$TMPDIR/wietnam-3a2"
i=1
for s in \
  'od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2&motocykl=hagiang' \
  'od=HAN&do=SGN&miesiac=2027-03&dni=18&co=gory&poziom=3' \
  'od=DAD&do=SGN&start=2027-01-28&koniec=2027-02-14&co=kultura,jedzenie&poziom=1' \
  'od=DAD&do=DAD&miesiac=2027-01&dni=18&co=&poziom=1' \
  'od=HAN&do=HAN&miesiac=2027-03&dni=10&co=przyroda&poziom=2&dodaj=cucphuong,ninhbinh' \
  'od=DAD&do=DAD&miesiac=2027-01&dni=30&co=gory,morze&poziom=3'; do
  if [ $i -eq 6 ]; then hp=36000; hd=26000; else hp=28000; hd=16000; fi
  bash tests/shot.sh "$s" 390 "$TMPDIR/wietnam-3a2/z$i-390.png" $hp
  case $i in 1|5|6) bash tests/shot.sh "$s" 1400 "$TMPDIR/wietnam-3a2/z$i-1400.png" $hd ;; esac
  i=$((i+1))
done
python3 - "$TMPDIR/wietnam-3a2" <<'EOF'
# cuts each long screenshot into pieces 2400 px high, to look at with Read: kawalki/z1-390-00.png, z1-390-01.png, …
import glob, os, sys
from PIL import Image
d = sys.argv[1]
os.makedirs(os.path.join(d, 'kawalki'), exist_ok=True)
for p in sorted(glob.glob(os.path.join(d, 'z*.png'))):
    im = Image.open(p)
    name = os.path.basename(p)[:-4]
    for n, y in enumerate(range(0, im.height, 2400)):
        im.crop((0, y, im.width, min(y + 2400, im.height))).save(os.path.join(d, 'kawalki', '%s-%02d.png' % (name, n)))
EOF
```

Białe kawałki pod końcem strony pomiń. Obejrzyj kawałki narzędziem Read i sprawdź (trasy z suchej próby):
- **z1** (Hà Nội w obie strony, październik, 14 dni, góry i kultura, Hà Giang „Samodzielnie”; Ninh Bình 2, Hà Giang 5, Sa Pa 4, Hà Nội 2):
  - karta Hà Giang: przełącznik na „Samodzielnie”, a w ramce po wspólnym zdaniu o ryzyku zdanie o kontrolach od 12 kwietnia 2026 i dwóch wypadkach, w radach motocykl z miasta Hà Giang i pozwolenie za 10 USD, bez powtórzeń wspólnych rad;
  - pięć dni pętli z plakietką „Motocykl samodzielnie”, dzień 3 to Lũng Cú, dzień 1 mówi o pozwoleniu;
  - mapa przy 1400 px: Hà Giang z punktem Đồng Văn przy górnej krawędzi, Sa Pa po lewej, etykiety nie nachodzą na siebie ani na tytuł kadru;
  - „Przed wyjazdem”: motocykl na pętlę Hà Giang i noclegi u gospodarzy ze zdaniem o Đồng Văn i Du Già w porze gryki; w budżecie pozwolenie na strefę przygraniczną.
- **z2** (Hà Nội → Hồ Chí Minh City, marzec, 18 dni, góry, „Ekstremalnie”; Hà Nội 1, Sa Pa 4, Hà Giang 4, noc w Hà Nội w drodze, ✈ Phong Nha 3, ✈ Đà Lạt 3, Cát Tiên 1):
  - Sa Pa: dni 2–3 to Fansipan pieszo z plakietką „Trudny dzień”; pod pierwszym własny plan „Gdy pada” (firma przekłada wejście), pod drugim żaden;
  - Phong Nha: Hang Én z planem „Gdy pada” o Oxalis, nie o kładce;
  - „Przed wyjazdem”: Fansipan pieszo z prośbą o numer licencji firmy i kartę przewodnika, Hang Én na początku listy.
- **z3** (Đà Nẵng → Hồ Chí Minh City, 28.01–14.02.2027, kultura i jedzenie, „Spokojnie”): dawny zygzak z listy. W suchej próbie: Hội An 2, Huế 3, ✈ Ninh Bình 2, Cát Bà 3, Hà Nội 4, ✈ Hồ Chí Minh City 3. Pokaż go użytkownikowi w kroku 9 obok trasy sprzed planu (Hội An, ✈ Hà Nội, ✈ Huế, ✈ Đà Lạt, ✈ Mekong, Hồ Chí Minh City).
- **z4** (Đà Nẵng w obie strony, styczeń, 18 dni, bez zainteresowań, „Spokojnie”): bez powrotu do domu w środku. W suchej próbie: Hội An 2, ✈ Phú Quốc 3, ✈ Hồ Chí Minh City 3, Cát Tiên 2, Đà Lạt 4, ✈ Huế 3, potem drogą na lotnisko.
- **z5** (Hà Nội w obie strony, marzec, 10 dni, przyroda, z Cúc Phương i Ninh Bình): mapa przy 1400 px, kadr północy: znaczniki Cúc Phương i Ninh Bình stoją obok siebie i nie zachodzą na siebie.
- **z6** (Đà Nẵng w obie strony, styczeń, 30 dni, góry i morze, „Ekstremalnie”):
  - najwyższa kwota („7 900–16 200 zł” w suchej próbie) mieści się w kafelku;
  - karta przejazdu Sa Pa → Hội An (lot przez Hà Nội, 8,65 h) z ostrzeżeniem „Długi dzień w drodze”;
  - mapa z jedenastoma pobytami bez kolizji etykiet.

Na wszystkich zrzutach sprawdź też:
- twardą spację w kwotach i „ok.” z liczbą;
- nazwy, które nie łamią się w środku (Mã Pí Lèng, Đồng Văn, La Dao, Thác Tình Yêu);
- teksty po polsku i per „ty”.

- [ ] **Krok 7: Ręcznie w przeglądarce: pasek u góry, „Na górę”, mapa i przełącznik z klawiatury.** Chrome bez okna nie uruchamia IntersectionObserver, a wbudowana przeglądarka nie otwiera `file://`, więc strona idzie z lokalnego serwera.
  - Utwórz `.claude/launch.json`:

    ```json
    {
      "version": "0.0.1",
      "configurations": [
        { "name": "strona-3a2", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765", "--directory", "site2/out/pages"], "port": 8765 }
      ]
    }
    ```

  - Uruchom serwer narzędziem `preview_start` (nazwa `strona-3a2`) i przejdź do `http://localhost:8765/#od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2`.
  - Ustaw widok `mobile` (`resize_window`) i sprawdź, przewijając i robiąc zrzuty ekranu:
    - pasek u góry, póki formularz jest na ekranie, ma trzy odnośniki: „W skrócie”, „Dzień po dniu”, „Przed wyjazdem”; wszystkie mieszczą się w całości, także przy szerokości 320 px (`resize_window` z `width` 320);
    - gdy formularz zniknie u góry ekranu, pasek pokazuje podsumowanie i „Zmień”;
    - „Na górę” pojawia się po przewinięciu i wraca na górę strony.
  - Ustaw widok `desktop` i sprawdź:
    - przy przewijaniu „Dzień po dniu” mapa podświetla znacznik miejsca, które jest na ekranie, także Hà Giang i Sa Pa;
    - kliknięcie mapy otwiera powiększenie z trzema kadrami, a Escape je zamyka;
    - przełącznik w karcie Hà Giang działa z klawiatury: Tab dochodzi do niego, strzałki zmieniają wybór, ramka „Samodzielnie” się pojawia, a fokus zostaje na przełączniku po przebudowie strony.
  - Wsparcie: klikając pasek u góry, klikaj po współrzędnych ze świeżego zrzutu, nie po `ref` (kliknięcie po `ref` najpierw przewija element na środek ekranu).
  - Zatrzymaj serwer (`preview_stop`) i usuń `.claude/launch.json` (oraz pusty katalog `.claude/`, jeśli nic innego w nim nie ma).

- [ ] **Krok 8: Prawdziwy telefon** (z użytkownikiem, w domowej sieci Wi-Fi). Najpierw zapytaj, czy użytkownik ma teraz telefon pod ręką, w tej samej sieci Wi-Fi co Mac. Jeśli tak:
  - podaj adres Maca i uruchom serwer w tle (narzędziem Bash z `run_in_background`):

    ```bash
    ipconfig getifaddr en0
    python3 -m http.server 8766 --bind 0.0.0.0 --directory site2/out/pages
    ```

  - macOS może zapytać, czy `python3` ma przyjmować połączenia przychodzące: to decyzja użytkownika;
  - zanim użytkownik weźmie telefon do ręki, podaj mu od razu dwa gotowe linki z adresem z `ipconfig` i listę stuknięć (link z `#…` z czatu na Macu nie przyda się w telefonie, więc adres trzeba wpisać; w logu serwera widać, który link telefon otworzył):
    1. `http://<adres Maca>:8766/#od=HAN&do=HAN&miesiac=2027-10&dni=14&co=gory,kultura&poziom=2`: w karcie Hà Giang przełącznik dotykiem na „Samodzielnie”, potem ramka z wymaganiami, ryzykiem i radami, a dni pętli z plakietką „Motocykl samodzielnie”; mapa: stuknięcie otwiera powiększenie, a krzyżyk je zamyka;
    2. `http://<adres Maca>:8766/#od=HAN&do=SGN&miesiac=2027-03&dni=18&co=gory&poziom=3`: w Sa Pa dwa dni Fansipanu; w „Przed wyjazdem” Fansipan pieszo z linkiem Sapa O'Chau, który otwiera się w nowej karcie; „Kopiuj plan na WhatsApp” z linią budżetu (przez zwykłe http przycisk pokazuje zapasowe pole z zaznaczonym tekstem, bo schowek działa tylko na stronie https: to nie błąd, powiedz o tym od razu);
  - porównaj log serwera z listą: jeśli otworzył się tylko jeden link, zapytaj spokojnie o drugi;
  - po sprawdzeniu zatrzymaj serwer.

  Jeśli telefon nie łączy się z Makiem (zapora, sieć dla gości), zaproponuj prywatny artifact; publikacja tylko po wyraźnym „tak” użytkownika: publish z `file_path = site2/out/web/index.html` i `files` = obrazy z `site2/out/web/img/`.

- [ ] **Krok 9: Przegląd z użytkownikiem**
  - Pokaż użytkownikowi w rozmowie:
    - kawałki zrzutów z kroku 6: z1 (Hà Giang „Samodzielnie”, mapa), z2 (Fansipan, Hang Én, rezerwacje), z3 i z4 (trasy bez zygzaków, obok tras sprzed planu), z5 (znaczniki), z6 (najwyższa kwota, długi dzień);
    - tabelę z kroku 5 z liczbami po planie 1;
    - wynik ręcznego sprawdzenia, telefonu i wydruku.
  - Do decyzji, po jednej sprawie, z rekomendacją i liczbami (poprawić teraz albo przenieść do etapu 4 lub partii B):
    - Hà Nội trzy razy na 1497 trasach (po planie 1: 435): pętla północy wraca przez Hà Nội, który jest węzłem dróg północy; rekomendacja: zostawić;
    - dzień z lotem do Sa Pa albo Hà Giang, 8–9 h, na 3,3% tras, z ostrzeżeniem „Długi dzień w drodze”; rekomendacja: zostawić;
    - Pù Luông na 9,1% tras (11,2%), Cát Bà na 33,4% (43,2%), Cúc Phương na 19,7% (25,1%): Hà Giang i Sa Pa biorą noce północy; rekomendacja: zostawić, wrócić po pierwszych opiniach znajomych;
    - Cao Bằng na 5,6% i Ba Bể na 8,0% tras (punkt kontrolny planu 1: „do sprawdzenia po pętli północy”): obie prawie zawsze (96% ich tras) jadą razem z Hà Giang, a cała pętla Ba Bể → Cao Bằng → Hà Giang → Sa Pa stoi na 2,8% tras; rekomendacja: zostawić;
    - Đà Nẵng na 37,0% tras (30,8% tras z przyrodą); rekomendacja: zostawić.
  - Poprawki idą jako osobne commity: test, który nie przechodzi (gdzie się da), kod, `ALL PASS`, sondy, commit z opisem „Poprawka z punktu kontrolnego 3A2: …”. Zmiana ocen albo danych najpierw trafia do researchu miejsca.
  - Wynik przeglądu zapisz jednym akapitem w `$TMPDIR/przeglad-3a2.txt`. Akapit mówi:
    - co przeszło, z liczbami z kroków 1–5;
    - co obejrzał użytkownik;
    - co poprawiono;
    - co przeszło do etapu 4 albo partii B.

    Zadanie 8 wpisze go do `notes/etapy.md` po „Punkt kontrolny planu 2 (…):”.

---

### Zadanie 8: Notatki: status, następny krok i raport tras

**Pliki:**
- Zmień: `notes/etapy.md`, `CLAUDE.md`
- Dodaj: raport tras z zadania 7, krok 5 (ścieżka w `$TMPDIR/raport-3a2.txt`)

- [ ] **Krok 1: Zmiany w notatkach.** Skrypt sprawdzono na kopiach plików z 13.10.2026; dał 8 zmian. Bierze:
  - dzisiejszą datę;
  - wynik przeglądu z `$TMPDIR/przeglad-3a2.txt` (zadanie 7, krok 9);
  - ścieżkę raportu tras z `$TMPDIR/raport-3a2.txt` (zadanie 7, krok 5).

  Zmienia:
  - `notes/etapy.md`:
    - tabela etapów: partia A zrobiona, z linkiem do raportu tras planu 2; partia B po publikacji;
    - partia A w sekcji etapu 3: co zrobił plan 2;
    - „Następny krok” to etap 4. Ma trzy akapity: co zrobił plan 2, wynik punktu kontrolnego i etap 4 (najpierw krótka sesja decyzji, potem audyt). Opis planu 1 przechodzi pod nagłówek „Z planu 1 partii A (etap 3)”, obok „Z planu 2B”. Akapit o sesji decyzji planu 2 znika, bo jej decyzje stoją w planie;
    - lista „Do etapu 3” to teraz „Do etapu 3 (partia B i kolejne)”, bez punktów, które zrobił plan 2. Dochodzą: najszersza kwota po planie 2, wolne kolory 18 i 20, drogi Sa Pa poza danymi i sprawdzanie reguły regionu lotniska po każdej partii;
    - do audytu przed publikacją (etap 4) dochodzą: research planu 2 (z tym, co sprawdzić tuż przed publikacją), licencje 10 nowych zdjęć i strona Sapa O'Chau, która odpowiada curlowi kodem 406;
  - `CLAUDE.md`: status i czas pełnego testu (ok. 100 s).

Uruchom z katalogu repo:

```bash
python3 -I - <<'EOF'
# notes after plan 2 of stage 3, batch A, from the repo's folder; each change asserts its old text once. The date is
# today's, the result of the review comes from $TMPDIR/przeglad-3a2.txt (task 7, step 9) and the route report is the file
# named in $TMPDIR/raport-3a2.txt (task 7, step 5).
import datetime, os
t = datetime.date.today()
D = '%d.%02d.%d' % (t.day, t.month, t.year)
TMP = os.environ['TMPDIR']
REVIEW = open(os.path.join(TMP, 'przeglad-3a2.txt'), encoding='utf-8').read().strip()
assert REVIEW, 'the review first: task 7, step 9'
R = open(os.path.join(TMP, 'raport-3a2.txt'), encoding='utf-8').read().strip()
assert R.startswith('notes/raport-tras-') and os.path.exists(R), 'the route report first: task 7, step 5'
R = os.path.basename(R)
e = open('notes/etapy.md', encoding='utf-8').read()
c = open('CLAUDE.md', encoding='utf-8').read()
n = 0
def rep(s, a, b):
    global n
    assert s.count(a) == 1, a[:70]
    n += 1
    return s.replace(a, b)
PLAN = 'plans/2026-10-13-etap-3a2-miejsca.md'
# the table of stages
e = rep(e, '| 3. Nowe miejsca, partiami | w toku: partia A, plan 1 (Phong Nha, Cúc Phương, Đà Nẵng) zrobiony 13.10.2026, raport tras: [notes/raport-tras-2026-10-13.md](raport-tras-2026-10-13.md); plan 2 (Hà Giang, Sa Pa) zaplanowany 13.10.2026: [' + PLAN + '](' + PLAN + '), do wykonania |',
  '| 3. Nowe miejsca, partiami | partia A zrobiona @DZIEN@: plan 1 (Phong Nha, Cúc Phương, Đà Nẵng) 13.10.2026, raport tras: [notes/raport-tras-2026-10-13.md](raport-tras-2026-10-13.md); plan 2 (Hà Giang, Sa Pa) @DZIEN@, raport tras: [notes/' + R + '](' + R + '); partia B po publikacji |')
# batch A in the section of stage 3
e = rep(e, '  - plan 2 ([' + PLAN + '](' + PLAN + '), zaplanowany 13.10.2026): Hà Giang (pętla z kierowcą albo samodzielnie, z researchem przepisów o motocyklach) i Sa Pa z Fansipanem.',
  '  - plan 2 ([' + PLAN + '](' + PLAN + '), zrobiony @DZIEN@): Hà Giang z pętlą na 3 albo 4 dni, z kierowcą albo samodzielnie, i Sa Pa z Fansipanem pieszo na dwa dni; w silniku reguła regionu lotniska, która usuwa zygzaki, a na mapie rozsuwane znaczniki.')
# the next step: stage 4; what plan 1 did moves under „Z planu 1 partii A”, the plan of plan 2 goes (it is in the plan)
i = e.index('## Następny krok: etap 3, partia A, plan 2\n')
j = e.index('**Plan 2 partii A: Hà Giang i Sa Pa.**')
k = e.index('**Do etapu 3 (nowe miejsca):**')
old1 = e[i:j].replace('## Następny krok: etap 3, partia A, plan 2\n\n', '').rstrip('\n')
assert old1.startswith('Zrobione 13.10.2026: plan 1 partii A') and old1.count('\n\n') == 2, old1[:80]
assert e[j:k].count('\n- **') == 3, 'the paragraph of plan 2 has changed'
n += 1
e = e[:i] + '''## Następny krok: etap 4, audyt i publikacja

Zrobione @DZIEN@: plan 2 partii A ([''' + PLAN + '''](''' + PLAN + ''')), a z nim cała partia A. Na stronie są Hà Giang i Sa Pa, każde z treścią na trzech poziomach, sezonem, klimatem, drogami, cenami, rezerwacjami i pięcioma zdjęciami: Hà Giang z pętlą przez płaskowyż Đồng Văn na 3 albo 4 dni, przełącznikiem „Z kierowcą / Samodzielnie” z ramką o kontrolach od kwietnia 2026 i pozwoleniem na strefę przygraniczną; Sa Pa z doliną Mường Hoa, kolejką i Fansipanem pieszo na dwa dni, wyłączonym w V–IX. Silnik nie robi już zygzaków: trasa nie wraca samolotem w okolicę lotniska przylotu (6,5 h drogą), nie odlatuje z okolicy lotniska wylotu, żeby do niej wrócić, a trasa w obie strony po powrocie samolotem do domu już stamtąd nie odlatuje (`REGION_H`, obok `NEAR_H`). Na mapie znaczniki, które zachodzą na siebie, odsuwają się z kreską do prawdziwego punktu, wyprawa na dwa dni ma własny plan na deszcz (`hard.rain`), a Phong Nha ma drogi z lotnisk Đà Nẵng i Huế.

Punkt kontrolny planu 2 (@DZIEN@): DECYZJE-Z-PRZEGLADU

**Etap 4:** najpierw krótka sesja decyzji o tym, co etap 4 zostawia do wyboru (format wersji offline, kolejność audytu, pierwsze linki dla znajomych), potem audyt według sekcji „Etap 4” wyżej i listy „Do audytu przed publikacją (etap 4)” niżej. Wysłanie na GitHuba i publikacja tylko za zgodą.

''' + e[k:]
# the list for stage 3: what plan 2 did goes, what batch B needs stays
a = e.index('**Do etapu 3 (nowe miejsca):**\n')
b = e.index('\nDrobniejsze uwagi: [uwagi-z-przegladow-1b.md](uwagi-z-przegladow-1b.md)\n\n**Do audytu przed publikacją (etap 4):**')
old = e[a:b]
assert old.count('\n- ') == 12 and 'reguła `NEAR_H` i zygzak' in old and 'Hà Giang: zamiana motocykla' in old, 'the list for stage 3 has changed'
n += 1
e = e[:a] + '''**Do etapu 3 (partia B i kolejne):**
- każde nowe miejsce dostaje też dane z planu 2B: cenę noclegu w `COSTS.night`, płatne części dni jako pozycje `COSTS.items` wskazane polem `cost` w dniach, wpisy w `BOOK` z wyprzedzeniem i linkami, miejsce w `HOMESTAYS`, gdy nocuje się u gospodarzy, i teksty dalekich dróg z lotnisk w `AIR_KEYS`; liczby stoją w tabelach „Zestawienie” pliku researchu miejsca (`research/<id>-2026-10.md`), a test danych czyta je stamtąd (w wierszu `fit` zainteresowanie „gory” bez „ó”);
- najszersza kwota budżetu ma postać „d ddd–dd ddd zł” (najwyższa po planie 2: 7 900–16 200 zł, 30 dni z Đà Nẵng w obie strony, góry i morze, „Ekstremalnie”, styczeń, z Hang Én i Fansipanem); cyfry kroju mają jedną szerokość, więc kafelek mieści każdą kwotę tej postaci, ale kwota z pięcioma cyframi na obu końcach byłaby szersza: po każdej partii sonda `before.js` przy 641, 768 i 901 px;
- nowe miejsca dostają trudne dni według zasad z [research/trudne-dni-2026-10.md](../research/trudne-dni-2026-10.md) (dziś trudny dzień mają Cát Tiên, Pù Luông, Phong Nha, Cúc Phương i Sa Pa); wyprawa na dwa dni to trudna wersja z polem `next` i własnym planem na deszcz (`hard.rain`);
- każde nowe miejsce dostaje numer koloru (`color` w treści) i musi leżeć w kadrze mapy (`site2/src/panels.js`). Paleta ma 20 kolorów, a zajętych jest 18 (wolne zostały 18 i 20), więc przed partią B paletę trzeba rozszerzyć. Pù Mát (partia B) leży poza kadrami: trzeba przesunąć kadr i wygenerować kontury od nowa (`geo/make_basemap.py`);
- wielowyrazowe nazwy z nowych tekstów bez wietnamskich liter (jak Lang Biang, Paradise Cave, La Dao) dopisać do `KEEP_TOGETHER` w `site2/src/content.js`; nazwy z takimi literami wiąże reguła `tieVietnamese`, a krótkie nazwy miejsc strona wiąże sama. Sonda `changes.js` łapie tylko nazwy z literą wietnamską, więc nazwy bez niej trzeba wypatrzyć samemu;
- przed dodaniem czwartego kadru: `site2/src/basemap.js` do testów (`SOURCES` w `tests/run.sh`) i test, że `BASEMAP` ma kontury każdego kadru z `MAP_PANELS`; bez nowych konturów strona by się wywróciła;
- powód „zamknięte w części tego terminu” (`whyOff`) zasłania „za daleko”, gdy miejsce z X w części terminu nie zmieściłoby się też z odległości; dziś żadne miejsce nie ma X, więc wrócić do tego przy pierwszych danych z X;
- drogi Sa Pa – Ba Bể (ok. 9 h) i Sa Pa – Pù Luông (ok. 9,75 h) to szacunki bez źródła i zostały poza danymi (silnik i tak ich nie używał); dopisać, gdy research znajdzie źródło (`research/sapa-2026-10.md`);
- reguła regionu lotniska (`REGION_H`, 6,5 h drogą od lotniska) zależy od tego, które miejsca leżą blisko lotnisk: po każdej partii policzyć zygzaki i powroty do domu w środku trasy skryptem z punktu kontrolnego planu 2 (`notes/plans/2026-10-13-etap-3a2-miejsca.md`, zadanie 7, krok 5).
''' + e[b:]
# the audit before publishing: the research of plan 2, the new photos, the link that refuses curl
e = rep(e, '**Do audytu przed publikacją (etap 4):**\n', '''**Do audytu przed publikacją (etap 4):**
- research planu 2 partii A: punkty „Do sprawdzenia przed publikacją” i „Czego nie ustaliłem” w `research/hagiang-2026-10.md` i `research/sapa-2026-10.md`, a tuż przed publikacją: czy płaskowyż Đồng Văn uznano za obszar turystyczny (wtedy pozwolenie na strefę przygraniczną przestaje być potrzebne) i czy opłata to dalej 10 USD, czy otwarto autostradę Tuyên Quang – Hà Giang (czas z Hà Nội), opłata parku Hoàng Liên za Fansipan pieszo i przerwy szlaku, przegląd kolejki na Fansipan w roku podróży i skała „Mỏm đá sống ảo” na Mã Pí Lèng;
- licencje i autorzy 10 nowych zdjęć (`hagiang_0`–`4`, `sapa_0`–`4`), razem z resztą przy publikacji;
- `bash tools/links.sh`: strona Sapa O'Chau odpowiada curlowi kodem 406 (zapora serwera po kilku zapytaniach, 13.10.2026), a w przeglądarce otwiera się normalnie: sprawdzić ją w przeglądarce;
''')
# what plan 1 did, under its own heading next to the earlier plans
e = rep(e, '### Z planu 2B\n', '### Z planu 1 partii A (etap 3)\n\n' + old1 + '\n\n### Z planu 2B\n')
c = rep(c, '**Status (13.10.2026):** etap 3 w toku: partia A, plan 1 (Phong Nha, Cúc Phương, Đà Nẵng z Sơn Trà) zrobiony. Następny krok: plan 2 partii A (Hà Giang, Sa Pa), zob. [notes/etapy.md](notes/etapy.md).',
  '**Status (@DZIEN@):** etap 3, partia A zrobiona: plan 1 (Phong Nha, Cúc Phương, Đà Nẵng z Sơn Trà) i plan 2 (Hà Giang, Sa Pa). Następny krok: etap 4 (audyt i publikacja), zob. [notes/etapy.md](notes/etapy.md).')
c = rep(c, '`bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 70 s).', '`bash tests/run.sh --full` sprawdza wszystkie, także w trybie dat (ok. 100 s).')
e = e.replace('@DZIEN@', D).replace('DECYZJE-Z-PRZEGLADU', REVIEW)
c = c.replace('@DZIEN@', D)
open('notes/etapy.md', 'w', encoding='utf-8').write(e)
open('CLAUDE.md', 'w', encoding='utf-8').write(c)
print(n, 'changes')
EOF
```

Oczekiwane: `8 changes`. Jeśli skrypt stanie na `assert`, któryś tekst w notatkach zmienił się od 13.10.2026: przeczytaj komunikat, popraw skrypt pod nowy tekst i opisz to w wyniku zadania.

- [ ] **Krok 2: Sprawdź**

```bash
git status --short
grep -n "@DZIEN@\|DECYZJE-Z-PRZEGLADU" notes/etapy.md CLAUDE.md
grep -c $'\xc2\xa0' notes/etapy.md CLAUDE.md
```

Oczekiwane:
- zmienione są tylko `notes/etapy.md` i `CLAUDE.md`, a nowy jest raport tras;
- drugi grep nic nie wypisuje;
- trzeci wypisuje `0` przy obu plikach.

Przeczytaj `git diff` i sprawdź:
- akapit przeglądu brzmi dobrze po „Punkt kontrolny planu 2 (…):”;
- pod „Z planu 1 partii A (etap 3)” stoją trzy akapity planu 1: co zrobił, punkt kontrolny i końcowy przegląd;
- linia `notes/raport-tras-RRRR-MM-DD.md` w CLAUDE.md zostaje bez zmian (to wzór nazwy pliku).

- [ ] **Krok 3: Commit**

```bash
git add notes/etapy.md CLAUDE.md "$(cat "$TMPDIR/raport-3a2.txt")"
git commit -F - <<'EOF'
Notatki: plan 2 partii A zrobiony, a z nim partia A; punkt kontrolny i raport tras; następny krok: etap 4 (audyt i publikacja)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

`git push` tylko za zgodą użytkownika.

---

## Jak sprawdzać

- `bash tests/run.sh` → `ALL PASS` (co 7. kombinacja); `bash tests/run.sh --full` → wszystkie kombinacje i tryb dat, z budżetem, rezerwacjami, pakowaniem i wjazdem każdej trasy, ok. 100 s.
- `python3 site2/build.py`, potem:
  - `bash "$TMPDIR/sondy-3a2.sh" <miesiąc>`: 14 sond z zadania 1, krok 4 (`MIESIAC` albo `RRRR-MM`), ostatnia linia `sondy (…): 0 z 14 nie przeszło`; jedna sonda: `bash tests/probe.sh tests/probes/<sonda>.js <szerokość> '<ustawienia>'`, kończy się `done, all checks ok`;
  - `bash tests/shot.sh '<ustawienia>' 390 plik.png [wysokość]`: zrzut; cała strona to ok. 21 100–34 300 px przy 390 px i 13 900–23 800 px przy 1400 px;
  - `bash tests/print.sh '<ustawienia>' plik.pdf [dark]`: wydruk, 0 zakrytych linii;
  - w ustawieniach słowo `MIESIAC` to miesiąc za pięć miesięcy od dziś.
- `bash tools/links.sh`: linki rezerwacji i wjazdu odpowiadają 2xx (curl, bez zapisywania stron); strona Sapa O'Chau odpowiada kodem 406, więc ją sprawdza się w przeglądarce.
- `bash tools/report.sh > notes/raport-tras-RRRR-MM-DD.md`: przykładowe trasy do przeglądu.
- Liczby ze wszystkich 134 784 tras (udział miejsc, zygzaki, powroty do domu w środku trasy, dni z dwoma lotami): skrypt z zadania 7, krok 5, ok. 60 s.
- Ręcznie przez lokalny serwer: pasek u góry, „Na górę”, podświetlanie na mapie, powiększenie mapy i przełącznik z klawiatury (zadanie 7, krok 7).
- Po każdym zadaniu: `grep -rn $'\xc2\xa0' site2 tests | grep -v "var NB"` nic nie wypisuje.
