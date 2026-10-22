# Nowe zdjęcia najsłabszych miejsc: kandydaci z Wikimedia Commons i wybór (22.10.2026)

Runda nowych zdjęć po etapie 7 (ustalenie 22 opisu atlasu, [notes/plans/2026-10-22-atlas-projekt.md](../notes/plans/2026-10-22-atlas-projekt.md); w [notes/etapy.md](../notes/etapy.md) „Następny krok”, punkt 3). Zakres z wyboru użytkownika: Sa Pa, Đà Nẵng, Yok Đôn i Cúc Phương z ustalenia 22, do tego Cát Tiên (galeria miała 4 zdjęcia, jedno prawie czarne) i dwa miejsca z mocnymi kandydatami w puli 68 z [zdjecie-startowe-2026-10.md](zdjecie-startowe-2026-10.md): Hội An i Phong Nha. Każde miejsce: wybór użytkownika według rekomendacji, z arkuszy miniatur.

Pierwsze zdjęcie miejsca to duże zdjęcie karty w atlasie i miniatura w liście „Nie ma na twojej trasie”. Galeria ma 3–5 zdjęć (`tests/content.test.js`); wszystkie siedem ma teraz po 5.

## Jak szukano

- Stan: 22.10.2026. Najpierw pula 68 kandydatów z [zdjecie-startowe-2026-10.md](zdjecie-startowe-2026-10.md) (Sa Pa nr 17–22, Phong Nha nr 23–30, Hội An nr 52–56, Đà Nẵng nr 57–62; miniatury 500 px już na dysku).
- Nowe wyszukiwanie: tylko metadane z API Commons (`action=query`, `prop=imageinfo|categories`, `extmetadata`), z User-Agentem, 3 s między zapytaniami, `maxlag=5`, bez odpowiedzi 429. Kategorie parków z podkategoriami do dwóch poziomów (Yok Don National Park, Serepok River, Buôn Đôn, Cuc Phuong National Park, Cat Tien National Park, Bàu Sấu; Sơn Trà, Marble Mountains, Mỹ Khê, Linh Ứng; Cát Cát, Tả Van, Lao Chải, Mường Hoa) i wyszukiwanie tekstowe w przestrzeni plików (po 200 wyników na zapytanie).
- Filtry: licencja CC0, CC BY, CC BY-SA albo domena publiczna (bez NC i ND), JPEG, poziomo (proporcje 1,25–2,3), szerokość co najmniej 1500 px, plik jeszcze nieużyty na stronie (`photos.js`, `wildphotos.js`), w tytule, opisie albo kategoriach nazwa miejsca.
- Pominięte z metadanych: konto „Vivu Vietnam” (zdjęcia promocyjne Bà Nà jako „own work”, ryzyko jak przy Fansipanie), słonie wożące turystów w Bản Đôn, zdjęcia ze znakami wodnymi, gatunki, które już są na podstronie zwierząt (żaba mchowa, kurtaczek, bażant Germaina).
- Commons dla Yok Đôn jest ubogi: z samego parku są tylko zdjęcia 1280 px (`Yokdon01.JPG` … `Yokdon9.JPG`), więc kandydaci to rzeka Sêrêpốk, wodospady na niej i okolica Buôn Đôn.
- Za zgodą użytkownika pobrane miniatury 500 px: 101 plików (Yok Đôn 16, Cúc Phương 18, Cát Tiên 22, Đà Nẵng 27, Sa Pa 18), 6,0 MB, do scratchpada sesji (poza repo). Numery N w tabelach niżej to numery arkuszy.

## Kandydaci nowego wyszukiwania (metadane, 22.10.2026)

### Yok Đôn

