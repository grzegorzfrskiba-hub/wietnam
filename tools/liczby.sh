#!/bin/bash
# Prints the numbers of every combination (134 784 trips, about a minute) as Markdown, for the review at a checkpoint:
#   bash tools/liczby.sh [directory of the sources]   (default site2/src; an old copy, e.g. from git archive, gives "before")
set -euo pipefail
cd "$(dirname "$0")/.."
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
S=${1:-site2/src}
"$J" $S/places.js $S/seasons.js $S/travel.js $S/engine.js $S/content.js $S/content/*.js tools/liczby.js
