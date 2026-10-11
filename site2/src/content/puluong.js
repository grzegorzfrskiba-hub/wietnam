/* Pù Luông: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.puluong = {
  name: 'Pù Luông', short: 'Pù Luông',
  sub: 'Bambusowe domy gospodarzy, ryżowe doliny i wędrówki grzbietami',
  region: 'north', maps: 'Pu Luong Nature Reserve, Vietnam', pt: [20.45, 105.18], color: 8,
  photos: ['puluong_1', 'puluong_2', 'puluong_3', 'puluong_0', 'puluong_5'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'W głąb dolin', d: 'Zamelduj się u gospodarzy w bambusowym domu nad tarasami ryżowymi w Bản Đôn albo Kho Mường. Wieczorem spacer po wiosce.' },
    { p: 2, o: 2, pace: 'hike', t: 'Grzbiety, wioski i wodospad', d: 'Całodniowa wędrówka z przewodnikiem: turkusowe baseny wodospadu Hiêu, wioska Kho Mường z jaskinią i grzbiety między dolinami.',
      easy: { pace: 'nature', t: 'Doliny widziane z drogi', d: 'Samochodem z kierowcą drogą wzdłuż dolin, do dolnych basenów wodospadu Hiêu (krótki, łatwy spacer), potem wioska Kho Mường i długi obiad w domu na palach.' },
      hard: { pace: 'hike', off: [5, 6, 7, 8, 9], t: 'Na szczyt Pù Luông', d: 'Całodniowe wejście na szczyt Pù Luông (1700 m): krótki dojazd od gospodarzy pod górę, potem 8–9 godzin marszu przez las, z obiadem na szczycie. Podejście jest strome, miejscami ponad 35 stopni, a w lesie bywają pijawki. Idź tylko z przewodnikiem. Rezerwat sam prowadzi trasę na szczyt, z przewodnikami z okolicznych wiosek, i ogranicza liczbę osób, więc zapisz się z wyprzedzeniem u zarządu rezerwatu i zapytaj o wersję jednodniową. Jeśli rezerwujesz u operatora, zapytaj o jego licencję i zgodę rezerwatu. To bardzo wymagający dzień, dla osób w dobrej kondycji. Gdy pada, zrezygnuj ze szczytu, bo mokra ścieżka jest śliska.' } },
    { p: 3, o: 3, pace: 'rest', t: 'Spokojny dzień w dolinie', d: 'Bambusowe koła wodne, bambusowa tratwa na rzece, tkanie w domu na palach i długi obiad u gospodarzy. Po żniwach poranki bywają tu mgliste i ciche.' }
  ],
  gem: 'Turkusowe baseny wodospadu Hiêu.',
  skip: 'Mai Châu: urocze, ale dziś otoczone kwaterami nastawionymi na wycieczki autokarowe.',
  instead: 'Pù Luông, niecałe dwie godziny drogi od Mai Châu.',
  events: [
    { from: [5, 25], to: [6, 15], t: 'Złote tarasy: ryż dojrzewa tu zwykle od końca maja do połowy czerwca. Termin przesuwa się z roku na rok i różni się między wioskami, więc zapytaj gospodarzy.' },
    { from: [9, 25], to: [10, 10], t: 'Złote tarasy: ryż dojrzewa tu zwykle od końca września do początku października. Termin przesuwa się z roku na rok i różni się między wioskami, więc zapytaj gospodarzy.' }
  ]
};
