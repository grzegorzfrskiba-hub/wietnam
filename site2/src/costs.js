/* The prices of the budget (plan 2B), in euros, each as [from, to]: from is the thrifty end of the middle range, to the
   comfortable end. Sources and dates: the tables „Zestawienie” and „Zestawienie wycieczek” in research/ceny-2026-10.md
   and „Zestawienie” in research/motocykl-2026-10.md; tests/data.test.js checks every number against them.
   EUR_PLN: the NBP rate the page converts with (table A, 9.10.2026). */
var EUR_PLN = 4.3775;
var COSTS_CHECKED = '2026-10-12';   // the day the prices were checked last (11–12.10.2026)
var SHORT_FLIGHT_H = 1.5;           // a flight with at most this many hours in the air is a short one
var COSTS = {
  // a double room for a night: two people share it, one person alone pays all of it
  night: { saigon: [28, 69], mekong: [20, 42], phuquoc: [28, 80], cattien: [14, 40], dalat: [17, 53], hoian: [17, 52], hue: [14, 52],
    puluong: [14, 62], ninhbinh: [15, 62], catba: [14, 52], hanoi: [21, 69], babe: [12, 64], caobang: [14, 48] },
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
    'cattien.bausau_night': { pp: [15, 15], group: [50, 88], night: true },
    'dalat.bidoup': { pp: [10, 10], group: [42, 70] },
    'dalat.cablecar': { pp: [3, 14], group: [2, 6] },
    'dalat.langbiang': { pp: [2, 44], group: [24, 0] },
    'dalat.train': { pp: [5, 5], group: [2, 6] },
    'dalat.caudat': { pp: [0, 0], group: [36, 53] },
    'hoian.cooking': { pp: [25, 47], group: [5, 10] },
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
    'haivan.moto': { pp: [22, 29], group: [0, 0] }
  }
};
