# -*- coding: utf-8 -*-
"""Makieta dużej mapy obok listy „Nie ma na twojej trasie” (następna runda poprawek, poprawka 1; sesja decyzji 16.10.2026).
Nie na stronę: odtwarza makietę obejrzaną i przyjętą przez użytkownika, na kopii źródeł, nigdy w tym repo.

    git archive HEAD | tar -x -C <kopia>; ln -s "$PWD/photos" <kopia>/photos
    sed -i '' 's/lat1: 8.3, width: 120 }/lat1: 8.3, width: 340 }/' <kopia>/site2/src/panels.js
    (cd <kopia> && python3 -I geo/make_basemap.py "$TMPDIR/natural-earth")   # zarys kraju pod 340 px
    python3 -I notes/makieta-mapa-listy.py <kopia> && (cd <kopia> && python3 site2/build.py)
    python3 -m http.server 8772 --bind 127.0.0.1 --directory <kopia>/site2/out/pages

Makieta nie ma jeszcze ustalenia 9 (po wyjściu kursora zapalona kropka otwartego wiersza) ani sond; patrz notes/etapy.md,
„Następna runda poprawek”."""
import sys
root = sys.argv[1]
t = open(root + '/site2/src/template.html', encoding='utf-8').read()
old = '''      <ul class="off-list" id="offroute-list"></ul>'''
new = '''      <div class="off-split"><ul class="off-list" id="offroute-list"></ul><div class="off-big" aria-hidden="true"><div class="mock-tag">Tylko w makiecie</div><div id="off-big"></div></div></div>'''
assert old in t; t = t.replace(old, new)
css = '''
/* MOCKUP: the big sticky map beside the list */
.off-split { display: block; width: 100%; }
.off-big { display: none; }
.mock-tag { font: 11px var(--mono); color: var(--muted); border: 1px dashed var(--border); border-radius: 6px; padding: 4px 8px; margin-bottom: 10px; display: inline-block; }
@media (min-width: 1101px) {
  .off-split { display: grid; grid-template-columns: minmax(0, 760px) minmax(0, 1fr); gap: 40px; align-items: start; }
  .off-big { display: block; position: sticky; top: calc(env(safe-area-inset-top, 0px) + 72px); }
  .off-big svg { display: block; width: 100%; max-width: 340px; height: auto; max-height: calc(100vh - 130px); overflow: visible; }
  .off-list .off-map { display: none; }
  .off-more { grid-template-columns: 220px minmax(0, 1fr); }
  .off-list li { transition: border-color .15s, box-shadow .15s; }
  .off-list li.hl { border-color: var(--ink); box-shadow: 0 0 0 1px var(--ink); }
}
.bm-land { fill: var(--land); stroke: var(--border); stroke-width: 1; stroke-linejoin: round; }
.bm-road { stroke: var(--ink); stroke-width: 1.6; stroke-linecap: round; fill: none; opacity: .75; }
.bm-fly { stroke: var(--ink); stroke-width: 1.3; stroke-dasharray: 4 4; fill: none; opacity: .75; }
.bm-stop { fill: var(--ink); }
.bm-pt { cursor: pointer; }
.bm-pt circle.d { fill: var(--c); stroke: var(--surface); stroke-width: 2; transition: r .2s; }
.bm-pt circle.halo { fill: var(--c); opacity: 0; transition: opacity .2s, r .2s; }
.bm-pt text { font: 600 14px var(--sans, "IBM Plex Sans"), sans-serif; fill: var(--ink); paint-order: stroke; stroke: var(--surface); stroke-width: 4px; stroke-linejoin: round; opacity: 0; transition: opacity .2s; pointer-events: none; }
.bm-pt.on circle.d { r: 9; }
.bm-pt.on circle.halo { opacity: .25; r: 20; animation: bm-pulse 1.6s ease-out infinite; }
.bm-pt.on text { opacity: 1; }
.off-big.any .bm-pt:not(.on) circle.d { opacity: .45; }
@keyframes bm-pulse { 0% { r: 9; opacity: .45; } 100% { r: 26; opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .bm-pt.on circle.halo { animation: none; } }
'''
i = t.find('</style>'); t = t[:i] + css + t[i:]
open(root + '/site2/src/template.html', 'w', encoding='utf-8').write(t)

