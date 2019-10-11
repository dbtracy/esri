require(["esri/Map", "esri/views/SceneView"], function (Map, SceneView) {
  let map = new Map({
    basemap: "streets",
    ground: "world-elevation"
  })
  let view = new SceneView({
    container: "viewDiv",
    map: map
  })
})
