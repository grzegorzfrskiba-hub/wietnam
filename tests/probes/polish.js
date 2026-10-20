/* The finishing touches on the page with the route (notes/plans/2026-10-20-wykonczenia-projekt.md), in both languages
   (&lang=pl at the end), at 390 and 1400 px, on a trip with Cao Bằng and on one without:
     bash tests/probe.sh tests/probes/polish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
   Headless Chrome calls an IntersectionObserver once, right after the page opens, and runs no CSS transition: the probe
   checks the final state, and the rules of the motion by setting the class live itself. The photos: every photo loaded late
   with its mean colour, unseen till it has loaded (finding 6); the slow zoom of the photo at the top (5); the typography (12).
   The bar at the top over the days (8): the day across the middle of the screen under it, the summary over and under the
   days. The end of the page (9 and 10): the sunset over Pù Luông, the last day of the trip, the title, the sentence and
   three buttons, not on paper. The motion of a new trip (1–3): the leg of every line and pin, the drawing itself started
   and finished by hand, a script's change of the trip at once and still, a visitor's change (byHand) with the strip in a
   wave, the days fading up and the figures counting from the last trip's. */
(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var root = document.documentElement, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var all = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // the photos (findings 5 and 6)
  var ph = all('img.ph');
  check('every photo loaded late has its mean colour', ph.length > 20 && ph.every(function (i) { return /^#[0-9a-f]{6}$/.test(i.getAttribute('data-ph')) && i.loading === 'lazy'; }), ph.length);
  check('the photo at the top is none of them', !!document.querySelector('.hero > img') && !document.querySelector('.hero img.ph'));
  var was = root.classList.contains('live');
  root.classList.add('live');
  var top = getComputedStyle(document.querySelector('.hero > img'));
  check('live: the photo at the top zooms slowly, once', still ? top.animationName === 'none' : top.animationName === 'kb' && top.animationIterationCount === '1' && parseFloat(top.animationDuration) >= 20,
    top.animationName + ' ' + top.animationDuration);
  var im = document.createElement('img');
  im.className = 'ph'; im.style.transition = 'none'; document.querySelector('main').appendChild(im);
  var wait = getComputedStyle(im).opacity;
  im.classList.add('in');
  check('live: a photo not loaded yet waits unseen, a loaded one shows', wait === '0' && getComputedStyle(im).opacity === '1', wait);
  im.remove(); root.classList.toggle('live', was);

  // the typography (finding 12): no lone last word in a paragraph, a selection in the page's accent
  var p = getComputedStyle(document.querySelector('.hero-lede'));
  check('paragraphs wrap without a lone last word', p.textWrapStyle === 'pretty' || p.textWrap === 'pretty', p.textWrapStyle || p.textWrap);
  check('a selection in the accent colour', Array.prototype.some.call(document.styleSheets, function (s) {
    return Array.prototype.some.call(s.cssRules, function (r) { return /::selection/.test(r.selectorText || '') && /var\(--accent\)/.test(r.cssText); });
  }));

  setTimeout(function () {
    var loaded = ph.filter(function (i) { return i.complete && i.naturalWidth; });
    check('the loaded photos are marked to show', loaded.length > 0 && loaded.every(function (i) { return i.classList.contains('in'); }), loaded.length + ' / ' + ph.length);
    check('their frames lose the mean colour once loaded', loaded.every(function (i) { return !i.parentNode.style.backgroundColor; }));
    days();
  }, 1500);

  // the bar over the days (finding 8): an element brought just above the line in the middle of the screen under the bar (and
  // under the small map on a phone), as the page counts it; headless Chrome sends no scroll event of its own, so the probe does
  var S = window.__trip.state, V = localContent(CONTENT, LANG === 'en' ? CONTENT_EN : null);
  function line() {
    var mini = document.getElementById('minimap');
    return (document.getElementById('secnav').getBoundingClientRect().bottom + (mini.classList.contains('on') ? mini.offsetHeight : 0) + innerHeight) / 2;
  }
  function bring(el) {
    for (var k = 0; k < 3; k++) { window.scrollBy(0, el.getBoundingClientRect().top - (line() - 12)); window.dispatchEvent(new Event('scroll')); }
  }
  function days() {
    var bar = document.getElementById('secnav'), sum = textOf('#sum-text'), day = function () { return textOf('#sum-day'); };
    var fold = function (t) { return t.replace(/\s+/g, ' ').trim(); };
    var s2 = S.route.stops[1], li = document.getElementById('day-' + (s2.end > s2.start ? s2.start + 1 : s2.start));
    bring(li);
    var n = +li.id.slice(4);
    check('over a day: the bar says the day and its place', bar.classList.contains('in-days') && day() === UI[LANG].day + ' ' + n + ' · ' + V[s2.id].short &&
      document.querySelector('#sum-day .dot').style.getPropertyValue('--c') === document.getElementById('stop-2').style.getPropertyValue('--c'), day());
    check('the summary of the settings stays, hidden', textOf('#sum-text') === sum && getComputedStyle(document.getElementById('sum-text')).visibility === 'hidden');
    bring(document.getElementById('stop-2'));
    check('over a stay’s heading and photos: its first day', day() === UI[LANG].day + ' ' + s2.start + ' · ' + V[s2.id].short, day());
    var leg = document.getElementById('stop-2').previousElementSibling;
    bring(leg);
    check('over a journey: its day and its ends', day() === fold(leg.querySelector('.leg-day').textContent + ' · ' + leg.querySelector('.leg-route').textContent), day());
    bring(document.getElementById('stop-home').querySelector('.day'));
    check('over the last day: the departure', day() === UI[LANG].day + ' ' + S.route.days + ' · ' + UI[LANG].flyhome, day());
    bring(document.getElementById('shape'));
    check('over the days: the summary again', !bar.classList.contains('in-days') && getComputedStyle(document.getElementById('sum-text')).visibility === 'visible');
    bring(document.getElementById('before'));
    check('under the days: the summary again', !bar.classList.contains('in-days'));
    window.scrollTo(0, 0);
    end();
  }

  // the end of the page (findings 9 and 10)
  function end() {
    var f = document.getElementById('finale'), im = f && f.querySelector('.finale-photo img');
    check('the end of the page: under „Before you go”, over the footer', !!f && !!(document.getElementById('before').compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      f.nextElementSibling === document.querySelector('footer'));
    check('its photo: the sunset over Pù Luông, the page’s width, loaded late', !!im && /puluong_1(-\d+)?\.jpg$/.test(im.currentSrc || im.src) && im.classList.contains('ph') &&
      Math.abs(f.getBoundingClientRect().width - innerWidth) < 1 && textOf('.finale-where') === 'Pù Luông' && im.alt === (LANG === 'en' ? PHOTO_CAPS_EN.puluong_1 : PHOTO_META.puluong_1.cap), im && (im.currentSrc || im.src));
    var r = S.route, st = S.st;
    check('the last day of the trip over the title', textOf('#end-day') === UI[LANG].day + ' ' + r.days + ' · ' + AIRPORTS[st.to].name + ' · ' + UI[LANG].flyhome, textOf('#end-day'));
    check('the title, the sentence and three buttons', textOf('#end-h2') === UI[LANG]['end.h2'] && textOf('.finale-p') === UI[LANG]['end.p'] && textOf('#end-copy') === UI[LANG]['copy.btn'] &&
      textOf('#end-pdf') === UI[LANG]['pdf.btn'] && f.querySelector('a[href="#settings"]').textContent === UI[LANG]['end.change']);
    document.getElementById('end-copy').click();
    setTimeout(function () {
      var box = document.getElementById('end-fallback');
      check('copy at the end: the plan copied, or the text to copy under the buttons', (textOf('#end-status') === UI[LANG]['copy.ok'] || (!box.hidden && box.value.indexOf(SITE_URL) > -1 && textOf('#end-status') === UI[LANG]['copy.fail'])) &&
        textOf('#copy-status') === '', textOf('#end-status'));
      var printCss = [];
      Array.prototype.forEach.call(document.styleSheets, function (s) {
        Array.prototype.forEach.call(s.cssRules, function (x) { if (x.media && /print/.test(x.media.mediaText)) Array.prototype.forEach.call(x.cssRules, function (y) { printCss.push(y.cssText); }); });
      });
      var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
      check('not on paper', !f.checkVisibility());
      ps.remove();
      motion();
    }, 400);
  }

  // the motion of a new trip (findings 1–3); the page's own animations only (Web Animations, not its CSS transitions)
  function own(list) { return list.filter(function (x) { return !(x instanceof CSSTransition) && !(x instanceof CSSAnimation); }); }
  function motion() {
    var svg = document.querySelector('#map svg'), legs = S.route.stops.length + 1, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lines = Array.prototype.slice.call(svg.querySelectorAll('.m-road:not(.m-local), .m-fly'));
    check('every line of the route with its leg of the trip', lines.length > 0 && lines.every(function (l) { var k = +l.getAttribute('data-leg'); return l.hasAttribute('data-leg') && k >= 0 && k < legs; }), lines.length);
    check('every pin with the leg that brings its first stay', Array.prototype.every.call(svg.querySelectorAll('.pin'), function (p) {
      return +p.getAttribute('data-leg') === parseInt(p.querySelector('.pin-num').textContent, 10) - 1;
    }));
    check('at rest: the route whole, no mask, nothing moving', !svg.querySelector('mask, [mask]') && own(svg.getAnimations({ subtree: true })).length === 0 &&
      !document.getElementById('map').classList.contains('m-wait'));
    window.__trip.draw();
    var moving = own(svg.getAnimations({ subtree: true })), flights = svg.querySelectorAll('.m-fly[data-leg]');
    check('drawing: each line, arrow and pin moves, each flight under its mask', moving.length === svg.querySelectorAll('[data-leg]').length &&
      Array.prototype.every.call(flights, function (x) { return /^url\(#draw-\d+\)$/.test(x.getAttribute('mask')); }), moving.length + ' / ' + svg.querySelectorAll('[data-leg]').length);
    var last = svg.querySelector('.pin');
    check('drawing: a stay’s pin waits for its leg', !!last && getComputedStyle(last).opacity === '0');
    window.__trip.finishDraw();
    check('finished: no mask, the pin in place', !svg.querySelector('mask, [mask]') && getComputedStyle(last).opacity === '1' && own(svg.getAnimations({ subtree: true })).length === 0);
    // a script's change, as a probe makes: the new trip at once, nothing moving
    var days = S.route.days, set = JSON.parse(JSON.stringify(S.settings)), other = days > 12 ? days - 2 : days + 2;
    set.days = other;
    window.__trip.apply(set);
    check('a script’s change: the new figures at once, nothing moving', textOf('#facts li b') === String(other) && own(document.getAnimations()).length === 0, textOf('#facts li b'));
    // the visitor's change: the strip in a wave, the rest fading up, the figures counting from the last trip's
    document.getElementById('shape').scrollIntoView();
    window.__trip.byHand(true); set.days = days; window.__trip.apply(set); window.__trip.byHand(false);
    var cells = document.querySelectorAll('#strip .cell'), d0 = cells[0].getAnimations()[0], d1 = cells[cells.length - 1].getAnimations()[0];
    check('a visitor’s change: the squares of the strip in a wave', still ? !d0 : !!d0 && !!d1 && d1.effect.getTiming().delay > d0.effect.getTiming().delay);
    check('a visitor’s change: the days and the list fade up', still || (own(document.getElementById('stops').getAnimations()).length === 1 && own(document.getElementById('offroute-list').getAnimations()).length === 1));
    check('a visitor’s change: the figures count from the last trip’s', still || textOf('#facts li b') === String(other), textOf('#facts li b'));
    setTimeout(function () {
      check('… and end at the new ones', textOf('#facts li b') === String(days), textOf('#facts li b'));
      done();
    }, 1200);
  }
})();
