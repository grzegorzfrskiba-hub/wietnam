/* Cát Bà & Zatoka Lan Hạ: texts of the place, moved from the December planner (plan 1B). Fields: see site2/src/content.js. */
CONTENT.catba = {
  name: 'Cát Bà & Zatoka Lan Hạ', short: 'Cát Bà',
  sub: 'Wyspa porośnięta dżunglą po spokojnej stronie Hạ Long',
  what: 'Największa wapienna wyspa Wietnamu, na skraju Zatoki Hạ Long na północnym wschodzie kraju, obok skalistych wysepek Zatoki Lan Hạ.',
  region: 'north', maps: 'Cat Ba Island, Vietnam', pt: [20.73, 107.05], color: 10,
  photos: ['catba_0', 'catba_3', 'catba_1', 'catba_2', 'catba_6'],
  days: [
    { p: 1, o: 1, pace: 'travel', t: 'Na wyspę', d: 'Nocleg w miasteczku Cát Bà. Wieczorem spacer nabrzeżem, przy którym cumują łodzie rybackie, i kolacja w jednej z knajpek.' },
    { p: 4, o: 4, pace: 'hike', cost: ['catba.viethai'], t: 'Việt Hải i park narodowy', d: 'Wędrówka na szczyt Ngự Lâm w Parku Narodowym Cát Bà, potem rowerem dalej do Việt Hải, wioski bez samochodów otoczonej skalnymi ścianami.',
      easy: { pace: 'nature', cost: ['catba.viethai_boat'], t: 'Việt Hải bez wspinaczki', d: 'Łodzią z miasteczka Cát Bà do przystani Việt Hải, potem ok. 5 km płaską drogą do wioski – meleksem albo rowerem – i obiad wśród skał.' } },
    { p: 3, o: 3, pace: 'rest', t: 'Po rejsie, spokojne popołudnie', d: 'Statek wraca na Cát Bà ok. 12:00. Długi obiad z owocami morza przy porcie, potem małe plaże Cát Cò i masaż.' },
    { p: 2, o: 2, pace: 'boat', cost: ['catba.cruise'], t: 'Noc na Zatoce Lan Hạ', d: 'Dwudniowy rejs z jednym noclegiem: statek wypływa z Cát Bà i płynie przez Zatokę Lan Hạ aż po spokojny południowy skraj Zatoki Hạ Long. Między skały popłyniesz bambusową łodzią, którą wiosłują miejscowi, a zachód słońca obejrzysz z pokładu. Część rejsów zawija też do pływającej wioski.',
      easy: { pace: 'boat', t: 'Noc na Zatoce Lan Hạ', d: 'Dwudniowy rejs z jednym noclegiem po Zatoce Lan Hạ i spokojnym południowym skraju Zatoki Hạ Long. Wybierz większy, stabilniejszy statek, na którym każda kabina ma łazienkę. Między skały popłyniesz bambusową łodzią, którą wiosłują miejscowi, a zachód słońca obejrzysz z pokładu.' } }
  ],
  gem: 'Việt Hải, wioska bez samochodów na terenie parku narodowego. Zawijają tam niektóre rejsy z Cát Bà, więc przy trzech nocach wybierz jeden z nich.',
  skip: 'Rejsy po Hạ Long z Tuần Châu i zatłoczone postoje przy jaskini Sửng Sốt i na wyspie Ti Tốp.',
  instead: 'rejs, który zaczyna się na Cát Bà.'
};
