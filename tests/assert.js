function eq(a, b, msg) {
  if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error((msg || 'eq') + ': got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b));
}
function ok(c, msg) { if (!c) throw new Error(msg || 'not ok'); }
