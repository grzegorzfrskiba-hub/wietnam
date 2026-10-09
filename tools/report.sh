#!/bin/bash
# Prints sample trips as Markdown for a human review:  bash tools/report.sh > notes/raport-tras-YYYY-MM-DD.md
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
S=site2/src
"$J" $S/places.js $S/seasons.js $S/travel.js $S/engine.js tools/report.js
