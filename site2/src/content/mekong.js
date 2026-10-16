/* Delta Mekongu: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.mekong = {
  name: 'Delta Mekongu', short: 'Mekong',
  sub: 'Kanały, sady i pływający targ z pokładu małej łodzi',
  what: 'Płaska delta na samym południu kraju, gdzie Mekong uchodzi do morza i gdzie rośnie ponad połowa wietnamskiego ryżu.',
  region: 'south', maps: 'Phong Dien, Can Tho, Vietnam', pt: [10.03, 105.78], color: 2,
  photos: ['mekong_0', 'mekong_2', 'mekong_3', 'mekong_1'],
  days: [
    { p: 1, o: 1, pace: 'travel', cost: ['mekong.sampan'], t: 'Kanały Phong Điền', d: 'Zamelduj się u gospodarzy nad kanałem w Phong Điền, tuż za Cần Thơ. Późnym popołudniem małym sampanem przez kanały wśród sadów owocowych.', solo: { pace: 'boat', cost: ['mekong.sampan', 'mekong.market'], t: 'Delta o zmierzchu i o świcie', d: 'Najpóźniej w połowie popołudnia dotrzyj do gospodarzy nad kanałem w Phong Điền, tuż za Cần Thơ, i popłyń sampanem przez kanały wśród sadów. Następnego ranka o 5:30 małą łodzią na pływający targ Cái Răng, a przed 9:00 wróć na nocleg, w porę na dalszą drogę.', early: true } },
    { p: 2, o: 2, pace: 'culture', cost: ['mekong.market'], t: 'Pływający targ o świcie', d: 'Wypłyń małą łodzią o 5:30, żeby dotrzeć do Cái Răng przed łodziami wycieczkowymi, potem boczne kanały i manufaktura makaronu ryżowego. Po południu rowerem po wysepce Cồn Sơn.', early: true, easy: { pace: 'culture', cost: ['mekong.market', 'mekong.conson'], t: 'Pływający targ o świcie', d: 'Wypłyń małą łodzią o 5:30, żeby dotrzeć do Cái Răng przed łodziami wycieczkowymi, potem boczne kanały i manufaktura makaronu ryżowego. Po południu niespiesznie łodzią na wysepkę Cồn Sơn – sady owocowe i domowy obiad.' } }
  ],
  gem: 'Cồn Sơn – wysepka, na której turystykę prowadzą sami mieszkańcy, kawałek łodzią od Cần Thơ.',
  skip: 'Jednodniowe wycieczki z Mỹ Tho i Cái Bè: grupy z autokarów na tych samych postojach z cukierkami kokosowymi.',
  instead: 'noc u gospodarzy w Phong Điền i targ o wschodzie słońca.',
  events: [
    { from: [6, 1], to: [8, 31], t: 'Sezon owoców: od czerwca do sierpnia sady wokół Cần Thơ są pełne owoców.' },
    { from: [9, 1], to: [11, 30], warn: true, t: 'Wysoka woda: od września do listopada przypływy są najwyższe ok. 6:00–8:00 i 17:00–19:00. Godzinę porannego rejsu na targ ustal z gospodarzami według tablicy przypływów.' }
  ]
};
