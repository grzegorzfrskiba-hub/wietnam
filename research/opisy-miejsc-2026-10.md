# Zdania „czym to jest i gdzie” na liście „Nie ma na twojej trasie” (sprawdzone 16.10.2026)

## Jak czytać

Poprawka 1 pierwszej rundy poprawek (sesja decyzji 16.10.2026, ustalenie 8 w `notes/etapy.md`): każde z 20 miejsc, bez nocy w drodze (`hanoiStop`), dostaje jedno zdanie po polsku i po angielsku, ok. 20 słów: czym jest miejsce i gdzie leży względem znanego punktu, bez godzin dojazdu, bo zależą od trasy. Zdanie stoi w polu `what` w `site2/src/content/<id>.js` i `site2/src/en/content/<id>.js` i pokazuje się tylko w wierszu miejsca na liście „Nie ma na twojej trasie”.

- **Źródła:** najpierw research w repo (etykiety jak w tamtych plikach), a gdzie go brakowało, strony HTML otwarte 16.10.2026 (bez PDF). Strony whc.unesco.org i britannica.com zwracały 403, więc fakt, który podają, ma tu też inne źródło; znak † przy źródle oznacza treść znaną tylko z wyników wyszukiwania, nigdy jedyne źródło faktu.
- **Odległości** w kilometrach to drogi według źródeł; w linii prostej są krótsze (podane w uwagach). **Kierunki** sprawdzone ze współrzędnych `pt` miejsc w `site2/src/content/`.
- **Prowincje:** zdania nie podają nazw prowincji, bo od 1.07.2025 wiele z nich połączono (np. Hà Giang z Tuyên Quang, Yên Bái z Lào Cai, Bắc Kạn z Thái Nguyên, Quảng Bình z Quảng Trị).
- **Kontrole:** każda para przechodzi testy treści (te same liczby i nazwy wietnamskie, styl, typografia, „for every passport”, brytyjska pisownia); długość w teście: najwyżej 24 słowa w każdym języku.
- Zdania napisały na podstawie researchu cztery agenty badawcze (po pięć miejsc), a wersje zatwierdził użytkownik w sesji planu 16.10.2026; tam, gdzie wybrano ostrożniejszą wersję, mówi o tym uwaga.

## Zestawienie

