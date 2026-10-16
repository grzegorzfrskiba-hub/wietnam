"""The contours of the map panels for site2/src/basemap.js: the land of Vietnam, the land of its neighbours and the rivers,
from Natural Earth 1:10m (public domain), clipped to each panel, projected to its pixels and simplified. The panels come
from site2/src/panels.js (MAP_WIDTH, MAP_PANELS), sized as panelSize in page.js does it. After them, the outline of
Vietnam alone in the frame of the small maps of the whole country (COUNTRY_MAP in panels.js, sized as countryMap in
page.js does it).

Run:  python3 geo/make_basemap.py <dir>
<dir> holds ne_10m_admin_0_countries.geojson and ne_10m_rivers_lake_centerlines.geojson from
https://github.com/nvkelso/natural-earth-vector/tree/master/geojson (not in git: download them when the panels change).
Only the standard library: the clipping (Sutherland–Hodgman, Liang–Barsky) and the simplification (Douglas–Peucker) are here."""
import json, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "..", "site2", "src")
OUT = os.path.join(SRC, "basemap.js")
MARGIN = 6         # the contours run this far past the panel's edge; the page clips them to the panel's rounded frame
TOL_LAND, TOL_RIVER = 0.35, 0.5   # simplification tolerance, in pixels

def panels():
    """MAP_WIDTH and MAP_PANELS from panels.js, each panel sized as panelSize in page.js: s = MAP_WIDTH / (lon1 - lon0) px
    per degree, h = (lat0 - lat1) * s rounded half up, as Math.round does."""
    text = open(os.path.join(SRC, "panels.js"), encoding="utf-8").read()
    width = int(re.search(r"var MAP_WIDTH = (\d+);", text).group(1))
    out = {}
    for name, lon0, lat0, lon1, lat1 in re.findall(r"(\w+): \{ lon0: ([\d.]+), lat0: ([\d.]+), lon1: ([\d.]+), lat1: ([\d.]+)[,} ]", text):
        lon0, lat0, lon1, lat1 = float(lon0), float(lat0), float(lon1), float(lat1)
        s = width / (lon1 - lon0)
        out[name] = {"lon0": lon0, "lat0": lat0, "s": s, "w": width, "h": int((lat0 - lat1) * s + 0.5)}
    assert out, "no panels in panels.js"
    return out


def country_frame():
    """COUNTRY_MAP from panels.js, the frame of the small maps of the whole country: s = width / (lon1 - lon0) px per
    degree, h = (lat0 - lat1) * s rounded half up, as countryMap in page.js does it."""
    text = open(os.path.join(SRC, "panels.js"), encoding="utf-8").read()
    m = re.search(r"var COUNTRY_MAP = \{ lon0: ([\d.]+), lat0: ([\d.]+), lon1: ([\d.]+), lat1: ([\d.]+), width: (\d+) \};", text)
    assert m, "no COUNTRY_MAP in panels.js"
    lon0, lat0, lon1, lat1, width = float(m.group(1)), float(m.group(2)), float(m.group(3)), float(m.group(4)), int(m.group(5))
    s = width / (lon1 - lon0)
    return {"lon0": lon0, "lat0": lat0, "s": s, "w": width, "h": int((lat0 - lat1) * s + 0.5)}


def project(p, pt):
    return ((pt[0] - p["lon0"]) * p["s"], (p["lat0"] - pt[1]) * p["s"])


def clip_ring(ring, x0, y0, x1, y1):
    """Sutherland–Hodgman: a closed ring clipped to the rectangle (it may come out empty)."""
    def edge(points, inside, cut):
        out = []
        for i, b in enumerate(points):
            a = points[i - 1]
            if inside(b):
                if not inside(a):
                    out.append(cut(a, b))
                out.append(b)
            elif inside(a):
                out.append(cut(a, b))
        return out

    def at_x(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))

    def at_y(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)

    pts = ring
    for inside, cut in ((lambda q: q[0] >= x0, at_x(x0)), (lambda q: q[0] <= x1, at_x(x1)),
                        (lambda q: q[1] >= y0, at_y(y0)), (lambda q: q[1] <= y1, at_y(y1))):
        if not pts:
            break
        pts = edge(pts, inside, cut)
    return pts


def clip_line(line, x0, y0, x1, y1):
    """Liang–Barsky for each segment: the parts of a polyline inside the rectangle, as polylines."""
    out, cur = [], []
    for a, b in zip(line, line[1:]):
        dx, dy, t0, t1, ok = b[0] - a[0], b[1] - a[1], 0.0, 1.0, True
        for p, q in ((-dx, a[0] - x0), (dx, x1 - a[0]), (-dy, a[1] - y0), (dy, y1 - a[1])):
            if p == 0:
                if q < 0:
                    ok = False
            else:
                t = q / p
                if p < 0:
                    t0 = max(t0, t)
                else:
                    t1 = min(t1, t)
        if not ok or t0 > t1:
            if cur:
                out.append(cur)
                cur = []
            continue
        pa = (a[0] + t0 * dx, a[1] + t0 * dy)
        pb = (a[0] + t1 * dx, a[1] + t1 * dy)
        if not cur:
            cur = [pa]
        cur.append(pb)
        if t1 < 1:
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return out


