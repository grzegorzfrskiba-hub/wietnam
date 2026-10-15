/* Yok Đôn: texts of the place (stage 3, batch B). Facts and sources: research/yokdon-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.yokdon = {
  name: 'Park Narodowy Yok Đôn', short: 'Yok Đôn',
  sub: 'Słonie bez jazdy, suchy las i rzeka Sêrêpốk',
  region: 'south', maps: 'Yok Don National Park Headquarters, Buon Don, Dak Lak', pt: [12.87, 107.81], color: 18,
  photos: ['yokdon_0', 'yokdon_1', 'yokdon_2', 'yokdon_3', 'yokdon_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['yokdon.boat'], t: 'Do lasu nad Sêrêpốk', d: 'Zamelduj się w domu gościnnym parku, przy siedzibie, gdzie zaczynają się wszystkie wycieczki. Po południu łódź po rzece Sêrêpốk, 40–60 minut. Jeśli jedziesz przez Buôn Ma Thuột, zatrzymaj się w Muzeum Kawy, zbudowanym na wzór długiego domu ludu Ê Đê.',
      rain: 'w burzy łódź nie wypłynie: zostań dłużej w Buôn Ma Thuột, w Muzeum Kawy i w muzeum Đắk Lắk o ludach Wyżyny Centralnej, a do parku dojedź na wieczór.',
      solo: { pace: 'nature', cost: ['yokdon.boat', 'yokdon.elephants'], t: 'Yok Đôn wieczorem i rano', d: 'Dotrzyj do parku po południu i zamelduj się w domu gościnnym. O zachodzie łódź po Sêrêpốk. Rano o 8:00 ruszasz z przewodnikiem parku pieszo za słoniami, które same szukają jedzenia w lesie; koło 11:00 wracasz i dalej w drogę.' } },
    { p: 2, o: 2, pace: 'hike', cost: ['yokdon.elephants', 'yokdon.trek'], t: 'Pieszo za słoniami', d: 'O 8:00 z przewodnikiem parku pieszo w las, tam, gdzie słonie były ostatnio widziane. Słonie przez lata woziły turystów, a od 2018 roku chodzą wolno po lesie i same szukają jedzenia: patrzysz z odległości, bez jazdy, kąpieli i karmienia. Po obiedzie znów z przewodnikiem przez suchy las, z kąpielą w strumieniu. Do lasu park wpuszcza tylko z przewodnikiem.',
      rain: 'rano słonie jak zwykle, w pelerynie, a po południu, gdy przyjdzie burza, zamiast lasu lekcja gotowania w kuchni rodziny Ê Đê, 700 metrów od parku.',
      easy: { pace: 'nature', cost: ['yokdon.elephants', 'yokdon.cooking'], t: 'Słonie rano, kuchnia Ê Đê po południu', d: 'Rano pół dnia za słoniami, 8:00–11:00, z przewodnikiem parku i transportem z biura do lasu. Po południu lekcja gotowania u rodziny Ê Đê w Buôn Jang Lành, 700 metrów od parku: razem z gospodarzami gotujesz i jesz obiad.' },
      hard: { pace: 'hike', late: true, off: [5, 6, 7, 8, 9, 10], cost: ['yokdon.camp'], pack: ['torch'], t: 'Noc w lesie Yok Đôn', d: 'Noc w lesie z przewodnikiem parku: pieszo przez suchy las do obozu, zwykle przy wodospadzie Thác Phật, 8 km od siedziby, i nocleg w hamaku albo w namiocie parku. Słonie chodzą tu wolno, więc trzymaj się wskazówek przewodnika. W drogę ruszysz koło południa: nie rezerwuj na ten dzień wczesnego lotu. Słonie z programu zobaczysz tylko w dniu przyjazdu, jeśli dotrzesz przed turą 13:30.' } }
  ],
  gem: 'Jedyny w Wietnamie park suchego lasu, w którym słonie po latach wożenia turystów chodzą wolno po lesie, a ty idziesz za nimi pieszo.',
  skip: 'Jazda na słoniu w Lắk albo zdjęcia ze słoniem za ogrodzeniem w Buôn Đôn.',
  instead: 'pół dnia pieszo z przewodnikiem parku Yok Đôn za słoniami, które od 2018 roku nikogo nie wożą.',
  events: [
    { from: [3, 1], to: [4, 30], warn: true, t: 'Szczyt pory suchej: las zrzuca liście i jest najbardziej przejrzysty, ale dni są gorące, a park leży niżej niż Buôn Ma Thuột. Wychodź o świcie, weź wodę, kapelusz i krem z filtrem.' },
    { from: [5, 1], to: [10, 31], warn: true, t: 'Pora deszczowa: po południu przychodzą burze, więc las i słonie lepiej rano. Weź lekką pelerynę i środek na komary.' }
  ]
};
