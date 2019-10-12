require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/VectorTileLayer"], function (Map, MapView, FeatureLayer, VectorTileLayer) {
  let map = new Map({
    basemap: "hybrid",
  })

  let view = new MapView({
    container: "viewDiv",
    map: map,
    extent: {
      xmin: -9177811,
      ymin: 4247000,
      xmax: -9176791,
      ymax: 4247784,
      spatialReference: 102100
    }
  })

  let featureLayer = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
  })



  let tileLayer = new VectorTileLayer({
    url:
      "https://jsapi.maps.arcgis.com/sharing/rest/content/items/75f4dfdff19e445395653121a95a85db/resources/styles/root.json"
  })

  // if featureLayer comes before tileLayer, the tile
  // layer will not show up (it gets buried)
  map.add(tileLayer)
  map.add(featureLayer)
})
