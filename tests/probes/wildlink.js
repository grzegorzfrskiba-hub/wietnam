/* The ways into the wildlife subpage on the page with the route (stage 6, finding 5): „Zwierzęta” under the title and, from
   641 px, in the bar at the top once the photo has scrolled away (both with ↗; over the photo outlined, in the bar filled, 22.10.2026), both to its tab On your route with this trip; „Zwierzęta tutaj →” under the tips of every
   stay of a place in the field guide (WILD_GUIDE_PLACES), to its section; none in print (the printout's own probe, pdf.js,
   and the number of pages stay as before). In both languages:
     bash tests/probe.sh tests/probes/wildlink.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=przyroda&poziom=2&lang=pl' */
(function () {
  var s = window.__trip.state, h = pageHash(s.settings, LANG, COSTS).slice(1);
  var want = SITE_URL + 'wildlife/#route&' + h;
  check('„Zwierzęta” under the title: the subpage with this trip', document.querySelector('#wild-hero').href === want, document.querySelector('#wild-hero').href);
  check('… on a phone too, outlined as „Zobacz trasę” (no filled jade)', document.querySelector('#wild-hero').checkVisibility() &&
    getComputedStyle(document.querySelector('#wild-hero')).backgroundColor === 'rgba(0, 0, 0, 0)' &&
    getComputedStyle(document.querySelector('#wild-hero')).borderTopStyle === 'solid');
  check('in the bar filled with the accent', getComputedStyle(document.querySelector('#wild-nav')).backgroundColor === getComputedStyle(document.querySelector('.sum-change')).color);
  check('„Zwierzęta” in the bar: the same address', document.querySelector('#wild-nav').href === want);
  check('„Zwierzęta” not in the bar while the photo at the top is on the screen', !document.querySelector('#wild-nav').checkVisibility());
  check('„Zwierzęta” in the language of the page', document.querySelector('#wild-hero > span').textContent === UI[LANG]['nav.wild']);
  var seen = {}, stays = s.route.stops.filter(function (x) { if (seen[x.id]) return false; seen[x.id] = true; return WILD_GUIDE_PLACES.indexOf(x.id) > -1; });
  var links = document.querySelectorAll('#stops .stop-wild a');
  check('„Zwierzęta tutaj →” at every stay of a place of the field guide', links.length === stays.length, links.length + ' / ' + stays.length);
  check('… to the place’s section, with the trip', Array.prototype.every.call(links, function (a, i) { return a.href === SITE_URL + 'wildlife/#guide-' + stays[i].id + '&' + h; }));
  check('no sideways scroll', document.documentElement.scrollWidth <= window.innerWidth);
  // the photo scrolled away (the observer takes class at-hero off the bar): the button in the bar, from 641 px. Headless
  // Chrome calls the observer after a scroll only now and then, so the probe takes the class off itself; the scrolling
  // both ways and the button coming in softly are checked by hand
  var bar = document.querySelector('#secnav');
  bar.classList.remove('at-hero');
  check('the photo gone: „Zwierzęta” in the bar, only from 641 px', document.querySelector('#wild-nav').checkVisibility() === (window.innerWidth >= 641));
  bar.classList.add('at-hero');
  done();
})();
