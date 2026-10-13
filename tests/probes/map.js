// The map, measured as Chrome draws it: on a few crowded trips no label covers another label, a pin, an airport's box, a
// degree's label or the panel's title, and each stays inside its panel (page.js places them from estimated widths; this checks the real text); then the
// enlarged map opens with the three panels side by side and closes again.
// tests/probe.sh tests/probes/map.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var t = window.__trip, at = soon();
  var trips = [
    { from: 'HAN', to: 'HAN', days: 30, interests: ['przyroda', 'gory'] },
    { from: 'SGN', to: 'HAN', days: 30, interests: ['kultura', 'jedzenie'] },
    { from: 'DAD', to: 'DAD', days: 18, interests: ['przyroda', 'gory'] },
    { from: 'SGN', to: 'SGN', days: 25, interests: [] },
    { from: 'HAN', to: 'DAD', days: 27, interests: [] },
    { from: 'DAD', to: 'SGN', days: 22, interests: ['morze'] }
  ];
  function inter(a, b) { return Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)); }
  trips.forEach(function (x) {
    t.apply({ from: x.from, to: x.to, year: at.year, month: at.month, days: x.days, interests: x.interests, level: 2, add: [], remove: [] });
    var bad = [], panels = document.querySelectorAll('#map svg > g');
    Array.prototype.forEach.call(panels, function (g) {
      var frame = g.querySelector('.m-edge').getBoundingClientRect();
      // a label: a stay's name with its days (the two lines as one box; in a tight spot the name alone), or the text of a stub,
      // a point of interest, a faint dot
      var labels = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) {
        var a = p.querySelector('.m-label').getBoundingClientRect(), sub = p.querySelector('.m-sub'), b = sub ? sub.getBoundingClientRect() : a;
        return { name: p.querySelector('.m-label').textContent, r: { left: Math.min(a.left, b.left), right: Math.max(a.right, b.right), top: a.top, bottom: b.bottom } };
      }).concat(Array.prototype.map.call(g.querySelectorAll('.m-lab'), function (e) { return { name: e.textContent, r: e.getBoundingClientRect() }; }));
      // what a label may not cover: a pin, an airport's box, a degree's label and the panel's title (page.js reserves its corner)
      var marks = Array.prototype.map.call(g.querySelectorAll('.pin rect, .m-airport, .m-gridlabel, .m-title'), function (e) { return e.getBoundingClientRect(); });
      labels.forEach(function (l, i) {
        if (l.r.left < frame.left - 0.5 || l.r.right > frame.right + 0.5 || l.r.top < frame.top - 0.5 || l.r.bottom > frame.bottom + 0.5) bad.push(l.name + ' outside');
        labels.slice(i + 1).forEach(function (o) { if (inter(l.r, o.r) > 1) bad.push(l.name + ' / ' + o.name); });
        marks.forEach(function (m) { if (inter(l.r, m) > 1) bad.push(l.name + ' over a marker, a degree or the title'); });
      });
    });
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker, a degree, the title or the edge', !bad.length, bad.join('; '));
    // no two pins overlap as Chrome draws them (pins that would overlap move apart: spreadPins in page.js)
    var touch = [];
    Array.prototype.forEach.call(panels, function (g) {
      var pins = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) { return { key: p.getAttribute('data-pin'), r: p.querySelector('rect').getBoundingClientRect() }; });
      pins.forEach(function (a, i) { pins.slice(i + 1).forEach(function (b) { if (inter(a.r, b.r) > 1) touch.push(a.key + ' / ' + b.key); }); });
    });
    check(x.from + '→' + x.to + ', ' + x.days + ' days: no two pins overlap', !touch.length, touch.join('; '));
  });
  var hint = document.querySelector('.map-hint');
  hint.click();
  setTimeout(function () {
    var box = document.getElementById('mapzoom');
    check('the enlarged map opens with the three panels side by side', !box.hidden && box.querySelectorAll('.mz-panel').length === 3, box.querySelectorAll('.mz-panel').length);
    // each copy keeps the clip paths of its three panels, under ids of its own, so no land shows outside a panel's frame
    var clipped = box.querySelectorAll('.mz-panel g[clip-path]'), ownIds = Array.prototype.every.call(clipped, function (g) {
      var id = /url\(#([^)]+)\)/.exec(g.getAttribute('clip-path'));
      return id && g.closest('.mz-panel').querySelector('clipPath[id="' + id[1] + '"]');
    });
    check('each copy in the enlarged map keeps the clip paths of its panels', clipped.length === 9 && ownIds, clipped.length + ' clipped groups');
    var p = box.querySelectorAll('.mz-panel');
    // the places they move to (headless Chrome does not run the move itself, so the boxes are read from their styles)
    var left = Array.prototype.map.call(p, function (d) { return parseFloat(d.style.left); });
    check('in one row, left to right', p.length === 3 && left[0] < left[1] && left[1] < left[2], left.join(', '));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    setTimeout(function () {
      check('Escape closes it', box.hidden);
      done();
    }, 700);
  }, 700);
}, 2500);
