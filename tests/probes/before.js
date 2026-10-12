// The budget and "Przed wyjazdem", and the motorbike swaps: the budget figure leads to its part; the section has its four
// parts; „Samodzielnie” in the Cao Bằng card and in the card of the road over the Hải Vân pass writes the link, changes the
// days or the road's text and the budget, shows what it takes, keeps the trip, and leaves the focus on the choice; the plan
// for WhatsApp says the budget; the widest budget and every other figure fit their tiles; a term with Tết warns in both
// parts; on a phone a road's long text takes the width of its card, with its time under it.
// tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
// and at 641 and 768 px (a tablet in portrait: the budget on a row of its own), at 901 px, the narrowest screen with the
// facts in one row, and at 1400 px
setTimeout(function () {
  var t = window.__trip;
  function ids() { return t.state.route.stops.map(function (s) { return s.id; }).join(','); }
  var fig = document.querySelector('#facts .f-budget a');
  check('the budget is the last figure of the facts, a link to „Przed wyjazdem”', fig && fig.getAttribute('href') === '#before' && /zł/.test(fig.textContent), fig && fig.textContent);
  var parts = Array.prototype.map.call(document.querySelectorAll('#before .b-part h3'), function (h) { return h.textContent.replace(/\s+/g, ' '); });
  check('„Przed wyjazdem” has its four parts', parts.join(' | ') === 'Budżet | Zarezerwuj wcześniej | Wjazd i zdrowie | Co spakować', parts.join(' | '));
  check('the figure and the budget part say the same amount', textOf('#b-budget .b-sum b') === textOf('#facts .f-budget b'), textOf('#b-budget .b-sum b'));
  check('the list of what to book has its items, each with a sentence', document.querySelectorAll('#b-book .b-book li').length > 0);
  // Cao Bằng ridden yourself
  var before = ids(), money = fig.querySelector('b').textContent, self = document.querySelector('input[name="swap-caobang"][value="self"]');
  check('the Cao Bằng card offers „Z kierowcą” and „Samodzielnie”, with the legal condition', self && /A1, A2 albo A/.test(textOf('#stops .swap[data-swap="caobang"] .swap-note')));
  self.click();
  setTimeout(function () {
    var card = document.querySelector('#stops .swap[data-swap="caobang"]').closest('.stop');
    check('„Samodzielnie” writes motocykl=caobang into the link', /motocykl=caobang/.test(location.hash), location.hash);
    check('and the trip stays the same', ids() === before, ids());
    check('the days of the loop ride the motorbike', Array.prototype.some.call(card.querySelectorAll('.day h4'), function (h) { return /motocyklem/.test(h.textContent); }));
    check('what it takes, the risk and the advice show', !!card.querySelector('.swap-box') && /starostwo/.test(card.querySelector('.swap-box').textContent));
    check('the budget follows', document.querySelector('#facts .f-budget b').textContent !== money, money + ' → ' + document.querySelector('#facts .f-budget b').textContent);
    check('the focus stays on the choice', document.activeElement && document.activeElement.name === 'swap-caobang' && document.activeElement.value === 'self');
    check('„Przed wyjazdem” books the motorbike', /Motocykl na pętlę Cao Bằng/.test(textOf('#b-book')));
    document.querySelector('input[name="swap-caobang"][value="driver"]').click();
    setTimeout(function () {
      check('„Z kierowcą” takes it back: no swap in the link, no box', !/motocykl=/.test(location.hash) && !document.querySelector('#stops .swap-box'), location.hash);
      // the road over the Hải Vân pass, on a trip from Hồ Chí Minh City to Hà Nội: a new link, so the form follows (a swap
      // builds on the form, as Dodaj does)
      var at = soon();
      location.hash = '#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2';
      setTimeout(function () {
      var road = document.querySelector('input[name="swap-haivan"][value="self"]');
      check('the card of the road between Hội An and Huế offers the swap', !!road && !!road.closest('.leg'));
      if (!road) { done(); return; }
      road.click();
      setTimeout(function () {
        var leg = document.querySelector('input[name="swap-haivan"]').closest('.leg');
        check('the road is ridden yourself: its text says so, the link too', /Motocykl wypożyczony w jedną stronę/.test(leg.textContent.replace(/\s+/g, ' ')) && /motocykl=haivan/.test(location.hash), location.hash);
        // on a phone (640 px or less) the road's text takes the width of the card and its time stands under it (template.html)
        var seg = leg.querySelector('.leg-segs li'), segW = seg.getBoundingClientRect().width, txt = seg.children[1].getBoundingClientRect(), time = seg.children[2].getBoundingClientRect();
        if (window.innerWidth <= 640) check('on a phone the road text takes the width of the card, its time under it', txt.width >= segW - 30 && time.top >= txt.bottom - 1,
          Math.round(txt.width) + ' of ' + Math.round(segW) + ', the time at ' + Math.round(time.top) + ', the text ends at ' + Math.round(txt.bottom));
        document.getElementById('copy-plan').click();
        setTimeout(function () {
          var box = document.getElementById('copy-fallback');
          check('the plan for WhatsApp says the budget', box.hidden || /Budżet na osobę/.test(box.value), box.value.split('\n').slice(-3).join(' / '));
          // the widest budget of all the settings (30 days from and to Hồ Chí Minh City, nature, November 2027): it fits its figure
          location.hash = '#od=SGN&do=SGN&miesiac=2027-11&dni=30&co=przyroda&poziom=2';
          setTimeout(function () {
            var b = document.querySelector('#facts .f-budget b'), li = document.querySelector('#facts .f-budget');
            check('the widest budget fits its figure: ' + textOf('#facts .f-budget b'), b.getBoundingClientRect().right <= document.getElementById('facts').getBoundingClientRect().right + 0.5 &&
              b.scrollWidth <= Math.ceil(li.getBoundingClientRect().width) + 1, Math.round(b.getBoundingClientRect().right) + ', ' + b.scrollWidth + ' of ' + Math.round(li.getBoundingClientRect().width));
            // and every figure of the facts fits its tile (its box less its padding); here the longest day is 9 godz.
            var tight = Array.prototype.filter.call(document.querySelectorAll('#facts li'), function (x) {
              var fb = x.querySelector('b'), cs = getComputedStyle(x);
              return fb && fb.scrollWidth > x.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) + 1;
            }).map(function (x) { return x.querySelector('b').textContent; });
            check('every figure of the facts fits its tile', !tight.length, tight.join(' | '));
            // a term with Tết (January 2028): the budget says prices go up, the list of what to book says how far ahead
            location.hash = '#od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2';
            setTimeout(function () {
              check('Tết: the budget warns that prices go up', /Tết/.test(textOf('#b-budget .b-warn')), textOf('#b-budget .b-warn'));
              check('Tết: the list of what to book says how far ahead', /Tết/.test(textOf('#b-book .b-warn')), textOf('#b-book .b-warn'));
              done();
            }, 500);
          }, 500);
        }, 300);
      }, 400);
      }, 500);
    }, 400);
  }, 400);
}, 1500);
