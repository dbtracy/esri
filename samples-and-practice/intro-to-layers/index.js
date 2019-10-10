require(["esri/Map", "esri/views/SceneView"]), function (Map, SceneView) {
  let map = new Map({
    basemap: "oceans"
  })

  let view = new SceneView({
    container: "viewDiv",
    map: map
  })
}
