"""Build the page: a fragment with separate image and font files (out/web, for a private artifact), the same page as a full
document for GitHub Pages (out/pages, with the link preview and the robots tag) and one offline file with the images and
the fonts inside (out/offline), for a computer or Chrome on Android (an iPhone does not run its scripts). Next to the page,
for GitHub Pages only, the wildlife subpage (stage 6): out/pages/wildlife/index.html, its photos in out/pages/img/wild/;
and the atlas of places (stage 7): out/pages/atlas/index.html, with the photos of the page with the route."""
import base64, glob, io, json, os, re, shutil
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
PHOTO_DIR = os.path.join(ROOT, "..", "photos")
FONT_DIR = os.path.join(ROOT, "fonts")   # the fonts with their licences and fonts.css, the @font-face rules
OUT_WEB = os.path.join(ROOT, "out", "web")
OUT_PAGES = os.path.join(ROOT, "out", "pages")
OUT_OFF = os.path.join(ROOT, "out", "offline")
OFFLINE_NAME = "Route-G.html"
# the page's scripts in load order, the English texts (en/, stage 5) after their Polish ones; the photo list (PHOTOS) and
# app.js come after them
SCRIPTS = (["places.js", "seasons.js", "climate.js", "travel.js", "engine.js", "holidays.js", "content.js"]
           + sorted("content/" + os.path.basename(p) for p in glob.glob(os.path.join(SRC, "content", "*.js")))
           + sorted("en/content/" + os.path.basename(p) for p in glob.glob(os.path.join(SRC, "en", "content", "*.js")))
           + ["photos.js", "en/photos.js", "ui.js", "en/ui.js", "panels.js", "costs.js", "before.js", "en/names.js", "page.js", "basemap.js"])
# The wildlife subpage's scripts (stage 6): those of the page that plan a trip and name its places, then its own helpers
# (and the atlas's, for its link to the atlas, stage 7), data and texts (English after Polish); its logic, wildapp.js, comes
# after them, as app.js does. Not in the offline file and not in out/web (finding 4 of stage 6).
WILD_SCRIPTS = (["places.js", "seasons.js", "climate.js", "travel.js", "engine.js", "holidays.js", "content.js"]
                + [n for n in SCRIPTS if n.startswith(("content/", "en/content/"))]
                + ["ui.js", "en/ui.js", "panels.js", "page.js", "basemap.js", "wildpage.js", "atlaspage.js", "wild.js", "en/wild.js", "wildphotos.js", "en/wildphotos.js", "wildui.js", "en/wildui.js"])
# The atlas of places' scripts (stage 7): those of the wildlife subpage that plan a trip and name its places, the credits of
# the places' photos, the helpers and the texts it shares with the wildlife subpage, then its own (English after Polish);
# its logic, atlasapp.js, comes after them. Not in the offline file and not in out/web, as the wildlife subpage.
ATLAS_SCRIPTS = (["places.js", "seasons.js", "climate.js", "travel.js", "engine.js", "holidays.js", "content.js"]
                 + [n for n in SCRIPTS if n.startswith(("content/", "en/content/"))]
                 + ["photos.js", "en/photos.js", "ui.js", "en/ui.js", "panels.js", "page.js", "basemap.js", "wildpage.js", "wildui.js", "en/wildui.js",
                    "atlaspage.js", "atlasui.js", "en/atlasui.js"])
WILD_PHOTO_DIR = os.path.join(PHOTO_DIR, "wild")
WILD_SMALLER = (480, 960)   # srcset of a wildlife photo: the gallery's tiles and a phone pick these
# Smaller copies for the hosted page (srcset): phones and thumbnails pick these instead of the full photo; 160 px for the
# small photos of the places off the trip and of the galleries (the first round of fixes, fix 1).
# The offline file keeps one embedded size per photo, small enough for a file of about 6 MB: width and JPEG quality.
SMALLER = {"photo": (160, 480, 960), "hero": (960, 1400)}
OFFLINE = {"photo": (640, 60), "hero": (1280, 62)}