def simplify(pts, tol):
    """Douglas–Peucker, iterative."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        ax, ay = pts[i]
        bx, by = pts[j]
        dx, dy = bx - ax, by - ay
        norm = (dx * dx + dy * dy) ** 0.5 or 1e-9
        best, at = -1.0, -1
        for k in range(i + 1, j):
            d = abs(dy * (pts[k][0] - ax) - dx * (pts[k][1] - ay)) / norm
            if d > best:
                best, at = d, k
        if best > tol:
            keep[at] = True
            stack += [(i, at), (at, j)]
    return [p for p, k in zip(pts, keep) if k]


def simplify_ring(ring, tol):
    """A closed ring: Douglas–Peucker needs two different ends, so the ring is cut at the point farthest from its first."""
    if len(ring) < 4:
        return ring
    far = max(range(len(ring)), key=lambda k: (ring[k][0] - ring[0][0]) ** 2 + (ring[k][1] - ring[0][1]) ** 2)
    return simplify(ring[:far + 1], tol)[:-1] + simplify(ring[far:] + ring[:1], tol)[:-1]


def area(ring):
    return abs(sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(ring, ring[1:] + ring[:1]))) / 2


def path(parts, closed):
    def f(v):
        s = "%.1f" % v
        return "0" if s in ("0.0", "-0.0") else s.rstrip("0").rstrip(".")
    return "".join("M" + " ".join(f(x) + " " + f(y) for x, y in pts) + ("z" if closed else "") for pts in parts)


def rings_of(geom):
    if geom["type"] == "Polygon":
        return geom["coordinates"]
    return [r for poly in geom["coordinates"] for r in poly]


def lines_of(geom):
    if geom["type"] == "LineString":
        return [geom["coordinates"]]
    return geom["coordinates"]


def main(src):
    countries = json.load(open(os.path.join(src, "ne_10m_admin_0_countries.geojson"), encoding="utf-8"))["features"]
    rivers = json.load(open(os.path.join(src, "ne_10m_rivers_lake_centerlines.geojson"), encoding="utf-8"))["features"]
    basemap = {}
    for name, p in panels().items():
        box = (-MARGIN, -MARGIN, p["w"] + MARGIN, p["h"] + MARGIN)
        layers = {"vn": [], "other": [], "rivers": []}
        for f in countries:
            key = "vn" if f["properties"]["ADM0_A3"] == "VNM" else "other"
            for ring in rings_of(f["geometry"]):
                c = simplify_ring(clip_ring([project(p, q) for q in ring], *box), TOL_LAND)
                if len(c) > 2 and area(c) > 2:
                    layers[key].append(c)
        for f in rivers:
            if not f["geometry"]:
                continue
            for line in lines_of(f["geometry"]):
                for part in clip_line([project(p, q) for q in line], *box):
                    part = simplify(part, TOL_RIVER)
                    if len(part) > 1:
                        layers["rivers"].append(part)
        basemap[name] = {"vn": path(layers["vn"], True), "other": path(layers["other"], True), "rivers": path(layers["rivers"], False)}
        print("%s: %d × %d px, %.1f px per degree, %d + %d land rings, %d river lines" % (
            name, p["w"], p["h"], p["s"], len(layers["vn"]), len(layers["other"]), len(layers["rivers"])))
    # the outline of Vietnam alone in the frame of the small maps, its islands of Hoàng Sa and Trường Sa cut off by the frame
    c = country_frame()
    box, rings = (-MARGIN, -MARGIN, c["w"] + MARGIN, c["h"] + MARGIN), []
    for f in countries:
        if f["properties"]["ADM0_A3"] != "VNM":
            continue
        for ring in rings_of(f["geometry"]):
            r = simplify_ring(clip_ring([project(c, q) for q in ring], *box), TOL_LAND)
            if len(r) > 2 and area(r) > 2:
                rings.append(r)
    print("country: %d × %d px, %.1f px per degree, %d land rings" % (c["w"], c["h"], c["s"], len(rings)))
    with open(OUT, "w", encoding="utf-8") as out:
        out.write("/* Basemap: Natural Earth 1:10m land and rivers (public domain), clipped and projected for the map panels of\n"
                  "   panels.js by geo/make_basemap.py: per panel, the land of Vietnam (vn), of its neighbours (other) and the rivers. */\n")
        out.write("var BASEMAP = " + json.dumps(basemap, separators=(",", ":")) + ";\n")
        out.write("/* The outline of Vietnam for the small maps of the places off the trip (app.js), in px of COUNTRY_MAP in panels.js;\n"
                  "   the islands of Hoàng Sa and Trường Sa lie outside its frame, as on the map of the trip. */\n")
        out.write("var OUTLINE = " + json.dumps(path(rings, True)) + ";\n")
    print("%s: %.0f KB" % (os.path.relpath(OUT), os.path.getsize(OUT) / 1024))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