| miejsce | PL | EN | słowa |
|---|---|---|---|
| saigon | Największe miasto i główny ośrodek gospodarczy Wietnamu, dawny Sajgon, nad rzeką o tej samej nazwie na południu kraju. | Vietnam’s largest city and main economic centre, formerly Saigon, on the river of the same name in the south of the country. | 18 / 22 |
| mekong | Płaska delta na samym południu kraju, gdzie Mekong uchodzi do morza i gdzie rośnie ponad połowa wietnamskiego ryżu. | The flat delta in the far south of Vietnam, where the Mekong meets the sea and over half the country’s rice grows. | 18 / 22 |
| phuquoc | Największa wyspa Wietnamu, długa na ok. 50 km, leżąca w Zatoce Tajlandzkiej u południowo-zachodniego wybrzeża kraju. | Vietnam’s largest island, about 50 km long, lying in the Gulf of Thailand off the south-west coast of the country. | 16 / 20 |
| cattien | Park narodowy chroniący las tropikalny nad rzeką Đồng Nai, ok. 150 km na północny wschód od Hồ Chí Minh City. | A national park protecting tropical forest along the Đồng Nai river, about 150 km north-east of Hồ Chí Minh City. | 20 / 20 |
| dalat | Górskie miasto na wysokości 1500 m, dawny letni kurort Francuzów, ok. 300 km na północny wschód od Hồ Chí Minh City. | A mountain town at 1,500 m, once a summer retreat of the French, about 300 km north-east of Hồ Chí Minh City. | 21 / 22 |
| yokdon | Park narodowy na Wyżynie Centralnej przy granicy z Kambodżą, jedyny w Wietnamie, który chroni suchy las zrzucający liście. | A national park in the Central Highlands on the border with Cambodia, the only one in Vietnam that protects dry deciduous forest. | 18 / 22 |
| hoian | Dawny port handlowy w środkowym Wietnamie, ok. 30 km na południe od Đà Nẵng, ze starym miastem na liście UNESCO. | A former trading port in central Vietnam, about 30 km south of Đà Nẵng, with a UNESCO-listed Old Town. | 20 / 19 |
| danang | Największe miasto środkowego Wietnamu, nad morzem, ok. 30 km na północ od Hội An, z zalesionym półwyspem Sơn Trà. | The largest city in central Vietnam, on the coast, about 30 km north of Hội An, with the forested Sơn Trà peninsula. | 19 / 22 |
| hue | Dawna stolica cesarska w środkowym Wietnamie, siedziba dynastii Nguyễn do 1945 roku, ok. 100 km na północny zachód od Đà Nẵng. | The former imperial capital in central Vietnam, the seat of the Nguyễn dynasty until 1945, about 100 km north-west of Đà Nẵng. | 21 / 22 |
| phongnha | Park narodowy na liście UNESCO, z jaskiniami w wapiennych górach przy granicy z Laosem, ok. 200 km na północny zachód od Huế. | A UNESCO-listed national park of caves and limestone mountains on the border with Laos, about 200 km north-west of Huế. | 22 / 20 |
| cucphuong | Najstarszy park narodowy Wietnamu, od 1962 roku chroniący tropikalny las na wapiennych grzbietach, ok. 120 km na południe od Hà Nội. | Vietnam’s oldest national park, protecting tropical forest on limestone ridges since 1962, about 120 km south of Hà Nội. | 21 / 19 |
| puluong | Rezerwat przyrody w górach, ok. 160 km na południowy zachód od Hà Nội, z wioskami ludów Thái i Mường wśród tarasów ryżowych. | A nature reserve in the mountains, about 160 km south-west of Hà Nội, with Thái and Mường villages among rice terraces. | 22 / 21 |
| ninhbinh | Wapienne turnie wśród pól ryżowych ok. 100 km na południe od Hà Nội, wokół Tràng An, od 2014 roku na liście UNESCO. | Limestone peaks among rice fields about 100 km south of Hà Nội, around Tràng An, a UNESCO World Heritage Site since 2014. | 22 / 22 |
| catba | Największa wapienna wyspa Wietnamu, na skraju Zatoki Hạ Long na północnym wschodzie kraju, obok skalistych wysepek Zatoki Lan Hạ. | Vietnam’s largest limestone island, on the edge of Hạ Long Bay in the country’s north-east, beside Lan Hạ Bay’s rocky islets. | 19 / 21 |
| hanoi | Stolica Wietnamu nad Rzeką Czerwoną, na północy kraju, przeniesiona tu z Hoa Lư w 1010 roku. | Vietnam’s capital, on the Red River in the north of the country, moved here from Hoa Lư in 1010. | 16 / 19 |
| babe | Największe naturalne jezioro słodkowodne Wietnamu, w parku narodowym wśród wapiennych gór i lasów, ok. 240 km na północ od Hà Nội. | Vietnam’s largest natural freshwater lake, in a national park among limestone mountains and forests, about 240 km north of Hà Nội. | 21 / 21 |
| caobang | Kraina wapiennych gór, rzek i jaskiń na północnym wschodzie, przy granicy z Chinami, ze światowym geoparkiem UNESCO od 2018 roku. | A land of limestone mountains, rivers and caves in the north-east, on the border with China, with a UNESCO Global Geopark since 2018. | 20 / 23 |
| hagiang | Wapienny płaskowyż pełen skalnych szczytów i kanionów, na samej północy kraju, przy granicy z Chinami: pierwszy w Wietnamie światowy geopark UNESCO. | A limestone plateau of rocky peaks and canyons in the far north, on the border with China: Vietnam’s first UNESCO Global Geopark. | 21 / 22 |
| sapa | Górskie miasteczko na ok. 1500 m, dawne francuskie letnisko na północnym zachodzie, ok. 320 km od Hà Nội. | A mountain town at about 1,500 m, a former French hill station in the north-west, about 320 km from Hà Nội. | 18 / 21 |
| mucangchai | Górski region na północnym zachodzie, ok. 300 km od Hà Nội, którego tarasy ryżowe są zabytkiem narodowym szczególnej klasy. | A mountain region in the north-west, about 300 km from Hà Nội, whose rice terraces are a special national monument. | 19 / 20 |

