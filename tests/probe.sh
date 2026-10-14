#!/bin/bash
# Usage: tests/probe.sh <probe.js> <width> [hash] [pixel-ratio]
#   e.g. tests/probe.sh tests/probes/link.js 1400 'od=HAN&do=DAD&miesiac=MIESIAC&dni=12&co=kultura&poziom=3' 2
#        tests/probe.sh my-check.js 390 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2'
# MIESIAC in the hash becomes the month five months from today (YYYY-MM), so a probe never opens a term that has passed.
# Runs the built page (site2/out/pages/index.html, the full document: doctype, no body margin) in headless Chrome inside an
# iframe of <width> px, with tests/probes/lib.js and probe.js appended as scripts after the document (the parser puts them
# at the end of the body), and prints every console.log line that starts with "P:". A probe reads or clicks the page and
# logs each check with check() (lib.js), then done(). Exit 1 when a check failed or done() never came.
# Also saves a screenshot of the last state to $TMPDIR/vn-probe/shot.png.
# Pitfalls: the page scrolls smoothly, so set document.documentElement.style.scrollBehavior = 'auto' before scrollTo;
# headless Chrome loads lazy images at once, so do not measure lazy loading here (read img.currentSrc instead);
# in zsh, loop over pairs with `for w d in 390 2 1400 1` (an unquoted "$a" is not split into words).
set -uo pipefail
cd "$(dirname "$0")/.."
[ -s site2/out/pages/index.html ] || { echo "probe.sh: run python3 site2/build.py first" >&2; exit 1; }
D="${TMPDIR:-/tmp}/vn-probe"; rm -rf "$D"; mkdir -p "$D"
ln -s "$PWD/site2/out/pages/img" "$D/img"
ln -s "$PWD/site2/out/pages/fonts" "$D/fonts"
HASH="${3:-}"; HASH="${HASH//MIESIAC/$(date -v+5m +%Y-%m)}"
{ cat site2/out/pages/index.html; echo "<script>window.__probeHash = '#$HASH';"; cat tests/probes/lib.js "$1"; echo "</script>"; } > "$D/index.html"
printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0}iframe{border:0;display:block}</style><iframe src="index.html#%s" width="%s" height="900"></iframe>' "$HASH" "$2" > "$D/wrap.html"
U=$(mktemp -d)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --user-data-dir="$U" --allow-file-access-from-files \
  --force-device-scale-factor="${4:-1}" --high-dpi-support=1 --window-size=1400,900 --enable-logging=stderr --v=0 --virtual-time-budget=10000 \
  --screenshot="$D/shot.png" "file://$D/wrap.html" > "$D/log.txt" 2>&1 &
PID=$!
for _ in $(seq 40); do [ -s "$D/shot.png" ] && break; sleep 1; done
sleep 1
kill "$PID" 2>/dev/null; pkill -f -- "--user-data-dir=$U"; wait "$PID" 2>/dev/null; rm -rf "$U"
[ -s "$D/shot.png" ] || { echo "probe.sh: Chrome gave no result after 40 s" >&2; exit 1; }
OUT=$(grep -o '"P:[^"]*' "$D/log.txt" | sed 's/^"P://')
echo "$OUT"
echo "$OUT" | grep -q '^done' || { echo "probe.sh: the probe stopped before done() (see $D/log.txt)" >&2; exit 1; }
if echo "$OUT" | grep -q '^FAIL'; then exit 1; fi
