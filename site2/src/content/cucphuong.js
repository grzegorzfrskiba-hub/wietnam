/* Cúc Phương: texts of the place (stage 3, batch A). Facts and sources: research/cucphuong-2026-10.md. Fields: see site2/src/content.js. */
CONTENT.cucphuong = {
  name: 'Park Narodowy Cúc Phương', short: 'Cúc Phương',
  sub: 'Ratowane naczelne, tysiącletnie drzewa i las nocą',
  region: 'north', maps: 'Cuc Phuong National Park, Ninh Binh, Vietnam', pt: [20.25, 105.71], color: 15,
  photos: ['cucphuong_0', 'cucphuong_1', 'cucphuong_2', 'cucphuong_3', 'cucphuong_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['cucphuong.centres', 'cucphuong.night'], t: 'Ratowane naczelne i las nocą', d: 'Zamelduj się w pokoju parku przy bramie albo nad jeziorem Mạc. Po południu ośrodki ratowania, 500 m od kasy: langury Delacoura i z Cát Bà, gibony, lori, żółwie i łuskowce, czynne zwykle do 17:00. Wieczorem nocna przejażdżka melexem po skraju lasu: świetliki, jelenie i lori; zbiórka o 18:30, start o 19:00, a nocujący w parku mają pierwszeństwo.',
      rain: 'muzeum parku i centrum dla zwiedzających są pod dachem, a w ośrodkach ratowania przyda się parasol; o tym, czy nocna przejażdżka pojedzie w ulewie, decyduje park.',
      solo: { pace: 'nature', cost: ['cucphuong.centres', 'cucphuong.night'], t: 'Las nocą i ratowane naczelne rano', d: 'Dotrzyj najpóźniej późnym popołudniem i zamelduj się w pokoju parku przy bramie. O 18:30 zbiórka na nocną przejażdżkę melexem: świetliki, jelenie i lori. Rano od 8:00 ośrodki ratowania, 500 m od kasy: langury Delacoura, gibony i żółwie, a koło 10:30 dalej w drogę.' } },
    { p: 2, o: 2, pace: 'hike', cost: ['cucphuong.car'], pack: ['torch'], t: 'W głąb lasu, do starych drzew', d: 'Rano 20 km autem do Bống w głębi lasu, gdzie nocujący w parku wchodzą od 7:00. Stamtąd pętla przez las pierwotny: jaskinia Động Sơn Cung i tysiącletnie drzewo Chò, 7 km i 2–3 godziny, bez przewodnika, z latarką do jaskini. Po obiedzie 700-letnie Chò chỉ i jaskinia Động Người Xưa ze śladami ludzi sprzed 7 500 lat. Z lasu wyjdź przed zmrokiem.',
      rain: 'płaska ścieżka do drzew Sấu i krótka do 700-letniego Chò chỉ, bo na mokrym wapieniu jest ślisko, a po południu muzeum parku przy bramie.',
      easy: { pace: 'nature', t: 'Krótkie ścieżki do starych drzew', d: 'Autem do Bống i krótka ścieżka do 700-letniego Chò chỉ, 2 km tam i z powrotem, pół godziny do godziny. W drodze powrotnej jaskinia Động Người Xưa (300 m i ok. 200 schodów) i płaska ścieżka wśród starych drzew Sấu i Đăng, 2 km, ok. godziny.' },
      hard: { pace: 'hike', off: [5, 6, 7, 8, 9], cost: ['cucphuong.car', 'cucphuong.maybac'], t: 'Na Mây Bạc z przewodnikiem parku', d: 'Mây Bạc, najwyższy szczyt parku (648 m): z Bống stromą ścieżką przez las pierwotny i wapienne zbocza, 7 km tam i z powrotem, 4–5 godzin. Przewodnik parku jest obowiązkowy, a trasa tylko dla dorosłych w dobrej kondycji. Z lasu wyjdź przed zmrokiem: po 19:00 w głąb lasu wolno wejść tylko na nocną wycieczkę z przewodnikiem.' } }
  ],
  gem: 'Najstarszy park narodowy Wietnamu, z tysiącletnim drzewem Chò i ośrodkiem, który ratuje najrzadsze naczelne kraju.',
  skip: 'Wycieczka jednodniowa z Hà Nội: ok. 5,5 godziny w aucie i las w najgorętszej porze dnia.',
  instead: 'noc w parku: wieczorem nocna przejażdżka, rano las od 7:00.',
  events: [
    { from: [4, 10], to: [6, 10], t: 'Pora motyli i świetlików: motyle zwykle od drugiego tygodnia kwietnia do końca maja, najwięcej w słoneczne dni po deszczu, a świetliki od końca kwietnia do początku czerwca. Termin przesuwa się z roku na rok, a to szczyt ruchu w parku, więc nocleg zarezerwuj wcześniej.' },
    { from: [5, 1], to: [9, 30], warn: true, pack: ['leeches'], t: 'Pora deszczowa: wapienne zbocza są śliskie, a w lesie są komary i pijawki, więc weź skarpety przeciw pijawkom i środek odstraszający. Przed sztormem albo po ulewach park potrafi wstrzymać noclegi w głębi lasu, więc dzień wcześniej sprawdź komunikat parku.' },
    { from: [12, 1], to: [2, 29], warn: true, t: 'Chłodna pora: od grudnia do lutego noce w lesie są chłodne, a dni bywają szare. Weź ciepłą warstwę na wieczór i na nocną przejażdżkę.' }
  ]
};
