/* Ninh Bình: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.ninhbinh = {
  name: 'Ninh Bình', short: 'Ninh Bình',
  sub: 'Łodzie wiosłowe wśród wapiennych turni',
  region: 'north', maps: 'Tam Coc, Ninh Binh, Vietnam', pt: [20.25, 105.9], color: 9,
  photos: ['ninhbinh_0', 'ninhbinh_3', 'ninhbinh_4', 'ninhbinh_5', 'ninhbinh_6'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Między krasowe wzgórza', d: 'Nocleg w uliczkach za Tam Cốc. Jeśli dotrzesz najpóźniej w połowie popołudnia, wybierz się jeszcze na przejażdżkę łodzią wiosłową po mokradłach Vân Long; ostatnie łodzie odpływają późnym popołudniem.',
      solo: { pace: 'boat', t: 'Krasowe wzgórza wieczorem i rano', d: 'Nocleg w uliczkach za Tam Cốc; dotrzyj najpóźniej w połowie popołudnia, żeby jeszcze popłynąć łodzią wiosłową po mokradłach Vân Long, zanim odpłyną ostatnie łodzie. Następnego ranka bądź o 7:00 na przystani w Tràng An, gdy ją otwierają, popłyń trasą przez jaskinie, a potem jedź dalej.' } },
    { p: 2, o: 2, pace: 'boat', t: 'Tràng An o 7:00', d: 'Bądź na przystani na otwarcie, o 7:00, i wybierz najdłuższą trasę przez jaskinie, zanim przyjadą autokary. Potem rowerem po wiejskich uliczkach albo do Hoa Lư, stolicy z X wieku, i świątyń jej pierwszych królów (odbudowanych w XVII wieku).',
      easy: { pace: 'boat', t: 'Tràng An o 7:00', d: 'Bądź na przystani na otwarcie, o 7:00, i wybierz najdłuższą trasę przez jaskinie, zanim przyjadą autokary; wiosłować nie musisz. Potem samochodem do Hoa Lư, stolicy z X wieku, i jej świątyń.' } }
  ],
  gem: 'Langury Delacoura na skałach Vân Long – jedne z najrzadszych naczelnych na świecie.',
  skip: 'Punkt widokowy Hang Múa o zachodzie słońca: 500 schodów i tłum ramię w ramię.',
  instead: 'Vân Long późnym popołudniem.',
  events: [
    { from: [7, 1], to: [9, 30], warn: true, t: 'Pora deszczowa i tajfunów: gdy woda w jaskiniach Tràng An stoi wysoko, łodzie płyną zmienioną trasą, a przed burzą rejsy bywają wstrzymane na kilka dni. Dzień wcześniej sprawdź komunikat przystani.' }
  ]
};