| N | plik na Commons | autor | licencja | szer.×wys. | data | opis z Commons |
|---|---|---|---|---|---|---|
| 1 | [Dray Nur Waterfall (49483462012).jpg](https://commons.wikimedia.org/wiki/File:Dray_Nur_Waterfall_(49483462012).jpg) | Sketyl none | CC BY 2.0 | 6022×4024 | 2020-01-28 | Edited with Darktable |
| 2 | [Dray Nur Waterfall (49483244536).jpg](https://commons.wikimedia.org/wiki/File:Dray_Nur_Waterfall_(49483244536).jpg) | Sketyl none | CC BY 2.0 | 5148×4024 | 2020-01-28 | Edited with Darktable |
| 3 | [Thác Dray Nur-Buôn Ma Thuật - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Th%C3%A1c_Dray_Nur-Bu%C3%B4n_Ma_Thu%E1%BA%ADt_-_panoramio.jpg) | Bich Le | CC BY 3.0 | 2000×1000 | Taken on 1 | Thác Dray Nur-Buôn Ma Thuật |
| 4 | [Thác Dray Sap-Dak Nông - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Th%C3%A1c_Dray_Sap-Dak_N%C3%B4ng_-_panoramio.jpg) | Bich Le | CC BY 3.0 | 2000×1000 | Taken on 1 | Thác Dray Sap-Dak Nông |
| 5 | [Draynur falls5.jpg](https://commons.wikimedia.org/wiki/File:Draynur_falls5.jpg) | Drave005 at Vietnamese Wikipedia | Public domain | 2048×1536 | 23 May 201 | Thác Dray Nur |
| 6 | [Draynur falls.jpg](https://commons.wikimedia.org/wiki/File:Draynur_falls.jpg) | Y Kpia Mlo | CC BY-SA 3.0 | 2048×1536 | 2009-12-25 | Thác Dray Nur |
| 7 | [Gia long waterfall.jpg](https://commons.wikimedia.org/wiki/File:Gia_long_waterfall.jpg) | Y Kpia Mlo | CC BY-SA 3.0 | 1605×1137 | 2009-12-14 | Gia Long Falls — Srepok River. |
| 8 | [Camera360 2016 9 1 095841.jpg](https://commons.wikimedia.org/wiki/File:Camera360_2016_9_1_095841.jpg) | NguyenMii | CC BY-SA 4.0 | 2592×1952 | 2016-09-01 | dòng 1 |
| 9 | [Camera360 2016 9 1 104234.jpg](https://commons.wikimedia.org/wiki/File:Camera360_2016_9_1_104234.jpg) | NguyenMii | CC BY-SA 4.0 | 2592×1952 | 2016-09-01 | Con người nơi đây |
| 10 | [Camera360 2016 9 1 103944.jpg](https://commons.wikimedia.org/wiki/File:Camera360_2016_9_1_103944.jpg) | NguyenMii | CC BY-SA 4.0 | 2592×1952 | 2016-09-01 | nhánh thứ tư |
| 11 | [Trong khu du lịch ở Bản Đôn.jpg](https://commons.wikimedia.org/wiki/File:Trong_khu_du_l%E1%BB%8Bch_%E1%BB%9F_B%E1%BA%A3n_%C4%90%C3%B4n.jpg) | Bùi Thụy Đào Nguyên | CC BY-SA 3.0 | 3296×2212 | 2010-03-05 | Một cảnh trong khu du lịch ở Bản Đôn thuộc tỉnh Đắk Lắk, Việt Nam. |
| 12 | [Serepôk4.JPG](https://commons.wikimedia.org/wiki/File:Serep%C3%B4k4.JPG) | Dotuanhungdaklak | CC BY-SA 3.0 | 1632×1224 | – | – |
| 13 | [Kuop highland village.jpg](https://commons.wikimedia.org/wiki/File:Kuop_highland_village.jpg) | Y Kpia Mlo | CC BY-SA 3.0 | 2048×1272 | 2009-12-25 | Đường vào buôn Kuôp, xã Dray Sáp, huyện Krông Ana |
| 14 | [Dray Sap comune.jpg](https://commons.wikimedia.org/wiki/File:Dray_Sap_comune.jpg) | Y Kpia Mlo | CC BY-SA 3.0 | 1780×1200 | 2009-12-25 | Xã Dray Sáp |
| 15 | [Mộ Ama Kông.jpg](https://commons.wikimedia.org/wiki/File:M%E1%BB%99_Ama_K%C3%B4ng.jpg) | Bùi Thụy Đào Nguyên | CC BY-SA 4.0 | 3543×2362 | 2015-04-08 | Mộ Ama Kông (có tháp nhọn) tại bản Đôn, xã Krông Na, huyện Buôn Đôn, tỉnh Đắk Lắk, Việt Nam. |
| 16 | [Bản Đôn.jpg](https://commons.wikimedia.org/wiki/File:B%E1%BA%A3n_%C4%90%C3%B4n.jpg) | Jean Van Jean | CC BY 3.0 | 2048×1536 | 20 March 2 | Voyage au Viêt Nam |

### Cúc Phương

| N | plik na Commons | autor | licencja | szer.×wys. | data | opis z Commons |
|---|---|---|---|---|---|---|
| 1 | [Cúc phương1.jpg](https://commons.wikimedia.org/wiki/File:C%C3%BAc_ph%C6%B0%C6%A1ng1.jpg) | Gió Đông | CC BY-SA 3.0 | 2048×1536 | – | Phong cảnh Vườn quốc gia Cúc phương. |
| 2 | [Cúc phương2.jpg](https://commons.wikimedia.org/wiki/File:C%C3%BAc_ph%C6%B0%C6%A1ng2.jpg) | vi:User:Gió Đông | CC BY-SA 3.0 | 2048×1536 | 2006-11-08 | Cảnh hoàng hôn VQG Cúc phương nhìn từ trên cao |
| 3 | [Cúc phương3.jpg](https://commons.wikimedia.org/wiki/File:C%C3%BAc_ph%C6%B0%C6%A1ng3.jpg) | vi:User:Gió Đông | CC BY-SA 3.0 | 2048×1536 | 2006-11-05 | Rừng trên núi đá vôi |
| 4 | [Cuc Phuong 01.jpg](https://commons.wikimedia.org/wiki/File:Cuc_Phuong_01.jpg) | Kien1980v (thảo luận) | Public domain | 2048×1536 | – | Vườn quốc gia Cúc Phương ở Hòa Bình - Ninh Bình - Thanh Hóa |
| 5 | [Old Swimming Pool (15891836501).jpg](https://commons.wikimedia.org/wiki/File:Old_Swimming_Pool_(15891836501).jpg) | hds | CC BY 2.0 | 4288×2848 | 2014-10-30 | In Cuc Phuong National Park |
| 6 | [Động Nười Xưa (cropped).jpg](https://commons.wikimedia.org/wiki/File:%C4%90%E1%BB%99ng_N%C6%B0%E1%BB%9Di_X%C6%B0a_(cropped).jpg) | Khoitran1957 | CC BY-SA 4.0 | 1755×1203 | 2012-06-17 | – |
| 7 | [Cuc.Phuong.National.Park.jpg](https://commons.wikimedia.org/wiki/File:Cuc.Phuong.National.Park.jpg) | No machine-readable author provided. Ravikiran r assumed (ba | Public domain | 1600×1200 | 4 February | – |
| 8 | [Parque Nacional de Cuc Phuong (5182009321).jpg](https://commons.wikimedia.org/wiki/File:Parque_Nacional_de_Cuc_Phuong_(5182009321).jpg) | pululante | CC BY 2.0 | 1600×1200 | 2010-09-07 | Blog del viaje: Pululando por Vietnam |
| 9 | [Green-legged partridge.jpg](https://commons.wikimedia.org/wiki/File:Green-legged_partridge.jpg) | Khoitran1957 | CC BY-SA 4.0 | 5472×3078 | 2025-02-21 | Green-legged partridge in Cuc Phuong National Park |
| 10 | [Khu bảo tồn linh trưởng.JPG](https://commons.wikimedia.org/wiki/File:Khu_b%E1%BA%A3o_t%E1%BB%93n_linh_tr%C6%B0%E1%BB%9Fng.JPG) | Minhquangdo | CC BY 4.0 | 5184×3456 | 2016-04-27 | Vượn đen má trắng tại khu cứu hộ linh trưởng, vườn quốc gia Cúc Phương |
| 11 | [Red-shanked douc langur.jpg](https://commons.wikimedia.org/wiki/File:Red-shanked_douc_langur.jpg) | Eprc.asia | CC BY-SA 4.0 | 4608×3456 | 2017-08-07 | Red-shanked douc langurs at EPRC Vietnam |
| 12 | [Lepidoptera Cúc Phương 03.jpg](https://commons.wikimedia.org/wiki/File:Lepidoptera_C%C3%BAc_Ph%C6%B0%C6%A1ng_03.jpg) | Caitlin 0000 | CC BY 4.0 | 4592×3448 | 2024-05-29 | Lepidoptera im Cúc Phương Nationalpark |
| 13 | [Theloderma corticale Cúc Phương 10.jpg](https://commons.wikimedia.org/wiki/File:Theloderma_corticale_C%C3%BAc_Ph%C6%B0%C6%A1ng_10.jpg) | Caitlin 0000 | CC BY 4.0 | 2048×1538 | 2024-08-10 | Theloderma corticale im Cúc Phương Nationalpark |
| 14 | [Ahaetulla Cúc Phương 04.jpg](https://commons.wikimedia.org/wiki/File:Ahaetulla_C%C3%BAc_Ph%C6%B0%C6%A1ng_04.jpg) | Caitlin 0000 | CC BY 4.0 | 4592×3448 | 2024-05-29 | Ahaetulla im Cúc Phương Nationalpark |
| 15 | [Pareas hamptoni Cúc Phương 14.jpg](https://commons.wikimedia.org/wiki/File:Pareas_hamptoni_C%C3%BAc_Ph%C6%B0%C6%A1ng_14.jpg) | Caitlin 0000 | CC BY 4.0 | 2048×1538 | 2023-11-04 | Pareas hamptoni im Cúc Phương Nationalpark |
| 16 | [Salientia Cúc Phương 08.jpg](https://commons.wikimedia.org/wiki/File:Salientia_C%C3%BAc_Ph%C6%B0%C6%A1ng_08.jpg) | Caitlin 0000 | CC BY 4.0 | 2048×1538 | 2024-08-10 | Salientia im Cúc Phương Nationalpark |
| 17 | [Lycodon ruhstrati Cúc Phương 09.jpg](https://commons.wikimedia.org/wiki/File:Lycodon_ruhstrati_C%C3%BAc_Ph%C6%B0%C6%A1ng_09.jpg) | Caitlin 0000 | CC BY 4.0 | 2048×1538 | 2024-08-10 | Lycodon ruhstrati im Cúc Phương Nationalpark, Vietnam |
| 18 | [2024-03-26-tcc cuc phuong entrance-2946.jpg](https://commons.wikimedia.org/wiki/File:2024-03-26-tcc_cuc_phuong_entrance-2946.jpg) | Superbass | CC BY-SA 4.0 | 6720×4480 | 0003 | Turtle Conservation Centre in Cuc Phuong National Park |

### Cát Tiên

| N | plik na Commons | autor | licencja | szer.×wys. | data | opis z Commons |
|---|---|---|---|---|---|---|
| 1 | [Cat Tien Park, Vietnam, Lowland tropical plains.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_Park,_Vietnam,_Lowland_tropical_plains.jpg) | Vyacheslav Argenberg | CC BY 4.0 | 3984×2656 | 2008-02-21 | Cát Tiên National Park, one of the largest areas of lowland tropical forests left in Vietnam. |
| 2 | [Cat Tien Park, Vietnam, forest.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_Park,_Vietnam,_forest.jpg) | Vyacheslav Argenberg | CC BY 4.0 | 3984×2656 | 2008-02-20 | Cát Tiên National Park, one of the largest areas of lowland tropical forests left in Vietnam. |
| 3 | [Cat Tien Park, Vietnam, tropical forest.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_Park,_Vietnam,_tropical_forest.jpg) | Vyacheslav Argenberg | CC BY 4.0 | 3984×2656 | 2008-02-20 | Cát Tiên National Park, one of the largest areas of lowland tropical forests left in Vietnam. |
| 4 | [Cat Tien Park, Vietnam, Tree canopy over blue sky.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_Park,_Vietnam,_Tree_canopy_over_blue_sky.jpg) | Vyacheslav Argenberg | CC BY 4.0 | 3984×2656 | 2008-02-20 | Cát Tiên National Park, one of the largest areas of lowland tropical forests left in Vietnam. |
| 5 | [Cat Tien Park, Vietnam, Tree canopy.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_Park,_Vietnam,_Tree_canopy.jpg) | Vyacheslav Argenberg | CC BY 4.0 | 3984×2656 | 2008-02-20 | Cát Tiên National Park, one of the largest areas of lowland tropical forests left in Vietnam. |
| 6 | [Cat Tien Park, Vietnam, Water buffaloes in lowland tropical plains.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_Park,_Vietnam,_Water_buffaloes_in_lowland_tropical_plains.jpg) | Vyacheslav Argenberg | CC BY 4.0 | 3984×2656 | 2008-02-21 | Cát Tiên National Park, one of the largest areas of lowland tropical forests left in Vietnam. |
| 7 | [2008-02-0709.jpg](https://commons.wikimedia.org/wiki/File:2008-02-0709.jpg) | Vyacheslav Stepanyuchenko | CC BY 2.0 | 2047×1365 | 2008-02-19 | Cat Tien National Park |
| 8 | [Cat Tien National Park, Vietnam.jpg](https://commons.wikimedia.org/wiki/File:Cat_Tien_National_Park,_Vietnam.jpg) | Vyacheslav Argenberg | CC BY 2.0 | 2047×1365 | 2008-02-20 | en:Cát Tiên National Park, Viet Nam |
| 9 | [BenCu forest structure 23Dec08.jpg](https://commons.wikimedia.org/wiki/File:BenCu_forest_structure_23Dec08.jpg) | Roy Bateman | CC BY-SA 4.0 | 2000×1500 | 2008-12-23 | Trees next to Ben Cu rapids at Cat Tien National Park: showing forest structure |
| 10 | [Black-and-red Broadbill 0A2A8472.jpg](https://commons.wikimedia.org/wiki/File:Black-and-red_Broadbill_0A2A8472.jpg) | JJ Harrison | CC BY-SA 4.0 | 3426×2284 | Taken on 1 | Black-and-red Broadbill, Cat Tien National Park, Vietnam |
| 11 | [Germain's Peacock-Pheasant (female) 6785.jpg](https://commons.wikimedia.org/wiki/File:Germain%27s_Peacock-Pheasant_(female)_6785.jpg) | JJ Harrison | CC BY-SA 4.0 | 7516×5011 | Taken on 1 | Germain's Peacock-Pheasant (female), Cat Tien National Park |
| 12 | [Collared Scops Owl 0A2A6332.jpg](https://commons.wikimedia.org/wiki/File:Collared_Scops_Owl_0A2A6332.jpg) | JJ Harrison | CC BY-SA 4.0 | 3665×2443 | Taken on 1 | Collared Scops Owl, Cat Tien National Park, Vietnam |
| 13 | [Oriental Bay Owl 0A2A6329.jpg](https://commons.wikimedia.org/wiki/File:Oriental_Bay_Owl_0A2A6329.jpg) | JJ Harrison | CC BY-SA 4.0 | 3254×2169 | Taken on 1 | Oriental Bay Owl, Cat Tien National Park, Vietnam |
| 14 | [Gonyosoma oxycephalum with a bat.jpg](https://commons.wikimedia.org/wiki/File:Gonyosoma_oxycephalum_with_a_bat.jpg) | James Jolokia | CC BY 4.0 | 2048×1463 | 2023-02-11 | Gonyosoma oxycephalum with a bat at Cat Tien National Park, Vietnam |
| 15 | [Aegithina tiphia on Cassia javanica.jpg](https://commons.wikimedia.org/wiki/File:Aegithina_tiphia_on_Cassia_javanica.jpg) | Dotrihieu | CC BY-SA 4.0 | 5200×3896 | 2025-06-16 | A Common Iora (Aegithina tiphia) preening its feathers on a blooming Cassia javanica |
| 16 | [Hydrornis elliotii.jpg](https://commons.wikimedia.org/wiki/File:Hydrornis_elliotii.jpg) | Piyushgtg | CC BY-SA 4.0 | 5456×3632 | 2013-05-13 | Bar Bellied Pitta in Cat tien National Park , Vietnam by Piyush chauhan |
| 17 | [Nam Cát Tiên, Tân Phú, Đồng Nai, Vietnam - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Nam_C%C3%A1t_Ti%C3%AAn,_T%C3%A2n_Ph%C3%BA,_%C4%90%E1%BB%93ng_Nai,_Vietnam_-_panoramio.jpg) | Lam Tr Th | CC BY-SA 3.0 | 3888×2592 | 9 March 20 | Nam Cát Tiên, Tân Phú, Đồng Nai, Vietnam |
| 18 | [Nam Cát Tiên, Tân Phú, Đồng Nai, Vietnam - panoramio (1).jpg](https://commons.wikimedia.org/wiki/File:Nam_C%C3%A1t_Ti%C3%AAn,_T%C3%A2n_Ph%C3%BA,_%C4%90%E1%BB%93ng_Nai,_Vietnam_-_panoramio_(1).jpg) | Lam Tr Th | CC BY-SA 3.0 | 3888×2592 | 9 March 20 | Nam Cát Tiên, Tân Phú, Đồng Nai, Vietnam |
| 19 | [Nam Cát Tiên, Tân Phú, Đồng Nai, Vietnam - panoramio (2).jpg](https://commons.wikimedia.org/wiki/File:Nam_C%C3%A1t_Ti%C3%AAn,_T%C3%A2n_Ph%C3%BA,_%C4%90%E1%BB%93ng_Nai,_Vietnam_-_panoramio_(2).jpg) | Lam Tr Th | CC BY-SA 3.0 | 3888×2592 | 9 March 20 | Nam Cát Tiên, Tân Phú, Đồng Nai, Vietnam |
| 20 | [Cầu Phao Nam Cát Tiên - panoramio.jpg](https://commons.wikimedia.org/wiki/File:C%E1%BA%A7u_Phao_Nam_C%C3%A1t_Ti%C3%AAn_-_panoramio.jpg) | Lam Tr Th | CC BY-SA 3.0 | 3535×1670 | 9 March 20 | Cầu Phao Nam Cát Tiên |
| 21 | [Macrobrochis gigas, Cat Tien National Park.jpg](https://commons.wikimedia.org/wiki/File:Macrobrochis_gigas,_Cat_Tien_National_Park.jpg) | Dotrihieu | CC BY-SA 4.0 | 3840×2160 | 2025-06-16 | A Macrobrochis gigas caterpillar dangling on a silk thread, Cat Tien National Park, Vietnam |
| 22 | [Pinanga cattienensis.jpg](https://commons.wikimedia.org/wiki/File:Pinanga_cattienensis.jpg) | Roy Bateman | CC BY-SA 4.0 | 2000×1500 | 2016-12-19 | Pinanga cattienensis from Cat Tien National Park by Roy Bateman |

### Đà Nẵng

| N | plik na Commons | autor | licencja | szer.×wys. | data | opis z Commons |
|---|---|---|---|---|---|---|
| 1 | [Ngọn Thủy Sơn(Ngũ Hành Sơn).jpg](https://commons.wikimedia.org/wiki/File:Ng%E1%BB%8Dn_Th%E1%BB%A7y_S%C6%A1n(Ng%C5%A9_H%C3%A0nh_S%C6%A1n).jpg) | Lê Huỳnh Bộ | CC BY-SA 4.0 | 8000×6000 | 17 May 202 | đây là ngọn Thủy Sơn, một trong 5 ngọn núi của Ngũ Hành Sơn. Hình này tôi chụp từ hướng đường Phạm Hữu Nhật, Hòa Hải, Ng |
| 2 | [My Khe Beach, Da Nang, Vietnam.jpg](https://commons.wikimedia.org/wiki/File:My_Khe_Beach,_Da_Nang,_Vietnam.jpg) | . Ray in Manila | CC BY 2.0 | 7669×5011 | 26 Februar | My Khe Beach, Da Nang, Vietnam |
| 3 | [Da Nang Marble Mountains 2020 IMG 4008.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_Marble_Mountains_2020_IMG_4008.jpg) | Kuroczynski | CC BY-SA 4.0 | 7461×3773 | 2020-01-06 | Da Nang - Vietnam - Marble Mountains |
| 4 | [Chùa Linh Ứng Buddhist Temple, Danang, Vietnam (54161781835).jpg](https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_Linh_%E1%BB%A8ng_Buddhist_Temple,_Danang,_Vietnam_(54161781835).jpg) | Mustang Joe | CC0 | 6016×4016 | 2024-11-11 | Chùa Linh Ứng Buddhist Temple, Danang, Vietnam |
| 5 | [Chùa Linh Ứng - Sơn Trà - NKS.jpg](https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_Linh_%E1%BB%A8ng_-_S%C6%A1n_Tr%C3%A0_-_NKS.jpg) | NKSTTSSHNVN | CC BY-SA 4.0 | 5851×3901 | 2023-04-25 | Chùa Linh Ứng trên bán đảo Sơn Trà |
| 6 | [Da Nang - coastal view from Marble Mountains Mar 2024 01.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_-_coastal_view_from_Marble_Mountains_Mar_2024_01.jpg) | Dominic Nelson | CC BY-SA 4.0 | 5836×3891 | 2024-03-14 | View southeast along the coast from the viewpoint signposted "Highest Peak" at the Marble Mountains (Ngũ Hành Sơn) compl |
| 7 | [Da Nang - coastal view from Marble Mountains Mar 2024 02.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_-_coastal_view_from_Marble_Mountains_Mar_2024_02.jpg) | Dominic Nelson | CC BY-SA 4.0 | 5640×3760 | 2024-03-14 | View northeast along the coast from the viewpoint signposted "Highest Peak" at the Marble Mountains (Ngũ Hành Sơn) compl |
| 8 | [My Khe Beach 5.jpg](https://commons.wikimedia.org/wiki/File:My_Khe_Beach_5.jpg) | Christophe95 | CC BY-SA 4.0 | 5619×2612 | 2018-07-30 | The My Khe Beach in Da Nang with the Son Tra Mountain in the background. |
| 9 | [Ngu Hanh Son (52672644377).jpg](https://commons.wikimedia.org/wiki/File:Ngu_Hanh_Son_(52672644377).jpg) | Kevin Rutherford from United States | CC BY-SA 2.0 | 5472×3648 | 2023-01-17 | 109A9839 |
| 10 | [Chua Linh Ung 20150219.jpg](https://commons.wikimedia.org/wiki/File:Chua_Linh_Ung_20150219.jpg) | Armando Nguyen | CC BY 2.0 | 5184×3456 | 2015-02-19 | Linh Ung Pagoda, Da Nang, Vietnam |
| 11 | [My Khe Beach seen from the Son Tra Mountain.jpg](https://commons.wikimedia.org/wiki/File:My_Khe_Beach_seen_from_the_Son_Tra_Mountain.jpg) | Christophe95 | CC BY-SA 4.0 | 5184×3888 | 2018-07-30 | My Khe Beach seen from the Son Tra Mountain in Da Nang. |
| 12 | [Da Nang- Han River and My Khe (China Beach) - 15286870328.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang-_Han_River_and_My_Khe_(China_Beach)_-_15286870328.jpg) | Gary Todd | CC0 | 5184×3456 | 2014-10-07 | Da Nang, Central Vietnam. Complete indexed photo collection at WorldHistoryPics.com. |
| 13 | [Son Tra Mountain 4.jpg](https://commons.wikimedia.org/wiki/File:Son_Tra_Mountain_4.jpg) | Christophe95 | CC BY-SA 4.0 | 4032×3024 | 2018-07-30 | The forest on the Son Tra Mountain (with Da Nang in the background). |
| 14 | [Da Nang and the Son Tra Peninsula.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_and_the_Son_Tra_Peninsula.jpg) | Christophe95 | CC BY-SA 4.0 | 4032×3024 | 2018-07-30 | View of Da Nang and the Tháp Xá Lợi of the Linh Ung Pagoda from the Son Tra Peninsula. |
| 15 | [Son Tra Peninsula.jpg](https://commons.wikimedia.org/wiki/File:Son_Tra_Peninsula.jpg) | Christophe95 | CC BY-SA 4.0 | 4032×3024 | 2018-07-30 | View of the Son Tra Peninsula from the road near the Linh Ung Pagoda. |
| 16 | [Marble Mountains - Ngu Hanh Son District - South of Da Nang City - Vietnam (3).jpg](https://commons.wikimedia.org/wiki/File:Marble_Mountains_-_Ngu_Hanh_Son_District_-_South_of_Da_Nang_City_-_Vietnam_(3).jpg) | Muralikrishna m | CC BY-SA 4.0 | 4032×3024 | 2022-12-15 | Marble Mountains - Ngu Hanh Son District - South of Da Nang City - Vietnam |
| 17 | [Marble Mountain Hoi An, Da Nang (94455).jpg](https://commons.wikimedia.org/wiki/File:Marble_Mountain_Hoi_An,_Da_Nang_(94455).jpg) | Andre Hospers | CC BY 4.0 | 4032×2268 | 3 March 20 | Marble Mountain Hoi An, Da Nang |
| 18 | [Da Nang - Ðộng Huyền Không (2024) - img 05.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_-_%C3%90%E1%BB%99ng_Huy%E1%BB%81n_Kh%C3%B4ng_(2024)_-_img_05.jpg) | Chainwit. | CC BY 4.0 | 4032×3024 | 2024-08-01 | Huyền Không Cave, Marble Mountains of Da Nang |
| 19 | [Da Nang - Ðộng Huyền Không (2024) - img 07.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_-_%C3%90%E1%BB%99ng_Huy%E1%BB%81n_Kh%C3%B4ng_(2024)_-_img_07.jpg) | Chainwit. | CC BY 4.0 | 4032×3024 | 2024-08-01 | Huyền Không Cave, Marble Mountains of Da Nang |
| 20 | [Da Nang - Ðộng Huyền Không (2024) - img 10.jpg](https://commons.wikimedia.org/wiki/File:Da_Nang_-_%C3%90%E1%BB%99ng_Huy%E1%BB%81n_Kh%C3%B4ng_(2024)_-_img_10.jpg) | Chainwit. | CC BY 4.0 | 4032×3024 | 2024-08-01 | Huyền Không Cave, Marble Mountains of Da Nang |
| 21 | [My Khe Beach Danang Coastline.jpg](https://commons.wikimedia.org/wiki/File:My_Khe_Beach_Danang_Coastline.jpg) | Jpatokal | CC BY-SA 4.0 | 4032×3024 | 2022-06-25 | Aerial view of My Khe Beach, Da Nang. Taken from Radisson Hotel. |
| 22 | [Chessboard statue in Ban Co peak.jpg](https://commons.wikimedia.org/wiki/File:Chessboard_statue_in_Ban_Co_peak.jpg) | Pedrovq | CC BY-SA 4.0 | 3872×2592 | 2011-08-20 | Chessboard statue in Ban Co peak |
| 23 | [Vietnam, Hoi An, Marble Mountains (8841347211).jpg](https://commons.wikimedia.org/wiki/File:Vietnam,_Hoi_An,_Marble_Mountains_(8841347211).jpg) | Sarahhoa | CC BY-SA 2.0 | 3707×1823 | 2008-06-17 | Vietnam, Hoi An, Marble Mountains |
| 24 | [Phong cảnh ở Ngũ Hành Sơn.jpg](https://commons.wikimedia.org/wiki/File:Phong_c%E1%BA%A3nh_%E1%BB%9F_Ng%C5%A9_H%C3%A0nh_S%C6%A1n.jpg) | Bùi Thụy Đào Nguyên | CC BY-SA 4.0 | 3500×2362 | 2012-04-12 | Từ trên đỉnh Thủy Sơn trong Ngũ Hành Sơn, nhìn thấy một phần phong cảnh thuộc quận Ngũ Hành Sơn, TP Đà Nẵng, Việt Nam. |
| 25 | [Marble Mountain Gate, Da Nang.jpg](https://commons.wikimedia.org/wiki/File:Marble_Mountain_Gate,_Da_Nang.jpg) | Nam-ho Park | CC BY 2.0 | 3456×2298 | 2009-02-08 | Nice light through the trees. |
| 26 | [Bán đảo Sơn Trà.jpg](https://commons.wikimedia.org/wiki/File:B%C3%A1n_%C4%91%E1%BA%A3o_S%C6%A1n_Tr%C3%A0.jpg) | Bùi Đình Thiêm at Vietnamese Wikipedia | CC BY-SA 3.0 | 3072×2304 | 13 August | Panoramic View of Son Tra Peninsula from Mt. Sơn Trà |
| 27 | [Giải Dù lượn tại Sơn Trà, Đà Nẵng 27-7-2019.jpeg](https://commons.wikimedia.org/wiki/File:Gi%E1%BA%A3i_D%C3%B9_l%C6%B0%E1%BB%A3n_t%E1%BA%A1i_S%C6%A1n_Tr%C3%A0,_%C4%90%C3%A0_N%E1%BA%B5ng_27-7-2019.jpeg) | Linhcandng (thảo luận) | CC BY-SA 3.0 | 4160×3120 | 2019-07-27 | Paragliding Tournament at Son Tra, Da Nang, Vietnam |

### Sa Pa

| N | plik na Commons | autor | licencja | szer.×wys. | data | opis z Commons |
|---|---|---|---|---|---|---|
| 1 | [Mường Hoa Valley 11.jpg](https://commons.wikimedia.org/wiki/File:M%C6%B0%E1%BB%9Dng_Hoa_Valley_11.jpg) | Christophe95 | CC BY-SA 4.0 | 5475×2922 | 2018-08-09 | View of the Mường Hoa Valley in Lao Chải. |
| 2 | [View from Hầu Thào.jpg](https://commons.wikimedia.org/wiki/File:View_from_H%E1%BA%A7u_Th%C3%A0o.jpg) | Christophe95 | CC BY-SA 4.0 | 5184×3888 | 2018-08-08 | View from Hầu Thào, Sa Pa, with the rice terraces of Tả Van. |
| 3 | [Muong Hoa River.jpg](https://commons.wikimedia.org/wiki/File:Muong_Hoa_River.jpg) | Christophe95 | CC BY-SA 4.0 | 5184×3888 | 2018-08-08 | The Muong Hoa River in Tả Van. |
| 4 | [Buffaloes in Tả Van.jpg](https://commons.wikimedia.org/wiki/File:Buffaloes_in_T%E1%BA%A3_Van.jpg) | Christophe95 | CC BY-SA 4.0 | 5184×3888 | 2018-08-08 | Rice terraces in Tả Van. |
| 5 | [Panoramic in Lao Chải 2.jpg](https://commons.wikimedia.org/wiki/File:Panoramic_in_Lao_Ch%E1%BA%A3i_2.jpg) | Christophe95 | CC BY-SA 4.0 | 4769×2526 | 2018-08-09 | Rice terraces in Lao Chải. |
| 6 | [Sapa Ta Van.jpg](https://commons.wikimedia.org/wiki/File:Sapa_Ta_Van.jpg) | JakobHosp | CC BY 4.0 | 4608×2240 | 12 March 2 | Sapa Ta Van , Muong vallei |
| 7 | [Rice terraces in Vietnam.jpg](https://commons.wikimedia.org/wiki/File:Rice_terraces_in_Vietnam.jpg) | Eerin25 | CC0 | 4272×2848 | 2019-12-16 | Rice terraces in Sapa, Vietnam |
| 8 | [Rice terraces in Sapa, Vietnam.jpg](https://commons.wikimedia.org/wiki/File:Rice_terraces_in_Sapa,_Vietnam.jpg) | Eerin25 | CC0 | 4272×2848 | 2019-12-16 | Rice terraces in Sapa, Vietnam |
| 9 | [SAPA RICE TERRACES NORTHERN VIETNAM FEB 2012 (7063878339).jpg](https://commons.wikimedia.org/wiki/File:SAPA_RICE_TERRACES_NORTHERN_VIETNAM_FEB_2012_(7063878339).jpg) | calflier001 | CC BY-SA 2.0 | 3682×2770 | 2012-02-11 | SAPA RICE TERRACES NORTHERN VIETNAM FEB 2012 |
| 10 | [Sapa view 1.jpg](https://commons.wikimedia.org/wiki/File:Sapa_view_1.jpg) | David McKelvey | CC BY 2.0 | 3216×1809 | 2010-08-31 | Sapa, Vietnam. |
| 11 | [Sapa view 2.jpg](https://commons.wikimedia.org/wiki/File:Sapa_view_2.jpg) | David McKelvey | CC BY 2.0 | 3216×1809 | 2010-09-03 | Sa Pa, Vietnam. |
| 12 | [Sapa view 3.jpg](https://commons.wikimedia.org/wiki/File:Sapa_view_3.jpg) | David McKelvey | CC BY 2.0 | 3216×1809 | 2010-08-31 | Sa Pa, Vietnam. |
| 13 | [Village bridge.jpg](https://commons.wikimedia.org/wiki/File:Village_bridge.jpg) | Lori_NY | CC BY-SA 2.0 | 3008×2000 | 2011-10-04 | village bridge Sapa, Ta Van, Lao Chai, Vietnam |
| 14 | [Img 2756 2 Jpg (232258323).jpeg](https://commons.wikimedia.org/wiki/File:Img_2756_2_Jpg_(232258323).jpeg) | Soibien032016 | CC0 | 2048×1365 | 2 Septembe | 500px provided description: Img 2756 2 Jpg [#landscape ,#cloud ,#vietnam ,#sapa ,#lao cai ,#ta van] |
| 15 | [Sapa (231751345).jpeg](https://commons.wikimedia.org/wiki/File:Sapa_(231751345).jpeg) | Soibien032016 | CC0 | 2048×1365 | 2 Septembe | 500px provided description: Sapa [#vietnam ,#sapa ,#lao cai ,#ta van] |
| 16 | [Rizière en terrasse à Sapa, Vietnam, offrant un paysage spectaculaire de cultures en pente.jpg](https://commons.wikimedia.org/wiki/File:Rizi%C3%A8re_en_terrasse_%C3%A0_Sapa,_Vietnam,_offrant_un_paysage_spectaculaire_de_cultures_en_pente.jpg) | Asmara Rodrigue | CC BY 4.0 | 2048×1542 | 2023-05-16 | Rizière en terrasse à Sapa, Vietnam, offrant un paysage spectaculaire de cultures en pente |
| 17 | [Rice terraces in Lao Chải 07.jpg](https://commons.wikimedia.org/wiki/File:Rice_terraces_in_Lao_Ch%E1%BA%A3i_07.jpg) | Christophe95 | CC BY-SA 4.0 | 5120×3733 | 2018-08-09 | Rice terraces in Lao Chải. |
| 18 | [Mường Hoa Valley 14.jpg](https://commons.wikimedia.org/wiki/File:M%C6%B0%E1%BB%9Dng_Hoa_Valley_14.jpg) | Christophe95 | CC BY-SA 4.0 | 3731×2851 | 2018-08-09 | The Mường Hoa Valley in Lao Chải. |

## Wybór (decyzje użytkownika, 22.10.2026)

- **Sa Pa:** nr 18 (`sapa_6`) pierwsze, nr 19 (`sapa_7`), N12 (`sapa_8`), nr 20 (`sapa_9`), `sapa_1`. Wypadają `sapa_0`, `sapa_2`, `sapa_3`, `sapa_4`. Powód: teksty mówią o Fansipanie, szlaku przez Mường Hoa i Ô Quy Hồ; znak na szczycie zostaje jako cel wejścia; `sapa_5` (Fansipan) zostaje tylko na górze strony z trasą.
- **Đà Nẵng:** `danang_0` pierwsze (duk z młodym), N15 (`danang_5`), `danang_1`, N25 (`danang_6`), N21 (`danang_7`). Wypadają `danang_2` (wnętrze Huyền Không; N25 to brama tej samej jaskini), `danang_3` (droga), `danang_4` (muzeum). Powód: teksty mówią o Sơn Trà, Mỹ Khê i Górach Marmurowych; kandydaci z puli (Hải Vân) nie pasują do tekstów Đà Nẵng.
- **Yok Đôn:** `yokdon_1` pierwsze (ustalenie 21), N1 (`yokdon_5`), `yokdon_2`, N9 (`yokdon_6`), `yokdon_3`. Wypadają `yokdon_0` (zamglona rzeka), `yokdon_4` (muzeum). Powód: wodospad Dray Nur leży na Sêrêpốku (fakt niżej).
- **Cúc Phương:** N8 (`cucphuong_5`) pierwsze, `cucphuong_1`, `cucphuong_2`, `cucphuong_0`, N12 (`cucphuong_6`). Wypadają `cucphuong_3` (łuskowiec), `cucphuong_4` (żółw). Powód: galeria miała trzy zwierzęta z ośrodków; zostaje duk (ratowane naczelne z tekstów); jezioro zastępuje leśną ścieżkę na pierwszym miejscu (zmiana ustalenia 21 za zgodą użytkownika).
- **Cát Tiên:** `cattien_0` pierwsze, N10 (`cattien_6`), N7 (`cattien_7`), `cattien_3`, N13 (`cattien_8`). Wypadają `cattien_1` (prawie czarny zachód), `cattien_4` (mokradła, temat jak `cattien_0`). Powód: galeria z 4 do 5 zdjęć; sowa nocą do „nocnego safari” z tekstów.
- **Hội An:** pula nr 54 (`hoian_7`) pierwsze, `hoian_1`, `hoian_6`, `hoian_4`, pula nr 53 (`hoian_8`). Wypadają `hoian_0` (to samo nabrzeże w dzień), `hoian_5` (plaża). Powód: lampiony nocą, o których mówią teksty.
- **Phong Nha:** pula nr 23 (`phongnha_5`) pierwsze, `phongnha_0`, `phongnha_2`, `phongnha_3`, pula nr 26 (`phongnha_6`). Wypadają `phongnha_1` (ta sama Paradise Cave, słabiej), `phongnha_4` (łodzie). Powód: nr 23 to jedyne wyróżnione zdjęcie z trasy (FP, QI, Photo challenge).

Zdjęcia, które wypadły, zniknęły z `photos.js` i `en/photos.js` (test: każdy wpis ma galerię); ich pliki w `photos/` i wpisy w `photos/meta.json` zostają (poza gitem).

## Nowe pliki (kopie 1920 px, 22.10.2026)

Za zgodą użytkownika: 18 plików z upload.wikimedia.org (miniatura 1920 px z API; `cucphuong_5` to oryginał 1600×1200, bez powiększania), 9,1 MB, najpierw do pustego folderu, potem do `photos/` (poza gitem). Licencję i autora sprawdza `tools/licenses.sh`.

| id | plik na Commons | autor | licencja | oryginał | data zdjęcia | skąd | kopia | bajty | SHA-256 |
|---|---|---|---|---|---|---|---|---|---|
| `sapa_6` | [Ray over terrace rice field in Sapa - Trung Chải..jpg](https://commons.wikimedia.org/wiki/File:Ray_over_terrace_rice_field_in_Sapa_-_Trung_Ch%E1%BA%A3i..jpg) | Phi Phi Hoang | CC BY 2.0 | 5760×3840 | 2014-09-28 07:47:27 | pula nr 18 | 1920×1280 | 491750 | `e61f2b30a4fdba82a6ab403a3f9b346819f6079a1e4e9bab8fe7aa80118cfc36` |
| `sapa_7` | [Sapa Clouds (32331255838).jpg](https://commons.wikimedia.org/wiki/File:Sapa_Clouds_(32331255838).jpg) | Rod Waddington from Kergunyah, Australia | CC BY-SA 2.0 | 7266×4784 | 2018-12-07 00:45 | pula nr 19 | 1920×1264 | 249222 | `811a720b3fe0899d4ec4033df1d692680347013d41bf768dfb4e20ac3a2ea71e` |
| `sapa_8` | [Sapa view 3.jpg](https://commons.wikimedia.org/wiki/File:Sapa_view_3.jpg) | David McKelvey | CC BY 2.0 | 3216×1809 | 2010-08-31 18:01:24 | sapa N12 | 1920×1080 | 830295 | `cbfc9d87f97552529fbcc6db3640a5b4045d1190934018a0b4ba9328177e7dc5` |
| `sapa_9` | [Sunset on O Quy Ho pass.jpg](https://commons.wikimedia.org/wiki/File:Sunset_on_O_Quy_Ho_pass.jpg) | Dansapa | CC BY-SA 4.0 | 3264×2448 | 2019-10-07 | pula nr 20 | 1920×1440 | 198232 | `396896fc61f578b9cd1bf05ae66cf3d089336d85b356cfdc04cc2eb7b0576c2f` |
| `danang_5` | [Son Tra Peninsula.jpg](https://commons.wikimedia.org/wiki/File:Son_Tra_Peninsula.jpg) | Christophe95 | CC BY-SA 4.0 | 4032×3024 | 2018-07-30 10:40:39 | danang N15 | 1920×1440 | 755917 | `36ea08723ec926059b2a3676b384bbd124687b1d0d23a0ea3b968283d97e1cdd` |
| `danang_6` | [Marble Mountain Gate, Da Nang.jpg](https://commons.wikimedia.org/wiki/File:Marble_Mountain_Gate,_Da_Nang.jpg) | Nam-ho Park | CC BY 2.0 | 3456×2298 | 2009-02-08 17:00:22 | danang N25 | 1920×1277 | 874269 | `0043094bea58c39d3516a70576a1de3f99c8e1bd48886e294615470ecf7f85af` |
| `danang_7` | [My Khe Beach Danang Coastline.jpg](https://commons.wikimedia.org/wiki/File:My_Khe_Beach_Danang_Coastline.jpg) | Jpatokal | CC BY-SA 4.0 | 4032×3024 | 2022-06-25 11:15:37 | danang N21 | 1920×1440 | 897367 | `f865e8a05f727c8320f367aecaca59224886b6983a8bdc7ffe96627bdc287dfb` |
| `yokdon_5` | [Dray Nur Waterfall (49483462012).jpg](https://commons.wikimedia.org/wiki/File:Dray_Nur_Waterfall_(49483462012).jpg) | Sketyl none | CC BY 2.0 | 6022×4024 | 2020-01-28 08:30 | yokdon N1 | 1920×1283 | 402186 | `08eeb676076e8f69994bbb06dd8ddd045c3c7db14d772d261af56f02a1e647ca` |
| `yokdon_6` | [Camera360 2016 9 1 104234.jpg](https://commons.wikimedia.org/wiki/File:Camera360_2016_9_1_104234.jpg) | NguyenMii | CC BY-SA 4.0 | 2592×1952 | 2016-09-01 | yokdon N9 | 1920×1446 | 730340 | `2537bd3849f8f671e9cea5f162d504c9ac1bf01b97c352672dda78379cd7eafd` |
| `cucphuong_5` | [Parque Nacional de Cuc Phuong (5182009321).jpg](https://commons.wikimedia.org/wiki/File:Parque_Nacional_de_Cuc_Phuong_(5182009321).jpg) | pululante | CC BY 2.0 | 1600×1200 | 2010-09-07 07:26 | cucphuong N8 | 1600×1200 | 175464 | `24a1aaa6281a1406891134cfff3ec6b1d4d19b99b3e3d9d82da1448a5c4440a9` |
| `cucphuong_6` | [Lepidoptera Cúc Phương 03.jpg](https://commons.wikimedia.org/wiki/File:Lepidoptera_C%C3%BAc_Ph%C6%B0%C6%A1ng_03.jpg) | Caitlin 0000 | CC BY 4.0 | 4592×3448 | 2024-05-29 16:21:50 | cucphuong N12 | 1920×1442 | 243597 | `3826f0ff8bf735d7791336eb28fcf3e589401ecd5677299a7172ec12980db64e` |
| `cattien_6` | [Black-and-red Broadbill 0A2A8472.jpg](https://commons.wikimedia.org/wiki/File:Black-and-red_Broadbill_0A2A8472.jpg) | JJ Harrison | CC BY-SA 4.0 | 3426×2284 | Taken on 14 December 2023, 09:25:13 | cattien N10 | 1920×1280 | 240036 | `e1cf0081c02eac6cf7e0696c044952dac9069a6fb1b0e744f24f241ef2ecb060` |
| `cattien_7` | [2008-02-0709.jpg](https://commons.wikimedia.org/wiki/File:2008-02-0709.jpg) | Vyacheslav Stepanyuchenko | CC BY 2.0 | 2047×1365 | 2008-02-19 15:56:50 | cattien N7 | 1920×1280 | 518411 | `d1a80fbbbe3b4b9afb4ce225b8827cd1294718a99c2b34b3c37dc5b9a38e4451` |
| `cattien_8` | [Oriental Bay Owl 0A2A6329.jpg](https://commons.wikimedia.org/wiki/File:Oriental_Bay_Owl_0A2A6329.jpg) | JJ Harrison | CC BY-SA 4.0 | 3254×2169 | Taken on 14 December 2023, 23:44:23 | cattien N13 | 1920×1280 | 229712 | `11a04df9b28de3d174d137fd970a0efb2d8a73696abe0a37497d2e907b4b7559` |
| `hoian_7` | [Hoi'an by the river.jpg](https://commons.wikimedia.org/wiki/File:Hoi%27an_by_the_river.jpg) | John Lian | CC BY-SA 4.0 | 6000×4000 | 2015-06-07 18:09:36 | pula nr 54 | 1920×1280 | 498697 | `495f1d69b7a54a20208bae3588eca4455d17024f857a18d4a2bdad5359ecbe75` |
| `hoian_8` | [Hoi An - HoiAn1441.jpg](https://commons.wikimedia.org/wiki/File:Hoi_An_-_HoiAn1441.jpg) | lumoplank | CC0 | 5184×3456 | before 3 April 2024 | pula nr 53 | 1920×1280 | 549205 | `0c264241909091514a4ed1dd32bd11f4bd165342ea0ac722087dc38d4572285e` |
| `phongnha_5` | [Phong Nha-Ke Bang cave3.jpg](https://commons.wikimedia.org/wiki/File:Phong_Nha-Ke_Bang_cave3.jpg) | [Tycho] talk , http://shansov.net | CC BY-SA 3.0 | 3000×2000 | 2012-11-12 10:36:02 | pula nr 23 | 1920×1280 | 572638 | `e27a5e7725953c7599aa32b2e3132680b97f990d95da4ee7c3c586a1c721f332` |
| `phongnha_6` | [Limestone mountains viewed from the path to Paradise Cave.jpg](https://commons.wikimedia.org/wiki/File:Limestone_mountains_viewed_from_the_path_to_Paradise_Cave.jpg) | Tht481 | CC BY-SA 4.0 | 16320×12240 | 2026-07-08 10:27:27 | pula nr 26 | 1920×1440 | 1053390 | `13a71c149147656a58826b89ed4ff131473f723b89605a1e256c4f6a844d0512` |

## Podpisy (PL | EN)

| id | po polsku | po angielsku |
|---|---|---|
| `sapa_6` | Promienie słońca nad tarasami ryżowymi Trung Chải | Sunbeams over the rice terraces of Trung Chải |
| `sapa_7` | Chmury nad górami Sa Pa | Clouds over the mountains of Sa Pa |
| `sapa_8` | Tarasy ryżowe koło Sa Pa | Rice terraces near Sa Pa |
| `sapa_9` | Zachód słońca na przełęczy Ô Quy Hồ | Sunset on the Ô Quy Hồ pass |
| `danang_5` | Półwysep Sơn Trà z drogi przy pagodzie Linh Ứng | The Sơn Trà peninsula from the road near Linh Ứng Pagoda |
| `danang_6` | Brama jaskini Huyền Không w Marmurowych Górach | The gate of Huyền Không Cave in the Marble Mountains |
| `danang_7` | Plaża Mỹ Khê z góry | Mỹ Khê beach from above |
| `yokdon_5` | Wodospad Dray Nur na rzece Sêrêpốk koło Buôn Ma Thuột | Dray Nur Falls on the Sêrêpốk river near Buôn Ma Thuột |
| `yokdon_6` | Łódź na rzece w powiecie Buôn Đôn | A boat on a river in Buôn Đôn district |
| `cucphuong_5` | Jezioro wśród wapiennych gór w parku Cúc Phương | A lake among limestone hills in Cúc Phương park |
| `cucphuong_6` | Ćma na liściu w parku Cúc Phương | A moth on a leaf in Cúc Phương park |
| `cattien_6` | Szerokodziób białoskrzydły w parku Cát Tiên | A black-and-red broadbill in Cát Tiên park |
| `cattien_7` | Rzeka wśród lasu w parku Cát Tiên | A river through the forest in Cát Tiên park |
| `cattien_8` | Puchówka orientalna nocą w parku Cát Tiên | An oriental bay owl at night in Cát Tiên park |
| `hoian_7` | Nabrzeże Hội An nad rzeką Thu Bồn o zmierzchu | Hội An’s waterfront on the Thu Bồn river at dusk |
| `hoian_8` | Łodzie z lampionami na rzece Thu Bồn nocą | Lantern boats on the Thu Bồn river at night |
| `phongnha_5` | Wnętrze Paradise Cave (Động Thiên Đường) | Inside Paradise Cave (Động Thiên Đường) |
| `phongnha_6` | Wapienne góry przy ścieżce do Paradise Cave | Limestone mountains by the path to Paradise Cave |

## Fakty do podpisów (sprawdzone 22.10.2026)

- **Dray Nur na Sêrêpốku, koło Buôn Ma Thuột** (`yokdon_5`): wodospad jest częścią układu wodospadów Sêrêpốk, w gminie Ea Na (Đắk Lắk), ok. 26 km od centrum Buôn Ma Thuột ([mia.vn, „Thác Dray Nur”](https://mia.vn/cam-nang-du-lich/thac-dray-nur-buon-ma-thuot-14091), WebFetch 22.10.2026); inne strony podają 25–30 km. Podpis mówi tylko „koło Buôn Ma Thuột”. Na Commons kategoria „Dray Nur Falls”.
- **Łódź w powiecie Buôn Đôn** (`yokdon_6`): opis pliku „Con người nơi đây” (ludzie stąd), kategoria „Buôn Đôn District”, zdjęcie z telefonu (HTC Windows Phone 8X); opis nie nazywa rzeki, więc podpis też nie.
- **Jezioro w Cúc Phương** (`cucphuong_5`): kategoria „Cuc Phuong National Park”, współrzędne na stronie pliku 20,250183 / 105,714091 (z Flickra), 7.09.2010; nazwy jeziora źródło nie podaje.
- **Ćma** (`cucphuong_6`): opis „Lepidoptera im Cúc Phương Nationalpark”, 29.05.2024, 16:21, bez nazwy gatunku; podpis bez „nocą”.
- **Szerokodziób białoskrzydły** (`cattien_6`, Cymbirhynchus macrorhynchos, „Black-and-red Broadbill”): polska nazwa z [pl.wikipedia, Cymbirhynchus macrorhynchos](https://pl.wikipedia.org/wiki/Cymbirhynchus_macrorhynchos) (WebFetch 22.10.2026).
- **Puchówka orientalna** (`cattien_8`, Phodilus badius, „Oriental Bay Owl”): polska nazwa z [pl.wikipedia, Puchówki](https://pl.wikipedia.org/wiki/Puch%C3%B3wki) (WebFetch 22.10.2026); zdjęcie 14.12.2023 o 23:44, kategoria „Birds at night”.
- **Brama jaskini Huyền Không** (`danang_6`): na bramie napis 玄空關 (Huyền Không Quan), więc to wejście do jaskini Huyền Không w Górach Marmurowych; opis na Commons „Nice light through the trees”.
- **Paradise Cave** (`phongnha_5`): Featured picture, Quality image i zwycięzca Commons Photo challenge, opis w puli (nr 23).

## Ryzyka licencji

- `hoian_8` (CC0, „lumoplank”): anonimowe konto Flickr z jednym zdjęciem; na stronie pliku FlickreviewR „passed” (cc-zero, 22.07.2026). Słabsza pewność autorstwa niż przy reszcie; wybór użytkownika ze świadomością ryzyka. Gdyby plik zniknął, `tools/licenses.sh` zgłosi MISSING.
- `sapa_6`, `danang_6`, `yokdon_5`, `cucphuong_5`, `cattien_7`, `sapa_8`: importy z Flickra z przeglądem licencji albo przez Flickr upload bot.
- Nr 24 z puli (obóz w Hang Én, Unsplash, „review needed”) nie wszedł; strona Unsplash w Wayback z 29.04.2017 jest sprzed zmiany licencji Unsplash (czerwiec 2017).