a = open(root + '/site2/src/app.js', encoding='utf-8').read()
old = "    $('#reset-changes').hidden = !(s.add.length || s.remove.length);\n  }"
new = '''    $('#reset-changes').hidden = !(s.add.length || s.remove.length);
    renderBigMap();
  }
  /* MOCKUP: the big map beside the list */
  function renderBigMap() {
    var ids = Array.prototype.map.call(document.querySelectorAll('#offroute-list details'), function (d) { return d.getAttribute('data-fold').replace(/^off-/, ''); });
    if (!ids.length) { $('#off-big').innerHTML = ''; return; }
    var m0 = countryMap(state.route, ids[0], { frame: COUNTRY_MAP, content: VIEW, airports: AIRPORTS });
    var f = COUNTRY_MAP, sc = f.width / (f.lon1 - f.lon0);
    var stops = state.route.stops.map(function (x) { var p = VIEW[x.id] ? VIEW[x.id].pt : null; return p ? [(p[1] - f.lon0) * sc, (f.lat0 - p[0]) * sc] : null; }).filter(Boolean);
    var pts = ids.map(function (id) {
      var d = countryMap(state.route, id, { frame: COUNTRY_MAP, content: VIEW, airports: AIRPORTS }).dot, right = d.x < m0.w - 120;
      return '<g class="bm-pt" data-id="' + id + '" style="--c:' + stopColor(id) + '"><circle class="halo" cx="' + r1(d.x) + '" cy="' + r1(d.y) + '" r="9"/>' +
        '<circle class="d" cx="' + r1(d.x) + '" cy="' + r1(d.y) + '" r="6"/><text x="' + r1(d.x + (right ? 14 : -14)) + '" y="' + r1(d.y + 5) + '" text-anchor="' + (right ? 'start' : 'end') + '">' + esc(C(id).short) + '</text></g>';
    });
    $('#off-big').innerHTML = '<svg viewBox="0 0 ' + m0.w + ' ' + m0.h + '"><path class="bm-land" d="' + OUTLINE + '"/>' + m0.segs.map(function (g) {
      return g.mode === 'fly' ? '<path class="bm-fly" d="' + curve([g.x1, g.y1], [g.x2, g.y2]) + '"/>'
        : '<line class="bm-road" x1="' + r1(g.x1) + '" y1="' + r1(g.y1) + '" x2="' + r1(g.x2) + '" y2="' + r1(g.y2) + '"/>';
    }).join('') + stops.map(function (p) { return '<circle class="bm-stop" cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="3"/>'; }).join('') + pts.join('') + '</svg>';
  }
  function bigOn(id) {
    var big = document.querySelector('.off-big');
    Array.prototype.forEach.call(document.querySelectorAll('.bm-pt'), function (g) { g.classList.toggle('on', g.getAttribute('data-id') === id); });
    Array.prototype.forEach.call(document.querySelectorAll('#offroute-list > li'), function (li) { li.classList.toggle('hl', !!id && li.querySelector('details').getAttribute('data-fold') === 'off-' + id); });
    if (big) big.classList.toggle('any', !!id);
  }
  function bindBigMap() {
    function idOfRow(el) { var li = el.closest && el.closest('#offroute-list > li'); return li ? li.querySelector('details').getAttribute('data-fold').replace(/^off-/, '') : null; }
    document.addEventListener('mouseover', function (e) {
      var g = e.target.closest && e.target.closest('.bm-pt');
      if (g) return bigOn(g.getAttribute('data-id'));
      var id = idOfRow(e.target);
      if (id) return bigOn(id);
      if (e.target.closest && !e.target.closest('.off-split')) bigOn(null);
    });
    document.addEventListener('focusin', function (e) { var id = idOfRow(e.target); if (id) bigOn(id); });
    document.addEventListener('click', function (e) {
      var g = e.target.closest && e.target.closest('.bm-pt');
      if (!g) return;
      var d = document.querySelector('#offroute-list details[data-fold="off-' + g.getAttribute('data-id') + '"]');
      if (!d) return;
      d.open = true; d.parentNode.scrollIntoView({ block: 'center', behavior: 'smooth' }); bigOn(g.getAttribute('data-id'));
    });
  }'''
assert old in a; a = a.replace(old, new)
old2 = "  function bindChanges() {\n"
assert old2 in a; a = a.replace(old2, "  function bindChanges() {\n    bindBigMap();\n", 1)
open(root + '/site2/src/app.js', 'w', encoding='utf-8').write(a)
print('ok')
