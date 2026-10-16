/* Park Narodowy Cát Tiên: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.cattien = {
  name: 'Park Narodowy Cát Tiên', short: 'Cát Tiên',
  sub: 'Nizinna dżungla, gibony i nocne safari',
  what: 'Park narodowy chroniący las tropikalny nad rzeką Đồng Nai, ok. 150 km na północny wschód od Hồ Chí Minh City.',
  region: 'south', maps: 'Cat Tien National Park, Vietnam', pt: [11.43, 107.43], color: 4,
  photos: ['cattien_0', 'cattien_1', 'cattien_3', 'cattien_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['cattien.safari'], t: 'W głąb dżungli', d: 'Przepraw się małym promem przez rzekę Đồng Nai do siedziby parku i nocuj na jego terenie. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet.',
      solo: { pace: 'nature', cost: ['cattien.safari', 'cattien.gibbons'], t: 'Dżungla nocą i o świcie', d: 'Dotrzyj najpóźniej w połowie popołudnia i nocuj w parku; spacer o świcie do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet. Następnego dnia przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem śniadanie i dalej w drogę.', early: true } },
    { p: 2, o: 2, pace: 'hike', early: true, cost: ['cattien.gibbons', 'cattien.bausau_day'], t: 'Gibony i Jezioro Krokodyli', d: 'Przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem leśnym szlakiem do Bàu Sấu, czyli Jeziora Krokodyli. Wyjście do gibonów zarezerwuj w parku przed przyjazdem, bo miejsc jest niewiele, a wędrówkę do Bàu Sấu i pozwolenie najpóźniej dzień wcześniej w siedzibie parku.',
      easy: { pace: 'nature', cost: ['cattien.trees'], t: 'Cát Tiên na spokojnie', d: 'Rano spacer z przewodnikiem parku do olbrzymich drzew Tung i Gõ, ok. 2 godzin leśną ścieżką. Po południu muzeum przyrody i ośrodek ratowania dzikich zwierząt tuż obok siedziby parku.', early: false },
      hard: { pace: 'hike', early: false, late: true, off: [8, 9, 10], cost: ['cattien.bausau_night'], pack: ['torch'], t: 'Noc nad Jeziorem Krokodyli', d: 'Noc na stacji strażników nad Bàu Sấu z przewodnikiem parku. Najpóźniej o 14:00 wyjazd z siedziby: 9 km autem i 5 km pieszo przez las. Wieczorem zachód słońca nad jeziorem i kolacja ze strażnikami, a nocleg w prostym pokoju, bez zasięgu telefonu. Park wymaga dobrej kondycji. Rano 5 km do auta i w drogę koło południa: nie rezerwuj na ten dzień wczesnego lotu.' } }
  ],
  gem: 'Jeden z ostatnich dużych lasów nizinnych na południu, cztery godziny od Hồ Chí Minh City.',
  events: [
    { from: [4, 1], to: [11, 30], warn: true, pack: ['leeches'], t: 'Pora deszczowa w parku: na leśne ścieżki weź skarpety przeciw pijawkom, bo park uważa je wtedy za potrzebne.' }
  ]
};
