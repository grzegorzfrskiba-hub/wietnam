/* Park Narodowy Cát Tiên: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.cattien = {
  name: 'Park Narodowy Cát Tiên', short: 'Cát Tiên',
  sub: 'Nizinna dżungla, gibony i nocne safari',
  region: 'south', maps: 'Cat Tien National Park, Vietnam', pt: [11.43, 107.43],
  photos: ['cattien_0', 'cattien_1', 'cattien_3', 'cattien_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'W głąb dżungli', d: 'Przeprawcie się małym promem przez rzekę Đồng Nai do siedziby parku i nocujcie na jego terenie. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet.', solo: { pace: 'nature', t: 'Dżungla nocą i o świcie', d: 'Dotrzyjcie najpóźniej w połowie popołudnia i nocujcie w parku; spacer o świcie zarezerwujcie w siedzibie parku przy zameldowaniu. Po zmroku nocna przejażdżka w poszukiwaniu jeleni i cywet. Następnego dnia przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem śniadanie i dalej w drogę.', early: true } },
    { p: 2, o: 2, pace: 'hike', t: 'Gibony i Jezioro Krokodyli', d: 'Przed świtem wyjście ze strażnikiem parku, żeby posłuchać nawoływania gibonów, potem leśnym szlakiem do Bàu Sấu, czyli Jeziora Krokodyli. Wędrówkę i pozwolenie zarezerwujcie dzień wcześniej w siedzibie parku.', early: true, easy: { pace: 'nature', t: 'Cát Tiên na spokojnie', d: 'Krótki spacer z przewodnikiem do olbrzymich drzew niedaleko siedziby parku, potem łodzią przez rzekę Đồng Nai do ośrodka ratowania naczelnych Dao Tiến, gdzie uratowane gibony i langury przygotowuje się do powrotu na wolność.', early: false } }
  ],
  gem: 'Jeden z ostatnich dużych lasów nizinnych na południu, cztery godziny od Hồ Chí Minh City.'
};
