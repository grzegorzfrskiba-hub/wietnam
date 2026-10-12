#!/bin/bash
# Checks the booking and entry links of the page (BOOK and ENTRY in site2/src/before.js): asks each address once with curl,
# as a browser would (redirects followed), and prints its answer. Nothing is saved: the pages go to /dev/null.
#   bash tools/links.sh            every link, one line each: the final status and the address
# Exit 1 when an address does not answer 2xx. A site may refuse curl although a browser opens it (a firewall, 403 or 202):
# open such an address in a browser before you count it as broken (research/rezerwacje-2026-10.md, "Jak czytać").
set -uo pipefail
cd "$(dirname "$0")/.."
bad=0
for url in $(grep -o "url: 'https://[^']*'" site2/src/before.js | sed "s/^url: '//; s/'$//" | sort -u); do
  code=$(curl -s -o /dev/null -w '%{http_code}' -L -A 'Mozilla/5.0' --max-time 25 "$url")
  echo "$code $url"
  case "$code" in 2*) ;; *) bad=$((bad + 1)) ;; esac
done
if [ "$bad" -gt 0 ]; then echo "links.sh: $bad address(es) did not answer 2xx" >&2; exit 1; fi
echo "links.sh: all addresses answer"
