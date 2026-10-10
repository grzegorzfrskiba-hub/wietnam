/* Delta Mekongu: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.mekong = {
  name: 'Delta Mekongu', short: 'Mekong',
  sub: 'Kanały, sady i pływający targ z pokładu małej łodzi',
  region: 'south', maps: 'Phong Dien, Can Tho, Vietnam', pt: [10.03, 105.78],
  photos: ['mekong_0', 'mekong_2', 'mekong_3', 'mekong_1'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Kanały Phong Điền', d: 'Zamelduj się u gospodarzy nad kanałem w Phong Điền, tuż za Cần Thơ. Późnym popołudniem małym sampanem przez kanały wśród sadów owocowych.', solo: { pace: 'boat', t: 'Delta o zmierzchu i o świcie', d: 'Najpóźniej w połowie popołudnia dotrzyj do gospodarzy nad kanałem w Phong Điền, tuż za Cần Thơ, i popłyń sampanem przez kanały wśród sadów. Następnego ranka o 5:30 małą łodzią na pływający targ Cái Răng, a przed 9:00 wróć do gospodarzy, w porę na dalszą drogę. W porze wysokiej wody, od września do listopada, godzinę wypłynięcia ustal z gospodarzami, bo zależy od przypływu.', early: true } },
    { p: 2, o: 2, pace: 'culture', t: 'Pływający targ o świcie', d: 'Wypłyń małą łodzią o 5:30, żeby dotrzeć do Cái Răng przed łodziami wycieczkowymi, potem boczne kanały i manufaktura makaronu ryżowego. Po południu rowerem po wysepce Cồn Sơn. W porze wysokiej wody, od września do listopada, godzinę wypłynięcia ustal z gospodarzami, bo zależy od przypływu.', early: true, easy: { pace: 'culture', t: 'Pływający targ o świcie', d: 'Wypłyń małą łodzią o 5:30, żeby dotrzeć do Cái Răng przed łodziami wycieczkowymi, potem boczne kanały i manufaktura makaronu ryżowego. Po południu niespiesznie łodzią na wysepkę Cồn Sơn – sady owocowe i domowy obiad. W porze wysokiej wody, od września do listopada, godzinę wypłynięcia ustal z gospodarzami, bo zależy od przypływu.' } }
  ],
  gem: 'Cồn Sơn – wysepka, na której turystykę prowadzą sami mieszkańcy, kawałek łodzią od Cần Thơ.',
  skip: 'Jednodniowe wycieczki z Mỹ Tho i Cái Bè: grupy z autokarów na tych samych postojach z cukierkami kokosowymi.',
  instead: 'noc u gospodarzy w Phong Điền i targ o wschodzie słońca.'
};
