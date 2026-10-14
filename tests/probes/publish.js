// What the published page loads and says about itself: the fonts are its own files from the folder fonts/ next to it
// (no request to Google Fonts), the link preview and the robots tag of the public page (noindex while the first friends
// try it: NOINDEX in site2/build.py), and the sentence for a viewer without JavaScript (an iPhone's preview of a file).
// tests/probe.sh tests/probes/publish.js 1400 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
setTimeout(function () {
  var links = Array.prototype.map.call(document.querySelectorAll('link[href]'), function (l) { return l.href; });
  check('no link to Google Fonts', !links.some(function (h) { return /fonts\.(googleapis|gstatic)/.test(h); }), links.join(' '));
  var srcs = [];
  Array.prototype.forEach.call(document.styleSheets, function (s) { Array.prototype.forEach.call(s.cssRules, function (r) { if (r.type === 5) srcs.push(r.style.getPropertyValue('src')); }); });
  check('the 18 @font-face rules name files in the folder fonts/ next to the page', srcs.length === 18 && srcs.every(function (s) { return /fonts\/[a-z0-9-]+\.woff2/.test(s) && !/gstatic/.test(s); }), srcs.length + ': ' + srcs[0]);
  var loaded = {};
  document.fonts.forEach(function (f) { if (f.status === 'loaded') loaded[f.family.replace(/["']/g, '')] = true; });
  check('IBM Plex Sans, IBM Plex Mono and Newsreader are loaded', loaded['IBM Plex Sans'] && loaded['IBM Plex Mono'] && loaded.Newsreader, Object.keys(loaded).join(', '));
  var robots = document.querySelector('meta[name="robots"]');
  check('the public page asks search engines not to index it (noindex)', !!robots && robots.getAttribute('content') === 'noindex', robots && robots.outerHTML);
  check('the link preview names the public address', (document.querySelector('meta[property="og:url"]') || {}).content === 'https://grzegorzfrskiba-hub.github.io/wietnam/');
  var ns = document.querySelector('noscript');
  check('a viewer without JavaScript gets a sentence with the address', !!ns && /potrzebuje JavaScriptu/.test(ns.textContent) && /grzegorzfrskiba-hub\.github\.io\/wietnam\//.test(ns.textContent), ns && ns.textContent);
  done();
}, 1500);
