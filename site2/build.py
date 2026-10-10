"""Build the page: a fragment with separate image files (out/web, for a private artifact), the same page as a full
document for GitHub Pages (out/pages, with the link preview) and one offline file with the images inside (out/offline)."""
import base64, glob, io, json, os, re, shutil
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
PHOTO_DIR = os.path.join(ROOT, "..", "photos")
OUT_WEB = os.path.join(ROOT, "out", "web")
OUT_PAGES = os.path.join(ROOT, "out", "pages")
OUT_OFF = os.path.join(ROOT, "out", "offline")
OFFLINE_NAME = "Wietnam-po-swojemu.html"
# the page's scripts in load order; the photo list (PHOTOS) and app.js come after them
SCRIPTS = (["places.js", "seasons.js", "travel.js", "engine.js", "holidays.js", "content.js"]
           + sorted("content/" + os.path.basename(p) for p in glob.glob(os.path.join(SRC, "content", "*.js")))
           + ["photos.js", "ui.js", "page.js", "basemap.js"])
# Smaller copies for the hosted page (srcset): phones and thumbnails pick these instead of the full photo.
# The offline file keeps one embedded size per photo.
SMALLER = {"photo": (480, 960), "hero": (960, 1400)}

SITE_URL = "https://grzegorzfrskiba-hub.github.io/wietnam/"
# Link preview (WhatsApp and others), only on the public page, whose address it names.
PREVIEW = {
    "title": "Wietnam po swojemu",
    "description": "Ustaw termin, lotniska, to, co lubisz, i poziom przygody, a strona ułoży trasę po Wietnamie: miejsca, plan dni, przejazdy i mapę.",
    "alt": "Kobieta wiosłuje małą łodzią po rzece u stóp wapiennych skał w Tràng An, Ninh Bình",
}
OG_SIZE = (1200, 630)
# tab icon: karst peaks on the page's accent green
ICON = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0c6a5a'/>"
        "<path d='M8 50 15 30 21 38 30 13 39 33 45 24 56 50z' fill='#fff'/></svg>")


def head_extras(preview):
    """Tab icon for every full document; the link preview tags only for the public page."""
    from urllib.parse import quote
    out = '<link rel="icon" href="data:image/svg+xml,%s">\n' % quote(ICON, safe="/:=' ")
    if preview:
        esc = lambda t: t.replace("&", "&amp;").replace('"', "&quot;")
        out += ('<meta name="description" content="%s">\n' % esc(PREVIEW["description"])
                + '<meta property="og:type" content="website">\n<meta property="og:locale" content="pl_PL">\n'
                + '<meta property="og:url" content="%s">\n' % SITE_URL
                + '<meta property="og:title" content="%s">\n' % esc(PREVIEW["title"])
                + '<meta property="og:description" content="%s">\n' % esc(PREVIEW["description"])
                + '<meta property="og:image" content="%simg/og.jpg">\n' % SITE_URL
                + '<meta property="og:image:width" content="%d">\n<meta property="og:image:height" content="%d">\n' % OG_SIZE
                + '<meta property="og:image:alt" content="%s">\n' % esc(PREVIEW["alt"])
                + '<meta name="twitter:card" content="summary_large_image">\n')
    return out


def full_document(fragment, preview=False):
    """The page fragment as a complete HTML document: doctype, charset and viewport, tab icon, no body margin."""
    return ('<!doctype html>\n<html lang="pl">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + head_extras(preview)
            + fragment.replace("<style>", "<style>\nbody { margin: 0; }", 1).replace("</style>", "</style>\n</head>\n<body>", 1)
            + "\n</body>\n</html>\n")


def encode(im, width, quality):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    return im.size, buf.getvalue()


def photo_ids():
    """The photo ids in photos.js (one entry per line, '  id: { cap: …') and the hero photo."""
    text = open(os.path.join(SRC, "photos.js"), encoding="utf-8").read()
    ids = re.findall(r"^  ([a-z]+_\d+): \{", text, re.M)
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert hero in ids, hero
    return ids, hero


