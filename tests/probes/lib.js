/* Shared by every probe: tests/probe.sh puts this file before the probe. check() logs one line per check, done() the
   last line; probe.sh prints the lines and fails when a check failed or done() never came (the probe stopped early).
   Chrome ignores history.replaceState after about 200 calls in 10 seconds, so a probe changes the trip at most ~50 times. */
var PROBE_FAILS = 0;
function check(name, cond, detail) {
  console.log('P:' + (cond ? 'ok   ' : 'FAIL ') + name + (!cond && detail != null ? ' (' + detail + ')' : ''));
  if (!cond) PROBE_FAILS++;
}
function done() { console.log('P:done, ' + (PROBE_FAILS ? PROBE_FAILS + ' failed' : 'all checks ok')); }
// the month k months after the page's today (default 5), so a probe never plans a term that has passed
function soon(k) {
  var t = window.__trip.today, y = +t.slice(0, 4), m = +t.slice(5, 7) + (k == null ? 5 : k);
  while (m > 12) { m -= 12; y++; }
  return { year: y, month: m };
}
// the text of an element, spaces folded; '' when there is none
function textOf(sel) { var e = document.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }
// a form control set as a visitor would: the value, then the change event the page listens to
function setField(name, value) {
  var f = document.getElementById('settings-form');
  f[name].value = value;
  f[name].dispatchEvent(new Event('change', { bubbles: true }));
}
check('the page is a full document (standards mode, no 8 px margin)', document.compatMode === 'CSS1Compat', document.compatMode);
