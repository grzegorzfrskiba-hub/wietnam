// Links inside the page keep the settings in the address: a day in the strip, the menu, back to the top.
// tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// The page scrolls smoothly (CSS scroll-behavior), which headless Chrome does not finish: the probe turns it off first.
// Headless Chrome under a time budget fires no scroll events and no IntersectionObserver calls after the first one, so
// what those show (the back-to-top button, the summary in the bar) is checked by hand in a browser, not here.
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var before = location.hash;
  document.querySelector('#strip a.cell').click();
  check('a day in the strip scrolls and keeps the address', window.scrollY > 0 && location.hash === before, window.scrollY + ' ' + location.hash);
  document.querySelector('.secnav a[href="#days"]').click();
  check('the menu link keeps the address', location.hash === before, location.hash);
  check('the map has its pins', document.querySelectorAll('#map .pin').length > 1);
  document.getElementById('totop').click();
  check('back to the top: scrolled up, the address kept', window.scrollY === 0 && location.hash === before, window.scrollY + ' ' + location.hash);
  done();
}, 1500);
