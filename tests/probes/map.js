// The map, measured as Chrome draws it: on a few crowded trips no label covers another label, a pin or an airport's box,
// and each stays inside its panel (page.js places them from estimated widths; this checks the real text); then the
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
      // a label: a stay's name with its days (the two lines as one box), or the text of a stub, a point of interest, a faint dot
      var labels = Array.prototype.map.call(g.querySelectorAll('.pin'), function (p) {
        var a = p.querySelector('.m-label').getBoundingClientRect(), b = p.querySelector('.m-sub').getBoundingClientRect();
        return { name: p.querySelector('.m-label').textContent, r: { left: Math.min(a.left, b.left), right: Math.max(a.right, b.right), top: a.top, bottom: b.bottom } };
      }).concat(Array.prototype.map.call(g.querySelectorAll('.m-lab'), function (e) { return { name: e.textContent, r: e.getBoundingClientRect() }; }));
      var marks = Array.prototype.map.call(g.querySelectorAll('.pin rect, .m-airport'), function (e) { return e.getBoundingClientRect(); });
      labels.forEach(function (l, i) {
        if (l.r.left < frame.left - 0.5 || l.r.right > frame.right + 0.5 || l.r.top < frame.top - 0.5 || l.r.bottom > frame.bottom + 0.5) bad.push(l.name + ' outside');
        labels.slice(i + 1).forEach(function (o) { if (inter(l.r, o.r) > 1) bad.push(l.name + ' / ' + o.name); });
        marks.forEach(function (m) { if (inter(l.r, m) > 1) bad.push(l.name + ' over a marker'); });
      });
    });
    check(x.from + '→' + x.to + ', ' + x.days + ' days, ' + (x.interests.join('+') || 'no interest') + ': no label covers another, a marker or the edge', !bad.length, bad.join('; '));
  });
  var hint = document.querySelector('.map-hint');
  hint.click();
  setTimeout(function () {
    var box = document.getElementById('mapzoom');
    check('the enlarged map opens with the three panels side by side', !box.hidden && box.querySelectorAll('.mz-panel').length === 3, box.querySelectorAll('.mz-panel').length);
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
