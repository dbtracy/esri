require(["esri/Map", "esri/views/SceneView", "esri/layers/TileLayer"], function (Map, SceneView, TileLayer) {

  let transportationLayer = new TileLayer({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
    id: "streets",
    opacity: 0.7
  })

  let housingLayer = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
    id: "ny-housing"
  })

  let map = new Map({
    basemap: "oceans",
    layers: [housingLayer]
  })
  map.layers.add(transportationLayer)

  let view = new SceneView({
    container: "viewDiv",
    map: map
  })

  let streetsLayerToggle = document.getElementById("streetsLayer")

  streetsLayerToggle.addEventListener("change", function () {
    transportationLayer.visible = streetsLayerToggle.checked
  })

  view.on("layerview-create", function (e) {
    if (e.layer.id === "ny-housing") {
      console.log("LayerView for New York housing density created!", e.layerView)
    }
    if (e.layer.id === "streets") {
      console.log("LayerView for streets created!", e.layerView)
    }
  })

  housingLayer.when(function () {
    setTimeout(() => {
      view.goTo(housingLayer.fullExtent)
    }, 3000);
  })
})
