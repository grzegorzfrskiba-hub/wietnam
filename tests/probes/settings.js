// The settings on a phone: the form on the first screen, the photo credit clear of the buttons on the photo, the figures
// of the trip right under the form and following each change, the interests greyed out after two also when a change gives
// no trip, the changes building on the form, the level's words, the summary for the bar, and a link that was partly wrong.
// tests/probe.sh tests/probes/settings.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// and at 360 px, the narrowest common phone (the two date fields side by side must fit), and at 320 px (the bar at the top):
// tests/probe.sh tests/probes/settings.js 360 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// tests/probe.sh tests/probes/settings.js 320 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var f = document.getElementById('settings-form'), box = function (el) { return el.getBoundingClientRect(); };
  var top = document.documentElement.getBoundingClientRect().top;   // the page is at its top: positions are page positions
  // a phone of 360 px or more is at least 640 px high; the first screen of a 390 × 844 phone is the goal
  if (window.innerWidth >= 360) check('the month field ends on the first screen of a 390 × 844 phone (bottom at most 760 px)', box(f.month).bottom - top <= 760, Math.round(box(f.month).bottom - top));
  // the place of the photo, in the photo's bottom right corner, stays clear of the buttons on the photo
  var where = box(document.querySelector('.hero-where'));
  check('the photo credit keeps 4 px or more from the buttons on the photo', Array.prototype.every.call(document.querySelectorAll('.hero-cta a'), function (a) {
    var b = box(a);
    return where.top >= b.bottom + 4 || where.bottom <= b.top - 4 || where.left >= b.right + 4 || where.right <= b.left - 4;
  }), Math.round(where.top) + ' vs ' + Array.prototype.map.call(document.querySelectorAll('.hero-cta a'), function (a) { return Math.round(box(a).bottom); }).join(', '));
  // the language switch in the photo's top right corner (stage 5) keeps clear of the texts on the photo: of their letters
  // (a Range), as a paragraph's box takes the whole width
  var sw = box(document.getElementById('lang-switch'));
  check('the language switch keeps clear of the texts on the photo', ['.hero .eyebrow', '.hero h1', '.hero-tag'].every(function (sel) {
    var r = document.createRange();
    r.selectNodeContents(document.querySelector(sel));
    var b = r.getBoundingClientRect();
    return b.bottom <= sw.top || b.top >= sw.bottom || b.right <= sw.left || b.left >= sw.right;
  }), Math.round(sw.left) + '–' + Math.round(sw.right) + ' × ' + Math.round(sw.top) + '–' + Math.round(sw.bottom));
  // Dodaj in the list of places off the trip stands at the left, clear of the button „Na górę” (44 px, 16 px from the right edge)
  var adds = document.querySelectorAll('#offroute-list [data-add]'), right = Math.max.apply(null, Array.prototype.map.call(adds, function (b) { return box(b).right; }));
  check('Dodaj stays clear of the button „Na górę” (right edge at most the screen width less 60 px)', adds.length > 0 && right <= document.documentElement.clientWidth - 60,
    Math.round(right) + ' of ' + document.documentElement.clientWidth);
  var gap = box(document.querySelector('.facts')).top - box(document.getElementById('settings-msg')).bottom;
  check('the figures of the trip come right under the form (gap under 80 px)', gap >= 0 && gap < 80, Math.round(gap));
  setField('days', '10');
  check('a change shows at once in the figures', textOf('#facts li b') === '10', textOf('#facts li b'));
  check('the bar sums up the settings', L({ en: / · 10 days · Active$/, pl: / · 10 dni · Aktywnie$/ }).test(textOf('#sum-text')), textOf('#sum-text'));
  check('the words of the chosen level under the levels', L({ en: /Full-day hikes/, pl: /Całodniowe wędrówki/ }).test(textOf('#level-note')), textOf('#level-note'));
  f.querySelector('input[name=interest][value=kultura]').click();
  f.querySelector('input[name=interest][value=jedzenie]').click();
  check('two interests: the other three are greyed out', f.querySelectorAll('input[name=interest]:disabled').length === 3);
  // a term that is no trip, then more changes: the form keeps them, and Dodaj builds on them
  f.querySelector('input[name=mode][value=dates]').click();
  var doc = document.documentElement;
  check('the dates fit the screen: the page does not scroll sideways', doc.scrollWidth <= doc.clientWidth, doc.scrollWidth + ' > ' + doc.clientWidth);
  setField('end', '2026-01-01');
  check('an end before the start: a message under the form', L({ en: /5 to 30 days/, pl: /od 5 do 30 dni/ }).test(textOf('#settings-msg')), textOf('#settings-msg'));
  f.querySelector('input[name=interest][value=jedzenie]').click();
  check('the interests unlock at once, though the trip did not change', f.querySelectorAll('input[name=interest]:disabled').length === 0);
  setField('to', 'DAD');
  var add = document.querySelector('[data-add]');
  add.click();
  check('Dodaj after a change that gave no trip keeps the airport chosen in the form', f.to.value === 'DAD', f.to.value);
  check('and says again why there is no trip', L({ en: /5 to 30 days/, pl: /od 5 do 30 dni/ }).test(textOf('#settings-msg')), textOf('#settings-msg'));
  // a link that is partly wrong: the trip opens on the defaults for that part, and the first warning says so
  goTo('#od=XYZ&do=HAN&miesiac=' + soon().year + '-' + (soon().month < 10 ? '0' : '') + soon().month + '&dni=15&co=&poziom=2');
  setTimeout(function () {
    var first = document.querySelector('#alerts li');
    check('a partly wrong link: the first warning above the figures says so', first && L({ en: /Part of the link was wrong/, pl: /Część linku była błędna/ }).test(first.textContent), first && first.textContent);
    check('and the message under the form is empty', textOf('#settings-msg') === '', textOf('#settings-msg'));
    // the bar at the top with its longest summary (dates, Ekstremalnie): headless Chrome runs IntersectionObserver only
    // once, so the bar gets its class here; the summary may be cut short (…), and „Zmień” stays whole on the screen
    var at = soon(), start = new Date(Date.UTC(at.year, at.month - 1, 28)), end = new Date(start.getTime() + 17 * 864e5);
    window.__trip.apply({ from: 'SGN', to: 'HAN', start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10), interests: [], level: 3, add: [], remove: [] });
    var nav = document.getElementById('secnav'), W = document.documentElement.clientWidth;
    nav.classList.add('away');
    var change = nav.querySelector('.sum-change').getBoundingClientRect();
    check('the bar with the summary fits: „Zmień” whole on the screen, nothing sticks out', change.left >= 0 && change.right <= W + 0.5 && nav.scrollWidth <= W,
      Math.round(change.left) + '–' + Math.round(change.right) + ' of ' + W + ', bar ' + nav.scrollWidth);
    nav.classList.remove('away');
    // before the form goes off the screen the bar shows its links, all of them whole (on a phone without „Ustawienia”)
    var links = nav.querySelector('.secnav-links'), shown = Array.prototype.filter.call(links.querySelectorAll('a'), function (a) { return a.offsetWidth > 0; });
    check('the links of the bar fit, none cut short', links.scrollWidth <= links.clientWidth + 0.5 && shown.length === (W <= 640 ? 3 : 4),
      links.scrollWidth + ' of ' + links.clientWidth + ', ' + shown.length + ' links');
    done();
  }, 500);
}, 1500);