## Fakty i źródła

### saigon

| fakt | źródło | data |
|---|---|---|
| największe miasto Wietnamu (ponad 14 mln mieszkańców po połączeniu z Bình Dương i Bà Rịa–Vũng Tàu) | Dân Trí International, „Ho Chi Minh City becomes most populous locality after merger”, https://dtinews.dantri.com.vn/vietnam-today/ho-chi-minh-city-becomes-most-populous-locality-after-merger-20250613163734445.htm; Wikipedia „Ho Chi Minh City” (ten sam artykuł co IBST-HCM w `research/sezony-2026-10.md`) | 13.06.2025; odczyt 16.10.2026 |
| główny ośrodek gospodarczy | vietnam.travel (Vietnam National Authority of Tourism), „Ho Chi Minh City”, https://vietnam.travel/places-to-go/southern-vietnam/ho-chi-minh-city („the economic heart of Vietnam”) | odczyt 16.10.2026 |
| dawny Sajgon, nad rzeką Sajgon | vietnam.travel, jw. („formerly known as Saigon”); SGGP, „Saigon River has potential for tourism development”, https://dttc.sggp.org.vn/saigon-river-has-potential-for-tourism-development-post94433.html; SG-WB w `research/plany-dni-2026-10.md` | 17.05.2022; odczyt 16.10.2026 |
| na południu kraju | vietnam.travel, jw. („the main hub of the southern region”) | odczyt 16.10.2026 |

Uwaga: „dawny Sajgon”, a nie „do 1976 roku Sajgon”, bo nazwa dalej żyje potocznie, a od 2025 r. nosi ją okręg w centrum.

### mekong

| fakt | źródło | data |
|---|---|---|
| delta płaska i nisko położona | Utrecht University, „Elevation of sinking Mekong Delta wrongly estimated for decades”, https://www.uu.nl/en/news/elevation-of-sinking-mekong-delta-wrongly-estimated-for-decades (średnio ok. 80 cm nad poziomem morza); TD, sekcja „mekong” w `research/trudne-dni-2026-10.md` | 28.08.2019; odczyt 16.10.2026 |
| tu Mekong uchodzi do morza, na samym południu kraju | Wikipedia „Mekong Delta”, https://en.wikipedia.org/wiki/Mekong_Delta; Wikipedia „Cà Mau province” (najdalej na południe wysunięta prowincja, w delcie) | odczyt 16.10.2026 |
| ponad połowa ryżu w kraju | Nhân Dân, „Những con số biết nói”, https://nhandan.vn/nhung-con-so-biet-noi-post968522.html (ponad 50% zbiorów ryżu i ponad 90% eksportu) | 11.06.2026; odczyt 16.10.2026 |

### phuquoc

| fakt | źródło | data |
|---|---|---|
| największa wyspa Wietnamu | Wikipedia „Phú Quốc” (IBST-PQ w `research/sezony-2026-10.md`); VnExpress, „Hoàng hôn trên đảo ngọc”, https://vnexpress.net/hoang-hon-tren-dao-ngoc-2540924.html; Znews, „Nơi có hòn đảo lớn nhất Việt Nam”, https://lifestyle.zingnews.vn/noi-co-hon-dao-lon-nhat-viet-nam-post1197883.html | 25.03.2013, 29.03.2021; odczyt 16.10.2026 |
| długa na ok. 50 km | Wikipedia, jw. (50 km z północy na południe); Vietnam Airlines, „Phú Quốc rộng bao nhiêu?”, https://www.vietnamairlines.com/go/vi/plan-book/travel/travel-guide/how-big-is-phu-quoc | odczyt 16.10.2026 |
| w Zatoce Tajlandzkiej u południowo-zachodniego wybrzeża | Wikipedia, jw. (40 km na zachód od Hà Tiên); VnExpress, jw.; `research/sezony-2026-10.md` | odczyt 16.10.2026 |

