/* Cao Bằng: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.caobang = {
  name: 'Cao Bằng', short: 'Cao Bằng',
  sub: 'Wodospad Bản Giốc i krasowe pogranicze',
  region: 'north', maps: 'Cao Bang, Vietnam', pt: [22.67, 106.25], color: 13,
  photos: ['caobang_0', 'caobang_6', 'caobang_1', 'caobang_2', 'caobang_3'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Wieczór w Cao Bằng', d: 'Nocleg w mieście Cao Bằng, a na kolację kaczka pieczona z siedmioma przyprawami (vịt quay 7 vị), specjalność regionu. Na kolejne dni załatw samochód z kierowcą albo przewodnika na motocyklu (easy rider). Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.',
      easy: { pace: 'travel', t: 'Wieczór w Cao Bằng', d: 'Nocleg w mieście Cao Bằng, a na kolację kaczka pieczona z siedmioma przyprawami (vịt quay 7 vị), specjalność regionu. Na kolejne dni zarezerwuj wygodny samochód z kierowcą. Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.' },
      self: { pace: 'travel', t: 'Wieczór w Cao Bằng', d: 'Nocleg w mieście Cao Bằng, a na kolację kaczka pieczona z siedmioma przyprawami (vịt quay 7 vị), specjalność regionu. Wypożyczony motocykl odbierz jeszcze wieczorem: sprawdź hamulce, opony i światła, zrób zdjęcia rys i weź kask z atestem. Paszport miej przy sobie, bo pętla prowadzi przez strefę przygraniczną. Przy Bản Giốc, Ngườm Ngao i w Khuổi Ky, w obszarze turystycznym, zezwolenie nie jest potrzebne. Gdzie indziej przy granicy cudzoziemiec potrzebuje zezwolenia policji, więc nie zbaczaj w boczne drogi ku granicy.' } },
    { p: 3, o: 2, pace: 'nature', cost: [['caobang.car', 'caobang.easyrider']], t: 'Oko Anioła i Pác Bó', d: 'Núi Mắt Thần – góra z otworem na wylot w szczycie, wznosząca się nad trawiastą doliną – i czysty, zielony strumień w Pác Bó przy granicy.',
      self: { pace: 'nature', cost: ['caobang.moto'], t: 'Oko Anioła i Pác Bó motocyklem', d: 'Motocyklem do Núi Mắt Thần – góry z otworem na wylot w szczycie, wznoszącej się nad trawiastą doliną – i nad czysty, zielony strumień w Pác Bó przy granicy. Wróć przed zmrokiem: górskie drogi nie mają oświetlenia.' } },
    { p: 2, o: 3, pace: 'nature', cost: [['caobang.car', 'caobang.easyrider']], t: 'Jeziora, przełęcz, wodospad i jaskinia', d: 'Rano łańcuch krasowych jezior Thang Hen i serpentyny przełęczy Mã Phục, w środku dnia wodospad Bản Giốc, a po południu jaskinia Ngườm Ngao. Do wodospadu dojedziesz w środku dnia, bo w porze suchej, od końca listopada do początku maja, elektrownie w górze rzeki potrafią rano zatrzymywać wodę, a najwięcej jej spada ok. 11:00–14:30. Nocleg w Khuổi Ky, wiosce ludu Tày z kamiennymi domami.',
      self: { pace: 'nature', cost: ['caobang.moto'], t: 'Jeziora, przełęcz, wodospad i jaskinia motocyklem', d: 'Rano łańcuch krasowych jezior Thang Hen i serpentyny przełęczy Mã Phục: zjeżdżaj powoli, bo na zakrętach bywa żwir, a zza nich wyjeżdżają ciężarówki. W środku dnia wodospad Bản Giốc, a po południu jaskinia Ngườm Ngao. Do wodospadu dojedziesz w środku dnia, bo w porze suchej, od końca listopada do początku maja, elektrownie w górze rzeki potrafią rano zatrzymywać wodę, a najwięcej jej spada ok. 11:00–14:30. Nocleg w Khuổi Ky, wiosce ludu Tày z kamiennymi domami, a następnego ranka ok. 85 km do miasta Cao Bằng, gdzie oddasz motocykl.' } }
  ],
  gem: 'Kamienne domy Khuổi Ky i jeziora Thang Hen.',
  poi: { name: 'Bản Giốc', pt: [22.85, 106.72] },
  events: [
    { from: [9, 20], to: [10, 10], t: 'Najlepszy czas na Bản Giốc: pod koniec września i na początku października wodospad jest szeroki, a pora deszczowa się kończy.' }
  ]
};
