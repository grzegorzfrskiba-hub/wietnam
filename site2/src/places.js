/* The places (modules) the engine plans with: only what the engine needs; the names, texts and photos are in the texts of
   the places (content.js, content/<id>.js). axis: position on the south–north line that trips sweep along, close to the latitude
   (Pù Luông sits before Ninh Bình so trips run Pù Luông → Ninh Bình → Cát Bà, and Cúc Phương between them; Sa Pa, at
   22.34° N, sits past Hà Giang so the north runs Ba Bể → Cao Bằng → Hà Giang → Sa Pa). nights: [min, ideal, max]; the
   minimum is 1 only where a one-night plan exists or the place is an airport's city (HUBS). level: the lowest
   adventure level the place is offered at (1 spokojnie, 2 aktywnie, 3 ekstremalnie). fit: 0–3 for each
   interest. node: the travel point it shares with another place (hanoiStop is a night in Hà Nội on the way,
   between two other places). */
var PLACES = {
  saigon:    { axis: 10.78, nights: [1, 2, 3], level: 1, fit: { kultura: 2, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  mekong:    { axis: 10.03, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 3, przyroda: 1, gory: 0, morze: 0 } },
  phuquoc:   { axis: 10.33, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 1, gory: 0, morze: 3 } },
  cattien:   { axis: 11.43, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
  dalat:     { axis: 11.94, nights: [2, 3, 4], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 2, gory: 2, morze: 0 } },
  hoian:     { axis: 15.88, nights: [1, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 1 } },
  danang:    { axis: 16.07, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 1, gory: 1, morze: 2 } },
  hue:       { axis: 16.46, nights: [2, 2, 3], level: 1, fit: { kultura: 3, jedzenie: 2, przyroda: 1, gory: 0, morze: 0 } },
  phongnha:  { axis: 17.6, nights: [2, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
  cucphuong: { axis: 20.25, nights: [1, 2, 2], level: 1, fit: { kultura: 0, jedzenie: 0, przyroda: 3, gory: 1, morze: 0 } },
  puluong:   { axis: 20.2, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  ninhbinh:  { axis: 20.3, nights: [1, 2, 2], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  catba:     { axis: 20.73, nights: [3, 3, 4], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 2, gory: 1, morze: 2 } },
  hanoi:     { axis: 21.03, nights: [1, 2, 4], level: 1, fit: { kultura: 3, jedzenie: 3, przyroda: 0, gory: 0, morze: 0 } },
  hanoiStop: { axis: 21.03, node: 'hanoi', nights: [1, 1, 1], level: 1, fit: { kultura: 0, jedzenie: 1, przyroda: 0, gory: 0, morze: 0 } },
  babe:      { axis: 22.41, nights: [1, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 1, morze: 0 } },
  caobang:   { axis: 22.67, nights: [2, 2, 3], level: 1, fit: { kultura: 1, jedzenie: 0, przyroda: 2, gory: 2, morze: 0 } },
  hagiang:   { axis: 22.83, nights: [4, 4, 5], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
  sapa:      { axis: 22.9, nights: [2, 3, 4], level: 1, fit: { kultura: 2, jedzenie: 0, przyroda: 2, gory: 3, morze: 0 } },
  yokdon:    { axis: 12.87, nights: [1, 2, 2], level: 1, fit: { kultura: 1, jedzenie: 1, przyroda: 3, gory: 0, morze: 0 } }
};
/* The city each international airport opens and closes trips with. */
var HUBS = { SGN: 'saigon', HAN: 'hanoi', DAD: 'hoian' };