Uwaga: celowo bez „u wybrzeży Kambodży”: prawda geograficzna, ale Kambodża historycznie rościła sobie prawo do wyspy.

### cattien

| fakt | źródło | data |
|---|---|---|
| park narodowy chroniący las tropikalny | Wikipedia „Cát Tiên National Park” (Wiki-CatTien w `research/sezony-2026-10.md`); CT-VNE w `research/trudne-dni-2026-10.md`; UNESCO MAB, „Dong Nai”, https://www.unesco.org/en/mab/dong-nai | odczyt 16.10.2026 |
| nad rzeką Đồng Nai | CT-2026-10-14d w `research/plany-dni-2026-10.md` (Thanh Niên: ponad 80 km granicy wzdłuż Đồng Nai); Wikivoyage „Cat Tien National Park” | 21.07.2026; odczyt 16.10.2026 |
| ok. 150 km na północny wschód od Hồ Chí Minh City | CT-WWW w `research/lotniska-2026-10.md` („Cách TP Hồ Chí Minh 150km”); wiersz SGN – cattien w `research/polaczenia-2026-10.md`; Wikivoyage („150 km north-east”); azymut z `pt` ok. 48° | odczyt 16.10.2026 |

Uwaga: 150 km to droga, w linii prostej ok. 108 km; VnExpress podaje 170 km „na północ”, park i Wikivoyage 150 km.

### dalat

| fakt | źródło | data |
|---|---|---|
| górskie miasto na wysokości 1500 m | vietnam.travel, „Da Lat” (VT-DaLat w `research/sezony-2026-10.md`): „Spring-like weather all year at 1,500 m”; VnExpress, „Cẩm nang du lịch Đà Lạt”, https://vnexpress.net/cam-nang-du-lich-da-lat-4455699.html; stacja Đà Lạt 1513 m (IBST-DL) | aktualizacja 21.04.2026; odczyt 16.10.2026 |
| dawny letni kurort Francuzów | vietnam.travel, jw. („once a summer getaway”); Tuổi Trẻ News, „The most beautiful season to visit Da Lat in Vietnam”, https://news.tuoitre.vn/the-most-beautiful-season-to-visit-da-lat-in-vietnam-10347374.htm („a summer hideout for French officials”); VnExpress, jw. (od 1893, wille francuskie od połowy lat 1910.) | 25.10.2018; odczyt 16.10.2026 |
| ok. 300 km na północny wschód od Hồ Chí Minh City | VnExpress, jw. („Cách TP HCM khoảng 300 km”); Wikivoyage „Da Lat”; azymut z `pt` ok. 56° | odczyt 16.10.2026 |

Uwaga: wybrana łagodniejsza wersja „dawny letni kurort Francuzów” zamiast „założony przez Francuzów”, bo płaskowyż był zamieszkany wcześniej; 300 km to droga, w linii prostej ok. 229 km.

### yokdon

| fakt | źródło | data |
|---|---|---|
| park narodowy na Wyżynie Centralnej | `research/yokdon-2026-10.md` (WIKI-EN, YD-WWW); strona parku, https://tour.yokdonnationalpark.vn/EN/yokdon-national-park.html | odczyt 16.10.2026 |
| przy granicy z Kambodżą | strona parku, jw. („The West is along the Vietnam - Cambodia border”); WIKI-EN | odczyt 16.10.2026 |
| jedyny w Wietnamie, który chroni suchy las zrzucający liście | YD-WWW („Rừng khộp duy nhất Việt Nam”, źródło pola `gem`); strona parku, jw. („the only dipterocarp forest ecosystem conservation area in Vietnam”; „the leaves are deciduous in the dry season”) | odczyt 16.10.2026 |

Uwaga: „jedyny” to deklaracja parku, ta sama co w `gem`; bez „największy”, bo park jest drugim co do wielkości parkiem narodowym kraju.

### hoian

