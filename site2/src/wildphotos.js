/* The photos of the wildlife subpage (stage 6): one per species, in the order of the gallery, from Wikimedia Commons, the
   caption saying where it was taken (decision 6 of stage 6: the wild in Vietnam first, then the wild elsewhere, captivity only
   when nothing else; notes/wizja.md). Licences as in photos.js: CC0, CC BY, CC BY-SA or public domain, never NC or ND.
   The files are photos/wild/<id>.jpg (not in git; see notes/etapy.md); sources: research/zwierzeta-zdjecia-2026-10.md. */
var WILD_PHOTOS = {
  duk: { cap: 'Duk wspaniały na wolności na półwyspie Sơn Trà w Đà Nẵng', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Red-shanked_douc_langur_(Pygathrix_nemaeus)_head_Son_Tra.jpg' },
  dukc: { cap: 'Samica duka czarnonogiego z młodym w Parku Narodowym Cát Tiên', artist: 'Broobas', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Black-shanked_douc.jpg' },
  lutungb: { cap: 'Lutung białozady na wapiennej skale w rezerwacie Vân Long, na wolności', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Delacour%27s_langur_(Trachypithecus_delacouri)_Van_Long_2.jpg' },
  lutungj: { cap: 'Lutung jasnogłowy na wolności na wyspie Cát Bà', artist: 'ALOnIShOnETH', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Cat_Ba_Langur_6_(cropped).jpg' },
  gibbon: { cap: 'Samica gibbońca żółtolicego w Parku Narodowym Cát Tiên', artist: 'Roy Bateman', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Golden-cheeked_gibbon_female_CTNP.jpg' },
  rokselana: { cap: 'Dwie rokselany na wolności w północno-wschodnim Wietnamie', artist: 'Quyet Le', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Tonkin_snub-nosed_monkeys_(Rhinopithecus_avunculus).jpg' },
  kukang: { cap: 'Kukang mały na obszarze chronionym Seima w Kambodży', artist: 'Dr. K.A.I. Nekaris', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Nycticebus_pygmaeus_010.jpg' },
  slon: { cap: 'Słonica ze słoniątkiem na wolności w Parku Narodowym Minneriya na Sri Lance', artist: 'Carlos Delgado', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Elephas_maximus_maximus_-_01.jpg' },
  niedzwm: { cap: 'Niedźwiedź malajski na wolności w Parku Narodowym Kaeng Krachan w Tajlandii', artist: 'Rushen, Thai National Parks', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Helarctos_malayanus,_Sun_bear_-_Kaeng_Krachan_National_Park_(50770053781).jpg' },
  niedzwiedz: { cap: 'Niedźwiedź himalajski poza Wietnamem; miejsca autor nie podaje', artist: 'Shiv\'s fotografia', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Moon_bear.jpg' },
  gaur: { cap: 'Gaur na wolności w Valparai w południowych Indiach', artist: 'Timothy A. Gonsalves', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Head_Gaur_Sheikalmudi_Valparai_Feb26_A7CR_10338.jpg' },
  luskowiec: { cap: 'Łuskowiec jawajski na drzewie na Sumatrze', artist: 'Frendi Apen Irawan', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Trenggiling_Sunda_Sunda_Pangolin_Manis_javanica.jpg' },
  jelenie: { cap: 'Samiec sambara na wolności w Parku Narodowym Kanha w Indiach', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sambar_(Cervus_unicolor_unicolor)_male.jpg' },
  paw: { cap: 'Samiec pawia złotego rozkłada tren na wolności w Parku Narodowym Baluran na Jawie', artist: 'Panji Gusti Akbar', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Javan_Green_Peafowl_in_Baluran_National_Park.jpg' },
  wieloszpon: { cap: 'Wieloszpon wietnamski na wolności w Parku Narodowym Cát Tiên', artist: 'JJ Harrison', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Germain%27s_Peacock-Pheasant_(male)_IMG_7861_copy.jpg' },
  kisciec: { cap: 'Kiściec syjamski na wolności w Parku Narodowym Khao Yai w Tajlandii', artist: 'Rushenb, Thai National Parks', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Siamese-fireback-Lophura-diardi-khao-yai-national-park.jpg' },
  kurtaczek: { cap: 'Kurtaczek prążkowany na wolności w Parku Narodowym Cát Tiên', artist: 'JJ Harrison', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Bar-bellied_Pitta.jpg' },
  dzioborozec: { cap: 'Dzioborożec wielki na wolności w Parku Narodowym Bardiya w Nepalu', artist: 'Dasrath Shrestha Beejukchhen (Bablu)', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Great_hornbill_in_bardiya.jpg' },
  sedziol: { cap: 'Samiec sędzioła czerwonogłowego na wolności w Parku Narodowym Khao Yai w Tajlandii', artist: 'JJ Harrison', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Harpactes_erythrocephalus_-_Khao_Yai.jpg' },
  kroko: { cap: 'Krokodyl syjamski; miejsca zdjęcia autor nie podaje', artist: 'Marco Almbauer', license: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Crocodylus_siamensis_(Siam-Krokodil).jpg' },
  zaba: { cap: 'Żaba mszysta w Parku Narodowym Cúc Phương', artist: 'Caitlin 0000', license: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Theloderma_corticale_C%C3%BAc_Ph%C6%B0%C6%A1ng_06.jpg' },
  swietliki: { cap: 'Świetliki na drzewie nad rzeką Abatan na wyspie Bohol na Filipinach', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Fireflies_(Pteroptyx_mcdermotti)_Bohol.jpg' },
  motyle: { cap: 'Paź Papilio paris na wolności w Arunachal Pradesh w Indiach', artist: 'MaheshBaruahwildlife', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Open_wing_moisture_sucking_position_of_Papilio_paris_Linnaeus,_1758_-_Paris_Peacock_1.jpg' },
  troides: { cap: 'Samiec Troides aeacus na wolności w Parku Narodowym Bạch Mã', artist: 'Charles J. Sharp', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Golden_birdwing_(Troides_aeacus)_male_Bach_Ma.jpg' },
  czaple: { cap: 'Kolonia czapli w ogrodzie ptaków koło Cần Thơ w delcie Mekongu', artist: 'Isabell Schulz', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Stork_sanctuary,_Mekong_Delta_(45199906095).jpg' },
  kisciecann: { cap: 'Samiec kiśćca annamskiego w zoo w Hồ Chí Minh City, w niewoli', artist: 'Hà Nghĩa VN', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Vietnam_Pheasant.jpg' },
  skamielinowiec: { cap: 'Młody skamielinowiec laotański w klatce badaczy; miejsca źródło nie podaje', artist: 'Jean-Pierre Hugot', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Laonastes_aenigmamus_-_young_male_JP_Hugot_PLOS_ONE.jpg' }
};

/* The frame of a photo on a card of On your route (19.10.2026), where the usual one, 3:2 around the middle, would cut the
   animal: [aspect-ratio, object-position]. The whole animal stays in the frame (the map of the subpage, decision 10: other
   proportions rather than a cut animal); every other card photo takes the usual frame. */
var WILD_CROPS = {
  duk: ['3 / 2', '50% 5%'],
  gibbon: ['4 / 3', '50% 30%'],
  swietliki: ['3 / 2', '50% 70%'],
  lutungj: ['3 / 2', '50% 62%'],
  gaur: ['4 / 3', '50% 40%']
};
