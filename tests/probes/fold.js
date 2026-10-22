// The folded parts of „Dzień po dniu” (the first round of fixes, fix 3, 16.10.2026), in the page's language (L in lib.js):
// every day and journey is a row that starts closed, with its number, title and badges in sight and its text not; a row is a
// button at least 44 px high that a keyboard reaches; a click opens it and leaves the others as they are; the photos stay
// in sight; a day of the strip opens its day; „Rozwiń wszystkie dni” opens every day and journey and turns into „Zwiń
// wszystkie dni”; the open rows stay open after a change of the language or of a swap and close on another trip; the
// printout opens every folded part and closes them back after it. „Przed wyjazdem” has four closed parts, each with its
// heading and one sentence, the warning of Tết in sight under the bookings' sentence, and a part stays open on another
// trip; the credits of the photos are closed under one line with their number, the notes and the rights in sight. The
// form of the link's trip is folded into three lines; „Ustaw swój wyjazd” in the photo opens it, and it stays open on
// another trip.
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
  // „Przed wyjazdem”: four closed parts, each with its heading and one sentence (finding 7 of fix 3)
  // a part's row as heading | sentence, spaces folded
  // the costs hidden (fix 2): the budget part says so, without folding; the other three parts fold
  check('„Przed wyjazdem”: the budget with the costs hidden, not folded', !folds('#before .b-part')[0] && !!document.getElementById('costs-show'));
  var parts = folds('#before .b-part').slice(1), gist = parts.map(function (d) {
    return d ? [d.querySelector('h3'), d.querySelector('.b-sum, .b-gist')].map(function (e) { return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }).join(' | ') : '';
  });
  check('the other three parts of „Przed wyjazdem” are closed', parts.length === 3 && shut(parts), parts.length);
  check('the bookings: how many, and the most urgent', L({ en: /^Book ahead \| \d+ things, the most urgent: [^.]+\.$/, pl: /^Zarezerwuj wcześniej \| \d+ rzeczy, najpilniejsze: [^.]+\.$/ }).test(gist[0]), gist[0]);
  check('good to know: what it is about', gist[1] === L({ en: 'Good to know | The visa, e-cigarettes and the government sites.', pl: 'Warto wiedzieć | Wiza, e-papierosy i strony rządowe.' }), gist[1]);
  check('what to pack: how many things for this route', L({ en: /^What to pack \| \d+ things? for this route\.$/, pl: /^Co spakować \| \d+ rzeczy? na tę trasę\.$/ }).test(gist[2]), gist[2]);
  check('closed, the parts hide their lists', !seen(document.querySelector('#b-book .b-book')) && !seen(document.querySelector('#b-pack .b-list')));
  // with the costs shown the budget part folds too, with its sum per person in the row
  document.getElementById('costs-show').click();
  var budget = folds('#before .b-part')[0], sumText = budget ? [budget.querySelector('h3'), budget.querySelector('.b-sum')].map(function (e) { return e.textContent.replace(/\s+/g, ' ').trim(); }).join(' | ') : '';
  check('with the costs shown, the budget: closed, its sum per person in the row', !!budget && !budget.open &&
    L({ en: /^Budget \| \d+(–\u2060?\d+)?M VND per person, two sharing a room and a car\.$/, pl: /^Budżet \| \d+(–\u2060?\d+)? mln VND na osobę, przy dwóch osobach w pokoju i aucie\.$/ }).test(sumText), sumText);
  document.getElementById('settings-form').costs.click();
  parts = folds('#before .b-part').slice(1);   // drawn again without the costs
  parts[2].querySelector('summary').click();
  check('a click opens a part: its list in sight', parts[2].open && seen(document.querySelector('#b-pack .b-list')));
  // the credits of the photos: closed, one line with their number; the notes and the rights stay in sight (finding 9)
  var cr = document.querySelector('footer details[data-fold="credits"]');
  var NPHOTOS = Object.keys(PHOTO_META).length;   // every photo of photos.js: the galleries' and the one at the top
  check('the credits of the photos are closed, under one line with their number', !!cr && !cr.open && textOf('footer summary') === L({ en: 'Photos: authors and licences (' + NPHOTOS + ')', pl: 'Zdjęcia: autorzy i licencje (' + NPHOTOS + ')' }) &&
    !seen(document.getElementById('credits')), textOf('footer summary'));
  check('the notes and the rights stay in sight', seen(document.querySelector('.ft-copy')) && L({ en: /Natural Earth/, pl: /Natural Earth/ }).test(textOf('footer')) &&
    seen(document.querySelector('[data-i18n="ft.notes.p"]')));
  cr.querySelector('summary').click();
  check('a click opens the credits: the photos with their authors and licences', cr.open && document.querySelectorAll('#credits li').length === NPHOTOS && seen(document.getElementById('credits')));
  cr.querySelector('summary').click();
  // open rows stay open after a change of the language and of a swap (the same trip), and close on another trip
  days[2].querySelector('summary').click();
  legs[2].querySelector('summary').click();
  var key = days[2].getAttribute('data-fold'), leg = legs[2].getAttribute('data-fold'), sw = document.getElementById('lang-switch');
  function isOpen(k) { var d = document.querySelector('details[data-fold="' + k + '"]'); return !!d && d.open; }
  var other = sw.querySelector('[aria-pressed="false"]');
  other.focus();
  other.click();
  check('after a change of the language the open rows stay open', isOpen(key) && isOpen(leg) && isOpen('b-pack') && !isOpen(days[0].getAttribute('data-fold')), key + ', ' + leg);
  sw.querySelector('[aria-pressed="false"]').click();
  var self = document.querySelector('#stops .swap[data-swap="caobang"] input[value="self"]');
  self.click();
  check('after a swap the open rows stay open', /motocykl=caobang/.test(location.hash) && isOpen(key) && isOpen(leg), location.hash);
  // the form of a link's trip is open (19.10.2026); „Ustaw swój wyjazd” leads to it
  var form = document.getElementById('settings-form');
  check('the form of the link\'s trip is open', !form.hidden);
  document.querySelector('.hero-cta a[href="#settings"]').click();
  check('„Ustaw swój wyjazd” leaves the form open', !form.hidden);
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
    check('a part of „Przed wyjazdem” stays open on another trip', isOpen('b-pack'));
    check('the opened form stays open on another trip', !document.getElementById('settings-form').hidden);
    // a term with Tết (January 2028): its warning stands in sight under the bookings' sentence, the part closed
    goTo('#od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2');
    setTimeout(function () {
      check('Tết: the warning of the bookings in sight under their sentence, the part closed', !isOpen('b-book') && seen(document.querySelector('#b-book .b-warn')) &&
        /Tết/.test(textOf('#b-book .b-warn')), textOf('#b-book .b-warn'));
      done();
    }, 500);
  }, 500);
}, 1500);
