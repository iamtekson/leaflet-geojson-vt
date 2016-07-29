var map;
var layerControl;

function initMap() {
    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
    var geoq = L.tileLayer('//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}');
    map = L.map('map', {
        center: [35.461, 139.603],
        zoom: 11,
        layers: [osm]
    });
    layerControl = L.control.layers({
        'osm': osm,
        'geoq': geoq
    }, {}).addTo(map);
    L.hash(map);
}

function drawCanvasLayer(url, name, style) {
    var canvas = L.tileLayer.canvas().addTo(map);
    layerControl.addOverlay(canvas, name);
    drawGeoJSON(canvas, url, style)
}

function drawGeoJSON(canvas, url, style) {
    var tileIndex;
    var options = {
        maxZoom: 4,
        baseZoom: 18,
        maxPoints: 100,
        debug: 1
    };
    corslite(url, function (err, resp) {
        tileIndex = geojsonvt(JSON.parse(resp.response), options);
        canvas.drawTile = function (canvas, tilePoint, zoom) {
            var ctx = canvas.getContext('2d');
            var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);
            var features = tile ? tile.features : [];
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                drawFeature(ctx, feature, style);
            }
        };
    }, true);
}

function drawFeature(ctx, feature, style) {
    var typeChanged = type !== feature.type,
        type = feature.type;
    ctx.beginPath();
    if(style) setStyle(ctx,style);
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

function setStyle(ctx, style){
    ctx.lineWidth = style.weight||{};
    ctx.strokeStyle = style.color||{};
    ctx.fillStyle = style.fillColor||{};
}

function main() {
    initMap();
    style = {
        fillColor:'#1EB300',
        color:'#160',
        weight:5
    }
    drawCanvasLayer('http://handygeospatial.github.io/geojsonvt-ksj-site/kanagawa_yoto.geojson', 'polygon',style)
    drawCanvasLayer('./libs/greenway.json', 'polyline',style)
    // drawGeoJSON('./libs/busstop.json')
}

main();
