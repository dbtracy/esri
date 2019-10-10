require(["esri/Map", "esri/views/SceneView", "esri/layers/TileLayer"]), function (Map, SceneView, TileLayer) {

  let transportationLayer = new TileLayer({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer"
  })

  let housingLayer = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer"
  })

  let map = new Map({
    basemap: "oceans"
  })

  let view = new SceneView({
    container: "viewDiv",
    map: map
  })
}
