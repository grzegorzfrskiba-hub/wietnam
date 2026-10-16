/* Sa Pa and Fansipan: texts of the place (stage 3, batch A, plan 2). Facts and sources: research/sapa-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.sapa = {
  name: 'Sa Pa i Fansipan', short: 'Sa Pa',
  sub: "Tarasy doliny Mường Hoa, wioski H'Mông i Giáy oraz Fansipan, dach Indochin",
  what: 'Górskie miasteczko na ok. 1500 m, dawne francuskie letnisko na północnym zachodzie, ok. 320 km od Hà Nội.',
  region: 'north', maps: 'Sa Pa, Lao Cai, Vietnam', pt: [22.34, 103.84], color: 17,
  photos: ['sapa_0', 'sapa_1', 'sapa_2', 'sapa_3', 'sapa_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Miasteczko na zboczu', d: 'Zamelduj się w Sa Pa, ok. 1500 m nad morzem, w dawnym francuskim letnisku. Wieczorem spacer po miasteczku. Nawet latem noce są tu chłodne, więc miej pod ręką ciepłą warstwę.' },
    { p: 2, o: 2, pace: 'hike', cost: ['sapa.trek'], t: 'Wioski doliny Mường Hoa', d: "Całodniowa wędrówka z lokalnym przewodnikiem: z Sa Pa w dół do Ý Linh Hồ i Lao Chải, a potem wzdłuż potoku Mường Hoa do Tả Van, między tarasami ryżowymi ludu H'Mông i Giáy. To ok. 10 km, głównie w dół, z obiadem u rodziny w wiosce. Z Tả Van wrócisz samochodem.",
      rain: 'wybierz krótszy odcinek doliną albo przełóż wędrówkę, bo ścieżki między tarasami są wtedy śliskie, a w gęstej mgle lepiej przeczekać.',
      easy: { pace: 'nature', cost: ['sapa.cablecar'], t: 'Fansipan kolejką i wioska Cát Cát', d: 'Rano kolejką linową nad doliną Mường Hoa na Fansipan, 3143 m: jedź z samego rana, zanim przyjdą chmury, i weź ciepłą kurtkę, czapkę i rękawiczki. Kolejka co roku staje na przegląd, na tydzień albo dłużej (w 2025 na trzy tygodnie), więc przed przyjazdem sprawdź jej komunikat. Po południu spacer w dół do wioski Cát Cát z wodospadem.' },
      hard: { pace: 'hike', late: true, off: [5, 6, 7, 8, 9], cost: ['sapa.fansipan'], pack: ['torch'], t: 'Fansipan pieszo: do obozu na 2800 m', d: 'Pierwszy dzień dwudniowego wejścia na Fansipan, 3143 m: z przełęczy Trạm Tôn przez las, obiad na 2200 m, a po południu nocleg w obozie na 2800 m, bez prądu. Idź tylko z firmą, która załatwi zgodę parku, i z przewodnikiem z kartą wejścia: na własną rękę do lasu wchodzić nie wolno. Szlak jest stromy i śliski, dla osób w dobrej kondycji.',
        rain: 'przy ulewie albo burzy firma przekłada wejście, a w czasie sztormów urząd turystyki prowincji każe wstrzymać wyjścia w góry: zostań w Sa Pa i wjedź na szczyt kolejką, gdy się przejaśni.',
        next: { pace: 'hike', cost: ['sapa.descent'], t: 'Fansipan pieszo: szczyt i powrót', d: 'Rano podejście na szczyt, na którym będziesz ok. 10:00–10:30, potem zejście do obozu na obiad i dalej do Trạm Tôn, a w Sa Pa ok. 17:00. Krócej wraca się kolejką spod szczytu (bilet kosztuje tyle co w obie strony), a wtedy w Sa Pa będziesz ok. 12:00–13:00. Od końca listopada do lutego na szczycie bywa lód, więc weź rękawiczki i ciepłą kurtkę.' } } },
    { p: 3, o: 3, pace: 'nature', cost: ['sapa.cablecar'], t: 'Fansipan kolejką i wioska Cát Cát', d: 'Rano kolejką linową nad doliną Mường Hoa na Fansipan, 3143 m: jedź z samego rana, zanim przyjdą chmury, i weź ciepłą kurtkę, czapkę i rękawiczki. Kolejka co roku staje na przegląd, na tydzień albo dłużej (w 2025 na trzy tygodnie), więc przed przyjazdem sprawdź jej komunikat. Po południu spacer w dół do wioski Cát Cát z wodospadem.',
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