# the public address, written once: var SITE_URL in page.js (the copied plan links to it)
SITE_URL = re.search(r"^var SITE_URL = '([^']+)';", open(os.path.join(SRC, "page.js"), encoding="utf-8").read(), re.M).group(1)
# Link preview (WhatsApp and others), only on the public page, whose address it names; in English, the page's default
# language (decision 1 of stage 5: one address, so WhatsApp, which reads the file without its scripts, shows English).
PREVIEW = {
    "url": SITE_URL, "image": SITE_URL + "img/og.jpg",
    "title": "Route G · Vietnam, up to you",
    "description": "Set your dates, your airports, what you like and how adventurous you are, and the page plans a route around Vietnam: the places, a plan for each day, the journeys and a map.",
    "alt": "The sun setting over the pyramid on the summit of Fansipan, 3,143 m, above a sea of clouds, Sa Pa",
}
# the wildlife subpage's own link preview, in English, with the red-shanked douc (finding 2 of stage 6)
WILD_PREVIEW = {
    "url": SITE_URL + "wildlife/", "image": SITE_URL + "img/og-wild.jpg",
    "title": "Wildlife of Vietnam · Route G",
    "description": "The animals you can really see on a route around Vietnam, where, when and how likely, a gallery of the most beautiful species and a field guide to the places.",
    "alt": "A red-shanked douc in the wild on the Sơn Trà peninsula in Đà Nẵng",
}
WILD_OG = "duk"
# the atlas's own link preview, in English, with the terraces below the Khau Phạ pass (ATLAS_HERO in photos.js)
ATLAS_PREVIEW = {
    "url": SITE_URL + "atlas/", "image": SITE_URL + "img/og-atlas.jpg",
    "title": "Atlas of Vietnam · Route G",
    "description": "The twenty places Route G builds its routes from, with big photos and a map: what they look like, when to go and what to do there.",
    "alt": "Rice terraces below the Khau Phạ pass in Mù Cang Chải",
}
OG_SIZE = (1200, 630)
# The public page stays out of search engines while the first friends try it (decision of 14.10.2026); to open it, set
# NOINDEX = False, build and publish again.
NOINDEX = True

# The sentence for a viewer without JavaScript, in English and under it in Polish (stage 5): on the public page a short one;
# in the offline file the longer one, as an iPhone shows a sent HTML file in a preview that runs no scripts.
NOSCRIPT = {
    "page": [("en", "This page plans your route in the browser and needs JavaScript: turn it on in your browser’s settings."),
             ("pl", "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu: włącz go w ustawieniach przeglądarki.")],
    "offline": [("en", "This page plans your route in the browser and needs JavaScript. If you see this text in an iPhone’s file preview, "
                       "open the page %s in a browser, or save your route there as a PDF." % SITE_URL),
                ("pl", "Ta strona układa trasę w przeglądarce i potrzebuje JavaScriptu. Jeśli widzisz ten tekst w podglądzie pliku na iPhonie, "
                       "otwórz w przeglądarce stronę %s albo zapisz na niej swoją trasę jako PDF." % SITE_URL)],
}
# tab icon: karst peaks on the page's accent green
ICON = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0c6a5a'/>"
        "<path d='M8 50 15 30 21 38 30 13 39 33 45 24 56 50z' fill='#fff'/></svg>")


def head_extras(preview):
    """Tab icon for every full document; the link preview tags (preview: PREVIEW or WILD_PREVIEW) and, while NOINDEX, the
    robots tag only for the public pages."""
    from urllib.parse import quote
    out = '<link rel="icon" href="data:image/svg+xml,%s">\n' % quote(ICON, safe="/:=' ")
    if preview and NOINDEX:
        out += '<meta name="robots" content="noindex">\n'
    if preview:
        esc = lambda t: t.replace("&", "&amp;").replace('"', "&quot;")
        out += ('<meta name="description" content="%s">\n' % esc(preview["description"])
                + '<meta property="og:type" content="website">\n<meta property="og:locale" content="en_GB">\n'
                + '<meta property="og:url" content="%s">\n' % preview["url"]
                + '<meta property="og:title" content="%s">\n' % esc(preview["title"])
                + '<meta property="og:description" content="%s">\n' % esc(preview["description"])
                + '<meta property="og:image" content="%s">\n' % preview["image"]
                + '<meta property="og:image:width" content="%d">\n<meta property="og:image:height" content="%d">\n' % OG_SIZE
                + '<meta property="og:image:alt" content="%s">\n' % esc(preview["alt"])
                + '<meta name="twitter:card" content="summary_large_image">\n')
    return out


def full_document(fragment, preview=None):
    """The page fragment as a complete HTML document: doctype, charset and viewport, tab icon, no body margin."""
    return ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
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


def fonts_css(inline):
    """The @font-face rules of site2/fonts/fonts.css: as written (url(fonts/…), the files next to the page) or, for the
    offline file, with each woff2 file inside as base64. Every file the rules name must exist."""
    def one(m):
        path = os.path.join(FONT_DIR, m.group(1))
        assert os.path.exists(path), "no font file " + path
        return "url(data:font/woff2;base64,%s)" % base64.b64encode(open(path, "rb").read()).decode() if inline else m.group(0)
    return re.sub(r"url\(fonts/([a-z0-9-]+\.woff2)\)", one, open(os.path.join(FONT_DIR, "fonts.css"), encoding="utf-8").read())


