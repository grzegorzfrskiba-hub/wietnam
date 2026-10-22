// Links inside the page keep the settings in the address: a day in the strip, the menu, back to the top.
// tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// The page scrolls smoothly (CSS scroll-behavior), which headless Chrome does not finish: the probe turns it off first.
// Headless Chrome under a time budget fires no scroll events and no IntersectionObserver calls after the first one, so
// what those show (the back-to-top button, the summary in the bar) is checked by hand in a browser, not here.
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var before = location.hash;
  var cell = document.querySelector('#strip a.cell'), day = document.getElementById(cell.getAttribute('href').slice(1));
  cell.click();
  check('a day in the strip scrolls, opens its day and keeps the address', window.scrollY > 0 && day.querySelector('details').open && location.hash === before, window.scrollY + ' ' + location.hash);
  document.querySelector('.secnav a[href="#days"]').click();
  check('the menu link keeps the address', location.hash === before, location.hash);
  check('the map has its pins', document.querySelectorAll('#map .pin').length > 1);
  // a day in the link before the settings (✓ in the atlas, finding D9 of its final review): that day open at the top,
  // the address back to the settings alone
  window.scrollTo(0, 0);
  history.replaceState(null, '', '#day-3&' + before.slice(1)); window.dispatchEvent(new HashChangeEvent('hashchange'));
  var d3 = document.getElementById('day-3');
  check('a link with a day: that day open at the top, the address as before', !!d3 && d3.querySelector('details').open && Math.abs(d3.getBoundingClientRect().top - (parseFloat(getComputedStyle(d3).scrollMarginTop) || 0) - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)) < 30 &&
    location.hash === before, (d3 ? Math.round(d3.getBoundingClientRect().top) : 'no day') + ' ' + location.hash);
  document.getElementById('totop').click();
  check('back to the top: scrolled up, the address kept', window.scrollY === 0 && location.hash === before, window.scrollY + ' ' + location.hash);
  done();
}, 1500);
