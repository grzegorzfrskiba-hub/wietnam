/* Phong Nha: texts of the place (stage 3, batch A). Facts and sources: research/phongnha-2026-10.md. Fields: see site2/src/content.js. */
CONTENT.phongnha = {
  name: 'Park Narodowy Phong Nha–Kẻ Bàng', short: 'Phong Nha',
  sub: 'Jaskinie z łodzi i pieszo wśród krasowych dolin',
  what: 'Park narodowy na liście UNESCO, z jaskiniami w wapiennych górach przy granicy z Laosem, ok. 200 km na północny zachód od Huế.',
  region: 'centre', maps: 'Phong Nha, Quang Tri, Vietnam', pt: [17.61, 106.31], color: 14,
  photos: ['phongnha_0', 'phongnha_1', 'phongnha_2', 'phongnha_3', 'phongnha_4'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Nad rzeką Son', d: 'Nocleg w miasteczku Phong Nha nad rzeką Son, ok. godziny od lotniska Đồng Hới. Wieczorem rowerem po dolinie Bồng Lai, wśród pól i farm; wiele noclegów pożycza rowery za darmo.' },
    { p: 2, o: 2, pace: 'hike', cost: ['phongnha.paradise7'], t: '7 km w głąb Paradise Cave', d: 'Całodniowa trasa ośrodka Paradise Cave (Động Thiên Đường): pierwszy kilometr drewnianą kładką, dalej z przewodnikiem i czołówką w ciemności, 7 km w głąb jaskini, z obiadem w środku. Sprzęt wydają o 8:00, koniec ok. 14:30–16:00. Trasa jest od 16 lat i nie dla osób z chorobami serca albo nadciśnieniem. W porze deszczowej woda podnosi się i wyprawa zawraca po ok. 4 km.',
      rain: 'kilometr kładki w Paradise Cave, która leży wysoko i działa prawie zawsze; przy kilkudniowych ulewach park wstrzymuje trasę 7 km i łodzie do jaskini Phong Nha.',
      easy: { pace: 'boat', cost: ['phongnha.cave', 'phongnha.paradise'], t: 'Łodzią do jaskini Phong Nha i kładką przez Paradise Cave', d: 'Rano łódź z przystani w miasteczku: pół godziny rzeką Son, potem ok. 1 200 m podziemnej rzeki, już na wiosłach, i suche komory na pomostach, razem ok. 2,5 godziny. Po południu Paradise Cave: autko elektryczne, potem pieszo pod górę, schody w dół i kilometr drewnianej kładki wśród nacieków; czynne mniej więcej 7:30–16:00.' },
      hard: { pace: 'hike', late: true, off: [9, 10, 11], cost: ['phongnha.hangen'], pack: ['swim'], t: 'Hang Én: w dół do Rào Thương i noc w jaskini',
        rain: 'przy ulewach Oxalis odwołuje wyprawę, a woda w Hang Én opada dopiero po kilku dniach: zostaje kilometr kładki w Paradise Cave, która leży wysoko i działa prawie zawsze.', d: 'Dwudniowa wyprawa z Oxalis, jedynym operatorem z pozwoleniem prowincji na tę trasę, z przewodnikami i asystentami bezpieczeństwa: strome zejście do potoku Rào Thương, brody, wioska Đoòng, dżunglą do jaskini Nước Lạnh i nocleg w obozie w Hang Én, z kąpielą w jeziorku. Oxalis przyjmuje osoby w wieku 16–70 lat w dobrej kondycji. Sơn Đoòng, największa jaskinia świata, jest wyprzedana na kilka lat naprzód.',
        next: { pace: 'hike', t: 'Hang Én: rano w jaskini, wyjście do drogi', d: 'Po śniadaniu tylna część jaskini i obiad w obozie, potem przez rzeki, ok. 30 przepraw w dwa dni, i 450 m podejścia do drogi, gdzie czeka auto. W Phong Nha ok. 18:00, więc tę noc spędzisz jeszcze tutaj, a w dalszą drogę ruszysz następnego dnia.' } } },
    { p: 3, o: 3, pace: 'boat', cost: ['phongnha.cave', 'phongnha.darkcave'], pack: ['swim'], t: 'Jaskinia Phong Nha z łodzi i Hang Tối', d: 'Rano łodzią z przystani w miasteczku do jaskini Phong Nha: pół godziny rzeką Son, potem ok. 1 200 m podziemnej rzeki na wiosłach. Po południu rzeka Chày i Hang Tối: 400 m tyrolki nad rzeką, jaskinia w ciemności, kąpiel błotna, kajak i kąpiel w rzece, razem ok. 4 godzin (tyrolka od 40 kg).',
      rain: 'kładka w Paradise Cave albo ogród botaniczny, które działają prawie zawsze; przy kilkudniowych ulewach łodzie do jaskini Phong Nha i Hang Tối stoją zwykle przez 2–5 dni.',
      easy: { pace: 'nature', cost: ['phongnha.botanic'], pack: [], t: 'Ogród botaniczny i dolina Bồng Lai', d: 'Ogród botaniczny parku, ok. 10 km od miasteczka: leśne ścieżki do 4 km, ponad 30-metrowy wodospad Gió, a w koronach drzew czasem małpy; z przewodnikiem parku trasa ma 5 km. Po południu rowerem albo autem po dolinie Bồng Lai, wśród pól i farm.' } },
    { p: 4, o: 4, pace: 'hike', cost: ['phongnha.tulan'], pack: ['swim'], t: 'Tú Làn w jeden dzień', d: 'Wyprawa z Oxalis do jaskiń Tú Làn: odbiór z hotelu o 7:00–7:30, 70 km na zachód, potem ok. 9 km marszu, 800 m w jaskiniach, 15 m drabiny z uprzężą i 150 m pływania podziemną rzeką w kamizelce, z obiadem w dolinie. Powrót do Phong Nha ok. 17:30–19:00. Wiek 16–70 lat; zarezerwuj 1–2 tygodnie wcześniej.',
      rain: 'kładka w Paradise Cave albo ogród botaniczny; gdy rzeki wzbierają, Oxalis zmienia albo odwołuje Tú Làn, a park zamyka Nước Moọc.',
      easy: { pace: 'nature', cost: ['phongnha.mooc'], t: 'Potok Nước Moọc', d: 'Ok. 20 minut autem od jaskini Phong Nha: kładki wzdłuż turkusowego potoku, płytkie kąpieliska i kajaki; czynne mniej więcej 8:00–15:30, latem do 16:30.' } }
  ],
  gem: 'Podziemna rzeka w jaskini Phong Nha: po wyłączeniu silnika łódź płynie dalej na wiosłach.',
  skip: 'Wycieczka z Huế w jeden dzień: ok. 7 godzin w aucie dla dwóch jaskiń.',
  instead: 'dwie noce w Phong Nha, z łodzią do jaskini Phong Nha rano.',
  events: [
    { from: [3, 1], to: [4, 30], t: 'Nad potokiem Nước Moọc kwitną drzewa vàng anh.' },
    { from: [6, 1], to: [8, 31], warn: true, t: 'Szczyt sezonu: w jaskiniach bywa tłoczno, a burza tropikalna potrafi na kilka dni zamknąć łodzie do jaskini Phong Nha i Hang Tối. Po ulewach w Laosie rzeka Son bywa mętna.' },
    { from: [9, 1], to: [11, 30], warn: true, t: 'Pora powodzi: gdy rzeka Son wzbiera, park wstrzymuje łodzie do jaskini Phong Nha, Hang Tối i Nước Moọc, zwykle na 2–5 dni, a Paradise Cave działa prawie zawsze.' },
    { from: [12, 1], to: [3, 31], warn: true, t: 'Chłodna pora: dni bywają szare i mżyste, a woda w rzekach i jaskiniach jest zimna. Weź ciepłą warstwę na wieczór i kurtkę przeciwdeszczową.' }
  ]
};
