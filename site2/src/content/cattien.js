/* Park Narodowy Cát Tiên: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.cattien = {
  name: 'Park Narodowy Cát Tiên', short: 'Cát Tiên',
  sub: 'Nizinna dżungla, gibony i nocne safari',
  region: 'south', maps: 'Cat Tien National Park, Vietnam', pt: [11.43, 107.43],
  photos: ['cattien_0', 'cattien_1', 'cattien_3', 'cattien_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'W głąb dżungli', d: 'Przepraw się małym promem przez rzekę Đồng Nai do siedziby parku i nocuj na jego terenie. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet.',
      solo: { pace: 'nature', t: 'Dżungla nocą i o świcie', d: 'Dotrzyj najpóźniej w połowie popołudnia i nocuj w parku; spacer o świcie zarezerwuj w siedzibie parku przy zameldowaniu. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet. Następnego dnia przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem śniadanie i dalej w drogę.', early: true } },
    { p: 2, o: 2, pace: 'hike', early: true, t: 'Gibony i Jezioro Krokodyli', d: 'Przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem leśnym szlakiem do Bàu Sấu, czyli Jeziora Krokodyli. Wędrówkę i pozwolenie zarezerwuj dzień wcześniej w siedzibie parku.',
      easy: { pace: 'nature', t: 'Cát Tiên na spokojnie', d: 'Krótki spacer z przewodnikiem do olbrzymich drzew niedaleko siedziby parku, potem łodzią przez rzekę Đồng Nai do ośrodka ratowania naczelnych Dao Tiến, gdzie uratowane gibony i langury przygotowuje się do powrotu na wolność.', early: false },
      hard: { pace: 'hike', early: false, late: true, off: [8, 9, 10], t: 'Noc nad Jeziorem Krokodyli', d: 'Noc w głębi lasu, na stacji strażników nad Bàu Sấu, czyli Jeziorem Krokodyli. Organizuje ją sam park: nocleg, pozwolenie i przewodnika zarezerwuj z wyprzedzeniem w recepcji parku, bo pokoi jest niewiele. Rano bez pośpiechu, a najpóźniej o 14:00 wyjazd z siedziby: 9 km samochodem, potem 5 km pieszo leśną ścieżką z przewodnikiem parku. Wieczorem zachód słońca nad jeziorem i kolacja ze strażnikami. Park zaznacza, że trzeba być w dobrej kondycji, a pokoje są proste, bez wi-fi, klimatyzacji i zasięgu telefonu. Następnego ranka wyjście znad jeziora do 9:00 i 5 km pieszo do drogi, więc dalsza droga zaczyna się koło południa: nie rezerwuj na ten dzień wczesnego lotu.' } }
  ],
  gem: 'Jeden z ostatnich dużych lasów nizinnych na południu, cztery godziny od Hồ Chí Minh City.',
  events: [
    { from: [4, 1], to: [11, 30], warn: true, t: 'Pora deszczowa w parku: na leśne ścieżki weź skarpety przeciw pijawkom, bo park uważa je wtedy za potrzebne.' }
  ]
};
