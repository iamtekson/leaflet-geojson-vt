# leaflet-geojson-vt

A plugin combining geojson-vt with leafletjs(0.7.7), which is inspired by [geojson-vt-leaflet](https://github.com/handygeospatial/geojson-vt-leaflet).

**Warning**: This plugin is not compatiable with Leaflet 1.0, because L.Tilelayer.Canvas is replaced by L.GridLayer. Therefore, if you want to use it in Leaflet 1.0, go to [the Leaflet1.0 branch](https://github.com/brandonxiang/leaflet-geojson-vt/tree/leaflet1.0.0) please.

## Usage

```
var options = {
    maxZoom: 16,
    tolerance: 3,
    debug: 0,
    style: {
        fillColor: '#1EB300',
        color: '#F2FF00',
        weight: 2
    }
};
var canvasLayer = L.tileLayer.canvas.geoJson(json, options).addTo(map);
```

Options are included with [geojson-vt options](https://github.com/mapbox/geojson-vt#options) and [L.geojson style](http://leafletjs.com/reference.html#path-options).

```
var tileIndex = geojsonvt(data, {
    maxZoom: 14,  // max zoom to preserve detail on
    tolerance: 3, // simplification tolerance (higher means simpler)
    extent: 4096, // tile extent (both width and height)
    buffer: 64,   // tile buffer on each side
    debug: 0      // logging level (0 to disable, 1 or 2)

    indexMaxZoom: 4,        // max zoom in the initial tile index
    indexMaxPoints: 100000, // max number of points per tile in the index
    solidChildren: false    // whether to include solid tile children in the index
});
```

## Dependency

- [geojson-vt](https://github.com/mapbox/geojson-vt)

## Demo

[DEMO](https://brandonxiang.github.io/leaflet-geojson-vt/test)

## Test

run npm script with `browser-sync`

```
npm run dev
```

Browser on `http://localhost:3000/test`

## TODO

[TODO](doc/TODO.md)

## Changelog

[changelog](doc/changelog.md)

## License

[LICENSE](LICENSE)