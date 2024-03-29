// ISC License

// Copyright (c) 2015, Mapbox

// Permission to use, copy, modify, and/or distribute this software for any purpose
// with or without fee is hereby granted, provided that the above copyright notice
// and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
// OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
// TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
// THIS SOFTWARE.

!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var t;
    (t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (t.geojsonvt = e());
  }
})(function () {
  return (function e(t, n, r) {
    function o(s, u) {
      if (!n[s]) {
        if (!t[s]) {
          var l = "function" == typeof require && require;
          if (!u && l) return l(s, !0);
          if (i) return i(s, !0);
          var a = new Error("Cannot find module '" + s + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var f = (n[s] = { exports: {} });
        t[s][0].call(
          f.exports,
          function (e) {
            var n = t[s][1][e];
            return o(n ? n : e);
          },
          f,
          f.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[s].exports;
    }
    for (
      var i = "function" == typeof require && require, s = 0;
      s < r.length;
      s++
    )
      o(r[s]);
    return o;
  })(
    {
      1: [
        function (e, t, n) {
          "use strict";
          function r(e, t, n, r, s, u, l, a) {
            if (((n /= t), (r /= t), l >= n && a <= r)) return e;
            if (l > r || a < n) return null;
            for (var f = [], p = 0; p < e.length; p++) {
              var h,
                m,
                c = e[p],
                g = c.geometry,
                d = c.type;
              if (((h = c.min[s]), (m = c.max[s]), h >= n && m <= r)) f.push(c);
              else if (!(h > r || m < n)) {
                var v = 1 === d ? o(g, n, r, s) : i(g, n, r, s, u, 3 === d);
                v.length &&
                  f.push({
                    geometry: v,
                    type: d,
                    tags: e[p].tags || null,
                    min: c.min,
                    max: c.max,
                  });
              }
            }
            return f.length ? f : null;
          }
          function o(e, t, n, r) {
            for (var o = [], i = 0; i < e.length; i++) {
              var s = e[i],
                u = s[r];
              u >= t && u <= n && o.push(s);
            }
            return o;
          }
          function i(e, t, n, r, o, i) {
            for (var u = [], l = 0; l < e.length; l++) {
              var a,
                f,
                p,
                h = 0,
                m = 0,
                c = null,
                g = e[l],
                d = g.area,
                v = g.dist,
                x = g.outer,
                y = g.length,
                M = [];
              for (f = 0; f < y - 1; f++)
                (a = c || g[f]),
                  (c = g[f + 1]),
                  (h = m || a[r]),
                  (m = c[r]),
                  h < t
                    ? m > n
                      ? (M.push(o(a, c, t), o(a, c, n)),
                        i || (M = s(u, M, d, v, x)))
                      : m >= t && M.push(o(a, c, t))
                    : h > n
                    ? m < t
                      ? (M.push(o(a, c, n), o(a, c, t)),
                        i || (M = s(u, M, d, v, x)))
                      : m <= n && M.push(o(a, c, n))
                    : (M.push(a),
                      m < t
                        ? (M.push(o(a, c, t)), i || (M = s(u, M, d, v, x)))
                        : m > n &&
                          (M.push(o(a, c, n)), i || (M = s(u, M, d, v, x))));
              (a = g[y - 1]),
                (h = a[r]),
                h >= t && h <= n && M.push(a),
                (p = M[M.length - 1]),
                i &&
                  p &&
                  (M[0][0] !== p[0] || M[0][1] !== p[1]) &&
                  M.push(M[0]),
                s(u, M, d, v, x);
            }
            return u;
          }
          function s(e, t, n, r, o) {
            return (
              t.length &&
                ((t.area = n),
                (t.dist = r),
                void 0 !== o && (t.outer = o),
                e.push(t)),
              []
            );
          }
          t.exports = r;
        },
        {},
      ],
      2: [
        function (e, t, n) {
          "use strict";
          function r(e, t) {
            var n = [];
            if ("FeatureCollection" === e.type)
              for (var r = 0; r < e.features.length; r++)
                o(n, e.features[r], t);
            else "Feature" === e.type ? o(n, e, t) : o(n, { geometry: e }, t);
            return n;
          }
          function o(e, t, n) {
            if (null !== t.geometry) {
              var r,
                l,
                a,
                f,
                p = t.geometry,
                h = p.type,
                m = p.coordinates,
                c = t.properties;
              if ("Point" === h) e.push(i(c, 1, [u(m)]));
              else if ("MultiPoint" === h) e.push(i(c, 1, s(m)));
              else if ("LineString" === h) e.push(i(c, 2, [s(m, n)]));
              else if ("MultiLineString" === h || "Polygon" === h) {
                for (a = [], r = 0; r < m.length; r++)
                  (f = s(m[r], n)),
                    "Polygon" === h && (f.outer = 0 === r),
                    a.push(f);
                e.push(i(c, "Polygon" === h ? 3 : 2, a));
              } else if ("MultiPolygon" === h) {
                for (a = [], r = 0; r < m.length; r++)
                  for (l = 0; l < m[r].length; l++)
                    (f = s(m[r][l], n)), (f.outer = 0 === l), a.push(f);
                e.push(i(c, 3, a));
              } else {
                if ("GeometryCollection" !== h)
                  throw new Error("Input data is not a valid GeoJSON object.");
                for (r = 0; r < p.geometries.length; r++)
                  o(e, { geometry: p.geometries[r], properties: c }, n);
              }
            }
          }
          function i(e, t, n) {
            var r = {
              geometry: n,
              type: t,
              tags: e || null,
              min: [2, 1],
              max: [-1, 0],
            };
            return a(r), r;
          }
          function s(e, t) {
            for (var n = [], r = 0; r < e.length; r++) n.push(u(e[r]));
            return t && (p(n, t), l(n)), n;
          }
          function u(e) {
            var t = Math.sin((e[1] * Math.PI) / 180),
              n = e[0] / 360 + 0.5,
              r = 0.5 - (0.25 * Math.log((1 + t) / (1 - t))) / Math.PI;
            return (r = r < 0 ? 0 : r > 1 ? 1 : r), [n, r, 0];
          }
          function l(e) {
            for (var t, n, r = 0, o = 0, i = 0; i < e.length - 1; i++)
              (t = n || e[i]),
                (n = e[i + 1]),
                (r += t[0] * n[1] - n[0] * t[1]),
                (o += Math.abs(n[0] - t[0]) + Math.abs(n[1] - t[1]));
            (e.area = Math.abs(r / 2)), (e.dist = o);
          }
          function a(e) {
            var t = e.geometry,
              n = e.min,
              r = e.max;
            if (1 === e.type) f(n, r, t);
            else for (var o = 0; o < t.length; o++) f(n, r, t[o]);
            return e;
          }
          function f(e, t, n) {
            for (var r, o = 0; o < n.length; o++)
              (r = n[o]),
                (e[0] = Math.min(r[0], e[0])),
                (t[0] = Math.max(r[0], t[0])),
                (e[1] = Math.min(r[1], e[1])),
                (t[1] = Math.max(r[1], t[1]));
          }
          t.exports = r;
          var p = e("./simplify");
        },
        { "./simplify": 4 },
      ],
      3: [
        function (e, t, n) {
          "use strict";
          function r(e, t) {
            return new o(e, t);
          }
          function o(e, t) {
            t = this.options = l(Object.create(this.options), t);
            var n = t.debug;
            n && console.time("preprocess data");
            var r = 1 << t.maxZoom,
              o = f(e, t.tolerance / (r * t.extent));
            (this.tiles = {}),
              (this.tileCoords = []),
              n &&
                (console.timeEnd("preprocess data"),
                console.log(
                  "index: maxZoom: %d, maxPoints: %d",
                  t.indexMaxZoom,
                  t.indexMaxPoints
                ),
                console.time("generate tiles"),
                (this.stats = {}),
                (this.total = 0)),
              (o = m(o, t.buffer / t.extent, s)),
              o.length && this.splitTile(o, 0, 0, 0),
              n &&
                (o.length &&
                  console.log(
                    "features: %d, points: %d",
                    this.tiles[0].numFeatures,
                    this.tiles[0].numPoints
                  ),
                console.timeEnd("generate tiles"),
                console.log(
                  "tiles generated:",
                  this.total,
                  JSON.stringify(this.stats)
                ));
          }
          function i(e, t, n) {
            return 32 * ((1 << e) * n + t) + e;
          }
          function s(e, t, n) {
            return [n, ((n - e[0]) * (t[1] - e[1])) / (t[0] - e[0]) + e[1], 1];
          }
          function u(e, t, n) {
            return [((n - e[1]) * (t[0] - e[0])) / (t[1] - e[1]) + e[0], n, 1];
          }
          function l(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
          }
          function a(e, t, n) {
            var r = e.source;
            if (1 !== r.length) return !1;
            var o = r[0];
            if (3 !== o.type || o.geometry.length > 1) return !1;
            var i = o.geometry[0].length;
            if (5 !== i) return !1;
            for (var s = 0; s < i; s++) {
              var u = p.point(o.geometry[0][s], t, e.z2, e.x, e.y);
              if (
                (u[0] !== -n && u[0] !== t + n) ||
                (u[1] !== -n && u[1] !== t + n)
              )
                return !1;
            }
            return !0;
          }
          t.exports = r;
          var f = e("./convert"),
            p = e("./transform"),
            h = e("./clip"),
            m = e("./wrap"),
            c = e("./tile");
          (o.prototype.options = {
            maxZoom: 14,
            indexMaxZoom: 5,
            indexMaxPoints: 1e5,
            solidChildren: !1,
            tolerance: 3,
            extent: 4096,
            buffer: 64,
            debug: 0,
          }),
            (o.prototype.splitTile = function (e, t, n, r, o, l, f) {
              for (
                var p = [e, t, n, r], m = this.options, g = m.debug, d = null;
                p.length;

              ) {
                (r = p.pop()), (n = p.pop()), (t = p.pop()), (e = p.pop());
                var v = 1 << t,
                  x = i(t, n, r),
                  y = this.tiles[x],
                  M = t === m.maxZoom ? 0 : m.tolerance / (v * m.extent);
                if (
                  !y &&
                  (g > 1 && console.time("creation"),
                  (y = this.tiles[x] = c(e, v, n, r, M, t === m.maxZoom)),
                  this.tileCoords.push({ z: t, x: n, y: r }),
                  g)
                ) {
                  g > 1 &&
                    (console.log(
                      "tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",
                      t,
                      n,
                      r,
                      y.numFeatures,
                      y.numPoints,
                      y.numSimplified
                    ),
                    console.timeEnd("creation"));
                  var P = "z" + t;
                  (this.stats[P] = (this.stats[P] || 0) + 1), this.total++;
                }
                if (((y.source = e), o)) {
                  if (t === m.maxZoom || t === o) continue;
                  var b = 1 << (o - t);
                  if (n !== Math.floor(l / b) || r !== Math.floor(f / b))
                    continue;
                } else if (
                  t === m.indexMaxZoom ||
                  y.numPoints <= m.indexMaxPoints
                )
                  continue;
                if (m.solidChildren || !a(y, m.extent, m.buffer)) {
                  (y.source = null), g > 1 && console.time("clipping");
                  var w,
                    Z,
                    z,
                    E,
                    S,
                    C,
                    F = (0.5 * m.buffer) / m.extent,
                    O = 0.5 - F,
                    T = 0.5 + F,
                    j = 1 + F;
                  (w = Z = z = E = null),
                    (S = h(e, v, n - F, n + T, 0, s, y.min[0], y.max[0])),
                    (C = h(e, v, n + O, n + j, 0, s, y.min[0], y.max[0])),
                    S &&
                      ((w = h(S, v, r - F, r + T, 1, u, y.min[1], y.max[1])),
                      (Z = h(S, v, r + O, r + j, 1, u, y.min[1], y.max[1]))),
                    C &&
                      ((z = h(C, v, r - F, r + T, 1, u, y.min[1], y.max[1])),
                      (E = h(C, v, r + O, r + j, 1, u, y.min[1], y.max[1]))),
                    g > 1 && console.timeEnd("clipping"),
                    w && p.push(w, t + 1, 2 * n, 2 * r),
                    Z && p.push(Z, t + 1, 2 * n, 2 * r + 1),
                    z && p.push(z, t + 1, 2 * n + 1, 2 * r),
                    E && p.push(E, t + 1, 2 * n + 1, 2 * r + 1);
                } else o && (d = t);
              }
              return d;
            }),
            (o.prototype.getTile = function (e, t, n) {
              var r = this.options,
                o = r.extent,
                s = r.debug,
                u = 1 << e;
              t = ((t % u) + u) % u;
              var l = i(e, t, n);
              if (this.tiles[l]) return p.tile(this.tiles[l], o);
              s > 1 && console.log("drilling down to z%d-%d-%d", e, t, n);
              for (var f, h = e, m = t, c = n; !f && h > 0; )
                h--,
                  (m = Math.floor(m / 2)),
                  (c = Math.floor(c / 2)),
                  (f = this.tiles[i(h, m, c)]);
              if (!f || !f.source) return null;
              if (
                (s > 1 && console.log("found parent tile z%d-%d-%d", h, m, c),
                a(f, o, r.buffer))
              )
                return p.tile(f, o);
              s > 1 && console.time("drilling down");
              var g = this.splitTile(f.source, h, m, c, e, t, n);
              if ((s > 1 && console.timeEnd("drilling down"), null !== g)) {
                var d = 1 << (e - g);
                l = i(g, Math.floor(t / d), Math.floor(n / d));
              }
              return this.tiles[l] ? p.tile(this.tiles[l], o) : null;
            });
        },
        {
          "./clip": 1,
          "./convert": 2,
          "./tile": 5,
          "./transform": 6,
          "./wrap": 7,
        },
      ],
      4: [
        function (e, t, n) {
          "use strict";
          function r(e, t) {
            var n,
              r,
              i,
              s,
              u = t * t,
              l = e.length,
              a = 0,
              f = l - 1,
              p = [];
            for (e[a][2] = 1, e[f][2] = 1; f; ) {
              for (r = 0, n = a + 1; n < f; n++)
                (i = o(e[n], e[a], e[f])), i > r && ((s = n), (r = i));
              r > u
                ? ((e[s][2] = r), p.push(a), p.push(s), (a = s))
                : ((f = p.pop()), (a = p.pop()));
            }
          }
          function o(e, t, n) {
            var r = t[0],
              o = t[1],
              i = n[0],
              s = n[1],
              u = e[0],
              l = e[1],
              a = i - r,
              f = s - o;
            if (0 !== a || 0 !== f) {
              var p = ((u - r) * a + (l - o) * f) / (a * a + f * f);
              p > 1
                ? ((r = i), (o = s))
                : p > 0 && ((r += a * p), (o += f * p));
            }
            return (a = u - r), (f = l - o), a * a + f * f;
          }
          t.exports = r;
        },
        {},
      ],
      5: [
        function (e, t, n) {
          "use strict";
          function r(e, t, n, r, i, s) {
            for (
              var u = {
                  features: [],
                  numPoints: 0,
                  numSimplified: 0,
                  numFeatures: 0,
                  source: null,
                  x: n,
                  y: r,
                  z2: t,
                  transformed: !1,
                  min: [2, 1],
                  max: [-1, 0],
                },
                l = 0;
              l < e.length;
              l++
            ) {
              u.numFeatures++, o(u, e[l], i, s);
              var a = e[l].min,
                f = e[l].max;
              a[0] < u.min[0] && (u.min[0] = a[0]),
                a[1] < u.min[1] && (u.min[1] = a[1]),
                f[0] > u.max[0] && (u.max[0] = f[0]),
                f[1] > u.max[1] && (u.max[1] = f[1]);
            }
            return u;
          }
          function o(e, t, n, r) {
            var o,
              s,
              u,
              l,
              a = t.geometry,
              f = t.type,
              p = [],
              h = n * n;
            if (1 === f)
              for (o = 0; o < a.length; o++)
                p.push(a[o]), e.numPoints++, e.numSimplified++;
            else
              for (o = 0; o < a.length; o++)
                if (
                  ((u = a[o]),
                  r || !((2 === f && u.dist < n) || (3 === f && u.area < h)))
                ) {
                  var m = [];
                  for (s = 0; s < u.length; s++)
                    (l = u[s]),
                      (r || l[2] > h) && (m.push(l), e.numSimplified++),
                      e.numPoints++;
                  3 === f && i(m, u.outer), p.push(m);
                } else e.numPoints += u.length;
            p.length &&
              e.features.push({ geometry: p, type: f, tags: t.tags || null });
          }
          function i(e, t) {
            var n = s(e);
            n < 0 === t && e.reverse();
          }
          function s(e) {
            for (
              var t, n, r = 0, o = 0, i = e.length, s = i - 1;
              o < i;
              s = o++
            )
              (t = e[o]), (n = e[s]), (r += (n[0] - t[0]) * (t[1] + n[1]));
            return r;
          }
          t.exports = r;
        },
        {},
      ],
      6: [
        function (e, t, n) {
          "use strict";
          function r(e, t) {
            if (e.transformed) return e;
            var n,
              r,
              i,
              s = e.z2,
              u = e.x,
              l = e.y;
            for (n = 0; n < e.features.length; n++) {
              var a = e.features[n],
                f = a.geometry,
                p = a.type;
              if (1 === p)
                for (r = 0; r < f.length; r++) f[r] = o(f[r], t, s, u, l);
              else
                for (r = 0; r < f.length; r++) {
                  var h = f[r];
                  for (i = 0; i < h.length; i++) h[i] = o(h[i], t, s, u, l);
                }
            }
            return (e.transformed = !0), e;
          }
          function o(e, t, n, r, o) {
            var i = Math.round(t * (e[0] * n - r)),
              s = Math.round(t * (e[1] * n - o));
            return [i, s];
          }
          (n.tile = r), (n.point = o);
        },
        {},
      ],
      7: [
        function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            var r = e,
              i = s(e, 1, -1 - t, t, 0, n, -1, 2),
              u = s(e, 1, 1 - t, 2 + t, 0, n, -1, 2);
            return (
              (i || u) &&
                ((r = s(e, 1, -t, 1 + t, 0, n, -1, 2)),
                i && (r = o(i, 1).concat(r)),
                u && (r = r.concat(o(u, -1)))),
              r
            );
          }
          function o(e, t) {
            for (var n = [], r = 0; r < e.length; r++) {
              var o,
                s = e[r],
                u = s.type;
              if (1 === u) o = i(s.geometry, t);
              else {
                o = [];
                for (var l = 0; l < s.geometry.length; l++)
                  o.push(i(s.geometry[l], t));
              }
              n.push({
                geometry: o,
                type: u,
                tags: s.tags,
                min: [s.min[0] + t, s.min[1]],
                max: [s.max[0] + t, s.max[1]],
              });
            }
            return n;
          }
          function i(e, t) {
            var n = [];
            (n.area = e.area), (n.dist = e.dist);
            for (var r = 0; r < e.length; r++)
              n.push([e[r][0] + t, e[r][1], e[r][2]]);
            return n;
          }
          var s = e("./clip");
          t.exports = r;
        },
        { "./clip": 1 },
      ],
    },
    {},
    [3]
  )(3);
});
