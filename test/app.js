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

function drawCanvasLayer(url, name, options) {
    var name = name || "canvas";

    corslite(url, function (err, resp) {
        var json = JSON.parse(resp.response);
        var canvasLayer = L.tileLayer.canvas.geoJson(json, options).addTo(map);
        layerControl.addOverlay(canvasLayer, name);
    }, true);
}

function main() {
    initMap();
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
    drawCanvasLayer('http://handygeospatial.github.io/geojsonvt-ksj-site/kanagawa_yoto.geojson', 'polygon', options)
    drawCanvasLayer('./greenway.json', 'polyline', options)
    drawCanvasLayer('./busstop.json', 'point', options)
}

main();