def mean_colour(im):
    """The photo's mean colour as #rrggbb: its frame shows it till the photo has loaded (finishing touches, finding 6)."""
    return "#%02x%02x%02x" % im.resize((1, 1), Image.BOX).getpixel((0, 0))


def og_image(im, path, low):
    """A link preview image: the photo cut to OG_SIZE, the cut taken at the height low (0 top, 1 bottom)."""
    ow, oh = OG_SIZE
    k = max(ow / im.width, oh / im.height)
    big = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    top = round((big.height - oh) * low)
    left = (big.width - ow) // 2
    big.crop((left, top, left + ow, top + oh)).save(path, "JPEG", quality=78, optimize=True, progressive=True)


def wild_photo_ids():
    """The photo ids of the wildlife subpage in wildphotos.js (one entry per line, '  id: { cap: …'); each needs its file in
    photos/wild/. And the photo at the top of the subpage (WILD_HERO, finishing touches, finding 4)."""
    text = open(os.path.join(SRC, "wildphotos.js"), encoding="utf-8").read()
    ids = re.findall(r"^  ([a-z]+): \{ cap: ", text, re.M)
    assert len(ids) == len(set(ids)), "an id twice in wildphotos.js"
    missing = [p for p in ids if not os.path.exists(os.path.join(WILD_PHOTO_DIR, p + ".jpg"))]
    assert not missing, "no file in photos/wild/ for %s" % missing
    hero = re.search(r"^var WILD_HERO = '([a-z]+)';", text, re.M).group(1)
    assert hero in ids, hero
    return ids, hero


