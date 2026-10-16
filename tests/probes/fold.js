// The folded parts of „Dzień po dniu” (the first round of fixes, fix 3, 16.10.2026), in the page's language (L in lib.js):
// every day and journey is a row that starts closed, with its number, title and badges in sight and its text not; a row is a
// button at least 44 px high that a keyboard reaches; a click opens it and leaves the others as they are; the photos stay
// in sight; a day of the strip opens its day; „Rozwiń wszystkie dni” opens every day and journey and turns into „Zwiń
// wszystkie dni”; the open rows stay open after a change of the language or of a swap and close on another trip; the
// printout opens every folded part and closes them back after it.
// tests/probe.sh tests/probes/fold.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
// and at 641, 901 and 1400 px; a click from a script moves no focus and opens no row by a key, so the keyboard is checked
// by hand in a browser (Tab, Enter, Space)
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  function folds(sel) { return Array.prototype.map.call(document.querySelectorAll(sel), function (x) { return x.querySelector(':scope > details'); }); }
  function shut(list) { return list.every(function (d) { return d && !d.open; }); }
  var days = folds('#stops .day'), legs = folds('#stops .leg');
  check('every day and journey is a folded row', days.length > 5 && legs.length > 2 && days.concat(legs).every(Boolean), days.length + ' days, ' + legs.length + ' journeys');
  check('all closed on a new trip', shut(days.concat(legs)));
  var first = days[0], sum = first.querySelector('summary'), h = sum.getBoundingClientRect().height;
  check('a day\'s row: its number, title and badges, at least 44 px high', h >= 44 && /\d/.test(sum.querySelector('.day-n').textContent) && !!sum.querySelector('h4 .pace'), Math.round(h));
  // what a closed part holds is not drawn (checkVisibility: false), though the browser may still give it a box
  function seen(el) { return !!el && el.checkVisibility(); }
  check('its text is out of sight while closed', !seen(first.querySelector('.day-body')));
  check('a journey\'s row: its day, ends and time in one line', legs.every(function (d) { var s = d.querySelector('summary'); return !!s.querySelector('.leg-route') && !!s.querySelector('.leg-total'); }) &&
    !seen(legs[1].querySelector('.leg-segs')));
  check('the photos stay in sight', Array.prototype.every.call(document.querySelectorAll('#stops .gal'), function (g) { return g.getBoundingClientRect().height > 50; }));
  sum.focus();
  check('a keyboard reaches the row (the summary takes the focus)', document.activeElement === sum);
  sum.click();
  check('a click opens the day, the others stay closed', first.open && shut(days.slice(1)), days.filter(function (d) { return d.open; }).length);
  check('its text comes into sight', seen(first.querySelector('.day-body')) && first.querySelector('.day-body').getBoundingClientRect().height > 20);
  legs[1].querySelector('summary').click();
  check('a click opens a journey: its roads and notes come into sight', legs[1].open && seen(legs[1].querySelector('.leg-segs')));
  // a day of the strip: the page goes to it and opens it
  var cell = document.querySelectorAll('#strip a.cell')[4], to = document.getElementById(cell.getAttribute('href').slice(1));
  cell.click();
  check('a day of the strip opens its day', to.querySelector('details').open && Math.abs(to.getBoundingClientRect().top) < 80, Math.round(to.getBoundingClientRect().top));
  var all = document.getElementById('days-all');
  check('„Rozwiń wszystkie dni” stands at the top of „Dzień po dniu”', !!all && all.closest('#days') && all.textContent === L({ en: 'Expand all days', pl: 'Rozwiń wszystkie dni' }), all && all.textContent);
  all.click();
  check('it opens every day and journey and turns into „Zwiń wszystkie dni”', days.concat(legs).every(function (d) { return d.open; }) && all.textContent === L({ en: 'Collapse all days', pl: 'Zwiń wszystkie dni' }), all.textContent);
  all.click();
  check('„Zwiń wszystkie dni” closes them all', shut(days.concat(legs)) && all.textContent === L({ en: 'Expand all days', pl: 'Rozwiń wszystkie dni' }));
  // open rows stay open after a change of the language and of a swap (the same trip), and close on another trip
  days[2].querySelector('summary').click();
  legs[2].querySelector('summary').click();
  var key = days[2].getAttribute('data-fold'), leg = legs[2].getAttribute('data-fold'), sw = document.getElementById('lang-switch');
  function isOpen(k) { var d = document.querySelector('details[data-fold="' + k + '"]'); return !!d && d.open; }
  var other = sw.querySelector('[aria-pressed="false"]');
  other.focus();
  other.click();
  check('after a change of the language the open rows stay open', isOpen(key) && isOpen(leg) && !isOpen(days[0].getAttribute('data-fold')), key + ', ' + leg);
  sw.querySelector('[aria-pressed="false"]').click();
  var self = document.querySelector('#stops .swap[data-swap="caobang"] input[value="self"]');
  self.click();
  check('after a swap the open rows stay open', /motocykl=caobang/.test(location.hash) && isOpen(key) && isOpen(leg), location.hash);
  // the printout opens everything (before printing) and closes back what was closed (after it)
  window.dispatchEvent(new Event('beforeprint'));
  var every = Array.prototype.slice.call(document.querySelectorAll('details'));
  check('before printing every folded part opens', every.length > 10 && every.every(function (d) { return d.open; }), every.filter(function (d) { return !d.open; }).length + ' closed');
  window.dispatchEvent(new Event('afterprint'));
  check('after printing the parts closed before close again', isOpen(key) && isOpen(leg) && !isOpen(days[0].getAttribute('data-fold')));
  var at = soon(5);
  goTo('#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2');
  setTimeout(function () {
    check('another trip: every day and journey closed', shut(folds('#stops .day').concat(folds('#stops .leg'))));
    done();
  }, 500);
}, 1500);
