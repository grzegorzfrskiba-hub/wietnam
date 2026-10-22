/* The ways into the atlas of places on the page with the route (stage 7, finding 19): „Atlas ↗” under the title right after
   „Zwierzęta”, outlined as it (the user's choice of 22.10.2026), on a phone too, beside „Zwierzęta” (the user's choice after
   the phone check of 22.10.2026; at 320 px in Polish it takes a third row), to the atlas with this trip; in the bar at the top from 1101 px, where it fits beside the
   other links and the summary, once the photo at the top has gone, as „Zwierzęta”, filled blue beside its jade; „W atlasie →” beside „Zwierzęta tutaj →” at the first
   stay of every place and in every row of the list „Nie ma na twojej trasie”, to the place's card; none in print. In both
   languages (the Polish page ties „W” to its next word with a no-break space, \s in a check takes it):
     bash tests/probe.sh tests/probes/atlaslink.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=przyroda&poziom=2&lang=pl' */
(function () {
  var s = window.__trip.state, h = pageHash(s.settings, LANG, COSTS).slice(1), want = SITE_URL + 'atlas/#' + h;
  var $ = function (sel) { return document.querySelector(sel); }, phone = innerWidth <= 640;
  var hero = $('#atlas-hero'), hs = getComputedStyle(hero);
  check('„Atlas” under the title: the atlas with this trip, right after „Zwierzęta”, outlined, not filled', hero.href === want && hero.previousElementSibling === $('#wild-hero') &&
    hero.checkVisibility() && hs.backgroundColor === 'rgba(0, 0, 0, 0)' && parseFloat(hs.borderTopWidth) >= 1, hero.href + ' ' + hs.backgroundColor);
  var hr = hero.getBoundingClientRect(), wr = $('#wild-hero').getBoundingClientRect();
  check('… on a phone too, beside „Zwierzęta” where the row has room, a 44 px target, none in the photo’s corner', !$('#atlas-top') && hr.height >= 44 &&
    (innerWidth < 360 || Math.abs(hr.top - wr.top) < 2 && hr.left > wr.right), Math.round(hr.left) + ',' + Math.round(hr.top) + ' / ' + Math.round(wr.right) + ',' + Math.round(wr.top));
  // in the bar not while the photo at the top is on the screen (class at-hero, as „Zwierzęta”); once it has gone (the probe takes
  // the class off itself, as headless Chrome calls the observer after a scroll only now and then), from 1101 px
  var nav = $('#secnav'), links = nav.querySelector('.secnav-links'), away = nav.classList.contains('away');
  check('„Atlas” in the bar: the same address, not while the photo at the top is on the screen', $('#atlas-nav').href === want && !$('#atlas-nav').checkVisibility());
  nav.classList.remove('at-hero');
  check('… once the photo has gone, in the bar from 1101 px, filled blue', $('#atlas-nav').checkVisibility() === (innerWidth >= 1101) &&
    getComputedStyle($('#atlas-nav')).backgroundColor === getComputedStyle(document.documentElement).getPropertyValue('--cool').trim().replace(/^#(..)(..)(..)$/, function (m, r, g, b) { return 'rgb(' + parseInt(r, 16) + ', ' + parseInt(g, 16) + ', ' + parseInt(b, 16) + ')'; }),
    getComputedStyle($('#atlas-nav')).backgroundColor);
  // the bar with its summary, as once the form is above the screen: from 1101 px every link in sight, none to scroll to
  nav.classList.add('away');
  if (innerWidth >= 1101) check('the bar from 1101 px: every link beside the summary, none to scroll to', links.scrollWidth <= links.clientWidth, links.scrollWidth + ' > ' + links.clientWidth);
  nav.classList.toggle('away', away);
  nav.classList.add('at-hero');
  check('„Atlas” in the language of the page', ['#atlas-hero', '#atlas-nav'].every(function (s) { return $(s + ' > span').textContent === UI[LANG]['nav.atlas']; }));
  // „W atlasie →”: at the first stay of every place (not a night on the way), beside „Zwierzęta tutaj →”
  var seen = {}, stays = s.route.stops.filter(function (x) { if (seen[x.id] || PLACES[x.id].node) return false; seen[x.id] = true; return true; });
  var links2 = document.querySelectorAll('#stops .stop-atlas a');
  check('„W atlasie →” at the first stay of every place', links2.length === stays.length, links2.length + ' / ' + stays.length);
  check('… to the place’s card, with the trip, in the language of the page', Array.prototype.every.call(links2, function (a, i) {
    return a.href === SITE_URL + 'atlas/#' + stays[i].id + '&' + h && a.textContent.replace(/\s+/g, ' ') === UI[LANG]['stop.atlas'];
  }));
  check('… beside „Zwierzęta tutaj →” where the place has it', Array.prototype.every.call(document.querySelectorAll('#stops .stop-wild'), function (p) {
    return p.parentNode.classList.contains('stop-links') && p.nextElementSibling && p.nextElementSibling.classList.contains('stop-atlas');
  }));
  // in every row of the list of the places off the trip, opened
  var rows = document.querySelectorAll('#offroute-list details');
  check('„W atlasie →” in every row of the places off the trip, to its card', rows.length > 0 && Array.prototype.every.call(rows, function (d) {
    var a = d.querySelector('.off-atlas'), id = d.getAttribute('data-fold').slice(4);
    return !!a && a.href === SITE_URL + 'atlas/#' + id + '&' + h && a.textContent.replace(/\s+/g, ' ') === UI[LANG]['stop.atlas'];
  }), rows.length);
  rows[0].open = true;
  var oa = rows[0].querySelector('.off-atlas').getBoundingClientRect();
  check('… a 44 px target in an open row', oa.height >= 44 && oa.right <= document.documentElement.clientWidth - 60, Math.round(oa.height) + ', ' + Math.round(oa.right));
  rows[0].open = false;
  // none in print
  var printCss = [];
  Array.prototype.forEach.call(document.styleSheets, function (x) {
    Array.prototype.forEach.call(x.cssRules, function (r) { if (r.media && /print/.test(r.media.mediaText)) Array.prototype.forEach.call(r.cssRules, function (y) { printCss.push(y.cssText); }); });
  });
  var ps = document.createElement('style'); ps.textContent = printCss.join('\n'); document.head.appendChild(ps);
  check('none in print', !Array.prototype.some.call(document.querySelectorAll('#atlas-hero, #atlas-nav, .stop-atlas a, .off-atlas'), function (a) { return a.checkVisibility(); }));
  ps.remove();
  check('no sideways scroll', document.documentElement.scrollWidth <= innerWidth);
  done();
})();
