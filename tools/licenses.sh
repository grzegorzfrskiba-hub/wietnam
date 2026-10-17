#!/bin/bash
# Checks the photos of the page (PHOTO_META in site2/src/photos.js) and of the wildlife subpage (WILD_PHOTOS in
# site2/src/wildphotos.js, stage 6) against Wikimedia Commons: asks the Commons API for each
# file's licence and author (extmetadata, 50 files a query) and prints the photos whose licence differs from photos.js, is
# no longer CC0, CC BY, CC BY-SA or public domain (notes/wizja.md), or whose author in photos.js has a word that neither the
# author nor the attribution on Commons has (a hint to read the file's page). Nothing is saved.
#   bash tools/licenses.sh         one line per photo with a difference, then a summary
# Exit 1 when a licence differs or a file is missing on Commons; a differing author alone only prints a line to check.
set -uo pipefail
cd "$(dirname "$0")/.."
python3 -I - <<'PY'
import html, json, re, sys, urllib.parse, urllib.request
meta = {}
for name, idre, prefix in (('photos.js', r'[a-z]+_\d+', ''), ('wildphotos.js', r'[a-z]+', 'wild:')):
    src = open('site2/src/' + name, encoding='utf-8').read()
    n = 0
    for m in re.finditer(r"^  (" + idre + r"): \{ cap: '((?:[^'\\]|\\.)*)', artist: '((?:[^'\\]|\\.)*)', license: '([^']*)', page: '([^']*)' \}", src, re.M):
        meta[prefix + m.group(1)] = {'artist': m.group(3).replace("\\'", "'"), 'license': m.group(4), 'title': urllib.parse.unquote(m.group(5).split('/wiki/', 1)[1]).replace('_', ' ')}
        n += 1
    n_src = len(re.findall(r"^  " + idre + r": \{", src, re.M))
    if n != n_src:
        print('licenses.sh: read %d of %d entries of %s' % (n, n_src, name)); sys.exit(1)
def plain(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s or ''))).strip()
def norm(s): return re.sub(r'\s+', ' ', s.replace('Public Domain', 'Public domain')).strip()
def words(s): return set(re.sub(r'[()\[\],.©/]', ' ', s.lower()).split())
found, ids = {}, sorted(meta)
for i in range(0, len(ids), 50):
    titles = '|'.join(meta[p]['title'] for p in ids[i:i + 50])
    q = urllib.parse.urlencode({'action': 'query', 'titles': titles, 'prop': 'imageinfo', 'iiprop': 'extmetadata',
                                'iiextmetadatafilter': 'Artist|Attribution|LicenseShortName', 'format': 'json', 'formatversion': '2'})
    req = urllib.request.Request('https://commons.wikimedia.org/w/api.php?' + q, headers={'User-Agent': 'wietnam-po-swojemu licence check (read only)'})
    data = json.load(urllib.request.urlopen(req, timeout=60))
    norm_map = {x['to']: x['from'] for x in data['query'].get('normalized', [])}
    for pg in data['query']['pages']:
        t = norm_map.get(pg['title'], pg['title'])
        found[t] = None if pg.get('missing') else pg['imageinfo'][0]['extmetadata']
bad = check = 0
for p in ids:
    m = meta[p]; e = found.get(m['title'])
    if e is None:
        print('MISSING %s: no file %s on Commons' % (p, m['title'])); bad += 1; continue
    lic = norm(plain(e.get('LicenseShortName', {}).get('value')))
    art = plain(e.get('Artist', {}).get('value')) + ' / ' + plain(e.get('Attribution', {}).get('value'))
    if norm(m['license']) != lic or re.search(r'\b(NC|ND)\b', lic):
        print('LICENCE %s: %s in photos.js, %s on Commons' % (p, m['license'], lic)); bad += 1
    if not words(m['artist']) <= words(art):
        print('AUTHOR  %s: %s in photos.js, %s on Commons' % (p, m['artist'], art)); check += 1
print('licenses.sh: %d photos, %d licence problem(s), %d author(s) to check' % (len(ids), bad, check))
sys.exit(1 if bad else 0)
PY
