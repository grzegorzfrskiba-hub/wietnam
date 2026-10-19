/* The wildlife subpage (stage 6): one list of the species for its three tabs, the Field guide by place, what to avoid and
   the places off Route G. Written in Polish, to one reader (ty), without gendered forms (notes/wizja.md).
   A species: name, alt (the name known from guidebooks), vn, lat, iucn, group, route (a card in "On your route"),
   gallery (a tile in the Gallery), why, meet (only with route): { place, kind, where, chance, chanceNote?, when, months,
   season?, plan }; plan: the day plans of the place, as [p, version] ('' the usual one, 'easy', 'hard', 'solo'), whose
   text names the encounter, or null.
   Facts and sources: research/zwierzeta-2026-10.md; the bar-bellied pitta, the red-headed trogon, the great hornbill, the mossy
   frog and the golden birdwing: the gallery research of 16.10.2026. */
var WILD = {
  duk: { name: 'Duk wspaniały', alt: 'duk czerwononogi', vn: 'voọc chà vá chân nâu', lat: 'Pygathrix nemaeus', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Nazywany „królową naczelnych”. Duki dzielą się jedzeniem, podając sobie liście, co wśród małp Starego Świata zdarza się rzadko.',
    meet: [
      { place: 'danang', kind: 'wild', where: 'półwysep Sơn Trà: z dróg, w koronach drzew, w grupach po 5–7; auto z kierowcą, postoje i lornetka', chance: 3, chanceNote: 'duża do średniej',
        when: 'cały rok, 7:30–17:30 (III–IX do 18:30), najlepiej rano i późnym popołudniem; od końca III do VI schodzą po kwiaty; w X–XI drogi bywają zamknięte', months: null, plan: [[2, ''], [1, 'solo']] }
    ] },
  gibbon: { name: 'Gibboniec żółtolicy', alt: 'gibon złotolicy', vn: 'vượn đen má vàng', lat: 'Nomascus gabriellae', iucn: 'EN', group: 'primates', route: true, gallery: true,
    why: 'Pary śpiewają o świcie w duecie. Samce są czarne ze złotymi policzkami, a samice rodzą się jasne, ciemnieją i w dojrzałości znów stają się złociste.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'wycieczka parku o świcie: łódź z przystani ok. 4:45, koniec ok. 7:30; gdy się nie uda, druga próba gratis', chance: 2, chanceNote: 'zobaczyć średnia, usłyszeć duża',
        when: 'cały rok, przed świtem; bez wycieczki ok. 7:00 z asfaltowej drogi przy centrum dla zwiedzających słychać je i czasem widać', months: null, plan: [[2, ''], [1, 'solo']] }
    ] },
  dukc: { name: 'Duk czarnonogi', vn: 'chà vá chân đen', lat: 'Pygathrix nigripes', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Niebieskawa twarz z dużymi żółtymi obwódkami oczu.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'wysoko w koronach: przy drodze ok. 3 km za wypożyczalnią rowerów i przy drodze do Bàu Sấu', chance: 2, chanceNote: 'średnia do dużej',
        when: 'cały rok, głównie rano', months: null, plan: null }
    ] },
  lutungb: { name: 'Lutung białozady', alt: 'langur Delacoura', vn: 'voọc mông trắng', lat: 'Trachypithecus delacouri', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Kremowe futro na zadzie i udach wygląda jak białe szorty, stąd wietnamska nazwa. Na świecie żyje ok. 570 osobników, z tego ok. 250 w Vân Long.',
    meet: [
      { place: 'ninhbinh', kind: 'wild', where: 'Vân Long: łodzią wiosłową po mokradłach pod wapiennymi turniami; na słowo „monkey” przewoźnik płynie tam, gdzie zwykle je widać', chance: 2, chanceNote: 'średnia, to loteria',
        when: 'cały rok, 2 h po świcie albo 2 h przed zachodem', months: null, plan: [[1, ''], [1, 'solo']] },
      { place: 'cucphuong', kind: 'rescue', where: 'ośrodek ratowania naczelnych EPRC przy bramie parku: 19 lutungów (2026)', chance: 3,
        when: 'w dzień, z przewodnikiem parku przez jego biuro turystyki; godzin EPRC nie publikuje', months: null, plan: [[1, ''], [1, 'solo']] }
    ] },
  slon: { name: 'Słoń azjatycki', vn: 'voi châu Á', lat: 'Elephas maximus', iucn: 'EN', group: 'mammals', route: true, gallery: true,
    why: 'W Yok Đôn samice, które od 2018 r. nikogo nie wożą, chodzą wolno po lesie i same szukają jedzenia. Park jako pierwszy w Wietnamie zobowiązał się do turystyki bez jazdy i kontaktu.',
    meet: [
      { place: 'yokdon', kind: 'program', where: 'pieszo za słoniami z przewodnikiem parku, rano albo po południu; bez jazdy, kąpieli i dotykania', chance: 3,
        when: 'cały rok, 8:00–11:00 albo 13:30–16:30; w V–X lepiej rano', months: null, plan: [[2, ''], [2, 'easy'], [1, 'solo']] }
    ] },
  kroko: { name: 'Krokodyl syjamski', vn: 'cá sấu Xiêm', lat: 'Crocodylus siamensis', iucn: 'CR', group: 'reptiles', route: true, gallery: true,
    why: 'Populację w Cát Tiên odtworzono od zera z 60 zwierząt wypuszczonych w 2004 r. Dziś liczy się ją nocą po odblasku oczu: średnio ok. 500.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'Bàu Sấu, Jezioro Krokodyli, 9 km autem i 5 km pieszo od siedziby; za dnia z wieży obserwacyjnej albo z łódki', chance: 2, chanceNote: 'za dnia średnia, nocą nad jeziorem duża',
        when: 'cały rok; nocą przy brzegu świecą setki par oczu, a nocleg nad jeziorem jest poza VIII–X, na poziomie Ekstremalnie', months: null, plan: [[2, ''], [2, 'hard']] }
    ] },
  luskowiec: { name: 'Łuskowiec jawajski', vn: 'tê tê Java', lat: 'Manis javanica', iucn: 'CR', group: 'mammals', route: true, gallery: true,
    why: 'W styczniu 2025 r. park Cúc Phương razem z Save Vietnam’s Wildlife wypuścił do lasu 12 łuskowców odebranych przemytnikom i kłusownikom.',
    meet: [
      { place: 'cucphuong', kind: 'rescue', where: 'ośrodek Save Vietnam’s Wildlife przy bramie parku, też w jednym z wariantów nocnej przejażdżki; zwierzęta, które nie wrócą na wolność', chance: 3,
        when: 'codziennie 9:00–11:00 i 14:00–20:00, najlepiej po 15:00', months: null, plan: [[1, ''], [1, 'solo']] }
    ] },
  swietliki: { name: 'Świetliki', vn: 'đom đóm', lat: 'Lampyridae', group: 'insects', route: true, gallery: true,
    why: 'W Cúc Phương świecą tylko kilka tygodni w roku; w 2026 r. pojawiły się o 2–3 tygodnie wcześniej niż zwykle.',
    meet: [
      { place: 'cucphuong', kind: 'wild', where: 'nocna przejażdżka parku melexem: las Chò chỉ; w ciszy, bez flesza i bez świecenia', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od końca IV do początku VI, 19:00–22:00', months: [4, 5, 6], season: 'od końca IV do początku VI', plan: [[1, ''], [1, 'solo']] }
    ] },
  motyle: { name: 'Motyle', vn: 'bướm', lat: 'Lepidoptera', group: 'insects', route: true, gallery: false,
    why: 'W Cúc Phương żyje prawie 400 gatunków motyli.',
    meet: [
      { place: 'cucphuong', kind: 'wild', where: 'drogi i ścieżki parku, ogród botaniczny i okolice bramy', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od drugiego tygodnia IV do końca V, najwięcej 10:00–14:00 w słoneczne dni po deszczu', months: [4, 5], season: 'od drugiego tygodnia IV do końca V', plan: null },
      { place: 'cattien', kind: 'wild', where: 'tysiące przy leśnych drogach parku', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od V do VII', months: [5, 6, 7], season: 'od V do VII', plan: null }
    ] },
  niedzwiedz: { name: 'Niedźwiedzie: malajski i himalajski', vn: 'gấu chó, gấu ngựa', lat: 'Helarctos malayanus, Ursus thibetanus', iucn: 'VU', group: 'mammals', route: true, gallery: false,
    why: 'Niedźwiedź malajski to najmniejszy niedźwiedź świata, ok. 70 cm w kłębie; bardzo długim językiem wyjada owady i miód.',
    meet: [
      { place: 'cucphuong', kind: 'rescue', where: 'BEAR SANCTUARY Ninh Bình fundacji Four Paws, ok. 8 km od Cúc Phương przy drodze do Bái Đính: 49 niedźwiedzi (V 2026), wstęp wolny', chance: 3,
        when: 'codziennie 9:00–17:00', months: null, plan: null },
      { place: 'cattien', kind: 'rescue', where: 'ośrodek Free the Bears: wycieczka ok. 3 h za datek od 1 300 000 VND od osoby; przygotowanie smakołyków, bez kontaktu ze zwierzętami', chance: 3,
        when: 'codziennie 8:30–11:30 albo 13:00–16:00', months: null, plan: null }
    ] },
  lutungj: { name: 'Lutung jasnogłowy', alt: 'langur z Cát Bà', vn: 'voọc Cát Bà', lat: 'Trachypithecus poliocephalus', iucn: 'CR', group: 'primates', route: true, gallery: true,
    why: 'Na wyspie Cát Bà żyje ich ok. 80. Potrafią bezpiecznie pić słoną wodę, bo słodkiej jest na wyspie mało.',
    meet: [
      { place: 'cucphuong', kind: 'rescue', where: 'ośrodek ratowania naczelnych EPRC przy bramie parku', chance: 3,
        when: 'w dzień, z przewodnikiem parku przez jego biuro turystyki; godzin EPRC nie publikuje', months: null, plan: [[1, '']] },
      { place: 'catba', kind: 'wild', where: 'wapienne wzgórza nad morzem; wycieczek do lutungów nie ma, najwyżej przypadkiem z łodzi albo kajaka', chance: 1,
        when: 'cały rok; obserwatorzy naczelnych polecają koniec IX – początek XI', months: null, plan: null }
    ] },
  kisciec: { name: 'Kiściec syjamski', vn: 'gà lôi hông tía', lat: 'Lophura diardi', iucn: 'LC', group: 'birds', route: true, gallery: true,
    why: 'Ptak narodowy Tajlandii.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'drogi parku: do Thác Trời i droga z rzędem drzew przy kryjówce ptasiej', chance: 2, chanceNote: 'średnia, „50 na 50”',
        when: 'ok. 6:00–7:00 i po 17:00', months: null, plan: null }
    ] },
  jelenie: { name: 'Sambary i jelenie', vn: 'nai, hươu', lat: 'Rusa unicolor i inne', group: 'mammals', route: true, gallery: false,
    why: 'Na nocnym safari w Cát Tiên większość nocy daje jelenie i cywety. W Cúc Phương park wypuszcza do lasu w etapach ok. 60 jeleni i sambarów.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'nocne safari parku: ok. 1 h, 12 km odkrytym autem; też cywety, jeżozwierze i mundżaki', chance: 3,
        when: 'cały rok, od 18:30', months: null, plan: [[1, ''], [1, 'solo']] },
      { place: 'cucphuong', kind: 'wild', where: 'nocna przejażdżka melexem: półdziki las przy bramie; w ciszy i bez świecenia', chance: 3,
        when: 'cały rok, 19:00–22:00', months: null, plan: [[1, ''], [1, 'solo']] }
    ] },
  paw: { name: 'Paw złoty', alt: 'paw zielony', vn: 'công lục', lat: 'Pavo muticus', iucn: 'EN', group: 'birds', route: true, gallery: true,
    why: 'Pióra ogona samca mają do ok. 2 m. Największa populacja Wietnamu żyje w Yok Đôn i Cát Tiên.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'trawiaste tereny przy zbiornikach wodnych; ptaki są płochliwe', chance: 1, chanceNote: 'mała do średniej',
        when: 'rano, najlepiej w porze suchej', months: null, plan: null },
      { place: 'yokdon', kind: 'wild', where: 'trawiaste tereny parku', chance: 1, chanceNote: 'mała do średniej',
        when: 'rano, w porze suchej', months: null, plan: null }
    ] },
  gaur: { name: 'Gaur', vn: 'bò tót', lat: 'Bos gaurus', iucn: 'VU', group: 'mammals', route: true, gallery: true,
    why: 'Największe dzikie bydło: byki ważą do ok. 1 500 kg.',
    meet: [
      { place: 'cattien', kind: 'wild', where: 'trawiaste tereny przy zbiornikach, czasem z nocnego safari', chance: 1,
        when: 'w porze suchej, wieczorem', months: null, plan: null }
    ] },
  czaple: { name: 'Czaple', vn: 'cò', lat: 'Ardeidae', group: 'birds', route: true, gallery: false,
    why: 'W szczycie sezonu o zmierzchu dziesiątki tysięcy ptaków wracają do gniazd w jednym ogrodzie.',
    meet: [
      { place: 'mekong', kind: 'wild', where: 'ogród ptaków Bằng Lăng w Thốt Nốt, ok. 50 km od centrum Cần Thơ; z 8-metrowej wieży', chance: 3, chanceNote: 'duża w sezonie',
        when: 'od VIII do I, w porze lęgów; od ok. 16:00 do zmierzchu', months: [8, 9, 10, 11, 12, 1], season: 'od VIII do I', plan: null }
    ] },
  // only in the Gallery
  kukang: { name: 'Kukang mały', alt: 'lori mały', vn: 'cu li nhỏ', lat: 'Xanthonycticebus pygmaeus', iucn: 'EN', group: 'primates', route: false, gallery: true,
    why: 'Ma jadowite ugryzienie: wydzielina z gruczołów na łokciach miesza się ze śliną.' },
  niedzwm: { name: 'Niedźwiedź malajski', vn: 'gấu chó', lat: 'Helarctos malayanus', iucn: 'VU', group: 'mammals', route: false, gallery: true,
    why: 'Najmniejszy niedźwiedź świata, ok. 70 cm w kłębie. Bardzo długim językiem wyjada owady i miód.' },
  kurtaczek: { name: 'Kurtaczek prążkowany', vn: 'đuôi cụt bụng vằn', lat: 'Hydrornis elliotii', iucn: 'LC', group: 'birds', route: false, gallery: true,
    why: 'Samiec ma ciemnozielony grzbiet, żółto-czarne prążki od spodu i granatową plamę na brzuchu. Żyje tylko w Wietnamie, Laosie, Kambodży i południowo-wschodniej Tajlandii, a pokarmu szuka w leśnej ściółce.' },
  wieloszpon: { name: 'Wieloszpon wietnamski', vn: 'gà tiền mặt đỏ', lat: 'Polyplectron germaini', iucn: 'VU', group: 'birds', route: false, gallery: true,
    why: 'Żyje tylko na południu Indochin.' },
  sedziol: { name: 'Sędzioł czerwonogłowy', vn: 'nuốc bụng đỏ', lat: 'Harpactes erythrocephalus', iucn: 'LC', group: 'birds', route: false, gallery: true,
    why: 'Samiec ma karminową głowę i pierś z wąskim białym paskiem, samica oliwkowobrązową głowę. Lasy Wietnamu wydają się jego ostoją, a w Cúc Phương można go spotkać na szlaku do drzewa Đăng.' },
  dzioborozec: { name: 'Dzioborożec wielki', vn: 'hồng hoàng', lat: 'Buceros bicornis', iucn: 'VU', group: 'birds', route: false, gallery: true,
    why: 'Ma ok. 1,5 m rozpiętości skrzydeł i żółto-czarny hełm na dziobie; łopot jego skrzydeł słychać z daleka. Samica siedzi w zamurowanej dziupli, a samiec karmi ją przez szczelinę.' },
  zaba: { name: 'Żaba mszysta', vn: 'ếch cây sần Bắc Bộ', lat: 'Theloderma corticale', iucn: 'LC', group: 'reptiles', route: false, gallery: true,
    why: 'Zielono-brązowa, guzowata skóra wygląda jak mech na skale. Przestraszona zwija się w kulkę i udaje martwą; w Cúc Phương to jeden z prawie 50 gatunków płazów.' },
  troides: { name: 'Troides aeacus', vn: 'bướm cánh chim vàng', lat: 'Troides aeacus', iucn: 'LC', group: 'insects', route: false, gallery: true,
    why: 'W Indiach i Chinach to największy motyl: rozpiętość skrzydeł zwykle 15–17 cm, rekord 19,4 cm. Samiec ma czarne przednie skrzydła i jaskrawożółte tylne, a handel nim ogranicza konwencja CITES.' },
  // the legends: in the Gallery, with a plain word that a traveller will not see them
  rokselana: { name: 'Rokselana zadartonosa', vn: 'voọc mũi hếch', lat: 'Rhinopithecus avunculus', iucn: 'CR', group: 'legends', route: false, gallery: true,
    why: 'Ma niebieską twarz i zadarty nos. W Khau Ca żyje szacunkowo 104–130 osobników w dwóch grupach (koniec 2025); turysta praktycznie jej nie zobaczy.' },
  saola: { name: 'Saola', vn: 'sao la', lat: 'Pseudoryx nghetinhensis', iucn: 'CR', group: 'legends', route: false, gallery: true, nophoto: true,
    why: 'Opisana dopiero w 1993 r. Naukowcy nigdy nie widzieli jej na wolności, a ostatni pewny ślad to zdjęcie z fotopułapki z 2013 r.' },
  gibbonr: { name: 'Gibboniec reliktowy', alt: 'gibon Cao vit', vn: 'vượn Cao vít', lat: 'Nomascus nasutus', iucn: 'CR', group: 'legends', route: false, gallery: true, nophoto: true,
    why: 'Uznany za wymarły, odnaleziony w 2002 r. w Trùng Khánh. Dziś ok. 74 osobniki w 11 grupach przy granicy z Chinami; wycieczek do nich nie ma.' },
  kisciecann: { name: 'Kiściec annamski', vn: 'gà lôi lam mào trắng', lat: 'Lophura edwardsi', iucn: 'CR', group: 'legends', route: false, gallery: true,
    why: 'BirdLife uznaje go za możliwie wymarłego na wolności. W Bạch Mã park wypuszcza ptaki z hodowli, ale szansa, że zobaczy je turysta, jest mała.' },
  skamielinowiec: { name: 'Skamielinowiec laotański', vn: 'chuột đá Trường Sơn', lat: 'Laonastes aenigmamus', group: 'legends', route: false, gallery: true,
    why: '„Żywa skamieniałość” z rodziny uznanej za wymarłą 11 mln lat temu. W Phong Nha to najczęstsze zwierzę na fotopułapkach, ale turysta go nie zobaczy.' }
};

