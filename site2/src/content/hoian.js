/* Hội An: texts of the place (plan 1B; the December planner had Hội An and Huế as one place; Mỹ Sơn on the third day since
   batch B, facts and sources in research/myson-2026-10.md). Fields: see site2/src/content.js. */
CONTENT.hoian = {
  name: 'Hội An', short: 'Hội An',
  sub: 'Stare miasto o świcie, wioski warzywników i kanały wśród wodnych palm',
  region: 'centre', maps: 'Hoi An, Quang Nam, Vietnam', pt: [15.88, 108.34], color: 6,
  photos: ['hoian_0', 'hoian_1', 'hoian_6', 'hoian_4', 'hoian_5'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Bocznymi drogami Hội An', d: 'Po przyjeździe weź rower i jedź do warzywnej wioski Trà Quế, a potem nad kanały wśród wodnych palm kokosowych w Cẩm Thanh.',
      rain: 'warsztaty robienia lampionów, a do tego kryty targ.',
      easy: { pace: 'travel', cost: ['hoian.cooking'], t: 'Hội An bez pośpiechu', d: 'Lekcja gotowania w warzywnej wiosce Trà Quế (dojazd taksówką), potem stare miasto o zmierzchu, gdy zapalają się lampiony, rejs sampanem po rzece Thu Bồn i kolacja, zanim ok. 19:00 tłum będzie największy. Turystycznie, a mimo to pięknie.' },
      solo: { pace: 'travel', early: true, t: 'Hội An wieczorem i o świcie', d: 'Wieczorem stare miasto w świetle lampionów, najlepiej przed 19:00, zanim tłum będzie największy, i kolacja nad rzeką Thu Bồn. Rano o 6:00 te same uliczki są prawie puste, potem śniadanie i dalej w drogę.' } },
    { p: 2, o: 2, pace: 'culture', early: true, t: 'Stare miasto o 6:00', d: 'Zobacz stare miasto, zanim zjadą się jednodniowi turyści: domy kupieckie i domy zgromadzeń w porannym świetle (do środka wejdziesz od ok. 8:00, z biletem na stare miasto). Po południu wolny czas: krawiec, kawiarnia nad rzeką albo rowerem na plażę An Bàng, 3–4 km od starego miasta.',
      rain: 'domy zgromadzeń na starym mieście albo przymiarki u krawca.' },
    { p: 3, o: 3, pace: 'culture', early: true, cost: ['hoian.myson'], t: 'Mỹ Sơn o 6:00', d: 'O 5:00 autem z kierowcą do Mỹ Sơn, ok. godziny drogi. Kasa otwiera się o 6:00, a elektryczny wózek wiezie 2 km w głąb doliny, do ruin świątyń Czamów z IV–XIII wieku wśród dżungli. Obejdź grupy B, C, D, A i G, póki chłodno i pusto: ok. 2–3 godziny. O 9:00 u stóp wieży G jest występ tańca Czamów, a koło 9:30 zaczynają zjeżdżać autokary. Trzymaj się oznaczonych ścieżek, bo na zboczach doliny mogą leżeć niewybuchy. Po południu odpoczynek w Hội An, a jeśli kierowca jedzie drugim brzegiem Thu Bồn, wracasz przez pola ryżowe i wsie.',
      rain: 'w lekkim deszczu Mỹ Sơn jest czynne, ale ścieżki są śliskie, a w niższych grupach jest błoto; przy ulewach woda zalewa dolinę i drogę dojazdową, a zarząd zamyka teren, więc rano sprawdź jego komunikat. Wtedy jedź do Muzeum Rzeźby Czamskiej w Đà Nẵng (7:00–17:00), gdzie stoją rzeźby z Mỹ Sơn.',
      easy: { pace: 'boat', early: false, cost: ['hoian.myson_tour'], t: 'Mỹ Sơn z powrotem łodzią', d: 'Wycieczka grupowa z przewodnikiem: odbiór z hotelu ok. 7:00, w Mỹ Sơn ok. 9:00, z występem tańca Czamów, potem obiad, a ok. 13:30 powrót łodzią po Thu Bồn do Hội An. Wygodniej niż o świcie, ale w dolinie będzie gorąco i tłoczno.' } }
  ],
  again: { pace: 'travel', t: 'Powrót do Hội An', d: 'Spokojny wieczór nad morzem: taksówką albo rowerem przez pola ryżowe na plażę An Bàng, spacer brzegiem i kolacja z owocami morza w jednej z knajpek przy plaży.' },
  gem: 'Cẩm Thanh: kanały wśród wodnych palm kokosowych, kilka kilometrów od starego miasta.',
  skip: 'Stare miasto w Hội An o 19:00, gdy tłumy wśród lampionów są największe.',
  instead: 'stare miasto o 6:00 i okoliczne wioski.',
  events: [
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory powodzi: po ulewach rzeka Thu Bồn potrafi zalać stare miasto, a także drogę do Mỹ Sơn i dolinę z ruinami, i na kilka dni wstrzymać zwiedzanie. Sprawdzaj prognozy i komunikaty i miej plan w zapasie.' }
  ]
};
