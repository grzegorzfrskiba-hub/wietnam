/* Before the trip (plan 2B). BOOK: what to book ahead and where, by key: ahead, the days ahead outside the peak (0: on the
   spot, not on the list), and the links, official pages and checked operators without tracking or partner parameters.
   From the table „Zestawienie” in research/rezerwacje-2026-10.md, for a place of stage 3 the table „Zestawienie: rezerwacje”
   of its own note (tests/data.test.js checks them against both); tools/links.sh
   checks that the links answer. ENTRY: entry for Polish citizens, from research/wjazd-2026-10.md: days without a visa and
   the last day of the exemption (Nghị quyết 229/NQ-CP; a trip that ends later is told to check the rules), and the official
   pages to check before the trip. */
var BOOK = {
  'phongnha.hangen': { ahead: 60, links: [{ name: 'Oxalis, Hang Én', url: 'https://oxalisadventure.com/tour/hang-en-adventure-cave-camp/' }, { name: 'Oxalis, wszystkie wyprawy', url: 'https://oxalisadventure.com/tours/' }] },
  'cattien.bausau_night': { ahead: 28, links: [{ name: 'Park Cát Tiên, kontakt', url: 'https://cattiennationalpark.com.vn/lien-he/' }, { name: 'Park Cát Tiên, cennik', url: 'https://cattiennationalpark.com.vn/bang-gia-dich-vu/' }] },
  'flights': { ahead: 21, links: [{ name: 'Vietnam Airlines', url: 'https://www.vietnamairlines.com/' }, { name: 'Vietjet', url: 'https://www.vietjetair.com/' }, { name: 'Vietravel Airlines', url: 'https://www.vietravelairlines.com/' }] },
  'catba.cruise': { ahead: 14, links: [{ name: 'Full Moon Travel Asia', url: 'https://fullmoontravelasia.com/cat-ba-overnight-cruise-lan-ha-bay-viet-hai-village/' }, { name: 'Cat Ba Ventures', url: 'https://catbaventures.com/cat-ba-tours/lan-ha-bay-ha-long-bay-bai-tu-long-bay-boat-trip-kayaking-2-days-1-night.html' }] },
  'homestay': { ahead: 14, links: [] },
  'phongnha.tulan': { ahead: 14, links: [{ name: 'Oxalis, Tú Làn w jeden dzień', url: 'https://oxalisadventure.com/tour/tu-lan-1-day-experience/' }] },
  'puluong.summit': { ahead: 7, links: [{ name: 'Rezerwat Pù Luông, formularz', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeXxg-Spbz74V5wBPSBBRXaZpF4PMsFcX22Oxh2XfuYdcBeiA/viewform' }] },
  'caobang.car': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/' }] },
  'cucphuong.stay': { ahead: 7, links: [{ name: 'Du lịch Cúc Phương, kontakt', url: 'https://dulichcucphuong.com.vn/contact-us/' }, { name: 'Du lịch Cúc Phương, noclegi', url: 'https://dulichcucphuong.com.vn/co-so-luu-tru/' }, { name: 'Du lịch Cúc Phương, nocna przejażdżka', url: 'https://dulichcucphuong.com.vn/tour-xe-dien-xem-dom-dom-va-quan-sat-dong-vat-hoang-da-ban-dem-huou-nai-culi/' }] },
  'phongnha.paradise7': { ahead: 7, links: [{ name: 'Park Phong Nha–Kẻ Bàng, Paradise Cave', url: 'https://phongnhakebang.vn/du-lich/dong-thien-duong13' }, { name: 'Paradise Cave', url: 'https://dongthienduong.com/' }] },
  'caobang.easyrider': { ahead: 7, links: [{ name: 'Cao Bang Eco Travel', url: 'https://caobangecotravel.com/3-days-2-nights-tour/' }, { name: 'Cao Bang Green Riders', url: 'https://caobanggreenriders.com/tours' }] },
  'transfer': { ahead: 3, links: [{ name: 'Baolau', url: 'https://www.baolau.com/en/destinations/vietnam' }, { name: 'Vexere', url: 'https://vexere.com/en-US' }, { name: 'FUTA (Phương Trang)', url: 'https://futabus.vn/' }] },
  'airport': { ahead: 3, links: [{ name: 'Baolau', url: 'https://www.baolau.com/en/destinations/vietnam' }, { name: 'Green SM Liên Tỉnh', url: 'https://www.greensm.com/vn-vi/green-lien-tinh' }] },
  'dalat.bidoup': { ahead: 3, links: [{ name: 'Park Bidoup–Núi Bà, kontakt', url: 'https://bidoupnuiba.gov.vn/lien-he/' }, { name: 'Park Bidoup–Núi Bà, formularz', url: 'https://bidoupnuiba.gov.vn/dat-tour' }, { name: 'Park Bidoup–Núi Bà, cennik', url: 'https://bidoupnuiba.gov.vn/dich-vu/bang-gia-dich-vu/' }] },
  'dalat.langbiang': { ahead: 3, links: [{ name: 'Park Bidoup–Núi Bà, kontakt', url: 'https://bidoupnuiba.gov.vn/lien-he/' }] },
  'cucphuong.maybac': { ahead: 3, links: [{ name: 'Du lịch Cúc Phương, kontakt', url: 'https://dulichcucphuong.com.vn/contact-us/' }, { name: 'Du lịch Cúc Phương, combo z Mây Bạc', url: 'https://dulichcucphuong.com.vn/combo-mot-ngay/' }] },
  'caobang.moto': { ahead: 3, links: [{ name: 'Cao Bang Green Riders, cennik', url: 'https://caobanggreenriders.com/rental' }, { name: 'Cao Bang Eco Travel, cennik', url: 'https://caobangecotravel.com/motorbike/' }] },
  'haivan.car': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/hoi-an-hue-private-car/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
  'haivan.car_dn': { ahead: 3, links: [{ name: 'Hoi An Transport Service', url: 'https://hoiantransportservice.com/da-nang-to-hue-private-car-hai-van-pass/' }, { name: 'Hoi An Day Trip', url: 'https://hoiandaytrip.com/da-nang-to-hue-private-transfer/' }] },
  'haivan.moto_dn': { ahead: 3, links: [{ name: 'Hidden Land Travel', url: 'https://hiddenlandtravel.com/rental/da-nang-to-hue-motorbike-rental/' }, { name: 'Tigit Motorbikes', url: 'https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike' }] },
  'haivan.moto': { ahead: 3, links: [{ name: 'Hidden Land Travel', url: 'https://hiddenlandtravel.com/rental/hoi-an-to-hue-motorbike-rental/' }, { name: 'Tigit Motorbikes (start w Đà Nẵng)', url: 'https://www.tigitmotorbikes.com/blogs/one-way-motorbike-rental-hai-van-pass-by-motorbike' }] },
  'saigon.cangio': { ahead: 2, links: [{ name: 'Green SM Green Tour', url: 'https://www.greensm.com/vn-vi/green-tour' }, { name: 'Saigontourist', url: 'https://xedulich.saigontourist.net/' }, { name: 'Grab, wynajem na godziny', url: 'https://www.grab.com/vn/transport/rent/' }] },
  'hanoi.duonglam': { ahead: 2, links: [{ name: 'Green SM Green Tour', url: 'https://www.greensm.com/vn-vi/green-tour' }] },
  'hoian.cooking': { ahead: 2, links: [{ name: 'Tra Que Water Wheel', url: 'https://traquewaterwheel.com/' }] },
  'cattien.park': { ahead: 1, links: [{ name: 'Park Cát Tiên, kontakt', url: 'https://cattiennationalpark.com.vn/lien-he/' }, { name: 'Park Cát Tiên, nocne safari', url: 'https://cattiennationalpark.com.vn/xem-thu-dem/' }] },
  'puluong.guide': { ahead: 1, links: [] },
  'cucphuong.car': { ahead: 1, links: [] },
  'babe.boat': { ahead: 0, links: [] },
  'danang.sontra': { ahead: 0, links: [{ name: 'Grab, wynajem na godziny', url: 'https://www.grab.com/vn/transport/rent/' }, { name: 'Hoi An Transport Service, przejazdy z Đà Nẵng', url: 'https://hoiantransportservice.com/private-car-with-driver-from-da-nang/' }] },
  'hue.citadel': { ahead: 0, links: [{ name: 'Bilety elektroniczne', url: 'https://eticket.hueworldheritage.org.vn/' }, { name: 'Cennik', url: 'https://hueworldheritage.org.vn/Thong-tin-tham-quan/Gia-ve' }] }
};
var ENTRY = { visaFreeDays: 45, visaFreeUntil: '2028-08-14', checked: '2026-10-12',
  links: [{ name: 'Ambasada RP w Hanoi: bez wizy do 45 dni', url: 'https://www.gov.pl/web/wietnam/zwolnienie-z-obowiazku-posiadania-wizy-dla-pobytow-w-celach-turystycznych-nie-dluzszych-niz-45-dni' },
    { name: 'MSZ: Wietnam w serwisie Odyseusz', url: 'https://odyseusz.gov.pl/VN' },
    { name: 'GIS: szczepienia dla podróżujących', url: 'https://www.gov.pl/web/gis/zalecane-szczepienia-dla-podrozujacych' }] };
// the places where a stay sleeps with hosts (the plans of their first day say so): their rooms go on the list of what to book
var HOMESTAYS = ['mekong', 'puluong', 'babe', 'caobang'];
// the hosts with a peak of their own: the line of the hosts adds the place's sentence (UI key b.homestay.<id>)
var HOMESTAY_NOTES = ['puluong'];
