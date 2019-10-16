require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Polyline"
], function (Map, MapView, Graphic, GraphicsLayer, Polyline) {

  let map = new Map({
    basemap: "topo-vector"
  });

  let view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700],
    zoom: 13
  });

  let graphicsLayer = new GraphicsLayer()
  map.add(graphicsLayer)

  let point = {
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889
  }

  let simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 1
    }
  }

  let pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
  })

  graphicsLayer.add(pointGraphic)

  let simpleLineSymbol = {
    type: "simple-line",
    color: [226, 119, 40],
    width: 2
  }

  let polyline = new Polyline({
    paths: [
      [-118.821527826096, 34.0139576938577],
      [-118.814893761649, 34.0080602407843],
      [-118.808878330345, 34.0016642996246]
    ]
  })

  let polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  })

  graphicsLayer.add(polylineGraphic)
});
