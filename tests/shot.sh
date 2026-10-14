#!/bin/bash
# Usage: tests/shot.sh <settings> <width> <out.png> [height]   e.g. tests/shot.sh 'od=SGN&do=HAN&miesiac=MIESIAC&dni=15&co=&poziom=2' 390 /tmp/a.png
# <settings>: the part of a settings link after # (an empty string opens the defaults).
# MIESIAC in the settings becomes the month five months from today (YYYY-MM).
# [height]: capture height in px; the default is 2600 (measure the page first to shoot all of it; heights past 16000 px work).
# Shoots site2/out/pages/index.html, the full document a visitor gets (doctype, no body margin). The fragment in site2/out/web
# has no doctype, so Chrome opens it in quirks mode with an 8 px margin around the page.
# Headless Chrome writes the PNG but never exits here, so we poll for the file and kill Chrome.
set -euo pipefail
cd "$(dirname "$0")/.."
[ -s site2/out/pages/index.html ] || { echo "shot.sh: run python3 site2/build.py first" >&2; exit 1; }
head -c 15 site2/out/pages/index.html | grep -qi '^<!doctype html>' || { echo "shot.sh: site2/out/pages/index.html has no doctype, so Chrome would use quirks mode" >&2; exit 1; }
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP=$(mktemp -d)
rm -f "$3"
URL="file://$PWD/site2/out/pages/index.html#${1//MIESIAC/$(date -v+5m +%Y-%m)}"
WIN="$2"
H="${4:-2600}"
# Headless Chrome clamps the window to ~500 px wide, so narrow shots go through an iframe wrapper.
if [ "$2" -lt 600 ]; then
  printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}iframe{border:0;display:block}</style><iframe src="%s" width="%s" height="%s"></iframe>' "$URL" "$2" "$H" > "$TMP/wrap.html"
  URL="file://$TMP/wrap.html"
  WIN=800
fi
"$C" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP" --allow-file-access-from-files \
  --window-size="$WIN,$H" --virtual-time-budget=8000 --screenshot="$3" \
  "$URL" >/dev/null 2>&1 &
PID=$!
stop() {
  kill "$PID" 2>/dev/null || true
  pkill -f -- "--user-data-dir=$TMP" 2>/dev/null || true
  wait "$PID" 2>/dev/null || true
}
for _ in $(seq 60); do
  [ -s "$3" ] && break
  sleep 1
done
if [ ! -s "$3" ]; then
  stop; rm -rf "$TMP"
  echo "shot.sh: no screenshot after 60s" >&2
  exit 1
fi
sleep 1
stop
if [ "$2" -lt 600 ]; then
  python3 -c 'import sys; from PIL import Image; p=sys.argv[1]; w=int(sys.argv[2]); im=Image.open(p); im.crop((0,0,w,im.height)).save(p)' "$3" "$2"
fi
rm -rf "$TMP"
ls -la "$3"
