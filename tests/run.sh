#!/bin/bash
# Runs the engine and data tests in JavaScriptCore (node is not installed on this Mac). Exit 0 = all pass.
#   bash tests/run.sh          every test; the combination test checks every 7th combination
#   bash tests/run.sh --full   the combination test checks every combination (about half a minute)
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
S=site2/src
FILES=""
for f in places.js seasons.js travel.js engine.js; do
  if [ -f "$S/$f" ]; then FILES="$FILES $S/$f"; fi
done
MODE=""
if [ "${1:-}" = "--full" ]; then MODE="tests/full.js"; fi
for t in engine data combos; do
  if [ ! -f "tests/$t.test.js" ]; then continue; fi
  echo "== tests/$t.test.js"
  "$J" $FILES tests/assert.js $MODE "tests/$t.test.js"
done
echo "ALL PASS"
