// The small map on a phone (the next round of fixes, fix 2, 16.10.2026), in the page's language: up to 900 px the strip is
// hidden at the top of the page and while the map is on the screen; with the map off the screen above the days it stands
// under the bar at the top with the map's panels side by side, no text in them; a stay brought to the middle of the screen
// under it lights its pin alone and frames its panel; a tap on a panel opens that panel alone across the screen, with its
// names, and a tap closes it; past the days the strip hides. From 901 px there is no strip.
// tests/probe.sh tests/probes/minimap.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// and at 641 and 901 px
setTimeout(function () {
  document.documentElement.style.scrollBehavior = 'auto';
  var box = document.getElementById('minimap'), narrow = innerWidth <= 900, map = document.querySelector('#map svg'), stops = document.getElementById('stops');
  function on() { return box.classList.contains('on'); }
  function to(y) { window.scrollTo(0, y); window.dispatchEvent(new Event('scroll')); }
  function top(el) { return el.getBoundingClientRect().top + window.scrollY; }
  // checkVisibility does not look at the ancestors of an SVG element
  function drawn(el) { for (var e = el; e && e.nodeType === 1; e = e.parentNode) if (getComputedStyle(e).display === 'none') return false; return true; }
  function lit() { return Array.prototype.map.call(box.querySelectorAll('.pin.on'), function (p) { return p.getAttribute('data-pin'); }); }
  to(0);
  check('at the top of the page the strip is hidden', !on());
  if (!narrow) {
    check('from 901 px there is no strip', getComputedStyle(box).display === 'none');
    return done();
  }
  to(top(map) + 100);
  check('with the map on the screen the strip is hidden', !on());
  var panels = box.querySelectorAll('.mini-panel'), groups = map.querySelectorAll('svg > g');
  check('a panel in the strip for every panel of the map', panels.length === groups.length && panels.length > 0, panels.length + ' / ' + groups.length);
  // a stay in the middle of the screen under the strip
  var all = Array.prototype.slice.call(stops.querySelectorAll('.stop')), s = all[Math.min(2, all.length - 1)], key = s.getAttribute('data-pin');
  to(top(s) - (46 + box.offsetHeight + innerHeight) / 2 + 60);
  setTimeout(function () {
    // (headless Chrome runs no transitions, so the boxes are read without the strip's slide: its top and the layout sizes)
    var cs = getComputedStyle(box);
    check('with the map above the screen and the days on it, the strip stands under the bar at the top', on() && cs.visibility === 'visible' && cs.position === 'fixed' && cs.top === '46px' &&
      map.getBoundingClientRect().bottom < 46, cs.top + ', ' + Math.round(map.getBoundingClientRect().bottom));
    var sizes = Array.prototype.map.call(panels, function (d) { return d.offsetWidth + 'x' + d.offsetHeight; });
    check('the panels side by side, at most 113 px wide, the strip under 140 px high', Array.prototype.every.call(panels, function (d) {
      return d.offsetWidth <= 113 && d.offsetTop === panels[0].offsetTop;
    }) && box.offsetHeight < 140, sizes.join(' ') + ', ' + box.offsetHeight);
    var texts = Array.prototype.filter.call(box.querySelectorAll('text'), drawn).length;
    check('no text in the strip', texts === 0, texts);
    check('the stay in the middle lights its pin alone', lit().length > 0 && lit().every(function (k) { return k === key; }), key + ': ' + lit().join(', '));
    var framed = Array.prototype.filter.call(panels, function (d) { return d.classList.contains('lit'); });
    check('its panel is framed, only the panels with its pin', framed.length > 0 && Array.prototype.every.call(panels, function (d, i) {
      return d.classList.contains('lit') === !!groups[i].querySelector('.pin[data-pin="' + key + '"]');
    }), framed.length);
    // a tap on the framed panel: that panel alone across the screen, with its names
    framed[0].click();
    setTimeout(function () {
      var zp = document.querySelectorAll('#mapzoom .mz-panel'), z = zp[0] && { x: parseFloat(zp[0].style.left), w: parseFloat(zp[0].style.width), tf: zp[0].style.transform };
      check('a tap on a panel opens it alone across the screen', !document.getElementById('mapzoom').hidden && zp.length === 1 && z.w >= innerWidth - 40 && z.x >= 0 && z.x + z.w <= innerWidth && z.tf === 'none',
        zp.length + ' ' + (z ? Math.round(z.x) + '..' + Math.round(z.x + z.w) + ' ' + z.tf : ''));
      check('the enlarged panel has its names', Array.prototype.some.call(zp[0].querySelectorAll('.m-label'), drawn));
      document.getElementById('mapzoom').click();
      setTimeout(function () {
        check('a tap closes it, the strip stays', document.getElementById('mapzoom').hidden && on());
        to(top(stops) + stops.offsetHeight - 100);
        check('past the days the strip hides', !on());
        to(top(s));
        check('back among the days it shows again', on());
        done();
      }, 900);
    }, 900);
  }, 600);
}, 1500);
