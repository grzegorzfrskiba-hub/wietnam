// The settings on a phone: the form on the first screen, the photo credit clear of the buttons on the photo, the figures
// of the trip right under the form and following each change, the interests greyed out after two also when a change gives
// no trip, the changes building on the form, the level's words, the summary for the bar, and a link that was partly wrong.
// tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// and at 360 px, the narrowest common phone (the two date fields side by side must fit):
// tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var f = document.getElementById('settings-form'), box = function (el) { return el.getBoundingClientRect(); };
  var top = document.documentElement.getBoundingClientRect().top;   // the page is at its top: positions are page positions
  check('the month field ends on the first screen of a 390 × 844 phone (bottom at most 760 px)', box(f.month).bottom - top <= 760, Math.round(box(f.month).bottom - top));
  // the place of the photo, in the photo's bottom right corner, stays clear of the buttons on the photo
  var where = box(document.querySelector('.hero-where'));
  check('the photo credit keeps 4 px or more from the buttons on the photo', Array.prototype.every.call(document.querySelectorAll('.hero-cta a'), function (a) {
    var b = box(a);
    return where.top >= b.bottom + 4 || where.bottom <= b.top - 4 || where.left >= b.right + 4 || where.right <= b.left - 4;
  }), Math.round(where.top) + ' vs ' + Array.prototype.map.call(document.querySelectorAll('.hero-cta a'), function (a) { return Math.round(box(a).bottom); }).join(', '));
  var gap = box(document.querySelector('.facts')).top - box(document.getElementById('settings-msg')).bottom;
  check('the figures of the trip come right under the form (gap under 80 px)', gap >= 0 && gap < 80, Math.round(gap));
  setField('days', '10');
  check('a change shows at once in the figures', textOf('#facts li b') === '10', textOf('#facts li b'));
  check('the bar sums up the settings', / · 10 dni · Aktywnie$/.test(textOf('#sum-text')), textOf('#sum-text'));
  check('the words of the chosen level under the levels', /Całodniowe wędrówki/.test(textOf('#level-note')), textOf('#level-note'));
  f.querySelector('input[name=interest][value=kultura]').click();
  f.querySelector('input[name=interest][value=jedzenie]').click();
  check('two interests: the other three are greyed out', f.querySelectorAll('input[name=interest]:disabled').length === 3);
  // a term that is no trip, then more changes: the form keeps them, and Dodaj builds on them
  f.querySelector('input[name=mode][value=dates]').click();
  var doc = document.documentElement;
  check('the dates fit the screen: the page does not scroll sideways', doc.scrollWidth <= doc.clientWidth, doc.scrollWidth + ' > ' + doc.clientWidth);
  setField('end', '2026-01-01');
  check('an end before the start: a message under the form', /od 5 do 30 dni/.test(textOf('#settings-msg')), textOf('#settings-msg'));
  f.querySelector('input[name=interest][value=jedzenie]').click();
  check('the interests unlock at once, though the trip did not change', f.querySelectorAll('input[name=interest]:disabled').length === 0);
  setField('to', 'DAD');
  var add = document.querySelector('[data-add]');
  add.click();
  check('Dodaj after a change that gave no trip keeps the airport chosen in the form', f.to.value === 'DAD', f.to.value);
  check('and says again why there is no trip', /od 5 do 30 dni/.test(textOf('#settings-msg')), textOf('#settings-msg'));
  // a link that is partly wrong: the trip opens on the defaults for that part, and the first warning says so
  location.hash = '#od=XYZ&do=HAN&miesiac=' + soon().year + '-' + (soon().month < 10 ? '0' : '') + soon().month + '&dni=15&co=&poziom=2';
  setTimeout(function () {
    var first = document.querySelector('#alerts li');
    check('a partly wrong link: the first warning above the figures says so', first && /Część linku była błędna/.test(first.textContent), first && first.textContent);
    check('and the message under the form is empty', textOf('#settings-msg') === '', textOf('#settings-msg'));
    done();
  }, 500);
}, 1500);
