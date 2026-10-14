# Pierwowzór: fakty z planów dni ze źródłami z jego audytu (zestawione 14.10.2026)

## Jak czytać

Część zdań w planach dni przeszła bez zmian z pierwowzoru, planera „Vietnam in December”, z którego pochodzą kod i pierwsze teksty tej strony. Fakty z tych zdań sprawdził audyt pierwowzoru z 8–9.10.2026 (`notes/audyt-2026-10-09.md` w repozytorium pierwowzoru, poza tym repozytorium), a ich źródła podał w Aneksie B, „Sprawdzanie faktów: szczegóły i źródła”. Ten plik przenosi z Aneksu B tylko fakty o miejscach, które teksty tego planera nadal podają: każdy sprawdziłem 14.10.2026 w `site2/src/content/*.js` i `site2/src/ui.js`. Wiersz podaje miejsce i pole w pliku treści, zdanie ze strony, fakt według audytu oraz sekcję Aneksu B, adres źródła i jego datę tak, jak podaje je audyt. Adresów nie otwierałem ponownie. Gdy audyt nie podaje adresu albo daty, piszę to wprost: taki fakt nie ma dziś innego źródła niż audyt. Na końcu, po jednej linii na fakt, są fakty z Aneksu B, które pominąłem: te, które notatki w `research/` źródłują na nowo, i te, których strona już nie podaje.

## Fakty na stronie

