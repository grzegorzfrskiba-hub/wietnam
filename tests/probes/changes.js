// Dodaj, Usuń, back to the trip without changes, a link the trip cannot follow, a term that is no trip, a round trip,
// and the sentence after Dodaj. Every change goes through the page as a visitor makes it: buttons, the form, the address.
// tests/probe.sh tests/probes/changes.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var ids = function () { return Array.prototype.map.call(document.querySelectorAll('#stops .stop[data-pin]'), function (s) { return s.getAttribute('data-pin'); }); };
  var at = soon(), month = at.year + '-' + at.month;
  check('the trip has stays', ids().length > 2, ids().join(','));
  document.querySelector('[data-add="phuquoc"]').click();
  check('Dodaj Phú Quốc: on the trip and in the address', ids().indexOf('phuquoc') > -1 && /dodaj=phuquoc/.test(location.hash), ids().join(',') + ' ' + location.hash);
  document.querySelector('[data-remove="phuquoc"]').click();
  check('Usuń Phú Quốc: off the trip, removed in the address', ids().indexOf('phuquoc') < 0 && /usun=phuquoc/.test(location.hash) && !/dodaj=/.test(location.hash), location.hash);
  document.getElementById('reset-changes').click();
  check('back to the trip without changes', !/dodaj=|usun=/.test(location.hash), location.hash);
  // a link whose Usuń leaves no trip: it opens without its Dodaj and Usuń and says so
  location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2&usun=saigon,mekong,cattien';
  setTimeout(function () {
    check('a link the trip cannot follow opens without its changes', !/usun=/.test(location.hash) && ids().length > 2, location.hash);
    check('and says that part of the link was wrong', /Część linku była błędna/.test(textOf('#alerts') + textOf('#settings-msg')), textOf('#alerts') + ' | ' + textOf('#settings-msg'));
    // dates: an end before the start is no trip; the last trip and the address stay, the message says why
    var f = document.getElementById('settings-form');
    f.querySelector('input[name=mode][value=dates]').click();
    var dated = location.hash;
    check('the dates mode keeps the trip, with dates in the address', /start=\d{4}-\d\d-\d\d&koniec=/.test(dated), dated);
    setField('end', '2026-01-01');
    check('an end before the start: a message, the address stays', /od 5 do 30 dni/.test(textOf('#settings-msg')) && location.hash === dated, textOf('#settings-msg') + ' ' + location.hash);
    // a round trip SGN→SGN: Usuń is hidden on the city of the airport, shown on other stays
    f.querySelector('input[name=mode][value=month]').click();
    setField('month', month);
    setField('to', 'SGN');
    check('a round trip from the form', /od=SGN&do=SGN/.test(location.hash), location.hash);
    check('Usuń hidden on Hồ Chí Minh City, shown on the other stays', !document.querySelector('[data-remove="saigon"]') && document.querySelectorAll('.stop-remove').length > 0,
      document.querySelectorAll('.stop-remove').length);
    // Dodaj on a 21-day mountain trip: Phú Quốc pushes places off, and the page says which; the next change clears it
    setField('to', 'HAN');
    setField('days', '21');
    f.querySelector('input[name=interest][value=gory]').click();
    document.querySelector('[data-add="phuquoc"]').click();
    check('the sentence after Dodaj names what left the trip', /Żeby zmieścić Phú Quốc, z trasy wypadło: /.test(textOf('#dropped')), textOf('#dropped'));
    setField('days', '20');
    check('one more change clears the sentence', textOf('#dropped') === '', textOf('#dropped'));
    done();
  }, 500);
}, 1500);
