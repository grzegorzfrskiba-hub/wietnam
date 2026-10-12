/* Huế: texts of the place (plan 1B; the December planner had Hội An and Huế as one place). Fields: see site2/src/content.js. */
CONTENT.hue = {
  name: 'Huế', short: 'Huế',
  sub: 'Cesarskie Miasto, grobowce nad Rzeką Perfumową i pola ryżowe wokół',
  region: 'centre', maps: 'Hue, Vietnam', pt: [16.46, 107.59], color: 7,
  photos: ['hue_0', 'hue_1', 'hue_2', 'hue_6', 'hue_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['hue.citadel'], t: 'Cesarskie Miasto', d: 'Po przyjeździe Cesarskie Miasto (Đại Nội): mury, bramy i dziedzińce dawnej stolicy dynastii Nguyễn. Kasy zamykają ok. 17:00, a od połowy marca do połowy października ok. 17:30. Pod wieczór spacer nad Rzeką Perfumową i kolacja z bún bò Huế.',
      rain: 'kryte galerie Cesarskiego Miasta i Muzeum Królewskich Antyków.' },
    { p: 2, o: 2, pace: 'culture', cost: ['hue.tombs'], t: 'Huế na rowerze', d: 'Rowerem wzdłuż Rzeki Perfumowej do grobowców Minh Mạng i Tự Đức, a późnym popołudniem do pagody Thiên Mụ.',
      rain: 'hala targu Đông Ba nad Rzeką Perfumową i obiad z bún bò Huế przy jednym ze straganów z jedzeniem.',
      easy: { pace: 'culture', cost: ['hue.boatcar'], t: 'Huế łodzią i samochodem', d: 'Smoczą łodzią w górę Rzeki Perfumowej do pagody Thiên Mụ, potem samochodem do grobowców Minh Mạng i Tự Đức.' } },
    { p: 3, o: 3, pace: 'nature', cost: ['hue.lagoon'], t: 'Okolice Huế', d: 'Kryty dachówką most w Thanh Toàn wśród pól ryżowych, potem laguna Tam Giang o zachodzie słońca.',
      rain: 'lekcja gotowania w Huế albo samochodem do starych domów z ogrodami w Kim Long.' }
  ],
  gem: 'Thanh Toàn, kryty most z lat 70. XVIII wieku wśród pól ryżowych na wschód od Huế.',
  events: [
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach woda potrafi zalać Cytadelę i zamknąć Đại Nội na kilka dni. Sprawdzaj prognozy i komunikaty przed zwiedzaniem.' }
  ]
};
