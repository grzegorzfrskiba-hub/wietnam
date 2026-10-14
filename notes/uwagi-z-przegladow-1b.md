# Uwagi z przeglądów planu 1B, odłożone na później

Przeglądy planu 1B zostawiły te drobniejsze uwagi: każda mówi, gdzie leży i dlaczego ma znaczenie, a sekcja mówi, do którego etapu należy.

## Do etapu 2

Zrobione w planie 2A ([plans/2026-10-11-etap-2a-interfejs.md](plans/2026-10-11-etap-2a-interfejs.md), 11.10.2026): wszystkie uwagi z tej sekcji. Przy okazji odpadła uwaga o `NLAB` i `CLAB` z „Do etapu 3”: etykiety mapy rozmieszcza teraz czysta funkcja, test treści pilnuje koloru każdego miejsca, a test kombinacji jego etykiety w kadrze.

## Do etapu 3

- `site2/src/places.js` i `site2/src/content/*.js`: `name` w danych i `short` w treściach trzymają krótką nazwę miejsca i już się różnią (Mekong, noc w Hà Nội w drodze); zostawić jedno (`tools/report.js` czyta `PLACES.name`).
- `site2/src/content/dalat.js`, galeria: dwa zdjęcia z Tà Năng, których żaden plan dnia nie odwiedza; pierwsze zdjęcie (Lang Biang) pasuje do dnia p 3, a ten jest dopiero od trzech nocy; rozstrzygnąć przy module Tà Năng–Phan Dũng.
- `tests/content.test.js`: kontrola tekstu trudnego dnia szuka słowa „przewodnik” albo „operator”, więc przyjmie też „bez przewodnika”; zaostrzyć.
- `site2/src/travel.js`, `site2/src/content/caobang.js`: czasy dojazdu z Cao Bằng są liczone z miasta, a ostatni dzień pobytu (plan p 2) kończy się w Khuổi Ky; sprawdzić względem tego, gdzie jest nocleg.

## Do etapu 4 (audyt przed publikacją)

Zrobione w etapie 4 (14.10.2026, [plan](plans/2026-10-14-etap-4-audyt-i-publikacja.md)): wszystkie uwagi z tej sekcji poza jedną, która przechodzi na partię B (lista „Po publikacji, z partią B” w [etapy.md](etapy.md)): ostatnia strona wydruku bywa prawie pusta (sama stopka).

## Utrzymanie danych

- `site2/src/app.js` (`TODAY`, `clampToday` w `site2/src/page.js`): dzisiejsza data jest przycinana do zakresu danych, najpóźniej do 1.12.2030; po tej dacie lista miesięcy i ostrzeżenie o minionym terminie przestają się zgadzać. Przed końcem 2030 dopisać święta na kolejne lata i przesunąć `PLAN_LAST_YEAR` w `site2/src/holidays.js`.
