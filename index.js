var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
var canvas = L.tileLayer.canvas();

var tileIndex;
var options = {maxZoom: 4, baseZoom: 14, maxPoints: 100, debug: 1};
corslite('http://handygeospatial.github.io/geojsonvt-ksj-site/' +
  'kanagawa_yoto.geojson', function(err, resp) {
  tileIndex = geojsonvt(JSON.parse(resp.response), options);
  canvas.drawTile = function(canvas, tilePoint, zoom) {
    var ctx = canvas.getContext('2d');
    var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);
    var features = tile?tile.features:[];
    for (var i = 0; i < features.length; i++) {
      var feature = features[i], typeChanged = type !== feature.type,
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
  };
}, true);

var map = L.map('map', {
  center: [35.461, 139.603], zoom: 11,
  layers: [basemap, canvas]});

var hash = L.hash(map);
L.control.layers({'basemap': basemap},
  {'canvas': canvas}).addTo(map);
