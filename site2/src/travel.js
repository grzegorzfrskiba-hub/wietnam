/* Roads and direct domestic flights. Every value has its source and date in research/polaczenia-2026-10.md (two roads
   shortened on 13.10.2026 to the way through Hà Nội: its „Uzupełnienie 13.10.2026”), a road of a place added in stage 3 in
   that place's research note (research/<id>-2026-10.md). No road is longer than the way over the other roads.
   ROADS: [a, b, hours door to door], two-way; ends are places or airport codes.
   FLIGHTS: [a, b, hours in the air], two-way; the engine adds AIRPORT_H at the airports for each flight. */
var ROADS = [
  // the south
  ['SGN', 'saigon', 0.5], ['SGN', 'mekong', 3.5], ['saigon', 'mekong', 3.5], ['SGN', 'cattien', 3.75], ['saigon', 'cattien', 3.75],
  ['cattien', 'dalat', 4.5], ['VCA', 'mekong', 0.75], ['PQC', 'phuquoc', 1], ['DLI', 'dalat', 0.75],
  // the centre
  ['DAD', 'hoian', 0.75], ['DAD', 'hue', 2.5], ['HUI', 'hue', 0.5], ['hoian', 'hue', 3.25],
  // Phong Nha with Đồng Hới airport (VDH), the far roads to the north on the expressway
  ['VDH', 'phongnha', 1], ['hue', 'phongnha', 3.5], ['hoian', 'phongnha', 6.25], ['ninhbinh', 'phongnha', 6.5], ['puluong', 'phongnha', 8.25],
  // the north
  ['HAN', 'hanoi', 0.75], ['HAN', 'ninhbinh', 2.25], ['HAN', 'catba', 4], ['HAN', 'puluong', 5], ['HAN', 'babe', 5], ['HAN', 'caobang', 6.25],
  ['hanoi', 'ninhbinh', 2], ['hanoi', 'catba', 4], ['hanoi', 'caobang', 6.5], ['hanoi', 'babe', 5.25], ['hanoi', 'puluong', 4.25],
  ['puluong', 'ninhbinh', 3.5], ['puluong', 'catba', 7.5], ['ninhbinh', 'catba', 4.5], ['ninhbinh', 'caobang', 8.5], ['ninhbinh', 'babe', 7],
  ['catba', 'caobang', 9.5], ['caobang', 'babe', 4.5],
  // the extra airports: Cát Bi (HPH) near Cát Bà, Thọ Xuân (THD) near Pù Luông and Ninh Bình
  ['HPH', 'catba', 1.75], ['THD', 'puluong', 2.5], ['THD', 'ninhbinh', 2]
];
var FLIGHTS = [
  ['SGN', 'HAN', 2.2], ['SGN', 'DAD', 1.4], ['SGN', 'HUI', 1.4], ['SGN', 'DLI', 0.9], ['SGN', 'PQC', 1.1],
  ['HAN', 'DAD', 1.4], ['HAN', 'HUI', 1.3], ['HAN', 'DLI', 1.9], ['HAN', 'PQC', 2.1], ['HAN', 'VCA', 2.2],
  ['DAD', 'DLI', 1.1], ['DAD', 'VCA', 1.5], ['DAD', 'PQC', 1.8],
  // Đồng Hới (Phong Nha)
  ['HAN', 'VDH', 1.1], ['SGN', 'VDH', 1.6],
  // Cát Bi and Thọ Xuân
  ['HPH', 'SGN', 2], ['HPH', 'DAD', 1.3], ['THD', 'SGN', 2]
];
