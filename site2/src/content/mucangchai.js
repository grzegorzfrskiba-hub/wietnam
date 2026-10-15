/* Mù Cang Chải: texts of the place (stage 3, batch B). Facts and sources: research/mucangchai-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.mucangchai = {
  name: 'Mù Cang Chải i przełęcz Khau Phạ', short: 'Mù Cang Chải',
  sub: 'Tarasy ryżowe Hmông, wzgórze Mâm Xôi i paralotnie nad przełęczą Khau Phạ',
  region: 'north', maps: 'Cho Mu Cang Chai, Lao Cai, Vietnam', pt: [21.85, 104.09], color: 20,
  photos: ['mucangchai_0', 'mucangchai_1', 'mucangchai_2', 'mucangchai_3', 'mucangchai_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Tarasy o zachodzie słońca', d: 'Zamelduj się u gospodarzy w La Pán Tẩn albo w miasteczku. Ok. 16:00 wzgórze Móng Ngựa, 2 km od centrum: tarasy ułożone w podkowę, najpiękniejsze przed zachodem słońca, a po 17:00 tłoczno. Na zboczach jest stromo, a na barierkach budek do zdjęć nie stawaj. Na kolację ryba z potoku albo pstrąg z hodowli pod Khau Phạ.',
      rain: 'po deszczu ścieżki na zboczach Móng Ngựa są śliskie: zostań na górnym punkcie widokowym albo przełóż tarasy na jutro.' },
    { p: 2, o: 2, pace: 'hike', cost: ['mucangchai.trek'], t: 'Wioski i tarasy La Pán Tẩn', d: 'Całodniowa wędrówka z lokalnym przewodnikiem: z Chế Cu Nha przez tarasy, las i wioski Hmông do La Pán Tẩn, ok. 10 km, z obiadem po drodze. Na koniec wzgórze Mâm Xôi, tarasy ułożone jak taca kleistego ryżu, skąd ok. 16:00 zabierze cię auto. Po deszczu groble między tarasami są śliskie, więc weź buty z dobrą podeszwą.',
      rain: 'w ulewie autem po punktach widokowych Mâm Xôi i Kim Nọi, a pieszo tylko krótkie odcinki po betonowych drogach.',
      easy: { pace: 'nature', cost: ['mucangchai.car'], t: 'Punkty widokowe autem', d: 'Autem z kierowcą po punktach widokowych: rano Mâm Xôi w La Pán Tẩn (ostatni odcinek mototaksówką), potem tarasy i skała Kim Nọi, ok. 300 m pieszo od drogi, i bambusowy las Mồ Dề, 3,5 km od miasteczka.' } },
    { p: 3, o: 3, pace: 'nature', cost: ['mucangchai.car', 'mucangchai.paragliding'], t: 'Nad doliną Lìm Mông', d: 'Rano na przełęcz Khau Phạ, ok. 20 km od miasteczka, z widokiem na tarasy doliny Lìm Mông. Kto chce, leci stąd tandemem paralotnią z pilotem: 10–15 minut nad tarasami. Loty zależą od wiatru, więc miej w zapasie drugi termin. Po południu dolina Lìm Mông i Tú Lệ: cốm, w sezonie prosto z pola, i kąpiel w gorących źródłach.',
      rain: 'w deszczu paralotnie nie latają, a przełęcz tonie w chmurach: zostań w Tú Lệ przy gorących źródłach albo zamień ten dzień z innym.' }
  ],
  gem: 'Wzgórze Mâm Xôi w La Pán Tẩn: tarasy ułożone jak taca kleistego ryżu, część zabytku narodowego szczególnej klasy.',
  skip: 'Mù Cang Chải w jeden dzień z Hà Nội albo z Sa Pa: 8–12 godzin w aucie na tarasy oglądane przez szybę.',
  instead: 'noc u gospodarzy w La Pán Tẩn: rano Mâm Xôi bez tłumu, wieczorem Móng Ngựa.',
  events: [
    { from: [4, 25], to: [6, 15], t: 'Pora wody: tarasy zalewa się pod sadzenie ryżu, najwcześniej w Tú Lệ pod koniec kwietnia, w wioskach Mù Cang Chải w maju i czerwcu, a w suchy rok dopiero na początku lipca.' },
    { from: [6, 1], to: [10, 10], warn: true, pack: ['leeches'], t: 'Pora ulew i sztormów: na szosie 32 i na przełęczy Khau Phạ zdarzają się osuwiska, jak 1–3 października 2025, gdy droga stała trzy dni. Dzień wcześniej sprawdź komunikaty i miej dzień zapasu; na groblach są błoto i pijawki.' },
    { from: [8, 20], to: [10, 20], t: 'Złote tarasy: ryż dojrzewa najpierw w Tú Lệ i dolinie Lìm Mông (koniec sierpnia), potem w La Pán Tẩn i Chế Cu Nha (do połowy października). Na przełomie sierpnia i września trwa festiwal z lotami paralotni nad Khau Phạ i flagą na tarasach 2 września. To jedyny tłok w roku, więc nocleg i lot zarezerwuj kilka tygodni wcześniej.' },
    { from: [12, 1], to: [2, 29], warn: true, t: 'Zimna pora: noce w miasteczku ok. 9 °C, a w falach chłodu na przełęczy i w La Pán Tẩn szron. Tarasy stoją po żniwach bez ryżu, za to w XII–I kwitnie tớ dày, a doliny często wypełnia morze chmur.' }
  ]
};
