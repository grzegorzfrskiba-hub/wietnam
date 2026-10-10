/* Wyżyna wokół Đà Lạt: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.dalat = {
  name: 'Wyżyna wokół Đà Lạt', short: 'Đà Lạt',
  sub: 'Sosnowe wzgórza, ciche pensjonaty i chłodne noce',
  region: 'south', maps: 'Da Lat, Vietnam', pt: [11.94, 108.44],
  photos: ['dalat_0', 'dalat_1', 'dalat_2', 'dalat_4', 'dalat_3'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Sosnowe wzgórza o zmierzchu', d: 'Omiń centrum i jedź na zachód, na grzbiety nad doliną Tà Nung, by o zmierzchu patrzeć na sosnowe wzgórza i plantacje kawy. Nocleg w pensjonacie za miastem, gdzie noce są ciche i chłodne, a w porze suchej rozgwieżdżone.' },
    { p: 2, o: 2, pace: 'hike', t: 'Las mglisty Bidoup–Núi Bà', d: 'Wędrówka z przewodnikiem wśród starych sosen, omszałego lasu i dzikich storczyków w stronę Hòn Giao. Do szlaku jest ok. 50 km, więc to cały dzień. W porze suchej, od grudnia do kwietnia, ścieżki są pewne pod nogami, a w porze deszczowej bywają śliskie. Przewodnika zarezerwuj w centrum informacji turystycznej parku.', easy: { pace: 'nature', t: 'Las sosnowy i klasztor nad jeziorem', d: 'Kolejka linowa z Robin Hill sunie nad lasem sosnowym do Trúc Lâm, cichego klasztoru zen nad jeziorem Tuyền Lâm. Spacer po klasztornych ogrodach, potem niespieszny rejs łódką po jeziorze albo długi obiad nad brzegiem.' } },
    { p: 3, o: 3, pace: 'hike', t: 'Trawiaste wzgórza Tà Năng', d: 'Jednodniowa wędrówka pierwszym odcinkiem szlaku Tà Năng–Phan Dũng, często nazywanego najpiękniejszą trasą trekkingową Wietnamu. W porze suchej wzgórza złocieją, a w porze deszczowej strumienie nagle wzbierają i kamienie w korytach są śliskie. Idź tylko z licencjonowanym lokalnym przewodnikiem, który załatwia pozwolenie: po wypadkach szlak zamknięto dla wędrowców bez przewodnika i nadal nie wolno chodzić nim na własną rękę. Organizatorzy sprzedają głównie wyjścia dwudniowe, więc o jednodniowe i o aktualne zasady zapytaj przy rezerwacji.', easy: { pace: 'culture', t: 'Stara kolej i kwiatowe wioski', d: 'Zabytkowy pociąg z dworca w Đà Lạt, pamiętającego lata 30. XX wieku, do Trại Mát i pagody Linh Phước wyłożonej mozaiką, a potem szklarnie kwiatowej wioski Vạn Thành.' } },
    { p: 4, o: 4, pace: 'culture', t: 'Herbaciane wzgórza i plantacja kawy', d: 'Wschód słońca nad herbacianymi wzgórzami Cầu Đất, potem rodzinna plantacja kawy ludu K’Ho u stóp góry Lang Biang.', early: true }
  ],
  gem: 'Bidoup–Núi Bà. Większość odwiedzających Đà Lạt w ogóle nie wyjeżdża poza miasto.',
  skip: 'Crazy House, parki kwiatowe i letni tor saneczkowy Datanla.',
  instead: 'las sosnowy i wioski za miastem.'
};
