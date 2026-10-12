/* The texts of the places: one file per place in site2/src/content/, CONTENT.<id> = { … }, loaded after this one.
   Written once for every month, in Polish, to one reader (ty), without gendered forms (notes/wizja.md).
   The fields of a place:
   - name, short, sub: the full name; the short name for the strip, the map and lists; one line under the name;
   - region: one of REGIONS; maps: where Google Maps directions start or end; pt: [lat, lon] on the map;
   - color: the place's colour, a number of the palette in template.html (--pal-1…); a night on the way has none, it takes
     the colour of its node; poi: { name, pt } a point of interest the map shows next to the stay (Bản Giốc by Cao Bằng);
   - photos: ids from photos.js, 3–5 (none for a night on the way);
   - days: one plan per night of the longest stay (nights[2] in places.js),
     { p, o, pace, t, d, early?, rain?, cost?, pack?, easy?, hard?, solo? }:
     p: priority, the lowest kept when the stay is short; p 1 is the arrival day (pace travel or rest);
     o: the order within the stay; pace: one of PACES; t: title; d: text; early: starts at 6:00 or earlier;
     rain: what to do on a wet day (shown after "Gdy pada: ", so it starts with a small letter);
     easy: the plan at level 1 (spokojnie), { pace, t, d, early? }, required on a hiking day;
     hard: the plan at level 3 (ekstremalnie), { pace, t, d, early?, off?, late? }; off: the months 1–12 it is not offered;
     self: the plan when the place's swap (SWAPS) is set to „Samodzielnie”, { pace, t, d, early? }, at every level;
     late: the version's night ends away from the stay, so the next morning goes on the walk out; not used on a stay's
     last day before the way home or a long leg;
     a version keeps the day's early start unless it sets its own, and the day's rain plan;
     cost: the paid parts of the plan, keys of COSTS.items (costs.js), for the budget and the list of what to book; an entry
     that is a list names things to pick from (a car with a driver or an easy rider): the budget takes the cheapest and the
     dearest of them; a version keeps the day's cost unless it sets its own ([] for none); a solo plan has its own only;
     pack: codes of PACK_CODES for the list of what to pack, as cost (also on an event);
     solo: on the p 1 day only, the plan of a one-night stay: that evening and the next morning before moving on;
   - again: on an airport's city (HUBS) only: the arrival day of its second stay on a round trip;
     a second stay starts with again and goes on with the plans after the first stay's, by p;
   - events: what happens at the place in some weeks of every year, shown in its card when a stay meets them:
     [{ from, to, t, warn?, pack? }], from and to as [month, day] (a window may run over the new year); t: what to know, in a
     sentence or two; warn: true for a caution (high water, floods, leeches) rather than an event; sources in
     research/sezony-2026-10.md;
   - gem, skip, instead: tips (skip and instead together). */
var CONTENT = {};
var PACES = ['travel', 'hike', 'nature', 'boat', 'culture', 'rest'];
// what a day or an event adds to the list of what to pack (UI keys p.<code>): socks against leeches, a torch
var PACK_CODES = ['leeches', 'torch'];
var REGIONS = ['south', 'centre', 'north'];

/* Names of several words in the texts of the places that have no letter Polish lacks, so tieVietnamese (page.js) cannot
   tell them from Polish words: the page keeps each on one line, as it does the names of the places and the airports. */
var KEEP_TOGETHER = ['Lang Biang', 'Thang Hen', 'Tam Giang', 'Kim Long'];

/* The airports of the travel data: name in texts, place for Google Maps directions, point on the map [lat, lon]; short:
   the name on the map's arrows to another panel, where it differs. */
var AIRPORTS = {
  SGN: { name: 'Hồ Chí Minh City', short: 'HCMC', maps: 'Tan Son Nhat International Airport', pt: [10.82, 106.66] },
  HAN: { name: 'Hà Nội', maps: 'Noi Bai International Airport', pt: [21.22, 105.80] },
  DAD: { name: 'Đà Nẵng', maps: 'Da Nang International Airport', pt: [16.04, 108.20] },
  HUI: { name: 'Huế', maps: 'Phu Bai International Airport', pt: [16.40, 107.70] },
  DLI: { name: 'Đà Lạt', maps: 'Lien Khuong Airport', pt: [11.75, 108.37] },
  PQC: { name: 'Phú Quốc', maps: 'Phu Quoc International Airport', pt: [10.17, 103.99] },
  VCA: { name: 'Cần Thơ', maps: 'Can Tho International Airport', pt: [10.08, 105.71] },
  HPH: { name: 'Hải Phòng (Cát Bi)', short: 'Hải Phòng', maps: 'Cat Bi International Airport', pt: [20.82, 106.72] },
  THD: { name: 'Thanh Hóa (Thọ Xuân)', short: 'Thanh Hóa', maps: 'Tho Xuan Airport', pt: [19.90, 105.47] }
};

/* Roads with a text of their own (UI keys), by their two places in alphabetical order; see segKey in page.js. */
var ROAD_KEYS = { 'cattien-dalat': 'r.car_baoloc', 'hoian-hue': 'r.haivan' };

/* The roads between an airport and a place that need more than a taxi (plan 2B, research/lotniska-2026-10.md): two hours
   or more, or a ferry. By the airport's code and the place: text, a UI key that reads right both ways (segKey in page.js;
   the other roads of an airport keep the taxi); book: the car is booked ahead, so the road goes on the list of what to
   book (not from Thọ Xuân to Ninh Bình, where taxis wait at the terminal). */
var AIR_KEYS = {
  'HAN-ninhbinh': { text: 'r.air_ninhbinh', book: true }, 'DAD-hue': { text: 'r.air_hue', book: true },
  'HPH-catba': { text: 'r.air_catba', book: true }, 'HAN-catba': { text: 'r.air_catba', book: true },
  'SGN-mekong': { text: 'r.air_mekong', book: true }, 'SGN-cattien': { text: 'r.air_cattien', book: true },
  'HAN-caobang': { text: 'r.air_car', book: true }, 'HAN-babe': { text: 'r.air_car', book: true }, 'HAN-puluong': { text: 'r.air_car', book: true },
  'THD-ninhbinh': { text: 'r.air_thd', book: false }, 'THD-puluong': { text: 'r.air_puluong', book: true }
};
/* The places behind a ferry that runs by day (research/lotniska-2026-10.md): last, about when the last crossing toward the
   place goes in the evening; land, by airport, the latest landing that still makes it by car; first, the first crossing
   back in the morning; at, by airport, the earliest time there after it. The journey's card says so (ferryNotes in page.js). */
var FERRY = {
  catba: { last: '18:00', land: { HAN: '13:30', HPH: '16:00' }, first: '5:00', at: { HAN: '9:00', HPH: '6:30' } },
  cattien: { last: '18:00', land: { SGN: '13:30' }, first: '6:00', at: { SGN: '10:00' } }
};

/* Either-or choices inside a trip (plan 2B): for now riding a motorbike yourself instead of being driven, on the loop around
   Cao Bằng and on the road over the Hải Vân pass. A link lists the swaps set to „Samodzielnie” (motocykl=caobang,haivan);
   the trip does not change. place: the place whose days take their self versions (the days of the loop); road: a road of
   ROAD_KEYS, with text, its UI key when ridden yourself, and cost, the item of COSTS (costs.js) for each way: driver (with
   a driver, the usual) and self. */
var SWAPS = {
  caobang: { place: 'caobang' },
  haivan: { road: 'hoian-hue', text: 'r.haivan_self', cost: { driver: 'haivan.car', self: 'haivan.moto' } }
};
