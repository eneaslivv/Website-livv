# Globe land points

`world-land-dots.json` contains longitude/latitude samples from Natural Earth's public-domain 110m land polygons, sampled every 1.6 degrees of latitude with longitude spacing adjusted for latitude. Antarctica is omitted in this decorative view.

Source: https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json

The points are bundled locally so rendering needs no external map request. The current design projects a rotating particle globe with no solid surface or rim. It supports pointer dragging, horizontal touch gestures and arrow-key rotation (Home resets), respects reduced motion, pauses offscreen and preserves vertical touch scrolling. Spain is anchored at Madrid, Mexico at Mexico City, and Silicon Valley at Mountain View; these are collaboration destinations, not office locations.
