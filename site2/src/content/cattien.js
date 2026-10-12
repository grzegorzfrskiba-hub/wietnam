/* Park Narodowy Cát Tiên: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.cattien = {
  name: 'Park Narodowy Cát Tiên', short: 'Cát Tiên',
  sub: 'Nizinna dżungla, gibony i nocne safari',
  region: 'south', maps: 'Cat Tien National Park, Vietnam', pt: [11.43, 107.43], color: 4,
  photos: ['cattien_0', 'cattien_1', 'cattien_3', 'cattien_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['cattien.safari'], t: 'W głąb dżungli', d: 'Przepraw się małym promem przez rzekę Đồng Nai do siedziby parku i nocuj na jego terenie. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet.',
      solo: { pace: 'nature', cost: ['cattien.safari', 'cattien.gibbons'], t: 'Dżungla nocą i o świcie', d: 'Dotrzyj najpóźniej w połowie popołudnia i nocuj w parku; spacer o świcie do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet. Następnego dnia przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem śniadanie i dalej w drogę.', early: true } },
    { p: 2, o: 2, pace: 'hike', early: true, cost: ['cattien.gibbons', 'cattien.bausau_day'], t: 'Gibony i Jezioro Krokodyli', d: 'Przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem leśnym szlakiem do Bàu Sấu, czyli Jeziora Krokodyli. Wyjście do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele, a wędrówkę do Bàu Sấu i pozwolenie najpóźniej dzień wcześniej w siedzibie parku.',
      easy: { pace: 'nature', cost: ['cattien.trees'], t: 'Cát Tiên na spokojnie', d: 'Rano spacer z przewodnikiem parku do olbrzymich drzew Tung i Gõ, ok. 2 godzin leśną ścieżką. Po południu muzeum przyrody i ośrodek ratowania dzikich zwierząt tuż obok siedziby parku.', early: false },
      hard: { pace: 'hike', early: false, late: true, off: [8, 9, 10], cost: ['cattien.bausau_night'], pack: ['torch'], t: 'Noc nad Jeziorem Krokodyli', d: 'Noc w głębi lasu, na stacji strażników nad Bàu Sấu, czyli Jeziorem Krokodyli. Organizuje ją sam park: nocleg, pozwolenie i przewodnika zarezerwuj z wyprzedzeniem w recepcji parku, bo pokoi jest niewiele. Rano bez pośpiechu, a najpóźniej o 14:00 wyjazd z siedziby: 9 km samochodem, potem 5 km pieszo leśną ścieżką z przewodnikiem parku. Wieczorem zachód słońca nad jeziorem i kolacja ze strażnikami. Park zaznacza, że trzeba być w dobrej kondycji, a pokoje są proste, bez wi-fi, klimatyzacji i zasięgu telefonu. Następnego ranka wyjście znad jeziora do 9:00 i 5 km pieszo do samochodu, więc w dalszą podróż ruszysz koło południa: nie rezerwuj na ten dzień wczesnego lotu.' } }
  ],
  gem: 'Jeden z ostatnich dużych lasów nizinnych na południu, cztery godziny od Hồ Chí Minh City.',
  events: [
    { from: [4, 1], to: [11, 30], warn: true, pack: ['leeches'], t: 'Pora deszczowa w parku: na leśne ścieżki weź skarpety przeciw pijawkom, bo park uważa je wtedy za potrzebne.' }
  ]
};
