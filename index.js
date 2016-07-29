var map;
var canvas;

function initMap() {
    var basemap = L.tileLayer('//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}');
    canvas = L.tileLayer.canvas();
    map = L.map('map', {
        center: [35.461, 139.603],
        zoom: 11,
        layers: [basemap, canvas]
    });
    L.control.layers({
        'basemap': basemap
    }, {
        'canvas': canvas.addTo(map)
    }).addTo(map);
    L.hash(map);
}

function drawGeoJSON(url) {
    var tileIndex;
    var options = {
        maxZoom: 4,
        baseZoom: 18,
        maxPoints: 100,
        debug: 1
    };
    corslite(url, function(err, resp) {
        tileIndex = geojsonvt(JSON.parse(resp.response), options);
        canvas.drawTile = function(canvas, tilePoint, zoom) {
            var ctx = canvas.getContext('2d');
            var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);
            var features = tile ? tile.features : [];
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                drawFeature(ctx, feature);
            }
        };
    }, true);
}

function drawFeature(ctx, feature) {
    var typeChanged = type !== feature.type,
        type = feature.type;
    ctx.beginPath();
    for (var j = 0; j < feature.geometry.length; j++) {
        var ring = feature.geometry[j];
        for (var k = 0; k < ring.length; k++) {
            var p = ring[k];
            if (k) ctx.lineTo(p[0] / 16.0, p[1] / 16.0);
            else ctx.moveTo(p[0] / 16.0, p[1] / 16.0);
        }
    }
    if (type === 3) ctx.fill('evenodd');
    ctx.stroke();
}

initMap();
// drawGeoJSON('http://handygeospatial.github.io/geojsonvt-ksj-site/kanagawa_yoto.geojson')
// drawGeoJSON('./libs/greenway.json')
drawGeoJSON('./libs/busstop.json')
