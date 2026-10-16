/* Đà Nẵng with the Sơn Trà peninsula: texts of the place (stage 3, batch A). Facts and sources: research/danang-2026-10.md.
   Fields: see site2/src/content.js. */
CONTENT.danang = {
  name: 'Đà Nẵng i półwysep Sơn Trà', short: 'Đà Nẵng',
  sub: 'Duki czerwononogie na Sơn Trà, plaża Mỹ Khê i Marmurowe Góry',
  what: 'Największe miasto środkowego Wietnamu, nad morzem, ok. 30 km na północ od Hội An, z zalesionym półwyspem Sơn Trà.',
  region: 'centre', maps: 'My Khe Beach, Da Nang, Vietnam', pt: [16.06, 108.25], color: 16,
  photos: ['danang_0', 'danang_1', 'danang_2', 'danang_3', 'danang_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Marmurowe Góry i wieczór nad Hàn', d: 'Marmurowe Góry (Ngũ Hành Sơn) na południe od centrum: na Thủy Sơn schodami albo windą, jaskinia Huyền Không i widok z Vọng Giang Đài, czynne 7:00–17:30. Wieczorem kolacja nad rzeką Hàn, a w sobotę i niedzielę o 21:00 Smoczy Most zieje ogniem i wodą.',
      rain: 'w Muzeum Rzeźby Czamskiej (7:00–17:00) zamiast na śliskich schodach Marmurowych Gór.',
      solo: { pace: 'nature', early: true, cost: ['danang.sontra'], t: 'Wieczór nad Hàn i Sơn Trà rano', d: 'Wieczorem kolacja nad rzeką Hàn, a w sobotę i niedzielę o 21:00 pokaz na Smoczym Moście. O świcie kąpiel na Mỹ Khê, gdy dyżurują ratownicy, a od 7:30 autem na Sơn Trà: droga na Bàn Cờ, z której wypatrujesz duków, i pagoda Linh Ứng. Drogi na półwysep zarząd zamyka przy ulewach, więc wieczorem sprawdź jego komunikat. Koło 10:00 dalej w drogę.' } },
    { p: 2, o: 2, pace: 'nature', early: true, cost: ['danang.sontra'], t: 'Świt na Mỹ Khê i duki z Sơn Trà', d: 'Rano kąpiel na Mỹ Khê, póki dyżurują ratownicy, tylko między flagami, a przed południem Muzeum Rzeźby Czamskiej. Po południu autem na Sơn Trà, na Bàn Cờ i do pagody Linh Ứng. W koronach drzew wypatruj duków czerwononogich, ale do lasu nie wchodź i zwierząt nie karm. Drogi są otwarte 7:30–17:30 (III–IX do 18:30), a przy ulewach zarząd je zamyka: dzień wcześniej sprawdź jego komunikat.',
      rain: 'muzeum i miasto, a na Sơn Trà nie jedź: przy ulewach zarząd zamyka drogi na półwysep, czasem na kilka dni.' }
  ],
  gem: 'Cây đa di sản: stary banian na Sơn Trà, do którego od skrzyżowania przy Bãi Bắc dochodzi się już tylko pieszo.',
  skip: '„Trekkingi” i „safari z dukami” w głąb lasu Sơn Trà, sprzedawane na ulicy i w sieci: bez zgody zarządu wejście do lasu jest nielegalne.',
  instead: 'duki wypatrywane z dozwolonych dróg półwyspu w godzinach otwarcia.',
  events: [
    { from: [3, 25], to: [6, 30], t: 'Na Sơn Trà kwitną lim xẹt przy ulicy Yết Kiêu (od końca marca do czerwca) i thàn mát (w kwietniu i maju). Duki schodzą wtedy po kwiaty i młode liście, więc łatwiej je wypatrzyć.' },
    { from: [10, 1], to: [11, 30], warn: true, t: 'Szczyt pory deszczowej i burz: przy ulewach zarząd zamyka drogi na Sơn Trà, czasem na kilka dni, a morze bywa groźne. Sprawdzaj komunikaty i miej plan w mieście.' },
    { from: [12, 1], to: [3, 14], warn: true, t: 'Poza sezonem kąpielowym ratownicy na plażach dyżurują w mniejszym składzie, a monsun północno-wschodni niesie fale i prądy wsteczne. Kąp się tylko przy ratownikach, między flagami.' }
  ]
};