| miejsce i pole | zdanie na stronie | fakt według audytu | źródło według audytu (data) |
|---|---|---|---|
| `ninhbinh` `days` p 2 i jego `easy` | „do Hoa Lư, stolicy z X wieku, i świątyń jej pierwszych królów (odbudowanych w XVII wieku)”; w `easy` „do Hoa Lư, stolicy z X wieku, i jej świątyń” | Świątynie w Hoa Lư czczą królów z X wieku; według tradycji powstały w XI wieku, a odbudowano je w 1606 roku. | Aneks B, „Do poprawienia”: [czasopismo Uniwersytetu Hoa Lư](https://vjol.info.vn/tckh-truongdaihochoalu/article/download/131893/108331), bez daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `ninhbinh` `gem` | „Langury Delacoura na skałach Vân Long – jedne z najrzadszych naczelnych na świecie.” | W Vân Long żyje ok. 200 z ok. 570 langurów Delacoura na świecie. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `catba` `sub`, `days` p 2 i jego `easy` | „Wyspa porośnięta dżunglą po spokojnej stronie Hạ Long”; „płynie przez Zatokę Lan Hạ aż po spokojny południowy skraj Zatoki Hạ Long” | Rejsy z Cát Bà wpływają na zatokę Hạ Long. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `hue` `gem` | „Thanh Toàn, kryty most z lat 70. XVIII wieku wśród pól ryżowych na wschód od Huế.” | Most w Thanh Toàn pochodzi z 1776 roku. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |
| `puluong` `instead` | „Pù Luông, niecałe dwie godziny drogi od Mai Châu.” | Z Mai Châu do Pù Luông jedzie się 1 h 20 min–2 h. | Aneks B, „Potwierdzone”: bez adresu i daty; sprawdzone w audycie pierwowzoru 8–9.10.2026 |

## Fakt, którego audyt nie potwierdził

| miejsce i pole | zdanie na stronie | fakt według audytu | źródło według audytu (data) |
|---|---|---|---|
| `hanoi` `days` p 3 | „Jednodniowa wycieczka do Đường Lâm, ok. 1½ godz. w każdą stronę” | Czas drogi Hà Nội – Đường Lâm był w pierwowzorze bez źródła, a audyt żadnego nie znalazł. | Aneks B, „Nie dało się potwierdzić”: bez źródła; sprawdzone w audycie pierwowzoru 8–9.10.2026. Samą odległość, ok. 50 km na zachód od Hà Nội, podaje DLM-WIKI w `research/rezerwacje-2026-10.md` |

## Pominięte

Z założenia pominąłem loty i sprawy przewoźników, punkty o Wigilii, ocenę planu pierwowzoru pod kątem jego uczestników i sprawy osobiste.

**Źródła na nowo w tym repozytorium:**

- Świątynia Literatury od 8:00 (`hanoi` `days` p 2): HN-VM i HN-GSM-VM w `research/plany-dni-2026-10.md`; ceny biletu strona nie podaje.
- powrót statku na Cát Bà ok. 12:00 (`catba` `days` p 3): CB-FM w `research/plany-dni-2026-10.md` i Full Moon w wierszu hanoi – catba w `research/polaczenia-2026-10.md`.
- drogi Ninh Bình – Cát Bà i Pù Luông – Ninh Bình: `research/polaczenia-2026-10.md`, gdzie wyszły 4,5 h i 3,5 h (audyt: ok. 4 h i ok. 3 h).
- droga Hà Nội – Cao Bằng i autostrada nie przed Tết 2027: wiersz hanoi – caobang w `research/polaczenia-2026-10.md`, z komunikatem rządu z 29.09.2026 za audytem; strona podaje tylko czas drogi.
- drogi Hồ Chí Minh City – Cát Tiên i Cát Tiên – Đà Lạt: `research/polaczenia-2026-10.md`.
- drogi, które w pierwowzorze nie miały źródła (Hồ Chí Minh City – Phong Điền, Phong Điền – lotnisko Cần Thơ, Đà Nẵng – Hội An, Hà Nội – Pù Luông, Ba Bể – Hà Nội i Ba Bể – Cao Bằng, liczona dziś od miasta zamiast od Bản Giốc): `research/polaczenia-2026-10.md`.
- morze przy Cát Bà w grudniu ok. 22 °C: C10 i C11 w `research/sezony-2026-10.md`; strona podaje tylko „zimne morze” jako powód oceny w XII–III, a zdanie z liczbą zniknęło z tekstu 10.10.2026.
- pogoda w Huế, Đà Nẵng, Đà Lạt, Hà Nội, Hồ Chí Minh City i na Phú Quốc oraz sześć wierszy, których audyt nie potwierdził (Cần Thơ, Hòa Bình, Thanh Hóa, Hải Phòng, Cao Bằng, Bắc Kạn): tabele stacji w `research/sezony-2026-10.md`.
- sezon wypraw w Phong Nha (Hang Én od grudnia) i Sơn Đoòng: OX-HE, OX-HE2, JB-CMP i BLC-2026 w `research/phongnha-2026-10.md`.
- ceny rejsu po Lan Hạ: W-CB-VT (ten sam adres co w audycie) i W-CB-FM w `research/ceny-2026-10.md`.
- stawki aut z kierowcą: `research/ceny-2026-10.md`.
- Cần Giờ z przeprawą promową w Bình Khánh (`saigon` `days` p 2): CG-PROM i CG-MOST w `research/rezerwacje-2026-10.md` oraz W-SG-VNE w `research/ceny-2026-10.md`.
- tramwaj wodny Saigon Waterbus (`saigon` `days` p 1): SG-WB w `research/plany-dni-2026-10.md`, ten sam artykuł co w audycie.
- Tràng An od 7:00 i bilet (`ninhbinh` `days` p 2), także godziny na 2026, których audyt nie potwierdził: NB-JB i NB-VW w `research/plany-dni-2026-10.md`, DZ-BVH w `research/ceny-2026-10.md` (bilet z łodzią 300 000 VND od 1.01.2026; audyt: 250 000 VND).
- Cát Tiên: Bàu Sấu 9 km autem i 5 km pieszo za ok. 250 000 VND i zapisy w parku (`cattien` `days` p 2): CT-ceny i CT-VNE w `research/trudne-dni-2026-10.md`.
- Đà Lạt: kolejka z Robin Hill i pociąg do Trại Mát (`dalat`, wersje `easy` dni p 2 i p 3): W-DL-VW i W-DL-VST w `research/ceny-2026-10.md`.
- Hang Múa, ok. 500 schodów (`ninhbinh` `skip`): NB-NBTC w `research/trudne-dni-2026-10.md`.
- pływająca wioska w części rejsów (`catba` `days` p 2): CB-VT2 w `research/plany-dni-2026-10.md`.
- Việt Hải łodzią i ok. 5 km meleksem albo rowerem (`catba` `days` p 4 i jego `easy`): CB-FM i CB-VT2 w `research/plany-dni-2026-10.md`.
- szlak na Ngự Lâm (`catba` `days` p 4): W-CB-VTT w `research/ceny-2026-10.md`; czasu podejścia z audytu strona nie podaje.
- rozgwiazdy w Rạch Vẹm (`phuquoc` `days` p 2): SunPQ w `research/sezony-2026-10.md`.
- stare miasto w Hội An o 6:00 (`hoian` `days` p 2): HA-GMH w `research/plany-dni-2026-10.md`.
- ryż w Pù Luông zebrany w październiku (`puluong` `days` p 3 i `events`): dziś terminy złotych tarasów z L1 i L2 w `research/sezony-2026-10.md`.
- dom wspólnoty w Đường Lâm z 1684 roku (`hanoi` `days` p 3): DLM-WIKI w `research/rezerwacje-2026-10.md`.
- zasady na przełęczy Hải Vân (audyt ich nie szukał): `research/motocykl-2026-10.md`, sekcja „Przełęcz Hải Vân (Hội An–Huế)”.
- pora wypłynięcia na targ Cái Răng (audyt jej nie szukał; `mekong` `days` p 2): VT-CanTho w `research/sezony-2026-10.md`.

**Strona już tego nie podaje:**

- Bản Giốc zimą 7:30–17:30 i oficjalne godziny wodospadu na 2026: tekst Cao Bằng nie podaje godzin otwarcia.
- różowa trawa i dzikie słoneczniki w grudniu w Đà Lạt: zdanie usunięte 10.10.2026 (`research/plany-dni-2026-10.md`, sekcja „dalat”).
- rejs po Vân Long o złotej godzinie, z wsiadką do ok. 15:45: od 10.10.2026 „późnym popołudniem” (tamże, sekcja „ninhbinh”).
- ośrodek Đảo Tiên (w audycie „Dao Tiến”) czynny codziennie i godziny wizyt: ośrodek jest zamknięty, a dzień w Cát Tiên nie prowadzi do niego od 12.10.2026 (tamże, „Zmiany z planu 2B”).
- zachód słońca z Cannon Fort (audyt go nie szukał): zdanie usunięte 10.10.2026 (tamże, sekcja „catba”).
