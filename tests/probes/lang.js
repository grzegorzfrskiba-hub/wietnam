// The language switch (stage 5, decisions 1 and 2, findings 1–3): a link without lang= opens in English, with lang=pl in
// Polish; EN · PL in the photo's top right corner, each 44 px or more, changes the texts at once and keeps the trip, its
// settings and its changes, adding &lang=pl to the end of the address or taking it off; the plan for WhatsApp and the link
// of the printout carry the language; the focus stays on the switch; lang= with another value is English, without the
// warning of a wrong link; the same link without lang= (as every link from before stage 5) opens the same trip in English.
// Run on a link without lang= (tests/probe.sh adds nothing):
// tests/probe.sh tests/probes/lang.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// tests/probe.sh tests/probes/lang.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
setTimeout(function () {
  var t = window.__trip, sw = document.getElementById('lang-switch'), plain = window.__probeHash;
  function trip() { return t.state.route.stops.map(function (s) { return s.id + s.n; }).join(','); }
  function on() { var b = sw.querySelector('[aria-pressed="true"]'); return b ? b.getAttribute('data-lang') : ''; }
  function box(el) { return el.getBoundingClientRect(); }
  check('a link without lang= opens in English', document.documentElement.lang === 'en' && on() === 'en' && textOf('.secnav a[href="#days"]') === 'Day by day' &&
    document.title === 'Route G · Vietnam, up to you' && location.hash === plain, document.documentElement.lang + ' ' + document.title + ' ' + location.hash);
  var first = trip(), title = t.state.plans[0][0].t, hero = box(document.querySelector('.hero')), s = box(sw);
  check('the switch: EN · PL, two buttons of 44 px or more', sw.querySelectorAll('button').length === 2 && textOf('#lang-switch') === 'EN·PL' &&
    Array.prototype.every.call(sw.querySelectorAll('button'), function (b) { return box(b).width >= 44 && box(b).height >= 44; }), textOf('#lang-switch'));
  check('in the top right corner of the photo', s.top - hero.top >= 0 && s.top - hero.top <= 12 && hero.right - s.right <= 40 && s.left > hero.left + hero.width / 2,
    Math.round(s.top - hero.top) + ' from the top, ' + Math.round(hero.right - s.right) + ' from the right');
  // a visitor's tap: the button takes the focus, then the click (a click from a script alone moves no focus)
  sw.querySelector('[data-lang="pl"]').focus();
  sw.querySelector('[data-lang="pl"]').click();
  check('PL: the page in Polish at once', document.documentElement.lang === 'pl' && on() === 'pl' && textOf('.secnav a[href="#days"]') === 'Dzień po dniu' &&
    document.title === 'Route G · Wietnam po swojemu', document.documentElement.lang + ' ' + document.title);
  check('the same trip', trip() === first, first + ' → ' + trip());
  check('the texts of the places in Polish too', t.state.plans[0][0].t !== title, title + ' → ' + t.state.plans[0][0].t);
  check('the address gets &lang=pl at its end', location.hash === plain + '&lang=pl', location.hash);
  check('the focus stays on the switch', document.activeElement === sw.querySelector('[data-lang="pl"]'));
  var copied = null;
  try { navigator.clipboard.writeText = function (x) { copied = x; return Promise.resolve(); }; } catch (e) { /* the fallback box below */ }
  document.getElementById('copy-plan').click();
  setTimeout(function () {
    var fb = document.getElementById('copy-fallback');
    if (copied === null && !fb.hidden) copied = fb.value;
    var lines = (copied || '').split('\n');
    check('the plan for WhatsApp in Polish, its link with lang=pl', /^Route G: \d+ dni, /.test(lines[0]) && lines[lines.length - 1] === 'Ten plan na stronie: ' + SITE_URL + plain + '&lang=pl',
      lines[0] + ' … ' + lines[lines.length - 1]);
    check('the link of the printout with lang=pl', document.querySelector('#print-link a').getAttribute('href') === SITE_URL + plain + '&lang=pl',
      document.querySelector('#print-link a').getAttribute('href'));
    // Dodaj in Polish: the change and the language stay in the address
    var add = document.querySelector('[data-add]'), id = add.getAttribute('data-add');
    add.click();
    var changed = trip(), changedHash = location.hash;
    check('Dodaj in Polish: the change and the language in the address', new RegExp('dodaj=([a-zA-Z]+,)*' + id + '(,|&)').test(changedHash) && /&lang=pl$/.test(changedHash), changedHash);
    // EN: back to English, the change kept, &lang=pl gone
    sw.querySelector('[data-lang="en"]').focus();
    sw.querySelector('[data-lang="en"]').click();
    check('EN: English again, the same trip with its change, without &lang=pl', document.documentElement.lang === 'en' && on() === 'en' && trip() === changed &&
      location.hash === changedHash.replace(/&lang=pl$/, ''), location.hash);
    check('the focus stays on the switch', document.activeElement === sw.querySelector('[data-lang="en"]'));
    location.hash = plain + '&lang=pl';
    setTimeout(function () {
      check('a link with lang=pl opens in Polish', document.documentElement.lang === 'pl' && on() === 'pl' && trip() === first, document.documentElement.lang + ' ' + trip());
      location.hash = plain;
      setTimeout(function () {
        check('the same link without lang= opens the same trip in English', document.documentElement.lang === 'en' && on() === 'en' && trip() === first, document.documentElement.lang + ' ' + trip());
        location.hash = plain + '&lang=xx';
        setTimeout(function () {
          check('lang= with another value: English, without the warning of a wrong link', document.documentElement.lang === 'en' && textOf('#alerts').indexOf('Part of the link was wrong') < 0 &&
            location.hash === plain, textOf('#alerts') + ' ' + location.hash);
          done();
        }, 400);
      }, 400);
    }, 400);
  }, 300);
}, 1500);
