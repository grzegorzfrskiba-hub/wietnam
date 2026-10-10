#!/bin/bash
# Usage: tests/shot.sh <settings> <width> <out.png>   e.g. tests/shot.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' 390 /tmp/a.png
# <settings>: the part of a settings link after # (an empty string opens the defaults).
# Headless Chrome writes the PNG but never exits here, so we poll for the file and kill Chrome.
set -euo pipefail
cd "$(dirname "$0")/.."
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP=$(mktemp -d)
rm -f "$3"
URL="file://$PWD/site2/out/web/index.html#$1"
WIN="$2"
# Headless Chrome clamps the window to ~500 px wide, so narrow shots go through an iframe wrapper.
if [ "$2" -lt 600 ]; then
  printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}iframe{border:0;display:block}</style><iframe src="%s" width="%s" height="2600"></iframe>' "$URL" "$2" > "$TMP/wrap.html"
  URL="file://$TMP/wrap.html"
  WIN=800
fi
"$C" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP" \
  --window-size="$WIN,2600" --virtual-time-budget=8000 --screenshot="$3" \
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