// the Field guide: the places from south to north, each with a short line where it is and the rows that only the guide has
var WILD_GUIDE = {
  mekong: { where: 'okolice Cần Thơ', rows: [] },
  saigon: { where: 'Cần Giờ, namorzyny na południe od miasta', rows: [
    { name: 'Rudawki', kind: 'wild', how: 'nad Đầm Dơi w Vàm Sát, łodzią wokół namorzyn; setki wiszą głową w dół na jednej małej wysepce drzew', when: 'cały rok, za dnia', chance: 3 },
    { name: 'Makaki na Đảo Khỉ', kind: 'note', how: 'ponad 1 000 wolno żyjących makaków krabożernych; wyrywają aparaty, torby i jedzenie' } ] },
  cattien: { where: 'dżungla, najlepsze miejsce Route G na zwierzęta na wolności', rows: [
    { name: 'Kukang mały', kind: 'wild', how: 'wieczorem w bambusach przy drodze po zachodniej stronie rzeki', when: 'nie przed 20:00', chance: 1 },
    { name: 'Ptaki przy drogach', kind: 'wild', how: 'dzioborożce, kraski, żołny, brodacze i gołębie; wieloszpon wietnamski głównie z kryjówek przewodników ptasich', when: 'ok. 7:00 przy centrum dla zwiedzających', chance: 3 },
    { name: 'Kobry królewskie', kind: 'note', how: 'żyją w wysokiej trawie przy wieżach obserwacyjnych: przez trawę nie chodź' },
    { name: 'Đảo Tiên', kind: 'note', how: 'wyspa z ośrodkiem naczelnych jest zamknięta i nie ma daty otwarcia (stan z V 2026)' } ] },
  yokdon: { where: 'suchy las z programem słoni bez jazdy', rows: [
    { name: 'Ptaki suchego lasu', kind: 'wild', how: 'ponad 300 gatunków, m.in. dzięcioły i sokoliki; z przewodnikiem ptasim parku, bo bez przewodnika do lasu wejść nie wolno', when: '5:00–8:00 i 15:00–18:00', chance: 2 },
    { name: 'Bantengi', kind: 'wild', how: 'stado widziały tylko fotopułapki parku (IV 2026)', chance: 0 } ] },
  danang: { where: 'półwysep Sơn Trà', rows: [
    { name: 'Las Sơn Trà', kind: 'note', how: 'zamknięty dla trekkingu i obserwacji zwierząt, a nocne wyjścia są zakazane: duki ogląda się tylko z dróg' },
    { name: 'Makaki przy pagodzie Linh Ứng', kind: 'note', how: 'to nie duki: nie karm ich i pilnuj torby' } ] },
  phongnha: { where: 'las pełen rzadkich zwierząt, prawie niewidocznych dla turysty', rows: [
    { name: 'Małpy w ogrodzie botanicznym', kind: 'wild', how: 'w koronach drzew; gatunku park nie podaje, a najczęstszy naczelny na jego fotopułapkach to makak niedźwiedzi', when: 'w dzień', chance: 1 },
    { name: 'Lutung pręgogłowy, duk wspaniały, skamielinowiec laotański', kind: 'wild', how: 'żyją w parku, ale widzą je tylko fotopułapki', chance: 0 },
    { name: 'Wybieg Núi Đôi', kind: 'note', how: 'półdziki wybieg ośrodka ratowania parku przyjmował turystów jeszcze w 2021 r.; czy przyjmuje dziś, trzeba zapytać w parku' } ] },
  cucphuong: { where: 'trzy ośrodki ratowania przy bramie i las nocą', rows: [
    { name: 'Ośrodek żółwi', kind: 'rescue', how: 'żółwie lądowe i słodkowodne, obok EPRC; zwiedzanie trwa ok. 20 min', when: 'w dzień', chance: 3 },
    { name: 'Ptaki', kind: 'wild', how: 'ponad 300 gatunków; na szlaku do drzewa Đăng m.in. sędzioł czerwonogłowy, dzięcioły i kiściec srebrzysty', chance: 2 },
    { name: 'Wielkoloty', kind: 'wild', how: 'duże latające wiewiórki: na ścieżce do drzewa Chò i nocą przy drodze koło restauracji w centrum parku', chance: 1 } ] },
  ninhbinh: { where: 'mokradła Vân Long pod wapiennymi turniami', rows: [
    { name: 'Ptaki wodne Vân Long', kind: 'wild', how: 'zimorodki, czaple i bociany; bociany wracają do gniazd późnym popołudniem', when: 'cały rok, zimą też ptaki przelotne', chance: 3 } ] },
  catba: { where: 'wyspa i zatoka Lan Hạ', rows: [
    { name: 'Makaki na Monkey Island', kind: 'note', how: 'to nie lutungi: wyrywają jedzenie, telefony i torby, a relacje mówią o ugryzieniach' } ] },
  babe: { where: 'jezioro Ba Bể i jaskinia Puông', rows: [
    { name: 'Nietoperze w jaskini Puông', kind: 'wild', how: '5–10 tys. nietoperzy z 18 gatunków; z łodzi słychać je i czuć, ale na wysokim stropie trudno je wypatrzyć', when: 'cały rok, w dzień', chance: 2 } ] }
};

