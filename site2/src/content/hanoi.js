/* Hà Nội: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.hanoi = {
  name: 'Hà Nội', short: 'Hà Nội',
  sub: 'Stolica: Stare Miasto, świątynie i wioski rzemieślników',
  region: 'north', maps: 'Hanoi, Vietnam', pt: [21.03, 105.85], color: 11,
  photos: ['hanoi_0', 'hanoi_1', 'hanoi_3', 'hanoi_5'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Stare Miasto i jezioro Hoàn Kiếm', d: 'Spacer wokół jeziora Hoàn Kiếm i uliczkami Starego Miasta.',
      solo: { pace: 'travel', t: 'Wieczór w Hà Nội', d: 'O zmierzchu spacer wokół jeziora Hoàn Kiếm i uliczkami Starego Miasta, a na kolację uliczne jedzenie: bún chả albo bánh cuốn. Rano kawa z jajkiem i dalej w drogę.' } },
    { p: 2, o: 2, pace: 'culture', t: 'Świątynia Literatury i Muzeum Etnologii', d: 'Świątynia Literatury na otwarcie o 8:00, zanim przyjdą grupy. Potem Muzeum Etnologii z wiejskimi domami naturalnej wielkości w ogrodzie (w poniedziałki zamknięte).' },
    { p: 3, o: 3, pace: 'culture', t: 'Wioska Đường Lâm', d: 'Jednodniowa wycieczka do Đường Lâm, ok. 1½ godz. w każdą stronę: uliczki z laterytu, XVII-wieczny dom wspólnoty i obiad u miejscowej rodziny.' },
    { p: 4, o: 4, pace: 'culture', t: 'Ceramika i rzeka', d: 'Wioska garncarzy Bát Tràng nad Rzeką Czerwoną, a w drodze do miasta, o zachodzie słońca, spacer przez most Long Biên.' }
  ],
  again: { pace: 'travel', t: 'Powrót do Hà Nội', d: 'Wieczór na luzie: o zachodzie słońca spacer przez most Long Biên nad Rzeką Czerwoną, a na kolację phở cuốn (wołowina zawinięta w płaty makaronu ryżowego) na ulicy Ngũ Xã nad jeziorem Trúc Bạch.' },
  gem: 'Đường Lâm, stara laterytowa wioska na zachód od miasta.',
  skip: 'Train Street: raz po raz zamykana dla turystów, a gdy jest otwarta – zatłoczona.',
  instead: 'most Long Biên o świcie.'
};