def wild_page(template, fonts):
    """The wildlife subpage for GitHub Pages: out/pages/wildlife/index.html, with the colours of the page with the route (its
    :root tokens and their dark versions, cut from template.html), the fonts and images one folder up, and its photos in
    out/pages/img/wild/ with smaller copies for the tiles; the photo at the top as wide as the one of the page with the route."""
    ids, hero = wild_photo_ids()
    os.makedirs(os.path.join(OUT_PAGES, "img", "wild"))
    pics = {}
    for pid in ids:
        im = Image.open(os.path.join(WILD_PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1920 if pid == hero else 1400, 74)
        open(os.path.join(OUT_PAGES, "img", "wild", pid + ".jpg"), "wb").write(b)
        pics[pid] = dict(src="../img/wild/%s.jpg" % pid, w=w, h=h, bg=mean_colour(im))
        srcset = []
        for sw in WILD_SMALLER + ((1400,) if pid == hero else ()):
            if sw < w:
                (vw, _), vb = encode(im, sw, 74)
                open(os.path.join(OUT_PAGES, "img", "wild", "%s-%d.jpg" % (pid, vw)), "wb").write(vb)
                srcset.append("../img/wild/%s-%d.jpg %dw" % (pid, vw, vw))
        if srcset:
            pics[pid]["srcset"] = ", ".join(srcset + ["../img/wild/%s.jpg %dw" % (pid, w)])
        if pid == WILD_OG:
            og_image(im, os.path.join(OUT_PAGES, "img", "og-wild.jpg"), 0.3)
    page_tpl = open(os.path.join(SRC, "template.html"), encoding="utf-8").read()
    tokens = page_tpl[page_tpl.index(":root {"):page_tpl.index("\n* { box-sizing")]
    js = "\n".join(open(os.path.join(SRC, name), encoding="utf-8").read() for name in WILD_SCRIPTS)
    script = (js + "\nvar WILD_PICS = " + json.dumps(pics, ensure_ascii=False) + ";\n"
              + open(os.path.join(SRC, "wildapp.js"), encoding="utf-8").read()).replace("</script", "<\\/script")
    top = pics[hero]
    page = (template.replace("__HERO_SRC__", top["src"]).replace("__HERO_SRCSET__", top["srcset"]).replace("__HERO_W__", str(top["w"])).replace("__HERO_H__", str(top["h"]))
            .replace("/* __FONTS__ */", fonts.replace("url(fonts/", "url(../fonts/")).replace("/* __TOKENS__ */", tokens)
            .replace("__NOSCRIPT__", "".join('<p class="noscript" lang="%s">%s</p>' % x for x in NOSCRIPT["page"])).replace("__SCRIPT__", script))
    os.makedirs(os.path.join(OUT_PAGES, "wildlife"))
    open(os.path.join(OUT_PAGES, "wildlife", "index.html"), "w", encoding="utf-8").write(full_document(page, preview=WILD_PREVIEW))
    return len(ids)


def atlas_page(template, fonts, web):
    """The atlas of places for GitHub Pages (stage 7): out/pages/atlas/index.html, with the colours of the page with the route
    (its :root tokens and their dark versions, as the wildlife subpage) and the fonts one folder up; its photos are those of
    the page with the route (web: their copies in out/pages/img/), the one at the top (ATLAS_HERO in photos.js) with a copy of
    1920 px for a wide screen and the image of the link preview, og-atlas.jpg. Returns the size of the page in MB."""
    hero = re.search(r"^var ATLAS_HERO = '([a-z]+_\d+)';", open(os.path.join(SRC, "photos.js"), encoding="utf-8").read(), re.M).group(1)
    assert hero in web, hero
    im = Image.open(os.path.join(PHOTO_DIR, hero + ".jpg")).convert("RGB")
    (bw, _), b = encode(im, 1920, 74)
    open(os.path.join(OUT_PAGES, "img", "%s-%d.jpg" % (hero, bw)), "wb").write(b)
    og_image(im, os.path.join(OUT_PAGES, "img", "og-atlas.jpg"), 0.6)
    up = lambda s: re.sub(r"(^|, )img/", r"\1../img/", s)
    pics = {pid: dict(p, src=up(p["src"]), **({"srcset": up(p["srcset"])} if "srcset" in p else {})) for pid, p in web.items()}
    page_tpl = open(os.path.join(SRC, "template.html"), encoding="utf-8").read()
    tokens = page_tpl[page_tpl.index(":root {"):page_tpl.index("\n* { box-sizing")]
    js = "\n".join(open(os.path.join(SRC, name), encoding="utf-8").read() for name in ATLAS_SCRIPTS)
    script = (js + "\nvar ATLAS_PICS = " + json.dumps(pics, ensure_ascii=False) + ";\n"
              + open(os.path.join(SRC, "atlasapp.js"), encoding="utf-8").read()).replace("</script", "<\\/script")
    top = pics[hero]
    page = (template.replace("__HERO_SRC__", top["src"]).replace("__HERO_SRCSET__", top["srcset"] + ", ../img/%s-%d.jpg %dw" % (hero, bw, bw))
            .replace("__HERO_W__", str(top["w"])).replace("__HERO_H__", str(top["h"]))
            .replace("/* __FONTS__ */", fonts.replace("url(fonts/", "url(../fonts/")).replace("/* __TOKENS__ */", tokens)
            .replace("__NOSCRIPT__", "".join('<p class="noscript" lang="%s">%s</p>' % x for x in NOSCRIPT["page"])).replace("__SCRIPT__", script))
    os.makedirs(os.path.join(OUT_PAGES, "atlas"))
    path = os.path.join(OUT_PAGES, "atlas", "index.html")
    open(path, "w", encoding="utf-8").write(full_document(page, preview=ATLAS_PREVIEW))
    return os.path.getsize(path) / 1e6


def photo_ids():
    """The photo ids in photos.js (one entry per line, '  id: { cap: …'), the hero photo and the photo at the end of the page
    (finishing touches, finding 9)."""
    text = open(os.path.join(SRC, "photos.js"), encoding="utf-8").read()
    ids = re.findall(r"^  ([a-z]+_\d+): \{", text, re.M)
    assert len(ids) == len(set(ids)), "an id twice in photos.js: %s" % sorted(p for p in set(ids) if ids.count(p) > 1)
    assert "nieznany" not in text, "photos.js: a photo without its real author"
    hero = re.search(r"^var HERO_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert hero in ids, hero
    finale = re.search(r"^var FINALE_PHOTO = '([a-z]+_\d+)';", text, re.M).group(1)
    assert finale in ids, finale
    return ids, hero, finale


def main():
    ids, hero, finale = photo_ids()
    big = (hero, finale)   # the photos the page's width: at the top and at the end
    missing = [p for p in ids if not os.path.exists(os.path.join(PHOTO_DIR, p + ".jpg"))]
    assert not missing, "no file in photos/ for %s" % missing
    js = "\n".join(open(os.path.join(SRC, name), encoding="utf-8").read() for name in SCRIPTS)
    app_js = open(os.path.join(SRC, "app.js"), encoding="utf-8").read()
    template = open(os.path.join(SRC, "template.html"), encoding="utf-8").read()

    for out in (OUT_WEB, OUT_PAGES, OUT_OFF):
        shutil.rmtree(out, ignore_errors=True)
        os.makedirs(out)
    os.makedirs(os.path.join(OUT_WEB, "img"))
    # the font files travel with their licences (SIL OFL); their rules go into the page itself
    shutil.copytree(FONT_DIR, os.path.join(OUT_WEB, "fonts"), ignore=shutil.ignore_patterns("*.css"))

    web, off = {}, {}
    for pid in ids:
        im = Image.open(os.path.join(PHOTO_DIR, pid + ".jpg")).convert("RGB")
        (w, h), b = encode(im, 1920 if pid in big else 1400, 74)
        open(os.path.join(OUT_WEB, "img", pid + ".jpg"), "wb").write(b)
        web[pid] = dict(src="img/%s.jpg" % pid, w=w, h=h, bg=mean_colour(im))
        srcset = []
        # the photo at the end is a place's photo too, so it keeps the small copies of the galleries and of the list of the
        # places off the trip, and gets the large one of the photo at the top
        for sw in SMALLER["hero"] if pid == hero else SMALLER["photo"] + SMALLER["hero"][-1:] if pid == finale else SMALLER["photo"]:
            if sw < w:
                (vw, _), vb = encode(im, sw, 74)
                open(os.path.join(OUT_WEB, "img", "%s-%d.jpg" % (pid, vw)), "wb").write(vb)
                srcset.append("img/%s-%d.jpg %dw" % (pid, vw, vw))
        if srcset:
            web[pid]["srcset"] = ", ".join(srcset + ["img/%s.jpg %dw" % (pid, w)])
        (w, h), b = encode(im, *OFFLINE["hero" if pid in big else "photo"])
        off[pid] = dict(src="data:image/jpeg;base64," + base64.b64encode(b).decode(), w=w, h=h, bg=web[pid]["bg"])
        if pid == hero:
            # link preview image: the hero cut to 1200 x 630 a little above mid height, the sun and the summit's pyramid in it
            og_image(im, os.path.join(OUT_WEB, "img", "og.jpg"), 0.45)

    def page(photos, fonts, kind):
        script = js + "\nvar PHOTOS = " + json.dumps(photos, ensure_ascii=False) + ";\n" + app_js
        script = script.replace("</script", "<\\/script")
        top = photos[hero]
        # the hero is cropped to cover a box about 2x as wide as a phone screen (clamped height, 3:2 photo)
        top_set = ' srcset="%s" sizes="(max-width: 700px) 200vw, 100vw"' % top["srcset"] if "srcset" in top else ""
        return (template.replace("__HERO_SRC__", top["src"]).replace(" __HERO_SRCSET__", top_set).replace("__HERO_W__", str(top["w"]))
                .replace("__HERO_H__", str(top["h"])).replace("/* __FONTS__ */", fonts).replace("__NOSCRIPT__", "".join('<p class="noscript" lang="%s">%s</p>' % x for x in NOSCRIPT[kind])).replace("__SCRIPT__", script))

    web_page = page(web, fonts_css(False), "page")
    open(os.path.join(OUT_WEB, "index.html"), "w", encoding="utf-8").write(web_page)
    # GitHub Pages serves files as they are, so it gets the full document and its own copy of the images
    open(os.path.join(OUT_PAGES, "index.html"), "w", encoding="utf-8").write(full_document(web_page, preview=PREVIEW))
    shutil.copytree(os.path.join(OUT_WEB, "img"), os.path.join(OUT_PAGES, "img"))
    shutil.copytree(os.path.join(OUT_WEB, "fonts"), os.path.join(OUT_PAGES, "fonts"))
    n_wild = wild_page(open(os.path.join(SRC, "wild.html"), encoding="utf-8").read(), fonts_css(False))
    mb_atlas = atlas_page(open(os.path.join(SRC, "atlas.html"), encoding="utf-8").read(), fonts_css(False), web)
    open(os.path.join(OUT_OFF, OFFLINE_NAME), "w", encoding="utf-8").write(full_document(page(off, fonts_css(True), "offline")))

    size = lambda p: os.path.getsize(p) / 1e6
    img_total = sum(size(os.path.join(OUT_WEB, "img", f)) for f in os.listdir(os.path.join(OUT_WEB, "img")))
    print("web page %.2f MB + %d images %.1f MB" % (size(os.path.join(OUT_WEB, "index.html")), len(web), img_total))
    print("pages page %.2f MB + copy of the images" % size(os.path.join(OUT_PAGES, "index.html")))
    print("wildlife subpage %.2f MB + %d photos" % (size(os.path.join(OUT_PAGES, "wildlife", "index.html")), n_wild))
    print("atlas subpage %.2f MB" % mb_atlas)
    print("offline file %.1f MB" % size(os.path.join(OUT_OFF, OFFLINE_NAME)))


if __name__ == "__main__":
    main()