// "Czego unikać": five points, each the object of "avoid" (in Polish in the genitive)
var WILD_AVOID = [
  'Dziczyzny („thịt rừng”) w restauracjach, „cao” z kości, żółci niedźwiedzia i „lekarstw” z łuskowca: zwierzęcia z legalnej hodowli nie odróżnisz od kłusowniczego.',
  'Pamiątek z gatunków chronionych: kości słoniowej, rogu nosorożca, skorup żółwi („đồi mồi”) i wina z wężem; wino z kobrą z listy CITES celnicy zabierają też po powrocie.',
  'Karmienia i dotykania małp na Sơn Trà, na Monkey Island koło Cát Bà i na Đảo Khỉ w Cần Giờ: makaki wyrywają jedzenie, telefony i torby, a bywa, że gryzą.',
  'Kawy z cywet trzymanych w klatkach („cà phê chồn”) w Đà Lạt i jazdy na słoniach w Lắk.',
  'Miejsc, które pozwalają przytulać zwierzęta, karmić je z ręki albo robić sobie z nimi zdjęcia: prawdziwe ośrodki ratowania nie pozwalają ich dotykać.'
];

// "Poza Route G": five places, one sentence each, shown after the name and a colon
var WILD_OUTSIDE = [
  { name: 'Khau Ca', text: 'rokselany zadartonose, szacunkowo 104–130 w dwóch grupach (koniec 2025); tylko wyprawa z pozwoleniem i 2–3 h marszu, a szansa i tak prawie żadna.' },
  { name: 'Trùng Khánh', text: 'gibbońce reliktowe przy Bản Giốc w Cao Bằng, ok. 74 w 11 grupach; wycieczek do nich nie ma.' },
  { name: 'Bạch Mã', text: '363 gatunki ptaków, kiściec annamski z hodowli wypuszczany do lasu i ok. 6 grup duków; droga na szczyt jest przerwana od X 2025.' },
  { name: 'Côn Đảo', text: 'żółwie zielone składają jaja w IV–X, najwięcej w VI–X; tylko na wycieczce z pracownikami stacji ochrony żółwi, w małych grupach.' },
  { name: 'Tràm Chim', text: 'żurawie indyjskie z Tajlandii w zagrodach do rozrodu (2026); o dzikich źródła milczą, a czy turysta zobaczy ptaki w zagrodach, nie wiadomo.' }
];