| fakt | źródło | data |
|---|---|---|
| dawny port handlowy | vietnam.travel, „5 must-see heritage sites in Vietnam”, https://vietnam.travel/things-to-do/5-must-see-heritage-sites-vietnam („once a bustling trading port”) | odczyt 16.10.2026 |
| w środkowym Wietnamie, ok. 30 km od Đà Nẵng | VT-HoiAn w `research/sezony-2026-10.md`; NT-HA i VTcom-HA w `research/danang-2026-10.md`; Danang Fantastic City, „Hoi An – Serene Ancient Town”, https://danangfantasticity.com/en/hoi-an-serene-ancient-town („30km away from Da Nang city”) | 13.03.2020; odczyt 16.10.2026 |
| na południe od Đà Nẵng | azymut z `pt` ok. 154° (płd.-płd.-wsch.) | 16.10.2026 |
| stare miasto na liście UNESCO | vietnam.travel, „Historic Hoi An: A Melting Pot of Cultures”, https://vietnam.travel/things-to-do/historic-hoi-an-melting-pot-of-cultures (wpis z 1999); Danang Fantastic City, jw. | odczyt 16.10.2026 |

### danang

| fakt | źródło | data |
|---|---|---|
| największe miasto środkowego Wietnamu, nad morzem | Danang Fantastic City, „Tổng quan Đà Nẵng”, https://danangfantasticity.com/tong-quan-da-nang („thành phố lớn nhất miền Trung”; „phía Đông giáp Biển Đông”) | odczyt 16.10.2026 |
| ok. 30 km na północ od Hội An | jak przy `hoian` (30 km; azymut odwrotny, płn.-płn.-zach.) | 16.10.2026 |
| zalesiony półwysep Sơn Trà | TT-2026-09-10 i VNA-2018-08-13 w `research/danang-2026-10.md`; vietnam.travel, „Da Nang”, https://vietnam.travel/places-to-go/south-central-coast-central-highlands/da-nang („A winding coastal road leads through forest”) | odczyt 16.10.2026 |

### hue

| fakt | źródło | data |
|---|---|---|
| dawna stolica cesarska, siedziba dynastii Nguyễn do 1945 roku | HUE-WIKI w `research/plany-dni-2026-10.md`; vietnam.travel, „Inside the life of Vietnam’s last emperor”, https://vietnam.travel/things-to-do/inside-life-vietnams-last-emperor (rządy z Huế 1802–1945); vietnam.travel, „5 must-see heritage sites in Vietnam” („the Nguyen Dynasty ended in 1945”) | odczyt 16.10.2026 |
| w środkowym Wietnamie, ok. 100 km na północny zachód od Đà Nẵng | Danang Fantastic City, „Tổng quan Đà Nẵng” („cách cố đô Huế 108 km về hướng Tây Bắc”); `research/danang-2026-10.md` (droga 100–110 km, LV-HUE, HTS-DN-HUE); DAD – hue w `research/polaczenia-2026-10.md` | odczyt 16.10.2026 |

Uwaga: w linii prostej ok. 83 km; bez wpisu UNESCO, bo zdania o Hội An i Phong Nha już go mają, a datę wpisu znamy tylko z wyników wyszukiwania (†).

### phongnha

| fakt | źródło | data |
|---|---|---|
| park narodowy na liście UNESCO | strona parku, „Lịch sử hình thành”, https://phongnhakebang.vn/lich-su-hinh-thanh (2003 i 2015, w 2025 wpis transgraniczny z Hin Nam Nô); Nông nghiệp và Môi trường, https://nongnghiepmoitruong.vn/viet-nam-co-di-san-the-gioi-lien-bien-gioi-dau-tien-d762597.html | 14.07.2025; odczyt 16.10.2026 |
| jaskinie w wapiennych górach | PNKB-PN i WIKI-PNKB w `research/phongnha-2026-10.md`; strona parku, „Địa chất, địa mạo”, https://phongnhakebang.vn/dia-chat-dia-mao | odczyt 16.10.2026 |
| przy granicy z Laosem | Nông nghiệp và Môi trường, jw. (wspólna granica z parkiem Hin Nam Nô w Laosie); Wikipedia „Phong Nha–Kẻ Bàng National Park” | odczyt 16.10.2026 |
| ok. 200 km na północny zachód od Huế | R2R w `research/phongnha-2026-10.md` (204,2 km); azymut z `pt` ok. 313° | odczyt 16.10.2026 |

