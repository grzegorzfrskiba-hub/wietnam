/* The finishing touches on the page with the route (notes/plans/2026-10-20-wykonczenia-projekt.md), in both languages
   (&lang=pl at the end), at 390 and 1400 px, on a trip with Cao Bằng and on one without:
     bash tests/probe.sh tests/probes/polish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
   Headless Chrome calls an IntersectionObserver once, right after the page opens, and runs no CSS transition: the probe
   checks the final state, and the rules of the motion by setting the class live itself. The photos: every photo loaded late
   with its mean colour, unseen till it has loaded (finding 6); the slow zoom of the photo at the top (5); the typography (12). */
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
    done();
  }, 1500);
})();
