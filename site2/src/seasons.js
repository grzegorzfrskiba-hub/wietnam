/* The season of each place, one letter per month from January: D dobry, S średni, Z zły, X zamknięte.
   Reasons, climate figures and sources: research/sezony-2026-10.md. */
var SEASONS = {
  saigon: 'DDDSSSSSSSDD', mekong: 'DDDDSSSSSSDD', phuquoc: 'DDDDSZZZZSSD', cattien: 'DDDSSSSZZZSD', dalat: 'DDDDSSSSSSDD',
  hoian: 'DDDDDSSDSZZS', hue: 'DDDDDSSSSZZZ', puluong: 'SSSDSSSSSDDS', ninhbinh: 'SSSDDDSSSDDD', catba: 'SSSDDSZZZDDS',
  hanoi: 'DDDDSSSSSDDD', babe: 'SSSDSSSSDDDS', caobang: 'SSDDSSSSDDDS'
};
SEASONS.hanoiStop = SEASONS.hanoi;   // a night in Hà Nội on the way
