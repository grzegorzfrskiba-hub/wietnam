// The estimated costs (the first round of fixes, fix 2, 16.10.2026), in the page's language (L in lib.js): a link without
// koszty=1 shows no amount the page works out (the figure of the budget, the budget part, the amounts of what to book and
// their sentence, the plan for WhatsApp), and keeps the amounts of its sentences of facts (e-cigarettes); the row of
// figures has five, laid out tidily; „Przed wyjazdem” says the costs are hidden and offers „Pokaż szacowane koszty”,
// which shows them, ticks the box of the form and takes the focus to the budget part; the box shows and hides them; a
// change writes koszty=1 before lang=pl or takes it off, plans no new trip, moves no page and adds no entry to the
// history; a link with koszty=1 opens with the costs, one with another value without them and without the warning of a
// wrong link; the budget part is not printed while the costs are hidden.
// tests/probe.sh tests/probes/costs.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
// and at 641, 768, 901 and 1400 px
setTimeout(function () {
  var t = window.__trip, f = document.getElementById('settings-form'), plain = location.hash, base = plain.replace(/&lang=pl$/, '');
  var VND = /VND/;
  function rows() {
    // the figures by their rows, each row filling the width of the row of figures (the tiles touch both ends)
    var ul = document.getElementById('facts').getBoundingClientRect(), out = {}, ok = true;
    Array.prototype.forEach.call(document.querySelectorAll('#facts li'), function (li) {
      var r = li.getBoundingClientRect(), k = Math.round(r.top);
      (out[k] = out[k] || []).push(r);
    });
    Object.keys(out).forEach(function (k) {
      var row = out[k], left = Math.min.apply(null, row.map(function (r) { return r.left; })), right = Math.max.apply(null, row.map(function (r) { return r.right; }));
      if (Math.abs(left - ul.left) > 1 || Math.abs(right - ul.right) > 1) ok = false;
    });
    return { ok: ok, n: Object.keys(out).length };
  }
  function copied() {
    var got = null, box = document.getElementById('copy-fallback');
    try { navigator.clipboard.writeText = function (x) { got = x; return Promise.resolve(); }; } catch (e) { /* the box below */ }
    document.getElementById('copy-plan').click();
    return function () { return got !== null ? got : box.hidden ? '' : box.value; };
  }
  check('a link without koszty=1: no figure of the budget, five figures', !document.querySelector('#facts .f-budget') && document.querySelectorAll('#facts li').length === 5,
    document.querySelectorAll('#facts li').length);
  var lay = rows();
  check('the five figures fill their rows tidily at this width', lay.ok, lay.n + ' rows');
  check('no amount of the trip in the figures, the budget part or the bookings', !VND.test(textOf('#facts')) && !VND.test(textOf('#b-budget')) && !VND.test(textOf('#b-book')) &&
    !L({ en: /per person/, pl: /na osobę/ }).test(textOf('#b-book')), textOf('#b-book').slice(0, 120));
  check('the amounts of the sentences of facts stay (e-cigarettes)', VND.test(textOf('#b-know')));
  check('the budget part says the costs are hidden and offers to show them', textOf('#b-budget p') === L({ en: 'The estimated costs are hidden.', pl: 'Szacowane koszty są schowane.' }) &&
    textOf('#costs-show') === L({ en: 'Show estimated costs', pl: 'Pokaż szacowane koszty' }) && !document.querySelector('#b-budget details'), textOf('#b-budget'));
  check('the box of the form is not ticked', !f.costs.checked);
  var read = copied();
  setTimeout(function () {
    check('the plan for WhatsApp says no budget', !L({ en: /Budget per person/, pl: /Budżet na osobę/ }).test(read()) && !VND.test(read()), read().split('\n').slice(-3).join(' / '));
    var trip = t.state.route, hist = history.length, y = window.scrollY;
    var show = document.getElementById('costs-show');
    show.focus();
    show.click();
    check('„Pokaż szacowane koszty” shows them: the figure, the budget part, the amounts of the bookings', !!document.querySelector('#facts .f-budget') && !!document.querySelector('#b-budget details') &&
      L({ en: /per person/, pl: /na osobę/ }).test(textOf('#b-book')) && L({ en: /Amounts per person/, pl: /Kwoty na osobę/ }).test(textOf('#b-book .b-note')));
    check('and ticks the box of the form', f.costs.checked);
    check('the focus goes to the budget part', document.activeElement === document.querySelector('#b-budget summary'), document.activeElement && document.activeElement.tagName);
    check('the address gets koszty=1, before lang=pl', location.hash === base + '&koszty=1' + (LANG === 'pl' ? '&lang=pl' : ''), location.hash);
    check('the same trip, not planned again, no entry in the history, the page in its place', t.state.route === trip && history.length === hist && window.scrollY === y,
      history.length + ' / ' + hist + ', ' + window.scrollY + ' / ' + y);
    lay = rows();
    check('six figures fill their rows tidily at this width', lay.ok && document.querySelectorAll('#facts li').length === 6, lay.n + ' rows');
    check('„Wróć do trasy bez zmian” stays hidden: the costs are no change of the trip', document.getElementById('reset-changes').hidden);
    read = copied();
    setTimeout(function () {
      check('the plan for WhatsApp says the budget and links with koszty=1', L({ en: /Budget per person/, pl: /Budżet na osobę/ }).test(read()) && /&koszty=1(&lang=pl)?$/.test(read()), read().split('\n').slice(-2).join(' / '));
      // the box of the form hides them again, and shows them again
      f.costs.click();
      check('the box hides them: no figure, the address without koszty=1', !f.costs.checked && !document.querySelector('#facts .f-budget') && location.hash === plain && t.state.route === trip && history.length === hist, location.hash);
      f.costs.click();
      check('and shows them again', f.costs.checked && !!document.querySelector('#facts .f-budget') && /&koszty=1/.test(location.hash));
      check('with the costs shown the budget part is printed', !document.getElementById('b-budget').classList.contains('b-off'));
      f.costs.click();
      check('with the costs hidden the budget part is not printed', document.getElementById('b-budget').classList.contains('b-off'));
      // a link with koszty=1 opens with the costs; koszty with another value without them, and without the warning
      location.hash = base + '&koszty=1' + (LANG === 'pl' ? '&lang=pl' : '');
      setTimeout(function () {
        check('a link with koszty=1 opens with the costs shown', !!document.querySelector('#facts .f-budget') && f.costs.checked);
        location.hash = base + '&koszty=2' + (LANG === 'pl' ? '&lang=pl' : '');
        setTimeout(function () {
          check('koszty with another value: hidden, no warning of a wrong link', !document.querySelector('#facts .f-budget') && !f.costs.checked &&
            !L({ en: /Part of the link was wrong/, pl: /Część linku była błędna/ }).test(textOf('#alerts')) && location.hash === plain, location.hash);
          done();
        }, 400);
      }, 400);
    }, 300);
  }, 300);
}, 1500);
