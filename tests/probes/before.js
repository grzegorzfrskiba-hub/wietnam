// The budget and "Przed wyjazdem", and the motorbike swaps, in the page's language (L in lib.js): the budget figure leads to its part; the section has its four
// parts; „Samodzielnie” in the Cao Bằng card and in the card of the road over the Hải Vân pass writes the link, changes the
// days or the road's text and the budget, shows what it takes, keeps the trip, and leaves the focus on the choice; the plan
// for WhatsApp says the budget; the widest budget and every other figure fit their tiles; a term with Tết warns in both
// parts; ends that round to one number say it once; on a phone a road's long text takes the width of its card, with its
// time under it; a swap on a form that gives no trip goes back and says why next to it.
// tests/probe.sh tests/probes/before.js 390 'od=HAN&do=HAN&miesiac=MIESIAC&dni=14&co=przyroda,gory&poziom=2&dodaj=caobang'
// and at 641 and 768 px (a tablet in portrait: the budget on a row of its own), at 901 px, the narrowest screen with the
// facts in one row, and at 1400 px
setTimeout(function () {
  var t = window.__trip;
  function ids() { return t.state.route.stops.map(function (s) { return s.id; }).join(','); }
  var fig = document.querySelector('#facts .f-budget a');
  check('the budget is the last figure of the facts, a link to „Przed wyjazdem”, in millions of dong', fig && fig.getAttribute('href') === '#before' && L({ en: /^\d+(–\u2060?\d+)?M VND/, pl: /^\d+(–\u2060?\d+)? mln VND/ }).test(fig.textContent.replace(/\s+/g, ' ')), fig && fig.textContent);
  var parts = Array.prototype.map.call(document.querySelectorAll('#before .b-part h3'), function (h) { return h.textContent.replace(/\s+/g, ' '); });
  check('„Przed wyjazdem” has its four parts', parts.join(' | ') === L({ en: 'Budget | Book ahead | Good to know | What to pack', pl: 'Budżet | Zarezerwuj wcześniej | Warto wiedzieć | Co spakować' }), parts.join(' | '));
  check('the figure and the budget part say the same amount', textOf('#b-budget .b-sum b') === textOf('#facts .f-budget b'), textOf('#b-budget .b-sum b'));
  check('the list of what to book has its items, each with a sentence', document.querySelectorAll('#b-book .b-book li').length > 0);
  check('the note under the budget names the month of the prices (costs.js) and no rate',
    textOf('#b-budget .b-note') === L({ en: 'Without flights to Vietnam, insurance and souvenirs. Prices checked in October 2026.',
      pl: 'Bez lotów do Wietnamu, ubezpieczenia i pamiątek. Ceny sprawdzone w październiku 2026.' }), textOf('#b-budget .b-note'));
  // Cao Bằng ridden yourself
  // the budget before the swap, in euros: on a short loop the motorbike saves less than the million the amount is rounded to
  var before = ids(), money = JSON.stringify(t.state.budget.two), self = document.querySelector('.swap[data-swap="caobang"] input[value="self"]');
  check('the Cao Bằng card offers „Z kierowcą” and „Samodzielnie”, with the legal condition', self && L({ en: /1968 Convention/, pl: /konwencji z 1968 r\./ }).test(textOf('#stops .swap[data-swap="caobang"] .swap-note')));
  self.click();
  setTimeout(function () {
    var card = document.querySelector('#stops .swap[data-swap="caobang"]').closest('.stop');
    check('„Samodzielnie” writes motocykl=caobang into the link', /motocykl=caobang/.test(location.hash), location.hash);
    check('and the trip stays the same', ids() === before, ids());
    check('the days of the loop ride the motorbike', Array.prototype.some.call(card.querySelectorAll('.day h4'), function (h) { return L({ en: /by motorbike/, pl: /motocyklem/ }).test(h.textContent); }));
    check('what it takes, the risk and the advice show', !!card.querySelector('.swap-box') && L({ en: /registration papers/, pl: /dowód rejestracyjny/ }).test(card.querySelector('.swap-box').textContent) &&
      /WHO/.test(card.querySelector('.swap-box').textContent) && L({ en: /deposit/, pl: /zastaw/ }).test(card.querySelector('.swap-box').textContent));
    check('the budget follows, and the figure and the budget part still say the same amount', JSON.stringify(t.state.budget.two) !== money &&
      textOf('#b-budget .b-sum b') === textOf('#facts .f-budget b'), money + ' → ' + JSON.stringify(t.state.budget.two) + ', ' + textOf('#facts .f-budget b'));
    check('the focus stays on the choice', document.activeElement && /^swap-caobang-\d+$/.test(document.activeElement.name) && document.activeElement.value === 'self',
      document.activeElement && document.activeElement.name);
    check('„Przed wyjazdem” books the motorbike', L({ en: /A motorbike for the Cao Bằng loop/, pl: /Motocykl na pętlę Cao Bằng/ }).test(textOf('#b-book')));
    document.querySelector('.swap[data-swap="caobang"] input[value="driver"]').click();
    setTimeout(function () {
      check('„Z kierowcą” takes it back: no swap in the link, no box', !/motocykl=/.test(location.hash) && !document.querySelector('#stops .swap-box'), location.hash);
      // the road over the Hải Vân pass, on a trip from Hồ Chí Minh City to Hà Nội: a new link, so the form follows (a swap
      // builds on the form, as Dodaj does)
      var at = soon();
      goTo('#od=SGN&do=HAN&miesiac=' + at.year + '-' + (at.month < 10 ? '0' : '') + at.month + '&dni=15&co=&poziom=2');
      setTimeout(function () {
      var road = document.querySelector('.swap[data-swap="haivan"] input[value="self"]');
      // each card's swap is a radio group of its own: the day of the card is in its name
      var names = Array.prototype.map.call(document.querySelectorAll('.swap'), function (b) { return b.querySelector('input').name; });
      check('each swap in a card is a radio group of its own', names.every(function (n, i) { return /^swap-[a-z]+-\d+$/.test(n) && names.indexOf(n) === i; }), names.join(', '));
      check('the card of the road between Hội An and Huế offers the swap', !!road && !!road.closest('.leg'));
      if (!road) { done(); return; }
      road.click();
      setTimeout(function () {
        var leg = document.querySelector('.swap[data-swap="haivan"]').closest('.leg');
        check('the road is ridden yourself: its text says so, the link too', L({ en: /Motorbike rented one way/, pl: /Motocykl wypożyczony w jedną stronę/ }).test(leg.textContent.replace(/\s+/g, ' ')) && /motocykl=haivan/.test(location.hash), location.hash);
        // on a phone (640 px or less) the road's text takes the width of the card and its time stands under it (template.html)
        var seg = leg.querySelector('.leg-segs li'), segW = seg.getBoundingClientRect().width, txt = seg.children[1].getBoundingClientRect(), time = seg.children[2].getBoundingClientRect();
        if (window.innerWidth <= 640) check('on a phone the road text takes the width of the card, its time under it', txt.width >= segW - 30 && time.top >= txt.bottom - 1,
          Math.round(txt.width) + ' of ' + Math.round(segW) + ', the time at ' + Math.round(time.top) + ', the text ends at ' + Math.round(txt.bottom));
        document.getElementById('copy-plan').click();
        setTimeout(function () {
          var box = document.getElementById('copy-fallback');
          check('the plan for WhatsApp says the budget', box.hidden || L({ en: /Budget per person/, pl: /Budżet na osobę/ }).test(box.value), box.value.split('\n').slice(-3).join(' / '));
          // the widest budget: an amount of the longest form, dd–ddd mln VND (the digits of the display font are of one width, so
          // each such amount is as wide as the highest); here the highest, 57–114 mln VND, 30 days from and to Đà Nẵng, mountains and
          // sea, „Ekstremalnie”, April 2027: it fits its figure
          goTo('#od=DAD&do=DAD&miesiac=2027-04&dni=30&co=gory,morze&poziom=3');
          setTimeout(function () {
            var b = document.querySelector('#facts .f-budget b'), li = document.querySelector('#facts .f-budget');
            check('the widest budget fits its figure: ' + textOf('#facts .f-budget b'), b.getBoundingClientRect().right <= document.getElementById('facts').getBoundingClientRect().right + 0.5 &&
              b.scrollWidth <= Math.ceil(li.getBoundingClientRect().width) + 1, Math.round(b.getBoundingClientRect().right) + ', ' + b.scrollWidth + ' of ' + Math.round(li.getBoundingClientRect().width));
            // and every figure of the facts fits its tile (its box less its padding), the longest day with its unit too
            var tight = Array.prototype.filter.call(document.querySelectorAll('#facts li'), function (x) {
              var fb = x.querySelector('b'), cs = getComputedStyle(x);
              return fb && fb.scrollWidth > x.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) + 1;
            }).map(function (x) { return x.querySelector('b').textContent; });
            check('every figure of the facts fits its tile', !tight.length, tight.join(' | '));
            // a term with Tết (January 2028): the budget says prices go up, the list of what to book says how far ahead
            goTo('#od=SGN&do=HAN&miesiac=2028-01&dni=15&co=&poziom=2');
            setTimeout(function () {
              check('Tết: the budget warns that prices go up', /Tết/.test(textOf('#b-budget .b-warn')), textOf('#b-budget .b-warn'));
              check('Tết: the list of what to book says how far ahead', /Tết/.test(textOf('#b-book .b-warn')), textOf('#b-book .b-warn'));
              // ends that round to the same amount say it once: 210 000 VND, never 210 000–210 000 VND (Đà Nẵng, 5 days: the Imperial
              // City in Huế)
              goTo('#od=DAD&do=DAD&miesiac=2027-01&dni=5&co=&poziom=2');
              setTimeout(function () {
                var same = (textOf('#facts') + ' ' + textOf('#before')).match(L({ en: /(?<![\d,.])(\d(?:[\d,.]*\d)?)–\u2060?\1M? VND/, pl: /(?<![\d,])(\d(?:[\d ,]*\d)?)–\u2060?\1 (mln )?VND/ }));
                check('no amount has the same number at both ends', !same, same && same[0]);
                // a thing that may cost nothing (the flight over Khau Phạ, from 0 EUR) says only its dearer end, in what to book
                // and among the dearest things: „do 2,2 mln VND”, never „0,1–2,2 mln VND” (the final review of plan B2)
                goTo('#od=HAN&do=HAN&miesiac=2027-10&dni=15&co=gory&poziom=2&dodaj=mucangchai');
                setTimeout(function () {
                  var li = Array.prototype.filter.call(document.querySelectorAll('#b-book li'), function (l) { return L({ en: /tandem paragliding flight/, pl: /Lot tandemem paralotnią/ }).test(l.textContent); })[0];
                  var fly = li && li.querySelector('.b-meta') ? li.querySelector('.b-meta').textContent.replace(/\s+/g, ' ').trim() : '';
                  check('a thing that may cost nothing says only its dearer end: „do 2,2 mln VND na osobę”', L({ en: /^up to 2\.2M VND per person/, pl: /^do 2,2 mln VND na osobę/ }).test(fly), fly);
                  check('and so among the dearest things', L({ en: /a paragliding flight over Khau Phạ \(up to 2\.2M VND\)/, pl: /lot paralotnią nad Khau Phạ \(do 2,2 mln VND\)/ }).test(textOf('#b-budget')),
                    (textOf('#b-budget').match(L({ en: /The biggest costs.*?\.(?!\d)/, pl: /Najwięcej kosztują[^.]*\./ })) || [''])[0]);
                  // a swap on a form that gives no trip (the end before the start) changes nothing: the choice goes back, and the
                  // form's message stands next to it, as next to Dodaj
                  var at2 = soon();
                  goTo('#od=SGN&do=HAN&miesiac=' + at2.year + '-' + (at2.month < 10 ? '0' : '') + at2.month + '&dni=15&co=&poziom=2');
                  setTimeout(function () {
                    document.querySelector('#settings-form input[name=mode][value=dates]').click();
                    setField('end', '2026-01-01');
                    var sw = document.querySelector('.swap[data-swap="haivan"] input[value="self"]');
                    check('the road over the Hải Vân pass is on the trip', !!sw);
                    if (!sw) { done(); return; }
                    sw.click();
                    setTimeout(function () {
                      var on = document.querySelector('.swap[data-swap="haivan"] input:checked'), said = textOf('#settings-msg');
                      check('a swap on a form that gives no trip goes back to „Z kierowcą” and says why next to it', !!on && on.value === 'driver' &&
                        !/motocykl=/.test(location.hash) && said !== '' && textOf('.swap[data-swap="haivan"]').indexOf(said) > -1, (on && on.value) + ' | ' + said);
                      done();
                    }, 400);
                  }, 500);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 300);
      }, 400);
      }, 500);
    }, 400);
  }, 400);
}, 1500);
