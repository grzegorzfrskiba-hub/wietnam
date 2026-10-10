#!/bin/bash
# Usage: tests/print.sh <settings> <out.pdf> [dark]   e.g. tests/print.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' /tmp/a.pdf
# Prints the built page to PDF through headless Chrome (A4, backgrounds on), then reports the page count
# and the pages that are almost empty. "dark" prints with the system set to dark mode.
set -euo pipefail
cd "$(dirname "$0")/.."
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP=$(mktemp -d)
rm -f "$2"
DARK=()
[ "${3:-}" = dark ] && DARK=(--force-dark-mode --blink-settings=preferredColorScheme=0)
"$C" --headless=new --disable-gpu --user-data-dir="$TMP" "${DARK[@]+"${DARK[@]}"}" \
  --virtual-time-budget=8000 --no-pdf-header-footer --print-to-pdf="$2" \
  "file://$PWD/site2/out/web/index.html#$1" >/dev/null 2>&1 &
PID=$!
for _ in $(seq 60); do
  [ -s "$2" ] && break
  sleep 1
done
sleep 1
kill "$PID" 2>/dev/null || true
pkill -f -- "--user-data-dir=$TMP" 2>/dev/null || true
wait "$PID" 2>/dev/null || true
rm -rf "$TMP"
[ -s "$2" ] || { echo "print.sh: no PDF after 60s" >&2; exit 1; }
python3 - "$2" <<'PY'
import sys, fitz
doc = fitz.open(sys.argv[1])
fill = []
for p in doc:
    blocks = [b for b in p.get_text("blocks")] + [(*i["bbox"],) for i in p.get_image_info()]
    bottom = max([b[3] for b in blocks] or [0])
    fill.append(round(100 * bottom / p.rect.height))
low = [i + 1 for i, f in enumerate(fill) if f < 45 and i + 1 < len(fill)]
print("%s: %d pages; filled to %% of height: %s; under 45%% (not counting the last): %s" % (sys.argv[1], len(doc), fill, low or "none"))
PY
