/* The places (modules) the engine plans with: only what the engine needs. Texts and photos come with plan 1B.
   name: short Polish name. axis: position on the south–north line that trips sweep along, close to the latitude
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà). nights: [min, ideal, max]; the
   minimum is 1 only where a one-night plan exists. level: the lowest adventure level the place is offered at
   (1 spokojnie, 2 aktywnie, 3 ekstremalnie). fit: 0–3 for each interest. node: the travel point it shares with
   another place (hanoiStop is a night in Hà Nội on the way, between two other places). */
var PLACES = {
  saigon:    { name: 'Hồ Chí Minh City', axis: 10.78, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  mekong:    { name: 'Delta Mekongu', axis: 10.03, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  phuquoc:   { name: 'Phú Quốc', axis: 10.33, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 1, gory: 0, morze: 3 } },
  cattien:   { name: 'Cát Tiên', axis: 11.43, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
  dalat:     { name: 'Đà Lạt', axis: 11.94, nights: [2, 3, 4], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 2, gory: 2, morze: 0 } },
  hoian:     { name: 'Hội An', axis: 15.88, nights: [1, 2, 2], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
  hue:       { name: 'Huế', axis: 16.46, nights: [1, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
  puluong:   { name: 'Pù Luông', axis: 20.2, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  ninhbinh:  { name: 'Ninh Bình', axis: 20.3, nights: [1, 2, 2], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  catba:     { name: 'Cát Bà', axis: 20.73, nights: [3, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 2, gory: 1, morze: 2 } },
  hanoi:     { name: 'Hà Nội', axis: 21.03, nights: [1, 2, 4], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 0 } },
  hanoiStop: { name: 'Hà Nội (noc w drodze)', axis: 21.03, node: 'hanoi', nights: [1, 1, 1], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 0, gory: 0, morze: 0 } },
  babe:      { name: 'Ba Bể', axis: 22.41, nights: [1, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  caobang:   { name: 'Cao Bằng', axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } }
};
/* The city each international airport opens and closes trips with. */
var HUBS = { SGN: 'saigon', HAN: 'hanoi', DAD: 'hoian' };
