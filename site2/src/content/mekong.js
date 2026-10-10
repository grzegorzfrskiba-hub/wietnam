/* Delta Mekongu: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.mekong = {
  name: 'Delta Mekongu', short: 'Mekong',
  sub: 'Kanały, sady i pływający targ z pokładu małej łodzi',
  region: 'south', maps: 'Phong Dien, Can Tho, Vietnam', pt: [10.03, 105.78],
  photos: ['mekong_0', 'mekong_2', 'mekong_3', 'mekong_1'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'W dół, do delty', d: 'Zameldujcie się u gospodarzy nad kanałem w Phong Điền, tuż za Cần Thơ. Późnym popołudniem małym sampanem przez kanały wśród sadów owocowych.', solo: { pace: 'boat', t: 'Delta o zmierzchu i o świcie', d: 'Najpóźniej w połowie popołudnia dotrzyjcie do gospodarzy nad kanałem w Phong Điền, tuż za Cần Thơ, i popłyńcie sampanem przez kanały wśród sadów. Następnego ranka o 5:30 małą łodzią na pływający targ Cái Răng, a do 9:00 z powrotem, w porę na dalszą drogę.', early: true } },
    { p: 2, o: 2, pace: 'culture', t: 'Pływający targ o świcie', d: 'Wypłyńcie małą łodzią o 5:30, żeby dotrzeć do Cái Răng przed łodziami wycieczkowymi, potem boczne kanały i manufaktura makaronu ryżowego. Po południu rowerami po wysepce Cồn Sơn.', early: true, easy: { pace: 'culture', t: 'Pływający targ o świcie', d: 'Wypłyńcie małą łodzią o 5:30, żeby dotrzeć do Cái Răng przed łodziami wycieczkowymi, potem boczne kanały i manufaktura makaronu ryżowego. Po południu niespiesznie łodzią na wysepkę Cồn Sơn – sady owocowe i domowy obiad.' } }
  ],
  gem: 'Cồn Sơn – wysepka, na której turystykę prowadzą sami mieszkańcy, kawałek łodzią od Cần Thơ.',
  skip: 'Jednodniowe wycieczki z Mỹ Tho i Cái Bè: grupy z autokarów na tych samych postojach z cukierkami kokosowymi.',
  instead: 'noc u gospodarzy w Phong Điền i targ o wschodzie słońca.'
};
