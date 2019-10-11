require(["esri/Map", "esri/views/SceneView"], function (Map, SceneView) {
  let map = new Map({
    basemap: "streets",
    ground: "world-elevation"
  })
  let view = new SceneView({
    container: "viewDiv",
    map: map,
    scale: 5000000,
    center: [-101.17, 21.78]
  })
})