def main():
    ids, hero = photo_ids()
    missing = [p for p in ids if not os.path.exists(os.path.join(PHOTO_DIR, p + ".jpg"))]
    assert not missing, "no file in photos/ for %s" % missing
    js = "\n".join(open(os.path.join(SRC, name), encoding="utf-8").read() for name in SCRIPTS)
    app_js = open(os.path.join(SRC, "app.js"), encoding="utf-8").read()
    template = open(os.path.join(SRC, "template.html"), encoding="utf-8").read()

    for out in (OUT_WEB, OUT_PAGES, OUT_OFF):
        shutil.rmtree(out, ignore_errors=True)
        os.makedirs(out)
    os.makedirs(os.path.join(OUT_WEB, "img"))

    web, off = {}, {}
    for pid in ids:
        im = Image.open(os.path.join(PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1920 if pid == hero else 1400, 74)
        open(os.path.join(OUT_WEB, "img", pid + ".jpg"), "wb").write(b)
        web[pid] = dict(src="img/%s.jpg" % pid, w=w, h=h)
        srcset = []
        for sw in SMALLER["hero" if pid == hero else "photo"]:
            if sw < w:
                (vw, _), vb = encode(im, sw, 74)
                open(os.path.join(OUT_WEB, "img", "%s-%d.jpg" % (pid, vw)), "wb").write(vb)
                srcset.append("img/%s-%d.jpg %dw" % (pid, vw, vw))
        if srcset:
            web[pid]["srcset"] = ", ".join(srcset + ["img/%s.jpg %dw" % (pid, w)])
        (w, h), b = encode(im, 1600 if pid == hero else 1200, 68)
        off[pid] = dict(src="data:image/jpeg;base64," + base64.b64encode(b).decode(), w=w, h=h)
        if pid == hero:
            # link preview image: the hero cut to 1200 x 630, kept low so the rower stays in the picture
            ow, oh = OG_SIZE
            k = max(ow / im.width, oh / im.height)
            big = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
            top = round((big.height - oh) * 0.95)
            left = (big.width - ow) // 2
            big.crop((left, top, left + ow, top + oh)).save(os.path.join(OUT_WEB, "img", "og.jpg"), "JPEG", quality=78, optimize=True, progressive=True)

    def page(photos):
        script = js + "\nvar PHOTOS = " + json.dumps(photos, ensure_ascii=False) + ";\n" + app_js
        script = script.replace("</script", "<\\/script")
        top = photos[hero]
        # the hero is cropped to cover a box about 2x as wide as a phone screen (clamped height, 3:2 photo)
        top_set = ' srcset="%s" sizes="(max-width: 700px) 200vw, 100vw"' % top["srcset"] if "srcset" in top else ""
        return (template.replace("__HERO_SRC__", top["src"]).replace(" __HERO_SRCSET__", top_set).replace("__HERO_W__", str(top["w"]))
                .replace("__HERO_H__", str(top["h"])).replace("__SCRIPT__", script))

    web_page = page(web)
    open(os.path.join(OUT_WEB, "index.html"), "w", encoding="utf-8").write(web_page)
    # GitHub Pages serves files as they are, so it gets the full document and its own copy of the images
    open(os.path.join(OUT_PAGES, "index.html"), "w", encoding="utf-8").write(full_document(web_page, preview=True))
    shutil.copytree(os.path.join(OUT_WEB, "img"), os.path.join(OUT_PAGES, "img"))
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off)))

    size = lambda p: os.path.getsize(p) / 1e6
    img_total = sum(size(os.path.join(OUT_WEB, "img", f)) for f in os.listdir(os.path.join(OUT_WEB, "img")))
    print("web page %.2f MB + %d images %.1f MB" % (size(os.path.join(OUT_WEB, "index.html")), len(web), img_total))
    print("pages page %.2f MB + copy of the images" % size(os.path.join(OUT_PAGES, "index.html")))
    print("offline file %.1f MB" % size(os.path.join(OUT_OFF, OFFLINE_NAME)))


if __name__ == "__main__":
    main()
