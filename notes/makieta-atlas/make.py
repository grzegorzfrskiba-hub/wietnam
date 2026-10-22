# -*- coding: utf-8 -*-
# Throwaway mockup of the places atlas (decision session 22.10.2026, notes/plans/2026-10-22-atlas-projekt.md), not a model
# for the code. Usage, after python3 site2/build.py:
#   python3 -I notes/makieta-atlas/make.py <repo> <out dir outside the repo>
#   python3 -m http.server 8793 --bind 127.0.0.1 --directory <out dir>     then open http://localhost:8793/atlas/
# It writes <out>/atlas/index.html with the style block of the built wildlife subpage (fonts, tokens, its map, band and
# viewer rules), copies atlas.css and atlas.js next to it and links img, fonts, the page with the route, the wildlife
# subpage (site2/out/pages) and the sources (site2/src) into <out>, so the mockup reads the real texts, photos and trips.
import glob, os, re, shutil, sys

R, OUT = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
HERE = os.path.dirname(os.path.abspath(__file__))
pages, src = os.path.join(R, 'site2/out/pages'), os.path.join(R, 'site2/src')
os.makedirs(os.path.join(OUT, 'atlas'), exist_ok=True)
for name, target in [('img', os.path.join(pages, 'img')), ('fonts', os.path.join(pages, 'fonts')), ('index.html', os.path.join(pages, 'index.html')),
                     ('wildlife', os.path.join(pages, 'wildlife')), ('src', src)]:
    link = os.path.join(OUT, name)
    if os.path.islink(link): os.remove(link)
    os.symlink(target, link)
wild = open(os.path.join(pages, 'wildlife/index.html'), encoding='utf-8').read()
style = re.search(r'<style>(.*?)</style>', wild, re.S).group(1)
scripts = (['places.js', 'seasons.js', 'climate.js', 'travel.js', 'engine.js', 'holidays.js', 'content.js']
           + sorted('content/' + os.path.basename(p) for p in glob.glob(os.path.join(src, 'content', '*.js')))
           + sorted('en/content/' + os.path.basename(p) for p in glob.glob(os.path.join(src, 'en', 'content', '*.js')))
           + ['photos.js', 'en/photos.js', 'ui.js', 'en/ui.js', 'panels.js', 'page.js', 'basemap.js', 'wildpage.js'])
body = open(os.path.join(HERE, 'body.html'), encoding='utf-8').read()
page = ('<!doctype html>\n<html lang="pl">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="robots" content="noindex">\n<title>Atlas Wietnamu · makieta</title>\n'
        '<style>' + style + '</style>\n<link rel="stylesheet" href="atlas.css">\n</head>\n<body>\n' + body + '\n'
        + ''.join('<script src="../src/%s"></script>\n' % s for s in scripts)
        + '<script src="atlas.js"></script>\n</body>\n</html>\n')
open(os.path.join(OUT, 'atlas', 'index.html'), 'w', encoding='utf-8').write(page)
for f in ('atlas.css', 'atlas.js'):
    shutil.copy(os.path.join(HERE, f), os.path.join(OUT, 'atlas', f))
print('wrote', os.path.join(OUT, 'atlas', 'index.html'))