Uwaga: bez Sơn Đoòng jako „największej jaskini świata”, bo źródła się różnią (vietnam.travel: „second-largest”, Wikipedia: „the largest”); w linii prostej ok. 187 km.

### cucphuong

| fakt | źródło | data |
|---|---|---|
| najstarszy park narodowy Wietnamu; las chroniony od 1962 roku | NBCA, „Cuc Phuong National Park, Ninh Binh”, https://en.nbca.gov.vn/vuon-quoc-gia-cuc-phuong/ (decyzja 72-TTg z 7.07.1962); strona parku (CP-WWW), https://dulichcucphuong.com.vn/ („Vườn quốc gia đầu tiên của Việt Nam”); sourcebook obszarów chronionych, https://thiennhienviet.org.vn/sourcebook/source_book/Red%20River%20Delta/SB%20Cuc%20Phuong.htm (nazwa parku narodowego od 8.01.1966) | odczyt 16.10.2026 |
| tropikalny las na wapiennych grzbietach | NBCA, jw.; WIKI-EN i CP-STARA w `research/cucphuong-2026-10.md` | odczyt 16.10.2026 |
| ok. 120 km na południe od Hà Nội | NBCA, jw. i strona parku („120 km na południe”); CP-STARA, JB, R2R (122,5 km); azymut z `pt` ok. 190° | odczyt 16.10.2026 |

Uwaga: „od 1962 roku chroniący las”, bo nazwę parku narodowego nadano w 1966; kierunek „na południe” poprawia też wstęp `research/cucphuong-2026-10.md` (tam było „na południowy zachód”, czego jego źródła nie podawały).

### puluong

| fakt | źródło | data |
|---|---|---|
| rezerwat przyrody w górach (od 1999) | NBCA, „Pu Luong Nature Reserve, Thanh Hoa”, https://en.nbca.gov.vn/khu-du-tru-thien-nhien-pu-luong-thanh-hoa/; vietnam.travel, „Pu Luong, Thanh Hoa: The hidden paradise”, https://vietnam.travel/things-to-do/pu-luong-thanh-hoa-hidden-paradise; sekcja „puluong” w `research/trudne-dni-2026-10.md` | odczyt 16.10.2026 |
| ok. 160 km na południowy zachód od Hà Nội | vietnam.travel, jw.; wiersze HAN – puluong i hanoi – puluong w `research/polaczenia-2026-10.md` (145–177 km); azymut z `pt` ok. 227° | odczyt 16.10.2026 |
| wioski ludów Thái i Mường wśród tarasów ryżowych | vietnam.travel, jw.; VOV, „Pu Luong Nature Reserve attracts more trekkers”, https://vov.gov.vn/pu-luong-nature-reserve-attracts-more-trekkers-dtnew-1094973 | 20.07.2025; odczyt 16.10.2026 |

Uwaga: NBCA podaje ok. 210 km, bez punktu odniesienia; to odstaje od reszty źródeł.

### ninhbinh

| fakt | źródło | data |
|---|---|---|
| wapienne turnie wśród pól ryżowych | IUCN World Heritage Outlook, „Trang An Landscape Complex”, https://worldheritageoutlook.iucn.org/node/1181; vietnam.travel, „Ninh Binh”, https://vietnam.travel/places-to-go/northern-vietnam/ninh-binh | odczyt 16.10.2026 |
| ok. 100 km na południe od Hà Nội | wiersz hanoi – ninhbinh w `research/polaczenia-2026-10.md` (ok. 100 km do Tam Cốc); Sở Du lịch Ninh Bình, „Ninh Binh Tourism Overview”, https://sodulich.ninhbinh.gov.vn/en/about/ninh-binh-tourism-overview-6.html (93 km do miasta); azymut z `pt` ok. 177° | odczyt 16.10.2026 |
| Tràng An na liście UNESCO od 2014 roku | IUCN, jw. (wpis z 2014); Sở Du lịch Ninh Bình, jw. | odczyt 16.10.2026 |

### catba

