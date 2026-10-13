/* The map's three panels, one under another on the page, each by its top-left corner (lon0, lat0) and bottom-right corner
   (lon1, lat1); bar: the bottom corner of the scale bar, 'left' or 'right', where the panel is empty; names: the names on
   the basemap, [UI key, lat, lon, kind ('country' or 'water'), anchor ('start', 'middle' or 'end')].
   Every panel is MAP_WIDTH px wide, so its scale and height follow (panelSize in page.js). geo/make_basemap.py
   reads this file to cut the contours (basemap.js); after a change here, run it again. North: Sa Pa, Hà Giang and Bản Giốc
   to Thọ Xuân airport; centre: Phong Nha to Hội An and Mỹ Sơn, with room above Phong Nha for the labels of the ways north
   (stage 3: 18.4° N instead of 17.95); south: Phú Quốc and the Mekong delta to Đà Lạt, Yok Đôn and
   Nha Trang. */
var MAP_WIDTH = 270;
var MAP_PANELS = {
  north: { lon0: 103.45, lat0: 23.45, lon1: 107.6, lat1: 19.6, bar: 'left',
    names: [['m.china', 23.25, 106.0, 'country', 'middle'], ['m.laos', 20.55, 103.55, 'country', 'start'], ['m.tonkin', 19.75, 107.5, 'water', 'end']] },
  centre: { lon0: 105.6, lat0: 18.4, lon1: 108.9, lat1: 15.1, bar: 'left',
    names: [['m.laos', 16.3, 106.3, 'country', 'middle'], ['m.sea', 17.6, 108.8, 'water', 'end']] },
  south: { lon0: 103.6, lat0: 13.3, lon1: 109.25, lat1: 9.6, bar: 'left',
    names: [['m.cambodia', 12.5, 105.0, 'country', 'middle'], ['m.sea', 9.75, 109.1, 'water', 'end']] }
};
