// What a settings link opens and what the copied plan links to.
// tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=2027-03&dni=12&co=kultura&poziom=3'
setTimeout(function () {
  var q = function (s) { var e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : '-'; };
  console.log('P:hash ' + location.hash);
  console.log('P:' + q('#facts-for') + ' · stays ' + document.querySelectorAll('#stops .stop:not(.stop-home)').length + ' · days in the strip ' + document.querySelectorAll('#strip .cell').length);
  console.log('P:alerts ' + q('#alerts') + ' · message ' + q('#settings-msg'));
  try { navigator.clipboard.writeText = function (t) { console.log('P:copied link line: ' + t.split('\n').pop()); return Promise.resolve(); }; } catch (e) { /* read the fallback box below */ }
  document.getElementById('copy-plan').click();
  setTimeout(function () { var b = document.getElementById('copy-fallback'); if (!b.hidden) console.log('P:copied link line: ' + b.value.split('\n').pop()); }, 300);
}, 1500);
