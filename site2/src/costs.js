/* The prices of the budget (plan 2B), in euros, each as [from, to]: from is the thrifty end of the middle range, to the
   comfortable end. Sources and dates: the tables „Zestawienie” and „Zestawienie wycieczek” in research/ceny-2026-10.md
   and „Zestawienie” in research/motocykl-2026-10.md, for a place of stage 3 the tables „Zestawienie: ceny” and
   „Zestawienie: wycieczki” of its own note (research/<id>-2026-10.md); tests/data.test.js checks every number against them.
   EUR_PLN, EUR_PLN_DATE: the NBP rate the page converts with and the day of its table (the row NBP-A of
   research/ceny-2026-10.md, which tests/data.test.js reads); COSTS_CHECKED: the last day the prices were checked, whose
   month the note under the budget names. */
var EUR_PLN = 4.3775, EUR_PLN_DATE = '2026-10-09';
var COSTS_CHECKED = '2026-10-13';   // the prices of the research notes were checked 11–13.10.2026
var SHORT_FLIGHT_H = 1.5;           // a flight with at most this many hours in the air is a short one
var COSTS = {
  // a double room for a night: two people share it, one person alone pays all of it
  night: { saigon: [28, 69], mekong: [20, 42], phuquoc: [28, 80], cattien: [14, 40], dalat: [17, 53], hoian: [17, 52], hue: [14, 52],
    puluong: [14, 62], ninhbinh: [15, 62], catba: [14, 52], hanoi: [21, 69], babe: [12, 64], caobang: [14, 48],
    phongnha: [21, 55], cucphuong: [14, 34], danang: [22, 58], hagiang: [14, 52], sapa: [24, 60], yokdon: [10, 14] },
  day: [13, 28],         // a person a day, two travelling together: food, Grab, water and coffee, tickets up to about 5 EUR
  daySolo: [2, 5],       // more a day for one person alone, who pays each Grab ride in full
  shared: [2.5, 3.5],    // a seat in a limousine van or a bus, a person an hour on the road
  car: [17.5, 19.5],     // a car with its driver, fuel and tolls, an hour on the road
  flight: { short: [34, 62], long: [45, 79] },   // a domestic flight with a checked bag, a person
  /* The paid parts of the days (the field cost of a day in content/) and of the road over the Hải Vân pass (SWAPS in
     content.js): pp a person, group the car, boat, guide, cabin or room of the two. Two people pay pp + group / 2 each,
     one person alone pp + group; from and to are two cases of the same thing, so a part of from may be over its to
     (dalat.langbiang: a guide for the group or a tour sold a person). night: the item has its own room (a cabin on the
     boat, a room at the rangers' station), so the stay counts a night less. book: the key in BOOK (before.js) where it is
     booked, when not its own. */
  items: {
    'saigon.cangio': { pp: [4, 4], group: [56, 111] },
    'mekong.sampan': { pp: [0, 0], group: [10, 17] },
    'mekong.market': { pp: [0, 0], group: [28, 41] },
    'mekong.conson': { pp: [0, 0], group: [14, 21] },
    'phuquoc.north': { pp: [0, 0], group: [52, 69] },
    'phuquoc.east': { pp: [0, 0], group: [52, 69] },
    'cattien.safari': { pp: [6, 6], group: [0, 22], book: 'cattien.park' },
    'cattien.gibbons': { pp: [31, 33], group: [0, 0], book: 'cattien.park' },
    'cattien.bausau_day': { pp: [9, 9], group: [24, 46], book: 'cattien.park' },
    'cattien.trees': { pp: [0, 0], group: [14, 15] },
    'cattien.bausau_night': { pp: [15, 15], group: [79, 88], night: true },
    'dalat.bidoup': { pp: [10, 10], group: [42, 70] },
    'dalat.cablecar': { pp: [3, 14], group: [2, 6] },
    'dalat.langbiang': { pp: [2, 44], group: [24, 0] },
    'dalat.train': { pp: [5, 5], group: [2, 6] },
    'dalat.caudat': { pp: [0, 0], group: [36, 53] },
    'dalat.tanang': { pp: [172, 298], group: [79, 0] },
    'hoian.cooking': { pp: [25, 47], group: [5, 10] },
    'hoian.myson': { pp: [5, 5], group: [28, 41] },
    'hoian.myson_tour': { pp: [26, 36], group: [0, 0] },
    'hue.citadel': { pp: [7, 7], group: [0, 0] },
    'hue.tombs': { pp: [9, 13], group: [0, 0] },
    'hue.boatcar': { pp: [10, 13], group: [36, 45] },
    'hue.lagoon': { pp: [0, 0], group: [23, 45] },
    'puluong.guide': { pp: [28, 53], group: [0, 0] },
    'puluong.car': { pp: [0, 0], group: [36, 53] },
    'puluong.summit': { pp: [5, 46], group: [40, 17] },
    'ninhbinh.vanlong': { pp: [0, 0], group: [7, 32] },
    'ninhbinh.trangan': { pp: [11, 13], group: [0, 0] },
    'ninhbinh.car': { pp: [9, 11], group: [17, 36] },
    'catba.cruise': { pp: [85, 120], group: [62, 103], night: true },
    'catba.viethai': { pp: [4, 11], group: [0, 0] },
    'catba.viethai_boat': { pp: [10, 21], group: [0, 0] },
    'hanoi.duonglam': { pp: [1, 1], group: [41, 52] },
    'hanoi.battrang': { pp: [0, 0], group: [10, 21] },
    'babe.boat': { pp: [0, 0], group: [21, 34] },
    'babe.guide': { pp: [9, 14], group: [0, 0] },
    'babe.cooking': { pp: [5, 10], group: [10, 10] },
    'caobang.car': { pp: [0, 0], group: [34, 55] },
    'caobang.easyrider': { pp: [17, 28], group: [0, 0], book: 'caobang.car' },
    'caobang.moto': { pp: [7, 13], group: [0, 0] },
    'haivan.car': { pp: [0, 0], group: [50, 98] },
    'haivan.moto': { pp: [22, 29], group: [0, 0] },
    'phongnha.cave': { pp: [5, 8], group: [24, 26] },
    'phongnha.paradise': { pp: [9, 9], group: [14, 17] },
    'phongnha.paradise7': { pp: [69, 69], group: [14, 17] },
    'phongnha.darkcave': { pp: [15, 15], group: [7, 14] },
    'phongnha.tulan': { pp: [69, 69], group: [0, 0] },
    'phongnha.hangen': { pp: [327, 327], group: [0, 0], night: true },
    'phongnha.botanic': { pp: [3, 4], group: [0, 7] },
    'phongnha.mooc': { pp: [6, 8], group: [7, 14] },
    'cucphuong.centres': { pp: [6, 9], group: [0, 0] },
    'cucphuong.night': { pp: [5, 0], group: [0, 21], book: 'cucphuong.stay' },
    'cucphuong.car': { pp: [0, 0], group: [36, 53] },
    'cucphuong.maybac': { pp: [0, 0], group: [17, 86] },
    'danang.sontra': { pp: [0, 0], group: [22, 52] },
    'haivan.car_dn': { pp: [0, 0], group: [43, 98] },
    'haivan.moto_dn': { pp: [25, 32], group: [0, 0] },
    'hagiang.car': { pp: [0, 0], group: [88, 133] },
    'hagiang.easyrider': { pp: [18, 34], group: [0, 0], book: 'hagiang.car' },
    'hagiang.moto': { pp: [8, 23], group: [0, 0] },
    'hagiang.permit': { pp: [9, 9], group: [0, 0] },
    'sapa.trek': { pp: [17, 31], group: [5, 18] },
    'sapa.cablecar': { pp: [28, 45], group: [0, 0] },
    'sapa.car': { pp: [0, 0], group: [36, 53] },
    'sapa.fansipan': { pp: [86, 95], group: [0, 71], night: true },
    'sapa.descent': { pp: [0, 29], group: [0, 0] },
    'yokdon.boat': { pp: [0, 0], group: [14, 14], book: 'yokdon.stay' },
    'yokdon.elephants': { pp: [22, 45], group: [7, 7] },
    'yokdon.trek': { pp: [0, 0], group: [15, 21] },
    'yokdon.cooking': { pp: [10, 10], group: [3, 3] },
    'yokdon.camp': { pp: [0, 0], group: [48, 48] }
  }
};
