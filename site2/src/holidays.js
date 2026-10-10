/* Tết and the national holidays in Vietnam as days off, for the warnings on the page. Dates, rules and sources:
   research/swieta-2026-10.md. Each row: [first day, last day, kind, name], YYYY-MM-DD, sorted by date.
   kind 'tet': the Lunar New Year days off (much is closed, transport and rooms sell out); 'holiday': a national holiday
   (domestic travel peaks). HOLIDAYS_FROM…HOLIDAYS_UNTIL: the days the list covers. PLAN_LAST_YEAR: the last year a trip
   can start in on the page, so a trip of MAX_DAYS from its last day still ends inside the list. */
// A row marked 'announced' follows a government decision. Every other row is an estimate (the law and the rule in the
// research note) until the government announces that break.
var HOLIDAYS = [
  ['2026-11-24', '2026-11-24', 'holiday', 'Dzień Kultury Wietnamu'],   // announced
  ['2027-01-01', '2027-01-01', 'holiday', 'Nowy Rok'],
  ['2027-02-04', '2027-02-10', 'tet', 'Tết'],   // announced
  ['2027-04-16', '2027-04-16', 'holiday', 'Święto Królów Hùng'],
  ['2027-04-30', '2027-05-03', 'holiday', 'Dzień Zjednoczenia i Święto Pracy'],
  ['2027-09-02', '2027-09-03', 'holiday', 'Święto Narodowe'],   // announced
  ['2027-11-24', '2027-11-24', 'holiday', 'Dzień Kultury Wietnamu'],
  ['2028-01-01', '2028-01-03', 'holiday', 'Nowy Rok'],
  ['2028-01-24', '2028-01-28', 'tet', 'Tết'],
  ['2028-04-04', '2028-04-04', 'holiday', 'Święto Królów Hùng'],
  ['2028-04-30', '2028-05-02', 'holiday', 'Dzień Zjednoczenia i Święto Pracy'],
  ['2028-09-01', '2028-09-04', 'holiday', 'Święto Narodowe'],
  ['2028-11-24', '2028-11-24', 'holiday', 'Dzień Kultury Wietnamu'],
  ['2029-01-01', '2029-01-01', 'holiday', 'Nowy Rok'],
  ['2029-02-12', '2029-02-16', 'tet', 'Tết'],
  ['2029-04-23', '2029-04-23', 'holiday', 'Święto Królów Hùng'],
  ['2029-04-30', '2029-05-01', 'holiday', 'Dzień Zjednoczenia i Święto Pracy'],
  ['2029-09-02', '2029-09-04', 'holiday', 'Święto Narodowe'],
  ['2029-11-24', '2029-11-24', 'holiday', 'Dzień Kultury Wietnamu'],
  ['2030-01-01', '2030-01-01', 'holiday', 'Nowy Rok'],
  ['2030-01-31', '2030-02-06', 'tet', 'Tết'],
  ['2030-04-12', '2030-04-12', 'holiday', 'Święto Królów Hùng'],
  ['2030-04-30', '2030-05-01', 'holiday', 'Dzień Zjednoczenia i Święto Pracy'],
  ['2030-09-02', '2030-09-03', 'holiday', 'Święto Narodowe'],
  ['2030-11-24', '2030-11-24', 'holiday', 'Dzień Kultury Wietnamu'],
  ['2031-01-01', '2031-01-01', 'holiday', 'Nowy Rok'],
  ['2031-01-21', '2031-01-27', 'tet', 'Tết']
];
var HOLIDAYS_FROM = '2026-10-01', HOLIDAYS_UNTIL = '2031-01-31', PLAN_LAST_YEAR = 2030;
var TET_MARGIN_DAYS = 7;   // the week before and after Tết is busy too: people travel home and back
