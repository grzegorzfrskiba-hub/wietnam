#!/bin/bash
# Usage: tests/print.sh <settings> <out.pdf> [dark]   e.g. tests/print.sh 'od=SGN&do=HAN&miesiac=2027-03&dni=15&co=&poziom=2' /tmp/a.pdf
# Prints the built page to PDF through headless Chrome (A4, backgrounds on), then reports the page count,
# the pages that are almost empty and the text lines covered by a box drawn over them (must be 0).
# "dark" prints with the system set to dark mode.
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
# Covered text: a run of text that a filled box (a card or a tip: a short rounded path, unlike the map's land and sea)
# is drawn over later in the page and hides more than a fifth of it. Counted in lines (one baseline = one line).
lines = set()
for n, p in enumerate(doc, 1):
    boxes = [d for d in p.get_drawings() if d["fill"] and len(d["items"]) < 40 and d["rect"].width > 100 and d["rect"].height > 20]
    for t in p.get_texttrace():
        r = fitz.Rect(t["bbox"])
        if abs(r) and any(d["seqno"] > t["seqno"] and abs(r & d["rect"]) > 0.2 * abs(r) for d in boxes):
            lines.add((n, round(t["chars"][0][2][1])))
print("covered text lines: %d%s" % (len(lines), " (pages %s)" % ", ".join(str(n) for n in sorted({n for n, _ in lines})) if lines else ""))
PY
