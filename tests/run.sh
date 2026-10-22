#!/bin/bash
# Runs every test in JavaScriptCore (node is not installed on this Mac). Exit 0 = all pass.
#   bash tests/run.sh          every test; the combination test checks every 7th combination
#   bash tests/run.sh --full   the combination test checks every combination (about half a minute)
# Strict on purpose: every source and test file is listed here (the texts of the places as site2/src/content/*.js, their
# English texts as site2/src/en/content/*.js),
# a missing or renamed one stops the run instead of being skipped, and every tests/*.test.js must be in TESTS.
# Any other argument prints the usage and stops too.
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
CONTENT_FILES=$(ls site2/src/content/*.js)
EN_CONTENT_FILES=$(ls site2/src/en/content/*.js)
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/climate.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/content.js $CONTENT_FILES $EN_CONTENT_FILES site2/src/photos.js site2/src/en/photos.js site2/src/ui.js site2/src/en/ui.js site2/src/panels.js site2/src/costs.js site2/src/before.js site2/src/en/names.js site2/src/page.js site2/src/wildpage.js site2/src/atlaspage.js site2/src/wild.js site2/src/en/wild.js site2/src/wildphotos.js site2/src/en/wildphotos.js site2/src/wildui.js site2/src/en/wildui.js site2/src/atlasui.js site2/src/en/atlasui.js"
TESTS="tests/engine.test.js tests/page.test.js tests/wild.test.js tests/atlas.test.js tests/data.test.js tests/content.test.js tests/combos.test.js"
MODE=""
if [ $# -eq 1 ] && [ "$1" = "--full" ]; then
  MODE="tests/full.js"
elif [ $# -ne 0 ]; then
  echo "usage: bash tests/run.sh [--full]" >&2
  exit 2
fi
for f in $SOURCES tests/assert.js $MODE $TESTS; do
  if [ ! -f "$f" ]; then
    echo "tests/run.sh: missing file $f" >&2
    exit 1
  fi
done
for t in tests/*.test.js; do
  case " $TESTS " in
    *" $t "*) ;;
    *) echo "tests/run.sh: $t is not in TESTS" >&2; exit 1 ;;
  esac
done
for t in $TESTS; do
  echo "== $t"
  "$J" $SOURCES tests/assert.js $MODE "$t"
done
echo "== lint: no words in CSS content (texts come from UI.pl)"
if grep -nE "content: *\"[^\"]*[A-Za-z]{3,}" site2/src/template.html; then echo "FAIL: put the text in UI.pl" >&2; exit 1; fi
echo "== lint: counted words only through countWord(key, n)"
if grep -nE "T\('(nights|f\.places|f\.flights|f\.hikes)\.(one|few|many)'" site2/src/app.js; then echo "FAIL: use countWord(key, n)" >&2; exit 1; fi
echo "== lint: the fonts come with the page (site2/fonts), not from Google Fonts"
if grep -nE "fonts\.(googleapis|gstatic)\.com" site2/src/template.html site2/build.py; then echo "FAIL: the page loads fonts from Google" >&2; exit 1; fi
[ -f site2/fonts/fonts.css ] || { echo "FAIL: site2/fonts/fonts.css is missing" >&2; exit 1; }
for f in $(grep -o "url(fonts/[a-z0-9-]*\.woff2)" site2/fonts/fonts.css | sed 's/^url(fonts\///; s/)$//'); do
  [ -f "site2/fonts/$f" ] || { echo "FAIL: site2/fonts/$f is missing" >&2; exit 1; }
done
echo "ALL PASS"