| fakt | źródło | data |
|---|---|---|
| największa wapienna wyspa Wietnamu, na północnym wschodzie | IUCN World Heritage Outlook, „Ha Long Bay - Cat Ba Archipelago”, https://worldheritageoutlook.iucn.org/node/1128; Vietnam Journal of Marine Science and Technology, https://vjs.ac.vn/index.php/jmst/article/view/13174 | 30.06.2019; odczyt 16.10.2026 |
| na skraju Zatoki Hạ Long | Công an Nhân dân, https://en.cand.vn/law-society/ha-long-bay-cat-ba-archipelago-seeks-unescos-world-heritage-status-i594072; audyt w `research/pierwowzor-2026-10.md` | 27.03.2023; odczyt 16.10.2026 |
| obok skalistych wysepek Zatoki Lan Hạ | Hải Phòng News, „Exploring the beauty of Vietnam’s forgotten Lan Ha Bay”, https://haiphongnews.gov.vn/tourism/exploring-the-beauty-of-vietnams-forgotten-lan-ha-bay-ct454.html | odczyt 16.10.2026 |

Uwaga: nie „największa wyspa Zatoki Hạ Long”, bo prasa podaje różne powierzchnie; wpis UNESCO z 2023 obejmuje archipelag, nie całą wyspę, więc go nie podajemy.

### hanoi

| fakt | źródło | data |
|---|---|---|
| stolica Wietnamu nad Rzeką Czerwoną | portal rządu, „Geographical introduction and overview”, https://hanoicapital.chinhphu.vn/geographical-introduction-and-overview; Wikipedia „Hanoi” | 10.08.2016; odczyt 16.10.2026 |
| w 1010 roku przeniesiono tu stolicę z Hoa Lư | Cesarska Cytadela Thăng Long, „Moving the Capital - a historic decision”, https://hoangthanhthanglong.vn/en/?p=647; Wikipedia „Hanoi”; Hoa Lư w audycie (`research/pierwowzor-2026-10.md`) | 2.01.2010; odczyt 16.10.2026 |

Uwaga: bez „stolica od 1010 roku”, bo w latach 1802–1945 stolicą było Huế.

### babe

| fakt | źródło | data |
|---|---|---|
| największe naturalne jezioro słodkowodne Wietnamu, w parku narodowym wśród wapiennych gór i lasów | NBCA, „Ba Be Lake Ramsar Site, Bac Kan Province (2011)”, https://en.nbca.gov.vn/khu-ramsar-ho-ba-be-tinh-bac-kan-2011/; ASEAN Centre for Biodiversity, „Ba Be National Park”, https://www.aseanbiodiversity.org/?p=3388; P1 w `research/sezony-2026-10.md` | odczyt 16.10.2026 |
| ok. 240 km na północ od Hà Nội | wiersz hanoi – babe w `research/polaczenia-2026-10.md` (LocalVietnam); P1, sekcja „Location”; azymut z `pt` ok. 351° | odczyt 16.10.2026 |

Uwaga: w linii prostej ok. 155 km.

### caobang

| fakt | źródło | data |
|---|---|---|
| wapienne góry, rzeki i jaskinie; światowy geopark UNESCO od 2018 roku | UNESCO, „Non nuoc Cao Bang UNESCO Global Geopark”, https://www.unesco.org/en/iggp/non-nuoc-cao-bang-unesco-global-geopark (rok nadania 2018; Bản Giốc i jeziora Thang Hen w geoparku) | odczyt 16.10.2026 |
| na północnym wschodzie, przy granicy z Chinami | Wikipedia „Cao Bằng province”; SP-QD248 i SP-BVH w `research/motocykl-2026-10.md` | odczyt 16.10.2026 |

Uwaga: wybrana ostrożniejsza wersja „ze światowym geoparkiem UNESCO”, bo geopark (339 000 ha) nie obejmuje całej krainy.

### hagiang

