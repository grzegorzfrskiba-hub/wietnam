// Links inside the page keep the settings in the address: a day in the strip, the menu.
// tests/probe.sh tests/probes/anchors.js 390 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2'
// The page scrolls smoothly (CSS scroll-behavior), which headless Chrome does not finish: the probe turns it off first.
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var before = location.hash;
  document.querySelector('#strip a.cell').click();
  document.querySelector('.secnav a[href="#days"]').click();
  setTimeout(function () {
    console.log('P:hash kept ' + (location.hash === before) + ' · scrolled ' + (window.scrollY > 0) + ' · map pins ' + document.querySelectorAll('#map .pin').length);
  }, 1500);
}, 1500);
