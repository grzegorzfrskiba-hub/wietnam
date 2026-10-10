// Dodaj, Usuń, back to the trip without changes, and settings that give no trip or no valid term.
// tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
setTimeout(function () {
  var q = function (s) { var e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : '-'; };
  var ids = function () { return Array.prototype.map.call(document.querySelectorAll('#stops .stop[data-pin]'), function (s) { return s.getAttribute('data-pin'); }).join(','); };
  console.log('P:start ' + ids());
  document.querySelector('[data-add="phuquoc"]').click();
  console.log('P:after Dodaj phuquoc: ' + ids() + ' · ' + location.hash + ' · missing: ' + q('#missing'));
  document.querySelector('[data-remove="phuquoc"]').click();
  console.log('P:after Usuń phuquoc: ' + ids() + ' · ' + location.hash);
  document.getElementById('reset-changes').click();
  console.log('P:after the reset: ' + location.hash);
  var t = window.__trip, s = JSON.parse(JSON.stringify(t.state.settings));
  s.remove = ['saigon', 'mekong', 'cattien'];
  console.log('P:every place near SGN removed → ' + t.apply(s) + ' · message: ' + q('#settings-msg') + ' · stays shown: ' + document.querySelectorAll('#stops .stop').length);
  var f = document.getElementById('settings-form');
  f.querySelector('input[name=mode][value=dates]').click();
  console.log('P:dates mode: ' + location.hash);
  f.end.value = '2026-01-01';
  f.end.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('P:end before start → message: ' + q('#settings-msg') + ' · address still: ' + location.hash);
  t.apply({ from: 'SGN', to: 'SGN', year: 2027, month: 3, days: 12, interests: [], level: 2, add: [], remove: [] });
  console.log('P:round trip SGN→SGN, 12 days: Usuń on Hồ Chí Minh City ' + (document.querySelector('[data-remove="saigon"]') ? 'shown' : 'hidden') + ' · on other stays ' + document.querySelectorAll('.stop-remove').length);
  // Dodaj says which places left the trip: 21 days in the mountains, then Phú Quốc; one more change clears the sentence
  t.apply({ from: 'SGN', to: 'HAN', year: 2027, month: 12, days: 21, interests: ['gory'], level: 2, add: [], remove: [] });
  document.querySelector('[data-add="phuquoc"]').click();
  console.log('P:Dodaj Phú Quốc on the 21-day mountain trip: ' + q('#dropped'));
  f.days.value = '20';   // Dodaj has put the form back to month mode, on this trip
  f.days.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('P:after one more change (20 days): ' + (q('#dropped') === '' ? 'the sentence is gone' : q('#dropped')));
}, 1500);
