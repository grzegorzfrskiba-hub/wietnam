/* Wyżyna wokół Đà Lạt: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.dalat = {
  name: 'Wyżyna wokół Đà Lạt', short: 'Đà Lạt',
  sub: 'Sosnowe wzgórza, ciche pensjonaty i chłodne noce',
  region: 'south', maps: 'Da Lat, Vietnam', pt: [11.94, 108.44], color: 5,
  photos: ['dalat_4', 'dalat_1', 'dalat_2', 'dalat_0', 'dalat_3'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Zmierzch nad doliną Tà Nung', d: 'Omiń centrum i jedź na zachód, na grzbiety nad doliną Tà Nung, by o zmierzchu patrzeć na sosnowe wzgórza i plantacje kawy. Nocleg w pensjonacie za miastem, gdzie noce są ciche i chłodne, a w porze suchej rozgwieżdżone.' },
    { p: 2, o: 2, pace: 'hike', cost: ['dalat.bidoup'], t: 'Las mglisty Bidoup–Núi Bà', d: 'Wędrówka z przewodnikiem wśród starych sosen, omszałego lasu i dzikich storczyków w stronę Hòn Giao. Do szlaku jest ok. 50 km, więc to cały dzień. W porze suchej, od listopada do kwietnia, ścieżki są pewne pod nogami, a w porze deszczowej bywają śliskie. Przewodnika zarezerwuj w centrum informacji turystycznej parku.', easy: { pace: 'nature', cost: ['dalat.cablecar'], t: 'Las sosnowy i klasztor nad jeziorem', d: 'Kolejka linowa z Robin Hill sunie nad lasem sosnowym do Trúc Lâm, cichego klasztoru zen nad jeziorem Tuyền Lâm. Spacer po klasztornych ogrodach, potem niespieszny rejs łódką po jeziorze albo długi obiad nad brzegiem.' } },
    { p: 3, o: 3, pace: 'hike', cost: ['dalat.langbiang'], t: 'Szczyt Lang Biang', d: 'Całodniowa wędrówka na Núi Bà (2167 m), najwyższy szczyt góry Lang Biang, 12 km na północ od miasta. Od ośrodka u stóp góry 3–4 km asfaltem do punktu kontrolnego parku Bidoup–Núi Bà, potem ścieżką przez gęsty, wilgotny las i stromymi schodami na szczyt: w sumie 4–6 godzin marszu w obie strony. Ścieżka miejscami ginie w lesie, a w porze deszczowej jest śliska i bywają na niej pijawki. Idź tylko z przewodnikiem. Przy rezerwacji zapytaj, czy szlak jest otwarty i czy biuro ma zgodę parku. Gdy jest zamknięty, park prowadzi własną całodniową trasę z przewodnikiem i obiadem: 10 km od wodospadu Thiên Thai do stacji strażników Đưng Jar Giêng.', easy: { pace: 'culture', cost: ['dalat.train'], t: 'Stara kolej i kwiatowe wioski', d: 'Zabytkowy pociąg z dworca w Đà Lạt, pamiętającego lata 30. XX wieku, do Trại Mát i pagody Linh Phước wyłożonej mozaiką, a potem szklarnie kwiatowej wioski Vạn Thành.' } },
    { p: 4, o: 4, pace: 'culture', cost: ['dalat.caudat'], t: 'Herbaciane wzgórza i plantacja kawy', d: 'Wschód słońca nad herbacianymi wzgórzami Cầu Đất, potem rodzinna plantacja kawy ludu K’Ho u stóp góry Lang Biang.', early: true }
  ],
  gem: 'Bidoup–Núi Bà. Większość odwiedzających Đà Lạt w ogóle nie wyjeżdża poza miasto.',
  skip: 'Crazy House, parki kwiatowe i letni tor saneczkowy Datanla.',
  instead: 'las sosnowy i wioski za miastem.'
};
