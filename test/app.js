var map;
var layerControl;

function initMap() {
    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
    var geoq = L.tileLayer('//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}');
    map = L.map('map', {
        center: [22.5885, 114.0537],
        zoom: 14,
        layers: [geoq]
    });
    layerControl = L.control.layers({
        'osm': osm,
        'geoq': geoq
    }, {}).addTo(map);
    L.hash(map);
}

function drawCanvasLayer(url, name, style) {
    var name = name || "canvas";
    var canvas = L.tileLayer.canvas().addTo(map);
    layerControl.addOverlay(canvas, name);
    corslite(url, function (err, resp) {
        canvas.drawGeoJSON(JSON.parse(resp.response), style)
    }, true);
}

function main() {
    initMap();
    style = {
        fillColor: '#1EB300',
        color: '#F2FF00',
        weight: 2
    }
    drawCanvasLayer('http://handygeospatial.github.io/geojsonvt-ksj-site/kanagawa_yoto.geojson', 'polygon', style)
    drawCanvasLayer('./greenway.json', 'polyline', style)
    drawCanvasLayer('./busstop.json', 'point', style)
}

main();