| fakt | źródło | data |
|---|---|---|
| wapienny płaskowyż ze skalnymi szczytami i kanionami | UNESCO, „Dong Van Karst Plateau UNESCO Global Geopark”, https://www.unesco.org/en/iggp/dong-van-karst-plateau-unesco-global-geopark; HG-COR-TS w `research/hagiang-2026-10.md` | odczyt 16.10.2026 |
| na samej północy kraju, przy granicy z Chinami | UNESCO, jw.; Wikipedia „Dong Van Karst Plateau Geopark”; F-POZW-1 i F-POZW-13 w `research/hagiang-2026-10.md` | odczyt 16.10.2026 |
| pierwszy w Wietnamie światowy geopark UNESCO | VietNamNet, „Dong Van Karst Plateau recognised as UNESCO Global Geopark for 3rd time”, https://vietnamnet.vn/en/dong-van-karst-plateau-recognised-as-unesco-global-geopark-for-3rd-time-2208414.html (w sieci od 3.10.2010); UNESCO, lata nadania czterech geoparków Wietnamu | 30.10.2023; odczyt 16.10.2026 |

Uwaga: bez roku, bo źródła liczą od 2010 albo od 2015 (początek programu UNESCO); „pierwszy” jest prawdą w obu rachubach.

### sapa

| fakt | źródło | data |
|---|---|---|
| górskie miasteczko na ok. 1500 m na północnym zachodzie | SP-KLIM i SP-WIKI-EN w `research/sapa-2026-10.md`; Wikipedia „Sa Pa”; tekst dnia p 1 w `site2/src/content/sapa.js` | odczyt 16.10.2026 |
| dawne francuskie letnisko | SP-KLIM (vi.wikipedia „Sa Pa (thị xã)”); Wikipedia „Sa Pa” („hill station”) | odczyt 16.10.2026 |
| ok. 320 km od Hà Nội | vi.wikipedia, jw. (317 km); SP-AM w `research/sapa-2026-10.md` (315–330 km) | odczyt 16.10.2026 |

Uwaga: bez „przy granicy z Chinami”, bo Sa Pa leży poza strefą przygraniczną (F-POZW-1 w `research/hagiang-2026-10.md`).

### mucangchai

| fakt | źródło | data |
|---|---|---|
| górski region na północnym zachodzie | VNE-CN w `research/mucangchai-2026-10.md` (VnExpress, „Cẩm nang du lịch Mù Cang Chải”, https://vnexpress.net/cam-nang-du-lich-mu-cang-chai-4158151.html) | aktualizacja 14.01.2026; odczyt 16.10.2026 |
| ok. 300 km od Hà Nội | HET-MCC, VNE-CN, NV-HN w `research/mucangchai-2026-10.md` (280–300 km) | odczyt 16.10.2026 |
| tarasy ryżowe zabytkiem narodowym szczególnej klasy | Nông nghiệp và Môi trường, https://nongnghiepmoitruong.vn/ruong-bac-thang-mu-cang-chai-duoc-cong-nhan-di-tich-quoc-gia-dac-biet-d312499.html (decyzja premiera z 31.12.2019); QĐ1954† i BLC-2026-08-30 w `research/mucangchai-2026-10.md` | 3.01.2022; odczyt 16.10.2026 |

Uwaga: zabytek nazywa się „Tarasy ryżowe Mù Cang Chải” (strefa ochrony 852,9 ha), stąd zdanie bez „części tarasów”; bez kierunku od Hà Nội, bo źródła podają „na północ”, a ze współrzędnych wychodzi zachód-północny zachód.

## Przy okazji: Phú Quốc, VinWonders

Agent badawczy dla południa zauważył, że `skip` w `site2/src/content/phuquoc.js` („Sunset Town, kolejka linowa na Hòn Thơm i VinWonders na południu”, EN „…and VinWonders in the south”) myli położenie VinWonders: park rozrywki leży na północy wyspy, w Bãi Dài, w gminie Gành Dầu (VinWonders, „Địa chỉ Vinpearl Phú Quốc ở đâu? Các thông tin cần biết 2026”, https://vinwonders.com/vi/wonderpedia/news/dia-chi-vinpearl-phu-quoc-o-dau-cac-thong-tin-can-biet/, 14.12.2025; odczyt 16.10.2026), czyli w tej samej gminie co nocleg planu (`phuquoc` to północ wyspy, `research/polaczenia-2026-10.md`). Sunset Town i kolejka na Hòn Thơm są na południu wyspy.
