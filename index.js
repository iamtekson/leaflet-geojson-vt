L.TileLayer.Canvas.GeoJSON = L.TileLayer.Canvas.extend({
    options: {
        async: false
    },

    initialize: function (geojson, options) {
        L.setOptions(this, options);
        L.TileLayer.Canvas.prototype.initialize.call(this, options);
        this.drawGeoJSON(geojson);
    },

    drawGeoJSON: function (geojson) {
        var tileIndex = geojsonvt(geojson, this.options);
        this.drawTile = function (_canvas, tilePoint, zoom) {
            var ctx = _canvas.getContext('2d');
            var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);
            var features = tile ? tile.features : [];
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                this.drawFeature(ctx, feature);
            }
        };

    },

    drawFeature: function (ctx, feature) {
        var typeChanged = type !== feature.type,
            type = feature.type;
        ctx.beginPath();
        if (this.options.style) this.setStyle(ctx, this.options.style);
        if (type === 2 || type === 3) {
            for (var j = 0; j < feature.geometry.length; j++) {
                var ring = feature.geometry[j];
                for (var k = 0; k < ring.length; k++) {
                    var p = ring[k];
                    if (k) ctx.lineTo(p[0] / 16.0, p[1] / 16.0);
                    else ctx.moveTo(p[0] / 16.0, p[1] / 16.0);
                }
            }
        } else if (type === 1) {
            for (var j = 0; j < feature.geometry.length; j++) {
                var p = feature.geometry[j];
                ctx.arc(p[0] / 16.0, p[1] / 16.0, 2, 0, Math.PI * 2, true);
            }
        }
        if (type === 3) ctx.fill('evenodd');

        ctx.stroke();
    },

    setStyle: function (ctx, style) {
        ctx.lineWidth = style.weight || {};
        ctx.strokeStyle = style.color || {};
        ctx.fillStyle = style.fillColor || {};
    }
})

L.tileLayer.canvas.geoJson = function (geojson, options) {
    return new L.TileLayer.Canvas.GeoJSON(geojson, options);
};


