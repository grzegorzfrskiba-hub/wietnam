// What a settings link opens and what the copied plan links to.
// tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3'
setTimeout(function () {
  var asked = window.__probeHash;
  check('the address keeps the settings of the link', location.hash === asked, location.hash + ' vs ' + asked);
  check('the facts name both airports', /Hà Nội/.test(textOf('#facts-for')) && /Đà Nẵng/.test(textOf('#facts-for')), textOf('#facts-for'));
  var stays = document.querySelectorAll('#stops .stop:not(.stop-home)').length, cells = document.querySelectorAll('#strip .cell').length;
  check('stays shown', stays > 1, stays);
  check('one cell per day in the strip', cells === 12, cells);
  check('no message under the settings', textOf('#settings-msg') === '', textOf('#settings-msg'));
  var copied = null;
  try { navigator.clipboard.writeText = function (t) { copied = t; return Promise.resolve(); }; } catch (e) { /* the fallback box below */ }
  document.getElementById('copy-plan').click();
  setTimeout(function () {
    var b = document.getElementById('copy-fallback');
    if (copied === null && !b.hidden) copied = b.value;
    var line = (copied || '').split('\n').pop();
    // in the page's language: in Polish the link of the link ends with lang=pl (the asked link has it)
    check('the copied plan ends with a link to the public page with these settings', line === L({ en: 'This plan on the site: ', pl: 'Ten plan na stronie: ' }) + SITE_URL + asked, line);
    done();
  }, 300);
}, 1500);
