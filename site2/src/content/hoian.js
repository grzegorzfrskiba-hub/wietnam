/* Hội An: texts of the place (plan 1B; the December planner had Hội An and Huế as one place). Fields: see site2/src/content.js. */
CONTENT.hoian = {
  name: 'Hội An', short: 'Hội An',
  sub: 'Stare miasto o świcie, wioski warzywników i kanały wśród wodnych palm',
  region: 'centre', maps: 'Hoi An, Quang Nam, Vietnam', pt: [15.88, 108.34],
  photos: ['hoian_0', 'hoian_1', 'hoian_3', 'hoian_4', 'hoian_5'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Bocznymi drogami Hội An', d: 'Po przyjeździe weź rower i jedź do warzywnej wioski Trà Quế, a potem nad kanały wśród wodnych palm kokosowych w Cẩm Thanh.',
      rain: 'warsztaty robienia lampionów, a do tego kryty targ.',
      easy: { pace: 'travel', t: 'Hội An bez pośpiechu', d: 'Lekcja gotowania w warzywnej wiosce Trà Quế (dojazd taksówką), potem stare miasto o zmierzchu, gdy zapalają się lampiony, rejs sampanem po rzece Thu Bồn i kolacja, zanim ok. 19:00 tłum będzie największy. Turystycznie, a mimo to pięknie.' },
      solo: { pace: 'travel', early: true, t: 'Hội An wieczorem i o świcie', d: 'Wieczorem stare miasto w świetle lampionów, najlepiej przed 19:00, zanim tłum będzie największy, i kolacja nad rzeką Thu Bồn. Rano o 6:00 te same uliczki są prawie puste, potem śniadanie i dalej w drogę.' } },
    { p: 2, o: 2, pace: 'culture', early: true, t: 'Stare miasto o 6:00', d: 'Zobacz stare miasto, zanim zjadą się jednodniowi turyści: domy kupieckie i domy zgromadzeń w porannym świetle (do środka wejdziesz od ok. 8:00, z biletem na stare miasto). Po południu wolny czas: krawiec, kawiarnia nad rzeką albo rowerem na plażę An Bàng, 3–4 km od starego miasta.',
      rain: 'domy zgromadzeń na starym mieście albo przymiarki u krawca.' }
  ],
  again: { pace: 'travel', t: 'Powrót do Hội An', d: 'Spokojny wieczór nad morzem: taksówką albo rowerem przez pola ryżowe na plażę An Bàng, 3–4 km od starego miasta, spacer brzegiem i kolacja z owocami morza w jednej z knajpek przy plaży.' },
  gem: 'Cẩm Thanh: kanały wśród wodnych palm kokosowych, kilka kilometrów od starego miasta.',
  skip: 'Stare miasto w Hội An o 19:00, gdy tłumy wśród lampionów są największe.',
  instead: 'stare miasto o 6:00 i okoliczne wioski.',
  events: [
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach rzeka Thu Bồn potrafi zalać stare miasto i na kilka dni wstrzymać zwiedzanie. Sprawdzaj prognozy i miej plan w zapasie.' }
  ]
};
