// „Zapisz trasę jako PDF” and the printout: the button stands right after „Kopiuj plan na WhatsApp”, with its hint, and a
// tap opens the print dialog (window.print, stubbed here); the printout gets the three panels of the map apart, each a
// copy with its own ids and a viewBox around its panel, the legend, and the link to this route on the public page; on the
// screen these parts stay hidden.
// tests/probe.sh tests/probes/pdf.js 1400 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=gory,kultura&poziom=2'
setTimeout(function () {
  var btn = document.getElementById('pdf-plan'), printed = 0;
  check('the button „Zapisz trasę jako PDF” stands right after „Kopiuj plan na WhatsApp”', !!btn && btn.textContent === L({ en: 'Save route as PDF', pl: 'Zapisz trasę jako PDF' }) &&
    !!btn.previousElementSibling && btn.previousElementSibling.id === 'copy-plan', btn && btn.textContent);
  check('its hint says where to tap on an iPhone and on Android', L({ en: /Save to Files/, pl: /Zachowaj w Plikach/ }).test(textOf('.pdf-hint')) &&
    L({ en: /Save as PDF/, pl: /Zapisz jako PDF/ }).test(textOf('.pdf-hint')), textOf('.pdf-hint'));
  window.print = function () { printed++; };
  btn.click();
  check('a tap opens the print dialog', printed === 1, printed);
  var panels = document.querySelectorAll('#map-print .mp-panel svg'), boxes = Array.prototype.map.call(panels, function (s) { return s.getAttribute('viewBox'); });
  check('the printout has the three panels of the map, each with its own viewBox', panels.length === 3 && boxes[0] !== boxes[1] && boxes[1] !== boxes[2], boxes.join(' | '));
  var seen = {}, twice = Array.prototype.map.call(document.querySelectorAll('[id]'), function (e) { return e.id; })
    .filter(function (id) { if (seen[id]) return true; seen[id] = true; return false; });
  check('no id twice on the page (the copies of the map have their own)', twice.length === 0, twice.slice(0, 5).join(', '));
  check('the printout has the legend of the map', L({ en: /Road/, pl: /Droga/ }).test(textOf('#map-print .mp-legend')), textOf('#map-print .mp-legend'));
  var link = document.querySelector('#print-link a');
  // in the page's language: in Polish the link ends with lang=pl, as the address does
  check('the printout links to this route on the public page', !!link && link.getAttribute('href') === 'https://grzegorzfrskiba-hub.github.io/wietnam/' + location.hash &&
    textOf('#print-link').indexOf(L({ en: 'This plan on the site: ', pl: 'Ten plan na stronie: ' })) === 0 && /&lang=pl$/.test(location.hash) === (LANG === 'pl'), link && link.getAttribute('href'));
  check('on the screen the parts of the printout stay hidden', getComputedStyle(document.getElementById('map-print')).display === 'none' &&
    getComputedStyle(document.getElementById('print-link')).display === 'none');
  done();
}, 1500);
