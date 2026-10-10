#!/bin/bash
# Runs the engine and data tests in JavaScriptCore (node is not installed on this Mac). Exit 0 = all pass.
#   bash tests/run.sh          every test; the combination test checks every 7th combination
#   bash tests/run.sh --full   the combination test checks every combination (about half a minute)
# Strict on purpose: every source and test file is listed here, and a missing or renamed one stops the run
# instead of being skipped. Any other argument prints the usage and stops too.
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
SOURCES="site2/src/places.js site2/src/seasons.js site2/src/travel.js site2/src/engine.js site2/src/holidays.js site2/src/photos.js"
TESTS="tests/engine.test.js tests/data.test.js tests/combos.test.js"
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
for t in $TESTS; do
  echo "== $t"
  "$J" $SOURCES tests/assert.js $MODE "$t"
done
echo "ALL PASS"
