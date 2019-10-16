require([
  "esri/Map",
  "esri/views/MapView"
], function (Map, MapView) {

  const map = new Map({
    basemap: "topo"
  })

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 14,
    center: [-73.940162906, 40.657830702]
  })
})
